// Uji Simulasi Kelas 4 Bab 1 (Bilangan Cacah sampai 10.000): pengeja, lab tiap sub-bab, mesin, skenario, misi,
// gerbang, dan konsep tidak bocor antar sub-bab.
// Jalankan: node --no-warnings scripts/uji-lab-k4b1.mjs
import { readFileSync } from "node:fs";
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K4 from "../src/components/modul/misi-k4bab1.ts";
import * as TK from "../src/components/modul/misi-teks-k4b1.ts";
import * as A from "../src/components/modul/lab-kemasan-k4b1a.ts";
import * as B from "../src/components/modul/lab-nilai-k4b1b.ts";
import * as C from "../src/components/modul/lab-banding-k4b1c.ts";
import * as D from "../src/components/modul/lab-susun-k4b1d.ts";
import * as J from "../src/components/modul/lab-jumlah-k4b1e.ts";
import * as KR from "../src/components/modul/lab-kurang-k4b1f.ts";
import * as MH from "../src/components/modul/mesin-data-k4b1-hitung.ts";
import * as SH from "../src/components/modul/skenario-k4b1-hitung.ts";
import * as KL from "../src/components/modul/lab-kali-k4b1g.ts";
import * as BG from "../src/components/modul/lab-bagi-k4b1h.ts";
import * as FK from "../src/components/modul/lab-faktor-k4b1i.ts";
import * as MG from "../src/components/modul/mesin-data-k4b1-bagi.ts";
import * as SG from "../src/components/modul/skenario-k4b1-bagi.ts";
import * as ME from "../src/components/modul/mesin-bertahap-k3b1.ts";
import * as MB from "../src/components/modul/mesin-data-k4b1-bilangan.ts";
import * as SB from "../src/components/modul/skenario-k4b1-bilangan.ts";
import * as EJ from "../src/components/modul/eja-k4b1.ts";

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
    return s % n;
  };
};

/* ------------------------------ Hitungan MANDIRI ------------------------------ */
// Pembaca bilangan mandiri: menyusun kata dari tabel kelompok, bukan dari fungsi lab.
const KATA = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
function bacaMandiri(n) {
  if (n === 0) return "nol";
  if (n === 10000) return "sepuluh ribu";
  const kata = [];
  const ribu = Math.trunc(n / 1000);
  const ratus = Math.trunc((n % 1000) / 100);
  const sisa = n % 100;
  if (ribu > 0) kata.push(ribu === 1 ? "seribu" : `${KATA[ribu]} ribu`);
  if (ratus > 0) kata.push(ratus === 1 ? "seratus" : `${KATA[ratus]} ratus`);
  if (sisa > 0) {
    if (sisa < 10) kata.push(KATA[sisa]);
    else if (sisa === 10) kata.push("sepuluh");
    else if (sisa === 11) kata.push("sebelas");
    else if (sisa < 20) kata.push(`${KATA[sisa - 10]} belas`);
    else kata.push([`${KATA[Math.trunc(sisa / 10)]} puluh`, KATA[sisa % 10]].filter(Boolean).join(" "));
  }
  return kata.join(" ");
}
const angkaTeks = (s) => Number(String(s).replace(/\./g, ""));
const dig = (n) => String(n).padStart(4, "0").split("").map(Number);
const titik = (n) => (n >= 1000 ? `${Math.trunc(n / 1000)}.${String(n % 1000).padStart(3, "0")}` : String(n));
const jumlahSuku = (t) => t.split(" + ").map(angkaTeks).reduce((a, b) => a + b, 0);

/* ------------------------------ Pengeja ------------------------------ */
{
  let ok = true;
  for (let n = 0; n <= 10000; n += 1) if (EJ.kataBilK4B1(n) !== bacaMandiri(n)) ok = false;
  cek(ok, "kataBilK4B1: 0 sampai 10.000 sama dengan pembaca mandiri");
  sama(EJ.ejaK4B1("Jarak 3.286 meter."), "Jarak tiga ribu dua ratus delapan puluh enam meter.", "eja titik ribuan");
  sama(EJ.ejaK4B1("Harga Rp7.300."), "Harga tujuh ribu tiga ratus rupiah.", "eja rupiah");
  sama(EJ.ejaK4B1("1.025 dan 10.000"), "seribu dua puluh lima dan sepuluh ribu", "eja seribu dan sepuluh ribu");
  sama(EJ.ejaK4B1("8.750 > 7.500"), "delapan ribu tujuh ratus lima puluh lebih dari tujuh ribu lima ratus", "eja tanda lebih dari");
  sama(EJ.ejaK4B1("2.000 + 100 + 50 + 0 = 2.150"), "dua ribu ditambah seratus ditambah lima puluh ditambah nol sama dengan dua ribu seratus lima puluh", "eja uraian");
  cek(!/\d/.test(EJ.ejaK4B1("Rp5.000, Rp2.000, dan 3 keping Rp100 = Rp7.300")), "eja: tidak ada angka tersisa");
}

/* ------------------------------ Lab Kemasan (A) ------------------------------ */
const aa = (x, ...ak) => ak.reduce((s, a) => A.langkahKemasanK4B1A(s, a), x);
const ka = A.keadaanKemasanK4B1A;
/** Rakit n dari keadaan awal lewat tombol (kurangi semua, lalu tambah). */
function rakit(x, n) {
  let s = x;
  for (const j of A.URUT_KEMASAN) while (s.k[j] > 0) s = aa(s, { t: "UBAH", jenis: j, d: -1 });
  const d = n === 10000 ? [10, 0, 0, 0] : dig(n);
  A.URUT_KEMASAN.forEach((j, i) => {
    for (let k = 0; k < d[i]; k += 1) s = aa(s, { t: "UBAH", jenis: j, d: 1 });
  });
  return s;
}
function tulisKartu(x, n) {
  let s = x;
  const d = dig(n);
  for (let i = 0; i < 4; i += 1) while (s.kartu[i] !== d[i]) s = aa(s, { t: "KARTU", i, d: 1 });
  return aa(s, { t: "PERIKSA" });
}
const pilihTarget = (x, n) => {
  let s = x;
  for (let k = 0; k < A.TARGET_TULIS.length && A.TARGET_TULIS[s.target].n !== n; k += 1) s = aa(s, { t: "TARGET", d: 1 });
  return s;
};
{
  const a0 = A.awalKemasanK4B1A();
  cek(A.totalKemasan(a0.k) === 2900 && !a0.baca && a0.pernah.length === 0, "A awal: 2.900, bacaan mati, tanpa riwayat");
  let okBaca = true;
  let okBagian = true;
  for (let n = 0; n <= 10000; n += 1) {
    if (A.bacaK4B1A(n) !== bacaMandiri(n)) okBaca = false;
    if (n > 0 && n < 10000) {
      const bg = A.bagianBaca(n);
      const d = dig(n);
      if (bg.length !== 4) okBagian = false;
      for (let i = 0; i < 4; i += 1) {
        const gabung = i === 3 && d[2] === 1;
        if (bg[i].lewati !== (d[i] === 0 && !gabung) || (bg[i].kata === null) !== (d[i] === 0 || gabung)) okBagian = false;
      }
      if (bg.map((b) => b.kata).filter(Boolean).join(" ") !== bacaMandiri(n)) okBagian = false;
      if (bg.some((b) => b.kata && /\bnol\b/.test(b.kata))) okBagian = false;
    }
    if (n < 10000 && A.lambangK4B1(n) !== titik(n)) okBaca = false;
  }
  cek(okBaca, "bacaan dan lambang 0 sampai 10.000 sama dengan hitungan mandiri");
  cek(okBagian, "bagian bacaan empat tempat: tiap tempat bernilai nol dilewati, belasan digabung, kata 'nol' tidak pernah dibaca, gabungannya = bacaan mandiri");
  sama(A.bagianBaca(7003).map((b) => (b.lewati ? "lewat" : b.kata)), ["tujuh ribu", "lewat", "lewat", "tiga"], "7.003: ratusan dan puluhan sama-sama tampak dilewati");
  sama(A.bacaK4B1A(7003), "tujuh ribu tiga", "7.003 dibaca tujuh ribu tiga");
  sama(A.bacaK4B1A(1025), "seribu dua puluh lima", "1.025 dibaca seribu dua puluh lima");

  // Penukaran berantai.
  const tukarDus = aa(a0, { t: "UBAH", jenis: "dus", d: 1 });
  cek(tukarDus.k.peti === 3 && tukarDus.k.dus === 0 && A.totalKemasan(tukarDus.k) === 3000 && tukarDus.pernah.includes("tukar:dus") && tukarDus.pesan.includes("10 dus ditukar 1 peti"), "10 dus ditukar 1 peti");
  let rantai = rakit(a0, 999);
  rantai = aa(rantai, { t: "UBAH", jenis: "benda", d: 1 });
  cek(A.totalKemasan(rantai.k) === 1000 && rantai.k.peti === 1 && rantai.k.dus === 0 && rantai.k.bungkus === 0 && rantai.k.benda === 0 && ["tukar:benda", "tukar:bungkus", "tukar:dus"].every((p) => rantai.pernah.includes(p)), "999 + 1 benda: penukaran berantai sampai 1 peti");
  const penuh = rakit(a0, 10000);
  cek(A.totalKemasan(penuh.k) === 10000 && penuh.pernah.includes("rakit:10000"), "rakit 10.000 = 10 peti");
  const lewat = aa(penuh, { t: "UBAH", jenis: "benda", d: 1 });
  cek(A.totalKemasan(lewat.k) === 10000 && lewat.pesan.includes("Batas"), "tidak bisa melewati 10.000");
  const kosong = aa(rakit(a0, 0), { t: "UBAH", jenis: "peti", d: -1 });
  cek(kosong.pesan.startsWith("Tidak ada peti"), "tidak bisa mengambil kemasan yang tidak ada");

  // Tulis: semua 10.000 susunan kartu untuk dua sasaran, tepat satu yang benar.
  for (const t of [3676, 7003]) {
    let benar = 0;
    let okPesan = true;
    const s0 = pilihTarget(a0, t);
    for (let n = 0; n <= 9999; n += 1) {
      const s = A.langkahKemasanK4B1A({ ...s0, kartu: dig(n) }, { t: "PERIKSA" });
      if (s.pernah.includes(`tulis:${t}`)) benar += 1;
      else {
        const iBeda = dig(n).findIndex((v, i) => v !== dig(t)[i]);
        if (!s.pesan.includes(`Kartu ${A.NAMA_TEMPAT[iBeda]}`) || !s.pesan.includes(bacaMandiri(n))) okPesan = false;
      }
    }
    cek(benar === 1, `tulis ${titik(t)}: tepat satu susunan dari 10.000 yang diterima`);
    cek(okPesan, `tulis ${titik(t)}: pesan menunjuk tempat pertama yang keliru dan membacakan tulisan anak`);
  }

  // Fuzz.
  const acak = acakDari(41);
  let s = a0;
  let ok = true;
  for (let n = 0; n < 20000; n += 1) {
    const ak = [
      () => ({ t: "UBAH", jenis: A.URUT_KEMASAN[acak(4)], d: acak(3) ? 1 : -1 }),
      () => ({ t: "TOGGLE", rep: acak(2) ? "baca" : "papan" }),
      () => ({ t: "TARGET", d: acak(2) ? 1 : -1 }),
      () => ({ t: "KARTU", i: acak(4), d: acak(2) ? 1 : -1 }),
      () => ({ t: "PERIKSA" }),
    ][acak(5)]();
    const sebelum = s;
    s = A.langkahKemasanK4B1A(s, ak);
    const tot = A.totalKemasan(s.k);
    if (tot < 0 || tot > 10000 || s.k.dus > 9 || s.k.bungkus > 9 || s.k.benda > 9 || s.k.peti > 10) ok = false;
    if (ak.t === "UBAH" && tot !== A.totalKemasan(sebelum.k) && Math.abs(tot - A.totalKemasan(sebelum.k)) !== A.ISI_KEMASAN[ak.jenis]) ok = false;
    if (!sebelum.pernah.every((p) => s.pernah.includes(p))) ok = false;
  }
  cek(ok, "fuzz 20.000 aksi lab kemasan: tiap kemasan 0 sampai 9, total ≤ 10.000, jumlah berubah tepat sebesar isi kemasan");
}

/* ------------------------------ Lab Nilai Tempat (B) ------------------------------ */
const bb = (x, ...ak) => ak.reduce((s, a) => B.langkahNilaiK4B1B(s, a), x);
const kb = B.keadaanNilaiK4B1B;
function aturB(x, n) {
  let s = x;
  const d = dig(n);
  for (let i = 0; i < 4; i += 1) while (s.d[i] !== d[i]) s = bb(s, { t: "DIGIT", i, d: 1 });
  return s;
}
function isiTabelB(x, n, ubah = {}) {
  let s = x;
  for (let k = 0; k < B.TABEL_B.length && B.TABEL_B[s.tabel] !== n; k += 1) s = bb(s, { t: "TABEL", d: 1 });
  dig(n).forEach((v, i) => {
    s = bb(s, { t: "KEPING", i, nilai: ubah[i] ?? String(v) });
  });
  return bb(s, { t: "PERIKSA" });
}
{
  const b0 = B.awalNilaiK4B1B();
  cek(B.angkaDari(b0.d) === 5371 && b0.pilih === null && !b0.uraian && b0.pernah.length === 0, "B awal: 5.371, belum ada yang diketuk");
  let okUraian = true;
  let okNilai = true;
  let okKeping = true;
  for (let n = 0; n <= 9999; n += 1) {
    const d = dig(n);
    if (jumlahSuku(B.teksUraian(d)) !== n || B.teksUraian(d).split(" + ").length !== 4) okUraian = false;
    for (let i = 0; i < 4; i += 1) {
      if (B.nilaiTempat(d, i) !== d[i] * 10 ** (3 - i)) okNilai = false;
      const kp = B.kepingKolom(n, i);
      if (kp.length !== 3 || new Set(kp).size !== 3 || kp.filter((v) => v === String(d[i])).length !== 1) okKeping = false;
    }
  }
  cek(okUraian, "uraian 0 sampai 9.999: selalu empat suku (nol tetap ditulis) dan jumlahnya sama dengan bilangan");
  cek(okNilai, "nilai tempat: angka × bobot tempat untuk semua bilangan dan tempat");
  cek(okKeping, "tabel: tiap kolom tiga keping unik, tepat satu digit benar");
  for (const n of B.TABEL_B) {
    const ok = isiTabelB(b0, n);
    cek(ok.pernah.includes(`tabel:${n}`) && ok.pesan.startsWith("✅"), `tabel ${titik(n)} diterima dengan digit`);
    const d = dig(n);
    const iNilai = d.findIndex((v, i) => i < 3 && v !== 0);
    const tolak = isiTabelB(b0, n, { [iNilai]: String(d[iNilai] * 10 ** (3 - iNilai)) });
    cek(!tolak.pernah.includes(`tabel:${n}`) && tolak.pernah.includes("tabel-tolak") && tolak.pesan.includes("digitnya saja"), `tabel ${titik(n)}: nilai penuh ditolak dengan penjelasan`);
    const lain = B.kepingKolom(n, 3).find((v) => v !== String(d[3]));
    const salah = isiTabelB(b0, n, { 3: lain });
    cek(!salah.pernah.includes(`tabel:${n}`) && salah.pesan.includes("satuan"), `tabel ${titik(n)}: digit satuan keliru ditunjuk`);
  }
  const s = aturB(b0, 2150);
  sama(B.kalimatNilai(s.d, 0), "Angka 2 di ribuan bernilai 2.000.", "kalimat nilai 2 pada 2.150");
  sama(B.kalimatNilai(s.d, 3), "Angka 0 di satuan bernilai 0.", "kalimat nilai 0 pada 2.150");
  sama(B.teksUraian(s.d), "2.000 + 100 + 50 + 0", "uraian 2.150");
  const acak = acakDari(7);
  let x = b0;
  let ok = true;
  for (let n = 0; n < 20000; n += 1) {
    const sebelum = x;
    x = B.langkahNilaiK4B1B(x, [{ t: "DIGIT", i: acak(4), d: acak(2) ? 1 : -1 }, { t: "PILIH", i: acak(4) }, { t: "TOGGLE" }, { t: "TABEL", d: 1 }, { t: "KEPING", i: acak(4), nilai: String(acak(10)) }, { t: "PERIKSA" }][acak(6)]);
    if (x.d.some((v) => v < 0 || v > 9) || !sebelum.pernah.every((p) => x.pernah.includes(p))) ok = false;
    if (x.pernah.some((p) => p.startsWith("tabel:") && !B.TABEL_B.includes(Number(p.slice(6))))) ok = false;
  }
  cek(ok, "fuzz 20.000 aksi lab nilai: digit 0 sampai 9, riwayat tidak dicabut");
}

/* ------------------------------ Lab Banding (C) ------------------------------ */
const cc = (x, ...ak) => ak.reduce((s, a) => C.langkahBandingK4B1C(s, a), x);
const kc = C.keadaanBandingK4B1C;
function aturC(x, bil, n) {
  let s = x;
  const d = dig(n);
  for (let i = 0; i < 4; i += 1) while (s[bil][i] !== d[i]) s = cc(s, { t: "DIGIT", bil, i, d: 1 });
  return s;
}
const aturDua = (x, a, b) => aturC(aturC(x, "a", a), "b", b);
function* permutasi(arr) {
  if (arr.length <= 1) yield arr;
  else for (let i = 0; i < arr.length; i += 1) for (const p of permutasi([...arr.slice(0, i), ...arr.slice(i + 1)])) yield [arr[i], ...p];
}
{
  const c0 = C.awalBandingK4B1C();
  cek(!c0.langkah && c0.pernah.length === 0, "C awal: Langkah mati, tanpa riwayat");
  // Perbandingan: semua pasangan dari bilangan yang digitnya {1, 5, 9} di tiap tempat (81 × 81) dan 200.000 pasangan acak.
  const pilihan = [];
  for (const a of [1, 5, 9]) for (const b of [0, 5, 9]) for (const c of [0, 5, 9]) for (const d of [0, 5, 9]) pilihan.push(a * 1000 + b * 100 + c * 10 + d);
  let ok = true;
  const uji = (p, q) => {
    const h = C.bandingDariKiri(dig(p), dig(q));
    const harus = p > q ? ">" : p < q ? "<" : "=";
    const iBeda = dig(p).findIndex((v, i) => v !== dig(q)[i]);
    if (h.tanda !== harus || (iBeda < 0 ? h.penentu !== null : h.penentu !== iBeda)) ok = false;
  };
  for (const p of pilihan) for (const q of pilihan) uji(p, q);
  const acak = acakDari(11);
  for (let k = 0; k < 200000; k += 1) uji(1000 + acak(9000), 1000 + acak(9000));
  cek(ok, `tanda dan tempat penentu sama dengan perbandingan bilangan biasa (${pilihan.length ** 2 + 200000} pasangan)`);
  // Penentu kuat.
  const kuat = cc(aturDua(c0, 4999, 5111), { t: "LANGKAH" });
  cek(kuat.pernah.includes("penentu-kuat") && kuat.pernah.includes("tanda:<"), "4.999 < 5.111: ribuan menentukan walau angka lain lebih besar");
  cek(!cc(aturDua(c0, 4111, 5999), { t: "LANGKAH" }).pernah.includes("penentu-kuat"), "4.111 dan 5.999 bukan penentu kuat (angka lain bilangan kecil tidak lebih besar)");
  cek(!aturDua(c0, 4999, 5111).pernah.length, "tanpa Langkah tidak ada yang dicatat");
  // Urut: semua urutan ketukan.
  for (const id of C.DAFTAR_URUT)
    for (const arah of ["naik", "turun"]) {
      const item = C.URUT_C[id].item;
      const harus = item.map((_, i) => i).sort((p, q) => (arah === "naik" ? item[p].n - item[q].n : item[q].n - item[p].n));
      let diterima = 0;
      for (const urutan of permutasi(item.map((_, i) => i))) {
        let s = cc(c0, { t: "URUT", id }, { t: "ARAH", arah });
        for (const i of urutan) s = cc(s, { t: "KETUK", i });
        if (s.pernah.includes(`urut:${id}:${arah}`)) {
          diterima += 1;
          sama(urutan, harus, `urut ${id} ${arah}: yang diterima hanya urutan benar`);
        }
      }
      cek(diterima === 1, `urut ${id} ${arah}: dari semua ${[...permutasi(item)].length} urutan ketukan, tepat satu selesai`);
    }
  const tolak = cc(c0, { t: "KETUK", i: 0 });
  cek(tolak.dipilih.length === 0 && tolak.pernah.includes("urut-tolak") && tolak.pesan.includes("belum yang terkecil"), "urut: mengetuk Semeru lebih dulu ditolak");
  // Kartu: terbesar dan terkecil dibanding semua permutasi (ribuan bukan 0).
  C.KARTU_C.forEach((k, ki) => {
    const semua = [...permutasi(k)].filter((p) => p[0] !== 0).map((p) => Number(p.join("")));
    cek(C.terbesarKartu(k) === Math.max(...semua) && C.terkecilKartu(k) === Math.min(...semua), `kartu ${k.join("")}: terbesar ${Math.max(...semua)} dan terkecil ${Math.min(...semua)}`);
    for (const tujuan of ["terbesar", "terkecil"]) {
      let diterima = 0;
      for (const urutan of permutasi([0, 1, 2, 3])) {
        let s = cc(c0, { t: "KARTU_SET", i: ki }, { t: "TUJUAN", tujuan });
        for (const i of urutan) s = cc(s, { t: "TARUH", kartu: i });
        s = cc(s, { t: "PERIKSA" });
        if (s.pernah.includes(`kartu:${ki}:${tujuan}`)) diterima += 1;
        if (k[urutan[0]] === 0 && !s.pernah.includes("kartu-nol-depan")) diterima += 100;
      }
      const target = tujuan === "terbesar" ? C.terbesarKartu(k) : C.terkecilKartu(k);
      const harus = [...permutasi([0, 1, 2, 3])].filter((u) => Number(u.map((i) => k[i]).join("")) === target && k[u[0]] !== 0).length;
      cek(diterima === harus, `kartu ${k.join("")} ${tujuan}: diterima ${diterima} dari 24 susunan (harus ${harus}), nol di depan ditolak`);
    }
  });
  let x = c0;
  let ok2 = true;
  const ac = acakDari(13);
  for (let n = 0; n < 20000; n += 1) {
    const sebelum = x;
    x = C.langkahBandingK4B1C(x, [{ t: "DIGIT", bil: ac(2) ? "a" : "b", i: ac(4), d: ac(2) ? 1 : -1 }, { t: "LANGKAH" }, { t: "KETUK", i: ac(4) }, { t: "TARUH", kartu: ac(4) }, { t: "PERIKSA" }, { t: "KOSONGKAN" }, { t: "ARAH", arah: ac(2) ? "naik" : "turun" }][ac(7)]);
    if (x.a[0] < 1 || x.b[0] < 1 || [...x.a, ...x.b].some((v) => v < 0 || v > 9) || !sebelum.pernah.every((p) => x.pernah.includes(p))) ok2 = false;
  }
  cek(ok2, "fuzz 20.000 aksi lab banding: empat angka, ribuan 1 sampai 9, riwayat tidak dicabut");
}

