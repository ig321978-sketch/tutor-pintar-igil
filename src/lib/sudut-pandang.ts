import { naskahTampilanPai1Bab1 } from "@/lib/naskah-resmi-pai-1-bab1";
import { naskahTampilanPai1Bab2 } from "@/lib/naskah-resmi-pai-1-bab2";
import { teksNaskahUtuh } from "@/lib/validasi-naskah-ai";

export type SudutPandangMateri = "kurikulum" | "global";

export type NaskahDuaSudut = {
  penjelasan: string;
  curriculum_view?: string;
  global_best_view?: string;
};

export const TANDA_NASKAH_GLOBAL = "Cara cepat:";

export const LABEL_SUDUT: Record<
  SudutPandangMateri,
  { pendek: string; panjang: string; ringkas: string }
> = {
  kurikulum: {
    pendek: "Kurikulum Sekolah",
    panjang: "Perspektif Kurikulum Nasional",
    ringkas: "Pahami konsep lewat uraian buku siswa Kurikulum Merdeka",
  },
  global: {
    pendek: "Trik Percepatan",
    panjang: "Alat percepatan, bukan ulang konsep",
    ringkas: "Trik, pola, dan cara cepat ala bimbel",
  },
};

export function pilihPenjelasanMateri(
  modul: NaskahDuaSudut,
  sudut: SudutPandangMateri,
): string {
  if (sudut === "global") {
    const teks = (modul.global_best_view ?? "").trim();
    return naskahGlobalSiap(teks) ? teks : "";
  }
  return (modul.curriculum_view || modul.penjelasan || "").trim();
}

export function naskahMateriSiap(teks?: string): boolean {
  return teksNaskahUtuh(teks, { min: 40 });
}

export function naskahPunyaDiagram(teks?: string): boolean {
  return /```\s*mermaid|flowchart\s+(TD|LR)/i.test(teks ?? "");
}

export function naskahGlobalSiap(teks?: string): boolean {
  const naskah = (teks ?? "").trim();
  if (naskahTampilanPai1Bab1(naskah) || naskahTampilanPai1Bab2(naskah)) return true;
  return naskahMateriSiap(naskah) && naskah.includes(TANDA_NASKAH_GLOBAL);
}
