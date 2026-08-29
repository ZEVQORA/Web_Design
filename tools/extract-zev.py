"""
Extracts Zev sprites from the canonical 360 turnaround.

The hard part is that Zev is a white character on a near-white plate, so any
luminance or chroma key erases most of his body along with the background.

Flood-filling from the border does not work: Zev's white fur is within
tolerance of the paper, so the fill leaks through the anti-aliased edge and
eats most of his body. That failure is invisible when the cutout is composited
on Cloud - white holes on a white ground - and only shows up on ink.

What does work is that his silhouette is always bounded by something darker
than the paper: an outline, soft shading, the blue accents, the collar. So the
matte is built from everything that differs from the paper at all, closed to
seal hairline gaps, then hole-filled. Interior white fur is recovered because
it is enclosed by that boundary rather than because it was detected.

Keeping only the largest component then drops the sheet's captions and leader
ticks without having to hand-tune crop boxes around them.

Usage:  python extract-zev.py <out_dir>
"""

import json
import sys
from pathlib import Path

import cv2
import numpy as np
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent
TURNAROUND = ROOT / "references" / "zev-turnaround.png"

# Rows of the turnaround sheet, measured from the reference.
ROWS = {
    "view": (215, 590),  # the five 360 views
    "expression": (655, 830),  # happy / joyful / curious / content
    "pose": (655, 830),  # sitting / playful / thinking / waving
}

VIEW_NAMES = ["front", "three-quarter-front", "side", "three-quarter-back", "back"]
POSE_NAMES = ["sitting", "playful", "thinking", "waving"]


def paper_colour(bgr: np.ndarray) -> np.ndarray:
    """The sheet's flat ground, sampled from the border."""
    edges = np.concatenate(
        [bgr[0], bgr[-1], bgr[:, 0], bgr[:, -1]], axis=0
    ).astype(np.float32)
    return np.median(edges, axis=0)


def raw_ink(bgr: np.ndarray, tol: float = 2.5) -> np.ndarray:
    """Anything unlike the paper. Used to find figure columns, before any
    grouping - grouping merges neighbouring figures and destroys the split."""
    paper = paper_colour(bgr)
    return (np.abs(bgr.astype(np.float32) - paper).max(axis=2) > tol).astype(np.uint8)


def silhouette(bgr: np.ndarray, tol: float = 2.5) -> np.ndarray:
    """Solid subject mask: anything unlike the paper, sealed and hole-filled.

    The tolerance is deliberately low. Zev's far ear in the side view is white
    fur on white paper carrying only a whisper of shading, and it is open to
    the background rather than enclosed, so hole-filling cannot recover it - it
    has to be detected outright. At tol=5 that ear was 48% detected and punched
    a ragged hole through his head; at tol=2.5 it is 95%, and the sitting pose's
    crown - the same problem on top of his head - goes from 67% to 97%.
    Below about 2 the paper's own noise floods in and the matte collapses.
    """
    paper = paper_colour(bgr)
    d = np.abs(bgr.astype(np.float32) - paper).max(axis=2)
    m = (d > tol).astype(np.uint8)
    # Seal hairline gaps in the outline so the fill cannot escape.
    k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, k)
    m = ndimage.binary_fill_holes(m.astype(bool))
    # Group the figure before selecting it. Zev's blue ear meets his white head
    # along a paper-coloured edge, so the closing pinches it into its own
    # component; picking components individually - by size or otherwise - kept
    # dropping it and punching an ear-shaped bite out of the silhouette.
    #
    # Dilating first merges parts that are merely close (ear, paw, tail) into a
    # single blob, so the largest blob is the whole figure. Intersecting back
    # with the undilated mask restores the true outline, and the sheet's
    # captions stay excluded because they are nowhere near it.
    grouped = cv2.dilate(
        m.astype(np.uint8), cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (25, 25))
    )
    lbl, n = ndimage.label(grouped)
    if n == 0:
        return m.astype(np.float32)
    sizes = ndimage.sum(grouped, lbl, range(1, n + 1))
    figure = lbl == (int(np.argmax(sizes)) + 1)
    m = ndimage.binary_fill_holes(m & figure)
    return m.astype(np.float32)


