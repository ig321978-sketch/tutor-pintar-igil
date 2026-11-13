// Uji Story Kelas 6 Bab 1 Sub-Bab A (Perkalian Pecahan, termasuk pembuka bab): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// pemisahan materi dan metode luar, kutipan buku (bila PDF ada), hitungan mandiri, emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k6b1a.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k6b1a-video.ts");

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

/* ------------------------------ Pecahan mandiri (bilangan bulat) ------------------------------ */
const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));
const pc = (n, d = 1) => {
  const g = gcd(n, d) || 1;
  return [n / g, d / g];
};
const kali = ([a, b], [c, d]) => pc(a * c, b * d);
const bagi = ([a, b], [c, d]) => pc(a * d, b * c);
const tambahPc = ([a, b], [c, d]) => pc(a * d + c * b, b * d);
const kurang = ([a, b], [c, d]) => pc(a * d - c * b, b * d);
const samaPc = (x, y) => x[0] === y[0] && x[1] === y[1];
/** Nilai satu suku: "3/5" atau "12". */
const suku = (s) => {
  const m = s.match(/^(\d+)(?:\/(\d+))?$/);
  return m ? pc(Number(m[1]), m[2] ? Number(m[2]) : 1) : null;
};
/** Hitung ungkapan "a × b ÷ c + d" dari kiri ke kanan. */
const hitung = (s) => {
  const t = s.trim().split(/\s+/);
  let nilai = suku(t[0]);
  if (!nilai) return null;
  for (let i = 1; i < t.length; i += 2) {
    const v = suku(t[i + 1] ?? "");
    if (!v) return null;
    nilai = t[i] === "×" ? kali(nilai, v) : t[i] === "÷" ? bagi(nilai, v) : t[i] === "+" ? tambahPc(nilai, v) : t[i] === "-" ? kurang(nilai, v) : null;
    if (!nilai) return null;
  }
  return nilai;
};

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K6B1A, V.VIDEO_LUAR_K6B1A];
const bilanganDari = (t) => (t.match(/\d[\d.]*\d|\d/g) ?? []).map((v) => v.replace(/\./g, ""));
const semuaSidik = new Map();
let totalKetukan = 0;
let totalKata = 0;
let persamaanDiperiksa = 0;
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
          // persamaan di gambar diperiksa mandiri
          const isi = o.isi ?? "";
          const inti = isi.replace(/(\s+[A-Za-zm²]+)+$/, "");
          if (/^[\d\s×÷+\-\/=]+$/.test(inti) && inti.includes("=")) {
            const sisi = inti.split("=").map((s) => s.trim());
            if (sisi.every((s) => s.length > 0)) {
              const nilai = sisi.map(hitung);
              const ok = nilai.every((n) => n !== null) && nilai.every((n) => samaPc(n, nilai[0]));
              persamaanDiperiksa += 1;
              cek(ok, `${nama}#${i + 1}: persamaan di gambar "${isi}" salah hitung (${JSON.stringify(nilai)})`);
            }
          }
        } else if (o.t === "kotak") cek((x > -2 && y > -2 && x + (o.w ?? 0) < 302 && y + (o.h ?? 0) < 210) || o.id === "tanah" || o.id === "lantai", `${nama}#${i + 1}: kotak ${o.id} masuk kanvas`);
        else if (o.t === "bulat") cek(x - (o.r ?? 0) > -2 && x + (o.r ?? 0) < 302 && y - (o.r ?? 0) > -2 && y + (o.r ?? 0) < 210, `${nama}#${i + 1}: bulat ${o.id} masuk kanvas`);
      }
    });
  }
}

