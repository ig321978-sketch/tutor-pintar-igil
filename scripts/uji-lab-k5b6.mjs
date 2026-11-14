// Uji Simulasi Kelas 5 Bab 6 (Sudut): Lab Pojok (A), Lab Sudut (B), Lab Busur (C), Lab Lukis (D), mesin, skenario, misi,
// gerbang, data ringkas, pendaftaran bab, pengeja, dan konsep sub-bab berikutnya tidak bocor ke Sub-Bab A, B, dan C.
// Jalankan: node --no-warnings scripts/uji-lab-k5b6.mjs
import { readFileSync } from "node:fs";
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K6 from "../src/components/modul/misi-k5bab6.ts";
import * as TK from "../src/components/modul/misi-teks-k5b6.ts";
import * as A from "../src/components/modul/lab-pojok-k5b6a.ts";
import * as B from "../src/components/modul/lab-sudut-k5b6b.ts";
import * as C from "../src/components/modul/lab-busur-k5b6c.ts";
import * as D from "../src/components/modul/lab-lukis-k5b6d.ts";
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
  // Naskah video lama dihapus; materi bingkai, Eksplorasi 6.1, dan penggaris siku kini ada di video Story baru Sub-Bab A.
  const materiA = [1, 2, 3].map((n) => readFileSync(new URL(`../src/components/modul/story/k5b6a-materi-${n}.ts`, import.meta.url), "utf8")).join(String.fromCharCode(10));
  cek(/bingkai/i.test(materiA) && materiA.includes("Eksplorasi 6.1") && /penggaris siku/i.test(materiA), "video Story A memuat bingkai, Eksplorasi 6.1, dan penggaris siku");
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
        cek(def.id === "mesin-busur-k5b6" || def.id === "mesin-lukis-k5b6" || [l.tanya, l.petunjuk, ...l.opsi].every(tanpaUkuran), `${def.id}/${kasus.id}/${l.stasiun}: tanpa ukuran pojok`);
        posisi.push(l.opsi.indexOf(l.benar));
      });
      cek(tanpaAngka(kasus.nama) && tanpaAngka(kasus.ringkas) && (def.id === "mesin-busur-k5b6" || def.id === "mesin-lukis-k5b6" || tanpaUkuran(kasus.ringkas)), `${def.id}/${kasus.id}: nama dan ringkas dapat dieja, tanpa ukuran`);
    }
    cek(new Set(posisi).size === 3, `${def.id}: letak kunci bervariasi`);
    let x = ME.awalMesin(def);
    let n = 0;
    while (!x.selesai && n < 100) {
      n += 1;
      const l = ME.langkahAktif(x);
      x = l ? ME.langkahMesin(x, { t: "JAWAB", nilai: l.benar }) : ME.langkahMesin(x, { t: "LANJUT" });
    }
    cek(x.selesai && def.selesaiId === { "mesin-pojok-k5b6": K6.ID_MESIN_K5B6.A, "mesin-sudut-k5b6": K6.ID_MESIN_K5B6.B, "mesin-busur-k5b6": K6.ID_MESIN_K5B6.C, "mesin-lukis-k5b6": K6.ID_MESIN_K5B6.D }[def.id], `${def.id}: bisa diselesaikan, id selesai sesuai misi`);
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
  const huruf = ["A", "B", "C", "D"];
  sama(Object.keys(TK.MISI_K5B6), huruf, "teks misi untuk A, B, C, dan D");
  sama(Object.keys(TK.NAMA_SIM_K5B6), huruf, "nama simulasi untuk A, B, C, dan D");
  cek(TK.hurufK5B6("Z") === "A" && TK.hurufK5B6("A") === "A" && TK.hurufK5B6("B") === "B" && TK.hurufK5B6("C") === "C" && TK.hurufK5B6("D") === "D", "huruf tak dikenal jatuh ke A, B, C, dan D dikenal");
  cek(TK.misiAwalK5Bab6("A").startsWith("Simulasi 1. Misi: ") && tanpaAngka(TK.misiAwalK5Bab6("A")) && tanpaAngka(TK.misiAwalK5Bab6("B")) && tanpaAngka(TK.misiAwalK5Bab6("C")) && tanpaAngka(TK.misiAwalK5Bab6("D")), "misi awal dan dapat dieja");
  for (const h of huruf) {
    const daftar = K6.daftarMisiK5Bab6(h);
    cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, `${h}: tujuh misi wajib dan tiga tantangan bebas`);
    cek(new Set(daftar.map((m) => m.id)).size === 10 && daftar.every((m) => m.id.startsWith(`${h.toLowerCase()}-`)), `${h}: id misi unik berawalan huruf`);
    const kosong = [{ alat: "pojok", pernah: [] }, { alat: "sudut", pernah: [] }, { alat: "busur", pernah: [] }, { alat: "lukis", pernah: [] }, sel("tidak-ada"), A.keadaanPojokK5B6A(A.awalPojokK5B6A()), B.keadaanSudutK5B6B(B.awalSudutK5B6B()), C.keadaanBusurK5B6C(C.awalBusurK5B6C()), D.keadaanLukisK5B6D(D.awalLukisK5B6D())];
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
  for (const f of ["SimulasiLabPojokK5B6", "SimulasiLabSudutK5B6", "SimulasiLabBusurK5B6", "SimulasiLabLukisK5B6", "SimulasiK5Bab6", "model-pojok-k5b6", "model-sudut-k5b6", "model-busur-k5b6", "model-lukis-k5b6"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s), `${f}: tidak memuat correct_index atau explanation`);
    cek(!/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa jaringan atau model bahasa`);
  }
  for (const f of ["lab-pojok-k5b6a", "lab-sudut-k5b6b", "lab-busur-k5b6c", "lab-lukis-k5b6d", "mesin-data-k5b6", "skenario-k5b6", "misi-k5bab6", "misi-teks-k5b6", "eja-k5b6"]) {
    const s = baca(f, "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: murni`);
    const impor = s.match(/^import .+$/gm) ?? [];
    cek(impor.every((l) => l.startsWith("import type")), `${f}: hanya mengimpor tipe`);
  }
  cek((baca("lab-pojok-k5b6a", "ts").match(/^import /gm) ?? []).length === 0 && (baca("lab-sudut-k5b6b", "ts").match(/^import /gm) ?? []).length === 0 && (baca("lab-busur-k5b6c", "ts").match(/^import /gm) ?? []).length === 0 && (baca("lab-lukis-k5b6d", "ts").match(/^import /gm) ?? []).length === 0 && (baca("eja-k5b6", "ts").match(/^import /gm) ?? []).length === 0, "lab dan pengeja tanpa impor");
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
  sama(Object.keys(ringkas.subBab), ["A", "B", "C", "D"], "ringkas: sub-bab A, B, C, dan D");
}

/* ============================== Sub-Bab B: Lab Sudut ============================== */
// Jam ditimbang dengan vektor: jarum pendek (sin, cos) dari arah dua belas searah jarum jam, jarum panjang (0, 1).
const timbangJam = (jam) => {
  const th = (jam * 30 * Math.PI) / 180;
  const dot = Math.round((Math.sin(th) * 0 + Math.cos(th) * 1) * 1e6) / 1e6;
  return dot === 0 ? "siku" : dot > 0 ? "lancip" : "tumpul";
};
const LB = B.langkahSudutK5B6B;
const xb0 = B.awalSudutK5B6B();
const IDB = /^(bagian:[01]|jenis:(lancip|siku|tumpul)|jam:[0-5])$/;
const KAT = { titik: "titik", kaki1: "kaki", kaki2: "kaki", daerah: "daerah" };
const SEBUT = { titik: "titik sudut", kaki: "kaki sudut", daerah: "daerah sudut" };
{
  cek(xb0.pernah.length === 0 && xb0.pesan === "" && xb0.bagian.langkah === 0 && xb0.jenis.deg === 60 && xb0.jenis.tugas === 0 && xb0.jam.data === 0, "B awal: kosong, belum ada riwayat");
  cek(B.DATA_BAGIAN.length === 2 && B.TUGAS_JENIS.length === 3 && B.DATA_JAM.length === 6, "B: dua sudut Bagian, tiga tugas Jenis, enam jam");
  sama(B.DATA_BAGIAN.map((d) => [d.nama, d.urutan.join("-"), d.deg]), [["huruf V", "kaki1-titik-daerah-kaki2", 50], ["gunting terbuka", "daerah-kaki2-titik-kaki1", 70]], "B: data dua sudut Bagian sesuai rancangan");
  cek(B.DATA_BAGIAN.every((d) => [...d.urutan].sort().join() === "daerah,kaki1,kaki2,titik" && d.deg > 0 && d.deg < 90), "B: urutan sorot memuat keempat bagian tepat sekali, sudut gambar lancip");
  sama(B.DATA_JAM, [2, 3, 4, 8, 1, 5], "B: data enam jam sesuai rancangan");
  cek(B.DATA_JAM.every((h) => Number.isInteger(h) && h >= 1 && h <= 11 && h !== 6), "B: jam bukan 6 dan 12 (sudut lurus dan penuh dibahas di C)");
  sama(B.DATA_JAM.map(timbangJam), ["lancip", "siku", "tumpul", "tumpul", "lancip", "tumpul"], "B: jenis enam jam (timbangan vektor)");
  for (const h of B.DATA_JAM) cek(B.jenisSudut(B.sudutJam(h)) === timbangJam(h), `B: pukul ${h} jenis kode sama dengan timbangan vektor`);
  for (let h = 1; h <= 11; h += 1) {
    const th = (h * 30 * Math.PI) / 180;
    const pendek = [Math.sin(th), Math.cos(th)];
    const sudutVektor = Math.round((Math.acos(Math.max(-1, Math.min(1, pendek[1]))) * 180) / Math.PI);
    cek(B.sudutJam(h) === sudutVektor && MS.KASUS_SUDUT.every(() => true), `B: sudut antara jarum pukul ${h} sama dengan sudut vektor (${sudutVektor})`);
  }
  cek(B.DEG_AWAL === 60 && B.DEG_MIN === 15 && B.DEG_MAKS === 165 && B.DEG_LANGKAH === 15 && (90 - B.DEG_MIN) % B.DEG_LANGKAH === 0, "B: sudut Jenis 15 sampai 165, kelipatan 15, 90 dapat dicapai");

  // Bagian.
  for (const [i, d] of B.DATA_BAGIAN.entries()) {
    const awal = LB(xb0, { t: "G_DATA", i });
    cek(awal.bagian.data === i && awal.bagian.langkah === 0 && awal.pernah.length === 0, `Bagian ${d.nama}: dipilih, mulai dari langkah nol`);
    let s = awal;
    for (const [n, bagian] of d.urutan.entries()) {
      const kat = KAT[bagian];
      cek(B.sorotBagian(s) === bagian, `Bagian ${d.nama}: sorot ke-${n + 1} adalah ${bagian}`);
      for (const nama of ["titik", "kaki", "daerah"]) {
        const t = LB(s, { t: "G_NAMA", nama });
        if (nama === kat) {
          cek(t.bagian.langkah === n + 1 && t.pesan.startsWith("✅"), `Bagian ${d.nama}: ${bagian} dinamai ${nama} benar maju`);
        } else {
          cek(t.bagian.langkah === n && t.pernah.length === 0 && !t.pesan.startsWith("✅") && t.pesan.includes(`bukan ${SEBUT[nama]}`), `Bagian ${d.nama}: ${bagian} dinamai ${nama} salah tidak maju`);
        }
      }
      sama(LB(s, { t: "G_NAMA", nama: "segitiga" }), s, `Bagian ${d.nama}: nama di luar pilihan diabaikan`);
      s = LB(s, { t: "G_NAMA", nama: kat });
    }
    cek(s.bagian.langkah === 4 && s.pernah.join() === `bagian:${i}` && s.pesan.startsWith("✅ Lengkap") && B.sorotBagian(s) === null, `Bagian ${d.nama}: keempat bagian benar mencatat bagian:${i}`);
    for (const nama of ["titik", "kaki", "daerah"]) sama(LB(s, { t: "G_NAMA", nama }), s, `Bagian ${d.nama}: menamai setelah lengkap diabaikan`);
    cek(LB(s, { t: "G_DATA", i }).bagian.langkah === 0 && LB(s, { t: "G_DATA", i }).pernah.join() === `bagian:${i}`, `Bagian ${d.nama}: ulang dari awal, riwayat tetap`);
  }
  cek(LB(xb0, { t: "G_DATA", i: 2 }) === xb0 && LB(xb0, { t: "G_DATA", i: -1 }) === xb0, "Bagian: sudut di luar daftar diabaikan");

  // Jenis.
  cek(LB(xb0, { t: "J_UBAH", d: 10 }) === xb0 && LB(xb0, { t: "J_UBAH", d: 0 }) === xb0 && LB(xb0, { t: "J_UBAH", d: 30 }) === xb0, "Jenis: langkah ubah di luar plus minus 15 diabaikan");
  cek(LB(xb0, { t: "J_TUGAS", i: 3 }) === xb0 && LB(xb0, { t: "J_TUGAS", i: -1 }) === xb0, "Jenis: tugas di luar daftar diabaikan");
  let ujungBuka = xb0;
  for (let n = 0; n < 12; n += 1) ujungBuka = LB(ujungBuka, { t: "J_UBAH", d: 15 });
  cek(ujungBuka.jenis.deg === 165 && /paling lebar/.test(ujungBuka.pesan), "Jenis: membuka berhenti di batas paling lebar");
  let ujungTutup = xb0;
  for (let n = 0; n < 12; n += 1) ujungTutup = LB(ujungTutup, { t: "J_UBAH", d: -15 });
  cek(ujungTutup.jenis.deg === 15 && /paling sempit/.test(ujungTutup.pesan), "Jenis: menutup berhenti di batas paling sempit");
  let jumlahJenis = 0;
  for (const [ti, target] of B.TUGAS_JENIS.entries()) {
    for (let deg = 15; deg <= 165; deg += 15) {
      let s = LB(xb0, { t: "J_TUGAS", i: ti });
      while (s.jenis.deg < deg) s = LB(s, { t: "J_UBAH", d: 15 });
      while (s.jenis.deg > deg) s = LB(s, { t: "J_UBAH", d: -15 });
      const t = LB(s, { t: "J_CEK" });
      const tepat = timbang(deg) === target;
      jumlahJenis += 1;
      cek(tepat ? t.pernah.join() === `jenis:${target}` && t.pesan.startsWith("✅") : t.pernah.length === 0 && !t.pesan.startsWith("✅"), `Jenis: tugas ${target} pada sudut ${deg} ${tepat ? "dicatat" : "tidak dicatat"}`);
      if (!tepat) {
        const arah = target === "siku" ? (deg < 90 ? "Buka lebih lebar" : "Tutup lebih sempit") : target === "lancip" ? "Tutup lebih sempit" : "Buka lebih lebar";
        cek(t.pesan.includes(arah), `Jenis: tugas ${target} pada sudut ${deg} menyarankan "${arah}"`);
      }
    }
  }
  cek(jumlahJenis === 33, "Jenis: tiga tugas pada sebelas sudut diperiksa");

  // Jam.
  for (const [i, h] of B.DATA_JAM.entries()) {
    const benar = timbangJam(h);
    const xj = LB(xb0, { t: "M_DATA", i });
    cek(xj.jam.data === i && B.jamDipilih(xj) === h, `Jam ${h}: dipilih`);
    for (const j of ["lancip", "siku", "tumpul"]) {
      const t = LB(xj, { t: "M_JAWAB", jawab: j });
      cek(j === benar ? t.pernah.join() === `jam:${i}` && t.pesan.startsWith("✅") : t.pernah.length === 0 && !t.pesan.startsWith("✅") && /Bandingkan lagi/.test(t.pesan), `Jam ${h}: jawaban ${j} ${j === benar ? "benar dicatat" : "salah tidak dicatat"}`);
    }
    cek(LB(xj, { t: "M_JAWAB", jawab: "lurus" }) === xj && LB(xj, { t: "M_JAWAB", jawab: "" }) === xj, `Jam ${h}: jawaban di luar pilihan diabaikan`);
  }
  cek(LB(xb0, { t: "M_DATA", i: 6 }) === xb0 && LB(xb0, { t: "M_DATA", i: -1 }) === xb0, "Jam: jam di luar daftar diabaikan");

  // Reset, pesan kosong, riwayat tidak dicabut.
  const sat = jalan(xb0, LB, [{ t: "J_UBAH", d: -15 }, { t: "J_CEK" }, { t: "M_DATA", i: 1 }, { t: "M_JAWAB", jawab: "siku" }]);
  cek(sat.pernah.join() === "jenis:lancip,jam:1", "B: riwayat Jenis dan Jam terkumpul berurutan");
  sama(LB(sat, { t: "RESET" }), xb0, "B: reset mengembalikan keadaan awal");
  cek(LB(sat, { t: "PESAN_KOSONG" }).pesan === "" && LB(sat, { t: "PESAN_KOSONG" }).pernah.join() === sat.pernah.join(), "B: pesan dikosongkan, riwayat tetap");
  cek(LB(sat, { t: "J_CEK" }).pernah.join() === "jenis:lancip,jam:1" && LB(jalan(sat, LB, [{ t: "J_UBAH", d: 15 }, { t: "J_UBAH", d: 15 }, { t: "J_UBAH", d: 15 }]), { t: "J_CEK" }).pernah.join() === "jenis:lancip,jam:1", "B: jawaban salah dan ulang tidak mencabut atau menggandakan riwayat");

  // Fuzz 20.000 aksi.
  const acak = acakDari(777);
  let s = xb0;
  let ok = true;
  const pesanSemua = new Set();
  const riwayatSemua = new Set();
  const N = ["titik", "kaki", "daerah"];
  for (let n = 0; n < 20000; n += 1) {
    const pil = acak(24);
    const sorot = B.sorotBagian(s);
    const benarJam = timbangJam(B.DATA_JAM[s.jam.data]);
    const a =
      pil === 0 ? { t: "G_DATA", i: acak(3) - (acak(8) === 0 ? 1 : 0) } :
      pil === 1 || pil === 2 ? { t: "G_NAMA", nama: N[acak(3)] } :
      pil === 3 || pil === 4 ? { t: "G_NAMA", nama: sorot === null ? "titik" : KAT[sorot] } :
      pil === 5 ? { t: "G_NAMA", nama: "x" } :
      pil === 6 ? { t: "J_TUGAS", i: acak(4) - (acak(8) === 0 ? 1 : 0) } :
      pil === 7 || pil === 8 || pil === 9 ? { t: "J_UBAH", d: [15, -15, 15, -15, 10, 0][acak(6)] } :
      pil === 10 || pil === 11 ? { t: "J_CEK" } :
      pil === 12 ? { t: "M_DATA", i: acak(7) } :
      pil === 13 || pil === 14 ? { t: "M_JAWAB", jawab: ["lancip", "siku", "tumpul", "x"][acak(4)] } :
      pil === 15 ? { t: "M_JAWAB", jawab: benarJam } :
      pil === 16 || pil === 17 ? { t: "J_UBAH", d: 15 } :
      acak(40) === 0 ? { t: "RESET" } : { t: "PESAN_KOSONG" };
    const t = LB(s, a);
    if (a.t !== "RESET" && !s.pernah.every((v) => t.pernah.includes(v))) ok = false;
    if (!(t.bagian.data >= 0 && t.bagian.data < 2 && t.bagian.langkah >= 0 && t.bagian.langkah <= 4)) ok = false;
    if (!(t.jenis.deg >= 15 && t.jenis.deg <= 165 && t.jenis.deg % 15 === 0 && t.jenis.tugas >= 0 && t.jenis.tugas < 3)) ok = false;
    if (!(t.jam.data >= 0 && t.jam.data < 6)) ok = false;
    for (const id of t.pernah) if (!IDB.test(id)) ok = false;
    for (const id of t.pernah) {
      if (s.pernah.includes(id)) continue;
      const [jenis, nomor] = id.split(":");
      if (jenis === "bagian" && !(t.bagian.data === Number(nomor) && t.bagian.langkah === 4 && a.t === "G_NAMA")) ok = false;
      if (jenis === "jenis" && !(a.t === "J_CEK" && B.TUGAS_JENIS[t.jenis.tugas] === nomor && timbang(t.jenis.deg) === nomor)) ok = false;
      if (jenis === "jam" && !(a.t === "M_JAWAB" && t.jam.data === Number(nomor) && a.jawab === timbangJam(B.DATA_JAM[Number(nomor)]))) ok = false;
    }
    if (t.pesan) {
      pesanSemua.add(t.pesan);
      if (!tanpaSembilanPuluh(t.pesan)) ok = false;
    }
    for (const id of t.pernah) riwayatSemua.add(id);
    s = t;
  }
  cek(ok, "fuzz 20.000 aksi Lab Sudut: batas terjaga, riwayat tidak dicabut dan hanya bila tercapai");
  cek(pesanSemua.size > 15 && [...pesanSemua].every(tanpaAngka), `fuzz Lab Sudut: semua ${pesanSemua.size} pesan dieja menjadi kata`);
  cek(pesanSemua.size > 15 && [...pesanSemua].every(tanpaSembilanPuluh), "fuzz Lab Sudut: tidak ada ukuran selain 90 di pesan");
  cek(riwayatSemua.size >= 8, `fuzz Lab Sudut: riwayat terkumpul (${[...riwayatSemua].sort().join(" ")})`);
  globalThis.__pesanB = [...pesanSemua];
}

