/**
 * Uji data murni Matematika Kelas 2 Bab 7 (Ayo Membilang sampai dengan 100).
 * Jalankan: node --no-warnings scripts/uji-data-k2b7.mjs
 * Memeriksa nama bilangan, nilai tempat, perbandingan, jendela garis bilangan, semua ronde 30 permainan Sub-Bab A dan
 * 30 permainan Sub-Bab B, naskah video dan peta pikiran, serta berkas JSON publik (tanpa kunci jawaban, tanpa soal
 * Latihan dan Ujian).
 */
import fs from "node:fs";
import * as D from "../src/components/modul/data-k2b7.ts";
import * as N from "../src/components/modul/naskah-k2b7.ts";

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
const SEMUA = Array.from({ length: 100 }, (_, i) => i + 1);

/* ---- Pembantu ---- */
for (const n of [2, 3, 4, 5, 6, 8, 10]) {
  const u = D.urutanTetap(n, 3, 0);
  cek(u.length === n && unik(u) && u.every((x) => x >= 0 && x < n), `urutanTetap(${n}) permutasi: ${u}`);
}
cek(D.Kapital("kue") === "Kue", "Kapital");
{
  const kunci = new Set();
  for (let n = 0; n < 9; n += 1) {
    const { opsi, jawab } = D.susunOpsi("benar", ["a", "b"], n);
    cek(opsi[jawab] === "benar" && unik(opsi), `susunOpsi ${n}`);
    kunci.add(jawab);
  }
  cek(kunci.size === 3, "susunOpsi: kunci di ketiga posisi");
}

/* ---- Nama bilangan, puluhan, satuan ---- */
{
  const tabel = { 1: "satu", 9: "sembilan", 10: "sepuluh", 11: "sebelas", 12: "dua belas", 15: "lima belas", 19: "sembilan belas", 20: "dua puluh", 21: "dua puluh satu", 53: "lima puluh tiga", 62: "enam puluh dua", 67: "tujuh puluh", 74: "tujuh puluh empat", 90: "sembilan puluh", 99: "sembilan puluh sembilan", 100: "seratus" };
  tabel[67] = "enam puluh tujuh";
  for (const [n, kata] of Object.entries(tabel)) cek(D.terbilang(Number(n)) === kata, `terbilang(${n}) = ${kata} (dapat ${D.terbilang(Number(n))})`);
  cek(unik(SEMUA.map(D.terbilang)), "terbilang: 100 nama bilangan berbeda");
  cek(SEMUA.every((n) => !/satu puluh|sepuluh puluh|undefined|\s\s/.test(D.terbilang(n))), "terbilang: tanpa 'satu puluh' dan tanpa kata kosong");
  cek(SEMUA.every((n) => D.susunBilangan(D.puluhan(n), D.satuan(n)) === n), "susunBilangan(puluhan, satuan) = bilangan (1 sampai 100)");
  cek(D.puluhan(53) === 5 && D.satuan(53) === 3 && D.puluhan(100) === 10 && D.satuan(100) === 0 && D.puluhan(9) === 0, "puluhan dan satuan");
  cek(D.kataPS(53) === "5 puluhan dan 3 satuan" && D.kataPS(100) === "10 puluhan dan 0 satuan", "kataPS");
  cek(D.jumlahDigit(84) === 12 && D.jumlahDigit(100) === 10, "jumlahDigit");
}

/* ---- Pilihan bilangan ---- */
{
  let semuaOk = true;
  for (const n of SEMUA) {
    const [a, b] = D.pengecohBilangan(n);
    if (!(a !== n && b !== n && a !== b && a >= 1 && b >= 1 && a <= 100 && b <= 100)) {
      semuaOk = false;
      console.error("pengecohBilangan gagal untuk", n, a, b);
    }
  }
  cek(semuaOk, "pengecohBilangan: dua pengecoh berbeda, dalam 1 sampai 100, untuk semua bilangan");
  const posisi = new Set();
  for (let nomor = 0; nomor < 9; nomor += 1) {
    const o = D.opsiBilangan(67, nomor);
    tiga(o, 67, `opsiBilangan(67, ${nomor})`);
    posisi.add(o.indexOf(67));
  }
  cek(posisi.size === 3, "opsiBilangan: kunci di ketiga posisi");
  cek(D.pengecohBilangan(67).includes(76), "pengecoh memuat angka tertukar (76)");
  for (const n of [20, 50, 70, 80, 90, 100]) tiga(D.opsiPuluhan(n, 1), n, `opsiPuluhan(${n})`);
  cek(D.opsiPuluhan(100, 0).every((x) => x >= 0 && x <= 100) && D.opsiPuluhan(100, 1).every((x) => x % 10 === 0), "opsiPuluhan: kelipatan sepuluh dalam batas");
  const kunci = new Set();
  for (let n = 0; n < 9; n += 1) {
    const o = D.opsiAngka(5, n);
    tiga(o, 5, `opsiAngka(5, ${n})`);
    kunci.add(o.indexOf(5));
  }
  cek(kunci.size === 3, "opsiAngka: kunci di ketiga posisi");
  cek(D.opsiAngka(0, 0).every((x) => x >= 0), "opsiAngka: tidak negatif");
}

/* ---- Banding ---- */
{
  let ok = true;
  for (let a = 1; a <= 100; a += 1) {
    for (let b = 1; b <= 100; b += 1) {
      const r = D.banding(a, b);
      const harus = a > b ? "lebih besar" : a < b ? "lebih kecil" : "sama dengan";
      if (r !== harus || D.banding(b, a) !== D.lawanRel(r) || D.tanda(a, b) !== (a > b ? ">" : a < b ? "<" : "=")) ok = false;
    }
  }
  cek(ok, "banding, lawanRel, tanda cocok dengan perbandingan angka untuk semua pasangan 1 sampai 100");
  cek(D.banding(65, 56) === "lebih besar" && D.banding(54, 58) === "lebih kecil" && D.banding(72, 72) === "sama dengan", "buku hlm. 212-213: 65 > 56, 54 < 58, 72 = 72");
  cek(D.kalimatBanding(65, 56) === "Bilangan 65 lebih besar dari bilangan 56." && D.kalimatBanding(54, 54) === "Bilangan 54 sama dengan bilangan 54.", "kalimatBanding");
  cek(D.lebihnya(58, 2) === 60 && D.kurangnya(75, 3) === 72, "buku hlm. 210: 2 lebihnya dari 58 adalah 60; 3 kurangnya dari 75 adalah 72");
  cek(sama(D.urutBilangan([76, 83, 57], "kecil"), [57, 76, 83]) && sama(D.urutBilangan([76, 83, 57], "besar"), [83, 76, 57]), "urutBilangan (buku hlm. 214)");
  cek(D.selisihTebakan(60, 62) === 2 && D.selisihTebakan(50, 62) === 12, "selisihTebakan (video 3, adegan 3)");
}

