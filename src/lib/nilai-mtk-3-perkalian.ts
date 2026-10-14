import { normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";

export function angkaUtuh(teks: string, angka: string): boolean {
  return new RegExp(`(?:^|\\D)${angka}(?:\\D|$)`).test(teks.replace(/\./g, ""));
}

function biasa(teks: string): string {
  return normalisasiJawabanTulis(teks);
}

function padat(teks: string): string {
  return biasa(teks).replace(/\s+/g, "");
}

function kataUtuh(teks: string, kata: string, tolak: string[]): boolean {
  const kalimat = biasa(teks);
  if (tolak.some((larang) => kalimat.includes(larang))) return false;
  return new RegExp(`(?:^|\\s)${kata}(?:\\s|$)`).test(` ${kalimat} `);
}

export function adaKali(teks: string): boolean {
  const kalimat = biasa(teks);
  return /[×*]/.test(teks) || /(?:^|\s)x(?:\s|$)/.test(` ${kalimat} `) || /kali/.test(kalimat);
}

export function jawabEnam(teks: string): boolean {
  return angkaUtuh(teks, "6") || kataUtuh(teks, "enam", ["puluh", "ratus", "ribu", "belas"]);
}

export function jawabSembilan(teks: string): boolean {
  return angkaUtuh(teks, "9") || kataUtuh(teks, "sembilan", ["puluh", "ratus", "ribu", "belas"]);
}

export function jawabSama(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/berbeda|tidak sama|beda/.test(kalimat)) return false;
  return kataUtuh(teks, "sama", ["bersama"]);
}

export function jawabSetiap(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/sisa|berkurang|kurang|tambah/.test(kalimat)) return false;
  return kataUtuh(teks, "setiap", []);
}

export function jawabPerkalian(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/kurang|tambah|bagi|pengurangan|penjumlahan/.test(kalimat) && !/perkalian|(?:^|\s)kali(?:\s|$)/.test(` ${kalimat} `)) {
    return false;
  }
  return /perkalian/.test(kalimat) || /(?:^|\s)kali(?:\s|$)/.test(` ${kalimat} `);
}

export function jawabEnamPuluh(teks: string): boolean {
  if (angkaUtuh(teks, "60")) return true;
  const kalimat = biasa(teks);
  if (!kalimat.includes("enam puluh")) return false;
  if (/enam puluh (satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)/.test(kalimat)) return false;
  if (/enam ratus|enam ribu/.test(kalimat)) return false;
  return true;
}

export function ulangLima(teks: string): boolean {
  const kalimat = biasa(teks);
  if (kalimat.includes("lima tambah lima tambah lima")) return true;
  if (kalimat.includes("lima ditambah lima ditambah lima")) return true;
  return padat(teks).includes("5+5+5");
}

export function bacaEmpatKaliLima(teks: string): boolean {
  const kalimat = biasa(teks);
  const adaEmpat = /(?:^|\s)empat(?:\s|$)/.test(` ${kalimat} `) || angkaUtuh(teks, "4");
  const adaLima = /(?:^|\s)lima(?:\s|$)/.test(` ${kalimat} `) || angkaUtuh(teks, "5");
  const adaDuaPuluh = kalimat.includes("dua puluh") || angkaUtuh(teks, "20");
  if (/lima puluh|lima ratus/.test(kalimat)) return false;
  if (/dua puluh (satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)/.test(kalimat)) return false;
  return adaEmpat && adaLima && adaKali(teks) && adaDuaPuluh;
}

export function bacaLimaPuluhEmpat(teks: string): boolean {
  if (angkaUtuh(teks, "54")) return true;
  const kalimat = biasa(teks);
  if (!kalimat.includes("lima puluh empat")) return false;
  if (/lima puluh empat (puluh|belas|ratus)/.test(kalimat)) return false;
  return true;
}

