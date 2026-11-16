// Uji Story Kelas 6 Bab 2 Sub-Bab C (Penerapan Rasio): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// pemisahan materi dan metode luar, kata terlarang (tanpa rujukan buku) dan suara tanpa digit, emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k6b2c.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k6b2c-video.ts");
const M1 = await import("../src/components/modul/story/k6b2c-materi-1.ts");
const M2 = await import("../src/components/modul/story/k6b2c-materi-2.ts");
const M3 = await import("../src/components/modul/story/k6b2c-materi-3.ts");

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

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K6B2C, V.VIDEO_LUAR_K6B2C];
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
      cek(!/\d/.test(kt.suara), `${nama}#${i + 1}: suara tanpa digit (angka dieja)`);
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
      // sinkron angka: tiap bilangan dalam suara tampak di gambar pada ketukan ini atau sebelumnya
      for (let p = 0; p < kata.length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(b);
      for (const b of bilanganDari(kt.suara)) cek(terlihat.has(b), `${nama}#${i + 1}: bilangan ${b} di suara tampak di gambar`);
      // gambar mengikuti kata: bila ada aksi pada lebih dari satu kata, keadaan harus bertambah di sepanjang kalimat
      const titik = [...new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at)))].sort((m, n) => m - n);
      if (titik.length >= 2) {
        const sid = titik.map((p) => L.sidikKeadaan(L.keadaanStory(a, i, p)));
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
        } else if (o.t === "kotak") cek(x > -2 && y > -2 && x + (o.w ?? 0) < 302 && y + (o.h ?? 0) < 210 || o.id === "tanah" || o.id === "lantai", `${nama}#${i + 1}: kotak ${o.id} masuk kanvas`);
        else if (o.t === "bulat") cek(x - (o.r ?? 0) > -2 && x + (o.r ?? 0) < 302 && y - (o.r ?? 0) > -2 && y + (o.r ?? 0) < 210, `${nama}#${i + 1}: bulat ${o.id} masuk kanvas`);
      }
    });
  }
}

