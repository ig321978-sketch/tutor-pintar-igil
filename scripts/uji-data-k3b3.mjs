// Uji data murni Matematika Kelas 3 Bab 3 (Pengukuran Panjang dan Berat), Sub-Bab A sampai D. Jalankan: node --no-warnings scripts/uji-data-k3b3.mjs
// Memeriksa: pembantu umum, tiap ronde permainan (kunci dihitung dari bilangan, pilihan berbeda, jangkauan penggaris dan meteran),
// kebenaran semua kalimat dan pernyataan, dan struktur naskah (3 video x 3 adegan x 4 ketukan, 8 peta pikiran, 10 panel infografis,
// 30 permainan per sub-bab).
import * as D from "../src/components/modul/data-k3b3.ts";
import * as N from "../src/components/modul/naskah-k3b3.ts";

let lulus = 0;
let gagal = 0;
const cek = (nama, ok, info = "") => {
  if (ok) lulus += 1;
  else {
    gagal += 1;
    console.log(`GAGAL: ${nama} ${info}`);
  }
};
const unik = (daftar) => new Set(daftar).size === daftar.length;
const tiga = (nama, daftar) => cek(`${nama}: tiga ronde`, daftar.length === 3, `${daftar.length}`);

/* ---- Pembantu umum ---- */
for (let g = 0; g < 6; g += 1) cek(`urutanTetap(3, 2, ${g}) permutasi`, [...D.urutanTetap(3, 2, g)].sort().join() === "0,1,2");
for (let r = 0; r < 6; r += 1) cek(`urutTampil ronde ${r} berbeda dari kunci`, JSON.stringify(D.urutTampil(["a", "b", "c"], ["a", "b", "c"], r)) !== JSON.stringify(["a", "b", "c"]));
cek("titik", D.titik(5000) === "5.000" && D.titik(117) === "117" && D.titik(1000) === "1.000");
cek("teksMeterCm", D.teksMeterCm(117) === "1 m 17 cm" && D.teksMeterCm(300) === "3 m" && D.teksMeterCm(5) === "5 cm" && D.teksMeterCm(5000) === "50 m" && D.teksMeterCm(7580) === "75 m 80 cm" && D.teksMeterCm(105) === "1 m 5 cm");
for (const n of [5, 17, 100, 105, 117, 250, 305, 437, 999, 1180, 3735, 5000, 7580]) cek(`cmDariTeks(teksMeterCm(${n}))`, D.cmDariTeks(D.teksMeterCm(n)) === n);
for (let n = 2; n <= 30; n += 1) for (let k = 0; k < 3; k += 1) cek(`opsiAngka(${n}, ${k}) tiga berbeda memuat ${n}`, new Set(D.opsiAngka(n, k)).size === 3 && D.opsiAngka(n, k).includes(n));
for (const a of [1, 2, 3, 4]) for (const cm of [3, 5, 8, 11, 14]) for (let k = 0; k < 3; k += 1) {
  const o = D.opsiGeser(cm, a, k);
  cek(`opsiGeser(${cm}, ${a}, ${k}) tiga berbeda memuat ${cm}`, new Set(o).size === 3 && o.includes(cm), JSON.stringify(o));
}
cek("labelUkur dan alatUntuk", D.labelUkur(200) === "2 m" && D.labelUkur(150) === "150 cm" && D.labelUkur(12) === "12 cm" && D.alatUntuk(30) === "penggaris" && D.alatUntuk(31) === "meteran");
cek("cocokBanding", D.cocokBanding(9, 8, "lebih") && !D.cocokBanding(8, 8, "lebih") && D.cocokBanding(6, 10, "kurang") && !D.cocokBanding(10, 10, "kurang"));

/* ====================================================================== */
/* Sub-Bab A                                                                */
/* ====================================================================== */

const JENIS = Object.keys(D.NAMA_BENDA);
const sahBenda = (s) => JENIS.includes(s.jenis) && Number.isInteger(s.cm) && s.cm >= 3;

/* CA1 dan PA1 geser */
tiga("RONDE_GESER_CA", D.RONDE_GESER_CA);
D.RONDE_GESER_CA.forEach((ro, r) => cek(`RONDE_GESER_CA ronde ${r + 1}: dua soal, awal 1 sampai 4, benda muat pada penggaris 15 cm`, ro.length === 2 && ro.every((s) => sahBenda(s) && s.awal >= 1 && s.awal <= 4 && s.awal + s.cm <= 15 && s.cm <= 14)));
tiga("RONDE_GESER_PA", D.RONDE_GESER_PA);
D.RONDE_GESER_PA.forEach((ro, r) => cek(`RONDE_GESER_PA ronde ${r + 1}: dua soal muat pada penggaris 15 cm`, ro.length === 2 && ro.every((s) => s.cm >= 3 && s.awal >= 1 && s.awal <= 4 && s.awal + s.cm <= 15)));

/* CA2 dan PA2 baca */
tiga("RONDE_BACA_CA", D.RONDE_BACA_CA);
D.RONDE_BACA_CA.forEach((ro, r) => cek(`RONDE_BACA_CA ronde ${r + 1}: dua soal 3 sampai 14 cm`, ro.length === 2 && ro.every((s) => sahBenda(s) && s.cm <= 14)));
tiga("RONDE_BACA_PA", D.RONDE_BACA_PA);
D.RONDE_BACA_PA.forEach((ro, r) => cek(`RONDE_BACA_PA ronde ${r + 1}: dua soal 3 sampai 14 cm`, ro.length === 2 && ro.every((v) => v >= 3 && v <= 14)));

/* CA3 dan PA3 ujung */
tiga("RONDE_UJUNG_CA", D.RONDE_UJUNG_CA);
D.RONDE_UJUNG_CA.forEach((ro, r) => cek(`RONDE_UJUNG_CA ronde ${r + 1}: dua soal 3 sampai 10 cm (garis 0 sampai 10)`, ro.length === 2 && ro.every((s) => sahBenda(s) && s.cm <= 10)));
tiga("RONDE_UJUNG_PA", D.RONDE_UJUNG_PA);
D.RONDE_UJUNG_PA.forEach((ro, r) => cek(`RONDE_UJUNG_PA ronde ${r + 1}: dua soal 3 sampai 10 cm`, ro.length === 2 && ro.every((v) => v >= 3 && v <= 10)));

/* CA4 pilih alat */
tiga("RONDE_ALAT_CA", D.RONDE_ALAT_CA);
D.RONDE_ALAT_CA.forEach((ro, r) => cek(`RONDE_ALAT_CA ronde ${r + 1}: dua benda, satu penggaris dan satu meteran`, ro.length === 2 && ro.map((b) => b.alat).sort().join() === "meteran,penggaris"));
for (const [id, b] of Object.entries(D.BENDA_ALAT)) cek(`BENDA_ALAT ${id}: emoji, nama, dan alat sah`, !!b.emoji && !!b.nama && (b.alat === "penggaris" || b.alat === "meteran"));
cek("BENDA_ALAT: nama unik", unik(Object.values(D.BENDA_ALAT).map((b) => b.nama)));

/* CA5 dan PA4 jodoh */
for (const [nama, daftar, ukuran] of [["RONDE_JODOH_CA", D.RONDE_JODOH_CA, 3], ["RONDE_MEMORI_CA", D.RONDE_MEMORI_CA, 4], ["RONDE_KETUK_CA", D.RONDE_KETUK_CA.map((x) => x.item), 3]]) {
  tiga(nama, daftar);
  daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: ${ukuran} benda, jenis dan panjang berbeda, panjang 3 sampai 10 cm`, ro.length === ukuran && ro.every((s) => sahBenda(s) && s.cm <= 10) && unik(ro.map((s) => s.cm)) && unik(ro.map((s) => s.jenis)), JSON.stringify(ro)));
}
for (const [nama, daftar, ukuran] of [["RONDE_JODOH_PA", D.RONDE_JODOH_PA, 3], ["RONDE_MEMORI_PA", D.RONDE_MEMORI_PA, 4]]) {
  tiga(nama, daftar);
  daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: ${ukuran} panjang berbeda 3 sampai 10 cm`, ro.length === ukuran && ro.every((v) => v >= 3 && v <= 10) && unik(ro)));
}
D.RONDE_KETUK_CA.forEach((ro, r) => cek(`RONDE_KETUK_CA ronde ${r + 1}: dua pertanyaan, jawabannya tepat satu benda`, ro.tanya.length === 2 && ro.tanya.every((t) => ro.item.filter((s) => s.cm === t).length === 1)));

/* CA8 semua alat */
tiga("RONDE_SEMUA_CA", D.RONDE_SEMUA_CA);
D.RONDE_SEMUA_CA.forEach((ro, r) => {
  const benar = ro.item.filter((b) => b.alat === ro.alat).length;
  cek(`RONDE_SEMUA_CA ronde ${r + 1}: empat benda, nama unik, ada yang cocok dan tidak`, ro.item.length === 4 && unik(ro.item.map((b) => b.nama)) && benar >= 1 && benar <= 3, `${benar}`);
});

/* CA9 papan */
tiga("RONDE_PAPAN_CA", D.RONDE_PAPAN_CA);
D.RONDE_PAPAN_CA.forEach((ro, r) => cek(`RONDE_PAPAN_CA ronde ${r + 1}: dua soal 3 sampai 15 cm`, ro.length === 2 && ro.every((s) => sahBenda(s) && s.cm <= 15)));
tiga("RONDE_PAPAN_PA", D.RONDE_PAPAN_PA);
D.RONDE_PAPAN_PA.forEach((ro, r) => cek(`RONDE_PAPAN_PA ronde ${r + 1}: dua soal 3 sampai 15 cm`, ro.length === 2 && ro.every((v) => v >= 3 && v <= 15)));

