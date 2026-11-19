/**
 * Pengenal ucapan Kelas 3 Bab 1 Sub-Bab F (tanpa React, diuji di Node: scripts/uji-kali-k3b1f.mjs).
 * Kata atau bilangan yang diucapkan dikenali dengan ragam ucapan ("kali", "tambah", "sama", "berbeda", "kotak", "isi", "baris", "kolom", bilangan nol sampai seratus).
 */
import type { Kunci, Nama } from "./logika-cpa";

export const LEBAR_ADEGAN = 300;
export const TINGGI_ADEGAN = 200;

/* ------------------------------ Pengenal ucapan ------------------------------ */
const normal = (teks: string): string =>
  teks
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\bdua\s*belas\b/g, " duabelas ")
    .replace(/\bse\s*belas\b/g, " sebelas ")
    .replace(/\bse\s*puluh\b/g, " sepuluh ")
    .replace(/\bse\s*ratus\b/g, " seratus ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/** Kata pada tiap kelompok pertentangan; hanya kelompok kunci yang diperiksa agar ucapan "kali atau tambah" tidak dianggap benar. */
const KELOMPOK: Nama[][] = [["kali", "tambah"], ["sama", "beda"], ["kotak", "isi"], ["baris", "kolom"]];
const POLA_NAMA: [Nama, RegExp][] = [
  ["kali", /\b(kali|kalii|dikali|perkalian|kalian)\b/],
  ["tambah", /\b(tambah|tambahh|ditambah|penjumlahan|jumlah|plus)\b/],
  ["sama", /\b(sama|samaa|sami)\b/],
  ["beda", /\b(beda|bedaa|berbeda|perbedaan)\b/],
  ["kotak", /\b(kotak|kotaknya|kotakk)\b/],
  ["isi", /\b(isi|isinya|isii)\b/],
  ["baris", /\b(baris|barisan|barris|mendatar)\b/],
  ["kolom", /\b(kolom|kolomnya|kolum|lajur|tegak)\b/],
];

/** Semua nama yang terdengar dalam ucapan (urut daftar, tanpa kembar). "Isi tiap kotak" dibaca sebagai isi saja; "tidak sama" dibaca sebagai berbeda. */
export function namaDariUcapan(teks: string): Nama[] {
  const t = normal(teks).replace(/\b(tidak|tak|bukan)\s+sama\b/g, " berbeda ");
  const nama = POLA_NAMA.filter(([, p]) => p.test(t)).map(([n]) => n);
  return nama.includes("isi") ? nama.filter((n) => n !== "kotak") : nama;
}

const SATUAN: Record<string, number> = {
  nol: 0,
  satu: 1,
  dua: 2,
  tiga: 3,
  empat: 4,
  ampat: 4,
  lima: 5,
  enam: 6,
  tujuh: 7,
  tuju: 7,
  delapan: 8,
  lapan: 8,
  sembilan: 9,
};
/**
 * Semua bilangan nol sampai seratus yang terdengar (kata atau angka), urut kemunculan, tanpa kembar.
 * Dikenali: satuan, sepuluh, sebelas, X belas, X puluh, X puluh Y, seratus, dan angka seperti 28.
 */
export function angkaDariUcapan(teks: string): number[] {
  const kata = normal(teks).split(" ").filter(Boolean);
  const hasil: number[] = [];
  const catat = (n: number) => {
    if (!hasil.includes(n)) hasil.push(n);
  };
  for (let i = 0; i < kata.length; i += 1) {
    const w = kata[i];
    if (/^\d{1,3}$/.test(w)) catat(Number(w));
    else if (w === "sepuluh") catat(10);
    else if (w === "sebelas") catat(11);
    else if (w === "duabelas") catat(12);
    else if (w === "seratus") catat(100);
    else if (SATUAN[w] !== undefined) {
      if (kata[i + 1] === "belas") {
        catat(10 + SATUAN[w]);
        i += 1;
      } else if (kata[i + 1] === "puluh") {
        let n = SATUAN[w] * 10;
        const berikut = SATUAN[kata[i + 2]];
        if (berikut !== undefined && berikut >= 1 && kata[i + 3] !== "puluh" && kata[i + 3] !== "belas") {
          n += berikut;
          i += 2;
        } else i += 1;
        catat(n);
      } else catat(SATUAN[w]);
    }
  }
  return hasil;
}

/**
 * Apakah ucapan cocok dengan kunci? Kunci kata: kata itu terdengar dan tidak ada kata lain dari kelompok yang sama
 * (mis. "kali" tetapi bukan "kali atau tambah"). Kunci angka: bilangan itu terdengar.
 */
export function cocokUcapan(teks: string, kunci: Kunci): { cocok: boolean; terdengar: string[] } {
  if (kunci.jenis === "angka") {
    const angka = angkaDariUcapan(teks);
    return { cocok: angka.includes(kunci.n), terdengar: angka.map(String) };
  }
  if (kunci.jenis === "kalimat") return { cocok: false, terdengar: [] };
  const nama = namaDariUcapan(teks);
  const kel = KELOMPOK.find((g) => g.includes(kunci.nama)) ?? [];
  const dalam = nama.filter((n) => kel.includes(n));
  return { cocok: dalam.length === 1 && dalam[0] === kunci.nama, terdengar: nama };
}
