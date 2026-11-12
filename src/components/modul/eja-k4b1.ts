/**
 * Pengeja suara Kelas 4 Bab 1 (Bilangan Cacah sampai 10.000): bilangan 0 sampai 10.000 dengan titik ribuan
 * (1.000 dibaca seribu), rupiah (Rp7.300), tanda hitung + − × : =, tanda banding < > , dan titik-titik.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k4b1.mjs.
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

/** Kata bilangan 0 sampai 10.000. Nol di tengah tidak dibaca; ribuan 1 dibaca seribu. */
export function kataBilK4B1(n: number): string {
  if (!Number.isInteger(n) || n < 0 || n > 10000) return String(n);
  if (n < 1000) return kataRatusan(n);
  const rb = Math.floor(n / 1000);
  const sisa = n % 1000;
  const depan = rb === 1 ? "seribu" : `${kataRatusan(rb)} ribu`;
  return sisa === 0 ? depan : `${depan} ${kataRatusan(sisa)}`;
}

export function ejaK4B1(teks: string): string {
  return teks
    .replace(/Rp\s?(\d{1,2}(?:\.\d{3})+|\d+)(?:,00)?/g, (_m, a: string) => `${a.replace(/\./g, "")} rupiah`)
    .replace(/\b(\d{1,2})\.(\d{3})\b/g, "$1$2")
    .replace(/ \+ /g, " ditambah ")
    .replace(/ [−-] /g, " dikurangi ")
    .replace(/ × /g, " dikali ")
    .replace(/ : /g, " dibagi ")
    .replace(/ = /g, " sama dengan ")
    .replace(/ < /g, " kurang dari ")
    .replace(/ > /g, " lebih dari ")
    .replace(/ ≠ /g, " tidak sama dengan ")
    .replace(/…/g, "titik-titik")
    .replace(/\d+/g, (d) => (d.length <= 5 && !(d.length > 1 && d.startsWith("0")) && Number(d) <= 10000 ? kataBilK4B1(Number(d)) : d));
}
