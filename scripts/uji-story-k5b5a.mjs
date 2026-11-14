// Uji Story Kelas 5 Bab 5 Sub-Bab A (konsep luas daerah, termasuk pembuka bab): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, tidak membocorkan materi subbab berikutnya, kutipan buku (bila PDF ada),
// hitungan mandiri (luas ruangan denah, total 39, luas bangun A sampai G, petak utuh dan sebagian, bentuk setelah dipotong-tempel),
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b5a.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b5a-video.ts");
const G = await import("../src/components/modul/story/k5b5a-gambar.ts");
const M3 = await import("../src/components/modul/story/k5b5a-materi-3.ts");

const stat = { petak: 0, bangun: 0, teksPasang: 0, tabel: 0 };
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
// Luas ruangan menurut kunci Panduan Guru hlm. 191 sampai 194: ruang tamu 13, satu kamar tidur 9 (dua kamar 18), dapur 6, kamar mandi 2, total 39.
const LUAS_RUANG = { tamu: 13, tidur: 9, dapur: 6, mandi: 2 };
// Kunci Panduan Guru hlm. 195, 197, dan 198: luas bangun A sampai G.
const LUAS_BANGUN = { A: 9, B: 12, C: 15, D: 16, E: 9, F: 15, G: 9 };
const jml = (a) => a.reduce((t, x) => t + x, 0);

