import { kelasSatuSd } from "@/lib/infografis-kelas1";
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
import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import {
  adalahMtk1Bab1,
  adalahMtk1Bab2,
  adalahMtk1Bab3,
  adalahMtk1Bab4,
  adalahMtk1Bab5,
  adalahMtk1Bab6,
  adalahMtk1Bab7,
  adalahMtk1Bab8,
  adalahMtk1Bab9,
  adalahMtk1Bab10,
  adalahPancasila1Bab1,
  adalahPancasila1Bab2,
  adalahPancasila1Bab3,
  adalahPancasila1Bab4,
  adalahBindo1,
  adalahBindo2,
  adalahMtk2,
  adalahPjok1,
  adalahInggris1,
  adalahMusik1,
  adalahSeniRupa1,
  adalahKristen1,
  adalahKatolik1,
  adalahBuddha1,
  adalahHindu1,
  adalahKhonghucu1,
  adalahPai2,
  adalahPai1Bab1,
  adalahPai1Bab2,
  cariModulBindo1Resmi,
  cariModulBindo2Resmi,
  cariModulMtk2Resmi,
  cariModulPjok1Resmi,
  cariModulInggris1Resmi,
  cariModulMusik1Resmi,
  cariModulSeniRupa1Resmi,
  cariModulKristen1Resmi,
  cariModulKatolik1Resmi,
  cariModulBuddha1Resmi,
  cariModulHindu1Resmi,
  cariModulKhonghucu1Resmi,
  cariModulPai2Resmi,
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

function idKuisDariModulResmi(modul: ModulResmiPai): string[] {
  return [
    ...modul.kartu.flatMap((kartu) =>
      kartu.kuis.map((_, indeks) =>
        idKuisKartuResmi(modul.id, kartu.kode, indeks),
      ),
    ),
    ...modul.kartu.map((kartu) => idKuisTulisKartu(modul.id, kartu.kode)),
  ];
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
  if (adalahMtk1Bab5(kelas, mapel, materi)) {
    return [
      ...MODUL_MTK1_BAB5.kartu.flatMap((kartu) =>
        kartu.kuis.map((_, indeks) =>
          idKuisKartuResmi(MODUL_MTK1_BAB5.id, kartu.kode, indeks),
        ),
      ),
      ...MODUL_MTK1_BAB5.kartu.map((kartu) =>
        idKuisTulisKartu(MODUL_MTK1_BAB5.id, kartu.kode),
      ),
    ];
  }
  if (adalahMtk1Bab6(kelas, mapel, materi)) {
    return [
      ...MODUL_MTK1_BAB6.kartu.flatMap((kartu) =>
        kartu.kuis.map((_, indeks) =>
          idKuisKartuResmi(MODUL_MTK1_BAB6.id, kartu.kode, indeks),
        ),
      ),
      ...MODUL_MTK1_BAB6.kartu.map((kartu) =>
        idKuisTulisKartu(MODUL_MTK1_BAB6.id, kartu.kode),
      ),
    ];
  }
  if (adalahMtk1Bab7(kelas, mapel, materi)) {
    return [
      ...MODUL_MTK1_BAB7.kartu.flatMap((kartu) =>
        kartu.kuis.map((_, indeks) =>
          idKuisKartuResmi(MODUL_MTK1_BAB7.id, kartu.kode, indeks),
        ),
      ),
      ...MODUL_MTK1_BAB7.kartu.map((kartu) =>
        idKuisTulisKartu(MODUL_MTK1_BAB7.id, kartu.kode),
      ),
    ];
  }
  if (adalahMtk1Bab8(kelas, mapel, materi)) {
    return [
      ...MODUL_MTK1_BAB8.kartu.flatMap((kartu) =>
        kartu.kuis.map((_, indeks) =>
          idKuisKartuResmi(MODUL_MTK1_BAB8.id, kartu.kode, indeks),
        ),
      ),
      ...MODUL_MTK1_BAB8.kartu.map((kartu) =>
        idKuisTulisKartu(MODUL_MTK1_BAB8.id, kartu.kode),
      ),
    ];
  }
  if (adalahMtk1Bab9(kelas, mapel, materi)) {
    return [
      ...MODUL_MTK1_BAB9.kartu.flatMap((kartu) =>
        kartu.kuis.map((_, indeks) =>
          idKuisKartuResmi(MODUL_MTK1_BAB9.id, kartu.kode, indeks),
        ),
      ),
      ...MODUL_MTK1_BAB9.kartu.map((kartu) =>
        idKuisTulisKartu(MODUL_MTK1_BAB9.id, kartu.kode),
      ),
    ];
  }
  if (adalahMtk1Bab10(kelas, mapel, materi)) {
    return [
      ...MODUL_MTK1_BAB10.kartu.flatMap((kartu) =>
        kartu.kuis.map((_, indeks) =>
          idKuisKartuResmi(MODUL_MTK1_BAB10.id, kartu.kode, indeks),
        ),
      ),
      ...MODUL_MTK1_BAB10.kartu.map((kartu) =>
        idKuisTulisKartu(MODUL_MTK1_BAB10.id, kartu.kode),
      ),
    ];
  }
  if (adalahPancasila1Bab1(kelas, mapel, materi)) {
    return idKuisDariModulResmi(MODUL_PANCASILA1_BAB1);
  }
  if (adalahPancasila1Bab2(kelas, mapel, materi)) {
    return idKuisDariModulResmi(MODUL_PANCASILA1_BAB2);
  }
  if (adalahPancasila1Bab3(kelas, mapel, materi)) {
    return idKuisDariModulResmi(MODUL_PANCASILA1_BAB3);
  }
  if (adalahPancasila1Bab4(kelas, mapel, materi)) {
    return idKuisDariModulResmi(MODUL_PANCASILA1_BAB4);
  }
  if (adalahBindo2(kelas, mapel, materi)) {
    const bindo2 = cariModulBindo2Resmi(materi);
    if (bindo2) return idKuisDariModulResmi(bindo2);
  }
  if (adalahMtk2(kelas, mapel, materi)) {
    const mtk2 = cariModulMtk2Resmi(materi);
    if (mtk2) return idKuisDariModulResmi(mtk2);
  }
  if (adalahBindo1(kelas, mapel, materi)) {
    const bindo = cariModulBindo1Resmi(materi);
    if (bindo) return idKuisDariModulResmi(bindo);
  }
  if (adalahPjok1(kelas, mapel, materi)) {
    const pjok = cariModulPjok1Resmi(materi);
    if (pjok) return idKuisDariModulResmi(pjok);
  }
  if (adalahInggris1(kelas, mapel, materi)) {
    const inggris = cariModulInggris1Resmi(materi);
    if (inggris) return idKuisDariModulResmi(inggris);
  }
  if (adalahMusik1(kelas, mapel, materi)) {
    const musik = cariModulMusik1Resmi(materi);
    if (musik) return idKuisDariModulResmi(musik);
  }
  if (adalahSeniRupa1(kelas, mapel, materi)) {
    const senirupa = cariModulSeniRupa1Resmi(materi);
    if (senirupa) return idKuisDariModulResmi(senirupa);
  }
  if (adalahKristen1(kelas, mapel, materi)) {
    const kristen = cariModulKristen1Resmi(materi);
    if (kristen) return idKuisDariModulResmi(kristen);
  }
  if (adalahKatolik1(kelas, mapel, materi)) {
    const katolik = cariModulKatolik1Resmi(materi);
    if (katolik) return idKuisDariModulResmi(katolik);
  }
  if (adalahBuddha1(kelas, mapel, materi)) {
    const buddha = cariModulBuddha1Resmi(materi);
    if (buddha) return idKuisDariModulResmi(buddha);
  }
  if (adalahHindu1(kelas, mapel, materi)) {
    const hindu = cariModulHindu1Resmi(materi);
    if (hindu) return idKuisDariModulResmi(hindu);
  }
  if (adalahKhonghucu1(kelas, mapel, materi)) {
    const khonghucu = cariModulKhonghucu1Resmi(materi);
    if (khonghucu) return idKuisDariModulResmi(khonghucu);
  }
  if (adalahPai2(kelas, mapel, materi)) {
    const pai2 = cariModulPai2Resmi(materi);
    if (pai2) return idKuisDariModulResmi(pai2);
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
