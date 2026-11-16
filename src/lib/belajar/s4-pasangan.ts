import { pengacak } from "./acak";
import { kataBilangan } from "./kata";
import type { Bentuk, PetaMiskonsepsi, Soal } from "./tipe";
import { buatCekDengan, huruf, periksa as periksaUmum, susunDari } from "./umum";

/** Skill k1b2-s4: pasangan bilangan (bagan seluruhnya dan sebagian), jumlah paling banyak sepuluh. */
export const SKILL_S4 = "k1b2-s4";

export const MISKONSEPSI_S4: PetaMiskonsepsi = {
  "m-ambil-satu": { deskripsi: "Menjawab seluruhnya atau sebagian yang sudah diketahui.", pesan: "Yang dicari bagian yang lain, bukan seluruhnya." },
  "m-hitung-dobel": { deskripsi: "Bagian lain terlalu banyak satu.", pesan: "Seluruhnya harus pas. Coba hitung lagi." },
  "m-lewat-satu": { deskripsi: "Bagian lain terlalu sedikit satu.", pesan: "Pelan-pelan. Jangan ada yang terlewat." },
};

/** a = sebagian yang diketahui, b = sebagian lain (jawaban), seluruhnya = a + b. */
export function buatSoal(bentuk: Bentuk, benih: number): Soal {
  const r = pengacak(benih);
  for (let coba = 0; coba < 100; coba += 1) {
    const c = r.int(5, 10);
    const b = r.int(2, c - 1);
    const a = c - b;
    const pilihan = susunDari(r, b, [
      [c, "m-ambil-satu"],
      [a, "m-ambil-satu"],
      [b + 1, "m-hitung-dobel"],
      [b - 1, "m-lewat-satu"],
    ]);
    if (pilihan.length !== 4) continue;
    const suara =
      bentuk === "benda"
        ? `${huruf(kataBilangan(c))} apel semuanya. ${huruf(kataBilangan(a))} di piring. Yang di keranjang berapa?`
        : bentuk === "diagram"
          ? `${huruf(kataBilangan(c))} titik semuanya. ${huruf(kataBilangan(a))} berwarna merah. Yang biru berapa?`
          : `${huruf(kataBilangan(c))} sama dengan ${kataBilangan(a)} ditambah berapa?`;
    return { skillId: SKILL_S4, bentuk, a, b, kunci: b, pilihan, tampil: bentuk === "lambang" ? "teks" : "bagan", kalimat: bentuk === "lambang" ? `${c} = ${a} + ?` : undefined, suara };
  }
  throw new Error("buatSoal s4: tidak menemukan pilihan");
}

export const periksa = periksaUmum;

export function langkahContoh(a: number, b: number): string[] {
  return [
    `Seluruhnya ${kataBilangan(a + b)}.`,
    `Sebagian sudah ${kataBilangan(a)}.`,
    "Cari bagian lainnya sampai pas.",
    `Bagian lainnya ${kataBilangan(b)}.`,
  ];
}

export const buatCek = (benih: number): Soal[] => buatCekDengan(buatSoal, benih);
