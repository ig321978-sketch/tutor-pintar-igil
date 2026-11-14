// Uji Story Kelas 4 Bab 1 Sub-Bab I (Faktor dan Kelipatan, penutup bab): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar (bilangan >= 100 yang diucapkan dengan kata dibaca ulang menjadi angka), perubahan gambar tiap ketukan,
// keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar, kutipan buku (bila PDF ada), persamaan di gambar dihitung ulang,
// deret faktor (sama dengan pembagi habis) dan deret kelipatan (beda tetap), garis bilangan lompatan, jumlah pensil dan kelereng, tabel faktor/beras/keterbagian/nilai tempat/rubrik,
// kisi saringan 1-40 (hasil saringan mandiri), hitungan mandiri kunci jawaban (Uji Kompetensi, Pengayaan), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k4b1i.mjs   (PEMICU=1 mencetak kata pemicu tiap aksi untuk ditinjau)
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/[.][a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b1i-video.ts");
const LU = await import("../src/components/modul/story/k4b1i-luar-1.ts");
const LU2 = await import("../src/components/modul/story/k4b1i-luar-2.ts");

const stat = { persamaan: 0, banding: 0, angkaSuara: 0, teksPasang: 0, format: 0, kartu: 0, deret: 0, busur: 0, garisBil: 0, benda: 0, kunci: 0, tabel: 0, sisa: 0, faktor: 0, saring: 0 };
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

/* ------------------------------ Alat hitung mandiri ------------------------------ */

/** Bilangan yang diucapkan dengan kata (satu urutan kata bilangan) dibaca menjadi angka. Hanya yang >= 100 dikembalikan. */
const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
const angkaDariKata = (suara) => {
  const hasil = [];
  let total = 0;
  let ratus = 0;
  let puluh = 0;
  let sat = 0;
  let ada = false;
  const tutup = () => {
    if (ada) {
      const n = total + ratus + puluh + sat;
      if (n >= 100) hasil.push(n);
    }
    total = ratus = puluh = sat = 0;
    ada = false;
  };
  for (const t of suara.toLowerCase().replace(/[^a-z\s,.:;?!]/g, " ").replace(/[,.:;?!]/g, " # ").split(/\s+/).filter(Boolean)) {
    if (SATUAN[t] !== undefined) {
      sat = SATUAN[t];
      ada = true;
    }
    else if (t === "sepuluh") {
      puluh = 10;
      ada = true;
    }
    else if (t === "sebelas") {
      puluh = 10;
      sat = 1;
      ada = true;
    }
    else if (t === "belas") {
      puluh = 10;
      ada = true;
    }
    else if (t === "puluh") {
      puluh = sat * 10;
      sat = 0;
      ada = true;
    }
    else if (t === "seratus") {
      ratus = 100;
      ada = true;
    }
    else if (t === "ratus") {
      ratus = sat * 100;
      sat = 0;
      ada = true;
    }
    else if (t === "seribu") {
      total += 1000;
      ada = true;
    }
    else if (t === "ribu") {
      const g = ratus + puluh + sat;
      total += (g === 0 ? 1 : g) * 1000;
      ratus = puluh = sat = 0;
      ada = true;
    } else tutup();
  }
  tutup();
  return hasil;
};
sama(angkaDariKata("tiga ratus empat puluh enam siswa dan seratus lima kilogram"), [346, 105], "pembaca bilangan: 346 dan 105");
sama(angkaDariKata("delapan ratus tujuh puluh kilogram"), [870], "pembaca bilangan: 870");
sama(angkaDariKata("enam puluh empat buku dan lima belas"), [], "pembaca bilangan: kecil diabaikan");

/** Nilai persamaan aritmetika dengan titik ribuan, tanda − × ÷ dan kurung. */
const nilai = (ekspr) => {
  const s = ekspr.replace(/(?<=\d)\.(?=\d{3}(?!\d))/g, "").replace(/−/g, "-").replace(/×/g, "*").replace(/÷/g, "/").replace(/ : /g, " / ");
  if (!/^[\d\s+\-*/().]+$/.test(s)) return NaN;
  return Function(`"use strict"; return (${s});`)();
};
sama([nilai("20 + 4 × 8"), nilai("(14 + 16) ÷ 2"), nilai("76 − 6 × 8"), nilai("12 : 4"), nilai("3.990")], [52, 15, 28, 3, 3990], "evaluator aritmetika");

const VIDEO = [V.VIDEO_MATERI_K4B1I, V.VIDEO_LUAR_K4B1I];
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
const EMOJI_ATAU_TANDA = /^[\u{1F000}-\u{1FFFF}]|^[☀-➿]/u;
for (const v of VIDEO) {
  cek(v.adegan.length >= 7, `${v.id}: paling sedikit 7 adegan (ada ${v.adegan.length})`);
  cek(["materi", "metode-luar"].includes(v.jenis) && v.judul.length > 5 && v.subjudul.length > 5, `${v.id}: jenis dan judul ada`);
  cek(new Set(v.adegan.map((a) => a.id)).size === v.adegan.length, `${v.id}: id adegan unik`);
  for (const a of v.adegan) {
    const nama = `${v.id}/${a.id}`;
    cek(a.ketukan.length >= 3 && a.ketukan.length <= 14, `${nama}: 3 sampai 14 ketukan (ada ${a.ketukan.length})`);
    cek(a.sumber.length > 8 && a.sumber.length <= 48 && a.judul.length > 5 && /^#[0-9A-Fa-f]{6}$/.test(a.latar), `${nama}: sumber (paling banyak 48 huruf agar muat kanvas), judul, dan latar ada (${a.sumber.length})`);
    let sebelumnya = null;
    const terlihat = new Set();
    a.ketukan.forEach((kt, i) => {
      const kata = L.kataDari(kt.suara);
      totalKetukan += 1;
      totalKata += kata.length;
      cek(kata.length >= 6 && kata.length <= 42, `${nama}#${i + 1}: 6 sampai 42 kata (ada ${kata.length})`);
      cek(!/[=×÷<>\/%]/.test(kt.suara), `${nama}#${i + 1}: suara tanpa lambang yang sulit dibaca mesin suara`);
      cek(/[.?!]$/.test(kt.suara.trim()), `${nama}#${i + 1}: suara berakhir tanda baca`);
      cek(kt.aksi.length >= 1, `${nama}#${i + 1}: ada aksi gambar`);
      for (const ak of kt.aksi) {
        const p = L.posisiKata(kt.suara, ak.at);
        cek(p >= 0, `${nama}#${i + 1}: pemicu "${ak.at}" ditemukan dalam kalimat`);
        if (typeof ak.at === "number") cek(ak.at >= 0 && ak.at < kata.length, `${nama}#${i + 1}: pemicu angka ${ak.at} dalam batas`);
        if (process.env.PEMICU && p >= 0) {
          const nm = [ak.tambah, ak.ubah, ak.hapus].flat().filter(Boolean).map((o) => (typeof o === "string" ? o : o.id)).slice(0, 3).join(",");
          console.log(`${nama}#${i + 1} "${ak.at ?? ""}" -> [${p}] ${kata[p]}   (${nm})`);
        }
      }
      // ubah dan hapus harus menyasar benda yang ada saat itu (urutan aksi sama dengan urutan penerapan mesin)
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
      // sinkron angka: bilangan (>= 100) yang diucapkan dengan kata tampak sebagai angka di gambar pada ketukan ini atau sebelumnya
      for (let p = 0; p < kata.length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(b);
      cek(!/\d/.test(kt.suara), `${nama}#${i + 1}: suara tanpa angka (bilangan ditulis dengan kata)`);
      for (const n of angkaDariKata(kt.suara)) {
        stat.angkaSuara += 1;
        cek(terlihat.has(String(n)), `${nama}#${i + 1}: bilangan ${n} di suara tampak di gambar`);
      }
      // gambar mengikuti kata
      const titikAksi = [...new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at)))].sort((m, n) => m - n);
      if (titikAksi.length >= 2) {
        const sid = titikAksi.map((p) => L.sidikKeadaan(L.keadaanStory(a, i, p)));
        cek(new Set(sid).size >= 2, `${nama}#${i + 1}: gambar berubah mengikuti kata dalam kalimat`);
      }
      // gambar masuk kanvas 300 x 208
      for (const o of akhir) {
        const x = o.x ?? 0;
        const y = o.y ?? 0;
        if (o.t === "teks") {
          const lebar = (o.isi ?? "").length * (o.u ?? 10) * 0.56;
          const kiri = (o.anchor ?? "middle") === "middle" ? x - lebar / 2 : (o.anchor ?? "middle") === "end" ? x - lebar : x;
          cek(y > 0 && y < 200 && kiri > -4 && kiri + lebar < 304, `${nama}#${i + 1}: teks "${o.isi}" masuk kanvas (x=${x}, y=${y}, lebar=${Math.round(lebar)})`);
        } else if (o.t === "kotak") cek(x > -2 && y > -2 && x + (o.w ?? 0) < 302 && y + (o.h ?? 0) < 202, `${nama}#${i + 1}: kotak ${o.id} masuk kanvas`);
        else if (o.t === "bulat") cek(x - (o.r ?? 0) > -2 && x + (o.r ?? 0) < 302 && y - (o.r ?? 0) > -2 && y + (o.r ?? 0) < 210, `${nama}#${i + 1}: bulat ${o.id} masuk kanvas`);
        else if (o.t === "garis" || o.t === "panah") cek(x > -2 && x < 302 && y > -2 && y < 204 && x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 204, `${nama}#${i + 1}: garis ${o.id} masuk kanvas`);
      }
      // teks tidak boleh bertumpuk
      {
        const teksAda = akhir.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi && !EMOJI_ATAU_TANDA.test(o.isi));
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
const M_VIDEO = V.VIDEO_MATERI_K4B1I;
// Pembuka administratif (tujuan, peta konsep, panduan awal; di I: rubrik, refleksi, interaksi orang tua) tidak lagi diputar di video materi.
// Adegannya tetap ada di berkas materi, jadi pemeriksaan isi memakai daftar penuh; hanya jumlah dan urutan adegan diuji terhadap video yang diputar.
const MODUL_MATERI = Object.assign({}, await import("../src/components/modul/story/k4b1i-materi-1.ts"), await import("../src/components/modul/story/k4b1i-materi-2.ts"), await import("../src/components/modul/story/k4b1i-materi-3.ts"));
const M = { ...M_VIDEO, adegan: [MODUL_MATERI.ADEGAN_PEMBUKA_I, MODUL_MATERI.ADEGAN_FAKTOR_12, MODUL_MATERI.ADEGAN_BUKAN_FAKTOR, MODUL_MATERI.ADEGAN_BERLATIH_FAKTOR_1, MODUL_MATERI.ADEGAN_BERLATIH_FAKTOR_2, MODUL_MATERI.ADEGAN_BERAS, MODUL_MATERI.ADEGAN_KELIPATAN_KAREL, MODUL_MATERI.ADEGAN_MENCOBA_SLAMET, MODUL_MATERI.ADEGAN_BERLATIH_KELIPATAN, MODUL_MATERI.ADEGAN_MISKONSEPSI, MODUL_MATERI.ADEGAN_UK_NILAI_TEMPAT, MODUL_MATERI.ADEGAN_UK_HITUNG, MODUL_MATERI.ADEGAN_UK_FAKTOR_KELIPATAN, MODUL_MATERI.ADEGAN_UK_CERITA, MODUL_MATERI.ADEGAN_RUBRIK, MODUL_MATERI.ADEGAN_REFLEKSI, MODUL_MATERI.ADEGAN_PENGAYAAN_1, MODUL_MATERI.ADEGAN_PENGAYAAN_2, MODUL_MATERI.ADEGAN_ORANG_TUA] };
const U = V.VIDEO_LUAR_K4B1I;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksVisible = (objs) => objs.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi).map((o) => o.isi);
/** Semua teks yang pernah tampak di sebuah adegan (gabungan semua ketukan). */
const teksAdegan = (v, id) => new Set(adegan(v, id).ketukan.flatMap((kt, i) => L.kataDari(kt.suara).flatMap((_, p) => teksVisible(L.keadaanStory(adegan(v, id), i, p)))));
const seluruhTeks = (v) => v.adegan.map((a) => [a.judul, a.sumber, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
{
  const teksVideo = (v) => JSON.stringify(seluruhTeks(v));
  const NAMA_METODE = /Factor Pairs|Skip Counting|Divisibility|Sieve|Eratosthenes|Pasangan Faktor|Kelipatan Lompat|Keterbagian|Saringan/;
  const KATA_METODE = /metode luar|metode dari luar/i;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi) && !KATA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Factor Pairs", "Pasangan Faktor", "Skip Counting Multiples", "Kelipatan Lompat Hitung", "Divisibility", "Keterbagian", "Sieve of Eratosthenes", "Saringan Eratosthenes"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber)), "video materi: tiap adegan berlabel pelajaran netral (Materi: ...)");
  cek(U.adegan.every((a) => /^Metode luar: /.test(a.sumber)), "video metode luar: tiap adegan berlabel Metode luar: ...");
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Empat metode luar", "subjudul video: Materi kurikulum dan Empat metode luar");
  // Kata terlarang (sumber buku) tidak boleh terdengar atau terlihat pada adegan yang diputar.
  const TERLARANG = /\bbuku\b|panduan guru|\bhlm\b|halaman|\bkunci\b|rubrik|salah ketik|salah cetak|tambahan video|contoh video|temuan/i;
  const NOMOR_SOAL = /\bsoal (nomor|no\b|\d|satu\b|dua\b|tiga\b|empat\b|lima\b|enam\b|tujuh\b|delapan\b|sembilan\b|sepuluh\b|sebelas\b)|\bnomor\b|\bUji Kompetensi\b|\bAyo (Berlatih|Mencoba|Mengamati)\b/i;
  for (const v of [M_VIDEO, U]) {
    cek(!TERLARANG.test(v.judul) && !TERLARANG.test(v.subjudul), `${v.id}: judul dan subjudul tanpa kata sumber buku`);
    for (const a of v.adegan) {
      const semua = JSON.stringify([a.judul, a.sumber, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
      cek(!TERLARANG.test(semua), `${v.id}/${a.id}: tanpa kata sumber buku (${semua.match(TERLARANG)?.[0]})`);
      cek(!NOMOR_SOAL.test(semua), `${v.id}/${a.id}: tanpa rujukan soal bernomor atau nama bagian buku (${semua.match(NOMOR_SOAL)?.[0]})`);
    }
  }
  for (const kata of ["Sub-Bab I", "Pengayaan", "Refleksi", "orang tua", "Panduan Guru", "Rubrik", "remedial", "Diferensiasi", "Miskonsepsi", "faktor", "kelipatan"]) cek(new RegExp(kata, "i").test(materi), `video materi memuat "${kata}"`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-fp", "luar-fp-terapan", "luar-sk", "luar-sk-terapan", "luar-dv", "luar-dv-terapan", "luar-sv", "luar-sv-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk empat metode");
  cek(M_VIDEO.adegan.length === 16 && U.adegan.length === 10, "16 adegan materi dan 10 adegan metode luar");
  cek(!/piktogram|diagram batang|pecahan|volume|pola bilangan|pola gambar/i.test(materi + luar), `tidak membahas bab lain (${(materi + luar).match(/piktogram|diagram batang|pecahan|volume|pola bilangan|pola gambar/i)?.[0]})`);
  cek(totalKetukan >= 80, `total ketukan cukup dalam (${totalKetukan})`);
  for (const kata of ["12 : 1 = 12", "12 : 5 = 2 sisa 2", "2 + 2 + 2 + 2 = 8", "8 = 4 × 2", "3 × 4 = 12", "42 > 40"]) cek(materi.includes(kata), `video materi memuat "${kata}"`);
  for (const kata of ["1 × 24 = 24", "4 × 6 = 24", "5 × 5 = 25", "4 × 13 = 52", "3 × 9 = 27", "2 + 4 = 6", "2 + 7 = 9"]) cek(luar.includes(kata), `video metode luar memuat "${kata}"`);
  for (const kata of ["104", "8.002", "8.032", "3.990", "725", "629", "96 : 48 = 2", "48 : 8 = 6", "48 : 4 = 12", "256 − 179 = 77", "147 − 54 = 93", "204 : 6 = 34", "24 × 8 = 192", "90 : 5 = 18"]) cek(materi.includes(kata), `video materi memuat "${kata}"`);
}

/* ------------------------------ Persamaan, perbandingan, urutan, dan format di gambar dihitung ulang ------------------------------ */
{
  const BENTUK_PERSAMAAN = /^[\d.\s+−×÷():]+( = [\d.]+)+$/;
  const bersihkan = (t) => {
    let s = t;
    const m = [...s.matchAll(/\S: /g)].pop();
    if (m) s = s.slice(m.index + 3);
    return s.replace(/^[a-e]\. /, "").replace(/\s[A-Za-z][A-Za-z ]*$/, "");
  };
  const SISA = /^(\d+) : (\d+) = (\d+) sisa (\d+)$/;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        const objs = akhirAdegan(a, i);
        const nama = `${v.id}/${a.id}#${i + 1}`;
        for (const o of objs) {
          if (o.t !== "teks" || !o.isi || (o.op ?? 1) === 0) continue;
          const s = bersihkan(o.isi);
          if (s.includes(" = ") && BENTUK_PERSAMAAN.test(s)) {
            const sisi = s.split(" = ").map(nilai);
            stat.persamaan += 1;
            cek(sisi.every((n) => Number.isFinite(n) && n === sisi[0]), `${nama}: persamaan "${o.isi}" benar (${sisi.join(" / ")})`);
          }
          const sisa = (o.isi.match(/(\d+ : \d+ = \d+ sisa \d+)/) ?? [])[1];
          if (sisa) {
            const [, a1, b1, q, r] = sisa.match(SISA).map(Number);
            stat.sisa += 1;
            cek(a1 === b1 * q + r && r < b1, `${nama}: pembagian bersisa "${sisa}" benar`);
          }
          const b = o.isi.match(/^(\d[\d.]*) ([<>]) (\d[\d.]*)$/);
          if (b) {
            stat.banding += 1;
            cek(b[2] === "<" ? Number(b[1]) < Number(b[3]) : Number(b[1]) > Number(b[3]), `${nama}: perbandingan "${o.isi}" benar`);
          }
          for (const t of o.isi.replace(/Tabel \d\.\d+/g, "").match(/\d[\d.]*\d|\d/g) ?? []) {
            stat.format += 1;
            cek(!t.includes(".") || /^\d{1,3}(\.\d{3})+$/.test(t) || /^\d{2}\.\d{2}$/.test(t), `${nama}: format ribuan "${t}" pada "${o.isi}"`);
          }
        }
      });
    }
  }
}


/* ------------------------------ Teks di dalam kartu dan sel tabel tidak melebihi kotaknya ------------------------------ */
{
  let n = 0;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        const objs = akhirAdegan(a, i);
        const kotakAda = new Map(objs.filter((o) => o.t === "kotak").map((o) => [o.id, o]));
        for (const o of objs) {
          if (o.t !== "teks" || !o.isi || (o.op ?? 1) === 0) continue;
          const m = o.id.match(/^(.*)-t(\d+)$/);
          if (!m) continue;
          const kt = kotakAda.get(`${m[1]}-k`) ?? kotakAda.get(`${m[1]}-s${m[2]}`);
          if (!kt) continue;
          n += 1;
          stat.kartu += 1;
          const lebar = o.isi.length * (o.u ?? 10) * 0.58;
          cek(lebar <= kt.w - 3 && o.x - lebar / 2 >= kt.x - 0.5 && o.x + lebar / 2 <= kt.x + kt.w + 0.5, `${v.id}/${a.id}#${i + 1}: teks "${o.isi}" muat dalam kotaknya (lebar ${Math.round(lebar)} dari ${kt.w})`);
          cek(o.y > kt.y && o.y < kt.y + kt.h + 1, `${v.id}/${a.id}#${i + 1}: teks "${o.isi}" berada di tinggi kotaknya`);
        }
      });
    }
  }
  cek(n >= 150, `jumlah teks dalam kartu dan tabel yang diperiksa (${n})`);
}

