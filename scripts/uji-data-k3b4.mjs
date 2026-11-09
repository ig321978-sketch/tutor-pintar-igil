// Uji data murni Matematika Kelas 3 Bab 4 (Unsur-Unsur Bangun Datar), Sub-Bab A. Jalankan: node --no-warnings scripts/uji-data-k3b4.mjs
// Memeriksa: pembantu umum, tiap ronde permainan (kunci dihitung dari bilangan, pilihan berbeda, jangkauan penggaris),
// kebenaran semua kalimat dan pernyataan, dan struktur naskah (3 video x 3 adegan x 4 ketukan, 8 peta pikiran, 10 panel infografis,
// 30 permainan per sub-bab).
import * as D from "../src/components/modul/data-k3b4.ts";
import * as N from "../src/components/modul/naskah-k3b4.ts";
import { NAMA_BENDA } from "../src/components/modul/data-k3b3.ts";

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
cek("titik", D.titik(5000) === "5.000" && D.titik(117) === "117");
cek("teksMm", D.teksMm(55) === "5 cm 5 mm" && D.teksMm(40) === "4 cm" && D.teksMm(7) === "7 mm" && D.teksMm(115) === "11 cm 5 mm" && D.teksMm(29) === "2 cm 9 mm" && D.teksMm(100) === "10 cm");
cek("teksDesimalCm", D.teksDesimalCm(55) === "5,5 cm" && D.teksDesimalCm(40) === "4 cm" && D.teksDesimalCm(37) === "3,7 cm" && D.teksDesimalCm(125) === "12,5 cm");
for (let n = 1; n <= 150; n += 1) cek(`mmDariTeks(teksMm(${n}))`, D.mmDariTeks(D.teksMm(n)) === n);
for (let n = 1; n <= 150; n += 1) cek(`mmDariTeks(teksDesimalCm(${n}))`, D.mmDariTeks(D.teksDesimalCm(n)) === n);
for (const n of [1, 5, 29, 37, 55, 75, 100, 125]) for (let k = 0; k < 3; k += 1) {
  const o = D.opsiMm(n, k);
  cek(`opsiMm(${n}, ${k}) tiga berbeda memuat ${n}, semuanya positif`, new Set(o).size === 3 && o.includes(n) && o.every((v) => v > 0), JSON.stringify(o));
}
const SEMUA_MM = [...new Set([...D.RONDE_BACA_CA.flat().map((s) => s.mm), ...D.RONDE_PENGGARIS_PA.flat(), ...D.RONDE_JODOH_PA.flat()])];
for (const n of SEMUA_MM) for (let k = 0; k < 3; k += 1) {
  const o = D.opsiPenggaris(n, k);
  cek(`opsiPenggaris(${n}, ${k}) tiga berbeda memuat ${n}, paling banyak 15 cm`, new Set(o).size === 3 && o.includes(n) && o.every((v) => v > 0 && v <= 150), JSON.stringify(o));
}
for (const j of D.URUT_GARIS) for (let k = 0; k < 3; k += 1) {
  const o = D.opsiJenis(j, k);
  cek(`opsiJenis(${j}, ${k}) tiga berbeda menunjuk ${D.NAMA_GARIS[j]}`, new Set(o.opsi).size === 3 && o.opsi[o.jawab] === D.NAMA_GARIS[j]);
}
cek("namaGaris", D.namaGaris({ jenis: "sinar", a: "A", b: "B" }) === "sinar garis AB" && D.namaGaris({ jenis: "garis", a: "C", b: "D" }) === "garis CD" && D.namaGaris({ jenis: "ruas", a: "K", b: "L" }) === "ruas garis KL" && D.namaGaris({ jenis: "kurva", a: "P", b: "Q" }) === "kurva PQ");
cek("labelSisi dan tanyaSisi", D.labelSisi(4) === "4 sisi" && D.labelSisi(0) === "tanpa sisi lurus" && D.tanyaSisi(8) === "punya 8 sisi" && D.tanyaSisi(0) === "tidak punya sisi lurus");
const SISI_NYATA = { buku: 4, bingkai: 4, kartu: 4, tv: 4, ponsel: 4, segitiga: 3, rambu: 3, stop: 8, jam: 0, kue: 0, sasaran: 0 };
for (const [id, b] of Object.entries(D.BENDA_SISI)) cek(`BENDA_SISI ${id}: emoji, nama, banyak sisi benar`, b.id === id && !!b.emoji && !!b.nama && b.sisi === SISI_NYATA[id]);
cek("BENDA_SISI: nama unik dan semua benda terdaftar", unik(Object.values(D.BENDA_SISI).map((b) => b.nama)) && Object.keys(D.BENDA_SISI).length === Object.keys(SISI_NYATA).length);
const JENIS_NYATA = { senter: "sinar", rel: "garis", pensil: "ruas", penggaris: "ruas", pelangi: "kurva" };
for (const [id, b] of Object.entries(D.GARIS_BENDA)) cek(`GARIS_BENDA ${id}: jenis garis benar`, b.id === id && !!b.emoji && !!b.nama && b.jenis === JENIS_NYATA[id]);

/* ====================================================================== */
/* Concrete                                                                 */
/* ====================================================================== */

const JENIS = Object.keys(NAMA_BENDA);
const sahMm = (s) => JENIS.includes(s.jenis) && s.mm % 5 === 0 && s.mm >= 25 && s.mm <= 145;
const adaSemua = (ids, peta) => ids.every((id) => !!peta[id]);

tiga("RONDE_HITUNG_CA", D.RONDE_HITUNG_CA);
D.RONDE_HITUNG_CA.forEach((ro, r) => cek(`RONDE_HITUNG_CA ronde ${r + 1}: dua benda berbeda yang bersisi`, ro.length === 2 && unik(ro) && adaSemua(ro, D.BENDA_SISI) && ro.every((id) => D.BENDA_SISI[id].sisi >= 3)));
for (let r = 0; r < 3; r += 1) for (let i = 0; i < 2; i += 1) {
  const n = D.BENDA_SISI[D.RONDE_HITUNG_CA[r][i]].sisi;
  const o = D.opsiAngka(n, r * 2 + i);
  cek(`opsiAngka(${n}) pada CA1: tiga berbeda memuat kunci, tidak negatif`, new Set(o).size === 3 && o.includes(n) && o.every((v) => v >= 0), JSON.stringify(o));
}
tiga("RONDE_MIRIP_CA", D.RONDE_MIRIP_CA);
D.RONDE_MIRIP_CA.forEach((ro, r) => cek(`RONDE_MIRIP_CA ronde ${r + 1}: dua benda garis berbeda`, ro.length === 2 && unik(ro) && adaSemua(ro, D.GARIS_BENDA)));
tiga("RONDE_BACA_CA", D.RONDE_BACA_CA);
D.RONDE_BACA_CA.forEach((ro, r) => cek(`RONDE_BACA_CA ronde ${r + 1}: dua soal kelipatan 5 mm, 2,5 sampai 14,5 cm, bukan kelipatan 10`, ro.length === 2 && ro.every((s) => sahMm(s) && s.mm % 10 === 5)));
tiga("RONDE_JODOH_CA", D.RONDE_JODOH_CA);
D.RONDE_JODOH_CA.forEach((ro, r) => cek(`RONDE_JODOH_CA ronde ${r + 1}: tiga benda dengan banyak sisi berbeda`, ro.length === 3 && adaSemua(ro, D.BENDA_SISI) && unik(ro.map((id) => D.BENDA_SISI[id].sisi))));
tiga("RONDE_MEMORI_CA", D.RONDE_MEMORI_CA);
D.RONDE_MEMORI_CA.forEach((ro, r) => cek(`RONDE_MEMORI_CA ronde ${r + 1}: empat benda dengan banyak sisi berbeda`, ro.length === 4 && adaSemua(ro, D.BENDA_SISI) && unik(ro.map((id) => D.BENDA_SISI[id].sisi))));
tiga("RONDE_KETUK_CA", D.RONDE_KETUK_CA);
D.RONDE_KETUK_CA.forEach((ro, r) => cek(`RONDE_KETUK_CA ronde ${r + 1}: tiga benda, dua pertanyaan, jawabannya tepat satu benda`, ro.item.length === 3 && adaSemua(ro.item, D.BENDA_SISI) && unik(ro.item.map((id) => D.BENDA_SISI[id].sisi)) && ro.tanya.length === 2 && ro.tanya.every((n) => ro.item.filter((id) => D.BENDA_SISI[id].sisi === n).length === 1)));
tiga("RONDE_SEMUA_CA", D.RONDE_SEMUA_CA);
D.RONDE_SEMUA_CA.forEach((ro, r) => {
  const benar = ro.item.filter((id) => D.BENDA_SISI[id].sisi === ro.sisi).length;
  cek(`RONDE_SEMUA_CA ronde ${r + 1}: empat benda unik, 1 sampai 3 cocok`, ro.item.length === 4 && unik(ro.item) && adaSemua(ro.item, D.BENDA_SISI) && benar >= 1 && benar <= 3, `${benar}`);
});
tiga("RONDE_PAPAN_CA", D.RONDE_PAPAN_CA);
D.RONDE_PAPAN_CA.forEach((ro, r) => cek(`RONDE_PAPAN_CA ronde ${r + 1}: dua soal kelipatan 5 mm yang bukan kelipatan 10`, ro.length === 2 && ro.every((s) => sahMm(s) && s.mm % 10 === 5)));
tiga("RONDE_URUT_CA", D.RONDE_URUT_CA);
D.RONDE_URUT_CA.forEach((ro, r) => cek(`RONDE_URUT_CA ronde ${r + 1}: tiga benda berbeda panjangnya, id unik`, ro.item.length === 3 && ro.item.every(sahMm) && unik(ro.item.map((s) => s.mm)) && unik(ro.item.map(D.idMm)) && (ro.dari === "kecil" || ro.dari === "besar")));
cek("RONDE_URUT_CA: ada dari kecil dan dari besar", D.RONDE_URUT_CA.some((x) => x.dari === "kecil") && D.RONDE_URUT_CA.some((x) => x.dari === "besar"));
tiga("RONDE_JUMLAH_CA", D.RONDE_JUMLAH_CA);
D.RONDE_JUMLAH_CA.forEach((ro, r) => {
  const n = ro.reduce((a, id) => a + D.BENDA_SISI[id].sisi, 0);
  const o = D.opsiAngka(n, r);
  cek(`RONDE_JUMLAH_CA ronde ${r + 1}: dua benda berbeda, jumlah sisi ${n}, tiga pilihan berbeda`, ro.length === 2 && unik(ro) && adaSemua(ro, D.BENDA_SISI) && ro.every((id) => D.BENDA_SISI[id].sisi >= 3) && new Set(o).size === 3 && o.includes(n));
});

