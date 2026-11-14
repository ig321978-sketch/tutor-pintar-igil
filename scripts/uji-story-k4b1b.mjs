// Uji Story Kelas 4 Bab 1 Sub-Bab B (Menentukan dan Menggunakan Nilai Tempat Bilangan Cacah sampai 10.000): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar (angka dan bilangan yang diucapkan dengan kata), perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, tidak membocorkan materi sub-bab lain, kutipan buku terhadap teks PDF (pdftotext, atau PyMuPDF bila tidak ada),
// banyak benda gambar (kotak kartu, kardus, balok, cakram) dihitung ulang, angka kunci Panduan Guru dihitung mandiri (angka tiap tempat, nilai angka 6, uraian, 9.500 - 7.350),
// uraian bentuk penjumlahan dicocokkan dengan nilai tempat, emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k4b1b.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b1b-video.ts");

const stat = { kutipan: 0, terbilang: 0, teksPasang: 0, persamaan: 0, data: 0 };
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

cek(typeof L.keadaanStory === "function" && typeof L.posisiKata === "function", "mesin Story tersedia");
const bilangan = (d) => (d.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
const titikJalur = (o) => {
  const d = o.d ?? "";
  if (!/^M[-\d. L]+ Z$/.test(d)) return null;
  const n = bilangan(d);
  if (n.length < 6 || n.length % 2 !== 0) return null;
  const out = [];
  for (let i = 0; i < n.length; i += 2) out.push([(o.x ?? 0) + n[i], (o.y ?? 0) + n[i + 1]]);
  return out;
};

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K4B1B, V.VIDEO_LUAR_K4B1B];
const bilanganDari = (t) => (t.match(/\d[\d.]*\d|\d/g) ?? []).map((v) => v.replace(/\./g, ""));
const semuaSidik = new Map();
let totalKetukan = 0;
let totalKata = 0;
const kotakTeks = (o) => {
  const u = o.u ?? 10;
  const lebar = (o.isi ?? "").length * u * 0.58;
  const x = o.x ?? 0;
  const kiri = (o.anchor ?? "middle") === "middle" ? x - lebar / 2 : (o.anchor ?? "middle") === "end" ? x - lebar : x;
  const y = o.y ?? 0;
  return [kiri, y - u * 0.75, kiri + lebar, y + u * 0.2];
};
for (const v of VIDEO) {
  cek(v.adegan.length >= 7, `${v.id}: paling sedikit 7 adegan (ada ${v.adegan.length})`);
  cek(["materi", "metode-luar"].includes(v.jenis) && v.judul.length > 5 && v.subjudul.length > 5, `${v.id}: jenis dan judul ada`);
  cek(new Set(v.adegan.map((a) => a.id)).size === v.adegan.length, `${v.id}: id adegan unik`);
  for (const a of v.adegan) {
    const nama = `${v.id}/${a.id}`;
    cek(a.ketukan.length >= 3 && a.ketukan.length <= 14, `${nama}: 3 sampai 14 ketukan (ada ${a.ketukan.length})`);
    cek(a.sumber.length > 8 && a.judul.length > 5 && /^#[0-9A-Fa-f]{6}$/.test(a.latar), `${nama}: sumber, judul, dan latar ada`);
    let sebelumnya = null;
    const terlihat = new Set();
    a.ketukan.forEach((kt, i) => {
      const kata = L.kataDari(kt.suara);
      totalKetukan += 1;
      totalKata += kata.length;
      cek(kata.length >= 6 && kata.length <= 40, `${nama}#${i + 1}: 6 sampai 40 kata (ada ${kata.length})`);
      cek(!/[=×÷<>\/%]/.test(kt.suara), `${nama}#${i + 1}: suara tanpa lambang yang sulit dibaca mesin suara`);
      cek(/[.?!]$/.test(kt.suara.trim()), `${nama}#${i + 1}: suara berakhir tanda baca`);
      cek(kt.aksi.length >= 1, `${nama}#${i + 1}: ada aksi gambar`);
      for (const ak of kt.aksi) {
        const p = L.posisiKata(kt.suara, ak.at);
        cek(p >= 0, `${nama}#${i + 1}: pemicu "${ak.at}" ditemukan dalam kalimat`);
        if (typeof ak.at === "number") cek(ak.at >= 0 && ak.at < kata.length, `${nama}#${i + 1}: pemicu angka ${ak.at} dalam batas`);
      }
      {
        const peta = new Set(L.keadaanStory(a, i - 1, 9999).map((o) => o.id));
        if (i === 0) peta.clear();
        for (const ak of kt.aksi) {
          if (ak.bersih) peta.clear();
          for (const id of ak.hapus === undefined ? [] : [].concat(ak.hapus)) {
            cek(peta.has(id), `${nama}#${i + 1}: hapus "${id}" menyasar benda yang ada`);
            peta.delete(id);
          }
          for (const o of ak.tambah === undefined ? [] : [].concat(ak.tambah)) peta.add(o.id);
          for (const u of ak.ubah === undefined ? [] : [].concat(ak.ubah)) cek(peta.has(u.id), `${nama}#${i + 1}: ubah "${u.id}" menyasar benda yang ada`);
        }
      }
      const akhir = L.keadaanStory(a, i, 9999);
      const sidik = L.sidikKeadaan(akhir);
      cek(sebelumnya === null || sidik !== sebelumnya, `${nama}#${i + 1}: gambar berubah dibanding ketukan sebelumnya`);
      sebelumnya = sidik;
      if (i === a.ketukan.length - 1) {
        const lama = semuaSidik.get(sidik);
        cek(!lama, `${nama}: gambar akhir adegan tidak sama dengan adegan lain (${lama ?? ""})`);
        semuaSidik.set(sidik, nama);
      }
      cek(new Set(akhir.map((o) => o.id)).size === akhir.length, `${nama}#${i + 1}: id benda unik`);
      for (let p = 0; p < kata.length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(b);
      for (const b of bilanganDari(kt.suara)) cek(terlihat.has(b), `${nama}#${i + 1}: bilangan ${b} di suara tampak di gambar`);
      const titikAksi = [...new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at)))].sort((m, n) => m - n);
      if (titikAksi.length >= 2) {
        const sid = titikAksi.map((p) => L.sidikKeadaan(L.keadaanStory(a, i, p)));
        cek(new Set(sid).size >= 2, `${nama}#${i + 1}: gambar berubah mengikuti kata dalam kalimat`);
      }
      for (const o of akhir) {
        const x = o.x ?? 0;
        const y = o.y ?? 0;
        if (o.t === "teks") {
          const lebar = (o.isi ?? "").length * (o.u ?? 10) * 0.56;
          const kiri = (o.anchor ?? "middle") === "middle" ? x - lebar / 2 : (o.anchor ?? "middle") === "end" ? x - lebar : x;
          cek(y > 0 && y < 200 && kiri > -4 && kiri + lebar < 304, `${nama}#${i + 1}: teks "${o.isi}" masuk kanvas (x=${x}, y=${y}, lebar=${Math.round(lebar)})`);
        } else if (o.t === "kotak") cek(x > -2 && y > -2 && x + (o.w ?? 0) < 302 && y + (o.h ?? 0) < 202, `${nama}#${i + 1}: kotak ${o.id} masuk kanvas`);
        else if (o.t === "bulat") cek(x - (o.r ?? 0) > -2 && x + (o.r ?? 0) < 302 && y - (o.r ?? 0) > -2 && y + (o.r ?? 0) < 210, `${nama}#${i + 1}: bulat ${o.id} masuk kanvas`);
        else if (o.t === "jalur") {
          const t = titikJalur(o);
          if (t) cek(t.every((p) => p[0] > -2 && p[0] < 302 && p[1] > -2 && p[1] < 204), `${nama}#${i + 1}: bangun ${o.id} masuk kanvas`);
          else if (/A/.test(o.d ?? "")) {
            const n = bilangan(o.d);
            const r = n[4];
            cek(x - r > -2 && x + r < 302 && y - r > -2 && y + r < 210, `${nama}#${i + 1}: juring ${o.id} masuk kanvas`);
          }
        } else if (o.t === "garis" || o.t === "panah") cek(x > -2 && x < 302 && y > -2 && y < 204 && x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 204, `${nama}#${i + 1}: garis ${o.id} masuk kanvas`);
      }
      {
        const teksAda = akhir.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi && !/^[\u{1F000}-\u{1FFFF}]|^[✂✅❌]$/u.test(o.isi));
        for (let p = 0; p < teksAda.length; p += 1) {
          for (let q = p + 1; q < teksAda.length; q += 1) {
            stat.teksPasang += 1;
            const m = kotakTeks(teksAda[p]);
            const n = kotakTeks(teksAda[q]);
            const lx = Math.min(m[2], n[2]) - Math.max(m[0], n[0]);
            const ly = Math.min(m[3], n[3]) - Math.max(m[1], n[1]);
            cek(!(lx > 1 && ly > 1), `${nama}#${i + 1}: teks "${teksAda[p].isi}" (${teksAda[p].id}) bertumpuk dengan "${teksAda[q].isi}" (${teksAda[q].id})`);
          }
        }
      }
    });
  }
}

