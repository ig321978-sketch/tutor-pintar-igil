/**
 * Geometri murni Kelas 2 Bab 3 Sub-Bab B "Papan Puzzle yang Berantakan" (mengurai dan menyusun bangun datar).
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-puzzle-k2b3b.mjs.
 * Semua bentuk diberi sebagai daftar titik sudut; keping berjenis segitiga, persegi, segi empat, segi lima, atau segi enam.
 */
export type Titik = { x: number; y: number };
export type Jenis = "segitiga" | "persegi" | "segiEmpat" | "segiLima" | "segiEnam";
export type Keping = { jenis: Jenis; titik: Titik[] };

export const NAMA_JENIS: Record<Jenis, string> = { segitiga: "segitiga", persegi: "persegi", segiEmpat: "segi empat", segiLima: "segi lima", segiEnam: "segi enam" };
export const URUT_JENIS: Jenis[] = ["segitiga", "persegi", "segiEmpat", "segiLima", "segiEnam"];

const r1 = (n: number): number => Math.round(n * 10) / 10;
const P = (x: number, y: number): Titik => ({ x, y });

/** Segi banyak beraturan `n` sisi berpusat (cx, cy) berjari-jari r; `rot` derajat (0: pojok pertama di atas; 45 untuk persegi tegak). */
export function segiN(n: number, cx: number, cy: number, r: number, rot = 0): Titik[] {
  return Array.from({ length: n }, (_, i) => {
    const a = ((-90 + rot + (360 / n) * i) * Math.PI) / 180;
    return P(r1(cx + r * Math.cos(a)), r1(cy + r * Math.sin(a)));
  });
}

/** Jenis segi banyak menurut banyak sisinya (3 sampai 6). */
export function jenisSisi(n: number): Jenis {
  return n === 3 ? "segitiga" : n === 4 ? "segiEmpat" : n === 5 ? "segiLima" : "segiEnam";
}

/** Luas poligon (untuk menguji bahwa keping menutup bangun tanpa celah dan tanpa tumpukan). */
export function luas(t: readonly Titik[]): number {
  let s = 0;
  for (let i = 0; i < t.length; i += 1) {
    const a = t[i];
    const b = t[(i + 1) % t.length];
    s += a.x * b.y - b.x * a.y;
  }
  return Math.abs(s) / 2;
}
export const pusat = (t: readonly Titik[]): Titik => P(r1(t.reduce((s, p) => s + p.x, 0) / t.length), r1(t.reduce((s, p) => s + p.y, 0) / t.length));
export const geser = (t: readonly Titik[], dx: number, dy: number): Titik[] => t.map((p) => P(r1(p.x + dx), r1(p.y + dy)));
export const skala = (t: readonly Titik[], k: number, cx = 0, cy = 0): Titik[] => t.map((p) => P(r1(cx + (p.x - cx) * k), r1(cy + (p.y - cy) * k)));

/* ------------------------------ Mengurai ------------------------------ */
export type Garis = "miring" | "tengah" | "pojok" | "pusat";
export type Urai = { luar: Titik[]; garis: [Titik, Titik][]; keping: Keping[] };

/** Banyak keping hasil mengurai segi `n` beraturan: dari satu pojok sisi dikurangi dua, dari titik tengah sama dengan banyak sisi; persegi garis miring atau garis tengah: dua. */
export function banyakUrai(n: number, garis: Garis): number {
  if (garis === "miring" || garis === "tengah") return 2;
  return garis === "pojok" ? n - 2 : n;
}
/** Jenis keping hasil uraian: garis tengah pada persegi menghasilkan segi empat, selainnya segitiga. */
export function jenisUrai(n: number, garis: Garis): Jenis {
  return n === 4 && garis === "tengah" ? "segiEmpat" : "segitiga";
}

/** Uraian segi `n` beraturan (persegi tegak bila n = 4) berpusat (cx, cy), jari-jari r. */
export function urai(n: number, garis: Garis, cx: number, cy: number, r: number): Urai {
  const v = segiN(n, cx, cy, r, n === 4 ? 45 : 0);
  const c = P(cx, cy);
  if (n === 4 && garis === "tengah") {
    const a = P(r1((v[3].x + v[0].x) / 2), v[0].y);
    const b = P(a.x, v[1].y);
    return { luar: v, garis: [[a, b]], keping: [{ jenis: "segiEmpat", titik: [v[3], a, b, v[2]] }, { jenis: "segiEmpat", titik: [a, v[0], v[1], b] }] };
  }
  if (garis === "pusat") return { luar: v, garis: v.map((p): [Titik, Titik] => [c, p]), keping: v.map((p, i) => ({ jenis: "segitiga" as Jenis, titik: [c, p, v[(i + 1) % n]] })) };
  // pojok (dan miring pada persegi): kipas dari pojok pertama
  return {
    luar: v,
    garis: Array.from({ length: n - 3 }, (_, i): [Titik, Titik] => [v[0], v[i + 2]]),
    keping: Array.from({ length: n - 2 }, (_, i) => ({ jenis: "segitiga" as Jenis, titik: [v[0], v[i + 1], v[i + 2]] })),
  };
}

