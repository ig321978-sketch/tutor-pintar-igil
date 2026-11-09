/**
 * Data murni Matematika Kelas 2 Bab 5 (Pecahan): geometri pecahan (membagi bangun dengan garis, melipat,
 * membandingkan luas bagian) dan semua ronde permainan Sub-Bab A (setengah dari benda utuh), B (setengah dari
 * kumpulan benda), dan C (seperempat dari benda utuh).
 * Tanpa React dan tanpa impor nilai, supaya bisa diuji di Node (scripts/uji-data-k2b5.mjs).
 * Koordinat bangun memakai kotak 100 x 100 (sumbu y ke bawah seperti SVG).
 */

import type { KalimatIsian, KotakPeta, Pernyataan, SoalDetektifTeks } from "./data-k2b3";

export type Titik = [number, number];
export type Garis = [Titik, Titik];

const EPS = 1e-6;
const bulat = (x: number) => Math.round(x * 100) / 100;

/* ====================================================================== */
/* Geometri dasar                                                           */
/* ====================================================================== */

export function poligonBeraturan(n: number, cx = 50, cy = 50, r = 42, mulai = -90): Titik[] {
  return Array.from({ length: n }, (_, i) => {
    const a = ((mulai + (360 / n) * i) * Math.PI) / 180;
    return [bulat(cx + r * Math.cos(a)), bulat(cy + r * Math.sin(a))] as Titik;
  });
}

export function luasBertanda(p: readonly Titik[]): number {
  let s = 0;
  for (let i = 0; i < p.length; i += 1) {
    const q = p[(i + 1) % p.length];
    s += p[i][0] * q[1] - q[0] * p[i][1];
  }
  return s / 2;
}
export const luasPoligon = (p: readonly Titik[]) => Math.abs(luasBertanda(p));

export function pusatPoligon(p: readonly Titik[]): Titik {
  return [bulat(p.reduce((s, q) => s + q[0], 0) / p.length), bulat(p.reduce((s, q) => s + q[1], 0) / p.length)];
}

export function kotakBatas(p: readonly Titik[]): { x0: number; y0: number; x1: number; y1: number } {
  const xs = p.map((q) => q[0]);
  const ys = p.map((q) => q[1]);
  return { x0: Math.min(...xs), y0: Math.min(...ys), x1: Math.max(...xs), y1: Math.max(...ys) };
}

const jarakKeRuas = (p: Titik, a: Titik, b: Titik): number => {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1)));
  return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy));
};

/** Titik di dalam poligon atau tepat di tepinya (toleransi kecil). */
export function titikDalam(p: Titik, poligon: readonly Titik[], tol = 0.02): boolean {
  for (let i = 0; i < poligon.length; i += 1) if (jarakKeRuas(p, poligon[i], poligon[(i + 1) % poligon.length]) <= tol) return true;
  let masuk = false;
  for (let i = 0, j = poligon.length - 1; i < poligon.length; j = i, i += 1) {
    const [xi, yi] = poligon[i];
    const [xj, yj] = poligon[j];
    if (yi > p[1] !== yj > p[1] && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) masuk = !masuk;
  }
  return masuk;
}

/** Pangkas poligon dengan setengah bidang di satu sisi garis a-b. sisi +1 atau -1. */
export function klipSisi(poly: readonly Titik[], a: Titik, b: Titik, sisi: 1 | -1): Titik[] {
  const f = (p: Titik) => sisi * ((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]));
  const hasil: Titik[] = [];
  for (let i = 0; i < poly.length; i += 1) {
    const cur = poly[i];
    const nxt = poly[(i + 1) % poly.length];
    const fc = f(cur);
    const fn = f(nxt);
    if (fc >= -EPS) hasil.push(cur);
    if ((fc > EPS && fn < -EPS) || (fc < -EPS && fn > EPS)) {
      const t = fc / (fc - fn);
      hasil.push([cur[0] + t * (nxt[0] - cur[0]), cur[1] + t * (nxt[1] - cur[1])]);
    }
  }
  return hasil.length >= 3 && luasPoligon(hasil) > 1e-4 ? hasil : [];
}

/** Bagi poligon dengan garis. Bagian kiri (hasil silang positif) lalu bagian kanan. */
export function bagiGaris(poly: readonly Titik[], a: Titik, b: Titik): [Titik[], Titik[]] {
  return [klipSisi(poly, a, b, 1), klipSisi(poly, a, b, -1)];
}

/** Semua keping setelah beberapa garis lurus melewati seluruh bangun cembung. */
export function bagiBanyak(poly: readonly Titik[], garis: readonly Garis[]): Titik[][] {
  let keping: Titik[][] = [poly.map((p) => [p[0], p[1]] as Titik)];
  for (const [a, b] of garis) {
    const baru: Titik[][] = [];
    for (const k of keping) {
      const [l, r] = bagiGaris(k, a, b);
      if (l.length && r.length) baru.push(l, r);
      else baru.push(k);
    }
    keping = baru;
  }
  return keping;
}

/** Garis yang hanya menyentuh tepi tidak membagi bangun. */
export const garisMembagi = (poly: readonly Titik[], g: Garis): boolean => {
  const [l, r] = bagiGaris(poly, g[0], g[1]);
  return l.length > 0 && r.length > 0;
};

export function samaBesar(keping: readonly (readonly Titik[])[], tol = 0.012): boolean {
  if (keping.length === 0) return false;
  const l = keping.map((k) => luasPoligon(k));
  const rata = l.reduce((s, x) => s + x, 0) / l.length;
  return l.every((x) => Math.abs(x - rata) <= rata * tol);
}

export const luasTotal = (keping: readonly (readonly Titik[])[]) => keping.reduce((s, k) => s + luasPoligon(k), 0);

/* ------------------------------ Melipat ------------------------------ */

export function pantulTitik(p: Titik, a: Titik, b: Titik): Titik {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy);
  return [2 * (a[0] + t * dx) - p[0], 2 * (a[1] + t * dy) - p[1]];
}
export const pantulPoligon = (poly: readonly Titik[], a: Titik, b: Titik): Titik[] => poly.map((p) => pantulTitik(p, a, b));

export type HasilLipat = { pas: boolean; tetap: Titik[]; balik: Titik[]; luasKiri: number; luasKanan: number };

/** Lipat bagian kiri garis a-b ke atas bagian kanan. Pas bila luas sama dan hasil pantulan masuk ke bagian kanan. */
export function lipat(poly: readonly Titik[], a: Titik, b: Titik): HasilLipat {
  const [kiri, kanan] = bagiGaris(poly, a, b);
  const luasKiri = luasPoligon(kiri);
  const luasKanan = luasPoligon(kanan);
  const balik = kiri.length ? pantulPoligon(kiri, a, b) : [];
  const seimbang = Math.abs(luasKiri - luasKanan) <= (luasKiri + luasKanan) * 0.012;
  const masuk = balik.length > 0 && kanan.length > 0 && balik.every((p) => titikDalam(p, kanan, 0.35));
  return { pas: seimbang && masuk, tetap: kanan, balik, luasKiri, luasKanan };
}

/** Empat keping setelah dua lipatan: garis pertama g1, garis kedua g2 (pada bagian yang tetap). */
export function hasilLipatDua(poly: readonly Titik[], g1: Garis, g2: Garis): Titik[][] {
  const [kiri, kanan] = bagiGaris(poly, g1[0], g1[1]);
  const g2Cermin: Garis = [pantulTitik(g2[0], g1[0], g1[1]), pantulTitik(g2[1], g1[0], g1[1])];
  const dariKanan = bagiGaris(kanan, g2[0], g2[1]).filter((k) => k.length);
  const dariKiri = bagiGaris(kiri, g2Cermin[0], g2Cermin[1]).filter((k) => k.length);
  return [...dariKiri, ...dariKanan];
}

