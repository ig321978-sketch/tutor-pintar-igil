import { pengacak } from "./acak";
import { kataBilangan } from "./kata";
import type { Bentuk, PetaMiskonsepsi, Soal } from "./tipe";
import { buatCekDengan, huruf, periksa as periksaUmum, susunPilihan } from "./umum";

/** Skill k1b2-s6: menghitung dengan lompatan di garis bilangan 0 sampai 10 (lompat satu, dua, atau tiga). */
export const SKILL_S6 = "k1b2-s6";

export const MISKONSEPSI_S6: PetaMiskonsepsi = {
  "m-ambil-satu": { deskripsi: "Menjawab angka awal atau banyak lompatan.", pesan: "Mulai dari angka awal, lalu lompat." },
  "m-hitung-dobel": { deskripsi: "Angka awal dihitung sebagai satu lompatan.", pesan: "Tempat berdiri bukan satu lompatan." },
  "m-lewat-satu": { deskripsi: "Kurang satu lompatan.", pesan: "Hitung tiap lompatan, satu per satu." },
};

/** a = angka awal, b = banyak lompatan, jawaban = a + b. */
export function buatSoal(bentuk: Bentuk, benih: number): Soal {
  const r = pengacak(benih);
  for (let coba = 0; coba < 200; coba += 1) {
    const a = r.int(1, 8);
    const b = r.int(1, 3);
    const c = a + b;
    if (c < 4 || c > 10) continue;
    const pilihan = susunPilihan(r, a, b);
    if (pilihan.length !== 4) continue;
    const suara = bentuk === "lambang" ? `Mulai dari ${kataBilangan(a)}, lompat ${kataBilangan(b)}. Hasilnya?` : `Mulai dari ${kataBilangan(a)}. Lompat ${kataBilangan(b)} langkah. Mendarat di angka berapa?`;
    return { skillId: SKILL_S6, bentuk, a, b, kunci: c, pilihan, tampil: bentuk === "lambang" ? "teks" : "garis", ikon: "🐸", kalimat: bentuk === "lambang" ? `${a} + ${b} = ?` : undefined, suara };
  }
  throw new Error("buatSoal s6: tidak menemukan pilihan");
}

export const periksa = periksaUmum;

export function langkahContoh(a: number, b: number): string[] {
  return [
    `Katak berdiri di angka ${kataBilangan(a)}.`,
    `Ia lompat ${kataBilangan(b)} langkah.`,
    "Hitung tiap lompatan satu per satu.",
    `Katak mendarat di ${kataBilangan(a + b)}.`,
  ];
}

export const buatCek = (benih: number): Soal[] => buatCekDengan(buatSoal, benih);
export { huruf };
