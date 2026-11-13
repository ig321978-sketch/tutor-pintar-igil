// Uji Story Kelas 6 Bab 1 Sub-Bab B (Pembagian Pecahan): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// pemisahan materi dan metode luar, kutipan buku (bila PDF ada), hitungan pecahan mandiri, emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k6b1b.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k6b1b-video.ts");

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

/* ------------------------------ Pecahan mandiri (bilangan bulat murni) ------------------------------ */
const gcd = (a, b) => (b === 0n ? (a < 0n ? -a : a) : gcd(b, a % b));
const P = (n, d = 1n) => {
  n = BigInt(n);
  d = BigInt(d);
  if (d < 0n) { n = -n; d = -d; }
  const g = gcd(n, d) || 1n;
  return { n: n / g, d: d / g };
};
const tambahP = (a, b) => P(a.n * b.d + b.n * a.d, a.d * b.d);
const kurangP = (a, b) => P(a.n * b.d - b.n * a.d, a.d * b.d);
const kaliP = (a, b) => P(a.n * b.n, a.d * b.d);
const bagiP = (a, b) => P(a.n * b.d, a.d * b.n);
const samaP = (a, b) => a.n === b.n && a.d === b.d;
const teksP = (a) => (a.d === 1n ? `${a.n}` : `${a.n}/${a.d}`);

/** Penghitung ungkapan di gambar: bilangan bulat, pecahan a/b, campuran "6 2/3", "7½", kurung, tanda × ÷ −. Mengembalikan null bila gagal. */
function hitung(s) {
  let i = 0;
  const lewati = () => { while (s[i] === " ") i += 1; };
  const angka = () => {
    lewati();
    const m = /^\d+/.exec(s.slice(i));
    if (!m) return null;
    i += m[0].length;
    return P(m[0]);
  };
  const atom = () => {
    lewati();
    let v;
    if (s[i] === "(") {
      i += 1;
      v = ungkap();
      lewati();
      if (s[i] !== ")") return null;
      i += 1;
    } else {
      v = angka();
      if (!v) return null;
      if (s[i] === "½") { v = tambahP(v, P(1, 2)); i += 1; }
      else {
        const m = /^ (\d+)\/(\d+)/.exec(s.slice(i));
        if (m && s.slice(i).length > 0 && !/^ \d+\/\d+\s*[×÷−]/.test(s.slice(i)) ) { /* campuran: angka lalu pecahan */ }
        if (m) { v = tambahP(v, P(m[1], m[2])); i += m[0].length; }
      }
    }
    return v;
  };
  const faktor = () => {
    let v = atom();
    if (!v) return null;
    while (s[i] === "/") {
      i += 1;
      const w = atom();
      if (!w || w.n === 0n) return null;
      v = bagiP(v, w);
    }
    return v;
  };
  const suku = () => {
    let v = faktor();
    if (!v) return null;
    for (;;) {
      lewati();
      if (s[i] === "×" || s[i] === "÷") {
        const op = s[i];
        i += 1;
        const w = faktor();
        if (!w) return null;
        if (op === "÷" && w.n === 0n) return null;
        v = op === "×" ? kaliP(v, w) : bagiP(v, w);
      } else return v;
    }
  };
  function ungkap() {
    let v = suku();
    if (!v) return null;
    for (;;) {
      lewati();
      if (s[i] === "−") {
        i += 1;
        const w = suku();
        if (!w) return null;
        v = kurangP(v, w);
      } else return v;
    }
  }
  const v = ungkap();
  lewati();
  return v && i === s.length ? v : null;
}

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K6B1B, V.VIDEO_LUAR_K6B1B];
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
        } else if (o.t === "kotak") cek((x > -2 && y > -2 && x + (o.w ?? 0) < 302 && y + (o.h ?? 0) < 210) || o.id === "tanah" || o.id === "lantai", `${nama}#${i + 1}: kotak ${o.id} masuk kanvas`);
        else if (o.t === "bulat") cek(x - (o.r ?? 0) > -2 && x + (o.r ?? 0) < 302 && y - (o.r ?? 0) > -2 && y + (o.r ?? 0) < 210, `${nama}#${i + 1}: bulat ${o.id} masuk kanvas`);
      }
    });
  }
}