/* ---- Tebakan dan sebaran titik ---- */
{
  for (let n = 25; n <= 100; n += 1) {
    const t = D.tebakanPilihan(n);
    if (!(t.length === 3 && unik(t) && t.every((x) => x % 10 === 0 && x >= 10 && x <= 100) && t.every((x, i) => i === 0 || t[i - 1] < x))) cek(false, `tebakanPilihan(${n}) tiga kelipatan sepuluh berbeda dan urut: ${t}`);
    else if (Math.abs(D.tebakanTerdekat(n) - n) > 5) cek(false, `tebakanTerdekat(${n}) = ${D.tebakanTerdekat(n)} terlalu jauh`);
    else lulus += 1;
  }
  cek(sama(D.tebakanPilihan(62), [40, 60, 80]) && D.tebakanTerdekat(62) === 60 && D.tebakanTerdekat(85) === 90, "tebakanPilihan(62) dan terdekat: 60 (selisih 2)");
  for (const n of [33, 38, 47, 62, 76, 85]) {
    const t = D.sebarTitik(n, 100, 60);
    let jarak = Infinity;
    for (let i = 0; i < t.length; i += 1) for (let j = i + 1; j < t.length; j += 1) jarak = Math.min(jarak, Math.hypot(t[i][0] - t[j][0], t[i][1] - t[j][1]));
    cek(t.length === n && t.every(([x, y]) => x > 0 && x < 100 && y > 0 && y < 60) && jarak > 4, `sebarTitik(${n}): dalam kotak dan jarak minimum ${jarak.toFixed(1)} > 4`);
  }
  const t62 = D.sebarTitik(62, 208, 72);
  let j62 = Infinity;
  for (let i = 0; i < t62.length; i += 1) for (let j = i + 1; j < t62.length; j += 1) j62 = Math.min(j62, Math.hypot(t62[i][0] - t62[j][0], t62[i][1] - t62[j][1]));
  cek(j62 > 8, `sebarTitik(62) di kolam video: jarak minimum ${j62.toFixed(1)} > 8`);
}

/* ---- Jendela garis bilangan ---- */
{
  let ok = true;
  const posisi = new Set();
  for (let jawab = 1; jawab <= 100; jawab += 1) {
    for (let nomor = 0; nomor < 9; nomor += 1) {
      const [dari, sampai] = D.jendela(jawab, nomor);
      if (!(dari >= 1 && sampai <= 100 && sampai - dari === 8 && jawab >= dari && jawab <= sampai)) ok = false;
      if (jawab >= 10 && jawab <= 90 && (jawab === dari || jawab === sampai)) ok = false;
      if (jawab >= 10 && jawab <= 90) posisi.add(jawab - dari);
    }
  }
  cek(ok, "jendela: sembilan kotak, dalam 1 sampai 100, memuat kunci, kunci tidak di tepi");
  cek(posisi.size >= 5, `jendela: letak kunci berpindah (${posisi.size} posisi)`);
  let ok2 = true;
  const posisi2 = new Set();
  for (let a = 1; a <= 100; a += 1) {
    for (let b = Math.max(1, a - 6); b <= Math.min(100, a + 6); b += 1) {
      for (let nomor = 0; nomor < 9; nomor += 1) {
        const [dari, sampai] = D.jendelaDua(a, b, nomor);
        if (!(dari >= 1 && sampai <= 100 && sampai - dari === 8 && a >= dari && a <= sampai && b >= dari && b <= sampai)) ok2 = false;
        if (a >= 20 && a <= 80) posisi2.add(Math.min(a, b) - dari);
      }
    }
  }
  cek(ok2, "jendelaDua: memuat bilangan awal dan hasil sekaligus untuk semua jarak sampai 6");
  cek(posisi2.size >= 3, `jendelaDua: letak berpindah (${posisi2.size} posisi)`);
}

/* ====================================================================== */
/* SUB-BAB A                                                                */
/* ====================================================================== */