/* ====================================================================== */
/* Pustaka bangun                                                           */
/* ====================================================================== */

export type IdBentukP = "persegi" | "persegiPanjang" | "segitiga" | "lingkaran" | "segiLima" | "segiDelapan" | "segiEnam" | "belahKetupat" | "trapesium" | "hati" | "bintang";

function hati(): Titik[] {
  const n = 40;
  return Array.from({ length: n }, (_, i) => {
    const t = (2 * Math.PI * i) / n;
    const x = 16 * Math.sin(t) ** 3;
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    return [bulat(50 + x * 2.6), bulat(50 - (y + 2.5) * 2.7)] as Titik;
  });
}

function bintang(): Titik[] {
  const t: Titik[] = [];
  for (let i = 0; i < 10; i += 1) {
    const r = i % 2 === 0 ? 44 : 19;
    const a = ((-90 + 36 * i) * Math.PI) / 180;
    t.push([bulat(50 + r * Math.cos(a)), bulat(54 + r * Math.sin(a))]);
  }
  return t;
}

export const BENTUK_P: Record<IdBentukP, { nama: string; titik: Titik[]; cembung: boolean }> = {
  persegi: { nama: "persegi", titik: [[10, 10], [90, 10], [90, 90], [10, 90]], cembung: true },
  persegiPanjang: { nama: "persegi panjang", titik: [[6, 24], [94, 24], [94, 76], [6, 76]], cembung: true },
  segitiga: { nama: "segitiga", titik: [[50, 10], [92, 88], [8, 88]], cembung: true },
  lingkaran: { nama: "lingkaran", titik: poligonBeraturan(32, 50, 50, 42, 0), cembung: true },
  segiLima: { nama: "segi lima", titik: poligonBeraturan(5, 50, 54, 44, -90), cembung: true },
  segiDelapan: { nama: "segi delapan", titik: poligonBeraturan(8, 50, 50, 44, -67.5), cembung: true },
  segiEnam: { nama: "segi enam", titik: poligonBeraturan(6, 50, 50, 44, -60), cembung: true },
  belahKetupat: { nama: "belah ketupat", titik: [[50, 6], [90, 50], [50, 94], [10, 50]], cembung: true },
  trapesium: { nama: "trapesium", titik: [[30, 24], [70, 24], [94, 78], [6, 78]], cembung: true },
  hati: { nama: "bentuk hati", titik: hati(), cembung: false },
  bintang: { nama: "bintang", titik: bintang(), cembung: false },
};
export const titikBentukP = (id: IdBentukP): Titik[] => BENTUK_P[id].titik;

/** Simpul untuk menarik garis: pojok dan titik tengah sisi. Lingkaran memakai delapan titik. */
export function simpulBentuk(id: IdBentukP): Titik[] {
  const t = BENTUK_P[id].titik;
  if (id === "lingkaran") return t.filter((_, i) => i % 4 === 0);
  const hasil: Titik[] = [];
  for (let i = 0; i < t.length; i += 1) {
    const q = t[(i + 1) % t.length];
    hasil.push(t[i], [bulat((t[i][0] + q[0]) / 2), bulat((t[i][1] + q[1]) / 2)]);
  }
  return hasil;
}

export type HasilTarik = { sah: boolean; alasan: string; keping: Titik[][] };

/** Periksa garis-garis yang ditarik siswa pada bangun cembung. target = banyak keping yang diminta. */
export function periksaTarik(id: IdBentukP, garis: readonly Garis[], target: number): HasilTarik {
  const poly = BENTUK_P[id].titik;
  for (const g of garis) if (!garisMembagi(poly, g)) return { sah: false, alasan: "Garis itu hanya berimpit dengan tepi. Pilih dua titik yang tidak segaris dengan satu sisi.", keping: [poly] };
  const keping = bagiBanyak(poly, garis);
  if (keping.length < target) return { sah: false, alasan: `Baru ${keping.length} bagian. Kita butuh ${target} bagian sama besar.`, keping };
  if (keping.length > target) return { sah: false, alasan: `Sudah ${keping.length} bagian, terlalu banyak. Kita butuh ${target} bagian.`, keping };
  if (!samaBesar(keping)) return { sah: false, alasan: "Bagian-bagiannya belum sama besar.", keping };
  return { sah: true, alasan: "", keping };
}

/** Semua pasangan simpul yang membagi bangun menjadi `target` keping sama besar dengan paling banyak `maks` garis. */
export function garisSahBentuk(id: IdBentukP, target: number): Garis[][] {
  const s = simpulBentuk(id);
  const pasang: Garis[] = [];
  for (let i = 0; i < s.length; i += 1) for (let j = i + 1; j < s.length; j += 1) pasang.push([s[i], s[j]]);
  const hasil: Garis[][] = [];
  if (target === 2) {
    for (const g of pasang) if (periksaTarik(id, [g], 2).sah) hasil.push([g]);
  } else {
    for (let i = 0; i < pasang.length; i += 1) {
      for (let j = i + 1; j < pasang.length; j += 1) {
        if (periksaTarik(id, [pasang[i], pasang[j]], target).sah) hasil.push([pasang[i], pasang[j]]);
      }
    }
  }
  return hasil;
}

/* ====================================================================== */
/* Benda yang dipotong (Concrete)                                           */
/* ====================================================================== */

export type JenisPotong = "martabak" | "kueBolu" | "roti" | "pizza" | "semangka" | "apel" | "puding" | "jeruk";
export type DekorPotong = "martabak" | "bolu" | "roti" | "pizza" | "semangka" | "apel" | "puding" | "jeruk";
export const BENDA_POTONG: Record<JenisPotong, { nama: string; bentuk: IdBentukP; warna: string; tepi: string; dekor: DekorPotong }> = {
  martabak: { nama: "Martabak", bentuk: "lingkaran", warna: "#E3A857", tepi: "#8A5A19", dekor: "martabak" },
  kueBolu: { nama: "Kue bolu", bentuk: "persegiPanjang", warna: "#E9B872", tepi: "#8A5A19", dekor: "bolu" },
  roti: { nama: "Roti", bentuk: "persegi", warna: "#F3D9A4", tepi: "#A8672D", dekor: "roti" },
  pizza: { nama: "Pizza", bentuk: "lingkaran", warna: "#FBBF24", tepi: "#B45309", dekor: "pizza" },
  semangka: { nama: "Semangka", bentuk: "lingkaran", warna: "#F87171", tepi: "#15803D", dekor: "semangka" },
  apel: { nama: "Apel", bentuk: "lingkaran", warna: "#EF4444", tepi: "#7F1D1D", dekor: "apel" },
  puding: { nama: "Puding", bentuk: "lingkaran", warna: "#F9A8D4", tepi: "#BE185D", dekor: "puding" },
  jeruk: { nama: "Jeruk", bentuk: "lingkaran", warna: "#FB923C", tepi: "#C2410C", dekor: "jeruk" },
};

const V: Garis = [[50, 0], [50, 100]];
const H: Garis = [[0, 50], [100, 50]];
const DIAG1: Garis = [[0, 0], [100, 100]];
const DIAG2: Garis = [[100, 0], [0, 100]];
const KUADRAN: Titik[] = [[25, 25], [75, 25], [25, 75], [75, 75]];

