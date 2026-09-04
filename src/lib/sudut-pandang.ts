export type SudutPandangMateri = "kurikulum" | "global";

export type NaskahDuaSudut = {
  penjelasan: string;
  curriculum_view?: string;
  global_best_view?: string;
};

export const LABEL_SUDUT: Record<
  SudutPandangMateri,
  { pendek: string; panjang: string; ringkas: string }
> = {
  kurikulum: {
    pendek: "Kurikulum Sekolah",
    panjang: "Perspektif Kurikulum Nasional",
    ringkas: "Mengikuti uraian buku siswa Kurikulum Merdeka",
  },
  global: {
    pendek: "Cara Jenius Dunia",
    panjang: "Perspektif Standar Global",
    ringkas: "Analogi dan kerangka visual untuk memperdalam konsep",
  },
};

export function pilihPenjelasanMateri(
  modul: NaskahDuaSudut,
  sudut: SudutPandangMateri,
): string {
  if (sudut === "global") {
    return (modul.global_best_view || modul.penjelasan).trim();
  }
  return (modul.curriculum_view || modul.penjelasan).trim();
}
