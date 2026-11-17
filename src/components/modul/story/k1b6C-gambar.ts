import type { Obj } from "./logika-story";
import { E as E_4, W, bulat, emo, garis, kotak, teks } from "./k1b4a-gambar";

/**
 * Gambar khusus Story Kelas 1 Bab 6 Sub-Bab C "Tutup Pasar Malam" (pengurangan sampai dua puluh), akhir cerita Pasar Malam Kampung.
 * Kue di nampan `${id}{i}`, balon di tiang `${id}{i}`, garis bilangan `${id}` (takik `${id}-g{n}`, angka `${id}-a{n}`), penanda `${id}` dan `${id}-n`,
 * lompatan mundur (panah) `${id}`, batang sel `${id}{i}`, tabel puluhan dan satuan `${id}-...`, dan segitiga keluarga bilangan `${id}-u`, `${id}-a`, `${id}-b`.
 */

export { W, bulat, emo, garis, judul, kartu, kotak, orang, teks, type Titik } from "./k1b4a-gambar";

export const E = {
  ...E_4,
  bintang: "\u{1F31F}",
  kue: "\u{1F9C1}",
  balon: "\u{1F388}",
  lampion: "\u{1F3EE}",
  lonceng: "\u{1F514}",
  lampu: "\u{1F4A1}",
  piala: "\u{1F3C6}",
  api: "\u{1F386}",
  api2: "\u{1F387}",
  tepuk: "\u{1F44F}",
  melambai: "\u{1F44B}",
  kertas: "\u{1F4C4}",
  papan: "\u{1F4CB}",
  pikir: "\u{1F4AD}",
  tunjuk: "\u{1F446}",
  ulang: "\u{1F501}",
  buka: "\u{1F513}",
  roket: "\u{1F680}",
  tenda: "\u{1F3AA}",
} as const;

const f = (n: number): number => Number(n.toFixed(1));

/** Benda emoji `n` buah `${id}{i}` berderet `kol` kolom mulai (x0, y0), jarak dx dan dy. */
export const deretEmo = (e: string, id: string, n: number, x0: number, y0: number, dx: number, dy: number, kol: number, u = 15): Obj[] =>
  Array.from({ length: n }, (_, i) => emo(`${id}${i}`, f(x0 + (i % kol) * dx), f(y0 + Math.floor(i / kol) * dy), e, u));

/** Panah dari (x, y) sejauh (dx, dy). */
export const pan = (id: string, x: number, y: number, dx: number, dy: number, warna: string = W.merah, tebal = 2): Obj => ({ id, t: "panah", x, y, x2: dx, y2: dy, warna, tebal });

/* ------------------------------ Garis bilangan ------------------------------ */
export const GB = { x0: 20, dx: 13 } as const;
export const xGB = (n: number): number => GB.x0 + n * GB.dx;
/** Garis bilangan `dari` sampai `sampai` di tinggi y: garis `${id}`, takik `${id}-g{n}`, angka `${id}-a{n}`. */
export function garisBil(id: string, y: number, dari = 0, sampai = 20): Obj[] {
  const out: Obj[] = [garis(id, xGB(dari) - 8, y, GB.dx * (sampai - dari) + 16, 0, W.biru, 2)];
  for (let n = dari; n <= sampai; n += 1) out.push(garis(`${id}-g${n}`, xGB(n), y - 4, 0, 8, W.biru, 1.4), teks(`${id}-a${n}`, xGB(n), y + 15, String(n), 7, n % 5 === 0 ? W.merah : W.biru));
  return out;
}
/** Penanda bulat `${id}` di bilangan n dengan angka `${id}-n` di atasnya. */
export const penanda = (id: string, n: number, y: number, warna: string = W.hijau): Obj[] => [bulat(id, xGB(n), y, 5, warna, W.biru, { tebal: 1.4, z: 2 }), teks(`${id}-n`, xGB(n), y - 12, String(n), 11, W.merah)];
/** Lompatan dari bilangan `dari` ke `ke` (panah mendatar di tinggi y). */
export const lompat = (id: string, dari: number, ke: number, y: number, warna: string = W.merah): Obj => pan(id, xGB(dari), y, xGB(ke) - xGB(dari), 0, warna);

