// Uji Story Kelas 4 Bab 3 Sub-Bab B (Pola Bilangan, penutup bab): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar (bilangan >= 100 yang diucapkan dengan kata dibaca ulang menjadi angka), perubahan gambar tiap ketukan,
// keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar, kutipan buku (bila PDF ada), persamaan di gambar dihitung ulang,
// deret kotak bilangan (beda tetap, label busur sama dengan selisih), garis bilangan (titik di posisi yang benar), jumlah benda Uji Kompetensi 1-4 dan Pengayaan,
// kisi persegi satuan Pengayaan 1-2, tabel hasil panen/televisi/Latihan 5, hitungan mandiri kunci jawaban (beda, suku ke-n, tabel, rubrik),
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k4b3b.mjs   (PEMICU=1 mencetak kata pemicu tiap aksi untuk ditinjau)
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/[.][a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b3b-video.ts");
const LU = await import("../src/components/modul/story/k4b3b-luar-2.ts");

const stat = { persamaan: 0, banding: 0, angkaSuara: 0, teksPasang: 0, format: 0, kartu: 0, deret: 0, busur: 0, garisBil: 0, benda: 0, kunci: 0, tabel: 0 };
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
  const s = ekspr.replace(/(?<=\d)\.(?=\d{3}(?!\d))/g, "").replace(/−/g, "-").replace(/×/g, "*").replace(/÷/g, "/");
  if (!/^[\d\s+\-*/().]+$/.test(s)) return NaN;
  return Function(`"use strict"; return (${s});`)();
};
sama([nilai("20 + 4 × 8"), nilai("(14 + 16) ÷ 2"), nilai("76 − 6 × 8"), nilai("7 × 3 + 17")], [52, 15, 28, 38], "evaluator aritmetika");

const VIDEO = [V.VIDEO_MATERI_K4B3B, V.VIDEO_LUAR_K4B3B];
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
    cek(a.sumber.length > 8 && a.sumber.length <= 66 && a.judul.length > 5 && /^#[0-9A-Fa-f]{6}$/.test(a.latar), `${nama}: sumber (paling banyak 66 huruf agar muat kanvas), judul, dan latar ada (${a.sumber.length})`);
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
const M_VIDEO = V.VIDEO_MATERI_K4B3B;
// Adegan administratif (pembuka, tujuan, peta konsep, panduan awal; di B: rubrik, remedial, refleksi, penutup) tidak lagi diputar di video materi.
// Adegannya tetap ada di berkas materi, jadi pemeriksaan isi memakai daftar penuh; hanya jumlah dan urutan adegan diuji terhadap video yang diputar.
const MODUL_MATERI = Object.assign({}, await import("../src/components/modul/story/k4b3b-materi-1.ts"), await import("../src/components/modul/story/k4b3b-materi-2.ts"), await import("../src/components/modul/story/k4b3b-materi-3.ts"));
const M = { ...M_VIDEO, adegan: [MODUL_MATERI.ADEGAN_PEMBUKA_B, MODUL_MATERI.ADEGAN_MENGAMATI, MODUL_MATERI.ADEGAN_KASUS_1, MODUL_MATERI.ADEGAN_KASUS_2, MODUL_MATERI.ADEGAN_TELUR, MODUL_MATERI.ADEGAN_BERLATIH_1, MODUL_MATERI.ADEGAN_BERLATIH_2, MODUL_MATERI.ADEGAN_BERLATIH_CERITA, MODUL_MATERI.ADEGAN_REKAP_BEDA, MODUL_MATERI.ADEGAN_UK_GAMBAR, MODUL_MATERI.ADEGAN_UK_BILANGAN, MODUL_MATERI.ADEGAN_UK_CERITA, MODUL_MATERI.ADEGAN_RUBRIK, MODUL_MATERI.ADEGAN_PENGAYAAN_1, MODUL_MATERI.ADEGAN_PENGAYAAN_2, MODUL_MATERI.ADEGAN_PENUTUP_B] };
const U = V.VIDEO_LUAR_K4B3B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksVisible = (objs) => objs.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi).map((o) => o.isi);
/** Semua teks yang pernah tampak di sebuah adegan (gabungan semua ketukan). */
const teksAdegan = (v, id) => new Set(adegan(v, id).ketukan.flatMap((kt, i) => L.kataDari(kt.suara).flatMap((_, p) => teksVisible(L.keadaanStory(adegan(v, id), i, p)))));
const seluruhTeks = (v) => v.adegan.map((a) => [a.judul, a.sumber, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
{
  const teksVideo = (v) => JSON.stringify(seluruhTeks(v));
  const NAMA_METODE = /Arithmetic Sequence|Function Machine|Table of Values|Number Line Jumps|Barisan Aritmetika Sederhana|Mesin Fungsi|Tabel Nilai|Loncatan di Garis Bilangan/;
  const KATA_METODE = /metode luar|metode dari luar/i;
  const METODE_LAIN = /Repeating Pattern|Growing Pattern|Visual Structure|Pola Berulang|Pola Bertambah|Struktur Visual/;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi) && !KATA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Arithmetic Sequence", "Function Machine", "Table of Values", "Number Line Jumps", "Barisan Aritmetika Sederhana", "Mesin Fungsi", "Tabel Nilai", "Loncatan di Garis Bilangan"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(!METODE_LAIN.test(materi + luar), "tidak memuat metode luar Sub-Bab A");
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
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => a.sumber.length <= 46), "video metode luar: label sumber cukup pendek");
  cek(U.adegan.every((a) => /metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Sub-Bab B", "Ayo Mengamati", "Ayo Berpikir", "Kasus", "Ingat", "Latihan", "Uji", "Tantangan", "Refleksi", "orang tua", "Rubrik", "remedial", "membesar", "mengecil"]) cek(new RegExp(kata, "i").test(materi), `video materi memuat "${kata}"`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-as", "luar-as-terapan", "luar-fm", "luar-fm-terapan", "luar-tv", "luar-tv-terapan", "luar-nj", "luar-nj-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk empat metode");
  cek(M_VIDEO.adegan.length === 13 && U.adegan.length === 10, "13 adegan materi diputar dan 10 adegan metode luar");
  cek(!/piktogram|diagram batang|pecahan|volume|bbab empat|bbab dua|bbab satu/i.test(materi + luar), `tidak membahas bab lain (${(materi + luar).match(/piktogram|diagram batang|pecahan|volume|bbab empat|bbab dua|bbab satu/i)?.[0]})`);
  cek(totalKetukan >= 70, `total ketukan cukup dalam (${totalKetukan})`);
  // metode luar memakai angka buku
  for (const kata of ["20 + 4 × 8 = 52", "10 + 9 × 4 = 46", "36 − 6 × 5 = 6", "20 + 6 × 3 = 38", "6 × 2 + 1 = 13", "5 × 4 + 1 = 21", "7 × 3 + 17 = 38", "76 − 6 × 6 = 40", "76 − 6 × 8 = 28", "49 − 31 = 18", "34 − 22 = 12", "8 × 5 + 12 = 52"]) cek(luar.includes(kata), `video metode luar memuat "${kata}"`);
  // hitungan pengecekan dan rubrik tampak di video materi
  for (const kata of ["40 + 60 = 100", "4 × 10 = 40", "6 × 10 = 60", "3 × 6 = 18", "6 × 6 = 36", "18 − 4 = 14", "36 − 16 = 20", "6 × 5 = 30", "36 − 30 = 6", "9 × 4 = 36", "10 + 36 = 46"]) cek(materi.includes(kata), `video materi memuat "${kata}"`);
}

