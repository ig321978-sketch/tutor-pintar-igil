// Uji Story Kelas 4 Bab 2 Sub-Bab A (Pecahan dengan Pembilang Satu, termasuk pembuka bab): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar (angka dan bilangan yang diucapkan dengan kata), perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, tidak membocorkan materi sub-bab B sampai E (penyebut sama, senilai, desimal, persen) di luar pembuka, peta konsep, dan Panduan Guru awal,
// kutipan buku terhadap teks PDF (pdftotext, atau PyMuPDF bila tidak ada), geometri dan banyak bagian gambar pecahan (kisi, segitiga, kincir, kipas, lingkaran, garis bilangan, orang berbagi) dihitung ulang dari gambar,
// hitungan mandiri kunci Panduan Guru (tanda lebih dari dan kurang dari, soal Tiara), ukuran gambar nomor 3 dari PDF, emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k4b2a.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b2a-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K4B2A, V.VIDEO_LUAR_K4B2A];
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
const G = await import("../src/components/modul/story/k4b2a-gambar.ts");
const M1 = await import("../src/components/modul/story/k4b2a-materi-1.ts");
const U1 = await import("../src/components/modul/story/k4b2a-luar-1.ts");
const M_VIDEO = V.VIDEO_MATERI_K4B2A;
// Adegan administratif (pembuka, tujuan, peta konsep, panduan awal; di E: rubrik, refleksi, orang tua dan penutup) tidak lagi diputar di video materi.
// Adegannya tetap ada di berkas materi, jadi pemeriksaan isi memakai daftar penuh; hanya jumlah dan urutan adegan diuji terhadap video yang diputar.
const MODUL_MATERI = Object.assign({}, await import("../src/components/modul/story/k4b2a-materi-1.ts"), await import("../src/components/modul/story/k4b2a-materi-2.ts"), await import("../src/components/modul/story/k4b2a-materi-3.ts"));
const M = { ...M_VIDEO, adegan: [MODUL_MATERI.ADEGAN_PEMBUKA, MODUL_MATERI.ADEGAN_PETA, MODUL_MATERI.ADEGAN_PANDUAN_AWAL, MODUL_MATERI.ADEGAN_AKTIVITAS_SATU, MODUL_MATERI.ADEGAN_AMATI_PIZZA, MODUL_MATERI.ADEGAN_PEMBILANG, MODUL_MATERI.ADEGAN_BERLATIH_BENTUK, MODUL_MATERI.ADEGAN_BANDING_BESAR, MODUL_MATERI.ADEGAN_BANDING_KECIL, MODUL_MATERI.ADEGAN_BERLATIH_BANDING_SATU, MODUL_MATERI.ADEGAN_BERLATIH_BANDING_DUA, MODUL_MATERI.ADEGAN_DIFERENSIASI] };
const U = V.VIDEO_LUAR_K4B2A;
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
  const METODE = ["Unit Fraction", "Area Model", "Number Line Unit", "Fair Sharing"];
  const NAMA_ID = ["Pecahan Satuan", "Model Daerah", "Pecahan di Garis", "Bagi Adil"];
  cek(!/Unit Fraction|Area Model|Number Line Unit|Fair Sharing|Pecahan Satuan|Model Daerah|Pecahan di Garis|Bagi Adil|metode luar|metode dari luar|Van de Walle/i.test(materi), "video materi tidak memuat nama metode luar");
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
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber)), "video materi: label sumber berbentuk Materi: ...");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  cek(U.adegan.every((a) => a.sumber.length <= 46), "video metode luar: label sumber cukup pendek untuk kanvas 300 lebar");
  cek(M_VIDEO.adegan.every((a) => a.sumber.length <= 46), "video materi: label sumber cukup pendek untuk kanvas 300 lebar");
  for (const kata of ["Peta konsep", "Kata kunci", "Apersepsi", "Ayo Berlatih", "Ayo Berpikir", "Miskonsepsi", "Diferensiasi", "Refleksi", "Subbab", "Tujuan pembelajaran", "Panduan guru", "Aktivitas"]) cek(!luar.includes(kata), `video metode luar tidak memuat "${kata}" milik materi`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-satuan", "luar-satuan-terapan", "luar-daerah", "luar-daerah-terapan", "luar-garis", "luar-garis-terapan", "luar-bagi", "luar-bagi-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[0].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  cek(M_VIDEO.adegan.length === 9 && U.adegan.length === 10, "9 adegan materi diputar dan 10 adegan metode luar");
  cek(M.id === "k4b2a-materi" && U.id === "k4b2a-luar", "id video k4b2a-materi dan k4b2a-luar");
  // Sub-Bab A tidak membocorkan materi sub-bab B sampai E. Pembuka bab, peta konsep, dan Panduan Guru awal boleh menyebut desimal, persen, senilai, dan penyebut sama sebagai judul, tujuan, kata kunci, cabang peta, dan macam pecahan.
  const BOCOR = /senilai|ekuivalen|persepuluhan|perseratusan|persen|desimal|penyebut sama|penyebut yang sama|uji kompetensi|refleksi|pengayaan|remedial|tongkat|coklat/i;
  const boleh = ["pembuka-bab", "peta-konsep", "panduan-awal"];
  for (const a of M.adegan.filter((x) => !boleh.includes(x.id))) cek(!BOCOR.test(teksAdegan(a)), `materi ${a.id} tidak membocorkan sub-bab B sampai E`);
  for (const a of U.adegan) cek(!BOCOR.test(teksAdegan(a)), `metode luar ${a.id} tidak membocorkan sub-bab B sampai E`);
  cek(/desimal/i.test(teksAdegan(adegan(M, "pembuka-bab"))) && /desimal/i.test(teksAdegan(adegan(M, "peta-konsep"))), "pembuka bab dan peta konsep menyebut desimal sebagai tujuan, kata kunci, dan cabang peta");
  cek(totalKetukan >= 70, `total ketukan cukup dalam (${totalKetukan})`);
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "aktivitas-satu,amati-pizza,pembilang-penyebut,berlatih-bentuk,banding-besar,banding-kecil,berlatih-banding-satu,berlatih-banding-dua,diferensiasi", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "luar-pembuka,luar-satuan,luar-satuan-terapan,luar-daerah,luar-daerah-terapan,luar-garis,luar-garis-terapan,luar-bagi,luar-bagi-terapan,luar-ringkas", "urutan adegan metode luar");
  // Tiga nama metode lama sama dengan naskah bab; nama metode baru belum dipakai naskah, judul, atau lab lain pada bab ini.
  const modul = new URL("../src/components/modul/", import.meta.url);
  const baca = (n) => readFileSync(new URL(n, modul), "utf8");
  const naskah = baca("naskah-k4b2.ts");
  cek(/Unit Fraction/.test(naskah) && /Area Model/.test(naskah) && /Number Line Unit/.test(naskah), "tiga nama metode lama sama dengan nama di naskah bab");
  cek(/Pecahan Satuan/.test(naskah) && /Model Daerah/.test(naskah) && /Pecahan di Garis/.test(naskah), "tiga nama Indonesia metode lama sama dengan naskah bab");
  const berkasLab = readdirSync(modul).filter((f) => /^lab-.*k4b2.*\.ts$/.test(f));
  cek(berkasLab.length >= 4, `berkas lab bab 2 ditemukan (${berkasLab.length})`);
  for (const n of ["naskah-k4b2.ts", ...berkasLab]) cek(!/Fair Sharing|Bagi Adil/i.test(baca(n)), `nama metode baru Fair Sharing / Bagi Adil tidak bentrok dengan ${n}`);
  for (const ad of [...M.adegan, ...U.adegan]) cek(!/Fair Sharing|Bagi Adil/i.test(ad.judul) || U.adegan.includes(ad), `judul ${ad.id}: nama metode baru hanya di video metode luar`);
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

