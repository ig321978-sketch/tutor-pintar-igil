import { normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";

export function angkaUtuh(teks: string, angka: string): boolean {
  return new RegExp(`(?:^|\\D)${angka}(?:\\D|$)`).test(teks.replace(/\./g, ""));
}

function biasa(teks: string): string {
  return normalisasiJawabanTulis(teks);
}

function kataUtuh(teks: string, kata: string, tolak: string[]): boolean {
  const kalimat = ` ${biasa(teks)} `;
  if (!new RegExp(`(?:^|\\s)${kata}(?:\\s|$)`).test(kalimat)) return false;
  return !tolak.some((larang) =>
    new RegExp(`(?:^|\\s)${kata}\\s+${larang}(?:\\s|$)`).test(kalimat),
  );
}

const TOLAK_BESAR = ["puluh", "ratus", "ribu", "belas"];

export function adaBagi(teks: string): boolean {
  const kalimat = biasa(teks);
  return /[÷:]/.test(teks) || /bagi/.test(kalimat) || teks.includes("/");
}

export function adaKali(teks: string): boolean {
  const kalimat = biasa(teks);
  return /[×*]/.test(teks) || /(?:^|\s)x(?:\s|$)/.test(` ${kalimat} `) || /kali/.test(kalimat);
}

export function jawabLima(teks: string): boolean {
  return angkaUtuh(teks, "5") || kataUtuh(teks, "lima", TOLAK_BESAR);
}

export function jawabDua(teks: string): boolean {
  return angkaUtuh(teks, "2") || kataUtuh(teks, "dua", TOLAK_BESAR);
}

export function jawabEnam(teks: string): boolean {
  return angkaUtuh(teks, "6") || kataUtuh(teks, "enam", TOLAK_BESAR);
}

export function jawabTujuh(teks: string): boolean {
  return angkaUtuh(teks, "7") || kataUtuh(teks, "tujuh", TOLAK_BESAR);
}

export function jawabSembilan(teks: string): boolean {
  return angkaUtuh(teks, "9") || kataUtuh(teks, "sembilan", TOLAK_BESAR);
}

export function jawabTigaKali(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/tiga puluh|tiga ratus|tiga belas/.test(kalimat)) return false;
  const adaTiga = angkaUtuh(teks, "3") || kataUtuh(teks, "tiga", TOLAK_BESAR);
  return adaTiga && /kali/.test(kalimat);
}

export function bacaLimaKali(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/lima puluh|lima ratus/.test(kalimat)) return false;
  const hasil = jawabLima(teks);
  const kalimatBagi = kalimat.includes("tiga puluh") && /bagi/.test(kalimat) && (kalimat.includes("enam") || angkaUtuh(teks, "6"));
  return hasil && kalimatBagi && /kali/.test(kalimat);
}

export function bacaTujuhPuluhDua(teks: string): boolean {
  const kalimat = biasa(teks);
  if (!kalimat.includes("tujuh puluh dua")) return false;
  if (/tujuh puluh dua (puluh|belas|ratus)/.test(kalimat)) return false;
  if (/sembilan puluh|sembilan ratus|sembilan belas/.test(kalimat)) return false;
  const delapan = kalimat.includes("delapan") || angkaUtuh(teks, "8");
  const sembilan = kataUtuh(teks, "sembilan", TOLAK_BESAR) || angkaUtuh(teks, "9");
  return /bagi/.test(kalimat) && delapan && sembilan;
}

export function jawabBoleh(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/tidak boleh/.test(kalimat)) return false;
  if (!kataUtuh(teks, "boleh", [])) return false;
  return /kecil/.test(kalimat) || (angkaUtuh(teks, "1") && angkaUtuh(teks, "4"));
}

export function kalimatBagi(teks: string, a: string, b: string, c: string): boolean {
  return adaBagi(teks) && angkaUtuh(teks, a) && angkaUtuh(teks, b) && angkaUtuh(teks, c);
}

export function langkah24(teks: string): boolean {
  return angkaUtuh(teks, "16") && angkaUtuh(teks, "0") && angkaUtuh(teks, "3");
}

export function langkah28(teks: string): boolean {
  return angkaUtuh(teks, "21") && angkaUtuh(teks, "14") && angkaUtuh(teks, "0") && angkaUtuh(teks, "4");
}

export function periksa45(teks: string): boolean {
  return kalimatBagi(teks, "45", "5", "9") && adaKali(teks);
}

export function periksa64(teks: string): boolean {
  return angkaUtuh(teks, "64") && angkaUtuh(teks, "8") && adaBagi(teks) && adaKali(teks);
}

export function periksa56(teks: string): boolean {
  return angkaUtuh(teks, "56") && angkaUtuh(teks, "7") && angkaUtuh(teks, "8") && adaBagi(teks) && adaKali(teks);
}

export function sisa23(teks: string): boolean {
  const kalimat = biasa(teks);
  return angkaUtuh(teks, "23") && angkaUtuh(teks, "5") && angkaUtuh(teks, "3") && (/sisa/.test(kalimat) || kalimat.includes("+"));
}

export function sisa31(teks: string): boolean {
  const kalimat = biasa(teks);
  return angkaUtuh(teks, "31") && angkaUtuh(teks, "5") && angkaUtuh(teks, "1") && (/sisa/.test(kalimat) || kalimat.includes("+"));
}

export function sisa37(teks: string): boolean {
  const kalimat = biasa(teks);
  return angkaUtuh(teks, "37") && angkaUtuh(teks, "7") && angkaUtuh(teks, "2") && (/sisa/.test(kalimat) || kalimat.includes("+"));
}

export function keluarga36(teks: string): boolean {
  return angkaUtuh(teks, "36") && angkaUtuh(teks, "4") && angkaUtuh(teks, "9") && adaKali(teks) && adaBagi(teks);
}

export function keluarga56(teks: string): boolean {
  return angkaUtuh(teks, "56") && angkaUtuh(teks, "7") && angkaUtuh(teks, "8") && adaKali(teks) && adaBagi(teks);
}

export function pesta85(teks: string): boolean {
  const kalimat = biasa(teks);
  return angkaUtuh(teks, "9") && angkaUtuh(teks, "4") && angkaUtuh(teks, "13") && /sisa/.test(kalimat);
}

export function meja12(teks: string): boolean {
  return angkaUtuh(teks, "9") && angkaUtuh(teks, "12");
}
