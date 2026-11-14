// Uji Story Kelas 5 Bab 3 Sub-Bab A (membandingkan dan mengurutkan pecahan, termasuk pembuka bab): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, tidak membocorkan materi subbab berikutnya, kutipan buku terhadap teks PDF (pdftotext -enc UTF-8),
// hitungan mandiri (pecahan campuran ke biasa, KPK dan FPB, pecahan senilai, urutan lompatan Yohana dan pita Nisa, banding pembilang, patokan setengah),
// geometri gambar (juring lingkaran, petak batang dan kisi, segitiga berpetak, letak penanda pada garis bilangan), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b3a.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b3a-video.ts");
const G = await import("../src/components/modul/story/k5b3a-gambar.ts");
const M3 = await import("../src/components/modul/story/k5b3a-materi-3.ts");
const LU1 = await import("../src/components/modul/story/k5b3a-luar-1.ts");

const stat = { juring: 0, petak: 0, segitiga: 0, penanda: 0, teksPasang: 0, persamaan: 0, pecahan: 0 };
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

/* ------------------------------ Data buku, ditulis ulang mandiri dari halaman PDF ------------------------------ */
// Buku Siswa hlm. 71: lompatan Yohana 2 3/4 m, 3 1/2 m, 7/8 m. Hlm. 72: 2 3/4 = 11/4 dan 3 1/2 = 7/2. Hlm. 73: KPK dari 4, 2, dan 8.
const LOMPATAN = [[2, 3, 4], [3, 1, 2], [0, 7, 8]];
// Buku Siswa hlm. 75 nomor 2: pita Nisa 2 2/5 m, 2 1/4 m, 2 1/2 m; kunci Panduan Guru hlm. 104: urutan terpendek 2 1/4, 2 2/5, 2 1/2.
const PITA = [[2, 2, 5], [2, 1, 4], [2, 1, 2]];
const nilai = ([b, p, q]) => b + p / q;
const biasa = ([b, p, q]) => [b * q + p, q];
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const kpk = (...n) => n.reduce((a, b) => (a * b) / gcd(a, b));
const fpb = (...n) => n.reduce((a, b) => gcd(a, b));
const jml = (a) => a.reduce((t, x) => t + x, 0);
const banding = (a, b) => Math.sign(a[0] * b[1] - b[0] * a[1]); // 1 bila a lebih besar dari b, pecahan [p, q]
const tulisC = ([b, p, q]) => (b > 0 ? `${b} ${p}/${q}` : `${p}/${q}`);

sama(LOMPATAN.map(biasa), [[11, 4], [7, 2], [7, 8]], "campuran ke biasa: 2 3/4 = 11/4, 3 1/2 = 7/2, 7/8 tetap");
sama(PITA.map(biasa), [[12, 5], [9, 4], [5, 2]], "campuran ke biasa pita Nisa: 12/5, 9/4, 5/2");
sama(kpk(4, 2, 8), 8, "KPK 4, 2, 8 = 8");
sama(kpk(5, 4, 2), 20, "KPK 5, 4, 2 = 20");
sama([kpk(4, 5), fpb(4, 5)], [20, 1], "KPK dan FPB 4 dan 5 (Mengingat Kembali nomor 3)");
// Data gambar sama dengan data buku.
sama(G.LOMPATAN.map((c) => [c.bulat, c.p, c.q]), LOMPATAN, "data lompatan di gambar sama dengan buku");
sama(G.PITA.map((c) => [c.bulat, c.p, c.q]), PITA, "data pita di gambar sama dengan buku");
sama(G.LOMPATAN.map(G.tulis), ["2 3/4", "3 1/2", "7/8"], "tulisan lompatan");
// Urutan lompatan dari terjauh dan pita dari terpendek, dihitung mandiri.
const urutLompatan = LOMPATAN.map((c, i) => [nilai(c), i]).sort((a, b) => b[0] - a[0]).map((x) => x[1]);
sama(urutLompatan, [1, 0, 2], "urutan lompatan dari terjauh: 3 1/2, 2 3/4, 7/8");
const urutPita = PITA.map((c, i) => [nilai(c), i]).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
sama(urutPita, [1, 0, 2], "urutan pita dari terpendek: 2 1/4, 2 2/5, 2 1/2 (kunci Panduan Guru hlm. 104)");
// Tiga cara memberi urutan sama: garis bilangan (nilai), pembilang dengan penyebut sama (8), dan bilangan bulat (2, 3, 0).
{
  const pembilang8 = LOMPATAN.map((c) => biasa(c)).map(([p, q]) => (p * 8) / q);
  sama(pembilang8, [22, 28, 7], "pembilang per delapan: 22, 28, 7");
  sama(pembilang8.map((p, i) => [p, i]).sort((a, b) => b[0] - a[0]).map((x) => x[1]), urutLompatan, "banding pembilang memberi urutan sama dengan garis bilangan");
  sama(LOMPATAN.map((c) => c[0]).map((b, i) => [b, i]).sort((a, b) => b[0] - a[0]).map((x) => x[1]), urutLompatan, "banding bilangan bulat (0 untuk 7/8) memberi urutan sama");
  const pembilang20 = PITA.map((c) => biasa(c)).map(([p, q]) => (p * 20) / q);
  sama(pembilang20, [48, 45, 50], "pita per dua puluh: 48, 45, 50");
}

