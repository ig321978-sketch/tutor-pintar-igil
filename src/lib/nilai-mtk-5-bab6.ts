import { normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";

const FRASA: Array<[string, string]> = [
  ["tiga ratus enam puluh", "360"],
  ["dua ratus empat puluh", "240"],
  ["dua ratus dua puluh lima", "225"],
  ["dua ratus", "200"],
  ["seratus delapan puluh", "180"],
  ["seratus enam puluh lima", "165"],
  ["seratus enam puluh", "160"],
  ["seratus lima puluh", "150"],
  ["seratus empat puluh", "140"],
  ["seratus tiga puluh lima", "135"],
  ["seratus tiga puluh", "130"],
  ["seratus dua puluh lima", "125"],
  ["seratus dua puluh", "120"],
  ["seratus dua belas", "112"],
  ["seratus sepuluh", "110"],
  ["seratus delapan", "108"],
  ["seratus lima", "105"],
  ["sembilan puluh", "90"],
  ["delapan puluh lima", "85"],
  ["delapan puluh", "80"],
  ["tujuh puluh lima", "75"],
  ["tujuh puluh dua", "72"],
  ["tujuh puluh", "70"],
  ["enam puluh", "60"],
  ["lima puluh empat", "54"],
  ["lima puluh dua", "52"],
  ["lima puluh", "50"],
  ["empat puluh lima", "45"],
  ["empat puluh", "40"],
  ["tiga puluh", "30"],
  ["dua puluh lima", "25"],
  ["dua puluh", "20"],
  ["lima belas", "15"],
  ["empat belas", "14"],
  ["dua belas", "12"],
  ["sebelas", "11"],
  ["sepuluh", "10"],
  ["sembilan", "9"],
  ["delapan", "8"],
  ["tujuh", "7"],
  ["enam", "6"],
  ["lima", "5"],
  ["empat", "4"],
  ["tiga", "3"],
  ["dua", "2"],
  ["nol", "0"],
  ["kosong", "0"],
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

function memuatKata(teks: string, kata: string): boolean {
  return ` ${normalisasiJawabanTulis(teks)} `.includes(` ${kata} `);
}

export const hasil0 = hasil("0");
export const hasil2 = hasil("2");
export const hasil3 = hasil("3");
export const hasil4 = hasil("4");
export const hasil5 = hasil("5");
export const hasil30 = hasil("30");
export const hasil54 = hasil("54");
export const hasil60 = hasil("60");
export const hasil72 = hasil("72");
export const hasil90 = hasil("90");
export const hasil108 = hasil("108");
export const hasil120 = hasil("120");
export const hasil135 = hasil("135");
export const hasil150 = hasil("150");
export const hasil180 = hasil("180");
export const hasil225 = hasil("225");
export const hasil240 = hasil("240");
export const hasil360 = hasil("360");

export function jawabLancip(teks: string): boolean {
  return memuatKata(teks, "lancip");
}

export function jawabTumpul(teks: string): boolean {
  return memuatKata(teks, "tumpul");
}

export function jawabSiku(teks: string): boolean {
  const normal = normalisasiJawabanTulis(teks).replace(/-/g, " ");
  return ` ${normal} `.includes(" siku ");
}

export function jawabReleks(teks: string): boolean {
  const normal = normalisasiJawabanTulis(teks);
  return normal.includes("releks") || normal.includes("refleks");
}
