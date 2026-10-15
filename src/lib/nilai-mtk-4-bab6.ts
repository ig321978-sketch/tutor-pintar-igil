import { normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";
import { angkaUtuh } from "@/lib/nilai-mtk-3-bab1";

function biasa(teks: string): string {
  return normalisasiJawabanTulis(teks);
}

function jawab(teks: string, angka: string, kata: string): boolean {
  const aman = kata.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const ejaan = new RegExp(
    `(?:^|\\s)${aman}(?!\\s+(?:satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan|belas|puluh|ratus|ribu))(?:\\s|$)`,
  ).test(biasa(teks));
  return angkaUtuh(teks, angka) || ejaan;
}

export function jumlahTiga(teks: string): boolean {
  return jawab(teks, "3", "tiga");
}

export function jumlahLima(teks: string): boolean {
  return jawab(teks, "5", "lima");
}

export function jumlahEnam(teks: string): boolean {
  return jawab(teks, "6", "enam");
}

export function jumlahTujuh(teks: string): boolean {
  return jawab(teks, "7", "tujuh");
}

export function jumlahDelapan(teks: string): boolean {
  return jawab(teks, "8", "delapan");
}

export function jumlahSembilan(teks: string): boolean {
  return jawab(teks, "9", "sembilan");
}

export function jumlahSepuluh(teks: string): boolean {
  return jawab(teks, "10", "sepuluh");
}

export function jumlahSebelas(teks: string): boolean {
  return jawab(teks, "11", "sebelas");
}

export function jumlahDuaBelas(teks: string): boolean {
  return jawab(teks, "12", "dua belas");
}

export function jumlahEmpatBelas(teks: string): boolean {
  return jawab(teks, "14", "empat belas");
}

export function jumlahDelapanBelas(teks: string): boolean {
  return jawab(teks, "18", "delapan belas");
}
