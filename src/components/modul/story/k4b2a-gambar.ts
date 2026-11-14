import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 2 Sub-Bab A (Pecahan dengan Pembilang Satu, termasuk pembuka bab): pecahan bersusun, kisi arsir, segitiga terbagi,
 * kincir, kipas, lingkaran terbagi (juring), garis bilangan, tabel, dan kartu. Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj).
 * Bagian pecahan bernama `id-c{nomor}` (kotak kisi), `id-g{nomor}` (segitiga), `id-j{nomor}` (juring) supaya uji bisa menghitung ulang banyak bagian dan arsirannya dari gambar.
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

/** Warna bagian yang diarsir pada semua gambar pecahan (uji menghitung bagian berwarna ini). */
export const ARSIR = W.emas;

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

/* ------------------------------ Data pecahan dari Buku Siswa (diukur dari gambar PDF) ------------------------------ */

/** Ayo Berlatih hlm. 59-60 nomor 1 sampai 5: [banyak bagian sama, banyak bagian diarsir]; kunci Panduan Guru hlm. 94-95: 1/2, 1/4, 1/10, 1/3, 1/5. */
export const BENTUK_LATIHAN: readonly (readonly [number, number])[] = [
  [2, 1],
  [4, 1],
  [10, 1],
  [3, 1],
  [5, 1],
];
/** Ayo Mengamati hlm. 60-61: penyebut dua pasang pecahan pembilang satu (1/2 lawan 1/4, 1/10 lawan 1/5). */
export const AMATI_PASANG = [
  [2, 4],
  [10, 5],
] as const;
/** Ayo Berlatih hlm. 62 nomor 1, 2, 3: penyebut tiap gambar. Nomor 2 kiri terbagi 6 (kisi 3 kolom 2 baris). */
export const BANDING_GAMBAR = { satu: [2, 3], dua: [6, 3], tiga: [2, 3, 4] } as const;
/** Ayo Berlatih hlm. 62 nomor 4 a sampai e: [penyebut kiri, penyebut kanan]; kunci Panduan Guru hlm. 96: <, >, <, <, >. */
export const BANDING_SOAL: readonly (readonly [number, number])[] = [
  [5, 3],
  [4, 5],
  [8, 2],
  [10, 5],
  [11, 13],
];
export const BANDING_KUNCI = ["<", ">", "<", "<", ">"] as const;
/** Nomor 5 (hlm. 63): bawang putih 1/2 kg dan gula 1/4 kg. */
export const TIARA = { bawang: 2, gula: 4 } as const;

/* ------------------------------ Bentuk pecahan ------------------------------ */

const f = (v: number): string => String(Math.round(v * 100) / 100);

/** Pecahan bersusun: pembilang di atas garis pecahan, penyebut di bawahnya. (cx, cy) = titik tengah garis. Id `${id}-a`, `${id}-g`, `${id}-b`. */
export function pecahan(id: string, cx: number, cy: number, atas: string | number, bawah: string | number, u = 14, warna: string = W.biru, o: Opsi = {}): Obj[] {
  const lebar = Math.max(String(atas).length, String(bawah).length) * u * 0.62 + 6;
  return [teks(`${id}-a`, cx, cy - u * 0.28, String(atas), u, warna, o), garis(`${id}-g`, cx - lebar / 2, cy, lebar, 0, warna, 1.6, o), teks(`${id}-b`, cx, cy + u * 0.95, String(bawah), u, warna, o)];
}

/** Kisi kol kali bar sel sama besar (lebar sw, tinggi sh), pojok kiri-atas (x, y). Sel `${id}-c{i}` berurutan per baris; `arsir` sel pertama berwarna ARSIR. */
export function kisi(id: string, x: number, y: number, kol: number, bar: number, sw: number, sh: number, arsir = 1, o: Opsi = {}): Obj[] {
  return Array.from({ length: kol * bar }, (_, i) => kotak(`${id}-c${i}`, x + (i % kol) * sw, y + Math.floor(i / kol) * sh, sw, sh, i < arsir ? ARSIR : W.putih, W.biru, { rx: 0, tebal: 1.4, ...o }));
}

/** Segitiga sama kaki (alas w, tinggi h) terbagi n = 2 (garis dari puncak ke tengah alas) atau n = 3 (dari titik berat ke tiga sudut) bagian sama luas. Bagian `${id}-g{i}`. */
export function segitigaBagi(id: string, x: number, y: number, w: number, h: number, n: 2 | 3, arsir = 1, o: Opsi = {}): Obj[] {
  const A = [w / 2, 0];
  const B = [0, h];
  const C = [w, h];
  const bagian: number[][][] = n === 2 ? [[A, B, [w / 2, h]], [A, C, [w / 2, h]]] : [[A, B, [w / 2, (2 * h) / 3]], [A, C, [w / 2, (2 * h) / 3]], [B, C, [w / 2, (2 * h) / 3]]];
  return bagian.map((t, i) => jalur(`${id}-g${i}`, x, y, `M${f(t[0][0])} ${f(t[0][1])} L${f(t[1][0])} ${f(t[1][1])} L${f(t[2][0])} ${f(t[2][1])} Z`, i < arsir ? ARSIR : W.putih, W.biru, { tebal: 1.6, ...o }));
}