/* ------------------------- A1. Potongan yang adil ------------------------- */

export type KandidatPotong = { id: string; garis: Garis[] };
export type RondePotong = { benda: JenisPotong; bagian: number; kandidat: KandidatPotong[] };

/** Apakah kandidat memberi `bagian` keping sama besar? Dihitung dari luas. */
export function potonganAdil(benda: JenisPotong, garis: readonly Garis[], bagian: number): boolean {
  const poly = BENTUK_P[BENDA_POTONG[benda].bentuk].titik;
  if (garis.some((g) => !garisMembagi(poly, g))) return false;
  const k = bagiBanyak(poly, garis);
  return k.length === bagian && samaBesar(k);
}

const bulatD = (r: number, dari: number, ke: number): Garis => [[50 + r * Math.cos(dari), 50 + r * Math.sin(dari)], [50 + r * Math.cos(ke), 50 + r * Math.sin(ke)]];
const dia = (derajat: number): Garis => {
  const a = (derajat * Math.PI) / 180;
  return bulatD(42, a, a + Math.PI);
};

export const RONDE_POTONG_A: RondePotong[] = [
  {
    benda: "martabak",
    bagian: 2,
    kandidat: [
      { id: "tegak", garis: [dia(90)] },
      { id: "chordAtas", garis: [[[13, 30], [87, 30]]] },
      { id: "datar", garis: [dia(0)] },
      { id: "chordMiring", garis: [[[14, 66], [80, 20]]] },
      { id: "miring", garis: [dia(45)] },
      { id: "chordKiri", garis: [[[30, 10], [30, 90]]] },
    ],
  },
  {
    benda: "kueBolu",
    bagian: 2,
    kandidat: [
      { id: "tegak", garis: [V] },
      { id: "tegakGeser", garis: [[[30, 0], [30, 100]]] },
      { id: "datar", garis: [H] },
      { id: "datarGeser", garis: [[[0, 36], [100, 36]]] },
      { id: "diagonal", garis: [[[6, 24], [94, 76]]] },
      { id: "miringTidakTengah", garis: [[[6, 24], [94, 50]]] },
    ],
  },
  {
    benda: "roti",
    bagian: 2,
    kandidat: [
      { id: "tegak", garis: [V] },
      { id: "sudut", garis: [[[10, 50], [50, 10]]] },
      { id: "diagonal1", garis: [DIAG1] },
      { id: "tegakGeser", garis: [[[34, 0], [34, 100]]] },
      { id: "diagonal2", garis: [DIAG2] },
      { id: "miringTidakTengah", garis: [[[10, 50], [90, 10]]] },
    ],
  },
  {
    benda: "pizza",
    bagian: 2,
    kandidat: [
      { id: "tegak", garis: [dia(90)] },
      { id: "chordBawah", garis: [[[18, 72], [82, 72]]] },
      { id: "miring1", garis: [dia(135)] },
      { id: "chordSudut", garis: [[[20, 20], [84, 38]]] },
      { id: "datar", garis: [dia(0)] },
      { id: "chordTepi", garis: [[[70, 10], [70, 90]]] },
    ],
  },
];

export const RONDE_POTONG_C: RondePotong[] = [
  {
    benda: "martabak",
    bagian: 4,
    kandidat: [
      { id: "tambah", garis: [dia(0), dia(90)] },
      { id: "tambahGeser", garis: [dia(0), [[35, 8], [35, 92]]] },
      { id: "silang", garis: [dia(45), dia(135)] },
      { id: "sejajar", garis: [[[28, 8], [28, 92]], [[50, 8], [50, 92]], [[72, 8], [72, 92]]] },
      { id: "duaDiameter", garis: [dia(0), dia(45)] },
      { id: "sudutMiring", garis: [dia(20), dia(110)] },
    ],
  },
  {
    benda: "kueBolu",
    bagian: 4,
    kandidat: [
      { id: "tambah", garis: [V, H] },
      { id: "sejajar", garis: [[[28, 0], [28, 100]], [[50, 0], [50, 100]], [[72, 0], [72, 100]]] },
      { id: "silang", garis: [[[6, 24], [94, 76]], [[94, 24], [6, 76]]] },
      { id: "sejajarTidakSama", garis: [[[20, 0], [20, 100]], [[50, 0], [50, 100]], [[80, 0], [80, 100]]] },
      { id: "tambahGeser", garis: [V, [[0, 36], [100, 36]]] },
      { id: "tigaDatar", garis: [[[0, 38], [100, 38]], [[0, 50], [100, 50]], [[0, 62], [100, 62]]] },
    ],
  },
  {
    benda: "roti",
    bagian: 4,
    kandidat: [
      { id: "tambah", garis: [V, H] },
      { id: "silang", garis: [DIAG1, DIAG2] },
      { id: "sejajar", garis: [[[30, 0], [30, 100]], [[50, 0], [50, 100]], [[70, 0], [70, 100]]] },
      { id: "tambahGeser", garis: [[[34, 0], [34, 100]], H] },
      { id: "diagonalDatar", garis: [DIAG1, H] },
      { id: "sejajarTidakSama", garis: [[[20, 0], [20, 100]], [[40, 0], [40, 100]], [[60, 0], [60, 100]]] },
    ],
  },
  {
    benda: "puding",
    bagian: 4,
    kandidat: [
      { id: "tambah", garis: [dia(0), dia(90)] },
      { id: "silang", garis: [dia(45), dia(135)] },
      { id: "tambahMiring", garis: [dia(30), dia(120)] },
      { id: "duaChord", garis: [[[13, 30], [87, 30]], [[13, 70], [87, 70]]] },
      { id: "tidakTegak", garis: [dia(0), dia(60)] },
      { id: "satuSaja", garis: [dia(0)] },
    ],
  },
];

/**
 * Urutan tampil kandidat potongan. Tanpa ini potongan yang adil selalu muncul di tempat yang sama
 * (nomor 1, 3, 5), sehingga anak bisa menebak tanpa menghitung. Urutan tetap, tanpa acak (aman untuk render server).
 */
const URUT_POTONG_A = [
  [1, 0, 3, 2, 4, 5],
  [1, 3, 0, 5, 2, 4],
  [1, 0, 3, 2, 5, 4],
  [0, 1, 3, 2, 5, 4],
];
const URUT_POTONG_C = [
  [1, 2, 3, 0, 4, 5],
  [4, 1, 3, 5, 0, 2],
  [1, 3, 0, 5, 4, 2],
  [3, 4, 0, 5, 1, 2],
];
RONDE_POTONG_A.forEach((r, i) => {
  r.kandidat = URUT_POTONG_A[i].map((j) => r.kandidat[j]);
});
RONDE_POTONG_C.forEach((r, i) => {
  r.kandidat = URUT_POTONG_C[i].map((j) => r.kandidat[j]);
});

/* ------------------------- A4. Cari setengah ------------------------- */

export type SisaPotong = "utuh" | "setengah" | "seperempat" | "tigaPerempat" | "tidakSama";

