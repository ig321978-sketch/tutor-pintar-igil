import { kelasSatuSd } from "@/lib/infografis-kelas1";
import { MODUL_MTK1_BAB1 } from "@/lib/modul-resmi-mtk-1-bab1";
import { MODUL_MTK1_BAB2 } from "@/lib/modul-resmi-mtk-1-bab2";
import { MODUL_MTK1_BAB3 } from "@/lib/modul-resmi-mtk-1-bab3";
import { MODUL_MTK1_BAB4 } from "@/lib/modul-resmi-mtk-1-bab4";
import {
  adalahMtk1Bab1,
  adalahMtk1Bab2,
  adalahMtk1Bab3,
  adalahMtk1Bab4,
  adalahPai1Bab1,
  adalahPai1Bab2,
  cariModulPai1Resmi,
  naskahResmiJikaAda,
} from "@/lib/naskah-resmi";

export const ID_KUIS_HIJAIYAH = [
  "hijaiyah-1-10",
  "hijaiyah-11-20",
  "hijaiyah-21-30",
] as const;

export const ID_KUIS_HARAKAT = [
  "harakat-syin-kasrah",
  "harakat-qaf-dhammah",
  "harakat-ra-fathah",
] as const;

export const ID_KUIS_FATIHAH = "fatihah-lengkap";

export const ID_KUIS_RUKUN_IMAN = [
  "iman-arti",
  "iman-jumlah",
  "iman-pertama",
] as const;

export const ID_KUIS_ASMAUL = [
  "asmaul-rahman",
  "asmaul-rahim",
  "asmaul-siapa",
] as const;

export const ID_KUIS_IMAN_AMAL = [
  "amal-terlihat",
  "amal-pensil",
  "amal-menolong",
] as const;

export const ID_KUIS_PAI1_BAB1 = [
  ...ID_KUIS_HIJAIYAH,
  ...ID_KUIS_HARAKAT,
  ID_KUIS_FATIHAH,
] as const;

export const ID_KUIS_PAI1_BAB2 = [
  ...ID_KUIS_RUKUN_IMAN,
  ...ID_KUIS_ASMAUL,
  ...ID_KUIS_IMAN_AMAL,
] as const;

export const PESAN_KUNCI_KUIS_MATERI =
  "Selesaikan semua QUIZ pada kartu Materi untuk membuka kartu ini.";

export function idKuisKartuResmi(
  modulId: string,
  kodeKartu: string,
  indeks: number,
): string {
  return `${modulId}-${kodeKartu}-${indeks}`;
}

export function idKuisTulisKartu(modulId: string, kodeKartu: string): string {
  return `${modulId}-${kodeKartu}-tulis`;
}

export const ID_KUIS_TULIS_PAI1_BAB1 = [
  idKuisTulisKartu("pai-1-bab1", "A"),
  idKuisTulisKartu("pai-1-bab1", "B"),
  idKuisTulisKartu("pai-1-bab1", "C"),
] as const;

export const ID_KUIS_TULIS_PAI1_BAB2 = [
  idKuisTulisKartu("pai-1-bab2", "A"),
  idKuisTulisKartu("pai-1-bab2", "B"),
  idKuisTulisKartu("pai-1-bab2", "C"),
] as const;

export function daftarIdKuisMateri(
  kelas: string,
  mapel: string,
  materi: string,
): string[] {
  if (!naskahResmiJikaAda(kelas, mapel, materi)) return [];
  if (adalahPai1Bab1(kelas, mapel, materi)) {
    return [...ID_KUIS_PAI1_BAB1, ...ID_KUIS_TULIS_PAI1_BAB1];
  }
  if (adalahPai1Bab2(kelas, mapel, materi)) {
    return [...ID_KUIS_PAI1_BAB2, ...ID_KUIS_TULIS_PAI1_BAB2];
  }
  if (adalahMtk1Bab1(kelas, mapel, materi)) {
    return [
      ...MODUL_MTK1_BAB1.kartu.flatMap((kartu) =>
        kartu.kuis.map((_, indeks) =>
          idKuisKartuResmi(MODUL_MTK1_BAB1.id, kartu.kode, indeks),
        ),
      ),
      ...MODUL_MTK1_BAB1.kartu.map((kartu) =>
        idKuisTulisKartu(MODUL_MTK1_BAB1.id, kartu.kode),
      ),
    ];
  }
  if (adalahMtk1Bab2(kelas, mapel, materi)) {
    return [
      ...MODUL_MTK1_BAB2.kartu.flatMap((kartu) =>
        kartu.kuis.map((_, indeks) =>
          idKuisKartuResmi(MODUL_MTK1_BAB2.id, kartu.kode, indeks),
        ),
      ),
      ...MODUL_MTK1_BAB2.kartu.map((kartu) =>
        idKuisTulisKartu(MODUL_MTK1_BAB2.id, kartu.kode),
      ),
    ];
  }
  if (adalahMtk1Bab3(kelas, mapel, materi)) {
    return [
      ...MODUL_MTK1_BAB3.kartu.flatMap((kartu) =>
        kartu.kuis.map((_, indeks) =>
          idKuisKartuResmi(MODUL_MTK1_BAB3.id, kartu.kode, indeks),
        ),
      ),
      ...MODUL_MTK1_BAB3.kartu.map((kartu) =>
        idKuisTulisKartu(MODUL_MTK1_BAB3.id, kartu.kode),
      ),
    ];
  }
  if (adalahMtk1Bab4(kelas, mapel, materi)) {
    return [
      ...MODUL_MTK1_BAB4.kartu.flatMap((kartu) =>
        kartu.kuis.map((_, indeks) =>
          idKuisKartuResmi(MODUL_MTK1_BAB4.id, kartu.kode, indeks),
        ),
      ),
      ...MODUL_MTK1_BAB4.kartu.map((kartu) =>
        idKuisTulisKartu(MODUL_MTK1_BAB4.id, kartu.kode),
      ),
    ];
  }
  if (!kelasSatuSd(kelas)) return [];
  const modul = cariModulPai1Resmi(materi);
  if (!modul) return [];
  return [
    ...modul.kartu.flatMap((kartu) =>
      kartu.kuis.map((_, indeks) =>
        idKuisKartuResmi(modul.id, kartu.kode, indeks),
      ),
    ),
    ...modul.kartu.map((kartu) => idKuisTulisKartu(modul.id, kartu.kode)),
  ];
}

export function kuisMateriSudahTuntas(
  selesai: string[],
  daftar: string[],
): boolean {
  if (daftar.length === 0) return true;
  const sudah = new Set(selesai);
  return daftar.every((id) => sudah.has(id));
}
