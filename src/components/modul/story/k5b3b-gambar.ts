import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 3 Sub-Bab B (penjumlahan pecahan): batang pecahan, lingkaran irisan (martabak), kumpulan penghapus,
 * pita, dan garis bilangan. Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
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
};

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

/** Segmen berwarna: [dari, sampai) menurut nomor sel, dan warna isinya. */
export type Segmen = [number, number, string];
const warnaSel = (i: number, seg: Segmen[]): string => seg.find((s) => i >= s[0] && i < s[1])?.[2] ?? W.putih;

/** Batang pecahan: n sel sama lebar mulai (x, y), lebar total w. Id `${id}-0` sampai `${id}-${n - 1}`. Sel berwarna menurut segmen. */
export function batang(id: string, x: number, y: number, w: number, h: number, n: number, seg: Segmen[], tepi: string = W.biru): Obj[] {
  return Array.from({ length: n }, (_, i) => kotak(`${id}-${i}`, Math.round(((x + (i * w) / n) * 10)) / 10, y, Math.round((w / n) * 10) / 10, h, warnaSel(i, seg), tepi, { rx: 0, tebal: 1.1 }));
}

/** Banyak sel berwarna (bukan putih) pada batang atau lingkaran berid `id` di daftar benda. */
export const hitungIsi = (objs: Obj[], id: string, n: number): number => Array.from({ length: n }, (_, i) => objs.find((o) => o.id === `${id}-${i}`)).filter((o) => o && o.warna !== W.putih).length;

const f1 = (v: number): string => (Math.round(v * 10) / 10).toFixed(1);

/** Lingkaran berpusat (x, y) berjari-jari r dengan n irisan sama besar, irisan pertama mulai dari atas searah jarum jam. Id `${id}-0` dst. */
export function lingkaran(id: string, x: number, y: number, r: number, n: number, seg: Segmen[]): Obj[] {
  return Array.from({ length: n }, (_, i) => {
    const a1 = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    const a2 = -Math.PI / 2 + ((i + 1) * 2 * Math.PI) / n;
    const d = `M0 0 L${f1(r * Math.cos(a1))} ${f1(r * Math.sin(a1))} A${r} ${r} 0 0 1 ${f1(r * Math.cos(a2))} ${f1(r * Math.sin(a2))} Z`;
    return jalur(`${id}-${i}`, x, y, d, warnaSel(i, seg), W.biru, { tebal: 1.1 });
  });
}

/** Kumpulan benda kecil (penghapus) dalam 2 baris 5 kolom mulai (x, y). Id `${id}-0` sampai `${id}-9`; warna menurut segmen. */
export function penghapus(id: string, x: number, y: number, seg: Segmen[], lebar = 16, tinggi = 9, jarak = 21): Obj[] {
  return Array.from({ length: 10 }, (_, i) => kotak(`${id}-${i}`, x + (i % 5) * jarak, y + Math.floor(i / 5) * 17, lebar, tinggi, warnaSel(i, seg), W.biru, { rx: 2, tebal: 1.1 }));
}

/** Garis bilangan dari 0 sampai 1 selebar w mulai (x, y) dengan n bagian: garis `${id}-g`, tanda `${id}-b0`..`${id}-b${n}`. */
export function garisBilangan(id: string, x: number, y: number, w: number, n: number): Obj[] {
  const out: Obj[] = [garis(`${id}-g`, x, y, w, 0, W.hitam, 2)];
  for (let i = 0; i <= n; i += 1) out.push(garis(`${id}-b${i}`, Math.round((x + (i * w) / n) * 10) / 10, y - 4, 0, 8, W.hitam, 1.6));
  return out;
}

/** Kisi persegi panjang baris x kolom sel sama besar mulai (x, y), lebar total w dan tinggi total h. Id sel `${id}-0` dst, urutan baris demi baris. */
export function kisi(id: string, x: number, y: number, w: number, h: number, baris: number, kolom: number, seg: Segmen[]): Obj[] {
  return Array.from({ length: baris * kolom }, (_, i) =>
    kotak(`${id}-${i}`, Math.round((x + ((i % kolom) * w) / kolom) * 10) / 10, Math.round((y + (Math.floor(i / kolom) * h) / baris) * 10) / 10, Math.round((w / kolom) * 10) / 10, Math.round((h / baris) * 10) / 10, warnaSel(i, seg), W.biru, { rx: 0, tebal: 1.1 }),
  );
}

/** Lompatan melengkung di atas garis, dari (x, y) sejauh dx ke kanan. Titik mendarat = x + dx. */
export const lompat = (id: string, x: number, y: number, dx: number, warna: string, o: Opsi = {}): Obj =>
  jalur(id, x, y, `M0 0 Q${f1(dx / 2)} -22 ${f1(dx)} 0`, "none", warna, { tebal: 2.2, gambar: true, ...o });

/** Posisi mendatar tanda ke-i pada garis bilangan. */
export const posisiBil = (x: number, w: number, n: number, i: number): number => Math.round((x + (i * w) / n) * 10) / 10;