/** Garis pembagi dan titik bagian yang hilang untuk sebuah sisa. variasi memilih arah. */
export function polaSisa(sisa: SisaPotong, variasi: number): { garis: Garis[]; hilang: Titik[] } {
  const q = ((variasi % 4) + 4) % 4;
  if (sisa === "utuh") return { garis: [], hilang: [] };
  if (sisa === "setengah") {
    return [
      { garis: [V], hilang: [[75, 50]] },
      { garis: [H], hilang: [[50, 75]] },
      { garis: [V], hilang: [[25, 50]] },
      { garis: [H], hilang: [[50, 25]] },
    ][q] as { garis: Garis[]; hilang: Titik[] };
  }
  if (sisa === "seperempat") return { garis: [V, H], hilang: KUADRAN.filter((_, i) => i !== q) };
  if (sisa === "tigaPerempat") return { garis: [V, H], hilang: [KUADRAN[q]] };
  return [
    { garis: [[[0, 33], [100, 33]] as Garis], hilang: [[50, 18]] as Titik[] },
    { garis: [[[67, 0], [67, 100]] as Garis], hilang: [[84, 50]] as Titik[] },
    { garis: [[[0, 67], [100, 67]] as Garis], hilang: [[50, 82]] as Titik[] },
    { garis: [[[33, 0], [33, 100]] as Garis], hilang: [[16, 50]] as Titik[] },
  ][q];
}

/** Bagian benda: keping utuh (masih ada) dan keping yang hilang, dari satu benda dan satu sisa. */
export function kepingSisa(benda: JenisPotong, sisa: SisaPotong, variasi: number): { ada: Titik[][]; hilang: Titik[][]; rasio: number } {
  const poly = BENTUK_P[BENDA_POTONG[benda].bentuk].titik;
  const kotak = kotakBatas(poly);
  const sx = (x: number) => kotak.x0 + (x / 100) * (kotak.x1 - kotak.x0);
  const sy = (y: number) => kotak.y0 + (y / 100) * (kotak.y1 - kotak.y0);
  const { garis, hilang } = polaSisa(sisa, variasi);
  const garisNyata: Garis[] = garis.map(([a, b]) => [[sx(a[0]), sy(a[1])], [sx(b[0]), sy(b[1])]] as Garis);
  const pusatHilang: Titik[] = hilang.map(([x, y]) => [sx(x), sy(y)] as Titik);
  const semua = bagiBanyak(poly, garisNyata);
  const hil = semua.filter((k) => pusatHilang.some((p) => titikDalam(p, k, 0)));
  const ada = semua.filter((k) => !hil.includes(k));
  const total = luasTotal(semua);
  return { ada, hilang: hil, rasio: bulat(luasTotal(ada) / total) };
}

export type ItemSetengah =
  | { jenis: "potong"; benda: JenisPotong; sisa: SisaPotong; variasi: number }
  | { jenis: "gelas"; nama: string; level: number; warna: string };

export const RONDE_CARI_A: ItemSetengah[][] = [
  [
    { jenis: "potong", benda: "semangka", sisa: "setengah", variasi: 0 },
    { jenis: "gelas", nama: "Gelas air", level: 0.75, warna: "#38BDF8" },
    { jenis: "potong", benda: "apel", sisa: "seperempat", variasi: 1 },
    { jenis: "potong", benda: "kueBolu", sisa: "setengah", variasi: 1 },
    { jenis: "potong", benda: "semangka", sisa: "tidakSama", variasi: 0 },
    { jenis: "gelas", nama: "Gelas air", level: 0.5, warna: "#38BDF8" },
    { jenis: "potong", benda: "roti", sisa: "tigaPerempat", variasi: 2 },
    { jenis: "potong", benda: "apel", sisa: "utuh", variasi: 0 },
  ],
  [
    { jenis: "potong", benda: "puding", sisa: "seperempat", variasi: 2 },
    { jenis: "potong", benda: "roti", sisa: "setengah", variasi: 3 },
    { jenis: "gelas", nama: "Gelas jus", level: 0.25, warna: "#FB923C" },
    { jenis: "potong", benda: "kueBolu", sisa: "tidakSama", variasi: 1 },
    { jenis: "potong", benda: "pizza", sisa: "setengah", variasi: 2 },
    { jenis: "gelas", nama: "Gelas jus", level: 0.5, warna: "#FB923C" },
    { jenis: "potong", benda: "semangka", sisa: "utuh", variasi: 0 },
    { jenis: "potong", benda: "jeruk", sisa: "tigaPerempat", variasi: 3 },
  ],
];
export function itemSetengah(it: ItemSetengah): boolean {
  if (it.jenis === "gelas") return Math.abs(it.level - 0.5) < 0.01;
  return Math.abs(kepingSisa(it.benda, it.sisa, it.variasi).rasio - 0.5) < 0.011;
}
export function namaItemSetengah(it: ItemSetengah): string {
  if (it.jenis === "gelas") return `${it.nama} terisi ${it.level === 0.5 ? "setengah" : it.level === 0.25 ? "seperempat" : it.level === 0.75 ? "tiga perempat" : "sebagian"}`;
  const n = BENDA_POTONG[it.benda].nama;
  return `${n}${it.sisa === "utuh" ? " utuh" : it.sisa === "setengah" ? " tinggal setengah" : it.sisa === "seperempat" ? " tinggal seperempat" : it.sisa === "tigaPerempat" ? " tinggal tiga perempat" : " dipotong tidak sama besar"}`;
}

/* ------------------------- A2 dan C2. Melipat kertas ------------------------- */

export type PilihanLipat = { id: string; label: string; garis: Garis };
export type RondeLipat = { bentuk: IdBentukP; nama: string; warna: string; pilihan: PilihanLipat[]; perluCara: number };

export const RONDE_LIPAT_A: RondeLipat[] = [
  {
    bentuk: "persegi",
    nama: "kertas persegi",
    warna: "#F87171",
    perluCara: 4,
    pilihan: [
      { id: "tegak", label: "Lipat dari atas ke bawah di tengah", garis: [[50, 10], [50, 90]] },
      { id: "datar", label: "Lipat dari kiri ke kanan di tengah", garis: [[10, 50], [90, 50]] },
      { id: "miring1", label: "Lipat dari pojok kiri atas ke pojok kanan bawah", garis: [[10, 10], [90, 90]] },
      { id: "miring2", label: "Lipat dari pojok kanan atas ke pojok kiri bawah", garis: [[90, 10], [10, 90]] },
      { id: "sepertiga", label: "Lipat di sepertiga bagian kiri", garis: [[37, 10], [37, 90]] },
      { id: "sudutTengah", label: "Lipat dari tengah sisi kiri ke pojok kanan atas", garis: [[10, 50], [90, 10]] },
    ],
  },
  {
    bentuk: "lingkaran",
    nama: "kertas lingkaran",
    warna: "#60A5FA",
    perluCara: 3,
    pilihan: [
      { id: "d0", label: "Lipat mendatar lewat titik tengah", garis: [[8, 50], [92, 50]] },
      { id: "d90", label: "Lipat tegak lewat titik tengah", garis: [[50, 8], [50, 92]] },
      { id: "d45", label: "Lipat miring ke kanan lewat titik tengah", garis: [[20.3, 20.3], [79.7, 79.7]] },
      { id: "d135", label: "Lipat miring ke kiri lewat titik tengah", garis: [[79.7, 20.3], [20.3, 79.7]] },
      { id: "geser", label: "Lipat mendatar di atas titik tengah", garis: [[13, 30], [87, 30]] },
    ],
  },
  {
    bentuk: "segitiga",
    nama: "kertas segitiga",
    warna: "#FBBF24",
    perluCara: 1,
    pilihan: [
      { id: "tengah", label: "Lipat dari puncak ke tengah alas", garis: [[50, 10], [50, 88]] },
      { id: "tengahAlas", label: "Lipat mendatar di setengah tinggi", garis: [[0, 49], [100, 49]] },
      { id: "sisiKiri", label: "Lipat dari pojok kiri bawah ke tengah sisi kanan", garis: [[8, 88], [71, 49]] },
      { id: "sisiKanan", label: "Lipat dari pojok kanan bawah ke tengah sisi kiri", garis: [[92, 88], [29, 49]] },
    ],
  },
];