/* CA10 urut */
tiga("RONDE_URUT_CA", D.RONDE_URUT_CA);
D.RONDE_URUT_CA.forEach((ro, r) => cek(`RONDE_URUT_CA ronde ${r + 1}: tiga benda berbeda panjangnya, id unik`, ro.item.length === 3 && ro.item.every(sahBenda) && unik(ro.item.map((s) => s.cm)) && unik(ro.item.map(D.idBenda)) && (ro.dari === "kecil" || ro.dari === "besar")));
cek("RONDE_URUT_CA: ada dari kecil dan dari besar", D.RONDE_URUT_CA.some((x) => x.dari === "kecil") && D.RONDE_URUT_CA.some((x) => x.dari === "besar"));

/* PA6 pilah */
tiga("RONDE_PILAH_PA", D.RONDE_PILAH_PA);
D.RONDE_PILAH_PA.forEach((ro, r) => {
  const p = ro.filter((cm) => D.alatUntuk(cm) === "penggaris").length;
  cek(`RONDE_PILAH_PA ronde ${r + 1}: enam ukuran unik, tiga untuk tiap kotak`, ro.length === 6 && unik(ro) && p === 3, `${p}`);
});

/* PA7 semua batang */
tiga("RONDE_SEMUA_PA", D.RONDE_SEMUA_PA);
D.RONDE_SEMUA_PA.forEach((ro, r) => {
  const benar = ro.item.filter((cm) => D.cocokBanding(cm, ro.acuan, ro.arah)).length;
  cek(`RONDE_SEMUA_PA ronde ${r + 1}: empat batang berbeda, bukan acuan, 3 sampai 15 cm, ada yang cocok dan tidak`, ro.item.length === 4 && unik(ro.item) && ro.item.every((v) => v !== ro.acuan && v >= 3 && v <= 15) && benar >= 1 && benar <= 3, `${benar}`);
});

/* PA8 dan PB8 langkah */
for (const [nama, daftar] of [["RONDE_LANGKAH_PA", D.RONDE_LANGKAH_PA], ["RONDE_LANGKAH_PB", D.RONDE_LANGKAH_PB]]) {
  tiga(nama, daftar);
  daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: judul dan empat langkah berbeda`, !!ro.judul && ro.langkah.length === 4 && unik(ro.langkah) && ro.langkah.every((l) => l.length > 10)));
}

/* PA10 selisih */
tiga("RONDE_SELISIH_PA", D.RONDE_SELISIH_PA);
D.RONDE_SELISIH_PA.forEach((ro, r) => cek(`RONDE_SELISIH_PA ronde ${r + 1}: dua soal a > b, selisih 3 sampai 9, tinggi paling banyak 15`, ro.length === 2 && ro.every(([a, b]) => a > b && a <= 15 && a - b >= 3 && a - b <= 9)));

/* QA */
const sahTeks = (s) => !!s.tanya && !!s.benar && s.salah.length === 2 && new Set([s.benar, ...s.salah]).size === 3 && s.pesan.length > 15;
for (const [nama, daftar] of [["RONDE_SATUAN_QA", D.RONDE_SATUAN_QA], ["RONDE_ALAT_QA", D.RONDE_ALAT_QA]]) {
  tiga(nama, daftar);
  daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: dua soal dengan tiga pilihan berbeda`, ro.length === 2 && ro.every(sahTeks)));
  for (let r = 0; r < 3; r += 1) for (let i = 0; i < 2; i += 1) {
    const o = D.susunOpsi(daftar[r][i].benar, daftar[r][i].salah, r * 2 + i);
    cek(`${nama} ${r}-${i}: susunOpsi menunjuk kunci`, o.opsi[o.jawab] === daftar[r][i].benar && new Set(o.opsi).size === 3);
  }
}
cek("RONDE_SATUAN_QA: jawaban benar sesuai ukuran benda", D.RONDE_SATUAN_QA.flat().every((s) => (/pensil|penghapus|jari/.test(s.tanya) ? s.benar === "sentimeter (cm)" : s.benar === "meter (m)")));
cek("RONDE_ALAT_QA: jawaban sesuai benda", D.RONDE_ALAT_QA.flat().every((s) => (/pulpen|jari tangan/.test(s.tanya) ? s.benar === "Penggaris" : s.benar === "Meteran")));
tiga("RONDE_KALIMAT_QA", D.RONDE_KALIMAT_QA);
D.RONDE_KALIMAT_QA.forEach((ro, r) => cek(`RONDE_KALIMAT_QA ronde ${r + 1}: tiga kalimat, tiga pilihan berbeda, kunci sah`, ro.length === 3 && ro.every((k) => k.opsi.length === 3 && unik(k.opsi) && k.benar >= 0 && k.benar < 3 && !!k.depan)));
tiga("RONDE_JODOH_QA", D.RONDE_JODOH_QA);
D.RONDE_JODOH_QA.forEach((ro, r) => cek(`RONDE_JODOH_QA ronde ${r + 1}: tiga pasangan, kiri dan kanan unik`, ro.length === 3 && unik(ro.map((p) => p.kiri)) && unik(ro.map((p) => p.kanan))));
tiga("RONDE_MEMORI_QA", D.RONDE_MEMORI_QA);
D.RONDE_MEMORI_QA.forEach((ro, r) => cek(`RONDE_MEMORI_QA ronde ${r + 1}: empat pasangan, kartu unik`, ro.length === 4 && unik([...ro.map((p) => p.a), ...ro.map((p) => p.b)])));
cek("RONDE_BENARSALAH_QA: dua ronde, lima pernyataan, ada benar dan salah", D.RONDE_BENARSALAH_QA.length === 2 && D.RONDE_BENARSALAH_QA.every((ro) => ro.length === 5 && ro.some((p) => p.benar) && ro.some((p) => !p.benar) && ro.every((p) => p.penjelasan.length > 20)));
cek("RONDE_BENARSALAH_QA: kunci sesuai isi", JSON.stringify(D.RONDE_BENARSALAH_QA.map((ro) => ro.map((p) => p.benar))) === JSON.stringify([[true, false, true, false, true], [true, false, true, false, true]]));
const KLUE_A = [
  (n) => n === 9 && n < 10,
  (n) => n === 8 && n > 5,
  (n) => n === 5 && n < 10,
  (n) => n === 14 && n % 2 === 0,
];
cek("RONDE_DETEKTIF_QA: empat soal", D.RONDE_DETEKTIF_QA.length === 4);
D.RONDE_DETEKTIF_QA.forEach((s, i) => {
  const cocok = s.opsi.filter(KLUE_A[i]);
  cek(`RONDE_DETEKTIF_QA ${i + 1}: dua petunjuk, tiga pilihan berbeda, tepat satu cocok yaitu kunci`, s.klue.length === 2 && unik(s.opsi) && s.opsi.length === 3 && cocok.length === 1 && cocok[0] === s.jawab, JSON.stringify(cocok));
});
for (const [nama, daftar] of [["PETA_KONSEP_QA", D.PETA_KONSEP_QA], ["PETA_KONSEP_QB", D.PETA_KONSEP_QB]]) {
  cek(`${nama}: dua peta, empat kotak, tiga pilihan berbeda`, daftar.length === 2 && daftar.every((p) => p.kotak.length === 4 && p.kotak.every((k) => k.opsi.length === 3 && unik(k.opsi) && k.benar >= 0 && k.benar < 3 && !!k.label) && !!p.pusat));
}
/* QA9 cerita: kunci dihitung dari bilangan pada teks */
const CERITA_QA = [[3, 17], [5, 2], [25, 6]];
tiga("RONDE_CERITA_QA", D.RONDE_CERITA_QA);
D.RONDE_CERITA_QA.forEach((ro, r) => cek(`RONDE_CERITA_QA ronde ${r + 1}: dua cerita, jawaban benar`, ro.length === 2 && ro.every((c, i) => c.jawab === CERITA_QA[r][i] && c.pesan.includes(`${c.jawab} cm`))));
cek("RONDE_CERITA_QA: bilangan pada teks cocok dengan kunci", D.RONDE_CERITA_QA.flat().every((c) => {
  const a = [...c.teks.matchAll(/(\d+) cm/g)].map((m) => Number(m[1]));
  return a.length >= 2 && [a[0] + a[1], Math.abs(a[0] - a[1])].includes(c.jawab);
}));
cek("RONDE_SUSUNKATA_QA: empat kalimat, kata unik, pengecoh bukan bagian kalimat", D.RONDE_SUSUNKATA_QA.length === 4 && D.RONDE_SUSUNKATA_QA.every((s) => s.kata.length >= 6 && unik(s.kata.map((k) => k.toLowerCase())) && !s.kata.map((k) => k.toLowerCase()).includes(s.pengecoh)));

/* ====================================================================== */
/* Sub-Bab B                                                                */
/* ====================================================================== */

