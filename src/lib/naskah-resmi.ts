import type { IsiCacheMateri } from "@/lib/jenis-cache-materi";
import { kelasSatuSd } from "@/lib/infografis-kelas1";
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
import { MODUL_PANCASILA1_BAB1 } from "@/lib/modul-resmi-pancasila-1-bab1";
import { MODUL_PANCASILA1_BAB2 } from "@/lib/modul-resmi-pancasila-1-bab2";
import { MODUL_PANCASILA1_BAB3 } from "@/lib/modul-resmi-pancasila-1-bab3";
import { MODUL_PANCASILA1_BAB4 } from "@/lib/modul-resmi-pancasila-1-bab4";
import { MODUL_BINDO1_BAB1_8 } from "@/lib/modul-resmi-bindo-1";
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

export function adalahJudulMtk1Bab3(mapel: string, materi: string): boolean {
  if (!adalahMapelMatematika(mapel)) return false;
  return /pengurangan\s+sampai(\s+dengan)?\s+10/.test(normJudul(materi));
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
  const judul = normJudul(materi);
  return /mengenal\s+bentuk(\s+ruang)?/.test(judul) && !/datar/.test(judul);
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
  const judul = normJudul(materi);
  return (
    /bilangan\s+yang\s+lebih\s+besar/.test(judul) ||
    /ayo\s+membilang\s+sampai(\s+dengan)?\s+20/.test(judul)
  );
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
  const judul = normJudul(materi);
  return /nilai\s+tempat/.test(judul) || /puluhan\s+dan\s+satuan/.test(judul);
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
  return /penjumlahan\s+dan\s+pengurangan\s+sampai(\s+dengan)?\s+20/.test(
    normJudul(materi),
  );
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
  const judul = normJudul(materi);
  return (
    /mengukur\s+panjang(\s+dan\s+berat)?/.test(judul) ||
    /mengukur\s+panjang\s+benda/.test(judul) ||
    /pengukuran/.test(judul)
  );
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
  return /bentuk\s+datar/.test(normJudul(materi));
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
  const judul = normJudul(materi);
  return /pola\s+gambar/.test(judul) || /mengenal\s+diagram/.test(judul);
}

export function adalahMtk1Bab10(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  return adalahJudulMtk1Bab10(mapel, materi);
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
  if (adalahBindo1(kelas, mapel, materi)) {
    const bindo = cariModulBindo1Resmi(materi);
    if (bindo) return isiCacheDariModulResmi(bindo);
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
  if (MODUL_PANCASILA1_BAB1_4.some((modul) => naskahTampilanModulResmi(modul, teks))) {
    return true;
  }
  if (MODUL_BINDO1_BAB1_8.some((modul) => naskahTampilanModulResmi(modul, teks))) {
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
  const pancasila = MODUL_PANCASILA1_BAB1_4.find((item) =>
    naskahTampilanModulResmi(item, teks),
  );
  if (pancasila) return teksLisanModulResmi(pancasila);
  const bindo = MODUL_BINDO1_BAB1_8.find((item) =>
    naskahTampilanModulResmi(item, teks),
  );
  if (bindo) return teksLisanModulResmi(bindo);
  const modul = MODUL_PAI1_BAB3_10.find((item) =>
    naskahTampilanModulResmi(item, teks),
  );
  return modul ? teksLisanModulResmi(modul) : null;
}

export function naskahBab1Utuh(teks?: string): boolean {
  return naskahTampilanPai1Bab1(teks);
}
