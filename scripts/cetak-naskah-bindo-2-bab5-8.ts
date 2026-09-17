import { naskahResmiJikaAda } from "../src/lib/naskah-resmi";
import { MODUL_BINDO2_BAB5_8 } from "../src/lib/modul-resmi-bindo-2";

const KELAS = "2 SD";
const MAPEL = "Bahasa Indonesia";
const JUDUL = MODUL_BINDO2_BAB5_8.map((modul) => modul.judul);

const hasil = JUDUL.map((judul) => {
  const isi = naskahResmiJikaAda(KELAS, MAPEL, judul);
  if (!isi) throw new Error(`Naskah resmi tidak ketemu: ${judul}`);
  return { judul, isi };
});

process.stdout.write(JSON.stringify(hasil));
