import type { Bentuk } from "./s1-gabung";

export type Bantuan = "tidak" | "petunjuk" | "contoh-ulang" | "kembali-ke-benda";

/** Bantuan dipilih dari salah beruntun. Mode belajar: tidak ada skor, hanya bantuan. */
export function pilihBantuan(salahBeruntun: number, bentuk: Bentuk): Bantuan {
  if (salahBeruntun <= 0) return "tidak";
  if (salahBeruntun === 1) return "petunjuk";
  if (salahBeruntun === 2) return "contoh-ulang";
  return bentuk === "benda" ? "contoh-ulang" : "kembali-ke-benda";
}

/** Tawarkan tantangan bila lima jawaban benar beruntun tanpa bantuan. */
export function tawarkanTantangan(benarBeruntunTanpaBantuan: number): boolean {
  return benarBeruntunTanpaBantuan >= 5;
}