/* ---- Concrete A ---- */
{
  cek(D.RONDE_BUNGKUS_A.length === 3 && unik(D.RONDE_BUNGKUS_A) && D.RONDE_BUNGKUS_A.every((b) => D.BENDA_INFO[b]), "A1: tiga benda berbeda");
  cek(Object.keys(D.BENDA_INFO).length === 8 && Object.values(D.BENDA_INFO).every((b) => b.nama && b.wadah && b.satu), "BENDA_INFO lengkap");
  cek(D.RONDE_HITUNGBUNGKUS_A.length === 3 && D.RONDE_HITUNGBUNGKUS_A.every((r) => r.length === 2), "A2: tiga ronde, dua gambar");
  const posisi = new Set();
  let nomor = 0;
  for (const r of D.RONDE_HITUNGBUNGKUS_A) {
    for (const s of r) {
      cek(s.n >= 5 && s.n <= 10 && D.BENDA_INFO[s.benda], `A2: ${s.n} wadah dalam 5 sampai 10`);
      const o = D.opsiPuluhan(s.n * 10, nomor);
      tiga(o, s.n * 10, `A2 ${s.n} wadah`);
      posisi.add(o.indexOf(s.n * 10));
      nomor += 1;
    }
  }
  cek(posisi.size === 3, "A2: kunci di ketiga posisi");
  cek(unik(D.RONDE_HITUNGBUNGKUS_A.flat().map((s) => s.n)) || D.RONDE_HITUNGBUNGKUS_A.flat().map((s) => s.n).length === 6, "A2: banyak wadah bervariasi");
  cek(D.RONDE_JODOHBUNGKUS_A.length === 3 && D.RONDE_JODOHBUNGKUS_A.every((r) => r.length === 3 && unik(r) && r.every((n) => n >= 2 && n <= 10)), "A3: tiga ronde, tiga banyak wadah berbeda");
  cek(D.RONDE_RAKIT_A.length === 4 && unik(D.RONDE_RAKIT_A.map((t) => t.n)) && D.RONDE_RAKIT_A.every((t) => t.n >= 11 && t.n <= 99 && D.satuan(t.n) > 0 && D.BENDA_INFO[t.benda]), "A4: empat bilangan berbeda, punya puluhan dan satuan");
  cek(D.RONDE_RAKIT_A.some((t) => t.n === 53) && D.RONDE_RAKIT_A.some((t) => t.n === 67), "A4: buku hlm. 198-199 (53 rambutan, 67 kelereng)");
  cek(D.RONDE_IKAT_A.length === 3 && D.RONDE_IKAT_A.every((t) => t.n >= 11 && t.n <= 99 && D.satuan(t.n) > 0) && D.RONDE_IKAT_A.some((t) => t.benda === "lidi" && t.n === 23), "A5: tiga ronde (buku hlm. 214: 23 lidi)");
  const po = new Set();
  for (const [i, t] of D.RONDE_IKAT_A.entries()) {
    const o = D.opsiBilangan(t.n, i);
    tiga(o, t.n, `A5 ${t.n}`);
    po.add(o.indexOf(t.n));
  }
  cek(po.size >= 2, "A5: kunci berpindah");
  cek(D.RONDE_TEBAK_A.length === 3 && D.RONDE_TEBAK_A.some((t) => t.benda === "ikan" && t.n === 62) && unik(D.RONDE_TEBAK_A.map((t) => t.n)), "A6: tiga ronde (buku hlm. 200-201: 62 ikan)");
  for (const t of D.RONDE_TEBAK_A) {
    const tb = D.tebakanPilihan(t.n);
    cek(tb.length === 3 && D.opsiBilangan(t.n, 0).includes(t.n), `A6 ${t.n}: tebakan dan pilihan jawaban`);
  }
  cek(D.RONDE_MEMORI_A.length === 3 && D.RONDE_MEMORI_A.every((r) => r.length === 4 && unik(r) && r.every((n) => n >= 11 && n <= 99)), "A7: tiga ronde, empat pasang berbeda");
  cek(unik(D.RONDE_MEMORI_A.flat()), "A7: bilangan tidak berulang antar ronde");
  cek(D.RONDE_URUTBANYAK_A.length === 3 && D.RONDE_URUTBANYAK_A.every((r, i) => r.angka.length >= 3 && r.angka.length <= 4 && unik(r.angka) && !sama(D.urutTampil(r.angka, D.urutBilangan(r.angka, r.dari), i), D.urutBilangan(r.angka, r.dari)) && sama([...D.urutTampil(r.angka, D.urutBilangan(r.angka, r.dari), i)].sort(), [...r.angka].sort())), "A8: urutan tampil permutasi dan bukan jawaban");
  cek(new Set(D.RONDE_URUTBANYAK_A.map((r) => r.dari)).size === 2, "A8: dua arah urutan");
  cek(D.RONDE_PILAH_A.length === 3, "A9: tiga ronde");
  for (const [i, r] of D.RONDE_PILAH_A.entries()) {
    const kurang = r.filter((n) => n < 50).length;
    cek(r.length === 6 && unik(r) && !r.includes(50) && kurang >= 2 && 6 - kurang >= 2, `A9 r${i + 1}: enam bilangan, tiap kotak minimal dua (${kurang} kurang dari 50)`);
  }
  cek(D.RONDE_KANTONG_A.length === 3 && D.RONDE_KANTONG_A.every((r) => r.length === 2), "A10: tiga ronde, dua soal");
  const pk = new Set();
  for (const s of D.RONDE_KANTONG_A.flat()) {
    cek(s.item.length === 4 && unik(s.item) && s.item.filter((n) => n === s.target).length === 1, `A10 ${s.target}: empat kumpulan, satu yang sama`);
    cek(s.item.includes(D.puluhan(s.target) + D.satuan(s.target) * 10), `A10 ${s.target}: ada pengecoh angka tertukar (${s.item})`);
    pk.add(s.item.indexOf(s.target));
  }
  cek(pk.size >= 3, `A10: kunci berpindah (${[...pk]})`);
}

/* ---- Picture A ---- */
{
  cek(D.RONDE_BATANG_PA.length === 3 && D.RONDE_BATANG_PA.every((r) => r.length === 2 && r.every((n) => n >= 1 && n <= 10)) && unik(D.RONDE_BATANG_PA.flat()), "PA1: tiga ronde, dua soal, banyak batang berbeda");
  cek(D.RONDE_BATANG_PA.flat().includes(10), "PA1: ada soal sepuluh batang (seratus)");
  cek(D.RONDE_CARIMODEL_PA.length === 3, "PA2: tiga ronde");
  const pk = new Set();
  for (const s of D.RONDE_CARIMODEL_PA.flat()) {
    cek(s.item.length === 4 && unik(s.item) && s.item.filter((n) => n === s.target).length === 1 && s.item.includes(D.satuan(s.target) * 10 + D.puluhan(s.target)), `PA2 ${s.target}: empat model, satu yang cocok, ada pengecoh tertukar`);
    pk.add(s.item.indexOf(s.target));
  }
  cek(pk.size >= 3, `PA2: kunci berpindah (${[...pk]})`);
  cek(D.RONDE_ISIPAPAN_PA.length === 4 && unik(D.RONDE_ISIPAPAN_PA) && D.RONDE_ISIPAPAN_PA.every((n) => n >= 11 && n <= 99), "PA3: empat bilangan berbeda");
  cek(D.RONDE_JODOHMODEL_PA.length === 3 && D.RONDE_JODOHMODEL_PA.every((r) => r.length === 3 && unik(r)) && unik(D.RONDE_JODOHMODEL_PA.flat()), "PA4: tiga ronde, tiga bilangan berbeda");
  cek(D.RONDE_BOND_PA.length === 3 && D.RONDE_BOND_PA.every((r) => r.length === 2), "PA5: tiga ronde, dua bagan");
  const tersembunyi = new Set();
  for (const s of D.RONDE_BOND_PA.flat()) {
    const satu = (s.a === null) !== (s.b === null);
    cek(satu, `PA5 ${s.total}: tepat satu bagian tersembunyi`);
    const a = s.a ?? s.total - s.b;
    const b = s.b ?? s.total - s.a;
    cek(a === D.puluhan(s.total) * 10 && b === D.satuan(s.total) && a + b === s.total, `PA5 ${s.total}: bagian ${a} dan ${b}`);
    tersembunyi.add(s.a === null ? "a" : "b");
  }
  cek(tersembunyi.size === 2, "PA5: bagian kiri dan kanan sama-sama pernah tersembunyi");
  cek(D.RONDE_GARISPULUHAN_PA.length === 3 && D.RONDE_GARISPULUHAN_PA.every((r) => r.length === 3), "PA6: tiga ronde, tiga soal");
  for (const s of D.RONDE_GARISPULUHAN_PA.flat()) cek(s.mulai % 10 === 0 && s.loncat >= 1 && D.hasilLoncat(s) <= 100 && D.hasilLoncat(s) === s.mulai + s.loncat * 10, `PA6 ${s.mulai}+${s.loncat}: dalam jangkauan`);
  cek(unik(D.RONDE_GARISPULUHAN_PA.flat().map(D.hasilLoncat)) || D.RONDE_GARISPULUHAN_PA.every((r) => unik(r.map(D.hasilLoncat))), "PA6: hasil berbeda dalam satu ronde");
  cek(D.RONDE_TABELSERATUS_PA.length === 3, "PA7: tiga ronde");
  for (const [i, r] of D.RONDE_TABELSERATUS_PA.entries()) {
    cek(r.length >= 4 && r.length <= 5 && unik(r) && r.every((n) => n >= 51 && n <= 100), `PA7 r${i + 1}: empat atau lima kotak kosong dalam 51 sampai 100`);
    cek(r.every((n, j) => j === 0 || r[j] - r[j - 1] !== 1), `PA7 r${i + 1}: tidak ada dua kotak kosong bersebelahan`);
  }
  cek(D.RONDE_URUTMODEL_PA.length === 3 && D.RONDE_URUTMODEL_PA.every((r, i) => unik(r.angka) && !sama(D.urutTampil(r.angka, D.urutBilangan(r.angka, r.dari), i), D.urutBilangan(r.angka, r.dari))), "PA8: urutan tampil bukan jawaban");
  cek(D.RONDE_PILAHMODEL_PA.length === 3, "PA9: tiga ronde");
  for (const [i, r] of D.RONDE_PILAHMODEL_PA.entries()) {
    const per = r.puluhan.map((p) => r.angka.filter((n) => D.puluhan(n) === p).length);
    cek(r.angka.length === 6 && unik(r.angka) && unik(r.puluhan) && sama(per, [2, 2, 2]), `PA9 r${i + 1}: tiap kotak puluhan menerima dua model (${per})`);
  }
  cek(D.RONDE_TEBAKTITIK_PA.length === 3 && sama(D.RONDE_TEBAKTITIK_PA, [47, 33, 76]) && D.RONDE_TEBAKTITIK_PA.every((n) => D.tebakanPilihan(n).length === 3), "PA10: 47, 33, 76 titik");
}

