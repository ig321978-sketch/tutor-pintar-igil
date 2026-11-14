// Uji Story Kelas 5 Bab 2 Sub-Bab A (kelipatan, termasuk pembuka bab): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, tidak membocorkan materi subbab berikutnya (kelipatan persekutuan, KPK, faktor, FPB, bilangan prima),
// kutipan buku terhadap teks PDF (pdftotext -enc UTF-8), hitungan mandiri (kelipatan, tabel 1 sampai 50 dan 1 sampai 100, kunci kelipatan 9 yang kurang,
// aturan habis dibagi, pola angka satuan), geometri gambar (kisi angka, lingkaran pemain, garis lompat), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b2a.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b2a-video.ts");
const G = await import("../src/components/modul/story/k5b2a-gambar.ts");
const M1 = await import("../src/components/modul/story/k5b2a-materi-1.ts");
const M2 = await import("../src/components/modul/story/k5b2a-materi-2.ts");
const M3 = await import("../src/components/modul/story/k5b2a-materi-3.ts");
const LU1 = await import("../src/components/modul/story/k5b2a-luar-1.ts");

const stat = { sel: 0, pemain: 0, penanda: 0, busur: 0, teksPasang: 0, persamaan: 0 };
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
const hampir = (a, b, tol, pesan) => cek(Math.abs(a - b) <= tol, `${pesan}: ${a} != ${b} (toleransi ${tol})`);

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
const VIDEO = [V.VIDEO_MATERI_K5B2A, V.VIDEO_LUAR_K5B2A];
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
const seluruhTeks = (v) => v.adegan.map((a) => [a.judul, a.sumber, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const M = V.VIDEO_MATERI_K5B2A;
const U = V.VIDEO_LUAR_K5B2A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const nilaiId = (objs, id) => objs.find((o) => o.id === id)?.isi;
const objId = (objs, id) => objs.find((o) => o.id === id);
{
  const teksVideo = (v) => JSON.stringify(seluruhTeks(v));
  const NAMA_METODE = /Skip Counting|Hundred Chart|Divisibility Check|Last Digit Pattern|metode luar|metode dari luar/i;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Skip Counting", "Hundred Chart", "Divisibility Check", "Last Digit Pattern"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(M.adegan.every((a) => /(Buku Siswa|Panduan Guru) hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Bab 2", "KPK dan FPB", "Peta konsep", "Kata kunci", "Latihan Renang", "Nisa", "Yohana", "Mengingat Kembali", "Eksplorasi 2.1", "Tepuk Bilangan Kelipatan", "Asep", "Ayo Berlatih", "Refleksi", "tabel", "Panduan guru", "kelipatan"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-lompat", "luar-lompat-terapan", "luar-seratus", "luar-seratus-terapan", "luar-cek", "luar-cek-terapan", "luar-satuan", "luar-satuan-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk empat metode");
  cek(M.adegan.length === 12 && U.adegan.length === 10, "12 adegan materi dan 10 adegan metode luar");
  // Subbab A tidak membocorkan subbab berikutnya. Pembuka bab, peta konsep, dan skema boleh menyebutnya sebagai daftar bab; cerita renang menyebut KPK sebagai petunjuk;
  // Mengingat Kembali memuat faktor dari 6 dan 10 sesuai buku.
  const BOCOR = /persekutuan|KPK|FPB|faktor|prima|Eratosthenes/i;
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const boleh = ["pembuka-bab", "peta-konsep", "latihan-renang", "mengingat-kembali"];
  for (const a of M.adegan.filter((x) => !boleh.includes(x.id))) cek(!BOCOR.test(teksAdegan(a)), `materi ${a.id} tidak membocorkan subbab berikutnya`);
  for (const a of U.adegan) cek(!BOCOR.test(teksAdegan(a)), `metode luar ${a.id} tidak membocorkan subbab berikutnya`);
  cek(["pembuka-bab", "peta-konsep"].every((i) => BOCOR.test(teksAdegan(adegan(M, i)))), "pembuka dan peta konsep menyebut KPK, FPB, dan faktor sebagai daftar bab");
  // Cerita renang hanya mengajukan pertanyaan; jawabannya (KPK 3 dan 4 adalah 12, yaitu 15 Agustus) ditunda ke subbab B.
  cek(!/\b12\b|\b15\b|dua belas|lima belas|15 Agustus|kelipatan persekutuan terkecil dari/i.test(teksAdegan(adegan(M, "latihan-renang")).replace(/dan kelipatan persekutuan dulu/, "")), "cerita renang tidak menjawab pertanyaan jadwal");
  cek(!/Uji Kompetensi|pengayaan|remedial/i.test(materi + luar), "tidak memakai Uji Kompetensi, pengayaan, remedial milik subbab lain");
  cek(totalKetukan >= 80, `total ketukan cukup dalam (${totalKetukan})`);
}

/* ------------------------------ Semua persamaan di gambar dihitung ulang ------------------------------ */
{
  let n = 0;
  const hitungSisi = (s) => Function(`"use strict"; return (${s.trim().replace(/×/g, "*") || "NaN"});`)();
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        for (const o of akhirAdegan(a, i)) {
          if (o.t !== "teks" || !o.isi) continue;
          const m = o.isi.match(/^(\d[\d\s+×()]*(?:=\s*\d[\d\s+×()]*)+)/);
          if (!m) continue;
          const nilaiSisi = m[1].split("=").map(hitungSisi);
          n += 1;
          stat.persamaan += 1;
          cek(nilaiSisi.every((x) => Math.abs(x - nilaiSisi[0]) < 1e-9), `${v.id}/${a.id}#${i + 1}: persamaan "${o.isi}" benar (${nilaiSisi.join(" ; ")})`);
        }
      });
    }
  }
  cek(n >= 30, `jumlah persamaan yang diperiksa (${n})`);
  // Tulisan "angka = huruf" tidak boleh lolos tanpa dihitung: tidak ada teks yang diawali angka lalu tanda sama dengan diikuti huruf.
  for (const v of VIDEO) for (const a of v.adegan) a.ketukan.forEach((_, i) => { for (const o of akhirAdegan(a, i)) if (o.t === "teks" && /^\d+\s*=\s*[A-Za-z]/.test(o.isi ?? "")) cek(false, `${v.id}/${a.id}#${i + 1}: teks "${o.isi}" mengandung sama dengan dengan huruf`); });
}

