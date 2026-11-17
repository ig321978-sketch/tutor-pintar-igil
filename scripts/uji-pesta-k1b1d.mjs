// Uji tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 1 Sub-Bab D ("Pesta Rumah Rapi"), akhir cerita Bab 1.
// Memeriksa: meja pesta (Masalah, Penyelesaian berurutan memuat semua metode Story, Hasil), kartu menu dari data Story, CPA dua belas soal per tahap
// (Klik, Kanvas, Suara x empat metode), kunci dihitung ulang, angka jawaban tidak kembar per tahap dan pasangan berbeda dari Story,
// pemeriksa kanvas (garis pemisah, lingkari), simulasi meja pesta dan misinya, emoji dan akhir baris.
// Jalankan: node --no-warnings scripts/uji-pesta-k1b1d.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/pesta-k1b1d/logika.ts");
const D = await import("../src/components/modul/pesta-k1b1d/data.ts");
const K = await import("../src/components/modul/pesta-k1b1d/periksa.ts");
const M = await import("../src/components/modul/misi-bab1.ts");
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
const TERLARANG = /\b(kelas|buku|teman|kelompok|tambah|kurang|jumlah|skor|nilai)\b/i;

/* ------------------------------ Mind-map meja pesta ------------------------------ */
{
  const t = D.TEMPAT_MEJA;
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 7, 3], "meja: tiga masalah, tujuh piring, tiga hasil");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && t.every((x) => x.kunci.length <= 28 && !/\d/.test(x.kunci)), "meja: label unik, pendek, tanpa digit");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7], "meja: piring bernomor satu sampai tujuh");
  const gab = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["pisahkan", "gabungkan", "semua pasangan", "sepuluh", "ikatan", "batang", "manik"]) cek(gab.includes(k), `meja: langkah memuat "${k}"`);
  cek(t.every((x) => !/kue|gelas|kursi|balon|pesta|igil|kaka|abang|mamah|nenek|meja/i.test(x.kunci)) && !/kue|pesta/i.test(D.PUSAT_MEJA), "meja: label hanya poin pelajaran");
  cek(!/\d/.test(D.SUARA_MEJA + D.PETUNJUK_URUT_MEJA) && !TERLARANG.test(D.SUARA_MEJA), "meja: suara tanpa digit dan kata terlarang");
  const lb = L.labelDari(t, 71);
  let ok = true;
  for (const x of t) for (const l of lb) {
    const harus = x.urutan !== undefined ? l.teks === x.kunci : t.find((y) => y.kunci === l.teks).kelompok === x.kelompok;
    if (L.cocokKelompok(t, x, l) !== harus) ok = false;
  }
  cek(ok, "meja: piring hanya menerima labelnya sendiri");
}

/* ------------------------------ Infografis kartu menu ------------------------------ */
{
  const b = D.BARIS_MENU;
  sama(b.map((x) => [x.utuh, x.bagian]), [["5", "2 dan 3"], ["5", "4 dan 1"], ["7", "3 dan 4"], ["6", "0 dan 6, 1 dan 5"], ["10", "5 dan 5"], ["10", "4 dan 6"]], "menu: data dari Story");
  for (const x of b) {
    const pasangan = x.bagian.split(", ").map((p) => p.split(" dan ").map(Number));
    cek(pasangan.every(([a, c]) => a + c === Number(x.utuh)), `menu: bagian ${x.bagian} utuhnya ${x.utuh}`);
  }
  sama(D.TEMPAT_MENU.length, 18, "menu: delapan belas isian");
  cek(D.TEMPAT_MENU.every((x) => x.kunci.length <= 20) && !/\d/.test(D.SUARA_MENU), "menu: label pendek, suara tanpa digit");
}

