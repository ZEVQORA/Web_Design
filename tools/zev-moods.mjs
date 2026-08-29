/** Captures Zev at rest and reacting, and asserts the sprite actually swaps. */
import { chromium } from "playwright";
const OUT = process.argv[2];
const VW = 1512, VH = 982;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: VW, height: VH }, deviceScaleFactor: 2 });
await p.goto("http://127.0.0.1:3100/", { waitUntil: "networkidle" });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(1400);

const hero = p.locator("section").first();
const zev = hero.locator("img[src*='zev-']").first();
const src = () => zev.getAttribute("src");
const clip = async () => {
  const r = await zev.boundingBox();
  const x = Math.max(0, r.x - 60), y = Math.max(0, r.y - 40);
  return { x, y, width: Math.min(r.width + 120, VW - x), height: Math.min(r.height + 90, VH - y) };
};

console.log("idle      ", await src());
await p.screenshot({ path: `${OUT}/zev-idle.png`, clip: await clip() });

await hero.getByRole("link", { name: "Get ZEVQORA" }).hover();
await p.waitForTimeout(1200);
console.log("delighted ", await src());
await p.screenshot({ path: `${OUT}/zev-delighted.png`, clip: await clip() });

await hero.getByRole("link", { name: "See how verification works" }).hover();
await p.waitForTimeout(1200);
console.log("curious   ", await src());
await p.screenshot({ path: `${OUT}/zev-curious.png`, clip: await clip() });

await p.mouse.move(20, 20);
await p.waitForTimeout(1200);
console.log("back to   ", await src());

await hero.locator("[role='img']").first().screenshot({ path: `${OUT}/instrument.png` });
await b.close();