/* ------------------------------ Lintasan (busur, kisi, segi enam) masuk kanvas ------------------------------ */
{
  let n = 0;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        for (const o of akhirAdegan(a, i)) {
          if (o.t !== "jalur") continue;
          const angka = (o.d.match(/-?\d+(\.\d+)?/g) ?? []).map(Number);
          const xs = angka.filter((_, q) => q % 2 === 0).map((q) => q + (o.x ?? 0));
          const ys = angka.filter((_, q) => q % 2 === 1).map((q) => q + (o.y ?? 0));
          n += 1;
          cek(Math.min(...xs) >= 0 && Math.max(...xs) <= 300 && Math.min(...ys) >= 22 && Math.max(...ys) <= 204, `${v.id}/${a.id}#${i + 1}: lintasan ${o.id} masuk kanvas (x ${Math.min(...xs)}..${Math.max(...xs)}, y ${Math.min(...ys)}..${Math.max(...ys)})`);
        }
      });
    }
  }
  cek(n > 60, `jumlah lintasan yang diperiksa batas kanvasnya (${n})`);
}


/* ------------------------------ Deret kotak bilangan: label busur sama dengan selisih; faktor sama dengan pembagi habis ------------------------------ */
const angka = (t) => (t === undefined || t === "?" ? null : Number(String(t).replace("−", "-").replace("+", "").replace(/\.(?=\d{3}(?!\d))/g, "")));
/** Kelompok deret pada sebuah keadaan: { pre: { nilai: [..], label: [..] } } (nilai kotak "?" menjadi null, kotak yang belum muncul undefined). */
const kelompokDeret = (objs) => {
  const g = {};
  for (const o of objs) {
    if (o.t !== "teks") continue;
    let m = o.id.match(/^(.+)-n(\d+)$/);
    if (m) ((g[m[1]] ??= { nilai: [], label: [] }).nilai[Number(m[2])] = o.isi);
    m = o.id.match(/^(.+)-l(\d+)$/);
    if (m) ((g[m[1]] ??= { nilai: [], label: [] }).label[Number(m[2])] = o.isi);
  }
  return g;
};
const faktorDari = (n) => Array.from({ length: n }, (_, i) => i + 1).filter((d) => n % d === 0);
const FAKTOR_DERET = { f12: 12, f20: 20, f48: 48, fa: 24, fb: 25, fc: 52, fd: 27, fe: 52 };
const semuaDeretAkhir = []; // { adegan, pre, nilai[] }
{
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        const g = kelompokDeret(akhirAdegan(a, i));
        for (const [pre, d] of Object.entries(g)) {
          const nama = `${v.id}/${a.id}#${i + 1} deret ${pre}`;
          stat.deret += 1;
          d.label.forEach((lab, j) => {
            if (lab === undefined) return;
            const p = angka(d.nilai[j]);
            const q = angka(d.nilai[j + 1]);
            if (p === null || q === null) return;
            stat.busur += 1;
            cek(q - p === angka(lab), `${nama}: busur ${j} berlabel ${lab} sama dengan selisih ${q} − ${p}`);
          });
          const tahu = d.nilai.map((t, idx) => [idx, angka(t)]).filter((p) => p[1] !== null);
          const lereng = [];
          for (let q = 1; q < tahu.length; q += 1) lereng.push((tahu[q][1] - tahu[q - 1][1]) / (tahu[q][0] - tahu[q - 1][0]));
          // deret kelipatan (awalan k): beda tetap bilangan bulat positif
          if (/^k/.test(pre) && lereng.length >= 1) cek(lereng.every((x) => Number.isInteger(x) && x > 0 && x === lereng[0]), `${nama}: beda tetap (${lereng.join(", ")})`);
          // deret faktor: persis semua pembagi habis, berurutan, bila sudah lengkap
          if (FAKTOR_DERET[pre] !== undefined && d.nilai.filter((x) => x !== undefined).length === faktorDari(FAKTOR_DERET[pre]).length) {
            stat.faktor += 1;
            sama(d.nilai.map(angka), faktorDari(FAKTOR_DERET[pre]), `${nama}: faktor ${FAKTOR_DERET[pre]} dihitung ulang`);
          }
        }
        for (const [pre, d] of Object.entries(g)) semuaDeretAkhir.push({ adegan: `${v.id}/${a.id}`, pre, nilai: d.nilai.map(angka) });
      });
    }
  }
  // semua deret faktor yang dirancang benar-benar muncul lengkap
  for (const pre of Object.keys(FAKTOR_DERET)) cek(semuaDeretAkhir.some((d) => d.pre === pre && d.nilai.length === faktorDari(FAKTOR_DERET[pre]).length), `deret faktor ${pre} (${FAKTOR_DERET[pre]}) tampil lengkap`);
}

