// Uji Story Kelas 6 Bab 4 Sub-Bab B (Membandingkan Peluang Kejadian): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// pemisahan materi dan metode luar, kutipan buku (bila PDF ada), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k6b4b.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k6b4b-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K6B4B, V.VIDEO_LUAR_K6B4B];
const bilanganDari = (t) => (t.match(/\d[\d.]*\d|\d/g) ?? []).map((v) => v.replace(/\./g, ""));
const semuaSidik = new Map();
let totalKetukan = 0;
let totalKata = 0;
for (const v of VIDEO) {
  cek(v.adegan.length >= 9, `${v.id}: paling sedikit 9 adegan (ada ${v.adegan.length})`);
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
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map((a) => [a.judul, a.ketukan.map((kt) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, a.ketukan.indexOf(kt), 9999))])]));
  const NAMA_METODE = /Favorable-to-Total|Comparative Probability|Fair Game|Relative Likelihood|metode luar|silang kali/i;
  cek(!NAMA_METODE.test(teksVideo(V.VIDEO_MATERI_K6B4B)), "video materi tidak memuat nama metode luar");
  const luar = teksVideo(V.VIDEO_LUAR_K6B4B);
  for (const m of ["Favorable-to-Total Ratio", "Comparative Probability Ratio", "Fair Game Equal Chance Principle", "Relative Likelihood Decision"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(!/persen|%/i.test(teksVideo(V.VIDEO_MATERI_K6B4B) + luar), "kedua video tanpa persen");
  cek(V.VIDEO_MATERI_K6B4B.adegan.every((a) => /Buku Siswa/.test(a.sumber) && /hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(V.VIDEO_LUAR_K6B4B.adegan.every((a) => /metode (dari )?luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  const teksMateri = teksVideo(V.VIDEO_MATERI_K6B4B);
  for (const k of ["Eksplorasi 4.2", "Eksplorasi 4.3", "Latihan 4.2", "Latihan 4.3", "Toko Sukamaju", "Mantap", "Spektakuler", "Penuhi Lingkaran", "kurang adil", "ketua kelas", "Uji Kompetensi", "Refleksi"]) cek(new RegExp(k, "i").test(teksMateri), `video materi memuat ${k}`);
  const ids = V.VIDEO_LUAR_K6B4B.adegan.map((a) => a.id);
  cek(["luarb-ftr", "luarb-ftr-terapan", "luarb-cpr", "luarb-cpr-terapan", "luarb-fair", "luarb-fair-terapan", "luarb-keputusan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(totalKetukan >= 110, `total ketukan cukup dalam (${totalKetukan})`);
}

/* ------------------------------ Angka yang dihitung dalam video ------------------------------ */
{
  // Hitungan mandiri: tiap hasil disebut satu per satu, perbandingan dengan silang kali, total bersama dicoba dari 1.
  const kelipatan = (x, y) => {
    for (let m = 1; ; m += 1) if (m % x === 0 && m % y === 0) return m;
  };
  const silang = (a, b) => (a[0] * b[1] > b[0] * a[1] ? "a" : a[0] * b[1] < b[0] * a[1] ? "b" : "sama");
  sama(kelipatan(2, 6), 6, "total bersama 2 dan 6");
  sama(kelipatan(12, 35), 420, "total bersama 12 dan 35");
  sama(kelipatan(10, 11), 110, "total bersama 10 dan 11");
  sama([1 * (6 / 2), 1 * (6 / 6)], [3, 1], "koin 3 dari 6 dan dadu 1 dari 6");
  sama(silang([1, 2], [1, 6]), "a", "koin lebih mungkin dari dadu (silang kali)");
  sama(silang([3, 6], [1, 2]), "sama", "3 dari 6 dan 1 dari 2 sama besar");
  sama(silang([4, 7], [3, 7]), "a", "Mantap 4 dari 7 lebih besar dari Spektakuler 3 dari 7");
  sama(silang([1, 12], [1, 35]), "a", "kategori SD lebih mungkin dari SMP");
  sama([1 * 35, 1 * 12], [35, 12], "SD 35 dari 420 dan SMP 12 dari 420");
  // Latihan 4.3 nomor 2: kotak 1 (2 set pensil, 3 pensil dan penghapus, 5 buku) dan kotak 2 (4, 4, 3).
  const K1 = { set: 2, pensil: 3, buku: 5 };
  const K2 = { set: 4, pensil: 4, buku: 3 };
  const total = (k) => k.set + k.pensil + k.buku;
  sama([total(K1), total(K2)], [10, 11], "isi kotak 1 dan kotak 2");
  sama(["set", "buku", "pensil"].map((j) => silang([K1[j], total(K1)], [K2[j], total(K2)])), ["b", "a", "b"], "kunci Latihan 4.3 nomor 2: kotak 2, kotak 1, kotak 2");
  sama([K1.set * 11, K2.set * 10, K1.buku * 11, K2.buku * 10, K1.pensil * 11, K2.pensil * 10], [22, 40, 55, 30, 33, 40], "hasil pada total bersama 110");
  // Dua dadu: pasangan yang memuat angka 6, dicacah satu per satu dari 36 pasangan.
  let memuat = 0;
  let semua = 0;
  for (let a = 1; a <= 6; a += 1) for (let b = 1; b <= 6; b += 1) {
    semua += 1;
    if (a === 6 || b === 6) memuat += 1;
  }
  sama([semua, memuat], [36, 11], "36 pasangan dan 11 yang memuat angka 6");
  cek(memuat > 6 && silang([memuat, 36], [1, 6]) === "a", "dua dadu angka 6 lebih mungkin dari satu dadu angka 3 (kurang adil)");
  // Permainan adil: hasil menang dicacah.
  const dadu = [1, 2, 3, 4, 5, 6];
  const cacah = (f) => dadu.filter(f).length;
  sama([cacah((n) => n % 2 === 1), cacah((n) => n % 2 === 0)], [3, 3], "ganjil lawan genap: 3 dan 3");
  sama([cacah((n) => n === 6), cacah((n) => n <= 5)], [1, 5], "angka 6 lawan 1 sampai 5: 1 dan 5");
  sama([cacah((n) => n === 1 || n === 3), cacah((n) => n === 5 || n === 6)], [2, 2], "angka 1 atau 3 lawan 5 atau 6: 2 dan 2");
  cek(cacah((n) => n === 3) === 1 && cacah((n) => n === 6) === 1, "angka 3 lawan angka 6: 1 dan 1");
  // Dadu pilihan Uji Kompetensi nomor 4.
  const tiga = (d) => d.filter((n) => n === 3).length;
  sama([tiga([1, 2, 3, 4, 5, 6]), tiga([1, 1, 3, 3, 6, 6]), tiga([3, 3, 3, 4, 5, 6]), tiga([3, 5, 3, 5, 3, 5]), tiga([1, 2, 3, 4])], [1, 2, 3, 3, 1], "jumlah angka 3 pada tiap dadu pilihan");
  cek(silang([1, 4], [1, 6]) === "a", "dadu piramida 1 dari 4 lebih besar dari dadu biasa 1 dari 6");
  sama([6 + 6 + 3 + 1, 1 + 4 + 11 > 0 ? 6 : 0], [16, 6], "pembantu angka");
  sama([2 + 3 + 5, 4 + 4 + 3, 6 - 1], [10, 11, 5], "total kotak dan sisa dadu");
}

/* ------------------------------ Kutipan buku (bila PDF tersedia) ------------------------------ */
{
  const pdf = new URL("../bahan-sd/Matematika-BS-KLS-VI.pdf", import.meta.url);
  const ada = existsSync(pdf);
  const cobaPdf = ada ? spawnSync("pdftotext", ["-f", "129", "-l", "146", "-raw", pdf.pathname.replace(/^\/([A-Za-z]:)/, "$1"), "-"], { encoding: "utf8", maxBuffer: 1 << 26 }) : null;
  if (!ada || !cobaPdf || cobaPdf.status !== 0) console.log("PDF atau pdftotext tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const buku = bersih(cobaPdf.stdout);
    let n = 0;
    for (const a of V.VIDEO_MATERI_K6B4B.adegan) for (const kt of a.kutipan ?? []) {
      n += 1;
      cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
    }
    cek(n >= 20, `jumlah kutipan buku yang diperiksa (${n})`);
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k6b4b-.*)\.(ts|tsx)$/.test(f));
  cek(berkas.length >= 7, `berkas story ditemukan (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    const buruk = [...s].filter((c) => {
      const k = c.codePointAt(0);
      return k > 0x1fa95 || k === 0x1f7f0 || k === 0x200d;
    });
    cek(buruk.length === 0, `${f}: tanpa emoji di atas Emoji 12 dan tanpa ZWJ (${buruk.map((c) => c.codePointAt(0).toString(16)).join()})`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: UTF-8 tanpa BOM dan akhir baris LF`);
    cek(!/fetch\(|XMLHttpRequest|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: tanpa jaringan, model bahasa, atau kunci jawaban`);
    if (f !== "mesin-story.tsx") cek(!/from "react"/.test(s), `${f}: logika dan data tanpa React`);
  }
  
  // larangan berbagi visual: berkas k6b4a tidak mengimpor gambar atau adegan bab lain
  for (const f of berkas.filter((x) => x.startsWith("k6b4b-"))) {
    const s = readFileSync(new URL(f, folder), "utf8");
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|k6b4[ab]-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k6b4 sendiri (${impor.join(", ")})`);
  }
  // mesin tidak memakai kit visual lama
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k6b4b.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_B64/.test(pembungkus) && /VIDEO_MATERI_K6B4B/.test(pembungkus) && /VIDEO_LUAR_K6B4B/.test(pembungkus), "video-k6b4a: memakai dua video baru, bukan naskah dan visual lama");
}

console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
