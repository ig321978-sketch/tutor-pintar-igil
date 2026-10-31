import { normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";

const FRASA: Array<[string, string]> = [
  ["tiga ratus", "300"],
  ["delapan puluh dua", "82"],
  ["empat puluh delapan", "48"],
  ["empat puluh enam", "46"],
  ["tujuh puluh dua", "72"],
  ["delapan puluh", "80"],
  ["tiga puluh lima", "35"],
  ["tiga puluh dua", "32"],
  ["tiga puluh", "30"],
  ["dua puluh delapan", "28"],
  ["dua puluh enam", "26"],
  ["dua puluh lima", "25"],
  ["dua puluh empat", "24"],
  ["dua puluh satu", "21"],
  ["dua puluh dua", "22"],
  ["sembilan belas", "19"],
  ["delapan belas", "18"],
  ["tujuh belas", "17"],
  ["enam belas", "16"],
  ["lima belas", "15"],
  ["empat belas", "14"],
  ["dua belas", "12"],
  ["sepuluh", "10"],
];

export function memuatBilangan(teks: string, target: string): boolean {
  let sisa = ` ${normalisasiJawabanTulis(teks)} `;
  const ketemu: string[] = [];
  for (const [frasa, angka] of FRASA) {
    const jarum = ` ${frasa} `;
    while (sisa.includes(jarum)) {
      ketemu.push(angka);
      sisa = sisa.replace(jarum, " ");
    }
  }
  for (const cocok of sisa.matchAll(/\d+/g)) ketemu.push(cocok[0]);
  return ketemu.includes(target);
}

function hasil(target: string) {
  return (teks: string) => memuatBilangan(teks, target);
}

export const hasil10 = hasil("10");
export const hasil12 = hasil("12");
export const hasil14 = hasil("14");
export const hasil15 = hasil("15");
export const hasil16 = hasil("16");
export const hasil17 = hasil("17");
export const hasil18 = hasil("18");
export const hasil19 = hasil("19");
export const hasil21 = hasil("21");
export const hasil22 = hasil("22");
export const hasil24 = hasil("24");
export const hasil25 = hasil("25");
export const hasil26 = hasil("26");
export const hasil28 = hasil("28");
export const hasil30 = hasil("30");
export const hasil35 = hasil("35");
export const hasil46 = hasil("46");
export const hasil48 = hasil("48");
export const hasil80 = hasil("80");
export const hasil82 = hasil("82");

export function jawabKeliling(teks: string): boolean {
  return normalisasiJawabanTulis(teks).includes("keliling");
}
