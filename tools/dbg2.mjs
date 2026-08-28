import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://127.0.0.1:3000/design-lab", { waitUntil: "networkidle" });
const r = await p.evaluate(() => {
  const el = document.querySelector("#buttons button");
  const cs = getComputedStyle(el);
  const rootCs = getComputedStyle(document.documentElement);
  // layer-aware rule walk
  const want = ["bg-cta-hover", "bg-cta-active"];
  const hits = {};
  const walk = (rules) => {
    for (const rule of rules) {
      if (rule.cssRules) walk(rule.cssRules);
      if (rule.selectorText) for (const w of want)
        if (rule.selectorText.includes(w)) (hits[w] ??= []).push(rule.selectorText);
    }
  };
  for (const ss of document.styleSheets) { try { walk(ss.cssRules); } catch {} }
  return {
    focusVar_root: rootCs.getPropertyValue("--zq-focus"),
    focusVar_el: cs.getPropertyValue("--zq-focus"),
    blueVar_root: rootCs.getPropertyValue("--zq-blue"),
    ctaHoverVar: cs.getPropertyValue("--zq-cta-hover"),
    colorCtaHover: cs.getPropertyValue("--color-cta-hover"),
    hits,
  };
});
console.log(JSON.stringify(r, null, 1));
await b.close();
