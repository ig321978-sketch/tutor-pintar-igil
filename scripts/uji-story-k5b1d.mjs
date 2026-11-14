// Uji Story Kelas 5 Bab 1 Sub-Bab D (operasi hitung pada bilangan cacah sampai 100.000, penutup bab): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar (bilangan yang diucapkan dengan kata dibaca ulang menjadi angka), perubahan gambar tiap ketukan,
// keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar, kutipan buku (bila PDF ada),
// hitungan mandiri (penjumlahan, pengurangan, perkalian, pembagian, hitung bersusun beserta simpanan dan pinjaman, nilai tempat, kunci Ayo Berlatih dan Uji Kompetensi,
// komposisi uang, soal pengayaan), geometri gambar, emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b1d.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/[.][a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b1d-video.ts");
const G = await import("../src/components/modul/story/k5b1d-gambar.ts");

const stat = { persamaan: 0, banding: 0, susun: 0, angkaSuara: 0, teksPasang: 0, nilaiTempat: 0, format: 0 };
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

/* ------------------------------ Hitungan mandiri ------------------------------ */
const angka = (s) => Number(String(s).replace(/\./g, ""));
const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const urut = (xs) => [...xs].sort((a, b) => a - b);

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
sama(angkaDariKata("lima puluh tujuh ribu lima ratus rupiah dan dua puluh dua ribu"), [57500, 22000], "pembaca bilangan: 57.500 dan 22.000");
sama(angkaDariKata("dua ribu seratus lima puluh"), [2150], "pembaca bilangan: 2.150");
sama(angkaDariKata("seratus dua puluh satu ribu lima ratus"), [121500], "pembaca bilangan: 121.500");
sama(angkaDariKata("tahun dua ribu dua puluh satu"), [2021], "pembaca bilangan: 2021");
sama(angkaDariKata("sepuluh kurang lima sama dengan lima"), [], "pembaca bilangan: kecil diabaikan");

/** Nilai persamaan aritmetika dengan titik ribuan, tanda − × ÷ dan kurung. */
const nilai = (ekspr) => {
  const s = ekspr.replace(/(\d)\.(\d{3})/g, "$1$2").replace(/−/g, "-").replace(/×/g, "*").replace(/÷/g, "/");
  if (!/^[\d\s+\-*/().]+$/.test(s)) return NaN;
  return Function(`"use strict"; return (${s});`)();
};
sama([nilai("57.500 + 22.000"), nilai("2 × 5.000"), nilai("100.000 − (47.000 + 30.000)"), nilai("67.032 ÷ 147")], [79500, 10000, 23000, 456], "evaluator aritmetika");

