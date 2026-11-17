import type { Obj } from "./logika-story";
import { E as E_5A, ikan } from "./k1b5a-gambar";
import { W, bulat, garis, kotak, teks, type Titik } from "./k1b4a-gambar";

/**
 * Gambar khusus Story Kelas 1 Bab 5 Sub-Bab D "Lapak Ikan Dibuka" (membandingkan dan mengurutkan bilangan), akhir cerita Akuarium Ikan Hias Abang.
 * Baris ikan `${id}{i}` (mata `${id}{i}-m`), garis pasangan `${id}{i}`, akuarium berisi ikan (kaca `${id}`, air `${id}-a`, ikan `${id}f{i}`),
 * akuarium berlabel angka, menara kubus `${id}{i}` bertulis `${id}-n`, garis bilangan nol sampai dua puluh `${id}-g{n}` dan `${id}-a{n}`,
 * kartu angka, spanduk, pita, dan konfeti. Bentuk dasar ikan memakai ulang `ikan` dari Sub-Bab A.
 */

export { W, bulat, emo, garis, judul, kartu, kotak, orang, teks, type Titik } from "./k1b4a-gambar";
export { ikan } from "./k1b5a-gambar";

export const E = {
  ...E_5A,
  mahkota: "\u{1F451}",
  tepuk: "\u{1F44F}",
  kertas: "\u{1F4C4}",
  gunting: "✂",
  warga: "\u{1F9D1}",
  pria: "\u{1F468}",
  wanita: "\u{1F469}",
  kakek: "\u{1F474}",
  nenek: "\u{1F475}",
} as const;

/** Warna ikan menurut jenis. */
export const WI = { guppy: "#FB923C", koki: "#F59E0B", neon: "#22D3EE", cupang: "#A78BFA" } as const;
const KACA = "#0E7490";
const AIR = "#A5F3FC";

const f = (n: number): number => Number(n.toFixed(1));
type Ubah = Partial<Obj> & { id: string };

/* ------------------------------ Baris ikan dan garis pasangan ------------------------------ */

/** Sebaris `n` ikan `${id}{i}` mulai x = `x0` berjarak `dx` di tinggi `y`. */
export const barisIkan = (id: string, n: number, x0: number, y: number, dx: number, warna: string, s = 0.5): Obj[] =>
  Array.from({ length: n }, (_, i) => ikan(`${id}${i}`, f(x0 + i * dx), y, warna, s)).flat();
/** Id ikan nomor `dari` sampai `sampai` (tanpa mata). */
export const idIkan = (id: string, dari: number, sampai: number): string[] => Array.from({ length: sampai - dari + 1 }, (_, i) => `${id}${dari + i}`);
/** Garis pasangan tegak `${id}{i}` bagi `n` pasang: dari tinggi `y1` ke `y2`, tergambar bertahap. */
export const garisPasang = (id: string, n: number, x0: number, dx: number, y1: number, y2: number, warna: string = W.merah): Obj[] =>
  Array.from({ length: n }, (_, i) => garis(`${id}${i}`, f(x0 + i * dx), y1, 0, y2 - y1, warna, 1.5, { gambar: true }));

/* ------------------------------ Akuarium berisi ikan ------------------------------ */

const DX_ISI = 11.5;
/** Pusat ikan ke-i di akuarium (pojok kiri-atas x, y; lebar w), disusun mendatar menurun. */
export const titikIsi = (x: number, y: number, w: number, i: number): Titik => {
  const kol = Math.max(1, Math.floor((w - 10) / DX_ISI));
  return { x: f(x + 10 + (i % kol) * DX_ISI), y: f(y + 17 + Math.floor(i / kol) * 11) };
};
/** Akuarium kecil berisi `n` ikan: kaca `${id}`, air `${id}-a`, ikan `${id}f{i}`. */
export const akuariumIsi = (id: string, x: number, y: number, w: number, h: number, n: number, warna: string): Obj[] => [
  kotak(id, x, y, w, h, "#ECFEFF", KACA, { rx: 6, tebal: 2.2, z: -3 }),
  kotak(`${id}-a`, x + 3, y + 8, w - 6, h - 11, AIR, undefined, { rx: 4, z: -2 }),
  ...Array.from({ length: n }, (_, i) => {
    const p = titikIsi(x, y, w, i);
    return ikan(`${id}f${i}`, p.x, p.y, warna, 0.36);
  }).flat(),
];
/** Akuarium berlabel angka: akuarium berisi ikan, label `${id}-l` dan angka `${id}-n` di bawahnya. */
export const akuariumAngka = (id: string, x: number, y: number, w: number, h: number, n: number, warna: string): Obj[] => [
  ...akuariumIsi(id, x, y, w, h, n, warna),
  kotak(`${id}-l`, x + w / 2 - 17, y + h + 5, 34, 22, W.putih, W.biru, { rx: 5, tebal: 1.6, z: -1 }),
  teks(`${id}-n`, x + w / 2, y + h + 21, String(n), 15, W.biru),
];