/* ------------------------------ Mesin B ------------------------------ */
{
  const def = MS.MESIN_SUDUT;
  const urutLetak = (deg) => (timbang(deg) === "siku" ? "berimpit dengan" : timbang(deg) === "lancip" ? "masuk ke dalam" : "keluar dari");
  const REL = { lancip: "lebih sempit", siku: "sama besar", tumpul: "lebih lebar" };
  const NAMA = { lancip: "lancip", siku: "siku-siku", tumpul: "tumpul" };
  const KATA = ["dua belas", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas"];
  for (const [i, k] of MS.KASUS_SUDUT.entries()) {
    const c = def.kasus[i];
    const [tunjuk, banding, jenis, jam] = c.langkah;
    cek(tunjuk.benar === k.bagian.nama && tunjuk.tanya.includes(k.konteks) && tunjuk.tanya.toLowerCase().includes(k.bagian.uraian), `Mesin B ${k.id}: bagian ${k.bagian.nama}`);
    sama([...tunjuk.opsi].sort(), ["daerah sudut", "kaki sudut", "titik sudut"], `Mesin B ${k.id}: pilihan tunjuk tiga nama`);
    const jb = timbang(k.deg);
    cek(banding.benar === REL[jb] && banding.tanya.includes(`Kaki sudut kedua ${urutLetak(k.deg)} patokan`), `Mesin B ${k.id}: hubungan dengan patokan ${REL[jb]} (timbangan)`);
    sama([...banding.opsi].sort(), ["lebih lebar", "lebih sempit", "sama besar"], `Mesin B ${k.id}: pilihan banding tiga hubungan`);
    cek(jenis.benar === NAMA[jb] && jenis.tanya.includes(`Sudut yang ${REL[jb]} dari patokan`), `Mesin B ${k.id}: jenis ${NAMA[jb]}`);
    sama([...jenis.opsi].sort(), ["lancip", "siku-siku", "tumpul"], `Mesin B ${k.id}: pilihan jenis tiga jenis`);
    const jj = timbangJam(k.pukul);
    cek(jam.benar === NAMA[jj] && jam.tanya.includes(`pukul ${KATA[k.pukul]}`) && jam.tanya.includes(`angka ${KATA[k.pukul]}`), `Mesin B ${k.id}: pukul ${k.pukul} sudut ${NAMA[jj]} (timbangan vektor)`);
    sama([...jam.opsi].sort(), ["lancip", "siku-siku", "tumpul"], `Mesin B ${k.id}: pilihan jam tiga jenis`);
    cek(c.ringkas.includes(k.bagian.nama) && c.ringkas.includes(NAMA[jb]) && c.ringkas.includes(`Pukul ${KATA[k.pukul]}`) && c.ringkas.endsWith(`${NAMA[jj]}.`), `Mesin B ${k.id}: ringkas memuat hasil benar`);
  }
  sama(MS.KASUS_SUDUT.map((k) => k.id), ["jam", "gunting", "kipas"], "Mesin B: tiga kasus");
  sama(MS.KASUS_SUDUT.map((k) => [k.bagian.nama, k.deg, k.pukul]), [["titik sudut", 60, 8], ["kaki sudut", 130, 3], ["daerah sudut", 90, 2]], "Mesin B: data tiga kasus sesuai rancangan");
  sama(MS.KASUS_SUDUT.map((k) => timbang(k.deg)), ["lancip", "tumpul", "siku"], "Mesin B: jenis sudut benda lancip, tumpul, siku");
  sama(MS.KASUS_SUDUT.map((k) => timbangJam(k.pukul)), ["tumpul", "siku", "lancip"], "Mesin B: jenis sudut jam tumpul, siku, lancip");
  cek(MS.KASUS_SUDUT.every((k) => k.pukul !== 6 && k.pukul !== 12 && (k.deg === 90 || Math.abs(k.deg - 90) >= 20)), "Mesin B: bukan pukul 6 atau 12, bukan siku berbeda paling sedikit 20 dari siku");
  const ketiga = def.kasus.map((c) => c.langkah.map((l) => l.opsi.indexOf(l.benar)).join(""));
  cek(new Set(def.kasus.flatMap((c) => c.langkah.map((l) => l.opsi.indexOf(l.benar)))).size === 3, `Mesin B: letak kunci bervariasi (${ketiga.join(" ")})`);
}

/* ------------------------------ Skenario B ------------------------------ */
{
  const S = SK.SKENARIO_K5B6B;
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
  sama(S.id.replace(/-k5b6$/, ""), K6.ID_SKENARIO_K5B6.B, "id skenario B sesuai id misi");
  const adegan = (id) => S.adegan.find((a) => a.id === id);
  const arti = adegan("arti").opsi.find((o) => o.benar);
  cek(/dua garis yang bertemu di satu titik/.test(arti.teks) && adegan("arti").opsi.filter((o) => !o.benar).every((o) => !/dua garis yang bertemu/.test(o.teks)), "B: arti sudut dua garis bertemu di satu titik, pengecoh salah");
  const bagian = adegan("bagian").soal;
  cek(bagian[0].jawaban === "sudut" && bagian[0].opsi.includes("sudut") && bagian[0].opsi.length === 3 && bagian[1].jawaban === "kaki" && bagian[1].opsi.length === 3 && bagian[1].opsi.includes("kaki"), "B: titik sudut dan kaki sudut, tiga pilihan");
  const kaki = adegan("kaki");
  cek(kaki.jumlah === 2 + 2 && kaki.jumlah <= 12 && kaki.cerita.includes("2 kaki sudut") && kaki.sukses.includes("2 kaki sudut ditambah 2 kaki sudut") && kaki.sukses.includes("4 kaki sudut"), "B: gunting 2 kaki dan jam 2 kaki, seluruhnya 4");
  const segitiga = adegan("segitiga");
  cek(segitiga.target === 3 && segitiga.target <= segitiga.maks && segitiga.maks <= 20 && segitiga.cerita.includes("segitiga") && segitiga.sukses.includes("3 pojok"), "B: segitiga 3 pojok sama dengan 3 titik sudut");
  const jamA = adegan("jam");
  const bb = jamA.opsi.find((o) => o.benar);
  cek(timbangJam(2) === "lancip" && /^lancip/.test(bb.teks) && /pukul dua/.test(jamA.cerita) && jamA.opsi.filter((o) => !o.benar).every((o) => !/^lancip/.test(o.teks)) && jamA.opsi.some((o) => /^tumpul, karena lebih lebar/.test(o.teks)) && jamA.opsi.some((o) => /^siku-siku, karena berimpit/.test(o.teks)), "B: pukul dua lancip (timbangan vektor), pengecoh tumpul dan siku-siku salah");
  const posisi = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
  cek(new Set(posisi).size === posisi.length, `B: letak jawaban pilih bervariasi (${posisi.join("")})`);
}

/* ------------------------------ Misi B ------------------------------ */
{
  const capai = (aksi) => M0.misiBaru(K6.MISI_B, B.keadaanSudutK5B6B(jalan(B.awalSudutK5B6B(), LB, aksi)), new Set());
  const namai = (i) => {
    const aksi = [{ t: "G_DATA", i }];
    for (const bagian of B.DATA_BAGIAN[i].urutan) aksi.push({ t: "G_NAMA", nama: KAT[bagian] });
    return aksi;
  };
  cek(capai(namai(0)).join() === "b-bagian" && capai(namai(1)).join() === "b-bagian-dua", "B: menamai keempat bagian huruf V memenuhi misi, gunting terbuka memenuhi tantangan");
  cek(capai(namai(0).slice(0, 4)).length === 0 && capai([{ t: "G_DATA", i: 0 }, { t: "G_NAMA", nama: "titik" }, { t: "G_NAMA", nama: "kaki" }, { t: "G_NAMA", nama: "daerah" }, { t: "G_NAMA", nama: "kaki" }]).length === 0, "B: menamai kurang dari empat bagian atau salah nama tidak memenuhi");
  cek(capai([...namai(0), ...namai(1)]).join() === "b-bagian,b-bagian-dua", "B: dua sudut bersamaan");
  const jenis = (tugas, naik) => {
    const aksi = [{ t: "J_TUGAS", i: tugas }];
    for (let n = 0; n < Math.abs(naik); n += 1) aksi.push({ t: "J_UBAH", d: naik > 0 ? 15 : -15 });
    aksi.push({ t: "J_CEK" });
    return aksi;
  };
  cek(capai(jenis(0, 0)).join() === "b-lancip" && capai(jenis(1, 2)).join() === "b-siku" && capai(jenis(2, 3)).join() === "b-tumpul", "B: lancip pada 60, siku-siku pada 90, tumpul pada 105 memenuhi (timbangan)");
  cek(capai(jenis(0, 2)).length === 0 && capai(jenis(1, 1)).length === 0 && capai(jenis(1, 3)).length === 0 && capai(jenis(2, 2)).length === 0 && capai(jenis(2, -1)).length === 0, "B: tugas lancip di 90, siku-siku di 75 atau 105, tumpul di 90 atau 45 tidak memenuhi");
  cek(capai([...jenis(0, 0), ...jenis(1, 2), ...jenis(2, 3)]).join() === "b-lancip,b-siku,b-tumpul", "B: tiga jenis bersamaan");
  cek(capai([{ t: "J_UBAH", d: 15 }, { t: "J_UBAH", d: 15 }]).length === 0, "B: sudut diatur tanpa tekan Cek tidak memenuhi");
  const jam = (i, jawab = timbangJam(B.DATA_JAM[i])) => [{ t: "M_DATA", i }, { t: "M_JAWAB", jawab }];
  cek(capai(jam(0)).join() === "b-jam" && capai(jam(1)).join() === "b-jam-siku" && capai(jam(2)).join() === "b-jam-tumpul", "B: pukul dua, tiga, empat memenuhi");
  cek(capai(jam(0, "tumpul")).length === 0 && capai(jam(1, "lancip")).length === 0 && capai(jam(2, "siku")).length === 0, "B: jawaban jam tertukar tidak memenuhi");
  cek(capai(jam(3)).length === 0 && capai(jam(4)).length === 0 && capai(jam(5)).length === 0, "B: pukul delapan, satu, lima tidak memenuhi misi mana pun");
  cek(capai([...namai(0), ...jenis(0, 0), ...jenis(1, 2), ...jenis(2, 3), ...jam(0)]).join() === "b-bagian,b-lancip,b-siku,b-tumpul,b-jam", "B: lima misi lab wajib bersamaan");
  cek(M0.misiBaru(K6.MISI_B, { alat: "pojok", pernah: ["bagian:0", "jenis:lancip", "jenis:siku", "jenis:tumpul", "jam:0"] }, new Set()).length === 0, "B: riwayat alat lain (pojok) tidak memenuhi misi B");
  cek(M0.misiBaru(K6.MISI_A, { alat: "sudut", pernah: ["lipat:0", "banding:0"] }, new Set()).length === 0, "B: riwayat alat sudut tidak memenuhi misi A");
}

/* ------------------------------ Konsep tidak bocor ke Sub-Bab B ------------------------------ */
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
  // Sub-Bab B tidak memakai konsep sub-bab berikutnya: mengukur (C): busur, skala, derajat selain 90, sudut nol, lurus,
  // penuh, releks; melukis (D): lukis, gambar sudut dengan ukuran.
  const BOCOR_B = /(\bbusur\b|\bskala\b|\breleks\b|\brefleks\b|\bsudut nol\b|\bsudut lurus\b|\bsudut penuh\b|\bmelukis\b|\blukis\w*|\bprotractor\b|\bukur\w*|\bkawat\b)/i;
  const derajatLain = (t) => /(?<![\d])(?!90\b)\d+\s*°/.test(t);
  const catat = (teks, apa) => {
    const m = BOCOR_B.exec(teks);
    cek(!m, `B: ${apa} bebas konsep sub-bab berikutnya (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
    cek(!derajatLain(teks), `B: ${apa} tidak menulis ukuran derajat selain 90`);
  };
  for (const t of [TK.MISI_K5B6.B, TK.NAMA_SIM_K5B6.B, ...K6.MISI_B.map((m) => m.teks)]) catat(t, "teks misi");
  for (const [nama, o] of [["mesin", MS.MESIN_SUDUT], ["skenario", SK.SKENARIO_K5B6B], ["peta dan infografis ringkas", ringkas.subBab.B]]) catat(teksDari(o), nama);
  for (const [f, e] of [["SimulasiLabSudutK5B6", "tsx"], ["model-sudut-k5b6", "tsx"], ["lab-sudut-k5b6b", "ts"]]) catat(tanpaKomentar(baca(f, e)), `${f} (tanpa komentar)`);
  for (const p of globalThis.__pesanB) catat(p, "pesan lab dari fuzz");
  const ucapan = [];
  for (let i = 0; i < B.DATA_BAGIAN.length; i += 1) {
    let s = LB(xb0, { t: "G_DATA", i });
    ucapan.push(B.ucapBagianK5B6B(s));
    for (const bagian of B.DATA_BAGIAN[i].urutan) s = LB(s, { t: "G_NAMA", nama: KAT[bagian] });
    ucapan.push(B.ucapBagianK5B6B(s));
  }
  for (let i = 0; i < 3; i += 1) ucapan.push(B.ucapJenisK5B6B(LB(xb0, { t: "J_TUGAS", i })));
  for (let i = 0; i < B.DATA_JAM.length; i += 1) ucapan.push(B.ucapJamK5B6B(LB(xb0, { t: "M_DATA", i })));
  cek(ucapan.length === 13 && ucapan.every(tanpaAngka), `semua ${ucapan.length} ucapan Lab Sudut dieja menjadi kata`);
  for (const u of ucapan) catat(u, "ucapan lab");
  {
    const s = baca("SimulasiLabSudutK5B6", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s), "lab B: lapor keadaan lewat useEffect");
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), "lab B: ganti tampilan mengosongkan pesan");
    const catatan = [...s.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 3 && catatan.every(tanpaAngka), "lab B: Coba ini dapat dieja");
    cek(/aria-label=\{`Namai \$\{SEBUT_BAGIAN\[n\]\}`\}/.test(s) && /aria-label="Tutup sudut lebih sempit"/.test(s) && /aria-label="Buka sudut lebih lebar"/.test(s) && /aria-label="Cek sudut"/.test(s) && /aria-label="Pilih lancip"/.test(s) && /aria-label="Pilih siku-siku"/.test(s) && /aria-label="Pilih tumpul"/.test(s), "lab B: tombol nama bagian, atur sudut, cek, dan pilihan jam berlabel");
    const m = baca("model-sudut-k5b6", "tsx");
    cek(/role="img"/.test(m) && (m.match(/aria-label=\{`Gambar /g) ?? []).length === 2, "model B: dua gambar berlabel");
  }
  // Ringkas B dihitung ulang mandiri.
  const B0 = ringkas.subBab.B;
  const butir = (panel, id) => panel.butir.find((b) => b.id === id);
  const [p1, p2, p3] = B0.infografis.panel;
  cek(butir(p1, "titik").visual.isi === "1 titik sudut" && butir(p1, "kaki").visual.isi === "2 kaki sudut" && butir(p1, "kaki").suara.includes("dua kaki"), "ringkas B: satu titik sudut dan dua kaki sudut");
  const [lancip, tumpul] = p2.sisi;
  cek(lancip.visual.isi === "< 90°" && tumpul.visual.isi === "> 90°" && p2.kesimpulan.includes("90°"), "ringkas B: lancip kurang dari 90 dan tumpul lebih dari 90");
  cek(timbangJam(2) === "lancip" && butir(p3, "dua").visual.isi === "lancip" && butir(p3, "dua").label === "Pukul 2" && butir(p3, "dua").suara.includes("pukul dua"), "ringkas B: pukul dua lancip (timbangan vektor)");
  cek(timbangJam(3) === "siku" && butir(p3, "tiga").visual.isi === "∟ = 90°" && butir(p3, "tiga").label === "Pukul 3", "ringkas B: pukul tiga siku-siku (timbangan vektor)");
  cek(timbangJam(4) === "tumpul" && butir(p3, "empat").visual.isi === "tumpul" && butir(p3, "empat").label === "Pukul 4", "ringkas B: pukul empat tumpul (timbangan vektor)");
  const kartu = (id) => B0.peta.kartu.find((k) => k.id === id).teks;
  cek(kartu("b-dua") === "Jam pukul 2: sudut lancip" && kartu("b-tiga") === "Jam pukul 3: sudut siku-siku", "ringkas B: kartu jam");
  cek(B0.peta.cabang.map((c) => c.id).join() === "bagian,daerah,jenis,jam", "ringkas B: empat cabang");
}

