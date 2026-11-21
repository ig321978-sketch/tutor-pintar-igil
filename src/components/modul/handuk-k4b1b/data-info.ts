/**
 * Data Infografis Kelas 4 Bab 1 Sub-Bab B "Gudang Handuk Pak Laode": DUA kartu, tiap kartu satu layar tanpa gulir, semuanya dari benda dan angka Story B (2.304 handuk).
 * Kartu 1 "Isi gudang" = empat kartu jenis (2 peti, 3 kotak, tidak ada ikat, 4 lembar) dengan gambar sebanyak datanya; tempat angka dan banyaknya lembar tiap jenis tertutup, begitu juga jumlah seluruhnya.
 * Kartu 2 "Angka sama, tempat beda" = dua bagan tempat (2.304 dan setelah tukar 3.204) dengan arti angka dua, arti angka tiga, dan bacaan tertutup. Digital saja. Diuji: scripts/uji-handuk-k4b1b.mjs.
 */
import { kataBilK4B1 } from "../eja-k4b1";

export type SelInfo = { id: string; tampil: string; suara: string };

export const titik = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/** Isi gudang Story B: 2 peti, 3 kotak, 0 ikat, 4 lembar. Satu peti 1.000 lembar, kotak 100, ikat 10, lembar 1. */
export const TEMPAT_GUDANG = ["ribuan", "ratusan", "puluhan", "satuan"] as const;
export const WARNA_TEMPAT_GUDANG = ["#2563EB", "#EA580C", "#16A34A", "#DC2626"] as const;
export const JENIS_GUDANG = [
  { id: "peti", nama: "peti", isi: 1000, jumlah: 2 },
  { id: "kotak", nama: "kotak", isi: 100, jumlah: 3 },
  { id: "ikat", nama: "ikat", isi: 10, jumlah: 0 },
  { id: "lembar", nama: "lembar", isi: 1, jumlah: 4 },
] as const;
export const TOTAL_GUDANG = JENIS_GUDANG.reduce((s, j) => s + j.jumlah * j.isi, 0);

export type KartuJenis = { id: string; nama: string; jumlah: number; isi: number; tempat: (typeof TEMPAT_GUDANG)[number]; warna: string; tempatSel: SelInfo; lembarSel: SelInfo };

export const KARTU_JENIS: readonly KartuJenis[] = JENIS_GUDANG.map((j, i) => {
  const tempat = TEMPAT_GUDANG[i];
  const lembar = j.jumlah * j.isi;
  return {
    id: j.id,
    nama: j.nama,
    jumlah: j.jumlah,
    isi: j.isi,
    tempat,
    warna: WARNA_TEMPAT_GUDANG[i],
    tempatSel: {
      id: `j-${j.id}-tempat`,
      tampil: tempat,
      suara: j.jumlah === 0 ? `Tidak ada ${j.nama}, jadi tempat ${tempat} berisi nol.` : `${kataBilK4B1(j.jumlah)} ${j.nama} ada di tempat ${tempat}.`,
    },
    lembarSel: {
      id: `j-${j.id}-lembar`,
      tampil: `${titik(lembar)} lembar`,
      suara: j.jumlah === 0 ? "Tidak ada ikat, jadi isinya nol lembar." : `${kataBilK4B1(j.jumlah)} ${j.nama} berisi ${kataBilK4B1(lembar)} lembar.`,
    },
  };
});

export const SEL_TOTAL_GUDANG: SelInfo = {
  id: "j-total",
  tampil: `${titik(TOTAL_GUDANG)} lembar`,
  suara: `Seluruh handuk di gudang ada ${kataBilK4B1(TOTAL_GUDANG)} lembar.`,
};

/** Kartu 2: bagan sebelum tukar (2.304) dan sesudah tukar (3.204). Dua angka yang ditukar: 2 dan 3. */
export const ANGKA_TUKAR = [2, 3] as const;
export type BaganGudang = { id: string; judul: string; bilangan: number; digit: number[]; artiDua: SelInfo; artiTiga: SelInfo; baca: SelInfo };

/** Arti sebuah angka pada tempatnya (angka dikali isi tempat). */
export const artiAngka = (bilangan: number, angka: number): number => {
  const d = String(bilangan).padStart(4, "0").split("").map(Number);
  const isi = [1000, 100, 10, 1];
  const i = d.indexOf(angka);
  return d[i] * isi[i];
};

function susunBagan(id: string, judul: string, bilangan: number): BaganGudang {
  const digit = String(bilangan).padStart(4, "0").split("").map(Number);
  const a2 = artiAngka(bilangan, 2);
  const a3 = artiAngka(bilangan, 3);
  return {
    id,
    judul,
    bilangan,
    digit,
    artiDua: { id: `${id}-dua`, tampil: titik(a2), suara: `Angka dua di sini berarti ${kataBilK4B1(a2)}.` },
    artiTiga: { id: `${id}-tiga`, tampil: titik(a3), suara: `Angka tiga di sini berarti ${kataBilK4B1(a3)}.` },
    baca: { id: `${id}-baca`, tampil: kataBilK4B1(bilangan), suara: `Bilangan ini dibaca ${kataBilK4B1(bilangan)}.` },
  };
}

export const BAGAN_GUDANG: readonly BaganGudang[] = [susunBagan("g1", "Isi gudang", TOTAL_GUDANG), susunBagan("g2", "Setelah tukar", 3204)];
export const ACUAN_GUDANG = "Angka sama, tempat berbeda, bilangan berbeda. Nol menjaga tempat.";

export const JUDUL_KARTU1_GUDANG = "Isi gudang Pak Laode";
export const JUDUL_KARTU2_GUDANG = "Angka sama, tempat beda";
export const PETUNJUK1_INFO_GUDANG = "Ketuk tanda tanya untuk melihat tempat dan isi tiap jenis.";
export const PETUNJUK2_INFO_GUDANG = "Ketuk tanda tanya untuk melihat arti angka dan bacaannya.";
export const SELESAI1_INFO_GUDANG = "Isi gudang lengkap! Tekan BERIKUTNYA.";
export const SELESAI2_INFO_GUDANG = "Lengkap! Tempat angka menentukan arti angka.";
