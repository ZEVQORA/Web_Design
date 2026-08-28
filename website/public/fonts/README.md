# Fonts

`Satoshi-Variable.woff2` — Satoshi by Indian Type Foundry, obtained from
Fontshare (https://www.fontshare.com/fonts/satoshi) and distributed under the
ITF Free Font License, which permits commercial use.

It is vendored here deliberately rather than linked from Fontshare's CDN so the
site has no third-party runtime font dependency, and so the headline typeface
cannot change underneath us.

Single variable file, weight axis 300-900. The italic face is not shipped
because the design does not use it.

The technical monospace (JetBrains Mono) is not vendored — it is pulled and
self-hosted at build time by `next/font/google`.