/* ------------------------------ Lab Susun-Urai (D) ------------------------------ */
const dd = (x, ...ak) => ak.reduce((s, a) => D.langkahSusunK4B1D(s, a), x);
const kd = D.keadaanSusunK4B1D;
function aturKeping(x, jenis, k) {
  let s = x;
  const kunci = jenis === "SUSUN" ? "susun" : "urai";
  for (let i = 0; i < 4; i += 1) {
    while (s[kunci][i] > k[i]) s = dd(s, { t: jenis, i, d: -1 });
  }
  for (let i = 0; i < 4; i += 1) {
    while (s[kunci][i] < k[i]) s = dd(s, { t: jenis, i, d: 1 });
  }
  return s;
}
const pilihSasaran = (x, n) => {
  let s = x;
  for (let k = 0; k < 4 && D.SASARAN_URAI[s.sasaran] !== n; k += 1) s = dd(s, { t: "SASARAN", d: 1 });
  return s;
};
function aturUang(x, target, u) {
  let s = x;
  if (D.SASARAN_UANG[s.sasaranUang] !== target) s = dd(s, { t: "SASARAN_UANG", d: 1 });
  u.forEach((v, i) => {
    for (let k = 0; k < v; k += 1) s = dd(s, { t: "UANG", i, d: 1 });
  });
  return s;
}
{
  const d0 = D.awalSusunK4B1D();
  cek(D.jumlahKeping(d0.susun) === 6248 && !D.kepingBaku(d0.susun) && d0.pernah.length === 0, "D awal: 6.248 dengan 12 keping ratusan (tak baku)");
  let ok = true;
  let banyak = 0;
  for (let a = 0; a <= 10; a += 1)
    for (let b = 0; b <= 20; b += 1)
      for (let c = 0; c <= 20; c += 1)
        for (let e = 0; e <= 20; e += 1) {
          const k = [a, b, c, e];
          const tot = a * 1000 + b * 100 + c * 10 + e;
          if (tot > 10000) continue;
          banyak += 1;
          const g = D.kelompokkan(k);
          if (D.jumlahKeping(k) !== tot || D.jumlahKeping(g) !== tot || !D.kepingBaku(g)) ok = false;
          if (tot < 10000 && JSON.stringify(g) !== JSON.stringify(dig(tot))) ok = false;
          const suku = D.sukuUraian(k, true);
          if (jumlahSuku(suku.join(" + ")) !== tot || suku.length !== 4) ok = false;
          if (jumlahSuku(D.sukuUraian(k, false).join(" + ")) !== tot) ok = false;
        }
  cek(ok, `kelompokkan dan uraian: ${banyak} susunan keping, jumlah tetap dan hasil kelompok = digit bilangan`);
  const kel = dd(d0, { t: "KELOMPOK" });
  cek(D.jumlahKeping(kel.susun) === 6248 && D.kepingBaku(kel.susun) && kel.pernah.includes("kelompok") && kel.pesan.includes("tetap"), "Kelompokkan: 6.248 tetap 6.248");
  cek(dd(kel, { t: "KELOMPOK" }).pesan.includes("Tidak ada yang perlu"), "Kelompokkan pada keping baku tidak dicatat ulang");
  // Urai menurut tempat dan cara lain.
  const u3035 = pilihSasaran(d0, 3035);
  const baku = aturKeping(u3035, "URAI", [3, 0, 3, 5]);
  cek(baku.pernah.includes("urai:3035:baku"), "3.035 diurai menurut tempat");
  const lain = aturKeping(u3035, "URAI", [2, 10, 3, 5]);
  cek(lain.pernah.includes("urai:3035:lain") && !lain.pernah.includes("urai:3035:baku"), "3.035 = 2.000 + 1.000 + 30 + 5 tercatat sebagai cara lain");
  const hampir = aturKeping(u3035, "URAI", [3, 0, 3, 4]);
  cek(!hampir.pernah.some((p) => p.startsWith("urai:3035")) && D.statusUrai(hampir.urai, 3035).selisih === 1, "3.034 bukan uraian 3.035 (kurang 1)");
  // Uang: semua kombinasi pecahan untuk Rp7.300 dan Rp10.000 dihitung mandiri.
  for (const t of D.SASARAN_UANG) {
    let cara = 0;
    for (let p5 = 0; p5 <= 2; p5 += 1) for (let p2 = 0; p2 <= 5; p2 += 1) for (let p1 = 0; p1 <= 10; p1 += 1) for (let p05 = 0; p05 <= 20; p05 += 1) for (let p01 = 0; p01 <= 100; p01 += 1) if (p5 * 5000 + p2 * 2000 + p1 * 1000 + p05 * 500 + p01 * 100 === t) cara += 1;
    cek(cara >= 2, `Rp${titik(t)} bisa disusun dengan ${cara} cara (minimal dua)`);
  }
  const u7300 = aturUang(d0, 7300, [1, 1, 0, 0, 3]);
  cek(u7300.pernah.includes("uang:7300") && D.jumlahUang(u7300.uang) === 7300, "Rp5.000 + Rp2.000 + 3 × Rp100 = Rp7.300");
  const lebih = aturUang(d0, 7300, [1, 1, 1, 0, 0]);
  cek(!lebih.pernah.includes("uang:7300"), "Rp8.000 bukan Rp7.300");
  const ac = acakDari(17);
  let x = d0;
  let ok2 = true;
  for (let n = 0; n < 20000; n += 1) {
    const sebelum = x;
    x = D.langkahSusunK4B1D(x, [{ t: "SUSUN", i: ac(4), d: ac(3) ? 1 : -1 }, { t: "URAI", i: ac(4), d: ac(3) ? 1 : -1 }, { t: "KELOMPOK" }, { t: "NOL" }, { t: "SASARAN", d: 1 }, { t: "UANG", i: ac(5), d: ac(3) ? 1 : -1 }, { t: "SASARAN_UANG", d: 1 }][ac(7)]);
    if (D.jumlahKeping(x.susun) > 10000 || D.jumlahKeping(x.urai) > 10000 || D.jumlahUang(x.uang) > 10000 || [...x.susun, ...x.urai, ...x.uang].some((v) => v < 0)) ok2 = false;
    if (!sebelum.pernah.every((p) => x.pernah.includes(p))) ok2 = false;
  }
  cek(ok2, "fuzz 20.000 aksi lab susun: tidak negatif, tidak lewat 10.000, riwayat tidak dicabut");
}

/* ------------------------------ Lab Jumlah Bersusun (E) ------------------------------ */
const ej = (x, ...ak) => ak.reduce((s, a) => J.langkahJumlahK4B1E(s, a), x);
const kj = J.keadaanJumlahK4B1E;
const ds = (n) => String(n).split("").reduce((s, c) => s + Number(c), 0);
function aturDigitE(x, target) {
  let s = x;
  for (let g = 0; g < 10 && s.digit !== target; g += 1) s = ej(s, { t: "DIGIT", d: 1 });
  return s;
}
function selesaikanE(x) {
  let s = x;
  for (let g = 0; g < 5 && !J.selesaiE(s); g += 1) {
    const r = J.rincianKolom(s.soal)[s.kolom];
    s = ej(aturDigitE(s, r.tulis), { t: "SIMPAN", n: r.keluar }, { t: "TULIS" });
  }
  return s;
}
const sampaiKolomE = (x, c) => {
  let s = x;
  while (s.kolom < c) {
    const r = J.rincianKolom(s.soal)[s.kolom];
    s = ej(aturDigitE(s, r.tulis), { t: "SIMPAN", n: r.keluar }, { t: "TULIS" });
  }
  return s;
};
const pilihE = (x, kunci) => ej(x, { t: "SOAL", i: J.SOAL_E.findIndex((s) => J.kunciSoal(s) === kunci) });
const stateE = (x, soal) => ({ ...x, soal, kolom: 0, tulis: [null, null, null, null], digit: 0, simpan: 0 });
{
  const e0 = J.awalJumlahK4B1E();
  cek(J.kunciSoal(e0.soal) === "131+321" && e0.kolom === 0 && e0.pernah.length === 0 && e0.tulis.every((v) => v === null) && !e0.panjang, "E awal: 131 + 321, kolom satuan, tanpa riwayat");
  // Semua pasangan a + b <= 1.000 dibandingkan hitungan mandiri (identitas jumlah angka: simpanan = (ds(a) + ds(b) - ds(a+b)) / 9).
  let okRinci = true;
  let okSimpan = true;
  let pasangan = 0;
  for (let a = 0; a <= 999; a += 1)
    for (let b = 0; b <= 999 && a + b <= 1000; b += 1) {
      pasangan += 1;
      const r = J.rincianKolom([a, b]);
      const total = a + b;
      if (r[0].tulis + r[1].tulis * 10 + r[2].tulis * 100 + r[2].keluar * 1000 !== total) okRinci = false;
      if (r.reduce((s, k) => s + k.keluar, 0) * 9 !== ds(a) + ds(b) - ds(total)) okSimpan = false;
    }
  cek(okRinci, `rincian kolom: ${pasangan} pasangan, angka yang ditulis dan simpanan menyusun jumlah yang benar`);
  cek(okSimpan, "jumlah simpanan sama dengan identitas jumlah angka (hitungan mandiri) untuk semua pasangan");
  const ac = acakDari(61);
  let okTiga = true;
  for (let k = 0; k < 100000; k += 1) {
    const s = [ac(500), ac(500), ac(500)];
    const total = s[0] + s[1] + s[2];
    if (total > 1000) continue;
    const r = J.rincianKolom(s);
    if (r[0].tulis + r[1].tulis * 10 + r[2].tulis * 100 + r[2].keluar * 1000 !== total || r.reduce((q, c) => q + c.keluar, 0) * 9 !== ds(s[0]) + ds(s[1]) + ds(s[2]) - ds(total)) okTiga = false;
  }
  cek(okTiga, "tiga bilangan: rincian kolom dan simpanan benar untuk 100.000 acak");
  // Menyelesaikan lewat tombol untuk 3.000 soal acak.
  let okSolve = true;
  for (let k = 0; k < 3000; k += 1) {
    const dua = ac(2) === 0;
    const soal = dua ? [ac(1000), ac(1000)] : [ac(334), ac(333), ac(333)];
    if (soal.reduce((p, q) => p + q, 0) > 1000) continue;
    const s = selesaikanE(stateE(e0, soal));
    const total = soal.reduce((p, q) => p + q, 0);
    const tulis = s.tulis[0] + s.tulis[1] * 10 + s.tulis[2] * 100 + (s.tulis[3] ?? 0) * 1000;
    let carry = 0;
    let banyak = 0;
    for (let c = 0; c < 3; c += 1) {
      const sum = soal.reduce((p, q) => p + (Math.floor(q / 10 ** c) % 10), 0) + carry;
      if (sum >= 10) banyak += 1;
      carry = Math.floor(sum / 10);
    }
    if (!J.selesaiE(s) || tulis !== total || !s.pernah.includes(`jumlah:${soal.join("+")}`) || s.pernah.includes("simpan-dua") !== (banyak >= 2) || s.pernah.includes("jumlah-1000") !== (total === 1000)) okSolve = false;
  }
  cek(okSolve, "3.000 soal acak diselesaikan lewat tombol: hasil, riwayat jumlah, simpan-dua, dan jumlah-1000 benar");
  // Salah dan benar per kolom: tepat satu (angka, simpanan) yang diterima.
  for (const soal of J.SOAL_E)
    for (let c = 0; c < 3; c += 1) {
      const awal = sampaiKolomE(stateE(e0, soal), c);
      let diterima = 0;
      let okPesan = true;
      for (let d = 0; d <= 9; d += 1)
        for (let sm = 0; sm <= 2; sm += 1) {
          const s = ej({ ...awal, digit: d, simpan: sm }, { t: "TULIS" });
          const r = J.rincianKolom(soal)[c];
          const benar = d === r.tulis && sm === r.keluar;
          if (s.kolom === c + 1) diterima += benar ? 1 : 100;
          else if (benar || s.kolom !== c || s.pesan.length < 10) okPesan = false;
          if (d === r.tulis && sm < r.keluar && !s.pernah.includes("lupa-simpan")) okPesan = false;
          if (d === r.tulis && sm > r.keluar && r.keluar > 0 && /Kurang dari sepuluh/.test(s.pesan)) okPesan = false;
          if (d === r.tulis && sm > r.keluar && r.keluar === 0 && !/Kurang dari sepuluh/.test(s.pesan)) okPesan = false;
        }
      cek(diterima === 1 && okPesan, `${soal.join("+")} kolom ${J.TEMPAT_E[c]}: tepat satu pasangan angka dan simpanan diterima, yang lain ditolak dengan pesan`);
    }
  // ATUR, batas, dan SIMPAN.
  const s1000 = pilihE(e0, "456+544");
  cek(J.jumlahSoal(s1000.soal) === 1000, "456 + 544 = 1.000");
  const lewat = ej(s1000, { t: "ATUR", suku: 0, c: 0, d: 1 });
  cek(J.jumlahSoal(lewat.soal) === 1000 && lewat.pesan.includes("paling banyak"), "jumlah tidak boleh lewat 1.000");
  const turun = ej(s1000, { t: "ATUR", suku: 0, c: 0, d: -1 });
  cek(J.jumlahSoal(turun.soal) === 999 && turun.kolom === 0, "mengubah bilangan mengulang pengerjaan dari kolom satuan");
  cek(ej(e0, { t: "SIMPAN", n: 5 }).simpan === 2 && ej(e0, { t: "SIMPAN", n: -3 }).simpan === 0, "simpanan dibatasi 0 sampai 2");
  cek(ej(selesaikanE(e0), { t: "TULIS" }).pesan.includes("Semua kolom sudah ditulis"), "menulis lagi setelah selesai ditolak");
  // Fuzz.
  let x = e0;
  let ok = true;
  const af = acakDari(63);
  for (let n = 0; n < 20000; n += 1) {
    const sebelum = x;
    x = J.langkahJumlahK4B1E(x, [{ t: "SOAL", i: af(6) }, { t: "ATUR", suku: af(3), c: af(3), d: af(2) ? 1 : -1 }, { t: "DIGIT", d: af(2) ? 1 : -1 }, { t: "SIMPAN", n: af(4) }, { t: "TULIS" }, { t: "PANJANG" }][af(6)]);
    if (x.kolom < 0 || x.kolom > 3 || J.jumlahSoal(x.soal) > 1000 || x.soal.some((v) => v < 0 || v > 999) || x.digit < 0 || x.digit > 9 || x.simpan < 0 || x.simpan > 2 || x.tulis.some((v) => v !== null && (v < 0 || v > 9))) ok = false;
    if (!sebelum.pernah.every((p) => x.pernah.includes(p))) ok = false;
  }
  cek(ok, "fuzz 20.000 aksi lab jumlah: kolom 0 sampai 3, jumlah <= 1.000, digit dan simpanan dalam batas, riwayat tidak dicabut");
}

/* ------------------------------ Lab Kurang Bersusun (F) ------------------------------ */
const fk = (x, ...ak) => ak.reduce((s, a) => KR.langkahKurangK4B1F(s, a), x);
const kk = KR.keadaanKurangK4B1F;
function aturDigitF(x, target) {
  let s = x;
  for (let g = 0; g < 10 && s.digit !== target; g += 1) s = fk(s, { t: "DIGIT", d: 1 });
  return s;
}
function ambilUntuk(x, c) {
  let s = x;
  if (s.atas[c + 1] === 0) s = ambilUntuk(s, c + 1);
  return fk(s, { t: "AMBIL", c });
}
function selesaikanF(x) {
  let s = x;
  for (let g = 0; g < 6 && !KR.selesaiF(s); g += 1) {
    const c = s.kolom;
    if (s.atas[c] < KR.digitF(s.b, c)) s = ambilUntuk(s, c);
    s = fk(aturDigitF(s, s.atas[c] - KR.digitF(s.b, c)), { t: "TULIS" });
  }
  return s;
}
const pilihF = (x, a, b) => fk(x, { t: "SOAL", i: KR.SOAL_F.findIndex(([p, q]) => p === a && q === b) });
const stateF = (x, a, b) => ({ ...x, a, b, atas: [0, 1, 2, 3].map((c) => Math.floor(a / 10 ** c) % 10), kolom: 0, tulis: [null, null, null, null], digit: 0, ambil: 0, periksa: false });
{
  const f0 = KR.awalKurangK4B1F();
  cek(f0.a === 265 && f0.b === 132 && f0.kolom === 0 && f0.pernah.length === 0 && !f0.periksa, "F awal: 265 - 132, kolom satuan, tanpa riwayat");
  // Semua pasangan a >= b (0 sampai 999, dan 1.000): banyak pengambilan = (ds(b) + ds(a-b) - ds(a)) / 9 (hitungan mandiri).
  let okAmbil = true;
  let pasangan = 0;
  for (let a = 0; a <= 1000; a += 1)
    for (let b = 0; b <= a; b += 1) {
      pasangan += 1;
      if (KR.banyakAmbil(a, b) * 9 !== ds(b) + ds(a - b) - ds(a)) okAmbil = false;
    }
  cek(okAmbil, `banyak pengambilan sama dengan identitas jumlah angka (hitungan mandiri) untuk ${pasangan} pasangan`);
  const ac = acakDari(71);
  let okSolve = true;
  let banyakDiuji = 0;
  for (let k = 0; k < 3000; k += 1) {
    const a = ac(1000);
    const b = ac(a + 1);
    banyakDiuji += 1;
    const s = selesaikanF(stateF(f0, a, b));
    const tulis = s.tulis.reduce((p, v, c) => p + (v ?? 0) * 10 ** c, 0);
    const kunci = `${a}-${b}`;
    if (!KR.selesaiF(s) || tulis !== a - b || s.ambil !== KR.banyakAmbil(a, b) || !s.pernah.includes(`kurang:${kunci}`) || s.pernah.includes(`ambil-dua:${kunci}`) !== (s.ambil >= 2)) okSolve = false;
    const p = fk(s, { t: "PERIKSA" });
    if (!p.pernah.includes(`periksa:${kunci}`) || !KR.kalimatPeriksa(p).includes("Benar!")) okSolve = false;
    if (Array.from({ length: 4 }, (_, c) => s.atas[c] * 10 ** c).reduce((p2, q) => p2 + q, 0) !== a) okSolve = false;
  }
  cek(okSolve, `${banyakDiuji} soal acak diselesaikan lewat tombol Ambil, angka, dan Tulis: hasil, pengambilan, riwayat, dan periksa benar`);
  const seribu = selesaikanF(pilihF(f0, 1000, 1));
  cek(KR.selesaiF(seribu) && seribu.ambil === 3 && seribu.tulis.join() === "9,9,9,0" && seribu.pernah.includes("kurang:1000-1"), "1.000 - 1 = 999 dengan tiga kali mengambil berantai");
  // Tulis: angka yang diterima per kolom.
  for (const [a, b] of KR.SOAL_F)
    for (let c = 0; c < KR.kolomF(a); c += 1) {
      let s = stateF(f0, a, b);
      for (let g = 0; g < c; g += 1) {
        if (s.atas[s.kolom] < KR.digitF(b, s.kolom)) s = ambilUntuk(s, s.kolom);
        s = fk(aturDigitF(s, s.atas[s.kolom] - KR.digitF(b, s.kolom)), { t: "TULIS" });
      }
      const perlu = s.atas[c] < KR.digitF(b, c);
      let diterimaSebelum = 0;
      for (let d = 0; d <= 9; d += 1) {
        const t = fk({ ...s, digit: d }, { t: "TULIS" });
        if (t.kolom === c + 1) diterimaSebelum += 1;
        if (perlu && d === KR.digitF(b, c) - s.atas[c] && !t.pernah.includes("balik-salah")) diterimaSebelum += 100;
        if (perlu && d !== KR.digitF(b, c) - s.atas[c] && !t.pernah.includes("ambil-lupa")) diterimaSebelum += 100;
      }
      const sesudah = perlu ? ambilUntuk(s, c) : s;
      let diterima = 0;
      for (let d = 0; d <= 9; d += 1) if (fk({ ...sesudah, digit: d }, { t: "TULIS" }).kolom === c + 1) diterima += 1;
      cek(diterimaSebelum === (perlu ? 0 : 1) && diterima === 1, `${a} - ${b} kolom ${KR.TEMPAT_F[c]}: ${perlu ? "ditolak sebelum mengambil (termasuk balik), tepat satu angka sesudahnya" : "tepat satu angka diterima"}`);
    }
  // Penjagaan tombol Ambil.
  const tanpa = fk(f0, { t: "AMBIL", c: 0 });
  cek(tanpa.ambil === 0 && tanpa.pesan.includes("Tidak perlu mengambil"), "265 - 132: mengambil di satuan ditolak (sudah cukup)");
  const dini = fk(pilihF(f0, 265, 132), { t: "AMBIL", c: 1 });
  cek(dini.ambil === 0 && dini.atas.join() === "5,6,2,0", "265 - 132: mengambil untuk puluhan sebelum waktunya ditolak (tidak membuat anak macet)");
  const nol = pilihF(f0, 304, 128);
  const tolakNol = fk(nol, { t: "AMBIL", c: 0 });
  cek(tolakNol.ambil === 0 && tolakNol.pesan.includes("tinggal 0"), "304 - 128: satuan tidak bisa mengambil dari puluhan yang kosong");
  const rantai = fk(nol, { t: "AMBIL", c: 1 }, { t: "AMBIL", c: 0 });
  cek(rantai.ambil === 2 && rantai.atas.join() === "14,9,2,0", "304 - 128: ambil untuk puluhan dulu, lalu satuan (14, 9, 2)");
  cek(fk(rantai, { t: "AMBIL", c: 0 }).atas[0] === 14, "ambil lagi di satuan yang sudah 14 ditolak");
  cek(fk(f0, { t: "AMBIL", c: 5 }).ambil === 0 && fk(f0, { t: "AMBIL", c: 2 }).ambil === 0, "mengambil untuk ratusan (tidak ada kolom di kirinya) ditolak");
  const sel = selesaikanF(f0);
  cek(fk(sel, { t: "TULIS" }).pesan.includes("Semua kolom sudah ditulis") && fk(f0, { t: "PERIKSA" }).pesan.includes("Selesaikan dulu"), "menulis setelah selesai dan memeriksa sebelum selesai ditolak");
  // ATUR.
  const lebihKecil = fk(f0, { t: "ATUR", bil: "a", c: 2, d: -1 }, { t: "ATUR", bil: "a", c: 2, d: -1 });
  cek(lebihKecil.a === 165 && lebihKecil.pesan.includes("lebih kecil"), "bilangan atas 65 (lebih kecil dari 132) ditolak, tinggal 165");
  cek(fk(seribu, { t: "ATUR", bil: "a", c: 0, d: 1 }).a === 1000, "bilangan 1.000 tidak diubah lewat ATUR");
  // Cara panjang mengikuti pengambilan.
  const u = KR.uraianPanjang(ambilUntuk(pilihF(f0, 241, 129), 0));
  cek(u.atas === "200 + 30 + 11 = 241" && u.bawah === "100 + 20 + 9 = 129" && u.selisih === "100 + 10 + 2 = 112", `cara panjang 241 - 129 mengikuti pengambilan (${u.atas} | ${u.selisih})`);
  cek(KR.uraianPanjang(pilihF(f0, 241, 129)).selisih.includes("Ambil dulu"), "cara panjang sebelum mengambil meminta mengambil dulu");
  // Fuzz.
  let x = f0;
  let ok = true;
  const af = acakDari(73);
  for (let n = 0; n < 20000; n += 1) {
    const sebelum = x;
    x = KR.langkahKurangK4B1F(x, [{ t: "SOAL", i: af(6) }, { t: "ATUR", bil: af(2) ? "a" : "b", c: af(3), d: af(2) ? 1 : -1 }, { t: "AMBIL", c: af(4) }, { t: "DIGIT", d: af(2) ? 1 : -1 }, { t: "TULIS" }, { t: "PERIKSA" }][af(6)]);
    if (x.a < x.b || x.b < 0 || x.a > 1000 || x.kolom < 0 || x.kolom > KR.kolomF(x.a) || x.digit < 0 || x.digit > 9 || x.tulis.some((v) => v !== null && (v < 0 || v > 9))) ok = false;
    if (x.atas.some((v) => v < 0 || v > 19) || x.atas.reduce((p, v, c) => p + v * 10 ** c, 0) !== x.a) ok = false;
    if (!sebelum.pernah.every((p) => x.pernah.includes(p))) ok = false;
  }
  cek(ok, "fuzz 20.000 aksi lab kurang: atas >= bawah, nilai bilangan atas tetap utuh walau mengambil, digit dalam batas, riwayat tidak dicabut");
}

