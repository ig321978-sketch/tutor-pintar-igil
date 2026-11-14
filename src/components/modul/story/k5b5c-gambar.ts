import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 5 Sub-Bab C (luas daerah bangun gabungan): petak satuan, bangun gabungan dari Eksplorasi 5.3
 * dan Uji Kompetensi 1 sampai 4, potongan-potongan penyusunnya, kartu, dan tabel. Berkas ini TIDAK dipakai bab lain.
 * Semua bangun ditulis dalam satuan petak (unit); `lukis` mengubahnya menjadi jalur berskala `s` piksel per satuan.
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
  oranye: "#EA580C",
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

/* ------------------------------ Bangun pada petak satuan ------------------------------ */

export type Titik = [number, number];

const f1 = (n: number): string => n.toFixed(1);

/** Luas bangun dari titik-titiknya (rumus tali sepatu), dalam satuan luas titik. */
export function luasTitik(p: Titik[]): number {
  let jumlah = 0;
  for (let i = 0; i < p.length; i += 1) {
    const q = p[(i + 1) % p.length];
    jumlah += p[i][0] * q[1] - q[0] * p[i][1];
  }
  return Math.abs(jumlah) / 2;
}

/** Bangun tertutup dari titik satuan `p`, dikali `s` piksel dan diletakkan di (ox, oy). */
export const lukis = (id: string, ox: number, oy: number, s: number, p: Titik[], warna: string, tepi: string = W.oranye, o: Opsi = {}): Obj =>
  jalur(id, ox, oy, `${p.map((t, i) => `${i === 0 ? "M" : "L"}${f1(t[0] * s)} ${f1(t[1] * s)}`).join(" ")} Z`, warna, tepi, { tebal: 2, ...o });

/** Garis petak satuan kol x baris dengan sisi s piksel, satu jalur. Id `${id}`. */
export function petak(id: string, ox: number, oy: number, kol: number, baris: number, s: number, o: Opsi = {}): Obj {
  const bagian: string[] = [];
  for (let c = 0; c <= kol; c += 1) bagian.push(`M${f1(c * s)} 0 L${f1(c * s)} ${f1(baris * s)}`);
  for (let r = 0; r <= baris; r += 1) bagian.push(`M0 ${f1(r * s)} L${f1(kol * s)} ${f1(r * s)}`);
  return jalur(id, ox, oy, bagian.join(" "), "none", W.abu, { tebal: 0.8, ...o });
}

/** Titik layar dari titik satuan. */
export const layar = (ox: number, oy: number, s: number, p: Titik): Titik => [ox + p[0] * s, oy + p[1] * s];

/** Garis putus-putus dari titik satuan p ke q. */
export const potong = (id: string, ox: number, oy: number, s: number, p: Titik, q: Titik, warna: string = W.merah, o: Opsi = {}): Obj =>
  garis(id, ox + p[0] * s, oy + p[1] * s, (q[0] - p[0]) * s, (q[1] - p[1]) * s, warna, 1.8, { putus: true, ...o });

/** Huruf penanda di dekat titik satuan p dengan geseran (dx, dy) piksel. */
export const huruf = (id: string, ox: number, oy: number, s: number, p: Titik, isi: string, dx: number, dy: number, u = 8.6, warna: string = W.biru, o: Opsi = {}): Obj =>
  teks(id, ox + p[0] * s + dx, oy + p[1] * s + dy, isi, u, warna, o);

/* ------------------------------ Bangun buku (satuan petak) ------------------------------ */

/** Eksplorasi 5.3, Buku Siswa hlm. 158: bangun ABCDE pada petak. */
export const EKS: Record<"A" | "B" | "C" | "D" | "E", Titik> = { A: [0, 2], B: [1, 4], C: [5, 2], D: [6, 0], E: [1, 0] };
export const EKS_BANGUN: Titik[] = [EKS.A, EKS.B, EKS.C, EKS.D, EKS.E];
/** Cara Yohana: layang-layang AECB (diagonal 5 dan 4) dan segitiga EDC (alas 5, tinggi 2). */
export const EKS_LAYANG: Titik[] = [[0, 2], [1, 0], [5, 2], [1, 4]];
export const EKS_SEGITIGA_ATAS: Titik[] = [[1, 0], [6, 0], [5, 2]];
/** Cara Komang: jajargenjang AEDC (alas 5, tinggi 2) dan segitiga ABC (alas 5, tinggi 2). */
export const EKS_JAJAR: Titik[] = [[0, 2], [1, 0], [6, 0], [5, 2]];
export const EKS_SEGITIGA_BAWAH: Titik[] = [[0, 2], [1, 4], [5, 2]];
/** Persegi panjang pembatas 6 x 4 dan tiga potongan pojok yang dibuang (metode luar). */
export const EKS_LUAR: Titik[] = [[0, 0], [6, 0], [6, 4], [0, 4]];
export const EKS_BUANG: Titik[][] = [[[0, 0], [1, 0], [0, 2]], [[0, 2], [1, 4], [0, 4]], [[1, 4], [6, 4], [6, 0], [5, 2]]];

