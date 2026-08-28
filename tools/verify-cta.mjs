/**
 * Verifies every interactive state of the primary CTA against WCAG, by driving
 * the real browser rather than trusting the token arithmetic.
 *
 * Measurements are taken AFTER transitions settle - reading immediately gives
 * mid-transition colours and produces false failures.
 */
import { chromium } from "playwright";
const SETTLE = 250;
const b = await chromium.launch();
const lum = (c) => { const [r,g,bl] = c.match(/\d+/g).slice(0,3).map(Number).map(v=>{v/=255;return v<=0.03928?v/12.92:((v+0.055)/1.055)**2.4;}); return .2126*r+.7152*g+.0722*bl; };
const ratio = (a,c) => { const [x,y]=[lum(a),lum(c)].sort((m,n)=>n-m); return (x+.05)/(y+.05); };
const pf = (r,n) => `${r.toFixed(2)}:1 ${r>=n?"PASS":"FAIL"}`;
let fails = 0;
const check = (label, r, need) => { if (r < need) fails++; console.log(`  ${label.padEnd(34)} ${pf(r, need)}`); };

const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://127.0.0.1:3000/design-lab", { waitUntil: "networkidle" });
await p.evaluate(() => document.fonts.ready);
const read = (sel = "#buttons button") => p.evaluate((s) => {
  const el = document.querySelector(s); const cs = getComputedStyle(el);
  return { bg: cs.backgroundColor, fg: cs.color, size: cs.fontSize, radius: cs.borderRadius, h: el.getBoundingClientRect().height };
}, sel);

const btn = p.locator("#buttons button").first();
await btn.scrollIntoViewIfNeeded();
const box = await btn.boundingBox();

console.log("PRIMARY CTA - light surface (label needs 4.5:1)");
let s = await read(); check("default", ratio(s.fg, s.bg), 4.5);
await p.mouse.move(box.x + box.width/2, box.y + box.height/2); await p.waitForTimeout(SETTLE);
s = await read(); check("hover", ratio(s.fg, s.bg), 4.5);
await p.mouse.down(); await p.waitForTimeout(SETTLE);
s = await read(); check("pressed", ratio(s.fg, s.bg), 4.5);
await p.mouse.up(); await p.mouse.move(2, 2);
console.log(`  font-size ${s.size} · height ${s.h}px · radius ${s.radius}`);

console.log("\nDISABLED (WCAG 1.4.3 exempts inactive controls)");
console.log("  " + JSON.stringify(await p.evaluate(() => {
  const el = [...document.querySelectorAll("#buttons button")].find(x => x.disabled);
  const cs = getComputedStyle(el);
  return { opacity: cs.opacity, pointerEvents: cs.pointerEvents, focusable: el.disabled === false };
})));

console.log("\nFOCUS-VISIBLE, keyboard (ring needs 3:1 vs its backdrop)");
const p2 = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p2.goto("http://127.0.0.1:3000/design-lab", { waitUntil: "networkidle" });
for (let i = 0; i < 40; i++) {
  await p2.keyboard.press("Tab");
  if (await p2.evaluate(() => document.activeElement instanceof HTMLButtonElement)) break;
}
await p2.waitForTimeout(SETTLE);
const f = await p2.evaluate(() => { const cs = getComputedStyle(document.activeElement); return { c: cs.outlineColor, w: cs.outlineWidth, o: cs.outlineOffset, canvas: getComputedStyle(document.body).backgroundColor }; });
console.log(`  ring ${f.c} ${f.w} offset ${f.o}`);
check("ring vs canvas", ratio(f.c, f.canvas), 3);

console.log("\nINK SURFACE");
const ink = await p2.evaluate(() => { const el = document.querySelector("#buttons-ink button"); const cs = getComputedStyle(el); return { bg: cs.backgroundColor, fg: cs.color }; });
check("CTA label on ink CTA fill", ratio(ink.fg, ink.bg), 4.5);

console.log("\nCONTROL BOUNDARY (1.4.11 needs 3:1)");
const sec = await p2.evaluate(() => { const el = [...document.querySelectorAll("#buttons button")].find(x => getComputedStyle(x).borderTopWidth !== "0px"); return { b: getComputedStyle(el).borderTopColor, canvas: getComputedStyle(document.body).backgroundColor }; });
check("secondary border vs canvas", ratio(sec.b, sec.canvas), 3);

await b.close();
console.log(fails === 0 ? "\nALL STATES PASS" : `\n${fails} FAILING STATE(S)`);
process.exit(fails === 0 ? 0 : 1);
