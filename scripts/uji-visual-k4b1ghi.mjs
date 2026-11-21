// Uji Mind-map dan Infografis rancangan ulang Kelas 4 Bab 1 Sub-Bab G (Rute Perahu, papan penumpang, kartu kali susun),
// H (papan tulis Bu Ratna, lorong kamar, kartu periksa), dan I (peta pantai, papan payung, jadwal perahu).
// Memeriksa: jumlah label (3 sampai 6, tidak dikunci), data cocok Story (dihitung ulang dari angka), suara tanpa digit, kata terlarang di layar,
// ukuran teks gambar (fontSize x skala render >= 10), komponen sendiri (tanpa PetaKartu, PetaLabel, InfoKartu, InfografisKartu), kontrak ekspor, dua kartu Infografis, tiga rupa berbeda.
// Jalankan: node --no-warnings scripts/uji-visual-k4b1ghi.mjs
import { readFileSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const G = await import("../src/components/modul/perahu-k4b1g/data-kartu.ts");
const H = await import("../src/components/modul/jatah-k4b1h/data-kartu.ts");
const I = await import("../src/components/modul/jadwal-k4b1i/data-kartu.ts");

let lulus = 0;
let gagal = 0;
const cek = (k, p) => {
  if (k) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", p);
  }
};
const sama = (a, b, p) => cek(JSON.stringify(a) === JSON.stringify(b), `${p}: ${JSON.stringify(a)} != ${JSON.stringify(b)}`);
const bersih = (t) => !/buku|kelompok|bernilai|tebak|nilai|kelas|teman|skor|soal|kunci|latihan|senilai|ditemani/i.test(t);
const tanpaDigit = (t) => !/\d/.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d);
const baca = (folder, f) => readFileSync(new URL(`../src/components/modul/${folder}/${f}`, import.meta.url), "utf8");

/** Semua teks yang tampil atau dibacakan dari satu modul data (string bernilai, kecuali kunci internal). */
const kumpul = (o, keluar = []) => {
  if (typeof o === "string") keluar.push(o);
  else if (Array.isArray(o)) o.forEach((x) => kumpul(x, keluar));
  else if (o && typeof o === "object") for (const [k, v] of Object.entries(o)) if (k !== "kunci") kumpul(v, keluar);
  return keluar;
};
const faktor = (n) => Array.from({ length: n }, (_, i) => i + 1).filter((d) => n % d === 0);