/* ------------------------------ Persamaan, perbandingan, urutan, dan format di gambar dihitung ulang ------------------------------ */
{
  const BENTUK_PERSAMAAN = /^[\d.\s+−×÷()]+( = [\d.]+)+$/;
  const bersihkan = (t) => {
    let s = t.includes(": ") ? t.slice(t.lastIndexOf(": ") + 2) : t;
    s = s.replace(/^[a-e]\. /, "").split(/,s/)[0].replace(/\s[A-Za-z][A-Za-z ]*$/, "");
    return s;
  };
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
          const b = o.isi.match(/^(\d[\d.]*) ([<>]) (\d[\d.]*)$/);
          if (b) {
            stat.banding += 1;
            cek(b[2] === "<" ? Number(b[1]) < Number(b[3]) : Number(b[1]) > Number(b[3]), `${nama}: perbandingan "${o.isi}" benar`);
          }
          for (const t of o.isi.replace(/Tabel \d\.\d/g, "").match(/\d[\d.]*\d|\d/g) ?? []) {
            stat.format += 1;
            cek(!t.includes(".") || /^\d{1,3}(\.\d{3})+$/.test(t), `${nama}: format ribuan "${t}" pada "${o.isi}"`);
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
  cek(n > 100, `jumlah lintasan yang diperiksa batas kanvasnya (${n})`);
}

/* ------------------------------ Deret kotak bilangan: beda tetap dan label busur sama dengan selisih ------------------------------ */
const angka = (t) => (t === undefined || t === "?" ? null : Number(String(t).replace("−", "-").replace("+", "")));
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
const semuaDeretAkhir = []; // untuk pencocokan terhadap kunci: { adegan, nilai[] }
{
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        const g = kelompokDeret(akhirAdegan(a, i));
        for (const [pre, d] of Object.entries(g)) {
          const nama = `${v.id}/${a.id}#${i + 1} deret ${pre}`;
          stat.deret += 1;
          // label busur sama dengan selisih dua kotak yang berdampingan
          d.label.forEach((lab, j) => {
            if (lab === undefined) return;
            const p = angka(d.nilai[j]);
            const q = angka(d.nilai[j + 1]);
            if (p === null || q === null) return;
            stat.busur += 1;
            cek(q - p === angka(lab), `${nama}: busur ${j} berlabel ${lab} sama dengan selisih ${q} − ${p}`);
          });
          // tanpa label: semua kemiringan antara kotak yang diketahui sama (beda tetap)
          const adaLabel = d.label.some((x) => x !== undefined);
          const tahu = d.nilai.map((t, idx) => [idx, angka(t)]).filter((p) => p[1] !== null);
          const lereng = [];
          for (let q = 1; q < tahu.length; q += 1) lereng.push((tahu[q][1] - tahu[q - 1][1]) / (tahu[q][0] - tahu[q - 1][0]));
          if (!adaLabel && lereng.length >= 1) cek(lereng.every((x) => Number.isInteger(x) && x === lereng[0]), `${nama}: beda tetap (${lereng.join(", ")})`);
          // label sama semua (beda tetap) kecuali pola berbeda berubah (Pengayaan 4 dan 5)
          const labs = d.label.filter((x) => x !== undefined).map(angka);
          if (!/^(p3|p4|p5|kd)$/.test(pre) && labs.length >= 2) cek(labs.every((x) => x === labs[0]), `${nama}: label busur sama semua (${labs.join(", ")})`);
          if (/^(p3|p4|p5|kd)$/.test(pre) && labs.length >= 2) cek(labs.every((x, q) => q === 0 || x - labs[q - 1] === (labs[0] > 0 ? 1 : -1)), `${nama}: beda berubah satu demi satu (${labs.join(", ")})`);
        }
        if (i === a.ketukan.length - 1 || true) for (const [pre, d] of Object.entries(g)) semuaDeretAkhir.push({ adegan: `${v.id}/${a.id}`, pre, nilai: d.nilai.map(angka) });
      });
    }
  }
}

