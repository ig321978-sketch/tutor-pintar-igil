import { normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";

function biasa(teks: string): string {
  return normalisasiJawabanTulis(teks);
}

const EJAAN_JAM = [
  "dua belas",
  "satu",
  "dua",
  "tiga",
  "empat",
  "lima",
  "enam",
  "tujuh",
  "delapan",
  "sembilan",
  "sepuluh",
  "sebelas",
];

export function nilaiWaktu(teks: string, digit: string, ejaan: string, satuan: string[]): boolean {
  const kalimat = biasa(teks);
  const rapat = teks.replace(/[.\s:]/g, "");
  const adaDigit = new RegExp(`(?:^|\\D)${digit}(?:\\D|$)`).test(rapat);
  const adaEjaan = ejaan.length > 0 && kalimat.includes(ejaan);
  if (!adaDigit && !adaEjaan) return false;
  if (!adaDigit) {
    if (!ejaan.includes("ribu") && /ribu/.test(kalimat)) return false;
    if (!ejaan.includes("ratus") && /ratus/.test(kalimat)) return false;
    if (!ejaan.includes("puluh") && /puluh/.test(kalimat)) return false;
    if (!ejaan.includes("belas") && /belas/.test(kalimat)) return false;
  }
  if (satuan.length === 0) return true;
  return satuan.some((nama) => new RegExp(`(?:^|\\s|\\d)${nama}(?:\\s|$)`).test(` ${kalimat} `));
}

export function jamBulat(teks: string, jam: number): boolean {
  const digital = teks.toLowerCase().match(/(\d{1,2})\s*[.:]\s*(\d{1,2})/);
  if (digital) {
    const hour = Number(digital[1]);
    const minute = Number(digital[2]);
    if (minute !== 0) return false;
    if (jam === 12) return hour === 0 || hour === 12 || hour === 24;
    return hour === jam || hour === jam + 12;
  }
  const kalimat = biasa(teks);
  if (/belas|puluh|ratus|ribu/.test(kalimat)) return false;
  const rapat = teks.replace(/[.\s:]/g, "");
  const adaDigit =
    new RegExp(`(?:^|\\D)${jam}(?:\\D|$)`).test(rapat) ||
    (jam < 10 && new RegExp(`(?:^|\\D)0${jam}(?:\\D|$)`).test(rapat));
  return adaDigit || kalimat.includes(EJAAN_JAM[jam] ?? "");
}