/* ------------------------------ Bentuk pecahan pada gambar dihitung ulang ------------------------------ */
const ARSIR = "#FFC800";
const bulatKan = (v) => Math.abs(v - Math.round(v)) < 1e-6;
const luasPoligon = (t) => Math.abs(t.reduce((s, p, i) => s + (p[0] * t[(i + 1) % t.length][1] - t[(i + 1) % t.length][0] * p[1]), 0)) / 2;
/** Kisi: banyak sel, kolom, baris, sel sama besar dan rapi, banyak sel berwarna arsir, lebar dan tinggi seluruh kisi. */
const kisiInfo = (objs, id) => {
  const c = objs.filter((o) => new RegExp(`^${id}-c\\d+$`).test(o.id));
  if (!c.length) return null;
  const w = c[0].w;
  const h = c[0].h;
  const x0 = Math.min(...c.map((o) => o.x));
  const y0 = Math.min(...c.map((o) => o.y));
  const kol = new Set(c.map((o) => o.x)).size;
  const bar = new Set(c.map((o) => o.y)).size;
  return {
    n: c.length,
    kol,
    bar,
    sama: c.every((o) => Math.abs(o.w - w) < 1e-9 && Math.abs(o.h - h) < 1e-9),
    rapi: kol * bar === c.length && c.every((o) => bulatKan((o.x - x0) / w) && bulatKan((o.y - y0) / h)),
    arsir: c.filter((o) => o.warna === ARSIR).length,
    lebar: kol * w,
    tinggi: bar * h,
    sel: w,
  };
};
const kisiOk = (objs, id, kol, bar, arsir) => {
  const i = kisiInfo(objs, id);
  return !!i && i.n === kol * bar && i.kol === kol && i.bar === bar && i.sama && i.rapi && i.arsir === arsir;
};
/** Juring: banyak, sudut tiap juring (derajat), jari-jari sama, pusat sama, banyak berwarna arsir. */
const juringInfo = (objs, id) => {
  const j = objs.filter((o) => new RegExp(`^${id}-j\\d+$`).test(o.id));
  if (!j.length) return null;
  const sudut = j.map((o) => {
    const n = bilangan(o.d);
    const a0 = Math.atan2(n[3], n[2]);
    const a1 = Math.atan2(n[10], n[9]);
    let d = ((a1 - a0) * 180) / Math.PI;
    d = ((d % 360) + 360) % 360;
    return { d: d === 0 ? 360 : d, r: n[4], besar: n[7], x: o.x, y: o.y };
  });
  return {
    n: j.length,
    total: sudut.reduce((s, q) => s + q.d, 0),
    sama: sudut.every((q) => Math.abs(q.d - sudut[0].d) < 0.2 && Math.abs(q.r - sudut[0].r) < 1e-9 && q.x === sudut[0].x && q.y === sudut[0].y),
    sudut: sudut[0].d,
    besarSah: sudut.every((q) => q.besar === (q.d > 180.5 ? 1 : 0)),
    arsir: j.filter((o) => o.warna === ARSIR).length,
  };
};
const lingkaranOk = (objs, id, n, arsir) => {
  const i = juringInfo(objs, id);
  return !!i && i.n === n && i.sama && i.besarSah && Math.abs(i.total - 360) < 0.5 && i.arsir === arsir;
};
/** Segitiga terbagi: banyak bagian, semua sama luas, jumlah luas, arsir, banyak titik sudut bersama. */
const segitigaInfo = (objs, id) => {
  const g = objs.filter((o) => new RegExp(`^${id}-g\\d+$`).test(o.id)).map((o) => ({ t: titikJalur(o), o }));
  if (!g.length || g.some((q) => !q.t || q.t.length !== 3)) return null;
  const luas = g.map((q) => luasPoligon(q.t));
  const semua = g.flatMap((q) => q.t);
  const lebar = Math.max(...semua.map((p) => p[0])) - Math.min(...semua.map((p) => p[0]));
  const tinggi = Math.max(...semua.map((p) => p[1])) - Math.min(...semua.map((p) => p[1]));
  const kunci = (p) => p.map((v) => Math.round(v * 100)).join();
  const bersama = g.map((q) => q.t.map(kunci)).reduce((a, b) => a.filter((p) => b.includes(p)));
  return { n: g.length, sama: luas.every((l) => Math.abs(l - luas[0]) < luas[0] * 0.005), jumlah: luas.reduce((s, l) => s + l, 0), setengahBb: (lebar * tinggi) / 2, arsir: g.filter((q) => q.o.warna === ARSIR).length, bersama: bersama.length };
};
const pecahanDari = (objs, id) => [nilaiId(objs, `${id}-a`), nilaiId(objs, `${id}-b`)];
const pecahanSama = (objs, id, atas, bawah) => {
  const [a, b] = pecahanDari(objs, id);
  return a === String(atas) && b === String(bawah);
};
const tandaDari = (a, b) => (a < b ? ">" : a > b ? "<" : "=");
const objAda = (objs, id) => objs.find((o) => o.id === id);

