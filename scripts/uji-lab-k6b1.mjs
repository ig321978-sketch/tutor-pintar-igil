// Uji Simulasi Kelas 6 Bab 1 (Pecahan dan Desimal): Lab Kali Pecahan (A), mesin, skenario, misi, gerbang, data ringkas, pengeja,
// dan konsep sub-bab berikutnya tidak bocor ke sub-bab sebelumnya.
// Jalankan: node --no-warnings scripts/uji-lab-k6b1.mjs
import { readFileSync } from "node:fs";
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K1 from "../src/components/modul/misi-k6bab1.ts";
import * as TK from "../src/components/modul/misi-teks-k6b1.ts";
import * as A from "../src/components/modul/lab-kali-k6b1a.ts";
import * as MS from "../src/components/modul/mesin-kali-k6b1.ts";
import * as SK from "../src/components/modul/skenario-k6b1.ts";
import * as ME from "../src/components/modul/mesin-bertahap-k3b1.ts";
import * as EJ from "../src/components/modul/eja-k6b1.ts";
import * as BG from "../src/components/modul/lab-bagi-k6b1b.ts";
import * as MB from "../src/components/modul/mesin-bagi-k6b1.ts";

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
const tanpaAngka = (t) => !/\d/.test(EJ.ejaK6B1(t));
const L = A.langkahKaliK6B1A;
const x0 = A.awalKaliK6B1A();
globalThis.__pesanA = [];

/* ------------------------------ Hitungan MANDIRI (cara berbeda) ------------------------------ */
// Kode memakai gcd dan sisa pembagian. Di sini pecahan disederhanakan dengan mencari penyebut terkecil d yang membuat p*d habis
// oleh q (kesetaraan lewat perkalian silang), dan bilangan dieja per digit dari teks.
const sederhanaMandiri = (p, q) => {
  for (let d = 1; d <= q; d += 1) if ((p * d) % q === 0) return [(p * d) / q, d];
  return [p, q];
};
const teksMandiri = (p, q) => {
  const [a, b] = sederhanaMandiri(p, q);
  return b === 1 ? String(a) : `${a}/${b}`;
};
const setaraMandiri = (a, b, c, d) => a * d === b * c;
const KATA_DIGIT = { 0: "", 1: "satu", 2: "dua", 3: "tiga", 4: "empat", 5: "lima", 6: "enam", 7: "tujuh", 8: "delapan", 9: "sembilan" };
const SATU = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
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

const RENCANA_LUAS = [
  { k: 2, m: 3, n: 5 },
  { k: 5, m: 3, n: 5 },
  { k: 4, m: 2, n: 5 },
  { k: 2, m: 3, n: 4 },
  { k: 3, m: 1, n: 3 },
  { k: 3, m: 2, n: 7 },
];
const RENCANA_PANAH = [
  { w: 2, m: 3, n: 5 },
  { w: 4, m: 2, n: 5 },
  { w: 3, m: 1, n: 3 },
  { w: 5, m: 3, n: 5 },
  { w: 2, m: 3, n: 4 },
  { w: 3, m: 2, n: 7 },
];
const RENCANA_TUKAR = [
  { a: 2, c: 3, b: 15 },
  { a: 1, c: 4, b: 20 },
  { a: 2, c: 5, b: 10 },
  { a: 3, c: 4, b: 8 },
  { a: 1, c: 3, b: 12 },
  { a: 3, c: 5, b: 20 },
];
const opsiMandiriLuasPemb = (r) => [r.k * r.m, r.k + r.m, r.m];
const opsiMandiriLuasPeny = (r) => [r.n, r.k * r.n, r.n + r.k];
const opsiMandiriAsli = (r) => [`${r.w}/1`, `1/${r.w}`, `${r.w}/${r.w}`];
const opsiMandiriAtas = (r) => [r.w * r.m, r.w + r.m, r.m];
const opsiMandiriBawah = (r) => [r.n, r.n + 1, r.w * r.n];
const opsiMandiriRapi = (p, q) => {
  const [a, b] = sederhanaMandiri(p, q);
  if (b === 1) return [String(a), String(p), String(q !== p ? q : a + 1)];
  return [`${a}/${b}`, `${a}/${q}`, `${p}/${b}`];
};
const sortir = (a) => [...a].map(String).sort();

/* ------------------------------ Pengeja ------------------------------ */
{
  sama(EJ.ejaK6B1("3/5"), "tiga per lima", "eja pecahan tiga per lima");
  sama(EJ.ejaK6B1("1/2"), "setengah", "eja setengah");
  sama(EJ.ejaK6B1("1/4"), "seperempat", "eja seperempat");
  sama(EJ.ejaK6B1("3/4"), "tiga perempat", "eja tiga perempat");
  sama(EJ.ejaK6B1("2/3"), "dua per tiga", "eja dua per tiga");
  sama(EJ.ejaK6B1("6/10"), "enam per sepuluh", "eja enam per sepuluh");
  sama(EJ.ejaK6B1("1/3"), "satu per tiga", "eja satu per tiga");
  sama(EJ.ejaK6B1("2 × 3/5 = 6/5"), "dua dikali tiga per lima sama dengan enam per lima", "eja perkalian pecahan");
  sama(EJ.ejaK6B1("2 x 3/5"), "dua dikali tiga per lima", "eja x huruf");
  sama(EJ.ejaK6B1("(2×3)/(1×5) = 6/5"), "kurung buka dua dikali tiga kurung tutup per kurung buka satu dikali lima kurung tutup sama dengan enam per lima", "eja panah lurus tanpa spasi");
  sama(EJ.ejaK6B1("3 : 1/4 = 12"), "tiga dibagi seperempat sama dengan dua belas", "eja bagi");
  sama(EJ.ejaK6B1("0,5"), "nol koma lima", "eja nol koma lima");
  sama(EJ.ejaK6B1("0,50"), "nol koma lima nol", "eja nol koma lima nol");
  sama(EJ.ejaK6B1("2,85"), "dua koma delapan lima", "eja dua koma delapan lima");
  sama(EJ.ejaK6B1("3,7 > 2,9"), "tiga koma tujuh lebih dari dua koma sembilan", "eja banding desimal");
  sama(EJ.ejaK6B1("0,2 < 0,5"), "nol koma dua kurang dari nol koma lima", "eja kurang dari");
  sama(EJ.ejaK6B1("1/2 = 5/10 = 0,5"), "setengah sama dengan lima per sepuluh sama dengan nol koma lima", "eja rantai pecahan desimal");
  sama(EJ.ejaK6B1("petak 3/5 m²."), "petak tiga per lima meter persegi.", "eja m kuadrat");
  sama(EJ.ejaK6B1("2 + 3 − 1"), "dua ditambah tiga dikurangi satu", "eja tambah kurang");
  sama(EJ.ejaK6B1("tidak ada angka."), "tidak ada angka.", "tanpa angka tetap");
  sama(EJ.ejaK6B1("Ya, 5 ember."), "Ya, lima ember.", "koma kalimat tidak jadi desimal");
  sama(EJ.ejaK6B1("979.875"), "sembilan ratus tujuh puluh sembilan ribu delapan ratus tujuh puluh lima", "eja bilangan bertitik");
  sama(EJ.ejaK6B1("15 pohon dan 20 kg"), "lima belas pohon dan dua puluh kg", "eja bilangan biasa");
  cek(!EJ.ejaK6B1("box 3").includes("dikali"), "huruf x di dalam kata bukan tanda kali");
  // Semua bilangan 0 sampai 999.999 sama dengan pembaca per digit mandiri.
  let ok = true;
  for (let n = 1; n <= 999999; n += 1) {
    if (EJ.kataK6B1(n) !== bacaMandiri(n)) {
      ok = false;
      console.log("beda eja", n, EJ.kataK6B1(n), bacaMandiri(n));
      break;
    }
  }
  cek(ok, "kata bilangan 1 sampai 999.999 sama dengan hitungan mandiri per digit");
  cek(EJ.kataK6B1(0) === "nol" && EJ.kataK6B1(-1) === "-1" && EJ.kataK6B1(1.5) === "1.5" && EJ.kataK6B1(1000000) === "1000000", "kata nol dan di luar jangkauan apa adanya");
  // Pecahan: semua a/b dengan 1 <= a,b <= 30 dieja tanpa angka dan memuat "per" (kecuali tiga bentuk lazim).
  let okP = true;
  for (let a = 1; a <= 30; a += 1) {
    for (let b = 1; b <= 30; b += 1) {
      const e = EJ.ejaK6B1(`${a}/${b}`);
      const lazim = (a === 1 && b === 2) || (a === 1 && b === 4) || (a === 3 && b === 4);
      const harap = lazim ? (a === 1 && b === 2 ? "setengah" : a === 1 ? "seperempat" : "tiga perempat") : `${bacaMandiri(a)} per ${bacaMandiri(b)}`;
      if (e !== harap) {
        okP = false;
        console.log("beda pecahan", a, b, e, harap);
      }
    }
  }
  cek(okP, "pecahan a/b untuk a dan b sampai 30 sama dengan hitungan mandiri");
  // Desimal: bulat 0 sampai 99, belakang koma satu sampai tiga digit.
  let okD = true;
  for (let b = 0; b <= 99; b += 1) {
    for (const t of ["5", "50", "05", "25", "7", "85", "125", "0", "00"]) {
      const harap = `${bacaMandiri(b)} koma ${t.split("").map((d) => SATU[Number(d)]).join(" ")}`;
      if (EJ.ejaK6B1(`${b},${t}`) !== harap) {
        okD = false;
        console.log("beda desimal", b, t, EJ.ejaK6B1(`${b},${t}`), harap);
        break;
      }
    }
  }
  cek(okD, "desimal dieja bagian bulat, koma, lalu angka satu per satu");
}

/* ------------------------------ Data sama dengan rencana ------------------------------ */
{
  sama(A.SOAL_LUAS.map((s) => [s.k, s.m, s.n]), RENCANA_LUAS.map((r) => [r.k, r.m, r.n]), "enam soal Luas sesuai rencana");
  sama(A.SOAL_PANAH.map((s) => [s.w, s.m, s.n]), RENCANA_PANAH.map((r) => [r.w, r.m, r.n]), "enam soal Panah sesuai rencana");
  sama(A.SOAL_TUKAR.map((s) => [s.a, s.c, s.b]), RENCANA_TUKAR.map((r) => [r.a, r.c, r.b]), "enam soal Tukar sesuai rencana");
  cek(A.SOAL_LUAS.every((s) => s.m < s.n && s.k >= 2), "Luas: pecahan kurang dari satu dan paling sedikit dua ember");
  cek(A.SOAL_TUKAR.every((s) => (s.a * s.b) % s.c === 0 && s.a < s.c), "Tukar: hasil bilangan bulat dan pecahan kurang dari satu");
  cek(A.SOAL_LUAS.some((s) => s.k * s.m > s.n) && A.SOAL_LUAS.some((s) => (s.k * s.m) % s.n === 0) && A.SOAL_LUAS.some((s) => s.k * s.m < s.n), "Luas: ada hasil lebih dari satu, tepat utuh, dan kurang dari satu");
  cek(A.SOAL_PANAH.filter((s) => A.bisaSederhana(s.w * s.m, s.n)).length === 3, "Panah: tiga soal perlu disederhanakan, tiga tidak");
  cek(new Set(A.SOAL_LUAS.map((s) => s.nama)).size === 6 && new Set(A.SOAL_PANAH.map((s) => s.nama)).size === 6 && new Set(A.SOAL_TUKAR.map((s) => s.nama)).size === 6, "nama soal unik");
  // Pembanding mandiri: gcd kode sama dengan penyederhanaan mandiri untuk semua pasangan kecil.
  let ok = true;
  for (let p = 1; p <= 60; p += 1) {
    for (let q = 1; q <= 40; q += 1) {
      const [a, b] = sederhanaMandiri(p, q);
      if (A.sederhanaTeks(p, q) !== (b === 1 ? String(a) : `${a}/${b}`) || !setaraMandiri(a, b, p, q) || A.bisaSederhana(p, q) !== (b !== q)) {
        ok = false;
        console.log("beda sederhana", p, q);
      }
    }
  }
  cek(ok, "penyederhanaan kode sama dengan penyederhanaan mandiri (penyebut terkecil dan perkalian silang)");
  sama([A.bentukHasil(15, 5), A.bentukHasil(6, 4), A.bentukHasil(6, 5), A.bentukHasil(30, 3), A.bentukHasil(3, 3)], ["15/5 = 3", "6/4 = 3/2", "6/5", "30/3 = 10", "3/3 = 1"], "bentuk hasil");
  sama([A.keteranganLuas(6, 5), A.keteranganLuas(15, 5), A.keteranganLuas(6, 7), A.keteranganLuas(3, 3)], ["yaitu lebih dari satu petak", "yaitu 3 petak penuh", "yaitu kurang dari satu petak", "yaitu 1 petak penuh"], "keterangan luas");
  sama([A.teksPecahan(6, 1), A.teksPecahan(6, 5), A.hasilTukar(0), A.hasilTukar(5)], ["6", "6/5", 10, 12], "teks pecahan dan hasil tukar");
}

/* ------------------------------ Opsi sama dengan himpunan mandiri ------------------------------ */
{
  for (let i = 0; i < 6; i += 1) {
    const l = RENCANA_LUAS[i];
    const p = RENCANA_PANAH[i];
    const t = RENCANA_TUKAR[i];
    const lp = A.opsiPembLuas(i);
    const ly = A.opsiPenyLuas(i);
    sama(sortir(lp.opsi), sortir(opsiMandiriLuasPemb(l)), `Luas ${i}: pilihan pembilang`);
    sama(sortir(ly.opsi), sortir(opsiMandiriLuasPeny(l)), `Luas ${i}: pilihan penyebut`);
    cek(lp.opsi[lp.benar] === l.k * l.m && ly.opsi[ly.benar] === l.n, `Luas ${i}: kunci pembilang ${l.k * l.m} dan penyebut ${l.n}`);
    cek(new Set(lp.opsi).size === 3 && new Set(ly.opsi).size === 3, `Luas ${i}: tiga pilihan unik`);
    const as = A.opsiAsli(i);
    const at = A.opsiAtas(i);
    const ba = A.opsiBawah(i);
    const ra = A.opsiRapiPanah(i);
    sama(sortir(as.opsi), sortir(opsiMandiriAsli(p)), `Panah ${i}: pilihan a/1`);
    sama(sortir(at.opsi), sortir(opsiMandiriAtas(p)), `Panah ${i}: pilihan atas`);
    sama(sortir(ba.opsi), sortir(opsiMandiriBawah(p)), `Panah ${i}: pilihan bawah`);
    if (A.bisaSederhana(p.w * p.m, p.n)) sama(sortir(ra.opsi), sortir(opsiMandiriRapi(p.w * p.m, p.n)), `Panah ${i}: pilihan sederhana`);
    cek(as.opsi[as.benar] === `${p.w}/1` && at.opsi[at.benar] === p.w * p.m && ba.opsi[ba.benar] === p.n && ra.opsi[ra.benar] === teksMandiri(p.w * p.m, p.n), `Panah ${i}: kunci benar`);
    cek([as, at, ba, ...(A.bisaSederhana(p.w * p.m, p.n) ? [ra] : [])].every((q) => new Set(q.opsi).size === 3), `Panah ${i}: tiga pilihan unik (sederhana hanya bila perlu)`);
    const ka = A.opsiKaliTukar(i);
    const rt = A.opsiRapiTukar(i);
    const ce = A.opsiCekTukar(i);
    const hasil = (t.a * t.b) / t.c;
    sama(sortir(ka.opsi), sortir([t.a * t.b, t.a + t.b, t.c * t.b]), `Tukar ${i}: pilihan hasil kali atas`);
    sama(sortir(rt.opsi), sortir(opsiMandiriRapi(t.a * t.b, t.c)), `Tukar ${i}: pilihan hasil utuh`);
    sama(sortir(ce.opsi), sortir([`Sama, yaitu ${hasil}`, `Beda, yaitu ${t.a * t.b}`, `Beda, yaitu ${t.c}`]), `Tukar ${i}: pilihan cek`);
    cek(ka.opsi[ka.benar] === t.a * t.b && rt.opsi[rt.benar] === String(hasil) && ce.opsi[ce.benar] === `Sama, yaitu ${hasil}`, `Tukar ${i}: kunci benar`);
    cek([ka, rt, ce].every((q) => new Set(q.opsi).size === 3), `Tukar ${i}: tiga pilihan unik`);
    cek(hasil === Math.round(hasil) && setaraMandiri(t.a * t.b, t.c, hasil, 1), `Tukar ${i}: hasil ${hasil} setara p/c lewat perkalian silang`);
  }
  // Letak kunci bervariasi di tiap jenis pilihan (bukan selalu pertama atau selalu sama).
  const letak = (fungsi) => [0, 1, 2, 3, 4, 5].map((i) => fungsi(i).benar);
  for (const [nama, f] of [["pembLuas", A.opsiPembLuas], ["penyLuas", A.opsiPenyLuas], ["asli", A.opsiAsli], ["atas", A.opsiAtas], ["bawah", A.opsiBawah], ["kaliTukar", A.opsiKaliTukar], ["cekTukar", A.opsiCekTukar], ["rapiTukar", A.opsiRapiTukar]]) {
    const l = letak(f);
    cek(new Set(l).size === 3, `letak kunci ${nama} bervariasi (${l.join("")})`);
  }
  // Letak kunci eksak: daftar disusun [kunci, pengecoh, pengecoh] lalu diputar i + r, jadi kunci ada di (3 - ((i + r) mod 3)) mod 3.
  const posisiRotasi = (i, r) => (3 - ((i + r) % 3)) % 3;
  for (const [nama, f, r] of [["pembLuas", A.opsiPembLuas, 0], ["penyLuas", A.opsiPenyLuas, 1], ["asli", A.opsiAsli, 0], ["atas", A.opsiAtas, 1], ["bawah", A.opsiBawah, 2], ["kaliTukar", A.opsiKaliTukar, 0], ["rapiTukar", A.opsiRapiTukar, 1], ["cekTukar", A.opsiCekTukar, 2]]) {
    sama(letak(f), [0, 1, 2, 3, 4, 5].map((i) => posisiRotasi(i, r)), `letak kunci eksak ${nama}`);
  }
  sama([2, 3, 4].map((i) => A.opsiRapiPanah(i).benar), [2, 3, 4].map((i) => posisiRotasi(i, 0)), "letak kunci eksak rapiPanah");
  // Pengecoh mewakili kesalahan khas.
  const o1 = A.opsiPenyLuas(0).opsi;
  cek(o1.includes(10) && o1.includes(7), "penyebut Luas: pengecoh ikut dikali (10) dan dijumlah (7)");
  const o2 = A.opsiPembLuas(0).opsi;
  cek(o2.includes(5) && o2.includes(3), "pembilang Luas: pengecoh jumlah (5) dan satu ember saja (3)");
  const o3 = A.opsiAsli(0).opsi;
  cek(o3.includes("1/2") && o3.includes("2/2") && o3.includes("2/1"), "a/1: pengecoh tertukar dan sama");
  const o4 = A.opsiRapiPanah(4).opsi;
  cek(o4.includes("3/2") && o4.includes("3/4") && o4.includes("6/2"), "sederhana 6/4: pengecoh setengah disederhanakan");
}

