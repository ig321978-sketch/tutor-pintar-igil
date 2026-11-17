// Uji tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 3 Sub-Bab A ("Bekal untuk Nenek"), awal Kereta ke Rumah Nenek.
// Memeriksa: peta rel (Masalah, Penyelesaian berurutan memuat semua metode Story, Hasil), jendela gerbong dari data Story, CPA dua belas soal per tahap
// (Klik, Kanvas, Suara x empat metode), kunci dihitung ulang, angka jawaban tidak kembar per tahap dan pasangan berbeda dari Story,
// kartu kalimat (tepat satu cocok), tata letak kanvas, simulasi kotak bekal dan misinya, emoji dan akhir baris.
// Jalankan: node --no-warnings scripts/uji-bekal-k1b3a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/bekal-k1b3a/logika.ts");
const D = await import("../src/components/modul/bekal-k1b3a/data.ts");
const K = await import("../src/components/modul/bekal-k1b3a/periksa.ts");
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
// Bab 3 adalah pengurangan: kata kurang boleh, tetapi belasan, puluhan, dan penjumlahan tidak.
const TERLARANG = /\b(kelas|buku|teman|kelompok|skor|nilai|ditambah|belas|puluh|puluhan|belasan)\b/i;
const MINUS = "−";

/* ------------------------------ Mind-map peta rel ------------------------------ */
{
  const t = D.TEMPAT_REL;
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 7, 4], "rel: tiga masalah, tujuh gerbong, empat hasil");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && t.every((x) => x.kunci.length <= 30 && !/\d/.test(x.kunci)), "rel: label unik, pendek, tanpa digit");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7], "rel: gerbong bernomor satu sampai tujuh");
  const gab = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["mula-mula", "berkurang", "tersisa", `${MINUS} dan =`, "mengambil", "menghitung mundur", "bingkai sepuluh"]) cek(gab.includes(k), `rel: langkah memuat "${k}"`);
  cek(t.some((x) => /nol tetap/.test(x.kunci)) && t.some((x) => /sisa nol/.test(x.kunci)), "rel: hasil memuat dikurangi nol dan sisa nol");
  cek(t.every((x) => !/kue|roti|jeruk|pisang|minuman|igil|kaka|abang|mamah|nenek/i.test(x.kunci)) && !/kereta/i.test(D.PUSAT_REL), "rel: label hanya poin pelajaran");
  cek(!/\d/.test(D.SUARA_REL + D.PETUNJUK_URUT_REL) && !TERLARANG.test(D.SUARA_REL), "rel: suara tanpa digit dan kata terlarang");
  const lb = L.labelDari(t, 41);
  let ok = true;
  for (const x of t) for (const l of lb) {
    const harus = x.urutan !== undefined ? l.teks === x.kunci : t.find((y) => y.kunci === l.teks).kelompok === x.kelompok;
    if (L.cocokKelompok(t, x, l) !== harus) ok = false;
  }
  cek(ok, "rel: gerbong hanya menerima labelnya sendiri");
}

/* ------------------------------ Infografis jendela gerbong ------------------------------ */
{
  const b = D.BARIS_JENDELA;
  const kal = (a, c) => `${a} ${MINUS} ${c} = ${a - c}`;
  sama(b.map((x) => x.kalimat), [kal(8, 2), kal(7, 3), kal(10, 3), kal(3, 3)], "jendela: data dari Story");
  for (const x of b) {
    const [a, , c, , h] = x.kalimat.split(" ").map((v) => (/\d/.test(v) ? Number(v) : v));
    cek(a - c === h && String(a) === x.mula && x.sisa === `sisa ${h}` && (x.kurang.endsWith(String(c)) || x.kurang.endsWith("semua")), `jendela: ${x.nama} cocok dan benar`);
  }
  sama(D.TEMPAT_JENDELA.length, 16, "jendela: enam belas kaca");
  cek(D.TEMPAT_JENDELA.every((x) => x.kunci.length <= 16) && !/\d/.test(D.SUARA_JENDELA) && !TERLARANG.test(D.SUARA_JENDELA), "jendela: label pendek, suara tanpa digit");
}

