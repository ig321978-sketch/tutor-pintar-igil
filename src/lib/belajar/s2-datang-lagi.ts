import { pengacak } from "./acak";
import { kataBilangan } from "./kata";
import type { Bentuk, PetaMiskonsepsi, Soal } from "./tipe";
import { buatCekDengan, huruf, periksa as periksaUmum, susunPilihan } from "./umum";

/** Skill k1b2-s2: bertambah karena ada yang datang lagi, jumlah paling banyak sepuluh. Murni, tanpa React. */
export const SKILL_S2 = "k1b2-s2";

export const MISKONSEPSI_S2: PetaMiskonsepsi = {
  "m-ambil-satu": { deskripsi: "Hanya menghitung yang awal atau hanya yang datang lagi.", pesan: "Yang awal dan yang datang lagi dihitung semua." },
  "m-hitung-dobel": { deskripsi: "Satu benda terhitung dua kali.", pesan: "Tiap benda dihitung sekali saja." },
  "m-lewat-satu": { deskripsi: "Satu benda terlewat saat menghitung.", pesan: "Pelan-pelan. Jangan ada yang terlewat." },
};

export function buatSoal(bentuk: Bentuk, benih: number): Soal {
  const r = pengacak(benih);
  const a = r.int(1, 8);
  const b = r.int(Math.max(1, 4 - a), Math.min(8, 10 - a));
  const pilihan = susunPilihan(r, a, b);
  const sebut = bentuk === "benda" ? "apel" : "titik";
  const suara =
    bentuk === "lambang"
      ? `${huruf(kataBilangan(a))}, lalu datang lagi ${kataBilangan(b)}. Jadi berapa?`
      : `${huruf(kataBilangan(a))} ${sebut}. Datang lagi ${kataBilangan(b)} ${sebut}. Jadi berapa?`;
  return { skillId: SKILL_S2, bentuk, a, b, kunci: a + b, pilihan, suara };
}

export const periksa = periksaUmum;

export function langkahContoh(a: number, b: number): string[] {
  return [
    `Awalnya ada ${kataBilangan(a)}.`,
    `Datang lagi ${kataBilangan(b)}.`,
    "Hitung semuanya, yang awal dan yang baru.",
    `Hasilnya ${kataBilangan(a + b)}.`,
  ];
}

export const buatCek = (benih: number): Soal[] => buatCekDengan(buatSoal, benih);
