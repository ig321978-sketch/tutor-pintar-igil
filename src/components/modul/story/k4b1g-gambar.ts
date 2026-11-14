import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 1 Sub-Bab G (Perkalian Bilangan Cacah sampai 100): kotak berisi bulatan (donat, kelereng, kancing),
 * deretan bulatan (susunan baris dan kolom), perkalian bersusun (angka demi angka), batang bernilai, dan kartu. Berkas ini TIDAK dipakai bab lain.
 * Semua fungsi mengembalikan data benda (Obj). Bagian yang bisa dihitung ulang oleh uji bernama:
 * `id-g{i}` (kotak kelompok), `id-g{i}-o{j}` (bulatan di kotak), `id-o{i}` (bulatan deret), `id-m0 id-m1 id-p id-h{i} id-s` (angka perkalian bersusun).
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

/* ------------------------------ Data dari Buku Siswa (hlm. 39-43) dan Panduan Guru (hlm. 60-64) ------------------------------ */

/** Ayo Mengamati hlm. 39: 12 kotak donat, tiap kotak 4 donat, jumlah 48 (gambar dua baris, enam kotak per baris). */
export const DONAT = { kotak: 12, isi: 4, hasil: 48, perBaris: 6 } as const;
/** Hlm. 41-42: 14 tumpuk kelereng, tiap tumpuk 5 butir, jumlah 70 (gambar 5 + 5 + 4 tumpuk). */
export const KELERENG = { tumpuk: 14, isi: 5, hasil: 70 } as const;
/** Ayo Mencoba hlm. 42: 8 pak pensil, tiap pak 12 batang; kunci Panduan Guru hlm. 62: 96. */
export const PENSIL = { pak: 8, isi: 12, hasil: 96 } as const;
/** Pemantik Panduan Guru hlm. 61: 12 kardus, tiap kardus 10 butir telur (jawabannya tidak ada di buku). */
export const TELUR = { kardus: 12, isi: 10 } as const;
/** Ayo Berlatih nomor 1 hlm. 43: [bilangan, pengali]; kunci Panduan Guru hlm. 62: 96, 48, 74, 260, 336. */
export const LATIHAN_SATU: readonly (readonly [number, number])[] = [
  [32, 3],
  [24, 2],
  [37, 2],
  [52, 5],
  [48, 7],
];
export const KUNCI_SATU = [96, 48, 74, 260, 336] as const;
/** Ayo Berlatih nomor 2 a sampai e (soal cerita); [pertama, kedua] sebagaimana ditulis Panduan Guru hlm. 62-64; kunci 36, 90, 98, 84, 78. */
export const CERITA_DUA: readonly (readonly [number, number])[] = [
  [12, 3],
  [2, 45],
  [14, 7],
  [21, 4],
  [13, 6],
];
export const KUNCI_DUA = [36, 90, 98, 84, 78] as const;

/* ------------------------------ Kotak berisi bulatan ------------------------------ */

/** `banyak` kotak sama besar (lebar w, tinggi h) berderet `kolKotak` per baris mulai (x, y); tiap kotak berisi `per` bulatan berderet `kolDot` per baris. Id kotak `${id}-g{i}`, bulatan `${id}-g{i}-o{j}`. */
export function kelompok(id: string, x: number, y: number, banyak: number, per: number, kolKotak: number, w: number, h: number, kolDot: number, warnaIsi: string, warnaKotak: string = W.krem, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  const baris = Math.ceil(per / kolDot);
  const r = Math.round(Math.min(w / kolDot, h / baris) * 0.34 * 10) / 10;
  for (let i = 0; i < banyak; i += 1) {
    const bx = x + (i % kolKotak) * (w + 3);
    const by = y + Math.floor(i / kolKotak) * (h + 3);
    out.push(kotak(`${id}-g${i}`, bx, by, w, h, warnaKotak, W.coklat, { rx: 2, tebal: 1, ...o }));
    for (let j = 0; j < per; j += 1) out.push(bulat(`${id}-g${i}-o${j}`, bx + ((j % kolDot) + 0.5) * (w / kolDot), by + (Math.floor(j / kolDot) + 0.5) * (h / baris), r, warnaIsi, W.coklat, { tebal: 0.6, ...o }));
  }
  return out;
}

