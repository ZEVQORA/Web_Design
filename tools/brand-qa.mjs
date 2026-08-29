/** Renders the real lockup components at brand-critical sizes for review. */
import { chromium } from "playwright";
const OUT = process.argv[2];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 3 });
await p.goto("http://127.0.0.1:3000/design-lab", { waitUntil: "networkidle" });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(300);

const brand = p.locator("#brand");
await brand.scrollIntoViewIfNeeded();
await p.waitForTimeout(200);
await brand.screenshot({ path: `${OUT}/brand-section.png` });

// 40px and 24px lockups, captured tight
const lock40 = brand.locator("span").first();
await lock40.screenshot({ path: `${OUT}/lockup-40.png` });

// ink lockup
const ink = p.locator('#brand [data-surface="ink"]');
await ink.screenshot({ path: `${OUT}/lockup-ink.png` });

// large logo close-up: render the real components scaled up in place
await p.evaluate(() => {
  const host = document.createElement("div");
  host.id = "zq-big";
  host.style.cssText = "position:fixed;inset:0;background:#F7F8FA;z-index:9999;display:flex;align-items:center;justify-content:center;";
  const src = document.querySelector("#brand span");
  const clone = src.cloneNode(true);
  clone.style.transform = "scale(4)";
  clone.style.transformOrigin = "center";
  host.appendChild(clone);
  document.body.appendChild(host);
});
await p.waitForTimeout(200);
await p.screenshot({ path: `${OUT}/logo-large.png` });
await p.evaluate(() => document.getElementById("zq-big")?.remove());

// header lockup at its real 26px size, on the homepage
const h = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 3 });
await h.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle" });
await h.evaluate(() => document.fonts.ready);
await h.waitForTimeout(300);
await h.locator("header a[aria-label='ZEVQORA home']").screenshot({ path: `${OUT}/header-lockup-26.png` });
await b.close();
console.log("brand QA captures written");
