// Uji Simulasi Kelas 6 Bab 2 (Rasio): Lab Rasio (A), Lab Senilai (B), Lab Bagian (C), mesin, skenario, misi, gerbang, data ringkas, pengeja,
// dan konsep sub-bab berikutnya tidak bocor ke sub-bab sebelumnya.
// Jalankan: node --no-warnings scripts/uji-lab-k6b2.mjs
import { readFileSync } from "node:fs";
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K2 from "../src/components/modul/misi-k6bab2.ts";
import * as TK from "../src/components/modul/misi-teks-k6b2.ts";
import * as A from "../src/components/modul/lab-rasio-k6b2a.ts";
import * as MS from "../src/components/modul/mesin-rasio-k6b2.ts";
import * as B from "../src/components/modul/lab-senilai-k6b2b.ts";
import * as MB from "../src/components/modul/mesin-senilai-k6b2.ts";
import * as C from "../src/components/modul/lab-bagian-k6b2c.ts";
import * as MC from "../src/components/modul/mesin-bagian-k6b2.ts";
import * as SK from "../src/components/modul/skenario-k6b2.ts";
import * as ME from "../src/components/modul/mesin-bertahap-k3b1.ts";
import * as EJ from "../src/components/modul/eja-k6b2.ts";

let lulus = 0;
let gagal = 0;
const cek = (kondisi, pesan) => {
  if (kondisi) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", pesan);
  }
};
const sama = (a, b, pesan) => cek(JSON.stringify(a) === JSON.stringify(b), `${pesan}: ${JSON.stringify(a)} != ${JSON.stringify(b)}`);
const sel = (id) => ({ alat: "selesai", id });
const acakDari = (seed0) => {
  let s = seed0 >>> 0;
  return (n) => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return (s >>> 8) % n;
  };
};
const jalan = (awal, langkah, aksi) => aksi.reduce((s, a) => langkah(s, a), awal);
const tanpaAngka = (t) => !/\d/.test(EJ.ejaK6B2(t));
const L = A.langkahRasioK6B2A;
const x0 = A.awalRasioK6B2A();
globalThis.__pesanA = [];

/* ------------------------------ Hitungan MANDIRI (cara berbeda) ------------------------------ */
// Kode memakai algoritma Euclid. Di sini FPB dicari dengan mencoba semua pembagi dari yang terbesar, dan kesamaan rasio
// diperiksa dengan perkalian silang (a*d = b*c). Bilangan dieja per digit dari teks.
const fpbMandiri = (a, b) => {
  for (let d = Math.min(a, b); d >= 1; d -= 1) if (a % d === 0 && b % d === 0) return d;
  return 1;
};
const setaraMandiri = (a, b, c, d) => a * d === b * c;
const KATA_DIGIT = { 0: "", 1: "satu", 2: "dua", 3: "tiga", 4: "empat", 5: "lima", 6: "enam", 7: "tujuh", 8: "delapan", 9: "sembilan" };
const tigaDigitMandiri = (teks3) => {
  const [h, t, u] = teks3.padStart(3, "0").split("").map(Number);
  const bagian = [];
  if (h === 1) bagian.push("seratus");
  else if (h > 1) bagian.push(`${KATA_DIGIT[h]} ratus`);
  if (t === 1) bagian.push(u === 0 ? "sepuluh" : u === 1 ? "sebelas" : `${KATA_DIGIT[u]} belas`);
  else {
    if (t > 1) bagian.push(`${KATA_DIGIT[t]} puluh`);
    if (u > 0) bagian.push(KATA_DIGIT[u]);
  }
  return bagian.join(" ");
};
const bacaMandiri = (n) => {
  if (n === 0) return "nol";
  const s = String(n).padStart(6, "0");
  const kiri = s.slice(0, 3);
  const kanan = s.slice(3);
  const bagianKiri = kiri === "001" ? "seribu" : Number(kiri) === 0 ? "" : `${tigaDigitMandiri(kiri)} ribu`;
  return [bagianKiri, tigaDigitMandiri(kanan)].filter(Boolean).join(" ");
};
const idx = (daftar, nilai) => daftar.indexOf(nilai);
const sortir = (a) => [...a].map(String).sort();
const posisiRotasi = (i, r) => (3 - ((i + r) % 3)) % 3;

const RENCANA_TULIS = [
  { a: 4, b: 6, ka: "pucuk merah", kb: "cemara" },
  { a: 2, b: 3, ka: "pucuk merah", kb: "cemara" },
  { a: 3, b: 5, ka: "mangga", kb: "jambu" },
  { a: 5, b: 2, ka: "mawar", kb: "melati" },
  { a: 7, b: 4, ka: "ikan mas", kb: "ikan nila" },
  { a: 3, b: 6, ka: "sendok", kb: "garpu" },
];
const RENCANA_SEDERHANA = [
  { a: 4, b: 6, g: 2 },
  { a: 6, b: 9, g: 3 },
  { a: 10, b: 15, g: 5 },
  { a: 12, b: 8, g: 4 },
  { a: 9, b: 12, g: 3 },
  { a: 8, b: 20, g: 4 },
];
const RENCANA_ARAH = [
  { a: 2, b: 3, ka: "pucuk merah", kb: "cemara" },
  { a: 3, b: 5, ka: "mangga", kb: "jambu" },
  { a: 5, b: 2, ka: "mawar", kb: "melati" },
  { a: 7, b: 4, ka: "ikan mas", kb: "ikan nila" },
  { a: 3, b: 6, ka: "sendok", kb: "garpu" },
  { a: 1, b: 4, ka: "kucing", kb: "kelinci" },
];

/* ------------------------------ Pengeja ------------------------------ */
{
  sama(EJ.ejaK6B2("3 : 5"), "tiga banding lima", "eja rasio dengan spasi");
  sama(EJ.ejaK6B2("3:5"), "tiga banding lima", "eja rasio tanpa spasi");
  sama(EJ.ejaK6B2("4 : 6 = 2 : 3"), "empat banding enam sama dengan dua banding tiga", "eja rasio setara");
  sama(EJ.ejaK6B2("Soal bibit: 4 : 6."), "Soal bibit: empat banding enam.", "titik dua kalimat tetap, rasio dibaca banding");
  sama(EJ.ejaK6B2("2 : 3 dan 3 : 2"), "dua banding tiga dan tiga banding dua", "eja dua arah");
  sama(EJ.ejaK6B2("Rp8.000"), "delapan ribu rupiah", "eja uang");
  sama(EJ.ejaK6B2("Rp 50.000 per paket"), "lima puluh ribu rupiah per paket", "eja uang dengan spasi");
  sama(EJ.ejaK6B2("Rp40.000 untuk 5 bibit"), "empat puluh ribu rupiah untuk lima bibit", "eja uang dan bibit");
  sama(EJ.ejaK6B2("1/2"), "setengah", "eja setengah");
  sama(EJ.ejaK6B2("1/4"), "seperempat", "eja seperempat");
  sama(EJ.ejaK6B2("3/4"), "tiga perempat", "eja tiga perempat");
  sama(EJ.ejaK6B2("10/12 = 5/6"), "sepuluh per dua belas sama dengan lima per enam", "eja pecahan senilai");
  sama(EJ.ejaK6B2("2 km/jam"), "dua kilometer per jam", "eja km per jam");
  sama(EJ.ejaK6B2("25 m² dan 3 kg"), "dua puluh lima meter persegi dan tiga kilogram", "eja satuan");
  sama(EJ.ejaK6B2("4 x 3"), "empat dikali tiga", "eja x huruf");
  sama(EJ.ejaK6B2("(2×3)/(1×5)"), "kurung buka dua dikali tiga kurung tutup per kurung buka satu dikali lima kurung tutup", "eja kurung");
  sama(EJ.ejaK6B2("2 + 3 − 1"), "dua ditambah tiga dikurangi satu", "eja tambah kurang");
  sama(EJ.ejaK6B2("1,5 jam"), "satu koma lima jam", "eja desimal");
  sama(EJ.ejaK6B2("2 ≠ 3"), "dua tidak sama dengan tiga", "eja tidak sama dengan");
  sama(EJ.ejaK6B2("Ya, 5 ember."), "Ya, lima ember.", "koma kalimat tidak jadi desimal");
  sama(EJ.ejaK6B2("979.875"), "sembilan ratus tujuh puluh sembilan ribu delapan ratus tujuh puluh lima", "eja bilangan bertitik");
  sama(EJ.ejaK6B2("tidak ada angka."), "tidak ada angka.", "tanpa angka tetap");
  cek(!EJ.ejaK6B2("box 3").includes("dikali"), "huruf x di dalam kata bukan tanda kali");
  cek(!EJ.ejaK6B2("kmx 2").includes("kilometer"), "km di dalam kata tidak diganti");
  let ok = true;
  for (let n = 1; n <= 999999; n += 1) {
    if (EJ.kataK6B2(n) !== bacaMandiri(n)) {
      ok = false;
      console.log("beda eja", n, EJ.kataK6B2(n), bacaMandiri(n));
      break;
    }
  }
  cek(ok, "kata bilangan 1 sampai 999.999 sama dengan hitungan mandiri per digit");
  cek(EJ.kataK6B2(0) === "nol" && EJ.kataK6B2(-1) === "-1" && EJ.kataK6B2(1.5) === "1.5" && EJ.kataK6B2(1000000) === "1000000", "kata nol dan di luar jangkauan apa adanya");
  let okP = true;
  for (let a = 1; a <= 30; a += 1) {
    for (let b = 1; b <= 30; b += 1) {
      const lazim = (a === 1 && b === 2) || (a === 1 && b === 4) || (a === 3 && b === 4);
      const harap = lazim ? (a === 1 && b === 2 ? "setengah" : a === 1 ? "seperempat" : "tiga perempat") : `${bacaMandiri(a)} per ${bacaMandiri(b)}`;
      if (EJ.ejaK6B2(`${a}/${b}`) !== harap) okP = false;
    }
  }
  cek(okP, "pecahan a/b untuk a dan b sampai 30 sama dengan hitungan mandiri");
  // Rasio: semua a : b untuk a dan b sampai 40, dengan dan tanpa spasi.
  let okR = true;
  for (let a = 0; a <= 40; a += 1) {
    for (let b = 0; b <= 40; b += 1) {
      const harap = `${bacaMandiri(a)} banding ${bacaMandiri(b)}`;
      if (EJ.ejaK6B2(`${a} : ${b}`) !== harap || EJ.ejaK6B2(`${a}:${b}`) !== harap) okR = false;
    }
  }
  cek(okR, "rasio a : b untuk a dan b sampai 40 dibaca a banding b (dengan dan tanpa spasi)");
  // Uang: kelipatan seribu sampai 999.000 dan nilai tanpa titik.
  let okU = true;
  for (let r = 1; r <= 999; r += 1) {
    const teks = `Rp${r}.000`;
    if (EJ.ejaK6B2(teks) !== `${bacaMandiri(r * 1000)} rupiah`) okU = false;
  }
  for (const n of [5, 50, 500, 8000, 12500]) if (EJ.ejaK6B2(`Rp${n}`) !== `${bacaMandiri(n)} rupiah`) okU = false;
  cek(okU, "uang Rp dibaca bilangan lalu rupiah");
}

/* ------------------------------ Data sama dengan rencana ------------------------------ */
{
  sama(A.SOAL_TULIS.map((s) => [s.a, s.b, s.ka, s.kb]), RENCANA_TULIS.map((r) => [r.a, r.b, r.ka, r.kb]), "enam soal Tulis sesuai rencana");
  sama(A.SOAL_SEDERHANA.map((s) => [s.a, s.b]), RENCANA_SEDERHANA.map((r) => [r.a, r.b]), "enam soal Sederhana sesuai rencana");
  sama(A.SOAL_ARAH.map((s) => [s.a, s.b, s.ka, s.kb]), RENCANA_ARAH.map((r) => [r.a, r.b, r.ka, r.kb]), "enam soal Arah sesuai rencana");
  cek(A.SOAL_TULIS.every((s) => s.a !== s.b && s.a > 0 && s.b > 0 && s.ka !== s.kb) && A.SOAL_ARAH.every((s) => s.a !== s.b && s.a > 0 && s.b > 0 && s.ka !== s.kb), "Tulis dan Arah: dua jenis benda berbeda dan angka berbeda");
  cek(A.SOAL_SEDERHANA.every((s, i) => fpbMandiri(s.a, s.b) === RENCANA_SEDERHANA[i].g && RENCANA_SEDERHANA[i].g >= 2), "Sederhana: FPB mandiri sesuai rencana dan lebih dari satu");
  cek(new Set(A.SOAL_TULIS.map((s) => s.nama)).size === 6 && new Set(A.SOAL_SEDERHANA.map((s) => s.nama)).size === 6 && new Set(A.SOAL_ARAH.map((s) => s.nama)).size === 6, "nama soal unik");
  let ok = true;
  for (let p = 1; p <= 60; p += 1) {
    for (let q = 1; q <= 60; q += 1) {
      const g = fpbMandiri(p, q);
      if (A.gcd(p, q) !== g || A.rasioSederhana(p, q) !== `${p / g} : ${q / g}` || !setaraMandiri(p / g, q / g, p, q) || A.sudahSederhana(p, q) !== (g === 1) || fpbMandiri(p / g, q / g) !== 1) {
        ok = false;
        console.log("beda sederhana", p, q);
      }
    }
  }
  cek(ok, "penyederhanaan kode sama dengan FPB mandiri, setara lewat perkalian silang, dan hasilnya tak bisa disederhanakan lagi");
  sama([A.teksRasio(4, 6), A.rasioSederhana(4, 6), A.rasioSederhana(6, 9), A.rasioSederhana(12, 8), A.rasioSederhana(5, 2)], ["4 : 6", "2 : 3", "2 : 3", "3 : 2", "5 : 2"], "teks rasio");
}

/* ------------------------------ Opsi sama dengan himpunan mandiri ------------------------------ */
{
  for (let i = 0; i < 6; i += 1) {
    const t = RENCANA_TULIS[i];
    const s = RENCANA_SEDERHANA[i];
    const r = RENCANA_ARAH[i];
    const ot = A.opsiRasioTulis(i);
    const ok = A.opsiKalimatTulis(i);
    sama(sortir(ot.opsi), sortir([`${t.a} : ${t.b}`, `${t.b} : ${t.a}`, String(t.a + t.b)]), `Tulis ${i}: pilihan rasio`);
    sama(sortir(ok.opsi), sortir([`Setiap ${t.a} ${t.ka} ada ${t.b} ${t.kb}`, `Setiap ${t.b} ${t.ka} ada ${t.a} ${t.kb}`, `Setiap ${t.a} ${t.kb} ada ${t.b} ${t.ka}`]), `Tulis ${i}: pilihan kalimat`);
    cek(ot.opsi[ot.benar] === `${t.a} : ${t.b}` && ok.opsi[ok.benar] === `Setiap ${t.a} ${t.ka} ada ${t.b} ${t.kb}`, `Tulis ${i}: kunci benar`);
    cek(new Set(ot.opsi).size === 3 && new Set(ok.opsi).size === 3, `Tulis ${i}: tiga pilihan unik`);
    const pe = A.opsiPembagi(i);
    const ki = A.opsiKiri(i);
    const ka = A.opsiKanan(i);
    sama(sortir(pe.opsi), sortir([s.g, s.g * 2, s.g + 1]), `Sederhana ${i}: pilihan pembagi`);
    sama(sortir(ki.opsi), sortir([s.a / s.g, s.a, s.b / s.g]), `Sederhana ${i}: pilihan suku kiri`);
    sama(sortir(ka.opsi), sortir([s.b / s.g, s.b, s.a / s.g]), `Sederhana ${i}: pilihan suku kanan`);
    cek(pe.opsi[pe.benar] === s.g && ki.opsi[ki.benar] === s.a / s.g && ka.opsi[ka.benar] === s.b / s.g, `Sederhana ${i}: kunci benar`);
    cek([pe, ki, ka].every((q) => new Set(q.opsi).size === 3), `Sederhana ${i}: tiga pilihan unik`);
    // Pengecoh pembagi tidak membagi habis kedua suku (bukan pembagi bersama).
    cek(pe.opsi.filter((o) => s.a % o === 0 && s.b % o === 0).length === 1, `Sederhana ${i}: hanya satu pembagi yang membagi habis kedua suku`);
    // Pengecoh suku bukan jawaban benar sekaligus tetap kesalahan khas (tidak dibagi atau tertukar).
    cek(setaraMandiri(ki.opsi[ki.benar], ka.opsi[ka.benar], s.a, s.b) && !setaraMandiri(s.a, ka.opsi[ka.benar], s.a, s.b), `Sederhana ${i}: hanya hasil benar yang setara lewat perkalian silang`);
    const pr = A.opsiPertama(i);
    const ba = A.opsiBalik(i);
    const be = A.opsiBeda(i);
    sama(sortir(pr.opsi), sortir([`${r.a} : ${r.b}`, `${r.b} : ${r.a}`, String(r.a + r.b)]), `Arah ${i}: pilihan pertama`);
    sama(sortir(ba.opsi), sortir([`${r.a} : ${r.b}`, `${r.b} : ${r.a}`, String(r.a + r.b)]), `Arah ${i}: pilihan balik`);
    cek(pr.opsi[pr.benar] === `${r.a} : ${r.b}` && ba.opsi[ba.benar] === `${r.b} : ${r.a}` && be.opsi[be.benar] === A.JAWAB_BEDA, `Arah ${i}: kunci benar`);
    cek([pr, ba, be].every((q) => new Set(q.opsi).size === 3), `Arah ${i}: tiga pilihan unik`);
  }
  const letak = (fungsi) => [0, 1, 2, 3, 4, 5].map((i) => fungsi(i).benar);
  for (const [nama, f, r] of [["rasioTulis", A.opsiRasioTulis, 0], ["kalimatTulis", A.opsiKalimatTulis, 1], ["pembagi", A.opsiPembagi, 0], ["kiri", A.opsiKiri, 1], ["kanan", A.opsiKanan, 2], ["pertama", A.opsiPertama, 0], ["balik", A.opsiBalik, 1], ["beda", A.opsiBeda, 2]]) {
    const l = letak(f);
    cek(new Set(l).size === 3, `letak kunci ${nama} bervariasi (${l.join("")})`);
    sama(l, [0, 1, 2, 3, 4, 5].map((i) => posisiRotasi(i, r)), `letak kunci eksak ${nama}`);
  }
  const o1 = A.opsiPembagi(0).opsi;
  cek(o1.includes(2) && o1.includes(4) && o1.includes(3), "pembagi 4 : 6: pengecoh dua kali FPB (4) dan satu lebih (3)");
  const o2 = A.opsiRasioTulis(0).opsi;
  cek(o2.includes("4 : 6") && o2.includes("6 : 4") && o2.includes("10"), "tulis 4 : 6: pengecoh terbalik dan jumlah");
  const o3 = A.opsiKiri(0).opsi;
  cek(o3.includes(2) && o3.includes(4) && o3.includes(3), "suku kiri 4 : 6: pengecoh tidak dibagi dan suku kanan hasil");
}

/* ------------------------------ Lab A: Rasio ------------------------------ */
const seqTulis = (i, sampai = 99) => {
  const r = RENCANA_TULIS[i];
  return [
    { t: "T_DATA", i },
    ...Array.from({ length: r.a }, () => ({ t: "T_TAMBAH_A" })),
    ...Array.from({ length: r.b }, () => ({ t: "T_TAMBAH_B" })),
    { t: "T_RASIO", o: idx(A.opsiRasioTulis(i).opsi, `${r.a} : ${r.b}`) },
    { t: "T_KALIMAT", o: idx(A.opsiKalimatTulis(i).opsi, `Setiap ${r.a} ${r.ka} ada ${r.b} ${r.kb}`) },
  ].slice(0, sampai);
};
const seqSederhana = (i, sampai = 99) => {
  const r = RENCANA_SEDERHANA[i];
  return [
    { t: "S_DATA", i },
    { t: "S_PEMBAGI", o: idx(A.opsiPembagi(i).opsi, fpbMandiri(r.a, r.b)) },
    { t: "S_KIRI", o: idx(A.opsiKiri(i).opsi, r.a / fpbMandiri(r.a, r.b)) },
    { t: "S_KANAN", o: idx(A.opsiKanan(i).opsi, r.b / fpbMandiri(r.a, r.b)) },
  ].slice(0, sampai);
};
const seqArah = (i, sampai = 99) => {
  const r = RENCANA_ARAH[i];
  return [
    { t: "R_DATA", i },
    { t: "R_PERTAMA", o: idx(A.opsiPertama(i).opsi, `${r.a} : ${r.b}`) },
    { t: "R_BALIK", o: idx(A.opsiBalik(i).opsi, `${r.b} : ${r.a}`) },
    { t: "R_BEDA", o: idx(A.opsiBeda(i).opsi, A.JAWAB_BEDA) },
  ].slice(0, sampai);
};
const catatPesan = (s) => globalThis.__pesanA.push(s.pesan);

