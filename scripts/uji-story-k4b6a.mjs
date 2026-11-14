// Uji Story Kelas 4 Bab 6 Sub-Bab A (piktogram, termasuk pembuka bab): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar (angka dan bilangan yang diucapkan dengan kata), perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, tidak membocorkan Diagram Batang (Sub-Bab B), kutipan buku terhadap teks PDF (pdftotext -enc UTF-8),
// hitungan mandiri (jumlah tiap tabel, kunci Panduan Guru, perkalian skala), geometri gambar (sel tabel piktogram, baris kunci, turus kelompok lima),
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k4b6a.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b6a-video.ts");

const stat = { ikon: 0, turus: 0, terbilang: 0, teksPasang: 0, persamaan: 0 };
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
const hampir = (a, b, tol, pesan) => cek(Math.abs(a - b) <= tol, `${pesan}: ${a} != ${b} (toleransi ${tol})`);

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
const VIDEO = [V.VIDEO_MATERI_K4B6A, V.VIDEO_LUAR_K4B6A];
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
    cek(a.ketukan.length >= 4 && a.ketukan.length <= 14, `${nama}: 4 sampai 14 ketukan (ada ${a.ketukan.length})`);
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
const M2 = await import("../src/components/modul/story/k4b6a-materi-2.ts");
const M3 = await import("../src/components/modul/story/k4b6a-materi-3.ts");
const M = V.VIDEO_MATERI_K4B6A;
const U = V.VIDEO_LUAR_K4B6A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const objId = (objs, id) => objs.find((o) => o.id === id);
const nilaiId = (objs, id) => objs.find((o) => o.id === id)?.isi;
const T = (v, id, ke) => akhirAdegan(adegan(v, id), ke);
const jumlah = (a) => a.reduce((s, n) => s + n, 0);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  const METODE = ["Pictograph Key", "Categorical Tally", "Read then Compare", "Scale Multiply"];
  const NAMA_ID = ["Kunci Piktogram", "Turus Kategori", "Baca Lalu Banding", "Kali Skala"];
  cek(!/Pictograph Key|Categorical Tally|Read then Compare|Scale Multiply|Kunci Piktogram|Turus Kategori|Baca Lalu Banding|Kali Skala|metode luar|metode dari luar/i.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of [...METODE, ...NAMA_ID]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(M.adegan.every((a) => /(Buku Siswa|Panduan Guru) hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Bab 6", "Peta konsep", "Kata kunci", "Apersepsi", "Aktivitas 1", "Aktivitas 2", "Karel", "bunga", "warna kesukaan", "kelereng", "perpustakaan", "Ayo Berlatih", "Ayo Berpikir", "Miskonsepsi", "Diferensiasi", "Refleksi", "Panduan guru", "Project Based Learning"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat ${kata}`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-kunci", "luar-kunci-terapan", "luar-turus", "luar-turus-terapan", "luar-baca", "luar-baca-terapan", "luar-skala", "luar-skala-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[0].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  cek(M.adegan.length === 12 && U.adegan.length === 10, "12 adegan materi dan 10 adegan metode luar");
  // Sub-Bab A tidak membocorkan Diagram Batang. Pembuka bab dan peta konsep boleh menyebutnya sebagai daftar tujuan dan bentuk penyajian data.
  const BOCOR = /batang|mendatar|sumbu|Aktivitas 3|Aktivitas 4|tegak lurus/i;
  const boleh = ["pembuka-bab", "peta-konsep"];
  for (const a of M.adegan.filter((x) => !boleh.includes(x.id))) cek(!BOCOR.test(teksAdegan(a)), `materi ${a.id} tidak membocorkan Diagram Batang`);
  for (const a of U.adegan) cek(!BOCOR.test(teksAdegan(a)), `metode luar ${a.id} tidak membocorkan Diagram Batang`);
  cek(["pembuka-bab", "peta-konsep"].every((i) => BOCOR.test(teksAdegan(adegan(M, i)))), "pembuka dan peta konsep menyebut diagram batang sebagai daftar bab");
  cek(!/Uji Kompetensi|pengayaan|remedial/i.test(materi + luar), "tidak memakai Uji Kompetensi, pengayaan, remedial milik penutup bab");
  cek(totalKetukan >= 80, `total ketukan cukup dalam (${totalKetukan})`);
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
  const t = s.replace(/×/g, "*").replace(/x/g, "*").replace(/−/g, "-");
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
          const m = o.isi.match(/^([\d\s+×x−-]+?)\s*=\s*(\d+)(?:\D.*)?$/);
          if (m && /[+×x−-]/.test(m[1])) {
            stat.persamaan += 1;
            cek(hitungEks(m[1]) === Number(m[2]), `${v.id}/${a.id}: persamaan "${o.isi}" dihitung ulang`);
          }
        }
    });
  }
}

