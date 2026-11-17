/**
 * Tata letak dan pemeriksa kanvas Kelas 1 Bab 1 Sub-Bab C (tanpa React, diuji di Node: scripts/uji-loteng-k1b1c.mjs).
 * Kanvas adegan 300 x 200. Memakai ulang pemeriksa Sub-Bab A (lingkari, tanda satu per satu, ucapan, tulisan angka).
 */
import { periksaCentang, periksaLingkari, type Goresan, type Titik } from "../lemari-k1b1a/periksa-jawab";
import type { Rupa } from "./logika";

export { bilanganDariUcapan, periksaCentang, periksaLingkari, LEBAR_ADEGAN, TINGGI_ADEGAN, type Goresan, type Titik } from "../lemari-k1b1a/periksa-jawab";

/* ------------------------------ Susun: letak kartu tersebar ------------------------------ */
const LETAK_SUSUN: Titik[] = [
  { x: 52, y: 52 },
  { x: 150, y: 40 },
  { x: 248, y: 58 },
  { x: 92, y: 150 },
  { x: 210, y: 150 },
];
/** Letak kartu ke-i yang tampil (urutan tampil sudah diacak). */
export const letakSusun = (i: number): Titik => LETAK_SUSUN[i % LETAK_SUSUN.length];

/**
 * Hubungkan berurutan: goresan (satu atau beberapa, dibaca menurut urutan menggambar) harus melewati kartu
 * dalam urutan `urut` (letak kartu menurut urutan yang benar). Benar bila semua dilewati dan urutannya tepat.
 */
export function periksaUrutan(gs: readonly Goresan[], urut: readonly Titik[], r = 24): { benar: boolean; terlewat: number } {
  const titik = gs.flat();
  const pertama = urut.map((p) => titik.findIndex((t) => Math.hypot(t.x - p.x, t.y - p.y) <= r));
  const terlewat = pertama.filter((i) => i < 0).length;
  const naik = pertama.every((v, i) => i === 0 || v > pertama[i - 1]);
  return { benar: terlewat === 0 && naik, terlewat };
}

/* ------------------------------ Jalur nol sampai sepuluh ------------------------------ */
export const JALUR = { x0: 12, s: 25, y: 110 };
/** Pusat tempat ke-n (0 sampai 10): anak tangga makin tinggi untuk benda, petak sebaris untuk diagram dan lambang. */
export function pusatJalur(rupa: Rupa, n: number): Titik {
  const x = JALUR.x0 + n * JALUR.s + JALUR.s / 2;
  if (rupa === "benda") return { x, y: puncakTangga(n) - 12 };
  return { x, y: JALUR.y + JALUR.s / 2 };
}
/** Tinggi puncak anak tangga ke-n (nol = lantai). */
export const puncakTangga = (n: number): number => 184 - (8 + n * 11);

/* ------------------------------ Hitung lanjut ------------------------------ */
/** Letak benda yang dihitung lanjut: maju = benda baru di kanan kotak; mundur = benda paling kanan yang diambil. */
export function tataLanjut(mulai: number, langkah: number, maju: boolean): { kotak: { x: number; y: number; w: number; h: number } | null; baris: Titik[]; dihitung: Titik[] } {
  if (maju) {
    const baris = Array.from({ length: langkah }, (_, i) => ({ x: 104 + i * 30, y: 100 }));
    return { kotak: { x: 14, y: 70, w: 70, h: 60 }, baris, dihitung: baris };
  }
  const baris = Array.from({ length: mulai }, (_, i) => ({ x: 30 + i * 26, y: 100 }));
  return { kotak: null, baris, dihitung: baris.slice(mulai - langkah).reverse() };
}
/** Deret angka nol sampai sepuluh untuk Abstract. */
export const xDeret = (n: number): number => 20 + n * 26;

/* ------------------------------ Tongkat ------------------------------ */
export const TONGKAT = { x0: 20, r: 26, y: 92 };
export const titikTongkat = (n: number): Titik => ({ x: TONGKAT.x0 + n * TONGKAT.r, y: TONGKAT.y + 8 });

/** Garis lompatan tongkat: satu goresan dari angka `dari` sampai angka `tutup` (atau sebaliknya). */
export function periksaLompat(gs: readonly Goresan[], dari: number, tutup: number, r = 16): boolean {
  const a = titikTongkat(dari);
  const b = titikTongkat(tutup);
  const dekat = (p: Titik, q: Titik) => Math.hypot(p.x - q.x, p.y - q.y) <= r;
  return gs.some((g) => g.length > 1 && ((dekat(g[0], a) && dekat(g[g.length - 1], b)) || (dekat(g[0], b) && dekat(g[g.length - 1], a))));
}

/** Lingkari satu tempat jalur di antara sebelas. */
export const periksaLingkariJalur = (gs: readonly Goresan[], rupa: Rupa, k: number) =>
  periksaLingkari(
    gs,
    Array.from({ length: 11 }, (_, n) => pusatJalur(rupa, n)),
    Array.from({ length: 11 }, (_, n) => n === k),
  );

/** Tanda satu per satu pada langkah yang dihitung lanjut. */
export const periksaTandaLanjut = (gs: readonly Goresan[], letak: readonly Titik[]) => periksaCentang(gs, letak, 13);
