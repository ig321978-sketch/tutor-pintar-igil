// Uji Story Kelas 4 Bab 3 Sub-Bab A (Pola Gambar, termasuk pembuka bab): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar (angka dan bilangan yang diucapkan dengan kata), perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, tidak membocorkan Pola Bilangan (Sub-Bab B) di luar pembuka dan peta konsep, kutipan buku terhadap teks PDF (pdftotext, atau PyMuPDF bila tidak ada),
// banyak benda dan bentuk pada gambar (kumpulan, cincin, silang, deret segitiga, ubin belah ketupat) dihitung ulang dari gambar, hitungan mandiri selisih dan kunci Panduan Guru, emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k4b3a.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b3a-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K4B3A, V.VIDEO_LUAR_K4B3A];
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
const G = await import("../src/components/modul/story/k4b3a-gambar.ts");
const M2 = await import("../src/components/modul/story/k4b3a-materi-2.ts");
const M3 = await import("../src/components/modul/story/k4b3a-materi-3.ts");
const U1 = await import("../src/components/modul/story/k4b3a-luar-1.ts");
const U2 = await import("../src/components/modul/story/k4b3a-luar-2.ts");
const M_VIDEO = V.VIDEO_MATERI_K4B3A;
// Adegan administratif (pembuka, tujuan, peta konsep, panduan awal; di B: rubrik, remedial, refleksi, penutup) tidak lagi diputar di video materi.
// Adegannya tetap ada di berkas materi, jadi pemeriksaan isi memakai daftar penuh; hanya jumlah dan urutan adegan diuji terhadap video yang diputar.
const MODUL_MATERI = Object.assign({}, await import("../src/components/modul/story/k4b3a-materi-1.ts"), await import("../src/components/modul/story/k4b3a-materi-2.ts"), await import("../src/components/modul/story/k4b3a-materi-3.ts"));
const M = { ...M_VIDEO, adegan: [MODUL_MATERI.ADEGAN_PEMBUKA, MODUL_MATERI.ADEGAN_PETA, MODUL_MATERI.ADEGAN_PANDUAN_AWAL, MODUL_MATERI.ADEGAN_AKTIVITAS_SATU, MODUL_MATERI.ADEGAN_AKTIVITAS_SATU_HASIL, MODUL_MATERI.ADEGAN_AMATI_JERUK, MODUL_MATERI.ADEGAN_AKTIVITAS_DUA, MODUL_MATERI.ADEGAN_AMATI_PERMEN, MODUL_MATERI.ADEGAN_BERLATIH_SATU_DUA, MODUL_MATERI.ADEGAN_BERLATIH_TIGA_EMPAT, MODUL_MATERI.ADEGAN_BERLATIH_LIMA, MODUL_MATERI.ADEGAN_DIFERENSIASI] };
const U = V.VIDEO_LUAR_K4B3A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const nilaiId = (objs, id) => objs.find((o) => o.id === id)?.isi;
const T = (v, id, ke) => akhirAdegan(adegan(v, id), ke);
const hitungBenda = (objs, id) => objs.filter((o) => new RegExp(`^${id}-o\\d+$`).test(o.id)).length;
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  const METODE = ["Repeating Pattern", "Growing Pattern", "Visual Structure", "Draw the Next Term"];
  const NAMA_ID = ["Pola Berulang", "Pola Bertambah", "Struktur Visual", "Gambar Suku Berikutnya"];
  cek(!/Repeating Pattern|Growing Pattern|Visual Structure|Draw the Next Term|Pola Berulang|Pola Bertambah|Struktur Visual|Gambar Suku Berikutnya|metode luar|metode dari luar|Van de Walle|Gestalt/i.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of [...METODE, ...NAMA_ID]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE, METODE, "nama metode di berkas luar-1");
  sama(U1.NAMA_METODE_ID, NAMA_ID, "nama Indonesia metode luar");
  // Video diputar sebagai guru yang mengajar: tidak ada penyebutan sumber buku di suara, teks terlihat, label sumber, judul adegan, dan subjudul.
  const TERLARANG = /buku|panduan guru|hlm|halaman|kunci|rubrik|salah ketik|salah cetak|tambahan video|contoh video|temuan/i;
  for (const v of [M_VIDEO, U]) {
    cek(!TERLARANG.test(`${v.judul} ${v.subjudul}`), `${v.id}: judul dan subjudul video tanpa kata terlarang`);
    cek(!/nomor|no\./i.test(v.subjudul) && v.subjudul.length <= 40, `${v.id}: subjudul pendek tanpa nomor halaman`);
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
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber)), "video materi: label sumber berbentuk Materi: ...");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  cek(U.adegan.every((a) => a.sumber.length <= 46), "video metode luar: label sumber cukup pendek untuk kanvas 300 lebar");
  cek(M_VIDEO.adegan.every((a) => a.sumber.length <= 46), "video materi: label sumber cukup pendek untuk kanvas 300 lebar");
  for (const kata of ["Peta konsep", "Kata kunci", "Apersepsi", "Ayo Berlatih", "Ayo Berpikir", "Miskonsepsi", "Diferensiasi", "Refleksi", "Subbab", "Tujuan pembelajaran", "Panduan guru", "Aktivitas"]) cek(!luar.includes(kata), `video metode luar tidak memuat "${kata}" milik materi`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-ulang", "luar-ulang-terapan", "luar-tumbuh", "luar-tumbuh-terapan", "luar-struktur", "luar-struktur-terapan", "luar-gambar", "luar-gambar-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[0].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  cek(M_VIDEO.adegan.length === 9 && U.adegan.length === 10, "9 adegan materi diputar dan 10 adegan metode luar");
  // Sub-Bab A tidak membocorkan Pola Bilangan (Sub-Bab B). Pembuka bab dan peta konsep boleh menyebutnya sebagai judul bab, tujuan, kata kunci, dan cabang peta.
  const BOCOR = /pola bilangan|barisan|aritmetika|mesin fungsi|tabel nilai|function machine|table of values|arithmetic sequence|suku ke|kursi|panen|telur|produksi|uji kompetensi|refleksi|pengayaan|remedial/i;
  const boleh = ["pembuka-bab", "peta-konsep"];
  for (const a of M.adegan.filter((x) => !boleh.includes(x.id))) cek(!BOCOR.test(teksAdegan(a)), `materi ${a.id} tidak membocorkan Pola Bilangan`);
  for (const a of U.adegan) cek(!BOCOR.test(teksAdegan(a)), `metode luar ${a.id} tidak membocorkan Pola Bilangan`);
  cek(/pola bilangan/i.test(teksAdegan(adegan(M, "pembuka-bab"))) && /pola bilangan/i.test(teksAdegan(adegan(M, "peta-konsep"))), "pembuka bab dan peta konsep menyebut pola bilangan sebagai judul, kata kunci, dan cabang peta");
  cek(totalKetukan >= 80, `total ketukan cukup dalam (${totalKetukan})`);
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "aktivitas-satu,aktivitas-satu-hasil,amati-jeruk,aktivitas-dua,amati-permen,berlatih-satu-dua,berlatih-tiga-empat,berlatih-lima,diferensiasi", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "luar-pembuka,luar-ulang,luar-ulang-terapan,luar-tumbuh,luar-tumbuh-terapan,luar-struktur,luar-struktur-terapan,luar-gambar,luar-gambar-terapan,luar-ringkas", "urutan adegan metode luar");
  // Nama metode baru belum dipakai metode, judul, atau lab lain pada bab ini.
  const baca = (n) => readFileSync(new URL(`../src/components/modul/${n}`, import.meta.url), "utf8");
  for (const n of ["naskah-k4b3.ts", "lab-pola-gambar-k4b3a.ts", "lab-pola-bilangan-k4b3b.ts"]) {
    const s = baca(n);
    cek(!/Draw the Next Term|Gambar Suku Berikutnya/.test(s), `nama metode baru tidak bentrok dengan ${n}`);
  }
  cek(/Repeating Pattern/.test(baca("naskah-k4b3.ts")) && /Growing Pattern/.test(baca("naskah-k4b3.ts")) && /Visual Structure/.test(baca("naskah-k4b3.ts")), "tiga nama metode lama sama dengan nama di naskah bab");
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

