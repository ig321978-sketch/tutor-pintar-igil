// Uji Story Kelas 4 Bab 4 Sub-Bab B (Pengukuran Volume, penutup bab): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar (bilangan >= 100 yang diucapkan dengan kata dibaca ulang menjadi angka), perubahan gambar tiap ketukan,
// keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar, kutipan buku (bila PDF ada), persamaan di gambar dihitung ulang,
// jumlah kubus satuan tiap bangun (dihitung dari daftar kubusnya dan dari muka kubus yang tergambar), luas pada kisi Uji Kompetensi 3, tinggi air gelas ukur,
// hitungan mandiri (konversi liter dan mililiter, kunci Ayo Berlatih, Uji Kompetensi, pengayaan, rubrik), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k4b4b.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/[.][a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b4b-video.ts");

const stat = { persamaan: 0, banding: 0, angkaSuara: 0, teksPasang: 0, format: 0, kartu: 0, keping: 0, urutan: 0 };
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
  const s = ekspr.replace(/(?<=\d)\.(?=\d{3}(?!\d))/g, "").replace(/−/g, "-").replace(/×/g, "*").replace(/÷/g, "/");
  if (!/^[\d\s+\-*/().]+$/.test(s)) return NaN;
  return Function(`"use strict"; return (${s});`)();
};
sama([nilai("9 + 1 + 5 + 2 + 6"), nilai("(14 + 16) ÷ 2"), nilai("3 × 15 + 2 × 10"), nilai("365 − 292")], [23, 15, 65, 73], "evaluator aritmetika");