/* ------------------------------ Lab A: Kali Pecahan ------------------------------ */
// Urutan aksi benar dihitung dari rencana mandiri.
const seqLuas = (i) => {
  const r = RENCANA_LUAS[i];
  return [
    { t: "L_DATA", i },
    ...Array.from({ length: r.k }, () => ({ t: "L_TAMBAH" })),
    { t: "L_PEMB", o: idx(A.opsiPembLuas(i).opsi, r.k * r.m) },
    { t: "L_PENY", o: idx(A.opsiPenyLuas(i).opsi, r.n) },
  ];
};
const seqPanah = (i, sampai = 99) => {
  const r = RENCANA_PANAH[i];
  const p = r.w * r.m;
  const urut = [
    { t: "P_DATA", i },
    { t: "P_ASLI", o: idx(A.opsiAsli(i).opsi, `${r.w}/1`) },
    { t: "P_ATAS", o: idx(A.opsiAtas(i).opsi, p) },
    { t: "P_BAWAH", o: idx(A.opsiBawah(i).opsi, r.n) },
  ];
  if (sederhanaMandiri(p, r.n)[1] !== r.n) urut.push({ t: "P_RAPI", o: idx(A.opsiRapiPanah(i).opsi, teksMandiri(p, r.n)) });
  return urut.slice(0, sampai);
};
const seqTukar = (i, sampai = 99) => {
  const r = RENCANA_TUKAR[i];
  const hasil = (r.a * r.b) / r.c;
  return [
    { t: "T_DATA", i },
    { t: "T_KALI", o: idx(A.opsiKaliTukar(i).opsi, r.a * r.b) },
    { t: "T_RAPI", o: idx(A.opsiRapiTukar(i).opsi, String(hasil)) },
    { t: "T_CEK", o: idx(A.opsiCekTukar(i).opsi, `Sama, yaitu ${hasil}`) },
  ].slice(0, sampai);
};
const catatPesan = (s) => globalThis.__pesanA.push(s.pesan);

{
  sama(A.keadaanKaliK6B1A(x0), { alat: "kali", pernah: [] }, "keadaan awal");
  cek(x0.pernah.length === 0 && x0.pesan === "" && x0.luas.ember === 0 && !x0.luas.pemb && !x0.luas.selesai && x0.panah.tahap === 0 && x0.tukar.tahap === 0, "awal: kosong");
  cek(x0.luas.data === 0 && x0.panah.data === 0 && x0.tukar.data === 0, "awal: soal pertama");

  // Luas: setiap soal selesai lewat urutan benar dan menambah riwayat.
  for (let i = 0; i < 6; i += 1) {
    const r = RENCANA_LUAS[i];
    let x = x0;
    const hasil = [];
    for (const a of seqLuas(i)) {
      x = L(x, a);
      catatPesan(x);
      hasil.push(x);
    }
    cek(x.pernah.join() === `luas:${i}` && x.luas.selesai && x.luas.pemb && x.luas.ember === r.k, `Luas ${i}: urutan benar menambah luas:${i}`);
    const akhir = hasil[hasil.length - 1].pesan;
    cek(akhir.startsWith("✅") && akhir.includes(`${r.k} × ${r.m}/${r.n} = `) && akhir.includes(teksMandiri(r.k * r.m, r.n)), `Luas ${i}: pesan akhir memuat hasil mandiri ${teksMandiri(r.k * r.m, r.n)} (${akhir})`);
    cek(!hasil.slice(0, -1).some((s) => s.pernah.length > 0), `Luas ${i}: riwayat baru muncul di langkah terakhir`);
    cek(hasil[r.k].pesan.startsWith("✅ Semua") && hasil[r.k].pesan.includes(`${r.k} × ${r.m} = ${r.k * r.m} kotak terarsir`) && hasil[r.k].pesan.includes(`berisi ${r.n} kotak`), `Luas ${i}: pesan ember terakhir memuat kotak terarsir ${r.k * r.m}`);
    if (r.k >= 2) cek(hasil[1].pesan.startsWith("✅ Ember ke-1") && hasil[1].pesan.includes(`menyiram ${r.m} kotak`) && hasil[1].pesan.includes(`terarsir ${1 * r.m} kotak`) && hasil[r.k - 1].pesan.includes(`terarsir ${(r.k - 1) * r.m} kotak`), `Luas ${i}: pesan ember perantara memuat kotak terarsir`);
    cek(hasil[r.k + 1].pesan.startsWith("✅") && hasil[r.k + 1].pesan.includes(`Ada ${r.k * r.m} kotak terarsir`), `Luas ${i}: pesan pembilang memuat ${r.k * r.m}`);
    cek(L(x, { t: "L_TAMBAH" }) === x || JSON.stringify(L(x, { t: "L_TAMBAH" })) === JSON.stringify(x), `Luas ${i}: setelah selesai, tambah ember tidak mengubah keadaan sama sekali`);
    // Kebalikannya: tiap pilihan yang salah pada pembilang dan penyebut ditolak dengan alasan, riwayat tak berubah.
    for (let o = 0; o < 3; o += 1) {
      const awal = jalan(x0, L, seqLuas(i).slice(0, 1 + r.k));
      const y = L(awal, { t: "L_PEMB", o });
      const benar = A.opsiPembLuas(i).opsi[o] === r.k * r.m;
      cek(benar ? y.luas.pemb && y.pesan.startsWith("✅") : !y.luas.pemb && !y.pesan.startsWith("✅") && y.pesan.length > 20 && y.pernah.length === 0, `Luas ${i}: pilihan pembilang ${o} ${benar ? "benar diterima" : "salah ditolak"}`);
      catatPesan(y);
      const awal2 = jalan(x0, L, seqLuas(i).slice(0, 2 + r.k));
      const z = L(awal2, { t: "L_PENY", o });
      const benar2 = A.opsiPenyLuas(i).opsi[o] === r.n;
      cek(benar2 ? z.luas.selesai && z.pernah.includes(`luas:${i}`) : !z.luas.selesai && z.pernah.length === 0 && !z.pesan.startsWith("✅"), `Luas ${i}: pilihan penyebut ${o} ${benar2 ? "benar diterima" : "salah ditolak"}`);
      catatPesan(z);
    }
    // Pembilang sebelum ember lengkap ditolak (ember kurang satu).
    if (r.k >= 2) {
      const kurang = jalan(x0, L, [{ t: "L_DATA", i }, ...Array.from({ length: r.k - 1 }, () => ({ t: "L_TAMBAH" }))]);
      const y = L(kurang, { t: "L_PEMB", o: idx(A.opsiPembLuas(i).opsi, r.k * r.m) });
      cek(!y.luas.pemb && y.pernah.length === 0 && y.pesan.length > 10 && !y.pesan.startsWith("✅"), `Luas ${i}: pembilang saat ember kurang satu ditolak`);
      catatPesan(y);
    }
    // Penyebut sebelum pembilang ditolak.
    const lompat = jalan(x0, L, [{ t: "L_DATA", i }, ...Array.from({ length: r.k }, () => ({ t: "L_TAMBAH" })), { t: "L_PENY", o: idx(A.opsiPenyLuas(i).opsi, r.n) }]);
    cek(!lompat.luas.selesai && lompat.pernah.length === 0 && !lompat.pesan.startsWith("✅"), `Luas ${i}: penyebut sebelum pembilang ditolak`);
    catatPesan(lompat);
    // Ember tidak melebihi k dan tidak mengubah riwayat.
    const berlebih = jalan(x0, L, [{ t: "L_DATA", i }, ...Array.from({ length: r.k + 4 }, () => ({ t: "L_TAMBAH" }))]);
    cek(berlebih.luas.ember === r.k && berlebih.pernah.length === 0, `Luas ${i}: ember berhenti di ${r.k}`);
    catatPesan(berlebih);
    // Setelah selesai, aksi lanjutan tidak mengubah apa pun, tetapi riwayat tetap.
    const setelah = jalan(x, L, [{ t: "L_TAMBAH" }, { t: "L_PEMB", o: 0 }, { t: "L_PENY", o: 1 }]);
    cek(JSON.stringify(setelah.luas) === JSON.stringify(x.luas) && setelah.pernah.join() === x.pernah.join(), `Luas ${i}: setelah selesai tidak berubah`);
  }
  // Ganti soal mengosongkan ember dan pembilang tetapi menyimpan riwayat.
  {
    const y = jalan(x0, L, [...seqLuas(0), { t: "L_DATA", i: 1 }]);
    cek(y.luas.data === 1 && y.luas.ember === 0 && !y.luas.pemb && !y.luas.selesai && y.pernah.join() === "luas:0" && y.pesan === "", "Luas: ganti soal mengosongkan keadaan, riwayat tetap");
    const ulang = jalan(x0, L, [...seqLuas(0), { t: "L_DATA", i: 0 }]);
    cek(ulang.luas.ember === 0 && !ulang.luas.selesai && ulang.pernah.join() === "luas:0", "Luas: soal yang sama bisa diulang, riwayat tetap");
  }

  // Panah.
  for (let i = 0; i < 6; i += 1) {
    const r = RENCANA_PANAH[i];
    const p = r.w * r.m;
    const urut = seqPanah(i);
    let x = x0;
    const hasil = [];
    for (const a of urut) {
      x = L(x, a);
      catatPesan(x);
      hasil.push(x);
    }
    cek(x.pernah.join() === `panah:${i}` && x.panah.tahap === 4, `Panah ${i}: urutan benar menambah panah:${i}`);
    cek(!hasil.slice(0, -1).some((s) => s.pernah.length > 0), `Panah ${i}: riwayat baru muncul di langkah terakhir`);
    cek(hasil[1].pesan.startsWith("✅") && hasil[1].pesan.includes(`${r.w} ditulis ${r.w}/1`), `Panah ${i}: pesan a/1`);
    cek(hasil[2].pesan.startsWith("✅") && hasil[2].pesan.includes(`${r.w} × ${r.m} = ${p}`), `Panah ${i}: pesan atas ${p}`);
    cek(hasil[3].pesan.startsWith("✅") && hasil[3].pesan.includes(`(${r.w}×${r.m})/(1×${r.n}) = ${p}/${r.n}`), `Panah ${i}: pesan bawah ${r.n}`);
    cek(hasil[3].pesan.includes(sederhanaMandiri(p, r.n)[1] !== r.n ? "masih bisa disederhanakan" : "paling sederhana"), `Panah ${i}: pesan menyebut perlu atau tidak perlu disederhanakan`);
    cek(hasil[hasil.length - 1].pesan.includes(sederhanaMandiri(p, r.n)[1] !== r.n ? `${p}/${r.n} = ${teksMandiri(p, r.n)}` : `${p}/${r.n}`), `Panah ${i}: pesan akhir memuat bentuk hasil`);
    cek(hasil[hasil.length - 1].pesan.startsWith("✅") && hasil[hasil.length - 1].pesan.includes(teksMandiri(p, r.n)) || hasil[hasil.length - 1].pesan.includes(`${p}/${r.n}`), `Panah ${i}: pesan akhir memuat hasil`);
    cek(urut.length === (sederhanaMandiri(p, r.n)[1] !== r.n ? 5 : 4), `Panah ${i}: ${urut.length} langkah (tahap sederhana hanya bila bisa)`);
    // Tiap tahap: pilihan salah ditolak (tahap tetap), pilihan benar maju satu tahap.
    const tahapOpsi = [
      ["P_ASLI", A.opsiAsli(i).opsi, `${r.w}/1`, 0],
      ["P_ATAS", A.opsiAtas(i).opsi, p, 1],
      ["P_BAWAH", A.opsiBawah(i).opsi, r.n, 2],
      ["P_RAPI", A.opsiRapiPanah(i).opsi, teksMandiri(p, r.n), 3],
    ];
    for (const [t, opsi, kunci, tahap] of tahapOpsi) {
      if (t === "P_RAPI" && sederhanaMandiri(p, r.n)[1] === r.n) continue;
      const awal = jalan(x0, L, urut.slice(0, 1 + tahap));
      cek(awal.panah.tahap === tahap, `Panah ${i}: awal tahap ${tahap}`);
      for (let o = 0; o < 3; o += 1) {
        const y = L(awal, { t, o });
        const benar = opsi[o] === kunci;
        if (benar) cek(y.panah.tahap > tahap && y.pesan.startsWith("✅"), `Panah ${i}/${t}: pilihan ${o} benar maju`);
        else cek(y.panah.tahap === tahap && y.pernah.length === 0 && !y.pesan.startsWith("✅") && y.pesan.length > 20, `Panah ${i}/${t}: pilihan ${o} salah ditolak`);
        catatPesan(y);
      }
      // Aksi tahap lain (yang belum waktunya) ditolak dengan pesan.
      for (const t2 of ["P_ASLI", "P_ATAS", "P_BAWAH", "P_RAPI"]) {
        if (t2 === t) continue;
        const tahap2 = ["P_ASLI", "P_ATAS", "P_BAWAH", "P_RAPI"].indexOf(t2);
        if (tahap2 < tahap) {
          const y = L(awal, { t: t2, o: 0 });
          cek(y === awal, `Panah ${i}: ${t2} yang sudah lewat tidak mengubah apa pun`);
        } else {
          const y = L(awal, { t: t2, o: 0 });
          cek(y.panah.tahap === tahap && y.pernah.length === 0 && y.pesan.length > 10 && !y.pesan.startsWith("✅"), `Panah ${i}: ${t2} sebelum waktunya ditolak di tahap ${tahap}`);
          catatPesan(y);
        }
      }
    }
    // Hanya soal ini yang tercatat dan data lain tak terganggu.
    cek(x.pernah.length === 1, `Panah ${i}: hanya satu riwayat`);
  }
  {
    const y = jalan(x0, L, [...seqPanah(0), { t: "P_DATA", i: 2 }]);
    cek(y.panah.data === 2 && y.panah.tahap === 0 && y.pernah.join() === "panah:0" && y.pesan === "", "Panah: ganti soal mengosongkan tahap, riwayat tetap");
    const sudah = jalan(x0, L, seqPanah(0));
    cek(L(sudah, { t: "P_ATAS", o: 0 }) === sudah && L(sudah, { t: "P_RAPI", o: 1 }) === sudah, "Panah: setelah selesai, aksi lanjutan tidak mengubah");
  }

  // Tukar.
  for (let i = 0; i < 6; i += 1) {
    const r = RENCANA_TUKAR[i];
    const hasil = (r.a * r.b) / r.c;
    const urut = seqTukar(i);
    let x = x0;
    const rekam = [];
    for (const a of urut) {
      x = L(x, a);
      catatPesan(x);
      rekam.push(x);
    }
    cek(x.pernah.join() === `tukar:${i}` && x.tukar.tahap === 3, `Tukar ${i}: urutan benar menambah tukar:${i}`);
    cek(!rekam.slice(0, -1).some((s) => s.pernah.length > 0), `Tukar ${i}: riwayat baru muncul di langkah terakhir`);
    cek(rekam[1].pesan.startsWith("✅") && rekam[1].pesan.includes(`${r.a}/${r.c} × ${r.b}/1 = ${r.a * r.b}/${r.c}`), `Tukar ${i}: pesan hasil kali atas`);
    cek(rekam[2].pesan.startsWith("✅") && rekam[2].pesan.includes(`${r.a * r.b}/${r.c} = ${hasil}`) && rekam[2].pesan.includes(`${r.b} × ${r.a}/${r.c}`), `Tukar ${i}: pesan hasil utuh dan urutan terbalik`);
    cek(rekam[3].pesan.startsWith("✅") && rekam[3].pesan.includes(`${r.a}/${r.c} × ${r.b} = ${r.b} × ${r.a}/${r.c} = ${hasil}`), `Tukar ${i}: pesan akhir memuat hasil mandiri ${hasil}`);
    const tahapOpsi = [
      ["T_KALI", A.opsiKaliTukar(i).opsi, r.a * r.b, 0],
      ["T_RAPI", A.opsiRapiTukar(i).opsi, String(hasil), 1],
      ["T_CEK", A.opsiCekTukar(i).opsi, `Sama, yaitu ${hasil}`, 2],
    ];
    for (const [t, opsi, kunci, tahap] of tahapOpsi) {
      const awal = jalan(x0, L, urut.slice(0, 1 + tahap));
      cek(awal.tukar.tahap === tahap, `Tukar ${i}: awal tahap ${tahap}`);
      for (let o = 0; o < 3; o += 1) {
        const y = L(awal, { t, o });
        const benar = opsi[o] === kunci;
        if (benar) cek(y.tukar.tahap === tahap + 1 && y.pesan.startsWith("✅"), `Tukar ${i}/${t}: pilihan ${o} benar maju`);
        else cek(y.tukar.tahap === tahap && y.pernah.length === 0 && !y.pesan.startsWith("✅") && y.pesan.length > 20, `Tukar ${i}/${t}: pilihan ${o} salah ditolak`);
        catatPesan(y);
      }
      for (const t2 of ["T_KALI", "T_RAPI", "T_CEK"]) {
        if (t2 === t) continue;
        const tahap2 = ["T_KALI", "T_RAPI", "T_CEK"].indexOf(t2);
        const y = L(awal, { t: t2, o: 0 });
        if (tahap2 < tahap) cek(y === awal, `Tukar ${i}: ${t2} yang sudah lewat tidak mengubah apa pun`);
        else {
          cek(y.tukar.tahap === tahap && y.pernah.length === 0 && y.pesan.length > 10 && !y.pesan.startsWith("✅"), `Tukar ${i}: ${t2} sebelum waktunya ditolak di tahap ${tahap}`);
          catatPesan(y);
        }
      }
    }
  }
  {
    const y = jalan(x0, L, [...seqTukar(0), { t: "T_DATA", i: 3 }]);
    cek(y.tukar.data === 3 && y.tukar.tahap === 0 && y.pernah.join() === "tukar:0" && y.pesan === "", "Tukar: ganti soal mengosongkan tahap, riwayat tetap");
  }

  // Tiga tampilan berdiri sendiri; indeks pecahan, negatif, dan di luar batas diabaikan.
  const asing = [
    { t: "L_DATA", i: -1 }, { t: "L_DATA", i: 6 }, { t: "L_DATA", i: 1.5 }, { t: "L_DATA", i: NaN }, { t: "L_DATA", i: "1" },
    { t: "P_DATA", i: -1 }, { t: "P_DATA", i: 6 }, { t: "P_DATA", i: 0.5 }, { t: "T_DATA", i: -2 }, { t: "T_DATA", i: 99 }, { t: "T_DATA", i: 2.2 },
    ...["L_PEMB", "L_PENY", "P_ASLI", "P_ATAS", "P_BAWAH", "P_RAPI", "T_KALI", "T_RAPI", "T_CEK"].flatMap((t) => [-1, 3, 7, 0.5, NaN, "1", null, undefined].map((o) => ({ t, o }))),
    { t: "TIDAK_ADA" },
  ];
  const siap = jalan(x0, L, [...seqLuas(1).slice(0, 3), ...seqPanah(0, 2), ...seqTukar(0, 2)]);
  for (const a of asing) {
    const y = L(siap, a);
    cek(JSON.stringify(y) === JSON.stringify(siap) || a.t === "TIDAK_ADA", `aksi asing diabaikan: ${JSON.stringify(a)}`);
  }
  cek(L(siap, { t: "TIDAK_ADA" }) === undefined || true, "aksi tak dikenal tidak melempar kesalahan");
  const reset = jalan(siap, L, [{ t: "RESET" }]);
  sama(reset, x0, "RESET kembali ke awal");
  cek(L(jalan(x0, L, seqLuas(0)), { t: "PESAN_KOSONG" }).pesan === "" && L(jalan(x0, L, seqLuas(0)), { t: "PESAN_KOSONG" }).pernah.length === 1, "PESAN_KOSONG hanya mengosongkan pesan");
}

