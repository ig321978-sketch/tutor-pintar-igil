import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 1 Bab 4 Sub-Bab B (mengelompokkan benda): kue, mainan, dan buah sebagai bentuk berwarna
 * (lengkung, segitiga, segi empat), nampan, keranjang, rak, kotak lemari, tanda cocok, dan benda sehari-hari yang sederhana.
 * Berkas ini TIDAK dipakai bab lain. Benda utama berid `id{i}` (dihitung uji); pelengkap berakhiran `-x`.
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#16A34A",
  putih: "#FFFFFF",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  coklat: "#92400E",
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  pink: "#FBCFE8",
  lavender: "#EDE9FE",
  oranye: "#FBA919",
};

/** Warna benda (isi bentuk). */
export const WB = { coklat: "#B45309", hijau: "#4ADE80", merah: "#F87171", kuning: "#FACC15", biru: "#60A5FA" };

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Id benda utama `${id}0` sampai `${id}${n-1}`. */
export const idDeret = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/** Tangan penunjuk (ujung jari ke atas). */
export const tangan = (x: number, y: number, id = "tg"): Obj => emo(id, x, y, "\u{1F446}", 22);

/** Tanda cocok (centang) dan tidak cocok (silang) di titik (x, y). */
export const cocok = (id: string, x: number, y: number, u = 16): Obj => emo(id, x, y, "\u{2705}", u);
export const tidakCocok = (id: string, x: number, y: number, u = 16): Obj => emo(id, x, y, "\u{274C}", u);

/** Penyaring objek dari daftar menurut id (untuk memunculkan bagian gambar bertahap). */
export const ambil = (objs: Obj[], ...ids: string[]): Obj[] => objs.filter((o) => ids.includes(o.id));

/* ------------------------------ Bentuk berwarna ------------------------------ */

export type Bentuk = "lengkung" | "segitiga" | "segiempat";
const f = (n: number): string => n.toFixed(1);

/** Satu bentuk berpusat di (cx, cy) dengan ukuran `s`: lengkung (lingkaran), segitiga (jalur), segi empat (kotak). Benda utama berid `id`. */
export function bentuk(jenis: Bentuk, id: string, cx: number, cy: number, s: number, warna: string, o: Opsi = {}): Obj {
  if (jenis === "lengkung") return bulat(id, cx, cy, s, warna, W.biru, { tebal: 1.6, ...o });
  if (jenis === "segitiga") return { id, t: "jalur", x: cx, y: cy, d: `M0 ${f(-s * 1.05)} L${f(s * 1.15)} ${f(s * 0.8)} L${f(-s * 1.15)} ${f(s * 0.8)} Z`, warna, garis: W.biru, tebal: 1.6, ...o };
  return kotak(id, cx - s * 1.05, cy - s * 0.9, s * 2.1, s * 1.8, warna, W.biru, { rx: 2, tebal: 1.6, ...o });
}

/** Letak (x, y) objek bentuk supaya pusatnya di (cx, cy). */
export const letak = (jenis: Bentuk, cx: number, cy: number, s: number): { x: number; y: number } => (jenis === "segiempat" ? { x: cx - s * 1.05, y: cy - s * 0.9 } : { x: cx, y: cy });

/** Aksi ubah: pindahkan bentuk `id` supaya pusatnya di (cx, cy). */
export const pindah = (jenis: Bentuk, id: string, cx: number, cy: number, s: number): Partial<Obj> & { id: string } => ({ id, ...letak(jenis, cx, cy, s) });

/** Pusat bentuk (objek hasil `bentuk`): kotak berpusat di tengah, lainnya di (x, y). */
export const pusatBentuk = (o: Obj): { x: number; y: number } => (o.t === "kotak" ? { x: (o.x ?? 0) + (o.w ?? 0) / 2, y: (o.y ?? 0) + (o.h ?? 0) / 2 } : { x: o.x ?? 0, y: o.y ?? 0 });

/* ------------------------------ Tempat benda ------------------------------ */

