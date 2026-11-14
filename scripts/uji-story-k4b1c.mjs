// Uji Story Kelas 4 Bab 1 Sub-Bab C (Membandingkan dan Mengurutkan Bilangan Cacah sampai 10.000): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar (bilangan yang diucapkan dengan kata tampak sebagai angka), perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, tidak membocorkan sub-bab lain, kutipan buku terhadap teks PDF (pdftotext, atau PyMuPDF bila tidak ada),
// tabel nilai tempat, deret angka, kartu dan papan spon, batang bertingkat, garis bilangan, dan simulasi pengurutan himpunan dihitung ulang dari gambar, semua pernyataan lebih dari, kurang dari, dan sama dengan pada gambar benar,
// hitungan mandiri kunci Panduan Guru (termasuk terbesar dan terkecil Ayo Berpikir), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k4b1c.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b1c-video.ts");

const stat = { kutipan: 0, terbilang: 0, teksPasang: 0, persamaan: 0, data: 0, rantai: 0 };
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
const VIDEO = [V.VIDEO_MATERI_K4B1C, V.VIDEO_LUAR_K4B1C];
const M_VIDEO = V.VIDEO_MATERI_K4B1C;
// Pembuka administratif (tujuan, peta konsep, panduan awal; di I: rubrik, refleksi, interaksi orang tua) tidak lagi diputar di video materi.
// Adegannya tetap ada di berkas materi, jadi pemeriksaan isi memakai daftar penuh; hanya jumlah dan urutan adegan diuji terhadap video yang diputar.
const MODUL_MATERI = Object.assign({}, await import("../src/components/modul/story/k4b1c-materi-1.ts"), await import("../src/components/modul/story/k4b1c-materi-2.ts"), await import("../src/components/modul/story/k4b1c-materi-3.ts"));
const M = { ...M_VIDEO, adegan: [MODUL_MATERI.ADEGAN_PEMBUKA, MODUL_MATERI.ADEGAN_PASAR, MODUL_MATERI.ADEGAN_KARTU, MODUL_MATERI.ADEGAN_PAPAN, MODUL_MATERI.ADEGAN_RIBUAN, MODUL_MATERI.ADEGAN_LANJUT, MODUL_MATERI.ADEGAN_SAMA, MODUL_MATERI.ADEGAN_LATIH_SATU, MODUL_MATERI.ADEGAN_LATIH_DUA, MODUL_MATERI.ADEGAN_GUNUNG, MODUL_MATERI.ADEGAN_URUT, MODUL_MATERI.ADEGAN_BERPIKIR, MODUL_MATERI.ADEGAN_CATATAN] };
const U = V.VIDEO_LUAR_K4B1C;
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

/* ------------------------------ Pemisahan materi dan metode luar ------------------------------ */
const G = await import("../src/components/modul/story/k4b1c-gambar.ts");
const U1 = await import("../src/components/modul/story/k4b1c-luar-1.ts");
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const nilaiId = (objs, id) => objs.find((o) => o.id === id)?.isi;
const T = (v, id, ke) => akhirAdegan(adegan(v, id), ke);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  const METODE = ["Compare Leftmost", "Number Line Order", "Ordering Sets", "Bar Model Compare"];
  const NAMA_ID = ["Banding dari Kiri", "Urutan Garis Bilangan", "Mengurutkan Himpunan", "Banding Batang"];
  cek(!/Compare Leftmost|Number Line Order|Ordering Sets|Bar Model Compare|Banding dari Kiri|Urutan Garis Bilangan|Mengurutkan Himpunan|Banding Batang|metode luar|metode dari luar|Van de Walle/i.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of [...METODE, ...NAMA_ID]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE, METODE, "nama metode di berkas luar-1");
  sama(U1.NAMA_METODE_ID, NAMA_ID, "nama Indonesia metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber)), "video materi: tiap adegan berlabel pelajaran netral (Materi: ...)");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  cek(U.adegan.every((a) => a.sumber.length <= 46), "video metode luar: label sumber cukup pendek untuk kanvas 300 lebar");
  cek(M_VIDEO.adegan.every((a) => a.sumber.length <= 46), "video materi: label sumber cukup pendek untuk kanvas 300 lebar");
  // Video bergaya guru: suara, teks terlihat, label, judul adegan, dan subjudul video yang diputar tidak menyebut sumber buku.
  const TERLARANG = /buku|panduan guru|hlm|halaman|kunci|rubrik|salah ketik|salah cetak|tambahan video|contoh video|temuan/i;
  for (const v of [M_VIDEO, U]) {
    cek(!TERLARANG.test(`${v.judul} ${v.subjudul}`), `${v.id}: judul dan subjudul video tanpa kata sumber buku`);
    for (const a of v.adegan) {
      const ada = TERLARANG.exec(`${a.judul} ${a.sumber} ${teksAdegan(a)}`);
      cek(!ada, `${v.id}/${a.id}: suara, teks terlihat, sumber, dan judul tanpa kata sumber buku (${ada?.[0]})`);
    }
  }
  for (const kata of ["Peta konsep", "Kata kunci", "Apersepsi", "Ayo Berlatih", "Ayo Berpikir", "Miskonsepsi", "Diferensiasi", "Refleksi", "Subbab", "Tujuan pembelajaran", "Panduan guru", "Aktivitas"]) cek(!luar.includes(kata), `video metode luar tidak memuat "${kata}" milik materi`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-kiri", "luar-kiri-terapan", "luar-garis", "luar-garis-terapan", "luar-himpunan", "luar-himpunan-terapan", "luar-batang", "luar-batang-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[0].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  cek(M_VIDEO.adegan.length === 12 && U.adegan.length === 10, "12 adegan materi dan 10 adegan metode luar");
  // Sub-Bab C tidak membocorkan sub-bab lain (komposisi, penjumlahan, pengurangan, perkalian, pembagian, faktor) dan penutup bab.
  const BOCOR = /komposisi|dekomposisi|penjumlahan|pengurangan|perkalian|pembagian|faktor|kelipatan|pembulatan|uji kompetensi|refleksi|pengayaan|remedial/i;
  for (const a of M.adegan) cek(!BOCOR.test(teksAdegan(a)), `materi ${a.id} tidak membocorkan sub-bab lain`);
  for (const a of U.adegan) cek(!BOCOR.test(teksAdegan(a)), `metode luar ${a.id} tidak membocorkan sub-bab lain`);
  cek(totalKetukan >= 90, `total ketukan cukup dalam (${totalKetukan})`);
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "pasar,kartu,papan,ribuan,lanjut,sama,latih-satu,latih-dua,gunung,urut,berpikir,catatan", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "luar-pembuka,luar-kiri,luar-kiri-terapan,luar-garis,luar-garis-terapan,luar-himpunan,luar-himpunan-terapan,luar-batang,luar-batang-terapan,luar-ringkas", "urutan adegan metode luar");
  // Nama metode baru belum dipakai metode, judul, atau lab lain pada bab ini; tiga nama lama sama dengan naskah bab.
  const baca = (n) => readFileSync(new URL(`../src/components/modul/${n}`, import.meta.url), "utf8");
  for (const n of ["naskah-k4b1.ts", "data-k4b1.ts", "lab-kemasan-k4b1a.ts", "lab-nilai-k4b1b.ts", "lab-banding-k4b1c.ts", "lab-susun-k4b1d.ts", "lab-jumlah-k4b1e.ts", "lab-kurang-k4b1f.ts", "lab-kali-k4b1g.ts", "lab-bagi-k4b1h.ts", "lab-faktor-k4b1i.ts"]) {
    const s = baca(n);
    cek(!/Bar Model Compare|Banding Batang/.test(s), `nama metode baru tidak bentrok dengan ${n}`);
  }
  const naskah = baca("naskah-k4b1.ts");
  cek(/Compare Leftmost/.test(naskah) && /Number Line Order/.test(naskah) && /Ordering Sets/.test(naskah), "tiga nama metode lama sama dengan nama di naskah bab");
  cek(/Banding dari Kiri/.test(naskah) && /Urutan Garis Bilangan/.test(naskah) && /Mengurutkan Himpunan/.test(naskah), "tiga nama Indonesia metode lama sama dengan naskah bab");
}

