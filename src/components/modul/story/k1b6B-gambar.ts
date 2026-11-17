import type { Obj } from "./logika-story";
import { E as E_4, W, bulat, emo, garis, judul, kartu, kotak, orang, teks, type Titik } from "./k1b4a-gambar";

/**
 * Gambar khusus Story Kelas 1 Bab 6 Sub-Bab B "Loket Karcis" (penjumlahan dengan hasil sampai dua puluh), cerita Pasar Malam Kampung.
 * Loket karcis berjendela (`${id}-r` atap, `${id}-b` badan, `${id}-j` jendela, `${id}-t` papan nama), karcis bergigi (kotak bertepi putus-putus),
 * bingkai karcis dua baris lima (sel `${id}-c{i}`, karcis `${id}k{i}`), garis bilangan nol sampai dua puluh (`${id}-g{n}`, `${id}-a{n}`),
 * lompatan (busur), bagan bagian dan keseluruhan, tabel puluhan dan satuan, serta papan catatan.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 */

export { W, bulat, emo, garis, judul, kartu, kotak, orang, teks, type Titik };

export const E = {
  ...E_4,
  karcis: "\u{1F39F}\u{FE0F}",
  komidi: "\u{1F3A0}",
  kucing: "\u{1F408}",
  anak: "\u{1F9D2}",
  lampion: "\u{1F3EE}",
  kue: "\u{1F9C1}",
  lonceng: "\u{1F514}",
  lega: "\u{1F60C}",
  malam: "\u{1F319}",
  kilat: "\u{26A1}",
} as const;

const f = (n: number): number => Number(n.toFixed(1));

/* ------------------------------ Loket karcis ------------------------------ */

/** Loket karcis berjendela, pojok kiri-atas (x, y), lebar w, tinggi 54: atap merah, badan krem, jendela biru muda, meja kayu, papan nama KARCIS. */
export const loket = (id: string, x: number, y: number, w = 88): Obj[] => [
  kotak(`${id}-b`, x + 4, y + 14, w - 8, 40, "#FEF3C7", W.biru, { rx: 3, tebal: 1.8, z: -2 }),
  kotak(`${id}-j`, x + 14, y + 22, w - 28, 18, W.langit, W.biru, { rx: 2, tebal: 1.4, z: -1 }),
  kotak(`${id}-m`, x + 8, y + 40, w - 16, 5, W.coklat, W.biru, { rx: 1, tebal: 1.2 }),
  kotak(`${id}-r`, x, y, w, 14, W.merah, W.biru, { rx: 4, tebal: 1.8, z: -1 }),
  teks(`${id}-t`, x + w / 2, y + 10.5, "KARCIS", 8.4, W.putih),
];

/* ------------------------------ Karcis dan bingkai ------------------------------ */

/** Satu karcis bergigi: kotak bertepi putus-putus, pojok kiri-atas (x, y), lebar w, tinggi 0,6 w. */
export const karcis = (id: string, x: number, y: number, w = 14, warna: string = W.emas, o: Partial<Obj> = {}): Obj =>
  kotak(id, x, y, w, f(w * 0.6), warna, W.biru, { rx: 1.5, tebal: 1.2, putus: true, ...o });

/** Deret `n` karcis `${id}{i}` mulai (x0, y) berjarak dx. */
export const deretKarcis = (id: string, n: number, x0: number, y: number, dx: number, w = 12, warna: string = W.emas): Obj[] =>
  Array.from({ length: n }, (_, i) => karcis(`${id}${i}`, f(x0 + i * dx), y, w, warna));
/** Id karcis `${id}{dari}` sampai `${id}{sampai}`. */
export const idDeret = (id: string, dari: number, sampai: number): string[] => Array.from({ length: sampai - dari + 1 }, (_, i) => `${id}${dari + i}`);

/** Titik pojok kiri-atas karcis di sel ke-i bingkai (pojok kiri-atas bingkai x, y; sisi sel s; lebar karcis w). */
export const titikSel = (x: number, y: number, i: number, s = 18, w = 13): Titik => ({ x: f(x + (i % 5) * s + (s - w) / 2), y: f(y + Math.floor(i / 5) * s + (s - w * 0.6) / 2) });
/** Bingkai karcis dua baris lima: sel `${id}-c{i}` dan `n` karcis `${id}k{i}` di sel pertama sampai ke-n. */
export function bingkai(id: string, x: number, y: number, n: number, s = 18, w = 13): Obj[] {
  const out: Obj[] = [];
  for (let i = 0; i < 10; i += 1) out.push(kotak(`${id}-c${i}`, x + (i % 5) * s, y + Math.floor(i / 5) * s, s, s, W.putih, W.biru, { rx: 1, tebal: 1.2, z: -1 }));
  for (let i = 0; i < n; i += 1) {
    const p = titikSel(x, y, i, s, w);
    out.push(karcis(`${id}k${i}`, p.x, p.y, w));
  }
  return out;
}

/** Geser karcis `${id}` ke pojok kiri-atas (x, y). */
export const geser = (at: string | number | undefined, id: string, x: number, y: number) => ({ at, ubah: [{ id, x, y }] });

/* ------------------------------ Garis bilangan 0 sampai 20 dan lompatan ------------------------------ */