/* ------------------------------ Garis bilangan: titik pada posisi yang benar, loncatan sama dengan beda ------------------------------ */
{
  const bandingGaris = (nama, objs, L2, dari, sampai, nilaiHarap) => {
    const garisObj = objs.find((o) => o.id === `${L2}g-g` || o.id === `${L2.replace(/\d+$/, "")}-g`);
    cek(!!garisObj, `${nama}: garis bilangan ${L2} ada`);
    if (!garisObj) return;
    const s = garisObj.x2 / (sampai - dari);
    nilaiHarap.forEach((v, i) => {
      const p = objs.find((o) => o.id === `${L2}${i}-p`);
      const t = objs.find((o) => o.id === `${L2}${i}-v`);
      if (!p || !t) return;
      stat.garisBil += 1;
      cek(Math.abs(p.x - (garisObj.x + (v - dari) * s)) < 0.11, `${nama}: titik ${v} berada di posisi garis bilangan (x=${p.x}, harap ${garisObj.x + (v - dari) * s})`);
      cek(t.isi === String(v), `${nama}: tulisan titik ${t.isi} sama dengan ${v}`);
      const j = objs.find((o) => o.id === `${L2}j${i - 1}-l`);
      if (j && i > 0) {
        const b = v - nilaiHarap[i - 1];
        cek(angka(j.isi) === b, `${nama}: loncatan ${j.isi} sama dengan selisih ${v} − ${nilaiHarap[i - 1]}`);
        const arc = objs.find((o) => o.id === `${L2}j${i - 1}-j`);
        const dx = Number(arc.d.match(/Q\S+ \S+ (-?[\d.]+) 0/)[1]);
        cek(Math.abs(dx - (v - nilaiHarap[i - 1]) * s) < 0.2, `${nama}: panjang busur ${dx} sama dengan ${(v - nilaiHarap[i - 1]) * s}`);
      }
    });
  };
  const nj = adegan(U, "luar-nj-terapan");
  nj.ketukan.forEach((_, i) => {
    const objs = akhirAdegan(nj, i);
    const L2 = ["na", "nb", "nc", "nd"][i];
    const c = LU.GARIS_BIL[L2];
    bandingGaris(`nj-terapan#${i + 1}`, objs, L2, c.dari, c.sampai, c.nilai);
    cek(objs.filter((o) => /-p$/.test(o.id)).length === 5, `nj-terapan#${i + 1}: lima titik di akhir`);
  });
  sama(Object.values(LU.GARIS_BIL).map((c) => c.nilai.length), [5, 5, 5, 5], "garis bilangan: lima suku tiap garis");
  sama(LU.GARIS_BIL.na.nilai.map((v, i, a) => (i ? v - a[i - 1] : 0)).slice(1), [3, 3, 3, 3], "Kasus 1: beda +3");
  sama(LU.GARIS_BIL.nb.nilai.map((v, i, a) => (i ? v - a[i - 1] : 0)).slice(1), [-5, -5, -5, -5], "Kasus 2: beda −5");
  sama(LU.GARIS_BIL.nc.nilai.map((v, i, a) => (i ? v - a[i - 1] : 0)).slice(1), [1, 2, 3, 4], "Pengayaan 4: beda 1, 2, 3, 4");
  sama(LU.GARIS_BIL.nd.nilai.map((v, i, a) => (i ? v - a[i - 1] : 0)).slice(1), [-1, -2, -3, -4], "Pengayaan 5: beda −1, −2, −3, −4");
  // garis bilangan konsep (kp: 3, 5, 7, 9, 11)
  {
    const objs = akhirAdegan(adegan(U, "luar-nj"), 0);
    const g = objs.find((o) => o.id === "kg-g");
    const s = g.x2 / (11 - 3);
    [3, 5, 7, 9, 11].forEach((v, i) => {
      const p = objs.find((o) => o.id === `kp${i}-p`);
      stat.garisBil += 1;
      cek(Math.abs(p.x - (g.x + (v - 3) * s)) < 0.11 && objs.find((o) => o.id === `kp${i}-v`).isi === String(v), `nj konsep: titik ${v} di posisi yang benar`);
    });
    cek(["kj0", "kj1", "kj2", "kj3"].every((q) => objs.find((o) => o.id === `${q}-l`).isi === "+2"), "nj konsep: loncatan +2 tiap busur");
  }
}

