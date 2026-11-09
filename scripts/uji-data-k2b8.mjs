/**
 * Uji data murni Matematika Kelas 2 Bab 8 (Berbagai Diagram).
 * Jalankan: node --no-warnings scripts/uji-data-k2b8.mjs
 * Memeriksa kumpulan data (angka sama dengan buku siswa dan kunci Buku Panduan Guru), mesin kelompok lima,
 * semua ronde 30 permainan Sub-Bab A dan 30 permainan Sub-Bab B, petunjuk detektif (satu jawaban),
 * naskah video dan peta pikiran, serta berkas JSON publik (tanpa kunci jawaban, tanpa soal Latihan dan Ujian).
 */
import fs from "node:fs";
import * as D from "../src/components/modul/data-k2b8.ts";
import * as N from "../src/components/modul/naskah-k2b8.ts";

let lulus = 0;
let gagal = 0;
function cek(kondisi, pesan) {
  if (kondisi) lulus += 1;
  else {
    gagal += 1;
    console.error("GAGAL:", pesan);
  }
}
const sama = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const unik = (a) => new Set(a).size === a.length;
const tiga = (o, kunci, pesan) => cek(o.length === 3 && unik(o) && o.includes(kunci), `${pesan}: tiga pilihan berbeda dan memuat kunci (${o})`);
const kat = D.kat;
const n = (set, id) => D.banyak(set, id);

/* ---- Pembantu ---- */
for (const k of [2, 3, 4, 5, 6, 8, 10]) {
  const u = D.urutanTetap(k, 3, 0);
  cek(u.length === k && unik(u) && u.every((x) => x >= 0 && x < k), `urutanTetap(${k}) permutasi: ${u}`);
}
cek(D.Kapital("jeruk") === "Jeruk", "Kapital");
{
  const kunci = new Set();
  for (let k = 0; k < 9; k += 1) {
    const { opsi, jawab } = D.susunOpsi("benar", ["a", "b"], k);
    cek(opsi[jawab] === "benar" && unik(opsi), `susunOpsi ${k}`);
    kunci.add(jawab);
  }
  cek(kunci.size === 3, "susunOpsi: kunci di ketiga posisi");
  const pos = new Set();
  for (let k = 0; k < 9; k += 1) {
    const o = D.opsiAngka(6, k);
    tiga(o, 6, `opsiAngka(6, ${k})`);
    pos.add(o.indexOf(6));
  }
  cek(pos.size === 3, "opsiAngka: kunci di ketiga posisi");
  cek(D.opsiAngka(0, 0).every((x) => x >= 0) && D.opsiAngka(1, 0).every((x) => x >= 0), "opsiAngka: tidak negatif");
  const pe = new Set();
  for (let k = 0; k < 12; k += 1) {
    const o = D.opsiEmpat(7, k);
    cek(o.length === 4 && unik(o) && o.includes(7) && o.every((x) => x >= 0), `opsiEmpat(7, ${k}): ${o}`);
    pe.add(o.indexOf(7));
  }
  cek(pe.size === 4, "opsiEmpat: kunci di keempat posisi");
  cek([1, 2, 3, 4, 5, 8, 11, 13].every((x) => unik(D.opsiEmpat(x, 3)) && D.opsiEmpat(x, 3).every((y) => y >= 0)), "opsiEmpat: tanpa duplikat dan tanpa negatif");
}

/* ---- Kumpulan data sama dengan buku ---- */
{
  const nilai = (set) => D.DATA[set].kategori.map((k) => k.n);
  cek(sama(nilai("buah"), [2, 6, 4, 3]) && D.total("buah") === 15, "buku hlm. 229: anggur 2, jeruk 6, apel 4, pisang 3 (15 anak)");
  cek(sama(nilai("hewan"), [10, 8, 6, 11]), "buku hlm. 232: ayam 10, kambing 8, sapi 6, bebek 11");
  cek(sama(nilai("mainan"), [2, 4, 6, 7]), "buku hlm. 234 dan kunci guru: mobil 2, boneka 4, kelereng 6, balok 7");
  cek(sama(nilai("sayur"), [7, 4, 6, 3]), "buku hlm. 235 dan kunci guru: brokoli 7, bayam 4, wortel 6, jagung 3");
  cek(sama(nilai("bunga"), [7, 4, 5, 4]), "buku hlm. 240: mawar 7, lili 4, tulip 5, aster 4");
  cek(sama(nilai("parsel"), [4, 3, 6, 2]) && D.total("parsel") === 15, "buku hlm. 244 dan kunci guru: jeruk 4, apel 3, pisang 6, mangga 2 (jumlah 15)");
  cek(sama(nilai("kue"), [6, 5, 3, 7]), "buku hlm. 242: kue cucur 6, onde-onde 5, lemper 3, kue talam 7");
  cek(sama(nilai("permainan"), [4, 6, 5, 7]), "buku hlm. 243: karet 4, lompat tali 6, petak umpet 5, benteng 7");
  cek(sama(nilai("lari"), [5, 3, 4, 2]) && D.total("lari") === 14, "buku hlm. 245: 14 siswa berlari 1 sampai 4 putaran (5, 3, 4, 2)");
  cek(sama(nilai("pasar"), [3, 7, 1, 3]), "buku hlm. 246 dan kunci guru: apel 3, jeruk 7, semangka 1, alpukat 3");
  cek(sama(nilai("warna"), [7, 3, 5, 2]), "buku hlm. 247 dan kunci guru: merah 7, kuning 3, biru 5, hitam 2");
  cek(sama(nilai("kaleng"), [6, 4, 5, 3]) && sama(nilai("buahgambar"), [6, 3, 8, 4]), "buku hlm. 245 dan 248: kaleng 6, 4, 5, 3 dan buah gambar pisang 6, manggis 3, jeruk 8, stroberi 4");
  cek(D.total("kaleng") === 18 && D.DATA.kaleng.kategori.length === 4, "buku hlm. 245: 18 kaleng, empat jenis");
  cek(D.ID_DATA.length === 15, "lima belas kumpulan data");
  for (const set of D.ID_DATA) {
    const ds = D.DATA[set];
    cek(ds.kategori.length === 4 && unik(ds.kategori.map((k) => k.id)) && unik(ds.kategori.map((k) => k.nama)), `${set}: empat kategori berbeda`);
    cek(ds.kategori.every((k) => k.n >= 1 && k.n <= 11 && k.warna.startsWith("#")), `${set}: banyak 1 sampai 11, ada warna`);
    cek(ds.kalimat.includes("{n}") && ds.kalimat.includes("{nama}") && ds.kolom.length === 2 && ds.judul.length > 5, `${set}: kalimat dan kolom`);
  }
  for (const set of ["buah", "hewan", "mainan", "sayur", "bunga", "parsel", "kue", "pasar", "olahraga"]) cek(D.DATA[set].kategori.every((k) => k.ikon.length >= 1), `${set}: setiap kategori punya gambar benda`);
  cek(!JSON.stringify(D.DATA).match(/[\u{1FAA0}-\u{1FAFF}]/u), "data: tanpa emoji Unicode 13 ke atas");
  /* kalimat */
  cek(D.kalimatAda("buah", "jeruk") === "Ada 6 anak yang suka jeruk." && D.kalimatAda("hewan", "ayam") === "Ada 10 ekor ayam.", "kalimatAda");
  const kk = D.kalimatKosong("buah", "jeruk");
  cek(kk.depan === "Ada" && kk.belakang === "anak yang suka jeruk.", `kalimatKosong: ${JSON.stringify(kk)}`);
  cek(D.kalimatLebih("bebek", "ayam", 1) === "Banyak bebek 1 lebihnya dari banyak ayam." && D.kalimatKurang("ayam", "bebek", 1) === "Banyak ayam 1 kurangnya dari banyak bebek.", "kalimat lebihnya dan kurangnya (buku hlm. 232)");
  /* paling */
  cek(D.palingTunggal("buah", "banyak")?.id === "jeruk" && D.palingTunggal("buah", "sedikit")?.id === "anggur", "buah: paling banyak jeruk, paling sedikit anggur");
  cek(D.palingTunggal("hewan", "banyak")?.id === "bebek" && D.palingTunggal("hewan", "sedikit")?.id === "sapi", "hewan: paling banyak bebek (buku hlm. 232)");
  cek(D.palingTunggal("bunga", "banyak")?.id === "mawar" && D.palingTunggal("bunga", "sedikit") === null, "bunga: mawar paling banyak, paling sedikit tidak tunggal (lili dan aster sama)");
  cek(D.palingTunggal("kaleng", "banyak")?.nama === "cokelat" && D.palingTunggal("warna", "banyak")?.id === "merah", "kaleng cokelat dan warna merah paling banyak (kunci guru)");
}