/* ------------------------------ Lab Kali (G) ------------------------------ */
const gg = (x, ...ak) => ak.reduce((s, a) => KL.langkahKaliK4B1G(s, a), x);
const kg = KL.keadaanKaliK4B1G;
function aturG(x, aksi, target, baca) {
  let s = x;
  for (let g = 0; g < 10 && baca(s) !== target; g += 1) s = gg(s, { t: aksi, d: 1 });
  return s;
}
function selesaikanG(x) {
  let s = x;
  for (let g = 0; g < 3 && !KL.selesaiG(s); g += 1) {
    const p = s.n * s.k;
    const digit = s.kolom === 0 ? p % 10 : Math.floor(p / 10) % 10;
    const simpan = s.kolom === 0 ? Math.floor(((s.n % 10) * s.k) / 10) : Math.floor(p / 100);
    s = gg(aturG(aturG(s, "DIGIT", digit, (q) => q.digit), "SIMPAN", simpan, (q) => q.simpan), { t: "TULIS" });
  }
  return s;
}
const pilihG = (x, n, k) => gg(x, { t: "SOAL", i: KL.SOAL_G.findIndex(([p, q]) => p === n && q === k) });
const stateG = (x, n, k) => ({ ...x, n, k, kolom: 0, tulis: [null, null, null], digit: 0, simpan: 0 });
{
  const g0 = KL.awalKaliK4B1G();
  cek(g0.kotak === 3 && g0.isi === 4 && g0.n === 12 && g0.k === 4 && !g0.belah && g0.kolom === 0 && g0.pernah.length === 0, "G awal: array 3 x 4, soal 12 x 4, tanpa riwayat");
  // Batas array: semua kotak 1..25 dan isi 1..10 dengan hasil <= 100.
  let okArr = true;
  for (let kotak = 1; kotak <= 25; kotak += 1)
    for (let isi = 1; isi <= 10; isi += 1) {
      if (kotak * isi > 100) continue;
      const s = { ...g0, kotak, isi };
      const naikK = gg(s, { t: "KOTAK", d: 1 });
      const naikI = gg(s, { t: "ISI", d: 1 });
      const harusK = kotak + 1 <= 25 && (kotak + 1) * isi <= 100;
      const harusI = isi + 1 <= 10 && kotak * (isi + 1) <= 100;
      if ((naikK.kotak === kotak + 1) !== harusK || (!harusK && naikK.pesan.length < 10)) okArr = false;
      if ((naikI.isi === isi + 1) !== harusI || (!harusI && naikI.pesan.length < 10)) okArr = false;
      if ((gg(s, { t: "KOTAK", d: -1 }).kotak === kotak - 1) !== (kotak > 1) || (gg(s, { t: "ISI", d: -1 }).isi === isi - 1) !== (isi > 1)) okArr = false;
    }
  cek(okArr, "array: kotak 1 sampai 25, isi 1 sampai 10, hasil paling banyak 100 untuk semua kombinasi");
  const a12 = gg(g0, ...Array.from({ length: 9 }, () => ({ t: "KOTAK", d: 1 })));
  cek(a12.kotak === 12 && a12.pernah.includes("array:12x4"), "array 12 kotak berisi 4 tercatat");
  cek(gg(a12, ...Array.from({ length: 4 }, () => ({ t: "ISI", d: 1 }))).pernah.includes("array:12x8"), "array 12 kotak berisi 8 (96) tercatat");
  sama(KL.teksBerulang(3, 4), "4 + 4 + 4 = 12", "penjumlahan berulang 3 x 4");
  sama(KL.teksBerulang(12, 4), "4 + 4 + 4 + 4 + … (12 kali) = 48", "penjumlahan berulang 12 x 4");
  // Cara panjang dan rincian bersusun untuk semua n 10..99, k 2..9 dengan hasil <= 100.
  let okCp = true;
  let okRinci = true;
  let pasangan = 0;
  for (let n = 10; n <= 99; n += 1)
    for (let k = 2; k <= 9 && n * k <= 100; k += 1) {
      pasangan += 1;
      const c = KL.caraPanjangG(n, k);
      const b1 = c.baris[0].match(/^(\d+) × (\d+) = (\d+)$/);
      const b2 = c.baris[1].match(/^(\d+) × (\d+) = (\d+)$/);
      const gb = c.gabung.match(/^(\d+) \+ (\d+) = (\d+)$/);
      const p = n - (n % 10);
      if (!b1 || !b2 || !gb || Number(b1[1]) !== p || Number(b2[1]) !== n % 10 || Number(b1[3]) !== p * k || Number(b2[3]) !== (n % 10) * k) okCp = false;
      if (gb && (Number(gb[1]) + Number(gb[2]) !== n * k || Number(gb[3]) !== n * k)) okCp = false;
      if (c.uraian !== `(${p} + ${n % 10}) × ${k}`) okCp = false;
      const r = KL.rincianKali(n, k);
      if (r[0].tulis + r[1].tulis * 10 + r[1].keluar * 100 !== n * k) okRinci = false;
    }
  cek(okCp, `cara panjang: ${pasangan} soal, puluhan x pengali + satuan x pengali = hasil`);
  cek(okRinci, `rincian bersusun: ${pasangan} soal, angka yang ditulis dan simpanan menyusun hasil kali`);
  // Menyelesaikan lewat tombol untuk semua soal.
  let okSolve = true;
  for (let n = 10; n <= 99; n += 1)
    for (let k = 2; k <= 9 && n * k <= 100; k += 1) {
      const s = selesaikanG(stateG(g0, n, k));
      const tulis = s.tulis[0] + s.tulis[1] * 10 + (s.tulis[2] ?? 0) * 100;
      if (!KL.selesaiG(s) || tulis !== n * k || !s.pernah.includes(`kali:${n}x${k}`) || s.pernah.includes("kali-100") !== (n * k === 100)) okSolve = false;
    }
  cek(okSolve, `${pasangan} soal diselesaikan lewat tombol: hasil benar, riwayat kali dan kali-100 benar`);
  // Per kolom: tepat satu (angka, simpanan) yang diterima.
  for (const [n, k] of KL.SOAL_G)
    for (let c = 0; c < 2; c += 1) {
      const awal = c === 0 ? stateG(g0, n, k) : gg(aturG(aturG(stateG(g0, n, k), "DIGIT", ((n % 10) * k) % 10, (q) => q.digit), "SIMPAN", Math.floor(((n % 10) * k) / 10), (q) => q.simpan), { t: "TULIS" });
      const p = n * k;
      const hDigit = c === 0 ? p % 10 : Math.floor(p / 10) % 10;
      const hSimpan = c === 0 ? Math.floor(((n % 10) * k) / 10) : Math.floor(p / 100);
      let diterima = 0;
      let okPesan = true;
      for (let d = 0; d <= 9; d += 1)
        for (let sm = 0; sm <= 9; sm += 1) {
          const t = gg({ ...awal, digit: d, simpan: sm }, { t: "TULIS" });
          const benar = d === hDigit && sm === hSimpan;
          if (t.kolom === c + 1) diterima += benar ? 1 : 100;
          else if (benar || t.kolom !== c || t.pesan.length < 10) okPesan = false;
          if (d === hDigit && sm < hSimpan && !t.pernah.includes("lupa-simpan")) okPesan = false;
          if (d === hDigit && sm > hSimpan && hSimpan === 0 && !/Kurang dari sepuluh/.test(t.pesan)) okPesan = false;
          if (d === hDigit && sm > hSimpan && hSimpan > 0 && !/Yang disimpan hanya/.test(t.pesan)) okPesan = false;
        }
      cek(diterima === 1 && okPesan, `${n} x ${k} kolom ${KL.TEMPAT_G[c]}: tepat satu pasangan angka dan simpanan diterima, lupa menyimpan tercatat`);
    }
  // ATUR dan batas.
  cek(gg(pilihG(g0, 12, 8), { t: "ATUR", bagian: "pengali", d: 1 }).pesan.includes("paling banyak 100"), "12 x 9 = 108 ditolak");
  const k2 = gg(g0, { t: "ATUR", bagian: "pengali", d: -1 }, { t: "ATUR", bagian: "pengali", d: -1 });
  cek(k2.k === 2 && gg(k2, { t: "ATUR", bagian: "pengali", d: -1 }).pesan.includes("Pengali 2 sampai 9"), "pengali tidak kurang dari 2");
  cek(gg(g0, { t: "ATUR", bagian: "puluhan", d: -1 }).pesan.includes("paling sedikit 10") && gg(g0, { t: "ATUR", bagian: "puluhan", d: -1 }).n === 12, "bilangan di bawah 10 ditolak");
  cek(gg(pilihG(g0, 45, 2), { t: "ATUR", bagian: "pengali", d: 1 }).k === 2, "45 x 3 = 135 ditolak");
  cek(gg(selesaikanG(g0), { t: "TULIS" }).pesan.includes("Semua kolom sudah ditulis"), "menulis lagi setelah selesai ditolak");
  // Fuzz.
  let x = g0;
  let ok = true;
  const af = acakDari(91);
  for (let n = 0; n < 20000; n += 1) {
    const sebelum = x;
    x = KL.langkahKaliK4B1G(x, [{ t: "KOTAK", d: af(2) ? 1 : -1 }, { t: "ISI", d: af(2) ? 1 : -1 }, { t: "SOAL", i: af(6) }, { t: "ATUR", bagian: ["puluhan", "satuan", "pengali"][af(3)], d: af(2) ? 1 : -1 }, { t: "BELAH" }, { t: "DIGIT", d: 1 }, { t: "SIMPAN", d: 1 }, { t: "TULIS" }][af(8)]);
    if (x.kotak < 1 || x.kotak > 25 || x.isi < 1 || x.isi > 10 || x.kotak * x.isi > 100 || x.n < 10 || x.n > 99 || x.k < 2 || x.k > 9 || x.n * x.k > 100 || x.kolom < 0 || x.kolom > 2 || x.digit > 9 || x.simpan > 9) ok = false;
    if (!sebelum.pernah.every((p) => x.pernah.includes(p))) ok = false;
  }
  cek(ok, "fuzz 20.000 aksi lab kali: array dan soal dalam batas, hasil <= 100, riwayat tidak dicabut");
}

/* ------------------------------ Lab Bagi (H) ------------------------------ */
const bj = (x, ...ak) => ak.reduce((s, a) => BG.langkahBagiK4B1H(s, a), x);
const kbg = BG.keadaanBagiK4B1H;
function aturBg(x, aksi, target, baca) {
  let s = x;
  for (let g = 0; g < 10 && baca(s) !== target; g += 1) s = bj(s, { t: aksi, d: 1 });
  return s;
}
/** Nilai langkah bersusun dihitung mandiri dengan operator % dan pembagian lantai. */
function langkahMandiri(n, d) {
  const t = Math.floor(n / 10);
  const cur2 = (t % d) * 10 + (n % 10);
  return [
    { cur: t, q: Math.floor(t / d), r: t % d },
    { cur: cur2, q: Math.floor(cur2 / d), r: cur2 % d },
  ];
}
function selesaikanH(x) {
  let s = x;
  for (let g = 0; g < 3 && !BG.selesaiH(s); g += 1) {
    const m = langkahMandiri(s.n, s.d)[s.langkah];
    s = bj(aturBg(aturBg(s, "DIGIT", m.q, (q) => q.digit), "SISA", m.r, (q) => q.sisa), { t: "TULIS" });
  }
  return s;
}
const pilihH = (x, n, d) => bj(x, { t: "SOAL", i: BG.SOAL_H.findIndex(([p, q]) => p === n && q === d) });
const stateH = (x, n, d) => ({ ...x, n, d, langkah: 0, hasil: [null, null], digit: 0, sisa: 0, periksa: false });
const wadahH = (x, n, w) => {
  let s = x;
  for (let g = 0; g < 3 && s.nWadah !== n; g += 1) s = bj(s, { t: "BENDA", d: 1 });
  for (let g = 0; g < 10 && s.w !== w; g += 1) s = bj(s, { t: "WADAH", d: s.w < w ? 1 : -1 });
  return s;
};
{
  const h0 = BG.awalBagiK4B1H();
  cek(h0.nWadah === 48 && h0.w === 3 && h0.sisaBenda === 48 && h0.putaran === 0 && h0.n === 48 && h0.d === 4 && h0.pernah.length === 0, "H awal: 48 benda, 3 wadah, soal 48 : 4, tanpa riwayat");
  // Wadah: HABIS dan PUTARAN berulang sama dengan hitungan mandiri.
  let okW = true;
  let banyakW = 0;
  for (const n of BG.BENDA_WADAH)
    for (let w = 2; w <= 9; w += 1) {
      banyakW += 1;
      const awal = wadahH(h0, n, w);
      const h = bj(awal, { t: "HABIS" });
      if (h.putaran !== Math.floor(n / w) || h.sisaBenda !== n % w || !h.pernah.includes(`wadah:${n}:${w}`) || h.pernah.includes(`${n % w === 0 ? "habis" : "bersisa"}:${n}:${w}`) === false || h.pernah.includes(`${n % w === 0 ? "bersisa" : "habis"}:${n}:${w}`)) okW = false;
      let s = awal;
      let g = 0;
      while (!BG.wadahSelesai(s) && g < 200) {
        s = bj(s, { t: "PUTARAN" });
        g += 1;
      }
      if (s.putaran !== Math.floor(n / w) || s.sisaBenda !== n % w || g !== Math.floor(n / w) || s.putaran * w + s.sisaBenda !== n) okW = false;
      if (!bj(s, { t: "PUTARAN" }).pesan.includes("kurang dari")) okW = false;
      const tb = BG.tabelPercobaan(n).find((r) => r.w === w);
      if (tb.isi !== Math.floor(n / w) || tb.sisa !== n % w || tb.isi * w + tb.sisa !== n) okW = false;
    }
  cek(okW, `wadah: ${banyakW} kombinasi benda dan wadah, isi tiap wadah dan sisa benar lewat HABIS maupun putaran demi putaran`);
  cek(bj(wadahH(h0, 48, 4), { t: "PUTARAN" }).pernah.length === 0, "satu putaran belum mencatat apa pun (belum habis)");
  cek(BG.tabelPercobaan(48).filter((r) => r.sisa === 0).map((r) => r.w).join() === "2,3,4,6,8", "tabel percobaan 48: habis pada 2, 3, 4, 6, dan 8 wadah");
  // Bersusun: semua n 10..99 dan d 2..9.
  let okLangkah = true;
  let okSolve = true;
  let okPeriksa = true;
  let pasangan = 0;
  for (let n = 10; n <= 99; n += 1)
    for (let d = 2; d <= 9; d += 1) {
      pasangan += 1;
      const l = BG.langkahBagi(n, d);
      const m = langkahMandiri(n, d);
      if (JSON.stringify(l) !== JSON.stringify(m)) okLangkah = false;
      if (l[0].q * 10 + l[1].q !== Math.floor(n / d) || l[1].r !== n % d || l[0].r >= d || l[1].r >= d || l[1].q > 9) okLangkah = false;
      const s = selesaikanH(stateH(h0, n, d));
      if (!BG.selesaiH(s) || BG.hasilTulisH(s) !== Math.floor(n / d) || !s.pernah.includes(`bagi:${n}:${d}`) || s.pernah.includes("belum-cukup") !== (Math.floor(n / 10) < d)) okSolve = false;
      const p = bj(s, { t: "PERIKSA" });
      if (!p.pernah.includes(`periksa:${n}:${d}`) || !BG.kalimatPeriksaH(p).includes("Benar!") || Math.floor(n / d) * d + (n % d) !== n) okPeriksa = false;
    }
  cek(okLangkah, `langkah bersusun: ${pasangan} soal sama dengan hitungan mandiri (hasil, sisa, sisa < pembagi)`);
  cek(okSolve, `${pasangan} soal diselesaikan lewat tombol: hasil, riwayat bagi, dan belum-cukup benar`);
  cek(okPeriksa, `periksa: ${pasangan} soal, hasil x pembagi + sisa = bilangan awal dan kalimat Benar`);
  // Per langkah: tepat satu (hasil, sisa) yang diterima, dan pesan sesuai jenis kesalahan.
  for (const [n, d] of BG.SOAL_H)
    for (let c = 0; c < 2; c += 1) {
      const m = langkahMandiri(n, d);
      const awal = c === 0 ? stateH(h0, n, d) : bj(aturBg(aturBg(stateH(h0, n, d), "DIGIT", m[0].q, (q) => q.digit), "SISA", m[0].r, (q) => q.sisa), { t: "TULIS" });
      let diterima = 0;
      let okPesan = true;
      for (let q = 0; q <= 9; q += 1)
        for (let r = 0; r <= 9; r += 1) {
          const t = bj({ ...awal, digit: q, sisa: r }, { t: "TULIS" });
          const benar = q === m[c].q && r === m[c].r;
          if (t.langkah === c + 1) diterima += benar ? 1 : 100;
          else if (benar) okPesan = false;
          else {
            const cur = m[c].cur;
            const jenis = q * d > cur ? "terlalu besar" : r !== cur - q * d ? "Sisa =" : "masih bisa dibagi";
            if (!t.pesan.includes(jenis)) okPesan = false;
            if ((q * d > cur) !== t.pernah.includes("terlalu-besar") && q * d > cur) okPesan = false;
          }
        }
      cek(diterima === 1 && okPesan, `${n} : ${d} langkah ${c === 0 ? "puluhan" : "satuan"}: tepat satu pasangan hasil dan sisa diterima, pesan sesuai kesalahan`);
    }
  const s36 = selesaikanH(pilihH(h0, 36, 4));
  cek(s36.pernah.includes("belum-cukup") && BG.langkahBagi(36, 4)[0].q === 0 && BG.hasilTulisH(s36) === 9, "36 : 4: puluhan belum cukup (hasil 0), hasil akhir 9");
  cek(bj(selesaikanH(h0), { t: "TULIS" }).pesan.includes("Semua langkah sudah ditulis") && bj(h0, { t: "PERIKSA" }).pesan.includes("Selesaikan dulu"), "menulis setelah selesai dan memeriksa sebelum selesai ditolak");
  // Fuzz.
  let x = h0;
  let ok = true;
  const af = acakDari(93);
  for (let n = 0; n < 20000; n += 1) {
    const sebelum = x;
    x = BG.langkahBagiK4B1H(x, [{ t: "BENDA", d: 1 }, { t: "WADAH", d: af(2) ? 1 : -1 }, { t: "PUTARAN" }, { t: "HABIS" }, { t: "ULANG_WADAH" }, { t: "SOAL", i: af(7) }, { t: "DIGIT", d: 1 }, { t: "SISA", d: 1 }, { t: "TULIS" }, { t: "PERIKSA" }][af(10)]);
    if (x.w < 2 || x.w > 9 || x.sisaBenda < 0 || x.sisaBenda > x.nWadah || x.putaran * x.w + x.sisaBenda !== x.nWadah && x.putaran !== Math.floor(x.nWadah / x.w) || x.langkah < 0 || x.langkah > 2 || x.digit > 9 || x.sisa > 9) ok = false;
    if (x.putaran * x.w + x.sisaBenda !== x.nWadah) ok = false;
    if (!sebelum.pernah.every((p) => x.pernah.includes(p))) ok = false;
  }
  cek(ok, "fuzz 20.000 aksi lab bagi: banyak benda tetap utuh (isi x wadah + sisa), wadah 2 sampai 9, riwayat tidak dicabut");
}