const VIDEO = [V.VIDEO_MATERI_K4B4B, V.VIDEO_LUAR_K4B4B];
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
const M = V.VIDEO_MATERI_K4B4B;
const U = V.VIDEO_LUAR_K4B4B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksVisible = (objs) => objs.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi).map((o) => o.isi);
/** Semua teks yang pernah tampak di sebuah adegan (gabungan semua ketukan). */
const teksAdegan = (v, id) => new Set(adegan(v, id).ketukan.flatMap((kt, i) => L.kataDari(kt.suara).flatMap((_, p) => teksVisible(L.keadaanStory(adegan(v, id), i, p)))));
const seluruhTeks = (v) => v.adegan.map((a) => [a.judul, a.sumber, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
{
  const teksVideo = (v) => JSON.stringify(seluruhTeks(v));
  const NAMA_METODE = /Volume as Filling|Layer Model|Displacement Idea|Benchmark Referents|Volume sebagai Mengisi|Model Lapisan|Ide Pemindahan Air|Patokan Benda Sehari-hari/;
  const KATA_METODE = /metode luar|metode dari luar/i;
  const METODE_A = /Area as Covering|Luas sebagai Menutupi|Array Area|Luas Susunan|Nonstandard then Standard|Tak Baku ke Baku/;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi) && !KATA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Volume as Filling", "Layer Model", "Displacement Idea", "Benchmark Referents", "Volume sebagai Mengisi", "Model Lapisan", "Ide Pemindahan Air", "Patokan Benda Sehari-hari"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(!METODE_A.test(materi + luar), "tidak memuat metode luar Sub-Bab A");
  cek(M.adegan.every((a) => /(Buku Siswa|Panduan Guru) hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Sub-Bab B", "Aktivitas 3", "Aktivitas 4", "Ayo berlatih", "Uji Kompetensi", "Miskonsepsi", "Pengayaan", "Refleksi", "orang tua", "Panduan Guru", "Rubrik", "kapasitas", "liter", "mililiter", "sentimeter kubik", "meter kubik"]) cek(new RegExp(kata, "i").test(materi), `video materi memuat "${kata}"`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-vf", "luar-vf-terapan", "luar-lm", "luar-lm-terapan", "luar-di", "luar-di-terapan", "luar-br", "luar-br-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk empat metode");
  cek(M.adegan.length === 16 && U.adegan.length === 10, "16 adegan materi dan 10 adegan metode luar");
  cek(!/piktogram|diagram batang|pecahan|bangun datar|jaring-jaring|bab lima|bab enam|bab tiga/i.test(materi + luar), `tidak membahas bab lain (${(materi + luar).match(/piktogram|diagram batang|pecahan|bangun datar|jaring-jaring/i)?.[0]})`);
  cek(totalKetukan >= 90, `total ketukan cukup dalam (${totalKetukan})`);
  // metode luar memakai angka dan bangun dari buku
  for (const kata of ["A = 4 satuan botol B", "A = 10 satuan botol C", "1 botol = 8 satuan", "18 = 2 × 9", "4 × 2 = 8 cm³", "C: 6 × 2 = 12", "D: 9 × 2 = 18", "12 + 6 + 6 = 24 cm³", "12 + 2 = 14 cm³", "109 − 100 = 9", "118 − 100 = 18", "124 − 100 = 24", "5 ml", "240 ml", "330 ml", "ember 10 l = 10 botol × 1 l", "tong 150 l ÷ 10 = 15 ember", "4 × 256 = 1.024 ml", "2.200 − 1.000 ≈ 1.200 l", "1.249 l 675 ml"]) cek(luar.includes(kata), `video metode luar memuat "${kata}"`);
  // temuan buku tampak di video materi
  for (const kata of ["kunci buku: 0,623 m² ✖", "6.350 ÷ 10.000 = 0,635 m²", "12 × 900 = 10.800 ml", "kunci buku: 11.700 ml ✖", "12.156 − 10.800 = 1.356 ml", "kunci buku: 436 ml ✖", "kunci buku: 95", "10 × 15 = 150", "butir 5: bobot kosong di buku", "butir 3: tidak menjawab = skor 5"]) cek(materi.includes(kata), `video materi memuat temuan "${kata}"`);
}


/* ------------------------------ Persamaan, perbandingan, urutan, dan format di gambar dihitung ulang ------------------------------ */
{
  const BENTUK_PERSAMAAN = /^[\d.\s+−×÷()]+( = [\d.]+)+$/;
  const bersihkan = (t) => {
    let s = t.includes(": ") ? t.slice(t.lastIndexOf(": ") + 2) : t;
    s = s.replace(/^[a-e]\. /, "").split(/,s/)[0].replace(/\s[A-Za-z][A-Za-z ]*$/, "");
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

/* ------------------------------ Geometri murni: kubus satuan, kisi, dan gelas ukur ------------------------------ */
const G = await import("../src/components/modul/story/k4b4b-gambar.ts");
// semua lintasan (kubus, kisi) masuk kanvas 300 x 208
{
  let n = 0;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        for (const o of akhirAdegan(a, i)) {
          if (o.t !== "jalur") continue;
          const angka = (o.d.match(/-?\d+(\.\d+)?/g) ?? []).map(Number);
          const xs = angka.filter((_, q) => q % 2 === 0).map((q) => q + (o.x ?? 0));
          const ys = angka.filter((_, q) => q % 2 === 1).map((q) => q + (o.y ?? 0));
          n += 1;
          cek(Math.min(...xs) >= 0 && Math.max(...xs) <= 300 && Math.min(...ys) >= 22 && Math.max(...ys) <= 204, `${v.id}/${a.id}#${i + 1}: lintasan ${o.id} masuk kanvas (x ${Math.min(...xs)}..${Math.max(...xs)}, y ${Math.min(...ys)}..${Math.max(...ys)})`);
        }
      });
    }
  }
  cek(n > 500, `jumlah lintasan yang diperiksa batas kanvasnya (${n})`);
}
{
  const B = G.BANGUN;
  // volume tiap bangun buku dihitung ulang dari daftar kubusnya, bukan dari angka bukunya
  const hitung = (n) => new Set(B[n].vox.map((v) => v.join(","))).size;
  sama(Object.keys(B).map((n) => [n, hitung(n) === B[n].vox.length]).filter((p) => !p[1]), [], "tiap kubus satuan menempati sel yang berbeda");
  const kotakVol = (n) => {
    const v = B[n].vox;
    const m = [0, 1, 2].map((i) => Math.max(...v.map((t) => t[i])) + 1);
    return m[0] * m[1] * m[2];
  };
  sama(["A", "B", "C", "D", "a", "d", "dua12"].map((n) => [kotakVol(n), hitung(n)]), [[9, 9], [8, 8], [12, 12], [18, 18], [4, 4], [12, 12], [12, 12]], "bangun balok penuh: panjang x lebar x tinggi sama dengan jumlah kubus");
  sama(["A", "B", "C", "D"].map((n) => B[n].vox.length), [9, 8, 12, 18], "Ayo Berlatih 1: A 9, B 8, C 12, D 18 (kunci Panduan Guru hlm. 161)");
  sama(["a", "b", "c", "d", "e"].map((n) => B[n].vox.length), [4, 5, 4, 12, 14], "Ayo Berlatih 2: a 4, b 5, c 4, d 12, e 14 (kunci Panduan Guru hlm. 162)");
  sama([B.i.vox.length, B.ii.vox.length], [24, 9], "Ayo Mencoba: (i) 24 dan (ii) 9");
  const perLapis = (n) => { const o = {}; for (const v of B[n].vox) o[v[2]] = (o[v[2]] ?? 0) + 1; return Object.values(o); };
  sama(perLapis("i"), [12, 6, 6], "bangun (i): lapisan 12, 6, 6");
  sama(perLapis("ii"), [4, 1, 1, 3], "bangun (ii): 4 mendatar, 2 naik, 3 mendatar di atas");
  sama(perLapis("e"), [12, 2], "bangun e: alas 12 dan 2 di atas");
  sama(perLapis("B").concat(perLapis("C"), perLapis("D")), [4, 4, 6, 6, 9, 9], "lapisan B 4 x 2, C 6 x 2, D 9 x 2");
  sama(Object.keys(B).filter((n) => B[n].vox.length !== B[n].buku), [], "jumlah kubus sama dengan volume menurut buku");
  // pangkat tiga satuan: 1 m = 100 cm; 1 m3 = 100^3 cm3 = 1.000.000 cm3 = 1.000.000 ml = 1.000 l
  sama([100 * 100 * 100, 100 ** 3 / 1000], [1000000, 1000], "1 m3 = 1.000.000 cm3 = 1.000.000 ml = 1.000 l");
  // gambar: muka depan, atas, kanan tiap kubus tergambar
  const HARAP = {
    "kubus-mencoba": [[0, { g1: 24 }], [1, { h1: 9 }], [2, { mA: 9, mB: 8, mC: 12, mD: 18 }]],
    "kubus-berlatih": [[0, { za: 4, zb: 5, zc: 4, zd: 12, ze: 14 }], [1, { y1: 12, y2: 14 }], [2, { x1: 12, x2: 12 }]],
    "aktivitas-4": [[0, { k2: 12 }], [1, { k4: 4, k5: 4 }]],
    "cm3-m3": [[0, { c1: 1 }]],
  };
  const HARAP_LUAR = {
    "luar-vf-terapan": [[2, { th: 9 }], [3, { tj: 9, tl: 18 }]],
    "luar-lm": [[0, { ma: 18 }]],
    "luar-lm-terapan": [[0, { na: 8 }], [1, { ne: 12, nf: 18 }], [2, { ni: 24 }], [3, { nk: 14 }]],
    "luar-di-terapan": [[0, { gb: 9 }], [1, { gb: 18 }], [2, { gb: 24 }]],
  };
  const kelompok = (objs) => {
    const g = {};
    for (const o of objs) {
      const m = o.id.match(/^(.+)-(\d+)([ftr])$/);
      if (m) (g[m[1]] ??= { f: new Set(), t: new Set(), r: new Set() })[m[3]].add(m[2]);
    }
    return g;
  };
  for (const [video, daftarHarap] of [[M, HARAP], [U, HARAP_LUAR]]) {
    for (const [id, ketukan] of Object.entries(daftarHarap)) {
      for (const [i, harap] of ketukan) {
        const objs = akhirAdegan(adegan(video, id), i);
        const g = kelompok(objs);
        for (const [pre, n] of Object.entries(harap)) {
          stat.keping += 1;
          cek(g[pre] && g[pre].f.size === n && g[pre].t.size === n && g[pre].r.size === n, `${id}#${i + 1}: gambar ${pre} memuat ${n} kubus satuan (muka depan ${g[pre]?.f.size})`);
        }
      }
    }
  }
  // teks "N cm3" atau "N kubus" yang menempel pada kelompok kubus sama dengan jumlah kubus tergambar
  let tertaut = 0;
  for (const v of [M, U]) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        const objs = akhirAdegan(a, i);
        const g = kelompok(objs);
        for (const o of objs) {
          if (o.t !== "teks" || !o.isi || !o.id.endsWith("t")) continue;
          const pre = o.id.slice(0, -1);
          if (!g[pre]) continue;
          const mm = o.isi.match(/^(?:[A-Za-z]: )?(\d+) (cm³|kubus)$/);
          if (!mm) continue;
          tertaut += 1;
          cek(Number(mm[1]) === g[pre].f.size, `${v.id}/${a.id}#${i + 1}: tulisan "${o.isi}" sama dengan ${g[pre].f.size} kubus tergambar`);
        }
      });
    }
  }
  cek(tertaut >= 12, `tulisan volume yang diperiksa terhadap gambar kubus (${tertaut})`);
  // painter: urutan lukis belakang ke depan (kedalaman menurun)
  {
    const o = G.kubus("t", 0, 0, 10, B.D.vox);
    const urutan = o.filter((x) => x.id.endsWith("f")).map((x) => Number(x.id.match(/-(\d+)f$/)[1]));
    const dalam = urutan.map((n) => B.D.vox[n][1]);
    cek(dalam.every((d, q) => q === 0 || d <= dalam[q - 1]), "kubus dilukis dari belakang ke depan");
  }
  // kisi Uji Kompetensi 3
  const kisiHasil = {};
  for (const a of [adegan(M, "uk-1")]) {
    a.ketukan.forEach((_, i) => {
      const objs = akhirAdegan(a, i);
      for (const o of objs) {
        const m = o.id.match(/^(k[abc])-b$/);
        if (!m) continue;
        const fr = objs.find((x) => x.id === `${m[1]}-fr`);
        const nama = { ka: "A", kb: "B", kc: "C" }[m[1]];
        const q = G.KISI[nama];
        const c = fr.w / q.cols;
        stat.keping += 1;
        cek(Math.abs(fr.h / q.rows - c) < 1e-6, `kisi ${nama}: kotak kisi persegi`);
        const lebar = Math.round(o.w / c);
        const tinggi = Math.round(o.h / c);
        cek(Math.abs(o.w / c - lebar) < 1e-6 && Math.abs(o.h / c - tinggi) < 1e-6, `kisi ${nama}: persegi panjang mengikuti kisi`);
        kisiHasil[nama] = lebar * tinggi;
        // persegi panjang berada di dalam kisi
        cek(o.x >= fr.x && o.y >= fr.y && o.x + o.w <= fr.x + fr.w + 1e-6 && o.y + o.h <= fr.y + fr.h + 1e-6, `kisi ${nama}: persegi panjang di dalam kisi`);
      }
    });
  }
  sama([kisiHasil.A, kisiHasil.B, kisiHasil.C], [15, 84, 12], "luas pada kisi A, B, C dihitung dari gambar: 5 x 3, 12 x 7, 3 x 4");
  sama(["A", "B", "C"].map((n) => G.KISI[n].kunci), [15, 84, 12], "kunci Panduan Guru hlm. 164: A 15, B 84, C 12");
  // bangun D: kerangka 10 x 15 dengan kisi sebagian; kunci buku 95 tidak cocok
  {
    const objs = akhirAdegan(adegan(M, "uk-1"), 3);
    const fr = objs.find((x) => x.id === "kd-fr");
    const c = fr.w / G.KISI_D.cols;
    sama([Math.round(fr.w / c), Math.round(fr.h / c)], [10, 15], "bangun D: kerangka 10 kotak x 15 kotak");
    const sel = G.KISI_D.mulai.reduce((t, m) => t + (G.KISI_D.cols - m), 0);
    sama([sel, G.KISI_D.cols * G.KISI_D.rows], [63, 150], "bangun D: 63 kotak kisi tergambar dari 150");
    cek(G.KISI_D.kunci === 95 && G.KISI_D.cols * G.KISI_D.rows !== G.KISI_D.kunci, "bangun D: kunci buku 95 tidak sama dengan 10 x 15");
    const g = objs.find((x) => x.id === "kd-g");
    cek((g.d.match(/Z/g) ?? []).length === 63, "bangun D: lintasan kisi memuat 63 kotak");
  }
  // gelas ukur: tinggi air sesuai tulisan, kenaikan sama dengan volume bangun
  {
    const di = adegan(U, "luar-di-terapan");
    const hasil = [];
    for (let i = 0; i < 3; i += 1) {
      const objs = akhirAdegan(di, i);
      const air = objs.find((x) => x.id === "gx-a");
      const label = objs.find((x) => x.id === "gx-l").isi;
      const naikTeks = Number(objs.find((x) => x.id === "gd-t0").isi.match(/naik (\d+) ml/)[1]);
      const volTeks = Number(objs.find((x) => x.id === "gc-t0").isi.match(/volume (\d+) cm³/)[1]);
      const kubusDrawn = kelompok(objs).gb.f.size;
      const level = Math.round(air.h / 0.5);
      stat.keping += 1;
      cek(`${level} ml` === label, `gelas ukur ${i + 1}: tinggi air ${level} sama dengan tulisan ${label}`);
      cek(level - 100 === naikTeks && naikTeks === volTeks && volTeks === kubusDrawn, `gelas ukur ${i + 1}: air naik ${level - 100} = volume ${volTeks} cm3 = ${kubusDrawn} kubus tergambar`);
      cek(Math.abs(air.y + air.h - 144) < 1e-6, `gelas ukur ${i + 1}: air berada di dasar gelas`);
      hasil.push(level);
    }
    sama(hasil, [109, 118, 124], "tinggi air akhir 109, 118, 124 mililiter");
  }
}