/* ---- Aliran data, kelompok lima, jendela garis ---- */
{
  const a = D.aliran([["x", 3], ["y", 2], ["z", 4]], 0);
  cek(a.length === 9 && a.filter((x) => x === "x").length === 3 && a.filter((x) => x === "y").length === 2 && a.filter((x) => x === "z").length === 4, `aliran: banyak tiap jenis tepat (${a})`);
  cek(a.every((x, i) => i < 2 || !(x === a[i - 1] && x === a[i - 2])), "aliran: tidak ada tiga sama berurutan");
  cek(!sama(D.aliran([["x", 3], ["y", 2], ["z", 4]], 0), D.aliran([["x", 3], ["y", 2], ["z", 4]], 1)), "aliran: geser mengubah urutan");
  cek(D.kelompokLima(7).kelompok === 1 && D.kelompokLima(7).sisa === 2 && D.kelompokLima(10).kelompok === 2 && D.kelompokLima(10).sisa === 0, "kelompokLima");
  cek(D.teksKelompok(8) === "1 kelompok lima dan 3 garis" && D.teksKelompok(10) === "2 kelompok lima, tanpa sisa" && D.teksKelompok(3) === "3 garis, belum ada kelompok lima", "teksKelompok (buku hlm. 232: kambing 8)");
  const pos = new Set();
  for (let k = 0; k < 9; k += 1) {
    const { opsi, jawab } = D.opsiKelompok(7, k);
    cek(opsi.length === 3 && unik(opsi) && opsi[jawab] === D.teksKelompok(7), `opsiKelompok(7, ${k}): ${opsi}`);
    pos.add(jawab);
  }
  cek(pos.size === 3, "opsiKelompok: kunci di ketiga posisi");
  for (const m of [6, 7, 8, 9, 11, 12, 13]) cek(unik(D.opsiKelompok(m, 0).opsi), `opsiKelompok(${m}) tanpa duplikat`);
  let ok = true;
  for (let a1 = 0; a1 <= 14; a1 += 1) for (let b1 = Math.max(0, a1 - 6); b1 <= Math.min(14, a1 + 6); b1 += 1) for (let k = 0; k < 9; k += 1) {
    const [dari, sampai] = D.jendelaGaris(a1, b1, k);
    if (!(dari >= 0 && sampai - dari === 8 && Math.min(a1, b1) >= dari && Math.max(a1, b1) <= sampai)) ok = false;
  }
  cek(ok, "jendelaGaris: sembilan kotak, mulai dari 0, memuat dua bilangan");
  cek(D.kataAngka(10) === "sepuluh" && D.kataAngka(11) === "sebelas" && D.kataAngka(15) === "lima belas" && D.kataAngka(0) === "nol", "kataAngka");
}

/* ---- Petunjuk detektif ---- */
function cekDetektif(s, label) {
  const ds = D.DATA[s.set];
  const cocok = ds.kategori.filter((k) => s.klue.every((q) => D.cocokKlue(s.set, k.id, q))).map((k) => k.id);
  cek(sama(cocok, [s.jawab]), `${label}: hanya ${s.jawab} yang cocok di seluruh kategori (${cocok})`);
  cek(s.opsi.length === 3 && unik(s.opsi) && s.opsi.includes(s.jawab) && s.opsi.every((id) => ds.kategori.some((k) => k.id === id)), `${label}: tiga pilihan berasal dari data`);
  cek(s.opsi.filter((id) => s.klue.every((q) => D.cocokKlue(s.set, id, q))).length === 1, `${label}: satu pilihan cocok`);
  cek(s.klue.length >= 1 && s.klue.length <= 3 && s.klue.every((q) => D.teksKlue(s.set, q).length > 8), `${label}: petunjuk berteks`);
}

/* ====================================================================== */
/* SUB-BAB A                                                                */
/* ====================================================================== */