/* ------------------------------ Data buku, dihitung mandiri ------------------------------ */
const kel = (n, maks) => Array.from({ length: Math.floor(maks / n) }, (_, i) => (i + 1) * n);
const faktor = (n) => Array.from({ length: n }, (_, i) => i + 1).filter((d) => n % d === 0);
const jumlahAngka = (n) => String(n).split("").reduce((t, d) => t + Number(d), 0);
const urut = (n) => Array.from({ length: n }, (_, i) => i);
{
  sama(kel(3, 50).length, 16, "ada 16 kelipatan 3 sampai 50 (3 sampai 48)");
  sama(kel(7, 100).length, 14, "ada 14 kelipatan 7 sampai 100");
  sama(kel(9, 100).length, 11, "ada 11 kelipatan 9 sampai 100");
  sama(kel(2, 10), [2, 4, 6, 8, 10], "kelipatan 2 (Mengingat Kembali no. 1)");
  sama(kel(4, 20), [4, 8, 12, 16, 20], "kelipatan 4 (no. 2)");
  sama(kel(6, 30), [6, 12, 18, 24, 30], "kelipatan 6 (no. 3)");
  sama(faktor(6), [1, 2, 3, 6], "faktor 6 (no. 4)");
  sama(faktor(10), [1, 2, 5, 10], "faktor 10 (no. 5)");
  // Kunci Panduan Guru hlm. 51 untuk kelipatan 9 mewarnai 9, 18, ..., 81 saja (diperiksa dari warna gambar PDF); dua bilangan terakhir, 90 dan 99, tidak diwarnai.
  sama(M3.KUNCI_9_BUKU, kel(9, 100).slice(0, 9), "kunci buku kelipatan 9: sembilan bilangan pertama");
  sama(kel(9, 100).slice(9), [90, 99], "bilangan yang tidak ada di kunci buku: 90 dan 99");
  sama(kel(7, 100), [7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 84, 91, 98], "kunci kelipatan 7 hlm. 51 lengkap");
  // Kunci nomor 2 dan 3 Panduan Guru hlm. 51.
  sama(kel(6, 48).slice(1), [12, 18, 24, 30, 36, 42, 48], "kunci nomor 2 dimulai dari 12");
  sama(kel(8, 56), [8, 16, 24, 32, 40, 48, 56], "kunci nomor 3");
  // Aturan habis dibagi benar untuk 1 sampai 500.
  for (let n = 1; n <= 500; n += 1) {
    const s = n % 10;
    cek((n % 2 === 0) === [0, 2, 4, 6, 8].includes(s), `aturan 2 benar untuk ${n}`);
    cek((n % 5 === 0) === [0, 5].includes(s), `aturan 5 benar untuk ${n}`);
    cek((n % 10 === 0) === (s === 0), `aturan 10 benar untuk ${n}`);
    cek((n % 3 === 0) === (jumlahAngka(n) % 3 === 0), `aturan 3 benar untuk ${n}`);
    cek((n % 9 === 0) === (jumlahAngka(n) % 9 === 0), `aturan 9 benar untuk ${n}`);
    cek((n % 6 === 0) === (n % 2 === 0 && jumlahAngka(n) % 3 === 0), `aturan 6 (genap dan jumlah angka kelipatan 3) benar untuk ${n}`);
  }
  // Pola angka satuan.
  sama(kel(3, 30).map((n) => n % 10), [3, 6, 9, 2, 5, 8, 1, 4, 7, 0], "satuan kelipatan 3");
  sama(kel(3, 60).map((n) => n % 10).slice(10), [3, 6, 9, 2, 5, 8, 1, 4, 7, 0], "satuan kelipatan 3 berulang setiap sepuluh kelipatan");
  sama(kel(9, 90).map((n) => n % 10), [9, 8, 7, 6, 5, 4, 3, 2, 1, 0], "satuan kelipatan 9 turun satu tiap langkah");
  sama(kel(9, 90).map((n) => Math.floor(n / 10)), urut(10), "puluhan kelipatan 9 naik satu tiap langkah");
  cek(kel(9, 90).every((n) => Math.floor(n / 10) + (n % 10) === 9), "puluhan ditambah satuan selalu 9");
  cek(99 % 10 === 9 && Math.floor(99 / 10) + 99 % 10 === 18 && 18 % 9 === 0, "99 lolos aturan 9 (jumlah angka 18)");
  cek(82 % 9 !== 0 && jumlahAngka(82) === 10, "82 bukan kelipatan 9 (jumlah angka 10)");
  // Skema waktu Tabel 2.1 Panduan Guru hlm. 46: 2 + 6 + 2 + 6 + 8 = 24 JP.
  sama(M1.JP_SUBBAB.map((s) => s.jp), [2, 6, 2, 6, 8], "jam pelajaran lima subbab");
  sama(M1.JP_SUBBAB.reduce((t, s) => t + s.jp, 0), 24, "total 24 jam pelajaran");
  // Pemain tepuk: 8 pemain, 27 kembali ke pemain pertama, 30 ke kedua, 33 ke ketiga (nomor urut kelipatan dibagi 8).
  sama([27, 30, 33].map((n) => (n / 3 - 1) % 8), [0, 1, 2], "setelah 24 (pemain ke-8), 27, 30, 33 kembali ke pemain 1, 2, 3");
}