{
  sama(A.keadaanRasioK6B2A(x0), { alat: "rasio", pernah: [] }, "keadaan awal");
  cek(x0.pernah.length === 0 && x0.pesan === "" && x0.tulis.na === 0 && x0.tulis.nb === 0 && !x0.tulis.rasio && !x0.tulis.selesai && x0.sederhana.tahap === 0 && x0.arah.tahap === 0, "awal: kosong");
  cek(x0.tulis.data === 0 && x0.sederhana.data === 0 && x0.arah.data === 0, "awal: soal pertama");

  // Tulis.
  for (let i = 0; i < 6; i += 1) {
    const r = RENCANA_TULIS[i];
    let x = x0;
    const hasil = [];
    for (const a of seqTulis(i)) {
      x = L(x, a);
      catatPesan(x);
      hasil.push(x);
    }
    cek(x.pernah.join() === `tulis:${i}` && x.tulis.selesai && x.tulis.rasio && x.tulis.na === r.a && x.tulis.nb === r.b, `Tulis ${i}: urutan benar menambah tulis:${i}`);
    const akhir = hasil[hasil.length - 1].pesan;
    cek(akhir.startsWith("✅") && akhir.includes(`${r.a} : ${r.b} dibaca ${r.a} banding ${r.b}`) && akhir.includes(`setiap ${r.a} ${r.ka} ada ${r.b} ${r.kb}`), `Tulis ${i}: pesan akhir memuat bacaan (${akhir})`);
    cek(!hasil.slice(0, -1).some((s) => s.pernah.length > 0), `Tulis ${i}: riwayat baru muncul di langkah terakhir`);
    const dataSetelahLengkap = hasil[r.a + r.b];
    cek(dataSetelahLengkap.pesan.startsWith("✅") && dataSetelahLengkap.pesan.includes(`Ada ${r.a} ${r.ka} dan ${r.b} ${r.kb}`), `Tulis ${i}: pesan benda lengkap`);
    cek(hasil[r.a + r.b + 1].pesan.startsWith("✅") && hasil[r.a + r.b + 1].pesan.includes(`ditulis ${r.a} : ${r.b}`), `Tulis ${i}: pesan rasio ditulis`);
    const lengkap = jalan(x0, L, seqTulis(i, 1 + r.a + r.b));
    for (let o = 0; o < 3; o += 1) {
      const y = L(lengkap, { t: "T_RASIO", o });
      const benar = A.opsiRasioTulis(i).opsi[o] === `${r.a} : ${r.b}`;
      cek(benar ? y.tulis.rasio && y.pesan.startsWith("✅") : !y.tulis.rasio && !y.pesan.startsWith("✅") && y.pesan.length > 20 && y.pernah.length === 0, `Tulis ${i}: pilihan rasio ${o} ${benar ? "benar diterima" : "salah ditolak"}`);
      catatPesan(y);
      const z = L(jalan(x0, L, seqTulis(i, 2 + r.a + r.b)), { t: "T_KALIMAT", o });
      const benar2 = A.opsiKalimatTulis(i).opsi[o] === `Setiap ${r.a} ${r.ka} ada ${r.b} ${r.kb}`;
      cek(benar2 ? z.tulis.selesai && z.pernah.includes(`tulis:${i}`) : !z.tulis.selesai && z.pernah.length === 0 && !z.pesan.startsWith("✅") && z.pesan.length > 20, `Tulis ${i}: pilihan kalimat ${o} ${benar2 ? "benar diterima" : "salah ditolak"}`);
      catatPesan(z);
    }
    // Rasio sebelum semua benda terhitung ditolak (kurang satu jenis a atau jenis b).
    const kurangA = jalan(x0, L, [{ t: "T_DATA", i }, ...Array.from({ length: r.a - 1 }, () => ({ t: "T_TAMBAH_A" })), ...Array.from({ length: r.b }, () => ({ t: "T_TAMBAH_B" }))]);
    const kurangB = jalan(x0, L, [{ t: "T_DATA", i }, ...Array.from({ length: r.a }, () => ({ t: "T_TAMBAH_A" })), ...Array.from({ length: r.b - 1 }, () => ({ t: "T_TAMBAH_B" }))]);
    for (const k of [kurangA, kurangB]) {
      const y = L(k, { t: "T_RASIO", o: idx(A.opsiRasioTulis(i).opsi, `${r.a} : ${r.b}`) });
      cek(!y.tulis.rasio && y.pernah.length === 0 && y.pesan.length > 10 && !y.pesan.startsWith("✅"), `Tulis ${i}: rasio saat benda kurang satu ditolak`);
      catatPesan(y);
    }
    // Kalimat sebelum rasio ditolak.
    const lompat = L(lengkap, { t: "T_KALIMAT", o: idx(A.opsiKalimatTulis(i).opsi, `Setiap ${r.a} ${r.ka} ada ${r.b} ${r.kb}`) });
    cek(!lompat.tulis.selesai && lompat.pernah.length === 0 && !lompat.pesan.startsWith("✅") && lompat.pesan.length > 10, `Tulis ${i}: kalimat sebelum rasio ditolak`);
    catatPesan(lompat);
    // Benda tidak melebihi jumlahnya dan tidak mengubah riwayat.
    const berlebih = jalan(x0, L, [{ t: "T_DATA", i }, ...Array.from({ length: r.a + 5 }, () => ({ t: "T_TAMBAH_A" })), ...Array.from({ length: r.b + 5 }, () => ({ t: "T_TAMBAH_B" }))]);
    cek(berlebih.tulis.na === r.a && berlebih.tulis.nb === r.b && berlebih.pernah.length === 0, `Tulis ${i}: benda berhenti di ${r.a} dan ${r.b}`);
    catatPesan(berlebih);
    // Setelah rasio ditulis (sebelum kalimat), menambah benda tidak mengubah keadaan sama sekali.
    const sesudahRasio = jalan(x0, L, seqTulis(i, 2 + r.a + r.b));
    cek(sesudahRasio.tulis.rasio && !sesudahRasio.tulis.selesai && JSON.stringify(L(L(sesudahRasio, { t: "T_TAMBAH_A" }), { t: "T_TAMBAH_B" })) === JSON.stringify(sesudahRasio), `Tulis ${i}: setelah rasio, tambah benda tidak mengubah keadaan`);
    // Setelah selesai tidak ada yang berubah.
    const setelah = jalan(x, L, [{ t: "T_TAMBAH_A" }, { t: "T_TAMBAH_B" }, { t: "T_RASIO", o: 0 }, { t: "T_KALIMAT", o: 1 }]);
    cek(JSON.stringify(setelah) === JSON.stringify(x), `Tulis ${i}: setelah selesai tidak berubah sama sekali`);
  }
  {
    const y = jalan(x0, L, [...seqTulis(0), { t: "T_DATA", i: 1 }]);
    cek(y.tulis.data === 1 && y.tulis.na === 0 && y.tulis.nb === 0 && !y.tulis.rasio && !y.tulis.selesai && y.pernah.join() === "tulis:0" && y.pesan === "", "Tulis: ganti soal mengosongkan keadaan, riwayat tetap");
    const ulang = jalan(x0, L, [...seqTulis(0), { t: "T_DATA", i: 0 }]);
    cek(ulang.tulis.na === 0 && !ulang.tulis.selesai && ulang.pernah.join() === "tulis:0", "Tulis: soal yang sama bisa diulang, riwayat tetap");
  }

  // Sederhana.
  for (let i = 0; i < 6; i += 1) {
    const r = RENCANA_SEDERHANA[i];
    const g = fpbMandiri(r.a, r.b);
    const urut = seqSederhana(i);
    let x = x0;
    const hasil = [];
    for (const a of urut) {
      x = L(x, a);
      catatPesan(x);
      hasil.push(x);
    }
    cek(x.pernah.join() === `sederhana:${i}` && x.sederhana.tahap === 3, `Sederhana ${i}: urutan benar menambah sederhana:${i}`);
    cek(!hasil.slice(0, -1).some((s) => s.pernah.length > 0), `Sederhana ${i}: riwayat baru muncul di langkah terakhir`);
    cek(hasil[1].pesan.startsWith("✅") && hasil[1].pesan.includes(`${g} membagi habis ${r.a} dan ${r.b}`), `Sederhana ${i}: pesan pembagi ${g}`);
    cek(hasil[2].pesan.startsWith("✅") && hasil[2].pesan.includes(`${r.a} dibagi ${g} sama dengan ${r.a / g}`), `Sederhana ${i}: pesan suku kiri ${r.a / g}`);
    cek(hasil[3].pesan.startsWith("✅") && hasil[3].pesan.includes(`${r.a} : ${r.b} = ${r.a / g} : ${r.b / g}`), `Sederhana ${i}: pesan akhir memuat hasil mandiri`);
    const tahapOpsi = [
      ["S_PEMBAGI", A.opsiPembagi(i).opsi, g, 0],
      ["S_KIRI", A.opsiKiri(i).opsi, r.a / g, 1],
      ["S_KANAN", A.opsiKanan(i).opsi, r.b / g, 2],
    ];
    for (const [t, opsi, kunci, tahap] of tahapOpsi) {
      const awal = jalan(x0, L, urut.slice(0, 1 + tahap));
      cek(awal.sederhana.tahap === tahap, `Sederhana ${i}: awal tahap ${tahap}`);
      for (let o = 0; o < 3; o += 1) {
        const y = L(awal, { t, o });
        const benar = opsi[o] === kunci;
        if (benar) cek(y.sederhana.tahap === tahap + 1 && y.pesan.startsWith("✅"), `Sederhana ${i}/${t}: pilihan ${o} benar maju`);
        else cek(y.sederhana.tahap === tahap && y.pernah.length === 0 && !y.pesan.startsWith("✅") && y.pesan.length > 20, `Sederhana ${i}/${t}: pilihan ${o} salah ditolak`);
        catatPesan(y);
      }
      for (const t2 of ["S_PEMBAGI", "S_KIRI", "S_KANAN"]) {
        if (t2 === t) continue;
        const tahap2 = ["S_PEMBAGI", "S_KIRI", "S_KANAN"].indexOf(t2);
        const y = L(awal, { t: t2, o: 0 });
        if (tahap2 < tahap) cek(y === awal, `Sederhana ${i}: ${t2} yang sudah lewat tidak mengubah apa pun`);
        else {
          cek(y.sederhana.tahap === tahap && y.pernah.length === 0 && y.pesan.length > 10 && !y.pesan.startsWith("✅"), `Sederhana ${i}: ${t2} sebelum waktunya ditolak di tahap ${tahap}`);
          catatPesan(y);
        }
      }
    }
  }
  {
    const y = jalan(x0, L, [...seqSederhana(0), { t: "S_DATA", i: 3 }]);
    cek(y.sederhana.data === 3 && y.sederhana.tahap === 0 && y.pernah.join() === "sederhana:0" && y.pesan === "", "Sederhana: ganti soal mengosongkan tahap, riwayat tetap");
    const sudah = jalan(x0, L, seqSederhana(0));
    cek(L(sudah, { t: "S_KIRI", o: 0 }) === sudah && L(sudah, { t: "S_KANAN", o: 1 }) === sudah, "Sederhana: setelah selesai, aksi lanjutan tidak mengubah");
  }

  // Arah.
  for (let i = 0; i < 6; i += 1) {
    const r = RENCANA_ARAH[i];
    const urut = seqArah(i);
    let x = x0;
    const rekam = [];
    for (const a of urut) {
      x = L(x, a);
      catatPesan(x);
      rekam.push(x);
    }
    cek(x.pernah.join() === `arah:${i}` && x.arah.tahap === 3, `Arah ${i}: urutan benar menambah arah:${i}`);
    cek(!rekam.slice(0, -1).some((s) => s.pernah.length > 0), `Arah ${i}: riwayat baru muncul di langkah terakhir`);
    cek(rekam[1].pesan.startsWith("✅") && rekam[1].pesan.includes(`ditulis ${r.a} : ${r.b}`), `Arah ${i}: pesan rasio pertama`);
    cek(rekam[2].pesan.startsWith("✅") && rekam[2].pesan.includes(`ditulis ${r.b} : ${r.a}`), `Arah ${i}: pesan rasio balik`);
    cek(rekam[3].pesan.startsWith("✅") && rekam[3].pesan.includes(`${r.a} : ${r.b} berarti setiap ${r.a} ${r.ka} ada ${r.b} ${r.kb}`) && rekam[3].pesan.includes(`${r.b} : ${r.a} berarti setiap ${r.b} ${r.kb} ada ${r.a} ${r.ka}`), `Arah ${i}: pesan akhir memuat dua bacaan`);
    const tahapOpsi = [
      ["R_PERTAMA", A.opsiPertama(i).opsi, `${r.a} : ${r.b}`, 0],
      ["R_BALIK", A.opsiBalik(i).opsi, `${r.b} : ${r.a}`, 1],
      ["R_BEDA", A.opsiBeda(i).opsi, A.JAWAB_BEDA, 2],
    ];
    for (const [t, opsi, kunci, tahap] of tahapOpsi) {
      const awal = jalan(x0, L, urut.slice(0, 1 + tahap));
      cek(awal.arah.tahap === tahap, `Arah ${i}: awal tahap ${tahap}`);
      for (let o = 0; o < 3; o += 1) {
        const y = L(awal, { t, o });
        const benar = opsi[o] === kunci;
        if (benar) cek(y.arah.tahap === tahap + 1 && y.pesan.startsWith("✅"), `Arah ${i}/${t}: pilihan ${o} benar maju`);
        else cek(y.arah.tahap === tahap && y.pernah.length === 0 && !y.pesan.startsWith("✅") && y.pesan.length > 20, `Arah ${i}/${t}: pilihan ${o} salah ditolak`);
        catatPesan(y);
      }
      for (const t2 of ["R_PERTAMA", "R_BALIK", "R_BEDA"]) {
        if (t2 === t) continue;
        const tahap2 = ["R_PERTAMA", "R_BALIK", "R_BEDA"].indexOf(t2);
        const y = L(awal, { t: t2, o: 0 });
        if (tahap2 < tahap) cek(y === awal, `Arah ${i}: ${t2} yang sudah lewat tidak mengubah apa pun`);
        else {
          cek(y.arah.tahap === tahap && y.pernah.length === 0 && y.pesan.length > 10 && !y.pesan.startsWith("✅"), `Arah ${i}: ${t2} sebelum waktunya ditolak di tahap ${tahap}`);
          catatPesan(y);
        }
      }
    }
  }
  {
    const y = jalan(x0, L, [...seqArah(0), { t: "R_DATA", i: 3 }]);
    cek(y.arah.data === 3 && y.arah.tahap === 0 && y.pernah.join() === "arah:0" && y.pesan === "", "Arah: ganti soal mengosongkan tahap, riwayat tetap");
  }

  // Indeks pecahan, negatif, dan di luar batas diabaikan.
  const asing = [
    { t: "T_DATA", i: -1 }, { t: "T_DATA", i: 6 }, { t: "T_DATA", i: 1.5 }, { t: "T_DATA", i: NaN }, { t: "T_DATA", i: "1" },
    { t: "S_DATA", i: -1 }, { t: "S_DATA", i: 6 }, { t: "S_DATA", i: 0.5 }, { t: "R_DATA", i: -2 }, { t: "R_DATA", i: 99 }, { t: "R_DATA", i: 2.2 },
    ...["T_RASIO", "T_KALIMAT", "S_PEMBAGI", "S_KIRI", "S_KANAN", "R_PERTAMA", "R_BALIK", "R_BEDA"].flatMap((t) => [-1, 3, 7, 0.5, NaN, "1", null, undefined].map((o) => ({ t, o }))),
  ];
  const siap = jalan(x0, L, [...seqTulis(1, 3), ...seqSederhana(0, 2), ...seqArah(0, 2)]);
  for (const a of asing) cek(JSON.stringify(L(siap, a)) === JSON.stringify(siap), `aksi asing diabaikan: ${JSON.stringify(a)}`);
  cek((() => { try { L(siap, { t: "TIDAK_ADA" }); return true; } catch { return false; } })(), "aksi tak dikenal tidak melempar kesalahan");
  sama(L(siap, { t: "RESET" }), x0, "RESET kembali ke awal");
  const sudahTulis = jalan(x0, L, seqTulis(0));
  cek(L(sudahTulis, { t: "PESAN_KOSONG" }).pesan === "" && L(sudahTulis, { t: "PESAN_KOSONG" }).pernah.length === 1, "PESAN_KOSONG hanya mengosongkan pesan");
}

/* ------------------------------ Fuzz 20.000 aksi dengan orakel mandiri ------------------------------ */
{
  const acak = acakDari(20261113);
  const o = { tulis: { data: 0, na: 0, nb: 0, rasio: false, sel: false }, sederhana: { data: 0, tahap: 0 }, arah: { data: 0, tahap: 0 }, pernah: new Set() };
  let x = x0;
  const AKSI_ACAK = ["T_DATA", "T_TAMBAH_A", "T_TAMBAH_B", "T_RASIO", "T_KALIMAT", "S_DATA", "S_PEMBAGI", "S_KIRI", "S_KANAN", "R_DATA", "R_PERTAMA", "R_BALIK", "R_BEDA", "PESAN_KOSONG", "RESET"];
  const benarBerikut = (tampil) => {
    if (tampil === 0) {
      const r = RENCANA_TULIS[o.tulis.data];
      if (o.tulis.sel) return { t: "T_DATA", i: acak(6) };
      if (o.tulis.na < r.a) return { t: "T_TAMBAH_A" };
      if (o.tulis.nb < r.b) return { t: "T_TAMBAH_B" };
      if (!o.tulis.rasio) return { t: "T_RASIO", o: idx(A.opsiRasioTulis(o.tulis.data).opsi, `${r.a} : ${r.b}`) };
      return { t: "T_KALIMAT", o: idx(A.opsiKalimatTulis(o.tulis.data).opsi, `Setiap ${r.a} ${r.ka} ada ${r.b} ${r.kb}`) };
    }
    if (tampil === 1) {
      const i = o.sederhana.data;
      const r = RENCANA_SEDERHANA[i];
      const g = fpbMandiri(r.a, r.b);
      const t = o.sederhana.tahap;
      if (t === 0) return { t: "S_PEMBAGI", o: idx(A.opsiPembagi(i).opsi, g) };
      if (t === 1) return { t: "S_KIRI", o: idx(A.opsiKiri(i).opsi, r.a / g) };
      if (t === 2) return { t: "S_KANAN", o: idx(A.opsiKanan(i).opsi, r.b / g) };
      return { t: "S_DATA", i: acak(6) };
    }
    const i = o.arah.data;
    const r = RENCANA_ARAH[i];
    const t = o.arah.tahap;
    if (t === 0) return { t: "R_PERTAMA", o: idx(A.opsiPertama(i).opsi, `${r.a} : ${r.b}`) };
    if (t === 1) return { t: "R_BALIK", o: idx(A.opsiBalik(i).opsi, `${r.b} : ${r.a}`) };
    if (t === 2) return { t: "R_BEDA", o: idx(A.opsiBeda(i).opsi, A.JAWAB_BEDA) };
    return { t: "R_DATA", i: acak(6) };
  };
  const nilaiAcak = () => [0, 1, 2, 0, 1, 2, -1, 3, 1.5, NaN, 99][acak(11)];
  const terapkan = (a) => {
    const sebelum = new Set(o.pernah);
    const sahI = (i) => Number.isInteger(i) && i >= 0 && i < 6;
    const sahO = (v) => Number.isInteger(v) && v >= 0 && v < 3;
    switch (a.t) {
      case "T_DATA":
        if (sahI(a.i)) o.tulis = { data: a.i, na: 0, nb: 0, rasio: false, sel: false };
        break;
      case "T_TAMBAH_A":
        if (!o.tulis.sel && !o.tulis.rasio && o.tulis.na < RENCANA_TULIS[o.tulis.data].a) o.tulis.na += 1;
        break;
      case "T_TAMBAH_B":
        if (!o.tulis.sel && !o.tulis.rasio && o.tulis.nb < RENCANA_TULIS[o.tulis.data].b) o.tulis.nb += 1;
        break;
      case "T_RASIO": {
        const r = RENCANA_TULIS[o.tulis.data];
        if (sahO(a.o) && !o.tulis.sel && !o.tulis.rasio && o.tulis.na === r.a && o.tulis.nb === r.b && A.opsiRasioTulis(o.tulis.data).opsi[a.o] === `${r.a} : ${r.b}`) o.tulis.rasio = true;
        break;
      }
      case "T_KALIMAT": {
        const r = RENCANA_TULIS[o.tulis.data];
        if (sahO(a.o) && !o.tulis.sel && o.tulis.rasio && A.opsiKalimatTulis(o.tulis.data).opsi[a.o] === `Setiap ${r.a} ${r.ka} ada ${r.b} ${r.kb}`) {
          o.tulis.sel = true;
          o.pernah.add(`tulis:${o.tulis.data}`);
        }
        break;
      }
      case "S_DATA":
        if (sahI(a.i)) o.sederhana = { data: a.i, tahap: 0 };
        break;
      case "S_PEMBAGI": {
        const r = RENCANA_SEDERHANA[o.sederhana.data];
        if (sahO(a.o) && o.sederhana.tahap === 0 && A.opsiPembagi(o.sederhana.data).opsi[a.o] === fpbMandiri(r.a, r.b)) o.sederhana.tahap = 1;
        break;
      }
      case "S_KIRI": {
        const r = RENCANA_SEDERHANA[o.sederhana.data];
        if (sahO(a.o) && o.sederhana.tahap === 1 && A.opsiKiri(o.sederhana.data).opsi[a.o] === r.a / fpbMandiri(r.a, r.b)) o.sederhana.tahap = 2;
        break;
      }
      case "S_KANAN": {
        const r = RENCANA_SEDERHANA[o.sederhana.data];
        if (sahO(a.o) && o.sederhana.tahap === 2 && A.opsiKanan(o.sederhana.data).opsi[a.o] === r.b / fpbMandiri(r.a, r.b)) {
          o.sederhana.tahap = 3;
          o.pernah.add(`sederhana:${o.sederhana.data}`);
        }
        break;
      }
      case "R_DATA":
        if (sahI(a.i)) o.arah = { data: a.i, tahap: 0 };
        break;
      case "R_PERTAMA": {
        const r = RENCANA_ARAH[o.arah.data];
        if (sahO(a.o) && o.arah.tahap === 0 && A.opsiPertama(o.arah.data).opsi[a.o] === `${r.a} : ${r.b}`) o.arah.tahap = 1;
        break;
      }
      case "R_BALIK": {
        const r = RENCANA_ARAH[o.arah.data];
        if (sahO(a.o) && o.arah.tahap === 1 && A.opsiBalik(o.arah.data).opsi[a.o] === `${r.b} : ${r.a}`) o.arah.tahap = 2;
        break;
      }
      case "R_BEDA":
        if (sahO(a.o) && o.arah.tahap === 2 && A.opsiBeda(o.arah.data).opsi[a.o] === A.JAWAB_BEDA) {
          o.arah.tahap = 3;
          o.pernah.add(`arah:${o.arah.data}`);
        }
        break;
      case "RESET":
        o.tulis = { data: 0, na: 0, nb: 0, rasio: false, sel: false };
        o.sederhana = { data: 0, tahap: 0 };
        o.arah = { data: 0, tahap: 0 };
        o.pernah = new Set();
        break;
      default:
        break;
    }
    return [...o.pernah].filter((v) => !sebelum.has(v));
  };

  let ok = true;
  let pernahTerbesar = 0;
  const selesaiPer = { tulis: 0, sederhana: 0, arah: 0 };
  for (let n = 0; n < 20000 && ok; n += 1) {
    let a;
    if (acak(10) < 5) a = benarBerikut(acak(3));
    else {
      const t = AKSI_ACAK[acak(AKSI_ACAK.length)];
      a = t === "T_DATA" || t === "S_DATA" || t === "R_DATA" ? { t, i: [0, 1, 2, 3, 4, 5, -1, 6, 2.5, NaN][acak(10)] } : { t, o: nilaiAcak() };
      if (t === "RESET" && acak(8) !== 0) a = { t: "PESAN_KOSONG" };
    }
    const baruMenurutOrakel = terapkan(a);
    const sebelumPernah = x.pernah.length;
    x = L(x, a);
    globalThis.__pesanA.push(x.pesan);
    if (a.t === "RESET") ok = ok && x.pernah.length === 0 && x.pesan === "";
    else cek(x.pernah.length >= sebelumPernah, `fuzz ${n}: riwayat tidak dicabut`);
    const cocok =
      x.tulis.data === o.tulis.data && x.tulis.na === o.tulis.na && x.tulis.nb === o.tulis.nb && x.tulis.rasio === o.tulis.rasio && x.tulis.selesai === o.tulis.sel &&
      x.sederhana.data === o.sederhana.data && x.sederhana.tahap === o.sederhana.tahap && x.arah.data === o.arah.data && x.arah.tahap === o.arah.tahap &&
      JSON.stringify([...x.pernah].sort()) === JSON.stringify([...o.pernah].sort());
    if (!cocok) {
      ok = false;
      console.log("fuzz beda dari orakel di langkah", n, JSON.stringify(a), JSON.stringify(x), JSON.stringify({ ...o, pernah: [...o.pernah] }));
    }
    if (baruMenurutOrakel.length > 0) {
      cek(x.pesan.startsWith("✅"), `fuzz ${n}: id baru ${baruMenurutOrakel.join()} diawali pesan sukses`);
      selesaiPer[baruMenurutOrakel[0].split(":")[0]] += 1;
    }
    cek(x.tulis.na >= 0 && x.tulis.na <= RENCANA_TULIS[x.tulis.data].a && x.tulis.nb >= 0 && x.tulis.nb <= RENCANA_TULIS[x.tulis.data].b && x.sederhana.tahap <= 3 && x.arah.tahap <= 3, `fuzz ${n}: batas terjaga`);
    cek(typeof x.pesan === "string", `fuzz ${n}: pesan berupa teks`);
    pernahTerbesar = Math.max(pernahTerbesar, x.pernah.length);
  }
  cek(ok, "fuzz 20.000 aksi: keadaan sama dengan orakel mandiri");
  cek(selesaiPer.tulis > 10 && selesaiPer.sederhana > 10 && selesaiPer.arah > 10, `fuzz: tiap tampilan selesai berkali-kali (${selesaiPer.tulis}, ${selesaiPer.sederhana}, ${selesaiPer.arah})`);
  cek(pernahTerbesar >= 6, `fuzz: riwayat pernah mencapai ${pernahTerbesar}`);
  cek(x.pernah.every((v) => /^(tulis|sederhana|arah):[0-5]$/.test(v)), "fuzz: semua id riwayat berbentuk sah");
}

