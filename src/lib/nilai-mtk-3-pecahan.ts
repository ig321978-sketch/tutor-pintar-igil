import { normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";

function biasa(teks: string): string {
  return normalisasiJawabanTulis(teks);
}

function adaGaris(teks: string, atas: string, bawah: string): boolean {
  return new RegExp(`(?:^|\\D)${atas}\\s*/\\s*${bawah}(?:\\D|$)`).test(teks);
}

function frasa(teks: string, kalimat: string, tolak: string[]): boolean {
  const k = biasa(teks);
  if (!k.includes(kalimat)) return false;
  return !tolak.some((larang) => k.includes(larang));
}

export function adaSetengah(teks: string): boolean {
  if (teks.includes("½") || adaGaris(teks, "1", "2")) return true;
  return frasa(teks, "satu per dua", ["dua puluh", "dua ratus", "dua belas"]) || frasa(teks, "setengah", ["puluh"]);
}

export function adaSepertiga(teks: string): boolean {
  if (teks.includes("⅓") || adaGaris(teks, "1", "3")) return true;
  return frasa(teks, "satu per tiga", ["tiga puluh", "tiga ratus", "tiga belas"]) || frasa(teks, "sepertiga", ["puluh"]);
}

export function adaSeperempat(teks: string): boolean {
  if (teks.includes("¼") || adaGaris(teks, "1", "4")) return true;
  return frasa(teks, "satu per empat", ["empat puluh", "empat ratus", "empat belas"]) || frasa(teks, "seperempat", ["puluh"]);
}

export function adaDuaPerTiga(teks: string): boolean {
  if (teks.includes("⅔") || adaGaris(teks, "2", "3")) return true;
  return frasa(teks, "dua per tiga", ["dua puluh", "tiga puluh", "tiga belas", "dua belas"]);
}

export function adaDuaPerEmpat(teks: string): boolean {
  if (adaGaris(teks, "2", "4")) return true;
  return frasa(teks, "dua per empat", ["dua puluh", "empat puluh", "empat belas"]);
}

export function jawabSetengah(teks: string): boolean {
  return adaSetengah(teks) && !adaSepertiga(teks) && !adaSeperempat(teks);
}

export function jawabSepertiga(teks: string): boolean {
  return adaSepertiga(teks) && !adaSetengah(teks) && !adaSeperempat(teks);
}

export function jawabSeperempat(teks: string): boolean {
  return adaSeperempat(teks) && !adaSetengah(teks) && !adaSepertiga(teks);
}

export function jawabDuaPerEmpat(teks: string): boolean {
  return adaDuaPerEmpat(teks) && !adaDuaPerTiga(teks);
}

export function bacaSepertigaPeran(teks: string): boolean {
  const k = biasa(teks);
  if (!adaSepertiga(teks)) return false;
  if (!k.includes("pembilang") || !k.includes("penyebut")) return false;
  if (/pembilang tiga|penyebut satu/.test(k)) return false;
  return /pembilang satu|satu pembilang/.test(k) && /penyebut tiga|tiga penyebut/.test(k);
}

export function bacaSeperempatPeran(teks: string): boolean {
  const k = biasa(teks);
  if (!adaSeperempat(teks)) return false;
  if (!k.includes("pembilang") || !k.includes("penyebut")) return false;
  if (/pembilang empat|penyebut satu/.test(k)) return false;
  return /pembilang satu|satu pembilang/.test(k) && /penyebut empat|empat penyebut/.test(k);
}

export function tigaLambang(teks: string): boolean {
  return adaSetengah(teks) && adaSepertiga(teks) && adaSeperempat(teks);
}

export function duaDanTiga(teks: string): boolean {
  return adaSetengah(teks) && adaSepertiga(teks);
}

export function lebihBesar(teks: string): boolean {
  const k = biasa(teks);
  const besar = teks.includes(">") || k.includes("lebih besar");
  const kecil = teks.includes("<") || k.includes("lebih kecil");
  return besar && !kecil;
}

export function lebihKecil(teks: string): boolean {
  const k = biasa(teks);
  const besar = teks.includes(">") || k.includes("lebih besar");
  const kecil = teks.includes("<") || k.includes("lebih kecil");
  return kecil && !besar;
}

export function alasanLebihBesar(teks: string): boolean {
  const k = biasa(teks);
  const arahBesar = (teks.includes(">") && !teks.includes("<")) || k.includes("lebih besar");
  if (!arahBesar) return false;
  return /penyebut|bagian/.test(k);
}

export function alasanSepertiga(teks: string): boolean {
  const k = biasa(teks);
  if (!adaSepertiga(teks) || !k.includes("lebih besar")) return false;
  if (/satu per empat lebih besar|seperempat lebih besar/.test(k)) return false;
  return /penyebut|bagian|sedikit|kecil/.test(k);
}

export function duaPerTigaLengkap(teks: string): boolean {
  if (/3\s*\/\s*2/.test(teks) && !adaDuaPerTiga(teks)) return false;
  if (adaDuaPerTiga(teks)) return true;
  const k = biasa(teks);
  if (/pembilang 3|penyebut 2|pembilang tiga|penyebut dua/.test(k)) return false;
  return k.includes("pembilang") && k.includes("penyebut") && /(?:^|\D)2(?:\D|$)/.test(teks) && /(?:^|\D)3(?:\D|$)/.test(teks);
}

export function pesananDuaPerTiga(teks: string): boolean {
  const k = biasa(teks);
  return adaDuaPerTiga(teks) && k.includes("lebih besar") && !/lebih kecil/.test(k);
}

function dekat(teks: string, angka: string, ejaan: string): boolean {
  if (new RegExp(`(?:^|\\D)${angka}(?:\\D|$)`).test(teks)) return true;
  const kalimat = biasa(teks);
  return new RegExp(`(?:^|\\s)${ejaan}(?!\\s+(?:puluh|belas|ratus|ribu))(?:\\s|$)`).test(` ${kalimat} `);
}

export function peranPecahan(
  teks: string,
  atas: string,
  ejaanAtas: string,
  bawah: string,
  ejaanBawah: string,
): boolean {
  const kalimat = biasa(teks);
  if (!kalimat.includes("pembilang") || !kalimat.includes("penyebut")) return false;
  if (!dekat(teks, atas, ejaanAtas) || !dekat(teks, bawah, ejaanBawah)) return false;
  if (new RegExp(`pembilang\\s+(?:${bawah}|${ejaanBawah})\\b`).test(kalimat)) return false;
  if (new RegExp(`penyebut\\s+(?:${atas}|${ejaanAtas})\\b`).test(kalimat)) return false;
  const atasBenar = new RegExp(`(?:pembilang\\s+(?:${atas}|${ejaanAtas})\\b|(?:${atas}|${ejaanAtas})\\s+pembilang)`).test(kalimat);
  const bawahBenar = new RegExp(`(?:penyebut\\s+(?:${bawah}|${ejaanBawah})\\b|(?:${bawah}|${ejaanBawah})\\s+penyebut)`).test(kalimat);
  return atasBenar && bawahBenar;
}

export function peranSetengah(teks: string): boolean {
  return adaSetengah(teks) && peranPecahan(teks, "1", "satu", "2", "dua");
}

export function peranSepertiga(teks: string): boolean {
  return adaSepertiga(teks) && peranPecahan(teks, "1", "satu", "3", "tiga");
}

export function peranSeperempat(teks: string): boolean {
  return adaSeperempat(teks) && peranPecahan(teks, "1", "satu", "4", "empat");
}

export function yangLebihBesarSetengah(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/sepertiga lebih besar|satu per tiga lebih besar|seperempat lebih besar|satu per empat lebih besar/.test(kalimat)) return false;
  if (/1\s*\/\s*[34]\s*>/.test(teks)) return false;
  if (jawabSetengah(teks)) return true;
  return adaSetengah(teks) && lebihBesar(teks);
}

