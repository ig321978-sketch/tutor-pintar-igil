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

export function jumlahDua(teks: string): boolean {
  return jawab(teks, "2", "dua");
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

export function jumlahLimaBelas(teks: string): boolean {
  return jawab(teks, "15", "lima belas");
}

export function jumlahEnamBelas(teks: string): boolean {
  return jawab(teks, "16", "enam belas");
}

export function jumlahDuaPuluhEmpat(teks: string): boolean {
  return jawab(teks, "24", "dua puluh empat");
}

export function jumlahTigaPuluhDua(teks: string): boolean {
  return jawab(teks, "32", "tiga puluh dua");
}

export function jumlahDelapanBelas(teks: string): boolean {
  return jawab(teks, "18", "delapan belas");
}

export function jumlahNol(teks: string): boolean {
  return jawab(teks, "0", "nol");
}

export function jumlahDuaPuluhLima(teks: string): boolean {
  return jawab(teks, "25", "dua puluh lima");
}

export function jumlahTigaPuluh(teks: string): boolean {
  return jawab(teks, "30", "tiga puluh");
}

export function jumlahTigaPuluhLima(teks: string): boolean {
  return jawab(teks, "35", "tiga puluh lima");
}

export function jumlahEmpatPuluhLima(teks: string): boolean {
  return jawab(teks, "45", "empat puluh lima");
}

export function kataKomputer(teks: string): boolean {
  return /(?:^|\s)komputer(?:\s|$)/.test(biasa(teks));
}

export function kataPilot(teks: string): boolean {
  return /(?:^|\s)pilot(?:\s|$)/.test(biasa(teks));
}