export type PilihanLipatDua = { pertama: PilihanLipat; kedua: PilihanLipat[] };
export type RondeLipatDua = { bentuk: IdBentukP; nama: string; warna: string; langkah: PilihanLipatDua[] };

export const RONDE_LIPAT_C: RondeLipatDua[] = [
  {
    bentuk: "persegi",
    nama: "kertas persegi",
    warna: "#4ADE80",
    langkah: [
      {
        pertama: { id: "tegak", label: "Lipat tegak di tengah", garis: [[50, 10], [50, 90]] },
        kedua: [
          { id: "datar", label: "Lipat lagi memanjang di tengah", garis: [[10, 50], [90, 50]] },
          { id: "tegak2", label: "Lipat lagi ke samping di tengah lipatan", garis: [[70, 10], [70, 90]] },
          { id: "miring", label: "Lipat lagi miring dari pojok ke pojok", garis: [[50, 10], [90, 90]] },
        ],
      },
      {
        pertama: { id: "datar", label: "Lipat mendatar di tengah", garis: [[10, 50], [90, 50]] },
        kedua: [
          { id: "tegak", label: "Lipat lagi tegak di tengah", garis: [[50, 10], [50, 90]] },
          { id: "datar2", label: "Lipat lagi mendatar di tengah lipatan", garis: [[10, 30], [90, 30]] },
          { id: "miring", label: "Lipat lagi miring dari pojok ke pojok", garis: [[10, 50], [90, 90]] },
        ],
      },
      {
        pertama: { id: "miring1", label: "Lipat miring dari pojok ke pojok", garis: [[10, 10], [90, 90]] },
        kedua: [
          { id: "sumbu", label: "Lipat lagi dari pojok siku-siku ke tengah", garis: [[90, 10], [50, 50]] },
          { id: "tengahSisi", label: "Lipat lagi dari tengah sisi ke tengah sisi", garis: [[50, 10], [90, 50]] },
          { id: "sepanjangSisi", label: "Lipat lagi sepanjang sisi atas", garis: [[10, 30], [90, 30]] },
        ],
      },
      {
        pertama: { id: "miring2", label: "Lipat miring dari pojok lain", garis: [[90, 10], [10, 90]] },
        kedua: [
          { id: "sumbu", label: "Lipat lagi dari pojok siku-siku ke tengah", garis: [[90, 90], [50, 50]] },
          { id: "tengahSisi", label: "Lipat lagi dari tengah sisi ke tengah sisi", garis: [[50, 90], [90, 50]] },
          { id: "sejajar", label: "Lipat lagi sejajar sisi bawah", garis: [[10, 70], [90, 70]] },
        ],
      },
    ],
  },
  {
    bentuk: "lingkaran",
    nama: "kertas lingkaran",
    warna: "#C084FC",
    langkah: [
      {
        pertama: { id: "d0", label: "Lipat mendatar lewat titik tengah", garis: [[8, 50], [92, 50]] },
        kedua: [
          { id: "tegak", label: "Lipat lagi tegak di tengah setengah lingkaran", garis: [[50, 8], [50, 92]] },
          { id: "sejajar", label: "Lipat lagi mendatar di tengah tinggi", garis: [[10, 29], [90, 29]] },
          { id: "miring", label: "Lipat lagi miring", garis: [[30, 50], [92, 20]] },
        ],
      },
      {
        pertama: { id: "d90", label: "Lipat tegak lewat titik tengah", garis: [[50, 8], [50, 92]] },
        kedua: [
          { id: "datar", label: "Lipat lagi mendatar di tengah", garis: [[8, 50], [92, 50]] },
          { id: "sejajar", label: "Lipat lagi tegak di tengah lebar", garis: [[71, 10], [71, 90]] },
          { id: "miring", label: "Lipat lagi miring", garis: [[50, 30], [92, 70]] },
        ],
      },
    ],
  },
];

export function lipatDuaSah(r: { bentuk: IdBentukP }, p: PilihanLipatDua, k: PilihanLipat): { pas1: boolean; pas2: boolean; keping: Titik[][]; sah: boolean } {
  const poly = BENTUK_P[r.bentuk].titik;
  const l1 = lipat(poly, p.pertama.garis[0], p.pertama.garis[1]);
  const l2 = lipat(l1.tetap, k.garis[0], k.garis[1]);
  const keping = l1.pas && l2.pas ? hasilLipatDua(poly, p.pertama.garis, k.garis) : [];
  return { pas1: l1.pas, pas2: l2.pas, keping, sah: l1.pas && l2.pas && keping.length === 4 && samaBesar(keping) };
}

/* ------------------------- A3. Tuang setengah ------------------------- */

export type RondeTuang = { nama: string; wadah: string; warna: string; total: number };
export const RONDE_TUANG_A: RondeTuang[] = [
  { nama: "air", wadah: "gelas", warna: "#38BDF8", total: 8 },
  { nama: "jus jeruk", wadah: "botol", warna: "#FB923C", total: 6 },
  { nama: "sirup", wadah: "gelas", warna: "#F43F5E", total: 10 },
];

/* ------------------------- A6, C6. Tarik garis ------------------------- */
export const RONDE_TARIK_A: IdBentukP[] = ["persegiPanjang", "segitiga", "lingkaran", "trapesium"];
export const RONDE_TARIK_C: IdBentukP[] = ["persegi", "persegiPanjang", "lingkaran", "belahKetupat"];

/* ------------------------- A5, C5. Warnai bagian ------------------------- */

export type FiguraWarna = { bentuk: IdBentukP; garis: Garis[] };
export type RondeWarnaiBagian = { target: number; teks: string; figura: FiguraWarna[] };

const EMPAT_STRIP_PP: Garis[] = [[[28, 0], [28, 100]], [[50, 0], [50, 100]], [[72, 0], [72, 100]]];
const sumbuBulat = (n: number): Garis[] => Array.from({ length: n }, (_, i) => dia((180 / n) * i));
const sumbuOktagon: Garis[] = [[[50, 0], [50, 100]], [[0, 50], [100, 50]], [[0, 0], [100, 100]], [[100, 0], [0, 100]]];

export const RONDE_WARNAI_A: RondeWarnaiBagian[] = [
  {
    target: 0.5,
    teks: "Warnai setengah dari tiap gambar.",
    figura: [
      { bentuk: "segitiga", garis: [[[50, 0], [50, 100]]] },
      { bentuk: "lingkaran", garis: [H] },
      { bentuk: "persegiPanjang", garis: [H] },
    ],
  },
  {
    target: 0.5,
    teks: "Warnai setengah dari tiap gambar.",
    figura: [
      { bentuk: "segiLima", garis: [[[50, 0], [50, 100]]] },
      { bentuk: "hati", garis: [[[50, 0], [50, 100]]] },
      { bentuk: "belahKetupat", garis: [[[50, 0], [50, 100]]] },
    ],
  },
  {
    target: 0.5,
    teks: "Gambar sudah dibagi menjadi empat bagian sama besar. Warnai setengah dari tiap gambar.",
    figura: [
      { bentuk: "persegi", garis: [V, H] },
      { bentuk: "lingkaran", garis: [H, [[50, 0], [50, 100]]] },
      { bentuk: "persegiPanjang", garis: EMPAT_STRIP_PP },
    ],
  },
];

