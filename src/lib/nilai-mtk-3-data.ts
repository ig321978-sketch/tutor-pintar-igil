import { normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";

const FRASA: [string, string][] = [
  ["sembilan puluh", "90"],
  ["delapan puluh", "80"],
  ["empat puluh", "40"],
  ["dua puluh lima", "25"],
  ["dua puluh", "20"],
  ["delapan belas", "18"],
  ["lima belas", "15"],
  ["empat belas", "14"],
  ["tiga belas", "13"],
  ["dua belas", "12"],
];

const SATU: [string, string][] = [
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
  ["satu", "1"],
  ["nol", "0"],
];

export function tokenAngka(teks: string): number[] {
  let kalimat = normalisasiJawabanTulis(teks);
  for (const [kata, angka] of FRASA) {
    kalimat = kalimat.replaceAll(kata, ` ${angka} `);
  }
  for (const [kata, angka] of SATU) {
    const pola = new RegExp(`(^|\\s)${kata}(?!\\s+(?:puluh|belas))(?=\\s|$)`, "g");
    kalimat = kalimat.replace(pola, `$1 ${angka} `);
  }
  return (kalimat.match(/\d+/g) ?? []).map((angka) => Number(angka));
}

export function cocokBilangan(teks: string, jumlah: number): boolean {
  const token = tokenAngka(teks);
  return token.length === 1 && token[0] === jumlah;
}

export function cocokUrutan(teks: string, urut: number[]): boolean {
  const token = tokenAngka(teks);
  if (token.length === urut.length && token.every((angka, indeks) => angka === urut[indeks])) return true;
  if (token.length === 1 && urut.every((angka) => angka >= 0 && angka < 10)) {
    return String(token[0]) === urut.join("");
  }
  return false;
}

export function cocokKata(teks: string, kata: string[]): boolean {
  const kalimat = normalisasiJawabanTulis(teks);
  return kata.some((nama) => new RegExp(`(?:^|\\s)${nama}(?:\\s|$)`).test(kalimat));
}