/* ============================== Sub-Bab C: Lab Busur ============================== */
// Nama sudut ditimbang dengan kuadran: tanda sin dan cos pada lingkaran satuan (bukan dengan pembandingan ukuran seperti di kode).
const klasifikasi = (deg) => {
  if (deg === 0) return "nol";
  if (deg === 360) return "penuh";
  const r = (deg * Math.PI) / 180;
  const sn = Math.round(Math.sin(r) * 1e9) / 1e9;
  const cs = Math.round(Math.cos(r) * 1e9) / 1e9;
  if (sn < 0) return "releks";
  if (sn === 0) return "lurus";
  return cs > 0 ? "lancip" : cs === 0 ? "siku" : "tumpul";
};
// Bacaan skala dari geometri: sinar pada sudut phi dari sumbu kanan (0 sampai 180). Skala dalam nol di kanan (bacaan = phi),
// skala luar nol di kiri (bacaan = 180 dikurangi phi).
const bacaanSkala = (sisi, deg) => {
  const phi = sisi === "kanan" ? deg : 180 - deg;
  return { dalam: phi, luar: 180 - phi };
};
const LC = C.langkahBusurK5B6C;
const xc0 = C.awalBusurK5B6C();
const IDC = /^(pasang:[0-2]|baca:[0-2]|patokan:[0-6])$/;
const NAMA_C = ["nol", "lancip", "siku", "tumpul", "lurus", "releks", "penuh"];
{
  cek(xc0.pernah.length === 0 && xc0.pesan === "" && xc0.pasang.data === 0 && xc0.pasang.geser === 2 && xc0.pasang.putar === 15 && xc0.baca.skala === null && xc0.baca.data === 0 && xc0.patokan.data === 0, "C awal: kosong, belum ada riwayat");
  cek(C.DATA_PASANG.length === 3 && C.DATA_BACA.length === 3 && C.DATA_PATOKAN.length === 7, "C: tiga sudut Pasang, tiga sudut Baca, tujuh ukuran Patokan");
  sama(C.DATA_PASANG.map((d) => [d.nama, d.deg, d.geser, d.putar]), [["sudut kipas Pakarena", 125, 2, 15], ["sudut jarum jam", 30, -1, -30], ["sudut lipatan kertas", 90, 1, -15]], "C: data tiga sudut Pasang sesuai rancangan");
  cek(C.DATA_PASANG.every((d) => d.geser !== 0 && Math.abs(d.geser) <= C.GESER_BATAS && d.putar !== 0 && Math.abs(d.putar) <= C.PUTAR_BATAS && d.putar % C.PUTAR_LANGKAH === 0 && d.deg > 0 && d.deg < 180), "C: geser dan putar awal tidak nol, di dalam batas, sudut dapat diukur busur");
  sama(C.DATA_BACA.map((d) => [d.nama, d.deg, d.sisi]), [["kipas Pakarena", 125, "kanan"], ["pintu lemari", 50, "kiri"], ["atap rumah", 70, "kanan"]], "C: data tiga sudut Baca sesuai rancangan");
  sama(C.DATA_PATOKAN, [0, 45, 90, 130, 180, 270, 360], "C: tujuh ukuran Patokan sesuai rancangan");
  sama(C.DATA_PATOKAN.map(klasifikasi), ["nol", "lancip", "siku", "tumpul", "lurus", "releks", "penuh"], "C: ketujuh ukuran Patokan, satu untuk tiap nama (timbangan kuadran)");
  for (let d = 0; d <= 360; d += 1) cek(C.jenisUkuran(d) === klasifikasi(d), `C: jenis ukuran ${d} sama dengan timbangan kuadran`);
  cek(Object.values(C.RENTANG).every((t) => /°/.test(t)) && Object.keys(C.SEBUT_UKURAN).join() === NAMA_C.join(), "C: rentang dan sebutan memuat ketujuh nama");

  // Pasang.
  for (const [i, d] of C.DATA_PASANG.entries()) {
    const nama = d.nama;
    const awal = LC(xc0, { t: "P_DATA", i });
    cek(awal.pasang.data === i && awal.pasang.geser === d.geser && awal.pasang.putar === d.putar && awal.pernah.length === 0, `Pasang ${nama}: dipilih, busur belum terpasang`);
    // Geser saja atau putar saja tidak cukup.
    const periksaAwal = LC(awal, { t: "P_CEK" });
    cek(periksaAwal.pernah.length === 0 && /Pusat busur belum tepat/.test(periksaAwal.pesan) && periksaAwal.pesan.includes(d.geser > 0 ? "di kanan titik sudut" : "di kiri titik sudut") && periksaAwal.pesan.includes(d.geser > 0 ? "ke kiri" : "ke kanan"), `Pasang ${nama}: periksa sebelum digeser menyarankan arah geser`);
    for (const buruk of [0, 2, -2, 15]) sama(LC(awal, { t: "P_GESER", d: buruk }).pasang, awal.pasang, `Pasang ${nama}: geser ${buruk} bukan satu langkah diabaikan`);
    for (const buruk of [0, 10, 30, 1]) sama(LC(awal, { t: "P_PUTAR", d: buruk }).pasang, awal.pasang, `Pasang ${nama}: putar ${buruk} bukan 15 derajat diabaikan`);
    // Hanya digeser: pusat benar, dasar belum.
    let s = awal;
    const arahG = d.geser > 0 ? -1 : 1;
    for (let n = 0; n < Math.abs(d.geser); n += 1) s = LC(s, { t: "P_GESER", d: arahG });
    cek(s.pasang.geser === 0, `Pasang ${nama}: digeser ${Math.abs(d.geser)} langkah, pusat tepat`);
    const hanyaGeser = LC(s, { t: "P_CEK" });
    cek(hanyaGeser.pernah.length === 0 && /Garis dasar busur belum berimpit/.test(hanyaGeser.pesan) && hanyaGeser.pesan.includes(d.putar > 0 ? "masih miring ke kiri" : "masih miring ke kanan") && hanyaGeser.pesan.includes(d.putar > 0 ? "Putar busur ke kanan" : "Putar busur ke kiri"), `Pasang ${nama}: pusat tepat tetapi dasar belum, ditolak dengan arah putar`);
    // Hanya diputar: dasar benar, pusat belum.
    let t = awal;
    const arahP = d.putar > 0 ? -15 : 15;
    for (let n = 0; n < Math.abs(d.putar) / 15; n += 1) t = LC(t, { t: "P_PUTAR", d: arahP });
    cek(t.pasang.putar === 0, `Pasang ${nama}: diputar ${Math.abs(d.putar) / 15} langkah, dasar berimpit`);
    const hanyaPutar = LC(t, { t: "P_CEK" });
    cek(hanyaPutar.pernah.length === 0 && /Pusat busur belum tepat/.test(hanyaPutar.pesan), `Pasang ${nama}: dasar berimpit tetapi pusat belum, ditolak`);
    // Keduanya.
    let u = s;
    for (let n = 0; n < Math.abs(d.putar) / 15; n += 1) u = LC(u, { t: "P_PUTAR", d: arahP });
    const jadi = LC(u, { t: "P_CEK" });
    cek(u.pasang.geser === 0 && u.pasang.putar === 0 && jadi.pernah.join() === `pasang:${i}` && jadi.pesan.startsWith("✅"), `Pasang ${nama}: pusat dan dasar tepat, dicatat pasang:${i}`);
    cek(LC(jadi, { t: "P_DATA", i }).pasang.geser === d.geser && LC(jadi, { t: "P_DATA", i }).pernah.join() === `pasang:${i}`, `Pasang ${nama}: mulai lagi mengembalikan busur, riwayat tetap`);
    // Batas.
    let kanan = awal;
    for (let n = 0; n < 10; n += 1) kanan = LC(kanan, { t: "P_GESER", d: 1 });
    let kiri = awal;
    for (let n = 0; n < 10; n += 1) kiri = LC(kiri, { t: "P_GESER", d: -1 });
    cek(kanan.pasang.geser === C.GESER_BATAS && kiri.pasang.geser === -C.GESER_BATAS && /ujung geseran/.test(kanan.pesan), `Pasang ${nama}: geser berhenti di batas ${C.GESER_BATAS}`);
    let ccw = awal;
    for (let n = 0; n < 10; n += 1) ccw = LC(ccw, { t: "P_PUTAR", d: 15 });
    let cw = awal;
    for (let n = 0; n < 10; n += 1) cw = LC(cw, { t: "P_PUTAR", d: -15 });
    cek(ccw.pasang.putar === C.PUTAR_BATAS && cw.pasang.putar === -C.PUTAR_BATAS && /ujung putaran/.test(ccw.pesan), `Pasang ${nama}: putar berhenti di batas ${C.PUTAR_BATAS}`);
  }
  cek(LC(xc0, { t: "P_DATA", i: 3 }) === xc0 && LC(xc0, { t: "P_DATA", i: -1 }) === xc0, "Pasang: sudut di luar daftar diabaikan");

  // Baca.
  for (const [i, d] of C.DATA_BACA.entries()) {
    const nama = d.nama;
    const bs = bacaanSkala(d.sisi, d.deg);
    const benarSkala = bs.dalam === d.deg ? "dalam" : "luar";
    const salahSkala = benarSkala === "dalam" ? "luar" : "dalam";
    cek(C.SKALA_UNTUK[d.sisi] === benarSkala && C.skalaBenar(d) === benarSkala && bs[benarSkala] === d.deg && bs[salahSkala] === 180 - d.deg, `Baca ${nama}: kaki pertama di ${d.sisi}, skala ${benarSkala} membaca ${d.deg} (geometri)`);
    const o = C.opsiBaca(d);
    cek(o.length === 3 && new Set(o).size === 3 && o.includes(d.deg) && o.includes(180 - d.deg) && o.includes(d.deg + 10) && o.every((n) => n > 0 && n < 180) && [...o].sort((a, b) => a - b).join() === o.join(), `Baca ${nama}: tiga angka unik, terurut, memuat ukuran, angka skala lain, dan ukuran ditambah 10`);
    const xb = LC(xc0, { t: "B_DATA", i });
    cek(xb.baca.data === i && xb.baca.skala === null, `Baca ${nama}: dipilih, skala belum dipilih`);
    // Angka sebelum skala ditolak walau benar.
    for (const n of o) {
      const t = LC(xb, { t: "B_ANGKA", nilai: n });
      cek(t.pernah.length === 0 && /Pilih dulu skala/.test(t.pesan), `Baca ${nama}: angka ${n} sebelum memilih skala ditolak`);
    }
    // Skala salah ditolak dan tidak terpilih.
    const sk = LC(xb, { t: "B_SKALA", skala: salahSkala });
    cek(sk.baca.skala === null && !sk.pesan.startsWith("✅") && sk.pesan.includes(`pakai skala ${benarSkala}`), `Baca ${nama}: skala ${salahSkala} ditolak dengan petunjuk skala ${benarSkala}`);
    const sb = LC(xb, { t: "B_SKALA", skala: benarSkala });
    cek(sb.baca.skala === benarSkala && sb.pesan.startsWith("✅"), `Baca ${nama}: skala ${benarSkala} diterima`);
    cek(LC(xb, { t: "B_SKALA", skala: "tengah" }) === xb && LC(xb, { t: "B_SKALA", skala: "" }) === xb, `Baca ${nama}: skala di luar pilihan diabaikan`);
    // Angka.
    for (const n of o) {
      const t = LC(sb, { t: "B_ANGKA", nilai: n });
      const betul = n === d.deg;
      cek(betul ? t.pernah.join() === `baca:${i}` && t.pesan.startsWith("✅") && t.pesan.includes(`${d.deg}°`) : t.pernah.length === 0 && !t.pesan.startsWith("✅"), `Baca ${nama}: angka ${n} ${betul ? "benar dicatat" : "salah tidak dicatat"}`);
    }
    const lain = LC(sb, { t: "B_ANGKA", nilai: 180 - d.deg });
    cek(/skala yang satunya/.test(lain.pesan) && lain.pesan.includes(String(180 - d.deg)), `Baca ${nama}: angka dari skala yang satunya dijelaskan`);
    cek(LC(sb, { t: "B_ANGKA", nilai: 999 }) === sb && LC(sb, { t: "B_ANGKA", nilai: 0 }) === sb, `Baca ${nama}: angka di luar pilihan diabaikan`);
    // Skala salah setelah skala benar melepas pilihan.
    cek(LC(sb, { t: "B_SKALA", skala: salahSkala }).baca.skala === null, `Baca ${nama}: memilih skala salah melepas pilihan`);
  }
  cek(LC(xc0, { t: "B_DATA", i: 3 }) === xc0 && LC(xc0, { t: "B_DATA", i: -1 }) === xc0, "Baca: sudut di luar daftar diabaikan");

  // Patokan.
  for (const [i, deg] of C.DATA_PATOKAN.entries()) {
    const benar = klasifikasi(deg);
    const xt = LC(xc0, { t: "T_DATA", i });
    cek(C.ukuranPatokan(xt) === deg && xt.pernah.length === 0, `Patokan ${deg}: dipilih`);
    for (const n of NAMA_C) {
      const t = LC(xt, { t: "T_JAWAB", nama: n });
      const betul = n === benar;
      cek(betul ? t.pernah.join() === `patokan:${i}` && t.pesan.startsWith("✅") && t.pesan.includes(`${deg}°`) : t.pernah.length === 0 && !t.pesan.startsWith("✅") && t.pesan.includes(`${deg}° bukan ${C.SEBUT_UKURAN[n]}`), `Patokan ${deg}: nama ${n} ${betul ? "benar dicatat" : "salah tidak dicatat"}`);
    }
    cek(LC(xt, { t: "T_JAWAB", nama: "segitiga" }) === xt && LC(xt, { t: "T_JAWAB", nama: "" }) === xt, `Patokan ${deg}: nama di luar pilihan diabaikan`);
  }
  const rel = LC(LC(xc0, { t: "T_DATA", i: 5 }), { t: "T_JAWAB", nama: "releks" });
  cek(/bukan tumpul/.test(rel.pesan) && /kurang dari 180°/.test(rel.pesan), "Patokan 270: pesan benar menyebut bukan tumpul");
  const tum = LC(LC(xc0, { t: "T_DATA", i: 5 }), { t: "T_JAWAB", nama: "tumpul" });
  cek(/bukan sudut tumpul/.test(tum.pesan) && /lebih dari 90° dan kurang dari 180°/.test(tum.pesan), "Patokan 270: menjawab tumpul ditolak dengan rentang tumpul");
  cek(LC(xc0, { t: "T_DATA", i: 7 }) === xc0 && LC(xc0, { t: "T_DATA", i: -1 }) === xc0, "Patokan: ukuran di luar daftar diabaikan");

  // Reset, pesan kosong, riwayat tidak dicabut.
  const sat = jalan(xc0, LC, [{ t: "T_DATA", i: 2 }, { t: "T_JAWAB", nama: "siku" }, { t: "B_DATA", i: 1 }, { t: "B_SKALA", skala: "luar" }, { t: "B_ANGKA", nilai: 50 }]);
  cek(sat.pernah.join() === "patokan:2,baca:1", "C: riwayat Patokan dan Baca terkumpul berurutan");
  sama(LC(sat, { t: "RESET" }), xc0, "C: reset mengembalikan keadaan awal");
  cek(LC(sat, { t: "PESAN_KOSONG" }).pesan === "" && LC(sat, { t: "PESAN_KOSONG" }).pernah.join() === sat.pernah.join(), "C: pesan dikosongkan, riwayat tetap");
  cek(LC(sat, { t: "T_JAWAB", nama: "lancip" }).pernah.join() === sat.pernah.join() && LC(LC(sat, { t: "T_JAWAB", nama: "siku" }), { t: "T_JAWAB", nama: "siku" }).pernah.join() === sat.pernah.join(), "C: jawaban salah dan ulang tidak mencabut atau menggandakan riwayat");

  // Fuzz 20.000 aksi.
  const acak = acakDari(31337);
  let st = xc0;
  let ok = true;
  const pesanSemua = new Set();
  const riwayatSemua = new Set();
  for (let n = 0; n < 20000; n += 1) {
    const pil = acak(30);
    const dBaca = C.dataBaca(st);
    const dPas = C.dataPasang(st);
    const a =
      pil === 0 ? { t: "P_DATA", i: acak(4) - (acak(8) === 0 ? 1 : 0) } :
      pil === 1 || pil === 2 || pil === 3 ? { t: "P_GESER", d: [1, -1, 1, -1, 2, 0][acak(6)] } :
      pil === 4 || pil === 5 || pil === 6 ? { t: "P_PUTAR", d: [15, -15, 15, -15, 30, 10][acak(6)] } :
      pil === 7 || pil === 8 ? { t: "P_GESER", d: dPas.geser === st.pasang.geser && st.pasang.geser !== 0 ? -Math.sign(st.pasang.geser) : 1 } :
      pil === 9 || pil === 10 ? { t: "P_PUTAR", d: st.pasang.putar !== 0 ? -15 * Math.sign(st.pasang.putar) : 15 } :
      pil === 11 || pil === 12 ? { t: "P_CEK" } :
      pil === 13 ? { t: "B_DATA", i: acak(4) - (acak(8) === 0 ? 1 : 0) } :
      pil === 14 || pil === 15 ? { t: "B_SKALA", skala: ["dalam", "luar", "tengah"][acak(3)] } :
      pil === 16 ? { t: "B_SKALA", skala: C.skalaBenar(dBaca) } :
      pil === 17 || pil === 18 ? { t: "B_ANGKA", nilai: [...C.opsiBaca(dBaca), 0][acak(4)] } :
      pil === 19 ? { t: "B_ANGKA", nilai: dBaca.deg } :
      pil === 20 ? { t: "T_DATA", i: acak(8) - (acak(8) === 0 ? 1 : 0) } :
      pil === 21 || pil === 22 || pil === 23 ? { t: "T_JAWAB", nama: [...NAMA_C, "x"][acak(8)] } :
      pil === 24 ? { t: "T_JAWAB", nama: klasifikasi(C.ukuranPatokan(st)) } :
      acak(40) === 0 ? { t: "RESET" } : { t: "PESAN_KOSONG" };
    const t = LC(st, a);
    if (a.t !== "RESET" && !st.pernah.every((v) => t.pernah.includes(v))) ok = false;
    if (!(t.pasang.data >= 0 && t.pasang.data < 3 && Math.abs(t.pasang.geser) <= 3 && Math.abs(t.pasang.putar) <= 45 && t.pasang.putar % 15 === 0)) ok = false;
    if (!(t.baca.data >= 0 && t.baca.data < 3 && [null, "dalam", "luar"].includes(t.baca.skala))) ok = false;
    if (t.baca.skala !== null && t.baca.skala !== C.skalaBenar(C.dataBaca(t))) ok = false;
    if (!(t.patokan.data >= 0 && t.patokan.data < 7)) ok = false;
    for (const id of t.pernah) if (!IDC.test(id)) ok = false;
    for (const id of t.pernah) {
      if (st.pernah.includes(id)) continue;
      const [jenis, nomor] = id.split(":");
      const nn = Number(nomor);
      if (jenis === "pasang" && !(a.t === "P_CEK" && t.pasang.data === nn && t.pasang.geser === 0 && t.pasang.putar === 0)) ok = false;
      if (jenis === "baca" && !(a.t === "B_ANGKA" && t.baca.data === nn && t.baca.skala === C.skalaBenar(C.DATA_BACA[nn]) && a.nilai === C.DATA_BACA[nn].deg)) ok = false;
      if (jenis === "patokan" && !(a.t === "T_JAWAB" && t.patokan.data === nn && a.nama === klasifikasi(C.DATA_PATOKAN[nn]))) ok = false;
    }
    if (t.pesan) pesanSemua.add(t.pesan);
    for (const id of t.pernah) riwayatSemua.add(id);
    st = t;
  }
  cek(ok, "fuzz 20.000 aksi Lab Busur: batas terjaga, riwayat tidak dicabut dan hanya bila tercapai");
  cek(pesanSemua.size > 25 && [...pesanSemua].every(tanpaAngka), `fuzz Lab Busur: semua ${pesanSemua.size} pesan dieja menjadi kata`);
  cek(riwayatSemua.size >= 9, `fuzz Lab Busur: riwayat terkumpul (${[...riwayatSemua].sort().join(" ")})`);
  globalThis.__pesanC = [...pesanSemua];
}

