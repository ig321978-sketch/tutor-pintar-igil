import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 1 Sub-Bab A (Membaca dan Menulis Bilangan Cacah sampai 10.000). Berkas ini TIDAK dipakai bab atau sub-bab lain.
 * Rujukan topik: Matematika untuk SD/MI Kelas IV, Bab 1 Sub-Bab A (hlm. buku siswa 4 sampai 12); cerita, angka, dan gambar di sini orisinal IGIL.
 *
 * Kesepakatan id (dipakai uji hitung ulang dari struktur adegan, bukan dari kata):
 * - TABEL EMPAT TEMPAT `${id}-h{i}` (kotak kepala), `${id}-ht{i}` (teks kepala), `${id}-d{i}` (kotak angka), `${id}-dt{i}` (angka); i = 0 ribuan sampai 3 satuan. Papan utama berawalan `pp`.
 * - KARTU BILANGAN `bl` (`bl-t0` = bilangan bertitik ribuan) dan KARTU NAMA `nm` (`nm-t0`, `nm-t1`, ... = nama bilangan, baris digabung dengan spasi).
 * - BALOK DIGITAL `${id}-p{n}` peti (seribu), `${id}-u{n}` dus (seratus), `${id}-b{n}` bungkus (sepuluh), `${id}-o{n}` benda (satu). Balok utama berawalan `bk`.
 * - Kartu pilihan `c1..c3` (`c${i}-k`, `c${i}-t`).
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
  biruMuda: "#2B8FD0",
};
export const OWL = "\u{1F989}";

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Bilangan dengan titik ribuan gaya Indonesia: 5842 menjadi "5.842". */
export const rb = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}
/** Id kartu dari `kartu(id, ...)` dengan `b` baris teks. */
export const idKartu = (id: string, b = 1): string[] => [`${id}-k`, ...Array.from({ length: b }, (_, i) => `${id}-t${i}`)];

/** Kartu angka tunggal: pojok kiri-atas (x, y); id `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, isi: string, warna: string = W.krem, w = 24, h = 30, u = 16, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 5, tebal: 1.5, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, isi, u, W.merah, o),
];

/* ------------------------------ Tokoh tetap ------------------------------ */
export const NAMA_ANAK: Record<string, string> = { malosi: "Malosi", kira: "Kira", upe: "Upe", wei: "Wei", halim: "Halim", igil: "Igil" };
export const WARNA_ANAK: Record<string, string> = { malosi: "#FCA5A5", kira: "#FDE68A", upe: "#BBF7D0", wei: "#BFDBFE", halim: "#DDD6FE", igil: "#FBCFE8" };
/** Anak berupa kepala bulat berpusat di (cx, cy), badan, dan nama. Id `an-${slug}`, `an-${slug}-bd`, `an-${slug}-lb`. */
export function anak(slug: string, cx: number, cy: number): Obj[] {
  return [
    bulat(`an-${slug}`, cx, cy, 11, WARNA_ANAK[slug], W.biru, { tebal: 1.8 }),
    kotak(`an-${slug}-bd`, cx - 10, cy + 12, 20, 18, WARNA_ANAK[slug], W.biru, { rx: 6, tebal: 1.6 }),
    teks(`an-${slug}-lb`, cx, cy + 43, NAMA_ANAK[slug], 9, W.biru),
  ];
}
export const idAnak = (slug: string): string[] => [`an-${slug}`, `an-${slug}-bd`, `an-${slug}-lb`];

/* ------------------------------ Tabel empat tempat ------------------------------ */
export const TEMPAT = ["Ribuan", "Ratusan", "Puluhan", "Satuan"] as const;
export const WARNA_TEMPAT = [W.merahMuda, W.langit, W.hijauMuda, W.krem] as const;