/* ------------------------------ Garis bilangan: titik di posisi yang benar, loncatan sama dengan beda ------------------------------ */
{
  const periksaGaris = (nama, objs, L2, c) => {
    const g = objs.find((o) => o.id === `${L2}g-g`);
    cek(!!g, `${nama}: garis bilangan ${L2} ada`);
    if (!g) return;
    const s = g.x2 / (c.sampai - c.dari);
    c.nilai.forEach((v, i) => {
      const p = objs.find((o) => o.id === `${L2}${i}-p`);
      const t = objs.find((o) => o.id === `${L2}${i}-v`);
      cek(!!p && !!t, `${nama}: titik ${v} ada`);
      if (!p || !t) return;
      stat.garisBil += 1;
      cek(Math.abs(p.x - (g.x + (v - c.dari) * s)) < 0.11, `${nama}: titik ${v} berada di posisi garis bilangan (x=${p.x}, harap ${g.x + (v - c.dari) * s})`);
      cek(t.isi === String(v), `${nama}: tulisan titik ${t.isi} sama dengan ${v}`);
      if (i > 0) {
        const j = objs.find((o) => o.id === `${L2}j${i - 1}-l`);
        const b = v - c.nilai[i - 1];
        cek(!!j && angka(j.isi) === b, `${nama}: loncatan ${j?.isi} sama dengan selisih ${v} − ${c.nilai[i - 1]}`);
        const arc = objs.find((o) => o.id === `${L2}j${i - 1}-j`);
        const dx = Number(arc.d.match(/Q\S+ \S+ (-?[\d.]+) 0/)[1]);
        cek(Math.abs(dx - b * s) < 0.2, `${nama}: panjang busur ${dx} sama dengan ${b * s}`);
      }
    });
    cek(objs.filter((o) => /-p$/.test(o.id) && o.id.startsWith(L2)).length === c.nilai.length, `${nama}: banyak titik ${c.nilai.length}`);
  };
  const sk = adegan(U, "luar-sk");
  periksaGaris("luar-sk", akhirAdegan(sk, 1), "sk", LU.GARIS_BIL.sk);
  const skt = adegan(U, "luar-sk-terapan");
  ["sa", "sb", "sc", "sd"].forEach((L2, i) => periksaGaris(`luar-sk-terapan#${i + 1}`, akhirAdegan(skt, i), L2, LU.GARIS_BIL[L2]));
  // beda dan batas tiap soal buku
  const beda = (c) => c.nilai.slice(1).map((v, i) => v - c.nilai[i]);
  sama(beda(LU.GARIS_BIL.sk), [2, 2, 2, 2, 2, 2, 2], "Karel: lompat dua");
  sama(beda(LU.GARIS_BIL.sa), [6, 6, 6, 6, 6, 6, 6], "Latihan 2: lompat enam");
  sama(beda(LU.GARIS_BIL.sb), [5, 5, 5, 5], "Latihan 3: lompat lima");
  sama(beda(LU.GARIS_BIL.sc), [4, 4, 4, 4, 4, 4], "Uji Kompetensi 14: lompat empat");
  sama(beda(LU.GARIS_BIL.sd), Array(10).fill(3), "Uji Kompetensi 7: lompat tiga");
  const antara = (c, lo, hi) => c.nilai.filter((v) => v > lo && v < hi && v > 0);
  sama(antara(LU.GARIS_BIL.sa, 0, 40), [6, 12, 18, 24, 30, 36], "kelipatan 6 kurang dari 40");
  sama(antara(LU.GARIS_BIL.sb, 17, 35), [20, 25, 30], "kelipatan 5 antara 17 dan 35");
  sama(antara(LU.GARIS_BIL.sc, 7, 25), [8, 12, 16, 20, 24], "kelipatan 4 antara 7 dan 25");
  sama(antara(LU.GARIS_BIL.sd, 0, 30), [3, 6, 9, 12, 15, 18, 21, 24, 27], "kelipatan 3 kurang dari 30");
}