/* ---- Concrete A ---- */
{
  cek(D.RONDE_SORTIR_A.length === 3, "CA1: tiga ronde");
  for (const [i, h] of D.RONDE_SORTIR_A.entries()) {
    const tot = h.hitung.reduce((x, [, c]) => x + c, 0);
    cek(h.hitung.length === 3 && unik(h.hitung.map(([id]) => id)) && h.hitung.every(([id, c]) => kat(h.set, id) && c >= 2 && c <= 4) && tot === 8, `CA1 r${i + 1}: tiga jenis, 2 sampai 4 tiap jenis, delapan benda`);
    const a = D.aliran(h.hitung, i);
    cek(a.length === 8 && a.every((x, j) => j < 2 || !(x === a[j - 1] && x === a[j - 2])), `CA1 r${i + 1}: benda tercampur`);
  }
  cek(D.RONDE_HITUNG_A.length === 3 && D.RONDE_HITUNG_A.every((r) => r.length === 2), "CA2: tiga ronde, dua soal");
  const pos = new Set();
  let nom = 0;
  for (const r of D.RONDE_HITUNG_A) for (const s of r) {
    const v = n(s.set, s.k);
    const o = D.opsiAngka(v, nom);
    tiga(o, v, `CA2 ${s.k}`);
    cek(v >= 4 && v <= 11, `CA2 ${s.k}: ${v} benda`);
    pos.add(o.indexOf(v));
    nom += 1;
  }
  cek(pos.size === 3, "CA2: kunci di ketiga posisi");
  cek(D.RONDE_CATAT_A.length === 3, "CA3: tiga ronde");
  for (const [i, h] of D.RONDE_CATAT_A.entries()) {
    const a = D.aliran(h.hitung, i);
    cek(h.hitung.length === 3 && unik(h.hitung.map(([id]) => id)) && h.hitung.every(([id]) => kat(h.set, id)) && a.length === 9 && a.every((x, j) => j < 2 || !(x === a[j - 1] && x === a[j - 2])), `CA3 r${i + 1}: sembilan data tercampur`);
    cek(h.hitung.every(([id, c]) => a.filter((x) => x === id).length === c), `CA3 r${i + 1}: banyak tiap jenis tepat`);
  }
  cek(D.RONDE_TALLY_A.length === 3 && D.RONDE_TALLY_A.every((r) => r.length === 2 && r.every((s) => n(s.set, s.k) >= 3 && n(s.set, s.k) <= 11)), "CA4: tiga ronde, dua soal, 3 sampai 11 goresan");
  cek(D.RONDE_TALLY_A.flat().some((s) => n(s.set, s.k) > 5), "CA4: ada soal yang memuat kelompok lima");
  cek(D.RONDE_PASANG_CA.length === 3 && D.RONDE_PASANG_CA.every((h) => h.hitung.length === 3 && unik(h.hitung.map(([id]) => n(h.set, id)))), "CA5: tiga pasang berbeda banyaknya");
  cek(D.RONDE_MEMORI_CA.length === 3 && D.RONDE_MEMORI_CA.every((set) => unik(D.DATA[set].kategori.map((k) => k.n))), "CA6: empat pasang berbeda banyaknya");
  cek(D.RONDE_PALING_CA.length === 3 && D.RONDE_PALING_CA.every((set) => D.palingTunggal(set, "banyak") && D.palingTunggal(set, "sedikit")), "CA7: paling banyak dan paling sedikit tunggal");
  cek(new Set(D.RONDE_PALING_CA.map((set) => D.DATA[set].kategori.findIndex((k) => k.id === D.palingTunggal(set, "banyak").id))).size >= 2, "CA7: letak kunci berpindah");
  cek(D.RONDE_URUT_CA.length === 3 && new Set(D.RONDE_URUT_CA.map((r) => r.dari)).size === 2, "CA8: tiga ronde, dua arah");
  for (const [i, r] of D.RONDE_URUT_CA.entries()) {
    const kunci = D.urutKategori(r.set, r.ids, r.dari);
    cek(unik(r.ids.map((id) => n(r.set, id))) && !sama(D.urutTampil(r.ids, kunci, i), kunci) && sama([...D.urutTampil(r.ids, kunci, i)].sort(), [...r.ids].sort()), `CA8 r${i + 1}: banyak berbeda, urutan tampil bukan jawaban`);
  }
  cek(D.RONDE_BEDA_CA.length === 3 && D.RONDE_BEDA_CA.every((r) => r.length === 2), "CA9: tiga ronde, dua soal");
  cek(D.RONDE_BEDA_CA.flat().every((s) => n(s.set, s.a) > n(s.set, s.b) && D.hasilBeda(s) >= 1 && D.hasilBeda(s) <= 12), "CA9: a lebih banyak dari b, selisih 1 sampai 12");
  cek(D.RONDE_BEDA_CA.every((r) => unik(r.map(D.hasilBeda))), "CA9: selisih berbeda dalam satu ronde");
  cek(D.hasilBeda({ set: "hewan", a: "bebek", b: "ayam" }) === 1 && D.hasilBeda({ set: "hewan", a: "kambing", b: "sapi" }) === 2, "CA9: buku hlm. 232 (bebek 1 lebihnya dari ayam, kambing 2 lebihnya dari sapi)");
  cek(D.RONDE_SLOT_CA.length === 3 && D.RONDE_SLOT_CA.every((h) => h.hitung.length === 3 && unik(h.hitung.map(([id]) => n(h.set, id))) && h.hitung.every(([id]) => n(h.set, id) <= 7)), "CA10: tiga kategori berbeda banyaknya, paling banyak 7 gambar");
}

