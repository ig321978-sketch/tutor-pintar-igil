import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 1 Sub-Bab D (Komposisi dan Dekomposisi Bilangan Cacah sampai 10.000): papan nilai tempat, kartu bagian,
 * deret uang Helen, dan diagram ikatan bilangan. Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj).
 * Papan nilai tempat: kotak kepala `id-h{kolom}`, teks kepala `id-ht{kolom}`, kotak angka `id-d{kolom}`, teks angka `id-dt{kolom}` (kolom 0 = ribuan sampai 3 = satuan)
 * supaya uji bisa membaca ulang angka yang tergambar. Uang: `id-k{i}` (kotak) dan `id-t{i}` (nilai) supaya uji bisa menjumlah ulang.
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
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis: garisW, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis: garisW, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 8.6, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Satu baris tabel (kepala bila `kepala`): id sel `${id}-s{kolom}` (kotak) dan `${id}-t{kolom}` (teks). */
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

/* ------------------------------ Data dari Buku Siswa dan Panduan Guru (dibaca dari PDF) ------------------------------ */

export const TEMPAT = ["Ribuan", "Ratusan", "Puluhan", "Satuan"] as const;
/** Nilai satu angka pada tempat ke-0 (ribuan) sampai ke-3 (satuan). */
export const NILAI_TEMPAT = [1000, 100, 10, 1] as const;
const WARNA_TEMPAT = [W.langit, W.hijauMuda, W.krem, W.pink];

/** Komposisi Buku Siswa hlm. 24-25: angka 6, 3, 4, 8 membentuk 6.348. */
export const KOMPOSISI_CONTOH = [6, 3, 4, 8] as const;
/** Ayo Berlatih hlm. 25 (papan satu dan dua) dan contoh papan tiga Panduan Guru hlm. 47: 6.482, 6.040, 4.530. */
export const KOMPOSISI_LATIHAN: readonly (readonly number[])[] = [
  [6, 4, 8, 2],
  [6, 0, 4, 0],
  [4, 5, 3, 0],
];
/** Dekomposisi Buku Siswa hlm. 26: 6.789 (letak angka) dan 6.849 (tabel dan uraian). */
export const URAI_LETAK = [6, 7, 8, 9] as const;
export const URAI_CONTOH = [6, 8, 4, 9] as const;
/** Buku Siswa hlm. 27: 6.035 dengan nol ratusan. */
export const URAI_NOL = [6, 0, 3, 5] as const;
/** Ayo Berlatih nomor 1 (hlm. 27-28), kunci Panduan Guru hlm. 47. */
export const URAI_LATIHAN: readonly (readonly number[])[] = [
  [6, 4, 8, 2],
  [7, 0, 2, 0],
  [2, 0, 0, 1],
  [7, 0, 0, 0],
  [9, 9, 9, 9],
];
/** Uang Helen (Buku Siswa hlm. 28): nilai pecahan lalu banyak keping atau lembar. */
export const UANG_HELEN: readonly (readonly [number, number])[] = [
  [100, 4],
  [500, 2],
  [1000, 5],
  [2000, 7],
];
export const HARGA_SLAMET = 7300;
export const BAYAR_SLAMET = 10000;
/** Contoh jawaban Panduan Guru hlm. 48 untuk 7.300 (a) dan 10.000 (b): daftar nilai uang. */
export const URAIAN_7300: readonly (readonly number[])[] = [
  [2000, 2000, 2000, 1000, 100, 100, 100],
  [2000, 2000, 1000, 1000, 1000, 100, 100, 100],
  [2000, 1000, 1000, 1000, 1000, 1000, 100, 100, 100],
];
export const URAIAN_10000: readonly (readonly number[])[] = [
  [2000, 2000, 2000, 2000, 2000],
  [2000, 2000, 2000, 1000, 1000, 1000, 1000],
  [2000, 2000, 2000, 2000, 1000, 500, 500],
];

/** Angka dengan titik ribuan, mis. 6348 menjadi "6.348". */
export const rb = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
export const angkaDari = (d: readonly number[]): number => d.reduce((s, v, i) => s + v * NILAI_TEMPAT[i], 0);

/* ------------------------------ Papan nilai tempat ------------------------------ */

/** Satu angka pada kolom `c` papan `id` (id `${id}-dt${c}`). */
export const angka = (id: string, x: number, y: number, kolW: number, c: number, isi: number | string, u = 9, o: Opsi = {}): Obj => teks(`${id}-dt${c}`, x + c * kolW + kolW / 2, y + 16 + 11 + u * 0.35, String(isi), u + 3, W.hijau, o);