/* ------------------------------ Geometri umum: kisi angka, lingkaran pemain, garis lompat ------------------------------ */
const kisi = (objs, id, kolom, x0, y0, cw, ch, jumlah, mulai = 1) => {
  const hasil = {};
  for (let i = 0; i < jumlah; i += 1) {
    const n = mulai + i;
    const c = objId(objs, `${id}-c${n}`);
    const t = objId(objs, `${id}-t${n}`);
    cek(c && t, `kisi ${id}: sel ${n} ada`);
    if (!c || !t) continue;
    stat.sel += 1;
    hampir(c.x, x0 + (i % kolom) * cw, 1e-6, `kisi ${id}: sel ${n} di kolom ${(i % kolom) + 1}`);
    hampir(c.y, y0 + Math.floor(i / kolom) * ch, 1e-6, `kisi ${id}: sel ${n} di baris ${Math.floor(i / kolom) + 1}`);
    cek(c.w === cw && c.h === ch, `kisi ${id}: sel ${n} berukuran sama`);
    hampir(t.x, c.x + cw / 2, 1e-6, `kisi ${id}: angka ${n} di tengah sel`);
    sama(t.isi, String(n), `kisi ${id}: sel ${n} bertulisan ${n}`);
    hasil[n] = c.warna;
  }
  return hasil;
};
const berwarna = (hasil) => Object.entries(hasil).filter(([, w]) => w !== G.W.putih).map(([n]) => Number(n));
const warnaSel = (hasil, n) => hasil[n];
const pusat = (x0, y0, cw, ch, kolom, n) => [x0 + (((n - 1) % kolom) + 0.5) * cw, y0 + (Math.floor((n - 1) / kolom) + 0.5) * ch];
/** Panah antarpusat sel: awal 20 persen dan akhir 80 persen dari garis pusat a ke pusat b. */
const cekPanahSel = (o, x0, y0, cw, ch, kolom, a, b, pesan) => {
  const [ax, ay] = pusat(x0, y0, cw, ch, kolom, a);
  const [bx, by] = pusat(x0, y0, cw, ch, kolom, b);
  hampir(o.x, ax + (bx - ax) * 0.2, 0.01, `${pesan}: awal panah ${a}`);
  hampir(o.y, ay + (by - ay) * 0.2, 0.01, `${pesan}: awal panah ${a} (y)`);
  hampir(o.x + o.x2, ax + (bx - ax) * 0.8, 0.01, `${pesan}: akhir panah ${b}`);
  hampir(o.y + o.y2, ay + (by - ay) * 0.8, 0.01, `${pesan}: akhir panah ${b} (y)`);
  stat.busur += 1;
};
const RING = M2.RING;
const titik = (i) => [RING.cx + RING.r * Math.cos(-Math.PI / 2 + (i * 2 * Math.PI) / RING.jumlah), RING.cy + RING.r * Math.sin(-Math.PI / 2 + (i * 2 * Math.PI) / RING.jumlah)];
const cekRing = (objs, id, pesan) => {
  for (let i = 0; i < RING.jumlah; i += 1) {
    const p = objId(objs, `${id}-p${i}`);
    cek(p && p.r === RING.rp, `${pesan}: pemain ${i + 1} berjari-jari sama`);
    if (!p) continue;
    stat.pemain += 1;
    const [tx, ty] = titik(i);
    hampir(p.x, tx, 0.01, `${pesan}: pemain ${i + 1} di tempatnya (x)`);
    hampir(p.y, ty, 0.01, `${pesan}: pemain ${i + 1} di tempatnya (y)`);
    hampir(Math.hypot(p.x - RING.cx, p.y - RING.cy), RING.r, 0.01, `${pesan}: pemain ${i + 1} sejauh ${RING.r} dari pusat`);
  }
  const jarakTetangga = 2 * RING.r * Math.sin(Math.PI / RING.jumlah);
  cek(jarakTetangga > 2 * RING.rp + 4, `${pesan}: bulatan pemain tidak bertabrakan (jarak ${jarakTetangga.toFixed(1)})`);
};
const nilaiDari = (x, x0, satuan) => (x - x0) / satuan;
/** Garis lompat: garis, goresan di tiap kelipatan `langkah`, dan angka di bawah goresan. */
const cekGarisLompat = (objs, id, x0, y, satuan, maks, langkah, pesan) => {
  const g = objId(objs, `${id}-g`);
  cek(g && g.x === x0 && g.y === y && g.x2 === satuan * maks, `${pesan}: garis mulai di 0 dan sepanjang ${maks} satuan`);
  for (let n = 0; n <= maks; n += langkah) {
    const t = objId(objs, `${id}-t${n}`);
    const l = objId(objs, `${id}-l${n}`);
    cek(t && l, `${pesan}: goresan dan angka ${n} ada`);
    if (!t || !l) continue;
    hampir(t.x, x0 + n * satuan, 1e-6, `${pesan}: goresan ${n} tepat`);
    sama(l.isi, String(n), `${pesan}: angka ${n}`);
    stat.penanda += 1;
  }
};
/** Busur dan titik pendaratan lompatan ke-i: busur dari (i-1) x langkah sampai i x langkah, titik tepat di ujung busur. */
const cekLompatan = (objs, id, x0, y, satuan, langkah, i, pesan) => {
  const a = objId(objs, `${id}-a${i}`);
  const m = objId(objs, `${id}-m${i}`);
  cek(a && m, `${pesan}: lompatan ${i} dan pendaratan ada`);
  if (!a || !m) return null;
  const [, , cx, , dx] = bilangan(a.d);
  hampir(a.x, x0 + (i - 1) * langkah * satuan, 1e-6, `${pesan}: busur ${i} mulai di ${(i - 1) * langkah}`);
  hampir(dx, langkah * satuan, 1e-6, `${pesan}: busur ${i} sepanjang ${langkah} satuan`);
  hampir(cx, dx / 2, 1e-6, `${pesan}: puncak busur ${i} di tengah`);
  hampir(m.x, a.x + dx, 1e-6, `${pesan}: pendaratan ${i} tepat di ujung busur`);
  sama(m.y, y, `${pesan}: pendaratan ${i} di garis`);
  stat.busur += 1;
  return nilaiDari(m.x, x0, satuan);
};
const parsePerkalian = (isi) => {
  const m = String(isi).match(/^(\d+) × (\d+) = (\d+)$/);
  return m ? m.slice(1).map(Number) : null;
};
const parseJumlah = (isi) => {
  const m = String(isi).match(/^(\d+) \+ (\d+) = (\d+)$/);
  return m ? m.slice(1).map(Number) : null;
};

