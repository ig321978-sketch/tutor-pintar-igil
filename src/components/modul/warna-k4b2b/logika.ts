/**
 * Logika murni Simulasi Bak Warna K4 Bab 2 Sub-Bab B "Bak Warna Pak Joyo", cerita Sanggar Batik Kampung Mekar.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-warna-k4b2b.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Banding (hitung isi kedua bak; alat menolak memilih tanda sebelum kedua bak dihitung), Isi (ketuk bagian bak sebanyak pembilang),
 * Urut (geser kartu pecahan sampai berurutan naik atau turun), Garis (geser titik pada garis dari nol sampai satu ke pecahan sasaran). Data ada di data-sim.ts.
 * Tipe KeadaanWarna (alat "warna") dipakai misi-k4bab2.ts.
 */
import { kataBilK4B2 } from "../eja-k4b2";
import { TARGET_BANDING, TARGET_GARIS, TARGET_ISI, TARGET_URUT } from "./data-sim";

export type ModeWarna = "banding" | "isi" | "urut" | "garis";

export type KeadaanWarna = {
  alat: "warna";
  mode: ModeWarna;
  /** Banding: sasaran ke berapa, bak pertama dan kedua sudah dihitung, tanda yang dipilih (-1 belum, 0 kurang dari, 1 lebih dari, 2 sama dengan), dan sasaran yang sudah benar. */
  bandKe: number;
  lihatA: boolean;
  lihatB: boolean;
  tandaPilih: number;
  bandBenar: number[];
  /** Isi: sasaran ke berapa, bagian bak yang terisi (nomor bagian dari kiri, mulai 0), dan sasaran yang sudah benar. */
  isiKe: number;
  isi: number[];
  isiBenar: number[];
  /** Urut: sasaran ke berapa, susunan kartu (pembilang) sekarang, kartu yang dipilih (-1 bila belum), sasaran naik dan turun yang sudah benar. */
  urutKe: number;
  susun: number[];
  urutSel: number;
  naikBenar: number[];
  turunBenar: number[];
  /** Garis: sasaran ke berapa, tanda tempat titik berada (0 sampai penyebut), sasaran yang sudah benar. */
  garisKe: number;
  titik: number;
  garisBenar: number[];
  /** Alat menolak (memilih tanda sebelum kedua bak dihitung). */
  tolak: boolean;
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalWarna = (): KeadaanWarna => ({
  alat: "warna",
  mode: "banding",
  bandKe: 0,
  lihatA: false,
  lihatB: false,
  tandaPilih: -1,
  bandBenar: [],
  isiKe: 0,
  isi: [],
  isiBenar: [],
  urutKe: 0,
  susun: [...TARGET_URUT[0].data],
  urutSel: -1,
  naikBenar: [],
  turunBenar: [],
  garisKe: 0,
  titik: 0,
  garisBenar: [],
  tolak: false,
  salah: 0,
});
export const mulaiLagiWarna = (): KeadaanWarna => awalWarna();
export const pilihModeWarna = (k: KeadaanWarna, mode: ModeWarna): KeadaanWarna => ({ ...k, mode });

/* ------------------------------ Kata dan tampilan ------------------------------ */
/** Nama bilangan 0 sampai 9.999 dalam kata (tanpa digit). */
export const kata = (n: number): string => kataBilK4B2(n);
/** Pecahan tertulis: "3/8". */
export const pec = (p: number, q: number): string => `${p}/${q}`;
/** Pecahan dalam kata: "tiga per delapan". */
export const sebutPec = (p: number, q: number): string => `${kata(p)} per ${kata(q)}`;
export const hurufBesar = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);
export const TANDA = ["<", ">", "="] as const;
export const NAMA_TANDA = ["kurang dari", "lebih dari", "sama dengan"] as const;
const naik = (d: readonly number[]): number[] => [...d].sort((a, b) => a - b);
const sama = (a: readonly number[], b: readonly number[]): boolean => a.length === b.length && a.every((x, i) => x === b[i]);

