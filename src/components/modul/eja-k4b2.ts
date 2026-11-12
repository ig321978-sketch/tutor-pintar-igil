/**
 * Pengeja suara Kelas 4 Bab 2 (Pecahan): bilangan 0 sampai 9.999, pecahan (1/4 dibaca "satu per empat"),
 * desimal dengan koma (0,25 dibaca "nol koma dua lima": angka di belakang koma dibaca satu per satu),
 * persen (75% dibaca "tujuh puluh lima persen"), satuan kg dan m, serta tanda hitung dan tanda banding.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k4b2.mjs.
 */

const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];

function kataRatusan(n: number): string {
  if (n < 10) return SATUAN[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SATUAN[n - 10]} belas`;
  if (n < 100) {
    const s = n % 10;
    return s === 0 ? `${SATUAN[Math.floor(n / 10)]} puluh` : `${SATUAN[Math.floor(n / 10)]} puluh ${SATUAN[s]}`;
  }
  const r = Math.floor(n / 100);
  const sisa = n % 100;
  const depan = r === 1 ? "seratus" : `${SATUAN[r]} ratus`;
  return sisa === 0 ? depan : `${depan} ${kataRatusan(sisa)}`;
}

/** Kata bilangan 0 sampai 9.999 (tanpa titik ribuan). */
export function kataBilK4B2(n: number): string {
  if (!Number.isInteger(n) || n < 0 || n > 9999) return String(n);
  if (n < 1000) return kataRatusan(n);
  const rb = Math.floor(n / 1000);
  const sisa = n % 1000;
  const depan = rb === 1 ? "seribu" : `${kataRatusan(rb)} ribu`;
  return sisa === 0 ? depan : `${depan} ${kataRatusan(sisa)}`;
}

/** Desimal dibaca "bulat koma digit digit". */
export const kataDesimalK4B2 = (bulat: string, pecah: string): string => `${kataBilK4B2(Number(bulat))} koma ${[...pecah].map((d) => SATUAN[Number(d)]).join(" ")}`;

export function ejaK4B2(teks: string): string {
  return teks
    .replace(/(\d+)\s?%/g, (_m, a: string) => `${kataBilK4B2(Number(a))} persen`)
    .replace(/(\d+),(\d+)/g, (_m, a: string, b: string) => kataDesimalK4B2(a, b))
    .replace(/(\d+)\/(\d+)/g, (_m, a: string, b: string) => `${kataBilK4B2(Number(a))} per ${kataBilK4B2(Number(b))}`)
    .replace(/\bFPB\b/g, "faktor persekutuan terbesar")
    .replace(/\bkg\b/g, "kilogram")
    .replace(/(per [a-z ]+|\d) m\b/g, "$1 meter")
    .replace(/ \+ /g, " ditambah ")
    .replace(/ [−-] /g, " dikurangi ")
    .replace(/ × /g, " dikali ")
    .replace(/ : /g, " dibagi ")
    .replace(/ = /g, " sama dengan ")
    .replace(/ ≠ /g, " tidak sama dengan ")
    .replace(/ < /g, " kurang dari ")
    .replace(/ > /g, " lebih dari ")
    .replace(/…/g, "titik-titik")
    .replace(/\d+/g, (d) => (d.length <= 4 && !(d.length > 1 && d.startsWith("0")) ? kataBilK4B2(Number(d)) : d));
}
