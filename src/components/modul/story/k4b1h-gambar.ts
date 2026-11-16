import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 1 Sub-Bab H (Pembagian Bilangan Cacah sampai 100): benda yang dibagi (butir permen), wadah, kartu, tabel,
 * rantai pengurangan, dan pembagian bersusun yang tumbuh tahap demi tahap. Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj).
 * Butir benda bernama `id-o{nomor}` supaya uji bisa menghitung ulang banyaknya dari gambar.
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
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis: garisW, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis: garisW, tebal: 1.5, ...o });
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

/* ------------------------------ Data buku (Buku Siswa hlm. 44-47; Panduan Guru hlm. 65-69) ------------------------------ */

/** Ayo Mengamati dan Aktivitas 5 (hlm. 44-45): 48 permen dibagi sama banyak kepada 4 anak: Andi, Azizah, Drio, Candra. */
export const PERMEN = 48;
export const ANAK = ["Andi", "Azizah", "Drio", "Candra"] as const;
/** Tabel Aktivitas 5 (hlm. 45): banyak wadah 2, 3, 4, 6, 8. Isi tabel tidak dicetak; dihitung mandiri: 24, 16, 12, 8, 6, sisa 0. */
export const WADAH = [2, 3, 4, 6, 8] as const;
/** Ayo Berlatih nomor 1 a sampai e (hlm. 47): [yang dibagi, pembagi]; kunci Panduan Guru hlm. 67: 12, 32, 16, 24, 15. */
export const LATIHAN: readonly (readonly [number, number])[] = [
  [24, 2],
  [96, 3],
  [96, 6],
  [72, 3],
  [75, 5],
];
export const KUNCI_LATIHAN = [12, 32, 16, 24, 15] as const;
/** Ayo Berlatih nomor 2 a sampai e (hlm. 47): [yang dibagi, pembagi, hasil kunci]; kunci Panduan Guru hlm. 67-69: 18, 16, 27, 12, 11. */
export const CERITA: readonly (readonly [number, number, number])[] = [
  [36, 2, 18],
  [64, 4, 16],
  [81, 3, 27],
  [96, 8, 12],
  [55, 5, 11],
];

/* ------------------------------ Benda dan wadah ------------------------------ */

/** `n` benda bulat berderet per baris `per`; pusat benda pertama di (x, y), jarak antarpusat s. Id `${id}-o{nomor}`. */
export function benda(id: string, x: number, y: number, n: number, per: number, s: number, r: number, warna: string, garisW: string | undefined = W.coklat, o: Opsi = {}): Obj[] {
  return Array.from({ length: n }, (_, i) => bulat(`${id}-o${i}`, x + (i % per) * s, y + Math.floor(i / per) * s, r, warna, garisW, { tebal: 1, ...o }));
}

/** Wadah terbuka sederhana (kotak) dengan label di bawahnya. Id `${id}-w`, `${id}-l`. */
export function wadah(id: string, x: number, y: number, w: number, h: number, label?: string, u = 8): Obj[] {
  const out: Obj[] = [kotak(`${id}-w`, x, y, w, h, W.krem, W.coklat, { rx: 4 })];
  if (label) out.push(teks(`${id}-l`, x + w / 2, y + h + u + 3, label, u, W.coklat));
  return out;
}

/** Kaleng permen sederhana: tutup dan badan. Id `${id}-a`, `${id}-b`. */
export function kaleng(id: string, x: number, y: number, w: number, h: number): Obj[] {
  return [kotak(`${id}-b`, x, y, w, h, W.hijau, W.coklat, { rx: 6 }), kotak(`${id}-a`, x - 2, y - 6, w + 4, 8, W.emas, W.coklat, { rx: 3 })];
}