/* ------------------------------ Fuzz 20.000 aksi dengan orakel mandiri ------------------------------ */
{
  const acak = acakDari(20241113);
  // Orakel: pencatat tahap sendiri. Nilai kunci dihitung dari rencana mandiri, bukan dari kode.
  const o = { luas: { data: 0, ember: 0, pemb: false, sel: false }, panah: { data: 0, tahap: 0 }, tukar: { data: 0, tahap: 0 }, pernah: new Set() };
  let x = x0;
  const bagi = (p, q) => (p - (p % q)) / q;
  const perluRapi = (i) => {
    const r = RENCANA_PANAH[i];
    return sederhanaMandiri(r.w * r.m, r.n)[1] !== r.n;
  };
  const AKSI_ACAK = ["L_DATA", "L_TAMBAH", "L_PEMB", "L_PENY", "P_DATA", "P_ASLI", "P_ATAS", "P_BAWAH", "P_RAPI", "T_DATA", "T_KALI", "T_RAPI", "T_CEK", "PESAN_KOSONG", "RESET"];
  // Aksi benar berikutnya menurut orakel untuk tampilan tertentu.
  const benarBerikut = (tampil) => {
    if (tampil === 0) {
      const r = RENCANA_LUAS[o.luas.data];
      if (o.luas.sel) return { t: "L_DATA", i: acak(6) };
      if (o.luas.ember < r.k) return { t: "L_TAMBAH" };
      if (!o.luas.pemb) return { t: "L_PEMB", o: idx(A.opsiPembLuas(o.luas.data).opsi, r.k * r.m) };
      return { t: "L_PENY", o: idx(A.opsiPenyLuas(o.luas.data).opsi, r.n) };
    }
    if (tampil === 1) {
      const i = o.panah.data;
      const r = RENCANA_PANAH[i];
      const t = o.panah.tahap;
      if (t === 0) return { t: "P_ASLI", o: idx(A.opsiAsli(i).opsi, `${r.w}/1`) };
      if (t === 1) return { t: "P_ATAS", o: idx(A.opsiAtas(i).opsi, r.w * r.m) };
      if (t === 2) return { t: "P_BAWAH", o: idx(A.opsiBawah(i).opsi, r.n) };
      if (t === 3) return { t: "P_RAPI", o: idx(A.opsiRapiPanah(i).opsi, teksMandiri(r.w * r.m, r.n)) };
      return { t: "P_DATA", i: acak(6) };
    }
    const i = o.tukar.data;
    const r = RENCANA_TUKAR[i];
    const hasil = bagi(r.a * r.b, r.c);
    const t = o.tukar.tahap;
    if (t === 0) return { t: "T_KALI", o: idx(A.opsiKaliTukar(i).opsi, r.a * r.b) };
    if (t === 1) return { t: "T_RAPI", o: idx(A.opsiRapiTukar(i).opsi, String(hasil)) };
    if (t === 2) return { t: "T_CEK", o: idx(A.opsiCekTukar(i).opsi, `Sama, yaitu ${hasil}`) };
    return { t: "T_DATA", i: acak(6) };
  };
  const nilaiAcak = () => [0, 1, 2, 0, 1, 2, -1, 3, 1.5, NaN, 99][acak(11)];
  // Terapkan aksi ke orakel; kembalikan apa yang seharusnya terjadi.
  const terapkan = (a) => {
    const sebelum = new Set(o.pernah);
    const sahI = (i) => Number.isInteger(i) && i >= 0 && i < 6;
    const sahO = (v) => Number.isInteger(v) && v >= 0 && v < 3;
    switch (a.t) {
      case "L_DATA":
        if (sahI(a.i)) o.luas = { data: a.i, ember: 0, pemb: false, sel: false };
        break;
      case "L_TAMBAH":
        if (!o.luas.sel && o.luas.ember < RENCANA_LUAS[o.luas.data].k) o.luas.ember += 1;
        break;
      case "L_PEMB": {
        const r = RENCANA_LUAS[o.luas.data];
        if (sahO(a.o) && !o.luas.sel && !o.luas.pemb && o.luas.ember === r.k && opsiMandiriLuasPemb(r).includes(A.opsiPembLuas(o.luas.data).opsi[a.o]) && A.opsiPembLuas(o.luas.data).opsi[a.o] === r.k * r.m) o.luas.pemb = true;
        break;
      }
      case "L_PENY": {
        const r = RENCANA_LUAS[o.luas.data];
        if (sahO(a.o) && !o.luas.sel && o.luas.pemb && A.opsiPenyLuas(o.luas.data).opsi[a.o] === r.n) {
          o.luas.sel = true;
          o.pernah.add(`luas:${o.luas.data}`);
        }
        break;
      }
      case "P_DATA":
        if (sahI(a.i)) o.panah = { data: a.i, tahap: 0 };
        break;
      case "P_ASLI":
        if (sahO(a.o) && o.panah.tahap === 0 && A.opsiAsli(o.panah.data).opsi[a.o] === `${RENCANA_PANAH[o.panah.data].w}/1`) o.panah.tahap = 1;
        break;
      case "P_ATAS": {
        const r = RENCANA_PANAH[o.panah.data];
        if (sahO(a.o) && o.panah.tahap === 1 && A.opsiAtas(o.panah.data).opsi[a.o] === r.w * r.m) o.panah.tahap = 2;
        break;
      }
      case "P_BAWAH": {
        const r = RENCANA_PANAH[o.panah.data];
        if (sahO(a.o) && o.panah.tahap === 2 && A.opsiBawah(o.panah.data).opsi[a.o] === r.n) {
          if (perluRapi(o.panah.data)) o.panah.tahap = 3;
          else {
            o.panah.tahap = 4;
            o.pernah.add(`panah:${o.panah.data}`);
          }
        }
        break;
      }
      case "P_RAPI": {
        const r = RENCANA_PANAH[o.panah.data];
        if (sahO(a.o) && o.panah.tahap === 3 && A.opsiRapiPanah(o.panah.data).opsi[a.o] === teksMandiri(r.w * r.m, r.n)) {
          o.panah.tahap = 4;
          o.pernah.add(`panah:${o.panah.data}`);
        }
        break;
      }
      case "T_DATA":
        if (sahI(a.i)) o.tukar = { data: a.i, tahap: 0 };
        break;
      case "T_KALI": {
        const r = RENCANA_TUKAR[o.tukar.data];
        if (sahO(a.o) && o.tukar.tahap === 0 && A.opsiKaliTukar(o.tukar.data).opsi[a.o] === r.a * r.b) o.tukar.tahap = 1;
        break;
      }
      case "T_RAPI": {
        const r = RENCANA_TUKAR[o.tukar.data];
        if (sahO(a.o) && o.tukar.tahap === 1 && A.opsiRapiTukar(o.tukar.data).opsi[a.o] === String(bagi(r.a * r.b, r.c))) o.tukar.tahap = 2;
        break;
      }
      case "T_CEK": {
        const r = RENCANA_TUKAR[o.tukar.data];
        if (sahO(a.o) && o.tukar.tahap === 2 && A.opsiCekTukar(o.tukar.data).opsi[a.o] === `Sama, yaitu ${bagi(r.a * r.b, r.c)}`) {
          o.tukar.tahap = 3;
          o.pernah.add(`tukar:${o.tukar.data}`);
        }
        break;
      }
      case "RESET":
        o.luas = { data: 0, ember: 0, pemb: false, sel: false };
        o.panah = { data: 0, tahap: 0 };
        o.tukar = { data: 0, tahap: 0 };
        o.pernah = new Set();
        break;
      default:
        break;
    }
    return [...o.pernah].filter((v) => !sebelum.has(v));
  };

  let ok = true;
  let pernahTerbesar = 0;
  let selesaiLuas = 0;
  let selesaiPanah = 0;
  let selesaiTukar = 0;
  for (let n = 0; n < 20000 && ok; n += 1) {
    const mode = acak(10);
    let a;
    if (mode < 5) a = benarBerikut(acak(3));
    else {
      const t = AKSI_ACAK[acak(AKSI_ACAK.length)];
      a = t === "L_DATA" || t === "P_DATA" || t === "T_DATA" ? { t, i: [0, 1, 2, 3, 4, 5, -1, 6, 2.5, NaN][acak(10)] } : { t, o: nilaiAcak() };
      if (t === "RESET" && acak(8) !== 0) a = { t: "PESAN_KOSONG" };
    }
    const baruMenurutOrakel = terapkan(a);
    const sebelumPernah = x.pernah.length;
    x = L(x, a);
    globalThis.__pesanA.push(x.pesan);
    if (a.t === "RESET") {
      ok = ok && x.pernah.length === 0 && x.pesan === "";
    } else {
      cek(x.pernah.length >= sebelumPernah, `fuzz ${n}: riwayat tidak dicabut`);
    }
    const cocok =
      x.luas.data === o.luas.data && x.luas.ember === o.luas.ember && x.luas.pemb === o.luas.pemb && x.luas.selesai === o.luas.sel &&
      x.panah.data === o.panah.data && x.panah.tahap === o.panah.tahap && x.tukar.data === o.tukar.data && x.tukar.tahap === o.tukar.tahap &&
      JSON.stringify([...x.pernah].sort()) === JSON.stringify([...o.pernah].sort());
    if (!cocok) {
      ok = false;
      console.log("fuzz beda dari orakel di langkah", n, JSON.stringify(a), JSON.stringify(x), JSON.stringify({ ...o, pernah: [...o.pernah] }));
    }
    if (baruMenurutOrakel.length > 0) {
      cek(x.pesan.startsWith("✅"), `fuzz ${n}: id baru ${baruMenurutOrakel.join()} diawali pesan sukses`);
      if (baruMenurutOrakel[0].startsWith("luas")) selesaiLuas += 1;
      if (baruMenurutOrakel[0].startsWith("panah")) selesaiPanah += 1;
      if (baruMenurutOrakel[0].startsWith("tukar")) selesaiTukar += 1;
    }
    cek(x.luas.ember >= 0 && x.luas.ember <= RENCANA_LUAS[x.luas.data].k && x.panah.tahap >= 0 && x.panah.tahap <= 4 && x.tukar.tahap >= 0 && x.tukar.tahap <= 3, `fuzz ${n}: batas terjaga`);
    cek(typeof x.pesan === "string", `fuzz ${n}: pesan berupa teks`);
    pernahTerbesar = Math.max(pernahTerbesar, x.pernah.length);
  }
  cek(ok, "fuzz 20.000 aksi: keadaan sama dengan orakel mandiri");
  cek(selesaiLuas > 10 && selesaiPanah > 10 && selesaiTukar > 10, `fuzz: tiap tampilan selesai berkali-kali (${selesaiLuas}, ${selesaiPanah}, ${selesaiTukar})`);
  cek(pernahTerbesar >= 6, `fuzz: riwayat pernah mencapai ${pernahTerbesar}`);
  cek(x.pernah.every((v) => /^(luas|panah|tukar):[0-5]$/.test(v)), "fuzz: semua id riwayat berbentuk sah");
}

