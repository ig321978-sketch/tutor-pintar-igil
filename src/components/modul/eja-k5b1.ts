/**
 * Pengeja suara Kelas 5 Bab 1 (Bilangan Cacah sampai 100.000): bilangan bertitik ribuan ("14.500") dan bilangan polos
 * sampai 100.000, serta tanda hitung berspasi. Murni: tanpa React, tanpa jaringan, tanpa impor.
 * Diuji di scripts/uji-lab-k5b1.mjs (dibandingkan dengan kata() di data-k5b1.ts).
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

/** Kata bilangan 0 sampai 999.999 (pesan lab bisa menyebut jumlah di atas 100.000). Di luar itu dikembalikan apa adanya. */
export function kataK5B1(n: number): string {
  if (!Number.isInteger(n) || n < 0 || n > 999999) return String(n);
  if (n < 1000) return kataTiga(n);
  const ribu = Math.floor(n / 1000);
  const sisa = n % 1000;
  const depan = ribu === 1 ? "seribu" : `${kataTiga(ribu)} ribu`;
  return sisa === 0 ? depan : `${depan} ${kataTiga(sisa)}`;
}

/** Lambang dengan titik pemisah ribuan: 14500 menjadi "14.500". */
export function lambangK5B1(n: number): string {
  const s = String(n);
  return n >= 1000 ? `${s.slice(0, -3)}.${s.slice(-3)}` : s;
}

/** Ubah kalimat berangka menjadi kalimat yang enak dibaca suara guru. */
export function ejaK5B1(teks: string): string {
  return teks
    .replace(/ \+ /g, " ditambah ")
    .replace(/ [−-] /g, " dikurangi ")
    .replace(/ × /g, " dikali ")
    .replace(/ ÷ /g, " dibagi ")
    .replace(/ = /g, " sama dengan ")
    .replace(/ ≈ /g, " kira-kira ")
    .replace(/ < /g, " kurang dari ")
    .replace(/ > /g, " lebih dari ")
    .replace(/…/g, "titik-titik")
    .replace(/\d{1,3}(?:\.\d{3})+(?!\d)/g, (d) => kataK5B1(Number(d.replace(/\./g, ""))))
    .replace(/\d+/g, (d) => kataK5B1(Number(d)));
}
