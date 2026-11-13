import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 9 Sub-Bab C (Komposisi dan Dekomposisi Bilangan sampai 1.000.000): lembar uang, tabel nilai tempat,
 * bagian bilangan, dan papan sisa. Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
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
  mint: "#DCFCE7",
  mawar: "#FCE7F3",
  jeruk: "#FED7AA",
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Kartu berjudul: kotak berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 8.6): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8 }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u))];
}

/** Bilangan bertitik ribuan: 345600 menjadi "345.600". */
export const rb = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* ------------------------------ Uang rupiah ------------------------------ */

const WARNA_UANG: Record<number, string> = { 100000: "#FCA5A5", 50000: "#93C5FD", 20000: "#86EFAC", 10000: "#C4B5FD", 5000: "#FDBA74", 2000: "#CBD5E1", 1000: "#FDE68A" };

/** Selembar uang: kotak berwarna dengan nilainya. Pojok kiri-atas (x, y). Id: `${id}-k`, `${id}-t`. */
export const lembar = (id: string, x: number, y: number, nilai: number, w = 30, h = 20): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, WARNA_UANG[nilai] ?? W.putih, W.biru, { rx: 3, tebal: 1 }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + 2.4, rb(nilai), 6.2),
];

/** Sebaris `n` lembar uang bernilai sama, jarak `jarak`. Id: `${id}0-k`, `${id}0-t`, `${id}1-k`, dan seterusnya. */
export const deretLembar = (id: string, x: number, y: number, nilai: number, n: number, jarak = 34, w = 30): Obj[] => Array.from({ length: n }, (_, i) => lembar(`${id}${i}`, x + i * jarak, y, nilai, w)).flat();

/** Sekeping uang logam: bulat dengan nilainya. Titik tengah (x, y). Id: `${id}-k`, `${id}-t`. */
export const keping = (id: string, x: number, y: number, nilai: number): Obj[] => [
  bulat(`${id}-k`, x, y, 10, nilai === 500 ? "#FDE047" : "#E5E7EB", W.biru, { tebal: 1.2 }),
  teks(`${id}-t`, x, y + 2.4, String(nilai), 6.6),
];

/* ------------------------------ Tabel nilai tempat enam kolom ------------------------------ */

const KOLOM: [string, string][] = [["Ratus", "Ribuan"], ["Puluh", "Ribuan"], ["Ribuan", ""], ["Ratusan", ""], ["Puluhan", ""], ["Satuan", ""]];
export const LEBAR_KOLOM = 44;

/** Kepala dan satu baris kosong tabel nilai tempat: enam kolom selebar 44, tinggi 22 + 22. Id: `${id}-h{c}`, `${id}-ha{c}`, `${id}-hb{c}`, `${id}-v{c}`. */
export function tempat(id: string, x: number, y: number): Obj[] {
  const out: Obj[] = [];
  KOLOM.forEach(([a, b], c) => {
    const cx = x + c * LEBAR_KOLOM + LEBAR_KOLOM / 2;
    out.push(kotak(`${id}-h${c}`, x + c * LEBAR_KOLOM, y, LEBAR_KOLOM, 22, W.krem, W.biru, { rx: 0, tebal: 0.9 }));
    if (b) out.push(teks(`${id}-ha${c}`, cx, y + 9.5, a, 6.4), teks(`${id}-hb${c}`, cx, y + 18, b, 6.4));
    else out.push(teks(`${id}-ha${c}`, cx, y + 13.5, a, 6.4));
    out.push(kotak(`${id}-v${c}`, x + c * LEBAR_KOLOM, y + 22, LEBAR_KOLOM, 22, W.putih, W.biru, { rx: 0, tebal: 0.9 }));
  });
  return out;
}

/** Satu angka pada kolom `c` baris isian tabel nilai tempat. Id: `${id}${c}`. */
export const angka = (id: string, x: number, y: number, c: number, isi: string, warna: string = W.biru, u = 13): Obj => teks(`${id}${c}`, x + c * LEBAR_KOLOM + LEBAR_KOLOM / 2, y + 22 + 15.5, isi, u, warna);

/** Seluruh baris angka tabel nilai tempat. */
export const barisAngka = (id: string, x: number, y: number, isi: string[], warna: string = W.biru): Obj[] => isi.map((d, c) => angka(id, x, y, c, d, warna));

/** Id angka baris `barisAngka` (untuk dihapus). */
export const idAngka = (id: string): string[] => [0, 1, 2, 3, 4, 5].map((c) => `${id}${c}`);

/* ------------------------------ Tabel umum ------------------------------ */

/** Tabel sel: `lebar[c]` lebar kolom, tinggi baris `tb`. Baris pertama diwarnai judul. Id: `${id}-s{r}{c}` dan `${id}-t{r}{c}`. */
export function tabel(id: string, x: number, y: number, lebar: number[], tb: number, baris: string[][], u = 8, warnaJudul: string = W.krem): Obj[] {
  const out: Obj[] = [];
  baris.forEach((b, r) => {
    let kiri = x;
    b.forEach((sel, c) => {
      out.push(kotak(`${id}-s${r}${c}`, kiri, y + r * tb, lebar[c], tb, r === 0 ? warnaJudul : W.putih, W.biru, { rx: 0, tebal: 0.9 }));
      if (sel) out.push(teks(`${id}-t${r}${c}`, kiri + lebar[c] / 2, y + r * tb + tb / 2 + u * 0.35, sel, u));
      kiri += lebar[c];
    });
  });
  return out;
}

/** Satu baris tabel di (x, y). Id: `${id}-s{c}` dan `${id}-t{c}`. */
export function barisTabel(id: string, x: number, y: number, lebar: number[], tb: number, sel: string[], u = 8, warna: string = W.putih): Obj[] {
  const out: Obj[] = [];
  let kiri = x;
  sel.forEach((isi, c) => {
    out.push(kotak(`${id}-s${c}`, kiri, y, lebar[c], tb, warna, W.biru, { rx: 0, tebal: 0.9 }));
    if (isi) out.push(teks(`${id}-t${c}`, kiri + lebar[c] / 2, y + tb / 2 + u * 0.35, isi, u));
    kiri += lebar[c];
  });
  return out;
}

/** Kotak bagian bilangan: satu kolom nilai tempat dengan judul, angka, dan nilai. Pojok kiri-atas (x, y), lebar 44, tinggi 56. */
export function bagian(id: string, x: number, y: number, judul: [string, string], digit: string, nilai: string, warna: string = W.mint): Obj[] {
  const out: Obj[] = [kotak(`${id}-k`, x, y, 44, 56, warna, W.biru, { rx: 6, tebal: 1.2 })];
  if (judul[1]) out.push(teks(`${id}-a`, x + 22, y + 9, judul[0], 6.2), teks(`${id}-b`, x + 22, y + 16.5, judul[1], 6.2));
  else out.push(teks(`${id}-a`, x + 22, y + 13, judul[0], 6.2));
  out.push(teks(`${id}-d`, x + 22, y + 35, digit, 15, W.ungu), teks(`${id}-n`, x + 22, y + 50, nilai, 6.4, W.hijau));
  return out;
}