/* ------------------------------ Pemisahan materi dan metode luar ------------------------------ */
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map((a) => [a.judul, a.sumber, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]));
  const NAMA_METODE = /Area Model|Whole-as-Fraction|Straight-Arrow|Commutative|Multiplication|metode luar|metode dari luar/i;
  const materi = teksVideo(V.VIDEO_MATERI_K6B1A);
  const luar = teksVideo(V.VIDEO_LUAR_K6B1A);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Area Model Multiplication", "Whole-as-Fraction", "Straight-Arrow Multiply", "Commutative Multiply Check"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(V.VIDEO_MATERI_K6B1A.adegan.every((a) => /Buku Siswa/.test(a.sumber) && /hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(V.VIDEO_LUAR_K6B1A.adegan.every((a) => /metode (dari )?luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Bab 1 Pecahan dan Desimal", "Agam", "Ayah", "penampungan", "Gambar 1.1", "Tujuan Pembelajaran", "Pertanyaan Pemantik", "Kata Kunci", "Peta Konsep", "Mengingat Kembali", "kantong", "pizza", "jeruk", "Permasalahan", "Eksplorasi 1.1", "ember besar", "ember kecil", "lajur", "Eksplorasi 1.2", "mangga", "manalagi", "Ayo Berkomunikasi", "Ayo Berpikir Kritis", "Latihan 1.1", "Hani", "Fina", "pastel", "SD Melati", "Rani", "Ayo Berefleksi", "Panduan Guru"]) cek(new RegExp(kata, "i").test(materi), `video materi memuat ${kata}`);
  const ids = V.VIDEO_LUAR_K6B1A.adegan.map((a) => a.id);
  cek(["luar-area", "luar-area-terapan", "luar-bulat", "luar-bulat-terapan", "luar-panah", "luar-panah-terapan", "luar-tukar", "luar-tukar-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(V.VIDEO_MATERI_K6B1A.adegan.length === 9 && V.VIDEO_LUAR_K6B1A.adegan.length === 10, "9 adegan materi dan 10 adegan metode luar");
  const suaraLuar = V.VIDEO_LUAR_K6B1A.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  const suaraMateri = V.VIDEO_MATERI_K6B1A.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  cek(!/pembagian pecahan|desimal|kebalikan|persepuluhan|perseratusan/i.test(suaraLuar), "metode luar Subbab A tidak membahas Subbab B atau C");
  cek(!/persepuluhan|perseratusan|pembagian bilangan asli dengan pecahan/i.test(suaraMateri), "materi Subbab A tidak membahas persepuluhan");
  cek(totalKetukan >= 90, `total ketukan cukup dalam (${totalKetukan})`);
}

/* ------------------------------ Angka yang dihitung dalam video, dihitung mandiri ------------------------------ */
{
  const P = (n, d = 1) => pc(n, d);
  // Eksplorasi 1.1: ember besar 2 m2, ember kecil 3/5 m2
  sama(kali(P(5), P(2)), P(10), "5 ember besar: 5 kali 2 = 10");
  sama(kali(P(2), P(3, 5)), P(6, 5), "2 ember kecil: 2 kali 3/5 = 6/5");
  sama(tambahPc(P(3, 5), P(3, 5)), P(6, 5), "3/5 + 3/5 = 6/5 (cara kelas 5)");
  sama(kali(P(5), P(3, 5)), P(3), "5 ember kecil: 5 kali 3/5 = 15/5 = 3");
  sama(kali(P(5), P(1, 5)), P(1), "5 kali 1/5 = 1 (Ayo Berpikir Kritis)");
  cek(kali(P(5), P(1, 5))[0] / kali(P(5), P(1, 5))[1] > 1 / 5, "5 kali 1/5 lebih besar dari 1/5");
  cek(kali(P(2), P(3, 5))[0] / kali(P(2), P(3, 5))[1] > 3 / 5, "2 kali 3/5 lebih besar dari 3/5");
  // miskonsepsi 6/10: 10 lajur dari dua kotak berpenyebut 5, nilainya 6/5 bukan 6/10
  cek(!samaPc(P(6, 10), P(6, 5)) && samaPc(P(6, 10), P(3, 5)), "6/10 salah: sama dengan 3/5, bukan 6/5");
  // Eksplorasi 1.2: 2/3 dari 15 pohon
  sama([15 / 3, 2 * (15 / 3)], [5, 10], "15 dibagi 3 = 5 dan 2 bagian = 10 pohon");
  sama([kali(P(2, 3), P(15)), kali(P(15), P(2, 3))], [P(10), P(10)], "2/3 kali 15 = 15 kali 2/3 = 10");
  sama(pc(30, 3), P(10), "30/3 = 10");
  // Ayo Berkomunikasi: 8 kali 3/4 dan 3/4 kali 8
  sama([kali(P(8), P(3, 4)), kali(P(3, 4), P(8))], [P(6), P(6)], "8 kali 3/4 = 3/4 kali 8 = 6");
  sama(pc(24, 4), P(6), "24/4 = 6");
  // Latihan 1.1
  sama(kali(P(4), P(3, 4)), P(3), "nomor 1: 4 kali 3/4 = 3 m");
  sama([kali(P(2, 15), P(75)), kurang(P(75), P(10))], [P(10), P(65)], "nomor 2: 2/15 kali 75 = 10; belum dimakan 65");
  sama(kali(P(1, 6), P(180)), P(30), "nomor 3a: 1/6 kali 180 = 30");
  sama(kali(P(2, 3), P(30)), P(20), "nomor 3b: 2/3 kali 30 = 20");
  sama(kali(kali(P(1, 6), P(2, 3)), P(180)), P(20), "nomor 3c: 1/6 kali 2/3 kali 180 = 20");
  sama([kali(P(1, 4), P(20)), kali(P(20), P(1, 4)), kurang(P(20), P(5))], [P(5), P(5), P(15)], "nomor 4: 1/4 kali 20 = 20 kali 1/4 = 5; sisa 15");
  // Mengingat kembali dan metode luar
  sama([4 * 6, 20 / 5], [24, 4], "4 kantong 6 permen = 24; 20 permen 5 anak = 4");
  sama([pc(8, 12), pc(2, 6), pc(6, 10)], [P(2, 3), P(1, 3), P(3, 5)], "jeruk 8/12 = 2/3; pizza 2/6 = 1/3; pita 6/10 = 3/5");
  sama(kali(P(3), P(2, 5)), P(6, 5), "metode luas: 3 kali 2/5 = 6/5");
  sama(kali(P(4), P(2, 5)), P(8, 5), "4 kali 2/5 = 8/5");
  sama([kali(P(6), P(2, 3)), kali(P(2, 3), P(6))], [P(4), P(4)], "6 kali 2/3 = 2/3 kali 6 = 4");
  sama([3 * 4, 4 * 3], [12, 12], "3 kali 4 = 4 kali 3 = 12");
  cek(persamaanDiperiksa >= 25, `persamaan di gambar yang diperiksa mandiri (${persamaanDiperiksa})`);

  // Hitungan dari gambar: jumlah petak yang diwarnai harus sama dengan hasil yang diucapkan.
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const hitungWarna = (objs, pola, warna) => objs.filter((o) => o.t === "kotak" && pola.test(o.id) && o.warna === warna).length;
  {
    const a = adegan(V.VIDEO_MATERI_K6B1A, "eksplorasi-11b");
    const s = akhirAdegan(a, 3);
    cek(hitungWarna(s, /^[ab]-\d$/, "#86EFAC") === 6, "gambar ember kecil: 3 lajur dikali 2 ember = 6 lajur berarti 6/5");
  }
  {
    const a = adegan(V.VIDEO_MATERI_K6B1A, "eksplorasi-12");
    const s = akhirAdegan(a, 3);
    cek(hitungWarna(s, /^m-\d-\d$/, "#FCA5A5") === 10 && s.filter((o) => /^m-\d-\d$/.test(o.id)).length === 15, "gambar mangga: 10 dari 15 petak diwarnai (2/3 kali 15)");
  }
  {
    const a = adegan(V.VIDEO_MATERI_K6B1A, "latihan-11-a");
    cek(hitungWarna(akhirAdegan(a, 0), /^p\d-\d$/, "#86EFAC") === 12, "gambar pita Hani: 12 sel seperempat = 12/4 = 3 meter");
    cek(hitungWarna(akhirAdegan(a, 3), /^b\d+$/, "#FCA5A5") === 2 && akhirAdegan(a, 3).filter((o) => /^b\d+$/.test(o.id)).length === 15, "gambar pastel: 2 dari 15 bagian diwarnai");
    cek(hitungWarna(akhirAdegan(a, 4), /^b\d+$/, "#86EFAC") === 13, "gambar pastel: 13 bagian sisa = 65 kue");
  }
  {
    const a = adegan(V.VIDEO_LUAR_K6B1A, "luar-area-terapan");
    cek(hitungWarna(akhirAdegan(a, 1), /^[abc]-\d$/, "#86EFAC") === 6, "gambar metode luas: 3 petak kali 2 lajur = 6 lajur");
    const a2 = adegan(V.VIDEO_LUAR_K6B1A, "luar-area");
    cek(hitungWarna(akhirAdegan(a2, 4), /^a[rs]-\d$/, "#86EFAC") === 6, "gambar luas konsep: 2 petak kali 3 lajur = 6 lajur");
  }
}

/* ------------------------------ Kutipan buku (bila PDF tersedia) ------------------------------ */
{
  const pdf = new URL("../bahan-sd/Matematika-BS-KLS-VI.pdf", import.meta.url);
  const ada = existsSync(pdf);
  const cobaPdf = ada ? spawnSync("pdftotext", ["-f", "15", "-l", "30", "-raw", pdf.pathname.replace(/^\/([A-Za-z]:)/, "$1"), "-"], { encoding: "utf8", maxBuffer: 1 << 26 }) : null;
  if (!ada || !cobaPdf || cobaPdf.status !== 0) console.log("PDF atau pdftotext tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const buku = bersih(cobaPdf.stdout);
    let n = 0;
    for (const a of V.VIDEO_MATERI_K6B1A.adegan) for (const kt of a.kutipan ?? []) {
      n += 1;
      cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
    }
    cek(n >= 60, `jumlah kutipan buku yang diperiksa (${n})`);
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k6b1a-.*)\.(ts|tsx)$/.test(f));
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
    // larangan berbagi visual: berkas k6b1a hanya mengimpor logika dan berkas k6b1a sendiri
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|k6b1a-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k6b1a sendiri (${impor.join(", ")})`);
  }
  // mesin tidak memakai kit visual lama
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k6b1a.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_A61|video-k4b2-umum/.test(pembungkus) && /VIDEO_MATERI_K6B1A/.test(pembungkus) && /VIDEO_LUAR_K6B1A/.test(pembungkus) && /export function VideoK6B1A/.test(pembungkus), "video-k6b1a: memakai dua video baru, bukan naskah dan visual lama");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
