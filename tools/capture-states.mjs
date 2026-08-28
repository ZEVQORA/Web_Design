/** Captures interaction states that a static page render cannot show. */
import { chromium } from "playwright";
const OUT = process.argv[2];
const b = await chromium.launch();

// Mobile nav, open
const m = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await m.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle" });
await m.evaluate(() => document.fonts.ready);
await m.getByLabel("Open menu").click();
await m.waitForTimeout(500);
await m.screenshot({ path: `${OUT}/nav-mobile-open.png` });
await m.close();

// Desktop nav, scrolled (structured surface state)
const d = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await d.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle" });
await d.evaluate(() => document.fonts.ready);
await d.evaluate(() => window.scrollTo(0, 400));
await d.waitForTimeout(500);
await d.screenshot({ path: `${OUT}/nav-desktop-scrolled.png`, clip: { x: 0, y: 0, width: 1440, height: 100 } });
await d.evaluate(() => window.scrollTo(0, 0));
await d.waitForTimeout(500);
await d.screenshot({ path: `${OUT}/nav-desktop-top.png`, clip: { x: 0, y: 0, width: 1440, height: 100 } });

// CTA states, side by side on one strip
const lab = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await lab.goto("http://127.0.0.1:3000/design-lab", { waitUntil: "networkidle" });
await lab.evaluate(() => document.fonts.ready);
const btn = lab.locator("#buttons button").first();
await btn.scrollIntoViewIfNeeded();
const box = await btn.boundingBox();
await lab.screenshot({ path: `${OUT}/cta-default.png`, clip: { x: box.x - 6, y: box.y - 6, width: box.width + 12, height: box.height + 12 } });
await lab.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
await lab.waitForTimeout(300);
await lab.screenshot({ path: `${OUT}/cta-hover.png`, clip: { x: box.x - 6, y: box.y - 6, width: box.width + 12, height: box.height + 12 } });
await lab.mouse.down(); await lab.waitForTimeout(300);
await lab.screenshot({ path: `${OUT}/cta-pressed.png`, clip: { x: box.x - 6, y: box.y - 6, width: box.width + 12, height: box.height + 12 } });
await lab.mouse.up();

// keyboard focus ring, fresh page so :focus-visible applies
const k = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await k.goto("http://127.0.0.1:3000/design-lab", { waitUntil: "networkidle" });
await k.evaluate(() => document.fonts.ready);
for (let i = 0; i < 40; i++) {
  await k.keyboard.press("Tab");
  if (await k.evaluate(() => document.activeElement instanceof HTMLButtonElement)) break;
}
await k.waitForTimeout(400);
const fb = await k.evaluate(() => { const r = document.activeElement.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; });
await k.screenshot({ path: `${OUT}/cta-focus.png`, clip: { x: fb.x - 10, y: fb.y - 10, width: fb.width + 20, height: fb.height + 20 } });

await b.close();
console.log("state captures written");
