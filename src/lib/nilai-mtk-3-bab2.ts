import { normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";

export function angkaUtuh(teks: string, angka: string): boolean {
  return new RegExp(`(?:^|\\D)${angka}(?:\\D|$)`).test(teks.replace(/\./g, ""));
}

function biasa(teks: string): string {
  return normalisasiJawabanTulis(teks);
}

function kataUtuh(teks: string, kata: string, tolak: string[]): boolean {
  const kalimat = biasa(teks);
  if (tolak.some((larang) => kalimat.includes(larang))) return false;
  return new RegExp(`(?:^|\\s)${kata}(?:\\s|$)`).test(` ${kalimat} `);
}

export function jawabTujuh(teks: string): boolean {
  return angkaUtuh(teks, "7") || kataUtuh(teks, "tujuh", ["puluh", "ratus", "ribu", "belas"]);
}

export function jawabSatu(teks: string): boolean {
  return angkaUtuh(teks, "1") || kataUtuh(teks, "satu", ["puluh", "ratus", "ribu", "belas"]);
}

export function jawabTiga(teks: string): boolean {
  return angkaUtuh(teks, "3") || kataUtuh(teks, "tiga", ["puluh", "ratus", "ribu", "belas"]);
}

export function jawabLima(teks: string): boolean {
  return angkaUtuh(teks, "5") || kataUtuh(teks, "lima", ["puluh", "ratus", "ribu", "belas"]);
}

export function jawabEnam(teks: string): boolean {
  return angkaUtuh(teks, "6") || kataUtuh(teks, "enam", ["puluh", "ratus", "ribu", "belas"]);
}

export function artiKurang(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/tambah/.test(kalimat) && !/kurang/.test(kalimat)) return false;
  return /kurang/.test(kalimat);
}

export function adaHasil(teks: string, angka: string): boolean {
  return angkaUtuh(teks, angka);
}

export function baca7538(teks: string): boolean {
  return (
    angkaUtuh(teks, "7538") ||
    biasa(teks).includes("tujuh ribu lima ratus tiga puluh delapan")
  );
}

export function baca5322(teks: string): boolean {
  return (
    angkaUtuh(teks, "5322") ||
    biasa(teks).includes("lima ribu tiga ratus dua puluh dua")
  );
}

export function baca7483(teks: string): boolean {
  return (
    angkaUtuh(teks, "7483") ||
    biasa(teks).includes("tujuh ribu empat ratus delapan puluh tiga")
  );
}

export function baca8300(teks: string): boolean {
  if (angkaUtuh(teks, "8300")) return true;
  const kalimat = biasa(teks);
  if (/tiga ratus (satu|dua|empat|lima|enam|tujuh|delapan|sembilan|puluh)/.test(kalimat)) return false;
  if (/puluh|belas/.test(kalimat)) return false;
  return kalimat.includes("delapan ribu tiga ratus");
}

export function kalimatKurang(teks: string, a: string, b: string, c: string): boolean {
  const kalimat = biasa(teks);
  const adaOperasi = kalimat.includes("-") || /kurang|terjual|sisa|kirim/.test(kalimat);
  return adaOperasi && angkaUtuh(teks, a) && angkaUtuh(teks, b) && angkaUtuh(teks, c);
}

export function kalimatTambah(teks: string, a: string, b: string, c: string): boolean {
  const kalimat = biasa(teks);
  const adaOperasi = kalimat.includes("+") || /tambah|datang/.test(kalimat);
  return adaOperasi && angkaUtuh(teks, a) && angkaUtuh(teks, b) && angkaUtuh(teks, c);
}

export function duaLangkahMuatan(teks: string): boolean {
  const kalimat = biasa(teks);
  const adaKurang = kalimat.includes("-") || /kurang|kirim|sisa/.test(kalimat);
  return adaKurang && angkaUtuh(teks, "8750") && angkaUtuh(teks, "4250");
}

export function ruteLevel5(teks: string): boolean {
  const kalimat = biasa(teks);
  const adaKurang = kalimat.includes("-") || /kurang|kirim|sisa/.test(kalimat);
  return adaKurang && angkaUtuh(teks, "6250") && angkaUtuh(teks, "2050");
}

export function kasusGudang(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/banyak/.test(kalimat) && !/sedikit/.test(kalimat)) return false;
  return angkaUtuh(teks, "8150") && angkaUtuh(teks, "4000") && /sedikit/.test(kalimat);
}
