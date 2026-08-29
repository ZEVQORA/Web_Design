import { chromium } from "playwright";
import { promises as fs } from "node:fs";
const [, , svgFile, outPng, widthArg, fill] = process.argv;
const svg = await fs.readFile(svgFile, "utf8");
const W = Number(widthArg);
const m = svg.match(/viewBox="([^"]+)"/) || svg.match(/width="(\d+)" height="(\d+)"/);
const d = svg.match(/ d="([\s\S]*?)"/)[1];
const vb = svg.match(/viewBox="([^"]+)"/)?.[1]
  ?? `0 0 ${svg.match(/width="(\d+)"/)[1]} ${svg.match(/height="(\d+)"/)[1]}`;
const [, , vw, vh] = vb.split(/\s+/).map(Number);
const H = Math.round(W * vh / vw);
const html = `<!doctype html><html><body style="margin:0;background:#F7F8FA">
<svg viewBox="${vb}" width="${W}" height="${H}" style="display:block" fill="${fill || "#0F1115"}" fill-rule="evenodd"><path d="${d}"/></svg></body></html>`;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
await p.setContent(html);
await p.waitForTimeout(150);
await p.locator("svg").screenshot({ path: outPng });
await b.close();
console.log(`rendered ${outPng} (${W}x${H})`);