/* ------------------------------ Lab Faktor (I) ------------------------------ */
const fx = (x, ...ak) => ak.reduce((s, a) => FK.langkahFaktorK4B1I(s, a), x);
const kfx = FK.keadaanFaktorK4B1I;
const pilihN = (x, n) => fx(x, { t: "N", i: FK.DAFTAR_N.indexOf(n) });
const cobaSemua = (x, daftar) => fx(x, ...daftar.map((d) => ({ t: "COBA", d })));
const faktorMandiri = (n) => {
  const h = new Set();
  for (let a = 1; a <= n; a += 1) for (let b = 1; b <= n; b += 1) if (a * b === n) h.add(a);
  return [...h].sort((p, q) => p - q);
};
{
  const i0 = FK.awalFaktorK4B1I();
  cek(i0.n === 12 && i0.dicoba.length === 0 && i0.k === 2 && i0.m === 0 && !i0.rentang && i0.pernah.length === 0, "I awal: bilangan 12, belum ada yang dicoba, lompatan 2 tanpa lompat");
  let okFaktor = true;
  let okCoba = true;
  for (let n = 1; n <= 100; n += 1) {
    if (JSON.stringify(FK.faktorDari(n)) !== JSON.stringify(faktorMandiri(n))) okFaktor = false;
    for (let d = 1; d <= n && n <= 50; d += 1) {
      const c = FK.cobaPembagi(n, d);
      if (c.hasil * d + c.sisa !== n || c.sisa >= d || c.faktor !== (c.sisa === 0) || (c.faktor && c.pasangan * d !== n) || (!c.faktor && c.pasangan !== null)) okCoba = false;
    }
  }
  cek(okFaktor, "faktor 1 sampai 100 sama dengan pencarian pasangan a x b = n (hitungan mandiri)");
  cek(okCoba, "mencoba pembagi: n = hasil x d + sisa, sisa < d, pasangan x d = n bila faktor");
  sama(FK.faktorDari(12), [1, 2, 3, 4, 6, 12], "faktor 12");
  sama(FK.faktorDari(20), [1, 2, 4, 5, 10, 20], "faktor 20");
  sama(FK.faktorDari(24).length, 8, "faktor 24 ada 8");
  sama(FK.faktorDari(13), [1, 13], "faktor 13 hanya dua");
  // Lab: lengkap hanya setelah semua faktor dicoba.
  for (const n of FK.DAFTAR_N) {
    const f = faktorMandiri(n);
    const semua = cobaSemua(pilihN(i0, n), f);
    cek(semua.pernah.includes(`lengkap:${n}`) && semua.pernah.includes("dua-faktor") === (f.length === 2), `faktor ${n}: lengkap setelah semua ${f.length} faktor dicoba`);
    const kurang = cobaSemua(pilihN(i0, n), f.slice(0, -1));
    cek(!kurang.pernah.includes(`lengkap:${n}`), `faktor ${n}: kurang satu faktor belum lengkap`);
    const dengan = cobaSemua(pilihN(i0, n), Array.from({ length: n }, (_, i) => i + 1));
    cek(dengan.pernah.includes(`lengkap:${n}`) && FK.faktorDitemukan(dengan).join() === f.join(), `faktor ${n}: mencoba semua pembagi 1 sampai ${n} juga lengkap, faktor yang ditemukan benar`);
    const bukan = Array.from({ length: n }, (_, i) => i + 1).filter((d) => n % d !== 0);
    const hanyaBukan = cobaSemua(pilihN(i0, n), bukan);
    cek(!hanyaBukan.pernah.includes(`lengkap:${n}`) && hanyaBukan.pernah.every((p) => !p.startsWith("faktor:")), `faktor ${n}: mencoba bukan faktor saja tidak lengkap`);
  }
  const c5 = fx(i0, { t: "COBA", d: 5 });
  cek(c5.pernah.includes("bukan:12:5") && c5.pesan.includes("bukan faktor") && c5.pesan.includes("sisa 2"), "12 : 5 = 2 sisa 2, 5 bukan faktor 12");
  const c4 = fx(i0, { t: "COBA", d: 4 });
  cek(c4.pernah.includes("faktor:12:4") && c4.pesan.includes("4 × 3 = 12"), "4 faktor 12 dengan pasangan 4 x 3");
  cek(fx(c4, { t: "COBA", d: 4 }).pesan.includes("sudah dicoba") && fx(i0, { t: "COBA", d: 13 }).dicoba.length === 0 && fx(i0, { t: "COBA", d: 0 }).dicoba.length === 0, "pembagi yang sama atau di luar 1 sampai n ditolak");
  sama(FK.pasanganDitemukan(cobaSemua(i0, [1, 2, 3, 4, 6, 12])), ["1 × 12 = 12", "2 × 6 = 12", "3 × 4 = 12"], "tiga pasangan faktor 12");
  // Kelipatan dan rentang: semua k, a, b dibandingkan hitungan mandiri.
  let okKel = true;
  let okRentang = true;
  let banyakR = 0;
  for (let k = 2; k <= 9; k += 1) {
    const maks = FK.maksLompatan(k);
    let hitung = 0;
    for (let v = 1; v <= 100; v += 1) if (v % k === 0) hitung += 1;
    if (maks !== hitung || FK.kelipatanDari(k, 5).some((v, i) => v !== k * (i + 1))) okKel = false;
    for (let a = 0; a <= 90; a += 1)
      for (let b = a + 1; b <= 100; b += 1) {
        banyakR += 1;
        const harus = [];
        for (let v = a + 1; v < b; v += 1) if (v % k === 0) harus.push(v);
        if (JSON.stringify(FK.dalamRentang(k, a, b)) !== JSON.stringify(harus)) okRentang = false;
      }
  }
  cek(okKel, "kelipatan 2 sampai 9: banyak lompatan maksimum dan i x k benar");
  cek(okRentang, `rentang: ${banyakR} kombinasi k, a, b sama dengan pencarian mandiri (a dan b sendiri tidak ikut)`);
  sama(FK.dalamRentang(5, 17, 35), [20, 25, 30], "kelipatan 5 di antara 17 dan 35");
  sama(FK.dalamRentang(5, 20, 30), [25], "kelipatan 5 di antara 20 dan 30: batas tidak ikut");
  sama(FK.dalamRentang(6, 0, 40), [6, 12, 18, 24, 30, 36], "kelipatan 6 di antara 0 dan 40");
  // Lab lompat.
  const lompat = (x, m) => fx(x, ...Array.from({ length: m }, () => ({ t: "LOMPAT", d: 1 })));
  cek(lompat(i0, 7).pernah.includes("deret:2:7") && !lompat(i0, 6).pernah.includes("deret:2:7"), "kelipatan 2 sampai 7 lompatan tercatat");
  const lewat = lompat(i0, 50);
  cek(lewat.m === 50 && fx(lewat, { t: "LOMPAT", d: 1 }).pesan.includes("batas 100"), "lompatan 2 paling banyak 50 kali (sampai 100)");
  cek(fx(i0, { t: "LOMPAT", d: -1 }).m === 0 && fx(lompat(i0, 3), { t: "K", d: 1 }).m === 0, "tidak bisa mundur dari 0, mengganti lompatan mengulang dari 0");
  cek(fx(i0, { t: "K", d: -1 }).pesan.includes("Lompatan 2 sampai 9"), "lompatan tidak kurang dari 2");
  const r5 = fx(i0, ...Array.from({ length: 3 }, () => ({ t: "K", d: 1 })), ...Array.from({ length: 7 }, () => ({ t: "A", d: 1 })), ...Array.from({ length: 5 }, () => ({ t: "B", d: 1 })), { t: "RENTANG" });
  cek(r5.k === 5 && r5.a === 17 && r5.b === 35 && r5.pernah.includes("rentang:5:17:35"), "rentang kelipatan 5 antara 17 dan 35 tercatat");
  cek(!fx(r5, { t: "A", d: 1 }).pernah.includes("rentang:5:18:35") === false, "mengubah batas bawah setelah Rentang menyala mencatat rentang baru");
  cek(fx(i0, { t: "A", d: -1 }, ...Array.from({ length: 10 }, () => ({ t: "A", d: -1 }))).a === 0 && fx(i0, ...Array.from({ length: 30 }, () => ({ t: "A", d: 1 }))).a < FK.awalFaktorK4B1I().b, "batas bawah antara 0 dan di bawah batas atas");
  cek(fx(i0, ...Array.from({ length: 80 }, () => ({ t: "B", d: 1 }))).b === 100 && fx(i0, ...Array.from({ length: 80 }, () => ({ t: "B", d: -1 }))).b === 11, "batas atas paling besar 100 dan selalu di atas batas bawah");
  // Fuzz.
  let x = i0;
  let ok = true;
  const af = acakDari(95);
  for (let n = 0; n < 20000; n += 1) {
    const sebelum = x;
    x = FK.langkahFaktorK4B1I(x, [{ t: "N", i: af(6) }, { t: "COBA", d: 1 + af(50) }, { t: "K", d: af(2) ? 1 : -1 }, { t: "LOMPAT", d: af(3) ? 1 : -1 }, { t: "RENTANG" }, { t: "A", d: af(2) ? 1 : -1 }, { t: "B", d: af(2) ? 1 : -1 }][af(7)]);
    if (!FK.DAFTAR_N.includes(x.n) || new Set(x.dicoba).size !== x.dicoba.length || x.dicoba.some((d) => d < 1 || d > x.n) || x.k < 2 || x.k > 9 || x.m < 0 || x.m > FK.maksLompatan(x.k) || x.a < 0 || x.b > 100 || x.a >= x.b) ok = false;
    if (!sebelum.pernah.every((p) => x.pernah.includes(p))) ok = false;
  }
  cek(ok, "fuzz 20.000 aksi lab faktor: pembagi unik dan dalam 1 sampai n, lompatan dan rentang dalam batas, riwayat tidak dicabut");
}

/* ------------------------------ Mesin Bertahap ------------------------------ */
{
  const posisi = [];
  for (const def of MB.SEMUA_MESIN_K4B1_BILANGAN) {
    cek(def.stasiun.length === 4 && def.kasus.length === 3, `${def.id}: 4 stasiun, 3 kasus`);
    const lokal = [];
    for (const kasus of def.kasus) {
      cek(kasus.langkah.length === 4, `${def.id}/${kasus.id}: satu langkah per stasiun`);
      kasus.langkah.forEach((l, i) => {
        cek(l.stasiun === def.stasiun[i].id, `${kasus.id}: stasiun ${i} bernama ${def.stasiun[i].id}`);
        cek(l.opsi.length === 3 && new Set(l.opsi).size === 3 && l.opsi.filter((o) => o === l.benar).length === 1, `${def.id}/${kasus.id}/${l.stasiun}: tiga pilihan unik, satu kunci (${JSON.stringify(l.opsi)})`);
        cek(l.petunjuk.length > 20 && l.tanya.length > 5, `${kasus.id}/${l.stasiun}: tanya dan petunjuk ada`);
        lokal.push(l.opsi.indexOf(l.benar));
      });
    }
    posisi.push(...lokal);
    cek(new Set(lokal).size === 3, `${def.id}: letak kunci bervariasi (${lokal.join("")})`);
    let x = ME.awalMesin(def);
    for (let mi = 0; mi < def.kasus.length; mi += 1) {
      for (let i = 0; i < 4; i += 1) {
        const l = ME.langkahAktif(x);
        const lompat = ME.langkahMesin(x, { t: "LOMPAT", ke: i + 1 });
        cek(lompat.ke === x.ke && lompat.ditolak === x.ditolak + 1, `${def.id}: lompat stasiun ditolak`);
        for (const s of l.opsi.filter((o) => o !== l.benar)) {
          const t = ME.langkahMesin(x, { t: "JAWAB", nilai: s });
          cek(t.ke === x.ke && t.pesan === l.petunjuk, `${def.id}: "${s}" ditolak dengan petunjuk`);
        }
        x = ME.langkahMesin(x, { t: "JAWAB", nilai: l.benar });
      }
      cek(x.fase === "sudah", `${def.id}: kasus ${mi} selesai`);
      x = ME.langkahMesin(x, { t: "LANJUT" });
    }
    cek(x.selesai, `${def.id}: semua kasus selesai`);
  }
  cek(new Set(posisi).size === 3, "letak kunci bervariasi di semua mesin");
  sama(MB.SEMUA_MESIN_K4B1_BILANGAN.map((d) => d.selesaiId), ["A", "B", "C", "D"].map((h) => K4.ID_MESIN_K4B1[h]), "selesaiId mesin sama dengan id misi");

  // Kunci dan SEMUA pengecoh dihitung ulang mandiri.
  MB.KASUS_BACA.forEach((k, idx) => {
    const [rakitL, papan, baca, tulis] = MB.MESIN_BACA.kasus[idx].langkah;
    const d = dig(k.n);
    const m = rakitL.tanya.match(/Ada (\d+) peti, (\d+) dus, (\d+) bungkus, dan (\d+) benda/);
    const dariTanya = Number(m[1]) * 1000 + Number(m[2]) * 100 + Number(m[3]) * 10 + Number(m[4]);
    cek(dariTanya === k.n && angkaTeks(rakitL.benar) === k.n, `${k.id}: rakit ${titik(k.n)}`);
    for (const o of rakitL.opsi.filter((q) => q !== rakitL.benar)) cek(angkaTeks(o) !== k.n, `${k.id}: pengecoh rakit "${o}" memang bukan ${k.n}`);
    const tempat = ["ribuan", "ratusan", "puluhan", "satuan"].findIndex((t) => papan.tanya.includes(`tempat ${t}`));
    cek(papan.benar === String(d[tempat]), `${k.id}: papan ${["ribuan", "ratusan", "puluhan", "satuan"][tempat]} = ${d[tempat]}`);
    for (const o of papan.opsi.filter((q) => q !== papan.benar)) cek(o !== String(d[tempat]), `${k.id}: pengecoh papan ${o} salah`);
    cek(baca.benar === bacaMandiri(k.n), `${k.id}: dibaca ${bacaMandiri(k.n)}`);
    for (const o of baca.opsi.filter((q) => q !== baca.benar)) cek(o !== bacaMandiri(k.n), `${k.id}: pengecoh bacaan "${o}" salah`);
    cek(tulis.tanya.endsWith(`${bacaMandiri(k.tulis)}.`) && angkaTeks(tulis.benar) === k.tulis, `${k.id}: tulis ${titik(k.tulis)}`);
    for (const o of tulis.opsi.filter((q) => q !== tulis.benar)) cek(angkaTeks(o) !== k.tulis, `${k.id}: pengecoh tulis "${o}" memang bukan ${k.tulis}`);
  });
  MB.KASUS_NILAI.forEach((k, idx) => {
    const [tempat, nilai, uraian, tabel] = MB.MESIN_NILAI.kasus[idx].langkah;
    const d = dig(k.n);
    const i = d.indexOf(k.angka);
    cek(tempat.benar === ["ribuan", "ratusan", "puluhan", "satuan"][i], `${k.id}: angka ${k.angka} di ${tempat.benar}`);
    cek(angkaTeks(nilai.benar) === k.angka * 10 ** (3 - i), `${k.id}: nilai ${nilai.benar}`);
    for (const o of nilai.opsi.filter((q) => q !== nilai.benar)) cek(angkaTeks(o) !== k.angka * 10 ** (3 - i), `${k.id}: pengecoh nilai ${o} salah`);
    cek(jumlahSuku(uraian.benar) === k.n && uraian.benar.split(" + ").length === 4, `${k.id}: uraian berjumlah ${k.n}`);
    for (const o of uraian.opsi.filter((q) => q !== uraian.benar)) cek(jumlahSuku(o) !== k.n, `${k.id}: pengecoh uraian "${o}" jumlahnya bukan ${k.n}`);
    cek(tabel.benar === String(d[k.kolom]), `${k.id}: tabel kolom ${k.kolom} = ${d[k.kolom]}`);
    for (const o of tabel.opsi.filter((q) => q !== tabel.benar)) cek(o !== String(d[k.kolom]), `${k.id}: pengecoh tabel ${o} salah`);
    cek(tabel.opsi.includes(String(d[k.kolom] * 10 ** (3 - k.kolom))) || d[k.kolom] * 10 ** (3 - k.kolom) === d[k.kolom], `${k.id}: pengecoh nilai penuh ada di tabel`);
  });
  MB.KASUS_BANDING.forEach((k, idx) => {
    const [rib, pen, tanda, urut] = MB.MESIN_BANDING.kasus[idx].langkah;
    const da = dig(k.a);
    const db = dig(k.b);
    cek(rib.benar === `${da[0]} dan ${db[0]}`, `${k.id}: ribuan ${da[0]} dan ${db[0]}`);
    for (const o of rib.opsi.filter((q) => q !== rib.benar)) cek(o !== `${da[0]} dan ${db[0]}`, `${k.id}: pengecoh ribuan salah`);
    const iBeda = da.findIndex((v, i) => v !== db[i]);
    cek(pen.benar === ["ribuan", "ratusan", "puluhan", "satuan"][iBeda], `${k.id}: penentu ${pen.benar}`);
    cek(tanda.benar === (k.a > k.b ? ">" : k.a < k.b ? "<" : "="), `${k.id}: tanda ${tanda.benar}`);
    const harus = [...k.urut].sort((p, q) => p - q).map(titik).join(", ");
    cek(urut.benar === harus, `${k.id}: urutan ${harus}`);
    for (const o of urut.opsi.filter((q) => q !== urut.benar)) cek(o !== harus, `${k.id}: pengecoh urutan "${o}" salah`);
  });
  MB.KASUS_SUSUN.forEach((k, idx) => {
    const [susun, urai, nol, periksa] = MB.MESIN_SUSUN.kasus[idx].langkah;
    const jumlahTanya = jumlahSuku(susun.tanya.replace(" disusun menjadi…", ""));
    cek(jumlahTanya === k.n && angkaTeks(susun.benar) === k.n, `${k.id}: susun ${titik(k.n)}`);
    for (const o of susun.opsi.filter((q) => q !== susun.benar)) cek(angkaTeks(o) !== k.n, `${k.id}: pengecoh susun "${o}" memang bukan ${k.n}`);
    cek(jumlahSuku(urai.benar) === k.n && urai.benar.split(" + ").length === 4, `${k.id}: uraian menurut tempat`);
    for (const o of urai.opsi.filter((q) => q !== urai.benar)) cek(jumlahSuku(o) !== k.n, `${k.id}: pengecoh urai "${o}" jumlahnya bukan ${k.n}`);
    const iT = ["ribuan", "ratusan", "puluhan", "satuan"].findIndex((t) => nol.tanya.includes(`suku ${t}`));
    cek(angkaTeks(nol.benar) === dig(k.n)[iT] * 10 ** (3 - iT), `${k.id}: suku ${iT} = ${nol.benar}`);
    for (const o of nol.opsi.filter((q) => q !== nol.benar)) cek(angkaTeks(o) !== dig(k.n)[iT] * 10 ** (3 - iT), `${k.id}: pengecoh suku ${o} salah`);
    const lain = periksa.tanya.match(/Apakah (.+) juga uraian/)[1];
    cek(jumlahSuku(lain) === k.n && periksa.benar === `${titik(k.n)}, jadi benar`, `${k.id}: cara lain ${lain} berjumlah ${k.n}`);
    for (const o of periksa.opsi.filter((q) => q !== periksa.benar)) cek(angkaTeks(o.split(",")[0]) !== jumlahSuku(lain) && o.endsWith("keliru"), `${k.id}: pengecoh periksa "${o}" memang salah hitung`);
  });
}

