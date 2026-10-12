import { naskahResmiJikaAda } from "../src/lib/naskah-resmi";
import { JUDUL_MTK1_BAB8 } from "../src/lib/modul-resmi-mtk-1-bab8";

const KELAS = "1 SD";
const MAPEL = "Matematika";
const JUDUL = [JUDUL_MTK1_BAB8];

const hasil = JUDUL.map((judul) => {
  const isi = naskahResmiJikaAda(KELAS, MAPEL, judul);
  if (!isi) throw new Error(`Naskah resmi tidak ketemu: ${judul}`);
  return { judul, isi };
});

process.stdout.write(JSON.stringify(hasil));
