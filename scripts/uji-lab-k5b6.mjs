// Uji Simulasi Kelas 5 Bab 6 (Sudut): Lab Pojok (Sub-Bab A), mesin, skenario, misi, gerbang, data ringkas, pengeja,
// dan konsep sub-bab berikutnya tidak bocor ke Sub-Bab A.
// Jalankan: node --no-warnings scripts/uji-lab-k5b6.mjs
import { readFileSync } from "node:fs";
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K6 from "../src/components/modul/misi-k5bab6.ts";
import * as TK from "../src/components/modul/misi-teks-k5b6.ts";
import * as A from "../src/components/modul/lab-pojok-k5b6a.ts";
import * as MS from "../src/components/modul/mesin-data-k5b6.ts";
import * as SK from "../src/components/modul/skenario-k5b6.ts";
import * as ME from "../src/components/modul/mesin-bertahap-k3b1.ts";
import * as EJ from "../src/components/modul/eja-k5b6.ts";
import * as EJ1 from "../src/components/modul/eja-k5b1.ts";

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
const tanpaAngka = (t) => !/\d/.test(EJ.ejaK5B6(t));
const L = A.langkahPojokK5B6A;
const x0 = A.awalPojokK5B6A();

/* ------------------------------ Hitungan MANDIRI (cara berbeda) ------------------------------ */
// Kode membandingkan ukuran dengan 90. Di sini jenis pojok ditimbang dengan hasil kali titik dua sisi: sisi dasar
// (1, 0) dan sisi kedua (cos, sin). Hasil kali positif berarti lancip, nol siku-siku, negatif tumpul.
const timbang = (deg) => {
  const r = (deg * Math.PI) / 180;
  const dot = Math.round(Math.cos(r) * 1e6) / 1e6;
  return dot === 0 ? "siku" : dot > 0 ? "lancip" : "tumpul";
};
const hitungSiku = (daftar) => {
  let n = 0;
  for (const d of daftar) if (timbang(d) === "siku") n += 1;
  return n;
};
const tanpaSembilanPuluh = (t) => !/\d/.test(String(t).replace(/90/g, ""));
const tanpaUkuran = (t) => !/°|\d{2,}/.test(String(t));

/* ------------------------------ Pengeja ------------------------------ */
{
  sama(EJ.ejaK5B6("90°"), "sembilan puluh derajat", "eja 90 derajat");
  sama(EJ.ejaK5B6("besarnya 90°."), "besarnya sembilan puluh derajat.", "eja 90 derajat sebelum titik");
  sama(EJ.ejaK5B6("∟ = 90°"), "siku-siku sama dengan sembilan puluh derajat", "eja siku-siku dan derajat");
  sama(EJ.ejaK5B6("∠ ABC"), "sudut ABC", "eja sudut");
  sama(EJ.ejaK5B6("45° < 90° < 120°"), "empat puluh lima derajat lebih kecil dari sembilan puluh derajat lebih kecil dari seratus dua puluh derajat", "eja perbandingan derajat");
  sama(EJ.ejaK5B6("180°"), "seratus delapan puluh derajat", "eja 180 derajat");
  sama(EJ.ejaK5B6("16 cm"), "enam belas sentimeter", "eja sentimeter");
  sama(EJ.ejaK5B6("20 m"), "dua puluh meter", "eja meter");
  sama(EJ.ejaK5B6("(5 + 3) × 4 ÷ 2 = 16"), "kurung buka lima ditambah tiga kurung tutup dikali empat dibagi dua sama dengan enam belas", "eja kurung dan tanda hitung");
  sama(EJ.ejaK5B6("isi 15 pojok …"), "isi lima belas pojok titik-titik", "eja pojok dan titik-titik");
  let samaKata = true;
  for (let n = 0; n <= 1200; n += 1) if (EJ.kataK5B6(n) !== EJ1.kataK5B1(n)) samaKata = false;
  cek(samaKata && EJ.kataK5B6(999999) === EJ1.kataK5B1(999999), "kata bilangan sama dengan kataK5B1 (0 sampai 1200 dan 999.999)");
  let semuaKata = true;
  for (let n = 0; n <= 360; n += 1) {
    if (/\d|°/.test(EJ.ejaK5B6(`${n}° dan ${n} cm`))) semuaKata = false;
    if (EJ.ejaK5B6(`${n}°`) !== `${EJ1.kataK5B1(n)} derajat`) semuaKata = false;
  }
  cek(semuaKata, "semua bilangan 0 sampai 360 dengan tanda derajat dieja menjadi kata");
  cek(!/[°∠∟]/.test(EJ.ejaK5B6("° ∠ ∟ 90° ∟ 3 ∠")), "° ∠ ∟ tidak tersisa setelah dieja");
}

