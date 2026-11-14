// Uji Story Kelas 4 Bab 1 Sub-Bab D (Komposisi dan Dekomposisi Bilangan Cacah sampai 10.000): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar (angka dan bilangan yang diucapkan dengan kata), perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, tidak membocorkan materi sub-bab lain, kutipan buku terhadap teks PDF (pdftotext, atau PyMuPDF bila tidak ada),
// angka papan nilai tempat, kartu bagian, deret uang Helen (jumlah dan stok), tukar kelompok, dan ikatan bilangan dihitung ulang dari gambar, hitungan mandiri kunci Panduan Guru,
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k4b1d.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b1d-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K4B1D, V.VIDEO_LUAR_K4B1D];
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
const G = await import("../src/components/modul/story/k4b1d-gambar.ts");
const U1 = await import("../src/components/modul/story/k4b1d-luar-1.ts");
const M = V.VIDEO_MATERI_K4B1D;
const U = V.VIDEO_LUAR_K4B1D;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const nilaiId = (objs, id) => objs.find((o) => o.id === id)?.isi;
const T = (v, id, ke) => akhirAdegan(adegan(v, id), ke);
const objAda = (objs, id) => objs.find((o) => o.id === id);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  const METODE = ["Composition", "Decomposition", "Flexible Grouping", "Number Bonds"];
  const NAMA_ID = ["Komposisi Bilangan", "Dekomposisi Bilangan", "Pengelompokan Fleksibel", "Ikatan Bilangan"];
  // "Komposisi Bilangan" dan "Dekomposisi Bilangan" juga istilah buku (judul bagian dan pertanyaan pemantik), jadi hanya nama Inggris dan dua nama Indonesia lain yang dilarang di video materi.
  cek(!/Composition|Decomposition|Flexible Grouping|Number Bonds|Pengelompokan Fleksibel|Ikatan Bilangan|metode luar|metode dari luar|Van de Walle|Base-ten/i.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of [...METODE, ...NAMA_ID]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE, METODE, "nama metode di berkas luar-1");
  sama(U1.NAMA_METODE_ID, NAMA_ID, "nama Indonesia metode luar");
  cek(M.adegan.every((a) => /(Buku Siswa|Panduan Guru) hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  cek(U.adegan.every((a) => a.sumber.length <= 46), "video metode luar: label sumber cukup pendek untuk kanvas 300 lebar");
  cek(M.adegan.every((a) => a.sumber.length <= 52), "video materi: label sumber cukup pendek untuk kanvas 300 lebar");
  for (const kata of ["Peta konsep", "Kata kunci", "Apersepsi", "Ayo Berlatih", "Ayo Berpikir", "Ayo Mengamati", "Miskonsepsi", "Diferensiasi", "Refleksi", "Subbab", "Tujuan pembelajaran", "Panduan guru", "Aktivitas"]) cek(!luar.includes(kata), `video metode luar tidak memuat "${kata}" milik materi`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-komposisi", "luar-komposisi-terapan", "luar-dekomposisi", "luar-dekomposisi-terapan", "luar-kelompok", "luar-kelompok-terapan", "luar-ikatan", "luar-ikatan-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[0].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  cek(M.adegan.length === 10 && U.adegan.length === 10, "10 adegan materi dan 10 adegan metode luar");
  cek(M.id === "k4b1d-materi" && U.id === "k4b1d-luar", "id video k4b1d-materi dan k4b1d-luar");
  // Sub-bab D tidak membocorkan materi sub-bab lain (penjumlahan, pengurangan, perkalian, pembagian, faktor, pembulatan, membandingkan, mengurutkan, bilangan terbesar dan terkecil) dan penutup bab.
  const BOCOR = /penjumlahan|pengurangan|dikurangi|mengurangi|perkalian|pembagian|dikali|dibagi|faktor|kelipatan|pembulatan|membandingkan|mengurutkan|terbesar|terkecil|uji kompetensi|refleksi|pengayaan|remedial/i;
  for (const a of [...M.adegan, ...U.adegan]) cek(!BOCOR.test(teksAdegan(a)), `${a.id} tidak membocorkan materi sub-bab lain`);
  cek(totalKetukan >= 70, `total ketukan cukup dalam (${totalKetukan})`);
  cek(M.adegan.map((a) => a.id).join() === "pembuka-d,komposisi-amati,komposisi-nilai,komposisi-berlatih,dekomposisi-amati,dekomposisi-uraian,dekomposisi-nol,berlatih-satu,berlatih-uang,miskonsepsi-diferensiasi", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "luar-pembuka,luar-komposisi,luar-komposisi-terapan,luar-dekomposisi,luar-dekomposisi-terapan,luar-kelompok,luar-kelompok-terapan,luar-ikatan,luar-ikatan-terapan,luar-ringkas", "urutan adegan metode luar");
  // Tiga nama metode lama sama dengan naskah bab; nama metode baru belum dipakai naskah, judul, atau lab lain pada bab ini.
  const modul = new URL("../src/components/modul/", import.meta.url);
  const baca = (n) => readFileSync(new URL(n, modul), "utf8");
  const naskah = baca("naskah-k4b1.ts");
  const bagianD = naskah.slice(naskah.indexOf("export const SUB_D41"), naskah.indexOf("export const SUB_E41"));
  cek(/"nama": "Composition"/.test(bagianD) && /"nama": "Decomposition"/.test(bagianD) && /"nama": "Flexible Grouping"/.test(bagianD), "tiga nama metode lama sama dengan nama di naskah bab (SUB_D41)");
  cek(/"namaId": "Komposisi Bilangan"/.test(bagianD) && /"namaId": "Dekomposisi Bilangan"/.test(bagianD) && /"namaId": "Pengelompokan Fleksibel"/.test(bagianD), "tiga nama Indonesia metode lama sama dengan naskah bab (SUB_D41)");
  const berkasLab = readdirSync(modul).filter((f) => /^lab-.*k4b1.*\.ts$/.test(f));
  cek(berkasLab.length >= 9, `berkas lab bab 1 ditemukan (${berkasLab.length})`);
  for (const n of ["naskah-k4b1.ts", "data-k4b1.ts", ...berkasLab]) cek(!/Number Bonds|Ikatan Bilangan/i.test(baca(n)), `nama metode baru Number Bonds / Ikatan Bilangan tidak bentrok dengan ${n}`);
  for (const ad of [...M.adegan, ...U.adegan]) cek(!/Number Bonds|Ikatan Bilangan/i.test(ad.judul) || U.adegan.includes(ad), `judul ${ad.id}: nama metode baru hanya di video metode luar`);
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


/* ------------------------------ Angka buku, papan, kartu, uang, dan ikatan dihitung ulang dari gambar ------------------------------ */
const NAMA_TEMPAT = ["ribuan", "ratusan", "puluhan", "satuan"];
const NILAI = [1000, 100, 10, 1];
const rbk = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const angkaTeks = (t) => (String(t).match(/\d[\d.]*/g) ?? []).map((v) => Number(v.replace(/\./g, "")));
/** Papan nilai tempat `id`: kolom (0 ribuan sampai 3 satuan) dibaca ulang dari gambar. */
const papanDigit = (objs, id) => [0, 1, 2, 3].map((c) => nilaiId(objs, `${id}-dt${c}`));
const papanTerisi = (objs, id) => papanDigit(objs, id).every((d) => d !== undefined);
const papanNilai = (objs, id) => papanDigit(objs, id).reduce((s, d, c) => s + Number(d) * NILAI[c], 0);
const papanUtuh = (objs, id) => [0, 1, 2, 3].every((c) => objAda(objs, `${id}-h${c}`) && objAda(objs, `${id}-d${c}`) && nilaiId(objs, `${id}-ht${c}`) === ["Ribuan", "Ratusan", "Puluhan", "Satuan"][c]);
const papanLebar = (objs, id) => [0, 1, 2, 3].map((c) => objAda(objs, `${id}-d${c}`)?.w);
const pcs = (digit, c) => digit * NILAI[c];
/** Jumlah semua angka di sisi kiri (sebelum tanda panah atau sama dengan) atau kanan teks "a + b + c = d". */
const jumlahBagian = (s) => angkaTeks(s).slice(0, -1).reduce((p, q) => p + q, 0) === angkaTeks(s).at(-1);
/** Teks "A = b + c + d" atau "A → b + c + d" (utuh di kiri): A sama dengan jumlah bagian di kanan. */
const utuhKiri = (s) => {
  const n = angkaTeks(s);
  return n.length >= 3 && n[0] === n.slice(1).reduce((p, q) => p + q, 0);
};

{
  // Data buku (dibaca dari PDF dan ditulis ulang di sini sebagai pembanding mandiri).
  sama([...G.KOMPOSISI_CONTOH], [6, 3, 4, 8], "Buku Siswa hlm. 24-25: angka 6, 3, 4, 8");
  sama(G.angkaDari(G.KOMPOSISI_CONTOH), 6348, "hitungan mandiri: 6.000 + 300 + 40 + 8 = 6.348");
  sama(G.KOMPOSISI_LATIHAN.map((d) => [...d]), [[6, 4, 8, 2], [6, 0, 4, 0], [4, 5, 3, 0]], "papan Ayo Berlatih dan contoh papan tiga Panduan Guru");
  sama(G.KOMPOSISI_LATIHAN.map((d) => G.angkaDari(d)), [6482, 6040, 4530], "kunci Panduan Guru hlm. 46-47: 6.482, 6.040, 4.530");
  sama([...G.URAI_LETAK], [6, 7, 8, 9], "Buku Siswa hlm. 26: bilangan 6.789");
  sama([...G.URAI_CONTOH], [6, 8, 4, 9], "Buku Siswa hlm. 26: bilangan 6.849");
  sama(G.angkaDari(G.URAI_CONTOH), 6849, "hitungan mandiri: 6.000 + 800 + 40 + 9 = 6.849");
  sama(G.angkaDari(G.URAI_NOL), 6035, "hitungan mandiri: 6.000 + 0 + 30 + 5 = 6.035");
  sama(G.URAI_LATIHAN.map((d) => G.angkaDari(d)), [6482, 7020, 2001, 7000, 9999], "Ayo Berlatih nomor 1: 6.482, 7.020, 2.001, 7.000, 9.999");
  sama(G.UANG_HELEN.map((p) => [...p]), [[100, 4], [500, 2], [1000, 5], [2000, 7]], "uang Helen: 4 x 100, 2 x 500, 5 x 1.000, 7 x 2.000");
  sama(G.UANG_HELEN.reduce((s, [n, b]) => s + n * b, 0), 20400, "jumlah seluruh uang Helen = 20.400 (cukup untuk 10.000)");
  sama([G.HARGA_SLAMET, G.BAYAR_SLAMET], [7300, 10000], "Slamet: harga 7.300, bayar 10.000");
  // Contoh jawaban Panduan Guru hlm. 48, ditulis ulang mandiri.
  const BUKU_7300 = [[2000, 2000, 2000, 1000, 100, 100, 100], [2000, 2000, 1000, 1000, 1000, 100, 100, 100], [2000, 1000, 1000, 1000, 1000, 1000, 100, 100, 100]];
  const BUKU_10000 = [[2000, 2000, 2000, 2000, 2000], [2000, 2000, 2000, 1000, 1000, 1000, 1000], [2000, 2000, 2000, 2000, 1000, 500, 500]];
  sama(G.URAIAN_7300.map((u) => [...u]), BUKU_7300, "contoh jawaban 7.300 sama dengan Panduan Guru hlm. 48");
  sama(G.URAIAN_10000.map((u) => [...u]), BUKU_10000, "contoh jawaban 10.000 sama dengan Panduan Guru hlm. 48");
  const stok = Object.fromEntries(G.UANG_HELEN.map(([n, b]) => [n, b]));
  const jumlahUang = (u) => u.reduce((s, v) => s + v, 0);
  const dalamStok = (u) => Object.entries(stok).every(([n, b]) => u.filter((v) => v === Number(n)).length <= b) && u.every((v) => stok[v] !== undefined);
  BUKU_7300.forEach((u, i) => cek(jumlahUang(u) === 7300 && dalamStok(u), `contoh 7.300 nomor ${i + 1}: jumlah 7.300 dan tidak melebihi uang Helen`));
  BUKU_10000.forEach((u, i) => cek(jumlahUang(u) === 10000 && dalamStok(u), `contoh 10.000 nomor ${i + 1}: jumlah 10.000 dan tidak melebihi uang Helen`));
  sama(10000 - 7300, 2700, "kembalian Slamet = 2.700 (tambahan video)");

  /** Kartu "N nama" di papan: kartu ke-i berisi digit papan dan nama tempat. */
  const bagianOk = (objs, idKartu, idPapan) => [0, 1, 2, 3].every((c) => nilaiId(objs, `${idKartu}${c}-t0`) === `${nilaiId(objs, `${idPapan}-dt${c}`)} ${NAMA_TEMPAT[c]}`);
  /** Deret uang: nilai tiap lembar dari gambar, kotak sama banyak dan tidak bertumpuk. */
  const uangDari = (objs, id) => {
    const kt = objs.filter((o) => new RegExp(`^${id}-k\\d+$`).test(o.id));
    const nl = kt.map((_, i) => nilaiId(objs, `${id}-t${i}`));
    const xs = kt.map((o) => o.x).sort((a, b) => a - b);
    const rapi = xs.every((x, i) => i === 0 || x - xs[i - 1] >= kt[0].w);
    return { nilai: nl.map((t) => (t === undefined ? NaN : Number(t.replace(/\./g, "")))), n: kt.length, rapi };
  };
  const uangOk = (objs, id, ref) => {
    const u = uangDari(objs, id);
    return u.n === ref.length && u.rapi && JSON.stringify(u.nilai) === JSON.stringify(ref);
  };

  /* ---------------- Materi ---------------- */
  // 1. Pembuka D.
  const ap = T(M, "pembuka-d", 2);
  cek(papanUtuh(ap, "ap") && papanLebar(ap, "ap").every((w) => w === 60), "pembuka D apersepsi: papan nilai tempat empat kolom sama lebar");
  sama(nilaiId(T(M, "pembuka-d", 0), "c-t0"), "satu bilangan 4 angka", "pembuka D: satu bilangan empat angka");
  // 2. Komposisi: Ayo Mengamati.
  const ka = T(M, "komposisi-amati", 1);
  cek(papanUtuh(ka, "kp") && papanTerisi(ka, "kp") && papanNilai(ka, "kp") === 6348, "komposisi amati: papan 6, 3, 4, 8 membentuk 6.348 (angka 6 ribuan, 3 ratusan, 4 puluhan, 8 satuan)");
  // 3. Komposisi: nilai dan bilangan terbentuk.
  const kn = T(M, "komposisi-nilai", 1);
  cek(papanTerisi(kn, "kn") && papanNilai(kn, "kn") === 6348, "komposisi nilai: papan 6.348");
  [0, 1, 2, 3].forEach((c) => sama(nilaiId(kn, `v${c}`), rbk(pcs(Number(nilaiId(kn, `kn-dt${c}`)), c)), `komposisi nilai: angka ke-${c + 1} bernilai ${rbk(pcs(G.KOMPOSISI_CONTOH[c], c))}`));
  sama([0, 1, 2, 3].map((c) => nilaiId(kn, `v${c}`)), ["6.000", "300", "40", "8"], "nilai tiap angka menurut buku: 6.000, 300, 40, 8");
  const kn3 = T(M, "komposisi-nilai", 2);
  sama([0, 1, 2, 3].map((c) => nilaiId(kn3, `sb${c}-t0`)), ["6 ribuan", "3 ratusan", "4 puluhan", "8 satuan"], "komposisi: 6 ribuan + 3 ratusan + 4 puluhan + 8 satuan");
  sama(nilaiId(kn3, "hs"), `= ${rbk(G.angkaDari(G.KOMPOSISI_CONTOH))}`, "komposisi: hasil 6.348");
  cek(utuhKiri(nilaiId(T(M, "komposisi-nilai", 3), "eq").replace(/^(.*) = (.*)$/, "$2 = $1")), "komposisi: 6.000 + 300 + 40 + 8 = 6.348 dihitung ulang");
  // 4. Komposisi: Ayo Berlatih.
  const bl1 = T(M, "komposisi-berlatih", 0);
  cek(papanTerisi(bl1, "l1") && papanNilai(bl1, "l1") === 6482, "berlatih komposisi papan satu: 6, 4, 8, 2");
  sama([0, 1, 2, 3].map((c) => nilaiId(bl1, `lb${c}-t0`)), ["… ribuan", "… ratusan", "… puluhan", "… satuan"], "berlatih komposisi: titik-titik belum diisi di soal");
  const bl2 = T(M, "komposisi-berlatih", 1);
  cek(bagianOk(bl2, "lb", "l1") && nilaiId(bl2, "lh") === `= ${rbk(papanNilai(bl2, "l1"))}` && papanNilai(bl2, "l1") === 6482, "berlatih komposisi papan satu: kunci 6 ribuan + 4 ratusan + 8 puluhan + 2 satuan = 6.482");
  const bl3 = T(M, "komposisi-berlatih", 2);
  cek(papanNilai(bl3, "l2") === 6040 && bagianOk(bl3, "ld", "l2") && nilaiId(bl3, "lh3") === "= 6.040", "berlatih komposisi papan dua: kunci 6.040 (nol ratusan dan nol satuan)");
  const bl4 = T(M, "komposisi-berlatih", 3);
  cek(papanNilai(bl4, "l3") === 4530 && bagianOk(bl4, "le", "l3") && nilaiId(bl4, "lh4") === "= 4.530", "berlatih komposisi papan tiga (contoh Panduan Guru): 4.530");
  cek(utuhKiri(nilaiId(T(M, "komposisi-berlatih", 4), "lq").replace(/^(.*) = (.*)$/, "$2 = $1")), "berlatih komposisi: 4.000 + 500 + 30 + 0 = 4.530 dihitung ulang");
  // 5. Dekomposisi: Ayo Mengamati.
  const da1 = T(M, "dekomposisi-amati", 0);
  sama([0, 1, 2, 3].map((i) => nilaiId(da1, `dg${i}-t`)).join(""), "6789", "dekomposisi amati: kotak angka 6, 7, 8, 9");
  sama(nilaiId(da1, "dl"), "bilangan 6.789", "dekomposisi amati: bilangan 6.789");
  const da2 = T(M, "dekomposisi-amati", 1);
  [0, 1, 2, 3].forEach((c) => sama(nilaiId(da2, `dk${c}-t0`), `${G.URAI_LETAK[c]} menempati nilai tempat ${NAMA_TEMPAT[c]}`, `dekomposisi amati: ${G.URAI_LETAK[c]} menempati nilai tempat ${NAMA_TEMPAT[c]}`));
  cek(objAda(da2, "dk3-k").y < objAda(da2, "dk2-k").y && objAda(da2, "dk2-k").y < objAda(da2, "dk1-k").y && objAda(da2, "dk1-k").y < objAda(da2, "dk0-k").y, "dekomposisi amati: label satuan paling atas, ribuan paling bawah, seperti di buku");
  [0, 1, 2, 3].forEach((c) => {
    const kt = objAda(da2, `dg${c}-k`);
    const v = objAda(da2, `dv${c}`);
    const h = objAda(da2, `dh${c}`);
    const lab = objAda(da2, `dk${c}-k`);
    cek(v.x === kt.x + kt.w / 2 && v.y === kt.y + kt.h && h.x === v.x && h.y === v.y + v.y2 && h.x + h.x2 === lab.x, `dekomposisi amati: garis penunjuk angka ke-${c + 1} menyambung kotak angka dan label`);
  });
  cek(nilaiId(T(M, "dekomposisi-amati", 2), "gk-t1") === "nilainya 6.000", "dekomposisi amati: contoh guru 6 di ribuan bernilai 6.000");
  const da4 = T(M, "dekomposisi-amati", 3);
  cek(papanTerisi(da4, "dt") && papanNilai(da4, "dt") === 6849 && nilaiId(da4, "db") === "6.849", "dekomposisi amati: tabel 6.849 (6, 8, 4, 9)");
  // 6. Dekomposisi: uraian.
  const du2 = T(M, "dekomposisi-uraian", 1);
  cek(papanTerisi(du2, "uu") && papanNilai(du2, "uu") === 6849, "uraian: papan 6.849");
  sama([0, 1, 2, 3].map((c) => nilaiId(du2, `w${c}`)), [0, 1, 2, 3].map((c) => rbk(pcs(G.URAI_CONTOH[c], c))), "uraian: nilai tiap angka dihitung ulang");
  sama([0, 1, 2, 3].map((c) => nilaiId(du2, `w${c}`)), ["6.000", "800", "40", "9"], "uraian: 6.000, 800, 40, 9 menurut buku");
  const du3 = T(M, "dekomposisi-uraian", 2);
  sama([0, 1, 2, 3].map((c) => nilaiId(du3, `ub${c}-t0`)), ["6 ribuan", "8 ratusan", "4 puluhan", "9 satuan"], "uraian: 6 ribuan + 8 ratusan + 4 puluhan + 9 satuan");
  sama(nilaiId(du3, "ue"), "6.849 =", "uraian: 6.849 =");
  const du4 = nilaiId(T(M, "dekomposisi-uraian", 3), "uf");
  cek(du4 === "6.849 = 6.000 + 800 + 40 + 9" && utuhKiri(du4), "uraian: 6.849 = 6.000 + 800 + 40 + 9 dihitung ulang");
  const du5 = T(M, "dekomposisi-uraian", 4);
  cek(nilaiId(du5, "ka") === "6.348" && nilaiId(du5, "kb") === "6.000 + 300 + 40 + 8" && angkaTeks(nilaiId(du5, "kb")).reduce((s, v) => s + v, 0) === 6348, "uraian: urai dan susun 6.348 dihitung ulang");
  // 7. Dekomposisi dengan nol.
  const dn1 = T(M, "dekomposisi-nol", 0);
  sama(nilaiId(dn1, "zb0"), "6.035", "nol: bilangan 6.035");
  const dn2 = T(M, "dekomposisi-nol", 1);
  cek(papanTerisi(dn2, "zn") && papanNilai(dn2, "zn") === 6035 && nilaiId(dn2, "zn-dt1") === "0", "nol: tabel 6.035 dengan nol ratusan");
  const dn3 = T(M, "dekomposisi-nol", 2);
  sama([0, 1, 2, 3].map((c) => nilaiId(dn3, `zb${c}-t0`)), ["6 ribuan", "0 ratusan", "3 puluhan", "5 satuan"], "nol: 6 ribuan + 0 ratusan + 3 puluhan + 5 satuan");
  sama(nilaiId(dn3, "zh"), "= 6.035", "nol: hasil 6.035");
  const dn4 = nilaiId(T(M, "dekomposisi-nol", 3), "zg");
  sama(dn4, "6.000 + 000 + 30 + 5", "nol: bentuk kedua di buku memakai 000");
  sama(dn4.split(" + ").map((t) => Number(t.replace(/\./g, ""))).reduce((s, v) => s + v, 0), 6035, "nol: 6.000 + 000 + 30 + 5 = 6.035 (000 bernilai nol)");
  const dn5 = T(M, "dekomposisi-nol", 4);
  [["zr", "ratusan"], ["zp", "puluhan"], ["zs", "satuan"]].forEach(([id, nama], i) => {
    const t = nilaiId(dn5, `${id}-t0`);
    const nol = t.match(/ditulis (0+)$/)[1];
    sama([t.startsWith(`${nama} 0`), nol.length], [true, String(NILAI[i + 1]).length], `nol Panduan Guru: ${nama} nol ditulis ${"0".repeat(String(NILAI[i + 1]).length)}`);
  });
  cek(jumlahBagian("6.000 + 0 + 30 + 5 = 6.035") && nilaiId(T(M, "dekomposisi-nol", 5), "zi") === "6.000 + 0 + 30 + 5 = 6.035", "nol catatan: 6.000 + 0 + 30 + 5 = 6.035 dihitung ulang");
  // 8. Ayo Berlatih nomor 1.
  const bs = T(M, "berlatih-satu", 4);
  G.URAI_LATIHAN.forEach((d, i) => {
    const label = nilaiId(bs, `tr${i}-t0`);
    const digit = [1, 2, 3, 4].map((c) => nilaiId(bs, `tr${i}-t${c}`));
    cek(label === rbk(G.angkaDari(d)) && digit.every((x) => x !== undefined) && digit.reduce((s, x, c) => s + Number(x) * NILAI[c], 0) === Number(label.replace(/\./g, "")), `nomor 1 baris ${i + 1}: ${label} sama dengan ${digit.join(", ")} menurut nilai tempat`);
  });
  sama(G.URAI_LATIHAN.map((d) => d.join("")), ["6482", "7020", "2001", "7000", "9999"], "nomor 1: angka tiap baris (kunci Panduan Guru hlm. 47)");
  cek(nilaiId(T(M, "berlatih-satu", 5), "bq") === "9.000 + 900 + 90 + 9 = 9.999", "nomor 1: 9.000 + 900 + 90 + 9 = 9.999");
  // 9. Uang Helen.
  const hu = T(M, "berlatih-uang", 1);
  sama([1, 2, 3, 4].map((i) => nilaiId(hu, `h${i}-t0`)), ["4 keping uang Rp100", "2 keping uang Rp500", "5 keping uang Rp1.000", "7 lembar uang Rp2.000"], "uang Helen di gambar sama dengan soal");
  sama([nilaiId(hu, "sl1-t0"), nilaiId(hu, "sl2-t0")], ["Slamet membeli seharga Rp7.300", "Slamet membayar Rp10.000"], "Slamet: Rp7.300 dan Rp10.000");
  const A1 = T(M, "berlatih-uang", 2);
  const A2 = T(M, "berlatih-uang", 3);
  const A3 = T(M, "berlatih-uang", 4);
  cek(uangOk(A1, "a1", BUKU_7300[0]) && uangOk(A2, "a2", BUKU_7300[1]) && uangOk(A3, "a3", BUKU_7300[2]), "uang Helen 7.300: tiga contoh jawaban Panduan Guru tergambar sama");
  [[A1, "a1e", BUKU_7300[0]], [A2, "a2e", BUKU_7300[1]], [A3, "a3e", BUKU_7300[2]]].forEach(([o, id, u], i) => sama(nilaiId(o, id), `7.300 = ${u.map(rbk).join(" + ")}`, `uang Helen 7.300: persamaan contoh ${i + 1} cocok dengan uang di gambar`));
  const B3 = T(M, "berlatih-uang", 6);
  cek(uangOk(B3, "b1", BUKU_10000[0]) && uangOk(B3, "b2", BUKU_10000[1]) && uangOk(B3, "b3", BUKU_10000[2]), "uang Helen 10.000: tiga contoh jawaban Panduan Guru tergambar sama");
  [["b1e", BUKU_10000[0]], ["b2e", BUKU_10000[1]], ["b3e", BUKU_10000[2]]].forEach(([id, u], i) => sama(nilaiId(B3, id), `10.000 = ${u.map(rbk).join(" + ")}`, `uang Helen 10.000: persamaan contoh ${i + 1} cocok dengan uang di gambar`));
  const cc = T(M, "berlatih-uang", 7);
  sama([nilaiId(cc, "c1-t0"), nilaiId(cc, "c2-t0")], ["tertulis di kunci: 1.0000", "yang benar: 10.000"], "catatan kunci: 1.0000 salah ketik, yang benar 10.000");
  cek(Number("1.0000".replace(/\./g, "")) === 10000 && 10000 === 10 * 1000, "1.0000 dengan titik dibuang tetap 10000 (angka salah ketik titik)");
  // 10. Miskonsepsi dan rangkuman.
  const ms = T(M, "miskonsepsi-diferensiasi", 0);
  sama([nilaiId(ms, "m1-t0"), nilaiId(ms, "m1-t1"), nilaiId(ms, "m2-t0"), nilaiId(ms, "m2-t1")], ["menyusun", "= komposisi", "mengurai", "= dekomposisi"], "miskonsepsi: menyusun = komposisi, mengurai = dekomposisi");
  const rk = T(M, "miskonsepsi-diferensiasi", 5);
  cek(jumlahBagian(nilaiId(rk, "r1-t1").replace(" → ", " = ")) && utuhKiri(nilaiId(rk, "r2-t1").replace(" → ", " = ")) && utuhKiri(nilaiId(rk, "r3-t1").replace(" → ", " = ")), "rangkuman: tiga contoh (6.348, 6.849, 6.035) dihitung ulang");
  const kel = T(M, "miskonsepsi-diferensiasi", 4);
  cek(["kt", "ka0", "ka1", "ka2"].every((id) => objAda(kel, id)) && [0, 1, 2].every((i) => { const g = objAda(kel, `kg${i}`); const a = objAda(kel, `ka${i}`); return g.x + g.x2 === a.x && g.y + g.y2 === a.y; }), "kelompok: tiga garis dari ketua menyambung ke tiga anggota");

  /* ---------------- Metode luar ---------------- */
  const po = T(U, "luar-pembuka", 0);
  sama([nilaiId(po, "po1"), nilaiId(po, "po2")], ["6.348", "6.849"], "luar pembuka: dua bilangan buku 6.348 dan 6.849");
  const p3 = T(U, "luar-pembuka", 2);
  sama([nilaiId(p3, "m2-t0"), nilaiId(p3, "m2-t1"), nilaiId(p3, "m3-t0"), nilaiId(p3, "m3-t1")], ["3. Flexible Grouping", "Pengelompokan Fleksibel", "4. Number Bonds", "Ikatan Bilangan"], "luar pembuka: empat nama metode");
  sama([nilaiId(p3, "n2a"), nilaiId(p3, "n2b")], ["1 ratusan", "= 10 puluhan"], "luar pembuka: 1 ratusan sama dengan 10 puluhan");
  cek(100 === 10 * 10, "1 ratusan = 10 puluhan (100 = 10 kali 10)");
  // Composition.
  const ck = T(U, "luar-komposisi", 2);
  sama([0, 1, 2, 3].map((c) => nilaiId(ck, `ck${c}-t0`)), ["6.000", "300", "40", "8"], "luar Composition: kartu 6.000, 300, 40, 8");
  cek(papanTerisi(ck, "cp") && papanNilai(ck, "cp") === 6348 && [0, 1, 2, 3].every((c) => nilaiId(ck, `ck${c}-t0`) === rbk(pcs(Number(nilaiId(ck, `cp-dt${c}`)), c))), "luar Composition: kartu tiap angka sama dengan angka kali nilai tempat, papan 6.348");
  cek([0, 1, 2, 3].every((c) => objAda(ck, `cg${c}`).x === objAda(ck, `ck${c}-k`).x + objAda(ck, `ck${c}-k`).w / 2 && objAda(ck, `cg${c}`).x === objAda(ck, `cp-d${c}`).x + objAda(ck, `cp-d${c}`).w / 2), "luar Composition: panah tiap kartu tepat di atas kolom papannya");
  sama(nilaiId(T(U, "luar-komposisi", 3), "ch"), "= 6.348", "luar Composition: hasil 6.348");
  const ct1 = T(U, "luar-komposisi-terapan", 0);
  cek(papanTerisi(ct1, "tp") && papanNilai(ct1, "tp") === 6482 && [0, 1, 2, 3].every((c) => nilaiId(ct1, `tc${c}-t0`) === rbk(pcs(Number(nilaiId(ct1, `tp-dt${c}`)), c))), "luar Composition terapan papan satu: kartu 6.000, 400, 80, 2 membentuk 6.482");
  sama(nilaiId(T(U, "luar-komposisi-terapan", 1), "th"), "= 6.482", "luar Composition terapan: hasil 6.482");
  const ct3 = T(U, "luar-komposisi-terapan", 2);
  cek(papanNilai(ct3, "uq") === 6040 && nilaiId(ct3, "uc0-t0") === "6.000" && nilaiId(ct3, "uc2-t0") === "40" && !objAda(ct3, "uc1-k") && !objAda(ct3, "uc3-k") && nilaiId(ct3, "uh") === "= 6.040", "luar Composition terapan papan dua: hanya kartu 6.000 dan 40 (nol tidak diambil), hasil 6.040");
  const ct4 = T(U, "luar-komposisi-terapan", 3);
  cek(papanNilai(ct4, "vp") === 4530 && [0, 1, 2].every((c) => nilaiId(ct4, `vc${c}-t0`) === rbk(pcs(Number(nilaiId(ct4, `vp-dt${c}`)), c))) && !objAda(ct4, "vc3-k") && nilaiId(ct4, "vh") === "= 4.530", "luar Composition terapan contoh guru: kartu 4.000, 500, 30 membentuk 4.530");
  // Decomposition.
  const dd = [0, 1, 2, 3].map((i) => T(U, "luar-dekomposisi", i));
  cek(nilaiId(dd[0], "da") === "6.849" && ["6.000 + 849", "6.000 + 800 + 49", "6.000 + 800 + 40 + 9"].every((s, i) => nilaiId(dd[i + 1], "dk") === s && angkaTeks(s).reduce((p, q) => p + q, 0) === 6849), "luar Decomposition: tiap tahap kupas 6.849 berjumlah 6.849");
  const dt = [0, 1, 2, 3, 4].map((i) => T(U, "luar-dekomposisi-terapan", i));
  const jumlahKanan = (s) => angkaTeks(s).reduce((p, q) => p + q, 0);
  cek(nilaiId(dt[0], "ea") === "6.035" && nilaiId(dt[0], "eb") === "6.000 + 35" && jumlahKanan(nilaiId(dt[0], "eb")) === 6035, "luar Decomposition terapan: 6.035 = 6.000 + 35");
  cek(nilaiId(dt[1], "eb") === "6.000 + 30 + 5" && jumlahKanan(nilaiId(dt[1], "eb")) === 6035, "luar Decomposition terapan: 6.035 = 6.000 + 30 + 5 (nol ratusan dilewati)");
  cek(nilaiId(dt[2], "fa") === "7.020" && nilaiId(dt[2], "fb") === "7.000 + 20" && jumlahKanan(nilaiId(dt[2], "fb")) === 7020, "luar Decomposition terapan: 7.020 = 7.000 + 20");
  cek(utuhKiri(nilaiId(dt[3], "ga")) && angkaTeks(nilaiId(dt[3], "ga"))[0] === 2001 && nilaiId(dt[3], "gb") === "7.000 = 7.000", "luar Decomposition terapan: 2.001 dan 7.000 dihitung ulang");
  cek(utuhKiri(nilaiId(dt[4], "gc")) && angkaTeks(nilaiId(dt[4], "gc"))[0] === 9999, "luar Decomposition terapan: 9.999 = 9.000 + 900 + 90 + 9 dihitung ulang");
  // Flexible Grouping.
  const fg = [0, 1, 2, 3].map((i) => T(U, "luar-kelompok", i));
  const VAL = { satuan: 1, puluhan: 10, ratusan: 100, ribuan: 1000 };
  const nilaiKartu = (t) => {
    const m = t.match(/^(\d+) (satuan|puluhan|ratusan|ribuan)$/);
    return Number(m[1]) * VAL[m[2]];
  };
  cek(fg[0].filter((o) => /^fd\d$/.test(o.id)).length === 10 && nilaiId(fg[0], "fl") === "10 satuan" && nilaiKartu("10 satuan") === nilaiKartu(nilaiId(fg[0], "fk1-t0")), "luar Flexible Grouping: 10 titik satuan = 1 puluhan (10 = 10)");
  cek(nilaiKartu(nilaiId(fg[0], "fk2-t0")) === nilaiKartu(nilaiId(fg[0], "fk3-t0")), "luar Flexible Grouping: 10 puluhan = 1 ratusan (100 = 100)");
  cek(nilaiKartu(nilaiId(fg[1], "fk4-t0")) === nilaiKartu(nilaiId(fg[1], "fk5-t0")), "luar Flexible Grouping: 10 ratusan = 1 ribuan (1.000 = 1.000)");
  const kel3 = (t) => {
    const m = t.match(/^7\.300 = (\d+) ribuan \+ (\d+) ratusan$/);
    return m ? Number(m[1]) * 1000 + Number(m[2]) * 100 : NaN;
  };
  cek(kel3(nilaiId(fg[2], "ga-t0")) === 7300 && kel3(nilaiId(fg[2], "gb-t0")) === 7300 && nilaiId(fg[2], "ga-t0").includes("7 ribuan + 3 ratusan") && nilaiId(fg[2], "gb-t0").includes("6 ribuan + 13 ratusan"), "luar Flexible Grouping: 7.300 = 7 ribuan + 3 ratusan = 6 ribuan + 13 ratusan dihitung ulang");
  cek(nilaiId(fg[3], "gd-t0") === "7.300 = 73 ratusan" && 73 * 100 === 7300 && nilaiId(fg[3], "ge") === "73 × 100 = 7.300", "luar Flexible Grouping: 73 ratusan = 7.300");
  const ft = [0, 1, 2, 3].map((i) => T(U, "luar-kelompok-terapan", i));
  /** Banyak tiap nominal pada daftar uang. */
  const hitungNominal = (u) => u.reduce((m, v) => ({ ...m, [v]: (m[v] ?? 0) + 1 }), {});
  const tukarSatu = (a, b, dari, ke) => {
    const ma = hitungNominal(a);
    const mb = hitungNominal(b);
    const m = { ...ma };
    m[dari] = (m[dari] ?? 0) - 1;
    for (const v of ke) m[v] = (m[v] ?? 0) + 1;
    const semua = new Set([...Object.keys(m), ...Object.keys(mb)]);
    return [...semua].every((n) => (m[n] ?? 0) === (mb[n] ?? 0));
  };
  cek(uangOk(ft[0], "g1", BUKU_7300[0]) && nilaiId(ft[0], "hl") === "Rp7.300", "luar Flexible Grouping uang: 7.300 awal sama dengan contoh 1 buku");
  cek(uangOk(ft[1], "g2", BUKU_7300[1]) && tukarSatu(BUKU_7300[0], BUKU_7300[1], 2000, [1000, 1000]), "luar Flexible Grouping uang: tukar satu 2.000 dengan dua 1.000 menghasilkan contoh 2 buku");
  cek(uangOk(ft[2], "g3", BUKU_7300[2]) && tukarSatu(BUKU_7300[1], BUKU_7300[2], 2000, [1000, 1000]) && !objAda(ft[2], "g2-k0"), "luar Flexible Grouping uang: tukar lagi menghasilkan contoh 3 buku (lima 1.000, semua milik Helen)");
  cek(uangOk(ft[3], "h2", BUKU_10000[2]) && tukarSatu(BUKU_10000[0], BUKU_10000[2], 2000, [1000, 500, 500]) && !objAda(ft[3], "h1-k0") && nilaiId(ft[3], "hm") === "Rp10.000", "luar Flexible Grouping uang: 5 x 2.000 tukar satu 2.000 dengan 1.000 + 500 + 500 menghasilkan contoh 3 buku");
  cek(2000 === 1000 + 1000 && 2000 === 1000 + 500 + 500, "tukar 2.000 = 1.000 + 1.000 = 1.000 + 500 + 500 (hitungan mandiri)");
  // Number Bonds.
  const ik = T(U, "luar-ikatan", 0);
  const pusat = (objs, id) => [objAda(objs, id).x, objAda(objs, id).y];
  const tersambung = (objs, id) => {
    const gl = objAda(objs, `${id}-gl`);
    const gr = objAda(objs, `${id}-gr`);
    const [ux, uy] = pusat(objs, `${id}-u`);
    const [lx, ly] = pusat(objs, `${id}-l`);
    const [rx, ry] = pusat(objs, `${id}-r`);
    return gl.x === ux && gl.y === uy && gl.x + gl.x2 === lx && gl.y + gl.y2 === ly && gr.x === ux && gr.y === uy && gr.x + gr.x2 === rx && gr.y + gr.y2 === ry;
  };
  cek(tersambung(ik, "ik") && nilaiId(ik, "ik-ut") === "utuh" && nilaiId(ik, "ik-lt") === "bagian" && nilaiId(ik, "ik-rt") === "bagian", "luar Number Bonds: bulat utuh tersambung garis ke dua bagian");
  const ib = T(U, "luar-ikatan", 2);
  cek(tersambung(ib, "ib") && nilaiId(ib, "ib-ut") === "6.849" && nilaiId(ib, "ib-lt") === "6.000" && nilaiId(ib, "ib-rt") === "?", "luar Number Bonds: 6.849 terikat 6.000 dan satu bagian belum diketahui");
  const ib4 = T(U, "luar-ikatan", 3);
  cek(nilaiId(ib4, "ib-rt") === "849" && 6000 + 849 === 6849 && nilaiId(ib4, "ie") === "6.000 + 849 = 6.849", "luar Number Bonds: bagian hilang 849 (6.000 + 849 = 6.849)");
  const ip = T(U, "luar-ikatan-terapan", 0);
  cek(tersambung(ip, "ip") && nilaiId(ip, "ip-ut") === "10.000" && nilaiId(ip, "ip-lt") === "7.300" && nilaiId(ip, "ip-rt") === "?", "luar Number Bonds uang: 10.000 terikat 7.300 dan bagian belum diketahui");
  const ip2 = T(U, "luar-ikatan-terapan", 1);
  cek(nilaiId(ip2, "ip-rt") === "2.700" && 7300 + 2700 === 10000 && nilaiId(ip2, "ie") === "7.300 + 2.700 = 10.000", "luar Number Bonds uang: bagian hilang 2.700 (7.300 + 2.700 = 10.000)");
  const is = T(U, "luar-ikatan-terapan", 3);
  cek(tersambung(is, "is") && nilaiId(is, "is-ut") === "6.035" && nilaiId(is, "is-lt") === "6.000" && nilaiId(is, "is-rt") === "35" && 6000 + 35 === 6035, "luar Number Bonds bertingkat: 6.035 terikat 6.000 dan 35");
  const jarak = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const [rx, ry] = pusat(is, "is-r");
  const sg1 = objAda(is, "sg1");
  const sg2 = objAda(is, "sg2");
  cek(sg1.x === rx && sg1.y === ry + objAda(is, "is-r").r && sg2.x === rx && sg2.y === sg1.y, "luar Number Bonds bertingkat: garis anak mulai dari dasar bulat 35");
  cek(jarak([sg1.x + sg1.x2, sg1.y + sg1.y2], pusat(is, "sc1")) <= objAda(is, "sc1").r && jarak([sg2.x + sg2.x2, sg2.y + sg2.y2], pusat(is, "sc2")) <= objAda(is, "sc2").r, "luar Number Bonds bertingkat: ujung garis anak masuk ke bulat 30 dan 5");
  cek(nilaiId(is, "st1") === "30" && nilaiId(is, "st2") === "5" && 30 + 5 === 35, "luar Number Bonds bertingkat: 35 terikat 30 dan 5");
  cek(nilaiId(is, "ie1") === "30 + 5 = 35" && nilaiId(is, "ie2") === "6.000 + 35 = 6.035", "luar Number Bonds bertingkat: periksa 30 + 5 = 35 dan 6.000 + 35 = 6.035");
  // Ringkasan.
  const rr = T(U, "luar-ringkas", 3);
  cek(utuhKiri(nilaiId(rr, "r0-t1").split(" → ").reverse().join(" = ")) && utuhKiri(nilaiId(rr, "r1-t1").replace(" → ", " = ")), "luar ringkasan: 6.348 dan 6.849 dihitung ulang");
  cek(nilaiId(rr, "r2-t1") === "10 puluhan = 1 ratusan; 7.300 = 73 ratusan" && nilaiId(rr, "r3-t1") === "7.300 + 2.700 = 10.000", "luar ringkasan: baris Flexible Grouping dan Number Bonds");
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
  // Kelas IV: Buku Siswa hlm. N = PDF N+12 (sub-bab D: hlm. 24 di PDF 36 sampai awal hlm. 28 di PDF 40); Panduan Guru hlm. N = PDF N+12 (hlm. 45 di PDF 57 sampai awal hlm. 49 di PDF 61).
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 36, 40), ambil(bg, 57, 61), ambil(bs, 36, 39), ambil(bg, 57, 60), ambil(bs, 40, 40), ambil(bg, 61, 61)] : [null];
  if (bagian.some((b) => b === null)) console.log("PDF atau pembaca PDF tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersihT = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const JUDUL_D = "d. komposisi dan dekomposisi bilangan cacah sampai 10.000";
    const JUDUL_E = "e. penjumlahan bilangan cacah sampai 1.000";
    const potong = (t) => {
      const b = bersihT(t);
      const a = b.indexOf(JUDUL_D);
      const z = b.indexOf(JUDUL_E);
      return a >= 0 && z > a ? b.slice(a, z) : null;
    };
    const siswa = potong(bagian[0]);
    const guru = potong(bagian[1]);
    cek(siswa !== null && guru !== null, "judul sub-bab D dan E ditemukan di Buku Siswa PDF 36-40 dan Panduan Guru PDF 57-61");
    const buku = `${siswa}\n${guru}`;
    cek(!bersihT(bagian[2]).includes(JUDUL_E) && !bersihT(bagian[3]).includes(JUDUL_E), "sub-bab E belum mulai di Buku Siswa PDF 36-39 dan Panduan Guru PDF 57-60");
    cek(bersihT(bagian[4]).includes(JUDUL_E) && bersihT(bagian[5]).includes(JUDUL_E), "sub-bab E mulai di Buku Siswa PDF 40 dan Panduan Guru PDF 61 (akhir sub-bab D ada di halaman itu)");
    cek(bersihT(bagian[2]).includes(JUDUL_D) && bersihT(bagian[3]).includes(JUDUL_D) && !bersihT(ambil(bs, 35, 35)).includes(JUDUL_D) && !bersihT(ambil(bg, 56, 56)).includes(JUDUL_D), "sub-bab D mulai di Buku Siswa PDF 36 dan Panduan Guru PDF 57");
    // Nomor halaman cetak sama dengan PDF dikurangi 12.
    const halaman = (berkas, pdf, cetak) => new RegExp(`(^|\\n)\\s*${cetak}(\\s|$)`).test(ambil(berkas, pdf, pdf));
    for (let pdf = 36; pdf <= 40; pdf += 1) cek(halaman(bs, pdf, pdf - 12), `Buku Siswa PDF ${pdf} bernomor halaman ${pdf - 12}`);
    for (let pdf = 57; pdf <= 61; pdf += 1) cek(halaman(bg, pdf, pdf - 12), `Panduan Guru PDF ${pdf} bernomor halaman ${pdf - 12}`);
    let n = 0;
    for (const a of M.adegan) {
      for (const kt of a.kutipan ?? []) {
        n += 1;
        cek(buku.includes(bersihT(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
      }
    }
    stat.kutipan = n;
    cek(n >= 70, `jumlah kutipan buku yang diperiksa (${n})`);
    cek(M.adegan.every((a) => (a.kutipan ?? []).length >= 3), "tiap adegan materi memuat paling sedikit 3 kutipan buku");
    // Soal dan kunci yang dipakai gambar, dibaca ulang dari teks PDF.
    cek(siswa.includes("4 keping uang rp 100, 2 keping uang rp. 500, 5 keping uang rp 1.000, dan 7 lembar uang rp 2.000"), "Buku Siswa: uang Helen 4 x 100, 2 x 500, 5 x 1.000, 7 x 2.000");
    cek(/4 keping uang rp100,-, 2 keping uang rp500,-, 5 keping uang rp1\.000,-, dan 7 lembar uang rp2\.000,-/.test(guru), "Panduan Guru: uang Helen sama dengan Buku Siswa");
    cek(guru.includes("seharga rp7.300,-") && guru.includes("pecahan uang rp10.000,-"), "Panduan Guru: Slamet membeli Rp7.300 dan membayar Rp10.000");
    for (const s of [
      "7.300 = 2.000 + 2.000 + 2.000 + 1.000 + 100 + 100 + 100",
      "7.300 = 2.000 + 2.000 + 1.000 + 1.000 + 1.000 + 100 + 100 + 100",
      "= 2.000 + 1.000 + 1.000 + 1.000 + 1.000 + 1.000 + 100 + 100 + 100",
      "1.0000 = 2.000 + 2.000 + 2.000 + 2.000 + 2.000",
      "1.0000 = 2.000 + 2.000 + 2.000 + 1.000 + 1.000 + 1.000 + 1.000",
      "1.0000 = 2.000 + 2.000 + 2.000 + 2.000 + 1.000 + 500 + 500",
    ]) cek(guru.includes(s), `Panduan Guru hlm. 48: contoh jawaban "${s}"`);
    cek((guru.match(/1\.0000 =/g) ?? []).length === 3 && !/(^|[^.\d])10\.000 = 2\.000/.test(guru), "Panduan Guru: tiga contoh 10.000 ditulis 1.0000 (salah ketik titik), bukan 10.000");
    // Kunci Panduan Guru hlm. 46-47: angka kunci papan dan nomor 1.
    cek(/6 ribuan \+ 4 ratusan \+ 8 puluhan \+ 2 satuan = 6\.482/.test(guru) && /6 ribuan \+ 0 ratusan \+ 4 puluhan \+ 0 satuan = 6\.040/.test(guru) && /4 ribuan \+ 5 ratusan \+ 3 puluhan \+ 0 satuan = 4\.530/.test(guru), "Panduan Guru: kunci papan 6.482, 6.040, contoh 4.530");
    cek(/7\.020 = 7 ribuan \+ 0 ratusan \+ 2 puluhan \+ 0 satuan/.test(guru) && /2\.001 = 2 ribuan \+ 0 ratusan \+ 0 puluhan \+ 1 satuan/.test(guru) && /7\.000 = 7 ribuan \+ 0 ratusan \+ 0 puluhan \+ 0 satuan/.test(guru) && /9\.999 = 9 ribuan \+ 9 ratusan \+ 9 puluhan \+ 9 satuan/.test(guru), "Panduan Guru: kunci nomor 1 7.020, 2.001, 7.000, 9.999");
    // Buku Siswa: 6.035 dengan 000, dan papan ketiga kosong, nomor 1 tanpa kunci.
    cek(siswa.includes("6.035 = 6 ribuan + 0 ratusan + 3 puluhan + 5 satuan") && siswa.includes("= 6.000 + 000 + 30 + 5"), "Buku Siswa hlm. 27: 6.035 = 6.000 + 000 + 30 + 5 (memakai 000)");
    cek(siswa.includes("6.849 = 6.000 + 800+ 40 + 9"), "Buku Siswa hlm. 26: 6.849 = 6.000 + 800 + 40 + 9");
    cek(/ditulis 000 .*ditulis 00, .*ditulis 0/.test(guru) && /ratusan sama dengan 0 dekomposisinya ditulis 000/.test(guru) && /puluhan sama dengan 0 dekomposisinya ditulis 00,/.test(guru) && /satuan sama dengan 0 dekomposisinya ditulis 0/.test(guru), "Panduan Guru hlm. 45: nol ratusan ditulis 000, nol puluhan 00, nol satuan 0");
    cek(!/kunci/.test(siswa), "Buku Siswa hlm. 24-28: tanpa kunci jawaban (hitungan mandiri)");
    cek(/papan flanel/.test(guru) && /nilai tempat merupakan satu-satunya cara yang tepat/.test(guru), "Panduan Guru hlm. 45: apersepsi nilai tempat dan papan flanel");
    cek(/diskusi dan tanya jawab/.test(guru) && /miskonsepsi materi komposisi dan dekomposisi/.test(guru), "Panduan Guru hlm. 48: miskonsepsi dan metode diskusi dan tanya jawab");
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k4b1d-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k4b1d-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k4b1d sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k4b1d.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_D41|video-k4b2-umum|video-k4b1-umum|naskah-k4b1/.test(pembungkus) && /VIDEO_MATERI_K4B1D/.test(pembungkus) && /VIDEO_LUAR_K4B1D/.test(pembungkus) && /export function VideoK4B1D/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k4b1d.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k4b1d.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k4b1d.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k4b1d.mjs: akhir baris LF");
}

for (const v of [M, U]) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.kutipan} kutipan terhadap teks PDF, ${stat.terbilang} bilangan berkata, ${stat.persamaan} persamaan, ${stat.teksPasang} pasangan teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
