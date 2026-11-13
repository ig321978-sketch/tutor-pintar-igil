import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 8 Sub-Bab B (Piktogram): kue apem, tomat, jeruk, tabel data, dan baris piktogram.
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
  jeruk: "#FB923C",
  krem: "#FEF9C3",
  muda: "#DBEAFE",
  hijauMuda: "#BBF7D0",
  merahMuda: "#FECACA",
  coklat: "#92400E",
  kue: "#FCD9A8",
  kueGaris: "#B45309",
  tomat: "#EF4444",
  langitMuda: "#E0F2FE",
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const jalur = (id: string, x: number, y: number, d: string, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "jalur", x, y, d, warna, garis: garisW, tebal: 1.2, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Kartu berjudul: kotak berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 8.6, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u))];
}

/** Kartu satu metode luar: nama (satu sampai dua baris) dan arti singkat. Lebar 134, tinggi 70. */
export const kartuMetode = (id: string, x: number, y: number, warna: string, baris: string[], arti: string): Obj[] => [
  kotak(`${id}-k`, x, y, 134, 70, warna, W.biru, { rx: 10 }),
  ...baris.map((b, i) => teks(`${id}-n${i}`, x + 67, y + 24 + i * 12, b, 8.6)),
  teks(`${id}-a`, x + 67, y + 28 + baris.length * 12, arti, 7, W.ungu),
];

/* ------------------------------ Data buku ------------------------------ */

/** Penjualan kue apem, Tabel 8.6 (hlm. 250). Satu gambar apem mewakili 4 kue. */
export const APEM = [
  { hari: "Senin", n: 40 },
  { hari: "Selasa", n: 35 },
  { hari: "Rabu", n: 30 },
  { hari: "Kamis", n: 37 },
  { hari: "Jumat", n: 27 },
  { hari: "Sabtu", n: 29 },
] as const;

/** Hasil panen tomat Pak Chandra, Tabel 8.7 (hlm. 252), dalam kg. */
export const TOMAT = [
  { minggu: 1, n: 10 },
  { minggu: 2, n: 14 },
  { minggu: 3, n: 20 },
  { minggu: 4, n: 12 },
  { minggu: 5, n: 4 },
] as const;

/** Banyaknya gambar utuh dan sisa seperempat (0 sampai 3) untuk n kue bila satu gambar mewakili 4. */
export const potongApem = (n: number): { utuh: number; q: number } => ({ utuh: Math.floor(n / 4), q: n % 4 });

/* ------------------------------ Gambar apem dan tomat ------------------------------ */

const R_APEM = 6.4;

/**
 * Satu kue apem berpusat di (x, y). q = 4 utuh, q = 1 sampai 3 potongan seperempat sampai tiga perempat (berjalan searah jarum jam dari atas).
 * Id utuh `${id}`, potongan `${id}`; nilai potongan dibaca dari akhiran pada id yang dibuat pemanggil.
 */
export function apem(id: string, x: number, y: number, q: number, r: number = R_APEM, o: Opsi = {}): Obj[] {
  if (q >= 4) return [bulat(id, x, y, r, W.kue, W.kueGaris, { tebal: 1, ...o }), jalur(`${id}d`, x, y, "M-2.4 -1.6 L0 2 L2.4 -1.6", "none", W.hijau, { tebal: 1.2, ...o })];
  const d = q === 1 ? `M0 0 L0 ${-r} A${r} ${r} 0 0 1 ${r} 0 Z` : q === 2 ? `M0 0 L0 ${-r} A${r} ${r} 0 0 1 0 ${r} Z` : `M0 0 L0 ${-r} A${r} ${r} 0 1 1 ${-r} 0 Z`;
  return [jalur(id, x, y, d, W.kue, W.kueGaris, { tebal: 1, ...o })];
}

/** Satu tomat berpusat di (x, y). */
export const tomat = (id: string, x: number, y: number, r = 6, o: Opsi = {}): Obj[] => [bulat(id, x, y, r, W.tomat, "#991B1B", { tebal: 1, ...o }), jalur(`${id}d`, x, y - r + 1, "M-2 0 L0 -2 L2 0", "none", W.hijau, { tebal: 1.2, ...o })];

/** Titik awal baris piktogram dan jarak antargambar. */
export const PX = 66;
export const PJ = 16;

/**
 * Satu baris piktogram apem: nama hari di kiri, `utuh` gambar utuh, lalu satu potongan q (0 = tidak ada).
 * Id: nama `${id}n`, utuh `${id}u0..`, potongan `${id}q${q}`.
 */