/* ------------------------------ Geometri umum ------------------------------ */
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
const luasPoligon = (p) => Math.abs(p.reduce((t, a, i) => t + (a[0] * p[(i + 1) % p.length][1] - p[(i + 1) % p.length][0] * a[1]), 0)) / 2;
const TEPI = 1e-6;
const berwarna = (o) => o.warna === G.W.karang;
/** Juring lingkaran berawalan id: banyak juring, banyak yang berwarna; tiap juring sudut sama dihitung ulang dari titik lintasan. */
const pai = (objs, awal) => {
  const w = objs.filter((o) => new RegExp(`^${awal}-w\\d+$`).test(o.id)).sort((a, b) => Number(a.id.split("-w")[1]) - Number(b.id.split("-w")[1]));
  if (w.length === 1 && w[0].t === "bulat") return { q: 1, p: berwarna(w[0]) ? 1 : 0 };
  let jumlah = 0;
  w.forEach((o, i) => {
    const n = bilangan(o.d);
    // M0 0 L x0 y0 A r r 0 0 1 x1 y1 Z
    const a0 = Math.atan2(n[3], n[2]);
    const a1 = Math.atan2(n[10], n[9]);
    let d = a1 - a0;
    while (d <= 1e-9) d += 2 * Math.PI;
    jumlah += d;
    hampir(d, (2 * Math.PI) / w.length, 0.02, `juring ${awal}-w${i}: sudut sama besar`);
    stat.juring += 1;
  });
  hampir(jumlah, 2 * Math.PI, 0.05, `juring ${awal}: seluruh sudut satu lingkaran`);
  return { q: w.length, p: w.filter(berwarna).length };
};
/** Batang atau kisi berawalan id: banyak petak (lebar sama dan rapat), banyak yang berwarna. */
const petak = (objs, awal) => {
  const c = objs.filter((o) => new RegExp(`^${awal}-c\\d+$`).test(o.id)).sort((a, b) => Number(a.id.split("-c")[1]) - Number(b.id.split("-c")[1]));
  cek(c.length > 0, `petak ${awal} ada`);
  cek(c.every((o) => Math.abs(o.w - c[0].w) < TEPI && Math.abs(o.h - c[0].h) < TEPI), `petak ${awal}: ukuran sama`);
  stat.petak += c.length;
  return { q: c.length, p: c.filter(berwarna).length, lebar: c[0].w, tinggi: c[0].h, lebarTotal: c.reduce((t, o) => t + o.w, 0), cells: c };
};
const batang = (objs, awal) => {
  const b = petak(objs, awal);
  b.cells.forEach((o, i) => {
    if (i > 0) hampir(o.x, b.cells[i - 1].x + b.cells[i - 1].w, 1e-6, `batang ${awal}: petak ${i} rapat dengan petak sebelumnya`);
    cek(o.y === b.cells[0].y, `batang ${awal}: satu baris`);
  });
  return { q: b.q, p: b.p, lebarTotal: b.lebarTotal };
};
const pecahanDari = (teks) => {
  const m = String(teks).match(/(\d+)\/(\d+)/);
  return m ? [Number(m[1]), Number(m[2])] : null;
};

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K5B3A, V.VIDEO_LUAR_K5B3A];
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
const M = V.VIDEO_MATERI_K5B3A;
const U = V.VIDEO_LUAR_K5B3A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const nilaiId = (objs, id) => objs.find((o) => o.id === id)?.isi;
const objId = (objs, id) => objs.find((o) => o.id === id);
{
  const teksVideo = (v) => JSON.stringify(seluruhTeks(v));
  const NAMA_METODE = /Number Line Fractions|Equivalent Fractions|Mixed to Improper|Benchmark Half Comparison|metode luar|metode dari luar/i;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Number Line Fractions", "Equivalent Fractions", "Mixed to Improper", "Benchmark Half Comparison"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(M.adegan.every((a) => /(Buku Siswa|Panduan Guru) hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Bab 3", "Peta Konsep", "Kata Kunci", "Skema Pembelajaran", "Jajanan Pasar", "Mengingat Kembali", "Eksplorasi 3.1A", "Eksplorasi 3.1B", "wingko", "Yohana", "Nisa", "garis bilangan", "pembilang", "penyebut", "pecahan biasa", "pecahan campuran", "KPK", "Ayo Berlatih", "Miskonsepsi", "Diferensiasi", "Refleksi", "Problem Based Learning", "lompat jauh"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-garis", "luar-garis-terapan", "luar-senilai", "luar-senilai-terapan", "luar-campuran", "luar-campuran-terapan", "luar-patokan", "luar-patokan-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk empat metode");
  cek(M.adegan.length === 12 && U.adegan.length === 10, "12 adegan materi dan 10 adegan metode luar");
  // Subbab A tidak membocorkan penjumlahan (subbab B) dan pengurangan (subbab C). Pembuka bab, peta konsep, dan skema boleh menyebut keduanya sebagai daftar.
  const BOCOR = /penjumlahan|pengurangan|menjumlah|mengurang|selisih|dijumlah|dikurang|penambahan|menambah/i;
  const boleh = ["pembuka-bab", "peta-konsep"];
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  for (const a of M.adegan.filter((x) => !boleh.includes(x.id))) cek(!BOCOR.test(teksAdegan(a)), `materi ${a.id} tidak membocorkan subbab B dan C`);
  for (const a of U.adegan) cek(!BOCOR.test(teksAdegan(a)), `metode luar ${a.id} tidak membocorkan subbab B dan C`);
  cek(BOCOR.test(teksAdegan(adegan(M, "pembuka-bab"))) && BOCOR.test(teksAdegan(adegan(M, "peta-konsep"))), "pembuka dan peta konsep menyebut penjumlahan dan pengurangan sebagai daftar bab");
  cek(!/Uji Kompetensi|pengayaan|remedial|Kunci Jawaban/i.test(materi + luar), "tidak memakai Uji Kompetensi, pengayaan, remedial milik subbab lain");
  cek(totalKetukan >= 80, `total ketukan cukup dalam (${totalKetukan})`);
}

/* ------------------------------ Semua persamaan di gambar dihitung ulang ------------------------------ */
{
  let n = 0;
  const hitungSisi = (s) => {
    const ubahCampuran = s.trim().replace(/(\d+)\s+(\d+)\/(\d+)/g, "($1+$2/$3)").replace(/×/g, "*");
    return Function(`"use strict"; return (${ubahCampuran || "NaN"});`)();
  };
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        for (const o of akhirAdegan(a, i)) {
          if (o.t !== "teks" || !o.isi) continue;
          const m = o.isi.match(/^([\d\s+×()/]+(?:=\s*[\d\s+×()/]+)+)/);
          if (!m) continue;
          const nilaiSisi = m[1].split("=").map(hitungSisi);
          n += 1;
          stat.persamaan += 1;
          cek(nilaiSisi.every((x) => Math.abs(x - nilaiSisi[0]) < 1e-9), `${v.id}/${a.id}#${i + 1}: persamaan "${o.isi}" benar (${nilaiSisi.join(" ; ")})`);
        }
      });
    }
  }
  cek(n >= 25, `jumlah persamaan yang diperiksa (${n})`);
}