const VIDEO = [V.VIDEO_MATERI_K5B1D, V.VIDEO_LUAR_K5B1D];
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
const EMOJI_ATAU_TANDA = /^[\u{1F000}-\u{1FFFF}]|^[✂✏⚠✅❌❓⭕]$/u;
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
const M = V.VIDEO_MATERI_K5B1D;
const U = V.VIDEO_LUAR_K5B1D;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const di = (v, id, ke) => akhirAdegan(adegan(v, id), ke);
const teksVisible = (objs) => objs.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi).map((o) => o.isi);
/** Semua teks yang pernah tampak di sebuah adegan (gabungan semua ketukan). */
const teksAdegan = (v, id) => new Set(adegan(v, id).ketukan.flatMap((kt, i) => L.kataDari(kt.suara).flatMap((_, p) => teksVisible(L.keadaanStory(adegan(v, id), i, p)))));
{
  const teksVideo = (v) => JSON.stringify(seluruhTeks(v));
  const NAMA_METODE = /Standard Algorithm|Regrouping|Estimate First|Inverse Check|metode luar|metode dari luar/i;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Standard Algorithm", "Regrouping", "Estimate First", "Inverse Check"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(M.adegan.every((a) => /(Buku Siswa|Panduan Guru) hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Sub-Bab D", "Eksplorasi satu titik empat", "Cara Yohana", "Cara Lukas", "Ayo Berdiskusi", "Ayo Berlatih", "angpau", "Miskonsepsi", "Diferensiasi", "Uji Kompetensi", "Rubrik", "Remedial", "pengayaan", "Refleksi", "orang tua"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat ${kata}`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-sa", "luar-sa-terapan", "luar-rg", "luar-rg-terapan", "luar-ef", "luar-ef-terapan", "luar-ic", "luar-ic-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk empat metode");
  cek(M.adegan.length === 12 && U.adegan.length === 10, "12 adegan materi dan 10 adegan metode luar");
  cek(!/pecahan|bkelilingb|KPK|FPB|luas daerah|sudut|bab dua|bab tiga|bab empat/i.test(materi + luar), `tidak membahas bab lain (${(materi + luar).match(/pecahan|bkelilingb|KPK|FPB|luas daerah|sudut|bab dua|bab tiga|bab empat/i)?.[0]})`);
  cek(totalKetukan >= 90, `total ketukan cukup dalam (${totalKetukan})`);
  for (const kata of ["57.500", "22.000", "47.900", "45.750", "76.598", "12.456", "67.032", "147", "567", "53.000", "70.000", "5.000", "64.000"]) cek(luar.includes(kata), `metode luar memakai angka buku: ${kata}`);
  cek(!/Estimate|Inverse|Regroup|Algorithm/i.test(materi), "video materi tanpa istilah metode luar");
}

/* ------------------------------ Persamaan dan perbandingan di gambar dihitung ulang ------------------------------ */
{
  const BENTUK_PERSAMAAN = /^[\d.\s+−×÷()]+( = [\d.\s+−×÷()]+)+$/;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        const objs = akhirAdegan(a, i);
        const nama = `${v.id}/${a.id}#${i + 1}`;
        for (const o of objs) {
          if (o.t !== "teks" || !o.isi || (o.op ?? 1) === 0) continue;
          if (BENTUK_PERSAMAAN.test(o.isi)) {
            const sisi = o.isi.split(" = ").map(nilai);
            stat.persamaan += 1;
            cek(sisi.every((n) => Number.isFinite(n) && n === sisi[0]), `${nama}: persamaan "${o.isi}" benar (${sisi.join(" / ")})`);
          }
          const b = o.isi.match(/^(\d[\d.]*) ([<>]) (\d[\d.]*)$/);
          if (b) {
            stat.banding += 1;
            cek(b[2] === "<" ? angka(b[1]) < angka(b[3]) : angka(b[1]) > angka(b[3]), `${nama}: perbandingan "${o.isi}" benar`);
          }
          for (const t of o.isi.replace(/(Eksplorasi|Tabel) \d\.\d/g, "").match(/\d[\d.]*\d|\d/g) ?? []) {
            stat.format += 1;
            cek(!t.includes(".") || /^\d{1,3}(\.\d{3})+$/.test(t), `${nama}: format ribuan "${t}" pada "${o.isi}"`);
          }
        }
      });
    }
  }
}

