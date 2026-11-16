// Uji logika murni skill k1b2-s3 (kalimat penjumlahan), src/lib/belajar. Pakai: node --no-warnings scripts/uji-belajar-s3.mjs
import { register } from "node:module";
register("data:text/javascript," + encodeURIComponent("export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/[.][a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch { return n(s, c); } } return n(s, c); }"), import.meta.url);
const S = await import("../src/lib/belajar/s3-kalimat.ts");
let lulus = 0, gagal = 0;
const cek = (ok, ket) => { if (ok) lulus += 1; else { gagal += 1; if (gagal <= 30) console.log("GAGAL:", ket); } };
const KATA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas"];
const TERLARANG = /\b(teman|kelas|buku|kurang|dikurangi|maju|mundur|pasangan|puluhan|lebih|bagi|kali)\b/i;
// pembaca kalimat tertulis, terpisah dari pembangkit
const urai = (t) => { const m = /^(\d+) \+ (\d+) = (\d+)$/.exec(t); return m ? m.slice(1).map(Number) : null; };
const uraiBaca = (t) => { const w = t.toLowerCase().split(/\s+/); if (w[1] !== "ditambah" || w[3] !== "hasilnya" || w[4] !== "adalah") return null; return [w[0], w[2], w[5]].map((x) => KATA.indexOf(x)); };

for (let benih = 1; benih <= 3000; benih += 1) {
  for (const bt of ["benda", "diagram", "lambang"]) {
    const s = S.buatSoal(bt, benih);
    const c = s.a + s.b;
    cek(s.skillId === "k1b2-s3" && s.kunci === c && c >= 4 && c <= 10, `jumlah ${bt}/${benih}`);
    cek(s.pilihan.length === 4 && new Set(s.pilihan.map((p) => p.label)).size === 4, `empat kalimat unik ${bt}/${benih}`);
    const kunci = s.pilihan.filter((p) => p.miskonsepsi === null);
    cek(kunci.length === 1, "tepat satu kunci");
    // kunci dihitung ulang dari teks kalimat, bukan dari field pembangkit
    const u = bt === "lambang" ? uraiBaca(kunci[0].label) : urai(kunci[0].label);
    cek(u && u[0] === s.a && u[1] === s.b && u[2] === s.a + s.b, `kalimat kunci benar: ${kunci[0].label}`);
    for (const p of s.pilihan) {
      if (p.miskonsepsi === null) continue;
      const v = bt === "lambang" ? uraiBaca(p.label) : urai(p.label);
      const salahNyata = !(v && v[0] === s.a && v[1] === s.b && v[2] === s.a + s.b);
      cek(salahNyata && S.MISKONSEPSI_S3[p.miskonsepsi], `pengecoh sungguh salah: ${p.label}`);
    }
    if (bt === "lambang") {
      cek(s.kalimat && urai(s.kalimat)?.join() === [s.a, s.b, c].join(), "kalimat tampil benar");
      cek(s.pilihan.every((p) => !/\d/.test(p.label)), "bacaan tanpa digit");
    } else cek(s.pilihan.every((p) => urai(p.label) || /^\d+ = \d+ \+ \d+$/.test(p.label)), "bentuk kalimat tulis");
    cek(!/\d/.test(s.suara), `suara tanpa digit: ${s.suara}`);
    cek(s.suara.split(/[.?!]/).every((k) => k.trim().split(/\s+/).filter(Boolean).length <= 8), `kalimat <= 8 kata: ${s.suara}`);
    cek(!TERLARANG.test(s.suara), "kata terlarang");
    cek(S.periksa(s, kunci[0].id).benar, "kunci diterima");
    for (const p of s.pilihan) if (p.miskonsepsi !== null) cek(!S.periksa(s, p.id).benar && S.periksa(s, p.id).miskonsepsi === p.miskonsepsi, "salah ditolak");
    cek(!S.periksa(s, "asing").benar, "asing aman");
    cek(JSON.stringify(S.buatSoal(bt, benih)) === JSON.stringify(s), "dapat diulang");
  }
}
for (let benih = 1; benih <= 500; benih += 1) {
  const c = S.buatCek(benih);
  cek(c.length === 5 && new Set(c.map((x) => `${x.a}+${x.b}`)).size === 5 && c.every((x) => x.skillId === "k1b2-s3"), `cek ${benih}`);
}
for (let a = 1; a <= 8; a += 1) for (let b = 1; b <= 8; b += 1) if (a + b <= 10) {
  const l = S.langkahContoh(a, b);
  cek(l.every((k) => !/\d/.test(k) && k.split(/\s+/).length <= 8 && !TERLARANG.test(k)), `langkah ${a},${b}: ${l.join(" | ")}`);
}
console.log(`${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
