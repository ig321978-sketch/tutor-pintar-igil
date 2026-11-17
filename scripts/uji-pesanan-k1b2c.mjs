// Uji tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 2 Sub-Bab C ("Pesanan Tetangga"), akhir cerita Bab 2.
// Memeriksa: loker pos (Masalah, Penyelesaian berurutan memuat semua metode Story, Hasil), label kiriman dari data Story, CPA dua belas soal per tahap
// (Klik, Kanvas, Suara x empat metode), kunci dihitung ulang, angka jawaban tidak kembar per tahap dan bilangan berbeda dari Story,
// cerita pesanan tanpa digit dan bilangannya bisa ditemukan, kartu kalimat (tepat satu cocok), titik gambar tangan,
// simulasi pembuat pesanan dan misinya, emoji dan akhir baris.
// Jalankan: node --no-warnings scripts/uji-pesanan-k1b2c.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/pesanan-k1b2c/logika.ts");
const D = await import("../src/components/modul/pesanan-k1b2c/data.ts");
const K = await import("../src/components/modul/pesanan-k1b2c/periksa.ts");
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
const TERLARANG = /\b(kelas|buku|teman|kelompok|kurang|kurangi|dikurangi|skor|nilai)\b/i;

/* ------------------------------ Mind-map loker pos ------------------------------ */
{
  const t = D.TEMPAT_LOKER;
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 9, 3], "loker: tiga masalah, sembilan loker, tiga hasil");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && t.every((x) => x.kunci.length <= 28 && !/\d/.test(x.kunci)), "loker: label unik, pendek, tanpa digit");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7, 8, 9], "loker: loker bernomor satu sampai sembilan");
  const gab = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["baca", "cari dua bilangan", "tanda tambah", "tulis", "kalimat lengkap", "periksa", "peragakan", "gambar", "model batang"]) cek(gab.includes(k), `loker: langkah memuat "${k}"`);
  cek(t.every((x) => !/tomat|timun|wortel|jagung|igil|kaka|abang|mamah|nenek|tetangga/i.test(x.kunci)), "loker: label hanya poin pelajaran");
  cek(!/\d/.test(D.SUARA_LOKER + D.PETUNJUK_URUT_LOKER) && !TERLARANG.test(D.SUARA_LOKER), "loker: suara tanpa digit dan kata terlarang");
  const lb = L.labelDari(t, 53);
  let ok = true;
  for (const x of t) for (const l of lb) {
    const harus = x.urutan !== undefined ? l.teks === x.kunci : t.find((y) => y.kunci === l.teks).kelompok === x.kelompok;
    if (L.cocokKelompok(t, x, l) !== harus) ok = false;
  }
  cek(ok, "loker: loker hanya menerima labelnya sendiri");
}

/* ------------------------------ Infografis label kiriman ------------------------------ */
{
  const b = D.BARIS_LABEL;
  sama(b.map((x) => x.kalimat), ["4 + 3 = 7", "2 + 5 = 7", "6 + 4 = 10"], "label: data dari Story");
  for (const x of b) {
    const [p, q] = x.bilangan.split(" dan ").map(Number);
    const [a, , c, , h] = x.kalimat.split(" ").map((v) => (/\d/.test(v) ? Number(v) : v));
    cek(a === p && c === q && a + c === h && x.jawaban.includes(String(h)), `label: ${x.nama} cocok dan benar`);
  }
  sama(D.TEMPAT_LABEL.length, 9, "label: sembilan isian");
  cek(D.TEMPAT_LABEL.every((x) => x.kunci.length <= 18) && !/\d/.test(D.SUARA_LABEL), "label: label pendek, suara tanpa digit");
}