/* ------------------------------ Benda: pensil dibagi rata, kelereng per hari ------------------------------ */
{
  const hitungPre = (objs, re) => {
    const g = {};
    for (const o of objs) {
      const m = o.id.match(re);
      if (m) g[m[1]] = (g[m[1]] ?? 0) + 1;
    }
    return g;
  };
  // faktor-12: tiap ketukan memuat satu susunan pensil; banyak pensil 12, banyak anak = pembagi, kartu persamaan dan "tiap anak" cocok
  const f12 = adegan(M, "faktor-12");
  const HARAP = [[1], [2, 3], [4, 6]];
  const dijumpai = [];
  [0, 1, 2].forEach((i) => {
    for (let p = 0; p < L.kataDari(f12.ketukan[i].suara).length; p += 1) {
      const objs = L.keadaanStory(f12, i, p);
      const pensil = hitungPre(objs, /^(p\d)-c\d+$/);
      const anak = hitungPre(objs, /^(p\d)-g\d+$/);
      for (const [pre, n] of Object.entries(pensil)) {
        stat.benda += 1;
        cek(n === 12, `faktor-12#${i + 1}: ${pre} memuat dua belas pensil (ada ${n})`);
        cek(anak[pre] === Number(pre.slice(1)) && 12 % anak[pre] === 0, `faktor-12#${i + 1}: ${pre} dibagi ${anak[pre]} anak habis`);
        dijumpai.push(anak[pre]);
        for (const o of objs) {
          const m = o.isi?.match(/^tiap anak (\d+) pensil$/);
          if (m) cek(Number(m[1]) === 12 / anak[pre], `faktor-12#${i + 1}: "${o.isi}" cocok dengan ${anak[pre]} anak`);
        }
      }
    }
  });
  sama([...new Set(dijumpai)].sort((x, y) => x - y), [1, 2, 3, 4, 6], "pensil dibagi kepada 1, 2, 3, 4, 6 anak");
  // kelereng Karel (2 per hari) dan Slamet (3 per hari), tujuh hari
  for (const [pre, per, nilaiDeret] of [["kh", 2, "kt"], ["sh", 3, "ks"]]) {
    const a = adegan(M, pre === "kh" ? "kelipatan-karel" : "mencoba-slamet");
    const objs = akhirAdegan(a, 0);
    const kelereng = objs.filter((o) => new RegExp(`^${pre}-c\\d+$`).test(o.id)).length;
    const hari = objs.filter((o) => new RegExp(`^${pre}-h\\d+$`).test(o.id)).length;
    stat.benda += 2;
    sama([hari, kelereng], [7, 7 * per], `${pre}: tujuh hari, ${per} kelereng per hari`);
    const akhir = akhirAdegan(a, a.ketukan.length - 1);
    const dar = kelompokDeret(L.keadaanStory(a, pre === "kh" ? 1 : 1, 9999))[nilaiDeret];
    sama(dar.nilai.map(angka), Array.from({ length: 7 }, (_, i) => per * (i + 1)), `${pre}: jumlah kelereng hari 1 sampai 7 = ${per} × hari`);
    void akhir;
  }
}

