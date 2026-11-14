// Uji Story Kelas 5 Bab 1 Sub-Bab A (membaca dan menulis bilangan cacah sampai 100.000 dan nilai tempatnya, termasuk pembuka bab): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar (angka dan bilangan yang diucapkan dengan kata), perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, tidak membocorkan materi subbab berikutnya (membandingkan, komposisi, operasi hitung),
// kutipan buku terhadap teks PDF (pdftotext -enc UTF-8), hitungan mandiri (nilai tempat, terbilang, kunci buku yang tertukar), geometri gambar (tabel nilai tempat, balok, deret angka),
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b1a.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b1a-video.ts");
const G = await import("../src/components/modul/story/k5b1a-gambar.ts");
const M1 = await import("../src/components/modul/story/k5b1a-materi-1.ts");
const M2 = await import("../src/components/modul/story/k5b1a-materi-2.ts");
const M3 = await import("../src/components/modul/story/k5b1a-materi-3.ts");
const LU1 = await import("../src/components/modul/story/k5b1a-luar-1.ts");
const LU2 = await import("../src/components/modul/story/k5b1a-luar-2.ts");

const stat = { sel: 0, balok: 0, digit: 0, terbilang: 0, teksPasang: 0, persamaan: 0 };
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
const VIDEO = [V.VIDEO_MATERI_K5B1A, V.VIDEO_LUAR_K5B1A];
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
const M = V.VIDEO_MATERI_K5B1A;
const U = V.VIDEO_LUAR_K5B1A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const objId = (objs, id) => objs.find((o) => o.id === id);
const nilaiId = (objs, id) => objs.find((o) => o.id === id)?.isi;
const T = (v, id, ke) => akhirAdegan(adegan(v, id), ke);
{
  const teksVideo = (v) => JSON.stringify(seluruhTeks(v));
  const NAMA_METODE = /Place-Value Chart|Extended Dienes|Number Reading|Period Grouping|metode luar|metode dari luar/i;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Place-Value Chart", "Extended Dienes", "Number Reading", "Period Grouping"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(M.adegan.every((a) => /(Buku Siswa|Panduan Guru) hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Bab 1", "Peta konsep", "Kata kunci", "Pasar Sukawati", "Mengingat", "Nisa", "Yohana", "Komang", "Asep", "Kayu Tanam", "Eksplorasi 1.1", "Ayo Berlatih", "Refleksi", "Miskonsepsi", "Diferensiasi", "Panduan"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat ${kata}`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-pv", "luar-pv-terapan", "luar-dienes", "luar-dienes-terapan", "luar-baca", "luar-baca-terapan", "luar-periode", "luar-periode-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[0].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  cek(M.adegan.length === 11 && U.adegan.length === 10, "11 adegan materi dan 10 adegan metode luar");
  // Subbab A tidak membocorkan subbab berikutnya. Pembuka bab, peta konsep, dan skema boleh menyebutnya sebagai daftar bab; Ayo Menyimak memuat pertanyaan buku tentang membandingkan harga;
  // Mengingat Kembali memuat soal 56 + 75 (bersusun) sesuai buku; Kayu Tanam memuat pemeriksaan jumlah dua kelompok sebagai hitungan mandiri.
  const BOCOR = /membandingkan|mengurutkan|komposisi|dekomposisi|penjumlahan|pengurangan|perkalian|pembagian|operasi|bersusun|dijumlahkan|ditambah|dikurangi|dikali|dibagi/i;
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const boleh = ["pembuka-bab", "peta-konsep", "ayo-menyimak", "mengingat-kembali", "kayu-tanam"];
  for (const a of M.adegan.filter((x) => !boleh.includes(x.id))) cek(!BOCOR.test(teksAdegan(a)), `materi ${a.id} tidak membocorkan subbab berikutnya`);
  for (const a of U.adegan) cek(!BOCOR.test(teksAdegan(a)), `metode luar ${a.id} tidak membocorkan subbab berikutnya`);
  cek(["pembuka-bab", "peta-konsep"].every((i) => BOCOR.test(teksAdegan(adegan(M, i)))), "pembuka dan peta konsep menyebut tujuan subbab lain sebagai daftar bab");
  cek(!/Uji Kompetensi|pengayaan|remedial/i.test(materi + luar), "tidak memakai Uji Kompetensi, pengayaan, remedial milik subbab lain");
  cek(totalKetukan >= 80, `total ketukan cukup dalam (${totalKetukan})`);
}

/* ------------------------------ Terbilang dan sinkron bilangan yang diucapkan dengan kata ------------------------------ */
const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
const tigaDigit = (x) => {
  const h = Math.floor(x / 100);
  const t = x % 100;
  const out = [];
  if (h === 1) out.push("seratus");
  else if (h > 1) out.push(`${SATUAN[h]} ratus`);
  if (t === 10) out.push("sepuluh");
  else if (t === 11) out.push("sebelas");
  else if (t > 11 && t < 20) out.push(`${SATUAN[t - 10]} belas`);
  else if (t >= 20) {
    out.push(`${SATUAN[Math.floor(t / 10)]} puluh`);
    if (t % 10) out.push(SATUAN[t % 10]);
  } else if (t > 0) out.push(SATUAN[t]);
  return out.join(" ");
};
const terbilang = (n) => {
  const rb = Math.floor(n / 1000);
  const sisa = n % 1000;
  const depan = rb === 0 ? "" : rb === 1 ? "seribu" : `${tigaDigit(rb)} ribu`;
  return [depan, tigaDigit(sisa)].filter(Boolean).join(" ");
};
const NAMA_ANGKA = new Set(["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas", "seratus", "seribu", "belas", "puluh", "ratus", "ribu"]);
/** Nilai satu deret kata bilangan (mis. "dua puluh enam ribu sembilan ratus tiga puluh dua"). */
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
      total += (cur + tunda) * 1000;
      cur = 0;
      tunda = 0;
    }
  }
  return total + cur + tunda;
};
/** Semua deret kata bilangan bernilai paling sedikit 100 dalam satu kalimat suara. Tanda baca mengakhiri deret. */
const deretBilangan = (suara) => {
  const hasil = [];
  let run = [];
  const tutup = () => {
    if (run.length && !["ribu", "ratus", "puluh", "belas"].includes(run[0])) {
      const nilai = nilaiKata(run);
      if (nilai >= 100) hasil.push({ kata: run.join(" "), nilai });
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
{
  let n = 0;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        const terlihat = new Set();
        for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(b);
        for (const d of deretBilangan(kt.suara)) {
          n += 1;
          stat.terbilang += 1;
          cek(terlihat.has(String(d.nilai)), `${v.id}/${a.id}#${i + 1}: bilangan "${d.kata}" (${d.nilai}) di suara tampak sebagai angka di gambar`);
          cek(terbilang(d.nilai) === d.kata, `${v.id}/${a.id}#${i + 1}: "${d.kata}" adalah ejaan baku ${d.nilai} (${terbilang(d.nilai)})`);
        }
      });
    }
  }
  cek(n >= 60, `jumlah bilangan berkata yang dicocokkan dengan gambar (${n})`);
  // Pengurai dan pengeja diuji pada bacaan buku.
  const BACAAN = [
    [6375, "enam ribu tiga ratus tujuh puluh lima"], [5950, "lima ribu sembilan ratus lima puluh"], [9050, "sembilan ribu lima puluh"],
    [14500, "empat belas ribu lima ratus"], [66500, "enam puluh enam ribu lima ratus"], [26932, "dua puluh enam ribu sembilan ratus tiga puluh dua"],
    [13578, "tiga belas ribu lima ratus tujuh puluh delapan"], [13354, "tiga belas ribu tiga ratus lima puluh empat"], [3456, "tiga ribu empat ratus lima puluh enam"],
    [3320, "tiga ribu tiga ratus dua puluh"], [2345, "dua ribu tiga ratus empat puluh lima"], [15950, "lima belas ribu sembilan ratus lima puluh"],
    [15590, "lima belas ribu lima ratus sembilan puluh"], [16667, "enam belas ribu enam ratus enam puluh tujuh"], [44567, "empat puluh empat ribu lima ratus enam puluh tujuh"],
    [88976, "delapan puluh delapan ribu sembilan ratus tujuh puluh enam"], [54675, "lima puluh empat ribu enam ratus tujuh puluh lima"], [40350, "empat puluh ribu tiga ratus lima puluh"],
    [25786, "dua puluh lima ribu tujuh ratus delapan puluh enam"], [13456, "tiga belas ribu empat ratus lima puluh enam"], [87986, "delapan puluh tujuh ribu sembilan ratus delapan puluh enam"],
    [56786, "lima puluh enam ribu tujuh ratus delapan puluh enam"], [73457, "tujuh puluh tiga ribu empat ratus lima puluh tujuh"], [100000, "seratus ribu"], [10000, "sepuluh ribu"],
    [2018, "dua ribu delapan belas"], [2020, "dua ribu dua puluh"], [131, "seratus tiga puluh satu"], [950, "sembilan ratus lima puluh"], [20000, "dua puluh ribu"],
  ];
  for (const [angka, kata] of BACAAN) {
    sama(terbilang(angka), kata, `terbilang ${angka}`);
    sama(nilaiKata(kata.split(" ")), angka, `nilai kata "${kata}"`);
  }
  sama(deretBilangan("Jadi enam puluh enam, ribu, lima ratus."), [{ kata: "lima ratus", nilai: 500 }], "deret bilangan: ribu yang berdiri sendiri tidak dihitung");
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
  // Persamaan bertitik ribuan diperiksa sendiri: nilai angka di gambar dihitung ulang dari teksnya.
  const angkaDariTeks = (s) => Number(s.replace(/\./g, ""));
  let m2 = 0;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        for (const o of akhirAdegan(a, i)) {
          if (o.t !== "teks" || !o.isi) continue;
          const m = o.isi.match(/^(\d{1,3}(?:\.\d{3})*) \+ (\d{1,3}(?:\.\d{3})*) = (\d{1,3}(?:\.\d{3})*)$/);
          if (!m) continue;
          m2 += 1;
          stat.persamaan += 1;
          cek(angkaDariTeks(m[1]) + angkaDariTeks(m[2]) === angkaDariTeks(m[3]), `${v.id}/${a.id}#${i + 1}: persamaan "${o.isi}" benar`);
        }
      });
    }
  }
  cek(m2 >= 1, `persamaan bertitik ribuan yang diperiksa (${m2}); persamaan sederhana (${n})`);
  // Tulisan "angka = huruf" tidak boleh lolos tanpa dihitung.
  for (const v of VIDEO) for (const a of v.adegan) a.ketukan.forEach((_, i) => { for (const o of akhirAdegan(a, i)) if (o.t === "teks" && /^\d+\s*=\s*[A-Za-z]/.test(o.isi ?? "")) cek(false, `${v.id}/${a.id}#${i + 1}: teks "${o.isi}" mengandung sama dengan dengan huruf`); });
}

