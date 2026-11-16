// Uji logika murni skill k1b2-s2 (datang lagi), src/lib/belajar. Pakai: node --no-warnings scripts/uji-belajar-s2.mjs
import { register } from "node:module";
register("data:text/javascript," + encodeURIComponent("export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/[.][a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch { return n(s, c); } } return n(s, c); }"), import.meta.url);
const S = await import("../src/lib/belajar/s2-datang-lagi.ts");
let lulus = 0, gagal = 0;
const cek = (ok, ket) => { if (ok) lulus += 1; else { gagal += 1; if (gagal <= 30) console.log("GAGAL:", ket); } };
const TERLARANG = /\b(teman|kelompok|kelas|buku|tambah|bertambah|lebih|kurang|maju|mundur|pasangan|puluhan|gabung|digabung)\b/i;
const sebutan = (t) => t.toLowerCase().split(/[^a-z]+/);

for (let benih = 1; benih <= 3000; benih += 1) {
  for (const bt of ["benda", "diagram", "lambang"]) {
    const s = S.buatSoal(bt, benih);
    const kunci = s.a + s.b; // dihitung terpisah dari pembangkit
    cek(s.skillId === "k1b2-s2" && s.kunci === kunci && kunci >= 4 && kunci <= 10, `jumlah ${bt}/${benih}`);
    cek(s.pilihan.length === 4 && new Set(s.pilihan.map((p) => p.nilai)).size === 4, `empat pilihan unik ${bt}/${benih}`);
    cek(s.pilihan.filter((p) => p.nilai === kunci).length === 1, "tepat satu kunci");
    cek(s.pilihan.every((p) => p.nilai === kunci || (p.miskonsepsi && S.MISKONSEPSI_S2[p.miskonsepsi])), "pengecoh punya miskonsepsi");
    cek(!/\d/.test(s.suara), `tanpa digit: ${s.suara}`);
    cek(s.suara.split(/[.?!]/).every((k) => k.trim().split(/\s+/).filter(Boolean).length <= 8), `kalimat <= 8 kata: ${s.suara}`);
    cek(!TERLARANG.test(s.suara), `kata terlarang: ${s.suara}`);
    cek(s.suara.toLowerCase().includes("datang lagi"), "memuat konteks datang lagi");
    const bnr = s.pilihan.find((p) => p.nilai === kunci);
    cek(S.periksa(s, bnr.id).benar, "kunci diterima");
    for (const p of s.pilihan) if (p !== bnr) { const h = S.periksa(s, p.id); cek(!h.benar && h.miskonsepsi === p.miskonsepsi, "salah ditolak"); }
    cek(!S.periksa(s, "asing").benar, "jawaban asing aman");
    cek(JSON.stringify(S.buatSoal(bt, benih)) === JSON.stringify(s), "berbenih dapat diulang");
  }
}
for (let benih = 1; benih <= 500; benih += 1) {
  const c = S.buatCek(benih);
  cek(c.length === 5 && new Set(c.map((x) => `${x.a}+${x.b}`)).size === 5 && c.every((x) => x.skillId === "k1b2-s2"), `cek lima soal tanpa kembar ${benih}`);
}
for (let a = 1; a <= 8; a += 1) for (let b = 1; b <= 8; b += 1) if (a + b <= 10) {
  const l = S.langkahContoh(a, b);
  cek(l.every((k) => !/\d/.test(k) && k.split(/\s+/).length <= 8 && !TERLARANG.test(k)), `langkah ${a},${b}: ${l.join(" | ")}`);
}
console.log(`${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