/* ------------------------------ Mesin ------------------------------ */
{
  const def = MS.MESIN_KALI;
  cek(def.stasiun.length === 4 && def.kasus.length === 3, `${def.id}: empat stasiun, tiga kasus`);
  sama(def.stasiun.map((s) => s.id), ["tulis", "atas", "bawah", "hasil"], "stasiun mesin");
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
  // Letak kunci eksak mesin: susunOpsi memutar [kunci, pengecoh, pengecoh] sebanyak (idx + offset) mod 3.
  for (const [s, offset] of [[0, 0], [1, 1], [2, 2], [3, 3]]) {
    sama(def.kasus.map((k) => k.langkah[s].opsi.indexOf(k.langkah[s].benar)), [0, 1, 2].map((i) => (3 - ((i + offset) % 3)) % 3), `${def.id}: letak kunci eksak stasiun ${def.stasiun[s].id}`);
  }
  let x = ME.awalMesin(def);
  let n = 0;
  while (!x.selesai && n < 100) {
    n += 1;
    const l = ME.langkahAktif(x);
    x = l ? ME.langkahMesin(x, { t: "JAWAB", nilai: l.benar }) : ME.langkahMesin(x, { t: "LANJUT" });
  }
  cek(x.selesai && def.selesaiId === K1.ID_MESIN_K6B1.A, `${def.id}: bisa diselesaikan, id selesai sesuai misi`);
  const y = ME.awalMesin(def);
  const l0 = ME.langkahAktif(y);
  const z = ME.langkahMesin(y, { t: "JAWAB", nilai: l0.opsi.find((o) => o !== l0.benar) });
  cek(z.ke === 0 && z.ditolak === 1 && z.pesan === l0.petunjuk, `${def.id}: jawaban salah ditolak dengan petunjuk`);

  const RENCANA_M = [
    { id: "ember", w: 2, m: 3, n: 5 },
    { id: "gelas", w: 4, m: 2, n: 5 },
    { id: "pohon", w: 15, m: 2, n: 3 },
  ];
  sama(MS.KASUS_KALI.map((k) => [k.id, k.w, k.m, k.n]), RENCANA_M.map((r) => [r.id, r.w, r.m, r.n]), "Mesin: data tiga kasus sesuai rencana");
  for (const [i, r] of RENCANA_M.entries()) {
    const c = def.kasus[i];
    const [tu, at, ba, ha] = c.langkah;
    const p = r.w * r.m;
    cek(tu.benar === `${r.w}/1` && tu.tanya.includes(`${r.w} × ${r.m}/${r.n}`), `Mesin ${r.id}: tulis ${r.w}/1`);
    sama(sortir(tu.opsi), sortir([`${r.w}/1`, `1/${r.w}`, `${r.w}/${r.w}`]), `Mesin ${r.id}: pengecoh tulis (tertukar dan sama)`);
    cek(at.benar === String(p) && at.tanya.includes(`${r.w} × ${r.m}`) && !at.tanya.includes(` ${p}`) , `Mesin ${r.id}: atas ${r.w} × ${r.m} = ${p}, kunci tidak dibocorkan`);
    sama(sortir(at.opsi), sortir([p, r.w + r.m, r.m]), `Mesin ${r.id}: pengecoh atas (jumlah dan satu saja)`);
    cek(ba.benar === String(1 * r.n) && ba.tanya.includes(`1 × ${r.n}`), `Mesin ${r.id}: bawah 1 × ${r.n} = ${r.n}`);
    sama(sortir(ba.opsi), sortir([r.n, r.n + 1, r.w * r.n]), `Mesin ${r.id}: pengecoh bawah (satu lebih dan ikut dikali)`);
    cek(ha.benar === teksMandiri(p, r.n) && ha.tanya.includes(`${r.w} × ${r.m}/${r.n}`) && !ha.tanya.includes(ha.benar + " "), `Mesin ${r.id}: hasil ${teksMandiri(p, r.n)} (hitungan mandiri)`);
    sama(sortir(ha.opsi), sortir([teksMandiri(p, r.n), `${p}/${r.n * r.w}`, String(p)]), `Mesin ${r.id}: pengecoh hasil (penyebut ikut dikali dan pembilang saja)`);
    cek(setaraMandiri(...sederhanaMandiri(p, r.n), p, r.n), `Mesin ${r.id}: hasil setara p per n lewat perkalian silang`);
    cek(c.ringkas.includes(`${r.w}/1`) && c.ringkas.includes(`${p}/${r.n}`) && c.ringkas.includes(teksMandiri(p, r.n)), `Mesin ${r.id}: ringkas memuat langkah dan hasil`);
  }
}

/* ------------------------------ Skenario ------------------------------ */
{
  const S = SK.SKENARIO_K6B1A;
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
  sama(S.id.replace(/-k6b1$/, ""), K1.ID_SKENARIO_K6B1.A, "id skenario sesuai id misi");
  const adegan = (id) => S.adegan.find((a) => a.id === id);
  const ember = adegan("ember");
  const kb = ember.opsi.filter((o) => o.benar);
  cek(kb.length === 1 && kb[0].teks === `${teksMandiri(2 * 3, 5)} meter persegi` && ember.cerita.includes("2 × 3/5"), "ember: 2 × 3/5 = 6/5 meter persegi (hitungan mandiri)");
  cek(ember.opsi.length === 3 && new Set(ember.opsi.map((o) => o.teks)).size === 3 && ember.opsi.some((o) => o.teks.startsWith("6/10")), "ember: tiga pilihan unik, pengecoh 6/10");
  const lima = adegan("lima");
  cek(lima.jumlah === 5 && lima.jumlah <= 12 && lima.objek === "stik" && lima.sukses.includes(`5 × 3/5 = ${5 * 3}/5 = ${(5 * 3) / 5}`), "lima: ketuk 5 stik, 5 × 3/5 = 15/5 = 3");
  const asli = adegan("asli");
  cek(asli.soal[0].jawaban === "2/1" && asli.soal[1].jawaban === teksMandiri(2 * 3, 1 * 5) && asli.soal[1].teks.includes("(2×3)/(1×5)"), "asli: 2 = 2/1 dan panah lurus 6/5");
  const pohon = adegan("pohon");
  cek(pohon.soal[0].jawaban === String((2 * 15) / 3) && pohon.soal[0].teks.includes("30/3") && pohon.soal[1].jawaban === String((1 * 20) / 4) && pohon.soal[1].teks.includes("20/4"), "pohon: 2/3 × 15 = 30/3 = 10 dan 1/4 × 20 = 20/4 = 5");
  for (const q of [...asli.soal, ...pohon.soal]) cek(q.opsi.length === 3 && q.opsi.filter((o) => o === q.jawaban).length === 1 && new Set(q.opsi).size === 3, `soal "${q.teks}": tiga pilihan satu kunci`);
  const gelas = adegan("gelas");
  cek(gelas.target === 4 && gelas.maks > gelas.target && gelas.objek === "stik" && gelas.sukses.includes(`${4 * 2}/5`) && gelas.cerita.includes("2/5"), "gelas: 4 gelas × 2/5 = 8/5 liter");
  const salah = adegan("salah");
  cek(salah.opsi.filter((o) => o.benar).length === 1 && salah.opsi.find((o) => o.benar).teks.includes(`1 × 5 = ${1 * 5}`) && salah.cerita.includes("6/10"), "salah: penyebut ikut dikali, 1 × 5 = 5");
  const posisi = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
  cek(new Set(posisi).size === posisi.length, `letak jawaban pilih bervariasi (${posisi.join("")})`);
  for (const id of ["asli", "pohon"]) {
    const ps = adegan(id).soal.map((q) => q.opsi.indexOf(q.jawaban));
    cek(ps.every((p) => p >= 0) && new Set(ps).size === ps.length, `letak jawaban soal ${id} bervariasi (${ps.join("")})`);
  }
  cek(S.adegan.filter((a) => a.jenis === "pilih").every((a) => a.opsi.length === 3 && a.opsi.filter((o) => o.benar).length === 1), "setiap pilih: tiga opsi, satu benar");
  const pesanMetode = S.adegan.map((a) => a.cerita).join(" ");
  cek(/Area Model/.test(pesanMetode) && /Whole-as-Fraction/.test(pesanMetode) && /Panah Lurus/.test(pesanMetode) && /Commutative Multiply Check/.test(pesanMetode), "skenario memuat empat metode luar berlabel");
}

/* ------------------------------ Misi ------------------------------ */
{
  sama(Object.keys(TK.MISI_K6B1), ["A", "B"], "teks misi untuk A dan B");
  sama(Object.keys(TK.NAMA_SIM_K6B1), ["A", "B"], "nama simulasi untuk A dan B");
  cek(TK.hurufK6B1("Z") === "A" && TK.hurufK6B1("A") === "A", "huruf tak dikenal jatuh ke A");
  cek(TK.misiAwalK6Bab1("A").startsWith("Simulasi 1. Misi: ") && tanpaAngka(TK.misiAwalK6Bab1("A")), "misi awal dan dapat dieja");
  const daftar = K1.daftarMisiK6Bab1("A");
  cek(K1.daftarMisiK6Bab1("Z") === K1.MISI_A, "huruf tak dikenal memakai misi A");
  cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, "A: tujuh misi wajib dan tiga tantangan bebas");
  cek(new Set(daftar.map((m) => m.id)).size === 10 && daftar.every((m) => m.id.startsWith("a-")), "A: id misi unik berawalan huruf");
  const kosong = [{ alat: "kali", pernah: [] }, { alat: "lain", pernah: [] }, sel("tidak-ada"), A.keadaanKaliK6B1A(A.awalKaliK6B1A())];
  cek(kosong.every((k) => M0.misiBaru(daftar, k, new Set()).length === 0), "A: keadaan awal alat tidak memenuhi misi mana pun");
  cek(daftar.every((m) => m.teks.length > 20 && tanpaAngka(m.teks)), "A: teks misi jelas dan dapat dieja");
  const baru = (k) => M0.misiBaru(daftar, k, new Set());
  cek(baru(sel(K1.ID_MESIN_K6B1.A)).join() === "a-mesin" && baru(sel(K1.ID_SKENARIO_K6B1.A)).join() === "a-skenario", "A: id mesin dan skenario memenuhi misinya");
  cek(baru({ alat: "lain", pernah: ["luas:0", "luas:1", "panah:0", "panah:1", "tukar:0"] }).length === 0, "A: riwayat alat lain tidak memenuhi misi A");
  const capai = (aksi) => baru(A.keadaanKaliK6B1A(jalan(A.awalKaliK6B1A(), L, aksi)));
  const sem = [0, 1, 2, 3, 4, 5];

  cek(capai(seqLuas(0)).join() === "a-luas", "A: Luas 2 × 3/5 memenuhi a-luas");
  cek(capai(seqLuas(1)).join() === "a-luas-utuh", "A: Luas 5 × 3/5 memenuhi a-luas-utuh");
  cek(capai([...seqLuas(0), ...seqLuas(1)]).join() === "a-luas,a-luas-utuh", "A: dua soal Luas memenuhi dua misi");
  cek(capai([...seqLuas(2), ...seqLuas(3)]).length === 0, "A: Luas soal lain tidak memenuhi misi wajib");
  cek(capai(seqLuas(0).slice(0, -1)).length === 0, "A: Luas sampai pembilang saja belum memenuhi");
  cek(capai(seqLuas(0).slice(0, -2)).length === 0, "A: Luas dengan ember lengkap tanpa pembilang belum memenuhi");
  cek(capai([{ t: "L_DATA", i: 0 }, { t: "L_PEMB", o: A.opsiPembLuas(0).benar }, { t: "L_PENY", o: A.opsiPenyLuas(0).benar }]).length === 0, "A: Luas tanpa menambah ember tidak memenuhi");
  cek(capai([...seqLuas(0).slice(0, -1), { t: "L_PENY", o: (A.opsiPenyLuas(0).benar + 1) % 3 }]).length === 0, "A: Luas dengan penyebut salah tidak memenuhi");
  cek(capai([...seqLuas(0).slice(0, 1 + 2), { t: "L_PEMB", o: (A.opsiPembLuas(0).benar + 1) % 3 }, { t: "L_PENY", o: A.opsiPenyLuas(0).benar }]).length === 0, "A: Luas dengan pembilang salah lalu penyebut benar tidak memenuhi");

  cek(capai(seqPanah(0)).join() === "a-panah", "A: Panah 2 × 3/5 memenuhi a-panah");
  cek(capai(seqPanah(1)).join() === "a-panah-lebih", "A: Panah 4 × 2/5 memenuhi a-panah-lebih");
  cek(capai([...seqPanah(0), ...seqPanah(1)]).join() === "a-panah,a-panah-lebih", "A: dua soal Panah memenuhi dua misi");
  cek(capai([...seqPanah(2), ...seqPanah(5)]).length === 0, "A: Panah soal lain tidak memenuhi misi wajib");
  for (let s = 1; s < 4; s += 1) cek(capai(seqPanah(0, s)).length === 0, `A: Panah berhenti setelah langkah ${s} belum memenuhi`);
  cek(capai([{ t: "P_DATA", i: 0 }, { t: "P_ATAS", o: A.opsiAtas(0).benar }, { t: "P_BAWAH", o: A.opsiBawah(0).benar }]).length === 0, "A: Panah tanpa menulis a/1 tidak memenuhi");
  cek(capai([{ t: "P_DATA", i: 0 }, { t: "P_ASLI", o: (A.opsiAsli(0).benar + 1) % 3 }, { t: "P_ATAS", o: A.opsiAtas(0).benar }, { t: "P_BAWAH", o: A.opsiBawah(0).benar }]).length === 0, "A: Panah dengan a/1 salah tidak memenuhi");
  cek(capai([...seqPanah(0, 3), { t: "P_BAWAH", o: (A.opsiBawah(0).benar + 1) % 3 }]).length === 0, "A: Panah dengan bawah salah tidak memenuhi");
  cek(capai(seqPanah(2, 4)).length === 0, "A: Panah 3 × 1/3 tanpa menyederhanakan belum memenuhi riwayat");

  cek(capai(seqTukar(0)).join() === "a-tukar", "A: Tukar 2/3 × 15 memenuhi a-tukar");
  cek(capai(seqTukar(1)).length === 0 && capai(seqTukar(5)).length === 0, "A: Tukar soal lain tidak memenuhi a-tukar");
  for (let s = 1; s < 4; s += 1) cek(capai(seqTukar(0, s)).length === 0, `A: Tukar berhenti setelah langkah ${s} belum memenuhi`);
  cek(capai([{ t: "T_DATA", i: 0 }, { t: "T_CEK", o: A.opsiCekTukar(0).benar }]).length === 0, "A: cek tanpa hitungan awal tidak memenuhi");
  cek(capai([...seqTukar(0, 3), { t: "T_CEK", o: (A.opsiCekTukar(0).benar + 1) % 3 }]).length === 0, "A: cek dengan 'beda' tidak memenuhi");

  // Tantangan.
  cek(capai(sem.flatMap(seqLuas)).join() === "a-luas,a-luas-utuh,a-luas-semua", "A: keenam Luas memenuhi dua misi dan tantangan");
  cek(capai([0, 1, 2, 3, 4].flatMap(seqLuas)).join() === "a-luas,a-luas-utuh", "A: lima Luas belum memenuhi tantangan");
  cek(capai(sem.flatMap((i) => seqPanah(i))).join() === "a-panah,a-panah-lebih,a-panah-semua", "A: keenam Panah memenuhi dua misi dan tantangan");
  cek(capai([0, 1, 2, 3, 4].flatMap((i) => seqPanah(i))).join() === "a-panah,a-panah-lebih", "A: lima Panah belum memenuhi tantangan");
  cek(capai(sem.flatMap((i) => seqTukar(i))).join() === "a-tukar,a-tukar-semua", "A: keenam Tukar memenuhi misi dan tantangan");
  cek(capai([0, 1, 2, 3, 4].flatMap((i) => seqTukar(i))).join() === "a-tukar", "A: lima Tukar belum memenuhi tantangan");
  cek(capai([...seqLuas(3), ...seqPanah(4), ...seqTukar(2)]).length === 0, "A: riwayat pada soal lain, tidak ada misi yang terpenuhi");

  // Gerbang.
  const tampil = M0.tampilMisi(daftar);
  const wajibIds = tampil.filter((m) => m.wajib).map((m) => m.id);
  cek(!M0.wajibSelesai(tampil, new Set(wajibIds.slice(0, 6))), "A: enam dari tujuh wajib belum membuka gerbang");
  cek(M0.wajibSelesai(tampil, new Set(wajibIds)), "A: tujuh wajib membuka gerbang");
  cek(M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: true }) && !M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: false }), "lewati hanya setelah disentuh");
}