export function bacaSeratusLimaPuluh(teks: string): boolean {
  if (angkaUtuh(teks, "150")) return true;
  const kalimat = biasa(teks);
  if (!kalimat.includes("seratus lima puluh")) return false;
  if (/seratus lima puluh (satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)/.test(kalimat)) return false;
  return true;
}

export function bacaLimaPuluhEnam(teks: string): boolean {
  if (angkaUtuh(teks, "56")) return true;
  const kalimat = biasa(teks);
  return kalimat.includes("lima puluh enam") && !/lima puluh enam puluh/.test(kalimat);
}

export function bacaSembilanKaliDelapan(teks: string): boolean {
  const kalimat = biasa(teks);
  const hasil = angkaUtuh(teks, "72") || kalimat.includes("tujuh puluh dua");
  if (/tujuh puluh dua (puluh|belas|ratus)/.test(kalimat)) return false;
  if (/tujuh puluh(?! dua)/.test(kalimat) && !kalimat.includes("tujuh puluh dua")) return false;
  const faktor =
    ((/(?:^|\s)sembilan(?:\s|$)/.test(` ${kalimat} `) || angkaUtuh(teks, "9")) &&
      (/(?:^|\s)delapan(?:\s|$)/.test(` ${kalimat} `) || angkaUtuh(teks, "8")) &&
      adaKali(teks));
  return hasil && faktor;
}

export function bacaPertukaran(teks: string): boolean {
  const kalimat = biasa(teks);
  const hasil = angkaUtuh(teks, "48") || kalimat.includes("empat puluh delapan");
  return hasil && /pertukaran/.test(kalimat);
}

export function kalimatKali(teks: string, a: string, b: string, c: string): boolean {
  return adaKali(teks) && angkaUtuh(teks, a) && angkaUtuh(teks, b) && angkaUtuh(teks, c);
}

export function kotakEmpat(teks: string): boolean {
  return padat(teks).includes("4+4+4+4") && kalimatKali(teks, "4", "4", "16");
}

export function tujuhKelompok(teks: string): boolean {
  return padat(teks).includes("8+8+8+8+8+8+8") && kalimatKali(teks, "7", "8", "56");
}

export function langkah24(teks: string): boolean {
  return angkaUtuh(teks, "8") && angkaUtuh(teks, "24");
}

export function langkah48(teks: string): boolean {
  return angkaUtuh(teks, "12") && angkaUtuh(teks, "48");
}

export function langkah126(teks: string): boolean {
  return angkaUtuh(teks, "120") && angkaUtuh(teks, "6") && angkaUtuh(teks, "126");
}

export function langkah252(teks: string): boolean {
  return angkaUtuh(teks, "240") && angkaUtuh(teks, "12") && angkaUtuh(teks, "252");
}

export function langkah282(teks: string): boolean {
  return angkaUtuh(teks, "240") && angkaUtuh(teks, "42") && angkaUtuh(teks, "282");
}

export function langkah224(teks: string): boolean {
  return angkaUtuh(teks, "200") && angkaUtuh(teks, "24") && angkaUtuh(teks, "224");
}

export function langkah96(teks: string): boolean {
  return angkaUtuh(teks, "80") && angkaUtuh(teks, "16") && angkaUtuh(teks, "96");
}

export function bentuk63(teks: string): boolean {
  return angkaUtuh(teks, "63") && angkaUtuh(teks, "7") && angkaUtuh(teks, "9");
}

export function kelompok40(teks: string): boolean {
  return angkaUtuh(teks, "40") && (angkaUtuh(teks, "8") || angkaUtuh(teks, "20") || angkaUtuh(teks, "10"));
}

export function panen280(teks: string): boolean {
  return angkaUtuh(teks, "280") && (angkaUtuh(teks, "56") || angkaUtuh(teks, "40"));
}

