import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://127.0.0.1:3000/design-lab", { waitUntil: "networkidle" });
const r = await p.evaluate(() => {
  const out = { bgRules: [], focusRules: [] };
  const walk = (rules) => {
    for (const rule of rules) {
      if (rule.cssRules) walk(rule.cssRules);
      if (!rule.selectorText) continue;
      if (/bg-cta/.test(rule.selectorText)) out.bgRules.push(rule.selectorText + " { " + rule.style.cssText + " }");
      if (/focus-visible/.test(rule.selectorText)) out.focusRules.push(rule.selectorText + " { " + rule.style.cssText + " }");
    }
  };
  for (const ss of document.styleSheets) { try { walk(ss.cssRules); } catch {} }
  return out;
});
console.log("--- bg-cta rules ---"); r.bgRules.forEach(x => console.log(" ", x));
console.log("--- focus-visible rules ---"); r.focusRules.slice(0,6).forEach(x => console.log(" ", x));
await b.close();
