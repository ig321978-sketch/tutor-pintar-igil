import { naskahResmiJikaAda } from "../src/lib/naskah-resmi";
import { JUDUL_MTK1_BAB6 } from "../src/lib/modul-resmi-mtk-1-bab6";
import {
  JUDUL_MTK1_BAB7,
  JUDUL_MTK1_BAB7_ALIAS,
  JUDUL_MTK1_BAB7_LAMA,
} from "../src/lib/modul-resmi-mtk-1-bab7";
import {
  JUDUL_MTK1_BAB8,
  JUDUL_MTK1_BAB8_ALIAS,
  JUDUL_MTK1_BAB8_LAMA,
} from "../src/lib/modul-resmi-mtk-1-bab8";
import { JUDUL_MTK1_BAB9 } from "../src/lib/modul-resmi-mtk-1-bab9";
import {
  JUDUL_MTK1_BAB10,
  JUDUL_MTK1_BAB10_LAMA,
} from "../src/lib/modul-resmi-mtk-1-bab10";

const KELAS = "1 SD";
const MAPEL = "Matematika";
const JUDUL = [
  JUDUL_MTK1_BAB6,
  JUDUL_MTK1_BAB7,
  JUDUL_MTK1_BAB7_LAMA,
  JUDUL_MTK1_BAB7_ALIAS,
  JUDUL_MTK1_BAB8,
  JUDUL_MTK1_BAB8_LAMA,
  JUDUL_MTK1_BAB8_ALIAS,
  JUDUL_MTK1_BAB9,
  JUDUL_MTK1_BAB10,
  JUDUL_MTK1_BAB10_LAMA,
];

const hasil = JUDUL.map((judul) => {
  const isi = naskahResmiJikaAda(KELAS, MAPEL, judul);
  if (!isi) throw new Error(`Naskah resmi tidak ketemu: ${judul}`);
  return { judul, isi };
});

process.stdout.write(JSON.stringify(hasil));