/* ---- Abstract A ---- */
{
  cek(D.RONDE_JODOHKATA_QA.length === 3 && D.RONDE_JODOHKATA_QA.every((r) => r.length === 3 && unik(r) && unik(r.map(D.kataPS))) && unik(D.RONDE_JODOHKATA_QA.flat()), "QA1: tiga ronde, tiga kalimat dan bilangan berbeda");
  cek(D.RONDE_JODOHKATA_QA.flat().includes(100), "QA1: ada seratus");
  cek(D.RONDE_KALIMAT_QA.length === 2 && D.RONDE_KALIMAT_QA.every((r) => r.length === 3), "QA2: dua ronde, tiga kalimat");
  const pk = new Set();
  let nomor = 0;
  for (const r of D.RONDE_KALIMAT_QA) {
    for (const n of r) {
      const k = D.kalimatIsianPS(n, nomor);
      cek(k.opsi.length === 3 && unik(k.opsi) && k.opsi[k.benar] === String(n) && k.depan.includes(D.kataPS(n)), `QA2 ${n}: kalimat dan kunci`);
      pk.add(k.benar);
      nomor += 1;
    }
  }
  cek(pk.size === 3, "QA2: kunci di ketiga posisi");
  cek(D.RONDE_SUSUN_QA.length === 4 && D.RONDE_SUSUN_QA.every((r) => r.kata.length >= 4 && !r.kata.map((k) => k.toLowerCase()).includes(r.pengecoh.toLowerCase())), "QA3: empat kalimat, pengecoh tidak dipakai");
  cek(D.RONDE_TABEL_QA.length === 2, "QA4: dua tabel");
  for (const t of D.RONDE_TABEL_QA) {
    cek(t.baris.length === 4 && unik(t.baris.map((b) => b.jawab)) && t.baris.every((b) => t.kartu.includes(b.jawab)) && unik(t.kartu) && t.kartu.length > 4, `QA4 ${t.judul}: empat baris, kartu memuat semua jawaban dan pengecoh`);
    cek(t.baris.every((b) => b.jawab === D.kataPS(Number(b.label))), `QA4 ${t.judul}: jawaban dihitung dari bilangan`);
  }
  cek(D.RONDE_BENARSALAH_QA.length === 2 && D.RONDE_BENARSALAH_QA.every((r) => r.length === 5 && r.some((p) => p.benar) && r.some((p) => !p.benar) && r.filter((p) => p.benar).length >= 2 && r.every((p) => p.penjelasan.length > 20)), "QA5: dua ronde, lima pernyataan, benar dan salah bercampur, ada penjelasan");
  const bs = D.RONDE_BENARSALAH_QA.flat();
  cek(bs.find((p) => p.teks.startsWith("5 puluhan dan 3 satuan"))?.benar === false && bs.find((p) => p.teks.startsWith("Tujuh puluh delapan"))?.benar === false && bs.find((p) => p.teks.startsWith("Bilangan 100"))?.benar === true, "QA5: kunci dihitung dari bilangan");
  cek(D.RONDE_NAMA_QA.length === 3 && D.RONDE_NAMA_QA.every((r) => r.length === 2) && unik(D.RONDE_NAMA_QA.flat()), "QA6: tiga ronde, dua soal");
  const pn = new Set();
  nomor = 0;
  for (const n of D.RONDE_NAMA_QA.flat()) {
    const o = D.opsiBilangan(n, nomor);
    tiga(o, n, `QA6 ${n}`);
    cek(unik(o.map(D.terbilang)), `QA6 ${n}: nama bilangan tiap pilihan berbeda`);
    pn.add(o.indexOf(n));
    nomor += 1;
  }
  cek(pn.size === 3, "QA6: kunci di ketiga posisi");
  /* Detektif: tepat satu bilangan 1 sampai 100 yang cocok dengan semua petunjuk, dan pilihan hanya satu yang cocok. */
  cek(D.RONDE_DETEKTIF_QA.length === 4, "QA7: empat soal");
  for (const [i, s] of D.RONDE_DETEKTIF_QA.entries()) {
    const cocok = SEMUA.filter((n) => s.klue.every((k) => D.cocokKlue(n, k)));
    cek(sama(cocok, [s.jawab]), `QA7 soal ${i + 1}: hanya ${s.jawab} yang cocok di antara 1 sampai 100 (${cocok})`);
    cek(s.opsi.length === 3 && unik(s.opsi) && s.opsi.includes(s.jawab) && s.opsi.filter((n) => s.klue.every((k) => D.cocokKlue(n, k))).length === 1, `QA7 soal ${i + 1}: tiga pilihan, satu cocok`);
    cek(s.klue.length >= 2 && s.klue.length <= 3 && s.klue.every((k) => D.teksKlue(k).length > 8), `QA7 soal ${i + 1}: dua atau tiga petunjuk`);
  }
  cek(unik(D.RONDE_DETEKTIF_QA.map((s) => s.opsi.indexOf(s.jawab))) || new Set(D.RONDE_DETEKTIF_QA.map((s) => s.opsi.indexOf(s.jawab))).size >= 2, "QA7: kunci berpindah posisi");
  cek(D.PETA_KONSEP_A.length === 2 && D.PETA_KONSEP_A.every((p) => p.kotak.length === 4 && p.kotak.every((k) => k.opsi.length === 3 && unik(k.opsi) && k.benar >= 0 && k.benar < 3)), "QA8: dua peta, empat kotak, tiga pilihan");
  cek(D.RONDE_URUTANGKA_QA.length === 3 && D.RONDE_URUTANGKA_QA.every((r, i) => r.angka.length >= 4 && unik(r.angka) && !sama(D.urutTampil(r.angka, D.urutBilangan(r.angka, r.dari), i), D.urutBilangan(r.angka, r.dari))), "QA9: tiga ronde, urutan tampil bukan jawaban");
  cek(new Set(D.RONDE_URUTANGKA_QA.map((r) => r.dari)).size === 2, "QA9: dua arah urutan");
  cek(D.RONDE_URUTANGKA_QA[0].angka.includes(62) && D.RONDE_URUTANGKA_QA[0].angka.includes(26), "QA9: ada angka tertukar (62 dan 26) untuk melatih puluhan dulu");
  cek(D.RONDE_KETUKSEMUA_QA.length === 3, "QA10: tiga ronde");
  for (const [i, s] of D.RONDE_KETUKSEMUA_QA.entries()) {
    const c = s.angka.filter(s.ciri).length;
    cek(s.angka.length === 6 && unik(s.angka) && c >= 2 && c <= 4 && s.tanya.startsWith("Ketuk semua"), `QA10 r${i + 1}: ${c} dari 6 cocok`);
  }
}