/* ------------------------------ Pemisahan materi dan metode luar ------------------------------ */
const G = await import("../src/components/modul/story/k4b1b-gambar.ts");
const U1 = await import("../src/components/modul/story/k4b1b-luar-1.ts");
const U2 = await import("../src/components/modul/story/k4b1b-luar-2.ts");
const M_VIDEO = V.VIDEO_MATERI_K4B1B;
// Pembuka administratif (tujuan, peta konsep, panduan awal; di I: rubrik, refleksi, interaksi orang tua) tidak lagi diputar di video materi.
// Adegannya tetap ada di berkas materi, jadi pemeriksaan isi memakai daftar penuh; hanya jumlah dan urutan adegan diuji terhadap video yang diputar.
const MODUL_MATERI = Object.assign({}, await import("../src/components/modul/story/k4b1b-materi-1.ts"), await import("../src/components/modul/story/k4b1b-materi-2.ts"), await import("../src/components/modul/story/k4b1b-materi-3.ts"));
const M = { ...M_VIDEO, adegan: [MODUL_MATERI.ADEGAN_STRUK, MODUL_MATERI.ADEGAN_PANDUAN_AWAL, MODUL_MATERI.ADEGAN_AKTIVITAS_ALAT, MODUL_MATERI.ADEGAN_AKTIVITAS_KARTU, MODUL_MATERI.ADEGAN_AMBIL, MODUL_MATERI.ADEGAN_CONTOH, MODUL_MATERI.ADEGAN_LATIH_SATU, MODUL_MATERI.ADEGAN_LATIH_DUA, MODUL_MATERI.ADEGAN_LATIH_TIGA, MODUL_MATERI.ADEGAN_KUNCI_EMPAT, MODUL_MATERI.ADEGAN_MISKONSEPSI, MODUL_MATERI.ADEGAN_DIFERENSIASI] };
const U = V.VIDEO_LUAR_K4B1B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const nilaiId = (objs, id) => objs.find((o) => o.id === id)?.isi;
const T = (v, id, ke) => akhirAdegan(adegan(v, id), ke);
const objAda = (objs, id) => objs.find((o) => o.id === id);
const hitungPola = (objs, re) => objs.filter((o) => re.test(o.id)).length;
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const digitDari = (n) => String(n).padStart(4, "0").split("").map(Number);
const titik = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  const METODE = ["Place Value", "Dienes Trade", "Expanded Form", "Place Value Disks"];
  const NAMA_ID = ["Nilai Tempat", "Tukar Sepuluh", "Bentuk Uraian", "Cakram Nilai Tempat"];
  cek(!/Place Value|Dienes|Expanded Form|Tukar Sepuluh|Bentuk Uraian|Cakram|Disks|metode luar|metode dari luar|Van de Walle/i.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of [...METODE, ...NAMA_ID]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE, METODE, "nama metode di berkas luar-1");
  sama(U1.NAMA_METODE_ID, NAMA_ID, "nama Indonesia metode luar");
  cek(M.adegan.every((a) => /(Buku Siswa|Panduan Guru) hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  cek(U.adegan.every((a) => a.sumber.length <= 46), "video metode luar: label sumber cukup pendek untuk kanvas 300 lebar");
  cek(M.adegan.every((a) => a.sumber.length <= 52), "video materi: label sumber cukup pendek untuk kanvas 300 lebar");
  for (const kata of ["Peta konsep", "Kata kunci", "Apersepsi", "Ayo Berlatih", "Ayo Berpikir", "Miskonsepsi", "Diferensiasi", "Refleksi", "Subbab", "Tujuan pembelajaran", "Panduan guru", "Aktivitas"]) cek(!luar.includes(kata), `video metode luar tidak memuat "${kata}" milik materi`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-nilai", "luar-nilai-terapan", "luar-tukar", "luar-tukar-terapan", "luar-uraian", "luar-uraian-terapan", "luar-cakram", "luar-cakram-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[0].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  cek(M_VIDEO.adegan.length === 11 && U.adegan.length === 10, "11 adegan materi dan 10 adegan metode luar");
  cek(M.id === "k4b1b-materi" && U.id === "k4b1b-luar", "id video k4b1b-materi dan k4b1b-luar");
  // Tidak membocorkan materi sub-bab lain (komposisi, pengurangan, pembagian, faktor, penutup bab). Membandingkan dan mengurutkan hanya muncul di kalimat pengalaman belajar Panduan Guru hlm. 35 (sub-bab B sendiri memakainya).
  const BOCOR = /komposisi|dekomposisi|pengurangan|pembagian|faktor|kelipatan|uji kompetensi|refleksi|pengayaan|remedial/i;
  for (const a of [...M.adegan, ...U.adegan]) cek(!BOCOR.test(teksAdegan(a)), `${a.id} tidak membocorkan sub-bab lain`);
  for (const a of [...M.adegan.filter((x) => x.id !== "panduan-awal"), ...U.adegan]) cek(!/membandingkan|mengurutkan|urutan bilangan/i.test(teksAdegan(a)), `${a.id} tidak membahas membandingkan atau mengurutkan (milik sub-bab lain)`);
  cek(/membandingkan dan mengurutkan/i.test(teksAdegan(adegan(M, "panduan-awal"))), "Panduan Guru hlm. 35: kalimat pengalaman belajar dicatat apa adanya");
  cek(totalKetukan >= 80, `total ketukan cukup dalam (${totalKetukan})`);
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "struk-belanja,aktivitas-alat,aktivitas-kartu,aktivitas-ambil,contoh-2150,berlatih-satu,berlatih-dua,berlatih-tiga,kunci-empat,miskonsepsi,diferensiasi", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "luar-pembuka,luar-nilai,luar-nilai-terapan,luar-tukar,luar-tukar-terapan,luar-uraian,luar-uraian-terapan,luar-cakram,luar-cakram-terapan,luar-ringkas", "urutan adegan metode luar");
  // Tiga nama metode lama sama dengan naskah bab; nama metode baru belum dipakai naskah, judul, atau lab lain pada bab ini.
  const modul = new URL("../src/components/modul/", import.meta.url);
  const baca = (n) => readFileSync(new URL(n, modul), "utf8");
  const naskah = baca("naskah-k4b1.ts");
  cek(/"nama": "Place Value"/.test(naskah) && /"nama": "Dienes Trade"/.test(naskah) && /"nama": "Expanded Form"/.test(naskah), "tiga nama metode lama sama dengan nama di naskah bab");
  cek(/"namaId": "Nilai Tempat"/.test(naskah) && /"namaId": "Tukar Sepuluh"/.test(naskah) && /"namaId": "Bentuk Uraian"/.test(naskah), "tiga nama Indonesia metode lama sama dengan naskah bab");
  const berkasLab = readdirSync(modul).filter((f) => /^lab-.*k4b1.*\.ts$/.test(f));
  cek(berkasLab.length >= 4, `berkas lab bab 1 ditemukan (${berkasLab.length})`);
  for (const n of ["naskah-k4b1.ts", "data-k4b1.ts", ...berkasLab]) cek(!/Place Value Disks|Cakram Nilai Tempat/i.test(baca(n)), `nama metode baru Place Value Disks / Cakram Nilai Tempat tidak bentrok dengan ${n}`);
  for (const ad of [...M.adegan, ...U.adegan]) cek(!/Place Value Disks|Cakram/i.test(ad.judul) || U.adegan.includes(ad), `judul ${ad.id}: nama metode baru hanya di video metode luar`);
}

/* ------------------------------ Bilangan yang diucapkan dengan kata tampak sebagai angka ------------------------------ */
const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
const NAMA_ANGKA = new Set([...SATUAN, "sepuluh", "sebelas", "seratus", "seribu", "belas", "puluh", "ratus", "ribu"]);
const nilaiKata = (kata) => {
  let total = 0;
  let cur = 0;
  let tunda = 0;
  for (const w of kata) {
    const u = SATUAN.indexOf(w);
    if (u >= 0) tunda = u;
    else if (w === "sepuluh") cur += 10;
    else if (w === "sebelas") cur += 11;
    else if (w === "belas") {
      cur += tunda + 10;
      tunda = 0;
    } else if (w === "puluh") {
      cur += tunda * 10;
      tunda = 0;
    } else if (w === "seratus") cur += 100;
    else if (w === "ratus") {
      cur += tunda * 100;
      tunda = 0;
    } else if (w === "seribu") total += 1000;
    else if (w === "ribu") {
      total += (cur + tunda || 1) * 1000;
      cur = 0;
      tunda = 0;
    }
  }
  return total + cur + tunda;
};
const deretBilangan = (suara) => {
  const hasil = [];
  let run = [];
  const tutup = () => {
    if (run.length && !["puluh", "belas", "ratus"].includes(run[0])) {
      const nilai = nilaiKata(run);
      if (nilai >= 10) hasil.push({ kata: run.join(" "), nilai });
    }
    run = [];
  };
  for (const mentah of suara.split(/\s+/).filter(Boolean)) {
    const w = mentah.toLowerCase().replace(/[^a-z]/g, "");
    if (NAMA_ANGKA.has(w)) run.push(w);
    else tutup();
    if (/[,.:;?!]$/.test(mentah)) tutup();
  }
  tutup();
  return hasil;
};
for (const v of [M, U]) {
  for (const a of v.adegan) {
    const terlihat = new Set();
    a.ketukan.forEach((kt, i) => {
      for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(b);
      for (const d of deretBilangan(kt.suara)) {
        stat.terbilang += 1;
        cek(terlihat.has(String(d.nilai)), `${v.id}/${a.id}#${i + 1}: bilangan "${d.kata}" (${d.nilai}) tampak sebagai angka di gambar`);
      }
    });
  }
}

/* ------------------------------ Semua persamaan di gambar dihitung ulang ------------------------------ */
const hitungEks = (s) => {
  const t = s.replace(/\./g, "").replace(/×/g, "*").replace(/x/g, "*").replace(/−/g, "-");
  if (!/^[\d\s+*-]+$/.test(t)) return null;
  return Function(`"use strict";return (${t})`)();
};
for (const v of [M, U]) {
  for (const a of v.adegan) {
    const sudah = new Set();
    a.ketukan.forEach((kt, i) => {
      for (let p = 0; p < L.kataDari(kt.suara).length; p += 1)
        for (const o of L.keadaanStory(a, i, p)) {
          if (o.t !== "teks" || !o.isi || sudah.has(`${o.id}:${o.isi}`)) continue;
          sudah.add(`${o.id}:${o.isi}`);
          const m = o.isi.match(/^([\d\s+×x−.-]+?)\s*=\s*(\d[\d.]*)(?:\D.*)?$/);
          if (m && /[+×x−-]/.test(m[1])) {
            stat.persamaan += 1;
            cek(hitungEks(m[1]) === Number(m[2].replace(/\./g, "")), `${v.id}/${a.id}: persamaan "${o.isi}" dihitung ulang`);
          }
        }
    });
  }
}

/* ------------------------------ Data buku, hitungan mandiri, dan gambar dihitung ulang ------------------------------ */
{
  const NILAI = [1000, 100, 10, 1];
  const KARDUS = ["Ribuan", "Ratusan", "Puluhan", "Satuan"];
  // Data buku (dibaca dari PDF) ditulis ulang di sini sebagai pembanding mandiri.
  sama([...G.TEMPAT], KARDUS, "empat nilai tempat dari kiri ke kanan");
  sama([...G.NILAI_TEMPAT], NILAI, "nilai tempat 1.000, 100, 10, 1");
  sama(NILAI.map((n, i) => n === 10 ** (3 - i)), [true, true, true, true], "nilai tempat naik sepuluh kali lipat per tempat ke kiri");
  sama([G.AKTIVITAS.paket * G.AKTIVITAS.kartuPerPaket, G.AKTIVITAS.kotak, G.AKTIVITAS.sisiCm, G.AKTIVITAS.kardus], [40, 40, 10, 4], "Aktivitas 2: 4 paket x 10 kartu = 40 kotak 10 cm, 4 kardus");
  sama([...G.CONTOH_AMBIL], [7, 5, 0, 8], "Panduan Guru hlm. 37: contoh kartu 7, 5, 0, 8");
  sama(Number(G.CONTOH_AMBIL.join("")), 7508, "kartu contoh disusun menjadi 7.508");
  sama(digitDari(G.CONTOH_BS.bilangan), [2, 1, 5, 0], "2.150 terdiri atas angka 2, 1, 5, 0");
  sama([...G.CONTOH_BS.angka], [2, 1, 5, 0], "data contoh buku hlm. 14");
  sama(digitDari(7812), [...G.LATIHAN1.a], "nomor 1a: 7.812 memuat angka 7, 8, 1, 2");
  cek(G.LATIHAN1.b.contoh.every((n) => digitDari(n)[G.LATIHAN1.b.tempat] === 9) && G.LATIHAN1.b.contoh.length === 5, "nomor 1b: kelima contoh punya angka 9 di ratusan");
  cek(G.LATIHAN1.c.contoh.every((n) => digitDari(n)[G.LATIHAN1.c.tempat] === 1) && G.LATIHAN1.c.contoh.length === 5, "nomor 1c: kelima contoh punya angka 1 di satuan");
  cek([...G.LATIHAN1.b.contoh, ...G.LATIHAN1.c.contoh].every((n) => n >= 1000 && n <= 9999), "contoh nomor 1b dan 1c semuanya bilangan empat angka");
  sama(G.LATIHAN2.map(([n, t]) => [String(n).indexOf("6"), t]).map(([a, b]) => a === b), [true, true, true, true], "nomor 2: letak angka 6 sama dengan nomor tempat di data");
  sama(G.LATIHAN2.map(([n]) => String(n).split("6").length - 1), [1, 1, 1, 1], "nomor 2: tiap bilangan memuat tepat satu angka 6");
  sama(G.LATIHAN2.map(([, t]) => KARDUS[t].toLowerCase()), [...G.KUNCI2], "kunci nomor 2 (Panduan Guru hlm. 37): puluhan, ratusan, ribuan, satuan");
  sama(G.LATIHAN2.map(([, t]) => 6 * NILAI[t]), [60, 600, 6000, 6], "hitungan mandiri nilai angka 6: 60, 600, 6.000, 6");
  sama([G.SLAMET.uang - G.SLAMET.harga, G.SLAMET.sisa], [2150, 2150], "nomor 3: 9.500 dikurangi 7.350 sama dengan sisa 2.150");
  sama(G.KUNCI4.map(([n, d]) => digitDari(n).join() === d.join()), [true, true, true, true], "kunci nomor 4 (Panduan Guru hlm. 38): angka tiap tempat sama dengan hitungan mandiri");
  sama(G.KUNCI4.map(([n]) => n), [6192, 2910, 4128, 9217], "kunci nomor 4: bilangan 6.192, 2.910, 4.128, 9.217");
  sama(G.MISKONSEPSI.salah.reduce((s, v) => s + v, 0), G.MISKONSEPSI.tabel, "miskonsepsi: 1.000 + 200 + 30 + 4 sama dengan 1.234");
  sama(Number(G.MISKONSEPSI.benar.join("")), G.MISKONSEPSI.tabel, "miskonsepsi: angka 1, 2, 3, 4 membentuk 1.234");
  sama(G.titik(2150) + G.titik(7) + G.titik(10000), "2.150710.000", "titik ribuan");
  stat.data += 20;

  // Adegan materi.
  const s0 = T(M, "struk-belanja", 2);
  sama(["Mini Mart", "Jl. Ciliwung No. 39", "9-9-2022 - 15.45", "MAKANAN RINGAN 1", "Rp2.150", "TOTAL: 2.150", "TERIMA KASIH"].map((_, i) => nilaiId(s0, `st-t${i}`)), ["Mini Mart", "Jl. Ciliwung No. 39", "9-9-2022 - 15.45", "MAKANAN RINGAN 1", "Rp2.150", "TOTAL: 2.150", "TERIMA KASIH"], "struk: isi sama dengan gambar Buku Siswa hlm. 12");
  const k1 = T(M, "struk-belanja", 0);
  sama(nilaiId(k1, "jr"), "10.000", "judul sub-bab: bilangan sampai 10.000");
  const al = T(M, "aktivitas-alat", 2);
  sama([0, 1, 2, 3].map((i) => nilaiId(al, `kd${i}-t`)), KARDUS, "empat kardus berlabel ribuan, ratusan, puluhan, satuan");
  sama([0, 1, 2, 3].map((i) => objAda(al, `kd${i}-t`).warna), [...G.WARNA_KARDUS], "label kardus berwarna biru, oranye, hijau, merah");
  cek([0, 1, 2, 3].every((i) => i === 0 || objAda(al, `kd${i}-k`).x > objAda(al, `kd${i - 1}-k`).x), "kardus berurutan dari kiri ke kanan");
  const g0 = T(M, "aktivitas-kartu", 0);
  cek(hitungPola(g0, /^kt-c\d+$/) === 40, "langkah 4: 40 kotak kartu tergambar");
  cek(g0.filter((o) => /^kt-c\d+$/.test(o.id)).every((o) => o.w === 22 && o.h === 22) && new Set(g0.filter((o) => /^kt-c\d+$/.test(o.id)).map((o) => o.x)).size === 10 && new Set(g0.filter((o) => /^kt-c\d+$/.test(o.id)).map((o) => o.y)).size === 4, "40 kotak = 10 kolom x 4 baris, sama besar");
  const g1 = T(M, "aktivitas-kartu", 1);
  const angkaKartu = (objs) => Array.from({ length: 40 }, (_, i) => nilaiId(objs, `kd${i}`));
  sama(angkaKartu(g1), Array.from({ length: 40 }, (_, i) => String(i % 10)), "langkah 5: tiap paket berisi angka 0 sampai 9");
  const g2 = T(M, "aktivitas-kartu", 2);
  cek(Array.from({ length: 40 }, (_, i) => objAda(g2, `kd${i}`).warna === G.WARNA_KARDUS[Math.floor(i / 10)]).every(Boolean), "langkah 6-7: paket 1 biru, 2 oranye, 3 hijau, 4 merah");
  sama(nilaiId(g1, "jk"), "4 × 10 = 40 kartu", "langkah 5: 4 paket kali 10 kartu");
  const g3 = T(M, "aktivitas-kartu", 3);
  sama([0, 1, 2, 3].map((i) => nilaiId(g3, `kk${i}-t`)), KARDUS, "langkah 8: paket masuk kardus ribuan sampai satuan");
  sama([0, 1, 2, 3].map((i) => objAda(g3, `kg${i}a`).garis), [...G.WARNA_KARDUS], "langkah 8: kartu bertepi warna paket sama dengan warna kardus");
  const ka = T(M, "aktivitas-ambil", 1);
  sama([0, 1, 2, 3].map((i) => nilaiId(ka, `ka${i}-t`)), ["7", "5", "0", "8"], "contoh Panduan Guru: kartu 7, 5, 0, 8 dari kardus ribuan sampai satuan");
  sama(nilaiId(T(M, "aktivitas-ambil", 2), "bil"), "7.508", "kartu contoh disusun menjadi 7.508");
  const t2 = T(M, "contoh-2150", 2);
  sama([0, 1, 2, 3].map((i) => nilaiId(t2, `tb-dt${i}`)), ["2", "1", "5", "0"], "tabel buku hlm. 14: 2, 1, 5, 0");
  sama([0, 1, 2, 3].map((i) => nilaiId(t2, `tb-ht${i}`)), KARDUS, "kepala tabel buku: ribuan, ratusan, puluhan, satuan");
  const t5 = T(M, "contoh-2150", 4);
  sama([0, 1, 2, 3].map((i) => nilaiId(t5, `nw-dt${i}`)), [0, 1, 2, 3].map((i) => G.titik(digitDari(2150)[i] * NILAI[i])), "nilai tiap angka 2.150: 2.000, 100, 50, 0 (angka kali nilai tempat)");
  sama([0, 1, 2, 3].map((i) => nilaiId(t5, `nv-dt${i}`)), ["2", "1", "5", "0"], "baris angka tabel nilai tiap angka");
  const l0 = T(M, "berlatih-satu", 0);
  sama([0, 1, 2, 3].map((i) => nilaiId(l0, `t-dt${i}`)), ["7", "8", "1", "2"], "nomor 1a: tabel 7, 8, 1, 2");
  sama(nilaiId(T(M, "berlatih-satu", 1), "bl"), "7.812", "nomor 1a: 7.812");
  const l2 = T(M, "berlatih-satu", 2);
  sama([0, 1, 2, 3].map((i) => nilaiId(l2, `u-dt${i}`)), ["...", "9", "...", "..."], "nomor 1b: hanya ratusan berisi 9");
  sama(["b1", "b2", "b3"].map((id) => nilaiId(l2, `${id}-t0`)), ["6.923", "7.922", "5.900"], "contoh 1b dalam gambar");
  const l3 = T(M, "berlatih-satu", 3);
  sama([0, 1, 2, 3].map((i) => nilaiId(l3, `u-dt${i}`)), ["...", "...", "...", "1"], "nomor 1c: hanya satuan berisi 1");
  sama(["c1", "c2", "c3"].map((id) => nilaiId(l3, `${id}-t0`)), ["5.161", "7.111", "8.231"], "contoh 1c dalam gambar");
  const l4 = T(M, "berlatih-satu", 4);
  sama([0, 1, 2, 3, 4].map((i) => nilaiId(l4, `pb${i}`)), G.LATIHAN1.b.contoh.map(G.titik), "periksa 1b: lima contoh");
  sama([0, 1, 2, 3, 4].map((i) => nilaiId(l4, `pc${i}`)), G.LATIHAN1.c.contoh.map(G.titik), "periksa 1c: lima contoh");
  for (let i = 0; i < 4; i += 1) {
    const [n, t] = G.LATIHAN2[i];
    const d = T(M, "berlatih-dua", i);
    sama(nilaiId(d, "bg-t"), G.titik(n), `nomor 2 bagian ${i + 1}: bilangan di dalam bangun`);
    sama([0, 1, 2, 3].map((j) => nilaiId(d, `t-dt${j}`)), digitDari(n).map(String), `nomor 2 bagian ${i + 1}: tabel memuat angka ${n}`);
    sama([0, 1, 2, 3].map((j) => objAda(d, `t-d${j}`).warna === "#FFC800"), [0, 1, 2, 3].map((j) => j === t), `nomor 2 bagian ${i + 1}: hanya sel angka 6 yang disorot, yaitu ${KARDUS[t]}`);
    sama(nilaiId(d, "jb"), KARDUS[t], `nomor 2 bagian ${i + 1}: jawaban ${KARDUS[t]}`);
  }
  const bs = ["bg-s"].map((id) => [T(M, "berlatih-dua", 0), T(M, "berlatih-dua", 1), T(M, "berlatih-dua", 2), T(M, "berlatih-dua", 3)].map((d) => objAda(d, id)));
  sama(bs[0].map((o) => (o.t === "jalur" ? titikJalur(o)?.length : o.t === "bulat" ? "bulat" : null)), [3, "bulat", 4, 5], "nomor 2: segitiga, lingkaran, belah ketupat, segilima");
  const d5 = T(M, "berlatih-dua", 4);
  sama([0, 1, 2, 3].map((i) => [nilaiId(d5, `kr${i}-t0`), nilaiId(d5, `kr${i}-t1`), nilaiId(d5, `kr${i}-t2`)]), G.LATIHAN2.map(([n, t]) => [G.titik(n), KARDUS[t].toLowerCase(), G.titik(6 * NILAI[t])]), "kunci nomor 2 dan nilai angka 6 dalam tabel gambar");
  const t31 = T(M, "berlatih-tiga", 0);
  sama(["hg", "um", "ss"].map((id) => nilaiId(t31, `${id}-t0`)), ["harga kue: Rp7.350,00", "uang Slamet: Rp9.500,00", "sisa uang: Rp2.150,00"], "nomor 3: harga, uang, dan sisa");
  for (const [i, n] of [[1, 7350], [2, 9500], [3, 2150]]) {
    const d = T(M, "berlatih-tiga", i);
    sama([0, 1, 2, 3].map((j) => nilaiId(d, `sl-dt${j}`)), digitDari(n).map(String), `nomor 3${"abc"[i - 1]}: tabel angka ${G.titik(n)}`);
    sama(nilaiId(d, "sb"), G.titik(n), `nomor 3${"abc"[i - 1]}: bilangan besar`);
  }
  for (let i = 0; i < 4; i += 1) {
    const d = T(M, "kunci-empat", i === 0 ? 3 : 3);
    const [no, lambang, ...angka] = [nilaiId(d, `r${i}-t0`), nilaiId(d, `r${i}-t1`), ...[2, 3, 4, 5].map((c) => nilaiId(d, `r${i}-t${c}`))];
    sama([no, lambang, angka.join("")], [String(i + 1), G.titik(G.KUNCI4[i][0]), String(G.KUNCI4[i][0])], `kunci nomor 4 baris ${i + 1}: lambang bilangan dan angka tiap tempat`);
  }
  const m3 = T(M, "miskonsepsi", 2);
  sama([0, 1, 2, 3].map((i) => nilaiId(m3, `sl-dt${i}`)), G.MISKONSEPSI.salah.map(G.titik), "miskonsepsi: tabel salah memuat nilai");
  const m4 = T(M, "miskonsepsi", 3);
  sama([0, 1, 2, 3].map((i) => nilaiId(m4, `sl-dt${i}`)), G.MISKONSEPSI.benar.map(String), "miskonsepsi: tabel benar memuat angka");
  sama(nilaiId(T(M, "miskonsepsi", 0), "bx"), G.titik(G.MISKONSEPSI.baca), "miskonsepsi: bilangan 2.345");

  // Adegan metode luar.
  const n1 = T(U, "luar-nilai", 0);
  sama([0, 1, 2, 3].map((i) => nilaiId(n1, `nt-dt${i}`)), NILAI.map(G.titik), "luar Place Value: nilai tempat 1.000, 100, 10, 1");
  const tb = T(U, "luar-tukar", 1);
  cek(hitungPola(tb, /^ts-o\d+$/) === 10 && hitungPola(tb, /^tu-b\d+$/) === 10, "luar Dienes Trade: 10 kubus satuan dan 10 batang puluhan");
  cek(hitungPola(T(U, "luar-tukar", 2), /^tx-l\d+$/) === 10, "luar Dienes Trade: 10 lempeng ratusan");
  const td = T(U, "luar-tukar-terapan", 0);
  sama([hitungPola(td, /^ta-k\d+$/), hitungPola(td, /^tb-l\d+$/), hitungPola(td, /^tc-b\d+$/)], digitDari(2150).slice(0, 3), "luar Dienes Trade 2.150: 2 kubus ribuan, 1 lempeng ratusan, 5 batang puluhan");
  sama([nilaiId(td, "ta-n"), nilaiId(td, "tb-n"), nilaiId(td, "tc-n"), nilaiId(td, "td-n")], ["2 kubus", "1 lempeng", "5 batang", "0 satuan"], "luar Dienes Trade: label banyak balok");
  sama([2150 / 10, 215 * 10, 21 * 10 + 5, 2 * 10 + 1], [215, 2150, 215, 21], "hitungan mandiri tukar: 2.150 = 215 puluhan = 21 ratusan + 5 puluhan = 2 ribuan + 1 ratusan + 5 puluhan");
  const t3 = T(U, "luar-tukar-terapan", 2);
  sama([nilaiId(t3, "g1"), nilaiId(t3, "g2"), nilaiId(t3, "g3")], ["215 puluhan", "21 ratusan + 5 puluhan", "2 ribuan + 1 ratusan + 5 puluhan"], "luar Dienes Trade: urutan penukaran 2.150");
  sama([9500 / 100, 9 * 10 + 5, 95 - 90], [95, 95, 5], "hitungan mandiri tukar: 9.500 = 95 ratusan = 9 ribuan + 5 ratusan");
  sama(nilaiId(T(U, "luar-tukar-terapan", 3), "u1-t0"), "95 lempeng ratusan", "luar Dienes Trade 9.500: 95 lempeng ratusan");
  // Cakram.
  const c1 = T(U, "luar-cakram-terapan", 0);
  const banyak = [0, 1, 2, 3].map((i) => hitungPola(c1, new RegExp(`^c${i}-o\\d+$`)));
  sama(banyak, digitDari(2150), "luar cakram 2.150: 2, 1, 5, 0 cakram");
  sama(banyak.reduce((s, v) => s + v, 0), 8, "luar cakram: total 8 cakram sama dengan jumlah angka");
  sama(nilaiId(c1, "tt"), "total: 8 cakram", "label total cakram");
  const c3 = T(U, "luar-cakram-terapan", 2);
  sama([nilaiId(c3, "ra-n"), nilaiId(c3, "rb-n")], [`${digitDari(7350).reduce((s, v) => s + v, 0)} cakram`, `${digitDari(9500).reduce((s, v) => s + v, 0)} cakram`], "luar cakram: 15 cakram untuk 7.350 dan 14 cakram untuk 9.500");
  sama([0, 1, 2, 3].map((i) => nilaiId(c3, `ra-dt${i}`)), digitDari(7350).map(String), "luar cakram: tabel angka 7.350");
  sama([0, 1, 2, 3].map((i) => nilaiId(c3, `rb-dt${i}`)), digitDari(9500).map(String), "luar cakram: tabel angka 9.500");
  cek(hitungPola(T(U, "luar-cakram", 2), /^tk-o\d+$/) === 10, "luar cakram: kolom penuh 10 cakram");
  sama(nilaiId(T(U, "luar-cakram", 3), "w3"), "1.000 + 100 + 10 + 1 = 1.111", "luar cakram: jumlah nilai empat cakram");
  const c4 = T(U, "luar-cakram-terapan", 3);
  sama([nilaiId(c4, "s1-t1"), nilaiId(c4, "s2-t1")], ["6 × 10 = 60", "6 × 100 = 600"], "luar cakram: angka 6 pada 8.463 dan 4.675");
  // Bentuk uraian: tiap penjumlahan di gambar sama dengan uraian nilai tempat bilangannya.
  let uraian = 0;
  for (const a of U.adegan) {
    for (let i = 0; i < a.ketukan.length; i += 1) {
      for (const o of L.keadaanStory(a, i, 9999)) {
        const m = o.t === "teks" && o.isi ? o.isi.match(/^([\d.]+(?: \+ [\d.]+)+) = ([\d.]+)$/) : null;
        if (!m) continue;
        const suku = m[1].split(" + ").map((v) => Number(v.replace(/\./g, "")));
        const total = Number(m[2].replace(/\./g, ""));
        const harapan = digitDari(total).map((d, j) => d * NILAI[j]).filter((v) => v > 0);
        if (a.id.startsWith("luar-uraian")) {
          uraian += 1;
          cek(suku.join() === harapan.join(), `${a.id}: uraian ${o.isi} sama dengan angka kali nilai tempat (${harapan.join(" + ")})`);
        }
        cek(suku.reduce((s, v) => s + v, 0) === total, `${a.id}: jumlah ${o.isi} dihitung ulang`);
      }
    }
  }
  cek(uraian >= 5, `penjumlahan uraian yang diperiksa (${uraian})`);
  const rk = T(U, "luar-ringkas", 2);
  sama([1, 2, 3, 4].map((i) => nilaiId(rk, `rt${i}-t1`)), U2.ANGKA_METODE.map((r) => r[1]), "ringkasan: angka buku yang dipakai tiap metode sama dengan data");
  // Angka yang disebut ringkasan benar-benar dipakai metodenya.
  const teksMetode = (...ids) => ids.map((id) => teksAdegan(adegan(U, id))).join();
  const adaSemua = (daftar, teks) => daftar.every((n) => teks.includes(`"${n}"`) || teks.includes(n));
  cek(adaSemua(["2.150", "8.463", "4.675", "6.789", "1.236"], teksMetode("luar-nilai-terapan")), "ringkasan Nilai Tempat: semua angka dipakai di adegan terapannya");
  cek(adaSemua(["2.150", "9.500"], teksMetode("luar-tukar-terapan")), "ringkasan Tukar Sepuluh: 2.150 dan 9.500 dipakai");
  cek(adaSemua(["2.150", "7.350", "9.500", "7.812", "6.192"], teksMetode("luar-uraian-terapan")), "ringkasan Bentuk Uraian: semua angka dipakai");
  cek(adaSemua(["2.150", "7.350", "9.500", "8.463", "4.675"], teksMetode("luar-cakram-terapan")), "ringkasan Cakram: semua angka dipakai");
  stat.data += 60;
}

/* ------------------------------ Kutipan buku (bila PDF tersedia) ------------------------------ */
{
  const bs = new URL("../bahan-sd/Matematika-BS-KLS-IV.pdf", import.meta.url);
  const bg = new URL("../bahan-sd/Matematika-BG-KLS-IV.pdf", import.meta.url);
  const jalur = (u) => u.pathname.replace(/^\/([A-Za-z]:)/, "$1");
  const KODE_PY = "import sys, pymupdf\nsys.stdout.reconfigure(encoding='utf-8', errors='replace')\nd = pymupdf.open(sys.argv[1])\nsys.stdout.write('\\n'.join(d[i - 1].get_text() for i in range(int(sys.argv[2]), int(sys.argv[3]) + 1)))";
  const ambil = (berkas, dari, sampai) => {
    const r = spawnSync("pdftotext", ["-enc", "UTF-8", "-f", String(dari), "-l", String(sampai), "-raw", jalur(berkas), "-"], { encoding: "utf8", maxBuffer: 1 << 26 });
    if (r.status === 0) return r.stdout;
    // Cadangan bila pdftotext tidak ada: PyMuPDF (python -I).
    const p = spawnSync("python", ["-I", "-c", KODE_PY, jalur(berkas), String(dari), String(sampai)], { encoding: "utf8", maxBuffer: 1 << 26 });
    return p.status === 0 ? p.stdout : null;
  };
  // Kelas IV: Buku Siswa hlm. N = PDF N+12 (hlm. 12-15 = PDF 24-27; sub-bab B mulai di tengah PDF 24, sesudah soal 4 sub-bab A); Panduan Guru hlm. N = PDF N+12 (hlm. 35-39 = PDF 47-51; sub-bab B mulai di tengah PDF 47; sub-bab C mulai di PDF 52).
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 24, 27), ambil(bg, 47, 51), ambil(bs, 28, 28), ambil(bg, 52, 52)] : [null];
  if (bagian.some((b) => b === null)) console.log("PDF atau pembaca PDF tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const JUDUL_BS = "b. menentukan dan menggunakan nilai tempat bilangan cacah sampai 10.000";
    const JUDUL_BG = "b. nilai tempat bilangan cacah";
    const siswaPenuh = bersih(bagian[0]);
    const guruPenuh = bersih(bagian[1]);
    const awalBs = siswaPenuh.indexOf(JUDUL_BS);
    const awalBg = guruPenuh.indexOf(JUDUL_BG);
    cek(awalBs > 0 && awalBg > 0, "Buku Siswa PDF 24 dan Panduan Guru PDF 47 memuat judul sub-bab B");
    const siswa = siswaPenuh.slice(awalBs);
    const guru = guruPenuh.slice(awalBg);
    const buku = `${siswa}\n${guru}`;
    cek(bersih(bagian[2]).startsWith("bab 1") || bersih(bagian[2]).includes("c. membandingkan"), "Buku Siswa PDF 28 sudah sub-bab C (sub-bab B selesai di PDF 27)");
    cek(bersih(bagian[3]).includes("c. membandingkan dan mengurutkan"), "Panduan Guru PDF 52 sudah sub-bab C (sub-bab B selesai di PDF 51)");
    // Nomor halaman cetak sama dengan PDF dikurangi 12.
    const halaman = (berkas, pdf, cetak) => new RegExp(`(^|\\n)\\s*${cetak}(\\s|$)`).test(ambil(berkas, pdf, pdf));
    for (let pdf = 24; pdf <= 27; pdf += 1) cek(halaman(bs, pdf, pdf - 12), `Buku Siswa PDF ${pdf} bernomor halaman ${pdf - 12}`);
    for (let pdf = 47; pdf <= 51; pdf += 1) cek(halaman(bg, pdf, pdf - 12), `Panduan Guru PDF ${pdf} bernomor halaman ${pdf - 12}`);
    let n = 0;
    for (const a of M.adegan) {
      for (const kt of a.kutipan ?? []) {
        n += 1;
        cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
      }
    }
    stat.kutipan = n;
    cek(n >= 60, `jumlah kutipan buku yang diperiksa (${n})`);
    cek(M.adegan.every((a) => (a.kutipan ?? []).length >= 3), "tiap adegan materi memuat paling sedikit 3 kutipan buku");
    // Data tabel dan kunci dibaca langsung dari teks PDF, bukan dari data di berkas gambar.
    const guruB = bersih(ambil(bg, 50, 50));
    const rapat = (t) => t.replace(/\s+/g, " ");
    cek(/6\.192 6 1 9 2/.test(rapat(guruB)) && /2\.910 2 9 1 0/.test(rapat(guruB)) && /4\.128 4 1 2 8/.test(rapat(guruB)) && /9\.217 9 2 1 7/.test(rapat(guruB)), "Panduan Guru hlm. 38 nomor 4: baris tabel 6.192, 2.910, 4.128, 9.217 beserta angkanya sama dengan hitungan mandiri");
    const siswaTabel = bersih(ambil(bs, 26, 26));
    cek(/ribuan ratusan puluhan satuan 7 8 1 2/.test(siswaTabel) && /ribuan ratusan puluhan satuan 2 1 5 0/.test(siswaTabel), "Buku Siswa hlm. 14: tabel 2.150 (2, 1, 5, 0) dan tabel nomor 1 (7, 8, 1, 2)");
    const guruKunci = bersih(ambil(bg, 49, 50));
    cek(/a\. 7\.812/.test(guruKunci) && /a\. puluhan b\. ratusan c\. ribuan d\. satuan/.test(guruKunci), "Panduan Guru hlm. 37: kunci nomor 1a dan nomor 2");
    cek(/angka 7 menempati nilai tempat ribuan angka 3 menempati nilai tempat ratusan angka 5 menempati nilai tempat puluhan angka 0 menempati nilai tempat satuan/.test(guruKunci) && /angka 9 menempati nilai tempat ribuan angka 5 menempati nilai tempat ratusan angka 0 menempati nilai tempat puluhan angka 0 menempati nilai tempat satuan/.test(guruKunci) && /angka 2 menempati nilai tempat ribuan angka 1 menempati nilai tempat ratusan angka 5 menempati nilai tempat puluhan angka 0 menempati nilai tempat satuan/.test(guruKunci), "Panduan Guru hlm. 38: kunci nomor 3 a, b, c sama dengan hitungan mandiri");
    // Buku Siswa sub-bab B hanya memuat Ayo Berlatih nomor 1, 2, 3 (nomor 4 hanya ada di kunci Panduan Guru).
    const latihBs = siswa.slice(siswa.indexOf("ayo berlatih"));
    cek(latihBs.includes("1. tuliskan bilangan") && latihBs.includes("2. tulis nilai tempat") && latihBs.includes("3. azizah") && !/(^| )4\. /.test(latihBs), "Buku Siswa sub-bab B: Ayo Berlatih hanya nomor 1, 2, 3 (nomor 4 tidak ada)");
    cek(guru.includes("4. salin tabel berikut lalu lengkapilah dengan bilangan!"), "Panduan Guru hlm. 38 memuat kunci nomor 4 (salin tabel)");
    cek(!/kunci/.test(siswa), "Buku Siswa hlm. 12-15: tanpa kunci jawaban (hitungan mandiri)");
    cek(/misal: 2\.345 dibaca dua ribuan tiga ratusan empat puluhan lima/.test(guru) && /1\.234 1\.000 200 30 4 seharusnya:/.test(guru), "Panduan Guru hlm. 39: contoh miskonsepsi 2.345 dan tabel 1.234");
    cek(/mampu membandingkan dan mengurut bilangan sampai angka 10\.000/.test(guru), "Panduan Guru hlm. 35: pengalaman belajar menyebut membandingkan dan mengurut (catatan video)");
    // Hitungan mandiri struk: angka 2.150 pada soal-soal buku.
    cek(/rp7\.350,00/.test(siswa) && /rp9\.500,00/.test(siswa) && /rp2\.150,00/.test(siswa), "Buku Siswa hlm. 15 nomor 3: Rp7.350,00, Rp9.500,00, Rp2.150,00");
    sama(9500 - 7350, 2150, "9.500 - 7.350 = 2.150");
    cek(/4\.675/.test(siswa) && /8\.463/.test(siswa) && /6\.789/.test(siswa) && /1\.236/.test(siswa), "Buku Siswa hlm. 15 nomor 2: 8.463, 4.675, 6.789, 1.236");
    stat.data += 12;
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k4b1b-.*)\.(ts|tsx)$/.test(f));
  cek(berkas.length >= 8, `berkas story ditemukan (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    const buruk = [...s].filter((c) => {
      const kode = c.codePointAt(0);
      return kode > 0x1fa95 || kode === 0x1f7f0 || kode === 0x200d;
    });
    cek(buruk.length === 0, `${f}: tanpa emoji di atas Emoji 12 dan tanpa ZWJ (${buruk.map((c) => c.codePointAt(0).toString(16)).join()})`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: UTF-8 tanpa BOM dan akhir baris LF`);
    cek(!/fetch\(|XMLHttpRequest|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: tanpa jaringan, model bahasa, atau kunci jawaban`);
    cek(!/from "react"/.test(s), `${f}: logika dan data tanpa React`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|k4b1b-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k4b1b sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k4b1b.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_B41|video-k4b1-umum|video-k4b2-umum|naskah-k4b1/.test(pembungkus) && /VIDEO_MATERI_K4B1B/.test(pembungkus) && /VIDEO_LUAR_K4B1B/.test(pembungkus) && /export function VideoK4B1B/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k4b1b.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k4b1b.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k4b1b.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k4b1b.mjs: akhir baris LF");
}

for (const v of [M, U]) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.kutipan} kutipan terhadap teks PDF, ${stat.terbilang} bilangan berkata, ${stat.persamaan} persamaan, ${stat.teksPasang} pasangan teks, ${stat.data} pemeriksaan data buku`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