export const RONDE_WARNAI_C: RondeWarnaiBagian[] = [
  {
    target: 0.25,
    teks: "Warnai seperempat dari tiap gambar.",
    figura: [
      { bentuk: "belahKetupat", garis: [[[50, 0], [50, 100]], [[0, 50], [100, 50]]] },
      { bentuk: "persegi", garis: [V, H] },
      { bentuk: "lingkaran", garis: [H, V] },
    ],
  },
  {
    target: 0.25,
    teks: "Warnai seperempat dari tiap gambar.",
    figura: [
      { bentuk: "persegiPanjang", garis: EMPAT_STRIP_PP },
      { bentuk: "segiDelapan", garis: [V, H] },
      { bentuk: "segiEnam", garis: [[[50, 0], [50, 100]], [[0, 50], [100, 50]]] },
    ],
  },
  {
    target: 0.25,
    teks: "Gambar sudah dibagi menjadi delapan bagian sama besar. Warnai seperempat dari tiap gambar.",
    figura: [
      { bentuk: "segiDelapan", garis: sumbuOktagon },
      { bentuk: "persegi", garis: [V, H, DIAG1, DIAG2] },
      { bentuk: "lingkaran", garis: sumbuBulat(4) },
    ],
  },
];

/** Keping tiap figura (urutan tetap), dan apakah setiap keping sama besar. */
export function kepingFigura(f: FiguraWarna): Titik[][] {
  return bagiBanyak(BENTUK_P[f.bentuk].titik, f.garis);
}
export function rasioWarna(f: FiguraWarna, diwarnai: readonly boolean[]): number {
  const k = kepingFigura(f);
  const total = luasTotal(k);
  return luasTotal(k.filter((_, i) => diwarnai[i])) / total;
}

/* ------------------------- A7, C7. Bagian yang diwarnai ------------------------- */

export type FiguraBayang = { id: string; bentuk: IdBentukP; garis: Garis[]; warnai: Titik[] };

/** Persentase luas yang diwarnai. */
export function rasioBayang(f: FiguraBayang): number {
  const poly = BENTUK_P[f.bentuk].titik;
  const keping = bagiBanyak(poly, f.garis);
  const diwarnai = keping.filter((k) => f.warnai.some((p) => titikDalam(p, k, 0)));
  return luasTotal(diwarnai) / luasTotal(keping);
}
export const adalahSetengah = (f: FiguraBayang) => Math.abs(rasioBayang(f) - 0.5) < 0.012;
export const adalahSeperempat = (f: FiguraBayang) => Math.abs(rasioBayang(f) - 0.25) < 0.012;

const KANAN: Titik = [75, 50];
const KIRI: Titik = [25, 50];

export const FIGURA_SETENGAH_A: FiguraBayang[] = [
  { id: "A", bentuk: "persegiPanjang", garis: [V], warnai: [[25, 50]] },
  { id: "B", bentuk: "segitiga", garis: [[[50, 0], [50, 100]]], warnai: [[30, 80]] },
  { id: "C", bentuk: "lingkaran", garis: [H], warnai: [[50, 75]] },
  { id: "D", bentuk: "hati", garis: [[[50, 0], [50, 100]]], warnai: [[30, 40]] },
  { id: "E", bentuk: "bintang", garis: [], warnai: [[50, 54]] },
  { id: "F", bentuk: "segiEnam", garis: [[[0, 72], [100, 72]]], warnai: [[50, 85]] },
  { id: "G", bentuk: "persegiPanjang", garis: [[[70, 0], [70, 100]]], warnai: [[85, 50]] },
  { id: "H", bentuk: "lingkaran", garis: [[[50, 0], [50, 100]]], warnai: [KANAN] },
];

export const FIGURA_SEPEREMPAT_C: FiguraBayang[] = [
  { id: "A", bentuk: "segitiga", garis: [[[50, 0], [50, 100]]], warnai: [[30, 80]] },
  { id: "B", bentuk: "persegi", garis: [V, H], warnai: [[25, 25]] },
  { id: "C", bentuk: "persegiPanjang", garis: EMPAT_STRIP_PP, warnai: [[14, 50]] },
  { id: "D", bentuk: "lingkaran", garis: [H, V], warnai: [[75, 25]] },
  { id: "E", bentuk: "segiLima", garis: [[[50, 0], [50, 100]]], warnai: [[30, 60]] },
  { id: "F", bentuk: "persegi", garis: [V], warnai: [KIRI] },
  { id: "G", bentuk: "belahKetupat", garis: [[[50, 0], [50, 100]], [[0, 50], [100, 50]]], warnai: [[65, 65]] },
  { id: "H", bentuk: "lingkaran", garis: [H], warnai: [[50, 75]] },
];

/** Hubungan satu bagian dengan keseluruhan: seperdua atau seperempat, atau bukan keduanya. */
export function hubunganBagian(f: FiguraBayang): "setengah" | "seperempat" | "lain" {
  const r = rasioBayang(f);
  if (Math.abs(r - 0.5) < 0.012) return "setengah";
  if (Math.abs(r - 0.25) < 0.012) return "seperempat";
  return "lain";
}

/* ------------------------- C3. Belah apel ------------------------- */
export const RONDE_BELAH_C: JenisPotong[] = ["apel", "puding", "kueBolu"];

/* ------------------------- C4. Susun potongan ------------------------- */
export type RondeSusun = { benda: JenisPotong; target: 1 | 2 | 4; kata: string };
export const RONDE_SUSUN_C: RondeSusun[] = [
  { benda: "martabak", target: 1, kata: "seperempat" },
  { benda: "pizza", target: 2, kata: "setengah" },
  { benda: "kueBolu", target: 4, kata: "satu utuh" },
];

/* ====================================================================== */
/* Kumpulan benda (Sub-Bab B)                                               */
/* ====================================================================== */

export type JenisItem = "kelereng" | "apel" | "pensil" | "ikan" | "jeruk" | "balon";
export const NAMA_ITEM: Record<JenisItem, { tunggal: string; jamak: string; warna: string[] }> = {
  kelereng: { tunggal: "kelereng", jamak: "kelereng", warna: ["#EF4444", "#3B82F6", "#22C55E", "#F59E0B", "#A855F7", "#14B8A6"] },
  apel: { tunggal: "apel", jamak: "apel", warna: ["#EF4444"] },
  pensil: { tunggal: "pensil", jamak: "pensil", warna: ["#EF4444", "#3B82F6", "#22C55E", "#F59E0B", "#EC4899"] },
  ikan: { tunggal: "ikan", jamak: "ikan", warna: ["#F97316", "#38BDF8"] },
  jeruk: { tunggal: "jeruk", jamak: "jeruk", warna: ["#FB923C"] },
  balon: { tunggal: "balon", jamak: "balon", warna: ["#EF4444", "#3B82F6", "#FACC15", "#22C55E"] },
};

export const setengahDari = (n: number) => n / 2;
export const bisaDibagiDua = (n: number) => Number.isInteger(n) && n > 0 && n % 2 === 0;

