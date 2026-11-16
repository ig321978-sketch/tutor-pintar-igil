import { pengacak } from "./acak";
import { kataBilangan } from "./kata";
import type { Bentuk, PetaMiskonsepsi, Pilihan, Soal } from "./tipe";
import { buatCekDengan, huruf, periksa as periksaUmum } from "./umum";

/** Skill k1b2-s3: membaca dan menulis kalimat penjumlahan (tanda + dan =), jumlah paling banyak sepuluh. Murni, tanpa React. */
export const SKILL_S3 = "k1b2-s3";

export const MISKONSEPSI_S3: PetaMiskonsepsi = {
  "m-tanda-tukar": { deskripsi: "Tanda atau urutan bilangan tertukar: hasil ditulis atau dibaca di depan.", pesan: "Hasil ada di akhir, setelah tanda sama dengan." },
  "m-hitung-dobel": { deskripsi: "Hasil terlalu besar karena satu benda terhitung dua kali.", pesan: "Tiap benda dihitung sekali saja." },
  "m-lewat-satu": { deskripsi: "Hasil terlalu kecil karena satu benda terlewat.", pesan: "Pelan-pelan. Jangan ada yang terlewat." },
};

export const tulis = (a: number, b: number, c: number) => `${a} + ${b} = ${c}`;
export const baca = (a: number, b: number, c: number) => `${huruf(kataBilangan(a))} ditambah ${kataBilangan(b)} hasilnya adalah ${kataBilangan(c)}`;

export function buatSoal(bentuk: Bentuk, benih: number): Soal {
  const r = pengacak(benih);
  const a = r.int(1, 8);
  const b = r.int(Math.max(1, 4 - a), Math.min(8, 10 - a));
  const c = a + b;
  const lambang = bentuk === "lambang";
  const bentukKalimat = lambang ? baca : tulis;
  const tukar = lambang ? baca(c, a, b) : `${a} = ${b} + ${c}`;
  const mentah: Array<[string, string | null, number]> = [
    [bentukKalimat(a, b, c), null, c],
    [bentukKalimat(a, b, c + 1), "m-hitung-dobel", c + 1],
    [bentukKalimat(a, b, c - 1), "m-lewat-satu", c - 1],
    [tukar, "m-tanda-tukar", c],
  ];
  const acak = r.kocok(mentah);
  const pilihan: Pilihan[] = acak.map(([label, m, nilai], i) => ({ id: `p${i}`, nilai, miskonsepsi: m, label }));
  const sebut = bentuk === "benda" ? "apel" : "titik";
  const suara = lambang ? "Lihat kalimat penjumlahannya. Pilih cara membacanya." : `${huruf(kataBilangan(a))} ${sebut} dan ${kataBilangan(b)} ${sebut}. Pilih kalimatnya.`;
  return { skillId: SKILL_S3, bentuk, a, b, kunci: c, pilihan, kalimat: lambang ? tulis(a, b, c) : undefined, suara };
}

export const periksa = periksaUmum;

export function langkahContoh(a: number, b: number): string[] {
  return [
    `${huruf(kataBilangan(a))} apel dan ${kataBilangan(b)} apel.`,
    "Tanda ditambah menggabungkan keduanya.",
    "Tanda sama dengan menunjukkan hasilnya.",
    `${huruf(kataBilangan(a))} ditambah ${kataBilangan(b)} hasilnya ${kataBilangan(a + b)}.`,
  ];
}

export const buatCek = (benih: number): Soal[] => buatCekDengan(buatSoal, benih);
