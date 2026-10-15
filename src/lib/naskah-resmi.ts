import type { IsiCacheMateri } from "@/lib/jenis-cache-materi";
import { kelasDuaSd, kelasEmpatSd, kelasSatuSd, kelasTigaSd } from "@/lib/infografis-kelas1";
import { kunciMapelTutor, rapikanKunci } from "@/lib/kunci-siswa";
import {
  JUDUL_PAI1_BAB1,
  naskahPai1Bab1,
  naskahTampilanPai1Bab1,
} from "@/lib/naskah-resmi-pai-1-bab1";
import {
  JUDUL_PAI1_BAB2,
  naskahPai1Bab2,
  naskahTampilanPai1Bab2,
} from "@/lib/naskah-resmi-pai-1-bab2";
import { MODUL_PAI1_BAB3_10 } from "@/lib/modul-resmi-pai-1-bab3-10";
import { MODUL_MTK1_BAB1 } from "@/lib/modul-resmi-mtk-1-bab1";
import { MODUL_MTK1_BAB2 } from "@/lib/modul-resmi-mtk-1-bab2";
import { MODUL_MTK1_BAB3 } from "@/lib/modul-resmi-mtk-1-bab3";
import { MODUL_MTK1_BAB4 } from "@/lib/modul-resmi-mtk-1-bab4";
import { MODUL_MTK1_BAB5 } from "@/lib/modul-resmi-mtk-1-bab5";
import { MODUL_MTK1_BAB6 } from "@/lib/modul-resmi-mtk-1-bab6";
import { MODUL_MTK1_BAB7 } from "@/lib/modul-resmi-mtk-1-bab7";
import { MODUL_MTK1_BAB8 } from "@/lib/modul-resmi-mtk-1-bab8";
import { MODUL_MTK1_BAB9 } from "@/lib/modul-resmi-mtk-1-bab9";
import { MODUL_MTK1_BAB10 } from "@/lib/modul-resmi-mtk-1-bab10";
import { MODUL_MTK1_BAB11 } from "@/lib/modul-resmi-mtk-1-bab11";
import { MODUL_MTK1_BAB12 } from "@/lib/modul-resmi-mtk-1-bab12";
import { MODUL_MTK1_BAB13 } from "@/lib/modul-resmi-mtk-1-bab13";
import { MODUL_MTK1_BAB14 } from "@/lib/modul-resmi-mtk-1-bab14";
import { MODUL_MTK1_BAB15 } from "@/lib/modul-resmi-mtk-1-bab15";
import { MODUL_MTK3_BAB1 } from "@/lib/modul-resmi-mtk-3-bab1";
import { MODUL_MTK3_BAB2 } from "@/lib/modul-resmi-mtk-3-bab2";
import { MODUL_MTK3_PERKALIAN } from "@/lib/modul-resmi-mtk-3-perkalian";
import { MODUL_MTK3_PEMBAGIAN } from "@/lib/modul-resmi-mtk-3-pembagian";
import { MODUL_MTK3_PECAHAN } from "@/lib/modul-resmi-mtk-3-pecahan";
import { MODUL_MTK3_UKUR } from "@/lib/modul-resmi-mtk-3-ukur";
import { MODUL_MTK3_WAKTU } from "@/lib/modul-resmi-mtk-3-waktu";
import { MODUL_MTK3_UANG } from "@/lib/modul-resmi-mtk-3-uang";
import { MODUL_MTK3_POLA } from "@/lib/modul-resmi-mtk-3-pola";
import { MODUL_MTK3_KALIMAT } from "@/lib/modul-resmi-mtk-3-kalimat";
import { MODUL_MTK3_BANGUN } from "@/lib/modul-resmi-mtk-3-bangun";
import { MODUL_MTK3_KELILING } from "@/lib/modul-resmi-mtk-3-keliling";
import { MODUL_MTK3_RUANG } from "@/lib/modul-resmi-mtk-3-ruang";
import { MODUL_MTK7_BAB1 } from "@/lib/modul-resmi-mtk-7-bab1";
import { MODUL_MTK3_BAB3 } from "@/lib/modul-resmi-mtk-3-bab3";
import { MODUL_MTK4_BAB1 } from "@/lib/modul-resmi-mtk-4-bab1";
import { MODUL_PANCASILA1_BAB1 } from "@/lib/modul-resmi-pancasila-1-bab1";
import { MODUL_PANCASILA1_BAB2 } from "@/lib/modul-resmi-pancasila-1-bab2";
import { MODUL_PANCASILA1_BAB3 } from "@/lib/modul-resmi-pancasila-1-bab3";
import { MODUL_PANCASILA1_BAB4 } from "@/lib/modul-resmi-pancasila-1-bab4";
import { MODUL_BINDO1_BAB1_8 } from "@/lib/modul-resmi-bindo-1";
import {
  MODUL_BINDO2_BAB1_4,
  MODUL_BINDO2_BAB1_8,
  MODUL_BINDO2_BAB5_8,
} from "@/lib/modul-resmi-bindo-2";
import {
  MODUL_MTK2_BAB1_4,
  MODUL_MTK2_BAB1_8,
  MODUL_MTK2_BAB5_8,
} from "@/lib/modul-resmi-mtk-2";
import { MODUL_PJOK1_BAB1_4 } from "@/lib/modul-resmi-pjok-1";
import { MODUL_INGGRIS1_BAB1_4 } from "@/lib/modul-resmi-inggris-1";
import { MODUL_MUSIK1_BAB1_4 } from "@/lib/modul-resmi-musik-1";
import { MODUL_SENIRUPA1_BAB1_4 } from "@/lib/modul-resmi-senirupa-1";
import { MODUL_KRISTEN1_BAB1_4 } from "@/lib/modul-resmi-kristen-1";
import { MODUL_KATOLIK1_BAB1_4 } from "@/lib/modul-resmi-katolik-1";
import { MODUL_BUDDHA1_BAB1_4 } from "@/lib/modul-resmi-buddha-1";
import { MODUL_HINDU1_BAB1_4 } from "@/lib/modul-resmi-hindu-1";
import { MODUL_KHONGHUCU1_BAB1_4 } from "@/lib/modul-resmi-khonghucu-1";
import { MODUL_PAI2_BAB1_5 } from "@/lib/modul-resmi-pai-2";
import {
  isiCacheDariModulResmi,
  naskahTampilanModulResmi,
  teksLisanModulResmi,
  type ModulResmiPai,
} from "@/lib/modul-resmi-pai";

export const MODUL_PANCASILA1_BAB1_4 = [
  MODUL_PANCASILA1_BAB1,
  MODUL_PANCASILA1_BAB2,
  MODUL_PANCASILA1_BAB3,
  MODUL_PANCASILA1_BAB4,
] as const;

export { MODUL_BINDO1_BAB1_8 };
export { MODUL_BINDO2_BAB1_4, MODUL_BINDO2_BAB1_8, MODUL_BINDO2_BAB5_8 };
export { MODUL_MTK2_BAB1_4, MODUL_MTK2_BAB1_8, MODUL_MTK2_BAB5_8 };
export { MODUL_PJOK1_BAB1_4 };
export { MODUL_INGGRIS1_BAB1_4 };
export { MODUL_MUSIK1_BAB1_4 };
export { MODUL_SENIRUPA1_BAB1_4 };
export { MODUL_KRISTEN1_BAB1_4 };
export { MODUL_KATOLIK1_BAB1_4 };
export { MODUL_BUDDHA1_BAB1_4 };
export { MODUL_HINDU1_BAB1_4 };
export { MODUL_KHONGHUCU1_BAB1_4 };
export { MODUL_PAI2_BAB1_5 };