/* ------------------------------ Bantuan membaca gambar ------------------------------ */
const bil = (s) => Number(String(s).replace(/\./g, ""));
const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const ada = (objs, id) => objs.some((o) => o.id === id);
const obj = (objs, id) => objs.find((o) => o.id === id);
const teksLepas = (objs) => objs.filter((o) => o.t === "teks" && o.isi).map((o) => o.isi);
/** Bilangan empat angka dari teks `${id}-t0..3` (tabel nilai tempat atau deret angka); null bila ada yang belum berisi angka. */
const bacaDigit = (objs, id) => {
  const d = [0, 1, 2, 3].map((c) => nilaiId(objs, `${id}-t${c}`));
  return d.every((x) => /^\d$/.test(x ?? "")) ? Number(d.join("")) : null;
};
const benar = (a, op, b) => (op === ">" ? a > b : op === "<" ? a < b : a === b);

{
  // Data buku (dibaca dari gambar dan teks PDF) ditulis ulang di sini sebagai pembanding mandiri.
  sama(G.HARGA, { manggis: 7500, apel: 6750, kiosA: 7500, kiosB: 8750 }, "harga di pasar (BS hlm. 16)");
  sama(G.LATIHAN_SATU.map((l) => [l.a, l.b, l.besar]), [[5734, 4312, 5734], [5614, 5368, 5614], [7124, 7197, 7197]], "Ayo Berlatih 1 dan kunci");
  sama(G.LATIHAN_DUA.map((l) => [l.a, l.tanda, l.b]), [[4435, ">", 3345], [9999, ">", 9998], [1001, "<", 1002], [8765, "=", 8765], [4567, "<", 5787], [7654, "<", 7777]], "Ayo Berlatih 2 dan kunci");
  sama(G.GUNUNG.map((g) => [g.nama, g.m]), [["Sinabung", 2460], ["Semeru", 3676], ["Rinjani", 3726]], "tinggi gunung (peta BS hlm. 21)");
  sama([...G.URUT_SOAL], [7570, 5240, 3041, 9941], "soal urutkan");
  sama([...G.URUT_KUNCI], [3041, 5240, 7570, 9941], "kunci urutkan");
  sama(G.fmt(8750), "8.750", "fmt gambar");
  // Kunci Panduan Guru dihitung mandiri.
  for (const l of G.LATIHAN_SATU) {
    cek(l.besar === Math.max(l.a, l.b), `kunci Berlatih 1: ${l.a} dan ${l.b}, yang lebih besar ${l.besar}`);
    stat.data += 1;
  }
  for (const l of G.LATIHAN_DUA) {
    cek(benar(l.a, l.tanda, l.b), `kunci Berlatih 2: ${l.a} ${l.tanda} ${l.b} benar`);
    stat.data += 1;
  }
  sama([...G.URUT_SOAL].sort((a, b) => a - b), [...G.URUT_KUNCI], "kunci urutan = soal diurutkan naik (3.041, 5.240, 7.570, 9.941)");
  sama(G.GUNUNG.map((g) => g.m), [...G.GUNUNG.map((g) => g.m)].sort((a, b) => a - b), "peta: Sinabung, Semeru, Rinjani sudah naik");
  // Ayo Berpikir: empat angka 1, 5, 9, 2.
  const ANGKA = [1, 5, 9, 2];
  const permut = (arr) => (arr.length <= 1 ? [arr] : arr.flatMap((x, i) => permut([...arr.slice(0, i), ...arr.slice(i + 1)]).map((p) => [x, ...p])));
  const semua = permut(ANGKA).map((p) => Number(p.join("")));
  cek(semua.length === 24 && new Set(semua).size === 24, "empat angka berbeda punya 24 susunan");
  sama([Math.max(...semua), Math.min(...semua)], [9521, 1259], "terbesar dan terkecil sebenarnya tanpa pengulangan: 9.521 dan 1.259");
  sama([...G.ANGKA_BERPIKIR], ANGKA, "empat angka Ayo Berpikir");
  sama([...G.CONTOH_A], [1592, 2951, 5921, 9215, 5129], "contoh jawaban a (kunci)");
  cek(G.CONTOH_A.every((n) => semua.includes(n)), "tiap contoh a memakai tepat angka 1, 5, 9, 2 sekali");
  sama([Math.max(...G.CONTOH_A), Math.min(...G.CONTOH_A)], [9215, 1592], "kunci b benar untuk contoh a (9.215 dan 1.592), bukan untuk semua susunan");
  cek(Math.max(...G.CONTOH_A) !== Math.max(...semua), "kunci b bukan terbesar sebenarnya (catatan guru)");
  sama([...G.CONTOH_A].sort((a, b) => a - b), [1592, 2951, 5129, 5921, 9215], "kunci c: contoh a diurutkan naik");
  sama([...G.CONTOH_D], [1155, 9925, 5119, 2222, 9225], "contoh jawaban d (kunci)");
  cek(G.CONTOH_D.every((n) => String(n).split("").every((d) => ANGKA.includes(Number(d)))), "contoh d memakai hanya angka 1, 5, 9, 2 (boleh berulang)");
  sama([Math.max(...G.CONTOH_D), Math.min(...G.CONTOH_D)], [9925, 1155], "kunci e benar untuk contoh d (9.925 dan 1.155)");
  sama([9999, 1111], [Number("9".repeat(4)), Number("1".repeat(4))], "bila boleh berulang: terbesar 9.999, terkecil 1.111 (hitungan mandiri)");
  cek(9999 > Math.max(...semua) && 9999 > Math.max(...G.CONTOH_D), "kunci f: 9.999 lebih besar dari susunan tanpa pengulangan");
  // Miskonsepsi tambahan video: 1.987 dan 2.045 (satuan 7 lebih dari 5 padahal ribuan 1 kurang dari 2).
  cek(1987 < 2045 && 7 > 5 && 1 < 2, "contoh miskonsepsi: 1.987 kurang dari 2.045 walau satuan 7 lebih dari 5");
  stat.data += 1;
}

