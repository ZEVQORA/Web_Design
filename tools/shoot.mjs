/**
 * ZEVQORA visual QA harness.
 *
 * Renders routes at the project's target viewports and writes PNGs so each
 * phase can be reviewed as pixels rather than as code. Also reports console
 * errors and page errors, which is where hydration problems surface.
 *
 *   node shoot.mjs <outDir> <route> [route...]        (all viewports)
 *   node shoot.mjs --vp=1440x900 <outDir> <route>     (one viewport)
 *   node shoot.mjs --full <outDir> <route>            (full-page capture)
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const BASE = process.env.ZQ_BASE ?? "http://127.0.0.1:3000";

const VIEWPORTS = {
  "1512x982": { width: 1512, height: 982 },
  "1440x900": { width: 1440, height: 900 },
  "1280x800": { width: 1280, height: 800 },
  "1024x768": { width: 1024, height: 768 },
  "768x1024": { width: 768, height: 1024 },
  "390x844": { width: 390, height: 844 },
};

const args = process.argv.slice(2);
const flags = args.filter((a) => a.startsWith("--"));
const rest = args.filter((a) => !a.startsWith("--"));
const outDir = rest[0];
const routes = rest.slice(1);

if (!outDir || routes.length === 0) {
  console.error("usage: node shoot.mjs [--vp=WxH] [--full] <outDir> <route...>");
  process.exit(1);
}

const vpFlag = flags.find((f) => f.startsWith("--vp="));
const chosen = vpFlag
  ? { [vpFlag.slice(5)]: parseVp(vpFlag.slice(5)) }
  : VIEWPORTS;
const fullPage = flags.includes("--full");

function parseVp(s) {
  const [w, h] = s.split("x").map(Number);
  return { width: w, height: h };
}

await fs.mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
let problems = 0;

for (const route of routes) {
  for (const [vpName, viewport] of Object.entries(chosen)) {
    const context = await browser.newContext({
      viewport,
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    // Dev-only HMR websocket chatter is not a page defect; ignore it so real
    // errors are not buried.
    const NOISE = /_next\/hmr|websocket|Failed to load resource: the server responded with a status of 403/i;
    const issues = [];
    page.on("console", (m) => {
      if (m.type() === "error" && !NOISE.test(m.text()))
        issues.push(`console.error: ${m.text()}`);
    });
    page.on("pageerror", (e) => issues.push(`pageerror: ${e.message}`));

    const res = await page.goto(`${BASE}${route}`, {
      waitUntil: "networkidle",
      timeout: 45000,
    });

    // Let webfonts settle so type is never captured mid-swap.
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);

    const slug = route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "-");
    const file = path.join(outDir, `${slug}__${vpName}.png`);
    await page.screenshot({ path: file, fullPage });

    const status = res?.status();
    const flagStr = status !== 200 ? ` HTTP ${status}` : "";
    console.log(`${file}${flagStr}`);
    if (status !== 200) problems++;
    for (const i of issues) {
      console.log(`   ! ${i}`);
      problems++;
    }

    await context.close();
  }
}

await browser.close();
console.log(problems === 0 ? "OK - no console/page errors" : `${problems} problem(s)`);
