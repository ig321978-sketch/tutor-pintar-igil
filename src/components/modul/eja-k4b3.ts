/**
 * Pengeja suara Kelas 4 Bab 3 (Pola Gambar dan Pola Bilangan): bilangan 0 sampai 9.999, beda bertanda
 * ("+2" dibaca "tambah dua", "−5" dibaca "kurang lima"), urutan ("ke-7" dibaca "ketujuh", "ke-1" dibaca "pertama"),
 * serta tanda hitung. Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k4b3.mjs.
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
export function kataBilK4B3(n: number): string {
  if (!Number.isInteger(n) || n < 0 || n > 9999) return String(n);
  if (n < 1000) return kataRatusan(n);
  const rb = Math.floor(n / 1000);
  const sisa = n % 1000;
  const depan = rb === 1 ? "seribu" : `${kataRatusan(rb)} ribu`;
  return sisa === 0 ? depan : `${depan} ${kataRatusan(sisa)}`;
}

/** Urutan: 1 menjadi "pertama", lainnya "ke" + kata bilangan (ketujuh, kedua belas). */
export const kataUrutanK4B3 = (n: number): string => (n === 1 ? "pertama" : `ke${kataBilK4B3(n)}`);

export function ejaK4B3(teks: string): string {
  return teks
    .replace(/\bke-(\d+)/g, (_m, a: string) => kataUrutanK4B3(Number(a)))
    .replace(/(^|[\s(])\+(\d+)/g, (_m, s: string, a: string) => `${s}tambah ${kataBilK4B3(Number(a))}`)
    .replace(/(^|[\s(])[−-](\d+)/g, (_m, s: string, a: string) => `${s}kurang ${kataBilK4B3(Number(a))}`)
    .replace(/ \+ /g, " ditambah ")
    .replace(/ [−-] /g, " dikurangi ")
    .replace(/ × /g, " dikali ")
    .replace(/ = /g, " sama dengan ")
    .replace(/ < /g, " kurang dari ")
    .replace(/ > /g, " lebih dari ")
    .replace(/…/g, "titik-titik")
    .replace(/\d+/g, (d) => (d.length <= 4 ? kataBilK4B3(Number(d)) : d));
}