/* ------------------------------ Data sama dengan buku ------------------------------ */
{
  const naskah = readFileSync(new URL("../src/components/modul/naskah-k5b6.ts", import.meta.url), "utf8");
  const data = readFileSync(new URL("../src/components/modul/data-k5b6.ts", import.meta.url), "utf8");
  cek(A.SIKU === 90 && /Sudut siku-siku = 90°/.test(data) && /Besar sudut siku-siku\?", jawab: "90°"/.test(data), "patokan siku-siku 90 sama dengan data buku");
  cek(naskah.includes("Right Angle Benchmark") && naskah.includes("Paper Fold Benchmark") && naskah.includes("Angle Detective"), "naskah memuat tiga metode luar Sub-Bab A");
  cek(naskah.includes("Pojok Bingkai Siku") && naskah.includes("Eksplorasi 6.1") && naskah.includes("penggaris siku"), "naskah memuat bingkai, Eksplorasi 6.1, dan penggaris siku");
  cek(/sudut 45° → lancip|45° < 90° → lancip/.test(data) && /120° > 90°/.test(data), "data buku memuat 45 lancip dan 120 tumpul");
}

/* ------------------------------ Lab A: Pojok ------------------------------ */
const ID = /^(lipat:[01]|banding:[0-5]|detektif:[0-5])$/;
{
  cek(x0.pernah.length === 0 && x0.pesan === "" && x0.lipat.langkah === 0 && !x0.banding.tempel && x0.banding.data === 0 && x0.detektif.data === 0, "awal: kosong, belum ada riwayat");
  cek(A.DATA_LIPAT.length === 2 && A.DATA_BANDING.length === 6 && A.DATA_DETEKTIF.length === 6, "dua kertas Lipat, enam pojok Banding, enam pojok Detektif");
  sama(A.DATA_LIPAT.map((d) => d.geser), [10, -5], "geser awal dua kertas sesuai rancangan");
  sama(A.DATA_BANDING.map((d) => [d.nama, d.deg]), [["pojok buku", 90], ["pojok bingkai foto", 90], ["pojok ubin lantai", 90], ["ujung gunting yang terbuka", 40], ["bukaan kipas lipat", 130], ["pojok atap rumah", 110]], "data enam pojok Banding sesuai rancangan");
  sama(A.DATA_DETEKTIF.map((d) => [d.nama, d.deg]), [["pojok buku tulis", 90], ["jarum jam pukul dua", 60], ["pojok jendela", 90], ["bukaan kipas besar", 140], ["pojok meja", 90], ["sandaran tangga", 35]], "data enam pojok Detektif sesuai rancangan");
  cek(A.DATA_LIPAT.every((d) => d.geser !== 0 && Math.abs(d.geser) <= A.GESER_BATAS && d.geser % A.GESER_LANGKAH === 0), "geser awal tidak nol, di dalam batas, kelipatan lima");
  for (const [nama, daftar] of [["Banding", A.DATA_BANDING], ["Detektif", A.DATA_DETEKTIF]]) {
    cek(daftar.every((d) => Number.isInteger(d.deg) && d.deg > 0 && d.deg < 180 && (d.deg === 90 || Math.abs(d.deg - 90) >= 20)), `${nama}: ukuran pojok bulat, di antara 0 dan 180, yang bukan siku-siku berbeda paling sedikit 20 dari siku`);
    cek(new Set(daftar.map((d) => d.nama)).size === daftar.length, `${nama}: nama pojok unik`);
    for (const d of daftar) cek(A.jenisPojok(d.deg) === timbang(d.deg), `${nama} ${d.nama}: jenis sama dengan timbangan hasil kali titik`);
  }
  cek(A.DATA_DETEKTIF.filter((d) => timbang(d.deg) === "siku").length === 3 && A.DATA_DETEKTIF.filter((d) => timbang(d.deg) !== "siku").length === 3, "Detektif: tiga siku-siku dan tiga bukan");
  sama(A.DATA_BANDING.map((d) => timbang(d.deg)), ["siku", "siku", "siku", "lancip", "tumpul", "tumpul"], "Banding: tiga siku, satu lancip, dua tumpul");

  // Lipat.
  for (const [i, d] of A.DATA_LIPAT.entries()) {
    const nama = d.nama;
    const awal = L(x0, { t: "L_DATA", i });
    cek(awal.lipat.data === i && awal.lipat.langkah === 0 && awal.lipat.geser === d.geser && awal.pernah.length === 0, `Lipat ${nama}: data dipilih, mulai dari langkah nol`);
    const duluan = L(awal, { t: "L_LIPAT2" });
    cek(duluan.lipat.langkah === 0 && duluan.pernah.length === 0 && /Lipat pertama dulu/.test(duluan.pesan), `Lipat ${nama}: lipat kedua sebelum lipat pertama ditolak`);
    cek(JSON.stringify(L(awal, { t: "L_GESER", d: 5 }).lipat) === JSON.stringify(awal.lipat), `Lipat ${nama}: geser sebelum lipat pertama diabaikan`);
    const satu = L(awal, { t: "L_LIPAT1" });
    cek(satu.lipat.langkah === 1 && satu.pernah.length === 0, `Lipat ${nama}: lipat pertama membuat langkah satu`);
    sama(L(satu, { t: "L_LIPAT1" }), satu, `Lipat ${nama}: lipat pertama dua kali tidak mengubah`);
    const tolak = L(satu, { t: "L_LIPAT2" });
    cek(tolak.lipat.langkah === 1 && tolak.pernah.length === 0 && /belum berimpit/.test(tolak.pesan), `Lipat ${nama}: lipat kedua tanpa menggeser ditolak`);
    for (const buruk of [0, 1, 3, 10, -7]) sama(L(satu, { t: "L_GESER", d: buruk }).lipat, satu.lipat, `Lipat ${nama}: geser ${buruk} bukan langkah sah diabaikan`);
    // Geser menuju nol: cacah langkah dihitung mandiri.
    const arah = d.geser > 0 ? -5 : 5;
    let langkah = 0;
    let g = d.geser;
    while (g !== 0) {
      g += arah;
      langkah += 1;
    }
    let s = satu;
    for (let n = 1; n <= langkah; n += 1) {
      s = L(s, { t: "L_GESER", d: arah });
      cek(s.lipat.geser === d.geser + arah * n, `Lipat ${nama}: geser ke-${n} menjadi ${d.geser + arah * n}`);
      cek(s.lipat.langkah === 1 && L(s, { t: "L_LIPAT2" }).lipat.langkah === (n === langkah ? 2 : 1), `Lipat ${nama}: lipat kedua hanya sah saat geser nol (geser ke-${n})`);
    }
    cek(/sudah berimpit/.test(s.pesan), `Lipat ${nama}: pesan tepi berimpit di geser nol`);
    const jadi = L(s, { t: "L_LIPAT2" });
    cek(jadi.lipat.langkah === 2 && jadi.pernah.join() === `lipat:${i}` && jadi.pesan.startsWith("✅") && jadi.pesan.includes("90°"), `Lipat ${nama}: lipatan kedua rapi menjadi patokan 90°`);
    sama(L(jadi, { t: "L_GESER", d: 5 }), jadi, `Lipat ${nama}: geser setelah jadi diabaikan`);
    sama(L(jadi, { t: "L_LIPAT2" }), jadi, `Lipat ${nama}: lipat kedua dua kali tidak mengubah`);
    sama(L(jadi, { t: "L_LIPAT1" }), jadi, `Lipat ${nama}: lipat pertama setelah jadi diabaikan`);
    // Melewati nol lalu kembali.
    const lewat = L(s, { t: "L_GESER", d: arah });
    cek(lewat.lipat.geser === arah && L(lewat, { t: "L_LIPAT2" }).pernah.length === 0, `Lipat ${nama}: melewati nol ditolak`);
    // Batas geser.
    let ujung = satu;
    for (let n = 0; n < 8; n += 1) ujung = L(ujung, { t: "L_GESER", d: 5 });
    cek(ujung.lipat.geser === A.GESER_BATAS && /ujung geseran/.test(ujung.pesan), `Lipat ${nama}: geser kanan berhenti di batas ${A.GESER_BATAS}`);
    let ujungKiri = satu;
    for (let n = 0; n < 8; n += 1) ujungKiri = L(ujungKiri, { t: "L_GESER", d: -5 });
    cek(ujungKiri.lipat.geser === -A.GESER_BATAS, `Lipat ${nama}: geser kiri berhenti di batas`);
  }
  sama(L(L(L(x0, { t: "L_LIPAT1" }), { t: "L_DATA", i: 1 }), { t: "L_LIPAT2" }).pernah, [], "Lipat: ganti kertas mengulang dari nol");
  cek(L(x0, { t: "L_DATA", i: 2 }) === x0 && L(x0, { t: "L_DATA", i: -1 }) === x0 && L(x0, { t: "L_DATA", i: 0.5 }) === x0, "Lipat: kertas di luar daftar diabaikan");

  // Banding.
  const letakB = [];
  for (const [i, d] of A.DATA_BANDING.entries()) {
    const nama = d.nama;
    const benar = timbang(d.deg);
    const xb = L(x0, { t: "B_DATA", i });
    cek(xb.banding.data === i && !xb.banding.tempel, `Banding ${nama}: dipilih, belum menempel`);
    for (const j of A.JENIS_POJOK) {
      const s = L(xb, { t: "B_JAWAB", jawab: j });
      cek(s.pernah.length === 0 && /Tempel patokan/.test(s.pesan) && !s.pesan.startsWith("✅"), `Banding ${nama}: jawaban ${j} sebelum menempel ditolak (walau benar)`);
    }
    const t = L(xb, { t: "B_TEMPEL" });
    cek(t.banding.tempel && t.pernah.length === 0, `Banding ${nama}: tempel patokan`);
    sama(L(t, { t: "B_TEMPEL" }), t, `Banding ${nama}: tempel dua kali tidak mengubah`);
    for (const j of ["lancip", "siku", "tumpul"]) {
      const s = L(t, { t: "B_JAWAB", jawab: j });
      const betul = j === benar;
      cek(betul ? s.pernah.join() === `banding:${i}` && s.pesan.startsWith("✅") : s.pernah.length === 0 && !s.pesan.startsWith("✅") && s.banding.tempel, `Banding ${nama}: jawaban ${j} ${betul ? "benar dicatat" : "salah tidak dicatat"}`);
    }
    // Pesan salah menjelaskan hubungan dengan patokan.
    const pesanSalah = ["lancip", "siku", "tumpul"].filter((j) => j !== benar).map((j) => L(t, { t: "B_JAWAB", jawab: j }).pesan);
    cek(new Set(pesanSalah).size === 2 && pesanSalah.every((p) => /patokan/.test(p)), `Banding ${nama}: dua pesan salah berbeda dan menyebut patokan`);
    cek(L(t, { t: "B_JAWAB", jawab: "segitiga" }) === t && L(t, { t: "B_JAWAB", jawab: "" }) === t, `Banding ${nama}: jawaban di luar pilihan diabaikan`);
    // Ganti pojok melepas patokan.
    cek(!L(t, { t: "B_DATA", i: (i + 1) % 6 }).banding.tempel, `Banding ${nama}: ganti pojok melepas patokan`);
    letakB.push(benar);
  }
  cek(L(x0, { t: "B_DATA", i: 6 }) === x0 && L(x0, { t: "B_DATA", i: -1 }) === x0, "Banding: pojok di luar daftar diabaikan");

  // Detektif.
  for (const [i, d] of A.DATA_DETEKTIF.entries()) {
    const nama = d.nama;
    const siku = timbang(d.deg) === "siku";
    const xd = L(x0, { t: "D_DATA", i });
    for (const j of ["siku", "bukan"]) {
      const s = L(xd, { t: "D_JAWAB", jawab: j });
      const betul = (j === "siku") === siku;
      cek(betul ? s.pernah.join() === `detektif:${i}` && s.pesan.startsWith("✅") : s.pernah.length === 0 && !s.pesan.startsWith("✅"), `Detektif ${nama}: jawaban ${j} ${betul ? "benar dicatat" : "salah tidak dicatat"}`);
    }
    cek(L(xd, { t: "D_JAWAB", jawab: "lancip" }) === xd && L(xd, { t: "D_JAWAB", jawab: "tumpul" }) === xd, `Detektif ${nama}: jawaban di luar pilihan diabaikan`);
  }
  cek(L(x0, { t: "D_DATA", i: 6 }) === x0 && L(x0, { t: "D_DATA", i: 1.5 }) === x0, "Detektif: pojok di luar daftar diabaikan");

  // Reset, pesan kosong, riwayat tidak dicabut.
  const banyak = jalan(x0, L, [{ t: "B_DATA", i: 3 }, { t: "B_TEMPEL" }, { t: "B_JAWAB", jawab: "lancip" }, { t: "D_DATA", i: 2 }, { t: "D_JAWAB", jawab: "siku" }]);
  cek(banyak.pernah.join() === "banding:3,detektif:2", "riwayat Banding dan Detektif terkumpul berurutan");
  sama(L(banyak, { t: "RESET" }), x0, "Reset mengembalikan keadaan awal");
  cek(L(banyak, { t: "PESAN_KOSONG" }).pesan === "" && L(banyak, { t: "PESAN_KOSONG" }).pernah.join() === banyak.pernah.join(), "pesan dikosongkan, riwayat tetap");
  cek(L(L(banyak, { t: "B_DATA", i: 0 }), { t: "B_DATA", i: 3 }).pernah.join() === banyak.pernah.join(), "ganti pojok tidak mencabut riwayat");
  cek(L(banyak, { t: "B_JAWAB", jawab: "tumpul" }).pernah.join() === banyak.pernah.join(), "jawaban salah tidak mencabut riwayat");
  cek(L(jalan(banyak, L, [{ t: "B_JAWAB", jawab: "lancip" }]), { t: "B_JAWAB", jawab: "lancip" }).pernah.length === 2, "jawaban benar dua kali tidak menggandakan riwayat");

  // Fuzz 20.000 aksi.
  const acak = acakDari(2024);
  let s = x0;
  let ok = true;
  const pesanSemua = new Set();
  const riwayatSemua = new Set();
  const J = ["lancip", "siku", "tumpul"];
  for (let n = 0; n < 20000; n += 1) {
    const p = acak(22);
    const lipatMenujuNol = s.lipat.geser > 0 ? -5 : 5;
    const a =
      p === 0 ? { t: "L_DATA", i: acak(3) } :
      p === 1 || p === 2 ? { t: "L_LIPAT1" } :
      p === 3 || p === 4 ? { t: "L_GESER", d: [-5, 5, 5, -5, 3, 0][acak(6)] } :
      p === 5 || p === 6 ? { t: "L_GESER", d: lipatMenujuNol } :
      p === 7 || p === 8 ? { t: "L_LIPAT2" } :
      p === 9 ? { t: "B_DATA", i: acak(7) - (acak(8) === 0 ? 1 : 0) } :
      p === 10 || p === 11 ? { t: "B_TEMPEL" } :
      p === 12 || p === 13 ? { t: "B_JAWAB", jawab: J[acak(3)] } :
      p === 14 ? { t: "B_JAWAB", jawab: timbang(A.DATA_BANDING[s.banding.data].deg) } :
      p === 15 ? { t: "D_DATA", i: acak(7) } :
      p === 16 || p === 17 ? { t: "D_JAWAB", jawab: ["siku", "bukan", "x"][acak(3)] } :
      p === 18 ? { t: "D_JAWAB", jawab: timbang(A.DATA_DETEKTIF[s.detektif.data].deg) === "siku" ? "siku" : "bukan" } :
      acak(40) === 0 ? { t: "RESET" } : { t: "PESAN_KOSONG" };
    const t = L(s, a);
    if (a.t !== "RESET" && !s.pernah.every((v) => t.pernah.includes(v))) ok = false;
    if (!(t.lipat.data >= 0 && t.lipat.data < 2 && [0, 1, 2].includes(t.lipat.langkah) && Math.abs(t.lipat.geser) <= 10 && t.lipat.geser % 5 === 0)) ok = false;
    if (t.lipat.langkah === 2 && t.lipat.geser !== 0) ok = false;
    if (!(t.banding.data >= 0 && t.banding.data < 6 && typeof t.banding.tempel === "boolean" && t.detektif.data >= 0 && t.detektif.data < 6)) ok = false;
    for (const id of t.pernah) if (!ID.test(id)) ok = false;
    for (const id of t.pernah) {
      if (s.pernah.includes(id)) continue;
      const [jenis, nomor] = id.split(":");
      const nn = Number(nomor);
      if (jenis === "lipat" && !(t.lipat.data === nn && t.lipat.langkah === 2 && t.lipat.geser === 0)) ok = false;
      if (jenis === "banding" && !(t.banding.data === nn && t.banding.tempel && a.t === "B_JAWAB" && a.jawab === timbang(A.DATA_BANDING[nn].deg))) ok = false;
      if (jenis === "detektif" && !(t.detektif.data === nn && a.t === "D_JAWAB" && (a.jawab === "siku") === (timbang(A.DATA_DETEKTIF[nn].deg) === "siku"))) ok = false;
    }
    if (t.pesan) {
      pesanSemua.add(t.pesan);
      if (!tanpaSembilanPuluh(t.pesan)) ok = false;
    }
    for (const id of t.pernah) riwayatSemua.add(id);
    s = t;
  }
  cek(ok, "fuzz 20.000 aksi Lab Pojok: batas terjaga, riwayat tidak dicabut dan hanya bila tercapai");
  cek(pesanSemua.size > 15 && [...pesanSemua].every(tanpaAngka), `fuzz Lab Pojok: semua ${pesanSemua.size} pesan dieja menjadi kata`);
  cek(pesanSemua.size > 15 && [...pesanSemua].every(tanpaSembilanPuluh), "fuzz Lab Pojok: tidak ada ukuran selain 90 di pesan");
  cek(riwayatSemua.size >= 10, `fuzz Lab Pojok: riwayat terkumpul (${[...riwayatSemua].sort().join(" ")})`);
  globalThis.__pesanA = [...pesanSemua];
}

/* ------------------------------ Mesin ------------------------------ */
{
  for (const def of MS.SEMUA_MESIN_K5B6) {
    cek(def.stasiun.length === 4 && def.kasus.length === 3, `${def.id}: empat stasiun, tiga kasus`);
    const posisi = [];
    for (const kasus of def.kasus) {
      cek(kasus.langkah.length === 4, `${def.id}/${kasus.id}: empat langkah`);
      kasus.langkah.forEach((l, i) => {
        cek(l.stasiun === def.stasiun[i].id, `${def.id}/${kasus.id}: langkah ${i + 1} di stasiun ${def.stasiun[i].id}`);
        cek(l.opsi.length === 3 && new Set(l.opsi).size === 3 && l.opsi.filter((o) => o === l.benar).length === 1, `${def.id}/${kasus.id}/${l.stasiun}: tiga pilihan unik, satu kunci`);
        cek([l.tanya, l.petunjuk, ...l.opsi].every(tanpaAngka), `${def.id}/${kasus.id}/${l.stasiun}: dapat dieja`);
        cek([l.tanya, l.petunjuk, ...l.opsi].every(tanpaUkuran), `${def.id}/${kasus.id}/${l.stasiun}: tanpa ukuran pojok`);
        posisi.push(l.opsi.indexOf(l.benar));
      });
      cek(tanpaAngka(kasus.nama) && tanpaAngka(kasus.ringkas) && tanpaUkuran(kasus.ringkas), `${def.id}/${kasus.id}: nama dan ringkas dapat dieja, tanpa ukuran`);
    }
    cek(new Set(posisi).size === 3, `${def.id}: letak kunci bervariasi`);
    let x = ME.awalMesin(def);
    let n = 0;
    while (!x.selesai && n < 100) {
      n += 1;
      const l = ME.langkahAktif(x);
      x = l ? ME.langkahMesin(x, { t: "JAWAB", nilai: l.benar }) : ME.langkahMesin(x, { t: "LANJUT" });
    }
    cek(x.selesai && def.selesaiId === K6.ID_MESIN_K5B6.A, `${def.id}: bisa diselesaikan, id selesai sesuai misi`);
  }
  const angka = (o) => Number(o.split(" ")[0]);
  const urut = ["pertama", "kedua", "ketiga", "keempat"];
  const letak = (deg) => (timbang(deg) === "siku" ? "berimpit dengan" : timbang(deg) === "lancip" ? "masuk ke dalam" : "keluar dari");
  const nama = { lancip: "lancip", siku: "siku-siku", tumpul: "tumpul" };
  for (const [i, k] of MS.KASUS_POJOK.entries()) {
    const c = MS.MESIN_POJOK.kasus[i];
    const [temukan, patokan, banding, putuskan] = c.langkah;
    const n = k.pojok.length;
    const s = hitungSiku(k.pojok);
    // Temukan.
    cek(temukan.benar === `${s} pojok` && MS.banyakSiku(k.pojok) === s && temukan.tanya.includes(k.konteks), `Mesin ${k.id}: ${s} pojok berimpit (timbangan hasil kali titik)`);
    cek(temukan.opsi.every((o) => o === temukan.benar || angka(o) !== s) && temukan.opsi.every((o) => angka(o) >= 0 && angka(o) <= 8), `Mesin ${k.id}: pengecoh temukan salah`);
    // Patokan.
    cek(patokan.benar === `${n - s} pojok` && patokan.tanya.includes("tidak berimpit"), `Mesin ${k.id}: ${n - s} pojok tidak berimpit`);
    cek(patokan.opsi.every((o) => o === patokan.benar || angka(o) !== n - s) && patokan.opsi.every((o) => angka(o) >= 0), `Mesin ${k.id}: pengecoh patokan salah`);
    // Banding.
    const jb = timbang(k.pojok[k.banding]);
    cek(jb !== "siku" && banding.benar === nama[jb] && banding.tanya.includes(`Pojok ${urut[k.banding]} tidak berimpit`) && banding.tanya.includes(letak(k.pojok[k.banding])), `Mesin ${k.id}: pojok ${urut[k.banding]} ${nama[jb]}`);
    sama([...banding.opsi].sort(), ["lancip", "siku-siku", "tumpul"], `Mesin ${k.id}: pilihan banding tiga jenis`);
    // Putuskan.
    const jp = timbang(k.pojok[k.putuskan]);
    const kb = jp === "siku" ? "pakai pojok itu" : `ganti, pojok itu ${nama[jp]}`;
    cek(putuskan.benar === kb && putuskan.tanya.includes(`pojok ${urut[k.putuskan]} ${letak(k.pojok[k.putuskan])} patokan`), `Mesin ${k.id}: keputusan "${kb}"`);
    sama([...putuskan.opsi].sort(), ["ganti, pojok itu lancip", "ganti, pojok itu tumpul", "pakai pojok itu"], `Mesin ${k.id}: pilihan putuskan tiga keputusan`);
    cek(EJ.ejaK5B6(c.ringkas).includes(EJ.kataK5B6(s)) && EJ.ejaK5B6(c.ringkas).includes(EJ.kataK5B6(n - s)), `Mesin ${k.id}: ringkas memuat hasil benar`);
  }
  sama(MS.KASUS_POJOK.map((k) => k.id), ["bingkai", "lemari", "meja"], "Mesin: tiga kasus");
  sama(MS.KASUS_POJOK.map((k) => [k.pojok.join("-"), k.banding, k.putuskan]), [["90-90-90-50", 3, 0], ["90-90-60-120", 3, 2], ["60-120-60-120", 0, 1]], "Mesin: data tiga kasus sesuai rancangan");
  cek(MS.KASUS_POJOK.every((k) => k.pojok.length === 4 && k.pojok.every((d) => d === 90 || Math.abs(d - 90) >= 20)), "Mesin: empat pojok tiap kasus, bukan siku-siku berbeda paling sedikit 20 dari siku");
  sama(MS.KASUS_POJOK.map((k) => hitungSiku(k.pojok)), [3, 2, 0], "Mesin: banyak pojok siku 3, 2, 0");
  const himpunan = (l) => l.opsi.map((o) => Number(o.split(" ")[0])).sort((p, q) => p - q);
  sama(MS.MESIN_POJOK.kasus.map((c) => himpunan(c.langkah[0])), [[1, 3, 4], [2, 3, 4], [0, 1, 4]], "Mesin: pilihan temukan tiap kasus (pengecoh jumlah pojok dan pojok tidak siku)");
  sama(MS.MESIN_POJOK.kasus.map((c) => himpunan(c.langkah[1])), [[1, 3, 4], [2, 3, 4], [0, 4, 5]], "Mesin: pilihan patokan tiap kasus (pengecoh pojok siku dan jumlah pojok)");
  sama(MS.KASUS_POJOK.map((k) => timbang(k.pojok[k.banding])), ["lancip", "tumpul", "lancip"], "Mesin: jenis yang dibandingkan lancip, tumpul, lancip");
  sama(MS.KASUS_POJOK.map((k) => timbang(k.pojok[k.putuskan])), ["siku", "lancip", "tumpul"], "Mesin: keputusan pakai, ganti lancip, ganti tumpul");
}

/* ------------------------------ Skenario ------------------------------ */
{
  const S = SK.SKENARIO_K5B6A;
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
  sama(S.id.replace(/-k5b6$/, ""), K6.ID_SKENARIO_K5B6.A, "id skenario sesuai id misi");
  const adegan = (id) => S.adegan.find((a) => a.id === id);
  const soal = adegan("lipat").soal;
  cek(soal[0].jawaban === String(A.SIKU) && soal[0].opsi.includes("45") && soal[0].opsi.includes("180") && soal[0].opsi.filter((o) => o !== "90").every((o) => timbang(Number(o)) !== "siku"), "A: besar siku-siku 90, pengecoh 45 dan 180 bukan siku-siku (timbangan)");
  cek(soal[1].jawaban === "2" && soal[1].opsi.includes("1") && soal[1].opsi.includes("3") && soal[1].teks.includes("berimpit"), "A: dua lipatan, pengecoh 1 dan 3");
  const bingkai = adegan("bingkai");
  cek(bingkai.jumlah === hitungSiku([90, 90, 90, 90]) && bingkai.jumlah <= 12 && bingkai.sukses.includes("4 pojok siku-siku"), "A: bingkai persegi panjang 4 pojok siku-siku");
  const segitiga = adegan("segitiga");
  cek(segitiga.target === 3 - hitungSiku([90, 60, 30]) && segitiga.target <= segitiga.maks && segitiga.maks <= 20 && segitiga.cerita.includes("3 pojok") && segitiga.cerita.includes("1 pojok siku-siku"), "A: penggaris segitiga 3 pojok, 1 siku-siku, 2 bukan");
  const cekAdegan = adegan("cek");
  const bb = cekAdegan.opsi.find((o) => o.benar);
  cek(/^lancip/.test(bb.teks) && /masuk ke dalam patokan/.test(cekAdegan.cerita) && cekAdegan.opsi.filter((o) => !o.benar).every((o) => !/^lancip/.test(o.teks)) && cekAdegan.opsi.some((o) => /^tumpul, karena lebih sempit/.test(o.teks)), "A: pojok masuk ke dalam patokan lancip, pengecoh tumpul dan siku-siku salah");
  const arti = adegan("arti").opsi.find((o) => o.benar);
  cek(/berimpit dengan patokan/.test(arti.teks) && arti.teks.includes("90°") && adegan("arti").opsi.filter((o) => !o.benar).every((o) => !/berimpit/.test(o.teks)), "A: siku-siku berimpit dengan patokan, pengecoh salah");
  const posisi = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
  cek(new Set(posisi).size === posisi.length, `A: letak jawaban pilih bervariasi (${posisi.join("")})`);
}

/* ------------------------------ Misi ------------------------------ */
{
  const huruf = ["A"];
  sama(Object.keys(TK.MISI_K5B6), huruf, "teks misi untuk A");
  sama(Object.keys(TK.NAMA_SIM_K5B6), huruf, "nama simulasi untuk A");
  cek(TK.hurufK5B6("Z") === "A" && TK.hurufK5B6("A") === "A", "huruf tak dikenal jatuh ke A");
  cek(TK.misiAwalK5Bab6("A").startsWith("Simulasi 1. Misi: ") && tanpaAngka(TK.misiAwalK5Bab6("A")), "misi awal dan dapat dieja");
  for (const h of huruf) {
    const daftar = K6.daftarMisiK5Bab6(h);
    cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, `${h}: tujuh misi wajib dan tiga tantangan bebas`);
    cek(new Set(daftar.map((m) => m.id)).size === 10 && daftar.every((m) => m.id.startsWith(`${h.toLowerCase()}-`)), `${h}: id misi unik berawalan huruf`);
    const kosong = [{ alat: "pojok", pernah: [] }, sel("tidak-ada"), A.keadaanPojokK5B6A(A.awalPojokK5B6A())];
    cek(kosong.every((k) => M0.misiBaru(daftar, k, new Set()).length === 0), `${h}: keadaan awal alat tidak memenuhi misi mana pun`);
    cek(daftar.every((m) => m.teks.length > 20 && tanpaAngka(m.teks)), `${h}: teks misi jelas dan dapat dieja`);
    const baru = (k) => M0.misiBaru(daftar, k, new Set());
    cek(baru(sel(K6.ID_MESIN_K5B6[h])).join() === `${h.toLowerCase()}-mesin` && baru(sel(K6.ID_SKENARIO_K5B6[h])).join() === `${h.toLowerCase()}-skenario`, `${h}: id mesin dan skenario memenuhi misinya`);
  }
  cek(M0.misiBaru(K6.MISI_A, { alat: "lain", pernah: ["lipat:0", "banding:0", "banding:1", "banding:2", "banding:3", "banding:4", "detektif:0"] }, new Set()).length === 0, "A: riwayat alat lain tidak memenuhi misi A");

  const capai = (aksi) => M0.misiBaru(K6.MISI_A, A.keadaanPojokK5B6A(jalan(A.awalPojokK5B6A(), L, aksi)), new Set());
  const lipat = (i, { lipat1 = true, geser = true, lipat2 = true } = {}) => {
    const d = A.DATA_LIPAT[i];
    const aksi = [{ t: "L_DATA", i }];
    if (lipat1) aksi.push({ t: "L_LIPAT1" });
    if (geser) for (let g = d.geser; g !== 0; g += d.geser > 0 ? -5 : 5) aksi.push({ t: "L_GESER", d: d.geser > 0 ? -5 : 5 });
    if (lipat2) aksi.push({ t: "L_LIPAT2" });
    return aksi;
  };
  cek(capai(lipat(0)).join() === "a-lipat" && capai(lipat(1)).join() === "a-lipat-koran", "A: lipat kertas HVS memenuhi misi, kertas koran memenuhi tantangan");
  cek(capai(lipat(0, { lipat1: false })).length === 0 && capai(lipat(0, { geser: false })).length === 0 && capai(lipat(0, { lipat2: false })).length === 0, "A: lipat tanpa lipat pertama, tanpa menggeser, atau tanpa lipat kedua tidak memenuhi");
  cek(capai([...lipat(0), ...lipat(1)]).join() === "a-lipat,a-lipat-koran", "A: dua kertas bersamaan");

  const banding = (i, jawab = timbang(A.DATA_BANDING[i].deg), tempel = true) => [{ t: "B_DATA", i }, ...(tempel ? [{ t: "B_TEMPEL" }] : []), { t: "B_JAWAB", jawab }];
  cek(capai([...banding(0), ...banding(1), ...banding(2)]).join() === "a-banding-siku", "A: tiga pojok siku dibandingkan memenuhi");
  cek(capai([...banding(0), ...banding(1)]).length === 0, "A: hanya dua dari tiga pojok siku tidak memenuhi");
  cek(capai([...banding(0), ...banding(1), ...banding(2, "lancip")]).length === 0 && capai([...banding(0), ...banding(1), ...banding(2, "siku", false)]).length === 0, "A: pojok ketiga salah jawab atau tanpa menempel tidak memenuhi");
  cek(capai(banding(3)).join() === "a-banding-lancip" && capai(banding(4)).join() === "a-banding-tumpul" && capai(banding(5)).join() === "a-banding-atap", "A: gunting lancip, kipas tumpul, atap tumpul memenuhi misinya");
  cek(capai(banding(3, "tumpul")).length === 0 && capai(banding(4, "lancip")).length === 0 && capai(banding(4, "tumpul", false)).length === 0, "A: jawaban tertukar atau tanpa menempel tidak memenuhi");
  cek(capai([0, 1, 2, 3, 4, 5].flatMap((i) => banding(i))).join() === "a-banding-siku,a-banding-lancip,a-banding-tumpul,a-banding-atap,a-banding-semua", "A: keenam pojok memenuhi lima misi Banding");
  cek(capai([0, 1, 2, 3, 4].flatMap((i) => banding(i))).join() === "a-banding-siku,a-banding-lancip,a-banding-tumpul", "A: lima pojok belum memenuhi tantangan semua pojok");

  const detektif = (i, jawab = timbang(A.DATA_DETEKTIF[i].deg) === "siku" ? "siku" : "bukan") => [{ t: "D_DATA", i }, { t: "D_JAWAB", jawab }];
  cek(capai([0, 1, 2, 3, 4, 5].flatMap((i) => detektif(i))).join() === "a-detektif", "A: keenam pojok Detektif benar memenuhi");
  cek(capai([0, 1, 2, 3, 4].flatMap((i) => detektif(i))).length === 0, "A: lima dari enam pojok Detektif tidak memenuhi");
  cek(capai([...[0, 1, 2, 3, 4].flatMap((i) => detektif(i)), ...detektif(5, "siku")]).length === 0, "A: pojok keenam salah jawab tidak memenuhi");
  cek(capai([...[0, 1, 2, 3, 4].flatMap((i) => detektif(i)), ...detektif(5), ...banding(0)]).join() === "a-detektif", "A: Detektif dan Banding terpisah, hanya Detektif memenuhi");

  // Gerbang.
  for (const h of huruf) {
    const daftar = M0.tampilMisi(K6.daftarMisiK5Bab6(h));
    const wajibIds = daftar.filter((m) => m.wajib).map((m) => m.id);
    cek(!M0.wajibSelesai(daftar, new Set(wajibIds.slice(0, 6))), `${h}: enam dari tujuh wajib belum membuka gerbang`);
    cek(M0.wajibSelesai(daftar, new Set(wajibIds)), `${h}: tujuh wajib membuka gerbang`);
    cek(M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: true }) && !M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: false }), "lewati hanya setelah disentuh");
  }
}

