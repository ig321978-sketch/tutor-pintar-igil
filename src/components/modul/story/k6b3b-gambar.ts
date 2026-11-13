import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 6 Bab 3 Sub-Bab B (Visualisasi Spasial): kubus isometrik, tampak depan, kanan, atas,
 * matriks tinggi, dan dadu. Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj).
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
  langit: "#DBEAFE",
  krem: "#FFF7CC",
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const jalur = (id: string, x: number, y: number, d: string, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "jalur", x, y, d, warna, garis: garisW, tebal: 1.5, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Kartu berjudul: kotak berisi satu atau dua baris teks, titik kiri atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 8.6, o: Opsi = {}): Obj[] {
  const tinggi = baris.length * (u + 3);
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 9, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, y + h / 2 - tinggi / 2 + (i + 1) * (u + 3) - 2, b, u, W.biru, o))];
}

/* ------------------------------ Kubus isometrik ------------------------------ */

/** Warna kubus: b biru, m merah, k kuning, h hijau, o oranye, p putih. */
export const WARNA_KUBUS: Record<string, string> = { b: "#4DA3E6", m: "#F25C4B", k: "#FFD60A", h: "#84BC3F", o: "#FB923C", p: "#F1F5F9" };
export const NAMA_WARNA: Record<string, string> = { b: "biru", m: "merah", k: "kuning", h: "hijau", o: "oranye", p: "putih" };

