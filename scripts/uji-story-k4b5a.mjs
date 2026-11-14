// Uji Story Kelas 4 Bab 5 Sub-Bab A (ciri-ciri bangun datar, termasuk pembuka bab): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar (angka dan bilangan yang diucapkan dengan kata), perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, tidak membocorkan Komposisi dan Dekomposisi (Sub-Bab B), kutipan buku terhadap teks PDF (pdftotext -enc UTF-8),
// geometri bangun datar (sisi sama, sudut, sisi sejajar, diagonal, papan paku) dihitung dari titik sudut yang tergambar, hitungan mandiri kunci Panduan Guru,
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k4b5a.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b5a-video.ts");

const stat = { bangun: 0, tergambar: 0, karet: 0, data: 0, terbilang: 0, teksPasang: 0, persamaan: 0 };
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
const VIDEO = [V.VIDEO_MATERI_K4B5A, V.VIDEO_LUAR_K4B5A];
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
const G = await import("../src/components/modul/story/k4b5a-gambar.ts");
const M1 = await import("../src/components/modul/story/k4b5a-materi-1.ts");
const M2 = await import("../src/components/modul/story/k4b5a-materi-2.ts");
const M3 = await import("../src/components/modul/story/k4b5a-materi-3.ts");
const U1 = await import("../src/components/modul/story/k4b5a-luar-1.ts");
const U2 = await import("../src/components/modul/story/k4b5a-luar-2.ts");
const M = V.VIDEO_MATERI_K4B5A;
const U = V.VIDEO_LUAR_K4B5A;
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
  const METODE = ["van Hiele Level 0-1", "Attribute Sort", "Geoboard", "Property Matrix"];
  const NAMA_ID = ["van Hiele Visual-Analisis", "Pilah Ciri", "Papan Paku", "Matriks Ciri"];
  cek(!/van Hiele|Attribute Sort|Pilah Ciri|Geoboard|Papan Paku|Property Matrix|Matriks Ciri|metode luar|metode dari luar/i.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of [...METODE, ...NAMA_ID]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE, ["van Hiele Level 0-1", "Attribute Sort", "Geoboard", "Property Matrix"], "nama metode di berkas luar-1");
  sama(U1.NAMA_METODE_ID, ["van Hiele Visual-Analisis", "Pilah Ciri", "Papan Paku", "Matriks Ciri"], "nama Indonesia metode luar");
  cek(M.adegan.every((a) => /(Buku Siswa|Panduan Guru) hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Peta konsep", "Kata kunci", "Apersepsi", "Ayo Berlatih", "Ayo Berpikir", "Miskonsepsi", "Diferensiasi", "Refleksi", "Subbab", "Tujuan pembelajaran"]) cek(!luar.includes(kata), `video metode luar tidak memuat "${kata}" milik materi`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-vh", "luar-vh-terapan", "luar-pilah", "luar-pilah-terapan", "luar-papan", "luar-papan-terapan", "luar-matriks", "luar-matriks-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[0].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  cek(M.adegan.length === 14 && U.adegan.length === 10, "14 adegan materi dan 10 adegan metode luar");
  // Sub-Bab A tidak membocorkan Komposisi dan Dekomposisi (Sub-Bab B). Pembuka bab dan peta konsep boleh menyebut tujuan keempat sebagai daftar tujuan bab.
  const BOCOR = /komposisi|dekomposisi|susun|urai|tangram|Aktivitas [67]/i;
  const boleh = ["pembuka-bab", "peta-konsep"];
  for (const a of M.adegan.filter((x) => !boleh.includes(x.id))) cek(!BOCOR.test(teksAdegan(a)), `materi ${a.id} tidak membocorkan Komposisi dan Dekomposisi`);
  for (const a of U.adegan) cek(!BOCOR.test(teksAdegan(a)), `metode luar ${a.id} tidak membocorkan Komposisi dan Dekomposisi`);
  cek(BOCOR.test(teksAdegan(adegan(M, "pembuka-bab"))), "pembuka bab menyebut tujuan menyusun dan mengurai sebagai daftar tujuan");
  cek(!/Uji Kompetensi|pengayaan|remedial/i.test(materi + luar), "tidak memakai Uji Kompetensi, pengayaan, remedial milik penutup bab");
  cek(totalKetukan >= 80, `total ketukan cukup dalam (${totalKetukan})`);
  cek(M.adegan.map((a) => a.id).join() === "pembuka-bab,peta-konsep,segi-banyak,aktivitas-satu,beraturan,berlatih-segibanyak,segitiga,segitiga-sisi,segitiga-sudut,segiempat-satu,segiempat-dua,hubungan-bangun,ayo-berpikir,berlatih-ciri", "urutan adegan materi");
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

/* ------------------------------ Geometri bangun datar: titik sudut, sisi, sudut, sejajar, diagonal ------------------------------ */
const jarak = (p, q) => Math.hypot(q[0] - p[0], q[1] - p[1]);
const sisiDari = (p) => p.map((t, i) => jarak(t, p[(i + 1) % p.length]));
const vek = (p, q) => [q[0] - p[0], q[1] - p[1]];
const cross = (a, b) => a[0] * b[1] - a[1] * b[0];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
const sejajar = (a, b) => Math.abs(cross(a, b)) / (Math.hypot(...a) * Math.hypot(...b)) < 0.02;
const tegakLurus = (a, b) => Math.abs(dot(a, b)) / (Math.hypot(...a) * Math.hypot(...b)) < 0.02;
const kira = (a, b, tol = 0.03) => Math.abs(a - b) <= tol * Math.max(a, b);
const sudutDeg = (p) =>
  p.map((t, i) => {
    const a = vek(t, p[(i + p.length - 1) % p.length]);
    const b = vek(t, p[(i + 1) % p.length]);
    return (Math.acos(Math.max(-1, Math.min(1, dot(a, b) / (Math.hypot(...a) * Math.hypot(...b))))) * 180) / Math.PI;
  });
const siku = (d) => Math.abs(d - 90) < 1.5;
const sisiBeda = (s) => s.every((x, i) => s.every((y, j) => i === j || !kira(x, y, 0.04)));
/** Pasangan sisi berhadapan segiempat: (0,2) dan (1,3). */
const pasangSejajar = (p) => {
  const e = p.map((t, i) => vek(t, p[(i + 1) % 4]));
  return [sejajar(e[0], e[2]), sejajar(e[1], e[3])];
};
const diagTegak = (p) => tegakLurus(vek(p[0], p[2]), vek(p[1], p[3]));
const sisiSamaBerdekatan = (p) => {
  const s = sisiDari(p);
  return (kira(s[0], s[3]) && kira(s[1], s[2])) || (kira(s[0], s[1]) && kira(s[2], s[3]));
};
const semuaSama = (s) => s.every((x) => kira(x, s[0]));
/** Ciri tiap baris tabel hubungan, dihitung dari titik sudut. */
const CIRI_FUNGSI = {
  "4 sisi sama panjang": (p) => semuaSama(sisiDari(p)),
  "4 sudut siku-siku": (p) => sudutDeg(p).every(siku),
  "2 pasang sisi sejajar": (p) => pasangSejajar(p).every(Boolean),
  "1 pasang sisi sejajar": (p) => pasangSejajar(p).filter(Boolean).length === 1,
  "diagonal tegak lurus": (p) => diagTegak(p),
  "2 pasang dekat sama": (p) => sisiSamaBerdekatan(p),
  "4 sisi": () => true,
  "semua sisi sama": (p) => semuaSama(sisiDari(p)),
  "tepat 1 pasang sejajar": (p) => pasangSejajar(p).filter(Boolean).length === 1,
};
const cekBangun = (nama, p, label) => {
  stat.bangun += 1;
  const s = sisiDari(p);
  const a = sudutDeg(p);
  const n = p.length;
  const f = (kond, pesan) => cek(kond, `${label}: bangun ${nama} ${pesan} (sisi ${s.map((x) => x.toFixed(1)).join("/")}, sudut ${a.map((x) => x.toFixed(0)).join("/")})`);
  switch (nama) {
    case "sama-kaki":
      f(n === 3 && kira(s[0], s[2], 0.02) && !kira(s[0], s[1], 0.03), "sama kaki: tepat dua sisi sama panjang");
      break;
    case "sama-sisi":
      f(n === 3 && semuaSama(s) && a.every((d) => Math.abs(d - 60) < 1.5), "sama sisi: tiga sisi sama dan tiga sudut enam puluh derajat");
      break;
    case "sembarang":
      f(n === 3 && sisiBeda(s), "sembarang: tiga sisi berbeda");
      break;
    case "lancip":
      f(n === 3 && a.every((d) => d < 88) && sisiBeda(s), "lancip: tiga sudut lancip");
      break;
    case "siku":
      f(n === 3 && a.filter(siku).length === 1 && a.filter((d) => d < 88).length === 2, "siku-siku: satu sudut siku-siku dan dua lancip");
      break;
    case "tumpul":
      f(n === 3 && a.filter((d) => d > 92).length === 1 && a.filter((d) => d < 88).length === 2, "tumpul: satu sudut tumpul dan dua lancip");
      break;
    case "jajar":
      f(n === 4 && pasangSejajar(p).every(Boolean) && kira(s[0], s[2]) && kira(s[1], s[3]) && !a.some(siku) && !semuaSama(s), "jajargenjang: dua pasang sisi sejajar dan sama panjang, tanpa sudut siku-siku");
      break;
    case "perpanjang":
      f(n === 4 && a.every(siku) && pasangSejajar(p).every(Boolean) && kira(s[0], s[2]) && kira(s[1], s[3]) && !semuaSama(s), "persegi panjang: empat sudut siku-siku, sisi berhadapan sama, bukan persegi");
      break;
    case "belah":
      f(n === 4 && semuaSama(s) && pasangSejajar(p).every(Boolean) && !a.some(siku) && diagTegak(p), "belah ketupat: empat sisi sama, sisi berhadapan sejajar, bukan persegi");
      break;
    case "persegi":
      f(n === 4 && semuaSama(s) && a.every(siku) && pasangSejajar(p).every(Boolean), "persegi: empat sisi sama dan empat sudut siku-siku");
      break;
    case "layang": {
      const cx = (p[0][0] + p[2][0]) / 2;
      const O = [p[0][0], p[1][1]];
      f(n === 4 && kira(s[0], s[3]) && kira(s[1], s[2]) && !kira(s[0], s[1], 0.05) && diagTegak(p) && kira(jarak(O, p[1]), jarak(O, p[3]), 0.04) && Math.abs(cx - O[0]) < 1, "layang-layang: dua pasang sisi berdekatan sama, diagonal tegak lurus, OB = OD");
      break;
    }
    case "trapesium":
      f(n === 4 && pasangSejajar(p).filter(Boolean).length === 1, "trapesium: tepat sepasang sisi sejajar");
      break;
    case "trapesium-siku":
      f(n === 4 && pasangSejajar(p).filter(Boolean).length === 1 && a.filter(siku).length === 2 && !kira(s[1], s[3], 0.1), "trapesium siku-siku: tepat sepasang sejajar, dua sudut siku-siku, kaki berbeda");
      break;
    case "trapesium-sama-kaki":
      f(n === 4 && pasangSejajar(p).filter(Boolean).length === 1 && kira(s[1], s[3]) && diagTegak(p), "trapesium sama kaki: sepasang sejajar, kaki sama, diagonal tegak lurus");
      break;
    case "segiempat":
      f(n === 4 && sisiBeda(s) && !pasangSejajar(p).some(Boolean), "segiempat sembarang: tidak ada sisi sama panjang dan tidak ada sisi sejajar");
      break;
    case "segilima":
    case "segienam":
    case "segidelapan":
      f(n === { segilima: 5, segienam: 6, segidelapan: 8 }[nama] && semuaSama(s) && a.every((d) => kira(d, a[0])), "segi banyak beraturan: sisi dan sudut sama");
      break;
    case "tak-beraturan":
      f(n === 6 && !semuaSama(s), "segi banyak tak beraturan: sisi tidak semuanya sama");
      break;
    default:
      cek(false, `${label}: nama bangun tidak dikenal ${nama}`);
  }
};
{
  // Titik sudut mentah pada gambar.
  for (const [nama, p] of Object.entries(G.BANGUN)) cekBangun(nama, p, "titik sudut asli");
  // Segi banyak beraturan: jumlah sudut dalam (n - 2) kali 180.
  for (const [nama, n] of [["segilima", 5], ["segienam", 6], ["segidelapan", 8]]) hampir(sudutDeg(G.BANGUN[nama]).reduce((x, y) => x + y, 0), (n - 2) * 180, 0.5, `jumlah sudut ${nama}`);
  sama(["segitiga", "segiempat", "segilima", "segienam"].map((_, i) => beraturanPuncak(i + 3)), [3, 4, 5, 6], "banyak titik sudut segi banyak beraturan");
  // Setiap bangun bernama yang tergambar di semua adegan dicek dari titik sudut yang dipakai gambar (sudah diskala dan digeser).
  let tergambar = 0;
  for (const v of [M, U]) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        for (const o of L.keadaanStory(a, i, 9999)) {
          if (o.t !== "jalur" || !o.id.includes("@")) continue;
          const nama = o.id.split("@")[1];
          if (nama === "papan") continue;
          const t = titikJalur(o);
          cek(!!t, `${v.id}/${a.id}#${i + 1}: bangun ${o.id} berupa tertutup`);
          if (t) {
            tergambar += 1;
            cekBangun(nama, t, `${v.id}/${a.id}#${i + 1}`);
          }
        }
      });
    }
  }
  cek(tergambar >= 120, `bangun tergambar yang diperiksa (${tergambar})`);
  stat.tergambar = tergambar;
}
function beraturanPuncak(n) {
  return G.beraturan(n, 24).length;
}

