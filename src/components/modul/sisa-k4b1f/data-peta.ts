/**
 * Data Mind-map dan Infografis Kelas 4 Bab 1 Sub-Bab F "Papan Sisa Pak Usman" (dirancang ulang per Sub-Bab, tanpa komponen kartu bersama).
 * Mind-map: TALI JEMUR di dermaga (Genta menjemur sandal tamu di tali dekat dermaga, Story): dua tali, tiap tali menggantung tiga kartu gambar langkah (612 dan 275 bersusun, panah dari satuan, 2 jadi 12,
 * hasil keliru 463, hitung maju 275 ke 300 ke 612, 337 + 275 = 612) dengan label kosong menempel di bawah tiap kartu. Label diketuk: judul langkah muncul dan dibacakan Guru.
 * Infografis: dua kartu dari angka Story. Kartu 1 = tiga papan gantung (ratusan, puluhan, satuan; urutan mengurangkan dari kanan) berisi angka yang dipinjam dan hasil tiap tempat (612 − 275), lalu sisa tamu,
 * periksa tambah, dan hasil keliru Satria 463. Kartu 2 = kartu acuan Hitung Maju: garis lompat 275 ke 300 ke 600 ke 612 (tiga lompatan, jumlahnya 337). Digital saja.
 * Suara tanpa digit lewat ejaK4B1. Diuji: scripts/uji-visual-k4b1def.mjs.
 */
import { ejaK4B1 } from "../eja-k4b1";

/** Pecah judul menjadi baris pendek (paling banyak maks huruf per baris) agar muat di label gambar. */
export function bungkusJudul(judul: string, maks: number): string[] {
  const baris: string[] = [];
  let b = "";
  for (const k of judul.split(" ")) {
    if (b && `${b} ${k}`.length > maks) {
      baris.push(b);
      b = k;
    } else b = b ? `${b} ${k}` : k;
  }
  if (b) baris.push(b);
  return baris;
}

export type LangkahPeta = { judul: string; arti: string };
/** Enam langkah Mind-map (baris atas kiri ke kanan, lalu baris bawah). Arti dibacakan Guru (diejakan, tanpa digit). */
export const LANGKAH_SISA: LangkahPeta[] = [
  {
    judul: "Panjang atau pendek",
    arti: "Langkah satu. Susun sejajar: tulis bilangan awal di atas dan bilangan yang pergi di bawahnya, satuan di bawah satuan, lalu beri garis. Cara susun panjang menguraikan kedua bilangan menjadi ratusan, puluhan, dan satuan, lalu mengurangkan tiap tempat. Cara susun pendek langsung mengurangkan dari satuan. Hasil keduanya sama.",
  },
  { judul: "Mulai dari satuan", arti: "Langkah dua. Mulai mengurangkan dari satuan, lalu puluhan, lalu ratusan, bergerak dari kanan ke kiri." },
  { judul: "Ambil dari kiri", arti: "Langkah tiga. Kalau angka di atas lebih kecil, ambil satu dari tempat di kirinya. Satu yang diambil menjadi sepuluh di tempat kanan. Coret angka yang diambil." },
  { judul: "Jangan dibalik", arti: "Langkah empat. Jangan membalik angka di tiap tempat. Angka atas tetap di atas, dan kekurangannya ditutup dengan mengambil. Kalau dibalik, hasilnya meleset." },
  { judul: "Hitung maju", arti: "Langkah lima. Untuk dua bilangan yang berdekatan, hitung maju dari bilangan kecil sampai bilangan besar. Jumlah semua lompatan sama dengan selisihnya." },
  { judul: "Cek dengan tambah", arti: "Langkah enam. Periksa hasilnya dengan menambah. Hasil ditambah bilangan yang dikurangkan harus sama dengan bilangan awal." },
];