/* ------------------------------ Mesin ------------------------------ */
{
  const def = MS.MESIN_RASIO;
  cek(def.stasiun.length === 4 && def.kasus.length === 3, `${def.id}: empat stasiun, tiga kasus`);
  sama(def.stasiun.map((s) => s.id), ["tulis", "baca", "pembagi", "hasil"], "stasiun mesin");
  const posisi = [];
  for (const kasus of def.kasus) {
    cek(kasus.langkah.length === 4, `${def.id}/${kasus.id}: empat langkah`);
    kasus.langkah.forEach((l, i) => {
      cek(l.stasiun === def.stasiun[i].id, `${def.id}/${kasus.id}: langkah ${i + 1} di stasiun ${def.stasiun[i].id}`);
      cek(l.opsi.length === 3 && new Set(l.opsi).size === 3 && l.opsi.filter((o) => o === l.benar).length === 1, `${def.id}/${kasus.id}/${l.stasiun}: tiga pilihan unik, satu kunci`);
      cek([l.tanya, l.petunjuk, ...l.opsi].every(tanpaAngka), `${def.id}/${kasus.id}/${l.stasiun}: dapat dieja`);
      posisi.push(l.opsi.indexOf(l.benar));
    });
    cek(tanpaAngka(kasus.nama) && tanpaAngka(kasus.ringkas), `${def.id}/${kasus.id}: nama dan ringkas dapat dieja`);
  }
  cek(new Set(posisi).size === 3, `${def.id}: letak kunci bervariasi (${posisi.join("")})`);
  for (let s = 0; s < 4; s += 1) cek(new Set(def.kasus.map((k) => k.langkah[s].opsi.indexOf(k.langkah[s].benar))).size >= 2, `${def.id}: letak kunci stasiun ${def.stasiun[s].id} bervariasi antar kasus`);
  for (const [s, offset] of [[0, 0], [1, 1], [2, 2], [3, 3]]) {
    sama(def.kasus.map((k) => k.langkah[s].opsi.indexOf(k.langkah[s].benar)), [0, 1, 2].map((i) => posisiRotasi(i, offset)), `${def.id}: letak kunci eksak stasiun ${def.stasiun[s].id}`);
  }
  let x = ME.awalMesin(def);
  let n = 0;
  while (!x.selesai && n < 100) {
    n += 1;
    const l = ME.langkahAktif(x);
    x = l ? ME.langkahMesin(x, { t: "JAWAB", nilai: l.benar }) : ME.langkahMesin(x, { t: "LANJUT" });
  }
  cek(x.selesai && def.selesaiId === K2.ID_MESIN_K6B2.A, `${def.id}: bisa diselesaikan, id selesai sesuai misi`);
  const y = ME.awalMesin(def);
  const l0 = ME.langkahAktif(y);
  const z = ME.langkahMesin(y, { t: "JAWAB", nilai: l0.opsi.find((o) => o !== l0.benar) });
  cek(z.ke === 0 && z.ditolak === 1 && z.pesan === l0.petunjuk, `${def.id}: jawaban salah ditolak dengan petunjuk`);

  const RENCANA_M = [
    { id: "bibit", a: 4, b: 6, ka: "pucuk merah", kb: "cemara" },
    { id: "buah", a: 9, b: 12, ka: "mangga", kb: "jambu" },
    { id: "bunga", a: 10, b: 4, ka: "mawar", kb: "melati" },
  ];
  sama(MS.KASUS_RASIO.map((k) => [k.id, k.a, k.b, k.ka, k.kb]), RENCANA_M.map((r) => [r.id, r.a, r.b, r.ka, r.kb]), "Mesin: data tiga kasus sesuai rencana");
  for (const [i, r] of RENCANA_M.entries()) {
    const c = def.kasus[i];
    const [tu, ba, pe, ha] = c.langkah;
    const g = fpbMandiri(r.a, r.b);
    const hasil = `${r.a / g} : ${r.b / g}`;
    cek(tu.benar === `${r.a} : ${r.b}` && tu.tanya.includes(`${r.a} ${r.ka} dan ${r.b} ${r.kb}`) && !tu.tanya.includes(`${r.a} : ${r.b}`), `Mesin ${r.id}: tulis ${r.a} : ${r.b}, kunci tidak dibocorkan`);
    sama(sortir(tu.opsi), sortir([`${r.a} : ${r.b}`, `${r.b} : ${r.a}`, String(r.a + r.b)]), `Mesin ${r.id}: pengecoh tulis (terbalik dan jumlah)`);
    cek(ba.benar === `Setiap ${r.a} ${r.ka} ada ${r.b} ${r.kb}`, `Mesin ${r.id}: baca`);
    sama(sortir(ba.opsi), sortir([`Setiap ${r.a} ${r.ka} ada ${r.b} ${r.kb}`, `Setiap ${r.b} ${r.ka} ada ${r.a} ${r.kb}`, `Setiap ${r.a} ${r.kb} ada ${r.b} ${r.ka}`]), `Mesin ${r.id}: pengecoh baca (angka dan jenis tertukar)`);
    cek(pe.benar === String(g) && pe.tanya.includes(`${r.a} : ${r.b}`), `Mesin ${r.id}: pembagi ${g} (FPB mandiri)`);
    sama(sortir(pe.opsi), sortir([g, g * 2, g + 1]), `Mesin ${r.id}: pengecoh pembagi`);
    cek(ha.benar === hasil && ha.tanya.includes(`${r.a} : ${r.b}`) && !ha.tanya.includes(hasil), `Mesin ${r.id}: hasil ${hasil}, kunci tidak dibocorkan`);
    sama(sortir(ha.opsi), sortir([hasil, `${r.a / g} : ${r.b}`, `${r.a} : ${r.b / g}`]), `Mesin ${r.id}: pengecoh hasil (hanya satu suku dibagi)`);
    cek(setaraMandiri(r.a / g, r.b / g, r.a, r.b) && fpbMandiri(r.a / g, r.b / g) === 1, `Mesin ${r.id}: hasil setara lewat perkalian silang dan paling sederhana`);
    cek(c.ringkas.includes(`${r.a} : ${r.b}`) && c.ringkas.includes(hasil) && c.ringkas.includes(`dibagi ${g}`), `Mesin ${r.id}: ringkas memuat langkah dan hasil`);
  }
}

/* ------------------------------ Skenario ------------------------------ */
{
  const S = SK.SKENARIO_K6B2A;
  cek(S.adegan.length >= 5 && S.adegan.length <= 8, `${S.id}: 5 sampai 8 adegan`);
  cek(S.adegan[0].jenis === "narasi" && S.adegan[S.adegan.length - 1].jenis === "akhir", `${S.id}: buka dan tutup`);
  cek(new Set(S.adegan.map((a) => a.jenis)).size >= 4, `${S.id}: paling sedikit empat jenis adegan`);
  const semuaTeks = [];
  for (const a of S.adegan) {
    semuaTeks.push(a.cerita);
    for (const o of a.opsi ?? []) semuaTeks.push(o.teks, o.umpan);
    for (const q of a.soal ?? []) semuaTeks.push(q.teks, ...q.opsi);
    for (const f of ["tanya", "sukses", "salah", "kurang", "lebih"]) if (a[f]) semuaTeks.push(a[f]);
  }
  cek(semuaTeks.every(tanpaAngka), `${S.id}: semua teks dapat dieja`);
  sama(S.id.replace(/-k6b2$/, ""), K2.ID_SKENARIO_K6B2.A, "id skenario sesuai id misi");
  const adegan = (id) => S.adegan.find((a) => a.id === id);
  const bahasa = adegan("bahasa");
  const kb = bahasa.opsi.filter((o) => o.benar);
  cek(kb.length === 1 && kb[0].teks === "Setiap 4 pucuk merah ada 6 cemara" && bahasa.cerita.includes("4 : 6") && bahasa.opsi.length === 3 && new Set(bahasa.opsi.map((o) => o.teks)).size === 3, "bahasa: 4 : 6 dibaca setiap 4 pucuk merah ada 6 cemara");
  const hitung = adegan("hitung");
  cek(hitung.jumlah === 4 && hitung.jumlah <= 12 && hitung.objek === "stik" && hitung.sukses.includes("4 pucuk merah dan 6 cemara") && hitung.sukses.includes("4 : 6"), "hitung: ketuk 4 stik, rasio 4 : 6");
  const sederhana = adegan("sederhana");
  cek(sederhana.soal[0].jawaban === String(4 / fpbMandiri(4, 6)) && sederhana.soal[0].teks.includes(`FPB ${fpbMandiri(4, 6)}`) && sederhana.soal[1].jawaban === String(9 / fpbMandiri(6, 9)) && sederhana.soal[1].teks.includes(`FPB ${fpbMandiri(6, 9)}`), "sederhana: 4 : 6 FPB 2 suku kiri 2, dan 6 : 9 FPB 3 suku kanan 3 (FPB mandiri)");
  cek(sederhana.sukses.includes("4 : 6 = 2 : 3") && sederhana.sukses.includes("6 : 9 = 2 : 3"), "sederhana: kalimat sukses memuat dua hasil");
  for (const q of sederhana.soal) cek(q.opsi.length === 3 && q.opsi.filter((o) => o === q.jawaban).length === 1 && new Set(q.opsi).size === 3, `soal "${q.teks}": tiga pilihan satu kunci`);
  const kelompok = adegan("kelompok");
  cek(kelompok.target === 2 && kelompok.maks > kelompok.target && kelompok.objek === "stik" && kelompok.cerita.includes("2 : 3") && kelompok.sukses.includes("2 pucuk merah") && kelompok.sukses.includes("3 cemara"), "kelompok: 2 stik untuk rasio 2 : 3");
  const arah = adegan("arah");
  const ab = arah.opsi.filter((o) => o.benar);
  cek(ab.length === 1 && ab[0].teks.startsWith("3 : 2") && arah.cerita.includes("2 : 3") && arah.opsi.length === 3, "arah: cemara terhadap pucuk merah 3 : 2");
  const salah = adegan("salah");
  cek(salah.opsi.filter((o) => o.benar).length === 1 && salah.opsi.find((o) => o.benar).teks.includes("berbeda makna") && salah.cerita.includes("2 : 3") && salah.cerita.includes("3 : 2"), "salah: arah diabaikan");
  const posisi = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
  cek(new Set(posisi).size === posisi.length, `letak jawaban pilih bervariasi (${posisi.join("")})`);
  const ps = sederhana.soal.map((q) => q.opsi.indexOf(q.jawaban));
  cek(ps.every((p) => p >= 0) && new Set(ps).size === ps.length, `letak jawaban soal sederhana bervariasi (${ps.join("")})`);
  cek(S.adegan.filter((a) => a.jenis === "pilih").every((a) => a.opsi.length === 3 && a.opsi.filter((o) => o.benar).length === 1), "setiap pilih: tiga opsi, satu benar");
  const metode = S.adegan.map((a) => a.cerita).join(" ");
  cek(/Part-to-Part Ratio Language/.test(metode) && /GCF Simplify Ratio/.test(metode) && /Ordered-Ratio Protocol/.test(metode), "skenario memuat tiga metode luar berlabel");
}

/* ------------------------------ Misi ------------------------------ */
{
  sama(Object.keys(TK.MISI_K6B2), ["A", "B", "C"], "teks misi untuk A, B, dan C");
  sama(Object.keys(TK.NAMA_SIM_K6B2), ["A", "B", "C"], "nama simulasi untuk A, B, dan C");
  cek(TK.hurufK6B2("Z") === "A" && TK.hurufK6B2("A") === "A", "huruf tak dikenal jatuh ke A");
  cek(TK.misiAwalK6Bab2("A").startsWith("Simulasi 1. Misi: ") && tanpaAngka(TK.misiAwalK6Bab2("A")), "misi awal dan dapat dieja");
  const daftar = K2.daftarMisiK6Bab2("A");
  cek(K2.daftarMisiK6Bab2("Z") === K2.MISI_A, "huruf tak dikenal memakai misi A");
  cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, "A: tujuh misi wajib dan tiga tantangan bebas");
  cek(new Set(daftar.map((m) => m.id)).size === 10 && daftar.every((m) => m.id.startsWith("a-")), "A: id misi unik berawalan huruf");
  const kosong = [{ alat: "rasio", pernah: [] }, { alat: "lain", pernah: [] }, sel("tidak-ada"), A.keadaanRasioK6B2A(A.awalRasioK6B2A())];
  cek(kosong.every((k) => M0.misiBaru(daftar, k, new Set()).length === 0), "A: keadaan awal alat tidak memenuhi misi mana pun");
  cek(daftar.every((m) => m.teks.length > 20 && tanpaAngka(m.teks)), "A: teks misi jelas dan dapat dieja");
  const baru = (k) => M0.misiBaru(daftar, k, new Set());
  cek(baru(sel(K2.ID_MESIN_K6B2.A)).join() === "a-mesin" && baru(sel(K2.ID_SKENARIO_K6B2.A)).join() === "a-skenario", "A: id mesin dan skenario memenuhi misinya");
  cek(baru({ alat: "lain", pernah: ["tulis:0", "tulis:1", "sederhana:0", "sederhana:1", "arah:0"] }).length === 0, "A: riwayat alat lain tidak memenuhi misi A");
  const capai = (aksi) => baru(A.keadaanRasioK6B2A(jalan(A.awalRasioK6B2A(), L, aksi)));
  const sem = [0, 1, 2, 3, 4, 5];

  cek(capai(seqTulis(0)).join() === "a-tulis", "A: Tulis 4 : 6 memenuhi a-tulis");
  cek(capai(seqTulis(1)).join() === "a-tulis-kecil", "A: Tulis 2 : 3 memenuhi a-tulis-kecil");
  cek(capai([...seqTulis(0), ...seqTulis(1)]).join() === "a-tulis,a-tulis-kecil", "A: dua soal Tulis memenuhi dua misi");
  cek(capai([...seqTulis(2), ...seqTulis(3)]).length === 0, "A: Tulis soal lain tidak memenuhi misi wajib");
  cek(capai(seqTulis(0, 1 + 4 + 6 + 1)).length === 0, "A: Tulis sampai rasio saja belum memenuhi");
  cek(capai(seqTulis(0, 1 + 4 + 6)).length === 0, "A: Tulis dengan benda lengkap tanpa rasio belum memenuhi");
  cek(capai([{ t: "T_DATA", i: 0 }, { t: "T_RASIO", o: A.opsiRasioTulis(0).benar }, { t: "T_KALIMAT", o: A.opsiKalimatTulis(0).benar }]).length === 0, "A: Tulis tanpa menghitung benda tidak memenuhi");
  cek(capai([...seqTulis(0, 1 + 4 + 6 + 1), { t: "T_KALIMAT", o: (A.opsiKalimatTulis(0).benar + 1) % 3 }]).length === 0, "A: Tulis dengan kalimat salah tidak memenuhi");
  cek(capai([...seqTulis(0, 1 + 4 + 6), { t: "T_RASIO", o: (A.opsiRasioTulis(0).benar + 1) % 3 }, { t: "T_KALIMAT", o: A.opsiKalimatTulis(0).benar }]).length === 0, "A: Tulis dengan rasio salah lalu kalimat benar tidak memenuhi");
  cek(capai([...seqTulis(0, 1 + 4 + 5), { t: "T_RASIO", o: A.opsiRasioTulis(0).benar }, { t: "T_KALIMAT", o: A.opsiKalimatTulis(0).benar }]).length === 0, "A: Tulis dengan benda kurang satu tidak memenuhi");

  cek(capai(seqSederhana(0)).join() === "a-sederhana", "A: Sederhana 4 : 6 memenuhi a-sederhana");
  cek(capai(seqSederhana(1)).join() === "a-sederhana-sembilan", "A: Sederhana 6 : 9 memenuhi a-sederhana-sembilan");
  cek(capai([...seqSederhana(0), ...seqSederhana(1)]).join() === "a-sederhana,a-sederhana-sembilan", "A: dua soal Sederhana memenuhi dua misi");
  cek(capai([...seqSederhana(2), ...seqSederhana(5)]).length === 0, "A: Sederhana soal lain tidak memenuhi misi wajib");
  for (let s = 1; s < 4; s += 1) cek(capai(seqSederhana(0, s)).length === 0, `A: Sederhana berhenti setelah langkah ${s} belum memenuhi`);
  cek(capai([{ t: "S_DATA", i: 0 }, { t: "S_KIRI", o: A.opsiKiri(0).benar }, { t: "S_KANAN", o: A.opsiKanan(0).benar }]).length === 0, "A: Sederhana tanpa memilih pembagi tidak memenuhi");
  cek(capai([{ t: "S_DATA", i: 0 }, { t: "S_PEMBAGI", o: (A.opsiPembagi(0).benar + 1) % 3 }, { t: "S_KIRI", o: A.opsiKiri(0).benar }, { t: "S_KANAN", o: A.opsiKanan(0).benar }]).length === 0, "A: Sederhana dengan pembagi salah tidak memenuhi");
  cek(capai([...seqSederhana(0, 3), { t: "S_KANAN", o: (A.opsiKanan(0).benar + 1) % 3 }]).length === 0, "A: Sederhana dengan suku kanan salah tidak memenuhi");

  cek(capai(seqArah(0)).join() === "a-arah", "A: Arah 2 : 3 memenuhi a-arah");
  cek(capai(seqArah(1)).length === 0 && capai(seqArah(5)).length === 0, "A: Arah soal lain tidak memenuhi a-arah");
  for (let s = 1; s < 4; s += 1) cek(capai(seqArah(0, s)).length === 0, `A: Arah berhenti setelah langkah ${s} belum memenuhi`);
  cek(capai([{ t: "R_DATA", i: 0 }, { t: "R_BEDA", o: A.opsiBeda(0).benar }]).length === 0, "A: makna tanpa dua rasio tidak memenuhi");
  cek(capai([...seqArah(0, 3), { t: "R_BEDA", o: (A.opsiBeda(0).benar + 1) % 3 }]).length === 0, "A: makna 'sama' tidak memenuhi");

  cek(capai(sem.flatMap((i) => seqTulis(i))).join() === "a-tulis,a-tulis-kecil,a-tulis-semua", "A: keenam Tulis memenuhi dua misi dan tantangan");
  cek(capai([0, 1, 2, 3, 4].flatMap((i) => seqTulis(i))).join() === "a-tulis,a-tulis-kecil", "A: lima Tulis belum memenuhi tantangan");
  cek(capai(sem.flatMap((i) => seqSederhana(i))).join() === "a-sederhana,a-sederhana-sembilan,a-sederhana-semua", "A: keenam Sederhana memenuhi dua misi dan tantangan");
  cek(capai([0, 1, 2, 3, 4].flatMap((i) => seqSederhana(i))).join() === "a-sederhana,a-sederhana-sembilan", "A: lima Sederhana belum memenuhi tantangan");
  cek(capai(sem.flatMap((i) => seqArah(i))).join() === "a-arah,a-arah-semua", "A: keenam Arah memenuhi misi dan tantangan");
  cek(capai([0, 1, 2, 3, 4].flatMap((i) => seqArah(i))).join() === "a-arah", "A: lima Arah belum memenuhi tantangan");
  cek(capai([...seqTulis(3), ...seqSederhana(4), ...seqArah(2)]).length === 0, "A: riwayat pada soal lain, tidak ada misi yang terpenuhi");

  const tampil = M0.tampilMisi(daftar);
  const wajibIds = tampil.filter((m) => m.wajib).map((m) => m.id);
  cek(!M0.wajibSelesai(tampil, new Set(wajibIds.slice(0, 6))), "A: enam dari tujuh wajib belum membuka gerbang");
  cek(M0.wajibSelesai(tampil, new Set(wajibIds)), "A: tujuh wajib membuka gerbang");
  cek(M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: true }) && !M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: false }), "lewati hanya setelah disentuh");
}