/* ------------------------------ Data buku dan hitungan mandiri ------------------------------ */
{
  // Aktivitas 1 (kunci Panduan Guru hlm. 181): n sisi berarti n sudut.
  sama(M1.SEGI_BANYAK, [{ nama: "Segitiga", sudut: 3, sisi: 3 }, { nama: "Segiempat", sudut: 4, sisi: 4 }, { nama: "Segilima", sudut: 5, sisi: 5 }, { nama: "Segienam", sudut: 6, sisi: 6 }], "tabel Aktivitas 1");
  const ta = T(M, "aktivitas-satu", 3);
  M1.SEGI_BANYAK.forEach((r, i) => sama([nilaiId(ta, `tb${i}-t00`), nilaiId(ta, `tb${i}-t01`), nilaiId(ta, `tb${i}-t02`)], [r.nama, String(r.sudut), String(r.sisi)], `tabel Aktivitas 1 baris ${i + 1} di gambar`));
  cek(M1.SEGI_BANYAK.every((r, i) => r.sudut === r.sisi && r.sisi === i + 3), "tiap segi banyak: banyak sudut sama dengan banyak sisi sama dengan nomor urutnya ditambah tiga");
  // Kunci Ayo Berlatih 1 sampai 3 (Panduan Guru hlm. 182): bukan segi banyak b, beraturan b (1 dan 4), tak beraturan a (1 dan 3). Hitungan mandiri dari gambar buku.
  const noBeraturan = [["persegi", true], ["perpanjang", false], ["siku", false], ["sama-sisi", true]];
  const beraturanKunci = noBeraturan.map((x, i) => (x[1] ? i + 1 : 0)).filter(Boolean);
  sama(beraturanKunci, [1, 4], "nomor dua: yang beraturan adalah persegi dan segitiga sama sisi (kunci b, 1 dan 4)");
  const noTak = [["siku", false], ["belah", false], ["trapesium", false], ["persegi", true]];
  // Beraturan: semua sisi sama dan semua sudut sama. Belah ketupat sisinya sama tetapi sudutnya tidak, jadi tak beraturan.
  const beraturanTf = (nama) => {
    const p = G.BANGUN[nama];
    const s = sisiDari(p);
    const a = sudutDeg(p);
    return semuaSama(s) && a.every((d) => kira(d, a[0], 0.02));
  };
  const nomorTak = noTak.map((x, i) => (!beraturanTf(x[0]) ? i + 1 : 0)).filter(Boolean);
  sama(nomorTak, [1, 2, 3], "nomor tiga: yang tak beraturan adalah 1, 2, dan 3 (kunci buku a memuat 1 dan 3; pilihan c, 2 dan 3, juga benar)");
  const pilihan = [[1, 3], [1, 4], [2, 3], [2, 4]];
  const benar = pilihan.filter((pl) => pl.every((n) => nomorTak.includes(n)));
  sama(benar, [[1, 3], [2, 3]], "pilihan nomor tiga yang benar: a (1 dan 3) dan c (2 dan 3)");
  const pilihanBeraturan = [[1, 3], [1, 4], [2, 3], [2, 4]].filter((pl) => pl.every((n) => beraturanKunci.includes(n)));
  sama(pilihanBeraturan, [[1, 4]], "nomor dua: hanya pilihan b (1 dan 4) yang benar");
  // Aktivitas 3: hasil pengukuran menurut Panduan Guru, dicocokkan dengan sudut gambar l_1, l_2, l_3.
  const hitungSudut = (nama) => {
    const a = sudutDeg(G.BANGUN[nama]);
    return { lancip: a.filter((d) => d < 88).length, siku: a.filter(siku).length, tumpul: a.filter((d) => d > 92).length };
  };
  sama(M2.SUDUT_SEGITIGA.map((r) => ({ lancip: r.lancip, siku: r.siku, tumpul: r.tumpul })), [hitungSudut("lancip"), hitungSudut("siku"), hitungSudut("tumpul")], "tabel Aktivitas 3 sama dengan sudut gambar l_1, l_2, l_3");
  sama(M2.SUDUT_SEGITIGA.map((r) => r.lancip + r.siku + r.tumpul), [3, 3, 3], "tiap segitiga punya tiga sudut");
  const th = T(M, "segitiga-sudut", 1);
  M2.SUDUT_SEGITIGA.forEach((r, i) => sama([nilaiId(th, `hr${i}-t00`), nilaiId(th, `hr${i}-t01`), nilaiId(th, `hr${i}-t02`), nilaiId(th, `hr${i}-t03`), nilaiId(th, `hr${i}-t04`)], [r.kode, r.nama, String(r.lancip), String(r.siku), String(r.tumpul)], `tabel Aktivitas 3 baris ${i + 1} di gambar`));
  // Tabel segitiga menurut sisi (Buku Siswa hlm. 153): dihitung dari gambar.
  const ciriSisi = (nama) => {
    const s = sisiDari(G.BANGUN[nama]);
    const pasang = [kira(s[0], s[1], 0.02), kira(s[1], s[2], 0.02), kira(s[0], s[2], 0.02)].filter(Boolean).length;
    return { dua: pasang >= 1, tiga: pasang === 3 };
  };
  sama([ciriSisi("sama-kaki"), ciriSisi("sama-sisi"), ciriSisi("sembarang")], [{ dua: true, tiga: false }, { dua: true, tiga: true }, { dua: false, tiga: false }], "tabel segitiga menurut sisinya: ciri dua sisi sama dan tiga sisi sama");
  const tg = T(M, "segitiga-sisi", 3);
  const nilaiTabel = (id, ...kol) => kol.map((c) => nilaiId(tg, `${id}-t0${c}`));
  sama(nilaiTabel("g1", 1, 2, 3), ["✓", "✓", "✓"], "tabel segitiga: tiga sisi");
  sama(nilaiTabel("g2", 1, 2, 3), ["✓", "✓", "–"], "tabel segitiga: dua sisi sama (sama kaki dan sama sisi ya)");
  sama(nilaiTabel("g3", 1, 2, 3), ["–", "✓", "–"], "tabel segitiga: tiga sisi sama (hanya sama sisi)");
  // Sisi yang disorot pada gambar punya panjang yang sesuai ucapan.
  const panjang = (objs, id) => Math.hypot(objId(objs, id).x2, objId(objs, id).y2);
  const t2 = T(M, "segitiga-sisi", 1);
  hampir(panjang(t2, "kk0"), panjang(t2, "kk2"), 0.2, "AC = BC pada segitiga sama kaki");
  hampir(panjang(t2, "ss0"), panjang(t2, "ss1"), 0.3, "PQ = QR pada segitiga sama sisi");
  hampir(panjang(t2, "ss1"), panjang(t2, "ss2"), 0.3, "QR = PR pada segitiga sama sisi");
  const t3 = T(M, "segitiga-sisi", 2);
  cek(sisiBeda([panjang(t3, "m1"), panjang(t3, "m2"), panjang(t3, "m3")]), "DE, EF, DF segitiga sembarang semuanya berbeda");
  // Segiempat: sisi yang disorot pada gambar.
  const j2 = T(M, "segiempat-satu", 1);
  hampir(panjang(j2, "s0"), panjang(j2, "s2"), 0.3, "jajargenjang: AB sejajar dan sama panjang dengan DC");
  hampir(panjang(j2, "s1"), panjang(j2, "s3"), 0.3, "jajargenjang: AD dan BC sama panjang");
  const j4 = T(M, "segiempat-satu", 3);
  cek([0, 1, 2, 3].every((i) => Math.abs(panjang(j4, `bs${i}`) - panjang(j4, "bs0")) < 0.4), "belah ketupat: keempat sisi yang disorot sama panjang");
  const j5 = T(M, "segiempat-satu", 4);
  cek([0, 1, 2, 3].every((i) => Math.abs(panjang(j5, `ss${i}`) - panjang(j5, "ss0")) < 0.4), "persegi: keempat sisi yang disorot sama panjang");
  const m2 = T(M, "segiempat-dua", 1);
  hampir(panjang(m2, "e0"), panjang(m2, "e3"), 0.3, "layang-layang: AB = AD");
  hampir(panjang(m2, "e1"), panjang(m2, "e2"), 0.3, "layang-layang: CB = CD");
  cek(!kira(panjang(m2, "e0"), panjang(m2, "e1"), 0.05), "layang-layang: AB tidak sama dengan CB");
  // Diagonal layang-layang pada gambar: tegak lurus, berpotongan di O, OB = OD, sudut 90 derajat.
  const m1 = T(M, "segiempat-dua", 0);
  sama([nilaiId(m2, "e9"), nilaiId(m2, "eo")], ["90°", "OB = OD"], "teks sudut O dan OB sama dengan OD");
  cek(tegakLurus([objId(m1, "dAC").x2, objId(m1, "dAC").y2], [objId(m1, "dBD").x2, objId(m1, "dBD").y2]), "diagonal layang-layang pada gambar tegak lurus");
  hampir(objId(m1, "dAC").x, objId(m1, "dBD").x + objId(m1, "dBD").x2 / 2 + 0, 0.01, "diagonal BD memotong AC di titik tengah BD (OB = OD)");
  hampir(objId(m1, "lO").x, objId(m1, "dAC").x, 0.01, "titik O di atas diagonal AC");
  // Hubungan bangun datar (Buku Siswa hlm. 163-164 dan Panduan Guru hlm. 190-192): tiap sel dihitung ulang dari titik sudut.
  const hitungMatriks = (kolom, baris) => baris.map((b) => kolom.map((n) => CIRI_FUNGSI[b](G.BANGUN[n])));
  sama(hitungMatriks(M3.KOLOM_SEGIEMPAT, M3.CIRI_SEGIEMPAT), M3.NILAI_CIRI, "tabel hubungan tujuh segiempat dihitung dari titik sudut");
  sama(hitungMatriks(U2.MX_KOLOM, U2.MX_BARIS), U2.MX_NILAI, "matriks kecil persegi, belah ketupat, layang-layang");
  sama(hitungMatriks(U2.MT_KOLOM, U2.MT_BARIS), U2.MT_NILAI, "matriks belah ketupat dan layang-layang");
  sama(hitungMatriks(U2.MU_KOLOM, U2.MU_BARIS), U2.MU_NILAI, "matriks jajargenjang dan trapesium");
  // Gambar matriks sama dengan datanya.
  const nilaiMatriks = (objs, id, baris, kol) => Array.from({ length: baris }, (_, r) => Array.from({ length: kol }, (_, c) => nilaiId(objs, `${id}-v${r}-${c}`) === "✓"));
  sama(Array.from({ length: 6 }, (_, r) => Array.from({ length: 7 }, (_, c) => nilaiId(T(M, "hubungan-bangun", 0), `mv${r}-${c}`) === "✓")), M3.NILAI_CIRI, "tabel hubungan di gambar sama dengan datanya");
  sama(nilaiMatriks(T(U, "luar-matriks", 0), "mx", 3, 3), U2.MX_NILAI, "matriks Property Matrix di gambar sama dengan datanya");
  sama(nilaiMatriks(T(U, "luar-matriks-terapan", 2), "my", 5, 2), U2.MT_NILAI, "matriks belah ketupat dan layang-layang di gambar sama dengan datanya");
  sama(nilaiMatriks(T(U, "luar-matriks-terapan", 3), "mz", 2, 2), U2.MU_NILAI, "matriks jajargenjang dan trapesium di gambar sama dengan datanya");
  // Kesimpulan hubungan: belah ketupat memiliki semua ciri layang-layang (tidak sebaliknya).
  const kolomBelah = U2.MT_NILAI.map((r) => r[0]);
  const kolomLayang = U2.MT_NILAI.map((r) => r[1]);
  cek(kolomLayang.every((v, i) => !v || kolomBelah[i]), "semua ciri layang-layang ada pada belah ketupat");
  cek(kolomBelah.some((v, i) => v && !kolomLayang[i]), "ada ciri belah ketupat yang tidak ada pada layang-layang");
  // Trapesium sama kaki pada Ayo Berpikir 3: alas 4, atas 2, tinggi 3 dan diagonalnya tegak lurus.
  const ts = G.BANGUN["trapesium-sama-kaki"];
  sama([jarak(ts[3], ts[2]) / 24, jarak(ts[0], ts[1]) / 24, ts[3][1] / 24], [4, 2, 3], "trapesium sama kaki: alas 4, atas 2, tinggi 3");
  cek(tegakLurus(vek(ts[3], ts[1]), vek(ts[2], ts[0])), "diagonal trapesium sama kaki (alas 4, atas 2, tinggi 3) tegak lurus: kunci buku salah menyatakan tidak");
  sama(
    [nilaiId(T(M, "ayo-berpikir", 3), "ca"), nilaiId(T(M, "ayo-berpikir", 3), "cb"), nilaiId(T(M, "ayo-berpikir", 3), "cc")],
    ["alas 4", "atas 2", "tinggi 3"],
    "label trapesium contoh",
  );
  // Kunci Ayo Berlatih nomor 1 (Panduan Guru hlm. 192): urutan jawaban dan ciri.
  sama(M3.KUNCI_KALIMAT.map((r) => r[2]), ["sama kaki", "siku-siku", "sembarang", "tumpul", "lancip", "jajargenjang", "trapesium"], "kunci tujuh kalimat Ayo Berlatih nomor satu");
  sama(M3.KUNCI_KALIMAT.map((r) => r[0]).join(""), "abcdefg", "huruf a sampai g");
  // Trapesium sama kaki pada kunci nomor 3: trapesium siku-siku punya sepasang sisi sejajar tetapi kakinya tidak sama.
  const tsk = G.BANGUN["trapesium-siku"];
  cek(pasangSejajar(tsk).filter(Boolean).length === 1 && !kira(jarak(tsk[1], tsk[2]), jarak(tsk[3], tsk[0]), 0.1), "trapesium siku-siku: sepasang sisi sejajar dan kaki berbeda panjang (kunci buku keliru)");
  // Geoboard: tiap titik karet berada di paku, banyak titik sudut sama dengan banyak sisi, dan titik tergambar sama dengan data.
  const pap = U2.PAPAN;
  for (const [nama, pts] of Object.entries(U2.KARET)) {
    cek(pts.every((t) => t[0] >= 0 && t[0] < pap.kol && t[1] >= 0 && t[1] < pap.bar && Number.isInteger(t[0]) && Number.isInteger(t[1])), `karet ${nama}: tiap titik berada di paku`);
    cek(new Set(pts.map((t) => t.join(","))).size === pts.length, `karet ${nama}: titik berbeda`);
    const px = pts.map((t) => [t[0] * pap.jr, t[1] * pap.jr]);
    let luas = 0;
    px.forEach((t, i) => (luas += cross(t, px[(i + 1) % px.length])));
    cek(Math.abs(luas) > 100, `karet ${nama}: berupa bangun bertepi tertutup (luas ${Math.abs(luas / 2)})`);
    // Tidak berpotongan sendiri: tiap dua sisi tak bersebelahan tidak berpotongan.
    const ruas = px.map((t, i) => [t, px[(i + 1) % px.length]]);
    const potong = (a, b) => {
      const d1 = cross(vek(a[0], a[1]), vek(a[0], b[0]));
      const d2 = cross(vek(a[0], a[1]), vek(a[0], b[1]));
      const d3 = cross(vek(b[0], b[1]), vek(b[0], a[0]));
      const d4 = cross(vek(b[0], b[1]), vek(b[0], a[1]));
      return d1 * d2 < 0 && d3 * d4 < 0;
    };
    let silang = 0;
    for (let i = 0; i < ruas.length; i += 1) for (let j = i + 2; j < ruas.length; j += 1) if (!(i === 0 && j === ruas.length - 1) && potong(ruas[i], ruas[j])) silang += 1;
    sama(silang, 0, `karet ${nama}: sisi tidak berpotongan`);
  }
  sama([U2.KARET.segitigaA.length, U2.KARET.persegipanjang.length, U2.KARET.segilima.length, U2.KARET.segienam.length], [3, 4, 5, 6], "karet tiga, empat, lima, enam paku");
  const rkr = U2.KARET.persegipanjang.map((t) => [t[0] * 22, t[1] * 22]);
  cekBangun("perpanjang", rkr, "karet persegi panjang");
  const itemPaku = (objs) => objs.filter((o) => /^gv\d+$/.test(o.id)).length;
  for (const id of ["luar-papan", "luar-papan-terapan"]) {
    const a = adegan(U, id);
    a.ketukan.forEach((_, i) => {
      const objs = L.keadaanStory(a, i, 9999);
      const band = objs.find((o) => o.id === "gb@papan");
      if (!band) return;
      const t = titikJalur(band);
      cek(!!t && t.length >= 3, `${id}#${i + 1}: karet berupa bangun tertutup`);
      if (!t) return;
      stat.karet += 1;
      cek(t.every((q) => Math.abs((q[0] - pap.x) / pap.jr - Math.round((q[0] - pap.x) / pap.jr)) < 0.01 && Math.abs((q[1] - pap.y) / pap.jr - Math.round((q[1] - pap.y) / pap.jr)) < 0.01), `${id}#${i + 1}: tiap titik karet tepat di paku`);
      if (itemPaku(objs) > 0) sama(itemPaku(objs), t.length, `${id}#${i + 1}: banyak titik sudut sama dengan banyak sisi sama dengan banyak paku`);
      cek(objs.filter((o) => /^gb-p\d+-\d+$/.test(o.id)).length === pap.kol * pap.bar, `${id}#${i + 1}: papan paku lengkap`);
    });
  }
  const ap = T(U, "luar-papan-terapan", 3);
  sama(U2.TABEL_PAKU.map((r) => [nilaiId(ap, `tq${U2.TABEL_PAKU.indexOf(r)}-t00`), nilaiId(ap, `tq${U2.TABEL_PAKU.indexOf(r)}-t01`), nilaiId(ap, `tq${U2.TABEL_PAKU.indexOf(r)}-t02`)]), U2.TABEL_PAKU.map((r) => [String(r.paku), String(r.paku), String(r.sisi)]), "tabel paku, sudut, sisi di gambar");
  cek(U2.TABEL_PAKU.every((r) => r.paku === r.sisi), "banyak paku sama dengan banyak sisi");
  // Attribute Sort: ucapan sama dengan gambar. Belah ketupat dan persegi yang sisinya sama; hanya persegi yang siku-siku.
  const sisiSamaTujuh = U1.TUJUH_SEGIEMPAT.filter((n) => semuaSama(sisiDari(G.BANGUN[n])));
  sama(sisiSamaTujuh, ["belah", "persegi"], "pertanyaan satu Attribute Sort: ya hanya belah ketupat dan persegi");
  sama(U1.TUJUH_SEGIEMPAT.filter((n) => !semuaSama(sisiDari(G.BANGUN[n]))).length, 5, "lima bangun lain masuk kotak tidak");
  sama(sisiSamaTujuh.filter((n) => sudutDeg(G.BANGUN[n]).every(siku)), ["persegi"], "pertanyaan dua Attribute Sort: hanya persegi yang siku-siku");
  sama(U1.TUJUH_SEGIEMPAT, ["jajar", "perpanjang", "belah", "persegi", "layang", "trapesium", "segiempat"], "tujuh segiempat Attribute Sort");
  const q2 = T(U, "luar-pilah-terapan", 1);
  sama(["y1@belah", "y2@persegi", "n1@jajar", "n2@perpanjang", "n3@layang", "n4@trapesium", "n5@segiempat"].every((id) => !!objId(q2, id)), true, "kotak ya dan tidak memuat ketujuh bangun");
  // Kotak ya dan tidak: bangun di dalam kotaknya.
  const dalam = (objs, kotakId, bangunId) => {
    const b = objId(objs, kotakId);
    const o = objId(objs, bangunId);
    const t = titikJalur(o);
    return t.every((q) => q[0] >= b.x && q[0] <= b.x + b.w && q[1] >= b.y && q[1] <= b.y + b.h);
  };
  cek(["y1@belah", "y2@persegi"].every((id) => dalam(q2, "ky", id)) && ["n1@jajar", "n2@perpanjang", "n3@layang", "n4@trapesium", "n5@segiempat"].every((id) => dalam(q2, "kt", id)), "Attribute Sort: bangun berada di dalam kotak yang benar");
  stat.data += 1;
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
  // Kelas IV: Buku Siswa hlm. N = PDF N+12 (hlm. 139-165 = PDF 151-177; Refleksi hlm. 176 = PDF 188); Panduan Guru hlm. N = PDF N+12 (hlm. 175-194 = PDF 187-206).
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 151, 177), ambil(bs, 188, 188), ambil(bg, 187, 206)] : [null];
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
    cek(!/b\. komposisi dan dekomposisi/.test(bersih(bagian[0])), "Buku Siswa PDF 151-177 tidak memuat judul subbab B");
    cek(!/b\. komposisi \(menyusun\)/.test(bersih(bagian[2])), "Panduan Guru PDF 187-206 tidak memuat judul subbab B");
    const guru = bersih(bagian[2]);
    const siswa = bersih(bagian[0]);
    // Angka dan istilah kunci Panduan Guru yang dipakai video.
    for (const t of ["segitiga 3 3", "segiempat 4 4", "segilima 5 5", "segienam 6 6", "1 b. 2 b. 1 dan 4 3 a. 1 dan 3", "tidak ada", "ada, ketiga sisinya sama panjang", "segitiga sama sisi dapat disebut juga sebagai segitiga sama kaki", "memiliki satu sudut lancip", "dua pasang, yaitu ad=ab ; cb=cd", "90o (siku-siku)", "jawab : ya", "memiliki tepat sepasang sisi sama panjang", "persegi merupakan trapesium yang semua sisi berdekatan sama", "tetapi tidak tegak lurus", "tidak; karena pada trapesium diagonal-diagonalnya berpotongan", "boleh; sebab semua ciri pada layang-layang ada pada belah ketupat"]) {
      cek(guru.includes(t) || siswa.includes(t) || guru.replace(/\s/g, "").includes(t.replace(/\s/g, "")), `Panduan Guru atau Buku Siswa memuat "${t}"`);
    }
    for (const t of ["memiliki 3 sisi, memiliki 3 sudut, dan memiliki 3 titik sudut", "ditulis ac = bc.", "ditulis pq = qr = pr.", "de ≠ ef ≠ df", "segitiga klm memiliki 1 sudut siku-siku yaitu sudut k", "salah satu sudut yang tumpul yaitu sudut p", "persegi panjang pasti merupakan jajargenjang", "belah ketupat merupakan layang-layang", "persegi merupakan persegi panjang", "diagonal-diagonalnya berpotongan tegak"]) {
      cek(siswa.includes(t), `Buku Siswa memuat "${t}"`);
    }
    // Keganjilan buku yang dicatat di video.
    cek(guru.includes("persegi merupakan trapesium yang semua sisi berdekatan sama") && guru.includes("tepat sepasang sisi sejajar"), "Panduan Guru: persegi disebut trapesium padahal trapesium memiliki tepat sepasang sisi sejajar");
    cek(guru.includes("memiliki tepat sepasang sisi sama panjang"), "Panduan Guru: kunci nomor 3 menulis tepat sepasang sisi sama panjang");
    cek(guru.includes("tetapi tidak tegak lurus"), "Panduan Guru: trapesium diagonalnya tidak tegak lurus (jawaban nomor tiga)");
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k4b5a-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k4b5a-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k4b5a sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k4b5a.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_A45|video-k4b2-umum|naskah-k4b5/.test(pembungkus) && /VIDEO_MATERI_K4B5A/.test(pembungkus) && /VIDEO_LUAR_K4B5A/.test(pembungkus) && /export function VideoK4B5A/.test(pembungkus), "video-k4b5a.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k4b5a.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k4b5a.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k4b5a.mjs: akhir baris LF");
}

for (const v of [M, U]) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.bangun} bangun dicek geometrinya (${stat.tergambar} tergambar), ${stat.karet} karet papan paku, ${stat.terbilang} bilangan berkata, ${stat.persamaan} persamaan, ${stat.teksPasang} pasangan teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