/* ------------------------------ CPA ------------------------------ */
const STORY = new Set([[8, 2], [7, 3], [10, 3], [3, 3], [6, 0], [9, 4], [6, 2], [10, 2]].map(([a, b]) => `${a}-${b}`));
for (const [nama, soal, rupa] of [["Concrete", D.CONCRETE, "benda"], ["Pictorial", D.PICTORIAL, "diagram"], ["Abstract", D.ABSTRACT, "lambang"]]) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara`);
  sama(soal.map((s) => Number(/Perjalanan (\d+)/.exec(s.judul)[1])), { benda: [2, 3, 4], diagram: [5, 6, 7], lambang: [8, 9, 10] }[rupa], `${nama}: nomor misi berlanjut`);
  const semua = soal.flatMap((s) => s.langkah);
  sama(semua.length, 12, `${nama}: dua belas soal`);
  for (const s of soal) {
    sama(s.langkah.map((x) => x.metode), L.URUT_METODE, `${nama} ${s.cara}: empat metode`);
    cek(!TERLARANG.test(s.judul + s.cerita) && !/\d/.test(s.cerita), `${nama} ${s.cara}: cerita bersih`);
    cek(D.EMOJI[s.benda] !== undefined, `${nama} ${s.cara}: benda punya gambar`);
  }
  const angka = semua.map((x) => L.angkaJawab(x.langkah)).filter((n) => n !== null);
  cek(new Set(angka).size === angka.length && angka.length === 10, `${nama}: sepuluh angka jawaban tidak kembar (${angka.join(",")})`);
  cek(angka.every((n) => n >= 0 && n <= 10) && angka.includes(0), `${nama}: sisa nol sampai sepuluh, ada sisa nol`);
  for (const x of semua) {
    const l = x.langkah;
    const harus = l.tipe === "kalimat" ? null : l.a - l.b;
    sama(L.kunciLangkah(l), harus, `${nama} ${x.metode}/${x.cara}: kunci`);
    cek(l.a >= 1 && l.a <= 10 && l.b >= 0 && l.b <= l.a && !STORY.has(`${l.a}-${l.b}`), `${nama} ${x.metode}/${x.cara}: ${l.a} dan ${l.b} berbeda dari Story`);
    if (l.tipe === "kalimat") {
      const b = L.nomorBenar(l);
      cek(b.length === 1 && l.pilihan.length === 3 && new Set(l.pilihan.map(L.tulisKalimat)).size === 3, `${nama}: tepat satu kalimat cocok dari tiga`);
      cek(l.pilihan.every((p) => p.every((v) => v >= 0 && v <= 10)), `${nama}: kalimat pilihan dalam nol sampai sepuluh`);
      cek(l.pilihan.some((p) => p[0] - p[1] !== p[2]) && l.pilihan.some((p) => p[0] - p[1] === p[2] && !L.kalimatCocok(l, p)), `${nama}: pengecoh sisa salah dan bilangan bukan dari cerita`);
      cek(x.cara !== "suara", `${nama}: kalimat tidak untuk suara`);
    }
    if (l.tipe === "mundur") cek(l.b >= 1 && l.b <= 3 && l.b < l.a, `${nama}: hitung mundur satu sampai tiga langkah`);
    if (l.tipe === "ambil") cek(l.b >= 1, `${nama}: mengambil paling sedikit satu`);
    if (harus !== null) {
      const p = L.pilihanDari(l);
      cek(p.includes(harus) && new Set(p).size === 3 && p.every((v) => v >= 0 && v <= 10), `${nama} ${x.metode}/${x.cara}: pilihan memuat kunci`);
    }
    if (x.cara === "suara") cek(harus !== null, `${nama}: soal suara berjawaban angka`);
    cek(!/\d/.test(x.suara) && !TERLARANG.test(x.suara) && x.suara.length <= 170, `${nama} ${x.metode}/${x.cara}: instruksi tanpa digit ("${x.suara}")`);
  }
  const L2 = semua.map((x) => x.langkah);
  cek(L2.some((l) => l.tipe === "kalimat" && l.adegan === "makan") && L2.some((l) => (l.tipe === "kalimat" && l.adegan === "turun") || l.tipe === "pergi"), `${nama}: bekal dimakan dan penumpang turun`);
  cek(L2.some((l) => l.b === 0) && L2.some((l) => l.a === l.b), `${nama}: ada dikurangi nol dan sisa nol`);
}
{
  cek(L.bacaKalimat([8, 2, 6]) === "delapan dikurangi dua sama dengan enam" && L.tulisKalimat([8, 2, 6]) === `8 ${MINUS} 2 = 6`, "kalimat: dibaca dan ditulis");
  for (let a = 0; a <= 10; a += 1) for (let b = 0; b <= a; b += 1) {
    const p = D.pilihanKalimat(a, b, 0);
    if (!(p.filter((q) => L.samaKalimat(q, [a, b, a - b])).length === 1 && p.every((q) => q.every((v) => v >= 0 && v <= 10)) && new Set(p.map(L.tulisKalimat)).size === 3)) cek(false, `pilihanKalimat ${a} dan ${b}`);
  }
  cek(D.POIN_PENTING.length >= 5 && D.POIN_PENTING_SUARA.every((p) => !/[+=\d−]/.test(p)), "poin penting: suara tanpa lambang dan digit");
  cek(D.POIN_PENTING.some((p) => p.includes(MINUS)) && D.POIN_PENTING.some((p) => /nol/.test(p)), "poin penting: tanda kurang dan nol");
}

/* ------------------------------ Kanvas dan tata letak ------------------------------ */
{
  const dalam = (t, k, pad = 8) => t.x >= k.x + pad && t.x <= k.x + k.w - pad && t.y >= k.y + pad && t.y <= k.y + k.h - pad;
  for (let i = 0; i < 10; i += 1) {
    cek(dalam(K.letakKalimat(i), K.WADAH_KALIMAT), `letak: benda ${i} di wadah kalimat`);
    cek(dalam(K.letakGerbong(i), K.GERBONG), `letak: benda ${i} di gerbong`);
    cek(dalam(K.letakMeja(i), K.MEJA), `letak: benda ${i} di meja`);
    cek(dalam(K.tengahSel(i), { x: K.BINGKAI.x, y: K.BINGKAI.y, w: K.BINGKAI.s * 5, h: K.BINGKAI.s * 2 }, 4), `letak: sekat ${i} di bingkai`);
  }
  for (let j = 0; j < 8; j += 1) cek(dalam(K.letakPeron(j), K.PERON, 6), `letak: peron ${j}`);
  for (let a = 1; a <= 10; a += 1) {
    const xs = Array.from({ length: a }, (_, i) => K.letakDeret(a, i).x);
    cek(xs[0] >= 14 && xs[a - 1] <= 286 && xs.every((x, i) => i === 0 || x - xs[i - 1] >= 24), `letak: deret mundur ${a} muat dan tidak bertumpuk`);
  }
  for (let i = 0; i < 3; i += 1) {
    const c = K.letakKartu(i);
    cek(c.y + K.UKURAN_KARTU.h / 2 <= 200 && c.y - K.UKURAN_KARTU.h / 2 > K.WADAH_KALIMAT.y + K.WADAH_KALIMAT.h, `letak: kartu ${i} di bawah adegan`);
  }
  sama(K.sasaranMundur(7, 3), [6, 5, 4], "mundur: tiga paling kanan");
  sama(K.selSasaran(8, 2), [7, 6], "bingkai: dua sekat paling belakang");
  const lingkar = (c, rx, ry = rx) => [Array.from({ length: 24 }, (_, i) => ({ x: c.x + rx * Math.cos((i / 23) * 2 * Math.PI), y: c.y + ry * Math.sin((i / 23) * 2 * Math.PI) }))];
  const kartu = [0, 1, 2].map((i) => K.letakKartu(i));
  cek(K.periksaLingkari(lingkar(kartu[1], 140, 18), kartu, [false, true, false]).benar, "lingkari kartu kalimat tengah");
  cek(!K.periksaLingkari(lingkar(kartu[1], 140, 40), kartu, [false, true, false]).benar, "lingkaran terlalu besar ikut menangkap kartu lain");
  const coret = (p) => [{ x: p.x - 8, y: p.y - 8 }, { x: p.x + 8, y: p.y + 8 }];
  const meja = Array.from({ length: 7 }, (_, i) => K.letakMeja(i));
  cek(K.periksaCoretBebas([meja[0], meja[3]].map(coret), meja, 2).benar, "ambil: dua coretan mana saja diterima");
  cek(K.periksaCoretBebas([meja[5], meja[6]].map(coret), meja, 2).benar, "ambil: dua coretan lain juga diterima");
  const tiga = K.periksaCoretBebas([meja[0], meja[1], meja[2]].map(coret), meja, 2);
  cek(!tiga.benar && tiga.kena === 3, "ambil: tiga coretan ditolak");
  const dobel = K.periksaCoretBebas([meja[0], meja[0]].map(coret), meja, 2);
  cek(!dobel.benar && dobel.dobel === 1, "ambil: dua coretan di benda yang sama ditolak");
  const sas = K.selSasaran(10, 4).map(K.tengahSel);
  cek(K.periksaCentang(sas.map(coret), sas, 12).benar, "bingkai: tanda pada empat sekat belakang diterima");
  const deret = K.sasaranMundur(9, 2).map((i) => K.letakDeret(9, i));
  const r = K.periksaCentang([...deret.map(coret), coret(K.letakDeret(9, 0))], deret, K.jarakDeret(9) / 2 + 2);
  cek(!r.benar && r.nyasar === 1, "mundur: tanda di benda paling kiri ditolak");
}

/* ------------------------------ Simulasi kotak bekal ------------------------------ */
{
  let k = L.awalBekal(D.MULA_SIM);
  sama([k.mula.roti, k.mula.jeruk, k.mula.pisang], [6, 9, 4], "bekal: bilangan awal");
  cek(!Object.values(D.MULA_SIM).some((n) => [8, 7, 3].includes(n)), "bekal: berbeda dari Story");
  sama(L.sisaBekal(k), 6, "bekal: awal sisa sama dengan mula-mula");
  k = L.catatKalimat(k);
  for (let i = 0; i < 2; i += 1) k = L.ambilSatu(k, 1);
  sama([k.ambil.roti, L.sisaBekal(k)], [2, 4], "bekal: ambil dua roti");
  k = L.catatKalimat(k);
  sama(k.catat.roti, ["6-0=6", "6-2=4"], "bekal: catat dua kalimat roti");
  sama(L.catatKalimat(k), k, "bekal: catatan kembar diabaikan");
  k = L.ambilSatu(k, -1);
  sama(L.sisaBekal(k), 5, "bekal: bisa dikembalikan");
  let p = L.pilihBekal(k, "pisang");
  for (let i = 0; i < 7; i += 1) p = L.ambilSatu(p, 1);
  sama(L.sisaBekal(p), 0, "bekal: tidak di bawah nol");
  for (let i = 0; i < 9; i += 1) p = L.ambilSatu(p, -1);
  sama(p.ambil.pisang, 0, "bekal: kembalikan tidak lebih dari yang diambil");
  for (const n of [0, 2, 4]) cek(!/\d/.test(L.kalimatBekal({ ...k, ambil: { ...k.ambil, roti: n } })), `bekal: kalimat tanpa digit ${n}`);
  const daftar = M.daftarMisiBab3("A");
  const ada = (st, id) => S.misiBaru(daftar, st, new Set()).includes(id);
  const awal = L.awalBekal(D.MULA_SIM);
  cek(daftar.filter((x) => x.wajib).length === 4 && daftar.some((x) => !x.wajib) && daftar.every((x) => !/\d/.test(x.teks)), "misi A: empat wajib, ada bebas, tanpa digit");
  cek(daftar.every((x) => !x.cek(awal)), "misi A: awal belum tercapai");
  cek(ada(k, "a-roti") && ada(k, "a-dua") && !ada(k, "a-habis"), "misi A: roti dan dua kalimat");
  let ps = L.pilihBekal(awal, "pisang");
  for (let i = 0; i < 4; i += 1) ps = L.ambilSatu(ps, 1);
  cek(ada(L.catatKalimat(ps), "a-habis") && !ada(ps, "a-habis"), "misi A: pisang habis dicatat");
  cek(ada(L.catatKalimat(L.pilihBekal(awal, "jeruk")), "a-nol"), "misi A: jeruk dikurangi nol");
  let j = L.pilihBekal(awal, "jeruk");
  for (let i = 0; i < 3; i += 1) j = L.ambilSatu(j, 1);
  cek(ada(j, "a-mundur") && !ada(j, "a-lima"), "misi A: jeruk sisa enam");
  j = L.ambilSatu(j, 1);
  cek(ada(L.catatKalimat(j), "a-lima"), "misi A: kalimat sisa lima");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const folder = new URL("../src/components/modul/bekal-k1b3a/", import.meta.url);
  const berkas = readdirSync(folder);
  cek(berkas.length >= 8, `berkas bekal-k1b3a (${berkas.length})`);
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