/* ------------------------------ Semua pernyataan perbandingan pada gambar benar ------------------------------ */
for (const v of [M, U]) {
  for (const a of v.adegan) {
    a.ketukan.forEach((_, i) => {
      for (let p = 0; p < L.kataDari(a.ketukan[i].suara).length; p += 1) {
        for (const t of teksLepas(L.keadaanStory(a, i, p))) {
          for (const rantai of t.match(/\d[\d.]*(?: [<>=] \d[\d.]*)+/g) ?? []) {
            const bagian = rantai.split(" ");
            for (let q = 0; q + 2 < bagian.length + 0; q += 2) {
              stat.persamaan += 1;
              cek(benar(bil(bagian[q]), bagian[q + 1], bil(bagian[q + 2])), `${v.id}/${a.id}#${i + 1}: pernyataan "${bagian[q]} ${bagian[q + 1]} ${bagian[q + 2]}" pada "${t}" benar`);
            }
          }
        }
      }
    });
  }
}
/* Tabel nilai tempat: angka per kolom sama dengan bilangan di atasnya. */
for (const v of [M, U]) {
  for (const a of v.adegan) {
    a.ketukan.forEach((_, i) => {
      const objs = L.keadaanStory(a, i, 9999);
      for (const o of objs) {
        const m = o.id.match(/^(.+)-j$/);
        if (!m) continue;
        const nilai = bacaDigit(objs, m[1]);
        stat.tabel = (stat.tabel ?? 0) + 1;
        if (nilai !== null) cek(nilai === bil(o.isi), `${v.id}/${a.id}#${i + 1}: tabel ${m[1]}: angka ${nilai} sama dengan bilangan ${o.isi}`);
        else cek([0, 1, 2, 3].every((c) => /^(\d|\.\.\.)$/.test(nilaiId(objs, `${m[1]}-t${c}`) ?? "")), `${v.id}/${a.id}#${i + 1}: tabel ${m[1]}: sel kosong berupa titik-titik`);
        cek(["Ribuan", "Ratusan", "Puluhan", "Satuan"].every((n, c) => nilaiId(objs, `${m[1]}-nt${c}`) === n), `${v.id}/${a.id}#${i + 1}: tabel ${m[1]}: kepala kolom ribuan, ratusan, puluhan, satuan`);
      }
    });
  }
}

