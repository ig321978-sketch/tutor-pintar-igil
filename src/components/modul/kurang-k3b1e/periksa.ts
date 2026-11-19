/**
 * Pengenal ucapan Kelas 3 Bab 1 Sub-Bab E (tanpa React, diuji di Node: scripts/uji-kurang-k3b1e.mjs).
 * Kata jawaban ("satuan", "puluhan", "pinjam", "tanpa", "tambah", "kurang") dikenali dengan ragam ucapan. Bilangan sampai seratus dikenali dari kata
 * (satuan, belasan, puluhan, "empat puluh tujuh", "sepuluh", "seratus") atau dari angka yang ditulis mesin pengenal ("47").
 */
import type { Kunci, Nama } from "./logika-cpa";

export const LEBAR_ADEGAN = 300;
export const TINGGI_ADEGAN = 200;

const normal = (teks: string): string =>
  teks
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const POLA: [Nama, RegExp][] = [
  ["satuan", /\b(satuan|satu an|satuaan|satu-an)\b/],
  ["puluhan", /\b(puluhan|puluh|pulu han|puluhaan|polohan|pulohan)\b/],
  ["pinjam", /\b(pinjam|meminjam|minjam|pinjem|peminjaman)\b/],
  ["tanpa", /\b(tanpa|tanpa pinjam)\b/],
  ["tambah", /\b(tambah|ditambah|menambah|tambahan|penjumlahan|plus)\b/],
  ["kurang", /\b(kurang|dikurangi|mengurangi|kurangi|pengurangan|minus)\b/],
];
/** Kata pada tiap pasangan pertentangan; hanya pasangan kunci yang diperiksa agar ucapan "satuan atau puluhan" tidak dianggap benar. */
const KELOMPOK: Nama[][] = [
  ["satuan", "puluhan"],
  ["pinjam", "tanpa"],
  ["tambah", "kurang"],
];

/** Semua kata jawaban yang terdengar dalam ucapan (urut daftar, tanpa kembar). "Tidak pinjam" dihitung sebagai tanpa pinjam. */
export function namaDariUcapan(teks: string): Nama[] {
  let t = normal(teks);
  const tidakPinjam = /\b(tidak|bukan|nggak|enggak|gak|tak) (perlu )?(pinjam|meminjam|minjam|pinjem)\b/.test(t);
  if (tidakPinjam) t = t.replace(/\b(tidak|bukan|nggak|enggak|gak|tak) (perlu )?(pinjam|meminjam|minjam|pinjem)\b/g, " tanpa ");
  const nama = POLA.filter(([, p]) => p.test(t)).map(([n]) => n);
  // "Tanpa pinjam" memuat kata pinjam, tetapi jawabannya hanya tanpa.
  return nama.includes("tanpa") && /\btanpa (pinjam|meminjam|minjam|pinjem|peminjaman)\b/.test(t) ? nama.filter((n) => n !== "pinjam") : nama;
}

const ANGKA: Record<string, number> = { nol: 0, satu: 1, dua: 2, tiga: 3, empat: 4, ampat: 4, lima: 5, enam: 6, tujuh: 7, tuju: 7, delapan: 8, lapan: 8, sembilan: 9 };
/** Semua bilangan 0 sampai 100 yang terdengar (kata, belasan, puluhan majemuk, atau angka), urut kemunculan, tanpa kembar. */
export function angkaDariUcapan(teks: string): number[] {
  const t = normal(teks).split(" ").filter(Boolean);
  const hasil: number[] = [];
  const tambah = (n: number) => {
    if (n >= 0 && n <= 100 && !hasil.includes(n)) hasil.push(n);
  };
  for (let i = 0; i < t.length; i += 1) {
    const w = t[i];
    if (/^\d{1,3}$/.test(w)) tambah(Number(w));
    else if (w === "seratus") tambah(100);
    else if (w === "sepuluh") tambah(10);
    else if (w === "sebelas") tambah(11);
    else if (ANGKA[w] !== undefined) {
      const n = ANGKA[w];
      if (t[i + 1] === "belas") {
        tambah(10 + n);
        i += 1;
      } else if (t[i + 1] === "puluh") {
        const s = ANGKA[t[i + 2]];
        if (s !== undefined && s > 0 && t[i + 3] !== "puluh" && t[i + 3] !== "belas") {
          tambah(n * 10 + s);
          i += 2;
        } else {
          tambah(n * 10);
          i += 1;
        }
      } else tambah(n);
    }
  }
  return hasil;
}

/**
 * Apakah ucapan cocok dengan kunci? Kunci kata: kata itu terdengar dan tidak ada kata lain dari pasangan yang sama
 * (mis. "pinjam" tetapi bukan "pinjam atau tanpa"). Kunci angka: bilangan itu terdengar.
 */
export function cocokUcapan(teks: string, kunci: Kunci): { cocok: boolean; terdengar: string[] } {
  if (kunci.jenis === "angka") {
    const angka = angkaDariUcapan(teks);
    return { cocok: angka.includes(kunci.n), terdengar: angka.map(String) };
  }
  const nama = namaDariUcapan(teks);
  const kel = KELOMPOK.find((g) => g.includes(kunci.nama)) ?? [];
  const dalam = nama.filter((n) => kel.includes(n));
  return { cocok: dalam.length === 1 && dalam[0] === kunci.nama, terdengar: nama };
}
