// Uji tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 3 Sub-Bab B ("Pindah Kereta di Stasiun Besar").
// Memeriksa: peta peron (Masalah, Penyelesaian berurutan memuat semua metode Story, Hasil), label bagasi dari data Story, CPA dua belas soal per tahap
// (Klik, Kanvas, Suara x empat metode), kunci dihitung ulang, angka jawaban tidak kembar per tahap dan pasangan berbeda dari Story,
// kartu dua kalimat (tepat satu benar), tata letak kanvas, simulasi kursi kereta dan misinya, emoji dan akhir baris.
// Jalankan: node --no-warnings scripts/uji-peron-k1b3b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/peron-k1b3b/logika.ts");
const D = await import("../src/components/modul/peron-k1b3b/data.ts");
const K = await import("../src/components/modul/peron-k1b3b/periksa.ts");
const M = await import("../src/components/modul/misi-bab3.ts");
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
const TERLARANG = /\b(kelas|buku|teman|kelompok|skor|nilai|ditambah|belas|puluh|puluhan|belasan)\b/i;
const MINUS = "−";

/* ------------------------------ Mind-map peta peron ------------------------------ */
{
  const t = D.TEMPAT_PERON;
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 7, 3], "peron: tiga masalah, tujuh jalur, tiga hasil");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && t.every((x) => x.kunci.length <= 30 && !/\d/.test(x.kunci)), "peron: label unik, pendek, tanpa digit");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7], "peron: jalur bernomor satu sampai tujuh");
  const gab = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["bagan pasangan", "dua kalimat", "nol tetap", "sama jadi nol", "garis bilangan", "pasangan sepuluh"]) cek(gab.includes(k), `peron: langkah memuat "${k}"`);
  cek(t.every((x) => !/koper|tas|troli|kursi|igil|kaka|abang|mamah|nenek/i.test(x.kunci)), "peron: label hanya poin pelajaran");
  cek(!/\d/.test(D.SUARA_PERON + D.PETUNJUK_URUT_PERON) && !TERLARANG.test(D.SUARA_PERON), "peron: suara tanpa digit dan kata terlarang");
  const lb = L.labelDari(t, 43);
  let ok = true;
  for (const x of t) for (const l of lb) {
    const harus = x.urutan !== undefined ? l.teks === x.kunci : t.find((y) => y.kunci === l.teks).kelompok === x.kelompok;
    if (L.cocokKelompok(t, x, l) !== harus) ok = false;
  }
  cek(ok, "peron: jalur hanya menerima labelnya sendiri");
}

/* ------------------------------ Infografis label bagasi ------------------------------ */
{
  const b = D.BARIS_BAGASI;
  const kal = (a, c) => `${a} ${MINUS} ${c} = ${a - c}`;
  sama(b.map((x) => x.kalimat), [kal(7, 5), kal(4, 0), kal(8, 3), kal(10, 7)], "bagasi: data dari Story");
  for (const x of b) {
    const [a, , c, , h] = x.kalimat.split(" ").map((v) => (/\d/.test(v) ? Number(v) : v));
    cek(a - c === h && String(a) === x.utuh && x.tahu.endsWith(String(c)) && x.cari.endsWith(String(h)), `bagasi: ${x.nama} cocok dan benar`);
  }
  sama(D.TEMPAT_BAGASI.length, 16, "bagasi: enam belas kolom");
  cek(new Set(D.TEMPAT_BAGASI.map((x) => x.kunci)).size === 16, "bagasi: label tidak kembar");
  cek(D.TEMPAT_BAGASI.every((x) => x.kunci.length <= 16) && !/\d/.test(D.SUARA_BAGASI) && !TERLARANG.test(D.SUARA_BAGASI), "bagasi: label pendek, suara tanpa digit");
}