/* ------------------------------ Mesin C ------------------------------ */
{
  const def = MS.MESIN_BUSUR;
  const NAMA_PANJANG = { nol: "sudut nol", lancip: "sudut lancip", siku: "sudut siku-siku", tumpul: "sudut tumpul", lurus: "sudut lurus", releks: "sudut releks", penuh: "sudut penuh" };
  const URUT = ["nol", "lancip", "siku", "tumpul", "lurus", "releks", "penuh"];
  for (const [i, k] of MS.KASUS_BUSUR.entries()) {
    const c = def.kasus[i];
    const [pasang, skala, baca, jenis] = c.langkah;
    cek(pasang.benar === `${k.geser} langkah` && pasang.tanya.includes(`${k.geser} langkah di kanan titik sudut`) && pasang.tanya.includes(k.konteks), `Mesin C ${k.id}: geser ${k.geser} langkah`);
    cek(pasang.opsi.every((o) => o === pasang.benar || Number(o.split(" ")[0]) !== k.geser) && pasang.opsi.every((o) => Number(o.split(" ")[0]) > 0) && pasang.opsi.includes(`${k.geser + 1} langkah`), `Mesin C ${k.id}: pengecoh pasang salah dan positif`);
    const bs = bacaanSkala(k.sisi, k.deg);
    const sb = bs.dalam === k.deg ? "dalam" : "luar";
    cek(k.deg !== 90 || bs.dalam === bs.luar, `Mesin C ${k.id}: ukuran 90 berbacaan sama di kedua skala`);
    cek(k.deg === 90 ? true : skala.benar === `skala ${sb}`, `Mesin C ${k.id}: skala ${sb} untuk kaki pertama di ${k.sisi} (geometri)`);
    cek(skala.benar === `skala ${C.SKALA_UNTUK[k.sisi]}` && skala.tanya.includes(`sisi ${k.sisi}`), `Mesin C ${k.id}: skala sama dengan aturan nol di sisi kaki pertama`);
    sama([...skala.opsi].sort(), ["skala dalam", "skala luar", "skala mana saja"], `Mesin C ${k.id}: pilihan skala tiga`);
    cek(baca.benar === `${k.deg}°` && baca.tanya.includes(`angka ${bs.luar} pada skala luar dan angka ${bs.dalam} pada skala dalam`) && baca.tanya.includes(`sisi ${k.sisi}`), `Mesin C ${k.id}: ukuran ${k.deg}° dibaca dari skala yang nol di kaki pertama (geometri)`);
    cek(baca.opsi.every((o) => o === baca.benar || Number(o.replace("°", "")) !== k.deg) && baca.opsi.every((o) => Number(o.replace("°", "")) > 0 && Number(o.replace("°", "")) < 180), `Mesin C ${k.id}: pengecoh baca salah dan di dalam busur`);
    cek(k.deg === 90 || baca.opsi.includes(`${180 - k.deg}°`), `Mesin C ${k.id}: pengecoh baca memuat angka skala yang satunya`);
    const nm = NAMA_PANJANG[klasifikasi(k.jenisDeg)];
    cek(jenis.benar === nm && jenis.tanya.includes(`${k.jenisDeg}°`), `Mesin C ${k.id}: ${k.jenisDeg}° adalah ${nm} (timbangan kuadran)`);
    const pos = URUT.indexOf(klasifikasi(k.jenisDeg));
    const tetangga = [URUT[pos - 1] ?? URUT[pos + 2], URUT[pos + 1] ?? URUT[pos - 2]].map((n) => NAMA_PANJANG[n]);
    sama([...jenis.opsi].sort(), [nm, ...tetangga].sort(), `Mesin C ${k.id}: pengecoh jenis nama bersebelahan`);
    cek(c.ringkas.includes(`${k.geser} langkah`) && c.ringkas.includes(`skala ${C.SKALA_UNTUK[k.sisi]}`) && c.ringkas.includes(`${k.deg}°`) && c.ringkas.includes(nm), `Mesin C ${k.id}: ringkas memuat hasil benar`);
  }
  sama(MS.KASUS_BUSUR.map((k) => k.id), ["kipas", "jam", "lipatan"], "Mesin C: tiga kasus");
  sama(MS.KASUS_BUSUR.map((k) => [k.geser, k.sisi, k.deg, k.jenisDeg]), [[2, "kanan", 125, 125], [1, "kiri", 30, 180], [3, "kanan", 90, 270]], "Mesin C: data tiga kasus sesuai rancangan");
  sama(MS.KASUS_BUSUR.map((k) => klasifikasi(k.jenisDeg)), ["tumpul", "lurus", "releks"], "Mesin C: jenis tumpul, lurus, releks");
  const idx = def.kasus.flatMap((c) => c.langkah.map((l) => l.opsi.indexOf(l.benar)));
  cek(new Set(idx).size === 3, `Mesin C: letak kunci bervariasi (${idx.join("")})`);
}