const kelipatan50 = (v) => v % 50 === 0;
for (const [nama, daftar, ukuran] of [["RONDE_RAKIT_CB", D.RONDE_RAKIT_CB, 2], ["RONDE_HITUNG_CB", D.RONDE_HITUNG_CB, 2], ["RONDE_PAPAN_CB", D.RONDE_PAPAN_CB.map((ro) => ro.map(D.nilaiMC)), 2]]) {
  tiga(nama, daftar);
  daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: dua soal 100 sampai 999 cm`, ro.length === ukuran && ro.every((n) => n >= 100 && n <= 999) && unik(ro)));
}
for (const [nama, daftar] of [["RONDE_RAKIT_CB", D.RONDE_RAKIT_CB], ["RONDE_HITUNG_CB", D.RONDE_HITUNG_CB]]) for (let r = 0; r < 3; r += 1) for (let i = 0; i < 2; i += 1) {
  const n = daftar[r][i];
  const o = D.opsiCm(n, r * 2 + i);
  cek(`opsiCm(${n}) pada ${nama}: tiga berbeda memuat kunci, dalam 0 sampai 999`, new Set(o).size === 3 && o.includes(n) && o.every((v) => v >= 0 && v <= 999), JSON.stringify(o));
}
tiga("RONDE_METER_CB", D.RONDE_METER_CB);
D.RONDE_METER_CB.forEach((ro, r) => cek(`RONDE_METER_CB ronde ${r + 1}: dua soal 2 sampai 7 meter`, ro.length === 2 && ro.every((m) => m >= 2 && m <= 7) && unik(ro)));
tiga("RONDE_SENTI_CB", D.RONDE_SENTI_CB);
D.RONDE_SENTI_CB.forEach((ro, r) => cek(`RONDE_SENTI_CB ronde ${r + 1}: dua soal kelipatan 100 sampai 900`, ro.length === 2 && ro.every((v) => v % 100 === 0 && v >= 200 && v <= 900) && unik(ro)));
for (const [nama, daftar, ukuran] of [["RONDE_JODOH_CB", D.RONDE_JODOH_CB, 3], ["RONDE_MEMORI_CB", D.RONDE_MEMORI_CB, 4], ["RONDE_KETUK_CB", D.RONDE_KETUK_CB.map((x) => x.item), 3]]) {
  tiga(nama, daftar);
  daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: ${ukuran} panjang berbeda, pita muat (paling banyak 999 cm)`, ro.length === ukuran && unik(ro) && ro.every((v) => v >= 100 && v <= 499), JSON.stringify(ro)));
}
D.RONDE_KETUK_CB.forEach((ro, r) => cek(`RONDE_KETUK_CB ronde ${r + 1}: dua pertanyaan, jawabannya tepat satu pita`, ro.tanya.length === 2 && ro.tanya.every((t) => ro.item.filter((v) => v === t).length === 1)));
cek("labelMC", D.labelMC([2, 0]) === "2 m" && D.labelMC([0, 20]) === "20 cm" && D.labelMC([1, 17]) === "1 m 17 cm" && D.labelMC([1, 100]) === "1 m 100 cm" && D.nilaiMC([1, 100]) === 200);
for (const [nama, daftar] of [["RONDE_SEMUA_CB", D.RONDE_SEMUA_CB], ["RONDE_SEMUA_PB", D.RONDE_SEMUA_PB]]) {
  tiga(nama, daftar);
  daftar.forEach((ro, r) => {
    const benar = ro.item.filter((u) => D.nilaiMC(u) === ro.acuan).length;
    cek(`${nama} ronde ${r + 1}: empat ukuran, label unik, 2 atau 3 sama dengan acuan, semuanya muat (paling banyak 500 cm)`, ro.item.length === 4 && unik(ro.item.map(D.labelMC)) && benar >= 2 && benar <= 3 && ro.item.every((u) => D.nilaiMC(u) <= 500), `${benar}`);
  });
}
tiga("RONDE_URUT_CB", D.RONDE_URUT_CB);
D.RONDE_URUT_CB.forEach((ro, r) => cek(`RONDE_URUT_CB ronde ${r + 1}: tiga pita berbeda panjangnya`, ro.item.length === 3 && unik(ro.item) && ro.item.every((v) => v >= 100 && v <= 499) && (ro.dari === "kecil" || ro.dari === "besar")));
cek("RONDE_URUT_CB: ada dari kecil dan dari besar", D.RONDE_URUT_CB.some((x) => x.dari === "kecil") && D.RONDE_URUT_CB.some((x) => x.dari === "besar"));

