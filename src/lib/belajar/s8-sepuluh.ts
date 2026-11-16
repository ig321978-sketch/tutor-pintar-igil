import { pengacak } from "./acak";
import { kataBilangan } from "./kata";
import type { Bentuk, PetaMiskonsepsi, Soal } from "./tipe";
import { buatCekDengan, huruf, periksa as periksaUmum, susunDari } from "./umum";

/** Skill k1b2-s8: pasangan yang hasilnya sepuluh (bingkai sepuluh). */
export const SKILL_S8 = "k1b2-s8";

export const MISKONSEPSI_S8: PetaMiskonsepsi = {
  "m-ambil-satu": { deskripsi: "Menjawab yang sudah terisi atau seluruh bingkai.", pesan: "Yang dicari kotak yang masih kosong." },
  "m-hitung-dobel": { deskripsi: "Terlalu banyak satu.", pesan: "Bingkai harus penuh pas sepuluh." },
  "m-lewat-satu": { deskripsi: "Terlalu sedikit satu.", pesan: "Hitung kotak kosong satu per satu." },
};

/** a = kotak terisi, b = kotak kosong (jawaban), a + b = sepuluh. */
export function buatSoal(bentuk: Bentuk, benih: number): Soal {
  const r = pengacak(benih);
  for (let coba = 0; coba < 100; coba += 1) {
    const a = r.int(1, 9);
    const b = 10 - a;
    const pilihan = susunDari(r, b, [
      [a, "m-ambil-satu"],
      [10, "m-ambil-satu"],
      [b + 1, "m-hitung-dobel"],
      [b - 1, "m-lewat-satu"],
    ]);
    if (pilihan.length !== 4) continue;
    const suara =
      bentuk === "benda"
        ? `Bingkai sepuluh berisi ${kataBilangan(a)} apel. Berapa lagi sampai penuh?`
        : bentuk === "diagram"
          ? `Bingkai sepuluh berisi ${kataBilangan(a)} titik. Berapa lagi sampai penuh?`
          : `${huruf(kataBilangan(a))} ditambah berapa hasilnya sepuluh?`;
    return { skillId: SKILL_S8, bentuk, a, b, kunci: b, pilihan, tampil: bentuk === "lambang" ? "teks" : "bingkai", kalimat: bentuk === "lambang" ? `${a} + ? = 10` : undefined, suara };
  }
  throw new Error("buatSoal s8: tidak menemukan pilihan");
}

export const periksa = periksaUmum;

export function langkahContoh(a: number, b: number): string[] {
  return [
    `Bingkai berisi ${kataBilangan(a)}.`,
    "Hitung kotak yang masih kosong.",
    `Kosongnya ${kataBilangan(b)}.`,
    `${huruf(kataBilangan(a))} ditambah ${kataBilangan(b)} hasilnya sepuluh.`,
  ];
}

export const buatCek = (benih: number): Soal[] => buatCekDengan(buatSoal, benih);
