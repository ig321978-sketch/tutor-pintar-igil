import { pengacak } from "./acak";
import { kataBilangan } from "./kata";
import type { Bentuk, PetaMiskonsepsi, Soal } from "./tipe";
import { buatCekDengan, huruf, periksa as periksaUmum, susunPilihan } from "./umum";

/** Skill k1b2-s1: menggabungkan dua kelompok, jumlah paling banyak sepuluh. Murni, tanpa React. */
export const SKILL_S1 = "k1b2-s1";
export type { Bentuk, Hasil, Pilihan, Soal } from "./tipe";

export const MISKONSEPSI_S1: PetaMiskonsepsi = {
  "m-ambil-satu": { deskripsi: "Hanya menghitung satu kelompok, lupa menggabung.", pesan: "Ada dua kelompok. Hitung keduanya." },
  "m-hitung-dobel": { deskripsi: "Satu benda terhitung dua kali.", pesan: "Tiap benda dihitung sekali saja." },
  "m-lewat-satu": { deskripsi: "Satu benda terlewat saat menghitung.", pesan: "Pelan-pelan. Jangan ada yang terlewat." },
};

export function buatSoal(bentuk: Bentuk, benih: number): Soal {
  const r = pengacak(benih);
  const a = r.int(1, 8);
  const b = r.int(Math.max(1, 4 - a), Math.min(8, 10 - a));
  const pilihan = susunPilihan(r, a, b);
  const sebut = bentuk === "benda" ? "apel" : bentuk === "diagram" ? "titik" : "";
  const suara =
    bentuk === "lambang"
      ? `${huruf(kataBilangan(a))} dan ${kataBilangan(b)} digabung. Jadi berapa?`
      : `${huruf(kataBilangan(a))} ${sebut} dan ${kataBilangan(b)} ${sebut} digabung. Jadi berapa?`;
  return { skillId: SKILL_S1, bentuk, a, b, kunci: a + b, pilihan, suara };
}

export const periksa = periksaUmum;

/** Contoh dikerjakan penuh (langkah dibaca Igil), lalu setengah (siswa mengisi langkah terakhir). */
export function langkahContoh(a: number, b: number): string[] {
  return [
    `${huruf(kataBilangan(a))} di kelompok pertama.`,
    `${huruf(kataBilangan(b))} di kelompok kedua.`,
    "Gabungkan, lalu hitung semuanya.",
    `Hasilnya ${kataBilangan(a + b)}.`,
  ];
}

export const buatCek = (benih: number): Soal[] => buatCekDengan(buatSoal, benih);
