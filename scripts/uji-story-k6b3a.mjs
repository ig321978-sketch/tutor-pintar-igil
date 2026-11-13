// Uji Story Kelas 6 Bab 3 Sub-Bab A (Mengonstruksi dan Mengurai, termasuk pembuka bab): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// pemisahan materi dan metode luar, kutipan buku (bila PDF ada), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k6b3a.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k6b3a-video.ts");

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

/* Mesin (logika-story) diuji lengkap di scripts/uji-story-k6b4a.mjs. */
cek(typeof L.keadaanStory === "function" && typeof L.posisiKata === "function", "mesin Story tersedia");

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K6B3A, V.VIDEO_LUAR_K6B3A];
const bilanganDari = (t) => (t.match(/\d[\d.]*\d|\d/g) ?? []).map((v) => v.replace(/\./g, ""));
const semuaSidik = new Map();
let totalKetukan = 0;
let totalKata = 0;
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
      // pemicu kata
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
      // keadaan akhir ketukan
      const akhir = L.keadaanStory(a, i, 9999);
      const sidik = L.sidikKeadaan(akhir);
      cek(sebelumnya === null || sidik !== sebelumnya, `${nama}#${i + 1}: gambar berubah dibanding ketukan sebelumnya`);
      sebelumnya = sidik;
      const kunci = `${v.id}/${a.id}`;
      if (i === a.ketukan.length - 1) {
        const lama = semuaSidik.get(sidik);
        cek(!lama, `${nama}: gambar akhir adegan tidak sama dengan adegan lain (${lama ?? ""})`);
        semuaSidik.set(sidik, kunci);
      }
      // sinkron angka: tiap bilangan dalam suara tampak di gambar pada ketukan ini atau sebelumnya
      for (let p = 0; p < kata.length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(b);
      for (const b of bilanganDari(kt.suara)) cek(terlihat.has(b), `${nama}#${i + 1}: bilangan ${b} di suara tampak di gambar`);
      // gambar mengikuti kata: bila ada aksi pada lebih dari satu kata, keadaan harus bertambah di sepanjang kalimat
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
          cek(y > 0 && y < 210 && kiri > -4 && kiri + lebar < 304, `${nama}#${i + 1}: teks "${o.isi}" masuk kanvas (x=${x}, y=${y}, lebar=${Math.round(lebar)})`);
        } else if (o.t === "kotak") cek(x > -2 && y > -2 && x + (o.w ?? 0) < 302 && y + (o.h ?? 0) < 210 || o.id === "tanah" || o.id === "lantai", `${nama}#${i + 1}: kotak ${o.id} masuk kanvas`);
        else if (o.t === "bulat") cek(x - (o.r ?? 0) > -2 && x + (o.r ?? 0) < 302 && y - (o.r ?? 0) > -2 && y + (o.r ?? 0) < 210, `${nama}#${i + 1}: bulat ${o.id} masuk kanvas`);
      }
    });
  }
}

