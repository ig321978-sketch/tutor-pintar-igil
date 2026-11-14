// Uji Story Kelas 4 Bab 2 Sub-Bab D (Pecahan Desimal Persepuluhan dan Perseratusan): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar (angka dan bilangan yang diucapkan dengan kata), perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, tidak membocorkan Sub-Bab E (persen) kecuali catatan temuan buku, kutipan buku terhadap teks PDF (pdftotext, atau PyMuPDF bila tidak ada),
// benda berbingkai, batang sepuluh sel, dan kisi seratus kotak dihitung ulang dari gambar, hitungan mandiri konversi pecahan ke desimal dan kunci Panduan Guru, emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k4b2d.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b2d-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K4B2D, V.VIDEO_LUAR_K4B2D];
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
const G = await import("../src/components/modul/story/k4b2d-gambar.ts");
const M3 = await import("../src/components/modul/story/k4b2d-materi-3.ts");
const U1 = await import("../src/components/modul/story/k4b2d-luar-1.ts");
const M_VIDEO = V.VIDEO_MATERI_K4B2D;
// Adegan administratif (pembuka, tujuan, peta konsep, panduan awal; di E: rubrik, refleksi, orang tua dan penutup) tidak lagi diputar di video materi.
// Adegannya tetap ada di berkas materi, jadi pemeriksaan isi memakai daftar penuh; hanya jumlah dan urutan adegan diuji terhadap video yang diputar.
const MODUL_MATERI = Object.assign({}, await import("../src/components/modul/story/k4b2d-materi-1.ts"), await import("../src/components/modul/story/k4b2d-materi-2.ts"), await import("../src/components/modul/story/k4b2d-materi-3.ts"));
const M = { ...M_VIDEO, adegan: [MODUL_MATERI.ADEGAN_PEMBUKA, MODUL_MATERI.ADEGAN_AMATI_ROTI, MODUL_MATERI.ADEGAN_TIGA_BISKUIT, MODUL_MATERI.ADEGAN_CONTOH_KOMA, MODUL_MATERI.ADEGAN_HATI_HATI, MODUL_MATERI.ADEGAN_BERLATIH_SATU, MODUL_MATERI.ADEGAN_BERLATIH_DUA, MODUL_MATERI.ADEGAN_BERLATIH_TIGA, MODUL_MATERI.ADEGAN_PERIKSA_KUNCI, MODUL_MATERI.ADEGAN_DIFERENSIASI, MODUL_MATERI.ADEGAN_CATATAN_BUKU] };
const U = V.VIDEO_LUAR_K4B2D;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const nilaiId = (objs, id) => objs.find((o) => o.id === id)?.isi;
const T = (v, id, ke) => akhirAdegan(adegan(v, id), ke);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  const METODE = ["Decimal Tenths Hundredths", "Decimal Grid", "Fraction–Decimal Link", "Place Value Chart"];
  const NAMA_ID = ["Desimal Persepuluhan Perseratusan", "Kisi Desimal", "Jembatan Pecahan–Desimal", "Tabel Nilai Tempat"];
  cek(!/Decimal Tenths Hundredths|Decimal Grid|Fraction.Decimal Link|Place Value Chart|Desimal Persepuluhan Perseratusan|Kisi Desimal|Jembatan Pecahan|Tabel Nilai Tempat|metode luar|metode dari luar|Van de Walle|Gestalt/i.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of [...METODE, ...NAMA_ID]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE, METODE, "nama metode di berkas luar-1");
  sama(U1.NAMA_METODE_ID, NAMA_ID, "nama Indonesia metode luar");
  // Video diputar sebagai guru yang mengajar: tidak ada penyebutan sumber buku di suara, teks terlihat, label sumber, judul adegan, dan subjudul.
  const TERLARANG = /buku|panduan guru|hlm|halaman|kunci|rubrik|salah ketik|salah cetak|tambahan video|contoh video|temuan/i;
  for (const v of [M_VIDEO, U]) {
    cek(!TERLARANG.test(`${v.judul} ${v.subjudul}`), `${v.id}: judul dan subjudul video tanpa kata terlarang`);
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) semua.push(...L.teksTerlihat(L.keadaanStory(a, i, p)));
      });
      const kena = semua.filter((t) => TERLARANG.test(t) || /soal nomor|Ayo Berlatih nomor|nomor [1-4]|catatan video|menurut buku/i.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: tanpa penyebutan buku atau catatan sumber (${kena.slice(0, 2).join(" | ")})`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Empat metode luar", "subjudul video: Materi kurikulum dan Empat metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... (paling banyak 46 huruf)");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  cek(U.adegan.every((a) => a.sumber.length <= 46), "video metode luar: label sumber cukup pendek untuk kanvas 300 lebar (paling banyak 46 huruf)");
  cek(U.adegan.every((a) => a.sumber.length <= 52), "video metode luar: label sumber cukup pendek untuk kanvas 300 lebar");
  cek(M.adegan.every((a) => a.sumber.length <= 52), "video materi: label sumber cukup pendek untuk kanvas 300 lebar");
  for (const kata of ["Peta konsep", "Kata kunci", "Apersepsi", "Ayo Berlatih", "Ayo Berpikir", "Miskonsepsi", "Diferensiasi", "Refleksi", "Subbab", "Tujuan pembelajaran", "Panduan guru", "Aktivitas"]) cek(!luar.includes(kata), `video metode luar tidak memuat "${kata}" milik materi`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-persepuluhan", "luar-persepuluhan-terapan", "luar-kisi", "luar-kisi-terapan", "luar-jembatan", "luar-jembatan-terapan", "luar-tempat", "luar-tempat-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[0].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  cek(M_VIDEO.adegan.length === 10 && U.adegan.length === 10, "10 adegan materi diputar dan 10 adegan metode luar");
  // Sub-Bab D tidak membocorkan Sub-Bab E (persen). Adegan pembuka yang tidak diputar juga tidak menyebut persen.
  const BOCOR = /persen|%|diskon|potongan harga|swalayan|seperseratus|senilai|ekuivalen/i;
  for (const a of M.adegan) cek(!BOCOR.test(teksAdegan(a)), `materi ${a.id} tidak membocorkan Sub-Bab E`);
  for (const a of U.adegan) cek(!BOCOR.test(teksAdegan(a)), `metode luar ${a.id} tidak membocorkan Sub-Bab E`);
  cek(totalKetukan >= 80, `total ketukan cukup dalam (${totalKetukan})`);
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "amati-roti,tiga-persepuluh-biskuit,contoh-angka-koma,hati-hati-nol,berlatih-satu,berlatih-dua,berlatih-tiga,periksa-kunci,diferensiasi,catatan-buku", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "luar-pembuka,luar-persepuluhan,luar-persepuluhan-terapan,luar-kisi,luar-kisi-terapan,luar-jembatan,luar-jembatan-terapan,luar-tempat,luar-tempat-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M.id === "k4b2d-materi" && U.id === "k4b2d-luar", "id video: k4b2d-materi dan k4b2d-luar");
  // Nama metode baru dan tiga nama lama tidak bentrok dengan judul atau metode lain pada bab ini (naskah, lab, dan sub-bab lain).
  const baca = (n) => readFileSync(new URL(`../src/components/modul/${n}`, import.meta.url), "utf8");
  const lain = readdirSync(new URL("../src/components/modul/", import.meta.url)).filter((f) => /^(lab-.*k4b2.*|data-k4b2|naskah-k4b2|mesin-data-k4b2.*|skenario-k4b2.*)\.ts$/.test(f));
  cek(lain.length >= 5, `berkas bab 2 untuk uji bentrok ditemukan (${lain.length})`);
  for (const n of lain) cek(!/Place Value Chart|Tabel Nilai Tempat/.test(baca(n)), `nama metode baru tidak bentrok dengan ${n}`);
  const storyLain = readdirSync(new URL("../src/components/modul/story/", import.meta.url)).filter((f) => /^k4b2[abce]-.*\.ts$/.test(f));
  for (const n of storyLain) cek(!/Place Value Chart|Tabel Nilai Tempat/.test(readFileSync(new URL(`../src/components/modul/story/${n}`, import.meta.url), "utf8")), `nama metode baru tidak bentrok dengan story/${n}`);
  const naskah = baca("naskah-k4b2.ts");
  cek(/Decimal Tenths Hundredths/.test(naskah) && /Decimal Grid/.test(naskah) && /Fraction–Decimal Link/.test(naskah), "tiga nama metode lama sama dengan nama di naskah bab");
  cek(/Desimal Persepuluhan Perseratusan/.test(naskah) && /Kisi Desimal/.test(naskah) && /Jembatan Pecahan–Desimal/.test(naskah), "tiga nama Indonesia metode lama sama dengan naskah bab");
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

/* ------------------------------ Gambar dan angka dihitung ulang ------------------------------ */
const putih = G.W.putih;
/** Desimal dari pecahan n per p (p = 10 atau 100): tulis n di belakang koma dengan nol di depan agar banyak angka sama dengan banyak nol penyebut. */
const desimalDari = (n, p) => {
  const d = Math.round(Math.log10(p));
  return `0,${String(n).padStart(d, "0")}`;
};
const nilaiDesimal = (s) => Number(s.replace(",", "."));
const sel = (objs, id) => objs.filter((o) => new RegExp(`^${id}-c\\d+$`).test(o.id));
const terisi = (objs, id) => sel(objs, id).filter((o) => o.warna !== putih);
/** Sel terisi tepat sel berindeks 0 sampai n-1 (menurut kolom dari kiri, tiap kolom dari atas ke bawah). */
const terisiPertama = (objs, id, n) => {
  const s = sel(objs, id);
  const idxTerisi = s.filter((o) => o.warna !== putih).map((o) => Number(o.id.split("-c")[1])).sort((a, b) => a - b);
  return idxTerisi.length === n && idxTerisi.every((v, i) => v === i);
};
const hitungBenda = (objs, id) => objs.filter((o) => new RegExp(`^${id}-o\\d+$`).test(o.id));
const pusat = (o) => (o.t === "kotak" ? [o.x + o.w / 2, o.y + o.h / 2] : [o.x, o.y]);
const dalamBingkai = (objs, id) => {
  const b = objs.find((o) => o.id === `${id}-b`);
  return hitungBenda(objs, id).filter((o) => {
    const [x, y] = pusat(o);
    return x > b.x && x < b.x + b.w && y > b.y && y < b.y + b.h;
  }).length;
};
const pecahanTeks = (objs, id) => [nilaiId(objs, `${id}-a`), nilaiId(objs, `${id}-b`)];

{
  // Data buku ditulis ulang sebagai pembanding mandiri.
  const SATU = [[4, 10, "0,4"], [5, 10, "0,5"], [3, 10, "0,3"]];
  const DUA = [[1, "0,1"], [5, "0,5"], [9, "0,9"]];
  const TIGA = [[15, "0,15"], [62, "0,62"], [81, "0,81"]];
  sama(G.LATIHAN_SATU.map((d) => [d.bagian, d.total, d.desimal]), SATU, "data Ayo Berlatih 1 (kunci Panduan Guru hlm. 105)");
  sama(G.LATIHAN_DUA.map((d) => [...d]), DUA, "data Ayo Berlatih 2 (kunci Panduan Guru hlm. 106)");
  sama(G.LATIHAN_TIGA.map((d) => [...d]), TIGA, "data Ayo Berlatih 3 (kunci Panduan Guru hlm. 106)");
  for (const [n, p, d] of SATU) sama(desimalDari(n, p), d, `kunci ${n}/${p} menurut hitungan mandiri`);
  for (const [n, d] of DUA) sama(desimalDari(n, 10), d, `kunci ${n}/10 menurut hitungan mandiri`);
  for (const [n, d] of TIGA) sama(desimalDari(n, 100), d, `kunci ${n}/100 menurut hitungan mandiri`);
  for (const [n, p, d] of [...SATU, ...DUA.map(([n2, d2]) => [n2, 10, d2]), ...TIGA.map(([n2, d2]) => [n2, 100, d2])]) {
    stat.data += 1;
    cek(Math.abs(nilaiDesimal(d) - n / p) < 1e-12, `${n}/${p} = ${d} (nilai sama)`);
    cek(d.split(",")[1].length === Math.round(Math.log10(p)), `${d}: banyak angka di belakang koma sama dengan banyak nol penyebut ${p}`);
  }
  sama(M3.KUNCI_SEMBILAN.length, 9, "sembilan kunci");
  sama(M3.KUNCI_SEMBILAN.map(([, n, p, d]) => desimalDari(n, p) === d), Array(9).fill(true), "semua kunci cocok dengan hitungan mandiri");

  // Ayo Mengamati: sepuluh roti, satu berselai.
  const r1 = T(M, "amati-roti", 1);
  sama([hitungBenda(r1, "rt").length, hitungBenda(r1, "rt").filter((o) => o.warna === G.WARNA_SELAI).length], [10, 1], "sepuluh roti, satu berselai coklat");
  sama(pecahanTeks(T(M, "amati-roti", 2), "rx"), ["1", "10"], "roti: satu per sepuluh");
  const r3 = T(M, "amati-roti", 3);
  sama([nilaiId(r3, "rz2-t0"), nilaiId(r3, "rz3-t0")], ["1/10", "0,1"], "roti: 1/10 dan 0,1");
  // Dari satu per sepuluh ke satu per seratus.
  const b0 = T(M, "tiga-persepuluh-biskuit", 0);
  sama([pecahanTeks(b0, "ba"), nilaiId(b0, "bc"), sel(b0, "bd").length, terisi(b0, "bd").length], [["1", "10"], "0,1", 10, 1], "1/10 = 0,1 dengan batang sepuluh sel, satu terisi");
  const b1 = T(M, "tiga-persepuluh-biskuit", 1);
  sama([pecahanTeks(b1, "bf"), nilaiId(b1, "bh"), sel(b1, "bi").length, terisi(b1, "bi").length], [["3", "10"], "0,3", 10, 3], "3/10 = 0,3 dengan batang sepuluh sel, tiga terisi");
  const b3 = T(M, "tiga-persepuluh-biskuit", 3);
  sama([sel(b3, "bl").length, terisi(b3, "bl").length, pecahanTeks(b3, "bn"), nilaiId(b3, "bp")], [100, 1, ["1", "100"], "0,01"], "seratus biskuit: kisi seratus kotak, satu terisi, 1/100 = 0,01");
  sama(nilaiId(b3, "bq"), "2 angka di belakang koma", "0,01 dua angka di belakang koma");
  // Contoh pecahan desimal dan aturan.
  const c0 = T(M, "contoh-angka-koma", 0);
  sama([sel(c0, "cd").length, terisi(c0, "cd").length, pecahanTeks(c0, "ca"), nilaiId(c0, "cc")], [100, 7, ["7", "100"], "0,07"], "7/100 = 0,07 dengan kisi seratus, tujuh terisi");
  const c1 = T(M, "contoh-angka-koma", 1);
  sama([nilaiId(c1, "ci"), pecahanTeks(c1, "ck")], ["0,1", ["1", "10"]], "contoh buku: 0,1 = 1/10");
  const c2 = T(M, "contoh-angka-koma", 2);
  sama([nilaiId(c2, "cn"), pecahanTeks(c2, "cp")], ["0,25", ["25", "100"]], "contoh buku: 0,25 = 25/100");
  sama(desimalDari(25, 100), "0,25", "25/100 = 0,25 menurut hitungan mandiri");
  const c4 = T(M, "contoh-angka-koma", 4);
  sama([nilaiId(c4, "ct-t0"), nilaiId(c4, "cu-t0")], ["0,3  →  1 angka  →  3/10", "0,07  →  2 angka  →  7/100"], "penerapan aturan: 0,3 dan 0,07");
  // Hati-hati dengan nol.
  const h0 = T(M, "hati-hati-nol", 0);
  sama([sel(h0, "hm").length, terisi(h0, "hm").length, sel(h0, "hp").length, terisi(h0, "hp").length], [100, 7, 10, 7], "0,07 tujuh dari seratus kotak, 0,7 tujuh dari sepuluh sel");
  cek(nilaiDesimal("0,07") !== nilaiDesimal("0,7") && 7 / 100 === 0.07 && 7 / 10 === 0.7, "0,07 dan 0,7 bukan bilangan yang sama");
  cek(1 / 100 < 1 / 10, "1/100 lebih kecil dari 1/10");
  const h1 = T(M, "hati-hati-nol", 1);
  sama([nilaiId(h1, "hr-t0"), nilaiId(h1, "hs-t0")], ["0,01 = 1/100", "0,1 = 1/10"], "0,01 = 1/100 dan 0,1 = 1/10");
  // Ayo Berlatih 1: benda dan bingkai dihitung ulang dari gambar.
  const jenis = ["telur", "jeruk", "jam"];
  jenis.forEach((j, i) => {
    const o = T(M, "berlatih-satu", i + 1);
    const [n, p, d] = SATU[i];
    sama([hitungBenda(o, `s${i}`).length, dalamBingkai(o, `s${i}`)], [p, n], `Ayo Berlatih 1 ${j}: ${p} benda, ${n} dalam kotak`);
    sama([pecahanTeks(o, `s${i}f`), nilaiId(o, `s${i}d`)], [[String(n), String(p)], d], `Ayo Berlatih 1 ${j}: ${n}/${p} = ${d} di gambar`);
  });
  const k5 = T(M, "berlatih-satu", 4);
  sama([1, 2, 3].map((r) => [nilaiId(k5, `lk${r}-t1`), nilaiId(k5, `lk${r}-t2`)]), SATU.map(([n, p, d]) => [`${n}/${p}`, d]), "tabel kunci nomor 1");
  // Ayo Berlatih 2: batang sepuluh sel.
  const d3 = T(M, "berlatih-dua", 2);
  DUA.forEach(([n, d], i) => {
    sama([sel(d3, `m${i}b`).length, terisi(d3, `m${i}b`).length, terisiPertama(d3, `m${i}b`, n)], [10, n, true], `nomor 2${"abc"[i]}: batang sepuluh sel, ${n} terisi`);
    sama([pecahanTeks(d3, `m${i}f`), nilaiId(d3, `m${i}d`)], [[String(n), "10"], d], `nomor 2${"abc"[i]}: ${n}/10 = ${d} di gambar`);
  });
  sama(sel(d3, "m2b").filter((o) => o.warna === putih).length, 1, "nomor 2c: hanya satu bagian kosong");
  const d4 = T(M, "berlatih-dua", 3);
  sama([1, 2, 3].map((r) => [nilaiId(d4, `mk${r}-t1`), nilaiId(d4, `mk${r}-t2`)]), DUA.map(([n, d]) => [`${n}/10`, d]), "tabel kunci nomor 2");
  // Ayo Berlatih 3: kisi seratus kotak, kolom penuh dari kiri.
  TIGA.forEach(([n, d], i) => {
    const o = T(M, "berlatih-tiga", i + 1);
    sama([sel(o, `n${i}g`).length, terisi(o, `n${i}g`).length, terisiPertama(o, `n${i}g`, n)], [100, n, true], `nomor 3${"abc"[i]}: kisi seratus kotak, ${n} terisi dari kolom kiri`);
    sama([pecahanTeks(o, `n${i}f`), nilaiId(o, `n${i}d`)], [[String(n), "100"], d], `nomor 3${"abc"[i]}: ${n}/100 = ${d} di gambar`);
    sama([Math.floor(n / 10), n % 10], [[6, 2], [1, 5], [8, 1]][[62, 15, 81].indexOf(n)], `nomor 3${"abc"[i]}: kolom penuh dan kotak sisa`);
  });
  const n5 = T(M, "berlatih-tiga", 4);
  sama([1, 2, 3].map((r) => [nilaiId(n5, `nk${r}-t1`), nilaiId(n5, `nk${r}-t2`)]), TIGA.map(([n, d]) => [`${n}/100`, d]), "tabel kunci nomor 3");
  // Periksa kunci.
  const p1 = T(M, "periksa-kunci", 1);
  sama([nilaiId(p1, "pd1-t1"), nilaiId(p1, "pd1-t2"), nilaiId(p1, "pd2-t1"), nilaiId(p1, "pd2-t2")], ["4/10  5/10  3/10", "0,4  0,5  0,3", "1/10  5/10  9/10", "0,1  0,5  0,9"], "periksa kunci nomor 1 dan 2");
  const p2 = T(M, "periksa-kunci", 2);
  sama([1, 2, 3].map((r) => [nilaiId(p2, `pe${r}-t1`), nilaiId(p2, `pe${r}-t2`)]), TIGA.map(([n, d]) => [`${n}/100`, d]), "periksa kunci nomor 3");
  sama(nilaiId(T(M, "periksa-kunci", 3), "pf"), "9 dari 9 benar", "sembilan kunci diperiksa");
  // Usul soal tambahan dari video (bukan dari buku).
  const ds = T(M, "diferensiasi", 4);
  sama([sel(ds, "do").length, terisi(ds, "do").length, desimalDari(6, 10), desimalDari(34, 100)], [10, 6, "0,6", "0,34"], "usul soal tambahan: 6/10 = 0,6 dan 34/100 = 0,34");
  sama([nilaiId(ds, "dq-t0"), nilaiId(ds, "dr-t0")], ["jawaban: 6/10 = 0,6", "34/100  →  0,34"], "usul soal tambahan: jawaban di gambar");

  /* ------------------------------ Metode luar ------------------------------ */
  const lr = T(U, "luar-persepuluhan-terapan", 0);
  sama([hitungBenda(lr, "ta").length, hitungBenda(lr, "ta").filter((o) => o.warna === G.WARNA_SELAI).length, pecahanTeks(lr, "tb"), nilaiId(lr, "td")], [10, 1, ["1", "10"], "0,1"], "luar Tenths Hundredths: roti 1/10 = 0,1");
  sama([pecahanTeks(T(U, "luar-persepuluhan-terapan", 1), "tf"), nilaiId(T(U, "luar-persepuluhan-terapan", 1), "ti")], [["1", "100"], "0,01"], "luar: biskuit 1/100 = 0,01");
  const lc = T(U, "luar-persepuluhan-terapan", 2);
  sama([nilaiId(lc, "tj-t0"), nilaiId(lc, "tk-t0")], ["0,25  →  2 angka  →  25/100", "7/100  →  0,07  (satu nol di depan)"], "luar: contoh buku 0,25 dan 7/100");
  const le = T(U, "luar-persepuluhan-terapan", 3);
  sama([nilaiId(le, "tm-t0"), nilaiId(le, "tm-t1"), nilaiId(le, "tn-t0"), nilaiId(le, "tn-t1")], ["4/10  persepuluhan", "0,4", "15/100  perseratusan", "0,15"], "luar: telur 4/10 = 0,4 dan 15/100 = 0,15");
  const g0 = T(U, "luar-kisi", 0);
  sama([sel(g0, "ga").length, terisi(g0, "ga").length], [100, 0], "luar Decimal Grid: kisi 100 kotak sama besar");
  const g1 = T(U, "luar-kisi", 1);
  sama([terisi(g1, "ga").length, terisiPertama(g1, "ga", 20)], [20, true], "luar: dua kolom penuh = 20 kotak = 0,2");
  const g2 = T(U, "luar-kisi", 2);
  sama([sel(g2, "gg").length, terisi(g2, "gg").length, terisiPertama(g2, "gg", 10)], [100, 10, true], "luar: satu kolom = 10 kotak (sepuluh per seratus = satu per sepuluh)");
  sama(10 / 100 === 1 / 10, true, "10/100 sama dengan 1/10");
  const g3 = T(U, "luar-kisi", 3);
  sama([terisi(g3, "gm").length, terisiPertama(g3, "gm", 34), 3 * 10 + 4], [34, true, 34], "luar: 3 kolom penuh dan 4 kotak = 34 dari 100");
  const KISI = [[40, "4", "10", "0,4"], [15, "15", "100", "0,15"], [62, "62", "100", "0,62"], [81, "81", "100", "0,81"]];
  KISI.forEach(([n, a, b, d], i) => {
    const o = T(U, "luar-kisi-terapan", i);
    const id = `k${"abcd"[i]}`;
    sama([sel(o, `${id}g`).length, terisi(o, `${id}g`).length, terisiPertama(o, `${id}g`, n)], [100, n, true], `luar Decimal Grid: kisi seratus, ${n} terisi dari kolom kiri`);
    sama([pecahanTeks(o, `${id}f`), nilaiId(o, `${id}d`)], [[a, b], d], `luar Decimal Grid: ${a}/${b} = ${d}`);
    cek(Math.abs(nilaiDesimal(d) - Number(a) / Number(b)) < 1e-12 && nilaiDesimal(d) * 100 === n, `luar Decimal Grid: ${d} sama dengan ${n} per 100`);
  });
  sama(100 - 81, 19, "kisi 81: kosong 19");
  // Jembatan: tiap pasang kartu pecahan dan desimal dihitung ulang.
  let pasang = 0;
  for (const idA of ["luar-jembatan", "luar-jembatan-terapan"]) {
    const a = adegan(U, idA);
    a.ketukan.forEach((_, ke) => {
      const o = akhirAdegan(a, ke);
      for (const x of o.filter((q) => /-k1-t0$/.test(q.id))) {
        const dasar = x.id.replace(/-k1-t0$/, "");
        const y = nilaiId(o, `${dasar}-k2-t0`);
        const [pec, des] = /\//.test(x.isi) ? [x.isi, y] : [y, x.isi];
        const [n, p] = pec.split("/").map(Number);
        pasang += 1;
        cek(desimalDari(n, p) === des && Math.abs(nilaiDesimal(des) - n / p) < 1e-12, `luar jembatan ${idA}/${dasar}: ${pec} dan ${des} sama nilainya`);
      }
    });
  }
  cek(pasang >= 12, `jembatan: banyak pasangan pecahan dan desimal yang dihitung ulang (${pasang})`);
  stat.data += pasang;
  // Tabel nilai tempat: baris angka dihitung ulang menjadi desimal dan pecahan.
  const baris = (o, id) => [0, 1, 2, 3].map((c) => nilaiId(o, `${id}-t${c}`) ?? "");
  const bacaDes = (r) => `${r[0]},${r[2]}${r[3]}`;
  const tp = (ke, id) => baris(T(U, "luar-tempat", ke), id);
  sama([tp(1, "pc"), tp(2, "pi"), tp(3, "pm")], [["0", ",", "2", "5"], ["0", ",", "2", "5"], ["0", ",", "0", "7"]], "luar Place Value Chart: baris 0,25 dan 0,07");
  sama([20 + 5, 2 * 10, 2 / 10 === 20 / 100], [25, 20, true], "luar: 2/10 = 20/100 dan 20/100 + 5/100 = 25/100");
  const q = (ke) => T(U, "luar-tempat-terapan", ke);
  sama([baris(q(0), "qa"), baris(q(1), "qa"), baris(q(2), "qa")], [["0", ",", "1", ""], ["0", ",", "0", "1"], ["0", ",", "2", "5"]], "luar Place Value Chart: roti 0,1, biskuit 0,01, contoh 0,25");
  sama([`0,${baris(q(0), "qa")[2]}`, `0,${baris(q(1), "qa")[2]}${baris(q(1), "qa")[3]}`, bacaDes(baris(q(2), "qa"))], ["0,1", "0,01", "0,25"], "luar: tabel nilai tempat dibaca menjadi desimal");
  sama(nilaiId(q(2), "qd-t0"), "2/10 + 5/100 = 25/100", "luar: 0,25 = 2 persepuluhan + 5 perseratusan");
  sama(2 / 10 + 5 / 100, 0.25, "2/10 + 5/100 = 0,25 (hitungan mandiri)");
  const q3 = q(3);
  sama(["qe", "qf", "qg"].map((id) => bacaDes(baris(q3, id))), TIGA.map(([, d]) => d), "luar: tiga baris tabel nilai tempat = 0,15; 0,62; 0,81");
  sama(nilaiId(T(U, "luar-ringkas", 1), "rt3-t1"), "62/100, 81/100", "luar: ringkasan memuat 62/100 dan 81/100");
  sama(nilaiId(T(U, "luar-ringkas", 1), "rt1-t1"), "1/10, 4/10, 5/10, 9/10", "luar: ringkasan persepuluhan");
  stat.data += 1;

  // Pemindaian umum: setiap teks yang memuat sebuah desimal dan sebuah pecahan harus bernilai sama, dan "N angka" cocok dengan banyak angka di belakang koma.
  let diperiksa = 0;
  for (const v of [M, U]) {
    for (const a of v.adegan) {
      const sudah = new Set();
      a.ketukan.forEach((kt, i) => {
        for (const o of L.keadaanStory(a, i, 9999)) {
          if (o.t !== "teks" || !o.isi || sudah.has(o.isi)) continue;
          sudah.add(o.isi);
          if (/salah|bukan|≠/.test(o.isi)) continue;
          const dm = o.isi.match(/\b0,(\d+)\b/);
          const pm = o.isi.match(/\b(\d+)\/(\d+)\b/);
          if (dm && pm) {
            diperiksa += 1;
            const dec = nilaiDesimal(`0,${dm[1]}`);
            cek(Math.abs(dec - Number(pm[1]) / Number(pm[2])) < 1e-12 && Number(pm[2]) === 10 ** dm[1].length, `${v.id}/${a.id}: teks "${o.isi}" desimal dan pecahannya sama`);
            const an = o.isi.match(/(\d+) angka/);
            if (an) cek(Number(an[1]) === dm[1].length, `${v.id}/${a.id}: teks "${o.isi}" banyak angka di belakang koma`);
          }
        }
      });
    }
  }
  cek(diperiksa >= 12, `pemindaian desimal dan pecahan dalam satu teks (${diperiksa})`);
  stat.data += diperiksa;
}

/* ------------------------------ Kutipan buku (bila PDF tersedia) ------------------------------ */
{
  const bs = new URL("../bahan-sd/Matematika-BS-KLS-IV.pdf", import.meta.url);
  const bg = new URL("../bahan-sd/Matematika-BG-KLS-IV.pdf", import.meta.url);
  const jalur = (u) => u.pathname.replace(/^\/([A-Za-z]:)/, "$1");
  const KODE_PY = "import sys, pymupdf\nsys.stdout.reconfigure(encoding='utf-8')\nd = pymupdf.open(sys.argv[1])\nsys.stdout.write('\\n'.join(d[i - 1].get_text() for i in range(int(sys.argv[2]), int(sys.argv[3]) + 1)))";
  const ambil = (berkas, dari, sampai) => {
    const r = spawnSync("pdftotext", ["-enc", "UTF-8", "-f", String(dari), "-l", String(sampai), "-raw", jalur(berkas), "-"], { encoding: "utf8", maxBuffer: 1 << 26 });
    if (r.status === 0) return r.stdout;
    // Cadangan bila pdftotext tidak ada: PyMuPDF (python -I).
    const p = spawnSync("python", ["-I", "-c", KODE_PY, jalur(berkas), String(dari), String(sampai)], { encoding: "utf8", maxBuffer: 1 << 26 });
    return p.status === 0 ? p.stdout : null;
  };
  // Kelas IV: Buku Siswa hlm. N = PDF N+12 (hlm. 71-75 = PDF 83-87; subbab E mulai di tengah PDF 87); Panduan Guru hlm. N = PDF N+12 (hlm. 104-107 = PDF 116-119; subbab E mulai di tengah PDF 119, subbab D mulai di tengah PDF 116).
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 83, 87), ambil(bg, 116, 119), ambil(bs, 82, 82), ambil(bg, 120, 120)] : [null];
  if (bagian.some((b) => b === null)) console.log("PDF atau pembaca PDF tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const siswaPenuh = bersih(bagian[0]);
    const guruPenuh = bersih(bagian[1]);
    const awalE = siswaPenuh.indexOf("e. menghubungkan pecahan desimal perseratusan dengan konsep persen");
    const awalEG = guruPenuh.indexOf("e. menghubungkan pecahan desimal perseratusan dengan konsep persen");
    const awalDG = guruPenuh.indexOf("d. pecahan desimal persepuluhan dan perseratusan");
    cek(awalE > 0 && awalEG > 0 && awalDG >= 0, "subbab E mulai di Buku Siswa PDF 87 dan Panduan Guru PDF 119; subbab D mulai di Panduan Guru PDF 116");
    cek(siswaPenuh.indexOf("d. pecahan desimal persepuluhan dan perseratusan") >= 0 && siswaPenuh.indexOf("d. pecahan desimal persepuluhan dan perseratusan") < awalE, "subbab D mulai di Buku Siswa PDF 83");
    cek(!/d\. pecahan desimal persepuluhan dan perseratusan/.test(bersih(bagian[2])), "Buku Siswa PDF 82 belum memuat subbab D");
    cek(/e\. menghubungkan/.test(bersih(bagian[3])) === false, "Panduan Guru PDF 120 bukan lagi awal subbab E");
    const siswa = siswaPenuh.slice(0, awalE);
    const guru = guruPenuh.slice(awalDG, awalEG);
    const buku = `${siswa}\n${guru}`;
    let n = 0;
    for (const a of M.adegan) {
      for (const kt of a.kutipan ?? []) {
        n += 1;
        cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
      }
    }
    stat.kutipan = n;
    cek(n >= 80, `jumlah kutipan buku yang diperiksa (${n})`);
    cek(M.adegan.every((a) => (a.kutipan ?? []).length >= 5), "tiap adegan materi memuat paling sedikit 5 kutipan buku");
    // Angka kunci dan istilah yang dipakai video.
    for (const t of ["4 10 = 0,4 5 10 = 0,5 3 10 = 0,3", "a. 1 10 = 0,1 b. 5 10 = 0,5 c.", "9 10 = 0,9 15 100 = 0,15 62 100 = 0,62 81 100 = 0,81", "bentuk bisa dituliskan dalam bentuk desimal menjadi 0,1.", "menjadi 0,3 ibu?", "desimal 0,01.", "bisa dituliskan dalam bentuk desimal menjadi 0,07.", "maka nilai penyebut 10", "maka nilai penyebut 100", "0,1 = 25 100 0,25 =", "ibu sudah siapkan roti yang jumlahnya ada 10.", "kita memiliki 100 biskuit"]) {
      cek(guru.includes(t) || siswa.includes(t), `Panduan Guru atau Buku Siswa memuat "${t}"`);
    }
    // Keganjilan dan temuan buku yang dicatat di video.
    cek(guru.includes("2. ubahkan pecahan biasa berikut") && siswa.includes("2. ubahlah pecahan biasa berikut") && siswa.includes("3. ubahlah pecahan biasa berikut"), "Panduan Guru nomor 2 memakai 'ubahkan', Buku Siswa 'ubahlah'");
    cek(guru.includes("serta menghubungkan pecahan desimal perseratusan dengan konsep persen"), "Panduan Guru D: pengalaman belajar memuat konsep persen (sama dengan subbab E)");
    cek(guruPenuh.slice(awalEG).includes("serta menghubungkan pecahan desimal perseratusan dengan konsep persen"), "Panduan Guru E memuat kalimat pengalaman belajar yang sama");
    cek(!/persen|%/.test(siswa), "Buku Siswa subbab D tidak membahas persen");
    cek(!/kunci/.test(siswa), "Buku Siswa subbab D tanpa kunci (kunci dari Panduan Guru)");
    cek(siswa.includes("100 biskuit") && !siswa.includes("seratus biskuit"), "Buku Siswa: 100 biskuit hanya disebut dalam kalimat, tanpa gambar atau soal");
    cek(guru.includes("problem based learning") && guru.includes("metode diskusi"), "Panduan Guru D: Problem Based Learning dan metode diskusi");
    cek(guru.includes("kebutuhan sarana prasarana dan media alat tulis"), "Panduan Guru D: sarana alat tulis");
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k4b2d-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k4b2d-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k4b2d sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k4b2d.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_D42|video-k4b2-umum|naskah-k4b2/.test(pembungkus) && /VIDEO_MATERI_K4B2D/.test(pembungkus) && /VIDEO_LUAR_K4B2D/.test(pembungkus) && /export function VideoK4B2D/.test(pembungkus), "video-k4b2d.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k4b2d.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k4b2d.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k4b2d.mjs: akhir baris LF");
}

for (const v of [M, U]) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.kutipan} kutipan terhadap teks PDF, ${stat.terbilang} bilangan berkata, ${stat.persamaan} persamaan, ${stat.teksPasang} pasangan teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