/* ------------------------------ Geometri umum ------------------------------ */
const bilangan = (d) => (d.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
/** Titik mutlak bangun dari jalur tertutup lurus (M, L, ..., Z). */
const titikJalur = (o) => {
  const d = o.d ?? "";
  if (!/^M[-\d. L]+ Z$/.test(d)) return null;
  const n = bilangan(d);
  if (n.length < 6 || n.length % 2 !== 0) return null;
  const out = [];
  for (let i = 0; i < n.length; i += 2) out.push([(o.x ?? 0) + n[i], (o.y ?? 0) + n[i + 1]]);
  return out;
};
const luasTali = (p) => Math.abs(p.reduce((t, a, i) => t + a[0] * p[(i + 1) % p.length][1] - p[(i + 1) % p.length][0] * a[1], 0)) / 2;
/** Cuplikan mandiri (titik tengah subpetak 10 kali 10) untuk petak utuh dan sebagian. */
const masuk = (p, x, y) => {
  let d = false;
  for (let i = 0, j = p.length - 1; i < p.length; j = i, i += 1) if (p[i][1] > y !== p[j][1] > y && x < ((p[j][0] - p[i][0]) * (y - p[i][1])) / (p[j][1] - p[i][1]) + p[i][0]) d = !d;
  return d;
};
const hitungPetak = (p, kol, baris) => {
  let utuh = 0;
  let sebagian = 0;
  let luas = 0;
  for (let r = 0; r < baris; r += 1) {
    for (let c = 0; c < kol; c += 1) {
      let n = 0;
      for (let a = 0; a < 10; a += 1) for (let b = 0; b < 10; b += 1) if (masuk(p, c + (a + 0.5) / 10, r + (b + 0.5) / 10)) n += 1;
      luas += n / 100;
      if (n === 100) utuh += 1;
      else if (n > 0) sebagian += 1;
    }
  }
  return { utuh, sebagian, luas };
};
const jalurDari = (objs, id) => titikJalur(objs.find((o) => o.id === id));

// Bangun A sampai G: luas dari titik (rumus tali sepatu) sama dengan kunci buku, dan hitungan petak mandiri sama dengan fungsi gambar.
for (const h of Object.keys(LUAS_BANGUN)) {
  const b = G.BANGUN_AG[h];
  hampir(luasTali(b.p), LUAS_BANGUN[h], 1e-9, `luas bangun ${h} dari titik = kunci buku`);
  const mandiri = hitungPetak(b.p, b.kol, b.baris);
  hampir(mandiri.luas, LUAS_BANGUN[h], 0.06, `luas bangun ${h} dari cuplikan petak`);
  const dariGambar = G.petakUtuhSebagian(b.p, b.kol, b.baris);
  sama([dariGambar.utuh.length, dariGambar.sebagian.length], [mandiri.utuh, mandiri.sebagian], `petak utuh dan sebagian bangun ${h}`);
  cek(b.p.every(([x, y]) => x >= 0 && y >= 0 && x <= b.kol && y <= b.baris), `bangun ${h} di dalam kotak pembatasnya`);
  stat.bangun += 1;
}
// Perkiraan "utuh ditambah setengah sebagian" tepat untuk E, F, G (metode Grid Estimation).
for (const h of ["E", "F", "G"]) {
  const t = hitungPetak(G.BANGUN_AG[h].p, 6, 3);
  hampir(t.utuh + t.sebagian / 2, LUAS_BANGUN[h], 1e-9, `perkiraan grid bangun ${h}`);
}
sama(["E", "F", "G"].map((h) => { const t = hitungPetak(G.BANGUN_AG[h].p, 6, 3); return [t.utuh, t.sebagian]; }), [[6, 6], [12, 6], [5, 8]], "petak utuh dan sebagian E, F, G");
// Bentuk setelah dipotong-tempel: luas tetap.
hampir(luasTali(G.E_BARU), 9, 1e-9, "E setelah diubah luasnya 9");
hampir(luasTali(G.F_BARU), 15, 1e-9, "F setelah diubah luasnya 15");
hampir(luasTali(G.G_BARU), 9, 1e-9, "G setelah diubah luasnya 9");
{
  const t = hitungPetak(G.G_BARU, 4, 3);
  sama([t.utuh, t.sebagian], [8, 2], "G setelah diubah: 8 petak utuh dan 2 setengahan");
  const sisa = G.G_BARU && [[3, 1], [3, 2]].map(([c, r]) => { let n = 0; for (let a = 0; a < 10; a += 1) for (let b = 0; b < 10; b += 1) if (masuk(G.G_BARU, c + (a + 0.5) / 10, r + (b + 0.5) / 10)) n += 1; return n / 100; });
  hampir(sisa[0], 0.5, 0.06, "petak setengahan G pertama"); hampir(sisa[1], 0.5, 0.06, "petak setengahan G kedua"); hampir(sisa[0] + sisa[1], 1, 0.1, "dua setengahan G berjumlah satu petak");
  // baris tangga E: 1, 3, 5
  sama([0, 1, 2].map((r) => [...Array(6).keys()].filter((c) => masuk(G.E_BARU, c + 0.5, r + 0.5)).length), [1, 3, 5], "baris tangga E setelah diubah: 1, 3, 5");
}
// Denah: ruang tamu 3 kali 5 dikurangi kamar mandi 2 kali 1 = 13; total 39.
sama(G.PETAK_TAMU.length, LUAS_RUANG.tamu, "petak ruang tamu = 13");
sama(15 - 2, LUAS_RUANG.tamu, "ruang tamu: 3 kali 5 dikurangi kamar mandi 2 kali 1");
sama(G.RUANG.tidur.kol * G.RUANG.tidur.baris, LUAS_RUANG.tidur, "kamar tidur 3 kali 3");
sama(G.RUANG.dapur.kol * G.RUANG.dapur.baris, LUAS_RUANG.dapur, "dapur 3 kali 2");
sama(G.RUANG.mandi.kol * G.RUANG.mandi.baris, LUAS_RUANG.mandi, "kamar mandi 2 kali 1");
sama(LUAS_RUANG.tamu + 2 * LUAS_RUANG.tidur + LUAS_RUANG.dapur + LUAS_RUANG.mandi, 39, "total luas lantai 39");
sama(M3.KUNCI_LUAS, LUAS_BANGUN, "kunci luas di berkas materi sama dengan kunci buku");

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K5B5A, V.VIDEO_LUAR_K5B5A];
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
      // sinkron angka: tiap bilangan dalam suara tampak di gambar pada ketukan ini atau sebelumnya
      for (let p = 0; p < kata.length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(b);
      for (const b of bilanganDari(kt.suara)) cek(terlihat.has(b), `${nama}#${i + 1}: bilangan ${b} di suara tampak di gambar`);
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
          const isi = o.isi ?? "";
          const sel = isi.match(/^(\d+)((?: \+ \d+)+)$/);
          if (sel) stat.bangun += 0;
        } else if (o.t === "kotak") cek(x > -2 && y > -2 && x + (o.w ?? 0) < 302 && y + (o.h ?? 0) < 202, `${nama}#${i + 1}: kotak ${o.id} masuk kanvas`);
        else if (o.t === "bulat") cek(x - (o.r ?? 0) > -2 && x + (o.r ?? 0) < 302 && y - (o.r ?? 0) > -2 && y + (o.r ?? 0) < 210, `${nama}#${i + 1}: bulat ${o.id} masuk kanvas`);
        else if (o.t === "jalur") {
          const t = titikJalur(o);
          if (t) cek(t.every((p) => p[0] > -2 && p[0] < 302 && p[1] > -2 && p[1] < 204), `${nama}#${i + 1}: bangun ${o.id} masuk kanvas`);
          if (!t && /^[MLQTZ\d.\s-]+$/.test(o.d ?? "")) {
            const n = bilangan(o.d);
            for (let q = 0; q + 1 < n.length; q += 2) cek(x + n[q] > -2 && x + n[q] < 302 && y + n[q + 1] > -2 && y + n[q + 1] < 204, `${nama}#${i + 1}: lintasan ${o.id} masuk kanvas`);
          }
        } else if (o.t === "garis" || o.t === "panah") cek(x > -2 && x < 302 && y > -2 && y < 204 && x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 204, `${nama}#${i + 1}: garis ${o.id} masuk kanvas`);
      }
      // teks tidak boleh bertumpuk
      {
        const teksAda = akhir.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi && !/^[\u{1F000}-\u{1FFFF}]|^[✂]$/u.test(o.isi));
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
const M = V.VIDEO_MATERI_K5B5A;
const U = V.VIDEO_LUAR_K5B5A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const nilaiId = (objs, id) => objs.find((o) => o.id === id)?.isi;
const hitungId = (objs, awalan) => objs.filter((o) => o.id.startsWith(awalan) && o.t === "kotak" && /-\d+-\d+$/.test(o.id)).length;
const luasPoli = (objs, id, s) => luasTali(jalurDari(objs, id)) / (s * s);
{
  const teksVideo = (v) => JSON.stringify(seluruhTeks(v));
  const NAMA_METODE = /Unit Square|Array Model|Area Conservation|Grid Estimation|Partial Squares|metode luar|metode dari luar/i;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Unit Square Covering", "Array Model", "Area Conservation", "Grid Estimation of Partial Squares"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(M.adegan.every((a) => /(Buku Siswa|Panduan Guru) hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Bab 5", "Kata Kunci", "Peta Konsep", "Skema Pembelajaran", "Eksplorasi 5.1A", "Eksplorasi 5.1B", "Eksplorasi 5.1C", "Eksplorasi 5.1D", "Eksplorasi 5.1E", "Alun-Alun Utara", "Gambar 5.2", "ubin", "satuan luas", "cm²", "m²", "Yohana", "Lukas", "Miskonsepsi", "Diferensiasi", "Refleksi", "kertas berpetak", "persegi satuan", "ruang tamu", "kamar tidur", "dapur", "kamar mandi"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-usc", "luar-usc-terapan", "luar-array", "luar-array-terapan", "luar-konservasi", "luar-konservasi-terapan", "luar-grid", "luar-grid-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk empat metode");
  cek(M.adegan.length === 11 && U.adegan.length === 10, "11 adegan materi dan 10 adegan metode luar");
  // Subbab A tidak membocorkan materi subbab berikutnya (rumus bangun lain, bangun gabungan, keliling). Pembuka bab dan peta konsep boleh menyebut nama bangun sebagai daftar.
  const BOCOR = /segitiga|jajar ?genjang|trapesium|belah ketupat|layang|rumus|keliling|gabungan|dekomposisi/i;
  const boleh = ["pembuka-bab", "peta-konsep"];
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  for (const a of M.adegan.filter((x) => !boleh.includes(x.id))) cek(!BOCOR.test(teksAdegan(a)), `materi ${a.id} tidak membocorkan materi subbab berikutnya`);
  for (const a of U.adegan) cek(!BOCOR.test(teksAdegan(a)), `metode luar ${a.id} tidak membocorkan materi subbab berikutnya`);
  // Uji Kompetensi, pengayaan, remedial, dan Refleksi nomor 6 sampai 18 milik subbab lain.
  cek(!/Uji Kompetensi|pengayaan|remedial|kolam renang|Refleksi nomor (enam|tujuh|delapan|sembilan|sepuluh|sebelas|dua belas|tiga belas|empat belas|lima belas|enam belas|tujuh belas|delapan belas)/i.test(materi + luar), "tidak memakai Uji Kompetensi, pengayaan, remedial, dan Refleksi 6 sampai 18 milik subbab lain");
  cek(totalKetukan >= 80, `total ketukan cukup dalam (${totalKetukan})`);
}

