// Uji Story Kelas 5 Bab 5 Sub-Bab D (hubungan keliling dan luas, penutup bab): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// pemisahan materi dan metode luar, kutipan buku dan Buku Panduan Guru (bila PDF ada), hitungan mandiri dan geometri gambar
// (ukuran kerangka pada petak, tabel keliling dan luas, diagram batang, kolam renang, rasio kepersegian),
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b5d.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b5d-video.ts");
const G = await import("../src/components/modul/story/k5b5d-gambar.ts");

let lulus = 0;
let gagal = 0;
const cek = (kondisi, pesan) => {
  if (kondisi) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", pesan);
  }
};
const js = (x) => JSON.stringify(x, (_, v) => (typeof v === "bigint" ? `${v}n` : v));
const sama = (a, b, pesan) => cek(js(a) === js(b), `${pesan}: ${js(a)} != ${js(b)}`);

/* Mesin (logika-story) diuji lengkap di scripts/uji-story-k6b4a.mjs. */
cek(typeof L.keadaanStory === "function" && typeof L.posisiKata === "function", "mesin Story tersedia");

/* ------------------------------ Bilangan mandiri ------------------------------ */
const angka = (t) => Number(String(t).replace(/\./g, ""));
const bandingSelisih = (a, b) => (angka(a) - angka(b) > 0 ? ">" : angka(a) - angka(b) < 0 ? "<" : "=");

/** Periksa semua hubungan bilangan di teks gambar: kali, bagi, jumlah, selisih, dan rantai pembanding. Mengembalikan jumlah yang diperiksa. */
function periksaTeks(t, nama) {
  let n = 0;
  let s = t;
  const pola = (re, f) => {
    for (const m of s.matchAll(re)) {
      n += 1;
      f(m);
    }
    s = s.replace(re, " ");
  };
  pola(/(\d[\d.]*) x (\d[\d.]*) = (\d[\d.]*)/g, (m) => cek(angka(m[1]) * angka(m[2]) === angka(m[3]), `${nama}: hasil kali di gambar "${m[0]}" benar`));
  pola(/(\d[\d.]*) : (\d[\d.]*) = (\d[\d.]*)/g, (m) => cek(angka(m[1]) === angka(m[2]) * angka(m[3]), `${nama}: hasil bagi di gambar "${m[0]}" benar`));
  pola(/(\d[\d.]*) - (\d[\d.]*) = (\d[\d.]*)/g, (m) => cek(angka(m[1]) - angka(m[2]) === angka(m[3]), `${nama}: selisih di gambar "${m[0]}" benar`));
  pola(/(\d[\d.]*) \+ (\d[\d.]*) = (\d[\d.]*)/g, (m) => cek(angka(m[1]) + angka(m[2]) === angka(m[3]), `${nama}: jumlah di gambar "${m[0]}" benar`));
  for (const m of s.matchAll(/\d[\d.]*(?: [<>=] \d[\d.]*)+/g)) {
    const bagian = m[0].split(" ");
    for (let i = 0; i + 2 < bagian.length; i += 2) {
      n += 1;
      cek(bandingSelisih(bagian[i], bagian[i + 2]) === bagian[i + 1], `${nama}: rantai di gambar "${m[0]}" benar`);
    }
  }
  return n;
}

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K5B5D, V.VIDEO_LUAR_K5B5D];
const bilanganDari = (t) => (t.match(/\d[\d.]*\d|\d/g) ?? []).map((v) => v.replace(/\./g, ""));
const semuaSidik = new Map();
let totalKetukan = 0;
let totalKata = 0;
let diperiksa = 0;
for (const v of VIDEO) {
  cek(v.adegan.length >= 7, `${v.id}: paling sedikit 7 adegan (ada ${v.adegan.length})`);
  cek(["materi", "metode-luar"].includes(v.jenis) && v.judul.length > 5 && v.subjudul.length > 5, `${v.id}: jenis dan judul ada`);
  cek(new Set(v.adegan.map((a) => a.id)).size === v.adegan.length, `${v.id}: id adegan unik`);
  for (const a of v.adegan) {
    const nama = `${v.id}/${a.id}`;
    cek(a.ketukan.length >= 3 && a.ketukan.length <= 14, `${nama}: 3 sampai 14 ketukan (ada ${a.ketukan.length})`);
    cek(a.sumber.length > 8 && a.sumber.length <= 75 && a.judul.length > 5 && /^#[0-9A-Fa-f]{6}$/.test(a.latar), `${nama}: sumber (paling panjang 75 huruf), judul, dan latar ada`);
    let sebelumnya = null;
    const terlihat = new Set();
    a.ketukan.forEach((kt, i) => {
      const kata = L.kataDari(kt.suara);
      totalKetukan += 1;
      totalKata += kata.length;
      cek(kata.length >= 6 && kata.length <= 40, `${nama}#${i + 1}: 6 sampai 40 kata (ada ${kata.length})`);
      cek(!/[=×÷<>\/%+]/.test(kt.suara), `${nama}#${i + 1}: suara tanpa lambang yang sulit dibaca mesin suara`);
      cek(/[.?!]$/.test(kt.suara.trim()), `${nama}#${i + 1}: suara berakhir tanda baca`);
      cek(kt.aksi.length >= 1, `${nama}#${i + 1}: ada aksi gambar`);
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
      // sinkron angka: tiap bilangan dalam suara tampak di gambar pada ketukan ini atau sebelumnya
      for (let p = 0; p < kata.length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(b);
      for (const b of bilanganDari(kt.suara)) cek(terlihat.has(b), `${nama}#${i + 1}: bilangan ${b} di suara tampak di gambar`);
      for (const o of akhir) if (o.t === "teks" && (o.op ?? 1) > 0 && o.isi) diperiksa += periksaTeks(o.isi, `${nama}#${i + 1}`);
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
          cek(y > 0 && y < 200 && kiri > -4 && kiri + lebar < 304, `${nama}#${i + 1}: teks "${o.isi}" masuk kanvas (x=${x}, y=${y}, lebar=${Math.round(lebar)})`);
        } else if (o.t === "kotak") cek(x > -2 && y > -2 && x + (o.w ?? 0) < 302 && y + (o.h ?? 0) < 202, `${nama}#${i + 1}: kotak ${o.id} masuk kanvas`);
        else if (o.t === "bulat") cek(x - (o.r ?? 0) > -2 && x + (o.r ?? 0) < 302 && y - (o.r ?? 0) > -2 && y + (o.r ?? 0) < 202, `${nama}#${i + 1}: bulat ${o.id} masuk kanvas`);
        else if (o.t === "jalur") cek(x > -2 && x < 302 && y > -2 && y < 210, `${nama}#${i + 1}: jalur ${o.id} berpusat di kanvas`);
        else if (o.t === "garis" || o.t === "panah") cek(x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 205 && x > -2 && x < 302 && y > -2 && y < 205, `${nama}#${i + 1}: ${o.t} ${o.id} masuk kanvas`);
      }
    });
  }
}

