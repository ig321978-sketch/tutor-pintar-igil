import type { IsiCacheMateri } from "@/lib/jenis-cache-materi";
import { kelasSatuSd } from "@/lib/infografis-kelas1";
import { kunciMapelTutor, rapikanKunci } from "@/lib/kunci-siswa";
import {
  naskahPai1Bab1,
  naskahTampilanPai1Bab1,
} from "@/lib/naskah-resmi-pai-1-bab1";
import {
  naskahPai1Bab2,
  naskahTampilanPai1Bab2,
} from "@/lib/naskah-resmi-pai-1-bab2";
import { MODUL_PAI1_BAB3_10 } from "@/lib/modul-resmi-pai-1-bab3-10";
import { MODUL_MTK1_BAB1 } from "@/lib/modul-resmi-mtk-1-bab1";
import { MODUL_MTK1_BAB2 } from "@/lib/modul-resmi-mtk-1-bab2";
import {
  isiCacheDariModulResmi,
  naskahTampilanModulResmi,
  teksLisanModulResmi,
  type ModulResmiPai,
} from "@/lib/modul-resmi-pai";

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
  return /ayo\s+berhitung|ayo\s+membilang/.test(normJudul(materi));
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
  return /penjumlahan\s+sampai(\s+dengan)?\s+10/.test(normJudul(materi));
}

export function adalahMtk1Bab2(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulMtk1Bab2(mapel, materi);
}

export function adalahPai1Bab2(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulPai1Bab2(mapel, materi);
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
  if (!kelasSatuSd(kelas) || !adalahMapelPai(mapel)) return null;
  const modul = cariModulPai1Resmi(materi);
  return modul ? isiCacheDariModulResmi(modul) : null;
}

export function naskahTampilanResmi(teks?: string): boolean {
  if (naskahTampilanPai1Bab1(teks) || naskahTampilanPai1Bab2(teks)) return true;
  if (naskahTampilanModulResmi(MODUL_MTK1_BAB1, teks)) return true;
  if (naskahTampilanModulResmi(MODUL_MTK1_BAB2, teks)) return true;
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
  const modul = MODUL_PAI1_BAB3_10.find((item) =>
    naskahTampilanModulResmi(item, teks),
  );
  return modul ? teksLisanModulResmi(modul) : null;
}

export function naskahBab1Utuh(teks?: string): boolean {
  return naskahTampilanPai1Bab1(teks);
}
