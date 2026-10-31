import { kumpulanAngka } from "@/lib/nilai-mtk-5-bab2";
import { normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";

function biasa(teks: string): string {
  return normalisasiJawabanTulis(teks);
}

function angkaBersih(teks: string): string[] {
  let sisa = ` ${biasa(teks)} `;
  const tambahan: string[] = [];
  if (sisa.includes(" tiga belas ")) {
    tambahan.push("13");
    sisa = sisa.replace(/ tiga belas /g, " ");
  }
  return [...kumpulanAngka(sisa), ...tambahan];
}

function memuat(teks: string, jawaban: string, boleh: string[]): boolean {
  const daftar = angkaBersih(teks);
  if (!daftar.includes(jawaban)) return false;
  return daftar.every((item) => item === jawaban || boleh.includes(item));
}

export function jawab2(teks: string): boolean {
  return memuat(teks, "2", ["10", "4"]);
}

export function jawab3(teks: string): boolean {
  return memuat(teks, "3", ["4", "7", "9"]);
}

export function jawab5(teks: string): boolean {
  return memuat(teks, "5", []);
}

export function jawab6(teks: string): boolean {
  return memuat(teks, "6", ["15", "9"]);
}

export function jawab8(teks: string): boolean {
  return memuat(teks, "8", ["22", "14"]);
}

export function jawab13(teks: string): boolean {
  return memuat(teks, "13", ["7", "6"]);
}

export function jawab15(teks: string): boolean {
  return memuat(teks, "15", ["6", "4", "5"]);
}

export function jawab20(teks: string): boolean {
  return memuat(teks, "20", ["4", "5"]);
}

export function jawab24(teks: string): boolean {
  return memuat(teks, "24", ["6", "4"]);
}

export function jawabBiru(teks: string): boolean {
  const k = biasa(teks);
  if (/\b(kuning|hijau|merah)\b/.test(k)) return false;
  return k.includes("biru");
}

export function jawabKuning(teks: string): boolean {
  const k = biasa(teks);
  if (/\bbiru\b/.test(k) && !k.includes("kuning")) return false;
  return k.includes("kuning") || k.includes("reza");
}

export function jawabPerkutut(teks: string): boolean {
  const k = biasa(teks);
  if (k.includes("merpati") || k.includes("jalak")) return false;
  return k.includes("perkutut") || memuat(teks, "15", []);
}
