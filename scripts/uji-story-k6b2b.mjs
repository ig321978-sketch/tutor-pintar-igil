// Uji Story Kelas 6 Bab 2 Sub-Bab B (Konsep Kesamaan Rasio): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// pemisahan materi dan metode luar, kutipan buku (bila PDF ada), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k6b2b.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k6b2b-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K6B2B, V.VIDEO_LUAR_K6B2B];
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
const teksVideo = (v) => JSON.stringify(v.adegan.map((a) => [a.judul, a.ketukan.map((kt) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, a.ketukan.indexOf(kt), 9999))])]));
const suaraVideo = (v) => v.adegan.flatMap((a) => a.ketukan.map((kt) => kt.suara)).join(" ");
{
  const NAMA_METODE = /Equivalent Ratio|Fraction-Equivalence|Unit Rate|Recipe Scaling|metode luar|jembatan|kali silang|faktor skala/i;
  const materi = teksVideo(V.VIDEO_MATERI_K6B2B);
  const luar = teksVideo(V.VIDEO_LUAR_K6B2B);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Equivalent Ratio Table", "Fraction-Equivalence Bridge", "Unit Rate Method", "Recipe Scaling Factor"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(V.VIDEO_MATERI_K6B2B.adegan.every((a) => /Buku Siswa/.test(a.sumber) && /hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(V.VIDEO_LUAR_K6B2B.adegan.every((a) => /metode (dari )?luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Eksplorasi 2.3", "Eksplorasi 2.4", "Latihan 2.2", "polybag", "Pak Wayan", "Anike", "TOGA", "FPB", "rasio satuan", "pecahan senilai", "semen", "Dona", "Mutia", "berefleksi", "Berpikir kritis", "50 km"]) cek(new RegExp(kata, "i").test(materi), `video materi memuat ${kata}`);
  const ids = V.VIDEO_LUAR_K6B2B.adegan.map((a) => a.id);
  cek(["luarb2-tabel", "luarb2-tabel-terapan", "luarb2-jembatan", "luarb2-satuan", "luarb2-satuan-terapan", "luarb2-skala", "luarb2-skala-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(V.VIDEO_MATERI_K6B2B.adegan.length === 7 && V.VIDEO_LUAR_K6B2B.adegan.length === 9, "7 adegan materi dan 9 adegan metode luar");
  cek(totalKetukan >= 70, `total ketukan cukup dalam (${totalKetukan})`);
}

/* ------------------------------ Angka yang dihitung dalam video, dihitung mandiri ------------------------------ */
{
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const senilai = (a, b, c, d) => a * d === b * c; // perkalian silang
  const materi = suaraVideo(V.VIDEO_MATERI_K6B2B);
  const luar = suaraVideo(V.VIDEO_LUAR_K6B2B);
  const semua = `${materi} ${luar}`;
  // Eksplorasi 2.3: 10 m2 untuk 12 bibit.
  const g = gcd(10, 12);
  sama([g, 10 / g, 12 / g], [2, 5, 6], "FPB 10 dan 12 adalah 2, rasio sederhana 5 banding 6");
  cek(senilai(25, 30, 10, 12) && senilai(25, 30, 5, 6), "25 meter persegi dengan 30 bibit senilai dengan 10 banding 12");
  cek(senilai(20, 24, 10, 12), "20 meter persegi dengan 24 bibit senilai dengan 10 banding 12");
  cek(5 * 5 === 25 && 6 * 5 === 30 && 5 * 4 === 20 && 6 * 4 === 24, "pengali 5 dan 4 pada baris 5 dan 6");
  for (const [a, b] of [[5, 6], [10, 12], [25, 30], [50, 60], [30, 36], [20, 24]]) cek(senilai(a, b, 10, 12), `${a} banding ${b} senilai dengan 10 banding 12`);
  cek(!senilai(13, 15, 5, 6) && !senilai(13, 15, 10, 12) && 13 * 6 === 78 && 15 * 5 === 75, "menambah 3 pada 10 dan 12 menghasilkan 13 dan 15, bukan rasio senilai");
  cek(10 * 6 === 60 && 12 * 5 === 60 && 30 * 6 === 180 && 36 * 5 === 180, "hasil kali silang 10 per 12 dan 5 per 6; 30 per 36 dan 5 per 6");
  // Pupuk: 2 bibit memerlukan 5 gram, 11 bibit (dihitung dalam persepuluhan agar bulat).
  sama([(5 * 11 * 10) / 2 / 10, (5 * 10) / 2 / 10], [27.5, 2.5], "pupuk 11 bibit 27,5 gram dan 1 bibit 2,5 gram");
  // Eksplorasi 2.4: harga satuan.
  sama([37500 / 3, 58000 / 5], [12500, 11600], "harga satuan paket 3 bibit dan paket 5 bibit");
  cek(58000 / 5 < 37500 / 3, "paket 5 bibit lebih murah per bibit");
  cek(50000 / 4 === 12500 && Math.round(40000 / 3) === 13333, "Eksplorasi 2.1 (Sub-Bab A) tidak dipakai di sini; pembanding 12.500 dan 13.333 konsisten");
  // Mengemas bibit: 6 bibit dalam 1,5 jam (3/2 jam).
  sama([(6 * 2) / 3, ((6 * 2) / 3) * 4], [4, 16], "4 bibit per jam dan 16 bibit dalam 4 jam");
  cek(senilai(6, 3, 4, 1.5 * 1) || (6 * 1 === 4 * 1.5), "6 bibit : 1,5 jam senilai dengan 4 bibit : 1 jam");
  // Latihan 2.2.
  sama([12 * (8 / 4), 8 / 4], [24, 2], "wedang jahe 8 liter: 24 jahe merah, faktor 2");
  sama([8 / gcd(8, 4), 4 / gcd(8, 4), (4 / gcd(8, 4)) * 3 === 3 ? 3 : -1], [2, 1, 3], "serai 8 lemon 4 menjadi 2 banding 1; 6 serai butuh 3 lemon");
  cek(senilai(6, 3, 8, 4), "6 serai dengan 3 lemon senilai dengan 8 serai dan 4 lemon");
  const faktorKopi = 1000 / 250;
  sama([faktorKopi, 1 * faktorKopi, 2 * faktorKopi, 10 > 2 * faktorKopi], [4, 4, 8, true], "kopi Dona: faktor 4, kopi 4, gula 8, gula 10 terlalu manis");
  sama([36000 / 15, (36000 / 15) * 5], [2400, 12000], "pena: Rp2.400 per pena, 5 pena Rp12.000");
  // Refleksi: rasio senilai dengan 12 banding 28.
  for (const [a, b] of [[6, 14], [3, 7], [24, 56], [36, 84]]) cek(senilai(a, b, 12, 28), `${a} banding ${b} senilai dengan 12 banding 28`);
  sama([12 / 2, 28 / 2, 12 / 4, 28 / 4, 12 * 2, 28 * 2, 12 * 3, 28 * 3], [6, 14, 3, 7, 24, 56, 36, 84], "12 : 28 dibagi 2, 4 dan dikali 2, 3");
  // Angka itu benar tertulis dalam suara.
  for (const t of ["27,5", "2,5", "Rp12.500", "Rp11.600", "Rp37.500", "Rp58.000", "Rp2.400", "Rp12.000", "Rp36.000", "1.000", "180", "78", "75", "24 buah", "16 bibit", "3 buah"]) cek(semua.includes(t), `suara memuat ${t}`);
  cek(materi.includes("terlalu manis") && materi.includes("paket 5 bibit"), "materi menyimpulkan kopi Dona terlalu manis dan memilih paket 5 bibit");
}

/* ------------------------------ Kutipan buku (bila PDF tersedia) ------------------------------ */
{
  const pdf = new URL("../bahan-sd/Matematika-BS-KLS-VI.pdf", import.meta.url);
  const ada = existsSync(pdf);
  const cobaPdf = ada ? spawnSync("pdftotext", ["-f", "60", "-l", "88", "-raw", pdf.pathname.replace(/^\/([A-Za-z]:)/, "$1"), "-"], { encoding: "utf8", maxBuffer: 1 << 26 }) : null;
  if (!ada || !cobaPdf || cobaPdf.status !== 0) console.log("PDF atau pdftotext tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const buku = bersih(cobaPdf.stdout);
    let n = 0;
    for (const a of V.VIDEO_MATERI_K6B2B.adegan) for (const kt of a.kutipan ?? []) {
      n += 1;
      cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
    }
    cek(n >= 20, `jumlah kutipan buku yang diperiksa (${n})`);
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k6b2b-.*)\.(ts|tsx)$/.test(f));
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
    if (f !== "mesin-story.tsx") cek(!/from "react"/.test(s), `${f}: logika dan data tanpa React`);
  }
  
  // larangan berbagi visual: berkas k6b2ba tidak mengimpor gambar atau adegan bab lain
  for (const f of berkas.filter((x) => x.startsWith("k6b2b-"))) {
    const s = readFileSync(new URL(f, folder), "utf8");
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|k6b2b-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k6b2b sendiri (${impor.join(", ")})`);
  }
  // mesin tidak memakai kit visual lama
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k6b2b.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_B62/.test(pembungkus) && /VIDEO_MATERI_K6B2B/.test(pembungkus) && /VIDEO_LUAR_K6B2B/.test(pembungkus), "video-k6b2b: memakai dua video baru, bukan naskah dan visual lama");
}

console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
