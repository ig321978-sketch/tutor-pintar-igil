import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 1 Sub-Bab A (membaca dan menulis bilangan cacah sampai 100.000 dan nilai tempatnya, termasuk pembuka bab):
 * tabel nilai tempat, balok nilai tempat (blok Dienes yang diperluas), deret angka bertitik ribuan, dan bilangan terpotong.
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
  coklat: "#92400E",
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  jingga: "#FDBA74",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  pink: "#FBCFE8",
  karang: "#F47C62",
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

/* ------------------------------ Bilangan dan nilai tempat ------------------------------ */

/** Tulisan bilangan dengan titik pemisah ribuan, mis. 14500 menjadi "14.500". */
export const lambang = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/** Nama lima nilai tempat dari kiri ke kanan, dan nilai satu angka pada tempat itu. */
export const TEMPAT = ["Puluh Ribuan", "Ribuan", "Ratusan", "Puluhan", "Satuan"];
export const NILAI_TEMPAT = [10000, 1000, 100, 10, 1];

/** Angka-angka (string satu karakter) bilangan `n` pada lima nilai tempat; tempat yang tidak ada dibiarkan kosong. */
export const angkaTempat = (n: number): string[] => {
  const s = String(n);
  return Array.from({ length: 5 }, (_, i) => (i - (5 - s.length) >= 0 ? s[i - (5 - s.length)] : ""));
};

export type OpsiTabel = { labelW?: number; labels?: string[]; hh?: number; ch?: number; u?: number; warna?: string };

/**
 * Tabel nilai tempat. `baris` memuat angka tiap baris (4 kolom: ribuan sampai satuan, atau 5 kolom: puluh ribuan sampai satuan).
 * Kepala kolom: kotak `${id}-h{j}` dan teks `${id}-ht{j}`. Sel baris i kolom j: kotak `${id}-c{i}-{j}` dan teks `${id}-t{i}-{j}` (tanpa teks bila kosong).
 * Bila ada `labels`, tiap baris punya sel nama `${id}-l{i}` dan teks `${id}-lt{i}` di kiri selebar `labelW`.
 */
export function tabelTempat(id: string, x: number, y: number, cw: number, baris: string[][], o: OpsiTabel = {}): Obj[] {
  const kolom = baris[0].length;
  const kepala = TEMPAT.slice(5 - kolom);
  const labelW = o.labels ? (o.labelW ?? 48) : 0;
  const hh = o.hh ?? 18;
  const ch = o.ch ?? 24;
  const u = o.u ?? 12;
  const x0 = x + labelW;
  const out: Obj[] = [];
  if (o.labels) out.push(kotak(`${id}-lh`, x, y, labelW, hh, W.biru, W.biru, { rx: 0, tebal: 1 }));
  kepala.forEach((n, j) => {
    out.push(kotak(`${id}-h${j}`, x0 + j * cw, y, cw, hh, W.biru, W.biru, { rx: 0, tebal: 1 }));
    out.push(teks(`${id}-ht${j}`, x0 + (j + 0.5) * cw, y + hh * 0.68, n, 6.6, W.putih));
  });
  baris.forEach((b, i) => {
    const py = y + hh + i * ch;
    if (o.labels) {
      out.push(kotak(`${id}-l${i}`, x, py, labelW, ch, W.krem, W.biru, { rx: 0, tebal: 1 }));
      out.push(teks(`${id}-lt${i}`, x + labelW / 2, py + ch / 2 + 3, o.labels[i], 7.6, W.biru));
    }
    b.forEach((d, j) => {
      out.push(kotak(`${id}-c${i}-${j}`, x0 + j * cw, py, cw, ch, o.warna ?? W.jingga, W.biru, { rx: 0, tebal: 1 }));
      if (d !== "") out.push(teks(`${id}-t${i}-${j}`, x0 + (j + 0.5) * cw, py + ch / 2 + u * 0.35, d, u, W.biru));
    });
  });
  return out;
}

