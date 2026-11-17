import type { Obj } from "./logika-story";
import { E as E_A, W, garis, kotak, teks, type Titik } from "./k1b3a-gambar";

/**
 * Gambar khusus Story Kelas 1 Bab 3 Sub-Bab B "Pindah Kereta di Stasiun Besar" (berbagai cara mengurangi), lanjutan Kereta ke Rumah Nenek.
 * Memakai ulang dasar gambar Sub-Bab A, ditambah: bagan pasangan, garis bilangan dengan papan peron, baris sepuluh kursi, dan troli.
 */

export { W, bulat, emo, garis, judul, kartu, kotak, orang, teks, deret, deretEmo, panahObj, label, kalimatK, xLambang, tulis, KURANG, type Titik } from "./k1b3a-gambar";
export { ikatan } from "./k1b1d-gambar";
export { garisBilangan } from "./k1b1b-gambar";

export const E = {
  ...E_A,
  koper: "\u{1F9F3}",
  tas: "\u{1F45C}",
  bungkus: "\u{1F381}",
  kondektur: "\u{1F9D1}",
} as const;

/** Troli: bak `${id}` dan dua roda `${id}-r1`, `${id}-r2`. */
export const troli = (id: string, x: number, y: number, w: number): Obj[] => [
  kotak(id, x, y, w, 30, "#E2E8F0", W.biru, { rx: 4, tebal: 2, z: -1 }),
  garis(`${id}-p`, x + w, y, 14, -18, W.biru, 2.4),
  { id: `${id}-r1`, t: "bulat", x: x + 12, y: y + 36, r: 5, warna: "#475569", garis: W.biru, tebal: 1.4 },
  { id: `${id}-r2`, t: "bulat", x: x + w - 12, y: y + 36, r: 5, warna: "#475569", garis: W.biru, tebal: 1.4 },
];

/** Baris sepuluh kursi: alas kursi `${id}{i}` (kotak biru muda), pojok kiri x0, jarak s. */
export const barisKursi = (id: string, x0: number, y: number, s = 26): Obj[] =>
  Array.from({ length: 10 }, (_, i) => kotak(`${id}${i}`, x0 + i * s + 2, y, s - 4, 22, "#BFDBFE", W.biru, { rx: 5, tebal: 1.4, z: -1 }));
export const tengahKursi = (x0: number, y: number, i: number, s = 26): Titik => ({ x: x0 + i * s + s / 2, y: y + 11 });

/** Papan peron bernomor di atas takik garis bilangan: papan `${id}{n}` dan nomor di dalamnya. */
export const papanPeron = (id: string, x: number, y: number, n: number): Obj[] => [
  kotak(`${id}${n}`, x - 9, y - 11, 18, 16, "#1E3A8A", W.biru, { rx: 3, tebal: 1, z: -1 }),
  teks(`${id}t${n}`, x, y + 1, String(n), 9, W.emas),
];
