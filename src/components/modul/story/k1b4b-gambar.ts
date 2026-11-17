import type { Obj } from "./logika-story";
import { E as E_A, W, bulat, garis, kartu, kotak, teks, type Titik } from "./k1b2a-gambar";

/**
 * Gambar khusus Story Kelas 1 Bab 4 Sub-Bab B "Teras Penuh Barang" (memilah benda), lanjutan Festival Mainan Kardus.
 * Sembilan barang bahan festival `b{i}` (data `BARANG`) selalu sama bentuk, warna, dan ukurannya di semua adegan; yang berubah hanya letaknya.
 * Keranjang anyaman `k-{nama}` dengan anyaman, bibir, papan nama `k-{nama}-nm`, dan lencana isi `k-{nama}-c` (angka `k-{nama}-c-t`).
 */

export { W, bulat, emo, garis, judul, kartu, kotak, orang, teks, label, type Titik } from "./k1b2a-gambar";

export const E = {
  ...E_A,
  tenda: "\u{1F3AA}",
  roda: "\u{1F697}",
  kuas: "\u{1F58C}\u{FE0F}",
  rumah: "\u{1F3E0}",
  dunia: "\u{1F30D}",
  diam: "\u{1F92B}",
  salah: "\u{274C}",
  tunjuk: "\u{1F449}",
  kaca: "\u{1F50D}",
} as const;

export type Bentuk = "lengkung" | "segitiga" | "segi empat";
export type Warna = "merah" | "biru";
export type Ukuran = "besar" | "kecil";
export type Barang = { bentuk: Bentuk; warna: Warna; ukuran: Ukuran };

/** Warna isi bahan. */
export const WARNA_ISI: Record<string, string> = { merah: "#F87171", biru: "#60A5FA", kuning: "#FACC15", hijau: "#4ADE80" };
/** Setengah lebar bentuk menurut ukuran. */
export const UKUR: Record<Ukuran, number> = { besar: 12, kecil: 8 };

/**
 * Sembilan barang di teras (sama di semua adegan dan semua aturan):
 * bentuk lengkung 3, segitiga 2, segi empat 4; warna merah 5, biru 4; ukuran besar 3, kecil 6.
 * Barang 1 adalah karton segitiga merah kecil yang bisa masuk keranjang berbeda tergantung aturan.
 */
export const BARANG: Barang[] = [
  { bentuk: "lengkung", warna: "merah", ukuran: "kecil" },
  { bentuk: "segitiga", warna: "merah", ukuran: "kecil" },
  { bentuk: "segi empat", warna: "biru", ukuran: "besar" },
  { bentuk: "lengkung", warna: "biru", ukuran: "kecil" },
  { bentuk: "segi empat", warna: "merah", ukuran: "besar" },
  { bentuk: "segitiga", warna: "biru", ukuran: "kecil" },
  { bentuk: "lengkung", warna: "merah", ukuran: "besar" },
  { bentuk: "segi empat", warna: "merah", ukuran: "kecil" },
  { bentuk: "segi empat", warna: "biru", ukuran: "kecil" },
];
export const ID_BARANG = BARANG.map((_, i) => `b${i}`);

const f = (n: number): string => String(Number(n.toFixed(1)));

/** Bentuk datar berpusat di (x, y): lengkung = bulatan, segitiga dan segi empat = jalur poligon. */
export function bentukDatar(id: string, bentuk: Bentuk, isi: string, s: number, x: number, y: number, o: Partial<Obj> = {}): Obj {
  if (bentuk === "lengkung") return bulat(id, x, y, s, isi, W.biru, { tebal: 2, ...o });
  const d = bentuk === "segitiga" ? `M0 ${f(-s)} L${f(s)} ${f(s * 0.8)} L${f(-s)} ${f(s * 0.8)} Z` : `M${f(-s)} ${f(-s * 0.8)} L${f(s)} ${f(-s * 0.8)} L${f(s)} ${f(s * 0.8)} L${f(-s)} ${f(s * 0.8)} Z`;
  return { id, t: "jalur", x, y, d, warna: isi, garis: W.biru, tebal: 2, ...o };
}

/** Barang ke-i dari teras di (x, y), id `b{i}`. */
export const barang = (i: number, p: Titik): Obj => bentukDatar(`b${i}`, BARANG[i].bentuk, WARNA_ISI[BARANG[i].warna], UKUR[BARANG[i].ukuran], p.x, p.y);
/** Beberapa barang sekaligus di titik-titik pts (indeks barang = indeks titik bila `pilih` tidak diberikan). */
export const barangDi = (pts: Titik[], pilih: number[] = pts.map((_, i) => i)): Obj[] => pilih.map((i, n) => barang(i, pts[n]));

