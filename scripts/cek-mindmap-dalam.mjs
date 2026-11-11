import fs from "node:fs";
import path from "node:path";

const dir = path.join("src", "components", "modul");
let bad = 0;
let ok = 0;
let min = 9999;
for (const f of fs.readdirSync(dir).filter((x) => /^naskah-k[2-6].*\.ts$/.test(x))) {
  const t = fs.readFileSync(path.join(dir, f), "utf8");
  const flows = [...t.matchAll(/"flowFrom":\s*"([^"]+)",\s*\n\s*"flowTo":\s*"([^"]+)"/g)];
  for (const m of flows) {
    if (/^(?:\d+|START|END)$/i.test(m[1]) || /^(?:\d+|START|END)$/i.test(m[2])) {
      bad += 1;
      console.log("BAD", f, m[1], "->", m[2]);
    } else ok += 1;
  }
  const descs = [...t.matchAll(/"stepDesc":\s*"([^"]*)"/g)].map((x) => x[1].length);
  if (descs.length) min = Math.min(min, ...descs);
}
console.log({ ok, bad, minDesc: min });
process.exit(bad ? 1 : 0);
