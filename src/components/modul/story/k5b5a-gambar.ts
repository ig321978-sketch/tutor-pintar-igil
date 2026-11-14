import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 5 Sub-Bab A (konsep luas daerah): petak satuan, kisi kertas berpetak, denah rumah, dan bangun A sampai G Ayo Berlatih. Berkas ini TIDAK dipakai bab lain.
 * Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
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
export const jalur = (id: string, x: number, y: number, d: string, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "jalur", x, y, d, warna, garis: garisW, tebal: 1.4, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 8.6, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/* ------------------------------ Tabel ------------------------------ */

/** Tabel sederhana: baris pertama kepala. Id sel `${id}-s{r}{c}` (kotak) dan `${id}-t{r}{c}` (teks). */
export function tabel(id: string, x: number, y: number, kolW: number[], baris: string[][], tinggi = 16, u = 8, warnaKepala: string = W.krem, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  baris.forEach((b, r) => {
    let px = x;
    b.forEach((sel, c) => {
      out.push(kotak(`${id}-s${r}${c}`, px, y + r * tinggi, kolW[c], tinggi, r === 0 ? warnaKepala : W.putih, W.biru, { rx: 0, tebal: 1, ...o }));
      if (sel) out.push(teks(`${id}-t${r}${c}`, px + kolW[c] / 2, y + r * tinggi + tinggi / 2 + u * 0.35, sel, u, W.biru, o));
      px += kolW[c];
    });
  });
  return out;
}

/** Id semua benda (kotak dan teks) satu baris tabel. */
export const idBaris = (id: string, r: number, kolom: number): string[] => Array.from({ length: kolom }, (_, c) => [`${id}-s${r}${c}`, `${id}-t${r}${c}`]).flat();

/* ------------------------------ Kisi, petak satuan, dan bangun di kertas berpetak ------------------------------ */

export type Titik = [number, number];

const f1 = (n: number): string => n.toFixed(1);

/** Bangun datar tertutup dari titik-titik relatif terhadap (x, y). */
export const poligon = (id: string, x: number, y: number, p: Titik[], warna: string, tepi: string = W.biru, o: Opsi = {}): Obj =>
  jalur(id, x, y, `${p.map((t, i) => `${i === 0 ? "M" : "L"}${f1(t[0])} ${f1(t[1])}`).join(" ")} Z`, warna, tepi, { tebal: 1.8, ...o });

/** Satu petak satuan (persegi) pojok kiri-atas (x, y), sisi s. */
export const sel = (id: string, x: number, y: number, s: number, warna: string, o: Opsi = {}): Obj => kotak(id, x, y, s, s, warna, W.biru, { rx: 0, tebal: 0.9, ...o });

/** Garis kisi kertas berpetak: kol kali baris petak, sisi s, satu benda. */
export function kisi(id: string, x: number, y: number, kol: number, baris: number, s: number, warna: string = W.abu, o: Opsi = {}): Obj {
  const d: string[] = [];
  for (let i = 0; i <= kol; i += 1) d.push(`M${f1(i * s)} 0 L${f1(i * s)} ${f1(baris * s)}`);
  for (let j = 0; j <= baris; j += 1) d.push(`M0 ${f1(j * s)} L${f1(kol * s)} ${f1(j * s)}`);
  return jalur(id, x, y, d.join(" "), "none", warna, { tebal: 0.7, ...o });
}

/** Petak-petak terisi persegi panjang kol kali baris: id `${id}-${baris}-${kolom}`. */
export function petakPenuh(id: string, x: number, y: number, kol: number, baris: number, s: number, warna: string, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  for (let r = 0; r < baris; r += 1) for (let c = 0; c < kol; c += 1) out.push(sel(`${id}-${r}-${c}`, x + c * s, y + r * s, s, warna, o));
  return out;
}

/** Id petak persegi panjang pada baris r (0 mulai atas). */
export const idBarisPetak = (id: string, r: number, kol: number): string[] => Array.from({ length: kol }, (_, c) => `${id}-${r}-${c}`);

/** Luas poligon (rumus tali sepatu) dalam satuan petak. */
export function luasPoligon(p: Titik[]): number {
  let t = 0;
  for (let i = 0; i < p.length; i += 1) {
    const a = p[i];
    const b = p[(i + 1) % p.length];
    t += a[0] * b[1] - b[0] * a[1];
  }
  return Math.abs(t) / 2;
}

const dalam = (p: Titik[], x: number, y: number): boolean => {
  let d = false;
  for (let i = 0, j = p.length - 1; i < p.length; j = i, i += 1) {
    if (p[i][1] > y !== p[j][1] > y && x < ((p[j][0] - p[i][0]) * (y - p[i][1])) / (p[j][1] - p[i][1]) + p[i][0]) d = !d;
  }
  return d;
};

/** Petak yang seluruhnya di dalam bangun (utuh) dan yang hanya sebagian (terpotong tepi miring), dihitung dengan pencuplikan. */
export function petakUtuhSebagian(p: Titik[], kol: number, baris: number): { utuh: Titik[]; sebagian: Titik[] } {
  const utuh: Titik[] = [];
  const sebagian: Titik[] = [];
  const n = 12;
  for (let r = 0; r < baris; r += 1) {
    for (let c = 0; c < kol; c += 1) {
      let isi = 0;
      for (let a = 0; a < n; a += 1) for (let b = 0; b < n; b += 1) if (dalam(p, c + (a + 0.5) / n, r + (b + 0.5) / n)) isi += 1;
      if (isi === n * n) utuh.push([c, r]);
      else if (isi > 0) sebagian.push([c, r]);
    }
  }
  return { utuh, sebagian };
}

/** Geser dan perbesar titik-titik petak menjadi titik layar relatif: p kali s. */
export const skala = (p: Titik[], s: number): Titik[] => p.map(([x, y]) => [x * s, y * s]);

/** Bangun A sampai G Ayo Berlatih (Buku Siswa hlm. 142), titik dalam satuan petak relatif terhadap pojok kiri-atas kotak pembatasnya. */
export const BANGUN_AG: Record<string, { kol: number; baris: number; p: Titik[] }> = {
  A: { kol: 3, baris: 3, p: [[0, 0], [3, 0], [3, 3], [0, 3]] },
  B: { kol: 2, baris: 6, p: [[0, 0], [2, 0], [2, 6], [0, 6]] },
  C: { kol: 5, baris: 3, p: [[0, 0], [5, 0], [5, 3], [0, 3]] },
  D: { kol: 6, baris: 4, p: [[0, 0], [2, 0], [2, 2], [6, 2], [6, 4], [0, 4]] },
  E: { kol: 6, baris: 3, p: [[0, 0], [0, 3], [6, 3]] },
  F: { kol: 6, baris: 3, p: [[1, 0], [6, 0], [5, 3], [0, 3]] },
  G: { kol: 6, baris: 3, p: [[2, 0], [4, 0], [4, 1], [5, 2], [3, 3], [0, 2]] },
};

/** Ruangan pada denah rumah (Buku Siswa hlm. 134, 139 sampai 141): ukuran dalam meter. Ruang tamu 3 kali 5 dikurangi kamar mandi 2 kali 1 di pojok kanan-atas. */
export const RUANG = {
  tidur: { kol: 3, baris: 3 },
  dapur: { kol: 3, baris: 2 },
  mandi: { kol: 2, baris: 1 },
  tamu: { kol: 3, baris: 5 },
};

/** Petak ruang tamu: 3 kolom kali 5 baris tanpa dua petak kamar mandi di baris atas kolom kanan. */
export const PETAK_TAMU: Titik[] = Array.from({ length: 15 }, (_, i): Titik => [i % 3, Math.floor(i / 3)]).filter(([c, r]) => !(r === 0 && c >= 1));

/** Bangun dalam satuan petak digambar pada kertas berpetak: bentuk berwarna (id) lalu garis kisi (`${id}-ks`), sisi petak s. */
export function bangunDiKisi(id: string, x: number, y: number, p: Titik[], kol: number, baris: number, s: number, warna: string, o: Opsi = {}): Obj[] {
  return [poligon(id, x, y, skala(p, s), warna, W.merah, { tebal: 1.8, ...o }), kisi(`${id}-ks`, x, y, kol, baris, s, W.biru, { tebal: 0.5 })];
}

/** Bangun E setelah dipotong-tempel (Panduan Guru hlm. 197): tangga dengan baris selebar 1, 3, dan 5 petak. */
export const E_BARU: Titik[] = [[0, 0], [1, 0], [1, 1], [3, 1], [3, 2], [5, 2], [5, 3], [0, 3]];
/** Bangun F setelah segitiga kanan dipindah ke kiri (Panduan Guru hlm. 198): persegi panjang 5 kali 3. */
export const F_BARU: Titik[] = [[0, 0], [5, 0], [5, 3], [0, 3]];
/** Bangun G setelah diubah: 8 petak utuh dan dua petak setengahan di ujung runcing. */
export const G_BARU: Titik[] = [[0, 0], [3, 0], [3, 1], [4, 2], [3, 3], [1, 3], [1, 2], [0, 2]];