/* ------------------------------ Gambar dihitung ulang, adegan demi adegan ------------------------------ */
{
  const warnaSel = (objs, id, c) => obj(objs, `${id}-d${c}`).warna;
  const PUTIH = "#FFFFFF";
  const ARSIR = "#FFCD4D";
  const sorot = (objs, id) => [0, 1, 2, 3].filter((c) => warnaSel(objs, id, c) === ARSIR);

  /* ----- Pembuka ----- */
  {
    const p = T(M, "pembuka", 3);
    sama([nilaiId(p, "ta-j"), nilaiId(p, "tb-j")], ["8.750", "7.500"], "pembuka: dua tabel serupa 8.750 dan 7.500");
    const k1 = T(M, "pembuka", 0);
    cek(nilaiId(k1, "bs-t0") === "Buku Siswa hlm. 16" && nilaiId(k1, "bg-t0") === "Panduan Guru hlm. 40", "pembuka: halaman Buku Siswa 16 dan Panduan Guru 40 (BS PDF 28, BG PDF 52)");
    const k3 = T(M, "pembuka", 2);
    cek(nilaiId(k3, "a6-t1") === "80 cm × 20 cm", "pembuka: papan spon 80 cm kali 20 cm");
  }
  /* ----- Pasar ----- */
  {
    const a = T(M, "pasar", 1);
    sama([nilaiId(a, "hm-t1"), nilaiId(a, "ha-t1")], [`Rp${fmt(G.HARGA.manggis)}`, `Rp${fmt(G.HARGA.apel)}`], "pasar: harga manggis dan apel");
    sama([nilaiId(a, "hm-t0"), nilaiId(a, "ha-t0")], ["manggis ½ kg", "apel ¼ kg"], "pasar: setengah kilogram manggis, seperempat kilogram apel");
    const b = T(M, "pasar", 2);
    sama([nilaiId(b, "ka-t2"), nilaiId(b, "kb-t2")], [`Rp${fmt(G.HARGA.kiosA)}`, `Rp${fmt(G.HARGA.kiosB)}`], "pasar: kios A dan B");
    sama([nilaiId(T(M, "pasar", 3), "pc-t0"), nilaiId(T(M, "pasar", 3), "pc-t1")], ["Apakah 8.750", "lebih dari 7.500?"], "pasar: percakapan buku");
  }
  /* ----- Kartu bilangan ----- */
  {
    const a = T(M, "kartu", 3);
    const paket = (pre) => Array.from({ length: 10 }, (_, i) => nilaiId(a, `${pre}${i}-t`));
    sama(paket("pa"), ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], "kartu: paket 1 berisi angka 0 sampai 9");
    sama(paket("pb"), ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], "kartu: paket 2 berisi angka 0 sampai 9");
    const luas = Array.from({ length: 10 }, (_, i) => obj(a, `pa${i}-k`)).every((o) => o.w === obj(a, "pa0-k").w && o.h === obj(a, "pa0-k").h);
    cek(luas && Array.from({ length: 10 }, (_, i) => obj(a, `pa${i}-k`).x).every((x, i, arr) => i === 0 || x > arr[i - 1]), "kartu: sepuluh kartu sama ukuran, berurutan dari kiri");
    const c = T(M, "kartu", 2);
    sama([nilaiId(c, "kbs-t1"), nilaiId(c, "kbg-t1")], ["10 kartu", "20 kartu"], "kartu: satu paket 10 kartu, dua paket 20 kartu");
    cek(2 * 10 === 20, "dua paket kartu 0 sampai 9 butuh 20 kartu");
  }
  /* ----- Papan spon ----- */
  {
    const PX = 20;
    const PW = 260;
    const a = T(M, "papan", 0);
    const b = obj(a, "pp-b");
    cek(Math.abs(b.w / b.h - 4) < 0.01, "papan: perbandingan 80 cm kali 20 cm = 4 banding 1");
    cek(Array.from({ length: 8 }, (_, i) => ada(a, `pp-p${i}`)).every(Boolean) && !ada(a, "pp-p8"), "papan: tepat delapan paku");
    const paku = Array.from({ length: 8 }, (_, i) => obj(a, `pp-p${i}`).x);
    const garisPisah = obj(a, "pp-g").x;
    cek(paku.slice(0, 4).every((x) => x > b.x && x < garisPisah) && paku.slice(4).every((x) => x > garisPisah && x < b.x + b.w), "papan: empat paku di bagian kiri dan empat di kanan");
    cek(Math.abs(garisPisah - (b.x + b.w / 2)) < 1e-6, "papan: pemisah tepat di tengah");
    const c = T(M, "papan", 1);
    const angkaKartu = (pre) => [0, 1, 2, 3].map((i) => nilaiId(c, `${pre}${i}-t`));
    sama(angkaKartu("pl").join(""), "8750", "papan: kartu kiri 8, 7, 5, 0");
    sama(angkaKartu("pr").join(""), "7500", "papan: kartu kanan 7, 5, 0, 0");
    const pusatKartu = (id) => obj(c, `${id}-k`).x + obj(c, `${id}-k`).w / 2;
    [0, 1, 2, 3].forEach((i) => {
      cek(Math.abs(pusatKartu(`pl${i}`) - obj(c, `pp-p${i}`).x) < 1e-6, `papan: kartu kiri ${i + 1} tepat di bawah paku ${i + 1}`);
      cek(Math.abs(pusatKartu(`pr${i}`) - obj(c, `pp-p${i + 4}`).x) < 1e-6, `papan: kartu kanan ${i + 1} tepat di bawah paku ${i + 5}`);
    });
    cek(PX === b.x && PW === b.w, "papan: ukuran papan sesuai");
    const d = T(M, "papan", 2);
    sama([0, 1, 2, 3].map((i) => nilaiId(d, `nl${i}`)), ["Ribuan", "Ratusan", "Puluhan", "Satuan"], "papan: nilai tempat kartu dari kiri");
    const e = T(M, "papan", 4);
    sama(nilaiId(e, "lh"), "Langkah 11: 8.750 > 7.500", "papan: hasil 8.750 lebih dari 7.500");
    cek(8750 > 7500 && 8 > 7, "papan: 8 lebih dari 7 sehingga 8.750 > 7.500");
  }
  /* ----- Ribuan ----- */
  {
    const a = T(M, "ribuan", 2);
    sama([bacaDigit(a, "ta"), bacaDigit(a, "tb")], [8750, 7500], "ribuan: tabel 8.750 dan 7.500");
    sama([sorot(a, "ta"), sorot(a, "tb")], [[0], [0]], "ribuan: hanya kolom ribuan disorot");
    sama([nilaiId(a, "ta-t0"), nilaiId(a, "tb-t0")], ["8", "7"], "ribuan: angka ribuan 8 dan 7");
    sama([nilaiId(a, "ca"), nilaiId(a, "cb")], ["ribuan: 8", "ribuan: 7"], "ribuan: teks angka ribuan");
    const b = T(M, "ribuan", 3);
    sama(nilaiId(b, "cs"), "8.750 > 7.500", "ribuan: kesimpulan");
  }
  /* ----- Puluhan dan satuan ----- */
  {
    const a = T(M, "lanjut", 1);
    const [x, y] = [bacaDigit(a, "ta"), bacaDigit(a, "tb")];
    sama([x, y], [4352, 4365], "lanjut: 4.352 dan 4.365");
    sama(sorot(a, "ta"), [2], "lanjut: puluhan disorot");
    cek(String(x)[0] === String(y)[0] && String(x)[1] === String(y)[1] && String(x)[2] === "5" && String(y)[2] === "6", "lanjut: ribuan dan ratusan sama, puluhan 5 lawan 6");
    sama([nilaiId(a, "pa"), nilaiId(a, "pb")], ["puluhan: 5", "puluhan: 6"], "lanjut: teks puluhan");
    sama(nilaiId(T(M, "lanjut", 2), "p2"), "4.352 < 4.365", "lanjut: kesimpulan puluhan");
    const c = T(M, "lanjut", 3);
    sama([bacaDigit(c, "ua"), bacaDigit(c, "ub")], [4352, 4355], "lanjut: 4.352 dan 4.355");
    const d = T(M, "lanjut", 4);
    cek(String(4352)[3] === "2" && String(4355)[3] === "5" && String(4352).slice(0, 3) === String(4355).slice(0, 3), "lanjut: tiga angka pertama sama, satuan 2 lawan 5");
    sama([nilaiId(d, "sa"), nilaiId(d, "sb"), nilaiId(d, "s2")], ["satuan: 2", "satuan: 5", "4.352 < 4.355"], "lanjut: teks satuan dan kesimpulan");
    sama(sorot(d, "ua"), [3], "lanjut: satuan disorot");
  }
  /* ----- Sama dan aturan ----- */
  {
    const a = T(M, "sama", 1);
    sama([bacaDigit(a, "ta"), bacaDigit(a, "tb")], [4352, 4352], "sama: dua bilangan 4.352");
    cek([0, 1, 2, 3].every((c) => nilaiId(a, `ta-t${c}`) === nilaiId(a, `tb-t${c}`)), "sama: semua angka sama");
    sama(nilaiId(a, "s1"), "4.352 = 4.352", "sama: kesimpulan");
    const b = T(M, "sama", 2);
    sama([nilaiId(b, "n1-t0"), nilaiId(b, "n2-t0"), nilaiId(b, "n3-t0")], [">", "<", "="], "sama: tiga notasi");
    const c = T(M, "sama", 3);
    sama([1, 2, 3, 4].map((i) => nilaiId(c, `a${i}-t0`).slice(0, 2)), ["1.", "2.", "3.", "4."], "sama: empat langkah aturan");
    cek(/ribuan/.test(nilaiId(c, "a1-t0")) && /ratusan/.test(nilaiId(c, "a2-t0")) && /puluhan/.test(nilaiId(c, "a3-t0")) && /satuan/.test(nilaiId(c, "a4-t0")), "sama: urutan ribuan, ratusan, puluhan, satuan");
  }
  /* ----- Berlatih 1 ----- */
  {
    const X0 = 108;
    const LG = 24;
    const a = T(M, "latih-satu", 3);
    ["n1", "n2", "n3"].forEach((id, i) => {
      const l = G.LATIHAN_SATU[i];
      sama([bacaDigit(a, `${id}a`), bacaDigit(a, `${id}b`)], [l.a, l.b], `latih 1: soal ${"abc"[i]}`);
      const s = obj(a, `${id}s`);
      const kolom = [...String(l.a)].findIndex((d, c) => d !== String(l.b)[c]);
      cek(Math.abs(s.x - (X0 + kolom * LG - LG / 2)) < 1e-6 && s.w === LG, `latih 1: sorot soal ${"abc"[i]} tepat di kolom pertama yang berbeda (${kolom})`);
      sama([nilaiId(a, `${id}c`), nilaiId(a, `${id}d`)], [fmt(l.a), fmt(l.b)], `latih 1: label bilangan soal ${"abc"[i]}`);
      const [y1, y2] = [[44, 70], [100, 126], [156, 182]][i];
      sama([nilaiId(a, `${id}w`), obj(a, `${id}w`).y], ["✅", l.a > l.b ? y1 : y2], `latih 1: tanda centang di bilangan yang lebih besar soal ${"abc"[i]} (${l.besar})`);
    });
    sama(nilaiId(a, "jud"), "Jawaban: 5.734; 5.614; 7.197", "latih 1: jawaban akhir");
  }
  /* ----- Berlatih 2 ----- */
  {
    const a = T(M, "latih-dua", 3);
    G.LATIHAN_DUA.forEach((l, i) => {
      sama([nilaiId(a, `u${i}-a`), nilaiId(a, `u${i}-s`), nilaiId(a, `u${i}-b`), nilaiId(a, `u${i}-l`)], [fmt(l.a), l.tanda, fmt(l.b), `${"abcdef"[i]}.`], `latih 2: soal ${"abcdef"[i]}`);
      cek(benar(l.a, nilaiId(a, `u${i}-s`), l.b), `latih 2: tanda soal ${"abcdef"[i]} benar menurut hitungan mandiri`);
    });
  }
  /* ----- Gunung ----- */
  {
    const a = T(M, "gunung", 2);
    G.GUNUNG.forEach((g, i) => {
      sama([nilaiId(a, `gn${i}`), nilaiId(a, `gt${i}`)], [g.nama, `${fmt(g.m)} m`], `gunung: ${g.nama} ${g.m} meter`);
      cek(Math.abs(obj(a, `gb${i}`).h - g.m / 40) < 1e-9, `gunung: tinggi batang ${g.nama} sebanding tinggi gunung`);
    });
    cek(G.GUNUNG.every((g, i) => Math.abs(obj(a, `gb${i}`).y + obj(a, `gb${i}`).h - 150) < 1e-9), "gunung: alas batang sama");
    const b = T(M, "gunung", 3);
    const URUT = [3676, 2460, 3726];
    URUT.forEach((n, i) => sama(bacaDigit(b, `t${i}`), n, `gunung: tabel ${i + 1} berisi ${n}`));
    sama([0, 1, 2].map((i) => nilaiId(b, `tn${i}`)), ["Semeru", "Sinabung", "Rinjani"], "gunung: tabel 3.676 Semeru, 2.460 Sinabung, 3.726 Rinjani");
    const c = T(M, "gunung", 4);
    sama([0, 1, 2].map((i) => sorot(c, `t${i}`)), [[0], [0], [0]], "gunung: ribuan ketiga bilangan disorot");
    sama([nilaiId(c, "r1"), nilaiId(c, "r2"), nilaiId(c, "r3")], ["2 < 3", "2.460 < 3.676", "2.460 < 3.726"], "gunung: perbandingan ribuan");
    cek(nilaiId(c, "r4-t1") === "Sinabung" && Math.min(...G.GUNUNG.map((g) => g.m)) === 2460, "gunung: terendah Sinabung (2.460)");
  }
  /* ----- Urut ----- */
  {
    const a = T(M, "urut", 0);
    sama([bacaDigit(a, "va"), bacaDigit(a, "vb")], [3676, 3726], "urut: 3.676 dan 3.726");
    sama([sorot(a, "va"), sorot(a, "vb")], [[1], [1]], "urut: ratusan disorot");
    sama([nilaiId(a, "vc"), nilaiId(a, "vd")], ["6 < 7", "3.676 < 3.726"], "urut: ratusan 6 kurang dari 7");
    const b = T(M, "urut", 1);
    sama(["ua", "ub", "uc"].map((id) => nilaiId(b, `${id}-t0`)), ["2.460", "3.676", "3.726"], "urut: urutan gunung terkecil ke terbesar");
    const c = T(M, "urut", 2);
    sama([nilaiId(c, "wa-j"), nilaiId(c, "wb-j"), nilaiId(c, "wc-j"), nilaiId(c, "wd-j")], ["7.570", "5.240", "3.041", "9.941"], "urut: empat bilangan soal");
    sama([bacaDigit(c, "wa")], [7570], "urut: tabel pertama sudah terisi 7, 5, 7, 0");
    cek(["wb", "wc", "wd"].every((id) => bacaDigit(c, id) === null && [0, 1, 2, 3].every((k2) => nilaiId(c, `${id}-t${k2}`) === "...")), "urut: tiga tabel lain masih titik-titik");
    const d = T(M, "urut", 3);
    sama(["wa", "wb", "wc", "wd"].map((id) => bacaDigit(d, id)), [7570, 5240, 3041, 9941], "urut: kunci tabel kelima angka sesuai nilai tempat");
    sama(["wa", "wb", "wc", "wd"].map((id) => sorot(d, id)), [[0], [0], [0], [0]], "urut: ribuan keempat bilangan disorot");
    sama(["wa", "wb", "wc", "wd"].map((id) => nilaiId(d, `${id}-t0`)), ["7", "5", "3", "9"], "urut: ribuan 7, 5, 3, 9");
    sama(nilaiId(d, "wu"), "ribuan: 3 < 5 < 7 < 9", "urut: ribuan terkecil ke terbesar");
    const e = T(M, "urut", 4);
    sama([0, 1, 2, 3].map((i) => nilaiId(e, `vk${i}-t0`)), G.URUT_KUNCI.map(fmt), "urut: kunci urutan 3.041, 5.240, 7.570, 9.941");
    sama(nilaiId(e, "vm"), "3.041 < 5.240 < 7.570 < 9.941", "urut: rantai kunci");
  }
  /* ----- Ayo Berpikir ----- */
  {
    const a = T(M, "berpikir", 0);
    sama([0, 1, 2, 3].map((i) => nilaiId(a, `ya${i}-t0`)), ["1", "5", "9", "2"], "berpikir: empat angka 1, 5, 9, 2");
    cek(nilaiId(a, "yb-t0") === "susun bilangan empat angka", "berpikir: kartu soal susunan empat angka");
    const b = T(M, "berpikir", 1);
    sama([0, 1, 2, 3, 4].map((i) => nilaiId(b, `ye${i}-t0`)), G.CONTOH_A.map(fmt), "berpikir: contoh jawaban a");
    sama([...G.CONTOH_A].map((n) => [...String(n)].sort().join("")), Array(5).fill("1259"), "berpikir: tiap contoh memakai angka 1, 2, 5, 9");
    const c = T(M, "berpikir", 3);
    sama([nilaiId(c, "yi-t1"), nilaiId(c, "yj-t1")], ["9.521", "1.259"], "berpikir: terbesar dan terkecil sebenarnya");
    const d = T(M, "berpikir", 4);
    sama([0, 1, 2, 3, 4].map((i) => nilaiId(d, `yc${i}-t0`)), ["1.592", "2.951", "5.129", "5.921", "9.215"], "berpikir: kunci c urutan naik");
    const e = T(M, "berpikir", 5);
    sama([0, 1, 2, 3, 4].map((i) => nilaiId(e, `yd${i}-t0`)), G.CONTOH_D.map(fmt), "berpikir: contoh jawaban d");
    const f = T(M, "berpikir", 6);
    sama([nilaiId(f, "yf-t1"), nilaiId(f, "yg-t1")], ["9.999", "1.111"], "berpikir: terbesar 9.999, terkecil 1.111 bila boleh berulang");
  }
  /* ----- Catatan ----- */
  {
    const a = T(M, "catatan", 1);
    sama([bacaDigit(a, "ma"), bacaDigit(a, "mb")], [1987, 2045], "catatan: 1.987 dan 2.045");
    const kolomX = (id) => (obj(a, id).x + 13 - 70) / 26;
    sama(kolomX("mc"), 3, "catatan: sorot satuan (kolom 3)");
    cek(Number(nilaiId(a, "ma-t3")) > Number(nilaiId(a, "mb-t3")) && Number(nilaiId(a, "ma-t0")) < Number(nilaiId(a, "mb-t0")), "catatan: satuan 7 lebih dari 5, tetapi ribuan 1 kurang dari 2");
    const b = T(M, "catatan", 2);
    sama((obj(b, "mf").x + 13 - 70) / 26, 0, "catatan: sorot ribuan (kolom 0)");
    sama(nilaiId(b, "mg"), "1.987 < 2.045", "catatan: hasil benar 1.987 < 2.045");
  }

  /* ----- Metode luar: Compare Leftmost ----- */
  {
    const LX = 102;
    const LG = 26;
    const kolomKe = (o) => (o.x + LG / 2 - LX) / LG;
    const periksaKiri = (objs, id, a, b, nama) => {
      sama([bacaDigit(objs, `${id}a`), bacaDigit(objs, `${id}b`)], [a, b], `${nama}: dua bilangan`);
      const c = [...String(a)].findIndex((d, k2) => d !== String(b)[k2]);
      const h = obj(objs, `${id}-h`);
      cek(h && kolomKe(h) === c, `${nama}: sorot kolom berbeda pertama (${c})`);
      const sama2 = [0, 1, 2, 3].filter((k2) => ada(objs, `${id}-s${k2}`));
      sama(sama2, Array.from({ length: c }, (_, k2) => k2), `${nama}: kolom yang sama disorot hijau (${c} kolom)`);
      cek(sama2.every((k2) => String(a)[k2] === String(b)[k2]), `${nama}: kolom hijau memang bersama`);
    };
    periksaKiri(T(U, "luar-kiri", 1), "lk", 4352, 4365, "kiri konsep");
    sama(nilaiId(T(U, "luar-kiri", 2), "lk-r"), "4.352 < 4.365", "kiri konsep: hasil");
    cek(obj(T(U, "luar-kiri", 2), "lka-t3").op === 0.3 && obj(T(U, "luar-kiri", 2), "lkb-t3").op === 0.3, "kiri konsep: satuan dipudarkan");
    const PAS = [["ma", 8750, 7500], ["mb", 5614, 5368], ["mc", 7124, 7197], ["md", 9999, 9998]];
    PAS.forEach(([id, a, b], i) => {
      const o = T(U, "luar-kiri-terapan", i);
      periksaKiri(o, id, a, b, `kiri terapan ${a}/${b}`);
      sama(nilaiId(o, `${id}-r`), `${fmt(a)} ${a > b ? ">" : a < b ? "<" : "="} ${fmt(b)}`, `kiri terapan: hasil ${a} dan ${b}`);
    });
    sama(PAS.map(([, a, b]) => [...String(a)].findIndex((d, k2) => d !== String(b)[k2])), [0, 1, 2, 3], "kiri terapan: kolom berbeda pertama ribuan, ratusan, puluhan, satuan");
  }
  /* ----- Metode luar: garis bilangan ----- */
  {
    const garisSah = (objs, id) => {
      const ax = obj(objs, `${id}-ax`);
      const ticks = Array.from({ length: 40 }, (_, i) => i).filter((i) => ada(objs, `${id}-k${i}`));
      const nilaiTick = ticks.map((i) => bil(nilaiId(objs, `${id}-k${i}`)));
      const xTick = ticks.map((i) => obj(objs, `${id}-g${i}`).x);
      const langkah = nilaiTick[1] - nilaiTick[0];
      const rapi = nilaiTick.every((v, i) => v === nilaiTick[0] + i * langkah) && xTick.every((x, i) => Math.abs(x - (xTick[0] + (i * (xTick.at(-1) - xTick[0])) / (ticks.length - 1))) < 1e-6);
      const awal = ax.x;
      const akhir = ax.x + ax.x2;
      return { rapi, dari: nilaiTick[0], sampai: nilaiTick.at(-1), x0: xTick[0], x1: xTick.at(-1), awal, akhir, banyak: ticks.length };
    };
    const titikSah = (objs, g, id) => {
      const t = obj(objs, id);
      const label = bil(nilaiId(objs, `${id}-l`));
      const x = g.x0 + ((label - g.dari) / (g.sampai - g.dari)) * (g.x1 - g.x0);
      return { label, benar: Math.abs(t.x - x) < 1e-6, y: t.y };
    };
    const a = T(U, "luar-garis", 0);
    const g1 = garisSah(a, "gk");
    cek(g1.rapi && g1.dari === 0 && g1.sampai === 10000 && g1.banyak === 11 && g1.awal === g1.x0 && g1.akhir === g1.x1, "garis konsep: garis 0 sampai 10.000, 11 tanda tiap 1.000, rata");
    const p1 = titikSah(a, g1, "gp");
    cek(p1.label === 4352 && p1.benar, "garis konsep: titik 4.352 tepat di tempatnya");
    const c = T(U, "luar-garis", 2);
    const g3 = garisSah(c, "gk");
    const t1 = titikSah(c, g3, "g1");
    const t2 = titikSah(c, g3, "g2");
    cek(t1.label === 7500 && t1.benar && t2.label === 8750 && t2.benar && obj(c, "g2").x > obj(c, "g1").x, "garis konsep: 7.500 dan 8.750 tepat dan 8.750 lebih ke kanan");
    sama(nilaiId(c, "gc"), "8.750 > 7.500", "garis konsep: hasil");
    // Terapan: gunung.
    const gunung = T(U, "luar-garis-terapan", 1);
    const gg = garisSah(gunung, "gg");
    cek(gg.rapi && gg.dari === 2000 && gg.sampai === 4000 && gg.banyak === 5 && gg.awal === gg.x0 && gg.akhir === gg.x1, "garis gunung: 2.000 sampai 4.000, tanda tiap 500");
    const kunci = [["gs", 2460, "Sinabung"], ["gm", 3676, "Semeru"], ["gr", 3726, "Rinjani"]];
    for (const [id, m, nama] of kunci) {
      const t = titikSah(gunung, gg, id);
      cek(t.label === m && t.benar, `garis gunung: titik ${nama} ${m} tepat di tempatnya`);
      sama(nilaiId(gunung, `${id}-m`), nama, `garis gunung: nama ${nama}`);
    }
    cek(obj(gunung, "gs").x < obj(gunung, "gm").x && obj(gunung, "gm").x < obj(gunung, "gr").x, "garis gunung: Sinabung, Semeru, Rinjani makin ke kanan");
    const akhirGunung = T(U, "luar-garis-terapan", 2);
    sama([nilaiId(akhirGunung, "gu1"), nilaiId(akhirGunung, "gu2")], ["Sinabung < Semeru < Rinjani", "2.460 < 3.676 < 3.726"], "garis gunung: urutan naik");
    // Terapan: soal latihan.
    const lat = T(U, "luar-garis-terapan", 3);
    const gl = garisSah(lat, "gl");
    cek(gl.rapi && gl.dari === 0 && gl.sampai === 10000 && gl.banyak === 11, "garis latihan: 0 sampai 10.000");
    const posisi = G.URUT_SOAL.map((n) => {
      const t = obj(lat, `lp${n}`);
      return { n, benar: Math.abs(t.x - (gl.x0 + (n / 10000) * (gl.x1 - gl.x0))) < 1e-6, label: nilaiId(lat, `lp${n}-l`) };
    });
    cek(posisi.every((p) => p.benar && p.label === fmt(p.n)), "garis latihan: empat titik tepat di tempatnya dan berlabel");
    sama([...posisi].sort((p, q) => obj(lat, `lp${p.n}`).x - obj(lat, `lp${q.n}`).x).map((p) => p.n), [...G.URUT_KUNCI], "garis latihan: dari kiri ke kanan = kunci urutan");
  }
  /* ----- Metode luar: himpunan ----- */
  {
    const simulasi = (v, adg, pre, himpunan) => {
      const a = adegan(v, adg);
      let hasilTerakhir = [];
      a.ketukan.forEach((_, ke) => {
        const o = L.keadaanStory(a, ke, 9999);
        const set = himpunan.map((n, i) => ({ n, id: `${pre}s${i}` })).filter((s) => ada(o, `${s.id}-t0`));
        const cekSet = set.map((s) => ({ n: bil(nilaiId(o, `${s.id}-t0`)), coret: (obj(o, `${s.id}-t0`).op ?? 1) < 1 }));
        const hasil = [0, 1, 2, 3].filter((j) => ada(o, `${pre}h${j}-t0`)).map((j) => bil(nilaiId(o, `${pre}h${j}-t0`)));
        cek(hasil.every((h, j) => j === 0 || h > hasil[j - 1]), `${v.id}/${adg}#${ke + 1}: hasil naik (${hasil.join(", ")})`);
        const terurut = [...himpunan].sort((p, q) => p - q);
        cek(hasil.every((h, j) => h === terurut[j]), `${v.id}/${adg}#${ke + 1}: hasil adalah yang terkecil berurutan (${hasil.join(", ")})`);
        const coretNilai = cekSet.filter((s) => s.coret).map((s) => s.n).sort((p, q) => p - q);
        cek(coretNilai.every((n) => hasil.includes(n)), `${v.id}/${adg}#${ke + 1}: yang dicoret sudah pindah ke hasil`);
        // Bila satu bilangan baru pindah, ia terkecil di antara yang belum dipindah sebelumnya.
        if (hasil.length > hasilTerakhir.length) {
          const baru = hasil.slice(hasilTerakhir.length);
          const sisa = himpunan.filter((n) => !hasilTerakhir.includes(n));
          cek(baru[0] === Math.min(...sisa), `${v.id}/${adg}#${ke + 1}: ${baru[0]} adalah terkecil dari sisa himpunan`);
        }
        hasilTerakhir = hasil;
        stat.data += 1;
      });
      return hasilTerakhir;
    };
    sama(simulasi(U, "luar-himpunan", "hk", [3676, 2460, 3726]), [2460, 3676, 3726], "himpunan konsep: hasil akhir");
    sama(simulasi(U, "luar-himpunan-terapan", "ht", [7570, 5240, 3041, 9941]), [3041, 5240, 7570, 9941], "himpunan terapan: hasil akhir sama dengan kunci");
    const h = T(U, "luar-himpunan-terapan", 0);
    sama([0, 1, 2, 3].map((i) => nilaiId(h, `hts${i}-t0`)), ["7.570", "5.240", "3.041", "9.941"], "himpunan terapan: himpunan soal latihan");
    sama(nilaiId(T(U, "luar-himpunan-terapan", 3), "htr"), "3.041 < 5.240 < 7.570 < 9.941", "himpunan terapan: hasil");
  }
  /* ----- Metode luar: batang ----- */
  {
    const LB = 28;
    const nilaiBatang = (objs, id) => {
      const blok = objs.filter((o) => new RegExp(`^${id}-b\\d+$`).test(o.id)).sort((p, q) => Number(p.id.split("-b")[1]) - Number(q.id.split("-b")[1]));
      if (!blok.length) return null;
      const rapat = blok.every((o, i) => o.w === LB && o.h === blok[0].h && o.y === blok[0].y && Math.abs(o.x - (blok[0].x + i * LB)) < 1e-9);
      const r = obj(objs, `${id}-r`);
      const sisa = r ? Math.round((r.w / LB) * 1000) : 0;
      const rapatSisa = !r || (Math.abs(r.x - (blok[0].x + blok.length * LB)) < 1e-9 && r.y === blok[0].y && r.h === blok[0].h);
      return { nilai: blok.length * 1000 + sisa, rapat: rapat && rapatSisa, panjang: blok.length * LB + (r ? r.w : 0) };
    };
    const periksa = (objs, id, label, nama) => {
      const b = nilaiBatang(objs, id);
      cek(b !== null, `${nama}: batang ${id} ada`);
      if (!b) return;
      cek(b.rapat, `${nama}: batang ${id} tersusun rapat`);
      cek(b.nilai === bil(nilaiId(objs, label)), `${nama}: batang ${id} bernilai ${b.nilai}, label ${nilaiId(objs, label)}`);
      stat.data += 1;
    };
    const k0 = T(U, "luar-batang", 0);
    periksa(k0, "bk", "bkl", "batang konsep");
    sama(nilaiBatang(k0, "bk").nilai, 8750, "batang konsep: 8 blok penuh dan sisa 750");
    const k1 = T(U, "luar-batang", 1);
    cek(nilaiId(k1, "bkp") === "8 blok penuh" && nilaiId(k1, "bks") === "sisa 750" && nilaiId(k1, "bkgt") === "1 blok = 1.000", "batang konsep: 8 blok penuh, sisa 750, satu blok seribu");
    cek(obj(k1, "bk-r").w === 0.75 * 28 && obj(k1, "bkg").w === 28, "batang konsep: sisa 750 selebar tiga perempat blok");
    const k2 = T(U, "luar-batang", 2);
    periksa(k2, "bj", "bjl", "batang konsep");
    cek(nilaiBatang(k2, "bk").panjang > nilaiBatang(k2, "bj").panjang, "batang konsep: 8.750 lebih panjang dari 7.500");
    const k3 = T(U, "luar-batang", 3);
    cek(nilaiBatang(k3, "bt").nilai === 3000 && obj(k3, "bz-z0") && !ada(k3, "bz-z10") && Array.from({ length: 10 }, (_, i) => obj(k3, `bz-z${i}`).w).every((w) => w === 10), "batang konsep: tiga blok penuh, kaca pembesar sepuluh petak");
    const r0 = T(U, "luar-batang-terapan", 0);
    periksa(r0, "ra", "ral", "batang terapan");
    periksa(r0, "rb", "rbl", "batang terapan");
    cek(nilaiBatang(r0, "ra").panjang > nilaiBatang(r0, "rb").panjang && nilaiBatang(r0, "ra").nilai > nilaiBatang(r0, "rb").nilai, "batang terapan: panjang batang mengikuti nilai (8.750 lebih dari 7.500)");
    sama(nilaiId(r0, "rr"), "8.750 > 7.500", "batang terapan: hasil");
    const r1 = T(U, "luar-batang-terapan", 1);
    periksa(r1, "sa", "sal", "batang terapan");
    periksa(r1, "sb", "sbl", "batang terapan");
    const sela = nilaiBatang(r1, "sb").panjang - nilaiBatang(r1, "sa").panjang;
    cek(sela > 0 && sela < 2, `batang terapan: selisih panjang 3.676 dan 3.726 tipis (${sela.toFixed(2)})`);
    cek(obj(r1, "sa-b2") && obj(r1, "sb-b2") && !ada(r1, "sa-b3") && !ada(r1, "sb-b3"), "batang terapan: kedua batang tiga blok penuh");
    const r2 = T(U, "luar-batang-terapan", 2);
    const zoom = (objs, id) => Array.from({ length: 10 }, (_, i) => obj(objs, `${id}-z${i}`));
    const za = zoom(r2, "za");
    const zb = zoom(r2, "zb");
    const berwarna = (z) => z.filter((o) => o.warna !== "#FFFFFF").length;
    sama([berwarna(za), berwarna(zb)], [6, 7], "batang terapan: petak ratusan 6 dan 7");
    sama([berwarna(za), berwarna(zb)], [Number(String(3676)[1]), Number(String(3726)[1])], "batang terapan: petak sama dengan angka ratusan 3.676 dan 3.726");
    cek(za.every((o, i) => o.x === za[0].x + i * 10 && o.w === 10) && zb.every((o, i) => o.x === zb[0].x + i * 10 && o.w === 10), "batang terapan: kaca pembesar sepuluh petak rapat");
    cek(za.slice(0, 6).every((o) => o.warna !== "#FFFFFF") && za.slice(6).every((o) => o.warna === "#FFFFFF"), "batang terapan: petak berwarna berurutan dari kiri");
    sama(nilaiId(r2, "zr"), "6 < 7, jadi 3.676 < 3.726", "batang terapan: kesimpulan kaca pembesar");
    const r3 = T(U, "luar-batang-terapan", 3);
    const ps = [0, 1, 2, 3].map((i) => {
      periksa(r3, `rd${i}`, `rd${i}-l`, "batang latihan");
      return nilaiBatang(r3, `rd${i}`);
    });
    cek(ps.every((p, i) => i === 0 || p.panjang > ps[i - 1].panjang), "batang latihan: panjang naik dari terpendek");
    sama(ps.map((p) => p.nilai), [...G.URUT_KUNCI], "batang latihan: urutan batang = kunci");
  }
  /* ----- Ringkasan ----- */
  {
    const r1 = T(U, "luar-ringkas", 0);
    const r2 = T(U, "luar-ringkas", 1);
    sama([nilaiId(r1, "rt1-t1"), nilaiId(r2, "rt3-t1"), nilaiId(r2, "rt4-t1")], ["8.750 > 7.500", "3.041, 5.240, 7.570, 9.941", "3.676 < 3.726"], "ringkasan: contoh tiap metode");
    cek(bil("3.041") < bil("5.240") && bil("5.240") < bil("7.570") && bil("7.570") < bil("9.941"), "ringkasan: himpunan terurut naik");
  }
  /* ----- Berpikir/catatan teks gambar lain ----- */
  sama(teksLepas(T(M, "catatan", 4)).filter((t) => /^[1-3]\./.test(t) || /bandingkan|tanda|urutkan/.test(t)).length >= 3, true, "catatan: ringkasan tiga langkah");
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
  // Kelas IV: Buku Siswa hlm. N = PDF N+12. Subbab C: BS PDF 28-35 ditambah bagian atas PDF 36 (Ayo Berpikir, hlm. 24) sebelum judul D; PDF 28 memuat akhir subbab B di bagian atas.
  // Panduan Guru hlm. N = PDF N+12: PDF 52-56 ditambah bagian atas PDF 57 (akhir Diferensiasi) sebelum judul D.
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 28, 36), ambil(bg, 52, 57), ambil(bs, 36, 36), ambil(bg, 57, 57), ambil(bs, 28, 28)] : [null];
  if (bagian.some((b) => b === null)) console.log("PDF atau pembaca PDF tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const siswaPenuh = bersih(bagian[0]);
    const guruPenuh = bersih(bagian[1]);
    const awalDs = siswaPenuh.indexOf("d. komposisi dan dekomposisi bilangan cacah sampai 10.000");
    const awalDg = guruPenuh.indexOf("d. komposisi dan dekomposisi bilangan cacah sampai 10.000");
    cek(awalDs > 0 && awalDg > 0, "judul subbab D ada di Buku Siswa PDF 36 dan Panduan Guru PDF 57 (batas subbab C)");
    const siswa = siswaPenuh.slice(0, awalDs);
    const guru = guruPenuh.slice(0, awalDg);
    const buku = `${siswa}\n${guru}`;
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
    cek(/d\. komposisi dan dekomposisi bilangan cacah/.test(bersih(bagian[2])) && /d\. komposisi dan dekomposisi bilangan cacah/.test(bersih(bagian[3])), "subbab D mulai di tengah Buku Siswa PDF 36 dan Panduan Guru PDF 57");
    cek(/apabila karakteristik peserta didik/.test(bersih(bagian[3])) && bersih(bagian[3]).indexOf("apabila karakteristik") < bersih(bagian[3]).indexOf("d. komposisi"), "Panduan Guru PDF 57 memuat akhir Diferensiasi subbab C sebelum judul D");
    cek(siswa.includes("ayo berpikir"), "Buku Siswa hlm. 24 (PDF 36) memuat Ayo Berpikir milik subbab C sebelum judul D");
    // Pencocokan judul dan angka subbab.
    cek(siswa.includes("c. membandingkan dan mengurutkan bilangan cacah sampai 10.000") && guru.includes("c. membandingkan dan mengurutkan"), "judul subbab C ada di Buku Siswa dan Panduan Guru");
    cek(bersih(bagian[4]).indexOf("4. salin tabel") < bersih(bagian[4]).indexOf("c. membandingkan"), "Buku Siswa PDF 28: akhir subbab B (nomor 4) ada di atas judul C, tidak dipakai video ini");
    // Angka dan istilah yang dipakai video (hitungan mandiri dari teks PDF).
    cek(siswa.includes("setengah kilogram manggis dengan harga rp7.500,00") && siswa.includes("seperempat kilogram apel dengan harga rp6.750,00"), "Buku Siswa: manggis setengah kilogram Rp7.500, apel seperempat kilogram Rp6.750");
    cek(siswa.includes("kios a harga bengkoang sebesar rp7.500,00 dan di kios b sebesar rp8.750,00"), "Buku Siswa: bengkoang kios A Rp7.500 dan kios B Rp8.750");
    cek(siswa.includes("sebanyak 10 buah") && siswa.includes("2 paket kartu bilangan") && guru.includes("sebanyak 20 buah"), "Buku Siswa: 10 buah kartu lalu 2 paket; Panduan Guru: 20 buah (selisih dicatat di video)");
    cek(siswa.includes("8 buah paku") && siswa.includes("panjang 80 cm, lebar 20 cm") && siswa.includes("empat paku"), "Buku Siswa: papan spon 80 cm kali 20 cm dan 8 paku");
    cek(siswa.includes("5.734 dan 4.312") && siswa.includes("5.614 dan 5.368") && siswa.includes("7.124 dan 7.197"), "Buku Siswa: soal Berlatih 1");
    cek(/a\. 4\.435 > 3\.345 b\. 9\.999 > 9\.998 c\. 1\.001 < 1\.002 d\. 8\.765 = 8\.765 e\. 4\.567 < 5\.787 f\. 7\.654 < 7\.777/.test(guru), "Panduan Guru: kunci Berlatih 2 enam tanda");
    cek(guru.includes("a. 5.734 dan 4.312? 5.734") && guru.includes("b. 5.614 dan 5.368? 5.614") && guru.includes("c. 7.124 dan 7.197? 7.197"), "Panduan Guru: kunci Berlatih 1");
    cek(/3\.041 5\.240 7\.570 9\.941/.test(guru) && siswa.includes("7.570, 5.240, 3.041 dan 9.941"), "kunci urutan 3.041, 5.240, 7.570, 9.941");
    cek(guru.includes("contoh jawaban: 1.592; 2.951; 5.921; 9.215; 5.129") && guru.includes("bilangan terbesar: 9.215 bilangan terkecil: 1.592") && guru.includes("1.592; 2.951; 5.129; 5.921; 9.215"), "Panduan Guru: kunci Ayo Berpikir a, b, c");
    cek(guru.includes("contoh jawaban: 1.155; 9.925; 5.119; 2.222; 9.225") && guru.includes("bilangan terbesar: 9.925 dan bilangan terkecil 1.155") && guru.includes("bilangan 9.999"), "Panduan Guru: kunci Ayo Berpikir d, e, f");
    cek(siswa.includes("terbentuk pada soal b") && guru.includes("pada bilangan yang terbentuk pada soal nomor a"), "Ayo Berpikir c: Buku Siswa menyebut soal b, Panduan Guru soal nomor a (selisih)");
    cek(guru.includes("dimulai dari satuan, puluhan, ratusan baru ribuan"), "Panduan Guru: miskonsepsi membandingkan dari satuan");
    cek(guru.includes("diskusi dan tanya jawab") && guru.includes("kelompok dapat bekerja sama"), "Panduan Guru: metode Diskusi dan Tanya Jawab");
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k4b1c-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k4b1c-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k4b1c sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k4b1c.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_C41|video-k4b2-umum|video-k4b1-umum|naskah-k4b1/.test(pembungkus) && /VIDEO_MATERI_K4B1C/.test(pembungkus) && /VIDEO_LUAR_K4B1C/.test(pembungkus) && /export function VideoK4B1C/.test(pembungkus), "video-k4b1c.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k4b1c.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k4b1c.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k4b1c.mjs: akhir baris LF");
}

for (const v of [M, U]) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.kutipan} kutipan terhadap teks PDF, ${stat.terbilang} bilangan berkata, ${stat.persamaan} pernyataan perbandingan dan persamaan, ${stat.tabel ?? 0} tabel nilai tempat, ${stat.data} hitungan data dan simulasi, ${stat.teksPasang} pasangan teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