/** Geometri gambar (viewBox 300 x 274): dua tali, tiga kartu per tali. */
export const LEBAR_GAMBAR_SISA = 300;
export const TINGGI_GAMBAR_SISA = 274;
export const UKURAN_FONT_SISA = 12;
export const MAKS_HURUF_BARIS_SISA = 13;
export const LEBAR_KARTU_SISA = 92;
export const TINGGI_KARTU_SISA = 56;
export const TINGGI_LABEL_SISA = 38;
export const Y_TALI_SISA = [48, 164];
export type KotakGambar = { x: number; y: number; w: number; h: number };
/** Kartu gambar ke-i (0 sampai 5): tiga kolom, dua tali. */
export const kartuSisa = (i: number): KotakGambar => ({ x: 4 + (i % 3) * 100, y: Y_TALI_SISA[Math.floor(i / 3)] + 6, w: LEBAR_KARTU_SISA, h: TINGGI_KARTU_SISA });
/** Label kosong di bawah kartu ke-i. */
export const labelSisa = (i: number): KotakGambar => ({ x: kartuSisa(i).x, y: kartuSisa(i).y + TINGGI_KARTU_SISA + 2, w: LEBAR_KARTU_SISA, h: TINGGI_LABEL_SISA });
export const JUDUL_PETA_SISA = "Tali Jemur Pak Usman";
export const PETUNJUK_PETA_SISA = "Di dermaga, sandal tamu dijemur di tali. Ketuk tanda tanya di bawah tiap kartu gambar untuk melihat langkahnya.";
export const SELESAI_PETA_SISA = "Tali jemur penuh! Enam langkah sudah kamu buka.";

/* ------------------------------ Infografis ------------------------------ */
export const MENGINAP_SISA = 612;
export const PULANG_SISA = 275;
export const SISA_TAMU = MENGINAP_SISA - PULANG_SISA;
export const SISA_KELIRU = 463;
export type SelSisa = { kunci: string; isi: string; suara: string; aria: string };
const digit = (n: number): number[] => String(n).padStart(3, "0").split("").map(Number);
const dA = digit(MENGINAP_SISA);
const dB = digit(PULANG_SISA);
export const NAMA_TEMPAT_SISA = ["ratusan", "puluhan", "satuan"] as const;
/** Pengurangan tiap tempat dari kanan, dihitung dari 612 dan 275. Urutan: ratusan, puluhan, satuan (kiri ke kanan). Rantai angka atas: awal, setelah diambil tempat di kanannya, setelah mengambil dari kiri. */
export type TempatSisa = { nama: string; urut: number; awal: number; rantai: number[]; akhir: number; bawah: number; selisih: number; diambil: boolean; mengambil: boolean };
export const TEMPAT_SISA: TempatSisa[] = (() => {
  const diambil = [false, false, false];
  const hasil: TempatSisa[] = [];
  const kerja: Record<number, TempatSisa> = {};
  for (let i = 2; i >= 0; i -= 1) {
    const rantai = [dA[i]];
    let nilai = dA[i];
    if (diambil[i]) {
      nilai -= 1;
      rantai.push(nilai);
    }
    const mengambil = nilai < dB[i];
    if (mengambil) {
      nilai += 10;
      rantai.push(nilai);
      diambil[i - 1] = true;
    }
    kerja[i] = { nama: NAMA_TEMPAT_SISA[i], urut: 3 - i, awal: dA[i], rantai, akhir: nilai, bawah: dB[i], selisih: nilai - dB[i], diambil: diambil[i], mengambil };
  }
  for (let i = 0; i < 3; i += 1) hasil.push(kerja[i]);
  return hasil;
})();
export const teksRantaiSisa = (t: TempatSisa): string => (t.rantai.length > 1 ? t.rantai.join(" jadi ") : `${t.awal} tetap`);
export const suaraRantaiSisa = (t: TempatSisa): string => {
  if (t.mengambil && t.diambil) return ejaK4B1(`Di ${t.nama}, angka ${t.awal} tinggal ${t.rantai[1]} karena satu diambil, lalu mengambil satu lagi dari kiri dan menjadi ${t.akhir}.`);
  if (t.mengambil) return ejaK4B1(`Di ${t.nama}, angka ${t.awal} lebih kecil dari ${t.bawah}, jadi mengambil satu dari kiri dan menjadi ${t.akhir}.`);
  if (t.diambil) return ejaK4B1(`Di ${t.nama}, satu diambil untuk tempat di kanannya, jadi angka ${t.awal} menjadi ${t.akhir}.`);
  return ejaK4B1(`Di ${t.nama}, angka ${t.awal} sudah cukup dan tidak berubah.`);
};
const rb = (n: number): string => String(n);