/* ---- Picture A ---- */
{
  cek(D.RONDE_BACA_PA.length === 3 && D.RONDE_BACA_PA.every((r) => r.length === 2 && r.every((s) => n(s.set, s.k) <= 14)), "PA1: tiga ronde, dua soal");
  cek(D.RONDE_BACA_PA.flat().some((s) => n(s.set, s.k) === 10) && D.RONDE_BACA_PA.flat().some((s) => n(s.set, s.k) === 11), "PA1: ada turus 10 dan 11 (buku hlm. 232)");
  cek(D.RONDE_ISI_PA.length === 3 && D.RONDE_ISI_PA.every((set) => unik(D.DATA[set].kategori.map((k) => k.n))), "PA2: tiga tabel, banyak berbeda tiap baris");
  cek(D.RONDE_BUAT_PA.length === 3 && D.RONDE_BUAT_PA.every((r) => r.length === 2 && r.every((x) => x >= 3 && x <= 13)), "PA3: tiga ronde, dua soal");
  cek(D.RONDE_TEPAT_PA.length === 3 && D.RONDE_TEPAT_PA.every((r) => r.length === 2), "PA4: tiga ronde, dua soal");
  const pos = new Set();
  let nom = 0;
  for (const r of D.RONDE_TEPAT_PA) for (const x of r) {
    const o = D.opsiTurus(x, nom);
    cek(o.length === 4 && unik(o) && o.includes(x), `PA4 ${x}: empat turus berbeda`);
    pos.add(o.indexOf(x));
    nom += 1;
  }
  cek(pos.size >= 3, `PA4: kunci berpindah (${[...pos]})`);
  cek(D.RONDE_PASANG_PA.length === 3 && D.RONDE_PASANG_PA.every((r) => r.length === 3 && unik(r)), "PA5: tiga ronde, tiga pasang berbeda");
  cek(D.RONDE_MEMORI_PA.length === 3 && D.RONDE_MEMORI_PA.every((r) => r.length === 4 && unik(r)), "PA6: tiga ronde, empat pasang berbeda");
  cek(D.RONDE_KELOMPOK_PA.length === 3 && D.RONDE_KELOMPOK_PA.every((r) => r.length === 2 && r.every((x) => x % 5 !== 0 && x > 5)), "PA7: tiga ronde, dua soal, bukan kelipatan lima");
  cek(D.RONDE_URUT_PA.length === 3 && new Set(D.RONDE_URUT_PA.map((r) => r.dari)).size === 2, "PA8: tiga ronde, dua arah");
  for (const [i, r] of D.RONDE_URUT_PA.entries()) {
    const kunci = D.urutAngka(r.angka, r.dari).map(String);
    cek(unik(r.angka) && !sama(D.urutTampil(r.angka.map(String), kunci, i), kunci), `PA8 r${i + 1}: urutan tampil bukan jawaban`);
  }
  for (const [i, r] of D.RONDE_SORTIR_PA.entries()) {
    const kurang = r.filter((x) => x < 5).length;
    cek(r.length === 6 && unik(r) && kurang >= 2 && 6 - kurang >= 2, `PA9 r${i + 1}: tiap kotak minimal dua (${kurang} kurang dari 5)`);
  }
  cek(D.RONDE_SORTIR_PA.length === 3, "PA9: tiga ronde");
  cek(D.RONDE_LEBIH_PA.length === 3 && D.RONDE_LEBIH_PA.every((r) => r.length === 2 && r.some((s) => s.jenis === "lebih") && r.some((s) => s.jenis === "kurang")), "PA10: tiga ronde, lebih dan kurang");
  for (const [ri, r] of D.RONDE_LEBIH_PA.entries()) for (const [i, s] of r.entries()) {
    const a = n(s.set, s.dari);
    const b = n(s.set, s.ke);
    cek(s.jenis === "lebih" ? b > a : b < a, `PA10 ${s.dari}->${s.ke}: arah ${s.jenis} sesuai data`);
    const [dari, sampai] = D.jendelaGaris(a, D.hasilLebih(s), ri * 2 + i);
    cek(dari >= 0 && a >= dari && b <= sampai && b >= dari && a <= sampai && D.tanyaLebih(s).startsWith("Banyak "), `PA10 ${s.dari}->${s.ke}: garis memuat data awal dan jawaban`);
  }
  cek(D.tanyaLebih(D.RONDE_LEBIH_PA[0][0]) === "Banyak ayam ada 10. Banyak bebek 1 lebihnya dari banyak ayam. Ketuk banyak bebek.", `PA10: kalimat buku (${D.tanyaLebih(D.RONDE_LEBIH_PA[0][0])})`);
}