/* ------------------------------ Banding: hitung isi kedua bak ------------------------------ */
export const targetBanding = (k: KeadaanWarna) => TARGET_BANDING[k.bandKe % TARGET_BANDING.length];
/** Indeks tanda yang benar untuk sasaran sekarang: 0 kurang dari, 1 lebih dari, 2 sama dengan. Penyebutnya sama, jadi cukup membandingkan pembilang. */
export function tandaBenar(k: KeadaanWarna): number {
  const { a, b } = targetBanding(k);
  return a < b ? 0 : a > b ? 1 : 2;
}
/** Hitung isi satu bak (0 = bak pertama, 1 = bak kedua). Bak yang sudah dihitung tidak dihitung lagi. */
export function hitungBak(k: KeadaanWarna, i: 0 | 1): { k: KeadaanWarna; ok: boolean } {
  if (i === 0 ? k.lihatA : k.lihatB) return { k, ok: false };
  return { k: { ...k, ...(i === 0 ? { lihatA: true } : { lihatB: true }), tandaPilih: -1 }, ok: true };
}
/** Pilih tanda. Alat menolak (bukan percobaan keliru) bila kedua bak belum dihitung. */
export function pilihTanda(k: KeadaanWarna, t: number): { k: KeadaanWarna; ok: boolean } {
  if (t < 0 || t > 2) return { k, ok: false };
  if (!k.lihatA || !k.lihatB) return { k: { ...k, tolak: true }, ok: false };
  return { k: { ...k, tandaPilih: t }, ok: true };
}
export function periksaBanding(k: KeadaanWarna): { k: KeadaanWarna; ok: boolean } {
  if (k.lihatA && k.lihatB && k.tandaPilih === tandaBenar(k)) {
    return { k: { ...k, bandBenar: k.bandBenar.includes(k.bandKe) ? k.bandBenar : [...k.bandBenar, k.bandKe], bandKe: k.bandKe + 1, lihatA: false, lihatB: false, tandaPilih: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukBanding(k: KeadaanWarna): string {
  if (!k.lihatA && !k.lihatB) return "Belum ada bak yang dihitung. Tekan Hitung isi pada kedua bak dulu.";
  if (!k.lihatA || !k.lihatB) return "Masih ada bak yang belum dihitung. Hitung isi bak yang satunya juga.";
  if (k.tandaPilih < 0) return "Pilih satu tanda dulu.";
  return tandaBenar(k) === 2
    ? "Penyebutnya sama dan pembilangnya sama, jadi kedua pecahan sama besar."
    : "Penyebutnya sama, jadi bagiannya sama besar. Bandingkan pembilang kedua pecahan: pembilang yang lebih besar berarti pecahan yang lebih besar.";
}
export function kalimatBanding(k: KeadaanWarna): string {
  if (k.bandBenar.length > 0 && !k.lihatA && !k.lihatB && k.tandaPilih < 0) return "Betul! Ada pasangan bak berikutnya.";
  if (!k.lihatA && !k.lihatB) return "Tekan Hitung isi pada kedua bak untuk melihat pecahannya.";
  if (!k.lihatA || !k.lihatB) return "Satu bak sudah dihitung. Hitung bak yang satunya juga.";
  return k.tandaPilih < 0 ? "Kedua bak sudah dihitung. Pilih tandanya, lalu tekan Periksa." : "Tanda sudah dipilih. Tekan Periksa.";
}

/* ------------------------------ Isi bak ------------------------------ */
export const targetIsi = (k: KeadaanWarna) => TARGET_ISI[k.isiKe % TARGET_ISI.length];
/** Ketuk satu bagian bak: bagian kosong menjadi terisi, bagian terisi menjadi kosong. */
export function ketukBagian(k: KeadaanWarna, i: number): { k: KeadaanWarna; ok: boolean } {
  const t = targetIsi(k);
  if (!Number.isInteger(i) || i < 0 || i >= t.q) return { k, ok: false };
  const isi = k.isi.includes(i) ? k.isi.filter((x) => x !== i) : [...k.isi, i].sort((a, b) => a - b);
  return { k: { ...k, isi }, ok: true };
}
export function periksaIsi(k: KeadaanWarna): { k: KeadaanWarna; ok: boolean } {
  const t = targetIsi(k);
  if (k.isi.length === t.p) {
    return { k: { ...k, isiBenar: k.isiBenar.includes(k.isiKe) ? k.isiBenar : [...k.isiBenar, k.isiKe], isiKe: k.isiKe + 1, isi: [] }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukIsi(k: KeadaanWarna): string {
  const t = targetIsi(k);
  if (k.isi.length === 0) return "Belum ada bagian yang diisi. Ketuk bagian bak sebanyak pembilang pecahan sasaran.";
  if (k.isi.length < t.p) return "Bagian yang terisi masih kurang dari pembilang. Ketuk bagian bak yang lain.";
  return "Bagian yang terisi lebih banyak dari pembilang. Ketuk bagian yang terisi untuk mengosongkannya.";
}
export function kalimatIsi(k: KeadaanWarna): string {
  if (k.isiBenar.length > 0 && k.isi.length === 0 && k.isiKe > 0) return "Betul! Ada bak berikutnya.";
  return "Ketuk bagian bak sampai isinya sesuai pecahan sasaran, lalu tekan Periksa.";
}

/* ------------------------------ Urutkan kartu ------------------------------ */
export const targetUrut = (k: KeadaanWarna) => TARGET_URUT[k.urutKe % TARGET_URUT.length];
/** Susunan pembilang yang benar untuk sasaran sekarang. */
export const urutanBenar = (k: KeadaanWarna): number[] => {
  const t = targetUrut(k);
  return t.arah === "naik" ? naik(t.data) : naik(t.data).reverse();
};
export function pilihKartu(k: KeadaanWarna, i: number): KeadaanWarna {
  return i < 0 || i >= k.susun.length ? k : { ...k, urutSel: i };
}
/** Geser kartu yang dipilih satu tempat ke kiri (delta -1) atau kanan (delta 1) dengan menukar tetangganya. */
export function geserKartu(k: KeadaanWarna, delta: -1 | 1): { k: KeadaanWarna; ok: boolean } {
  const i = k.urutSel;
  const j = i + delta;
  if (i < 0 || j < 0 || j >= k.susun.length) return { k, ok: false };
  const susun = [...k.susun];
  [susun[i], susun[j]] = [susun[j], susun[i]];
  return { k: { ...k, susun, urutSel: j }, ok: true };
}
export function periksaUrut(k: KeadaanWarna): { k: KeadaanWarna; ok: boolean } {
  if (sama(k.susun, urutanBenar(k))) {
    const t = targetUrut(k);
    const ke = k.urutKe + 1;
    const dasar = { ...k, urutKe: ke, susun: [...TARGET_URUT[ke % TARGET_URUT.length].data], urutSel: -1 };
    return {
      k: t.arah === "naik" ? { ...dasar, naikBenar: k.naikBenar.includes(k.urutKe) ? k.naikBenar : [...k.naikBenar, k.urutKe] } : { ...dasar, turunBenar: k.turunBenar.includes(k.urutKe) ? k.turunBenar : [...k.turunBenar, k.urutKe] },
      ok: true,
    };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukUrut(k: KeadaanWarna): string {
  const t = targetUrut(k);
  if (sama(k.susun, t.data)) return "Kartu belum digeser. Pilih satu kartu, lalu geser ke kiri atau ke kanan sampai pecahan berurutan.";
  if (sama(k.susun, [...urutanBenar(k)].reverse())) return t.arah === "naik" ? "Urutannya terbalik. Susun dari yang terkecil di kiri sampai yang terbesar di kanan." : "Urutannya terbalik. Susun dari yang terbesar di kiri sampai yang terkecil di kanan.";
  return "Masih ada kartu yang belum pada tempatnya. Penyebutnya sama, jadi bandingkan pembilang dua kartu yang bersebelahan, lalu tukar bila perlu.";
}
export function kalimatUrut(k: KeadaanWarna): string {
  const t = targetUrut(k);
  if ((k.naikBenar.length > 0 || k.turunBenar.length > 0) && sama(k.susun, t.data) && k.urutSel < 0) return "Betul! Ada kartu berikutnya.";
  return t.arah === "naik" ? "Geser kartu sampai berurutan dari yang terkecil ke yang terbesar, lalu tekan Periksa." : "Geser kartu sampai berurutan dari yang terbesar ke yang terkecil, lalu tekan Periksa.";
}

/* ------------------------------ Garis pecahan ------------------------------ */
export const targetGaris = (k: KeadaanWarna) => TARGET_GARIS[k.garisKe % TARGET_GARIS.length];
/** Tanda yang benar untuk sasaran sekarang (dihitung dari data): pembilang sasaran. */
export const tandaSasaran = (k: KeadaanWarna): number => targetGaris(k).p;
/** Geser titik satu tanda ke kiri (delta -1) atau kanan (delta 1). Berhenti di nol dan di satu (tanda ke-q). */
export function geserTitik(k: KeadaanWarna, delta: -1 | 1): { k: KeadaanWarna; ok: boolean } {
  const baru = k.titik + delta;
  if (baru < 0 || baru > targetGaris(k).q) return { k, ok: false };
  return { k: { ...k, titik: baru }, ok: true };
}
export function periksaGaris(k: KeadaanWarna): { k: KeadaanWarna; ok: boolean } {
  if (k.titik === tandaSasaran(k)) {
    const ke = k.garisKe + 1;
    return { k: { ...k, garisBenar: k.garisBenar.includes(k.garisKe) ? k.garisBenar : [...k.garisBenar, k.garisKe], garisKe: ke, titik: 0 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukGaris(k: KeadaanWarna): string {
  if (k.titik === 0) return "Titik belum digeser. Geser titik ke kanan sampai di pecahan sasaran.";
  if (k.titik < tandaSasaran(k)) return "Titik masih di sebelah kiri pecahan sasaran. Geser titik ke kanan, karena pecahan yang lebih besar ada di kanan.";
  return "Titik sudah lewat pecahan sasaran. Geser titik ke kiri, karena pecahan yang lebih kecil ada di kiri.";
}
export function kalimatGaris(k: KeadaanWarna): string {
  if (k.garisBenar.length > 0 && k.titik === 0 && k.garisKe > 0) return "Betul! Ada garis berikutnya.";
  return "Geser titik sampai di pecahan sasaran, lalu tekan Periksa.";
}