/* ------------------------------ Menyusun ------------------------------ */
export type Gabung = "miring" | "pendek" | "kiriKanan" | "atasBawah" | "enamSegitiga";
export const URUT_GABUNG: Gabung[] = ["miring", "pendek", "kiriKanan", "atasBawah", "enamSegitiga"];
export const HASIL_GABUNG: Record<Gabung, Jenis> = { miring: "persegi", pendek: "segitiga", kiriKanan: "segiEnam", atasBawah: "segiEnam", enamSegitiga: "segiEnam" };
export const NAMA_GABUNG: Record<Gabung, string> = {
  miring: "dua segitiga siku-siku yang sama, sisi miringnya ditempelkan",
  pendek: "dua segitiga siku-siku yang sama, sisi pendeknya ditempelkan",
  kiriKanan: "dua segitiga di kiri dan kanan sebuah segi empat",
  atasBawah: "dua segitiga di atas dan di bawah sebuah segi empat",
  enamSegitiga: "enam segitiga yang sama dengan satu titik tengah",
};

/** Bentuk satuan (berpusat di nol) tiap cara menyusun: keping dan garis luar hasilnya. */
const SATUAN: Record<Gabung, { keping: Keping[]; luar: Titik[] }> = {
  miring: {
    keping: [
      { jenis: "segitiga", titik: [P(-1, -1), P(1, -1), P(-1, 1)] },
      { jenis: "segitiga", titik: [P(1, -1), P(1, 1), P(-1, 1)] },
    ],
    luar: [P(-1, -1), P(1, -1), P(1, 1), P(-1, 1)],
  },
  pendek: {
    keping: [
      { jenis: "segitiga", titik: [P(0, 1), P(2, 1), P(0, -1)] },
      { jenis: "segitiga", titik: [P(0, 1), P(0, -1), P(-2, 1)] },
    ],
    luar: [P(-2, 1), P(2, 1), P(0, -1)],
  },
  kiriKanan: {
    keping: [
      { jenis: "segitiga", titik: [P(-1, -1), P(-1, 1), P(-2, 0)] },
      { jenis: "segiEmpat", titik: [P(-1, -1), P(1, -1), P(1, 1), P(-1, 1)] },
      { jenis: "segitiga", titik: [P(1, -1), P(2, 0), P(1, 1)] },
    ],
    luar: [P(-2, 0), P(-1, -1), P(1, -1), P(2, 0), P(1, 1), P(-1, 1)],
  },
  atasBawah: {
    keping: [
      { jenis: "segitiga", titik: [P(-1.4, -0.7), P(1.4, -0.7), P(0, -1.5)] },
      { jenis: "segiEmpat", titik: [P(-1.4, -0.7), P(1.4, -0.7), P(1.4, 0.7), P(-1.4, 0.7)] },
      { jenis: "segitiga", titik: [P(-1.4, 0.7), P(1.4, 0.7), P(0, 1.5)] },
    ],
    luar: [P(0, -1.5), P(1.4, -0.7), P(1.4, 0.7), P(0, 1.5), P(-1.4, 0.7), P(-1.4, -0.7)],
  },
  enamSegitiga: {
    keping: [0, 1, 2, 3, 4, 5].map((i) => {
      const v = segiN(6, 0, 0, 1.6, 0);
      return { jenis: "segitiga" as Jenis, titik: [P(0, 0), v[i], v[(i + 1) % 6]] };
    }),
    luar: segiN(6, 0, 0, 1.6, 0),
  },
};

/** Keping tersusun dan garis luar hasil, diperbesar `s` kali dan berpusat di (cx, cy). */
export function gabung(kind: Gabung, cx: number, cy: number, s: number): { keping: Keping[]; luar: Titik[] } {
  const f = (t: Titik[]) => t.map((p) => P(r1(cx + p.x * s), r1(cy + p.y * s)));
  return { keping: SATUAN[kind].keping.map((k) => ({ jenis: k.jenis, titik: f(k.titik) })), luar: f(SATUAN[kind].luar) };
}
export const banyakGabung = (kind: Gabung): number => SATUAN[kind].keping.length;