/* ---- Abstract A ---- */
{
  cek(D.RONDE_PASANG_QA.length === 3 && D.RONDE_PASANG_QA.every((h) => h.hitung.length === 3 && unik(h.hitung.map(([id]) => n(h.set, id)))), "QA1: tiga pasang berbeda banyaknya");
  cek(D.RONDE_KALIMAT_QA.length === 2 && D.RONDE_KALIMAT_QA.every((r) => r.length === 3 && unik(r.map((s) => s.set + s.k))), "QA2: dua ronde, tiga kalimat");
  const pos = new Set();
  let nom = 0;
  for (const r of D.RONDE_KALIMAT_QA) for (const s of r) {
    const k = D.kalimatIsianData(s.set, s.k, nom);
    cek(k.opsi.length === 3 && unik(k.opsi) && k.opsi[k.benar] === String(n(s.set, s.k)) && k.depan.length > 0 && k.belakang.length > 3, `QA2 ${s.k}: kalimat dan kunci`);
    pos.add(k.benar);
    nom += 1;
  }
  cek(pos.size === 3, "QA2: kunci di ketiga posisi");
  cek(D.RONDE_SUSUN_QA.length === 4 && D.RONDE_SUSUN_QA.every((r) => r.kata.length >= 5 && !r.kata.map((x) => x.toLowerCase()).includes(r.pengecoh.toLowerCase())), "QA3: empat kalimat, pengecoh tidak dipakai");
  cek(D.RONDE_TABEL_QA.length === 3, "QA4: tiga tabel");
  for (const t of D.RONDE_TABEL_QA) cek(t.baris.length === 4 && unik(t.baris.map((b) => b.jawab)) && t.baris.every((b) => t.kartu.includes(b.jawab)) && unik(t.kartu) && t.kartu.length >= 5, `QA4 ${t.judul}: empat baris, kartu memuat semua jawaban dan pengecoh`);
  cek(D.RONDE_BENARSALAH_QA.length === 2 && D.RONDE_BENARSALAH_QA.every((r) => r.length === 5 && r.some((p) => p.benar) && r.some((p) => !p.benar) && r.filter((p) => p.benar).length >= 2 && r.every((p) => p.penjelasan.length > 20)), "QA5: dua ronde, lima pernyataan, bercampur");
  const bs = D.RONDE_BENARSALAH_QA.flat();
  cek(bs.find((p) => p.teks.startsWith("Ada 4 anak yang suka jeruk"))?.benar === false && bs.find((p) => p.teks.startsWith("Hewan yang paling banyak"))?.benar === true && bs.find((p) => p.teks.startsWith("Brokoli dan jagung"))?.benar === true && bs.find((p) => p.teks.startsWith("Mainan yang paling sedikit"))?.benar === false, "QA5: kunci dihitung dari data");
  cek(D.RONDE_DETEKTIF_QA.length === 4, "QA6: empat soal");
  D.RONDE_DETEKTIF_QA.forEach((s, i) => cekDetektif(s, `QA6 soal ${i + 1}`));
  cek(new Set(D.RONDE_DETEKTIF_QA.map((s) => s.opsi.indexOf(s.jawab))).size >= 2, "QA6: kunci berpindah posisi");
  cek(D.PETA_KONSEP_QA.length === 2 && D.PETA_KONSEP_QA.every((p) => p.kotak.length === 4 && p.kotak.every((k) => k.opsi.length === 3 && unik(k.opsi) && k.benar >= 0 && k.benar < 3)), "QA7: dua peta, empat kotak, tiga pilihan");
  cek(D.RONDE_URUT_QA.length === 3 && new Set(D.RONDE_URUT_QA.map((r) => r.dari)).size === 2, "QA8: tiga ronde, dua arah");
  for (const [i, r] of D.RONDE_URUT_QA.entries()) {
    const kunci = D.urutKategori(r.set, r.ids, r.dari);
    cek(unik(r.ids.map((id) => n(r.set, id))) && !sama(D.urutTampil(r.ids, kunci, i), kunci), `QA8 r${i + 1}: banyak berbeda, urutan tampil bukan jawaban`);
  }
  cek(D.RONDE_SEMUA_QA.length === 3, "QA9: tiga ronde");
  for (const [i, s] of D.RONDE_SEMUA_QA.entries()) {
    const c = D.DATA[s.set].kategori.filter((k) => D.cocokSemua(k.id, s)).length;
    cek(c >= 2 && c <= 3 && D.tanyaSemua(s).startsWith("Ketuk semua"), `QA9 r${i + 1}: ${c} dari 4 cocok`);
  }
  cek(D.RONDE_JUMLAH_QA.length === 3 && D.RONDE_JUMLAH_QA.every((r) => r.length === 2), "QA10: tiga ronde, dua soal");
  cek(D.RONDE_JUMLAH_QA.flat().every((s) => D.hasilJumlah(s) >= 5 && D.hasilJumlah(s) <= 30 && s.ids.every((id) => kat(s.set, id))), "QA10: jumlah 5 sampai 30");
  cek(D.hasilJumlah({ set: "parsel", ids: ["mangga", "pisang"] }) === 8 && D.hasilJumlah({ set: "parsel", ids: ["apel", "jeruk"] }) === 7 && D.hasilJumlah({ set: "parsel", ids: ["jeruk", "apel", "pisang", "mangga"] }) === 15, "QA10: buku hlm. 244 (8, 7, dan 15)");
  cek(D.tanyaJumlah({ set: "parsel", ids: ["apel", "jeruk"] }).includes("apel dan jeruk"), "QA10: pertanyaan menyebut dua jenis");
}

/* ====================================================================== */
/* SUB-BAB B                                                                */
/* ====================================================================== */

/* ---- Concrete B ---- */
{
  cek(D.RONDE_CATAT_B.length === 3, "CB1: tiga ronde");
  for (const [i, h] of D.RONDE_CATAT_B.entries()) {
    const a = D.aliran(h.hitung, i);
    cek(h.hitung.length === 3 && unik(h.hitung.map(([id]) => id)) && h.hitung.every(([id]) => kat(h.set, id).ikon) && a.length === 9 && a.every((x, j) => j < 2 || !(x === a[j - 1] && x === a[j - 2])), `CB1 r${i + 1}: sembilan data bergambar`);
  }
  for (const [i, h] of D.RONDE_SORTIR_B.entries()) {
    const tot = h.hitung.reduce((x, [, c]) => x + c, 0);
    cek(h.hitung.length === 3 && unik(h.hitung.map(([id]) => id)) && h.hitung.every(([id, c]) => kat(h.set, id).ikon && c >= 2 && c <= 4) && tot === 8, `CB2 r${i + 1}: tiga jenis, delapan benda`);
    const a = D.aliran(h.hitung, i + 1);
    cek(a.every((x, j) => j < 2 || !(x === a[j - 1] && x === a[j - 2])), `CB2 r${i + 1}: benda tercampur`);
  }
  cek(D.RONDE_SORTIR_B.length === 3, "CB2: tiga ronde");
  cek(D.RONDE_GAMBAR_CB.length === 3 && D.RONDE_GAMBAR_CB.every((set) => Math.max(...D.DATA[set].kategori.map((k) => k.n)) + 1 <= 9 && D.DATA[set].kategori.every((k) => k.ikon)), "CB3: tiga diagram, sel paling banyak 9");
  cek(D.RONDE_PASANG_CB.length === 3 && D.RONDE_PASANG_CB.every((h) => h.hitung.length === 3 && unik(h.hitung.map(([id]) => n(h.set, id)))), "CB4: tiga pasang berbeda banyaknya");
  cek(D.RONDE_MEMORI_CB.length === 3 && D.RONDE_MEMORI_CB.every((set) => unik(D.DATA[set].kategori.map((k) => k.n))), "CB5: empat pasang berbeda banyaknya");
  cek(D.RONDE_BACA_CB.length === 3 && D.RONDE_BACA_CB.every((r) => r.length === 2), "CB6: tiga ronde, dua soal");
  const pos = new Set();
  let nom = 0;
  for (const r of D.RONDE_BACA_CB) for (const s of r) {
    const o = D.opsiAngka(n(s.set, s.k), nom);
    tiga(o, n(s.set, s.k), `CB6 ${s.k}`);
    pos.add(o.indexOf(n(s.set, s.k)));
    nom += 1;
  }
  cek(pos.size === 3, "CB6: kunci di ketiga posisi");
  cek(D.RONDE_PALING_CB.length === 3 && D.RONDE_PALING_CB.every((set) => D.palingTunggal(set, "banyak") && D.palingTunggal(set, "sedikit")), "CB7: paling banyak dan sedikit tunggal");
  cek(D.RONDE_BEDA_CB.length === 3 && D.RONDE_BEDA_CB.every((r) => r.length === 2 && unik(r.map(D.hasilBeda))) && D.RONDE_BEDA_CB.flat().every((s) => n(s.set, s.a) > n(s.set, s.b) && D.hasilBeda(s) >= 1), "CB8: a lebih banyak dari b, selisih berbeda dalam satu ronde");
  cek(D.RONDE_URUT_CB.length === 3 && new Set(D.RONDE_URUT_CB.map((r) => r.dari)).size === 2, "CB9: tiga ronde, dua arah");
  for (const [i, r] of D.RONDE_URUT_CB.entries()) {
    const kunci = D.urutKategori(r.set, r.ids, r.dari);
    cek(unik(r.ids.map((id) => n(r.set, id))) && !sama(D.urutTampil(r.ids, kunci, i), kunci), `CB9 r${i + 1}: banyak berbeda, urutan tampil bukan jawaban`);
  }
  cek(D.RONDE_SLOT_CB.length === 3 && D.RONDE_SLOT_CB.every((h) => h.hitung.length === 3 && unik(h.hitung.map(([id]) => n(h.set, id))) && h.hitung.every(([id]) => n(h.set, id) <= 7)), "CB10: tiga kategori berbeda banyaknya");
}

