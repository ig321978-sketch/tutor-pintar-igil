import type { Obj } from "./logika-story";
import { E as E_4, W, bulat, garis, kotak, teks, type Titik } from "./k1b4a-gambar";

/**
 * Gambar khusus Story Kelas 1 Bab 6 Sub-Bab A "Dua Nampan Kue" (lebih dari, kurang dari, selisih), awal cerita Pasar Malam Kampung.
 * Lapak kayu beratap terpal merah putih, untaian lampu bohlam, nampan, kue cubit (bulat emas) dan kue pukis (setengah bulan merah muda),
 * lampion, es lilin, loket karcis, sandal, kelereng, batang kotak, dan garis bilangan. Semua digambar sendiri dari bentuk dasar.
 * Benda berhitung: `${id}{i}` adalah benda utama ke-i (dihitung uji); pelengkap memakai akhiran `-x`.
 */

export { W, bulat, emo, garis, judul, kartu, kotak, orang, teks, label, type Titik } from "./k1b4a-gambar";

export const E = {
  ...E_4,
  tiket: "\u{1F3AB}",
  tangan: "\u{1F590}\u{FE0F}",
  kaki: "\u{1F9B6}",
  pikir: "\u{1F914}",
  tawa: "\u{1F606}",
  kertas: "\u{1F4C4}",
  anak: "\u{1F9D2}",
  pembeli: "\u{1F9D1}",
  jam: "\u{23F3}",
} as const;

export const WARNA_KUE = { cubit: "#FBBF24", cubitGaris: "#B45309", pukis: "#F9A8D4", pukisGaris: "#BE185D" } as const;
export const WARNA_LAMPION = { merah: "#EF4444", kuning: "#FACC15" } as const;

const f = (n: number): number => Number(n.toFixed(1));
type Ubah = Partial<Obj> & { id: string };

/** Titik-titik di kisi: n titik, `kol` kolom, mulai (x0, y0), jarak dx dan dy. */
export const kisi = (n: number, x0: number, y0: number, kol: number, dx: number, dy: number): Titik[] =>
  Array.from({ length: n }, (_, i) => ({ x: f(x0 + (i % kol) * dx), y: f(y0 + Math.floor(i / kol) * dy) }));

/** Kue cubit: bulatan emas berpinggir coklat. */
export const cubit = (id: string, x: number, y: number, s = 1, o: Partial<Obj> = {}): Obj => bulat(id, x, y, f(5.2 * s), WARNA_KUE.cubit, WARNA_KUE.cubitGaris, { tebal: 1.3, ...o });
/** Kue pukis: setengah bulan merah muda. */
export const pukis = (id: string, x: number, y: number, s = 1, o: Partial<Obj> = {}): Obj => ({
  id,
  t: "jalur",
  x,
  y,
  d: `M${f(-6.5 * s)} ${f(3.5 * s)} L${f(-5 * s)} ${f(-1 * s)} L${f(-2 * s)} ${f(-4 * s)} L${f(2 * s)} ${f(-4 * s)} L${f(5 * s)} ${f(-1 * s)} L${f(6.5 * s)} ${f(3.5 * s)} Z`,
  warna: WARNA_KUE.pukis,
  garis: WARNA_KUE.pukisGaris,
  tebal: 1.3,
  ...o,
});
/** Banyak kue di titik-titik, id `${id}{i}`. */
export const deretKue = (jenis: "cubit" | "pukis", id: string, pts: Titik[], s = 1, o: Partial<Obj> = {}): Obj[] => pts.map((p, i) => (jenis === "cubit" ? cubit(`${id}${i}`, p.x, p.y, s, o) : pukis(`${id}${i}`, p.x, p.y, s, o)));
/** Pindahkan benda (satu atau banyak) ke titik baru. */
export const geser = (id: string, x: number, y: number, o: Partial<Obj> = {}): Ubah => ({ id, x, y, ...o });

/** Nampan perak: badan `${id}` dan alas dalam `${id}-d`. Pojok kiri-atas (x, y). */
export const nampan = (id: string, x: number, y: number, w: number, h: number): Obj[] => [
  kotak(id, x, y, w, h, "#E5E7EB", "#6B7280", { rx: 9, tebal: 2, z: -2 }),
  kotak(`${id}-d`, x + 4, y + 4, w - 8, h - 8, "#F9FAFB", undefined, { rx: 6, z: -1 }),
];

/** Lapak kayu beratap terpal merah putih: enam jalur atap `${id}-a{i}`, dua tiang, dan meja `${id}-m`. */
export function lapak(id: string, x: number, y: number, w: number, tinggiMeja: number): Obj[] {
  const lebar = w / 6;
  const out: Obj[] = Array.from({ length: 6 }, (_, i) => kotak(`${id}-a${i}`, f(x + i * lebar), y, f(lebar), 14, i % 2 ? W.putih : "#DC2626", W.coklat, { rx: 1, tebal: 1.1, z: -4 }));
  out.push(garis(`${id}-tl`, x + 4, y + 14, 0, tinggiMeja, W.coklat, 3, { z: -4 }), garis(`${id}-tr`, x + w - 4, y + 14, 0, tinggiMeja, W.coklat, 3, { z: -4 }));
  out.push(kotak(`${id}-m`, x + 2, y + 14 + tinggiMeja - 10, w - 4, 10, "#B45309", W.coklat, { rx: 2, tebal: 1.4, z: -3 }));
  return out;
}