/* ------------------------------ Melipat ------------------------------ */
export type Lipatan = "miring" | "duaMiring" | "tengah" | "duaTengah";
export const URUT_LIPATAN: Lipatan[] = ["miring", "duaMiring", "tengah", "duaTengah"];
/** Banyak keping dan jenis keping hasil melipat persegi lalu menggunting sepanjang lipatan. */
export const HASIL_LIPAT: Record<Lipatan, { banyak: number; jenis: Jenis }> = {
  miring: { banyak: 2, jenis: "segitiga" },
  duaMiring: { banyak: 4, jenis: "segitiga" },
  tengah: { banyak: 2, jenis: "segiEmpat" },
  duaTengah: { banyak: 4, jenis: "persegi" },
};
export const NAMA_LIPATAN: Record<Lipatan, string> = {
  miring: "dilipat sekali dari pojok ke pojok",
  duaMiring: "dilipat dua kali dari pojok ke pojok, kedua arah",
  tengah: "dilipat sekali di tengah",
  duaTengah: "dilipat dua kali di tengah, mendatar dan menurun",
};
/** Keping hasil lipat persegi berpusat (cx, cy) bersisi 2r. */
export function lipat(kind: Lipatan, cx: number, cy: number, r: number): { luar: Titik[]; garis: [Titik, Titik][]; keping: Keping[] } {
  const a = P(cx - r, cy - r);
  const b = P(cx + r, cy - r);
  const c = P(cx + r, cy + r);
  const d = P(cx - r, cy + r);
  const m = P(cx, cy);
  const mt = P(cx, cy - r);
  const mb = P(cx, cy + r);
  const ml = P(cx - r, cy);
  const mr = P(cx + r, cy);
  const luar = [a, b, c, d];
  if (kind === "miring") return { luar, garis: [[a, c]], keping: [{ jenis: "segitiga", titik: [a, b, c] }, { jenis: "segitiga", titik: [a, c, d] }] };
  if (kind === "duaMiring")
    return {
      luar,
      garis: [[a, c], [b, d]],
      keping: [
        { jenis: "segitiga", titik: [m, a, b] },
        { jenis: "segitiga", titik: [m, b, c] },
        { jenis: "segitiga", titik: [m, c, d] },
        { jenis: "segitiga", titik: [m, d, a] },
      ],
    };
  if (kind === "tengah") return { luar, garis: [[mt, mb]], keping: [{ jenis: "segiEmpat", titik: [a, mt, mb, d] }, { jenis: "segiEmpat", titik: [mt, b, c, mb] }] };
  return {
    luar,
    garis: [[mt, mb], [ml, mr]],
    keping: [
      { jenis: "persegi", titik: [a, mt, m, ml] },
      { jenis: "persegi", titik: [mt, b, mr, m] },
      { jenis: "persegi", titik: [m, mr, c, mb] },
      { jenis: "persegi", titik: [ml, m, mb, d] },
    ],
  };
}

/* ------------------------------ Tangram (persegi 4 x 4) ------------------------------ */
export type KepingTangram = { id: string; nama: string; jenis: Jenis; titik: Titik[] };
/** Titik tangram ditulis dengan y ke atas (seperti buku), lalu dibalik ke y ke bawah. */
const T = (x: number, y: number): Titik => P(x, 4 - y);
/** Tujuh keping tangram baku pada persegi 4 x 4 (y ke bawah): lima segitiga, satu persegi, satu segi empat miring. */
export const TANGRAM: KepingTangram[] = [
  { id: "besar1", nama: "segitiga besar", jenis: "segitiga", titik: [T(0, 0), T(4, 0), T(2, 2)] },
  { id: "besar2", nama: "segitiga besar", jenis: "segitiga", titik: [T(0, 0), T(2, 2), T(0, 4)] },
  { id: "sedang", nama: "segitiga sedang", jenis: "segitiga", titik: [T(4, 2), T(4, 4), T(2, 4)] },
  { id: "kecil1", nama: "segitiga kecil", jenis: "segitiga", titik: [T(4, 0), T(4, 2), T(3, 1)] },
  { id: "kecil2", nama: "segitiga kecil", jenis: "segitiga", titik: [T(2, 2), T(3, 3), T(1, 3)] },
  { id: "persegi", nama: "persegi", jenis: "persegi", titik: [T(2, 2), T(3, 1), T(4, 2), T(3, 3)] },
  { id: "miring", nama: "segi empat miring", jenis: "segiEmpat", titik: [T(0, 4), T(1, 3), T(3, 3), T(2, 4)] },
];
export const LUAS_TANGRAM = 16;
