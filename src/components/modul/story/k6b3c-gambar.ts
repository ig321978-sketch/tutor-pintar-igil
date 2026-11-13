import type { Aksi, KetukanStory, Obj } from "./logika-story";

/**
 * Gambar dan penyingkat khusus Story Kelas 6 Bab 3 Sub-Bab C (Lokasi): bidang berpetak, titik, tanda X dan O, jalur, peta,
 * kisi miring, kubus kecil, dan hitungan jalur. Berkas ini TIDAK dipakai bab atau sub-bab lain.
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  salem: "#F97316",
  biruMuda: "#3B82F6",
  hijau: "#16A34A",
  putih: "#FFFFFF",
  abu: "#CBD5E1",
  abuTua: "#64748B",
  ungu: "#8B5CF6",
  coklat: "#A16207",
  langit: "#DBEAFE",
  rumput: "#86EFAC",
  krem: "#FEF3C7",
  merahMuda: "#FECACA",
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const jalur = (id: string, x: number, y: number, d: string, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "jalur", x, y, d, warna, garis: garisW, tebal: 1.5, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/* ------------------------------ Penyingkat naskah ------------------------------ */
type At = string | number | undefined;
type Ubah = Partial<Obj> & { id: string };
export const tambah = (at: At, ...objs: (Obj | Obj[])[]): Aksi => ({ at, tambah: objs.flat() });
export const ubah = (at: At, ...u: Ubah[]): Aksi => ({ at, ubah: u });
export const hapus = (at: At, ...ids: string[]): Aksi => ({ at, hapus: ids });
export const bersih = (at: At = 0): Aksi => ({ at, bersih: true });
export const k = (suara: string, ...aksi: Aksi[]): KetukanStory => ({ suara, aksi });
export const sorotkan = (at: At, ...ids: string[]): Aksi => ({ at, ubah: ids.map((id) => ({ id, sorot: true })) });
export const redamkan = (at: At, ...ids: string[]): Aksi => ({ at, ubah: ids.map((id) => ({ id, sorot: false })) });

/** Balon kata dengan beberapa baris, titik tengah (cx, y). */
export function balon(id: string, cx: number, y: number, baris: string[], lebar: number, warna: string = W.putih, u = 6.6): Obj[] {
  const tinggi = baris.length * (u + 2.2) + 5;
  return [kotak(`${id}-k`, cx - lebar / 2, y, lebar, tinggi, warna, W.biru, { rx: 5 }), ...baris.map((b, i) => teks(`${id}-t${i}`, cx, y + 3 + (i + 1) * (u + 1.6), b, u))];
}

/* ------------------------------ Bidang berpetak ------------------------------ */
export const HURUF = "ABCDEFGH";
export type Titik = [number, number];

export type Kisi = {
  p: string;
  /** Posisi titik pada kanvas untuk lokasi (huruf, bilangan). */
  pt: (h: string, n: number) => Titik;
  /** Id garis vertikal berhuruf, garis horizontal berbilangan, dan labelnya. */
  idV: (h: string) => string;
  idH: (n: number) => string;
  idLH: (h: string) => string;
  idLN: (n: number) => string;
  garisV: Obj[];
  garisH: Obj[];
  labH: Obj[];
  labN: Obj[];
  semua: Obj[];
};

/**
 * Bidang berpetak: nk garis vertikal bernama huruf A dan seterusnya, nb garis horizontal bernama bilangan mulai dari `mulai`.
 * (ox, oy) letak titik (A, mulai); (ux, uy) langkah antar huruf; (vx, vy) langkah antar bilangan.
 * Kisi tegak: u = (sel, 0), v = (0, -sel). Kisi miring: u dan v miring seperti gambar isometrik buku.
 */