/* ------------------------------ Pemisahan materi dan metode luar ------------------------------ */
const teksVideo = (v) => JSON.stringify(v.adegan.map((a) => [a.judul, a.sumber, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]));
const M = V.VIDEO_MATERI_K5B5D;
const U = V.VIDEO_LUAR_K5B5D;
const adegan = (v, id) => v.adegan.find((x) => x.id === id);
const keadaan = (v, id, i) => L.keadaanStory(adegan(v, id), i, 9999);
const cari = (objs, id) => objs.find((o) => o.id === id);
{
  const NAMA_METODE = /Isoperimetric|Fixed Perimeter|Fixed Area|Squareness|Maximize|Minimize|metode luar|metode dari luar/i;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Isoperimetric Relationship", "Fixed Perimeter Maximize Area", "Fixed Area Minimize Perimeter", "Squareness Ratio"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(!/Refleksi|Uji Kompetensi|Panduan Guru|miskonsepsi|remedial|pengayaan/i.test(luar), "video metode luar tidak memuat isi materi kurikulum");
  cek(M.adegan.every((a) => /Buku (Siswa|Panduan Guru)/.test(a.sumber) && /hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /metode (dari )?luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Sub-Bab D", "Eksplorasi 5.4", "Bapak", "kawat", "persegi panjang", "Refleksi", "miskonsepsi", "diferensiasi", "pengayaan", "kolam", "keramik", "remedial", "orang tua", "Panduan Guru", "kertas berpetak", "apersepsi|tanya jawab", "Bab 7", "dibulatkan", "225", "125", "216", "200"]) cek(new RegExp(kata, "i").test(materi), `video materi memuat ${kata}`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar5d-iso", "luar5d-iso-terapan", "luar5d-maks", "luar5d-maks-terapan", "luar5d-min", "luar5d-min-terapan", "luar5d-rasio", "luar5d-rasio-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(M.adegan.length === 11 && U.adegan.length === 10, "11 adegan materi dan 10 adegan metode luar");
  cek(totalKetukan >= 90, `total ketukan cukup dalam (${totalKetukan})`);
  cek(diperiksa >= 60, `hubungan bilangan di gambar yang diperiksa mandiri (${diperiksa})`);
}

/* ------------------------------ Hitungan dan geometri, dihitung mandiri dari benda dan data ------------------------------ */
const semuaState = [];
for (const v of VIDEO) for (const a of v.adegan) a.ketukan.forEach((_, i) => semuaState.push([`${v.id}/${a.id}#${i + 1}`, L.keadaanStory(a, i, 9999)]));
const angkaDi = (t) => (String(t).match(/\d+(?:,\d+)?/g) ?? []).map((v) => Number(v.replace(",", ".")));
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const hampir = (a, b, t = 0.6) => Math.abs(a - b) < t;
const sama2 = (a, b) => js(a) === js(b);

{
  // 1) Data buku: enam ukuran berkeliling 60; luas sama dengan tabel; terluas persegi 15 x 15
  const B = G.BENTUK;
  cek(B.length === 6 && B.every(([p, l]) => 2 * (p + l) === 60 && G.keliling(p, l) === 60), "enam ukuran kerangka berkeliling 60");
  sama(B.map(([p, l]) => p * l), G.LUAS_BUKU, "luas enam bentuk sama dengan tabel kunci buku");
  sama(G.LUAS_BUKU, [200, 200, 125, 125, 225, 216], "tabel kunci buku: 200, 200, 125, 125, 225, 216");
  cek(Math.max(...G.LUAS_BUKU) === 225 && G.LUAS_BUKU.indexOf(225) === 4 && B[4][0] === B[4][1], "luas terbesar 225 pada persegi 15 x 15 (bentuk 5)");
  cek(Math.min(...G.LUAS_BUKU) === 125, "luas terkecil 125");
  cek(new Set(B.map(([p, l]) => [Math.min(p, l), Math.max(p, l)].join("x"))).size === 4, "bentuk 1 dan 2 serta 3 dan 4 hanya bertukar panjang dan lebar (empat ukuran tak berurutan)");

  // 2) Kerangka pada kertas berpetak: ukuran kotak sama dengan label cm dan satu petak = 5 cm
  let nk = 0;
  for (const [nama, objs] of semuaState) {
    const pk = cari(objs, "pk");
    const pp = cari(objs, "pp");
    const pl = cari(objs, "pl");
    const pg = cari(objs, "pg");
    if (!pk || !pp || !pl || !pg || pk.t !== "kotak") continue;
    const p = angkaDi(pp.isi)[0];
    const l = angkaDi(pl.isi)[0];
    nk += 1;
    cek(hampir(pk.w, (p / 5) * 10) && hampir(pk.h, (l / 5) * 10), `${nama}: kerangka ${p} x ${l} berukuran ${(pk.w / 10) * 5} x ${(pk.h / 10) * 5} cm pada petak 5 cm`);
    cek(B.some(([a, b]) => a === p && b === l), `${nama}: ukuran ${p} x ${l} ada di tabel buku`);
    cek(pk.x >= pg.x && pk.y >= pg.y && pk.x + pk.w <= pg.x + 150 && pk.y + pk.h <= pg.y + 100, `${nama}: kerangka di dalam kertas berpetak`);
    // hitungan di kanan: c1 jumlah, c2 keliling, d1 luas
    const c1 = cari(objs, "c1");
    const d1 = cari(objs, "d1");
    if (c1) {
      const [a, b, s] = angkaDi(c1.isi);
      cek(a === p && b === l && s === p + l, `${nama}: jumlah di gambar ${c1.isi} sesuai kerangka`);
      const c2 = cari(objs, "c2");
      if (c2) cek(angkaDi(c2.isi)[0] === 2 && angkaDi(c2.isi)[1] === p + l && angkaDi(c2.isi)[2] === 2 * (p + l), `${nama}: keliling ${c2.isi}`);
    }
    if (d1) {
      const [a, b, hasil] = angkaDi(d1.isi);
      cek(a === p && b === l && hasil === p * l, `${nama}: luas ${d1.isi} sesuai kerangka`);
    }
  }
  cek(nk >= 9, `kerangka pada petak yang dicek (${nk})`);

  // 3) Tabel Eksplorasi 5.4 (baris tr0..tr5): isi sama dengan kunci
  let nt = 0;
  for (const [nama, objs] of semuaState) {
    for (let i = 0; i < 6; i += 1) {
      const sel = [0, 1, 2, 3, 4].map((j) => cari(objs, `tr${i}-t${j}`)?.isi);
      if (sel.some((x) => x === undefined) || sel[1] === "...") continue;
      nt += 1;
      const [no, p, l, kel, lu] = sel;
      cek(Number(no) === i + 1 && Number(p) === G.BENTUK[i][0] && Number(l) === G.BENTUK[i][1], `${nama}: baris ${i + 1} berisi ukuran ${G.BENTUK[i].join(" x ")}`);
      cek(kel === `2 x (${p}+${l}) = ${2 * (Number(p) + Number(l))}` && lu === `${p} x ${l} = ${Number(p) * Number(l)}`, `${nama}: baris ${i + 1} keliling dan luas benar (${kel}; ${lu})`);
    }
  }
  cek(nt >= 16, `baris tabel terisi yang dicek (${nt})`);

  // 4) Diagram batang luas enam bentuk (adegan banding-luas)
  {
    const o = keadaan(M, "banding-luas", 0);
    for (let i = 0; i < 6; i += 1) {
      const b = cari(o, `b${i}`);
      const n = cari(o, `b${i}-n`);
      cek(b && n && Number(n.isi) === G.LUAS_BUKU[i] && b.h === Math.round((G.LUAS_BUKU[i] / 225) * 110), `banding: batang ${i + 1} bernilai ${G.LUAS_BUKU[i]} dengan tinggi sebanding`);
    }
    const tinggi = [0, 1, 2, 3, 4, 5].map((i) => cari(o, `b${i}`).h);
    cek(tinggi[4] === Math.max(...tinggi) && tinggi[2] === Math.min(...tinggi) && tinggi[0] === tinggi[1] && tinggi[2] === tinggi[3], "banding: batang 5 tertinggi, batang 3 dan 4 terendah, batang 1 sama 2");
    cek(225 - 125 === 100 && 18 * 12 === 216 && 18 - 12 === 6, "banding: hitungan 216 dan selisih 6 benar");
  }

  // 5) Kolam renang pengayaan: kunci buku dan hitungan mandiri
  {
    const K = G.KOLAM;
    cek(K.p === 15 && K.l === 6 && K.tepi === 1 && K.keramik === 40 && K.perDus === 5, "data kolam sama dengan soal buku");
    const luarBuku = [K.p + K.tepi, K.l + K.tepi];
    sama(luarBuku, [16, 7], "kunci buku memakai ukuran luar 16 x 7");
    const jalanBuku = luarBuku[0] * luarBuku[1] - K.p * K.l;
    cek(jalanBuku === 22 && 16 * 7 === 112 && 112 - 90 === 22, "kunci buku: luas jalan 22");
    const keramikM2 = (K.keramik * K.keramik) / 10000;
    cek(Math.abs(keramikM2 - 0.16) < 1e-9 && K.keramik * K.keramik === 1600, "satu keramik 1600 cm2 atau 0,16 m2");
    const buahBuku = jalanBuku / keramikM2;
    cek(Math.abs(buahBuku - 137.5) < 1e-9 && Math.abs(buahBuku / K.perDus - 27.5) < 1e-9 && Math.ceil(buahBuku / K.perDus) === 28, "kunci buku: 137,5 keramik, 27,5 dus, dibulatkan 28");
    const luarSemuaSisi = [K.p + 2 * K.tepi, K.l + 2 * K.tepi];
    sama(luarSemuaSisi, [17, 8], "tepian di semua sisi: ukuran luar 17 x 8");
    const jalan = luarSemuaSisi[0] * luarSemuaSisi[1] - K.p * K.l;
    const buah = jalan / keramikM2;
    cek(jalan === 46 && 17 * 8 === 136 && 136 - 90 === 46, "hitungan mandiri: luas jalan 46");
    cek(Math.abs(buah - 287.5) < 1e-9 && Math.abs(buah / K.perDus - 57.5) < 1e-9 && Math.ceil(buah / K.perDus) === 58, "hitungan mandiri: 287,5 keramik, 57,5 dus, dibulatkan 58");
    const teksPengayaan = JSON.stringify(adegan(M, "pengayaan-kolam").ketukan.map((kt, i) => L.teksTerlihat(L.keadaanStory(adegan(M, "pengayaan-kolam"), i, 9999))));
    for (const s of ["16 x 7 = 112", "15 x 6 = 90", "112 - 90 = 22", "40 x 40 = 1600", "137,5", "27,5", "28 dus", "17 x 8 = 136", "136 - 90 = 46", "287,5", "57,5", "58 dus"]) cek(teksPengayaan.includes(s), `pengayaan: gambar memuat ${s}`);
    // gambar kolam: ukuran piksel sebanding dengan meter (kunci buku 16 x 7 dan dalam 15 x 6)
    const o = keadaan(M, "pengayaan-kolam", 1);
    cek(cari(o, "kl") && cari(o, "kd") && hampir(cari(o, "kl").w / cari(o, "kl").h, 16 / 7, 0.02) && hampir(cari(o, "kd").w / cari(o, "kd").h, 15 / 6, 0.02), "gambar kolam: perbandingan sisi luar 16 : 7 dan dalam 15 : 6");
  }

  // 6) Metode luar Isoperimetric: tiga persegi panjang berkeliling 60 dengan luas 125, 200, 225
  {
    const o = keadaan(U, "luar5d-iso", 2);
    const ukuranPx = ["ra", "rb", "rc"].map((id) => [cari(o, id).w / 2, cari(o, id).h / 2]);
    sama(ukuranPx, [[5, 25], [10, 20], [15, 15]], "iso: ukuran tiga persegi panjang dari gambar");
    cek(ukuranPx.every(([p, l]) => 2 * (p + l) === 60) && sama2(ukuranPx.map(([p, l]) => p * l), [125, 200, 225]), "iso: ketiganya berkeliling 60 dengan luas 125, 200, 225");
    const t = keadaan(U, "luar5d-iso-terapan", 0);
    const chip = [0, 1, 2, 3, 4, 5].map((i) => cari(t, `ch${i}-t0`).isi);
    sama(chip, G.BENTUK.map(([p, l]) => `${p} x ${l}`), "iso terapan: enam bentuk sama dengan tabel buku");
    cek(new Set(G.LUAS_BUKU).size === 4, "iso terapan: empat nilai luas berbeda");
  }

  // 7) Fixed Perimeter Maximize Area: setengah keliling 30; luas p x (30 - p) puncak di 15
  {
    const luasDari = (p) => p * (30 - p);
    cek([5, 10, 15, 20, 25].every((p) => luasDari(p) === [125, 200, 225, 200, 125][[5, 10, 15, 20, 25].indexOf(p)]), "maks: p x (30 - p) untuk 5, 10, 15, 20, 25");
    let tertinggi = 0;
    for (let p = 1; p < 30; p += 1) if (luasDari(p) > luasDari(tertinggi || 1)) tertinggi = p;
    cek(tertinggi === 15, "maks: puncak luas pada panjang 15");
    cek(luasDari(13) === 221 && luasDari(14) === 224 && luasDari(15) === 225 && 225 > 224 && 224 > 221, "maks terapan: 221, 224, 225");
    for (const [d, lu] of [[0, 225], [2, 224], [6, 216], [10, 200], [20, 125]]) cek(((30 + d) / 2) * ((30 - d) / 2) === lu, `maks terapan: selisih ${d} memberi luas ${lu}`);
    let nm = 0;
    for (const [nama, objs] of semuaState) {
      if (!nama.includes("luar5d-maks#")) continue;
      for (const pre of ["r1", "r2", "r3", "r4", "r5"]) {
        const sel = [0, 1, 2].map((j) => cari(objs, `${pre}-t${j}`)?.isi);
        if (sel.some((x) => x === undefined)) continue;
        nm += 1;
        const [p, l, lu] = sel.map(Number);
        cek(p + l === 30 && p * l === lu, `${nama}: baris ${pre} ${p} + ${l} = 30 dan luas ${lu}`);
      }
    }
    cek(nm >= 7, `maks: baris tabel yang dicek (${nm})`);
    let nw = 0;
    for (const [nama, objs] of semuaState) {
      for (let i = 0; i < 5; i += 1) {
        const t = cari(objs, `w${i}-t`)?.isi;
        const m = t && /^selisih (\d+): luas (\d+)$/.exec(t);
        if (!m) continue;
        nw += 1;
        const d = Number(m[1]);
        cek(((30 + d) / 2) * ((30 - d) / 2) === Number(m[2]), `${nama}: ${t} benar`);
      }
    }
    cek(nw >= 5, `maks terapan: baris selisih yang dicek (${nw})`);
  }

  // 8) Fixed Area Minimize Perimeter: pasangan faktor luas 225 dan 200
  {
    let nf = 0;
    for (const [nama, objs] of semuaState) {
      const dasar = nama.includes("luar5d-min#") ? [["p1", "p2", "p3", "p4"], 225] : nama.includes("luar5d-min-terapan#") ? [["l1", "l2", "l3", "l4"], 200] : null;
      if (!dasar) continue;
      for (const pre of dasar[0]) {
        const sel = [0, 1, 2].map((j) => cari(objs, `${pre}-t${j}`)?.isi);
        if (sel.some((x) => x === undefined)) continue;
        nf += 1;
        const [p, l, kel] = sel.map(Number);
        cek(p * l === dasar[1] && 2 * (p + l) === kel, `${nama}: ${p} x ${l} luas ${dasar[1]} berkeliling ${kel}`);
      }
    }
    cek(nf >= 12, `min: pasangan faktor yang dicek (${nf})`);
    // keliling terkecil di antara semua pasangan bilangan bulat
    const terkecil = (L2) => {
      let t = Infinity;
      for (let p = 1; p <= L2; p += 1) if (L2 % p === 0) t = Math.min(t, 2 * (p + L2 / p));
      return t;
    };
    cek(terkecil(225) === 60 && terkecil(200) === 60, "min: keliling terkecil pada luas 225 dan 200 adalah 60");
    cek(14 * 14 === 196 && 15 * 15 === 225 && 196 < 200 && 200 < 225, "min terapan: 200 di antara dua persegi bersisi bulat");
    const o = keadaan(U, "luar5d-min-terapan", 3);
    const v = [0, 1, 2, 3].map((i) => Number(cari(o, `kb${i}-n`).isi));
    const hh = [0, 1, 2, 3].map((i) => cari(o, `kb${i}`).h);
    sama(v, [60, 66, 90, 108], "min terapan: keliling empat pasangan");
    cek(hh.every((h, i) => h === Math.round((v[i] / 108) * 100)), "min terapan: tinggi batang sebanding keliling");
  }

  // 9) Squareness Ratio: rasio sisi pendek per sisi panjang dalam persen, dan hubungannya dengan luas
  {
    const persen = (a, b) => Math.round((Math.min(a, b) / Math.max(a, b)) * 100);
    let nr = 0;
    for (const [nama, objs] of semuaState) {
      for (const o of objs) {
        if (o.t !== "teks" || !o.isi) continue;
        let m = /^(\d+) x (\d+) → rasio (\d+)%$/.exec(o.isi);
        if (m) {
          nr += 1;
          cek(persen(Number(m[1]), Number(m[2])) === Number(m[3]) && Number(m[1]) + Number(m[2]) === 30, `${nama}: ${o.isi} benar`);
        }
        m = /^(\d+) : (\d+) → (\d+)%$/.exec(o.isi);
        if (m) {
          nr += 1;
          cek(persen(Number(m[1]), Number(m[2])) === Number(m[3]), `${nama}: ${o.isi} benar`);
        }
        m = /^(\d+) : (\d+) → (\d+) : (\d+)$/.exec(o.isi);
        if (m) {
          nr += 1;
          const g = gcd(Number(m[1]), Number(m[2]));
          cek(Number(m[1]) / g === Number(m[3]) && Number(m[2]) / g === Number(m[4]), `${nama}: ${o.isi} benar`);
        }
        m = /^(\d+) x (\d+): rasio (\d+) : (\d+)$/.exec(o.isi);
        if (m) {
          nr += 1;
          const g = gcd(Number(m[1]), Number(m[2]));
          cek(Math.min(Number(m[1]), Number(m[2])) / g === Number(m[3]) && Math.max(Number(m[1]), Number(m[2])) / g === Number(m[4]), `${nama}: ${o.isi} benar`);
        }
      }
    }
    cek(nr >= 14, `rasio: label rasio yang dicek (${nr})`);
    const o = keadaan(U, "luar5d-rasio-terapan", 3);
    const pasang = [[5, 25], [10, 20], [12, 18], [15, 15]];
    for (let i = 0; i < 4; i += 1) {
      const [p, l] = pasang[i];
      cek(p + l === 30 && Number(cari(o, `rb${i}-n`).isi) === p * l && cari(o, `rt${i}`).isi === `${persen(p, l)}%` && cari(o, `rb${i}`).h === Math.round((p * l / 225) * 110), `rasio terapan: batang ${p} x ${l} luas ${p * l} rasio ${persen(p, l)}%`);
    }
    const hs = [0, 1, 2, 3].map((i) => cari(o, `rb${i}`).h);
    cek(hs.every((h, i) => i === 0 || h > hs[i - 1]), "rasio terapan: makin besar rasio, makin tinggi batang luas");
    cek(persen(12, 18) === 67 && persen(5, 25) === 20 && persen(10, 20) === 50 && persen(15, 15) === 100, "rasio: 20, 50, 67, 100 persen");
  }
}

/* ------------------------------ Kutipan buku dan Buku Panduan Guru (bila PDF tersedia) ------------------------------ */
{
  const pdfBS = new URL("../bahan-sd/Matematika-BS-KLS-V.pdf", import.meta.url);
  const pdfBG = new URL("../bahan-sd/Matematika-BG-KLS-V.pdf", import.meta.url);
  const path = (u) => u.pathname.replace(/^\/([A-Za-z]:)/, "$1");
  const ada = existsSync(pdfBS) && existsSync(pdfBG);
  const bs = ada ? spawnSync("pdftotext", ["-enc", "UTF-8", "-f", "147", "-l", "178", "-raw", path(pdfBS), "-"], { encoding: "utf8", maxBuffer: 1 << 26 }) : null;
  const bg = ada ? spawnSync("pdftotext", ["-enc", "UTF-8", "-f", "189", "-l", "258", "-raw", path(pdfBG), "-"], { encoding: "utf8", maxBuffer: 1 << 26 }) : null;
  if (!ada || !bs || bs.status !== 0 || !bg || bg.status !== 0) console.log("PDF atau pdftotext tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const buku = `${bersih(bs.stdout)} ${bersih(bg.stdout)}`;
    let n = 0;
    for (const a of M.adegan) for (const kt of a.kutipan ?? []) {
      n += 1;
      cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
    }
    cek(n >= 50, `jumlah kutipan buku yang diperiksa (${n})`);
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k5b5d-.*)\.(ts|tsx)$/.test(f));
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
    cek(!/from "react"/.test(s), `${f}: logika dan data tanpa React`);
    cek(!/Math\.random/.test(s), `${f}: tanpa Math.random`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|k5b5d-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k5b5d sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../video-k5b5d.tsx", folder), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_D55|naskah-k5b5/.test(pembungkus) && /VIDEO_MATERI_K5B5D/.test(pembungkus) && /VIDEO_LUAR_K5B5D/.test(pembungkus) && /export function VideoK5B5D/.test(pembungkus) && /DaftarVideoCerita/.test(pembungkus) && /keVideoSiap/.test(pembungkus), "video-k5b5d: memakai dua video baru, bukan naskah lama");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
if (process.env.RINCI) for (const v of VIDEO) for (const a of v.adegan) console.log(`  ${v.id}/${a.id}: ${a.ketukan.length} ketukan, kata per ketukan ${a.ketukan.map((kt) => L.kataDari(kt.suara).length).join(",")}, jumlah ${a.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)}`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