/** Untaian lampu bohlam: tali `${id}-g` dan n bohlam `${id}{i}` (emas). Bohlam menggantung sedikit melengkung. */
export function untaian(id: string, x0: number, y: number, n: number, jarak: number): Obj[] {
  const out: Obj[] = [garis(`${id}-g`, x0, y, (n - 1) * jarak, 0, "#78716C", 1.4, { z: -3 })];
  for (let i = 0; i < n; i += 1) out.push(bulat(`${id}${i}`, f(x0 + i * jarak), f(y + 4 + (i % 2) * 2), 3.6, "#FDE047", "#CA8A04", { tebal: 1, z: -2 }));
  return out;
}

/** Lampion: badan bulat `${id}`, tali `${id}-t`, dan jumbai `${id}-j`. Berpusat di (x, y). */
export const lampion = (id: string, x: number, y: number, warna: string, r = 6): Obj[] => [
  garis(`${id}-t`, x, y - r - 5, 0, 5, "#78716C", 1, { z: -2 }),
  bulat(id, x, y, r, warna, W.coklat, { tebal: 1.2 }),
  garis(`${id}-j`, x, y + r, 0, 4, W.coklat, 1.4),
];

/** Es lilin: batang es `${id}` dan tangkai `${id}-s`. Berpusat di (x, y). */
export const esLilin = (id: string, x: number, y: number, warna: string): Obj[] => [
  garis(`${id}-s`, x, y + 8, 0, 8, W.coklat, 1.6, { z: -1 }),
  kotak(id, x - 4, y - 9, 8, 18, warna, W.coklat, { rx: 3, tebal: 1.1 }),
];

/** Loket karcis: bilik `${id}`, jendela `${id}-j`, dan tulisan KARCIS `${id}-t`. Pojok kiri-atas (x, y). */
export const loket = (id: string, x: number, y: number, w: number, h: number): Obj[] => [
  kotak(id, x, y, w, h, "#FECACA", "#B91C1C", { rx: 4, tebal: 2, z: -2 }),
  kotak(`${id}-j`, x + 6, y + 18, w - 12, h - 28, "#FEF9C3", "#B91C1C", { rx: 2, tebal: 1.2, z: -1 }),
  teks(`${id}-t`, x + w / 2, y + 13, "KARCIS", 8.4, "#B91C1C"),
];

/** Sandal sederhana: telapak `${id}` dan tali `${id}-x`. Pojok kiri-atas (x, y). */
export const sandal = (id: string, x: number, y: number, o: Partial<Obj> = {}): Obj[] => [
  kotak(id, x, y, 14, 6, "#A16207", W.coklat, { rx: 3, tebal: 1.2, ...o }),
  kotak(`${id}-x`, x + 4, y - 3, 6, 4, "#FDE68A", W.coklat, { rx: 1, tebal: 1, ...o }),
];

/** Batang kotak sebanyak n, mulai (x, y), tiap kotak lebar `s`: kotak `${id}{i}`. */
export const batang = (id: string, x: number, y: number, n: number, warna: string, s = 14, tinggi = 16): Obj[] =>
  Array.from({ length: n }, (_, i) => kotak(`${id}${i}`, f(x + i * s), y, s, tinggi, warna, W.biru, { rx: 1, tebal: 1.2 }));

/** Garis bilangan dari `dari` sampai `sampai`: garis `${id}`, takik `${id}-g{n}`, angka `${id}-a{n}`. */
export function garisBilangan(id: string, x0: number, y: number, dari: number, sampai: number, jarak: number): Obj[] {
  const out: Obj[] = [garis(id, x0 - 8, y, (sampai - dari) * jarak + 16, 0, W.biru, 2)];
  for (let n = dari; n <= sampai; n += 1) {
    const x = x0 + (n - dari) * jarak;
    out.push(garis(`${id}-g${n}`, x, y - 4, 0, 8, W.biru, 1.6), teks(`${id}-a${n}`, x, y + 15, String(n), 8.4, W.biru));
  }
  return out;
}
export const xGaris = (x0: number, dari: number, jarak: number, n: number): number => x0 + (n - dari) * jarak;

/** Panah melengkung diwakili panah lurus pendek dari (x1, y1) ke (x2, y2). */
export const panah = (id: string, x1: number, y1: number, x2: number, y2: number, warna: string = W.merah, tebal = 2): Obj => ({ id, t: "panah", x: x1, y: y1, x2: f(x2 - x1), y2: f(y2 - y1), warna, tebal, gambar: true });

/** Kelereng berwarna di titik-titik, id `${id}{i}`. */
export const WARNA_KELERENG = ["#38BDF8", "#F472B6", "#A3E635", "#FB923C", "#818CF8"];
export const kelereng = (id: string, pts: Titik[], warna?: string, r = 5): Obj[] => pts.map((p, i) => bulat(`${id}${i}`, p.x, p.y, r, warna ?? WARNA_KELERENG[i % 5], W.biru, { tebal: 1.2 }));