export function kisi(p: string, ox: number, oy: number, ux: number, uy: number, vx: number, vy: number, nk: number, nb: number, mulai = 1, u = 7, tebal = 1): Kisi {
  const pt = (h: string, n: number): Titik => {
    const i = HURUF.indexOf(h);
    return [ox + i * ux + (n - mulai) * vx, oy + i * uy + (n - mulai) * vy];
  };
  const huruf = HURUF.slice(0, nk).split("");
  const bil = Array.from({ length: nb }, (_, j) => mulai + j);
  const idV = (h: string) => `${p}-v${h}`;
  const idH = (n: number) => `${p}-h${n}`;
  const idLH = (h: string) => `${p}-lh${h}`;
  const idLN = (n: number) => `${p}-ln${n}`;
  const garisV = huruf.map((h) => {
    const a = pt(h, mulai);
    const b = pt(h, mulai + nb - 1);
    return garis(idV(h), a[0], a[1], b[0] - a[0], b[1] - a[1], W.abu, tebal);
  });
  const garisH = bil.map((n) => {
    const a = pt("A", n);
    const b = pt(huruf[nk - 1], n);
    return garis(idH(n), a[0], a[1], b[0] - a[0], b[1] - a[1], W.abu, tebal);
  });
  const labH = huruf.map((h) => {
    const a = pt(h, mulai);
    return teks(idLH(h), a[0] - vx * 0.8, a[1] - vy * 0.8 + u * 0.35, h, u, W.biruMuda);
  });
  const labN = bil.map((n) => {
    const a = pt("A", n);
    return teks(idLN(n), a[0] - ux * 0.8, a[1] - uy * 0.8 + u * 0.35, String(n), u, W.merah);
  });
  return { p, pt, idV, idH, idLH, idLN, garisV, garisH, labH, labN, semua: [...garisV, ...garisH, ...labH, ...labN] };
}

/** Kisi tegak dengan sel persegi. */
export const kisiTegak = (p: string, ox: number, oy: number, sel: number, nk: number, nb: number, mulai = 1, u = 7): Kisi => kisi(p, ox, oy, sel, 0, 0, -sel, nk, nb, mulai, u);

/** Tanda X: dua garis bersilang di titik. */
export const tandaX = (id: string, [x, y]: Titik, warna: string = W.merah, s = 4.5): Obj[] => [garis(`${id}a`, x - s, y - s, 2 * s, 2 * s, warna, 2.4), garis(`${id}b`, x - s, y + s, 2 * s, -2 * s, warna, 2.4)];
export const idX = (id: string) => [`${id}a`, `${id}b`];
/** Tanda O: lingkaran putih bertepi. */
export const tandaO = (id: string, [x, y]: Titik, warna: string = W.biruMuda, r = 4.8): Obj => bulat(id, x, y, r, W.putih, warna, { tebal: 2.2 });
/** Titik penanda. */
export const titik = (id: string, [x, y]: Titik, warna: string = W.merah, r = 3.4): Obj => bulat(id, x, y, r, warna, W.biru, { tebal: 1 });

/** Rute melalui deretan titik, tergambar bertahap. */
export function rute(id: string, pts: Titik[], warna: string, tebal = 2.4, o: Opsi = {}): Obj {
  const [x0, y0] = pts[0];
  const d = pts.map((q, i) => `${i === 0 ? "M" : "L"}${(q[0] - x0).toFixed(1)} ${(q[1] - y0).toFixed(1)}`).join(" ");
  return jalur(id, x0, y0, d, "none", warna, { tebal, gambar: true, ...o });
}

/** Titik-titik rute dari deretan gerak pada kisi: "K" kanan, "A" atas, "B" bawah, "L" kiri. */
export function lintasan(ki: Kisi, dari: [string, number], gerak: string): Titik[] {
  let h = HURUF.indexOf(dari[0]);
  let n = dari[1];
  const hasil: Titik[] = [ki.pt(HURUF[h], n)];
  for (const g of gerak) {
    if (g === "K") h += 1;
    else if (g === "L") h -= 1;
    else if (g === "A") n += 1;
    else if (g === "B") n -= 1;
    hasil.push(ki.pt(HURUF[h], n));
  }
  return hasil;
}

