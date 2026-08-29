"""
ZEVQORA brand geometry tracer.

Produces the fixed vector geometry for the Z mark and the ZEVQORA wordmark from
the canonical brand board. The wordmark is a LOGO ASSET, not typography - it is
never typeset in Satoshi or any other UI font.

Two things this pipeline must get right, both of which an earlier version got
wrong:

1. Counters. The Q, O and R have open counters. Smoothing contours by hand and
   re-filling them destroys those counters and turns Q and O into solid blobs.
   potrace already resolves hierarchy and emits counters as even-odd subpaths,
   so the bitmap is handed to it untouched.

2. Stroke weight. Thresholding a greyscale crop with an arbitrary cutoff
   dilates every stroke. Instead the anti-aliasing is inverted properly: alpha
   is recovered as the linear position of each pixel between the known paper
   and ink luminances, then upscaled and cut at the 50% crossing - which is
   where the true outline of the shape lies.

Usage:  python trace-brand.py <out_dir>
"""

import subprocess
import sys
from pathlib import Path

import cv2
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
BOARD = ROOT / "references" / "brand-board.png"

# Regions on the canonical board, measured, not guessed.
WORDMARK_BOX = (49, 103, 388, 148)  # x0, y0, x1, y1 of the section 01 wordmark
MARK_REGION = (40, 200, 460, 650)  # search window for the blue mark

PAPER = 247.0  # Cloud, the board's ground
INK = 15.0  # Ink, the wordmark's colour
UPSCALE = 12


def alpha_from_grey(grey: np.ndarray) -> np.ndarray:
    """Recover coverage by inverting anti-aliasing, rather than thresholding."""
    return np.clip((PAPER - grey) / (PAPER - INK), 0.0, 1.0).astype(np.float32)


def to_bitmap(alpha: np.ndarray, out_png: Path) -> np.ndarray:
    """Upscale coverage smoothly and cut at the 50% crossing."""
    up = cv2.resize(alpha, None, fx=UPSCALE, fy=UPSCALE, interpolation=cv2.INTER_CUBIC)
    # A light blur removes rasteriser stair-stepping without moving the 50%
    # crossing, so stroke weight is preserved.
    up = cv2.GaussianBlur(up, (0, 0), UPSCALE / 6.0)
    binary = (up > 0.5).astype(np.uint8)
    cv2.imwrite(str(out_png), np.where(binary == 1, 0, 255).astype(np.uint8))
    return binary


def potrace(src: Path, dest: Path, tol: float = 0.9) -> None:
    subprocess.run(
        ["node", str(Path(__file__).parent / "trace-mark.mjs"), str(src), str(dest), str(tol), "1.334"],
        check=True,
        cwd=str(Path(__file__).parent),
    )


def main() -> None:
    out = Path(sys.argv[1])
    out.mkdir(parents=True, exist_ok=True)

    board = cv2.imread(str(BOARD))
    grey = cv2.cvtColor(board, cv2.COLOR_BGR2GRAY).astype(np.float32)

    # ---- wordmark -------------------------------------------------------
    x0, y0, x1, y1 = WORDMARK_BOX
    crop = grey[y0 - 3 : y1 + 4, x0 - 3 : x1 + 4]
    wm_bin = to_bitmap(alpha_from_grey(crop), out / "wordmark.bmp.png")

    # Counter check: with counters intact the background has one outer region
    # plus one hole per counter. Blobbed letterforms collapse that count.
    n_bg, _ = cv2.connectedComponents((wm_bin == 0).astype(np.uint8), connectivity=4)
    holes = n_bg - 2  # minus label 0, minus the outer background region
    print(f"wordmark bitmap {wm_bin.shape}  enclosed counters detected: {holes}")
    potrace(out / "wordmark.bmp.png", out / "wordmark.svg")

    # ---- mark -----------------------------------------------------------
    b, g, r = (board[:, :, i].astype(int) for i in range(3))
    dist = np.sqrt((b - 255) ** 2 + (g - 139) ** 2 + (r - 70) ** 2)
    blue_alpha = np.clip(1.0 - (dist - 40) / 60.0, 0, 1).astype(np.float32)
    ry0, ry1, rx0, rx1 = 40, 200, 460, 650
    region = np.zeros(blue_alpha.shape, bool)
    region[ry0:ry1, rx0:rx1] = True
    ys, xs = np.nonzero((blue_alpha > 0.5) & region)
    mx0, mx1, my0, my1 = xs.min(), xs.max(), ys.min(), ys.max()
    print(f"mark bbox x {mx0}-{mx1} y {my0}-{my1}")
    mark_crop = blue_alpha[my0 - 2 : my1 + 3, mx0 - 2 : mx1 + 3]
    to_bitmap(mark_crop, out / "mark.bmp.png")
    potrace(out / "mark.bmp.png", out / "mark.svg")
    print("done")


if __name__ == "__main__":
    main()
