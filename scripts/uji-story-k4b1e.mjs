// Uji Story Kelas 4 Bab 1 Sub-Bab E (Penjumlahan Bilangan Cacah sampai 1.000): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, suara tanpa digit (bilangan ditulis dengan kata) yang tampak sebagai angka di gambar,
// pemisahan materi dan metode luar, tidak membocorkan sub-bab lain, kutipan buku terhadap teks PDF (pdftotext, atau PyMuPDF bila tidak ada), tabel susun (bilangan, hasil, tanda simpan, persamaan langkah),
// uraian susun panjang, balok satuan dan batang puluhan, garis bilangan berskala, jumlah sebagian, serta hitungan mandiri semua kunci Panduan Guru (termasuk kunci nomor 1b yang keliru),
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k4b1e.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b1e-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K4B1E, V.VIDEO_LUAR_K4B1E];
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
const G = await import("../src/components/modul/story/k4b1e-gambar.ts");
const U1 = await import("../src/components/modul/story/k4b1e-luar-1.ts");
const M_VIDEO = V.VIDEO_MATERI_K4B1E;
// Pembuka administratif (tujuan, peta konsep, panduan awal; di I: rubrik, refleksi, interaksi orang tua) tidak lagi diputar di video materi.
// Adegannya tetap ada di berkas materi, jadi pemeriksaan isi memakai daftar penuh; hanya jumlah dan urutan adegan diuji terhadap video yang diputar.
const MODUL_MATERI = Object.assign({}, await import("../src/components/modul/story/k4b1e-materi-1.ts"), await import("../src/components/modul/story/k4b1e-materi-2.ts"));
const M = { ...M_VIDEO, adegan: [MODUL_MATERI.ADEGAN_PANDUAN_AWAL, MODUL_MATERI.ADEGAN_TONI_PANJANG, MODUL_MATERI.ADEGAN_TONI_PENDEK, MODUL_MATERI.ADEGAN_BUKU_TIGA, MODUL_MATERI.ADEGAN_SIMPAN_PANJANG, MODUL_MATERI.ADEGAN_SIMPAN_PENDEK, MODUL_MATERI.ADEGAN_PANDUAN_AMATI, MODUL_MATERI.ADEGAN_BERLATIH_SATU, MODUL_MATERI.ADEGAN_BERLATIH_DUA_SATU, MODUL_MATERI.ADEGAN_BERLATIH_DUA_DUA, MODUL_MATERI.ADEGAN_BERLATIH_TIGA_EMPAT, MODUL_MATERI.ADEGAN_BERLATIH_LIMA, MODUL_MATERI.ADEGAN_MISKONSEPSI] };
const U = V.VIDEO_LUAR_K4B1E;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const nilaiId = (objs, id) => objs.find((o) => o.id === id)?.isi;
const objAda = (objs, id) => objs.find((o) => o.id === id);
const T = (v, id, ke) => akhirAdegan(adegan(v, id), ke);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  const METODE = ["Standard Addition", "Regrouping", "Counting On", "Partial Sums"];
  const NAMA_ID = ["Penjumlahan Bersusun", "Menyimpan", "Menghitung Maju", "Jumlah Sebagian"];
  cek(!/Standard Addition|Regrouping|Counting On|Partial Sums|Penjumlahan Bersusun|Menghitung Maju|Jumlah Sebagian|metode luar|metode dari luar/i.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of [...METODE, ...NAMA_ID]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE, METODE, "nama metode di berkas luar-1");
  sama(U1.NAMA_METODE_ID, NAMA_ID, "nama Indonesia metode luar");
  cek(M.adegan.every((a) => /(Buku Siswa|Panduan Guru) hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  cek(U.adegan.every((a) => a.sumber.length <= 46), "video metode luar: label sumber cukup pendek untuk kanvas 300 lebar");
  cek(M.adegan.every((a) => a.sumber.length <= 52), "video materi: label sumber cukup pendek untuk kanvas 300 lebar");
  for (const kata of ["Peta konsep", "Kata kunci", "Apersepsi", "Ayo Berlatih", "Ayo Berpikir", "Miskonsepsi", "Diferensiasi", "Refleksi", "Subbab", "Tujuan pembelajaran", "Panduan guru", "Aktivitas"]) cek(!luar.includes(kata), `video metode luar tidak memuat "${kata}" milik materi`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-standar", "luar-standar-terapan", "luar-simpan", "luar-simpan-terapan", "luar-maju", "luar-maju-terapan", "luar-sebagian", "luar-sebagian-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[0].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  cek(M_VIDEO.adegan.length === 12 && U.adegan.length === 10, "12 adegan materi dan 10 adegan metode luar");
  cek(M.id === "k4b1e-materi" && U.id === "k4b1e-luar", "id video k4b1e-materi dan k4b1e-luar");
  // Sub-Bab E tidak membocorkan materi sub-bab lain (pengurangan, perkalian, pembagian, faktor, kelipatan) dan penutup bab.
  const BOCOR = /pengurangan|dikurang|kurangkan|perkalian|pembagian|faktor|kelipatan|uji kompetensi|refleksi|pengayaan|remedial/i;
  for (const a of M.adegan) cek(!BOCOR.test(teksAdegan(a)), `materi ${a.id} tidak membocorkan sub-bab lain`);
  for (const a of U.adegan) cek(!BOCOR.test(teksAdegan(a)), `metode luar ${a.id} tidak membocorkan sub-bab lain`);
  cek(totalKetukan >= 80, `total ketukan cukup dalam (${totalKetukan})`);
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "toni-panjang,toni-pendek,buku-tiga,simpan-panjang,simpan-pendek,panduan-amati,berlatih-satu,berlatih-dua-satu,berlatih-dua-dua,berlatih-tiga-empat,berlatih-lima,miskonsepsi", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "luar-pembuka,luar-standar,luar-standar-terapan,luar-simpan,luar-simpan-terapan,luar-maju,luar-maju-terapan,luar-sebagian,luar-sebagian-terapan,luar-ringkas", "urutan adegan metode luar");
  // Tidak ada digit di suara (angka ditulis dengan kata).
  for (const v of [M, U]) for (const a of v.adegan) a.ketukan.forEach((kt, i) => cek(!/\d/.test(kt.suara), `${v.id}/${a.id}#${i + 1}: suara tanpa digit`));
  // Tiga nama metode lama sama dengan naskah bab; nama metode baru belum dipakai naskah, judul, data, lab, atau video sub-bab lain pada bab ini.
  const modul = new URL("../src/components/modul/", import.meta.url);
  const baca = (n) => readFileSync(new URL(n, modul), "utf8");
  const naskah = baca("naskah-k4b1.ts");
  const bagianE = naskah.slice(naskah.indexOf("export const SUB_E41"), naskah.indexOf("export const SUB_F41"));
  cek(/Standard Addition/.test(bagianE) && /Regrouping/.test(bagianE) && /Counting On/.test(bagianE), "tiga nama metode lama sama dengan nama di naskah SUB_E41");
  cek(/Penjumlahan Bersusun/.test(bagianE) && /Menyimpan/.test(bagianE) && /Menghitung Maju/.test(bagianE), "tiga nama Indonesia metode lama sama dengan naskah SUB_E41");
  const berkasLab = readdirSync(modul).filter((f) => /^lab-.*k4b1.*\.ts$/.test(f));
  cek(berkasLab.length >= 4, `berkas lab bab 1 ditemukan (${berkasLab.length})`);
  for (const n of ["naskah-k4b1.ts", "data-k4b1.ts", ...berkasLab]) cek(!/Partial Sums|Jumlah Sebagian/i.test(baca(n)), `nama metode baru Partial Sums / Jumlah Sebagian tidak bentrok dengan ${n}`);
  const folderStory = new URL("../src/components/modul/story/", import.meta.url);
  for (const f of readdirSync(folderStory).filter((n) => /^k4b1[a-i]-/.test(n) && !/^k4b1e-/.test(n))) cek(!/Partial Sums|Jumlah Sebagian/i.test(readFileSync(new URL(f, folderStory), "utf8")), `nama metode baru tidak bentrok dengan video sub-bab lain (${f})`);
  for (const ad of [...M.adegan, ...U.adegan]) cek(!/Partial Sums|Jumlah Sebagian/i.test(ad.judul) || U.adegan.includes(ad), `judul ${ad.id}: nama metode baru hanya di video metode luar`);
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

/* ------------------------------ Tabel susun, uraian, balok, garis bilangan, dan hitungan dihitung ulang dari gambar ------------------------------ */
const jum = (a) => a.reduce((s, v) => s + v, 0);
const barisSusun = (objs, id, n) => Array.from({ length: n }, (_, r) => [0, 1, 2].map((c) => nilaiId(objs, `${id}-d${r}${c}`) ?? ""));
const angkaBaris = (b) => (b.join("") === "" ? null : Number(b.join("")));
/** Periksa satu tabel susun penuh: bilangan, hasil, simpanan, dan persamaan langkah dihitung ulang dari angka di gambar. */
const susunOk = (objs, id, bilangan, nama) => {
  const n = bilangan.length;
  const baris = barisSusun(objs, id, n + 1);
  sama(baris.slice(0, n).map(angkaBaris), bilangan, `${nama}: bilangan di tabel`);
  sama(angkaBaris(baris[n]), jum(bilangan), `${nama}: hasil di tabel`);
  let masuk = 0;
  for (let c = 2; c >= 0; c -= 1) {
    const suku = [...(masuk > 0 ? [masuk] : []), ...baris.slice(0, n).map((b) => b[c]).filter((d) => d !== "").map(Number)];
    const j = jum(suku);
    sama(Number(baris[n][c]), j % 10, `${nama}: digit hasil kolom ${c}`);
    const eq = nilaiId(objs, `${id}-e${c}`);
    if (eq !== undefined) sama(eq, `${suku.join(" + ")} = ${j}`, `${nama}: persamaan kolom ${c}`);
    const keluar = Math.floor(j / 10);
    if (c > 0) sama(Number(nilaiId(objs, `${id}-m${c - 1}`) ?? 0), keluar, `${nama}: tanda simpan di atas kolom ${c - 1}`);
    masuk = keluar;
  }
  sama(masuk, 0, `${nama}: tidak ada simpanan sisa`);
  stat.data += 1;
};
const hitungEksUji = (s) => {
  const t = s.replace(/[()]/g, "").replace(/\s*\+\s*$/, "").replace(/^=\s*/, "");
  return hitungEks(t);
};
/** Bilangan di kiri (mis. "321 +") sama dengan jumlah uraian "= 300 + 20 + 1 +". */
const uraiOk = (objs, idBil, idUrai, nama) => {
  const b = Number(nilaiId(objs, idBil).replace(/\D/g, ""));
  const u = hitungEksUji(nilaiId(objs, idUrai));
  sama(u, b, `${nama}: uraian ${nilaiId(objs, idUrai)} sama dengan ${b}`);
  stat.data += 1;
};
const rantaiOk = (objs, ids, nilai, nama) => {
  for (const id of ids) sama(hitungEksUji(nilaiId(objs, id)), nilai, `${nama}: ${nilaiId(objs, id)} sama dengan ${nilai}`);
  stat.data += 1;
};
const hitungId = (objs, re) => objs.filter((o) => re.test(o.id)).length;
const kataPos = (kt, kata) => L.posisiKata(kt.suara, kata);

{
  // Data buku (Buku Siswa hlm. 28-34; kunci Panduan Guru hlm. 50-53) ditulis ulang di sini sebagai pembanding mandiri.
  sama(G.LATIHAN_SATU.map((b) => [...b]), [[333, 205], [812, 116], [576, 148]], "Ayo Berlatih nomor 1: soal a, b, c");
  sama(G.LATIHAN_SATU.map(jum), [538, 928, 724], "hitungan mandiri nomor 1: 538, 928, 724");
  sama([...G.KUNCI_SATU_BUKU], [538, 922, 724], "kunci Panduan Guru hlm. 50 nomor 1: 538, 922, 724");
  cek(G.KUNCI_SATU_BUKU[0] === 538 && G.KUNCI_SATU_BUKU[2] === 724 && G.KUNCI_SATU_BUKU[1] !== jum([812, 116]) && jum([812, 116]) - G.KUNCI_SATU_BUKU[1] === 6, "kunci nomor 1 bagian b (922) keliru: 812 + 116 = 928, selisih 6");
  sama(G.LATIHAN_DUA.map((b) => [...b]), [[373, 208], [277, 146], [627, 92], [234, 279, 444], [49, 178], [612, 48, 156]], "Ayo Berlatih nomor 2: soal a sampai f");
  sama(G.LATIHAN_DUA.map(jum), [581, 423, 719, 957, 227, 816], "hitungan mandiri nomor 2");
  sama([...G.KUNCI_DUA_BUKU], [581, 423, 719, 957, 227, 816], "kunci Panduan Guru hlm. 51 nomor 2");
  sama(G.LATIHAN_TIGA.map((b) => [...b]), [[333, 519], [429, 19], [821, 98], [700, 139], [621, 37, 128]], "nomor 3: soal a sampai e");
  sama(G.LATIHAN_TIGA.map(jum), [852, 448, 919, 839, 786], "hitungan mandiri nomor 3");
  sama([...G.KUNCI_TIGA_BUKU], [852, 448, 919, 839, 786], "kunci Panduan Guru hlm. 52 nomor 3");
  sama(G.LATIHAN_EMPAT.map((b) => [...b]), [[629, 123], [377, 330, 29], [423, 390], [39, 821], [690, 56, 218]], "nomor 4: soal a sampai e");
  sama([...G.JAWAB_EMPAT_KANAN], [813, 736, 860, 964, 752], "nomor 4: jawaban kolom kanan dari atas");
  sama(G.LATIHAN_EMPAT.map((b) => G.JAWAB_EMPAT_KANAN.indexOf(jum(b))), [4, 1, 0, 2, 3], "hitungan mandiri nomor 4: a ke 752, b ke 736, c ke 813, d ke 860, e ke 964");
  sama(G.LATIHAN_LIMA.map((b) => [...b]), [[328, 579], [117, 105, 242], [121, 29, 98], [111, 77, 89]], "nomor 5: soal cerita a sampai d");
  sama(G.LATIHAN_LIMA.map(jum), [907, 464, 248, 277], "hitungan mandiri nomor 5");
  sama([...G.KUNCI_LIMA_BUKU], [907, 464, 248, 277], "kunci Panduan Guru hlm. 52-53 nomor 5");
  sama(Object.values(G.CONTOH).map((b) => [...b]), [[131, 321], [124, 411, 363], [189, 245]], "contoh Ayo Mengamati: 131+321, 124+411+363, 189+245");
  sama(Object.values(G.CONTOH).map((b) => jum(b)), [452, 898, 434], "hasil contoh buku: 452, 898, 434");
  // Kolom dan simpanan contoh jeruk sama dengan langkah tertulis di buku (hlm. 31).
  sama([2, 1, 0].map((c) => `${G.kolomJumlah([189, 245], c).suku.join(" + ")} = ${G.kolomJumlah([189, 245], c).jumlah}`), ["9 + 5 = 14", "1 + 8 + 4 = 13", "1 + 1 + 2 = 4"], "langkah buku hlm. 31: 9 + 5 = 14, 1 + 8 + 4 = 13, 1 + 1 + 2 = 4");

  // Tabel susun pada gambar.
  susunOk(T(M, "toni-pendek"), "tp", [131, 321], "Pak Toni susun pendek");
  sama([2, 1, 0].map((c) => nilaiId(T(M, "toni-pendek"), `tp-e${c}`)), ["1 + 1 = 2", "3 + 2 = 5", "1 + 3 = 4"], "buku hlm. 29: 1 + 1 = 2, 3 + 2 = 5, 1 + 3 = 4 (dari kanan)");
  susunOk(T(M, "buku-tiga"), "t3", [124, 411, 363], "tiga perpustakaan susun pendek");
  susunOk(T(M, "simpan-pendek", 3), "sp", [189, 245], "keranjang jeruk susun pendek");
  sama([2, 1, 0].map((c) => nilaiId(T(M, "simpan-pendek", 3), `sp-e${c}`)), ["9 + 5 = 14", "1 + 8 + 4 = 13", "1 + 1 + 2 = 4"], "buku hlm. 31: persamaan kolom susun pendek");
  sama([nilaiId(T(M, "simpan-pendek", 3), "sp-m0"), nilaiId(T(M, "simpan-pendek", 3), "sp-m1")], ["1", "1"], "buku hlm. 31: dua tanda simpan satu di atas puluhan dan ratusan");
  [0, 1, 2].forEach((i) => {
    const o = T(M, "berlatih-dua-satu", i);
    susunOk(o, ["ka", "kb", "kc"][i], G.LATIHAN_DUA[i], `Berlatih 2 ${"abc"[i]}`);
    sama(nilaiId(o, `${["ka", "kb", "kc"][i]}-hs-t0`), `${G.LATIHAN_DUA[i].join(" + ")} = ${G.KUNCI_DUA_BUKU[i]}`, `Berlatih 2 ${"abc"[i]}: kartu hasil sama dengan kunci buku`);
  });
  [0, 1, 2].forEach((i) => {
    const o = T(M, "berlatih-dua-dua", i);
    susunOk(o, ["kd", "ke", "kf"][i], G.LATIHAN_DUA[i + 3], `Berlatih 2 ${"def"[i]}`);
    sama(nilaiId(o, `${["kd", "ke", "kf"][i]}-hs-t0`), `${G.LATIHAN_DUA[i + 3].join(" + ")} = ${G.KUNCI_DUA_BUKU[i + 3]}`, `Berlatih 2 ${"def"[i]}: kartu hasil sama dengan kunci buku`);
  });
  susunOk(T(M, "miskonsepsi", 1), "ms", [189, 245], "miskonsepsi: contoh video 189 + 245");
  {
    const ms = T(M, "miskonsepsi", 1);
    sama(nilaiId(ms, "ms-w"), "1 + 2 = 3", "miskonsepsi: mulai dari ratusan 1 + 2 = 3");
    cek(L.keadaanStory(adegan(M, "miskonsepsi"), 1, L.kataDari(adegan(M, "miskonsepsi").ketukan[1].suara).findIndex((w) => /^Tetapi/.test(w))).find((o) => o.id === "ms-d20")?.isi === "3", "miskonsepsi: ratusan sempat tertulis 3 sebelum simpanan puluhan");
    sama(nilaiId(ms, "ms-d20"), "4", "miskonsepsi: ratusan akhirnya 4 setelah simpanan");
  }
  susunOk(T(U, "luar-standar-terapan", 0), "st", [124, 411, 363], "metode luar Standard Addition: 124 + 411 + 363");
  susunOk(T(U, "luar-standar-terapan", 1), "su", [277, 146], "metode luar Standard Addition: 277 + 146 dengan simpan");
  sama(nilaiId(T(U, "luar-standar-terapan", 2), "sk0"), "300 + 150 = 450", "perkiraan 277 + 146: 300 + 150 = 450");
  cek(Math.round(277 / 100) * 100 === 300 && Math.round(146 / 10) * 10 === 150 && Math.abs(450 - 423) < 30, "perkiraan: 277 dibulatkan 300, 146 dibulatkan 150, mendekati 423");
  {
    const nt = T(M, "panduan-awal", 2);
    sama(barisSusun(nt, "nt", 1).map(angkaBaris), [131], "contoh nilai tempat: 1 ratusan, 3 puluhan, 1 satuan");
  }
  {
    const pd = T(M, "panduan-amati", 3);
    sama(nilaiId(pd, "pgd-t0"), "219 + 117 = 336 (contoh video)", "contoh video: 219 + 117 = 336");
    sama(nilaiId(pd, "pgd-t1"), (() => { const p = [2, 1, 0].map((c) => `${G.kolomJumlah([219, 117], c).suku.join(" + ")} = ${G.kolomJumlah([219, 117], c).jumlah}`); return `${p[0]}, simpan 1; ${p[1]}; ${p[2]}`; })(), "contoh video: langkah kolom 219 + 117");
  }

  // Uraian susun panjang dan rantai persamaan.
  {
    const o1 = T(M, "toni-panjang");
    uraiOk(o1, "b1", "u1", "Toni 131");
    uraiOk(o1, "b2", "u2", "Toni 321");
    rantaiOk(o1, ["u3", "u4", "u5"], 452, "Toni susun panjang");
    const o2 = T(M, "buku-tiga", 4);
    uraiOk(o2, "v1", "w1", "124");
    uraiOk(o2, "v2", "w2", "411");
    uraiOk(o2, "v3", "w3", "363");
    rantaiOk(o2, ["w4", "w5", "w6"], 898, "tiga perpustakaan susun panjang");
    const o3 = T(M, "simpan-panjang");
    uraiOk(o3, "a1", "b1", "189");
    uraiOk(o3, "a2", "b2", "245");
    rantaiOk(o3, ["b3", "b4", "b5", "b6", "b7", "b8"], 434, "keranjang jeruk susun panjang");
    const s1 = T(M, "berlatih-satu", 1);
    uraiOk(s1, "h1", "h3", "latihan 1a 333");
    uraiOk(s1, "h2", "h4", "latihan 1a 205");
    rantaiOk(s1, ["h5", "h6"], 538, "latihan 1a");
    const s2 = T(M, "berlatih-satu", 3);
    uraiOk(s2, "i1", "i3", "latihan 1b 812");
    uraiOk(s2, "i2", "i4", "latihan 1b 116");
    rantaiOk(s2, ["i5", "i6"], 928, "latihan 1b");
    sama(nilaiId(s2, "ik-t0"), "kunci buku: 922", "latihan 1b: kunci buku tertulis 922");
    sama(nilaiId(T(M, "berlatih-satu", 4), "i7"), "2 + 6 = 8", "latihan 1b: satuan 2 + 6 = 8");
    const s3 = T(M, "berlatih-satu", 6);
    uraiOk(s3, "j1", "j3", "latihan 1c 576");
    uraiOk(s3, "j2", "j4", "latihan 1c 148");
    rantaiOk(s3, ["j5", "j6", "j7", "j8", "j9"], 724, "latihan 1c");
    sama(nilaiId(s3, "j6"), "= 600 + 100 + 10 + 14", "kunci 1c: = 600 + 100 + 10 + 14");
    sama(nilaiId(s3, "j7"), "= 700 + 10 + 10 + 4", "kunci 1c: = 700 + 10 + 10 + 4");
    const en = T(M, "simpan-panjang");
    sama([nilaiId(en, "c1"), nilaiId(en, "c2")], ["9 + 5 = 14 → 10 + 4", "80 + 40 = 120 → 100 + 20"], "buku hlm. 31: 9 + 5 = 14 diuraikan 10 + 4; 80 + 40 = 120 diuraikan 100 + 20");
  }
  // Nomor 3: persamaan, operan, dan kunci.
  {
    const tg = T(M, "berlatih-tiga-empat", 2);
    G.LATIHAN_TIGA.forEach((b, i) => {
      const m = (nilaiId(tg, `n3e${i}`) ?? "").match(/^(.+) = (\d+)$/);
      cek(!!m && hitungEks(m[1]) === Number(m[2]) && Number(m[2]) === G.KUNCI_TIGA_BUKU[i] && m[1] === b.join(" + "), `nomor 3 ${"abcde"[i]}: ${nilaiId(tg, `n3e${i}`)} cocok dengan soal dan kunci`);
      cek(!!objAda(tg, `n3c${i}`), `nomor 3 ${"abcde"[i]}: tanda cocok kunci`);
    });
    stat.data += 1;
    // Nomor 4: garis dari soal ke jawaban yang sesuai.
    const em = T(M, "berlatih-tiga-empat", 5);
    const kanan = [0, 1, 2, 3, 4].map((j) => ({ v: Number(nilaiId(em, `n4v${j}`)), kotak: objAda(em, `n4r${j}`) }));
    sama(kanan.map((q) => q.v), [813, 736, 860, 964, 752], "nomor 4: nilai di kolom kanan");
    G.LATIHAN_EMPAT.forEach((b, i) => {
      const s = nilaiId(em, `n4s${i}`).replace(/^[a-e]\.\s*/, "").replace(/\s*=$/, "");
      sama(s, b.join(" + "), `nomor 4 ${"abcde"[i]}: soal di kolom kiri`);
      const g = objAda(em, `n4g${i}`);
      const kiri = objAda(em, `n4a${i}`);
      const awalY = g.y;
      const akhirY = g.y + g.y2;
      const akhirX = g.x + g.x2;
      cek(awalY > kiri.y && awalY < kiri.y + kiri.h && Math.abs(g.x - (kiri.x + kiri.w)) < 0.5, `nomor 4 ${"abcde"[i]}: garis berawal di kotak soal`);
      const tujuan = kanan.find((q) => akhirY > q.kotak.y && akhirY < q.kotak.y + q.kotak.h && Math.abs(akhirX - q.kotak.x) < 0.5);
      cek(!!tujuan && tujuan.v === hitungEks(s), `nomor 4 ${"abcde"[i]}: garis berakhir di jawaban ${hitungEks(s)} (${tujuan?.v})`);
    });
    stat.data += 1;
    // Nomor 5: soal cerita.
    ["ca", "cb", "cc", "cd"].forEach((p, i) => {
      const o = T(M, "berlatih-lima", i);
      const m = (nilaiId(o, `${p}j`) ?? "").match(/^(.+) = (\d+)$/);
      cek(!!m && m[1] === G.LATIHAN_LIMA[i].join(" + ") && hitungEks(m[1]) === Number(m[2]) && Number(m[2]) === G.KUNCI_LIMA_BUKU[i], `soal cerita ${"abcd"[i]}: ${nilaiId(o, `${p}j`)} cocok dengan soal dan kunci`);
      const diketahui = [0, 1, 2].map((q) => nilaiId(o, `${p}d-t${q}`) ?? "").join(" ");
      for (const n of G.LATIHAN_LIMA[i]) cek(new RegExp(`\\b${n}\\b`).test(diketahui), `soal cerita ${"abcd"[i]}: angka ${n} ada pada kartu diketahui`);
      cek((nilaiId(o, `${p}k-t0`) ?? "").includes(String(G.KUNCI_LIMA_BUKU[i])), `soal cerita ${"abcd"[i]}: kesimpulan memuat ${G.KUNCI_LIMA_BUKU[i]}`);
    });
    const tb = T(M, "berlatih-lima", 4);
    G.LATIHAN_LIMA.forEach((b, i) => sama([nilaiId(tb, `kr${i + 1}-t1`), nilaiId(tb, `kr${i + 1}-t2`)], [b.join(" + "), String(G.KUNCI_LIMA_BUKU[i])], `tabel kunci soal cerita ${"abcd"[i]}`));
    stat.data += 1;
  }

  // Balok satuan, batang puluhan, dan penukaran sepuluh.
  {
    const a = adegan(U, "luar-simpan");
    const r0 = akhirAdegan(a, 0);
    cek(hitungId(r0, /^ra-o\d+$/) === 10 && objAda(r0, "rb-p").h === 10 * objAda(r0, "rb-p").w && hitungId(r0, /^rb-sk\d$/) === 9, "Regrouping konsep: 10 balok satuan dan satu batang puluhan (tinggi 10 kali lebar, 9 sekat)");
    const kt = a.ketukan[1];
    const p = kataPos(kt, "dikelompokkan");
    const sebelum = L.keadaanStory(a, 1, p - 1);
    const sesudah = L.keadaanStory(a, 1, p);
    cek(hitungId(sebelum, /^rg-o\d+$/) === 14 && hitungId(sebelum, /^rr-p$/) === 0, "Regrouping: sebelum dikelompokkan ada 14 satuan");
    cek(hitungId(sesudah, /^rg-o\d+$/) === 4 && !!objAda(sesudah, "rr-p") && objAda(sesudah, "rr-p").h === 10 * objAda(sesudah, "rr-p").w && 14 - 10 === 4, "Regrouping: sesudah dikelompokkan 4 satuan sisa dan satu batang puluhan (14 - 10 = 4)");
    sama(nilaiId(sesudah, "rgt"), "14 satuan", "Regrouping: label 14 satuan");
    const b = adegan(U, "luar-simpan-terapan");
    const kb = b.ketukan[0];
    const pt = kataPos(kb, "Tukar");
    const s0 = L.keadaanStory(b, 0, pt - 1);
    cek(hitungId(s0, /^rj-o\d+$/) === 14 && s0.filter((o) => /^rj-o\d+$/.test(o.id) && o.warna === "#DBEAFE").length === 5 && s0.filter((o) => /^rj-o\d+$/.test(o.id) && o.warna === "#FECACA").length === 9 && 9 + 5 === 14, "Regrouping jeruk: 9 satuan merah muda dan 5 biru muda, jumlah 14");
    sama(nilaiId(s0, "rje"), "9 + 5 = 14 satuan", "Regrouping jeruk: 9 + 5 = 14 satuan");
    const s1 = akhirAdegan(b, 0);
    cek(hitungId(s1, /^rj-o\d+$/) === 4 && !!objAda(s1, "rjp-p") && objAda(s1, "rjp-p").h === 10 * objAda(s1, "rjp-p").w && s1.filter((o) => /^rj-o\d+$/.test(o.id)).every((o) => o.warna === "#DBEAFE"), "Regrouping jeruk: sisa 4 satuan (biru) dan satu batang puluhan");
    const q0 = L.keadaanStory(b, 1, kataPos(b.ketukan[1], "Tukar") - 1);
    cek(hitungId(q0, /^rq-b\d+$/) === 13 && 8 + 4 + 1 === 13, "Regrouping puluhan: 13 batang puluhan (8 + 4 + 1)");
    const q1 = akhirAdegan(b, 1);
    cek(hitungId(q1, /^rq-b\d+$/) === 3 && !!objAda(q1, "rq-r") && objAda(q1, "rq-r").w === objAda(q1, "rq-r").h && 13 - 10 === 3, "Regrouping puluhan: sisa 3 batang dan satu kotak ratusan (13 - 10 = 3)");
    const mb = akhirAdegan(adegan(M, "panduan-awal"), 1);
    cek(hitungId(mb, /^mb\d$/) === 10, "contoh video: sepuluh manik");
    sama(nilaiId(akhirAdegan(b, 2), "uh-t0"), "189 + 245 = 434", "Regrouping jeruk: hasil 189 + 245 = 434");
    sama([nilaiId(akhirAdegan(b, 2), "ue0"), nilaiId(akhirAdegan(b, 2), "ue1"), nilaiId(akhirAdegan(b, 2), "ue2")], ["9 + 5 = 14", "1 + 8 + 4 = 13", "1 + 1 + 2 = 4"], "Regrouping jeruk: langkah tiap kolom");
    stat.data += 1;
  }

  // Garis bilangan: titik berskala, lompatan sama dengan selisih, awal dari bilangan yang lebih besar.
  const garisOk = (objs, id, nilai, tambahan, nama) => {
    const x = nilai.map((_, i) => objAda(objs, `${id}-k${i}`).x);
    const skala = (x[1] - x[0]) / (nilai[1] - nilai[0]);
    cek(nilai.every((v, i) => Math.abs(x[i] - x[0] - (v - nilai[0]) * skala) < 0.05), `${nama}: titik pada garis berskala (${x.map((v) => Math.round(v)).join(", ")})`);
    cek(nilai.every((v, i) => nilaiId(objs, `${id}-v${i}`) === String(v) && Math.abs(objAda(objs, `${id}-v${i}`).x - x[i]) < 0.05), `${nama}: label nilai tepat di bawah titik`);
    for (let i = 0; i < nilai.length - 1; i += 1) {
      sama(nilaiId(objs, `${id}-l${i}`), `+${nilai[i + 1] - nilai[i]}`, `${nama}: label lompatan ${i + 1}`);
      const d = bilangan(objAda(objs, `${id}-j${i}`).d);
      cek(Math.abs(d[d.length - 2] - (x[i + 1] - x[i])) < 0.02, `${nama}: panjang lompatan ${i + 1} sama dengan jarak titik`);
    }
    sama(nilai[nilai.length - 1] - nilai[0], jum(tambahan.slice(1)), `${nama}: jumlah lompatan sama dengan bilangan kedua`);
    sama(nilai[0], Math.max(...tambahan), `${nama}: mulai dari bilangan yang lebih besar`);
    sama(nilai[nilai.length - 1], jum(tambahan), `${nama}: titik akhir sama dengan jumlah`);
    stat.data += 1;
  };
  {
    const mt = adegan(U, "luar-maju-terapan");
    garisOk(akhirAdegan(mt, 1), "m1", [429, 439, 448], [429, 19], "Counting On 429 + 19");
    garisOk(akhirAdegan(mt, 2), "m3", [821, 851, 860], [821, 39], "Counting On 39 + 821");
    garisOk(akhirAdegan(mt, 3), "m4", [821, 911, 919], [821, 98], "Counting On 821 + 98");
    sama(nilaiId(akhirAdegan(mt, 1), "m1h-t0"), `429 + 19 = ${G.KUNCI_TIGA_BUKU[1]}`, "Counting On: hasil sama dengan kunci nomor 3b");
    sama(nilaiId(akhirAdegan(mt, 2), "m3h-t0"), `39 + 821 = ${G.JAWAB_EMPAT_KANAN[2]}`, "Counting On: hasil sama dengan jawaban nomor 4c (860)");
    sama(nilaiId(akhirAdegan(mt, 3), "m4h-t0"), `821 + 98 = ${G.KUNCI_TIGA_BUKU[2]}`, "Counting On: hasil sama dengan kunci nomor 3c");
    // Lompatan muncul bertahap: pada awal ketukan pertama hanya titik awal.
    const awal = akhirAdegan(mt, 0);
    cek(!!objAda(awal, "m1-k1") && !objAda(awal, "m1-k2"), "Counting On: ketukan pertama baru sampai titik 439");
  }
  // Partial Sums: jumlah sebagian per nilai tempat dihitung ulang dari soal.
  {
    const rows = (bil) => {
      const sebagian = [100, 10, 1].map((p) => bil.map((n) => (Math.floor(n / p) % 10) * p));
      return [...sebagian.map((ds) => `${ds.join(" + ")} = ${jum(ds)}`), `${sebagian.map((ds) => jum(ds)).join(" + ")} = ${jum(bil)}`];
    };
    const sp = adegan(U, "luar-sebagian-terapan");
    const qa = akhirAdegan(sp, 1);
    sama([0, 1, 2, 3].map((i) => nilaiId(qa, `qa${i}-t1`)), rows(G.LATIHAN_TIGA[0]), "Partial Sums 333 + 519: jumlah sebagian dihitung ulang");
    sama(nilaiId(qa, "qal"), "333 + 519", "Partial Sums: soal 333 + 519");
    sama(jum(G.LATIHAN_TIGA[0]), G.KUNCI_TIGA_BUKU[0], "Partial Sums 333 + 519 sama dengan kunci nomor 3a");
    const qc = akhirAdegan(sp, 3);
    sama([0, 1, 2, 3].map((i) => nilaiId(qc, `qc${i}-t1`)), rows(G.LATIHAN_SATU[2]), "Partial Sums 576 + 148: jumlah sebagian dihitung ulang");
    sama(nilaiId(qc, "qcl"), "576 + 148", "Partial Sums: soal 576 + 148");
    sama(jum(G.LATIHAN_SATU[2]), G.KUNCI_SATU_BUKU[2], "Partial Sums 576 + 148 sama dengan kunci nomor 1c");
    cek(["800", "40", "12"].join() === rows(G.LATIHAN_TIGA[0]).slice(0, 3).map((r) => r.split(" = ")[1]).join() && ["600", "110", "14"].join() === rows(G.LATIHAN_SATU[2]).slice(0, 3).map((r) => r.split(" = ")[1]).join(), "jumlah sebagian: 800, 40, 12 dan 600, 110, 14");
    stat.data += 1;
  }
  {
    const rr = T(U, "luar-ringkas", 1);
    sama([1, 2, 3, 4].map((i) => nilaiId(rr, `rt${i}-t1`)), ["124 + 411 + 363; 277 + 146", "189 + 245", "429 + 19; 39 + 821; 821 + 98", "333 + 519; 576 + 148"], "luar: angka buku yang dipakai tiap metode");
    stat.data += 1;
  }
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
  // Kelas IV: Buku Siswa hlm. N = PDF N+12 (hlm. 28-34 = PDF 40-46; subbab E mulai di tengah PDF 40, subbab F mulai di bawah PDF 46); Panduan Guru hlm. N = PDF N+12 (hlm. 49-54 = PDF 61-66; subbab E mulai di tengah PDF 61, subbab F mulai di bawah PDF 66).
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 40, 46), ambil(bg, 61, 66), ambil(bs, 40, 40), ambil(bg, 61, 61), ambil(bs, 46, 46), ambil(bg, 66, 66)] : [null];
  if (bagian.some((b) => b === null)) console.log("PDF atau pembaca PDF tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const JUDUL_E = "e. penjumlahan bilangan cacah sampai 1.000";
    const JUDUL_F = "f. pengurangan bilangan cacah sampai 1.000";
    const siswaPenuh = bersih(bagian[0]);
    const guruPenuh = bersih(bagian[1]);
    const awalBs = siswaPenuh.indexOf(JUDUL_E);
    const akhirBs = siswaPenuh.indexOf(JUDUL_F);
    const awalBg = guruPenuh.indexOf(JUDUL_E);
    const akhirBg = guruPenuh.indexOf(JUDUL_F);
    cek(awalBs > 0 && akhirBs > awalBs && awalBg >= 0 && akhirBg > awalBg, "Buku Siswa PDF 40-46 dan Panduan Guru PDF 61-66 memuat judul subbab E dan F");
    const siswa = siswaPenuh.slice(awalBs, akhirBs);
    const guru = guruPenuh.slice(awalBg, akhirBg);
    const buku = `${siswa}\n${guru}`;
    cek(bersih(bagian[2]).includes(JUDUL_E) && !bersih(bagian[2]).includes(JUDUL_F), "subbab E mulai di Buku Siswa PDF 40 dan subbab F belum mulai di sana");
    cek(bersih(bagian[3]).includes(JUDUL_E) && bersih(bagian[3]).indexOf(JUDUL_E) < 600, "subbab E mulai di tengah atas Panduan Guru PDF 61");
    cek(bersih(bagian[4]).includes(JUDUL_F), "subbab F mulai di Buku Siswa PDF 46 (soal cerita nomor 5 ada di atasnya)");
    cek(bersih(bagian[5]).includes(JUDUL_F), "subbab F mulai di Panduan Guru PDF 66 (miskonsepsi dan diferensiasi E ada di atasnya)");
    // Nomor halaman cetak sama dengan PDF dikurangi 12.
    const halaman = (berkas, pdf, cetak) => new RegExp(`(^|\\n)\\s*${cetak}(\\s|$)`).test(ambil(berkas, pdf, pdf));
    for (let pdf = 41; pdf <= 46; pdf += 1) cek(halaman(bs, pdf, pdf - 12), `Buku Siswa PDF ${pdf} bernomor halaman ${pdf - 12}`);
    for (let pdf = 62; pdf <= 66; pdf += 1) cek(halaman(bg, pdf, pdf - 12), `Panduan Guru PDF ${pdf} bernomor halaman ${pdf - 12}`);
    let n = 0;
    for (const a of M.adegan) {
      for (const kt of a.kutipan ?? []) {
        n += 1;
        cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
      }
    }
    stat.kutipan = n;
    cek(n >= 100, `jumlah kutipan buku yang diperiksa (${n})`);
    cek(M.adegan.every((a) => (a.kutipan ?? []).length >= 3), "tiap adegan materi memuat paling sedikit 3 kutipan buku");
    // Bagian Buku Siswa dan Panduan Guru yang dipakai tiap adegan ada pada rentangnya.
    const siswaE = bersih(bagian[0].slice(0)).slice(awalBs, akhirBs);
    cek(siswaE.includes("5. kerjakan soal cerita berikut!") && siswaE.includes("ayo berlatih") && siswaE.includes("ayo mengamati"), "Buku Siswa E memuat Ayo Mengamati, Ayo Berlatih, dan soal cerita nomor 5");
    // Kunci Panduan Guru yang disajikan: angka kunci, dan keganjilan yang dicatat.
    cek(guru.includes("= 538 = 922") && guru.includes("= 900 + 20 + 2") && guru.includes("b. 812 = 800 + 10 + 2") && guru.includes("116 = 100 + 10 + 6"), "kunci Panduan Guru hlm. 50 nomor 1b tertulis 900 + 20 + 2 dan 922 (keliru; seharusnya 928)");
    cek(guru.includes("= 500 + 30 + 8") && guru.includes("= 724") && guru.includes("= 600 + 100 + 10 + 14") && guru.includes("= 700 + 10 + 10 + 4"), "kunci Panduan Guru hlm. 50 nomor 1a dan 1c");
    for (const kunci of ["a. 333 + 519 = 852", "b. 429 +19 = 448", "c. 821 + 98 = 919", "d. 700 + 139 = 839", "e. 621 + 37 + 128 = 786"]) cek(guru.includes(kunci), `kunci Panduan Guru hlm. 52: ${kunci}`);
    for (const kunci of ["328 + 579 = 907", "117 + 105 + 242 = 464", "121 + 29 + 98 = 248", "111 + 77 + 89 = 277"]) cek(guru.includes(kunci), `kunci Panduan Guru hlm. 52-53: ${kunci}`);
    cek(["813", "736", "860", "964", "752"].every((v) => guru.includes(v)), "Panduan Guru hlm. 52: lima jawaban nomor 4 (813, 736, 860, 964, 752)");
    cek(siswa.includes("jadi, banyaknya buah yang dijual adalah 434 buah"), "Buku Siswa hlm. 31: kalimat jadi memakai 'dijual' padahal soal 'dipikul' (kata dari buku)");
    cek(siswa.includes("memikul 2 keranjang buah jeruk"), "Buku Siswa hlm. 31: soal memakai kata memikul");
    cek(guru.includes("manik-manik, kelereng, kerikil.") && !/manik|kelereng|kerikil/.test(siswa), "sarana manik-manik, kelereng, kerikil hanya disebut Panduan Guru, tidak ada di Buku Siswa");
    cek(guru.includes("miskonsepsi yang sering terjadi dalam operasi penjumlahan"), "Panduan Guru hlm. 54: miskonsepsi penjumlahan");
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k4b1e-.*)\.(ts|tsx)$/.test(f));
  cek(berkas.length >= 7, `berkas story ditemukan (${berkas.length})`);
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
    cek(impor.every((i) => /^\.\/(logika-story|k4b1e-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k4b1e sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k4b1e.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_E41|video-k4b2-umum|video-k4b1-umum|naskah-k4b1|SUB_E41/.test(pembungkus) && /VIDEO_MATERI_K4B1E/.test(pembungkus) && /VIDEO_LUAR_K4B1E/.test(pembungkus) && /export function VideoK4B1E/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k4b1e.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k4b1e.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k4b1e.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k4b1e.mjs: akhir baris LF");
}

for (const v of [M, U]) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.kutipan} kutipan terhadap teks PDF, ${stat.terbilang} bilangan berkata, ${stat.persamaan} persamaan, ${stat.teksPasang} pasangan teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