function campur(hex: string, ke: number, t: number): string {
  const n = parseInt(hex.slice(1), 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => Math.round(v + (ke - v) * t));
  return `#${c.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}
const terang = (hex: string) => campur(hex, 255, 0.35);
const gelap = (hex: string) => campur(hex, 0, 0.18);

/**
 * Satu kubus di sel (u, v, z). Arah gambar: u ke kanan-bawah (lebar, dari kiri ke kanan pada tampak depan),
 * v ke kanan-atas (menjauh dari depan), z ke atas. Sisi kiri gambar adalah sisi depan, sisi kanan gambar adalah sisi kanan.
 * (ox, oy) adalah titik dasar sudut depan kiri sel (0, 0, 0).
 */
export type Kubus = { u: number; v: number; z: number; w: string };
export const urutKubus = (c: Kubus) => 100 + (c.u - c.v + c.z) * 3;

export function titikKubus(ox: number, oy: number, s: number, c: { u: number; v: number; z: number }): { x: number; y: number; a: number; h: number } {
  const a = s * 0.866;
  const h = s * 0.5;
  return { x: ox + (c.u + c.v) * a, y: oy + (c.u - c.v) * h - c.z * s, a, h };
}

export function kubusIso(id: string, ox: number, oy: number, s: number, c: Kubus, o: Opsi = {}): Obj[] {
  const { x, y, a, h } = titikKubus(ox, oy, s, c);
  const z = urutKubus(c);
  const f = (v: number) => v.toFixed(1);
  const warna = WARNA_KUBUS[c.w] ?? c.w;
  const gambar = (suffix: string, d: string, isi: string) => jalur(`${id}${suffix}`, x, y, d, isi, "#1F2937", { tebal: 1, z, ...o });
  return [
    gambar("-k", `M0 0 L${f(a)} ${f(h)} L${f(a)} ${f(h - s)} L0 ${f(-s)} Z`, warna),
    gambar("-r", `M${f(a)} ${f(h)} L${f(2 * a)} 0 L${f(2 * a)} ${f(-s)} L${f(a)} ${f(h - s)} Z`, gelap(warna)),
    gambar("-a", `M0 ${f(-s)} L${f(a)} ${f(h - s)} L${f(2 * a)} ${f(-s)} L${f(a)} ${f(-h - s)} Z`, terang(warna)),
  ];
}

/** Satu kubus dengan warna berbeda tiap sisi tampak (atas, kiri, kanan), mis. kubus berwarna-warni pada Latihan 3.2. (ox, oy) seperti pada kubusIso. */
export function kubusMuka(p: string, ox: number, oy: number, s: number, muka: { atas: string; kiri: string; kanan: string }, o: Opsi = {}): Obj[] {
  const a = s * 0.866;
  const h = s * 0.5;
  const f = (v: number) => v.toFixed(1);
  const w = (c: string) => WARNA_KUBUS[c] ?? c;
  return [
    jalur(`${p}-k`, ox, oy, `M0 0 L${f(a)} ${f(h)} L${f(a)} ${f(h - s)} L0 ${f(-s)} Z`, w(muka.kiri), "#1F2937", { tebal: 1, ...o }),
    jalur(`${p}-r`, ox, oy, `M${f(a)} ${f(h)} L${f(2 * a)} 0 L${f(2 * a)} ${f(-s)} L${f(a)} ${f(h - s)} Z`, w(muka.kanan), "#1F2937", { tebal: 1, ...o }),
    jalur(`${p}-a`, ox, oy, `M0 ${f(-s)} L${f(a)} ${f(h - s)} L${f(2 * a)} ${f(-s)} L${f(a)} ${f(-h - s)} Z`, w(muka.atas), "#1F2937", { tebal: 1, ...o }),
  ];
}

export type SusunanIso = { objs: Obj[]; ids: (i: number) => string[]; semua: string[] };

/** Susunan kubus: kubus ke-i punya id `${p}${i}-k`, `-r`, `-a`. */
export function susunanIso(p: string, ox: number, oy: number, s: number, daftar: Kubus[], o: Opsi = {}): SusunanIso {
  const objs = daftar.flatMap((c, i) => kubusIso(`${p}${i}`, ox, oy, s, c, o));
  const ids = (i: number) => [`${p}${i}-k`, `${p}${i}-r`, `${p}${i}-a`];
  return { objs, ids, semua: objs.map((b) => b.id) };
}

/* ------------------------------ Contoh susunan dalam buku ------------------------------ */

/** Gambar Anike (Eksplorasi 3.2): deretan tiga kubus biru, merah, kuning; kubus hijau di atas kubus merah. */
export const ANIKE: Kubus[] = [
  { u: 0, v: 0, z: 0, w: "b" },
  { u: 1, v: 0, z: 0, w: "m" },
  { u: 2, v: 0, z: 0, w: "k" },
  { u: 1, v: 0, z: 1, w: "h" },
];

/** Latihan 3.2 nomor 5: empat kubus; kubus biru di atas kubus kuning di depan kiri, merah di depan kanan, hijau di belakang kiri. */
export const LATIHAN5: Kubus[] = [
  { u: 0, v: 0, z: 0, w: "k" },
  { u: 0, v: 0, z: 1, w: "b" },
  { u: 1, v: 0, z: 0, w: "m" },
  { u: 0, v: 1, z: 0, w: "h" },
];

/** Dua susunan yang tampak sama dari depan (dua kubus berdampingan): tanpa dan dengan kubus ketiga tersembunyi di belakang. */
export const CONTOH_A: Kubus[] = [
  { u: 0, v: 0, z: 0, w: "b" },
  { u: 1, v: 0, z: 0, w: "m" },
];
export const CONTOH_B: Kubus[] = [...CONTOH_A, { u: 0, v: 1, z: 0, w: "h" }];
/** Dua susunan yang tampak sama dari depan (satu kotak): satu kubus, dan dua kubus berurutan ke belakang. */
export const CONTOH_C: Kubus[] = [{ u: 0, v: 0, z: 0, w: "o" }];
export const CONTOH_D: Kubus[] = [...CONTOH_C, { u: 0, v: 1, z: 0, w: "h" }];

/* ------------------------------ Tampak dua dimensi ------------------------------ */

/**
 * Tampak dua dimensi: `baris` dari atas ke bawah, tiap karakter satu sel (kunci warna kubus, atau titik untuk sel kosong).
 * Sel (r, c) punya id `${p}-${r}${c}`. Bingkai putus-putus menandai ukuran lembar gambar.
 */
export function tampak(p: string, x: number, y: number, c: number, baris: string[], o: Opsi = {}): { objs: Obj[]; ids: string[] } {
  const objs: Obj[] = [];
  const ids: string[] = [];
  baris.forEach((b, r) => {
    [...b].forEach((ch, kol) => {
      if (ch === ".") return;
      const id = `${p}-${r}${kol}`;
      objs.push(kotak(id, x + kol * c, y + r * c, c, c, WARNA_KUBUS[ch] ?? ch, "#1F2937", { rx: 1.5, tebal: 1.1, ...o }));
      ids.push(id);
    });
  });
  return { objs, ids };
}

/** Kisi kosong untuk lembar gambar (tampak belum diwarnai). */
export function kisi(p: string, x: number, y: number, c: number, kolom: number, barisN: number, o: Opsi = {}): Obj[] {
  const sel: Obj[] = [];
  for (let r = 0; r < barisN; r += 1) for (let kk = 0; kk < kolom; kk += 1) sel.push(kotak(`${p}-${r}${kk}`, x + kk * c, y + r * c, c, c, W.putih, "#94A3B8", { rx: 1, tebal: 1, ...o }));
  return sel;
}

/** Matriks tinggi: angka di tiap sel; sel (r, kk) punya id `${p}-${r}${kk}` dan angka `${p}-n${r}${kk}`. */
export function matriks(p: string, x: number, y: number, c: number, m: number[][], o: Opsi = {}): { objs: Obj[]; ids: string[] } {
  const objs: Obj[] = [];
  const ids: string[] = [];
  m.forEach((b, r) =>
    b.forEach((n, kk) => {
      const id = `${p}-${r}${kk}`;
      objs.push(kotak(id, x + kk * c, y + r * c, c, c, n > 0 ? "#FEF3C7" : "#F1F5F9", W.biru, { rx: 2, tebal: 1.2, ...o }), teks(`${p}-n${r}${kk}`, x + kk * c + c / 2, y + r * c + c * 0.68, String(n), c * 0.52, n > 0 ? W.biru : "#94A3B8", o));
      ids.push(id);
    }),
  );
  return { objs, ids };
}

/* ------------------------------ Dadu isometrik ------------------------------ */

export type IsiMuka = number | "segitiga" | "persegi" | "lingkaran";
const POLA_MATA: Record<number, [number, number][]> = {
  1: [[1, 1]],
  2: [[0, 0], [2, 2]],
  3: [[0, 0], [1, 1], [2, 2]],
  4: [[0, 0], [2, 0], [0, 2], [2, 2]],
  5: [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]],
  6: [[0, 0], [2, 0], [0, 1], [2, 1], [0, 2], [2, 2]],
};

/** Dadu dengan tiga sisi tampak: atas, kiri, dan kanan. Titik tengah horizontal (cx) dan titik dasar sudut depan (cy). */
export function daduIso(p: string, cx: number, cy: number, s: number, muka: { atas: IsiMuka; kiri: IsiMuka; kanan: IsiMuka }, o: Opsi = {}): Obj[] {
  const a = s * 0.866;
  const h = s * 0.5;
  const x0 = cx - a;
  const f = (v: number) => v.toFixed(1);
  const bangun = jalur(`${p}-k`, x0, cy, `M0 0 L${f(a)} ${f(h)} L${f(a)} ${f(h - s)} L0 ${f(-s)} Z`, "#E2E8F0", "#1F2937", { tebal: 1.2, ...o });
  const kanan = jalur(`${p}-r`, x0, cy, `M${f(a)} ${f(h)} L${f(2 * a)} 0 L${f(2 * a)} ${f(-s)} L${f(a)} ${f(h - s)} Z`, "#CBD5E1", "#1F2937", { tebal: 1.2, ...o });
  const atas = jalur(`${p}-a`, x0, cy, `M0 ${f(-s)} L${f(a)} ${f(h - s)} L${f(2 * a)} ${f(-s)} L${f(a)} ${f(-h - s)} Z`, "#FFFFFF", "#1F2937", { tebal: 1.2, ...o });
  // titik pada muka: (fa, fb) dalam [0, 1] diubah menjadi koordinat layar
  const petaKiri = (fa: number, fb: number): [number, number] => [x0 + fa * a, cy + fa * h - fb * s];
  const petaKanan = (fa: number, fb: number): [number, number] => [x0 + a + fa * a, cy + h - fa * h - fb * s];
  const petaAtas = (fa: number, fb: number): [number, number] => [x0 + fa * a + fb * a, cy - s + fa * h - fb * h];
  const isi = (nama: string, peta: (fa: number, fb: number) => [number, number], v: IsiMuka): Obj[] => {
    if (typeof v === "number") {
      if (v === 0) return [];
      return POLA_MATA[v].map(([i, j], n) => {
        const [px, py] = peta(0.2 + 0.3 * i, 0.2 + 0.3 * j);
        return bulat(`${p}-${nama}${n}`, px, py, s * 0.07, W.hitam, "none", o);
      });
    }
    if (v === "lingkaran") {
      const [px, py] = peta(0.5, 0.5);
      return [bulat(`${p}-${nama}s`, px, py, s * 0.17, W.hitam, "none", o)];
    }
    const poly = v === "persegi" ? [[0.28, 0.28], [0.72, 0.28], [0.72, 0.72], [0.28, 0.72]] : [[0.5, 0.78], [0.22, 0.26], [0.78, 0.26]];
    const [bx, by] = peta(0, 0);
    const d = poly.map(([fa, fb], n) => {
      const [px, py] = peta(fa, fb);
      return `${n === 0 ? "M" : "L"}${f(px - bx)} ${f(py - by)}`;
    });
    return [jalur(`${p}-${nama}s`, bx, by, `${d.join(" ")} Z`, W.hitam, "none", o)];
  };
  return [bangun, kanan, atas, ...isi("ki", petaKiri, muka.kiri), ...isi("ka", petaKanan, muka.kanan), ...isi("at", petaAtas, muka.atas)];
}

/** Muka dadu datar (untuk tampak dua dimensi): kotak putih dengan mata atau lambang di tengah. Titik kiri atas (x, y), sisi s. */
export function mukaDadu(p: string, x: number, y: number, s: number, isi: IsiMuka, o: Opsi = {}): Obj[] {
  const dasar = kotak(`${p}-k`, x, y, s, s, W.putih, "#1F2937", { rx: s * 0.12, tebal: 1.3, ...o });
  if (typeof isi === "number") {
    if (isi === 0) return [dasar];
    return [dasar, ...POLA_MATA[isi].map(([i, j], n) => bulat(`${p}-m${n}`, x + (0.2 + 0.3 * i) * s, y + (0.2 + 0.3 * j) * s, s * 0.07, W.hitam, "none", o))];
  }
  if (isi === "lingkaran") return [dasar, bulat(`${p}-s`, x + s / 2, y + s / 2, s * 0.2, W.hitam, "none", o)];
  if (isi === "persegi") return [dasar, kotak(`${p}-s`, x + s * 0.28, y + s * 0.28, s * 0.44, s * 0.44, W.hitam, "none", { rx: 0, ...o })];
  return [dasar, jalur(`${p}-s`, x + s * 0.5, y + s * 0.2, `M0 0 L${(s * 0.28).toFixed(1)} ${(s * 0.56).toFixed(1)} L${(-s * 0.28).toFixed(1)} ${(s * 0.56).toFixed(1)} Z`, W.hitam, "none", o)];
}