/* ====================================================================== */
/* Picture                                                                  */
/* ====================================================================== */

const idGaris = (g) => `${g.jenis}${g.a}${g.b}`;
const sahGaris = (g) => D.URUT_GARIS.includes(g.jenis) && /^[A-Z]$/.test(g.a) && /^[A-Z]$/.test(g.b) && g.a !== g.b && (g.jenis !== "kurva" || [0, 1, 2].includes(g.v));
tiga("RONDE_JENIS_PA", D.RONDE_JENIS_PA);
D.RONDE_JENIS_PA.forEach((ro, r) => cek(`RONDE_JENIS_PA ronde ${r + 1}: dua gambar garis berbeda jenis`, ro.length === 2 && ro.every(sahGaris) && unik(ro.map((g) => g.jenis))));
tiga("RONDE_PENGGARIS_PA", D.RONDE_PENGGARIS_PA);
D.RONDE_PENGGARIS_PA.forEach((ro, r) => cek(`RONDE_PENGGARIS_PA ronde ${r + 1}: dua panjang kelipatan 5 mm yang bukan kelipatan 10, 2,5 sampai 14,5 cm`, ro.length === 2 && unik(ro) && ro.every((mm) => mm % 10 === 5 && mm >= 25 && mm <= 145)));
for (const [nama, daftar, ukuran] of [["RONDE_JODOH_PA", D.RONDE_JODOH_PA, 3]]) {
  tiga(nama, daftar);
  daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: ${ukuran} panjang berbeda kelipatan 5 mm, paling banyak 14,5 cm, teks unik`, ro.length === ukuran && unik(ro) && ro.every((mm) => mm % 5 === 0 && mm >= 25 && mm <= 145) && unik(ro.map(D.teksMm))));
}
tiga("RONDE_MEMORI_PA", D.RONDE_MEMORI_PA);
D.RONDE_MEMORI_PA.forEach((ro, r) => cek(`RONDE_MEMORI_PA ronde ${r + 1}: empat garis dengan jenis berbeda, nama unik`, ro.length === 4 && ro.every(sahGaris) && unik(ro.map((g) => g.jenis)) && unik(ro.map(D.namaGaris))));
const SISI_BANGUN = { Segitiga: 3, Persegi: 4, "Persegi panjang": 4, Segilima: 5, Segienam: 6, Segidelapan: 8 };
tiga("RONDE_TABEL_PA", D.RONDE_TABEL_PA);
D.RONDE_TABEL_PA.forEach((t, r) => {
  const jawab = t.baris.map((b) => b.jawab);
  const pengecoh = t.kartu.filter((k) => !jawab.includes(k));
  cek(`RONDE_TABEL_PA ronde ${r + 1}: empat baris unik, jawabannya benar menurut bangun datarnya`, t.baris.length === 4 && unik(t.baris.map((b) => b.label)) && t.baris.every((b) => b.jawab === `${SISI_BANGUN[b.label]} sisi`), JSON.stringify(t.baris));
  cek(`RONDE_TABEL_PA ronde ${r + 1}: lima kartu unik, semua jawaban ada, satu pengecoh yang salah untuk semua baris`, t.kartu.length === 5 && unik(t.kartu) && jawab.every((j) => t.kartu.includes(j)) && pengecoh.length === 1 && unik(jawab));
});
tiga("RONDE_SEMUA_PA", D.RONDE_SEMUA_PA);
D.RONDE_SEMUA_PA.forEach((ro, r) => {
  const benar = ro.item.filter((n) => n === ro.n).length;
  cek(`RONDE_SEMUA_PA ronde ${r + 1}: empat bangun 3 sampai 8 sisi, 1 sampai 3 cocok`, ro.item.length === 4 && ro.item.every((n) => n >= 3 && n <= 8) && ro.n >= 3 && ro.n <= 8 && benar >= 1 && benar <= 3, `${benar}`);
});
tiga("RONDE_PILAH_PA", D.RONDE_PILAH_PA);
D.RONDE_PILAH_PA.forEach((ro, r) => {
  const l = ro.filter(D.lurus).length;
  cek(`RONDE_PILAH_PA ronde ${r + 1}: enam garis unik, tiga lurus dan tiga lengkung`, ro.length === 6 && ro.every(sahGaris) && unik(ro.map(idGaris)) && l === 3, `${l}`);
});
cek("lurus", D.lurus({ jenis: "sinar", a: "A", b: "B" }) && D.lurus({ jenis: "garis", a: "A", b: "B" }) && D.lurus({ jenis: "ruas", a: "A", b: "B" }) && !D.lurus({ jenis: "kurva", a: "A", b: "B", v: 0 }));
tiga("RONDE_LANGKAH_PA", D.RONDE_LANGKAH_PA);
D.RONDE_LANGKAH_PA.forEach((ro, r) => cek(`RONDE_LANGKAH_PA ronde ${r + 1}: judul dan empat langkah berbeda`, !!ro.judul && ro.langkah.length === 4 && unik(ro.langkah) && ro.langkah.every((l) => l.length > 10)));
tiga("RONDE_PAPAN_PA", D.RONDE_PAPAN_PA);
D.RONDE_PAPAN_PA.forEach((ro, r) => cek(`RONDE_PAPAN_PA ronde ${r + 1}: dua panjang kelipatan 5 mm yang bukan kelipatan 10, 2,5 sampai 14,5 cm`, ro.length === 2 && unik(ro) && ro.every((mm) => mm % 10 === 5 && mm >= 25 && mm <= 145)));
tiga("RONDE_SISI_PA", D.RONDE_SISI_PA);
D.RONDE_SISI_PA.forEach((ro, r) => cek(`RONDE_SISI_PA ronde ${r + 1}: dua bangun, tiga dan empat titik sudut, huruf unik`, ro.length === 2 && ro.map((s) => s.huruf.length).join() === "3,4" && ro.every((s) => unik(s.huruf) && s.huruf.every((h) => /^[A-Z]$/.test(h)))));
cek("sisiDari", D.sisiDari(["E", "F", "G"]).join() === "EF,FG,EG" && D.sisiDari(["G", "H", "I", "J"]).join() === "GH,HI,IJ,GJ");
for (let r = 0; r < 3; r += 1) for (let i = 0; i < 2; i += 1) {
  const huruf = D.RONDE_SISI_PA[r][i].huruf;
  const o = D.opsiSisi(huruf, r * 2 + i);
  cek(`opsiSisi(${huruf.join("")}): tiga berbeda, kunci memuat semua sisi, pengecoh tidak`, new Set(o.opsi).size === 3 && o.opsi[o.jawab] === D.sisiDari(huruf).join(", ") && o.opsi.every((x, j) => j === o.jawab || x.split(", ").length !== huruf.length || !D.sisiDari(huruf).every((s) => x.split(", ").includes(s))), JSON.stringify(o));
  cek(`opsiSisi(${huruf.join("")}): pengecoh hanya memuat huruf yang wajar (A sampai Z)`, o.opsi.every((x) => /^[A-Z]{2}(, [A-Z]{2})*$/.test(x)), JSON.stringify(o.opsi));
}

/* ====================================================================== */
/* Abstract                                                                 */
/* ====================================================================== */

const sahTeks = (s) => !!s.tanya && !!s.benar && s.salah.length === 2 && new Set([s.benar, ...s.salah]).size === 3 && s.pesan.length > 15;
for (const [nama, daftar] of [["RONDE_NAMA_QA", D.RONDE_NAMA_QA], ["RONDE_UBAH_QA", D.RONDE_UBAH_QA]]) {
  tiga(nama, daftar);
  daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: dua soal dengan tiga pilihan berbeda`, ro.length === 2 && ro.every(sahTeks)));
  for (let r = 0; r < 3; r += 1) for (let i = 0; i < 2; i += 1) {
    const o = D.susunOpsi(daftar[r][i].benar, daftar[r][i].salah, r * 2 + i);
    cek(`${nama} ${r}-${i}: susunOpsi menunjuk kunci`, o.opsi[o.jawab] === daftar[r][i].benar && new Set(o.opsi).size === 3);
  }
}
/* QA1: jawaban benar sesuai uraian */
const NAMA_BENAR = {
  "Garis yang hanya dapat diperpanjang ke satu arah disebut ...": "Sinar garis",
  "Garis yang memiliki panjang tertentu dan kedua ujungnya berhenti disebut ...": "Ruas garis",
  "Garis yang dapat diperpanjang ke kedua arah disebut ...": "Garis",
  "Garis yang melengkung disebut ...": "Kurva",
  "Batas dari bangun datar disebut ...": "Sisi",
  "Dua titik berbeda hanya dapat dihubungkan dengan satu ... lurus.": "ruas garis",
};
cek("RONDE_NAMA_QA: kunci benar menurut uraian", D.RONDE_NAMA_QA.flat().every((s) => NAMA_BENAR[s.tanya] === s.benar));
/* QA3: kunci dihitung dari ukuran */
D.RONDE_UBAH_QA.flat().forEach((s) => {
  const kiri = D.mmDariTeks(s.tanya.split(" = ")[0]);
  cek(`RONDE_UBAH_QA "${s.tanya}": kunci ${s.benar} sama panjang, pengecoh tidak`, D.mmDariTeks(s.benar) === kiri && s.salah.every((x) => D.mmDariTeks(x) !== kiri), `${kiri}`);
});
tiga("RONDE_KALIMAT_QA", D.RONDE_KALIMAT_QA);
D.RONDE_KALIMAT_QA.forEach((ro, r) => cek(`RONDE_KALIMAT_QA ronde ${r + 1}: tiga kalimat, tiga pilihan berbeda, kunci sah`, ro.length === 3 && ro.every((k) => k.opsi.length === 3 && unik(k.opsi) && k.benar >= 0 && k.benar < 3 && !!k.depan)));
tiga("RONDE_JODOH_QA", D.RONDE_JODOH_QA);
D.RONDE_JODOH_QA.forEach((ro, r) => cek(`RONDE_JODOH_QA ronde ${r + 1}: tiga pasangan sama panjangnya, kiri dan kanan unik`, ro.length === 3 && ro.every((p) => D.mmDariTeks(p.kiri) === D.mmDariTeks(p.kanan) && p.kiri !== p.kanan) && unik(ro.map((p) => p.kiri)) && unik(ro.map((p) => p.kanan)), JSON.stringify(ro)));
tiga("RONDE_MEMORI_QA", D.RONDE_MEMORI_QA);
D.RONDE_MEMORI_QA.forEach((ro, r) => cek(`RONDE_MEMORI_QA ronde ${r + 1}: empat pasangan sama panjangnya, kartu unik`, ro.length === 4 && ro.every((p) => D.mmDariTeks(p.a) === D.mmDariTeks(p.b)) && unik([...ro.map((p) => p.a), ...ro.map((p) => p.b)]), JSON.stringify(ro)));
cek("RONDE_BENARSALAH_QA: dua ronde, lima pernyataan, kunci sesuai isi", D.RONDE_BENARSALAH_QA.length === 2 && D.RONDE_BENARSALAH_QA.every((ro) => ro.length === 5 && ro.some((p) => p.benar) && ro.some((p) => !p.benar) && ro.every((p) => p.penjelasan.length > 20)) && JSON.stringify(D.RONDE_BENARSALAH_QA.map((ro) => ro.map((p) => p.benar))) === JSON.stringify([[true, false, true, false, true], [true, false, true, false, true]]));
const KLUE = [
  (n) => n === 10 && n % 2 === 0 && n < 20,
  (n) => n === 37 && n % 10 === 7,
  (n) => n === 3 && n < 5,
  (n) => n === 4 && n % 2 === 0,
];
cek("RONDE_DETEKTIF_QA: empat soal", D.RONDE_DETEKTIF_QA.length === 4);
D.RONDE_DETEKTIF_QA.forEach((s, i) => {
  const cocok = s.opsi.filter(KLUE[i]);
  cek(`RONDE_DETEKTIF_QA ${i + 1}: dua petunjuk, tiga pilihan berbeda, tepat satu cocok yaitu kunci`, s.klue.length === 2 && unik(s.opsi) && s.opsi.length === 3 && cocok.length === 1 && cocok[0] === s.jawab, JSON.stringify(cocok));
});
cek("PETA_KONSEP_QA: dua peta, empat kotak, tiga pilihan berbeda", D.PETA_KONSEP_QA.length === 2 && D.PETA_KONSEP_QA.every((p) => !!p.pusat && p.kotak.length === 4 && p.kotak.every((k) => k.opsi.length === 3 && unik(k.opsi) && k.benar >= 0 && k.benar < 3 && !!k.label)));
/* QA9: cerita, kunci dihitung dari ukuran pada teks */
const KUNCI_CERITA = [[[5, "mm"], [37, "mm"]], [[75, "mm"], [95, "mm"]], [[12, "cm"], [100, "mm"]]];
tiga("RONDE_CERITA_QA", D.RONDE_CERITA_QA);
D.RONDE_CERITA_QA.forEach((ro, r) =>
  ro.forEach((c, i) => {
    const o = D.opsiCerita(c, r * 2 + i);
    cek(`RONDE_CERITA_QA ${r + 1}-${i + 1}: kunci ${c.jawab} ${c.satuan} sesuai hitungan, tiga pilihan berbeda`, c.jawab === KUNCI_CERITA[r][i][0] && c.satuan === KUNCI_CERITA[r][i][1] && c.pesan.includes(String(c.jawab)) && new Set(o.opsi).size === 3 && o.opsi[o.jawab] === `${c.jawab} ${c.satuan}`, JSON.stringify(o));
  }),
);
cek("RONDE_CERITA_QA: hitungan dari teks (selisih 55 − 50, 3 cm 7 mm, 40 + 35, 115 − 20, 3 + 4 + 5, 4 × 25)", 55 - 50 === 5 && 30 + 7 === 37 && 40 + 35 === 75 && 115 - 20 === 95 && 3 + 4 + 5 === 12 && 4 * 25 === 100);
cek("RONDE_SUSUNKATA_QA: empat kalimat, kata unik, pengecoh bukan bagian kalimat", D.RONDE_SUSUNKATA_QA.length === 4 && D.RONDE_SUSUNKATA_QA.every((s) => s.kata.length >= 6 && unik(s.kata.map((k) => k.toLowerCase())) && !s.kata.map((k) => k.toLowerCase()).includes(s.pengecoh)));