/* ------------------------------ Hitungan isi, dihitung mandiri ------------------------------ */
const T = (v, id, ke) => akhirAdegan(adegan(v, id), ke);
{
  // Pembuka: empat tujuan menurut Panduan Guru hlm. 97.
  sama([0, 1, 2, 3].map((i) => nilaiId(T(M, "pembuka-bab", 1), `t${i}-t0`)), ["1.1 mengurutkan bilangan pecahan", "1.2 membandingkan bilangan pecahan", "1.3 menentukan penjumlahan bilangan pecahan", "1.4 menentukan pengurangan bilangan pecahan"], "empat tujuan bab");
  // Peta konsep: lima kata kunci (Buku Siswa hlm. 64), tiga subbab masing-masing 4 JP (Panduan Guru hlm. 100).
  {
    const a = adegan(M, "peta-konsep");
    sama([0, 1, 2, 3, 4].map((i) => nilaiId(akhirAdegan(a, 1), `ch${i}-t0`)), ["urutan", "perbandingan", "penjumlahan", "pengurangan", "pecahan"], "lima kata kunci bab 3");
    sama([nilaiId(akhirAdegan(a, 0), "ca-t0"), nilaiId(akhirAdegan(a, 0), "cb-t0"), nilaiId(akhirAdegan(a, 0), "cc-t0"), nilaiId(akhirAdegan(a, 0), "cd-t0"), nilaiId(akhirAdegan(a, 0), "ce-t0")], ["Mengurutkan", "Membandingkan", "Operasi Bilangan", "Menjumlahkan", "Mengurangkan"], "cabang peta konsep");
    const t = akhirAdegan(a, 3);
    sama([0, 1, 2].map((i) => nilaiId(t, `jp${i}`)), ["4 JP", "4 JP", "4 JP"], "tiga subbab masing-masing 4 JP");
    sama([0, 1, 2].map((i) => nilaiId(t, `sk${i}-t0`)?.[0]), ["A", "B", "C"], "tiga subbab A, B, C");
  }
  // Ayo Menyimak: kardus 4 potong, 2 dimakan; roti dibagi 3.
  {
    const a = adegan(M, "ayo-menyimak");
    const t = akhirAdegan(a, 2);
    const b = batang(t, "kd");
    sama([b.q, b.p], [4, 2], "kardus: 4 potong, 2 dimakan");
    sama([nilaiId(t, "k4"), nilaiId(t, "k2")], ["4 potong makanan", "2 dimakan"], "tulisan kardus");
    const r = pai(akhirAdegan(a, 3), "ro");
    sama([r.q, r.p], [3, 0], "roti dibagi 3 bagian sama besar");
  }
  // Mengingat Kembali: 2/4, 1/2 lawan 1/5, KPK dan FPB 4 dan 5, 3/4 senilai 6/8.
  {
    const a = adegan(M, "mengingat-kembali");
    const t1 = akhirAdegan(a, 1);
    const b = batang(t1, "lt");
    sama([b.q, b.p, nilaiId(t1, "pf"), nilaiId(t1, "pb"), nilaiId(t1, "pn")], [4, 2, "2/4", "pembilang = 2", "penyebut = 4"], "latihan 1: 2/4 dengan pembilang 2 dan penyebut 4");
    const t2 = akhirAdegan(a, 2);
    const b2 = batang(t2, "b2");
    const b5 = batang(t2, "b5");
    sama([[b2.p, b2.q], [b5.p, b5.q]], [[1, 2], [1, 5]], "latihan 2: batang 1/2 dan 1/5");
    cek(banding([1, 2], [1, 5]) === 1 && nilaiId(t2, "jw-t0") === "1/2 > 1/5", "latihan 2: 1/2 lebih besar dari 1/5");
    hampir(b2.lebarTotal, b5.lebarTotal, 1e-6, "dua batang latihan 2 sama panjang");
    const t3 = akhirAdegan(a, 3);
    const kel = (n, maks) => Array.from({ length: Math.floor(maks / n) }, (_, i) => (i + 1) * n);
    sama(nilaiId(t3, "k4"), `Kelipatan 4: ${kel(4, 20).join(", ")}`, "kelipatan 4 sampai 20");
    sama(nilaiId(t3, "k5"), `Kelipatan 5: ${kel(5, 20).filter((x) => x % 5 === 0).join(", ")}`, "kelipatan 5 sampai 20");
    sama([nilaiId(t3, "kp"), nilaiId(t3, "fp")], [`KPK = ${kpk(4, 5)}`, `FPB = ${fpb(4, 5)}`], "KPK dan FPB 4 dan 5");
    const t4 = akhirAdegan(a, 4);
    const s4 = batang(t4, "s4");
    const s8 = batang(t4, "s8");
    sama([[s4.p, s4.q], [s8.p, s8.q]], [[3, 4], [6, 8]], "latihan 4: batang 3/4 dan 6/8");
    cek(banding([s4.p, s4.q], [s8.p, s8.q]) === 0 && nilaiId(t4, "sm") === "3/4 = 6/8", "3/4 senilai 6/8 (kalikan 2)");
    cek(s8.q === s4.q * 2 && s8.p === s4.p * 2, "6/8 = 3/4 dikali 2 atas dan bawah");
  }
  // Pengertian: 1/4 pada lingkaran; contoh bentuk pecahan.
  {
    const a = adegan(M, "pengertian-pecahan");
    const p = pai(akhirAdegan(a, 0), "pg");
    sama([p.q, p.p], [4, 1], "lingkaran pengertian: 1 dari 4 bagian");
    const t = akhirAdegan(a, 4);
    sama([nilaiId(t, "e1"), nilaiId(t, "e2"), nilaiId(t, "e3")], ["1/2", "3/4", "2 1/2"], "contoh pecahan biasa dan campuran");
  }
  // Eksplorasi 3.1A: potongan wingko 2, 3, 5, 6 bagian; 1/2 lawan 1/3.
  {
    const a = adegan(M, "eks-31a-wingko");
    const t = akhirAdegan(a, 2);
    const potong = [1, 2, 3, 4].map((r) => Number(nilaiId(t, `r${r}-t01`).split(" ")[0]));
    sama(potong, [2, 3, 5, 6], "wingko dibagi 2, 3, 5, 6 bagian");
    sama([1, 2, 3, 4].map((r) => pecahanDari(nilaiId(t, `r${r}-t02`))), potong.map((q) => [1, q]), "pecahan satu potong stroberi: 1 per banyak bagian");
    const t4 = akhirAdegan(a, 3);
    const pa = pai(t4, "pa");
    const pb = pai(t4, "pb");
    sama([[pa.p, pa.q], [pb.p, pb.q]], [[1, 2], [1, 6]], "lingkaran 1/2 dan 1/6");
    cek(banding([1, 2], [1, 6]) === 1 && nilaiId(t4, "jw-t0") === "1/2 > 1/6", "1/2 lebih besar dari 1/6");
    const t5 = akhirAdegan(a, 4);
    sama([[pai(t5, "ql").p, pai(t5, "ql").q], [pai(t5, "qr").p, pai(t5, "qr").q]], [[1, 2], [1, 3]], "dua wingko: 1/2 dan 1/3");
    const t6 = akhirAdegan(a, 5);
    cek(nilaiId(t6, "qt") === ">" && banding([1, 2], [1, 3]) === 1 && nilaiId(t6, "qk-t0") === "1/2 > 1/3", "tanda yang tepat: 1/2 lebih besar dari 1/3");
  }
  // Eksplorasi 3.1B: lompatan Yohana dan mengubah campuran menjadi biasa.
  {
    const a = adegan(M, "eks-31b-lompat");
    const t = akhirAdegan(a, 0);
    sama([1, 2, 3].map((r) => nilaiId(t, `lm${r}-t01`)), LOMPATAN.map((c) => `${tulisC(c)} m`), "tiga lompatan Yohana");
    const t4 = akhirAdegan(a, 3);
    sama([nilaiId(t4, "m1"), nilaiId(t4, "m2"), nilaiId(t4, "m4")], ["2 3/4", "(2 × 4) + 3 = 11", "2 3/4 = 11/4"], "campuran 2 3/4 menjadi 11/4");
    const [p1, q1] = biasa(LOMPATAN[0]);
    cek(p1 === 11 && q1 === 4 && 2 * 4 + 3 === 11, "2 kali 4 ditambah 3 adalah 11 per 4");
    const t5 = akhirAdegan(a, 4);
    sama([nilaiId(t5, "n1"), nilaiId(t5, "n2"), nilaiId(t5, "n4")], ["3 1/2", "(3 × 2) + 1 = 7", "3 1/2 = 7/2"], "campuran 3 1/2 menjadi 7/2");
  }
  // Cara pertama: garis bilangan 0 sampai 4, letak 3/4, 6/4, 9/4, 12/4, 11/4, tiga garis.
  {
    const a = adegan(M, "garis-bilangan");
    const t = akhirAdegan(a, 4 - 1);
    const jarak = { 60: ["n3_4", "n6_4", "n9_4", "n12_4", "n11_4"] };
    void jarak;
    const garis = (idg, y, awal = 0, maks = 4) => {
      const g = objId(t, `${idg}-g`);
      cek(g.x === M3.GB.x && g.y === y && g.x2 === M3.GB.satuan * (maks - awal), `garis bilangan ${idg}: mulai di 0 dan panjang 4 satuan`);
      for (let n = awal; n <= maks; n += 1) {
        const gs = objId(t, `${idg}-t${n}`);
        hampir(gs.x, M3.GB.x + (n - awal) * M3.GB.satuan, 1e-6, `garis bilangan ${idg}: goresan ${n} tepat`);
        sama(nilaiId(t, `${idg}-l${n}`), String(n), `garis bilangan ${idg}: angka ${n}`);
      }
    };
    garis("g1", 60);
    garis("g2", 110);
    garis("g3", 160);
    const penanda = objs3(t);
    function objs3(objs) {
      return objs.filter((o) => o.t === "bulat" && /^n\d+_\d+$/.test(o.id));
    }
    const barisY = { 4: 60, 2: 110, 8: 160 };
    for (const o of penanda) {
      const [, p, q] = o.id.match(/^n(\d+)_(\d+)$/).map(Number);
      stat.penanda += 1;
      hampir(o.x, M3.GB.x + (p / q) * M3.GB.satuan, 1e-6, `penanda ${o.id} di letak ${p}/${q}`);
      sama(o.y, barisY[q], `penanda ${o.id} di garis penyebut ${q}`);
      sama(nilaiId(t, `${o.id}-n`), `${p}/${q}`, `label penanda ${o.id}`);
    }
    sama(penanda.map((o) => o.id).sort(), ["n11_4", "n12_4", "n1_2", "n1_8", "n2_2", "n3_2", "n3_4", "n3_8", "n5_8", "n6_4", "n7_2", "n7_8", "n9_4"].sort(), "tiga belas penanda pada tiga garis");
    // Kelipatan 3/4 pada garis pertama: 3/4, 6/4, 9/4, 12/4 (12/4 = 3).
    hampir(objId(t, "n12_4").x, M3.GB.x + 3 * M3.GB.satuan, 1e-6, "12/4 jatuh tepat di angka 3");
    cek(objId(t, "n11_4").x > objId(t, "n9_4").x && objId(t, "n11_4").x < objId(t, "n12_4").x, "11/4 di antara 9/4 dan 12/4");
    cek(objId(t, "n7_2").x > M3.GB.x + 3 * M3.GB.satuan && objId(t, "n7_2").x < M3.GB.x + 4 * M3.GB.satuan, "7/2 di antara 3 dan 4");
    cek(objId(t, "n7_8").x < M3.GB.x + M3.GB.satuan, "7/8 di sebelah kiri angka 1");
    // Urutan dari kanan: 7/2 > 11/4 > 7/8.
    const kanan = ["n7_2", "n11_4", "n7_8"].map((id) => objId(t, id).x);
    cek(kanan[0] > kanan[1] && kanan[1] > kanan[2], "urutan letak: 7/2, 11/4, 7/8 dari kanan ke kiri");
    const u = akhirAdegan(a, 4);
    sama([nilaiId(u, "o1-t0"), nilaiId(u, "o2-t0"), nilaiId(u, "o3-t0")], ["7/2 = 3 1/2 m", "11/4 = 2 3/4 m", "7/8 m"], "urutan lompatan dari terjauh");
    sama(urutLompatan.map((i) => tulisC(LOMPATAN[i])), ["3 1/2", "2 3/4", "7/8"], "urutan terjauh sama dengan hitungan mandiri");
  }
  // Cara kedua: menyamakan penyebut jadi 8 dan banding pembilang.
  {
    const a = adegan(M, "bandingkan-pembilang");
    const t1 = akhirAdegan(a, 0);
    sama([1, 2, 3].map((i) => pecahanDari(nilaiId(t1, `p${i}-t0`))), [[11, 4], [7, 2], [7, 8]], "tiga pecahan biasa lompatan Yohana");
    const t3 = akhirAdegan(a, 2);
    sama([nilaiId(t3, "l4"), nilaiId(t3, "l2"), nilaiId(t3, "l8"), nilaiId(t3, "kp")], ["Kelipatan 4: 4, 8", "Kelipatan 2: 2, 4, 6, 8", "Kelipatan 8: 8", `KPK = ${kpk(4, 2, 8)}`], "KPK 4, 2, 8 dari daftar kelipatan");
    const t4 = akhirAdegan(a, 3);
    sama([nilaiId(t4, "q1"), nilaiId(t4, "q2"), nilaiId(t4, "q3")], ["11/4 = 22/8", "7/2 = 28/8", "7/8 = 7/8"], "penyebut disamakan jadi 8");
    sama([nilaiId(t4, "x1"), nilaiId(t4, "x2")], [`× ${8 / 4}`, `× ${8 / 2}`], "pengali 2 dan 4");
    const t5 = akhirAdegan(a, 4);
    sama([nilaiId(t5, "pm"), nilaiId(t5, "pk-t0")], ["pembilang: 22, 28, 7", "7 < 22 < 28"], "banding pembilang");
    const t6 = akhirAdegan(a, 5);
    sama([nilaiId(t6, "u1-t0"), nilaiId(t6, "u2-t0"), nilaiId(t6, "u3-t0")], ["28/8 = 3 1/2 m", "22/8 = 2 3/4 m", "7/8 = 7/8 m"], "urutan dari yang paling jauh");
  }
  // Cara ketiga: bilangan bulat.
  {
    const a = adegan(M, "bandingkan-bulat");
    const t = akhirAdegan(a, 0);
    sama([1, 2, 3].map((i) => nilaiId(t, `b${i}-t0`)), LOMPATAN.map(tulisC), "daftar lompatan untuk banding bilangan bulat");
    sama([nilaiId(t, "c1"), nilaiId(t, "c2"), nilaiId(t, "c3")], ["bulat 2", "bulat 3", "tanpa bulat"], "bagian bulat 2, 3, tanpa");
    const t2 = akhirAdegan(a, 1);
    sama(nilaiId(t2, "bn-t0"), "0 < 2 < 3", "bilangan bulat dari kecil: 0, 2, 3");
    // Urutan dari terkecil: 7/8 (ke-1), 2 3/4 (ke-2), 3 1/2 (ke-3).
    sama([nilaiId(t2, "c1"), nilaiId(t2, "c2"), nilaiId(t2, "c3")], ["urutan ke-2", "urutan ke-3", "urutan ke-1"], "urutan dari terkecil");
    const t4 = akhirAdegan(a, 3);
    sama([nilaiId(t4, "h1-t1"), nilaiId(t4, "h2-t0"), nilaiId(t4, "h3-t0")], ["7/2 > 11/4 > 7/8", "pembilang: 28 > 22 > 7", "bilangan bulat: 3 > 2 > 0"], "tiga cara memberi urutan sama");
  }
  // Ayo Berlatih nomor 1 dan 2.
  {
    const a = adegan(M, "ayo-berlatih");
    const t1 = akhirAdegan(a, 0);
    const pl = pai(t1, "pl");
    const pr = pai(t1, "pr");
    sama([[pl.p, pl.q], [pr.p, pr.q]], [[8, 12], [11, 12]], "1a: 8/12 dan 11/12");
    sama([nilaiId(t1, "fl"), nilaiId(t1, "fr"), nilaiId(t1, "ee")], ["8/12", "11/12", "<"], "1a: tanda lebih kecil");
    cek(banding([8, 12], [11, 12]) === -1, "8/12 lebih kecil dari 11/12");
    // 1b: segitiga dibagi empat sama luas, 3 dan 1 berwarna.
    const segi = (objs, awal, n) => {
      const s = Array.from({ length: n }, (_, i) => objs.filter((o) => new RegExp(`^${awal}-s\\d+$`).test(o.id)).find((o) => o.id === `${awal}-s${i}`)).filter(Boolean);
      return s;
    };
    const t2 = akhirAdegan(a, 1);
    for (const [awal, berw, label] of [["tl", 3, "3/4"], ["tr", 1, "1/4"]]) {
      const s = segi(t2, awal, 4);
      const luas = s.map((o) => luasPoligon(titikJalur(o)));
      cek(s.length === 4 && luas.every((x) => Math.abs(x - luas[0]) < 0.5), `1b ${awal}: empat segitiga sama luas (${luas.map((x) => x.toFixed(1)).join(", ")})`);
      stat.segitiga += 4;
      hampir(luas[0] * 4, (110 * 96) / 2, 0.5, `1b ${awal}: empat segitiga mengisi segitiga besar`);
      sama(s.filter(berwarna).length, berw, `1b ${awal}: ${berw} segitiga berwarna`);
    }
    sama([nilaiId(t2, "la"), nilaiId(t2, "lb"), nilaiId(t2, "lt")], ["3/4", "1/4", ">"], "1b: 3/4 lebih besar dari 1/4");
    // 1c: 3 dari 4 dan 9 dari 16.
    const t3 = akhirAdegan(a, 2);
    {
      const s4 = Array.from({ length: 4 }, (_, i) => objId(t3, `cl-s${i}`));
      const l4 = s4.map((o) => luasPoligon(titikJalur(o)));
      cek(l4.every((x) => Math.abs(x - l4[0]) < 0.5), "1c kiri: empat segitiga sama luas");
      const s16 = t3.filter((o) => /^cr-s\d\d$/.test(o.id));
      const l16 = s16.map((o) => luasPoligon(titikJalur(o)));
      cek(s16.length === 16 && l16.every((x) => Math.abs(x - l16[0]) < 0.3), `1c kanan: enam belas segitiga sama luas (${s16.length})`);
      hampir(l16[0] * 16, (110 * 96) / 2, 0.8, "1c kanan: enam belas segitiga mengisi segitiga besar");
      stat.segitiga += 20;
      const berw4 = s4.filter(berwarna).length;
      const berw16 = s16.filter(berwarna).length;
      sama([berw4, berw16], [3, 9], "1c: 3 dari 4 dan 9 dari 16 berwarna");
      cek(banding([berw4, 4], [berw16, 16]) === 1, "3/4 lebih besar dari 9/16");
      sama([nilaiId(t3, "ma"), nilaiId(t3, "mb"), nilaiId(t3, "me"), nilaiId(t3, "mt")], ["3/4", "9/16", "3/4 = 12/16", ">"], "1c: tulisan");
    }
    // 1d: kisi 3 kali 2 dengan 3 berwarna dan strip 6 dengan 2 berwarna.
    const t4 = akhirAdegan(a, 3);
    {
      const dl = petak(t4, "dl");
      const dr = petak(t4, "dr");
      sama([[dl.p, dl.q], [dr.p, dr.q]], [[3, 6], [2, 6]], "1d: 3/6 dan 2/6");
      hampir(dl.lebar * 3 * dl.tinggi * 2, dl.lebar * dl.tinggi * 6, 1e-6, "1d kiri: luas 6 petak");
      cek(banding([3, 6], [2, 6]) === 1 && nilaiId(t4, "nk-t0") === "3/6 > 2/6", "3/6 lebih besar dari 2/6");
      sama([nilaiId(t4, "na"), nilaiId(t4, "nb")], ["3/6", "2/6"], "1d: tulisan");
    }
    // Pita Nisa nomor 2: batang digambar 60 piksel per meter, KPK 5, 4, 2 = 20, urutan 1, 2, 3.
    const t5 = akhirAdegan(a, 4);
    const t7 = akhirAdegan(a, 6);
    {
      const bar = ["pa", "pb", "pc"].map((id) => objId(t5, id));
      bar.forEach((o, i) => hampir(o.w, nilai(PITA[i]) * M3.PITA_GAMBAR.satuan, 1e-6, `pita ${i + 1}: panjang batang sama dengan ${tulisC(PITA[i])} m`));
      sama(["ta", "tb", "tc"].map((id) => nilaiId(t5, id)), PITA.map((c) => `${tulisC(c)} m`), "label tiga pita");
      sama(nilaiId(t5, "kp"), `KPK 5, 4, 2 = ${kpk(5, 4, 2)}`, "KPK 5, 4, 2 = 20");
      sama(nilaiId(t5, "bs"), "bulatnya sama: 2", "bulat tiga pita sama");
      cek(PITA.every((c) => c[0] === 2), "bulat pita semuanya 2");
      const t6 = akhirAdegan(a, 5);
      sama(["ea", "eb", "ec"].map((id) => nilaiId(t6, id)), PITA.map(([, p, q]) => `${p}/${q} = ${(p * 20) / q}/20`), "pecahan pita per dua puluh");
      // Nomor urut pada gambar: terpendek di batang pb (2 1/4), kedua pa (2 2/5), ketiga pc (2 1/2).
      const baris = M3.PITA_GAMBAR.baris;
      const urutId = ["r1", "r2", "r3"].map((id) => objId(t7, id).y);
      sama(urutId, urutPita.map((i) => baris[i] + 14), "nomor urut 1, 2, 3 menempel di pita terpendek, tengah, terpanjang");
      sama(["r1", "r2", "r3"].map((id) => nilaiId(t7, id)), ["1", "2", "3"], "nomor urut");
    }
  }
  // Penutup Panduan Guru: miskonsepsi.
  {
    const a = adegan(M, "penutup-guru");
    const t = akhirAdegan(a, 0);
    sama([nilaiId(t, "ms-t1"), nilaiId(t, "mb-t1")], ["11/4 → 11/8", "11/4 → 22/8"], "miskonsepsi penyebut disamakan tanpa mengalikan pembilang");
    cek(11 * 2 === 22 && 4 * 2 === 8 && 11 / 4 === 22 / 8 && 11 / 4 !== 11 / 8, "yang benar 11/4 = 22/8, bukan 11/8");
    cek(nilaiId(t, "mc-t1") === "2 3/4 → 5/4, padahal seharusnya 11/4" && 2 + 3 !== 11 && 2 * 4 + 3 === 11, "salah hitung campuran: 2 + 3 bukan 11, yang benar 2 kali 4 ditambah 3");
  }
}