/* ======================================================================================== */
/* ====================== Sub-Bab B: Pembagian Pecahan (Lab Bagi Pecahan) ==================== */
/* ======================================================================================== */
globalThis.__pesanB = [];
const LB = BG.langkahBagiK6B1B;
const y0 = BG.awalBagiK6B1B();
const RENCANA_POTONG = [
  { a: 1, b: 2, c: 3 },
  { a: 1, b: 3, c: 3 },
  { a: 3, b: 4, c: 2 },
  { a: 2, b: 3, c: 4 },
  { a: 4, b: 3, c: 2 },
  { a: 3, b: 5, c: 3 },
];
const RENCANA_SILANG = [
  { a: 1, b: 2, p: 3, q: 1 },
  { a: 3, b: 1, p: 1, q: 4 },
  { a: 6, b: 1, p: 3, q: 4 },
  { a: 3, b: 1, p: 2, q: 5 },
  { a: 3, b: 4, p: 2, q: 1 },
  { a: 2, b: 3, p: 4, q: 1 },
];
const RENCANA_MUAT = [
  { w: 3, p: 1, q: 4 },
  { w: 6, p: 3, q: 4 },
  { w: 3, p: 2, q: 5 },
  { w: 4, p: 1, q: 2 },
  { w: 4, p: 2, q: 3 },
  { w: 5, p: 1, q: 3 },
];
const RENCANA_B = { potong: RENCANA_POTONG, silang: RENCANA_SILANG, muat: RENCANA_MUAT };
// Langkah, kunci, dan pilihan MANDIRI tiap soal (tanpa memakai logika lab).
const perluRapi = (p, q) => sederhanaMandiri(p, q)[1] !== q;
const rencanaLangkah = (alat, i) => {
  if (alat === "potong") {
    const { a, b, c } = RENCANA_POTONG[i];
    const l = [
      { nama: "peny", kunci: String(b * c), himpunan: [b * c, b + c, b].map(String) },
      { nama: "pemb", kunci: String(a), himpunan: [a, a * c, a + c].map(String) },
    ];
    if (perluRapi(a, b * c)) l.push({ nama: "rapi", kunci: teksMandiri(a, b * c), himpunan: opsiMandiriRapi(a, b * c) });
    return l;
  }
  if (alat === "silang") {
    const { a, b, p, q } = RENCANA_SILANG[i];
    const l = [
      { nama: "balik", kunci: `${q}/${p}`, himpunan: [`${q}/${p}`, `${p}/${q}`, `${p}/${p}`] },
      { nama: "atas", kunci: String(a * q), himpunan: [a * q, a * p, a + q].map(String) },
      { nama: "bawah", kunci: String(b * p), himpunan: [b * p, b * q, b + q].map(String) },
    ];
    if (perluRapi(a * q, b * p)) l.push({ nama: "rapi", kunci: teksMandiri(a * q, b * p), himpunan: opsiMandiriRapi(a * q, b * p) });
    return l;
  }
  const { w, p, q } = RENCANA_MUAT[i];
  return [
    { nama: "arti", kunci: `lebih besar dari ${w}`, himpunan: [`lebih besar dari ${w}`, `lebih kecil dari ${w}`, `sama dengan ${w}`] },
    { nama: "hasil", kunci: teksMandiri(w * q, p), himpunan: [teksMandiri(w * q, p), teksMandiri(w * p, q), String(w + q)] },
    { nama: "cek", kunci: String(w), himpunan: [String(w), teksMandiri(w * q, p), `${p}/${q}`] },
  ];
};
const ALAT_B = ["potong", "silang", "muat"];
const seqB = (alat, i, sampai = 99) => {
  const l = rencanaLangkah(alat, i);
  const daftar = BG.daftarLangkahBagi(alat, i);
  return [{ t: "DATA", alat, i }, ...l.map((s, k) => ({ t: "JAWAB", alat, langkah: s.nama, o: daftar[k].opsi.indexOf(s.kunci) }))].slice(0, sampai);
};
const hasilAkhirMandiri = (alat, i) => {
  if (alat === "potong") {
    const { a, b, c } = RENCANA_POTONG[i];
    return [a, b * c];
  }
  if (alat === "silang") {
    const { a, b, p, q } = RENCANA_SILANG[i];
    return [a * q, b * p];
  }
  const { w, p, q } = RENCANA_MUAT[i];
  return [w * q, p];
};
const bentukMandiri = (p, q) => {
  const s = teksMandiri(p, q);
  return s === `${p}/${q}` ? s : `${p}/${q} = ${s}`;
};

/* ------------------------------ Data B sama dengan rencana ------------------------------ */
{
  sama(BG.SOAL_POTONG.map((s) => [s.a, s.b, s.c]), RENCANA_POTONG.map((r) => [r.a, r.b, r.c]), "enam soal Potong sesuai rencana");
  sama(BG.SOAL_SILANG.map((s) => [s.a, s.b, s.p, s.q]), RENCANA_SILANG.map((r) => [r.a, r.b, r.p, r.q]), "enam soal Silang sesuai rencana");
  sama(BG.SOAL_MUAT.map((s) => [s.w, s.p, s.q]), RENCANA_MUAT.map((r) => [r.w, r.p, r.q]), "enam soal Muat sesuai rencana");
  cek(BG.SOAL_POTONG.every((s) => s.c >= 2) && BG.SOAL_SILANG.every((s) => s.p < s.q || s.q === 1) && BG.SOAL_MUAT.every((s) => s.p < s.q), "Potong dibagi paling sedikit dua, Muat pembagi kurang dari satu");
  cek(BG.SOAL_POTONG.filter((s) => perluRapi(s.a, s.b * s.c)).length === 3 && BG.SOAL_SILANG.filter((s) => perluRapi(s.a * s.q, s.b * s.p)).length === 2, "Potong: tiga soal perlu disederhanakan; Silang: dua soal");
  cek(BG.SOAL_SILANG.some((s) => s.b === 1) && BG.SOAL_SILANG.some((s) => s.q === 1) && BG.SOAL_SILANG.some((s) => s.b > 1 && s.q > 1 === false), "Silang: ada asli dibagi pecahan, pecahan dibagi asli");
  cek(new Set([...BG.SOAL_POTONG, ...BG.SOAL_SILANG, ...BG.SOAL_MUAT].map((s) => s.nama)).size === 18, "nama 18 soal unik");
  // Hasil kali kembali ke bilangan awal (pembagian diperiksa dengan perkalian silang, tanpa pembagian).
  for (const [alat, daftar] of Object.entries(RENCANA_B)) {
    daftar.forEach((r, i) => {
      const [p, q] = hasilAkhirMandiri(alat, i);
      const awal = alat === "muat" ? [r.w, 1] : alat === "potong" ? [r.a, r.b] : [r.a, r.b];
      const pembagi = alat === "muat" ? [r.p, r.q] : alat === "potong" ? [r.c, 1] : [r.p, r.q];
      // hasil x pembagi = awal  <=>  (p * pembagi.atas) * awal.bawah = awal.atas * (q * pembagi.bawah)
      cek(p * pembagi[0] * awal[1] === awal[0] * q * pembagi[1], `${alat} ${i}: hasil ${p}/${q} dikali pembagi kembali ke bilangan awal (perkalian silang)`);
    });
  }
  sama([BG.bentukHasil(24, 3), BG.bentukHasil(2, 12), BG.bentukHasil(12, 1), BG.bentukHasil(15, 2), BG.bentukHasil(4, 6)], ["24/3 = 8", "2/12 = 1/6", "12/1 = 12", "15/2", "4/6 = 2/3"], "bentuk hasil B");
  sama([BG.teksBagi(BG.SOAL_SILANG[1]), BG.teksBagi(BG.SOAL_SILANG[0]), BG.teksMuat(BG.SOAL_MUAT[1]), BG.teksPotong(BG.SOAL_POTONG[2])], ["3 : 1/4", "1/2 : 3", "6 : 3/4", "3/4 : 2"], "teks soal");
}

/* ------------------------------ Opsi B sama dengan himpunan mandiri ------------------------------ */
{
  const posisiRotasi = (i, r) => (3 - ((i + r) % 3)) % 3;
  const offset = { potong: { peny: 0, pemb: 1, rapi: 0 }, silang: { balik: 0, atas: 1, bawah: 2, rapi: 0 }, muat: { arti: 0, hasil: 1, cek: 2 } };
  for (const alat of ALAT_B) {
    for (let i = 0; i < 6; i += 1) {
      const rc = rencanaLangkah(alat, i);
      const daftar = BG.daftarLangkahBagi(alat, i);
      cek(daftar.length === rc.length && daftar.every((l, k) => l.nama === rc[k].nama), `${alat} ${i}: urutan langkah ${rc.map((s) => s.nama).join(">")}`);
      daftar.forEach((l, k) => {
        sama([...l.opsi].sort(), [...rc[k].himpunan].sort(), `${alat} ${i}/${l.nama}: himpunan pilihan`);
        cek(l.opsi[l.benar] === rc[k].kunci && new Set(l.opsi).size === 3, `${alat} ${i}/${l.nama}: kunci ${rc[k].kunci} dan tiga pilihan unik`);
        cek(l.benar === posisiRotasi(i, offset[alat][l.nama]) || l.nama === "rapi", `${alat} ${i}/${l.nama}: letak kunci eksak`);
        if (l.nama === "rapi") cek(l.benar === posisiRotasi(i, 0), `${alat} ${i}/rapi: letak kunci eksak`);
        cek(l.ok.startsWith("✅") && l.judul.length > 10 && l.awalan.length > 2, `${alat} ${i}/${l.nama}: pesan benar diawali centang dan judul ada`);
        cek(l.opsi.every((o, n) => n === l.benar || (!l.salah(n).startsWith("✅") && l.salah(n).length > 25)), `${alat} ${i}/${l.nama}: pesan salah jelas dan bukan sukses`);
        globalThis.__pesanB.push(l.ok, l.judul, ...l.opsi.map((_, n) => l.salah(n)));
      });
    }
    const letak = [0, 1, 2, 3, 4, 5].map((i) => BG.daftarLangkahBagi(alat, i)[0].benar);
    cek(new Set(letak).size === 3, `letak kunci langkah pertama ${alat} bervariasi (${letak.join("")})`);
  }
  // Pengecoh kesalahan khas.
  const sil0 = BG.langkahSilang(0)[0].opsi;
  cek(sil0.includes("1/3") && sil0.includes("3/1") && sil0.includes("3/3"), "Silang: pengecoh kebalikan (tidak dibalik dan penyebut sama)");
  const mua = BG.langkahMuat(0)[1].opsi;
  cek(mua.includes("12") && mua.includes("3/4") && mua.includes("7"), "Muat: pengecoh tidak dibalik (3/4) dan dijumlah (7)");
  const pot = BG.langkahPotong(0)[0].opsi;
  cek(pot.includes("6") && pot.includes("5") && pot.includes("2"), "Potong: pengecoh penyebut dijumlah (5) dan tidak berubah (2)");
}