/* ====================================================================== */
/* Sub-Bab B: Sudut pada bidang datar                                       */
/* ====================================================================== */

/* ---- Pembantu sudut ---- */
const jenisManual = (d) => (d === 90 ? "siku-siku" : d === 180 ? "lurus" : d < 90 ? "lancip" : d < 180 ? "tumpul" : "refleks");
for (let d = 1; d < 360; d += 1) cek(`jenisSudut(${d})`, D.jenisSudut(d) === jenisManual(d));
for (const d of [0, 360, -5, 400]) cek(`jenisSudut(${d}) menolak ukuran di luar 0 sampai 360`, (() => { try { D.jenisSudut(d); return false; } catch { return true; } })());
cek("namaSudut, labelSudut, teksDerajat", D.namaSudut("lancip") === "sudut lancip" && D.labelSudut("siku-siku") === "Sudut siku-siku" && D.teksDerajat(50) === "50°");
for (const j of D.URUT_SUDUT) for (let k = 0; k < 3; k += 1) {
  const o = D.opsiJenisSudut(j, k);
  cek(`opsiJenisSudut(${j}, ${k}) tiga berbeda menunjuk ${D.labelSudut(j)}`, new Set(o.opsi).size === 3 && o.opsi[o.jawab] === D.labelSudut(j));
}
for (let d = 10; d <= 170; d += 5) if (d !== 90) for (let k = 0; k < 3; k += 1) {
  const o = D.opsiBusur(d, k);
  cek(`opsiBusur(${d}, ${k}) tiga berbeda memuat ${d} dan bacaan skala yang salah, semuanya 1 sampai 180`, new Set(o).size === 3 && o.includes(d) && o.includes(180 - d) && o.every((v) => v >= 1 && v <= 180), JSON.stringify(o));
}
for (const d of [60, 90, 130, 180, 230, 300, 360]) for (let k = 0; k < 3; k += 1) {
  const o = D.opsiDerajat(d, k);
  cek(`opsiDerajat(${d}, ${k}) tiga berbeda memuat ${d}, semuanya 1 sampai 360`, new Set(o).size === 3 && o.includes(d) && o.every((v) => v >= 1 && v <= 360), JSON.stringify(o));
}
cek("cocokPutar", D.cocokPutar("lebih", 45, 60) && !D.cocokPutar("lebih", 45, 45) && D.cocokPutar("kurang", 60, 45) && !D.cocokPutar("kurang", 60, 60) && !D.cocokPutar("kurang", 60, 0) && D.cocokPutar("sama", 90, 90) && !D.cocokPutar("sama", 90, 75));
cek("tanyaPutar dan pesanPutar", /lebih besar/.test(D.tanyaPutar({ syarat: "lebih", target: 45, awal: 15 })) && /lebih kecil/.test(D.tanyaPutar({ syarat: "kurang", target: 60, awal: 90 })) && /pojok kertas lipat/.test(D.tanyaPutar({ syarat: "sama", target: 90, awal: 45 })) && /garis lurus/.test(D.tanyaPutar({ syarat: "sama", target: 180, awal: 90 })) && /90°/.test(D.pesanPutar({ syarat: "sama", target: 90, awal: 45 })) && /180°/.test(D.pesanPutar({ syarat: "sama", target: 180, awal: 90 })));