/* ------------------------------ Konsep tidak bocor antar sub-bab ------------------------------ */
{
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas5-bab6-ringkas.json", import.meta.url), "utf8"));
  const baca = (nama, ekstensi) => readFileSync(new URL(`../src/components/modul/${nama}.${ekstensi}`, import.meta.url), "utf8");
  const tanpaKomentar = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  const teksDari = (o) => {
    const hasil = [];
    JSON.stringify(o, (k, v) => {
      if (typeof v === "string") hasil.push(v);
      return v;
    });
    return hasil.join(" | ");
  };
  // Sub-Bab A tidak memakai konsep sub-bab berikutnya: bagian sudut (B): titik sudut, kaki sudut, vertex, sinar; mengukur (C):
  // busur, derajat selain 90, skala, nol, lurus, penuh, releks; melukis (D): lukis, gambar sudut.
  const BOCOR_A = /(titik sudut|kaki sudut|\bkaki\b|\bvertex\b|\bsinar\b|\bbusur\b|\bskala\b|\breleks\b|\brefleks\b|\bsudut nol\b|\bsudut lurus\b|\bsudut penuh\b|\bmelukis\b|\blukis\w*|\bprotractor\b|\bukur\w*)/i;
  const derajatLain = (t) => /(?<![\d])(?!90\b)\d+\s*°/.test(t);
  const catat = (teks, apa) => {
    const m = BOCOR_A.exec(teks);
    cek(!m, `A: ${apa} bebas konsep sub-bab berikutnya (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
  };
  const catatDerajat = (teks, apa) => cek(!derajatLain(teks), `A: ${apa} tidak menulis ukuran derajat selain 90`);
  for (const t of [TK.MISI_K5B6.A, TK.NAMA_SIM_K5B6.A, ...K6.MISI_A.map((m) => m.teks)]) {
    catat(t, "teks misi");
    catatDerajat(t, "teks misi");
  }
  for (const [nama, o] of [["mesin", MS.MESIN_POJOK], ["skenario", SK.SKENARIO_K5B6A], ["peta dan infografis ringkas", ringkas.subBab.A]]) {
    catat(teksDari(o), nama);
    // Infografis boleh menulis < 90° dan > 90° sebagai tanda banding; selain itu tidak ada ukuran lain.
    catatDerajat(teksDari(o), nama);
  }
  for (const [f, e] of [["SimulasiLabPojokK5B6", "tsx"], ["model-pojok-k5b6", "tsx"], ["lab-pojok-k5b6a", "ts"]]) catat(tanpaKomentar(baca(f, e)), `${f} (tanpa komentar)`);
  for (const p of globalThis.__pesanA) {
    catat(p, "pesan lab dari fuzz");
    catatDerajat(p, "pesan lab dari fuzz");
  }
  for (const u of [A.ucapLipatK5B6A(x0), A.ucapBandingK5B6A(x0), A.ucapDetektifK5B6A(x0)]) catat(u, "ucapan lab");

  // Kunci tidak bocor ke klien, tanpa jaringan.
  for (const f of ["SimulasiLabPojokK5B6", "SimulasiK5Bab6", "model-pojok-k5b6"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s), `${f}: tidak memuat correct_index atau explanation`);
    cek(!/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa jaringan atau model bahasa`);
  }
  for (const f of ["lab-pojok-k5b6a", "mesin-data-k5b6", "skenario-k5b6", "misi-k5bab6", "misi-teks-k5b6", "eja-k5b6"]) {
    const s = baca(f, "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: murni`);
    const impor = s.match(/^import .+$/gm) ?? [];
    cek(impor.every((l) => l.startsWith("import type")), `${f}: hanya mengimpor tipe`);
  }
  cek((baca("lab-pojok-k5b6a", "ts").match(/^import /gm) ?? []).length === 0 && (baca("eja-k5b6", "ts").match(/^import /gm) ?? []).length === 0, "lab dan pengeja tanpa impor");
  {
    const s = baca("SimulasiLabPojokK5B6", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s), "lab: lapor keadaan lewat useEffect");
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), "lab: ganti tampilan mengosongkan pesan");
    const catatan = [...s.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 3 && catatan.every(tanpaAngka), "lab: Coba ini dapat dieja");
    cek(/aria-label="Lipat pertama"/.test(s) && /aria-label="Lipat kedua"/.test(s) && /aria-label="Geser lipatan ke kiri"/.test(s) && /aria-label="Geser lipatan ke kanan"/.test(s) && /aria-label="Tempel patokan"/.test(s) && /aria-label="Pilih lancip"/.test(s) && /aria-label="Pilih tumpul"/.test(s) && /aria-label="Pilih bukan siku-siku"/.test(s), "lab: tombol lipat, geser, tempel, dan pilihan berlabel");
    const m = baca("model-pojok-k5b6", "tsx");
    cek(/role="img"/.test(m) && (m.match(/aria-label=\{`Gambar /g) ?? []).length === 2, "model: dua gambar berlabel");
  }
  const pembungkus = baca("SimulasiK5Bab6", "tsx");
  cek(/eja=\{ejaK5B6\}/.test(pembungkus), "pembungkus: mesin dieja ejaK5B6");
  const coba = [...pembungkus.matchAll(/"([^"]*\?)"/g)].map((m) => m[1]);
  cek(coba.length >= 3 && coba.every(tanpaAngka), "Coba ini mesin dapat dieja");
  // Semua ucapan lab dieja menjadi kata, tanpa ukuran selain 90.
  const ucapan = [];
  for (let i = 0; i < A.DATA_LIPAT.length; i += 1) {
    const xl = L(x0, { t: "L_DATA", i });
    const satu = L(xl, { t: "L_LIPAT1" });
    let g = satu;
    while (g.lipat.geser !== 0) g = L(g, { t: "L_GESER", d: g.lipat.geser > 0 ? -5 : 5 });
    ucapan.push(A.ucapLipatK5B6A(xl), A.ucapLipatK5B6A(satu), A.ucapLipatK5B6A(g), A.ucapLipatK5B6A(L(g, { t: "L_LIPAT2" })));
  }
  for (let i = 0; i < A.DATA_BANDING.length; i += 1) {
    const xb = L(x0, { t: "B_DATA", i });
    ucapan.push(A.ucapBandingK5B6A(xb), A.ucapBandingK5B6A(L(xb, { t: "B_TEMPEL" })));
  }
  for (let i = 0; i < A.DATA_DETEKTIF.length; i += 1) ucapan.push(A.ucapDetektifK5B6A(L(x0, { t: "D_DATA", i })));
  cek(ucapan.length >= 20 && ucapan.every(tanpaAngka), `semua ${ucapan.length} ucapan lab dieja menjadi kata`);
  for (const u of ucapan) {
    catat(u, "ucapan lab");
    catatDerajat(u, "ucapan lab");
  }
}

/* ------------------------------ Data ringkas ------------------------------ */
{
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas5-bab6-ringkas.json", import.meta.url), "utf8"));
  cek(ringkas.chapter_id === "mtk-5-bab6" && ringkas.phase_code === "FASE_C" && ringkas.grade === 5, "ringkas: id bab, fase, kelas");
  for (const h of Object.keys(ringkas.subBab)) {
    const s = ringkas.subBab[h];
    cek(!!s && s.peta.cabang.length === 4 && s.peta.kartu.length === 8 && s.infografis.panel.length === 3, `ringkas ${h}: empat cabang, delapan kartu, tiga panel`);
    cek(s.peta.cabang.every((c) => c.ringkas.split(/\s+/).length <= 8) && s.infografis.panel.every((p) => p.ide.split(/\s+/).length <= 8), `ringkas ${h}: ringkas cabang dan ide panel paling banyak delapan kata`);
    cek(s.peta.cabang.every((c) => s.peta.kartu.filter((k) => k.cabang === c.id).length === 2), `ringkas ${h}: tiap cabang dua kartu`);
    const suara = [];
    JSON.stringify(s, (k, v) => {
      if (k === "suara") suara.push(v);
      return v;
    });
    cek(suara.length > 10 && suara.every((t) => !/\d/.test(t)), `ringkas ${h}: semua teks suara berupa kata`);
    for (const p of s.infografis.panel) {
      if (p.tipe === "buka") cek(p.butir.length >= 2 && p.butir.length <= 4, `ringkas ${h}/${p.id}: dua sampai empat butir`);
      if (p.tipe === "banding") cek(p.sisi.length === 2 && !!p.kesimpulan, `ringkas ${h}/${p.id}: dua sisi dan kesimpulan`);
      for (const b of p.butir ?? []) if (b.visual.jenis === "tabel-menurun") cek(b.visual.baris.length <= 4 && b.visual.baris.every((r) => typeof r[1] === "number"), `ringkas ${h}/${b.id}: tabel paling banyak empat baris, nilai angka`);
    }
  }
  // Angka di ringkas A dihitung ulang mandiri.
  const A0 = ringkas.subBab.A;
  const butir = (panel, id) => panel.butir.find((b) => b.id === id);
  const [p1, p2, p3] = A0.infografis.panel;
  cek(butir(p1, "jadi").visual.isi === `${A.SIKU}°` && butir(p1, "jadi").suara.includes(EJ.kataK5B6(90)), "ringkas A: patokan 90° dan suara menyebut sembilan puluh");
  cek(butir(p1, "satu").visual.isi === "lipatan 1" && butir(p1, "dua").visual.isi === "lipatan 2", "ringkas A: dua lipatan");
  const [lancip, tumpul] = p2.sisi;
  cek(lancip.visual.isi === "< 90°" && tumpul.visual.isi === "> 90°" && timbang(40) === "lancip" && timbang(130) === "tumpul", "ringkas A: lancip lebih kecil dari 90 dan tumpul lebih besar (timbangan)");
  const tabel = butir(p3, "bingkai").visual;
  sama(tabel.baris, [["bingkai", hitungSiku([90, 90, 90, 90])], ["penggaris segitiga", hitungSiku([90, 60, 30])]], "ringkas A: pojok siku bingkai 4 dan penggaris segitiga 1 (dihitung)");
  cek(butir(p3, "bingkai").suara.includes("empat pojok") && butir(p3, "bingkai").suara.includes("satu"), "ringkas A: suara menyebut empat pojok dan satu");
  cek(butir(p3, "alat").visual.isi === `∟ = ${A.SIKU}°`, "ringkas A: penggaris siku sama dengan 90°");
  const kartu = (id) => A0.peta.kartu.find((k) => k.id === id).teks;
  cek(kartu("a-sembilan") === `Sudut siku-siku = ${A.SIKU}°`, "ringkas A: kartu siku-siku sama dengan 90°");
  sama(Object.keys(ringkas.subBab), ["A"], "ringkas: gelombang ini hanya sub-bab A");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
