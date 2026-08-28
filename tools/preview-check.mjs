import { chromium } from "playwright";
const file = "file:///" + process.argv[2].split("\\").join("/");
const b = await chromium.launch();
for (const scheme of ["light", "dark"]) {
  const ctx = await b.newContext({ viewport: { width: 1280, height: 1000 }, colorScheme: scheme, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push(e.message));
  p.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
  await p.goto(file, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(400);
  const info = await p.evaluate(() => {
    const cs = getComputedStyle(document.body);
    const imgs = [...document.images];
    return {
      bg: cs.backgroundColor, fg: cs.color,
      font: cs.fontFamily.split(",")[0],
      satoshiLoaded: document.fonts.check("16px Satoshi"),
      images: imgs.length,
      broken: imgs.filter((i) => !i.complete || i.naturalWidth === 0).length,
      docW: document.documentElement.scrollWidth, winW: window.innerWidth,
      h1: document.querySelectorAll("h1").length,
    };
  });
  console.log(scheme.toUpperCase(), JSON.stringify(info));
  if (errs.length) console.log("  errors:", errs.slice(0, 3));
  await p.screenshot({ path: `${process.argv[3]}/review-${scheme}.png`, fullPage: false });
  await ctx.close();
}
await b.close();
