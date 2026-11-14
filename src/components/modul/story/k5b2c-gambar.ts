import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 2 Sub-Bab C (faktor): pita berpetak yang dipotong, lingkaran faktor dengan kurung pasangan,
 * kisi persegi panjang (susunan), dan baris tabel. Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#16A34A",
  putih: "#FFFFFF",
  hitam: "#1F2937",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  coklat: "#92400E",
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  jingga: "#FDBA74",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  pink: "#FBCFE8",
  hijauPita: "#86EFAC",
  merahPita: "#F87171",
  oranye: "#EA580C",
  pinkTua: "#DB2777",
  tosca: "#0D9488",
};

/** Warna pasangan faktor: pasangan terluar pertama. */
export const WARNA_PASANGAN = [W.oranye, W.biru, W.pinkTua, W.hijau, W.ungu, W.tosca];

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.4, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const jalur = (id: string, x: number, y: number, d: string, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "jalur", x, y, d, warna, garis: garisW, tebal: 1.4, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 8.6, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Id kartu (kotak dan teks) untuk dihapus. */
export const idKartu = (id: string, n = 1): string[] => [`${id}-k`, ...Array.from({ length: n }, (_, i) => `${id}-t${i}`)];

const bulat1 = (v: number): number => Math.round(v * 10) / 10;

/** Semua faktor sebuah bilangan, dari yang terkecil (dihitung dengan membagi satu per satu). */
export function faktor(n: number): number[] {
  const hasil: number[] = [];
  for (let b = 1; b <= n; b += 1) if (n % b === 0) hasil.push(b);
  return hasil;
}

/** Titik tengah mendatar n benda sama jarak dari x0 sampai x1. */
export const sebar = (n: number, x0: number, x1: number): number[] => (n === 1 ? [bulat1((x0 + x1) / 2)] : Array.from({ length: n }, (_, i) => bulat1(x0 + (i * (x1 - x0)) / (n - 1))));

/**
 * Pita berpetak: n petak sama lebar mulai (x, y), lebar total w, dipotong tiap d petak. Potongan penuh berselang-seling warna a dan b;
 * petak sisa (n mod d) berwarna sisa. Petak `${id}-0` dst, garis potong merah `${id}-p1` dst (di tiap kelipatan d sebelum ujung).
 */
export function pita(id: string, x: number, y: number, w: number, h: number, n: number, d: number, a: string = W.jingga, b: string = W.pink, sisa: string = W.merahMuda): Obj[] {
  const lebar = w / n;
  const penuh = n - (n % d);
  const sel = Array.from({ length: n }, (_, i) => kotak(`${id}-${i}`, bulat1(x + i * lebar), y, bulat1(lebar), h, i >= penuh ? sisa : Math.floor(i / d) % 2 === 0 ? a : b, W.biru, { rx: 0, tebal: 1.1 }));
  const potong: Obj[] = [];
  for (let j = 1; j * d < n; j += 1) potong.push(garis(`${id}-p${j}`, bulat1(x + j * d * lebar), y - 3, 0, h + 6, W.merah, 1.6));
  return [...sel, ...potong];
}

/** Id semua benda pita (petak dan garis potong) untuk dihapus. */
export function idPita(id: string, n: number, d: number): string[] {
  const out: string[] = [];
  for (let i = 0; i < n; i += 1) out.push(`${id}-${i}`);
  for (let j = 1; j * d < n; j += 1) out.push(`${id}-p${j}`);
  return out;
}

/** Kisi persegi panjang baris x kolom petak persegi bersisi sel mulai (x, y); `isi` petak pertama (baris demi baris) berwarna, sisanya putih. Id `${id}-0` dst. */
export function kisi(id: string, x: number, y: number, sel: number, baris: number, kolom: number, isi: number, warna: string = W.hijauPita): Obj[] {
  return Array.from({ length: baris * kolom }, (_, i) => kotak(`${id}-${i}`, bulat1(x + (i % kolom) * sel), bulat1(y + Math.floor(i / kolom) * sel), sel, sel, i < isi ? warna : W.putih, W.biru, { rx: 0, tebal: 1.1 }));
}

/** Id semua petak kisi untuk dihapus. */
export const idKisi = (id: string, baris: number, kolom: number): string[] => Array.from({ length: baris * kolom }, (_, i) => `${id}-${i}`);

/**
 * Deret lingkaran faktor: satu lingkaran berangka untuk tiap bilangan di `nilai`, berpusat pada xs[i], baris y. Lingkaran `${id}-b${i}`, angka `${id}-n${i}`.
 * Warna lingkaran mengikuti pasangannya: bilangan ke-i dan ke-(terakhir - i) sewarna.
 */
export function deret(id: string, xs: number[], y: number, r: number, nilai: number[], u = 9): Obj[] {
  const total = nilai.length;
  return nilai.flatMap((v, i) => {
    const warna = WARNA_PASANGAN[Math.min(i, total - 1 - i) % WARNA_PASANGAN.length];
    return [bulat(`${id}-b${i}`, xs[i], y, r, warna, W.putih, { tebal: 1 }), teks(`${id}-n${i}`, xs[i], bulat1(y + u * 0.35), String(v), u, W.putih)];
  });
}

/** Id lingkaran dan angka deret berurutan i dari `dari` sampai `sampai` (termasuk). */
export const idDeret = (id: string, dari: number, sampai: number): string[] => Array.from({ length: sampai - dari + 1 }, (_, q) => [`${id}-b${dari + q}`, `${id}-n${dari + q}`]).flat();

/** Kurung pasangan di bawah deret: menghubungkan pusat dua lingkaran xa dan xb. Garis tergambar bertahap. */
export const kurung = (id: string, xa: number, xb: number, y: number, tinggi: number, warna: string): Obj =>
  jalur(id, xa, y, `M0 0 L0 ${tinggi} L${bulat1(xb - xa)} ${tinggi} L${bulat1(xb - xa)} 0`, "none", warna, { tebal: 2, gambar: true });

/** Kurung semua pasangan sebuah deret `nilai` (urut kecil ke besar): pasangan terluar tertinggi. Kurung `${id}-k${j}`, j = 0 untuk pasangan terluar. */
export function kurungDeret(id: string, xs: number[], y: number, r: number, banyak: number): Obj[] {
  const m = Math.floor(banyak / 2);
  return Array.from({ length: m }, (_, j) => kurung(`${id}-k${j}`, xs[j], xs[banyak - 1 - j], y + r, 9 + (m - 1 - j) * 9, WARNA_PASANGAN[j % WARNA_PASANGAN.length]));
}