/* ------------------------------ Data buku dan hitungan mandiri ------------------------------ */
const BUKU_DATA = {
  kelas: [2, 1, 1, 8],
  karel: [6, 4, 3, 1, 9],
  warna: [4, 2, 1, 5],
  kelereng: [5, 6, 2, 8, 5, 4],
  buku: [12, 6, 9, 3, 12, 14],
  gambarKelas: [6, 6, 7, 8, 5, 7],
};
const iconBaris = (objs, id, n) => Array.from({ length: n }, (_, i) => objs.filter((o) => new RegExp(`^${id}-i${i}-\\d+$`).test(o.id)).length);
const nilaiBaris = (objs, id, n) => Array.from({ length: n }, (_, i) => nilaiId(objs, `${id}-n${i}`));
{
  sama(M2.KELAS, BUKU_DATA.kelas, "data benda kelas");
  sama(M2.KAREL, BUKU_DATA.karel, "data mainan Karel");
  sama(M2.WARNA, BUKU_DATA.warna, "data warna kesukaan");
  sama(M3.KELERENG, BUKU_DATA.kelereng, "data kelereng");
  sama(M3.BUKU, BUKU_DATA.buku, "data buku dipinjam");
  sama(M3.GAMBAR_KELAS, BUKU_DATA.gambarKelas, "data gambar siswa tiap kelas");
  sama(jumlah(BUKU_DATA.kelas), 12, "jumlah benda kelas");
  sama(jumlah(BUKU_DATA.karel), 23, "jumlah mainan Karel (buku: 23)");
  sama(jumlah(BUKU_DATA.warna), 12, "jumlah siswa warna kesukaan (buku: 12)");
  sama(jumlah(BUKU_DATA.kelereng), 30, "jumlah kelereng");
  sama(jumlah(BUKU_DATA.buku), 56, "jumlah buku seminggu (kunci Panduan Guru: 56)");
  sama(BUKU_DATA.buku[3] + BUKU_DATA.buku[4], 15, "Kamis dan Jumat (kunci: 15)");
  sama(BUKU_DATA.buku.indexOf(Math.max(...BUKU_DATA.buku)), 5, "paling banyak: Sabtu");
  sama(BUKU_DATA.buku.indexOf(Math.min(...BUKU_DATA.buku)), 3, "paling sedikit: Kamis");
  sama(BUKU_DATA.buku.indexOf(14), 5, "empat belas buku: Sabtu");
  sama(Math.max(...BUKU_DATA.buku) - Math.min(...BUKU_DATA.buku), 11, "selisih terbanyak dan tersedikit");
  sama(jumlah(BUKU_DATA.gambarKelas), 39, "jumlah gambar siswa");
  sama(jumlah(BUKU_DATA.gambarKelas) * 4, 156, "jumlah siswa seluruh kelas (kunci: 156)");
  sama(BUKU_DATA.gambarKelas.map((n) => n * 4), [24, 24, 28, 32, 20, 28], "siswa tiap kelas");
  sama(jumlah(BUKU_DATA.gambarKelas.map((n) => n * 4)), 156, "jumlah baris demi baris sama dengan 156");
  sama(BUKU_DATA.gambarKelas[3] * 4, 32, "kelas IV (kunci: 32)");
  sama(BUKU_DATA.gambarKelas.map((n, i) => (n * 4 === 24 ? i : -1)).filter((i) => i >= 0), [0, 1], "24 siswa: kelas I dan II");
  sama(BUKU_DATA.gambarKelas.indexOf(Math.min(...BUKU_DATA.gambarKelas)), 4, "paling sedikit: kelas V");
  sama(BUKU_DATA.gambarKelas.indexOf(Math.max(...BUKU_DATA.gambarKelas)), 3, "paling banyak: kelas IV");
  sama(BUKU_DATA.warna.indexOf(Math.max(...BUKU_DATA.warna)), 3, "warna paling banyak: merah");
  sama(BUKU_DATA.karel.indexOf(Math.max(...BUKU_DATA.karel)), 4, "mainan paling banyak: kelereng");
  sama(BUKU_DATA.karel.indexOf(Math.min(...BUKU_DATA.karel)), 3, "mainan paling sedikit: puzzle");

  // Banyak gambar pada gambar tiap tabel sama dengan data buku.
  sama(iconBaris(T(M, "benda-kelas", 0), "kl", 4), BUKU_DATA.kelas, "gambar benda kelas");
  sama(iconBaris(T(M, "mainan-karel", 0), "kr", 5), BUKU_DATA.karel, "gambar mainan Karel");
  sama(nilaiBaris(T(M, "mainan-karel", 1), "kr", 5), BUKU_DATA.karel.map(String), "angka jumlah mainan Karel");
  sama(iconBaris(T(M, "warna-kesukaan", 0), "wk", 4), BUKU_DATA.warna, "gambar warna kesukaan");
  sama(nilaiBaris(T(M, "warna-kesukaan", 2), "wk", 4), BUKU_DATA.warna.map(String), "angka warna kesukaan");
  sama(Array.from({ length: 6 }, (_, i) => nilaiId(T(M, "berlatih-satu", 1), `dt${i}`)), BUKU_DATA.kelereng.map(String), "tabel data kelereng");
  sama(iconBaris(T(M, "berlatih-satu", 2), "kl", 6), BUKU_DATA.kelereng, "gambar piktogram kelereng");
  sama(nilaiBaris(T(M, "berlatih-satu", 3), "kl", 6), BUKU_DATA.kelereng.map(String), "angka jumlah kelereng");
  sama(iconBaris(T(M, "berlatih-dua", 1), "bk", 6), BUKU_DATA.buku, "gambar buku dipinjam");
  sama(nilaiBaris(T(M, "berlatih-dua", 1), "bk", 6), BUKU_DATA.buku.map(String), "angka buku dipinjam");
  sama(iconBaris(T(M, "ayo-berpikir", 0), "ks", 6), BUKU_DATA.gambarKelas, "gambar siswa tiap kelas");
  sama(iconBaris(T(U, "luar-kunci-terapan", 0), "wk", 4), BUKU_DATA.warna, "metode luar: gambar warna kesukaan");
  sama(iconBaris(T(U, "luar-baca", 0), "kl", 4), BUKU_DATA.kelas, "metode luar: gambar benda kelas");
  sama(iconBaris(T(U, "luar-skala-terapan", 0), "ks", 6), BUKU_DATA.gambarKelas, "metode luar: gambar siswa tiap kelas");
  const tb = T(U, "luar-baca-terapan", 0);
  sama(M3.HARI.map((_, i) => objId(tb, `bb${i}`).w), BUKU_DATA.buku.map((n) => n * 13), "metode luar: panjang batang buku = nilai x 13");
  sama(M3.HARI.map((_, i) => nilaiId(tb, `bv${i}`)), BUKU_DATA.buku.map(String), "metode luar: angka batang buku");
  // Pasangan teks yang dipisah dua baris: dihitung ulang di sini.
  sama(nilaiId(T(M, "benda-kelas", 2), "jm"), "2 + 1 + 1 + 8", "jumlah benda kelas ditulis");
  sama(nilaiId(T(M, "benda-kelas", 2), "jm2"), `= ${jumlah(BUKU_DATA.kelas)} benda`, "hasil benda kelas");
  sama(nilaiId(T(M, "berlatih-dua", 4), "f2"), BUKU_DATA.buku.join(" + "), "jumlah buku ditulis");
  sama(nilaiId(T(M, "berlatih-dua", 4), "f3"), `= ${jumlah(BUKU_DATA.buku)}`, "hasil buku");
  sama(nilaiId(T(M, "berlatih-dua", 3), "d3"), `${BUKU_DATA.buku[3]} + ${BUKU_DATA.buku[4]} = ${BUKU_DATA.buku[3] + BUKU_DATA.buku[4]}`, "Kamis dan Jumat ditulis");
  const kartuSiswa = T(U, "luar-skala-terapan", 3);
  sama([nilaiId(kartuSiswa, "sz2-t0"), nilaiId(kartuSiswa, "sz2-t1")], [BUKU_DATA.gambarKelas.map((n) => n * 4).join(" + "), `= ${jumlah(BUKU_DATA.gambarKelas) * 4} siswa`], "metode luar: jumlah baris demi baris");
  // Pembuka metode luar memuat angka-angka yang sama dengan data buku.
  const ob = T(U, "luar-pembuka", 3);
  sama([nilaiId(ob, "a1-t0"), nilaiId(ob, "a2-t0"), nilaiId(ob, "a3-t0"), nilaiId(ob, "a4-t0")], [`warna kesukaan: ${BUKU_DATA.warna.join(", ")} siswa`, `mainan Karel: ${BUKU_DATA.karel.join(", ")}`, `buku dipinjam: ${BUKU_DATA.buku.join(", ")}`, `gambar siswa tiap kelas: ${BUKU_DATA.gambarKelas.join(", ")}`], "metode luar: pembuka memuat data buku");
  // Pictograph Key: gambar yang sama dengan kunci 1, 2, 5 untuk tiga gambar.
  const kk = T(U, "luar-kunci", 1);
  sama([1, 2, 5].map((s, i) => nilaiId(kk, `r${i + 1}t`)), [1, 2, 5].map((s) => `kunci ${s}: ${3 * s} siswa`), "metode luar: tiga gambar dikali kunci");
  // Kunci diganti 2: nilai tiap warna dua kali lipat.
  const kt = T(U, "luar-kunci-terapan", 2);
  sama(BUKU_DATA.warna.map((_, i) => nilaiId(kt, `wk-n${i}`)), BUKU_DATA.warna.map((n) => String(n * 2)), "metode luar: kunci 2 melipatkan dua tiap nilai");
  sama(nilaiId(kt, "wk-kt"), "menyatakan 2 siswa", "metode luar: tulisan kunci diganti");
  sama(jumlah(BUKU_DATA.warna) * 2, 24, "dua belas siswa menjadi dua puluh empat");
  // Scale Multiply: contoh kecil dan jalan pintas.
  sama([3 * 2, 2 + 3 + 1, (2 + 3 + 1) * 2, 4 + 6 + 2], [6, 6, 12, 12], "metode luar: contoh Kali Skala");
}