/* ------------------------------ Pemisahan materi dan metode luar ------------------------------ */
const semuaTeks = (v) => v.adegan.flatMap((a) => a.ketukan.flatMap((kt, i) => [...Array(L.kataDari(kt.suara).length).keys()].flatMap((p) => L.teksTerlihat(L.keadaanStory(a, i, p)))));
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map((a) => [a.judul, a.sumber, a.ketukan.map((kt) => kt.suara)])) + semuaTeks(v).join("|");
  const NAMA_METODE = /Additive Parts Sum|Part-to-Whole Ratio|Common Time Unit|Time-Rate Scaling|metode luar/i;
  const M_VIDEO = V.VIDEO_MATERI_K6B2C;
  const U = V.VIDEO_LUAR_K6B2C;
  // Semua adegan materi Sub-Bab C bermakna, jadi seluruhnya diputar; berkas materi tetap memuat semuanya.
  const MODUL_MATERI = Object.assign({}, M1, M2, M3);
  const M_PENUH = { ...M_VIDEO, adegan: [MODUL_MATERI.ADEGAN_TOKO, MODUL_MATERI.ADEGAN_PENJUALAN, MODUL_MATERI.ADEGAN_MASA_PANEN, MODUL_MATERI.ADEGAN_SATUAN_WAKTU, MODUL_MATERI.ADEGAN_LATIHAN23A, MODUL_MATERI.ADEGAN_BANYU, MODUL_MATERI.ADEGAN_UJI_1_3, MODUL_MATERI.ADEGAN_UJI_4_5] };
  cek(M_PENUH.adegan.every((a) => a && a.ketukan.length > 0), "berkas materi memuat semua adegan");
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Additive Parts Sum", "Part-to-Whole Ratio", "Common Time Unit Conversion", "Time-Rate Scaling"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  // Video diputar sebagai guru yang mengajar: tidak ada penyebutan sumber buku di suara, teks terlihat, label sumber, judul adegan, dan subjudul.
  const TERLARANG = /buku|panduan guru|hlm|halaman|kunci|rubrik|salah ketik|salah cetak|tambahan video|contoh video|temuan|pertemuan/i;
  for (const v of [M_VIDEO, U]) {
    cek(!TERLARANG.test(`${v.judul} ${v.subjudul}`), `${v.id}: judul dan subjudul video tanpa kata terlarang`);
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) semua.push(...L.teksTerlihat(L.keadaanStory(a, i, p)));
      });
      const kena = semua.filter((t) => TERLARANG.test(t) || /soal nomor|Ayo Berlatih nomor|nomor [1-5]|catatan video|menurut buku/i.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: tanpa penyebutan buku atau catatan sumber (${kena.slice(0, 2).join(" | ")})`);
      cek(!/Uji Kompetensi|Pengayaan|Ayo Berlatih|soal \d|Soal \d|Eksplorasi|Refleksi|berefleksi|Latihan 2\.3/.test(semua.join(" | ")), `${v.id}/${a.id}: latihan disajikan sebagai Latihan, Uji, Tantangan, atau Renungan, tanpa nomor soal atau eksplorasi buku`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Empat metode luar", "subjudul video: Materi kurikulum dan Empat metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,toko-herbal,penjualan-bibit,masa-panen,satuan-waktu,latihan23-pasar,latihan23-banyu,uji-1-3,uji-4-5-pengayaan", "urutan adegan materi");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  for (const kata of ["Toko Herbal Tani", "Latihan bersama", "Latihan 1", "Latihan 2", "Latihan 3", "Uji 1", "Uji 2", "Uji 3", "Uji 4", "Uji 5", "Tantangan", "Renungan", "Hati-hati", "Banyu", "pasar malam", "part to part", "part to whole", "Dony", "Hana", "pempek", "tabel rasio", "satuan waktu"]) cek(new RegExp(kata, "i").test(materi + semuaTeks(M_VIDEO).join("|")), `video materi memuat ${kata}`);
  const ids = U.adegan.map((a) => a.id);
  cek(ids[0] === "sapaan" && ids[1] === "luarc-pembuka" && ids.at(-1) === "luarc-ringkas", "video metode luar: sapaan, pembuka, dan ringkasan");
  cek(["luarc-jumlah", "luarc-jumlah-terapan", "luarc-utuh", "luarc-utuh-terapan", "luarc-satuan", "luarc-satuan-terapan", "luarc-laju", "luarc-laju-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(M_VIDEO.adegan.length === 9 && U.adegan.length === 11, "8 adegan materi diputar (dengan sapaan 9) dan 10 adegan metode luar (dengan sapaan 11)");
  cek(totalKetukan >= 70, `total ketukan cukup dalam (${totalKetukan})`);
  cek(!/ratio|scaling|conversion/i.test(JSON.stringify(V.VIDEO_MATERI_K6B2C.adegan.map((a) => a.ketukan.map((kt) => kt.suara)))), "suara materi tanpa istilah metode luar");
}

/* ------------------------------ Angka yang dihitung dalam video, dihitung mandiri ------------------------------ */
{
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const sederhana = (a, b) => [a / gcd(a, b), b / gcd(a, b)];
  // Bagi total menurut rasio: cari nilai satu bagian dengan mencoba satu per satu (tanpa rumus pembagian).
  const bagi = (a, b, total) => {
    for (let n = 1; n <= total; n += 1) if (n * (a + b) === total) return [a * n, b * n, n];
    return null;
  };
  sama(bagi(4, 5, 72), [32, 40, 8], "Eksplorasi 2.5: 72 bibit, hias:obat 4:5 menjadi 32 dan 40, satu bagian 8");
  sama(bagi(9, 4, 390), [270, 120, 30], "Latihan 2.3 nomor 1: 390 pengunjung menjadi 270 dan 120, satu bagian 30");
  sama(bagi(11, 4, 120), [88, 32, 8], "Uji Kompetensi nomor 4: 120 buku menjadi 88 dan 32, satu bagian 8");
  sama(bagi(3, 2, 5), [3, 2, 1], "Toko Herbal Tani: 3 dan 2 dari 5 bagian");
  sama(bagi(9, 4, 72), null, "rasio 9:4 tidak dapat membagi total 72, jadi total soal ini 390 (bukan 72) dengan hasil 270 dan 120");
  sama([4 + 5, 9 + 4, 11 + 4, 3 + 2], [9, 13, 15, 5], "jumlah bagian rasio");
  // Bagian terhadap keseluruhan.
  sama([sederhana(88, 120), sederhana(32, 120), sederhana(270, 390), sederhana(120, 390)], [[11, 15], [4, 15], [9, 13], [4, 13]], "rasio bagian terhadap keseluruhan disederhanakan");
  sama(sederhana(4 + 5, 9), [1, 1], "empat per sembilan ditambah lima per sembilan sama dengan satu utuh");
  // Satuan waktu: 1 bulan = 4 minggu, 1 tahun = 12 bulan, 1 jam = 60 menit, 1 minggu = 7 hari, 1 hari = 24 jam.
  const bulanDariTahunPersepuluh = (t) => (t * 12) / 10;
  sama(bulanDariTahunPersepuluh(15), 18, "1,5 tahun sama dengan 18 bulan");
  sama(sederhana(3, 18), [1, 6], "jahe merah banding lengkuas dalam bulan");
  sama(sederhana(6, 18), [1, 3], "kencur banding lengkuas: 6 banding 18 bulan sama dengan setengah banding satu setengah tahun");
  sama(sederhana(3 * 4, 12), [1, 1], "jahe merah 3 bulan (12 minggu) banding kumis kucing 12 minggu");
  sama([bulanDariTahunPersepuluh(30), sederhana(6, 36), sederhana(18, 36)], [36, [1, 6], [1, 2]], "masa panen buah merah: 36 bulan, kencur 1:6, lengkuas 1:2");
  sama([36 / 6, 36 / 18], [6, 2], "banyak panen kencur dan lengkuas dalam satu masa panen buah merah");
  sama([(2 * 60) / 3, sederhana(10, 40), 40 / 10], [40, [1, 4], 4], "Ayah 10 menit banding Kira dua pertiga jam (40 menit): 1 banding 4, empat kali lebih cepat");
  sama([7 * 24, 3 * 168, 5 * 168], [168, 504, 840], "satu minggu 168 jam; 3 minggu 504 jam; 5 minggu 840 jam");
  // Banyu: 1 km per 30 menit.
  const jarakDalam = (menit) => menit / 30;
  sama([jarakDalam(60), jarakDalam(210), 9 * 30, (9 * 30) / 60], [2, 7, 270, 4.5], "Banyu: 2 km per jam, 3,5 jam menempuh 7 km, 9 km menempuh 270 menit atau 4,5 jam");
  // Penulis berita: 1.200 kata per jam.
  sama([1200 / 60, 180 * 20, 3 * 1200, 3000 / 20, 150 / 60], [20, 3600, 3600, 150, 2.5], "penulis berita: 20 kata per menit, 180 menit 3.600 kata, 3.000 kata 150 menit atau 2,5 jam");
  // Uji Kompetensi nomor 1 sampai 3.
  sama([sederhana(16, 24), (24 / 2) * 3, (36 / 4) * 3], [[2, 3], 36, 27], "klub: sains banding seni 2:3, olahraga 36, robotik 27");
  sama([30 / 2, 65 / 5, 30 / 2 > 65 / 5], [15, 13, true], "Dony 15 ml per sendok lebih cokelat daripada Hana 13 ml");
  sama([30000 / 12, 34500 / 15, 34500 / 15 < 30000 / 12], [2500, 2300, true], "susu murni Rp2.500 per kotak, susu segar Rp2.300 per kotak: pilih kemasan kedua");
  cek(35000 / 15 !== 2300, "susu segar Rp34.500 (bukan Rp35.000): 35.000 dibagi 15 bukan 2.300");
  // Tantangan: pempek 5 orang, tiga kali lebih banyak.
  sama([2 * 3, 150 * 3], [6, 450], "pempek: 2 butir telur dan 150 gram terigu menjadi 6 butir dan 450 gram");
  // Hasil hitungan tampak di gambar.
  const gambar = semuaTeks(V.VIDEO_MATERI_K6B2C).join(" | ");
  for (const h of ["32", "40", "270", "120", "88", "4 : 9", "5 : 9", "3 : 18 = 1 : 6", "12 : 12 = 1 : 1", "10 : 40 = 1 : 4", "168", "4,5 jam", "= 7 km", "36", "27", "Rp2.300", "Rp2.500", "3.600", "2,5 jam", "150 menit", "450 gram"]) cek(gambar.includes(h), `gambar video materi memuat hasil "${h}"`);
  const gambarLuar = semuaTeks(V.VIDEO_LUAR_K6B2C).join(" | ");
  for (const h of ["4 + 5 = 9", "390 : 13 = 30", "120 : 15 = 8", "11 : 15", "9 : 13", "1,5 × 12 = 18", "20 kata per menit", "270 : 60 = 4,5 jam", "3.000 : 20", "150 menit"]) cek(gambarLuar.includes(h), `gambar video metode luar memuat hasil "${h}"`);
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k6b2c-.*)\.(ts|tsx)$/.test(f));
  cek(berkas.length >= 8, `berkas story ditemukan (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    const buruk = [...s].filter((c) => {
      const k = c.codePointAt(0);
      return k > 0x1fa95 || k === 0x1f7f0 || k === 0x200d;
    });
    cek(buruk.length === 0, `${f}: tanpa emoji di atas Emoji 12 dan tanpa ZWJ (${buruk.map((c) => c.codePointAt(0).toString(16)).join()})`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: UTF-8 tanpa BOM dan akhir baris LF`);
    cek(!/fetch\(|XMLHttpRequest|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: tanpa jaringan, model bahasa, atau kunci jawaban`);
    cek(!/from "react"/.test(s), `${f}: logika dan data tanpa React`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|kutipan-lokal|sapaan|k6b2c-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas k6b2c sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k6b2c.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_C62/.test(pembungkus) && /VIDEO_MATERI_K6B2C/.test(pembungkus) && /VIDEO_LUAR_K6B2C/.test(pembungkus) && /export function VideoK6B2C\(/.test(pembungkus), "video-k6b2c: memakai dua video baru, bukan naskah dan visual lama");
}

for (const v of VIDEO) {
  const kata = v.adegan.reduce((n, a) => n + a.ketukan.reduce((m, kt) => m + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((n, a) => n + a.ketukan.length, 0)} ketukan, ${kata} kata (sekitar ${(kata * 0.5 / 60).toFixed(1)} menit suara)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
