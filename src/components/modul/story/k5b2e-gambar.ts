import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 2 Sub-Bab E (menentukan KPK dan FPB dengan faktor prima): saringan Eratosthenes, pohon faktor,
 * diagram Venn faktor prima, dan penulisan pangkat prima. Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
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
  kayu: "#D6A15B",
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

/** Tabel sederhana: baris pertama kepala. Id sel `${id}-s{r}{c}` (kotak) dan `${id}-t{r}{c}` (teks). */
export function tabel(id: string, x: number, y: number, kolW: number[], baris: string[][], tinggi = 16, u = 8, warnaKepala: string = W.krem, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  baris.forEach((b, r) => {
    let px = x;
    b.forEach((isi, c) => {
      out.push(kotak(`${id}-s${r}${c}`, px, y + r * tinggi, kolW[c], tinggi, r === 0 ? warnaKepala : W.putih, W.biru, { rx: 0, tebal: 1, ...o }));
      if (isi) out.push(teks(`${id}-t${r}${c}`, px + kolW[c] / 2, y + r * tinggi + tinggi / 2 + u * 0.35, isi, u, W.biru, o));
      px += kolW[c];
    });
  });
  return out;
}

/** Id semua benda dari daftar (untuk hapus atau ubah sekaligus). */
export const idDari = (objs: Obj[]): string[] => objs.map((o) => o.id);

/* ------------------------------ Saringan Eratosthenes (Buku Siswa hlm. 53 sampai 54) ------------------------------ */

/** Ukuran dan letak kotak bilangan 1 sampai 100 (sepuluh kolom, sepuluh baris). Kotak n: id `${id}-c${n}`, angkanya `${id}-t${n}`. */
export const SARINGAN = { x: 6, y: 26, lebar: 22, tinggi: 15 };

export function saringan(id: string, warna: (n: number) => string = () => W.putih, o: Opsi = {}): Obj[] {
  const { x, y, lebar, tinggi } = SARINGAN;
  const out: Obj[] = [];
  for (let n = 1; n <= 100; n += 1) {
    const kol = (n - 1) % 10;
    const bar = Math.floor((n - 1) / 10);
    out.push(kotak(`${id}-c${n}`, x + kol * lebar, y + bar * tinggi, lebar, tinggi, warna(n), W.biru, { rx: 0, tebal: 0.8, ...o }));
    out.push(teks(`${id}-t${n}`, x + kol * lebar + lebar / 2, y + bar * tinggi + tinggi / 2 + 2.6, String(n), 7.4, W.biru, o));
  }
  return out;
}
/** Ubah warna kotak bilangan-bilangan tertentu pada saringan. */
export const warnaiSaringan = (id: string, warna: string, daftar: number[]): { id: string; warna: string }[] => daftar.map((n) => ({ id: `${id}-c${n}`, warna }));

/* ------------------------------ Pohon faktor (Buku Siswa hlm. 56) ------------------------------ */

export type Pohon = { n: number; a?: Pohon; b?: Pohon };

export const adalahPrima = (n: number): boolean => {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i += 1) if (n % i === 0) return false;
  return true;
};

/**
 * Pohon faktor dengan akar di (x, y). Tiap simpul dua anak (kiri a, kanan b). Jarak kiri-kanan `dx` mengecil `susut` kali tiap tingkat, jarak ke bawah `dy`.
 * Simpul: lingkaran `${id}-n{jalur}` dan angka `${id}-t{jalur}`, jalur = "" untuk akar, "a" atau "b" lalu seterusnya. Garis ke anak: `${id}-l{jalur anak}`.
 * Bilangan prima berwarna hijau muda, bukan prima langit. `tingkat[i]` berisi benda tingkat ke-i agar dapat dipicu satu per satu.
 */
export function pohon(id: string, p: Pohon, x: number, y: number, dx: number, dy: number, r = 8.5, u = 8.4, susut = 0.62, o: Opsi = {}): { semua: Obj[]; tingkat: Obj[][] } {
  const tingkat: Obj[][] = [];
  const jalan = (s: Pohon, px: number, py: number, jalur: string, lv: number, dxs: number, indukX?: number, indukY?: number): void => {
    const daftar = (tingkat[lv] ??= []);
    if (indukX !== undefined && indukY !== undefined) daftar.push(garis(`${id}-l${jalur}`, indukX, indukY + r * 0.85, px - indukX, py - indukY - r * 1.7, W.biru, 1.4, o));
    daftar.push(bulat(`${id}-n${jalur}`, px, py, r, adalahPrima(s.n) ? W.hijauMuda : W.langit, W.biru, { tebal: 1.3, ...o }));
    daftar.push(teks(`${id}-t${jalur}`, px, py + u * 0.35, String(s.n), u, W.biru, o));
    if (s.a) jalan(s.a, px - dxs, py + dy, `${jalur}a`, lv + 1, dxs * susut, px, py);
    if (s.b) jalan(s.b, px + dxs, py + dy, `${jalur}b`, lv + 1, dxs * susut, px, py);
  };
  jalan(p, x, y, "", 0, dx);
  return { semua: tingkat.flat(), tingkat };
}