/* ---- Concrete B ---- */
const BENDA_SUDUT = Object.keys(D.NAMA_BENDA_SUDUT);
const sahBenda = (s) => BENDA_SUDUT.includes(s.benda) && s.deg >= 15 && s.deg <= (s.benda === "gunting" ? 160 : 180) && Number.isInteger(s.deg);
for (const [nama, daftar] of [["RONDE_STRIP_CB", D.RONDE_STRIP_CB], ["RONDE_SIKU_CB", D.RONDE_SIKU_CB]]) {
  tiga(nama, daftar);
  daftar.forEach((ro, r) =>
    cek(
      `${nama} ronde ${r + 1}: dua soal kelipatan 15, awal belum memenuhi syarat, jawaban masih bisa dicapai pada 0 sampai 180`,
      ro.length === 2 &&
        ro.every((s) => {
          const nilai = [];
          for (let a = 0; a <= 180; a += 15) nilai.push(a);
          return s.awal % 15 === 0 && s.target % 15 === 0 && s.awal >= 0 && s.awal <= 180 && !D.cocokPutar(s.syarat, s.target, s.awal) && nilai.some((a) => D.cocokPutar(s.syarat, s.target, a));
        }),
      JSON.stringify(ro),
    ),
  );
}
cek("RONDE_STRIP_CB: ada lebih dan kurang", D.RONDE_STRIP_CB.flat().some((s) => s.syarat === "lebih") && D.RONDE_STRIP_CB.flat().some((s) => s.syarat === "kurang") && D.RONDE_STRIP_CB.flat().every((s) => s.syarat !== "sama"));
cek("RONDE_SIKU_CB: hanya sama, target 90 dan 180 (kertas lipat dan garis lurus)", D.RONDE_SIKU_CB.flat().every((s) => s.syarat === "sama" && (s.target === 90 || s.target === 180)) && D.RONDE_SIKU_CB.flat().some((s) => s.target === 90) && D.RONDE_SIKU_CB.flat().some((s) => s.target === 180));
tiga("RONDE_TERBUKA_CB", D.RONDE_TERBUKA_CB);
D.RONDE_TERBUKA_CB.forEach((ro, r) => cek(`RONDE_TERBUKA_CB ronde ${r + 1}: tiga bukaan berbeda 15 sampai 165, dua pertanyaan berbeda (lebar dan sempit)`, BENDA_SUDUT.includes(ro.benda) && ro.degs.length === 3 && unik(ro.degs) && ro.degs.every((d) => d >= 15 && d <= 165) && ro.tanya.length === 2 && unik(ro.tanya) && ro.tanya.every((t) => t === "lebar" || t === "sempit")));
for (const [nama, daftar, ukuran] of [["RONDE_JENIS_CB", D.RONDE_JENIS_CB, 2], ["RONDE_JODOH_CB", D.RONDE_JODOH_CB, 3], ["RONDE_MEMORI_CB", D.RONDE_MEMORI_CB, 4]]) {
  tiga(nama, daftar);
  daftar.forEach((ro, r) => {
    const jenis = ro.map((s) => D.jenisSudut(s.deg));
    cek(`${nama} ronde ${r + 1}: ${ukuran} benda sah, id unik${nama === "RONDE_JENIS_CB" ? "" : ", jenis sudut berbeda"}`, ro.length === ukuran && ro.every(sahBenda) && unik(ro.map(D.idSudut)) && (nama === "RONDE_JENIS_CB" || unik(jenis)), JSON.stringify(ro));
  });
}
D.RONDE_JENIS_CB.flat().forEach((s) => cek(`RONDE_JENIS_CB ${D.idSudut(s)}: opsi tiga berbeda menunjuk jenis ${D.jenisSudut(s.deg)}`, (() => { const o = D.opsiJenisSudut(D.jenisSudut(s.deg), 0); return new Set(o.opsi).size === 3 && o.opsi[o.jawab] === D.labelSudut(D.jenisSudut(s.deg)); })()));
cek("RONDE_JENIS_CB: ada lancip, siku-siku, dan tumpul", ["lancip", "siku-siku", "tumpul"].every((j) => D.RONDE_JENIS_CB.flat().some((s) => D.jenisSudut(s.deg) === j)));
D.RONDE_MEMORI_CB.forEach((ro, r) => cek(`RONDE_MEMORI_CB ronde ${r + 1}: jenis lancip, siku-siku, tumpul, dan lurus`, ["lancip", "siku-siku", "tumpul", "lurus"].every((j) => ro.some((s) => D.jenisSudut(s.deg) === j))));
tiga("RONDE_SEMUA_CB", D.RONDE_SEMUA_CB);
D.RONDE_SEMUA_CB.forEach((ro, r) => {
  const benar = ro.item.filter((s) => D.jenisSudut(s.deg) === ro.jenis).length;
  cek(`RONDE_SEMUA_CB ronde ${r + 1}: empat benda sah, id unik, 1 sampai 3 cocok, jenis lancip/siku-siku/tumpul`, ro.item.length === 4 && ro.item.every(sahBenda) && unik(ro.item.map(D.idSudut)) && benar >= 1 && benar <= 3 && ["lancip", "siku-siku", "tumpul"].includes(ro.jenis), `${benar}`);
});
const SIKU_NYATA = { buku: 4, bingkai: 4, tv: 4, segitiga: 1, rambu: 0, jam: 0 };
for (const [id, b] of Object.entries(D.BENDA_SIKU)) cek(`BENDA_SIKU ${id}: emoji, nama, banyak sudut siku-siku benar`, b.id === id && !!b.emoji && !!b.nama && b.siku === SIKU_NYATA[id]);
cek("BENDA_SIKU: nama unik", unik(Object.values(D.BENDA_SIKU).map((b) => b.nama)));
tiga("RONDE_SIKUBENDA_CB", D.RONDE_SIKUBENDA_CB);
D.RONDE_SIKUBENDA_CB.forEach((ro, r) => cek(`RONDE_SIKUBENDA_CB ronde ${r + 1}: dua benda berbeda yang terdaftar`, ro.length === 2 && unik(ro) && ro.every((id) => !!D.BENDA_SIKU[id])));
for (let r = 0; r < 3; r += 1) for (let i = 0; i < 2; i += 1) {
  const n = D.BENDA_SIKU[D.RONDE_SIKUBENDA_CB[r][i]].siku;
  const o = D.opsiAngka(n, r * 2 + i);
  cek(`opsiAngka(${n}) pada CB8: tiga berbeda memuat kunci, tidak negatif`, new Set(o).size === 3 && o.includes(n) && o.every((v) => v >= 0), JSON.stringify(o));
}
tiga("RONDE_URUT_CB", D.RONDE_URUT_CB);
D.RONDE_URUT_CB.forEach((ro, r) => cek(`RONDE_URUT_CB ronde ${r + 1}: tiga bukaan berbeda, benda sah`, BENDA_SUDUT.includes(ro.benda) && ro.degs.length === 3 && unik(ro.degs) && ro.degs.every((d) => sahBenda({ benda: ro.benda, deg: d })) && (ro.dari === "kecil" || ro.dari === "besar")));
cek("RONDE_URUT_CB: ada dari kecil dan dari besar", D.RONDE_URUT_CB.some((x) => x.dari === "kecil") && D.RONDE_URUT_CB.some((x) => x.dari === "besar"));
tiga("RONDE_IRISAN_CB", D.RONDE_IRISAN_CB);
D.RONDE_IRISAN_CB.forEach((ro, r) => {
  cek(`RONDE_IRISAN_CB ronde ${r + 1}: dua soal pada sudut yang sama dengan satuan berbeda, habis dibagi, 2 sampai 9 irisan`, ro.length === 2 && ro[0].deg === ro[1].deg && ro[0].satuan !== ro[1].satuan && ro.every((s) => s.deg % s.satuan === 0 && D.banyakIrisan(s) >= 2 && D.banyakIrisan(s) <= 9 && s.deg <= 135), JSON.stringify(ro));
  cek(`RONDE_IRISAN_CB ronde ${r + 1}: satuan lebih kecil memberi irisan lebih banyak`, D.banyakIrisan(ro[0]) < D.banyakIrisan(ro[1]));
  for (let i = 0; i < 2; i += 1) {
    const n = D.banyakIrisan(ro[i]);
    const o = D.opsiAngka(n, r * 2 + i);
    cek(`opsiAngka(${n}) pada CB10: tiga berbeda memuat kunci`, new Set(o).size === 3 && o.includes(n));
  }
});
cek("RONDE_IRISAN_CB: sudut 90 dengan 3 dan 6 irisan (seperti buku)", D.banyakIrisan({ deg: 90, satuan: 30 }) === 3 && D.banyakIrisan({ deg: 90, satuan: 15 }) === 6 && D.RONDE_IRISAN_CB[0][0].deg === 90);