/* ------------------------------ Tabel: dihitung ulang ------------------------------ */
{
  const sel = (objs, id, r, c) => objs.find((o) => o.id === `${id}-t${r}${c}`)?.isi;
  // tabel faktor 12 dan 20: pembagian dan perkalian saling cocok, pembagi habis
  for (const [adeg, id, n, pembagi, ke] of [["faktor-12", "t12", 12, [1, 2, 3, 4, 6], 3], ["bukan-faktor", "t20", 20, [1, 2, 4, 5, 10], 1]]) {
    const a = adegan(M, adeg);
    const objs = akhirAdegan(a, ke);
    pembagi.forEach((p, r) => {
      stat.tabel += 2;
      sama([sel(objs, id, r + 1, 0), sel(objs, id, r + 1, 1)], [`${n} : ${p} = ${n / p}`, `${p} × ${n / p} = ${n}`], `${id} baris ${r + 1}: pembagian dan perkalian`);
      cek(n % p === 0, `${id}: ${p} habis membagi ${n}`);
    });
  }
  // Ayo Berlatih 1: pasangan terisi (a, b) dengan a × b = n
  {
    const a = adegan(M, "berlatih-faktor-1");
    const o2 = akhirAdegan(a, 2);
    const KUNCI = { ta: [20, [[1, 20], [2, 10], [4, 5], [5, 4], [10, 2]]], tb: [48, [[1, 48], [2, 24], [3, 16], [4, 12], [6, 8], [8, 6]]] };
    for (const [id, [n, pasang]] of Object.entries(KUNCI)) {
      pasang.forEach(([p, q], r) => {
        const kiri = sel(o2, id, r + 1, 0);
        const kanan = sel(o2, id, r + 1, 1);
        const a1 = kiri === "...." ? pasang[r][0] : Number(kiri);
        stat.tabel += 1;
        cek(String(kanan) !== "...." && String(kiri) !== "....", `${id} baris ${r + 1}: terisi`);
        cek(Number(kiri) * Number(kanan) === n && Number(kiri) === p && Number(kanan) === q, `${id} baris ${r + 1}: ${kiri} × ${kanan} = ${n}`);
        void a1;
      });
    }
    // kunci Panduan Guru: a = 10, b = 5, c = 4, d = 10; b = 24, 16, 12, 6, 8
    sama([20 / 2, 20 / 4, 20 / 5, 10], [10, 5, 4, 10], "kunci tabel 20: sepuluh, lima, empat, sepuluh (baris terakhir pembagi 10, pasangannya 2)");
    sama([2, 3, 4, 8, 6].map((p) => 48 / p), [24, 16, 12, 6, 8], "kunci tabel 48: 24, 16, 12, 6, 8");
  }
  // beras 10 kg
  {
    const a = adegan(M, "beras");
    const objs = akhirAdegan(a, 2);
    const nol = [];
    for (let r = 1; r <= 10; r += 1) {
      const orang = Math.floor(10 / r);
      const sisaHitung = 10 - orang * r;
      stat.tabel += 3;
      sama([sel(objs, "br", r, 0), sel(objs, "br", r, 1), sel(objs, "br", r, 2)], [`${r} kg`, `${orang} orang`, String(sisaHitung)], `beras: ${r} kg per orang`);
      if (sisaHitung === 0) nol.push(orang);
    }
    sama(nol, [10, 5, 2, 1], "beras: sisa nol pada 10, 5, 2, 1 orang");
    sama(faktorDari(10).reverse(), [10, 5, 2, 1], "faktor 10 sama dengan banyak orang");
    const sorot = akhirAdegan(a, 3).filter((o) => o.id.startsWith("br-s") && o.warna === "#DCFCE7").map((o) => o.id.slice(4, -1));
    sama([...new Set(sorot)].map(Number), [1, 2, 5, 10], "beras: baris bersisa nol yang disorot");
  }
  // keterbagian: sel ya atau tidak sama dengan hitungan
  {
    const a = adegan(U, "luar-dv-terapan");
    const objs = akhirAdegan(a, 3);
    const kolom = [2, 3, 5, 6, 9];
    [24, 25, 27, 52].forEach((n, r) => {
      sama(sel(objs, "dt", r + 1, 0), String(n), `keterbagian: baris ${r + 1} bilangan ${n}`);
      kolom.forEach((d, c) => {
        stat.tabel += 1;
        sama(sel(objs, "dt", r + 1, c + 1), n % d === 0 ? "ya" : "tidak", `keterbagian: ${n} habis dibagi ${d}`);
      });
    });
    sama([0, 1, 2, 3, 4, 5].map((c) => sel(objs, "dt", 0, c)), ["Bilangan", "÷ 2", "÷ 3", "÷ 5", "÷ 6", "÷ 9"], "keterbagian: kepala tabel");
    // kartu jumlah angka
    for (let i = 0; i < 4; i += 1) {
      const n = [24, 25, 27, 52][i];
      const jml = [...String(n)].map(Number);
      const o2 = akhirAdegan(a, i);
      cek(o2.some((o) => o.isi === `jumlah angka ${n}: ${jml.join(" + ")} = ${jml.reduce((x, y) => x + y, 0)}`), `keterbagian: kartu jumlah angka ${n}`);
    }
    // ciri: jumlah angka habis dibagi 3 dan 9 sama dengan keterbagian bilangannya; satuan menentukan 2, 5
    for (const n of [24, 25, 27, 52, 12, 20, 48]) {
      const jml = [...String(n)].map(Number).reduce((x, y) => x + y, 0);
      cek((jml % 3 === 0) === (n % 3 === 0) && (jml % 9 === 0) === (n % 9 === 0) && ([0, 2, 4, 6, 8].includes(n % 10) === (n % 2 === 0)) && ([0, 5].includes(n % 10) === (n % 5 === 0)), `ciri keterbagian cocok untuk ${n}`);
    }
  }
  // nilai tempat Uji Kompetensi 1 dan 2
  {
    const a = adegan(M, "uk-nilai-tempat");
    const objs = akhirAdegan(a, 2);
    const baris = [1, 2, 3, 4, 5].map((r) => [0, 1, 2, 3, 4].map((c) => sel(objs, "un", r, c)));
    sama(baris.map((b) => b[0].replace(".", "")), ["2234", "7034", "8032", "7905", "8110"], "Uji Kompetensi 1: bilangan tiap baris");
    baris.forEach((b) => {
      stat.tabel += 1;
      cek(b.slice(1).join("") === b[0].replace(".", ""), `Uji Kompetensi 1: angka ${b.slice(1).join("")} sama dengan ${b[0]}`);
    });
    cek(8032 !== 8002, "Uji Kompetensi 1: kunci 8.002 berbeda dari tabel buku 8.032");
    // soal 2: nilai tempat angka 5
    const nt = ["satuan", "puluhan", "ratusan"];
    ["4235", "4253", "4523"].forEach((n, i) => {
      const posisi = n.length - 1 - n.indexOf("5");
      stat.tabel += 1;
      sama(["satuan", "puluhan", "ratusan", "ribuan"][posisi], nt[i], `Uji Kompetensi 2: angka 5 pada ${n}`);
    });
    const objs4 = akhirAdegan(a, 4).map((o) => o.isi);
    cek(["4.235: angka 5 satuan", "4.253: angka 5 puluhan", "4.523: angka 5 ratusan"].every((s) => objs4.includes(s)), "Uji Kompetensi 2: kartu jawaban");
  }
  // rubrik: bobot per butir dan jumlah 104
  {
    const a = adegan(M, "rubrik");
    const objs = akhirAdegan(a, 1);
    const bobot = [];
    for (let r = 1; r <= 8; r += 1) bobot.push(Number(sel(objs, "ra", r, 1)));
    for (let r = 1; r <= 7; r += 1) bobot.push(Number(sel(objs, "rb", r, 1)));
    sama(bobot, [8, 4, 12, 12, 12, 12, 3, 6, 5, 5, 5, 5, 5, 5, 5], "rubrik: bobot 15 butir");
    sama([[1, 2, 3, 4, 5, 6, 7, 8].map((r) => sel(objs, "ra", r, 0)), [1, 2, 3, 4, 5, 6, 7].map((r) => sel(objs, "rb", r, 0))], [["1", "2", "3", "4", "5", "6", "7", "8"], ["9", "10", "11", "12", "13", "14", "15"]], "rubrik: nomor butir");
    // dari butir soal: 1: 4 baris x 2; 2: 2 x 2; 3-6: 4 x 3; 7: 3; 8: 2 x 3; 9-15: 5
    const turunan = [4 * 2, 2 * 2, 4 * 3, 4 * 3, 4 * 3, 4 * 3, 3, 2 * 3, ...Array(7).fill(5)];
    sama(bobot, turunan, "rubrik: bobot sama dengan banyak butir kecil × skor");
    stat.kunci += 2;
    sama([bobot.reduce((x, y) => x + y, 0), 4 * 12 + 7 * 5 + 8 + 4 + 3 + 6], [104, 104], "rubrik: jumlah bobot seratus empat, bukan seratus");
  }
}

