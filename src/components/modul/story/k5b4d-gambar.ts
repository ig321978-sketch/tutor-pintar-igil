import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 4 Sub-Bab D (keliling segi banyak): segi lima, segi enam, dan segi delapan beraturan
 * dengan tanda sisi sama, label panjang sisi, tabel banyak sisi dan keliling, serta diagram batang keliling.
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
  ungMuda: "#EDE9FE",
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

/** Tanda centang atau silang di (x, y) (garis dasar teks). */
export const tanda = (id: string, x: number, y: number, ya: boolean, u = 12): Obj => teks(id, x, y, ya ? "✓" : "✗", u, ya ? W.hijau : W.merah);

/** Satu baris rata kiri berupa kotak berisi teks. Pojok kiri-atas (x, y). Id `${id}-k` dan `${id}-t`. */
export function baris(id: string, x: number, y: number, w: number, isi: string, warna: string = W.putih, u = 8, h = 18, o: Opsi = {}): Obj[] {
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 5, tebal: 1.2, ...o }), teks(`${id}-t`, x + 6, y + h / 2 + u * 0.35, isi, u, W.biru, { anchor: "start", ...o })];
}

/** Satu baris tabel: sel-sel dengan lebar `lebar`, pojok kiri-atas (x, y), tinggi h. Id `${id}-k{i}` dan `${id}-t{i}`. */
export function barisTabel(id: string, x: number, y: number, lebar: number[], isi: string[], warna: string, u = 7.6, h = 17, warnaTeks: string = W.biru, o: Opsi = {}): Obj[] {
  const hasil: Obj[] = [];
  let kiri = x;
  isi.forEach((s, i) => {
    hasil.push(kotak(`${id}-k${i}`, kiri, y, lebar[i], h, warna, W.biru, { rx: 2, tebal: 1, ...o }));
    hasil.push(teks(`${id}-t${i}`, kiri + lebar[i] / 2, y + h / 2 + u * 0.35, s, u, warnaTeks, o));
    kiri += lebar[i];
  });
  return hasil;
}

/** Batang diagram: alas di garis dasar yDasar, tinggi `tinggi` piksel, lebar w. Id `${id}` (batang) dan `${id}-n` (nilai di atas). */
export function batang(id: string, x: number, yDasar: number, w: number, tinggi: number, warna: string, nilai: string, o: Opsi = {}): Obj[] {
  return [kotak(id, x, yDasar - tinggi, w, tinggi, warna, W.biru, { rx: 1, tebal: 1.2, ...o }), teks(`${id}-n`, x + w / 2, yDasar - tinggi - 3, nilai, 7.8, W.biru, o)];
}

/* ------------------------------ Segi banyak beraturan ------------------------------ */

const bulatkan = (n: number): number => Math.round(n * 100) / 100;

/** Titik sudut segi-n beraturan berjari-jari R, pusat di (0, 0), sudut pertama di atas. */
export function titikBeraturan(n: number, R: number): [number, number][] {
  const t: [number, number][] = [];
  for (let i = 0; i < n; i += 1) {
    const sudut = -Math.PI / 2 + (2 * Math.PI * i) / n;
    t.push([bulatkan(R * Math.cos(sudut)), bulatkan(R * Math.sin(sudut))]);
  }
  return t;
}

/** Lintasan tertutup dari daftar titik relatif. */
export const lintasan = (titik: [number, number][]): string => `${titik.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ")} Z`;

/** Segi-n beraturan: benda jalur berpusat di (cx, cy). */
export const segiBeraturan = (id: string, cx: number, cy: number, n: number, R: number, warna: string = W.muda, garisW: string = W.biru, o: Opsi = {}): Obj =>
  jalur(id, cx, cy, lintasan(titikBeraturan(n, R)), warna, garisW, { tebal: 2.2, ...o });

/** Panjang sisi segi-n beraturan berjari-jari R. */
export const sisiBeraturan = (n: number, R: number): number => 2 * R * Math.sin(Math.PI / n);

/** Tanda garis kecil di tengah tiap sisi segi-n beraturan (tanda sisi sama panjang), satu benda jalur. */
export function tandaSisi(id: string, cx: number, cy: number, n: number, R: number, o: Opsi = {}): Obj {
  const t = titikBeraturan(n, R);
  let d = "";
  for (let i = 0; i < n; i += 1) {
    const [x1, y1] = t[i];
    const [x2, y2] = t[(i + 1) % n];
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const p = Math.hypot(dx, dy);
    const nx = (-dy / p) * 3.5;
    const ny = (dx / p) * 3.5;
    d += `M${bulatkan(mx - nx)} ${bulatkan(my - ny)} L${bulatkan(mx + nx)} ${bulatkan(my + ny)} `;
  }
  return jalur(id, cx, cy, d.trim(), "none", W.merah, { tebal: 1.8, ...o });
}

/** Label di luar tiap sisi segi-n beraturan: teks `isi` di titik tengah sisi digeser keluar sejauh `jarak`. Id `${id}0`, `${id}1`, ... */
export function labelSisi(id: string, cx: number, cy: number, n: number, R: number, isi: string | string[], jarak = 11, u = 7.4, warna: string = W.biru): Obj[] {
  const t = titikBeraturan(n, R);
  const hasil: Obj[] = [];
  for (let i = 0; i < n; i += 1) {
    const [x1, y1] = t[i];
    const [x2, y2] = t[(i + 1) % n];
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const r = Math.hypot(mx, my);
    hasil.push(teks(`${id}${i}`, bulatkan(cx + mx + (mx / r) * jarak), bulatkan(cy + my + (my / r) * jarak + u * 0.35), Array.isArray(isi) ? isi[i] : isi, u, warna));
  }
  return hasil;
}

/** Bentuk bebas dari titik relatif (bukan beraturan), berpusat di (cx, cy). */
export const bentukBebas = (id: string, cx: number, cy: number, titik: [number, number][], warna: string = W.krem, garisW: string = W.biru, o: Opsi = {}): Obj => jalur(id, cx, cy, lintasan(titik), warna, garisW, { tebal: 2.2, ...o });

/** Banyak titik sudut pada lintasan tertutup sederhana (dipakai uji). */
export const titikDariLintasan = (d: string): [number, number][] => [...d.matchAll(/[ML](-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g)].map((m) => [Number(m[1]), Number(m[2])]);

/** Keliling segi-n beraturan bersisi s. */
export const kelilingBeraturan = (n: number, s: number): number => n * s;

/** Sisi bangun ukuran buku: segi lima dan segi enam beraturan bersisi 3 cm (Buku Panduan Guru hlm. 156-157). */
export const SISI_BUKU = 3;
/** Banyak sisi pada tabel Ayo Merangkum (Buku Siswa hlm. 124, kunci Buku Panduan Guru hlm. 158). */
export const TABEL_SISI = [4, 5, 6, 8];
