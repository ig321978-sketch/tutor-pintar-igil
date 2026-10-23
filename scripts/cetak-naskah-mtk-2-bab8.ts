import { naskahResmiJikaAda } from "../src/lib/naskah-resmi";
import {
  JUDUL_MTK2_BAB8,
  JUDUL_MTK2_BAB8_LAMA,
} from "../src/lib/modul-resmi-mtk-2-bab8";

const KELAS = "2 SD";
const MAPEL = "Matematika";
const JUDUL = [JUDUL_MTK2_BAB8_LAMA, JUDUL_MTK2_BAB8];

const hasil = JUDUL.map((judul) => {
  const isi = naskahResmiJikaAda(KELAS, MAPEL, judul);
  if (!isi) throw new Error(`Naskah resmi tidak ketemu: ${judul}`);
  return { judul, isi };
});

process.stdout.write(JSON.stringify(hasil));
