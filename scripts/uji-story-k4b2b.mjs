// Uji Story Kelas 4 Bab 2 Sub-Bab B (Pecahan dengan Penyebut Sama): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar (angka dan bilangan yang diucapkan dengan kata), perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, tidak membocorkan Sub-Bab C sampai E (senilai, desimal, persen), kutipan buku terhadap teks PDF (pdftotext, atau PyMuPDF bila tidak ada),
// jumlah bagian dan bagian yang diarsir pada gambar (batang, lingkaran, segi enam) dihitung ulang dari gambar dan dibandingkan dengan gambar vektor di PDF Buku Siswa lewat PyMuPDF,
// hitungan mandiri perbandingan pecahan berpenyebut sama (kunci Panduan Guru), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k4b2b.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b2b-video.ts");

const stat = { kutipan: 0, terbilang: 0, teksPasang: 0, persamaan: 0, data: 0, gambarPdf: 0 };
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
const VIDEO = [V.VIDEO_MATERI_K4B2B, V.VIDEO_LUAR_K4B2B];
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
const G = await import("../src/components/modul/story/k4b2b-gambar.ts");
const U1 = await import("../src/components/modul/story/k4b2b-luar-1.ts");
const M = V.VIDEO_MATERI_K4B2B;
const U = V.VIDEO_LUAR_K4B2B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const T = (v, id, ke) => akhirAdegan(adegan(v, id), ke);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  const METODE = ["Same Denominator", "Compare Numerators", "Fraction Bars", "Fraction Card Sort"];
  const NAMA_ID = ["Penyebut Sama", "Banding Pembilang", "Batang Pecahan", "Susun Kartu Pecahan"];
  cek(!/Same Denominator|Compare Numerators|Fraction Bars|Fraction Card Sort|Banding Pembilang|Batang Pecahan|Susun Kartu Pecahan|metode luar|metode dari luar|Singapore/i.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of [...METODE, ...NAMA_ID]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE, METODE, "nama metode di berkas luar-1");
  sama(U1.NAMA_METODE_ID, NAMA_ID, "nama Indonesia metode luar");
  cek(M.id === "k4b2b-materi" && U.id === "k4b2b-luar", "id video k4b2b-materi dan k4b2b-luar");
  cek(M.adegan.every((a) => /(Buku Siswa|Panduan Guru) hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  cek(U.adegan.every((a) => a.sumber.length <= 46), "video metode luar: label sumber cukup pendek untuk kanvas 300 lebar");
  cek(M.adegan.every((a) => a.sumber.length <= 52), "video materi: label sumber cukup pendek untuk kanvas 300 lebar");
  for (const kata of ["Peta konsep", "Kata kunci", "Apersepsi", "Ayo Berlatih", "Ayo Berpikir", "Ayo Mengamati", "Miskonsepsi", "Diferensiasi", "Refleksi", "Subbab", "Tujuan pembelajaran", "Panduan guru", "Aktivitas"]) cek(!luar.includes(kata), `video metode luar tidak memuat "${kata}" milik materi`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-penyebut", "luar-penyebut-terapan", "luar-pembilang", "luar-pembilang-terapan", "luar-batang", "luar-batang-terapan", "luar-kartu", "luar-kartu-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[0].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  cek(M.adegan.length === 9 && U.adegan.length === 10, "9 adegan materi dan 10 adegan metode luar");
  // Sub-Bab B tidak membocorkan Sub-Bab C sampai E (pecahan senilai, desimal, persen) maupun isi Sub-Bab A (pecahan satuan, garis bilangan) di luar kebutuhan.
  const BOCOR = /senilai|ekuivalen|desimal|persen|perseratus|persepuluh|koma|disederhanakan|menyederhanakan|paling sederhana|penyebut berbeda|kpk|kelipatan|lipat kertas|origami|garis bilangan|pecahan satuan|pembilang satu\b/i;
  for (const a of M.adegan) cek(!BOCOR.test(teksAdegan(a)), `materi ${a.id} tidak membocorkan subbab lain`);
  for (const a of U.adegan) cek(!BOCOR.test(teksAdegan(a)), `metode luar ${a.id} tidak membocorkan subbab lain`);
  cek(totalKetukan >= 60, `total ketukan cukup dalam (${totalKetukan})`);
  cek(M.adegan.map((a) => a.id).join() === "pembuka-b,amati-satu,amati-dua,berlatih-satu-dua,berlatih-tiga,berlatih-empat,berlatih-lima,diferensiasi-b,ringkas-b", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "luar-pembuka,luar-penyebut,luar-penyebut-terapan,luar-pembilang,luar-pembilang-terapan,luar-batang,luar-batang-terapan,luar-kartu,luar-kartu-terapan,luar-ringkas", "urutan adegan metode luar");
  // Nama metode baru belum dipakai metode, judul, atau lab lain pada bab ini.
  const baca = (n) => readFileSync(new URL(`../src/components/modul/${n}`, import.meta.url), "utf8");
  for (const n of ["naskah-k4b2.ts", "lab-pecahan-k4b2a.ts", "lab-batang-k4b2b.ts", "lab-senilai-k4b2c.ts", "lab-desimal-k4b2d.ts", "lab-persen-k4b2e.ts"]) {
    const s = baca(n);
    cek(!/Fraction Card Sort|Susun Kartu Pecahan|Card Sort/i.test(s), `nama metode baru tidak bentrok dengan ${n}`);
  }
  const naskah = baca("naskah-k4b2.ts");
  cek(/Same Denominator/.test(naskah) && /Compare Numerators/.test(naskah) && /Fraction Bars/.test(naskah), "tiga nama metode lama sama dengan nama di naskah bab");
  // Hanya empat nama metode baru di video luar: tiga lama dan satu baru.
  cek(METODE.length === 4 && new Set(METODE).size === 4 && new Set(NAMA_ID).size === 4, "empat nama metode berbeda");
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

/* ------------------------------ Pecahan, batang, lingkaran, dan segi enam pada gambar dihitung ulang ------------------------------ */
const nilaiId = (objs, id) => objs.find((o) => o.id === id)?.isi;
const pec = (objs, id) => [nilaiId(objs, `${id}-n`), nilaiId(objs, `${id}-d`)].map(Number);
const bandingSama = (p, q) => (p === q ? "=" : p < q ? "<" : ">");
const batangInfo = (objs, id) => {
  const c = objs.filter((o) => new RegExp(`^${id}-b\\d+$`).test(o.id));
  if (c.length === 0) return null;
  const w = c[0].w;
  const arsir = c.filter((o) => o.warna === G.W.emas).length;
  const rata = c.every((o, i) => o.y === c[0].y && o.h === c[0].h && Math.abs(o.w - w) < 1e-9 && Math.abs(o.x - (c[0].x + i * w)) < 1e-9);
  const dariKiri = c.every((o, i) => (i < arsir ? o.warna === G.W.emas : o.warna === G.W.putih));
  return { bagian: c.length, arsir, rata, dariKiri, kiri: c[0].x, lebar: c.length * w, y: c[0].y };
};
const luasPoligon = (t) => Math.abs(t.reduce((s, p, i) => s + (p[0] * t[(i + 1) % t.length][1] - t[(i + 1) % t.length][0] * p[1]), 0)) / 2;
const lingkaranInfo = (objs, id) => {
  const c = objs.filter((o) => new RegExp(`^${id}-q\\d+$`).test(o.id));
  const sudut = c.map((o) => {
    const n = bilangan(o.d);
    const a1 = Math.atan2(n[3], n[2]);
    const a2 = Math.atan2(n[10], n[9]);
    return { a1, a2, sapuan: (((a2 - a1) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI), r: n[4], r2: n[5] };
  });
  const sapuanSama = sudut.every((s) => Math.abs(s.sapuan - (2 * Math.PI) / c.length) < 0.02);
  const selisihSudut = (a, b) => Math.abs((((a - b) % (2 * Math.PI)) + 3 * Math.PI) % (2 * Math.PI) - Math.PI);
  const sambung = sudut.every((s, i) => selisihSudut(s.a2, sudut[(i + 1) % c.length].a1) < 0.02);
  return { bagian: c.length, arsir: c.filter((o) => o.warna === G.W.emas).length, sapuanSama, sambung, jariSama: sudut.every((s) => s.r === sudut[0].r && s.r === s.r2), pusatSama: c.every((o) => o.x === c[0].x && o.y === c[0].y) };
};
const segienamInfo = (objs, id) => {
  const c = objs.filter((o) => new RegExp(`^${id}-h\\d+$`).test(o.id));
  const t = c.map((o) => titikJalur(o));
  const luas = t.map((p) => luasPoligon(p));
  const sisi = t.map((p) => [Math.hypot(p[1][0] - p[0][0], p[1][1] - p[0][1]), Math.hypot(p[2][0] - p[0][0], p[2][1] - p[0][1]), Math.hypot(p[2][0] - p[1][0], p[2][1] - p[1][1])]);
  return {
    bagian: c.length,
    arsir: c.filter((o) => o.warna === G.W.emas).length,
    luasSama: luas.every((l) => Math.abs(l - luas[0]) < 0.05),
    sisiSama: sisi.every((j) => Math.abs(j[0] - j[1]) < 0.05 && Math.abs(j[1] - j[2]) < 0.05 && Math.abs(j[0] - sisi[0][0]) < 0.05),
    pusatSama: c.every((o) => o.x === c[0].x && o.y === c[0].y),
  };
};
const cekBatang = (objs, id, bagian, arsir, pesan) => {
  const b = batangInfo(objs, id);
  cek(b !== null && b.bagian === bagian && b.arsir === arsir && b.rata && b.dariKiri, `${pesan}: batang ${id} ${bagian} bagian, ${arsir} diarsir dari kiri (ada ${JSON.stringify(b)})`);
  stat.data += 1;
};
const cekPec = (objs, id, n, d, pesan) => {
  sama(pec(objs, id), [n, d], `${pesan}: pecahan ${id}`);
  const g = objs.find((o) => o.id === `${id}-g`);
  cek(!!g && g.t === "garis", `${pesan}: garis pecahan ${id} ada`);
  stat.data += 1;
};
const cekTanda = (objs, id, p, q, pesan) => {
  sama(nilaiId(objs, id), bandingSama(p, q), `${pesan}: tanda ${id} untuk ${p} dan ${q} (penyebut sama)`);
  stat.data += 1;
};

{
  // Data buku (diukur dari gambar PDF dan dibandingkan dengan gambar vektor di bagian terakhir) ditulis ulang di sini sebagai pembanding mandiri.
  sama(G.AMATI.map((a) => [...a]), [[1, 2, 3], [2, 1, 10]], "data Ayo Mengamati: 1/3 dan 2/3, 2/10 dan 1/10");
  sama(G.LATIHAN_EMPAT.map((a) => [...a]), [[1, 3, 5], [2, 3, 4], [3, 2, 8], [5, 2, 10], [11, 12, 13]], "data nomor 4 a sampai e");
  const KUNCI_GURU = ["<", "<", ">", ">", "<"];
  sama([...G.KUNCI_EMPAT], KUNCI_GURU, "kunci nomor 4 di berkas gambar sama dengan Panduan Guru hlm. 99");
  sama(G.LATIHAN_EMPAT.map(([p, q]) => bandingSama(p, q)), KUNCI_GURU, "hitungan mandiri nomor 4 (penyebut sama, bandingkan pembilang) sama dengan kunci");
  // Dua cara hitung lain: nilai bagi dan perkalian silang.
  sama(G.LATIHAN_EMPAT.map(([p, q, d]) => (p / d < q / d ? "<" : p / d > q / d ? ">" : "=")), KUNCI_GURU, "hitungan nilai bagi nomor 4 sama dengan kunci");
  sama(G.LATIHAN_EMPAT.map(([p, q, d]) => (p * d < q * d ? "<" : p * d > q * d ? ">" : "=")), KUNCI_GURU, "hitungan perkalian silang nomor 4 sama dengan kunci");
  sama([G.LATIHAN_SATU.penyebut, G.LATIHAN_SATU.kiri, G.LATIHAN_SATU.kanan], [4, 2, 1], "data nomor 1: lingkaran dibagi 4, diarsir 2 dan 1");
  sama([...G.LATIHAN_SATU.kunciGuruKanan], [1, 3], "kunci Panduan Guru hlm. 98 menulis pecahan kedua 1/3 (salah ketik)");
  cek(G.LATIHAN_SATU.kunciGuruKanan[1] !== G.LATIHAN_SATU.penyebut, "penyebut kunci nomor 1 (3) berbeda dengan penyebut gambar (4)");
  sama([G.LATIHAN_DUA.penyebut, G.LATIHAN_DUA.atas, G.LATIHAN_DUA.bawah], [6, 2, 4], "data nomor 2: batang dibagi 6, diarsir 2 dan 4");
  sama([G.LATIHAN_TIGA.penyebut, ...G.LATIHAN_TIGA.arsir], [6, 5, 3, 1], "data nomor 3: segi enam dibagi 6, diarsir 5, 3, 1");
  sama([G.TONGKAT.penyebut, G.TONGKAT.asep, G.TONGKAT.azizah], [6, 3, 2], "data nomor 5: tongkat 3/6 dan 2/6");
  cek(G.TONGKAT.asep > G.TONGKAT.azizah, "tongkat Asep (3/6) lebih panjang dari tongkat Azizah (2/6): kunci Asep");
  sama(G.TONGKAT.asep - G.TONGKAT.azizah, 1, "selisih tongkat satu bagian (1/6 meter)");
  sama(G.AMATI.map(([a, b]) => bandingSama(a, b)), ["<", ">"], "Ayo Mengamati: 1/3 < 2/3 dan 2/10 > 1/10");

  // Ayo Mengamati.
  const am0 = T(M, "amati-satu", 2);
  cekBatang(am0, "a1", 3, 1, "Ayo Mengamati 1");
  cekBatang(am0, "a2", 3, 2, "Ayo Mengamati 1");
  cekPec(am0, "a1f", 1, 3, "Ayo Mengamati 1");
  cekPec(am0, "a2f", 2, 3, "Ayo Mengamati 1");
  const am1 = T(M, "amati-satu", 3);
  cekPec(am1, "l1", 1, 3, "lambang kurang dari");
  cekPec(am1, "l3", 2, 3, "lambang kurang dari");
  cekTanda(am1, "l2", 1, 2, "lambang kurang dari");
  const am2 = T(M, "amati-dua", 1);
  cekBatang(am2, "b1", 10, 2, "Ayo Mengamati 2");
  cekBatang(am2, "b2", 10, 1, "Ayo Mengamati 2");
  cekPec(am2, "b1f", 2, 10, "Ayo Mengamati 2");
  cekPec(am2, "b2f", 1, 10, "Ayo Mengamati 2");
  const am3 = T(M, "amati-dua", 2);
  cekPec(am3, "m1", 2, 10, "lambang lebih dari");
  cekPec(am3, "m3", 1, 10, "lambang lebih dari");
  cekTanda(am3, "m2", 2, 1, "lambang lebih dari");
  const am4 = T(M, "amati-dua", 3);
  cekBatang(am4, "p1", 10, 2, "potongan sama besar");
  cekBatang(am4, "p2", 10, 1, "potongan sama besar");
  // Ayo Berlatih 1 dan 2.
  const lt0 = T(M, "berlatih-satu-dua", 1);
  for (const [id, arsir] of [["lk1", 2], ["lk2", 1]]) {
    const l = lingkaranInfo(lt0, id);
    cek(l.bagian === 4 && l.arsir === arsir && l.sapuanSama && l.sambung && l.jariSama && l.pusatSama, `nomor 1: lingkaran ${id} dibagi 4 juring sama besar, ${arsir} diarsir (${JSON.stringify(l)})`);
    stat.data += 1;
  }
  sama(["lk1-q2", "lk1-q3"].map((id) => lt0.find((o) => o.id === id).warna), [G.W.emas, G.W.emas], "nomor 1: lingkaran kiri diarsir setengah kiri (kiri bawah dan kiri atas)");
  sama(["lk1-q0", "lk1-q1"].map((id) => lt0.find((o) => o.id === id).warna), [G.W.putih, G.W.putih], "nomor 1: setengah kanan lingkaran kiri tidak diarsir");
  cekPec(lt0, "lf1", 2, 4, "nomor 1");
  cekPec(lt0, "lf2", 1, 4, "nomor 1");
  cekTanda(lt0, "lft", 2, 1, "nomor 1");
  const lt1 = T(M, "berlatih-satu-dua", 2);
  cekPec(lt1, "kc2", 2, 4, "kunci Panduan Guru nomor 1");
  cekPec(lt1, "kc4", 1, 3, "kunci Panduan Guru nomor 1 (salah ketik 1/3)");
  sama(nilaiId(lt1, "kc6-t0"), "seharusnya 1/4, sesuai gambar", "catatan kunci nomor 1: seharusnya 1/4");
  const lt2 = T(M, "berlatih-satu-dua", 3);
  cekBatang(lt2, "bt1", 6, 2, "nomor 2");
  cekBatang(lt2, "bt2", 6, 4, "nomor 2");
  cekPec(lt2, "bf1", 2, 6, "nomor 2");
  cekPec(lt2, "bf2", 4, 6, "nomor 2");
  cekTanda(lt2, "bft", 2, 4, "nomor 2");
  // Ayo Berlatih 3.
  const hx0 = T(M, "berlatih-tiga", 0);
  [5, 3, 1].forEach((arsir, i) => {
    const h = segienamInfo(hx0, `hx${i}`);
    cek(h.bagian === 6 && h.arsir === arsir && h.luasSama && h.sisiSama && h.pusatSama, `nomor 3: segi enam ${i + 1} dibagi 6 segitiga sama besar, ${arsir} diarsir (${JSON.stringify(h)})`);
    stat.data += 1;
  });
  const hx1 = T(M, "berlatih-tiga", 1);
  [5, 3, 1].forEach((n, i) => cekPec(hx1, `hf${i}`, n, 6, "nomor 3"));
  const hx2 = T(M, "berlatih-tiga", 2);
  [5, 3, 1].forEach((n, i) => cekPec(hx2, `hc${i}`, n, 6, "urutan nomor 3"));
  cekTanda(hx2, "hs0", 5, 3, "urutan nomor 3");
  cekTanda(hx2, "hs1", 3, 1, "urutan nomor 3");
  // Ayo Berlatih 4: tiap baris dibandingkan ulang.
  const e = T(M, "berlatih-empat", 2);
  G.LATIHAN_EMPAT.forEach(([p, q, d], i) => {
    cekPec(e, `e${i}-f1`, p, d, `nomor 4 baris ${i + 1}`);
    cekPec(e, `e${i}-f2`, q, d, `nomor 4 baris ${i + 1}`);
    cekTanda(e, `e${i}-s`, p, q, `nomor 4 baris ${i + 1}`);
    sama(nilaiId(e, `e${i}-a`), `${p} ${bandingSama(p, q)} ${q}`, `nomor 4 baris ${i + 1}: alasan hanya membandingkan pembilang`);
  });
  const e4 = T(M, "berlatih-empat", 3);
  sama([0, 1, 2, 3, 4].map((i) => nilaiId(e4, `ez${i}-t0`)), ["a.  <", "b.  <", "c.  >", "d.  >", "e.  <"], "rekap kunci nomor 4 di gambar");
  // Ayo Berlatih 5.
  const t0 = T(M, "berlatih-lima", 0);
  cekBatang(t0, "ta", 6, 3, "nomor 5 Asep");
  cekBatang(t0, "tz", 6, 2, "nomor 5 Azizah");
  sama([nilaiId(t0, "tm1"), nilaiId(t0, "tm2")], ["3/6 m", "2/6 m"], "nomor 5: tongkat 3/6 meter dan 2/6 meter");
  const t1 = T(M, "berlatih-lima", 1);
  cekPec(t1, "td1", 3, 6, "nomor 5");
  cekPec(t1, "td3", 2, 6, "nomor 5");
  cekTanda(t1, "td2", 3, 2, "nomor 5");
  const t2 = T(M, "berlatih-lima", 2);
  cekBatang(t2, "ta", 6, 3, "jawaban nomor 5");
  cekBatang(t2, "tz", 6, 2, "jawaban nomor 5");
  // Rekap kunci pada adegan terakhir.
  const rk = T(M, "ringkas-b", 0);
  sama([0, 1, 2, 3, 4].map((i) => nilaiId(rk, `rk${i}-t1`)), ["lebih dari: 2/4 > 1/4", "kurang dari: 2/6 < 4/6", "5/6 > 3/6 > 1/6", "< < > > <", "tongkat Asep (3/6 > 2/6)"], "rekap kunci: angka kunci");
  const rn = T(M, "ringkas-b", 2);
  cekPec(rn, "rs2", 11, 13, "salah paham penyebut besar");
  cekPec(rn, "rs3", 12, 13, "salah paham penyebut besar");

  /* ------------------------------ Metode luar ------------------------------ */
  const po = T(U, "luar-pembuka", 0);
  cekPec(po, "po1", 1, 3, "luar pembuka");
  cekPec(po, "po3", 2, 3, "luar pembuka");
  const s0 = T(U, "luar-penyebut", 0);
  cekBatang(s0, "pd", 6, 0, "luar Same Denominator: enam potongan sama besar");
  const s1 = T(U, "luar-penyebut", 1);
  cekBatang(s1, "pe1", 4, 1, "luar Same Denominator konsep");
  cekBatang(s1, "pe2", 4, 3, "luar Same Denominator konsep");
  const ta = T(U, "luar-penyebut-terapan", 0);
  cekBatang(ta, "ta1", 3, 1, "luar Same Denominator, buku 1/3");
  cekBatang(ta, "ta2", 3, 2, "luar Same Denominator, buku 2/3");
  cekPec(ta, "ta1f", 1, 3, "luar Same Denominator, buku");
  cekPec(ta, "ta2f", 2, 3, "luar Same Denominator, buku");
  const tb = T(U, "luar-penyebut-terapan", 1);
  cekBatang(tb, "ta1", 3, 1, "luar Same Denominator, banding potongan");
  cekBatang(tb, "ta2", 3, 2, "luar Same Denominator, banding potongan");
  cekPec(tb, "tc1", 1, 3, "luar Same Denominator, banding");
  cekPec(tb, "tc3", 2, 3, "luar Same Denominator, banding");
  cekTanda(tb, "tc2", 1, 2, "luar Same Denominator, 1/3 dan 2/3");
  const tc = T(U, "luar-penyebut-terapan", 2);
  cekBatang(tc, "td1", 10, 2, "luar Same Denominator, buku 2/10");
  cekBatang(tc, "td2", 10, 1, "luar Same Denominator, buku 1/10");
  cekPec(tc, "td1f", 2, 10, "luar Same Denominator, buku");
  cekPec(tc, "td2f", 1, 10, "luar Same Denominator, buku");
  const td = T(U, "luar-penyebut-terapan", 3);
  cekBatang(td, "td1", 10, 2, "luar Same Denominator, banding 10 potongan");
  cekBatang(td, "td2", 10, 1, "luar Same Denominator, banding 10 potongan");
  cekPec(td, "tf1", 2, 10, "luar Same Denominator, banding");
  cekPec(td, "tf3", 1, 10, "luar Same Denominator, banding");
  cekTanda(td, "tf2", 2, 1, "luar Same Denominator, 2/10 dan 1/10");
  const nc = T(U, "luar-pembilang", 1);
  cekPec(nc, "nc1", 2, 5, "luar Compare Numerators konsep");
  cekPec(nc, "nc3", 3, 5, "luar Compare Numerators konsep");
  const mt = T(U, "luar-pembilang-terapan", 2);
  G.LATIHAN_EMPAT.forEach(([p, q, d], i) => {
    cekPec(mt, `m${i}-f1`, p, d, `luar Compare Numerators baris ${i + 1}`);
    cekPec(mt, `m${i}-f2`, q, d, `luar Compare Numerators baris ${i + 1}`);
    cekTanda(mt, `m${i}-s`, p, q, `luar Compare Numerators baris ${i + 1}`);
    sama(nilaiId(mt, `m${i}-a`), `${p} ${bandingSama(p, q)} ${q}`, `luar Compare Numerators baris ${i + 1}: hanya pembilang`);
  });
  const mu = T(U, "luar-pembilang-terapan", 3);
  sama([0, 1, 2, 3, 4].map((i) => nilaiId(mu, `mz${i}-t0`)), ["a.  <", "b.  <", "c.  >", "d.  >", "e.  <"], "luar: rekap hasil sama dengan kunci");
  const fb = T(U, "luar-batang", 0);
  cekBatang(fb, "fb", 5, 0, "luar Fraction Bars konsep");
  const fc = T(U, "luar-batang", 1);
  cekBatang(fc, "fc1", 5, 2, "luar Fraction Bars: arsir sebanyak pembilang");
  cekBatang(fc, "fc2", 5, 4, "luar Fraction Bars: arsir sebanyak pembilang");
  const fd = T(U, "luar-batang", 2);
  for (const [id, gid, arsir] of [["fd1", "fd3", 2], ["fd2", "fd4", 4]]) {
    cekBatang(fd, id, 5, arsir, "luar Fraction Bars: sejajar");
    const b = batangInfo(fd, id);
    const g = fd.find((o) => o.id === gid);
    cek(Math.abs(g.x - (b.kiri + (b.lebar * b.arsir) / b.bagian)) < 1e-9, `luar Fraction Bars: garis ujung ${gid} tepat di ujung daerah arsir ${id}`);
  }
  cek(batangInfo(fd, "fd1").kiri === batangInfo(fd, "fd2").kiri && batangInfo(fd, "fd1").lebar === batangInfo(fd, "fd2").lebar, "luar Fraction Bars: dua batang sama panjang dan sejajar di kiri");
  const bu = T(U, "luar-batang-terapan", 0);
  cekBatang(bu, "bu1", 6, 2, "luar Fraction Bars nomor 2");
  cekBatang(bu, "bu2", 6, 4, "luar Fraction Bars nomor 2");
  const bv = T(U, "luar-batang-terapan", 1);
  for (const [id, gid] of [["bu1", "bu5"], ["bu2", "bu6"]]) {
    const b = batangInfo(bv, id);
    const g = bv.find((o) => o.id === gid);
    cek(Math.abs(g.x - (b.kiri + (b.lebar * b.arsir) / b.bagian)) < 1e-9, `luar Fraction Bars nomor 2: garis ujung ${gid} tepat di ujung daerah arsir ${id}`);
  }
  cekPec(bv, "bv1", 2, 6, "luar Fraction Bars nomor 2");
  cekPec(bv, "bv3", 4, 6, "luar Fraction Bars nomor 2");
  cekTanda(bv, "bv2", 2, 4, "luar Fraction Bars nomor 2");
  const bx = T(U, "luar-batang-terapan", 3);
  cekBatang(bx, "bx1", 6, 3, "luar Fraction Bars tongkat Asep");
  cekBatang(bx, "bx2", 6, 2, "luar Fraction Bars tongkat Azizah");
  const kc = T(U, "luar-kartu", 0);
  sama(["cs1", "cs2", "cs3"].map((id) => pec(kc, id)), [[4, 7], [1, 7], [3, 7]], "luar Fraction Card Sort konsep: kartu 4/7, 1/7, 3/7");
  const ku = T(U, "luar-kartu", 1);
  const urut = ["cu1", "cu2", "cu3"].map((id) => pec(ku, id));
  sama(urut, [[1, 7], [3, 7], [4, 7]], "luar Fraction Card Sort konsep: kartu terurut dari pembilang terkecil");
  const acak = ["cs1", "cs2", "cs3"].map((id) => pec(ku, id)[0]);
  sama([...acak].sort((m, n) => m - n), urut.map((u) => u[0]), "luar Fraction Card Sort konsep: kartu acak dan terurut berisi pembilang sama");
  const kt0 = T(U, "luar-kartu-terapan", 0);
  sama(["ct1", "ct2", "ct3"].map((id) => pec(kt0, id)), [[3, 6], [5, 6], [1, 6]], "luar Fraction Card Sort nomor 3: kartu acak 3/6, 5/6, 1/6");
  const kt1 = T(U, "luar-kartu-terapan", 1);
  sama(["cu1", "cu2", "cu3"].map((id) => pec(kt1, id)), [[1, 6], [3, 6], [5, 6]], "luar Fraction Card Sort nomor 3: terurut 1/6, 3/6, 5/6");
  const kt2 = T(U, "luar-kartu-terapan", 2);
  sama(["cx1", "cx3", "cx5"].map((id) => pec(kt2, id)[0]), [1, 3, 5], "luar Fraction Card Sort: kecil ke besar");
  sama(["cy1", "cy3", "cy5"].map((id) => pec(kt2, id)[0]), [5, 3, 1], "luar Fraction Card Sort: besar ke kecil sama dengan kunci");
  cekTanda(kt2, "cx2", 1, 3, "luar Fraction Card Sort");
  cekTanda(kt2, "cx4", 3, 5, "luar Fraction Card Sort");
  cekTanda(kt2, "cy2", 5, 3, "luar Fraction Card Sort");
  cekTanda(kt2, "cy4", 3, 1, "luar Fraction Card Sort");
  const kt3 = T(U, "luar-kartu-terapan", 3);
  sama(["cz1", "cz3", "cz4", "cz6"].map((id) => pec(kt3, id)), [[2, 8], [3, 8], [11, 13], [12, 13]], "luar Fraction Card Sort nomor 4: 2/8, 3/8, 11/13, 12/13");
  cekTanda(kt3, "cz2", 2, 3, "luar Fraction Card Sort 2/8 dan 3/8");
  cekTanda(kt3, "cz5", 11, 12, "luar Fraction Card Sort 11/13 dan 12/13");
  const rr = T(U, "luar-ringkas", 1);
  sama([0, 1, 2, 3].map((i) => nilaiId(rr, `rt${i}-t1`)), ["1/3 < 2/3 ; 2/10 > 1/10", "nomor 4: < < > > <", "2/6 < 4/6 ; 3/6 > 2/6", "5/6 > 3/6 > 1/6"], "luar: angka buku yang dipakai");
  stat.data += 1;
}

/* ------------------------------ Gambar vektor di PDF Buku Siswa dan Panduan Guru dibandingkan dengan gambar Story ------------------------------ */
{
  const bs = new URL("../bahan-sd/Matematika-BS-KLS-IV.pdf", import.meta.url);
  const bg = new URL("../bahan-sd/Matematika-BG-KLS-IV.pdf", import.meta.url);
  const jalur = (u) => u.pathname.replace(/^\/([A-Za-z]:)/, "$1");
  const KODE = [
    "import sys, json, pymupdf, statistics",
    "d = pymupdf.open(sys.argv[1])",
    "def yel(f): return bool(f) and abs(f[0]-1)<.02 and abs(f[1]-.8)<.03 and abs(f[2]-.31)<.03",
    "def putih(f): return bool(f) and f[0]>.98 and f[1]>.98 and f[2]>.98",
    "def poly(items):",
    "    pts=[(items[0][1].x,items[0][1].y)]",
    "    for it in items:",
    "        if it[0]=='l': pts.append((it[2].x,it[2].y))",
    "    return abs(sum(pts[i][0]*pts[(i+1)%len(pts)][1]-pts[(i+1)%len(pts)][0]*pts[i][1] for i in range(len(pts))))/2",
    "def halaman(pg):",
    "    dr=d[pg-1].get_drawings(); out={'batang':[],'lingkaran':[],'segienam':[]}",
    "    grup=[]",
    "    for r in sorted([x['rect'] for x in dr if x.get('type')=='s' and x['rect'].width<.5 and x['rect'].height>=25 and 90<x['rect'].y0<800], key=lambda r:r.y0):",
    "        if grup and abs(grup[-1][0].y0-r.y0)<3: grup[-1].append(r)",
    "        else: grup.append([r])",
    "    for v in grup:",
    "        if len(v)<4: continue",
    "        xs=sorted(r.x0 for r in v); pitch=statistics.median([b-a for a,b in zip(xs,xs[1:])])",
    "        y0=v[0].y0; y1=v[0].y1; lebar=0",
    "        for x in dr:",
    "            r=x['rect']",
    "            if yel(x.get('fill')) and abs(r.y0-y0)<5 and abs(r.y1-y1)<5 and r.x0>=xs[0]-2 and r.x1<=xs[-1]+2: lebar+=r.width",
    "        out['batang'].append([len(v)-1, round(lebar/pitch)])",
    "    for x in dr:",
    "        r=x['rect']",
    "        if x.get('type')=='s' and not x.get('fill') and len(x['items'])==4 and all(i[0]=='c' for i in x['items']) and r.width>55 and abs(r.width-r.height)<2:",
    "            tot=0",
    "            for z in dr:",
    "                q=z['rect']",
    "                if yel(z.get('fill')) and q.x0>=r.x0-2 and q.x1<=r.x1+2 and q.y0>=r.y0-2 and q.y1<=r.y1+2 and q.width>8: tot+=q.width*q.height",
    "            out['lingkaran'].append([r.y0, r.x0, round(4*tot/(r.width*r.height))])",
    "    for x in dr:",
    "        r=x['rect']",
    "        if x.get('type')=='s' and not x.get('fill') and len(x['items'])==6 and all(i[0]=='l' for i in x['items']) and 80<r.width<85 and 70<r.height<76:",
    "            luas=poly(x['items']); tri=luas/6; kuning=[]; wh=[]",
    "            for z in dr:",
    "                q=z['rect']",
    "                if q.x0>=r.x0-1 and q.x1<=r.x1+1 and q.y0>=r.y0-1 and q.y1<=r.y1+1 and q.width>8 and all(i[0]=='l' for i in z['items']):",
    "                    if yel(z.get('fill')): kuning.append(poly(z['items']))",
    "                    elif putih(z.get('fill')): wh.append(poly(z['items']))",
    "            if kuning and max(kuning)>.95*luas: arsir=6-round(sum(wh)/tri)",
    "            else: arsir=round(sum(kuning)/tri)",
    "            out['segienam'].append([r.x0, 6, arsir])",
    "    out['lingkaran'].sort(key=lambda t:(round(t[0]/20),t[1])); out['segienam'].sort()",
    "    return out",
    "print(json.dumps({str(p): halaman(p) for p in [int(a) for a in sys.argv[2:]]}))",
  ].join("\n");
  const baca = (berkas, ...hal) => {
    const p = spawnSync("python", ["-I", "-c", KODE, jalur(berkas), ...hal.map(String)], { encoding: "utf8", maxBuffer: 1 << 26 });
    return p.status === 0 ? JSON.parse(p.stdout) : null;
  };
  if (!(existsSync(bs) && existsSync(bg))) console.log("PDF tidak tersedia: pemeriksaan gambar vektor dilewati");
  else {
    const a = baca(bs, 75, 76, 77);
    const b = baca(bg, 110);
    if (a === null || b === null) console.log("PyMuPDF tidak tersedia: pemeriksaan gambar vektor dilewati");
    else {
      // Buku Siswa hlm. 63 (PDF 75): dua batang tiga bagian, diarsir 1 dan 2.
      sama(a["75"].batang, [[3, 1], [3, 2]], "PDF 75 (hlm. 63): batang 1/3 dan 2/3");
      // Buku Siswa hlm. 64 (PDF 76): dua batang sepuluh bagian, diarsir 2 dan 1; lingkaran dibagi empat, diarsir 2 dan 1.
      sama(a["76"].batang, [[10, 2], [10, 1]], "PDF 76 (hlm. 64): batang 2/10 dan 1/10");
      sama(a["76"].lingkaran.map((l) => l[2]), [2, 1], "PDF 76 (hlm. 64): lingkaran nomor 1 diarsir 2 dan 1 dari 4 bagian");
      // Buku Siswa hlm. 65 (PDF 77): dua batang enam bagian, diarsir 2 dan 4; tiga segi enam diarsir 5, 3, 1.
      sama(a["77"].batang, [[6, 2], [6, 4]], "PDF 77 (hlm. 65): batang nomor 2 diarsir 2 dan 4 dari 6 bagian");
      sama(a["77"].segienam.map((h) => [h[1], h[2]]), [[6, 5], [6, 3], [6, 1]], "PDF 77 (hlm. 65): segi enam nomor 3 diarsir 5, 3, 1 dari 6 segitiga");
      // Panduan Guru hlm. 98 (PDF 110): gambar sama dengan Buku Siswa.
      sama(b["110"].lingkaran.map((l) => l[2]), [2, 1], "PDF 110 (Panduan Guru hlm. 98): lingkaran nomor 1 diarsir 2 dan 1 dari 4 bagian");
      sama(b["110"].batang, [[6, 2], [6, 4]], "PDF 110: batang nomor 2 diarsir 2 dan 4 dari 6 bagian");
      sama(b["110"].segienam.map((h) => h[2]), [5, 3, 1], "PDF 110: segi enam nomor 3 diarsir 5, 3, 1");
      stat.gambarPdf = 8;
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
  // Kelas IV: Buku Siswa hlm. N = PDF N+12 (subbab B hlm. 63-65 = PDF 75-77, mulai di tengah PDF 75; subbab C mulai PDF 78). Panduan Guru hlm. N = PDF N+12 (subbab B hlm. 97-99 = PDF 109-111; subbab C mulai PDF 112).
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 75, 77), ambil(bg, 109, 111), ambil(bs, 74, 74), ambil(bs, 78, 78), ambil(bg, 108, 108), ambil(bg, 112, 112), ambil(bg, 110, 110)] : [null];
  if (bagian.some((b) => b === null)) console.log("PDF atau pembaca PDF tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const siswaPenuh = bersih(bagian[0]);
    const awalB = siswaPenuh.indexOf("b. pecahan dengan penyebut sama");
    cek(awalB > 0, "Buku Siswa PDF 75 memuat judul subbab B (setelah akhir subbab A)");
    const siswa = siswaPenuh.slice(awalB);
    const guru = bersih(bagian[1]);
    const buku = `${siswa}\n${guru}`;
    cek(!bersih(bagian[2]).includes("b. pecahan dengan penyebut sama") && !bersih(bagian[4]).includes("b. pecahan dengan penyebut sama"), "PDF 74 (Buku Siswa) dan PDF 108 (Panduan Guru) belum memuat judul subbab B");
    cek(bersih(bagian[3]).includes("c. pecahan senilai") && bersih(bagian[5]).includes("c. pecahan senilai"), "subbab C mulai di Buku Siswa PDF 78 dan Panduan Guru PDF 112");
    cek(guru.startsWith("97") || guru.includes("b. pecahan dengan penyebut sama"), "Panduan Guru PDF 109 memuat judul subbab B");
    cek(!siswa.includes("c. pecahan senilai") && !guru.includes("c. pecahan senilai"), "jatah halaman subbab B tidak memuat subbab C");
    let n = 0;
    for (const a of M.adegan) {
      for (const kt of a.kutipan ?? []) {
        n += 1;
        cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
      }
    }
    stat.kutipan = n;
    cek(n >= 60, `jumlah kutipan buku yang diperiksa (${n})`);
    cek(M.adegan.every((a) => (a.kutipan ?? []).length >= 2), "tiap adegan materi memuat kutipan buku");
    // Istilah dan angka kunci yang dipakai video.
    for (const t of ["jadi tongkat yang lebih panjang adalah tongkat asep", "membandingkan dan mengurutkan antar-pecahan", "penyebut adalah bilangan pembagi.", "alat tulis", "problem based learning", "guru meminta peserta didik untuk mengamati 2 gambar"]) cek(guru.includes(t), `Panduan Guru memuat "${t}"`);
    for (const t of ["daerah arsir mana yang lebih kecil?", "daerah arsir mana yang lebih besar?", "membandingkan pecahan dengan penyebut yang sama", "asep mempunyai tongkat sepanjang", "azizah mempunyai tongkat"]) cek(siswa.includes(t), `Buku Siswa memuat "${t}"`);
    // Subbab B tanpa Ayo Beraktivitas dan tanpa Ayo Berpikir (dikatakan video).
    cek(!/ayo beraktivitas/.test(siswa) && !/ayo berpikir/.test(siswa) && !/ayo berpikir/.test(guru) && !/ayo beraktivitas/.test(guru), "subbab B (Buku Siswa dan Panduan Guru): tanpa Ayo Beraktivitas dan tanpa Ayo Berpikir");
    cek(!/pengurutan|urutkan/.test(siswa) && /mengurutkan/.test(guru), "tujuan menyebut mengurutkan (Panduan Guru), Buku Siswa tidak memiliki soal berkata urutkan");
    // Kunci Panduan Guru nomor 1: pecahan kedua memakai penyebut 3 (token 1, 3, 2, 4), padahal gambar dibagi 4 bagian.
    const mentah = bagian[6];
    const m = mentah.match(/\n1\.\s*\n([\s\S]*?)\n2\.\s*\n/);
    const token = m ? m[1].split(/\s+/).filter((t) => /^\d+$/.test(t)).sort() : [];
    sama(token, ["1", "2", "3", "4"], "Panduan Guru hlm. 98, kunci nomor 1: pecahan yang tertulis 2/4 dan 1/3 (penyebut 3 tidak sama dengan 4)");
    // Panduan Guru nomor 4 dan 5: kunci tanda dan tongkat Asep.
    cek(/jawab: jadi tongkat yang lebih panjang adalah tongkat asep/.test(guru), "Panduan Guru hlm. 99: kunci nomor 5 tongkat Asep");
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k4b2b-.*)\.(ts|tsx)$/.test(f));
  cek(berkas.length >= 7, `berkas story ditemukan (${berkas.length})`);
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
    cek(impor.every((i) => /^\.\/(logika-story|k4b2b-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k4b2b sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k4b2b.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_B42|video-k4b2-umum|naskah-k4b2/.test(pembungkus) && /VIDEO_MATERI_K4B2B/.test(pembungkus) && /VIDEO_LUAR_K4B2B/.test(pembungkus) && /export function VideoK4B2B/.test(pembungkus) && /from "\.\/daftar-video-cerita"/.test(pembungkus), "video-k4b2b.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(/keVideoSiap\(VIDEO_MATERI_K4B2B, \{ a: 0, k: 0 \}\)/.test(pembungkus) && /keVideoSiap\(VIDEO_LUAR_K4B2B, \{ a: 1, k: 3 \}\)/.test(pembungkus), "video-k4b2b.tsx: gambar mini {a:0,k:0} dan {a:1,k:3} ada");
  cek(!/\r/.test(pembungkus), "video-k4b2b.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k4b2b.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k4b2b.mjs: akhir baris LF");
  cek(adegan(M, "pembuka-b").ketukan.length >= 3 && adegan(U, "luar-pembuka").ketukan.length >= 4, "ketukan gambar mini ada ({a:1,k:3} butuh 4 ketukan pada adegan luar kedua)");
  cek(U.adegan[1].ketukan.length >= 4, "adegan metode luar kedua punya paling sedikit 4 ketukan (gambar mini k:3)");
}

for (const v of [M, U]) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.kutipan} kutipan terhadap teks PDF, ${stat.gambarPdf} gambar vektor PDF, ${stat.terbilang} bilangan berkata, ${stat.persamaan} persamaan, ${stat.teksPasang} pasangan teks, ${stat.data} data gambar`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
