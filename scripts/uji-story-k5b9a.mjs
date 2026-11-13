// Uji Story Kelas 5 Bab 9 Sub-Bab A (membaca, menulis, nilai tempat, termasuk pembuka bab): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// pemisahan materi dan metode luar, kutipan buku (bila PDF ada), hitungan mandiri, emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b9a.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b9a-video.ts");

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

/* Mesin (logika-story) diuji lengkap di scripts/uji-story-k6b4a.mjs. */
cek(typeof L.keadaanStory === "function" && typeof L.posisiKata === "function", "mesin Story tersedia");

/* ------------------------------ Hitungan bilangan mandiri ------------------------------ */
/** Ejaan bilangan Indonesia 0 sampai 1.000.000 (dibuat sendiri, tanpa berkas bab). */
const SAT = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas"];
function tiga(n) {
  const r = [];
  const ratus = Math.floor(n / 100);
  const sisa = n % 100;
  if (ratus === 1) r.push("seratus");
  else if (ratus > 1) r.push(`${SAT[ratus]} ratus`);
  if (sisa > 0) {
    if (sisa < 12) r.push(SAT[sisa]);
    else if (sisa < 20) r.push(`${SAT[sisa - 10]} belas`);
    else {
      r.push(`${SAT[Math.floor(sisa / 10)]} puluh`);
      if (sisa % 10) r.push(SAT[sisa % 10]);
    }
  }
  return r.join(" ");
}
function eja(n) {
  if (n === 0) return "nol";
  if (n === 1000000) return "satu juta";
  const rb = Math.floor(n / 1000);
  const r = [];
  if (rb > 0) r.push(rb === 1 ? "seribu" : `${tiga(rb)} ribu`);
  if (n % 1000 > 0) r.push(tiga(n % 1000));
  return r.join(" ");
}
sama(eja(979875), "sembilan ratus tujuh puluh sembilan ribu delapan ratus tujuh puluh lima", "eja 979.875");
sama(eja(500040), "lima ratus ribu empat puluh", "eja 500.040");
sama(eja(215314), "dua ratus lima belas ribu tiga ratus empat belas", "eja 215.314");
sama(eja(1000000), "satu juta", "eja 1.000.000");
/** Nilai digit: angka dikali nilai tempat. */
const NILAI = [100000, 10000, 1000, 100, 10, 1];
const NAMA_TEMPAT = ["ratus ribuan", "puluh ribuan", "ribuan", "ratusan", "puluhan", "satuan"];
const digitDari = (n) => String(n).padStart(6, "0").split("").map(Number);
const titik = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
sama(titik(979875), "979.875", "titik pemisah 979875");
sama(titik(1000000), "1.000.000", "titik pemisah 1000000");
sama(titik(98765), "98.765", "titik pemisah 98765");
cek([979875, 963000, 875428, 123456, 654321, 324569, 720736, 834759, 179500, 159899, 296575, 132795, 155000].every((n) => digitDari(n).reduce((t, d, i) => t + d * NILAI[i], 0) === n), "jumlah digit kali nilai tempat sama dengan bilangan");

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K5B9A, V.VIDEO_LUAR_K5B9A];
const bilanganDari = (t) => (t.match(/\d[\d.]*\d|\d/g) ?? []).map((v) => v.replace(/\./g, ""));
const semuaSidik = new Map();
let totalKetukan = 0;
let totalKata = 0;
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
      // pemicu kata
      for (const ak of kt.aksi) {
        const p = L.posisiKata(kt.suara, ak.at);
        cek(p >= 0, `${nama}#${i + 1}: pemicu "${ak.at}" ditemukan dalam kalimat`);
        if (typeof ak.at === "number") cek(ak.at >= 0 && ak.at < kata.length, `${nama}#${i + 1}: pemicu angka ${ak.at} dalam batas`);
      }
      // ubah dan hapus harus menyasar benda yang ada saat itu
      {
        const peta = new Set(L.keadaanStory(a, i - 1, 9999).map((o) => o.id));
        if (i === 0) peta.clear();
        const urut = [...kt.aksi].map((ak) => ({ ak, p: L.posisiKata(kt.suara, ak.at) })).sort((m, n) => m.p - n.p);
        for (const { ak } of urut) {
          if (ak.bersih) peta.clear();
          for (const id of ak.hapus === undefined ? [] : [].concat(ak.hapus)) {
            cek(peta.has(id), `${nama}#${i + 1}: hapus "${id}" menyasar benda yang ada`);
            peta.delete(id);
          }
          for (const o of ak.tambah === undefined ? [] : [].concat(ak.tambah)) peta.add(o.id);
          for (const u of ak.ubah === undefined ? [] : [].concat(ak.ubah)) cek(peta.has(u.id), `${nama}#${i + 1}: ubah "${u.id}" menyasar benda yang ada`);
        }
      }
      // keadaan akhir ketukan
      const akhir = L.keadaanStory(a, i, 9999);
      const sidik = L.sidikKeadaan(akhir);
      cek(sebelumnya === null || sidik !== sebelumnya, `${nama}#${i + 1}: gambar berubah dibanding ketukan sebelumnya`);
      sebelumnya = sidik;
      const kunci = `${v.id}/${a.id}`;
      if (i === a.ketukan.length - 1) {
        const lama = semuaSidik.get(sidik);
        cek(!lama, `${nama}: gambar akhir adegan tidak sama dengan adegan lain (${lama ?? ""})`);
        semuaSidik.set(sidik, kunci);
      }
      // id benda unik dalam satu keadaan (tidak ada dua benda ber-id sama)
      cek(new Set(akhir.map((o) => o.id)).size === akhir.length, `${nama}#${i + 1}: id benda unik`);
      // sinkron angka: tiap bilangan dalam suara tampak di gambar pada ketukan ini atau sebelumnya
      for (let p = 0; p < kata.length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(b);
      for (const b of bilanganDari(kt.suara)) cek(terlihat.has(b), `${nama}#${i + 1}: bilangan ${b} di suara tampak di gambar`);
      // gambar mengikuti kata: bila ada aksi pada lebih dari satu kata, keadaan harus bertambah di sepanjang kalimat
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
          cek(y > 0 && y < 210 && kiri > -4 && kiri + lebar < 304, `${nama}#${i + 1}: teks "${o.isi}" masuk kanvas (x=${x}, y=${y}, lebar=${Math.round(lebar)})`);
          // persamaan di gambar diperiksa mandiri (bilangan bulat, rangkaian kali)
          const isi = o.isi ?? "";
          if (/^[\d\s×=+]+$/.test(isi) && isi.includes("=") && isi.split("=").length === 2) {
            const [kiriP, kananP] = isi.split("=").map((s) => s.trim());
            const nilai = (s) => (/^\d+(\s*[×+]\s*\d+)*$/.test(s) ? s.split(/\s*([×+])\s*/).reduce((t, bagian, idx, arr) => (/^\d+$/.test(bagian) ? (idx === 0 ? Number(bagian) : arr[idx - 1] === "×" ? t * Number(bagian) : t + Number(bagian)) : t), 0) : NaN);
            cek(nilai(kiriP) === nilai(kananP), `${nama}#${i + 1}: persamaan di gambar "${isi}" salah hitung`);
          }
        } else if (o.t === "kotak") cek(x > -2 && y > -2 && x + (o.w ?? 0) < 302 && y + (o.h ?? 0) < 210, `${nama}#${i + 1}: kotak ${o.id} masuk kanvas`);
        else if (o.t === "bulat") cek(x - (o.r ?? 0) > -2 && x + (o.r ?? 0) < 302 && y - (o.r ?? 0) > -2 && y + (o.r ?? 0) < 210, `${nama}#${i + 1}: bulat ${o.id} masuk kanvas`);
      }
    });
  }
}

