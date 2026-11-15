import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 2 Bab 5 Sub-Bab B (Setengah dari Kumpulan Benda): benda di meja, dua tempat pembagian, tanda sama banyak atau bukan,
 * pasangan, tabel, dan kartu bilangan genap atau ganjil. Berkas ini TIDAK dipakai bab lain.
 *
 * Kesepakatan id (dipakai uji hitung ulang):
 * - Benda ke-n pada tempat `g` (mj = meja, pa = tempat kiri, pb = tempat kanan): `${g}_${n}_${simbol}`; simbol: kelereng, bintang, ikan, bola, kartu.
 * - Tempat: `${g}-w` (kotak), `${g}-nm` (nama pemilik atau Kiri/Kanan), `${g}-jml` (banyak benda di tempat itu, angka).
 * - Tanda: `tanda` (✅ dua tempat sama banyak dan meja kosong, ❌ bukan itu). Pasangan di meja: `ps${j}` (kotak putus-putus memeluk dua benda).
 * - Pola setengah: baris `p1..p4` dengan `pj-n` (banyak seluruhnya) dan `pj-s` (setengahnya). Tabel: baris `t1..t4` dengan `tj-n`, `tj-s`, `tj-r`, `tj-j`.
 * - Kartu bilangan: `g${n}-k` dan `g${n}-t`; kolom kiri bisa dibagi dua, kolom kanan tersisa satu. Persamaan: teks `ps-eq` berbentuk "a + b = c".
 * - Kartu pilihan `c1..cn` (`c1-k`, `c1-t`).
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#16A34A",
  putih: "#FFFFFF",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  pink: "#FBCFE8",
  lavender: "#EDE9FE",
  oranye: "#FBA919",
  kuning: "#FDE68A",
};