/* ------------------------------ Skenario C ------------------------------ */
{
  const S = SK.SKENARIO_K5B6C;
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
  sama(S.id.replace(/-k5b6$/, ""), K6.ID_SKENARIO_K5B6.C, "id skenario C sesuai id misi");
  const adegan = (id) => S.adegan.find((a) => a.id === id);
  const sat = adegan("satuan").opsi.find((o) => o.benar);
  cek(/^derajat/.test(sat.teks) && adegan("satuan").opsi.filter((o) => !o.benar).every((o) => !/derajat/.test(o.teks.split(",")[0])), "C: satuan sudut derajat, pengecoh sentimeter dan liter salah");
  const busur = adegan("busur").soal;
  cek(busur[0].jawaban === "titik" && busur[1].jawaban === "kaki" && busur.every((q) => q.opsi.length === 3 && q.opsi.includes(q.jawaban)), "C: pusat busur di titik sudut, dasar berimpit kaki");
  const baca = adegan("baca").soal;
  const bacaKipas = bacaanSkala("kanan", 125);
  cek(baca[0].jawaban === "125" && baca[0].teks.includes("125") && baca[0].opsi.includes(String(bacaKipas.luar)) && baca[0].opsi.includes("125") && baca[0].opsi.filter((o) => o !== "125").every((o) => Number(o) !== 125), "C: kipas 125, pengecoh 55 (skala satunya) dan 180");
  cek(baca[1].jawaban === "90" && timbangJam(3) === "siku" && baca[1].opsi.includes("30") && baca[1].opsi.includes("180") && /pukul tiga/.test(baca[1].teks), "C: pukul tiga 90, pengecoh 30 dan 180");
  const patokan = adegan("patokan");
  cek(patokan.jumlah === [0, 90, 180, 360].length && patokan.jumlah <= 12 && patokan.cerita.includes("0°, 90°, 180°, dan 360°"), "C: empat sudut patokan");
  const penuh = adegan("penuh");
  cek(penuh.target === 360 / 180 && penuh.target <= penuh.maks && penuh.maks <= 20 && penuh.sukses.includes("180° ditambah 180° sama dengan 360°"), "C: dua sudut lurus membentuk satu sudut penuh");
  const rel = adegan("releks");
  const bb = rel.opsi.find((o) => o.benar);
  cek(klasifikasi(270) === "releks" && /^sudut releks/.test(bb.teks) && rel.cerita.includes("270°") && rel.opsi.filter((o) => !o.benar).every((o) => !/releks/.test(o.teks)) && rel.opsi.some((o) => o.teks === "sudut tumpul") && rel.opsi.some((o) => o.teks === "sudut lurus"), "C: 270 releks (kuadran), pengecoh tumpul dan lurus salah");
  const posisi = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
  cek(new Set(posisi).size === posisi.length, `C: letak jawaban pilih bervariasi (${posisi.join("")})`);
}

/* ------------------------------ Misi C ------------------------------ */
{
  const capai = (aksi) => M0.misiBaru(K6.MISI_C, C.keadaanBusurK5B6C(jalan(C.awalBusurK5B6C(), LC, aksi)), new Set());
  const pasang = (i, { geser = true, putar = true, periksa = true } = {}) => {
    const d = C.DATA_PASANG[i];
    const aksi = [{ t: "P_DATA", i }];
    if (geser) for (let n = 0; n < Math.abs(d.geser); n += 1) aksi.push({ t: "P_GESER", d: d.geser > 0 ? -1 : 1 });
    if (putar) for (let n = 0; n < Math.abs(d.putar) / 15; n += 1) aksi.push({ t: "P_PUTAR", d: d.putar > 0 ? -15 : 15 });
    if (periksa) aksi.push({ t: "P_CEK" });
    return aksi;
  };
  cek(capai(pasang(0)).join() === "c-pasang" && capai(pasang(1)).join() === "c-pasang-jam" && capai(pasang(2)).join() === "c-pasang-lipat", "C: memasang busur pada kipas memenuhi misi, jam dan lipatan memenuhi tantangan");
  cek(capai(pasang(0, { geser: false })).length === 0 && capai(pasang(0, { putar: false })).length === 0 && capai(pasang(0, { periksa: false })).length === 0, "C: memasang tanpa menggeser, tanpa memutar, atau tanpa memeriksa tidak memenuhi");
  cek(capai([...pasang(0), ...pasang(1), ...pasang(2)]).join() === "c-pasang,c-pasang-jam,c-pasang-lipat", "C: tiga sudut Pasang bersamaan");
  const baca = (i, skala = C.skalaBenar(C.DATA_BACA[i]), angka = C.DATA_BACA[i].deg) => [{ t: "B_DATA", i }, ...(skala ? [{ t: "B_SKALA", skala }] : []), { t: "B_ANGKA", nilai: angka }];
  cek(capai([...baca(0), ...baca(2)]).join() === "c-baca-kanan" && capai(baca(1)).join() === "c-baca-kiri", "C: membaca kipas dan atap rumah (kanan) serta pintu lemari (kiri) memenuhi");
  cek(capai(baca(0)).length === 0 && capai(baca(2)).length === 0, "C: hanya satu dari dua sudut kanan tidak memenuhi");
  cek(capai(baca(1, "dalam")).length === 0 && capai(baca(1, null)).length === 0 && capai(baca(1, "luar", 130)).length === 0 && capai(baca(1, "luar", 60)).length === 0, "C: skala salah, tanpa skala, atau angka salah tidak memenuhi");
  cek(capai([...baca(0), ...baca(1), ...baca(2)]).join() === "c-baca-kanan,c-baca-kiri", "C: tiga sudut Baca bersamaan");
  const patokan = (i, nama = klasifikasi(C.DATA_PATOKAN[i])) => [{ t: "T_DATA", i }, { t: "T_JAWAB", nama }];
  cek(capai([0, 2, 4, 6].flatMap((i) => patokan(i))).join() === "c-patokan", "C: nol, siku-siku, lurus, penuh memenuhi misi patokan");
  cek(capai([0, 2, 4].flatMap((i) => patokan(i))).length === 0 && capai([0, 2, 4].flatMap((i) => patokan(i)).concat(patokan(6, "releks"))).length === 0, "C: tiga dari empat patokan, atau penuh dinamai releks, tidak memenuhi");
  cek(capai(patokan(5)).join() === "c-releks" && capai(patokan(5, "tumpul")).length === 0 && capai(patokan(5, "lurus")).length === 0 && capai(patokan(5, "penuh")).length === 0, "C: 270 releks memenuhi, tumpul, lurus, dan penuh tidak");
  cek(capai([0, 1, 2, 3, 4, 5, 6].flatMap((i) => patokan(i))).join() === "c-patokan,c-releks,c-patokan-semua", "C: ketujuh sudut memenuhi tiga misi Patokan");
  cek(capai([0, 1, 2, 3, 4, 6].flatMap((i) => patokan(i))).join() === "c-patokan", "C: enam dari tujuh sudut belum memenuhi tantangan semua sudut");
  cek(M0.misiBaru(K6.MISI_C, { alat: "sudut", pernah: ["pasang:0", "baca:0", "baca:1", "baca:2", "patokan:0", "patokan:5"] }, new Set()).length === 0, "C: riwayat alat lain (sudut) tidak memenuhi misi C");
  cek(M0.misiBaru(K6.MISI_B, { alat: "busur", pernah: ["bagian:0", "jenis:lancip", "jam:0"] }, new Set()).length === 0, "C: riwayat alat busur tidak memenuhi misi B");
}