/* ---- Picture B ---- */
tiga("RONDE_BUSUR_PB", D.RONDE_BUSUR_PB);
D.RONDE_BUSUR_PB.forEach((ro, r) => cek(`RONDE_BUSUR_PB ronde ${r + 1}: dua soal kelipatan 5 antara 10 dan 170, bukan 90`, ro.length === 2 && ro.every((s) => s.deg % 5 === 0 && s.deg >= 10 && s.deg <= 170 && s.deg !== 90)));
cek("RONDE_BUSUR_PB: ada kaki OA di kanan dan di kiri", D.RONDE_BUSUR_PB.flat().some((s) => s.kiri) && D.RONDE_BUSUR_PB.flat().some((s) => !s.kiri));
tiga("RONDE_JENIS_PB", D.RONDE_JENIS_PB);
D.RONDE_JENIS_PB.forEach((ro, r) => cek(`RONDE_JENIS_PB ronde ${r + 1}: dua sudut sah dengan jenis berbeda`, ro.length === 2 && ro.every((d) => d > 0 && d < 360) && unik(ro.map(D.jenisSudut))));
cek("RONDE_JENIS_PB: semua lima jenis muncul", D.URUT_SUDUT.every((j) => D.RONDE_JENIS_PB.flat().some((d) => D.jenisSudut(d) === j)));
for (const [nama, daftar, ukuran] of [["RONDE_JODOH_PB", D.RONDE_JODOH_PB, 3], ["RONDE_MEMORI_PB", D.RONDE_MEMORI_PB, 4]]) {
  tiga(nama, daftar);
  daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: ${ukuran} sudut sah dengan jenis berbeda`, ro.length === ukuran && ro.every((d) => d > 0 && d < 360) && unik(ro.map(D.jenisSudut)) && unik(ro), JSON.stringify(ro)));
}
tiga("RONDE_TABEL_PB", D.RONDE_TABEL_PB);
D.RONDE_TABEL_PB.forEach((t, r) => {
  const jawab = t.baris.map((b) => b.jawab);
  cek(`RONDE_TABEL_PB ronde ${r + 1}: empat baris unik, jawaban sesuai ukuran`, t.baris.length === 4 && unik(t.baris.map((b) => b.label)) && t.baris.every((b) => b.jawab === D.labelSudut(D.jenisSudut(parseInt(b.label, 10)))), JSON.stringify(t.baris));
  cek(`RONDE_TABEL_PB ronde ${r + 1}: lima kartu unik, semua jawaban ada, satu pengecoh`, t.kartu.length === 5 && unik(t.kartu) && unik(jawab) && jawab.every((j) => t.kartu.includes(j)) && t.kartu.filter((k) => !jawab.includes(k)).length === 1);
});
tiga("RONDE_SEMUA_PB", D.RONDE_SEMUA_PB);
D.RONDE_SEMUA_PB.forEach((ro, r) => {
  const benar = ro.degs.filter((d) => D.jenisSudut(d) === ro.jenis).length;
  cek(`RONDE_SEMUA_PB ronde ${r + 1}: empat sudut sah, 1 sampai 3 cocok`, ro.degs.length === 4 && ro.degs.every((d) => d > 0 && d < 360) && benar >= 1 && benar <= 3 && ["lancip", "siku-siku", "tumpul"].includes(ro.jenis), `${benar}`);
});
tiga("RONDE_PILAH_PB", D.RONDE_PILAH_PB);
D.RONDE_PILAH_PB.forEach((ro, r) => {
  const hitung = (j) => ro.filter((d) => D.jenisSudut(d) === j).length;
  cek(`RONDE_PILAH_PB ronde ${r + 1}: enam sudut berbeda, hanya lancip, siku-siku, tumpul, tiap kotak terisi`, ro.length === 6 && unik(ro) && ro.every((d) => ["lancip", "siku-siku", "tumpul"].includes(D.jenisSudut(d))) && hitung("lancip") >= 1 && hitung("siku-siku") >= 1 && hitung("tumpul") >= 1, JSON.stringify(ro));
});
tiga("RONDE_URUT_PB", D.RONDE_URUT_PB);
D.RONDE_URUT_PB.forEach((ro, r) => cek(`RONDE_URUT_PB ronde ${r + 1}: tiga sudut berbeda`, ro.degs.length === 3 && unik(ro.degs) && ro.degs.every((d) => d > 0 && d < 180) && (ro.dari === "kecil" || ro.dari === "besar")));
cek("RONDE_URUT_PB: ada dari kecil dan dari besar", D.RONDE_URUT_PB.some((x) => x.dari === "kecil") && D.RONDE_URUT_PB.some((x) => x.dari === "besar"));
tiga("RONDE_NAMA_PB", D.RONDE_NAMA_PB);
D.RONDE_NAMA_PB.forEach((ro, r) => ro.forEach((s, i) => {
  const o = D.opsiNamaSudut(s, r * 2 + i);
  const [a, v, b] = s.huruf;
  const kunci = s.tanya === "titik" ? v : s.tanya === "nama" ? `∠${a}${v}${b}` : `${v}${a} dan ${v}${b}`;
  cek(`RONDE_NAMA_PB ${r + 1}-${i + 1}: huruf unik, tiga pilihan berbeda, kunci ${kunci}`, s.huruf.every((h) => /^[A-Z]$/.test(h)) && unik(s.huruf) && s.deg > 0 && s.deg < 180 && new Set(o.opsi).size === 3 && o.opsi[o.jawab] === kunci && D.pesanNamaSudut(s).includes(s.tanya === "nama" ? kunci : v));
}));
cek("RONDE_NAMA_PB: ada titik, nama, dan kaki; nama ditulis dengan titik sudut di tengah", ["titik", "nama", "kaki"].every((t) => D.RONDE_NAMA_PB.flat().some((s) => s.tanya === t)) && D.namaSudutHuruf(["A", "O", "B"]) === "∠AOB" && D.kakiSudutHuruf(["A", "O", "B"]) === "OA dan OB");
tiga("RONDE_GAMBAR_PB", D.RONDE_GAMBAR_PB);
D.RONDE_GAMBAR_PB.forEach((ro, r) => cek(`RONDE_GAMBAR_PB ronde ${r + 1}: dua sudut kelipatan 5 antara 10 dan 170`, ro.length === 2 && ro.every((d) => d % 5 === 0 && d >= 10 && d <= 170) && unik(ro)));

/* ---- Abstract B ---- */
for (const [nama, daftar] of [["RONDE_NAMA_QB", D.RONDE_NAMA_QB], ["RONDE_JENIS_QB", D.RONDE_JENIS_QB]]) {
  tiga(nama, daftar);
  daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: dua soal dengan tiga pilihan berbeda`, ro.length === 2 && ro.every(sahTeks)));
  for (let r = 0; r < 3; r += 1) for (let i = 0; i < 2; i += 1) {
    const o = D.susunOpsi(daftar[r][i].benar, daftar[r][i].salah, r * 2 + i);
    cek(`${nama} ${r}-${i}: susunOpsi menunjuk kunci`, o.opsi[o.jawab] === daftar[r][i].benar && new Set(o.opsi).size === 3);
  }
}
const NAMA_BENAR_B = {
  "Titik tempat dua kaki sudut bertemu disebut ...": "titik sudut",
  "Sinar OA dan sinar OB pada ∠AOB disebut ...": "kaki sudut",
  "Alat untuk mengukur sudut disebut ...": "busur derajat",
  "Satuan ukuran sudut adalah ...": "derajat",
  "Sudut yang ukurannya tepat 90° disebut sudut ...": "siku-siku",
  "Sudut yang ukurannya tepat 180° disebut sudut ...": "lurus",
};
cek("RONDE_NAMA_QB: kunci benar menurut uraian", D.RONDE_NAMA_QB.flat().every((s) => NAMA_BENAR_B[s.tanya] === s.benar));
D.RONDE_JENIS_QB.flat().forEach((s) => {
  const d = parseInt(s.tanya.match(/Sudut (\d+)°/)[1], 10);
  cek(`RONDE_JENIS_QB "${s.tanya}": kunci ${s.benar} sesuai ukuran, pengecoh tidak, pesan menyebut ukuran`, s.benar === D.namaSudut(jenisManual(d)) && s.salah.every((x) => x !== s.benar) && s.pesan.includes(`${d}°`));
});
cek("RONDE_JENIS_QB: semua lima jenis muncul", D.URUT_SUDUT.every((j) => D.DEG_JENIS_QB.flat().some((d) => jenisManual(d) === j)));
tiga("RONDE_KALIMAT_QB", D.RONDE_KALIMAT_QB);
D.RONDE_KALIMAT_QB.forEach((ro, r) => cek(`RONDE_KALIMAT_QB ronde ${r + 1}: tiga kalimat, tiga pilihan berbeda, kunci sah`, ro.length === 3 && ro.every((k) => k.opsi.length === 3 && unik(k.opsi) && k.benar >= 0 && k.benar < 3 && !!k.depan)));
const KALIMAT_BENAR = [
  "Sudut terbentuk ketika dua garis berpotongan pada satu titik.",
  "Titik O pada ∠AOB disebut titik sudut.",
  "Simbol ∠ menunjukkan sudut.",
  "Sudut siku-siku ukurannya tepat 90°.",
  "Sudut lancip ukurannya kurang dari 90°.",
  "Sudut lurus ukurannya tepat 180°.",
  "Sudut tumpul ukurannya lebih dari 90° dan kurang dari 180°.",
  "Sudut refleks ukurannya lebih dari 180° dan kurang dari 360°.",
  "Satu putaran penuh sama dengan 360°.",
];
cek("RONDE_KALIMAT_QB: kalimat lengkap yang terbentuk benar", D.RONDE_KALIMAT_QB.flat().map((k) => `${k.depan} ${k.opsi[k.benar]}${k.belakang === "." ? "." : ` ${k.belakang}`}`).join("|") === KALIMAT_BENAR.join("|"), D.RONDE_KALIMAT_QB.flat().map((k) => `${k.depan} ${k.opsi[k.benar]}${k.belakang}`).join("|"));
tiga("RONDE_JODOH_QB", D.RONDE_JODOH_QB);
D.RONDE_JODOH_QB.forEach((ro, r) => cek(`RONDE_JODOH_QB ronde ${r + 1}: tiga pasangan benar, kiri dan kanan unik`, ro.length === 3 && ro.every((p) => D.labelSudut(jenisManual(parseInt(p.kiri, 10))) === p.kanan) && unik(ro.map((p) => p.kiri)) && unik(ro.map((p) => p.kanan)), JSON.stringify(ro)));
tiga("RONDE_MEMORI_QB", D.RONDE_MEMORI_QB);
D.RONDE_MEMORI_QB.forEach((ro, r) => cek(`RONDE_MEMORI_QB ronde ${r + 1}: empat pasangan benar, kartu unik`, ro.length === 4 && ro.every((p) => D.labelSudut(jenisManual(parseInt(p.a, 10))) === p.b) && unik([...ro.map((p) => p.a), ...ro.map((p) => p.b)]), JSON.stringify(ro)));
cek("RONDE_BENARSALAH_QB: dua ronde, lima pernyataan, kunci sesuai isi", D.RONDE_BENARSALAH_QB.length === 2 && D.RONDE_BENARSALAH_QB.every((ro) => ro.length === 5 && ro.some((p) => p.benar) && ro.some((p) => !p.benar) && ro.every((p) => p.penjelasan.length > 20)) && JSON.stringify(D.RONDE_BENARSALAH_QB.map((ro) => ro.map((p) => p.benar))) === JSON.stringify([[true, false, true, false, true], [true, false, true, false, true]]));
const KLUE_B = [(n) => n === 90, (n) => n === 90 * 2, (n) => n > 90 && n < 180 && n % 60 === 0, (n) => n > 180 && n < 360 && n + 60 === 360];
cek("RONDE_DETEKTIF_QB: empat soal", D.RONDE_DETEKTIF_QB.length === 4);
D.RONDE_DETEKTIF_QB.forEach((s, i) => {
  const cocok = s.opsi.filter(KLUE_B[i]);
  cek(`RONDE_DETEKTIF_QB ${i + 1}: dua petunjuk, tiga pilihan berbeda, tepat satu cocok yaitu kunci`, s.klue.length === 2 && unik(s.opsi) && s.opsi.length === 3 && cocok.length === 1 && cocok[0] === s.jawab, JSON.stringify(cocok));
});
cek("PETA_KONSEP_QB: dua peta, empat kotak, tiga pilihan berbeda", D.PETA_KONSEP_QB.length === 2 && D.PETA_KONSEP_QB.every((p) => !!p.pusat && p.kotak.length === 4 && p.kotak.every((k) => k.opsi.length === 3 && unik(k.opsi) && k.benar >= 0 && k.benar < 3 && !!k.label)));
const KUNCI_CERITA_B = [[180, 60], [230, 90], [130, 360]];
const HITUNG_CERITA_B = [[90 + 90, 360 - 300], [360 - 130, 180 / 2], [180 - 50, 360]];
tiga("RONDE_CERITA_QB", D.RONDE_CERITA_QB);
D.RONDE_CERITA_QB.forEach((ro, r) =>
  ro.forEach((c, i) => {
    const o = D.opsiCeritaSudut(c, r * 2 + i);
    cek(`RONDE_CERITA_QB ${r + 1}-${i + 1}: kunci ${c.jawab}° sesuai hitungan, tiga pilihan berbeda`, c.jawab === KUNCI_CERITA_B[r][i] && c.jawab === HITUNG_CERITA_B[r][i] && c.pesan.includes(`${c.jawab}°`) && new Set(o.opsi).size === 3 && o.opsi[o.jawab] === `${c.jawab}°`, JSON.stringify(o));
  }),
);
cek("RONDE_SUSUNKATA_QB: empat kalimat, kata unik, pengecoh bukan bagian kalimat", D.RONDE_SUSUNKATA_QB.length === 4 && D.RONDE_SUSUNKATA_QB.every((s) => s.kata.length >= 6 && unik(s.kata.map((k) => k.toLowerCase())) && !s.kata.map((k) => k.toLowerCase()).includes(s.pengecoh)));

/* ====================================================================== */
/* Sub-Bab C: Garis tegak lurus, garis sejajar, dan bangun datar sederhana   */
/* ====================================================================== */