/* ------------------------------ Hitung bersusun: angka, simpanan, dan pinjaman dihitung ulang ------------------------------ */
{
  const KOLOM = 13;
  const diharapkan = [];
  let nSusun = 0;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        const objs = akhirAdegan(a, i);
        const nama = `${v.id}/${a.id}#${i + 1}`;
        const awalan = new Set(objs.map((o) => o.id.match(/^([a-z0-9]+)-a\d+$/)?.[1]).filter(Boolean));
        for (const p of awalan) {
          nSusun += 1;
          stat.susun += 1;
          const ambil = (j) => objs.filter((o) => new RegExp(`^${p}-${j}\\d+$`).test(o.id)).map((o) => ({ i: Number(o.id.match(/(\d+)$/)[1]), o })).sort((m, n) => m.i - n.i);
          const A = ambil("a");
          const B = ambil("b");
          const R = ambil("r");
          const lurus = (lst) => lst.every((q, k) => q.i === k);
          cek(lurus(A) && lurus(B) && lurus(R), `${nama}: kolom ${p} berurutan dari satuan`);
          const bil = (lst) => Number([...lst].reverse().map((q) => q.o.isi).join(""));
          const a1 = bil(A);
          const b1 = bil(B);
          const op = objs.find((o) => o.id === `${p}-op`)?.isi;
          cek(op === "+" || op === "−", `${nama}: operator ${p} + atau −`);
          const hasil = op === "+" ? a1 + b1 : a1 - b1;
          cek(hasil >= 0, `${nama}: ${p} hasil tidak negatif`);
          const n = Math.max(String(a1).length, String(b1).length, String(hasil).length);
          const da = String(a1).split("").reverse().map(Number);
          const db = String(b1).split("").reverse().map(Number);
          const dh = String(hasil).split("").reverse();
          const x0 = A[0].o.x;
          const posisi = (lst, label) => lst.forEach((q) => cek(Math.abs(q.o.x - (x0 - q.i * KOLOM)) < 0.01, `${nama}: ${p} ${label}${q.i} sejajar kolomnya`));
          posisi(A, "a");
          posisi(B, "b");
          posisi(R, "r");
          cek(A.every((q) => q.o.y === A[0].o.y) && B.every((q) => q.o.y === B[0].o.y) && (R.length === 0 || R.every((q) => q.o.y === R[0].o.y)), `${nama}: ${p} baris angka sejajar`);
          cek(B[0].o.y - A[0].o.y === G.TINGGI_BARIS && (R.length === 0 || R[0].o.y - B[0].o.y === G.TINGGI_BARIS + 3), `${nama}: ${p} jarak antarbaris`);
          let bawa = 0;
          const simpan = [];
          const pinjam = [];
          for (let c = 0; c < n; c += 1) {
            const x = da[c] ?? 0;
            const y = db[c] ?? 0;
            if (op === "+") {
              const s = x + y + bawa;
              bawa = Math.floor(s / 10);
              simpan.push(bawa === 1);
              pinjam.push(false);
            } else {
              const s = x - bawa - y;
              bawa = s < 0 ? 1 : 0;
              pinjam.push(s < 0);
              simpan.push(false);
            }
          }
          for (const q of R) cek(q.o.isi === dh[q.i], `${nama}: ${p} angka hasil kolom ${q.i} = ${dh[q.i]} (ada ${q.o.isi})`);
          const m = (id) => objs.find((o) => o.id === id);
          for (const q of R) {
            const c = q.i;
            if (op === "+" && simpan[c] && c + 1 < n) cek(m(`${p}-m${c}`)?.isi === "1" && Math.abs(m(`${p}-m${c}`).x - (x0 - (c + 1) * KOLOM)) < 0.01, `${nama}: ${p} simpanan kolom ${c} ada di atas kolom ${c + 1}`);
            if (op === "−" && pinjam[c]) {
              cek(m(`${p}-m${c}`)?.isi === "+10" && Math.abs(m(`${p}-m${c}`).x - (x0 - c * KOLOM)) < 0.01, `${nama}: ${p} tanda +10 di kolom ${c}`);
              if (c + 1 < n) cek(m(`${p}-m${c}k`)?.isi === "−1" && Math.abs(m(`${p}-m${c}k`).x - (x0 - (c + 1) * KOLOM)) < 0.01, `${nama}: ${p} tanda −1 di kolom ${c + 1}`);
            }
          }
          for (let c = 0; c < n; c += 1) {
            if (m(`${p}-m${c}`)) cek(op === "+" ? m(`${p}-m${c}`).isi === "1" && simpan[c] : m(`${p}-m${c}`).isi === "+10" && pinjam[c], `${nama}: ${p} tanda kolom ${c} sesuai hitungan`);
            if (m(`${p}-m${c}k`)) cek(op === "−" && pinjam[c], `${nama}: ${p} tanda −1 kolom ${c} sesuai hitungan`);
          }
          diharapkan.push([a.id, p, a1, op, b1]);
        }
      });
    }
  }
  cek(nSusun >= 12, `jumlah keadaan hitung bersusun yang diperiksa (${nSusun})`);
  const adaSusun = (sc, p, a1, op, b1) => cek(diharapkan.some((d) => d[0] === sc && d[1] === p && d[2] === a1 && d[3] === op && d[4] === b1), `${sc}: hitung bersusun ${p} = ${a1} ${op} ${b1}`);
  adaSusun("berlatih-lukas", "sq", 47900, "−", 45750);
  adaSusun("uk-1", "s4b", 67987, "−", 13453);
  adaSusun("luar-sa-terapan", "sb", 76598, "+", 12456);
  adaSusun("luar-rg-terapan", "rb", 70000, "−", 53000);
  for (const [x, y] of [[57500, 22000], [32500, 13250], [76598, 12456], [99999, 1], [12345, 67890]]) {
    const h = G.hitungSusun("+", x, y);
    sama([h.hasil, Number([...h.digit].reverse().join(""))], [x + y, x + y], `hitungSusun ${x} + ${y}`);
  }
  for (const [x, y] of [[47900, 45750], [67987, 13453], [70000, 53000], [100000, 1], [90000, 8999]]) {
    const h = G.hitungSusun("−", x, y);
    sama([h.hasil, Number([...h.digit].reverse().join(""))], [x - y, x - y], `hitungSusun ${x} − ${y}`);
  }
}