export const RONDE_BAGI_B: { item: JenisItem; n: number }[] = [
  { item: "kelereng", n: 4 },
  { item: "kelereng", n: 6 },
  { item: "kelereng", n: 8 },
  { item: "kelereng", n: 10 },
];
export const RONDE_NERACA_B: { item: JenisItem; n: number }[] = [
  { item: "apel", n: 6 },
  { item: "apel", n: 8 },
  { item: "apel", n: 10 },
  { item: "apel", n: 12 },
];
export const RONDE_PASANG_B: { item: JenisItem; n: number }[] = [
  { item: "pensil", n: 6 },
  { item: "jeruk", n: 8 },
  { item: "balon", n: 7 },
  { item: "ikan", n: 10 },
];
export const RONDE_UTUH_B: { item: JenisItem; setengah: number }[] = [
  { item: "pensil", setengah: 3 },
  { item: "jeruk", setengah: 4 },
  { item: "ikan", setengah: 5 },
  { item: "balon", setengah: 2 },
];
export const RONDE_LINGKARI_B = [6, 8, 10, 12];

export type LarikTitik = { baris: number; kolom: number };
export const RONDE_PEMBAGI_B: LarikTitik[] = [
  { baris: 2, kolom: 4 },
  { baris: 3, kolom: 4 },
  { baris: 2, kolom: 5 },
  { baris: 3, kolom: 3 },
];
export type PemisahLarik = { arah: "tegak" | "datar"; posisi: number };
/** Semua garis pemisah yang membagi larik menjadi dua kelompok sama banyak. */
export function pemisahSah(l: LarikTitik): PemisahLarik[] {
  const hasil: PemisahLarik[] = [];
  for (let c = 1; c < l.kolom; c += 1) if (c * l.baris === (l.kolom - c) * l.baris) hasil.push({ arah: "tegak", posisi: c });
  for (let r = 1; r < l.baris; r += 1) if (r * l.kolom === (l.baris - r) * l.kolom) hasil.push({ arah: "datar", posisi: r });
  return hasil;
}
export const jumlahKiriPemisah = (l: LarikTitik, p: PemisahLarik) => (p.arah === "tegak" ? p.posisi * l.baris : p.posisi * l.kolom);

export const RONDE_SATU_B: { kiri: number; kanan: number }[] = [
  { kiri: 4, kanan: 4 },
  { kiri: 4, kanan: 2 },
  { kiri: 3, kanan: 3 },
  { kiri: 5, kanan: 3 },
];

/* ------------------------- Abstract B ------------------------- */

export const RONDE_TABEL_B: { judul: string; kepala: [string, string]; baris: { label: string; jawab: string }[]; kartu: string[] }[] = [
  {
    judul: "Tulis setengahnya",
    kepala: ["Kumpulan benda", "Setengahnya"],
    baris: [
      { label: "Setengah dari 4", jawab: "2" },
      { label: "Setengah dari 6", jawab: "3" },
      { label: "Setengah dari 8", jawab: "4" },
      { label: "Setengah dari 10", jawab: "5" },
    ],
    kartu: ["2", "3", "4", "5", "6", "7"],
  },
  {
    judul: "Tulis banyak seluruhnya",
    kepala: ["Setengahnya", "Seluruhnya"],
    baris: [
      { label: "Setengahnya 2", jawab: "4" },
      { label: "Setengahnya 5", jawab: "10" },
      { label: "Setengahnya 3", jawab: "6" },
      { label: "Setengahnya 4", jawab: "8" },
    ],
    kartu: ["4", "6", "8", "10", "12", "14"],
  },
];

export const RONDE_DETEKTIF_B: SoalDetektifTeks[] = [
  { petunjuk: ["Setengah dari bilanganku adalah 3.", "Aku bilangan paling kecil yang bisa dibagi dua sama banyak dan hasilnya 3."], opsi: ["4", "6", "8"], jawab: 1, salah: "Setengah dari 6 adalah 3. Setengah dari 4 adalah 2 dan setengah dari 8 adalah 4." },
  { petunjuk: ["Aku adalah banyak kelereng Malosi.", "Setengah dari kelerengku diberikan kepada Upe, dan Upe mendapat 2."], opsi: ["2", "4", "6"], jawab: 1, salah: "Upe mendapat 2, itu setengah dari kelereng Malosi. Jadi Malosi punya 4 kelereng." },
  { petunjuk: ["Aku bisa dibagi dua sama banyak.", "Setengah dari aku adalah 5."], opsi: ["5", "8", "10"], jawab: 2, salah: "Setengah dari 10 adalah 5. Dua kelompok berisi 5 dan 5." },
  { petunjuk: ["Aku lebih besar dari 10.", "Setengah dari aku adalah 6."], opsi: ["10", "12", "14"], jawab: 1, salah: "Setengah dari 12 adalah 6. Dua kelompok berisi 6 dan 6." },
];

export const RONDE_BISA_B: { bilangan: number }[][] = [
  [{ bilangan: 2 }, { bilangan: 4 }, { bilangan: 5 }, { bilangan: 6 }, { bilangan: 7 }, { bilangan: 8 }],
  [{ bilangan: 3 }, { bilangan: 9 }, { bilangan: 10 }, { bilangan: 11 }, { bilangan: 12 }, { bilangan: 14 }],
];

/* ====================================================================== */
/* Abstract A dan C                                                         */
/* ====================================================================== */

export const RONDE_KALIMAT_A: KalimatIsian[][] = [
  [
    { depan: "Satu martabak utuh dipotong menjadi", belakang: "bagian sama besar.", opsi: ["2", "3", "4"], benar: 0 },
    { depan: "Setiap potongan yang sama besar itu bernilai", belakang: ".", opsi: ["setengah", "seperempat", "satu utuh"], benar: 0 },
    { depan: "Setengah ditulis dengan lambang", belakang: ".", opsi: ["½", "¼", "1"], benar: 0 },
  ],
  [
    { depan: "Untuk menunjukkan setengah, dua bagian harus", belakang: ".", opsi: ["sama besar", "berbeda besar", "berwarna sama"], benar: 0 },
    { depan: "Dua setengah disatukan kembali menjadi", belakang: ".", opsi: ["satu utuh", "dua utuh", "seperempat"], benar: 0 },
    { depan: "Sebuah kue dipotong menjadi 2 bagian, tetapi satu bagian lebih besar. Itu", belakang: "setengah.", opsi: ["bukan", "tetap", "hampir"], benar: 0 },
  ],
];

export const RONDE_BENARSALAH_A: Pernyataan[][] = [
  [
    { teks: "Setengah artinya dua bagian yang sama besar.", benar: true, penjelasan: "Satu benda dibagi dua sama besar, setiap bagian bernilai setengah." },
    { teks: "Potongan yang tidak sama besar tetap disebut setengah.", benar: false, penjelasan: "Setengah harus sama besar. Potongan yang tidak sama besar bukan setengah." },
    { teks: "Satu semangka dipotong dua sama besar, tiap potongan adalah setengah semangka.", benar: true, penjelasan: "Dua bagian sama besar, jadi tiap bagian adalah setengah semangka." },
    { teks: "Kertas persegi hanya dapat dilipat dua sama besar dengan satu cara.", benar: false, penjelasan: "Persegi bisa dilipat tegak, mendatar, dan miring dua kali, jadi ada empat cara." },
    { teks: "Setengah gelas air berarti gelas terisi sampai tinggi yang sama dengan separuh gelas yang kosong.", benar: true, penjelasan: "Bagian yang berisi dan bagian yang kosong sama tingginya, jadi gelas terisi setengah." },
  ],
  [
    { teks: "Dua setengah dapat disatukan menjadi satu benda utuh.", benar: true, penjelasan: "Setengah ditambah setengah sama dengan satu utuh." },
    { teks: "Lingkaran yang dipotong lewat titik tengahnya menghasilkan dua bagian sama besar.", benar: true, penjelasan: "Garis yang lewat titik tengah lingkaran membagi lingkaran sama besar." },
    { teks: "Lingkaran yang dipotong di dekat tepinya menghasilkan dua setengah.", benar: false, penjelasan: "Potongan di dekat tepi membuat satu bagian kecil dan satu bagian besar, tidak sama besar." },
    { teks: "Segitiga bisa dibagi menjadi dua bagian sama besar.", benar: true, penjelasan: "Garis dari puncak ke tengah alas membagi segitiga sama besar." },
    { teks: "Warna yang berbeda pada dua bagian berarti bagian itu tidak sama besar.", benar: false, penjelasan: "Besar bagian ditentukan oleh luasnya, bukan oleh warnanya." },
  ],
];

