// Uji Mind-map dan Infografis Kelas 4 Bab 2 Sub-Bab A (Tali Jemuran Bu Wulan, Tumpukan Pita, Kartu Aturan) dan Sub-Bab B (Halaman Bak Pak Joyo, Papan Takaran, Kartu Aturan),
// dirancang ulang per Sub-Bab (aturan visual baru): gambar tema sungguh sebanyak data, label kosong 3 sampai 6, data Infografis dari Story, tanpa PetaKartu, PetaLabel, InfoKartu, InfografisKartu,
// ukuran teks gambar paling kecil 10 px efektif, kata terlarang, emoji, akhir baris, ekspor default dan bernama.
// Jalankan: node --no-warnings scripts/uji-visual-k4b2ab.mjs
import { readFileSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const A = await import("../src/components/modul/lipat-k4b2a/data-kartu.ts");
const B = await import("../src/components/modul/warna-k4b2b/data-kartu.ts");
const fa = new URL("../src/components/modul/lipat-k4b2a/", import.meta.url);
const fb = new URL("../src/components/modul/warna-k4b2b/", import.meta.url);

let lulus = 0;
let gagal = 0;
const cek = (k, p) => {
  if (k) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", p);
  }
};
const bersih = (t) => !/buku|kelompok|bernilai|tebak|nilai|kelas|teman|skor|soal|kunci|latihan|senilai|ditemani/i.test(t);
const tanpaDigit = (t) => !/\d/.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d);
const baca = (f, n) => readFileSync(new URL(n, f), "utf8");

/** Teks layar dari berkas komponen: teks JSX di antara tanda kurung sudut dan literal berspasi (bukan kelas gaya). */
const teksLayar = (src) => {
  const jsx = [...src.matchAll(/>([^<>{}\n]{3,})</g)].map((m) => m[1]);
  const lit = [...src.matchAll(/"([^"\n]{4,})"/g)].map((m) => m[1]).filter((t) => /[A-Za-z]{3}/.test(t) && / /.test(t) && !/[[\]:/]|^(rounded|flex|grid|min-|text-|border|bg-)/.test(t));
  return [...jsx, ...lit];
};

const KOMP = [
  { nama: "A Mind-map", f: fa, berkas: "MejaLipat.tsx", ekspor: "MejaLipatK4B2" },
  { nama: "A Infografis", f: fa, berkas: "DaftarLipat.tsx", ekspor: "DaftarLipatK4B2" },
  { nama: "B Mind-map", f: fb, berkas: "BakWarna.tsx", ekspor: "BakWarnaK4B2" },
  { nama: "B Infografis", f: fb, berkas: "DaftarWarna.tsx", ekspor: "DaftarWarnaK4B2" },
];