/* PB1 dan PB9 garis meteran: batang kelipatan 50 cm, muat pada meteran 4 m */
for (const [nama, daftar] of [["RONDE_HITUNG_PB", D.RONDE_HITUNG_PB], ["RONDE_PAPAN_PB", D.RONDE_PAPAN_PB]]) {
  tiga(nama, daftar);
  daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: dua soal kelipatan 50 cm, 50 sampai 400 cm`, ro.length === 2 && ro.every((v) => kelipatan50(v) && v >= 50 && v <= 400)));
}
for (let r = 0; r < 3; r += 1) for (let i = 0; i < 2; i += 1) {
  const n = D.RONDE_HITUNG_PB[r][i];
  const o = D.opsiCm50(n, r * 2 + i);
  cek(`opsiCm50(${n}): tiga berbeda memuat kunci, tidak negatif`, new Set(o).size === 3 && o.includes(n) && o.every((v) => v >= 0), JSON.stringify(o));
}
/* PB2 kalimat ubah */
cek("RONDE_KALIMAT_PB: tiga bilangan 100 sampai 299 yang bukan kelipatan 100", D.RONDE_KALIMAT_PB.length === 3 && D.RONDE_KALIMAT_PB.every((v) => v >= 100 && v <= 299 && v % 100 !== 0));
D.RONDE_KALIMAT_PB.forEach((cm, r) => {
  const k = D.kalimatKonversi(cm, r * 3);
  const m = Math.floor(cm / 100);
  const s = cm % 100;
  cek(`kalimatKonversi(${cm}): tiga kalimat, tiga pilihan berbeda, kunci sah`, k.length === 3 && k.every((x) => x.opsi.length === 3 && unik(x.opsi) && x.benar >= 0 && x.benar < 3));
  const nilai = k.map((x) => Number(x.opsi[x.benar]));
  cek(`kalimatKonversi(${cm}): kalimat 1 sentimeter sisa, 2 meter ke sentimeter, 3 meter bulat`, nilai[0] === s && nilai[1] === m * 100 && nilai[2] === m, JSON.stringify(nilai));
  cek(`kalimatKonversi(${cm}): kalimat terisi benar`, m * 100 + nilai[0] === cm && Number(k[1].depan.match(/(\d+) m/)[1]) * 100 === nilai[1] && nilai[2] * 100 + s === cm);
});
for (const [nama, daftar, ukuran] of [["RONDE_JODOH_PB", D.RONDE_JODOH_PB, 3], ["RONDE_MEMORI_PB", D.RONDE_MEMORI_PB, 4], ["RONDE_SAMBUNG_PB", D.RONDE_SAMBUNG_PB, 2]]) {
  tiga(nama, daftar);
  if (nama === "RONDE_SAMBUNG_PB") daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: dua soal, tiap batang kelipatan 50 cm, gabungan paling banyak 400 cm`, ro.length === 2 && ro.every(([a, b]) => kelipatan50(a) && kelipatan50(b) && a >= 50 && b >= 50 && a + b <= 400)));
  else daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: ${ukuran} panjang berbeda, kelipatan 50 cm, paling banyak 400 cm`, ro.length === ukuran && unik(ro) && ro.every((v) => kelipatan50(v) && v >= 50 && v <= 400)));
}
/* PB5 tabel */
tiga("RONDE_TABEL_PB", D.RONDE_TABEL_PB);
D.RONDE_TABEL_PB.forEach((t, r) => {
  cek(`RONDE_TABEL_PB ronde ${r + 1}: empat baris, label dan jawaban unik, lima kartu memuat semua jawaban`, t.baris.length === 4 && unik(t.baris.map((b) => b.label)) && unik(t.baris.map((b) => b.jawab)) && t.kartu.length === 5 && unik(t.kartu) && t.baris.every((b) => t.kartu.includes(b.jawab)));
  cek(`RONDE_TABEL_PB ronde ${r + 1}: label dan jawaban menyatakan ukuran yang sama`, t.baris.every((b) => D.cmDariTeks(b.label) === D.cmDariTeks(b.jawab)), JSON.stringify(t.baris));
  const asing = t.kartu.filter((k) => !t.baris.some((b) => b.jawab === k));
  cek(`RONDE_TABEL_PB ronde ${r + 1}: kartu pengecoh tidak sama dengan ukuran mana pun`, asing.length === 1 && t.baris.every((b) => D.cmDariTeks(asing[0]) !== D.cmDariTeks(b.label)));
});
/* PB7 pilah */
tiga("RONDE_PILAH_PB", D.RONDE_PILAH_PB);
D.RONDE_PILAH_PB.forEach((ro, r) => cek(`RONDE_PILAH_PB ronde ${r + 1}: enam ukuran unik, tiga pas meter dan tiga bersisa`, ro.length === 6 && unik(ro) && ro.filter(D.pasMeter).length === 3));

/* QB */
tiga("RONDE_METER_QB", D.RONDE_METER_QB);
D.RONDE_METER_QB.forEach((ro, r) => cek(`RONDE_METER_QB ronde ${r + 1}: dua soal 2 sampai 10 meter`, ro.length === 2 && ro.every((m) => m >= 2 && m <= 10) && unik(ro)));
for (let r = 0; r < 3; r += 1) for (let i = 0; i < 2; i += 1) {
  const m = D.RONDE_METER_QB[r][i];
  const o = D.opsiMeterKeCm(m, r * 2 + i);
  cek(`opsiMeterKeCm(${m}): tiga berbeda, kunci ${m * 100} cm`, new Set(o.opsi).size === 3 && D.cmDariTeks(o.opsi[o.jawab]) === m * 100 && o.opsi.filter((x) => D.cmDariTeks(x) === m * 100).length === 1, JSON.stringify(o));
}
tiga("RONDE_SENTI_QB", D.RONDE_SENTI_QB);
D.RONDE_SENTI_QB.forEach((ro, r) => cek(`RONDE_SENTI_QB ronde ${r + 1}: dua soal 100 sampai 499 yang bukan kelipatan 100`, ro.length === 2 && ro.every((v) => v >= 100 && v <= 499 && v % 100 !== 0) && unik(ro)));
for (let r = 0; r < 3; r += 1) for (let i = 0; i < 2; i += 1) {
  const cm = D.RONDE_SENTI_QB[r][i];
  const o = D.opsiMCm(cm, r * 2 + i);
  const benar = o.opsi.filter((x) => D.cmDariTeks(x) === cm);
  cek(`opsiMCm(${cm}): tiga berbeda, tepat satu pilihan bernilai ${cm} cm yaitu kunci`, new Set(o.opsi).size === 3 && benar.length === 1 && benar[0] === o.opsi[o.jawab], JSON.stringify(o));
}
tiga("RONDE_PAPAN_QB", D.RONDE_PAPAN_QB);
D.RONDE_PAPAN_QB.forEach((ro, r) => cek(`RONDE_PAPAN_QB ronde ${r + 1}: dua soal 100 sampai 999 cm`, ro.length === 2 && ro.every((u) => D.nilaiMC(u) >= 100 && D.nilaiMC(u) <= 999 && u[1] < 100) && unik(ro.map(D.nilaiMC))));
tiga("RONDE_JODOH_QB", D.RONDE_JODOH_QB);
D.RONDE_JODOH_QB.forEach((ro, r) => cek(`RONDE_JODOH_QB ronde ${r + 1}: tiga pasangan, tiap pasangan sama ukurannya, kiri dan kanan unik`, ro.length === 3 && ro.every((p) => D.cmDariTeks(p.kiri) === D.cmDariTeks(p.kanan)) && unik(ro.map((p) => p.kiri)) && unik(ro.map((p) => p.kanan)), JSON.stringify(ro)));
tiga("RONDE_MEMORI_QB", D.RONDE_MEMORI_QB);
D.RONDE_MEMORI_QB.forEach((ro, r) => cek(`RONDE_MEMORI_QB ronde ${r + 1}: empat pasangan sama ukurannya, kartu unik`, ro.length === 4 && ro.every((p) => D.cmDariTeks(p.a) === D.cmDariTeks(p.b)) && unik([...ro.map((p) => p.a), ...ro.map((p) => p.b)]), JSON.stringify(ro)));
cek("RONDE_BENARSALAH_QB: dua ronde, lima pernyataan, ada benar dan salah", D.RONDE_BENARSALAH_QB.length === 2 && D.RONDE_BENARSALAH_QB.every((ro) => ro.length === 5 && ro.some((p) => p.benar) && ro.some((p) => !p.benar) && ro.every((p) => p.penjelasan.length > 20)));
cek("RONDE_BENARSALAH_QB: kunci sesuai isi", JSON.stringify(D.RONDE_BENARSALAH_QB.map((ro) => ro.map((p) => p.benar))) === JSON.stringify([[true, false, true, false, true], [true, false, true, false, true]]));
const KLUE_B = [
  (n) => n === 400 && (String(n).match(/0/g) ?? []).length === 2,
  (n) => n === 117 && n % 10 === 7,
  (n) => n === 7 && n < 10,
  (n) => n === 40 && n % 2 === 0 && n < 50,
];
cek("RONDE_DETEKTIF_QB: empat soal", D.RONDE_DETEKTIF_QB.length === 4);
D.RONDE_DETEKTIF_QB.forEach((s, i) => {
  const cocok = s.opsi.filter(KLUE_B[i]);
  cek(`RONDE_DETEKTIF_QB ${i + 1}: dua petunjuk, tiga pilihan berbeda, tepat satu cocok yaitu kunci`, s.klue.length === 2 && unik(s.opsi) && s.opsi.length === 3 && cocok.length === 1 && cocok[0] === s.jawab, JSON.stringify(cocok));
});
tiga("RONDE_CERITA_QB", D.RONDE_CERITA_QB);
D.RONDE_CERITA_QB.forEach((ro, r) =>
  ro.forEach((c, i) => {
    const j = D.jawabCerita(c);
    const o = D.opsiCerita(c, r * 2 + i);
    cek(`RONDE_CERITA_QB ${r + 1}-${i + 1}: tiga pilihan berbeda, kunci ${D.teksMeterCm(j)}`, new Set(o.opsi).size === 3 && o.opsi[o.jawab] === D.teksMeterCm(j) && j > 0);
    if (c.jenis === "u") cek(`RONDE_CERITA_QB ${r + 1}-${i + 1}: teks memuat ${D.titik(c.a)} cm`, c.teks.includes(`${D.titik(c.a)} cm`));
    else cek(`RONDE_CERITA_QB ${r + 1}-${i + 1}: teks memuat kedua ukuran`, c.teks.includes(D.teksMeterCm(c.a)) && c.teks.includes(D.teksMeterCm(c.b)), c.teks);
  }),
);
cek("RONDE_CERITA_QB: contoh buku (11 m 80 cm, 37 m 35 cm, 50 m)", D.teksMeterCm(D.jawabCerita(D.RONDE_CERITA_QB[0][0])) === "11 m 80 cm" && D.teksMeterCm(D.jawabCerita(D.RONDE_CERITA_QB[0][1])) === "37 m 35 cm" && D.teksMeterCm(D.RONDE_CERITA_QB[2][0].a) === "50 m");
cek("RONDE_CERITA_QB: ada jumlah, kurang, dan ubah", ["+", "−", "u"].every((j) => D.RONDE_CERITA_QB.flat().some((c) => c.jenis === j)));
cek("RONDE_SUSUNKATA_QB: empat kalimat, kata unik, pengecoh bukan bagian kalimat", D.RONDE_SUSUNKATA_QB.length === 4 && D.RONDE_SUSUNKATA_QB.every((s) => s.kata.length >= 6 && unik(s.kata.map((k) => k.toLowerCase())) && !s.kata.map((k) => k.toLowerCase()).includes(s.pengecoh)));

/* ====================================================================== */
/* Sub-Bab C dan D (berat)                                                  */
/* ====================================================================== */

/* ---- Pembantu berat ---- */
cek("teksGram dan teksKgG", D.teksGram(1250) === "1.250 g" && D.teksGram(50) === "50 g" && D.teksKgG(2500) === "2 kg 500 g" && D.teksKgG(2000) === "2 kg" && D.teksKgG(500) === "500 g" && D.teksKgG(1753) === "1 kg 753 g" && D.teksKgG(20000) === "20 kg");
for (const g of [10, 50, 250, 500, 1000, 1250, 1753, 2500, 4150, 8000, 20000, 42750]) cek(`gramDariTeks(teksKgG(${g}))`, D.gramDariTeks(D.teksKgG(g)) === g);
cek("gramDariTeks dengan ons dan titik", D.gramDariTeks("3 ons") === 300 && D.gramDariTeks("1.753 g") === 1753 && D.gramDariTeks("4 kg 150 g") === 4150 && D.gramDariTeks("10 ons") === 1000 && D.gramDariTeks("1 kg") === 1000);
for (const n of [10, 30, 50, 100, 250, 500, 750, 990]) for (let k = 0; k < 3; k += 1) cek(`opsiGram(${n}, ${k}) tiga berbeda memuat ${n}, tidak negatif`, new Set(D.opsiGram(n, k)).size === 3 && D.opsiGram(n, k).includes(n) && D.opsiGram(n, k).every((v) => v > 0));
for (const n of [500, 1000, 1500, 2500, 3500, 4000]) for (let k = 0; k < 3; k += 1) cek(`opsiBerat500(${n}, ${k}) tiga berbeda memuat ${n}`, new Set(D.opsiBerat500(n, k)).size === 3 && D.opsiBerat500(n, k).includes(n) && D.opsiBerat500(n, k).every((v) => v > 0));
for (const g of [1200, 1500, 2750, 4150, 7500, 42750, 12500]) {
  const o = D.opsiKgG(g, 1);
  cek(`opsiKgG(${g}): tiga berbeda, kunci ${D.teksKgG(g)}`, new Set(o.opsi).size === 3 && o.opsi[o.jawab] === D.teksKgG(g) && o.opsi.filter((x) => D.gramDariTeks(x) === g).length === 1);
}

/* ---- Benda berat ---- */
for (const [id, b] of Object.entries(D.BENDA_BERAT)) cek(`BENDA_BERAT ${id}: lengkap`, b.id === id && !!b.emoji && !!b.nama && (b.satuan === "gram" || b.satuan === "kilogram") && ["digital", "duduk", "badan"].includes(b.timbangan));
cek("BENDA_BERAT: gram selalu timbangan digital, kilogram selalu duduk atau badan", Object.values(D.BENDA_BERAT).every((b) => (b.satuan === "gram" ? b.timbangan === "digital" : b.timbangan !== "digital")));
cek("BENDA_BERAT: nama dan emoji unik", unik(Object.values(D.BENDA_BERAT).map((b) => b.nama)) && unik(Object.values(D.BENDA_BERAT).map((b) => b.emoji)));
const adaB = (s) => !!D.BENDA_BERAT[s.b];

/* ---- Concrete C ---- */
tiga("RONDE_BACA_CC", D.RONDE_BACA_CC);
D.RONDE_BACA_CC.forEach((ro, r) => cek(`RONDE_BACA_CC ronde ${r + 1}: dua benda ringan pada timbangan digital, berat 10 sampai 999`, ro.length === 2 && ro.every((s) => adaB(s) && D.BENDA_BERAT[s.b].satuan === "gram" && s.gram >= 10 && s.gram <= 999) && unik(ro.map((s) => s.gram))));
tiga("RONDE_SIAP_CC", D.RONDE_SIAP_CC);
D.RONDE_SIAP_CC.forEach((ro, r) => cek(`RONDE_SIAP_CC ronde ${r + 1}: tiga jarum, tepat satu di angka 0, kelipatan 500, bukan 5.000`, ro.length === 3 && ro.filter((g) => g === 0).length === 1 && ro.every((g) => g % 500 === 0 && g < 5000)));
tiga("RONDE_BACA_JARUM_CC", D.RONDE_BACA_JARUM_CC);
D.RONDE_BACA_JARUM_CC.forEach((ro, r) => cek(`RONDE_BACA_JARUM_CC ronde ${r + 1}: dua buah pada timbangan duduk, kelipatan 500, 500 sampai 4.500`, ro.length === 2 && ro.every((s) => adaB(s) && D.BENDA_BERAT[s.b].timbangan === "duduk" && s.gram % 500 === 0 && s.gram >= 500 && s.gram <= 4500)));
tiga("RONDE_TIMBANGAN_CC", D.RONDE_TIMBANGAN_CC);
D.RONDE_TIMBANGAN_CC.forEach((ro, r) => cek(`RONDE_TIMBANGAN_CC ronde ${r + 1}: dua benda dikenal`, ro.length === 2 && ro.every((id) => !!D.BENDA_BERAT[id])));
cek("RONDE_TIMBANGAN_CC: ketiga jenis timbangan muncul", ["digital", "duduk", "badan"].every((j) => D.RONDE_TIMBANGAN_CC.flat().some((id) => D.BENDA_BERAT[id].timbangan === j)));
tiga("RONDE_JODOH_CC", D.RONDE_JODOH_CC);
D.RONDE_JODOH_CC.forEach((ro, r) => cek(`RONDE_JODOH_CC ronde ${r + 1}: tiga benda dengan jenis timbangan berbeda`, ro.length === 3 && ro.every((id) => !!D.BENDA_BERAT[id]) && unik(ro.map((id) => D.BENDA_BERAT[id].timbangan))));
tiga("RONDE_MEMORI_CC", D.RONDE_MEMORI_CC);
D.RONDE_MEMORI_CC.forEach((ro, r) => cek(`RONDE_MEMORI_CC ronde ${r + 1}: empat berat berbeda, kelipatan 50, 50 sampai 999`, ro.length === 4 && unik(ro) && ro.every((g) => g % 50 === 0 && g >= 50 && g <= 999)));
tiga("RONDE_KETUK_CC", D.RONDE_KETUK_CC);
D.RONDE_KETUK_CC.forEach((ro, r) => cek(`RONDE_KETUK_CC ronde ${r + 1}: tiga timbangan berbeda beratnya dan bendanya, dua pertanyaan ada jawabannya`, ro.item.length === 3 && ro.item.every((s) => adaB(s) && D.BENDA_BERAT[s.b].satuan === "gram") && unik(ro.item.map((s) => s.gram)) && unik(ro.item.map((s) => s.b)) && ro.tanya.length === 2 && ro.tanya.every((t) => ro.item.filter((s) => s.gram === t).length === 1)));
tiga("RONDE_SEMUA_CC", D.RONDE_SEMUA_CC);
D.RONDE_SEMUA_CC.forEach((ro, r) => {
  const benar = ro.item.filter((id) => D.BENDA_BERAT[id].satuan === ro.satuan).length;
  cek(`RONDE_SEMUA_CC ronde ${r + 1}: empat benda berbeda, ada yang cocok dan tidak`, ro.item.length === 4 && unik(ro.item) && ro.item.every((id) => !!D.BENDA_BERAT[id]) && benar >= 1 && benar <= 3, `${benar}`);
});
cek("RONDE_SEMUA_CC: ada gram dan kilogram", D.RONDE_SEMUA_CC.some((x) => x.satuan === "gram") && D.RONDE_SEMUA_CC.some((x) => x.satuan === "kilogram"));
tiga("RONDE_PAPAN_CC", D.RONDE_PAPAN_CC);
D.RONDE_PAPAN_CC.forEach((ro, r) => cek(`RONDE_PAPAN_CC ronde ${r + 1}: dua benda ringan, berat 10 sampai 999`, ro.length === 2 && ro.every((s) => adaB(s) && D.BENDA_BERAT[s.b].satuan === "gram" && s.gram >= 10 && s.gram <= 999)));
tiga("RONDE_URUT_CC", D.RONDE_URUT_CC);
D.RONDE_URUT_CC.forEach((ro, r) => cek(`RONDE_URUT_CC ronde ${r + 1}: tiga benda ringan berbeda beratnya dan id unik`, ro.item.length === 3 && ro.item.every((s) => adaB(s) && D.BENDA_BERAT[s.b].satuan === "gram") && unik(ro.item.map((s) => s.gram)) && unik(ro.item.map(D.idBerat)) && (ro.dari === "kecil" || ro.dari === "besar")));
cek("RONDE_URUT_CC: ada dari kecil dan dari besar", D.RONDE_URUT_CC.some((x) => x.dari === "kecil") && D.RONDE_URUT_CC.some((x) => x.dari === "besar"));

/* ---- Picture C ---- */
tiga("RONDE_JARUM_PC", D.RONDE_JARUM_PC);
D.RONDE_JARUM_PC.forEach((ro, r) => cek(`RONDE_JARUM_PC ronde ${r + 1}: dua jarum di angka 1 sampai 4 kg`, ro.length === 2 && ro.every((kg) => kg >= 1 && kg <= 4) && unik(ro)));
tiga("RONDE_LAYAR_PC", D.RONDE_LAYAR_PC);
D.RONDE_LAYAR_PC.forEach((ro, r) => cek(`RONDE_LAYAR_PC ronde ${r + 1}: dua layar 10 sampai 999 g`, ro.length === 2 && ro.every((g) => g >= 10 && g <= 999) && unik(ro)));
tiga("RONDE_JODOH_PC", D.RONDE_JODOH_PC);
D.RONDE_JODOH_PC.forEach((ro, r) => cek(`RONDE_JODOH_PC ronde ${r + 1}: tiga jarum berbeda di angka 1 sampai 4 kg`, ro.length === 3 && unik(ro) && ro.every((kg) => kg >= 1 && kg <= 4)));
tiga("RONDE_MEMORI_PC", D.RONDE_MEMORI_PC);
D.RONDE_MEMORI_PC.forEach((ro, r) => cek(`RONDE_MEMORI_PC ronde ${r + 1}: empat layar berbeda`, ro.length === 4 && unik(ro) && ro.every((g) => g % 50 === 0 && g >= 50 && g <= 999)));
tiga("RONDE_SIAP_PC", D.RONDE_SIAP_PC);
D.RONDE_SIAP_PC.forEach((ro, r) => cek(`RONDE_SIAP_PC ronde ${r + 1}: empat jarum, ada di angka 0 dan bukan, kelipatan 500, bukan 5.000`, ro.length === 4 && ro.some((g) => g === 0) && ro.some((g) => g !== 0) && ro.every((g) => g % 500 === 0 && g < 5000)));
tiga("RONDE_PILAH_PC", D.RONDE_PILAH_PC);
D.RONDE_PILAH_PC.forEach((ro, r) => {
  const g = ro.filter((id) => D.BENDA_BERAT[id]?.satuan === "gram").length;
  cek(`RONDE_PILAH_PC ronde ${r + 1}: enam benda berbeda, tiga gram dan tiga kilogram`, ro.length === 6 && unik(ro) && ro.every((id) => !!D.BENDA_BERAT[id]) && g === 3, `${g}`);
});
tiga("RONDE_SEMUA_PC", D.RONDE_SEMUA_PC);
D.RONDE_SEMUA_PC.forEach((ro, r) => {
  const benar = ro.item.filter((g) => D.cocokBanding(g, ro.acuan, ro.arah)).length;
  cek(`RONDE_SEMUA_PC ronde ${r + 1}: empat layar berbeda, bukan acuan, ada yang cocok dan tidak`, ro.item.length === 4 && unik(ro.item) && ro.item.every((g) => g !== ro.acuan && g >= 10 && g <= 999) && benar >= 1 && benar <= 3, `${benar}`);
});
tiga("RONDE_LANGKAH_PC", D.RONDE_LANGKAH_PC);
D.RONDE_LANGKAH_PC.forEach((ro, r) => cek(`RONDE_LANGKAH_PC ronde ${r + 1}: judul dan empat langkah berbeda`, !!ro.judul && ro.langkah.length === 4 && unik(ro.langkah) && ro.langkah.every((l) => l.length > 10)));
tiga("RONDE_PAPAN_PC", D.RONDE_PAPAN_PC);
D.RONDE_PAPAN_PC.forEach((ro, r) => cek(`RONDE_PAPAN_PC ronde ${r + 1}: dua layar 10 sampai 999`, ro.length === 2 && ro.every((g) => g >= 10 && g <= 999)));
tiga("RONDE_SELISIH_PC", D.RONDE_SELISIH_PC);
D.RONDE_SELISIH_PC.forEach((ro, r) => cek(`RONDE_SELISIH_PC ronde ${r + 1}: dua soal a < b, selisih 100 sampai 600, kelipatan 50`, ro.length === 2 && ro.every(([a, b]) => a < b && b <= 999 && (b - a) % 50 === 0 && b - a >= 100 && b - a <= 600)));

/* ---- Abstract C ---- */
cek("RONDE_SATUAN_QC: tiga ronde dua soal, kunci sesuai benda", D.RONDE_SATUAN_QC.length === 3 && D.RONDE_SATUAN_QC.every((ro) => ro.length === 2 && ro.every(sahTeks)) && D.RONDE_SATUAN_QC.every((ro) => ro[0].benar === "gram (g)" && ro[1].benar === "kilogram (kg)"));
cek("RONDE_TIMBANGAN_QC: tiga ronde dua soal, kunci sesuai benda", D.RONDE_TIMBANGAN_QC.length === 3 && D.RONDE_TIMBANGAN_QC.every((ro) => ro.length === 2 && ro.every(sahTeks)) && D.RONDE_TIMBANGAN_QC.flat().every((s) => (/berat badan/.test(s.tanya) ? s.benar === "Timbangan badan" : /semangka|nanas/.test(s.tanya) ? s.benar === "Timbangan duduk" : s.benar === "Timbangan digital")));
for (const [nama, daftar] of [["RONDE_SATUAN_QC", D.RONDE_SATUAN_QC], ["RONDE_TIMBANGAN_QC", D.RONDE_TIMBANGAN_QC]])
  for (let r = 0; r < 3; r += 1) for (let i = 0; i < 2; i += 1) {
    const o = D.susunOpsi(daftar[r][i].benar, daftar[r][i].salah, r * 2 + i);
    cek(`${nama} ${r}-${i}: susunOpsi menunjuk kunci`, o.opsi[o.jawab] === daftar[r][i].benar && new Set(o.opsi).size === 3);
  }
tiga("RONDE_KALIMAT_QC", D.RONDE_KALIMAT_QC);
D.RONDE_KALIMAT_QC.forEach((ro, r) => cek(`RONDE_KALIMAT_QC ronde ${r + 1}: tiga kalimat, tiga pilihan berbeda, kunci sah`, ro.length === 3 && ro.every((k) => k.opsi.length === 3 && unik(k.opsi) && k.benar >= 0 && k.benar < 3 && !!k.depan)));
tiga("RONDE_JODOH_QC", D.RONDE_JODOH_QC);
D.RONDE_JODOH_QC.forEach((ro, r) => cek(`RONDE_JODOH_QC ronde ${r + 1}: tiga pasangan, kiri dan kanan unik`, ro.length === 3 && unik(ro.map((p) => p.kiri)) && unik(ro.map((p) => p.kanan))));
tiga("RONDE_MEMORI_QC", D.RONDE_MEMORI_QC);
D.RONDE_MEMORI_QC.forEach((ro, r) => cek(`RONDE_MEMORI_QC ronde ${r + 1}: empat pasangan, kartu unik`, ro.length === 4 && unik([...ro.map((p) => p.a), ...ro.map((p) => p.b)])));
cek("RONDE_BENARSALAH_QC: kunci sesuai isi", JSON.stringify(D.RONDE_BENARSALAH_QC.map((ro) => ro.map((p) => p.benar))) === JSON.stringify([[true, true, false, true, true], [true, false, true, false, false]]) && D.RONDE_BENARSALAH_QC.every((ro) => ro.length === 5 && ro.every((p) => p.penjelasan.length > 20)));
const KLUE_C = [
  (n) => n === 100 && n < 500,
  (n) => n === 1250 && n % 10 === 0,
  (n) => n === 3000 && (String(n).match(/0/g) ?? []).length === 3,
  (n) => n === 250 && n % 2 === 0,
];
cek("RONDE_DETEKTIF_QC: empat soal", D.RONDE_DETEKTIF_QC.length === 4);
D.RONDE_DETEKTIF_QC.forEach((s, i) => {
  const cocok = s.opsi.filter(KLUE_C[i]);
  cek(`RONDE_DETEKTIF_QC ${i + 1}: dua petunjuk, tiga pilihan berbeda, tepat satu cocok yaitu kunci`, s.klue.length === 2 && unik(s.opsi) && s.opsi.length === 3 && cocok.length === 1 && cocok[0] === s.jawab, JSON.stringify(cocok));
});
cek("PETA_KONSEP_QC: dua peta", D.PETA_KONSEP_QC.length === 2 && D.PETA_KONSEP_QC.every((p) => p.kotak.length === 4 && p.kotak.every((k) => k.opsi.length === 3 && unik(k.opsi) && k.benar === 0)));
tiga("RONDE_CERITA_QC", D.RONDE_CERITA_QC);
D.RONDE_CERITA_QC.forEach((ro, r) =>
  ro.forEach((c, i) => {
    const j = D.jawabCerita(c);
    const o = D.opsiCeritaG(c, r * 2 + i);
    cek(`RONDE_CERITA_QC ${r + 1}-${i + 1}: tiga pilihan berbeda, kunci ${D.teksGram(j)}`, new Set(o.opsi).size === 3 && o.opsi[o.jawab] === D.teksGram(j) && j > 0 && (c.jenis === "+" || c.jenis === "−"));
    cek(`RONDE_CERITA_QC ${r + 1}-${i + 1}: teks memuat kedua berat`, c.teks.includes(D.titik(c.a)) && (c.teks.includes(D.titik(c.b)) || (c.b % 1000 === 0 && c.teks.includes(`${c.b / 1000} kg`))), c.teks);
  }),
);
cek("RONDE_CERITA_QC: contoh buku (stroberi 400 g)", D.jawabCerita(D.RONDE_CERITA_QC[0][1]) === 400);
cek("RONDE_SUSUNKATA_QC: empat kalimat, kata unik, pengecoh bukan bagian kalimat", D.RONDE_SUSUNKATA_QC.length === 4 && D.RONDE_SUSUNKATA_QC.every((s) => s.kata.length >= 6 && unik(s.kata.map((k) => k.toLowerCase())) && !s.kata.map((k) => k.toLowerCase()).includes(s.pengecoh)));

/* ---- Bandul (Sub-Bab D) ---- */
cek("BANDUL", D.BANDUL.ss === 50 && D.BANDUL.s === 100 && D.BANDUL.d === 200 && D.BANDUL.sk === 500 && D.BANDUL.k === 1000 && Object.keys(D.NAMA_BANDUL).sort().join() === Object.keys(D.BANDUL).sort().join());
cek("gramSusunan dan teksSusunan", D.gramSusunan({ k: 1, s: 2 }) === 1200 && D.gramSusunan({ sk: 2, s: 3 }) === 1300 && D.teksSusunan({ k: 1, s: 2 }) === "1 kg + 2 × 1 ons" && D.teksSusunan({ s: 10 }) === "10 × 1 ons" && D.teksSusunan({ sk: 1 }) === "1/2 kg" && D.banyakBandul({ k: 1, s: 2 }) === 3);
const sahS = (s) => Object.entries(s).every(([j, n]) => D.BANDUL[j] !== undefined && Number.isInteger(n) && n >= 1 && n <= 10);
tiga("RONDE_RAKIT_CD", D.RONDE_RAKIT_CD);
D.RONDE_RAKIT_CD.forEach((ro, r) => cek(`RONDE_RAKIT_CD ronde ${r + 1}: dua target kelipatan 50, 50 sampai 2.500`, ro.length === 2 && unik(ro) && ro.every((g) => g % 50 === 0 && g >= 50 && g <= 2500)));
for (const [nama, daftar, ukuran] of [["RONDE_HITUNG_CD", D.RONDE_HITUNG_CD, 2], ["RONDE_JODOH_CD", D.RONDE_JODOH_CD, 3], ["RONDE_MEMORI_CD", D.RONDE_MEMORI_CD, 4], ["RONDE_KETUK_CD", D.RONDE_KETUK_CD.map((x) => x.item), 3], ["RONDE_URUT_CD", D.RONDE_URUT_CD.map((x) => x.item), 3]]) {
  tiga(nama, daftar);
  daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: ${ukuran} kumpulan bandul sah dengan berat berbeda, paling banyak 2.500 g`, ro.length === ukuran && ro.every((s) => sahS(s) && D.banyakBandul(s) <= 10 && D.gramSusunan(s) <= 2500) && unik(ro.map(D.gramSusunan)), JSON.stringify(ro)));
}
D.RONDE_KETUK_CD.forEach((ro, r) => cek(`RONDE_KETUK_CD ronde ${r + 1}: dua pertanyaan, jawabannya tepat satu kumpulan`, ro.tanya.length === 2 && ro.tanya.every((t) => ro.item.filter((s) => D.gramSusunan(s) === t).length === 1)));
D.RONDE_URUT_CD.forEach((ro, r) => cek(`RONDE_URUT_CD ronde ${r + 1}: arah sah`, ro.dari === "kecil" || ro.dari === "besar"));
cek("RONDE_URUT_CD: ada dari kecil dan dari besar", D.RONDE_URUT_CD.some((x) => x.dari === "kecil") && D.RONDE_URUT_CD.some((x) => x.dari === "besar"));
tiga("RONDE_SEMUA_CD", D.RONDE_SEMUA_CD);
D.RONDE_SEMUA_CD.forEach((ro, r) => {
  const benar = ro.item.filter((s) => D.gramSusunan(s) === ro.acuan).length;
  cek(`RONDE_SEMUA_CD ronde ${r + 1}: empat kumpulan, label unik, 2 atau 3 sama dengan acuan, paling banyak 10 bandul`, ro.item.length === 4 && ro.item.every((s) => sahS(s) && D.banyakBandul(s) <= 10) && unik(ro.item.map(D.teksSusunan)) && benar >= 2 && benar <= 3, `${benar}`);
});
for (const [nama, daftar, isi] of [["RONDE_KGKEG_CD", D.RONDE_KGKEG_CD, (m) => m >= 2 && m <= 7], ["RONDE_GKEKG_CD", D.RONDE_GKEKG_CD, (g) => g % 1000 === 0 && g >= 2000 && g <= 7000], ["RONDE_ONS_CD", D.RONDE_ONS_CD, (n) => n >= 2 && n <= 9]]) {
  tiga(nama, daftar);
  daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: dua soal dalam jangkauan`, ro.length === 2 && ro.every(isi) && unik(ro)));
}
for (let r = 0; r < 3; r += 1) for (let i = 0; i < 2; i += 1) {
  const m = D.RONDE_KGKEG_CD[r][i];
  const o = D.opsiKgKeG(m, r * 2 + i);
  cek(`opsiKgKeG(${m}): tiga berbeda, kunci ${m * 1000} g`, new Set(o.opsi).size === 3 && D.gramDariTeks(o.opsi[o.jawab]) === m * 1000 && o.opsi.filter((x) => D.gramDariTeks(x) === m * 1000).length === 1);
}

/* ---- Picture D ---- */
tiga("RONDE_GARIS_PD", D.RONDE_GARIS_PD);
D.RONDE_GARIS_PD.forEach((ro, r) => cek(`RONDE_GARIS_PD ronde ${r + 1}: dua soal kelipatan 500 g, 500 sampai 4.000`, ro.length === 2 && ro.every((g) => g % 500 === 0 && g >= 500 && g <= 4000)));
cek("RONDE_KALIMAT_PD: tiga berat 1.000 sampai 4.999 yang bukan kelipatan 1.000", D.RONDE_KALIMAT_PD.length === 3 && D.RONDE_KALIMAT_PD.every((g) => g >= 1000 && g <= 4999 && g % 1000 !== 0));
D.RONDE_KALIMAT_PD.forEach((g, r) => {
  const k = D.kalimatKonversiBerat(g, r * 3);
  const kg = Math.floor(g / 1000);
  const s = g % 1000;
  cek(`kalimatKonversiBerat(${g}): tiga kalimat, tiga pilihan berbeda, kunci sah`, k.length === 3 && k.every((x) => x.opsi.length === 3 && unik(x.opsi) && x.benar >= 0 && x.benar < 3));
  const nilai = k.map((x) => Number(x.opsi[x.benar].replace(/\./g, "")));
  cek(`kalimatKonversiBerat(${g}): kalimat 1 sisa gram, 2 kilogram ke gram, 3 kilogram bulat`, nilai[0] === s && nilai[1] === kg * 1000 && nilai[2] === kg, JSON.stringify(nilai));
  cek(`kalimatKonversiBerat(${g}): kalimat terisi benar`, kg * 1000 + nilai[0] === g && nilai[2] * 1000 + s === g);
});
for (const [nama, daftar, ukuran] of [["RONDE_JODOH_PD", D.RONDE_JODOH_PD, 3], ["RONDE_MEMORI_PD", D.RONDE_MEMORI_PD, 4]]) {
  tiga(nama, daftar);
  daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: ${ukuran} berat berbeda, kelipatan 500 g, 500 sampai 4.000`, ro.length === ukuran && unik(ro) && ro.every((g) => g % 500 === 0 && g >= 500 && g <= 4000)));
}
tiga("RONDE_TABEL_PD", D.RONDE_TABEL_PD);
D.RONDE_TABEL_PD.forEach((t, r) => {
  cek(`RONDE_TABEL_PD ronde ${r + 1}: empat baris, label dan jawaban unik, lima kartu memuat semua jawaban`, t.baris.length === 4 && unik(t.baris.map((b) => b.label)) && unik(t.baris.map((b) => b.jawab)) && t.kartu.length === 5 && unik(t.kartu) && t.baris.every((b) => t.kartu.includes(b.jawab)));
  cek(`RONDE_TABEL_PD ronde ${r + 1}: label dan jawaban menyatakan berat yang sama`, t.baris.every((b) => D.gramDariTeks(b.label) === D.gramDariTeks(b.jawab)), JSON.stringify(t.baris));
  const asing = t.kartu.filter((k) => !t.baris.some((b) => b.jawab === k));
  cek(`RONDE_TABEL_PD ronde ${r + 1}: kartu pengecoh tidak sama dengan berat mana pun`, asing.length === 1 && t.baris.every((b) => D.gramDariTeks(asing[0]) !== D.gramDariTeks(b.label)));
});
cek("labelKG dan gramKG", D.labelKG([2, 0]) === "2 kg" && D.labelKG([0, 2000]) === "2.000 g" && D.labelKG([1, 500]) === "1 kg 500 g" && D.labelKG([1, 1000]) === "1 kg 1.000 g" && D.gramKG([1, 1000]) === 2000);
tiga("RONDE_SEMUA_PD", D.RONDE_SEMUA_PD);
D.RONDE_SEMUA_PD.forEach((ro, r) => {
  const benar = ro.item.filter((u) => D.gramKG(u) === ro.acuan).length;
  cek(`RONDE_SEMUA_PD ronde ${r + 1}: empat berat, label unik, 2 atau 3 sama dengan acuan, paling banyak 5 kg`, ro.item.length === 4 && unik(ro.item.map(D.labelKG)) && benar >= 2 && benar <= 3 && ro.item.every((u) => D.gramKG(u) <= 5000), `${benar}`);
});
tiga("RONDE_PILAH_PD", D.RONDE_PILAH_PD);
D.RONDE_PILAH_PD.forEach((ro, r) => cek(`RONDE_PILAH_PD ronde ${r + 1}: enam berat unik, tiga pas kilogram dan tiga bersisa`, ro.length === 6 && unik(ro) && ro.filter(D.pasKg).length === 3));
tiga("RONDE_LANGKAH_PD", D.RONDE_LANGKAH_PD);
D.RONDE_LANGKAH_PD.forEach((ro, r) => cek(`RONDE_LANGKAH_PD ronde ${r + 1}: judul dan empat langkah berbeda`, !!ro.judul && ro.langkah.length === 4 && unik(ro.langkah) && ro.langkah.every((l) => l.length > 10)));
tiga("RONDE_SELISIH_PD", D.RONDE_SELISIH_PD);
D.RONDE_SELISIH_PD.forEach((ro, r) => cek(`RONDE_SELISIH_PD ronde ${r + 1}: dua soal a > b, kelipatan 500, a paling banyak 4 kg`, ro.length === 2 && ro.every(([a, b]) => a > b && a <= 4000 && a % 500 === 0 && b % 500 === 0 && b >= 500)));
tiga("RONDE_SAMBUNG_PD", D.RONDE_SAMBUNG_PD);
D.RONDE_SAMBUNG_PD.forEach((ro, r) => cek(`RONDE_SAMBUNG_PD ronde ${r + 1}: dua soal kelipatan 500, gabungan paling banyak 4 kg`, ro.length === 2 && ro.every(([a, b]) => a % 500 === 0 && b % 500 === 0 && a >= 500 && b >= 500 && a + b <= 4000)));

