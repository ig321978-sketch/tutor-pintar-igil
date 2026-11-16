// Membuat sumber/indeks.json dari hasil ekstrak (sumber/ekstrak/*.txt): buku, kelas, bab, judul bab, rentang halaman PDF.
// Hanya data kerangka (judul bab dan nomor halaman), bukan kutipan. Folder sumber/ tidak di-commit.
import fs from "fs";
const dir = "sumber/ekstrak";
const romawi = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6 };
const indeks = {};
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".txt")).sort()) {
  const m = f.match(/Matematika-(BS|BG)-KLS-([IV]+)\.txt/);
  if (!m) continue;
  const [, jenis, rom] = m;
  const kelas = romawi[rom];
  const halaman = fs.readFileSync(`${dir}/${f}`, "utf8").split("\f");
  const bab = {};
  halaman.forEach((h, i) => {
    for (const baris of h.split("\n")) {
      const g = baris.trim().match(/^Bab (\d+)\s*\|\s*(.+?)\s+\d+$/);
      if (g) {
        const n = g[1];
        bab[n] ||= { judul: g[2].trim(), halamanPdf: [i + 1, i + 1] };
        bab[n].halamanPdf[1] = i + 1;
        break;
      }
    }
  });
  if (!Object.keys(bab).length) bab.TODO = { judul: "TODO-RUJUKAN: tajuk bab belum terdeteksi otomatis", halamanPdf: [] };
  (indeks[`kelas${kelas}`] ||= {})[jenis === "BS" ? "bukuSiswa" : "bukuGuru"] = { berkas: f, jumlahHalamanPdf: halaman.length, bab };
}
fs.writeFileSync("sumber/indeks.json", JSON.stringify(indeks, null, 1));
for (const [k, v] of Object.entries(indeks)) console.log(k, Object.entries(v.bukuSiswa?.bab ?? {}).map(([n, b]) => `${n}:${b.judul}`).join(" | "));