/* ---- Pembantu geometri ---- */
const R = (id, a, b) => ({ id, a, b });
cek("hubungan: sejajar, tegak lurus, miring", D.hubungan(R("a", [0, 0], [4, 0]), R("b", [0, 2], [4, 2])) === "sejajar" && D.hubungan(R("a", [0, 0], [0, 3]), R("b", [0, 3], [4, 3])) === "tegak-lurus" && D.hubungan(R("a", [0, 0], [3, 4]), R("b", [3, 4], [5, 2])) === "miring" && D.hubungan(R("a", [0, 0], [4, 4]), R("b", [4, 0], [0, 4])) === "tegak-lurus" && D.hubungan(R("a", [0, 0], [3, 1]), R("b", [0, 4], [3, 2])) === "miring");
cek("segarisRuas", D.segarisRuas(R("a", [0, 0], [2, 2]), R("b", [3, 3], [5, 5])) && !D.segarisRuas(R("a", [0, 0], [4, 0]), R("b", [0, 2], [4, 2])));
cek("bertemu", D.bertemu(R("a", [0, 0], [4, 4]), R("b", [4, 0], [0, 4])) && D.bertemu(R("a", [1, 1], [1, 4]), R("b", [1, 4], [4, 4])) && !D.bertemu(R("a", [0, 0], [4, 0]), R("b", [0, 2], [4, 2])) && !D.bertemu(R("a", [0, 0], [1, 1]), R("b", [3, 0], [3, 5])));
cek("titikPotong", JSON.stringify(D.titikPotong(R("a", [0, 0], [4, 4]), R("b", [4, 0], [0, 4]))) === "[2,2]" && D.titikPotong(R("a", [0, 0], [4, 0]), R("b", [0, 2], [4, 2])) === null);
cek("labelHubungan", D.labelHubungan("sejajar") === "Sejajar" && D.labelHubungan("tegak-lurus") === "Tegak lurus" && D.labelHubungan("miring") === "Bukan keduanya");
for (const h of D.URUT_HUBUNGAN) for (let k = 0; k < 3; k += 1) {
  const o = D.opsiHubungan(h, k);
  cek(`opsiHubungan(${h}, ${k}) tiga berbeda menunjuk ${D.labelHubungan(h)}`, new Set(o.opsi).size === 3 && o.opsi[o.jawab] === D.labelHubungan(h));
}