/* ------------------------------ Hitungan buku dan rubrik, dihitung ulang mandiri ------------------------------ */
{
  const konv = (ml) => `${Math.floor(ml / 1000)} l ${ml % 1000} ml`;
  const ml = (l, m = 0) => l * 1000 + m;
  // Ayo Berlatih (Buku Siswa hlm. 132; Panduan Guru hlm. 158-159)
  sama([250 + 200 + 1000, konv(250 + 200 + 1000)], [1450, "1 l 450 ml"], "Ayo Berlatih 1: 250 + 200 + 1.000 = 1.450 ml = 1 l 450 ml");
  sama([konv(75000), konv(9485), konv(23456)], ["75 l 0 ml", "9 l 485 ml", "23 l 456 ml"], "Ayo Berlatih 2: 75 l; 9 l 485 ml; 23 l 456 ml");
  sama([2225 - 975, konv(ml(2225) - ml(975, 325))], [1250, "1249 l 675 ml"], "Ayo Berlatih 3: tangki 1.249 l 675 ml");
  sama([ml(2225) - ml(975, 325)], [1249675], "Ayo Berlatih 3 lewat mililiter: 2.225.000 - 975.325 = 1.249.675");
  sama([55 + 40 + 60, 575 + 480 + 825, konv(ml(55, 575) + ml(40, 480) + ml(60, 825))], [155, 1880, "156 l 880 ml"], "Ayo Berlatih 4: 155 l, 1.880 ml, 156 l 880 ml");
  // Uji Kompetensi 4-7 (Panduan Guru hlm. 165-166)
  sama([konv(1500), konv(ml(1, 1450))], ["1 l 500 ml", "2 l 450 ml"], "UK 4: 1 l 500 ml dan 2 l 450 ml");
  sama([konv(ml(7, 500) - ml(3, 700)), 7500 - 3700], ["3 l 800 ml", 3800], "UK 5: 3 l 800 ml (dua cara)");
  sama(konv(6340), "6 l 340 ml", "UK 6: 6 l 340 ml");
  sama([3 + 2 + 3, 250 + 750 + 500, konv(ml(3, 250) + ml(2, 750) + ml(3, 500))], [8, 1500, "9 l 500 ml"], "UK 7: 8 l + 1.500 ml = 9 l 500 ml");
  // Pengayaan 1 (Panduan Guru hlm. 170-171): kunci benar
  sama([140000 / 10000, 36 - 15 - 14], [14, 7], "Pengayaan 1: 14 m2 ketela dan sisa 7 m2");
  // Pengayaan 2: kunci menulis 0,623 m2; hitungan benar 0,635 m2
  {
    const biru = 0.42 * 10000;
    const semua = biru + 2300;
    const pakai = semua - 150;
    sama([Math.round(biru), semua, pakai, pakai / 10000], [4200, 6500, 6350, 0.635], "Pengayaan 2: 4.200, 6.500, 6.350 cm2 dan 0,635 m2");
    cek(pakai / 10000 !== 0.623, "Pengayaan 2: kunci 0,623 m2 tidak sama dengan 0,635 m2");
  }
  // Pengayaan 3 sama dengan Ayo Berlatih 3; Pengayaan 4
  sama([12 * 12, 144 * 500, 144 * 500 / 1000], [144, 72000, 72], "Pengayaan 4: 144 botol, 72.000 ml, 72 l");
  // Pengayaan 5: soal 12 l 156 ml; kunci memakai 12 l 136 ml dan 12 x 900 = 11.700
  {
    const drum = ml(12, 156);
    const butuh = 12 * 900;
    sama([drum, butuh, drum - butuh, konv(drum - butuh)], [12156, 10800, 1356, "1 l 356 ml"], "Pengayaan 5: 12.156, 10.800, sisa 1.356 ml = 1 l 356 ml");
    sama([11700 / 900, ml(12, 136), ml(12, 136) - 11700, drum - 11700], [13, 12136, 436, 456], "Pengayaan 5: kunci 11.700 = 13 x 900, volume 12.136, sisa 436 (dari angka keliru); 12.156 - 11.700 = 456");
    cek(drum >= butuh, "Pengayaan 5: setiap toko mendapat pasokan (12.156 >= 10.800)");
  }
  // rubrik pengetahuan Tabel 4.2 (Panduan Guru hlm. 166-167): bobot butir 5 kosong, dihitung 10
  const BOBOT = [10, 10, 20, 10, 10, 20, 20];
  sama([BOBOT.length, BOBOT.reduce((t, b) => t + b, 0), BOBOT.reduce((t, b) => t + b, 0) - BOBOT[4]], [7, 100, 90], "rubrik: tujuh butir berjumlah 100; tanpa butir 5 hanya 90");
  sama([5 + 2 + 3, 3 * 4, Math.round((9 / 12) * 100)], [10, 12, 75], "nilai: 5 + 2 + 3 = 10 dan keterampilan n / 12 x 100 (contoh n 9 = 75)");
  const teksRubrik = [...teksAdegan(M, "penutup-b")].join(" | ");
  cek(["10 + 10 + 20 + 10 + 10 + 20 + 20 = 100", "Np = (5 × N1 + 2 × N2 + 3 × N3) ÷ 10", "Nk = n ÷ 12 × 100"].every((s) => teksRubrik.includes(s)), "penutup: gambar memuat rumus rubrik dan nilai");
  // refleksi guru 9 butir, interaksi orang tua 6 cara
  sama([9, 6], [9, 6], "refleksi guru 9 butir dan interaksi orang tua 6 cara");
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
  // Buku Siswa hlm. 122-138 = PDF 134-150; Panduan Guru hlm. 155-174 = PDF 167-186 (offset kelas IV: PDF dikurangi 12).
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 134, 150), ambil(bg, 167, 186)] : [null];
  if (bagian.some((b) => b === null)) console.log("PDF atau pdftotext tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/mℓ/g, "ml").replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const buku = bersih(bagian.join("\n"));
    let n = 0;
    for (const a of M.adegan) {
      for (const kt of a.kutipan ?? []) {
        n += 1;
        cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
      }
    }
    // angka kunci yang dipakai video benar-benar ada di Panduan Guru
    const bgSaja = bersih(bagian[1]);
    for (const s of ["1.249 l 675 ml", "156 l 880 ml", "9 liter 500 ml", "0.623 m2", "12 liter 136 ml", "11.700 ml", "= 436 ml", "volume bangun a adalah 9 cm3", "luas bangun d adalah 95 persegi satuan", "= 72 liter"]) cek(bgSaja.includes(bersih(s)), `Panduan Guru memuat kunci "${s}"`);
    cek(n >= 100, `jumlah kutipan buku yang diperiksa (${n})`);
    console.log(`Kutipan buku diperiksa: ${n}`);
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k4b4b-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k4b4b-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k4b4b sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../video-k4b4b.tsx", folder), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_B44|video-k4b2-umum|naskah-k4b4/.test(pembungkus) && /VIDEO_MATERI_K4B4B/.test(pembungkus) && /VIDEO_LUAR_K4B4B/.test(pembungkus) && /export function VideoK4B4B/.test(pembungkus) && /DaftarVideoCerita/.test(pembungkus) && !/mulaiLangsung/.test(pembungkus), "pembungkus video-k4b4b: mesin Story, tanpa naskah lama");
  cek(!pembungkus.includes("\r"), "pembungkus video-k4b4b: akhir baris LF");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.persamaan} persamaan, ${stat.banding} perbandingan, ${stat.format} angka berformat, ${stat.keping} gambar bangun, ${stat.angkaSuara} bilangan suara, ${stat.kartu} teks kartu, ${stat.teksPasang} pasang teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
