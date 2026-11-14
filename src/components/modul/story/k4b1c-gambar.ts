import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 1 Sub-Bab C (Membandingkan dan Mengurutkan Bilangan): tabel nilai tempat, deret angka, kartu bilangan, papan spon, batang bertingkat, garis bilangan, dan kartu urutan.
 * Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
 * Angka pada gambar bernama supaya uji dapat membaca ulang bilangan dari gambar: tabel `id-t{0..3}` (angka per kolom) dan `id-j` (bilangan), deret `id-t{0..3}`, kartu `id-t`, batang `id-b{i}` dan `id-r`.
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
  arsir: "#FFCD4D",
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

/* ------------------------------ Data dari Buku Siswa dan Panduan Guru ------------------------------ */

/** Bilangan dengan titik ribuan, gaya buku: 8750 menjadi "8.750". */
export const fmt = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/** Buku Siswa hlm. 28: harga di pasar. Manggis setengah kilogram, apel seperempat kilogram; kios A dan kios B menjual bengkoang. */
export const HARGA = { manggis: 7500, apel: 6750, kiosA: 7500, kiosB: 8750 } as const;
/** Ayo Berlatih 1 (BS hlm. 32): pasangan dan yang lebih besar menurut kunci Panduan Guru hlm. 54. */
export const LATIHAN_SATU: readonly { a: number; b: number; besar: number }[] = [
  { a: 5734, b: 4312, besar: 5734 },
  { a: 5614, b: 5368, besar: 5614 },
  { a: 7124, b: 7197, besar: 7197 },
];
/** Ayo Berlatih 2 (BS hlm. 32-33): kunci tanda Panduan Guru hlm. 54. */
export const LATIHAN_DUA: readonly { a: number; tanda: string; b: number }[] = [
  { a: 4435, tanda: ">", b: 3345 },
  { a: 9999, tanda: ">", b: 9998 },
  { a: 1001, tanda: "<", b: 1002 },
  { a: 8765, tanda: "=", b: 8765 },
  { a: 4567, tanda: "<", b: 5787 },
  { a: 7654, tanda: "<", b: 7777 },
];
/** Tinggi gunung (BS hlm. 33, peta): meter di atas permukaan laut. */
export const GUNUNG = [
  { nama: "Sinabung", m: 2460 },
  { nama: "Semeru", m: 3676 },
  { nama: "Rinjani", m: 3726 },
] as const;
/** Ayo Berlatih mengurutkan (BS hlm. 35) dan kunci Panduan Guru hlm. 55. */
export const URUT_SOAL = [7570, 5240, 3041, 9941] as const;
export const URUT_KUNCI = [3041, 5240, 7570, 9941] as const;
/** Ayo Berpikir (Panduan Guru hlm. 55-56): empat angka dan contoh jawaban buku. */
export const ANGKA_BERPIKIR = [1, 5, 9, 2] as const;
export const CONTOH_A = [1592, 2951, 5921, 9215, 5129] as const;
export const CONTOH_D = [1155, 9925, 5119, 2222, 9225] as const;

/* ------------------------------ Tabel nilai tempat dan deret angka ------------------------------ */

export const NAMA_TEMPAT = ["Ribuan", "Ratusan", "Puluhan", "Satuan"] as const;
const digit = (n: number): string[] => String(n).padStart(4, "0").split("");