/* ------------------------------ Data buku, dihitung ulang mandiri ------------------------------ */
{
  sama([57500 + 22000, 12 * 5000, 64000 / 4, 4 * 16], [79500, 60000, 16000, 64], "Eksplorasi 1.4 sampai 1.6");
  sama([50000 + 7000 + 500, 20000 + 2000, 50000 + 20000 + 7000 + 2000 + 500], [57500, 22000, 79500], "uraian nilai tempat Cara Yohana");
  sama([32500 + 13250, 47900 - (32500 + 13250)], [45750, 2150], "Ayo Berlatih: ayam taliwang dan plencing kangkung");
  sama([40000 + 7000 + 900, 40000 + 5000 + 700 + 50], [47900, 45750], "uraian susun panjang Lukas");
  // Ayo Berlatih nomor 1 dan 2: harga buah
  const H = { mangga: 23500, jeruk: 17000, kelengkeng: 34000, naga: 15000, alpukat: 32000 };
  const nama = Object.keys(H);
  const termahal = nama.reduce((m, n) => (H[n] > H[m] ? n : m));
  const termurah = nama.reduce((m, n) => (H[n] < H[m] ? n : m));
  const urutan = [...nama].sort((p, q) => H[p] - H[q]);
  sama(urutan, ["naga", "jeruk", "mangga", "alpukat", "kelengkeng"], "urutan harga dari termurah");
  const urutanBuku = ["jeruk", "naga", "mangga", "kelengkeng", "alpukat"];
  const kunci1 = [termahal === "alpukat", urutan.join() === urutanBuku.join(), termurah === "naga", 2 * H.naga > H.alpukat, 3 * H.jeruk === H.kelengkeng];
  sama(kunci1, [false, false, true, false, false], "kunci Ayo Berlatih 1 (salah, salah, benar, salah, salah)");
  const pasangan = [2 * H.mangga + H.jeruk, 100000 - (2 * H.mangga + 2 * H.naga), H.naga + H.kelengkeng, Object.values(H).reduce((t, n) => t + n, 0), H.kelengkeng - 2 * H.naga, H.jeruk + 2 * H.naga];
  sama(pasangan, [64000, 23000, 49000, 121500, 4000, 47000], "kunci Ayo Berlatih 2 (enam pasangan)");
  {
    const o = di(M, "berlatih-buah", 3);
    const chips = [0, 1, 2, 3, 4].map((i) => o.find((q) => q.id === `cht${i}`)?.isi);
    sama(chips, kunci1.map((b) => (b ? "Benar" : "Salah")), "chip Benar dan Salah di gambar sama dengan hitungan");
    const harga = teksAdegan(M, "berlatih-buah");
    for (const [n, h] of Object.entries(H)) cek(harga.has(fmt(h)), `tabel harga memuat ${n} ${fmt(h)}`);
  }
  {
    const o = di(M, "berlatih-pasangan", 3);
    const kolomB = [0, 1, 2, 3, 4, 5].map((i) => angka(o.find((q) => q.id === `cbt${i}`).isi.replace("Rp", "")));
    sama(urut(kolomB), urut(pasangan), "Kolom B di gambar = enam hasil hitungan");
    for (let i = 0; i < 6; i += 1) {
      const hitung = o.find((q) => q.id === `ph${i}`).isi;
      const hasil = angka(hitung.split(" = ")[1]);
      const panah = o.find((q) => q.id === `pg${i}`);
      const yAkhir = panah.y + panah.y2;
      const j = [0, 1, 2, 3, 4, 5].find((c) => Math.abs(24 + c * 29 + 10 - yAkhir) < 0.6);
      cek(j !== undefined && kolomB[j] === hasil && hasil === pasangan[i], `pasangan ${i + 1}: panah menuju Rp${fmt(hasil)} (hasil ${hitung})`);
    }
  }
  // Uji Kompetensi
  sama([50303, 33403], [50000 + 300 + 3, 30000 + 3000 + 400 + 3], "UK 1: bilangan dari kata");
  sama([3 * 10000 + 7 * 1000 + 10 * 100, 3 * 10000 + 4 * 1000, 9 * 10000 + 7 * 1000 + 5 * 100], [38000, 34000, 97500], "UK 3: kunci 38.000, 34.000, 97.500");
  sama([76598 + 12456, 67987 - 13453, 67032 / 147, 567 * 98], [89054, 54534, 456, 55566], "UK 4: kunci 89.054, 54.534, 456, 55.566");
  sama([147 * 456, 54534 + 13453, 89054 - 12456, 55566 / 98], [67032, 67987, 76598, 567], "UK 4: hasil periksa dengan operasi kebalikan");
  sama(567 * 107, 60669, "UK 4d: rubrik menulis 567 × 107 (bukan 567 × 98)");
  const komposisi = (target, koin) => {
    const hasil = [];
    const rec = (k, sisa, pilih) => {
      if (k === koin.length) {
        if (sisa === 0) hasil.push(pilih);
        return;
      }
      for (let n = 0; n <= koin[k][1] && n * koin[k][0] <= sisa; n += 1) rec(k + 1, sisa - n * koin[k][0], [...pilih, n]);
    };
    rec(0, target, []);
    return hasil;
  };
  const saga = komposisi(59000, [[20000, 2], [10000, 3], [5000, 2], [2000, 5]]);
  sama(saga, [[1, 3, 1, 2], [2, 1, 1, 2]], "UK 5: tepat dua cara membayar Rp59.000");
  {
    const t = teksAdegan(M, "uk-2");
    cek(t.has("40.000 + 10.000 + 5.000 + 4.000 = 59.000") && t.has("20.000 + 30.000 + 5.000 + 4.000 = 59.000"), "UK 5: dua cara di gambar");
  }
  sama([2 * 27500, 53000 < 2 * 27500, (2 * 35000 - 53000) / 2], [55000, true, 8500], "UK 6: kunci 55.000, paket B, 8.500");
  // Soal pengayaan: nota Rp56.900
  const pengayaan = komposisi(56900, [[20000, 2], [10000, 1], [5000, 1], [1000, 1], [500, 1], [200, 2], [100, 4]]);
  sama(pengayaan, [[2, 1, 1, 1, 1, 0, 4], [2, 1, 1, 1, 1, 1, 2], [2, 1, 1, 1, 1, 2, 0]], "pengayaan: tepat tiga cara (kunci memberi dua)");
  {
    const t = teksAdegan(M, "penutup-d");
    for (const s of ["4 × 100 = 400", "2 × 200 = 400", "200 + 2 × 100 = 400", "56.500 + 400 = 56.900", "40.000 + 10.000 + 5.000 + 1.000 + 500 = 56.500"]) cek(t.has(s), `pengayaan di gambar: ${s}`);
  }
  const harusAda = {
    "eks-14-cerita": ["Rp57.500", "Rp22.000"],
    "eks-14-cara": ["57.500 = 50.000 + 7.000 + 500 + 0 + 0", "22.000 = 20.000 + 2.000 + 0 + 0 + 0", "70.000 + 9.000 + 500 = 79.500", "79.500"],
    "berlatih-lukas": ["32.500 + 13.250 = 45.750", "47.900 − 45.750 = 2.150", "47.900 = 40.000 + 7.000 + 900 + 0 + 0", "45.750 = 40.000 + 5.000 + 700 + 50 + 0", "10 − 5 = 5"],
    "angpau-1": ["2 × 5.000 = 10.000", "10 × 5.000 = 50.000", "10.000 + 50.000 = 60.000", "60.000"],
    "angpau-2": ["64.000 ÷ 4 = ?", "16.000", "4 × 16 = 64", "16.000 × 4 = 64.000"],
    "uk-1": ["a. Rp50.303", "b. Rp33.403", "67.032 ÷ 147 = 456", "567 × 98 = 55.566", "567 × 107 = 60.669"],
    "uk-2": ["2 × 27.500 = 55.000", "53.000 < 55.000", "70.000 − 53.000 = 17.000", "17.000 ÷ 2 = 8.500"],
  };
  for (const [sc, daftar] of Object.entries(harusAda)) {
    const t = teksAdegan(M, sc);
    for (const s of daftar) cek(t.has(s), `${sc}: gambar memuat "${s}"`);
  }
  // Tabel nilai tempat: digit tiap baris membentuk bilangan yang benar
  const bacaTabel = (v, sc, ke, p, r) => {
    const o = di(v, sc, ke);
    const sel = (c) => o.find((q) => q.id === `${p}-t${r}${c}`)?.isi ?? "";
    stat.nilaiTempat += 1;
    return Number(`0${[1, 2, 3, 4, 5].map(sel).join("")}`);
  };
  sama(bacaTabel(M, "pembuka-d", 2, "nt", 1), 57500, "tabel nilai tempat pembuka: 57.500");
  sama([bacaTabel(M, "eks-14-cara", 4, "lk", 1), bacaTabel(M, "eks-14-cara", 4, "lk", 2)], [57500, 22000], "tabel nilai tempat Cara Lukas: Ibu dan Ayah");
  sama(bacaTabel(M, "eks-14-cara", 4, "lj", 0), 79500, "tabel nilai tempat Cara Lukas: jumlah");
  sama([bacaTabel(M, "uk-1", 0, "u1", 1), bacaTabel(M, "uk-1", 0, "u1", 2)], [50303, 33403], "tabel nilai tempat Uji Kompetensi 1");
  sama(urut(G.KEPALA_NILAI_TEMPAT), urut(["Puluh Ribuan", "Ribuan", "Ratusan", "Puluhan", "Satuan"]), "kepala kolom nilai tempat");
  // Perkiraan dan pembulatan di metode luar
  sama([Math.round(76598 / 1000) * 1000, Math.round(12456 / 1000) * 1000, 77000 + 12000, 89054 - 89000], [77000, 12000, 89000, 54], "perkiraan 76.598 + 12.456");
  sama([567 * 100, 567 * 100 - 55566], [56700, 1134], "perkiraan 567 × 98 dan selisihnya");
  sama([89054 - 12456, 2150 + 45750, 456 * 147, 16000 * 4, 55566 / 98], [76598, 47900, 67032, 64000, 567], "hasil periksa dengan operasi kebalikan");
}

