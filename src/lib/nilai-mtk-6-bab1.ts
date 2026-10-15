import { normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";
import { angkaUtuh } from "@/lib/nilai-mtk-3-bab1";

function biasa(teks: string): string {
  return normalisasiJawabanTulis(teks);
}

function simbol(teks: string): string {
  return teks
    .toLowerCase()
    .replace(/\bper\b/g, "/")
    .replace(/\s*\/\s*/g, "/")
    .replace(/,/g, ".")
    .replace(/\s+/g, " ")
    .trim();
}

function polaUtuh(pola: string): RegExp {
  const aman = pola.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?<!\\d)${aman}(?!\\d)`);
}

function ejaan(teks: string, kalimat: string): boolean {
  const aman = normalisasiJawabanTulis(kalimat).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?:^|\\s)${aman}(?!\\s+(?:belas|puluh|ratus|ribu|nol|satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan))(?:\\s|$)`).test(biasa(teks));
}

function pecahan(teks: string, bentuk: string, kalimat: string): boolean {
  return polaUtuh(bentuk).test(simbol(teks)) || ejaan(teks, kalimat);
}

function desimal(teks: string, angka: string, kalimat: string): boolean {
  return polaUtuh(angka).test(simbol(teks)) || ejaan(teks, kalimat);
}

function jawab(teks: string, angka: string, kata: string): boolean {
  const aman = kata.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const kataUtuh = new RegExp(
    `(?:^|\\s)${aman}(?!\\s+(?:satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan|belas|puluh|ratus|ribu))(?:\\s|$)`,
  ).test(biasa(teks));
  return angkaUtuh(teks, angka) || kataUtuh;
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

export function jumlahDelapan(teks: string): boolean {
  return jawab(teks, "8", "delapan");
}

export function jumlahSembilan(teks: string): boolean {
  return jawab(teks, "9", "sembilan");
}

export function jumlahSepuluh(teks: string): boolean {
  return jawab(teks, "10", "sepuluh");
}

export function jumlahDuaBelas(teks: string): boolean {
  return jawab(teks, "12", "dua belas");
}

export function jumlahLimaBelas(teks: string): boolean {
  return jawab(teks, "15", "lima belas");
}

export function jumlahDuaPuluh(teks: string): boolean {
  return jawab(teks, "20", "dua puluh");
}

export function jumlahTigaPuluh(teks: string): boolean {
  return jawab(teks, "30", "tiga puluh");
}

export function jumlahEnamPuluhLima(teks: string): boolean {
  return jawab(teks, "65", "enam puluh lima");
}

export function enamPerLima(teks: string): boolean {
  return pecahan(teks, "6/5", "enam per lima");
}

export function sepertiga(teks: string): boolean {
  return pecahan(teks, "1/3", "sepertiga") || pecahan(teks, "1/3", "satu per tiga");
}

export function seperenam(teks: string): boolean {
  return pecahan(teks, "1/6", "seperenam") || pecahan(teks, "1/6", "satu per enam");
}

export function sepersembilan(teks: string): boolean {
  return pecahan(teks, "1/9", "sepersembilan") || pecahan(teks, "1/9", "satu per sembilan");
}

export function limaPerTigaPuluhDua(teks: string): boolean {
  return pecahan(teks, "5/32", "lima per tiga puluh dua");
}

export function desimalSetengah(teks: string): boolean {
  return desimal(teks, "0.5", "nol koma lima") || desimal(teks, "0.50", "nol koma lima puluh");
}

export function desimalSeperlima(teks: string): boolean {
  return desimal(teks, "0.2", "nol koma dua") || desimal(teks, "0.20", "nol koma dua puluh");
}

export function desimalSepersepuluh(teks: string): boolean {
  return desimal(teks, "0.1", "nol koma satu") || desimal(teks, "0.10", "nol koma satu nol");
}

export function desimalTigaPerEmpat(teks: string): boolean {
  return desimal(teks, "0.75", "nol koma tujuh lima") || desimal(teks, "0.75", "nol koma tujuh puluh lima");
}

export function desimalNolKomaSembilan(teks: string): boolean {
  return desimal(teks, "0.9", "nol koma sembilan") || desimal(teks, "0.90", "nol koma sembilan puluh");
}

export function desimalDuaKomaSembilan(teks: string): boolean {
  return desimal(teks, "2.9", "dua koma sembilan") || desimal(teks, "2.90", "dua koma sembilan puluh");
}

export function desimalTigaKomaEnam(teks: string): boolean {
  return desimal(teks, "3.6", "tiga koma enam");
}

export function desimalTigaKomaTujuh(teks: string): boolean {
  return desimal(teks, "3.7", "tiga koma tujuh");
}

export function desimalSatuKomaLima(teks: string): boolean {
  return desimal(teks, "1.5", "satu koma lima") || desimal(teks, "1.50", "satu koma lima puluh");
}

export function desimalLimaKomaDelapan(teks: string): boolean {
  return desimal(teks, "5.8", "lima koma delapan") || desimal(teks, "5.80", "lima koma delapan puluh");
}

export function desimalTigaDelapanKomaLima(teks: string): boolean {
  return desimal(teks, "38.5", "tiga puluh delapan koma lima") || desimal(teks, "38.50", "tiga puluh delapan koma lima puluh");
}