/* ====================================================================== */
/* SUB-BAB B                                                                */
/* ====================================================================== */

/* ---- Concrete B ---- */
{
  cek(D.RONDE_LANGKAH_B.length === 3 && D.RONDE_LANGKAH_B.every((r) => r.length === 2), "B1: tiga ronde, dua soal");
  const semua = D.RONDE_LANGKAH_B.flat();
  for (const s of semua) cek(s.langkah >= 1 && s.langkah <= 4 && D.hasilLangkah(s) >= 1 && D.hasilLangkah(s) <= 100 && s.mulai >= 1, `B1 ${s.mulai} ${s.arah} ${s.langkah}: dalam jangkauan`);
  cek(D.hasilLangkah({ mulai: 58, arah: "maju", langkah: 2 }) === 60 && D.hasilLangkah({ mulai: 75, arah: "mundur", langkah: 3 }) === 72, "B1: buku hlm. 210");
  cek(D.RONDE_LANGKAH_B.every((r) => r.some((s) => s.arah === "maju") && r.some((s) => s.arah === "mundur")), "B1: tiap ronde ada maju dan mundur");
  cek(D.RONDE_ANTARA_B.length === 3 && D.RONDE_ANTARA_B.every((r) => r.length === 3 && r.every(([a, c]) => c - a === 2)), "B2: tiga ronde, tiga soal, dua bilangan berselisih dua");
  cek(unik(D.RONDE_ANTARA_B.flat().map(([a]) => a)), "B2: bilangan berbeda");
  cek(D.RONDE_BANDING_B.length === 3 && D.RONDE_BANDING_B.every((r) => r.length === 2), "B3: tiga ronde, dua soal");
  const hub = new Set();
  const pos = new Set();
  let nomor = 0;
  for (const s of D.RONDE_BANDING_B.flat()) {
    const { opsi, jawab } = D.opsiBandingAnak(s, nomor);
    cek(opsi.length === 3 && unik(opsi) && opsi[jawab] !== undefined, `B3 ${s.a}/${s.b}: tiga pilihan`);
    const r = D.banding(s.a, s.b);
    const benar = r === "lebih besar" ? `${s.namaA} lebih banyak` : r === "lebih kecil" ? `${s.namaB} lebih banyak` : "Sama banyak";
    cek(opsi[jawab] === benar, `B3 ${s.a}/${s.b}: kunci ${benar}`);
    hub.add(r);
    pos.add(jawab);
    nomor += 1;
  }
  cek(hub.size === 3 && pos.size === 3, "B3: ketiga hubungan muncul, kunci di ketiga posisi");
  cek(D.RONDE_BANDING_B[0][0].a === 56 && D.RONDE_BANDING_B[0][0].b === 65, "B3: buku hlm. 211 (Halim 56, Malosi 65)");
  cek(D.RONDE_PALING_B.length === 3 && D.RONDE_PALING_B.every((r) => r.length === 3 && unik(r)), "B4: tiga ronde, tiga bilangan");
  cek(new Set(D.RONDE_PALING_B.map((r) => r.indexOf(Math.max(...r)))).size >= 2 && new Set(D.RONDE_PALING_B.map((r) => r.indexOf(Math.min(...r)))).size >= 2, "B4: letak terbesar dan terkecil berpindah");
  cek(D.RONDE_KARTU_B.length === 4 && D.RONDE_KARTU_B.every((s) => s.kartu[0] !== s.kartu[1] && s.kartu.every((x) => x >= 1 && x <= 9)) && new Set(D.RONDE_KARTU_B.map((s) => s.arah)).size === 2, "B5: empat ronde, dua kartu berbeda, dua arah");
  cek(sama(D.RONDE_KARTU_B.map(D.hasilKartu), [73, 25, 86, 49]), `B5: hasil terbesar atau terkecil (${D.RONDE_KARTU_B.map(D.hasilKartu)})`);
  cek(D.RONDE_URUT_B.length === 3 && D.RONDE_URUT_B.every((r, i) => r.angka.length === 3 && unik(r.angka) && !sama(D.urutTampil(r.angka, D.urutBilangan(r.angka, r.dari), i), D.urutBilangan(r.angka, r.dari))), "B6: urutan tampil bukan jawaban");
  cek(sama(D.RONDE_URUT_B[0].angka, [76, 83, 57]), "B6: buku hlm. 214 (76, 83, 57)");
  cek(D.RONDE_PASANGBANDING_B.length === 3 && D.RONDE_PASANGBANDING_B.every((r) => r.length === 3 && sama([...r.map(([a, b]) => D.banding(a, b))].sort(), [...D.REL_SEMUA].sort())), "B7: tiap ronde punya ketiga hubungan");
  cek(D.RONDE_MEMORI_B.length === 3 && D.RONDE_MEMORI_B.every((r) => r.length === 4 && unik(r)) && unik(D.RONDE_MEMORI_B.flat()), "B8: tiga ronde, empat pasang berbeda");
  cek(D.RONDE_PILAH_B.length === 3, "B9: tiga ronde");
  for (const [i, r] of D.RONDE_PILAH_B.entries()) {
    const lebih = r.angka.filter((n) => n > r.acuan).length;
    cek(r.angka.length === 6 && unik(r.angka) && !r.angka.includes(r.acuan) && lebih >= 2 && 6 - lebih >= 2, `B9 r${i + 1}: acuan ${r.acuan}, ${lebih} lebih besar`);
  }
  cek(D.RONDE_SEMUA_B.length === 3 && new Set(D.RONDE_SEMUA_B.map((s) => s.arah)).size === 2, "B10: tiga ronde, dua arah");
  for (const [i, s] of D.RONDE_SEMUA_B.entries()) {
    const c = s.angka.filter((n) => D.cocokAcuan(n, s)).length;
    cek(s.angka.length === 6 && unik(s.angka) && s.angka.includes(s.acuan) && c >= 2 && c <= 4, `B10 r${i + 1}: ${c} dari 6 memenuhi, acuan ikut tampil sebagai pengecoh`);
  }
}