/* ------------------------------ Pemisahan materi dan metode luar ------------------------------ */
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map((a) => [a.judul, a.ketukan.map((kt) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, a.ketukan.indexOf(kt), 9999))])]));
  const NAMA_METODE = /Layer Counting|Hidden Support|Rotational Equivalence|Minimal Footprint|metode luar/i;
  const materi = teksVideo(V.VIDEO_MATERI_K6B3A);
  const luar = teksVideo(V.VIDEO_LUAR_K6B3A);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Layer Counting", "Hidden Support Rule", "Rotational Equivalence Check", "Minimal Footprint Packing"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(V.VIDEO_MATERI_K6B3A.adegan.every((a) => /Buku Siswa/.test(a.sumber) && /hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(V.VIDEO_LUAR_K6B3A.adegan.every((a) => /metode (dari )?luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Fort Rotterdam", "Makassar", "C2", "Eksplorasi 3.1", "Latihan 3.1", "Pak Hasan", "kontainer", "Royal Caravan", "prisma segitiga", "peta konsep", "mengingat kembali", "pemantik", "refleksi", "penyangga|menggantung", "dua balok"]) cek(new RegExp(kata, "i").test(materi), `video materi memuat ${kata}`);
  const ids = V.VIDEO_LUAR_K6B3A.adegan.map((a) => a.id);
  cek(["luara-lapis", "luara-lapis-terapan", "luara-sangga", "luara-putar", "luara-jejak", "luara-jejak-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(totalKetukan >= 55, `total ketukan cukup dalam (${totalKetukan})`);
}

/* ------------------------------ Angka yang dihitung dalam video, dihitung mandiri ------------------------------ */
{
  const Lu = await import("../src/components/modul/story/k6b3a-luar-1.ts");
  const hitungSel = (sel, f) => sel.filter(f).length;
  // Tangga: banyak kubus per lapisan dan jumlah tinggi kolom.
  const T = Lu.dariTinggi(Lu.TANGGA);
  sama([0, 1, 2].map((h) => hitungSel(T, (s) => s[2] === h)), [6, 3, 1], "lapisan tangga bawah, tengah, atas");
  sama([T.length, Lu.TANGGA.flat().reduce((a, b) => a + b, 0)], [10, 10], "tangga: jumlah per lapisan dan jumlah tinggi kolom sama");
  sama(Lu.TANGGA.flat().filter((t) => t > 0), [3, 2, 1, 2, 1, 1], "tinggi kolom tangga yang disebut");
  // Piramida tiga lapisan.
  sama([0, 1, 2].map((h) => hitungSel(Lu.PIRAMIDA, (s) => s[2] === h)), [9, 4, 1], "piramida: 3 x 3, 2 x 2, 1");
  sama(Lu.PIRAMIDA.length, 14, "piramida 14 kubus");
  // Latihan 3.1 nomor 3: lapisan bawah 6 (4 terlihat + 2 penyangga) dan lapisan atas 2.
  sama([4 + 2, 2, 4 + 2 + 2], [6, 2, 8], "Latihan 3.1 nomor 3: 6 + 2 = 8, juga 6 terlihat + 2 tersembunyi");
  // Menara sudut: kubus tersembunyi bila tetangga di sisi i+, j+, dan h+ semuanya terisi.
  const MENARA = [[0, 0, 0], [0, 0, 1], [0, 0, 2], [1, 0, 0], [0, 1, 0]];
  const ada = (a, b, c) => MENARA.some((s) => s[0] === a && s[1] === b && s[2] === c);
  const tersembunyi = MENARA.filter(([i, j, h]) => ada(i + 1, j, h) && ada(i, j + 1, h) && ada(i, j, h + 1));
  sama([MENARA.length, tersembunyi.length, MENARA.length - tersembunyi.length], [5, 1, 4], "menara sudut: 5 kubus, 1 tersembunyi, 4 terlihat");
  // Bentuk bebas dari n kubus (sama bila dapat diputar), dicacah satu per satu.
  const putar = [];
  const perm = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
  const paritas = (p) => {
    let n = 0;
    for (let i = 0; i < 3; i += 1) for (let j = i + 1; j < 3; j += 1) if (p[i] > p[j]) n += 1;
    return n % 2 === 0 ? 1 : -1;
  };
  for (const p of perm) for (const sx of [1, -1]) for (const sy of [1, -1]) for (const sz of [1, -1]) if (paritas(p) * sx * sy * sz === 1) putar.push((c) => [sx * c[p[0]], sy * c[p[1]], sz * c[p[2]]]);
  sama(putar.length, 24, "ada 24 putaran kubus");
  const kanon = (sel) => {
    let terbaik = null;
    for (const r of putar) {
      const t = sel.map(r);
      const m = [0, 1, 2].map((a) => Math.min(...t.map((c) => c[a])));
      const g = t.map((c) => c.map((v, a) => v - m[a])).sort((x, y) => x[0] - y[0] || x[1] - y[1] || x[2] - y[2]);
      const kunci = JSON.stringify(g);
      if (terbaik === null || kunci < terbaik) terbaik = kunci;
    }
    return terbaik;
  };
  const tinggiDi = (sel) => [...new Set(putar.map((r) => { const t = sel.map(r).map((c) => c[2]); return Math.max(...t) - Math.min(...t) + 1; }))].sort();
  const tumbuh = (set) => {
    const hasil = new Map();
    for (const sel of set) for (const [i, j, h] of sel) for (const [a, b, c] of [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]]) {
      const baru = [i + a, j + b, h + c];
      if (sel.some((s) => s[0] === baru[0] && s[1] === baru[1] && s[2] === baru[2])) continue;
      const gabung = [...sel, baru];
      hasil.set(kanon(gabung), gabung);
    }
    return [...hasil.values()];
  };
  const dua = tumbuh([[[0, 0, 0]]]);
  const tiga = tumbuh(dua);
  sama([dua.length, tiga.length], [1, 2], "dua kubus: 1 bentuk; tiga kubus: 2 bentuk berbeda");
  sama(tiga.map(tinggiDi).map((a) => a.join("-")).sort(), ["1-2", "1-3"], "tinggi yang mungkin: bentuk siku 1 atau 2 lantai, bentuk lurus 1 atau 3 lantai");
  cek(kanon([[0, 0, 0], [1, 0, 0], [2, 0, 0]]) !== kanon([[0, 0, 0], [1, 0, 0], [0, 1, 0]]), "lurus dan siku tidak dapat saling diputar");
  cek(kanon([[0, 0, 0], [1, 0, 0], [2, 0, 0]]) === kanon([[0, 0, 0], [0, 0, 1], [0, 0, 2]]), "tiga berjejer sama dengan menara tiga lantai");
  cek(kanon([[0, 0, 0], [1, 0, 0], [0, 1, 0]]) === kanon([[0, 0, 0], [1, 0, 0], [0, 0, 1]]), "siku berbaring sama dengan siku berdiri");
  cek(kanon([[0, 0, 0], [1, 0, 0]]) === kanon([[0, 0, 0], [0, 0, 1]]) && kanon([[0, 0, 0], [1, 0, 0]]) === kanon([[0, 0, 0], [0, 1, 0]]), "dua kubus: a, b, dan c sama");
  // Dua balok 2 x 1 x 1: sisi 2 x 1 bertemu (kotak 2 x 2 x 1) lawan sisi 1 x 1 bertemu (balok 4 x 1 x 1).
  const kotak2 = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0]];
  const balok4 = [[0, 0, 0], [1, 0, 0], [2, 0, 0], [3, 0, 0]];
  cek(kanon(kotak2) !== kanon(balok4) && kotak2.length === balok4.length, "dua balok: dua susunan berbeda dengan jumlah kubus sama");
  // Pak Hasan: 30 kardus 20 x 30 x 50, tinggi gudang 310 cm.
  const dim = [20, 30, 50];
  const volume = 30 * dim[0] * dim[1] * dim[2];
  sama([dim[0] * dim[1] * dim[2], volume], [30000, 900000], "volume satu kardus dan 30 kardus");
  const hasil = dim.map((t) => {
    const lain = dim.filter((v) => v !== t);
    const perTumpukan = Math.floor(310 / t);
    const tumpukan = Math.ceil(30 / perTumpukan);
    return [t, perTumpukan, tumpukan, lain[0] * lain[1], tumpukan * lain[0] * lain[1]];
  });
  sama(hasil, [[20, 15, 2, 1500, 3000], [30, 10, 3, 1000, 3000], [50, 6, 5, 600, 3000]], "tiga cara menegakkan kardus: semuanya 3.000 cm persegi");
  sama([volume / 300, 3000 / 10000], [3000, 0.3], "jejak 900.000 dibagi 300, dan 0,3 meter persegi");
  cek(310 >= 6 * 50 && 6 * 50 === 300 && 300 % 20 === 0 && 300 % 30 === 0 && 300 % 50 === 0, "300 habis dibagi 20, 30, dan 50");
}

