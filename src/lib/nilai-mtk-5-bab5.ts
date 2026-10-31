import { normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";

const FRASA: Array<[string, string]> = [
  ["dua ratus dua puluh lima", "225"],
  ["dua ratus dua puluh empat", "224"],
  ["dua ratus enam belas", "216"],
  ["seratus dua puluh lima", "125"],
  ["dua ratus", "200"],
  ["sembilan puluh enam", "96"],
  ["empat puluh lima", "45"],
  ["enam puluh empat", "64"],
  ["enam puluh", "60"],
  ["empat puluh", "40"],
  ["tiga puluh sembilan", "39"],
  ["tiga puluh enam", "36"],
  ["dua puluh empat", "24"],
  ["dua puluh lima", "25"],
  ["dua puluh dua", "22"],
  ["dua puluh satu", "21"],
  ["dua puluh", "20"],
  ["sembilan belas", "19"],
  ["delapan belas", "18"],
  ["tujuh belas", "17"],
  ["enam belas", "16"],
  ["lima belas", "15"],
  ["empat belas", "14"],
  ["tiga belas", "13"],
  ["dua belas", "12"],
  ["sepuluh", "10"],
  ["sembilan", "9"],
  ["delapan", "8"],
  ["tujuh", "7"],
  ["enam", "6"],
  ["empat", "4"],
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

export const hasil4 = hasil("4");
export const hasil6 = hasil("6");
export const hasil7 = hasil("7");
export const hasil8 = hasil("8");
export const hasil9 = hasil("9");
export const hasil10 = hasil("10");
export const hasil12 = hasil("12");
export const hasil13 = hasil("13");
export const hasil14 = hasil("14");
export const hasil15 = hasil("15");
export const hasil16 = hasil("16");
export const hasil18 = hasil("18");
export const hasil20 = hasil("20");
export const hasil21 = hasil("21");
export const hasil22 = hasil("22");
export const hasil24 = hasil("24");
export const hasil25 = hasil("25");
export const hasil36 = hasil("36");
export const hasil39 = hasil("39");
export const hasil45 = hasil("45");
export const hasil64 = hasil("64");
export const hasil96 = hasil("96");
export const hasil125 = hasil("125");
export const hasil200 = hasil("200");
export const hasil216 = hasil("216");
export const hasil224 = hasil("224");
export const hasil225 = hasil("225");
