import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 5 Sub-Bab D (hubungan keliling dan luas daerah bangun datar): kertas berpetak,
 * kerangka persegi panjang dari kawat, tabel ukuran, diagram batang luas, denah kolam renang dengan tepian.
 * Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
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
  jeruk: "#FB923C",
  krem: "#FEF9C3",
  muda: "#DBEAFE",
  hijauMuda: "#BBF7D0",
  merahMuda: "#FECACA",
  ungMuda: "#EDE9FE",
  langitMuda: "#E0F2FE",
  petak: "#93C5FD",
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const jalur = (id: string, x: number, y: number, d: string, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "jalur", x, y, d, warna, garis: garisW, tebal: 1.2, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Kartu berjudul: kotak berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 8.6, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u))];
}

/** Kartu satu metode luar: nama (satu sampai dua baris) dan arti singkat. Lebar 134, tinggi 70. */
export const kartuMetode = (id: string, x: number, y: number, warna: string, baris: string[], arti: string): Obj[] => [
  kotak(`${id}-k`, x, y, 134, 70, warna, W.biru, { rx: 10 }),
  ...baris.map((b, i) => teks(`${id}-n${i}`, x + 67, y + 24 + i * 12, b, 8.6)),
  teks(`${id}-a`, x + 67, y + 28 + baris.length * 12, arti, 7, W.ungu),
];

/** Tanda centang atau silang di (x, y) (garis dasar teks). */
export const tanda = (id: string, x: number, y: number, ya: boolean, u = 12): Obj => teks(id, x, y, ya ? "✓" : "✗", u, ya ? W.hijau : W.merah);

/** Satu baris rata kiri berupa kotak berisi teks. Pojok kiri-atas (x, y). Id `${id}-k` dan `${id}-t`. */
export function baris(id: string, x: number, y: number, w: number, isi: string, warna: string = W.putih, u = 8, h = 18, o: Opsi = {}): Obj[] {
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 5, tebal: 1.2, ...o }), teks(`${id}-t`, x + 6, y + h / 2 + u * 0.35, isi, u, W.biru, { anchor: "start", ...o })];
}

/** Gelembung ucapan: kotak dengan nama di kiri-atas dan satu sampai tiga baris isi rata kiri. */
export function ide(id: string, x: number, y: number, w: number, h: number, nama: string, isi: string[], warna: string = W.krem, u = 8): Obj[] {
  return [
    kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8 }),
    teks(`${id}-n`, x + 8, y + 12, nama, 8.6, W.ungu, { anchor: "start" }),
    ...isi.map((b, i) => teks(`${id}-t${i}`, x + 8, y + 25 + i * (u + 3.5), b, u, W.biru, { anchor: "start" })),
  ];
}

/* ------------------------------ Hitungan persegi panjang ------------------------------ */

/** Keliling persegi panjang p kali l. */
export const keliling = (p: number, l: number): number => 2 * (p + l);
/** Luas daerah persegi panjang p kali l. */
export const luas = (p: number, l: number): number => p * l;

/** Enam ukuran kerangka dari kunci Eksplorasi 5.4 (Buku Panduan Guru hlm. 234): panjang dan lebar dalam sentimeter. */
export const BENTUK: [number, number][] = [
  [20, 10],
  [10, 20],
  [5, 25],
  [25, 5],
  [15, 15],
  [18, 12],
];
/** Luas tiap bentuk menurut tabel buku. */
export const LUAS_BUKU = [200, 200, 125, 125, 225, 216];

/** Soal pengayaan kolam renang (Buku Panduan Guru hlm. 243): kolam 15 m kali 6 m, tepian 1 m, keramik 40 cm kali 40 cm, 5 keramik per dus. */
export const KOLAM = { p: 15, l: 6, tepi: 1, keramik: 40, perDus: 5 };

/* ------------------------------ Kertas berpetak dan kerangka ------------------------------ */

/** Kertas berpetak: kol x bar petak berukuran `sel` piksel, satu benda jalur (id), pojok kiri-atas (x, y). */
export function petak(id: string, x: number, y: number, kol: number, bar: number, sel: number, warna: string = W.petak, o: Opsi = {}): Obj {
  let d = "";
  for (let i = 0; i <= kol; i += 1) d += `M${i * sel} 0 L${i * sel} ${bar * sel} `;
  for (let j = 0; j <= bar; j += 1) d += `M0 ${j * sel} L${kol * sel} ${j * sel} `;
  return jalur(id, x, y, d.trim(), "none", warna, { tebal: 0.6, ...o });
}

/** Kerangka persegi panjang p kali l sentimeter pada kertas berpetak (satu petak = 5 cm), pojok kiri-atas (x, y) dan ukuran petak `sel` piksel. */
export function kerangka(id: string, x: number, y: number, p: number, l: number, sel: number, warna: string = W.merahMuda, garisW: string = W.jeruk, o: Opsi = {}): Obj {
  return kotak(id, x, y, (p / 5) * sel, (l / 5) * sel, warna, garisW, { rx: 1, tebal: 2.2, op: 0.9, ...o });
}

/** Satu baris tabel: sel-sel dengan lebar `lebar`, pojok kiri-atas (x, y), tinggi h. Id `${id}-k{i}` dan `${id}-t{i}`. */
export function barisTabel(id: string, x: number, y: number, lebar: number[], isi: string[], warna: string, u = 7.6, h = 17, warnaTeks: string = W.biru, o: Opsi = {}): Obj[] {
  const hasil: Obj[] = [];
  let kiri = x;
  isi.forEach((s, i) => {
    hasil.push(kotak(`${id}-k${i}`, kiri, y, lebar[i], h, warna, W.biru, { rx: 2, tebal: 1, ...o }));
    hasil.push(teks(`${id}-t${i}`, kiri + lebar[i] / 2, y + h / 2 + u * 0.35, s, u, warnaTeks, o));
    kiri += lebar[i];
  });
  return hasil;
}

/** Batang diagram: alas di garis dasar yDasar, tinggi `tinggi` piksel, lebar w. Id `${id}` (batang) dan `${id}-n` (nilai di atas). */
export function batang(id: string, x: number, yDasar: number, w: number, tinggi: number, warna: string, nilai: string, o: Opsi = {}): Obj[] {
  return [kotak(id, x, yDasar - tinggi, w, tinggi, warna, W.biru, { rx: 1, tebal: 1.2, ...o }), teks(`${id}-n`, x + w / 2, yDasar - tinggi - 3, nilai, 7.8, W.biru, o)];
}

/** Gulungan kawat berwarna logam: tiga lingkaran sepusat. Pusat (x, y). */
export const gulungKawat = (id: string, x: number, y: number, o: Opsi = {}): Obj[] => [
  bulat(`${id}a`, x, y, 18, "none", "#9CA3AF", { tebal: 2.4, ...o }),
  bulat(`${id}b`, x, y, 12, "none", "#9CA3AF", { tebal: 2.4, ...o }),
  bulat(`${id}c`, x, y, 6, "none", "#9CA3AF", { tebal: 2.4, ...o }),
];
