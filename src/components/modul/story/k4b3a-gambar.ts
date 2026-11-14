import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 3 Sub-Bab A (Pola Gambar, termasuk pembuka bab): kumpulan benda bulat, cincin, silang, deret segitiga,
 * kisi belah ketupat, tabel, dan kartu. Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
 * Benda bernama `id-o{nomor}` (bulat), `id-t{nomor}` (segitiga), `id-u{nomor}` (belah ketupat) supaya uji bisa menghitung banyaknya dari gambar.
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

/** Satu baris tabel (kepala bila `kepala`): id sel `${id}-s{kolom}` (kotak) dan `${id}-t{kolom}` (teks). Untuk baris yang muncul satu per satu. */
export function barisTabel(id: string, x: number, y: number, kolW: number[], isi: string[], tinggi = 16, u = 8, kepala = false, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  let px = x;
  isi.forEach((sel, c) => {
    out.push(kotak(`${id}-s${c}`, px, y, kolW[c], tinggi, kepala ? W.krem : W.putih, W.biru, { rx: 0, tebal: 1, ...o }));
    if (sel) out.push(teks(`${id}-t${c}`, px + kolW[c] / 2, y + tinggi / 2 + u * 0.35, sel, u, kepala || c === 0 ? W.biru : W.hijau, o));
    px += kolW[c];
  });
  return out;
}

/** Id semua benda (kotak dan teks) satu baris tabel. */
export const idBaris = (id: string, r: number, kolom: number): string[] => Array.from({ length: kolom }, (_, c) => [`${id}-s${r}${c}`, `${id}-t${r}${c}`]).flat();

/* ------------------------------ Data pola dari Buku Siswa (dihitung dari gambar PDF) ------------------------------ */

/** Aktivitas 1 (hlm. 87-88): banyak kelereng kumpulan 1, 2, 3 untuk kelompok 1 sampai 4 (pola membesar). */
export const KELOMPOK_MEMBESAR: readonly (readonly number[])[] = [[1, 2, 3], [2, 4, 6], [1, 3, 5], [2, 5, 8]];
/** Aktivitas 2 (hlm. 91): kelompok 1 sampai 4 (pola mengecil). */
export const KELOMPOK_MENGECIL: readonly (readonly number[])[] = [[4, 3, 2], [6, 4, 2], [7, 5, 3], [8, 6, 4]];
/** Jeruk hlm. 89 dan 90: kumpulan 1 sampai 3 pada gambar, tabel sampai kumpulan 7. */
export const JERUK = [2, 4, 6] as const;
export const JERUK_TABEL = [2, 4, 6, 8, 10, 12, 14] as const;
/** Permen lolipop hlm. 92 (tiga kumpulan) dan tabel hlm. 93 (lima kumpulan). */
export const LOLIPOP = [9, 7, 5] as const;
export const PERMEN_TABEL = [9, 7, 5, 3, 1] as const;
/** Ayo Berlatih nomor 1 sampai 4 (hlm. 93 dan 94) dan kunci Panduan Guru hlm. 127 dan 128. */
export const LATIHAN = { semangka: [4, 8, 12], bola: [1, 5, 9], segitiga: [7, 5, 3], ubin: [13, 10, 7] } as const;
export const KUNCI_LATIHAN = { semangka: 16, bola: 13, segitiga: 1, ubin: 4 } as const;
/** Nomor 5: tiap baris empat kotak, 0 = kotak kosong. Pilihan di kanan (atas ke bawah) dan kunci Panduan Guru (indeks pilihan). */
export const APEL_BARIS: readonly (readonly number[])[] = [[2, 0, 6, 8], [3, 5, 0, 9], [0, 3, 5, 7], [8, 6, 4, 0]];
export const APEL_PILIHAN = [7, 2, 4, 1] as const;
export const APEL_KUNCI = [2, 0, 3, 1] as const;
/** Ubin belah ketupat nomor 4 (hlm. 94): tiap baris string, "x" = satu ubin, kolom ke-c berjarak c setengah lebar. Suku ke-4 sama dengan kunci hlm. 128. */
export const UBIN_PETA: readonly (readonly string[])[] = [
  ["x.x.x", ".x.x.", "x.x.x", ".x.x.", "x.x.x"],
  ["x.x..", ".x.x.", "x.x..", ".x.x.", "x.x.."],
  ["x....", ".x.x.", "x....", ".x.x.", "x...."],
  ["x.x..", ".....", "x.x..", ".....", "....."],
];
export const banyakUbin = (p: readonly string[]): number => p.join("").split("x").length - 1;

/* ------------------------------ Benda dan bentuk berpola ------------------------------ */

/** `n` benda bulat berderet per baris `per`; pusat benda pertama di (x, y), jarak antarpusat s. Id `${id}-o{nomor}`. */
export function benda(id: string, x: number, y: number, n: number, per: number, s: number, r: number, warna: string, garisW: string | undefined = W.coklat, o: Opsi = {}): Obj[] {
  return Array.from({ length: n }, (_, i) => bulat(`${id}-o${i}`, x + (i % per) * s, y + Math.floor(i / per) * s, r, warna, garisW, { tebal: 1, ...o }));
}