/* ------------------------------ Banyak benda dan bentuk pada gambar dihitung ulang ------------------------------ */
const luasPoligon = (t) => Math.abs(t.reduce((s, p, i) => s + (p[0] * t[(i + 1) % t.length][1] - t[(i + 1) % t.length][0] * p[1]), 0)) / 2;
const titikBenda = (objs, id) => objs.filter((o) => new RegExp(`^${id}-o\\d+$`).test(o.id)).map((o) => [o.x, o.y]);
const bulatKan = (v) => Math.abs(v - Math.round(v)) < 1e-9;
/** Cincin kk kali kk berjarak s: banyaknya 4kk - 4, semua di tepi, tanpa titik kembar. */
const cincinSah = (objs, id, kk, s) => {
  const t = titikBenda(objs, id);
  const x0 = Math.min(...t.map((p) => p[0]));
  const y0 = Math.min(...t.map((p) => p[1]));
  const kunci = new Set();
  let ok = t.length === 4 * kk - 4;
  for (const [x, y] of t) {
    const c = (x - x0) / s;
    const r = (y - y0) / s;
    ok = ok && bulatKan(c) && bulatKan(r) && c >= 0 && c < kk && r >= 0 && r < kk && (c === 0 || r === 0 || c === kk - 1 || r === kk - 1);
    kunci.add(`${Math.round(c)},${Math.round(r)}`);
  }
  return ok && kunci.size === t.length && Math.max(...t.map((p) => p[0])) - x0 === (kk - 1) * s;
};
/** Silang: satu benda di pusat dan empat lengan miring sepanjang n benda, banyaknya 4n + 1. */
const silangSah = (objs, id, n, s) => {
  const t = titikBenda(objs, id);
  if (t.length !== 4 * n + 1) return false;
  const [cx, cy] = t[0];
  const kunci = new Set();
  for (const [x, y] of t.slice(1)) {
    const dx = (x - cx) / s;
    const dy = (y - cy) / s;
    if (!bulatKan(dx) || Math.abs(Math.abs(dx) - Math.abs(dy)) > 1e-9 || Math.abs(dx) < 1 || Math.abs(dx) > n) return false;
    kunci.add(`${Math.round(dx)},${Math.round(dy)}`);
  }
  return kunci.size === 4 * n;
};
/** Warna tiap sisi cincin berbagi: setiap warna tepat kk - 1 benda dan berurutan per sisi. */
const sisiSah = (objs, id, kk) => {
  const w = objs.filter((o) => new RegExp(`^${id}-o\\d+$`).test(o.id)).map((o) => o.warna);
  return new Set(w).size === 4 && [0, 1, 2, 3].every((s) => new Set(w.slice(s * (kk - 1), (s + 1) * (kk - 1))).size === 1);
};
const segitigaDeret = (objs, id) => {
  const ds = objs.filter((o) => new RegExp(`^${id}-t\\d+$`).test(o.id)).map((o) => titikJalur(o));
  if (ds.some((t) => !t || t.length !== 3)) return null;
  const luas = ds.map((t) => luasPoligon(t));
  const atas = ds.map((t) => t.filter((p) => p[1] === Math.min(...t.map((q) => q[1]))).length);
  return { total: ds.length, tegak: atas.filter((a) => a === 1).length, terbalik: atas.filter((a) => a === 2).length, luasSama: luas.every((l) => Math.abs(l - luas[0]) < 1e-9) };
};
const ubinKisi = (objs, id) => {
  const ds = objs.filter((o) => new RegExp(`^${id}-u\\d+$`).test(o.id)).map((o) => titikJalur(o));
  if (ds.some((t) => !t || t.length !== 4)) return null;
  const jarak = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
  const pusat = ds.map((t) => [(t[0][0] + t[2][0]) / 2, (t[0][1] + t[2][1]) / 2]);
  const belah = ds.every((t, i) => Math.abs((t[1][0] + t[3][0]) / 2 - pusat[i][0]) < 1e-9 && Math.abs((t[1][1] + t[3][1]) / 2 - pusat[i][1]) < 1e-9 && [jarak(t[0], t[1]), jarak(t[1], t[2]), jarak(t[2], t[3]), jarak(t[3], t[0])].every((d) => Math.abs(d - jarak(t[0], t[1])) < 1e-9));
  const luas = ds.map((t) => luasPoligon(t));
  const a = Math.min(...ds.map((t) => Math.abs(t[1][0] - t[3][0]))) / 2;
  const b = Math.min(...ds.map((t) => Math.abs(t[0][1] - t[2][1]))) / 2;
  const x0 = Math.min(...pusat.map((p) => p[0]));
  const y0 = Math.min(...pusat.map((p) => p[1]));
  const kisi = pusat.every((p) => bulatKan((p[0] - x0) / a) && bulatKan((p[1] - y0) / b) && (Math.round((p[0] - x0) / a) + Math.round((p[1] - y0) / b)) % 2 === 0);
  return { total: ds.length, belah, luasSama: luas.every((l) => Math.abs(l - luas[0]) < 1e-9), luasBelah: luas[0], kisi, kembar: new Set(pusat.map((p) => p.join())).size !== pusat.length };
};
const beda = (a) => a.slice(1).map((v, i) => v - a[i]);
const tetap = (a) => new Set(beda(a)).size === 1;

