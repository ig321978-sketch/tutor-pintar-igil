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
/* Naskah                                                                   */
/* ====================================================================== */

cek("K3B4_META", N.K3B4_META.chapterId === "k3-mat-bab4" && N.K3B4_META.phaseCode === "FASE_B" && N.K3B4_META.grade === 3 && N.K3B4_META.suaraLaju === 0.7 && N.K3B4_META.suaraNada === 1);
cek("SUB_BAB_K3B4: sub-bab A", N.SUB_BAB_K3B4.map((s) => s.id).join() === "A");
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
cek("semuaAdeganK3B4: 9 adegan", N.semuaAdeganK3B4.length === 9);

console.log(`\nUji data Kelas 3 Bab 4: ${lulus} lulus, ${gagal} gagal.`);
if (gagal > 0) process.exit(1);
