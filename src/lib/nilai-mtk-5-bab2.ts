import { normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";

const FRASA: Array<[string, string]> = [
  ["seribu delapan ratus", "1800"],
  ["lima puluh enam", "56"],
  ["empat puluh lima", "45"],
  ["empat puluh empat", "44"],
  ["empat puluh dua", "42"],
  ["empat puluh", "40"],
  ["tiga puluh enam", "36"],
  ["tiga puluh lima", "35"],
  ["tiga puluh tiga", "33"],
  ["tiga puluh dua", "32"],
  ["tiga puluh", "30"],
  ["dua puluh delapan", "28"],
  ["dua puluh empat", "24"],
  ["dua puluh dua", "22"],
  ["dua puluh satu", "21"],
  ["dua puluh", "20"],
  ["delapan belas", "18"],
  ["tujuh puluh dua", "72"],
  ["enam belas", "16"],
  ["lima belas", "15"],
  ["empat belas", "14"],
  ["dua belas", "12"],
  ["sebelas", "11"],
  ["sepuluh", "10"],
  ["sembilan", "9"],
  ["delapan", "8"],
  ["tujuh", "7"],
  ["enam puluh", "60"],
  ["enam", "6"],
  ["lima", "5"],
  ["empat", "4"],
  ["tiga", "3"],
  ["dua", "2"],
  ["satu", "1"],
  ["nol", "0"],
];

function biasa(teks: string): string {
  return normalisasiJawabanTulis(teks);
}

function satukanRibuan(teks: string): string {
  let hasil = teks;
  let sebelumnya = "";
  while (hasil !== sebelumnya) {
    sebelumnya = hasil;
    hasil = hasil.replace(/(\d)[.](\d{3})(?!\d)/g, "$1$2");
  }
  return hasil;
}

export function kumpulanAngka(teks: string): string[] {
  const hasil: string[] = [];
  for (const cocok of satukanRibuan(teks).matchAll(/\d+/g)) hasil.push(cocok[0]);
  let sisa = ` ${biasa(teks)} `;
  for (const [frasa, angka] of FRASA) {
    const jarum = ` ${frasa} `;
    while (sisa.includes(jarum)) {
      hasil.push(angka);
      sisa = sisa.replace(jarum, " ");
    }
  }
  return hasil;
}

function memuatSemua(teks: string, wajib: string[], terlarang: string[] = []): boolean {
  const ada = new Set(kumpulanAngka(teks));
  if (!wajib.every((angka) => ada.has(angka))) return false;
  return !terlarang.some((angka) => ada.has(angka));
}

function himpunanSama(teks: string, wajib: string[]): boolean {
  const ada = [...new Set(kumpulanAngka(teks))];
  return ada.length === wajib.length && wajib.every((angka) => ada.includes(angka));
}

function tepat(teks: string, angka: string): boolean {
  return kumpulanAngka(teks).includes(angka);
}

function multisama(teks: string, faktor: string[], abaikan: string[]): boolean {
  const buang = new Set(abaikan);
  const ada = kumpulanAngka(teks).filter((angka) => !buang.has(angka));
  const urut = [...ada].sort((a, b) => Number(a) - Number(b));
  const target = [...faktor].sort((a, b) => Number(a) - Number(b));
  return urut.join(",") === target.join(",");
}

function polaPangkat(basis: string, pangkat: string): string[] {
  const kataBasis = FRASA.find(([, angka]) => angka === basis)?.[0] ?? basis;
  const kataPangkat = FRASA.find(([, angka]) => angka === pangkat)?.[0] ?? pangkat;
  return [`${basis} pangkat ${pangkat}`, `${kataBasis} pangkat ${kataPangkat}`];
}

function adaPangkat(teks: string, basis: string, pangkat: string): boolean {
  const k = ` ${biasa(teks)} `;
  return polaPangkat(basis, pangkat).some((pola) => k.includes(` ${pola} `));
}

function tanpaPangkat(teks: string, basis: string, pangkat: string): string {
  return polaPangkat(basis, pangkat).reduce(
    (sisa, pola) => sisa.replaceAll(pola, " "),
    biasa(teks),
  );
}

export function kelipatanEnam(teks: string): boolean {
  return memuatSemua(teks, ["6", "12", "18", "24"], ["0"]);
}

export function kelipatanSebelas(teks: string): boolean {
  return memuatSemua(teks, ["11", "22", "33", "44"], ["0"]);
}

export function tigaPuluhLima(teks: string): boolean {
  return tepat(teks, "35");
}

export function tigaPuluhEnam(teks: string): boolean {
  return tepat(teks, "36");
}

export function empatPuluh(teks: string): boolean {
  return tepat(teks, "40");
}

export function empatPuluhLima(teks: string): boolean {
  return tepat(teks, "45");
}

export function duaPuluhEmpat(teks: string): boolean {
  return tepat(teks, "24");
}

export function enamPuluh(teks: string): boolean {
  return tepat(teks, "60");
}

export function tanggalDuaPuluhEmpat(teks: string): boolean {
  return tepat(teks, "24");
}

export function empat(teks: string): boolean {
  return tepat(teks, "4");
}

export function lima(teks: string): boolean {
  return tepat(teks, "5");
}

export function enam(teks: string): boolean {
  return tepat(teks, "6");
}

export function tiga(teks: string): boolean {
  return tepat(teks, "3");
}

export function sepuluh(teks: string): boolean {
  return tepat(teks, "10");
}

export function duaBelas(teks: string): boolean {
  return tepat(teks, "12");
}

export function tigaPuluh(teks: string): boolean {
  return tepat(teks, "30");
}

export function empatPuluhDua(teks: string): boolean {
  return tepat(teks, "42");
}

export function faktorEnamBelas(teks: string): boolean {
  return himpunanSama(teks, ["1", "2", "4", "8", "16"]);
}

export function faktorDuaPuluh(teks: string): boolean {
  return himpunanSama(teks, ["1", "2", "4", "5", "10", "20"]);
}

export function faktorLimaBelas(teks: string): boolean {
  return himpunanSama(teks, ["1", "3", "5", "15"]);
}

export function faktorDuaPuluhDelapan(teks: string): boolean {
  return himpunanSama(teks, ["1", "2", "4", "7", "14", "28"]);
}

export function primaTigaEnam(teks: string): boolean {
  if (adaPangkat(teks, "2", "2") && adaPangkat(teks, "3", "2")) {
    const sisa = tanpaPangkat(tanpaPangkat(teks, "2", "2"), "3", "2");
    return kumpulanAngka(sisa).every((angka) => angka === "36");
  }
  return multisama(teks, ["2", "2", "3", "3"], ["36"]);
}

export function primaSembilanEnam(teks: string): boolean {
  const k = biasa(teks);
  const sisa = k.replace(/2 pangkat 5/g, " ").replace(/dua pangkat lima/g, " ");
  const bentukPangkat = k.includes("2 pangkat 5") || k.includes("dua pangkat lima");
  if (bentukPangkat && tepat(sisa, "3") && !kumpulanAngka(sisa).includes("5")) return true;
  return multisama(teks, ["2", "2", "2", "2", "2", "3"], ["96"]);
}

export function primaEmpatDelapan(teks: string): boolean {
  if (adaPangkat(teks, "2", "4")) {
    const angka = kumpulanAngka(tanpaPangkat(teks, "2", "4")).filter((item) => item !== "48");
    return angka.length === 1 && angka[0] === "3";
  }
  return multisama(teks, ["2", "2", "2", "2", "3"], ["48"]);
}

export function primaPertama(teks: string): boolean {
  const ada = [...new Set(kumpulanAngka(teks))];
  return ada.length === 4 && ["2", "3", "5", "7"].every((angka) => ada.includes(angka));
}

export function sembilanBukanPrima(teks: string): boolean {
  const k = biasa(teks);
  if (/tidak tahu|belum tahu|gak tahu|nggak tahu/.test(k)) return false;
  if (/\b(ya|iya)\b/.test(k) && !/bukan/.test(k)) return false;
  return /bukan|tidak|tiga kali tiga|3 kali 3/.test(k);
}

export function satuBukanPrima(teks: string): boolean {
  const k = biasa(teks);
  if (/tidak tahu|belum tahu|gak tahu|nggak tahu/.test(k)) return false;
  if (/\b(ya|iya)\b/.test(k) && !/bukan/.test(k)) return false;
  return /bukan|tidak/.test(k);
}