/** Tabel nilai tempat sebuah bilangan empat angka, lebar 4 kali `kol`. Id: `${id}-j` bilangan (di atas), `${id}-n{c}` nama tempat, `${id}-d{c}` sel angka, `${id}-t{c}` angka. */
export function tabelNilai(id: string, x: number, y: number, n: number, kol = 28, u = 11, o: Opsi = {}): Obj[] {
  const out: Obj[] = [teks(`${id}-j`, x + (2 * kol), y - 4, fmt(n), 10, W.biru, o)];
  digit(n).forEach((d, c) => {
    out.push(kotak(`${id}-n${c}`, x + c * kol, y, kol, 12, W.krem, W.biru, { rx: 0, tebal: 1, ...o }));
    out.push(teks(`${id}-nt${c}`, x + c * kol + kol / 2, y + 8.6, NAMA_TEMPAT[c], 6, W.biru, o));
    out.push(kotak(`${id}-d${c}`, x + c * kol, y + 12, kol, 20, W.putih, W.biru, { rx: 0, tebal: 1, ...o }));
    out.push(teks(`${id}-t${c}`, x + c * kol + kol / 2, y + 12 + 20 / 2 + u * 0.35, d, u, W.hijau, o));
  });
  return out;
}
/** Tabel nilai tempat dengan angka yang belum diisi (titik-titik), kecuali kolom di `isi`. */
export function tabelKosong(id: string, x: number, y: number, n: number, isi: readonly number[], kol = 28, u = 11, o: Opsi = {}): Obj[] {
  return tabelNilai(id, x, y, n, kol, u, o).map((ob) => {
    const m = ob.id.match(/-t(\d)$/);
    return m && !isi.includes(Number(m[1])) ? { ...ob, isi: "..." } : ob;
  });
}
/** Id benda sebuah tabel nilai tempat. */
export const idTabel = (id: string): string[] => ["j", ...[0, 1, 2, 3].flatMap((c) => [`n${c}`, `nt${c}`, `d${c}`, `t${c}`])].map((s) => `${id}-${s}`);
/** Warna sel angka kolom `c` (0 ribuan sampai 3 satuan). */
export const selTabel = (id: string, c: number, warna: string = W.arsir): { id: string; warna: string } => ({ id: `${id}-d${c}`, warna });

/** Deret angka satu bilangan, tiap angka satu kolom selebar `lg`. Id `${id}-t{c}`; titik ribuan `${id}-dot`. */
export function deret(id: string, x: number, y: number, n: number, lg = 22, u = 18, warna: string = W.biru, o: Opsi = {}): Obj[] {
  return [
    ...digit(n).map((d, c) => teks(`${id}-t${c}`, x + c * lg, y, d, u, warna, o)),
    teks(`${id}-dot`, x + 0.5 * lg + 1, y, ".", u, warna, o),
  ];
}
/** Kotak sorot di belakang kolom `c` sebuah deret. Id `${id}`. */
export const sorotKolom = (id: string, x: number, y: number, c: number, lg = 22, tinggi = 28, warna: string = W.arsir, o: Opsi = {}): Obj => kotak(id, x + c * lg - lg / 2, y - tinggi * 0.72, lg, tinggi, warna, W.merah, { rx: 4, tebal: 1.4, z: -1, ...o });

/* ------------------------------ Kartu bilangan dan papan spon (Aktivitas 3) ------------------------------ */

/** Kartu bilangan 10 sentimeter kali 10 sentimeter berlubang: satu angka, pojok kiri-atas (x, y). Id `${id}-k`, `${id}-o` (lubang), `${id}-t` (angka). */
export function kartuAngka(id: string, x: number, y: number, d: string | number, warna: string = W.krem, w = 22, h = 26, o: Opsi = {}): Obj[] {
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 3, tebal: 1.2, ...o }), bulat(`${id}-o`, x + w / 2, y + 4, 1.8, W.putih, W.biru, { tebal: 0.8, ...o }), teks(`${id}-t`, x + w / 2, y + h / 2 + 7, String(d), 15, W.biru, o)];
}
/** Papan spon 80 kali 20 sentimeter, pojok kiri-atas (x, y), tinggi h, dua bagian (kiri dan kanan) dengan empat paku di tiap bagian. Id `${id}-b`, `${id}-g` (pemisah), `${id}-p{0..7}` (paku). */
export function papan(id: string, x: number, y: number, w: number, h: number, o: Opsi = {}): Obj[] {
  const sisi = w / 2;
  return [
    kotak(`${id}-b`, x, y, w, h, "#E7D8B5", W.coklat, { rx: 4, ...o }),
    garis(`${id}-g`, x + sisi, y, 0, h, W.coklat, 2, { putus: true, ...o }),
    ...Array.from({ length: 8 }, (_, i) => bulat(`${id}-p${i}`, x + (i < 4 ? 0 : sisi) + ((i % 4) + 0.5) * (sisi / 4), y + 5, 2.4, W.hitam, W.hitam, { tebal: 0.8, ...o })),
  ];
}
/** Pusat mendatar paku nomor `i` (0..7) pada papan(id, x, y, w, h). */
export const xPaku = (x: number, w: number, i: number): number => x + (i < 4 ? 0 : w / 2) + ((i % 4) + 0.5) * (w / 8);

