import { naskahResmiJikaAda } from "../src/lib/naskah-resmi";
import { JUDUL_PANCASILA1_BAB1 } from "../src/lib/modul-resmi-pancasila-1-bab1";
import { JUDUL_PANCASILA1_BAB2 } from "../src/lib/modul-resmi-pancasila-1-bab2";
import { JUDUL_PANCASILA1_BAB3 } from "../src/lib/modul-resmi-pancasila-1-bab3";
import { JUDUL_PANCASILA1_BAB4 } from "../src/lib/modul-resmi-pancasila-1-bab4";

const KELAS = "1 SD";
const MAPEL = "Pendidikan Pancasila";
const JUDUL = [
  JUDUL_PANCASILA1_BAB1,
  JUDUL_PANCASILA1_BAB2,
  JUDUL_PANCASILA1_BAB3,
  JUDUL_PANCASILA1_BAB4,
];

const hasil = JUDUL.map((judul) => {
  const isi = naskahResmiJikaAda(KELAS, MAPEL, judul);
  if (!isi) throw new Error(`Naskah resmi tidak ketemu: ${judul}`);
  return { judul, isi };
});

process.stdout.write(JSON.stringify(hasil));