/* ------------------------------ Geometri: tabel nilai tempat, balok, deret angka ------------------------------ */
const kel = (n) => String(n).split("");
const digitOf = (n) => {
  const s = String(n);
  return Array.from({ length: 5 }, (_, i) => (i - (5 - s.length) >= 0 ? s[i - (5 - s.length)] : ""));
};
const titikRibu = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const NAMA_TEMPAT = ["Puluh Ribuan", "Ribuan", "Ratusan", "Puluhan", "Satuan"];
const NILAI = [10000, 1000, 100, 10, 1];
/** Tabel nilai tempat: kepala kolom, sel, dan angka di tempat yang benar. `isi`: baris berisi string (angka tampak) atau null (belum tampak). */
const cekTabel = (objs, id, Tb, kolom, isi, pesan) => {
  const o = Tb.o ?? {};
  const hh = o.hh ?? 18;
  const ch = o.ch ?? 24;
  const u = o.u ?? 12;
  const labelW = o.labels ? (o.labelW ?? 48) : 0;
  const x0 = Tb.x + labelW;
  NAMA_TEMPAT.slice(5 - kolom).forEach((nama, j) => {
    const h = objId(objs, `${id}-h${j}`);
    const ht = objId(objs, `${id}-ht${j}`);
    cek(h && ht, `${pesan}: kepala kolom ${j + 1} ada`);
    if (!h || !ht) return;
    hampir(h.x, x0 + j * Tb.cw, 1e-6, `${pesan}: kepala ${nama} di kolomnya`);
    hampir(h.y, Tb.y, 1e-6, `${pesan}: kepala ${nama} di baris kepala`);
    hampir(ht.x, x0 + (j + 0.5) * Tb.cw, 1e-6, `${pesan}: nama ${nama} di tengah kolom`);
    sama(ht.isi, nama, `${pesan}: kepala kolom ${j + 1}`);
  });
  isi.forEach((baris, i) => {
    cek(baris.length === kolom, `${pesan}: baris ${i + 1} berisi ${kolom} sel`);
    baris.forEach((d, j) => {
      const c = objId(objs, `${id}-c${i}-${j}`);
      cek(c, `${pesan}: sel baris ${i + 1} kolom ${j + 1} ada`);
      if (!c) return;
      stat.sel += 1;
      hampir(c.x, x0 + j * Tb.cw, 1e-6, `${pesan}: sel ${i + 1},${j + 1} di kolomnya`);
      hampir(c.y, Tb.y + hh + i * ch, 1e-6, `${pesan}: sel ${i + 1},${j + 1} di barisnya`);
      cek(c.w === Tb.cw && c.h === ch, `${pesan}: sel ${i + 1},${j + 1} berukuran sama`);
      const t = objId(objs, `${id}-t${i}-${j}`);
      if (d === null || d === "") cek(!t, `${pesan}: sel ${i + 1},${j + 1} belum berisi angka`);
      else {
        cek(t, `${pesan}: angka sel ${i + 1},${j + 1} ada`);
        if (t) {
          stat.digit += 1;
          sama(t.isi, d, `${pesan}: isi sel ${i + 1},${j + 1}`);
          hampir(t.x, x0 + (j + 0.5) * Tb.cw, 1e-6, `${pesan}: angka sel ${i + 1},${j + 1} di tengah (x)`);
          hampir(t.y, Tb.y + hh + i * ch + ch / 2 + u * 0.35, 1e-6, `${pesan}: angka sel ${i + 1},${j + 1} di tengah (y)`);
        }
      }
    });
    if (o.labels) {
      const l = objId(objs, `${id}-l${i}`);
      const lt = objId(objs, `${id}-lt${i}`);
      cek(l && lt && lt.isi === o.labels[i], `${pesan}: nama baris ${i + 1} ada`);
      if (l) hampir(l.y, Tb.y + hh + i * ch, 1e-6, `${pesan}: nama baris ${i + 1} sejajar`);
    }
  });
};
const UKURAN = [20, 16, 12, 8, 5];
/** Balok nilai tempat kolom j: jumlah, ukuran, dan letaknya dihitung ulang. */
const cekBlok = (objs, id, cx, y, j, jumlah, pesan) => {
  const s = UKURAN[j];
  const lebar = 3 * s + 2 * 3;
  for (let i = 0; i < jumlah; i += 1) {
    const b = objId(objs, `${id}-b${i}`);
    cek(b, `${pesan}: balok ${i + 1} ada`);
    if (!b) continue;
    stat.balok += 1;
    cek(b.w === s && b.h === s, `${pesan}: balok ${i + 1} berukuran ${s}`);
    hampir(b.x, cx - lebar / 2 + (i % 3) * (s + 3), 1e-6, `${pesan}: balok ${i + 1} (x)`);
    hampir(b.y, y + Math.floor(i / 3) * (s + 3), 1e-6, `${pesan}: balok ${i + 1} (y)`);
    cek(b.x >= 0 && b.x + s <= 300 && b.y >= 0 && b.y + s <= 200, `${pesan}: balok ${i + 1} di dalam kanvas`);
  }
  cek(!objId(objs, `${id}-b${jumlah}`), `${pesan}: tidak ada balok kelebihan (${jumlah})`);
};
/** Deret digit dalam kotak, dengan warna kelompok tiga angka dari kanan. */
const cekDeret = (objs, id, x, y, cw, ch, digit, kelompok, pesan) => {
  const n = digit.length;
  for (let i = 0; i < n; i += 1) {
    const c = objId(objs, `${id}-c${i}`);
    const t = objId(objs, `${id}-t${i}`);
    cek(c && t, `${pesan}: kotak dan angka ${i + 1} ada`);
    if (!c || !t) continue;
    stat.digit += 1;
    hampir(c.x, x + i * cw, 1e-6, `${pesan}: kotak ${i + 1} (x)`);
    hampir(c.y, y, 1e-6, `${pesan}: kotak ${i + 1} (y)`);
    sama(t.isi, digit[i], `${pesan}: angka ke-${i + 1}`);
    hampir(t.x, x + (i + 0.5) * cw, 1e-6, `${pesan}: angka ${i + 1} di tengah kotak`);
    const dariKanan = n - 1 - i;
    const warna = kelompok ? (Math.floor(dariKanan / 3) % 2 === 0 ? "#DCFCE7" : "#DBEAFE") : "#FFFFFF";
    sama(c.warna, warna, `${pesan}: warna kotak ${i + 1}`);
  }
  cek(!objId(objs, `${id}-c${n}`), `${pesan}: tepat ${n} kotak`);
};
/** Titik ribuan tepat di batas kelompok: tiga angka di kanan titik. */
const cekTitik = (objs, id, x, y, cw, ch, n, pesan) => {
  const p = objId(objs, id);
  cek(p, `${pesan}: titik ribuan ada`);
  if (!p) return;
  hampir(p.x, x + (n - 3) * cw, 1e-6, `${pesan}: titik di antara angka ke-${n - 3} dan ke-${n - 2}`);
  hampir(p.y, y + ch + 4, 1e-6, `${pesan}: titik di bawah deret`);
};

