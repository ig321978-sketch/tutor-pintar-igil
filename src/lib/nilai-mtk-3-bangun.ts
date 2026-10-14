import { normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";

function rapat(teks: string): string {
  return teks.toLowerCase().replace(/[.\s]/g, "");
}

function adaAngka(teks: string, jumlah: number): boolean {
  return new RegExp(`(?:^|\\D)${jumlah}(?:\\D|$)`).test(rapat(teks));
}

export function nilaiSisi(teks: string, jumlah: number, ejaan: string[], larang: string[] = []): boolean {
  if (adaAngka(teks, jumlah)) return true;
  const kalimat = normalisasiJawabanTulis(teks);
  if (larang.some((kata) => kalimat.includes(kata))) return false;
  return ejaan.some((frasa) => kalimat.includes(frasa));
}

export function nilaiJenis(teks: string, kata: string[], larang: string[] = []): boolean {
  const kalimat = normalisasiJawabanTulis(teks);
  if (larang.some((nama) => new RegExp(`\\b${nama}\\b`).test(kalimat))) return false;
  return kata.some((nama) => new RegExp(`\\b${nama}\\b`).test(kalimat));
}
