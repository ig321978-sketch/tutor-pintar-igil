// Uji Story Kelas 4 Bab 4 Sub-Bab A (Pengukuran Luas, termasuk pembuka bab): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar (angka dan bilangan yang diucapkan dengan kata), perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, tidak membocorkan Volume (Sub-Bab B) di luar pembuka dan peta konsep, kutipan buku terhadap teks PDF (pdftotext -enc UTF-8),
// luas semua bangun petak dihitung ulang dari sel yang tergambar, hitungan mandiri kunci Panduan Guru, konversi satuan luas, emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k4b4a.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b4a-video.ts");

const stat = { sel: 0, luas: 0, terbilang: 0, teksPasang: 0, persamaan: 0, data: 0 };
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
const VIDEO = [V.VIDEO_MATERI_K4B4A, V.VIDEO_LUAR_K4B4A];
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
const G = await import("../src/components/modul/story/k4b4a-gambar.ts");
const M2 = await import("../src/components/modul/story/k4b4a-materi-2.ts");
const M3 = await import("../src/components/modul/story/k4b4a-materi-3.ts");
const U1 = await import("../src/components/modul/story/k4b4a-luar-1.ts");
const M = V.VIDEO_MATERI_K4B4A;
const U = V.VIDEO_LUAR_K4B4A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const objId = (objs, id) => objs.find((o) => o.id === id);
const nilaiId = (objs, id) => objs.find((o) => o.id === id)?.isi;
const T = (v, id, ke) => akhirAdegan(adegan(v, id), ke);
const jumlah = (a) => a.reduce((s, n) => s + n, 0);
const hitungSel = (objs, id) => objs.filter((o) => new RegExp(`^${id}-c\\d+-\\d+$`).test(o.id)).length;
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  const METODE = ["Area as Covering", "Array Area", "Nonstandard then Standard", "Grid Count"];
  const NAMA_ID = ["Luas sebagai Menutupi", "Luas Susunan", "Tak Baku ke Baku", "Hitung Petak"];
  cek(!/Area as Covering|Array Area|Nonstandard|Grid Count|Luas sebagai Menutupi|Luas Susunan|Tak Baku ke Baku|Hitung Petak|metode luar|metode dari luar|Van de Walle/i.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of [...METODE, ...NAMA_ID]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE, METODE, "nama metode di berkas luar-1");
  sama(U1.NAMA_METODE_ID, NAMA_ID, "nama Indonesia metode luar");
  cek(M.adegan.every((a) => /(Buku Siswa|Panduan Guru) hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Peta konsep", "Kata kunci", "Apersepsi", "Ayo Berlatih", "Ayo Berpikir", "Miskonsepsi", "Diferensiasi", "Refleksi", "Subbab", "Tujuan pembelajaran", "Panduan guru", "Aktivitas"]) cek(!luar.includes(kata), `video metode luar tidak memuat "${kata}" milik materi`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-cover", "luar-cover-terapan", "luar-susun", "luar-susun-terapan", "luar-tak-baku", "luar-tak-baku-terapan", "luar-petak", "luar-petak-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[0].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  cek(M.adegan.length === 15 && U.adegan.length === 10, "15 adegan materi dan 10 adegan metode luar");
  // Sub-Bab A tidak membocorkan Pengukuran Volume (Sub-Bab B). Pembuka bab dan peta konsep boleh menyebut volume sebagai bagian judul, tujuan, dan cabang bab.
  const BOCOR = /volume|kubus|kubik|liter|isi ruang|botol|menuang|mengisi|Aktivitas [34]|Uji Kompetensi|pengayaan|remedial|Refleksi/i;
  const boleh = ["pembuka-bab", "peta-konsep"];
  for (const a of M.adegan.filter((x) => !boleh.includes(x.id))) cek(!BOCOR.test(teksAdegan(a)), `materi ${a.id} tidak membocorkan Volume`);
  for (const a of U.adegan) cek(!BOCOR.test(teksAdegan(a)), `metode luar ${a.id} tidak membocorkan Volume`);
  cek(/volume/i.test(teksAdegan(adegan(M, "pembuka-bab"))), "pembuka bab menyebut volume sebagai judul bab dan tujuan subbab berikutnya");
  cek(totalKetukan >= 80, `total ketukan cukup dalam (${totalKetukan})`);
  cek(M.adegan.map((a) => a.id).join() === "pembuka-bab,peta-konsep,panduan-awal,aktivitas-satu,amati-satuan,kegiatan-a1,kegiatan-a2,satuan-persegi,berlatih-persegi,satuan-baku,konversi,mencoba-satu,mencoba-dua,berlatih-baku,miskonsepsi", "urutan adegan materi");
  // Nama metode baru belum dipakai metode atau lab lain pada bab ini.
  const naskah = readFileSync(new URL("../src/components/modul/naskah-k4b4.ts", import.meta.url), "utf8");
  const lab = readFileSync(new URL("../src/components/modul/lab-luas-k4b4a.ts", import.meta.url), "utf8");
  cek(!/Grid Count|Hitung Petak/.test(naskah), "nama metode baru tidak bentrok dengan naskah bab");
  cek(!/Grid Count/.test(lab), "nama metode baru tidak dipakai lab luas");
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

/* ------------------------------ Luas bangun petak dihitung ulang dari sel yang tergambar ------------------------------ */
const titikTertutup = (t) => t.map((p, i) => [p, t[(i + 1) % t.length]]);
const luasPoligon = (t) => Math.abs(titikTertutup(t).reduce((s, [p, q]) => s + (p[0] * q[1] - q[0] * p[1]), 0)) / 2;
const dalamPoligon = (t, x, y) => {
  let masuk = false;
  for (const [p, q] of titikTertutup(t)) if (p[1] > y !== q[1] > y && x < ((q[0] - p[0]) * (y - p[1])) / (q[1] - p[1]) + p[0]) masuk = !masuk;
  return masuk;
};
{
  // Peta sel: luas tiap bangun sama dengan banyak "#", dan sama dengan jumlah petak per baris (hitungan mandiri) dan kunci Panduan Guru hlm. 151, 152, 153.
  for (const h of ["A", "B", "C", "D"]) {
    sama(G.perBaris(G.PETA[h]), [...M3.BERLATIH_PETAK[h]], `petak per baris bangun ${h}`);
    sama(G.luasPeta(G.PETA[h]), M3.KUNCI_BERLATIH[h], `luas bangun ${h} sama dengan kunci Panduan Guru`);
    sama(jumlah(M3.BERLATIH_PETAK[h]), M3.KUNCI_BERLATIH[h], `jumlah petak per baris bangun ${h}`);
    stat.luas += 1;
  }
  sama([13, 13, 11, 15], ["A", "B", "C", "D"].map((h) => M3.KUNCI_BERLATIH[h]), "kunci Ayo Berlatih: 13, 13, 11, 15");
  sama(G.luasPeta(G.PETA.II), 13, "bangun (ii) hlm. 118: 13 cm2");
  sama(G.PETA.II, G.PETA.B, "bangun (ii) sama bentuk dengan bangun B");
  sama(G.luasPeta(G.PETA.A), 13, "bangun (i) hlm. 118: 13 cm2");
  sama(G.luasPeta(G.PETA.L1), 9, "bangun pertama hlm. 119: 9 cm2");
  sama(G.luasPeta(G.PETA.L2), 9, "bangun kedua hlm. 119: 9 cm2");
  sama(G.perBaris(G.PETA.L1), [1, 1, 1, 1, 1, 1, 1, 2], "bangun pertama hlm. 119: kolom delapan ditambah satu");
  sama(G.perBaris(G.PETA.L2).filter((n) => n), [2, 3, 3, 1], "bangun kedua hlm. 119: dua, tiga, tiga, satu");
  sama(G.luasPeta(G.PETA.N2), 12, "Ayo Berlatih nomor 2: 12 cm2");
  sama(G.perBaris(G.PETA.N2).filter((n) => n), [6, 2, 4], "nomor 2: enam, dua, empat");
  // Segitiga nomor 3: luas sembilan; enam petak penuh dan enam setengah petak dari pencuplikan.
  const seg = G.SEGITIGA_N3;
  hampir(luasPoligon(seg), 9, 1e-9, "luas segitiga nomor 3 dengan rumus tali sepatu");
  hampir(((Math.max(...seg.map((p) => p[0])) - Math.min(...seg.map((p) => p[0]))) * (Math.max(...seg.map((p) => p[1])) - Math.min(...seg.map((p) => p[1])))) / 2, 9, 1e-9, "alas enam dikali tinggi tiga dibagi dua");
  const penuh = [];
  const setengah = [];
  for (let r = 0; r < 5; r += 1)
    for (let c = 0; c < 8; c += 1) {
      let n = 0;
      for (let i = 0; i < 40; i += 1) for (let j = 0; j < 40; j += 1) if (dalamPoligon(seg, c + (i + 0.5) / 40, r + (j + 0.5) / 40)) n += 1;
      const frak = n / 1600;
      if (frak > 0.999) penuh.push([r, c]);
      else if (Math.abs(frak - 0.5) < 0.02) setengah.push([r, c]);
      else cek(frak < 0.001, `petak (${r},${c}) tertutup sebagian bukan setengah: ${frak}`);
    }
  sama(penuh, G.SEGITIGA_PENUH, "petak penuh segitiga nomor 3 menurut pencuplikan");
  sama(setengah, G.SEGITIGA_SETENGAH, "petak setengah segitiga nomor 3 menurut pencuplikan");
  sama([penuh.length, setengah.length, penuh.length + setengah.length / 2], [6, 6, 9], "enam penuh ditambah enam setengah menjadi sembilan");
  stat.luas += 8;

  // Meja (hlm. 108 dan 109): kolom kali baris; catatan: perbandingan 8 : 4 tidak sama dengan 21 : 12.
  const [uk, ug, ok, og] = [M2.MEJA.uang.kecil, M2.MEJA.uang.guru, M2.MEJA.origami.kecil, M2.MEJA.origami.guru].map((d) => d[0] * d[1]);
  sama([uk, ug, ok, og], [8, 21, 4, 12], "kunci Kegiatan A.1 dan A.2: 8, 21, 4, 12");
  cek(uk / ok === 2 && ug / og !== 2, "perbandingan uang per origami: meja kecil 2, meja guru 1,75 (tidak konsisten)");
  sama(og * 2, 24, "meja guru semestinya 24 uang kertas bila satu origami sama dengan dua uang kertas");
  const a1 = T(M, "kegiatan-a1", 3);
  sama([hitungSel(a1, "mk"), hitungSel(a1, "mg")], [8, 21], "sel yang tergambar: meja kecil 8 dan meja guru 21 uang kertas");
  const a2k = T(M, "kegiatan-a2", 1);
  sama([hitungSel(a2k, "ok"), hitungSel(a2k, "og")], [4, 12], "sel yang tergambar: meja kecil 4 dan meja guru 12 origami");
  const tb = T(M, "kegiatan-a2", 2);
  sama(["tb-t11", "tb-t12", "tb-t21", "tb-t22"].map((id) => nilaiId(tb, id)), ["8", "21", "4", "12"], "tabel kesimpulan: 8, 21, 4, 12");
  const sp = T(M, "satuan-persegi", 2);
  sama([hitungSel(sp, "r1"), hitungSel(sp, "r2")], [4, 16], "kertas lipat: 4 dan 16 persegi satuan");
  // Gambar hlm. 115: bangun (a) 13 dan (b) 4 persegi satuan.
  const sb = T(M, "satuan-baku", 0);
  sama([hitungSel(sb, "pa"), hitungSel(sb, "pb")], [13, 4], "gambar (a) 13 dan (b) 4 persegi satuan");
  // Ayo Berlatih A sampai D: sel yang tergambar.
  const bl = T(M, "berlatih-persegi", 5);
  sama(["A", "B", "C", "D"].map((h) => hitungSel(bl, `s${h}`)), [13, 13, 11, 15], "sel tergambar bangun A sampai D");
  const bl2 = T(M, "berlatih-persegi", 4);
  sama(["A", "B", "C", "D"].map((h) => nilaiId(bl2, `bp${h}`)), ["1 + 1 + 2 + 3 + 3 + 3 = 13", "1 + 2 + 4 + 5 + 1 = 13", "1 + 2 + 4 + 2 + 2 = 11", "3 + 2 + 2 + 2 + 1 + 5 = 15"], "baris hitungan A sampai D di gambar");
  // Ayo Mencoba 1: nomor 1 sampai 13 pada sel.
  const m1 = T(M, "mencoba-satu", 1);
  sama([hitungSel(m1, "i"), m1.filter((o) => /^i-n\d+$/.test(o.id)).length], [13, 13], "bangun (i): 13 sel dan 13 nomor");
  sama(M3.SEMUA_ID_NOMOR.i.map((id) => nilaiId(m1, id)), Array.from({ length: 13 }, (_, i) => String(i + 1)), "nomor bangun (i) 1 sampai 13");
  const m2 = T(M, "mencoba-satu", 2);
  sama([hitungSel(m2, "ii"), m2.filter((o) => /^ii-n\d+$/.test(o.id)).length], [13, 13], "bangun (ii): 13 sel dan 13 nomor");
  // Ayo Mencoba 2: sel gambar.
  const d3 = T(M, "mencoba-dua", 2);
  sama([hitungSel(d3, "l1"), hitungSel(d3, "l2")], [9, 9], "dua bangun 9 cm2 pada kisi 8 kali 8");
  // Ayo Berlatih nomor 2 dan 3.
  const y3 = T(M, "berlatih-baku", 2);
  sama(hitungSel(y3, "n2"), 12, "nomor 2: 12 sel tergambar");
  const y4 = T(M, "berlatih-baku", 3);
  sama(nilaiId(y4, "n3c"), "6 + 3 = 9 cm²", "hitungan segitiga nomor 3 di gambar");
  // Konversi satuan: 1 m = 100 cm, 1 m2 = 100 kali 100 cm2.
  sama(100 * 100, 10000, "1 m2 = 10.000 cm2");
  sama(2 * 10000, 20000, "2 m2 = 20.000 cm2");
  const kv = T(M, "konversi", 2);
  sama(kv.filter((o) => /^kv-g\d+-\d+$/.test(o.id)).length, 100, "kisi konversi 10 kali 10 petak");
  // Metode luar: sel yang tergambar.
  const lc = T(U, "luar-cover-terapan", 1);
  sama(hitungSel(lc, "c"), 11, "luar: bangun C 11 penutup");
  sama(lc.filter((o) => /^c-n\d+$/.test(o.id)).length, 11, "luar: nomor penutup bangun C");
  const ls1 = T(U, "luar-susun-terapan", 0);
  const ls2 = T(U, "luar-susun-terapan", 1);
  sama([hitungSel(ls1, "mk"), hitungSel(ls2, "mg")], [8, 21], "luar: susunan meja 2 kali 4 dan 3 kali 7");
  const ls3 = T(U, "luar-susun-terapan", 2);
  sama([hitungSel(ls3, "kl1"), hitungSel(ls3, "kl2")], [4, 16], "luar: susunan kertas lipat 4 dan 16");
  const lp1 = T(U, "luar-petak-terapan", 0);
  sama(lp1.filter((o) => /^pa-n\d+$/.test(o.id)).length, 13, "luar: Grid Count bangun (ii) bernomor sampai 13");
  const lp2 = T(U, "luar-petak-terapan", 1);
  sama(lp2.filter((o) => /^pm-n\d+$/.test(o.id)).length, 12, "luar: Grid Count nomor 2 bernomor sampai 12");
  const lp3 = T(U, "luar-petak-terapan", 2);
  sama([lp3.filter((o) => /^tf-c/.test(o.id)).length, lp3.filter((o) => /^th-c/.test(o.id)).length], [6, 6], "luar: Grid Count segitiga 6 petak penuh dan 6 setengah");
  const lk = T(U, "luar-petak", 1);
  sama(lk.filter((o) => /^nm-n\d+$/.test(o.id)).length, 9, "luar: Grid Count konsep bernomor sampai 9");
  const ltb = T(U, "luar-tak-baku-terapan", 0);
  sama([hitungSel(ltb, "ha"), hitungSel(ltb, "hb")], [13, 4], "luar: gambar a 13 petak kecil dan b 4 petak besar");
  const ln = T(U, "luar-susun-terapan", 3);
  sama(ln.filter((o) => /^mm-g\d+-\d+$/.test(o.id)).length, 100, "luar: 1 m2 sebagai kisi 10 kali 10 (setiap petak mewakili 10 kali 10)");
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
  // Kelas IV: Buku Siswa hlm. N = PDF N+12 (hlm. 103-121 = PDF 115-133; subbab B mulai PDF 134); Panduan Guru hlm. N = PDF N+12 (hlm. 145-154 = PDF 157-166; subbab B mulai PDF 167).
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 115, 133), ambil(bg, 157, 166), ambil(bs, 134, 134), ambil(bg, 167, 167)] : [null];
  if (bagian.some((b) => b === null)) console.log("PDF atau pdftotext tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const buku = bersih(bagian[0] + "\n" + bagian[1]);
    let n = 0;
    for (const a of M.adegan) {
      for (const kt of a.kutipan ?? []) {
        n += 1;
        cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
      }
    }
    cek(n >= 150, `jumlah kutipan buku yang diperiksa (${n})`);
    cek(M.adegan.every((a) => (a.kutipan ?? []).length >= 5), "tiap adegan materi memuat paling sedikit 5 kutipan buku");
    cek(/b\. pengukuran volume/.test(bersih(bagian[2])) && /b\. pengukuran volume/.test(bersih(bagian[3])), "subbab B mulai di Buku Siswa PDF 134 dan Panduan Guru PDF 167");
    cek(!/b\. pengukuran volume/.test(buku), "Buku Siswa PDF 115-133 dan Panduan Guru PDF 157-166 tidak memuat judul subbab B");
    const guru = bersih(bagian[1]);
    const siswa = bersih(bagian[0]);
    // Angka dan istilah kunci yang dipakai video.
    for (const t of ["terdapat 8 uang kertas", "terdapat 21 uang kertas", "terdapat 4 kertas origami", "terdapat 12 kertas origami", "luas bangun a adalah 13 persegi satuan", "luas bangun b adalah 13 persegi satuan", "luas bangun c adalah 11 persegi satuan", "ada, luas bangun a dan bangun b adalah 13 persegi satuan", "adalah 4 persegi satuan dan luas kertas di", "luas bangun yang di arsir pada nomor 2 adalah 12 cm2", "luas bangun yang di arsir pada nomor 3 adalah 9 cm2", "luas bangun (i) adalah 13 cm2"]) {
      cek(guru.includes(t) || siswa.includes(t), `Panduan Guru atau Buku Siswa memuat "${t}"`);
    }
    for (const t of ["1 m = 100 cm", "1 m² = 10.000 cm²", "gambar (a) memiliki luas adalah 13 persegi satuan", "gambar (b) memiliki luas adalah 4 persegi satuan", "adalah 13 cm²"]) {
      cek(siswa.replace(/\s/g, "").includes(t.replace(/\s/g, "")) || siswa.replace(/\s/g, "").includes(t.replace(/\s/g, "").replace("memilikiluasadalah", "memilikiluasadalah")), `Buku Siswa memuat "${t}"`);
    }
    // Keganjilan buku yang dicatat di video.
    cek(guru.includes("luas bangun a adalah 15 persegi satuan") && guru.includes("luas bangun d adalah persegi satuan"), "Panduan Guru: bagian d kunci menulis 'bangun A' bernilai 15 (bangun D yang 15)");
    cek(guru.includes("ukuran persegi satuan berbeda-beda"), "Panduan Guru: miskonsepsi ke-3 menulis ukuran persegi satuan berbeda-beda");
    cek(guru.includes("dikalikan 1002"), "Panduan Guru: konversi m2 ke cm2 dikalikan 100 pangkat dua (1002)");
    cek(siswa.includes("setiap sisi persegi adalah 1 cm²"), "Buku Siswa nomor 2 hlm. 119: sisi persegi ditulis 1 cm²");
    cek((siswa.match(/menduga luas dengan satuan baku dan/g) ?? []).length === 2, "Buku Siswa hlm. 104: tujuan keempat mengulang 'menduga luas'");
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k4b4a-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k4b4a-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k4b4a sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k4b4a.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_A44|video-k4b2-umum|naskah-k4b4/.test(pembungkus) && /VIDEO_MATERI_K4B4A/.test(pembungkus) && /VIDEO_LUAR_K4B4A/.test(pembungkus) && /export function VideoK4B4A/.test(pembungkus), "video-k4b4a.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k4b4a.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k4b4a.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k4b4a.mjs: akhir baris LF");
}

for (const v of [M, U]) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.luas} luas bangun dihitung ulang, ${stat.terbilang} bilangan berkata, ${stat.persamaan} persamaan, ${stat.teksPasang} pasangan teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
