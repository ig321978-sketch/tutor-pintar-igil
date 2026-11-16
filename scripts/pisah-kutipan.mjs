// Sekali jalan: memindahkan blok `kutipan: [...]` dari berkas Story Kelas 4 sampai 6 ke sumber/kutipan.json (di luar git).
// Di berkas, blok diganti `kutipan: kutipanLokal("<berkas>:<n>")`. Aman diulang (berkas yang sudah diganti dilewati).
import fs from "node:fs";
import path from "node:path";
const DIR = "src/components/modul/story";
const keluaran = fs.existsSync("sumber/kutipan.json") ? JSON.parse(fs.readFileSync("sumber/kutipan.json", "utf8")) : {};
let berkasUbah = 0, blok = 0;
for (const f of fs.readdirSync(DIR).filter((x) => /^k[456]b.*\.ts$/.test(x))) {
  let s = fs.readFileSync(path.join(DIR, f), "utf8");
  let out = "", i = 0, n = 0;
  for (;;) {
    const m = /kutipan:\s*\[/g;
    m.lastIndex = i;
    const h = m.exec(s);
    if (!h) { out += s.slice(i); break; }
    out += s.slice(i, h.index);
    // pindai larik dengan memperhatikan tanda kutip
    let j = h.index + h[0].length, q = null, kedalaman = 1;
    while (j < s.length && kedalaman > 0) {
      const c = s[j];
      if (q) { if (c === "\\") j += 1; else if (c === q) q = null; }
      else if (c === '"' || c === "'" || c === "`") q = c;
      else if (c === "[") kedalaman += 1;
      else if (c === "]") kedalaman -= 1;
      j += 1;
    }
    const larik = new Function(`return ${s.slice(h.index + h[0].length - 1, j)}`)();
    n += 1;
    keluaran[`${f}:${n}`] = larik;
    out += `kutipan: kutipanLokal("${f}:${n}")`;
    i = j;
  }
  if (n) {
    // sisipkan impor setelah baris impor terakhir
    const baris = out.split("\n");
    let akhir = -1;
    baris.forEach((b, k) => { if (/^import .* from /.test(b) || /^} from /.test(b)) akhir = k; });
    baris.splice(akhir + 1, 0, 'import { kutipanLokal } from "./kutipan-lokal";');
    fs.writeFileSync(path.join(DIR, f), baris.join("\n"));
    berkasUbah += 1; blok += n;
  }
}
fs.writeFileSync("sumber/kutipan.json", JSON.stringify(keluaran));
console.log(`berkas diubah ${berkasUbah}, blok dipindah ${blok}`);