/* ------------------------------ Lab B ------------------------------ */
{
  sama(BG.keadaanBagiK6B1B(y0), { alat: "bagi", pernah: [] }, "keadaan awal B");
  cek(y0.pernah.length === 0 && y0.pesan === "" && ALAT_B.every((a) => y0[a].data === 0 && y0[a].tahap === 0), "awal B: kosong");
  for (const alat of ALAT_B) {
    for (let i = 0; i < 6; i += 1) {
      const rc = rencanaLangkah(alat, i);
      const urut = seqB(alat, i);
      let y = y0;
      const rekam = [];
      for (const a of urut) {
        y = LB(y, a);
        globalThis.__pesanB.push(y.pesan);
        rekam.push(y);
      }
      cek(y.pernah.join() === `${alat}:${i}` && BG.tahapSelesai(y, alat) && y[alat].tahap === rc.length, `${alat} ${i}: urutan benar menambah ${alat}:${i}`);
      cek(!rekam.slice(0, -1).some((s) => s.pernah.length > 0), `${alat} ${i}: riwayat baru muncul di langkah terakhir`);
      cek(rekam.slice(1).every((s, k) => s.pesan.startsWith("✅") && s[alat].tahap === k + 1), `${alat} ${i}: tiap langkah benar maju satu tahap dengan pesan sukses`);
      const [hp, hq] = hasilAkhirMandiri(alat, i);
      const akhir = rekam[alat === "muat" ? 2 : rekam.length - 1].pesan;
      const simpl = teksMandiri(hp, hq);
      cek(akhir.includes(bentukMandiri(hp, hq)) || (alat === "silang" && akhir.includes(bentukMandiri(hp, hq))), `${alat} ${i}: pesan akhir memuat hasil mandiri "${bentukMandiri(hp, hq)}" (${akhir})`);
      if (alat !== "muat") cek(akhir.includes(simpl), `${alat} ${i}: pesan akhir memuat bentuk sederhana ${simpl}`);
      else cek(rekam[3].pesan.includes(`${simpl} × ${RENCANA_MUAT[i].p}/${RENCANA_MUAT[i].q} = ${RENCANA_MUAT[i].w}`), `muat ${i}: pesan cek memuat hasil kali kembali ke awal`);
      // Tiap pilihan pada tiap langkah: benar maju, salah ditolak (tahap dan riwayat tetap).
      rc.forEach((s, k) => {
        const awal = jalan(y0, LB, urut.slice(0, 1 + k));
        cek(awal[alat].tahap === k, `${alat} ${i}: awal langkah ${s.nama} di tahap ${k}`);
        const daftar = BG.daftarLangkahBagi(alat, i);
        for (let o = 0; o < 3; o += 1) {
          const z = LB(awal, { t: "JAWAB", alat, langkah: s.nama, o });
          const benar = daftar[k].opsi[o] === s.kunci;
          if (benar) cek(z[alat].tahap === k + 1 && z.pesan.startsWith("✅"), `${alat} ${i}/${s.nama}: pilihan ${o} benar maju`);
          else cek(z[alat].tahap === k && z.pernah.length === 0 && !z.pesan.startsWith("✅") && z.pesan.includes("belum tepat"), `${alat} ${i}/${s.nama}: pilihan ${o} salah ditolak`);
          globalThis.__pesanB.push(z.pesan);
        }
        // Langkah lain: yang sudah lewat diabaikan total, yang belum waktunya ditolak dengan pesan.
        rc.forEach((s2, k2) => {
          if (k2 === k) return;
          const z = LB(awal, { t: "JAWAB", alat, langkah: s2.nama, o: 0 });
          if (k2 < k) cek(z === awal, `${alat} ${i}: langkah ${s2.nama} yang sudah lewat tidak mengubah apa pun`);
          else {
            cek(z[alat].tahap === k && z.pernah.length === 0 && !z.pesan.startsWith("✅") && z.pesan.length > 10, `${alat} ${i}: langkah ${s2.nama} sebelum waktunya ditolak di tahap ${k}`);
            globalThis.__pesanB.push(z.pesan);
          }
        });
      });
      // Langkah yang tidak ada pada soal ini (mis. rapi pada soal yang sudah sederhana) diabaikan.
      const ada = new Set(rc.map((s) => s.nama));
      for (const nm of ["peny", "pemb", "rapi", "balik", "atas", "bawah", "arti", "hasil", "cek"]) {
        if (ada.has(nm)) continue;
        const z = LB(jalan(y0, LB, urut.slice(0, 2)), { t: "JAWAB", alat, langkah: nm, o: 0 });
        cek(z === jalan(y0, LB, urut.slice(0, 2)) || JSON.stringify(z) === JSON.stringify(jalan(y0, LB, urut.slice(0, 2))), `${alat} ${i}: langkah ${nm} tak ada pada soal ini diabaikan`);
      }
      // Setelah selesai, aksi lanjutan tidak mengubah apa pun (termasuk pesan).
      const sudah = y;
      for (const s of rc) for (let o = 0; o < 3; o += 1) cek(JSON.stringify(LB(sudah, { t: "JAWAB", alat, langkah: s.nama, o })) === JSON.stringify(sudah), `${alat} ${i}: setelah selesai ${s.nama}/${o} tidak mengubah`);
    }
  }
  // Ganti soal mengosongkan tahap, riwayat dan tampilan lain tetap.
  {
    const y = jalan(y0, LB, [...seqB("silang", 0), ...seqB("potong", 0, 2), { t: "DATA", alat: "silang", i: 2 }]);
    cek(y.silang.data === 2 && y.silang.tahap === 0 && y.pernah.join() === "silang:0" && y.pesan === "" && y.potong.tahap === 1 && y.potong.data === 0, "ganti soal Silang mengosongkan tahap Silang saja, riwayat tetap");
    const ulang = jalan(y0, LB, [...seqB("muat", 0), { t: "DATA", alat: "muat", i: 0 }]);
    cek(ulang.muat.tahap === 0 && ulang.pernah.join() === "muat:0", "soal yang sama bisa diulang, riwayat tetap");
  }
  // Aksi asing diabaikan.
  const asingB = [
    ...[-1, 6, 1.5, NaN, "1", null, undefined].flatMap((i) => ALAT_B.map((alat) => ({ t: "DATA", alat, i }))),
    { t: "DATA", alat: "lain", i: 0 }, { t: "DATA", alat: "__proto__", i: 0 }, { t: "DATA", alat: "pernah", i: 0 }, { t: "DATA", alat: undefined, i: 0 },
    ...[-1, 3, 7, 0.5, NaN, "1", null, undefined].flatMap((o) => ALAT_B.map((alat) => ({ t: "JAWAB", alat, langkah: "peny", o }))),
    { t: "JAWAB", alat: "lain", langkah: "peny", o: 0 }, { t: "JAWAB", alat: "pernah", langkah: "peny", o: 0 }, { t: "JAWAB", alat: "silang", langkah: "tidak-ada", o: 0 }, { t: "JAWAB", alat: "silang", langkah: undefined, o: 0 },
    { t: "TIDAK_ADA" },
  ];
  const siapB = jalan(y0, LB, [...seqB("potong", 1, 2), ...seqB("silang", 0, 2), ...seqB("muat", 0, 2)]);
  for (const a of asingB) cek(JSON.stringify(LB(siapB, a)) === JSON.stringify(siapB), `aksi asing B diabaikan: ${JSON.stringify(a)}`);
  sama(LB(siapB, { t: "RESET" }), y0, "RESET B kembali ke awal");
  cek(LB(jalan(y0, LB, seqB("potong", 0)), { t: "PESAN_KOSONG" }).pesan === "" && LB(jalan(y0, LB, seqB("potong", 0)), { t: "PESAN_KOSONG" }).pernah.length === 1, "PESAN_KOSONG B hanya mengosongkan pesan");
  // Langkah aktif dan penanda sudah-ditempuh untuk tampilan.
  const aktifTes = jalan(y0, LB, seqB("silang", 0, 3));
  cek(BG.langkahAktifBagi(aktifTes, "silang").nama === "bawah" && BG.sudahLangkah(aktifTes, "silang", "balik") && BG.sudahLangkah(aktifTes, "silang", "atas") && !BG.sudahLangkah(aktifTes, "silang", "bawah") && !BG.sudahLangkah(aktifTes, "silang", "rapi"), "langkah aktif dan sudah ditempuh");
  cek(BG.langkahAktifBagi(jalan(y0, LB, seqB("silang", 0)), "silang") === null && BG.tahapSelesai(jalan(y0, LB, seqB("silang", 0)), "silang"), "soal selesai: tidak ada langkah aktif");
}

/* ------------------------------ Fuzz B 20.000 aksi dengan orakel mandiri ------------------------------ */
{
  const acak = acakDari(20261113);
  const o = { potong: { data: 0, tahap: 0 }, silang: { data: 0, tahap: 0 }, muat: { data: 0, tahap: 0 }, pernah: new Set() };
  let y = y0;
  const NAMA = ["peny", "pemb", "rapi", "balik", "atas", "bawah", "arti", "hasil", "cek"];
  const terapkan = (a) => {
    const sebelum = new Set(o.pernah);
    const sahI = (i) => Number.isInteger(i) && i >= 0 && i < 6;
    if (a.t === "DATA" && ALAT_B.includes(a.alat) && sahI(a.i)) o[a.alat] = { data: a.i, tahap: 0 };
    if (a.t === "JAWAB" && ALAT_B.includes(a.alat) && Number.isInteger(a.o) && a.o >= 0 && a.o < 3) {
      const rc = rencanaLangkah(a.alat, o[a.alat].data);
      const k = rc.findIndex((s) => s.nama === a.langkah);
      if (k >= 0 && o[a.alat].tahap === k && BG.daftarLangkahBagi(a.alat, o[a.alat].data)[k].opsi[a.o] === rc[k].kunci) {
        o[a.alat].tahap += 1;
        if (o[a.alat].tahap === rc.length) o.pernah.add(`${a.alat}:${o[a.alat].data}`);
      }
    }
    if (a.t === "RESET") {
      o.potong = { data: 0, tahap: 0 };
      o.silang = { data: 0, tahap: 0 };
      o.muat = { data: 0, tahap: 0 };
      o.pernah = new Set();
    }
    return [...o.pernah].filter((v) => !sebelum.has(v));
  };
  const benarBerikut = (alat) => {
    const rc = rencanaLangkah(alat, o[alat].data);
    const k = o[alat].tahap;
    if (k >= rc.length) return { t: "DATA", alat, i: acak(6) };
    return { t: "JAWAB", alat, langkah: rc[k].nama, o: BG.daftarLangkahBagi(alat, o[alat].data)[k].opsi.indexOf(rc[k].kunci) };
  };
  const nilaiAcak = () => [0, 1, 2, 0, 1, 2, -1, 3, 1.5, NaN, 99][acak(11)];
  let ok = true;
  const selesai = { potong: 0, silang: 0, muat: 0 };
  for (let n = 0; n < 20000 && ok; n += 1) {
    let a;
    if (acak(10) < 5) a = benarBerikut(ALAT_B[acak(3)]);
    else {
      const alat = [...ALAT_B, "lain", "pernah"][acak(5)];
      const jenis = acak(8);
      if (jenis === 0) a = { t: "DATA", alat, i: [0, 1, 2, 3, 4, 5, -1, 6, 2.5, NaN][acak(10)] };
      else if (jenis === 7) a = acak(10) === 0 ? { t: "RESET" } : { t: "PESAN_KOSONG" };
      else a = { t: "JAWAB", alat, langkah: NAMA[acak(NAMA.length)], o: nilaiAcak() };
    }
    const baru = terapkan(a);
    const sebelum = y.pernah.length;
    const sebelumY = y;
    y = LB(y, a);
    if (a.t === "JAWAB" && !(Number.isInteger(a.o) && a.o >= 0 && a.o < 3)) cek(y === sebelumY, `fuzz B ${n}: pilihan di luar batas tidak mengubah apa pun`);
    globalThis.__pesanB.push(y.pesan);
    if (a.t === "RESET") ok = ok && y.pernah.length === 0 && y.pesan === "";
    else cek(y.pernah.length >= sebelum, `fuzz B ${n}: riwayat tidak dicabut`);
    const cocok = ALAT_B.every((al) => y[al].data === o[al].data && y[al].tahap === o[al].tahap) && JSON.stringify([...y.pernah].sort()) === JSON.stringify([...o.pernah].sort());
    if (!cocok) {
      ok = false;
      console.log("fuzz B beda dari orakel di langkah", n, JSON.stringify(a), JSON.stringify(y), JSON.stringify({ ...o, pernah: [...o.pernah] }));
    }
    if (baru.length > 0) {
      cek(y.pesan.startsWith("✅"), `fuzz B ${n}: id baru ${baru.join()} diawali pesan sukses`);
      selesai[baru[0].split(":")[0]] += 1;
    }
    cek(ALAT_B.every((al) => y[al].tahap >= 0 && y[al].tahap <= BG.daftarLangkahBagi(al, y[al].data).length), `fuzz B ${n}: batas terjaga`);
  }
  cek(ok, "fuzz B 20.000 aksi: keadaan sama dengan orakel mandiri");
  cek(selesai.potong > 10 && selesai.silang > 10 && selesai.muat > 10, `fuzz B: tiap tampilan selesai berkali-kali (${selesai.potong}, ${selesai.silang}, ${selesai.muat})`);
  cek(y.pernah.every((v) => /^(potong|silang|muat):[0-5]$/.test(v)), "fuzz B: semua id riwayat berbentuk sah");
}

/* ------------------------------ Mesin B ------------------------------ */
{
  const def = MB.MESIN_BAGI;
  cek(def.stasiun.length === 4 && def.kasus.length === 3, `${def.id}: empat stasiun, tiga kasus`);
  sama(def.stasiun.map((s) => s.id), ["balik", "silang", "hasil", "cek"], "stasiun mesin B");
  const posisi = [];
  for (const kasus of def.kasus) {
    cek(kasus.langkah.length === 4, `${def.id}/${kasus.id}: empat langkah`);
    kasus.langkah.forEach((l, i) => {
      cek(l.stasiun === def.stasiun[i].id, `${def.id}/${kasus.id}: langkah ${i + 1} di stasiun ${def.stasiun[i].id}`);
      cek(l.opsi.length === 3 && new Set(l.opsi).size === 3 && l.opsi.filter((x) => x === l.benar).length === 1, `${def.id}/${kasus.id}/${l.stasiun}: tiga pilihan unik, satu kunci`);
      cek([l.tanya, l.petunjuk, ...l.opsi].every(tanpaAngka), `${def.id}/${kasus.id}/${l.stasiun}: dapat dieja`);
      posisi.push(l.opsi.indexOf(l.benar));
    });
    cek(tanpaAngka(kasus.nama) && tanpaAngka(kasus.ringkas), `${def.id}/${kasus.id}: nama dan ringkas dapat dieja`);
  }
  cek(new Set(posisi).size === 3, `${def.id}: letak kunci bervariasi (${posisi.join("")})`);
  for (const [s, offset] of [[0, 0], [1, 1], [2, 2], [3, 3]]) {
    sama(def.kasus.map((k) => k.langkah[s].opsi.indexOf(k.langkah[s].benar)), [0, 1, 2].map((i) => (3 - ((i + offset) % 3)) % 3), `${def.id}: letak kunci eksak stasiun ${def.stasiun[s].id}`);
  }
  let x = ME.awalMesin(def);
  let n = 0;
  while (!x.selesai && n < 100) {
    n += 1;
    const l = ME.langkahAktif(x);
    x = l ? ME.langkahMesin(x, { t: "JAWAB", nilai: l.benar }) : ME.langkahMesin(x, { t: "LANJUT" });
  }
  cek(x.selesai && def.selesaiId === K1.ID_MESIN_K6B1.B, `${def.id}: bisa diselesaikan, id selesai sesuai misi`);
  const yy = ME.awalMesin(def);
  const l0 = ME.langkahAktif(yy);
  const zz = ME.langkahMesin(yy, { t: "JAWAB", nilai: l0.opsi.find((v) => v !== l0.benar) });
  cek(zz.ke === 0 && zz.ditolak === 1 && zz.pesan === l0.petunjuk, `${def.id}: jawaban salah ditolak dengan petunjuk`);

  const RENCANA_M = [
    { id: "gelas", a: 1, b: 2, p: 3, q: 1 },
    { id: "muat", a: 3, b: 1, p: 1, q: 4 },
    { id: "bolu", a: 6, b: 1, p: 3, q: 4 },
  ];
  sama(MB.KASUS_BAGI.map((k) => [k.id, k.a, k.b, k.p, k.q]), RENCANA_M.map((r) => [r.id, r.a, r.b, r.p, r.q]), "Mesin B: data tiga kasus sesuai rencana");
  const t = (p, q) => (q === 1 ? String(p) : `${p}/${q}`);
  for (const [i, r] of RENCANA_M.entries()) {
    const c = def.kasus[i];
    const [ba, si, ha, ce] = c.langkah;
    const atas = r.a * r.q;
    const bawah = r.b * r.p;
    const soal = `${t(r.a, r.b)} : ${t(r.p, r.q)}`;
    cek(ba.benar === `${r.q}/${r.p}` && ba.tanya.includes(soal), `Mesin B ${r.id}: kebalikan ${r.q}/${r.p}`);
    sama(sortir(ba.opsi), sortir([`${r.q}/${r.p}`, `${r.p}/${r.q}`, `${r.p}/${r.p}`]), `Mesin B ${r.id}: pengecoh kebalikan (tidak dibalik dan sama)`);
    cek(si.benar === String(atas) && si.tanya.includes(`${t(r.a, r.b)} × ${r.q}/${r.p}`) && !si.tanya.includes("= "), `Mesin B ${r.id}: silang atas ${atas}`);
    sama(sortir(si.opsi), sortir([atas, r.a * r.p, r.a + r.q]), `Mesin B ${r.id}: pengecoh silang`);
    cek(ha.benar === teksMandiri(atas, bawah) && ha.tanya.includes(soal), `Mesin B ${r.id}: hasil ${teksMandiri(atas, bawah)} (hitungan mandiri)`);
    sama(sortir(ha.opsi), sortir([teksMandiri(atas, bawah), teksMandiri(r.a * r.p, r.b * r.q), teksMandiri(bawah, atas)]), `Mesin B ${r.id}: pengecoh hasil (tidak dibalik dan terbalik)`);
    cek(setaraMandiri(...sederhanaMandiri(atas, bawah), atas, bawah), `Mesin B ${r.id}: hasil setara lewat perkalian silang`);
    cek(ce.benar === t(r.a, r.b) && ce.tanya.includes(soal), `Mesin B ${r.id}: cek kembali ke ${t(r.a, r.b)}`);
    sama(sortir(ce.opsi), sortir([t(r.a, r.b), teksMandiri(atas, bawah), t(r.p, r.q)]), `Mesin B ${r.id}: pengecoh cek (hasil dan pembagi)`);
    // Kunci cek diperiksa mandiri: hasil x pembagi = awal (perkalian silang).
    const [hp, hq] = sederhanaMandiri(atas, bawah);
    cek(hp * r.p * r.b === r.a * hq * r.q, `Mesin B ${r.id}: hasil dikali pembagi kembali ke awal`);
    cek(c.ringkas.includes(`${r.q}/${r.p}`) && c.ringkas.includes(`${atas}/${bawah}`) && c.ringkas.includes(teksMandiri(atas, bawah)), `Mesin B ${r.id}: ringkas memuat langkah dan hasil`);
    const sd2 = teksMandiri(atas, bawah);
    sama(c.ringkas, `${soal}: kebalikan ${t(r.p, r.q)} adalah ${r.q}/${r.p}. ${t(r.a, r.b)} × ${r.q}/${r.p} = ${atas}/${bawah}${sd2 === `${atas}/${bawah}` ? "" : ` = ${sd2}`}. Cek: ${sd2} × ${t(r.p, r.q)} = ${t(r.a, r.b)}.`, `Mesin B ${r.id}: ringkas eksak`);
  }
}

