import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 2 Sub-Bab C (Pecahan Senilai): batang dan kisi berarsir, pecahan bertumpuk, coklat, kertas lipat, tabel, kartu, dan dinding pecahan.
 * Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
 * Sel batang dan kisi bernama `id-c{nomor}` (kotak; arsir bila warnanya bukan putih), pecahan bertumpuk `id-p`, `id-g`, `id-q`, supaya uji bisa menghitung ulang dari gambar.
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
  cokelatTua: "#7C3F12",
  cok: "#8B4A22",
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  jingga: "#FDBA74",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  pink: "#FBCFE8",
  lavender: "#EDE9FE",
  arsir: "#FFCD4D",
  biruMuda: "#2B8FD0",
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
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

/* ------------------------------ Data dari Buku Siswa dan Panduan Guru (dibaca dari gambar PDF) ------------------------------ */

export type Pasang = readonly [number, number];
/** Aktivitas 2 (hlm. 66-67): kertas pertama 4 bagian diwarnai 1, kertas kedua 16 bagian diwarnai 4. Kesimpulan Panduan Guru hlm. 101: 1/4 = 4/16. */
export const KERTAS: readonly Pasang[] = [[1, 4], [4, 16]];
/** Coklat hlm. 67-68: batang pertama 6 bagian, batang kedua 3 bagian; bagian Putu 2/6 dan 1/3. */
export const COKLAT = { bagian: [6, 3], putu: [[2, 6], [1, 3]] as readonly Pasang[] } as const;
/** Ayo Berlatih hlm. 70 (soal 1-3): tiap soal gambar kiri dan gambar kanan, lalu kunci Panduan Guru hlm. 102-103. */
export const LATIHAN: readonly { kiri: Pasang; kanan: Pasang }[] = [
  { kiri: [2, 4], kanan: [1, 2] },
  { kiri: [2, 6], kanan: [1, 3] },
  { kiri: [3, 9], kanan: [1, 3] },
];
/** Contoh jawaban Ayo Berpikir yang kita buat sendiri (buku tidak memberi kunci): 1/2, 2/4, 3/6. */
export const CONTOH_BERPIKIR: readonly Pasang[] = [[1, 2], [2, 4], [3, 6]];
/** Dinding pecahan metode luar: lapis dengan penyebut ini, lebar dinding 216 dapat dibagi semuanya. */
export const LAPIS_DINDING = [1, 2, 3, 4, 6, 9] as const;
export const LEBAR_DINDING = 216;

/* ------------------------------ Pecahan, batang, dan kisi ------------------------------ */

/** Pecahan bertumpuk: garis pecahan di tinggi cy, pembilang di atas dan penyebut di bawah, pusat mendatar cx. Id `${id}-p`, `${id}-g`, `${id}-q`. */
export function pecahan(id: string, cx: number, cy: number, p: number | string, q: number | string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj[] {
  const lebar = Math.max(String(p).length, String(q).length) * u * 0.6 + 6;
  return [teks(`${id}-p`, cx, cy - u * 0.35, String(p), u, warna, o), garis(`${id}-g`, cx - lebar / 2, cy, lebar, 0, warna, 1.2, o), teks(`${id}-q`, cx, cy + u * 1.05, String(q), u, warna, o)];
}
/** Id tiga benda sebuah pecahan bertumpuk. */
export const idPecahan = (id: string): string[] => [`${id}-p`, `${id}-g`, `${id}-q`];

/** Batang `n` sel sama lebar (lebar total w); sel nomor yang tercantum di `arsir` berwarna `warnaIsi`, lainnya `warnaKosong`. Id `${id}-c{nomor}`. */
export function batang(id: string, x: number, y: number, w: number, h: number, n: number, arsir: readonly number[], warnaIsi: string = W.arsir, warnaKosong: string = W.putih, o: Opsi = {}): Obj[] {
  return Array.from({ length: n }, (_, i) => kotak(`${id}-c${i}`, x + (i * w) / n, y, w / n, h, arsir.includes(i) ? warnaIsi : warnaKosong, W.biru, { rx: 0, tebal: 1.2, ...o }));
}

/** Kisi `kol` kali `baris` sel persegi panjang cw kali ch, urut baris demi baris; sel di `arsir` berwarna `warnaIsi`. Id `${id}-c{nomor}`. */
export function kisi(id: string, x: number, y: number, cw: number, ch: number, kol: number, baris: number, arsir: readonly number[], warnaIsi: string = W.arsir, warnaKosong: string = W.putih, o: Opsi = {}): Obj[] {
  return Array.from({ length: kol * baris }, (_, i) => kotak(`${id}-c${i}`, x + (i % kol) * cw, y + Math.floor(i / kol) * ch, cw, ch, arsir.includes(i) ? warnaIsi : warnaKosong, W.biru, { rx: 0, tebal: 1.2, ...o }));
}

/** Id `n` sel buatan `batang` atau `kisi`. */
export const idSel = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}-c${i}`);
/** Nomor 0 sampai n - 1 (sel arsir berurutan dari kiri). */
export const awal = (n: number): number[] => Array.from({ length: n }, (_, i) => i);

/**
 * Dua pecahan bertumpuk (pusat cxK dan cxR, garis pecahan setinggi cy) dihubungkan dua panah beroperasi `op` (misalnya "×2"), dan tanda sama dengan di tengah.
 * Id `${id}-a1`, `${id}-a2` (panah), `${id}-o1`, `${id}-o2` (label operasi), `${id}-e` (tanda sama dengan).
 */
export function jembatan(id: string, cxK: number, cxR: number, cy: number, op: string, u = 20, warna: string = W.hijau, sisi = 16, o: Opsi = {}): Obj[] {
  const tengah = (cxK + cxR) / 2;
  const panjang = cxR - cxK - 2 * sisi;
  return [
    panah(`${id}-a1`, cxK + sisi, cy - u * 0.65, panjang, 0, warna, 1.6, o),
    teks(`${id}-o1`, tengah, cy - u * 0.95, op, 9, warna, o),
    teks(`${id}-e`, tengah, cy + u * 0.35, "=", 14, W.biru, o),
    panah(`${id}-a2`, cxK + sisi, cy + u * 0.65, panjang, 0, warna, 1.6, o),
    teks(`${id}-o2`, tengah, cy + u * 1.65, op, 9, warna, o),
  ];
}

/** Warna lapis dinding menurut penyebutnya. */
export const WARNA_LAPIS: Record<number, string> = { 1: W.emas, 2: W.hijauMuda, 3: W.langit, 4: W.pink, 6: W.krem, 9: W.lavender };

/**
 * Dinding pecahan: tiap lapis (penyebut n) berlebar LEBAR_DINDING dan terbagi n sel sama, pojok kiri-atas dinding di (x, y), tinggi lapis h, jarak antarlapis `langkah`.
 * Sel lapis n bernama `${id}${n}-c{nomor}`; label lapis `${id}${n}-l` di kiri dinding.
 */
export function dinding(id: string, x: number, y: number, lapis: readonly number[], h: number, langkah: number, o: Opsi = {}): Obj[] {
  return lapis.flatMap((n, r) => [
    teks(`${id}${n}-l`, x - 16, y + r * langkah + h / 2 + 3, n === 1 ? "1" : `1/${n}`, 8, W.biru, o),
    ...batang(`${id}${n}`, x, y + r * langkah, LEBAR_DINDING, h, n, awal(n), WARNA_LAPIS[n] ?? W.putih, W.putih, o),
  ]);
}
