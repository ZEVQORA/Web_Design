import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://127.0.0.1:3000/design-lab", { waitUntil: "networkidle" });
for (let i = 0; i < 40; i++) {
  await p.keyboard.press("Tab");
  const isBtn = await p.evaluate(() => document.activeElement instanceof HTMLButtonElement);
  if (isBtn) break;
}
for (const wait of [0, 60, 150, 400]) {
  await p.waitForTimeout(wait === 0 ? 0 : wait);
  const r = await p.evaluate(() => {
    const cs = getComputedStyle(document.activeElement);
    return { t: cs.transitionProperty, outline: cs.outlineColor };
  });
  console.log(`after ~${wait}ms cumulative -> outlineColor ${r.outline}`);
  if (wait === 0) console.log("  transition-property:", r.t);
}
await b.close();
