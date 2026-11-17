// Uji tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 2 Sub-Bab B ("Panen Pertama dan Keranjang Sepuluh").
// Memeriksa: gerobak panen (Masalah, Penyelesaian berurutan memuat semua metode Story, Hasil), nota panen dari data Story, CPA dua belas soal per tahap
// (Klik, Kanvas, Suara x empat metode), kunci dihitung ulang, angka jawaban tidak kembar per tahap dan bilangan berbeda dari Story,
// kartu tukar tempat (tepat satu cocok), tata letak kanvas, simulasi meja kemas dan misinya, emoji dan akhir baris.
// Jalankan: node --no-warnings scripts/uji-panen-k1b2b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/panen-k1b2b/logika.ts");
const D = await import("../src/components/modul/panen-k1b2b/data.ts");
const K = await import("../src/components/modul/panen-k1b2b/periksa.ts");
const M = await import("../src/components/modul/misi-bab2.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");

let lulus = 0;
let gagal = 0;
const cek = (k, p) => {
  if (k) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", p);
  }
};
const sama = (a, b, p) => cek(JSON.stringify(a) === JSON.stringify(b), `${p}: ${JSON.stringify(a)} != ${JSON.stringify(b)}`);
const TERLARANG = /\b(kelas|buku|teman|kelompok|kurang|dikurangi|skor|nilai)\b/i;

/* ------------------------------ Mind-map gerobak panen ------------------------------ */
{
  const t = D.TEMPAT_GEROBAK;
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 8, 3], "gerobak: tiga masalah, delapan karung, tiga hasil");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && t.every((x) => x.kunci.length <= 28 && !/\d/.test(x.kunci)), "gerobak: label unik, pendek, tanpa digit");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7, 8], "gerobak: karung bernomor satu sampai delapan");
  const gab = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["pasangan bilangan", "tukar tempat", "hitung maju", "berulang", "pasangan sepuluh", "garis bilangan", "kembar", "membuat sepuluh"]) cek(gab.includes(k), `gerobak: langkah memuat "${k}"`);
  cek(t.every((x) => !/tomat|timun|cabai|wortel|terong|bawang|kentang|igil|kaka|abang|mamah|nenek/i.test(x.kunci)), "gerobak: label hanya poin pelajaran");
  cek(!/\d/.test(D.SUARA_GEROBAK + D.PETUNJUK_URUT_GEROBAK) && !TERLARANG.test(D.SUARA_GEROBAK), "gerobak: suara tanpa digit dan kata terlarang");
  const lb = L.labelDari(t, 43);
  let ok = true;
  for (const x of t) for (const l of lb) {
    const harus = x.urutan !== undefined ? l.teks === x.kunci : t.find((y) => y.kunci === l.teks).kelompok === x.kelompok;
    if (L.cocokKelompok(t, x, l) !== harus) ok = false;
  }
  cek(ok, "gerobak: karung hanya menerima labelnya sendiri");
}

/* ------------------------------ Infografis nota panen ------------------------------ */
{
  const b = D.BARIS_NOTA;
  sama(b.map((x) => x.kalimat), ["2 + 3 = 5", "6 + 3 = 9", "4 + 4 = 8", "2 + 2 = 4", "7 + 3 = 10"], "nota: data dari Story");
  for (const x of b) {
    const [p, q] = x.bilangan.split(" dan ").map(Number);
    const [a, , c, , h] = x.kalimat.split(" ").map((v) => (/\d/.test(v) ? Number(v) : v));
    cek(a + c === h && p + q === h && [p, q].sort().join() === [a, c].sort().join(), `nota: ${x.nama} cocok dan benar`);
  }
  sama(D.TEMPAT_NOTA.length, 15, "nota: lima belas isian");
  cek(D.TEMPAT_NOTA.every((x) => x.kunci.length <= 18) && !/\d/.test(D.SUARA_NOTA), "nota: label pendek, suara tanpa digit");
}