{
  // Data buku (diukur dari gambar PDF) ditulis ulang di sini sebagai pembanding mandiri.
  const MEMBESAR = [[1, 2, 3], [2, 4, 6], [1, 3, 5], [2, 5, 8]];
  const MENGECIL = [[4, 3, 2], [6, 4, 2], [7, 5, 3], [8, 6, 4]];
  sama(G.KELOMPOK_MEMBESAR, MEMBESAR, "data Aktivitas 1");
  sama(G.KELOMPOK_MENGECIL, MENGECIL, "data Aktivitas 2");
  sama(G.LOLIPOP, [9, 7, 5], "data lolipop hlm. 92");
  sama(G.PERMEN_TABEL, [9, 7, 5, 3, 1], "data tabel permen hlm. 93");
  sama(G.JERUK_TABEL, [2, 4, 6, 8, 10, 12, 14], "data tabel jeruk hlm. 90");
  sama(M2.TABEL_AKTIVITAS_SATU.map((b) => [...b]), MEMBESAR.map((b, i) => [String(i + 1), ...b.map(String), String(b[2] + (b[2] - b[1])), String(b[1] - b[0])]), "tabel hitungan Aktivitas 1 dari data");
  sama(M2.TABEL_AKTIVITAS_DUA.map((b) => b.length), [6, 6, 6, 6], "tabel hitungan Aktivitas 2: enam kolom");
  sama([...M3.JAWAB_KOSONG], [4, 7, 1, 2], "jawaban kotak kosong nomor 5 pada berkas gambar");
  cek(U2.WARNA_SISI.length === 4 && new Set(U2.WARNA_SISI).size === 4, "empat warna sisi berbeda");
  for (const b of MEMBESAR) cek(tetap(b) && beda(b)[0] > 0, `Aktivitas 1 ${b}: selisih tetap dan positif`);
  for (const b of MENGECIL) cek(tetap(b) && beda(b)[0] < 0, `Aktivitas 2 ${b}: selisih tetap dan negatif`);
  sama(MEMBESAR.map((b) => beda(b)[0]), [1, 2, 2, 3], "selisih Aktivitas 1: 1, 2, 2, 3");
  sama(MEMBESAR.map((b) => b[2] + beda(b)[0]), [4, 8, 7, 11], "kumpulan ke-4 Aktivitas 1: 4, 8, 7, 11");
  sama(MENGECIL.map((b) => b[2] + beda(b)[0]), [1, 0, 1, 2], "kumpulan ke-4 Aktivitas 2: 1, 0, 1, 2");
  // Aktivitas 1: kelereng tergambar sesuai tabel buku.
  const a1 = T(M, "aktivitas-satu", 2);
  for (let g = 0; g < 4; g += 1) sama([0, 1, 2].map((i) => hitungBenda(a1, `k${g}${i}`)), MEMBESAR[g], `kelereng tergambar kelompok ${g + 1} (Aktivitas 1)`);
  const rak = T(M, "aktivitas-satu", 0);
  sama(["bt1", "bt2", "bt3"].map((id) => hitungBenda(rak, id)), [1, 3, 5], "bintang di atas rak buku: 1, 3, 5");
  const h2 = T(M, "aktivitas-satu-hasil", 2);
  for (let g = 0; g < 4; g += 1) sama([0, 1, 2, 3, 4, 5].map((c) => nilaiId(h2, `h${g}-t${c}`)), [String(g + 1), ...MEMBESAR[g].map(String), String(MEMBESAR[g][2] + beda(MEMBESAR[g])[0]), String(beda(MEMBESAR[g])[0])], `tabel hitungan Aktivitas 1 baris ${g + 1}`);
  // Jeruk.
  const j0 = T(M, "amati-jeruk", 0);
  sama(["j1", "j2", "j3"].map((id) => hitungBenda(j0, id)), [2, 4, 6], "jeruk di papan tulis: 2, 4, 6");
  const j1 = T(M, "amati-jeruk", 1);
  sama(["jr1", "jr2", "jr3", "jr4"].map((id) => hitungBenda(j1, id)), [2, 4, 6, 8], "jeruk kumpulan 1 sampai 4");
  const j2 = T(M, "amati-jeruk", 2);
  cek(j2.filter((o) => /^jp\d-o\d+$/.test(o.id)).length === 14 && [0, 1, 2, 3, 4, 5, 6].every((i) => hitungBenda(j2, `jp${i}`) === 2), "tujuh satuan dua jeruk menjadi empat belas jeruk di gambar");
  sama(2 * 7, 14, "2 ditambah dua sebanyak tujuh kali sama dengan 14");
  const j3 = T(M, "amati-jeruk", 3);
  const tabelJeruk = [2, 4, 6, 8, 10, 12, 14];
  sama(tabelJeruk.map((_, i) => nilaiId(j3, `tb${i + 1}-t1`)), tabelJeruk.map(String), "tabel jeruk hlm. 90: 2, 4, ..., 14");
  sama(tabelJeruk.map((_, i) => nilaiId(j3, `tb${i + 1}-t2`)), tabelJeruk.map((n, i) => (i === 0 ? "2" : `${n - 2} + 2`)), "uraian tabel jeruk: baris sebelumnya ditambah dua");
  cek(tetap(tabelJeruk) && beda(tabelJeruk)[0] === 2, "tabel jeruk: selisih tetap dua");
  // Aktivitas 2.
  const d2 = T(M, "aktivitas-dua", 2);
  for (let g = 0; g < 4; g += 1) sama([0, 1, 2].map((i) => hitungBenda(d2, `d${g}${i}`)), MENGECIL[g], `kelereng tergambar kelompok ${g + 1} (Aktivitas 2)`);
  const d3 = T(M, "aktivitas-dua", 3);
  for (let g = 0; g < 4; g += 1) sama([0, 1, 2, 3, 4, 5].map((c) => nilaiId(d3, `dr${g}-t${c}`)), [String(g + 1), ...MENGECIL[g].map(String), String(MENGECIL[g][2] + beda(MENGECIL[g])[0]), `−${-beda(MENGECIL[g])[0]}`], `tabel hitungan Aktivitas 2 baris ${g + 1}`);
  // Permen.
  const p0 = T(M, "amati-permen", 0);
  sama(["mp1", "mp2", "mp3"].map((id) => hitungBenda(p0, id)), [9, 7, 5], "lolipop: 9, 7, 5");
  const p1 = T(M, "amati-permen", 1);
  const permen = [9, 7, 5, 3, 1];
  sama(permen.map((_, i) => nilaiId(p1, `pt${i + 1}-t1`)), permen.map(String), "tabel permen hlm. 93: 9, 7, 5, 3, 1");
  cek(tetap(permen) && beda(permen)[0] === -2, "tabel permen: selisih tetap kurang dua");
  const p2 = T(M, "amati-permen", 2);
  sama(permen.map((_, i) => hitungBenda(p2, `pr${i}`)), permen, "permen tergambar tiap kumpulan");
  // Ayo Berlatih nomor 1 sampai 4.
  const LAT = { semangka: [4, 8, 12], bola: [1, 5, 9], segitiga: [7, 5, 3], ubin: [13, 10, 7] };
  const KUNCI = { semangka: 16, bola: 13, segitiga: 1, ubin: 4 };
  sama(G.LATIHAN, LAT, "data Ayo Berlatih 1 sampai 4");
  sama(G.KUNCI_LATIHAN, KUNCI, "kunci Panduan Guru hlm. 127-128: 16, 13, 1, 4");
  for (const nama of Object.keys(LAT)) {
    const a = LAT[nama];
    cek(tetap(a), `${nama}: selisih tetap`);
    sama(a[2] + beda(a)[0], KUNCI[nama], `${nama}: kumpulan ke-4 menurut hitungan mandiri sama dengan kunci`);
  }
  sama(Object.values(LAT).map((a) => beda(a)[0]), [4, 4, -2, -3], "selisih nomor 1 sampai 4: 4, 4, -2, -3");
  const s1 = T(M, "berlatih-satu-dua", 1);
  sama(["sm1", "sm2", "sm3"].map((id) => hitungBenda(s1, id)), [4, 8, 12], "semangka tergambar: 4, 8, 12");
  const s2 = T(M, "berlatih-satu-dua", 2);
  sama(hitungBenda(s2, "sm4"), 16, "semangka kumpulan 4 tergambar: 16");
  cek(cincinSah(s2, "sm1", 2, 12) && cincinSah(s2, "sm2", 3, 12) && cincinSah(s2, "sm3", 4, 12) && cincinSah(s2, "sm4", 5, 12), "semangka: bingkai persegi 2, 3, 4, 5 kali sisi dengan 4, 8, 12, 16 benda di tepi");
  const b1 = T(M, "berlatih-satu-dua", 3);
  sama(["bl1", "bl2", "bl3"].map((id) => hitungBenda(b1, id)), [1, 5, 9], "bola tergambar: 1, 5, 9");
  const b2 = T(M, "berlatih-satu-dua", 4);
  sama(hitungBenda(b2, "bl4"), 13, "bola kumpulan 4 tergambar: 13");
  cek([0, 1, 2, 3].every((n) => silangSah(b2, `bl${n + 1}`, n, 9)), "bola: bentuk silang dengan 4n + 1 benda");
  const t0 = T(M, "berlatih-tiga-empat", 0);
  const tg = ["sg1", "sg2", "sg3"].map((id) => segitigaDeret(t0, id));
  sama(tg.map((g) => g.total), [7, 5, 3], "segitiga tergambar: 7, 5, 3");
  sama(tg.map((g) => [g.tegak, g.terbalik]), [[4, 3], [3, 2], [2, 1]], "segitiga: tegak dan terbalik (4+3, 3+2, 2+1)");
  cek(tg.every((g) => g.luasSama), "segitiga: semua segitiga sama luas");
  const t1 = T(M, "berlatih-tiga-empat", 1);
  sama(segitigaDeret(t1, "sg4").total, 1, "segitiga kumpulan 4: 1");
  const u0 = T(M, "berlatih-tiga-empat", 2);
  const ub = ["ub1", "ub2", "ub3"].map((id) => ubinKisi(u0, id));
  sama(ub.map((u) => u.total), [13, 10, 7], "ubin tergambar: 13, 10, 7");
  cek(ub.every((u) => u.belah && u.luasSama && u.kisi && !u.kembar), "ubin: belah ketupat sempurna pada kisi, tanpa kembar");
  const u1 = T(M, "berlatih-tiga-empat", 3);
  const u4 = ubinKisi(u1, "ub4");
  sama([u4.total, u4.belah, u4.kisi], [4, true, true], "ubin kumpulan 4: 4 belah ketupat");
  sama(G.UBIN_PETA.map(G.banyakUbin), [13, 10, 7, 4], "peta ubin: 13, 10, 7, 4");
  // Ayo Berlatih nomor 5.
  const APEL = [[2, 0, 6, 8], [3, 5, 0, 9], [0, 3, 5, 7], [8, 6, 4, 0]];
  const PILIHAN = [7, 2, 4, 1];
  sama(G.APEL_BARIS, APEL, "data nomor 5");
  sama(G.APEL_PILIHAN, PILIHAN, "pilihan nomor 5: 7, 2, 4, 1");
  const isi = APEL.map((b) => {
    const i = b.indexOf(0);
    const ada = b.map((v, c) => [c, v]).filter(([, v]) => v);
    const d = (ada[1][1] - ada[0][1]) / (ada[1][0] - ada[0][0]);
    return b.map((v, c) => (v ? v : ada[0][1] + d * (c - ada[0][0])))[i];
  });
  sama(isi, [4, 7, 1, 2], "kotak kosong nomor 5 menurut hitungan mandiri: 4, 7, 1, 2");
  sama(APEL.map((b, r) => b.map((v) => v || isi[r])).map((b) => tetap(b)), [true, true, true, true], "tiap baris nomor 5 berselisih tetap setelah diisi");
  sama([...G.APEL_KUNCI], isi.map((v) => PILIHAN.indexOf(v)), "pasangan kunci Panduan Guru hlm. 128: baris 1 ke pilihan 3, 2 ke 1, 3 ke 4, 4 ke 2");
  const l0 = T(M, "berlatih-lima", 0);
  sama(l0.filter((o) => /^ap\d-n\d$/.test(o.id) && o.isi === "?").length, 4, "nomor 5: empat kotak kosong bertanda ?");
  const l3 = T(M, "berlatih-lima", 3);
  sama(isi.map((v, r) => nilaiId(l3, `ap${r}-n${APEL[r].indexOf(0)}`)), isi.map(String), "nomor 5: kotak kosong terisi 4, 7, 1, 2 di gambar");
  for (let r = 0; r < 4; r += 1) {
    const ar = l3.find((o) => o.id === `pj${r}`);
    const akhirY = ar.y + ar.y2;
    const opsi = [0, 1, 2, 3].find((i) => Math.abs(l3.find((o) => o.id === `op${i}-k`).y + 11 - akhirY) < 1e-9);
    cek(opsi !== undefined && nilaiId(l3, `op${opsi}-t`) === String(isi[r]), `nomor 5 baris ${r + 1}: panah berakhir di pilihan ${isi[r]}`);
  }
  // Kunci pada gambar adegan diferensiasi.
  const dk = T(M, "diferensiasi", 3);
  sama(["dk1", "dk2", "dk3", "dk4"].map((id) => nilaiId(dk, `${id}-t2`)), ["16", "13", "1", "4"], "tabel kunci di adegan terakhir: 16, 13, 1, 4");
  sama(["dk1", "dk2", "dk3", "dk4"].map((id) => nilaiId(dk, `${id}-t1`)), ["4, 8, 12", "1, 5, 9", "7, 5, 3", "13, 10, 7"], "tabel kunci: tiga kumpulan tiap nomor");

  /* ------------------------------ Metode luar ------------------------------ */
  const po = T(U, "luar-pembuka", 0);
  sama(["po1", "po2", "po3"].map((id) => hitungBenda(po, id)), [1, 3, 5], "luar: bintang 1, 3, 5");
  const ra = T(U, "luar-ulang-terapan", 0);
  sama([hitungBenda(ra, "jx1"), hitungBenda(ra, "jx2")], [2, 2], "luar Pola Berulang: kumpulan pertama dan satuan masing-masing dua jeruk");
  const rb = T(U, "luar-ulang-terapan", 1);
  sama([rb.filter((o) => /^jy\d-o\d+$/.test(o.id)).length, [0, 1, 2, 3, 4, 5, 6].every((i) => hitungBenda(rb, `jy${i}`) === 2)], [14, true], "luar: tujuh satuan dua jeruk, empat belas jeruk");
  const rc = T(U, "luar-ulang-terapan", 3);
  sama([0, 1, 2, 3, 4].map((i) => hitungBenda(rc, `pa${i}`)), [9, 7, 5, 3, 1], "luar: permen 9, 7, 5, 3, 1 (kurang dua berulang)");
  sama(T(U, "luar-ulang", 3).filter((o) => /^rg\d-k$/.test(o.id)).length, 4, "luar: lima kumpulan berarti empat kali pengulangan");
  const gt = T(U, "luar-tumbuh", 1);
  sama([1, 2, 3].map((i) => nilaiId(gt, `gt${i}-t1`)), ["1", "3", "5"], "luar Pola Bertambah: tabel 1, 3, 5");
  sama(["gs2", "gs3"].map((id) => nilaiId(gt, `${id}-t0`)), ["2", "2"], "luar: selisih 2 dan 2");
  const hk = T(U, "luar-tumbuh-terapan", 2);
  const K4 = [2, 5, 8, 11, 14];
  sama([1, 2, 3, 4, 5].map((i) => nilaiId(hk, `h${i}-t1`)), K4.map(String), "luar: kelompok empat 2, 5, 8, 11, 14");
  cek(tetap(K4) && beda(K4)[0] === 3, "luar: kelompok empat selisih tetap tiga");
  sama([2, 3, 4, 5].map((i) => nilaiId(hk, `h${i}-t2`)), ["3", "3", "3", "3"], "luar: selisih kelompok empat selalu tiga");
  sama(8 + 3, 11, "8 + 3 = 11");
  sama(11 + 3, 14, "11 + 3 = 14");
  const hm = T(U, "luar-tumbuh-terapan", 3);
  sama([1, 2, 3, 4].map((i) => nilaiId(hm, `m${i}-t1`)), ["7", "5", "3", "1"], "luar: kelompok tiga mengecil 7, 5, 3, 1");
  const vs = T(U, "luar-struktur", 0);
  cek(cincinSah(vs, "va", 4, 18) && sisiSah(vs, "va", 4), "luar Struktur Visual: bingkai 4 kali 4 (12 benda), empat sisi masing-masing 3");
  const vs1 = T(U, "luar-struktur", 1);
  cek(cincinSah(vs1, "vd", 3, 20) && sisiSah(vs1, "vd", 3), "luar: bingkai 3 kali 3 (8 benda), empat sisi masing-masing 2");
  cek(silangSah(vs1, "ve", 2, 15), "luar: silang dengan satu pusat dan empat lengan sepanjang dua");
  const vs2 = T(U, "luar-struktur", 2);
  cek(cincinSah(vs2, "vf", 3, 22) && sisiSah(vs2, "vf", 3), "luar: bingkai 3 kali 3 dengan empat sisi sama banyak");
  sama(4 * 2, 8, "luar: hitung satu bagian lalu kalikan: 4 kali 2 sama dengan 8");
  const vs3 = T(U, "luar-struktur", 3);
  cek(cincinSah(vs3, "vi1", 2, 14) && cincinSah(vs3, "vi2", 3, 14) && cincinSah(vs3, "vi3", 4, 14), "luar: bagian yang tumbuh 1, 2, 3 pada bingkai 2, 3, 4 kali sisi");
  sama([hitungBenda(vs3, "vi1"), hitungBenda(vs3, "vi2"), hitungBenda(vs3, "vi3")], [4, 8, 12], "luar: jumlah 4, 8, 12 sama dengan 4 kali bagian");
  const wa = T(U, "luar-struktur-terapan", 0);
  cek(cincinSah(wa, "wa", 3, 22) && sisiSah(wa, "wa", 3) && hitungBenda(wa, "wa") === 8, "luar: semangka kumpulan 2: 4 kali 2 sama dengan 8, empat sisi berwarna");
  const wb = T(U, "luar-struktur-terapan", 1);
  cek(cincinSah(wb, "wb", 4, 20) && sisiSah(wb, "wb", 4) && hitungBenda(wb, "wb") === 12, "luar: semangka kumpulan 3: 4 kali 3 sama dengan 12");
  const wc = T(U, "luar-struktur-terapan", 2);
  cek(cincinSah(wc, "wc", 5, 16) && sisiSah(wc, "wc", 5) && hitungBenda(wc, "wc") === 16, "luar: semangka kumpulan 4: 4 kali 4 sama dengan 16");
  const wx = T(U, "luar-struktur-terapan", 3);
  cek([0, 1, 2, 3].every((n) => silangSah(wx, `x${"abcd"[n]}`, n, 8)), "luar: bola sepak silang dengan lengan sepanjang 0, 1, 2, 3");
  sama([0, 1, 2, 3].map((n) => hitungBenda(wx, `x${"abcd"[n]}`)), [1, 5, 9, 13], "luar: bola 1, 5, 9, 13 (1 ditambah 4 kali panjang lengan)");
  sama(1 + 4 * 3, 13, "1 + 4 × 3 = 13");
  const g0 = T(U, "luar-gambar-terapan", 0);
  sama(["ya", "yb", "yc"].map((id) => hitungBenda(g0, id)), [1, 5, 9], "luar Gambar Suku Berikutnya: bola 1, 5, 9");
  const g1 = T(U, "luar-gambar-terapan", 1);
  cek(silangSah(g1, "yg", 3, 14) && hitungBenda(g1, "yg") === 13, "luar: gambar kumpulan keempat bola 13 dan sama dengan tebakan 9 + 4");
  const g2 = T(U, "luar-gambar-terapan", 2);
  cek(cincinSah(g2, "zk", 5, 15) && hitungBenda(g2, "zk") === 16, "luar: gambar bingkai 5 kali 5 berisi 16 sama dengan tebakan 12 + 4");
  const g3 = T(U, "luar-gambar-terapan", 3);
  const gu = ubinKisi(g3, "zq");
  cek(gu.total === 4 && gu.belah && gu.kisi, "luar: gambar empat ubin sama dengan tebakan 7 - 3");
  const rr = T(U, "luar-ringkas", 1);
  sama([1, 2, 3, 4].map((i) => nilaiId(rr, `rt${i}-t1`)), ["2, 4, 6, ..., 14", "2, 5, 8 (lalu 11, 14)", "4, 8, 12, 16", "1, 5, 9, 13"], "luar: tabel angka buku yang dipakai");
  stat.data += 1;
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
  // Kelas IV: Buku Siswa hlm. N = PDF N+12 (hlm. 85-94 = PDF 97-106; subbab B mulai PDF 107); Panduan Guru hlm. N = PDF N+12 (hlm. 121-129 = PDF 133-141; subbab B mulai di tengah PDF 141).
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 97, 106), ambil(bg, 133, 141), ambil(bs, 107, 107), ambil(bg, 141, 141)] : [null];
  if (bagian.some((b) => b === null)) console.log("PDF atau pembaca PDF tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const guruPenuh = bersih(bagian[1]);
    const awalB = guruPenuh.indexOf("b. pola bilangan");
    cek(awalB > 0, "Panduan Guru PDF 141 memuat judul subbab B");
    const siswa = bersih(bagian[0]);
    const guru = guruPenuh.slice(0, awalB);
    const buku = `${siswa}\n${guru}`;
    let n = 0;
    for (const a of M.adegan) {
      for (const kt of a.kutipan ?? []) {
        n += 1;
        cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
      }
    }
    stat.kutipan = n;
    cek(n >= 120, `jumlah kutipan buku yang diperiksa (${n})`);
    cek(M.adegan.every((a) => (a.kutipan ?? []).length >= 5), "tiap adegan materi memuat paling sedikit 5 kutipan buku");
    cek(/b\. pola bilangan/.test(bersih(bagian[2])) && /b\. pola bilangan/.test(guruPenuh), "subbab B mulai di Buku Siswa PDF 107 dan Panduan Guru PDF 141");
    cek(!/b\. pola bilangan/.test(siswa), "Buku Siswa PDF 97-106 tidak memuat judul subbab B");
    // Angka kunci dan istilah yang dipakai video.
    for (const t of ["1. banyak buah selanjutnya sesuai pola gambar adalah 16", "2. banyak bola selanjutnya sesuai pola gambar adalah 13", "3. banyak segitiga selanjutnya sesuai pola gambar adalah 1", "4. banyak ubin selanjutnya sesuai pola gambar adalah 4", "tinggal menambahkan 2 buah jeruk sesuai pola tersebut", "2 + 2 + 2 + 2 + 2 + 2 + 2 atau 14 ya bu??"]) {
      cek(guru.includes(t) || siswa.includes(t), `Panduan Guru atau Buku Siswa memuat "${t}"`);
    }
    cek(siswa.includes("buatlah 4 kelompok beranggotakan 5-6 orang") && siswa.includes("2 + 2 + 2 + 2 + 2 + 2 + 2 atau 14 ya bu??"), "Buku Siswa memuat empat kelompok dan hitungan jeruk 14");
    // Keganjilan buku yang dicatat di video.
    cek(guru.includes("pilhan kotak yang sesuai"), "Panduan Guru hlm. 128: kata pilihan tertulis 'pilhan'");
    cek((guru.match(/pada bagian ini guru perlu mengarahkan peserta didik terkait pola gambar membesar/g) ?? []).length === 2 && (guru.match(/contoh lain dari pola gambar yang mengecil/g) ?? []).length === 1, "Panduan Guru hlm. 127: blok pola mengecil membuka dengan kalimat pola gambar membesar");
    cek(guru.includes("banyak ilmuwan yang memanfaatkan pola bilangan") && guruPenuh.slice(awalB).includes("banyak ilmuwan yang memanfaatkan pola bilangan"), "Panduan Guru hlm. 124: kalimat ilmuwan memakai pola bilangan disalin dari subbab B");
    cek(siswa.includes("membuat pola gambar membesar dan mengecil") && !/buatlah|membuat/.test(bersih(ambil(bs, 105, 106))), "Buku Siswa: tujuan menyebut membuat pola gambar, Latihan 1 (hlm. 93-94) tidak ada soal membuat");
    cek(/pada soal nomor 1 sampai 4 peserta didik diminta untuk menentukan/.test(guru), "Panduan Guru hlm. 127: nomor 1 sampai 4 hanya meminta menentukan");
    cek(!/kunci/.test(bersih(ambil(bs, 99, 104))), "Buku Siswa hlm. 87-92: Aktivitas 1 dan 2 tanpa kunci (hitungan mandiri)");
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k4b3a-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k4b3a-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k4b3a sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k4b3a.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_A43|video-k4b2-umum|naskah-k4b3/.test(pembungkus) && /VIDEO_MATERI_K4B3A/.test(pembungkus) && /VIDEO_LUAR_K4B3A/.test(pembungkus) && /export function VideoK4B3A/.test(pembungkus), "video-k4b3a.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k4b3a.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k4b3a.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k4b3a.mjs: akhir baris LF");
}

for (const v of [M, U]) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.kutipan} kutipan terhadap teks PDF, ${stat.terbilang} bilangan berkata, ${stat.persamaan} persamaan, ${stat.teksPasang} pasangan teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
