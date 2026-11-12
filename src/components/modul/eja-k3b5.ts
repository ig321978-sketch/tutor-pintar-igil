/**
 * Pengeja suara Kelas 3 Bab 5 (Penyajian Data dalam Tabel): bilangan sampai 999, tanda hitung, titik-titik,
 * turus (garis tegak "|" dan kelompok lima "卌"), dan huruf kapital pada kata (STATISTIKA dieja per huruf bila diminta).
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k3b5.mjs.
 */

const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];

export function kataBilK3B5(n: number): string {
  if (!Number.isInteger(n) || n < 0 || n > 999) return String(n);
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
  return sisa === 0 ? depan : `${depan} ${kataBilK3B5(sisa)}`;
}

/** Ejaan turus: "卌 卌 |||" menjadi "dua kelompok lima dan tiga garis". */
export function ejaTurusK3B5(teks: string): string {
  const kelompok = (teks.match(/卌/g) ?? []).length;
  const garis = (teks.match(/\|/g) ?? []).length;
  const bagian: string[] = [];
  if (kelompok > 0) bagian.push(`${kataBilK3B5(kelompok)} kelompok lima`);
  if (garis > 0) bagian.push(`${kataBilK3B5(garis)} garis`);
  return bagian.length ? bagian.join(" dan ") : "tanpa turus";
}

export function ejaK3B5(teks: string): string {
  return teks
    .replace(/(?:卌|\|)(?:[  ]*(?:卌|\|))*/g, (m) => ejaTurusK3B5(m))
    .replace(/ \+ /g, " ditambah ")
    .replace(/ [−-] /g, " dikurangi ")
    .replace(/ = /g, " sama dengan ")
    .replace(/ < /g, " kurang dari ")
    .replace(/ > /g, " lebih dari ")
    .replace(/…/g, "titik-titik")
    .replace(/\d+/g, (d) => (d.length <= 3 && !(d.length > 1 && d.startsWith("0")) ? kataBilK3B5(Number(d)) : d));
}
