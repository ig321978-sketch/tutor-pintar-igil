/**
 * Pengeja suara Kelas 6 Bab 1 (Pecahan dan Desimal): bilangan bulat sampai 999.999, pecahan a/b, bilangan desimal dengan koma,
 * tanda hitung (kali, dibagi, ditambah, dikurangi, sama dengan, lebih dari, kurang dari), dan kurung.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k6b1.mjs.
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

/** Kata bilangan bulat 0 sampai 999.999. Di luar itu dikembalikan apa adanya. */
export function kataK6B1(n: number): string {
  if (!Number.isInteger(n) || n < 0 || n > 999999) return String(n);
  if (n < 1000) return kataTiga(n);
  const ribu = Math.floor(n / 1000);
  const sisa = n % 1000;
  const depan = ribu === 1 ? "seribu" : `${kataTiga(ribu)} ribu`;
  return sisa === 0 ? depan : `${depan} ${kataTiga(sisa)}`;
}

/** Bacaan pecahan: setengah, seperempat, dan tiga perempat bentuk lazim; selebihnya "a per b". */
export function kataPecahanK6B1(a: number, b: number): string {
  if (a === 1 && b === 2) return "setengah";
  if (a === 1 && b === 4) return "seperempat";
  if (a === 3 && b === 4) return "tiga perempat";
  return `${kataK6B1(a)} per ${kataK6B1(b)}`;
}

/** Bacaan desimal: bagian bulat, kata koma, lalu tiap angka di belakang koma satu per satu. */
export function kataDesimalK6B1(bulat: string, belakang: string): string {
  return `${kataK6B1(Number(bulat))} koma ${belakang.split("").map((d) => SATUAN[Number(d)]).join(" ")}`;
}

/** Ubah kalimat berangka menjadi kalimat yang enak dibaca suara guru. */
export function ejaK6B1(teks: string): string {
  return teks
    .replace(/ \+ /g, " ditambah ")
    .replace(/ [−-] /g, " dikurangi ")
    .replace(/ ?× ?/g, " dikali ")
    .replace(/ x /g, " dikali ")
    .replace(/ [÷:] /g, " dibagi ")
    .replace(/ = /g, " sama dengan ")
    .replace(/ ≈ /g, " kira-kira ")
    .replace(/ ≤ /g, " kurang dari atau sama dengan ")
    .replace(/ ≥ /g, " lebih dari atau sama dengan ")
    .replace(/ ≠ /g, " tidak sama dengan ")
    .replace(/ < /g, " kurang dari ")
    .replace(/ > /g, " lebih dari ")
    .replace(/\(/g, "kurung buka ")
    .replace(/\)/g, " kurung tutup")
    .replace(/…/g, "titik-titik")
    .replace(/m²/g, "meter persegi")
    .replace(/(\d+)\/(\d+)/g, (_, a, b) => kataPecahanK6B1(Number(a), Number(b)))
    .replace(/\//g, " per ")
    .replace(/(\d+),(\d+)/g, (_, a, b) => kataDesimalK6B1(a, b))
    .replace(/\d{1,3}(?:\.\d{3})+(?!\d)/g, (d) => kataK6B1(Number(d.replace(/\./g, ""))))
    .replace(/\d+/g, (d) => kataK6B1(Number(d)))
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([.,;:!?])/g, "$1")
    .trim();
}