/* ------------------------------ Isi video materi, dihitung mandiri ------------------------------ */
{
  // Pembuka dan skema.
  sama(M1.JP_SUBBAB.map((s) => s.jp), [4, 2, 2, 8], "jam pelajaran empat subbab (Tabel 1.1)");
  sama(M1.JP_SUBBAB.reduce((t, s) => t + s.jp, 0), 16, "total 16 jam pelajaran");
  const peta = T(M, "peta-konsep", 3);
  M1.JP_SUBBAB.forEach((s, i) => {
    hampir(objId(peta, `sb${i}`).w, s.jp * M1.SKALA_JP, 1e-6, `bar subbab ${s.h}: lebar sebanding jam pelajaran`);
    sama(nilaiId(peta, `sj${i}`), `${s.jp} JP`, `bar subbab ${s.h}: tulisan jam pelajaran`);
  });
  sama(nilaiId(peta, "tt-t0"), "total 16 JP", "total jam pelajaran di gambar");

  // Harga tiga jus Nisa (Buku Siswa hlm. 4; kunci Panduan Guru hlm. 21).
  sama(M2.HARGA_JUS, [6375, 5950, 9050], "tiga harga jus");
  {
    const jus = adegan(M, "jus-nisa");
    const t2 = akhirAdegan(jus, 1);
    cekTabel(t2, "jus", M2.TB_JUS, 4, [kel(6375), [null, null, null, null], [null, null, null, null]], "jus ketukan 2");
    const t3 = akhirAdegan(jus, 2);
    cekTabel(t3, "jus", M2.TB_JUS, 4, [kel(6375), kel(5950), kel(9050)], "jus ketukan 3");
    sama(["hj0-t0", "hj1-t0", "hj2-t0"].map((id) => nilaiId(t3, id)), [6375, 5950, 9050].map((n) => `Rp${titikRibu(n)}`), "chip harga jus");
    cek(jus.ketukan[1].suara.includes(terbilang(6375)) && jus.ketukan[2].suara.includes(terbilang(5950)) && jus.ketukan[2].suara.includes(terbilang(9050)), "suara menyebut ketiga harga jus dengan benar");
    // Tabel kunci Panduan Guru hlm. 21 (6 3 7 5 / 5 9 5 0 / 9 0 5 0) sama dengan angka harga.
    sama([[6, 3, 7, 5], [5, 9, 5, 0], [9, 0, 5, 0]].map((b) => Number(b.join(""))), [6375, 5950, 9050], "kunci tabel jus sama dengan harga");
    const t4 = akhirAdegan(jus, 3);
    sama(objId(t4, "jus-c2-1").warna, G.W.merahMuda, "sel nol di ratusan disorot");
    sama(Number("9050".replace("0", "")), 950, "tanpa nol di ratusan, 9050 terbaca 950");
    sama(nilaiId(t4, "pk-t0"), "tanpa nol terbaca 950", "kartu tanpa nol");
  }

  // Empat belas ribu lima ratus: buku tulis Yohana (hlm. 5-6).
  {
    const a = adegan(M, "menulis-yohana");
    sama(nilaiId(akhirAdegan(a, 0), "hb-t0"), terbilang(14500), "harga buku tulis dibaca");
    sama(nilaiId(akhirAdegan(a, 0), "hr"), `Rp${titikRibu(14500)}`, "harga buku tulis ditulis");
    sama(nilaiId(akhirAdegan(a, 1), "c1"), terbilang(14500), "cara menulis: bacaan");
    sama(nilaiId(akhirAdegan(a, 1), "c3"), titikRibu(14500), "cara menulis: angka");
    cekTabel(akhirAdegan(a, 2), "km", M2.TB_KOMANG, 5, [digitOf(14500)], "Cara Komang");
    const t4 = akhirAdegan(a, 3);
    sama([nilaiId(t4, "y1"), nilaiId(t4, "y2"), nilaiId(t4, "y3"), nilaiId(t4, "y4")].join(" "), terbilang(14500), "Cara Yohana: kalimat");
    sama(Number(nilaiId(t4, "y6")) * 1000 + Number(nilaiId(t4, "y8")) * 100, 14500, "Cara Yohana: 14 ribu dan 5 ratus");
    sama(nilaiId(t4, "y9"), titikRibu(14500), "Cara Yohana: hasil");
    cekTabel(akhirAdegan(a, 4), "km", M2.TB_KOMANG, 5, [digitOf(14500)], "lima langkah");
    sama(nilaiId(akhirAdegan(a, 4), "jb"), titikRibu(14500), "lima langkah: bilangan jadi");
    sama(digitOf(14500), ["1", "4", "5", "0", "0"], "angka 14.500 per nilai tempat");
  }

  // Harga obat batuk (hlm. 7).
  {
    const a = adegan(M, "membaca-obat");
    sama(nilaiId(akhirAdegan(a, 1), "hl-t0"), `Rp${titikRibu(66500)},00/botol`, "label harga obat");
    const t3 = akhirAdegan(a, 2);
    sama(nilaiId(t3, "rb"), titikRibu(66500), "harga obat ditulis");
    sama(`${nilaiId(t3, "rb1")} ${nilaiId(t3, "rb2")}`, terbilang(66500), "harga obat dibaca");
    cekTabel(akhirAdegan(a, 3), "ob", M2.TB_KOMANG, 5, [digitOf(66500)], "nilai tempat 66.500");
    sama(digitOf(66500), ["6", "6", "5", "0", "0"], "angka 66.500 per nilai tempat");
  }

  // Penduduk Kayu Tanam (hlm. 7; kunci hlm. 23-24).
  {
    const a = adegan(M, "kayu-tanam");
    sama(13354 + 13578, 26932, "laki-laki ditambah perempuan sama dengan seluruh penduduk");
    const t1 = akhirAdegan(a, 0);
    sama([nilaiId(t1, "ks-t0"), nilaiId(t1, "kl-t0")], [`seluruhnya: ${titikRibu(26932)} jiwa`, `laki-laki: ${titikRibu(13354)} jiwa`], "kartu jumlah penduduk");
    sama(`${nilaiId(t1, "kp-t0")} ${nilaiId(t1, "kp-t1")}`, `perempuan: ${terbilang(13578)} jiwa`, "kartu penduduk perempuan (ditulis dengan kata, seperti di buku)");
    sama(nilaiId(t1, "kt-t0"), "Sumatra Barat, tahun 2018", "kartu lokasi");
    cekTabel(akhirAdegan(a, 1), "ky", M2.TB_KAYU, 5, [digitOf(26932), [null, null, null, null, null], [null, null, null, null, null]], "kunci soal 1");
    cekTabel(akhirAdegan(a, 2), "ky", M2.TB_KAYU, 5, [digitOf(26932), digitOf(13578), [null, null, null, null, null]], "kunci soal 2");
    cekTabel(akhirAdegan(a, 3), "ky", M2.TB_KAYU, 5, [digitOf(26932), digitOf(13578), digitOf(13354)], "kunci soal 3");
    sama([nilaiId(akhirAdegan(a, 1), "r0-t0"), nilaiId(akhirAdegan(a, 2), "r1-t0"), nilaiId(akhirAdegan(a, 3), "r2-t0")], [`seluruh penduduk: ${titikRibu(26932)} jiwa`, `perempuan: ${titikRibu(13578)} jiwa`, `laki-laki: ${titikRibu(13354)} jiwa`], "kartu per soal");
    const t5 = akhirAdegan(a, 4);
    for (const [i, n] of [[0, 26932], [1, 13578], [2, 13354]]) {
      sama(nilaiId(t5, `b${i}-t0`), titikRibu(n), `soal 4: angka ${n}`);
      sama(nilaiId(t5, `b${i}-t1`), terbilang(n), `soal 4: bacaan ${n}`);
    }
    sama(nilaiId(t5, "bq"), `${titikRibu(13354)} + ${titikRibu(13578)} = ${titikRibu(26932)}`, "pemeriksaan jumlah");
  }

  // Ayo Berlatih nomor 1: kunci a tertukar (Rp15.590 di kunci, Rp15.950 di gambar).
  {
    const a = adegan(M, "berlatih-satu");
    const t2 = akhirAdegan(a, 1);
    sama(nilaiId(t2, "ka-t0"), `kunci: Rp${titikRibu(15590)}`, "kunci a menurut Panduan Guru");
    sama(`${nilaiId(t2, "kb")} ${nilaiId(t2, "kc")}`, terbilang(15590), "kunci a dibaca sesuai tulisannya");
    const t3 = akhirAdegan(a, 2);
    sama(nilaiId(t3, "kd-t0"), `label gambar: Rp${titikRibu(15950)}`, "label gambar a");
    sama(nilaiId(t3, "ke"), terbilang(15950), "label gambar a dibaca");
    cek(kel(15590).sort().join("") === kel(15950).sort().join("") && 15590 !== 15950, "kunci a hanya menukar urutan angka (angka sama, bilangan berbeda)");
    sama(nilaiId(t3, "ka-k") === undefined, true, "kartu kunci tidak diganti benda lain");
    const t4 = akhirAdegan(a, 3);
    sama(nilaiId(t4, "kf-t0"), `Rp${titikRibu(16667)}`, "label b");
    sama(`${nilaiId(t4, "kg")} ${nilaiId(t4, "kh")}`, terbilang(16667), "kunci b benar");
    const t5 = akhirAdegan(a, 4);
    sama(nilaiId(t5, "kj-t0"), `Rp${titikRibu(44567)}`, "label c");
    cekTabel(t5, "bc", M3.TB_C, 5, [digitOf(44567)], "nilai tempat 44.567");
    sama(terbilang(44567), "empat puluh empat ribu lima ratus enam puluh tujuh", "kunci c benar");
  }

  // Ayo Berlatih nomor 2 (hubungkan) dan nomor 3 (tabel).
  {
    const a = adegan(M, "berlatih-dua-tiga");
    cek(M3.KIRI_BACA.every((b) => `${b.a} ${b.b}` === terbilang(b.n)), "kelima cara baca sama dengan terbilang bilangannya");
    sama(M3.KANAN_ANGKA, [88976, 54675, 40350, 25786, 13456], "urutan bilangan di kolom kanan buku");
    const t1 = akhirAdegan(a, 0);
    M3.KIRI_BACA.forEach((b, i) => {
      sama([nilaiId(t1, `kl${i}-t0`), nilaiId(t1, `kl${i}-t1`)].join(" "), terbilang(b.n), `cara baca ${i + 1}`);
      hampir(objId(t1, `kl${i}-k`).y, M3.BARIS_Y[i], 1e-6, `kartu cara baca ${i + 1} di barisnya`);
    });
    M3.KANAN_ANGKA.forEach((n, r) => sama(nilaiId(t1, `kr${r}-t0`), titikRibu(n), `bilangan kanan ${r + 1}`));
    const t2 = akhirAdegan(a, 1);
    const pasangan = M3.KIRI_BACA.map((b) => M3.KANAN_ANGKA.indexOf(b.n));
    sama(pasangan, [4, 2, 0, 3, 1], "pasangan kunci: kiri ke baris kanan");
    pasangan.forEach((r, i) => {
      const g = objId(t2, `ln${i}`);
      cek(g, `garis ${i + 1} ada`);
      if (!g) return;
      stat.sel += 1;
      hampir(g.x, 154, 1e-6, `garis ${i + 1}: mulai di tepi kanan kartu cara baca`);
      hampir(g.y, M3.BARIS_Y[i] + 14, 1e-6, `garis ${i + 1}: mulai di tengah kartu kiri`);
      hampir(g.x + g.x2, 214, 1e-6, `garis ${i + 1}: berakhir di tepi kiri kartu bilangan`);
      hampir(g.y + g.y2, M3.BARIS_Y[r] + 14, 1e-6, `garis ${i + 1}: berakhir di tengah kartu kanan baris ${r + 1}`);
      cek(nilaiId(t2, `kr${r}-t0`) === titikRibu(M3.KIRI_BACA[i].n), `garis ${i + 1}: bilangan tujuan ${titikRibu(M3.KIRI_BACA[i].n)}`);
    });
    sama(objId(akhirAdegan(a, 2), "ln2").tebal, 3.2, "pasangan contoh ditebalkan");
    // Soal 3.
    const t6 = akhirAdegan(a, 5);
    const baris = [[87986, "ribuan", ""], [56786, "ratusan", ""], [73457, "puluh ribuan", "dan satuan"]];
    baris.forEach(([n, tempat], i) => {
      sama(nilaiId(t6, `s3-t${i}0`), titikRibu(n), `soal 3 baris ${i + 1}: bilangan`);
      sama(`${nilaiId(t6, `s3-t${i}1`)} ${nilaiId(t6, `s3-t${i}1b`)}`, terbilang(n), `soal 3 baris ${i + 1}: dibaca`);
      const tempatTujuh = digitOf(n).map((d, j) => (d === "7" ? NAMA_TEMPAT[j].toLowerCase() : null)).filter(Boolean);
      sama([nilaiId(t6, `s3-t${i}2`), nilaiId(t6, `s3-t${i}2b`)].filter(Boolean).join(" "), tempatTujuh.join(" dan ").replace("puluh ribuan dan satuan", "puluh ribuan dan satuan"), `soal 3 baris ${i + 1}: tempat angka 7`);
      cek(tempat.length > 0, `soal 3 baris ${i + 1}: jawaban tempat ada`);
      const sel = objId(t6, `s3-c${i}0`);
      hampir(sel.x, M3.KOLOM3[0].x, 1e-6, `soal 3 baris ${i + 1}: sel bilangan di kolomnya`);
      hampir(sel.y, M3.BARIS3_Y[i], 1e-6, `soal 3 baris ${i + 1}: sel di barisnya`);
      stat.sel += 1;
    });
    sama(tigaDigitKunci(), true, "kunci panduan guru soal 3 baris 1 dan 2 (ribuan, ratusan) sesuai angka tujuh");
  }

  // Penutup: lima nilai tempat dan nilainya.
  {
    const a = adegan(M, "penutup-guru");
    cekTabel(akhirAdegan(a, 4), "rk", M3.TB_RINGKAS, 5, [NILAI.map((n) => titikRibu(n))], "ringkasan nilai tempat");
    cek(NILAI.slice(0, 4).every((n, i) => n === NILAI[i + 1] * 10), "tiap nilai tempat sepuluh kali nilai tempat di kanannya");
    const r = akhirAdegan(a, 3);
    cek(["rf0t", "rf1t", "rf2t"].every((id) => objId(r, id)), "refleksi: tiga butir (membaca, menuliskan, nilai tempat)");
  }

  // Mengingat kembali (hlm. 3).
  {
    const a = adegan(M, "mengingat-kembali");
    const t2 = akhirAdegan(a, 1);
    sama(nilaiId(t2, "q1"), titikRibu(3456), "soal 1: bilangan");
    sama(`${nilaiId(t2, "q1b")} ${nilaiId(t2, "q1c")}`, terbilang(3456), "soal 1: dibaca");
    const t3 = akhirAdegan(a, 2);
    sama(nilaiId(t3, "q2a"), terbilang(3320), "soal 2: kalimat");
    sama([nilaiId(t3, "q2d"), nilaiId(t3, "q2e"), nilaiId(t3, "q2f"), nilaiId(t3, "q2g")], kel(3320), "soal 2: angka tiap tempat");
    sama([nilaiId(t3, "q2dl"), nilaiId(t3, "q2el"), nilaiId(t3, "q2fl"), nilaiId(t3, "q2gl")], ["ribuan", "ratusan", "puluhan", "satuan"], "soal 2: nama tempat");
    sama(nilaiId(t3, "q2h-t0"), titikRibu(3320), "soal 2: bilangan jadi");
    const t4 = akhirAdegan(a, 3);
    sama(nilaiId(t4, "q3"), titikRibu(2345), "soal 3: bilangan");
    sama(NAMA_TEMPAT.slice(1)[kel(2345).indexOf("2")], "Ribuan", "soal 3: angka 2 di ribuan");
    const t5 = akhirAdegan(a, 4);
    sama([nilaiId(t5, "q4a"), nilaiId(t5, "q4b")], ["56 + 75", "= 131"], "soal 4: hasil");
    sama(56 + 75, 131, "56 ditambah 75 sama dengan 131");
  }
}
function tigaDigitKunci() {
  // Panduan Guru hlm. 25: 87.986 punya angka 7 di ribuan; 56.786 di ratusan.
  return digitOf(87986).indexOf("7") === 1 && digitOf(56786).indexOf("7") === 2 && digitOf(73457)[0] === "7" && digitOf(73457)[4] === "7";
}