/* ---- Picture B ---- */
{
  cek(D.RONDE_BACA_PB.length === 3 && D.RONDE_BACA_PB.every((r) => r.length === 2 && r.every((x) => x >= 3 && x <= 12)), "PB1: tiga ronde, dua soal");
  cek(D.LAMBANG_SEMUA.length === 4 && unik(D.LAMBANG_SEMUA) && D.LAMBANG_SEMUA.every((j) => D.NAMA_LAMBANG[j]), "empat lambang polos");
  cek(D.RONDE_GAMBAR_PB.length === 3 && D.RONDE_GAMBAR_PB.every((set) => Math.max(...D.DATA[set].kategori.map((k) => k.n)) + 1 <= 9), "PB2: tiga tabel, sel paling banyak 9");
  cek(D.RONDE_TEPAT_PB.length === 3 && D.RONDE_TEPAT_PB.every((r) => r.length === 2), "PB3: tiga ronde, dua soal");
  const pos = new Set();
  let nom = 0;
  for (const r of D.RONDE_TEPAT_PB) for (const x of r) {
    const o = D.opsiTurus(x, nom);
    cek(o.length === 4 && unik(o) && o.includes(x), `PB3 ${x}: empat baris berbeda`);
    pos.add(o.indexOf(x));
    nom += 1;
  }
  cek(pos.size >= 3, `PB3: kunci berpindah (${[...pos]})`);
  cek(D.RONDE_PASANG_PB.length === 3 && D.RONDE_PASANG_PB.every((r) => r.length === 3 && unik(r)), "PB4: tiga ronde, tiga pasang berbeda");
  cek(D.RONDE_MEMORI_PB.length === 3 && D.RONDE_MEMORI_PB.every((r) => r.length === 4 && unik(r)), "PB5: tiga ronde, empat pasang berbeda");
  cek(D.RONDE_URUT_PB.length === 3 && new Set(D.RONDE_URUT_PB.map((r) => r.dari)).size === 2, "PB6: tiga ronde, dua arah");
  for (const [i, r] of D.RONDE_URUT_PB.entries()) {
    const kunci = D.urutAngka(r.angka, r.dari).map(String);
    cek(unik(r.angka) && !sama(D.urutTampil(r.angka.map(String), kunci, i), kunci), `PB6 r${i + 1}: urutan tampil bukan jawaban`);
  }
  cek(D.RONDE_BACA_PB7.length === 3 && D.RONDE_BACA_PB7.every((r) => r.length === 2 && r.every((s) => s.set === r[0].set)), "PB7: tiga ronde, dua soal, satu diagram per ronde");
  const pp = new Set();
  nom = 0;
  for (const r of D.RONDE_BACA_PB7) for (const s of r) {
    const q = D.soalBacaDiagram(s, nom);
    cek(q.opsi.length === 3 && unik(q.opsi) && q.opsi[q.jawab] !== undefined && q.tanya.length > 10 && q.pesan.length > 8, `PB7 ${s.set} ${s.tanya}: tiga pilihan, kunci ada`);
    pp.add(q.jawab);
    nom += 1;
  }
  cek(pp.size === 3, "PB7: kunci di ketiga posisi");
  const q1 = D.soalBacaDiagram({ set: "warna", tanya: "banyak", id: "biru" }, 0);
  const q2 = D.soalBacaDiagram({ set: "warna", tanya: "paling" }, 0);
  const q3 = D.soalBacaDiagram({ set: "kaleng", tanya: "jumlah" }, 0);
  cek(q1.opsi[q1.jawab] === "5" && q2.opsi[q2.jawab] === "merah" && q3.opsi[q3.jawab] === "18", "PB7: warna biru 5, paling merah, jumlah kaleng 18 (buku)");
  cek(D.RONDE_ISI_PB.length === 3 && D.RONDE_ISI_PB.every((set) => D.DATA[set].kategori.length === 4), "PB8: tiga tabel");
  cek(D.RONDE_LEBIH_PB.length === 3 && D.RONDE_LEBIH_PB.every((r) => r.length === 2 && r.some((s) => s.jenis === "lebih") && r.some((s) => s.jenis === "kurang")), "PB9: tiga ronde, lebih dan kurang");
  for (const [ri, r] of D.RONDE_LEBIH_PB.entries()) for (const [i, s] of r.entries()) {
    const a = n(s.set, s.dari);
    const b = n(s.set, s.ke);
    cek(s.jenis === "lebih" ? b > a : b < a, `PB9 ${s.dari}->${s.ke}: arah ${s.jenis} sesuai data`);
    const [dari, sampai] = D.jendelaGaris(a, D.hasilLebih(s), ri * 2 + i + 1);
    cek(dari >= 0 && a >= dari && b >= dari && a <= sampai && b <= sampai, `PB9 ${s.dari}->${s.ke}: garis memuat data awal dan jawaban`);
  }
  for (const [i, r] of D.RONDE_SORTIR_PB.entries()) {
    const kurang = r.filter((x) => x < 5).length;
    cek(r.length === 6 && unik(r) && kurang >= 2 && 6 - kurang >= 2, `PB10 r${i + 1}: tiap kotak minimal dua`);
  }
  cek(D.RONDE_SORTIR_PB.length === 3, "PB10: tiga ronde");
}

