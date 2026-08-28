import { chromium } from "playwright";
const BASE = "http://127.0.0.1:3000";
const route = process.argv[2] ?? "/";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(BASE + route, { waitUntil: "networkidle" });
await p.evaluate(() => document.fonts.ready);

const r = await p.evaluate(() => {
  const lum = (c) => {
    const [r, g, b] = c.match(/\d+/g).slice(0, 3).map(Number).map((v) => {
      v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const ratio = (a, b) => {
    const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
    return (x + 0.05) / (y + 0.05);
  };
  const bg = getComputedStyle(document.body).backgroundColor;
  const samples = {};
  for (const sel of ["h1", "p.text-body-lg", "p.text-eyebrow", ".text-caption"]) {
    const el = document.querySelector(sel);
    if (el) samples[sel] = { color: getComputedStyle(el).color, ratio: +ratio(getComputedStyle(el).color, bg).toFixed(2) };
  }
  const heads = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => h.tagName);
  return {
    bg,
    h1Count: document.querySelectorAll("h1").length,
    headingOrder: heads,
    landmarks: {
      header: document.querySelectorAll("header").length,
      main: document.querySelectorAll("main").length,
      nav: document.querySelectorAll("nav").length,
    },
    navHasLabel: [...document.querySelectorAll("nav")].every((n) => n.hasAttribute("aria-label")),
    skipLink: !!document.querySelector('a[href="#main"]'),
    samples,
    htmlLang: document.documentElement.lang,
  };
});
console.log(JSON.stringify(r, null, 1));
await b.close();
