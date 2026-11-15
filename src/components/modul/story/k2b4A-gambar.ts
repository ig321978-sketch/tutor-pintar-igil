import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 2 Bab 4 Sub-Bab A (Posisi Benda): benda di layar yang letaknya bisa dihitung ulang dari koordinat.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Kesepakatan id (dipakai uji hitung ulang):
 * - Benda yang diceritakan letaknya: `ob-${slug}` (slug ada di NAMA_BENDA). Pusat benda dibaca dari koordinatnya:
 *   teks emoji (cx, cy) = (x, y - 0.35u), bulat = (x, y), kotak = tengah kotak, anak = bulat kepala.
 *   Bagian lain benda memakai akhiran: `-lb` (nama), `-bd` (badan), `-bk` (penanda anak membelakangi kita: panah arah hadap).
 * - Kalimat posisi yang tampil di layar: kartu `kal${n}` (teks `kal${n}-t0` berbentuk "benda di kata-posisi acuan").
 * - Peta kotak tiga kali tiga: petak `pt${baris}${kolom}` (baris dan kolom 1 sampai 3, dari atas dan dari kiri), lingkaran biru `lb`.
 * - Pilihan jawaban: kartu `c1..c3` (`c${q}-k`, `c${q}-t`), satu disorot bila dipilih.
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
  biruLingkaran: "#3B82F6",
};
export const OWL = "\u{1F989}";

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.merah, tebal = 2.6, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Kartu pilihan jawaban: pojok kiri-atas (x, y); id `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, isi: string, warna: string = W.krem, w = 40, h = 36, u = 22, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.6, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, isi, u, W.merah, o),
];

/* ------------------------------ Benda dan anak ------------------------------ */

/** Nama sebutan tiap benda (slug id -> kata yang diucapkan). */
export const NAMA_BENDA: Record<string, string> = {
  bola: "bola",
  kotak: "kotak",
  kursi: "kursi",
  boneka: "boneka",
  mobil: "mobil-mobilan",
  kupu: "kupu-kupu",
  burung: "burung",
  bunga: "bunga",
  ulat: "ulat",
  rumput: "rumput",
  ayam: "ayam",
  pohon: "pohon",
  ikan: "ikan",
  jam: "jam",
  rumah: "rumah",
  kelinci: "kelinci",
  malosi: "Malosi",
  kira: "Kira",
  upe: "Upe",
  wei: "Wei",
  halim: "Halim",
  igil: "Igil",
};
export const EMOJI_BENDA: Record<string, string> = {
  kupu: "\u{1F98B}",
  bunga: "\u{1F338}",
  ulat: "\u{1F41B}",
  burung: "\u{1F426}",
  rumput: "\u{1F33F}",
  ayam: "\u{1F414}",
  pohon: "\u{1F333}",
  kursi: "\u{1FA91}",
  boneka: "\u{1F9F8}",
  mobil: "\u{1F697}",
  ikan: "\u{1F41F}",
  jam: "⏰",
  rumah: "\u{1F3E0}",
  kelinci: "\u{1F430}",
};
const bulatkan = (n: number): number => Math.round(n * 10) / 10;

/** Benda berupa emoji dengan pusat (cx, cy). Id `ob-${slug}`. */
export const benda = (slug: string, cx: number, cy: number, u = 28, o: Opsi = {}): Obj => emo(`ob-${slug}`, cx, bulatkan(cy + 0.35 * u), EMOJI_BENDA[slug], u, o);
/** Bola (lingkaran jingga) dengan pusat (cx, cy). */
export const bola = (cx: number, cy: number, r = 12, o: Opsi = {}): Obj => bulat("ob-bola", cx, cy, r, W.oranye, W.biru, { tebal: 2, ...o });
/** Kotak berpusat di (cx, cy). */
export const kotakBenda = (cx: number, cy: number, w = 56, h = 44, warna: string = W.langit, o: Opsi = {}): Obj => kotak("ob-kotak", cx - w / 2, cy - h / 2, w, h, warna, W.biru, { rx: 5, tebal: 2, ...o });

export const WARNA_ANAK: Record<string, string> = { malosi: "#FCA5A5", kira: "#FDE68A", upe: "#BBF7D0", wei: "#BFDBFE", halim: "#DDD6FE", igil: "#FBCFE8" };
/**
 * Anak berupa kepala (bulat `ob-${slug}`) berpusat di (cx, cy), badan `-bd`, dan nama `-lb`.
 * `belakang`: anak membelakangi kita (kepala gelap), dan penanda arah hadap `-bk` (panah ke atas).
 */
export function anak(slug: string, cx: number, cy: number, belakang = false): Obj[] {
  const objs: Obj[] = [
    bulat(`ob-${slug}`, cx, cy, belakang ? 13 : 11, belakang ? "#374151" : WARNA_ANAK[slug], W.biru, { tebal: 1.8, z: 1 }),
    kotak(`ob-${slug}-bd`, cx - 10, cy + 12, 20, 18, WARNA_ANAK[slug], W.biru, { rx: 6, tebal: 1.6 }),
    teks(`ob-${slug}-lb`, cx, cy + 43, NAMA_BENDA[slug], 9, W.biru),
  ];
  if (belakang) objs.push(panah(`ob-${slug}-bk`, cx, cy - 16, 0, -32, W.merah, 2.6));
  return objs;
}
/** Id semua bagian anak (untuk dihapus). */
export const idAnak = (slug: string): string[] => [`ob-${slug}`, `ob-${slug}-bd`, `ob-${slug}-lb`];

/* ------------------------------ Peta kotak tiga kali tiga ------------------------------ */

export type GeomPeta = { x0: number; y0: number; s: number };
/** Peta bawaan (video materi): petak 40 x 40. */
export const PETA: GeomPeta = { x0: 90, y0: 44, s: 40 };
/** Peta lebih kecil (video metode luar): petak 34 x 34, memberi ruang untuk kartu di atas dan pilihan di bawah. */
export const PETA_LUAR: GeomPeta = { x0: 99, y0: 52, s: 34 };
/** Pusat petak (baris, kolom). */
export const pusatPetak = (b: number, k2: number, g: GeomPeta = PETA): { x: number; y: number } => ({ x: g.x0 + (k2 - 1) * g.s + g.s / 2, y: g.y0 + (b - 1) * g.s + g.s / 2 });
/** Sembilan petak `pt${baris}${kolom}`. */
export const petaKotak = (g: GeomPeta = PETA): Obj[] =>
  [1, 2, 3].flatMap((b) => [1, 2, 3].map((k2) => kotak(`pt${b}${k2}`, g.x0 + (k2 - 1) * g.s, g.y0 + (b - 1) * g.s, g.s, g.s, W.putih, W.biru, { rx: 2, tebal: 1.4, z: -1 })));
/** Lingkaran biru di petak (baris, kolom). */
export const lingkaranBiru = (b: number, k2: number, g: GeomPeta = PETA): Obj => {
  const p = pusatPetak(b, k2, g);
  return bulat("lb", p.x, p.y, g.s * 0.33, W.biruLingkaran, W.biru, { tebal: 2, z: 2 });
};
export const idPetak = (b: number, k2: number): string => `pt${b}${k2}`;
