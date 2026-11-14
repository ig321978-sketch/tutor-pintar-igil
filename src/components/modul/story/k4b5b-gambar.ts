import type { Obj } from "./logika-story";
import type { Bentuk, Keping, Titik } from "./k4b5b-data";

/**
 * Gambar khusus Story Kelas 4 Bab 5 Sub-Bab B (Komposisi dan Dekomposisi Bangun Datar): tujuh keping tangram, delapan keping Ayo Berpikir Kreatif,
 * perahu, paving, rumah, dan bangun-bangun Uji Kompetensi dari data vektor buku. Berkas ini TIDAK dipakai bab lain.
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
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });
export const jalur = (id: string, x: number, y: number, d: string, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "jalur", x, y, d, warna, garis: garisW, tebal: 1.2, ...o });

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

/* ------------------------------ Bangun datar: lintasan dan keping ------------------------------ */

const bulat1 = (n: number): number => Math.round(n * 10) / 10;

/** Lintasan tertutup dari titik-titik (sudah dalam piksel, relatif terhadap titik asal benda). */
export const dPoli = (pts: Titik[]): string => `M${pts.map(([a, b]) => `${bulat1(a)} ${bulat1(b)}`).join(" L")} Z`;

/** Kalikan semua angka dalam lintasan (M, L, C, Z) dengan skala. */
export const skalaD = (d: string, s: number): string => d.replace(/-?\d+(\.\d+)?/g, (m) => String(bulat1(Number(m) * s)));

/** Titik-titik dikalikan skala. */
export const skala = (pts: Titik[], s: number): Titik[] => pts.map(([a, b]) => [bulat1(a * s), bulat1(b * s)]);

/** Segi banyak: pojok titik asal (x, y), titik-titik relatif. Id dipakai langsung. */
export const poli = (id: string, x: number, y: number, pts: Titik[], warna: string, garisW: string | undefined = W.putih, o: Opsi = {}): Obj => jalur(id, x, y, dPoli(pts), warna, garisW, { tebal: 0.8, ...o });

