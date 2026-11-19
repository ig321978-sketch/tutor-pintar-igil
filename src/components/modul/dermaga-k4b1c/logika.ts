/**
 * Logika murni Simulasi Papan Dermaga K4 Bab 1 Sub-Bab C "Papan Dermaga Kak Tiara", cerita Penginapan Pulau Karang Indah.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-dermaga-k4b1c.mjs. Eksplorasi bebas tanpa skor.
 * Tiga alat: Banding (lihat tempat dari kiri satu per satu; alat menolak memilih tanda sebelum angka berbeda pertama terlihat), Urut (geser kartu bilangan sampai berurutan naik atau turun),
 * Garis (geser titik pada garis bilangan ke bilangan sasaran). Data ada di data-sim.ts. Tipe KeadaanDermaga (alat "dermaga") dipakai misi-k4bab1.ts.
 */
import { kataBilK4B1 } from "../eja-k4b1";
import { TARGET_BANDING, TARGET_GARIS, TARGET_URUT } from "./data-sim";

export type ModeDermaga = "banding" | "urut" | "garis";

export type KeadaanDermaga = {
  alat: "dermaga";
  mode: ModeDermaga;
  /** Banding: sasaran ke berapa, berapa tempat yang sudah dilihat dari kiri (0 sampai 4), tanda yang dipilih (-1 belum, 0 kurang dari, 1 lebih dari, 2 sama dengan), sasaran yang sudah benar, dan apakah pasangan yang sama sudah dijawab benar. */
  bandKe: number;
  lihat: number;
  tandaPilih: number;
  bandBenar: number[];
  samaBenar: boolean;
  /** Urut: sasaran ke berapa, susunan kartu sekarang, kartu yang dipilih (-1 bila belum), sasaran naik dan turun yang sudah benar. */
  urutKe: number;
  susun: number[];
  urutSel: number;
  naikBenar: number[];
  turunBenar: number[];
  /** Garis: sasaran ke berapa, tanda tempat titik berada (0 sampai 10), sasaran yang sudah benar. */
  garisKe: number;
  titik: number;
  garisBenar: number[];
  /** Alat menolak (memilih tanda sebelum angka berbeda pertama terlihat). */
  tolak: boolean;
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalDermaga = (): KeadaanDermaga => ({
  alat: "dermaga",
  mode: "banding",
  bandKe: 0,
  lihat: 0,
  tandaPilih: -1,
  bandBenar: [],
  samaBenar: false,
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
export const mulaiLagiDermaga = (): KeadaanDermaga => awalDermaga();
export const pilihModeDermaga = (k: KeadaanDermaga, mode: ModeDermaga): KeadaanDermaga => ({ ...k, mode });

/* ------------------------------ Kata dan tampilan bilangan ------------------------------ */
/** Nama bilangan 0 sampai 10.000 dalam kata (tanpa digit): seribu, empat ribu tiga ratus lima puluh delapan. */
export const kata = (n: number): string => kataBilK4B1(n);
/** Bilangan dengan titik ribuan: 4358 menjadi "4.358". */
export const rb = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
export const hurufBesar = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);
export const NAMA_TEMPAT = ["ribuan", "ratusan", "puluhan", "satuan"] as const;
export const TANDA = ["<", ">", "="] as const;
export const NAMA_TANDA = ["kurang dari", "lebih dari", "sama dengan"] as const;
/** Empat angka bilangan dari kiri: 4358 menjadi [4, 3, 5, 8]. */
export const angkaTempat = (n: number): number[] => String(n).padStart(4, "0").split("").map(Number);
const naik = (d: readonly number[]): number[] => [...d].sort((a, b) => a - b);
const sama = (a: readonly number[], b: readonly number[]): boolean => a.length === b.length && a.every((x, i) => x === b[i]);

/* ------------------------------ Banding dari kiri ------------------------------ */
export const targetBanding = (k: KeadaanDermaga) => TARGET_BANDING[k.bandKe % TARGET_BANDING.length];
/** Tempat (0 ribuan sampai 3 satuan) tempat angka berbeda pertama dari kiri, atau -1 bila kedua bilangan sama. */
export function bedaPertama(a: number, b: number): number {
  const x = angkaTempat(a);
  const y = angkaTempat(b);
  return x.findIndex((v, i) => v !== y[i]);
}
/** Indeks tanda yang benar untuk sasaran sekarang: 0 kurang dari, 1 lebih dari, 2 sama dengan. */
export function tandaBenar(k: KeadaanDermaga): number {
  const { a, b } = targetBanding(k);
  return a < b ? 0 : a > b ? 1 : 2;
}
/** Banyak tempat yang harus dilihat dari kiri sebelum tanda boleh dipilih: sampai angka berbeda pertama, atau semua (empat) bila sama. */
export function tempatPerlu(k: KeadaanDermaga): number {
  const t = targetBanding(k);
  const b = bedaPertama(t.a, t.b);
  return b < 0 ? 4 : b + 1;
}
/** Lihat satu tempat berikutnya dari kiri. Berhenti di empat tempat. */
export function lihatBerikut(k: KeadaanDermaga): { k: KeadaanDermaga; ok: boolean } {
  if (k.lihat >= 4) return { k, ok: false };
  return { k: { ...k, lihat: k.lihat + 1, tandaPilih: -1 }, ok: true };
}
/** Pilih tanda. Alat menolak (bukan percobaan keliru) bila angka berbeda pertama belum terlihat. */
export function pilihTanda(k: KeadaanDermaga, t: number): { k: KeadaanDermaga; ok: boolean } {
  if (t < 0 || t > 2) return { k, ok: false };
  if (k.lihat < tempatPerlu(k)) return { k: { ...k, tolak: true }, ok: false };
  return { k: { ...k, tandaPilih: t }, ok: true };
}
export function periksaBanding(k: KeadaanDermaga): { k: KeadaanDermaga; ok: boolean } {
  if (k.lihat >= tempatPerlu(k) && k.tandaPilih === tandaBenar(k)) {
    const samaAda = tandaBenar(k) === 2;
    return { k: { ...k, bandBenar: k.bandBenar.includes(k.bandKe) ? k.bandBenar : [...k.bandBenar, k.bandKe], samaBenar: k.samaBenar || samaAda, bandKe: k.bandKe + 1, lihat: 0, tandaPilih: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukBanding(k: KeadaanDermaga): string {
  if (k.lihat < 1) return "Belum ada tempat yang dilihat. Tekan Lihat tempat berikutnya untuk memeriksa dari tempat paling kiri.";
  if (k.lihat < tempatPerlu(k)) return "Angka berbeda pertama belum terlihat. Tekan Lihat tempat berikutnya sampai ketemu angka yang berbeda.";
  if (k.tandaPilih < 0) return "Pilih satu tanda dulu.";
  return tandaBenar(k) === 2 ? "Semua tempat sama dari kiri sampai kanan, jadi kedua bilangan sama." : "Lihat angka berbeda pertama dari kiri. Bilangan yang angkanya lebih besar di tempat itu adalah bilangan yang lebih besar.";
}
export function kalimatBanding(k: KeadaanDermaga): string {
  if (k.bandBenar.length > 0 && k.lihat === 0 && k.tandaPilih < 0) return "Betul! Ada pasangan berikutnya.";
  const perlu = tempatPerlu(k);
  if (k.lihat === 0) return "Tekan Lihat tempat berikutnya untuk memeriksa dari tempat paling kiri.";
  if (k.lihat < perlu) return `Sudah ${kata(k.lihat)} tempat dilihat. Lanjutkan ke kanan.`;
  return k.tandaPilih < 0 ? "Angka berbeda pertama sudah terlihat. Pilih tandanya, lalu tekan Periksa." : "Tanda sudah dipilih. Tekan Periksa.";
}

/* ------------------------------ Urutkan kartu ------------------------------ */
export const targetUrut = (k: KeadaanDermaga) => TARGET_URUT[k.urutKe % TARGET_URUT.length];
/** Susunan yang benar untuk sasaran sekarang. */
export const urutanBenar = (k: KeadaanDermaga): number[] => {
  const t = targetUrut(k);
  return t.arah === "naik" ? naik(t.data) : naik(t.data).reverse();
};
export function pilihKartu(k: KeadaanDermaga, i: number): KeadaanDermaga {
  return i < 0 || i >= k.susun.length ? k : { ...k, urutSel: i };
}
/** Geser kartu yang dipilih satu tempat ke kiri (delta -1) atau kanan (delta 1) dengan menukar tetangganya. */
export function geserKartu(k: KeadaanDermaga, delta: -1 | 1): { k: KeadaanDermaga; ok: boolean } {
  const i = k.urutSel;
  const j = i + delta;
  if (i < 0 || j < 0 || j >= k.susun.length) return { k, ok: false };
  const susun = [...k.susun];
  [susun[i], susun[j]] = [susun[j], susun[i]];
  return { k: { ...k, susun, urutSel: j }, ok: true };
}
export function periksaUrut(k: KeadaanDermaga): { k: KeadaanDermaga; ok: boolean } {
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
export function petunjukUrut(k: KeadaanDermaga): string {
  const t = targetUrut(k);
  if (sama(k.susun, t.data)) return "Kartu belum digeser. Pilih satu kartu, lalu geser ke kiri atau ke kanan sampai bilangan berurutan.";
  if (sama(k.susun, [...urutanBenar(k)].reverse())) return t.arah === "naik" ? "Urutannya terbalik. Susun dari yang terkecil di kiri sampai yang terbesar di kanan." : "Urutannya terbalik. Susun dari yang terbesar di kiri sampai yang terkecil di kanan.";
  return "Masih ada kartu yang belum pada tempatnya. Bandingkan dua kartu yang bersebelahan dari tempat paling kiri, lalu tukar bila perlu.";
}
export function kalimatUrut(k: KeadaanDermaga): string {
  const t = targetUrut(k);
  if ((k.naikBenar.length > 0 || k.turunBenar.length > 0) && sama(k.susun, t.data) && k.urutSel < 0) return "Betul! Ada kartu berikutnya.";
  return t.arah === "naik" ? "Geser kartu sampai berurutan dari yang terkecil ke yang terbesar, lalu tekan Periksa." : "Geser kartu sampai berurutan dari yang terbesar ke yang terkecil, lalu tekan Periksa.";
}

/* ------------------------------ Garis bilangan ------------------------------ */
export const targetGaris = (k: KeadaanDermaga) => TARGET_GARIS[k.garisKe % TARGET_GARIS.length];
/** Bilangan pada tanda ke-`i` untuk sasaran sekarang. */
export const bilanganTanda = (k: KeadaanDermaga, i: number): number => targetGaris(k).mulai + i * targetGaris(k).langkah;
/** Tanda yang benar untuk sasaran sekarang (dihitung dari data). */
export const tandaSasaran = (k: KeadaanDermaga): number => (targetGaris(k).nilai - targetGaris(k).mulai) / targetGaris(k).langkah;
/** Geser titik satu tanda ke kiri (delta -1) atau kanan (delta 1). Berhenti di ujung garis. */
export function geserTitik(k: KeadaanDermaga, delta: -1 | 1): { k: KeadaanDermaga; ok: boolean } {
  const baru = k.titik + delta;
  if (baru < 0 || baru > 10) return { k, ok: false };
  return { k: { ...k, titik: baru }, ok: true };
}
export function periksaGaris(k: KeadaanDermaga): { k: KeadaanDermaga; ok: boolean } {
  if (k.titik === tandaSasaran(k)) {
    const ke = k.garisKe + 1;
    return { k: { ...k, garisBenar: k.garisBenar.includes(k.garisKe) ? k.garisBenar : [...k.garisBenar, k.garisKe], garisKe: ke, titik: 0 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukGaris(k: KeadaanDermaga): string {
  if (k.titik === 0) return "Titik belum digeser. Geser titik ke kanan sampai di bilangan sasaran.";
  if (k.titik < tandaSasaran(k)) return "Titik masih di sebelah kiri bilangan sasaran. Geser titik ke kanan, karena bilangan yang lebih besar ada di kanan.";
  return "Titik sudah lewat bilangan sasaran. Geser titik ke kiri, karena bilangan yang lebih kecil ada di kiri.";
}
export function kalimatGaris(k: KeadaanDermaga): string {
  if (k.garisBenar.length > 0 && k.titik === 0 && k.garisKe > 0) return "Betul! Ada garis berikutnya.";
  return "Geser titik sampai di bilangan sasaran, lalu tekan Periksa.";
}