/* ------------------------------ Pemisahan materi dan metode luar ------------------------------ */
const seluruhTeks = (v) => v.adegan.map((a) => [a.judul, a.sumber, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
{
  const teksVideo = (v) => JSON.stringify(seluruhTeks(v));
  const NAMA_METODE = /Place Value Chart|Number-Name|Digit-Place|Group Chunking|Three-Digit|Protocol|Chunking|metode luar|metode dari luar/i;
  const materi = teksVideo(V.VIDEO_MATERI_K5B9A);
  const luar = teksVideo(V.VIDEO_LUAR_K5B9A);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Place Value Chart Protocol", "Indonesian Number-Name Mapping", "Digit-Place Value Link", "Three-Digit Group Chunking"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(V.VIDEO_MATERI_K5B9A.adegan.every((a) => /Buku Siswa/.test(a.sumber) && /hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(V.VIDEO_LUAR_K5B9A.adegan.every((a) => /metode (dari )?luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Bab 9", "sensus", "Gambar 9.1", "Tujuan Pembelajaran", "Peta Konsep", "Kata Kunci", "Mengingat Kembali", "98.765", "Eksplorasi 9.1A", "Jepara", "979.875", "Eksplorasi 9.1B", "Gianyar", "963.000", "Cara Membaca Bilangan", "875.428", "Ayo Bermain", "123.456", "Eksplorasi 9.1C", "Toko Anggun", "324.569", "Eksplorasi 9.1D", "Lukas", "Gambar 9.5", "Ayo Berlatih", "Toko Keenan", "speaker", "hardisk", "Refleksi", "Panduan Guru", "Subbab B"]) cek(new RegExp(kata.replace(/\./g, "\\."), "i").test(materi), `video materi memuat ${kata}`);
  const ids = V.VIDEO_LUAR_K5B9A.adegan.map((a) => a.id);
  cek(["luar-tabel", "luar-tabel-terapan", "luar-nama", "luar-nama-terapan", "luar-nilai", "luar-nilai-terapan", "luar-kelompok", "luar-kelompok-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(V.VIDEO_MATERI_K5B9A.adegan.length === 11 && V.VIDEO_LUAR_K5B9A.adegan.length === 10, "11 adegan materi dan 10 adegan metode luar");
  const suaraDari = (v, kecuali = []) => v.adegan.filter((a) => !kecuali.includes(a.id)).map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  const BUKAN_SUBBAB_A = /membandingkan|mengurutkan|urutkan|lebih besar|lebih kecil|komposisi|dekomposisi/i;
  cek(!BUKAN_SUBBAB_A.test(suaraDari(V.VIDEO_LUAR_K5B9A)) && !BUKAN_SUBBAB_A.test(luar), "metode luar Subbab A tidak membahas Subbab B atau C");
  const kecuali = ["pembuka-sensus", "tujuan-peta"];
  const materiTanpaBab = JSON.stringify(V.VIDEO_MATERI_K5B9A.adegan.filter((a) => !kecuali.includes(a.id)).map((a) => [a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]));
  cek(!BUKAN_SUBBAB_A.test(materiTanpaBab), "materi Subbab A (di luar pembuka dan tujuan bab) tidak membahas banding, urut, komposisi, dekomposisi");
  cek(totalKetukan >= 100, `total ketukan cukup dalam (${totalKetukan})`);
}

/* ------------------------------ Bacaan bilangan dan nilai tempat, dihitung mandiri ------------------------------ */
{
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const rapi = (t) => t.toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
  const sebagaiTeks = (v) => rapi(JSON.stringify(seluruhTeks(v)));
  const materi = sebagaiTeks(V.VIDEO_MATERI_K5B9A);
  const luar = sebagaiTeks(V.VIDEO_LUAR_K5B9A);
  const suaraSaja = (v) => rapi(v.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" "));
  const suaraMateri = suaraSaja(V.VIDEO_MATERI_K5B9A);
  const suaraLuar = suaraSaja(V.VIDEO_LUAR_K5B9A);

  // Bacaan lengkap yang diucapkan atau tertulis harus sama dengan ejaan mandiri.
  for (const n of [979875, 963000, 875428, 98765, 123456, 654321, 324569]) cek(suaraMateri.includes(rapi(eja(n))) || materi.includes(rapi(eja(n))), `materi memuat bacaan ${n}: ${eja(n)}`);
  // Bilangan yang bacaannya dipisah dua kelompok: kedua kelompok harus sama dengan ejaan mandiri.
  for (const n of [296575, 179500, 834759, 159899, 132795, 720736, 875428, 963000]) {
    const kiri = Math.floor(n / 1000);
    const kanan = n % 1000;
    cek((materi + " " + luar).includes(rapi(eja(kiri))), `bacaan kelompok kiri ${titik(n)}: ${eja(kiri)}`);
    if (kanan > 0) cek((materi + " " + luar).includes(rapi(eja(kanan))), `bacaan kelompok kanan ${titik(n)}: ${eja(kanan)}`);
  }
  cek(suaraMateri.includes("dua ratus sembilan puluh enam ribu lima ratus tujuh puluh lima"), "materi: bacaan speaker 296.575 yang benar diucapkan");
  cek(suaraMateri.includes("dua ratus ribu sembilan puluh enam ribu") && /keliru/.test(suaraMateri), "materi: kesalahan kunci Buku Panduan Guru untuk 296.575 disebut keliru");
  cek(!suaraLuar.includes("dua ratus ribu sembilan puluh enam ribu lima ratus tujuh puluh lima") || /keliru/.test(suaraLuar), "metode luar: bacaan salah hanya disebut sebagai kekeliruan");

  // Digit pada tabel nilai tempat tiap adegan sesuai bilangan.
  const baris = (objs, awal, dari, sampai) => Array.from({ length: sampai - dari + 1 }, (_, i) => objs.find((o) => o.id === `${awal}-d${dari + i}`)?.isi ?? "?").join("");
  const M = V.VIDEO_MATERI_K5B9A;
  const U = V.VIDEO_LUAR_K5B9A;
  sama(baris(akhirAdegan(adegan(M, "mengingat")), "t", 1, 5), "98765", "tabel Ayo Mengingat Kembali: 98.765");
  sama(baris(akhirAdegan(adegan(M, "eksplorasi-91a")), "t", 0, 5), "979875", "tabel Eksplorasi 9.1A: 979.875");
  sama(baris(akhirAdegan(adegan(M, "eksplorasi-91b")), "g", 0, 5), "963000", "tabel Eksplorasi 9.1B: 963.000");
  sama(baris(akhirAdegan(adegan(M, "ayo-bermain"), 1), "b", 0, 5), "123456", "tabel Ayo Bermain: 123.456");
  sama(baris(akhirAdegan(adegan(M, "eksplorasi-91c"), 3), "n", 0, 5), "324569", "tabel Eksplorasi 9.1C: 324.569");
  sama(baris(akhirAdegan(adegan(M, "eksplorasi-91d")), "l", 0, 5), "155000", "tabel Eksplorasi 9.1D: 155.000");
  sama(baris(akhirAdegan(adegan(U, "luar-tabel"), 2), "p", 0, 5), "720736", "tabel metode luar: 720.736");
  sama(baris(akhirAdegan(adegan(U, "luar-tabel-terapan"), 0), "h", 0, 5), "834759", "tabel metode luar: 834.759");
  sama(baris(akhirAdegan(adegan(U, "luar-tabel-terapan")), "m", 0, 5), "179500", "tabel metode luar: 179.500");
  sama(baris(akhirAdegan(adegan(U, "luar-nilai-terapan"), 0), "w", 0, 5), "159899", "tabel nilai digit: 159.899");
  {
    const s = akhirAdegan(adegan(U, "luar-nilai-terapan"));
    sama(baris(s, "j", 0, 5), "000000", "batas satu juta: enam kolom jadi nol");
    cek(s.some((o) => o.id === "ju" && o.isi === "1") && s.some((o) => o.isi === "1.000.000"), "batas satu juta: angka satu di kolom jutaan dan 1.000.000");
    cek(999999 + 1 === 1000000 && String(999999 + 1).length === 7, "999.999 ditambah satu menjadi 1.000.000 (tujuh angka)");
    sama(baris(L.keadaanStory(adegan(U, "luar-nilai-terapan"), 3, 0), "j", 0, 5), "999999", "batas satu juta: sebelum ditambah, enam kolom sembilan");
  }

  // Tabel harga komputer (nomor 1) dan nilai tempat angka 9 (nomor 3), dihitung mandiri.
  {
    const harga = [296575, 179500, 834759, 159899, 132795];
    const a = adegan(M, "latihan-a");
    const t = akhirAdegan(a, 3);
    harga.forEach((h, r) => sama(Array.from({ length: 6 }, (_, c) => t.find((o) => o.id === `th-d${r}${c}`)?.isi ?? "?").join(""), String(h), `tabel nomor 1 baris ${r + 1}`));
    const s = akhirAdegan(a, 7);
    harga.forEach((h, r) => {
      const tempat = digitDari(h).map((d, i) => (d === 9 ? NAMA_TEMPAT[i] : null)).filter(Boolean).join(", ");
      const tampak = s.find((o) => o.id === `s${r}-v`)?.isi;
      cek(tampak === tempat, `nomor 3 baris ${r + 1}: angka 9 pada ${titik(h)} ada di ${tempat}, gambar menulis ${tampak}`);
      cek(s.find((o) => o.id === `s${r}-n`)?.isi === titik(h), `nomor 3 baris ${r + 1}: bilangan ${titik(h)} tertulis`);
    });
    const b = akhirAdegan(a, 6);
    harga.forEach((h, r) => cek(b.find((o) => o.id === `bc${r}-n`)?.isi === titik(h), `nomor 2 baris ${r + 1}: bilangan ${titik(h)} tertulis`));
    harga.forEach((h, r) => {
      const kiri = b.find((o) => o.id === `bc${r}-a`)?.isi;
      const kanan = b.find((o) => o.id === `bc${r}-b`)?.isi;
      cek(kiri === `${eja(Math.floor(h / 1000))} ribu` && kanan === eja(h % 1000), `nomor 2 baris ${r + 1}: bacaan ${titik(h)} sama dengan ejaan mandiri (${kiri} / ${kanan})`);
    });
  }

  // Uang Ibu Lukas dan nota Toko Anggun.
  {
    cek(100000 + 50000 + 5000 === 155000, "uang Ibu Lukas: 100.000 + 50.000 + 5.000 = 155.000");
    const d = akhirAdegan(adegan(M, "eksplorasi-91d"), 1);
    sama(["u1-t", "u2-t", "u3-t"].map((id) => d.find((o) => o.id === id)?.isi), ["100.000", "50.000", "5.000"], "gambar uang Ibu Lukas");
    const n = akhirAdegan(adegan(M, "eksplorasi-91c"));
    const harga = [0, 1, 2, 3].map((i) => Number(n.find((o) => o.id === `ih${i}`)?.isi.replace(/\./g, "")));
    sama(harga, [83200, 96825, 112312, 32232], "harga baris nota");
    cek(4 * 20800 === 83200 && 5 * 19365 === 96825 && 2 * 56156 === 112312 && 2 * 16116 === 32232, "nota: banyaknya kali harga satuan sama dengan jumlah baris");
    cek(harga.reduce((t, x) => t + x, 0) === 324569 && n.find((o) => o.id === "ik")?.isi === "324.569", "nota: jumlah empat barang tepat 324.569, sama dengan total");
  }

  // Ayo Bermain: enam kartu dapat disusun 720 cara.
  {
    const faktorial = (n) => (n <= 1 ? 1 : n * faktorial(n - 1));
    cek(faktorial(6) === 720, "enam kartu dapat disusun 6! = 720 cara");
    const permutasi = (s) => (s.length <= 1 ? [s] : [...s].flatMap((c, i) => permutasi(s.slice(0, i) + s.slice(i + 1)).map((r) => c + r)));
    const semua = permutasi("123456");
    cek(semua.length === 720 && new Set(semua).size === 720 && semua.includes("123456") && semua.includes("654321"), "pencacahan mandiri: 720 susunan berbeda, termasuk 123.456 dan 654.321");
    cek(L.teksTerlihat(akhirAdegan(adegan(M, "ayo-bermain"), 4)).includes("6 × 5 × 4 × 3 × 2 × 1 = 720"), "gambar 6 kali 5 kali 4 kali 3 kali 2 kali 1 sama dengan 720");
  }

  // Nilai digit (angka kali nilai tempat) yang tertulis di gambar.
  {
    let n = 0;
    for (const v of [M, U]) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) {
      const m = o.t === "teks" && o.isi ? o.isi.match(/^(\d+) × ([\d.]+) = ([\d.]+)$/) : null;
      if (!m) continue;
      const [, d, p, h] = m;
      n += 1;
      cek(Number(d) * Number(p.replace(/\./g, "")) === Number(h.replace(/\./g, "")), `nilai digit "${o.isi}" salah hitung`);
    }
    cek(n >= 6, `nilai digit tertulis di gambar yang diperiksa (${n})`);
    // setiap titik pemisah sesuai aturan tiga angka
    let t = 0;
    for (const v of [M, U]) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) {
      const m = o.t === "teks" && o.isi ? o.isi.match(/^\d{1,3}(\.\d{3})+$/) : null;
      if (!m) continue;
      t += 1;
      cek(titik(Number(o.isi.replace(/\./g, ""))) === o.isi, `titik pemisah ${o.isi} sesuai aturan tiga angka`);
    }
    cek(t >= 25, `bilangan bertitik di gambar yang diperiksa (${t})`);
  }
}