/* ------------------------------ Konsep tidak bocor ke Sub-Bab A ------------------------------ */
{
  const baca = (nama, ekstensi) => readFileSync(new URL(`../src/components/modul/${nama}.${ekstensi}`, import.meta.url), "utf8");
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas6-bab2-ringkas.json", import.meta.url), "utf8"));
  const tanpaKomentar = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  const teksDari = (o) => {
    const hasil = [];
    JSON.stringify(o, (k, v) => {
      if (typeof v === "string" && k !== "tipe" && k !== "jenis") hasil.push(v);
      return v;
    });
    return hasil.join(" | ");
  };
  // Sub-Bab A hanya membahas konsep rasio: tulis, baca, sederhana (FPB), dan arah. Tabel rasio, senilai, jembatan pecahan, satuan,
  // harga dan waktu per satuan (Sub-Bab B), serta bagian terhadap keseluruhan, jumlah bagian, dan durasi (Sub-Bab C) belum boleh muncul.
  const BOCOR_A = /(\btabel|senilai|setara|jembatan|\bbridge|\bsatuan|\bharga|\bpaket|unit rate|\bper jam|\bperjam|\bmenit\b|\bjam\b|\bdurasi|\bwaktu|\bkecepatan|\blaju\b|\bbagian\b|keseluruhan|\btotal\b|\bpart-to-whole|additive|equivalent|time-rate|perbesar|perluas|\bskala\b|\bdikali\b|\bkali\b|\bRp\b|\bkm\b|[×÷]|\d\/\d)/i;
  const catat = (teks, apa) => {
    const m = BOCOR_A.exec(teks);
    cek(!m, `A: ${apa} bebas konsep tabel, senilai, satuan, bagian-total, dan waktu (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
  };
  for (const t of [TK.MISI_K6B2.A, TK.NAMA_SIM_K6B2.A, ...K2.MISI_A.map((m) => m.teks)]) catat(t, "teks misi");
  for (const [nama, o] of [["mesin", MS.MESIN_RASIO], ["skenario", SK.SKENARIO_K6B2A], ["peta dan infografis ringkas", ringkas.subBab.A]]) catat(teksDari(o), nama);
  for (const [f, e] of [["SimulasiLabRasioK6B2", "tsx"], ["model-rasio-k6b2", "tsx"], ["lab-rasio-k6b2a", "ts"]]) catat(tanpaKomentar(baca(f, e)).replace(/ ([-=+] |=> )/g, " "), `${f} (tanpa komentar)`);
  for (const p of globalThis.__pesanA) catat(p, "pesan lab dari fuzz");
  for (const u of [A.ucapTulisK6B2A(x0), A.ucapSederhanaK6B2A(x0), A.ucapArahK6B2A(x0)]) catat(u, "ucapan lab");

  for (const f of ["SimulasiLabRasioK6B2", "SimulasiK6Bab2", "model-rasio-k6b2"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s), `${f}: tidak memuat correct_index atau explanation`);
    cek(!/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa jaringan atau model bahasa`);
  }
  for (const f of ["lab-rasio-k6b2a", "mesin-rasio-k6b2", "skenario-k6b2", "misi-k6bab2", "misi-teks-k6b2", "eja-k6b2"]) {
    const s = baca(f, "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: murni`);
    const impor = s.match(/^import .+$/gm) ?? [];
    cek(impor.every((l) => l.startsWith("import type")), `${f}: hanya mengimpor tipe`);
  }
  cek((baca("lab-rasio-k6b2a", "ts").match(/^import /gm) ?? []).length === 0 && (baca("eja-k6b2", "ts").match(/^import /gm) ?? []).length === 0, "lab dan pengeja tanpa impor sama sekali");
  {
    const s = tanpaKomentar(baca("lab-rasio-k6b2a", "ts"));
    cek(!/\.toFixed|parseFloat|Math\.(round|floor|ceil|random)|\d\.\d/.test(s), "logika lab: hanya bilangan bulat");
  }
  {
    const s = baca("SimulasiLabRasioK6B2", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s), "lab: lapor keadaan lewat useEffect");
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), "lab: ganti tampilan mengosongkan pesan");
    const catatan = [...s.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 3 && catatan.every(tanpaAngka), "lab: Coba ini dapat dieja");
    cek(s.includes("aria-label={`Tambah satu ${tu.ka}`}") && s.includes("aria-label={`Tambah satu ${tu.kb}`}"), "lab: tombol tambah berlabel jenis benda");
    for (const awalan of ["Rasio", "Kalimat", "Pembagi", "Suku kiri", "Suku kanan", "Rasio pertama", "Rasio kedua", "Makna"]) cek(s.includes(`awalan="${awalan}"`), `lab: pilihan berlabel ${awalan}`);
    for (const awalan of ["Pilih soal tulis ", "Pilih soal sederhana ", "Pilih soal arah "]) cek(s.includes(`label={\`${awalan}`), `lab: pilihan soal berlabel ${awalan.trim()}`);
    cek(/lengkapTulis && !x\.tulis\.rasio/.test(s) && /x\.tulis\.rasio && !x\.tulis\.selesai/.test(s), "lab Tulis: kalimat hanya tampil setelah rasio");
    for (const t of [0, 1, 2]) cek(new RegExp(`x\\.sederhana\\.tahap === ${t} \\?`).test(s) && new RegExp(`x\\.arah\\.tahap === ${t} \\?`).test(s), `lab Sederhana dan Arah: pertanyaan tahap ${t}`);
    for (const aksi of ["T_DATA", "T_TAMBAH_A", "T_TAMBAH_B", "T_RASIO", "T_KALIMAT", "S_DATA", "S_PEMBAGI", "S_KIRI", "S_KANAN", "R_DATA", "R_PERTAMA", "R_BALIK", "R_BEDA", "RESET"]) cek(s.includes(`t: "${aksi}"`), `lab: aksi ${aksi} terhubung ke tombol`);
    cek(/role="img"/.test(s), "lab: persamaan berlabel bacaan");
    const m = baca("model-rasio-k6b2", "tsx");
    cek(/role="img"/.test(m) && /aria-label=\{`\$\{ka\} \$\{na\} dari/.test(m), "model: gambar benda berlabel");
    cek(m.includes("flex-wrap") && !/\bw-\[\d{3,}px\]/.test(m), "model: titik membungkus baris, tanpa lebar tetap besar");
  }
  const pembungkus = baca("SimulasiK6Bab2", "tsx");
  cek(/eja=\{ejaK6B2\}/.test(pembungkus), "pembungkus: mesin dieja ejaK6B2");
  const coba = [...pembungkus.matchAll(/"([^"]*\?)"/g)].map((m) => m[1]);
  cek(coba.length >= 3 && coba.every(tanpaAngka), "Coba ini mesin dapat dieja");
  const ucapan = [];
  for (let i = 0; i < 6; i += 1) ucapan.push(A.ucapTulisK6B2A(L(x0, { t: "T_DATA", i })), A.ucapSederhanaK6B2A(L(x0, { t: "S_DATA", i })), A.ucapArahK6B2A(L(x0, { t: "R_DATA", i })));
  cek(ucapan.length === 18 && ucapan.every(tanpaAngka), `semua ${ucapan.length} ucapan lab dieja menjadi kata`);
  cek(ucapan.every((u) => /banding|terhadap/.test(EJ.ejaK6B2(u))), "ucapan lab memuat kata banding atau terhadap");
}

/* ============================== Sub-Bab B: Lab Senilai ============================== */
{
  const LB = B.langkahSenilaiK6B2B;
  const xb0 = B.awalSenilaiK6B2B();
  globalThis.__pesanB = [];
  const rpMandiri = (n) => `Rp${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  const bagiMandiri = (a, b) => {
    for (let u = 0; u <= a; u += 1) if (u * b === a) return u;
    return -1;
  };
  const RT = [
    { a: 10, b: 12, k: 5 },
    { a: 5, b: 6, k: 5 },
    { a: 2, b: 3, k: 4 },
    { a: 3, b: 4, k: 3 },
    { a: 1, b: 2, k: 6 },
    { a: 4, b: 10, k: 3 },
  ];
  const RJ = [
    { a: 10, b: 12, m: 3 },
    { a: 5, b: 6, m: 2 },
    { a: 2, b: 3, m: 5 },
    { a: 3, b: 5, m: 4 },
    { a: 1, b: 2, m: 6 },
    { a: 4, b: 10, m: 5 },
  ];
  const RS = [
    { a: 40000, b: 5, jenis: "rupiah", ka: "", kb: "bibit", t: 3, p: 9000 },
    { a: 12, b: 3, jenis: "benda", ka: "bibit", kb: "jam", t: 4, p: 3 },
    { a: 32000, b: 4, jenis: "rupiah", ka: "", kb: "bibit", t: 6, p: 7000 },
    { a: 42000, b: 6, jenis: "rupiah", ka: "", kb: "bibit", t: 4, p: 8000 },
    { a: 18, b: 6, jenis: "benda", ka: "pot", kb: "jam", t: 5, p: 4 },
    { a: 60000, b: 3, jenis: "rupiah", ka: "", kb: "kg", t: 5, p: 25000 },
  ];
  const nil = (r, v) => (r.jenis === "rupiah" ? rpMandiri(v) : `${v} ${r.ka}`);
  const sederhanaMandiri = (p, q) => {
    const g = fpbMandiri(p, q);
    return `${p / g} : ${q / g}`;
  };
  const banding = (r) => {
    const u = bagiMandiri(r.a, r.b);
    if (r.jenis === "rupiah") return u < r.p ? ["Lebih hemat dari pembanding", "Lebih mahal dari pembanding"] : ["Lebih mahal dari pembanding", "Lebih hemat dari pembanding"];
    return u > r.p ? ["Lebih cepat dari pembanding", "Lebih lambat dari pembanding"] : ["Lebih lambat dari pembanding", "Lebih cepat dari pembanding"];
  };
  // Tiap tampilan: awalan aksi, fungsi pilihan, kunci mandiri per tahap, dan id riwayat.
  const TAMPIL = [
    {
      nama: "tabel", data: "TB_DATA", kunci: "tabel", aksi: ["TB_PENGALI", "TB_ISI", "TB_CEK"], offset: [0, 1, 2],
      opsi: [B.opsiPengali, B.opsiIsi, B.opsiCekTabel],
      kunciMandiri: (i) => [`kali ${RT[i].k}`, RT[i].b * RT[i].k, sederhanaMandiri(RT[i].a * RT[i].k, RT[i].b * RT[i].k)],
      himpunan: (i) => {
        const r = RT[i];
        const x = r.a * r.k;
        const g = fpbMandiri(x, r.b * r.k);
        return [
          [`kali ${r.k}`, `tambah ${x - r.a}`, `bagi ${r.k}`],
          [r.b * r.k, r.b + (x - r.a), r.b * (r.k + 1)],
          [`${x / g} : ${(r.b * r.k) / g}`, `${x} : ${r.b * r.k}`, `${(r.b * r.k) / g} : ${x / g}`],
        ];
      },
      tahapState: (s) => s.tabel.tahap, dataState: (s) => s.tabel.data,
    },
    {
      nama: "jembatan", data: "JM_DATA", kunci: "jembatan", aksi: ["JM_SENILAI", "JM_PENGALI", "JM_SILANG"], offset: [0, 1, 2],
      opsi: [B.opsiSenilai, B.opsiPengaliJ, B.opsiSilang],
      kunciMandiri: (i) => {
        const r = RJ[i];
        return [`${r.a * r.m}/${r.b * r.m}`, `kali ${r.m}`, `${r.a} × ${r.b * r.m} = ${r.a * r.b * r.m} dan ${r.b} × ${r.a * r.m} = ${r.b * r.a * r.m}, sama`];
      },
      himpunan: (i) => {
        const r = RJ[i];
        const c = r.a * r.m;
        const d = r.b * r.m;
        return [
          [`${c}/${d}`, `${r.a + r.m}/${r.b + r.m}`, `${d}/${c}`],
          [`kali ${r.m}`, `tambah ${r.m}`, `bagi ${r.m}`],
          [`${r.a} × ${d} = ${r.a * d} dan ${r.b} × ${c} = ${r.b * c}, sama`, `${r.a} × ${c} = ${r.a * c} dan ${r.b} × ${d} = ${r.b * d}, beda`, `${r.a} + ${d} = ${r.a + d} dan ${r.b} + ${c} = ${r.b + c}, belum tentu sama`],
        ];
      },
      tahapState: (s) => s.jembatan.tahap, dataState: (s) => s.jembatan.data,
    },
    {
      nama: "satuan", data: "ST_DATA", kunci: "satuan", aksi: ["ST_SATUAN", "ST_TARGET", "ST_BANDING"], offset: [0, 1, 2],
      opsi: [B.opsiSatuan, B.opsiTarget, B.opsiBanding],
      kunciMandiri: (i) => {
        const r = RS[i];
        const u = bagiMandiri(r.a, r.b);
        return [nil(r, u), nil(r, u * r.t), banding(r)[0]];
      },
      himpunan: (i) => {
        const r = RS[i];
        const u = bagiMandiri(r.a, r.b);
        return [[nil(r, u), nil(r, r.a), nil(r, r.b)], [nil(r, u * r.t), nil(r, r.a * r.t), nil(r, u + r.t)], [banding(r)[0], banding(r)[1], "Sama saja dengan pembanding"]];
      },
      tahapState: (s) => s.satuan.tahap, dataState: (s) => s.satuan.data,
    },
  ];
  const seq = (v, i, sampai = 99) => {
    const kunci = v.kunciMandiri(i);
    return [{ t: v.data, i }, ...v.aksi.map((t, s) => ({ t, o: idx(v.opsi[s](i).opsi, kunci[s]) }))].slice(0, sampai);
  };
  const seqTb = (i, s) => seq(TAMPIL[0], i, s);
  const seqJm = (i, s) => seq(TAMPIL[1], i, s);
  const seqSt = (i, s) => seq(TAMPIL[2], i, s);
  const catatB = (s) => globalThis.__pesanB.push(s.pesan);

  // Data dan opsi sama dengan rencana mandiri.
  sama(B.SOAL_TABEL.map((s) => [s.a, s.b, s.k]), RT.map((r) => [r.a, r.b, r.k]), "enam soal Tabel sesuai rencana");
  sama(B.SOAL_JEMBATAN.map((s) => [s.a, s.b, s.m]), RJ.map((r) => [r.a, r.b, r.m]), "enam soal Jembatan sesuai rencana");
  sama(B.SOAL_SATUAN.map((s) => [s.a, s.b, s.jenis, s.ka, s.kb, s.t, s.pembanding]), RS.map((r) => [r.a, r.b, r.jenis, r.ka, r.kb, r.t, r.p]), "enam soal Satuan sesuai rencana");
  cek(RS.every((r) => bagiMandiri(r.a, r.b) > 0 && r.a % r.b === 0 && bagiMandiri(r.a, r.b) !== r.p), "Satuan: nilai satuan bulat dan beda dari pembanding");
  cek(B.SOAL_TABEL.every((s) => s.k >= 2) && B.SOAL_JEMBATAN.every((s) => s.m >= 2), "Tabel dan Jembatan: pengali paling sedikit dua");
  cek(new Set(B.SOAL_TABEL.map((s) => s.nama)).size === 6 && new Set(B.SOAL_JEMBATAN.map((s) => s.nama)).size === 6 && new Set(B.SOAL_SATUAN.map((s) => s.nama)).size === 6, "B: nama soal unik");
  cek(B.SOAL_SATUAN.some((s) => s.jenis === "rupiah") && B.SOAL_SATUAN.some((s) => s.jenis === "benda"), "Satuan: ada soal rupiah dan soal benda per jam");
  let okRp = true;
  for (const n of [0, 5, 50, 500, 5000, 8000, 12500, 40000, 100000, 300000, 999000, 1234567]) if (B.rp(n) !== rpMandiri(n)) okRp = false;
  cek(okRp, "format rupiah sama dengan format mandiri (regex titik ribuan)");
  for (let i = 0; i < 6; i += 1) {
    const r = RJ[i];
    const c = r.a * r.m;
    const d = r.b * r.m;
    cek(setaraMandiri(r.a, r.b, c, d) && !setaraMandiri(r.a, r.b, r.a + r.m, r.b + r.m) && !setaraMandiri(r.a, r.b, d, c), `Jembatan ${i}: hanya pecahan senilai yang setara lewat perkalian silang`);
    const t = RT[i];
    cek(setaraMandiri(t.a, t.b, t.a * t.k, t.b * t.k) && !setaraMandiri(t.a, t.b, t.a + (t.a * t.k - t.a), t.b + (t.a * t.k - t.a)) || t.a === t.b, `Tabel ${i}: tambah selisih sama tidak senilai`);
    for (const [v, nm] of TAMPIL.map((v2) => [v2, v2.nama])) {
      const himp = v.himpunan(i);
      for (let s = 0; s < 3; s += 1) {
        const p = v.opsi[s](i);
        sama(sortir(p.opsi), sortir(himp[s]), `${nm} ${i}: himpunan pilihan tahap ${s}`);
        cek(new Set(p.opsi).size === 3 && p.opsi[p.benar] === v.kunciMandiri(i)[s], `${nm} ${i}: tiga pilihan unik dan kunci tahap ${s} benar`);
      }
    }
  }
  for (const v of TAMPIL) {
    for (let s = 0; s < 3; s += 1) {
      const l = [0, 1, 2, 3, 4, 5].map((i) => v.opsi[s](i).benar);
      cek(new Set(l).size === 3, `letak kunci ${v.nama}/${s} bervariasi (${l.join("")})`);
      sama(l, [0, 1, 2, 3, 4, 5].map((i) => posisiRotasi(i, v.offset[s])), `letak kunci eksak ${v.nama}/${s}`);
    }
  }

  // Urutan benar, penolakan, dan keadaan untuk tiap tampilan dan soal.
  cek(JSON.stringify(B.keadaanSenilaiK6B2B(xb0)) === JSON.stringify({ alat: "senilai", pernah: [] }) && xb0.tabel.tahap === 0 && xb0.jembatan.tahap === 0 && xb0.satuan.tahap === 0 && xb0.pesan === "" && xb0.pernah.length === 0, "B awal: kosong");
  for (const v of TAMPIL) {
    for (let i = 0; i < 6; i += 1) {
      const urut = seq(v, i);
      let x = xb0;
      const rekam = [];
      for (const a of urut) {
        x = LB(x, a);
        catatB(x);
        rekam.push(x);
      }
      cek(x.pernah.join() === `${v.kunci}:${i}` && v.tahapState(x) === 3, `${v.nama} ${i}: urutan benar menambah ${v.kunci}:${i}`);
      cek(!rekam.slice(0, -1).some((s) => s.pernah.length > 0), `${v.nama} ${i}: riwayat baru muncul di langkah terakhir`);
      cek(rekam.slice(1).every((s) => s.pesan.startsWith("✅")), `${v.nama} ${i}: semua pesan langkah benar diawali centang`);
      for (let s = 0; s < 3; s += 1) {
        const awal = jalan(xb0, LB, urut.slice(0, 1 + s));
        cek(v.tahapState(awal) === s, `${v.nama} ${i}: awal tahap ${s}`);
        for (let o = 0; o < 3; o += 1) {
          const y = LB(awal, { t: v.aksi[s], o });
          const benar = v.opsi[s](i).opsi[o] === v.kunciMandiri(i)[s];
          if (benar) cek(v.tahapState(y) === s + 1 && y.pesan.startsWith("✅"), `${v.nama} ${i}/${v.aksi[s]}: pilihan ${o} benar maju`);
          else cek(v.tahapState(y) === s && y.pernah.length === 0 && !y.pesan.startsWith("✅") && y.pesan.length > 20, `${v.nama} ${i}/${v.aksi[s]}: pilihan ${o} salah ditolak`);
          catatB(y);
        }
        for (let s2 = 0; s2 < 3; s2 += 1) {
          if (s2 === s) continue;
          const y = LB(awal, { t: v.aksi[s2], o: 0 });
          if (s2 < s) cek(y === awal, `${v.nama} ${i}: ${v.aksi[s2]} yang sudah lewat tidak mengubah apa pun`);
          else {
            cek(v.tahapState(y) === s && y.pernah.length === 0 && y.pesan.length > 10 && !y.pesan.startsWith("✅"), `${v.nama} ${i}: ${v.aksi[s2]} sebelum waktunya ditolak di tahap ${s}`);
            catatB(y);
          }
        }
      }
      const sudah = x;
      cek(v.aksi.every((t) => LB(sudah, { t, o: 1 }) === sudah), `${v.nama} ${i}: setelah selesai, aksi lanjutan tidak mengubah`);
    }
    const y = jalan(xb0, LB, [...seq(v, 0), { t: v.data, i: 3 }]);
    cek(v.dataState(y) === 3 && v.tahapState(y) === 0 && y.pernah.join() === `${v.kunci}:0` && y.pesan === "", `${v.nama}: ganti soal mengosongkan tahap, riwayat tetap`);
  }
  // Pesan akhir memuat hasil mandiri.
  {
    const a0 = seqTb(0);
    const rekam = a0.map((_, n) => jalan(xb0, LB, a0.slice(0, n + 1)));
    cek(rekam[1].pesan.includes("10 menjadi 50 dengan dikali 5"), "Tabel 0: pesan pengali memuat 10 menjadi 50 dikali 5");
    cek(rekam[2].pesan.includes("12 × 5 = 60") && rekam[2].pesan.includes("50 m² lahan : 60 bibit"), "Tabel 0: pesan isi memuat 12 × 5 = 60 dan baris baru");
    cek(rekam[3].pesan.includes("10 : 12 dan 50 : 60 sama-sama menjadi 5 : 6"), "Tabel 0: pesan akhir memuat 5 : 6 (sederhana mandiri)");
    cek(LB(jalan(xb0, LB, seqTb(0, 1)), { t: "TB_PENGALI", o: idx(B.opsiPengali(0).opsi, "tambah 40") }).pesan.includes("bukan menambah"), "Tabel 0: pengecoh tambah ditolak dengan alasan");
    const j = seqJm(0).map((_, n) => jalan(xb0, LB, seqJm(0).slice(0, n + 1)));
    cek(j[1].pesan.includes("10/12 senilai dengan 30/36") && j[2].pesan.includes("10 × 3 = 30 dan 12 × 3 = 36") && j[3].pesan.includes("360") && j[3].pesan.includes("10/12 = 30/36"), "Jembatan 0: pesan 30/36, pengali 3, dan perkalian silang 360");
    const s0 = seqSt(0).map((_, n) => jalan(xb0, LB, seqSt(0).slice(0, n + 1)));
    cek(s0[1].pesan.includes("Rp40.000 untuk 5 bibit sama dengan Rp8.000 per bibit") && s0[2].pesan.includes("Rp24.000") && s0[3].pesan.includes("lebih hemat dari pembanding"), "Satuan 0: pesan Rp8.000, target Rp24.000, dan lebih hemat");
    const s3 = seqSt(3).map((_, n) => jalan(xb0, LB, seqSt(3).slice(0, n + 1)));
    cek(s3[1].pesan.includes("Rp7.000 per bibit") && s3[2].pesan.includes("Rp28.000"), "Satuan 3: pesan Rp7.000 dan target Rp28.000");
    const s1 = seqSt(1).map((_, n) => jalan(xb0, LB, seqSt(1).slice(0, n + 1)));
    cek(s1[1].pesan.includes("4 bibit per jam") && s1[2].pesan.includes("16 bibit") && s1[3].pesan.includes("lebih cepat dari pembanding"), "Satuan 1: 4 bibit per jam, 16 bibit, lebih cepat");
  }
  // Indeks pecahan dan di luar batas diabaikan.
  const asing = [
    { t: "TB_DATA", i: -1 }, { t: "TB_DATA", i: 6 }, { t: "TB_DATA", i: 1.5 }, { t: "TB_DATA", i: NaN }, { t: "TB_DATA", i: "1" },
    { t: "JM_DATA", i: -1 }, { t: "JM_DATA", i: 6 }, { t: "JM_DATA", i: 0.5 }, { t: "ST_DATA", i: -2 }, { t: "ST_DATA", i: 99 }, { t: "ST_DATA", i: 2.2 },
    ...["TB_PENGALI", "TB_ISI", "TB_CEK", "JM_SENILAI", "JM_PENGALI", "JM_SILANG", "ST_SATUAN", "ST_TARGET", "ST_BANDING"].flatMap((t) => [-1, 3, 7, 0.5, NaN, "1", null, undefined].map((o) => ({ t, o }))),
  ];
  const siapB = jalan(xb0, LB, [...seqTb(2, 2), ...seqJm(1, 2), ...seqSt(0, 3)]);
  for (const a of asing) cek(JSON.stringify(LB(siapB, a)) === JSON.stringify(siapB), `B: aksi asing diabaikan: ${JSON.stringify(a)}`);
  cek((() => { try { LB(siapB, { t: "TIDAK_ADA" }); return true; } catch { return false; } })(), "B: aksi tak dikenal tidak melempar kesalahan");
  sama(LB(siapB, { t: "RESET" }), xb0, "B: RESET kembali ke awal");
  const sudahTb = jalan(xb0, LB, seqTb(0));
  cek(LB(sudahTb, { t: "PESAN_KOSONG" }).pesan === "" && LB(sudahTb, { t: "PESAN_KOSONG" }).pernah.length === 1, "B: PESAN_KOSONG hanya mengosongkan pesan");

  // Fuzz 20.000 aksi dengan orakel mandiri.
  {
    const acak = acakDari(20261114);
    const o = { tabel: { data: 0, tahap: 0 }, jembatan: { data: 0, tahap: 0 }, satuan: { data: 0, tahap: 0 }, pernah: new Set() };
    const KEY = ["tabel", "jembatan", "satuan"];
    let x = xb0;
    const acakAksi = () => {
      const semuaAksi = [...TAMPIL.flatMap((v) => [v.data, ...v.aksi]), "PESAN_KOSONG", "RESET"];
      const t = semuaAksi[acak(semuaAksi.length)];
      if (TAMPIL.some((v) => v.data === t)) return { t, i: [0, 1, 2, 3, 4, 5, -1, 6, 2.5, NaN][acak(10)] };
      if (t === "RESET" && acak(8) !== 0) return { t: "PESAN_KOSONG" };
      return { t, o: [0, 1, 2, 0, 1, 2, -1, 3, 1.5, NaN, 99][acak(11)] };
    };
    const benarBerikut = (k) => {
      const v = TAMPIL[k];
      const i = o[KEY[k]].data;
      const tahap = o[KEY[k]].tahap;
      if (tahap >= 3) return { t: v.data, i: acak(6) };
      return { t: v.aksi[tahap], o: idx(v.opsi[tahap](i).opsi, v.kunciMandiri(i)[tahap]) };
    };
    const terapkan = (a) => {
      const sebelum = new Set(o.pernah);
      const sahI = (i) => Number.isInteger(i) && i >= 0 && i < 6;
      const sahO = (w) => Number.isInteger(w) && w >= 0 && w < 3;
      if (a.t === "RESET") {
        for (const k of KEY) o[k] = { data: 0, tahap: 0 };
        o.pernah = new Set();
      } else {
        for (const [k, v] of TAMPIL.entries()) {
          const key = KEY[k];
          if (a.t === v.data) {
            if (sahI(a.i)) o[key] = { data: a.i, tahap: 0 };
          } else {
            const s = v.aksi.indexOf(a.t);
            if (s >= 0 && sahO(a.o) && o[key].tahap === s && v.opsi[s](o[key].data).opsi[a.o] === v.kunciMandiri(o[key].data)[s]) {
              o[key].tahap = s + 1;
              if (s === 2) o.pernah.add(`${v.kunci}:${o[key].data}`);
            }
          }
        }
      }
      return [...o.pernah].filter((w) => !sebelum.has(w));
    };
    let ok = true;
    let maks = 0;
    const selesaiPer = { tabel: 0, jembatan: 0, satuan: 0 };
    for (let n = 0; n < 20000 && ok; n += 1) {
      const a = acak(10) < 5 ? benarBerikut(acak(3)) : acakAksi();
      const baru = terapkan(a);
      const sebelumPernah = x.pernah.length;
      x = LB(x, a);
      globalThis.__pesanB.push(x.pesan);
      if (a.t === "RESET") ok = ok && x.pernah.length === 0 && x.pesan === "";
      else cek(x.pernah.length >= sebelumPernah, `fuzz B ${n}: riwayat tidak dicabut`);
      const cocok = KEY.every((k) => x[k].data === o[k].data && x[k].tahap === o[k].tahap) && JSON.stringify([...x.pernah].sort()) === JSON.stringify([...o.pernah].sort());
      if (!cocok) {
        ok = false;
        console.log("fuzz B beda dari orakel di langkah", n, JSON.stringify(a), JSON.stringify(x), JSON.stringify({ ...o, pernah: [...o.pernah] }));
      }
      if (baru.length > 0) {
        cek(x.pesan.startsWith("✅"), `fuzz B ${n}: id baru ${baru.join()} diawali pesan sukses`);
        selesaiPer[baru[0].split(":")[0]] += 1;
      }
      cek(KEY.every((k) => x[k].tahap >= 0 && x[k].tahap <= 3) && typeof x.pesan === "string", `fuzz B ${n}: batas terjaga`);
      maks = Math.max(maks, x.pernah.length);
    }
    cek(ok, "fuzz B 20.000 aksi: keadaan sama dengan orakel mandiri");
    cek(selesaiPer.tabel > 10 && selesaiPer.jembatan > 10 && selesaiPer.satuan > 10, `fuzz B: tiap tampilan selesai berkali-kali (${selesaiPer.tabel}, ${selesaiPer.jembatan}, ${selesaiPer.satuan})`);
    cek(maks >= 6 && x.pernah.every((w) => /^(tabel|jembatan|satuan):[0-5]$/.test(w)), `fuzz B: riwayat mencapai ${maks} dan semua id sah`);
  }

  // Mesin B.
  {
    const def = MB.MESIN_SENILAI;
    cek(def.stasiun.length === 4 && def.kasus.length === 3, `${def.id}: empat stasiun, tiga kasus`);
    sama(def.stasiun.map((s) => s.id), ["pengali", "isi", "senilai", "satuan"], "stasiun mesin B");
    const posisi = [];
    for (const kasus of def.kasus) {
      cek(kasus.langkah.length === 4, `${def.id}/${kasus.id}: empat langkah`);
      kasus.langkah.forEach((l, i) => {
        cek(l.stasiun === def.stasiun[i].id, `${def.id}/${kasus.id}: langkah ${i + 1} di stasiun ${def.stasiun[i].id}`);
        cek(l.opsi.length === 3 && new Set(l.opsi).size === 3 && l.opsi.filter((w) => w === l.benar).length === 1, `${def.id}/${kasus.id}/${l.stasiun}: tiga pilihan unik, satu kunci`);
        cek([l.tanya, l.petunjuk, ...l.opsi].every(tanpaAngka), `${def.id}/${kasus.id}/${l.stasiun}: dapat dieja`);
        posisi.push(l.opsi.indexOf(l.benar));
      });
      cek(tanpaAngka(kasus.nama) && tanpaAngka(kasus.ringkas), `${def.id}/${kasus.id}: nama dan ringkas dapat dieja`);
    }
    cek(new Set(posisi).size === 3, `${def.id}: letak kunci bervariasi (${posisi.join("")})`);
    for (let s = 0; s < 4; s += 1) cek(new Set(def.kasus.map((k) => k.langkah[s].opsi.indexOf(k.langkah[s].benar))).size >= 2, `${def.id}: letak kunci stasiun ${def.stasiun[s].id} bervariasi antar kasus`);
    for (const [s, offset] of [[0, 0], [1, 1], [2, 2], [3, 3]]) sama(def.kasus.map((k) => k.langkah[s].opsi.indexOf(k.langkah[s].benar)), [0, 1, 2].map((i) => posisiRotasi(i, offset)), `${def.id}: letak kunci eksak stasiun ${def.stasiun[s].id}`);
    let x = ME.awalMesin(def);
    let n = 0;
    while (!x.selesai && n < 100) {
      n += 1;
      const l = ME.langkahAktif(x);
      x = l ? ME.langkahMesin(x, { t: "JAWAB", nilai: l.benar }) : ME.langkahMesin(x, { t: "LANJUT" });
    }
    cek(x.selesai && def.selesaiId === K2.ID_MESIN_K6B2.B, `${def.id}: bisa diselesaikan, id selesai sesuai misi`);
    const y = ME.awalMesin(def);
    const l0 = ME.langkahAktif(y);
    const z = ME.langkahMesin(y, { t: "JAWAB", nilai: l0.opsi.find((w) => w !== l0.benar) });
    cek(z.ke === 0 && z.ditolak === 1 && z.pesan === l0.petunjuk, `${def.id}: jawaban salah ditolak dengan petunjuk`);
    const RM = [
      { id: "lahan", a: 10, b: 12, k: 5, p: 10, q: 12, r: 30, s: 36, a2: 40000, w: 5, jenis: "rupiah", benda: "" },
      { id: "kopi", a: 5, b: 6, k: 5, p: 1, q: 2, r: 4, s: 10, a2: 12, w: 3, jenis: "benda", benda: "bibit" },
      { id: "adonan", a: 2, b: 3, k: 4, p: 2, q: 3, r: 8, s: 12, a2: 60000, w: 3, jenis: "rupiah", benda: "" },
    ];
    sama(MB.KASUS_SENILAI.map((k) => [k.id, k.a, k.b, k.k, k.p, k.q, k.r, k.s, k.a2, k.w, k.jenis, k.benda]), RM.map((r) => [r.id, r.a, r.b, r.k, r.p, r.q, r.r, r.s, r.a2, r.w, r.jenis, r.benda]), "Mesin B: data tiga kasus sesuai rencana");
    for (const [i, r] of RM.entries()) {
      const [pe, isi, se, sa] = def.kasus[i].langkah;
      const x2 = r.a * r.k;
      cek(pe.benar === `dikali ${r.k}` && pe.tanya.includes(`menjadi ${x2}`) && !pe.tanya.includes(`dikali ${r.k}`), `Mesin B ${r.id}: pengali dikali ${r.k}, kunci tidak dibocorkan`);
      sama(sortir(pe.opsi), sortir([`dikali ${r.k}`, `ditambah ${x2 - r.a}`, `dibagi ${r.k}`]), `Mesin B ${r.id}: pengecoh pengali (tambah dan bagi)`);
      cek(isi.benar === String(r.b * r.k), `Mesin B ${r.id}: isi ${r.b * r.k}`);
      sama(sortir(isi.opsi), sortir([r.b * r.k, r.b + (x2 - r.a), r.b * (r.k + 1)]), `Mesin B ${r.id}: pengecoh isi`);
      const senilai = r.p * r.s === r.q * r.r;
      cek(se.benar === (senilai ? "Senilai, perkalian silang sama" : "Tidak senilai, perkalian silang berbeda") && !se.tanya.includes(se.benar), `Mesin B ${r.id}: ${senilai ? "senilai" : "tidak senilai"} lewat perkalian silang mandiri`);
      sama(sortir(se.opsi), sortir(["Senilai, perkalian silang sama", "Tidak senilai, perkalian silang berbeda", "Senilai, karena angkanya sama-sama naik"]), `Mesin B ${r.id}: pilihan senilai`);
      const u = bagiMandiri(r.a2, r.w);
      const f = (v) => (r.jenis === "rupiah" ? rpMandiri(v) : `${v} ${r.benda}`);
      cek(sa.benar === f(u), `Mesin B ${r.id}: nilai satuan ${f(u)} (hitungan mandiri)`);
      sama(sortir(sa.opsi), sortir([f(u), f(r.a2), f(r.w)]), `Mesin B ${r.id}: pengecoh satuan`);
      cek(def.kasus[i].ringkas.includes(`${r.a} : ${r.b} dikali ${r.k} menjadi ${x2} : ${r.b * r.k}`) && def.kasus[i].ringkas.includes(f(u)), `Mesin B ${r.id}: ringkas memuat langkah dan hasil`);
    }
    cek(MB.KASUS_SENILAI.some((k) => k.p * k.s === k.q * k.r) && MB.KASUS_SENILAI.some((k) => k.p * k.s !== k.q * k.r), "Mesin B: ada kasus senilai dan kasus tidak senilai");
  }

  // Skenario B.
  {
    const S = SK.SKENARIO_K6B2B;
    cek(S.adegan.length >= 5 && S.adegan.length <= 8 && S.adegan[0].jenis === "narasi" && S.adegan[S.adegan.length - 1].jenis === "akhir", `${S.id}: 5 sampai 8 adegan, buka dan tutup`);
    cek(new Set(S.adegan.map((a) => a.jenis)).size >= 4, `${S.id}: paling sedikit empat jenis adegan`);
    const semuaTeks = [];
    for (const a of S.adegan) {
      semuaTeks.push(a.cerita);
      for (const w of a.opsi ?? []) semuaTeks.push(w.teks, w.umpan);
      for (const q of a.soal ?? []) semuaTeks.push(q.teks, ...q.opsi);
      for (const fld of ["tanya", "sukses", "salah", "kurang", "lebih"]) if (a[fld]) semuaTeks.push(a[fld]);
    }
    cek(semuaTeks.every(tanpaAngka), `${S.id}: semua teks dapat dieja`);
    sama(S.id.replace(/-k6b2$/, ""), K2.ID_SKENARIO_K6B2.B, "id skenario B sesuai id misi");
    const ad = (id) => S.adegan.find((a) => a.id === id);
    const tabel = ad("tabel");
    const tk = tabel.opsi.filter((w) => w.benar);
    cek(tk.length === 1 && tk[0].teks === `${10 * 5} m² dengan ${12 * 5} bibit` && tabel.opsi.some((w) => w.teks === `${10 + 5} m² dengan ${12 + 5} bibit`) && tabel.opsi.length === 3, "tabel: 10 : 12 dikali 5 = 50 dan 60, pengecoh tambah 5");
    const kel = ad("kelompok");
    cek(kel.jumlah === 5 && kel.jumlah <= 12 && kel.objek === "stik" && kel.sukses.includes("10 : 12 menjadi 50 : 60"), "kelompok: ketuk 5 stik");
    const jem = ad("jembatan");
    cek(jem.soal[0].jawaban === String(12 * 3) && jem.soal[0].teks.includes("(10×3)/(12×3)") && jem.soal[1].jawaban === `${10 / 2}/${12 / 2}`, "jembatan: 10/12 = 30/36 dan 10/12 = 5/6 (FPB 2)");
    for (const q of jem.soal) cek(q.opsi.length === 3 && q.opsi.filter((w) => w === q.jawaban).length === 1 && new Set(q.opsi).size === 3, `soal "${q.teks}": tiga pilihan satu kunci`);
    cek(setaraMandiri(10, 12, 30, 36) && setaraMandiri(10, 12, 5, 6), "jembatan: hasil setara lewat perkalian silang mandiri");
    const sat = ad("satuan");
    const sk = sat.opsi.filter((w) => w.benar);
    cek(sk.length === 1 && sk[0].teks === `${rpMandiri(bagiMandiri(40000, 5))} per bibit` && sat.cerita.includes("Rp40.000") && sat.opsi.length === 3 && new Set(sat.opsi.map((w) => w.teks)).size === 3, "satuan: Rp40.000 untuk 5 bibit = Rp8.000 per bibit");
    const kem = ad("kemasan");
    cek(kem.target === bagiMandiri(12, 3) && kem.maks > kem.target && kem.objek === "stik" && kem.sukses.includes("4 bibit per jam") && kem.sukses.includes(`4 × 4 = ${4 * 4}`), "kemasan: 12 bibit dalam 3 jam = 4 per jam, 4 jam = 16");
    const sal = ad("salah");
    cek(sal.opsi.filter((w) => w.benar).length === 1 && sal.opsi.find((w) => w.benar).teks.includes("dikali atau dibagi") && sal.cerita.includes("4 : 6") && sal.cerita.includes("6 : 8") && sal.opsi.find((w) => w.benar).umpan.includes("8 : 12 (dikali 2), bukan 6 : 8"), "salah: menambah tidak menjaga rasio, 4 : 6 senilai 8 : 12");
    cek(setaraMandiri(4, 6, 8, 12) && !setaraMandiri(4, 6, 6, 8), "salah: 8 : 12 setara dan 6 : 8 tidak setara lewat perkalian silang");
    const posisi = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((w) => w.benar));
    cek(new Set(posisi).size === posisi.length, `letak jawaban pilih bervariasi (${posisi.join("")})`);
    const ps = jem.soal.map((q) => q.opsi.indexOf(q.jawaban));
    cek(ps.every((p) => p >= 0) && new Set(ps).size === ps.length, `letak jawaban soal jembatan bervariasi (${ps.join("")})`);
    cek(S.adegan.filter((a) => a.jenis === "pilih").every((a) => a.opsi.length === 3 && a.opsi.filter((w) => w.benar).length === 1), "setiap pilih: tiga opsi, satu benar");
    const metode = S.adegan.map((a) => a.cerita).join(" ");
    cek(/Equivalent Ratio Table/.test(metode) && /Fraction-Equivalence Bridge/.test(metode) && /Unit Rate Method/.test(metode), "skenario B memuat tiga metode luar berlabel");
  }

  // Misi B.
  {
    const daftar = K2.daftarMisiK6Bab2("B");
    cek(K2.daftarMisiK6Bab2("B") === K2.MISI_B, "huruf B memakai misi B");
    cek(TK.hurufK6B2("B") === "B" && TK.misiAwalK6Bab2("B").startsWith("Simulasi 1. Misi: ") && tanpaAngka(TK.misiAwalK6Bab2("B")) && tanpaAngka(TK.NAMA_SIM_K6B2.B), "misi awal B dan dapat dieja");
    cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, "B: tujuh misi wajib dan tiga tantangan bebas");
    cek(new Set(daftar.map((m) => m.id)).size === 10 && daftar.every((m) => m.id.startsWith("b-")), "B: id misi unik berawalan huruf");
    const kosong = [{ alat: "senilai", pernah: [] }, { alat: "lain", pernah: [] }, sel("tidak-ada"), B.keadaanSenilaiK6B2B(xb0), { alat: "rasio", pernah: ["tabel:0", "tabel:1", "jembatan:0", "satuan:0", "satuan:2", "satuan:3"] }];
    cek(kosong.every((k) => M0.misiBaru(daftar, k, new Set()).length === 0), "B: keadaan awal dan riwayat alat lain tidak memenuhi misi mana pun");
    cek(daftar.every((m) => m.teks.length > 20 && tanpaAngka(m.teks)), "B: teks misi jelas dan dapat dieja");
    const baru = (k) => M0.misiBaru(daftar, k, new Set());
    cek(baru(sel(K2.ID_MESIN_K6B2.B)).join() === "b-mesin" && baru(sel(K2.ID_SKENARIO_K6B2.B)).join() === "b-skenario", "B: id mesin dan skenario memenuhi misinya");
    cek(baru(sel(K2.ID_MESIN_K6B2.A)).length === 0 && baru(sel(K2.ID_SKENARIO_K6B2.A)).length === 0, "B: id mesin dan skenario A tidak memenuhi misi B");
    const capai = (aksi) => baru(B.keadaanSenilaiK6B2B(jalan(B.awalSenilaiK6B2B(), LB, aksi)));
    const sem = [0, 1, 2, 3, 4, 5];
    cek(capai(seqTb(0)).join() === "b-tabel", "B: Tabel 10 : 12 memenuhi b-tabel");
    cek(capai(seqTb(1)).join() === "b-tabel-petak", "B: Tabel 5 : 6 memenuhi b-tabel-petak");
    cek(capai([...seqTb(0), ...seqTb(1)]).join() === "b-tabel,b-tabel-petak", "B: dua soal Tabel memenuhi dua misi");
    cek(capai([...seqTb(2), ...seqTb(5)]).length === 0, "B: Tabel soal lain tidak memenuhi misi wajib");
    for (let s = 1; s < 4; s += 1) cek(capai(seqTb(0, s)).length === 0 && capai(seqTb(1, s)).length === 0, `B: Tabel berhenti setelah langkah ${s} belum memenuhi`);
    cek(capai([{ t: "TB_DATA", i: 0 }, { t: "TB_ISI", o: B.opsiIsi(0).benar }, { t: "TB_CEK", o: B.opsiCekTabel(0).benar }]).length === 0, "B: Tabel tanpa memilih pengali tidak memenuhi");
    cek(capai([{ t: "TB_DATA", i: 0 }, { t: "TB_PENGALI", o: (B.opsiPengali(0).benar + 1) % 3 }, { t: "TB_ISI", o: B.opsiIsi(0).benar }, { t: "TB_CEK", o: B.opsiCekTabel(0).benar }]).length === 0, "B: Tabel dengan pengali tambahan tidak memenuhi");
    cek(capai([...seqTb(0, 3), { t: "TB_CEK", o: (B.opsiCekTabel(0).benar + 1) % 3 }]).length === 0, "B: Tabel dengan hasil sederhana salah tidak memenuhi");
    cek(capai(seqJm(0)).join() === "b-jembatan", "B: Jembatan 10/12 memenuhi b-jembatan");
    cek(capai(seqJm(1)).length === 0 && capai(seqJm(5)).length === 0, "B: Jembatan soal lain tidak memenuhi b-jembatan");
    for (let s = 1; s < 4; s += 1) cek(capai(seqJm(0, s)).length === 0, `B: Jembatan berhenti setelah langkah ${s} belum memenuhi`);
    cek(capai([{ t: "JM_DATA", i: 0 }, { t: "JM_SENILAI", o: (B.opsiSenilai(0).benar + 1) % 3 }, { t: "JM_PENGALI", o: B.opsiPengaliJ(0).benar }, { t: "JM_SILANG", o: B.opsiSilang(0).benar }]).length === 0, "B: Jembatan dengan pecahan tambah sama tidak memenuhi");
    cek(capai([...seqJm(0, 3), { t: "JM_SILANG", o: (B.opsiSilang(0).benar + 1) % 3 }]).length === 0, "B: Jembatan dengan perkalian silang salah tidak memenuhi");
    cek(capai(seqSt(0)).join() === "b-satuan", "B: Satuan paket bibit memenuhi b-satuan");
    cek(capai(seqSt(2)).length === 0 && capai(seqSt(3)).length === 0, "B: paket A atau paket B saja belum memenuhi b-hemat");
    cek(capai([...seqSt(2), ...seqSt(3)]).join() === "b-hemat", "B: paket A dan paket B memenuhi b-hemat");
    cek(capai([...seqSt(0), ...seqSt(2), ...seqSt(3)]).join() === "b-satuan,b-hemat", "B: tiga soal Satuan memenuhi dua misi");
    cek(capai([...seqSt(1), ...seqSt(4), ...seqSt(5)]).length === 0, "B: Satuan soal lain tidak memenuhi misi wajib");
    for (let s = 1; s < 4; s += 1) cek(capai(seqSt(0, s)).length === 0, `B: Satuan berhenti setelah langkah ${s} belum memenuhi`);
    cek(capai([...seqSt(0, 3), { t: "ST_BANDING", o: (B.opsiBanding(0).benar + 1) % 3 }]).length === 0, "B: Satuan dengan perbandingan salah tidak memenuhi");
    cek(capai([{ t: "ST_DATA", i: 0 }, { t: "ST_TARGET", o: B.opsiTarget(0).benar }, { t: "ST_BANDING", o: B.opsiBanding(0).benar }]).length === 0, "B: Satuan tanpa nilai satuan tidak memenuhi");
    cek(capai(sem.flatMap((i) => seqTb(i))).join() === "b-tabel,b-tabel-petak,b-tabel-semua", "B: keenam Tabel memenuhi dua misi dan tantangan");
    cek(capai([0, 1, 2, 3, 4].flatMap((i) => seqTb(i))).join() === "b-tabel,b-tabel-petak", "B: lima Tabel belum memenuhi tantangan");
    cek(capai(sem.flatMap((i) => seqJm(i))).join() === "b-jembatan,b-jembatan-semua", "B: keenam Jembatan memenuhi misi dan tantangan");
    cek(capai([0, 1, 2, 3, 4].flatMap((i) => seqJm(i))).join() === "b-jembatan", "B: lima Jembatan belum memenuhi tantangan");
    cek(capai(sem.flatMap((i) => seqSt(i))).join() === "b-satuan,b-hemat,b-satuan-semua", "B: keenam Satuan memenuhi dua misi dan tantangan");
    cek(capai([0, 1, 2, 3, 4].flatMap((i) => seqSt(i))).join() === "b-satuan,b-hemat", "B: lima Satuan belum memenuhi tantangan");
    cek(capai([...seqTb(3), ...seqJm(2), ...seqSt(4)]).length === 0, "B: riwayat pada soal lain, tidak ada misi yang terpenuhi");
    const tampil = M0.tampilMisi(daftar);
    const wajibIds = tampil.filter((m) => m.wajib).map((m) => m.id);
    cek(!M0.wajibSelesai(tampil, new Set(wajibIds.slice(0, 6))) && M0.wajibSelesai(tampil, new Set(wajibIds)), "B: tujuh wajib membuka gerbang, enam belum");
  }

  // Konsep Sub-Bab C tidak bocor ke Sub-Bab B, dan kebersihan berkas.
  {
    const baca = (nama, ekstensi) => readFileSync(new URL(`../src/components/modul/${nama}.${ekstensi}`, import.meta.url), "utf8");
    const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas6-bab2-ringkas.json", import.meta.url), "utf8"));
    const tanpaKomentar = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
    const teksDari = (obj) => {
      const hasil = [];
      JSON.stringify(obj, (k, v) => {
        if (typeof v === "string" && k !== "tipe" && k !== "jenis") hasil.push(v);
        return v;
      });
      return hasil.join(" | ");
    };
    // Sub-Bab B boleh memakai rasio, sederhana, arah (A), tabel, pecahan senilai, dan nilai satuan. Bagian terhadap keseluruhan, jumlah bagian,
    // dan konversi durasi waktu (jam ke menit) milik Sub-Bab C belum boleh muncul.
    const BOCOR_B = /(\bbagian\b|keseluruhan|\btotal\b|part-to-whole|additive|time-rate|\bmenit\b|durasi|konversi|\bwaktu\b|jumlah bagian|a:\(a\+b\)|\d : \d dan \d : \d bagian)/i;
    const catat = (teks, apa) => {
      const m = BOCOR_B.exec(teks);
      cek(!m, `B: ${apa} bebas konsep bagian-total dan durasi waktu (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
    };
    for (const t of [TK.MISI_K6B2.B, TK.NAMA_SIM_K6B2.B, ...K2.MISI_B.map((m) => m.teks)]) catat(t, "teks misi");
    for (const [nama, obj] of [["mesin", MB.MESIN_SENILAI], ["skenario", SK.SKENARIO_K6B2B], ["peta dan infografis ringkas", ringkas.subBab.B]]) catat(teksDari(obj), nama);
    for (const [f, e] of [["SimulasiLabSenilaiK6B2", "tsx"], ["model-senilai-k6b2", "tsx"], ["lab-senilai-k6b2b", "ts"]]) catat(tanpaKomentar(baca(f, e)).replace(/ ([-=+] |=> )/g, " "), `${f} (tanpa komentar)`);
    for (const p of globalThis.__pesanB) catat(p, "pesan lab dari fuzz");
    const ucapan = [];
    for (let i = 0; i < 6; i += 1) ucapan.push(B.ucapTabelK6B2B(LB(xb0, { t: "TB_DATA", i })), B.ucapJembatanK6B2B(LB(xb0, { t: "JM_DATA", i })), B.ucapSatuanK6B2B(LB(xb0, { t: "ST_DATA", i })));
    for (const u of ucapan) catat(u, "ucapan lab");
    cek(ucapan.length === 18 && ucapan.every(tanpaAngka), "B: semua 18 ucapan lab dieja menjadi kata");
    cek(ucapan.filter((u) => /Rp/.test(u)).every((u) => /rupiah/.test(EJ.ejaK6B2(u))), "B: ucapan uang dibaca rupiah");
    for (const f of ["SimulasiLabSenilaiK6B2", "model-senilai-k6b2"]) {
      const s = baca(f, "tsx");
      cek(!/correct_index|explanation/.test(s) && !/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa kunci di klien, tanpa jaringan atau model bahasa`);
    }
    for (const f of ["lab-senilai-k6b2b", "mesin-senilai-k6b2"]) {
      const s = baca(f, "ts");
      cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s) && (s.match(/^import .+$/gm) ?? []).every((l) => l.startsWith("import type")), `${f}: murni dan hanya mengimpor tipe`);
    }
    cek((baca("lab-senilai-k6b2b", "ts").match(/^import /gm) ?? []).length === 0, "lab B tanpa impor sama sekali");
    cek(!/\.toFixed|parseFloat|Math\.(round|floor|ceil|random)|\d\.\d/.test(tanpaKomentar(baca("lab-senilai-k6b2b", "ts"))), "logika lab B: hanya bilangan bulat");
    const s = baca("SimulasiLabSenilaiK6B2", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s) && /setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), "lab B: lapor keadaan dan kosongkan pesan saat ganti tampilan");
    const catatan = [...s.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 3 && catatan.every(tanpaAngka), "lab B: Coba ini dapat dieja");
    for (const awalan of ["Pengali", "Suku kanan", "Bentuk sederhana", "Pecahan senilai", "Perkalian silang", "Nilai satuan", "Nilai target", "Perbandingan"]) cek(s.includes(`awalan="${awalan}"`), `lab B: pilihan berlabel ${awalan}`);
    for (const awalan of ["Pilih soal tabel ", "Pilih soal jembatan ", "Pilih soal satuan "]) cek(s.includes(`label={\`${awalan}`), `lab B: pilihan soal berlabel ${awalan.trim()}`);
    for (const t of [0, 1, 2]) cek(new RegExp(`x\\.tabel\\.tahap === ${t} \\?`).test(s) && new RegExp(`x\\.jembatan\\.tahap === ${t} \\?`).test(s) && new RegExp(`x\\.satuan\\.tahap === ${t} \\?`).test(s), `lab B: pertanyaan tahap ${t} di tiga tampilan`);
    for (const aksi of ["TB_DATA", "TB_PENGALI", "TB_ISI", "TB_CEK", "JM_DATA", "JM_SENILAI", "JM_PENGALI", "JM_SILANG", "ST_DATA", "ST_SATUAN", "ST_TARGET", "ST_BANDING", "RESET"]) cek(s.includes(`t: "${aksi}"`), `lab B: aksi ${aksi} terhubung ke tombol`);
    cek(/role="img"/.test(s) && /role="img"/.test(baca("model-senilai-k6b2", "tsx")), "lab B dan model: gambar berlabel bacaan");
    const pembungkus = baca("SimulasiK6Bab2", "tsx");
    const coba = [...pembungkus.matchAll(/"([^"]*\?)"/g)].map((m) => m[1]);
    cek(/eja=\{ejaK6B2\}/.test(pembungkus) && coba.length >= 6 && coba.every(tanpaAngka), "pembungkus: mesin dieja dan Coba ini mesin A dan B dapat dieja");
    // Ringkas B.
    const B0 = ringkas.subBab.B;
    const [p1, p2, p3] = B0.infografis.panel;
    cek(B0.infografis.panel.length === 3 && p1.butir.length >= 2 && p2.sisi.length >= 2 && p3.butir.length >= 2, "ringkas B: tiga panel dengan isi");
    sama(B0.peta.cabang.map((c) => c.id), ["tabel", "jembatan", "silang", "satuan"], "ringkas B: empat cabang");
    cek(B0.peta.kartu.length === 8 && B0.peta.kartu.every((k) => B0.peta.cabang.some((c) => c.id === k.cabang)) && B0.peta.cabang.every((c) => B0.peta.kartu.filter((k) => k.cabang === c.id).length >= 2), "ringkas B: delapan kartu, tiap cabang dua kartu atau lebih");
    cek([p1.ide, p2.ide, p3.ide].every((t) => t.split(/\s+/).length <= 8) && B0.peta.kartu.every((k) => k.teks.split(/\s+/).length <= 8) && B0.peta.cabang.every((c) => c.ringkas.split(/\s+/).length <= 8), "ringkas B: ide, kartu, dan ringkas cabang paling banyak delapan kata");
    const isi = (panel, id) => (panel.butir ?? panel.sisi).find((b) => b.id === id).visual.isi;
    sama(isi(p1, "awal"), "10 : 12", "ringkas B: baris awal");
    sama(isi(p1, "kali"), `${10 * 5} : ${12 * 5}`, "ringkas B: dikali lima dihitung mandiri");
    sama(isi(p1, "senilai"), `10 : 12 = ${10 / fpbMandiri(10, 12)} : ${12 / fpbMandiri(10, 12)}`, "ringkas B: senilai dihitung mandiri");
    sama(isi(p2, "kali"), `4 : 6 = ${4 * 2} : ${6 * 2}`, "ringkas B: dikali dua");
    sama(isi(p2, "tambah"), `4 : 6 ≠ ${4 + 2} : ${6 + 2}`, "ringkas B: ditambah dua tidak senilai");
    cek(setaraMandiri(4, 6, 8, 12) && !setaraMandiri(4, 6, 6, 8), "ringkas B: kali setara dan tambah tidak setara lewat perkalian silang");
    sama(isi(p3, "harga"), `${rpMandiri(40000)} : 5 = ${rpMandiri(bagiMandiri(40000, 5))}`, "ringkas B: harga satu bibit dihitung mandiri");
    sama(isi(p3, "laju"), `12 : 3 = ${bagiMandiri(12, 3)} per jam`, "ringkas B: bibit per jam dihitung mandiri");
    sama(isi(p3, "hemat"), `${rpMandiri(bagiMandiri(42000, 6))} < ${rpMandiri(bagiMandiri(32000, 4))}`, "ringkas B: paket hemat dihitung mandiri");
  }
}