/** `banyak` kotak sama besar yang masing-masing bertuliskan `isi`. Id kotak `${id}-g{i}`, tulisan `${id}-t{i}`. */
export function kelompokAngka(id: string, x: number, y: number, banyak: number, kolKotak: number, w: number, h: number, isi: string, warna: string, u = 9, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  for (let i = 0; i < banyak; i += 1) {
    const bx = x + (i % kolKotak) * (w + 4);
    const by = y + Math.floor(i / kolKotak) * (h + 4);
    out.push(kotak(`${id}-g${i}`, bx, by, w, h, warna, W.coklat, { rx: 3, tebal: 1.2, ...o }), teks(`${id}-t${i}`, bx + w / 2, by + h / 2 + u * 0.35, isi, u, W.biru, o));
  }
  return out;
}

/** Deretan bulatan `kol` kali `bar`, jarak antarpusat s, pusat pertama di (x, y); `kolPisah` kolom pertama berwarna `warna`, sisanya `warna2`. Id `${id}-o{i}` berurutan per baris. */
export function deret(id: string, x: number, y: number, kol: number, bar: number, s: number, r: number, warna: string, warna2: string = warna, kolPisah = kol, o: Opsi = {}): Obj[] {
  return Array.from({ length: kol * bar }, (_, i) => bulat(`${id}-o${i}`, x + (i % kol) * s, y + Math.floor(i / kol) * s, r, i % kol < kolPisah ? warna : warna2, W.coklat, { tebal: 0.8, ...o }));
}

/** Batang dengan lebar = nilai * skala, pojok kiri-atas (x, y). */
export const batang = (id: string, x: number, y: number, nilai: number, skala: number, h: number, warna: string, o: Opsi = {}): Obj => kotak(id, x, y, nilai * skala, h, warna, W.biru, { rx: 2, tebal: 1.4, ...o });

/* ------------------------------ Perkalian bersusun ------------------------------ */

const JARAK = 16;
/** Soal bersusun: bilangan dua angka `a` di atas, pengali satu angka `b` di bawah, tanda kali, dan garis. (xs, y) = pusat kolom satuan dan garis dasar baris atas. Id `${id}-m0` (puluhan), `${id}-m1` (satuan), `${id}-p`, `${id}-x`, `${id}-g`. */
export function susunSoal(id: string, xs: number, y: number, a: number, b: number, u = 18, o: Opsi = {}): Obj[] {
  const d = String(a);
  return [
    teks(`${id}-m0`, xs - JARAK, y, d[0], u, W.biru, o),
    teks(`${id}-m1`, xs, y, d[1], u, W.biru, o),
    teks(`${id}-x`, xs + JARAK + 4, y + u + 4, "×", u * 0.8, W.biru, o),
    teks(`${id}-p`, xs, y + u + 4, String(b), u, W.biru, o),
    garis(`${id}-g`, xs - JARAK * 2 - 2, y + u + 10, JARAK * 3 + 8, 0, W.biru, 2, o),
  ];
}

/** Angka hasil bersusun (panjang 2 atau 3), rata ke kanan pada kolom satuan. Id `${id}-h{i}` dari kiri. */
export function susunHasil(id: string, xs: number, y: number, hasil: string, u = 18, warna: string = W.hijau, o: Opsi = {}): Obj[] {
  const n = hasil.length;
  return Array.from({ length: n }, (_, i) => teks(`${id}-h${i}`, xs - JARAK * (n - 1 - i), y + 2 * u + 12, hasil[i], u, warna, o));
}

/** Angka yang disimpan, kecil di atas kolom puluhan. Id `${id}-s`. */
export const susunSimpan = (id: string, xs: number, y: number, angka: string, u = 18, o: Opsi = {}): Obj => teks(`${id}-s`, xs - JARAK, y - u * 0.9, angka, u * 0.55, W.merah, o);

/** Teks ber-patokan kiri (untuk keterangan di samping bersusun). */
export const sisi = (id: string, x: number, y: number, isi: string, u = 9, warna: string = W.biru, o: Opsi = {}): Obj => teks(id, x, y, isi, u, warna, { anchor: "start", ...o });

/** Id bulatan deret `kol` kali `bar` pada kolom `k0` sampai sebelum `k1` (kolom mulai 0). */
export const idDeret = (id: string, kol: number, bar: number, k0: number, k1: number): string[] => Array.from({ length: kol * bar }, (_, i) => i).filter((i) => i % kol >= k0 && i % kol < k1).map((i) => `${id}-o${i}`);