export function kasusPetak(teks: string): boolean {
  const kalimat = biasa(teks);
  const angkaLengkap =
    angkaUtuh(teks, "48") && angkaUtuh(teks, "63") && angkaUtuh(teks, "40") && angkaUtuh(teks, "23");
  const sebutB =
    /petak b/.test(kalimat) ||
    (/(?:^|\s)b(?:\s|$)/.test(` ${kalimat} `) && /paling|banyak/.test(kalimat));
  return angkaLengkap && sebutB;
}

const SATUAN = "satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan";

export function tepat(teks: string, angka: string, ejaan: string): boolean {
  if (angkaUtuh(teks, angka)) return true;
  const kalimat = biasa(teks);
  if (!kalimat.includes(ejaan)) return false;
  if (ejaan.split(" ").length >= 3 || ejaan.endsWith("belas")) return true;
  if (ejaan.endsWith("puluh")) {
    return !new RegExp(`${ejaan}\\s+(?:${SATUAN})`).test(kalimat);
  }
  return new RegExp(`(?:^|\\s)${ejaan}(?!\\s+(?:puluh|belas|ratus|ribu))(?:\\s|$)`).test(` ${kalimat} `);
}

export function ucapKali(
  teks: string,
  a: string,
  ejaanA: string,
  b: string,
  ejaanB: string,
  hasil: string,
  ejaanHasil: string,
): boolean {
  return tepat(teks, a, ejaanA) && tepat(teks, b, ejaanB) && tepat(teks, hasil, ejaanHasil) && adaKali(teks);
}

export function hasilDanSama(teks: string, angka: string, ejaan: string): boolean {
  return tepat(teks, angka, ejaan) && jawabSama(teks);
}

export function semuaFrasa(teks: string, daftar: [string, string][]): boolean {
  const kalimat = biasa(teks);
  return daftar.every(([angka, ejaan]) => angkaUtuh(teks, angka) || kalimat.includes(ejaan));
}

export function salahSatuLalu(
  teks: string,
  langkah: [string, string][],
  hasil: [string, string],
): boolean {
  return langkah.some(([angka, ejaan]) => tepat(teks, angka, ejaan)) && tepat(teks, hasil[0], hasil[1]);
}

export function duaSusunan(teks: string, a: string, b: string, hasil: string): boolean {
  const rapat = teks.replace(/\s/g, "");
  const tanda = "[×xX*]";
  return (
    new RegExp(`${a}${tanda}${b}`).test(rapat) &&
    new RegExp(`${b}${tanda}${a}`).test(rapat) &&
    angkaUtuh(teks, hasil)
  );
}

export function ulangKali(teks: string, potongan: string, a: string, b: string, hasil: string): boolean {
  return teks.replace(/\s/g, "").includes(potongan) && kalimatKali(teks, a, b, hasil);
}

export function tulisDanNaik(
  teks: string,
  tulis: string,
  ejaanTulis: string,
  naik: string,
  ejaanNaik: string,
): boolean {
  const kalimat = biasa(teks);
  const ekorPuluh = new RegExp(`puluh\\s+${ejaanTulis}\\b`).test(kalimat);
  const adaTulis =
    angkaUtuh(teks, tulis) ||
    new RegExp(`(?:tulis|ditulis)\\s+${ejaanTulis}\\b`).test(kalimat) ||
    (tulis === "0" && (/(?:^|\s)nol(?:\s|$)/.test(` ${kalimat} `) || /kosong/.test(kalimat))) ||
    (tepat(teks, tulis, ejaanTulis) && !ekorPuluh);
  const adaNaik =
    new RegExp(`(?:naik|tambah|plus)\\s*(?:${naik}|${ejaanNaik})`).test(kalimat) ||
    new RegExp(`(?:${ejaanNaik})\\s*(?:naik|plus)`).test(kalimat) ||
    new RegExp(`(?:^|\\s)${naik}\\s*(?:naik|plus)`).test(` ${kalimat} `) ||
    new RegExp(`\\+\\s*${naik}|${naik}\\s*\\+`).test(teks);
  return adaTulis && adaNaik;
}
