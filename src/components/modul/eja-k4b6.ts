/**
 * Pengeja suara Kelas 4 Bab 6 (Piktogram dan Diagram Batang): bilangan 0 sampai 9.999 dan tanda hitung berspasi.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k4b6.mjs.
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

/** Kata bilangan 0 sampai 9.999. */
export function kataBilK4B6(n: number): string {
  if (!Number.isInteger(n) || n < 0 || n > 9999) return String(n);
  if (n < 1000) return kataRatusan(n);
  const rb = Math.floor(n / 1000);
  const sisa = n % 1000;
  const depan = rb === 1 ? "seribu" : `${SATUAN[rb]} ribu`;
  return sisa === 0 ? depan : `${depan} ${kataRatusan(sisa)}`;
}

export function ejaK4B6(teks: string): string {
  return teks
    .replace(/(\d)\.(?=\d{3}(?!\d))/g, "$1")
    .replace(/ \+ /g, " ditambah ")
    .replace(/ [−-] /g, " dikurangi ")
    .replace(/ × /g, " kali ")
    .replace(/ = /g, " sama dengan ")
    .replace(/ < /g, " kurang dari ")
    .replace(/ > /g, " lebih dari ")
    .replace(/…/g, "titik-titik")
    .replace(/●/g, "simbol")
    .replace(/\d+/g, (d) => (d.length <= 4 ? kataBilK4B6(Number(d)) : d));
}