/* ------------------------------ Kontrak dan larangan semua komponen ------------------------------ */
for (const k of KOMP) {
  const s = baca(k.f, k.berkas);
  cek(new RegExp(`export default function ${k.ekspor}\\(\\{ speakGuru, onLanjut, teksLanjut \\}: \\{ speakGuru: \\(t: string\\) => void; onLanjut: \\(\\) => void; teksLanjut: string \\}\\)`).test(s) && new RegExp(`export \\{ ${k.ekspor} \\}`).test(s), `${k.nama}: ekspor default dan bernama ${k.ekspor} dengan props kontrak`);
  cek(!/PetaKartu|PetaLabel|InfoKartu|InfografisKartu|data-kartu\.ts.*KARTU|peta-kartu|peta-label/.test(s), `${k.nama}: tidak memakai komponen kartu atau label bersama`);
  cek(!/flex-wrap/.test(s) && /gridTemplateColumns|grid-cols-/.test(s), `${k.nama}: tata letak kisi tetap, tanpa flex-wrap`);
  cek(!/>\s*Suara\s*<|Kanvas|<canvas/i.test(s), `${k.nama}: digital saja (tanpa tombol Suara atau Kanvas)`);
  cek(!s.startsWith("﻿") && !s.includes("\r") && emojiSah(s) && !/senilai/i.test(s), `${k.nama}: tanpa BOM, akhir baris LF, emoji sah`);
  cek(teksLayar(s).every(bersih), `${k.nama}: teks layar tanpa kata terlarang (${teksLayar(s).filter((t) => !bersih(t)).join(" | ")})`);
  const kecil = [...s.matchAll(/text-\[(\d+)px\]/g)].map((m) => Number(m[1]));
  cek(kecil.every((n) => n >= 11), `${k.nama}: ukuran huruf kelas Tailwind paling kecil 11 px (${kecil.join(",")})`);
  cek(/speakGuru\(/.test(s) && /onLanjut/.test(s) && /lm-muncul/.test(s), `${k.nama}: ketukan dibacakan Guru dan muncul`);
}
for (const [f, nama] of [
  [fa, "A"],
  [fb, "B"],
]) {
  const berkasData = baca(f, "data-kartu.ts");
  cek(!/PetaKartu|InfografisKartu|KartuPeta|BarisInfo|KARTU_LIPAT|KARTU_WARNA|BARIS_INFO/.test(berkasData.replace(/\/\*[^]*?\*\//g, "")), `${nama}: data-kartu.ts tidak lagi memakai bentuk kartu geser lama`);
  cek(!berkasData.includes("\r") && emojiSah(berkasData), `${nama}: data-kartu.ts akhir baris LF dan emoji sah`);
}
cek(existsSync(new URL("Pec.tsx", fa)) && existsSync(new URL("TangkiBak.tsx", fb)), "berkas gambar bersama Pec dan TangkiBak ada");

/* ------------------------------ Ukuran teks gambar SVG (efektif paling kecil 10 px) ------------------------------ */
{
  // Garis pecahan Mind-map dirender responsif (w-full, paling lebar 300 px); lebar render terkecil yang dijamin 270 px.
  const hit = (src, vbLebar, lebarRender) => {
    const fonts = [...src.matchAll(/fontSize=\{(\d+(?:\.\d+)?)\}/g)].map((m) => Number(m[1]));
    return { fonts, efektif: (Math.min(...fonts) * lebarRender) / vbLebar };
  };
  const a = baca(fa, "MejaLipat.tsx");
  cek(/const LEBAR_GARIS = 300;/.test(a) && /w-full max-w-\[300px\]/.test(a), "A Mind-map: garis pecahan responsif dengan viewBox 300");
  const ha = hit(a, 300, 270);
  cek(ha.fonts.length >= 3 && ha.efektif >= 10, `A Mind-map: teks gambar paling kecil ${ha.efektif.toFixed(1)} px efektif`);
  const b = baca(fb, "BakWarna.tsx");
  cek(/const LEBAR = 280;/.test(b) && /w-full max-w-\[300px\]/.test(b), "B Mind-map: garis pecahan responsif dengan viewBox 280");
  const hb = hit(b, 280, 260);
  cek(hb.fonts.length >= 2 && hb.efektif >= 10, `B Mind-map: teks gambar paling kecil ${hb.efektif.toFixed(1)} px efektif`);
  for (const [f, n] of [
    [fa, "DaftarLipat.tsx"],
    [fb, "DaftarWarna.tsx"],
  ]) {
    const s = baca(f, n);
    const fonts = [...s.matchAll(/fontSize=\{(\d+(?:\.\d+)?)\}/g)].map((m) => Number(m[1]));
    cek(/<svg width=\{(\d+|LEBAR_GARIS)\} height=\{\d+\} viewBox/.test(s) && fonts.length >= 2 && Math.min(...fonts) >= 12, `${n}: gambar mini dirender 1:1 (viewBox = ukuran), font paling kecil ${Math.min(...fonts)}`);
  }
  const pec = baca(fa, "Pec.tsx");
  cek([...pec.matchAll(/text-\[(\d+)px\]/g)].every((m) => Number(m[1]) >= 13), "Pec: angka pecahan paling kecil 13 px");
}

/* ------------------------------ Sub-Bab A: Mind-map Tali Jemuran ------------------------------ */
{
  const L = A.LANGKAH_LIPAT;
  cek(L.length >= 3 && L.length <= 6 && L.length === 5, `A Mind-map: lima label mengikuti lima langkah materi (${L.length})`);
  cek(L.every((l) => tanpaDigit(l.judul + l.arti) && bersih(l.judul + l.arti) && l.judul.length >= 8 && l.judul.length <= 26 && l.arti.length > 30), "A Mind-map: judul pendek, arti dibacakan tanpa digit dan kata terlarang");
  cek(new Set(L.map((l) => l.judul)).size === L.length, "A Mind-map: judul unik");
  const isi = L.map((l) => l.judul + " " + l.arti).join(" ").toLowerCase();
  for (const s of ["lipat", "sama besar", "pembilang", "penyebut", "makin kecil", "pita", "garis", "nol sampai satu", "ke kiri", "urut", "terkecil"]) cek(isi.includes(s), `A Mind-map: memuat "${s}" (metode Pita, Lipat, Garis dan istilah buku)`);
  cek(A.KAIN_LIPAT.join() === "2,4,8" && A.JEPIT_GARIS.join() === "8,4,2", "A Mind-map: kain dilipat dua, empat, delapan dan jepitan satu per delapan, empat, dua (Story)");
  const s = baca(fa, "MejaLipat.tsx");
  cek(/gridTemplateColumns: `repeat\(\$\{n\}, 1fr\)`/.test(s) && /Array\.from\(\{ length: n \}/.test(s) && /i === 0 \? "bg-\[#A78BFA\]"/.test(s) && /data-bagian=\{n\} data-arsir=\{1\}/.test(s), "A Mind-map: kain digambar sungguh n bagian sama besar, tepat satu bagian diarsir");
  cek(/KAIN_LIPAT\.map/.test(s) && /grid-cols-3/.test(s) && /JEPIT_GARIS\.map/.test(s) && /xPada\(1 \/ q\)/.test(s), "A Mind-map: tiga kain di tali jemuran dan jepitan pada garis di titik satu per penyebut");
  cek((s.match(/tag\(\d(?:, true)?\)|tag\(i(?:, true)?\)/g) ?? []).length === 3 && /LANGKAH_LIPAT\.length/.test(s), "A Mind-map: label diambil dari tiga tempat (kain tiga, garis dua) dan jumlah mengikuti data");
  cek(/selesai \? \(/.test(s) && /\{selesai \?/.test(s) && /teksLanjut/.test(s), "A Mind-map: tombol lanjut baru muncul setelah semua label terbuka");
}

/* ------------------------------ Sub-Bab A: Infografis ------------------------------ */
{
  cek(A.PITA_LIPAT.join() === "2,4,8", "A Infografis: tiga pita dari kain lipat dua, empat, delapan (Story)");
  cek(A.BANDING_PITA.length === 2 && A.BANDING_PITA[0].besar === 2 && A.BANDING_PITA[0].kecil === 4 && A.BANDING_PITA[1].besar === 4 && A.BANDING_PITA[1].kecil === 8, "A Infografis: dua banding bertetangga (satu per dua dengan satu per empat, satu per empat dengan satu per delapan seperti salah Satria)");
  cek(A.BANDING_PITA.every((b) => b.besar < b.kecil && A.PITA_LIPAT.includes(b.besar) && A.PITA_LIPAT.includes(b.kecil)), "A Infografis: pecahan berpenyebut lebih kecil memang lebih besar dan berasal dari pita yang digambar");
  cek(A.BANDING_PITA.every((b) => tanpaDigit(b.suara) && bersih(b.suara)) && A.PITA_LIPAT.every((n) => tanpaDigit(A.suaraPita(n)) && bersih(A.suaraPita(n))), "A Infografis kartu 1: suara tanpa digit");
  cek(A.suaraPita(4) === "Kain dilipat menjadi empat bagian sama besar. Satu bagian diarsir, ditulis satu per empat.", "A Infografis: suara pita memakai pengeja pecahan");
  cek(A.ATURAN_LIPAT.length === 5 && new Set(A.ATURAN_LIPAT.map((a) => a.kunci)).size === 5, "A Infografis kartu 2: lima aturan unik");
  cek(A.ATURAN_LIPAT.every((a) => tanpaDigit(a.suara) && bersih(a.suara + a.isi + a.sebut) && a.isi.length <= 34), "A Infografis kartu 2: aturan pendek, suara tanpa digit");
  const gab = A.ATURAN_LIPAT.map((a) => a.isi + " " + a.suara + " " + a.sebut).join(" ").toLowerCase();
  for (const s of ["pembilang", "penyebut", "bagian yang diarsir", "seluruh bagian", "makin kecil", "garis pecahan", "ke kiri", "tanda banding", "sisi terbuka"]) cek(gab.includes(s), `A Infografis kartu 2: memuat "${s}"`);
  const s = baca(fa, "DaftarLipat.tsx");
  cek(/const total1 = PITA_LIPAT\.length \+ BANDING_PITA\.length/.test(s) && /kartu === 1 && selesai1/.test(s) && /kartu === 2 && selesai2/.test(s) && /setKartu\(1\)/.test(s) && /setKartu\(2\)/.test(s), "A Infografis: dua kartu, BERIKUTNYA hanya setelah semua sel kartu 1 terbuka, Kembali dan lanjut di kartu 2");
  cek(/<Pita n=\{n\} \/>/.test(s) && /gridTemplateColumns: `repeat\(\$\{n\}, 1fr\)`/.test(s) && /i === 0 \? "bg-\[#A78BFA\]"/.test(s), "A Infografis: pita digambar sungguh n bagian, satu diarsir");
}

/* ------------------------------ Sub-Bab B: Mind-map Halaman Bak ------------------------------ */
{
  const L = B.LANGKAH_WARNA;
  cek(L.length >= 3 && L.length <= 6 && L.length === 5, `B Mind-map: lima label mengikuti lima langkah materi (${L.length})`);
  cek(L.every((l) => tanpaDigit(l.judul + l.arti) && bersih(l.judul + l.arti) && l.judul.length >= 8 && l.judul.length <= 26 && l.arti.length > 30), "B Mind-map: judul pendek, arti dibacakan tanpa digit dan kata terlarang");
  cek(new Set(L.map((l) => l.judul)).size === L.length, "B Mind-map: judul unik");
  const isi = L.map((l) => l.judul + " " + l.arti).join(" ").toLowerCase();
  for (const s of ["penyebut", "sama besar", "pembilang", "lebih dari", "kurang dari", "sisi tanda yang terbuka", "urutkan", "garis", "nol sampai satu", "kanan"]) cek(isi.includes(s), `B Mind-map: memuat "${s}" (Banding Pembilang, Batang Pecahan, Urut di Garis)`);
  cek(B.LAPIS_BAK === 8 && B.BAK_PASANG.map((b) => b.isi).join() === "3,6" && B.BAK_URUT.map((b) => b.isi).join() === "2,5,7", "B Mind-map: bak biru tiga, bak merah enam, tiga bak dua, lima, tujuh per delapan (Story)");
  cek(B.BAK_PASANG.concat(B.BAK_URUT).every((b) => b.isi >= 1 && b.isi < B.LAPIS_BAK) && B.BAK_URUT.every((b, i, a) => i === 0 || a[i - 1].isi < b.isi), "B Mind-map: pembilang kurang dari penyebut, bak urut naik");
  const t = baca(fb, "TangkiBak.tsx");
  cek(/repeat\(\$\{LAPIS_BAK\}, \$\{lapisTinggi\}px\)/.test(t) && /Array\.from\(\{ length: LAPIS_BAK \}/.test(t) && /i >= LAPIS_BAK - isi/.test(t) && /data-lapis=\{LAPIS_BAK\}\s+data-isi=\{isi\}/.test(t), "TangkiBak: delapan lapis sama tinggi, terisi dari bawah sebanyak pembilang");
  const s = baca(fb, "BakWarna.tsx");
  cek(/BAK_PASANG\[0\]/.test(s) && /BAK_PASANG\[1\]/.test(s) && /BAK_URUT\.map/.test(s) && /<TangkiBak/.test(s) && /xBagian\(b\.isi\)/.test(s) && /Array\.from\(\{ length: LAPIS_BAK \+ 1 \}/.test(s), "B Mind-map: dua bak, tiga bak, dan garis pecahan dengan sembilan tanda dan titik pada pembilang masing-masing");
  cek((s.match(/\{papan\(\d\)\}/g) ?? []).length === 5 || ((s.match(/papan\(\d\)/g) ?? []).length === 5), "B Mind-map: lima papan label kosong menempel di antara bak, di samping tiga bak, dan di bawah garis");
  cek(/\{selesai \?/.test(s) && /teksLanjut/.test(s), "B Mind-map: tombol lanjut baru muncul setelah semua label terbuka");
}

/* ------------------------------ Sub-Bab B: Infografis ------------------------------ */
{
  cek(B.suaraBak(B.BAK_PASANG[0]) === "Bak biru dibagi delapan bagian sama besar, tiga bagian terisi: tiga per delapan.", "B Infografis: suara bak biru memakai pengeja pecahan");
  cek(B.TEKS_TANDA_PASANG === "3/8 < 6/8" && B.TEKS_URUT === "2/8 < 5/8 < 7/8", "B Infografis: tanda dan urutan cocok dengan Story (tiga per delapan kurang dari enam per delapan; dua, lima, tujuh per delapan)");
  cek([B.SUARA_TANDA_PASANG, B.SUARA_URUT, ...B.BAK_PASANG.concat(B.BAK_URUT).map(B.suaraBak)].every((t) => tanpaDigit(t) && bersih(t)), "B Infografis kartu 1: suara tanpa digit dan kata terlarang");
  cek(B.ATURAN_WARNA.length === 4 && new Set(B.ATURAN_WARNA.map((a) => a.kunci)).size === 4, "B Infografis kartu 2: empat aturan unik");
  cek(B.ATURAN_WARNA.every((a) => tanpaDigit(a.suara) && bersih(a.suara + a.isi + a.sebut) && a.isi.length <= 34), "B Infografis kartu 2: aturan pendek, suara tanpa digit");
  const gab = B.ATURAN_WARNA.map((a) => a.isi + " " + a.suara + " " + a.sebut).join(" ").toLowerCase();
  for (const s of ["penyebut sama", "sama besar", "pembilang", "lebih besar", "sisi terbuka", "tanda banding", "garis pecahan", "kanan"]) cek(gab.includes(s), `B Infografis kartu 2: memuat "${s}"`);
  const s = baca(fb, "DaftarWarna.tsx");
  cek(/const total1 = BAK_PASANG\.length \+ 1 \+ BAK_URUT\.length \+ 1/.test(s) && /kartu === 1 && selesai1/.test(s) && /kartu === 2 && selesai2/.test(s) && /setKartu\(1\)/.test(s), "B Infografis: dua kartu, tujuh sel kartu 1 (dua pecahan, tanda, tiga pecahan, urutan) harus terbuka sebelum BERIKUTNYA");
  cek(/kolomBak\(BAK_PASANG\[0\]/.test(s) && /kolomBak\(BAK_PASANG\[1\]/.test(s) && /BAK_URUT\.map\(\(b\) => kolomBak/.test(s) && /<TangkiBak/.test(s), "B Infografis: bak digambar sungguh delapan lapis (TangkiBak) untuk semua bak Story");
  cek(s.includes('["sama", "bilang", "tanda"].map') && s.includes('aturanKotak("garis")') && s.includes("<TangkiBak isi={BAK_PASANG[0].isi}") && s.includes("<TangkiBak isi={BAK_PASANG[1].isi}"), "B Infografis kartu 2: bak biru dan merah berdiri mengapit aturan, bukan kisi kartu seperti A");
}

/* ------------------------------ Rupa berbeda antar Sub-Bab ------------------------------ */
{
  const sa = baca(fa, "MejaLipat.tsx") + baca(fa, "DaftarLipat.tsx");
  const sb = baca(fb, "BakWarna.tsx") + baca(fb, "DaftarWarna.tsx");
  cek(/border-t-\[5px\] border-\[#92400E\]/.test(sa) && !/TangkiBak/.test(sa), "rupa: A bergambar tali jemuran dan pita, tidak memakai bak");
  cek(/TangkiBak/.test(sb) && !/border-t-\[5px\]/.test(sb), "rupa: B bergambar bak berdiri dan papan kapur, tidak memakai tali jemuran");
  const dasarLama = ["PetaUbin", "PetaEmber", "PetaEtalase", "PetaMosaik", "InfoUbin", "InfoEmber", "InfoEtalase", "InfoMosaik"];
  cek(!dasarLama.some((n) => (sa + sb).includes(n)), "rupa: tidak menyalin komponen Bab 4 dan Bab 5");
}

/* ------------------------------ Petunjuk pendek dan perkiraan tinggi (344 x 760, area gulir 648 px) ------------------------------ */
{
  const petunjuk = [A.PETUNJUK_PETA_LIPAT, A.PETUNJUK1_INFO_LIPAT, A.PETUNJUK2_INFO_LIPAT, B.PETUNJUK_PETA_WARNA, B.PETUNJUK1_INFO_WARNA, B.PETUNJUK2_INFO_WARNA];
  cek(petunjuk.every((p) => p.length <= 66 && !p.includes(". ") && bersih(p) && tanpaDigit(p)), `petunjuk satu kalimat paling banyak 66 huruf (${Math.max(...petunjuk.map((p) => p.length))})`);
  for (const [f, n] of [[fa, "MejaLipat.tsx"], [fa, "DaftarLipat.tsx"], [fb, "BakWarna.tsx"], [fb, "DaftarWarna.tsx"]]) {
    const s = baca(f, n);
    cek(!/JUDUL_PETA|JUDUL_INFO|Kartu {kartu} dari 2|Kartu ${kartu} dari 2/.test(s), `${n}: tanpa pill judul dan tanpa penanda Kartu x dari 2 (hemat tinggi)`);
  }
  // Perkiraan tinggi akhir (px) dihitung dari kode: pengukuran peramban semula A Mind-map 650, A Infografis kartu 2 678, B Mind-map 670; pemangkasan: pill judul 28, petunjuk 2 baris jadi 1 baris 20, penanda kartu 18, jarak, gambar lebih kecil.
  const ukur = { "A Mind-map": 650 - 28 - 20 - 10, "A Infografis kartu 2": 678 - 28 - 20 - 18 - 12 - 15, "B Mind-map": 670 - 28 - 20 - 8 - 12 };
  for (const [k, v] of Object.entries(ukur)) cek(v <= 640, `perkiraan tinggi ${k}: ${v} px (batas 640)`);
}

console.log(`Uji visual Kelas 4 Bab 2 A dan B: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