/* ---- Picture B ---- */
{
  cek(D.RONDE_GARIS_PB.length === 3 && D.RONDE_GARIS_PB.every((r) => r.length === 3 && sama(r.map((s) => s.jenis), ["antara", "lebih", "kurang"])), "PB1: tiga ronde, antara, lebih, kurang");
  for (const [ri, r] of D.RONDE_GARIS_PB.entries()) {
    for (const [i, s] of r.entries()) {
      const hasil = D.hasilGaris(s);
      cek(Number.isInteger(hasil) && hasil >= 1 && hasil <= 100, `PB1 r${ri + 1}.${i + 1}: hasil bilangan bulat ${hasil}`);
      cek(s.jenis !== "antara" || s.c - s.a === 2, `PB1 r${ri + 1}.${i + 1}: dua bilangan berselisih dua`);
      const [dari, sampai] = s.jenis === "antara" ? D.jendela(hasil, ri * 3 + i + 1) : D.jendelaDua(s.n, hasil, ri * 3 + i + 1);
      const muat = s.jenis === "antara" ? hasil >= dari && hasil <= sampai && s.a >= dari && s.c <= sampai : hasil >= dari && hasil <= sampai && s.n >= dari && s.n <= sampai;
      cek(muat, `PB1 r${ri + 1}.${i + 1}: garis ${dari} sampai ${sampai} memuat bilangan awal dan jawaban`);
      cek(D.tanyaGaris(s).startsWith("Ketuk bilangan"), `PB1 r${ri + 1}.${i + 1}: pertanyaan`);
    }
  }
  cek(D.RONDE_BANDINGPAPAN_PB.length === 3 && D.RONDE_BANDINGPAPAN_PB.every((r) => r.length === 2), "PB2: tiga ronde, dua soal");
  const hub = new Set();
  const pos = new Set();
  let nomor = 0;
  for (const [a, b] of D.RONDE_BANDINGPAPAN_PB.flat()) {
    const { opsi, jawab } = D.opsiBandingHuruf(a, b, nomor);
    const r = D.banding(a, b);
    cek(opsi.length === 3 && unik(opsi) && opsi[jawab] === (r === "lebih besar" ? "Papan A lebih besar" : r === "lebih kecil" ? "Papan B lebih besar" : "Sama besar"), `PB2 ${a}/${b}: kunci`);
    hub.add(r);
    pos.add(jawab);
    nomor += 1;
  }
  cek(hub.size === 3 && pos.size >= 2, "PB2: ketiga hubungan muncul, kunci berpindah");
  cek(D.RONDE_URUTPAPAN_PB.length === 3 && D.RONDE_URUTPAPAN_PB.every((r, i) => unik(r.angka) && !sama(D.urutTampil(r.angka, D.urutBilangan(r.angka, r.dari), i), D.urutBilangan(r.angka, r.dari))) && new Set(D.RONDE_URUTPAPAN_PB.map((r) => r.dari)).size === 2, "PB3: urutan tampil bukan jawaban, dua arah");
  cek(D.RONDE_MODELBESAR_PB.length === 3 && D.RONDE_MODELBESAR_PB.every((r) => r.length === 3 && unik(r)) && new Set(D.RONDE_MODELBESAR_PB.map((r) => r.indexOf(Math.max(...r)))).size >= 2, "PB4: tiga ronde, tiga model, letak berpindah");
  cek(D.RONDE_PILAHMODEL_PB.length === 3, "PB5: tiga ronde");
  for (const [i, r] of D.RONDE_PILAHMODEL_PB.entries()) {
    const lebih = r.angka.filter((n) => n > r.acuan).length;
    cek(r.angka.length === 6 && unik(r.angka) && !r.angka.includes(r.acuan) && lebih >= 2 && 6 - lebih >= 2, `PB5 r${i + 1}: acuan ${r.acuan}, ${lebih} lebih besar`);
  }
  cek(D.RONDE_SIMBOL_PB.length === 3 && D.RONDE_SIMBOL_PB.every((r) => r.length === 3 && sama(r.map(([a, b]) => D.tanda(a, b)).sort(), ["<", "=", ">"].sort())), "PB6: tiap ronde punya ketiga tanda");
  cek(D.RONDE_TABELSERATUS_PB.length === 3 && D.RONDE_TABELSERATUS_PB.every((r) => r.length >= 4 && r.length <= 5 && unik(r) && r.every((n) => n >= 51 && n <= 100) && r.every((n, j) => j === 0 || n - r[j - 1] !== 1)), "PB7: tiga ronde, kotak kosong tidak bersebelahan");
  cek(D.RONDE_LANGKAH_PB.length === 3 && D.RONDE_LANGKAH_PB.every((r) => r.length === 2 && r.some((s) => s.arah === "maju") && r.some((s) => s.arah === "mundur") && r.every((s) => D.hasilLangkah(s) >= 1 && D.hasilLangkah(s) <= 100 && s.langkah >= 1 && s.langkah <= 5)), "PB8: tiga ronde, maju dan mundur");
  cek(D.RONDE_MEMORI_PB.length === 3 && D.RONDE_MEMORI_PB.every((r) => r.length === 4 && unik(r)) && unik(D.RONDE_MEMORI_PB.flat()), "PB9: tiga ronde, empat pasang berbeda");
  cek(D.RONDE_SEMUA_PB.length === 3 && new Set(D.RONDE_SEMUA_PB.map((s) => s.arah)).size === 2, "PB10: tiga ronde, dua arah");
  for (const [i, s] of D.RONDE_SEMUA_PB.entries()) {
    const c = s.angka.filter((n) => D.cocokAcuan(n, s)).length;
    cek(s.angka.length === 6 && unik(s.angka) && s.angka.includes(s.acuan) && c >= 2 && c <= 4, `PB10 r${i + 1}: ${c} dari 6 memenuhi`);
  }
}