/* ------------------------------ CPA ------------------------------ */
const STORY = new Set([[7, 5], [7, 2], [4, 0], [4, 4], [8, 3], [10, 7], [10, 6], [9, 6], [9, 3], [7, 4], [10, 8]].map(([a, b]) => `${a}-${b}`));
for (const [nama, soal, rupa] of [["Concrete", D.CONCRETE, "benda"], ["Pictorial", D.PICTORIAL, "diagram"], ["Abstract", D.ABSTRACT, "lambang"]]) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara`);
  sama(soal.map((s) => Number(/Kereta (\d+)/.exec(s.judul)[1])), { benda: [2, 3, 4], diagram: [5, 6, 7], lambang: [8, 9, 10] }[rupa], `${nama}: nomor misi berlanjut`);
  const semua = soal.flatMap((s) => s.langkah);
  sama(semua.length, 12, `${nama}: dua belas soal`);
  for (const s of soal) {
    sama(s.langkah.map((x) => x.metode), L.URUT_METODE, `${nama} ${s.cara}: empat metode`);
    cek(!TERLARANG.test(s.judul + s.cerita) && !/\d/.test(s.cerita), `${nama} ${s.cara}: cerita bersih`);
    cek(D.EMOJI[s.benda] !== undefined, `${nama} ${s.cara}: benda punya gambar`);
  }
  const angka = semua.map((x) => L.angkaJawab(x.langkah)).filter((n) => n !== null);
  cek(new Set(angka).size === angka.length && angka.length === 10, `${nama}: sepuluh angka jawaban tidak kembar (${angka.join(",")})`);
  cek(angka.every((n) => n >= 0 && n <= 10) && angka.includes(0), `${nama}: jawaban nol sampai sepuluh, ada nol`);
  for (const x of semua) {
    const l = x.langkah;
    const [a, b] = L.pasanganLangkah(l);
    const harus = l.tipe === "dua" ? null : a - b;
    sama(L.kunciLangkah(l), harus, `${nama} ${x.metode}/${x.cara}: kunci`);
    cek(a >= 1 && a <= 10 && b >= 0 && b <= a && !STORY.has(`${a}-${b}`), `${nama} ${x.metode}/${x.cara}: ${a} dan ${b} berbeda dari Story`);
    if (l.tipe === "dua") {
      const nb = L.nomorBenar(l);
      cek(nb.length === 1 && l.pilihan.length === 3 && new Set(l.pilihan.map(L.tulisKalimat)).size === 3, `${nama}: tepat satu kalimat kedua dari tiga`);
      cek(l.a !== l.u - l.a && l.a > 0 && l.a < l.u, `${nama}: kedua bagian berbeda dan tidak nol`);
      cek(l.pilihan.every((p) => p.every((v) => v >= 0 && v <= 10)), `${nama}: kalimat pilihan dalam nol sampai sepuluh`);
      cek(l.pilihan.some((p) => L.samaKalimat(p, L.kalimatPertama(l))) && l.pilihan.some((p) => p[0] - p[1] !== p[2]), `${nama}: pengecoh kalimat pertama dan sisa salah`);
      cek(x.cara !== "suara", `${nama}: dua kalimat tidak untuk suara`);
    }
    if (l.tipe === "nolsama") cek(l.b === 0 || l.b === l.a, `${nama}: nol atau sama`);
    if (l.tipe === "garis") cek(l.b >= 1 && l.b <= 4 && l.b < l.a, `${nama}: lompat mundur satu sampai empat`);
    if (l.tipe === "bagan") cek(l.a >= 1 && l.a < l.u, `${nama}: bagan punya dua bagian`);
    if (harus !== null) {
      const p = L.pilihanDari(l);
      cek(p.includes(harus) && new Set(p).size === 3 && p.every((v) => v >= 0 && v <= 10), `${nama} ${x.metode}/${x.cara}: pilihan memuat kunci`);
    }
    if (x.cara === "suara") cek(harus !== null, `${nama}: soal suara berjawaban angka`);
    cek(!/\d/.test(x.suara) && !TERLARANG.test(x.suara) && x.suara.length <= 170, `${nama} ${x.metode}/${x.cara}: instruksi tanpa digit ("${x.suara}")`);
  }
  const L2 = semua.map((x) => x.langkah);
  cek(L2.some((l) => l.tipe === "nolsama" && l.b === l.a) || L2.some((l) => l.tipe === "sepuluh" && l.b === 10), `${nama}: ada dikurangi bilangan yang sama`);
  cek(L2.some((l) => (l.tipe === "nolsama" || l.tipe === "sepuluh") && l.b === 0), `${nama}: ada dikurangi nol`);
}
{
  for (let u = 2; u <= 10; u += 1) for (let a = 1; a < u; a += 1) {
    if (a === u - a) continue;
    const p = D.pilihanDua(u, a, 0);
    const l = { tipe: "dua", u, a, pilihan: p };
    if (!(L.nomorBenar(l).length === 1 && p.every((q) => q.every((v) => v >= 0 && v <= 10)) && new Set(p.map(L.tulisKalimat)).size === 3)) cek(false, `pilihanDua ${u} dan ${a}`);
  }
  cek(D.POIN_PENTING.length >= 5 && D.POIN_PENTING_SUARA.every((p) => !/[+=\d−]/.test(p)), "poin penting: suara tanpa lambang dan digit");
  cek(D.POIN_PENTING.some((p) => /bagan/.test(p)) && D.POIN_PENTING.some((p) => /pasangan sepuluh/.test(p)) && D.POIN_PENTING.some((p) => /nol/.test(p)), "poin penting: bagan, nol, dan pasangan sepuluh");
}

/* ------------------------------ Kanvas dan tata letak ------------------------------ */
{
  const dalam = (t, k, pad = 8) => t.x >= k.x + pad && t.x <= k.x + k.w - pad && t.y >= k.y + pad && t.y <= k.y + k.h - pad;
  for (let i = 0; i < 10; i += 1) {
    cek(dalam(K.letakKumpulan(i), K.KUMPULAN), `letak: benda ${i} di kumpulan`);
    cek(dalam(K.letakTroli(i), K.TROLI), `letak: benda ${i} di troli`);
    cek(dalam(K.letakUtuh(i), K.UTUH), `letak: benda ${i} di utuh`);
    cek(dalam(K.letakBagian(K.BAGIAN_A, i), K.BAGIAN_A) && dalam(K.letakBagian(K.BAGIAN_B, i), K.BAGIAN_B), `letak: benda ${i} di bagian`);
    cek(K.letakKursi(i).x > 12 && K.letakKursi(i).x < 288 && (i === 0 || K.letakKursi(i).x - K.letakKursi(i - 1).x >= 24), `letak: kursi ${i}`);
  }
  for (let n = 0; n <= 10; n += 1) cek(K.xTempat(n) >= 14 && K.xTempat(n) <= 286, `letak: tempat ${n} di garis`);
  for (let i = 0; i < 3; i += 1) cek(K.letakKartu(i).y + K.UKURAN_KARTU.h / 2 <= 200 && K.letakKartu(i).y - K.UKURAN_KARTU.h / 2 > K.KUMPULAN.y + K.KUMPULAN.h, `letak: kartu ${i} di bawah adegan`);
  sama(K.sasaranGaris(9, 4), [8, 7, 6, 5], "garis: empat tempat di kiri sembilan");
  sama(K.kursiKosong(7), [7, 8, 9], "sepuluh: tiga kursi kosong");
  const tanda = (p) => [{ x: p.x - 3, y: p.y - 3 }, { x: p.x + 3, y: p.y + 3 }];
  const sas = K.sasaranGaris(5, 2).map(K.letakTempat);
  cek(K.periksaCentang(sas.map(tanda), sas, 12).benar, "garis: tanda pada dua lompatan diterima");
  const r = K.periksaCentang([...sas.map(tanda), tanda(K.letakTempat(6))], sas, 12);
  cek(!r.benar && r.nyasar === 1, "garis: tanda di kanan bilangan pertama ditolak");
  const ks = K.kursiKosong(8).map(K.letakKursi);
  cek(K.periksaCentang(ks.map(tanda), ks, 13).benar, "sepuluh: tanda pada dua kursi kosong diterima");
  const lingkar = (c, rx, ry = rx) => [Array.from({ length: 24 }, (_, i) => ({ x: c.x + rx * Math.cos((i / 23) * 2 * Math.PI), y: c.y + ry * Math.sin((i / 23) * 2 * Math.PI) }))];
  const kartu = [0, 1, 2].map((i) => K.letakKartu(i));
  cek(K.periksaLingkari(lingkar(kartu[2], 140, 18), kartu, [false, false, true]).benar, "lingkari kartu bawah");
}

/* ------------------------------ Simulasi kursi kereta ------------------------------ */
{
  let k = L.awalKursi(D.AWAL_SIM.utuh, D.AWAL_SIM.terisi);
  sama([k.utuh, k.terisi, L.kosongKursi(k)], [5, 2, 3], "kursi: bilangan awal");
  cek(!(k.utuh === 7 && k.terisi === 5) && !(k.utuh === 10), "kursi: berbeda dari Story");
  sama(L.duaKalimat(k), ["5-2=3", "5-3=2"], "kursi: dua kalimat dari satu bagan");
  k = L.catatKursi(L.catatKursi(k, 0), 1);
  sama(k.catat, ["5-2=3", "5-3=2"], "kursi: catat dua kalimat");
  sama(L.catatKursi(k, 0), k, "kursi: catatan kembar diabaikan");
  sama(L.ketukKursi(k, 4).terisi, 5, "kursi: ketuk kursi kelima mengisi lima");
  sama(L.ketukKursi(k, 1).terisi, 1, "kursi: ketuk kursi terisi terakhir mengosongkannya");
  let u = k;
  for (let i = 0; i < 9; i += 1) u = L.ubahUtuh(u, 1);
  sama(u.utuh, 10, "kursi: paling banyak sepuluh");
  for (let i = 0; i < 12; i += 1) u = L.ubahUtuh(u, -1);
  sama([u.utuh, u.terisi], [1, 1], "kursi: paling sedikit satu, terisi ikut turun");
  for (const ke of [0, 1]) cek(!/\d/.test(L.bacaKursi(k, ke)), `kursi: kalimat dibaca tanpa digit ${ke}`);
  const daftar = M.daftarMisiBab3("B");
  const ada = (st, id) => S.misiBaru(daftar, st, new Set()).includes(id);
  const awal = L.awalKursi(D.AWAL_SIM.utuh, D.AWAL_SIM.terisi);
  cek(daftar.filter((x) => x.wajib).length === 4 && daftar.some((x) => !x.wajib) && daftar.every((x) => !/\d/.test(x.teks)), "misi B: empat wajib, ada bebas, tanpa digit");
  cek(daftar.every((x) => !x.cek(awal)), "misi B: awal belum tercapai");
  cek(ada(k, "b-dua") && !ada(L.catatKursi(awal, 0), "b-dua"), "misi B: dua kalimat dari satu bagan");
  let z = awal;
  z = L.ketukKursi(z, 1);
  sama(z.terisi, 1, "misi B: kosongkan sampai satu terisi");
  z = L.ketukKursi(z, 0);
  sama(z.terisi, 0, "misi B: semua kursi kosong");
  cek(ada(L.catatKursi(z, 0), "b-nol"), "misi B: dikurangi nol");
  cek(ada(L.catatKursi(L.ketukKursi(awal, 4), 0), "b-sama"), "misi B: semua terisi, hasilnya nol");
  let s10 = awal;
  for (let i = 0; i < 5; i += 1) s10 = L.ubahUtuh(s10, 1);
  s10 = L.catatKursi(L.catatKursi(L.ketukKursi(s10, 0), 0), 1);
  cek(ada(s10, "b-sepuluh") && ada(s10, "b-sembilan"), "misi B: dua kalimat dari sepuluh dan hasil sembilan");
  let d = awal;
  for (let i = 0; i < 3; i += 1) d = L.ubahUtuh(d, 1);
  cek(ada(L.ketukKursi(d, 4), "b-mundur"), "misi B: delapan kursi lima terisi");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const folder = new URL("../src/components/modul/peron-k1b3b/", import.meta.url);
  const berkas = readdirSync(folder);
  cek(berkas.length >= 8, `berkas peron-k1b3b (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d) && !/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}/i.test(s), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/fetch\(|XMLHttpRequest/i.test(s), `${f}: tanpa jaringan`);
    if (/\.ts$/.test(f)) cek(!/from "react"/.test(s), `${f}: tanpa React`);
    const str = [...s.matchAll(/"([^"\n]{12,})"/g)].map((m) => m[1]).filter((x) => /\s/.test(x) && !x.includes("===") && !/^[a-z-]+( [a-z-:[\]#/0-9.()_,'%]+)*$/.test(x));
    cek(str.every((x) => !/\b(kelas|buku|teman|kelompok|skor|nilai|belas|puluh)\b/i.test(x)), `${f}: teks tanpa kata terlarang`);
  }
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