/* ------------------------------ Geometri umum gambar ------------------------------ */
{
  const tabelAda = [["hg", M, "berlatih-buah", 1], ["rb", M, "penutup-d", 0], ["lk", M, "eks-14-cara", 3], ["mn", M, "berlatih-lukas", 0], ["u1", M, "uk-1", 0], ["nt", M, "pembuka-d", 2]];
  for (const [pref, v, sc, ke] of tabelAda) {
    const objs = di(v, sc, ke);
    const sel = objs.filter((q) => new RegExp(`^${pref}-s\\d+$`).test(q.id));
    cek(sel.length >= 4, `tabel ${pref}: kotak ada (${sel.length})`);
    for (let p = 0; p < sel.length; p += 1) for (let q = p + 1; q < sel.length; q += 1) cek(sel[p].x + sel[p].w <= sel[q].x + 0.01 || sel[q].x + sel[q].w <= sel[p].x + 0.01 || sel[p].y + sel[p].h <= sel[q].y + 0.01 || sel[q].y + sel[q].h <= sel[p].y + 0.01, `tabel ${pref}: sel ${sel[p].id} dan ${sel[q].id} tidak tumpang tindih`);
  }
  {
    const o = di(M, "berlatih-buah", 3);
    for (let i = 0; i < 5; i += 1) {
      const t = o.find((q) => q.id === `pn${i}`);
      const c = o.find((q) => q.id === `ch${i}`);
      const kanan = t.x + t.isi.length * t.u * 0.58;
      cek(kanan < c.x - 2, `pernyataan ${i}: teks berakhir (${Math.round(kanan)}) sebelum chip (${c.x})`);
      cek(t.y > c.y && t.y < c.y + c.h + 6, `pernyataan ${i}: teks sebaris dengan chip`);
    }
    const p = di(M, "berlatih-pasangan", 3);
    for (let i = 0; i < 6; i += 1) for (const id of [`pl${i}`, `ph${i}`]) {
      const t = p.find((q) => q.id === id);
      cek(t.x + t.isi.length * t.u * 0.58 < 223, `pasangan ${i + 1}: ${id} berakhir sebelum panah`);
    }
  }
  {
    const o = di(M, "berlatih-lukas", 2);
    const b = o.find((q) => q.id === "sp-b0");
    const ln = o.find((q) => q.id === "sp-ln");
    const r = o.find((q) => q.id === "sp-r0");
    cek(ln.y > b.y && ln.y < r.y - 8 && ln.x2 > 60, "bersusun: garis di antara baris bawah dan hasil");
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
          const lebar = o.isi.length * (o.u ?? 10) * 0.58;
          cek(lebar <= kt.w - 3 && o.x - lebar / 2 >= kt.x - 0.5 && o.x + lebar / 2 <= kt.x + kt.w + 0.5, `${v.id}/${a.id}#${i + 1}: teks "${o.isi}" muat dalam kotaknya (lebar ${Math.round(lebar)} dari ${kt.w})`);
          cek(o.y > kt.y && o.y < kt.y + kt.h + 1, `${v.id}/${a.id}#${i + 1}: teks "${o.isi}" berada di tinggi kotaknya`);
        }
      });
    }
  }
  cek(n >= 150, `jumlah teks dalam kartu dan tabel yang diperiksa (${n})`);
}