/* ---- Abstract B ---- */
{
  cek(D.RONDE_KALIMAT_QB.length === 2 && D.RONDE_KALIMAT_QB.every((r) => r.length === 3 && sama(r.map(([a, b]) => D.banding(a, b)).sort(), [...D.REL_SEMUA].sort())), "QB1: dua ronde, tiap ronde ketiga hubungan");
  const pk = new Set();
  let nomor = 0;
  for (const r of D.RONDE_KALIMAT_QB) {
    for (const [a, b] of r) {
      const k = D.kalimatIsianBanding(a, b, nomor);
      const r2 = D.banding(a, b);
      const benar = r2 === "lebih besar" ? D.KATA_BANDING[0] : r2 === "lebih kecil" ? D.KATA_BANDING[1] : D.KATA_BANDING[2];
      cek(k.opsi.length === 3 && unik(k.opsi) && k.opsi[k.benar] === benar && k.depan === `Bilangan ${a}` && k.belakang === `bilangan ${b}.`, `QB1 ${a}/${b}: kunci ${benar}`);
      pk.add(k.benar);
      nomor += 1;
    }
  }
  cek(pk.size === 3, "QB1: kunci di ketiga posisi");
  cek(D.RONDE_BENARSALAH_QB.length === 2 && D.RONDE_BENARSALAH_QB.every((r) => r.length === 5 && r.some((p) => p.benar) && r.some((p) => !p.benar) && r.filter((p) => p.benar).length >= 2 && r.every((p) => p.penjelasan.length > 20)), "QB2: dua ronde, lima pernyataan, benar dan salah bercampur");
  const bs = D.RONDE_BENARSALAH_QB.flat();
  cek(bs.find((p) => p.teks.startsWith("Bilangan 54 lebih besar"))?.benar === false && bs.find((p) => p.teks.startsWith("Bilangan 65 lebih besar"))?.benar === true && bs.find((p) => p.teks.startsWith("Bilangan 37 lebih besar"))?.benar === false, "QB2: kunci dihitung dari bilangan");
  cek(D.RONDE_SUSUN_QB.length === 4 && D.RONDE_SUSUN_QB.every((r) => r.kata.length >= 5 && !r.kata.map((k) => k.toLowerCase()).includes(r.pengecoh.toLowerCase())), "QB3: empat kalimat, pengecoh tidak dipakai");
  cek(D.RONDE_AKU_QB.length === 3 && D.RONDE_AKU_QB.every((r) => r.length === 2 && r.some((s) => s.arah === "lebih") && r.some((s) => s.arah === "kurang")), "QB4: tiga ronde, lebih dan kurang");
  const pa = new Set();
  nomor = 0;
  for (const s of D.RONDE_AKU_QB.flat()) {
    const h = D.hasilAku(s);
    const o = D.opsiBilangan(h, nomor);
    tiga(o, h, `QB4 ${D.teksAku(s)}`);
    cek(D.teksAku(s).startsWith("Aku adalah bilangan.") && h >= 1 && h <= 100, `QB4: ${h}`);
    pa.add(o.indexOf(h));
    nomor += 1;
  }
  cek(pa.size === 3, "QB4: kunci di ketiga posisi");
  cek(D.hasilAku({ dasar: 76, k: 2, arah: "lebih" }) === 78 && D.hasilAku({ dasar: 67, k: 1, arah: "kurang" }) === 66, "QB4: buku hlm. 217 (78 dan 66)");
  cek(D.RONDE_TABEL_QB.length === 2, "QB5: dua tabel");
  for (const t of D.RONDE_TABEL_QB) {
    cek(t.baris.length === 4 && unik(t.baris.map((b) => b.jawab)) && t.baris.every((b) => t.kartu.includes(b.jawab)) && unik(t.kartu), `QB5 ${t.judul}: empat baris, kartu memuat jawaban`);
  }
  cek(D.RONDE_TABEL_QB[0].baris.every((b) => Number(b.jawab) === Number(b.label) + 2) && D.RONDE_TABEL_QB[1].baris.every((b) => Number(b.jawab) === Number(b.label) - 3), "QB5: 2 lebihnya dan 3 kurangnya dihitung dari bilangan");
  cek(D.RONDE_DIGIT_QB.length === 3 && D.RONDE_DIGIT_QB.every((r) => r.length === 2), "QB6: tiga ronde, dua soal");
  for (const s of D.RONDE_DIGIT_QB.flat()) {
    const h = D.hasilDigit(s);
    cek(h >= 10 && h <= 99, `QB6: ${h} dua angka`);
  }
  cek(unik(D.RONDE_DIGIT_QB.flat().map(D.hasilDigit)) && D.RONDE_DIGIT_QB.flat().some((s) => D.puluhan(D.hasilDigit(s)) !== D.puluhan(s.dasar)), "QB6: hasil berbeda, ada yang puluhannya berubah (80 kurang 1 = 79)");
  cek(D.RONDE_DETEKTIF_QB.length === 4, "QB7: empat soal");
  for (const [i, s] of D.RONDE_DETEKTIF_QB.entries()) {
    const cocok = SEMUA.filter((n) => s.klue.every((k) => D.cocokKlue(n, k)));
    cek(sama(cocok, [s.jawab]), `QB7 soal ${i + 1}: hanya ${s.jawab} yang cocok di antara 1 sampai 100 (${cocok})`);
    cek(s.opsi.length === 3 && unik(s.opsi) && s.opsi.includes(s.jawab) && s.opsi.filter((n) => s.klue.every((k) => D.cocokKlue(n, k))).length === 1 && s.klue.length === 3, `QB7 soal ${i + 1}: tiga petunjuk, tiga pilihan, satu cocok`);
  }
  cek(new Set(D.RONDE_DETEKTIF_QB.map((s) => s.opsi.indexOf(s.jawab))).size >= 2, "QB7: kunci berpindah posisi");
  cek(D.PETA_KONSEP_B.length === 2 && D.PETA_KONSEP_B.every((p) => p.kotak.length === 4 && p.kotak.every((k) => k.opsi.length === 3 && unik(k.opsi) && k.benar >= 0 && k.benar < 3)), "QB8: dua peta, empat kotak");
  cek(D.RONDE_URUTANGKA_QB.length === 3 && D.RONDE_URUTANGKA_QB.every((r, i) => r.angka.length >= 4 && unik(r.angka) && !sama(D.urutTampil(r.angka, D.urutBilangan(r.angka, r.dari), i), D.urutBilangan(r.angka, r.dari))) && new Set(D.RONDE_URUTANGKA_QB.map((r) => r.dari)).size === 2, "QB9: tiga ronde, urutan tampil bukan jawaban, dua arah");
  cek(D.RONDE_SEMUA_QB.length === 3 && new Set(D.RONDE_SEMUA_QB.map((s) => s.arah)).size === 2, "QB10: tiga ronde, dua arah");
  for (const [i, s] of D.RONDE_SEMUA_QB.entries()) {
    const c = s.angka.filter((n) => D.cocokAcuan(n, s)).length;
    cek(s.angka.length === 6 && unik(s.angka) && s.angka.includes(s.acuan) && c >= 2 && c <= 4, `QB10 r${i + 1}: ${c} dari 6 memenuhi`);
  }
}

