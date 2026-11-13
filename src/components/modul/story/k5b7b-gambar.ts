import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 7 Sub-Bab B (membandingkan ciri-ciri segi empat): trapesium, jajargenjang, persegi panjang,
 * belah ketupat, persegi, layang-layang, tanda sejajar, tanda sama panjang, tanda sudut, dan garis diagonal.
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
export type Pt = [number, number];

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const jalur = (id: string, x: number, y: number, d: string, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "jalur", x, y, d, warna, garis: garisW, tebal: 1.2, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Id semua benda dalam daftar (untuk dihapus). */
export const idDari = (...daftar: Array<Obj | Obj[]>): string[] => daftar.flat().map((o) => o.id);

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

/* ------------------------------ Bentuk bangun (satuan relatif, sumbu y ke bawah) ------------------------------ */

export type JenisBangun = "sembarang" | "siku" | "samaKaki" | "jajar" | "persegiPanjang" | "belahKetupat" | "persegi" | "layang";

/** Titik sudut tiap bangun mengikuti urutan huruf pada Buku Siswa. Dipakai pula untuk uji geometri mandiri. */
export const BENTUK: Record<JenisBangun, { pts: Pt[]; huruf: string[] }> = {
  sembarang: { pts: [[-1.6, 0.9], [1.7, 0.9], [0.9, -0.9], [-0.1, -0.9]], huruf: ["A", "B", "C", "D"] },
  siku: { pts: [[-1.6, 0.9], [1.6, 0.9], [0.5, -0.9], [-1.6, -0.9]], huruf: ["A", "B", "C", "D"] },
  samaKaki: { pts: [[-1.6, 0.9], [1.6, 0.9], [0.8, -0.9], [-0.8, -0.9]], huruf: ["P", "Q", "R", "S"] },
  jajar: { pts: [[-1.5, 0.9], [0.9, 0.9], [1.5, -0.9], [-0.9, -0.9]], huruf: ["A", "B", "C", "D"] },
  persegiPanjang: { pts: [[-1.5, 0.9], [1.5, 0.9], [1.5, -0.9], [-1.5, -0.9]], huruf: ["A", "B", "C", "D"] },
  belahKetupat: { pts: [[-1.6, 0], [0, -1], [1.6, 0], [0, 1]], huruf: ["A", "C", "B", "D"] },
  persegi: { pts: [[-1.1, 1.1], [1.1, 1.1], [1.1, -1.1], [-1.1, -1.1]], huruf: ["A", "B", "C", "D"] },
  layang: { pts: [[-1.1, -0.4], [0, -1.6], [1.1, -0.4], [0, 1.3]], huruf: ["A", "D", "C", "B"] },
};

/** Sembilan bangun Eksplorasi 7.2A (A sampai I); I adalah lingkaran. */
export const BENTUK_72A: Record<string, Pt[]> = {
  A: [[-1.3, -0.9], [1.2, -1.0], [0.9, 1.0], [-1.0, 0.7]],
  B: [[-1.6, 0.9], [1.6, 0.9], [0.8, -0.9], [-0.8, -0.9]],
  C: [[-1.5, -0.9], [1.5, 0.9], [-1.0, 0.9]],
  D: [[-1.5, -0.4], [0, 0.4], [1.5, -0.5], [1.0, 0.9], [-1.0, 0.9]],
  E: Array.from({ length: 10 }, (_, i) => {
    const sudut = (-90 + i * 36) * (Math.PI / 180);
    const r = i % 2 === 0 ? 1.5 : 0.65;
    return [Math.cos(sudut) * r, Math.sin(sudut) * r] as Pt;
  }),
  F: [[0, -1.5], [1.0, -0.2], [0, 1.4], [-1.0, -0.2]],
  G: [[-0.3, -1.2], [1.2, -0.3], [1.1, 1.0], [-0.7, 1.1], [-1.3, 0]],
  H: [[-0.4, -0.9], [1.4, -0.1], [-0.3, 0.2], [-1.1, 1.0]],
};
/** Bangun pada 7.2A yang merupakan segi empat. */
export const SEGI_EMPAT_72A = ["A", "B", "F", "H"];

const indeks = (b: JenisBangun, h: string): number => BENTUK[b].huruf.indexOf(h);

/** Titik sudut mutlak sebuah bangun yang berpusat di (cx, cy) dengan skala s. */
export function titik(b: JenisBangun, h: string, cx: number, cy: number, s: number): Pt {
  const p = BENTUK[b].pts[indeks(b, h)];
  return [cx + p[0] * s, cy + p[1] * s];
}

const pusat = (pts: Pt[]): Pt => [pts.reduce((t, p) => t + p[0], 0) / pts.length, pts.reduce((t, p) => t + p[1], 0) / pts.length];

/** Poligon sembarang berpusat di (cx, cy). */
export function poli(id: string, cx: number, cy: number, pts: Pt[], s: number, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj {
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${(p[0] * s).toFixed(1)} ${(p[1] * s).toFixed(1)}`).join(" ") + " Z";
  return jalur(id, cx, cy, d, warna, garisW, { tebal: 1.8, ...o });
}

/** Satu bangun segi empat berpusat di (cx, cy). */
export const bangun = (id: string, b: JenisBangun, cx: number, cy: number, s: number, warna: string = W.putih, o: Opsi = {}): Obj => poli(id, cx, cy, BENTUK[b].pts, s, warna, W.biru, o);

/** Huruf sudut di luar bangun. */
export function huruf(id: string, b: JenisBangun, cx: number, cy: number, s: number, jarak = 8, u = 8, warna: string = W.merah, o: Opsi = {}): Obj[] {
  const { pts, huruf: hs } = BENTUK[b];
  const c = pusat(pts);
  return pts.map((p, i) => {
    const dx = p[0] - c[0];
    const dy = p[1] - c[1];
    const n = Math.hypot(dx, dy) || 1;
    return teks(`${id}${hs[i]}`, cx + p[0] * s + (dx / n) * jarak, cy + p[1] * s + (dy / n) * jarak + u * 0.35, hs[i], u, warna, o);
  });
}

/** Garis antara dua titik sudut bangun (sisi atau diagonal). */
export function antara(id: string, b: JenisBangun, cx: number, cy: number, s: number, h1: string, h2: string, warna: string = W.merah, tebal = 1.6, o: Opsi = {}): Obj {
  const a = titik(b, h1, cx, cy, s);
  const z = titik(b, h2, cx, cy, s);
  return garis(id, a[0], a[1], z[0] - a[0], z[1] - a[1], warna, tebal, o);
}

/** Tanda sejajar (dua panah kecil) di tengah sisi h1-h2. */
export function sejajar(id: string, b: JenisBangun, cx: number, cy: number, s: number, h1: string, h2: string, warna: string = W.hijau, o: Opsi = {}): Obj {
  const a = titik(b, h1, cx, cy, s);
  const z = titik(b, h2, cx, cy, s);
  const sudut = (Math.atan2(z[1] - a[1], z[0] - a[0]) * 180) / Math.PI;
  return jalur(id, (a[0] + z[0]) / 2, (a[1] + z[1]) / 2, "M-3 -3 L0 0 L-3 3 M1 -3 L4 0 L1 3", "none", warna, { tebal: 1.5, rot: sudut, ...o });
}

/** Tanda sama panjang (n goresan) di tengah sisi h1-h2. */
export function sama(id: string, b: JenisBangun, cx: number, cy: number, s: number, h1: string, h2: string, n = 1, warna: string = W.merah, o: Opsi = {}): Obj {
  const a = titik(b, h1, cx, cy, s);
  const z = titik(b, h2, cx, cy, s);
  const sudut = (Math.atan2(z[1] - a[1], z[0] - a[0]) * 180) / Math.PI;
  const d = Array.from({ length: n }, (_, i) => `M${(i - (n - 1) / 2) * 3} -4 L${(i - (n - 1) / 2) * 3} 4`).join(" ");
  return jalur(id, (a[0] + z[0]) / 2, (a[1] + z[1]) / 2, d, "none", warna, { tebal: 1.6, rot: sudut, ...o });
}

/** Tanda sudut siku-siku di sudut h (kotak kecil menempel pada kedua sisi). */
export function siku(id: string, b: JenisBangun, cx: number, cy: number, s: number, h: string, ukuran = 5, warna: string = W.merah, o: Opsi = {}): Obj {
  const { pts } = BENTUK[b];
  const i = indeks(b, h);
  const p = pts[i];
  const n = pts.length;
  const arah = (q: Pt): Pt => {
    const dx = q[0] - p[0];
    const dy = q[1] - p[1];
    const l = Math.hypot(dx, dy) || 1;
    return [(dx / l) * ukuran, (dy / l) * ukuran];
  };
  const u1 = arah(pts[(i + 1) % n]);
  const u2 = arah(pts[(i + n - 1) % n]);
  const d = `M${u1[0].toFixed(1)} ${u1[1].toFixed(1)} L${(u1[0] + u2[0]).toFixed(1)} ${(u1[1] + u2[1]).toFixed(1)} L${u2[0].toFixed(1)} ${u2[1].toFixed(1)}`;
  return jalur(id, cx + p[0] * s, cy + p[1] * s, d, "none", warna, { tebal: 1.4, ...o });
}

/** Titik warna di dalam sudut h (menandai sudut yang sama besar). */
export function titikSudut(id: string, b: JenisBangun, cx: number, cy: number, s: number, h: string, warna: string = W.merah, r = 3, o: Opsi = {}): Obj {
  const { pts } = BENTUK[b];
  const p = pts[indeks(b, h)];
  const c = pusat(pts);
  return bulat(id, cx + (p[0] + (c[0] - p[0]) * 0.28) * s, cy + (p[1] + (c[1] - p[1]) * 0.28) * s, r, warna, undefined, o);
}

/** Kaki garis tegak lurus dari titik p ke garis a-z (koordinat mutlak). */
export function kaki(p: Pt, a: Pt, z: Pt): Pt {
  const dx = z[0] - a[0];
  const dy = z[1] - a[1];
  const t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy);
  return [a[0] + t * dx, a[1] + t * dy];
}

/** Garis dari sudut `dari` tegak lurus ke garis h1-h2 (putus-putus) beserta titik kaki dan hurufnya. Id: `${id}g`, `${id}t`, `${id}h`. */
export function tegakLurus(id: string, b: JenisBangun, cx: number, cy: number, s: number, dari: string, h1: string, h2: string, namaKaki: string, warna: string = W.hijau, o: Opsi = {}): Obj[] {
  const p = titik(b, dari, cx, cy, s);
  const f = kaki(p, titik(b, h1, cx, cy, s), titik(b, h2, cx, cy, s));
  const dx = f[0] - p[0];
  const dy = f[1] - p[1];
  const l = Math.hypot(dx, dy) || 1;
  return [
    garis(`${id}g`, p[0], p[1], dx, dy, warna, 1.5, { putus: true, ...o }),
    bulat(`${id}t`, f[0], f[1], 1.8, warna, undefined, o),
    teks(`${id}h`, f[0] + (dx / l) * 8, f[1] + (dy / l) * 8 + 3, namaKaki, 8, warna, o),
  ];
}

/* ------------------------------ Daftar ciri dan gelembung ------------------------------ */

/** Satu baris ciri berupa kotak berisi teks rata kiri. Pojok kiri-atas (x, y). */
export function barisCiri(id: string, x: number, y: number, w: number, isi: string, warna: string = W.putih, u = 8, h = 20, o: Opsi = {}): Obj[] {
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 5, tebal: 1.2, ...o }), teks(`${id}-t`, x + 6, y + h / 2 + u * 0.35, isi, u, W.biru, { anchor: "start", ...o })];
}

/** Gelembung ide siswa: kotak dengan nama di kiri-atas dan satu sampai tiga baris isi rata kiri. */
export function ide(id: string, x: number, y: number, w: number, h: number, nama: string, baris: string[], warna: string = W.krem, u = 8): Obj[] {
  return [
    kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8 }),
    teks(`${id}-n`, x + 8, y + 12, nama, 8.6, W.ungu, { anchor: "start" }),
    ...baris.map((b, i) => teks(`${id}-t${i}`, x + 8, y + 25 + i * (u + 3.5), b, u, W.biru, { anchor: "start" })),
  ];
}

/** Panel daftar ciri: satu baris kotak per ciri, dari atas ke bawah. Hasil: larik baris, tiap baris larik benda (id `${id}${i}-k`, `${id}${i}-t`). */
export function panelCiri(id: string, x: number, y: number, w: number, daftar: string[], warna: string = W.putih, u = 7.8, h = 22, jarak = 5): Obj[][] {
  return daftar.map((isi, i) => barisCiri(`${id}${i}`, x, y + i * (h + jarak), w, isi, warna, u, h));
}

/** Tanda centang atau silang di ujung kanan baris ke-i sebuah panelCiri. */
export const centangBaris = (id: string, x: number, y: number, w: number, i: number, ya = true, h = 22, jarak = 5): Obj => tanda(id, x + w - 9, y + i * (h + jarak) + h / 2 + 4, ya, 12);

/** Rumus bangun: bangun asal, panah dengan keterangan ciri tambahan, dan bangun hasil. Dipakai untuk "A adalah B yang ...". */
export function rumusBangun(id: string, dari: JenisBangun, ke: JenisBangun, namaDari: string, namaKe: string, baris: string[], s = 17): { dari: Obj[]; panah: Obj[]; ke: Obj[] } {
  const cy = 98;
  return {
    dari: [bangun(`${id}a`, dari, 52, cy, s, W.hijauMuda), teks(`${id}an`, 52, cy + 36, namaDari, 8.2)],
    panah: [panah(`${id}p`, 92, cy, 116, 0, W.ungu, 2.4), ...baris.map((b, i) => teks(`${id}l${i}`, 150, cy - 22 + i * 11, b, 8, W.merah))],
    ke: [bangun(`${id}b`, ke, 248, cy, s, W.krem), teks(`${id}bn`, 248, cy + 36, namaKe, 8.2)],
  };
}

/* ------------------------------ Geometri mandiri (dipakai uji) ------------------------------ */

export const GEOM = {
  jarak: (p: Pt, q: Pt): number => Math.hypot(p[0] - q[0], p[1] - q[1]),
  sejajar: (a: Pt, b: Pt, c: Pt, d: Pt): boolean => Math.abs((b[0] - a[0]) * (d[1] - c[1]) - (b[1] - a[1]) * (d[0] - c[0])) < 1e-9,
  tegakLurus: (a: Pt, b: Pt, c: Pt, d: Pt): boolean => Math.abs((b[0] - a[0]) * (d[0] - c[0]) + (b[1] - a[1]) * (d[1] - c[1])) < 1e-9,
};