/* ------------------------------ Kartu angka ------------------------------ */

/** Kartu angka: kotak `${id}-k` dan angka `${id}-t`. Pojok kiri-atas (x, y). */
export const kartuBil = (id: string, x: number, y: number, isi: string, warna: string, w = 56, h = 50, u = 26): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, tebal: 1.8 }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, isi, u, W.merah),
];
/** Pindahkan kartu angka ke pojok kiri-atas (x, y); lebar w. */
export const geserKartu = (id: string, x: number, w = 56): Ubah[] => [
  { id: `${id}-k`, x },
  { id: `${id}-t`, x: x + w / 2 },
];

/* ------------------------------ Menara kubus ------------------------------ */

/** Ukuran satu kubus pada menara. */
export const KUBUS = { w: 8, h: 6 } as const;
/** Menara `n` kubus `${id}{i}` berdiri di x (tengah) dan tinggi dasar `yDasar`. */
export const menara = (id: string, x: number, yDasar: number, n: number, warna: string): Obj[] =>
  Array.from({ length: n }, (_, i) => kotak(`${id}${i}`, f(x - KUBUS.w / 2), yDasar - (i + 1) * KUBUS.h, KUBUS.w, KUBUS.h, warna, W.biru, { rx: 1, tebal: 0.8 }));
/** Id kubus menara. */
export const idMenara = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);
/** Geser menara `n` kubus ke tengah x. */
export const geserMenara = (id: string, n: number, x: number): Ubah[] => idMenara(id, n).map((c) => ({ id: c, x: f(x - KUBUS.w / 2) }));
/** Tinggi puncak menara n kubus. */
export const puncak = (yDasar: number, n: number): number => yDasar - n * KUBUS.h;

/* ------------------------------ Garis bilangan 0 sampai 20 ------------------------------ */

export const GB = { x0: 20, dx: 13, y: 118 } as const;
export const xGB = (n: number): number => GB.x0 + n * GB.dx;
/** Garis bilangan 0 sampai 20: garis `${id}`, takik `${id}-g{n}`, angka `${id}-a{n}`. */
export function garisBil(id: string, y: number = GB.y): Obj[] {
  const out: Obj[] = [garis(id, GB.x0 - 8, y, GB.dx * 20 + 16, 0, W.biru, 2)];
  for (let n = 0; n <= 20; n += 1) out.push(garis(`${id}-g${n}`, xGB(n), y - 4, 0, 8, W.biru, 1.4), teks(`${id}-a${n}`, xGB(n), y + 15, String(n), 7, n % 5 === 0 ? W.merah : W.biru));
  return out;
}
/** Penanda bulat `${id}` di bilangan n pada garis tinggi y, dengan angka `${id}-n` di atasnya. */
export const penanda = (id: string, n: number, warna: string, y: number = GB.y): Obj[] => [
  bulat(id, xGB(n), y, 5, warna, W.biru, { tebal: 1.4, z: 2 }),
  teks(`${id}-n`, xGB(n), y - 12, String(n), 11, W.merah),
];

/* ------------------------------ Spanduk, pita, konfeti ------------------------------ */

/** Spanduk lapak: kain `${id}-k`, tulisan `${id}-t0`, dan dua tali `${id}-a`, `${id}-b`. */
export const spanduk = (id: string, x: number, y: number, w: number, isi: string): Obj[] => [
  garis(`${id}-a`, x + 8, y - 8, 0, 8, W.coklat, 2),
  garis(`${id}-b`, x + w - 8, y - 8, 0, 8, W.coklat, 2),
  kotak(`${id}-k`, x, y, w, 26, W.emas, W.biru, { rx: 6, tebal: 2 }),
  teks(`${id}-t0`, x + w / 2, y + 17, isi, 11, W.biru),
];
const WARNA_KONFETI = ["#F472B6", "#FACC15", "#22D3EE", "#A78BFA", "#34D399", "#FB923C"];
const TITIK_KONFETI: [number, number, number][] = [[24, 36, 8], [60, 58, -14], [96, 30, 20], [140, 52, -6], [186, 34, 14], [226, 60, -18], [262, 38, 10], [282, 74, -10], [14, 84, 16], [118, 76, 24]];
/** Sepuluh keping konfeti `${id}{i}` berhamburan di bagian atas. */
export const konfeti = (id: string): Obj[] =>
  TITIK_KONFETI.map(([x, y, r], i) => kotak(`${id}${i}`, x, y, 7, 4, WARNA_KONFETI[i % WARNA_KONFETI.length], undefined, { rx: 1, rot: r, z: 3 }));
