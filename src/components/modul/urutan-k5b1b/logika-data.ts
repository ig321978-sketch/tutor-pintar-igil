/**
 * Logika murni membandingkan dan mengurutkan bilangan Kelas 5 Bab 1 Sub-Bab B "Urutan Tribun Pak Hasto" (tanpa React, tanpa jaringan).
 * Diuji di Node: scripts/uji-urutan-k5b1b.mjs. Isi: kolom tempat, penentu (banyak angka lebih dulu, lalu angka dari kiri), tanda, urutan naik dan turun,
 * peringkat, serta geometri garis bilangan dengan patokan (titik tepat sebanding dengan bilangannya) dan papan kolom.
 * Pembanding memakai teks angka (bukan pengurangan), supaya bisa diuji silang dengan perbandingan bilangan biasa.
 */

export const NAMA_KOLOM = ["satuan", "puluhan", "ratusan", "ribuan", "puluh ribuan"] as const;
export type NamaKolom = (typeof NAMA_KOLOM)[number];
export const BANYAK_KOLOM = 5;

/** Bilangan dengan titik pemisah ribuan: 24350 menjadi "24.350". */
export const fmt = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
/** Banyak angka (tanpa nol di depan). */
export const banyakAngka = (n: number): number => String(n).length;

export type Penentu =
  | { cara: "panjang"; besar: "a" | "b" }
  | { cara: "kolom"; i: number; kolom: number; nama: NamaKolom; besar: "a" | "b" }
  | { cara: "sama" };
export type Tanda = "<" | ">" | "=";

/** Penentu perbandingan: banyak angka lebih dulu; bila sama, angka pertama yang berbeda dari kiri. */
export function penentu(a: number, b: number): Penentu {
  const sa = String(a);
  const sb = String(b);
  if (sa.length !== sb.length) return { cara: "panjang", besar: sa.length > sb.length ? "a" : "b" };
  for (let i = 0; i < sa.length; i += 1) {
    if (sa[i] !== sb[i]) {
      const kolom = sa.length - 1 - i;
      return { cara: "kolom", i, kolom, nama: NAMA_KOLOM[kolom], besar: sa[i] > sb[i] ? "a" : "b" };
    }
  }
  return { cara: "sama" };
}
export const tandaDari = (a: number, b: number): Tanda => {
  const p = penentu(a, b);
  return p.cara === "sama" ? "=" : p.besar === "a" ? ">" : "<";
};
/** Nama penentu untuk pilihan: "banyak angka", nama kolom, atau "semua sama". */
export const namaPenentu = (a: number, b: number): string => {
  const p = penentu(a, b);
  return p.cara === "panjang" ? "banyak angka" : p.cara === "kolom" ? p.nama : "semua sama";
};
/** Kolom ke berapa dari kiri (mulai satu) tempat angka penentu, pada dua bilangan yang sama panjang. null bila tidak berlaku. */
export const kolomDariKiri = (a: number, b: number): number | null => {
  const p = penentu(a, b);
  return p.cara === "kolom" ? p.i + 1 : null;
};

export const urutkan = (xs: number[], arah: "naik" | "turun"): number[] => {
  const naik = [...xs].sort((p, q) => {
    const t = tandaDari(p, q);
    return t === "<" ? -1 : t === ">" ? 1 : 0;
  });
  return arah === "naik" ? naik : naik.reverse();
};
/** Urutan ke berapa dari yang paling kecil (mulai satu). */
export const peringkat = (xs: number[], n: number): number => urutkan(xs, "naik").indexOf(n) + 1;

/* ------------------------------ Garis bilangan dan patokan ------------------------------ */
export const LANGKAH_GARIS = 10000;
export const BANYAK_PATOKAN = 4;
export const patokanKiri = (n: number, langkah = LANGKAH_GARIS): number => Math.floor(n / langkah) * langkah;
export const ruasDari = (n: number, langkah = LANGKAH_GARIS): [number, number] => [patokanKiri(n, langkah), patokanKiri(n, langkah) + langkah];
export const teksRuas = (lo: number, langkah = LANGKAH_GARIS): string => `antara ${fmt(lo)} dan ${fmt(lo + langkah)}`;
/** Patokan terdekat (kelipatan langkah). Bilangan tepat di tengah (selisih sama) tidak boleh dipakai. */
export function patokanTerdekat(n: number, langkah = LANGKAH_GARIS): number {
  const lo = patokanKiri(n, langkah);
  const sisa = n - lo;
  if (sisa * 2 === langkah) throw new Error(`bilangan ${n} tepat di tengah dua patokan`);
  return sisa * 2 < langkah ? lo : lo + langkah;
}
export const sisiPatokan = (n: number, patokan: number): "kiri" | "kanan" | "tepat" => (n === patokan ? "tepat" : tandaDari(n, patokan) === "<" ? "kiri" : "kanan");

