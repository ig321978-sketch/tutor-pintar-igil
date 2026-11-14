// Uji Story Kelas 4 Bab 2 Sub-Bab C (Pecahan Senilai): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar (angka dan bilangan yang diucapkan dengan kata), perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, tidak membocorkan Sub-Bab D dan E (desimal, persen), kutipan buku terhadap teks PDF (pdftotext, atau PyMuPDF bila tidak ada),
// pecahan, batang, kisi, dan dinding pada gambar dihitung ulang dari gambar (jumlah bagian, bagian berarsir, geometri), hitungan mandiri pecahan senilai, FPB, dan kunci Panduan Guru, emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k4b2c.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b2c-video.ts");

const stat = { kutipan: 0, terbilang: 0, teksPasang: 0, persamaan: 0, data: 0, rantai: 0 };
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
const VIDEO = [V.VIDEO_MATERI_K4B2C, V.VIDEO_LUAR_K4B2C];
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
const G = await import("../src/components/modul/story/k4b2c-gambar.ts");
const U1 = await import("../src/components/modul/story/k4b2c-luar-1.ts");
const M = V.VIDEO_MATERI_K4B2C;
const U = V.VIDEO_LUAR_K4B2C;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const nilaiId = (objs, id) => objs.find((o) => o.id === id)?.isi;
const T = (v, id, ke) => akhirAdegan(adegan(v, id), ke);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  const METODE = ["Equivalent Fractions", "Multiply Identity", "Simplify", "Fraction Wall"];
  const NAMA_ID = ["Pecahan Senilai", "Kali dengan Bentuk Satu", "Sederhanakan", "Dinding Pecahan"];
  // "Pecahan Senilai" dan "Sederhanakan" juga istilah buku (judul subbab, "disederhanakan"), jadi hanya nama yang khas metode luar yang dilarang di materi.
  cek(!/Equivalent Fractions|Multiply Identity|Simplify|Fraction Wall|Kali dengan Bentuk Satu|Dinding Pecahan|metode luar|metode dari luar|Van de Walle/i.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of [...METODE, ...NAMA_ID]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE, METODE, "nama metode di berkas luar-1");
  sama(U1.NAMA_METODE_ID, NAMA_ID, "nama Indonesia metode luar");
  cek(M.adegan.every((a) => /(Buku Siswa|Panduan Guru) hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  cek(U.adegan.every((a) => a.sumber.length <= 46), "video metode luar: label sumber cukup pendek untuk kanvas 300 lebar");
  cek(M.adegan.every((a) => a.sumber.length <= 52), "video materi: label sumber cukup pendek untuk kanvas 300 lebar");
  for (const kata of ["Peta konsep", "Kata kunci", "Apersepsi", "Ayo Berlatih", "Ayo Berpikir", "Miskonsepsi", "Diferensiasi", "Refleksi", "Subbab", "Tujuan pembelajaran", "Panduan guru", "Aktivitas"]) cek(!luar.includes(kata), `video metode luar tidak memuat "${kata}" milik materi`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-senilai", "luar-senilai-terapan", "luar-kali", "luar-kali-terapan", "luar-sederhana", "luar-sederhana-terapan", "luar-dinding", "luar-dinding-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[0].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  cek(M.adegan.length === 12 && U.adegan.length === 10, "12 adegan materi dan 10 adegan metode luar");
  // Sub-Bab C tidak membocorkan Sub-Bab D dan E (desimal, persen).
  const BOCOR = /desimal|persen|persepuluhan|perseratusan|koma|uji kompetensi|refleksi|pengayaan|remedial/i;
  for (const a of M.adegan) cek(!BOCOR.test(teksAdegan(a)), `materi ${a.id} tidak membocorkan desimal atau persen`);
  for (const a of U.adegan) cek(!BOCOR.test(teksAdegan(a)), `metode luar ${a.id} tidak membocorkan desimal atau persen`);
  cek(totalKetukan >= 70, `total ketukan cukup dalam (${totalKetukan})`);
  cek(M.adegan.map((a) => a.id).join() === "pengalaman,aktivitas-alat,aktivitas-hasil,amati-coklat,coklat-jawab,tahukah,berpikir,berlatih-satu,berlatih-dua,berlatih-tiga,catatan,diferensiasi", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "luar-pembuka,luar-senilai,luar-senilai-terapan,luar-kali,luar-kali-terapan,luar-sederhana,luar-sederhana-terapan,luar-dinding,luar-dinding-terapan,luar-ringkas", "urutan adegan metode luar");
  // Nama metode baru belum dipakai metode, judul, atau lab lain pada bab ini.
  const baca = (n) => readFileSync(new URL(`../src/components/modul/${n}`, import.meta.url), "utf8");
  for (const n of ["naskah-k4b2.ts", "lab-pecahan-k4b2a.ts", "lab-batang-k4b2b.ts", "lab-senilai-k4b2c.ts", "lab-desimal-k4b2d.ts", "lab-persen-k4b2e.ts"]) {
    const s = baca(n);
    cek(!/Fraction Wall|Dinding Pecahan/.test(s), `nama metode baru tidak bentrok dengan ${n}`);
  }
  const naskah = baca("naskah-k4b2.ts");
  cek(/Equivalent Fractions/.test(naskah) && /Multiply Identity/.test(naskah) && /"Simplify"/.test(naskah), "tiga nama metode lama sama dengan nama di naskah bab");
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

/* ------------------------------ Pecahan, batang, kisi, dan dinding pada gambar dihitung ulang ------------------------------ */
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const faktor = (n) => Array.from({ length: n }, (_, i) => i + 1).filter((d) => n % d === 0);
const PUTIH = "#FFFFFF";
const ada = (objs, id) => objs.some((o) => o.id === id);
/** Pecahan bertumpuk pada gambar: pembilang dan penyebut dibaca dari teks `${id}-p` dan `${id}-q`. */
const frac = (objs, id) => [Number(nilaiId(objs, `${id}-p`)), Number(nilaiId(objs, `${id}-q`))];
const nilaiFrac = ([p, q]) => p / q;
const silang = (a, b) => a[0] * b[1] === b[0] * a[1];
const sel = (objs, id) => objs.filter((o) => new RegExp(`^${id}-c\\d+$`).test(o.id)).sort((a, b) => Number(a.id.split("-c")[1]) - Number(b.id.split("-c")[1]));
/** Batang: banyak sel, sel berarsir (bukan putih), lebar sel sama, rapat berurutan, dan lebar total. */
const batangSah = (objs, id, kosong = PUTIH) => {
  const c = sel(objs, id);
  if (!c.length) return null;
  const w = c[0].w;
  const rapat = c.every((o, i) => Math.abs(o.x - (c[0].x + i * w)) < 1e-6 && Math.abs(o.w - w) < 1e-6 && o.y === c[0].y && o.h === c[0].h);
  return { n: c.length, arsir: c.filter((o) => o.warna !== kosong).length, rapat, total: c.length * w, x0: c[0].x };
};
const bagianBatang = (b) => b.arsir / b.n;
/** Kisi: banyak sel, sel berarsir, ukuran bingkai, dan letak sel berarsir (kolom dan baris). */
const kisiSah = (objs, id, kol, baris) => {
  const c = sel(objs, id);
  if (c.length !== kol * baris) return null;
  const cw = c[0].w;
  const ch = c[0].h;
  const x0 = c[0].x;
  const y0 = c[0].y;
  const tepat = c.every((o, i) => Math.abs(o.x - (x0 + (i % kol) * cw)) < 1e-6 && Math.abs(o.y - (y0 + Math.floor(i / kol) * ch)) < 1e-6 && o.w === cw && o.h === ch);
  return { tepat, lebar: kol * cw, tinggi: baris * ch, arsir: c.filter((o) => o.warna !== PUTIH).map((o) => [Math.round((o.x - x0) / cw), Math.round((o.y - y0) / ch)]) };
};
const luasKotak = (o) => o.w * o.h;
const teksLepas = (objs) => objs.filter((o) => o.t === "teks" && o.isi).map((o) => o.isi);

{
  // Data buku (dibaca dari gambar PDF) ditulis ulang di sini sebagai pembanding mandiri.
  const KERTAS = [[1, 4], [4, 16]];
  const LATIHAN = [{ kiri: [2, 4], kanan: [1, 2] }, { kiri: [2, 6], kanan: [1, 3] }, { kiri: [3, 9], kanan: [1, 3] }];
  const CONTOH = [[1, 2], [2, 4], [3, 6]];
  sama(G.KERTAS, KERTAS, "data kertas Aktivitas 2 (1 dari 4, 4 dari 16)");
  sama(G.COKLAT.bagian, [6, 3], "data coklat: 6 bagian dan 3 bagian");
  sama(G.COKLAT.putu, [[2, 6], [1, 3]], "data coklat: bagian Putu 2/6 dan 1/3");
  sama(G.LATIHAN, LATIHAN, "data Ayo Berlatih 1 sampai 3");
  sama(G.CONTOH_BERPIKIR, CONTOH, "data contoh jawaban Ayo Berpikir");
  sama(G.LEBAR_DINDING, 216, "lebar dinding 216");
  cek(G.LAPIS_DINDING.every((n) => 216 % n === 0), "lebar dinding habis dibagi semua penyebut lapis");
  // Kunci Panduan Guru hlm. 102-103 dan 1/4 = 4/16 (hlm. 101) dihitung mandiri: pecahan senilai dan FPB.
  for (const l of LATIHAN) {
    cek(silang(l.kiri, l.kanan), `kunci ${l.kiri.join("/")} = ${l.kanan.join("/")} benar menurut hitungan silang`);
    const f = gcd(l.kiri[0], l.kiri[1]);
    sama([l.kiri[0] / f, l.kiri[1] / f], l.kanan, `kunci ${l.kiri.join("/")}: dibagi FPB ${f} menghasilkan pecahan kanan`);
    stat.data += 1;
  }
  sama(LATIHAN.map((l) => gcd(l.kiri[0], l.kiri[1])), [2, 2, 3], "FPB soal 1 sampai 3: 2, 2, 3");
  cek(silang(KERTAS[0], KERTAS[1]) && gcd(4, 16) === 4, "1/4 = 4/16 benar, FPB 4 dan 16 adalah 4");
  cek(silang([2, 6], [1, 3]) && silang([1, 2], [2, 4]) && silang([1, 2], [3, 6]), "contoh jawaban 1/2 = 2/4 = 3/6 dan 2/6 = 1/3 benar");
  cek(!silang([1, 3], [2, 4]), "1/3 tidak senilai 2/4 (miskonsepsi tambah bilangan sama)");
  sama([1 * 4, 2 * 3], [4, 6], "silang 1/3 dan 2/4: 4 lawan 6");

  /* ----- Aktivitas 2 ----- */
  {
    const a3 = T(M, "aktivitas-alat", 2);
    const g = kisiSah(a3, "k1", 2, 2);
    cek(g && g.tepat && g.arsir.length === 1, "aktivitas: kertas 1 berisi 4 sel, 1 diwarnai");
    const a4 = T(M, "aktivitas-alat", 3);
    const g1 = kisiSah(a4, "k1", 2, 2);
    const g2 = kisiSah(a4, "k2", 4, 4);
    cek(g1 && g2 && g1.tepat && g2.tepat, "aktivitas: kertas 1 (2 kali 2) dan kertas 2 (4 kali 4) berupa kisi rapi");
    cek(g1.arsir.length === 1 && g2.arsir.length === 4, "aktivitas: 1 sel dan 4 sel diwarnai");
    cek(g1.lebar === g2.lebar && g1.tinggi === g2.tinggi, "aktivitas: kedua kertas sama ukuran");
    const luas1 = sel(a4, "k1").filter((o) => o.warna !== PUTIH).reduce((t, o) => t + luasKotak(o), 0) / (g1.lebar * g1.tinggi);
    const luas2 = sel(a4, "k2").filter((o) => o.warna !== PUTIH).reduce((t, o) => t + luasKotak(o), 0) / (g2.lebar * g2.tinggi);
    cek(Math.abs(luas1 - 0.25) < 1e-9 && Math.abs(luas2 - 0.25) < 1e-9, "aktivitas: luas diwarnai sama-sama seperempat kertas (1/4 = 4/16)");
    sama(g2.arsir.map(([c, r]) => `${c},${r}`).sort(), ["0,0", "0,1", "1,0", "1,1"], "aktivitas: empat sel kecil membentuk blok 2 kali 2 di pojok");
    const h1 = T(M, "aktivitas-hasil", 0);
    const besar = luasKotak(h1.find((o) => o.id === "pa"));
    const kecil = [0, 1, 2, 3].map((i) => luasKotak(h1.find((o) => o.id === `pb${i}`))).reduce((t, v) => t + v, 0);
    sama(besar, kecil, "aktivitas: satu potong besar sama luas dengan empat potong kecil");
    const h2 = T(M, "aktivitas-hasil", 1);
    sama([frac(h2, "f1"), frac(h2, "f2")], KERTAS, "diskusi a: 1/4 dan 4/16 pada gambar");
    const h3 = T(M, "aktivitas-hasil", 2);
    const xs = [0, 1, 2, 3].map((i) => h3.find((o) => o.id === `pb${i}`));
    const lebarBlok = Math.max(...xs.map((o) => o.x + o.w)) - Math.min(...xs.map((o) => o.x));
    const tinggiBlok = Math.max(...xs.map((o) => o.y + o.h)) - Math.min(...xs.map((o) => o.y));
    const pa = h3.find((o) => o.id === "pa");
    cek(lebarBlok === pa.w && tinggiBlok === pa.h, "diskusi b: empat potong kecil tersusun persis sebesar satu potong besar");
    const h5 = T(M, "aktivitas-hasil", 4);
    cek(silang(frac(h5, "m1"), frac(h5, "m3")) && frac(h5, "m1").join() === "1,4" && frac(h5, "m3").join() === "4,16", "kesimpulan: 1/4 dan 4/16 senilai");
    stat.data += 1;
  }

  /* ----- Coklat ----- */
  {
    const c0 = T(M, "amati-coklat", 0);
    const b1 = batangSah(c0, "c1");
    const b2 = batangSah(c0, "c2");
    cek(b1.n === 6 && b2.n === 3 && b1.rapat && b2.rapat && Math.abs(b1.total - b2.total) < 1e-6, "coklat: batang pertama 6 bagian, kedua 3 bagian, sama panjang");
    const c1 = T(M, "amati-coklat", 1);
    const warna1 = sel(c1, "c1").map((o) => o.warna);
    cek([0, 1, 2].every((a) => warna1[a * 2] === warna1[a * 2 + 1]) && new Set(warna1).size === 3, "coklat 1: tiga anak masing-masing dua bagian (6 : 3 = 2)");
    const c2 = T(M, "amati-coklat", 2);
    const warna2 = sel(c2, "c2").map((o) => o.warna);
    sama(warna2, [warna1[0], warna1[2], warna1[4]], "coklat 2: tiga anak masing-masing satu bagian, warna sama dengan coklat 1");
    const lebarPutu1 = sel(c2, "c1")[0].w * 2;
    sama(Math.round(lebarPutu1 * 1e6), Math.round(sel(c2, "c2")[0].w * 1e6), "coklat: bagian Putu sama panjang pada kedua batang");
    const c3 = T(M, "amati-coklat", 3);
    sama([frac(c3, "p1"), frac(c3, "p2")], [[2, 6], [1, 3]], "coklat: bagian Putu 2/6 dan 1/3");
    const j = T(M, "coklat-jawab", 1);
    for (const a of [0, 1, 2]) {
      cek(frac(j, `u${a}`).join() === "2,6" && frac(j, `v${a}`).join() === "1,3", `coklat jawab: bagian ${a + 1} bertanda 2/6 dan 1/3`);
    }
    const t1 = T(M, "coklat-jawab", 0);
    const gx = [t1.find((o) => o.id === "g1").x, t1.find((o) => o.id === "g2").x];
    const lb = sel(t1, "c2")[0];
    sama(gx.map((x) => Math.round(x * 10) / 10), [lb.x + lb.w, lb.x + 2 * lb.w].map((x) => Math.round(x * 10) / 10), "coklat jawab: garis putus-putus di sepertiga dan dua pertiga panjang");
    cek(sel(t1, "c1").length === 6 && sel(t1, "c2").length === 3, "coklat jawab: 6 dan 3 potong");
    stat.data += 1;
  }

  /* ----- Tahukah Kalian ----- */
  {
    const x = T(M, "tahukah", 1);
    const x1 = frac(x, "x1");
    const x2 = frac(x, "x2");
    cek(x1.join() === "1,3" && x2.join() === "2,6" && x2[0] === x1[0] * 2 && x2[1] === x1[1] * 2 && silang(x1, x2), "tahukah: 1/3 dikali 2 menjadi 2/6");
    sama(nilaiId(x, "xj-o1"), "×2", "tahukah: label kali dua");
    const y = T(M, "tahukah", 3);
    const y1 = frac(y, "y1");
    const y2 = frac(y, "y2");
    cek(y1.join() === "2,6" && y2.join() === "1,3" && y1[0] === y2[0] * 2 && y1[1] === y2[1] * 2, "tahukah: 2/6 dibagi 2 menjadi 1/3 (buku salah cetak 2/6)");
    sama(nilaiId(y, "yj-o1"), "÷2", "tahukah: label bagi dua");
    cek(ada(y, "yc") && /salah cetak/.test(nilaiId(y, "yc")), "tahukah: salah cetak ditandai");
  }
  /* ----- Ayo Berpikir ----- */
  {
    const b = T(M, "berpikir", 0);
    cek(["bk0", "bk1", "bk2"].every((id) => ada(b, id)) && ["bn0", "bn1", "bn2"].every((id) => nilaiId(b, `${id}-p`) === "..."), "berpikir: tiga kotak gambar dan tiga pecahan kosong");
    const c = T(M, "berpikir", 2);
    for (const [i, [p, q]] of CONTOH.entries()) {
      const bt = batangSah(c, `bb${i}`);
      cek(bt && bt.n === q && bt.arsir === p && bt.rapat, `berpikir: gambar ${i + 1} berarsir ${p} dari ${q}`);
      sama(frac(c, `bf${i}`), [p, q], `berpikir: pecahan gambar ${i + 1}`);
      cek(bagianBatang(bt) === 0.5, `berpikir: gambar ${i + 1} berarsir setengah`);
    }
    cek(sel(c, "bb0")[0].w * 2 === sel(c, "bb1")[0].w * 4 && sel(c, "bb1")[0].w * 4 === sel(c, "bb2")[0].w * 6, "berpikir: ketiga batang sama panjang");
  }
  /* ----- Ayo Berlatih ----- */
  {
    const l0 = T(M, "berlatih-satu", 0);
    const kiri = batangSah(l0, "l1");
    const kanan = batangSah(l0, "r1");
    cek(kiri.n === 4 && kiri.arsir === 2 && kanan.n === 2 && kanan.arsir === 1 && kiri.rapat && kanan.rapat && kiri.total === kanan.total, "nomor 1: kiri 2 dari 4, kanan 1 dari 2, sama panjang");
    const l1 = T(M, "berlatih-satu", 1);
    sama([frac(l1, "fl"), frac(l1, "fr")], [LATIHAN[0].kiri, LATIHAN[0].kanan], "nomor 1: isian 2/4 dan 1/2");
    const l2 = T(M, "berlatih-satu", 2);
    sama([frac(l2, "gl"), frac(l2, "gr")], [LATIHAN[0].kiri, LATIHAN[0].kanan], "nomor 1: hitungan mandiri 2/4 dan 1/2");

    const n0 = T(M, "berlatih-dua", 0);
    const k2 = batangSah(n0, "l2");
    const r2 = batangSah(n0, "r2");
    cek(k2.n === 6 && k2.arsir === 2 && r2.n === 3 && r2.arsir === 1 && k2.rapat && r2.rapat && Math.abs(k2.total - r2.total) < 1e-6, "nomor 2: kiri 2 dari 6, kanan 1 dari 3, sama panjang");
    const n1 = T(M, "berlatih-dua", 1);
    sama([frac(n1, "hl"), frac(n1, "hr")], [LATIHAN[1].kiri, LATIHAN[1].kanan], "nomor 2: isian 2/6 dan 1/3");
    const n2 = T(M, "berlatih-dua", 2);
    const m1 = batangSah(n2, "m1");
    const m2 = batangSah(n2, "m2");
    cek(bagianBatang(m1) === 2 / 6 && bagianBatang(m2) === 1 / 3 && Math.abs(m1.total - m2.total) < 1e-6, "nomor 2: bagian berwarna 2/6 dan 1/3 pada batang sama panjang");
    const berakhirM1 = sel(n2, "m1").filter((o) => o.warna !== PUTIH).at(-1);
    const berakhirM2 = sel(n2, "m2").filter((o) => o.warna !== PUTIH).at(-1);
    cek(Math.abs(berakhirM1.x + berakhirM1.w - (berakhirM2.x + berakhirM2.w)) < 1e-6 && Math.abs(n2.find((o) => o.id === "m3").x - (berakhirM1.x + berakhirM1.w)) < 0.1, "nomor 2: arsir berakhir di garis putus-putus yang sama");
    const n3 = T(M, "berlatih-dua", 3);
    sama([frac(n3, "n1"), frac(n3, "n2")], [LATIHAN[1].kiri, LATIHAN[1].kanan], "nomor 2: hitungan mandiri 2/6 dan 1/3");
    sama(nilaiId(n3, "nj-o1"), "÷2", "nomor 2: dibagi FPB 2");

    const q0 = T(M, "berlatih-tiga", 0);
    const kg = kisiSah(q0, "l3", 3, 3);
    const kr = batangSah(q0, "r3");
    cek(kg && kg.tepat && kg.arsir.length === 3 && kg.arsir.every(([c]) => c === 0), "nomor 3: kisi 3 kali 3, satu kolom (3 kotak) berarsir");
    cek(kr.n === 3 && kr.arsir === 1 && kr.rapat && kr.total === kg.lebar && sel(q0, "r3")[0].h === kg.tinggi, "nomor 3: kanan 1 dari 3 kolom, bangun sama besar dengan kisi");
    const q1 = T(M, "berlatih-tiga", 1);
    sama([frac(q1, "ql"), frac(q1, "qr")], [LATIHAN[2].kiri, LATIHAN[2].kanan], "nomor 3: isian 3/9 dan 1/3");
    const q2 = T(M, "berlatih-tiga", 2);
    sama([frac(q2, "r1"), frac(q2, "r2")], [LATIHAN[2].kiri, LATIHAN[2].kanan], "nomor 3: hitungan mandiri 3/9 dan 1/3");
    sama(nilaiId(q2, "rj-o1"), "÷3", "nomor 3: dibagi FPB 3");
    const q3 = T(M, "berlatih-tiga", 3);
    LATIHAN.forEach((l, i) => {
      const baris = [0, 1, 2, 3].map((c) => nilaiId(q3, `kt${i + 1}-t${c}`));
      sama(baris, [String(i + 1), l.kiri.join("/"), l.kanan.join("/"), `÷${gcd(l.kiri[0], l.kiri[1])}`], `tabel kunci nomor ${i + 1}`);
    });
    const z = T(M, "diferensiasi", 4);
    LATIHAN.forEach((l, i) => {
      const baris = [0, 1, 2, 3].map((c) => nilaiId(z, `zt${i + 1}-t${c}`));
      sama(baris, [String(i + 1), l.kiri.join("/"), l.kanan.join("/"), `÷${gcd(l.kiri[0], l.kiri[1])}`], `tabel kunci akhir nomor ${i + 1}`);
    });
    // Catatan guru.
    const g1 = T(M, "catatan", 0);
    const SILANG = [["2/4 = 1/2", "2 × 2 = 4", "4 × 1 = 4"], ["2/6 = 1/3", "2 × 3 = 6", "6 × 1 = 6"], ["3/9 = 1/3", "3 × 3 = 9", "9 × 1 = 9"]];
    SILANG.forEach((b, i) => sama([0, 1, 2].map((c) => nilaiId(g1, `gt${i + 1}-t${c}`)), b, `catatan: cek silang baris ${i + 1}`));
    const g3 = T(M, "catatan", 2);
    sama([frac(g3, "g5"), frac(g3, "g7")], [[1, 3], [2, 4]], "catatan: 1/3 menjadi 2/4 (tambah satu) pada gambar");
    const g4 = T(M, "catatan", 3);
    const bh4 = batangSah(g4, "h4");
    const bh5 = batangSah(g4, "h5");
    cek(bh4.n === 3 && bh4.arsir === 1 && bh5.n === 4 && bh5.arsir === 2 && bagianBatang(bh4) !== bagianBatang(bh5) && bh4.total === bh5.total, "catatan: 1/3 dan 2/4 berlainan luas pada batang sama panjang");
    sama([nilaiId(g4, "h1"), nilaiId(g4, "h2")], ["1 × 4 = 4", "2 × 3 = 6"], "catatan: cek silang 1/3 dan 2/4");
    const g5 = T(M, "catatan", 4);
    sama([frac(g5, "i2"), frac(g5, "i4")], KERTAS, "catatan: kesimpulan 1/4 = 4/16 pada gambar");
    sama(nilaiId(g5, "i5"), "4 ÷ 4 = 1 dan 16 ÷ 4 = 4", "catatan: hitungan mandiri 4/16 dibagi 4");
    stat.data += 1;
  }

  /* ----- Metode luar ----- */
  {
    const po = T(U, "luar-pembuka", 0);
    sama([frac(po, "po1"), frac(po, "po3")], [[2, 6], [1, 3]], "luar pembuka: 2/6 dan 1/3");
    // Equivalent Fractions.
    const s1 = T(U, "luar-senilai", 0);
    const sa = batangSah(s1, "sa");
    const sb = batangSah(s1, "sb");
    cek(sa.n === 2 && sa.arsir === 1 && sb.n === 4 && sb.arsir === 2 && sa.total === sb.total && bagianBatang(sa) === bagianBatang(sb), "luar senilai: 1 dari 2 dan 2 dari 4 sama panjang");
    sama([frac(s1, "sc"), frac(s1, "sd")], [[1, 2], [2, 4]], "luar senilai: 1/2 dan 2/4");
    const s3 = T(U, "luar-senilai", 2);
    const ta = batangSah(s3, "ta");
    const tb = batangSah(s3, "tb");
    cek(ta.n === 2 && tb.n === 4 && bagianBatang(ta) === bagianBatang(tb) && Math.abs(s3.find((o) => o.id === "tg").x - (ta.x0 + ta.total / 2)) < 1e-6, "luar senilai: garis putus-putus di tengah batang, tempat kedua arsir berakhir");
    const s4 = T(U, "luar-senilai", 3);
    const kel = ["ua", "ub", "uc", "ud"].map((id) => frac(s4, id));
    sama(kel, [[1, 2], [2, 4], [3, 6], [4, 8]], "luar senilai: keluarga 1/2, 2/4, 3/6, 4/8");
    cek(kel.every((f) => nilaiFrac(f) === 0.5), "luar senilai: semua anggota keluarga bernilai setengah");
    const s2 = T(U, "luar-senilai", 1);
    const ka = batangSah(s2, "ka");
    const kb = batangSah(s2, "kb");
    cek(ka.total > kb.total && bagianBatang(ka) === bagianBatang(kb), "luar senilai: setengah kue besar dan kue kecil berlainan ukuran");
    const t1 = T(U, "luar-senilai-terapan", 0);
    const ca = batangSah(t1, "ca", "#8B4A22");
    const cb = batangSah(t1, "cb", "#8B4A22");
    cek(ca.n === 6 && ca.arsir === 2 && cb.n === 3 && cb.arsir === 1 && ca.total === cb.total && Math.abs(bagianBatang(ca) - bagianBatang(cb)) < 1e-9, "luar coklat: 2 dari 6 dan 1 dari 3 sama panjang");
    const garisX = t1.find((o) => o.id === "cg").x;
    cek(Math.abs(garisX - (ca.x0 + (ca.total * 2) / 6)) < 0.1 && Math.abs(garisX - (cb.x0 + cb.total / 3)) < 0.1, "luar coklat: garis putus-putus di ujung arsir kedua batang");
    const t2 = T(U, "luar-senilai-terapan", 1);
    sama([frac(t2, "cc"), frac(t2, "cd")], [[2, 6], [1, 3]], "luar coklat: 2/6 dan 1/3");
    const t3 = T(U, "luar-senilai-terapan", 2);
    const w1 = kisiSah(t3, "w1", 2, 2);
    const w2 = kisiSah(t3, "w2", 4, 4);
    cek(w1 && w2 && w1.tepat && w2.tepat && w1.arsir.length === 1 && w2.arsir.length === 4 && w1.lebar === w2.lebar && w1.tinggi === w2.tinggi, "luar kertas: 1 dari 4 sel dan 4 dari 16 sel pada kertas sama ukuran");
    const t4 = T(U, "luar-senilai-terapan", 3);
    sama([frac(t4, "w4"), frac(t4, "w5")], KERTAS, "luar kertas: 1/4 dan 4/16");
    // Multiply Identity.
    const k1 = T(U, "luar-kali", 0);
    cek([["ka2", 2], ["ka4", 3], ["ka6", 4]].every(([id, n]) => frac(k1, id).join() === `${n},${n}`), "luar kali: 2/2, 3/3, 4/4 adalah bentuk satu");
    const k2 = T(U, "luar-kali", 1);
    const [e1, e3, e5] = [frac(k2, "kb1"), frac(k2, "kb3"), frac(k2, "kb5")];
    cek(e1.join() === "1,5" && e3.join() === "2,2" && e5.join() === "2,10" && e5[0] === e1[0] * e3[0] && e5[1] === e1[1] * e3[1] && silang(e1, e5), "luar kali: 1/5 dikali 2/2 menjadi 2/10");
    const BENTUK = [["ma", 1, 3, 2], ["mb", 1, 2, 2], ["mc", 1, 4, 4], ["md", 1, 3, 3]];
    BENTUK.forEach(([id, p, q, n], i) => {
      const o = T(U, "luar-kali-terapan", i);
      sama([frac(o, `${id}1`), frac(o, `${id}2`)], [[p, q], [p * n, q * n]], `luar kali: ${p}/${q} dikali ${n}/${n}`);
      sama(nilaiId(o, `${id}j-o1`), `×${n}`, `luar kali: label ×${n}`);
      const mk = batangSah(o, `${id}m`);
      const nk = batangSah(o, `${id}n`);
      cek(mk.n === q && mk.arsir === p && nk.n === q * n && nk.arsir === p * n && mk.total === nk.total && Math.abs(bagianBatang(mk) - bagianBatang(nk)) < 1e-9, `luar kali: batang ${p}/${q} dan ${p * n}/${q * n} sama luas`);
    });
    // Simplify.
    const p1 = T(U, "luar-sederhana", 0);
    sama([frac(p1, "pa1"), frac(p1, "pa4")], [[6, 8], [3, 4]], "luar simplify: 6/8 menjadi 3/4");
    cek(gcd(6, 8) === 2 && 6 / 2 === 3 && 8 / 2 === 4 && gcd(3, 4) === 1, "luar simplify: FPB 6 dan 8 adalah 2, hasil 3/4 sudah sederhana");
    const p2 = T(U, "luar-sederhana", 1);
    sama([frac(p2, "pb2"), frac(p2, "pb4")], [[12, 18], [2, 3]], "luar simplify: 12/18 menjadi 2/3");
    cek(gcd(12, 18) === 6 && /= 6$/.test(nilaiId(p2, "pb3")) && 12 / 6 === 2 && 18 / 6 === 3, "luar simplify: FPB 12 dan 18 adalah 6");
    sama(nilaiId(p2, "pbj-o1"), "÷6", "luar simplify: dibagi 6");
    const p3 = T(U, "luar-sederhana", 2);
    const f2 = faktor(2);
    const f6 = faktor(6);
    sama([nilaiId(p3, "pc1-t0"), nilaiId(p3, "pc2-t0")], [`faktor 2: ${f2.join(", ")}`, `faktor 6: ${f6.join(", ")}`], "luar simplify: faktor 2 dan faktor 6");
    sama(f2.filter((d) => f6.includes(d)).join(" dan "), nilaiId(p3, "pc3-t0").replace(/^yang sama: /, ""), "luar simplify: faktor persekutuan 1 dan 2");
    cek(/FPB = 2$/.test(nilaiId(p3, "pc3-t1")) && Math.max(...f2.filter((d) => f6.includes(d))) === 2, "luar simplify: FPB 2 dan 6 adalah 2");
    const p4 = T(U, "luar-sederhana", 3);
    sama(frac(p4, "pd1"), [1, 3], "luar simplify: 1/3 sudah sederhana");
    sama([nilaiId(p4, "pd2-t0"), nilaiId(p4, "pd3-t0")], [`faktor 1: ${faktor(1).join(", ")}`, `faktor 3: ${faktor(3).join(", ")}`], "luar simplify: faktor 1 dan faktor 3");
    cek(gcd(1, 3) === 1, "luar simplify: FPB 1 dan 3 adalah 1");
    const BAGI = [["qa", 2, 4, 2], ["qb", 2, 6, 2], ["qc", 3, 9, 3], ["qd", 4, 16, 4]];
    BAGI.forEach(([id, p, q, n], i) => {
      const o = T(U, "luar-sederhana-terapan", i);
      cek(gcd(p, q) === n, `luar bagi: FPB ${p} dan ${q} adalah ${n}`);
      sama([frac(o, `${id}1`), frac(o, `${id}2`)], [[p, q], [p / n, q / n]], `luar bagi: ${p}/${q} dibagi ${n}`);
      sama(nilaiId(o, `${id}j-o1`), `÷${n}`, `luar bagi: label ÷${n}`);
      sama(nilaiId(o, `${id}f-t0`), `FPB = ${n}`, `luar bagi: kartu FPB ${n}`);
      sama(gcd(p / n, q / n), 1, `luar bagi: hasil ${p / n}/${q / n} sudah sederhana`);
      const mk = batangSah(o, `${id}m`);
      const nk = batangSah(o, `${id}n`);
      cek(mk.n === q && mk.arsir === p && nk.n === q / n && nk.arsir === p / n && mk.total === nk.total && Math.abs(bagianBatang(mk) - bagianBatang(nk)) < 1e-9, `luar bagi: batang ${p}/${q} dan ${p / n}/${q / n} sama luas`);
    });
    // Fraction Wall.
    const LAPIS = [1, 2, 3, 4, 6, 9];
    const d0 = T(U, "luar-dinding", 0);
    const x0 = sel(d0, "dd1")[0].x;
    LAPIS.forEach((n, r) => {
      const b = batangSah(d0, `dd${n}`);
      cek(b && b.n === n && b.rapat && b.arsir === n && b.total === 216 && b.x0 === x0, `dinding: lapis ${n} punya ${n} sel dan lebar 216, rata kiri`);
      cek(sel(d0, `dd${n}`)[0].y === sel(d0, "dd1")[0].y + r * 24, `dinding: lapis ${n} di baris ke-${r + 1}`);
    });
    const ujung = (o) => Math.round((o.x + o.w) * 1e6) / 1e6;
    const sorotLuar = (objs, id) => {
      const o = objs.find((x) => x.id === id);
      const barisY = [34, 58, 82, 106, 130, 154];
      const r = barisY.indexOf(o.y);
      return { n: LAPIS[r], awal: (o.x - x0) / (216 / LAPIS[r]), lebar: o.w, ujung: ujung(o), r };
    };
    const d1 = T(U, "luar-dinding", 1);
    const gx1 = d1.find((o) => o.id === "dg").x;
    const hs1 = sorotLuar(d1, "hs1");
    const hs2 = sorotLuar(d1, "hs2");
    cek(hs1.ujung === gx1 && hs2.ujung === gx1 && hs1.n === 2 && hs2.n === 4 && hs1.lebar / 216 === 1 / 2 && hs2.awal === 1 && hs2.lebar === 216 / 4, "dinding: 1/2 dan 2/4 berujung di garis yang sama (setengah)");
    const d2 = T(U, "luar-dinding", 2);
    const gx2 = d2.find((o) => o.id === "dh").x;
    const ht1 = sorotLuar(d2, "ht1");
    const ht2 = sorotLuar(d2, "ht2");
    cek(ht1.ujung === gx2 && ht2.ujung === gx2 && ht1.n === 3 && ht2.n === 6 && ht1.awal === 0 && ht2.awal === 1 && Math.abs(ht1.lebar / 216 - 1 / 3) < 1e-9 && Math.abs((ht2.lebar * 2) / 216 - 1 / 3) < 1e-9, "dinding: 1/3 dan 2/6 berujung di garis yang sama (sepertiga)");
    cek(d2.every((o) => o.id !== "dg" && o.id !== "hs1"), "dinding: sorotan ketukan sebelumnya sudah dihapus");
    // Dinding terapan: lapis 2, 3, 4, 6, 9 di x = 48, y = 34 + 26 r.
    const LT = [2, 3, 4, 6, 9];
    const y0 = 34;
    const xt = 48;
    const dt = T(U, "luar-dinding-terapan", 0);
    LT.forEach((n, r) => {
      const b = batangSah(dt, `dw${n}`);
      cek(b && b.n === n && b.rapat && b.total === 216 && b.x0 === xt && sel(dt, `dw${n}`)[0].y === y0 + r * 26, `dinding terapan: lapis ${n} punya ${n} sel, lebar 216, di baris ke-${r + 1}`);
    });
    const sorotT = (objs, id) => {
      const o = objs.find((x) => x.id === id);
      const r = (o.y - y0) / 26;
      return { n: LT[r], awal: (o.x - xt) / (216 / LT[r]), banyak: o.w / (216 / LT[r]), ujung: Math.round((o.x + o.w) * 1e6) / 1e6 };
    };
    const BARIS = [["luar-dinding-terapan", 0, "vg", ["v1", "v2"], "2/4 = 1/2"], ["luar-dinding-terapan", 1, "vh", ["v3", "v4"], "2/6 = 1/3"], ["luar-dinding-terapan", 2, "vi", ["v5", "v6"], "3/9 = 1/3"]];
    for (const [adg, ke, gid, [a, b], kartuKunci] of BARIS) {
      const o = T(U, adg, ke);
      const gx = o.find((z) => z.id === gid).x;
      const sa2 = sorotT(o, a);
      const sb2 = sorotT(o, b);
      cek(sa2.ujung === gx && sb2.ujung === gx && sa2.awal === 0 && sb2.awal === 0 && Number.isInteger(sa2.banyak) && Number.isInteger(sb2.banyak), `${adg}#${ke + 1}: kedua sorotan mulai di kiri dan berujung di garis yang sama`);
      cek(Math.abs(sa2.banyak / sa2.n - sb2.banyak / sb2.n) < 1e-9, `${adg}#${ke + 1}: dua sorotan bernilai sama (${kartuKunci})`);
    }
    sama(nilaiId(T(U, "luar-dinding-terapan", 0), "vk-t0"), "2/4 = 1/2", "dinding terapan: kunci nomor 1");
    sama(nilaiId(T(U, "luar-dinding-terapan", 1), "vm-t0"), "2/6 = 1/3", "dinding terapan: kunci nomor 2");
    sama(nilaiId(T(U, "luar-dinding-terapan", 2), "vn-t0"), "3/9 = 1/3", "dinding terapan: kunci nomor 3");
    const o2 = T(U, "luar-dinding-terapan", 1);
    const s3a = sorotT(o2, "v3");
    const s4a = sorotT(o2, "v4");
    sama([s3a.n, s3a.banyak, s4a.n, s4a.banyak], [3, 1, 6, 2], "dinding terapan nomor 2: 1 dari 3 dan 2 dari 6");
    const o3 = T(U, "luar-dinding-terapan", 2);
    sama([sorotT(o3, "v5").n, sorotT(o3, "v5").banyak, sorotT(o3, "v6").n, sorotT(o3, "v6").banyak], [9, 3, 3, 1], "dinding terapan nomor 3: 3 dari 9 dan 1 dari 3");
    const o1 = T(U, "luar-dinding-terapan", 0);
    sama([sorotT(o1, "v1").n, sorotT(o1, "v1").banyak, sorotT(o1, "v2").n, sorotT(o1, "v2").banyak], [2, 1, 4, 2], "dinding terapan nomor 1: 1 dari 2 dan 2 dari 4");
    const o4 = T(U, "luar-dinding-terapan", 3);
    const gx4 = o4.find((z) => z.id === "vj").x;
    const trio = ["v7", "v8", "v9"].map((id) => sorotT(o4, id));
    sama(trio.map((s) => [s.n, s.banyak]), [[2, 1], [4, 2], [6, 3]], "dinding terapan: 1/2, 2/4, 3/6 pada garis tengah");
    cek(trio.every((s) => s.ujung === gx4) && 108 / (216 / 9) === 4.5, "dinding terapan: lapis 9 tidak punya ujung sel di garis tengah (4,5 sel)");
    sama(nilaiId(o4, "vo-t0"), "1/2 = 2/4 = 3/6", "dinding terapan: tiga pecahan senilai");
    // Ringkasan.
    const rr = T(U, "luar-ringkas", 1);
    const PASANG = [["2/4", "1/2"], ["2/6", "1/3"], ["3/9", "1/3"], ["1/4", "4/16"]];
    PASANG.forEach(([a, b], i) => {
      sama(nilaiId(rr, `rt${i + 1}-t1`), `${a} = ${b}`, `ringkasan: pasangan ${i + 1}`);
      cek(silang(a.split("/").map(Number), b.split("/").map(Number)), `ringkasan: ${a} senilai ${b}`);
    });
    sama(PASANG.slice(0, 3).map(([a, b]) => [a.split("/").map(Number), b.split("/").map(Number)]), LATIHAN.map((l) => [l.kiri, l.kanan]), "ringkasan: tiga pasangan pertama sama dengan kunci Latihan");
    stat.data += 1;
  }

  /* ----- Semua rantai pecahan dan hitungan pada teks gambar dihitung ulang ----- */
  for (const v of [M, U]) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        for (const t of teksLepas(T(v, a.id, i))) {
          const rantai = t.match(/^(\d+\/\d+)(?: = (\d+\/\d+))+$/);
          if (rantai) {
            const fs = t.split(" = ").map((s) => s.split("/").map(Number));
            stat.rantai += 1;
            cek(fs.every((f) => silang(f, fs[0])), `${v.id}/${a.id}#${i + 1}: rantai "${t}" senilai semua`);
          }
          const sn = t.match(/(\d+)\/(\d+) senilai (\d+)\/(\d+)/);
          if (sn) {
            stat.rantai += 1;
            cek(silang([+sn[1], +sn[2]], [+sn[3], +sn[4]]), `${v.id}/${a.id}#${i + 1}: "${t}" senilai`);
          }
          for (const m of t.matchAll(/(\d+) ÷ (\d+) = (\d+)/g)) {
            stat.rantai += 1;
            cek(+m[1] / +m[2] === +m[3], `${v.id}/${a.id}#${i + 1}: pembagian "${m[0]}" dihitung ulang`);
          }
          for (const m of t.matchAll(/(\d+) × (\d+) = (\d+)/g)) {
            stat.rantai += 1;
            cek(+m[1] * +m[2] === +m[3], `${v.id}/${a.id}#${i + 1}: perkalian "${m[0]}" dihitung ulang`);
          }
        }
      });
    }
  }
}