/* ------------------------------ Benda Uji Kompetensi 1-4, Pengayaan 1-3 ------------------------------ */
{
  const kelompokBenda = (objs, re) => {
    const g = {};
    for (const o of objs) {
      const m = o.id.match(re);
      if (m) g[m[1]] = (g[m[1]] ?? 0) + 1;
    }
    return g;
  };
  // Uji Kompetensi 1-4: jumlah benda tiap gambar sama dengan angka di bawahnya; beda tetap; jawaban = suku terakhir + beda
  {
    const sebelumnya = [0, 1, 2, 3].map((i) => akhirAdegan(adegan(M, "uk-gambar"), i));
    const semua = [...sebelumnya.flat()];
    const hit = kelompokBenda(semua, /^(u[1-4][a-d])-[ch]\d+$/);
    const tulisan = (id) => Number(semua.find((o) => o.id === `${id}-v`).isi);
    const soal = { u1: ["a", "b", "c", "d"], u2: ["a", "b", "c"], u3: ["a", "b", "c"], u4: ["a", "b", "c"] };
    const HARAP_BENDA = { u1: [1, 3, 5, 7], u2: [2, 4, 6], u3: [10, 8, 6], u4: [18, 15, 12] };
    const KUNCI_JAWAB = { u1: 9, u2: 8, u3: 4, u4: 9 };
    for (const [u, hurufs] of Object.entries(soal)) {
      const cacah = hurufs.map((h) => hit[`${u}${h}`]);
      stat.benda += cacah.length;
      sama(cacah, HARAP_BENDA[u], `Uji Kompetensi ${u.slice(1)}: jumlah benda tergambar`);
      sama(hurufs.map((h) => tulisan(`${u}${h}`)), cacah, `Uji Kompetensi ${u.slice(1)}: tulisan sama dengan benda tergambar`);
      const beda = cacah[1] - cacah[0];
      cek(cacah.every((x, q) => q === 0 || x - cacah[q - 1] === beda), `Uji Kompetensi ${u.slice(1)}: beda tetap ${beda}`);
      cek(cacah[cacah.length - 1] + beda === KUNCI_JAWAB[u] && Number(semua.find((o) => o.id === `${u}z-v`).isi) === KUNCI_JAWAB[u], `Uji Kompetensi ${u.slice(1)}: jawaban ${cacah[cacah.length - 1]} + (${beda}) = kunci ${KUNCI_JAWAB[u]}`);
    }
  }
  // Pengayaan 3: kaleng 10, 9, 7, lalu 4
  {
    const semua = [0, 1, 2, 3].flatMap((i) => akhirAdegan(adegan(M, "pengayaan-2"), i));
    const hit = kelompokBenda(semua, /^(p3[a-d])-c\d+$/);
    sama(["p3a", "p3b", "p3c", "p3d"].map((x) => hit[x]), [10, 9, 7, 4], "Pengayaan 3: kaleng 10, 9, 7, 4");
    stat.benda += 4;
  }
  // Pengayaan 1-2: kisi persegi satuan. Gelap dari lintasan, putih = seluruhnya − gelap
  {
    const semua = [...akhirAdegan(adegan(M, "pengayaan-1"), 0), ...akhirAdegan(adegan(M, "pengayaan-1"), 1)];
    const hitung = (id, kol) => {
      const fr = semua.find((o) => o.id === `${id}-fr`);
      const d = semua.find((o) => o.id === `${id}-d`);
      const c = fr.w / kol;
      const baris = Math.round(fr.h / c);
      const gelap = (d.d.match(/Z/g) ?? []).length;
      return { gelap, putih: kol * baris - gelap, baris, kol };
    };
    const p1 = [0, 1, 2, 3].map((i) => hitung(`g1${i}`, 3));
    const p2 = [0, 1, 2, 3].map((i) => hitung(`g2${i}`, i + 3));
    stat.benda += 8;
    sama(p1.map((x) => x.gelap), [1, 2, 3, 4], "Pengayaan 1: gelap 1, 2, 3, 4");
    sama(p1.map((x) => x.putih), [8, 10, 12, 14], "Pengayaan 1: putih dihitung dari kisi 8, 10, 12, 14 (kunci)");
    sama(p2.map((x) => x.gelap), [1, 4, 9, 16], "Pengayaan 2: gelap 1, 4, 9, 16");
    sama(p2.map((x) => x.putih), [8, 12, 16, 20], "Pengayaan 2: putih dihitung dari kisi 8, 12, 16, 20 (kunci)");
    sama(p2.map((x) => [x.kol, x.baris]), [[3, 3], [4, 4], [5, 5], [6, 6]], "Pengayaan 2: kisi 3x3, 4x4, 5x5, 6x6");
    sama(p1.map((x) => [x.kol, x.baris]), [[3, 3], [3, 4], [3, 5], [3, 6]], "Pengayaan 1: kisi 3 kolom dengan 3, 4, 5, 6 baris");
    // tabel di gambar sama dengan hitungan kisi
    const tab = (id, r) => [1, 2, 3, 4].map((c) => Number(semua.find((o) => o.id === `${id}-t${r}${c}`).isi));
    stat.tabel += 4;
    sama([tab("pa", 1), tab("pa", 2)], [p1.map((x) => x.gelap), p1.map((x) => x.putih)], "tabel Pengayaan 1 sama dengan hitungan kisi");
    sama([tab("pb", 1), tab("pb", 2)], [p2.map((x) => x.gelap), p2.map((x) => x.putih)], "tabel Pengayaan 2 sama dengan hitungan kisi");
  }
}

