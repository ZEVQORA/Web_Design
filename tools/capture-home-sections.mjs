import { chromium } from "playwright";
const OUT = process.argv[2];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await p.goto("http://127.0.0.1:3100/", { waitUntil: "networkidle" });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(400);

const names = ["hero","connect","spend","diagnosis","experiment","replay","proof","verified-change","reveal","askzev","who","partner","pricing","finalcta"];
const sections = p.locator("main > section, main > div > section, main section").filter({ has: p.locator("*") });
const count = await p.locator("main section").count();
console.log("sections found:", count);
for (let i = 0; i < Math.min(count, names.length); i++) {
  const el = p.locator("main section").nth(i);
  await el.scrollIntoViewIfNeeded();
  await p.waitForTimeout(450);
  try {
    await el.screenshot({ path: `${OUT}/sec-${String(i).padStart(2,"0")}-${names[i]}.png` });
    console.log("  ", names[i]);
  } catch (e) { console.log("   skip", names[i], e.message.slice(0,50)); }
}
await b.close();
