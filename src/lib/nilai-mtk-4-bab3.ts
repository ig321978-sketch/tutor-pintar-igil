import { normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";
import { angkaUtuh } from "@/lib/nilai-mtk-3-bab1";

function biasa(teks: string): string {
  return normalisasiJawabanTulis(teks);
}

function kataUtuh(teks: string, kata: string): boolean {
  const aman = kata.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(
    `(?:^|\\s)${aman}(?!\\s+(?:satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan|belas|puluh|ratus))(?:\\s|$)`,
  ).test(biasa(teks));
}

function jawab(teks: string, angka: string, kata: string): boolean {
  return angkaUtuh(teks, angka) || kataUtuh(teks, kata);
}

export function pitaDuaPuluh(teks: string): boolean {
  return jawab(teks, "20", "dua puluh");
}

export function pitaSembilanBelas(teks: string): boolean {
  return jawab(teks, "19", "sembilan belas");
}

export function pitaEnam(teks: string): boolean {
  return jawab(teks, "6", "enam");
}

export function pitaEmpatBelas(teks: string): boolean {
  return jawab(teks, "14", "empat belas");
}

export function pitaDuaPuluhDelapan(teks: string): boolean {
  return jawab(teks, "28", "dua puluh delapan");
}

export function pitaEmpatPuluhTujuh(teks: string): boolean {
  return jawab(teks, "47", "empat puluh tujuh");
}

export function pitaEnamPuluhEnam(teks: string): boolean {
  return jawab(teks, "66", "enam puluh enam");
}

export function pitaEnamPuluhEmpat(teks: string): boolean {
  return jawab(teks, "64", "enam puluh empat");
}

export function pitaDelapanBelas(teks: string): boolean {
  return jawab(teks, "18", "delapan belas");
}

export function pitaDuaPuluhSembilan(teks: string): boolean {
  return jawab(teks, "29", "dua puluh sembilan");
}

export function pitaDelapan(teks: string): boolean {
  return jawab(teks, "8", "delapan");
}

export function pitaTigaPuluhSembilan(teks: string): boolean {
  return jawab(teks, "39", "tiga puluh sembilan");
}

export function pitaEmpatPuluh(teks: string): boolean {
  return jawab(teks, "40", "empat puluh");
}

export function pitaLimaPuluhSembilan(teks: string): boolean {
  return jawab(teks, "59", "lima puluh sembilan");
}

export function pitaDuaPuluhTujuh(teks: string): boolean {
  return jawab(teks, "27", "dua puluh tujuh");
}

export function pitaEmpatPuluhDua(teks: string): boolean {
  return jawab(teks, "42", "empat puluh dua");
}

export function pitaLimaPuluhDua(teks: string): boolean {
  return jawab(teks, "52", "lima puluh dua");
}

export function pitaTujuhPuluhSembilan(teks: string): boolean {
  return jawab(teks, "79", "tujuh puluh sembilan");
}

export function pitaTiga(teks: string): boolean {
  return jawab(teks, "3", "tiga");
}

export function pitaTigaBelas(teks: string): boolean {
  return jawab(teks, "13", "tiga belas");
}

export function pitaSatu(teks: string): boolean {
  return jawab(teks, "1", "satu");
}

export function pitaEnamBelas(teks: string): boolean {
  return jawab(teks, "16", "enam belas");
}

export function pitaLimaPuluhLima(teks: string): boolean {
  return jawab(teks, "55", "lima puluh lima");
}

export function pitaEmpatPuluhSembilan(teks: string): boolean {
  return jawab(teks, "49", "empat puluh sembilan");
}