/** Lokasi akhir setelah gerak. Dipakai uji mandiri. */
export function akhirGerak(dari: [string, number], gerak: string): [string, number] {
  let h = HURUF.indexOf(dari[0]);
  let n = dari[1];
  for (const g of gerak) {
    if (g === "K") h += 1;
    else if (g === "L") h -= 1;
    else if (g === "A") n += 1;
    else if (g === "B") n -= 1;
  }
  return [HURUF[h], n];
}

/* ------------------------------ Peta dan benda ------------------------------ */

/** Pulau-pulau peta Indonesia yang disederhanakan, pada kisi 5 kolom 3 baris berpetak sel `sel` dari (x, y) kiri atas. */
export function petaIndonesia(p: string, x: number, y: number, sel: number): Obj[] {
  const s = sel / 44;
  const bentuk = (id: string, ox: number, oy: number, d: string) => jalur(`${p}-${id}`, x + ox * s, y + oy * s, d, "#86C98A", "#3F9B5A", { tebal: 0.9, skala: s });
  return [
    bentuk("sumatera", 6, 8, "M0 0 L28 26 L24 34 L2 12 Z"),
    bentuk("jawa", 40, 74, "M0 0 L40 4 L38 9 L2 6 Z"),
    bentuk("kalimantan", 70, 24, "M0 4 L14 0 L28 6 L30 26 L14 34 L2 24 Z"),
    bentuk("sulawesi", 112, 34, "M0 0 L16 4 L8 14 L22 26 L12 28 L4 18 L-2 8 Z"),
    bentuk("papua", 170, 36, "M0 8 L22 0 L44 12 L40 30 L22 26 L8 30 Z"),
    bentuk("nusa", 100, 76, "M0 0 L24 2 L22 7 L2 5 Z"),
  ];
}

/** Kubus kecil dari tiga jajar genjang, berpusat di (x, y). */
export function kubusKecil(id: string, x: number, y: number, s = 7, warna = "#F59E0B"): Obj[] {
  return [
    jalur(`${id}-a`, x, y, `M0 ${-s} L${s} ${-s / 2} L0 0 L${-s} ${-s / 2} Z`, "#FBBF24", "#92400E", { tebal: 0.9 }),
    jalur(`${id}-b`, x, y, `M${-s} ${-s / 2} L0 0 L0 ${s} L${-s} ${s / 2} Z`, warna, "#92400E", { tebal: 0.9 }),
    jalur(`${id}-c`, x, y, `M0 0 L${s} ${-s / 2} L${s} ${s / 2} L0 ${s} Z`, "#FCD34D", "#92400E", { tebal: 0.9 }),
  ];
}
export const idKubus = (id: string) => [`${id}-a`, `${id}-b`, `${id}-c`];
export const bolaKecil = (id: string, x: number, y: number, r = 5): Obj => bulat(id, x, y, r, "#FACC15", "#A16207", { tebal: 1.1 });
export const kerucutKecil = (id: string, x: number, y: number, s = 6): Obj => jalur(id, x, y, `M0 ${-s * 1.6} L${s} 0 L${-s} 0 Z`, "#C084FC", "#6B21A8", { tebal: 1 });

/* ------------------------------ Hitungan jalur ------------------------------ */

/** Banyak cara dari (A, mulai) ke (huruf, n) bila hanya boleh ke kanan atau ke atas, dengan aturan penjumlahan dua tetangga. */
export function caraKe(h: number, n: number): number {
  const tabel: number[][] = [];
  for (let i = 0; i <= h; i += 1) {
    tabel.push([]);
    for (let j = 0; j <= n; j += 1) tabel[i].push(i === 0 || j === 0 ? 1 : tabel[i - 1][j] + tabel[i][j - 1]);
  }
  return tabel[h][n];
}
