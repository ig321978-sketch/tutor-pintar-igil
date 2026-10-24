import { normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";
import { angkaUtuh } from "@/lib/nilai-mtk-3-bab1";

function biasa(teks: string): string {
  return normalisasiJawabanTulis(teks);
}

function kataUtuh(teks: string, kata: string): boolean {
  const aman = kata.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(
    `(?:^|\\s)${aman}(?!\\s+(?:satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan|belas|puluh|ratus|ribu))(?:\\s|$)`,
  ).test(biasa(teks));
}

function jawab(teks: string, angka: string, kata: string): boolean {
  return angkaUtuh(teks, angka) || kataUtuh(teks, kata);
}

export function luasDelapan(teks: string): boolean {
  return jawab(teks, "8", "delapan");
}

export function luasDuaBelas(teks: string): boolean {
  return jawab(teks, "12", "dua belas");
}

export function literSatu(teks: string): boolean {
  return jawab(teks, "1", "satu");
}

export function literEmpat(teks: string): boolean {
  return jawab(teks, "4", "empat");
}

export function volumeEnamBelas(teks: string): boolean {
  return jawab(teks, "16", "enam belas");
}

export function luasDuaPuluhEmpat(teks: string): boolean {
  return jawab(teks, "24", "dua puluh empat");
}

export function luasDuaPuluh(teks: string): boolean {
  return jawab(teks, "20", "dua puluh");
}

export function luasDuaPuluhSatu(teks: string): boolean {
  return jawab(teks, "21", "dua puluh satu");
}

export function luasDuaPuluhRibu(teks: string): boolean {
  return jawab(teks, "20000", "dua puluh ribu");
}

export function volumeSembilan(teks: string): boolean {
  return jawab(teks, "9", "sembilan");
}

export function volumeEnam(teks: string): boolean {
  return jawab(teks, "6", "enam");
}

export function volumeLimaBelas(teks: string): boolean {
  return jawab(teks, "15", "lima belas");
}

export function volumeDuaRibu(teks: string): boolean {
  return jawab(teks, "2000", "dua ribu");
}

export function luasTigaPuluhEnam(teks: string): boolean {
  return jawab(teks, "36", "tiga puluh enam");
}

export function literTujuh(teks: string): boolean {
  return jawab(teks, "7", "tujuh");
}

export function luasSepuluhRibu(teks: string): boolean {
  return jawab(teks, "10000", "sepuluh ribu");
}
