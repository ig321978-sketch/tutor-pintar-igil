import { normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";
import { angkaUtuh } from "@/lib/nilai-mtk-3-bab1";

function biasa(teks: string): string {
  return normalisasiJawabanTulis(teks);
}

function frasa(teks: string, kata: string, cegah = ""): boolean {
  const aman = kata.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const lanjut = cegah
    ? `(?!\\s+${cegah.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`
    : "";
  return new RegExp(`(?:^|\\s)${aman}${lanjut}(?:\\s|$)`).test(biasa(teks));
}

function jawab(teks: string, angka: string, kata: string): boolean {
  const aman = kata.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const ejaan = new RegExp(
    `(?:^|\\s)${aman}(?!\\s+(?:satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan|belas|puluh|ratus|ribu))(?:\\s|$)`,
  ).test(biasa(teks));
  return angkaUtuh(teks, angka) || ejaan;
}

export function sisiSatu(teks: string): boolean {
  return jawab(teks, "1", "satu");
}

export function sisiDua(teks: string): boolean {
  return jawab(teks, "2", "dua");
}

export function sisiTiga(teks: string): boolean {
  return jawab(teks, "3", "tiga");
}

export function sisiEmpat(teks: string): boolean {
  return jawab(teks, "4", "empat");
}

export function sisiLima(teks: string): boolean {
  return jawab(teks, "5", "lima");
}

export function sisiEnam(teks: string): boolean {
  return jawab(teks, "6", "enam");
}

export function sisiDelapan(teks: string): boolean {
  return jawab(teks, "8", "delapan");
}

export function sisiSembilan(teks: string): boolean {
  return jawab(teks, "9", "sembilan");
}

export function namaSamaSisi(teks: string): boolean {
  return frasa(teks, "sama sisi");
}

export function namaSamaKaki(teks: string): boolean {
  return frasa(teks, "sama kaki");
}

export function namaSembarang(teks: string): boolean {
  return frasa(teks, "sembarang");
}

export function namaTrapesium(teks: string): boolean {
  return frasa(teks, "trapesium");
}

export function namaPersegi(teks: string): boolean {
  return frasa(teks, "persegi", "panjang");
}
