/**
 * Tata letak dan pemeriksa kanvas Kelas 1 Bab 1 Sub-Bab B (tanpa React, diuji di Node: scripts/uji-banding-k1b1b.mjs).
 * Kanvas adegan 300 x 200. Memakai ulang pemeriksa Sub-Bab A (lingkari, titik di dalam goresan, ucapan, tulisan angka).
 */
import { diDalam, periksaLingkari, type Goresan, type Titik } from "../lemari-k1b1a/periksa-jawab";

export { bilanganDariUcapan, periksaLingkari, periksaTulis, LEBAR_ADEGAN, TINGGI_ADEGAN, type Goresan, type Titik } from "../lemari-k1b1a/periksa-jawab";

/* ------------------------------ Tata letak ------------------------------ */
const tengah = (n: number, jarak: number, y: number): Titik[] => Array.from({ length: n }, (_, i) => ({ x: Math.round(150 - ((n - 1) * jarak) / 2 + i * jarak), y }));

/** Dua barisan untuk memasangkan: atas (a) dan bawah (b). Barisan atas renggang memakai lebar penuh. */
export function tataPasang(a: number, b: number, renggang = false): { atas: Titik[]; bawah: Titik[] } {
  const jAtas = renggang && a > 1 ? Math.min(84, 250 / (a - 1)) : 28;
  return { atas: tengah(a, jAtas, 48), bawah: tengah(b, 28, 152) };
}

/** Dua bingkai sepuluh berdampingan: pojok kiri-atas dan ukuran sel. */
export const BINGKAI = { sel: 26, y: 62, x: [16, 154] as const };
export const pusatBingkai = (k: 0 | 1): Titik => ({ x: BINGKAI.x[k] + BINGKAI.sel * 2.5, y: BINGKAI.y + BINGKAI.sel });
export const pusatSel = (k: 0 | 1, i: number): Titik => ({ x: BINGKAI.x[k] + (i % 5) * BINGKAI.sel + BINGKAI.sel / 2, y: BINGKAI.y + Math.floor(i / 5) * BINGKAI.sel + BINGKAI.sel / 2 });

/** Garis (ubin, garis bilangan, atau deret angka) nol sampai sepuluh. Penanda a lebih tinggi daripada penanda b. */
export const GARIS = { x0: 20, jarak: 26, y: 160, ya: 82, yb: 120 };
export const xAngka = (n: number): number => GARIS.x0 + n * GARIS.jarak;
export const penandaGaris = (a: number, b: number): [Titik, Titik] => [
  { x: xAngka(a), y: GARIS.ya },
  { x: xAngka(b), y: GARIS.yb },
];

/** Satu lebih atau satu sedikit: barisan a benda dan (bila arah lebih) satu kotak kosong di ujung kanan. */
export function tataSatu(a: number, lebih: boolean): { benda: Titik[]; kosong: { x: number; y: number; w: number; h: number } | null } {
  const n = lebih ? a + 1 : a;
  const pts = tengah(Math.max(n, 1), 26, 100);
  const benda = pts.slice(0, a);
  const p = pts[n - 1];
  return { benda, kosong: lebih ? { x: p.x - 13, y: p.y - 18, w: 26, h: 36 } : null };
}

/* ------------------------------ Pemeriksa ------------------------------ */
const dekat = (p: Titik, q: Titik, r: number) => Math.hypot(p.x - q.x, p.y - q.y) <= r;
const terdekat = (p: Titik, pts: readonly Titik[], r: number): number => {
  let terbaik = -1;
  let jarak = Infinity;
  pts.forEach((q, i) => {
    const d = Math.hypot(p.x - q.x, p.y - q.y);
    if (d <= r && d < jarak) {
      jarak = d;
      terbaik = i;
    }
  });
  return terbaik;
};

/**
 * Garis pasangan di kanvas: tiap goresan dari satu benda atas ke satu benda bawah (atau sebaliknya).
 * Benar bila banyak garis sah = yang lebih sedikit, tiap benda paling banyak satu garis, dan tidak ada goresan nyasar.
 */
export function periksaGarisPasang(gs: readonly Goresan[], atas: readonly Titik[], bawah: readonly Titik[], r = 20): { benar: boolean; pasang: number; nyasar: number; dobel: number } {
  const pakaiA = new Set<number>();
  const pakaiB = new Set<number>();
  let nyasar = 0;
  let dobel = 0;
  for (const g of gs) {
    if (g.length < 2) {
      nyasar += 1;
      continue;
    }
    const p = g[0];
    const q = g[g.length - 1];
    let i = terdekat(p, atas, r);
    let j = terdekat(q, bawah, r);
    if (i < 0 || j < 0) {
      i = terdekat(q, atas, r);
      j = terdekat(p, bawah, r);
    }
    if (i < 0 || j < 0) {
      nyasar += 1;
      continue;
    }
    if (pakaiA.has(i) || pakaiB.has(j)) dobel += 1;
    pakaiA.add(i);
    pakaiB.add(j);
  }
  const pasang = Math.min(pakaiA.size, pakaiB.size);
  return { benar: nyasar === 0 && dobel === 0 && pasang === Math.min(atas.length, bawah.length), pasang, nyasar, dobel };
}

/** Lingkari satu sasaran di antara dua (bingkai atau penanda). `k`: nomor sasaran yang benar. */
export const periksaLingkariSatu = (gs: readonly Goresan[], pusat: readonly Titik[], k: number) =>
  periksaLingkari(
    gs,
    pusat,
    pusat.map((_, i) => i === k),
  );

/** Gambar satu lagi: semua goresan berada di dalam kotak kosong (boleh bulatan atau titik), paling sedikit satu goresan. */
export function periksaSatuLagi(gs: readonly Goresan[], kotak: { x: number; y: number; w: number; h: number }, longgar = 10): boolean {
  if (gs.length === 0) return false;
  return gs.every((g) => g.every((t) => t.x >= kotak.x - longgar && t.x <= kotak.x + kotak.w + longgar && t.y >= kotak.y - longgar && t.y <= kotak.y + kotak.h + longgar));
}

/** Coret satu: goresan mengenai tepat satu benda, dan tidak ada goresan yang jauh dari semua benda. */
export function periksaCoretSatu(gs: readonly Goresan[], benda: readonly Titik[], r = 14): { benar: boolean; kena: number; nyasar: number } {
  const kena = new Set<number>();
  let nyasar = 0;
  for (const g of gs) {
    const sentuh = new Set<number>();
    for (const t of g) benda.forEach((b, i) => dekat(t, b, r) && sentuh.add(i));
    if (sentuh.size === 0) nyasar += 1;
    sentuh.forEach((i) => kena.add(i));
  }
  return { benar: kena.size === 1 && nyasar === 0, kena: kena.size, nyasar };
}

/** Titik di dalam goresan tertutup (dipakai uji dan tampilan). */
export { diDalam };