/* ---- Abstract D ---- */
tiga("RONDE_KG_QD", D.RONDE_KG_QD);
D.RONDE_KG_QD.forEach((ro, r) => cek(`RONDE_KG_QD ronde ${r + 1}: dua soal 2 sampai 10 kg`, ro.length === 2 && ro.every((m) => m >= 2 && m <= 10) && unik(ro)));
for (let r = 0; r < 3; r += 1) for (let i = 0; i < 2; i += 1) {
  const m = D.RONDE_KG_QD[r][i];
  const o = D.opsiKgKeG(m, r * 2 + i);
  cek(`opsiKgKeG(${m}) pada QD: kunci ${m * 1000} g`, new Set(o.opsi).size === 3 && D.gramDariTeks(o.opsi[o.jawab]) === m * 1000);
}
tiga("RONDE_G_QD", D.RONDE_G_QD);
D.RONDE_G_QD.forEach((ro, r) => cek(`RONDE_G_QD ronde ${r + 1}: dua soal 1.000 sampai 4.999 yang bukan kelipatan 1.000`, ro.length === 2 && ro.every((g) => g >= 1000 && g <= 4999 && g % 1000 !== 0) && unik(ro)));
tiga("RONDE_ONS_QD", D.RONDE_ONS_QD);
D.RONDE_ONS_QD.forEach((ro, r) => cek(`RONDE_ONS_QD ronde ${r + 1}: dua soal dengan tiga pilihan berbeda`, ro.length === 2 && ro.every(sahTeks)));
const HITUNG_ONS = { "1 kg = ... ons": "10 ons", "1 ons = ... g": "100 g", "3 ons = ... g": "300 g", "5 kg = ... ons": "50 ons", "700 g = ... ons": "7 ons", "20 ons = ... kg": "2 kg" };
cek("RONDE_ONS_QD: kunci benar secara hitung", D.RONDE_ONS_QD.flat().every((s) => HITUNG_ONS[s.tanya] === s.benar));
tiga("RONDE_JODOH_QD", D.RONDE_JODOH_QD);
D.RONDE_JODOH_QD.forEach((ro, r) => cek(`RONDE_JODOH_QD ronde ${r + 1}: tiga pasangan sama beratnya, kiri dan kanan unik`, ro.length === 3 && ro.every((p) => D.gramDariTeks(p.kiri) === D.gramDariTeks(p.kanan)) && unik(ro.map((p) => p.kiri)) && unik(ro.map((p) => p.kanan)), JSON.stringify(ro)));
tiga("RONDE_MEMORI_QD", D.RONDE_MEMORI_QD);
D.RONDE_MEMORI_QD.forEach((ro, r) => cek(`RONDE_MEMORI_QD ronde ${r + 1}: empat pasangan sama beratnya, kartu unik`, ro.length === 4 && ro.every((p) => D.gramDariTeks(p.a) === D.gramDariTeks(p.b)) && unik([...ro.map((p) => p.a), ...ro.map((p) => p.b)]), JSON.stringify(ro)));
cek("RONDE_BENARSALAH_QD: kunci sesuai isi", JSON.stringify(D.RONDE_BENARSALAH_QD.map((ro) => ro.map((p) => p.benar))) === JSON.stringify([[true, false, true, false, true], [true, false, true, false, false]]) && D.RONDE_BENARSALAH_QD.every((ro) => ro.length === 5 && ro.every((p) => p.penjelasan.length > 20)));
const KLUE_D = [
  (n) => n === 4000 && (String(n).match(/0/g) ?? []).length === 3,
  (n) => n === 1753 && n % 10 === 3,
  (n) => n === 10 && n % 2 === 0 && n < 20,
  (n) => n === 5 && n < 10,
];
cek("RONDE_DETEKTIF_QD: empat soal", D.RONDE_DETEKTIF_QD.length === 4);
D.RONDE_DETEKTIF_QD.forEach((s, i) => {
  const cocok = s.opsi.filter(KLUE_D[i]);
  cek(`RONDE_DETEKTIF_QD ${i + 1}: dua petunjuk, tiga pilihan berbeda, tepat satu cocok yaitu kunci`, s.klue.length === 2 && unik(s.opsi) && s.opsi.length === 3 && cocok.length === 1 && cocok[0] === s.jawab, JSON.stringify(cocok));
});
cek("PETA_KONSEP_QD: dua peta", D.PETA_KONSEP_QD.length === 2 && D.PETA_KONSEP_QD.every((p) => p.kotak.length === 4 && p.kotak.every((k) => k.opsi.length === 3 && unik(k.opsi) && k.benar === 0)));
tiga("RONDE_CERITA_QD", D.RONDE_CERITA_QD);
const KUNCI_QD = [[4000, 1000], [42750, 12500], [1753, 4300]];
D.RONDE_CERITA_QD.forEach((ro, r) =>
  ro.forEach((c, i) => {
    const j = D.jawabCerita(c);
    const o = D.opsiCeritaKg(c, r * 2 + i);
    cek(`RONDE_CERITA_QD ${r + 1}-${i + 1}: tiga pilihan berbeda, kunci ${D.teksKgG(j)}`, new Set(o.opsi).size === 3 && o.opsi[o.jawab] === D.teksKgG(j) && j === KUNCI_QD[r][i] && o.opsi.filter((x) => D.gramDariTeks(x) === j).length === 1);
  }),
);
cek("RONDE_CERITA_QD: teks memuat berat (mangga 8.000 gram, tepung 1.753 gram, beras 30 kg 250 g)", D.RONDE_CERITA_QD[0][0].teks.includes("8.000 gram") && D.RONDE_CERITA_QD[2][0].teks.includes("1.753 gram") && D.RONDE_CERITA_QD[1][0].teks.includes(D.teksKgG(30250)) && D.RONDE_CERITA_QD[1][0].teks.includes(D.teksKgG(12500)));
cek("RONDE_CERITA_QD: ada jumlah, kurang, dan ubah", ["+", "−", "u"].every((j) => D.RONDE_CERITA_QD.flat().some((c) => c.jenis === j)));
cek("RONDE_SUSUNKATA_QD: empat kalimat, kata unik, pengecoh bukan bagian kalimat", D.RONDE_SUSUNKATA_QD.length === 4 && D.RONDE_SUSUNKATA_QD.every((s) => s.kata.length >= 6 && unik(s.kata.map((k) => k.toLowerCase())) && !s.kata.map((k) => k.toLowerCase()).includes(s.pengecoh)));