export const PETA_KONSEP_A: { pusat: string; kotak: KotakPeta[] }[] = [
  {
    pusat: "Setengah dari benda utuh",
    kotak: [
      { label: "Setengah adalah", opsi: ["satu dari dua bagian yang sama besar", "satu dari empat bagian yang sama besar", "dua bagian yang berbeda besar"], benar: 0 },
      { label: "Contoh dari benda utuh", opsi: ["setengah semangka", "seperempat apel", "tiga potong kue"], benar: 0 },
      { label: "Bukan contoh", opsi: ["dua potongan yang tidak sama besar", "dua potongan yang sama besar", "satu semangka utuh dibelah dua"], benar: 0 },
      { label: "Menurutku, setengah adalah", opsi: ["hasil membagi sama besar menjadi dua", "bagian paling kecil dari benda", "bagian paling besar dari benda"], benar: 0 },
    ],
  },
  {
    pusat: "Setengah dari kumpulan benda",
    kotak: [
      { label: "Setengah adalah", opsi: ["satu dari dua kelompok yang sama banyak", "satu dari dua kelompok yang berbeda banyak", "semua benda dalam kumpulan"], benar: 0 },
      { label: "Contoh dari kumpulan", opsi: ["setengah dari 6 ikan adalah 3 ikan", "setengah dari 6 ikan adalah 4 ikan", "setengah dari 6 ikan adalah 2 ikan"], benar: 0 },
      { label: "Bukan contoh", opsi: ["6 ikan dibagi menjadi 4 dan 2", "6 ikan dibagi menjadi 3 dan 3", "8 pensil dibagi menjadi 4 dan 4"], benar: 0 },
      { label: "Menurutku, setengah adalah", opsi: ["hasil membagi sama banyak menjadi dua kelompok", "kelompok yang lebih banyak", "bilangan yang paling kecil"], benar: 0 },
    ],
  },
];

export type PasanganTeks = { kiri: { id: string; teks: string }[]; kanan: { id: string; teks: string }[] };
export const RONDE_PASANG_C: PasanganTeks[] = [
  {
    kiri: [
      { id: "setengah", teks: "setengah" },
      { id: "seperempat", teks: "seperempat" },
      { id: "utuh", teks: "satu utuh" },
    ],
    kanan: [
      { id: "seperempat", teks: "¼" },
      { id: "utuh", teks: "1" },
      { id: "setengah", teks: "½" },
    ],
  },
  {
    kiri: [
      { id: "setengah", teks: "½" },
      { id: "seperempat", teks: "¼" },
      { id: "utuh", teks: "1" },
    ],
    kanan: [
      { id: "utuh", teks: "tidak dibagi, ambil semuanya" },
      { id: "setengah", teks: "dua bagian sama besar, ambil satu" },
      { id: "seperempat", teks: "empat bagian sama besar, ambil satu" },
    ],
  },
];

export const RONDE_TABEL_C: { judul: string; kepala: [string, string]; baris: { label: string; jawab: string }[]; kartu: string[] }[] = [
  {
    judul: "Tulis banyak bagiannya",
    kepala: ["Hubungan", "Bagian"],
    baris: [
      { label: "1 utuh sama dengan … setengah", jawab: "2" },
      { label: "1 utuh sama dengan … seperempat", jawab: "4" },
      { label: "1 setengah sama dengan … seperempat", jawab: "2" },
      { label: "2 setengah sama dengan … utuh", jawab: "1" },
    ],
    kartu: ["1", "2", "3", "4"],
  },
  {
    judul: "Tulis namanya",
    kepala: ["Hubungan", "Hasil"],
    baris: [
      { label: "Setengah dari satu utuh adalah", jawab: "setengah" },
      { label: "Setengah dari setengah adalah", jawab: "seperempat" },
      { label: "Dua seperempat digabung menjadi", jawab: "setengah" },
      { label: "Empat seperempat digabung menjadi", jawab: "satu utuh" },
    ],
    kartu: ["setengah", "seperempat", "satu utuh"],
  },
];

export const PETA_KONSEP_C: { pusat: string; kotak: KotakPeta[] }[] = [
  {
    pusat: "Seperempat dari benda utuh",
    kotak: [
      { label: "Seperempat adalah", opsi: ["satu dari empat bagian yang sama besar", "satu dari dua bagian yang sama besar", "empat bagian yang berbeda besar"], benar: 0 },
      { label: "Contoh dari benda utuh", opsi: ["seperempat apel", "setengah apel", "satu apel utuh"], benar: 0 },
      { label: "Bukan contoh", opsi: ["empat potongan yang tidak sama besar", "empat potongan yang sama besar", "martabak dipotong empat sama besar"], benar: 0 },
      { label: "Menurutku, seperempat adalah", opsi: ["hasil membagi sama besar menjadi empat", "bagian yang lebih besar dari setengah", "benda yang belum dipotong"], benar: 0 },
    ],
  },
  {
    pusat: "Setengah dan seperempat",
    kotak: [
      { label: "Cara mendapat seperempat", opsi: ["potong dua sama besar, lalu potong lagi tiap bagian dua sama besar", "potong tiga bagian saja", "warnai seluruh gambar"], benar: 0 },
      { label: "Dua seperempat sama dengan", opsi: ["satu setengah", "satu utuh", "satu seperempat"], benar: 0 },
      { label: "Empat seperempat sama dengan", opsi: ["satu utuh", "satu setengah", "dua utuh"], benar: 0 },
      { label: "Menurutku, ketiganya", opsi: ["utuh, setengah, dan seperempat adalah bagian yang sama besar", "selalu sama besar apa pun bendanya", "tidak berhubungan"], benar: 0 },
    ],
  },
];

/** Urutan tampil tetap tanpa acak. */
export function urutanTetap(n: number, langkah = 3, geser = 0): number[] {
  const fpb = (x: number, y: number): number => (y === 0 ? x : fpb(y, x % y));
  let k = Math.max(1, langkah);
  while (fpb(n, k) !== 1) k += 1;
  return Array.from({ length: n }, (_, i) => (i * k + geser) % n);
}
export function opsiB5(n: number, batas: [number, number] = [0, 12]): number[] {
  let mulai = n - 1;
  if (mulai < batas[0]) mulai = batas[0];
  if (mulai + 2 > batas[1]) mulai = batas[1] - 2;
  const dasar = [mulai, mulai + 1, mulai + 2];
  const putar = n % 3;
  return [...dasar.slice(putar), ...dasar.slice(0, putar)];
}
