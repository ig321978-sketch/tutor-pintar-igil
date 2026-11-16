// Uji logika murni skill k1b2-s1 (src/lib/belajar). Pakai: node --no-warnings scripts/uji-belajar-s1.mjs
import { register } from "node:module";
register("data:text/javascript," + encodeURIComponent("export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/[.][a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch { return n(s, c); } } return n(s, c); }"), import.meta.url);
const S = await import("../src/lib/belajar/s1-gabung.ts");
const B = await import("../src/lib/belajar/bantuan.ts");
const P = await import("../src/lib/belajar/simpan.ts");
const K = await import("../src/lib/belajar/skema.ts");
let lulus = 0, gagal = 0;
const cek = (ok, ket) => { if (ok) lulus += 1; else { gagal += 1; if (gagal <= 30) console.log("GAGAL:", ket); } };

for (let benih = 1; benih <= 3000; benih += 1) {
  for (const bt of ["benda", "diagram", "lambang"]) {
    const s = S.buatSoal(bt, benih);
    const kunciIndependen = s.a + s.b; // dihitung terpisah dari pembangkit
    cek(s.kunci === kunciIndependen && kunciIndependen >= 4 && kunciIndependen <= 10, `jumlah di rentang ${bt}/${benih}`);
    cek(s.a >= 1 && s.b >= 1, "kelompok tidak kosong");
    cek(s.pilihan.length === 4, `empat pilihan ${bt}/${benih} (${s.pilihan.length})`);
    cek(new Set(s.pilihan.map((p) => p.nilai)).size === s.pilihan.length, "pilihan unik");
    cek(s.pilihan.filter((p) => p.nilai === kunciIndependen).length === 1, "tepat satu kunci");
    cek(s.pilihan.every((p) => p.nilai === kunciIndependen || (p.miskonsepsi && S.MISKONSEPSI_S1[p.miskonsepsi])), "pengecoh punya miskonsepsi");
    cek(!/\d/.test(s.suara), `suara tanpa digit: ${s.suara}`);
    cek(s.suara.split(/[.?!]/).every((k) => k.trim().split(/\s+/).filter(Boolean).length <= 8), `kalimat <= 8 kata: ${s.suara}`);
    cek(!/\b(teman|kelompok belajar|kelas|buku)\b/i.test(s.suara), "kata terlarang");
    const bnr = s.pilihan.find((p) => p.nilai === kunciIndependen);
    cek(S.periksa(s, bnr.id).benar === true, "jawaban benar diterima");
    for (const p of s.pilihan) if (p !== bnr) { const h = S.periksa(s, p.id); cek(!h.benar && h.miskonsepsi === p.miskonsepsi, "jawaban salah ditolak + miskonsepsi"); }
    cek(S.periksa(s, "asing").benar === false, "jawaban asing tidak melempar");
    cek(JSON.stringify(S.buatSoal(bt, benih)) === JSON.stringify(s), "berbenih dapat diulang");
  }
}
for (let benih = 1; benih <= 500; benih += 1) {
  const c = S.buatCek(benih);
  cek(c.length === 5, "cek 5 soal");
  cek(new Set(c.map((x) => `${x.a}+${x.b}`)).size === 5, `cek tanpa soal kembar ${benih}`);
}
for (let a = 1; a <= 8; a += 1) for (let b = 1; b <= 8; b += 1) if (a + b <= 10) {
  const l = S.langkahContoh(a, b);
  cek(l.every((k) => !/\d/.test(k) && k.split(/\s+/).length <= 8), `langkah contoh ${a},${b}`);
}
cek(B.pilihBantuan(0, "benda") === "tidak" && B.pilihBantuan(1, "lambang") === "petunjuk" && B.pilihBantuan(2, "lambang") === "contoh-ulang", "bantuan 0,1,2");
cek(B.pilihBantuan(3, "lambang") === "kembali-ke-benda" && B.pilihBantuan(3, "benda") === "contoh-ulang", "bantuan 3");
cek(B.tawarkanTantangan(5) && !B.tawarkanTantangan(4), "tantangan setelah lima benar");
cek(K.lulusCek(4) && !K.lulusCek(3), "ambang 4 dari 5");
cek(K.kotakBerikut(5, true) === 5 && K.kotakBerikut(3, false) === 0 && K.kotakBerikut(0, true) === 1, "kotak Leitner");
const mem = new Map(); const g = { getItem: (k) => mem.get(k) ?? null, setItem: (k, v) => mem.set(k, v) };
const t0 = new Date("2026-01-01T00:00:00Z");
let t = P.catatCek(g, "k1b2-s1", 5, [], t0);
cek(t.status.kotak === 1 && t.status.jatuhTempo === "2026-01-02T00:00:00.000Z", "lulus pertama jatuh tempo 1 hari");
t = P.catatCek(g, "k1b2-s1", 4, ["m-lewat-satu"], new Date("2026-01-02T00:00:00Z"));
cek(t.status.kotak === 2 && t.status.jatuhTempo === "2026-01-05T00:00:00.000Z", "lulus kedua 3 hari");
t = P.catatCek(g, "k1b2-s1", 2, ["m-ambil-satu"], new Date("2026-01-05T00:00:00Z"));
cek(t.status.kotak === 0 && t.status.jatuhTempo === null && t.catatan.length === 3, "gagal kembali ke kotak 0, catatan miskonsepsi tersimpan");
cek(P.baca({ getItem: () => "{rusak", setItem: () => {} }, "x").status.kotak === 0, "data rusak aman");
// tanpa skor di mode belajar: sumber tidak boleh menyimpan jawaban latihan
import fs from "node:fs";
for (const f of fs.readdirSync("src/lib/belajar")) { const src = fs.readFileSync(`src/lib/belajar/${f}`, "utf8"); cek(!/fetch\(|XMLHttpRequest|supabase/i.test(src), `tanpa jaringan: ${f}`); }
console.log(`${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