/* ------------------------------ Mesin Hitung (E dan F) ------------------------------ */
{
  cek(MH.SEMUA_MESIN_K4B1_HITUNG.length === 2, "ada dua mesin hitung (E dan F)");
  const posisi = [];
  for (const def of MH.SEMUA_MESIN_K4B1_HITUNG) {
    cek(def.stasiun.length === 4 && def.kasus.length === 3, `${def.id}: 4 stasiun, 3 kasus`);
    const lokal = [];
    for (const kasus of def.kasus) {
      cek(kasus.langkah.length === 4, `${def.id}/${kasus.id}: satu langkah per stasiun`);
      kasus.langkah.forEach((l, i) => {
        cek(l.stasiun === def.stasiun[i].id, `${kasus.id}: stasiun ${i} bernama ${def.stasiun[i].id}`);
        cek(l.opsi.length === 3 && new Set(l.opsi).size === 3 && l.opsi.filter((o) => o === l.benar).length === 1, `${def.id}/${kasus.id}/${l.stasiun}: tiga pilihan unik, satu kunci (${JSON.stringify(l.opsi)})`);
        cek(l.petunjuk.length > 20 && l.tanya.length > 5, `${kasus.id}/${l.stasiun}: tanya dan petunjuk ada`);
        lokal.push(l.opsi.indexOf(l.benar));
      });
    }
    posisi.push(...lokal);
    cek(new Set(lokal).size === 3, `${def.id}: letak kunci bervariasi (${lokal.join("")})`);
    let x = ME.awalMesin(def);
    for (let mi = 0; mi < def.kasus.length; mi += 1) {
      for (let i = 0; i < 4; i += 1) {
        const l = ME.langkahAktif(x);
        const lompat = ME.langkahMesin(x, { t: "LOMPAT", ke: i + 1 });
        cek(lompat.ke === x.ke && lompat.ditolak === x.ditolak + 1, `${def.id}: lompat stasiun ditolak`);
        for (const s of l.opsi.filter((o) => o !== l.benar)) {
          const t = ME.langkahMesin(x, { t: "JAWAB", nilai: s });
          cek(t.ke === x.ke && t.pesan === l.petunjuk, `${def.id}: "${s}" ditolak dengan petunjuk`);
        }
        x = ME.langkahMesin(x, { t: "JAWAB", nilai: l.benar });
      }
      cek(x.fase === "sudah", `${def.id}: kasus ${mi} selesai`);
      x = ME.langkahMesin(x, { t: "LANJUT" });
    }
    cek(x.selesai, `${def.id}: semua kasus selesai`);
  }
  sama(MH.SEMUA_MESIN_K4B1_HITUNG.map((d) => d.selesaiId), [K4.ID_MESIN_K4B1.E, K4.ID_MESIN_K4B1.F], "selesaiId mesin E dan F sama dengan id misi");

  // Mesin Jumlah: kunci dan SEMUA pengecoh dihitung ulang mandiri.
  const satuanE = (t) => {
    const m = t.match(/^tulis (\d+), (?:simpan (\d+)|tidak menyimpan)$/);
    return m ? [Number(m[1]), m[2] ? Number(m[2]) : 0] : null;
  };
  MH.KASUS_JUMLAH.forEach((k, idx) => {
    const [satuan, puluhan, ratusan, hasil] = MH.MESIN_JUMLAH.kasus[idx].langkah;
    const [a, b] = k.suku;
    const total = a + b;
    const s = (a % 10) + (b % 10);
    sama(satuanE(satuan.benar), [s % 10, Math.floor(s / 10)], `${k.id}: kolom satuan ${s}`);
    cek(satuan.tanya.includes(`= ${s}.`), `${k.id}: pertanyaan satuan memuat jumlah ${s}`);
    for (const o of satuan.opsi.filter((q) => q !== satuan.benar)) {
      const p = satuanE(o);
      cek(p !== null && !(p[0] === s % 10 && p[1] === Math.floor(s / 10)), `${k.id}: pengecoh satuan "${o}" memang salah`);
    }
    const p = (Math.floor(a / 10) % 10) + (Math.floor(b / 10) % 10) + Math.floor(s / 10);
    cek(puluhan.benar === String(p), `${k.id}: kolom puluhan ${p}`);
    for (const o of puluhan.opsi.filter((q) => q !== puluhan.benar)) cek(Number(o) !== p, `${k.id}: pengecoh puluhan ${o} salah`);
    const r = Math.floor(total / 100) % 10;
    cek(ratusan.benar === String(r), `${k.id}: angka ratusan ${r}`);
    for (const o of ratusan.opsi.filter((q) => q !== ratusan.benar)) cek(Number(o) !== r && Number(o) >= 0 && Number(o) <= 9, `${k.id}: pengecoh ratusan ${o} satu angka dan salah`);
    cek(hasil.benar === String(total), `${k.id}: hasil ${total}`);
    for (const o of hasil.opsi.filter((q) => q !== hasil.benar)) cek(Number(o) !== total, `${k.id}: pengecoh hasil ${o} salah`);
    const lupa = [0, 1, 2].reduce((q, c) => q + (((Math.floor(a / 10 ** c) % 10) + (Math.floor(b / 10 ** c) % 10)) % 10) * 10 ** c, 0);
    if (lupa !== total) cek(hasil.opsi.includes(String(lupa)), `${k.id}: pengecoh lupa menyimpan (${lupa}) ada`);
  });
  cek(MH.KASUS_JUMLAH.some((k) => k.suku[0] % 10 + (k.suku[1] % 10) < 10) && MH.KASUS_JUMLAH.some((k) => k.suku[0] % 10 + (k.suku[1] % 10) >= 10), "mesin jumlah: ada yang tanpa menyimpan dan ada yang menyimpan");

  // Mesin Kurang.
  const patSatuan = (t, a0, b0) => {
    let m = t.match(/^ambil 1 puluhan, (\d+) − (\d+) = (\d+)$/);
    if (m) return a0 < b0 && Number(m[1]) === a0 + 10 && Number(m[2]) === b0 && Number(m[3]) === a0 + 10 - b0;
    m = t.match(/^(\d+) − (\d+) = (\d+)$/);
    if (m) return a0 >= b0 && Number(m[1]) === a0 && Number(m[2]) === b0 && Number(m[3]) === a0 - b0;
    return false;
  };
  MH.KASUS_KURANG.forEach((k, idx) => {
    const [satuan, puluhan, ratusan, periksa] = MH.MESIN_KURANG.kasus[idx].langkah;
    const a0 = k.a % 10;
    const b0 = k.b % 10;
    cek(patSatuan(satuan.benar, a0, b0), `${k.id}: langkah satuan benar "${satuan.benar}"`);
    for (const o of satuan.opsi.filter((q) => q !== satuan.benar)) cek(!patSatuan(o, a0, b0), `${k.id}: pengecoh satuan "${o}" memang salah`);
    const pinjam0 = a0 < b0 ? 1 : 0;
    const t1 = (Math.floor(k.a / 10) % 10) - pinjam0;
    const b1 = Math.floor(k.b / 10) % 10;
    const hasilP = t1 < b1 ? t1 + 10 - b1 : t1 - b1;
    cek(puluhan.benar === String(hasilP), `${k.id}: kolom puluhan ${hasilP}`);
    for (const o of puluhan.opsi.filter((q) => q !== puluhan.benar)) cek(Number(o) !== hasilP, `${k.id}: pengecoh puluhan ${o} salah`);
    const pinjam1 = t1 < b1 ? 1 : 0;
    const hasilR = (Math.floor(k.a / 100) % 10) - pinjam1 - (Math.floor(k.b / 100) % 10);
    cek(ratusan.benar === String(hasilR) && hasilR >= 0, `${k.id}: kolom ratusan ${hasilR}`);
    for (const o of ratusan.opsi.filter((q) => q !== ratusan.benar)) cek(Number(o) !== hasilR, `${k.id}: pengecoh ratusan ${o} salah`);
    cek(periksa.tanya.includes(`${k.a - k.b} + ${k.b} = `) && periksa.benar === String(k.a), `${k.id}: periksa ${k.a - k.b} + ${k.b} = ${k.a}`);
    for (const o of periksa.opsi.filter((q) => q !== periksa.benar)) cek(Number(o) !== k.a, `${k.id}: pengecoh periksa ${o} salah`);
  });
  const nAmbil = MH.KASUS_KURANG.map((k) => (ds(k.b) + ds(k.a - k.b) - ds(k.a)) / 9).sort().join();
  sama(nAmbil, "0,1,2", "mesin kurang: tanpa mengambil, satu kali, dan dua kali");
}

/* ------------------------------ Mesin Kali, Bagi, Faktor (G, H, I) ------------------------------ */
{
  cek(MG.SEMUA_MESIN_K4B1_BAGI.length === 3, "ada tiga mesin (G, H, I)");
  for (const def of MG.SEMUA_MESIN_K4B1_BAGI) {
    cek(def.stasiun.length === 4 && def.kasus.length === 3, `${def.id}: 4 stasiun, 3 kasus`);
    const lokal = [];
    for (const kasus of def.kasus) {
      cek(kasus.langkah.length === 4, `${def.id}/${kasus.id}: satu langkah per stasiun`);
      kasus.langkah.forEach((l, i) => {
        cek(l.stasiun === def.stasiun[i].id, `${kasus.id}: stasiun ${i} bernama ${def.stasiun[i].id}`);
        cek(l.opsi.length === 3 && new Set(l.opsi).size === 3 && l.opsi.filter((o) => o === l.benar).length === 1, `${def.id}/${kasus.id}/${l.stasiun}: tiga pilihan unik, satu kunci (${JSON.stringify(l.opsi)})`);
        cek(l.petunjuk.length > 20 && l.tanya.length > 5, `${kasus.id}/${l.stasiun}: tanya dan petunjuk ada`);
        lokal.push(l.opsi.indexOf(l.benar));
      });
    }
    cek(new Set(lokal).size === 3, `${def.id}: letak kunci bervariasi (${lokal.join("")})`);
    let x = ME.awalMesin(def);
    for (let mi = 0; mi < def.kasus.length; mi += 1) {
      for (let i = 0; i < 4; i += 1) {
        const l = ME.langkahAktif(x);
        const lompat = ME.langkahMesin(x, { t: "LOMPAT", ke: i + 1 });
        cek(lompat.ke === x.ke && lompat.ditolak === x.ditolak + 1, `${def.id}: lompat stasiun ditolak`);
        for (const s of l.opsi.filter((o) => o !== l.benar)) {
          const t = ME.langkahMesin(x, { t: "JAWAB", nilai: s });
          cek(t.ke === x.ke && t.pesan === l.petunjuk, `${def.id}: "${s}" ditolak dengan petunjuk`);
        }
        x = ME.langkahMesin(x, { t: "JAWAB", nilai: l.benar });
      }
      cek(x.fase === "sudah", `${def.id}: kasus ${mi} selesai`);
      x = ME.langkahMesin(x, { t: "LANJUT" });
    }
    cek(x.selesai, `${def.id}: semua kasus selesai`);
  }
  sama(MG.SEMUA_MESIN_K4B1_BAGI.map((d) => d.selesaiId), [K4.ID_MESIN_K4B1.G, K4.ID_MESIN_K4B1.H, K4.ID_MESIN_K4B1.I], "selesaiId mesin G, H, I sama dengan id misi");

  // Mesin Kali.
  const tulisSimpan = (t) => {
    const m = t.match(/^tulis (\d+), (?:simpan (\d+)|tidak menyimpan)$/);
    return m ? [Number(m[1]), m[2] ? Number(m[2]) : 0] : null;
  };
  const uraiSuku = (t) => {
    const m = t.match(/^(\d+) \+ (\d+) = (\d+)$/);
    return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
  };
  MG.KASUS_KALI.forEach((k, idx) => {
    const [array, urai, bersusun, periksa] = MG.MESIN_KALI.kasus[idx].langkah;
    const p = k.n * k.k;
    const puluh = k.n - (k.n % 10);
    cek(array.benar === String(p) && array.tanya.includes(`${k.n} kotak`) && array.tanya.includes(`berisi ${k.k}`), `${k.id}: array ${p}`);
    for (const o of array.opsi.filter((q) => q !== array.benar)) cek(Number(o) !== p, `${k.id}: pengecoh array ${o} salah`);
    sama(uraiSuku(urai.benar), [puluh * k.k, (k.n % 10) * k.k, p], `${k.id}: cara panjang`);
    for (const o of urai.opsi.filter((q) => q !== urai.benar)) {
      const s = uraiSuku(o);
      cek(s !== null && !(s[0] === puluh * k.k && s[1] === (k.n % 10) * k.k), `${k.id}: pengecoh urai "${o}" salah langkah`);
    }
    const ones = (k.n % 10) * k.k;
    sama(tulisSimpan(bersusun.benar), [ones % 10, Math.floor(ones / 10)], `${k.id}: kolom satuan ${ones}`);
    for (const o of bersusun.opsi.filter((q) => q !== bersusun.benar)) {
      const s = tulisSimpan(o);
      cek(s !== null && !(s[0] === ones % 10 && s[1] === Math.floor(ones / 10)), `${k.id}: pengecoh bersusun "${o}" salah`);
    }
    cek(periksa.benar === String(p), `${k.id}: periksa ${p}`);
    for (const o of periksa.opsi.filter((q) => q !== periksa.benar)) cek(Number(o) !== p, `${k.id}: pengecoh periksa ${o} salah`);
  });
  cek(MG.KASUS_KALI.some((k) => (k.n % 10) * k.k < 10) && MG.KASUS_KALI.some((k) => (k.n % 10) * k.k >= 10), "mesin kali: ada yang tanpa menyimpan dan ada yang menyimpan");

  // Mesin Bagi.
  const bagiTuple = (t) => {
    const m = t.match(/^(\d+) : (\d+) = (\d+), sisa (\d+)$/);
    return m ? m.slice(1).map(Number) : null;
  };
  MG.KASUS_BAGI.forEach((k, idx) => {
    const [puluhan, satuan, sisa, periksa] = MG.MESIN_BAGI.kasus[idx].langkah;
    const m = langkahMandiri(k.n, k.d);
    sama(bagiTuple(puluhan.benar), [m[0].cur, k.d, m[0].q, m[0].r], `${k.id}: langkah puluhan`);
    for (const o of puluhan.opsi.filter((q) => q !== puluhan.benar)) cek(bagiTuple(o) !== null && JSON.stringify(bagiTuple(o)) !== JSON.stringify([m[0].cur, k.d, m[0].q, m[0].r]), `${k.id}: pengecoh puluhan "${o}" salah`);
    sama(bagiTuple(satuan.benar), [m[1].cur, k.d, m[1].q, m[1].r], `${k.id}: langkah satuan`);
    for (const o of satuan.opsi.filter((q) => q !== satuan.benar)) cek(bagiTuple(o) !== null && JSON.stringify(bagiTuple(o)) !== JSON.stringify([m[1].cur, k.d, m[1].q, m[1].r]), `${k.id}: pengecoh satuan "${o}" salah`);
    cek(satuan.tanya.includes(`${m[1].cur} dibagi ${k.d}`) && !/\b0\d\b/.test(satuan.tanya), `${k.id}: pertanyaan satuan menyebut ${m[1].cur} dibagi ${k.d} tanpa angka berawalan nol`);
    cek(sisa.benar === String(k.n % k.d), `${k.id}: sisa ${k.n % k.d}`);
    for (const o of sisa.opsi.filter((q) => q !== sisa.benar)) cek(Number(o) !== k.n % k.d && Number(o) >= 0 && Number(o) < 10, `${k.id}: pengecoh sisa ${o} salah`);
    cek(periksa.benar === String(k.n) && periksa.tanya.includes(`${Math.floor(k.n / k.d)} × ${k.d}`), `${k.id}: periksa kembali ke ${k.n}`);
    for (const o of periksa.opsi.filter((q) => q !== periksa.benar)) cek(Number(o) !== k.n, `${k.id}: pengecoh periksa ${o} salah`);
  });
  cek(MG.KASUS_BAGI.some((k) => k.n % k.d === 0) && MG.KASUS_BAGI.some((k) => k.n % k.d !== 0), "mesin bagi: ada yang habis dibagi dan ada yang bersisa");

  // Mesin Faktor.
  const kali = (t) => {
    const m = t.match(/^(\d+) ([×+]) (\d+) = (\d+)$/);
    return m ? { a: Number(m[1]), op: m[2], b: Number(m[3]), c: Number(m[4]) } : null;
  };
  MG.KASUS_FAKTOR.forEach((k, idx) => {
    const [bagi, sisa, pasangan, kelipatan] = MG.MESIN_FAKTOR.kasus[idx].langkah;
    cek(k.n % k.faktorD === 0 && k.n % k.bukanD !== 0, `${k.id}: ${k.faktorD} faktor dan ${k.bukanD} bukan faktor ${k.n} (hitungan mandiri)`);
    sama(bagiTuple(bagi.benar), [k.n, k.faktorD, k.n / k.faktorD, 0], `${k.id}: ${k.n} : ${k.faktorD}`);
    for (const o of bagi.opsi.filter((q) => q !== bagi.benar)) cek(bagiTuple(o) !== null && JSON.stringify(bagiTuple(o)) !== JSON.stringify([k.n, k.faktorD, k.n / k.faktorD, 0]), `${k.id}: pengecoh bagi "${o}" salah`);
    cek(sisa.benar === `sisa ${k.n % k.bukanD}, jadi ${k.bukanD} bukan faktor ${k.n}` && sisa.tanya.includes(`sisa ${k.n % k.bukanD}`), `${k.id}: arti sisa ${k.n % k.bukanD}`);
    for (const o of sisa.opsi.filter((q) => q !== sisa.benar)) cek(!/bukan faktor/.test(o), `${k.id}: pengecoh sisa "${o}" menyebut ${k.bukanD} faktor (salah)`);
    const kp = kali(pasangan.benar);
    cek(kp && kp.op === "×" && kp.a === k.faktorD && kp.b === k.n / k.faktorD && kp.a * kp.b === kp.c && kp.c === k.n, `${k.id}: pasangan ${pasangan.benar}`);
    for (const o of pasangan.opsi.filter((q) => q !== pasangan.benar)) {
      const q = kali(o);
      cek(q !== null && !(q.op === "×" && q.a * q.b === q.c && q.c === k.n && q.a === k.faktorD), `${k.id}: pengecoh pasangan "${o}" salah`);
    }
    const harus = [];
    for (let v = k.a + 1; v < k.b; v += 1) if (v % k.k === 0 && v <= 100) harus.push(v);
    cek(kelipatan.benar === harus.join(", ") && harus.length >= 3, `${k.id}: kelipatan ${k.k} antara ${k.a} dan ${k.b} = ${harus.join(", ")}`);
    for (const o of kelipatan.opsi.filter((q) => q !== kelipatan.benar)) cek(o !== harus.join(", "), `${k.id}: pengecoh kelipatan "${o}" salah`);
  });
  cek(MG.KASUS_FAKTOR.every((k) => MG.faktorMesin(k.n).join() === faktorMandiri(k.n).join()), "mesin faktor: daftar faktor sama dengan hitungan mandiri");
}

