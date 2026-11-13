import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 9 Sub-Bab B (Membandingkan dan Mengurutkan Bilangan): tabel nilai tempat, kartu bilangan, garis bilangan, dan grafik garis.
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
  air: "#7DD3FC",
  krem: "#FEF9C3",
  muda: "#DBEAFE",
  hijauMuda: "#BBF7D0",
  merahMuda: "#FECACA",
  coklat: "#92400E",
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const jalur = (id: string, x: number, y: number, d: string, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "jalur", x, y, d, warna, garis: garisW, tebal: 1.4, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Kartu berjudul: kotak berwarna dengan beberapa baris teks, pojok kiri-atas (x, y). */
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

/** Nama enam kolom nilai tempat, dari kiri ke kanan. */
export const KOLOM = ["ratus ribuan", "puluh ribuan", "ribuan", "ratusan", "puluhan", "satuan"];
/** Lebar satu kolom dan titik kiri tabel nilai tempat. */
export const KOL_W = 40;
export const KOL_X = 56;

/** Kepala tabel nilai tempat: enam kolom, kiri-atas (KOL_X, y). Id sel `${id}k0..5`, teks `${id}t0..5`. */
export function kepalaTempat(id: string, y: number, o: Opsi = {}): Obj[] {
  return KOLOM.flatMap((n, i) => [kotak(`${id}k${i}`, KOL_X + i * KOL_W, y, KOL_W, 16, W.krem, W.biru, { rx: 0, tebal: 1, ...o }), teks(`${id}t${i}`, KOL_X + i * KOL_W + KOL_W / 2, y + 10.5, n, 5, W.biru, o)]);
}

/** Satu baris digit nilai tempat. `angka` enam karakter, spasi berarti sel kosong. `nama` di kiri baris. Tinggi 20. */
export function barisTempat(id: string, y: number, angka: string, nama: string, warna: string = W.putih, o: Opsi = {}): Obj[] {
  const out: Obj[] = [teks(`${id}n`, KOL_X - 4, y + 14, nama, 7.4, W.biru, { anchor: "end", ...o })];
  angka.split("").forEach((d, i) => {
    out.push(kotak(`${id}c${i}`, KOL_X + i * KOL_W, y, KOL_W, 20, warna, W.biru, { rx: 0, tebal: 1, ...o }));
    if (d !== " ") out.push(teks(`${id}d${i}`, KOL_X + i * KOL_W + KOL_W / 2, y + 15, d, 12, W.biru, o));
  });
  return out;
}

/** Id semua sel satu baris tempat (untuk dihapus atau disorot). */
export const idBaris = (id: string, angka: string): string[] => [`${id}n`, ...angka.split("").flatMap((d, i) => (d === " " ? [`${id}c${i}`] : [`${id}c${i}`, `${id}d${i}`]))];
export const idKepala = (id: string): string[] => KOLOM.flatMap((_, i) => [`${id}k${i}`, `${id}t${i}`]);

/** Kartu bilangan: kotak berisi satu bilangan, pojok kiri-atas (x, y). */
export function kartuAngka(id: string, x: number, y: number, w: number, isi: string, warna: string = W.putih, u = 11, o: Opsi = {}): Obj[] {
  return [kotak(`${id}-k`, x, y, w, 24, warna, W.biru, { rx: 6, ...o }), teks(`${id}-t`, x + w / 2, y + 16, isi, u, W.biru, o)];
}

/** Garis bilangan mendatar dari x1 ke x2 pada tinggi y, dengan panah di ujung kanan. */
export const garisBilangan = (id: string, x1: number, x2: number, y: number, o: Opsi = {}): Obj[] => [garis(`${id}g`, x1, y, x2 - x1, 0, W.biru, 2, o), panah(`${id}p`, x2 - 10, y, 10, 0, W.biru, 2, o)];

/** Titik di garis bilangan dengan label di atas (naik) atau bawah. */
export const titikBilangan = (id: string, x: number, y: number, label: string, warna: string, atas = true, o: Opsi = {}): Obj[] => [
  bulat(`${id}b`, x, y, 3.4, warna, W.biru, o),
  teks(`${id}l`, x, atas ? y - 8 : y + 15, label, 7.6, W.biru, o),
];

/** Harga tiga sepatu pada Eksplorasi 9.2A (angka enam karakter untuk tabel nilai tempat). */
export const SEPATU = [
  { id: "km", nama: "Komang", angka: "342231", harga: "342.231" },
  { id: "lk", nama: "Lukas", angka: "432543", harga: "432.543" },
  { id: "ns", nama: "Nisa", angka: "232231", harga: "232.231" },
] as const;

/** Kartu sepatu: emoji, nama, dan harga, pojok kiri-atas (x, y), lebar 86 tinggi 80. */
export function kartuSepatu(id: string, x: number, y: number, nama: string, harga: string, warna: string): Obj[] {
  return [
    kotak(`${id}-k`, x, y, 86, 80, warna, W.biru, { rx: 10 }),
    emo(`${id}-e`, x + 43, y + 34, "👟", 28),
    teks(`${id}-n`, x + 43, y + 52, nama, 9),
    teks(`${id}-h`, x + 43, y + 70, harga, 10, W.merah),
  ];
}

/** Baris isian barisan bilangan: lima kotak lebar 52, jarak 6, mulai x 8. Isi kosong berarti kotak jawaban ("?"). */
export function barisanKotak(id: string, y: number, isi: string[], warna: string = W.putih): Obj[] {
  return isi.flatMap((v, i) => {
    const x = 8 + i * 58;
    return [kotak(`${id}k${i}`, x, y, 52, 24, v === "" ? W.merahMuda : warna, W.biru, { rx: 6 }), teks(`${id}t${i}`, x + 26, y + 16, v === "" ? "?" : v, 8.4, v === "" ? W.merah : W.biru)];
  });
}