/* ------------------------------ Kutipan buku (bila PDF tersedia) ------------------------------ */
{
  const pdf = new URL("../bahan-sd/Matematika-BS-KLS-V.pdf", import.meta.url);
  const ada = existsSync(pdf);
  const cobaPdf = ada ? spawnSync("pdftotext", ["-f", "289", "-l", "306", "-raw", pdf.pathname.replace(/^\/([A-Za-z]:)/, "$1"), "-"], { encoding: "utf8", maxBuffer: 1 << 26 }) : null;
  if (!ada || !cobaPdf || cobaPdf.status !== 0) console.log("PDF atau pdftotext tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const buku = bersih(cobaPdf.stdout);
    let n = 0;
    for (const a of V.VIDEO_MATERI_K5B9A.adegan) for (const kt of a.kutipan ?? []) {
      n += 1;
      cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
    }
    cek(n >= 80, `jumlah kutipan buku yang diperiksa (${n})`);
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k5b9a-.*)\.(ts|tsx)$/.test(f));
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
    // larangan berbagi visual: berkas k5b9a hanya mengimpor logika dan berkas k5b9a sendiri
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|k5b9a-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k5b9a sendiri (${impor.join(", ")})`);
  }
  // mesin tidak memakai kit visual lama
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k5b9a.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_A59|video-k4b2-umum/.test(pembungkus) && /VIDEO_MATERI_K5B9A/.test(pembungkus) && /VIDEO_LUAR_K5B9A/.test(pembungkus) && /export function VideoK5B9A/.test(pembungkus), "video-k5b9a: memakai dua video baru, bukan naskah dan visual lama");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