/** Uji Kompetensi 1 (BS hlm. 162): layang-layang diagonal 24 dan 18 (titik potong 5 dari kiri). */
export const UJI1: Titik[] = [[0, 9], [5, 0], [24, 9], [5, 18]];
export const UJI1_LUAR: Titik[] = [[0, 0], [24, 0], [24, 18], [0, 18]];
/** Uji Kompetensi 2: jajargenjang alas 16 tinggi 8 dan segitiga alas 16 tinggi 12. */
export const UJI2: Titik[] = [[5, 0], [21, 0], [16, 8], [16, 20], [0, 8]];
export const UJI2_JAJAR: Titik[] = [[5, 0], [21, 0], [16, 8], [0, 8]];
export const UJI2_SEGITIGA: Titik[] = [[0, 8], [16, 8], [16, 20]];
/** Uji Kompetensi 3: bangun A pada petak 7 x 7 (kunci 22). Cara 1: layang-layang dan trapesium. Cara 2: segitiga dan trapesium. */
export const UJI3: Titik[] = [[2, 0], [6, 2], [6, 6], [2, 6], [2, 4], [1, 2]];
export const UJI3_LAYANG: Titik[] = [[1, 2], [2, 0], [6, 2], [2, 4]];
export const UJI3_TRAP_1: Titik[] = [[2, 4], [6, 2], [6, 6], [2, 6]];
export const UJI3_SEGITIGA: Titik[] = [[2, 0], [1, 2], [2, 4]];
export const UJI3_TRAP_2: Titik[] = [[2, 0], [6, 2], [6, 6], [2, 6]];
/** Uji Kompetensi 4: bangun B pada petak 9 x 6. Dua persegi panjang dan trapesium; luas sebenarnya 20 (kunci Cara 1), bukan 22 seperti rubrik. */
export const UJI4: Titik[] = [[1, 1], [3, 1], [3, 3], [6, 3], [6, 1], [7, 1], [8, 5], [1, 5]];
export const UJI4_PP1: Titik[] = [[1, 1], [3, 1], [3, 5], [1, 5]];
export const UJI4_PP2: Titik[] = [[3, 3], [6, 3], [6, 5], [3, 5]];
export const UJI4_TRAP: Titik[] = [[6, 1], [7, 1], [8, 5], [6, 5]];
export const UJI4_LUAR: Titik[] = [[1, 1], [8, 1], [8, 5], [1, 5]];
export const UJI4_RELUNG: Titik[] = [[3, 1], [6, 1], [6, 3], [3, 3]];
export const UJI4_SUDUT: Titik[] = [[7, 1], [8, 1], [8, 5]];

/** Petak 7 x 4 dan bangun ABCDE putih dari Eksplorasi 5.3. Id `${id}-g` (petak) dan `${id}-b` (bangun). */
export const dasarEks = (id: string, ox: number, oy: number, s: number): Obj[] => [petak(`${id}-g`, ox, oy, 7, 4, s), lukis(`${id}-b`, ox, oy, s, EKS_BANGUN, W.putih, W.oranye, { tebal: 2.2 })];

/** Huruf titik A sampai E pada bangun Eksplorasi 5.3. Id `${id}-A` dan seterusnya. */
export function hurufEks(id: string, ox: number, oy: number, s: number, warna: string = W.biru): Obj[] {
  const g: Record<string, [number, number]> = { A: [-8, 3], B: [0, 12], C: [9, 4], D: [8, 3], E: [-3, -5] };
  return (["A", "B", "C", "D", "E"] as const).map((h) => huruf(`${id}-${h}`, ox, oy, s, EKS[h], h, g[h][0], g[h][1], 9, warna, { z: 5 }));
}

/** Beberapa baris teks berurutan ke bawah, titik tengah x, baris pertama di y. Id `${id}${i}`. */
export const deret = (id: string, x: number, y: number, isi: string[], u = 8.8, warna: string = W.biru, gap = 14, o: Opsi = {}): Obj[] =>
  isi.map((t, i) => teks(`${id}${i}`, x, y + i * gap, t, u, warna, o));

/** Id deret `n` baris. */
export const idDeret = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/** Id kartu satu sampai tiga baris (kotak dan teks). */
export const idKartu = (id: string, baris: number): string[] => [`${id}-k`, ...Array.from({ length: baris }, (_, i) => `${id}-t${i}`)];
