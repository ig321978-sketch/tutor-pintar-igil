/**
 * Logika murni diagram batang Kelas 4 Bab 6 Sub-Bab B "Diagram Batang Pak Dodi" (akhir cerita Bazar Kuliner Sekolah).
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-bazar-k4b6b.mjs.
 * Diagram digambar SUNGGUH dari data: tinggi (atau panjang) batang dihitung dari banyak data dan tingkatan sumbu,
 * ujung batang tepat pada garis skala, dan label sumbu tidak bertabrakan (jarak antar garis cukup untuk huruf 10 piksel).
 */

export type Arah = "tegak" | "datar";
export type Tingkat = 1 | 2 | 5 | 10;
export type Batang = { nama: string; banyak: number; ikon?: string };
/** `maks` (opsional): angka terbesar sumbu yang dikunci, dipakai Simulasi saat batang masih dibangun. */
export type Diagram = { id: string; judul: string; satuan: string; tingkat: Tingkat; arah: Arah; batang: Batang[]; maks?: number };

/** Angka terbesar pada sumbu: kelipatan tingkat yang paling kecil dan tidak kurang dari batang tertinggi. */
export const maksSumbu = (d: Diagram): number => d.maks ?? Math.ceil(Math.max(...d.batang.map((b) => b.banyak)) / d.tingkat) * d.tingkat;
/** Banyak garis skala di atas nol. */
export const banyakGaris = (d: Diagram): number => maksSumbu(d) / d.tingkat;
/** Garis ke berapa ujung sebuah batang berhenti (dihitung dari nol). */
export const garisBatang = (d: Diagram, i: number): number => d.batang[i].banyak / d.tingkat;
/** Angka pada sumbu: nol, tingkat, dua tingkat, dan seterusnya. */
export const angkaSumbu = (d: Diagram): number[] => Array.from({ length: banyakGaris(d) + 1 }, (_, k) => k * d.tingkat);

/** Diagram sah: data habis dibagi tingkat, garis skala 2 sampai 9, tiga sampai lima batang, nama dan banyak berbeda tiap batang. */
export function diagramSah(d: Diagram): boolean {
  const n = banyakGaris(d);
  return (
    d.batang.length >= 3 &&
    d.batang.length <= 5 &&
    n >= 2 &&
    n <= 9 &&
    d.batang.every((b) => Number.isInteger(b.banyak) && b.banyak > 0 && b.banyak % d.tingkat === 0) &&
    new Set(d.batang.map((b) => b.nama)).size === d.batang.length &&
    new Set(d.batang.map((b) => b.banyak)).size === d.batang.length
  );
}

const indeksDari = (d: Diagram, f: (a: number, b: number) => boolean): number => d.batang.reduce((p, b, i) => (f(b.banyak, d.batang[p].banyak) ? i : p), 0);
/** Indeks batang tertinggi (paling banyak) dan terpendek (paling sedikit). */
export const indeksTerbanyak = (d: Diagram): number => indeksDari(d, (a, b) => a > b);
export const indeksTersedikit = (d: Diagram): number => indeksDari(d, (a, b) => a < b);
export const selisihBatang = (d: Diagram, a: number, b: number): number => Math.abs(d.batang[a].banyak - d.batang[b].banyak);
export const jumlahBatang = (d: Diagram): number => d.batang.reduce((s, b) => s + b.banyak, 0);
/** Nama jenis yang ujung batangnya berhenti tepat di garis ke-k, atau null. */
export const namaDiGaris = (d: Diagram, k: number): string | null => d.batang.find((b) => b.banyak === k * d.tingkat)?.nama ?? null;

/* ------------------------------ Geometri gambar ------------------------------ */
export const LEBAR_GAMBAR = 220;
export const TINGGI_TEGAK = 184;
export const TINGGI_DATAR = 184;
/** Jarak paling kecil antar garis skala supaya angka sumbu (huruf 10 piksel) tidak bertabrakan. */
export const JARAK_LABEL_MIN = 12;

export type GarisSkala = { k: number; angka: number; pos: number };
export type KotakBatang = { i: number; nama: string; banyak: number; x: number; y: number; w: number; h: number; ujung: number };
export type Geo = {
  arah: Arah;
  lebar: number;
  tinggi: number;
  /** Area gambar batang (kiri, atas, kanan, bawah). Nol berada pada bawah (tegak) atau kiri (datar). */
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  garis: GarisSkala[];
  batang: KotakBatang[];
  jarakGaris: number;
};
const b2 = (n: number): number => Math.round(n * 100) / 100;

/** Rancang gambar diagram. Posisi garis skala dan ujung batang memakai rumus yang sama, jadi ujung batang tepat pada garis. */
export function rancang(d: Diagram): Geo {
  const n = banyakGaris(d);
  const m = d.batang.length;
  if (d.arah === "tegak") {
    const [x0, y0, x1, y1] = [30, 24, 214, 134];
    const pos = (k: number) => b2(y1 - (k * (y1 - y0)) / n);
    const slot = (x1 - x0) / m;
    const w = b2(slot * 0.56);
    return {
      arah: d.arah,
      lebar: LEBAR_GAMBAR,
      tinggi: TINGGI_TEGAK,
      x0,
      y0,
      x1,
      y1,
      garis: Array.from({ length: n + 1 }, (_, k) => ({ k, angka: k * d.tingkat, pos: pos(k) })),
      batang: d.batang.map((b, i) => {
        const ujung = pos(b.banyak / d.tingkat);
        return { i, nama: b.nama, banyak: b.banyak, x: b2(x0 + i * slot + (slot - w) / 2), y: ujung, w, h: b2(y1 - ujung), ujung };
      }),
      jarakGaris: b2((y1 - y0) / n),
    };
  }
  const [x0, y0, x1, y1] = [60, 14, 176, 136];
  const pos = (k: number) => b2(x0 + (k * (x1 - x0)) / n);
  const slot = (y1 - y0) / m;
  const h = b2(slot * 0.56);
  return {
    arah: d.arah,
    lebar: LEBAR_GAMBAR,
    tinggi: TINGGI_DATAR,
    x0,
    y0,
    x1,
    y1,
    garis: Array.from({ length: n + 1 }, (_, k) => ({ k, angka: k * d.tingkat, pos: pos(k) })),
    batang: d.batang.map((b, i) => {
      const ujung = pos(b.banyak / d.tingkat);
      return { i, nama: b.nama, banyak: b.banyak, x: x0, y: b2(y0 + i * slot + (slot - h) / 2), w: b2(ujung - x0), h, ujung };
    }),
    jarakGaris: b2((x1 - x0) / n),
  };
}

/** Panjang batang (tinggi bila tegak, panjang bila datar) pada gambar. */
export const ukuranBatang = (g: Geo, i: number): number => (g.arah === "tegak" ? g.batang[i].h : g.batang[i].w);
/** Posisi ujung batang yang dibaca pada gambar (y bila tegak, x bila datar). */
export const ujungBatang = (g: Geo, i: number): number => g.batang[i].ujung;

/** Batang mini untuk sel tabel (Infografis): sumbu bertingkat `tingkat`, garis sampai `n`, panjang `luas` piksel. Ujung tepat pada garis. */
export function batangMini(banyak: number, tingkat: number, n: number, luas: number): { garis: number[]; ujung: number } {
  const garis = Array.from({ length: n + 1 }, (_, k) => b2((k * luas) / n));
  return { garis, ujung: garis[banyak / tingkat] };
}