/**
 * Satu angka pada sel baris i kolom j tabel nilai tempat yang dibuat dengan parameter yang sama (untuk memunculkan angka bertahap).
 * Id `${id}-t{i}-{j}`, sama dengan teks yang dibuat `tabelTempat` bila sel itu berisi angka.
 */
export const angkaTabel = (id: string, x: number, y: number, cw: number, i: number, j: number, d: string, o: OpsiTabel = {}, warna: string = W.merah): Obj => {
  const labelW = o.labels ? (o.labelW ?? 48) : 0;
  const hh = o.hh ?? 18;
  const ch = o.ch ?? 24;
  const u = o.u ?? 12;
  return teks(`${id}-t${i}-${j}`, x + labelW + (j + 0.5) * cw, y + hh + i * ch + ch / 2 + u * 0.35, d, u, warna);
};

/* ------------------------------ Balok nilai tempat (blok Dienes yang diperluas) ------------------------------ */

/** Sisi balok tiap nilai tempat (puluh ribuan sampai satuan) dan warnanya. */
export const UKURAN_BLOK = [20, 16, 12, 8, 5];
export const WARNA_BLOK = [W.jingga, W.pink, W.langit, W.hijauMuda, W.emas];
export const BLOK_PER_BARIS = 3;

/** Titik pojok kiri-atas balok ke-i pada kolom nilai tempat j, kolom berpusat di cx dan mulai dari y. */
export const titikBlok = (cx: number, y: number, j: number, i: number): [number, number] => {
  const s = UKURAN_BLOK[j];
  const gap = 3;
  const lebar = BLOK_PER_BARIS * s + (BLOK_PER_BARIS - 1) * gap;
  return [cx - lebar / 2 + (i % BLOK_PER_BARIS) * (s + gap), y + Math.floor(i / BLOK_PER_BARIS) * (s + gap)];
};

/** `jumlah` balok untuk nilai tempat j (0 = puluh ribuan, 4 = satuan). Id `${id}-b{i}`. */
export function tumpukBlok(id: string, cx: number, y: number, j: number, jumlah: number): Obj[] {
  return Array.from({ length: jumlah }, (_, i) => {
    const [px, py] = titikBlok(cx, y, j, i);
    return kotak(`${id}-b${i}`, px, py, UKURAN_BLOK[j], UKURAN_BLOK[j], WARNA_BLOK[j], W.biru, { rx: 2, tebal: 1 });
  });
}

/* ------------------------------ Deret angka bertitik ribuan ------------------------------ */

/**
 * Deret digit tanpa titik: tiap digit dalam satu kotak berukuran cw x ch, mulai x. Kotak `${id}-c{i}`, angka `${id}-t{i}`.
 * `kelompok` memberi warna berselang-seling tiap tiga digit dari kanan (kelompok ratusan dan kelompok ribuan).
 */
export function deretDigit(id: string, x: number, y: number, cw: number, ch: number, digit: string, kelompok = false, u = 16): Obj[] {
  const out: Obj[] = [];
  const n = digit.length;
  for (let i = 0; i < n; i += 1) {
    const dariKanan = n - 1 - i;
    const w = kelompok ? (Math.floor(dariKanan / 3) % 2 === 0 ? W.hijauMuda : W.langit) : W.putih;
    out.push(kotak(`${id}-c${i}`, x + i * cw, y, cw, ch, w, W.biru, { rx: 0, tebal: 1 }));
    out.push(teks(`${id}-t${i}`, x + (i + 0.5) * cw, y + ch / 2 + u * 0.35, digit[i], u, W.biru));
  }
  return out;
}

/** Titik pemisah ribuan di antara kotak digit ke-(i-1) dan ke-i, di bawah deret. Id `${id}-p`. */
export const titikRibuan = (id: string, x: number, y: number, cw: number, ch: number, i: number): Obj => bulat(id, x + i * cw, y + ch + 4, 2.6, W.merah, W.merah, { tebal: 1 });
