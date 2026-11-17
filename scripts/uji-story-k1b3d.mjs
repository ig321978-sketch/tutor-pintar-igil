// Uji Story Kelas 1 Bab 3 Sub-Bab D "Tiba di Rumah Nenek" (soal cerita pengurangan), akhir cerita Kereta ke Rumah Nenek: video materi dan video metode global.
// Bagian umum sama dengan uji Sub-Bab A; bagian khusus memeriksa cerita kue, cerita jeruk dengan model batang, dua kali, membuat cerita, akhir cerita, dan tiga metode global.
// Jalankan: node --no-warnings scripts/uji-story-k1b3d.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b3d-video.ts");
const U1 = await import("../src/components/modul/story/k1b3d-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B3D, V.VIDEO_LUAR_K1B3D];
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

/* ------------------------------ Khusus Sub-Bab D Bab 3 ------------------------------ */
const M_VIDEO = V.VIDEO_MATERI_K1B3D;
const U = V.VIDEO_LUAR_K1B3D;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const hitung = (objs, p) => objs.filter((o) => new RegExp(`^${p}\\d+$`).test(o.id)).length;
const pudar = (objs, p) => objs.filter((o) => new RegExp(`^${p}\\d+$`).test(o.id) && (o.op ?? 1) < 0.5).length;
const kalimatDi = (objs, p, n = 5) => Array.from({ length: n }, (_, i) => isiTeks(objs, `${p}${i}`)).join(" ");
const K = "−";
const kur = (a, b) => `${a} ${K} ${b} = ${a - b}`;
const tam = (a, b) => `${a} + ${b} = ${a + b}`;
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!/\bBar Model|CUBES|Draw a Picture|metode global/i.test(materi), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Tiba di Rumah Nenek" && U.judul === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,tiba-desa,cerita-kue,cerita-jeruk,dua-kali,buat-cerita,kumpul-nenek,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-batang,luar-batang-terapan,luar-cubes,luar-cubes-terapan,luar-sketsa,luar-sketsa-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46) && U.adegan.every((a) => /Metode global|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "label sumber");
  const TERLARANG = /buku|panduan guru|kunci jawaban|rubrik|latihan|soal|kelas|teman|kelompok|skor|nilai/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  // Sub-Bab D: pengurangan sampai sepuluh (penjumlahan hanya untuk memeriksa), tanpa belasan, puluhan, dan tanda lain.
  const BOCOR = /\bbelas\b|\bpuluh\b|sebelas|[<>×÷+−]/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) {
    cek(!BOCOR.test(a.ketukan.map((kt) => kt.suara).join(" ")), `${v.id}/${a.id}: suara tanpa belasan atau lambang`);
    for (const [i] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) {
      cek(!/[<>×÷]/.test(t) && !/\d\s*-\s*\d/.test(t), `${v.id}/${a.id}#${i + 1}: hanya tanda tambah, kurang, dan sama dengan ("${t}")`);
      for (const b of bilanganDari(t)) cek(Number(b) <= 10, `${v.id}/${a.id}#${i + 1}: angka paling besar sepuluh ("${t}")`);
    }
  }
  for (const kata of ["Igil", "Kaka", "Abang", "Mamah", "Nenek", "tetangga", "lingkari", "kata kunci", "kalimat lengkap", "periksa", "dua kali", "model batang", "selesai"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const kata of ["Malosi", "Kira", "Upe", "Wei", "Halim", "kebun", "bibit", "sekolah", "burung", "kelereng"]) for (const isi of [materi, luar]) cek(!isi.toLowerCase().includes(kata.toLowerCase()), `video tanpa tokoh atau latar lama "${kata}"`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}
{
  // Cerita kue: enam kue dari Sub-Bab A, dua diberikan, lingkari bilangan dan kotaki kata kunci, jawab dan periksa.
  const c = adegan(M_VIDEO, "cerita-kue");
  sama([hitung(akhirAdegan(c, 0), "ku"), pudar(akhirAdegan(c, 0), "ku")], [6, 2], "kue: enam, dua diberikan");
  const c1 = akhirAdegan(c, 1);
  cek(ketemu(c1, "l6") && ketemu(c1, "l2") && ketemu(c1, "kk") && /kuberikan/.test(isiTeks(c1, "cb-t0")), "kue: lingkari enam dan dua, kotaki kuberikan");
  sama([kalimatDi(akhirAdegan(c, 2), "kl"), isiTeks(akhirAdegan(c, 2), "jw-t0"), kalimatDi(akhirAdegan(c), "k2")], [kur(6, 2), "kue Nenek tinggal 4", tam(4, 2)], "kue: kalimat, jawaban lengkap, periksa");
  // Cerita jeruk: mencari yang dibagikan dengan model batang.
  const j = adegan(M_VIDEO, "cerita-jeruk");
  sama([hitung(akhirAdegan(j, 0), "jr"), pudar(akhirAdegan(j, 0), "jr")], [10, 3], "jeruk: sepuluh, tiga dibagikan");
  sama(["mb-tu", "mb-ta", "mb-tb"].map((id) => isiTeks(akhirAdegan(j, 1), id)), ["10", "7", "?"], "jeruk: model batang dengan bagian dicari");
  sama([kalimatDi(akhirAdegan(j), "kl"), isiTeks(akhirAdegan(j), "mb-tb")], [kur(10, 7), "3"], "jeruk: sepuluh dikurangi tujuh");
  // Dua kali: sembilan, dua, empat.
  const d = adegan(M_VIDEO, "dua-kali");
  sama([hitung(akhirAdegan(d, 0), "pm"), pudar(akhirAdegan(d, 0), "pm")], [9, 6], "dua kali: sembilan permen, enam pergi");
  sama([kalimatDi(akhirAdegan(d, 1), "k1"), kalimatDi(akhirAdegan(d, 1), "k2"), kalimatDi(akhirAdegan(d, 2), "k3")], [kur(9, 2), kur(7, 4), kur(9, 6)], "dua kali: dua langkah dan gabung dulu");
  // Buat cerita sendiri.
  const b = adegan(M_VIDEO, "buat-cerita");
  sama([hitung(akhirAdegan(b, 0), "th"), pudar(akhirAdegan(b, 0), "th"), kalimatDi(akhirAdegan(b, 1), "kl")], [8, 5, kur(8, 5)], "buat cerita: delapan teh, lima diminum");
  cek(/Jadi, tersisa 3 gelas teh/.test(isiTeks(akhirAdegan(b), "jw-t0")), "buat cerita: jawaban kalimat lengkap");
  // Akhir cerita bab.
  const h = adegan(M_VIDEO, "kumpul-nenek");
  cek(["ig", "kk", "ab", "mm", "nn"].every((id) => ketemu(akhirAdegan(h, 1), id)) && /selesai/.test(isiTeks(akhirAdegan(h, 1), "sl-t0")), "akhir: semua berkumpul, perjalanan selesai");
  // Metode global.
  const bt = adegan(U, "luar-batang-terapan");
  sama([hitung(akhirAdegan(bt, 0), "ps"), isiTeks(akhirAdegan(bt, 1), "mb-tb"), kalimatDi(akhirAdegan(bt, 2), "kl"), isiTeks(akhirAdegan(bt), "mb-tb")], [9, "?", kur(9, 3), "6"], "Bar Model: sembilan pisang, tiga dimakan");
  const ct = adegan(U, "luar-cubes-terapan");
  const ct1 = akhirAdegan(ct, 1);
  cek(ketemu(ct1, "l7") && ketemu(ct1, "l5") && ketemu(ct1, "gb") && ketemu(ct1, "kk"), "CUBES: lingkari, garis bawahi, kotaki");
  sama([kalimatDi(akhirAdegan(ct, 2), "k1"), kalimatDi(akhirAdegan(ct), "k2")], [kur(7, 5), tam(2, 5)], "CUBES: tujuh dikurangi lima, diperiksa");
  const st = adegan(U, "luar-sketsa-terapan");
  const st3 = akhirAdegan(st);
  sama([hitung(st3, "o"), hitung(st3, "cm"), hitung(st3, "cb"), kalimatDi(st3, "kl", 7)], [10, 3, 2, `10 ${K} 3 ${K} 2 = 5`], "Draw a Picture: sepuluh, coret tiga dan dua");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k1b3d-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k1b3d (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b1[abcd]-[a-z0-9-]+|k1b2a-gambar|k1b3a-gambar|k1b3b-gambar|k1b3c-gambar|k1b3d-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, dan berkas k1b1 atau k1b3d (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k1b3d.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K1B3D/.test(pb) && /VIDEO_LUAR_K1B3D/.test(pb) && !/\r/.test(pb), "video-k1b3d.tsx memakai dua video Story");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