/* ------------------------------ Saringan (Sieve): hasil kisi dihitung ulang ------------------------------ */
{
  const WARNA_CORET = "#CBD5E1";
  const WARNA_PRIMA = "#BBF7D0";
  const WARNA_SOROT = "#FDE68A";
  const warnaSel = (objs, id, n) => objs.find((o) => o.id === `${id}-s${n}`)?.warna;
  const himpunan = (objs, id, w) => Array.from({ length: 40 }, (_, i) => i + 1).filter((n) => warnaSel(objs, id, n) === w);
  // saringan sendiri
  const prima = [];
  const coretSet = new Set([1]);
  for (let n = 2; n <= 40; n += 1) {
    if (coretSet.has(n)) continue;
    prima.push(n);
    for (let m = 2 * n; m <= 40; m += n) coretSet.add(m);
  }
  sama(prima, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37], "saringan: bilangan prima sampai 40");
  cek(prima.every((n) => faktorDari(n).length === 2) && Array.from({ length: 40 }, (_, i) => i + 1).filter((n) => !prima.includes(n) && n > 1).every((n) => faktorDari(n).length > 2), "prima tepat dua faktor, bilangan lain lebih dari dua");
  cek(JSON.stringify(LU2.PRIMA_40) === JSON.stringify(prima), "PRIMA_40 sama dengan hasil saringan mandiri");
  const sv = adegan(U, "luar-sv");
  const ketuk = (n) => akhirAdegan(sv, n);
  const sebelum = (hingga) => {
    const s = new Set([1]);
    for (const n of hingga) for (let m = 2 * n; m <= 40; m += n) s.add(m);
    return [...s].sort((x, y) => x - y);
  };
  stat.saring += 4;
  sama(himpunan(ketuk(0), "sv", WARNA_CORET), [1], "saringan #1: hanya satu dicoret");
  sama([himpunan(ketuk(1), "sv", WARNA_CORET), himpunan(ketuk(1), "sv", WARNA_PRIMA)], [sebelum([2]), [2]], "saringan #2: kelipatan 2 dicoret, 2 dibiarkan");
  sama([himpunan(ketuk(2), "sv", WARNA_CORET), himpunan(ketuk(2), "sv", WARNA_PRIMA)], [sebelum([2, 3]), [2, 3]], "saringan #3: kelipatan 3 ikut dicoret");
  sama([himpunan(ketuk(3), "sv", WARNA_CORET), himpunan(ketuk(3), "sv", WARNA_PRIMA)], [sebelum([2, 3, 5, 7]), prima], "saringan #4: sisanya prima");
  // kelipatan 3 baru dan genap sesuai hitungan
  sama(sebelum([2, 3]).filter((n) => n % 3 === 0 && n % 2 === 1), [9, 15, 21, 27, 33, 39], "kelipatan 3 yang baru dicoret");
  sama(sebelum([2, 3, 5]).filter((n) => n % 5 === 0 && n % 2 === 1 && n % 3 !== 0), [25, 35], "kelipatan 5 yang baru dicoret");
  // penerapan: sorot
  const sw = adegan(U, "luar-sv-terapan");
  const sor = (i) => himpunan(akhirAdegan(sw, i), "sw", WARNA_SOROT);
  stat.saring += 4;
  sama(sor(0), [3, 6, 9, 12, 15, 18, 21, 24, 27], "kisi: kelipatan 3 kurang dari 30");
  sama(sor(1), [8, 12, 16, 20, 24], "kisi: kelipatan 4 lebih dari 7 kurang dari 25");
  sama(sor(2), [20, 25, 30], "kisi: kelipatan 5 lebih dari 17 kurang dari 35");
  sama([sor(3), himpunan(akhirAdegan(sw, 3), "sw", WARNA_CORET), himpunan(akhirAdegan(sw, 3), "sw", WARNA_PRIMA)], [[13, 25], sebelum([2, 3, 5, 7]).filter((n) => n !== 25), prima.filter((n) => n !== 13)], "kisi akhir: 25 disorot, 13 disorot, yang lain tersaring");
  // beda untuk pembagi: 25 punya 5 sebagai faktor, 13 tidak punya faktor selain 1 dan 13
  sama([faktorDari(25), faktorDari(13)], [[1, 5, 25], [1, 13]], "faktor 25 dan faktor 13");
}

