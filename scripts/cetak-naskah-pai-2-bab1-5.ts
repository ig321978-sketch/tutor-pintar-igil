import { naskahResmiJikaAda } from "../src/lib/naskah-resmi";
import { MODUL_PAI2_BAB1_5 } from "../src/lib/modul-resmi-pai-2";

const KELAS = "2 SD";
const MAPEL = "Pendidikan Agama Islam dan Budi Pekerti";
const JUDUL = MODUL_PAI2_BAB1_5.map((modul) => modul.judul);

const hasil = JUDUL.map((judul) => {
  const isi = naskahResmiJikaAda(KELAS, MAPEL, judul);
  if (!isi) throw new Error(`Naskah resmi tidak ketemu: ${judul}`);
  return { judul, isi };
});

process.stdout.write(JSON.stringify(hasil));
