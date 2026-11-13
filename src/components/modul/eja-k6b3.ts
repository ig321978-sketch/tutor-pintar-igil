/**
 * Pengeja suara Kelas 6 Bab 3 (Kubus dan Balok): bilangan bulat sampai 9.999, tanda kali dan sama dengan,
 * huruf petak (C2 dibaca "ce dua"), huruf tunggal (A sampai H dibaca nama hurufnya), tanda hitung, dan kurung.
 * Materi bab ini tidak memakai satuan panjang atau pangkat, jadi pengeja tidak menanganinya.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k6b3.mjs.
 */

const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
export const NAMA_HURUF_K6B3: Record<string, string> = { A: "a", B: "be", C: "ce", D: "de", E: "e", F: "ef", G: "ge", H: "ha" };

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

/** Kata bilangan bulat 0 sampai 9.999. Di luar itu dikembalikan apa adanya. */
export function kataK6B3(n: number): string {
  if (!Number.isInteger(n) || n < 0 || n > 9999) return String(n);
  if (n < 1000) return kataTiga(n);
  const ribu = Math.floor(n / 1000);
  const sisa = n % 1000;
  const depan = ribu === 1 ? "seribu" : `${SATUAN[ribu]} ribu`;
  return sisa === 0 ? depan : `${depan} ${kataTiga(sisa)}`;
}

/** Ubah kalimat berangka menjadi kalimat yang enak dibaca suara guru. */
export function ejaK6B3(teks: string): string {
  return teks
    .replace(/\b([A-H])(?=\d)/g, (_, h: string) => `${NAMA_HURUF_K6B3[h]} `)
    .replace(/(?<![A-Za-z0-9])([A-H])(?![A-Za-z0-9])/g, (_, h: string) => NAMA_HURUF_K6B3[h])
    .replace(/ ?× ?/g, " kali ")
    .replace(/(\d) x (?=\d)/g, "$1 kali ")
    .replace(/ \+ /g, " ditambah ")
    .replace(/ [−-] /g, " dikurangi ")
    .replace(/ ÷ /g, " dibagi ")
    .replace(/ = /g, " sama dengan ")
    .replace(/ ≠ /g, " tidak sama dengan ")
    .replace(/ < /g, " kurang dari ")
    .replace(/ > /g, " lebih dari ")
    .replace(/\(/g, "kurung buka ")
    .replace(/\)/g, " kurung tutup")
    .replace(/…/g, "titik-titik")
    .replace(/\d+/g, (d) => kataK6B3(Number(d)))
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([.,;:!?])/g, "$1")
    .trim();
}
