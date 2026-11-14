import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 1 Sub-Bab A (Membaca dan Menulis Bilangan Cacah sampai 10.000, termasuk pembuka bab): papan empat tempat (ribuan, ratusan, puluhan, satuan),
 * kartu angka, balok Dienes (peti, dus, bungkus, benda), tabel, dan kartu. Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj).
 * Papan: kotak kepala `id-h{i}`, teks kepala `id-ht{i}`, kotak angka `id-d{i}`, teks angka `id-dt{i}` (i = 0 ribuan sampai 3 satuan).
 * Balok Dienes: `id-p{n}` peti, `id-u{n}` dus, `id-b{n}` bungkus, `id-o{n}` benda, supaya uji menghitung ulang banyak balok dari gambar.
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
  biruMuda: "#2B8FD0",
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Bilangan dengan titik ribuan gaya Indonesia: 3286 menjadi "3.286". */
export const rb = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

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

/* ------------------------------ Papan empat tempat ------------------------------ */

export const TEMPAT = ["Ribuan", "Ratusan", "Puluhan", "Satuan"] as const;
export const WARNA_TEMPAT = [W.merahMuda, W.langit, W.hijauMuda, W.krem] as const;

/** Kepala papan (empat kolom sama lebar `w`/4) dengan pojok kiri-atas (x, y). Label default Ribuan sampai Satuan. */
export function papanKepala(id: string, x: number, y: number, w: number, label: readonly string[] = TEMPAT, u = 7.6, tinggi = 14, o: Opsi = {}): Obj[] {
  const cw = w / 4;
  return label.flatMap((l, i) => [kotak(`${id}-h${i}`, x + i * cw, y, cw, tinggi, WARNA_TEMPAT[i], W.biru, { rx: 0, tebal: 1.2, ...o }), teks(`${id}-ht${i}`, x + i * cw + cw / 2, y + tinggi / 2 + u * 0.35, l, u, W.biru, o)]);
}

/** Satu kolom angka papan: kotak `${id}-d{i}` dan angka `${id}-dt{i}`; pojok kiri-atas baris angka (x, y), lebar papan `w`. */
export function papanKolom(id: string, x: number, y: number, w: number, i: number, angka: string, tinggi = 26, u = 16, o: Opsi = {}): Obj[] {
  const cw = w / 4;
  return [kotak(`${id}-d${i}`, x + i * cw, y, cw, tinggi, W.putih, W.biru, { rx: 0, tebal: 1.2, ...o }), teks(`${id}-dt${i}`, x + i * cw + cw / 2, y + tinggi / 2 + u * 0.35, angka, u, W.merah, o)];
}

/** Seluruh baris angka papan untuk `angka` (empat huruf angka). */
export const papanIsi = (id: string, x: number, y: number, w: number, angka: string, tinggi = 26, u = 16, o: Opsi = {}): Obj[] => [0, 1, 2, 3].flatMap((i) => papanKolom(id, x, y, w, i, angka[i], tinggi, u, o));

/** Kartu angka tunggal (kartu bilangan buatan murid): pojok kiri-atas (x, y), id `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, angka: string, warna: string = W.krem, w = 24, h = 30, u = 16, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 4, tebal: 1.4, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, angka, u, W.merah, o),
];

/* ------------------------------ Balok Dienes ------------------------------ */

/** Deret `n` balok sejenis (jenis p peti, u dus, b bungkus, o benda), `per` per baris, pojok kiri-atas (x, y). Id `${id}-${jenis}${nomor}`. */
export function deret(id: string, jenis: "p" | "u" | "b" | "o", x: number, y: number, n: number, per: number, o: Opsi = {}): Obj[] {
  return Array.from({ length: n }, (_, i) => {
    const c = i % per;
    const r = Math.floor(i / per);
    const nama = `${id}-${jenis}${i}`;
    if (jenis === "p") return kotak(nama, x + c * 20, y + r * 20, 17, 17, W.emas, W.coklat, { rx: 2, tebal: 1.4, ...o });
    if (jenis === "u") return kotak(nama, x + c * 15, y + r * 15, 12, 12, W.hijauMuda, W.hijau, { rx: 1.5, tebal: 1.3, ...o });
    if (jenis === "b") return kotak(nama, x + c * 7, y + r * 22, 4.5, 18, W.langit, W.biruMuda, { rx: 1, tebal: 1.2, ...o });
    return bulat(nama, x + 3 + c * 9, y + 3 + r * 9, 3, W.merahMuda, W.merah, { tebal: 1, ...o });
  });
}

/** Id semua balok sejenis. */
export const idDeret = (id: string, jenis: "p" | "u" | "b" | "o", n: number): string[] => Array.from({ length: n }, (_, i) => `${id}-${jenis}${i}`);

/* ------------------------------ Data dari Buku Siswa dan Panduan Guru ------------------------------ */

/** Ayo Berlatih nomor 1 (Buku Siswa hlm. 10-11): [bilangan pada gambar, cara membaca menurut kunci Panduan Guru hlm. 33]. */
export const LATIHAN_SATU: readonly (readonly [number, string])[] = [
  [5091, "lima ribu sembilan puluh satu"],
  [4884, "empat ribu delapan ratus delapan puluh empat"],
  [5780, "lima ribu tujuh ratus delapan puluh"],
  [1206, "seribu dua ratus enam"],
];
/** Nomor 2 (hlm. 11): [bilangan, cara membaca menurut kunci]; harga, uang Slamet, kembalian. */
export const LATIHAN_DUA: readonly (readonly [number, string])[] = [
  [7350, "tujuh ribu tiga ratus lima puluh"],
  [9500, "sembilan ribu lima ratus"],
  [2150, "dua ribu seratus lima puluh"],
];
/** Nomor 3 (hlm. 11): pasangan [bilangan, nama]; kunci Panduan Guru hlm. 33. */
export const LATIHAN_TIGA: readonly (readonly [number, string])[] = [
  [2903, "Dua ribu sembilan ratus tiga"],
  [2145, "Dua ribu seratus empat puluh lima"],
  [6002, "Enam ribu dua"],
  [9045, "Sembilan ribu empat puluh lima"],
];
/** Nomor 4 (hlm. 12) menurut contoh jawaban Panduan Guru hlm. 34: [empat angka yang diambil, bilangan, nama bilangan]. */
export const TABEL_EMPAT: readonly (readonly [string, number, string])[] = [
  ["4680", 4680, "empat ribu enam ratus delapan puluh"],
  ["8888", 8888, "delapan ribu delapan ratus delapan puluh delapan"],
  ["7030", 7030, "tujuh ribu tiga puluh"],
  ["7201", 7201, "tujuh ribu dua ratus satu"],
  ["0694", 694, "enam ratus sembilan puluh empat"],
  ["0036", 36, "tiga puluh enam"],
];
/** Contoh Buku Siswa hlm. 6: bilangan dan cara membacanya. */
export const CONTOH_BACA: readonly (readonly [number, string])[] = [
  [2634, "dua ribu enam ratus tiga puluh empat"],
  [7003, "tujuh ribu tiga"],
  [6570, "enam ribu lima ratus tujuh puluh"],
];