/* ============================== Sub-Bab C: Lab Bagian ============================== */
{
  const LC = C.langkahBagianK6B2C;
  const xc0 = C.awalBagianK6B2C();
  globalThis.__pesanC = [];
  const bagiMandiri = (a, b) => {
    for (let u = 0; u <= a; u += 1) if (u * b === a) return u;
    return -1;
  };
  const RB = [
    { a: 4, b: 5, total: 72, ka: "bibit hias", kb: "bibit obat" },
    { a: 9, b: 4, total: 390, ka: "anak-anak", kb: "orang dewasa" },
    { a: 3, b: 7, total: 60, ka: "bunga merah", kb: "bunga putih" },
    { a: 2, b: 3, total: 50, ka: "kelereng biru", kb: "kelereng hijau" },
    { a: 5, b: 3, total: 64, ka: "sapi", kb: "kambing" },
    { a: 1, b: 4, total: 35, ka: "kucing", kb: "kelinci" },
  ];
  const RT = RB.map((r) => ({ a: r.a, b: r.b, ka: r.ka, kb: r.kb }));
  const RW = [
    { a: 1, m: 30, satuan: "km", target: 9, durasi: 90 },
    { a: 1200, m: 60, satuan: "kata", target: 3000, durasi: 180 },
    { a: 3, m: 12, satuan: "km", target: 9, durasi: 48 },
    { a: 50, m: 10, satuan: "lembar", target: 200, durasi: 30 },
    { a: 2, m: 20, satuan: "km", target: 6, durasi: 80 },
    { a: 20, m: 5, satuan: "liter", target: 100, durasi: 15 },
  ];
  // Hitungan mandiri waktu: cari bilangan yang memenuhi persamaan, bukan rumus pembagian langsung.
  const lajuM = (r) => {
    for (let v = 1; v <= 100000; v += 1) if (v * r.m === r.a * 60) return v;
    return -1;
  };
  const menitM = (r) => {
    for (let v = 1; v <= 100000; v += 1) if (r.a * v === r.target * r.m) return v;
    return -1;
  };
  const hasilM = (r) => {
    for (let v = 1; v <= 1000000; v += 1) if (v * r.m === r.a * r.durasi) return v;
    return -1;
  };
  const sedikit = (r) => bagiMandiri(r.total, r.a + r.b);
  const kalimatBedaM = (r) => [
    `${r.a} : ${r.b} membandingkan bagian dengan bagian, ${r.a} : ${r.a + r.b} bandingkan bagian dengan seluruhnya`,
    `${r.a} : ${r.b} dan ${r.a} : ${r.a + r.b} bermakna sama`,
    `${r.a + r.b} hanyalah angka cadangan`,
  ];
  const TAMPIL = [
    {
      nama: "bagian", data: "BG_DATA", kunci: "bagian", aksi: ["BG_JUMLAH", "BG_SATU", "BG_KA", "BG_KB"], offset: [0, 1, 2, 0],
      opsi: [C.opsiJumlah, C.opsiSatu, C.opsiKa, C.opsiKb],
      kunciMandiri: (i) => [RB[i].a + RB[i].b, sedikit(RB[i]), sedikit(RB[i]) * RB[i].a, sedikit(RB[i]) * RB[i].b],
      himpunan: (i) => {
        const r = RB[i];
        const u = sedikit(r);
        return [[r.a + r.b, r.a * r.b, r.a], [u, r.total, u * 2], [u * r.a, u + r.a, u * r.b], [u * r.b, u + r.b, u * r.a]];
      },
      tahapState: (s) => s.bagian.tahap, dataState: (s) => s.bagian.data,
    },
    {
      nama: "total", data: "TT_DATA", kunci: "total", aksi: ["TT_KA", "TT_KB", "TT_BEDA"], offset: [0, 1, 2],
      opsi: [C.opsiTotalKa, C.opsiTotalKb, C.opsiBedaTotal],
      kunciMandiri: (i) => [`${RT[i].a} : ${RT[i].a + RT[i].b}`, `${RT[i].b} : ${RT[i].a + RT[i].b}`, kalimatBedaM(RT[i])[0]],
      himpunan: (i) => {
        const r = RT[i];
        return [[`${r.a} : ${r.a + r.b}`, `${r.a} : ${r.b}`, `${r.a + r.b} : ${r.a}`], [`${r.b} : ${r.a + r.b}`, `${r.b} : ${r.a}`, `${r.a} : ${r.a + r.b}`], kalimatBedaM(r)];
      },
      tahapState: (s) => s.total.tahap, dataState: (s) => s.total.data,
    },
    {
      nama: "waktu", data: "WK_DATA", kunci: "waktu", aksi: ["WK_JAM", "WK_LAJU", "WK_TARGET", "WK_DURASI"], offset: [0, 1, 2, 0],
      opsi: [C.opsiJam, C.opsiLaju, C.opsiTargetWaktu, C.opsiDurasi],
      kunciMandiri: (i) => [60, lajuM(RW[i]), menitM(RW[i]), hasilM(RW[i])],
      himpunan: (i) => {
        const r = RW[i];
        const mn = menitM(r);
        const h = hasilM(r);
        return [[60, 100, 30], [lajuM(r), r.a * r.m, r.a + 60], [mn, r.target, mn + 60], [h, r.a * r.durasi, h + r.a]];
      },
      tahapState: (s) => s.waktu.tahap, dataState: (s) => s.waktu.data,
    },
  ];
  const langkahN = (v) => v.aksi.length;
  const seq = (v, i, sampai = 99) => {
    const kunci = v.kunciMandiri(i);
    return [{ t: v.data, i }, ...v.aksi.map((t, s) => ({ t, o: idx(v.opsi[s](i).opsi, kunci[s]) }))].slice(0, sampai);
  };
  const seqBg = (i, s) => seq(TAMPIL[0], i, s);
  const seqTt = (i, s) => seq(TAMPIL[1], i, s);
  const seqWk = (i, s) => seq(TAMPIL[2], i, s);
  const catatC = (s) => globalThis.__pesanC.push(s.pesan);

  // Data sama dengan rencana mandiri.
  sama(C.SOAL_BAGIAN.map((s) => [s.a, s.b, s.total, s.ka, s.kb]), RB.map((r) => [r.a, r.b, r.total, r.ka, r.kb]), "enam soal Bagian sesuai rencana");
  sama(C.SOAL_TOTAL.map((s) => [s.a, s.b, s.ka, s.kb]), RT.map((r) => [r.a, r.b, r.ka, r.kb]), "enam soal Total sesuai rencana");
  sama(C.SOAL_WAKTU.map((s) => [s.a, s.m, s.satuan, s.target, s.durasi]), RW.map((r) => [r.a, r.m, r.satuan, r.target, r.durasi]), "enam soal Waktu sesuai rencana");
  cek(RB.every((r) => sedikit(r) > 0 && r.total % (r.a + r.b) === 0 && r.a !== r.b), "Bagian: seluruhnya habis dibagi jumlah suku dan suku berbeda");
  cek(RW.every((r) => lajuM(r) > 0 && menitM(r) > 0 && hasilM(r) > 0 && (r.a * 60) % r.m === 0 && (r.target * r.m) % r.a === 0 && (r.a * r.durasi) % r.m === 0 && 60 % r.m === 0 && r.durasi % r.m === 0), "Waktu: laju, menit, dan hasil bulat; 60 dan durasi habis dibagi menit dasar");
  cek(new Set(C.SOAL_BAGIAN.map((s) => s.nama)).size === 6 && new Set(C.SOAL_TOTAL.map((s) => s.nama)).size === 6 && new Set(C.SOAL_WAKTU.map((s) => s.nama)).size === 6, "C: nama soal unik");
  cek(C.SOAL_WAKTU.some((s) => s.satuan === "km") && C.SOAL_WAKTU.some((s) => s.satuan === "kata"), "Waktu: ada soal km dan soal kata");
  for (let i = 0; i < 6; i += 1) {
    const r = RB[i];
    cek(C.satuBagian(C.SOAL_BAGIAN[i]) === sedikit(r) && C.lajuJam(C.SOAL_WAKTU[i]) === lajuM(RW[i]) && C.menitTarget(C.SOAL_WAKTU[i]) === menitM(RW[i]) && C.hasilDurasi(C.SOAL_WAKTU[i]) === hasilM(RW[i]), `soal ${i}: hitungan kode sama dengan hitungan mandiri`);
    cek(sedikit(r) * r.a + sedikit(r) * r.b === r.total, `Bagian ${i}: dua bagian dijumlah sama dengan seluruhnya`);
    for (const v of TAMPIL) {
      const himp = v.himpunan(i);
      for (let s = 0; s < langkahN(v); s += 1) {
        const p = v.opsi[s](i);
        sama(sortir(p.opsi), sortir(himp[s]), `${v.nama} ${i}: himpunan pilihan tahap ${s}`);
        cek(new Set(p.opsi).size === 3 && p.opsi[p.benar] === v.kunciMandiri(i)[s], `${v.nama} ${i}: tiga pilihan unik dan kunci tahap ${s} benar`);
      }
    }
  }
  for (const v of TAMPIL) {
    for (let s = 0; s < langkahN(v); s += 1) {
      const l = [0, 1, 2, 3, 4, 5].map((i) => v.opsi[s](i).benar);
      sama(l, [0, 1, 2, 3, 4, 5].map((i) => posisiRotasi(i, v.offset[s])), `letak kunci eksak ${v.nama}/${s}`);
      if (!(v.nama === "waktu" && s === 0)) cek(new Set(l).size === 3, `letak kunci ${v.nama}/${s} bervariasi (${l.join("")})`);
    }
  }
  cek(JSON.stringify(C.keadaanBagianK6B2C(xc0)) === JSON.stringify({ alat: "bagian", pernah: [] }) && xc0.bagian.tahap === 0 && xc0.total.tahap === 0 && xc0.waktu.tahap === 0 && xc0.pesan === "" && xc0.pernah.length === 0, "C awal: kosong");

  // Urutan benar, penolakan, dan keadaan.
  for (const v of TAMPIL) {
    const n = langkahN(v);
    for (let i = 0; i < 6; i += 1) {
      const urut = seq(v, i);
      let x = xc0;
      const rekam = [];
      for (const a of urut) {
        x = LC(x, a);
        catatC(x);
        rekam.push(x);
      }
      cek(x.pernah.join() === `${v.kunci}:${i}` && v.tahapState(x) === n, `${v.nama} ${i}: urutan benar menambah ${v.kunci}:${i}`);
      cek(!rekam.slice(0, -1).some((s) => s.pernah.length > 0), `${v.nama} ${i}: riwayat baru muncul di langkah terakhir`);
      cek(rekam.slice(1).every((s) => s.pesan.startsWith("✅")), `${v.nama} ${i}: semua pesan langkah benar diawali centang`);
      for (let s = 0; s < n; s += 1) {
        const awal = jalan(xc0, LC, urut.slice(0, 1 + s));
        cek(v.tahapState(awal) === s, `${v.nama} ${i}: awal tahap ${s}`);
        for (let o = 0; o < 3; o += 1) {
          const y = LC(awal, { t: v.aksi[s], o });
          const benar = v.opsi[s](i).opsi[o] === v.kunciMandiri(i)[s];
          if (benar) cek(v.tahapState(y) === s + 1 && y.pesan.startsWith("✅"), `${v.nama} ${i}/${v.aksi[s]}: pilihan ${o} benar maju`);
          else cek(v.tahapState(y) === s && y.pernah.length === 0 && !y.pesan.startsWith("✅") && y.pesan.length > 20, `${v.nama} ${i}/${v.aksi[s]}: pilihan ${o} salah ditolak`);
          catatC(y);
        }
        for (let s2 = 0; s2 < n; s2 += 1) {
          if (s2 === s) continue;
          const y = LC(awal, { t: v.aksi[s2], o: 0 });
          if (s2 < s) cek(y === awal, `${v.nama} ${i}: ${v.aksi[s2]} yang sudah lewat tidak mengubah apa pun`);
          else {
            cek(v.tahapState(y) === s && y.pernah.length === 0 && y.pesan.length > 10 && !y.pesan.startsWith("✅"), `${v.nama} ${i}: ${v.aksi[s2]} sebelum waktunya ditolak di tahap ${s}`);
            catatC(y);
          }
        }
      }
      cek(v.aksi.every((t) => LC(x, { t, o: 1 }) === x), `${v.nama} ${i}: setelah selesai, aksi lanjutan tidak mengubah`);
    }
    const y = jalan(xc0, LC, [...seq(v, 0), { t: v.data, i: 3 }]);
    cek(v.dataState(y) === 3 && v.tahapState(y) === 0 && y.pernah.join() === `${v.kunci}:0` && y.pesan === "", `${v.nama}: ganti soal mengosongkan tahap, riwayat tetap`);
  }
  // Pesan akhir memuat hasil mandiri.
  {
    const pb = (n, i = 0) => jalan(xc0, LC, seqBg(i).slice(0, n + 1));
    cek(pb(1).pesan.includes("4 + 5 = 9 bagian") && pb(2).pesan.includes("72 ÷ 9 = 8") && pb(3).pesan.includes("bibit hias: 4 bagian × 8 = 32") && pb(4).pesan.includes("bibit obat: 5 bagian × 8 = 40") && pb(4).pesan.includes("32 + 40 = 72"), "Bagian 0: pesan 9 bagian, 8 per bagian, 32 dan 40, dan cek 72");
    cek(pb(1, 1).pesan.includes("9 + 4 = 13 bagian") && pb(2, 1).pesan.includes("390 ÷ 13 = 30") && pb(3, 1).pesan.includes("9 bagian × 30 = 270") && pb(4, 1).pesan.includes("4 bagian × 30 = 120"), "Bagian 1: 13 bagian, 30 per bagian, anak 270 dan dewasa 120");
    const pt = (n, i = 0) => jalan(xc0, LC, seqTt(i).slice(0, n + 1));
    cek(pt(1).pesan.includes("ditulis 4 : 9") && pt(2).pesan.includes("5 : 9") && pt(3).pesan.includes("4 : 5 membandingkan bagian dengan bagian") && pt(3).pesan.includes("4 : 9"), "Total 0: 4 : 9, 5 : 9, dan beda dari 4 : 5");
    cek(LC(jalan(xc0, LC, seqTt(0, 1)), { t: "TT_KA", o: idx(C.opsiTotalKa(0).opsi, "4 : 5") }).pesan.includes("seluruhnya"), "Total 0: 4 : 5 ditolak dengan alasan seluruhnya");
    const pw = (n, i = 0) => jalan(xc0, LC, seqWk(i).slice(0, n + 1));
    cek(pw(1).pesan.includes("1 jam = 60 menit") && pw(2).pesan.includes("2 km per jam") && pw(2).pesan.includes("60 ÷ 30 = 2 kali") && pw(3).pesan.includes("9 × 30 ÷ 1 = 270 menit") && pw(4).pesan.includes("90 menit dihasilkan 3 km"), "Waktu 0: 60 menit, 2 km per jam, 270 menit, dan 3 km dalam 90 menit");
    cek(pw(2, 1).pesan.includes("60 ÷ 60 = 1 kali") && pw(3, 1).pesan.includes("150 menit") && pw(4, 1).pesan.includes("180 menit dihasilkan 3600 kata"), "Waktu 1: 3000 kata = 150 menit dan 180 menit = 3600 kata");
    cek(pw(4, 4).pesan.includes("80 menit dihasilkan 8 km") && pw(3, 4).pesan.includes("60 menit"), "Waktu 4: 6 km = 60 menit dan 80 menit = 8 km");
  }
  const asing = [
    { t: "BG_DATA", i: -1 }, { t: "BG_DATA", i: 6 }, { t: "BG_DATA", i: 1.5 }, { t: "BG_DATA", i: NaN }, { t: "BG_DATA", i: "1" },
    { t: "TT_DATA", i: -1 }, { t: "TT_DATA", i: 6 }, { t: "TT_DATA", i: 0.5 }, { t: "WK_DATA", i: -2 }, { t: "WK_DATA", i: 99 }, { t: "WK_DATA", i: 2.2 },
    ...["BG_JUMLAH", "BG_SATU", "BG_KA", "BG_KB", "TT_KA", "TT_KB", "TT_BEDA", "WK_JAM", "WK_LAJU", "WK_TARGET", "WK_DURASI"].flatMap((t) => [-1, 3, 7, 0.5, NaN, "1", null, undefined].map((o) => ({ t, o }))),
  ];
  const siapC = jalan(xc0, LC, [...seqBg(2, 3), ...seqTt(1, 2), ...seqWk(3, 3)]);
  for (const a of asing) cek(JSON.stringify(LC(siapC, a)) === JSON.stringify(siapC), `C: aksi asing diabaikan: ${JSON.stringify(a)}`);
  cek((() => { try { LC(siapC, { t: "TIDAK_ADA" }); return true; } catch { return false; } })(), "C: aksi tak dikenal tidak melempar kesalahan");
  sama(LC(siapC, { t: "RESET" }), xc0, "C: RESET kembali ke awal");
  const sudahBg = jalan(xc0, LC, seqBg(0));
  cek(LC(sudahBg, { t: "PESAN_KOSONG" }).pesan === "" && LC(sudahBg, { t: "PESAN_KOSONG" }).pernah.length === 1, "C: PESAN_KOSONG hanya mengosongkan pesan");

  // Fuzz 20.000 aksi dengan orakel mandiri.
  {
    const acak = acakDari(20261115);
    const KEY = ["bagian", "total", "waktu"];
    const o = { bagian: { data: 0, tahap: 0 }, total: { data: 0, tahap: 0 }, waktu: { data: 0, tahap: 0 }, pernah: new Set() };
    let x = xc0;
    const acakAksi = () => {
      const semuaAksi = [...TAMPIL.flatMap((v) => [v.data, ...v.aksi]), "PESAN_KOSONG", "RESET"];
      const t = semuaAksi[acak(semuaAksi.length)];
      if (TAMPIL.some((v) => v.data === t)) return { t, i: [0, 1, 2, 3, 4, 5, -1, 6, 2.5, NaN][acak(10)] };
      if (t === "RESET" && acak(8) !== 0) return { t: "PESAN_KOSONG" };
      return { t, o: [0, 1, 2, 0, 1, 2, -1, 3, 1.5, NaN, 99][acak(11)] };
    };
    const benarBerikut = (k) => {
      const v = TAMPIL[k];
      const i = o[KEY[k]].data;
      const tahap = o[KEY[k]].tahap;
      if (tahap >= langkahN(v)) return { t: v.data, i: acak(6) };
      return { t: v.aksi[tahap], o: idx(v.opsi[tahap](i).opsi, v.kunciMandiri(i)[tahap]) };
    };
    const terapkan = (a) => {
      const sebelum = new Set(o.pernah);
      const sahI = (i) => Number.isInteger(i) && i >= 0 && i < 6;
      const sahO = (w) => Number.isInteger(w) && w >= 0 && w < 3;
      if (a.t === "RESET") {
        for (const k of KEY) o[k] = { data: 0, tahap: 0 };
        o.pernah = new Set();
      } else {
        for (const [k, v] of TAMPIL.entries()) {
          const key = KEY[k];
          if (a.t === v.data) {
            if (sahI(a.i)) o[key] = { data: a.i, tahap: 0 };
          } else {
            const s = v.aksi.indexOf(a.t);
            if (s >= 0 && sahO(a.o) && o[key].tahap === s && v.opsi[s](o[key].data).opsi[a.o] === v.kunciMandiri(o[key].data)[s]) {
              o[key].tahap = s + 1;
              if (s === langkahN(v) - 1) o.pernah.add(`${v.kunci}:${o[key].data}`);
            }
          }
        }
      }
      return [...o.pernah].filter((w) => !sebelum.has(w));
    };
    let ok = true;
    let maks = 0;
    const selesaiPer = { bagian: 0, total: 0, waktu: 0 };
    for (let n = 0; n < 20000 && ok; n += 1) {
      const a = acak(10) < 5 ? benarBerikut(acak(3)) : acakAksi();
      const baru = terapkan(a);
      const sebelumPernah = x.pernah.length;
      x = LC(x, a);
      globalThis.__pesanC.push(x.pesan);
      if (a.t === "RESET") ok = ok && x.pernah.length === 0 && x.pesan === "";
      else cek(x.pernah.length >= sebelumPernah, `fuzz C ${n}: riwayat tidak dicabut`);
      const cocok = KEY.every((k) => x[k].data === o[k].data && x[k].tahap === o[k].tahap) && JSON.stringify([...x.pernah].sort()) === JSON.stringify([...o.pernah].sort());
      if (!cocok) {
        ok = false;
        console.log("fuzz C beda dari orakel di langkah", n, JSON.stringify(a), JSON.stringify(x), JSON.stringify({ ...o, pernah: [...o.pernah] }));
      }
      if (baru.length > 0) {
        cek(x.pesan.startsWith("✅"), `fuzz C ${n}: id baru ${baru.join()} diawali pesan sukses`);
        selesaiPer[baru[0].split(":")[0]] += 1;
      }
      cek(x.bagian.tahap <= 4 && x.total.tahap <= 3 && x.waktu.tahap <= 4 && typeof x.pesan === "string", `fuzz C ${n}: batas terjaga`);
      maks = Math.max(maks, x.pernah.length);
    }
    cek(ok, "fuzz C 20.000 aksi: keadaan sama dengan orakel mandiri");
    cek(selesaiPer.bagian > 10 && selesaiPer.total > 10 && selesaiPer.waktu > 10, `fuzz C: tiap tampilan selesai berkali-kali (${selesaiPer.bagian}, ${selesaiPer.total}, ${selesaiPer.waktu})`);
    cek(maks >= 6 && x.pernah.every((w) => /^(bagian|total|waktu):[0-5]$/.test(w)), `fuzz C: riwayat mencapai ${maks} dan semua id sah`);
  }

  // Mesin C.
  {
    const def = MC.MESIN_BAGIAN;
    cek(def.stasiun.length === 4 && def.kasus.length === 3, `${def.id}: empat stasiun, tiga kasus`);
    sama(def.stasiun.map((s) => s.id), ["jumlah", "satu", "bagian", "waktu"], "stasiun mesin C");
    const posisi = [];
    for (const kasus of def.kasus) {
      cek(kasus.langkah.length === 4, `${def.id}/${kasus.id}: empat langkah`);
      kasus.langkah.forEach((l, i) => {
        cek(l.stasiun === def.stasiun[i].id, `${def.id}/${kasus.id}: langkah ${i + 1} di stasiun ${def.stasiun[i].id}`);
        cek(l.opsi.length === 3 && new Set(l.opsi).size === 3 && l.opsi.filter((w) => w === l.benar).length === 1, `${def.id}/${kasus.id}/${l.stasiun}: tiga pilihan unik, satu kunci`);
        cek([l.tanya, l.petunjuk, ...l.opsi].every(tanpaAngka), `${def.id}/${kasus.id}/${l.stasiun}: dapat dieja`);
        posisi.push(l.opsi.indexOf(l.benar));
      });
      cek(tanpaAngka(kasus.nama) && tanpaAngka(kasus.ringkas), `${def.id}/${kasus.id}: nama dan ringkas dapat dieja`);
    }
    cek(new Set(posisi).size === 3, `${def.id}: letak kunci bervariasi (${posisi.join("")})`);
    for (let s = 0; s < 4; s += 1) cek(new Set(def.kasus.map((k) => k.langkah[s].opsi.indexOf(k.langkah[s].benar))).size >= 2, `${def.id}: letak kunci stasiun ${def.stasiun[s].id} bervariasi antar kasus`);
    for (const [s, offset] of [[0, 0], [1, 1], [2, 2], [3, 3]]) sama(def.kasus.map((k) => k.langkah[s].opsi.indexOf(k.langkah[s].benar)), [0, 1, 2].map((i) => posisiRotasi(i, offset)), `${def.id}: letak kunci eksak stasiun ${def.stasiun[s].id}`);
    let x = ME.awalMesin(def);
    let n = 0;
    while (!x.selesai && n < 100) {
      n += 1;
      const l = ME.langkahAktif(x);
      x = l ? ME.langkahMesin(x, { t: "JAWAB", nilai: l.benar }) : ME.langkahMesin(x, { t: "LANJUT" });
    }
    cek(x.selesai && def.selesaiId === K2.ID_MESIN_K6B2.C, `${def.id}: bisa diselesaikan, id selesai sesuai misi`);
    const y = ME.awalMesin(def);
    const l0 = ME.langkahAktif(y);
    const z = ME.langkahMesin(y, { t: "JAWAB", nilai: l0.opsi.find((w) => w !== l0.benar) });
    cek(z.ke === 0 && z.ditolak === 1 && z.pesan === l0.petunjuk, `${def.id}: jawaban salah ditolak dengan petunjuk`);
    const RM = [
      { id: "bibit", a: 4, b: 5, total: 72, ka: "bibit hias", kb: "bibit obat", jenis: "laju", wa: 1, wm: 30, satuan: "km", nilai: 0 },
      { id: "pasar", a: 9, b: 4, total: 390, ka: "anak-anak", kb: "orang dewasa", jenis: "target", wa: 1, wm: 30, satuan: "km", nilai: 9 },
      { id: "bunga", a: 3, b: 7, total: 60, ka: "bunga merah", kb: "bunga putih", jenis: "durasi", wa: 1200, wm: 60, satuan: "kata", nilai: 180 },
    ];
    sama(MC.KASUS_BAGIAN.map((k) => [k.id, k.a, k.b, k.total, k.ka, k.kb, k.jenis, k.wa, k.wm, k.satuan, k.nilai]), RM.map((r) => [r.id, r.a, r.b, r.total, r.ka, r.kb, r.jenis, r.wa, r.wm, r.satuan, r.nilai]), "Mesin C: data tiga kasus sesuai rencana");
    for (const [i, r] of RM.entries()) {
      const [ju, sa, ba, wa] = def.kasus[i].langkah;
      const u = sedikit(r);
      cek(ju.benar === String(r.a + r.b) && ju.tanya.includes(`${r.a} : ${r.b}`) && !ju.tanya.includes(`adalah ${r.a + r.b}`), `Mesin C ${r.id}: jumlah bagian ${r.a + r.b}`);
      sama(sortir(ju.opsi), sortir([r.a + r.b, r.a * r.b, r.a]), `Mesin C ${r.id}: pengecoh jumlah`);
      cek(sa.benar === String(u) && sa.tanya.includes(`${r.total}`), `Mesin C ${r.id}: satu bagian ${u} (hitungan mandiri)`);
      sama(sortir(sa.opsi), sortir([u, r.total, u * 2]), `Mesin C ${r.id}: pengecoh satu bagian`);
      cek(ba.benar === String(u * r.a) && ba.tanya.includes(`bernilai ${u}`), `Mesin C ${r.id}: bagian pertama ${u * r.a}`);
      sama(sortir(ba.opsi), sortir([u * r.a, u + r.a, u * r.b]), `Mesin C ${r.id}: pengecoh bagian`);
      const rw = { a: r.wa, m: r.wm, target: r.nilai, durasi: r.nilai };
      const kunciW = r.jenis === "laju" ? lajuM(rw) : r.jenis === "target" ? menitM(rw) : hasilM(rw);
      const salahW = r.jenis === "laju" ? [r.wa, r.wm] : r.jenis === "target" ? [r.nilai, r.wm] : [r.wa, r.nilai];
      cek(wa.benar === String(kunciW), `Mesin C ${r.id}: waktu ${r.jenis} = ${kunciW} (hitungan mandiri)`);
      sama(sortir(wa.opsi), sortir([kunciW, ...salahW]), `Mesin C ${r.id}: pengecoh waktu`);
      cek(def.kasus[i].ringkas.includes(`${r.total} ÷ ${r.a + r.b} = ${u}`) && def.kasus[i].ringkas.includes(`${r.ka} ${u * r.a}`) && def.kasus[i].ringkas.includes(String(kunciW)), `Mesin C ${r.id}: ringkas memuat langkah dan hasil`);
    }
    sama(MC.KASUS_BAGIAN.map((k) => k.jenis), ["laju", "target", "durasi"], "Mesin C: tiga jenis soal waktu");
  }

  // Skenario C.
  {
    const S = SK.SKENARIO_K6B2C;
    cek(S.adegan.length >= 5 && S.adegan.length <= 8 && S.adegan[0].jenis === "narasi" && S.adegan[S.adegan.length - 1].jenis === "akhir", `${S.id}: 5 sampai 8 adegan, buka dan tutup`);
    cek(new Set(S.adegan.map((a) => a.jenis)).size >= 4, `${S.id}: paling sedikit empat jenis adegan`);
    const semuaTeks = [];
    for (const a of S.adegan) {
      semuaTeks.push(a.cerita);
      for (const w of a.opsi ?? []) semuaTeks.push(w.teks, w.umpan);
      for (const q of a.soal ?? []) semuaTeks.push(q.teks, ...q.opsi);
      for (const fld of ["tanya", "sukses", "salah", "kurang", "lebih"]) if (a[fld]) semuaTeks.push(a[fld]);
    }
    cek(semuaTeks.every(tanpaAngka), `${S.id}: semua teks dapat dieja`);
    sama(S.id.replace(/-k6b2$/, ""), K2.ID_SKENARIO_K6B2.C, "id skenario C sesuai id misi");
    const ad = (id) => S.adegan.find((a) => a.id === id);
    const bag = ad("bagian");
    const bk = bag.opsi.filter((w) => w.benar);
    cek(bk.length === 1 && bk[0].teks === `${4 + 5} bagian` && bag.opsi.some((w) => w.teks === `${4 * 5} bagian`) && bag.opsi.length === 3 && new Set(bag.opsi.map((w) => w.teks)).size === 3, "bagian: 4 + 5 = 9 bagian, pengecoh 20");
    const hit = ad("hitung");
    cek(hit.jumlah === 4 + 5 && hit.jumlah <= 12 && hit.objek === "stik" && hit.sukses.includes(`72 ÷ 9 = ${sedikit(RB[0])}`) && hit.sukses.includes(`4 × 8 = ${4 * 8}`) && hit.sukses.includes(`5 × 8 = ${5 * 8}`), "hitung: ketuk 9 stik, 72 ÷ 9 = 8, 32 dan 40");
    const sel2 = ad("seluruh");
    cek(sel2.soal[0].jawaban === String(4 + 5) && sel2.soal[0].teks.includes("4 : 5") && sel2.soal[1].jawaban === String(sedikit(RB[0]) * 4) && sel2.soal[1].teks.includes("8 × 4"), "seluruh: 4 : 9 dan 8 × 4 = 32");
    cek(sel2.sukses.includes("32") && sel2.sukses.includes("4 : 9") && sel2.sukses.includes("4 : 5"), "seluruh: kalimat sukses memuat 4 : 9, 4 : 5, dan 32");
    for (const q of [...sel2.soal, ...ad("waktu").soal]) cek(q.opsi.length === 3 && q.opsi.filter((w) => w === q.jawaban).length === 1 && new Set(q.opsi).size === 3, `soal "${q.teks}": tiga pilihan satu kunci`);
    const pas = ad("pasar");
    const pk = pas.opsi.filter((w) => w.benar);
    const up = sedikit(RB[1]);
    cek(pk.length === 1 && pk[0].teks === `${up * 9} anak-anak` && pas.opsi.some((w) => w.teks === `${up * 4} anak-anak`) && pas.cerita.includes("390") && pk[0].umpan.includes("9 + 4 = 13") && pk[0].umpan.includes("390 ÷ 13 = 30"), "pasar: 9 : 4 total 390, anak-anak 270");
    const jal = ad("jalan");
    cek(jal.target === lajuM(RW[0]) && jal.maks > jal.target && jal.objek === "stik" && jal.sukses.includes("2 km per jam") && jal.cerita.includes("60 menit"), "jalan: 1 km per 30 menit = 2 km per jam");
    const wak = ad("waktu");
    cek(wak.soal[0].jawaban === String(menitM({ a: 1, m: 30, target: 9 })) && wak.soal[0].teks.includes("9 × 30") && wak.soal[1].jawaban === String(hasilM({ a: 1200, m: 60, durasi: 180 })) && wak.soal[1].teks.includes("3 × 1200"), "waktu: 9 km = 270 menit dan 180 menit = 3600 kata (hitungan mandiri)");
    const ps = wak.soal.map((q) => q.opsi.indexOf(q.jawaban));
    cek(ps.every((p) => p >= 0) && new Set(ps).size === ps.length, `letak jawaban soal waktu bervariasi (${ps.join("")})`);
    const ps2 = sel2.soal.map((q) => q.opsi.indexOf(q.jawaban));
    cek(ps2.every((p) => p >= 0) && new Set(ps2).size === ps2.length, `letak jawaban soal seluruh bervariasi (${ps2.join("")})`);
    const posisi = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((w) => w.benar));
    cek(new Set(posisi).size === posisi.length, `letak jawaban pilih bervariasi (${posisi.join("")})`);
    cek(S.adegan.filter((a) => a.jenis === "pilih").every((a) => a.opsi.length === 3 && a.opsi.filter((w) => w.benar).length === 1), "setiap pilih: tiga opsi, satu benar");
    const metode = S.adegan.map((a) => a.cerita).join(" ");
    cek(/Additive Parts Sum/.test(metode) && /Part-to-Whole Ratio/.test(metode) && /Time-Rate Conversion/.test(metode), "skenario C memuat tiga metode luar berlabel");
  }

  // Misi C.
  {
    const daftar = K2.daftarMisiK6Bab2("C");
    cek(K2.daftarMisiK6Bab2("C") === K2.MISI_C, "huruf C memakai misi C");
    cek(TK.hurufK6B2("C") === "C" && TK.misiAwalK6Bab2("C").startsWith("Simulasi 1. Misi: ") && tanpaAngka(TK.misiAwalK6Bab2("C")) && tanpaAngka(TK.NAMA_SIM_K6B2.C), "misi awal C dan dapat dieja");
    cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, "C: tujuh misi wajib dan tiga tantangan bebas");
    cek(new Set(daftar.map((m) => m.id)).size === 10 && daftar.every((m) => m.id.startsWith("c-")), "C: id misi unik berawalan huruf");
    const kosong = [{ alat: "bagian", pernah: [] }, { alat: "lain", pernah: [] }, sel("tidak-ada"), C.keadaanBagianK6B2C(xc0), { alat: "senilai", pernah: ["bagian:0", "bagian:1", "total:0", "waktu:0", "waktu:1"] }];
    cek(kosong.every((k) => M0.misiBaru(daftar, k, new Set()).length === 0), "C: keadaan awal dan riwayat alat lain tidak memenuhi misi mana pun");
    cek(daftar.every((m) => m.teks.length > 20 && tanpaAngka(m.teks)), "C: teks misi jelas dan dapat dieja");
    const baru = (k) => M0.misiBaru(daftar, k, new Set());
    cek(baru(sel(K2.ID_MESIN_K6B2.C)).join() === "c-mesin" && baru(sel(K2.ID_SKENARIO_K6B2.C)).join() === "c-skenario", "C: id mesin dan skenario memenuhi misinya");
    cek(baru(sel(K2.ID_MESIN_K6B2.B)).length === 0 && baru(sel(K2.ID_SKENARIO_K6B2.B)).length === 0, "C: id mesin dan skenario B tidak memenuhi misi C");
    const capai = (aksi) => baru(C.keadaanBagianK6B2C(jalan(C.awalBagianK6B2C(), LC, aksi)));
    const sem = [0, 1, 2, 3, 4, 5];
    cek(capai(seqBg(0)).join() === "c-bagian", "C: Bagian 4 : 5 memenuhi c-bagian");
    cek(capai(seqBg(1)).join() === "c-pasar", "C: Bagian 9 : 4 memenuhi c-pasar");
    cek(capai([...seqBg(0), ...seqBg(1)]).join() === "c-bagian,c-pasar", "C: dua soal Bagian memenuhi dua misi");
    cek(capai([...seqBg(2), ...seqBg(5)]).length === 0, "C: Bagian soal lain tidak memenuhi misi wajib");
    for (let s = 1; s < 5; s += 1) cek(capai(seqBg(0, s)).length === 0 && capai(seqBg(1, s)).length === 0, `C: Bagian berhenti setelah langkah ${s} belum memenuhi`);
    cek(capai([{ t: "BG_DATA", i: 0 }, { t: "BG_SATU", o: C.opsiSatu(0).benar }, { t: "BG_KA", o: C.opsiKa(0).benar }, { t: "BG_KB", o: C.opsiKb(0).benar }]).length === 0, "C: Bagian tanpa jumlah bagian tidak memenuhi");
    cek(capai([{ t: "BG_DATA", i: 0 }, { t: "BG_JUMLAH", o: (C.opsiJumlah(0).benar + 1) % 3 }, { t: "BG_SATU", o: C.opsiSatu(0).benar }, { t: "BG_KA", o: C.opsiKa(0).benar }, { t: "BG_KB", o: C.opsiKb(0).benar }]).length === 0, "C: Bagian dengan jumlah bagian dikali tidak memenuhi");
    cek(capai([...seqBg(0, 4), { t: "BG_KB", o: (C.opsiKb(0).benar + 1) % 3 }]).length === 0, "C: Bagian dengan benda kedua salah tidak memenuhi");
    cek(capai(seqTt(0)).join() === "c-total", "C: Total 4 : 9 memenuhi c-total");
    cek(capai(seqTt(1)).length === 0 && capai(seqTt(5)).length === 0, "C: Total soal lain tidak memenuhi c-total");
    for (let s = 1; s < 4; s += 1) cek(capai(seqTt(0, s)).length === 0, `C: Total berhenti setelah langkah ${s} belum memenuhi`);
    cek(capai([...seqTt(0, 3), { t: "TT_BEDA", o: (C.opsiBedaTotal(0).benar + 1) % 3 }]).length === 0, "C: Total dengan penjelasan salah tidak memenuhi");
    cek(capai([{ t: "TT_DATA", i: 0 }, { t: "TT_KA", o: (C.opsiTotalKa(0).benar + 1) % 3 }, { t: "TT_KB", o: C.opsiTotalKb(0).benar }, { t: "TT_BEDA", o: C.opsiBedaTotal(0).benar }]).length === 0, "C: Total dengan 4 : 5 sebagai rasio terhadap seluruhnya tidak memenuhi");
    cek(capai(seqWk(0)).join() === "c-lari", "C: Waktu Banyu memenuhi c-lari");
    cek(capai(seqWk(1)).join() === "c-ketik", "C: Waktu mengetik memenuhi c-ketik");
    cek(capai([...seqWk(0), ...seqWk(1)]).join() === "c-lari,c-ketik", "C: dua soal Waktu memenuhi dua misi");
    cek(capai([...seqWk(2), ...seqWk(5)]).length === 0, "C: Waktu soal lain tidak memenuhi misi wajib");
    for (let s = 1; s < 5; s += 1) cek(capai(seqWk(0, s)).length === 0 && capai(seqWk(1, s)).length === 0, `C: Waktu berhenti setelah langkah ${s} belum memenuhi`);
    cek(capai([{ t: "WK_DATA", i: 0 }, { t: "WK_LAJU", o: C.opsiLaju(0).benar }, { t: "WK_TARGET", o: C.opsiTargetWaktu(0).benar }, { t: "WK_DURASI", o: C.opsiDurasi(0).benar }]).length === 0, "C: Waktu tanpa menyamakan satuan tidak memenuhi");
    cek(capai([...seqWk(0, 4), { t: "WK_DURASI", o: (C.opsiDurasi(0).benar + 1) % 3 }]).length === 0, "C: Waktu dengan hasil durasi salah tidak memenuhi");
    cek(capai(sem.flatMap((i) => seqBg(i))).join() === "c-bagian,c-pasar,c-bagian-semua", "C: keenam Bagian memenuhi dua misi dan tantangan");
    cek(capai([0, 1, 2, 3, 4].flatMap((i) => seqBg(i))).join() === "c-bagian,c-pasar", "C: lima Bagian belum memenuhi tantangan");
    cek(capai(sem.flatMap((i) => seqTt(i))).join() === "c-total,c-total-semua", "C: keenam Total memenuhi misi dan tantangan");
    cek(capai([0, 1, 2, 3, 4].flatMap((i) => seqTt(i))).join() === "c-total", "C: lima Total belum memenuhi tantangan");
    cek(capai(sem.flatMap((i) => seqWk(i))).join() === "c-lari,c-ketik,c-waktu-semua", "C: keenam Waktu memenuhi dua misi dan tantangan");
    cek(capai([0, 1, 2, 3, 4].flatMap((i) => seqWk(i))).join() === "c-lari,c-ketik", "C: lima Waktu belum memenuhi tantangan");
    cek(capai([...seqBg(3), ...seqTt(2), ...seqWk(4)]).length === 0, "C: riwayat pada soal lain, tidak ada misi yang terpenuhi");
    const tampil = M0.tampilMisi(daftar);
    const wajibIds = tampil.filter((m) => m.wajib).map((m) => m.id);
    cek(!M0.wajibSelesai(tampil, new Set(wajibIds.slice(0, 6))) && M0.wajibSelesai(tampil, new Set(wajibIds)), "C: tujuh wajib membuka gerbang, enam belum");
  }

  // Kebersihan berkas, ucapan, tampilan, ringkas, dan pendaftaran bab.
  {
    const baca = (nama, ekstensi) => readFileSync(new URL(`../src/components/modul/${nama}.${ekstensi}`, import.meta.url), "utf8");
    const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas6-bab2-ringkas.json", import.meta.url), "utf8"));
    const tanpaKomentar = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
    const ucapan = [];
    for (let i = 0; i < 6; i += 1) ucapan.push(C.ucapBagianK6B2C(LC(xc0, { t: "BG_DATA", i })), C.ucapTotalK6B2C(LC(xc0, { t: "TT_DATA", i })), C.ucapWaktuK6B2C(LC(xc0, { t: "WK_DATA", i })));
    cek(ucapan.length === 18 && ucapan.every(tanpaAngka), "C: semua 18 ucapan lab dieja menjadi kata");
    cek(ucapan.filter((u) => /\bkm\b/.test(u)).every((u) => /kilometer/.test(EJ.ejaK6B2(u))), "C: ucapan km dibaca kilometer");
    cek(globalThis.__pesanC.every((p) => tanpaAngka(p)), "C: semua pesan lab hasil fuzz dapat dieja");
    for (const f of ["SimulasiLabBagianK6B2", "model-bagian-k6b2"]) {
      const s = baca(f, "tsx");
      cek(!/correct_index|explanation/.test(s) && !/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa kunci di klien, tanpa jaringan atau model bahasa`);
    }
    for (const f of ["lab-bagian-k6b2c", "mesin-bagian-k6b2"]) {
      const s = baca(f, "ts");
      cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s) && (s.match(/^import .+$/gm) ?? []).every((l) => l.startsWith("import type")), `${f}: murni dan hanya mengimpor tipe`);
    }
    cek((baca("lab-bagian-k6b2c", "ts").match(/^import /gm) ?? []).length === 0, "lab C tanpa impor sama sekali");
    cek(!/\.toFixed|parseFloat|Math\.(round|floor|ceil|random)|\d\.\d/.test(tanpaKomentar(baca("lab-bagian-k6b2c", "ts"))), "logika lab C: hanya bilangan bulat");
    const s = baca("SimulasiLabBagianK6B2", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s) && /setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), "lab C: lapor keadaan dan kosongkan pesan saat ganti tampilan");
    const catatan = [...s.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 3 && catatan.every(tanpaAngka), "lab C: Coba ini dapat dieja");
    for (const awalan of ["Jumlah bagian", "Nilai satu bagian", "Benda pertama", "Benda kedua", "Rasio pertama", "Rasio kedua", "Beda", "Menit", "Laju per jam", "Menit untuk target", "Hasil durasi"]) cek(s.includes(`awalan="${awalan}"`), `lab C: pilihan berlabel ${awalan}`);
    for (const awalan of ["Pilih soal bagian ", "Pilih soal total ", "Pilih soal waktu "]) cek(s.includes(`label={\`${awalan}`), `lab C: pilihan soal berlabel ${awalan.trim()}`);
    for (const t of [0, 1, 2]) cek(new RegExp(`x\\.bagian\\.tahap === ${t} \\?`).test(s) && new RegExp(`x\\.total\\.tahap === ${t} \\?`).test(s) && new RegExp(`x\\.waktu\\.tahap === ${t} \\?`).test(s), `lab C: pertanyaan tahap ${t} di tiga tampilan`);
    cek(/x\.bagian\.tahap === 3 \?/.test(s) && /x\.waktu\.tahap === 3 \?/.test(s), "lab C: pertanyaan tahap 3 di Bagian dan Waktu");
    for (const aksi of ["BG_DATA", "BG_JUMLAH", "BG_SATU", "BG_KA", "BG_KB", "TT_DATA", "TT_KA", "TT_KB", "TT_BEDA", "WK_DATA", "WK_JAM", "WK_LAJU", "WK_TARGET", "WK_DURASI", "RESET"]) cek(s.includes(`t: "${aksi}"`), `lab C: aksi ${aksi} terhubung ke tombol`);
    cek(/role="img"/.test(s) && /role="img"/.test(baca("model-bagian-k6b2", "tsx")), "lab C dan model: gambar berlabel bacaan");
    cek(baca("model-bagian-k6b2", "tsx").includes("gridTemplateColumns") && baca("model-bagian-k6b2", "tsx").includes("flex-wrap"), "model C: batang memakai kisi tanpa meluap dan garis waktu membungkus");
    const pembungkus = baca("SimulasiK6Bab2", "tsx");
    const coba = [...pembungkus.matchAll(/"([^"]*\?)"/g)].map((m) => m[1]);
    cek(/eja=\{ejaK6B2\}/.test(pembungkus) && coba.length >= 9 && coba.every(tanpaAngka), "pembungkus: mesin dieja dan Coba ini mesin A, B, dan C dapat dieja");
    cek(/C: \{ id: "bagian", nama: "Lab Bagian" \}/.test(pembungkus) && /huruf === "C"/.test(pembungkus) && /C: SKENARIO_K6B2C/.test(pembungkus) && /C: MESIN_BAGIAN/.test(pembungkus), "pembungkus: sub-bab C terhubung ke lab, mesin, dan skenario");
    // Ringkas C.
    const C0 = ringkas.subBab.C;
    const [p1, p2, p3] = C0.infografis.panel;
    cek(C0.infografis.panel.length === 3 && p1.butir.length >= 2 && p2.sisi.length >= 2 && p3.butir.length >= 2, "ringkas C: tiga panel dengan isi");
    sama(C0.peta.cabang.map((c) => c.id), ["jumlah", "satu", "seluruh", "waktu"], "ringkas C: empat cabang");
    cek(C0.peta.kartu.length === 8 && C0.peta.kartu.every((k) => C0.peta.cabang.some((c) => c.id === k.cabang)) && C0.peta.cabang.every((c) => C0.peta.kartu.filter((k) => k.cabang === c.id).length >= 2), "ringkas C: delapan kartu, tiap cabang dua kartu atau lebih");
    cek([p1.ide, p2.ide, p3.ide].every((t) => t.split(/\s+/).length <= 8) && C0.peta.kartu.every((k) => k.teks.split(/\s+/).length <= 8) && C0.peta.cabang.every((c) => c.ringkas.split(/\s+/).length <= 8), "ringkas C: ide, kartu, dan ringkas cabang paling banyak delapan kata");
    const isi = (panel, id) => (panel.butir ?? panel.sisi).find((b) => b.id === id).visual.isi;
    const uu = sedikit(RB[0]);
    sama(isi(p1, "jumlah"), `4 + 5 = ${4 + 5}`, "ringkas C: jumlah bagian");
    sama(isi(p1, "satu"), `72 ÷ 9 = ${uu}`, "ringkas C: satu bagian dihitung mandiri");
    sama(isi(p1, "hasil"), `${uu * 4} dan ${uu * 5}`, "ringkas C: tiap benda dihitung mandiri");
    sama(isi(p2, "bagian"), "4 : 5", "ringkas C: bagian terhadap bagian");
    sama(isi(p2, "seluruh"), `4 : ${4 + 5}`, "ringkas C: bagian terhadap seluruhnya");
    sama(isi(p3, "jam"), "1 jam = 60 menit", "ringkas C: satu jam");
    sama(isi(p3, "laju"), `1 km : 30 menit = ${lajuM(RW[0])} km per jam`, "ringkas C: laju dihitung mandiri");
    sama(isi(p3, "target"), `9 km = ${menitM(RW[0])} menit`, "ringkas C: target dihitung mandiri");
    cek(JSON.stringify(Object.keys(ringkas.subBab)) === JSON.stringify(["A", "B", "C"]), "ringkas: Sub-Bab A, B, dan C");
    // Pendaftaran bab di registri: tepat tiga kemunculan mtk-6-bab2 (materi, misi awal, ringkas) dan impor yang cocok.
    const reg = readFileSync(new URL("../src/components/modul/registri-simulasi.ts", import.meta.url), "utf8").replace(/\r/g, "");
    cek((reg.match(/"mtk-6-bab2"/g) ?? []).length === 3, "registri: mtk-6-bab2 muncul tiga kali");
    cek(reg.includes('import { misiAwalK6Bab2 } from "@/components/modul/misi-teks-k6b2";') && reg.includes('import ringkasK6B2 from "@/data/kelas6-bab2-ringkas.json";') && reg.includes('const SimulasiK6Bab2Materi = dynamic<SimulasiMateriProps>(() => import("@/components/modul/SimulasiK6Bab2"), { ssr: false });'), "registri: impor teks misi, data ringkas, dan komponen dimuat malas");
    cek(reg.includes('"mtk-6-bab2": SimulasiK6Bab2Materi,') && reg.includes('"mtk-6-bab2": misiAwalK6Bab2,') && reg.includes('"mtk-6-bab2": ringkasK6B2.subBab as unknown as Record<string, RingkasSub>,'), "registri: tiga peta terisi (materi, misi awal, ringkas)");
    const regBab = readFileSync(new URL("../src/components/modul/registri-bab-baru.ts", import.meta.url), "utf8");
    cek((regBab.match(/"mtk-6-bab2"/g) ?? []).length === 1, "registri-bab-baru: mtk-6-bab2 tetap satu kali");
  }
}

