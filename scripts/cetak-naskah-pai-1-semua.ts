import { naskahResmiJikaAda } from "../src/lib/naskah-resmi";

const KELAS = "1 SD";
const MAPEL = "Pendidikan Agama Islam dan Budi Pekerti";
const JUDUL = [
  "Bab 1: Aku Cinta Al-Qur’an",
  "Bab 2: Mengenal Rukun Iman",
  "Bab 3: Perilaku Terpuji (Akhlak Mulia)",
  "Bab 4: Mengenal Bersuci (Thaharah)",
  "Bab 5: Kisah Teladan Nabi Muhammad SAW",
  "Bab 6: Mengenal Surah Al-Ikhlas",
  "Bab 7: Rukun Islam",
  "Bab 8: Bersyukur dan Berterima Kasih",
  "Bab 9: Tata Cara Berwudu",
  "Bab 10: Kisah Nabi Adam AS",
];

const hasil = JUDUL.map((judul) => {
  const isi = naskahResmiJikaAda(KELAS, MAPEL, judul);
  if (!isi) throw new Error(`Naskah resmi tidak ketemu: ${judul}`);
  return { judul, isi };
});

process.stdout.write(JSON.stringify(hasil));