/* ------------------------------ Semua persamaan di gambar dihitung ulang ------------------------------ */
{
  let n = 0;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        for (const o of akhirAdegan(a, i)) {
          if (o.t !== "teks" || !o.isi) continue;
          const m = o.isi.match(/^([\d\s+×()/]+(?:=\s*[\d\s+×()/]+)+)/);
          if (!m) continue;
          const nilai = m[1].split("=").map((s) => Function(`"use strict"; return (${s.trim().replace(/×/g, "*") || "NaN"});`)());
          n += 1;
          cek(nilai.every((x) => Math.abs(x - nilai[0]) < 1e-9), `${v.id}/${a.id}#${i + 1}: persamaan "${o.isi}" benar (${nilai.join(" ; ")})`);
        }
      });
    }
  }
  cek(n >= 20, `jumlah persamaan yang diperiksa (${n})`);
}

/* ------------------------------ Hitungan isi, dihitung mandiri ------------------------------ */
{
  // Pembuka: sembilan kata kunci (Buku Siswa hlm. 132), skema 4, 8, 2, 2 JP (Panduan Guru hlm. 180).
  sama([...Array(9).keys()].map((i) => nilaiId(akhirAdegan(adegan(M, "pembuka-bab"), 2), `ch${i}-t0`)), ["bangun datar", "bangun gabungan", "belah ketupat", "jajargenjang", "layang-layang", "luas daerah", "persegi", "persegi panjang", "trapesium"], "sembilan kata kunci");
  sama([0, 1, 2, 3].map((i) => nilaiId(akhirAdegan(adegan(M, "peta-konsep"), 3), `sk${i}-t1`)), ["4 JP", "8 JP", "2 JP", "2 JP"], "waktu empat subbab (Panduan Guru hlm. 180)");
  // Benar atau salah: kunci Panduan Guru hlm. 187: benar, benar, salah.
  {
    const t = akhirAdegan(adegan(M, "benar-salah"), 1);
    sama(["b1", "b2", "b3"].map((id) => nilaiId(t, id)), ["Benar", "Benar", "Salah"], "kunci benar atau salah");
  }
  // Ruang tamu: 13 petak (satu di baris atas, empat baris tiga petak).
  {
    const a = adegan(M, "ukur-ruang-tamu");
    const t = akhirAdegan(a, 2);
    const baris = [0, 1, 2, 3, 4].map((r) => t.filter((o) => new RegExp(`^tm-${r}-\\d$`).test(o.id)).length);
    sama(baris, [1, 3, 3, 3, 3], "petak ruang tamu tiap baris");
    sama(jml(baris), LUAS_RUANG.tamu, "petak ruang tamu = 13");
    sama([nilaiId(akhirAdegan(a, 3), "hb-t0"), nilaiId(akhirAdegan(a, 3), "hl-t0"), nilaiId(akhirAdegan(a, 3), "hu-t0")], ["1 + 12 = 13 kotak", "Luas = 13 m²", "Ubin = 13 buah"], "hasil ruang tamu");
    sama([...Array(13).keys()].map((i) => nilaiId(akhirAdegan(a, 4), `nm${i}`)), [...Array(13).keys()].map((i) => String(i + 1)), "petak ruang tamu bernomor 1 sampai 13");
  }
  // Kamar tidur, dapur, kamar mandi, total.
  {
    const a = adegan(M, "ukur-kamar-dapur");
    sama(hitungId(akhirAdegan(a, 0), "kb-"), LUAS_RUANG.tidur, "satu kamar tidur 9 petak");
    const t2 = akhirAdegan(a, 1);
    sama([hitungId(t2, "ka-"), hitungId(t2, "kb-")], [9, 9], "dua kamar tidur masing-masing 9 petak");
    sama([nilaiId(t2, "n9"), nilaiId(t2, "lk-t0"), nilaiId(t2, "m18")], ["9 kotak", "2 × 9 = 18", "18 m²"], "hasil dua kamar tidur");
    const t4 = akhirAdegan(a, 3);
    sama([hitungId(t4, "dp-"), hitungId(t4, "km-")], [LUAS_RUANG.dapur, LUAS_RUANG.mandi], "petak dapur dan kamar mandi");
    sama([nilaiId(t4, "dp6"), nilaiId(t4, "km2")], ["6 kotak = 6 m²", "2 kotak = 2 m²"], "luas dapur dan kamar mandi");
    const t5 = akhirAdegan(a, 4);
    sama(["tm", "td", "tp", "tk"].map((p) => Number(nilaiId(t5, `${p}-t1`).split(" ")[0])), [13, 18, 6, 2], "empat bagian total");
    sama(nilaiId(t5, "tt-t0"), "13 + 18 + 6 + 2 = 39", "total luas lantai");
  }
  // Ayo Berlatih A sampai D dan petak tidak utuh E, F, G.
  {
    const a = adegan(M, "latihan-abcd");
    const t = akhirAdegan(a, 1);
    for (const h of ["A", "B", "C", "D"]) {
      hampir(luasPoli(t, `ak${h}`, 10), LUAS_BANGUN[h], 1e-9, `gambar bangun ${h} berluas kunci`);
      sama(nilaiId(t, `at${h}`), `${h} = ${LUAS_BANGUN[h]}`, `teks luas ${h}`);
    }
    const t3 = akhirAdegan(a, 2);
    sama(["E", "F", "G"].map((h) => t3.filter((o) => o.id.startsWith(`es${h}-`)).length), [6, 6, 8], "petak tidak utuh E, F, G pada gambar");
  }
  // Cara Yohana: E tangga 1+3+5, F persegi panjang 5 kali 3, G 8 utuh dan 2 setengahan; luas tidak berubah.
  {
    const a = adegan(M, "cara-yohana");
    const t1 = akhirAdegan(a, 0);
    hampir(luasPoli(t1, "e1", 16), 9, 1e-9, "Yohana: E awal luas 9");
    hampir(luasPoli(t1, "e2", 16), 9, 1e-9, "Yohana: E setelah diubah luas 9");
    sama(nilaiId(akhirAdegan(a, 1), "hs-t0"), "1 + 3 + 5 = 9", "jumlah baris tangga E");
    const t3 = akhirAdegan(a, 2);
    hampir(luasPoli(t3, "eo", 14), luasPoli(t3, "eb", 14), 1e-9, "luas E sebelum dan sesudah sama");
    sama(nilaiId(t3, "tn"), "=", "tanda sama dengan setelah jawaban tidak berubah");
    const t4 = akhirAdegan(a, 3);
    hampir(luasPoli(t4, "f1", 16), 15, 1e-9, "Yohana: F awal luas 15");
    hampir(luasPoli(t4, "f2", 16), 15, 1e-9, "Yohana: F setelah diubah luas 15");
    hampir(luasTali(jalurDari(t4, "fp")) / 256, luasTali(jalurDari(t4, "fq")) / 256, 1e-9, "bagian yang dipindah sama luas");
    const t5 = akhirAdegan(a, 4);
    hampir(luasPoli(t5, "g1", 14), 9, 1e-9, "Yohana: G awal luas 9");
    hampir(luasPoli(t5, "g2", 14), 9, 1e-9, "Yohana: G setelah diubah luas 9");
    sama(nilaiId(t5, "gj-t0"), "8 + 1/2 + 1/2 = 9", "jumlah G");
    const t6 = akhirAdegan(adegan(M, "miskonsepsi-refleksi"), 0);
    hampir(luasPoli(t6, "m1", 14), luasPoli(t6, "m2", 14), 1e-9, "miskonsepsi 1: dua bentuk luasnya sama");
  }
  // Refleksi 1 sampai 5.
  {
    const t = akhirAdegan(adegan(M, "miskonsepsi-refleksi"), 4);
    sama([1, 2, 3, 4, 5].map((i) => nilaiId(t, `rf${i}-t0`)?.[0]), ["1", "2", "3", "4", "5"], "lima butir refleksi bernomor 1 sampai 5");
  }
  // Unit Square Covering: hitungan berjalan 1, 4, 7, 10, 13 sesuai petak yang ditempel.
  {
    const a = adegan(U, "luar-usc-terapan");
    sama([0, 1, 2, 3, 4].map((i) => nilaiId(akhirAdegan(a, i), "ct")), ["0", "1", "7", "13", "13"], "hitungan berjalan penutupan ruang tamu");
    sama([1, 2, 3, 4].map((i) => hitungId(akhirAdegan(a, i), "ut-")), [1, 7, 13, 13], "petak yang menutup ruang tamu tiap ketukan");
    const t = akhirAdegan(a, 3);
    sama([0, 1, 2, 3, 4].map((r) => t.filter((o) => new RegExp(`^ut-${r}-\\d$`).test(o.id)).length), [1, 3, 3, 3, 3], "petak penutup ruang tamu per baris");
  }
  // Array Model.
  {
    const t = akhirAdegan(adegan(U, "luar-array"), 1);
    sama(t.filter((o) => /^ar-\d-\d$/.test(o.id)).length, 12, "susunan 3 kali 4 = 12 petak");
    sama([nilaiId(t, "a3"), nilaiId(t, "a4"), nilaiId(t, "ah-t0")], ["3 baris", "4 kolom", "3 × 4 = 12"], "isi Array Model");
    const a = adegan(U, "luar-array-terapan");
    sama(hitungId(akhirAdegan(a, 0), "kt-"), 9, "kamar tidur 3 kali 3 = 9");
    sama([hitungId(akhirAdegan(a, 1), "ka-"), hitungId(akhirAdegan(a, 1), "kc-")], [9, 9], "dua kamar tidur");
    sama([hitungId(akhirAdegan(a, 2), "dp-"), hitungId(akhirAdegan(a, 2), "km-")], [6, 2], "dapur 3 kali 2 dan kamar mandi 2 kali 1");
    const t4 = akhirAdegan(a, 3);
    const satu = t4.filter((o) => o.id === "t1" && o.t === "kotak").length;
    sama([hitungId(t4, "tt-"), satu], [12, 1], "ruang tamu 12 petak persegi panjang ditambah 1");
    sama(hitungId(t4, "tt-") + satu, LUAS_RUANG.tamu, "ruang tamu 13");
    const t5 = akhirAdegan(a, 4);
    const luas = [1, 2, 3, 4].map((r) => Number(nilaiId(t5, `ta-t${r}2`)));
    sama(luas, [13, 18, 6, 2], "tabel total Array Model");
    sama(nilaiId(t5, "tj-t0"), `${luas.join(" + ")} = ${jml(luas)} m²`, "jumlah tabel Array Model");
    sama(jml(luas), 39, "total 39");
  }
  // Area Conservation.
  {
    const a = adegan(U, "luar-konservasi");
    const t = akhirAdegan(a, 0);
    sama([hitungId(t, "bl-"), hitungId(t, "st-")], [4, 4], "dua susunan sama-sama 4 petak");
    const b = adegan(U, "luar-konservasi-terapan");
    hampir(luasPoli(akhirAdegan(b, 0), "e", 18), 9, 1e-9, "konservasi E 9");
    hampir(luasPoli(akhirAdegan(b, 1), "f", 18), 15, 1e-9, "konservasi F 15");
    hampir(luasPoli(akhirAdegan(b, 2), "g", 20), 9, 1e-9, "konservasi G 9");
    const t4 = akhirAdegan(b, 3);
    sama([["E", 1], ["F", 2], ["G", 3]].map(([h, r]) => [nilaiId(t4, `kk-t${r}0`), Number(nilaiId(t4, `kk-t${r}1`)), Number(nilaiId(t4, `kk-t${r}2`))]), [["E", 9, 9], ["F", 15, 15], ["G", 9, 9]], "tabel sebelum dan sesudah");
    sama(["E", "F", "G"].map((h, i) => LUAS_BANGUN[h] === [9, 15, 9][i]), [true, true, true], "tabel sama dengan kunci buku");
  }
  // Grid Estimation: petak utuh dan sebagian dihitung ulang dari bentuk di gambar.
  {
    const a = adegan(U, "luar-grid");
    const t = akhirAdegan(a, 1);
    const p = jalurDari(t, "h").map(([x, y]) => [(x - 14) / 22, (y - 44) / 22]);
    const m = hitungPetak(p, 4, 4);
    sama([nilaiId(t, "l1-t1"), nilaiId(t, "l2-t1"), nilaiId(t, "l3-t1")], [`dihitung: ${m.utuh}`, `dihitung: ${m.sebagian}`, `${m.utuh} + ${m.sebagian}/2`], "langkah grid pada bangun contoh");
    sama([t.filter((o) => o.id.startsWith("hu-")).length, t.filter((o) => o.id.startsWith("hs-")).length], [m.utuh, m.sebagian], "petak berwarna sesuai hitungan");
    const t3 = akhirAdegan(a, 2);
    hampir(luasPoli(t3, "pb", 50) + luasPoli(t3, "pd", 50), 1, 1e-9, "3/4 petak ditambah 1/4 petak = 1 petak");
    const b = adegan(U, "luar-grid-terapan");
    ["E", "F", "G"].forEach((h, i) => {
      const tt = akhirAdegan(b, i);
      const hit = hitungPetak(G.BANGUN_AG[h].p, 6, 3);
      sama([tt.filter((o) => o.id.startsWith(`g${h}u-`)).length, tt.filter((o) => o.id.startsWith(`g${h}s-`)).length], [hit.utuh, hit.sebagian], `petak berwarna bangun ${h}`);
      sama([nilaiId(tt, `gu${h}-t0`), nilaiId(tt, `gs${h}-t0`), nilaiId(tt, `gj${h}-t0`)], [`utuh: ${hit.utuh}`, `sebagian: ${hit.sebagian}`, `${hit.utuh} + ${hit.sebagian}/2 = ${hit.utuh + hit.sebagian / 2}`], `rincian grid bangun ${h}`);
    });
    const t4 = akhirAdegan(b, 3);
    sama([1, 2, 3].map((r) => [nilaiId(t4, `pk-t${r}0`), Number(nilaiId(t4, `pk-t${r}1`)), Number(nilaiId(t4, `pk-t${r}2`))]), [["E", 9, 9], ["F", 15, 15], ["G", 9, 9]], "tabel perkiraan grid sama dengan cara Yohana");
  }
  // Ringkasan: kunci.
  {
    const a = adegan(U, "luar-ringkas");
    const t = akhirAdegan(a, 2);
    sama([0, 1, 2, 3].map((c) => Number(nilaiId(t, `kn-t1${c}`))), [13, 9, 6, 2], "kunci ruangan di ringkasan");
    sama(["A", "B", "C", "D", "E", "F", "G"].map((h, c) => [nilaiId(t, `kb-t0${c}`), Number(nilaiId(t, `kb-t1${c}`))]), Object.entries(LUAS_BANGUN), "kunci bangun A sampai G di ringkasan");
  }
}