/* ------------------------------ Konsep tidak bocor ke Sub-Bab C ------------------------------ */
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
  // Sub-Bab C tidak memakai konsep Sub-Bab D: melukis sudut (lukis, melukis, konstruksi).
  const BOCOR_C = /(\bmelukis\b|\blukis\w*|\bkonstruksi\b|\bconstruct\w*)/i;
  const catat = (teks, apa) => {
    const m = BOCOR_C.exec(teks);
    cek(!m, `C: ${apa} bebas konsep melukis (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
  };
  for (const t of [TK.MISI_K5B6.C, TK.NAMA_SIM_K5B6.C, ...K6.MISI_C.map((m) => m.teks)]) catat(t, "teks misi");
  for (const [nama, o] of [["mesin", MS.MESIN_BUSUR], ["skenario", SK.SKENARIO_K5B6C], ["peta dan infografis ringkas", ringkas.subBab.C]]) catat(teksDari(o), nama);
  for (const [f, e] of [["SimulasiLabBusurK5B6", "tsx"], ["model-busur-k5b6", "tsx"], ["lab-busur-k5b6c", "ts"]]) catat(tanpaKomentar(baca(f, e)), `${f} (tanpa komentar)`);
  for (const p of globalThis.__pesanC) catat(p, "pesan lab dari fuzz");
  const ucapan = [];
  for (let i = 0; i < 3; i += 1) {
    const xp = LC(xc0, { t: "P_DATA", i });
    ucapan.push(C.ucapPasangK5B6C(xp));
    let s = xp;
    for (let n = 0; n < 6; n += 1) s = LC(s, { t: "P_GESER", d: Math.sign(-s.pasang.geser) || 1 });
    for (let n = 0; n < 6; n += 1) s = LC(s, { t: "P_PUTAR", d: -15 * (Math.sign(s.pasang.putar) || 0) });
    ucapan.push(C.ucapPasangK5B6C(s));
    ucapan.push(C.ucapBacaK5B6C(LC(xc0, { t: "B_DATA", i })));
  }
  for (let i = 0; i < C.DATA_PATOKAN.length; i += 1) ucapan.push(C.ucapPatokanK5B6C(LC(xc0, { t: "T_DATA", i })));
  cek(ucapan.length === 16 && ucapan.every(tanpaAngka), `semua ${ucapan.length} ucapan Lab Busur dieja menjadi kata`);
  for (const u of ucapan) catat(u, "ucapan lab");
  cek(C.ucapPasangK5B6C(xc0).includes("pusat busur di titik sudut") && C.ucapPatokanK5B6C(LC(xc0, { t: "T_DATA", i: 5 })).includes("270°"), "C: ucapan Pasang dan Patokan menyebut isi yang benar");
  {
    const s = baca("SimulasiLabBusurK5B6", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s), "lab C: lapor keadaan lewat useEffect");
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), "lab C: ganti tampilan mengosongkan pesan");
    const catatan = [...s.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 3 && catatan.every(tanpaAngka), "lab C: Coba ini dapat dieja");
    cek(/aria-label="Geser busur ke kiri"/.test(s) && /aria-label="Geser busur ke kanan"/.test(s) && /aria-label="Putar busur ke kiri"/.test(s) && /aria-label="Putar busur ke kanan"/.test(s) && /aria-label="Periksa pemasangan"/.test(s) && /aria-label="Pakai skala luar"/.test(s) && /aria-label="Pakai skala dalam"/.test(s) && /aria-label=\{`Angka \$\{n\} derajat`\}/.test(s) && /aria-label=\{`Namai \$\{SEBUT_UKURAN\[n\]\}`\}/.test(s), "lab C: tombol geser, putar, periksa, skala, angka, dan nama berlabel");
    cek(/P_GESER", d: -1 \}\)\} className=\{TOMBOL_KECIL\}>\s*◀/.test(s) && /P_PUTAR", d: PUTAR_LANGKAH \}\)\} className=\{TOMBOL_KECIL\}>\s*↺/.test(s) && /P_PUTAR", d: -PUTAR_LANGKAH \}\)\} className=\{TOMBOL_KECIL\}>\s*↻/.test(s), "lab C: tombol kiri menggeser negatif, putar kiri positif, putar kanan negatif");
    const m = baca("model-busur-k5b6", "tsx");
    cek(/role="img"/.test(m) && (m.match(/aria-label=\{`Gambar /g) ?? []).length === 2 && /rotate\(\$\{-putar\}\)/.test(m) && /vx \+ geser \* 14/.test(m), "model C: dua gambar berlabel, putar dan geser sesuai arah pesan");
  }
  // Ringkas C dihitung ulang mandiri.
  const C0 = ringkas.subBab.C;
  const butir = (panel, id) => panel.butir.find((b) => b.id === id);
  const [p1, p2, p3] = C0.infografis.panel;
  cek(butir(p1, "pusat").visual.isi === "pusat = titik sudut" && butir(p1, "dasar").visual.isi === "kaki 1 = 0°" && butir(p1, "baca").visual.isi === "kaki 2 = 125°" && butir(p1, "baca").suara.includes(EJ.kataK5B6(125)), "ringkas C: pusat busur, kaki pertama nol, kipas 125");
  const [tumpul, releks] = p2.sisi;
  cek(tumpul.visual.isi === "90° sampai 180°" && releks.visual.isi === "180° sampai 360°" && klasifikasi(135) === "tumpul" && klasifikasi(270) === "releks" && p2.kesimpulan === "Releks bukan tumpul.", "ringkas C: tumpul 90 sampai 180 dan releks 180 sampai 360 (kuadran)");
  cek(butir(p3, "nol").visual.isi === "0°" && butir(p3, "siku").visual.isi === "90°" && butir(p3, "lurus").visual.isi === "180°" && butir(p3, "penuh").visual.isi === "360°" && klasifikasi(0) === "nol" && klasifikasi(90) === "siku" && klasifikasi(180) === "lurus" && klasifikasi(360) === "penuh", "ringkas C: patokan 0, 90, 180, 360 (kuadran)");
  cek(butir(p3, "siku").suara.includes(`${EJ.kataK5B6(90)} derajat`) && butir(p3, "lurus").suara.includes(`${EJ.kataK5B6(180)} derajat`) && butir(p3, "penuh").suara.includes(`${EJ.kataK5B6(360)} derajat`) && 90 * 2 === 180 && 180 * 2 === 360, "ringkas C: suara menyebut sembilan puluh, seratus delapan puluh, tiga ratus enam puluh");
  const kartu = (id) => C0.peta.kartu.find((k) => k.id === id).teks;
  cek(kartu("c-lurus") === "Sudut lurus = 180°" && kartu("c-penuh") === "Sudut penuh = 360°" && kartu("c-125") === "Kipas Pakarena: 125°", "ringkas C: kartu patokan dan kipas");
  cek(C0.peta.cabang.map((c) => c.id).join() === "satuan,busur,baca,patokan", "ringkas C: empat cabang");
}