/* ------------------------------ Isi video materi, dihitung mandiri ------------------------------ */
const T = (id, ke) => akhirAdegan(adegan(M, id), ke);
{
  // Pembuka: delapan topik (Buku Siswa hlm. 29), tiga belas tujuan dalam empat kelompok (Panduan Guru hlm. 43).
  sama([0, 1, 2, 3, 4, 5, 6, 7].map((i) => nilaiId(T("pembuka-bab", 0), `tp${i}-t0`)), ["kelipatan", "kelipatan persekutuan", "KPK", "faktor", "faktor persekutuan", "FPB", "aplikasi KPK dan FPB", "bilangan prima"], "delapan topik bab 2");
  {
    const t = T("pembuka-bab", 1);
    const rentang = [0, 1, 2, 3].map((i) => nilaiId(t, `g${i}-t0`).match(/^(\d+)\.(\d+)[–-](\d+)\.(\d+)/).slice(1).map(Number));
    sama(rentang.map((r) => [r[1], r[3]]), [[1, 3], [4, 6], [7, 10], [11, 13]], "empat kelompok tujuan 2.1 sampai 2.13");
    sama(rentang.flatMap((r) => urut(r[3] - r[1] + 1).map((x) => x + r[1])), urut(13).map((x) => x + 1), "tiga belas tujuan tanpa celah atau tumpang tindih");
    cek(rentang.every((r) => r[0] === 2 && r[2] === 2), "semua nomor tujuan berawalan 2.");
    const t3 = T("pembuka-bab", 2);
    cek(objId(t3, "g0-k").sorot === true && [1, 2, 3].every((i) => objId(t3, `g${i}-k`).op === 0.35), "subbab A hanya mengerjakan tujuan pertama (2.1)");
  }
  // Peta konsep: tiga cabang berkolom sama, skema JP, kata kunci.
  {
    const a = adegan(M, "peta-konsep");
    const t = akhirAdegan(a, 0);
    sama([nilaiId(t, "pr-t0"), nilaiId(t, "pa-t0"), nilaiId(t, "pb-t0"), nilaiId(t, "pc-t0")], ["KPK dan FPB", "Kelipatan", "Faktor", "Bilangan Prima"], "tiga cabang peta konsep");
    ["pa", "pb", "pc"].forEach((id, i) => {
      const kk = objId(t, `${id}-k`);
      sama([kk.x, kk.w], [M1.KOLOM_PETA[i], 92], `kolom peta ${id}`);
    });
    sama(["ca", "cb", "cc"].map((id) => objId(t, id).x + objId(t, id).x2), M1.KOLOM_PETA.map((x) => x + 46), "penghubung tepat di tengah tiap kolom");
    const t2 = akhirAdegan(a, 3);
    sama([nilaiId(t2, "pa2-t0"), nilaiId(t2, "pa3-t0"), nilaiId(t2, "pa4-t0"), nilaiId(t2, "pb2-t0"), nilaiId(t2, "pb3-t0"), nilaiId(t2, "pb4-t0"), nilaiId(t2, "pc2-t0"), nilaiId(t2, "pc3-t0")], ["Kelipatan", "KPK", "Aplikasi KPK", "Faktor", "FPB", "Aplikasi FPB", "Faktorisasi", "KPK dan FPB dengan"], "isi tiga rantai peta konsep");
    const kunci = akhirAdegan(a, 4);
    sama([0, 1, 2, 3, 4, 5, 6, 7].map((i) => nilaiId(kunci, `kk${i}-t0`)), ["kelipatan", "kelipatan persekutuan", "KPK", "faktor", "faktor persekutuan", "FPB", "bilangan prima", "saringan Eratosthenes"], "delapan kata kunci");
    const jp = akhirAdegan(a, 5);
    const bar = [0, 1, 2, 3, 4].map((i) => objId(jp, `sb${i}`));
    sama(bar.map((o) => o.w / M1.SKALA_JP), [2, 6, 2, 6, 8], "lebar batang sebanding jam pelajaran");
    sama([0, 1, 2, 3, 4].map((i) => nilaiId(jp, `sj${i}`)), ["2 JP", "6 JP", "2 JP", "6 JP", "8 JP"], "tulisan jam pelajaran");
    sama([0, 1, 2, 3, 4].map((i) => nilaiId(jp, `sh${i}`)), ["A", "B", "C", "D", "E"], "lima subbab A sampai E");
    cek(bar.every((o) => o.x === 52 && o.h === 22), "batang jam pelajaran sejajar dan sama tinggi");
    cek(bar.every((o, i) => i === 0 || o.y - bar[i - 1].y === 32), "jarak antarbatang sama");
    sama(nilaiId(jp, "tot"), "Total 24 JP", "total jam pelajaran");
  }
  // Latihan renang: Nisa tiap 3 hari, Yohana tiap 4 hari, 3 Agustus; hanya pertanyaan.
  {
    const a = adegan(M, "latihan-renang");
    sama([nilaiId(akhirAdegan(a, 1), "jn-t1"), nilaiId(akhirAdegan(a, 1), "jy-t1")], ["3 hari sekali", "4 hari sekali"], "jadwal Nisa dan Yohana");
    sama(nilaiId(akhirAdegan(a, 2), "tg-t0"), "3 Agustus", "tanggal latihan bersama");
    cek(L.teksTerlihat(akhirAdegan(a, 3)).includes("Kapan latihan bersama lagi?"), "pertanyaan kapan latihan bersama lagi");
  }
  // Mengingat Kembali.
  {
    const a = adegan(M, "mengingat-kembali");
    sama([0, 1, 2, 3, 4].map((i) => nilaiId(akhirAdegan(a, 0), `si${i}-t0`)), ["1. kelipatan 2", "2. kelipatan 4", "3. kelipatan 6", "4. faktor dari 6", "5. faktor dari 10"], "lima pertanyaan Mengingat Kembali");
    const deret = (t, id, n) => urut(n).map((i) => Number(nilaiId(t, `${id}-a${i}`)));
    sama(deret(akhirAdegan(a, 1), "k2", 5), kel(2, 10), "jawaban 1: kelipatan 2");
    sama(deret(akhirAdegan(a, 1), "k4", 5), kel(4, 20), "jawaban 2: kelipatan 4");
    sama(deret(akhirAdegan(a, 2), "k6", 5), kel(6, 30), "jawaban 3: kelipatan 6");
    for (const [ke, id, idKartu, n] of [[3, "fa", ["f6a", "f6b"], 6], [4, "fb", ["g10a", "g10b"], 10]]) {
      const t = akhirAdegan(a, ke);
      const f = faktor(n);
      sama(f.map((_, i) => Number(nilaiId(t, `${id}${i}-t0`))), f, `jawaban faktor ${n}`);
      for (const kk of idKartu) {
        const p = parsePerkalian(nilaiId(t, `${kk}-t0`));
        cek(p && p[2] === n && n % p[0] === 0 && n % p[1] === 0, `perkalian ${nilaiId(t, `${kk}-t0`)} bernilai ${n}`);
      }
    }
  }
  // Eksplorasi 2.1: lingkaran pemain, kelipatan 3 berurutan, putaran kedua.
  {
    const a = adegan(M, "tepuk-aturan");
    cekRing(akhirAdegan(a, 1), "rg", "aturan: lingkaran");
    cek(RING.jumlah >= 8, "paling sedikit 8 pemain");
    const t3 = akhirAdegan(a, 2);
    cekRing(t3, "rg", "aturan 3 dan 4: lingkaran");
    cek(objId(t3, "rg-p0").warna === G.W.emas && nilaiId(t3, "mu") === "mulai", "pemain pertama bertanda mulai");
    const t4 = akhirAdegan(a, 3);
    sama(nilaiId(t4, "rg-n0"), "3", "orang pertama menyebut 3");
    const [p0x, p0y] = titik(0);
    const [p1x, p1y] = titik(1);
    const tl = objId(t4, "tl");
    const arah = [p1x - p0x, p1y - p0y];
    cek(Math.abs(tl.x2 * arah[1] - tl.y2 * arah[0]) < 1.5, "panah dilanjutkan sejajar garis pemain 1 ke pemain 2");
    cek(Math.hypot(tl.x - p0x, tl.y - p0y) > RING.rp && Math.hypot(tl.x + tl.x2 - p1x, tl.y + tl.y2 - p1y) > RING.rp, "panah berada di luar bulatan dua pemain");
    cek(Math.hypot(tl.x + tl.x2 - p1x, tl.y + tl.y2 - p1y) < Math.hypot(tl.x - p1x, tl.y - p1y), "panah mengarah ke pemain kedua");
    cek(objId(t4, "rg-p1").warna === G.W.hijauMuda, "pemain kedua disorot");
  }
  {
    const a = adegan(M, "tepuk-lanjut");
    const t = akhirAdegan(a, 0);
    cekRing(t, "rg", "aturan 6: lingkaran");
    sama(urut(8).map((i) => Number(nilaiId(t, `rg-n${i}`))), kel(3, 24), "delapan pemain menyebut 3 sampai 24");
    const t2 = akhirAdegan(a, 1);
    sama(urut(3).map((i) => Number(nilaiId(t2, `rg-n${i}`))), kel(3, 33).slice(8), "putaran kedua: 27, 30, 33");
    sama(nilaiId(t2, "kt-t0"), "putaran ke-2", "label putaran kedua");
    sama([nilaiId(akhirAdegan(a, 2), "l3-t0"), nilaiId(akhirAdegan(a, 2), "l4-t0")], ["kelipatan 3", "kelipatan lain"], "melanjutkan dengan kelipatan lain");
  }
  // Panduan guru untuk permainan.
  {
    const a = adegan(M, "panduan-permainan");
    const t = akhirAdegan(a, 2);
    const kartu = urut(4).map((i) => objId(t, `rb${i}-k`));
    sama(urut(4).map((i) => Number(nilaiId(t, `rb${i}-t0`))), kel(3, 12), "respons: 3, 6, 9, 12");
    cek(kartu.every((o, i) => i === 0 || o.x - kartu[i - 1].x === 70), "kartu respons berjarak sama");
    for (const i of [0, 1, 2]) {
      const p = objId(t, `rp${i}`);
      hampir(p.x + p.x2, kartu[i + 1].x - 2, 0.01, `panah +3 ke kartu ${i + 2} tepat sebelum kartu`);
      sama(nilaiId(t, `rt${i}`), "+3", "tanda tambah tiga");
    }
    const t4 = akhirAdegan(a, 3);
    sama(urut(5).map((i) => parsePerkalian(nilaiId(t4, `tb${i}-t0`))), [1, 2, 3, 4, 5].map((n) => [n, 3, n * 3]), "tabel perkalian 3: 1 sampai 5");
    const t5 = akhirAdegan(a, 4);
    cekRing(t5, "rg", "pemenang: lingkaran");
    const [sx, sy] = titik(3);
    hampir(objId(t5, "sx").x, sx, 0.01, "tanda silang tepat di pemain ke-4");
    hampir(objId(t5, "sx").y - 5, sy, 0.01, "tanda silang tepat di pemain ke-4 (y)");
    const [tx, ty] = titik(6);
    hampir(objId(t5, "tr").x, tx, 0.01, "piala tepat di pemain ke-7");
    hampir(objId(t5, "tr").y - 5, ty, 0.01, "piala tepat di pemain ke-7 (y)");
  }
  // Tabel 1 sampai 50 dan arti kelipatan 3.
  {
    const a = adegan(M, "tabel-tiga");
    const t0 = akhirAdegan(a, 0);
    const k0 = kisi(t0, "tb", M3.T50.kolom, M3.T50.x, M3.T50.y, M3.T50.cw, M3.T50.ch, 50);
    sama(berwarna(k0), [], "tabel 1 sampai 50 belum berwarna di awal");
    const t1 = akhirAdegan(a, 1);
    const k1 = kisi(t1, "tb", M3.T50.kolom, M3.T50.x, M3.T50.y, M3.T50.cw, M3.T50.ch, 50);
    sama(berwarna(k1), kel(3, 50), "tabel: yang berwarna tepat kelipatan 3");
    cek(berwarna(k1).every((n) => warnaSel(k1, n) === G.W.karang), "kelipatan 3 berwarna karang");
    sama(nilaiId(t1, "jm"), `ada ${kel(3, 50).length} bilangan kelipatan 3`, "jumlah kelipatan 3 sampai 50");
    const t2 = akhirAdegan(a, 2);
    sama([1, 2, 3, 4].map((i) => parsePerkalian(nilaiId(t2, `e${i}-t0`))), [1, 2, 3, 4].map((n) => [n, 3, n * 3]), "contoh 1 x 3 sampai 4 x 3");
    cek(nilaiId(t2, "rl-t0").includes("bilangan bulat × 3"), "kelipatan 3 adalah bilangan bulat dikali 3");
    sama(parsePerkalian(nilaiId(akhirAdegan(a, 3), "nl-t0")), [0, 3, 0], "nol kali tiga sama dengan nol");
    cek(kel(3, 50)[0] === 3 && !kel(3, 50).includes(0), "0 tidak termasuk kelipatan 3");
  }
  // Kelipatan 7 pada tabel 1 sampai 100.
  {
    const a = adegan(M, "berlatih-tujuh");
    const k0 = kisi(akhirAdegan(a, 0), "g7", M3.T100.kolom, M3.T100.x, M3.T100.y, M3.T100.cw, M3.T100.ch, 100);
    sama(berwarna(k0), [], "tabel 100 untuk kelipatan 7 belum berwarna di awal");
    sama(berwarna(kisi(akhirAdegan(a, 1), "g7", M3.T100.kolom, M3.T100.x, M3.T100.y, M3.T100.cw, M3.T100.ch, 100)), kel(7, 49), "tujuh kelipatan 7 pertama");
    const t2 = akhirAdegan(a, 2);
    sama(berwarna(kisi(t2, "g7", M3.T100.kolom, M3.T100.x, M3.T100.y, M3.T100.cw, M3.T100.ch, 100)), kel(7, 100), "empat belas kelipatan 7 sampai 100");
    sama(nilaiId(t2, "jm"), `${kel(7, 100).length} bilangan`, "banyak kelipatan 7");
    const t3 = akhirAdegan(a, 3);
    const pasangan = [[7, 14], [14, 21], [35, 42], [56, 63], [77, 84], [84, 91]];
    pasangan.forEach(([p, q], i) => {
      cek(p % 7 === 0 && q - p === 7, `panah langkah kuda ${p} ke ${q}: selisih 7`);
      const [ax, ay] = pusat(M3.T100.x, M3.T100.y, M3.T100.cw, M3.T100.ch, M3.T100.kolom, p);
      const [bx, by] = pusat(M3.T100.x, M3.T100.y, M3.T100.cw, M3.T100.ch, M3.T100.kolom, q);
      sama([Math.round((bx - ax) / M3.T100.cw), Math.round((by - ay) / M3.T100.ch)], [-3, 1], `langkah ${p} ke ${q}: turun satu baris, tiga kotak ke kiri`);
      cekPanahSel(objId(t3, `ar${i}`), M3.T100.x, M3.T100.y, M3.T100.cw, M3.T100.ch, M3.T100.kolom, p, q, "langkah kuda kelipatan 7");
    });
  }
  // Kelipatan 9: kunci buku berhenti di 81.
  {
    const a = adegan(M, "berlatih-sembilan");
    const k0 = kisi(akhirAdegan(a, 0), "g9", M3.T100.kolom, M3.T100.x, M3.T100.y, M3.T100.cw, M3.T100.ch, 100);
    sama(berwarna(k0), M3.KUNCI_9_BUKU, "kelipatan 9 menurut kunci buku (9 sampai 81)");
    const t1 = akhirAdegan(a, 1);
    const k1 = kisi(t1, "g9", M3.T100.kolom, M3.T100.x, M3.T100.y, M3.T100.cw, M3.T100.ch, 100);
    sama(berwarna(k1), kel(9, 100), "kelipatan 9 lengkap setelah 90 dan 99 ditambahkan");
    cek([90, 99].every((n) => warnaSel(k1, n) === G.W.hijau) && M3.KUNCI_9_BUKU.every((n) => warnaSel(k1, n) === G.W.karang), "90 dan 99 berwarna hijau (catatan guru), sisanya karang");
    sama([parsePerkalian(nilaiId(t1, "q1")), parsePerkalian(nilaiId(t1, "q2"))], [[9, 10, 90], [9, 11, 99]], "9 kali 10 dan 9 kali 11");
    sama(nilaiId(akhirAdegan(a, 2), "jm"), `${kel(9, 100).length} bilangan`, "sebelas kelipatan 9");
    const t3 = akhirAdegan(a, 3);
    urut(8).forEach((i) => {
      const [p, q] = [M3.KUNCI_9_BUKU[i], M3.KUNCI_9_BUKU[i + 1]];
      const [ax, ay] = pusat(M3.T100.x, M3.T100.y, M3.T100.cw, M3.T100.ch, M3.T100.kolom, p);
      const [bx, by] = pusat(M3.T100.x, M3.T100.y, M3.T100.cw, M3.T100.ch, M3.T100.kolom, q);
      sama([Math.round((bx - ax) / M3.T100.cw), Math.round((by - ay) / M3.T100.ch)], [-1, 1], `diagonal ${p} ke ${q}: turun satu baris, satu kotak ke kiri`);
      cekPanahSel(objId(t3, `da${i}`), M3.T100.x, M3.T100.y, M3.T100.cw, M3.T100.ch, M3.T100.kolom, p, q, "diagonal kelipatan 9");
    });
  }
  // Kelipatan 6 dan 8 (nomor 2 dan 3) beserta kunci.
  {
    const a = adegan(M, "berlatih-enam-delapan");
    const deret = (t, id, n) => urut(n).map((i) => Number(nilaiId(t, `${id}-a${i}`)));
    const jarak = (t, id, n) => urut(n).map((i) => objId(t, `${id}-b${i}`).x);
    const t0 = akhirAdegan(a, 0);
    sama(deret(t0, "e6", 5), kel(6, 30), "nomor 2: lima kelipatan 6");
    cek(deret(t0, "e6", 5).length >= 5, "nomor 2: paling sedikit lima bilangan");
    cek(jarak(t0, "e6", 5).every((x, i, s) => i === 0 || x - s[i - 1] === 56), "nomor 2: kotak berjarak sama");
    const t1 = akhirAdegan(a, 1);
    sama(deret(t1, "kc", 7), kel(6, 48).slice(1), "kunci nomor 2: 12 sampai 48");
    cek(deret(t1, "kc", 7).every((n) => n % 6 === 0), "kunci nomor 2: semuanya kelipatan 6");
    const t2 = akhirAdegan(a, 2);
    sama(deret(t2, "e8", 5), kel(8, 40), "nomor 3: lima kelipatan 8");
    const t3 = akhirAdegan(a, 3);
    sama(deret(t3, "k8", 7), kel(8, 56), "kunci nomor 3: 8 sampai 56");
    cek(deret(t3, "k8", 7).every((n) => n % 8 === 0), "kunci nomor 3: semuanya kelipatan 8");
    cek(jarak(t3, "k8", 7).every((x, i, s) => i === 0 || x - s[i - 1] === 40), "kunci nomor 3: kotak berjarak sama");
  }
  // Penutup.
  {
    const a = adegan(M, "penutup-guru");
    sama([nilaiId(akhirAdegan(a, 0), "rf-t0"), nilaiId(akhirAdegan(a, 0), "rf-t1")], ["Aku dapat menentukan", "kelipatan suatu bilangan."], "refleksi nomor 1");
    sama(nilaiId(akhirAdegan(a, 3), "n1-t0").includes("81") && nilaiId(akhirAdegan(a, 3), "n1-t1").includes("99"), true, "catatan kunci kelipatan 9: sampai 81, seharusnya sampai 99");
    cek(9 * 9 === 81 && 9 * 11 === 99, "81 dan 99 adalah kelipatan 9 ke-9 dan ke-11");
  }
}