export const OWL = "\u{1F989}";

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai empat baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Kartu pilihan atau kata: pojok kiri-atas (x, y); id `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, isi: string, warna: string = W.krem, w = 40, h = 36, u = 22, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.6, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, isi, u, W.merah, o),
];

/* ------------------------------ Benda dan tempat ------------------------------ */

export type Simbol = "kelereng" | "bintang" | "ikan" | "bola" | "kartu";
export type Tempat = "mj" | "pa" | "pb";
export const NAMA_BENDA: Record<Simbol, string> = { kelereng: "kelereng", bintang: "bintang", ikan: "ikan", bola: "bola", kartu: "kartu" };
export const WARNA_BENDA = { kelereng: "#3B82F6", bola: "#F97316" };
export const U_BENDA = 18;

/** Kotak tiap tempat (x, y, w, h). */
export const WADAH: Record<Tempat, { x: number; y: number; w: number; h: number }> = {
  mj: { x: 10, y: 34, w: 280, h: 44 },
  pa: { x: 12, y: 104, w: 130, h: 72 },
  pb: { x: 158, y: 104, w: 130, h: 72 },
};
const r1 = (n: number): number => Math.round(n * 10) / 10;
export const JARAK_MEJA = 26;
export const CY_MEJA = 58;

/** Titik tengah benda ke-n pada tempat g. Di meja barisan dipusatkan menurut banyak benda awal `n0`; di tempat kiri atau kanan tersusun tiga kolom. */
export function pusat(g: Tempat, n: number, n0 = 10): [number, number] {
  if (g === "mj") return [r1(150 + (n - (n0 - 1) / 2) * JARAK_MEJA), CY_MEJA];
  const w = WADAH[g];
  return [r1(w.x + 25 + (n % 3) * 40), r1(w.y + 22 + Math.floor(n / 3) * 30)];
}

export const idBenda = (g: Tempat, n: number, s: Simbol): string => `${g}_${n}_${s}`;

/** Satu benda ke-n pada tempat g. */
export function benda(g: Tempat, n: number, s: Simbol, n0 = 10, o: Opsi = {}): Obj {
  const id = idBenda(g, n, s);
  const [cx, cy] = pusat(g, n, n0);
  const u = U_BENDA;
  const z = { z: 2, ...o };
  if (s === "kelereng") return bulat(id, cx, cy, u / 2, WARNA_BENDA.kelereng, W.biru, z);
  if (s === "bola") return bulat(id, cx, cy, u / 2, WARNA_BENDA.bola, W.biru, z);
  if (s === "bintang") return teks(id, cx, r1(cy + u * 0.42), "★", r1(u * 1.3), "#F59E0B", z);
  if (s === "ikan") return teks(id, cx, r1(cy + u * 0.4), "\u{1F41F}", r1(u * 1.1), W.biru, z);
  return kotak(id, r1(cx - 7), r1(cy - 10), 14, 20, "#FDE68A", W.biru, { rx: 2, ...z });
}

/** Kotak meja. */
export const meja = (): Obj[] => [kotak("mj-w", WADAH.mj.x, WADAH.mj.y, WADAH.mj.w, WADAH.mj.h, W.krem, W.oranye, { rx: 8, z: 0 })];

/** Banyak benda di meja, angka kecil di atas pojok kanan meja. */
export const jmlMeja = (n: number): Obj => teks("mj-jml", 280, 30, String(n), 13, W.merah, { z: 3 });

/** Satu tempat pembagian (kiri atau kanan) dengan nama di bawahnya dan banyak benda (awal 0). */
export function tempat(g: "pa" | "pb", nama: string, banyak = 0): Obj[] {
  const w = WADAH[g];
  return [
    kotak(`${g}-w`, w.x, w.y, w.w, w.h, g === "pa" ? W.hijauMuda : W.langit, W.biru, { rx: 10, z: 0 }),
    teks(`${g}-nm`, w.x + 38, 191, nama, 10, W.ungu, { z: 3 }),
    teks(`${g}-jml`, w.x + 100, 192, String(banyak), 13, W.merah, { z: 3 }),
  ];
}

/** Tanda di antara meja dan dua tempat: ✅ sama banyak, ❌ bukan. */
export const tanda = (ok: boolean): Obj => teks("tanda", 150, 97, ok ? "✅" : "❌", 22, W.biru, { z: 4 });

/** Kotak putus-putus yang memeluk dua benda di meja: pasangan ke-j (benda 2j dan 2j+1). */
export const pasangan = (j: number, n0: number): Obj => {
  const [ax, ay] = pusat("mj", 2 * j, n0);
  const [bx] = pusat("mj", 2 * j + 1, n0);
  return kotak(`ps${j}`, r1(ax - 12), r1(ay - 15), r1(bx - ax + 24), 30, "none", W.ungu, { rx: 8, putus: true, tebal: 2, z: 1 });
};

/** Persamaan di tengah: "a + b = c". */
export const persamaan = (a: number, b: number, c: number, y = 140): Obj => teks("ps-eq", 150, y, `${a} + ${b} = ${c}`, 16, W.merah, { z: 4 });

/** Kartu hasil di bagian atas (tempat meja bila meja sudah kosong dan dihapus). */
export const hasil = (id: string, isi: string, warna: string = W.emas): Obj[] => kartu(id, 30, 36, 240, 34, warna, [isi], 11);

/** Pita kecil di antara meja dan dua tempat (tempat yang sama dengan tanda, jangan dipakai bersama tanda). */
export const pita = (id: string, isi: string, warna: string = W.krem): Obj[] => kartu(id, 40, 82, 220, 20, warna, [isi], 9.5);

/** Kartu bilangan untuk genap atau ganjil: kolom kiri (bisa dibagi dua) dan kolom kanan (tersisa satu). Id `g${n}-k` dan `g${n}-t`. */
export function kartuBilangan(n: number): Obj[] {
  const genap = n % 2 === 0;
  const daftar = genap ? [2, 4, 6, 8, 10] : [3, 5, 7, 9];
  const i = daftar.indexOf(n);
  const x = (genap ? 18 : 168) + (i % 3) * 42;
  const y = 56 + Math.floor(i / 3) * 40;
  return kartuAngka(`g${n}`, x, y, String(n), genap ? W.hijauMuda : W.pink, 34, 30, 16);
}

/** Dua judul kolom untuk kartu bilangan. */
export const kepalaGenap = (): Obj[] => [
  teks("gh1", 80, 44, "Bisa dibagi dua", 10, W.hijau, { z: 3 }),
  teks("gh2", 220, 44, "Tersisa satu", 10, W.merah, { z: 3 }),
];