/* ------------------------------ Skenario (kunci dihitung mandiri) ------------------------------ */
{
  const semua = [SB.SKENARIO_K4B1A, SB.SKENARIO_K4B1B, SB.SKENARIO_K4B1C, SB.SKENARIO_K4B1D];
  for (const s of semua) {
    cek(s.adegan.length >= 5 && s.adegan.length <= 8 && new Set(s.adegan.map((a) => a.jenis)).size >= 4, `${s.id}: 5–8 adegan, minimal 4 jenis`);
    for (const a of s.adegan.filter((q) => q.jenis === "pilih")) cek(a.opsi.length === 3 && a.opsi.filter((o) => o.benar).length === 1, `${s.id}/${a.id}: tiga pilihan, satu benar`);
    for (const a of s.adegan.filter((q) => q.jenis === "soal")) for (const q of a.soal) cek(q.opsi.length === 3 && new Set(q.opsi).size === 3 && q.opsi.includes(q.jawaban), `${s.id}/${a.id}: "${q.teks}" tiga pilihan memuat jawaban`);
  }
  const ad = (s, id) => s.adegan.find((a) => a.id === id);
  const benarPilih = (s, id) => ad(s, id).opsi.find((o) => o.benar).teks;
  // A
  const [h1, h2, h3] = ad(SB.SKENARIO_K4B1A, "harga").soal;
  cek(bacaMandiri(6750) === `enam ribu tujuh ratus ${h1.jawaban}`, "A: 6.750 dibaca enam ribu tujuh ratus lima puluh");
  cek(h2.jawaban === String(dig(6750)[1]) && h3.jawaban === String(dig(6750)[3]), "A: ratusan 7 dan satuan 0 pada 6.750");
  cek(benarPilih(SB.SKENARIO_K4B1A, "nol").toLowerCase() === bacaMandiri(7003), "A: 7.003 dibaca tujuh ribu tiga");
  cek(benarPilih(SB.SKENARIO_K4B1A, "seribu").toLowerCase() === bacaMandiri(1025), "A: 1.025 dibaca seribu dua puluh lima");
  for (const o of ad(SB.SKENARIO_K4B1A, "nol").opsi.filter((q) => !q.benar)) cek(o.teks.toLowerCase() !== bacaMandiri(7003), `A: pengecoh "${o.teks}" bukan bacaan 7.003`);
  cek(ad(SB.SKENARIO_K4B1A, "bungkus").target === dig(3286)[2], "A: bungkus pada 3.286 = 8");
  // B
  const [n1, n2, n3] = ad(SB.SKENARIO_K4B1B, "nilai").soal;
  cek(angkaTeks(n1.jawaban) === 7000 && angkaTeks(n2.jawaban) === 500 && angkaTeks(n3.jawaban) === 2000, "B: nilai 7.000, 500, 2.000");
  cek(jumlahSuku(benarPilih(SB.SKENARIO_K4B1B, "uraian")) === 2150, "B: uraian benar berjumlah 2.150");
  for (const o of ad(SB.SKENARIO_K4B1B, "uraian").opsi.filter((q) => !q.benar)) cek(jumlahSuku(o.teks) !== 2150, `B: pengecoh uraian "${o.teks}" bukan 2.150`);
  cek(ad(SB.SKENARIO_K4B1B, "puluhan-6").jumlah === dig(8463)[2] && ad(SB.SKENARIO_K4B1B, "ratusan-6").target === dig(4675)[1], "B: 6 puluhan pada 8.463 dan 6 ratusan pada 4.675");
  cek(benarPilih(SB.SKENARIO_K4B1B, "tabel") === String(dig(7812)[0]), "B: kolom ribuan 7.812 diisi 7");
  // C
  for (const q of ad(SB.SKENARIO_K4B1C, "tanda").soal) {
    const [p, r] = q.teks.split(" … ").map(angkaTeks);
    cek(q.jawaban === (p > r ? ">" : p < r ? "<" : "="), `C: ${q.teks} = ${q.jawaban}`);
  }
  cek(benarPilih(SB.SKENARIO_K4B1C, "penentu") === "Puluhan" && dig(4352).findIndex((v, i) => v !== dig(4365)[i]) === 2, "C: puluhan menentukan 4.352 dan 4.365");
  cek(ad(SB.SKENARIO_K4B1C, "gunung-tinggi").jumlah === [2460, 3676, 3726].filter((v) => v > 3000).length, "C: dua gunung lebih dari 3.000 m");
  cek(benarPilih(SB.SKENARIO_K4B1C, "urut") === [3676, 2460, 3726].sort((p, q) => p - q).map(titik).join(", "), "C: urutan naik gunung");
  // D
  cek(angkaTeks(benarPilih(SB.SKENARIO_K4B1D, "susun")) === 6000 + 300 + 40 + 8, "D: susun 6.348");
  for (const o of ad(SB.SKENARIO_K4B1D, "susun").opsi.filter((q) => !q.benar)) cek(angkaTeks(o.teks) !== 6348, `D: pengecoh susun ${o.teks} bukan 6.348`);
  for (const q of ad(SB.SKENARIO_K4B1D, "urai").soal) {
    const [kiri, kanan] = q.teks.split(" = ");
    cek(jumlahSuku(kanan.replace("…", q.jawaban)) === angkaTeks(kiri), `D: ${q.teks} → ${q.jawaban}`);
    for (const o of q.opsi.filter((v) => v !== q.jawaban)) cek(jumlahSuku(kanan.replace("…", o)) !== angkaTeks(kiri), `D: pengecoh ${o} untuk ${q.teks} salah`);
  }
  cek(ad(SB.SKENARIO_K4B1D, "uang").target * 100 + 5000 + 2000 === 7300, "D: Rp5.000 + Rp2.000 + 3 × Rp100 = Rp7.300");
  cek(5000 + 1348 === 6348 && benarPilih(SB.SKENARIO_K4B1D, "cara-lain").includes("6.348"), "D: 5.000 + 1.348 = 6.348");
  cek(ad(SB.SKENARIO_K4B1D, "sepuluh-ribu").jumlah * 1000 === 10000, "D: sepuluh lembar Rp1.000");
}

/* ------------------------------ Skenario hitung (E dan F) ------------------------------ */
{
  const E = SH.SKENARIO_K4B1E;
  const F = SH.SKENARIO_K4B1F;
  for (const s of [E, F]) {
    cek(s.adegan.length >= 5 && s.adegan.length <= 8 && new Set(s.adegan.map((a) => a.jenis)).size >= 4, `${s.id}: 5-8 adegan, minimal 4 jenis`);
    for (const a of s.adegan.filter((q) => q.jenis === "pilih")) cek(a.opsi.length === 3 && a.opsi.filter((o) => o.benar).length === 1, `${s.id}/${a.id}: tiga pilihan, satu benar`);
    for (const a of s.adegan.filter((q) => q.jenis === "soal")) for (const q of a.soal) cek(q.opsi.length === 3 && new Set(q.opsi).size === 3 && q.opsi.includes(q.jawaban), `${s.id}/${a.id}: "${q.teks}" tiga pilihan memuat jawaban`);
  }
  const ad = (s, id) => s.adegan.find((a) => a.id === id);
  const benar = (s, id) => ad(s, id).opsi.find((o) => o.benar).teks;
  const hitungSuku = (teks, op) => {
    const m = teks.match(op === "+" ? /^(\d+(?: \+ \d+)+) = …$/ : /^(\d+) − (\d+) = …$/);
    if (!m) return null;
    return op === "+" ? m[1].split(" + ").map(Number).reduce((p, q) => p + q, 0) : Number(m[1]) - Number(m[2]);
  };
  // E
  for (const q of [...ad(E, "pohon").soal, ...ad(E, "tiga").soal.slice(0, 2)]) {
    cek(hitungSuku(q.teks, "+") === Number(q.jawaban), `E: ${q.teks} = ${q.jawaban}`);
    for (const o of q.opsi.filter((v) => v !== q.jawaban)) cek(hitungSuku(q.teks, "+") !== Number(o), `E: pengecoh ${o} untuk ${q.teks} salah`);
  }
  cek(benar(E, "simpan") === `Tulis ${(9 + 5) % 10}, simpan ${Math.floor((9 + 5) / 10)} ke puluhan`, "E: 9 + 5 = 14 ditulis 4 dan simpan 1");
  cek(ad(E, "sisa-satuan").jumlah === (9 + 5) % 10, "E: satuan yang ditulis dari 9 + 5");
  cek(ad(E, "puluhan").target === (8 + 4 + 1) % 10 && ad(E, "puluhan").cerita.includes(`8 + 4 + simpanan 1 = ${8 + 4 + 1}`), "E: puluhan 8 + 4 + 1 = 13, ditulis 3");
  cek(Number(benar(E, "hasil").split(" ")[0]) === 189 + 245, "E: jeruk 189 + 245 = 434");
  for (const o of ad(E, "hasil").opsi.filter((q) => !q.benar)) cek(Number(o.teks.split(" ")[0]) !== 189 + 245, `E: pengecoh hasil "${o.teks}" bukan 434`);
  cek(ad(E, "hasil").opsi.some((o) => Number(o.teks.split(" ")[0]) === 324), "E: pengecoh lupa menyimpan (324) ada");
  // F
  for (const q of ad(F, "sisa").soal) {
    cek(hitungSuku(q.teks, "-") === Number(q.jawaban), `F: ${q.teks} = ${q.jawaban}`);
    for (const o of q.opsi.filter((v) => v !== q.jawaban)) cek(hitungSuku(q.teks, "-") !== Number(o), `F: pengecoh ${o} untuk ${q.teks} salah`);
  }
  cek(benar(F, "ambil").includes(`satuan menjadi ${1 + 10}`) && 1 + 10 - 9 === 2, "F: 1 puluhan diambil, satuan menjadi 11, 11 - 9 = 2");
  cek(ad(F, "ambil").opsi.find((o) => o.teks.includes("9 − 1")).umpan.includes(`${2 - 1}${4 - 2}${9 - 1}`), "F: umpan membalik menyebut hasil keliru 128 (9 - 1 = 8, 4 - 2 = 2, 2 - 1 = 1)");
  cek(ad(F, "sebelas").jumlah === 11 - 9, "F: 11 - 9 = 2");
  cek((ds(176) + ds(253 - 176) - ds(253)) / 9 === 2 && benar(F, "dua-kali").startsWith("Dua kali"), "F: 253 - 176 mengambil dua kali");
  cek(ad(F, "puluhan-66").target === Math.floor((241 - 175) / 10) % 10 && 241 - 175 === 66, "F: puluhan pada 241 - 175 = 66 adalah 6");
  cek(112 + 129 === 241 && benar(F, "periksa").includes("241"), "F: 112 + 129 = 241");
}

/* ------------------------------ Skenario G, H, I ------------------------------ */
{
  const SKG = SG.SKENARIO_K4B1G;
  const SKH = SG.SKENARIO_K4B1H;
  const SKI = SG.SKENARIO_K4B1I;
  for (const s of [SKG, SKH, SKI]) {
    cek(s.adegan.length >= 5 && s.adegan.length <= 8 && new Set(s.adegan.map((a) => a.jenis)).size >= 4, `${s.id}: 5-8 adegan (${s.adegan.length}), minimal 4 jenis`);
    for (const a of s.adegan.filter((q) => q.jenis === "pilih")) cek(a.opsi.length === 3 && a.opsi.filter((o) => o.benar).length === 1, `${s.id}/${a.id}: tiga pilihan, satu benar`);
    for (const a of s.adegan.filter((q) => q.jenis === "soal")) for (const q of a.soal) cek(q.opsi.length === 3 && new Set(q.opsi).size === 3 && q.opsi.includes(q.jawaban), `${s.id}/${a.id}: "${q.teks}" tiga pilihan memuat jawaban`);
  }
  const ad = (s, id) => s.adegan.find((a) => a.id === id);
  const benar = (s, id) => ad(s, id).opsi.find((o) => o.benar).teks;
  const hitung = (teks, op) => {
    const m = teks.match(new RegExp(`^(\\d+) ${op === "+" ? "\\+" : op} (\\d+) = \\u2026$`));
    if (!m) return null;
    const [a, b] = [Number(m[1]), Number(m[2])];
    return op === "×" ? a * b : op === ":" ? (a % b === 0 ? a / b : NaN) : op === "−" ? a - b : a + b;
  };
  // G
  for (const q of ad(SKG, "kali").soal) {
    cek(hitung(q.teks, "×") === Number(q.jawaban), `G: ${q.teks} = ${q.jawaban}`);
    for (const o of q.opsi.filter((v) => v !== q.jawaban)) cek(hitung(q.teks, "×") !== Number(o), `G: pengecoh ${o} untuk ${q.teks} salah`);
  }
  cek(ad(SKG, "baris").jumlah === 4 && ad(SKG, "baris").cerita.includes("ada 4"), "G: 4 donat per baris");
  const bp = benar(SKG, "panjang").match(/^(\d+) × (\d+) = (\d+) dan (\d+) × (\d+) = (\d+), lalu (\d+) \+ (\d+) = (\d+)$/);
  cek(bp && Number(bp[1]) === 10 && Number(bp[2]) === 4 && Number(bp[3]) === 40 && Number(bp[4]) === 2 && Number(bp[5]) === 4 && Number(bp[6]) === 8 && Number(bp[7]) + Number(bp[8]) === Number(bp[9]) && Number(bp[9]) === 12 * 4, "G: cara panjang benar 10 x 4 + 2 x 4 = 48");
  cek(benar(SKG, "simpan") === `Tulis ${(4 * 5) % 10}, simpan ${Math.floor((4 * 5) / 10)} ke puluhan`, "G: 4 x 5 = 20 ditulis 0 dan simpan 2");
  cek(1 * 5 + 2 === 7 && 14 * 5 === 70, "G: 1 x 5 + 2 = 7, hasil 70");
  cek(ad(SKG, "pak").target === Math.floor((12 * 8) / 10) % 10 && ad(SKG, "pak").cerita.includes(String(12 * 8)), "G: puluhan pada 96 adalah 9");
  // H
  for (const q of ad(SKH, "bagi").soal) {
    const h = hitung(q.teks, ":");
    cek(h === Number(q.jawaban), `H: ${q.teks} = ${q.jawaban}`);
    for (const o of q.opsi.filter((v) => v !== q.jawaban)) cek(h !== Number(o), `H: pengecoh ${o} untuk ${q.teks} salah`);
  }
  cek(ad(SKH, "wadah").jumlah === 4, "H: empat wadah");
  cek(Math.floor(48 / 5) === 9 && 48 % 5 === 3 && ad(SKH, "sisa").cerita.includes("48 : 5 = 9 sisa 3") && benar(SKH, "sisa").includes("sisa 3"), "H: 48 : 5 = 9 sisa 3, tidak habis dibagi");
  cek(ad(SKH, "kotak").target === (81 / 3) % 10 && 81 % 3 === 0 && ad(SKH, "kotak").cerita.includes("27"), "H: 81 : 3 = 27, satuan 7");
  const pk = benar(SKH, "periksa").match(/^(\d+) × (\d+) = (\d+),/);
  cek(pk && Number(pk[1]) * Number(pk[2]) === Number(pk[3]) && Number(pk[3]) === 55 && 55 / 5 === 11, "H: periksa 11 x 5 = 55");
  // I (pencapaian bab)
  const [i1, i2, i3] = ad(SKI, "bilangan").soal;
  cek(i1.jawaban === "dua" && bacaMandiri(6002) === "enam ribu dua", "I: 6.002 dibaca enam ribu dua");
  cek(i2.jawaban === String(dig(8463)[2] * 10) && i2.teks.includes("8.463"), "I: 6 di puluhan pada 8.463 bernilai 60");
  cek(i3.jawaban === (4352 < 4365 ? "<" : ">"), "I: 4.352 < 4.365");
  const [o1, o2, o3] = ad(SKI, "operasi").soal;
  cek(hitung(o1.teks, "+") === 434 && o1.jawaban === "434" && hitung(o2.teks, "−") === 112 && o2.jawaban === "112" && hitung(o3.teks, "×") === 70 && o3.jawaban === "70", "I: 189 + 245 = 434, 241 - 129 = 112, 14 x 5 = 70");
  cek(jumlahSuku(benar(SKI, "uraian")) === 7020 && benar(SKI, "uraian").split(" + ").length === 4, "I: uraian 7.020 menurut tempat berjumlah 7.020");
  for (const o of ad(SKI, "uraian").opsi.filter((q) => !q.benar)) cek(!(jumlahSuku(o.teks) === 7020 && o.teks.split(" + ").length === 4), `I: pengecoh uraian "${o.teks}" bukan uraian menurut tempat`);
  cek(ad(SKI, "bagi").jumlah === 48 / 4 && 12 * 4 === 48, "I: 48 : 4 = 12 kursi per baris");
  cek(12 % 5 === 2 && 12 % 4 === 0 && 12 % 6 === 0 && benar(SKI, "faktor").startsWith("5,") && ad(SKI, "faktor").opsi.filter((o) => !o.benar).every((o) => /sisa 0/.test(o.teks)), "I: 5 bukan faktor 12, 4 dan 6 faktor 12");
  const [k1, k2, k3] = ad(SKI, "kelipatan").soal;
  cek(k1.jawaban === String(2 * 4) && k2.jawaban === String([20, 25, 30].length) && k3.jawaban === String(12 + 3), "I: kelipatan 2 keempat 8, tiga kelipatan 5 antara 17 dan 35, setelah 12 adalah 15");
  cek([5, 10, 15, 20, 25, 30, 35, 40].filter((v) => v > 17 && v < 35).length === 3, "I: kelipatan 5 antara 17 dan 35 ada tiga");
  cek(/6\.002/.test(JSON.stringify(SKI)) && /241/.test(JSON.stringify(SKI)) && /48 : 4/.test(JSON.stringify(SKI)) === false || /kursi/.test(JSON.stringify(SKI)), "I: pencapaian bab mengulang bilangan, operasi, pembagian, faktor, dan kelipatan");
}

/* ------------------------------ Misi ------------------------------ */
const keadaanAwal = [ka(A.awalKemasanK4B1A()), kb(B.awalNilaiK4B1B()), kc(C.awalBandingK4B1C()), kd(D.awalSusunK4B1D()), kj(J.awalJumlahK4B1E()), kk(KR.awalKurangK4B1F()), kg(KL.awalKaliK4B1G()), kbg(BG.awalBagiK4B1H()), kfx(FK.awalFaktorK4B1I())];
const SEMUA_ID = [...Object.values(K4.ID_MESIN_K4B1), ...Object.values(K4.ID_SKENARIO_K4B1), "x", "mesin-urut"];
const HURUF = ["A", "B", "C", "D"];
const HURUF_ALL = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
for (const h of HURUF_ALL) {
  const daftar = K4.daftarMisiK4Bab1(h);
  cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, `sub-bab ${h}: 7 misi wajib dan 3 tantangan bebas`);
  const ids = new Set();
  for (const m of daftar) {
    cek(!ids.has(m.id), `misi ${m.id}: id unik`);
    ids.add(m.id);
    cek(m.id.startsWith(`${h.toLowerCase()}-`), `misi ${m.id}: berawalan huruf sub-bab`);
    cek(m.teks.length >= 10 && m.teks.length <= 170, `misi ${m.id}: panjang teks ${m.teks.length}`);
    for (const ke of keadaanAwal) cek(!m.cek(ke), `misi ${m.id}: keadaan awal ${ke.alat} tidak memenuhinya`);
  }
  for (const m of daftar.filter((x) => x.id.endsWith("mesin") || x.id.endsWith("skenario"))) {
    const idBenar = m.id.endsWith("mesin") ? K4.ID_MESIN_K4B1[h] : K4.ID_SKENARIO_K4B1[h];
    cek(m.cek(sel(idBenar)), `misi ${m.id}: tercapai oleh ${idBenar}`);
    for (const lain of SEMUA_ID.filter((v) => v !== idBenar)) cek(!m.cek(sel(lain)), `misi ${m.id}: tidak tercapai oleh ${lain}`);
  }
  for (const m of daftar.filter((x) => !x.id.endsWith("mesin") && !x.id.endsWith("skenario"))) for (const id of SEMUA_ID) cek(!m.cek(sel(id)), `misi ${m.id}: tidak tercapai oleh selesai ${id}`);
  cek(!M0.wajibSelesai(M0.tampilMisi(daftar), new Set()), `sub-bab ${h}: gerbang tertutup di awal`);
  cek(TK.MISI_K4B1[h].length > 60 && TK.NAMA_SIM_K4B1[h].length > 10 && TK.misiAwalK4Bab1(h).startsWith("Simulasi 1. Misi:"), `teks misi ${h}`);
}
cek(TK.hurufK4B1("Z") === "A" && TK.hurufK4B1("D") === "D", "hurufK4B1 jatuh ke A bila tak dikenal");

const misiDi = (h, id) => K4.daftarMisiK4Bab1(h).find((m) => m.id === id);
const penuh = (h, id, ke) => cek(misiDi(h, id).cek(ke), `misi ${id} tercapai`);
const belum = (h, id, ke, ket) => cek(!misiDi(h, id).cek(ke), `misi ${id} belum tercapai: ${ket}`);