/* ------------------------------ Hitungan buku dan rubrik, dihitung ulang mandiri ------------------------------ */
{
  // faktor yang dikunci Panduan Guru
  const KUNCI_FAKTOR = [[12, [1, 2, 3, 4, 6, 12]], [20, [1, 2, 4, 5, 10, 20]], [24, [1, 2, 3, 4, 6, 8, 12, 24]], [25, [1, 5, 25]], [52, [1, 2, 4, 13, 26, 52]], [27, [1, 3, 9, 27]], [10, [1, 2, 5, 10]], [48, [1, 2, 3, 4, 6, 8, 12, 16, 24, 48]]];
  for (const [n, f] of KUNCI_FAKTOR) {
    stat.kunci += 1;
    sama(faktorDari(n), f, `faktor ${n}: hitungan mandiri sama dengan kunci buku`);
  }
  // kelipatan
  const kel = (b, bat) => Array.from({ length: 12 }, (_, i) => b * (i + 1)).filter(bat);
  sama([kel(6, (v) => v < 40), kel(5, (v) => v > 17 && v < 35), kel(3, (v) => v < 30), kel(4, (v) => v > 7 && v < 25), kel(3, () => true).slice(0, 6)], [[6, 12, 18, 24, 30, 36], [20, 25, 30], [3, 6, 9, 12, 15, 18, 21, 24, 27], [8, 12, 16, 20, 24], [3, 6, 9, 12, 15, 18]], "kelipatan Ayo Berlatih dan Uji Kompetensi 7 dan 14");
  // Karel dan Slamet, kartu Andi
  sama([Array.from({ length: 7 }, (_, i) => 2 * (i + 1)), Array.from({ length: 7 }, (_, i) => 3 * (i + 1))], [[2, 4, 6, 8, 10, 12, 14], [3, 6, 9, 12, 15, 18, 21]], "kelereng Karel dan Slamet");
  sama([Math.floor(6 / 2) * 4, [1, 3, 5].map((h) => 4 * ((h + 1) / 2))], [12, [4, 8, 12]], "kartu Andi: hari 1, 3, 5 dan hari ke-6 = 12");
  sama([2 + 2 + 2 + 2, 4 * 2], [8, 8], "hari ke-4 Karel: 2 + 2 + 2 + 2 = 4 × 2 = 8");
  // lampu: tiap dua menit dari 18.10
  sama([0, 1, 2, 3].map((i) => `18.${10 + 2 * i}`), ["18.10", "18.12", "18.14", "18.16"], "lampu merah: 18.10, 18.12, 18.14, 18.16");
  // Uji Kompetensi 3-6 dan cerita
  sama([134 + 764, 345 + 491, 222 + 519, 674 + 142 + 213], [898, 836, 741, 1029], "Uji Kompetensi 3: penjumlahan");
  sama([712 - 324, 523 - 145, 612 - 389, 881 - 458], [388, 378, 223, 423], "Uji Kompetensi 4: pengurangan");
  sama([21 * 4, 32 * 3, 22 * 6, 45 * 5], [84, 96, 132, 225], "Uji Kompetensi 5: perkalian");
  sama([96 / 3, 72 / 3, 48 / 2, 70 / 5], [32, 24, 24, 14], "Uji Kompetensi 6: pembagian");
  sama([256 - 179, 36 + 111 - 54, 111 + 36, 147 - 54, (128 + 76) / 6, 128 + 76, 24 * 8, (3 * 30) / 5, 3 * 30], [77, 93, 147, 93, 34, 204, 192, 18, 90], "Uji Kompetensi 9 sampai 13");
  // Pengayaan
  const sumber = [570, 1140, 1710, 2280, 2850, 3420, 3990];
  sama([570 * 7, sumber.map((v, i) => 570 * (i + 1)), 340 + 235 + 150, 340 + 235, 12 * 8, 10 * 8, 2 * 8, 80 + 16, 785 - 59 - 97, 785 - 59, 48 / 8, 48 / 4, 96 / 48], [3990, sumber, 725, 575, 96, 80, 16, 96, 629, 726, 6, 12, 2], "Pengayaan 1 sampai 5");
  cek(48 / 8 !== 48 / 4, "Pengayaan 5a: soal (8 siswa) dan kunci (4 siswa) berbeda: 6 dan 12 kelompok");
  stat.kunci += 14;
  // 5 butir miskonsepsi, tiga ketukan penyusun, dan lima butir refleksi buku
  sama(akhirAdegan(adegan(M, "miskonsepsi"), 1).filter((o) => /^mk\d-k$/.test(o.id)).length, 5, "lima miskonsepsi tampak di video");
  const refl = ["rf1-k", "rf2-k", "rf3-k", "rf4-k", "rf5-k", "rf6-k"];
  const adaRefl = new Set(adegan(M, "refleksi").ketukan.flatMap((_, i) => akhirAdegan(adegan(M, "refleksi"), i).filter((o) => refl.includes(o.id)).map((o) => o.id)));
  cek(adaRefl.size === 6, `Refleksi dibagi per butir (${adaRefl.size} butir tampak)`);
}

