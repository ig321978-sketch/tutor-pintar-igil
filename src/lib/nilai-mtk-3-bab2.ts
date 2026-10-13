import { normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";

export function angkaUtuh(teks: string, angka: string): boolean {
  return new RegExp(`(?:^|\\D)${angka}(?:\\D|$)`).test(teks.replace(/[.,]/g, ""));
}

function biasa(teks: string): string {
  return normalisasiJawabanTulis(teks);
}

function adaAngka(teks: string, angka: string, bacaan: string): boolean {
  return angkaUtuh(teks, angka) || biasa(teks).includes(bacaan);
}

function adaSimpan(kalimat: string): boolean {
  return /simpan|menyimpan/.test(kalimat);
}

function adaPinjam(kalimat: string): boolean {
  return /pinjam|minjam/.test(kalimat);
}

export function baca3775(teks: string): boolean {
  const kalimat = biasa(teks);
  return adaAngka(teks, "3775", "tiga ribu tujuh ratus tujuh puluh lima") && /satuan/.test(kalimat);
}

export function tulis7678(teks: string): boolean {
  return angkaUtuh(teks, "7678");
}

export function tulisDuaSimpanSatu(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/simpan(?:an)? (?:2|dua)|menyimpan (?:2|dua)/.test(kalimat)) return false;
  if (/tulis(?:kan)? (?:12|dua belas)/.test(kalimat)) return false;
  const dua = angkaUtuh(teks, "2") || /(?:^|\s)dua(?:\s|$)/.test(` ${kalimat} `);
  const satu = angkaUtuh(teks, "1") || /(?:^|\s)satu(?:\s|$)/.test(` ${kalimat} `);
  return dua && satu && adaSimpan(kalimat);
}

export function tulis4205(teks: string): boolean {
  return angkaUtuh(teks, "4205");
}

export function tanpaPinjam4434(teks: string): boolean {
  const kalimat = biasa(teks);
  const ada = adaAngka(teks, "4434", "empat ribu empat ratus tiga puluh empat");
  return ada && /tidak|tanpa/.test(kalimat) && adaPinjam(kalimat);
}

export function tulis5443(teks: string): boolean {
  return angkaUtuh(teks, "5443");
}

export function tulis5236(teks: string): boolean {
  return angkaUtuh(teks, "5236");
}

export function pinjam4077(teks: string): boolean {
  const kalimat = biasa(teks);
  const ada = adaAngka(teks, "4077", "empat ribu tujuh puluh tujuh");
  return ada && /satuan/.test(kalimat) && /puluhan/.test(kalimat) && adaPinjam(kalimat);
}

export function tulis3674(teks: string): boolean {
  return angkaUtuh(teks, "3674") && adaPinjam(biasa(teks));
}

export function sisa3175(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/tambah|\+/.test(kalimat) && !/kurang|sisa|-/.test(kalimat) && !adaPinjam(kalimat)) return false;
  return angkaUtuh(teks, "3175") && (/kurang|sisa|-/.test(kalimat) || adaPinjam(kalimat));
}

export function jumlah4221(teks: string): boolean {
  return angkaUtuh(teks, "4221") && /tambah|\+|datang/.test(biasa(teks));
}

export function baca3939(teks: string): boolean {
  return adaAngka(teks, "3939", "tiga ribu sembilan ratus tiga puluh sembilan") && /satuan/.test(biasa(teks));
}

export function tulis5756(teks: string): boolean {
  return angkaUtuh(teks, "5756");
}

export function tulisTigaSimpanSatu(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/simpan(?:an)? (?:3|tiga)|menyimpan (?:3|tiga)/.test(kalimat)) return false;
  if (/tulis(?:kan)? (?:13|tiga belas)/.test(kalimat)) return false;
  const tiga = angkaUtuh(teks, "3") || /(?:^|\s)tiga(?:\s|$)/.test(` ${kalimat} `);
  const satu = angkaUtuh(teks, "1") || /(?:^|\s)satu(?:\s|$)/.test(` ${kalimat} `);
  return tiga && satu && adaSimpan(kalimat);
}

export function tulis4212(teks: string): boolean {
  return angkaUtuh(teks, "4212");
}

export function tanpaPinjam5342(teks: string): boolean {
  const kalimat = biasa(teks);
  const ada = adaAngka(teks, "5342", "lima ribu tiga ratus empat puluh dua");
  return ada && /tidak|tanpa/.test(kalimat) && adaPinjam(kalimat);
}

export function pinjam5428(teks: string): boolean {
  const kalimat = biasa(teks);
  const ada = adaAngka(teks, "5428", "lima ribu empat ratus dua puluh delapan");
  return ada && /ratusan/.test(kalimat) && adaPinjam(kalimat);
}

export function pinjam2768(teks: string): boolean {
  return angkaUtuh(teks, "2768") && /ribuan/.test(biasa(teks)) && adaPinjam(biasa(teks));
}

export function jumlah3999(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/empat ribu/.test(kalimat)) return false;
  const ada = adaAngka(teks, "3999", "tiga ribu sembilan ratus sembilan puluh sembilan");
  return ada && /tambah|\+|jumlah/.test(kalimat);
}

export function sisa3450(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/lima ratus/.test(kalimat) && !angkaUtuh(teks, "3450")) return false;
  if (/tambah/.test(kalimat) && !/kurang|sisa|-/.test(kalimat)) return false;
  const ada = adaAngka(teks, "3450", "tiga ribu empat ratus lima puluh");
  return ada && /kurang|sisa|-/.test(kalimat);
}

export function pinjam3426(teks: string): boolean {
  return angkaUtuh(teks, "3426") && /ribuan/.test(biasa(teks)) && adaPinjam(biasa(teks));
}

export function simpan5931(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/tiga kali|simpan 3|simpan tiga|menyimpan 3|menyimpan tiga/.test(kalimat)) return false;
  const dua = angkaUtuh(teks, "2") || /dua kali|menyimpan dua|simpan dua/.test(kalimat);
  return angkaUtuh(teks, "5931") && adaSimpan(kalimat) && dua;
}

export function pinjam5436(teks: string): boolean {
  return angkaUtuh(teks, "5436") && /ribuan/.test(biasa(teks)) && adaPinjam(biasa(teks));
}

export function simpan6601(teks: string): boolean {
  const kalimat = biasa(teks);
  const tiga = angkaUtuh(teks, "3") || /tiga kali|menyimpan tiga|simpan tiga/.test(kalimat);
  return angkaUtuh(teks, "6601") && adaSimpan(kalimat) && tiga;
}

export function lebih5687(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/3535 lebih besar|tiga ribu lima ratus tiga puluh lima lebih besar/.test(kalimat)) return false;
  const ada = adaAngka(teks, "5687", "lima ribu enam ratus delapan puluh tujuh");
  return ada && /ribuan/.test(kalimat);
}

export function halteHulu(teks: string): boolean {
  return angkaUtuh(teks, "4745") && angkaUtuh(teks, "2565") && angkaUtuh(teks, "915");
}
