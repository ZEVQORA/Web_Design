import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://127.0.0.1:3000/design-lab", { waitUntil: "networkidle" });
const info = await p.evaluate(() => {
  const el = document.querySelector("#buttons button");
  const want = ["bg-cta-hover", "bg-cta-active", "bg-cta"];
  const found = {};
  for (const ss of document.styleSheets) {
    let rules; try { rules = ss.cssRules; } catch { continue; }
    for (const r of rules) {
      if (!r.selectorText) continue;
      for (const w of want) if (r.selectorText.includes(w)) (found[w] ??= []).push(r.selectorText + " { " + r.style.cssText.slice(0,80) + " }");
    }
  }
  return { classes: el.className, found };
});
console.log("CLASSES:\n ", info.classes, "\n");
for (const [k, v] of Object.entries(info.found)) console.log(k, "->", v.slice(0,2));
for (const k of ["bg-cta-hover","bg-cta-active","bg-cta"]) if (!info.found[k]) console.log(k, "-> NO RULE EMITTED");
await b.close();