/* ------------------------------ Metode luar: hitungan isi dan geometri ------------------------------ */
const T2 = (id, ke) => akhirAdegan(adegan(U, id), ke);
{
  const gl = (g) => [g.x0, g.y, g.satuan, g.maks, g.langkah];
  // Skip Counting: lompat 3 dari nol.
  {
    const t = T2("luar-lompat", 2);
    cekGarisLompat(t, "sk", ...gl(LU1.GL3), "garis lompat 3");
    const nilaiPendaratan = [1, 2, 3].map((i) => cekLompatan(t, "sk", LU1.GL3.x0, LU1.GL3.y, LU1.GL3.satuan, LU1.GL3.langkah, i, "lompat 3"));
    sama(nilaiPendaratan, kel(3, 9), "pendaratan 3, 6, 9 di lompat 3");
    const t4 = T2("luar-lompat", 3);
    sama(cekLompatan(t4, "sk", LU1.GL3.x0, LU1.GL3.y, LU1.GL3.satuan, LU1.GL3.langkah, 4, "lompat 3 ke-4"), 12, "pendaratan keempat di 12");
    sama(parsePerkalian(nilaiId(t4, "eq")), [4, 3, 12], "4 kali 3 sama dengan 12");
    sama([1, 2, 3, 4].map((i) => nilaiId(t4, `or${i}`)), ["1", "2", "3", "4"], "nomor pendaratan");
    cek([1, 2, 3, 4].every((i) => objId(t4, `or${i}`).x === objId(t4, `sk-m${i}`).x), "nomor pendaratan tepat di atas titiknya");
    const t5 = T2("luar-lompat", 4);
    cek(nilaiId(t5, "nl").startsWith("nol =") && !kel(3, 30).includes(0), "nol hanya titik mulai");
  }
  // Skip Counting pada nomor 2 dan 3.
  {
    const t = T2("luar-lompat-terapan", 3);
    cekGarisLompat(t, "sg", ...gl(LU1.GL6), "garis lompat 6");
    cekGarisLompat(t, "sh", ...gl(LU1.GL8), "garis lompat 8");
    sama([1, 2, 3, 4, 5].map((i) => cekLompatan(t, "sg", LU1.GL6.x0, LU1.GL6.y, LU1.GL6.satuan, LU1.GL6.langkah, i, "lompat 6")), kel(6, 30), "pendaratan kelipatan 6");
    sama([1, 2, 3, 4, 5].map((i) => cekLompatan(t, "sh", LU1.GL8.x0, LU1.GL8.y, LU1.GL8.satuan, LU1.GL8.langkah, i, "lompat 8")), kel(8, 40), "pendaratan kelipatan 8");
    sama([parsePerkalian(nilaiId(t, "q6")), parsePerkalian(nilaiId(t, "q8"))], [[5, 6, 30], [5, 8, 40]], "lima kali enam dan lima kali delapan");
  }
  // Hundred Chart: kelipatan 5.
  {
    const t1 = T2("luar-seratus", 1);
    const k1 = kisi(t1, "hc", LU1.HC.kolom, LU1.HC.x, LU1.HC.y, LU1.HC.cw, LU1.HC.ch, 100);
    sama(berwarna(k1), kel(5, 100), "tabel seratus: kelipatan 5");
    cek(berwarna(k1).every((n) => [4, 9].includes((n - 1) % 10)), "kelipatan 5 jatuh di kolom 5 dan kolom 10");
    cek(kel(5, 100).length === 20, "20 kelipatan 5 sampai 100");
    const t2 = T2("luar-seratus", 2);
    sama([objId(t2, "kc5").x, objId(t2, "kc10").x], [LU1.HC.x + 4 * LU1.HC.cw, LU1.HC.x + 9 * LU1.HC.cw], "kolom 5 dan kolom 10 dibingkai tepat");
    sama([objId(t2, "kc5").h, objId(t2, "kc10").h], [LU1.HC.ch * 10, LU1.HC.ch * 10], "bingkai kolom setinggi sepuluh baris");
  }
  // Hundred Chart: kelipatan 7 dan 9.
  {
    const a = adegan(U, "luar-seratus-terapan");
    const t0 = akhirAdegan(a, 0);
    sama(berwarna(kisi(t0, "h7", LU1.HC.kolom, LU1.HC.x, LU1.HC.y, LU1.HC.cw, LU1.HC.ch, 100)), kel(7, 100), "tabel seratus: kelipatan 7");
    const t1 = akhirAdegan(a, 1);
    [[7, 14], [14, 21], [35, 42], [56, 63], [77, 84], [84, 91]].forEach(([p, q], i) => cekPanahSel(objId(t1, `ar${i}`), LU1.HC.x, LU1.HC.y, LU1.HC.cw, LU1.HC.ch, LU1.HC.kolom, p, q, "luar: langkah kuda"));
    const t2 = akhirAdegan(a, 2);
    sama(berwarna(kisi(t2, "h9", LU1.HC.kolom, LU1.HC.x, LU1.HC.y, LU1.HC.cw, LU1.HC.ch, 100)), kel(9, 100), "tabel seratus: kelipatan 9 (sebelas)");
    const t3 = akhirAdegan(a, 3);
    const k3 = kisi(t3, "h9", LU1.HC.kolom, LU1.HC.x, LU1.HC.y, LU1.HC.cw, LU1.HC.ch, 100);
    cek([90, 99].every((n) => warnaSel(k3, n) === G.W.hijau), "90 dan 99 diberi warna hijau");
    urut(8).forEach((i) => cekPanahSel(objId(t3, `da${i}`), LU1.HC.x, LU1.HC.y, LU1.HC.cw, LU1.HC.ch, LU1.HC.kolom, kel(9, 100)[i], kel(9, 100)[i + 1], "luar: diagonal kelipatan 9"));
    const t4 = akhirAdegan(a, 4);
    sama([objId(t4, "br7").w / 12, objId(t4, "br9").w / 12], [kel(7, 100).length, kel(9, 100).length], "panjang batang sebanding banyak kelipatan");
    sama([nilaiId(t4, "bt7"), nilaiId(t4, "bt9")], ["14 bilangan", "11 bilangan"], "banyak kelipatan 7 dan 9");
  }
  // Divisibility Check.
  {
    const t = T2("luar-cek", 2);
    sama(urut(5).map((i) => nilaiId(t, `r${["2", "5", "10", "3", "9"][i]}-t0`)), ["kelipatan 2: satuan 0, 2, 4, 6, atau 8", "kelipatan 5: satuan 0 atau 5", "kelipatan 10: satuan 0", "kelipatan 3: jumlah angka kelipatan 3", "kelipatan 9: jumlah angka kelipatan 9"], "lima aturan cek habis dibagi");
    const t4 = T2("luar-cek", 3);
    sama(nilaiId(t4, "c1"), "1 + 2 = 3", "jumlah angka 12");
    cek(jumlahAngka(12) === 3 && 12 % 3 === 0, "12 kelipatan 3 (jumlah angka 3)");
    const t5 = T2("luar-cek", 4);
    sama(parsePerkalian(nilaiId(t5, "e6-t0").replace(/^(\d+) = (\d+) × (\d+)$/, "$2 × $3 = $1")), [2, 3, 6], "6 sama dengan 2 kali 3");
  }
  {
    const a = adegan(U, "luar-cek-terapan");
    const uji = [["u54", 0, 54, 9], ["u72", 1, 72, 9], ["u81", 1, 81, 9], ["u90", 2, 90, 9], ["u99", 2, 99, 9], ["u82", 3, 82, 9], ["u30", 4, 30, 6]];
    for (const [id, ke, n, pembagi] of uji) {
      const t = akhirAdegan(a, ke);
      sama(Number(nilaiId(t, `${id}-n-t0`)), n, `uji ${n}: bilangan`);
      const j = parseJumlah(nilaiId(t, `${id}-e`));
      cek(j !== null && j[0] + j[1] === j[2], `uji ${n}: jumlah angka ${nilaiId(t, `${id}-e`)} benar`);
      cek(j !== null && j[2] === jumlahAngka(n) && String(n).split("").map(Number).join() === [j[0], j[1]].join(), `uji ${n}: angka-angkanya ${j}`);
      const lolos = pembagi === 9 ? jumlahAngka(n) % 9 === 0 : n % 2 === 0 && jumlahAngka(n) % 3 === 0;
      const tanda = nilaiId(t, `${id}-h`);
      cek(lolos === (tanda === "✔") && lolos === (n % pembagi === 0), `uji ${n}: lolos ${lolos} sesuai ${tanda} dan n % ${pembagi}`);
    }
  }
  // Last Digit Pattern.
  {
    const t = T2("luar-satuan", 1);
    sama(urut(10).map((i) => Number(nilaiId(t, `at-a${i}`))), kel(3, 30), "baris kelipatan 3");
    sama(urut(10).map((i) => Number(nilaiId(t, `bt-a${i}`))), kel(3, 30).map((n) => n % 10), "baris angka satuan kelipatan 3");
    cek(urut(10).every((i) => objId(t, `at-b${i}`).x === 10 + i * 28 && objId(t, `bt-b${i}`).x === 10 + i * 28), "dua baris kotak sejajar kolomnya");
    const t3 = T2("luar-satuan", 2);
    sama(nilaiId(t3, "p1-t0"), kel(3, 30).map((n) => n % 10).join(" "), "sepuluh satuan pertama");
    sama(nilaiId(t3, "p2-t0"), kel(3, 30).map((n) => n % 10).join(" ") + " ...", "satuan berulang");
    const t4 = T2("luar-satuan", 3);
    sama([nilaiId(t4, "g7-t0"), nilaiId(t4, "g0-t0"), nilaiId(t4, "g3-t0")], kel(3, 33).map((n) => String(n % 10)).slice(8), "setelah satuan 7: 0 lalu 3");
  }
  {
    const a = adegan(U, "luar-satuan-terapan");
    const t = akhirAdegan(a, 2);
    const n9 = urut(10).map((i) => Number(nilaiId(t, `kn-a${i}`)));
    const sa = urut(10).map((i) => Number(nilaiId(t, `sa-a${i}`)));
    const pu = urut(10).map((i) => Number(nilaiId(t, `pu-a${i}`)));
    sama(n9, kel(9, 90), "baris kelipatan 9 sampai 90");
    sama(sa, n9.map((n) => n % 10), "satuan tiap kelipatan 9");
    sama(pu, n9.map((n) => Math.floor(n / 10)), "puluhan tiap kelipatan 9");
    cek(sa.every((s, i) => s + pu[i] === 9 && pu[i] * 10 + s === n9[i]), "puluhan dan satuan: jumlah 9 dan membentuk bilangannya");
    const t3 = akhirAdegan(a, 3);
    sama([nilaiId(t3, "j1"), nilaiId(t3, "j2"), nilaiId(t3, "j3")].map((e) => parseJumlah(e)), [[0, 9, 9], [1, 8, 9], [2, 7, 9]], "tiga contoh jumlah puluhan dan satuan");
    const t4 = akhirAdegan(a, 4);
    sama([nilaiId(t4, "w1-t0"), nilaiId(t4, "w2-t0"), nilaiId(t4, "w2-t1")], ["90", "99", "satuan 9"], "setelah 90 menjadi 99");
    cek(99 % 10 === 9 && kel(9, 100).length === 11, "99 berakhir 9 dan ada 11 kelipatan 9 sampai 100");
  }
  // Ringkasan.
  {
    const t2 = T2("luar-ringkas", 1);
    sama(urut(5).map((i) => Number(nilaiId(t2, `h6-a${i}`))), kel(6, 30), "ringkasan kelipatan 6");
    sama(urut(5).map((i) => Number(nilaiId(t2, `h8-a${i}`))), kel(8, 40), "ringkasan kelipatan 8");
    const t3 = T2("luar-ringkas", 2);
    sama([nilaiId(t3, "b7-t0"), nilaiId(t3, "b9-t0")], [`kelipatan 7: ${kel(7, 100).length} bilangan`, `kelipatan 9: ${kel(9, 100).length} bilangan`], "ringkasan banyak kelipatan 7 dan 9");
    const t4 = T2("luar-ringkas", 3);
    sama([1, 2, 3].map((i) => parsePerkalian(nilaiId(t4, `i${i}-t0`))), [[1, 9, 9], [2, 9, 18], [3, 9, 27]], "ringkasan hasil kali dengan 9");
  }
}