/* ---- Benda bergaris ---- */
const HUBUNGAN_BENDA = { tangga: ["sejajar", "tegak-lurus", "sejajar"], pagar: ["sejajar", "tegak-lurus", "sejajar"], rumah: ["sejajar", "tegak-lurus", "miring"], jendela: ["sejajar", "tegak-lurus", "tegak-lurus"], rel: ["sejajar", "tegak-lurus", "sejajar"], tiang: ["tegak-lurus", "miring", "miring"] };
cek("BENDA_GARIS: enam benda", Object.keys(D.BENDA_GARIS).join() === Object.keys(HUBUNGAN_BENDA).join());
for (const [id, b] of Object.entries(D.BENDA_GARIS)) {
  const ids = b.ruas.map((r) => r.id);
  cek(`BENDA_GARIS ${id}: id ruas unik, koordinat dalam kotak 220 x 140, tiga pasangan berbeda yang terdaftar`, b.id === id && !!b.nama && unik(ids) && b.ruas.every((r) => [...r.a, ...r.b].every((v, i) => v >= 0 && v <= (i % 2 === 0 ? 220 : 140))) && b.pasangan.length === 3 && b.pasangan.every(([x, y]) => x !== y && ids.includes(x) && ids.includes(y)) && unik(b.pasangan.map((p) => p.join("|"))));
  b.pasangan.forEach(([x, y], p) => {
    const h = D.hubunganBG({ benda: id, p });
    const rx = D.cariRuas(id, x);
    const ry = D.cariRuas(id, y);
    cek(`BENDA_GARIS ${id} pasangan ${p + 1} (${x}, ${y}): hubungan ${HUBUNGAN_BENDA[id][p]}, tegak lurus berarti bertemu, sejajar berarti tidak segaris`, h === HUBUNGAN_BENDA[id][p] && (h !== "tegak-lurus" || D.bertemu(rx, ry)) && (h !== "sejajar" || !D.segarisRuas(rx, ry)) && (h !== "miring" || D.bertemu(rx, ry)), h);
  });
}
const sahBG = (s) => !!D.BENDA_GARIS[s.benda] && s.p >= 0 && s.p < 3;
tiga("RONDE_BENDA_CC", D.RONDE_BENDA_CC);
D.RONDE_BENDA_CC.forEach((ro, r) => cek(`RONDE_BENDA_CC ronde ${r + 1}: dua soal sah, id unik`, ro.length === 2 && ro.every(sahBG) && unik(ro.map(D.idBG))));
cek("RONDE_BENDA_CC: sejajar, tegak lurus, dan bukan keduanya semuanya muncul", D.URUT_HUBUNGAN.every((h) => D.RONDE_BENDA_CC.flat().some((s) => D.hubunganBG(s) === h)));
tiga("RONDE_SEMUA_CC", D.RONDE_SEMUA_CC);
D.RONDE_SEMUA_CC.forEach((ro, r) => {
  const benar = ro.item.filter((s) => D.hubunganBG(s) === ro.hubungan).length;
  cek(`RONDE_SEMUA_CC ronde ${r + 1}: empat benda sah, id unik, 1 sampai 3 cocok`, ro.item.length === 4 && ro.item.every(sahBG) && unik(ro.item.map(D.idBG)) && benar >= 1 && benar <= 3, `${benar}`);
});
for (const [nama, daftar, ukuran] of [["RONDE_JODOH_CC", D.RONDE_JODOH_CC, 3]]) {
  tiga(nama, daftar);
  daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: ${ukuran} benda sah, id unik, hubungan berbeda`, ro.length === ukuran && ro.every(sahBG) && unik(ro.map(D.idBG)) && unik(ro.map(D.hubunganBG)), JSON.stringify(ro)));
}
tiga("RONDE_PILAH_CC", D.RONDE_PILAH_CC);
D.RONDE_PILAH_CC.forEach((ro, r) => {
  const hitung = (h) => ro.filter((s) => D.hubunganBG(s) === h).length;
  cek(`RONDE_PILAH_CC ronde ${r + 1}: enam soal sah dan berbeda, tiap kotak terisi`, ro.length === 6 && ro.every(sahBG) && unik(ro.map(D.idBG)) && D.URUT_HUBUNGAN.every((h) => hitung(h) >= 1), JSON.stringify(ro.map(D.hubunganBG)));
});
const KUNCI_SEJAJAR = [[3, 2], [1, 2], [1, 1]];
const KUNCI_TEGAK = [[3, 3], [2, 2], [3, 1]];
for (const [nama, daftar, fungsi, kunci] of [["RONDE_SEJAJARDENGAN_CC", D.RONDE_SEJAJARDENGAN_CC, D.hitungSejajar, KUNCI_SEJAJAR], ["RONDE_TEGAKLURUS_CC", D.RONDE_TEGAKLURUS_CC, D.hitungTegakLurus, KUNCI_TEGAK]]) {
  tiga(nama, daftar);
  daftar.forEach((ro, r) =>
    ro.forEach((s, i) => {
      const ids = D.BENDA_GARIS[s.benda].ruas.map((x) => x.id);
      const n = fungsi(s);
      const o = D.opsiAngka(n, r * 2 + i);
      cek(`${nama} ${r + 1}-${i + 1}: ${s.benda} merah ${s.merah}, kunci ${kunci[r][i]}, tiga pilihan berbeda`, ids.includes(s.merah) && s.lain.length >= 2 && s.lain.every((x) => ids.includes(x) && x !== s.merah) && unik(s.lain) && n === kunci[r][i] && new Set(o).size === 3 && o.includes(n) && o.every((v) => v >= 0), JSON.stringify(o));
    }),
  );
}
/* ---- Kertas lipat ---- */
cek("LIPATAN: delapan lipatan berwarna dengan koordinat dalam kertas 4 x 4", Object.keys(D.LIPATAN).length === 8 && Object.values(D.LIPATAN).every((l) => !!l.warna && [...l.a, ...l.b].every((v) => v >= 0 && v <= 4)));
const HUBUNGAN_LIPAT = { "h|v": "tegak-lurus", "v1|v2": "sejajar", "d1|d2": "tegak-lurus", "h1|h2": "sejajar", "d1|h": "miring", "v|h2": "tegak-lurus", "d1|v": "miring", "h|v1": "tegak-lurus", "d2|v": "miring" };
for (const [kunci, h] of Object.entries(HUBUNGAN_LIPAT)) { const [x, y] = kunci.split("|"); cek(`hubunganLipatan(${x}, ${y}) = ${h}`, D.hubunganLipatan(x, y) === h); }
tiga("RONDE_LIPATAN_CC", D.RONDE_LIPATAN_CC);
D.RONDE_LIPATAN_CC.forEach((ro, r) => cek(`RONDE_LIPATAN_CC ronde ${r + 1}: dua pasang lipatan terdaftar`, ro.length === 2 && ro.every(([x, y]) => !!D.LIPATAN[x] && !!D.LIPATAN[y] && x !== y)));
cek("RONDE_LIPATAN_CC: ketiga hubungan muncul", D.URUT_HUBUNGAN.every((h) => D.RONDE_LIPATAN_CC.flat().some(([x, y]) => D.hubunganLipatan(x, y) === h)));
tiga("RONDE_JODOHLIPAT_CC", D.RONDE_JODOHLIPAT_CC);
D.RONDE_JODOHLIPAT_CC.forEach((ro, r) => cek(`RONDE_JODOHLIPAT_CC ronde ${r + 1}: tiga pasang lipatan dengan hubungan berbeda`, ro.length === 3 && ro.every(([x, y]) => !!D.LIPATAN[x] && !!D.LIPATAN[y]) && unik(ro.map(([x, y]) => D.hubunganLipatan(x, y)))));
tiga("RONDE_BANGUNLIPAT_CC", D.RONDE_BANGUNLIPAT_CC);
const BANGUN_DARI_LIPAT = [["persegi", "persegi panjang"], ["persegi panjang", "persegi"], ["persegi", "persegi panjang"]];
D.RONDE_BANGUNLIPAT_CC.forEach((ro, r) => ro.forEach((s, i) => cek(`RONDE_BANGUNLIPAT_CC ${r + 1}-${i + 1}: lipatan di dalam kertas, bangun tengah ${BANGUN_DARI_LIPAT[r][i]}`, s.v[0] >= 1 && s.v[1] <= s.w - 1 && s.v[0] < s.v[1] && s.hh[0] >= 1 && s.hh[1] <= s.h - 1 && s.hh[0] < s.hh[1] && s.w <= 6 && s.h <= 6 && D.bangunTengah(s) === BANGUN_DARI_LIPAT[r][i])));
tiga("RONDE_URUTLIPAT_CC", D.RONDE_URUTLIPAT_CC);
D.RONDE_URUTLIPAT_CC.forEach((ro, r) => cek(`RONDE_URUTLIPAT_CC ronde ${r + 1}: tiga kertas dengan banyak lipatan berbeda, lipatan terdaftar`, ro.kertas.length === 3 && unik(ro.kertas.map((k) => k.length)) && ro.kertas.every((k) => unik(k) && k.every((id) => !!D.LIPATAN[id])) && (ro.dari === "kecil" || ro.dari === "besar")));
cek("RONDE_URUTLIPAT_CC: ada dari kecil dan dari besar", D.RONDE_URUTLIPAT_CC.some((x) => x.dari === "kecil") && D.RONDE_URUTLIPAT_CC.some((x) => x.dari === "besar"));

/* ---- Picture C ---- */
const dalamPetak = (r) => [...r.a, ...r.b].every((v) => Number.isInteger(v) && v >= 0 && v <= 5);
for (const [nama, daftar, h] of [["SJ", D.SJ, "sejajar"], ["TL", D.TL, "tegak-lurus"], ["MR", D.MR, "miring"]]) {
  cek(`${nama}: enam pasangan berbeda dalam petak 5 x 5 dengan hubungan ${h}`, daftar.length === 6 && unik(daftar.map((p) => JSON.stringify(p))) && daftar.every((p) => dalamPetak(p.r1) && dalamPetak(p.r2) && D.hubunganPG(p) === h), JSON.stringify(daftar.map(D.hubunganPG)));
  cek(`${nama}: tidak segaris${h === "sejajar" ? "" : ", bertemu di satu titik"}`, daftar.every((p) => !D.segarisRuas(p.r1, p.r2) && (h === "sejajar" || D.bertemu(p.r1, p.r2))));
}
cek("SJ: setiap pasang punya panjang ruas sama (jarak dua garis sama di kedua ujung)", D.SJ.every((p) => Math.hypot(p.r1.b[0] - p.r1.a[0], p.r1.b[1] - p.r1.a[1]) === Math.hypot(p.r2.b[0] - p.r2.a[0], p.r2.b[1] - p.r2.a[1])));
tiga("RONDE_JENIS_PC", D.RONDE_JENIS_PC);
D.RONDE_JENIS_PC.forEach((ro, r) => cek(`RONDE_JENIS_PC ronde ${r + 1}: dua pasangan dengan hubungan berbeda`, ro.length === 2 && unik(ro.map(D.hubunganPG))));
cek("RONDE_JENIS_PC: ketiga hubungan muncul", D.URUT_HUBUNGAN.every((h) => D.RONDE_JENIS_PC.flat().some((p) => D.hubunganPG(p) === h)));
tiga("RONDE_JARAK_PC", D.RONDE_JARAK_PC);
D.RONDE_JARAK_PC.forEach((ro, r) =>
  cek(
    `RONDE_JARAK_PC ronde ${r + 1}: dua soal, jarak 1 sampai 4 petak, garis sejajar tepat bila kedua jarak sama`,
    ro.length === 2 && ro.every((s) => s.kiri >= 1 && s.kanan >= 1 && 1 + s.kiri <= 5 && 1 + s.kanan <= 5 && (D.hubunganPG(D.pasanganJarak(s)) === "sejajar") === (s.kiri === s.kanan)) && ro.some((s) => s.kiri === s.kanan) && ro.some((s) => s.kiri !== s.kanan),
  ),
);
for (const [nama, daftar, ukuran] of [["RONDE_JODOH_PC", D.RONDE_JODOH_PC, 3]]) {
  tiga(nama, daftar);
  daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: ${ukuran} pasangan dengan hubungan berbeda`, ro.length === ukuran && unik(ro.map(D.hubunganPG))));
}
tiga("RONDE_SEMUA_PC", D.RONDE_SEMUA_PC);
D.RONDE_SEMUA_PC.forEach((ro, r) => {
  const benar = ro.item.filter((p) => D.hubunganPG(p) === ro.hubungan).length;
  cek(`RONDE_SEMUA_PC ronde ${r + 1}: empat pasangan berbeda, 1 sampai 3 cocok`, ro.item.length === 4 && unik(ro.item.map((p) => JSON.stringify(p))) && benar >= 1 && benar <= 3, `${benar}`);
});
tiga("RONDE_PILAH_PC", D.RONDE_PILAH_PC);
D.RONDE_PILAH_PC.forEach((ro, r) => cek(`RONDE_PILAH_PC ronde ${r + 1}: enam pasangan berbeda, dua dari tiap hubungan`, ro.length === 6 && unik(ro.map((p) => JSON.stringify(p))) && D.URUT_HUBUNGAN.every((h) => ro.filter((p) => D.hubunganPG(p) === h).length === 2)));
/* bangun datar */
cek("BANGUN_SEDERHANA: lima bangun dengan sisi, sudut, dan ciri benar", Object.keys(D.BANGUN_SEDERHANA).join() === D.URUT_BANGUN.join() && D.BANGUN_SEDERHANA.segitiga.sisi === 3 && D.BANGUN_SEDERHANA.segitiga.sudut === 3 && D.BANGUN_SEDERHANA.persegi.sisi === 4 && D.BANGUN_SEDERHANA["persegi panjang"].sudut === 4 && D.BANGUN_SEDERHANA.segilima.sisi === 5 && D.BANGUN_SEDERHANA.segilima.sudut === 5 && D.BANGUN_SEDERHANA.lingkaran.sisi === 0 && D.BANGUN_SEDERHANA.lingkaran.sudut === 0);
cek("BANGUN_SEDERHANA: ciri unik, ciri sesuai sisi dan sudut", unik(Object.values(D.BANGUN_SEDERHANA).map((b) => b.ciri)) && Object.entries(D.BANGUN_SEDERHANA).every(([j, b]) => (b.sisi === 0 ? /tanpa sudut/.test(b.ciri) : b.ciri.startsWith(`${b.sisi} sisi`) && b.ciri.includes(j === "segitiga" || j === "segilima" ? `${b.sudut} sudut` : "sudut siku-siku"))));
tiga("RONDE_TABEL_PC", D.RONDE_TABEL_PC);
D.RONDE_TABEL_PC.forEach((t, r) => {
  const jawab = t.baris.map((b) => b.jawab);
  cek(`RONDE_TABEL_PC ronde ${r + 1}: empat bangun berbeda dengan ciri yang benar`, t.baris.length === 4 && unik(t.baris.map((b) => b.label)) && t.baris.every((b) => Object.values(D.BANGUN_SEDERHANA).some((x) => x.nama === b.label && x.ciri === b.jawab)), JSON.stringify(t.baris));
  cek(`RONDE_TABEL_PC ronde ${r + 1}: lima kartu unik, semua jawaban ada, satu pengecoh yang bukan ciri bangun mana pun`, t.kartu.length === 5 && unik(t.kartu) && jawab.every((j) => t.kartu.includes(j)) && t.kartu.filter((k) => !jawab.includes(k)).length === 1 && t.kartu.filter((k) => !jawab.includes(k)).every((k) => !Object.values(D.BANGUN_SEDERHANA).some((x) => x.ciri === k)));
});
tiga("RONDE_MEMORI_PC", D.RONDE_MEMORI_PC);
D.RONDE_MEMORI_PC.forEach((ro, r) => cek(`RONDE_MEMORI_PC ronde ${r + 1}: empat bangun berbeda`, ro.length === 4 && unik(ro) && ro.every((j) => !!D.BANGUN_SEDERHANA[j])));
tiga("RONDE_LAMBANG_PC", D.RONDE_LAMBANG_PC);
D.RONDE_LAMBANG_PC.forEach((ro, r) =>
  ro.forEach((s, i) => {
    const o = D.opsiLambang(s, r * 2 + i);
    const [a1, b1, a2, b2] = s.huruf;
    const titikSama = (p, q) => p[0] === q[0] && p[1] === q[1];
    const huruf = [a1, b1, a2, b2];
    const titik = [s.pasang.r1.a, s.pasang.r1.b, s.pasang.r2.a, s.pasang.r2.b];
    const hh = D.hubunganPG(s.pasang);
    const kunci = `${a1}${b1} ${hh === "sejajar" ? "//" : "⊥"} ${a2}${b2}`;
    cek(`RONDE_LAMBANG_PC ${r + 1}-${i + 1}: huruf mengikuti titik, ${kunci}, tiga pilihan berbeda, bukan miring`, hh !== "miring" && huruf.every((x) => /^[A-Z]$/.test(x)) && titik.every((t, x) => titik.every((u, y) => titikSama(t, u) === (huruf[x] === huruf[y]))) && D.lambangPasangan(s) === kunci && new Set(o.opsi).size === 3 && o.opsi[o.jawab] === kunci, JSON.stringify(o));
  }),
);
cek("lambangPasangan menolak pasangan miring", (() => { try { D.lambangPasangan({ pasang: D.MR[0], huruf: ["A", "B", "B", "C"] }); return false; } catch { return true; } })());
tiga("RONDE_SIFAT_PC", D.RONDE_SIFAT_PC);
D.RONDE_SIFAT_PC.forEach((ro, r) => ro.forEach((j, i) => {
  const o = D.opsiCiri(j, r * 2 + i);
  cek(`RONDE_SIFAT_PC ${r + 1}-${i + 1}: ${j}, tiga ciri berbeda dengan kunci ${D.BANGUN_SEDERHANA[j].ciri}`, !!D.BANGUN_SEDERHANA[j] && new Set(o.opsi).size === 3 && o.opsi[o.jawab] === D.BANGUN_SEDERHANA[j].ciri);
}));
cek("RONDE_SIFAT_PC: kelima bangun muncul", D.URUT_BANGUN.every((j) => D.RONDE_SIFAT_PC.flat().includes(j)));
tiga("RONDE_CALON_PC", D.RONDE_CALON_PC);
D.RONDE_CALON_PC.forEach((s, r) => {
  const h = s.kandidat.map((k) => D.hubungan(k, s.dasar));
  const tegak = s.kandidat.filter((k) => D.hubungan(k, s.dasar) === "tegak-lurus" && D.bertemu(k, s.dasar)).length;
  cek(`RONDE_CALON_PC ronde ${r + 1}: tiga kandidat, tepat satu sejajar, satu tegak lurus yang bertemu garis dasar, satu miring, dalam petak`, s.kandidat.length === 3 && h.filter((x) => x === "sejajar").length === 1 && tegak === 1 && h.filter((x) => x === "miring").length === 1 && [s.dasar, ...s.kandidat].every(dalamPetak) && s.tanya.length === 2 && unik(s.tanya), JSON.stringify(h));
});