export function barisApem(id: string, y: number, hari: string, n: number, o: Opsi = {}): Obj[] {
  const { utuh, q } = potongApem(n);
  const out: Obj[] = [teks(`${id}n`, PX - 10, y + 3, hari, 8, W.biru, { anchor: "end", ...o })];
  for (let i = 0; i < utuh; i += 1) out.push(...apem(`${id}u${i}`, PX + i * PJ, y, 4, R_APEM, o));
  if (q > 0) out.push(...apem(`${id}q${q}`, PX + utuh * PJ, y, q, R_APEM, o));
  return out;
}

/** Id semua benda satu baris apem (untuk dihapus atau dikecilkan). */
export function idBarisApem(id: string, n: number): string[] {
  const { utuh, q } = potongApem(n);
  const ids = [`${id}n`];
  for (let i = 0; i < utuh; i += 1) ids.push(`${id}u${i}`, `${id}u${i}d`);
  if (q > 0) ids.push(`${id}q${q}`);
  return ids;
}

/**
 * Satu baris piktogram tomat: `n` kg dan `nilai` kg per gambar, hanya gambar utuh dan satu setengah bila perlu.
 * Id: nama `${id}n`, utuh `${id}u0..`, setengah `${id}h`.
 */
export function barisTomat(id: string, y: number, nama: string, n: number, nilai: number, o: Opsi = {}): Obj[] {
  const utuh = Math.floor(n / nilai);
  const sisa = n - utuh * nilai;
  const out: Obj[] = [teks(`${id}n`, PX - 10, y + 3, nama, 8, W.biru, { anchor: "end", ...o })];
  for (let i = 0; i < utuh; i += 1) out.push(...tomat(`${id}u${i}`, PX + i * 14, y, 5.6, o));
  if (sisa > 0) out.push(jalur(`${id}h`, PX + utuh * 14, y, "M0 -5.6 A5.6 5.6 0 0 0 0 5.6 Z", W.tomat, "#991B1B", { tebal: 1, ...o }));
  return out;
}

/** Tabel dua kolom (hari atau minggu, nilai) dengan baris judul. Pojok kiri-atas (x, y), sel tinggi 17. */
export function tabelData(id: string, x: number, y: number, judul: [string, string], baris: Array<[string, string]>, w1 = 62, w2 = 62): Obj[] {
  const out: Obj[] = [];
  [judul, ...baris].forEach((b, r) => {
    const head = r === 0;
    out.push(kotak(`${id}-s${r}0`, x, y + r * 17, w1, 17, head ? W.krem : W.putih, W.biru, { rx: 0, tebal: 1 }));
    out.push(kotak(`${id}-s${r}1`, x + w1, y + r * 17, w2, 17, head ? W.krem : W.putih, W.biru, { rx: 0, tebal: 1 }));
    out.push(teks(`${id}-t${r}0`, x + w1 / 2, y + r * 17 + 12, b[0], head ? 7.6 : 8.4));
    out.push(teks(`${id}-t${r}1`, x + w1 + w2 / 2, y + r * 17 + 12, b[1], head ? 7.6 : 8.4));
  });
  return out;
}

/** Id semua benda sebuah tabelData dengan jumlah baris (termasuk judul). */
export const idTabel = (id: string, jumlahBaris: number): string[] => Array.from({ length: jumlahBaris }, (_, r) => [`${id}-s${r}0`, `${id}-s${r}1`, `${id}-t${r}0`, `${id}-t${r}1`]).flat();

/** Seperti tabelData tetapi dipisah per baris (indeks 0 = judul), agar baris muncul satu per satu. */
export function tabelPerBaris(id: string, x: number, y: number, judul: [string, string], baris: Array<[string, string]>, w1 = 62, w2 = 62): Obj[][] {
  const semua = tabelData(id, x, y, judul, baris, w1, w2);
  return Array.from({ length: baris.length + 1 }, (_, r) => semua.filter((o) => new RegExp(`-[st]${r}[01]$`).test(o.id)));
}

/** Kotak kunci piktogram: gambar contoh, tulisan "mewakili n". Pojok kiri-atas (x, y), lebar 128. */
export function kunciApem(id: string, x: number, y: number, nilai: string, o: Opsi = {}): Obj[] {
  return [kotak(`${id}-k`, x, y, 128, 20, W.putih, W.biru, { rx: 6, ...o }), ...apem(`${id}-g`, x + 14, y + 10, 4, 6, o), teks(`${id}-t`, x + 72, y + 14, nilai, 8, W.biru, o)];
}