def alpha_for(bgr: np.ndarray) -> np.ndarray:
    """Subject coverage in 0..1, with the contact shadow kept as partial alpha."""
    solid = silhouette(bgr)
    paper = paper_colour(bgr)
    grey = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY).astype(np.float32)
    paper_grey = float(cv2.cvtColor(
        np.uint8([[paper]]), cv2.COLOR_BGR2GRAY  # noqa: NPY002
    )[0][0])
    # The ground shadow is outside the silhouette but darker than the paper.
    # It is only ever cast close to the figure, so it is confined to a band
    # around it - otherwise the sheet's captions, which are also darker than
    # the paper, are matted in as ghostly text.
    near = cv2.dilate(
        solid, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (41, 41))
    )
    shadow = np.clip((paper_grey - grey) / 22.0, 0, 1) * (1.0 - solid) * near
    alpha = np.clip(np.maximum(solid, shadow * 0.55), 0, 1)
    return cv2.GaussianBlur(alpha, (0, 0), 0.7)


def cut(bgr: np.ndarray, box: tuple[int, int, int, int]) -> np.ndarray | None:
    x0, y0, x1, y1 = box
    crop = bgr[y0:y1, x0:x1]
    a = alpha_for(crop)
    ys, xs = np.nonzero(a > 0.08)
    if len(xs) == 0:
        return None
    x_lo, x_hi, y_lo, y_hi = xs.min(), xs.max(), ys.min(), ys.max()
    crop = crop[y_lo : y_hi + 1, x_lo : x_hi + 1]
    a = a[y_lo : y_hi + 1, x_lo : x_hi + 1]
    rgba = np.dstack([crop, (a * 255).astype(np.uint8)])
    return rgba


def find_columns(bgr: np.ndarray, box: tuple[int, int, int, int], expected: int) -> list:
    """Split a band of the sheet into per-figure boxes using column occupancy.

    A plain occupancy threshold separates the figures cleanly; the earlier
    attempt merged neighbours because it also ran a gap-merging pass, which
    glued adjacent views into one 530px block.
    """
    x0, y0, x1, y1 = box
    band = bgr[y0:y1, x0:x1]
    col = raw_ink(band).sum(axis=0)
    on = col > 15
    runs, start = [], None
    for i, v in enumerate(on):
        if v and start is None:
            start = i
        elif not v and start is not None:
            if i - start > 20:
                runs.append((start, i))
            start = None
    if start is not None and len(on) - start > 20:
        runs.append((start, len(on)))
    runs.sort(key=lambda r: r[1] - r[0], reverse=True)
    runs = sorted(runs[:expected], key=lambda r: r[0])
    return [(x0 + r[0] - 4, y0, x0 + r[1] + 4, y1) for r in runs]


def main() -> None:
    out = Path(sys.argv[1])
    out.mkdir(parents=True, exist_ok=True)
    board = cv2.imread(str(TURNAROUND))
    print("turnaround", board.shape)

    manifest = {}

    def emit(name, box):
        rgba = cut(board, box)
        if rgba is None:
            print(f"  {name}: EMPTY")
            return
        path = out / f"zev-{name}.png"
        cv2.imwrite(str(path), rgba)
        manifest[name] = {
            "file": path.name,
            "w": int(rgba.shape[1]),
            "h": int(rgba.shape[0]),
        }
        print(f"  {name:24s} {rgba.shape[1]}x{rgba.shape[0]}")

    for name, box in zip(VIEW_NAMES, find_columns(board, (0, 248, 1448, 600), 5)):
        emit(name, box)

    # The expression row sits in outlined cards. A card frame encloses its own
    # background, which defeats a topological cutout, so only the unframed
    # pose figures are extracted.
    for name, box in zip(POSE_NAMES, find_columns(board, (720, 646, 1420, 822), 4)):
        emit(f"pose-{name}", box)

    (out / "manifest.json").write_text(json.dumps(manifest, indent=1))
    print(f"done - {len(manifest)} sprites")


if __name__ == "__main__":
    main()
