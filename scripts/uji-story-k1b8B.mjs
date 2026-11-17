// Uji Story Kelas 1 Bab 8 Sub-Bab B "Cerita Kesukaan Anak Kampung" (diagram gambar), akhir cerita Perpustakaan Keliling: video materi dan video metode global.
// Bagian umum sama dengan uji Bab 7 Sub-Bab B (ketukan, kata, aksi, bilangan tampak sebagai angka, teks masuk kanvas dan tidak bertumpuk);
// bagian khusus memeriksa masalah muat satu jenis, lembar centang, tabel, bintang renggang, bagian diagram, perbandingan, jumlah, keputusan, penutup,
// dan tiga metode global (Block Graph, Dot Plot, Bar Graph).
// Jalankan: node --no-warnings scripts/uji-story-k1b8B.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b8B-video.ts");
const U1 = await import("../src/components/modul/story/k1b8B-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B8B, V.VIDEO_LUAR_K1B8B];
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
      cek(!/\d/.test(kt.suara), `${nama}#${i + 1}: suara tanpa digit (angka ditulis dengan kata)`);
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
          else {
            // Angka tulisan tangan (kurva): titik-titik pada lintasan harus masuk kanvas.
            const n = bilangan(o.d ?? "");
            const px = n.filter((_, q) => q % 2 === 0).map((q) => x + q);
            const py = n.filter((_, q) => q % 2 === 1).map((q) => y + q);
            cek(px.every((p) => p > -2 && p < 302) && py.every((p) => p > -2 && p < 204), `${nama}#${i + 1}: angka tulisan ${o.id} masuk kanvas`);
          }
        } else if (o.t === "garis" || o.t === "panah") cek(x > -2 && x < 302 && y > -2 && y < 204 && x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 204, `${nama}#${i + 1}: garis ${o.id} masuk kanvas`);
      }
      {
        const teksAda = akhir.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi && !/^[\u{1F000}-\u{1FFFF}]|^[✂✅❌]$/u.test(o.isi));
        for (let p = 0; p < teksAda.length; p += 1) {
          for (let q = p + 1; q < teksAda.length; q += 1) {
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

for (const v of VIDEO) for (const a of v.adegan) a.ketukan.forEach((_, i) => { for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(typeof o.isi === "string" && o.isi.length > 0, `${v.id}/${a.id}#${i + 1}: teks berisi (${o.id})`); });

/* ------------------------------ Khusus Sub-Bab B Bab 8 ------------------------------ */
const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
const M = V.VIDEO_MATERI_K1B8B;
const U = V.VIDEO_LUAR_K1B8B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const hitung = (objs, p) => objs.filter((o) => new RegExp(`^${p}$`).test(o.id)).length;
const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
{
  const materi = JSON.stringify(M.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(M.adegan.map((a) => a.id).join() === "sapaan,muat-sedikit,tanya,ke-tabel,renggang,bagian,banding,jumlah,keputusan,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-balok,luar-balok-terapan,luar-titik,luar-titik-terapan,luar-batang,luar-batang-terapan,luar-ringkas", "urutan adegan metode global");
  for (const a of M.adegan) if (a.id !== "sapaan") cek(a.ketukan.length === 3, `materi/${a.id}: tiga ketukan`);
  for (const a of U.adegan) if (a.id !== "sapaan") cek(a.ketukan.length === 4, `luar/${a.id}: empat ketukan`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Block Graph", "Dot Plot", "Bar Graph"], ["Diagram Balok", "Diagram Titik", "Diagram Batang"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) cek(luar.includes(m) && !materi.includes(m), `${m}: ada di video global saja`);
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M.judul === "Cerita Kesukaan Anak Kampung" && U.judul === M.judul && V.JUDUL_K1B8B === M.judul && M.id === "k1b8B-materi" && U.id === "k1b8B-luar", "judul dan id video");
  const TERLARANG = /buku|panduan guru|kunci|rubrik|latihan|soal|kelas|teman|kelompok|skor|nilai|tebak/i;
  const SURUH = /bawalah|bawa benda|gambarlah|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M, U]) for (const a of v.adegan) {
    const t = teksAdegan(a);
    cek(!TERLARANG.test(t), `${v.id}/${a.id}: tanpa kata terlarang`);
    cek(!SURUH.test(t), `${v.id}/${a.id}: tanpa suruhan`);
    cek(!/toko mainan|rumah pohon|akuarium|kebun|pasar malam|kereta|kardus|rumah rapi/i.test(t), `${v.id}/${a.id}: tanpa tema lama`);
    a.ketukan.forEach((kt, i) => { for (const tt of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(tt)) cek(Number(b) <= 15, `${v.id}/${a.id}#${i + 1}: angka paling besar lima belas ("${tt}")`); });
  }
  const km = kataVideo(M);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)})`);
  for (const kata of ["Igil", "Kaka", "Abang", "Mamah", "Pak Pos", "lembar centang", "tabel", "diagram", "judul", "keterangan", "mendatar", "paling banyak", "paling sedikit", "sama banyak", "rapat", "garis bawah", "dinosaurus", "papan pesanan"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const kata of ["Diagram Balok", "Diagram Titik", "Diagram Batang", "Pak Pos", "berenang", "sepeda", "layang-layang", "hari hujan", "Senin", "Selasa", "Rabu", "judul", "nama pada setiap kolom"]) cek(luar.toLowerCase().includes(kata.toLowerCase()), `video global memuat "${kata}"`);
  const SATU = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9, sepuluh: 10, sebelas: 11 };
  for (const v of [M, U]) for (const a of v.adegan) if (a.id !== "sapaan") a.ketukan.forEach((kt, i) => {
    const terlihat = new Set();
    for (let p = -1; p < L.kataDari(kt.suara).length; p += 1) for (const t of L.teksTerlihat(L.keadaanStory(a, i, p))) for (const b of bilanganDari(t)) terlihat.add(Number(b));
    for (const m of kt.suara.toLowerCase().matchAll(/\b(satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan|sepuluh|sebelas)\b/g)) cek(terlihat.has(SATU[m[1]]), `${v.id}/${a.id}#${i + 1}: bilangan ${m[1]} tampak sebagai angka`);
  });
  // Materi: data survei lima, empat, dua, empat; jumlah lima belas.
  const ms = akhirAdegan(adegan(M, "muat-sedikit"), 2);
  cek(hitung(ms, "ck\\d") === 4 && ada(ms, "pk", "kj-k") && isiTeks(ms, "pl0") === "dinosaurus", "muat sedikit: empat sampul di papan kapur");
  const tn = akhirAdegan(adegan(M, "tanya"), 2);
  cek(hitung(tn, "c\\d") === 3 && isiTeks(tn, "hs") === "hapus 1" && isiTeks(tn, "dk-t0") === "2 centang, 1 anak!", "tanya: dua centang untuk satu anak lalu hapus satu");
  const kt = akhirAdegan(adegan(M, "ke-tabel"), 1);
  sama([0, 1, 2, 3].map((c) => isiTeks(kt, `tbv${c}`)), ["5", "4", "2", "4"], "ke-tabel: lima, empat, dua, empat");
  const rg = akhirAdegan(adegan(M, "renggang"), 0);
  cek(hitung(rg, "gm0s\\d") === 5 && hitung(rg, "gm1s\\d") === 4 && ketemu(rg, "gm1s3").y < ketemu(rg, "gm0s4").y, "renggang: kolom robot renggang tampak lebih tinggi dari dinosaurus");
  const rr = akhirAdegan(adegan(M, "renggang"));
  cek(ketemu(rr, "gm1s3").y > ketemu(rr, "gm0s4").y && ketemu(rr, "gm1s1").y - ketemu(rr, "gm1s0").y === ketemu(rr, "gm0s1").y - ketemu(rr, "gm0s0").y, "renggang: setelah dirapatkan jarak sama dan robot lebih pendek");
  const bg = akhirAdegan(adegan(M, "bagian"), 1);
  cek(ada(bg, "sba1", "sba5", "pa-k", "pg-k", "pk-k", "kt") && isiTeks(bg, "dt") === "Cerita Kesukaan Anak", "bagian: judul, angka, gambar, keterangan ada");
  const bm = akhirAdegan(adegan(M, "bagian"));
  cek(hitung(bm, "bm\\ds\\d") === 15 && ada(bm, "md-k", "ds-k"), "bagian: diagram mendatar lima belas bintang");
  const bd = akhirAdegan(adegan(M, "banding"));
  cek(isiTeks(bd, "k1") === "5 – 2 = 3", "banding: lima kurang dua sama dengan tiga");
  const jm = akhirAdegan(adegan(M, "jumlah"));
  cek(isiTeks(jm, "kal") === "15 anak" && hitung(jm, "jm\\ds\\d") === 15, "jumlah: lima belas anak dan lima belas bintang");
  const pn = akhirAdegan(adegan(M, "penutup"), 1);
  cek(hitung(pn, "r\\d-k") === 5, "penutup: lima langkah rangkuman");
  // Global.
  const bt = akhirAdegan(adegan(U, "luar-balok-terapan"), 0);
  cek(hitung(bt, "g0\\d") === 4 && hitung(bt, "g1\\d") === 6 && hitung(bt, "g2\\d") === 3, "Block Graph: empat, enam, tiga balok");
  const tt = akhirAdegan(adegan(U, "luar-titik-terapan"), 0);
  cek(hitung(tt, "ts\\d") === 3 && hitung(tt, "tl\\d") === 1 && hitung(tt, "tr\\d") === 5, "Dot Plot: tiga, satu, lima titik");
  const bb = akhirAdegan(adegan(U, "luar-batang-terapan"), 0);
  cek([ketemu(bb, "bt0"), ketemu(bb, "bt1"), ketemu(bb, "bt2")].every(Boolean) && ketemu(bb, "bt2").h > ketemu(bb, "bt0").h && ketemu(bb, "bt0").h > ketemu(bb, "bt1").h, "Bar Graph: batang Rabu paling tinggi, Selasa paling pendek");
  sama([isiTeks(bb, "v0"), isiTeks(bb, "v1"), isiTeks(bb, "v2")], ["8", "5", "11"], "Bar Graph: delapan, lima, sebelas");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k1b8B-.*\.ts$/.test(f));
  cek(berkas.length >= 7, `berkas story k1b8B (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
  }
  const pb = readFileSync(new URL("../src/components/modul/video-k1b8b.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K1B8B/.test(pb) && /VIDEO_LUAR_K1B8B/.test(pb) && /export function VideoK1B8B/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb), "video-k1b8b.tsx memakai dua video");
}
for (const v of VIDEO) {
  const n = kataVideo(v);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
