// Uji data murni Matematika Kelas 3 Bab 3 (Pengukuran Panjang dan Berat), Sub-Bab A dan B. Jalankan: node --no-warnings scripts/uji-data-k3b3.mjs
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
/* Naskah                                                                   */
/* ====================================================================== */

cek("K3B3_META", N.K3B3_META.chapterId === "k3-mat-bab3" && N.K3B3_META.phaseCode === "FASE_B" && N.K3B3_META.grade === 3 && N.K3B3_META.suaraLaju === 0.7 && N.K3B3_META.suaraNada === 1);
cek("SUB_BAB_K3B3: dua sub-bab A dan B", N.SUB_BAB_K3B3.map((s) => s.id).join() === "A,B");
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
cek("semuaAdeganK3B3: 18 adegan", N.semuaAdeganK3B3.length === 18);

console.log(`\nUji data Kelas 3 Bab 3: ${lulus} lulus, ${gagal} gagal.`);
if (gagal > 0) process.exit(1);