/* ------------------------------ Kutipan buku (bila PDF tersedia) ------------------------------ */
{
  const bs = new URL("../bahan-sd/Matematika-BS-KLS-IV.pdf", import.meta.url);
  const bg = new URL("../bahan-sd/Matematika-BG-KLS-IV.pdf", import.meta.url);
  const jalur = (u) => u.pathname.replace(/^\/([A-Za-z]:)/, "$1");
  const KODE_PY = "import sys, pymupdf\nsys.stdout.reconfigure(encoding='utf-8')\nd = pymupdf.open(sys.argv[1])\nsys.stdout.write('\\n'.join(d[i - 1].get_text() for i in range(int(sys.argv[2]), int(sys.argv[3]) + 1)))";
  const ambil = (berkas, dari, sampai) => {
    const r = spawnSync("pdftotext", ["-enc", "UTF-8", "-f", String(dari), "-l", String(sampai), "-raw", jalur(berkas), "-"], { encoding: "utf8", maxBuffer: 1 << 26 });
    if (r.status === 0) return r.stdout;
    // Cadangan bila pdftotext tidak ada: PyMuPDF (python -I).
    const p = spawnSync("python", ["-I", "-c", KODE_PY, jalur(berkas), String(dari), String(sampai)], { encoding: "utf8", maxBuffer: 1 << 26 });
    return p.status === 0 ? p.stdout : null;
  };
  // Kelas IV: Buku Siswa hlm. N = PDF N+12 (hlm. 66-70 = PDF 78-82; subbab D mulai PDF 83); Panduan Guru hlm. N = PDF N+12 (hlm. 100-103 = PDF 112-115; subbab D mulai di PDF 116 setelah akhir Diferensiasi).
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 78, 82), ambil(bg, 112, 116), ambil(bs, 83, 83), ambil(bs, 81, 81), ambil(bs, 82, 82)] : [null];
  if (bagian.some((b) => b === null)) console.log("PDF atau pembaca PDF tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const guruPenuh = bersih(bagian[1]);
    const awalD = guruPenuh.indexOf("d. pecahan desimal persepuluhan dan perseratusan");
    cek(awalD > 0, "Panduan Guru PDF 116 memuat judul subbab D");
    const siswa = bersih(bagian[0]);
    const guru = guruPenuh.slice(0, awalD);
    const buku = `${siswa}\n${guru}`;
    let n = 0;
    for (const a of M.adegan) {
      for (const kt of a.kutipan ?? []) {
        n += 1;
        cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
      }
    }
    stat.kutipan = n;
    cek(n >= 70, `jumlah kutipan buku yang diperiksa (${n})`);
    cek(M.adegan.every((a) => (a.kutipan ?? []).length >= 3), "tiap adegan materi memuat paling sedikit 3 kutipan buku");
    cek(/d\. pecahan desimal persepuluhan dan perseratusan/.test(bersih(bagian[2])) && !/d\. pecahan desimal persepuluhan dan perseratusan/.test(siswa), "subbab D mulai di Buku Siswa PDF 83, bukan di PDF 78-82");
    cek(siswa.includes("c. pecahan senilai") && guru.includes("c. pecahan senilai"), "judul subbab C ada di Buku Siswa dan Panduan Guru");
    // Angka dan istilah yang dipakai video.
    cek(siswa.includes("menjadi 4 bagian yang sama") && siswa.includes("menjadi 16 bagian yang sama") && siswa.includes("warnailah 4 kotak"), "Buku Siswa: kertas 4 bagian (1 diwarnai) dan 16 bagian (4 diwarnai)");
    cek(siswa.includes("2 batang coklat") && siswa.includes("menjadi 6 bagian") && siswa.includes("menjadi 3 bagian"), "Buku Siswa: dua batang coklat, 6 bagian dan 3 bagian");
    cek((guru.match(/dikatakan pecahan senilai, karena pecahan/g) ?? []).length === 3 && (guru.match(/apabila disederhanakan/g) ?? []).length === 3, "Panduan Guru: tiga kunci memakai kalimat disederhanakan");
    // Urutan angka pada teks PDF: kunci Panduan Guru dan contoh Tahukah Kalian (hasil bagi dua tertulis 2/6 lagi).
    const g3 = bersih(bagian[1]);
    cek(/1 3 = 2 6/.test(g3) || /1 2 = 2 4/.test(g3) || g3.includes("2 4 apabila"), "Panduan Guru memuat pecahan kunci nomor 1 (2/4)");
    cek(g3.includes("2 6 apabila") && g3.includes("3 9 apabila") && /memperoleh hasil yang sama yaitu 1 3/.test(g3), "Panduan Guru memuat pecahan kunci nomor 2 (2/6) dan 3 (3/9), hasil 1/3");
    const hal81 = bersih(bagian[3]);
    cek(/1 3 2 6 = ×2 ×2 2 6 2 6 = ÷2 ÷2/.test(hal81), "Buku Siswa hlm. 69: contoh kali 1/3 jadi 2/6, contoh bagi 2/6 tertulis menjadi 2/6 (salah cetak)");
    // Keganjilan buku yang dicatat di video.
    cek(guru.includes("dengan cara menyamakan penyebutnya"), "Panduan Guru hlm. 100: apersepsi menyebut menyamakan penyebut");
    cek(!guru.includes("miskonsepsi") && !siswa.includes("miskonsepsi"), "Panduan Guru dan Buku Siswa subbab C tidak memuat bagian miskonsepsi");
    cek(!/kunci/.test(siswa), "Buku Siswa hlm. 66-70: tanpa kunci jawaban (hitungan mandiri)");
    cek(/ayo berpikir buatlah tiga buah gambar yang menunjukkan pecahan senilai! gambar 1 gambar 2 gambar 3/.test(hal81), "Buku Siswa: Ayo Berpikir meminta tiga gambar, tanpa isian jawaban");
    cek(/model pembelajaran yang disarankan untuk bab ini adalah problem based learning/.test(guru), "Panduan Guru: model yang disarankan Problem Based Learning");
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k4b2c-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k4b2c-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k4b2c sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k4b2c.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_C42|video-k4b2-umum|naskah-k4b2/.test(pembungkus) && /VIDEO_MATERI_K4B2C/.test(pembungkus) && /VIDEO_LUAR_K4B2C/.test(pembungkus) && /export function VideoK4B2C/.test(pembungkus), "video-k4b2c.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k4b2c.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k4b2c.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k4b2c.mjs: akhir baris LF");
}

for (const v of [M, U]) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.kutipan} kutipan terhadap teks PDF, ${stat.terbilang} bilangan berkata, ${stat.persamaan} persamaan, ${stat.rantai} rantai dan hitungan gambar, ${stat.teksPasang} pasangan teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
