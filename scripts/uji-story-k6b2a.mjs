// Uji Story Kelas 6 Bab 2 Sub-Bab A (Konsep Rasio, termasuk pembuka bab): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// pemisahan materi dan metode luar, kutipan buku (bila PDF ada), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k6b2a.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k6b2a-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K6B2A, V.VIDEO_LUAR_K6B2A];
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
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map((a) => [a.judul, a.sumber, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]));
  const NAMA_METODE = /Part-to-Part|Ordered-Ratio|GCF|Additive|Multiplicative|Comparison|metode luar|metode dari luar/i;
  const materi = teksVideo(V.VIDEO_MATERI_K6B2A);
  const luar = teksVideo(V.VIDEO_LUAR_K6B2A);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Part-to-Part Ratio Language", "Ordered-Ratio Protocol", "GCF Simplify Ratio", "Additive versus Multiplicative Comparison"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(V.VIDEO_MATERI_K6B2A.adegan.every((a) => /Buku Siswa/.test(a.sumber) && /hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(V.VIDEO_LUAR_K6B2A.adegan.every((a) => /metode (dari )?luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Gerakan Satu Juta Pohon", "Pak Wayan", "10 Januari|\"10\"", "jarak", "Tujuan Pembelajaran", "Pertanyaan Pemantik", "Kata Kunci", "peta konsep", "Mengingat Kembali", "faktor", "kelipatan", "pecahan", "Eksplorasi 2.1", "Artus", "Paket A", "Paket B", "Eksplorasi 2.2", "pucuk merah", "cemara", "bekerja sama", "Latihan 2.1", "roller coaster", "komidi putar", "bianglala", "rumah hantu", "Banyu", "refleksi", "Panduan Guru"]) cek(new RegExp(kata, "i").test(materi), `video materi memuat ${kata}`);
  const ids = V.VIDEO_LUAR_K6B2A.adegan.map((a) => a.id);
  cek(["luara-bahasa", "luara-bahasa-terapan", "luara-urutan", "luara-urutan-terapan", "luara-fpb", "luara-fpb-terapan", "luara-banding", "luara-banding-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(V.VIDEO_MATERI_K6B2A.adegan.length === 7 && V.VIDEO_LUAR_K6B2A.adegan.length === 10, "7 adegan materi dan 10 adegan metode luar");
  cek(!/subbab C|rasio bagian terhadap keseluruhan|part to whole/i.test(V.VIDEO_LUAR_K6B2A.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ")), "metode luar Subbab A tidak membahas materi Subbab C");
  cek(totalKetukan >= 90, `total ketukan cukup dalam (${totalKetukan})`);
}

/* ------------------------------ Angka yang dihitung dalam video, dihitung mandiri ------------------------------ */
{
  const fpb = (a, b) => (b === 0 ? a : fpb(b, a % b));
  // faktor, dihitung satu per satu
  const faktor = (n) => Array.from({ length: n }, (_, i) => i + 1).filter((f) => n % f === 0);
  sama(faktor(10), [1, 2, 5, 10], "faktor 10");
  sama(faktor(15), [1, 3, 5, 15], "faktor 15");
  sama(faktor(10).filter((f) => faktor(15).includes(f)), [1, 5], "faktor persekutuan 10 dan 15");
  sama([1, 2, 3].map((n) => 6 * n), [6, 12, 18], "tiga kelipatan 6");
  cek(10 % 2 === 0, "2 faktor dari 10");
  // penyederhanaan (FPB) dan kesetaraan lewat silang kali
  const sederhana = (a, b) => [a / fpb(a, b), b / fpb(a, b)];
  const setara = (a, b, c, d) => a * d === b * c;
  const kasus = [[10, 15, 5, [2, 3]], [4, 6, 2, [2, 3]], [6, 9, 3, [2, 3]], [24, 18, 6, [4, 3]], [12, 8, 4, [3, 2]], [6, 4, 2, [3, 2]], [6, 15, 3, [2, 5]], [2, 3, 1, [2, 3]]];
  for (const [a, b, f, h] of kasus) {
    sama([fpb(a, b), sederhana(a, b)], [f, h], `FPB dan rasio sederhana ${a} banding ${b}`);
    cek(setara(a, b, h[0], h[1]), `${a} banding ${b} setara dengan ${h[0]} banding ${h[1]} (silang kali)`);
  }
  cek(sederhana(12, 8).join() === "3,2" && sederhana(6, 4).join() === "3,2", "12 : 8 dibagi 2 menjadi 6 : 4, belum sederhana (FPB 2), lalu 3 : 2");
  // arah: a banding b tidak sama dengan b banding a
  cek(!setara(2, 3, 3, 2) && !setara(4, 3, 3, 4) && !setara(3, 5, 5, 3), "arah rasio: a banding b tidak sama dengan b banding a");
  sama([sederhana(6, 4), sederhana(18, 24)], [[3, 2], [3, 4]], "rasio balik: 6 : 4 = 3 : 2 dan 18 : 24 = 3 : 4");
  // tambah sama tidak menjaga rasio, kali sama menjaga
  cek(!setara(2, 3, 4, 5) && 2 * 5 === 10 && 3 * 4 === 12, "2 : 3 ditambah 2 pada kedua suku menjadi 4 : 5, tidak setara (10 dan 12)");
  cek(setara(2, 3, 4, 6) && 4 * 3 === 12 && 6 * 2 === 12, "2 : 3 dikali 2 menjadi 4 : 6, setara (12 dan 12)");
  cek(!setara(4, 5, 2, 3) && 4 * 3 === 12 && 5 * 2 === 10, "silang kali 4 : 5 dan 2 : 3: 12 dan 10");
  // Eksplorasi 2.1: harga per bibit dan silang kali
  sama(50000 / 4, 12500, "harga satu bibit paket A");
  sama(Math.round((40000 / 3) * 1000) / 1000, 13333.333, "harga satu bibit paket B sekitar 13.333");
  cek(50000 / 4 < 40000 / 3, "paket A lebih murah per bibit");
  sama([50000 * 3, 40000 * 4], [150000, 160000], "silang kali: 150.000 lebih kecil dari 160.000");
  cek(50000 * 3 < 40000 * 4, "silang kali konsisten dengan pembagian");
  cek(4 - 3 === 1 && 50000 - 40000 === 10000, "selisih: paket A lebih banyak 1 bibit dan lebih mahal 10.000");
  // Eksplorasi 2.2: 4 pucuk merah, 6 cemara; 14 pucuk jadi 21 cemara
  sama(sederhana(4, 6), [2, 3], "pucuk merah : cemara = 2 : 3");
  sama([14 / 2, (14 / 2) * 3], [7, 21], "14 pucuk merah: 7 kelompok, 21 cemara");
  cek(setara(2, 3, 14, 21) && setara(4, 6, 14, 21), "2 : 3 dan 4 : 6 setara dengan 14 : 21");
  // Latihan 2.1 nomor 2: roller coaster 24, komidi putar 18, bianglala 4 : 3, rumah hantu 2 : 6
  sama([(24 / 3) * 4, 24 / 3], [32, 8], "bianglala 32 (pengali 8)");
  sama((18 / 6) * 2, 6, "rumah hantu 6 (pengali 3)");
  cek(setara(4, 3, 32, 24) && setara(2, 6, 6, 18), "bianglala 32 : 24 = 4 : 3 dan rumah hantu 6 : 18 = 2 : 6");
  // Latihan 2.1 nomor 3: 6 liter untuk 15 orang; 10 orang
  sama([sederhana(6, 15), (6 / 15) * 10], [[2, 5], 4], "minuman 6 : 15 = 2 : 5 dan 10 orang butuh 4 liter");
  cek(setara(2, 5, 4, 10), "2 : 5 setara dengan 4 : 10");
  // Semua persamaan yang tampak di gambar: periksa aritmetikanya satu per satu.
  let cacah = 0;
  const angka = (s) => Number(s.replace(/\./g, ""));
  for (const v of VIDEO) for (const a of v.adegan) a.ketukan.forEach((kt, i) => {
    for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) {
      let m;
      if ((m = t.match(/^(\d[\d.]*) x (\d+) = (\d[\d.]*)$/))) { cacah += 1; cek(angka(m[1]) * angka(m[2]) === angka(m[3]), `${a.id}: perkalian di gambar "${t}"`); }
      if ((m = t.match(/^(\d+) - (\d+) = (\d+)$/))) { cacah += 1; cek(angka(m[1]) - angka(m[2]) === angka(m[3]), `${a.id}: pengurangan di gambar "${t}"`); }
      if ((m = t.match(/^(\d+) : (\d+)\s+=\s+(\d+) : (\d+)$/))) { cacah += 1; cek(setara(+m[1], +m[2], +m[3], +m[4]), `${a.id}: kesetaraan rasio di gambar "${t}"`); }
      if ((m = t.match(/^(\d[\d.]*) : (\d+) = Rp(\d[\d.]*) per bibit$/))) { cacah += 1; cek(angka(m[1]) / angka(m[2]) === angka(m[3]), `${a.id}: harga per bibit di gambar "${t}"`); }
      if ((m = t.match(/^(\d+) : (\d+) = (\d+) kelompok$/))) { cacah += 1; cek(+m[1] / +m[2] === +m[3], `${a.id}: pembagian di gambar "${t}"`); }
    }
  });
  cek(cacah >= 12, `persamaan di gambar yang diperiksa mandiri (${cacah})`);
}

/* ------------------------------ Kutipan buku (bila PDF tersedia) ------------------------------ */
{
  const pdf = new URL("../bahan-sd/Matematika-BS-KLS-VI.pdf", import.meta.url);
  const ada = existsSync(pdf);
  const cobaPdf = ada ? spawnSync("pdftotext", ["-f", "60", "-l", "69", "-raw", pdf.pathname.replace(/^\/([A-Za-z]:)/, "$1"), "-"], { encoding: "utf8", maxBuffer: 1 << 26 }) : null;
  if (!ada || !cobaPdf || cobaPdf.status !== 0) console.log("PDF atau pdftotext tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const buku = bersih(cobaPdf.stdout);
    let n = 0;
    for (const a of V.VIDEO_MATERI_K6B2A.adegan) for (const kt of a.kutipan ?? []) {
      n += 1;
      cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
    }
    cek(n >= 20, `jumlah kutipan buku yang diperiksa (${n})`);
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k6b2a-.*)\.(ts|tsx)$/.test(f));
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
  
  // larangan berbagi visual: berkas k6b2aa tidak mengimpor gambar atau adegan bab lain
  for (const f of berkas.filter((x) => x.startsWith("k6b2a-"))) {
    const s = readFileSync(new URL(f, folder), "utf8");
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|k6b2a-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k6b2a sendiri (${impor.join(", ")})`);
  }
  // mesin tidak memakai kit visual lama
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k6b2a.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_A62/.test(pembungkus) && /VIDEO_MATERI_K6B2A/.test(pembungkus) && /VIDEO_LUAR_K6B2A/.test(pembungkus), "video-k6b2aa: memakai dua video baru, bukan naskah dan visual lama");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n * 0.5 / 60).toFixed(1)} menit suara)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
