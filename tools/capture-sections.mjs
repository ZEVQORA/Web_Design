import { chromium } from "playwright";
const OUT = process.argv[2];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });
await p.goto("http://127.0.0.1:3000/design-lab", { waitUntil: "networkidle" });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(300);
for (const id of ["brand", "color", "type", "buttons", "loader", "status", "radius"]) {
  const el = p.locator(`#${id}`);
  if (await el.count() === 0) { console.log("missing:", id); continue; }
  await el.scrollIntoViewIfNeeded();
  await p.waitForTimeout(200);
  await el.screenshot({ path: `${OUT}/section-${id}.png` });
  console.log("section-" + id);
}
const ink = p.locator("#buttons-ink");
if (await ink.count()) { await ink.scrollIntoViewIfNeeded(); await p.waitForTimeout(200); await ink.screenshot({ path: `${OUT}/section-ink.png` }); console.log("section-ink"); }
await b.close();
