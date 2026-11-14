// Uji Story Kelas 4 Bab 6 Sub-Bab B (Diagram Batang, penutup bab): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar (bilangan >= 100 yang diucapkan dengan kata dibaca ulang menjadi angka), perubahan gambar tiap ketukan,
// keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar, kutipan buku (bila PDF ada), persamaan di gambar dihitung ulang,
// geometri diagram batang (tinggi atau lebar batang = nilai x satuan skala, angka batang, jumlah ikon piktogram), hitungan mandiri data buku
// (Aktivitas 3-4, Ayo Berlatih 1-2, Uji Kompetensi 1-3, soal pengayaan 1-5, rubrik, kunci Panduan Guru), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k4b6b.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/[.][a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b6b-video.ts");

const stat = { persamaan: 0, banding: 0, urutan: 0, angkaSuara: 0, teksPasang: 0, batang: 0, ikon: 0, format: 0, kartu: 0 };
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
const jumlah = (xs) => xs.reduce((t, n) => t + n, 0);
const maksDari = (data) => Object.keys(data).reduce((m, n) => (data[n] > data[m] ? n : m));
const minDari = (data) => Object.keys(data).reduce((m, n) => (data[n] < data[m] ? n : m));

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

const VIDEO = [V.VIDEO_MATERI_K4B6B, V.VIDEO_LUAR_K4B6B];
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
const M = V.VIDEO_MATERI_K4B6B;
const U = V.VIDEO_LUAR_K4B6B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const di = (v, id, ke) => akhirAdegan(adegan(v, id), ke);
const teksVisible = (objs) => objs.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi).map((o) => o.isi);
/** Semua teks yang pernah tampak di sebuah adegan (gabungan semua ketukan). */
const teksAdegan = (v, id) => new Set(adegan(v, id).ketukan.flatMap((kt, i) => L.kataDari(kt.suara).flatMap((_, p) => teksVisible(L.keadaanStory(adegan(v, id), i, p)))));
{
  const teksVideo = (v) => JSON.stringify(seluruhTeks(v));
  const NAMA_METODE = /Bar Scale|Axis Labels|Compare Bars|Table to Bar|metode luar|metode dari luar/i;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Bar Scale", "Axis Labels", "Compare Bars", "Table to Bar"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(M.adegan.every((a) => /(Buku Siswa|Panduan Guru) hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Sub-Bab B", "Aktivitas 3", "Aktivitas 4", "Ayo Mengamati", "Ayo Berlatih", "Uji Kompetensi", "Diferensiasi", "Project Based Learning", "Rubrik", "pengayaan", "Refleksi", "Remedial", "orang tua", "Catatan guru", "skala"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat ${kata}`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-bs", "luar-bs-terapan", "luar-al", "luar-al-terapan", "luar-cb", "luar-cb-terapan", "luar-tb", "luar-tb-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk empat metode");
  cek(M.adegan.length === 13 && U.adegan.length === 10, "13 adegan materi dan 10 adegan metode luar");
  cek(!/piktogram skala|pecahan|bkelilingb|KPK|FPB|luas daerah|sudut|bab lima|bab tujuh|bab delapan|bab sembilan/i.test(materi + luar), `tidak membahas bab lain (${(materi + luar).match(/pecahan|bkelilingb|KPK|FPB|luas daerah|sudut|bab lima|bab tujuh/i)?.[0]})`);
  cek(totalKetukan >= 80, `total ketukan cukup dalam (${totalKetukan})`);
  for (const kata of ["Sepak Bola", "Matematika", "Puisi", "Menyanyi", "Renang", "Bulu Tangkis", "mawar", "kertas", "Taplak Meja", "Jawa", "Melayu", "Minang", "19", "(2 + 4) ÷ 2 = 3"].filter((s) => s !== "19")) cek(luar.toLowerCase().includes(kata.toLowerCase()), `metode luar memakai data buku: ${kata}`);
  cek(!/skala satu satuan.*Bar Scale/i.test(materi), "video materi tanpa istilah metode luar");
  // Sub-Bab A tidak diulang: tidak ada gambar piktogram bersekala besar di video B kecuali pengingat Uji Kompetensi dan pengayaan
  cek(!/Kunci Piktogram|Turus Kategori|Baca Lalu Banding|Pictograph Key|Categorical Tally|Read then Compare/i.test(materi + luar), "tidak memuat metode Sub-Bab A");
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

/* ------------------------------ Geometri diagram batang dan piktogram ------------------------------ */
// nilai tiap kategori yang harus tergambar (sesuai gambar Buku Siswa dan Panduan Guru yang dibaca mandiri)
const DATA = {
  // materi
  ek: [9, 1, 5, 2, 6],
  lm: [15, 6, 11, 3, 6],
  bg: [7, 8, 3, 4, 9, 5],
  um: [4, 1, 3, 1, 2],
  ut: [4, 1, 3, 1, 2],
  pr: [8, 2, 5, 7, 3, 5],
  sp: [57, 54, 58, 56, 62, 59],
  sk: [10, 7, 7],
  pb: [12, 9, 17, 15, 11, 9, 13],
  ap: [65, 105, 55, 70, 65, 45, 95, 80, 70, 75, 75, 70],
  // metode luar
  bs: [9, 1, 5, 2, 6],
  bt: [15, 6, 11, 3, 6],
  al: [9, 1, 5, 2, 6],
  at: [7, 8, 3, 4, 9, 5],
  cb: [8, 5, 5],
  cp: [8, 2, 5, 7, 3, 5],
  tb: [4, 1, 3, 1, 2],
  tc: [10, 7, 7],
};
const IKON = { up: [4, 1, 3, 1, 2], tp: [3, 14, 5, 8], bt: [4, 5, 6, 3, 2] };
{
  const dipakai = new Set();
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        const objs = akhirAdegan(a, i);
        const nama = `${v.id}/${a.id}#${i + 1}`;
        const idDi = (id) => objs.find((o) => o.id === id);
        const prefiks = new Set(objs.map((o) => o.id.match(/^([a-z0-9]+)-b\d+$/)?.[1]).filter(Boolean));
        for (const p of prefiks) {
          if (!DATA[p]) continue;
          dipakai.add(p);
          const batang = objs.filter((o) => new RegExp(`^${p}-b\\d+$`).test(o.id) && o.t === "kotak");
          const tegak = batang.every((b) => Math.abs(b.y + b.h - (batang[0].y + batang[0].h)) < 0.01);
          const mendatar = batang.every((b) => Math.abs(b.x - batang[0].x) < 0.01);
          cek(tegak || mendatar, `${nama}: batang ${p} sejajar pada satu garis dasar`);
          // satuan skala dari angka sumbu: p-y{v}
          const tanda = objs.filter((o) => new RegExp(`^${p}-y\\d+$`).test(o.id) && Number(o.isi) > 0);
          cek(tanda.length >= 2, `${nama}: angka skala ${p} ada`);
          if (tanda.length < 2) continue;
          const unitDari = (o) => (tegak ? (batang[0].y + batang[0].h - (o.y - 2.2)) / Number(o.isi) : (o.x - batang[0].x) / Number(o.isi));
          const unit = unitDari(tanda[0]);
          for (const o of tanda) cek(Math.abs(unitDari(o) - unit) < 0.01, `${nama}: skala ${p} merata di angka ${o.isi}`);
          // skala naik beraturan
          const nilaiTanda = tanda.map((o) => Number(o.isi)).sort((m, n) => m - n);
          const langkah = nilaiTanda[0];
          cek(nilaiTanda.every((n, q) => n === langkah * (q + 1)), `${nama}: angka skala ${p} naik beraturan (${nilaiTanda.join(",")})`);
          for (const b of batang) {
            const q = Number(b.id.match(/(\d+)$/)[1]);
            const ukuran = tegak ? b.h : b.w;
            stat.batang += 1;
            cek(Math.abs(ukuran / unit - DATA[p][q]) < 0.01, `${nama}: batang ${p}${q} bernilai ${DATA[p][q]} (gambar ${(ukuran / unit).toFixed(2)})`);
            const lbl = idDi(`${p}-v${q}`);
            if (lbl) {
              cek(Number(lbl.isi) === DATA[p][q], `${nama}: angka batang ${p}${q} = ${DATA[p][q]} (gambar ${lbl.isi})`);
              if (tegak) cek(Math.abs(lbl.x - (b.x + b.w / 2)) < 0.01 && lbl.y < b.y && b.y - lbl.y < 4, `${nama}: angka batang ${p}${q} tepat di atas batang`);
              else cek(Math.abs(lbl.x - (b.x + b.w + 3)) < 0.01 && Math.abs(lbl.y - (b.y + b.h / 2 + 2.2)) < 0.01, `${nama}: angka batang ${p}${q} tepat di ujung batang`);
            }
            const nm = idDi(`${p}-n${q}`);
            if (nm) {
              if (tegak) cek(Math.abs(nm.x - (b.x + b.w / 2)) < 0.01 && nm.y > b.y + b.h, `${nama}: nama batang ${p}${q} di bawah batangnya`);
              else cek(nm.x < b.x && Math.abs(nm.y - (b.y + b.h / 2 + 2.2)) < 0.01, `${nama}: nama batang ${p}${q} di kiri batangnya`);
            }
          }
          // semua batang tidak melebihi skala tertinggi
          const puncak = nilaiTanda[nilaiTanda.length - 1];
          for (const b of batang) cek((tegak ? b.h : b.w) / unit <= puncak + 0.01, `${nama}: batang ${b.id} tidak melewati skala tertinggi ${puncak}`);
        }
        for (const p of Object.keys(IKON)) {
          IKON[p].forEach((n, r) => {
            const ada = objs.filter((o) => new RegExp(`^${p}-p${r}-\\d+$`).test(o.id));
            if (ada.length === 0) return;
            dipakai.add(`ikon-${p}`);
            stat.ikon += 1;
            cek(ada.length === n, `${nama}: baris ${p}${r} berisi ${n} ikon (ada ${ada.length})`);
            cek(ada.every((o, q) => q === 0 || o.x > ada[q - 1].x), `${nama}: ikon baris ${p}${r} berderet ke kanan`);
            const namaBaris = idDi(`${p}-n${r}`);
            cek(!namaBaris || kotakTeks(namaBaris)[2] < ada[0].x - 5, `${nama}: nama baris ${p}${r} berakhir sebelum ikon pertama`);
          });
        }
      });
    }
  }
  for (const p of Object.keys(DATA)) cek(dipakai.has(p), `diagram ${p} tergambar dan diperiksa`);
  for (const p of Object.keys(IKON)) cek(dipakai.has(`ikon-${p}`), `piktogram ${p} tergambar dan diperiksa`);
  // piktogram tangkai bunga: tiap ikon mewakili 5 tangkai
  {
    const objs = di(M, "pengayaan-345", 2);
    const jumlahDiNama = [0, 1, 2, 3, 4].map((r) => Number(objs.find((o) => o.id === `bt-n${r}`).isi.match(/(\d+)$/)[1]));
    sama(jumlahDiNama, IKON.bt.map((n) => n * 5), "pengayaan 4: jumlah tangkai = banyak tangan x 5");
  }
  // piktogram meja guru: ikon sama dengan nilai Uji Kompetensi 1
  {
    const objs = di(M, "uk-1", 1);
    sama([0, 1, 2, 3, 4].map((r) => objs.filter((o) => new RegExp(`^up-p${r}-\\d+$`).test(o.id)).length), DATA.um, "UK 1: ikon piktogram = data tabel");
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

/* ------------------------------ Data buku, dihitung ulang mandiri ------------------------------ */
{
  const nama = (daftar, nilaiData) => Object.fromEntries(daftar.map((n, i) => [n, nilaiData[i]]));
  // Ayo Mengamati: ekstrakurikuler (Buku Siswa hlm. 188)
  const EKS = nama(["Sepak Bola", "Tari", "Menyanyi", "Catur", "Basket"], DATA.ek);
  sama([EKS.Catur, maksDari(EKS), EKS["Sepak Bola"], minDari(EKS), jumlah(DATA.ek)], [2, "Sepak Bola", 9, "Tari", 23], "Ayo Mengamati: catur 2, sepak bola paling banyak 9, tari paling sedikit, jumlah 23");
  // Ayo Berlatih 1: lomba (hlm. 191; kunci Panduan Guru hlm. 226)
  const LOMBA = nama(["Matematika", "IPA", "Bahasa Inggris", "Puisi", "Pengetahuan Umum"], DATA.lm);
  sama([maksDari(LOMBA), Object.keys(LOMBA).filter((n) => LOMBA[n] === 3), LOMBA.IPA + LOMBA["Pengetahuan Umum"], minDari(LOMBA), LOMBA.Matematika], ["Matematika", ["Puisi"], 12, "Puisi", 15], "Ayo Berlatih 1: kunci Matematika, Puisi, 12, Puisi, 15 (kunci Panduan Guru benar)");
  sama(jumlah(DATA.lm), 41, "Ayo Berlatih 1: jumlah lima lomba 41");
  sama([(14 + 16) / 2, (2 + 4) / 2, (10 + 12) / 2, 6], [LOMBA.Matematika, LOMBA.Puisi, LOMBA["Bahasa Inggris"], LOMBA.IPA], "titik tengah dua garis skala dua = nilai batang");
  // Ayo Berlatih 2: bunga di taman (hlm. 192; kunci Panduan Guru hlm. 227)
  const BUNGA = nama(["anggrek", "melati", "matahari", "sepatu", "kertas", "mawar"], DATA.bg);
  sama([maksDari(BUNGA), Object.keys(BUNGA).filter((n) => BUNGA[n] === 8), BUNGA.kertas + BUNGA.anggrek, minDari(BUNGA), BUNGA.mawar, jumlah(DATA.bg)], ["kertas", ["melati"], 16, "matahari", 5, 36], "Ayo Berlatih 2: kunci kertas, melati, 16, matahari, 5; jumlah 36");
  // Uji Kompetensi 1: meja guru (hlm. 192), rubrik (Panduan Guru hlm. 229-231)
  sama([jumlah(DATA.um), Math.max(...DATA.um)], [11, 4], "UK 1: jumlah benda 11, nilai terbesar 4 (skala 0 sampai 4 cukup)");
  sama([20 + 20, 5 * 6, 5 * 6, 20 + 20 + 5 * 6 + 5 * 6], [40, 30, 30, 100], "rubrik Tabel 6.2: 40 + 30 + 30 = 100 (butir 1b mendatar tanpa baris skor)");
  // Uji Kompetensi 2: transportasi (hlm. 192-193; kunci hlm. 229)
  const T = nama(["Mobil", "Sepeda Motor", "Becak", "Jalan kaki"], IKON.tp);
  sama([maksDari(T), T.Becak, minDari(T), T.Mobil + T["Jalan kaki"], jumlah(IKON.tp)], ["Sepeda Motor", 5, "Mobil", 11, 30], "UK 2: kunci sepeda motor, 5, mobil, 3 + 8 = 11, 30 (kunci benar)");
  // Uji Kompetensi 3: PORSENI (hlm. 193-194; kunci hlm. 229)
  const P = nama(["Menyanyi", "Renang", "Bulu Tangkis", "Puisi", "Lari", "Catur"], DATA.pr);
  sama([maksDari(P), Object.keys(P).filter((n) => P[n] === 3), P.Catur + P.Renang, minDari(P), P.Puisi, jumlah(DATA.pr)], ["Menyanyi", ["Lari"], 7, "Renang", 7, 30], "UK 3: kunci menyanyi, lari, 5 + 2 = 7, renang, 7 (kunci benar); jumlah 30");
  sama([P.Menyanyi - P.Renang, P.Menyanyi - P.Puisi, P["Bulu Tangkis"] === P.Catur, P.Menyanyi - P["Bulu Tangkis"]], [6, 1, true, 3], "selisih batang PORSENI");
  // Pengayaan 1: SD Permata (Panduan Guru hlm. 232, 235)
  const tampak = [57, 58, 56, 62, 59];
  sama([jumlah(tampak), 346 - jumlah(tampak), 365 - jumlah(tampak)], [292, 54, 73], "pengayaan 1: 346 - 292 = 54; kunci menulis 365, hasil 365 - 292 = 73 (salah ketik)");
  sama([Math.min(...tampak, 54), Math.max(...tampak, 54), DATA.sp.reduce((t, n) => t + n, 0)], [54, 62, 346], "pengayaan 1: kelas 2 (54) paling sedikit, kelas 5 (62) paling banyak, jumlah enam kelas 346");
  // Pengayaan 2: suku bangsa (hlm. 232, 235-236)
  const daftar = "Jawa, Melayu, Minang, Melayu, Jawa, Minang, Jawa, Melayu, Jawa, Jawa, Melayu, Melayu, Jawa, Minang, Minang, Minang, Melayu, Jawa, Minang, Jawa, Melayu, Jawa, Jawa, Minang".split(", ");
  const hitung = (s) => daftar.filter((n) => n === s).length;
  sama([daftar.length, hitung("Jawa"), hitung("Melayu"), hitung("Minang")], [24, 10, 7, 7], "pengayaan 2: 24 siswa; Jawa 10, Melayu 7, Minang 7");
  {
    const t = teksAdegan(U, "luar-tb-terapan");
    const gabung = [...t].join(" ");
    cek(["Jawa, Melayu, Minang, Melayu, Jawa, Minang, Jawa, Melayu, Jawa, Jawa,", "Melayu, Melayu, Jawa, Minang, Minang, Minang, Melayu, Jawa, Minang,", "Jawa, Melayu, Jawa, Jawa, Minang"].every((b) => t.has(b)), "daftar 24 suku bangsa di gambar lengkap");
    sama(gabung.split(", ").length >= 24, true, "daftar suku bangsa memuat semua nama");
    const semuaNama = [...t].filter((s) => /^(Jawa|Melayu|Minang)/.test(s) && s.includes(","))
      .flatMap((s) => s.split(",").map((x) => x.trim()).filter(Boolean));
    sama(semuaNama, daftar, "daftar suku bangsa di gambar sama dengan soal buku");
  }
  // Pengayaan 3: peminjaman buku (hlm. 232-233, 236)
  sama([DATA.pb.length, jumlah(DATA.pb.slice(0, 5)), DATA.pb.indexOf(Math.max(...DATA.pb)) + 1, jumlah(DATA.pb)], [7, 64, 3, 86], "pengayaan 3: 7 hari; 12 + 9 + 17 + 15 + 11 = 64; hari ke-3 terbanyak (17); jumlah 86");
  // Pengayaan 4: tangkai bunga (hlm. 233, 236)
  sama(IKON.bt.map((n) => n * 5), [20, 25, 30, 15, 10], "pengayaan 4: melati 20, mawar 25, anggrek 30, sepatu 15, bougenville 10");
  // Pengayaan 5: panen apel (hlm. 234-235, 237): apel besar 15 kg dan apel kecil 10 kg
  const GAMBAR_APEL = [[3, 2], [5, 3], [3, 1], [2, 4], [3, 2], [3, 0], [5, 2], [4, 2], [2, 4], [5, 0], [3, 3], [2, 4]];
  sama(GAMBAR_APEL.map(([b, c]) => 15 * b + 10 * c), DATA.ap, "pengayaan 5: tiap bulan 15 x apel besar + 10 x apel kecil = tabel kunci");
  sama([jumlah(DATA.ap), BULAN_TERTINGGI(DATA.ap), BULAN_TERENDAH(DATA.ap)], [870, "Februari", "Juni"], "pengayaan 5: jumlah setahun 870; tertinggi Februari (105), terendah Juni (45)");
  function BULAN_TERTINGGI(d) {
    return ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"][d.indexOf(Math.max(...d))];
  }
  function BULAN_TERENDAH(d) {
    return ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"][d.indexOf(Math.min(...d))];
  }
  // isi gambar yang harus ada
  const harusAda = {
    "ayo-mengamati": ["9 + 1 + 5 + 2 + 6 = 23"],
    "berlatih-1": ["c. 6 + 6 = 12 siswa"],
    "pengayaan-12": ["57 + 58 + 56 + 62 + 59 = 292", "346 − 292 = 54 siswa", "kunci: 365 − 292 = 73, bukan 54", "10 + 7 + 7 = 24 siswa"],
    "berlatih-2": ["5 + 9 + 4 + 3 + 8 + 7 = 36"],
    "panduan-guru-b": ["no. 1: 20 + 20 = 40", "no. 2: 5 × 6 = 30", "no. 3: 5 × 6 = 30", "40 + 30 + 30 = 100"],
    "uk-2": ["d. 3 + 8 = 11 siswa", "e. 3 + 14 + 5 + 8 = 30 siswa"],
    "pengayaan-345": ["12 + 9 + 17 + 15 + 11 = 64 buku", "3 × 15 + 2 × 10 = 65", "jumlah setahun: 870 kg"],
  };
  for (const [sc, daftarTeks] of Object.entries(harusAda)) {
    const t = teksAdegan(M, sc);
    for (const s of daftarTeks) cek(t.has(s), `${sc}: gambar memuat "${s}"`);
  }
  const harusAdaLuar = {
    "luar-bs-terapan": ["(14 + 16) ÷ 2 = 15", "(2 + 4) ÷ 2 = 3", "(10 + 12) ÷ 2 = 11"].map((s) => s),
    "luar-cb-terapan": ["8 − 2 = 6", "8 + 2 + 5 + 7 + 3 + 5 = 30 siswa"],
    "luar-cb": ["selisih: 8 − 5 = 3"],
    "luar-tb": ["periksa: 4 + 1 + 3 + 1 + 2 = 11"],
    "luar-tb-terapan": ["10 + 7 + 7 = 24 siswa"],
  };
  for (const [sc, daftarTeks] of Object.entries(harusAdaLuar)) {
    const t = [...teksAdegan(U, sc)];
    for (const s of daftarTeks) cek(t.some((x) => x.includes(s)), `${sc}: gambar memuat "${s}"`);
  }
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
  // Buku Siswa hlm. 187-194 = PDF 199-206; Panduan Guru hlm. 223-238 = PDF 235-250 (offset kelas IV: PDF dikurangi 12).
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 199, 206), ambil(bg, 235, 250)] : [null];
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
    cek(n >= 120, `jumlah kutipan buku yang diperiksa (${n})`);
    console.log(`Kutipan buku diperiksa: ${n}`);
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k4b6b-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k4b6b-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k4b6b sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkusBerkas = new URL("../video-k4b6b.tsx", folder);
  const pembungkus = readFileSync(pembungkusBerkas, "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_B46|video-k4b2-umum|naskah-k4b6/.test(pembungkus) && /VIDEO_MATERI_K4B6B/.test(pembungkus) && /VIDEO_LUAR_K4B6B/.test(pembungkus) && /export function VideoK4B6B/.test(pembungkus) && /DaftarVideoCerita/.test(pembungkus), "pembungkus video-k4b6b: dua video Story baru, tanpa naskah lama");
  cek(!pembungkus.includes("\r"), "pembungkus video-k4b6b: akhir baris LF");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.persamaan} persamaan, ${stat.banding} perbandingan, ${stat.urutan} rantai urutan, ${stat.format} angka berformat, ${stat.batang} batang, ${stat.ikon} baris ikon, ${stat.angkaSuara} bilangan suara, ${stat.kartu} teks kartu, ${stat.teksPasang} pasangan teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