/** Id `n` benda buatan `benda`, `cincin`, atau `silang`. */
export const idBenda = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}-o${i}`);

/** Cincin kk kali kk: hanya benda di tepi (4kk - 4 benda), pusat benda pojok kiri-atas di (x, y). */
export function cincin(id: string, x: number, y: number, kk: number, s: number, r: number, warna: string, garisW: string | undefined = W.coklat, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  for (let b = 0; b < kk; b += 1) for (let c = 0; c < kk; c += 1) if (b === 0 || c === 0 || b === kk - 1 || c === kk - 1) out.push(bulat(`${id}-o${out.length}`, x + c * s, y + b * s, r, warna, garisW, { tebal: 1, ...o }));
  return out;
}

/** Cincin kk kali kk dibagi empat sisi senama (tiap sisi kk - 1 benda, searah jarum jam dari pojok kiri-atas), tiap sisi satu warna. */
export function cincinBagian(id: string, x: number, y: number, kk: number, s: number, r: number, warna: readonly string[], o: Opsi = {}): Obj[] {
  const sel: [number, number, number][] = [];
  for (let c = 0; c < kk - 1; c += 1) sel.push([0, c, 0]);
  for (let b = 0; b < kk - 1; b += 1) sel.push([b, kk - 1, 1]);
  for (let c = kk - 1; c > 0; c -= 1) sel.push([kk - 1, c, 2]);
  for (let b = kk - 1; b > 0; b -= 1) sel.push([b, 0, 3]);
  return sel.map(([b, c, sisi], i) => bulat(`${id}-o${i}`, x + c * s, y + b * s, r, warna[sisi], W.coklat, { tebal: 1, ...o }));
}

/** Silang: satu benda di pusat (cx, cy) dan empat lengan miring sepanjang n benda (4n + 1 benda). */
export function silang(id: string, cx: number, cy: number, n: number, s: number, r: number, warna: string, garisW: string | undefined = W.coklat, o: Opsi = {}): Obj[] {
  const out: Obj[] = [bulat(`${id}-o0`, cx, cy, r, warna, garisW, { tebal: 1, ...o })];
  for (let d = 1; d <= n; d += 1) for (const [dx, dy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) out.push(bulat(`${id}-o${out.length}`, cx + dx * d * s, cy + dy * d * s, r, warna, garisW, { tebal: 1, ...o }));
  return out;
}

/** Deret segitiga: m segitiga tegak ditambah m - 1 segitiga terbalik di sela-selanya (2m - 1 segitiga). Pojok kiri-atas di (x, y), alas w, tinggi h. Id `${id}-t{nomor}`. */
export function deretSegitiga(id: string, x: number, y: number, m: number, w: number, h: number, warna: string, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  for (let i = 0; i < m; i += 1) {
    out.push(jalur(`${id}-t${out.length}`, x, y, `M${i * w} ${h} L${i * w + w / 2} 0 L${(i + 1) * w} ${h} Z`, warna, W.merahTua, { tebal: 1.2, ...o }));
    if (i < m - 1) out.push(jalur(`${id}-t${out.length}`, x, y, `M${i * w + w / 2} 0 L${(i + 1) * w + w / 2} 0 L${(i + 1) * w} ${h} Z`, W.krem, W.merahTua, { tebal: 1.2, ...o }));
  }
  return out;
}

/** Kisi belah ketupat menurut peta (lihat UBIN_PETA): setengah lebar a, setengah tinggi b, pojok kiri-atas kotak pembatas di (x, y). Id `${id}-u{nomor}`. */
export function ubinBelah(id: string, x: number, y: number, p: readonly string[], a: number, b: number, warna: string, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  p.forEach((baris, r) =>
    [...baris].forEach((c, kol) => {
      if (c !== "x") return;
      const cx = kol * a;
      const cy = r * b;
      out.push(jalur(`${id}-u${out.length}`, x + a, y + b, `M${cx} ${cy - b} L${cx + a} ${cy} L${cx} ${cy + b} L${cx - a} ${cy} Z`, warna, W.merahTua, { tebal: 1.1, ...o }));
    }),
  );
  return out;
}

/** Deret kotak angka: kotak berisi bilangan (0 = kotak kosong bertanda "?"). Id `${id}-s{i}` dan `${id}-n{i}`. */
export function deretAngka(id: string, x: number, y: number, nilai: readonly number[], lebar: number, tinggi: number, warna: string, u = 9, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  nilai.forEach((n, i) => {
    out.push(kotak(`${id}-s${i}`, x + i * lebar, y, lebar, tinggi, n === 0 ? W.putih : warna, W.biru, { rx: 2, tebal: 1.2, ...o }));
    out.push(teks(`${id}-n${i}`, x + i * lebar + lebar / 2, y + tinggi / 2 + u * 0.35, n === 0 ? "?" : String(n), u, n === 0 ? W.merah : W.biru, o));
  });
  return out;
}