/* ------------------------------ Pemisahan materi dan metode luar ------------------------------ */
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map((a) => [a.judul, a.sumber, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]));
  const NAMA_METODE = /Partition Division|Reciprocal Flip|Cross-Arrow|Repeated-Subtraction|Measurement|pengurangan berulang|metode luar|metode dari luar/i;
  const SUB_LAIN = /Area Model|Whole-as-Fraction|Straight-Arrow|Commutative|desimal|persepuluhan|perseratusan|Place-Value|Equivalent Fraction|Sub-Bab A|Sub-Bab C/i;
  const materi = teksVideo(V.VIDEO_MATERI_K6B1B);
  const luar = teksVideo(V.VIDEO_LUAR_K6B1B);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  cek(!SUB_LAIN.test(luar.replace(/Sub-Bab B/g, "")), "video metode luar tidak membahas materi Sub-Bab A atau C");
  cek(!SUB_LAIN.test(materi.replace(/Sub-Bab B/g, "")), "video materi tidak membahas Sub-Bab A atau C");
  for (const m of ["Partition Division", "Reciprocal Flip", "Cross-Arrow Divide", "Repeated-Subtraction Measurement"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(V.VIDEO_MATERI_K6B1B.adegan.every((a) => /Buku Siswa/.test(a.sumber) && /hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(V.VIDEO_LUAR_K6B1B.adegan.every((a) => /metode (dari )?luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Pembagian Pecahan", "Agam", "Eksplorasi 1\\.3", "Eksplorasi 1\\.4", "botol", "gelas", "Intuisi Bilangan", "Berpikir Kritis", "Berpikir Kreatif", "Rini", "kebalikan", "jus jeruk", "jus jambu", "air mineral", "Latihan 1\\.2", "Pak Rudi", "Rina", "kue bolu", "Astri", "cokelat", "Berefleksi", "Panduan Guru"]) cek(new RegExp(kata, "i").test(materi), `video materi memuat ${kata}`);
  const ids = V.VIDEO_LUAR_K6B1B.adegan.map((a) => a.id);
  cek(["luarb1-partisi", "luarb1-partisi-terapan", "luarb1-balik", "luarb1-balik-terapan", "luarb1-silang", "luarb1-silang-terapan", "luarb1-ukur", "luarb1-ukur-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(V.VIDEO_MATERI_K6B1B.adegan.length === 10 && V.VIDEO_LUAR_K6B1B.adegan.length === 10, "10 adegan materi dan 10 adegan metode luar");
  cek(totalKetukan >= 100, `total ketukan cukup dalam (${totalKetukan})`);
}

/* ------------------------------ Angka yang dihitung dalam video, dihitung mandiri ------------------------------ */
{
  const R = (a, b = 1) => P(a, b);
  // Eksplorasi 1.3: pecahan dibagi bilangan asli (kunci Buku Panduan Guru: 1/3, 1/6, 1/9)
  sama([bagiP(R(1), R(3)), bagiP(R(1, 2), R(3)), bagiP(R(1, 3), R(3))].map(teksP), ["1/3", "1/6", "1/9"], "Eksplorasi 1.3: 1 : 3, 1/2 : 3, 1/3 : 3");
  sama(kaliP(R(1, 2), R(1, 3)), R(1, 6), "1/2 dikali 1/3 sama dengan 1/6");
  sama([2 * 3, 3 * 3], [6, 9], "penyebut 2 kali 3 dan 3 kali 3");
  // Berpikir kritis: 4/3 : 2 (Rini) dan cara umum
  sama(teksP(bagiP(R(4, 3), R(2))), "2/3", "4/3 : 2 = 2/3");
  sama(teksP(kaliP(R(4, 3), R(1, 2))), "2/3", "cara umum 4/3 x 1/2 = 2/3, sama dengan cara Rini");
  sama(teksP(bagiP(R(3, 4), R(2))), "3/8", "3/4 : 2 = 3/8");
  sama(teksP(bagiP(R(1, 3), R(2))), "1/6", "pita 1/3 meter dibagi 2 = 1/6 meter");
  // Eksplorasi 1.4: 3 : 1/4, 3 : 1/2, 3 : 1/5, 3 : 2/5
  sama([bagiP(R(3), R(1, 4)), bagiP(R(3), R(1, 2)), bagiP(R(3), R(1, 5))].map(teksP), ["12", "6", "15"], "Eksplorasi 1.4 a, b, c: 12, 6, 15 gelas");
  sama(teksP(bagiP(R(3), R(2, 5))), "15/2", "3 : 2/5 = 15/2");
  sama(teksP(bagiP(R(1), R(2, 5))), "5/2", "1 : 2/5 = 5/2 = 2 1/2");
  sama(15n / 2n, 7n, "bagian bulat 15/2 adalah 7, sisa setengah gelas");
  sama(teksP(kaliP(R(12), R(1, 4))), "3", "12 dikali 1/4 sama dengan 3");
  // Latihan 1.2 (dicocokkan dengan kunci Buku Panduan Guru)
  sama(teksP(bagiP(R(2, 4), R(3))), "1/6", "nomor 1: 2/4 : 3 = 1/6");
  sama(teksP(bagiP(R(6), R(3, 4))), "8", "nomor 2: 6 : 3/4 = 8");
  sama(teksP(kaliP(R(8), R(3, 4))), "6", "nomor 2: pemeriksaan 8 x 3/4 = 6");
  sama(teksP(bagiP(R(5), R(2, 3))), "15/2", "nomor 3: 5 : 2/3 = 15/2");
  sama(teksP(kaliP(R(7), R(2, 3))), "14/3", "nomor 3: 7 teman memakai 14/3 batang");
  sama(teksP(kurangP(R(5), kaliP(R(7), R(2, 3)))), "1/3", "nomor 3: sisa cokelat 1/3 batang (kunci menulis 1/2 bagian, yaitu setengah porsi)");
  sama(teksP(kaliP(R(1, 2), R(2, 3))), "1/3", "setengah porsi 2/3 sama dengan 1/3 batang");
  sama(teksP(bagiP(R(1, 5), R(4))), "1/20", "nomor 4a: 1/5 : 4 = 1/20");
  sama(teksP(bagiP(R(4), R(1, 5))), "20", "nomor 4b: 4 : 1/5 = 20");
  // Refleksi
  sama(teksP(bagiP(R(2, 3), R(4))), "1/6", "2/3 : 4 = 1/6");
  sama(teksP(bagiP(R(2), R(1, 3))), "6", "2 : 1/3 = 6");
  // Metode luar
  sama(teksP(bagiP(R(2, 5), R(3))), "2/15", "luar: 2/5 : 3 = 2/15");
  sama(teksP(bagiP(R(3, 4), R(2))), "3/8", "luar: pita 3/4 : 2 = 3/8");
  sama(teksP(kaliP(R(3, 8), R(2))), "3/4", "luar: pemeriksaan 3/8 x 2 = 3/4");
  sama(teksP(bagiP(R(9), R(3, 4))), "12", "luar: tali 9 : 3/4 = 12");
  sama(teksP(kaliP(R(12), R(3, 4))), "9", "luar: pemeriksaan 12 x 3/4 = 9");
  sama(teksP(bagiP(R(4), R(3, 5))), "20/3", "luar: 4 : 3/5 = 20/3 = 6 2/3");
  sama(teksP(bagiP(R(2, 3), R(4))), "1/6", "luar: beras 2/3 : 4 = 1/6");
  sama(teksP(kaliP(R(1, 6), R(4))), "2/3", "luar: pemeriksaan 1/6 x 4 = 2/3");
  sama(teksP(bagiP(R(3), R(3, 4))), "4", "luar: 3 : 3/4 = 4 kali pengurangan");
  { let sisa = R(3); let kali = 0; while (sisa.n > 0n) { sisa = kurangP(sisa, R(3, 4)); kali += 1; } sama(kali, 4, "luar: 3 dikurangi 3/4 berulang habis dalam 4 kali"); }
  sama(teksP(bagiP(R(4), R(3, 8))), "32/3", "luar: 4 : 3/8 = 32/3 = 10 2/3");
  sama(teksP(kurangP(R(4), kaliP(R(10), R(3, 8)))), "1/4", "luar: sisa sirup 4 - 10 x 3/8 = 1/4 liter");
  sama(teksP(bagiP(R(1, 4), R(3, 8))), "2/3", "luar: sisa 1/4 liter sama dengan 2/3 botol");
  sama(teksP(kurangP(R(32, 8), R(30, 8))), "1/4", "luar: 32/8 - 30/8 = 2/8 = 1/4");
  // kunci umum: a : b/c = a x c/b
  for (const [a, b, c] of [[3, 4, 1], [3, 5, 2], [6, 4, 3], [9, 4, 3]]) sama(bagiP(R(a), R(c, b)), kaliP(R(a), R(b, c)), `${a} : ${c}/${b} sama dengan ${a} x ${b}/${c}`);
  // Semua persamaan yang tampak di gambar: periksa aritmetikanya satu per satu.
  let cacah = 0;
  for (const v of VIDEO) for (const a of v.adegan) a.ketukan.forEach((kt, i) => {
    for (const t0 of L.teksTerlihat(L.keadaanStory(a, i, 9999))) {
      let t = t0.replace(/^(?:[abc]\. |cek: |atas: |bawah: |adik \d: |tiap pihak: |tiap anak: )/, "").replace(/^= /, "");
      t = t.replace(/( (?:kg|meter|liter|botol|potong|gelas|petak|kali|batang|teman|kue bolu|bagian tanah|batang cokelat))+$/, "");
      if (!t.includes("=") || !/^[\d\s/÷×−()½=]+$/.test(t)) continue;
      const sisi = t.split(" = ").map((s) => s.trim());
      const nilai = sisi.map((s) => hitung(s));
      cacah += 1;
      cek(nilai.every((n) => n !== null), `${a.id}: persamaan di gambar bisa dihitung "${t0}"`);
      if (nilai.every((n) => n !== null)) cek(nilai.every((n) => samaP(n, nilai[0])), `${a.id}: persamaan di gambar "${t0}" benar (${nilai.map(teksP).join(" | ")})`);
    }
  });
  cek(cacah >= 40, `persamaan di gambar yang diperiksa mandiri (${cacah})`);
}

/* ------------------------------ Kutipan buku (bila PDF tersedia) ------------------------------ */
{
  const pdf = new URL("../bahan-sd/Matematika-BS-KLS-VI.pdf", import.meta.url);
  const ada = existsSync(pdf);
  const cobaPdf = ada ? spawnSync("pdftotext", ["-f", "29", "-l", "43", "-raw", pdf.pathname.replace(/^\/([A-Za-z]:)/, "$1"), "-"], { encoding: "utf8", maxBuffer: 1 << 26 }) : null;
  if (!ada || !cobaPdf || cobaPdf.status !== 0) console.log("PDF atau pdftotext tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const buku = bersih(cobaPdf.stdout);
    let n = 0;
    for (const a of V.VIDEO_MATERI_K6B1B.adegan) for (const kt of a.kutipan ?? []) {
      n += 1;
      cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
    }
    cek(n >= 50, `jumlah kutipan buku yang diperiksa (${n})`);
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k6b1b-.*)\.(ts|tsx)$/.test(f));
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
    // larangan berbagi visual: berkas k6b1b hanya mengimpor logika dan berkas k6b1b sendiri
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|k6b1b-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k6b1b sendiri (${impor.join(", ")})`);
  }
  // mesin tidak memakai kit visual lama
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k6b1b.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_A61|SUB_B61|naskah-k6b1/.test(pembungkus) && /VIDEO_MATERI_K6B1B/.test(pembungkus) && /VIDEO_LUAR_K6B1B/.test(pembungkus) && /export function VideoK6B1B/.test(pembungkus), "video-k6b1b: memakai dua video baru, bukan naskah dan visual lama");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