/* ------------------------------ Batang bertingkat (satu blok sama dengan seribu) ------------------------------ */

/** Lebar satu blok seribu pada batang: 10.000 tepat 280. */
export const LEBAR_BLOK = 28;
/**
 * Batang sebuah bilangan: sebanyak angka ribuan blok penuh `${id}-b{i}` (lebar LEBAR_BLOK) lalu satu potongan sisa `${id}-r` selebar sisa per seribu kali LEBAR_BLOK.
 * Sisa nol tidak digambar. Pojok kiri-atas (x, y), tinggi h.
 */
export function batangBil(id: string, x: number, y: number, n: number, h = 14, o: Opsi = {}): Obj[] {
  const penuh = Math.floor(n / 1000);
  const sisa = n % 1000;
  const out: Obj[] = Array.from({ length: penuh }, (_, i) => kotak(`${id}-b${i}`, x + i * LEBAR_BLOK, y, LEBAR_BLOK, h, W.biruMuda, W.putih, { rx: 0, tebal: 1.2, ...o }));
  if (sisa > 0) out.push(kotak(`${id}-r`, x + penuh * LEBAR_BLOK, y, (sisa / 1000) * LEBAR_BLOK, h, W.arsir, W.biru, { rx: 0, tebal: 1.2, ...o }));
  return out;
}
/** Id benda sebuah batang bilangan. */
export const idBatang = (id: string, n: number): string[] => [...Array.from({ length: Math.floor(n / 1000) }, (_, i) => `${id}-b${i}`), ...(n % 1000 > 0 ? [`${id}-r`] : [])];
/** Kaca pembesar sisa seribu: satu blok seribu selebar 100 terbagi sepuluh petak ratusan `${id}-z{i}`; petak pertama sebanyak `ratusan` berwarna. Pojok kiri-atas (x, y). */
export function zoomRatusan(id: string, x: number, y: number, ratusan: number, h = 16, warnaIsi: string = W.arsir, o: Opsi = {}): Obj[] {
  return Array.from({ length: 10 }, (_, i) => kotak(`${id}-z${i}`, x + i * 10, y, 10, h, i < ratusan ? warnaIsi : W.putih, W.biru, { rx: 0, tebal: 1, ...o }));
}

/* ------------------------------ Garis bilangan ------------------------------ */

/**
 * Garis bilangan dari `dari` sampai `sampai` memanjang dari x0 ke x1 di tinggi y, dengan tanda tiap `langkah`.
 * Id `${id}-ax` (garis), `${id}-g{i}` (tanda), `${id}-k{i}` (angka tanda).
 */
export function garisBil(id: string, x0: number, x1: number, y: number, dari: number, sampai: number, langkah: number, u = 7, o: Opsi = {}): Obj[] {
  const banyak = (sampai - dari) / langkah;
  const out: Obj[] = [garis(`${id}-ax`, x0, y, x1 - x0, 0, W.biru, 2, o)];
  for (let i = 0; i <= banyak; i += 1) {
    const x = x0 + (i * (x1 - x0)) / banyak;
    out.push(garis(`${id}-g${i}`, x, y - 4, 0, 8, W.biru, 1.2, o), teks(`${id}-k${i}`, x, y + 14, fmt(dari + i * langkah), u, W.biru, o));
  }
  return out;
}
/** Letak mendatar bilangan `n` pada garis bilangan dari dari..sampai berujung x0..x1. */
export const xGaris = (n: number, x0: number, x1: number, dari: number, sampai: number): number => x0 + ((n - dari) / (sampai - dari)) * (x1 - x0);