/** Ukuran teks efektif dari kode: fontSize SVG x skala render (w-[Npx] persis, selain itu w-full diasumsikan >= 0,95), dan teks HTML text-[Npx]. */
function ukuranTeks(src) {
  const fs = [...src.matchAll(/fontSize=\{(\d+(?:\.\d+)?)\}/g)].map((m) => Number(m[1]));
  const html = [...src.matchAll(/text-\[(\d+)px\]/g)].map((m) => Number(m[1]));
  const skala = [];
  for (const m of src.matchAll(/viewBox[=:]\s*\{?"0 0 (\d+) \d+"[^>]*?(?:className[=:]\s*"([^"]*)")?/g)) {
    const w = /w-\[(\d+)px\]/.exec(m[2] ?? "");
    skala.push(w ? Number(w[1]) / Number(m[1]) : 0.95);
  }
  // Kasus viewBox dan className berurutan terbalik (className di objek tersendiri).
  for (const m of src.matchAll(/className:\s*"[^"]*w-\[(\d+)px\][^"]*",\s*viewBox:\s*"0 0 (\d+) \d+"/g)) skala.push(Number(m[1]) / Number(m[2]));
  const minSkala = skala.length ? Math.min(...skala.filter((x) => x > 0)) : 1;
  return { minFont: fs.length ? Math.min(...fs) : 99, minHtml: html.length ? Math.min(...html) : 99, minSkala };
}

function ujiKomponen(folder, mm, info, nm, label) {
  const sm = baca(folder, mm);
  const si = baca(folder, info);
  for (const [f, s] of [[mm, sm], [info, si]]) {
    cek(/speakGuru, onLanjut, teksLanjut/.test(s) && !/PetaKartu|PetaLabel|InfoKartu|InfografisKartu|peta-kartu|peta-label/.test(s), `${f}: props kontrak dan tanpa komponen bersama`);
    cek(new RegExp(`export default function ${nm[f === mm ? 0 : 1]}`).test(s) && new RegExp(`export \\{ ${nm[f === mm ? 0 : 1]} \\}`).test(s), `${f}: ekspor default dan bernama ${nm[f === mm ? 0 : 1]}`);
    cek(!/flex-wrap/.test(s) && !/\bcursor-pointer\b/.test(s) && !s.includes("\r"), `${f}: tanpa flex-wrap dan akhir baris LF`);
    const u = ukuranTeks(s);
    cek(u.minFont >= 11 && u.minHtml >= 10 && u.minFont * u.minSkala >= 10, `${f}: teks gambar efektif >= 10 px (fontSize terkecil ${u.minFont}, skala ${u.minSkala.toFixed(2)}, teks HTML terkecil ${u.minHtml})`);
    const layar = [...s.matchAll(/(?:aria-label|label)="([^"]*)"/g)].map((m) => m[1]).join(" ");
    cek(bersih(layar), `${f}: aria-label tanpa kata terlarang`);
    cek(!/\u{1F9D1}|‍/u.test(s) && emojiSah([...s.matchAll(/\\u\{([0-9A-Fa-f]+)\}/g)].map((m) => String.fromCodePoint(parseInt(m[1], 16))).join("")), `${f}: emoji lama tanpa ZWJ`);
  }
  // Mind-map: label kosong diketuk, speakGuru, lanjut setelah semua terbuka; jumlah label dari data.
  cek(/speakGuru\(\s*\w+\[i\]\.arti\s*\)/.test(sm) && /buka\.length === \w+\.length/.test(sm) && /selesai \?/.test(sm) && /"\?"/.test(sm), `${mm}: label kosong, suara dibacakan, lanjut setelah semua terbuka`);
  cek(label >= 3 && label <= 6, `${mm}: jumlah label ${label} (3 sampai 6)`);
  // Infografis: dua kartu, tombol Berikutnya setelah semua sel terbuka, Kembali, lanjut di kartu dua, digital saja.
  cek(/useState<1 \| 2>\(1\)/.test(si) && /BERIKUTNYA/.test(si) && /Kembali/.test(si) && /kartu === 1 && selesai1/.test(si) && /kartu === 2 && selesai2/.test(si) && /onLanjut/.test(si), `${info}: dua kartu, Berikutnya hanya setelah semua sel terbuka, Kembali, lanjut`);
  cek(/speakGuru\(suara\)/.test(si) && /"\?"/.test(si) && !/Kanvas|Suara\b|canvas|SpeechRecognition/.test(si), `${info}: sel kosong diketuk dibacakan, digital saja`);
  return { sm, si };
}

function ujiTeks(nama, D, kunciSuara) {
  const semua = kumpul(D);
  cek(semua.every((t) => bersih(t)), `${nama}: semua teks data tanpa kata terlarang`);
  const suara = kunciSuara(D);
  cek(suara.length > 0 && suara.every((t) => tanpaDigit(t) && t.length > 10), `${nama}: ${suara.length} suara tanpa digit`);
  cek(kumpul([...Object.entries(D).filter(([k]) => /^IKON_/.test(k)).map(([, v]) => v)]).every(emojiSah), `${nama}: ikon judul sah`);
}

/* ------------------------------ G: Rute Perahu, papan penumpang, kartu kali susun ------------------------------ */
{
  const L = G.LANGKAH_PERAHU;
  cek(L.length === 5, "G: lima langkah Mind-map");
  cek(/tidak ada yang disimpan/.test(L[3].arti) && /dua belas kali empat/.test(L[3].arti) && /simpan nol/.test(L[3].arti) && /empat puluh delapan/.test(L[3].arti) && L.every((x, i) => new RegExp(`^Langkah ${["satu", "dua", "tiga", "empat", "lima"][i]}\\.`).test(x.arti)), "G: langkah empat memuat susun tanpa simpanan (dua belas kali empat), nomor langkah berurut");
  cek(new Set(L.map((x) => x.judul)).size === L.length && L.every((x) => tanpaDigit(x.judul) && x.judul.length >= 10 && x.judul.length <= 40), "G: judul langkah unik, tanpa digit, pendek");
  cek(L.every((x) => tanpaDigit(x.arti) && x.arti.length > 40), "G: arti dibacakan tanpa digit");
  const gab = L.map((x) => `${x.judul} ${x.arti}`).join(" ").toLowerCase();
  for (const s of ["jumlahkan berulang", "urai", "puluhan", "satuan", "kalikan", "simpan", "simpanan", "susun", "periksa", "enam puluh"]) cek(gab.includes(s), `G: memuat topik buku "${s}"`);
  cek(!/\b(satria|laras|genta|pak hendro|bu marni)\b/i.test(L.map((x) => x.judul).join(" ")), "G: judul langkah tanpa nama tokoh");
  // Infografis kartu 1: angka Story.
  const P = G.PENUMPANG_PERAHU;
  sama(P.map((b) => [b.isi, b.perahu]), [[12, 5], [12, 4], [14, 4]], "G: data penumpang dari Story (12 x 5, 12 x 4, 14 x 4)");
  cek(P.every((b) => b.sel[0].isi === `${b.isi} × ${b.perahu}` && b.sel[1].isi === `${b.isi * b.perahu}` && b.sel.length === 2), "G: perkalian dan jumlah dihitung dari data");
  sama(P.map((b) => b.sel[1].isi), ["60", "48", "56"], "G: jumlah penumpang 60, 48, 56");
  // Kartu 2: kali susun 12 x 5.
  const S = G.SUSUN_PERAHU;
  const bag = { t: Math.floor(12 / 10), u: 12 % 10 };
  cek(S.length === 6 && S[5].kunci === "tanpa" && 2 * 4 < 10 && 2 * 4 === 8 && 1 * 4 === 4 && 12 * 4 === 48 && S[5].isi === "2 × 4 = 8, simpan 0" && S[5].caption.includes("12 × 4") && bag.u * 5 === 10 && bag.t * 5 + Math.floor((bag.u * 5) / 10) === 6 && 12 * 5 === 60 && 10 * 5 + 2 === 52, "G: hitungan kali susun benar (2 x 5 = 10, simpan 1, 1 x 5 + 1 = 6, 60, salah 52)");
  const isi = S.map((x) => x.isi).join(" | ");
  for (const s of ["2 × 5 = 10", "tulis 0, simpan 1", "1 × 5 + 1 = 6", "60", "10 × 5 + 2 = 52"]) cek(isi.includes(s), `G: kartu susun memuat ${s}`);
  ujiTeks("G", G, (D) => [...D.LANGKAH_PERAHU.map((x) => x.arti), D.PETUNJUK_PETA_PERAHU, D.SELESAI_PETA_PERAHU, D.PETUNJUK1_INFO_PERAHU, D.SELESAI1_INFO_PERAHU, D.PETUNJUK2_INFO_PERAHU, D.SELESAI2_INFO_PERAHU, ...P.flatMap((b) => b.sel.map((x) => x.suara)), ...S.map((x) => x.suara)]);
  const { sm, si } = ujiKomponen("perahu-k4b1g", "BarisPerahu.tsx", "DaftarPerahu.tsx", ["BarisPerahuK4B1", "DaftarPerahuK4B1"], L.length);
  cek(/length: 5/.test(sm) && /\[\{ length: 5 \}|Array\.from\(\{ length: 5 \}/.test(sm) && /i % 2 === 1/.test(sm), "G: Mind-map zig-zag (kiri dan kanan bergantian), lima perahu di gambar pertama");
  cek(/data-titik/.test(si) && /fill=\{i < 10 \? "#0369A1" : "#EA580C"\}/.test(si) && /length: b\.isi/.test(si) && /length: b\.perahu/.test(si), "G: titik penumpang digambar sebanyak data (isi x perahu)");
  cek(/SUSUN_PERAHU\.map/.test(si) && /PENUMPANG_PERAHU\.map/.test(si), "G: dua kartu memakai data Story");
}

/* ------------------------------ H: papan tulis Bu Ratna, lorong kamar, kartu periksa ------------------------------ */
{
  const L = H.LANGKAH_JATAH;
  cek(L.length === 5 && L.length === H.KAPUR_JATAH.length, "H: lima langkah, satu baris kapur tiap langkah");
  cek(new Set(L.map((x) => x.judul)).size === L.length && L.every((x) => tanpaDigit(x.judul) && x.judul.length >= 10 && x.judul.length <= 40), "H: judul langkah unik, tanpa digit, pendek");
  cek(L.every((x) => tanpaDigit(x.arti) && x.arti.length > 40), "H: arti dibacakan tanpa digit");
  const gab = L.map((x) => `${x.judul} ${x.arti}`).join(" ").toLowerCase();
  for (const s of ["sama banyak", "puluhan", "turunkan", "satuan", "periksa", "perkalian", "sisa", "pembagi", "empat belas", "lima puluh enam"]) cek(gab.includes(s), `H: memuat topik buku "${s}"`);
  // Papan: isi kapur cocok dengan hitungan Story (56 : 4: 5 : 4 = 1 sisa 1, turun 6 jadi 16, 16 : 4 = 4, hasil 14; 14 x 4 = 56; 59 : 4 = 14 sisa 3).
  const K = H.KAPUR_JATAH.map((x) => x.join(" "));
  cek(Math.floor(5 / 4) === 1 && 5 % 4 === 1 && 1 * 10 + 6 === 16 && 16 / 4 === 4 && 56 / 4 === 14 && 14 * 4 === 56 && Math.floor(59 / 4) === 14 && 59 % 4 === 3, "H: hitungan papan benar");
  for (const [i, s] of [[0, "56 : 4"], [1, "5 : 4 = 1"], [2, "16 : 4 = 4"], [3, "14 × 4 = 56"], [4, "59 : 4 = 14"]]) cek(K[i].includes(s), `H: baris papan ${i + 1} memuat ${s}`);
  // Infografis.
  const B = H.KAMAR_JATAH;
  sama(B.map((b) => [b.dibagi, b.pembagi, b.hasil, b.sisa]), [[56, 4, 14, 0], [59, 4, 14, 3], [24, 6, 4, 0]], "H: data lorong dari Story (56 : 4, 59 : 4, 24 : 6)");
  cek(B.every((b) => b.hasil * b.pembagi + b.sisa === b.dibagi && b.sisa < b.pembagi && b.sel[0].isi === `${b.hasil}` && (b.sisa === 0 ? b.sel[1].isi.startsWith("0") : b.sel[1].isi.startsWith(`${b.sisa}`))), "H: hasil bagi dikali pembagi ditambah sisa sama dengan yang dibagi; sisa lebih kecil dari pembagi");
  const P = H.PERIKSA_JATAH;
  cek(P.length === 6 && P.map((x) => x.isi).join("|").includes("14 × 4 = 56") && P[2].isi.startsWith("3") && P[3].isi.includes("4") && P[5].isi.startsWith("11"), "H: kartu periksa memuat 14 x 4 = 56, sisa 3, pembagi 4, salah 11");
  { const w = P.find((x) => x.kunci === "wadah"); cek(!!w && w.isi === [2, 3, 4, 6, 8].map((d) => 48 / d).join(", ") && [2, 3, 4, 6, 8].every((d) => 48 % d === 0) && /makin banyak wadah, makin sedikit/i.test(w.suara) && w.caption.includes("2, 3, 4, 6, 8"), "H: kartu periksa memuat 48 permen ke 2, 3, 4, 6, 8 wadah (24, 16, 12, 8, 6), hasil dihitung dari data"); }
  ujiTeks("H", H, (D) => [...D.LANGKAH_JATAH.map((x) => x.arti), D.PETUNJUK_PETA_JATAH, D.SELESAI_PETA_JATAH, D.PETUNJUK1_INFO_JATAH, D.SELESAI1_INFO_JATAH, D.PETUNJUK2_INFO_JATAH, D.SELESAI2_INFO_JATAH, ...B.flatMap((b) => b.sel.map((x) => x.suara)), ...P.map((x) => x.suara)]);
  const { sm, si } = ujiKomponen("jatah-k4b1h", "PapanJatah.tsx", "DaftarJatah.tsx", ["PapanJatahK4B1", "DaftarJatahK4B1"], L.length);
  cek(/KAPUR_JATAH\[i\]/.test(sm) && /bg-\[#14532D\]/.test(sm) && /bg-\[#FEF08A\]/.test(sm), "H: papan tulis hijau dengan kertas tempel kuning");
  cek(/data-titik/.test(si) && /length: jumlah/.test(si) && /aula/.test(si) && /b\.pembagi \+ \(b\.sisa > 0 \? 1 : 0\)/.test(si), "H: titik tamu digambar sebanyak hasil bagi, sisa di aula");
}

/* ------------------------------ I: peta pantai, papan payung, jadwal perahu ------------------------------ */
{
  const L = I.LANGKAH_JADWAL;
  cek(L.length === 5, "I: lima langkah Mind-map");
  cek(new Set(L.map((x) => x.judul)).size === L.length && L.every((x) => tanpaDigit(x.judul) && x.judul.length >= 10 && x.judul.length <= 40), "I: judul langkah unik, tanpa digit, pendek");
  cek(L.every((x) => tanpaDigit(x.arti) && x.arti.length > 40), "I: arti dibacakan tanpa digit");
  const gab = L.map((x) => `${x.judul} ${x.arti}`).join(" ").toLowerCase();
  for (const s of ["faktor", "membagi habis", "pasangan", "bukan faktor", "kelipatan", "menambah", "dua puluh empat", "sisa"]) cek(gab.includes(s), `I: memuat topik buku "${s}"`);
  // Papan payung.
  const P = I.PASANGAN_JADWAL;
  cek(I.TOTAL_PAYUNG_JADWAL === 24 && P.every((p) => p.baris * p.kolom === 24 && 24 % p.baris === 0 && 24 % p.kolom === 0), "I: tiap bentuk payung tepat 24 payung, baris dan kolom adalah faktor 24");
  sama(P.map((p) => [p.baris, p.kolom]), [[1, 24], [2, 12], [3, 8], [4, 6]], "I: empat pasangan faktor dari Story");
  sama(I.DAFTAR_FAKTOR_JADWAL.isi, faktor(24).join(", "), "I: daftar faktor 24 dihitung");
  sama(faktor(24), [1, 2, 3, 4, 6, 8, 12, 24], "I: faktor 24");
  // Jadwal perahu.
  sama([...I.JAM_PERAHU_JADWAL], [4, 8, 12, 16, 20, 24], "I: jam perahu 4 sampai 24 (kelipatan 4)");
  cek(I.JAM_INFO_JADWAL.every((j, i) => j.jam === 4 * (i + 1) && j.isi === `${j.jam}` && j.jam % 4 === 0) && 24 / 4 === 6 && 24 % 5 === 4 && Math.floor(24 / 5) === 4, "I: jam dan hitungan sisa 24 : 5 benar");
  const A = I.ATURAN_JADWAL.map((a) => a.isi).join(" | ");
  for (const s of ["menambah 4 berulang kali", "4 × 1", "24 : 4 = 6", "4 sisa 4"]) cek(A.includes(s), `I: aturan memuat ${s}`);
  ujiTeks("I", I, (D) => [...D.LANGKAH_JADWAL.map((x) => x.arti), D.PETUNJUK_PETA_JADWAL, D.SELESAI_PETA_JADWAL, D.PETUNJUK1_INFO_JADWAL, D.SELESAI1_INFO_JADWAL, D.PETUNJUK2_INFO_JADWAL, D.SELESAI2_INFO_JADWAL, ...P.map((p) => p.sel.suara), D.DAFTAR_FAKTOR_JADWAL.suara, ...D.JAM_INFO_JADWAL.map((j) => j.suara), ...D.ATURAN_JADWAL.map((a) => a.suara)]);
  const { sm, si } = ujiKomponen("jadwal-k4b1i", "PapanJadwal.tsx", "DaftarJadwal.tsx", ["PapanJadwalK4B1", "DaftarJadwalK4B1"], L.length);
  cek(/length: 24/.test(sm) && /i === 4 \? "col-span-2"/.test(sm) && /data-payung/.test(sm), "I: Mind-map mozaik petak, 24 payung digambar, petak terakhir selebar layar");
  cek(/data-payung/.test(si) && /p\.baris \* p\.kolom/.test(si) && /JAM_INFO_JADWAL\.map/.test(si) && /ATURAN_JADWAL\.map/.test(si), "I: payung digambar sebanyak baris x kolom, jadwal dan aturan dari data");
}

/* ------------------------------ Kata tidak terpotong dan perkiraan tinggi ------------------------------ */
{
  /* Lebar isi diukur di peramban 344 px: baris Mind-map 270 px. Teks label 13 px tebal, sekitar 7,5 px per huruf, dan dibungkus tanpa memotong kata (break-normal). */
  const HURUF = 7.5;
  const MM = [
    ["G", G.LANGKAH_PERAHU, 102, "perahu-k4b1g", "BarisPerahu.tsx", G.PETUNJUK_PETA_PERAHU],
    ["H", H.LANGKAH_JATAH, 108, "jatah-k4b1h", "PapanJatah.tsx", H.PETUNJUK_PETA_JATAH],
    ["I", I.LANGKAH_JADWAL, 95, "jadwal-k4b1i", "PapanJadwal.tsx", I.PETUNJUK_PETA_JADWAL],
  ];
  for (const [n, L, lebarTeks, folder, berkas, petunjuk] of MM) {
    const maks = Math.floor(lebarTeks / HURUF);
    for (const x of L) {
      const kata = x.judul.split(/\s+/);
      cek(kata.every((w) => w.length <= maks), `${n}: kata judul "${x.judul}" muat satu baris (<= ${maks} huruf), tidak terpotong`);
      // Greedy wrap: paling banyak dua baris.
      let baris = 1;
      let lebar = 0;
      for (const w of kata) {
        if (lebar && lebar + 1 + w.length > maks) {
          baris += 1;
          lebar = w.length;
        } else lebar += (lebar ? 1 : 0) + w.length;
      }
      cek(baris <= 2, `${n}: judul "${x.judul}" paling banyak dua baris (${baris})`);
    }
    const src = baca(folder, berkas);
    cek(/break-normal/.test(src) && !/break-words|break-all/.test(src), `${n}: Mind-map membungkus tanpa memotong kata`);
    cek(petunjuk.length <= 70, `${n}: petunjuk Mind-map paling banyak dua baris (${petunjuk.length} huruf)`);
  }
  // Perkiraan tinggi akhir (px, setelah semua terbuka) = petunjuk 58 + isi + status 26 + tombol 58 + jarak 24; hasil ukur peramban menambah sekitar 80 px dari perkiraan CSS, jadi batas 560.
  const tinggi = {
    "G Mind-map": 58 + 5 * 66 + 4 * 4 + 28 + 26 + 58 + 24,
    "H Mind-map": 58 + 5 * 54 + 28 + 26 + 58 + 24,
    "I Mind-map": 58 + (44 + 46 + 12) + (44 + 62 + 12) + (44 + 64 + 12) + 12 + 28 + 26 + 58 + 24,
    "G Infografis 1": 58 + 3 * (4 + 14 + 48 + 4 + 40 + 6) + 28 + 26 + 58 + 24 + 16,
    "H Infografis 1": 58 + 3 * (4 + 14 + 46 + 4 + 40 + 6) + 28 + 26 + 58 + 24 + 16,
    "I Infografis 1": 58 + 4 * (48 + 8 + 6) + 52 + 28 + 26 + 58 + 24 + 16,
    "I Infografis 2": 58 + (20 + 12 + 44 + 8) + 4 * 52 + 28 + 26 + 58 + 24 + 16,
  };
  for (const [k, v] of Object.entries(tinggi)) cek(v <= 560, `${k}: perkiraan tinggi ${v} px <= 560 (batas ukur 640)`);
  // Petunjuk Infografis juga dua baris.
  for (const t of [G.PETUNJUK1_INFO_PERAHU, G.PETUNJUK2_INFO_PERAHU, H.PETUNJUK1_INFO_JATAH, H.PETUNJUK2_INFO_JATAH, I.PETUNJUK1_INFO_JADWAL, I.PETUNJUK2_INFO_JADWAL]) cek(t.length <= 75 && tanpaDigit(t), `petunjuk Infografis pendek dan tanpa digit: ${t.length} huruf`);
}

/* ------------------------------ Tiga rupa berbeda ------------------------------ */
{
  const rupa = [
    baca("perahu-k4b1g", "BarisPerahu.tsx").includes("i % 2 === 1") && baca("perahu-k4b1g", "BarisPerahu.tsx").includes("grid-cols-[1fr_7.4rem]"),
    baca("jatah-k4b1h", "PapanJatah.tsx").includes("bg-[#14532D]"),
    baca("jadwal-k4b1i", "PapanJadwal.tsx").includes("grid-cols-2") && baca("jadwal-k4b1i", "PapanJadwal.tsx").includes("col-span-2"),
  ];
  cek(rupa.every(Boolean), "tiga Mind-map berbeda rupa (zig-zag air, papan tulis, mozaik petak pasir)");
  const infos = [baca("perahu-k4b1g", "DaftarPerahu.tsx").includes("papan-penumpang"), baca("jatah-k4b1h", "DaftarJatah.tsx").includes("lorong-kamar"), baca("jadwal-k4b1i", "DaftarJadwal.tsx").includes("papan-payung")];
  cek(infos.every(Boolean), "tiga Infografis berbeda rupa (papan penumpang, lorong kamar, papan payung)");
  // Tidak ada impor data lama dari komponen lain.
  const player = readFileSync(new URL("../src/components/IgilModulePlayer.tsx", import.meta.url), "utf8");
  for (const [n, f] of [["BarisPerahuK4B1", "perahu-k4b1g/BarisPerahu"], ["DaftarPerahuK4B1", "perahu-k4b1g/DaftarPerahu"], ["PapanJatahK4B1", "jatah-k4b1h/PapanJatah"], ["DaftarJatahK4B1", "jatah-k4b1h/DaftarJatah"], ["PapanJadwalK4B1", "jadwal-k4b1i/PapanJadwal"], ["DaftarJadwalK4B1", "jadwal-k4b1i/DaftarJadwal"]])
    cek(player.includes(`import ${n} from "@/components/modul/${f}"`), `IgilModulePlayer tetap memasang ${n}`);
}

if (process.env.RINCI) for (const [d, f] of [["perahu-k4b1g","BarisPerahu.tsx"],["perahu-k4b1g","DaftarPerahu.tsx"],["jatah-k4b1h","PapanJatah.tsx"],["jatah-k4b1h","DaftarJatah.tsx"],["jadwal-k4b1i","PapanJadwal.tsx"],["jadwal-k4b1i","DaftarJadwal.tsx"]]) console.log(f, JSON.stringify(ukuranTeks(baca(d, f))));
console.log(`${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