/** Letak barang berserakan di teras (adegan pembuka). */
export const SERAK: Titik[] = [
  { x: 70, y: 80 },
  { x: 124, y: 92 },
  { x: 196, y: 60 },
  { x: 252, y: 104 },
  { x: 92, y: 124 },
  { x: 172, y: 118 },
  { x: 236, y: 70 },
  { x: 30, y: 98 },
  { x: 278, y: 132 },
];
/** Letak barang berjajar di atas keranjang sebelum diperiksa. */
export const JAJAR: Titik[] = BARANG.map((_, i) => ({ x: 66 + i * 26, y: 78 }));

/* ------------------------------ Keranjang anyaman ------------------------------ */

export type Tempat = { x: number; y: number; w: number; h: number };
const Y_KERANJANG = 118;
const H_KERANJANG = 56;
/** Tiga keranjang berjajar (aturan bentuk). */
export const TIGA: Tempat[] = [12, 107, 202].map((x) => ({ x, y: Y_KERANJANG, w: 86, h: H_KERANJANG }));
/** Dua keranjang berjajar (aturan warna atau ukuran). */
export const DUA: Tempat[] = [14, 156].map((x) => ({ x, y: Y_KERANJANG, w: 130, h: H_KERANJANG }));

/** Keranjang anyaman coklat muda: badan `id`, anyaman `${id}-a{i}`, bibir `${id}-r`, dan papan nama `${id}-nm` di bawahnya. */
export function keranjangAnyam(id: string, t: Tempat, nama: string, warnaNama: string = W.krem): Obj[] {
  const { x, y, w, h } = t;
  const out: Obj[] = [kotak(id, x, y, w, h, "#EBC88F", W.coklat, { rx: 9, tebal: 2.2, z: -4 })];
  out.push(garis(`${id}-a0`, x + 5, y + h / 3, w - 10, 0, "#B7791F", 1.2, { z: -3 }));
  out.push(garis(`${id}-a1`, x + 5, y + (2 * h) / 3, w - 10, 0, "#B7791F", 1.2, { z: -3 }));
  for (let i = 1; i * 18 < w - 6; i += 1) out.push(garis(`${id}-a${i + 1}`, x + i * 18, y + 4, 0, h - 8, "#C9954C", 1, { z: -3 }));
  out.push(kotak(`${id}-r`, x - 3, y - 5, w + 6, 8, "#D69E2E", W.coklat, { rx: 4, tebal: 1.6, z: -2 }));
  out.push(...kartu(`${id}-nm`, x + 6, y + h + 4, w - 12, 18, warnaNama, [nama], 8.6));
  return out;
}

/** Lencana isi keranjang: bulatan emas `${id}-c` dan angka `${id}-c-t` di pojok kanan atas keranjang. */
export const lencana = (id: string, t: Tempat, n: number): Obj[] => [
  bulat(`${id}-c`, t.x + t.w - 6, t.y - 6, 10, W.emas, W.biru, { tebal: 1.6, z: 3 }),
  teks(`${id}-c-t`, t.x + t.w - 6, t.y - 2, String(n), 12, W.biru, { z: 4 }),
];

/** Letak benda ke-n di dalam keranjang (dua baris). */
export function slot(t: Tempat, n: number): Titik {
  const kolom = t.w >= 120 ? 4 : 3;
  const jarak = t.w >= 120 ? 30 : 28;
  const x0 = t.x + (t.w - (kolom - 1) * jarak) / 2;
  return { x: x0 + (n % kolom) * jarak, y: t.y + 16 + Math.floor(n / kolom) * 26 };
}

/** Aturan memilah sembilan barang: nama-nama keranjang dan keranjang tiap barang. */
export const ATURAN = {
  bentuk: { nama: ["lengkung", "segitiga", "segi empat"], ciri: (b: Barang) => b.bentuk as string },
  warna: { nama: ["merah", "biru"], ciri: (b: Barang) => b.warna as string },
  ukuran: { nama: ["besar", "kecil"], ciri: (b: Barang) => b.ukuran as string },
} as const;
export type NamaAturan = keyof typeof ATURAN;
/** Id keranjang untuk nama keranjang (spasi dihapus). */
export const idKeranjang = (nama: string): string => `k-${nama.replace(/\s+/g, "")}`;
/** Tempat keranjang menurut aturan. */
export const tempatAturan = (a: NamaAturan): Tempat[] => (ATURAN[a].nama.length === 3 ? TIGA : DUA);
/** Banyak barang di tiap keranjang menurut aturan. */
export const isiAturan = (a: NamaAturan): number[] => ATURAN[a].nama.map((n) => BARANG.filter((b) => ATURAN[a].ciri(b) === n).length);