/* ---- Abstract C ---- */
for (const [nama, daftar] of [["RONDE_ISTILAH_QC", D.RONDE_ISTILAH_QC], ["RONDE_LAMBANG_QC", D.RONDE_LAMBANG_QC]]) {
  tiga(nama, daftar);
  daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: dua soal dengan tiga pilihan berbeda`, ro.length === 2 && ro.every(sahTeks)));
  for (let r = 0; r < 3; r += 1) for (let i = 0; i < 2; i += 1) {
    const o = D.susunOpsi(daftar[r][i].benar, daftar[r][i].salah, r * 2 + i);
    cek(`${nama} ${r}-${i}: susunOpsi menunjuk kunci`, o.opsi[o.jawab] === daftar[r][i].benar && new Set(o.opsi).size === 3);
  }
}
const ISTILAH_BENAR = {
  "Dua garis yang bertemu dan membentuk sudut siku-siku disebut garis ...": "tegak lurus",
  "Dua garis yang ditarik pada jarak yang sama dan tidak pernah bertemu disebut garis ...": "sejajar",
  "Lambang ⊥ dibaca ...": "tegak lurus",
  "Lambang // dibaca ...": "sejajar",
  "Garis yang tidak pernah bertemu walaupun diperpanjang disebut garis ...": "sejajar",
  "Garis yang bertemu pada sudut 90° disebut garis ...": "tegak lurus",
};
cek("RONDE_ISTILAH_QC: kunci benar menurut uraian", D.RONDE_ISTILAH_QC.flat().every((s) => ISTILAH_BENAR[s.tanya] === s.benar));
const LAMBANG_BENAR = {
  "AB ⊥ CD dibaca ...": "AB tegak lurus CD",
  "EF // GH dibaca ...": "EF sejajar GH",
  "KL tegak lurus MN ditulis ...": "KL ⊥ MN",
  "PQ sejajar RS ditulis ...": "PQ // RS",
  "XY ⊥ YZ artinya ...": "XY dan YZ bertemu membentuk sudut siku-siku",
  "AB // CD artinya ...": "AB dan CD tidak pernah bertemu",
};
cek("RONDE_LAMBANG_QC: kunci benar menurut lambang", D.RONDE_LAMBANG_QC.flat().every((s) => LAMBANG_BENAR[s.tanya] === s.benar));
tiga("RONDE_KALIMAT_QC", D.RONDE_KALIMAT_QC);
D.RONDE_KALIMAT_QC.forEach((ro, r) => cek(`RONDE_KALIMAT_QC ronde ${r + 1}: tiga kalimat, tiga pilihan berbeda, kunci sah`, ro.length === 3 && ro.every((k) => k.opsi.length === 3 && unik(k.opsi) && k.benar >= 0 && k.benar < 3 && !!k.depan)));
const KALIMAT_BENAR_C = [
  "Garis-garis tegak lurus bertemu membentuk sudut siku-siku.",
  "Garis-garis sejajar tidak pernah bertemu satu sama lain.",
  "Anak panah pada gambar garis menunjukkan garis sejajar.",
  "Segitiga memiliki tiga sisi dan tiga sudut.",
  "Persegi memiliki empat sisi yang sama panjang.",
  "Persegi panjang memiliki empat sudut siku-siku.",
  "Lingkaran dibatasi oleh garis lengkung.",
  "Lingkaran tidak memiliki sudut.",
  "Segilima memiliki lima sisi dan lima sudut.",
];
cek("RONDE_KALIMAT_QC: kalimat lengkap yang terbentuk benar", D.RONDE_KALIMAT_QC.flat().map((k) => `${k.depan} ${k.opsi[k.benar]}${k.belakang === "." ? "." : ` ${k.belakang}`}`.replace(/ \./g, ".")).join("|") === KALIMAT_BENAR_C.join("|"), D.RONDE_KALIMAT_QC.flat().map((k) => `${k.depan} ${k.opsi[k.benar]}${k.belakang === "." ? "." : ` ${k.belakang}`}`).join("|"));
tiga("RONDE_JODOH_QC", D.RONDE_JODOH_QC);
D.RONDE_JODOH_QC.forEach((ro, r) => cek(`RONDE_JODOH_QC ronde ${r + 1}: tiga pasangan benar, kiri dan kanan unik`, ro.length === 3 && ro.every((p) => { const m = p.kiri.match(/^([A-Z]{2}) (⊥|\/\/) ([A-Z]{2})$/); return !!m && p.kanan === `${m[1]} ${m[2] === "⊥" ? "tegak lurus" : "sejajar"} ${m[3]}`; }) && unik(ro.map((p) => p.kiri)) && unik(ro.map((p) => p.kanan)), JSON.stringify(ro)));
tiga("RONDE_MEMORI_QC", D.RONDE_MEMORI_QC);
D.RONDE_MEMORI_QC.forEach((ro, r) => cek(`RONDE_MEMORI_QC ronde ${r + 1}: empat pasangan, kartu unik`, ro.length === 4 && unik([...ro.map((p) => p.a), ...ro.map((p) => p.b)])));
cek("RONDE_BENARSALAH_QC: dua ronde, lima pernyataan, kunci sesuai isi", D.RONDE_BENARSALAH_QC.length === 2 && D.RONDE_BENARSALAH_QC.every((ro) => ro.length === 5 && ro.some((p) => p.benar) && ro.some((p) => !p.benar) && ro.every((p) => p.penjelasan.length > 20)) && JSON.stringify(D.RONDE_BENARSALAH_QC.map((ro) => ro.map((p) => p.benar))) === JSON.stringify([[true, false, true, false, true], [true, false, true, false, true]]));
const KLUE_C = [(n) => n === 4 && n % 2 === 0 && n < 6, (n) => n === 3 && n < 4, (n) => n === 5 && n > 4, (n) => n === 4 && n % 2 === 0];
cek("RONDE_DETEKTIF_QC: empat soal", D.RONDE_DETEKTIF_QC.length === 4);
D.RONDE_DETEKTIF_QC.forEach((s, i) => {
  const cocok = s.opsi.filter(KLUE_C[i]);
  cek(`RONDE_DETEKTIF_QC ${i + 1}: dua petunjuk, tiga pilihan berbeda, tepat satu cocok yaitu kunci`, s.klue.length === 2 && unik(s.opsi) && s.opsi.length === 3 && cocok.length === 1 && cocok[0] === s.jawab, JSON.stringify(cocok));
});
cek("PETA_KONSEP_QC: dua peta, empat kotak, tiga pilihan berbeda", D.PETA_KONSEP_QC.length === 2 && D.PETA_KONSEP_QC.every((p) => !!p.pusat && p.kotak.length === 4 && p.kotak.every((k) => k.opsi.length === 3 && unik(k.opsi) && k.benar >= 0 && k.benar < 3 && !!k.label)));
const KUNCI_CERITA_C = [[8, 3], [8, 4], [8, 6]];
const HITUNG_CERITA_C = [[4 + 4, 3], [3 + 5, 5 - 1], [4 + 4, 2 + 4]];
tiga("RONDE_CERITA_QC", D.RONDE_CERITA_QC);
D.RONDE_CERITA_QC.forEach((ro, r) =>
  ro.forEach((c, i) => {
    const o = D.opsiAngka(c.jawab, r * 2 + i);
    cek(`RONDE_CERITA_QC ${r + 1}-${i + 1}: kunci ${c.jawab} sesuai hitungan, tiga pilihan berbeda`, c.jawab === KUNCI_CERITA_C[r][i] && c.jawab === HITUNG_CERITA_C[r][i] && c.pesan.length > 15 && new Set(o).size === 3 && o.includes(c.jawab));
  }),
);
cek("RONDE_SUSUNKATA_QC: empat kalimat, kata unik, pengecoh bukan bagian kalimat", D.RONDE_SUSUNKATA_QC.length === 4 && D.RONDE_SUSUNKATA_QC.every((s) => s.kata.length >= 6 && unik(s.kata.map((k) => k.toLowerCase())) && !s.kata.map((k) => k.toLowerCase()).includes(s.pengecoh)));

/* ====================================================================== */
/* Naskah                                                                   */
/* ====================================================================== */

cek("K3B4_META", N.K3B4_META.chapterId === "k3-mat-bab4" && N.K3B4_META.phaseCode === "FASE_B" && N.K3B4_META.grade === 3 && N.K3B4_META.suaraLaju === 0.7 && N.K3B4_META.suaraNada === 1);
cek("SUB_BAB_K3B4: sub-bab A, B, dan C", N.SUB_BAB_K3B4.map((s) => s.id).join() === "A,B,C");
for (const s of N.SUB_BAB_K3B4) {
  const k = s.id;
  cek(`${k}: tiga video, tiap video tiga adegan`, s.videos.length === 3 && s.videos.every((v) => v.adegan.length === 3));
  cek(`${k}: tiap adegan empat ketukan dan empat papan`, s.videos.every((v) => v.adegan.every((a) => a.ketukan.length === 4 && a.papan.length === 4)));
  cek(`${k}: ketukan lebih dari 20 huruf`, s.videos.every((v) => v.adegan.every((a) => a.ketukan.every((t) => t.length > 20))), s.videos.flatMap((v) => v.adegan.flatMap((a) => a.ketukan.filter((t) => t.length <= 20))).join("|"));
  cek(`${k}: papan 2 sampai 39 huruf`, s.videos.every((v) => v.adegan.every((a) => a.papan.every((t) => t.length >= 2 && t.length <= 39))), s.videos.flatMap((v) => v.adegan.flatMap((a) => a.papan.filter((t) => t.length > 39 || t.length < 2))).join("|"));
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
  cek(`${k}: silabus lengkap`, s.silabus.teksSuara.length > 100 && s.silabus.cp.length > 50 && s.silabus.referensi.includes("Bab 4"));
}
cek("naskah: tidak memuat nilai tukar rupiah", !/rupiah|Rp\s?\d|\bkurs\b/i.test(JSON.stringify(N.SUB_BAB_K3B4)));
cek("semuaAdeganK3B4: 27 adegan", N.semuaAdeganK3B4.length === 27);

console.log(`\nUji data Kelas 3 Bab 4: ${lulus} lulus, ${gagal} gagal.`);
if (gagal > 0) process.exit(1);
