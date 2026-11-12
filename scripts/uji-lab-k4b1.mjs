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

/* ------------------------------ Misi ------------------------------ */
const keadaanAwal = [ka(A.awalKemasanK4B1A()), kb(B.awalNilaiK4B1B()), kc(C.awalBandingK4B1C()), kd(D.awalSusunK4B1D())];
const SEMUA_ID = [...Object.values(K4.ID_MESIN_K4B1), ...Object.values(K4.ID_SKENARIO_K4B1), "x", "mesin-urut"];
const HURUF = ["A", "B", "C", "D"];
for (const h of HURUF) {
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
// Misi alat sub-bab lain tidak tercapai oleh alat yang salah.
for (const h of HURUF) for (const m of K4.daftarMisiK4Bab1(h)) for (const [g, kes] of Object.entries(AKSI_WAJIB)) if (g !== h) for (const ke of kes) cek(!m.cek(ke), `misi ${m.id} tidak tercapai oleh alat sub-bab ${g}`);

/* ---- Gerbang ---- */
for (const h of HURUF) {
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

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