export function yangLebihBesarSepertiga(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/seperempat lebih besar|satu per empat lebih besar|setengah lebih besar|satu per dua lebih besar/.test(kalimat)) return false;
  if (/1\s*\/\s*[24]\s*>/.test(teks)) return false;
  if (jawabSepertiga(teks)) return true;
  return adaSepertiga(teks) && lebihBesar(teks);
}

export function yangLebihKecilSeperempat(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/setengah lebih kecil|satu per dua lebih kecil|sepertiga lebih kecil|satu per tiga lebih kecil/.test(kalimat)) return false;
  if (/1\s*\/\s*[23]\s*</.test(teks)) return false;
  if (jawabSeperempat(teks)) return true;
  return adaSeperempat(teks) && lebihKecil(teks);
}

export function warungTiga(teks: string): boolean {
  const k = ` ${biasa(teks)} `;
  if (!adaSepertiga(teks)) return false;
  if (/semangka c lebih besar|seperempat lebih besar|satu per empat lebih besar/.test(k)) return false;
  const adaA = /(?:^|\s)a(?:\s|$)/.test(k) || /paling sedikit|dibagi dua|dibagi 2/.test(k);
  const banding = k.includes("lebih besar");
  const adaC = adaSeperempat(teks) || /semangka c|(?:^|\s)c(?:\s|$)|empat/.test(k);
  return adaA && banding && adaC;
}