/* ---- Abstract B ---- */
{
  cek(D.RONDE_PASANG_QB.length === 3 && D.RONDE_PASANG_QB.every((r) => r.length === 3 && unik(r.map(D.selisihPasang)) && r.every((s) => D.selisihPasang(s) >= 1)), "QB1: tiga pasangan, selisih berbeda dalam satu ronde");
  cek(D.RONDE_KALIMAT_QB.length === 2 && D.RONDE_KALIMAT_QB.every((r) => r.length === 3), "QB2: dua ronde, tiga kalimat");
  const pos = new Set();
  let nom = 0;
  for (const r of D.RONDE_KALIMAT_QB) for (const s of r) {
    const a = n(s.set, s.a);
    const b = n(s.set, s.b);
    cek(s.jenis === "lebih" ? a > b : a < b, `QB2 ${s.a}/${s.b}: arah ${s.jenis} sesuai data`);
    const k = D.kalimatIsianBeda(s, nom);
    cek(k.opsi.length === 3 && unik(k.opsi) && k.opsi[k.benar] === String(Math.abs(a - b)) && k.depan.startsWith("Banyak ") && /dari banyak /.test(k.belakang), `QB2 ${s.a}/${s.b}: kalimat dan kunci (${k.depan} ... ${k.belakang})`);
    pos.add(k.benar);
    nom += 1;
  }
  cek(pos.size === 3, "QB2: kunci di ketiga posisi");
  cek(D.RONDE_SUSUN_QB.length === 4 && D.RONDE_SUSUN_QB.every((r) => r.kata.length >= 5 && !r.kata.map((x) => x.toLowerCase()).includes(r.pengecoh.toLowerCase())), "QB3: empat kalimat, pengecoh tidak dipakai");
  cek(D.RONDE_GAMBAR_QB.length === 3 && D.RONDE_GAMBAR_QB.every((set) => Math.max(...D.DATA[set].kategori.map((k) => k.n)) + 1 <= 9), "QB4: tiga diagram, sel paling banyak 9");
  cek(D.RONDE_BENARSALAH_QB.length === 2 && D.RONDE_BENARSALAH_QB.every((r) => r.length === 5 && r.some((p) => p.benar) && r.some((p) => !p.benar) && r.filter((p) => p.benar).length >= 2 && r.every((p) => p.penjelasan.length > 20)), "QB5: dua ronde, lima pernyataan, bercampur");
  const bs = D.RONDE_BENARSALAH_QB.flat();
  cek(bs.find((p) => p.teks.startsWith("Bunga lili dan bunga aster"))?.benar === true && bs.find((p) => p.teks.startsWith("Warna biru paling sedikit"))?.benar === false && bs.find((p) => p.teks.startsWith("Hanya bintang"))?.benar === false, "QB5: kunci dihitung dari data");
  cek(D.RONDE_DETEKTIF_QB.length === 4, "QB6: empat soal");
  D.RONDE_DETEKTIF_QB.forEach((s, i) => cekDetektif(s, `QB6 soal ${i + 1}`));
  cek(new Set(D.RONDE_DETEKTIF_QB.map((s) => s.opsi.indexOf(s.jawab))).size >= 2, "QB6: kunci berpindah posisi");
  cek(D.PETA_KONSEP_QB.length === 2 && D.PETA_KONSEP_QB.every((p) => p.kotak.length === 4 && p.kotak.every((k) => k.opsi.length === 3 && unik(k.opsi) && k.benar >= 0 && k.benar < 3)), "QB7: dua peta, empat kotak, tiga pilihan");
  cek(D.RONDE_URUT_QB.length === 3 && new Set(D.RONDE_URUT_QB.map((r) => r.dari)).size === 2, "QB8: tiga ronde, dua arah");
  for (const [i, r] of D.RONDE_URUT_QB.entries()) {
    const kunci = D.urutKategori(r.set, r.ids, r.dari);
    cek(unik(r.ids.map((id) => n(r.set, id))) && !sama(D.urutTampil(r.ids, kunci, i), kunci), `QB8 r${i + 1}: banyak berbeda, urutan tampil bukan jawaban`);
  }
  cek(D.RONDE_SEMUA_QB.length === 3, "QB9: tiga ronde");
  for (const [i, s] of D.RONDE_SEMUA_QB.entries()) {
    const c = D.DATA[s.set].kategori.filter((k) => D.cocokSemua(k.id, s)).length;
    cek(c >= 2 && c <= 3, `QB9 r${i + 1}: ${c} dari 4 cocok`);
  }
  cek(D.RONDE_JUMLAH_QB.length === 3 && D.RONDE_JUMLAH_QB.every((r) => r.length === 2) && D.RONDE_JUMLAH_QB.flat().every((s) => D.hasilJumlah(s) >= 5 && D.hasilJumlah(s) <= 30), "QB10: tiga ronde, dua soal, jumlah 5 sampai 30");
  cek(D.hasilJumlah({ set: "lari", ids: ["p3", "p4"] }) === 6 && D.hasilJumlah({ set: "lari", ids: ["p1", "p2", "p3", "p4"] }) === 14, "QB10: buku hlm. 245 (lebih dari dua putaran 6, jumlah 14)");
}

