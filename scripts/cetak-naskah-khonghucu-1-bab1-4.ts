import { naskahResmiJikaAda } from "../src/lib/naskah-resmi";
import { MODUL_KHONGHUCU1_BAB1_4 } from "../src/lib/modul-resmi-khonghucu-1";

const KELAS = "1 SD";
const MAPEL = "Pendidikan Agama Khonghucu dan Budi Pekerti";
const JUDUL = MODUL_KHONGHUCU1_BAB1_4.map((modul) => modul.judul);

const hasil = JUDUL.map((judul) => {
  const isi = naskahResmiJikaAda(KELAS, MAPEL, judul);
  if (!isi) throw new Error(`Naskah resmi tidak ketemu: ${judul}`);
  return { judul, isi };
});

process.stdout.write(JSON.stringify(hasil));