/** Kartu 1: enam kotak papan (dipinjam dan hasil tiap tempat) dan tiga kotak bawah (sisa, cek tambah, hasil keliru). */
export const SEL_KARTU1_SISA: SelSisa[] = [
  ...TEMPAT_SISA.flatMap((t, i): SelSisa[] => [
    {
      kunci: `p-${i}-pinjam`,
      isi: teksRantaiSisa(t),
      suara: suaraRantaiSisa(t),
      aria: `Angka atas di ${t.nama}: ${teksRantaiSisa(t)}`,
    },
    {
      kunci: `p-${i}-hasil`,
      isi: `${t.akhir} − ${t.bawah} = ${t.selisih}`,
      suara: ejaK4B1(`Di ${t.nama}: ${t.akhir} − ${t.bawah} = ${t.selisih}.`),
      aria: `Hasil di ${t.nama}: ${t.selisih}`,
    },
  ]),
  { kunci: "b-sisa", isi: rb(SISA_TAMU), suara: ejaK4B1(`Tamu yang masih menginap ada ${SISA_TAMU}. Pengurangan ini dua kali mengambil, satu di satuan dan satu di puluhan, dan hasilnya sama dengan cara susun panjang.`), aria: `Sisa tamu: ${SISA_TAMU}` },
  { kunci: "b-cek", isi: rb(MENGINAP_SISA), suara: ejaK4B1(`${SISA_TAMU} + ${PULANG_SISA} = ${MENGINAP_SISA}, sama dengan bilangan awal. Jadi pengurangannya benar.`), aria: `Cek tambah: ${MENGINAP_SISA}` },
  { kunci: "b-salah", isi: `${SISA_KELIRU} (keliru)`, suara: ejaK4B1(`Hasil ${SISA_KELIRU} keliru, karena Satria membalik angka di tiap tempat. Hasil yang benar ${SISA_TAMU}.`), aria: `Hasil keliru: ${SISA_KELIRU}` },
];
/** Kartu 2: tiga lompatan dari 275 ke 612 lewat 300 dan 600 (dihitung), dan jumlah lompatan. */
export const TITIK_LOMPAT_SISA = [PULANG_SISA, 300, 600, MENGINAP_SISA];
export const LOMPAT_SISA = TITIK_LOMPAT_SISA.slice(1).map((t, i) => t - TITIK_LOMPAT_SISA[i]);
export const NAMA_LOMPAT_SISA = ["Lompat satu", "Lompat dua", "Lompat tiga"] as const;
const ordinal = ["pertama", "kedua", "ketiga"];
export const SEL_KARTU2_SISA: SelSisa[] = [
  ...LOMPAT_SISA.map((l, i): SelSisa => ({
    kunci: `l-${i}`,
    isi: `+${l} sampai ${TITIK_LOMPAT_SISA[i + 1]}`,
    suara: ejaK4B1(`Lompatan ${ordinal[i]}: dari ${TITIK_LOMPAT_SISA[i]} naik ${l} sampai ${TITIK_LOMPAT_SISA[i + 1]}.`),
    aria: `Lompatan ${i + 1}: naik ${l}`,
  })),
  {
    kunci: "l-jumlah",
    isi: `${LOMPAT_SISA.join(" + ")} = ${LOMPAT_SISA.reduce((a, b) => a + b, 0)}`,
    suara: ejaK4B1(`Jumlah semua lompatan: ${LOMPAT_SISA.join(" + ")} = ${LOMPAT_SISA.reduce((a, b) => a + b, 0)}. Itulah selisihnya.`),
    aria: `Jumlah lompatan: ${LOMPAT_SISA.reduce((a, b) => a + b, 0)}`,
  },
];
export const JUDUL_INFO1_SISA = "Papan sisa Pak Usman";
export const PETUNJUK1_INFO_SISA = "Papan sisa. Mengurangkan dari kanan ke kiri. Ketuk tanda tanya untuk melihat angka yang diambil dan hasil tiap tempat.";
export const PETUNJUK2_INFO_SISA = "Kartu acuan Hitung Maju. Ketuk tanda tanya untuk melihat tiga lompatan dari bilangan kecil ke bilangan besar.";
export const SELESAI1_INFO_SISA = "Papan lengkap! Ambil dari kiri, jangan dibalik, lalu cek dengan tambah.";
export const SELESAI2_INFO_SISA = "Kartu lengkap! Jumlah semua lompatan sama dengan selisihnya.";
