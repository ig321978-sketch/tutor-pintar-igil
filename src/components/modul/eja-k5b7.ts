/**
 * Pengeja suara Kelas 5 Bab 7 (Ciri Bangun Datar): bilangan sampai 999.999, tanda derajat (°), sudut (∠), siku-siku (∟),
 * satuan panjang (cm, dm, m), tanda hitung berspasi, dan kurung. Murni: tanpa React, tanpa jaringan, tanpa impor.
 * Diuji di scripts/uji-lab-k5b7.mjs.
 */

const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];

function kataDua(n: number): string {
  if (n < 10) return SATUAN[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SATUAN[n - 10]} belas`;
  const s = n % 10;
  return s === 0 ? `${SATUAN[Math.floor(n / 10)]} puluh` : `${SATUAN[Math.floor(n / 10)]} puluh ${SATUAN[s]}`;
}

function kataTiga(n: number): string {
  if (n < 100) return kataDua(n);
  const r = Math.floor(n / 100);
  const sisa = n % 100;
  const depan = r === 1 ? "seratus" : `${SATUAN[r]} ratus`;
  return sisa === 0 ? depan : `${depan} ${kataDua(sisa)}`;
}

/** Kata bilangan 0 sampai 999.999. Di luar itu dikembalikan apa adanya. */
export function kataK5B7(n: number): string {
  if (!Number.isInteger(n) || n < 0 || n > 999999) return String(n);
  if (n < 1000) return kataTiga(n);
  const ribu = Math.floor(n / 1000);
  const sisa = n % 1000;
  const depan = ribu === 1 ? "seribu" : `${kataTiga(ribu)} ribu`;
  return sisa === 0 ? depan : `${depan} ${kataTiga(sisa)}`;
}

/** Ubah kalimat berangka menjadi kalimat yang enak dibaca suara guru. */
export function ejaK5B7(teks: string): string {
  return teks
    .replace(/°/g, " derajat")
    .replace(/∠/g, "sudut ")
    .replace(/∟/g, "siku-siku ")
    .replace(/(\d) cm\b/g, "$1 sentimeter")
    .replace(/(\d) dm\b/g, "$1 desimeter")
    .replace(/(\d) m\b/g, "$1 meter")
    .replace(/ \+ /g, " ditambah ")
    .replace(/ [−-] /g, " dikurangi ")
    .replace(/ × /g, " dikali ")
    .replace(/ ÷ /g, " dibagi ")
    .replace(/ = /g, " sama dengan ")
    .replace(/ ≈ /g, " kira-kira ")
    .replace(/ ≤ /g, " lebih kecil atau sama dengan ")
    .replace(/ ≥ /g, " lebih besar atau sama dengan ")
    .replace(/ ≠ /g, " tidak sama dengan ")
    .replace(/ < /g, " lebih kecil dari ")
    .replace(/ > /g, " lebih besar dari ")
    .replace(/\(/g, "kurung buka ")
    .replace(/\)/g, " kurung tutup")
    .replace(/…/g, "titik-titik")
    .replace(/\d{1,3}(?:\.\d{3})+(?!\d)/g, (d) => kataK5B7(Number(d.replace(/\./g, ""))))
    .replace(/\d+/g, (d) => kataK5B7(Number(d)))
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([.,;:!?])/g, "$1")
    .trim();
}