/* ------------------------------ Metode luar: hitungan isi ------------------------------ */
const T2 = (id, ke) => akhirAdegan(adegan(U, id), ke);
{
  // Number Line Fractions: garis 0 sampai 1, 3/4, 1/2 dan 1/5.
  {
    const t = T2("luar-garis", 0);
    const g = objId(t, "nl-g");
    sama([g.x, g.x2], [LU1.G01.x, LU1.G01.satuan], "garis 0 sampai 1 panjang satu satuan");
    [1, 2, 3].forEach((i) => hampir(objId(t, `nq${i}`).x, LU1.G01.x + (i * LU1.G01.satuan) / 4, 1e-6, `goresan seperempat ${i} tepat`));
    hampir(objId(t, "nm").x, LU1.G01.x + 0.75 * LU1.G01.satuan, 1e-6, "3/4 di letak tiga perempat");
    stat.penanda += 1;
    const t3 = T2("luar-garis", 2);
    hampir(objId(t3, "c1_2").x, LU1.G01.x + 0.5 * LU1.G01.satuan, 1e-6, "1/2 di tengah garis");
    hampir(objId(t3, "c1_5").x, LU1.G01.x + 0.2 * LU1.G01.satuan, 1e-6, "1/5 di seperlima garis");
    cek(objId(t3, "c1_2").x > objId(t3, "c1_5").x && nilaiId(t3, "ck-t0") === "1/2 > 1/5" && banding([1, 2], [1, 5]) === 1, "1/2 lebih ke kanan dan lebih besar dari 1/5");
    stat.penanda += 2;
  }
  // Number Line Fractions pada pita Nisa: garis dari 2 sampai 3.
  {
    const t = T2("luar-garis-terapan", 3);
    const g = objId(t, "pt-g");
    sama([g.x, g.x2], [LU1.G23.x, LU1.G23.satuan], "garis 2 sampai 3 panjang satu satuan");
    hampir(objId(t, "pt-t2").x, LU1.G23.x, 1e-6, "goresan 2 di awal");
    hampir(objId(t, "pt-t3").x, LU1.G23.x + LU1.G23.satuan, 1e-6, "goresan 3 di akhir");
    PITA.forEach((c, i) => {
      const o = objId(t, `pt-m${i}`);
      hampir(o.x, LU1.G23.x + (nilai(c) - 2) * LU1.G23.satuan, 1e-6, `pita ${tulisC(c)} di letak yang benar`);
      sama(nilaiId(t, `pt-m${i}-n`), tulisC(c), `label pita ${i + 1}`);
      stat.penanda += 1;
    });
    // Nomor urut 1, 2, 3 tepat di atas penanda pita terpendek, tengah, terpanjang.
    const nomor = ["o1", "o2", "o3"].map((id) => objId(t, id).x);
    sama(nomor, urutPita.map((i) => objId(t, `pt-m${i}`).x), "nomor urut tepat di atas penanda dari terpendek");
    cek(nomor[0] < nomor[1] && nomor[1] < nomor[2], "nomor 1, 2, 3 bertambah ke kanan");
  }
  // Equivalent Fractions: 1/2 = 2/4 = 4/8, 3/4 = 6/8, 3/4 lawan 5/8.
  {
    const t = T2("luar-senilai", 0);
    const bs = ["e2", "e4", "e8"].map((id) => batang(t, id));
    sama(bs.map((b) => [b.p, b.q]), [[1, 2], [2, 4], [4, 8]], "tiga batang senilai: 1/2, 2/4, 4/8");
    cek(bs.every((b) => b.p * bs[0].q === bs[0].p * b.q), "tiga batang senilai");
    bs.forEach((b) => hampir(b.lebarTotal, bs[0].lebarTotal, 1e-6, "batang senilai sama panjang"));
    sama([nilaiId(t, "f2"), nilaiId(t, "f4"), nilaiId(t, "f8"), nilaiId(t, "fe")], ["1/2", "2/4", "4/8", "1/2 = 2/4 = 4/8"], "tulisan pecahan senilai");
    const t2 = T2("luar-senilai", 1);
    sama([nilaiId(t2, "a1"), nilaiId(t2, "a2"), nilaiId(t2, "ax")], ["3/4", "6/8", "× 2 pada atas dan bawah"], "3/4 menjadi 6/8 dikali 2");
    cek(3 * 2 === 6 && 4 * 2 === 8, "3 kali 2 dan 4 kali 2");
    const t3 = T2("luar-senilai", 2);
    sama([nilaiId(t3, "b1"), nilaiId(t3, "b2")], ["3/4 dan 5/8", "6/8 dan 5/8"], "3/4 diubah ke 6/8 agar penyebut sama dengan 5/8");
    cek(banding([3, 4], [5, 8]) === 1 && 6 > 5, "3/4 lebih besar dari 5/8 (6 lebih besar dari 5)");
  }
  // Equivalent Fractions pada lompatan Yohana: panjang batang sebanding dengan pembilang per delapan.
  {
    const t = T2("luar-senilai-terapan", 0);
    sama([1, 2, 3].map((i) => pecahanDari(nilaiId(t, `y${i}-t0`))), [[11, 4], [7, 2], [7, 8]], "pecahan biasa lompatan Yohana");
    sama(nilaiId(t, "yk-t0"), `KPK 4, 2, 8 = ${kpk(4, 2, 8)}`, "KPK 4, 2, 8 = 8");
    const t2 = T2("luar-senilai-terapan", 1);
    sama([nilaiId(t2, "z1"), nilaiId(t2, "z2"), nilaiId(t2, "zx1"), nilaiId(t2, "zx2")], ["11/4 = 22/8", "7/2 = 28/8", "× 2", "× 4"], "pecahan senilai per delapan");
    const t3 = T2("luar-senilai-terapan", 2);
    const lebar = ["p7", "p22", "p28"].map((id) => objId(t3, id).w);
    sama(lebar.map((w) => w / 6), [7, 22, 28], "panjang batang sebanding pembilang 7, 22, 28");
    sama(["l7", "l22", "l28"].map((id) => nilaiId(t3, id)), ["7/8", "22/8", "28/8"], "label tiga batang");
    const t4 = T2("luar-senilai-terapan", 3);
    sama(["w1", "w2", "w3"].map((id) => nilaiId(t4, `${id}-t0`)), ["28/8 = 3 1/2 m", "22/8 = 2 3/4 m", "7/8 m"], "urutan dari terbesar");
  }
  // Mixed to Improper: 2 3/4 = 11/4, gambar 4 + 4 + 3 = 11 bagian seperempat.
  {
    const t = T2("luar-campuran", 0);
    sama([nilaiId(t, "c1-t0"), nilaiId(t, "c2-t0")], ["2 3/4", "11/4"], "campuran dan hasil biasa");
    const t2 = T2("luar-campuran", 1);
    sama([nilaiId(t2, "ec"), nilaiId(t2, "ek"), nilaiId(t2, "eh")], ["2 3/4", "(2 × 4) + 3 = 11", "2 3/4 = 11/4"], "rumus bulat kali penyebut ditambah pembilang");
    const t3 = T2("luar-campuran", 2);
    const bs = ["g1", "g2", "g3"].map((id) => batang(t3, id));
    sama(bs.map((b) => [b.p, b.q]), [[4, 4], [4, 4], [3, 4]], "dua batang utuh dan satu batang 3/4");
    sama(jml(bs.map((b) => b.p)), 11, "4 + 4 + 3 = 11 bagian seperempat");
    sama(nilaiId(t3, "gs"), "4 + 4 + 3 = 11 bagian", "tulisan jumlah bagian");
    cek(bs.every((b) => b.q === 4 && Math.abs(b.lebarTotal - bs[0].lebarTotal) < 1e-6), "tiga batang sama panjang dan empat petak");
    hampir(bs[0].p / 4 + bs[1].p / 4 + bs[2].p / 4, nilai(LOMPATAN[0]), 1e-9, "gambar batang bernilai 2 3/4");
  }
  // Mixed to Improper pada pita Nisa.
  {
    const t = T2("luar-campuran-terapan", 1);
    const baris = [["r1", 0], ["r2", 1], ["r3", 2]];
    for (const [id, idx] of baris) {
      const [b, p, q] = PITA[idx];
      const [pb, qb] = biasa(PITA[idx]);
      sama([nilaiId(t, `${id}-m`), nilaiId(t, `${id}-h`), nilaiId(t, `${id}-r`)], [tulisC(PITA[idx]), `(${b} × ${q}) + ${p} = ${pb}`, `${pb}/${qb}`], `pita ${tulisC(PITA[idx])} menjadi pecahan biasa`);
    }
    const t3 = T2("luar-campuran-terapan", 2);
    sama(["q1", "q2", "q3"].map((id) => nilaiId(t3, id)), ["12/5 = 48/20", "9/4 = 45/20", "5/2 = 50/20"], "pita per dua puluh");
    sama(nilaiId(t3, "kp"), `KPK 5, 4, 2 = ${kpk(5, 4, 2)}`, "KPK 5, 4, 2 = 20");
    const t4 = T2("luar-campuran-terapan", 3);
    sama([nilaiId(t4, "ub-t0"), nilaiId(t4, "u1-t0"), nilaiId(t4, "u2-t0"), nilaiId(t4, "u3-t0")], ["45 < 48 < 50", "2 1/4 m (45/20)", "2 2/5 m (48/20)", "2 1/2 m (50/20)"], "urutan pita dari terpendek");
    sama(urutPita.map((i) => tulisC(PITA[i])), ["2 1/4", "2 2/5", "2 1/2"], "urutan pita sama dengan kunci Panduan Guru");
  }
  // Benchmark Half Comparison: patokan 1/2.
  {
    const t = T2("luar-patokan", 0);
    const tanda = objId(t, "pk-t");
    hampir(tanda.x, LU1.G01.x + 0.5 * LU1.G01.satuan, 1e-6, "tanda patokan tepat di 1/2");
    const t2 = T2("luar-patokan", 1);
    const kelas = (p, q) => (2 * p < q ? "lebih kecil dari 1/2" : 2 * p === q ? "sama dengan 1/2" : "lebih besar dari 1/2");
    for (const [id, p, q] of [["h1", 1, 5], ["h2", 3, 6], ["h3", 7, 8]]) {
      const isi = nilaiId(t2, `${id}-t0`);
      cek(isi.startsWith(`${p}/${q}: 2 × ${p} = ${2 * p}, `), `patokan ${p}/${q}: dua kali pembilang ${2 * p}`);
      cek(nilaiId(t2, `${id}-t1`) === `jadi ${kelas(p, q)}`, `patokan ${p}/${q}: ${kelas(p, q)}`);
    }
    cek(nilaiId(t2, "h1-t0").endsWith("kurang dari 5") && nilaiId(t2, "h2-t0").endsWith("sama dengan 6") && nilaiId(t2, "h3-t0").endsWith("lebih dari 8"), "perbandingan dua kali pembilang dengan penyebut");
    const t3 = T2("luar-patokan", 2);
    hampir(objId(t3, "a1_5").x, LU1.G01.x + 0.2 * LU1.G01.satuan, 1e-6, "1/5 di seperlima garis");
    hampir(objId(t3, "a7_8").x, LU1.G01.x + (7 / 8) * LU1.G01.satuan, 1e-6, "7/8 di tujuh perdelapan garis");
    cek(objId(t3, "a1_5").x < objId(t3, "kb-t").x && objId(t3, "a7_8").x > objId(t3, "kb-t").x, "1/5 dan 7/8 di dua sisi patokan");
    stat.penanda += 3;
    const t4 = T2("luar-patokan", 3);
    cek(objId(t4, "sa").x > objId(t4, "ks-t").x && objId(t4, "sb").x > objId(t4, "ks-t").x, "A dan B sama-sama di kanan patokan");
  }
  // Benchmark Half Comparison pada angka buku.
  {
    const t = T2("luar-patokan-terapan", 0);
    hampir(objId(t, "p1_5").x, LU1.G01.x + 0.2 * LU1.G01.satuan, 1e-6, "1/5 di seperlima garis");
    cek(objId(t, "p1_5").x < objId(t, "t1-t").x && banding([1, 2], [1, 5]) === 1, "1/5 di kiri patokan, 1/2 lebih besar");
    const t2 = T2("luar-patokan-terapan", 1);
    hampir(objId(t2, "p3_6").x, objId(t2, "t2-t").x, 1e-6, "3/6 tepat di patokan 1/2");
    hampir(objId(t2, "p2_6").x, LU1.G01.x + (2 / 6) * LU1.G01.satuan, 1e-6, "2/6 di sepertiga garis");
    cek(objId(t2, "p2_6").x < objId(t2, "t2-t").x && banding([3, 6], [2, 6]) === 1 && nilaiId(t2, "tj-t0") === "3/6 > 2/6", "2/6 di kiri patokan dan 3/6 lebih besar");
    const t3 = T2("luar-patokan-terapan", 2);
    hampir(objId(t3, "p7_8").x, LU1.G01.x + (7 / 8) * LU1.G01.satuan, 1e-6, "7/8 di tujuh perdelapan garis");
    cek(objId(t3, "p7_8").x > objId(t3, "t3-t").x && 7 > 4 && 7 < 8, "7/8 lebih dari setengah (7 lebih dari 4) tetapi kurang dari 1");
    cek(biasa(LOMPATAN[0])[0] / biasa(LOMPATAN[0])[1] > 1 && biasa(LOMPATAN[1])[0] / biasa(LOMPATAN[1])[1] > 1 && 7 / 8 < 1, "11/4 dan 7/2 lebih dari 1; 7/8 paling kecil");
    const t4 = T2("luar-patokan-terapan", 3);
    hampir(objId(t4, "p8_12").x, LU1.G01.x + (8 / 12) * LU1.G01.satuan, 1e-6, "8/12 di letak 2/3");
    hampir(objId(t4, "p11_12").x, LU1.G01.x + (11 / 12) * LU1.G01.satuan, 1e-6, "11/12 di letak 11 perduabelas");
    cek(objId(t4, "p8_12").x > objId(t4, "t4-t").x && objId(t4, "p11_12").x > objId(t4, "t4-t").x && 8 > 12 / 2 && 11 > 12 / 2 && 12 / 2 === 6, "8/12 dan 11/12 sama-sama lebih dari setengah (6/12)");
    sama(nilaiId(t4, "tb-t0"), "8 < 11, jadi 8/12 < 11/12", "penyebut sama: bandingkan pembilang 8 dan 11");
    stat.penanda += 8;
  }
  // Ringkasan dan kunci.
  {
    const t = T2("luar-ringkas", 3);
    sama([nilaiId(t, "kn1-t01"), nilaiId(t, "kn2-t01")], ["3 1/2 > 2 3/4 > 7/8", "2 1/4 < 2 2/5 < 2 1/2"], "kunci urutan lompatan Yohana dan pita Nisa");
    sama(urutLompatan.map((i) => tulisC(LOMPATAN[i])).join(" > "), "3 1/2 > 2 3/4 > 7/8", "kunci lompatan sesuai hitungan mandiri");
    sama(urutPita.map((i) => tulisC(PITA[i])).join(" < "), "2 1/4 < 2 2/5 < 2 1/2", "kunci pita sesuai hitungan mandiri");
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
  // Buku Siswa hlm. 63-75 = PDF 79-91; Panduan Guru hlm. 97-105 = PDF 109-117.
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 79, 91), ambil(bg, 109, 117)] : [null];
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
    // Subbab A tidak memuat butir subbab B pada rentang halaman yang dipakai (Buku Siswa berhenti sebelum "B. Penjumlahan").
    cek(!/B\. penjumlahan bilangan pecahan/.test(bersih(bagian[0])), "Buku Siswa PDF 79-91 tidak memuat subbab B");
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k5b3a-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k5b3a-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k5b3a sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k5b3a.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_A53|video-k4b2-umum|naskah-k5b3/.test(pembungkus) && /VIDEO_MATERI_K5B3A/.test(pembungkus) && /VIDEO_LUAR_K5B3A/.test(pembungkus) && /export function VideoK5B3A/.test(pembungkus) && /DaftarVideoCerita/.test(pembungkus) && /keVideoSiap/.test(pembungkus), "video-k5b3a: memakai dua video baru, bukan naskah lama");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.juring} juring, ${stat.petak} petak, ${stat.segitiga} segitiga, ${stat.penanda} penanda, ${stat.persamaan} persamaan, ${stat.teksPasang} pasangan teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
