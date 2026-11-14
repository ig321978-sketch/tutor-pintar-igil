import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 4 Sub-Bab A (Pengukuran Luas, termasuk pembuka bab): kisi persegi satuan, bangun berpetak A sampai D
 * (Ayo Berlatih, Buku Siswa hlm. 114), bangun hlm. 118 dan 119, soal hlm. 121, tabel, dan kartu. Berkas ini TIDAK dipakai bab lain.
 * Semua fungsi mengembalikan data benda (Obj) untuk mesin Story. Sel kisi bernama `id-c{baris}-{kolom}` supaya uji bisa menghitung luasnya dari gambar.
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
  lavender: "#EDE9FE",
  oranye: "#FBA919",
  kuning: "#FFF000",
  merahTua: "#D3232B",
  biruMuda: "#2B8FD0",
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
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

/** Tabel sederhana: baris pertama kepala. Id sel `${id}-s{r}{c}` (kotak) dan `${id}-t{r}{c}` (teks). */
export function tabel(id: string, x: number, y: number, kolW: number[], baris: string[][], tinggi = 16, u = 8, warnaKepala: string = W.krem, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  baris.forEach((b, r) => {
    let px = x;
    b.forEach((sel, c) => {
      out.push(kotak(`${id}-s${r}${c}`, px, y + r * tinggi, kolW[c], tinggi, r === 0 ? warnaKepala : W.putih, W.biru, { rx: 0, tebal: 1, ...o }));
      if (sel) out.push(teks(`${id}-t${r}${c}`, px + kolW[c] / 2, y + r * tinggi + tinggi / 2 + u * 0.35, sel, u, r === 0 || c === 0 ? W.biru : W.hijau, o));
      px += kolW[c];
    });
  });
  return out;
}

/** Id semua benda (kotak dan teks) satu baris tabel. */
export const idBaris = (id: string, r: number, kolom: number): string[] => Array.from({ length: kolom }, (_, c) => [`${id}-s${r}${c}`, `${id}-t${r}${c}`]).flat();

/* ------------------------------ Kisi persegi satuan ------------------------------ */

/** Peta sel: tiap string satu baris, "#" = sel terisi, "." = kosong. */
export type Peta = readonly string[];

/**
 * Bangun berpetak dari Buku Siswa, diukur dari gambar PDF (warna sel dibaca per petak):
 * A-D: Ayo Berlatih hlm. 114 (kunci Panduan Guru hlm. 151: 13, 13, 11, 15).
 * II: bangun (ii) hlm. 118 (13 cm2, sel bernomor 1 sampai 13 di kisi 5 kali 5).
 * L1 dan L2: dua bangun di kisi 8 kali 8 pada hlm. 119 (masing-masing 9 cm2).
 * N2: Ayo Berlatih nomor 2 hlm. 121 (kisi 8 kali 5, kunci 12 cm2).
 */
export const PETA: Record<string, Peta> = {
  A: ["#..", "#..", "##.", "###", "###", "###"],
  B: [".#...", "##...", "##.##", "#####", "..#.."],
  C: ["#....", ".##..", "####.", ".##..", "...##"],
  D: ["..###", "..#.#", "..#.#", "..#.#", "....#", "#####"],
  II: [".#...", "##...", "##.##", "#####", "..#.."],
  L1: ["...#....", "...#....", "...#....", "...#....", "...#....", "...#....", "...#....", "...##..."],
  L2: ["........", "........", "..##....", "..###...", "...###..", "....#...", "........", "........"],
  N2: ["........", ".######.", ".#....#.", ".##..##.", "........"],
};

/** Peta persegi panjang penuh kol kali bar. */
export const penuh = (kol: number, bar: number): Peta => Array.from({ length: bar }, () => "#".repeat(kol));

/** Banyak sel terisi pada peta. */
export const luasPeta = (p: Peta): number => p.join("").split("#").length - 1;

/** Banyak sel terisi per baris. */
export const perBaris = (p: Peta): number[] => p.map((b) => b.split("#").length - 1);

/** Sel terisi sebagai kotak persegi s kali s, pojok kiri-atas peta di (x, y). Id `${id}-c{baris}-{kolom}`. */
export function sel(id: string, x: number, y: number, p: Peta, s: number, warna: string, garisW: string | undefined = W.coklat, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  p.forEach((b, r) => [...b].forEach((c, k) => c === "#" && out.push(kotak(`${id}-c${r}-${k}`, x + k * s, y + r * s, s, s, warna, garisW, { rx: 0, tebal: 0.8, ...o }))));
  return out;
}

/** Id semua sel terisi suatu peta (untuk menyorot atau menghapus). */
export const idSel = (id: string, p: Peta): string[] => p.flatMap((b, r) => [...b].flatMap((c, k) => (c === "#" ? [`${id}-c${r}-${k}`] : [])));

/** Kisi latar kosong kol kali bar sel abu muda (garis kisi), pojok kiri-atas (x, y). Id `${id}-g{baris}-{kolom}`. */
export function kisiLatar(id: string, x: number, y: number, kol: number, bar: number, s: number, warna: string = W.putih, garisW: string = W.abu, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  for (let r = 0; r < bar; r += 1) for (let k = 0; k < kol; k += 1) out.push(kotak(`${id}-g${r}-${k}`, x + k * s, y + r * s, s, s, warna, garisW, { rx: 0, tebal: 0.8, ...o }));
  return out;
}

/** Nomor 1 sampai n pada sel terisi menurut urutan baca (kiri ke kanan, atas ke bawah), tinggi huruf u. Id `${id}-n{nomor}`. */
export function nomori(id: string, x: number, y: number, p: Peta, s: number, u = 6.4, warna: string = W.biru): Obj[] {
  const out: Obj[] = [];
  let n = 0;
  p.forEach((b, r) => [...b].forEach((c, k) => {
    if (c !== "#") return;
    n += 1;
    out.push(teks(`${id}-n${n}`, x + k * s + s / 2, y + r * s + s / 2 + u * 0.35, String(n), u, warna));
  }));
  return out;
}

/** Id nomor 1 sampai n yang dibuat `nomori`. */
export const idNomor = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}-n${i + 1}`);

/** Segitiga (jalur tertutup) pada kisi: titik dalam satuan petak, pojok kiri-atas kisi di (x, y), petak berukuran s. Id berformat `nama@segitiga`. */
export function segitigaKisi(id: string, x: number, y: number, titik: [number, number][], s: number, warna: string): Obj {
  const d = `${titik.map((t, i) => `${i === 0 ? "M" : "L"}${(t[0] * s).toFixed(1)} ${(t[1] * s).toFixed(1)}`).join(" ")} Z`;
  return jalur(`${id}@segitiga`, x, y, d, warna, W.biru, { tebal: 1.8, op: 0.85 });
}

/** Titik sudut segitiga pada Ayo Berlatih nomor 3 (hlm. 121) dalam satuan petak: kisi 8 kali 5, alas 6 petak, tinggi 3 petak. */
export const SEGITIGA_N3: [number, number][] = [[4, 1], [7, 4], [1, 4]];
/** Petak [baris, kolom] yang tertutup penuh oleh segitiga itu (6 petak) dan yang tertutup setengah (6 petak). Diperiksa uji dengan pencuplikan. */
export const SEGITIGA_PENUH: [number, number][] = [[2, 3], [2, 4], [3, 2], [3, 3], [3, 4], [3, 5]];
export const SEGITIGA_SETENGAH: [number, number][] = [[1, 3], [1, 4], [2, 2], [2, 5], [3, 1], [3, 6]];