/* ------------------------------ Tabel: hasil panen telur, produksi televisi, Latihan 5, Uji Kompetensi 8 ------------------------------ */
{
  const sel = (objs, id, r, c) => objs.find((o) => o.id === `${id}-t${r}${c}`)?.isi;
  const telur = akhirAdegan(adegan(M, "telur"), 1);
  const panen = [1, 2, 3, 4, 5].map((r) => Number(sel(telur, "tt", r, 1)));
  stat.tabel += 5;
  sama(panen, [20, 28, 36, 44, 52], "tabel telur: hasil panen 20, 28, 36, 44, 52");
  sama([1, 2, 3, 4, 5].map((r) => sel(telur, "tt", r, 3)), ["20", "28 − 20 = 8", "36 − 28 = 8", "44 − 36 = 8", "52 − 44 = 8"], "tabel telur: kolom beda");
  sama([1, 2, 3, 4, 5].map((r) => sel(telur, "tt", r, 2)), ["20", "20 + 8", "20 + 8 + 8", "20 + 8 + 8 + 8", "20 + 8 + 8 + 8 + 8"], "tabel telur: kolom uraian");
  cek(panen.every((x, r) => x === 20 + 8 * r), "telur: suku ke-n = 20 + (n − 1) × 8");
  const tv = akhirAdegan(adegan(M, "berlatih-cerita"), 3);
  const bulan = [1, 2, 3, 4, 5, 6, 7, 8].map((r) => sel(tv, "tv", r, 0));
  const prod = [1, 2, 3, 4, 5, 6, 7, 8].map((r) => Number(sel(tv, "tv", r, 1)));
  sama(bulan, ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus"], "tabel televisi: nama bulan berurutan");
  sama(prod, [70, 64, 58, 52, 46, 40, 34, 28], "tabel televisi: 70 sampai 28");
  cek(prod.every((x, r) => x === 70 - 6 * r), "televisi: suku ke-n = 70 − (n − 1) × 6");
  sama([prod[5], prod[7]], [40, 28], "televisi: Juni 40 dan Agustus 28 (kunci Panduan Guru hlm. 133)");
  stat.tabel += 11;
  // tabel Urutan | Nilai | Beda pada metode luar: nilai berurutan sesuai beda
  const periksaUNB = (id, nama, ketukan, v) => {
    const objs = akhirAdegan(adegan(U, id), ketukan);
    const nilaiBaris = [1, 2, 3, 4, 5, 6].map((r) => angka(sel(objs, nama, r, 1)));
    const bedaBaris = [2, 3, 4, 5, 6].map((r) => angka(sel(objs, nama, r, 2)));
    stat.tabel += 6;
    return { nilaiBaris, bedaBaris, v };
  };
  const l5 = periksaUNB("luar-tv-terapan", "tl", 1, "Latihan 5");
  sama(l5.nilaiBaris, [13, 22, 31, 40, 49, 58], "Latihan 5: tabel terisi 13, 22, 31, 40, 49, 58");
  sama(l5.bedaBaris, [9, 9, 9, 9, 9], "Latihan 5: beda tabel 9");
  const u8 = periksaUNB("luar-tv-terapan", "tm", 3, "Uji Kompetensi 8");
  sama(u8.nilaiBaris, [40, 34, 28, 22, 16, 10], "Uji Kompetensi 8: tabel terisi 40, 34, 28, 22, 16, 10");
  sama(u8.bedaBaris, [-6, -6, -6, -6, -6], "Uji Kompetensi 8: beda tabel −6");
  const kons = akhirAdegan(adegan(U, "luar-tv"), 1);
  sama([1, 2, 3, 4, 5, 6].map((r) => angka(sel(kons, "tc", r, 1))), [3, 5, 7, 9, 11, 13], "Table of Values konsep: nilai 3, 5, ..., 13");
}

/* ------------------------------ Hitungan buku dan rubrik, dihitung ulang mandiri ------------------------------ */
{
  /** Suku ke-n barisan aritmetika dengan suku pertama a dan beda b. */
  const sukuKe = (a, b, n) => a + (n - 1) * b;
  /** Mengisi deret yang punya lubang (null) dari beda tetap yang disimpulkan dari suku yang diketahui; null bila tidak tetap. */
  const isiDeret = (arr, panjang) => {
    const tahu = arr.map((v, i) => [i, v]).filter((p) => p[1] !== null);
    const lereng = [];
    for (let q = 1; q < tahu.length; q += 1) lereng.push((tahu[q][1] - tahu[q - 1][1]) / (tahu[q][0] - tahu[q - 1][0]));
    if (!lereng.every((x) => x === lereng[0])) return null;
    return Array.from({ length: panjang }, (_, i) => tahu[0][1] + lereng[0] * (i - tahu[0][0]));
  };
  // (adegan, nama soal, suku dari buku dengan lubang, panjang deret, kunci Panduan Guru)
  const KUNCI = [
    ["berlatih-1", "Latihan 1", [7, 19, 31, 43, null], 5, [7, 19, 31, 43, 55]],
    ["berlatih-1", "Latihan 2", [12, 27, 42, null, null], 5, [12, 27, 42, 57, 72]],
    ["berlatih-1", "Latihan 3", [96, 85, 74, 63, null], 5, [96, 85, 74, 63, 52]],
    ["berlatih-2", "Latihan 4", [91, 77, 63, null, null], 5, [91, 77, 63, 49, 35]],
    ["berlatih-2", "Latihan 5", [13, 22, 31, null, 49, null], 6, [13, 22, 31, 40, 49, 58]],
    ["berlatih-cerita", "Latihan 6 rak buku", [5, 9, 13], 5, [5, 9, 13, 17, 21]],
    ["berlatih-cerita", "Latihan 7 kursi", [20, 23, 26], 7, [20, 23, 26, 29, 32, 35, 38]],
    ["uk-bilangan", "UK 5", [5, 9, 13, 17, null], 5, [5, 9, 13, 17, 21]],
    ["uk-bilangan", "UK 6", [6, 12, null, 24, null], 5, [6, 12, 18, 24, 30]],
    ["uk-bilangan", "UK 7", [34, 27, 20, 13, null], 5, [34, 27, 20, 13, 6]],
    ["uk-bilangan", "UK 8", [40, 34, null, 22, 16, null], 6, [40, 34, 28, 22, 16, 10]],
    ["uk-cerita", "UK 9 kelapa", [36, 31, 26, 21], 7, [36, 31, 26, 21, 16, 11, 6]],
    ["uk-cerita", "UK 10 bioskop", [10, 14, 18], 10, [10, 14, 18, 22, 26, 30, 34, 38, 42, 46]],
    ["telur", "Contoh telur", [20, 28, 36, null, null], 5, [20, 28, 36, 44, 52]],
    ["kasus-1", "Kasus 1", [1, 4, 7, 10, null], 5, [1, 4, 7, 10, 13]],
    ["kasus-2", "Kasus 2", [23, 18, 13, 8, null], 5, [23, 18, 13, 8, 3]],
    ["mengamati", "Ayo Mengamati", [3, 5, 7, 9, 11, null], 6, [3, 5, 7, 9, 11, 13]],
  ];
  for (const [id, nama, tahu, panjang, buku] of KUNCI) {
    const hitung = isiDeret(tahu, panjang);
    stat.kunci += 1;
    sama(hitung, buku, `kunci ${nama}: hitungan mandiri sama dengan kunci buku`);
    // deret itu benar-benar digambar lengkap di adegan
    if (id === "mengamati") {
      const t = akhirAdegan(adegan(M, id), 3);
      sama([1, 2, 3, 4, 5, 6].map((r) => Number(t.find((o) => o.id === `ta-t${r}1`).isi)), buku, "Ayo Mengamati: kolom Bilangan pada tabel sama dengan hitungan");
      continue;
    }
    const ada = semuaDeretAkhir.some((d) => d.adegan === `k4b3b-materi/${id}` && JSON.stringify(d.nilai.slice(0, buku.length)) === JSON.stringify(buku));
    cek(ada, `adegan ${id} menggambar deret ${nama} lengkap: ${buku.join(", ")}`);
  }
  // suku ke-n dengan rumus a + (n − 1) × b
  sama([sukuKe(20, 8, 5), sukuKe(10, 4, 10), sukuKe(36, -5, 7), sukuKe(20, 3, 7), sukuKe(20, 3, 5), sukuKe(5, 4, 5), sukuKe(70, -6, 6), sukuKe(70, -6, 8), sukuKe(3, 2, 6)], [52, 46, 6, 38, 32, 21, 40, 28, 13], "suku ke-n: telur 52, bioskop 46, kelapa 6, kursi 38 dan 32, rak 21, televisi 40 dan 28, ke-6 = 13");
  // mesin fungsi: aturan dari beda dan suku pertama
  sama([2 * 6 + 1, 4 * 5 + 1, 3 * 7 + 17, 76 - 6 * 6, 76 - 6 * 8, 8 * 5 + 12], [13, 21, 38, 40, 28, 52], "mesin fungsi: 13, 21, 38, 40, 28, 52");
  sama([2 * 1 + 1, 4 * 1 + 1, 3 * 1 + 17, 76 - 6 * 1, 8 * 1 + 12], [3, 5, 20, 70, 20], "mesin fungsi cocok di urutan pertama: 3, 5, 20, 70, 20");
  // beda dari selisih dua nilai berjarak dua urutan
  sama([(49 - 31) / 2, (34 - 22) / 2, (11 - 7) / 2], [9, 6, 2], "beda dari selisih dua langkah: 9, 6, 2");
  // beda tiap soal Ayo Berlatih
  const BEDA = [[7, 19], [12, 27], [96, 85], [91, 77], [13, 22], [5, 9], [20, 23], [70, 64]].map(([p, q]) => q - p);
  sama(BEDA, [12, 15, -11, -14, 9, 4, 3, -6], "beda tiap soal Ayo Berlatih");
  sama([BEDA.filter((b) => b > 0).length, BEDA.filter((b) => b < 0).length], [5, 3], "lima soal membesar dan tiga soal mengecil");
  // pola mengecil 32, 28, 24, 20, 16 (Ingat!) turun 4
  sama([28 - 32, 24 - 28, 20 - 24, 16 - 20], [-4, -4, -4, -4], "Ingat!: 32, 28, 24, 20, 16 turun 4");
  // cara cepat banyak loncatan
  sama([36 - 6 * 5, 10 + 9 * 4, 6 * 5, 9 * 4], [6, 46, 30, 36], "cara cepat kelapa dan bioskop");
  // Pengayaan: putih 8 + 2(n − 1) dan (n + 2)^2 − n^2; Pengayaan 4 dan 5 beda berubah satu demi satu
  sama([8 + 2 * 3, (4 + 2) ** 2 - 4 ** 2, 3 * 6 - 4, 36 - 16], [14, 20, 14, 20], "Pengayaan 1 dan 2: putih 14 dan 20");
  sama([[10, 11, 13, 16, 20], [50, 49, 47, 44, 40]].map((d) => d.slice(1).map((v, i) => v - d[i])), [[1, 2, 3, 4], [-1, -2, -3, -4]], "Pengayaan 4 dan 5: beda berubah");
  sama([[10, 9, 7, 4]].map((d) => d.slice(1).map((v, i) => v - d[i])), [[-1, -2, -3]], "Pengayaan 3: kaleng turun 1, 2, 3, berikutnya 4");
  // rubrik Tabel 3.2: sepuluh butir, bobot 10, jumlah 100; butir 1-4 pola gambar dan 5-10 pola bilangan
  const BOBOT = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
  sama([BOBOT.length, BOBOT.reduce((t, b) => t + b, 0), BOBOT.slice(0, 4).reduce((t, b) => t + b, 0), BOBOT.slice(4).reduce((t, b) => t + b, 0)], [10, 100, 40, 60], "rubrik: 10 butir, jumlah 100, pola gambar 40, pola bilangan 60");
  const rubrik = [...teksAdegan(M, "rubrik")].join(" | ");
  cek(["4 × 10 = 40", "6 × 10 = 60", "40 + 60 = 100"].every((s) => rubrik.includes(s)), "rubrik: gambar memuat bobot 40, 60, dan 100");
  // kunci Uji Kompetensi pada rekap rubrik
  const kunciUK = [[9], [8], [4], [9], [21], [18, 30], [6], [28, 10], [6], [46]];
  const objsKunci = akhirAdegan(adegan(M, "rubrik"), 3);
  const tabKunci = [1, 2, 3, 4, 5].map((r) => objsKunci.find((o) => o.id === `q1-t${r}1`).isi).concat([1, 2, 3, 4, 5].map((r) => objsKunci.find((o) => o.id === `q2-t${r}1`).isi));
  sama(tabKunci, kunciUK.map((x) => x.join(", ")), "rekap kunci Uji Kompetensi 1 sampai 10 di gambar");
  stat.kunci += 12;
  // jumlah refleksi guru 9 butir dan interaksi orang tua 6 cara
  sama([9, 6], [9, 6], "refleksi guru 9 butir dan interaksi orang tua 6 cara");
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
  // Buku Siswa hlm. 95-102 = PDF 107-114; Panduan Guru hlm. 129-144 = PDF 141-156 (offset kelas IV: PDF dikurangi 12).
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 107, 114), ambil(bg, 141, 156)] : [null];
  if (bagian.some((b) => b === null)) console.log("PDF atau python (pymupdf) tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/ /g, " ").replace(/mℓ/g, "ml").replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const buku = bersih(bagian.join("\n"));
    let n = 0;
    for (const a of M.adegan) {
      for (const kt of a.kutipan ?? []) {
        n += 1;
        cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
      }
    }
    // kunci yang dipakai video benar-benar ada di Panduan Guru
    const bgSaja = bersih(bagian[1]);
    for (const s of ["55 (43+12)", "72 (57+15)", "52 (63-11)", "35 (49-14)", "58 (49+9)", "adalah 21 buah", "adalah 32 kursi", "adalah 38 kursi", "adalah 40 buah", "adalah 28 buah", "adalah 6 buah", "adalah 46", "30(24+6)", "10(16-6)", "pola gambar adalah 9", "pola gambar adalah 8", "pola gambar adalah 4"]) cek(bgSaja.includes(bersih(s)), `Panduan Guru memuat kunci "${s}"`);
    cek(n >= 100, `jumlah kutipan buku yang diperiksa (${n})`);
    console.log(`Kutipan buku diperiksa: ${n}`);
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k4b3b-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k4b3b-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k4b3b sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../video-k4b3b.tsx", folder), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_B43|video-k4b2-umum|naskah-k4b3/.test(pembungkus) && /VIDEO_MATERI_K4B3B/.test(pembungkus) && /VIDEO_LUAR_K4B3B/.test(pembungkus) && /export function VideoK4B3B/.test(pembungkus) && /DaftarVideoCerita/.test(pembungkus) && !/mulaiLangsung/.test(pembungkus) && /a: 0, k: 0/.test(pembungkus) && /a: 1, k: 3/.test(pembungkus), "pembungkus video-k4b3b: mesin Story, tanpa naskah lama");
  cek(!pembungkus.includes("\r"), "pembungkus video-k4b3b: akhir baris LF");
  const uji = readFileSync(new URL("../../../../scripts/uji-story-k4b3b.mjs", folder), "utf8");
  cek(!uji.includes("\r"), "uji-story-k4b3b: akhir baris LF");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.persamaan} persamaan, ${stat.banding} perbandingan, ${stat.format} angka berformat, ${stat.deret} deret, ${stat.busur} busur, ${stat.garisBil} titik garis bilangan, ${stat.benda} kelompok benda, ${stat.tabel} sel tabel, ${stat.kunci} kunci, ${stat.angkaSuara} bilangan suara, ${stat.kartu} teks kartu, ${stat.teksPasang} pasang teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