export const GB = { x0: 20, dx: 13 } as const;
export const xG = (n: number): number => GB.x0 + n * GB.dx;
/** Garis bilangan dari `dari` sampai `sampai` pada tinggi y: garis `${id}`, takik `${id}-g{n}`, angka `${id}-a{n}`. */
export function garisAngka(id: string, y: number, dari = 0, sampai = 20): Obj[] {
  const out: Obj[] = [garis(id, xG(dari) - 8, y, xG(sampai) - xG(dari) + 16, 0, W.biru, 2)];
  for (let n = dari; n <= sampai; n += 1) out.push(garis(`${id}-g${n}`, xG(n), y - 4, 0, 8, W.biru, 1.4), teks(`${id}-a${n}`, xG(n), y + 15, String(n), 7, n % 5 === 0 ? W.merah : W.biru));
  return out;
}
/** Titik bulat `${id}` di bilangan n pada tinggi y. */
export const titikBil = (id: string, n: number, y: number, warna: string = W.hijau, r = 4): Obj => bulat(id, xG(n), y, r, warna, W.biru, { tebal: 1.2, z: 2 });
/** Busur lompatan `${id}` dari bilangan a ke b di atas garis pada tinggi y, tinggi busur tinggi; tergambar bertahap. */
export const busur = (id: string, a: number, b: number, y: number, warna: string = W.merah, tinggi = 20, tebal = 2): Obj => ({
  id,
  t: "jalur",
  x: xG(a),
  y: y - 3,
  d: `M0 0 Q ${f((xG(b) - xG(a)) / 2)} ${-tinggi} ${xG(b) - xG(a)} 0`,
  garis: warna,
  tebal,
  gambar: true,
});

/* ------------------------------ Bagan bagian dan keseluruhan ------------------------------ */

/** Bagan: keseluruhan `${id}-w` (bulat) di (x, y), dua bagian `${id}-p0` dan `${id}-p1` di bawahnya, garis `${id}-l0`, `${id}-l1`; isi tiap bulat `${id}-w-t`, `${id}-p0-t`, `${id}-p1-t`. */
export const bagan = (id: string, x: number, y: number, atas: string, kiri: string, kanan: string, jarak = 42): Obj[] => [
  garis(`${id}-l0`, x - 8, y + 14, -(jarak - 12), 22, W.biru, 1.8),
  garis(`${id}-l1`, x + 8, y + 14, jarak - 12, 22, W.biru, 1.8),
  bulat(`${id}-w`, x, y, 17, W.krem, W.biru, { tebal: 2 }),
  teks(`${id}-w-t`, x, y + 5, atas, 14, W.merah),
  bulat(`${id}-p0`, x - jarak, y + 52, 15, W.hijauMuda, W.biru, { tebal: 2 }),
  teks(`${id}-p0-t`, x - jarak, y + 57, kiri, 13, W.biru),
  bulat(`${id}-p1`, x + jarak, y + 52, 15, W.langit, W.biru, { tebal: 2 }),
  teks(`${id}-p1-t`, x + jarak, y + 57, kanan, 13, W.biru),
];

/* ------------------------------ Tabel puluhan dan satuan ------------------------------ */

/** Tabel dua kolom: kepala `${id}-hp` (puluhan) dan `${id}-hs` (satuan), sel `${id}-kp`, `${id}-ks`, isi `${id}-tp`, `${id}-ts`. Pojok kiri-atas (x, y), tiap kolom lebar 54. */
export const tabelPS = (id: string, x: number, y: number, p: string, s: string): Obj[] => [
  kotak(`${id}-kp`, x, y + 14, 54, 34, W.krem, W.biru, { rx: 2, tebal: 1.8 }),
  kotak(`${id}-ks`, x + 54, y + 14, 54, 34, W.krem, W.biru, { rx: 2, tebal: 1.8 }),
  teks(`${id}-hp`, x + 27, y + 10, "puluhan", 9, W.ungu),
  teks(`${id}-hs`, x + 81, y + 10, "satuan", 9, W.ungu),
  teks(`${id}-tp`, x + 27, y + 41, p, 22, W.merah),
  teks(`${id}-ts`, x + 81, y + 41, s, 22, W.merah),
];

/* ------------------------------ Papan catatan ------------------------------ */

/** Papan catatan: kotak `${id}` berbingkai kayu dan judul `${id}-j`. */
export const papan = (id: string, x: number, y: number, w: number, h: number, isi: string): Obj[] => [
  kotak(id, x, y, w, h, "#166534", W.coklat, { rx: 4, tebal: 3, z: -2 }),
  teks(`${id}-j`, x + w / 2, y + 13, isi, 8.6, W.putih),
];

/* ------------------------------ Tokoh dan latar ------------------------------ */

/** Barisan anak (emoji) `${id}{i}` mulai x0 pada tinggi y berjarak dx. */
export const barisAnak = (id: string, n: number, x0: number, y: number, dx: number, u = 20): Obj[] =>
  Array.from({ length: n }, (_, i) => emo(`${id}${i}`, f(x0 + i * dx), y, E.anak, u));
/** Pagar pendek: tiang `${id}{i}` dan palang `${id}-p`. */
export const pagar = (id: string, x: number, y: number, n = 3, dx = 12): Obj[] => [
  ...Array.from({ length: n }, (_, i) => garis(`${id}${i}`, x + i * dx, y, 0, 18, W.coklat, 3)),
  garis(`${id}-p`, x - 2, y + 7, (n - 1) * dx + 4, 0, W.coklat, 2.4),
];
/** Lampion berderet `${id}{i}` di tinggi y dan tali `${id}-t`. */
export const lampionDeret = (id: string, n: number, x0: number, y: number, dx: number): Obj[] => [
  garis(`${id}-t`, x0 - 10, y - 12, (n - 1) * dx + 20, 0, W.coklat, 1.4),
  ...Array.from({ length: n }, (_, i) => emo(`${id}${i}`, f(x0 + i * dx), y, E.lampion, 18)),
];
