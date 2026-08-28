import { promises as fs } from "node:fs";
import potrace from "potrace";

const [, , src, dest, tol = "0.2", alpha = "1.0"] = process.argv;

const svg = await new Promise((resolve, reject) => {
  potrace.trace(
    src,
    {
      turdSize: 40,
      alphaMax: Number(alpha),
      optCurve: true,
      optTolerance: Number(tol),
      threshold: 128,
    },
    (err, out) => (err ? reject(err) : resolve(out)),
  );
});

await fs.writeFile(dest, svg, "utf8");
const d = (svg.match(/ d="([^"]+)"/g) || []).join("");
console.log(`tol=${tol} alpha=${alpha} bytes=${svg.length} curves=${(d.match(/C/g)||[]).length}`);
