import { normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";

const FRASA: Array<[string, string]> = [
  ["seratus tiga puluh", "130"],
  ["seratus sepuluh", "110"],
  ["seratus", "100"],
  ["sembilan puluh", "90"],
  ["delapan puluh", "80"],
  ["tujuh puluh", "70"],
  ["enam puluh", "60"],
  ["lima puluh", "50"],
  ["empat puluh lima", "45"],
  ["empat puluh", "40"],
  ["tiga puluh lima", "35"],
  ["tiga puluh", "30"],
  ["dua puluh lima", "25"],
  ["dua puluh", "20"],
  ["sepuluh", "10"],
  ["sembilan", "9"],
  ["delapan", "8"],
  ["tujuh", "7"],
  ["enam", "6"],
  ["lima", "5"],
  ["empat", "4"],
  ["tiga", "3"],
  ["dua", "2"],
  ["satu", "1"],
  ["nol", "0"],
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

function adaTolak(teks: string): boolean {
  const normal = ` ${normalisasiJawabanTulis(teks)} `;
  return normal.includes(" tidak ") || normal.includes(" bukan ");
}

export const hasil1 = hasil("1");
export const hasil3 = hasil("3");
export const hasil20 = hasil("20");
export const hasil30 = hasil("30");
export const hasil45 = hasil("45");
export const hasil50 = hasil("50");
export const hasil60 = hasil("60");
export const hasil80 = hasil("80");
export const hasil90 = hasil("90");
export const hasil100 = hasil("100");
export const hasil110 = hasil("110");
export const hasil130 = hasil("130");

export function jawabTidak(teks: string): boolean {
  return adaTolak(teks);
}

export function jawabBisa(teks: string): boolean {
  if (adaTolak(teks)) return false;
  const normal = ` ${normalisasiJawabanTulis(teks)} `;
  return normal.includes(" bisa ") || normal.includes(" dapat ");
}

export function jawabYa(teks: string): boolean {
  if (adaTolak(teks)) return false;
  const normal = ` ${normalisasiJawabanTulis(teks)} `;
  return normal.includes(" ya ") || normal.includes(" boleh ") || normal.includes(" bisa ");
}

export function jawabSiku(teks: string): boolean {
  const normal = normalisasiJawabanTulis(teks).replace(/-/g, " ");
  return ` ${normal} `.includes(" siku ");
}

export function jawabPersegi(teks: string): boolean {
  const normal = ` ${normalisasiJawabanTulis(teks)} `;
  if (normal.includes(" panjang ") || normal.includes(" ketupat ") || normal.includes(" jajar ")) return false;
  return normal.includes(" persegi ");
}
