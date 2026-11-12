/**
 * Pengeja suara Kelas 3 Bab 3: bilangan sampai 99.999 (termasuk titik ribuan), tanda hitung, dan satuan
 * (cm, m, g, kg, ons) dieja supaya enak dibaca Suara Guru. Murni: tanpa React, tanpa jaringan, tanpa impor.
 * Diuji di scripts/uji-lab-k3b3.mjs.
 */

const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];

export function kataBil(n: number): string {
  if (!Number.isInteger(n) || n < 0 || n > 99999) return String(n);
  if (n < 10) return SATUAN[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SATUAN[n - 10]} belas`;
  if (n < 100) {
    const s = n % 10;
    return s === 0 ? `${SATUAN[Math.floor(n / 10)]} puluh` : `${SATUAN[Math.floor(n / 10)]} puluh ${SATUAN[s]}`;
  }
  if (n < 1000) {
    const r = Math.floor(n / 100);
    const sisa = n % 100;
    const depan = r === 1 ? "seratus" : `${SATUAN[r]} ratus`;
    return sisa === 0 ? depan : `${depan} ${kataBil(sisa)}`;
  }
  const rb = Math.floor(n / 1000);
  const sisa = n % 1000;
  const depan = rb === 1 ? "seribu" : `${kataBil(rb)} ribu`;
  return sisa === 0 ? depan : `${depan} ${kataBil(sisa)}`;
}

export function ejaK3B3(teks: string): string {
  return teks
    .replace(/(\d)\.(?=\d{3}(?!\d))/g, "$1")
    .replace(/ \+ /g, " ditambah ")
    .replace(/ [−-] /g, " dikurangi ")
    .replace(/ × /g, " dikali ")
    .replace(/ : /g, " dibagi ")
    .replace(/ = /g, " sama dengan ")
    .replace(/½/g, "setengah")
    .replace(/…/g, "titik-titik")
    .replace(/\bkg\b/g, "kilogram")
    .replace(/\bcm\b/g, "sentimeter")
    .replace(/\bm\b/g, "meter")
    .replace(/\bg\b/g, "gram")
    .replace(/\d+/g, (d) => kataBil(Number(d)));
}
