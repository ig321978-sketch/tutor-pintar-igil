import { naskahResmiJikaAda } from "../src/lib/naskah-resmi";
import {
  JUDUL_MTK2_BAB5,
  JUDUL_MTK2_BAB5_LAMA,
} from "../src/lib/modul-resmi-mtk-2-bab5";

const KELAS = "2 SD";
const MAPEL = "Matematika";
const JUDUL = [JUDUL_MTK2_BAB5_LAMA, JUDUL_MTK2_BAB5];

const hasil = JUDUL.map((judul) => {
  const isi = naskahResmiJikaAda(KELAS, MAPEL, judul);
  if (!isi) throw new Error(`Naskah resmi tidak ketemu: ${judul}`);
  return { judul, isi };
});

process.stdout.write(JSON.stringify(hasil));