/** Letak tiap barang di keranjangnya menurut aturan (urutan masuk = urutan barang). */
export function letakAturan(a: NamaAturan): Titik[] {
  const tempat = tempatAturan(a);
  const hitung = ATURAN[a].nama.map(() => 0);
  return BARANG.map((b) => {
    const j = (ATURAN[a].nama as readonly string[]).indexOf(ATURAN[a].ciri(b));
    const p = slot(tempat[j], hitung[j]);
    hitung[j] += 1;
    return p;
  });
}

/** Warna papan nama keranjang. */
const WARNA_NAMA: Record<string, string> = { lengkung: W.langit, segitiga: W.krem, "segi empat": W.hijauMuda, merah: W.merahMuda, biru: W.langit, besar: W.lavender, kecil: W.pink };
/** Keranjang aturan ke-j. */
export const keranjangAturan = (a: NamaAturan, j: number): Obj[] => keranjangAnyam(idKeranjang(ATURAN[a].nama[j]), tempatAturan(a)[j], ATURAN[a].nama[j], WARNA_NAMA[ATURAN[a].nama[j]]);
/** Semua keranjang aturan. */
export const semuaKeranjang = (a: NamaAturan): Obj[] => ATURAN[a].nama.flatMap((_, j) => keranjangAturan(a, j));
/** Lencana isi keranjang aturan ke-j. */
export const lencanaAturan = (a: NamaAturan, j: number): Obj[] => lencana(idKeranjang(ATURAN[a].nama[j]), tempatAturan(a)[j], isiAturan(a)[j]);
/** Id seluruh bagian keranjang aturan (untuk dihapus). */
export const idKeranjangAturan = (a: NamaAturan): string[] => semuaKeranjang(a).map((o) => o.id);
/** Ubah letak barang-barang terpilih ke keranjang menurut aturan. */
export const masukkan = (a: NamaAturan, pilih: number[]) => pilih.map((i) => ({ id: `b${i}`, x: letakAturan(a)[i].x, y: letakAturan(a)[i].y, sorot: false }));
/** Indeks barang yang cocok dengan nama keranjang. */
export const yangCocok = (a: NamaAturan, nama: string): number[] => BARANG.map((b, i) => (ATURAN[a].ciri(b) === nama ? i : -1)).filter((i) => i >= 0);

/** Lantai teras keramik: kotak `${id}` dan nat `${id}-n{i}`. */
export function lantaiTeras(id: string, x: number, y: number, w: number, h: number): Obj[] {
  const out: Obj[] = [kotak(id, x, y, w, h, "#F5E6D3", "#C08A5B", { rx: 6, tebal: 2, z: -5 })];
  for (let i = 1; i < 5; i += 1) out.push(garis(`${id}-n${i}`, x + (w * i) / 5, y + 3, 0, h - 6, "#E7CBAA", 1, { z: -4 }));
  out.push(garis(`${id}-m`, x + 3, y + h / 2, w - 6, 0, "#E7CBAA", 1, { z: -4 }));
  return out;
}

/** Kancing bulat dengan dua lubang: badan `id`, lubang `${id}-h0` dan `${id}-h1`. */
export const kancing = (id: string, x: number, y: number, isi: string, r = 8): Obj[] => [
  bulat(id, x, y, r, isi, W.biru, { tebal: 1.6 }),
  bulat(`${id}-h0`, x - 2.5, y, 1.4, W.biru, undefined, { z: 1 }),
  bulat(`${id}-h1`, x + 2.5, y, 1.4, W.biru, undefined, { z: 1 }),
];

/** Garis penunjuk dari barang ke keranjang (tergambar bertahap). */
export const tunjukKe = (id: string, dari: Titik, ke: Titik, warna: string = W.ungu): Obj => garis(id, dari.x, dari.y, ke.x - dari.x, ke.y - dari.y, warna, 2.2, { gambar: true, putus: true, z: -1 });