/* ------------------------------ CPA ------------------------------ */
const kunciPasang = (a, b) => [a, b].sort((p, q) => p - q).join("+");
const STORY = new Set([[4, 3], [2, 5], [6, 4], [3, 2], [3, 6], [2, 6]].map(([a, b]) => kunciPasang(a, b)));
for (const [nama, soal, rupa] of [["Concrete", D.CONCRETE, "benda"], ["Pictorial", D.PICTORIAL, "diagram"], ["Abstract", D.ABSTRACT, "lambang"]]) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara`);
  sama(soal.map((s) => Number(/Pesanan (\d+)/.exec(s.judul)[1])), { benda: [2, 3, 4], diagram: [5, 6, 7], lambang: [8, 9, 10] }[rupa], `${nama}: nomor misi berlanjut`);
  const semua = soal.flatMap((s) => s.langkah);
  sama(semua.length, 12, `${nama}: dua belas soal`);
  for (const s of soal) {
    sama(s.langkah.map((x) => x.metode), L.URUT_METODE, `${nama} ${s.cara}: empat metode`);
    cek(!TERLARANG.test(s.judul + s.cerita) && !/\d/.test(s.cerita), `${nama} ${s.cara}: cerita bersih`);
    cek(D.EMOJI[s.benda] !== undefined && s.nama.length > 2, `${nama} ${s.cara}: benda punya gambar dan nama`);
  }
  const angka = semua.map((x) => L.angkaJawab(x.langkah)).filter((n) => n !== null);
  cek(new Set(angka).size === angka.length && angka.length === 10, `${nama}: sepuluh angka jawaban tidak kembar (${angka.join(",")})`);
  cek(angka.every((n) => n >= 1 && n <= 10) && angka.includes(10), `${nama}: jawaban satu sampai sepuluh, ada sepuluh`);
  semua.forEach((x, j) => {
    const l = x.langkah;
    const nm = soal[Math.floor(j / 4)].nama;
    const harus = l.tipe === "kalimat" ? null : l.a + l.b;
    sama(L.kunciLangkah(l), harus, `${nama} ${x.metode}/${x.cara}: kunci`);
    cek(l.a + l.b <= 10 && !STORY.has(kunciPasang(l.a, l.b)), `${nama} ${x.metode}/${x.cara}: ${l.a} dan ${l.b} berbeda dari Story`);
    const cerita = L.kisah(l.jenis, l.a, l.b, nm);
    cek(!/\d/.test(cerita) && /semuanya\?$/.test(cerita) && cerita.includes(nm), `${nama}: cerita pesanan tanpa digit dan bertanya semuanya`);
    const [ia, ib] = L.nomorBilangan(l, nm);
    const ks = L.kataCerita(l, nm).map((k) => k.toLowerCase().replace(/[^a-z]/g, ""));
    cek(ia >= 0 && ib > ia && ks[ia] === L.kata(l.a) && ks[ib] === L.kata(l.b), `${nama}: dua bilangan ditemukan dalam cerita (${l.a} dan ${l.b})`);
    if (l.tipe === "kalimat") {
      const b = L.nomorBenar(l);
      cek(b.length === 1 && l.pilihan.length === 3 && new Set(l.pilihan.map(L.tulisKalimat)).size === 3 && l.pilihan.every((p) => p.every((v) => v >= 0 && v <= 10)), `${nama}: tepat satu kalimat cocok dari tiga`);
      cek(x.cara !== "suara", `${nama}: kalimat tidak untuk suara`);
    }
    if (l.tipe === "cerita") cek(x.cara === "suara", `${nama}: cari bilangan untuk suara`);
    if (l.tipe === "gambar" && x.cara === "kanvas") cek(l.a + l.b <= 6, `${nama}: gambar tangan paling banyak enam titik`);
    if (harus !== null) {
      const p = L.pilihanDari(l);
      cek(p.includes(harus) && new Set(p).size === 3 && p.every((v) => v >= 0 && v <= 10), `${nama} ${x.metode}/${x.cara}: pilihan memuat kunci`);
    }
    if (x.cara === "suara") cek(harus !== null, `${nama}: soal suara berjawaban angka`);
    cek(!/\d/.test(x.suara) && !TERLARANG.test(x.suara) && x.suara.length <= 230, `${nama} ${x.metode}/${x.cara}: instruksi tanpa digit ("${x.suara}")`);
  });
  const L2 = semua.map((x) => x.langkah);
  cek(L2.some((l) => l.jenis === "gabung") && L2.some((l) => l.jenis === "datang") && L2.some((l) => l.a === 0 || l.b === 0), `${nama}: cerita gabung, datang, dan nol`);
}
{
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING_SUARA.every((p) => !/[+=\d]/.test(p)), "poin penting: suara tanpa lambang dan digit");
  cek(L.jawabLengkap({ tipe: "peraga", a: 2, b: 3, jenis: "datang" }, "tomat") === "Jadi, lima tomat.", "jawaban lengkap");
}

/* ------------------------------ Kanvas dan tata letak ------------------------------ */
{
  const tanda = (p) => [{ x: p.x - 3, y: p.y - 3 }, { x: p.x + 3, y: p.y + 3 }];
  const r1 = K.hitungTitikBaris([tanda({ x: 40, y: 60 }), tanda({ x: 80, y: 62 }), tanda({ x: 60, y: 150 })]);
  sama([r1.atas, r1.bawah, r1.coretan], [2, 1, 0], "titik: dua di atas, satu di bawah");
  sama(K.hitungTitikBaris([[{ x: 20, y: 60 }, { x: 120, y: 60 }]]).coretan, 1, "titik: coretan panjang ditolak");
  let ok = true;
  for (let i = 0; i < 10; i += 1) {
    const p = K.diRak(K.RAK_A, i);
    const q = K.diKantong(i);
    const s = K.slotGambar(1, i);
    if (!(p.x < K.RAK_A.x + K.RAK_A.w - 6 && p.y < K.RAK_A.y + K.RAK_A.h - 4 && q.x < K.KANTONG.x + K.KANTONG.w - 6 && q.y < K.KANTONG.y + K.KANTONG.h - 4 && s.x + 12 <= 292)) ok = false;
  }
  for (let a = 0; a <= 10; a += 1) for (let b = 1; a + b <= 10; b += 1) if (K.selB(a, b - 1).x + 12 > 296) ok = false;
  cek(ok, "tata letak rak, kantong, gambar, dan batang masuk kanvas");
}

/* ------------------------------ Simulasi pembuat pesanan ------------------------------ */
{
  let k = L.awalPesanan();
  sama([k.sayur, k.jenis, k.a, k.b], ["tomat", "datang", 1, 1], "pesanan: awal");
  for (let i = 0; i < 12; i += 1) k = L.ubahBilangan(k, "a", 1);
  sama(k.a + k.b, 10, "pesanan: paling banyak sepuluh");
  k = L.ubahBilangan(L.ubahBilangan(k, "b", -1), "b", -1);
  sama(k.b, 0, "pesanan: tidak di bawah nol");
  cek(!/\d/.test(L.ceritaPesanan(k)) && !/\d/.test(L.jawabanPesanan(k)) && !TERLARANG.test(L.jawabanPesanan(k)), "pesanan: cerita dan jawaban tanpa digit");
  const k1 = L.kirimPesanan(k);
  sama(L.kirimPesanan(k1), k1, "pesanan: kiriman kembar diabaikan");
  sama(L.periksaTukar({ ...k, a: 3, b: 3 }).diperiksa, 0, "pesanan: periksa kembar tidak dihitung");
  const daftar = M.daftarMisiBab2("C");
  const ada = (st, id) => S.misiBaru(daftar, st, new Set()).includes(id);
  const awal = L.awalPesanan();
  cek(daftar.filter((x) => x.wajib).length === 4 && daftar.some((x) => !x.wajib) && daftar.every((x) => !/\d/.test(x.teks)), "misi C: empat wajib, ada bebas, tanpa digit");
  cek(daftar.every((x) => !x.cek(awal)), "misi C: awal belum tercapai");
  cek(ada(L.kirimPesanan(awal), "c-datang") && !ada(L.kirimPesanan(awal), "c-gabung") && ada(L.kirimPesanan({ ...awal, jenis: "gabung" }), "c-gabung"), "misi C: datang dan gabung");
  cek(ada(L.kirimPesanan({ ...awal, a: 6, b: 4 }), "c-sepuluh") && ada(L.periksaTukar({ ...awal, a: 2 }), "c-periksa"), "misi C: sepuluh dan periksa");
  let t = awal;
  for (const s of ["tomat", "timun", "wortel"]) t = L.kirimPesanan({ ...t, sayur: s });
  cek(ada(L.kirimPesanan({ ...awal, b: 0 }), "c-nol") && ada(t, "c-tiga"), "misi C: bebas");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const folder = new URL("../src/components/modul/pesanan-k1b2c/", import.meta.url);
  const berkas = readdirSync(folder);
  cek(berkas.length >= 8, `berkas pesanan-k1b2c (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d) && !/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}/i.test(s), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/fetch\(|XMLHttpRequest/i.test(s), `${f}: tanpa jaringan`);
    if (/\.ts$/.test(f)) cek(!/from "react"/.test(s), `${f}: tanpa React`);
    const str = [...s.matchAll(/"([^"\n]{12,})"/g)].map((m) => m[1]).filter((x) => /\s/.test(x) && !x.includes("===") && !/^[a-z-]+( [a-z-:[\]#/0-9.()_,'%]+)*$/.test(x));
    cek(str.every((x) => !/\b(kelas|buku|teman|kelompok|skor|nilai|kurang|kurangi)\b/i.test(x)), `${f}: teks tanpa kata terlarang`);
  }
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