/* ====================================================================== */
/* Naskah, video, dan JSON                                                  */
/* ====================================================================== */
const SIMBOL = /[=<>+×÷]/;
for (const s of N.SUB_BAB_K2B7) {
  const k = s.id;
  cek(s.videos.length === 3 && s.videos.every((v) => v.adegan.length === 3), `naskah ${k}: tiga video, tiap video tiga adegan`);
  cek(s.mindMaps.length === 8 && s.mindMaps.every((m, i) => m.stepNumber === i + 1 && m.stepDesc.length > 150 && m.stepTitle.startsWith(`${i + 1}.`)), `naskah ${k}: delapan langkah peta pikiran berurutan dan mendalam`);
  cek(s.infografis.length === 10 && s.infografis.every((p) => p.suara.length > 40 && p.countNum >= 2), `naskah ${k}: sepuluh panel infografis`);
  cek(s.games.length === 30, `naskah ${k}: tiga puluh permainan (ada ${s.games.length})`);
  for (const [tahap, dari] of [["Concrete", 0], ["Picture", 10], ["Abstract", 20]]) {
    cek(s.games.slice(dari, dari + 10).every((g) => g.stage === tahap), `naskah ${k}: permainan ${dari + 1}-${dari + 10} bertahap ${tahap}`);
  }
  cek(unik(s.games.map((g) => g.title)), `naskah ${k}: judul permainan unik`);
  for (const tahap of ["Concrete", "Picture", "Abstract"]) {
    const t = s.games.filter((g) => g.stage === tahap).map((g) => g.gameType);
    cek(unik(t), `naskah ${k}: sepuluh jenis permainan berbeda di tahap ${tahap}`);
  }
  cek(s.games.every((g) => g.bookReference.length > 8 && g.objective.length > 15 && g.mechanicDescription.length > 60 && g.voiceGuide.length > 8), `naskah ${k}: tiap permainan lengkap keterangannya`);
  cek(s.games.filter((g) => g.stage === "Concrete").every((g) => g.emoji && g.targetCount > 0) && s.games.filter((g) => g.stage === "Picture").every((g) => g.diagramType) && s.games.filter((g) => g.stage === "Abstract").every((g) => g.symbolLarge && g.wordLarge), `naskah ${k}: bidang khusus tahap ada`);
  cek(s.poin.length === 5 && s.refleksi.length === 4 && s.cara.potongan.length === 4, `naskah ${k}: lima poin, empat refleksi, empat potongan cara`);
  for (const v of s.videos) {
    for (const a of v.adegan) {
      cek(a.ketukan.length >= 3 && a.ketukan.length <= 4 && a.ketukan.length === a.papan.length, `${a.id}: ketukan dan papan sama banyak (${a.ketukan.length}/${a.papan.length})`);
      cek(a.papan.every((p) => p.length <= 34), `${a.id}: papan tidak terlalu panjang`);
      cek(a.ketukan.every((x) => /[.!?]$/.test(x) && !SIMBOL.test(x) && !/\d/.test(x)), `${a.id}: ketukan berakhir tanda baca, tanpa lambang dan tanpa angka`);
    }
  }
  const lisan = [s.silabus.teksSuara, s.poinSuara, s.cara.suara, s.rumah, ...s.mindMaps.map((m) => m.stepDesc), ...s.infografis.map((p) => p.suara), ...s.poin.map((p) => p.suara)];
  cek(lisan.every((x) => !SIMBOL.test(x)), `naskah ${k}: ucapan memakai kata, bukan lambang`);
  cek(![s.targetDescription, s.rumah, ...s.games.map((g) => g.mechanicDescription)].some((x) => /rupiah|Rp\s?\d|\bkurs\b/i.test(x)), `naskah ${k}: tanpa nilai tukar`);
  const emojiPicto = /\p{Extended_Pictographic}/u;
  for (const g of s.games.filter((x) => x.stage === "Picture")) cek(!emojiPicto.test(`${g.title} ${g.objective} ${g.mechanicDescription} ${g.voiceGuide} ${g.diagramType}`), `naskah ${k}: Picture "${g.title}" tanpa emoji`);
  /* Emoji Unicode 13 ke atas tidak tampil di Windows 10. */
  const baru = /[\u{1FAA0}-\u{1FAFF}]/u;
  cek(![JSON.stringify(s)].some((x) => baru.test(x)), `naskah ${k}: tanpa emoji Unicode 13 ke atas`);
}
cek(N.K2B7_META.suaraLaju === 0.7 && N.K2B7_META.suaraNada === 1 && N.K2B7_META.chapterId === "k2-mat-bab7" && N.K2B7_META.phaseCode === "FASE_A" && N.K2B7_META.grade === 2, "naskah: meta bab 7, laju 0,70, nada 1");
cek(N.semuaAdeganK2B7.length === 18, "naskah: delapan belas adegan");
cek(unik(N.semuaAdeganK2B7.map((a) => a.id)), "naskah: id adegan unik");

/* ---- Berkas JSON publik ---- */
{
  const f = "src/data/kelas2-bab7.json";
  cek(fs.existsSync(f), "JSON publik ada");
  if (fs.existsSync(f)) {
    const j = JSON.parse(fs.readFileSync(f, "utf8"));
    const teks = JSON.stringify(j);
    cek(j.chapter_id === "k2-mat-bab7" && j.phase_code === "FASE_A" && j.grade === 2, "JSON: chapter_id, phase_code, grade");
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
      const sumber = N.SUB_BAB_K2B7.find((x) => x.id === k);
      cek(sama(s.videos.map((v) => v.adegan.map((a) => a.ketukan)), sumber.videos.map((v) => v.adegan.map((a) => a.ketukan))), `JSON ${k}: ketukan video sama dengan naskah`);
    }
  }
}
cek(!fs.existsSync("supabase/seed/02_kelas2_bab7_keys.sql"), "seed server tidak dibuat untuk bab tanpa soal");

console.log(`\nData Kelas 2 Bab 7: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
