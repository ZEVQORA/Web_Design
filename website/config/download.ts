/**
 * Desktop build configuration.
 *
 * There are no published binaries yet, so every URL below is null and the
 * download page renders a request-access state. It never offers a link that
 * would 404, and it never implies a file exists.
 *
 * When builds are published, fill in `url` and `checksum` and the page becomes
 * a real download page with no component changes.
 */

export interface Build {
  os: "macOS" | "Windows";
  arch: string;
  requirement: string;
  url: string | null;
  checksum: string | null;
  size: string | null;
}

export const downloadConfig = {
  version: null as string | null,
  channel: "private beta",
  releaseNotes: null as string | null,
  builds: [
    {
      os: "macOS",
      arch: "Apple silicon · Intel",
      requirement: "macOS 13 or later",
      url: null,
      checksum: null,
      size: null,
    },
    {
      os: "Windows",
      arch: "x64",
      requirement: "Windows 11 or later",
      url: null,
      checksum: null,
      size: null,
    },
  ] satisfies Build[],
  signing:
    "Builds will be signed and notarised, and each release will publish a checksum next to the download.",
} as const;

export function isBuildAvailable(build: Build) {
  return Boolean(build.url);
}

export const anyBuildAvailable = downloadConfig.builds.some(isBuildAvailable);