/* ------------------------------ Emoji paling tinggi Emoji 12 ------------------------------ */
{
  const berkas = ["SimulasiLabRasioK6B2.tsx", "SimulasiK6Bab2.tsx", "model-rasio-k6b2.tsx", "lab-rasio-k6b2a.ts", "mesin-rasio-k6b2.ts", "skenario-k6b2.ts", "misi-k6bab2.ts", "misi-teks-k6b2.ts", "eja-k6b2.ts", "SimulasiLabSenilaiK6B2.tsx", "model-senilai-k6b2.tsx", "lab-senilai-k6b2b.ts", "mesin-senilai-k6b2.ts", "SimulasiLabBagianK6B2.tsx", "model-bagian-k6b2.tsx", "lab-bagian-k6b2c.ts", "mesin-bagian-k6b2.ts"];
  let ok = true;
  for (const f of berkas) {
    const s = readFileSync(new URL(`../src/components/modul/${f}`, import.meta.url), "utf8");
    cek(s.charCodeAt(0) !== 0xfeff && !s.includes("\r"), `${f}: UTF-8 tanpa BOM dan akhir baris LF`);
    for (const c of s) {
      const k = c.codePointAt(0);
      if (k > 0x1fa95 || k === 0x1f7f0) ok = false;
      if (k === 0x200d) ok = false; // tanpa urutan ZWJ (Emoji 12.1 ke atas)
    }
  }
  const r = readFileSync(new URL("../src/data/kelas6-bab2-ringkas.json", import.meta.url), "utf8");
  for (const c of r) {
    const k = c.codePointAt(0);
    if (k > 0x1fa95 || k === 0x1f7f0 || k === 0x200d) ok = false;
  }
  cek(ok && r.charCodeAt(0) !== 0xfeff && !r.includes("\r"), "emoji paling tinggi Emoji 12 tanpa ZWJ dan data ringkas UTF-8 tanpa BOM");
}

