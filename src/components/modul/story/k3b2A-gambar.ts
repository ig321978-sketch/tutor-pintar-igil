import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 3 Bab 2 Sub-Bab A (Kalimat Matematika Penjumlahan).
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Kesepakatan id (dipakai uji hitung ulang dari struktur adegan, bukan dari kata):
 * - PERSAMAAN LIMA BAGIAN `${id}0..4` (kotak `${id}i-k`, teks `${id}i-t`); id berawalan `eq`. Isi urut: bilangan, "+", bilangan, "=", bilangan ("…" atau "?" untuk yang belum diketahui).
 * - BAGAN `bg-a` (jumlah, batang atas), `bg-b` dan `bg-c` (dua bagian); kotak `-k`, teks `-t`.
 * - TIMBANGAN `tm-kiri-t` (mis. "30 + 20") dan `tm-kanan-t` (mis. "50").
 * - GARIS BILANGAN `gb-ln`, titik `gb-${nilai}`, angka `gb-l${nilai}`, loncatan `lc${i}`; BUNGKUS `${id}-p${i}` (puluhan) dan `${id}-s${j}` (satuan).
 * - Kartu pilihan `c1..c3` (`c${i}-k`, `c${i}-t`), pertanyaan `tanya`.
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
  nila: "#2563EB",
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

/* ------------------------------ Anak (tokoh tetap) ------------------------------ */
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


export const bintang = (id: string, x: number, y: number, u = 13): Obj => emo(id, x, y, "⭐", u);
/** Deret `n` bintang (id `${id}1..n`), mulai (x, y), jarak `j`, `m` per baris. */
export const deretBintang = (id: string, n: number, x: number, y: number, j = 16, m = 10, u = 13): Obj[] =>
  Array.from({ length: n }, (_, i) => bintang(`${id}${i + 1}`, x + (i % m) * j, y + Math.floor(i / m) * (j + 2), u));
export const idDeret = (id: string, dari: number, sampai: number): string[] => Array.from({ length: Math.max(0, sampai - dari + 1) }, (_, i) => `${id}${dari + i}`);

/* ------------------------------ Persamaan lima bagian ------------------------------ */
export const PX = [46, 98, 150, 202, 254];
/** Bagian ke-i (0..4) dari persamaan, tengah di tinggi `y`. */
export function bagianEq(id: string, i: number, isi: string, y = 70, u = 24, warna: string = W.krem): Obj[] {
  return [kotak(`${id}${i}-k`, PX[i] - 24, y - 24, 48, 38, warna, W.biru, { rx: 8 }), teks(`${id}${i}-t`, PX[i], y + 3, isi, u, W.merah)];
}
export const idEq = (id: string, dari = 0, sampai = 4): string[] => Array.from({ length: sampai - dari + 1 }, (_, q) => [`${id}${dari + q}-k`, `${id}${dari + q}-t`]).flat();
/** Persamaan lengkap dalam satu perintah: [a, "+", b, "=", c]. */
export const eq = (id: string, isi: string[], y = 70, u = 24): Obj[] => isi.flatMap((s, i) => bagianEq(id, i, s, y, u, s === "+" || s === "=" ? W.emas : s === "…" || s === "?" ? W.merahMuda : W.krem));

/* ------------------------------ Bagan jumlah dan bagian ------------------------------ */
/** Batang atas = jumlah (`bg-a`), dua batang bawah = dua bagian (`bg-b`, `bg-c`); `fa` = bagian lebar batang kiri (0 sampai 1). */
export function bagan(y: number, jumlah: string, bagianB: string, bagianC: string, fa: number, h = 30, x0 = 30, lebar = 240): Obj[] {
  const wa = Math.round(lebar * fa);
  return [
    kotak("bg-a-k", x0, y, lebar, h, W.emas, W.biru, { rx: 5 }),
    teks("bg-a-t", x0 + lebar / 2, y + h / 2 + 5, jumlah, 14, W.biru),
    kotak("bg-b-k", x0, y + h + 8, wa, h, W.langit, W.biru, { rx: 5 }),
    teks("bg-b-t", x0 + wa / 2, y + h + 8 + h / 2 + 5, bagianB, 14, W.merah),
    kotak("bg-c-k", x0 + wa, y + h + 8, lebar - wa, h, W.merahMuda, W.biru, { rx: 5 }),
    teks("bg-c-t", x0 + wa + (lebar - wa) / 2, y + h + 8 + h / 2 + 5, bagianC, 14, W.merah),
  ];
}
export const idBagan = ["bg-a-k", "bg-a-t", "bg-b-k", "bg-b-t", "bg-c-k", "bg-c-t"];