/** Kepala tabel (empat kolom sama lebar `w`/4), pojok kiri-atas (x, y). */
export function papanKepala(id: string, x: number, y: number, w: number, u = 8, tinggi = 15, o: Opsi = {}): Obj[] {
  const cw = w / 4;
  return TEMPAT.flatMap((l, i) => [kotak(`${id}-h${i}`, x + i * cw, y, cw, tinggi, WARNA_TEMPAT[i], W.biru, { rx: 0, tebal: 1.2, ...o }), teks(`${id}-ht${i}`, x + i * cw + cw / 2, y + tinggi / 2 + u * 0.35, l, u, W.biru, o)]);
}
/** Satu kolom angka: kotak `${id}-d{i}` dan angka `${id}-dt{i}`; (x, y) = pojok kiri-atas baris angka. */
export function papanKolom(id: string, x: number, y: number, w: number, i: number, angka: string, tinggi = 34, u = 22, o: Opsi = {}): Obj[] {
  const cw = w / 4;
  return [kotak(`${id}-d${i}`, x + i * cw, y, cw, tinggi, W.putih, W.biru, { rx: 0, tebal: 1.2, ...o }), teks(`${id}-dt${i}`, x + i * cw + cw / 2, y + tinggi / 2 + u * 0.35, angka, u, W.merah, o)];
}
/** Seluruh baris angka untuk `angka` (empat huruf). */
export const papanIsi = (id: string, x: number, y: number, w: number, angka: string, tinggi = 34, u = 22, o: Opsi = {}): Obj[] => [0, 1, 2, 3].flatMap((i) => papanKolom(id, x, y, w, i, angka[i], tinggi, u, o));
export const idKolom = (id: string, i: number): string[] => [`${id}-d${i}`, `${id}-dt${i}`];
export const idKepala = (id: string): string[] => [0, 1, 2, 3].flatMap((i) => [`${id}-h${i}`, `${id}-ht${i}`]);
export const idPapan = (id: string): string[] => [...idKepala(id), ...[0, 1, 2, 3].flatMap((i) => idKolom(id, i))];

/** Sepuluh kartu angka nol sampai sembilan dalam dua baris (id `kd0`..`kd9`), pojok kiri-atas (x, y). */
export const kartuSepuluh = (x: number, y: number): Obj[] =>
  Array.from({ length: 10 }, (_, d) => kartuAngka(`kd${d}`, x + (d % 5) * 46, y + Math.floor(d / 5) * 40, String(d), [W.langit, W.hijauMuda, W.krem, W.pink, W.lavender][d % 5], 38, 32, 18)).flat();
export const idKartuSepuluh: string[] = Array.from({ length: 10 }, (_, d) => [`kd${d}-k`, `kd${d}-t`]).flat();

/* ------------------------------ Balok digital ------------------------------ */
/** Deret `n` balok sejenis (p peti, u dus, b bungkus, o benda), `per` per baris, pojok kiri-atas (x, y). Id `${id}-${jenis}${nomor}`. */
export function deret(id: string, jenis: "p" | "u" | "b" | "o", x: number, y: number, n: number, per: number, o: Opsi = {}): Obj[] {
  return Array.from({ length: n }, (_, i) => {
    const c = i % per;
    const r = Math.floor(i / per);
    const nama = `${id}-${jenis}${i}`;
    if (jenis === "p") return kotak(nama, x + c * 21, y + r * 21, 18, 18, W.emas, W.coklat, { rx: 2, tebal: 1.4, ...o });
    if (jenis === "u") return kotak(nama, x + c * 16, y + r * 16, 13, 13, W.hijauMuda, W.hijau, { rx: 1.5, tebal: 1.3, ...o });
    if (jenis === "b") return kotak(nama, x + c * 7, y + r * 22, 5, 18, W.langit, W.biruMuda, { rx: 1, tebal: 1.2, ...o });
    return bulat(nama, x + 3 + c * 9, y + 3 + r * 9, 3, W.merahMuda, W.merah, { tebal: 1, ...o });
  });
}
export const idDeret = (id: string, jenis: "p" | "u" | "b" | "o", n: number): string[] => Array.from({ length: n }, (_, i) => `${id}-${jenis}${i}`);

/** Empat kelompok balok untuk bilangan empat angka `a` (ribuan sampai satuan), dalam empat lajur di tinggi `y`. Id `${id}-p..`, `-u..`, `-b..`, `-o..`. */
export function balokBilangan(id: string, y: number, a: [number, number, number, number], o: Opsi = {}): Obj[] {
  return [...deret(id, "p", 10, y, a[0], 3, o), ...deret(id, "u", 82, y, a[1], 4, o), ...deret(id, "b", 156, y, a[2], 9, o), ...deret(id, "o", 232, y, a[3], 6, o)];
}
export const idBalok = (id: string, a: [number, number, number, number]): string[] => [...idDeret(id, "p", a[0]), ...idDeret(id, "u", a[1]), ...idDeret(id, "b", a[2]), ...idDeret(id, "o", a[3])];
