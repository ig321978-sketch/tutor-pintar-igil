// Uji tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 2 Sub-Bab A ("Bibit Kiriman Nenek"), awal Kebun Sayur Mamah.
// Memeriksa: peta kebun (Masalah, Penyelesaian berurutan memuat semua metode Story, Hasil), teralis catatan dari data Story, CPA dua belas soal per tahap
// (Klik, Kanvas, Suara x empat metode), kunci dihitung ulang, angka jawaban tidak kembar per tahap dan pasangan berbeda dari Story,
// kartu kalimat (tepat satu cocok), tata letak kanvas, simulasi bedeng Mamah dan misinya, emoji dan akhir baris.
// Jalankan: node --no-warnings scripts/uji-kebun-k1b2a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/kebun-k1b2a/logika.ts");
const D = await import("../src/components/modul/kebun-k1b2a/data.ts");
const K = await import("../src/components/modul/kebun-k1b2a/periksa.ts");
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

/* ------------------------------ Mind-map peta kebun ------------------------------ */
{
  const t = D.TEMPAT_KEBUN;
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 7, 3], "kebun: tiga masalah, tujuh bedeng, tiga hasil");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && t.every((x) => x.kunci.length <= 28 && !/\d/.test(x.kunci)), "kebun: label unik, pendek, tanpa digit");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7], "kebun: bedeng bernomor satu sampai tujuh");
  const gab = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["datang lagi", "gabungkan", "+ dan =", "menghitung maju", "bagian-bagian-utuh", "bingkai sepuluh"]) cek(gab.includes(k), `kebun: langkah memuat "${k}"`);
  cek(t.some((x) => /nol/.test(x.kunci)), "kebun: hasil memuat tambah nol");
  cek(t.every((x) => !/cabai|tomat|selada|sawi|wortel|terong|jagung|igil|kaka|abang|mamah|nenek/i.test(x.kunci)) && !/kebun/i.test(D.PUSAT_KEBUN), "kebun: label hanya poin pelajaran");
  cek(!/\d/.test(D.SUARA_KEBUN + D.PETUNJUK_URUT_KEBUN) && !TERLARANG.test(D.SUARA_KEBUN), "kebun: suara tanpa digit dan kata terlarang");
  const lb = L.labelDari(t, 37);
  let ok = true;
  for (const x of t) for (const l of lb) {
    const harus = x.urutan !== undefined ? l.teks === x.kunci : t.find((y) => y.kunci === l.teks).kelompok === x.kelompok;
    if (L.cocokKelompok(t, x, l) !== harus) ok = false;
  }
  cek(ok, "kebun: bedeng hanya menerima labelnya sendiri");
}

/* ------------------------------ Infografis teralis catatan ------------------------------ */
{
  const b = D.BARIS_TERALIS;
  sama(b.map((x) => x.kalimat), ["4 + 2 = 6", "3 + 5 = 8", "7 + 0 = 7", "6 + 4 = 10"], "teralis: data dari Story");
  for (const x of b) {
    const [a, , c, , h] = x.kalimat.split(" ").map((v) => (/\d/.test(v) ? Number(v) : v));
    cek(a + c === h && String(a) === x.mula && x.tambah.endsWith(String(c)), `teralis: ${x.nama} cocok dan benar`);
  }
  sama(D.TEMPAT_TERALIS.length, 12, "teralis: dua belas papan");
  cek(D.TEMPAT_TERALIS.every((x) => x.kunci.length <= 16) && !/\d/.test(D.SUARA_TERALIS), "teralis: label pendek, suara tanpa digit");
}