/** Hitung banyak benda `id-o{n}` pada satu daftar benda. */
export const idBenda = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}-o${i}`);

/* ------------------------------ Pembagian bersusun ------------------------------ */

export type Susun = {
  /** Kerangka: pembagi, garis, dan angka yang dibagi (dua angka). */
  kerangka: Obj[];
  /** Enam tahap: 1 hasil bagi puluhan, 2 hasil kali dan pengurang puluhan beserta sisanya, 3 satuan diturunkan, 4 hasil bagi satuan, 5 hasil kali satuan, 6 sisa akhir. */
  tahap: Obj[][];
  hasil: number;
  sisa: number;
};

/**
 * Pembagian bersusun untuk bilangan dua angka (n = puluhan dan satuan) dengan pembagi `p` satu angka, puluhan sama atau lebih dari p.
 * Pojok garis bagi di (x, yb); kolom puluhan di x + 24, kolom satuan di x + 40. Mengikuti urutan Buku Siswa hlm. 46: dari puluhan ke satuan.
 */
export function bersusun(id: string, x: number, yb: number, p: number, n: number, u = 13): Susun {
  const a = Math.floor(n / 10);
  const b = n % 10;
  const q1 = Math.floor(a / p);
  const r1 = a - q1 * p;
  const sisaPuluh = r1 * 10 + b;
  const q2 = Math.floor(sisaPuluh / p);
  const r2 = sisaPuluh - q2 * p;
  const c1 = x + 24;
  const c2 = x + 40;
  const P1 = yb + 32;
  const R1 = yb + 50;
  const P2 = yb + 68;
  const R2 = yb + 86;
  const kerangka: Obj[] = [
    teks(`${id}-p`, x + 3, yb + 14, String(p), u, W.hijau),
    garis(`${id}-v`, x + 11, yb, 0, 20, W.biru, 1.8),
    garis(`${id}-b`, x + 11, yb, 52, 0, W.biru, 1.8),
    teks(`${id}-n1`, c1, yb + 14, String(a), u, W.biru),
    teks(`${id}-n2`, c2, yb + 14, String(b), u, W.biru),
  ];
  const kali2 = q2 * p;
  const tahap: Obj[][] = [
    [teks(`${id}-q1`, c1, yb - 4, String(q1), u, W.merah)],
    [teks(`${id}-m1`, c1, P1, String(q1 * p), u, W.merah), teks(`${id}-s1`, c1 - 15, P1, "−", u, W.biru), garis(`${id}-l1`, c1 - 9, P1 + 4, 18, 0, W.biru, 1.4), teks(`${id}-r1`, c1, R1, String(r1), u, W.hijau)],
    [teks(`${id}-d`, c2, R1, String(b), u, W.hijau)],
    [teks(`${id}-q2`, c2, yb - 4, String(q2), u, W.merah)],
    [
      ...(kali2 >= 10 ? [teks(`${id}-m2a`, c1, P2, String(Math.floor(kali2 / 10)), u, W.merah)] : []),
      teks(`${id}-m2b`, c2, P2, String(kali2 % 10), u, W.merah),
      teks(`${id}-s2`, c1 - 15, P2, "−", u, W.biru),
      garis(`${id}-l2`, c1 - 9, P2 + 4, 34, 0, W.biru, 1.4),
    ],
    [teks(`${id}-r2`, c2, R2, String(r2), u, W.hijau)],
  ];
  return { kerangka, tahap, hasil: q1 * 10 + q2, sisa: r2 };
}

/** Semua id benda pada satu daftar tahap bersusun, untuk disorot atau dihapus. */
export const idTahap = (tahap: Obj[][]): string[] => tahap.flat().map((o) => o.id);

/* ------------------------------ Batang sel dan rantai pengurangan (video metode luar) ------------------------------ */

/** Batang `n` sel sama besar (lebar sw, tinggi sh), pojok kiri-atas (x, y); sel `${id}-c{i}`; `isi` ditulis di tiap sel (teks `${id}-t{i}`). */
export function batang(id: string, x: number, y: number, n: number, sw: number, sh: number, isi?: string, warna: string = W.hijauMuda, u = 7.6): Obj[] {
  const out: Obj[] = [];
  for (let i = 0; i < n; i += 1) {
    out.push(kotak(`${id}-c${i}`, x + i * sw, y, sw, sh, warna, W.biru, { rx: 0, tebal: 1.2 }));
    if (isi) out.push(teks(`${id}-t${i}`, x + i * sw + sw / 2, y + sh / 2 + u * 0.35, isi, u, W.biru));
  }
  return out;
}

/** Rantai pengurangan: kotak nilai `nilai[i]` (lebar bw, tinggi 28) dengan panah dan label `label[i]` di antara kotak ke-i dan ke-(i+1). Kotak `${id}-k{i}-k`/`-t0`, panah `${id}-p{i}`, label `${id}-l{i}`. */
export function rantai(id: string, x: number, y: number, bw: number, jarak: number, nilai: number[], label: string[], warna: string = W.krem): Obj[] {
  const out: Obj[] = [];
  nilai.forEach((v, i) => {
    out.push(...kartu(`${id}-k${i}`, x + i * (bw + jarak), y, bw, 28, i === nilai.length - 1 ? W.hijauMuda : warna, [String(v)], 11));
    if (i < nilai.length - 1) {
      out.push(panah(`${id}-p${i}`, x + i * (bw + jarak) + bw + 2, y + 14, jarak - 4, 0, W.merah, 1.8));
      out.push(teks(`${id}-l${i}`, x + i * (bw + jarak) + bw + jarak / 2, y - 4, label[i], 8.6, W.merah));
    }
  });
  return out;
}
