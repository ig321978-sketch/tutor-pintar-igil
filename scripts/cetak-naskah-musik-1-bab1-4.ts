import { naskahResmiJikaAda } from "../src/lib/naskah-resmi";
import { MODUL_MUSIK1_BAB1_4 } from "../src/lib/modul-resmi-musik-1";

const KELAS = "1 SD";
const MAPEL = "Seni Musik";
const JUDUL = MODUL_MUSIK1_BAB1_4.map((modul) => modul.judul);

const hasil = JUDUL.map((judul) => {
  const isi = naskahResmiJikaAda(KELAS, MAPEL, judul);
  if (!isi) throw new Error(`Naskah resmi tidak ketemu: ${judul}`);
  return { judul, isi };
});

process.stdout.write(JSON.stringify(hasil));