{
  // Data buku (diukur dari gambar PDF) ditulis ulang di sini sebagai pembanding mandiri.
  sama(G.BENTUK_LATIHAN.map((b) => [...b]), [[2, 1], [4, 1], [10, 1], [3, 1], [5, 1]], "Ayo Berlatih hlm. 59-60: bagian dan arsiran nomor 1 sampai 5");
  sama(G.BENTUK_LATIHAN.map(([n, a]) => `${a}/${n}`), ["1/2", "1/4", "1/10", "1/3", "1/5"], "kunci Panduan Guru hlm. 94-95: 1/2, 1/4, 1/10, 1/3, 1/5");
  sama(G.AMATI_PASANG.map((p) => [...p]), [[2, 4], [10, 5]], "Ayo Mengamati hlm. 60-61: penyebut 2 lawan 4 dan 10 lawan 5");
  sama({ satu: [...G.BANDING_GAMBAR.satu], dua: [...G.BANDING_GAMBAR.dua], tiga: [...G.BANDING_GAMBAR.tiga] }, { satu: [2, 3], dua: [6, 3], tiga: [2, 3, 4] }, "Ayo Berlatih hlm. 62 nomor 1 sampai 3");
  sama(G.BANDING_SOAL.map((b) => [...b]), [[5, 3], [4, 5], [8, 2], [10, 5], [11, 13]], "nomor 4 a sampai e: penyebut");
  sama([...G.BANDING_KUNCI], ["<", ">", "<", "<", ">"], "kunci Panduan Guru hlm. 96 nomor 4: <, >, <, <, >");
  sama(G.BANDING_SOAL.map(([a, b]) => tandaDari(a, b)), ["<", ">", "<", "<", ">"], "hitungan mandiri nomor 4: penyebut lebih kecil berarti pecahan lebih besar");
  sama([G.TIARA.bawang, G.TIARA.gula], [2, 4], "nomor 5: bawang putih 1/2 kg, gula 1/4 kg");
  cek(1000 / G.TIARA.bawang > 1000 / G.TIARA.gula, "nomor 5: 500 gram lebih berat daripada 250 gram, jadi bawang putih");
  sama([1000 / 2, 1000 / 4], [500, 250], "hitungan mandiri nomor 5 dalam gram");
  // Pembuka, Aktivitas 1, pizza.
  const b0 = T(M, "pembuka-bab", 0);
  cek(lingkaranOk(b0, "pz", 8, 1), "pembuka: pizza tergambar 8 juring sama besar, 1 diarsir");
  const bt = T(M, "pembuka-bab", 1);
  sama([nilaiId(bt, "t1-t0"), nilaiId(bt, "t2-t0")], ["5 butir pertama:", "5 butir berikutnya:"], "tujuan Buku Siswa: 5 butir dan 5 butir");
  sama(5 + 5, 10, "5 + 5 = 10 butir tujuan");
  sama(nilaiId(bt, "t3-t0"), "total 10 butir; subbab A: 2 butir pertama", "total tujuan Buku Siswa di gambar");
  const ak3 = T(M, "aktivitas-satu", 2);
  sama([...M1.CONTOH_ANGGOTA], [2, 3, 4, 6], "contoh lingkaran empat anggota: 2, 3, 4, 6 bagian");
  for (let i = 0; i < 4; i += 1) cek(lingkaranOk(ak3, `co${i + 1}`, M1.CONTOH_ANGGOTA[i], 1), `Aktivitas 1 contoh anggota ${i + 1}: lingkaran ${M1.CONTOH_ANGGOTA[i]} juring sama, 1 diarsir`);
  const ak5 = T(M, "aktivitas-satu", 4);
  sama([1, 2, 3, 4].map((n) => nilaiId(ak5, `tr${n}-t1`)), ["1/2", "1/3", "1/4", "1/6"], "contoh isi tabel Hasil Aktivitas: 1/2, 1/3, 1/4, 1/6");
  const ak2 = T(M, "aktivitas-satu", 1);
  cek(["lg0", "lg1", "lg2", "lg3"].every((id) => objAda(ak2, id)), "Aktivitas 1: lingkaran origami dengan garis lewat titik pusat");
  const pz0 = T(M, "amati-pizza", 0);
  cek(lingkaranOk(pz0, "pa", 4, 0) && !objAda(pz0, "pa0"), "pizza buku: 4 juring sama besar (pizza utuh diganti potongan)");
  sama(pz0.filter((o) => /^ps\d$/.test(o.id)).length, 4, "pizza buku: 4 siswa");
  const pz2 = T(M, "amati-pizza", 2);
  cek(lingkaranOk(pz2, "pu", 4, 1) && pecahanSama(pz2, "pf", 1, 4), "pizza: 1 dari 4 bagian ditulis 1 per 4");
  sama(nilaiId(T(M, "amati-pizza", 1), "pj-t0"), "tiap anak mendapatkan 1 …", "jawaban murid belum selesai");
  cek(pecahanSama(T(M, "pembilang-penyebut", 0), "pb", 1, 4), "pembilang dan penyebut: 1 di atas 4");
  cek(lingkaranOk(T(M, "pembilang-penyebut", 1), "pp", 4, 1), "pembilang dan penyebut: pizza kecil 4 juring, 1 diarsir");
  const pq = T(M, "pembilang-penyebut", 2);
  sama([1, 2, 3, 4, 5].map((i) => pecahanDari(pq, `pq${i}`).join("/")), ["1/2", "1/3", "1/4", "1/5", "1/10"], "pecahan pembilang satu contoh: 1/2, 1/3, 1/4, 1/5, 1/10");
  // Ayo Berlatih nomor 1 sampai 5 (bentuk pecahan).
  const bl0 = T(M, "berlatih-bentuk", 0);
  const sg = segitigaInfo(bl0, "b1");
  cek(sg && sg.n === 2 && sg.sama && Math.abs(sg.jumlah - sg.setengahBb) < sg.setengahBb * 0.005 && sg.arsir === 1 && pecahanSama(bl0, "b1r", 1, 2), "nomor 1: segitiga terbagi 2 bagian sama luas, 1 diarsir, 1/2");
  const bl1 = T(M, "berlatih-bentuk", 1);
  cek(kisiOk(bl1, "b2", 4, 1, 1) && pecahanSama(bl1, "b2r", 1, 4), "nomor 2: kisi 4 sel, 1 diarsir, 1/4");
  cek(kisiOk(bl1, "b3", 5, 2, 1) && pecahanSama(bl1, "b3r", 1, 10), "nomor 3: kisi 5 kolom 2 baris = 10 sel, 1 diarsir, 1/10");
  sama(5 * 2, 10, "5 kali 2 sama dengan 10");
  const bl2 = T(M, "berlatih-bentuk", 2);
  const kc = segitigaInfo(bl2, "b4");
  cek(kc && kc.n === 3 && kc.sama && kc.arsir === 1 && kc.bersama === 1 && pecahanSama(bl2, "b4r", 1, 3), "nomor 4: kincir 3 segitiga sama luas dengan satu titik pusat, 1 diarsir, 1/3");
  const kp = juringInfo(bl2, "b5");
  cek(kp && kp.n === 5 && kp.sama && kp.arsir === 1 && Math.abs(kp.total - 110) < 0.5 && pecahanSama(bl2, "b5r", 1, 5), "nomor 5: kipas 5 kelopak sama sudut, 1 diarsir, 1/5");
  const bl3 = T(M, "berlatih-bentuk", 3);
  [[2, 1], [4, 1], [10, 1], [3, 1], [5, 1]].forEach(([n, a], i) => sama([nilaiId(bl3, `kt${i + 1}-t0`), nilaiId(bl3, `kt${i + 1}-t1`), nilaiId(bl3, `kt${i + 1}-t2`), nilaiId(bl3, `kt${i + 1}-t3`)], [String(i + 1), String(n), String(a), `${a}/${n}`], `tabel kunci nomor ${i + 1}`));
  // Membandingkan 1/2 dan 1/4, 1/10 dan 1/5.
  const d1 = T(M, "banding-besar", 0);
  const d1a = kisiInfo(d1, "d1");
  const d1b = kisiInfo(d1, "d2");
  cek(kisiOk(d1, "d1", 2, 1, 1) && kisiOk(d1, "d2", 4, 1, 1) && d1a.lebar === d1b.lebar && d1a.tinggi === d1b.tinggi, "banding: dua batang sama besar, dibagi 2 dan 4, masing-masing 1 diarsir");
  cek(pecahanSama(d1, "d1r", 1, 2) && pecahanSama(d1, "d2r", 1, 4), "banding: label 1/2 dan 1/4");
  cek(d1a.sel * d1a.arsir > d1b.sel * d1b.arsir, "banding: arsiran 1/2 lebih lebar daripada 1/4 (60 lawan 30)");
  const d3 = T(M, "banding-besar", 2);
  cek(kisiOk(d3, "d3p", 2, 1, 1) && kisiOk(d3, "d3q", 4, 1, 1) && kisiInfo(d3, "d3p").lebar === kisiInfo(d3, "d3q").lebar, "banding: batang kecil sama panjang, 2 dan 4 bagian");
  cek(pecahanSama(d3, "d3a", 1, 2) && pecahanSama(d3, "d3b", 1, 4) && nilaiId(d3, "d3c") === tandaDari(2, 4), "banding: 1/2 lebih dari 1/4 (tanda >) menurut penyebut");
  const e1 = T(M, "banding-kecil", 0);
  cek(kisiOk(e1, "e1", 10, 1, 1) && kisiOk(e1, "e2", 5, 1, 1) && kisiInfo(e1, "e1").lebar === kisiInfo(e1, "e2").lebar, "banding: batang sama panjang dibagi 10 dan 5, masing-masing 1 diarsir");
  cek(pecahanSama(e1, "e1r", 1, 10) && pecahanSama(e1, "e2r", 1, 5), "banding: label 1/10 dan 1/5");
  cek(kisiInfo(e1, "e1").sel < kisiInfo(e1, "e2").sel, "banding: arsiran 1/10 lebih sempit daripada 1/5 (18 lawan 36)");
  const e3 = T(M, "banding-kecil", 2);
  cek(pecahanSama(e3, "e3a", 1, 10) && pecahanSama(e3, "e3b", 1, 5) && nilaiId(e3, "e3c") === tandaDari(10, 5), "banding: 1/10 kurang dari 1/5 (tanda <) menurut penyebut");
  cek(kisiOk(e3, "e3p", 10, 1, 1) && kisiOk(e3, "e3q", 5, 1, 1) && kisiInfo(e3, "e3p").lebar === kisiInfo(e3, "e3q").lebar, "banding: batang kecil 10 dan 5 bagian sama panjang");
  const e4 = T(M, "banding-kecil", 3);
  for (const [r, [a, b]] of [[1, [2, 4]], [2, [5, 10]]]) {
    const sel = [0, 1, 2].map((c) => nilaiId(e4, `er${r}-t${c}`));
    sama(sel, [`1/${a} dan 1/${b}`, `${a} dan ${b}`, `1/${Math.min(a, b)}`], `ringkas baris ${r}: yang penyebutnya lebih kecil lebih besar`);
  }
  // Ayo Berlatih nomor 1 sampai 3 (membandingkan gambar).
  const l0 = T(M, "berlatih-banding-satu", 0);
  const l0a = segitigaInfo(l0, "n1a");
  const l0b = segitigaInfo(l0, "n1b");
  cek(l0a && l0b && l0a.n === 2 && l0b.n === 3 && l0a.sama && l0b.sama && l0a.arsir === 1 && l0b.arsir === 1 && Math.abs(l0a.jumlah - l0b.jumlah) < l0a.jumlah * 0.005, "nomor 1: dua segitiga sama luas, dibagi 2 dan 3 bagian sama luas, masing-masing 1 diarsir");
  const l1 = T(M, "berlatih-banding-satu", 1);
  cek(pecahanSama(l1, "n1x", 1, 2) && pecahanSama(l1, "n1y", 1, 3) && nilaiId(l1, "n1s") === tandaDari(2, 3), "nomor 1: 1/2 lebih dari 1/3 (kunci buku)");
  const l2 = T(M, "berlatih-banding-satu", 2);
  const k2a = kisiInfo(l2, "n2a");
  const k2b = kisiInfo(l2, "n2b");
  cek(kisiOk(l2, "n2a", 3, 2, 1) && kisiOk(l2, "n2b", 3, 1, 1) && k2a.lebar === k2b.lebar && k2a.tinggi === k2b.tinggi, "nomor 2: kisi 3 kolom 2 baris (6 bagian) dan batang 3 bagian, keseluruhan sama besar");
  cek(pecahanSama(l2, "n2ar", 1, 6) && pecahanSama(l2, "n2br", 1, 3) && nilaiId(l2, "n2s") === tandaDari(6, 3), "nomor 2: 1/6 kurang dari 1/3 (kunci buku)");
  const l3 = T(M, "berlatih-banding-satu", 3);
  const k3 = [2, 3, 4].map((n, i) => kisiInfo(l3, `n3${"abc"[i]}`));
  cek([2, 3, 4].every((n, i) => kisiOk(l3, `n3${"abc"[i]}`, n, 1, 1)) && k3.every((q) => q.lebar === k3[0].lebar), "nomor 3: tiga batang sama panjang dibagi 2, 3, 4, masing-masing 1 diarsir");
  sama(["n3x", "n3y", "n3z"].map((id) => nilaiId(l3, id)), ["1/2", "1/3", "1/4"], "nomor 3: label 1/2, 1/3, 1/4");
  sama(nilaiId(l3, "n3o-t0"), "1/2 > 1/3 > 1/4", "nomor 3: urutan 1/2 > 1/3 > 1/4 (kunci buku)");
  cek(G.BANDING_GAMBAR.tiga.every((n, i, a) => i === 0 || a[i - 1] < n), "nomor 3: penyebut naik berarti pecahan turun (hitungan mandiri)");
  // Nomor 4 dan 5.
  const KUNCI = ["<", ">", "<", "<", ">"];
  const n4 = [T(M, "berlatih-banding-dua", 0), T(M, "berlatih-banding-dua", 1), T(M, "berlatih-banding-dua", 2)];
  const pilih = [[n4[0], "n4a"], [n4[1], "n4b"], [n4[1], "n4c"], [n4[2], "n4d"], [n4[2], "n4e"]];
  pilih.forEach(([objs, id], i) => {
    const [a, b] = G.BANDING_SOAL[i];
    cek(pecahanSama(objs, `${id}a`, 1, a) && pecahanSama(objs, `${id}b`, 1, b), `nomor 4 bagian ${"abcde"[i]}: pecahan 1/${a} dan 1/${b} di gambar`);
    sama(nilaiId(objs, `${id}s`), KUNCI[i], `nomor 4 bagian ${"abcde"[i]}: tanda menurut kunci`);
    sama(nilaiId(objs, `${id}s`), tandaDari(a, b), `nomor 4 bagian ${"abcde"[i]}: tanda menurut hitungan mandiri`);
  });
  const n4k = T(M, "berlatih-banding-dua", 3);
  G.BANDING_SOAL.forEach(([a, b], i) => sama([nilaiId(n4k, `nk${i + 1}-t0`), nilaiId(n4k, `nk${i + 1}-t1`), nilaiId(n4k, `nk${i + 1}-t2`)], ["abcde"[i], `1/${a} dan 1/${b}`, KUNCI[i]], `tabel kunci nomor 4 bagian ${"abcde"[i]}`));
  const n5 = T(M, "berlatih-banding-dua", 4);
  cek(kisiOk(n5, "tbk", 2, 1, 1) && kisiOk(n5, "tgk", 4, 1, 1) && kisiInfo(n5, "tbk").lebar === kisiInfo(n5, "tgk").lebar, "nomor 5: dua batang sama panjang, 1/2 dan 1/4 diarsir");
  sama([nilaiId(n5, "tb-t1"), nilaiId(n5, "tg-t1")], ["1/2 kg", "1/4 kg"], "nomor 5: 1/2 kg dan 1/4 kg");
  sama(nilaiId(n5, "tj-t0"), "bawang putih lebih berat", "nomor 5: jawaban bawang putih");
  const df = T(M, "diferensiasi", 5);
  sama([nilaiId(df, "dm2-t0"), nilaiId(df, "dm2-t1")], ["1/3 pada batang pendek,", "1/4 pada batang panjang"], "kesalahan umum: keseluruhan berbeda, arsiran tampak sama luas");
  const dk = T(M, "diferensiasi", 3);
  sama([nilaiId(dk, "dk2-t0"), nilaiId(dk, "dk2-t1")], ["benar: 1/5 lebih kecil", "daripada 1/3"], "kesalahan umum: 1/5 lebih kecil daripada 1/3");
  cek(tandaDari(5, 3) === "<", "hitungan mandiri: penyebut 5 lebih besar daripada 3, jadi 1/5 kurang dari 1/3");

  /* ------------------------------ Metode luar ------------------------------ */
  const po = T(U, "luar-pembuka", 0);
  cek(kisiOk(po, "po1", 2, 1, 1) && kisiOk(po, "po2", 4, 1, 1) && kisiInfo(po, "po1").lebar === kisiInfo(po, "po2").lebar, "luar pembuka: dua batang sama panjang, 1/2 lawan 1/4");
  cek(kisiOk(T(U, "luar-satuan", 0), "sa", 4, 1, 1), "luar Unit Fraction: batang 4 sel, 1 diarsir");
  const s2 = T(U, "luar-satuan", 1);
  const su = [0, 1, 2, 3].map((i) => objAda(s2, `su${i}`).w);
  cek(kisiOk(s2, "sd", 4, 1, 0) && new Set(su).size > 1 && su.reduce((s, v) => s + v, 0) === 240, "luar Unit Fraction: bagian sama besar benar, bagian tidak sama (lebar 20, 90, 40, 90, jumlah 240) salah");
  const s3 = T(U, "luar-satuan", 2);
  cek(kisiOk(s3, "sg", 5, 1, 1) && pecahanSama(s3, "sj", 1, 5) && nilaiId(s3, "sh-t0") === "5 bagian sama: penyebut", "luar Unit Fraction: 5 bagian sama, penyebut 5, pembilang 1");
  cek(pecahanSama(T(U, "luar-satuan", 3), "sk", 1, 5), "luar Unit Fraction: dibaca satu dari lima");
  const t1 = T(U, "luar-satuan-terapan", 0);
  cek(lingkaranOk(t1, "ua", 4, 1) && pecahanSama(t1, "uc", 1, 4), "luar Unit Fraction pizza buku: 4 juring, 1 diarsir, 1/4");
  const t2 = T(U, "luar-satuan-terapan", 1);
  cek(kisiOk(t2, "ud", 5, 2, 1) && pecahanSama(t2, "uf", 1, 10) && nilaiId(t2, "ue") === "10 bagian sama", "luar Unit Fraction kisi: 5 kolom 2 baris = 10 sel, 1/10");
  const t3 = T(U, "luar-satuan-terapan", 2);
  const uk = segitigaInfo(t3, "ug");
  const ui = juringInfo(t3, "ui");
  cek(uk && uk.n === 3 && uk.sama && uk.arsir === 1 && uk.bersama === 1 && pecahanSama(t3, "uh", 1, 3), "luar Unit Fraction kincir: 3 segitiga sama luas, 1/3");
  cek(ui && ui.n === 5 && ui.sama && ui.arsir === 1 && pecahanSama(t3, "uj", 1, 5), "luar Unit Fraction kipas: 5 kelopak sama, 1/5");
  const t4 = T(U, "luar-satuan-terapan", 3);
  [[2, 1], [4, 1], [10, 1], [3, 1], [5, 1]].forEach(([n, a], i) => sama([nilaiId(t4, `uk${i + 1}-t1`), nilaiId(t4, `uk${i + 1}-t2`)], [String(n), `${a}/${n}`], `luar Unit Fraction tabel kunci nomor ${i + 1}`));
  // Area Model.
  const dd0 = T(U, "luar-daerah", 0);
  cek(kisiOk(dd0, "da", 2, 1, 0) && kisiOk(dd0, "db", 3, 1, 0) && kisiInfo(dd0, "da").lebar === kisiInfo(dd0, "db").lebar, "luar Area Model: dua benda sama besar dibagi 2 dan 3");
  const dd1 = T(U, "luar-daerah", 1);
  cek(kisiOk(dd1, "da", 2, 1, 1) && kisiOk(dd1, "db", 3, 1, 1) && pecahanSama(dd1, "dg", 1, 2) && pecahanSama(dd1, "dh", 1, 3), "luar Area Model: arsir satu bagian pada tiap gambar, 1/2 dan 1/3");
  const dd3 = T(U, "luar-daerah", 3);
  const z1 = kisiInfo(dd3, "dz1");
  const z2 = kisiInfo(dd3, "dz2");
  cek(kisiOk(dd3, "dz1", 3, 1, 1) && kisiOk(dd3, "dz2", 4, 1, 1) && z1.sel * z1.arsir === z2.sel * z2.arsir && z1.lebar !== z2.lebar, "luar Area Model: gambar nomor tiga buku, arsiran sama luas tetapi keseluruhan berbeda (72 lawan 96)");
  const v1 = T(U, "luar-daerah-terapan", 0);
  cek(kisiOk(v1, "va", 2, 1, 1) && kisiOk(v1, "vb", 4, 1, 1) && kisiInfo(v1, "va").lebar === kisiInfo(v1, "vb").lebar && pecahanSama(v1, "var", 1, 2) && pecahanSama(v1, "vbr", 1, 4) && nilaiId(v1, "vs") === tandaDari(2, 4), "luar Area Model hlm. 60: 1/2 lebih dari 1/4");
  cek(kisiInfo(v1, "va").sel > kisiInfo(v1, "vb").sel, "luar Area Model hlm. 60: arsiran 1/2 lebih lebar");
  const v2 = T(U, "luar-daerah-terapan", 1);
  cek(kisiOk(v2, "vc", 10, 1, 1) && kisiOk(v2, "vd", 5, 1, 1) && kisiInfo(v2, "vc").lebar === kisiInfo(v2, "vd").lebar && pecahanSama(v2, "vcr", 1, 10) && pecahanSama(v2, "vdr", 1, 5) && nilaiId(v2, "vs2") === tandaDari(10, 5), "luar Area Model hlm. 61: 1/10 kurang dari 1/5");
  cek(objAda(v2, "vk").x2 === kisiInfo(v2, "vc").sel && kisiInfo(v2, "vc").sel < kisiInfo(v2, "vd").sel, "luar Area Model: garis ukur arsiran 1/10 sepanjang satu sel (lebih sempit)");
  const v3 = T(U, "luar-daerah-terapan", 2);
  cek(kisiOk(v3, "we", 3, 2, 1) && kisiOk(v3, "wf", 3, 1, 1) && kisiInfo(v3, "we").lebar === kisiInfo(v3, "wf").lebar && kisiInfo(v3, "we").tinggi === kisiInfo(v3, "wf").tinggi && pecahanSama(v3, "wer", 1, 6) && pecahanSama(v3, "wfr", 1, 3) && nilaiId(v3, "wg") === tandaDari(6, 3), "luar Area Model nomor dua: 1/6 kurang dari 1/3, keseluruhan sama");
  const v4 = T(U, "luar-daerah-terapan", 3);
  cek(kisiOk(v4, "xb", 2, 1, 1) && kisiOk(v4, "xe", 4, 1, 1) && kisiInfo(v4, "xb").lebar === kisiInfo(v4, "xe").lebar && nilaiId(v4, "xc") === "1/2 kg" && nilaiId(v4, "xf") === "1/4 kg", "luar Area Model Tiara: 1/2 kg lawan 1/4 kg pada batang sama panjang");
  // Number Line Unit.
  const gl = T(U, "luar-garis", 0);
  cek(objAda(gl, "gl-g").x2 === 240 && objAda(gl, "gl-t1").x - objAda(gl, "gl-t0").x === 240 && nilaiId(gl, "gl-n0") === "0" && nilaiId(gl, "gl-n1") === "1", "luar Number Line Unit: garis dari 0 sampai 1");
  const gl2 = T(U, "luar-garis", 1);
  cek([1, 2, 3].every((j) => objAda(gl2, `gl-m${j}`).x - objAda(gl2, "gl-t0").x === 60 * j), "luar Number Line Unit: garis dibagi 4 bagian sama panjang (60 tiap bagian)");
  const gt = T(U, "luar-garis-terapan", 3);
  const x0 = objAda(gt, "gt-t0").x;
  const PJ = objAda(gt, "gt-g").x2;
  sama(PJ, 240, "garis terapan sepanjang 240");
  const posisi = [2, 3, 4, 5].map((n) => objAda(gt, `gt-k${n}`).x - x0);
  sama(posisi, [2, 3, 4, 5].map((n) => PJ / n), "titik 1/n berada pada jarak panjang garis dibagi n dari 0");
  cek([2, 3, 4, 5].every((n) => objAda(gt, `gt-f${n}`).x === objAda(gt, `gt-k${n}`).x && nilaiId(gt, `gt-f${n}`) === `1/${n}` && (objAda(gt, `gt-f${n}`).op ?? 1) === 1), "label 1/n tepat di atas atau bawah titiknya dan terlihat");
  cek(posisi.every((p, i, a) => i === 0 || p < a[i - 1]), "pecahan makin kecil berada makin dekat ke nol (posisi menurun dari 1/2 sampai 1/5)");
  cek(posisi[2] > posisi[3], "nomor 4 bagian b: titik 1/4 di kanan titik 1/5, jadi 1/4 lebih dari 1/5");
  const gt0 = T(U, "luar-garis-terapan", 0);
  cek((objAda(gt0, "gt-k2").op ?? 1) === 1 && (objAda(gt0, "gt-k3").op ?? 1) === 0, "titik muncul bertahap: ketukan pertama hanya 1/2");
  sama(nilaiId(T(U, "luar-garis-terapan", 1), "gt-a-t0"), "1/3 kurang dari 1/2", "garis: 1/3 kurang dari 1/2");
  // Fair Sharing.
  const bq = T(U, "luar-bagi", 2);
  cek(lingkaranOk(bq, "bq1", 2, 1) && hitungBenda(bq, "bp1") === 2 && lingkaranOk(bq, "bq2", 3, 1) && hitungBenda(bq, "bp2") === 3, "luar Fair Sharing: 2 orang berbagi pizza 2 juring, 3 orang berbagi 3 juring");
  const y1 = T(U, "luar-bagi-terapan", 0);
  cek(lingkaranOk(y1, "ya", 4, 1) && hitungBenda(y1, "yp") === 4 && pecahanSama(y1, "yr", 1, 4), "luar Fair Sharing pizza buku: 4 siswa, 4 juring, 1/4");
  const y2 = T(U, "luar-bagi-terapan", 1);
  cek(kisiOk(y2, "yu", 10, 1, 1) && hitungBenda(y2, "yua") === 10 && kisiOk(y2, "yv", 5, 1, 1) && hitungBenda(y2, "yva") === 5 && kisiInfo(y2, "yu").lebar === kisiInfo(y2, "yv").lebar && nilaiId(y2, "yw") === tandaDari(10, 5), "luar Fair Sharing: 10 anak lawan 5 anak, batang sama panjang, 1/10 kurang dari 1/5");
  const y3 = T(U, "luar-bagi-terapan", 2);
  cek(hitungBenda(y3, "yx") === 11 && hitungBenda(y3, "yy") === 13 && nilaiId(y3, "yx1") === "11 anak: tiap anak 1/11" && nilaiId(y3, "yx2") === "13 anak: tiap anak 1/13" && nilaiId(y3, "yz-t0") === `1/11 ${tandaDari(11, 13)} 1/13`, "luar Fair Sharing nomor 4e: 11 anak lawan 13 anak, 1/11 lebih dari 1/13");
  const y4 = T(U, "luar-bagi-terapan", 3);
  cek(hitungBenda(y4, "zy") === 2 && hitungBenda(y4, "zz") === 8 && nilaiId(y4, "zy1") === "2 orang: 1/2" && nilaiId(y4, "zz1") === "8 orang: 1/8" && nilaiId(y4, "zk-t0") === `1/8 ${tandaDari(8, 2)} 1/2`, "luar Fair Sharing nomor 4c: 2 orang lawan 8 orang, 1/8 kurang dari 1/2");
  const rr = T(U, "luar-ringkas", 1);
  sama([1, 2, 3, 4].map((i) => nilaiId(rr, `rt${i}-t1`)), ["1/2, 1/4, 1/10, 1/3, 1/5", "1/2 : 1/4, 1/10 : 1/5", "1/2, 1/3, 1/4, 1/5", "1/11 : 1/13"], "luar: angka buku yang dipakai tiap metode");
  stat.data += 1;
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
  // Kelas IV: Buku Siswa hlm. N = PDF N+12 (hlm. 55-63 = PDF 67-75; subbab B mulai di tengah PDF 75); Panduan Guru hlm. N = PDF N+12 (hlm. 89-96 = PDF 101-108; subbab B mulai di PDF 109).
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 67, 75), ambil(bg, 101, 109), ambil(bs, 67, 74), ambil(bg, 101, 108), ambil(bs, 75, 75), ambil(bg, 109, 109)] : [null];
  if (bagian.some((b) => b === null)) console.log("PDF atau pembaca PDF tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const JUDUL_B = "b. pecahan dengan penyebut sama";
    const siswaPenuh = bersih(bagian[0]);
    const guruPenuh = bersih(bagian[1]);
    const awalBs = siswaPenuh.indexOf(JUDUL_B);
    const awalBg = guruPenuh.indexOf(JUDUL_B);
    cek(awalBs > 0 && awalBg > 0, "Buku Siswa PDF 75 dan Panduan Guru PDF 109 memuat judul subbab B");
    const siswa = siswaPenuh.slice(0, awalBs);
    const guru = guruPenuh.slice(0, awalBg);
    const buku = `${siswa}\n${guru}`;
    cek(!bersih(bagian[2]).includes(JUDUL_B) && !bersih(bagian[3]).includes(JUDUL_B), "subbab B belum mulai di Buku Siswa PDF 67-74 dan Panduan Guru PDF 101-108");
    cek(bersih(bagian[4]).includes(JUDUL_B) && bersih(bagian[5]).indexOf(JUDUL_B) >= 0 && bersih(bagian[5]).indexOf(JUDUL_B) < 400, "subbab B mulai di Buku Siswa PDF 75 dan di awal Panduan Guru PDF 109");
    // Nomor halaman cetak sama dengan PDF dikurangi 12.
    const halaman = (berkas, pdf, cetak) => new RegExp(`(^|\\n)\\s*${cetak}(\\s|$)`).test(ambil(berkas, pdf, pdf));
    for (let pdf = 68; pdf <= 75; pdf += 1) cek(halaman(bs, pdf, pdf - 12), `Buku Siswa PDF ${pdf} bernomor halaman ${pdf - 12}`);
    for (let pdf = 102; pdf <= 109; pdf += 1) cek(halaman(bg, pdf, pdf - 12), `Panduan Guru PDF ${pdf} bernomor halaman ${pdf - 12}`);
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
    // Tujuan: Buku Siswa sepuluh butir, Panduan Guru tujuh butir.
    const tujuanBs = ambil(bs, 68, 68);
    const tujuanBg = ambil(bg, 101, 101);
    sama((tujuanBs.match(/•/g) ?? []).length, 10, "Buku Siswa hlm. 56: 10 butir tujuan");
    sama((tujuanBg.match(/(^|\n)1\.\d /g) ?? []).length, 7, "Panduan Guru hlm. 89: 7 butir tujuan");
    // Kunci Panduan Guru: nomor 5 dan nomor 4 hanya tersedia sebagai teks sebagian; angka kunci lain diukur dari gambar PDF dan dicocokkan lewat hitungan mandiri di atas.
    cek(guru.includes("jawab: jadi yang lebih berat adalah bawang putih") && siswa.includes("tiara mempunyai bawang putih"), "Panduan Guru dan Buku Siswa memuat soal Tiara dan kuncinya: bawang putih");
    // Keganjilan buku yang dicatat di video.
    const bagianTabel = (t) => {
      const i = t.indexOf("hasil aktivitas");
      const j = t.indexOf("ayo mengamati", i);
      return t.slice(i, j);
    };
    for (const [nama, isi] of [["Buku Siswa hlm. 58", bersih(ambil(bs, 70, 70))], ["Panduan Guru hlm. 94", bersih(ambil(bg, 106, 106))]]) {
      const tabel = bagianTabel(isi);
      cek(tabel.length > 20 && !/\d/.test(tabel.replace(/anggota \d/g, "")), `${nama}: tabel Hasil Aktivitas hanya berisi titik-titik (tanpa kunci)`);
    }
    const siswaIsi = bersih(ambil(bs, 69, 75));
    cek(!/kunci/.test(siswaIsi.slice(0, siswaIsi.indexOf(JUDUL_B))), "Buku Siswa hlm. 57-63: tanpa kunci jawaban (hitungan mandiri)");
    const siswaSoal = bersih(ambil(bs, 70, 75));
    cek(!/urutkan/.test(siswaSoal.slice(0, siswaSoal.indexOf(JUDUL_B))), "Buku Siswa hlm. 58-63: tidak ada soal yang meminta mengurutkan (kata urutkan hanya di tujuan dan peta konsep)");
    cek(/mengurutkan beberapa pecahan dengan pembilang satu/.test(siswa) && /mengurutkan antar pecahan dengan pembilang satu/.test(guru), "tujuan menyebut mengurutkan pecahan pembilang satu (Buku Siswa dan Panduan Guru)");
    // Gambar nomor 3 (hlm. 62): petak arsiran 1/3 dan 1/4 sama lebar padahal panjang batang berbeda (diukur dari gambar vektor PDF).
    const KODE_GAMBAR =
      "import sys, json, pymupdf\nd = pymupdf.open(sys.argv[1])\npg = d[int(sys.argv[2]) - 1]\narsir = []\natas = []\nfor dr in pg.get_drawings():\n    f = dr.get('fill')\n    r = dr['rect']\n    if f and abs(f[0] - 1.0) < 0.01 and abs(f[1] - 0.8) < 0.02 and abs(f[2] - 0.306) < 0.02 and 528 < r.y0 < 538 and r.height > 25:\n        arsir.append([round(r.x0, 1), round(r.width, 1)])\n    for it in dr['items']:\n        if it[0] == 'l' and abs(it[1].y - it[2].y) < 0.01 and 532 < it[1].y < 535:\n            atas.append([round(min(it[1].x, it[2].x), 1), round(max(it[1].x, it[2].x), 1)])\nprint(json.dumps({'arsir': sorted(arsir), 'atas': sorted(atas)}))";
    const gb = spawnSync("python", ["-I", "-c", KODE_GAMBAR, jalur(bs), "74"], { encoding: "utf8" });
    if (gb.status !== 0) console.log("PyMuPDF tidak tersedia: pengukuran gambar nomor 3 dilewati");
    else {
      const gm = JSON.parse(gb.stdout);
      const ruas = [];
      for (const [a, b] of gm.atas) {
        const ujung = ruas[ruas.length - 1];
        if (ujung && a <= ujung[1] + 1.5) ujung[1] = Math.max(ujung[1], b);
        else ruas.push([a, b]);
      }
      const panjang = ruas.map(([a, b]) => b - a);
      const lebarArsir = gm.arsir.map((q) => q[1]);
      cek(lebarArsir.length === 3 && panjang.length === 3, `gambar nomor 3: tiga batang dan tiga arsiran terukur (${panjang.length}, ${lebarArsir.length})`);
      cek(Math.abs(lebarArsir[0] - 2 * lebarArsir[1]) < 1 && Math.abs(lebarArsir[1] - lebarArsir[2]) < 0.5, `gambar nomor 3: arsiran 1/2 dua kali, arsiran 1/3 dan 1/4 sama lebar (${lebarArsir.join(", ")})`);
      cek(Math.abs(panjang[0] - panjang[2]) < 1.5 && panjang[1] < panjang[0] - 10, `gambar nomor 3: batang bagi dua dan bagi empat sama panjang, batang bagi tiga lebih pendek (${panjang.map((v) => Math.round(v)).join(", ")})`);
      cek(Math.abs(panjang[1] / 3 - lebarArsir[1]) < 1 && Math.abs(panjang[2] / 4 - lebarArsir[2]) < 1 && Math.abs(panjang[0] / 2 - lebarArsir[0]) < 1.5, "gambar nomor 3: tiap batang sama dengan banyak bagian kali lebar arsiran");
    }
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k4b2a-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k4b2a-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k4b2a sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k4b2a.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_A42|video-k4b2-umum|naskah-k4b2/.test(pembungkus) && /VIDEO_MATERI_K4B2A/.test(pembungkus) && /VIDEO_LUAR_K4B2A/.test(pembungkus) && /export function VideoK4B2A/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k4b2a.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k4b2a.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k4b2a.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k4b2a.mjs: akhir baris LF");
}

for (const v of [M, U]) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.kutipan} kutipan terhadap teks PDF, ${stat.terbilang} bilangan berkata, ${stat.persamaan} persamaan, ${stat.teksPasang} pasangan teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
