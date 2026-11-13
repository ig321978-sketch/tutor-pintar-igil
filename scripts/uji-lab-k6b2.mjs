// Uji Simulasi Kelas 6 Bab 2 (Rasio): Lab Rasio (A), mesin, skenario, misi, gerbang, data ringkas, pengeja,
// dan konsep sub-bab berikutnya tidak bocor ke sub-bab sebelumnya.
// Jalankan: node --no-warnings scripts/uji-lab-k6b2.mjs
import { readFileSync } from "node:fs";
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K2 from "../src/components/modul/misi-k6bab2.ts";
import * as TK from "../src/components/modul/misi-teks-k6b2.ts";
import * as A from "../src/components/modul/lab-rasio-k6b2a.ts";
import * as MS from "../src/components/modul/mesin-rasio-k6b2.ts";
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
  sama(Object.keys(TK.MISI_K6B2), ["A"], "teks misi untuk A");
  sama(Object.keys(TK.NAMA_SIM_K6B2), ["A"], "nama simulasi untuk A");
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

/* ------------------------------ Emoji paling tinggi Emoji 12 ------------------------------ */
{
  const berkas = ["SimulasiLabRasioK6B2.tsx", "SimulasiK6Bab2.tsx", "model-rasio-k6b2.tsx", "lab-rasio-k6b2a.ts", "mesin-rasio-k6b2.ts", "skenario-k6b2.ts", "misi-k6bab2.ts", "misi-teks-k6b2.ts", "eja-k6b2.ts"];
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
  cek(Object.keys(ringkas.subBab).join() === "A", "ringkas: Sub-Bab A (B dan C menyusul)");
}

console.log(`\nLulus: ${lulus}, Gagal: ${gagal}`);
if (gagal > 0) process.exit(1);