/* ============================== Sub-Bab D: Lab Lukis ============================== */
const LD = D.langkahLukisK5B6D;
const xd0 = D.awalLukisK5B6D();
const IDD = /^(lukis:[0-4]|cek:[0-3]|hubung:[0-2])$/;
const LANGKAH_AKSI = (target) => [{ t: "L_TITIK" }, { t: "L_BUSUR" }, { t: "L_TANDA", nilai: target }, { t: "L_KAKI" }];
const permutasi = (a) => (a.length <= 1 ? [a] : a.flatMap((v, i) => permutasi([...a.slice(0, i), ...a.slice(i + 1)]).map((r) => [v, ...r])));
{
  cek(xd0.pernah.length === 0 && xd0.pesan === "" && xd0.lukis.data === 0 && xd0.lukis.langkah === 0 && xd0.lukis.tanda === null && xd0.lukis.hasil === null && xd0.cek.data === 0 && xd0.cek.putusan === null && xd0.hubung.data === 0, "D awal: kosong, belum ada riwayat");
  sama(D.DATA_LUKIS, [30, 75, 110, 52, 140], "D: lima ukuran Lukis sesuai rancangan (dan Materi D)");
  cek(D.DATA_LUKIS.every((t) => Number.isInteger(t) && t > 0 && t < 180 && t !== 90 && t !== 85) && new Set(D.DATA_LUKIS).size === 5, "D: ukuran Lukis bulat, di antara 0 dan 180, bukan 90, unik");
  sama(D.DATA_LUKIS.map(klasifikasi), ["lancip", "lancip", "tumpul", "lancip", "tumpul"], "D: jenis lima ukuran Lukis (timbangan kuadran)");
  sama(D.DATA_CEK.map((d) => [d.target, d.hasil, d.sebab]), [[75, 75, null], [110, 70, "skala"], [50, 60, "pusat"], [130, 120, "dasar"]], "D: data empat hasil Cek sesuai rancangan");
  cek(D.DATA_CEK.every((d) => d.catatan.length > 20), "D: tiap hasil Cek punya catatan");
  sama(D.DATA_HUBUNG.map((d) => [d.jenis, d.opsi.join("-"), d.benar]), [["lancip", "40-90-150", 40], ["siku", "45-90-135", 90], ["tumpul", "60-125-90", 125]], "D: data tiga tugas Hubung sesuai rancangan");
  sama(D.LANGKAH_LUKIS.length, 4, "D: empat langkah melukis");

  // Lukis: opsi tanda.
  for (const [i, t] of D.DATA_LUKIS.entries()) {
    const o = D.opsiTanda(t);
    cek(o.length === 3 && new Set(o).size === 3 && o.includes(t) && o.includes(180 - t) && o.includes(t + 10) && o.every((n) => n > 0 && n < 180) && [...o].sort((a, b) => a - b).join() === o.join(), `Lukis ${t}: tiga angka tanda unik, terurut, memuat target, 180 dikurangi target, dan target ditambah 10`);
    const awal = LD(xd0, { t: "L_DATA", i });
    cek(awal.lukis.data === i && awal.lukis.langkah === 0 && D.targetLukis(awal) === t, `Lukis ${t}: dipilih, mulai dari langkah nol`);
    // Hanya urutan yang benar mencatat.
    for (const urut of permutasi([0, 1, 2, 3])) {
      const aksi = urut.map((n) => LANGKAH_AKSI(t)[n]);
      const hasil = jalan(awal, LD, aksi);
      const kanonik = urut.join() === "0,1,2,3";
      cek(kanonik ? hasil.pernah.join() === `lukis:${i}` && hasil.lukis.langkah === 4 : hasil.pernah.length === 0, `Lukis ${t}: urutan ${urut.join("")} ${kanonik ? "benar dicatat" : "salah tidak dicatat"}`);
    }
    // Langkah satu per satu.
    const l1 = LD(awal, { t: "L_TITIK" });
    cek(l1.lukis.langkah === 1 && l1.pesan.startsWith("✅"), `Lukis ${t}: langkah 1 titik sudut dan kaki pertama`);
    sama(LD(l1, { t: "L_TITIK" }), l1, `Lukis ${t}: langkah 1 dua kali tidak mengubah`);
    cek(/Buat titik sudut dan kaki pertama dulu/.test(LD(awal, { t: "L_BUSUR" }).pesan) && LD(awal, { t: "L_BUSUR" }).lukis.langkah === 0, `Lukis ${t}: busur sebelum titik ditolak`);
    const l2 = LD(l1, { t: "L_BUSUR" });
    cek(l2.lukis.langkah === 2 && l2.pesan.includes(`${t}°`), `Lukis ${t}: langkah 2 busur terpasang, pesan menyebut target`);
    sama(LD(l2, { t: "L_BUSUR" }), l2, `Lukis ${t}: langkah 2 dua kali tidak mengubah`);
    for (const n of o) {
      const sebelum = LD(l1, { t: "L_TANDA", nilai: n });
      cek(sebelum.lukis.langkah === 1 && sebelum.lukis.tanda === null && /Pasang busur dulu/.test(sebelum.pesan), `Lukis ${t}: tanda ${n} sebelum busur ditolak`);
    }
    cek(LD(l2, { t: "L_TANDA", nilai: 999 }) === l2 && LD(l2, { t: "L_TANDA", nilai: 0 }) === l2, `Lukis ${t}: tanda di luar pilihan diabaikan`);
    cek(/Beri tanda angka dulu/.test(LD(l2, { t: "L_KAKI" }).pesan) && LD(l2, { t: "L_KAKI" }).lukis.langkah === 2 && LD(awal, { t: "L_KAKI" }).pernah.length === 0, `Lukis ${t}: kaki kedua sebelum tanda ditolak`);
    for (const n of o) {
      const l3 = LD(l2, { t: "L_TANDA", nilai: n });
      cek(l3.lukis.langkah === 3 && l3.lukis.tanda === n, `Lukis ${t}: tanda ${n} dibuat`);
      sama(LD(l3, { t: "L_TANDA", nilai: o.find((v) => v !== n) }), l3, `Lukis ${t}: tanda kedua setelah tanda dibuat diabaikan`);
      const l4 = LD(l3, { t: "L_KAKI" });
      const betul = n === t;
      cek(l4.lukis.langkah === 4 && l4.lukis.hasil === n && (betul ? l4.pernah.join() === `lukis:${i}` && l4.pesan.startsWith("✅") : l4.pernah.length === 0 && !l4.pesan.startsWith("✅") && l4.pesan.includes(`${n}°, bukan ${t}°`)), `Lukis ${t}: tanda ${n} ${betul ? "menghasilkan sudut target dan dicatat" : "menghasilkan sudut yang salah dan tidak dicatat"}`);
      if (n === 180 - t) cek(/skala yang satunya/.test(l4.pesan), `Lukis ${t}: tanda ${n} dijelaskan sebagai angka skala yang satunya`);
      sama(LD(l4, { t: "L_KAKI" }), l4, `Lukis ${t}: kaki kedua dua kali tidak mengubah`);
      const ulang = LD(l4, { t: "L_ULANG" });
      cek(ulang.lukis.langkah === 0 && ulang.lukis.tanda === null && ulang.lukis.hasil === null && ulang.pernah.join() === l4.pernah.join(), `Lukis ${t}: ulang dari awal, riwayat tetap`);
    }
  }
  cek(LD(xd0, { t: "L_DATA", i: 5 }) === xd0 && LD(xd0, { t: "L_DATA", i: -1 }) === xd0, "Lukis: ukuran di luar daftar diabaikan");

  // Cek: semua kombinasi putusan dan sebab.
  for (const [i, d] of D.DATA_CEK.entries()) {
    const nama = `${d.target}/${d.hasil}`;
    const xc = LD(xd0, { t: "C_DATA", i });
    const tepat = d.hasil === d.target;
    // Sebab dari angka: skala bila hasil sama dengan 180 dikurangi target (hitungan mandiri).
    const sebabAngka = tepat ? null : d.hasil === 180 - d.target ? "skala" : null;
    cek(sebabAngka === null || sebabAngka === d.sebab, `Cek ${nama}: bila hasil sama dengan 180 dikurangi target, sebabnya skala`);
    cek(d.sebab === null ? tepat : !tepat, `Cek ${nama}: sebab ada hanya bila hasil berbeda dari target`);
    for (const sb of D.SEBAB_CEK) {
      const s0 = LD(xc, { t: "C_SEBAB", sebab: sb });
      cek(s0.pernah.length === 0 && /Putuskan dulu/.test(s0.pesan), `Cek ${nama}: sebab ${sb} sebelum memutuskan ditolak`);
    }
    const cocok = LD(xc, { t: "C_PUTUS", putusan: "cocok" });
    const meleset = LD(xc, { t: "C_PUTUS", putusan: "meleset" });
    if (tepat) {
      cek(cocok.pernah.join() === `cek:${i}` && cocok.pesan.startsWith("✅") && meleset.pernah.length === 0 && meleset.cek.putusan === null && /sama dengan target/.test(meleset.pesan), `Cek ${nama}: cocok benar dicatat, meleset ditolak`);
      cek(LD(cocok, { t: "C_SEBAB", sebab: "pusat" }).pernah.join() === `cek:${i}`, `Cek ${nama}: sebab setelah cocok tidak mengubah`);
    } else {
      cek(cocok.pernah.length === 0 && cocok.cek.putusan === null && /belum cocok/.test(cocok.pesan), `Cek ${nama}: cocok ditolak karena hasil berbeda`);
      cek(meleset.cek.putusan === "meleset" && meleset.pernah.length === 0 && meleset.pesan.includes(d.catatan), `Cek ${nama}: meleset diterima, pesan memuat catatan`);
      for (const sb of D.SEBAB_CEK) {
        const t = LD(meleset, { t: "C_SEBAB", sebab: sb });
        const betul = sb === d.sebab;
        cek(betul ? t.pernah.join() === `cek:${i}` && t.pesan.startsWith("✅") : t.pernah.length === 0 && !t.pesan.startsWith("✅") && t.pesan.includes(`Bukan karena ${D.URAIAN_SEBAB[sb]}`), `Cek ${nama}: sebab ${sb} ${betul ? "benar dicatat" : "salah tidak dicatat"}`);
      }
      cek(LD(meleset, { t: "C_SEBAB", sebab: "lain" }) === meleset, `Cek ${nama}: sebab di luar pilihan diabaikan`);
      cek(LD(LD(meleset, { t: "C_DATA", i: (i + 1) % 4 }), { t: "C_SEBAB", sebab: d.sebab }).pernah.length === 0, `Cek ${nama}: ganti hasil melepas putusan meleset`);
    }
    cek(LD(xc, { t: "C_PUTUS", putusan: "mungkin" }) === xc, `Cek ${nama}: putusan di luar pilihan diabaikan`);
  }
  cek(LD(xd0, { t: "C_DATA", i: 4 }) === xd0 && LD(xd0, { t: "C_DATA", i: -1 }) === xd0, "Cek: hasil di luar daftar diabaikan");

  // Hubung.
  for (const [i, d] of D.DATA_HUBUNG.entries()) {
    const xh = LD(xd0, { t: "H_DATA", i });
    const cocokOpsi = d.opsi.filter((n) => klasifikasi(n) === d.jenis);
    cek(cocokOpsi.length === 1 && cocokOpsi[0] === d.benar && new Set(d.opsi).size === 3 && D.jenisUkuran(d.benar) === d.jenis, `Hubung ${d.jenis}: tepat satu ukuran yang cocok (timbangan kuadran)`);
    for (const n of d.opsi) {
      const t = LD(xh, { t: "H_UKURAN", nilai: n });
      const betul = n === d.benar;
      cek(betul ? t.pernah.join() === `hubung:${i}` && t.pesan.startsWith("✅") && t.pesan.includes(`${n}°`) : t.pernah.length === 0 && !t.pesan.startsWith("✅") && t.pesan.includes(`${n}° adalah ${D.SEBUT_JENIS[klasifikasi(n)]}`), `Hubung ${d.jenis}: ukuran ${n} ${betul ? "benar dicatat" : "salah tidak dicatat"}`);
    }
    cek(LD(xh, { t: "H_UKURAN", nilai: 777 }) === xh, `Hubung ${d.jenis}: ukuran di luar pilihan diabaikan`);
  }
  cek(LD(xd0, { t: "H_DATA", i: 3 }) === xd0 && LD(xd0, { t: "H_DATA", i: -1 }) === xd0, "Hubung: tugas di luar daftar diabaikan");

  // Reset, pesan kosong, riwayat tidak dicabut.
  const sat = jalan(xd0, LD, [...LANGKAH_AKSI(30), { t: "H_DATA", i: 1 }, { t: "H_UKURAN", nilai: 90 }]);
  cek(sat.pernah.join() === "lukis:0,hubung:1", "D: riwayat Lukis dan Hubung terkumpul berurutan");
  sama(LD(sat, { t: "RESET" }), xd0, "D: reset mengembalikan keadaan awal");
  cek(LD(sat, { t: "PESAN_KOSONG" }).pesan === "" && LD(sat, { t: "PESAN_KOSONG" }).pernah.join() === sat.pernah.join(), "D: pesan dikosongkan, riwayat tetap");
  cek(LD(LD(sat, { t: "H_UKURAN", nilai: 45 }), { t: "H_UKURAN", nilai: 90 }).pernah.join() === sat.pernah.join(), "D: jawaban salah dan ulang tidak mencabut atau menggandakan riwayat");

  // Fuzz 20.000 aksi.
  const acak = acakDari(424242);
  let st = xd0;
  let ok = true;
  const pesanSemua = new Set();
  const riwayatSemua = new Set();
  for (let n = 0; n < 20000; n += 1) {
    const pil = acak(30);
    const tgt = D.targetLukis(st);
    const a =
      pil === 0 ? { t: "L_DATA", i: acak(6) - (acak(8) === 0 ? 1 : 0) } :
      pil === 1 || pil === 2 ? { t: "L_TITIK" } :
      pil === 3 || pil === 4 ? { t: "L_BUSUR" } :
      pil === 5 || pil === 6 || pil === 7 ? { t: "L_TANDA", nilai: [...D.opsiTanda(tgt), 0][acak(4)] } :
      pil === 8 || pil === 9 ? { t: "L_TANDA", nilai: tgt } :
      pil === 10 || pil === 11 || pil === 12 ? { t: "L_KAKI" } :
      pil === 13 ? { t: "L_ULANG" } :
      pil === 14 ? { t: "C_DATA", i: acak(5) - (acak(8) === 0 ? 1 : 0) } :
      pil === 15 || pil === 16 ? { t: "C_PUTUS", putusan: ["cocok", "meleset", "x"][acak(3)] } :
      pil === 17 || pil === 18 ? { t: "C_SEBAB", sebab: ["pusat", "dasar", "skala", "x"][acak(4)] } :
      pil === 19 ? { t: "C_SEBAB", sebab: D.dataCek(st).sebab ?? "pusat" } :
      pil === 20 ? { t: "H_DATA", i: acak(4) - (acak(8) === 0 ? 1 : 0) } :
      pil === 21 || pil === 22 ? { t: "H_UKURAN", nilai: [...D.dataHubung(st).opsi, 0][acak(4)] } :
      pil === 23 ? { t: "H_UKURAN", nilai: D.dataHubung(st).benar } :
      acak(40) === 0 ? { t: "RESET" } : { t: "PESAN_KOSONG" };
    const t = LD(st, a);
    if (a.t !== "RESET" && !st.pernah.every((v) => t.pernah.includes(v))) ok = false;
    const lk = t.lukis;
    if (!(lk.data >= 0 && lk.data < 5 && [0, 1, 2, 3, 4].includes(lk.langkah))) ok = false;
    if ((lk.langkah >= 3) !== (lk.tanda !== null) || (lk.langkah === 4) !== (lk.hasil !== null)) ok = false;
    if (lk.tanda !== null && !D.opsiTanda(D.DATA_LUKIS[lk.data]).includes(lk.tanda)) ok = false;
    if (lk.hasil !== null && lk.hasil !== lk.tanda) ok = false;
    if (!(t.cek.data >= 0 && t.cek.data < 4 && [null, "meleset"].includes(t.cek.putusan))) ok = false;
    if (t.cek.putusan === "meleset" && D.DATA_CEK[t.cek.data].hasil === D.DATA_CEK[t.cek.data].target) ok = false;
    if (!(t.hubung.data >= 0 && t.hubung.data < 3)) ok = false;
    for (const id of t.pernah) if (!IDD.test(id)) ok = false;
    for (const id of t.pernah) {
      if (st.pernah.includes(id)) continue;
      const [jenis, nomor] = id.split(":");
      const nn = Number(nomor);
      if (jenis === "lukis" && !(a.t === "L_KAKI" && lk.data === nn && lk.langkah === 4 && lk.hasil === D.DATA_LUKIS[nn])) ok = false;
      if (jenis === "cek") {
        const dc = D.DATA_CEK[nn];
        const sah = t.cek.data === nn && ((a.t === "C_PUTUS" && a.putusan === "cocok" && dc.hasil === dc.target) || (a.t === "C_SEBAB" && a.sebab === dc.sebab && dc.sebab !== null && st.cek.putusan === "meleset"));
        if (!sah) ok = false;
      }
      if (jenis === "hubung" && !(a.t === "H_UKURAN" && t.hubung.data === nn && a.nilai === D.DATA_HUBUNG[nn].benar)) ok = false;
    }
    if (t.pesan) pesanSemua.add(t.pesan);
    for (const id of t.pernah) riwayatSemua.add(id);
    st = t;
  }
  cek(ok, "fuzz 20.000 aksi Lab Lukis: batas terjaga, riwayat tidak dicabut dan hanya bila tercapai");
  cek(pesanSemua.size > 25 && [...pesanSemua].every(tanpaAngka), `fuzz Lab Lukis: semua ${pesanSemua.size} pesan dieja menjadi kata`);
  cek(riwayatSemua.size >= 9, `fuzz Lab Lukis: riwayat terkumpul (${[...riwayatSemua].sort().join(" ")})`);
}

/* ------------------------------ Mesin D ------------------------------ */
{
  const def = MS.MESIN_LUKIS;
  for (const [i, k] of MS.KASUS_LUKIS.entries()) {
    const c = def.kasus[i];
    const [titik, busur, tanda, ukur] = c.langkah;
    const t = k.target;
    cek(titik.benar === "titik sudut dan satu kaki sudut" && titik.tanya.includes(k.konteks) && titik.tanya.includes(`${t}°`) && titik.opsi.includes(`tanda angka ${t}`), `Mesin D ${k.id}: langkah pertama titik sudut dan kaki`);
    sama([...titik.opsi].sort(), [`tanda angka ${t}`, "dua kaki sudut sekaligus", "titik sudut dan satu kaki sudut"].sort(), `Mesin D ${k.id}: pilihan titik tiga`);
    cek(busur.benar === "titik sudut dan kaki pertama" && busur.opsi.length === 3 && busur.opsi.includes("titik sudut dan tanda angka") && busur.opsi.includes("ujung kaki dan kaki pertama"), `Mesin D ${k.id}: busur pusat di titik sudut, dasar di kaki pertama`);
    const bs = bacaanSkala(k.sisi, t);
    const sb = bs.dalam === t ? "dalam" : "luar";
    cek(tanda.benar === `skala ${sb}` && tanda.tanya.includes(`sisi ${k.sisi}`) && tanda.tanya.includes(`${t}°`), `Mesin D ${k.id}: tanda ${t} pada skala ${sb} (geometri)`);
    sama([...tanda.opsi].sort(), ["skala dalam", "skala luar", "skala mana saja"], `Mesin D ${k.id}: pilihan tanda tiga`);
    cek(ukur.benar === `${t}°` && ukur.tanya.includes(`${t}°`) && ukur.opsi.every((o) => o === ukur.benar || Number(o.replace("°", "")) !== t), `Mesin D ${k.id}: ukur ulang ${t}°, pengecoh salah`);
    cek(c.ringkas.includes(`${t}°`) && c.ringkas.includes(`skala ${sb}`), `Mesin D ${k.id}: ringkas memuat hasil benar`);
  }
  sama(MS.KASUS_LUKIS.map((k) => [k.target, k.sisi]), [[75, "kanan"], [110, "kiri"], [52, "kanan"]], "Mesin D: data tiga kasus sesuai rancangan");
  const himpunan = (l) => l.opsi.map((o) => Number(o.replace("°", ""))).sort((p, q) => p - q);
  sama(def.kasus.map((c) => himpunan(c.langkah[3])), [[75, 85, 105], [70, 110, 120], [52, 62, 128]], "Mesin D: pilihan ukur ulang tiap kasus (pengecoh 180 dikurangi target dan target tambah atau kurang 10)");
  const idx = def.kasus.flatMap((c) => c.langkah.map((l) => l.opsi.indexOf(l.benar)));
  cek(new Set(idx).size === 3, `Mesin D: letak kunci bervariasi (${idx.join("")})`);
}