/* ------------------------------ Geometri: tabel piktogram dan turus ------------------------------ */
const kotakDari = (o) => {
  if (o.t === "kotak") return [o.x, o.y, o.x + o.w, o.y + o.h];
  if (o.t === "bulat") return [o.x - o.r, o.y - o.r, o.x + o.r, o.y + o.r];
  const u = o.u ?? 10;
  return [o.x - u * 0.5, o.y - u * 0.9, o.x + u * 0.5, o.y + u * 0.15];
};
const cekPikto = (objs, nama, id, baris) => {
  for (let i = 0; i < baris; i += 1) {
    const sel = objId(objs, `${id}-a${i}`);
    const lab = objId(objs, `${id}-l${i}`);
    if (!sel || !lab) continue;
    cek(Math.abs(lab.y - sel.y) < 1e-6 && Math.abs(lab.x + lab.w - sel.x) < 1e-6 && lab.h === sel.h, `${nama}: sel nama dan sel gambar baris ${i} sebaris`);
    if (i > 0) {
      const atas = objId(objs, `${id}-a${i - 1}`);
      hampir(atas.y + atas.h, sel.y, 1e-6, `${nama}: baris ${i} menempel baris sebelumnya`);
    }
    const ikon = objs.filter((o) => new RegExp(`^${id}-i${i}-\\d+$`).test(o.id)).sort((p, q) => Number(p.id.split("-").pop()) - Number(q.id.split("-").pop()));
    ikon.forEach((o, j) => {
      stat.ikon += 1;
      const b = kotakDari(o);
      cek(b[0] >= sel.x - 0.5 && b[2] <= sel.x + sel.w + 0.5 && b[1] >= sel.y - 0.5 && b[3] <= sel.y + sel.h + 0.5, `${nama}: gambar ${o.id} berada di dalam selnya`);
      if (j > 0) {
        const c = kotakDari(ikon[j - 1]);
        cek(b[0] >= c[2] - 4.5, `${nama}: gambar ${o.id} tidak bertumpuk dengan gambar sebelumnya`);
      }
    });
  }
};
{
  cekPikto(T(M, "benda-kelas", 0), "benda kelas", "kl", 4);
  cekPikto(T(M, "mainan-karel", 0), "mainan Karel", "kr", 5);
  cekPikto(T(M, "aktivitas-satu", 3), "Aktivitas 1", "al", 3);
  cekPikto(T(M, "aktivitas-dua", 2), "Aktivitas 2", "bg", 3);
  cekPikto(T(M, "warna-kesukaan", 0), "warna kesukaan", "wk", 4);
  cekPikto(T(M, "berlatih-satu", 2), "kelereng", "kl", 6);
  cekPikto(T(M, "berlatih-dua", 1), "buku dipinjam", "bk", 6);
  cekPikto(T(M, "ayo-berpikir", 0), "siswa tiap kelas", "ks", 6);
  cekPikto(T(U, "luar-kunci-terapan", 0), "metode luar: warna", "wk", 4);
  cekPikto(T(U, "luar-baca", 0), "metode luar: benda kelas", "kl", 4);
  cekPikto(T(U, "luar-skala-terapan", 0), "metode luar: siswa tiap kelas", "ks", 6);
  // Baris kunci berada tepat di bawah baris terakhir dan memuat gambar yang sama dengan isi tabel.
  for (const [v, id, ke, pre, n] of [[M, "warna-kesukaan", 0, "wk", 4], [M, "berlatih-dua", 0, "bk", 6], [M, "ayo-berpikir", 0, "ks", 6], [M, "aktivitas-dua", 3, "bg", 3]]) {
    const o = T(v, id, ke);
    const kk2 = objId(o, `${pre}-kk`);
    const akhir = objId(o, `${pre}-a${n - 1}`);
    cek(kk2 && akhir && Math.abs(kk2.y - (akhir.y + akhir.h)) < 1e-6, `${id}: baris kunci tepat di bawah baris terakhir`);
    cek(!!objId(o, `${pre}-ki`) && /^menyatakan \d+ /.test(nilaiId(o, `${pre}-kt`) ?? ""), `${id}: kunci memuat gambar dan tulisan menyatakan`);
  }
  sama([nilaiId(T(M, "warna-kesukaan", 0), "wk-kt"), nilaiId(T(M, "berlatih-dua", 0), "bk-kt"), nilaiId(T(M, "ayo-berpikir", 0), "ks-kt")], ["menyatakan 1 siswa", "menyatakan 1 buku", "menyatakan 4 siswa"], "tulisan kunci sama dengan buku");

  // Turus: tiap n turus digambar n garis; tiap lima ada satu garis miring yang melintasi empat garis tegak.
  const cekTurus = (objs, nama, id, n, x) => {
    const g = objs.filter((o) => new RegExp(`^${id}-t\\d+$`).test(o.id));
    stat.turus += g.length;
    sama(g.length, n, `${nama}: ${n} turus digambar sebagai ${n} garis`);
    const miring = g.filter((o) => o.x2 !== 0);
    const tegak = g.filter((o) => o.x2 === 0);
    sama(miring.length, Math.floor(n / 5), `${nama}: garis miring tiap lima`);
    sama(tegak.length, n - Math.floor(n / 5), `${nama}: garis tegak`);
    cek(g.every((o) => o.x >= x - 3 && o.x + Math.max(0, o.x2) <= 300), `${nama}: turus di dalam kanvas`);
    for (const m of miring) {
      const bawahTegak = tegak.filter((o) => o.x >= m.x && o.x <= m.x + m.x2);
      cek(bawahTegak.length >= 4, `${nama}: garis miring ${m.id} melintasi empat garis tegak`);
    }
    for (let i = 1; i < tegak.length; i += 1) cek(tegak[i].x > tegak[i - 1].x, `${nama}: garis tegak ${tegak[i].id} di kanan garis sebelumnya`);
  };
  const tk = T(U, "luar-turus-terapan", 0);
  BUKU_DATA.karel.forEach((n, i) => cekTurus(tk, `turus Karel baris ${i + 1}`, `tk${i}`, n, 84));
  cekTurus(T(U, "luar-turus", 2), "turus tiga belas", "b", 13, 100);
  cekTurus(T(U, "luar-turus", 1), "turus lima", "a", 5, 134);
  cekTurus(T(U, "luar-turus", 0), "turus tiga", "t1", 3, 130);
  cekTurus(T(U, "luar-turus", 3), "turus ke piktogram", "c", 13, 110);
  cekTurus(T(U, "luar-turus-terapan", 3), "turus sembilan", "u", 9, 130);
  sama(objs0(T(U, "luar-turus", 3), "cg"), 13, "tiga belas turus menjadi tiga belas gambar");
  sama(objs0(T(U, "luar-turus-terapan", 3), "ug"), 9, "sembilan turus menjadi sembilan gambar");
}
function objs0(objs, awalan) {
  return objs.filter((o) => o.id.startsWith(awalan)).length;
}