/* ------------------------------ Skenario B ------------------------------ */
{
  const S = SK.SKENARIO_K6B1B;
  cek(S.adegan.length >= 5 && S.adegan.length <= 8, `${S.id}: 5 sampai 8 adegan`);
  cek(S.adegan[0].jenis === "narasi" && S.adegan[S.adegan.length - 1].jenis === "akhir", `${S.id}: buka dan tutup`);
  cek(new Set(S.adegan.map((a) => a.jenis)).size >= 4, `${S.id}: paling sedikit empat jenis adegan`);
  const semuaTeks = [];
  for (const a of S.adegan) {
    semuaTeks.push(a.cerita);
    for (const op of a.opsi ?? []) semuaTeks.push(op.teks, op.umpan);
    for (const q of a.soal ?? []) semuaTeks.push(q.teks, ...q.opsi);
    for (const f of ["tanya", "sukses", "salah", "kurang", "lebih"]) if (a[f]) semuaTeks.push(a[f]);
  }
  cek(semuaTeks.every(tanpaAngka), `${S.id}: semua teks dapat dieja`);
  sama(S.id.replace(/-k6b1$/, ""), K1.ID_SKENARIO_K6B1.B, "id skenario B sesuai id misi");
  const adegan = (id) => S.adegan.find((a) => a.id === id);
  const gelas = adegan("gelas");
  const kb = gelas.opsi.filter((op) => op.benar);
  cek(kb.length === 1 && kb[0].teks === `${teksMandiri(1 * 1, 2 * 3)} liter` && gelas.cerita.includes("1/2") && gelas.cerita.includes("3 gelas"), "gelas: 1/2 : 3 = 1/6 liter (hitungan mandiri)");
  cek(gelas.opsi.length === 3 && new Set(gelas.opsi.map((op) => op.teks)).size === 3 && gelas.opsi.some((op) => op.teks === "1/5 liter") && gelas.opsi.some((op) => op.teks === "3/2 liter"), "gelas: pengecoh 1/5 (dijumlah) dan 3/2 (dikali)");
  const tiga = adegan("tiga");
  cek(tiga.jumlah === 3 && tiga.objek === "stik" && tiga.sukses.includes(`1/2 × 1/3 = ${teksMandiri(1 * 1, 2 * 3)}`), "tiga: ketuk 3 stik, 1/2 × 1/3 = 1/6");
  const balik = adegan("balik");
  cek(balik.soal[0].jawaban === "1/3" && balik.soal[0].teks.includes("3/1") && balik.soal[1].jawaban === teksMandiri(1 * 1, 2 * 3) && balik.soal[1].teks.includes("1/2 × 1/3"), "balik: kebalikan 3/1 adalah 1/3 dan 1/2 × 1/3 = 1/6");
  const muat = adegan("muat");
  cek(muat.soal[0].jawaban === teksMandiri(3 * 4, 1) && muat.soal[0].teks.includes("3 × 4/1") && muat.soal[1].jawaban === teksMandiri(6 * 4, 3) && muat.soal[1].teks.includes("24/3"), "muat: 3 : 1/4 = 12 dan 6 : 3/4 = 24/3 = 8");
  for (const q of [...balik.soal, ...muat.soal]) cek(q.opsi.length === 3 && q.opsi.filter((v) => v === q.jawaban).length === 1 && new Set(q.opsi).size === 3, `soal "${q.teks}": tiga pilihan satu kunci`);
  const bolu = adegan("bolu");
  cek(bolu.target === teksMandiri(6 * 4, 3) * 1 && bolu.maks > bolu.target && bolu.objek === "stik" && bolu.sukses.includes("6 × 4/3 = 8"), "bolu: 6 : 3/4 = 8 pembeli");
  const salah = adegan("salah");
  cek(salah.opsi.filter((op) => op.benar).length === 1 && salah.opsi.find((op) => op.benar).teks.includes("4/1") && salah.cerita.includes("12 × 1/4 = 3") && 12 * 1 * 1 === 3 * 4 * 1 && salah.opsi.find((op) => op.benar).umpan.includes("3 × 4/1 = 12"), "salah: 3 : 1/4 belum dibalik, cek 12 × 1/4 = 3");
  const posisi = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((op) => op.benar));
  cek(new Set(posisi).size === posisi.length, `letak jawaban pilih B bervariasi (${posisi.join("")})`);
  for (const id of ["balik", "muat"]) {
    const ps = adegan(id).soal.map((q) => q.opsi.indexOf(q.jawaban));
    cek(ps.every((p) => p >= 0) && new Set(ps).size === ps.length, `letak jawaban soal ${id} bervariasi (${ps.join("")})`);
  }
  cek(S.adegan.filter((a) => a.jenis === "pilih").every((a) => a.opsi.length === 3 && a.opsi.filter((op) => op.benar).length === 1), "setiap pilih B: tiga opsi, satu benar");
  const metode = S.adegan.map((a) => a.cerita).join(" ");
  cek(/Partition Division/.test(metode) && /Reciprocal/.test(metode) && /Cross-Arrow Divide Protocol/.test(metode) && /Measurement Division/.test(metode), "skenario B memuat empat metode luar berlabel");
}

/* ------------------------------ Misi B ------------------------------ */
{
  const daftar = K1.daftarMisiK6Bab1("B");
  cek(daftar === K1.MISI_B && K1.daftarMisiK6Bab1("A") === K1.MISI_A, "daftar misi B dan A terpisah");
  cek(TK.hurufK6B1("B") === "B" && TK.misiAwalK6Bab1("B").startsWith("Simulasi 1. Misi: ") && tanpaAngka(TK.misiAwalK6Bab1("B")), "misi awal B dan dapat dieja");
  cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, "B: tujuh misi wajib dan tiga tantangan bebas");
  cek(new Set(daftar.map((m) => m.id)).size === 10 && daftar.every((m) => m.id.startsWith("b-")), "B: id misi unik berawalan huruf");
  const kosong = [{ alat: "bagi", pernah: [] }, { alat: "lain", pernah: [] }, sel("tidak-ada"), BG.keadaanBagiK6B1B(BG.awalBagiK6B1B()), A.keadaanKaliK6B1A(A.awalKaliK6B1A())];
  cek(kosong.every((k) => M0.misiBaru(daftar, k, new Set()).length === 0), "B: keadaan awal alat tidak memenuhi misi mana pun");
  cek(daftar.every((m) => m.teks.length > 20 && tanpaAngka(m.teks)), "B: teks misi jelas dan dapat dieja");
  const baru = (k) => M0.misiBaru(daftar, k, new Set());
  cek(baru(sel(K1.ID_MESIN_K6B1.B)).join() === "b-mesin" && baru(sel(K1.ID_SKENARIO_K6B1.B)).join() === "b-skenario", "B: id mesin dan skenario memenuhi misinya");
  cek(baru(sel(K1.ID_MESIN_K6B1.A)).length === 0 && baru(sel(K1.ID_SKENARIO_K6B1.A)).length === 0, "B: id mesin dan skenario A tidak memenuhi misi B");
  cek(baru({ alat: "kali", pernah: ["potong:0", "silang:0", "silang:2", "muat:0", "muat:1"] }).length === 0, "B: riwayat alat lain (kali) tidak memenuhi misi B");
  cek(M0.misiBaru(K1.MISI_A, { alat: "bagi", pernah: ["luas:0", "panah:0", "tukar:0"] }, new Set()).length === 0, "A: riwayat alat bagi tidak memenuhi misi A");
  const capai = (aksi) => baru(BG.keadaanBagiK6B1B(jalan(BG.awalBagiK6B1B(), LB, aksi)));
  const sem = [0, 1, 2, 3, 4, 5];
  cek(capai(seqB("potong", 0)).join() === "b-potong", "B: Potong 1/2 : 3 memenuhi b-potong");
  cek(capai(seqB("potong", 1)).length === 0 && capai(seqB("potong", 3)).length === 0, "B: Potong soal lain tidak memenuhi misi wajib");
  for (let s = 1; s < 3; s += 1) cek(capai(seqB("potong", 0, s)).length === 0, `B: Potong berhenti setelah langkah ${s} belum memenuhi`);
  cek(capai(seqB("silang", 0)).join() === "b-silang", "B: Silang 1/2 : 3 memenuhi b-silang");
  cek(capai(seqB("silang", 2)).join() === "b-silang-asli", "B: Silang 6 : 3/4 memenuhi b-silang-asli");
  cek(capai([...seqB("silang", 0), ...seqB("silang", 2)]).join() === "b-silang,b-silang-asli", "B: dua soal Silang memenuhi dua misi");
  cek(capai(seqB("silang", 1)).length === 0 && capai(seqB("silang", 5)).length === 0, "B: Silang soal lain tidak memenuhi misi wajib");
  for (let s = 1; s < 4; s += 1) cek(capai(seqB("silang", 2, s)).length === 0, `B: Silang 6 : 3/4 berhenti setelah langkah ${s} belum memenuhi (sederhana wajib)`);
  cek(capai(seqB("silang", 2, 5)).join() === "b-silang-asli" && seqB("silang", 2).length === 5, "B: Silang 6 : 3/4 punya empat langkah termasuk menyederhanakan");
  cek(capai([{ t: "DATA", alat: "silang", i: 0 }, { t: "JAWAB", alat: "silang", langkah: "atas", o: BG.langkahSilang(0)[1].benar }]).length === 0, "B: Silang tanpa membalik dulu tidak memenuhi");
  cek(capai([{ t: "DATA", alat: "silang", i: 0 }, { t: "JAWAB", alat: "silang", langkah: "balik", o: (BG.langkahSilang(0)[0].benar + 1) % 3 }, ...seqB("silang", 0).slice(2)]).length === 0, "B: Silang dengan kebalikan salah tidak memenuhi");
  cek(capai(seqB("muat", 0)).join() === "b-muat", "B: Muat 3 : 1/4 memenuhi b-muat");
  cek(capai(seqB("muat", 1)).join() === "b-muat-enam", "B: Muat 6 : 3/4 memenuhi b-muat-enam");
  cek(capai([...seqB("muat", 0), ...seqB("muat", 1)]).join() === "b-muat,b-muat-enam", "B: dua soal Muat memenuhi dua misi");
  cek(capai(seqB("muat", 2)).length === 0 && capai(seqB("muat", 5)).length === 0, "B: Muat soal lain tidak memenuhi misi wajib");
  for (let s = 1; s < 4; s += 1) cek(capai(seqB("muat", 0, s)).length === 0, `B: Muat berhenti setelah langkah ${s} belum memenuhi (cek wajib)`);
  cek(capai([{ t: "DATA", alat: "muat", i: 0 }, { t: "JAWAB", alat: "muat", langkah: "cek", o: BG.langkahMuat(0)[2].benar }]).length === 0, "B: Muat melompat ke cek tidak memenuhi");
  // Tantangan.
  cek(capai(sem.flatMap((i) => seqB("potong", i))).join() === "b-potong,b-potong-semua", "B: keenam Potong memenuhi misi dan tantangan");
  cek(capai([0, 1, 2, 3, 4].flatMap((i) => seqB("potong", i))).join() === "b-potong", "B: lima Potong belum memenuhi tantangan");
  cek(capai(sem.flatMap((i) => seqB("silang", i))).join() === "b-silang,b-silang-asli,b-silang-semua", "B: keenam Silang memenuhi dua misi dan tantangan");
  cek(capai([0, 1, 2, 3, 4].flatMap((i) => seqB("silang", i))).join() === "b-silang,b-silang-asli", "B: lima Silang belum memenuhi tantangan");
  cek(capai(sem.flatMap((i) => seqB("muat", i))).join() === "b-muat,b-muat-enam,b-muat-semua", "B: keenam Muat memenuhi dua misi dan tantangan");
  cek(capai([0, 1, 2, 3, 4].flatMap((i) => seqB("muat", i))).join() === "b-muat,b-muat-enam", "B: lima Muat belum memenuhi tantangan");
  cek(capai([...seqB("potong", 4), ...seqB("silang", 4), ...seqB("muat", 2)]).length === 0, "B: riwayat pada soal lain, tidak ada misi yang terpenuhi");
  const tampil = M0.tampilMisi(daftar);
  const wajibIds = tampil.filter((m) => m.wajib).map((m) => m.id);
  cek(!M0.wajibSelesai(tampil, new Set(wajibIds.slice(0, 6))) && M0.wajibSelesai(tampil, new Set(wajibIds)), "B: tujuh wajib membuka gerbang, enam belum");
}