/* ------------------------------ Skenario D ------------------------------ */
{
  const S = SK.SKENARIO_K5B6D;
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
  sama(S.id.replace(/-k5b6$/, ""), K6.ID_SKENARIO_K5B6.D, "id skenario D sesuai id misi");
  const adegan = (id) => S.adegan.find((a) => a.id === id);
  const siku = adegan("siku");
  const sb = siku.opsi.find((o) => o.benar);
  cek(/^90°/.test(sb.teks) && klasifikasi(90) === "siku" && klasifikasi(45) === "lancip" && klasifikasi(180) === "lurus" && siku.opsi.filter((o) => !o.benar).every((o) => !/^90°/.test(o.teks)), "D: siku-siku 90, pengecoh 45 lancip dan 180 lurus (kuadran)");
  const bagian = adegan("bagian").soal;
  cek(bagian[0].jawaban === "kaki" && bagian[1].jawaban === "tumpul" && bagian.every((q) => q.opsi.length === 3 && q.opsi.includes(q.jawaban)) && klasifikasi(135) === "tumpul", "D: kaki sudut dan tumpul, tiga pilihan");
  const ukur = adegan("ukur").soal;
  cek(ukur[0].jawaban === "75" && ukur[0].opsi.includes(String(180 - 75)) && ukur[0].opsi.includes("85") && ukur[1].jawaban === "180" && ukur[1].opsi.includes("90") && ukur[1].opsi.includes("360"), "D: membaca 75 (pengecoh 105 dan 85) dan sudut lurus 180 (pengecoh 90 dan 360)");
  const lukis = adegan("lukis");
  cek(lukis.target === D.LANGKAH_LUKIS.length && lukis.target <= lukis.maks && lukis.maks <= 20 && lukis.cerita.includes("4 langkah") && lukis.sukses.includes("4 langkah"), "D: melukis 4 langkah");
  const cekA = adegan("cek");
  const bb = cekA.opsi.find((o) => o.benar);
  cek(180 - 110 === 70 && cekA.cerita.includes("70°") && cekA.cerita.includes("110°") && /salah membaca skala/.test(bb.teks) && cekA.opsi.filter((o) => !o.benar).every((o) => !/skala/.test(o.teks)), "D: 70 sama dengan 180 dikurangi 110, sebabnya salah membaca skala, pengecoh pusat dan dasar salah");
  const lima = adegan("lima");
  cek(lima.jumlah === D.DATA_LUKIS.length && lima.jumlah <= 12 && lima.cerita.includes(`${D.DATA_LUKIS[0]}°, ${D.DATA_LUKIS[1]}°, ${D.DATA_LUKIS[2]}°, ${D.DATA_LUKIS[3]}°, dan ${D.DATA_LUKIS[4]}°`) && lima.sukses.includes("5 sudut"), "D: lima sudut yang dilukis sama dengan data Lab Lukis");
  const posisi = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
  cek(new Set(posisi).size === posisi.length, `D: letak jawaban pilih bervariasi (${posisi.join("")})`);
  // Pencapaian bab: menyentuh konsep A sampai D.
  const semua = semuaTeks.join(" | ");
  cek(/patokan/.test(semua) && /90°/.test(semua), "D menyentuh konsep A: patokan siku-siku 90");
  cek(/kaki sudut/.test(semua) && /tumpul/.test(semua), "D menyentuh konsep B: kaki sudut dan tumpul");
  cek(/busur/.test(semua) && /180°/.test(semua) && /skala/.test(semua), "D menyentuh konsep C: busur, skala, dan 180");
  cek(/melukis/.test(semua) && /gambar kaki kedua/.test(semua) && /ukur ulang/.test(semua), "D menyentuh konsep D: melukis, kaki kedua, dan ukur ulang");
}

/* ------------------------------ Misi D ------------------------------ */
{
  const capai = (aksi) => M0.misiBaru(K6.MISI_D, D.keadaanLukisK5B6D(jalan(D.awalLukisK5B6D(), LD, aksi)), new Set());
  const lukis = (i, nilai = D.DATA_LUKIS[i], { titik = true, busur = true, kaki = true } = {}) => [{ t: "L_DATA", i }, ...(titik ? [{ t: "L_TITIK" }] : []), ...(busur ? [{ t: "L_BUSUR" }] : []), { t: "L_TANDA", nilai }, ...(kaki ? [{ t: "L_KAKI" }] : [])];
  cek(capai([...lukis(0), ...lukis(1)]).join() === "d-lukis-lancip" && capai([...lukis(2), ...lukis(4)]).join() === "d-lukis-tumpul" && capai(lukis(3)).join() === "d-lukis-lima", "D: melukis 30 dan 75, 110 dan 140, serta 52 memenuhi");
  cek(capai(lukis(0)).length === 0 && capai(lukis(2)).length === 0, "D: hanya satu dari dua sudut tidak memenuhi");
  cek(capai([...lukis(0, 150), ...lukis(1)]).length === 0 && capai([...lukis(0), ...lukis(1, 105)]).length === 0, "D: tanda di angka skala yang satunya tidak memenuhi");
  cek(capai([...lukis(0, 30, { titik: false }), ...lukis(1)]).length === 0 && capai([...lukis(0, 30, { busur: false }), ...lukis(1)]).length === 0 && capai([...lukis(0, 30, { kaki: false }), ...lukis(1)]).length === 0, "D: melukis tanpa titik sudut, tanpa busur, atau tanpa kaki kedua tidak memenuhi");
  cek(capai([0, 1, 2, 3, 4].flatMap((i) => lukis(i))).join() === "d-lukis-lancip,d-lukis-tumpul,d-lukis-lima", "D: kelima sudut memenuhi tiga misi Lukis");
  const cekP = (i, aksi) => [{ t: "C_DATA", i }, ...aksi];
  cek(capai(cekP(0, [{ t: "C_PUTUS", putusan: "cocok" }])).join() === "d-cek", "D: lukisan 75 cocok memenuhi misi cek");
  cek(capai(cekP(2, [{ t: "C_PUTUS", putusan: "meleset" }, { t: "C_SEBAB", sebab: "pusat" }])).join() === "d-pusat", "D: lukisan 50 meleset karena pusat memenuhi misi pusat");
  cek(capai(cekP(1, [{ t: "C_PUTUS", putusan: "meleset" }, { t: "C_SEBAB", sebab: "skala" }])).join() === "d-cek-skala" && capai(cekP(3, [{ t: "C_PUTUS", putusan: "meleset" }, { t: "C_SEBAB", sebab: "dasar" }])).join() === "d-cek-dasar", "D: meleset karena skala dan dasar memenuhi tantangan");
  cek(capai(cekP(2, [{ t: "C_PUTUS", putusan: "meleset" }, { t: "C_SEBAB", sebab: "dasar" }])).length === 0 && capai(cekP(2, [{ t: "C_PUTUS", putusan: "cocok" }])).length === 0 && capai(cekP(2, [{ t: "C_SEBAB", sebab: "pusat" }])).length === 0 && capai(cekP(0, [{ t: "C_PUTUS", putusan: "meleset" }])).length === 0, "D: sebab salah, putusan cocok untuk yang meleset, sebab tanpa putusan, atau meleset untuk yang cocok tidak memenuhi");
  const hub = (i, nilai) => [{ t: "H_DATA", i }, { t: "H_UKURAN", nilai }];
  cek(capai([...hub(0, 40), ...hub(1, 90), ...hub(2, 125)]).join() === "d-jenis", "D: lancip 40, siku-siku 90, tumpul 125 memenuhi");
  cek(capai([...hub(0, 40), ...hub(1, 90)]).length === 0 && capai([...hub(0, 40), ...hub(1, 90), ...hub(2, 90)]).length === 0 && capai([...hub(0, 90), ...hub(1, 90), ...hub(2, 125)]).length === 0, "D: dua dari tiga tugas, atau ukuran salah tidak memenuhi");
  cek(M0.misiBaru(K6.MISI_D, { alat: "busur", pernah: ["lukis:0", "lukis:1", "lukis:2", "lukis:3", "lukis:4", "cek:0", "cek:2", "hubung:0", "hubung:1", "hubung:2"] }, new Set()).length === 0, "D: riwayat alat lain (busur) tidak memenuhi misi D");
  cek(M0.misiBaru(K6.MISI_C, { alat: "lukis", pernah: ["pasang:0", "baca:0", "baca:1", "baca:2", "patokan:0"] }, new Set()).length === 0, "D: riwayat alat lukis tidak memenuhi misi C");
}

/* ------------------------------ Pencapaian bab dan pendaftaran ------------------------------ */
{
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas5-bab6-ringkas.json", import.meta.url), "utf8"));
  const baca = (nama, ekstensi) => readFileSync(new URL(`../src/components/modul/${nama}.${ekstensi}`, import.meta.url), "utf8");
  const tanpaKomentar = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  for (const p of [TK.MISI_K5B6.D, ...K6.MISI_D.map((m) => m.teks)]) cek(tanpaAngka(p), "D: teks misi dapat dieja");
  for (const [f, e] of [["SimulasiLabLukisK5B6", "tsx"], ["model-lukis-k5b6", "tsx"], ["lab-lukis-k5b6d", "ts"]]) cek(!/correct_index|explanation|fetch\(|XMLHttpRequest/.test(baca(f, e)), `${f}: tanpa kunci ujian dan tanpa jaringan`);
  const ucapan = [];
  for (let i = 0; i < D.DATA_LUKIS.length; i += 1) {
    let s = LD(xd0, { t: "L_DATA", i });
    ucapan.push(D.ucapLukisK5B6D(s));
    for (const a of LANGKAH_AKSI(D.DATA_LUKIS[i])) {
      s = LD(s, a);
      ucapan.push(D.ucapLukisK5B6D(s));
    }
  }
  for (let i = 0; i < D.DATA_CEK.length; i += 1) ucapan.push(D.ucapCekK5B6D(LD(xd0, { t: "C_DATA", i })));
  for (let i = 0; i < D.DATA_HUBUNG.length; i += 1) ucapan.push(D.ucapHubungK5B6D(LD(xd0, { t: "H_DATA", i })));
  cek(ucapan.length === 32 && ucapan.every(tanpaAngka), `semua ${ucapan.length} ucapan Lab Lukis dieja menjadi kata`);
  {
    const s = baca("SimulasiLabLukisK5B6", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s), "lab D: lapor keadaan lewat useEffect");
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), "lab D: ganti tampilan mengosongkan pesan");
    const catatan = [...s.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 3 && catatan.every(tanpaAngka), "lab D: Coba ini dapat dieja");
    cek(/aria-label="Langkah satu, buat titik sudut dan kaki pertama"/.test(s) && /aria-label="Langkah dua, pasang busur"/.test(s) && /aria-label=\{`Tanda angka \$\{n\}`\}/.test(s) && /aria-label="Langkah empat, gambar kaki kedua"/.test(s) && /aria-label="Ulangi lukisan"/.test(s) && /aria-label="Putuskan cocok"/.test(s) && /aria-label="Putuskan meleset"/.test(s) && /aria-label=\{`Sebab \$\{s\}`\}/.test(s) && /aria-label=\{`Ukuran \$\{n\} derajat`\}/.test(s), "lab D: tombol langkah, tanda, ulang, putusan, sebab, dan ukuran berlabel");
    cek(/x\.cek\.putusan === "meleset" \?/.test(s) && /geser=\{ck\.sebab === "pusat" \? 1 : 0\}/.test(s) && /putar=\{ck\.sebab === "dasar" \? 15 : 0\}/.test(s), "lab D: pilihan sebab hanya tampil setelah memutuskan meleset, busur Cek miring sesuai sebab");
    const m = baca("model-lukis-k5b6", "tsx");
    cek(/role="img"/.test(m) && (m.match(/aria-label=\{`Gambar /g) ?? []).length === 1 && /langkah >= 4 && k2/.test(tanpaKomentar(m)), "model D: gambar berlabel, kaki kedua hanya pada langkah 4");
  }
  // Ringkas D dihitung ulang mandiri.
  const D0 = ringkas.subBab.D;
  const butir = (panel, id) => panel.butir.find((b) => b.id === id);
  const [p1, p2, p3] = D0.infografis.panel;
  cek(p1.butir.length === D.LANGKAH_LUKIS.length && butir(p1, "tiga").visual.isi === "tanda 75°" && butir(p1, "tiga").suara.includes(EJ.kataK5B6(75)), "ringkas D: empat langkah melukis, contoh tanda 75");
  const [cocok, meleset] = p2.sisi;
  cek(cocok.visual.isi === "75° = 75°" && meleset.visual.isi === "110° ≠ 70°" && 180 - 110 === 70 && p2.kesimpulan === "Meleset: cek pusat, dasar, dan skala.", "ringkas D: cocok 75 sama 75, meleset 110 dan 70 (180 dikurangi 110)");
  cek(butir(p3, "siku").visual.isi === "90°" && butir(p3, "jenis").visual.isi === "30° lancip, 110° tumpul" && klasifikasi(30) === "lancip" && klasifikasi(110) === "tumpul" && butir(p3, "jenis").suara.toLowerCase().includes(`${EJ.kataK5B6(30)} derajat lancip`) && butir(p3, "jenis").suara.toLowerCase().includes(`${EJ.kataK5B6(110)} derajat tumpul`), "ringkas D: 30 lancip dan 110 tumpul (kuadran)");
  const kartu = (id) => D0.peta.kartu.find((k) => k.id === id).teks;
  cek(kartu("d-tanda") === "Tanda di angka 75° dari nol" && kartu("d-cocok") === "Hasil ukur ulang = target: akurat", "ringkas D: kartu tanda dan cocok");
  cek(D0.peta.cabang.map((c) => c.id).join() === "titik,busur,tanda,cek", "ringkas D: empat cabang");
  // Pendaftaran bab di registri-simulasi.ts dan naskah peta.
  const registri = readFileSync(new URL("../src/components/modul/registri-simulasi.ts", import.meta.url), "utf8");
  cek(/import \{ misiAwalK5Bab6 \} from "@\/components\/modul\/misi-teks-k5b6";/.test(registri) && /import ringkasK5B6 from "@\/data\/kelas5-bab6-ringkas\.json";/.test(registri), "registri: impor misi awal dan data ringkas Bab 6");
  cek(/const SimulasiK5Bab6Materi = dynamic<SimulasiMateriProps>\(\(\) => import\("@\/components\/modul\/SimulasiK5Bab6"\), \{ ssr: false \}\);/.test(registri), "registri: simulasi Bab 6 dimuat malas, tanpa SSR");
  cek(/"mtk-5-bab6": SimulasiK5Bab6Materi,/.test(registri) && /"mtk-5-bab6": misiAwalK5Bab6,/.test(registri) && /"mtk-5-bab6": ringkasK5B6\.subBab as unknown as Record<string, RingkasSub>,/.test(registri), "registri: tiga peta (SIMULASI_MATERI, SIMULASI_MISI_AWAL, RINGKAS_BAB) memuat mtk-5-bab6");
  cek((registri.match(/"mtk-5-bab6"/g) ?? []).length === 3, "registri: mtk-5-bab6 tepat tiga kali");
  cek(!/import[^;]*SimulasiK5Bab6[^;]*from "@\/components\/modul\/SimulasiK5Bab6"/.test(registri.replace(/dynamic<[^;]*;/g, "")), "registri: komponen laboratorium tidak diimpor langsung");
  const peta = readFileSync(new URL("../naskah/igil-module-player-peta.md", import.meta.url), "utf8");
  cek(/Migrasi Kelas 5: Bab 6 sudah \(`SimulasiK5Bab6`, empat sub-bab A sampai D/.test(peta), "naskah peta: Bab 6 tercatat");
  const bab = readFileSync(new URL("../src/components/modul/registri-bab-baru.ts", import.meta.url), "utf8");
  cek(/"mtk-5-bab6": \(\) => import\("\.\/paket-k5b6"\)/.test(bab), "registri bab baru: Materi Bab 6 sudah terdaftar (tidak diubah)");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
