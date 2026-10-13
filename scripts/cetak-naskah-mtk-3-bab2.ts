import { naskahResmiJikaAda } from "../src/lib/naskah-resmi";
import { JUDUL_MTK3_BAB2 } from "../src/lib/modul-resmi-mtk-3-bab2";

const KELAS = "3 SD";
const MAPEL = "Matematika";
const JUDUL = [JUDUL_MTK3_BAB2];

const hasil = JUDUL.map((judul) => {
  const isi = naskahResmiJikaAda(KELAS, MAPEL, judul);
  if (!isi) throw new Error(`Naskah resmi tidak ketemu: ${judul}`);
  return { judul, isi };
});

process.stdout.write(JSON.stringify(hasil));