/* ------------------------------ Timbangan seimbang ------------------------------ */
export function timbangan(kiri: string, kanan: string): Obj[] {
  return [
    garis("tm-tiang", 150, 62, 0, 110, W.coklat, 5),
    garis("tm-dasar", 110, 172, 80, 0, W.coklat, 6),
    garis("tm-palang", 50, 62, 200, 0, W.coklat, 4),
    bulat("tm-poros", 150, 62, 6, W.emas, W.biru),
    garis("tm-tl", 50, 62, 0, 28, W.coklat, 2),
    garis("tm-tr", 250, 62, 0, 28, W.coklat, 2),
    kotak("tm-kiri-k", 16, 90, 68, 46, W.hijauMuda, W.biru, { rx: 8 }),
    teks("tm-kiri-t", 50, 119, kiri, 14, W.biru),
    kotak("tm-kanan-k", 216, 90, 68, 46, W.langit, W.biru, { rx: 8 }),
    teks("tm-kanan-t", 250, 119, kanan, 14, W.biru),
  ];
}
export const idTimbangan = ["tm-tiang", "tm-dasar", "tm-palang", "tm-poros", "tm-tl", "tm-tr", "tm-kiri-k", "tm-kiri-t", "tm-kanan-k", "tm-kanan-t"];

/* ------------------------------ Garis bilangan ------------------------------ */
export const gbX = (v: number, mulai: number, akhir: number): number => Math.round(28 + ((v - mulai) * 244) / (akhir - mulai));
/** Garis bilangan dari `mulai` sampai `akhir` dengan tanda tiap `langkah`, di tinggi `y`. */
export function garisBil(y: number, mulai: number, akhir: number, langkah: number): Obj[] {
  const out: Obj[] = [garis("gb-ln", 20, y, 260, 0, W.biru, 2.5)];
  for (let v = mulai; v <= akhir; v += langkah) {
    out.push(garis(`gb-${v}`, gbX(v, mulai, akhir), y - 6, 0, 12, W.biru, 2));
    out.push(teks(`gb-l${v}`, gbX(v, mulai, akhir), y + 22, String(v), 11, W.biru));
  }
  return out;
}
export const idGarisBil = (mulai: number, akhir: number, langkah: number): string[] => {
  const out = ["gb-ln"];
  for (let v = mulai; v <= akhir; v += langkah) out.push(`gb-${v}`, `gb-l${v}`);
  return out;
};
/** Loncatan melengkung dari nilai `a` ke nilai `b` pada garis bilangan di tinggi `y`; label di atasnya. */
export function loncat(i: number, y: number, a: number, b: number, mulai: number, akhir: number, label: string): Obj[] {
  const x1 = gbX(a, mulai, akhir);
  const x2 = gbX(b, mulai, akhir);
  return [
    { id: `lc${i}`, t: "jalur", x: 0, y: 0, d: `M${x1} ${y - 4} Q ${Math.round((x1 + x2) / 2)} ${y - 44} ${x2} ${y - 4}`, garis: W.merah, tebal: 2.4, gambar: true },
    teks(`lc${i}-t`, Math.round((x1 + x2) / 2), y - 34, label, 11, W.merah),
  ];
}

/* ------------------------------ Bungkus sepuluh ------------------------------ */
/** `puluhan` bungkus (batang tegak) dan `satuan` titik lepas, pojok kiri-atas (x, y). Id `${id}-p1..`, `${id}-s1..`. */
export function bungkus(id: string, puluhan: number, satuan: number, x: number, y: number): Obj[] {
  const out: Obj[] = [];
  for (let i = 0; i < puluhan; i += 1) out.push(kotak(`${id}-p${i + 1}`, x + i * 14, y, 10, 44, W.langit, W.biru, { rx: 2, tebal: 1.2 }));
  for (let j = 0; j < satuan; j += 1) out.push(bulat(`${id}-s${j + 1}`, x + puluhan * 14 + 6 + (j % 2) * 10, y + 5 + Math.floor(j / 2) * 9, 3.6, W.merahMuda, W.biru, { tebal: 1 }));
  return out;
}
export const idBungkus = (id: string, puluhan: number, satuan: number): string[] => [...Array.from({ length: puluhan }, (_, i) => `${id}-p${i + 1}`), ...Array.from({ length: satuan }, (_, j) => `${id}-s${j + 1}`)];