export const GARIS_LEBAR = 220;
export const GARIS_TINGGI = 100;
const X0 = 26;
const X1 = 194;
export const Y_GARIS = 68;
/** Jarak mendatar paling kecil antara dua label titik di tingkat yang sama (satuan gambar). */
export const JARAK_LABEL = 52;
export type TitikGaris = { nama: string; n: number };
export type Garis = {
  lebar: number;
  tinggi: number;
  x0: number;
  x1: number;
  y: number;
  lo: number;
  akhir: number;
  patokan: { n: number; x: number; angka: string }[];
  titik: { nama: string; n: number; x: number; tingkat: number; y: number }[];
};
/** Garis bilangan dari patokan `lo` dengan `banyak` patokan berjarak `langkah`. Posisi titik sebanding dengan bilangannya; label titik bertingkat supaya tidak bertabrakan. */
export function rancangGaris(lo: number, titik: TitikGaris[], banyak = BANYAK_PATOKAN, langkah = LANGKAH_GARIS): Garis {
  const akhir = lo + langkah * (banyak - 1);
  const x = (n: number): number => X0 + ((n - lo) / (akhir - lo)) * (X1 - X0);
  const pat = Array.from({ length: banyak }, (_, k) => ({ n: lo + k * langkah, x: x(lo + k * langkah), angka: fmt(lo + k * langkah) }));
  const urut = [...titik].sort((p, q) => p.n - q.n);
  const tingkatDipakai: { x: number; t: number }[] = [];
  const hasil = urut.map((t) => {
    const px = x(t.n);
    let tingkat = 0;
    while (tingkatDipakai.some((u) => u.t === tingkat && Math.abs(u.x - px) < JARAK_LABEL)) tingkat += 1;
    tingkatDipakai.push({ x: px, t: tingkat });
    return { nama: t.nama, n: t.n, x: px, tingkat, y: Y_GARIS - 14 - tingkat * 20 };
  });
  return { lebar: GARIS_LEBAR, tinggi: GARIS_TINGGI, x0: X0, x1: X1, y: Y_GARIS, lo, akhir, patokan: pat, titik: hasil };
}
/** Patokan paling kiri yang cocok: satu langkah di bawah patokan kiri bilangan terkecil (tidak kurang dari nol), supaya semua titik di dalam garis. */
export function awalGaris(titik: number[], banyak = BANYAK_PATOKAN, langkah = LANGKAH_GARIS): number {
  const kecil = Math.min(...titik);
  const besar = Math.max(...titik);
  let lo = Math.max(0, patokanKiri(kecil, langkah) - langkah);
  while (lo + langkah * (banyak - 1) < besar) lo += langkah;
  return lo;
}
export const titikDalamGaris = (g: Garis): boolean => g.titik.every((t) => t.n >= g.lo && t.n <= g.akhir);

/* ------------------------------ Papan kolom ------------------------------ */
/** Sel papan kolom (lima kolom, puluh ribuan di kiri). Kolom di depan bilangan kosong, bukan nol, supaya banyak angka tampak. */
export const selKolom = (n: number): (string | null)[] => {
  const s = String(n);
  return Array.from({ length: BANYAK_KOLOM }, (_, i) => {
    const k = BANYAK_KOLOM - 1 - i;
    return k < s.length ? s[s.length - 1 - k] : null;
  });
};
/** Titik pemisah ribuan tampil setelah sel ke-2 (antara puluh ribuan/ribuan dan ratusan) bila bilangan punya lebih dari tiga angka. */
export const adaTitikSetelah = (n: number, i: number): boolean => i === BANYAK_KOLOM - 4 && String(n).length > 3;
export const lebarGarisSah = (g: Garis): boolean => g.patokan.every((p, k) => k === 0 || p.x - g.patokan[k - 1].x >= 52);