/** Bentuk dari data buku (lintasan boleh melengkung) dikalikan skala `s`. */
export const bentuk = (id: string, x: number, y: number, b: Bentuk, s: number, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => jalur(id, x, y, skalaD(b.d, s), warna, garisW, { tebal: 1.2, ...o });

/** Keping dari data buku: titik-titik relatif, dikalikan skala `s`. */
export const keping = (id: string, x: number, y: number, k: Keping, s: number, o: Opsi = {}): Obj => poli(id, x, y, skala(k.pts, s), k.warna, W.putih, o);

/** Segi banyak beraturan: pusat (0, 0) pada hasil, jari-jari r, puncak pertama di atas. */
export const beraturan = (n: number, r: number, putar = 0): Titik[] => Array.from({ length: n }, (_, i) => [bulat1(r * Math.sin(putar + (2 * Math.PI * i) / n)), bulat1(-r * Math.cos(putar + (2 * Math.PI * i) / n))]);

/** Pusat berat sederhana (rata-rata titik) sebuah keping, untuk menaruh nomor. */
export const tengah = (pts: Titik[]): Titik => [bulat1(pts.reduce((t, p) => t + p[0], 0) / pts.length), bulat1(pts.reduce((t, p) => t + p[1], 0) / pts.length)];

/* ------------------------------ Tangram: tujuh keping (Aktivitas 6) ------------------------------ */

export type Potongan = { no: number; pts: Titik[]; warna: string; jenis: "segitiga" | "persegi" | "jajargenjang"; ukuran: "besar" | "sedang" | "kecil" | "" };

/**
 * Susunan akhir Aktivitas 6 (Buku Siswa hlm. 167-168): persegi 8 x 8 satuan. Koordinat diukur dari gambar vektor halaman lalu dibulatkan ke satuan (sisi persegi = 8).
 * 1 dan 2: segitiga siku-siku sama kaki besar; 3: jajargenjang; 4: persegi; 5 dan 6: segitiga kecil; 7: segitiga sedang.
 */
export const TANGRAM: Potongan[] = [
  { no: 1, pts: [[0, 0], [4, 4], [8, 0]], warna: "#FAA61A", jenis: "segitiga", ukuran: "besar" },
  { no: 2, pts: [[0, 0], [4, 4], [0, 8]], warna: "#40AD49", jenis: "segitiga", ukuran: "besar" },
  { no: 3, pts: [[6, 2], [6, 6], [8, 4], [8, 0]], warna: "#0066B3", jenis: "jajargenjang", ukuran: "" },
  { no: 4, pts: [[4, 8], [6, 6], [4, 4], [2, 6]], warna: "#FFF200", jenis: "persegi", ukuran: "" },
  { no: 5, pts: [[2, 6], [0, 8], [4, 8]], warna: "#036642", jenis: "segitiga", ukuran: "kecil" },
  { no: 6, pts: [[6, 2], [6, 6], [4, 4]], warna: "#57B0E3", jenis: "segitiga", ukuran: "kecil" },
  { no: 7, pts: [[4, 8], [8, 8], [8, 4]], warna: "#ED008C", jenis: "segitiga", ukuran: "sedang" },
];

/** Keping tangram nomor `no` pada titik asal (x, y) dengan 1 satuan = s piksel. Id `${id}-p{no}`. */
export const tangram = (id: string, no: number, x: number, y: number, s: number, o: Opsi = {}): Obj => {
  const p = TANGRAM.find((q) => q.no === no) as Potongan;
  return poli(`${id}-p${no}`, x, y, skala(p.pts, s), p.warna, W.putih, o);
};

/** Nomor keping: lingkaran putih kecil dan angka di pusat keping. Id `${id}-c{no}` dan `${id}-n{no}`. */
export const nomorTangram = (id: string, no: number, x: number, y: number, s: number): Obj[] => {
  const p = TANGRAM.find((q) => q.no === no) as Potongan;
  const [cx, cy] = tengah(p.pts);
  return [bulat(`${id}-c${no}`, x + cx * s, y + cy * s, 4.2, W.putih, W.abu, { tebal: 0.6 }), teks(`${id}-n${no}`, x + cx * s, y + cy * s + 2.3, String(no), 6.4, W.hitam)];
};

/* ------------------------------ Delapan keping Ayo Berpikir Kreatif (Buku Siswa hlm. 169) ------------------------------ */

export type Susun = { no: number; pts: Titik[]; warna: string; jenis: "segitiga" | "persegi" | "jajargenjang"; ukuran: "besar" | "sedang" | "kecil" | "" };

/**
 * Delapan keping Ayo Berpikir Kreatif. Keping 2, 4, 3, 8 menyusun persegi panjang 8 x 4 satuan (langkah satu dan dua); keping 1 menjadi atap segitiga di atasnya (langkah tiga).
 * Keping 5, 6, 7 tersisa; bentuknya ditaruh sendiri-sendiri (koordinat lokal).
 */
export const DELAPAN: Susun[] = [
  { no: 1, pts: [[0, 0], [8, 0], [4, -4]], warna: "#FAA61A", jenis: "segitiga", ukuran: "besar" },
  { no: 2, pts: [[0, 4], [8, 4], [4, 0]], warna: "#40AD49", jenis: "segitiga", ukuran: "besar" },
  { no: 3, pts: [[4, 0], [6, 2], [8, 0]], warna: "#036642", jenis: "segitiga", ukuran: "kecil" },
  { no: 4, pts: [[0, 0], [0, 4], [4, 0]], warna: "#D2232A", jenis: "segitiga", ukuran: "sedang" },
  { no: 5, pts: [[2, 0], [4, 2], [2, 4], [0, 2]], warna: "#FFF200", jenis: "persegi", ukuran: "" },
  { no: 6, pts: [[0, 0], [4, 0], [0, 4]], warna: "#ED008C", jenis: "segitiga", ukuran: "sedang" },
  { no: 7, pts: [[0, 2], [0, 6], [2, 4], [2, 0]], warna: "#0066B3", jenis: "jajargenjang", ukuran: "" },
  { no: 8, pts: [[6, 2], [8, 4], [8, 0]], warna: "#57B0E3", jenis: "segitiga", ukuran: "kecil" },
];

/** Keping nomor `no` dari delapan keping, titik asal (x, y), 1 satuan = s piksel. Id `${id}-q{no}`. */
export const delapan = (id: string, no: number, x: number, y: number, s: number, o: Opsi = {}): Obj => {
  const p = DELAPAN.find((q) => q.no === no) as Susun;
  return poli(`${id}-q${no}`, x, y, skala(p.pts, s), p.warna, W.putih, o);
};

/* ------------------------------ Dua segitiga besar tersusun dengan beberapa cara ------------------------------ */

/** Segitiga siku-siku sama kaki dengan sisi miring 8 satuan (sama dengan keping 1 dan 2 tangram). */
export const SEGITIGA_A: Titik[] = [[0, 0], [8, 0], [4, 4]];
export const SEGITIGA_B: Titik[] = [[0, 0], [8, 0], [4, -4]];

/** Tiga cara menyusun dua segitiga yang sama: persegi, segitiga besar, jajargenjang. Tiap cara berisi dua keping (koordinat satuan, 1 satuan = s piksel). */
export const CARA_DUA: { nama: string; keping: Titik[][] }[] = [
  { nama: "persegi", keping: [SEGITIGA_A, SEGITIGA_B] },
  { nama: "segitiga", keping: [SEGITIGA_A, [[0, 0], [4, 4], [0, 8]]] },
  { nama: "jajargenjang", keping: [SEGITIGA_A, [[8, 0], [12, 4], [4, 4]]] },
];

/* ------------------------------ Jajargenjang dipotong lalu disusun ulang ------------------------------ */

/** Jajargenjang (2,0) (8,0) (6,4) (0,4) dipotong tegak di x = 2: segitiga kiri dan trapesium kanan. Segitiga digeser 6 satuan ke kanan menjadi persegi panjang 6 x 4. */
export const POTONG_SEGITIGA: Titik[] = [[0, 4], [2, 0], [2, 4]];
export const POTONG_TRAPESIUM: Titik[] = [[2, 0], [8, 0], [6, 4], [2, 4]];

/* ------------------------------ Rumah kecil: persegi dan segitiga ------------------------------ */

/** Rumah dari satu persegi 4 x 4 dan satu segitiga siku-siku sama kaki beralas 4: lima sisi. */
export const RUMAH_PERSEGI: Titik[] = [[0, 4], [4, 4], [4, 8], [0, 8]];
export const RUMAH_ATAP: Titik[] = [[0, 4], [4, 4], [2, 2]];

/* ------------------------------ Gambar kecil pembantu ------------------------------ */

/** Tanda centang atau silang kecil. */
export const tanda = (id: string, x: number, y: number, benar: boolean, u = 12): Obj => teks(id, x, y, benar ? "✔" : "✖", u, benar ? W.hijau : W.merah);

/** Rumah adat beratap Kampung (segitiga di puncak, trapesium atap bawah, dinding persegi panjang, pintu); kotak gambar 40 x 52 satuan. Id `${id}-ap`, `-ab`, `-dn`, `-pt`. */
export const rumahAdat = (id: string, x: number, y: number, s: number, o: Opsi = {}): Obj[] => [
  poli(`${id}-ap`, x, y, skala([[20, 0], [32, 20], [8, 20]] as Titik[], s), "#E0A04A", W.coklat, { tebal: 0.8, ...o }),
  poli(`${id}-ab`, x, y, skala([[8, 20], [32, 20], [40, 30], [0, 30]] as Titik[], s), "#B5532D", W.coklat, { tebal: 0.8, ...o }),
  poli(`${id}-dn`, x, y, skala([[4, 30], [36, 30], [36, 52], [4, 52]] as Titik[], s), "#F5DF93", W.coklat, { tebal: 0.8, ...o }),
  poli(`${id}-pt`, x, y, skala([[15, 34], [25, 34], [25, 52], [15, 52]] as Titik[], s), "#DB8A3F", W.coklat, { tebal: 0.8, ...o }),
];

/* ------------------------------ Sudut dalam segi banyak ------------------------------ */

/** Besar sudut dalam (derajat, 0 sampai 360) tiap titik sudut segi banyak sederhana. Sudut lebih dari 180 menjorok ke dalam. */
export const sudutDalam = (pts: Titik[]): number[] => {
  const n = pts.length;
  const luas = pts.reduce((t, p, i) => t + (p[0] * pts[(i + 1) % n][1] - pts[(i + 1) % n][0] * p[1]), 0);
  return pts.map((p, i) => {
    const a = pts[(i + n - 1) % n];
    const c = pts[(i + 1) % n];
    const v1: Titik = [a[0] - p[0], a[1] - p[1]];
    const v2: Titik = [c[0] - p[0], c[1] - p[1]];
    const sudut = Math.abs((Math.atan2(v1[0] * v2[1] - v1[1] * v2[0], v1[0] * v2[0] + v1[1] * v2[1]) * 180) / Math.PI);
    const silang = (p[0] - a[0]) * (c[1] - p[1]) - (p[1] - a[1]) * (c[0] - p[0]);
    return Math.round((silang * luas < 0 ? 360 - sudut : sudut) * 10) / 10;
  });
};

/** Golongan sudut: lancip kurang dari 90, siku-siku 90 (galat 1), tumpul 90 sampai 180, menjorok lebih dari 180. */
export const golonganSudut = (derajat: number): "lancip" | "siku" | "tumpul" | "menjorok" => (derajat > 180 ? "menjorok" : Math.abs(derajat - 90) <= 1 ? "siku" : derajat < 90 ? "lancip" : "tumpul");