/* ------------------------------ CPA ------------------------------ */
const kunciPasang = (a, b) => [a, b].sort((p, q) => p - q).join("+");
const STORY = new Set([[4, 2], [3, 5], [7, 0], [6, 4], [7, 2], [2, 3], [5, 3]].map(([a, b]) => kunciPasang(a, b)));
for (const [nama, soal, rupa] of [["Concrete", D.CONCRETE, "benda"], ["Pictorial", D.PICTORIAL, "diagram"], ["Abstract", D.ABSTRACT, "lambang"]]) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara`);
  sama(soal.map((s) => Number(/Kebun (\d+)/.exec(s.judul)[1])), { benda: [2, 3, 4], diagram: [5, 6, 7], lambang: [8, 9, 10] }[rupa], `${nama}: nomor misi berlanjut`);
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
    const harus = l.tipe === "kalimat" ? null : l.tipe === "bagian" && l.cari === "b" ? l.b : l.a + l.b;
    sama(L.kunciLangkah(l), harus, `${nama} ${x.metode}/${x.cara}: kunci`);
    cek(l.a >= 0 && l.b >= 0 && l.a + l.b <= 10 && !STORY.has(kunciPasang(l.a, l.b)), `${nama} ${x.metode}/${x.cara}: ${l.a} dan ${l.b} berbeda dari Story`);
    if (l.tipe === "kalimat") {
      const b = L.nomorBenar(l);
      cek(b.length === 1 && l.pilihan.length === 3 && new Set(l.pilihan.map(L.tulisKalimat)).size === 3, `${nama}: tepat satu kalimat cocok dari tiga`);
      cek(l.pilihan.every((p) => p.every((v) => v >= 0 && v <= 10)), `${nama}: kalimat pilihan dalam nol sampai sepuluh`);
      cek(l.pilihan.some((p) => p[0] + p[1] !== p[2]) && l.pilihan.some((p) => p[0] + p[1] === p[2] && !L.kalimatCocok(l, p)), `${nama}: pengecoh hasil salah dan bilangan bukan dari cerita`);
      cek(x.cara !== "suara", `${nama}: kalimat tidak untuk suara`);
    }
    if (l.tipe === "bingkai") cek(l.a + l.b <= 10, `${nama}: bingkai muat`);
    if (l.tipe === "maju") cek(l.b >= 1 && l.b <= 4, `${nama}: hitung maju satu sampai empat langkah`);
    if (harus !== null) {
      const p = L.pilihanDari(l);
      cek(p.includes(harus) && new Set(p).size === 3 && p.every((v) => v >= 0 && v <= 10), `${nama} ${x.metode}/${x.cara}: pilihan memuat kunci`);
    }
    if (x.cara === "suara") cek(harus !== null, `${nama}: soal suara berjawaban angka`);
    cek(!/\d/.test(x.suara) && !TERLARANG.test(x.suara) && x.suara.length <= 170, `${nama} ${x.metode}/${x.cara}: instruksi tanpa digit ("${x.suara}")`);
  }
  const L2 = semua.map((x) => x.langkah);
  cek(L2.some((l) => l.tipe === "kalimat" && l.adegan === "gabung") && L2.some((l) => (l.tipe === "kalimat" && l.adegan === "datang") || l.tipe === "datang"), `${nama}: menggabungkan dan bertambah`);
  cek(L2.some((l) => l.b === 0 || l.a === 0), `${nama}: ada penjumlahan dengan nol`);
  cek(L2.some((l) => l.tipe === "bagian" && l.cari === "b") && L2.some((l) => l.tipe === "bagian" && l.cari === "utuh"), `${nama}: bagian-utuh mencari utuh dan bagian`);
}
{
  // Kalimat dibaca tanpa digit.
  cek(L.bacaKalimat([4, 2, 6]) === "empat ditambah dua sama dengan enam" && L.tulisKalimat([4, 2, 6]) === "4 + 2 = 6", "kalimat: dibaca dan ditulis");
  for (let a = 0; a <= 10; a += 1) for (let b = 0; a + b <= 10; b += 1) {
    const p = D.pilihanKalimat(a, b, 0);
    if (!(p.filter((q) => L.samaKalimat(q, [a, b, a + b])).length === 1 && p.every((q) => q.every((v) => v >= 0 && v <= 10)))) cek(false, `pilihanKalimat ${a} dan ${b}`);
  }
  cek(D.POIN_PENTING.length >= 5 && D.POIN_PENTING_SUARA.every((p) => !/[+=\d]/.test(p)), "poin penting: suara tanpa lambang dan digit");
}

/* ------------------------------ Kanvas dan tata letak ------------------------------ */
{
  const dalam = (t, k, pad = 8) => t.x >= k.x + pad && t.x <= k.x + k.w - pad && t.y >= k.y + pad && t.y <= k.y + k.h - pad;
  for (let i = 0; i < 8; i += 1) cek(dalam(K.letakDi(K.KERANJANG_KIRI, i), K.KERANJANG_KIRI) && dalam(K.letakDi(K.BAGIAN_B, i), K.BAGIAN_B), `letak: benda ${i} di dalam keranjang dan bagian`);
  for (let i = 0; i < 10; i += 1) cek(dalam(K.letakUtuh(i), K.UTUH) && dalam(K.letakBedeng(i), K.BEDENG), `letak: benda ${i} di dalam utuh dan bedeng`);
  for (let j = 0; j < 6; j += 1) cek(dalam(K.letakKiriman(j), K.KIRIMAN, 6), `letak: kiriman ${j} di dalam keranjang kiriman`);
  for (let j = 0; j < 4; j += 1) cek(K.letakLuar(j).x > K.KARUNG.x + K.KARUNG.w + 10 && K.letakLuar(j).x < 290, `letak: benda ${j} di luar karung`);
  for (let i = 0; i < 3; i += 1) {
    const c = K.letakKartu(i);
    cek(c.y + K.UKURAN_KARTU.h / 2 <= 200 && c.y - K.UKURAN_KARTU.h / 2 > K.KERANJANG_KIRI.y + K.KERANJANG_KIRI.h, `letak: kartu ${i} di bawah adegan`);
  }
  const lingkar = (c, rx, ry = rx) => [Array.from({ length: 24 }, (_, i) => ({ x: c.x + rx * Math.cos((i / 23) * 2 * Math.PI), y: c.y + ry * Math.sin((i / 23) * 2 * Math.PI) }))];
  const kartu = [0, 1, 2].map((i) => K.letakKartu(i));
  cek(K.periksaLingkari(lingkar(kartu[1], 140, 18), kartu, [false, true, false]).benar, "lingkari kartu kalimat tengah");
  cek(!K.periksaLingkari(lingkar(kartu[1], 140, 40), kartu, [false, true, false]).benar, "lingkaran terlalu besar ikut menangkap kartu lain");
  const tanda = (p) => [{ x: p.x - 3, y: p.y - 3 }, { x: p.x + 3, y: p.y + 3 }];
  const sas = K.selSasaran(6, 3).map(K.tengahSel);
  cek(K.periksaCentang(sas.map(tanda), sas, 12).benar, "bingkai: tanda pada tiga kotak berikutnya diterima");
  const salah = K.periksaCentang([K.tengahSel(9)].map(tanda), sas, 12);
  cek(!salah.benar && salah.nyasar === 1, "bingkai: tanda pada kotak lain ditolak");
  const luar = [0, 1].map(K.letakLuar);
  const r = K.periksaCentang([...luar.map(tanda), tanda({ x: K.KARUNG.x + 50, y: K.KARUNG.y + 50 })], luar, 15);
  cek(!r.benar && r.nyasar === 1, "hitung maju: tanda di karung ditolak");
}

/* ------------------------------ Simulasi bedeng Mamah ------------------------------ */
{
  let k = L.awalKebun(D.MULA_SIM, D.DATANG_SIM);
  sama([k.mula.timun, k.datang.timun, k.mula.kentang, k.datang.kentang, k.mula.bawang, k.datang.bawang], [3, 4, 5, 5, 6, 0], "kebun: bilangan awal");
  cek(!(D.MULA_SIM.timun === 4 && D.DATANG_SIM.timun === 2), "kebun: berbeda dari Story");
  sama(L.semuanya(k), 3, "kebun: awal semuanya sama dengan mula-mula");
  k = L.catatKalimat(k);
  for (let i = 0; i < 5; i += 1) k = L.tanamSatu(k, 1);
  sama([k.tanam.timun, L.sisaKeranjang(k), L.semuanya(k)], [4, 0, 7], "kebun: tanam timun berhenti saat keranjang kosong");
  k = L.catatKalimat(k);
  sama(k.catat.timun, ["3+0=3", "3+4=7"], "kebun: catat dua kalimat timun");
  sama(L.catatKalimat(k), k, "kebun: catatan kembar diabaikan");
  k = L.tanamSatu(k, -1);
  sama(L.semuanya(k), 6, "kebun: bibit baru bisa dikembalikan");
  let p = L.pilihSayur(k, "kentang");
  for (let i = 0; i < 7; i += 1) p = L.tanamSatu(p, 1);
  sama(L.semuanya(p), 10, "kebun: kentang paling banyak sepuluh");
  for (let i = 0; i < 9; i += 1) p = L.tanamSatu(p, -1);
  sama(p.tanam.kentang, 0, "kebun: tidak di bawah nol");
  for (const n of [0, 2, 4]) cek(!/\d/.test(L.kalimatKebun({ ...k, tanam: { ...k.tanam, timun: n } })), `kebun: kalimat tanpa digit ${n}`);
  const daftar = M.daftarMisiBab2("A");
  const ada = (st, id) => S.misiBaru(daftar, st, new Set()).includes(id);
  const awal = L.awalKebun(D.MULA_SIM, D.DATANG_SIM);
  cek(daftar.filter((x) => x.wajib).length === 4 && daftar.some((x) => !x.wajib) && daftar.every((x) => !/\d/.test(x.teks)), "misi A: empat wajib, ada bebas, tanpa digit");
  cek(daftar.every((x) => !x.cek(awal)), "misi A: awal belum tercapai");
  cek(ada(k, "a-timun") && ada(k, "a-dua") && !ada(k, "a-nol"), "misi A: timun lengkap dan dua kalimat");
  let kt = L.pilihSayur(awal, "kentang");
  for (let i = 0; i < 2; i += 1) kt = L.tanamSatu(kt, 1);
  kt = L.catatKalimat(kt);
  cek(ada(kt, "a-tujuh") && !ada(kt, "a-penuh"), "misi A: kentang tujuh dicatat");
  for (let i = 0; i < 3; i += 1) kt = L.tanamSatu(kt, 1);
  cek(ada(kt, "a-penuh"), "misi A: bedeng kentang penuh sepuluh");
  cek(ada(L.catatKalimat(L.pilihSayur(awal, "bawang")), "a-nol"), "misi A: bawang ditambah nol");
  let d = L.pilihSayur(awal, "kentang");
  for (let i = 0; i < 3; i += 1) d = L.tanamSatu(d, 1);
  cek(ada(L.catatKalimat(d), "a-delapan"), "misi A: kalimat hasil delapan");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const folder = new URL("../src/components/modul/kebun-k1b2a/", import.meta.url);
  const berkas = readdirSync(folder);
  cek(berkas.length >= 8, `berkas kebun-k1b2a (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d) && !/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}/i.test(s), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/fetch\(|XMLHttpRequest/i.test(s), `${f}: tanpa jaringan`);
    if (/\.ts$/.test(f)) cek(!/from "react"/.test(s), `${f}: tanpa React`);
    const str = [...s.matchAll(/"([^"\n]{12,})"/g)].map((m) => m[1]).filter((x) => /\s/.test(x) && !x.includes("===") && !/^[a-z-]+( [a-z-:[\]#/0-9.()_,'%]+)*$/.test(x));
    cek(str.every((x) => !/\b(kelas|buku|teman|kelompok|skor|nilai)\b/i.test(x)), `${f}: teks tanpa kata terlarang`);
  }
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
