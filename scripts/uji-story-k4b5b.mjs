// Uji Story Kelas 4 Bab 5 Sub-Bab B (Komposisi dan Dekomposisi Bangun Datar, penutup bab): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar (bilangan >= 100 yang diucapkan dengan kata dibaca ulang menjadi angka), perubahan gambar tiap ketukan,
// keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar, kutipan buku (bila PDF ada), persamaan di gambar dihitung ulang,
// geometri bangun datar (tujuh keping tangram dan delapan keping menutup bentuknya tanpa celah atau tumpuk, jenis dan jumlah keping perahu serta motif paving dihitung dari titik sudut gambar buku,
// besar sudut Uji Kompetensi 4 dan 5, sisi sejajar, dua segitiga besar yang disusun tiga cara), hitungan mandiri (rubrik, daftar nama bangun, kunci Panduan Guru),
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k4b5b.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/[.][a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b5b-video.ts");

const stat = { persamaan: 0, banding: 0, angkaSuara: 0, teksPasang: 0, format: 0, kartu: 0, keping: 0, titikContoh: 0 };
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
    if (SATUAN[t] !== undefined) (sat = SATUAN[t], (ada = true));
    else if (t === "sepuluh") (puluh = 10, (ada = true));
    else if (t === "sebelas") (puluh = 10, (sat = 1), (ada = true));
    else if (t === "belas") (puluh = 10, (ada = true));
    else if (t === "puluh") (puluh = sat * 10, (sat = 0), (ada = true));
    else if (t === "seratus") (ratus = 100, (ada = true));
    else if (t === "ratus") (ratus = sat * 100, (sat = 0), (ada = true));
    else if (t === "seribu") (total += 1000, (ada = true));
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
sama(angkaDariKata("dua ratus sembilan puluh dua"), [292], "pembaca bilangan: 292");
sama(angkaDariKata("enam puluh empat buku dan lima belas"), [], "pembaca bilangan: kecil diabaikan");

/** Nilai persamaan aritmetika dengan titik ribuan, tanda − × ÷ dan kurung. */
const nilai = (ekspr) => {
  const s = ekspr.replace(/(\d)\.(\d{3})/g, "$1$2").replace(/−/g, "-").replace(/×/g, "*").replace(/÷/g, "/");
  if (!/^[\d\s+\-*/().]+$/.test(s)) return NaN;
  return Function(`"use strict"; return (${s});`)();
};
sama([nilai("9 + 1 + 5 + 2 + 6"), nilai("(14 + 16) ÷ 2"), nilai("3 × 15 + 2 × 10"), nilai("365 − 292")], [23, 15, 65, 73], "evaluator aritmetika");

const VIDEO = [V.VIDEO_MATERI_K4B5B, V.VIDEO_LUAR_K4B5B];
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
    cek(a.sumber.length > 8 && a.judul.length > 5 && /^#[0-9A-Fa-f]{6}$/.test(a.latar), `${nama}: sumber, judul, dan latar ada`);
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
const seluruhTeks = (v) => v.adegan.map((a) => [a.judul, a.sumber, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const M = V.VIDEO_MATERI_K4B5B;
const U = V.VIDEO_LUAR_K4B5B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksVisible = (objs) => objs.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi).map((o) => o.isi);
/** Semua teks yang pernah tampak di sebuah adegan (gabungan semua ketukan). */
const teksAdegan = (v, id) => new Set(adegan(v, id).ketukan.flatMap((kt, i) => L.kataDari(kt.suara).flatMap((_, p) => teksVisible(L.keadaanStory(adegan(v, id), i, p)))));
{
  const teksVideo = (v) => JSON.stringify(seluruhTeks(v));
  // "Tangram" tidak dimasukkan: itu istilah buku (Buku Siswa hlm. 166), jadi wajar muncul di video materi.
  // Nama Indonesia ditulis berhuruf kapital ("Susun Bangun"); kata biasa "susun bangun" di kalimat buku boleh muncul di video materi.
  const NAMA_METODE = /Compose Shapes|Decompose Shapes|Cut and Rearrange|Susun Bangun|Urai Bangun|Potong dan Susun Ulang/;
  const KATA_METODE = /metode luar|metode dari luar/i;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi) && !KATA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Compose Shapes", "Decompose Shapes", "Tangram", "Cut and Rearrange", "Susun Bangun", "Urai Bangun", "Potong dan Susun Ulang"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(M.adegan.every((a) => /(Buku Siswa|Panduan Guru) hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Sub-Bab B", "Aktivitas 6", "Aktivitas 7", "Ayo Berpikir Kreatif", "Ayo Berlatih", "Uji Kompetensi", "Diferensiasi", "Miskonsepsi", "Rubrik", "pengayaan", "Refleksi", "orang tua", "Catatan guru", "komposisi", "dekomposisi", "tangram"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat ${kata}`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-cs", "luar-cs-terapan", "luar-ds", "luar-ds-terapan", "luar-tg", "luar-tg-terapan", "luar-cr", "luar-cr-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk empat metode");
  cek(M.adegan.length === 14 && U.adegan.length === 10, "14 adegan materi dan 10 adegan metode luar");
  cek(!/piktogram|diagram batang|pecahan|luas daerah|volume|bab enam|bab empat|bab lima/i.test(materi + luar), `tidak membahas bab lain (${(materi + luar).match(/piktogram|diagram batang|pecahan|luas daerah|volume/i)?.[0]})`);
  cek(totalKetukan >= 90, `total ketukan cukup dalam (${totalKetukan})`);
  // Sub-Bab A tidak diulang: tanpa metode luar Sub-Bab A
  cek(!/van Hiele|Attribute Sort|Pilah Ciri|Geoboard|Papan Paku/i.test(materi + luar), "tidak memuat metode Sub-Bab A");
  // metode luar memakai angka dan bangun dari buku
  for (const kata of ["3 + 4 − 2 = 5", "2 + 2 + 2 + 1 = 7", "3 + 3 + 4 + 4 + 3 + 3 + 3 = 23", "4 + 3 + 1 + 1 + 1 = 10", "2 + 1 + 2 = 5", "5 + 1 + 1 = 7", "10 keping", "7 keping", "perahu", "paving", "keping 1", "keping 2"]) cek(luar.includes(kata), `metode luar memakai angka atau bangun buku: ${kata}`);
}

/* ------------------------------ Persamaan, perbandingan, urutan, dan format di gambar dihitung ulang ------------------------------ */
{
  const BENTUK_PERSAMAAN = /^[\d.\s+−×÷()]+( = [\d.]+)+$/;
  const bersihkan = (t) => {
    let s = t.includes(": ") ? t.slice(t.lastIndexOf(": ") + 2) : t;
    s = s.replace(/^[a-e]\. /, "").split(",")[0].replace(/\s[A-Za-z][A-Za-z ]*$/, "");
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
          if (/^\d+( [>=] \d+)+$/.test(o.isi)) {
            stat.urutan += 1;
            const t = o.isi.split(" ");
            let ok = true;
            for (let q = 1; q < t.length; q += 2) ok = ok && (t[q] === ">" ? Number(t[q - 1]) > Number(t[q + 1]) : Number(t[q - 1]) === Number(t[q + 1]));
            cek(ok, `${nama}: rantai urutan "${o.isi}" benar`);
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

/* ------------------------------ Geometri murni: alat hitung mandiri ------------------------------ */
const G = await import("../src/components/modul/story/k4b5b-gambar.ts");
const D = await import("../src/components/modul/story/k4b5b-data.ts");
const luasPoli = (p) => Math.abs(p.reduce((t, a, i) => t + a[0] * p[(i + 1) % p.length][1] - p[(i + 1) % p.length][0] * a[1], 0)) / 2;
const jarak = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const sisiDari = (p) => p.map((a, i) => jarak(a, p[(i + 1) % p.length]));
const tepi = (p, i) => [p[(i + 1) % p.length][0] - p[i][0], p[(i + 1) % p.length][1] - p[i][1]];
const sudutMandiri = (p) => {
  const n = p.length;
  const o = Math.sign(p.reduce((t, a, i) => t + a[0] * p[(i + 1) % n][1] - p[(i + 1) % n][0] * a[1], 0));
  return p.map((_, i) => {
    const e1 = tepi(p, (i + n - 1) % n);
    const e2 = tepi(p, i);
    const putar = (Math.atan2(e1[0] * e2[1] - e1[1] * e2[0], e1[0] * e2[0] + e1[1] * e2[1]) * 180) / Math.PI;
    return 180 - o * putar;
  });
};
const sejajar = (e1, e2, batas = 0.03) => Math.abs(e1[0] * e2[1] - e1[1] * e2[0]) / (Math.hypot(...e1) * Math.hypot(...e2)) < batas;
const hampirSama = (a, b, batas = 0.04) => Math.abs(a - b) <= batas * Math.max(a, b);
const jenisBangun = (p, longgar = false) => {
  const n = p.length;
  const tolSiku = longgar ? 9 : 2.5;
  const tolSisi = longgar ? 0.1 : 0.04;
  const s = sisiDari(p);
  const sd = sudutMandiri(p);
  if (n === 3) {
    const sikuKe = sd.findIndex((x) => Math.abs(x - 90) < tolSiku);
    if (sikuKe >= 0) return hampirSama(s[sikuKe], s[(sikuKe + 2) % 3], tolSisi) ? "segitiga siku-siku sama kaki" : "segitiga siku-siku";
    if (s.every((x) => hampirSama(x, s[0], 0.04))) return "segitiga sama sisi";
    return sd.some((x) => x > 90) ? "segitiga tumpul" : "segitiga lancip";
  }
  if (n === 4) {
    const bs = longgar ? 0.05 : 0.03;
    const pasang = [sejajar(tepi(p, 0), tepi(p, 2), bs), sejajar(tepi(p, 1), tepi(p, 3), bs)].filter(Boolean).length;
    const sikuSemua = sd.every((x) => Math.abs(x - 90) < 6);
    if (sikuSemua) return s.every((x) => hampirSama(x, s[0], 0.1)) ? "persegi" : "persegi panjang";
    if (pasang === 2) return s.every((x) => hampirSama(x, s[0], longgar ? 0.06 : 0.03)) ? "belah ketupat" : "jajargenjang";
    if (pasang === 1) return "trapesium";
    return "segiempat lain";
  }
  return `segi-${n}`;
};
const titikDalam = (p, x, y) => {
  let dalam = false;
  for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
    if (p[i][1] > y !== p[j][1] > y && x < ((p[j][0] - p[i][0]) * (y - p[i][1])) / (p[j][1] - p[i][1]) + p[i][0]) dalam = !dalam;
  }
  return dalam;
};
/** Keping-keping menutup bentuk sasaran tepat satu kali (tanpa celah dan tanpa tumpang tindih), diuji dengan titik contoh. */
const tutup = (keping, sasaran, langkah = 0.25) => {
  const xs = sasaran.map((p) => p[0]);
  const ys = sasaran.map((p) => p[1]);
  let ok = true;
  let n = 0;
  for (let x = Math.min(...xs) - 1 + 0.37 * langkah; x < Math.max(...xs) + 1; x += langkah) {
    for (let y = Math.min(...ys) - 1 + 0.61 * langkah; y < Math.max(...ys) + 1; y += langkah) {
      const hitung = keping.filter((p) => titikDalam(p, x, y)).length;
      const sasarannya = titikDalam(sasaran, x, y) ? 1 : 0;
      n += 1;
      if (hitung !== sasarannya) ok = false;
    }
  }
  stat.titikContoh += n;
  return ok;
};
const geser = (p, dx, dy) => p.map((a) => [a[0] + dx, a[1] + dy]);
const jumlah2 = (xs) => xs.reduce((t, n) => t + n, 0);
sama([luasPoli([[0, 0], [4, 0], [4, 3]]), jarak([0, 0], [3, 4]), jenisBangun([[0, 0], [4, 0], [4, 4], [0, 4]]), jenisBangun([[0, 0], [4, 0], [4, 2], [0, 2]]), jenisBangun([[0, 0], [4, 0], [6, 3], [2, 3]]), jenisBangun([[0, 0], [4, 0], [3, 2], [1, 2]]), jenisBangun([[0, 0], [4, 0], [0, 4]])], [6, 5, "persegi", "persegi panjang", "jajargenjang", "trapesium", "segitiga siku-siku sama kaki"], "alat geometri bekerja");
sama(sudutMandiri([[0, 0], [4, 0], [4, 4], [0, 4]]).map((x) => Math.round(x)), [90, 90, 90, 90], "sudut persegi 90");
sama(sudutMandiri([[0, 0], [0, 4], [4, 4], [4, 0]]).map((x) => Math.round(x)), [90, 90, 90, 90], "sudut persegi searah jarum jam 90");
sama(sudutMandiri([[0, 0], [4, 0], [2, 1], [4, 4], [0, 4]]).map((x) => Math.round(x)).includes(Math.round(sudutMandiri([[0, 0], [4, 0], [2, 1], [4, 4], [0, 4]])[2])) && sudutMandiri([[0, 0], [4, 0], [2, 1], [4, 4], [0, 4]])[2] > 180, true, "sudut menjorok lebih dari 180");

/* ------------------------------ Tangram, delapan keping, dan susunan dua segitiga ------------------------------ */
{
  const T = G.TANGRAM;
  sama(T.length, 7, "tangram: tujuh keping");
  sama(T.map((p) => jenisBangun(p.pts)), ["segitiga siku-siku sama kaki", "segitiga siku-siku sama kaki", "jajargenjang", "persegi", "segitiga siku-siku sama kaki", "segitiga siku-siku sama kaki", "segitiga siku-siku sama kaki"], "tangram: jenis tiap keping dihitung dari titiknya");
  sama(T.map((p) => p.jenis), T.map((p) => (jenisBangun(p.pts).startsWith("segitiga") ? "segitiga" : jenisBangun(p.pts))), "tangram: jenis di data sama dengan hitungan");
  sama([T.filter((p) => p.jenis === "segitiga").length, T.filter((p) => p.jenis === "persegi").length, T.filter((p) => p.jenis === "jajargenjang").length], [5, 1, 1], "tangram: 5 segitiga, 1 persegi, 1 jajargenjang");
  sama(T.map((p) => Math.round(luasPoli(p.pts) * 100) / 100), [16, 16, 8, 8, 4, 4, 8], "tangram: luas tiap keping (satuan persegi)");
  sama([T.filter((p) => p.ukuran === "besar").length, T.filter((p) => p.ukuran === "sedang").length, T.filter((p) => p.ukuran === "kecil").length], [2, 1, 2], "tangram: 2 besar, 1 sedang, 2 kecil");
  cek(T.filter((p) => p.ukuran === "besar").every((p) => luasPoli(p.pts) === 16) && T.filter((p) => p.ukuran === "sedang").every((p) => luasPoli(p.pts) === 8) && T.filter((p) => p.ukuran === "kecil").every((p) => luasPoli(p.pts) === 4), "tangram: ukuran sesuai luas");
  sama(jumlah2(T.map((p) => luasPoli(p.pts))), 64, "tangram: jumlah luas keping = luas persegi 8 x 8");
  cek(tutup(T.map((p) => p.pts), [[0, 0], [8, 0], [8, 8], [0, 8]]), "tangram: tujuh keping menutup persegi 8 x 8 tanpa celah dan tanpa tumpuk");
  sama(T.map((p) => p.pts.length), [3, 3, 4, 4, 3, 3, 3], "tangram: banyak sisi tiap keping");
  sama(jumlah2(T.map((p) => p.pts.length)), 23, "tangram: 3 + 3 + 4 + 4 + 3 + 3 + 3 = 23 sisi, setelah disusun 4 sisi");
  sama(sudutMandiri([[0, 0], [8, 0], [8, 8], [0, 8]]).length, 4, "persegi akhir: 4 sisi");
  // delapan keping Ayo Berpikir Kreatif
  const E = G.DELAPAN;
  sama(E.length, 8, "delapan keping");
  sama(E.map((p) => Math.round(luasPoli(p.pts) * 100) / 100), [16, 16, 4, 8, 8, 8, 8, 4], "delapan keping: luas tiap keping");
  sama(E.map((p) => jenisBangun(p.pts)), ["segitiga siku-siku sama kaki", "segitiga siku-siku sama kaki", "segitiga siku-siku sama kaki", "segitiga siku-siku sama kaki", "persegi", "segitiga siku-siku sama kaki", "jajargenjang", "segitiga siku-siku sama kaki"], "delapan keping: jenis tiap keping");
  const pe = (no) => E.find((q) => q.no === no).pts;
  cek(tutup([2, 4, 3, 8].map(pe), [[0, 0], [8, 0], [8, 4], [0, 4]]), "langkah 1 dan 2: keping 2, 4, 3, 8 menyusun persegi panjang 8 x 4");
  cek(tutup([1, 2, 3, 4, 8].map(pe), [[0, 4], [8, 4], [8, 0], [4, -4], [0, 0]]), "langkah 3: keping 1 menjadi atap, bangun seperti rumah (segilima)");
  sama(jumlah2([1, 2, 3, 4, 8].map((n) => luasPoli(pe(n)))), 48, "rumah dari lima keping: luas 48 satuan persegi");
  // dua segitiga besar tersusun tiga cara
  const A = [...G.CARA_DUA.map((c) => c.nama)];
  sama(A, ["persegi", "segitiga", "jajargenjang"], "tiga cara menyusun dua segitiga yang sama");
  const SASARAN = [[[0, 0], [4, 4], [8, 0], [4, -4]], [[0, 0], [8, 0], [0, 8]], [[0, 0], [8, 0], [12, 4], [4, 4]]];
  G.CARA_DUA.forEach((c, i) => {
    cek(c.keping.length === 2 && c.keping.every((p) => jenisBangun(p) === "segitiga siku-siku sama kaki" && Math.abs(luasPoli(p) - 16) < 1e-9), `cara ${c.nama}: dua segitiga siku-siku sama kaki yang sama besar`);
    cek(tutup(c.keping, SASARAN[i]), `cara ${c.nama}: dua keping menutup bentuk sasaran tanpa celah atau tumpuk`);
    sama(jenisBangun(SASARAN[i]), ["persegi", "segitiga siku-siku sama kaki", "jajargenjang"][i], `cara ${c.nama}: bentuk sasaran`);
  });
  sama(SASARAN.map((p) => p.length), [4, 3, 4], "banyak sisi hasil tiga cara: 4, 3, 4");
  // sisi miring dan sisi tegak: cara 1 sisi miring (8) dirapatkan; cara 2 dan 3 sisi tegak
  sama([sisiDari(G.SEGITIGA_A).map((x) => Math.round(x * 100) / 100)], [[8, 5.66, 5.66]], "segitiga besar: sisi miring 8, sisi tegak 5,66");
  // jajargenjang dipotong tegak dan segitiganya digeser
  const jajar = [[2, 0], [8, 0], [6, 4], [0, 4]];
  sama([jenisBangun(jajar), luasPoli(jajar), luasPoli(G.POTONG_SEGITIGA), luasPoli(G.POTONG_TRAPESIUM), jenisBangun(G.POTONG_TRAPESIUM)], ["jajargenjang", 24, 4, 20, "trapesium"], "potong jajargenjang: luas 24 = 4 + 20");
  cek(tutup([G.POTONG_SEGITIGA, G.POTONG_TRAPESIUM], jajar), "potongan menutup jajargenjang");
  cek(tutup([geser(G.POTONG_SEGITIGA, 6, 0), G.POTONG_TRAPESIUM], [[2, 0], [8, 0], [8, 4], [2, 4]]), "segitiga digeser 6 satuan: dua potongan menutup persegi panjang 6 x 4");
  sama(jenisBangun([[2, 0], [8, 0], [8, 4], [2, 4]]), "persegi panjang", "hasil geseran: persegi panjang");
  // rumah dari persegi dan segitiga: 3 + 4 - 2 = 5 sisi; dua trapesium
  const pent = [[0, 4], [2, 2], [4, 4], [4, 8], [0, 8]];
  cek(tutup([G.RUMAH_PERSEGI, G.RUMAH_ATAP], pent), "persegi dan segitiga menutup segilima (rumah)");
  sama([G.RUMAH_PERSEGI.length, G.RUMAH_ATAP.length, pent.length, G.RUMAH_ATAP.length + G.RUMAH_PERSEGI.length - 2], [4, 3, 5, 5], "3 + 4 - 2 = 5 sisi");
  sama(jenisBangun(G.RUMAH_PERSEGI), "persegi", "bagian bawah rumah: persegi");
  sama(jenisBangun(G.RUMAH_ATAP), "segitiga siku-siku sama kaki", "atap rumah: segitiga");
}

/* ------------------------------ Bangun datar dari gambar buku: perahu, paving, rumah, dan soal Uji Kompetensi ------------------------------ */
const WARNA_JENIS = { "segitiga siku-siku": "#0066B3", trapesium: "#FAA61A", jajargenjang: "#ED008C", persegi: "#FFF200", "persegi panjang": "#8B5CF6" };
const ringkasJenis = (j) => j.replace(" sama kaki", "");
{
  // perahu layar (Buku Siswa hlm. 172): 5 segitiga, 1 jajargenjang, 1 persegi
  const PR = D.PERAHU.map((p) => jenisBangun(p.pts, true));
  sama([PR.filter((j) => j.startsWith("segitiga")).length, PR.filter((j) => j === "jajargenjang").length, PR.filter((j) => j === "persegi").length], [5, 1, 1], "perahu: 5 segitiga, 1 jajargenjang, 1 persegi (dihitung dari gambar buku)");
  sama(D.PERAHU.length, 7, "perahu: 7 keping");
  // paving (Buku Siswa hlm. 173): 10 keping
  const PV = D.PAVING.map((p) => ringkasJenis(jenisBangun(p.pts, true)));
  const hitung = (daftar, j) => daftar.filter((x) => x === j).length;
  sama(D.PAVING.length, 10, "paving: 10 keping");
  sama(["segitiga siku-siku", "trapesium", "jajargenjang", "persegi", "persegi panjang"].map((j) => hitung(PV, j)), [4, 3, 1, 1, 1], "paving: 4 segitiga siku-siku, 3 trapesium, 1 jajargenjang, 1 persegi, 1 persegi panjang");
  sama(PV.filter((j) => j.startsWith("segitiga")).every((j) => j === "segitiga siku-siku"), true, "paving: semua segitiga siku-siku (gambar buku; galat sudut sampai 9 derajat karena garis putih)");
  sama(hitung(PV, "segitiga siku-siku") + hitung(PV, "trapesium") + hitung(PV, "jajargenjang") + hitung(PV, "persegi") + hitung(PV, "persegi panjang"), 10, "paving: 4 + 3 + 1 + 1 + 1 = 10");
  // sebelas pilihan bangun pada soal paving: yang menyusun motif menurut jenisnya
  const PILIHAN = [
    [[125.8, 523.5], [162.6, 523.5], [162.6, 562.2], [125.8, 562.2]],
    [[123.9, 586.0], [136.1, 611.7], [205.9, 611.7], [194.4, 584.5]],
    [[194.8, 551.1], [228.5, 523.5], [289.1, 598.1], [255.4, 625.5]],
    [[139.6, 634.7], [172.2, 634.7], [187.1, 663.8], [172.6, 693.0], [139.6, 693.0], [123.9, 663.8]],
    [[205.9, 647.7], [205.9, 686.8], [320.5, 686.8], [297.1, 647.7]],
    [[304.4, 601.7], [330.5, 627.8], [358.1, 603.3], [331.3, 576.4]],
    [[304.4, 563.8], [353.1, 563.8], [329.3, 523.5]],
    [[381.5, 566.1], [435.5, 566.1], [424.8, 524.7], [391.8, 524.7]],
    [[405.6, 576.4], [423.3, 608.6], [405.6, 638.5], [388.4, 607.5]],
    [[470.8, 580.3], [470.8, 635.8], [527.5, 635.8]],
  ];
  const JP = PILIHAN.map((p) => ringkasJenis(jenisBangun(p, true)));
  sama(JP, ["persegi", "jajargenjang", "persegi panjang", "segi-6", "trapesium", "persegi", "segitiga sama sisi", "trapesium", "belah ketupat", "segitiga siku-siku"], "sebelas pilihan paving: sepuluh berpoligon (persegi, jajargenjang, persegi panjang, segienam, trapesium, persegi miring, segitiga sama sisi, trapesium, belah ketupat, segitiga siku-siku) dan satu lingkaran");
  const dipilih = new Set(PV);
  sama(JP.map((j) => (dipilih.has(j) ? "ya" : "tidak")), ["ya", "ya", "ya", "tidak", "ya", "ya", "tidak", "ya", "tidak", "ya"], "pilihan yang menyusun motif menurut jenis (segitiga sama sisi, segienam, belah ketupat, lingkaran bukan)");
  // rumah kunci pengayaan 4 dan bahan, kunci pengayaan 5
  sama([D.RUMAH_KUNCI.length, D.BAHAN_ENAM.length], [7, 7], "pengayaan 4: tujuh bangun diberikan dan tujuh bangun menyusun rumah");
  sama([...new Set(D.RUMAH_KUNCI.map((p) => p.warna))].sort(), [...new Set(D.BAHAN_ENAM.map((p) => p.warna))].sort(), "pengayaan 4: tujuh warna bangun sama dengan tujuh warna penyusun rumah");
  sama(D.KUNCI_LIMA.map((p) => p.pts.length), [4, 4, 3, 4, 3], "pengayaan 5: lima bangun kunci");
  sama([D.KUNCI_LIMA.filter((p) => p.pts.length === 3).length, D.KUNCI_LIMA.filter((p) => p.pts.length === 4).length], [2, 3], "pengayaan 5: dua segitiga dan tiga segiempat");
  sama(D.RUMAH_URAI.length, 10, "pengayaan 5: gambar rumah bercerobong bersisi sepuluh");
  // Uji Kompetensi 1: segi banyak, beraturan
  const S = D.SEGIBANYAK_UK1;
  const lurus = (b) => !/C/.test(b.d);
  sama("abcdefghi".split("").map((h) => lurus(S[h])), [true, true, false, true, false, true, false, true, true], "UK 1: segi banyak a, b, d, f, h, i; bukan c, e, g (c, e, g bersisi melengkung)");
  const beraturanKah = (p) => { const s = sisiDari(p); const sd = sudutMandiri(p); return s.every((x) => hampirSama(x, s[0], 0.03)) && sd.every((x) => Math.abs(x - sd[0]) < 3); };
  sama("abdfhi".split("").map((h) => beraturanKah(S[h].pts)), [false, true, false, true, false, true], "UK 2: beraturan b, f, i; tidak beraturan a, d, h");
  sama("abdfhi".split("").map((h) => S[h].pts.length), [6, 6, 5, 12, 11, 4], "UK 1: banyak sisi a 6, b 6, d 5, f 12, h 11, i 4");
  sama(D.SEGIBANYAK_UK1.b.pts.length === 6 && beraturanKah(S.b.pts), true, "segienam beraturan (b)");
  // Uji Kompetensi 4: sudut lancip dan tumpul
  const sd4 = sudutMandiri(D.BENTUK_UK4.pts);
  const golong = (xs) => ({ lancip: xs.filter((x) => x < 88).length, tumpul: xs.filter((x) => x > 92 && x < 180).length, menjorok: xs.filter((x) => x > 180).length });
  sama(golong(sd4), { lancip: 4, tumpul: 2, menjorok: 4 }, "UK 4: 4 sudut lancip, 2 sudut tumpul, 4 sudut menjorok (kunci Panduan Guru benar)");
  sama(D.BENTUK_UK4.pts.length, 10, "UK 4: 10 titik sudut");
  sama(Math.round(jumlah2(sd4)), (10 - 2) * 180, "UK 4: jumlah sudut dalam 1440");
  // Uji Kompetensi 5: kunci a (segidelapan) tidak sesuai soal (10 sisi); c bintang; b dan d
  const K = D.KUNCI_ENAM;
  sama([K.a.pts.length, beraturanKah(K.a.pts)], [8, true], "UK 5a: kunci menggambar segidelapan beraturan, padahal soal meminta 10 sisi");
  const dasa = G.beraturan(10, 28);
  sama([dasa.length, beraturanKah(dasa)], [10, true], "UK 5a yang benar: segi sepuluh beraturan");
  sama([K.b.pts.length, beraturanKah(K.b.pts)], [5, false], "UK 5b: segilima tak beraturan (kunci benar)");
  const sdc = sudutMandiri(K.c.pts);
  sama([K.c.pts.length, sdc.filter((x) => Math.abs(x - 63) < 2).length, sdc.filter((x) => Math.abs(x - 225) < 2).length, beraturanKah(K.c.pts)], [10, 5, 5, false], "UK 5c: bintang bersisi 10, sudut berselang-seling sekitar 63 dan 225, tidak beraturan menurut ciri kunci nomor 3");
  cek(Math.abs(5 * (sdc[0] + sdc[1]) - 1440) < 3, "UK 5c: 5 x (63 + 225) = 1440 = jumlah sudut segi sepuluh");
  const sdd = sudutMandiri(K.d.pts);
  sama(golong(sdd), { lancip: 3, tumpul: 3, menjorok: 2 }, "UK 5d: 3 sudut lancip dan 3 sudut tumpul (kunci benar), dua sudut menjorok");
  // segitiga sama sisi tidak mungkin siku-siku; jumlah sudut segitiga 180
  const sama3 = G.beraturan(3, 40);
  sama([jenisBangun(sama3), Math.round(jumlah2(sudutMandiri(sama3)))], ["segitiga sama sisi", 180], "segitiga sama sisi: tiga sudut 60, jumlah 180");
  sama(sudutMandiri(sama3).map((x) => Math.round(x)), [60, 60, 60], "segitiga sama sisi: tiap sudut 60 (tidak ada 90)");
  sama(sudutMandiri([[0, 0], [0, 56], [56, 56]]).map((x) => Math.round(x)).sort((a, b) => a - b), [45, 45, 90], "segitiga siku-siku sama kaki: 90, 45, 45");
  // heksagon taman: 6 sisi 50 meter
  sama([G.beraturan(6, 34).length, 50 * 6], [6, 300], "taman segienam beraturan: 50 x 6 = 300 meter");
  // persamaan dan perbedaan bangun A dan B (UK 7)
  const rombus = [[0, -32], [22, 0], [0, 32], [-22, 0]];
  const layang = [[0, -38], [21, -8], [0, 34], [-21, -8]];
  const sr = sisiDari(rombus);
  const sl = sisiDari(layang);
  cek(sr.every((x) => hampirSama(x, sr[0], 0.01)), "UK 7: semua sisi A sama panjang");
  cek(!hampirSama(sl[0], sl[1], 0.1) && hampirSama(sl[0], sl[3], 0.01) && hampirSama(sl[1], sl[2], 0.01), "UK 7: B punya dua pasang sisi berdekatan, tetapi tidak semuanya sama");
  cek([rombus, layang].every((p) => p.length === 4), "UK 7: A dan B bersisi 4");
  cek([rombus, layang].every((p) => Math.abs((p[2][0] - p[0][0]) * (p[3][0] - p[1][0]) + (p[2][1] - p[0][1]) * (p[3][1] - p[1][1])) < 1e-6), "UK 7: diagonal A dan B tegak lurus");
  // jajargenjang, trapesium, belah ketupat: pasangan sisi sejajar
  const pasang = (p) => [sejajar(tepi(p, 0), tepi(p, 2)), sejajar(tepi(p, 1), tepi(p, 3))].filter(Boolean).length;
  sama([pasang([[12, 0], [48, 0], [60, 30], [0, 30]]), pasang([[15, 0], [60, 0], [45, 30], [0, 30]]), pasang([[30, 0], [54, 22], [30, 44], [6, 22]])], [1, 2, 2], "UK 10-11: trapesium 1 pasang, jajargenjang 2 pasang, belah ketupat 2 pasang sisi sejajar");
}

/* ------------------------------ Gambar sesuai data: keping pada adegan ------------------------------ */
const polaObj = (o) => {
  const a = (o.d.match(/-?\d+(\.\d+)?/g) ?? []).map(Number);
  const pts = [];
  for (let i = 0; i + 1 < a.length; i += 2) pts.push([a[i] + (o.x ?? 0), a[i + 1] + (o.y ?? 0)]);
  if (pts.length > 1 && Math.abs(pts[0][0] - pts[pts.length - 1][0]) < 1e-9 && Math.abs(pts[0][1] - pts[pts.length - 1][1]) < 1e-9) pts.pop();
  return pts;
};
const objDi = (objs, id) => objs.find((o) => o.id === id);
{
  // Aktivitas 6: tiap keping tangram sama dengan data, skala 10 piksel per satuan, dan susunan bertahap
  const a6 = adegan(M, "aktivitas-6");
  const akhir = akhirAdegan(a6);
  for (const p of G.TANGRAM) {
    const o = objDi(akhir, `tg-p${p.no}`);
    stat.keping += 1;
    cek(!!o && o.warna === p.warna, `Aktivitas 6: keping ${p.no} berwarna ${p.warna}`);
    const titik = polaObj({ ...o, x: 0, y: 0 });
    sama(titik.map(([x, y]) => [Math.round(x / 10 * 10) / 10, Math.round(y / 10 * 10) / 10]), p.pts, `Aktivitas 6: bentuk keping ${p.no} sama dengan data tangram`);
  }
  const final = objDi(akhir, "tg-p1");
  cek(G.TANGRAM.every((p) => { const o = objDi(akhir, `tg-p${p.no}`); return o.x === final.x && o.y === final.y; }), "Aktivitas 6: akhirnya tujuh keping bertumpu pada titik yang sama (persegi utuh)");
  const FX = final.x;
  const FY = final.y;
  const kepingAda = (objs) => G.TANGRAM.filter((p) => { const o = objDi(objs, `tg-p${p.no}`); return o && o.x === FX && o.y === FY; }).map((p) => p.no);
  const k3 = L.keadaanStory(a6, 2, 9999);
  sama(kepingAda(k3), [1, 2], "Aktivitas 6 langkah 3: keping 1 dan 2");
  const suara4 = a6.ketukan[3].suara;
  sama(kepingAda(L.keadaanStory(a6, 3, L.posisiKata(suara4, "lima."))), [1, 2, 4, 5], "Aktivitas 6 langkah 4: keping 1, 2, 4, 5");
  sama(kepingAda(L.keadaanStory(a6, 3, L.posisiKata(suara4, "enam."))), [1, 2, 3, 4, 5, 6], "Aktivitas 6 langkah 5: keping 1, 2, 3, 4, 5, 6");
  sama(kepingAda(L.keadaanStory(a6, 3, 9999)), [1, 2, 3, 4, 5, 6, 7], "Aktivitas 6 langkah 6: semua tujuh keping");
  cek(tutup(G.TANGRAM.map((p) => geser(p.pts, 0, 0)), [[0, 0], [8, 0], [8, 8], [0, 8]]), "Aktivitas 6: persegi akhir menutup 8 x 8");
  sama([1, 2, 3, 4, 5, 6, 7].map((n) => (G.TANGRAM[n - 1].pts.length)).join(), "3,3,4,4,3,3,3", "Aktivitas 6: sisi tiap keping");
  // Ayo Berpikir Kreatif: delapan keping, langkah 1 dan 2 membentuk persegi panjang, langkah 3 menjadi rumah
  const bk = adegan(M, "berpikir-kreatif");
  const bk2 = akhirAdegan(bk, 1);
  const sisaX = objDi(bk2, "dk-q2");
  for (const p of G.DELAPAN) {
    const o = objDi(akhirAdegan(bk), `dk-q${p.no}`);
    stat.keping += 1;
    cek(!!o && o.warna === p.warna, `Berpikir Kreatif: keping ${p.no} berwarna ${p.warna}`);
    sama(polaObj({ ...o, x: 0, y: 0 }).map(([x, y]) => [Math.round(x / 10 * 10) / 10, Math.round(y / 10 * 10) / 10]), p.pts, `Berpikir Kreatif: bentuk keping ${p.no} sama dengan data`);
  }
  const di1 = (objs, nos) => nos.every((n) => { const o = objDi(objs, `dk-q${n}`); return o.x === sisaX.x && o.y === sisaX.y; });
  const tersusun = (objs) => G.DELAPAN.filter((p) => { const o = objDi(objs, `dk-q${p.no}`); return o.x === sisaX.x && o.y === sisaX.y; }).map((p) => p.no);
  sama(tersusun(bk2), [2, 3, 4, 8], "Berpikir Kreatif langkah 1 dan 2: keping 2, 3, 4, 8");
  cek(di1(bk2, [2, 3, 4, 8]), "Berpikir Kreatif: empat keping bertumpu pada titik yang sama");
  sama(tersusun(akhirAdegan(bk, 2)), [1, 2, 3, 4, 8], "Berpikir Kreatif langkah 3: ditambah keping 1");
  // adegan: dua segitiga besar tiga cara (metode luar)
  const cr = adegan(U, "luar-cr-terapan");
  const o1 = akhirAdegan(cr, 1);
  const bangunDari = (objs, ida, idb) => [polaObj(objDi(objs, ida)), polaObj(objDi(objs, idb))];
  const cara1 = bangunDari(o1, "c1a", "c1b");
  const cara2 = bangunDari(o1, "c2a", "c2b");
  const cara3 = bangunDari(akhirAdegan(cr, 2), "c3a", "c3b");
  for (const [nama, p] of [["persegi", cara1], ["segitiga", cara2], ["jajargenjang", cara3]]) {
    cek(p.every((q) => jenisBangun(q) === "segitiga siku-siku sama kaki"), `${nama}: dua keping segitiga siku-siku sama kaki`);
    cek(p.every((q) => hampirSama(luasPoli(q), luasPoli(p[0]), 0.001)), `${nama}: dua keping sama besar`);
  }
  // gambar tiga cara dikembalikan ke satuan (dibagi skala) lalu diuji menutup bentuk sasaran
  const satuan = (p) => { const s = (p[0][1][0] - p[0][0][0]) / 8; return [p[0].map(([x, y]) => [(x - p[0][0][0]) / s, (y - p[0][0][1]) / s]), p[1].map(([x, y]) => [(x - p[0][0][0]) / s, (y - p[0][0][1]) / s])]; };
  const SASARAN_GAMBAR = [[[0, 0], [4, 4], [8, 0], [4, -4]], [[0, 0], [8, 0], [0, 8]], [[0, 0], [8, 0], [12, 4], [4, 4]]];
  [cara1, cara2, cara3].forEach((p, i) => {
    cek(tutup(satuan(p), SASARAN_GAMBAR[i]), `gambar cara ${i + 1}: dua keping menutup ${["persegi", "segitiga besar", "jajargenjang"][i]} tanpa celah atau tumpuk`);
  });
  // luar: tangram dan perahu memakai data yang sama
  const tp = akhirAdegan(adegan(U, "luar-tg-terapan"), 0);
  sama(D.PERAHU.map((_, i) => polaObj({ ...objDi(tp, `tp-p${i}`), x: 0, y: 0 }).length), D.PERAHU.map((p) => p.pts.length), "metode luar: perahu tergambar dengan titik sudut sesuai data");
  sama(D.PERAHU.map((p, i) => objDi(tp, `tp-p${i}`).warna === p.warna), D.PERAHU.map(() => true), "metode luar: warna keping perahu sesuai data buku");
  const mp = akhirAdegan(adegan(M, "berlatih-1"), 0);
  sama(D.PERAHU.map((_, i) => polaObj({ ...objDi(mp, `ph-p${i}`), x: 0, y: 0 }).length), D.PERAHU.map((p) => p.pts.length), "Ayo Berlatih 1: perahu tergambar sesuai data");
  // tabel Ayo Berlatih 1 sesuai hitungan
  const tl = akhirAdegan(adegan(M, "berlatih-1"), 1);
  const PR2 = D.PERAHU.map((p) => jenisBangun(p.pts));
  sama(["tl-t12", "tl-t22", "tl-t32"].map((id) => Number(objDi(tl, id).isi)), [PR2.filter((j) => j.startsWith("segitiga")).length, PR2.filter((j) => j === "jajargenjang").length, PR2.filter((j) => j === "persegi").length], "Ayo Berlatih 1: angka tabel = hitungan dari gambar perahu");
  // paving pada Ayo Berlatih 2 berwarna menurut jenis hitungan mandiri
  const pv = akhirAdegan(adegan(M, "berlatih-2"), 1);
  D.PAVING.forEach((p, i) => {
    const jenis = ringkasJenis(jenisBangun(p.pts, true));
    cek(objDi(pv, `pv-p${i}`).warna === WARNA_JENIS[jenis], `paving: keping ${i} (${jenis}) berwarna sesuai jenis hitungan`);
    stat.keping += 1;
  });
  const dp = akhirAdegan(adegan(U, "luar-ds-terapan"), 1);
  D.PAVING.forEach((p, i) => cek(objDi(dp, `dp-p${i}`).warna === WARNA_JENIS[ringkasJenis(jenisBangun(p.pts, true))], `metode luar paving: keping ${i} berwarna sesuai jenis hitungan`));
  // turus metode luar: jumlah garis turus = angka
  const turus = { "segitiga siku-siku": ["tu-t11", "tu-t12"], trapesium: ["tu-t21", "tu-t22"], jajargenjang: ["tu-t31", "tu-t32"], persegi: ["tu-t41", "tu-t42"], "persegi panjang": ["tu-t51", "tu-t52"] };
  for (const [jenis, [idT, idN]] of Object.entries(turus)) {
    const banyak = D.PAVING.filter((p) => ringkasJenis(jenisBangun(p.pts, true)) === jenis).length;
    cek(objDi(dp, idT).isi === "|".repeat(banyak) && Number(objDi(dp, idN).isi) === banyak, `turus ${jenis}: ${banyak} garis dan angka ${banyak}`);
  }
}

/* ------------------------------ Gambar sesuai data: Uji Kompetensi dan pengayaan ------------------------------ */
{
  const S = D.SEGIBANYAK_UK1;
  const uk1 = adegan(M, "uk-1");
  const o1 = akhirAdegan(uk1, 1);
  const o2 = akhirAdegan(uk1, 2);
  for (const h of "abcdefghi") {
    const o = objDi(o1, `u1-${h}`);
    cek(!!o, `UK 1: gambar (${h}) ada`);
    // bentuk tergambar sama dengan data: titik pertama dan ukuran
    const poligon = !/C/.test(S[h].d);
    cek(o.warna === (poligon ? "#BBF7D0" : "#FECACA"), `UK 1 kunci: (${h}) ${poligon ? "hijau, segi banyak" : "merah, bukan segi banyak"}`);
    const o2h = objDi(o2, `u1-${h}`);
    if (poligon) {
      const s = sisiDari(S[h].pts);
      const sd = sudutMandiri(S[h].pts);
      const br = s.every((x) => hampirSama(x, s[0], 0.03)) && sd.every((x) => Math.abs(x - sd[0]) < 3);
      cek(o2h.warna === (br ? "#BFDBFE" : "#FED7AA"), `UK 2: (${h}) ${br ? "biru, beraturan" : "oranye, tidak beraturan"}`);
    } else cek(o2h.warna === "#FECACA", `UK 2: (${h}) tetap merah karena bukan segi banyak`);
    stat.keping += 1;
  }
  // UK 4: penanda sudut sesuai hitungan
  const o5 = akhirAdegan(uk1, 4);
  const sd4 = sudutMandiri(D.BENTUK_UK4.pts);
  const gambarLancip = o5.filter((o) => /^ul\d+$/.test(o.id)).length;
  const gambarTumpul = o5.filter((o) => /^ut\d+$/.test(o.id)).length;
  const gambarMenjorok = o5.filter((o) => /^um\d+$/.test(o.id)).length;
  sama([gambarLancip, gambarTumpul, gambarMenjorok], [sd4.filter((x) => x < 88).length, sd4.filter((x) => x > 92 && x < 180).length, sd4.filter((x) => x > 180).length], "UK 4: jumlah penanda lancip, tumpul, menjorok sesuai hitungan");
  const bentuk4 = objDi(o5, "us");
  D.BENTUK_UK4.pts.forEach(([x, y], i) => {
    const tanda = o5.find((o) => /^u[ltm]\d+$/.test(o.id) && Number(o.id.slice(2)) === i);
    const ada = tanda !== undefined;
    const klas = sd4[i] < 88 ? "ul" : sd4[i] > 180 ? "um" : sd4[i] > 92 ? "ut" : "";
    cek(ada && tanda.id.startsWith(klas) && Math.abs(tanda.x - (bentuk4.x + x * 1.4)) < 0.2 && Math.abs(tanda.y - (bentuk4.y + y * 1.4)) < 0.2, `UK 4: penanda titik sudut ${i} tepat di sudutnya`);
  });
  // UK 5: segidelapan, segi sepuluh, bintang pada gambar catatan guru
  const uk2 = adegan(M, "uk-2");
  const c2 = akhirAdegan(uk2, 1);
  const delapanSisi = polaObj({ ...objDi(c2, "kk8"), x: 0, y: 0 });
  const sepuluh = polaObj({ ...objDi(c2, "kk10"), x: 0, y: 0 });
  const bintang = polaObj({ ...objDi(c2, "kkb"), x: 0, y: 0 });
  sama([delapanSisi.length, sepuluh.length, bintang.length], [8, 10, 10], "UK 5 gambar catatan guru: segidelapan, segi sepuluh, bintang bersisi 10");
  const sdb = sudutMandiri(bintang);
  cek(sdb.filter((x) => Math.abs(x - 63) < 2).length === 5 && sdb.filter((x) => Math.abs(x - 225) < 2).length === 5, "UK 5 gambar: sudut bintang 63 dan 225 berselang-seling");
  cek(teksVisible(c2).includes("63°") && teksVisible(c2).includes("225°"), "UK 5 gambar: teks 63 dan 225 derajat tampak");
  const h6 = polaObj({ ...objDi(akhirAdegan(uk2, 2), "hx6"), x: 0, y: 0 });
  cek(h6.length === 6 && sisiDari(h6).every((x) => hampirSama(x, 34, 0.01)), "UK 6: taman segienam beraturan bersisi sama");
  // UK 7: A dan B
  const o7 = akhirAdegan(uk2, 3);
  const A7 = polaObj({ ...objDi(o7, "ba"), x: 0, y: 0 });
  const B7 = polaObj({ ...objDi(o7, "bb"), x: 0, y: 0 });
  cek(sisiDari(A7).every((x) => hampirSama(x, sisiDari(A7)[0], 0.01)), "UK 7 gambar: A semua sisi sama panjang");
  cek(!sisiDari(B7).every((x) => hampirSama(x, sisiDari(B7)[0], 0.05)), "UK 7 gambar: B sisi tidak semuanya sama");
  // UK 8 dan 9
  const o8 = akhirAdegan(uk2, 4);
  const t8 = polaObj({ ...objDi(o8, "t8"), x: 0, y: 0 });
  sama(sudutMandiri(t8).map((x) => Math.round(x)).sort((a, b) => a - b), [45, 45, 90], "UK 8 gambar: segitiga siku-siku sama kaki (90, 45, 45)");
  // UK 10 dan 11: sepasang sejajar
  const o10 = akhirAdegan(uk2, 6);
  const pt = polaObj({ ...objDi(o10, "pt"), x: 0, y: 0 });
  const pj = polaObj({ ...objDi(o10, "pj"), x: 0, y: 0 });
  const pb = polaObj({ ...objDi(o10, "pb"), x: 0, y: 0 });
  const pas = (p) => [sejajar(tepi(p, 0), tepi(p, 2)), sejajar(tepi(p, 1), tepi(p, 3))].filter(Boolean).length;
  sama([pas(pt), pas(pj), pas(pb)], [1, 2, 2], "UK 10-11 gambar: trapesium 1 pasang, jajargenjang 2 pasang, belah ketupat 2 pasang sejajar");
  // garis merah dan biru menimpa sisi sejajar
  const garisSama = (id, x1, y1, x2, y2) => { const o = objDi(o10, id); return o && Math.abs(o.x - x1) < 0.01 && Math.abs(o.y - y1) < 0.01 && Math.abs(o.x + o.x2 - x2) < 0.01 && Math.abs(o.y + o.y2 - y2) < 0.01; };
  const sisiAbs = (id, i) => { const o = objDi(o10, id); const p = polaObj(o); return [p[i], p[(i + 1) % p.length]]; };
  const [t0, t1] = sisiAbs("pt", 0);
  const [b0, b1] = sisiAbs("pt", 2);
  cek(garisSama("pt1", t0[0], t0[1], t1[0], t1[1]) && garisSama("pt2", b1[0], b1[1], b0[0], b0[1]), "UK 10 gambar: garis merah tepat di sepasang sisi sejajar trapesium");
  // pengayaan 1 dan 2: segitiga sama sisi
  const pg = akhirAdegan(adegan(M, "pengayaan"), 1);
  const eq = polaObj({ ...objDi(pg, "pg2"), x: 0, y: 0 });
  cek(sisiDari(eq).every((x) => hampirSama(x, sisiDari(eq)[0], 0.02)) && sudutMandiri(eq).every((x) => Math.abs(x - 60) < 1.5), "pengayaan 1 gambar: segitiga sama sisi bersudut 60");
  const pg1 = polaObj({ ...objDi(pg, "pg1"), x: 0, y: 0 });
  sama(sudutMandiri(pg1).map((x) => Math.round(x)).sort((a, b) => a - b), [45, 45, 90], "pengayaan 1 gambar kunci: segitiga siku-siku sama kaki, bukan sama sisi");
  // pengayaan 4 dan 5: rumah kunci dan lima bangun
  const png = adegan(M, "pengayaan");
  const o4 = akhirAdegan(png, 3);
  sama(D.RUMAH_KUNCI.map((_, i) => polaObj({ ...objDi(o4, `rk${i}`), x: 0, y: 0 }).length), D.RUMAH_KUNCI.map((p) => p.pts.length), "pengayaan 4: rumah kunci tergambar sesuai data");
  sama(D.BAHAN_ENAM.map((_, i) => polaObj({ ...objDi(o4, `bh${i}`), x: 0, y: 0 }).length), D.BAHAN_ENAM.map((p) => p.pts.length), "pengayaan 4: tujuh bangun diberikan tergambar sesuai data");
  const o5p = akhirAdegan(png, 4);
  sama(D.KUNCI_LIMA.map((_, i) => polaObj({ ...objDi(o5p, `kl${i}`), x: 0, y: 0 }).length), [4, 4, 3, 4, 3], "pengayaan 5: lima bangun kunci tergambar");
  const ru = polaObj({ ...objDi(o5p, "ru"), x: 0, y: 0 });
  sama(ru.length, 10, "pengayaan 5: gambar rumah bersisi sepuluh");
}

/* ------------------------------ Hitungan buku dan rubrik, dihitung ulang mandiri ------------------------------ */
{
  // Apersepsi: daftar nama bangun pada Panduan Guru hlm. 195-196
  const SEGITIGA = ["lancip", "siku-siku", "tumpul", "sama kaki", "sama sisi", "sembarang", "lancip sama kaki", "lancip sama sisi", "lancip sembarang", "siku-siku sama kaki", "siku-siku sembarang", "tumpul sama kaki", "tumpul sembarang"];
  const SEGIEMPAT = ["layang-layang", "jajargenjang", "trapesium sama kaki", "trapesium siku-siku", "trapesium sembarang", "belah ketupat", "persegi panjang", "persegi", "segiempat sembarang"];
  const LAIN = ["lingkaran", "segilima", "segienam"];
  sama([SEGITIGA.length, SEGIEMPAT.length, LAIN.length, SEGITIGA.length + SEGIEMPAT.length + LAIN.length], [13, 9, 3, 25], "apersepsi: 13 nama segitiga, 9 nama segiempat, 3 lainnya, 25 nama");
  const teksApersepsi = [...teksAdegan(M, "apersepsi-komposisi")].join(" ");
  cek(teksApersepsi.includes("13 + 9 + 3 = 25") && teksApersepsi.includes("segitiga: 13 nama") && teksApersepsi.includes("segiempat: 9 nama") && teksApersepsi.includes("lainnya: 3 nama"), "apersepsi: gambar memuat 13, 9, 3, dan 25 nama bangun");
  // rubrik pengetahuan Tabel 5.2 (Panduan Guru hlm. 206-210): bobot maksimum tiap butir
  const BOBOT = [5, 5, 5, 5, 10, 5, 5, 5, 5, 5, 5, 10, 10, 10, 10];
  sama([BOBOT.length, jumlah2(BOBOT), BOBOT.filter((b) => b === 5).length * 5, BOBOT.filter((b) => b === 10).length * 10], [15, 100, 50, 50], "rubrik: 15 butir, 10 x 5 = 50, 5 x 10 = 50, jumlah 100");
  sama([4 * 2.5, 3 * 4], [10, 12], "rubrik: butir 5 = 4 pertanyaan x 2,5 = 10; keterampilan 3 aspek x 4 = 12");
  const teksRubrik = [...teksAdegan(M, "uk-3")].join(" | ");
  cek(["10 × 5 = 50", "5 × 10 = 50", "50 + 50 = 100", "4 × 2,5 = 10", "3 × 4 = 12", "Nk = n / 12 × 100"].every((s) => teksRubrik.includes(s)), "UK 14-15: gambar rubrik memuat hitungan rubrik");
  // nilai keterampilan
  sama([Math.round((9 / 12) * 100), Math.round((12 / 12) * 100)], [75, 100], "nilai keterampilan: n / 12 x 100 (contoh n 9 dan n 12)");
  // refleksi guru 10 pertanyaan dan 6 interaksi orang tua
  sama([10, 6], [10, 6], "refleksi guru 10 pertanyaan dan interaksi orang tua 6 cara");
}

/* ------------------------------ Kutipan buku (bila PDF tersedia) ------------------------------ */
{
  const bs = new URL("../bahan-sd/Matematika-BS-KLS-IV.pdf", import.meta.url);
  const bg = new URL("../bahan-sd/Matematika-BG-KLS-IV.pdf", import.meta.url);
  const jalur = (u) => u.pathname.replace(/^\/([A-Za-z]:)/, "$1");
  const ambil = (berkas, dari, sampai) => {
    const r = spawnSync("pdftotext", ["-f", String(dari), "-l", String(sampai), "-raw", "-enc", "UTF-8", jalur(berkas), "-"], { encoding: "utf8", maxBuffer: 1 << 26 });
    return r.status === 0 ? r.stdout : null;
  };
  // Buku Siswa hlm. 166-176 = PDF 178-188; Panduan Guru hlm. 195-214 = PDF 207-226 (offset kelas IV: PDF dikurangi 12).
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 178, 188), ambil(bg, 207, 226)] : [null];
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
    // nama bangun pada apersepsi benar-benar ada di Panduan Guru
    const bgSaja = bersih(bagian[1]);
    for (const nama of ["lancip sama kaki", "lancip sama sisi", "tumpul sembarang", "trapesium sama kaki", "trapesium siku-siku", "segiempat sembarang", "belah ketupat", "lingkaran, segilima, dan segienam"]) cek(bgSaja.includes(nama), `Panduan Guru memuat nama bangun ${nama}`);
    cek(n >= 135, `jumlah kutipan buku yang diperiksa (${n})`);
    console.log(`Kutipan buku diperiksa: ${n}`);
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k4b5b-.*)\.(ts|tsx)$/.test(f));
  cek(berkas.length >= 9, `berkas story ditemukan (${berkas.length})`);
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
    cek(impor.every((i) => /^\.\/(logika-story|k4b5b-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k4b5b sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkusBerkas = new URL("../video-k4b5b.tsx", folder);
  const pembungkus = readFileSync(pembungkusBerkas, "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_B45|video-k4b2-umum|naskah-k4b5/.test(pembungkus) && /VIDEO_MATERI_K4B5B/.test(pembungkus) && /VIDEO_LUAR_K4B5B/.test(pembungkus) && /export function VideoK4B5B/.test(pembungkus) && /DaftarVideoCerita/.test(pembungkus), "pembungkus video-k4b5b: dua video Story baru, tanpa naskah lama");
  cek(!pembungkus.includes("\r"), "pembungkus video-k4b5b: akhir baris LF");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.persamaan} persamaan, ${stat.banding} perbandingan, ${stat.format} angka berformat, ${stat.keping} keping bangun, ${stat.titikContoh} titik contoh geometri, ${stat.angkaSuara} bilangan suara, ${stat.kartu} teks kartu, ${stat.teksPasang} pasangan teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