/* ------------------------------ Kutipan buku (bila PDF tersedia) ------------------------------ */
{
  const pdf = new URL("../bahan-sd/Matematika-BS-KLS-VI.pdf", import.meta.url);
  const ada = existsSync(pdf);
  const cobaPdf = ada ? spawnSync("pdftotext", ["-f", "90", "-l", "112", "-raw", pdf.pathname.replace(/^\/([A-Za-z]:)/, "$1"), "-"], { encoding: "utf8", maxBuffer: 1 << 26 }) : null;
  if (!ada || !cobaPdf || cobaPdf.status !== 0) console.log("PDF atau pdftotext tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const buku = bersih(cobaPdf.stdout);
    let n = 0;
    for (const a of V.VIDEO_MATERI_K6B3A.adegan) for (const kt of a.kutipan ?? []) {
      n += 1;
      cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
    }
    cek(n >= 20, `jumlah kutipan buku yang diperiksa (${n})`);
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k6b3a-.*)\.(ts|tsx)$/.test(f));
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
    if (f !== "mesin-story.tsx") cek(!/from "react"/.test(s), `${f}: logika dan data tanpa React`);
  }
  
  // larangan berbagi visual: berkas k6b3aa tidak mengimpor gambar atau adegan bab lain
  for (const f of berkas.filter((x) => x.startsWith("k6b3a-"))) {
    const s = readFileSync(new URL(f, folder), "utf8");
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|k6b3a-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k6b3a sendiri (${impor.join(", ")})`);
  }
  // mesin tidak memakai kit visual lama
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k6b3a.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_A63/.test(pembungkus) && /VIDEO_MATERI_K6B3A/.test(pembungkus) && /VIDEO_LUAR_K6B3A/.test(pembungkus), "video-k6b3aa: memakai dua video baru, bukan naskah dan visual lama");
}

console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