/** Benda-benda simpul pohon (lingkaran, angka, dan garis ke induk) untuk jalur tertentu, misalnya simpul("g300", pohon, "a", "b"). */
export function simpul(daftar: Obj[], id: string, ...jalur: string[]): Obj[] {
  return daftar.filter((o) => jalur.some((j) => o.id === `${id}-n${j}` || o.id === `${id}-t${j}` || o.id === `${id}-l${j}`));
}

/** Semua daun (bilangan prima paling bawah) pohon, dari kiri ke kanan. */
export const daun = (p: Pohon): number[] => (p.a && p.b ? [...daun(p.a), ...daun(p.b)] : [p.n]);

/** Pohon "tangga" seperti Buku Siswa: tiap simpul punya satu anak prima di kiri dan sisanya di kanan. */
export function tangga(n: number, prima: number[]): Pohon {
  const [p, ...sisa] = prima;
  if (sisa.length === 0) return { n };
  const rest = n / p;
  return { n, a: { n: p }, b: sisa.length === 1 ? { n: rest } : tangga(rest, sisa) };
}

/* ------------------------------ Diagram Venn faktor prima (metode luar) ------------------------------ */

/** Dua lingkaran faktor prima: kiri pusat (xa, y) dan kanan pusat (xb, y), jari-jari r. Id `${id}-a` dan `${id}-b` (isi), `${id}-ka` dan `${id}-kb` (garis tepi). */
export function venn(id: string, xa: number, xb: number, y: number, r: number): Obj[] {
  return [
    bulat(`${id}-a`, xa, y, r, W.langit, undefined, { op: 0.55, tebal: 0 }),
    bulat(`${id}-b`, xb, y, r, W.jingga, undefined, { op: 0.55, tebal: 0 }),
    bulat(`${id}-ka`, xa, y, r, "none", W.biru, { tebal: 1.6 }),
    bulat(`${id}-kb`, xb, y, r, "none", W.coklat, { tebal: 1.6 }),
  ];
}

/* ------------------------------ Penulisan pangkat prima (metode luar) ------------------------------ */

export type SukuPangkat = [basis: number, eks: number];

const LEBAR = 0.56;

/**
 * Deretan pangkat prima seperti "2 pangkat 3 kali 3 pangkat 2", tengah di (x, y). Basis `${id}-b{i}`, pangkat kecil `${id}-e{i}`, tanda kali `${id}-x{i}`.
 * Pangkat 1 tidak ditulis. Teks tersembunyi `${id}-eq` menyimpan rumus utuh ("2^3 × 3^2") agar dapat dihitung ulang oleh uji.
 */
export function pangkat(id: string, x: number, y: number, suku: SukuPangkat[], u = 12, warna: string = W.biru, o: Opsi = {}): Obj[] {
  const ue = u * 0.62;
  const ukur = (s: SukuPangkat): number => String(s[0]).length * u * LEBAR + (s[1] > 1 ? String(s[1]).length * ue * LEBAR + 1 : 0);
  const lx = u * LEBAR;
  const jarak = 3;
  const total = suku.reduce((t, s) => t + ukur(s), 0) + (suku.length - 1) * (lx + 2 * jarak);
  let px = x - total / 2;
  const out: Obj[] = [];
  suku.forEach((s, i) => {
    const wb = String(s[0]).length * u * LEBAR;
    out.push(teks(`${id}-b${i}`, px + wb / 2, y, String(s[0]), u, warna, o));
    px += wb;
    if (s[1] > 1) {
      const we = String(s[1]).length * ue * LEBAR;
      out.push(teks(`${id}-e${i}`, px + 1 + we / 2, y - u * 0.55, String(s[1]), ue, warna, o));
      px += we + 1;
    }
    if (i < suku.length - 1) {
      out.push(teks(`${id}-x${i}`, px + jarak + lx / 2, y, "×", u, warna, o));
      px += lx + 2 * jarak;
    }
  });
  out.push(teks(`${id}-eq`, x, y, suku.map((s) => (s[1] > 1 ? `${s[0]}^${s[1]}` : String(s[0]))).join(" × "), 1, warna, { op: 0 }));
  return out;
}