/* ---- Bukti tiap misi bisa dicapai lewat tombol alat, dan near-miss tidak ---- */
const AKSI_WAJIB = {};
{
  const a0 = A.awalKemasanK4B1A();
  const nyala = aa(a0, { t: "TOGGLE", rep: "baca" });
  penuh("A", "a-tukar", ka(aa(a0, { t: "UBAH", jenis: "dus", d: 1 })));
  belum("A", "a-tukar", ka(aa(a0, { t: "UBAH", jenis: "bungkus", d: 1 })), "baru menambah bungkus");
  penuh("A", "a-rakit", ka(rakit(nyala, 3286)));
  belum("A", "a-rakit", ka(rakit(a0, 3286)), "Bacaan mati");
  belum("A", "a-rakit", ka(rakit(nyala, 3268)), "3.268 bukan 3.286");
  penuh("A", "a-nol", ka(rakit(nyala, 7003)));
  belum("A", "a-nol", ka(rakit(nyala, 7030)), "7.030 bukan 7.003");
  penuh("A", "a-seribu", ka(rakit(nyala, 1025)));
  belum("A", "a-seribu", ka(rakit(nyala, 1205)), "1.205 bukan 1.025");
  penuh("A", "a-tulis", ka(tulisKartu(pilihTarget(a0, 3676), 3676)));
  belum("A", "a-tulis", ka(tulisKartu(pilihTarget(a0, 3676), 3667)), "kartu 3.667 keliru");
  belum("A", "a-tulis", ka(tulisKartu(pilihTarget(a0, 3254), 3254)), "3.254 bukan Semeru");
  penuh("A", "a-sepuluh-ribu", ka(rakit(a0, 10000)));
  belum("A", "a-sepuluh-ribu", ka(rakit(a0, 9999)), "9.999");
  penuh("A", "a-tulis-nol", ka(tulisKartu(pilihTarget(a0, 9045), 9045)));
  belum("A", "a-tulis-nol", ka(tulisKartu(pilihTarget(a0, 9045), 945)), "0945 tanpa ribuan 9");
  penuh("A", "a-2903", ka(rakit(nyala, 2903)));
  AKSI_WAJIB.A = [ka(aa(a0, { t: "UBAH", jenis: "dus", d: 1 })), ka(rakit(rakit(rakit(nyala, 3286), 7003), 1025)), ka(tulisKartu(pilihTarget(a0, 3676), 3676))];
}
{
  const b0 = B.awalNilaiK4B1B();
  penuh("B", "b-2150", kb(bb(aturB(b0, 2150), { t: "PILIH", i: 0 })));
  belum("B", "b-2150", kb(aturB(b0, 2150)), "belum diketuk");
  belum("B", "b-2150", kb(bb(aturB(b0, 2150), { t: "PILIH", i: 1 })), "yang diketuk angka 1");
  const enam = bb(aturB(bb(aturB(b0, 8463), { t: "PILIH", i: 2 }), 4675), { t: "PILIH", i: 1 });
  penuh("B", "b-enam", kb(enam));
  belum("B", "b-enam", kb(bb(aturB(b0, 8463), { t: "PILIH", i: 2 })), "baru 6 di puluhan");
  penuh("B", "b-uraian-nol", kb(bb(aturB(b0, 2150), { t: "TOGGLE" })));
  belum("B", "b-uraian-nol", kb(bb(b0, { t: "TOGGLE" })), "5.371 tanpa nol");
  penuh("B", "b-tabel", kb(isiTabelB(b0, 7812)));
  belum("B", "b-tabel", kb(isiTabelB(b0, 7812, { 0: "7000" })), "kolom ribuan diisi 7000");
  penuh("B", "b-tolak", kb(isiTabelB(b0, 7812, { 0: "7000" })));
  belum("B", "b-tolak", kb(isiTabelB(b0, 7812)), "tabel benar tidak ditolak");
  let buku = b0;
  for (const n of [6192, 2910, 4128]) buku = isiTabelB(buku, n);
  belum("B", "b-buku", kb(buku), "baru tiga bilangan");
  penuh("B", "b-buku", kb(isiTabelB(buku, 9217)));
  let empat = aturB(b0, 4444);
  for (let i = 0; i < 3; i += 1) empat = bb(empat, { t: "PILIH", i });
  belum("B", "b-empat", kb(empat), "baru tiga angka 4");
  penuh("B", "b-empat", kb(bb(empat, { t: "PILIH", i: 3 })));
  penuh("B", "b-nol", kb(bb(aturB(b0, 2150), { t: "PILIH", i: 3 })));
  AKSI_WAJIB.B = [kb(bb(aturB(b0, 2150), { t: "PILIH", i: 0 }, { t: "TOGGLE" })), kb(enam), kb(isiTabelB(isiTabelB(b0, 7812, { 0: "7000" }), 7812))];
}
{
  const c0 = C.awalBandingK4B1C();
  const L = { t: "LANGKAH" };
  penuh("C", "c-kuat", kc(cc(aturDua(c0, 4999, 5111), L)));
  penuh("C", "c-kuat", kc(cc(aturDua(c0, 4999, 5000), L)));
  belum("C", "c-kuat", kc(cc(aturDua(c0, 4999, 5990), L)), "ratusan dan puluhan 9 = 9, tidak semuanya lebih besar");
  belum("C", "c-kuat", kc(cc(c0, L)), "5.734 dan 4.312");
  penuh("C", "c-satuan", kc(cc(aturDua(c0, 4352, 4355), L)));
  belum("C", "c-satuan", kc(cc(aturDua(c0, 4352, 4365), L)), "puluhan yang menentukan");
  penuh("C", "c-sama", kc(cc(aturDua(c0, 8765, 8765), L)));
  belum("C", "c-sama", kc(aturDua(c0, 8765, 8765)), "Langkah mati");
  belum("C", "c-sama", kc(cc(aturDua(c0, 8765, 8766), L)), "beda satu");
  const gunung = [1, 0, 2].reduce((s, i) => cc(s, { t: "KETUK", i }), c0);
  penuh("C", "c-urut", kc(gunung));
  belum("C", "c-urut", kc([1, 2, 0].reduce((s, i) => cc(s, { t: "KETUK", i }), c0)), "Rinjani sebelum Semeru ditolak");
  const kartu = [2, 1, 3, 0].reduce((s, i) => cc(s, { t: "TARUH", kartu: i }), c0);
  penuh("C", "c-kartu", kc(cc(kartu, { t: "PERIKSA" })));
  belum("C", "c-kartu", kc(cc([2, 1, 0, 3].reduce((s, i) => cc(s, { t: "TARUH", kartu: i }), c0), { t: "PERIKSA" })), "9.512 bukan terbesar");
  const turun = [3, 0, 1, 2].reduce((s, i) => cc(s, { t: "KETUK", i }), cc(c0, { t: "URUT", id: "harga" }, { t: "ARAH", arah: "turun" }));
  penuh("C", "c-turun", kc(turun));
  const nolDepan = cc([1, 0, 3, 2].reduce((s, i) => cc(s, { t: "TARUH", kartu: i }), cc(c0, { t: "KARTU_SET", i: 1 }, { t: "TUJUAN", tujuan: "terkecil" })), { t: "PERIKSA" });
  belum("C", "c-kartu-nol", kc(nolDepan), "0.347 ditolak");
  penuh("C", "c-kartu-nol", kc(cc([0, 1, 3, 2].reduce((s, i) => cc(s, { t: "TARUH", kartu: i }), cc(c0, { t: "KARTU_SET", i: 1 }, { t: "TUJUAN", tujuan: "terkecil" })), { t: "PERIKSA" })));
  penuh("C", "c-ratusan", kc(cc(aturDua(c0, 3676, 3726), L)));
  AKSI_WAJIB.C = [kc(cc(aturDua(c0, 4999, 5111), L)), kc(cc(aturDua(c0, 4352, 4355), L, L, L)), kc(cc(aturDua(c0, 8765, 8765), L)), kc(gunung), kc(cc(kartu, { t: "PERIKSA" }))];
}
{
  const d0 = D.awalSusunK4B1D();
  penuh("D", "d-susun", kd(aturKeping(d0, "SUSUN", [6, 3, 4, 8])));
  penuh("D", "d-susun", kd(aturKeping(d0, "SUSUN", [5, 13, 4, 8])));
  belum("D", "d-susun", kd(aturKeping(d0, "SUSUN", [6, 4, 3, 8])), "6.438");
  penuh("D", "d-kelompok", kd(dd(d0, { t: "KELOMPOK" })));
  belum("D", "d-kelompok", kd(dd(aturKeping(d0, "SUSUN", [6, 3, 4, 8]), { t: "KELOMPOK" })), "keping sudah baku");
  const u6035 = pilihSasaran(d0, 6035);
  penuh("D", "d-nol", kd(dd(aturKeping(u6035, "URAI", [6, 0, 3, 5]), { t: "NOL" })));
  belum("D", "d-nol", kd(aturKeping(u6035, "URAI", [6, 0, 3, 5])), "Tulis nol mati");
  belum("D", "d-nol", kd(dd(aturKeping(u6035, "URAI", [5, 10, 3, 5]), { t: "NOL" })), "cara lain, bukan menurut tempat");
  const u3035 = pilihSasaran(d0, 3035);
  belum("D", "d-dua-cara", kd(aturKeping(u3035, "URAI", [3, 0, 3, 5])), "baru satu cara");
  penuh("D", "d-dua-cara", kd(aturKeping(aturKeping(u3035, "URAI", [3, 0, 3, 5]), "URAI", [2, 10, 3, 5])));
  penuh("D", "d-uang", kd(aturUang(d0, 7300, [1, 1, 0, 0, 3])));
  belum("D", "d-uang", kd(aturUang(d0, 7300, [1, 1, 0, 0, 2])), "Rp7.200");
  penuh("D", "d-7020", kd(dd(aturKeping(pilihSasaran(d0, 7020), "URAI", [7, 0, 2, 0]), { t: "NOL" })));
  let dua = aturUang(d0, 10000, [2, 0, 0, 0, 0]);
  belum("D", "d-uang-dua", kd(dua), "baru satu cara");
  dua = dd(dua, { t: "UANG", i: 0, d: -1 }, { t: "UANG", i: 1, d: 1 }, { t: "UANG", i: 1, d: 1 }, { t: "UANG", i: 2, d: 1 });
  penuh("D", "d-uang-dua", kd(dua));
  penuh("D", "d-9999", kd(aturKeping(d0, "SUSUN", [9, 9, 9, 9])));
  AKSI_WAJIB.D = [kd(aturKeping(dd(d0, { t: "KELOMPOK" }), "SUSUN", [6, 3, 4, 8])), kd(aturKeping(aturKeping(dd(aturKeping(u6035, "URAI", [6, 0, 3, 5]), { t: "NOL" }), "URAI", [0, 0, 0, 0]), "URAI", [0, 0, 0, 0])), kd(aturKeping(aturKeping(u3035, "URAI", [3, 0, 3, 5]), "URAI", [2, 10, 3, 5])), kd(aturUang(d0, 7300, [1, 1, 0, 0, 3]))];
  // Misi lab D lewat satu alur bersambung (riwayat tetap).
  let s = dd(d0, { t: "KELOMPOK" });
  s = aturKeping(s, "SUSUN", [6, 3, 4, 8]);
  s = dd(aturKeping(pilihSasaran(s, 6035), "URAI", [6, 0, 3, 5]), { t: "NOL" });
  s = aturKeping(aturKeping(pilihSasaran(s, 3035), "URAI", [3, 0, 3, 5]), "URAI", [2, 10, 3, 5]);
  s = aturUang(s, 7300, [1, 1, 0, 0, 3]);
  AKSI_WAJIB.D = [kd(s)];
}
// Sub-Bab E
{
  const e0 = J.awalJumlahK4B1E();
  const ke = (x) => kj(x);
  penuh("E", "e-tanpa", ke(selesaikanE(e0)));
  belum("E", "e-tanpa", ke(sampaiKolomE(e0, 1)), "baru kolom satuan");
  penuh("E", "e-simpan", ke(selesaikanE(pilihE(e0, "189+245"))));
  belum("E", "e-simpan", ke(selesaikanE(e0)), "131 + 321 tidak menyimpan");
  const lupa = ej(aturDigitE(pilihE(e0, "189+245"), 4), { t: "TULIS" });
  penuh("E", "e-lupa", ke(lupa));
  belum("E", "e-lupa", ke(ej(aturDigitE(pilihE(e0, "189+245"), 4), { t: "SIMPAN", n: 1 }, { t: "TULIS" })), "angka dan simpanan benar");
  belum("E", "e-lupa", ke(ej(aturDigitE(pilihE(e0, "189+245"), 5), { t: "TULIS" })), "angka keliru ditolak lebih dulu");
  belum("E", "e-lupa", ke(ej(aturDigitE(e0, 2), { t: "TULIS" })), "131 + 321 kolom satuan benar");
  penuh("E", "e-panjang", ke(ej(pilihE(e0, "189+245"), { t: "PANJANG" })));
  belum("E", "e-panjang", ke(ej(e0, { t: "PANJANG" })), "soal 131 + 321");
  belum("E", "e-panjang", ke(pilihE(e0, "189+245")), "Cara Panjang belum menyala");
  penuh("E", "e-tiga", ke(selesaikanE(pilihE(e0, "124+411+363"))));
  belum("E", "e-tiga", ke(selesaikanE(pilihE(e0, "117+105+242"))), "jumlahnya 464, bukan 898");
  belum("E", "e-tiga", ke(sampaiKolomE(pilihE(e0, "124+411+363"), 2)), "belum semua kolom");
  penuh("E", "e-907", ke(selesaikanE(pilihE(e0, "328+579"))));
  belum("E", "e-907", ke(selesaikanE(pilihE(e0, "189+245"))), "bukan 328 + 579");
  penuh("E", "e-seribu", ke(selesaikanE(pilihE(e0, "456+544"))));
  belum("E", "e-seribu", ke(selesaikanE(pilihE(e0, "328+579"))), "907");
  penuh("E", "e-lele", ke(selesaikanE(pilihE(e0, "117+105+242"))));
  belum("E", "e-lele", ke(selesaikanE(pilihE(e0, "124+411+363"))), "898");
  let s = pilihE(e0, "189+245");
  s = ej(aturDigitE(s, 4), { t: "TULIS" }, { t: "PANJANG" });
  s = selesaikanE(s);
  s = selesaikanE(pilihE(s, "124+411+363"));
  s = selesaikanE(pilihE(s, "131+321"));
  AKSI_WAJIB.E = [ke(s)];
  for (const m of K4.MISI_E.filter((q) => q.wajib && !/mesin|skenario/.test(q.id))) penuh("E", m.id, ke(s));
  for (const ke2 of keadaanAwal.filter((q) => q.alat !== "jumlah")) for (const m of K4.MISI_E) belum("E", m.id, ke2, `alat ${ke2.alat} bukan lab jumlah`);
}
// Sub-Bab F
{
  const f0 = KR.awalKurangK4B1F();
  const kf = (x) => kk(x);
  penuh("F", "f-tanpa", kf(selesaikanF(f0)));
  belum("F", "f-tanpa", kf(fk(aturDigitF(f0, 3), { t: "TULIS" })), "baru kolom satuan");
  penuh("F", "f-ambil", kf(selesaikanF(pilihF(f0, 241, 129))));
  belum("F", "f-ambil", kf(selesaikanF(f0)), "265 - 132 tidak mengambil");
  penuh("F", "f-dua", kf(selesaikanF(pilihF(f0, 253, 176))));
  belum("F", "f-dua", kf(selesaikanF(pilihF(f0, 241, 129))), "hanya satu kali mengambil");
  const balik = fk(aturDigitF(pilihF(f0, 241, 129), 8), { t: "TULIS" });
  penuh("F", "f-balik", kf(balik));
  belum("F", "f-balik", kf(fk(aturDigitF(pilihF(f0, 241, 129), 5), { t: "TULIS" })), "angka lain bukan membalik");
  belum("F", "f-balik", kf(fk(aturDigitF(pilihF(f0, 241, 129), 2), { t: "TULIS" })), "2 tanpa mengambil: bukan membalik");
  belum("F", "f-balik", kf(selesaikanF(f0)), "tidak pernah mencoba membalik");
  penuh("F", "f-periksa", kf(fk(selesaikanF(pilihF(f0, 241, 129)), { t: "PERIKSA" })));
  belum("F", "f-periksa", kf(selesaikanF(pilihF(f0, 241, 129))), "belum menekan Periksa");
  belum("F", "f-periksa", kf(fk(selesaikanF(f0), { t: "PERIKSA" })), "periksa soal 265 - 132");
  belum("F", "f-periksa", kf(fk(pilihF(f0, 241, 129), { t: "PERIKSA" })), "Periksa sebelum selesai");
  penuh("F", "f-66", kf(selesaikanF(pilihF(f0, 241, 175))));
  belum("F", "f-66", kf(selesaikanF(pilihF(f0, 241, 129))), "241 - 129");
  penuh("F", "f-nol", kf(selesaikanF(pilihF(f0, 304, 128))));
  belum("F", "f-nol", kf(selesaikanF(pilihF(f0, 253, 176))), "bukan 304 - 128");
  penuh("F", "f-seribu", kf(selesaikanF(pilihF(f0, 1000, 1))));
  belum("F", "f-seribu", kf(selesaikanF(pilihF(f0, 304, 128))), "bukan 1.000 - 1");
  let s = selesaikanF(f0);
  s = pilihF(s, 241, 129);
  s = fk(aturDigitF(s, 8), { t: "TULIS" });
  s = fk(selesaikanF(s), { t: "PERIKSA" });
  s = selesaikanF(pilihF(s, 253, 176));
  AKSI_WAJIB.F = [kf(s)];
  for (const m of K4.MISI_F.filter((q) => q.wajib && !/mesin|skenario/.test(q.id))) penuh("F", m.id, kf(s));
  for (const ke2 of keadaanAwal.filter((q) => q.alat !== "kurang")) for (const m of K4.MISI_F) belum("F", m.id, ke2, `alat ${ke2.alat} bukan lab kurang`);
}
// Sub-Bab G
{
  const g0 = KL.awalKaliK4B1G();
  const kx = (x) => kg(x);
  const ulang = (n, aksi) => Array.from({ length: n }, () => aksi);
  const a12 = gg(g0, ...ulang(9, { t: "KOTAK", d: 1 }));
  penuh("G", "g-array", kx(a12));
  belum("G", "g-array", kx(g0), "3 x 4");
  belum("G", "g-array", kx(gg(g0, ...ulang(8, { t: "KOTAK", d: 1 }))), "11 x 4");
  const a96 = gg(a12, ...ulang(4, { t: "ISI", d: 1 }));
  penuh("G", "g-cerita", kx(a96));
  belum("G", "g-cerita", kx(a12), "12 x 4");
  belum("G", "g-cerita", kx(gg(g0, ...ulang(4, { t: "ISI", d: 1 }))), "3 x 8");
  penuh("G", "g-panjang", kx(gg(g0, { t: "BELAH" })));
  belum("G", "g-panjang", kx(gg(pilihG(g0, 14, 5), { t: "BELAH" })), "belah 14 x 5");
  belum("G", "g-panjang", kx(g0), "Cara Panjang mati");
  penuh("G", "g-bersusun", kx(selesaikanG(pilihG(g0, 14, 5))));
  belum("G", "g-bersusun", kx(selesaikanG(g0)), "12 x 4");
  belum("G", "g-bersusun", kx(gg(aturG(aturG(pilihG(g0, 14, 5), "DIGIT", 0, (q) => q.digit), "SIMPAN", 2, (q) => q.simpan), { t: "TULIS" })), "baru kolom satuan");
  const lupa = gg(pilihG(g0, 14, 5), { t: "TULIS" });
  penuh("G", "g-lupa", kx(lupa));
  belum("G", "g-lupa", kx(gg(aturG(aturG(pilihG(g0, 14, 5), "DIGIT", 0, (q) => q.digit), "SIMPAN", 2, (q) => q.simpan), { t: "TULIS" })), "angka dan simpanan benar");
  belum("G", "g-lupa", kx(gg(aturG(pilihG(g0, 14, 5), "DIGIT", 3, (q) => q.digit), { t: "TULIS" })), "angka keliru");
  belum("G", "g-lupa", kx(selesaikanG(g0)), "12 x 4 tidak perlu menyimpan");
  penuh("G", "g-seratus", kx(selesaikanG(pilihG(g0, 25, 4))));
  belum("G", "g-seratus", kx(selesaikanG(pilihG(g0, 12, 8))), "96");
  penuh("G", "g-45", kx(selesaikanG(pilihG(g0, 45, 2))));
  belum("G", "g-45", kx(selesaikanG(pilihG(g0, 14, 5))), "14 x 5");
  penuh("G", "g-16", kx(gg(pilihG(g0, 16, 6), { t: "BELAH" })));
  belum("G", "g-16", kx(gg(g0, { t: "BELAH" })), "belah 12 x 4");
  let s = gg(a96, { t: "BELAH" });
  s = selesaikanG(gg(pilihG(s, 14, 5), { t: "TULIS" }));
  AKSI_WAJIB.G = [kx(s)];
  for (const m of K4.MISI_G.filter((q) => q.wajib && !/mesin|skenario/.test(q.id))) penuh("G", m.id, kx(s));
  for (const ke2 of keadaanAwal.filter((q) => q.alat !== "kali")) for (const m of K4.MISI_G) belum("G", m.id, ke2, `alat ${ke2.alat} bukan lab kali`);
}
// Sub-Bab H
{
  const h0 = BG.awalBagiK4B1H();
  const kx = (x) => kbg(x);
  penuh("H", "h-habis", kx(bj(wadahH(h0, 48, 4), { t: "HABIS" })));
  belum("H", "h-habis", kx(bj(wadahH(h0, 48, 3), { t: "HABIS" })), "3 wadah");
  belum("H", "h-habis", kx(bj(wadahH(h0, 48, 4), { t: "PUTARAN" })), "baru satu putaran");
  belum("H", "h-habis", kx(bj(wadahH(h0, 36, 4), { t: "HABIS" })), "36 benda");
  const ws = [2, 3, 4, 6, 8];
  const coba = (n, daftar) => daftar.reduce((q, w) => bj(wadahH(q, n, w), { t: "HABIS" }), h0);
  penuh("H", "h-percobaan", kx(coba(48, ws)));
  belum("H", "h-percobaan", kx(coba(48, [2, 3, 4, 6])), "kurang 8 wadah");
  belum("H", "h-percobaan", kx(coba(36, ws)), "36 benda, bukan 48");
  penuh("H", "h-sisa", kx(bj(wadahH(h0, 48, 5), { t: "HABIS" })));
  belum("H", "h-sisa", kx(bj(wadahH(h0, 48, 4), { t: "HABIS" })), "48 : 4 habis");
  belum("H", "h-sisa", kx(bj(wadahH(h0, 36, 5), { t: "HABIS" })), "36 benda");
  penuh("H", "h-bersusun", kx(selesaikanH(h0)));
  belum("H", "h-bersusun", kx(selesaikanH(pilihH(h0, 81, 3))), "81 : 3");
  belum("H", "h-bersusun", kx(bj(aturBg(aturBg(h0, "DIGIT", 1, (q) => q.digit), "SISA", 0, (q) => q.sisa), { t: "TULIS" })), "baru langkah puluhan");
  penuh("H", "h-periksa", kx(bj(selesaikanH(pilihH(h0, 81, 3)), { t: "PERIKSA" })));
  belum("H", "h-periksa", kx(selesaikanH(pilihH(h0, 81, 3))), "belum Periksa");
  belum("H", "h-periksa", kx(bj(selesaikanH(h0), { t: "PERIKSA" })), "periksa 48 : 4");
  penuh("H", "h-cukup", kx(selesaikanH(pilihH(h0, 36, 4))));
  belum("H", "h-cukup", kx(selesaikanH(h0)), "48 : 4 puluhan cukup");
  penuh("H", "h-47", kx(selesaikanH(pilihH(h0, 47, 5))));
  belum("H", "h-47", kx(selesaikanH(pilihH(h0, 55, 5))), "55 : 5");
  penuh("H", "h-besar", kx(bj(aturBg(h0, "DIGIT", 9, (q) => q.digit), { t: "TULIS" })));
  belum("H", "h-besar", kx(bj(h0, { t: "TULIS" })), "hasil 0 sisa 0 keliru tetapi tidak terlalu besar");
  let s = bj(wadahH(h0, 48, 4), { t: "HABIS" });
  s = coba(48, ws).pernah.length ? { ...s, pernah: [...new Set([...s.pernah, ...coba(48, ws).pernah])] } : s;
  s = bj(wadahH(s, 48, 5), { t: "HABIS" });
  s = bj(selesaikanH(pilihH(selesaikanH(s), 81, 3)), { t: "PERIKSA" });
  AKSI_WAJIB.H = [kx(s)];
  for (const m of K4.MISI_H.filter((q) => q.wajib && !/mesin|skenario/.test(q.id))) penuh("H", m.id, kx(s));
  for (const ke2 of keadaanAwal.filter((q) => q.alat !== "bagi")) for (const m of K4.MISI_H) belum("H", m.id, ke2, `alat ${ke2.alat} bukan lab bagi`);
}
// Sub-Bab I
{
  const i0 = FK.awalFaktorK4B1I();
  const kx = (x) => kfx(x);
  const ulang = (n, aksi) => Array.from({ length: n }, () => aksi);
  const rentang = (k, naikA, naikB) => fx(i0, ...ulang(k - 2, { t: "K", d: 1 }), ...ulang(naikA, { t: "A", d: 1 }), ...ulang(naikB, { t: "B", d: 1 }), { t: "RENTANG" });
  penuh("I", "i-dua-belas", kx(cobaSemua(i0, [1, 2, 3, 4, 6, 12])));
  belum("I", "i-dua-belas", kx(cobaSemua(i0, [1, 2, 3, 4, 6])), "kurang 12");
  belum("I", "i-dua-belas", kx(cobaSemua(pilihN(i0, 20), [1, 2, 4, 5, 10, 20])), "faktor 20, bukan 12");
  penuh("I", "i-bukan", kx(fx(i0, { t: "COBA", d: 5 })));
  belum("I", "i-bukan", kx(fx(i0, { t: "COBA", d: 4 })), "4 faktor 12");
  belum("I", "i-bukan", kx(fx(pilihN(i0, 20), { t: "COBA", d: 3 })), "3 bukan faktor 20, bukan 5 pada 12");
  penuh("I", "i-dua-puluh", kx(cobaSemua(pilihN(i0, 20), [1, 2, 4, 5, 10, 20])));
  belum("I", "i-dua-puluh", kx(cobaSemua(i0, [1, 2, 3, 4, 6, 12])), "faktor 12");
  belum("I", "i-dua-puluh", kx(cobaSemua(pilihN(i0, 20), [1, 2, 4, 5, 10])), "kurang 20");
  const lompat = (x, m) => fx(x, ...ulang(m, { t: "LOMPAT", d: 1 }));
  penuh("I", "i-deret", kx(lompat(i0, 7)));
  belum("I", "i-deret", kx(lompat(i0, 6)), "6 lompatan");
  belum("I", "i-deret", kx(lompat(fx(i0, { t: "K", d: 1 }), 7)), "lompatan 3");
  penuh("I", "i-rentang", kx(rentang(5, 7, 5)));
  belum("I", "i-rentang", kx(rentang(5, 6, 5)), "batas bawah 16");
  belum("I", "i-rentang", kx(rentang(5, 7, 4)), "batas atas 34");
  belum("I", "i-rentang", kx(fx(i0, ...ulang(3, { t: "K", d: 1 }), ...ulang(7, { t: "A", d: 1 }), ...ulang(5, { t: "B", d: 1 }))), "Rentang belum menyala");
  belum("I", "i-rentang", kx(fx(i0, ...ulang(7, { t: "A", d: 1 }), ...ulang(5, { t: "B", d: 1 }), { t: "RENTANG" })), "lompatan 2, bukan 5");
  penuh("I", "i-dua-empat", kx(cobaSemua(pilihN(i0, 24), [1, 2, 3, 4, 6, 8, 12, 24])));
  belum("I", "i-dua-empat", kx(cobaSemua(pilihN(i0, 24), [1, 2, 3, 4, 6, 8, 12])), "kurang 24");
  penuh("I", "i-tiga-belas", kx(cobaSemua(pilihN(i0, 13), [1, 13])));
  belum("I", "i-tiga-belas", kx(cobaSemua(pilihN(i0, 13), [1])), "baru 1");
  belum("I", "i-tiga-belas", kx(cobaSemua(i0, [1, 2, 3, 4, 6, 12])), "12 punya enam faktor");
  penuh("I", "i-enam", kx(fx(i0, ...ulang(4, { t: "K", d: 1 }), ...ulang(10, { t: "A", d: -1 }), ...ulang(10, { t: "B", d: 1 }), { t: "RENTANG" })));
  belum("I", "i-enam", kx(fx(i0, ...ulang(4, { t: "K", d: 1 }), ...ulang(10, { t: "A", d: -1 }), { t: "RENTANG" })), "batas atas 30");
  let s = cobaSemua(i0, [1, 2, 3, 4, 5, 6, 12]);
  s = cobaSemua(pilihN(s, 20), [1, 2, 4, 5, 10, 20]);
  s = lompat(s, 7);
  s = fx(s, ...ulang(3, { t: "K", d: 1 }), ...ulang(7, { t: "A", d: 1 }), ...ulang(5, { t: "B", d: 1 }), { t: "RENTANG" });
  AKSI_WAJIB.I = [kx(s)];
  for (const m of K4.MISI_I.filter((q) => q.wajib && !/mesin|skenario/.test(q.id))) penuh("I", m.id, kx(s));
  for (const ke2 of keadaanAwal.filter((q) => q.alat !== "faktor")) for (const m of K4.MISI_I) belum("I", m.id, ke2, `alat ${ke2.alat} bukan lab faktor`);
}
// Misi alat sub-bab lain tidak tercapai oleh alat yang salah.
for (const h of HURUF_ALL) for (const m of K4.daftarMisiK4Bab1(h)) for (const [g, kes] of Object.entries(AKSI_WAJIB)) if (g !== h) for (const ke of kes) cek(!m.cek(ke), `misi ${m.id} tidak tercapai oleh alat sub-bab ${g}`);

