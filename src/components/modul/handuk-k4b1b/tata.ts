/**
 * Tata letak murni (tanpa React) gambar balok cacah Kelas 4 Bab 1 Sub-Bab B: empat baris (ribuan, ratusan, puluhan, satuan), tiap baris memuat balok sebanyak angka pada tempatnya.
 * Dipakai GambarHanduk.tsx dan diuji di Node (scripts/uji-handuk-k4b1b.mjs) supaya gambar sungguh sebanyak datanya.
 */

export type Ikon = { baris: number; i: number; x: number; y: number; w: number; h: number };

/** Geometri papan balok pada kanvas 300 lebar: baris dimulai dari y `ATAS`, tinggi tiap baris `TINGGI_BARIS`, balok mulai dari x `MULAI` dengan jarak `JARAK`. */
export const ATAS = 6;
export const TINGGI_BARIS = 34;
export const MULAI = 82;
export const JARAK = 23.5;
export const TINGGI_BALOK = ATAS * 2 + 4 * TINGGI_BARIS;

/** Ukuran balok tiap baris: peti, kotak, ikat, lembar (benda) atau kubus besar, lempeng, batang, kubus kecil (diagram polos). */
export const UKURAN_BENDA: [number, number][] = [[22, 22], [22, 18], [22, 14], [18, 18]];
export const UKURAN_POLOS: [number, number][] = [[23, 23], [22, 22], [22, 9], [10, 10]];

/** Empat angka bilangan `n` dari ribuan ke satuan. */
export const digitBalok = (n: number): number[] => [Math.floor(n / 1000) % 10, Math.floor(n / 100) % 10, Math.floor(n / 10) % 10, n % 10];

/** Semua balok pada gambar bilangan `n` (paling banyak sembilan balok tiap baris). */
export function susunBalok(n: number, rupa: "benda" | "diagram"): Ikon[] {
  const ukuran = rupa === "benda" ? UKURAN_BENDA : UKURAN_POLOS;
  const out: Ikon[] = [];
  digitBalok(n).forEach((banyak, baris) => {
    const [w, h] = ukuran[baris];
    for (let i = 0; i < banyak; i += 1) out.push({ baris, i, x: MULAI + i * JARAK, y: ATAS + baris * TINGGI_BARIS + (TINGGI_BARIS - h) / 2, w, h });
  });
  return out;
}
/** Banyak balok tiap baris dalam susunan. */
export const hitungBaris = (ikon: Ikon[]): number[] => [0, 1, 2, 3].map((b) => ikon.filter((x) => x.baris === b).length);

/** Tata letak papan empat kotak: papan mulai di x `PX`, lebar tiap kolom `PK`. */
export const PX = 18;
export const PK = 66;
export const TINGGI_KEPALA = 22;
export const TINGGI_ANGKA = 50;
/** Titik tengah kolom `c` papan. */
export const tengahKolom = (c: number): number => PX + c * PK + PK / 2;