/* ------------------------------ CPA ------------------------------ */
const kunciPasang = (a, b) => [a, b].sort((p, q) => p - q).join("+");
const STORY = new Set([[3, 2], [6, 3], [4, 4], [2, 2], [7, 3], [5, 4], [3, 3], [8, 2]].map(([a, b]) => kunciPasang(a, b)));
const BERULANG_STORY = new Set(["4x2", "2x2", "3x2"]);
for (const [nama, soal, rupa] of [["Concrete", D.CONCRETE, "benda"], ["Pictorial", D.PICTORIAL, "diagram"], ["Abstract", D.ABSTRACT, "lambang"]]) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara`);
  sama(soal.map((s) => Number(/Panen (\d+)/.exec(s.judul)[1])), { benda: [2, 3, 4], diagram: [5, 6, 7], lambang: [8, 9, 10] }[rupa], `${nama}: nomor misi berlanjut`);
  const semua = soal.flatMap((s) => s.langkah);
  sama(semua.length, 12, `${nama}: dua belas soal`);
  for (const s of soal) {
    sama(s.langkah.map((x) => x.metode), L.URUT_METODE, `${nama} ${s.cara}: empat metode`);
    cek(!TERLARANG.test(s.judul + s.cerita) && !/\d/.test(s.cerita), `${nama} ${s.cara}: cerita bersih`);
    cek(D.EMOJI[s.benda] !== undefined, `${nama} ${s.cara}: benda punya gambar`);
  }
  const angka = semua.map((x) => L.angkaJawab(x.langkah)).filter((n) => n !== null);
  cek(new Set(angka).size === angka.length && angka.length === 10, `${nama}: sepuluh angka jawaban tidak kembar (${angka.join(",")})`);
  cek(angka.every((n) => n >= 0 && n <= 10) && angka.includes(10), `${nama}: jawaban nol sampai sepuluh, ada sepuluh`);
  for (const x of semua) {
    const l = x.langkah;
    const harus = l.tipe === "tukar" ? null : l.tipe === "berulang" ? l.n * l.k : l.tipe === "sepuluh" ? 10 - l.a : l.a + l.b;
    sama(L.kunciLangkah(l), harus, `${nama} ${x.metode}/${x.cara}: kunci`);
    if (l.tipe === "tukar" || l.tipe === "pasangan" || l.tipe === "garis") cek(l.a + l.b <= 10 && !STORY.has(kunciPasang(l.a, l.b)), `${nama} ${x.metode}/${x.cara}: ${l.a} dan ${l.b} berbeda dari Story`);
    if (l.tipe === "tukar") {
      const b = L.nomorTukar(l);
      cek(l.a !== l.b && b.length === 1 && l.pilihan.length === 3 && new Set(l.pilihan.map(L.tulisKalimat)).size === 3, `${nama}: tepat satu kalimat tukar cocok dari tiga`);
      cek(l.pilihan.every((p) => p.every((v) => v >= 0 && v <= 10)) && l.pilihan.some((p) => p[0] + p[1] !== p[2]), `${nama}: pengecoh tukar dalam batas`);
      cek(x.cara !== "suara", `${nama}: tukar tidak untuk suara`);
    }
    if (l.tipe === "garis") cek(l.b >= 1 && l.b <= 4, `${nama}: garis melompat satu sampai empat kali`);
    if (l.tipe === "berulang") cek(l.k >= 2 && l.n >= 1 && l.n <= 5 && l.n * l.k <= 10 && !BERULANG_STORY.has(`${l.n}x${l.k}`), `${nama}: berulang ${l.n} sebanyak ${l.k} kali berbeda dari Story`);
    if (l.tipe === "sepuluh") cek(l.a >= 0 && l.a <= 10 && ![7, 8].includes(l.a), `${nama}: sepuluh mulai dari ${l.a} berbeda dari Story`);
    if (harus !== null) {
      const p = L.pilihanDari(l);
      cek(p.includes(harus) && new Set(p).size === 3 && p.every((v) => v >= 0 && v <= 10), `${nama} ${x.metode}/${x.cara}: pilihan memuat kunci`);
    }
    if (x.cara === "suara") cek(harus !== null, `${nama}: soal suara berjawaban angka`);
    cek(!/\d/.test(x.suara) && !TERLARANG.test(x.suara) && x.suara.length <= 170, `${nama} ${x.metode}/${x.cara}: instruksi tanpa digit ("${x.suara}")`);
  }
  const L2 = semua.map((x) => x.langkah);
  cek(L2.some((l) => l.tipe === "berulang" && l.k === 2) && L2.some((l) => l.tipe === "berulang" && l.k > 2), `${nama}: kembar dan berulang lebih dari dua kali`);
}
{
  const semua = [D.CONCRETE, D.PICTORIAL, D.ABSTRACT].flat().flatMap((s) => s.langkah.map((x) => x.langkah));
  cek(semua.some((l) => l.tipe === "sepuluh" && l.a === 10) && semua.some((l) => l.tipe === "sepuluh" && l.a === 0) && semua.some((l) => l.tipe === "pasangan" && l.b === 0), "CPA: kasus nol dan penuh sepuluh");
  cek(L.tulisBerulang(2, 3) === "2 + 2 + 2 = 6" && L.bacaBerulang(2, 3) === "dua ditambah dua ditambah dua sama dengan enam", "berulang: ditulis dan dibaca");
  cek(D.POIN_PENTING.length >= 5 && D.POIN_PENTING_SUARA.every((p) => !/[+=\d]/.test(p)), "poin penting: suara tanpa lambang dan digit");
}

/* ------------------------------ Kanvas dan tata letak ------------------------------ */
{
  for (let k = 2; k <= 5; k += 1) {
    cek(K.xKantong(k, 0) >= 4 && K.xKantong(k, k - 1) + K.KANTONG.w <= 296, `kantong: ${k} kantong masuk kanvas`);
    for (let j = 0; j < k; j += 1) for (let i = 0; i < 5; i += 1) {
      const p = K.diKantong(k, j, i);
      if (!(p.x > K.xKantong(k, j) + 6 && p.x < K.xKantong(k, j) + K.KANTONG.w - 6 && p.y < K.KANTONG.y + K.KANTONG.h - 6)) cek(false, `kantong ${k}/${j}: benda ${i} di dalam`);
    }
  }
  cek(K.xAngka(0) >= 10 && K.xAngka(10) <= 290, "garis: nol sampai sepuluh masuk kanvas");
  const tanda = (p) => [{ x: p.x - 3, y: p.y - 3 }, { x: p.x + 3, y: p.y + 3 }];
  for (const batu of [true, false]) {
    const sas = [5, 6, 7].map((n) => K.titikAngka(n, batu));
    cek(K.periksaCentang(sas.map(tanda), sas, 11).benar, `garis: tanda di tempat mendarat diterima (${batu ? "batu" : "angka"})`);
    const r = K.periksaCentang([...sas.map(tanda), tanda(K.titikAngka(4, batu))], sas, 11);
    cek(!r.benar && r.nyasar === 1, `garis: tanda di angka awal ditolak (${batu ? "batu" : "angka"})`);
  }
  const kt = [0, 1, 2].map((j) => K.tengahKantong(3, j));
  cek(K.periksaCentang(kt.map(tanda), kt, 24).benar && !K.periksaCentang(kt.slice(0, 2).map(tanda), kt, 24).benar, "kantong: satu tanda per kantong");
}

/* ------------------------------ Simulasi meja kemas ------------------------------ */
{
  let k = L.awalPanen(D.AWAL_SIM.a, D.AWAL_SIM.b);
  sama([k.a, k.b, k.ditukar], [3, 1, 0], "kemas: awal tiga dan satu");
  k = L.tukarTempat(k);
  sama([k.a, k.b, k.ditukar], [1, 3, 1], "kemas: tukar tempat");
  k = L.ubahIsi(k, "b", -1);
  k = L.ubahIsi(k, "b", -1);
  k = L.tukarTempat(L.tukarTempat(L.ubahIsi(k, "a", 1)));
  sama([k.a, k.b, k.ditukar], [2, 1, 3], "kemas: tukar dua kali kembali seperti semula");
  let p = L.awalPanen(5, 5);
  sama(L.ubahIsi(p, "a", 1), p, "kemas: paling banyak sepuluh");
  p = L.catatPanen(p);
  sama(L.catatPanen(p), p, "kemas: catatan kembar diabaikan");
  sama(L.tukarTempat(p).ditukar, 0, "kemas: tukar yang kembar tidak dihitung");
  for (const [a, b] of [[0, 0], [3, 4], [5, 5]]) cek(!/\d/.test(L.kalimatPanen(L.awalPanen(a, b))) && !TERLARANG.test(L.kalimatPanen(L.awalPanen(a, b))), `kemas: kalimat tanpa digit ${a} dan ${b}`);
  const daftar = M.daftarMisiBab2("B");
  const ada = (st, id) => S.misiBaru(daftar, st, new Set()).includes(id);
  const awal = L.awalPanen(D.AWAL_SIM.a, D.AWAL_SIM.b);
  cek(daftar.filter((x) => x.wajib).length === 4 && daftar.some((x) => !x.wajib) && daftar.every((x) => !/\d/.test(x.teks)), "misi B: empat wajib, ada bebas, tanpa digit");
  cek(daftar.every((x) => !x.cek(awal)), "misi B: awal belum tercapai");
  cek(ada(L.tukarTempat(awal), "b-tukar"), "misi B: tukar tempat");
  cek(ada(L.awalPanen(2, 6), "b-maju") && !ada(L.awalPanen(6, 2), "b-maju"), "misi B: dua ditambah enam");
  cek(ada(L.catatPanen(L.awalPanen(3, 3)), "b-kembar") && !ada(L.catatPanen(L.awalPanen(0, 0)), "b-kembar"), "misi B: kembar dicatat");
  cek(ada(L.catatPanen(L.tukarTempat(L.catatPanen(L.awalPanen(6, 4)))), "b-sepuluh") && !ada(L.catatPanen(L.awalPanen(6, 4)), "b-sepuluh"), "misi B: dua kalimat sepuluh (tukar tempat)");
  cek(ada(L.catatPanen(L.awalPanen(4, 0)), "b-nol") && ada(L.catatPanen(L.awalPanen(4, 5)), "b-sembilan"), "misi B: bebas");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const folder = new URL("../src/components/modul/panen-k1b2b/", import.meta.url);
  const berkas = readdirSync(folder);
  cek(berkas.length >= 8, `berkas panen-k1b2b (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d) && !/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}/i.test(s), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/fetch\(|XMLHttpRequest/i.test(s), `${f}: tanpa jaringan`);
    if (/\.ts$/.test(f)) cek(!/from "react"/.test(s), `${f}: tanpa React`);
    const str = [...s.matchAll(/"([^"\n]{12,})"/g)].map((m) => m[1]).filter((x) => /\s/.test(x) && !x.includes("===") && !/^[a-z-]+( [a-z-:[\]#/0-9.()_,'%]+)*$/.test(x));
    cek(str.every((x) => !/\b(kelas|buku|teman|kelompok|skor|nilai|kurang)\b/i.test(x)), `${f}: teks tanpa kata terlarang`);
  }
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