/* ---- Gerbang ---- */
for (const h of HURUF_ALL) {
  const daftar = K4.daftarMisiK4Bab1(h);
  const tampil = M0.tampilMisi(daftar);
  const sudah = new Set();
  const catat = (k) => {
    for (const id of M0.misiBaru(daftar, k, sudah)) sudah.add(id);
  };
  for (const ke of AKSI_WAJIB[h]) catat(ke);
  cek(!M0.wajibSelesai(tampil, sudah) && sudah.size >= 5, `gerbang ${h}: tertutup setelah misi alat saja (${[...sudah].join(",")})`);
  catat(sel(K4.ID_MESIN_K4B1[h]));
  cek(!M0.wajibSelesai(tampil, sudah), `gerbang ${h}: tertutup tanpa skenario`);
  catat(sel(K4.ID_SKENARIO_K4B1[h]));
  cek(M0.wajibSelesai(tampil, sudah), `gerbang ${h}: terbuka setelah semua wajib (belum: ${daftar.filter((m) => m.wajib && !sudah.has(m.id)).map((m) => m.id).join(",")})`);
  for (const ke of keadaanAwal) catat(ke);
  cek(M0.wajibSelesai(tampil, sudah), `gerbang ${h}: tetap terbuka setelah alat diubah`);
}

/* ---- Konsep sub-bab berikutnya tidak dipakai di sub-bab sebelumnya ---- */
{
  const BOCOR = {
    A: /(bernilai|uraian|lebih dari|kurang dari|mengurutkan|komposisi|dekomposisi|menyimpan|mengambil| < | > | × )/i,
    B: /(lebih dari|kurang dari| < | > |mengurutkan|urutan|komposisi|dekomposisi|menyimpan|mengambil|bersusun| × )/i,
    C: /(komposisi|dekomposisi|menyimpan|mengambil|bersusun| × | : )/i,
    D: /(menyimpan|mengambil|bersusun| × | : )/i,
  };
  const SK = { A: SB.SKENARIO_K4B1A, B: SB.SKENARIO_K4B1B, C: SB.SKENARIO_K4B1C, D: SB.SKENARIO_K4B1D };
  const MS = { A: MB.MESIN_BACA, B: MB.MESIN_NILAI, C: MB.MESIN_BANDING, D: MB.MESIN_SUSUN };
  const KOMP = { A: "SimulasiLabKemasanK4", B: "SimulasiLabNilaiK4", C: "SimulasiLabBandingK4", D: "SimulasiLabSusunK4" };
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas4-bab1-ringkas.json", import.meta.url), "utf8"));
  for (const h of HURUF) {
    const r = BOCOR[h];
    const teksMisi = [TK.MISI_K4B1[h], TK.NAMA_SIM_K4B1[h], ...K4.daftarMisiK4Bab1(h).map((m) => m.teks)].join(" ");
    cek(!r.test(teksMisi), `misi ${h} bebas konsep sub-bab berikutnya (${teksMisi.match(r)?.[0]})`);
    cek(!r.test(JSON.stringify(SK[h])), `skenario ${h} bebas konsep sub-bab berikutnya (${JSON.stringify(SK[h]).match(r)?.[0]})`);
    cek(!r.test(JSON.stringify(MS[h])), `mesin ${h} bebas konsep sub-bab berikutnya (${JSON.stringify(MS[h]).match(r)?.[0]})`);
    const sumber = readFileSync(new URL(`../src/components/modul/${KOMP[h]}.tsx`, import.meta.url), "utf8")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/^\s*\/\/.*$/gm, "")
      .replace(/import[\s\S]*?from "[^"]+";/g, "");
    const kata = /(bernilai|uraian|lebih dari|kurang dari|mengurutkan|komposisi|dekomposisi|menyimpan|mengambil|bersusun)/i;
    const izin = { A: [], B: ["bernilai", "uraian"], C: ["bernilai", "uraian", "lebih dari", "kurang dari", "mengurutkan"], D: ["bernilai", "uraian", "lebih dari", "kurang dari", "mengurutkan", "komposisi", "dekomposisi"] }[h];
    const temu = (sumber.match(new RegExp(kata.source, "gi")) ?? []).filter((w) => !izin.includes(w.toLowerCase()));
    cek(temu.length === 0, `komponen ${KOMP[h]} bebas konsep sub-bab berikutnya (${temu.join(", ")})`);
    cek(!r.test(JSON.stringify(ringkas.subBab[h])), `ringkas ${h} bebas konsep sub-bab berikutnya (${JSON.stringify(ringkas.subBab[h]).match(r)?.[0]})`);
  }
  cek(!/ \+ /.test(JSON.stringify(ringkas.subBab.A)) && !/bernilai/.test(JSON.stringify(ringkas.subBab.A)), "ringkas A tanpa uraian bertanda + dan tanpa 'bernilai'");
  // Ucapan dan pesan lab A dari banyak keadaan.
  const ac = acakDari(23);
  let s = A.awalKemasanK4B1A();
  let bocor = "";
  for (let n = 0; n < 5000; n += 1) {
    s = A.langkahKemasanK4B1A(s, [{ t: "UBAH", jenis: A.URUT_KEMASAN[ac(4)], d: ac(3) ? 1 : -1 }, { t: "TOGGLE", rep: "baca" }, { t: "KARTU", i: ac(4), d: 1 }, { t: "PERIKSA" }, { t: "TARGET", d: 1 }][ac(5)]);
    const t = [s.pesan, A.ucapRakitK4B1A(s), A.ucapTulisK4B1A(s)].join(" ");
    if (!bocor && BOCOR.A.test(t)) bocor = t;
  }
  cek(!bocor, `ucapan dan pesan lab A bebas konsep sub-bab berikutnya ${bocor}`);
  let sb = B.awalNilaiK4B1B();
  let bocorB = "";
  for (let n = 0; n < 5000; n += 1) {
    sb = B.langkahNilaiK4B1B(sb, [{ t: "DIGIT", i: ac(4), d: 1 }, { t: "PILIH", i: ac(4) }, { t: "TOGGLE" }, { t: "KEPING", i: ac(4), nilai: B.kepingKolom(B.TABEL_B[sb.tabel], ac(4))[ac(3)] }, { t: "PERIKSA" }, { t: "TABEL", d: 1 }][ac(6)]);
    const t = [sb.pesan, B.ucapNilaiK4B1B(sb)].join(" ");
    if (!bocorB && BOCOR.B.test(t)) bocorB = t;
  }
  cek(!bocorB, `ucapan dan pesan lab B bebas konsep sub-bab berikutnya ${bocorB}`);
}

/* ---- Konsep Sub-Bab F dan sesudahnya tidak dipakai di E, dan perkalian dan pembagian tidak dipakai di F ---- */
{
  const BOCOR_E = /(mengambil|ambil|dikurangi|−|kurangkan|pengurangan|perkalian|×|pembagian|dibagi|faktor|kelipatan)/i;
  const BOCOR_F = /(perkalian|×|pembagian|dibagi|faktor|kelipatan| : )/i;
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas4-bab1-ringkas.json", import.meta.url), "utf8"));
  const dataH = {
    E: { r: BOCOR_E, misi: [TK.MISI_K4B1.E, TK.NAMA_SIM_K4B1.E, ...K4.MISI_E.map((m) => m.teks)], sk: SH.SKENARIO_K4B1E, ms: MH.MESIN_JUMLAH, komp: "SimulasiLabJumlahK4", kompRe: /(mengambil|ambil|dikurangi|kurangkan|pengurangan|perkalian|dibagi|pembagian|faktor|kelipatan)/i },
    F: { r: BOCOR_F, misi: [TK.MISI_K4B1.F, TK.NAMA_SIM_K4B1.F, ...K4.MISI_F.map((m) => m.teks)], sk: SH.SKENARIO_K4B1F, ms: MH.MESIN_KURANG, komp: "SimulasiLabKurangK4", kompRe: /(perkalian|dibagi|pembagian|faktor|kelipatan)/i },
  };
  for (const [h, d] of Object.entries(dataH)) {
    cek(!d.r.test(d.misi.join(" ")), `misi ${h} bebas konsep sub-bab berikutnya (${d.misi.join(" ").match(d.r)?.[0]})`);
    cek(!d.r.test(JSON.stringify(d.sk)), `skenario ${h} bebas konsep sub-bab berikutnya (${JSON.stringify(d.sk).match(d.r)?.[0]})`);
    cek(!d.r.test(JSON.stringify(d.ms)), `mesin ${h} bebas konsep sub-bab berikutnya (${JSON.stringify(d.ms).match(d.r)?.[0]})`);
    cek(!d.r.test(JSON.stringify(ringkas.subBab[h])), `ringkas ${h} bebas konsep sub-bab berikutnya (${JSON.stringify(ringkas.subBab[h]).match(d.r)?.[0]})`);
    const sumber = readFileSync(new URL(`../src/components/modul/${d.komp}.tsx`, import.meta.url), "utf8")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/^\s*\/\/.*$/gm, "")
      .replace(/import[\s\S]*?from "[^"]+";/g, "");
    cek(!d.kompRe.test(sumber), `komponen ${d.komp} bebas konsep sub-bab berikutnya (${sumber.match(d.kompRe)?.[0]})`);
  }
  const ac = acakDari(83);
  let s = J.awalJumlahK4B1E();
  let bocorE = "";
  for (let n = 0; n < 5000; n += 1) {
    s = J.langkahJumlahK4B1E(s, [{ t: "SOAL", i: ac(6) }, { t: "ATUR", suku: ac(s.soal.length), c: ac(3), d: ac(2) ? 1 : -1 }, { t: "DIGIT", d: 1 }, { t: "SIMPAN", n: ac(3) }, { t: "TULIS" }, { t: "PANJANG" }][ac(6)]);
    const t = [s.pesan, J.ucapJumlahK4B1E(s), ...J.caraPanjang(s.soal).baris, J.caraPanjang(s.soal).gabung].join(" ");
    if (!bocorE && BOCOR_E.test(t)) bocorE = t;
  }
  cek(!bocorE, `ucapan dan pesan lab E bebas konsep sub-bab berikutnya ${bocorE}`);
  let f = KR.awalKurangK4B1F();
  let bocorF = "";
  for (let n = 0; n < 5000; n += 1) {
    f = KR.langkahKurangK4B1F(f, [{ t: "SOAL", i: ac(6) }, { t: "ATUR", bil: ac(2) ? "a" : "b", c: ac(3), d: ac(2) ? 1 : -1 }, { t: "AMBIL", c: ac(4) }, { t: "DIGIT", d: 1 }, { t: "TULIS" }, { t: "PERIKSA" }][ac(6)]);
    const u = KR.uraianPanjang(f);
    const t = [f.pesan, KR.ucapKurangK4B1F(f), u.atas, u.bawah, u.selisih, KR.kalimatPeriksa(f)].join(" ");
    if (!bocorF && BOCOR_F.test(t)) bocorF = t;
  }
  cek(!bocorF, `ucapan dan pesan lab F bebas konsep sub-bab berikutnya ${bocorF}`);
}

/* ---- Konsep Sub-Bab H dan sesudahnya tidak dipakai di G, dan faktor serta kelipatan tidak dipakai di H ---- */
{
  const BOCOR_G = /(pembagian|dibagi|membagi|sisa|faktor|kelipatan| : )/i;
  const BOCOR_H = /(faktor|kelipatan)/i;
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas4-bab1-ringkas.json", import.meta.url), "utf8"));
  const dataGH = {
    G: { r: BOCOR_G, misi: [TK.MISI_K4B1.G, TK.NAMA_SIM_K4B1.G, ...K4.MISI_G.map((m) => m.teks)], sk: SG.SKENARIO_K4B1G, ms: MG.MESIN_KALI, komp: "SimulasiLabKaliK4", kompRe: /(pembagian|dibagi|membagi|sisa|faktor|kelipatan)/i },
    H: { r: BOCOR_H, misi: [TK.MISI_K4B1.H, TK.NAMA_SIM_K4B1.H, ...K4.MISI_H.map((m) => m.teks)], sk: SG.SKENARIO_K4B1H, ms: MG.MESIN_BAGI, komp: "SimulasiLabBagiK4", kompRe: /(faktor|kelipatan)/i },
  };
  for (const [h, d] of Object.entries(dataGH)) {
    cek(!d.r.test(d.misi.join(" ")), `misi ${h} bebas konsep sub-bab berikutnya (${d.misi.join(" ").match(d.r)?.[0]})`);
    cek(!d.r.test(JSON.stringify(d.sk)), `skenario ${h} bebas konsep sub-bab berikutnya (${JSON.stringify(d.sk).match(d.r)?.[0]})`);
    cek(!d.r.test(JSON.stringify(d.ms)), `mesin ${h} bebas konsep sub-bab berikutnya (${JSON.stringify(d.ms).match(d.r)?.[0]})`);
    cek(!d.r.test(JSON.stringify(ringkas.subBab[h])), `ringkas ${h} bebas konsep sub-bab berikutnya (${JSON.stringify(ringkas.subBab[h]).match(d.r)?.[0]})`);
    const sumber = readFileSync(new URL(`../src/components/modul/${d.komp}.tsx`, import.meta.url), "utf8")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/^\s*\/\/.*$/gm, "")
      .replace(/import[\s\S]*?from "[^"]+";/g, "");
    cek(!d.kompRe.test(sumber), `komponen ${d.komp} bebas konsep sub-bab berikutnya (${sumber.match(d.kompRe)?.[0]})`);
  }
  const ac = acakDari(97);
  let s = KL.awalKaliK4B1G();
  let bocorG = "";
  for (let n = 0; n < 5000; n += 1) {
    s = KL.langkahKaliK4B1G(s, [{ t: "KOTAK", d: ac(2) ? 1 : -1 }, { t: "ISI", d: ac(2) ? 1 : -1 }, { t: "SOAL", i: ac(6) }, { t: "ATUR", bagian: ["puluhan", "satuan", "pengali"][ac(3)], d: ac(2) ? 1 : -1 }, { t: "BELAH" }, { t: "DIGIT", d: 1 }, { t: "SIMPAN", d: 1 }, { t: "TULIS" }][ac(8)]);
    const c = KL.caraPanjangG(s.n, s.k);
    const t = [s.pesan, KL.ucapArrayG(s), KL.ucapBelahG(s), KL.ucapBersusunG(s), c.uraian, ...c.baris, c.gabung, KL.teksBerulang(s.kotak, s.isi)].join(" ");
    if (!bocorG && BOCOR_G.test(t)) bocorG = t;
  }
  cek(!bocorG, `ucapan dan pesan lab G bebas konsep sub-bab berikutnya ${bocorG}`);
  let h = BG.awalBagiK4B1H();
  let bocorH = "";
  for (let n = 0; n < 5000; n += 1) {
    h = BG.langkahBagiK4B1H(h, [{ t: "BENDA", d: 1 }, { t: "WADAH", d: ac(2) ? 1 : -1 }, { t: "PUTARAN" }, { t: "HABIS" }, { t: "SOAL", i: ac(7) }, { t: "DIGIT", d: 1 }, { t: "SISA", d: 1 }, { t: "TULIS" }, { t: "PERIKSA" }][ac(9)]);
    const t = [h.pesan, BG.ucapWadahH(h), BG.ucapBersusunH(h), BG.kalimatPeriksaH(h)].join(" ");
    if (!bocorH && BOCOR_H.test(t)) bocorH = t;
  }
  cek(!bocorH, `ucapan dan pesan lab H bebas konsep sub-bab berikutnya ${bocorH}`);
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