/* ------------------------------ Kutipan buku (bila PDF tersedia) ------------------------------ */
{
  const bs = new URL("../bahan-sd/Matematika-BS-KLS-V.pdf", import.meta.url);
  const bg = new URL("../bahan-sd/Matematika-BG-KLS-V.pdf", import.meta.url);
  const jalur = (u) => u.pathname.replace(/^\/([A-Za-z]:)/, "$1");
  const ambil = (berkas, dari, sampai) => {
    const r = spawnSync("pdftotext", ["-f", String(dari), "-l", String(sampai), "-raw", "-enc", "UTF-8", jalur(berkas), "-"], { encoding: "utf8", maxBuffer: 1 << 26 });
    return r.status === 0 ? r.stdout : null;
  };
  // Buku Siswa hlm. 17-28 = PDF 33-44; Panduan Guru hlm. 32-42 = PDF 44-54.
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 33, 44), ambil(bg, 44, 54)] : [null];
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
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k5b1d-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k5b1d-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k5b1d sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../video-k5b1d.tsx", folder), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_D51|video-k4b2-umum|naskah-k5b1/.test(pembungkus) && /VIDEO_MATERI_K5B1D/.test(pembungkus) && /VIDEO_LUAR_K5B1D/.test(pembungkus) && /export function VideoK5B1D/.test(pembungkus) && /DaftarVideoCerita/.test(pembungkus), "pembungkus video-k5b1d: dua video Story baru, tanpa naskah lama");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.persamaan} persamaan, ${stat.banding} perbandingan, ${stat.format} angka berformat, ${stat.susun} keadaan hitung bersusun, ${stat.angkaSuara} bilangan suara, ${stat.nilaiTempat} tabel nilai tempat, ${stat.teksPasang} pasangan teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
