import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://127.0.0.1:3000/design-lab", { waitUntil: "networkidle" });

const btn = p.locator("#buttons button").first();
await btn.scrollIntoViewIfNeeded();
const box = await btn.boundingBox();
console.log("button box:", box);

await p.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
await p.waitForTimeout(300);
console.log("HOVER:", await p.evaluate(() => {
  const el = document.querySelector("#buttons button");
  return { matchesHover: el.matches(":hover"), bg: getComputedStyle(el).backgroundColor };
}));

await p.mouse.down();
await p.waitForTimeout(150);
console.log("ACTIVE:", await p.evaluate(() => {
  const el = document.querySelector("#buttons button");
  return { matchesActive: el.matches(":active"), bg: getComputedStyle(el).backgroundColor };
}));
await p.mouse.up();

// focus: fresh page, keyboard only
const p2 = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p2.goto("http://127.0.0.1:3000/design-lab", { waitUntil: "networkidle" });
for (let i = 0; i < 40; i++) {
  await p2.keyboard.press("Tab");
  const hit = await p2.evaluate(() => {
    const a = document.activeElement;
    if (!(a instanceof HTMLButtonElement)) return null;
    const cs = getComputedStyle(a);
    return {
      text: a.textContent.trim().slice(0, 20),
      inInk: !!a.closest('[data-surface="ink"]'),
      focusVisible: a.matches(":focus-visible"),
      zqFocus: cs.getPropertyValue("--zq-focus"),
      outlineColor: cs.outlineColor,
      color: cs.color,
    };
  });
  if (hit) { console.log("FOCUS:", hit); break; }
}
await b.close();