/* ------------------------------ Kutipan buku (bila PDF tersedia) ------------------------------ */
{
  const bs = new URL("../bahan-sd/Matematika-BS-KLS-IV.pdf", import.meta.url);
  const bg = new URL("../bahan-sd/Matematika-BG-KLS-IV.pdf", import.meta.url);
  const jalur = (u) => u.pathname.replace(/^\/([A-Za-z]:)/, "$1");
  const ambil = (berkas, dari, sampai) => {
    const r = spawnSync("pdftotext", ["-enc", "UTF-8", "-f", String(dari), "-l", String(sampai), "-raw", jalur(berkas), "-"], { encoding: "utf8", maxBuffer: 1 << 26 });
    return r.status === 0 ? r.stdout : null;
  };
  // Kelas IV: Buku Siswa hlm. N = PDF N+12 (hlm. 177-186 = PDF 189-198; Refleksi hlm. 194 = PDF 206); Panduan Guru hlm. N = PDF N+12 (hlm. 215-223 = PDF 227-235).
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 189, 198), ambil(bs, 206, 206), ambil(bg, 227, 235)] : [null];
  if (bagian.some((b) => b === null)) console.log("PDF atau pdftotext tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const buku = bersih(bagian.join("\n"));
    let n = 0;
    for (const a of M.adegan) {
      for (const kt of a.kutipan ?? []) {
        n += 1;
        cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
      }
    }
    cek(n >= 100, `jumlah kutipan buku yang diperiksa (${n})`);
    cek(M.adegan.every((a) => (a.kutipan ?? []).length >= 5), "tiap adegan materi memuat paling sedikit 5 kutipan buku");
    cek(!/b\. diagram batang/.test(bersih(bagian[0])), "Buku Siswa PDF 189-198 tidak memuat judul subbab B");
    // Angka dalam kunci Panduan Guru dan teks Buku Siswa yang dipakai video.
    const guru = bersih(bagian[2]);
    const siswa = bersih(bagian[0]);
    for (const t of ["3 buku + 12 buku = 15 buku", "56 buku", "8 x 4 = 32 siswa", "39 x 4 = 156 siswa", "6 x 4 = 24 siswa", "kelas i dan kelas ii", "skala satu satuan", "5 gambar", "kelas v", "kelas iv"]) cek(guru.includes(t) || siswa.includes(t), `Panduan Guru atau Buku Siswa memuat "${t}"`);
    for (const t of ["6 mobil, 4 robot, 3 pesawat", "1 puzzle, dan 9 kelereng", "6 + 4 + 3 + 1 + 9 = 23", "4 + 2 + 1 + 5 = 12 siswa", "2 papan tulis, 1 jam dinding, 1 lemari dan 8 hiasan", "menyatakan 4 siswa", "menyatakan 1 buku", "menyatakan 1 siswa"]) cek(siswa.includes(t), `Buku Siswa memuat "${t}"`);
    // Keganjilan buku yang dicatat di video: Panduan Guru menyebut skala hanya satu satuan, padahal Ayo Berpikir memakai 1 gambar = 4 siswa.
    cek(guru.includes("skala satu satuan"), "Panduan Guru memang menyebut skala satu satuan");
    cek(siswa.includes("menyatakan 4 siswa"), "Buku Siswa memang memakai satu gambar untuk 4 siswa pada Ayo Berpikir");
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k4b6a-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k4b6a-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k4b6a sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k4b6a.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_A46|video-k4b2-umum|naskah-k4b6/.test(pembungkus) && /VIDEO_MATERI_K4B6A/.test(pembungkus) && /VIDEO_LUAR_K4B6A/.test(pembungkus) && /export function VideoK4B6A/.test(pembungkus), "video-k4b6a.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k4b6a.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k4b6a.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k4b6a.mjs: akhir baris LF");
}

for (const v of [M, U]) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.ikon} gambar dalam sel, ${stat.turus} garis turus, ${stat.terbilang} bilangan berkata, ${stat.persamaan} persamaan, ${stat.teksPasang} pasangan teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
