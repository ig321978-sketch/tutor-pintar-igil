import { pengacak } from "./acak";
import { kataBilangan } from "./kata";
import type { Bentuk, PetaMiskonsepsi, Soal } from "./tipe";
import { buatCekDengan, huruf, periksa as periksaUmum, susunPilihan } from "./umum";

/** Skill k1b2-s9: soal cerita penjumlahan satu langkah, dengan empat langkah pahami, rencanakan, kerjakan, periksa. */
export const SKILL_S9 = "k1b2-s9";

export const MISKONSEPSI_S9: PetaMiskonsepsi = {
  "m-ambil-satu": { deskripsi: "Menjawab satu bilangan di cerita saja.", pesan: "Hitung semua yang ada di cerita." },
  "m-hitung-dobel": { deskripsi: "Hasil terlalu besar satu.", pesan: "Periksa lagi. Tiap benda dihitung sekali." },
  "m-lewat-satu": { deskripsi: "Hasil terlalu kecil satu.", pesan: "Periksa lagi. Jangan ada yang terlewat." },
};

const BUAH = [
  { kata: "apel", ikon: "🍎" },
  { kata: "jeruk", ikon: "🍊" },
  { kata: "mangga", ikon: "🥭" },
];
const LAIN = [
  { kata: "ikan", ikon: "🐟" },
  { kata: "kue", ikon: "🍰" },
];
const NAMA = ["Lintang", "Niko", "Tala"];

export function buatSoal(bentuk: Bentuk, benih: number): Soal {
  const r = pengacak(benih);
  const a = r.int(1, 8);
  const b = r.int(Math.max(1, 4 - a), Math.min(8, 10 - a));
  const pilihan = susunPilihan(r, a, b);
  const jenisBuah = r.int(0, 4) < 3;
  const benda = jenisBuah ? BUAH[r.int(0, BUAH.length - 1)] : LAIN[r.int(0, LAIN.length - 1)];
  const templat = jenisBuah ? r.int(0, 2) : r.int(0, 1);
  const [n1, n2] = r.kocok(NAMA);
  const A = kataBilangan(a);
  const B = kataBilangan(b);
  const k = benda.kata;
  const suara = [
    `${n1} punya ${A} ${k}. ${n2} memberi ${B} ${k}. Berapa ${k} ${n1} sekarang?`,
    `Di perahu ada ${A} ${k}. Di keranjang ada ${B} ${k}. Berapa ${k} semuanya?`,
    `${n1} memetik ${A} ${k} pagi hari. Sore hari memetik ${B} lagi. Berapa semuanya?`,
  ][templat];
  return { skillId: SKILL_S9, bentuk, a, b, kunci: a + b, pilihan, tampil: bentuk === "lambang" ? "teks" : "kelompok", ikon: benda.ikon, suara };
}

export const periksa = periksaUmum;

/** Empat langkah Polya. */
export function langkahContoh(a: number, b: number): string[] {
  return [
    `Pahami: ada ${kataBilangan(a)} dan ${kataBilangan(b)}.`,
    "Rencanakan: gabungkan keduanya.",
    "Kerjakan: hitung semuanya.",
    `Periksa: hasilnya ${kataBilangan(a + b)} masuk akal.`,
  ];
}

export const buatCek = (benih: number): Soal[] => buatCekDengan(buatSoal, benih);
export { huruf };