/* ------------------------------ Metode luar: isi dan geometri ------------------------------ */
{
  // Place-Value Chart.
  {
    const a = adegan(U, "luar-pv");
    cekTabel(akhirAdegan(a, 1), "pv", LU1.TB_PV, 5, [NILAI.map((n) => titikRibu(n))], "nilai tiap kolom");
    cek(NILAI.every((n, i) => i === 4 || n === NILAI[i + 1] * 10), "tiap kolom sepuluh kali kolom di kanannya");
    const b = adegan(U, "luar-pv-terapan");
    const Tp = { x: LU1.TB_PV.x, y: LU1.TB_PV.y, cw: LU1.TB_PV.cw, o: { ch: 30, u: 16 } };
    cekTabel(akhirAdegan(b, 0), "pt", Tp, 5, [digitOf(26932)], "26.932 di tabel");
    sama(nilaiId(akhirAdegan(b, 0), "pb"), titikRibu(26932), "bilangan 26.932 ditulis");
    const t2 = akhirAdegan(b, 1);
    sama(nilaiId(t2, "n1"), titikRibu(2 * NILAI[0]), "dua di puluh ribuan bernilai 20.000");
    sama(Number(nilaiId(t2, "n2")), 2 * NILAI[4], "dua di satuan bernilai 2");
    cek(objId(t2, "pt-c0-0").sorot === true && objId(t2, "pt-c0-4").sorot === true, "dua kotak angka dua disorot");
    cekTabel(akhirAdegan(b, 2), "pu", Tp, 5, [digitOf(14500)], "14.500 di tabel");
    sama(nilaiId(akhirAdegan(b, 2), "pb2"), titikRibu(14500), "bilangan 14.500 ditulis");
    sama(`${nilaiId(akhirAdegan(b, 3), "c2")} ${nilaiId(akhirAdegan(b, 3), "c3")}`, terbilang(26932), "baca ulang 26.932");
    sama(nilaiId(akhirAdegan(b, 3), "c1"), titikRibu(26932), "baca ulang: bilangan");
  }
  // Extended Dienes.
  {
    cek(UKURAN.every((s, i) => i === 0 || s < UKURAN[i - 1]), "ukuran balok mengecil dari puluh ribuan ke satuan");
    const a = adegan(U, "luar-dienes");
    const t1 = akhirAdegan(a, 0);
    const CXs = LU1.CX;
    for (let j = 0; j < 5; j += 1) {
      cekBlok(t1, `dn${j}`, CXs[j], 60, j, 1, `balok kolom ${NAMA_TEMPAT[j]}`);
      sama(nilaiId(t1, `dn${j}n`), NAMA_TEMPAT[j].toLowerCase(), `nama kolom balok ${j + 1}`);
      sama(nilaiId(t1, `dn${j}v`), titikRibu(NILAI[j]), `nilai kolom balok ${j + 1}`);
      if (j > 0) cek(CXs[j] - CXs[j - 1] >= UKURAN[j] / 2 + UKURAN[j - 1] / 2 + 4, `kolom balok ${j} dan ${j + 1} tidak bertabrakan`);
    }
    const t2 = akhirAdegan(a, 1);
    cekBlok(t2, "tk", 90, 44, 1, 10, "sepuluh balok ribuan");
    cekBlok(t2, "tm", 210, 70, 0, 1, "satu balok puluh ribuan");
    cek(10 * NILAI[1] === NILAI[0], "sepuluh balok ribuan bernilai sama dengan satu balok puluh ribuan");
    sama([nilaiId(t2, "tl"), nilaiId(t2, "tn")], ["10 balok ribuan", "1 balok puluh ribuan"], "tulisan tukar balok");
    // 14.500 dan 13.578.
    const b = adegan(U, "luar-dienes-terapan");
    const ts = (ke) => akhirAdegan(b, ke);
    const cx = LU1.CX;
    const h1 = digitOf(14500).map((d) => Number(d || 0));
    h1.forEach((n, j) => cekBlok(ts(0), `ea${j}`, cx[j], 46, j, n, `balok 14.500 kolom ${j + 1}`));
    sama(nilaiId(ts(0), "eb"), titikRibu(14500), "14.500 ditulis");
    sama(h1, [1, 4, 5, 0, 0], "banyak balok 14.500");
    cek(h1.reduce((t, n, j) => t + n * NILAI[j], 0) === 14500, "balok 14.500 bernilai 14.500");
    sama([0, 1, 2, 3, 4].map((j) => nilaiId(ts(1), `ea${j}c`)), h1.map(String), "cacah balok 14.500");
    sama(["en", "en2"].map((id) => nilaiId(ts(0), id)), ["tidak ada", "tidak ada"], "kolom tanpa balok diberi tulisan");
    const h2 = digitOf(13578).map((d) => Number(d || 0));
    h2.forEach((n, j) => cekBlok(ts(2), `eb${j}`, cx[j], 46, j, n, `balok 13.578 kolom ${j + 1}`));
    sama(h2, [1, 3, 5, 7, 8], "banyak balok 13.578");
    cek(h2.reduce((t, n, j) => t + n * NILAI[j], 0) === 13578, "balok 13.578 bernilai 13.578");
    sama([0, 1, 2, 3, 4].map((j) => nilaiId(ts(2), `eb${j}c`)), h2.map(String), "cacah balok 13.578");
    sama(nilaiId(ts(2), "eb2"), titikRibu(13578), "13.578 ditulis");
    cek(h2[4] < 10 && h2[3] < 10, "delapan balok satuan belum cukup menjadi sepuluh");
    for (let j = 1; j < 5; j += 1) cek(Math.abs(cx[j] - cx[j - 1] - 56) < 1e-9, `kolom ${j} dan ${j + 1} berjarak sama`);
  }
  // Number Reading.
  {
    const bagi = (n) => [Math.floor(n / 1000), n % 1000];
    sama(bagi(66500), [66, 500], "66.500: kiri 66, kanan 500");
    const a = adegan(U, "luar-baca");
    sama(nilaiId(akhirAdegan(a, 0), "nb"), titikRibu(66500), "66.500 ditulis");
    sama(nilaiId(akhirAdegan(a, 0), "nk-t1"), "66", "bagian kiri 66");
    const t2 = akhirAdegan(a, 1);
    sama([nilaiId(t2, "nqa-t0"), nilaiId(t2, "nqa-t1"), nilaiId(t2, "nqc-t0"), nilaiId(t2, "nqc-t1")], ["bagian kiri: 66", terbilang(66), "bagian kanan: 500", terbilang(500)], "kartu bacaan 66.500");
    sama(`${terbilang(66)} ribu ${terbilang(500)}`, terbilang(66500), "bagian kiri, ribu, bagian kanan sama dengan bacaan utuh");
    const t3 = akhirAdegan(a, 2);
    sama(nilaiId(t3, "n3"), titikRibu(40350), "40.350 ditulis");
    sama(`${nilaiId(t3, "n4")} ${nilaiId(t3, "n5")}`, terbilang(40350), "40.350 dibaca");
    sama(nilaiId(t3, "n7-t0"), `bagian kanan: ${bagi(40350)[1]}`, "bagian kanan 40.350");
    cek(digitOf(40350)[4] === "0" && !/nol/.test(terbilang(40350)), "angka nol di satuan tidak dibaca");
    const b = adegan(U, "luar-baca-terapan");
    const belah = (ke, id, n) => {
      const t = akhirAdegan(b, ke);
      const [kiri, kanan] = bagi(n);
      sama(nilaiId(t, `${id}b`), titikRibu(n), `${n}: bilangan`);
      sama([nilaiId(t, `${id}a-t1`), nilaiId(t, `${id}c-t1`)], [String(kiri), String(kanan)], `${n}: bagian kiri dan kanan`);
      sama([nilaiId(t, `${id}d`), nilaiId(t, `${id}e`)], [terbilang(kiri), terbilang(kanan)], `${n}: bacaan kiri dan kanan`);
      sama(`${terbilang(kiri)} ribu ${terbilang(kanan)}`, terbilang(n), `${n}: gabungan sama dengan bacaan utuh`);
    };
    belah(0, "n1", 26932);
    belah(2, "n3", 88976);
    belah(3, "n4", 13456);
    const t2b = akhirAdegan(b, 1);
    sama([nilaiId(t2b, "n2a-t0"), nilaiId(t2b, "n2c-t0"), nilaiId(t2b, "n2d")], [`26: ${terbilang(26)}`, `932: ${terbilang(932)}`, titikRibu(26932)], "gabungan 26.932");
  }
  // Period Grouping.
  {
    const gabung = (digit) => `${digit.slice(0, digit.length - 3)}.${digit.slice(digit.length - 3)}`;
    sama(["14500", "88976", "54675", "100000"].map(gabung), ["14.500", "88.976", "54.675", "100.000"], "titik di antara kelompok tiga angka dari kanan");
    sama(["14500", "88976", "54675", "100000"].map(gabung), ["14500", "88976", "54675", "100000"].map(titikRibu), "gabungan sama dengan pemisah ribuan");
    const DGs = LU2.DG;
    const a = adegan(U, "luar-periode");
    cekDeret(akhirAdegan(a, 0), "pg", DGs.x, DGs.y, DGs.cw, DGs.ch, "14500", true, "deret 14500");
    sama([nilaiId(akhirAdegan(a, 0), "pgk"), nilaiId(akhirAdegan(a, 0), "pgr")], ["periode ribuan", "periode ratusan"], "nama dua periode");
    hampir(objId(akhirAdegan(a, 0), "pgk").x, DGs.x + (2 * DGs.cw) / 2, 1e-6, "periode ribuan di tengah dua angka kiri");
    hampir(objId(akhirAdegan(a, 0), "pgr").x, DGs.x + 2 * DGs.cw + 1.5 * DGs.cw, 1e-6, "periode ratusan di tengah tiga angka kanan");
    cekTitik(akhirAdegan(a, 1), "pg-p", DGs.x, DGs.y, DGs.cw, DGs.ch, 5, "titik 14.500");
    sama(nilaiId(akhirAdegan(a, 1), "pgh"), titikRibu(14500), "14.500 ditulis");
    const b = adegan(U, "luar-periode-terapan");
    cekDeret(akhirAdegan(b, 0), "pu", DGs.x, DGs.y, DGs.cw, DGs.ch, "88976", true, "deret 88976");
    cekTitik(akhirAdegan(b, 1), "pu-p", DGs.x, DGs.y, DGs.cw, DGs.ch, 5, "titik 88.976");
    sama(nilaiId(akhirAdegan(b, 1), "pua"), titikRibu(88976), "88.976 ditulis");
    cekDeret(akhirAdegan(b, 2), "pv", DGs.x, DGs.y, DGs.cw, DGs.ch, "54675", true, "deret 54675");
    cekTitik(akhirAdegan(b, 2), "pv-p", DGs.x, DGs.y, DGs.cw, DGs.ch, 5, "titik 54.675");
    sama(nilaiId(akhirAdegan(b, 2), "pva"), titikRibu(54675), "54.675 ditulis");
    cekDeret(akhirAdegan(b, 3), "pw", 45, DGs.y, 35, DGs.ch, "100000", true, "deret 100000");
    cekTitik(akhirAdegan(b, 3), "pw-p", 45, DGs.y, 35, DGs.ch, 6, "titik 100.000");
    sama(nilaiId(akhirAdegan(b, 3), "pwa"), titikRibu(100000), "100.000 ditulis");
    cek(100000 === 1 * 10 ** 5 && String(100000).length === 6, "seratus ribu memakai satu angka satu dan lima nol");
    // Sebelum kelompok diucapkan, kotak masih putih (belum berkelompok).
    const awal = L.keadaanStory(b, 0, 2);
    cek(awal.filter((o) => /^pu-c\d$/.test(o.id)).every((o) => o.warna === "#FFFFFF"), "deret 88976 mula-mula tanpa warna kelompok");
  }
  // Ringkasan.
  {
    const a = adegan(U, "luar-ringkas");
    sama(nilaiId(akhirAdegan(a, 0), "rb"), titikRibu(13456), "ringkasan: bilangan 13.456");
    cekTabel(akhirAdegan(a, 1), "rt", LU2.TB_R, 5, [digitOf(13456)], "ringkasan: tabel 13.456");
    sama(digitOf(13456), ["1", "3", "4", "5", "6"], "angka 13.456");
    sama([nilaiId(akhirAdegan(a, 2), "rx-t1"), nilaiId(akhirAdegan(a, 2), "ry-t1")], [`${Math.floor(13456 / 1000)} | ribu | ${13456 % 1000}`, titikRibu(13456)], "ringkasan: kata dan titik");
  }
  // Tambahan: nilai tergantung kolom, balok besar dan kecil, cek nilai balok, nol di tengah, dan bilangan empat angka.
  {
    const t4 = akhirAdegan(adegan(U, "luar-pv"), 3);
    const Tp = { x: LU1.TB_PV.x, y: 34, cw: LU1.TB_PV.cw, o: { ch: 30, u: 16 } };
    cekTabel(t4, "pr", Tp, 5, [[null, null, "5", null, null]], "lima di ratusan");
    cekTabel(t4, "ps", { ...Tp, y: 106 }, 5, [[null, null, null, null, "5"]], "lima di satuan");
    sama([5 * NILAI[2], 5 * NILAI[4]], [500, 5], "nilai angka lima di ratusan dan di satuan");
    sama([nilaiId(t4, "pra"), nilaiId(t4, "psa")], ["5 di ratusan: nilainya 500", "5 di satuan: nilainya 5"], "tulisan nilai angka lima");
    const td = akhirAdegan(adegan(U, "luar-dienes"), 3);
    cekBlok(td, "bp", 100, 70, 0, 1, "balok puluh ribuan");
    cekBlok(td, "bs", 220, 85, 4, 1, "balok satuan");
    sama([nilaiId(td, "bpn"), nilaiId(td, "bsn")], [titikRibu(NILAI[0]), "1"], "nilai dua balok");
    cek(UKURAN[0] > UKURAN[4], "balok puluh ribuan lebih besar daripada balok satuan");
    const te = akhirAdegan(adegan(U, "luar-dienes-terapan"), 3);
    const angka = (s) => Number(s.replace(/\./g, ""));
    let jumlah = 0;
    LU1.NILAI_BARIS.forEach(([rumus, hasil], i) => {
      const m = rumus.match(/^(\d) × (\d{1,3}(?:\.\d{3})*)$/);
      cek(m, `baris cek ${i + 1}: bentuk "${rumus}"`);
      if (!m) return;
      stat.persamaan += 1;
      sama(Number(m[1]) * angka(m[2]), angka(hasil), `baris cek ${i + 1}: ${rumus} sama dengan ${hasil}`);
      sama(Number(m[1]), Number(digitOf(13578)[i]), `baris cek ${i + 1}: banyak balok sama dengan angka 13.578`);
      sama(angka(m[2]), NILAI[i], `baris cek ${i + 1}: nilai tempat`);
      sama([nilaiId(te, `ev${i}a`), nilaiId(te, `ev${i}b`)], [rumus, hasil], `baris cek ${i + 1}: tampak di gambar`);
      jumlah += angka(hasil);
    });
    sama(jumlah, 13578, "jumlah nilai semua balok sama dengan 13.578");
    sama(nilaiId(te, "evt"), titikRibu(13578), "hasil cek balok");
    const tn = akhirAdegan(adegan(U, "luar-baca"), 3);
    sama(nilaiId(tn, "n8"), titikRibu(9050), "9.050 ditulis");
    sama([nilaiId(tn, "n8a-t1"), nilaiId(tn, "n8c-t1")], ["9", "050"], "9.050: bagian kiri dan kanan (nol di ratusan)");
    sama([nilaiId(tn, "n8d"), nilaiId(tn, "n8e")], [terbilang(9), terbilang(50)], "9.050: bacaan kiri dan kanan");
    cek(9050 % 1000 === 50 && digitOf(9050)[2] === "0", "9.050: ratusannya nol, bagian kanan hanya 50");
    const tg = akhirAdegan(adegan(U, "luar-periode"), 3);
    cekDeret(tg, "pz", 78, LU2.DG.y, LU2.DG.cw, LU2.DG.ch, "3456", true, "deret 3456");
    cekTitik(tg, "pz-p", 78, LU2.DG.y, LU2.DG.cw, LU2.DG.ch, 4, "titik 3.456");
    sama(nilaiId(tg, "pza"), titikRibu(3456), "3.456 ditulis");
    hampir(objId(tg, "pzk").x, 78 + LU2.DG.cw / 2, 1e-6, "periode ribuan 3456 di tengah satu angka kiri");
    hampir(objId(tg, "pzr").x, 78 + LU2.DG.cw + 1.5 * LU2.DG.cw, 1e-6, "periode ratusan 3456 di tengah tiga angka kanan");
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
  // Buku Siswa hlm. 1-9 = PDF 17-25 (dan Refleksi hlm. 26 = PDF 42); Panduan Guru hlm. 15-25 = PDF 27-37.
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 17, 25), ambil(bs, 42, 42), ambil(bg, 27, 37)] : [null];
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
    cek(n >= 100, `jumlah kutipan buku yang diperiksa (${n})`);
    cek(M.adegan.every((a) => (a.kutipan ?? []).length >= 5), "tiap adegan materi memuat paling sedikit 5 kutipan buku");
    // Subbab A tidak memuat butir subbab B pada rentang halaman yang dipakai (Buku Siswa berhenti sebelum "B. Membandingkan").
    cek(!/b\. membandingkan dan mengurutkan/.test(bersih(bagian[0])), "Buku Siswa PDF 17-25 tidak memuat subbab B");
    // Keganjilan buku yang dicatat di video: kunci a tertukar (Panduan Guru Rp15.590,00; gambar Buku Siswa Rp15.950,00), tabel soal 3 dan kata "depalan".
    cek(bersih(bagian[2]).includes("rp15.590,00"), "Panduan Guru memang menulis kunci a Rp15.590,00");
    cek(bersih(bagian[0]).includes("rp15.950,00"), "Buku Siswa memang menulis label a Rp15.950,00");
    cek(bersih(bagian[2]).includes("depalan"), "Panduan Guru memang menulis 'depalan' di kunci soal 3");
    // Bilangan yang dipakai video muncul di buku.
    for (const n2 of ["6.375", "14.500", "66.500", "26.932", "13.354", "13.578", "16.667", "44.567", "88.976", "54.675", "40.350", "25.786", "13.456", "87.986"]) cek(buku.includes(n2) || buku.includes(terbilang(Number(n2.replace(".", ""))).toLowerCase()), `bilangan ${n2} ada di buku (angka atau kata)`);
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k5b1a-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k5b1a-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k5b1a sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k5b1a.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_A51|video-k4b2-umum|naskah-k5b1/.test(pembungkus) && /VIDEO_MATERI_K5B1A/.test(pembungkus) && /VIDEO_LUAR_K5B1A/.test(pembungkus) && /export function VideoK5B1A/.test(pembungkus), "video-k5b1a.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k5b1a.tsx: akhir baris LF");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.sel} sel dan garis, ${stat.balok} balok, ${stat.digit} angka pada tabel dan deret, ${stat.terbilang} bilangan berkata, ${stat.persamaan} persamaan, ${stat.teksPasang} pasangan teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