/* ------------------------------ Kutipan buku (bila PDF dan python tersedia) ------------------------------ */
{
  const bs = new URL("../bahan-sd/Matematika-BS-KLS-IV.pdf", import.meta.url);
  const bg = new URL("../bahan-sd/Matematika-BG-KLS-IV.pdf", import.meta.url);
  const jalur = (u) => u.pathname.replace(/^\/([A-Za-z]:)/, "$1");
  const SKRIP = "import sys,pymupdf\nsys.stdout.reconfigure(encoding='utf-8')\nd=pymupdf.open(sys.argv[1])\nfor p in range(int(sys.argv[2])-1,int(sys.argv[3])):\n    print(d[p].get_text())\n";
  const ambil = (berkas, dari, sampai) => {
    const r = spawnSync("python", ["-I", "-c", SKRIP, jalur(berkas), String(dari), String(sampai)], { encoding: "utf8", maxBuffer: 1 << 26, env: { ...process.env, PYTHONIOENCODING: "utf-8" } });
    return r.status === 0 ? r.stdout : null;
  };
  // Buku Siswa hlm. 48-54 = PDF 60-66; Panduan Guru hlm. 70-88 = PDF 82-100 (offset kelas IV: PDF dikurangi 12).
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 60, 66), ambil(bg, 82, 100)] : [null];
  if (bagian.some((b) => b === null)) console.log("PDF atau python (pymupdf) tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/ /g, " ").replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const buku = bersih(bagian.join("\n"));
    let n = 0;
    for (const a of M.adegan) {
      for (const kt of a.kutipan ?? []) {
        n += 1;
        cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
      }
    }
    cek(M.adegan.every((a) => (a.kutipan ?? []).length >= 3), "tiap adegan materi punya kutipan buku");
    // kunci yang dipakai video benar-benar ada di Panduan Guru
    const bgSaja = bersih(bagian[1]);
    for (const s of ["jawaban a = 10, b = 5, c = 4, dan d = 10", "jawaban b = 24, b = 16, c = 12, d = 6, dan e = 8", "faktor dari 24 adalah 1,2,3,4,6,8,12,24", "faktor dari 25 adalah 1,5,25", "faktor dari 52 adalah 1,2,4,13,26,52", "3,6,9,12,15,18,21", "kelipatan dari 3 adalah 3,6,9,12,15,18", "20,25,30", "12 kartu anime", "8.002", "delapan ribu dua", "898", "836", "741", "1.029", "388", "378", "223", "423", "84", "225", "132", "3, 6, 9, 12, 15, 18, 21, 24, 27", "8, 12, 16, 20, 24", "256 – 179 = 77", "36 + 111 – 54 = 93", "(128 + 76) : 6 = 34", "24 x 8 = 192", "(3 x 30) : 5 = 90 : 5 = 18", "3.990 buah mangga", "725 kilogram buah", "= 96 pensil tulis", "= 629", "18.10, 18.12, 18.14, 18.16"]) cek(bgSaja.includes(bersih(s)), `Panduan Guru memuat kunci "${s}"`);
    // Buku Siswa memuat soal yang dihitung ulang
    const bsSaja = bersih(bagian[0]);
    for (const s of ["134 + 764", "345 + 491", "222 + 519", "674 + 142 + 213", "712 – 324", "523 – 145", "612 – 389", "881 – 458", "21 × 4", "32 × 3", "22 × 6", "45 × 5", "96 : 3", "72 : 3", "48 : 2", "70 : 5", "256 siswa", "179 siswa", "36 kelereng", "111 kelereng", "54 kelerengnya", "128 gantungan kunci", "76 gantungan", "24 botol", "30 permen", "pukul 18.10 wib"]) cek(bsSaja.includes(bersih(s)), `Buku Siswa memuat "${s}"`);
    console.log(`Kutipan buku diperiksa: ${n}`);
  }
}


/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k4b1i-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k4b1i-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k4b1i sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../video-k4b1i.tsx", folder), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_I41|video-k4b2-umum|video-k4b1-umum|naskah-k4b1/.test(pembungkus) && /VIDEO_MATERI_K4B1I/.test(pembungkus) && /VIDEO_LUAR_K4B1I/.test(pembungkus) && /export function VideoK4B1I/.test(pembungkus) && /DaftarVideoCerita/.test(pembungkus) && !/mulaiLangsung/.test(pembungkus) && /a: 0, k: 0/.test(pembungkus) && /a: 1, k: 3/.test(pembungkus), "pembungkus video-k4b1i: mesin Story, tanpa naskah lama");
  cek(!pembungkus.includes("\r"), "pembungkus video-k4b1i: akhir baris LF");
  const uji = readFileSync(new URL("../../../../scripts/uji-story-k4b1i.mjs", folder), "utf8");
  cek(!uji.includes("\r"), "uji-story-k4b1i: akhir baris LF");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.persamaan} persamaan, ${stat.sisa} pembagian bersisa, ${stat.banding} perbandingan, ${stat.format} angka berformat, ${stat.deret} deret, ${stat.faktor} deret faktor, ${stat.busur} busur, ${stat.garisBil} titik garis bilangan, ${stat.benda} kelompok benda, ${stat.tabel} sel tabel, ${stat.saring} kisi saringan, ${stat.kunci} kunci, ${stat.angkaSuara} bilangan suara, ${stat.kartu} teks kartu, ${stat.teksPasang} pasang teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