/* ------------------------------ Kutipan buku (bila PDF tersedia) ------------------------------ */
{
  const bs = new URL("../bahan-sd/Matematika-BS-KLS-V.pdf", import.meta.url);
  const bg = new URL("../bahan-sd/Matematika-BG-KLS-V.pdf", import.meta.url);
  const jalur = (u) => u.pathname.replace(/^\/([A-Za-z]:)/, "$1");
  const ambil = (berkas, dari, sampai) => {
    const r = spawnSync("pdftotext", ["-enc", "UTF-8", "-f", String(dari), "-l", String(sampai), "-raw", jalur(berkas), "-"], { encoding: "utf8", maxBuffer: 1 << 26 });
    return r.status === 0 ? r.stdout : null;
  };
  // Buku Siswa hlm. 29-37 = PDF 45-53 (dan Refleksi hlm. 60 = PDF 76); Panduan Guru hlm. 43-51 = PDF 55-63.
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 45, 53), ambil(bs, 76, 76), ambil(bg, 55, 63)] : [null];
  if (bagian.some((b) => b === null)) console.log("PDF atau pdftotext tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const buku = bersih(bagian.join("\n"));
    let n = 0;
    for (const a of M.adegan) {
      for (const kt of a.kutipan ?? []) {
        n += 1;
        cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
      }
    }
    cek(n >= 60, `jumlah kutipan buku yang diperiksa (${n})`);
    cek(M.adegan.every((a) => (a.kutipan ?? []).length >= 5), "tiap adegan materi memuat paling sedikit 5 kutipan buku");
    // Subbab A tidak memuat butir subbab B pada rentang halaman yang dipakai (Buku Siswa berhenti sebelum "B. Kelipatan Persekutuan").
    cek(!/b\. kelipatan persekutuan/.test(bersih(bagian[0])), "Buku Siswa PDF 45-53 tidak memuat subbab B");
    // Tiga keganjilan buku yang dicatat di video: duplikat kata "kelipatan kelipatan" (hlm. 34), ejaan "Erasthotenes" di kata kunci (hlm. 30), dan kunci kelipatan 9 yang berhenti di 81.
    cek(bersih(bagian[0]).includes("bilangan kelipatan kelipatan 3 secara berurutan"), "buku memang menulis 'kelipatan kelipatan 3' (duplikat kata)");
    cek(bersih(bagian[0]).includes("erasthotenes"), "buku memang menulis 'Erasthotenes' di kata kunci");
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k5b2a-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k5b2a-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k5b2a sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k5b2a.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_A52|video-k4b2-umum|naskah-k5b2/.test(pembungkus) && /VIDEO_MATERI_K5B2A/.test(pembungkus) && /VIDEO_LUAR_K5B2A/.test(pembungkus) && /export function VideoK5B2A/.test(pembungkus) && /DaftarVideoCerita/.test(pembungkus) && /keVideoSiap/.test(pembungkus), "video-k5b2a: memakai dua video baru, bukan naskah lama");
  cek(!/\r/.test(pembungkus), "video-k5b2a.tsx: akhir baris LF");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.sel} sel kisi, ${stat.pemain} pemain, ${stat.penanda} penanda garis, ${stat.busur} busur dan panah, ${stat.persamaan} persamaan, ${stat.teksPasang} pasangan teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