/* ------------------------------ CPA ------------------------------ */
const kunciPasang = (u, a) => `${u}:${[a, u - a].sort((p, q) => p - q).join("-")}`;
const STORY = new Set([kunciPasang(5, 2), kunciPasang(5, 4), kunciPasang(7, 3), ...[0, 1, 2, 3].map((a) => kunciPasang(6, a)), kunciPasang(10, 7), kunciPasang(10, 8), kunciPasang(10, 5), kunciPasang(8, 5), kunciPasang(9, 6), kunciPasang(10, 4)]);
for (const [nama, soal, rupa] of [["Concrete", D.CONCRETE, "benda"], ["Pictorial", D.PICTORIAL, "diagram"], ["Abstract", D.ABSTRACT, "lambang"]]) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga kelompok cara`);
  sama(soal.map((s) => Number(/Pesta (\d+)/.exec(s.judul)[1])), { benda: [2, 3, 4], diagram: [5, 6, 7], lambang: [8, 9, 10] }[rupa], `${nama}: nomor misi berlanjut`);
  const semua = soal.flatMap((s) => s.langkah);
  sama(semua.length, 12, `${nama}: dua belas soal`);
  for (const s of soal) {
    sama(s.langkah.map((x) => x.metode), L.URUT_METODE, `${nama} ${s.cara}: empat metode`);
    cek(!TERLARANG.test(s.judul + s.cerita) && !/\d/.test(s.cerita), `${nama} ${s.cara}: cerita bersih`);
  }
  const angka = semua.map((x) => L.angkaJawab(x.langkah)).filter((n) => n !== null);
  cek(new Set(angka).size === angka.length && angka.length === 10, `${nama}: sepuluh angka jawaban tidak kembar (${angka.join(",")})`);
  cek(angka.every((n) => n >= 0 && n <= 10) && angka.includes(0) && angka.includes(10) === (rupa !== "benda"), `${nama}: jawaban nol sampai sepuluh`);
  for (const x of semua) {
    const l = x.langkah;
    let harus = null;
    if (l.tipe === "gabung") harus = l.a + l.b;
    if (l.tipe === "ikatan" || l.tipe === "batang") harus = l.cari === "b" ? l.b : l.a + l.b;
    if (l.tipe === "manik") harus = l.utuh - l.kiri;
    sama(L.kunciLangkah(l), harus, `${nama} ${x.metode}/${x.cara}: kunci`);
    if (["gabung", "ikatan", "batang"].includes(l.tipe)) {
      const u = l.a + l.b;
      cek(u <= 10 && !STORY.has(kunciPasang(u, l.a)), `${nama} ${x.metode}/${x.cara}: pasangan ${l.a} dan ${l.b} berbeda dari Story`);
    }
    if (l.tipe === "manik") cek(l.kiri <= l.utuh && l.utuh <= 10 && !STORY.has(kunciPasang(l.utuh, l.kiri)), `${nama}: rak manik ${l.utuh} dengan ${l.kiri} di kiri berbeda dari Story`);
    if (l.tipe === "pisah") cek(l.a > 0 && l.a < l.utuh && !STORY.has(kunciPasang(l.utuh, l.a)), `${nama}: pisah berbeda dari Story`);
    if (l.tipe === "semua") {
      const b = L.pilihanBenar(l);
      cek(b.length >= 3 && b.length < l.pilihan.length && l.pilihan.every(([a, c]) => a <= 10 && c <= 10), `${nama}: pilihan semua pasangan berisi benar dan salah`);
      cek(l.utuh !== 6 && l.utuh !== 10, `${nama}: semua pasangan bukan enam atau sepuluh seperti Story`);
      cek(L.benarSemua(l, b) && !L.benarSemua(l, b.slice(1)) && !L.benarSemua(l, [...b, l.pilihan.findIndex((_, i) => !b.includes(i))]), `${nama}: pemeriksa semua pasangan`);
    }
    if (harus !== null) {
      const p = L.pilihanDari(l);
      cek(p.includes(harus) && new Set(p).size === 3 && p.every((v) => v >= 0 && v <= 10), `${nama} ${x.metode}/${x.cara}: pilihan memuat kunci`);
    }
    if (x.cara === "suara") cek(harus !== null, `${nama}: soal suara berjawaban angka`);
    cek(!/\d/.test(x.suara) && !TERLARANG.test(x.suara) && x.suara.length <= 170, `${nama} ${x.metode}/${x.cara}: instruksi tanpa digit ("${x.suara}")`);
  }
  const L2 = semua.map((x) => x.langkah);
  cek(L2.some((l) => (l.tipe === "ikatan" || l.tipe === "batang") && l.cari === "b") && L2.some((l) => (l.tipe === "ikatan" || l.tipe === "batang" || l.tipe === "gabung") && (l.tipe === "gabung" || l.cari === "utuh")), `${nama}: memisah dan menggabung`);
  cek(L2.some((l) => L.utuhLangkah(l) === 10) || rupa === "benda", `${nama}: ada pasangan sepuluh`);
}
{
  const semua = [D.CONCRETE, D.PICTORIAL, D.ABSTRACT].flat().flatMap((s) => s.langkah.map((x) => x.langkah));
  cek(semua.some((l) => l.tipe === "semua") && semua.some((l) => l.tipe === "pisah") && semua.some((l) => l.tipe === "gabung"), "CPA: semua pasangan, memisah, menggabung (Story: balon, kue, gelas)");
  cek(semua.some((l) => (l.tipe === "ikatan" || l.tipe === "batang") && l.b === 0) || semua.some((l) => l.tipe === "manik" && l.kiri === l.utuh), "CPA: pasangan dengan nol");
}

/* ------------------------------ Kanvas ------------------------------ */
{
  const baris = K.letakBaris(9);
  const pemisah = (x) => [Array.from({ length: 10 }, (_, i) => ({ x: x + (i % 2), y: 70 + i * 6 }))];
  cek(K.periksaPisah(pemisah((baris[3].x + baris[4].x) / 2), baris, 4).benar, "pisah: garis di antara empat dan lima diterima");
  const r = K.periksaPisah(pemisah((baris[2].x + baris[3].x) / 2), baris, 4);
  cek(!r.benar && r.salahTempat, "pisah: garis salah tempat ditolak");
  cek(!K.periksaPisah([[{ x: 60, y: 100 }, { x: 200, y: 100 }]], baris, 4).benar, "pisah: garis mendatar ditolak");
  const lingkar = (c, rr) => [Array.from({ length: 24 }, (_, i) => ({ x: c.x + rr * Math.cos((i / 23) * 2 * Math.PI), y: c.y + rr * Math.sin((i / 23) * 2 * Math.PI) }))];
  const kartu = [0, 1, 2, 3, 4, 5].map((i) => K.letakKartu(i));
  cek(K.periksaLingkari([...lingkar(kartu[0], 40), ...lingkar(kartu[3], 40)], kartu, kartu.map((_, i) => i === 0 || i === 3)).benar, "lingkari kartu pasangan");
  const manik = Array.from({ length: 10 }, (_, i) => K.letakManik(10, 9, i));
  cek(K.periksaLingkari(lingkar(manik[9], 10), manik, manik.map((_, i) => i === 9)).benar && manik[8].x < manik[9].x - 40, "rak manik: kelompok kanan terpisah jelas");
  for (let u = 1; u <= 10; u += 1) for (let k = 0; k <= u; k += 1) for (let i = 0; i < u; i += 1) { const p = K.letakManik(u, k, i); if (p.x < 10 || p.x > 290) cek(false, `manik ${u}/${k}/${i} masuk kanvas`); }
  for (let i = 0; i < 10; i += 1) { const p = K.letakDiUtuh(i); cek(Math.hypot(p.x - K.IKATAN.utuh.x, p.y - K.IKATAN.utuh.y) < K.IKATAN.utuh.r - 6, `ikatan: benda ${i} di dalam lingkaran utuh`); }
  for (let i = 0; i < 9; i += 1) { const p = K.letakDiBagian(K.IKATAN.b, i); cek(Math.hypot(p.x - K.IKATAN.b.x, p.y - K.IKATAN.b.y) < K.IKATAN.b.r, `ikatan: benda ${i} di dalam lingkaran bagian`); }
  for (let n = 1; n <= 10; n += 1) { const s = K.selBatang(n, n - 1); cek(K.selBatang(n, 0).x >= 10 && s.x + s.s <= 290, `batang ${n} masuk kanvas`); }
}

/* ------------------------------ Simulasi meja pesta ------------------------------ */
{
  let k = L.awalPesta(D.UTUH_SIM);
  sama([k.utuh.kue, k.utuh.gelas, k.utuh.kursi, L.teras(k)], [6, 8, 9, 0], "pesta: awal kue enam, gelas delapan, kursi sembilan, semua di meja dalam");
  cek(D.UTUH_SIM.kue !== 5 && D.UTUH_SIM.gelas !== 7 && D.UTUH_SIM.kursi !== 10, "pesta: berbeda dari Story");
  for (let i = 0; i < 7; i += 1) {
    k = L.catatPasangan(k);
    k = L.pindah(k, 1);
  }
  sama([k.dalam.kue, L.pasanganUnik(k, "kue"), L.semuaPasangan(6)], [0, 4, 4], "pesta: tujuh langkah kue, empat pasangan tanpa urutan");
  k = L.pindah(k, 1);
  sama(k.dalam.kue, 0, "pesta: tidak di bawah nol");
  sama(L.catatPasangan(k), k, "pesta: catatan kembar diabaikan");
  for (const n of [0, 3, 6]) cek(!/\d/.test(L.kalimatPesta({ ...k, dalam: { ...k.dalam, kue: n } })), `pesta: kalimat tanpa digit ${n}`);
  const daftar = M.daftarMisiBab1("D");
  const ada = (st, id) => S.misiBaru(daftar, st, new Set()).includes(id);
  const awal = L.awalPesta(D.UTUH_SIM);
  cek(daftar.filter((x) => x.wajib).length === 4 && daftar.some((x) => !x.wajib) && daftar.every((x) => !/\d/.test(x.teks)), "misi D: empat wajib, ada bebas, tanpa digit");
  cek(daftar.every((x) => !x.cek(awal)), "misi D: awal belum tercapai");
  cek(ada(k, "d-kue") && ada(k, "d-nol") && ada(k, "d-balik"), "misi D: kue, nol, dan kebalikan dari jalan kue");
  let g = L.pilihBarang(awal, "gelas");
  for (let i = 0; i < 4; i += 1) g = L.pindah(g, 1);
  cek(ada(g, "d-gelas"), "misi D: gelas sama banyak");
  let r = L.pilihBarang(awal, "kursi");
  for (let i = 0; i < 9; i += 1) {
    r = L.catatPasangan(r);
    r = L.pindah(r, 1);
  }
  cek(ada(r, "d-kursi") && ada(r, "d-teras"), "misi D: semua pasangan kursi dan semua di teras");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const folder = new URL("../src/components/modul/pesta-k1b1d/", import.meta.url);
  const berkas = readdirSync(folder);
  cek(berkas.length >= 8, `berkas pesta-k1b1d (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/fetch\(|XMLHttpRequest/i.test(s), `${f}: tanpa jaringan`);
    if (/\.ts$/.test(f)) cek(!/from "react"/.test(s), `${f}: tanpa React`);
    const str = [...s.matchAll(/"([^"\n]{12,})"/g)].map((m) => m[1]).filter((x) => /\s/.test(x) && !x.includes("===") && !/^[a-z-]+( [a-z-:[\]#/0-9.()_,'%]+)*$/.test(x));
    cek(str.every((x) => !/\b(kelas|buku|teman|kelompok|skor|nilai)\b/i.test(x)), `${f}: teks tanpa kata terlarang`);
  }
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