/** Nampan (atau rak, atau keranjang kotak) dengan label di bagian atas: kotak `id`, label `${id}-t`. */
export const nampan = (id: string, x: number, y: number, w: number, h: number, label: string, warna: string = W.krem, u = 8.6): Obj[] => [
  kotak(id, x, y, w, h, warna, W.coklat, { rx: 6, tebal: 1.8 }),
  teks(`${id}-t`, x + w / 2, y + 12, label, u, W.coklat),
];

/** Keranjang kosong dengan pojok kiri-atas (x, y); id `${id}` dan bibir `${id}-r`. */
export const keranjang = (id: string, x: number, y: number, w = 100, h = 44, o: Opsi = {}): Obj[] => [
  kotak(id, x, y, w, h, "#FDE68A", W.coklat, { rx: 6, tebal: 1.8, ...o }),
  kotak(`${id}-r`, x - 3, y - 4, w + 6, 7, "#FCD34D", W.coklat, { rx: 3, tebal: 1.4, ...o }),
];

/* ------------------------------ Kue (enam kue di meja) ------------------------------ */

/** Enam kue. Nomor `urut` mengikuti nampan menurut bentuk: lengkung (cucur, talam), segitiga (risol, lupis), segi empat (lapis, bolu). */
export const KUE: { nama: string; bentuk: Bentuk; warna: "coklat" | "hijau" }[] = [
  { nama: "cucur", bentuk: "lengkung", warna: "coklat" },
  { nama: "talam", bentuk: "lengkung", warna: "hijau" },
  { nama: "risol", bentuk: "segitiga", warna: "coklat" },
  { nama: "lupis", bentuk: "segitiga", warna: "hijau" },
  { nama: "lapis", bentuk: "segiempat", warna: "hijau" },
  { nama: "bolu", bentuk: "segiempat", warna: "coklat" },
];

/** Letak enam kue di meja, urut sebaris: cucur, risol, talam, lapis, bolu, lupis (nomor dalam `KUE`). */
export const URUT_MEJA = [0, 2, 1, 4, 5, 3];
export const MEJA_X = (nomor: number): number => 30 + URUT_MEJA.indexOf(nomor) * 48;

/* ------------------------------ Benda sehari-hari ------------------------------ */

/** Jam dinding berpusat di (cx, cy): lingkaran `id`, jarum `${id}-x` dan `${id}-y`. */
export const jam = (id: string, cx: number, cy: number, r = 14): Obj[] => [bulat(id, cx, cy, r, W.putih, W.biru, { tebal: 2 }), garis(`${id}-x`, cx, cy, 0, -r * 0.62, W.merah, 1.8), garis(`${id}-y`, cx, cy, r * 0.46, 0, W.merah, 1.8)];
/** Jendela atau pintu (segi empat) dengan pojok kiri-atas (x, y). */
export const pintu = (id: string, x: number, y: number, w = 24, h = 38): Obj[] => [kotak(id, x, y, w, h, "#FCD9A8", W.coklat, { rx: 2, tebal: 1.8 }), bulat(`${id}-x`, x + w - 5, y + h / 2, 1.8, W.coklat, W.coklat, { tebal: 1 })];
export const jendela = (id: string, x: number, y: number, w = 30, h = 26): Obj[] => [kotak(id, x, y, w, h, "#BAE6FD", W.coklat, { rx: 2, tebal: 1.8 }), garis(`${id}-x`, x + w / 2, y, 0, h, W.coklat, 1.4), garis(`${id}-y`, x, y + h / 2, w, 0, W.coklat, 1.4)];

/** Panel berjudul: kotak `${id}-k` dan judul di bagian atas `${id}-t`; pojok kiri-atas (x, y). */
export const panel = (id: string, x: number, y: number, w: number, h: number, warna: string, label: string, u = 11): Obj[] => [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8 }), teks(`${id}-t`, x + w / 2, y + 16, label, u)];

export type Titik = { x: number; y: number };