/** Papan empat kolom (ribuan, ratusan, puluhan, satuan); pojok kiri-atas (x, y), tiap kolom selebar `kolW`. Baris kepala 16 tinggi, baris angka 22 tinggi. `isi` mengisi angka bila ada. */
export function papan(id: string, x: number, y: number, kolW: number, isi?: readonly (number | string)[], u = 9, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  for (let c = 0; c < 4; c += 1) {
    out.push(kotak(`${id}-h${c}`, x + c * kolW, y, kolW, 16, WARNA_TEMPAT[c], W.biru, { rx: 0, tebal: 1.2, ...o }));
    out.push(teks(`${id}-ht${c}`, x + c * kolW + kolW / 2, y + 11.2, TEMPAT[c], 8, W.biru, o));
    out.push(kotak(`${id}-d${c}`, x + c * kolW, y + 16, kolW, 22, W.putih, W.biru, { rx: 0, tebal: 1.2, ...o }));
    if (isi) out.push(angka(id, x, y, kolW, c, isi[c], u, o));
  }
  return out;
}

/** Empat kartu bagian berderet (mis. "6 ribuan") dengan tanda tambah di antaranya; pojok kiri (14, y). Kartu `${id}{i}-k` dan `${id}{i}-t0`, tanda `${id}p{i}`. */
export function susunBagian(id: string, y: number, isi: readonly string[], tinggi = 26, u = 8.4, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  isi.forEach((s, i) => {
    out.push(...kartu(`${id}${i}`, 14 + i * 68, y, 56, tinggi, WARNA_TEMPAT[i], [s], u, o));
    if (i < isi.length - 1) out.push(teks(`${id}p${i}`, 14 + i * 68 + 62, y + tinggi / 2 + 3.5, "+", 10, W.biru, o));
  });
  return out;
}

/** Kartu ke-`i` hasil susunBagian (dan tanda tambah sebelumnya), supaya kartu bisa muncul satu per satu. */
export const bagianKe = (objs: Obj[], id: string, i: number): Obj[] => objs.filter((o) => o.id.startsWith(`${id}${i}-`) || o.id === `${id}p${i - 1}`);

/* ------------------------------ Uang ------------------------------ */

const WARNA_UANG: Record<number, string> = { 100: W.jingga, 500: W.krem, 1000: W.hijauMuda, 2000: W.langit };

/** Deret uang bernilai `nilai` (urut seperti ditulis), tengah layar, baris pada tinggi `y`. Kotak `${id}-k{i}` dan nilai `${id}-t{i}`. */
export function deretUang(id: string, y: number, nilai: readonly number[], o: Opsi = {}): Obj[] {
  const lebar = nilai.length * 33 - 3;
  const mulai = (300 - lebar) / 2;
  const out: Obj[] = [];
  nilai.forEach((v, i) => {
    out.push(kotak(`${id}-k${i}`, mulai + i * 33, y, 30, 18, WARNA_UANG[v], W.coklat, { rx: 3, tebal: 1.2, ...o }));
    out.push(teks(`${id}-t${i}`, mulai + i * 33 + 15, y + 12.3, rb(v), 7.4, W.biru, o));
  });
  return out;
}

/** Id semua kotak dan nilai deret uang berisi `n` lembar atau keping. */
export const idUang = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => [`${id}-k${i}`, `${id}-t${i}`]).flat();

/* ------------------------------ Ikatan bilangan ------------------------------ */

/**
 * Diagram ikatan: bilangan utuh (cx, cy) dan dua bagian di bawahnya pada (cx - dx, cy + dy) dan (cx + dx, cy + dy), jari-jari r, dihubungkan dua garis.
 * Bulat `${id}-u`, `${id}-l`, `${id}-r`; garis `${id}-gl`, `${id}-gr`; isi bulat `${id}-ut`, `${id}-lt`, `${id}-rt` (teks; isi kosong tidak dibuat).
 */
export function ikatan(id: string, cx: number, cy: number, dx: number, dy: number, r: number, utuh: string, kiri: string, kanan: string, u = 9, o: Opsi = {}): Obj[] {
  const out: Obj[] = [
    garis(`${id}-gl`, cx, cy, -dx, dy, W.biru, 2, o),
    garis(`${id}-gr`, cx, cy, dx, dy, W.biru, 2, o),
    bulat(`${id}-u`, cx, cy, r, W.emas, W.biru, o),
    bulat(`${id}-l`, cx - dx, cy + dy, r, W.langit, W.biru, o),
    bulat(`${id}-r`, cx + dx, cy + dy, r, W.hijauMuda, W.biru, o),
  ];
  if (utuh) out.push(teks(`${id}-ut`, cx, cy + u * 0.35, utuh, u, W.biru, o));
  if (kiri) out.push(teks(`${id}-lt`, cx - dx, cy + dy + u * 0.35, kiri, u, W.biru, o));
  if (kanan) out.push(teks(`${id}-rt`, cx + dx, cy + dy + u * 0.35, kanan, u, W.biru, o));
  return out;
}
