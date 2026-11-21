/**
 * Data Simulasi Bak Ember Kelas 4 Bab 4 Sub-Bab B "Ember Pak Anto", akhir cerita Kolam Renang Tirta Ceria.
 * Data berbeda dari Story (ember dua liter diisi gelas dua ratus lima puluh mililiter, tiga kali dua kali dua sama dengan dua belas sentimeter kubik)
 * dan dari tugas CPA. Eksplorasi bebas tanpa skor. Diuji: scripts/uji-ember-k4b4b.mjs.
 */
import { teksL, teksMl } from "./logika-cpa";

/** Tuang: ember berkapasitas `kapasitas` ml harus berisi tepat `target` ml; tiga ukuran gelas takar (ml) boleh dipakai bergantian. */
export type SasaranTuang = { kapasitas: number; target: number; takar: [number, number, number] };
export const TUANG_SIM: readonly SasaranTuang[] = [
  { kapasitas: 2000, target: 1500, takar: [100, 300, 500] },
  { kapasitas: 1000, target: 700, takar: [100, 200, 500] },
  { kapasitas: 3000, target: 2400, takar: [200, 400, 600] },
  { kapasitas: 1000, target: 900, takar: [100, 300, 500] },
];

/** Susun: alas bak `kolom` kubus kali `baris` kubus; lapisan ditumpuk sampai volume `target` cm³ (tinggi bak paling banyak `tinggiMaks` lapisan). */
export type SasaranSusun = { kolom: number; baris: number; target: number; tinggiMaks: number };
export const SUSUN_SIM: readonly SasaranSusun[] = [
  { kolom: 4, baris: 3, target: 36, tinggiMaks: 6 },
  { kolom: 5, baris: 2, target: 40, tinggiMaks: 6 },
  { kolom: 3, baris: 3, target: 27, tinggiMaks: 6 },
  { kolom: 2, baris: 4, target: 32, tinggiMaks: 6 },
];

/** Tangga: ubah `n` liter menjadi mililiter (turun) atau mililiter yang sama menjadi liter (naik); tiga pilihan hasil memuat satu hasil yang benar. Arah bergantian turun dan naik. */
export type SasaranTangga = { n: number; arah: "turun" | "naik"; pil: [string, string, string] };
export const TANGGA_SIM: readonly SasaranTangga[] = [
  { n: 6, arah: "turun", pil: ["60 ml", "6.000 ml", "600 ml"] },
  { n: 8, arah: "naik", pil: ["80 l", "800 l", "8 l"] },
  { n: 8, arah: "turun", pil: ["800 ml", "8.000 ml", "80 ml"] },
  { n: 6, arah: "naik", pil: ["60 l", "6 l", "600 l"] },
];
/** Hasil benar tangga sebagai teks pilihan. */
export const hasilTangga = (t: SasaranTangga): string => (t.arah === "turun" ? teksMl(t.n * 1000) : teksL(t.n));

export const MISI_EMBER_TEKS = "Tuang gelas takar ke ember, susun lapisan kubus, dan turuni atau naiki tangga liter. Urutannya bebas.";
