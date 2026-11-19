/**
 * Pengenal ucapan Kelas 3 Bab 1 Sub-Bab B (tanpa React, diuji di Node: scripts/uji-kartu-k3b1b.mjs).
 * Kata atau bilangan yang diucapkan dikenali dengan ragam ucapan ("ratusan", "puluhan", "satuan", "nol", "kosong", "sama", "berbeda", "tujuh", "tiga puluh", "empat ratus", ...).
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
    .replace(/\btidak\s+sama\b|\bbukan\s+sama\b/g, " berbeda ")
    .replace(/\bse\s*belas\b/g, " sebelas ")
    .replace(/\bse\s*puluh\b/g, " sepuluh ")
    .replace(/\bse\s*ratus\b/g, " seratus ")
    .replace(/\bsatu\s+an\b/g, " satuan ")
    .replace(/\bpuluh\s+an\b/g, " puluhan ")
    .replace(/\bratus\s+an\b/g, " ratusan ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/** Kata pada tiap kelompok pertentangan; hanya kelompok kunci yang diperiksa agar ucapan "ratusan atau puluhan" tidak dianggap benar. */
const KELOMPOK: Nama[][] = [["ratusan", "puluhan", "satuan"], ["nol", "kosong"], ["sama", "berbeda"]];
const POLA_NAMA: [Nama, RegExp][] = [
  ["ratusan", /\b(ratusan|ratusann|ratusa)\b/],
  ["puluhan", /\b(puluhan|puluhann|puluhaan)\b/],
  ["satuan", /\b(satuan|satuann|satuaan)\b/],
  ["nol", /\b(nol|nool|noll|zero)\b/],
  ["kosong", /\b(kosong|kosongg|kosong)\b/],
  ["sama", /\b(sama|samaa|sami)\b/],
  ["berbeda", /\b(berbeda|beda|bedaa|berbedaa|lain)\b/],
];

/** Semua nama yang terdengar dalam ucapan (urut daftar, tanpa kembar). */
export function namaDariUcapan(teks: string): Nama[] {
  const t = normal(teks);
  return POLA_NAMA.filter(([, p]) => p.test(t)).map(([n]) => n);
}

const SAT: Record<string, number> = { nol: 0, satu: 1, dua: 2, tiga: 3, empat: 4, ampat: 4, lima: 5, enam: 6, tujuh: 7, tuju: 7, delapan: 8, lapan: 8, sembilan: 9 };
const adaUnit = (x: string | undefined): x is string => x !== undefined && x in SAT;

/** Semua bilangan nol sampai sembilan ratus sembilan puluh sembilan yang terdengar (kata atau angka), urut kemunculan, tanpa kembar. */
export function angkaDariUcapan(teks: string): number[] {
  const w = normal(teks).split(" ").filter(Boolean);
  const hasil: number[] = [];
  const catat = (n: number) => {
    if (!hasil.includes(n)) hasil.push(n);
  };
  let i = 0;
  while (i < w.length) {
    if (/^\d{1,3}$/.test(w[i])) {
      catat(Number(w[i]));
      i += 1;
      continue;
    }
    let total = 0;
    let cocok = false;
    let ratus = false;
    if (w[i] === "seratus") {
      total = 100;
      i += 1;
      cocok = true;
      ratus = true;
    } else if (adaUnit(w[i]) && w[i] !== "nol" && w[i + 1] === "ratus") {
      total = SAT[w[i]] * 100;
      i += 2;
      cocok = true;
      ratus = true;
    }
    let t: number | null = null;
    if (w[i] === "sepuluh") {
      t = 10;
      i += 1;
    } else if (w[i] === "sebelas") {
      t = 11;
      i += 1;
    } else if (adaUnit(w[i]) && w[i + 1] === "belas") {
      t = 10 + SAT[w[i]];
      i += 2;
    } else if (adaUnit(w[i]) && w[i] !== "nol" && w[i + 1] === "puluh") {
      t = SAT[w[i]] * 10;
      i += 2;
      if (adaUnit(w[i]) && w[i] !== "nol") {
        t += SAT[w[i]];
        i += 1;
      }
    }
    if (t !== null) {
      total += t;
      cocok = true;
    } else if (ratus && adaUnit(w[i]) && w[i] !== "nol") {
      total += SAT[w[i]];
      i += 1;
    } else if (!cocok && adaUnit(w[i])) {
      total = SAT[w[i]];
      i += 1;
      cocok = true;
    }
    if (cocok) catat(total);
    else i += 1;
  }
  return hasil;
}

/**
 * Apakah ucapan cocok dengan kunci? Kunci kata: kata itu terdengar dan tidak ada kata lain dari kelompok yang sama
 * (mis. "ratusan" tetapi bukan "ratusan atau puluhan"). Kunci angka, jumlah, atau bilangan: bilangan itu terdengar.
 */
export function cocokUcapan(teks: string, kunci: Kunci): { cocok: boolean; terdengar: string[] } {
  if (kunci.jenis !== "nama") {
    const angka = angkaDariUcapan(teks);
    return { cocok: angka.includes(kunci.n), terdengar: angka.map(String) };
  }
  const nama = namaDariUcapan(teks);
  const kel = KELOMPOK.find((g) => g.includes(kunci.nama)) ?? [];
  const dalam = nama.filter((n) => kel.includes(n));
  return { cocok: dalam.length === 1 && dalam[0] === kunci.nama, terdengar: nama };
}