/* ====================================================================== */
/* Naskah, video, dan JSON                                                  */
/* ====================================================================== */
const SIMBOL = /[=<>+×÷]/;
for (const s of N.SUB_BAB_K2B8) {
  const k = s.id;
  cek(s.videos.length === 3 && s.videos.every((v) => v.adegan.length === 3), `naskah ${k}: tiga video, tiap video tiga adegan`);
  cek(s.mindMaps.length === 8 && s.mindMaps.every((m, i) => m.stepNumber === i + 1 && m.stepDesc.length > 150 && m.stepTitle.startsWith(`${i + 1}.`)), `naskah ${k}: delapan langkah peta pikiran berurutan dan mendalam`);
  cek(s.infografis.length === 10 && s.infografis.every((p) => p.suara.length > 40 && p.countNum >= 2), `naskah ${k}: sepuluh panel infografis`);
  cek(s.games.length === 30, `naskah ${k}: tiga puluh permainan (ada ${s.games.length})`);
  for (const [tahap, dari] of [["Concrete", 0], ["Picture", 10], ["Abstract", 20]]) cek(s.games.slice(dari, dari + 10).every((g) => g.stage === tahap), `naskah ${k}: permainan ${dari + 1}-${dari + 10} bertahap ${tahap}`);
  cek(unik(s.games.map((g) => g.title)), `naskah ${k}: judul permainan unik`);
  for (const tahap of ["Concrete", "Picture", "Abstract"]) cek(unik(s.games.filter((g) => g.stage === tahap).map((g) => g.gameType)), `naskah ${k}: sepuluh jenis permainan berbeda di tahap ${tahap}`);
  cek(s.games.every((g) => g.bookReference.length > 8 && g.objective.length > 15 && g.mechanicDescription.length > 60 && g.voiceGuide.length > 8), `naskah ${k}: tiap permainan lengkap keterangannya`);
  cek(s.games.filter((g) => g.stage === "Concrete").every((g) => g.emoji && g.targetCount > 0) && s.games.filter((g) => g.stage === "Picture").every((g) => g.diagramType) && s.games.filter((g) => g.stage === "Abstract").every((g) => g.symbolLarge && g.wordLarge), `naskah ${k}: bidang khusus tahap ada`);
  cek(s.poin.length === 5 && s.refleksi.length === 4 && s.cara.potongan.length === 4, `naskah ${k}: lima poin, empat refleksi, empat potongan cara`);
  for (const v of s.videos) for (const a of v.adegan) {
    cek(a.ketukan.length >= 3 && a.ketukan.length <= 4 && a.ketukan.length === a.papan.length, `${a.id}: ketukan dan papan sama banyak (${a.ketukan.length}/${a.papan.length})`);
    cek(a.papan.every((p) => p.length <= 34), `${a.id}: papan tidak terlalu panjang`);
    cek(a.ketukan.every((x) => /[.!?]$/.test(x) && !SIMBOL.test(x) && !/\d/.test(x)), `${a.id}: ketukan berakhir tanda baca, tanpa lambang dan tanpa angka`);
  }
  const lisan = [s.silabus.teksSuara, s.poinSuara, s.cara.suara, s.rumah, ...s.mindMaps.map((m) => m.stepDesc), ...s.infografis.map((p) => p.suara), ...s.poin.map((p) => p.suara)];
  cek(lisan.every((x) => !SIMBOL.test(x)), `naskah ${k}: ucapan memakai kata, bukan lambang`);
  cek(![s.targetDescription, s.rumah, ...s.games.map((g) => g.mechanicDescription)].some((x) => /rupiah|Rp\s?\d|\bkurs\b/i.test(x)), `naskah ${k}: tanpa nilai tukar`);
  for (const g of s.games.filter((x) => x.stage === "Picture")) cek(!/\p{Extended_Pictographic}/u.test(`${g.title} ${g.objective} ${g.mechanicDescription} ${g.voiceGuide} ${g.diagramType}`), `naskah ${k}: Picture "${g.title}" tanpa emoji`);
  cek(!/[\u{1FAA0}-\u{1FAFF}]/u.test(JSON.stringify(s)), `naskah ${k}: tanpa emoji Unicode 13 ke atas`);
}
cek(N.K2B8_META.suaraLaju === 0.7 && N.K2B8_META.suaraNada === 1 && N.K2B8_META.chapterId === "k2-mat-bab8" && N.K2B8_META.phaseCode === "FASE_A" && N.K2B8_META.grade === 2, "naskah: meta bab 8, laju 0,70, nada 1");
cek(N.semuaAdeganK2B8.length === 18 && unik(N.semuaAdeganK2B8.map((a) => a.id)), "naskah: delapan belas adegan, id unik");

/* ---- Berkas JSON publik ---- */
{
  const f = "src/data/kelas2-bab8.json";
  cek(fs.existsSync(f), "JSON publik ada");
  if (fs.existsSync(f)) {
    const j = JSON.parse(fs.readFileSync(f, "utf8"));
    const teks = JSON.stringify(j);
    cek(j.chapter_id === "k2-mat-bab8" && j.phase_code === "FASE_A" && j.grade === 2, "JSON: chapter_id, phase_code, grade");
    cek(j.suaraLaju === 0.7 && j.suaraNada === 1 && j.suaraPerangkatSaja === true, "JSON: laju 0,70, nada 1, suara perangkat saja");
    cek(Object.keys(j.subBabs).join() === "A,B", "JSON: hanya sub-bab A dan B");
    cek(Array.isArray(j.practiceQuestions) && j.practiceQuestions.length === 0 && !("examQuestions" in j) && !("examPackages" in j), "JSON: tanpa soal Latihan dan Ujian");
    cek(!/"correct_index"|"correctAnswer"|"explanation"/.test(teks), "JSON: tanpa kunci jawaban");
    cek(!/simulasi/i.test(teks), "JSON: tanpa data simulasi");
    for (const k of ["A", "B"]) {
      const s = j.subBabs[k];
      cek(s.stories.length === 9 && s.videos.length === 3 && s.mindMaps.length === 8 && s.infografisData.length === 10, `JSON ${k}: 9 adegan, 3 video, 8 peta pikiran, 10 panel`);
      cek(s.interactiveGames.length === 30 && s.concreteSlides.length === 10 && s.pictorialSlides.length === 10 && s.abstractSlides.length === 10, `JSON ${k}: 30 permainan (10 + 10 + 10)`);
      cek(unik(s.interactiveGames.map((g) => g.gameId)), `JSON ${k}: gameId unik`);
      const sumber = N.SUB_BAB_K2B8.find((x) => x.id === k);
      cek(sama(s.videos.map((v) => v.adegan.map((a) => a.ketukan)), sumber.videos.map((v) => v.adegan.map((a) => a.ketukan))), `JSON ${k}: ketukan video sama dengan naskah`);
    }
  }
}
cek(!fs.existsSync("supabase/seed/02_kelas2_bab8_keys.sql"), "seed server tidak dibuat untuk bab tanpa soal");

console.log(`\nData Kelas 2 Bab 8: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