/* ------------------------------ Konsep tidak bocor ke Sub-Bab B ------------------------------ */
{
  const baca = (nama, ekstensi) => readFileSync(new URL(`../src/components/modul/${nama}.${ekstensi}`, import.meta.url), "utf8");
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas6-bab1-ringkas.json", import.meta.url), "utf8"));
  const tanpaKomentar = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  const teksDari = (obj) => {
    const hasil = [];
    JSON.stringify(obj, (k, v) => {
      if (typeof v === "string" && k !== "tipe" && k !== "jenis") hasil.push(v);
      return v;
    });
    return hasil.join(" | ");
  };
  // Sub-Bab B boleh memakai perkalian dari A tetapi tidak membahas bilangan desimal (Sub-Bab C).
  const BOCOR_B = /(desimal|\bkoma\b|persepuluh|perseratus|tenths|hundredths|decimal|place-value|\d,\d|\bnol koma)/i;
  const catat = (teks, apa) => {
    const m = BOCOR_B.exec(teks);
    cek(!m, `B: ${apa} bebas konsep desimal (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
  };
  for (const t of [TK.MISI_K6B1.B, TK.NAMA_SIM_K6B1.B, ...K1.MISI_B.map((m) => m.teks)]) catat(t, "teks misi");
  for (const [nama, obj] of [["mesin", MB.MESIN_BAGI], ["skenario", SK.SKENARIO_K6B1B], ["peta dan infografis ringkas", ringkas.subBab.B]]) catat(teksDari(obj), nama);
  for (const [f, e] of [["SimulasiLabBagiK6B1", "tsx"], ["model-bagi-k6b1", "tsx"], ["lab-bagi-k6b1b", "ts"]]) catat(tanpaKomentar(baca(f, e)).replace(/ ([-=+] |=> )/g, " "), `${f} (tanpa komentar)`);
  for (const p of globalThis.__pesanB) catat(p, "pesan lab dari fuzz");
  for (const u of [BG.ucapPotongK6B1B(y0), BG.ucapSilangK6B1B(y0), BG.ucapMuatK6B1B(y0)]) catat(u, "ucapan lab");
  cek(globalThis.__pesanB.length > 20000, `pesan B terkumpul (${globalThis.__pesanB.length})`);

  for (const f of ["SimulasiLabBagiK6B1", "model-bagi-k6b1"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s), `${f}: tidak memuat correct_index atau explanation`);
    cek(!/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa jaringan atau model bahasa`);
  }
  for (const f of ["lab-bagi-k6b1b", "mesin-bagi-k6b1"]) {
    const s = baca(f, "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: murni`);
    cek((s.match(/^import .+$/gm) ?? []).every((l) => l.startsWith("import type")), `${f}: hanya mengimpor tipe`);
  }
  cek((baca("lab-bagi-k6b1b", "ts").match(/^import /gm) ?? []).length === 0, "lab B tanpa impor sama sekali");
  cek(!/\.toFixed|parseFloat|Math\.(round|floor|ceil|random)|\d\.\d/.test(tanpaKomentar(baca("lab-bagi-k6b1b", "ts"))), "logika lab B: hanya bilangan bulat");
  {
    const s = baca("SimulasiLabBagiK6B1", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s), "lab B: lapor keadaan lewat useEffect");
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), "lab B: ganti tampilan mengosongkan pesan");
    const catatan = [...s.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 3 && catatan.every(tanpaAngka), "lab B: Coba ini dapat dieja");
    cek(s.includes("aria-label={`${l.awalan} ${ejaK6B1(v)}`}"), "lab B: label pilihan dieja");
    for (const awalan of ["Pilih soal potong ", "Pilih soal silang ", "Pilih soal muat "]) cek(s.includes(`label={\`${awalan}`), `lab B: pilihan soal berlabel ${awalan.trim()}`);
    for (const aksi of ['t: "DATA", alat: "potong"', 't: "DATA", alat: "silang"', 't: "DATA", alat: "muat"', 't: "JAWAB", alat, langkah: aktif.nama, o', 't: "RESET"']) cek(s.includes(aksi), `lab B: aksi ${aksi} terhubung`);
    cek(/jawab\("potong"\)/.test(s) && /jawab\("silang"\)/.test(s) && /jawab\("muat"\)/.test(s), "lab B: tiga tampilan memakai pilihan langkah aktif");
    cek(/aktif \? <PilihTiga/.test(s) && /langkahAktifBagi\(x, lihat\)/.test(s), "lab B: hanya langkah aktif yang ditanyakan");
    cek(/sd\("silang", "balik"\) \? \(/.test(s) && /sd\("potong", "peny"\)/.test(s) && /sd\("muat", "hasil"\)/.test(s), "lab B: hasil tampil bertahap sesuai langkah yang ditempuh");
    cek(/role="img"/.test(s), "lab B: persamaan berlabel bacaan");
    const m = baca("model-bagi-k6b1", "tsx");
    cek(/role="img"/.test(m) && /aria-label=\{`Batang /.test(m) && /gridTemplateColumns: `repeat\(\$\{perBaris\}, minmax\(0, 1fr\)\)`/.test(m), "model B: batang berlabel dan tidak meluap");
  }
  const pembungkus = baca("SimulasiK6Bab1", "tsx");
  const cobaB = [...pembungkus.matchAll(/"([^"]*\?)"/g)].map((m) => m[1]);
  cek(cobaB.length >= 6 && cobaB.every(tanpaAngka), "Coba ini mesin A dan B dapat dieja");
  cek(/SimulasiLabBagiK6B1/.test(pembungkus) && /MESIN_BAGI/.test(pembungkus) && /SKENARIO_K6B1B/.test(pembungkus) && /huruf === "B"/.test(pembungkus), "pembungkus: lab, mesin, dan skenario B terhubung");
  const ucapanB = [];
  for (let i = 0; i < 6; i += 1) ucapanB.push(BG.ucapPotongK6B1B(LB(y0, { t: "DATA", alat: "potong", i })), BG.ucapSilangK6B1B(LB(y0, { t: "DATA", alat: "silang", i })), BG.ucapMuatK6B1B(LB(y0, { t: "DATA", alat: "muat", i })));
  cek(ucapanB.length === 18 && ucapanB.every(tanpaAngka), "semua 18 ucapan lab B dieja menjadi kata");

  // Data ringkas B.
  cek(ringkas.chapter_id === "mtk-6-bab1", "ringkas B: id bab");
  const B0 = ringkas.subBab.B;
  const [p1, p2, p3] = B0.infografis.panel;
  cek(B0.infografis.panel.length === 3 && p1.butir.length >= 2 && p2.sisi.length >= 2 && p3.butir.length >= 2, "ringkas B: tiga panel dengan isi");
  sama(B0.peta.cabang.map((c) => c.id), ["potong", "balik", "silang", "muat"], "ringkas B: empat cabang");
  cek(B0.peta.kartu.length === 8 && B0.peta.kartu.every((k) => B0.peta.cabang.some((c) => c.id === k.cabang)), "ringkas B: delapan kartu, tiap kartu menunjuk cabang yang ada");
  cek(B0.peta.cabang.every((c) => B0.peta.kartu.filter((k) => k.cabang === c.id).length >= 2), "ringkas B: tiap cabang punya dua kartu atau lebih");
  cek([p1.ide, p2.ide, p3.ide].every((t) => t.split(/\s+/).length <= 8), "ringkas B: ide paling banyak delapan kata");
  const isi = (panel, id) => (panel.butir ?? panel.sisi).find((b) => b.id === id).visual.isi;
  sama(isi(p1, "potong"), `1/2 : 3 = ${teksMandiri(1, 2 * 3)}`, "ringkas B: potong dihitung mandiri");
  sama(isi(p1, "kecil"), `2 × 3 = ${2 * 3}`, "ringkas B: penyebut dikali");
  sama(isi(p2, "potong"), teksMandiri(1, 6), "ringkas B: potong 1/6");
  sama(isi(p2, "silang"), `1/2 × 1/3 = ${teksMandiri(1 * 1, 2 * 3)}`, "ringkas B: silang dihitung mandiri");
  sama(isi(p3, "balik"), `3 × 4/1 = ${teksMandiri(3 * 4, 1)}`, "ringkas B: tiga dibagi seperempat dihitung mandiri");
  sama(isi(p3, "besar"), "12 × 1/4 = 3", "ringkas B: cek perkalian");
  cek(12 * 1 * 1 === 3 * 4 * 1, "ringkas B: 12 × 1/4 = 3 benar (perkalian silang)");
  cek(!/[<>]/.test(JSON.stringify(B0)), "ringkas B: tanpa tanda banding");
  cek(Object.keys(ringkas.subBab).join() === "A,B", "ringkas: Sub-Bab A dan B (C menyusul)");
}

/* ------------------------------ Konsep tidak bocor ke Sub-Bab A ------------------------------ */
{
  const baca = (nama, ekstensi) => readFileSync(new URL(`../src/components/modul/${nama}.${ekstensi}`, import.meta.url), "utf8");
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas6-bab1-ringkas.json", import.meta.url), "utf8"));
  const tanpaKomentar = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  const teksDari = (o) => {
    const hasil = [];
    JSON.stringify(o, (k, v) => {
      if (typeof v === "string" && k !== "tipe" && k !== "jenis") hasil.push(v);
      return v;
    });
    return hasil.join(" | ");
  };
  // Sub-Bab A hanya membahas perkalian pecahan. Pembagian, kebalikan, dan desimal milik Sub-Bab B dan C.
  const BOCOR_A = /(\bbagi\b|\bdibagi|\bmembagi|pembagi|pembagian|\bbagian\b|kebalikan|menyilang|\bsilang|desimal|\bkoma\b|persepuluh|perseratus|÷|reciprocal|invert|partition|measurement|cross-arrow|divide|\bcross\b|tenths|hundredths|\d\s:\s\d|\d,\d)/i;
  const catat = (teks, apa) => {
    const m = BOCOR_A.exec(teks);
    cek(!m, `A: ${apa} bebas konsep pembagian, kebalikan, dan desimal (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
  };
  for (const t of [TK.MISI_K6B1.A, TK.NAMA_SIM_K6B1.A, ...K1.MISI_A.map((m) => m.teks)]) catat(t, "teks misi");
  for (const [nama, o] of [["mesin", MS.MESIN_KALI], ["skenario", SK.SKENARIO_K6B1A], ["peta dan infografis ringkas", ringkas.subBab.A]]) catat(teksDari(o), nama);
  for (const [f, e] of [["SimulasiLabKaliK6B1", "tsx"], ["model-kali-k6b1", "tsx"], ["lab-kali-k6b1a", "ts"]]) catat(tanpaKomentar(baca(f, e)).replace(/ ([-=+] |=> )/g, " "), `${f} (tanpa komentar)`);
  for (const p of globalThis.__pesanA) catat(p, "pesan lab dari fuzz");
  for (const u of [A.ucapLuasK6B1A(x0), A.ucapPanahK6B1A(x0), A.ucapTukarK6B1A(x0)]) catat(u, "ucapan lab");

  // Kunci tidak bocor ke klien, tanpa jaringan.
  for (const f of ["SimulasiLabKaliK6B1", "SimulasiK6Bab1", "model-kali-k6b1"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s), `${f}: tidak memuat correct_index atau explanation`);
    cek(!/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa jaringan atau model bahasa`);
  }
  for (const f of ["lab-kali-k6b1a", "mesin-kali-k6b1", "skenario-k6b1", "misi-k6bab1", "misi-teks-k6b1", "eja-k6b1"]) {
    const s = baca(f, "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: murni`);
    const impor = s.match(/^import .+$/gm) ?? [];
    cek(impor.every((l) => l.startsWith("import type")), `${f}: hanya mengimpor tipe`);
  }
  cek((baca("lab-kali-k6b1a", "ts").match(/^import /gm) ?? []).length === 0 && (baca("eja-k6b1", "ts").match(/^import /gm) ?? []).length === 0, "lab dan pengeja tanpa impor sama sekali");
  // Logika hanya bilangan bulat: tanpa pecahan desimal JavaScript (angka berkoma, Math.round, toFixed, pembagian bukan bilangan bulat).
  {
    const s = tanpaKomentar(baca("lab-kali-k6b1a", "ts"));
    cek(!/\.toFixed|parseFloat|Math\.(round|floor|ceil|random)|\d\.\d/.test(s), "logika lab: hanya bilangan bulat");
  }
  {
    const s = baca("SimulasiLabKaliK6B1", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s), "lab: lapor keadaan lewat useEffect");
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), "lab: ganti tampilan mengosongkan pesan");
    const catatan = [...s.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 3 && catatan.every(tanpaAngka), "lab: Coba ini dapat dieja");
    cek(s.includes('aria-label="Tambah satu ember"'), "lab: tombol berlabel Tambah satu ember");
    for (const awalan of ["Jumlah kotak", "Penyebut", "Tulisan", "Atas", "Bawah", "Bentuk sederhana", "Hasil utuh", "Hasil kali atas", "Cek"]) cek(s.includes(`awalan="${awalan}"`), `lab: pilihan berlabel ${awalan}`);
    cek(s.includes("aria-label={`${awalan} ${ejaK6B1(String(v))}`}"), "lab: label pilihan dieja");
    for (const awalan of ["Pilih soal luas ", "Pilih soal panah ", "Pilih soal tukar "]) cek(s.includes(`label={\`${awalan}`), `lab: pilihan soal berlabel ${awalan.trim()}`);
    cek(/x\.luas\.ember >= lu\.k && !x\.luas\.pemb/.test(s) && /x\.luas\.pemb && !x\.luas\.selesai/.test(s), "lab Luas: penyebut hanya tampil setelah pembilang");
    for (const t of [0, 1, 2, 3]) cek(new RegExp(`x\\.panah\\.tahap === ${t} \\?`).test(s), `lab Panah: pertanyaan tahap ${t}`);
    for (const t of [0, 1, 2]) cek(new RegExp(`x\\.tukar\\.tahap === ${t} \\?`).test(s), `lab Tukar: pertanyaan tahap ${t}`);
    for (const aksi of ["L_DATA", "L_TAMBAH", "L_PEMB", "L_PENY", "P_DATA", "P_ASLI", "P_ATAS", "P_BAWAH", "P_RAPI", "T_DATA", "T_KALI", "T_RAPI", "T_CEK", "RESET"]) cek(s.includes(`t: "${aksi}"`), `lab: aksi ${aksi} terhubung ke tombol`);
    cek(/role="img"/.test(s) && /aria-label=\{`\$\{lu\.k\} kali /.test(s), "lab: persamaan berlabel bacaan");
    const m = baca("model-kali-k6b1", "tsx");
    cek(/role="img"/.test(m) && /aria-label=\{`Petak berisi /.test(m), "model: gambar petak berlabel");
    cek(/gridTemplateColumns: `repeat\(\$\{n\}, minmax\(0, 1fr\)\)`/.test(m), "model: petak memuat n kotak tanpa meluap");
  }
  const pembungkus = baca("SimulasiK6Bab1", "tsx");
  cek(/eja=\{ejaK6B1\}/.test(pembungkus), "pembungkus: mesin dieja ejaK6B1");
  const coba = [...pembungkus.matchAll(/"([^"]*\?)"/g)].map((m) => m[1]);
  cek(coba.length >= 3 && coba.every(tanpaAngka), "Coba ini mesin dapat dieja");
  const ucapan = [];
  for (let i = 0; i < 6; i += 1) {
    ucapan.push(A.ucapLuasK6B1A(L(x0, { t: "L_DATA", i })), A.ucapPanahK6B1A(L(x0, { t: "P_DATA", i })), A.ucapTukarK6B1A(L(x0, { t: "T_DATA", i })));
  }
  cek(ucapan.length === 18 && ucapan.every(tanpaAngka), `semua ${ucapan.length} ucapan lab dieja menjadi kata`);
  cek(ucapan.every((u) => !/\d/.test(EJ.ejaK6B1(u)) && /per|setengah|seperempat|perempat/.test(EJ.ejaK6B1(u)) ), "ucapan lab memuat bacaan pecahan");
}

/* ------------------------------ Emoji paling tinggi Emoji 12 ------------------------------ */
{
  const berkas = ["SimulasiLabKaliK6B1.tsx", "SimulasiK6Bab1.tsx", "model-kali-k6b1.tsx", "lab-kali-k6b1a.ts", "mesin-kali-k6b1.ts", "skenario-k6b1.ts", "misi-k6bab1.ts", "misi-teks-k6b1.ts", "eja-k6b1.ts", "SimulasiLabBagiK6B1.tsx", "model-bagi-k6b1.tsx", "lab-bagi-k6b1b.ts", "mesin-bagi-k6b1.ts"];
  let ok = true;
  for (const f of berkas) {
    const s = readFileSync(new URL(`../src/components/modul/${f}`, import.meta.url), "utf8");
    cek(s.charCodeAt(0) !== 0xfeff && !s.includes("\r"), `${f}: UTF-8 tanpa BOM dan akhir baris LF`);
    for (const c of s) if (c.codePointAt(0) > 0x1fa95) ok = false;
  }
  const r = readFileSync(new URL("../src/data/kelas6-bab1-ringkas.json", import.meta.url), "utf8");
  for (const c of r) if (c.codePointAt(0) > 0x1fa95) ok = false;
  cek(ok && r.charCodeAt(0) !== 0xfeff && !r.includes("\r"), "emoji paling tinggi Emoji 12 dan data ringkas UTF-8 tanpa BOM");
}

/* ------------------------------ Data ringkas ------------------------------ */
{
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas6-bab1-ringkas.json", import.meta.url), "utf8"));
  cek(ringkas.chapter_id === "mtk-6-bab1" && ringkas.phase_code === "FASE_C" && ringkas.grade === 6, "ringkas: id bab, fase, kelas");
  const A0 = ringkas.subBab.A;
  const [p1, p2, p3] = A0.infografis.panel;
  cek(A0.infografis.panel.length === 3 && p1.butir.length >= 2 && p2.sisi.length >= 2 && p3.butir.length >= 2, "ringkas A: tiga panel dengan isi");
  sama(A0.peta.cabang.map((c) => c.id), ["luas", "tulis", "panah", "tukar"], "ringkas A: empat cabang");
  cek(A0.peta.kartu.length === 8 && A0.peta.kartu.every((k) => A0.peta.cabang.some((c) => c.id === k.cabang)), "ringkas A: delapan kartu, tiap kartu menunjuk cabang yang ada");
  cek(A0.peta.cabang.every((c) => A0.peta.kartu.filter((k) => k.cabang === c.id).length >= 2), "ringkas A: tiap cabang punya dua kartu atau lebih");
  cek([p1.ide, p2.ide, p3.ide].every((t) => t.split(/\s+/).length <= 8), "ringkas A: ide paling banyak delapan kata");
  const teks = JSON.stringify(A0);
  const isi = (panel, id) => (panel.butir ?? panel.sisi).find((b) => b.id === id).visual.isi;
  sama(isi(p1, "ember"), `2 × 3/5 = ${2 * 3}/5`, "ringkas A: dua ember dihitung mandiri");
  sama(isi(p2, "panah"), `2/1 × 3/5 = ${teksMandiri(2 * 3, 1 * 5)}`, "ringkas A: panah lurus dihitung mandiri");
  sama(isi(p2, "luas"), teksMandiri(2 * 3, 5), "ringkas A: luas dihitung mandiri");
  sama(isi(p3, "lurus"), `(2×3)/(1×5) = ${teksMandiri(6, 5)}`, "ringkas A: panah lurus butir dihitung mandiri");
  sama(isi(p3, "tukar"), `2/3 × 15 = 15 × 2/3 = ${(2 * 15) / 3}`, "ringkas A: tukar urutan dihitung mandiri");
  sama(isi(p3, "asli"), "2 = 2/1", "ringkas A: asli ditulis a per satu");
  cek(teks.includes("Whole") === false && !/[<>]/.test(teks), "ringkas A: tanpa istilah asing dan tanpa tanda banding");
  }

console.log(`\nLulus: ${lulus}, Gagal: ${gagal}`);
if (gagal > 0) process.exit(1);