/* ------------------------------ Batang sel dan tabel ------------------------------ */
/** Batang `n` sel `${id}{i}` mulai x0, jarak dx; `isi` sel pertama berwarna. */
export const batangSel = (id: string, n: number, x0: number, y: number, dx: number, w: number, h: number, isi: number, warnaIsi: string): Obj[] =>
  Array.from({ length: n }, (_, i) => kotak(`${id}${i}`, f(x0 + i * dx), y, w, h, i < isi ? warnaIsi : W.putih, W.biru, { rx: 2, tebal: 1.2 }));
/** Warnai sel nomor `dari` sampai `sampai` (tercakup). */
export const warnaiSel = (id: string, dari: number, sampai: number, warna: string): { id: string; warna: string }[] =>
  Array.from({ length: sampai - dari + 1 }, (_, i) => ({ id: `${id}${dari + i}`, warna }));

/** Tabel puluhan dan satuan: sel puluhan `${id}-kp` berisi `${id}-p`, sel satuan `${id}-ks` berisi `${id}-s`. Pojok kiri-atas (x, y), lebar 116, tinggi 46. */
export const tabelPS = (id: string, x: number, y: number, p: string, s: string): Obj[] => [
  kotak(`${id}-hp`, x, y, 56, 16, W.lavender, W.biru, { rx: 3 }),
  teks(`${id}-hpt`, x + 28, y + 12, "puluhan", 8.4),
  kotak(`${id}-hs`, x + 60, y, 56, 16, W.pink, W.biru, { rx: 3 }),
  teks(`${id}-hst`, x + 88, y + 12, "satuan", 8.4),
  kotak(`${id}-kp`, x, y + 18, 56, 28, W.putih, W.biru, { rx: 3 }),
  teks(`${id}-p`, x + 28, y + 39, p, 18),
  kotak(`${id}-ks`, x + 60, y + 18, 56, 28, W.putih, W.biru, { rx: 3 }),
  teks(`${id}-s`, x + 88, y + 39, s, 18),
];

/** Segitiga keluarga bilangan: bulat atas `${id}-u` (angka `${id}-ut`), kiri `${id}-a`, kanan `${id}-b`, garis `${id}-l{i}`. Pusat bulat atas (cx, cy). */
export function segitiga(id: string, cx: number, cy: number, atas: string, kiri: string, kanan: string): Obj[] {
  const ky = cy + 48;
  const lk = cx - 42;
  const rk = cx + 42;
  const isi = (s: string) => (s === "?" ? W.merah : W.biru);
  return [
    garis(`${id}-l0`, cx, cy, lk - cx, ky - cy, W.biru, 1.8, { z: -1 }),
    garis(`${id}-l1`, cx, cy, rk - cx, ky - cy, W.biru, 1.8, { z: -1 }),
    garis(`${id}-l2`, lk, ky, rk - lk, 0, W.biru, 1.8, { z: -1 }),
    bulat(`${id}-u`, cx, cy, 15, W.emas, W.biru, { tebal: 2 }),
    bulat(`${id}-a`, lk, ky, 15, W.langit, W.biru, { tebal: 2 }),
    bulat(`${id}-b`, rk, ky, 15, W.pink, W.biru, { tebal: 2 }),
    teks(`${id}-ut`, cx, cy + 5, atas, 13, isi(atas)),
    teks(`${id}-at`, lk, ky + 5, kiri, 13, isi(kiri)),
    teks(`${id}-bt`, rk, ky + 5, kanan, 13, isi(kanan)),
  ];
}