/* ------------------------------ Kutipan buku (bila PDF tersedia) ------------------------------ */
{
  const bs = new URL("../bahan-sd/Matematika-BS-KLS-V.pdf", import.meta.url);
  const bg = new URL("../bahan-sd/Matematika-BG-KLS-V.pdf", import.meta.url);
  const jalur = (u) => u.pathname.replace(/^\/([A-Za-z]:)/, "$1");
  const ambil = (berkas, dari, sampai) => {
    const r = spawnSync("pdftotext", ["-f", String(dari), "-l", String(sampai), "-raw", jalur(berkas), "-"], { encoding: "utf8", maxBuffer: 1 << 26 });
    return r.status === 0 ? r.stdout : null;
  };
  // Buku Siswa hlm. 131-143 = PDF 147-159, Refleksi hlm. 161 = PDF 177; Panduan Guru hlm. 177-200 = PDF 189-212.
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 147, 159), ambil(bs, 177, 177), ambil(bg, 189, 212)] : [null];
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
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k5b5a-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k5b5a-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k5b5a sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k5b5a.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_A55|video-k4b2-umum|naskah-k5b5/.test(pembungkus) && /VIDEO_MATERI_K5B5A/.test(pembungkus) && /VIDEO_LUAR_K5B5A/.test(pembungkus) && /export function VideoK5B5A/.test(pembungkus) && /DaftarVideoCerita/.test(pembungkus) && /keVideoSiap/.test(pembungkus), "video-k5b5a: memakai dua video baru, bukan naskah lama");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.bangun} bangun A sampai G, ${stat.teksPasang} pasangan teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
