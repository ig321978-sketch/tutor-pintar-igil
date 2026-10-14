import { normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";

function rapat(teks: string): string {
  return teks.toLowerCase().replace(/rp/g, "").replace(/[.\s]/g, "");
}

function adaAngka(teks: string, jumlah: number): boolean {
  return new RegExp(`(?:^|\\D)${jumlah}(?:\\D|$)`).test(rapat(teks));
}

export function nilaiUang(teks: string, jumlah: number, ejaan: string[], larang: string[] = []): boolean {
  if (adaAngka(teks, jumlah)) return true;
  const kalimat = normalisasiJawabanTulis(teks);
  if (larang.some((kata) => kalimat.includes(kata))) return false;
  return ejaan.some((frasa) => kalimat.includes(frasa));
}

export function cukupAtauKurang(teks: string, jawab: "cukup" | "kurang"): boolean {
  const kalimat = normalisasiJawabanTulis(teks);
  const kurang = /\bkurang\b/.test(kalimat) || kalimat.includes("tidak cukup");
  const cukup = /\bcukup\b/.test(kalimat) && !kalimat.includes("tidak cukup") && !/\bkurang\b/.test(kalimat);
  if (jawab === "kurang") return kurang;
  return cukup || (/\bpas\b/.test(kalimat) && !kurang);
}