/* ------------------------------ Data ringkas ------------------------------ */
{
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas6-bab2-ringkas.json", import.meta.url), "utf8"));
  cek(ringkas.chapter_id === "mtk-6-bab2" && ringkas.phase_code === "FASE_C" && ringkas.grade === 6, "ringkas: id bab, fase, kelas");
  const A0 = ringkas.subBab.A;
  const [p1, p2, p3] = A0.infografis.panel;
  cek(A0.infografis.panel.length === 3 && p1.butir.length >= 2 && p2.sisi.length >= 2 && p3.butir.length >= 2, "ringkas A: tiga panel dengan isi");
  sama(A0.peta.cabang.map((c) => c.id), ["tulis", "baca", "sederhana", "arah"], "ringkas A: empat cabang");
  cek(A0.peta.kartu.length === 8 && A0.peta.kartu.every((k) => A0.peta.cabang.some((c) => c.id === k.cabang)), "ringkas A: delapan kartu, tiap kartu menunjuk cabang yang ada");
  cek(A0.peta.cabang.every((c) => A0.peta.kartu.filter((k) => k.cabang === c.id).length >= 2), "ringkas A: tiap cabang punya dua kartu atau lebih");
  cek([p1.ide, p2.ide, p3.ide].every((t) => t.split(/\s+/).length <= 8), "ringkas A: ide paling banyak delapan kata");
  cek(A0.peta.kartu.every((k) => k.teks.split(/\s+/).length <= 8) && A0.peta.cabang.every((c) => c.ringkas.split(/\s+/).length <= 8), "ringkas A: teks kartu dan ringkas cabang paling banyak delapan kata");
  const isi = (panel, id) => (panel.butir ?? panel.sisi).find((b) => b.id === id).visual.isi;
  sama(isi(p1, "tulis"), `4 : 6`, "ringkas A: rasio tulis");
  sama(isi(p1, "baca"), "setiap 4 ada 6", "ringkas A: bacaan");
  sama(isi(p2, "pucuk"), "2 : 3", "ringkas A: pucuk terhadap cemara");
  sama(isi(p2, "cemara"), "3 : 2", "ringkas A: cemara terhadap pucuk");
  sama(isi(p3, "fpb"), `FPB 4 dan 6 = ${fpbMandiri(4, 6)}`, "ringkas A: FPB dihitung mandiri");
  sama(isi(p3, "bagi"), `4 : 6 = ${4 / fpbMandiri(4, 6)} : ${6 / fpbMandiri(4, 6)}`, "ringkas A: sederhana dihitung mandiri");
  sama(isi(p3, "sembilan"), `6 : 9 = ${6 / fpbMandiri(6, 9)} : ${9 / fpbMandiri(6, 9)}`, "ringkas A: enam banding sembilan dihitung mandiri");
}

console.log(`\nLulus: ${lulus}, Gagal: ${gagal}`);
if (gagal > 0) process.exit(1);