export function cariModulPai1Resmi(materi: string): ModulResmiPai | null {
  const judul = normJudul(materi);
  return MODUL_PAI1_BAB3_10.find((modul) => modul.pola.test(judul)) ?? null;
}

export function cariModulPai1DariNaskah(teks?: string): ModulResmiPai | null {
  return (
    MODUL_PAI1_BAB3_10.find((modul) => naskahTampilanModulResmi(modul, teks)) ??
    null
  );
}

function normJudul(nilai: string): string {
  return rapikanKunci(nilai).replace(/[’‘ʻ`´]/g, "'");
}

function adalahMapelMatematika(mapel: string): boolean {
  return kunciMapelTutor(mapel) === "matematika";
}

function adalahMapelPancasila(mapel: string): boolean {
  const mapelR = kunciMapelTutor(mapel);
  return (
    mapelR === "pendidikan pancasila" ||
    mapelR === "ppkn" ||
    mapelR === "pkn" ||
    mapelR === "pendidikan kewarganegaraan"
  );
}

function adalahMapelBindo(mapel: string): boolean {
  const mapelR = kunciMapelTutor(mapel);
  return mapelR === "bahasa indonesia";
}

function adalahMapelPjok(mapel: string): boolean {
  const mapelR = kunciMapelTutor(mapel);
  return mapelR === "pendidikan jasmani, olahraga, dan kesehatan";
}

function adalahMapelInggris(mapel: string): boolean {
  return kunciMapelTutor(mapel) === "bahasa inggris";
}

function adalahMapelMusik(mapel: string): boolean {
  return kunciMapelTutor(mapel) === "seni musik";
}

function adalahMapelSeniRupa(mapel: string): boolean {
  return kunciMapelTutor(mapel) === "seni rupa";
}

function adalahMapelKristen(mapel: string): boolean {
  return kunciMapelTutor(mapel) === "pendidikan agama kristen dan budi pekerti";
}

function adalahMapelKatolik(mapel: string): boolean {
  return kunciMapelTutor(mapel) === "pendidikan agama katolik dan budi pekerti";
}

function adalahMapelBuddha(mapel: string): boolean {
  return kunciMapelTutor(mapel) === "pendidikan agama buddha dan budi pekerti";
}

function adalahMapelHindu(mapel: string): boolean {
  return kunciMapelTutor(mapel) === "pendidikan agama hindu dan budi pekerti";
}

function adalahMapelKhonghucu(mapel: string): boolean {
  return kunciMapelTutor(mapel) === "pendidikan agama khonghucu dan budi pekerti";
}

function adalahMapelPai(mapel: string): boolean {
  const mapelR = kunciMapelTutor(mapel);
  return (
    mapelR.includes("agama islam") ||
    mapelR === "pendidikan agama dan budi pekerti" ||
    mapelR === "pai"
  );
}

export function adalahJudulPai1Bab1(mapel: string, materi: string): boolean {
  if (!adalahMapelPai(mapel)) return false;
  return /cinta\s+al[-\s]?qur'?an/.test(normJudul(materi));
}

export function adalahJudulPai1Bab2(mapel: string, materi: string): boolean {
  if (!adalahMapelPai(mapel)) return false;
  return /rukun\s+iman/.test(normJudul(materi));
}

export function adalahPai1Bab1(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulPai1Bab1(mapel, materi);
}

export function adalahJudulMtk1Bab1(mapel: string, materi: string): boolean {
  if (!adalahMapelMatematika(mapel)) return false;
  const judul = normJudul(materi);
  return (
    /ayo\s+berhitung/.test(judul) ||
    /ayo\s+membilang\s+sampai(\s+dengan)?\s+10/.test(judul)
  );
}

export function adalahMtk1Bab1(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulMtk1Bab1(mapel, materi);
}

export function adalahJudulMtk1Bab2(mapel: string, materi: string): boolean {
  if (!adalahMapelMatematika(mapel)) return false;
  const judul = normJudul(materi);
  if (/pengurangan/.test(judul)) return false;
  return /penjumlahan\s+sampai(\s+dengan)?\s+10\b/.test(judul);
}

export function adalahMtk1Bab2(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulMtk1Bab2(mapel, materi);
}

export function adalahJudulMtk1Bab3(mapel: string, materi: string): boolean {
  if (!adalahMapelMatematika(mapel)) return false;
  const judul = normJudul(materi);
  if (/sampai(\s+dengan)?\s+20\b/.test(judul)) return false;
  return /pengurangan\s+sampai(\s+dengan)?\s+10\b/.test(judul);
}

export function adalahMtk1Bab3(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulMtk1Bab3(mapel, materi);
}

export function adalahJudulMtk1Bab4(mapel: string, materi: string): boolean {
  if (!adalahMapelMatematika(mapel)) return false;
  return /mengenal\s+bentuk\b/.test(normJudul(materi));
}

export function adalahMtk1Bab4(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulMtk1Bab4(mapel, materi);
}

export function adalahJudulMtk1Bab5(mapel: string, materi: string): boolean {
  if (!adalahMapelMatematika(mapel)) return false;
  return /membilang\s+sampai(\s+dengan)?\s+20\b/.test(normJudul(materi));
}

export function adalahMtk1Bab5(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulMtk1Bab5(mapel, materi);
}

export function adalahJudulMtk1Bab6(mapel: string, materi: string): boolean {
  if (!adalahMapelMatematika(mapel)) return false;
  return /penjumlahan\s+dan\s+pengurangan\s+sampai(\s+dengan)?\s+20\b/.test(normJudul(materi));
}

export function adalahMtk1Bab6(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulMtk1Bab6(mapel, materi);
}

export function adalahJudulMtk1Bab7(mapel: string, materi: string): boolean {
  if (!adalahMapelMatematika(mapel)) return false;
  return /mengukur\s+panjang\s+benda\b/.test(normJudul(materi));
}

export function adalahMtk1Bab7(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulMtk1Bab7(mapel, materi);
}

export function adalahJudulMtk1Bab8(mapel: string, materi: string): boolean {
  if (!adalahMapelMatematika(mapel)) return false;
  return /mengenal\s+diagram\b/.test(normJudul(materi));
}

export function adalahMtk1Bab8(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulMtk1Bab8(mapel, materi);
}

export function adalahJudulMtk1Bab9(mapel: string, materi: string): boolean {
  if (!adalahMapelMatematika(mapel)) return false;
  return /bilangan\s+sampai\s+100\b/.test(normJudul(materi));
}

export function adalahMtk1Bab9(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulMtk1Bab9(mapel, materi);
}

export function adalahJudulMtk1Bab10(mapel: string, materi: string): boolean {
  if (!adalahMapelMatematika(mapel)) return false;
  return /penjumlahan\s+dan\s+pengurangan\s+sampai\s+100\b/.test(normJudul(materi));
}

export function adalahMtk1Bab10(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulMtk1Bab10(mapel, materi);
}

export function adalahJudulMtk1Bab11(mapel: string, materi: string): boolean {
  if (!adalahMapelMatematika(mapel)) return false;
  return /pola\s+bilangan\s+dan\s+pola\s+gambar\b/.test(normJudul(materi));
}

export function adalahMtk1Bab11(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulMtk1Bab11(mapel, materi);
}

export function adalahJudulMtk1Bab12(mapel: string, materi: string): boolean {
  if (!adalahMapelMatematika(mapel)) return false;
  return /pengukuran\s+berat\b/.test(normJudul(materi));
}

export function adalahMtk1Bab12(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulMtk1Bab12(mapel, materi);
}

export function adalahJudulMtk1Bab13(mapel: string, materi: string): boolean {
  if (!adalahMapelMatematika(mapel)) return false;
  return /waktu\s+dan\s+durasi\b/.test(normJudul(materi));
}

export function adalahMtk1Bab13(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulMtk1Bab13(mapel, materi);
}

export function adalahJudulMtk1Bab14(mapel: string, materi: string): boolean {
  if (!adalahMapelMatematika(mapel)) return false;
  return /bangun\s+datar\s+dan\s+bangun\s+ruang\b/.test(normJudul(materi));
}

export function adalahMtk1Bab14(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulMtk1Bab14(mapel, materi);
}

export function adalahJudulMtk1Bab15(mapel: string, materi: string): boolean {
  if (!adalahMapelMatematika(mapel)) return false;
  return /uang\s+dan\s+pemecahan\s+masalah\b/.test(normJudul(materi));
}

export function adalahMtk1Bab15(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulMtk1Bab15(mapel, materi);
}

export function adalahJudulMtk3Bab1(mapel: string, materi: string): boolean {
  if (!adalahMapelMatematika(mapel)) return false;
  return MODUL_MTK3_BAB1.pola.test(normJudul(materi));
}

export function adalahMtk3Bab1(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasTigaSd(kelas)) return false;
  return adalahJudulMtk3Bab1(mapel, materi);
}

export function adalahJudulMtk3Bab2(mapel: string, materi: string): boolean {
  if (!adalahMapelMatematika(mapel)) return false;
  return MODUL_MTK3_BAB2.pola.test(normJudul(materi));
}

export function adalahMtk3Bab2(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasTigaSd(kelas)) return false;
  return adalahJudulMtk3Bab2(mapel, materi);
}

export function adalahJudulMtk3Perkalian(mapel: string, materi: string): boolean {
  if (!adalahMapelMatematika(mapel)) return false;
  return MODUL_MTK3_PERKALIAN.pola.test(normJudul(materi));
}

export function adalahMtk3Perkalian(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasTigaSd(kelas)) return false;
  return adalahJudulMtk3Perkalian(mapel, materi);
}

export function adalahJudulMtk3Pembagian(mapel: string, materi: string): boolean {
  if (!adalahMapelMatematika(mapel)) return false;
  return MODUL_MTK3_PEMBAGIAN.pola.test(normJudul(materi));
}

export function adalahMtk3Pembagian(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasTigaSd(kelas)) return false;
  return adalahJudulMtk3Pembagian(mapel, materi);
}

export function adalahJudulMtk3Pecahan(mapel: string, materi: string): boolean {
  if (!adalahMapelMatematika(mapel)) return false;
  return MODUL_MTK3_PECAHAN.pola.test(normJudul(materi));
}

export function adalahMtk3Pecahan(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasTigaSd(kelas)) return false;
  return adalahJudulMtk3Pecahan(mapel, materi);
}

export function adalahJudulMtk3Ukur(mapel: string, materi: string): boolean {
  if (!adalahMapelMatematika(mapel)) return false;
  return MODUL_MTK3_UKUR.pola.test(normJudul(materi));
}

export function adalahMtk3Ukur(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasTigaSd(kelas)) return false;
  return adalahJudulMtk3Ukur(mapel, materi);
}

export function adalahJudulMtk3Waktu(mapel: string, materi: string): boolean {
  if (!adalahMapelMatematika(mapel)) return false;
  return MODUL_MTK3_WAKTU.pola.test(normJudul(materi));
}

export function adalahMtk3Waktu(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasTigaSd(kelas)) return false;
  return adalahJudulMtk3Waktu(mapel, materi);
}

export function adalahJudulMtk3Uang(mapel: string, materi: string): boolean {
  if (!adalahMapelMatematika(mapel)) return false;
  return MODUL_MTK3_UANG.pola.test(normJudul(materi));
}

export function adalahMtk3Uang(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasTigaSd(kelas)) return false;
  return adalahJudulMtk3Uang(mapel, materi);
}

export function adalahJudulMtk4Bab1(mapel: string, materi: string): boolean {
  if (!adalahMapelMatematika(mapel)) return false;
  return MODUL_MTK4_BAB1.pola.test(normJudul(materi));
}

export function adalahMtk4Bab1(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasEmpatSd(kelas)) return false;
  return adalahJudulMtk4Bab1(mapel, materi);
}

export function adalahJudulMtk3Pola(mapel: string, materi: string): boolean {
  if (!adalahMapelMatematika(mapel)) return false;
  return MODUL_MTK3_POLA.pola.test(normJudul(materi));
}

export function adalahMtk3Pola(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasTigaSd(kelas)) return false;
  return adalahJudulMtk3Pola(mapel, materi);
}

export function adalahJudulMtk3Kalimat(mapel: string, materi: string): boolean {
  if (!adalahMapelMatematika(mapel)) return false;
  return MODUL_MTK3_KALIMAT.pola.test(normJudul(materi));
}

export function adalahMtk3Kalimat(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasTigaSd(kelas)) return false;
  return adalahJudulMtk3Kalimat(mapel, materi);
}

export function adalahJudulMtk3Bangun(mapel: string, materi: string): boolean {
  if (!adalahMapelMatematika(mapel)) return false;
  return MODUL_MTK3_BANGUN.pola.test(normJudul(materi));
}

export function adalahMtk3Bangun(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasTigaSd(kelas)) return false;
  return adalahJudulMtk3Bangun(mapel, materi);
}

export function adalahJudulMtk3Keliling(mapel: string, materi: string): boolean {
  if (!adalahMapelMatematika(mapel)) return false;
  return MODUL_MTK3_KELILING.pola.test(normJudul(materi));
}

export function adalahMtk3Keliling(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasTigaSd(kelas)) return false;
  return adalahJudulMtk3Keliling(mapel, materi);
}

export function adalahJudulMtk3Ruang(mapel: string, materi: string): boolean {
  if (!adalahMapelMatematika(mapel)) return false;
  return MODUL_MTK3_RUANG.pola.test(normJudul(materi));
}

export function adalahMtk3Ruang(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasTigaSd(kelas)) return false;
  return adalahJudulMtk3Ruang(mapel, materi);
}

function kelasTujuhSmp(kelas: string): boolean {
  const k = kelas.trim();
  return /^7\s*SMP\b/i.test(k) || /^kelas\s*7(\s+SMP)?\b/i.test(k);
}

export function adalahJudulMtk7Bab1(mapel: string, materi: string): boolean {
  if (!adalahMapelMatematika(mapel)) return false;
  return MODUL_MTK7_BAB1.pola.test(normJudul(materi));
}

export function adalahMtk7Bab1(kelas: string, mapel: string, materi: string): boolean {
  if (!kelasTujuhSmp(kelas)) return false;
  return adalahJudulMtk7Bab1(mapel, materi);
}

export function adalahJudulMtk3Bab3(mapel: string, materi: string): boolean {
  if (!adalahMapelMatematika(mapel)) return false;
  return MODUL_MTK3_BAB3.pola.test(normJudul(materi));
}

export function adalahMtk3Bab3(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasTigaSd(kelas)) return false;
  return adalahJudulMtk3Bab3(mapel, materi);
}

export function cariModulPancasila1Resmi(materi: string): ModulResmiPai | null {
  const judul = normJudul(materi);
  return MODUL_PANCASILA1_BAB1_4.find((modul) => modul.pola.test(judul)) ?? null;
}

export function cariModulPancasila1DariNaskah(teks?: string): ModulResmiPai | null {
  return (
    MODUL_PANCASILA1_BAB1_4.find((modul) => naskahTampilanModulResmi(modul, teks)) ??
    null
  );
}

export function adalahJudulPancasila1Bab1(mapel: string, materi: string): boolean {
  if (!adalahMapelPancasila(mapel)) return false;
  return /aku dan teman-temanku|teman temanku|pelangi di kelasku/.test(
    normJudul(materi),
  );
}

export function adalahPancasila1Bab1(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulPancasila1Bab1(mapel, materi);
}

export function adalahJudulPancasila1Bab2(mapel: string, materi: string): boolean {
  if (!adalahMapelPancasila(mapel)) return false;
  return /aku patuh pada aturan|patuh pada aturan|sebab.?akibat aturan/.test(
    normJudul(materi),
  );
}

export function adalahPancasila1Bab2(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulPancasila1Bab2(mapel, materi);
}

export function adalahJudulPancasila1Bab3(mapel: string, materi: string): boolean {
  if (!adalahMapelPancasila(mapel)) return false;
  return /aku mengenal indonesia|mengenal indonesia|perisai pancasila/.test(
    normJudul(materi),
  );
}

export function adalahPancasila1Bab3(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulPancasila1Bab3(mapel, materi);
}

export function adalahJudulPancasila1Bab4(mapel: string, materi: string): boolean {
  if (!adalahMapelPancasila(mapel)) return false;
  return /aku dan lingkunganku|lingkunganku|aksi hijau wangi/.test(
    normJudul(materi),
  );
}

export function adalahPancasila1Bab4(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulPancasila1Bab4(mapel, materi);
}

export function cariModulBindo1Resmi(materi: string): ModulResmiPai | null {
  const judul = normJudul(materi);
  return MODUL_BINDO1_BAB1_8.find((modul) => modul.pola.test(judul)) ?? null;
}

export function cariModulBindo1DariNaskah(teks?: string): ModulResmiPai | null {
  return (
    MODUL_BINDO1_BAB1_8.find((modul) => naskahTampilanModulResmi(modul, teks)) ??
    null
  );
}

export function adalahJudulBindo1(mapel: string, materi: string): boolean {
  if (!adalahMapelBindo(mapel)) return false;
  return Boolean(cariModulBindo1Resmi(materi));
}

export function adalahBindo1(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulBindo1(mapel, materi);
}

export function cariModulBindo2Resmi(materi: string): ModulResmiPai | null {
  const judul = normJudul(materi);
  return MODUL_BINDO2_BAB1_8.find((modul) => modul.pola.test(judul)) ?? null;
}

export function cariModulBindo2DariNaskah(teks?: string): ModulResmiPai | null {
  return (
    MODUL_BINDO2_BAB1_8.find((modul) => naskahTampilanModulResmi(modul, teks)) ??
    null
  );
}

export function adalahJudulBindo2(mapel: string, materi: string): boolean {
  if (!adalahMapelBindo(mapel)) return false;
  return Boolean(cariModulBindo2Resmi(materi));
}

export function adalahBindo2(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasDuaSd(kelas)) return false;
  return adalahJudulBindo2(mapel, materi);
}

export function cariModulMtk2Resmi(materi: string): ModulResmiPai | null {
  const judul = normJudul(materi);
  return MODUL_MTK2_BAB1_8.find((modul) => modul.pola.test(judul)) ?? null;
}

export function cariModulMtk2DariNaskah(teks?: string): ModulResmiPai | null {
  return (
    MODUL_MTK2_BAB1_8.find((modul) => naskahTampilanModulResmi(modul, teks)) ??
    null
  );
}

export function adalahJudulMtk2(mapel: string, materi: string): boolean {
  if (!adalahMapelMatematika(mapel)) return false;
  return Boolean(cariModulMtk2Resmi(materi));
}

export function adalahMtk2(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasDuaSd(kelas)) return false;
  return adalahJudulMtk2(mapel, materi);
}

export function cariModulPjok1Resmi(materi: string): ModulResmiPai | null {
  const judul = normJudul(materi);
  return MODUL_PJOK1_BAB1_4.find((modul) => modul.pola.test(judul)) ?? null;
}

export function cariModulPjok1DariNaskah(teks?: string): ModulResmiPai | null {
  return (
    MODUL_PJOK1_BAB1_4.find((modul) => naskahTampilanModulResmi(modul, teks)) ??
    null
  );
}

export function adalahJudulPjok1(mapel: string, materi: string): boolean {
  if (!adalahMapelPjok(mapel)) return false;
  return Boolean(cariModulPjok1Resmi(materi));
}

export function adalahPjok1(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulPjok1(mapel, materi);
}

export function cariModulInggris1Resmi(materi: string): ModulResmiPai | null {
  const judul = normJudul(materi);
  return MODUL_INGGRIS1_BAB1_4.find((modul) => modul.pola.test(judul)) ?? null;
}

export function cariModulInggris1DariNaskah(teks?: string): ModulResmiPai | null {
  return (
    MODUL_INGGRIS1_BAB1_4.find((modul) => naskahTampilanModulResmi(modul, teks)) ??
    null
  );
}

export function adalahJudulInggris1(mapel: string, materi: string): boolean {
  if (!adalahMapelInggris(mapel)) return false;
  return Boolean(cariModulInggris1Resmi(materi));
}

export function adalahInggris1(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulInggris1(mapel, materi);
}

export function cariModulMusik1Resmi(materi: string): ModulResmiPai | null {
  const judul = normJudul(materi);
  return MODUL_MUSIK1_BAB1_4.find((modul) => modul.pola.test(judul)) ?? null;
}

export function cariModulMusik1DariNaskah(teks?: string): ModulResmiPai | null {
  return (
    MODUL_MUSIK1_BAB1_4.find((modul) => naskahTampilanModulResmi(modul, teks)) ??
    null
  );
}

export function adalahJudulMusik1(mapel: string, materi: string): boolean {
  if (!adalahMapelMusik(mapel)) return false;
  return Boolean(cariModulMusik1Resmi(materi));
}

export function adalahMusik1(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulMusik1(mapel, materi);
}

export function cariModulSeniRupa1Resmi(materi: string): ModulResmiPai | null {
  const judul = normJudul(materi);
  return MODUL_SENIRUPA1_BAB1_4.find((modul) => modul.pola.test(judul)) ?? null;
}

export function cariModulSeniRupa1DariNaskah(teks?: string): ModulResmiPai | null {
  return (
    MODUL_SENIRUPA1_BAB1_4.find((modul) => naskahTampilanModulResmi(modul, teks)) ??
    null
  );
}

export function adalahJudulSeniRupa1(mapel: string, materi: string): boolean {
  if (!adalahMapelSeniRupa(mapel)) return false;
  return Boolean(cariModulSeniRupa1Resmi(materi));
}

export function adalahSeniRupa1(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulSeniRupa1(mapel, materi);
}

export function cariModulKristen1Resmi(materi: string): ModulResmiPai | null {
  const judul = normJudul(materi);
  return MODUL_KRISTEN1_BAB1_4.find((modul) => modul.pola.test(judul)) ?? null;
}

export function cariModulKristen1DariNaskah(teks?: string): ModulResmiPai | null {
  return (
    MODUL_KRISTEN1_BAB1_4.find((modul) => naskahTampilanModulResmi(modul, teks)) ??
    null
  );
}

export function adalahJudulKristen1(mapel: string, materi: string): boolean {
  if (!adalahMapelKristen(mapel)) return false;
  return Boolean(cariModulKristen1Resmi(materi));
}

export function adalahKristen1(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulKristen1(mapel, materi);
}

export function cariModulKatolik1Resmi(materi: string): ModulResmiPai | null {
  const judul = normJudul(materi);
  return MODUL_KATOLIK1_BAB1_4.find((modul) => modul.pola.test(judul)) ?? null;
}

export function cariModulKatolik1DariNaskah(teks?: string): ModulResmiPai | null {
  return (
    MODUL_KATOLIK1_BAB1_4.find((modul) => naskahTampilanModulResmi(modul, teks)) ??
    null
  );
}

export function adalahJudulKatolik1(mapel: string, materi: string): boolean {
  if (!adalahMapelKatolik(mapel)) return false;
  return Boolean(cariModulKatolik1Resmi(materi));
}

export function adalahKatolik1(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulKatolik1(mapel, materi);
}

export function cariModulBuddha1Resmi(materi: string): ModulResmiPai | null {
  const judul = normJudul(materi);
  return MODUL_BUDDHA1_BAB1_4.find((modul) => modul.pola.test(judul)) ?? null;
}

export function cariModulBuddha1DariNaskah(teks?: string): ModulResmiPai | null {
  return (
    MODUL_BUDDHA1_BAB1_4.find((modul) => naskahTampilanModulResmi(modul, teks)) ??
    null
  );
}

export function adalahJudulBuddha1(mapel: string, materi: string): boolean {
  if (!adalahMapelBuddha(mapel)) return false;
  return Boolean(cariModulBuddha1Resmi(materi));
}

export function adalahBuddha1(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulBuddha1(mapel, materi);
}

export function cariModulHindu1Resmi(materi: string): ModulResmiPai | null {
  const judul = normJudul(materi);
  return MODUL_HINDU1_BAB1_4.find((modul) => modul.pola.test(judul)) ?? null;
}

export function cariModulHindu1DariNaskah(teks?: string): ModulResmiPai | null {
  return (
    MODUL_HINDU1_BAB1_4.find((modul) => naskahTampilanModulResmi(modul, teks)) ??
    null
  );
}

export function adalahJudulHindu1(mapel: string, materi: string): boolean {
  if (!adalahMapelHindu(mapel)) return false;
  return Boolean(cariModulHindu1Resmi(materi));
}

export function adalahHindu1(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulHindu1(mapel, materi);
}

export function cariModulKhonghucu1Resmi(materi: string): ModulResmiPai | null {
  const judul = normJudul(materi);
  return MODUL_KHONGHUCU1_BAB1_4.find((modul) => modul.pola.test(judul)) ?? null;
}

export function cariModulKhonghucu1DariNaskah(teks?: string): ModulResmiPai | null {
  return (
    MODUL_KHONGHUCU1_BAB1_4.find((modul) => naskahTampilanModulResmi(modul, teks)) ??
    null
  );
}

export function adalahJudulKhonghucu1(mapel: string, materi: string): boolean {
  if (!adalahMapelKhonghucu(mapel)) return false;
  return Boolean(cariModulKhonghucu1Resmi(materi));
}

export function adalahKhonghucu1(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulKhonghucu1(mapel, materi);
}

export function cariModulPai2Resmi(materi: string): ModulResmiPai | null {
  const judul = normJudul(materi);
  return MODUL_PAI2_BAB1_5.find((modul) => modul.pola.test(judul)) ?? null;
}

export function cariModulPai2DariNaskah(teks?: string): ModulResmiPai | null {
  return (
    MODUL_PAI2_BAB1_5.find((modul) => naskahTampilanModulResmi(modul, teks)) ??
    null
  );
}

export function adalahJudulPai2(mapel: string, materi: string): boolean {
  if (!adalahMapelPai(mapel)) return false;
  return Boolean(cariModulPai2Resmi(materi));
}

export function adalahPai2(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasDuaSd(kelas)) return false;
  return adalahJudulPai2(mapel, materi);
}

export function adalahPai1Bab2(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulPai1Bab2(mapel, materi);
}

export type ModulTerbitPublik = {
  kelas: string;
  mapel: string;
  materi: string;
};

export function daftarNaskahResmiPublik(): ModulTerbitPublik[] {
  const pai = "Pendidikan Agama Islam dan Budi Pekerti";
  return [
    { kelas: "1 SD", mapel: pai, materi: JUDUL_PAI1_BAB1 },
    { kelas: "1 SD", mapel: pai, materi: JUDUL_PAI1_BAB2 },
    ...MODUL_PAI1_BAB3_10.map((modul) => ({
      kelas: "1 SD",
      mapel: pai,
      materi: modul.judul,
    })),
    ...MODUL_PAI2_BAB1_5.map((modul) => ({
      kelas: "2 SD",
      mapel: pai,
      materi: modul.judul,
    })),
    ...MODUL_BINDO2_BAB1_8.map((modul) => ({
      kelas: "2 SD",
      mapel: "Bahasa Indonesia",
      materi: modul.judul,
    })),
    ...MODUL_MTK2_BAB1_8.map((modul) => ({
      kelas: "2 SD",
      mapel: "Matematika",
      materi: modul.judul,
    })),
    { kelas: "1 SD", mapel: "Matematika", materi: MODUL_MTK1_BAB1.judul },
    { kelas: "1 SD", mapel: "Matematika", materi: MODUL_MTK1_BAB2.judul },
    { kelas: "1 SD", mapel: "Matematika", materi: MODUL_MTK1_BAB3.judul },
    { kelas: "1 SD", mapel: "Matematika", materi: MODUL_MTK1_BAB4.judul },
    { kelas: "1 SD", mapel: "Matematika", materi: MODUL_MTK1_BAB5.judul },
    { kelas: "1 SD", mapel: "Matematika", materi: MODUL_MTK1_BAB6.judul },
    { kelas: "1 SD", mapel: "Matematika", materi: MODUL_MTK1_BAB7.judul },
    { kelas: "1 SD", mapel: "Matematika", materi: MODUL_MTK1_BAB8.judul },
    { kelas: "1 SD", mapel: "Matematika", materi: MODUL_MTK1_BAB9.judul },
    { kelas: "1 SD", mapel: "Matematika", materi: MODUL_MTK1_BAB10.judul },
    { kelas: "1 SD", mapel: "Matematika", materi: MODUL_MTK1_BAB11.judul },
    { kelas: "1 SD", mapel: "Matematika", materi: MODUL_MTK1_BAB12.judul },
    { kelas: "1 SD", mapel: "Matematika", materi: MODUL_MTK1_BAB13.judul },
    { kelas: "1 SD", mapel: "Matematika", materi: MODUL_MTK1_BAB14.judul },
    { kelas: "1 SD", mapel: "Matematika", materi: MODUL_MTK1_BAB15.judul },
    { kelas: "3 SD", mapel: "Matematika", materi: MODUL_MTK3_BAB1.judul },
    { kelas: "3 SD", mapel: "Matematika", materi: MODUL_MTK3_BAB2.judul },
    { kelas: "3 SD", mapel: "Matematika", materi: MODUL_MTK3_PERKALIAN.judul },
    { kelas: "3 SD", mapel: "Matematika", materi: MODUL_MTK3_PEMBAGIAN.judul },
    { kelas: "3 SD", mapel: "Matematika", materi: MODUL_MTK3_PECAHAN.judul },
    { kelas: "3 SD", mapel: "Matematika", materi: MODUL_MTK3_UKUR.judul },
    { kelas: "3 SD", mapel: "Matematika", materi: MODUL_MTK3_UANG.judul },
    { kelas: "3 SD", mapel: "Matematika", materi: MODUL_MTK3_POLA.judul },
    { kelas: "3 SD", mapel: "Matematika", materi: MODUL_MTK3_KALIMAT.judul },
    { kelas: "3 SD", mapel: "Matematika", materi: MODUL_MTK3_BANGUN.judul },
    { kelas: "3 SD", mapel: "Matematika", materi: MODUL_MTK3_KELILING.judul },
    { kelas: "3 SD", mapel: "Matematika", materi: MODUL_MTK3_RUANG.judul },
    { kelas: "4 SD", mapel: "Matematika", materi: MODUL_MTK4_BAB1.judul },
    { kelas: "7 SMP", mapel: "Matematika", materi: MODUL_MTK7_BAB1.judul },
    { kelas: "3 SD", mapel: "Matematika", materi: MODUL_MTK3_BAB3.judul },
    ...MODUL_PANCASILA1_BAB1_4.map((modul) => ({
      kelas: "1 SD",
      mapel: "Pendidikan Pancasila",
      materi: modul.judul,
    })),
    ...MODUL_BINDO1_BAB1_8.map((modul) => ({
      kelas: "1 SD",
      mapel: "Bahasa Indonesia",
      materi: modul.judul,
    })),
    ...MODUL_PJOK1_BAB1_4.map((modul) => ({
      kelas: "1 SD",
      mapel: "Pendidikan Jasmani, Olahraga, dan Kesehatan",
      materi: modul.judul,
    })),
    ...MODUL_INGGRIS1_BAB1_4.map((modul) => ({
      kelas: "1 SD",
      mapel: "Bahasa Inggris",
      materi: modul.judul,
    })),
    ...MODUL_MUSIK1_BAB1_4.map((modul) => ({
      kelas: "1 SD",
      mapel: "Seni Musik",
      materi: modul.judul,
    })),
    ...MODUL_SENIRUPA1_BAB1_4.map((modul) => ({
      kelas: "1 SD",
      mapel: "Seni Rupa",
      materi: modul.judul,
    })),
    ...MODUL_KRISTEN1_BAB1_4.map((modul) => ({
      kelas: "1 SD",
      mapel: "Pendidikan Agama Kristen dan Budi Pekerti",
      materi: modul.judul,
    })),
    ...MODUL_KATOLIK1_BAB1_4.map((modul) => ({
      kelas: "1 SD",
      mapel: "Pendidikan Agama Katolik dan Budi Pekerti",
      materi: modul.judul,
    })),
    ...MODUL_BUDDHA1_BAB1_4.map((modul) => ({
      kelas: "1 SD",
      mapel: "Pendidikan Agama Buddha dan Budi Pekerti",
      materi: modul.judul,
    })),
    ...MODUL_HINDU1_BAB1_4.map((modul) => ({
      kelas: "1 SD",
      mapel: "Pendidikan Agama Hindu dan Budi Pekerti",
      materi: modul.judul,
    })),
    ...MODUL_KHONGHUCU1_BAB1_4.map((modul) => ({
      kelas: "1 SD",
      mapel: "Pendidikan Agama Khonghucu dan Budi Pekerti",
      materi: modul.judul,
    })),
  ];
}

export function naskahResmiJikaAda(
  kelas: string,
  mapel: string,
  materi: string,
): IsiCacheMateri | null {
  if (adalahPai1Bab1(kelas, mapel, materi)) return naskahPai1Bab1();
  if (adalahPai1Bab2(kelas, mapel, materi)) return naskahPai1Bab2();
  if (adalahMtk1Bab1(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_MTK1_BAB1);
  }
  if (adalahMtk1Bab2(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_MTK1_BAB2);
  }
  if (adalahMtk1Bab3(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_MTK1_BAB3);
  }
  if (adalahMtk1Bab4(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_MTK1_BAB4);
  }
  if (adalahMtk1Bab5(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_MTK1_BAB5);
  }
  if (adalahMtk1Bab6(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_MTK1_BAB6);
  }
  if (adalahMtk1Bab7(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_MTK1_BAB7);
  }
  if (adalahMtk1Bab8(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_MTK1_BAB8);
  }
  if (adalahMtk1Bab9(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_MTK1_BAB9);
  }
  if (adalahMtk1Bab10(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_MTK1_BAB10);
  }
  if (adalahMtk1Bab11(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_MTK1_BAB11);
  }
  if (adalahMtk1Bab12(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_MTK1_BAB12);
  }
  if (adalahMtk1Bab13(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_MTK1_BAB13);
  }
  if (adalahMtk1Bab14(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_MTK1_BAB14);
  }
  if (adalahMtk1Bab15(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_MTK1_BAB15);
  }
  if (adalahMtk3Bab1(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_MTK3_BAB1);
  }
  if (adalahMtk3Bab2(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_MTK3_BAB2);
  }
  if (adalahMtk3Perkalian(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_MTK3_PERKALIAN);
  }
  if (adalahMtk3Pembagian(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_MTK3_PEMBAGIAN);
  }
  if (adalahMtk3Pecahan(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_MTK3_PECAHAN);
  }
  if (adalahMtk3Ukur(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_MTK3_UKUR);
  }
  if (adalahMtk3Waktu(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_MTK3_WAKTU);
  }
  if (adalahMtk3Uang(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_MTK3_UANG);
  }
  if (adalahMtk3Pola(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_MTK3_POLA);
  }
  if (adalahMtk3Kalimat(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_MTK3_KALIMAT);
  }
  if (adalahMtk3Bangun(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_MTK3_BANGUN);
  }
  if (adalahMtk3Keliling(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_MTK3_KELILING);
  }
  if (adalahMtk3Ruang(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_MTK3_RUANG);
  }
  if (adalahMtk4Bab1(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_MTK4_BAB1);
  }
  if (adalahMtk7Bab1(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_MTK7_BAB1);
  }
  if (adalahMtk3Bab3(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_MTK3_BAB3);
  }
  if (adalahPancasila1Bab1(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_PANCASILA1_BAB1);
  }
  if (adalahPancasila1Bab2(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_PANCASILA1_BAB2);
  }
  if (adalahPancasila1Bab3(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_PANCASILA1_BAB3);
  }
  if (adalahPancasila1Bab4(kelas, mapel, materi)) {
    return isiCacheDariModulResmi(MODUL_PANCASILA1_BAB4);
  }
  if (adalahBindo2(kelas, mapel, materi)) {
    const bindo2 = cariModulBindo2Resmi(materi);
    if (bindo2) return isiCacheDariModulResmi(bindo2);
  }
  if (adalahMtk2(kelas, mapel, materi)) {
    const mtk2 = cariModulMtk2Resmi(materi);
    if (mtk2) return isiCacheDariModulResmi(mtk2);
  }
  if (adalahBindo1(kelas, mapel, materi)) {
    const bindo = cariModulBindo1Resmi(materi);
    if (bindo) return isiCacheDariModulResmi(bindo);
  }
  if (adalahPjok1(kelas, mapel, materi)) {
    const pjok = cariModulPjok1Resmi(materi);
    if (pjok) return isiCacheDariModulResmi(pjok);
  }
  if (adalahInggris1(kelas, mapel, materi)) {
    const inggris = cariModulInggris1Resmi(materi);
    if (inggris) return isiCacheDariModulResmi(inggris);
  }
  if (adalahMusik1(kelas, mapel, materi)) {
    const musik = cariModulMusik1Resmi(materi);
    if (musik) return isiCacheDariModulResmi(musik);
  }
  if (adalahSeniRupa1(kelas, mapel, materi)) {
    const senirupa = cariModulSeniRupa1Resmi(materi);
    if (senirupa) return isiCacheDariModulResmi(senirupa);
  }
  if (adalahKristen1(kelas, mapel, materi)) {
    const kristen = cariModulKristen1Resmi(materi);
    if (kristen) return isiCacheDariModulResmi(kristen);
  }
  if (adalahKatolik1(kelas, mapel, materi)) {
    const katolik = cariModulKatolik1Resmi(materi);
    if (katolik) return isiCacheDariModulResmi(katolik);
  }
  if (adalahBuddha1(kelas, mapel, materi)) {
    const buddha = cariModulBuddha1Resmi(materi);
    if (buddha) return isiCacheDariModulResmi(buddha);
  }
  if (adalahHindu1(kelas, mapel, materi)) {
    const hindu = cariModulHindu1Resmi(materi);
    if (hindu) return isiCacheDariModulResmi(hindu);
  }
  if (adalahKhonghucu1(kelas, mapel, materi)) {
    const khonghucu = cariModulKhonghucu1Resmi(materi);
    if (khonghucu) return isiCacheDariModulResmi(khonghucu);
  }
  if (adalahPai2(kelas, mapel, materi)) {
    const pai2 = cariModulPai2Resmi(materi);
    if (pai2) return isiCacheDariModulResmi(pai2);
  }
  if (!kelasSatuSd(kelas) || !adalahMapelPai(mapel)) return null;
  const modul = cariModulPai1Resmi(materi);
  return modul ? isiCacheDariModulResmi(modul) : null;
}

export function naskahTampilanResmi(teks?: string): boolean {
  if (naskahTampilanPai1Bab1(teks) || naskahTampilanPai1Bab2(teks)) return true;
  if (naskahTampilanModulResmi(MODUL_MTK1_BAB1, teks)) return true;
  if (naskahTampilanModulResmi(MODUL_MTK1_BAB2, teks)) return true;
  if (naskahTampilanModulResmi(MODUL_MTK1_BAB3, teks)) return true;
  if (naskahTampilanModulResmi(MODUL_MTK1_BAB4, teks)) return true;
  if (naskahTampilanModulResmi(MODUL_MTK1_BAB5, teks)) return true;
  if (naskahTampilanModulResmi(MODUL_MTK1_BAB6, teks)) return true;
  if (naskahTampilanModulResmi(MODUL_MTK1_BAB7, teks)) return true;
  if (naskahTampilanModulResmi(MODUL_MTK1_BAB8, teks)) return true;
  if (naskahTampilanModulResmi(MODUL_MTK1_BAB9, teks)) return true;
  if (naskahTampilanModulResmi(MODUL_MTK1_BAB10, teks)) return true;
  if (naskahTampilanModulResmi(MODUL_MTK1_BAB11, teks)) return true;
  if (naskahTampilanModulResmi(MODUL_MTK1_BAB12, teks)) return true;
  if (naskahTampilanModulResmi(MODUL_MTK1_BAB13, teks)) return true;
  if (naskahTampilanModulResmi(MODUL_MTK1_BAB14, teks)) return true;
  if (naskahTampilanModulResmi(MODUL_MTK1_BAB15, teks)) return true;
  if (naskahTampilanModulResmi(MODUL_MTK3_BAB1, teks)) return true;
  if (naskahTampilanModulResmi(MODUL_MTK4_BAB1, teks)) return true;
  if (naskahTampilanModulResmi(MODUL_MTK3_BAB2, teks)) return true;
  if (naskahTampilanModulResmi(MODUL_MTK3_PERKALIAN, teks)) return true;
  if (naskahTampilanModulResmi(MODUL_MTK3_PEMBAGIAN, teks)) return true;
  if (naskahTampilanModulResmi(MODUL_MTK3_PECAHAN, teks)) return true;
  if (naskahTampilanModulResmi(MODUL_MTK3_UKUR, teks)) return true;
  if (naskahTampilanModulResmi(MODUL_MTK3_BAB3, teks)) return true;
  if (MODUL_PANCASILA1_BAB1_4.some((modul) => naskahTampilanModulResmi(modul, teks))) {
    return true;
  }
  if (MODUL_BINDO1_BAB1_8.some((modul) => naskahTampilanModulResmi(modul, teks))) {
    return true;
  }
  if (MODUL_BINDO2_BAB1_8.some((modul) => naskahTampilanModulResmi(modul, teks))) {
    return true;
  }
  if (MODUL_MTK2_BAB1_8.some((modul) => naskahTampilanModulResmi(modul, teks))) {
    return true;
  }
  if (MODUL_PJOK1_BAB1_4.some((modul) => naskahTampilanModulResmi(modul, teks))) {
    return true;
  }
  if (MODUL_INGGRIS1_BAB1_4.some((modul) => naskahTampilanModulResmi(modul, teks))) {
    return true;
  }
  if (MODUL_MUSIK1_BAB1_4.some((modul) => naskahTampilanModulResmi(modul, teks))) {
    return true;
  }
  if (MODUL_SENIRUPA1_BAB1_4.some((modul) => naskahTampilanModulResmi(modul, teks))) {
    return true;
  }
  if (MODUL_KRISTEN1_BAB1_4.some((modul) => naskahTampilanModulResmi(modul, teks))) {
    return true;
  }
  if (MODUL_KATOLIK1_BAB1_4.some((modul) => naskahTampilanModulResmi(modul, teks))) {
    return true;
  }
  if (MODUL_BUDDHA1_BAB1_4.some((modul) => naskahTampilanModulResmi(modul, teks))) {
    return true;
  }
  if (MODUL_HINDU1_BAB1_4.some((modul) => naskahTampilanModulResmi(modul, teks))) {
    return true;
  }
  if (MODUL_KHONGHUCU1_BAB1_4.some((modul) => naskahTampilanModulResmi(modul, teks))) {
    return true;
  }
  if (MODUL_PAI2_BAB1_5.some((modul) => naskahTampilanModulResmi(modul, teks))) {
    return true;
  }
  return MODUL_PAI1_BAB3_10.some((modul) => naskahTampilanModulResmi(modul, teks));
}

export function teksLisanResmiJikaAda(teks?: string): string | null {
  if (naskahTampilanPai1Bab1(teks)) return null;
  if (naskahTampilanPai1Bab2(teks)) return null;
  if (naskahTampilanModulResmi(MODUL_MTK1_BAB1, teks)) {
    return teksLisanModulResmi(MODUL_MTK1_BAB1);
  }
  if (naskahTampilanModulResmi(MODUL_MTK1_BAB2, teks)) {
    return teksLisanModulResmi(MODUL_MTK1_BAB2);
  }
  if (naskahTampilanModulResmi(MODUL_MTK1_BAB3, teks)) {
    return teksLisanModulResmi(MODUL_MTK1_BAB3);
  }
  if (naskahTampilanModulResmi(MODUL_MTK1_BAB4, teks)) {
    return teksLisanModulResmi(MODUL_MTK1_BAB4);
  }
  if (naskahTampilanModulResmi(MODUL_MTK1_BAB5, teks)) {
    return teksLisanModulResmi(MODUL_MTK1_BAB5);
  }
  if (naskahTampilanModulResmi(MODUL_MTK1_BAB6, teks)) {
    return teksLisanModulResmi(MODUL_MTK1_BAB6);
  }
  if (naskahTampilanModulResmi(MODUL_MTK1_BAB7, teks)) {
    return teksLisanModulResmi(MODUL_MTK1_BAB7);
  }
  if (naskahTampilanModulResmi(MODUL_MTK1_BAB8, teks)) {
    return teksLisanModulResmi(MODUL_MTK1_BAB8);
  }
  if (naskahTampilanModulResmi(MODUL_MTK1_BAB9, teks)) {
    return teksLisanModulResmi(MODUL_MTK1_BAB9);
  }
  if (naskahTampilanModulResmi(MODUL_MTK1_BAB10, teks)) {
    return teksLisanModulResmi(MODUL_MTK1_BAB10);
  }
  if (naskahTampilanModulResmi(MODUL_MTK1_BAB11, teks)) {
    return teksLisanModulResmi(MODUL_MTK1_BAB11);
  }
  if (naskahTampilanModulResmi(MODUL_MTK1_BAB12, teks)) {
    return teksLisanModulResmi(MODUL_MTK1_BAB12);
  }
  if (naskahTampilanModulResmi(MODUL_MTK1_BAB13, teks)) {
    return teksLisanModulResmi(MODUL_MTK1_BAB13);
  }
  if (naskahTampilanModulResmi(MODUL_MTK1_BAB14, teks)) {
    return teksLisanModulResmi(MODUL_MTK1_BAB14);
  }
  if (naskahTampilanModulResmi(MODUL_MTK1_BAB15, teks)) {
    return teksLisanModulResmi(MODUL_MTK1_BAB15);
  }
  if (naskahTampilanModulResmi(MODUL_MTK3_BAB1, teks)) {
    return teksLisanModulResmi(MODUL_MTK3_BAB1);
  }
  if (naskahTampilanModulResmi(MODUL_MTK4_BAB1, teks)) {
    return teksLisanModulResmi(MODUL_MTK4_BAB1);
  }
  if (naskahTampilanModulResmi(MODUL_MTK3_BAB2, teks)) {
    return teksLisanModulResmi(MODUL_MTK3_BAB2);
  }
  if (naskahTampilanModulResmi(MODUL_MTK3_PERKALIAN, teks)) {
    return teksLisanModulResmi(MODUL_MTK3_PERKALIAN);
  }
  if (naskahTampilanModulResmi(MODUL_MTK3_PEMBAGIAN, teks)) {
    return teksLisanModulResmi(MODUL_MTK3_PEMBAGIAN);
  }
  if (naskahTampilanModulResmi(MODUL_MTK3_PECAHAN, teks)) {
    return teksLisanModulResmi(MODUL_MTK3_PECAHAN);
  }
  if (naskahTampilanModulResmi(MODUL_MTK3_UKUR, teks)) {
    return teksLisanModulResmi(MODUL_MTK3_UKUR);
  }
  if (naskahTampilanModulResmi(MODUL_MTK3_BAB3, teks)) {
    return teksLisanModulResmi(MODUL_MTK3_BAB3);
  }
  const pancasila = MODUL_PANCASILA1_BAB1_4.find((item) =>
    naskahTampilanModulResmi(item, teks),
  );
  if (pancasila) return teksLisanModulResmi(pancasila);
  const bindo2 = MODUL_BINDO2_BAB1_8.find((item) =>
    naskahTampilanModulResmi(item, teks),
  );
  if (bindo2) return teksLisanModulResmi(bindo2);
  const mtk2 = MODUL_MTK2_BAB1_8.find((item) =>
    naskahTampilanModulResmi(item, teks),
  );
  if (mtk2) return teksLisanModulResmi(mtk2);
  const bindo = MODUL_BINDO1_BAB1_8.find((item) =>
    naskahTampilanModulResmi(item, teks),
  );
  if (bindo) return teksLisanModulResmi(bindo);
  const pjok = MODUL_PJOK1_BAB1_4.find((item) =>
    naskahTampilanModulResmi(item, teks),
  );
  if (pjok) return teksLisanModulResmi(pjok);
  const inggris = MODUL_INGGRIS1_BAB1_4.find((item) =>
    naskahTampilanModulResmi(item, teks),
  );
  if (inggris) return teksLisanModulResmi(inggris);
  const musik = MODUL_MUSIK1_BAB1_4.find((item) =>
    naskahTampilanModulResmi(item, teks),
  );
  if (musik) return teksLisanModulResmi(musik);
  const senirupa = MODUL_SENIRUPA1_BAB1_4.find((item) =>
    naskahTampilanModulResmi(item, teks),
  );
  if (senirupa) return teksLisanModulResmi(senirupa);
  const kristen = MODUL_KRISTEN1_BAB1_4.find((item) =>
    naskahTampilanModulResmi(item, teks),
  );
  if (kristen) return teksLisanModulResmi(kristen);
  const katolik = MODUL_KATOLIK1_BAB1_4.find((item) =>
    naskahTampilanModulResmi(item, teks),
  );
  if (katolik) return teksLisanModulResmi(katolik);
  const buddha = MODUL_BUDDHA1_BAB1_4.find((item) =>
    naskahTampilanModulResmi(item, teks),
  );
  if (buddha) return teksLisanModulResmi(buddha);
  const hindu = MODUL_HINDU1_BAB1_4.find((item) =>
    naskahTampilanModulResmi(item, teks),
  );
  if (hindu) return teksLisanModulResmi(hindu);
  const khonghucu = MODUL_KHONGHUCU1_BAB1_4.find((item) =>
    naskahTampilanModulResmi(item, teks),
  );
  if (khonghucu) return teksLisanModulResmi(khonghucu);
  const pai2 = MODUL_PAI2_BAB1_5.find((item) =>
    naskahTampilanModulResmi(item, teks),
  );
  if (pai2) return teksLisanModulResmi(pai2);
  const modul = MODUL_PAI1_BAB3_10.find((item) =>
    naskahTampilanModulResmi(item, teks),
  );
  return modul ? teksLisanModulResmi(modul) : null;
}

export function naskahBab1Utuh(teks?: string): boolean {
  return naskahTampilanPai1Bab1(teks);
}
