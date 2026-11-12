/**
 * Pengeja suara Kelas 4 Bab 4 (Pengukuran Luas dan Volume): bilangan 0 sampai 999.999 (titik ribuan dibuang dulu),
 * satuan (cm², m², cm³, m³, ml, l, cm, m), dan tanda hitung. Murni: tanpa React, tanpa jaringan, tanpa impor.
 * Diuji di scripts/uji-lab-k4b4.mjs.
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

/** Kata bilangan 0 sampai 999.999. */
export function kataBilK4B4(n: number): string {
  if (!Number.isInteger(n) || n < 0 || n > 999999) return String(n);
  if (n < 1000) return kataRatusan(n);
  const rb = Math.floor(n / 1000);
  const sisa = n % 1000;
  const depan = rb === 1 ? "seribu" : `${kataRatusan(rb)} ribu`;
  return sisa === 0 ? depan : `${depan} ${kataRatusan(sisa)}`;
}

export function ejaK4B4(teks: string): string {
  return teks
    .replace(/(\d)\.(?=\d{3}(?!\d))/g, "$1")
    .replace(/cm²/g, "sentimeter persegi")
    .replace(/m²/g, "meter persegi")
    .replace(/cm³/g, "sentimeter kubik")
    .replace(/m³/g, "meter kubik")
    .replace(/\bml\b/g, "mililiter")
    .replace(/(\d) l\b/g, "$1 liter")
    .replace(/\bcm\b/g, "sentimeter")
    .replace(/(\d) m\b/g, "$1 meter")
    .replace(/ \+ /g, " ditambah ")
    .replace(/ [−-] /g, " dikurangi ")
    .replace(/ × /g, " kali ")
    .replace(/ : /g, " dibagi ")
    .replace(/ = /g, " sama dengan ")
    .replace(/ < /g, " kurang dari ")
    .replace(/ > /g, " lebih dari ")
    .replace(/…/g, "titik-titik")
    .replace(/\d+/g, (d) => (d.length <= 6 ? kataBilK4B4(Number(d)) : d));
}