/** Kincir tiga segitiga sama dengan satu titik pusat (cx, cy); tiap segitiga mengapit sudut 60 derajat dengan sisi s, dipisah 120 derajat. Bagian `${id}-g{i}`. */
export function kincir(id: string, cx: number, cy: number, s: number, arsir = 1, o: Opsi = {}): Obj[] {
  return [-160, -40, 80].map((a0, i) => {
    const r = (d: number) => (d * Math.PI) / 180;
    const p1 = [s * Math.cos(r(a0)), s * Math.sin(r(a0))];
    const p2 = [s * Math.cos(r(a0 + 60)), s * Math.sin(r(a0 + 60))];
    return jalur(`${id}-g${i}`, cx, cy, `M0 0 L${f(p1[0])} ${f(p1[1])} L${f(p2[0])} ${f(p2[1])} Z`, i < arsir ? ARSIR : W.putih, W.biru, { tebal: 1.6, ...o });
  });
}

/** Satu juring (potongan lingkaran) berpusat di (x, y), jari-jari r, dari sudut a0 ke a1 (derajat, searah jarum jam, 0 = ke kanan). */
export function juring(id: string, x: number, y: number, r: number, a0: number, a1: number, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj {
  const rad = (d: number) => (d * Math.PI) / 180;
  const d = `M0 0 L${f(r * Math.cos(rad(a0)))} ${f(r * Math.sin(rad(a0)))} A${f(r)} ${f(r)} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${f(r * Math.cos(rad(a1)))} ${f(r * Math.sin(rad(a1)))} Z`;
  return jalur(id, x, y, d, warna, garisW, { tebal: 1.4, ...o });
}

/** Lingkaran berpusat (cx, cy) terbagi n juring sama besar mulai dari atas searah jarum jam; `arsir` juring pertama berwarna ARSIR, sisanya `dasar`. Juring `${id}-j{i}`. */
export function lingkaranBagi(id: string, cx: number, cy: number, r: number, n: number, arsir = 1, dasar: string = W.putih, o: Opsi = {}): Obj[] {
  return Array.from({ length: n }, (_, i) => juring(`${id}-j${i}`, cx, cy, r, -90 + (i * 360) / n, -90 + ((i + 1) * 360) / n, i < arsir ? ARSIR : dasar, W.biru, o));
}

/** Kipas n juring sama sudut `lebar` derajat, bersebelahan mulai dari sudut `mulai`; `arsir` juring pertama berwarna ARSIR. Juring `${id}-j{i}`. */
export function kipas(id: string, cx: number, cy: number, r: number, n: number, lebar: number, mulai: number, arsir = 1, o: Opsi = {}): Obj[] {
  return Array.from({ length: n }, (_, i) => juring(`${id}-j${i}`, cx, cy, r, mulai + i * lebar, mulai + (i + 1) * lebar, i < arsir ? ARSIR : W.putih, W.biru, o));
}

/** Garis bilangan dari 0 (di x) sampai 1 (di x + panjang) dengan titik pecahan 1/n pada x + panjang / n. Label pecahan berselang-seling di atas dan di bawah garis. Id `${id}-f{n}` (teks), `${id}-k{n}` (tanda). */
export function garisBilangan(id: string, x: number, y: number, panjang: number, penyebut: readonly number[], o: Opsi = {}): Obj[] {
  const out: Obj[] = [garis(`${id}-g`, x, y, panjang, 0, W.biru, 2, o), garis(`${id}-t0`, x, y - 5, 0, 10, W.biru, 2, o), garis(`${id}-t1`, x + panjang, y - 5, 0, 10, W.biru, 2, o)];
  out.push(teks(`${id}-n0`, x, y + 18, "0", 9.6, W.biru, o), teks(`${id}-n1`, x + panjang, y + 18, "1", 9.6, W.biru, o));
  penyebut.forEach((n, i) => {
    out.push(garis(`${id}-k${n}`, x + panjang / n, y - 4, 0, 8, W.merah, 2.4, o));
    out.push(teks(`${id}-f${n}`, x + panjang / n, i % 2 === 0 ? y - 10 : y + 18, `1/${n}`, 9, W.merah, o));
  });
  return out;
}

/** `n` benda bulat (orang atau benda) berderet per baris `per`; pusat benda pertama di (x, y), jarak antarpusat s. Id `${id}-o{nomor}`. */
export function benda(id: string, x: number, y: number, n: number, per: number, s: number, r: number, warna: string, garisW: string | undefined = W.coklat, o: Opsi = {}): Obj[] {
  return Array.from({ length: n }, (_, i) => bulat(`${id}-o${i}`, x + (i % per) * s, y + Math.floor(i / per) * s, r, warna, garisW, { tebal: 1, ...o }));
}

/** Id semua bagian (kotak kisi, segitiga, juring) satu gambar pecahan, `n` bagian. */
export const idKisi = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}-c${i}`);
export const idSegitiga = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}-g${i}`);
export const idJuring = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}-j${i}`);