/* ====================================================================== */
/* Naskah                                                                   */
/* ====================================================================== */

cek("K3B3_META", N.K3B3_META.chapterId === "k3-mat-bab3" && N.K3B3_META.phaseCode === "FASE_B" && N.K3B3_META.grade === 3 && N.K3B3_META.suaraLaju === 0.7 && N.K3B3_META.suaraNada === 1);
cek("SUB_BAB_K3B3: empat sub-bab A sampai D", N.SUB_BAB_K3B3.map((s) => s.id).join() === "A,B,C,D");
for (const s of N.SUB_BAB_K3B3) {
  const k = s.id;
  cek(`${k}: tiga video, tiap video tiga adegan`, s.videos.length === 3 && s.videos.every((v) => v.adegan.length === 3));
  cek(`${k}: tiap adegan empat ketukan dan empat papan`, s.videos.every((v) => v.adegan.every((a) => a.ketukan.length === 4 && a.papan.length === 4)));
  cek(`${k}: ketukan lebih dari 20 huruf`, s.videos.every((v) => v.adegan.every((a) => a.ketukan.every((t) => t.length > 20))), s.videos.flatMap((v) => v.adegan.flatMap((a) => a.ketukan.filter((t) => t.length <= 20))).join("|"));
  cek(`${k}: papan 2 sampai 39 huruf`, s.videos.every((v) => v.adegan.every((a) => a.papan.every((t) => t.length >= 2 && t.length <= 39))), s.videos.flatMap((v) => v.adegan.flatMap((a) => a.papan.filter((t) => t.length > 39))).join("|"));
  cek(`${k}: id adegan unik`, unik(s.videos.flatMap((v) => v.adegan.map((a) => a.id))));
  cek(`${k}: delapan langkah peta pikiran, uraian lebih dari 180 huruf`, s.mindMaps.length === 8 && s.mindMaps.every((m, i) => m.stepNumber === i + 1 && m.stepDesc.length > 180), s.mindMaps.map((m) => m.stepDesc.length).join());
  cek(`${k}: rantai flowFrom dan flowTo menyambung`, s.mindMaps.every((m, i) => i === 0 || m.flowFrom === s.mindMaps[i - 1].flowTo));
  cek(`${k}: sepuluh panel infografis lengkap`, s.infografis.length === 10 && s.infografis.every((p) => p.judul && p.emoji && p.countNum >= 1 && p.countWord && p.suara.length > 30) && unik(s.infografis.map((p) => p.judul)));
  cek(`${k}: 30 permainan, 10 per tahap`, s.games.length === 30 && ["Concrete", "Picture", "Abstract"].every((st) => s.games.filter((g) => g.stage === st).length === 10));
  cek(`${k}: urutan tahap Concrete lalu Picture lalu Abstract`, s.games.slice(0, 10).every((g) => g.stage === "Concrete") && s.games.slice(10, 20).every((g) => g.stage === "Picture") && s.games.slice(20).every((g) => g.stage === "Abstract"));
  cek(`${k}: judul dan jenis permainan unik`, unik(s.games.map((g) => g.title)) && unik(s.games.map((g) => g.gameType)));
  cek(`${k}: tiap permainan punya acuan buku, tujuan, cara main, dan suara`, s.games.every((g) => g.bookReference.startsWith("hlm.") && g.objective.length > 20 && g.mechanicDescription.length > 40 && g.voiceGuide.length > 5));
  cek(`${k}: Concrete punya emoji dan banyak, Picture punya diagram, Abstract punya lambang`, s.games.filter((g) => g.stage === "Concrete").every((g) => !!g.emoji && g.targetCount > 0) && s.games.filter((g) => g.stage === "Picture").every((g) => !!g.diagramType) && s.games.filter((g) => g.stage === "Abstract").every((g) => !!g.symbolLarge && !!g.wordLarge && !!g.mathNotation));
  cek(`${k}: lima poin penting, empat refleksi, empat potongan cara`, s.poin.length === 5 && s.refleksi.length === 4 && s.cara.potongan.length === 4 && s.poin.every((p) => p.ikon && p.nama && p.isi && p.suara.length > 20));
  cek(`${k}: silabus lengkap`, s.silabus.teksSuara.length > 100 && s.silabus.cp.length > 50 && s.silabus.referensi.includes("Bab 3"));
}
cek("naskah: tidak memuat nilai tukar rupiah", !/rupiah|Rp\s?\d|\bkurs\b/i.test(JSON.stringify(N.SUB_BAB_K3B3)));
cek("semuaAdeganK3B3: 36 adegan", N.semuaAdeganK3B3.length === 36);

console.log(`\nUji data Kelas 3 Bab 3: ${lulus} lulus, ${gagal} gagal.`);
if (gagal > 0) process.exit(1);
