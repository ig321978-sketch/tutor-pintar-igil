/**
 * Logika murni Simulasi Meja Lipat Kelas 4 Bab 2 Sub-Bab A "Kain Lipat Bu Wulan", awal cerita Sanggar Batik Kampung Mekar.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-lipat-k4b2a.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Lipat (bagi kain menjadi n bagian sama besar dan arsir satu bagian; alat menolak memeriksa sebelum ada bagian yang diarsir), Banding (pilih tanda untuk dua pita),
 * Urut (susun tiga pecahan dari yang terkecil; alat menolak memeriksa selama tempatnya belum penuh), dan Garis (bagi garis dari nol sampai satu dan jepit tanda pertama setelah nol).
 * Data ada di data-sim.ts.
 */
import { kataBilK4B2 } from "../eja-k4b2";
import { BAGIAN_MAKS, BAGIAN_MIN, TARGET_BANDING, TARGET_GARIS, TARGET_LIPAT, TARGET_URUT } from "./data-sim";

export type ModeLipat = "lipat" | "banding" | "urut" | "garis";

export type KeadaanLipat = {
  alat: "lipat";
  mode: ModeLipat;
  /** Lipat: sasaran ke berapa, banyak bagian kain, bagian berarsir (-1 bila belum), sasaran yang sudah benar. */
  lipatKe: number;
  lipatBagian: number;
  lipatArsir: number;
  lipatBenar: number[];
  /** Banding: sasaran ke berapa, tanda dipilih (-1 bila belum; 0 lebih dari, 1 kurang dari, 2 sama dengan), sasaran yang sudah benar. */
  bandingKe: number;
  bandingPilih: number;
  bandingBenar: number[];
  /** Urut: sasaran ke berapa, kartu yang sudah ditaruh berurutan (nomor kartu 0 sampai 2), sasaran yang sudah benar. */
  urutKe: number;
  urutIsi: number[];
  urutBenar: number[];
  /** Garis: sasaran ke berapa, banyak bagian garis, tanda yang dijepit (0 bila belum), sasaran yang sudah benar. */
  garisKe: number;
  garisBagian: number;
  garisJepit: number;
  garisBenar: number[];
  /** Alat sudah pernah menolak memeriksa kain yang belum ada bagian berarsirnya. */
  tolak: boolean;
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalLipat = (): KeadaanLipat => ({
  alat: "lipat",
  mode: "lipat",
  lipatKe: 0,
  lipatBagian: BAGIAN_MIN,
  lipatArsir: -1,
  lipatBenar: [],
  bandingKe: 0,
  bandingPilih: -1,
  bandingBenar: [],
  urutKe: 0,
  urutIsi: [],
  urutBenar: [],
  garisKe: 0,
  garisBagian: BAGIAN_MIN,
  garisJepit: 0,
  garisBenar: [],
  tolak: false,
  salah: 0,
});
export const mulaiLagiLipat = (): KeadaanLipat => awalLipat();
export const pilihModeLipat = (k: KeadaanLipat, mode: ModeLipat): KeadaanLipat => ({ ...k, mode });

/* ------------------------------ Kata dan pecahan ------------------------------ */
/** Nama bilangan dalam kata (tanpa digit). */
export const kata = (n: number): string => kataBilK4B2(n);
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
export { besar as hurufBesar };
/** Pecahan berpembilang satu: 5 menjadi 1/5. */
export const pec = (n: number): string => `1/${n}`;
/** Tanda tersedia untuk Banding. Nomor sama dengan `bandingPilih`. */
export const TANDA_LIPAT: readonly string[] = [">", "<", "="];
/** Nomor tanda yang tepat antara 1/a dan 1/b: penyebut lebih kecil berarti pecahan lebih besar. */
export const nomorTanda = (a: number, b: number): number => (a === b ? 2 : a < b ? 0 : 1);
/** Urutan penyebut dari pecahan terkecil: penyebut terbesar lebih dulu. */
export const urutKecil = (dens: readonly number[]): number[] => [...dens].sort((x, y) => y - x);
const batas = (n: number): number => Math.max(BAGIAN_MIN, Math.min(BAGIAN_MAKS, n));

/* ------------------------------ Lipat kain ------------------------------ */
export const targetLipat = (k: KeadaanLipat): number => TARGET_LIPAT[k.lipatKe % TARGET_LIPAT.length];
/** Tambah atau kurangi banyak bagian kain. Bagian berarsir dikosongkan lagi karena bagiannya berubah. */
export function ubahBagianLipat(k: KeadaanLipat, delta: number): KeadaanLipat {
  const lipatBagian = batas(k.lipatBagian + delta);
  return lipatBagian === k.lipatBagian ? k : { ...k, lipatBagian, lipatArsir: -1 };
}
/** Arsir bagian ke i (mulai nol); mengetuk bagian yang sama lagi menghapus arsirannya. Hanya satu bagian berarsir. */
export function arsirBagian(k: KeadaanLipat, i: number): KeadaanLipat {
  if (i < 0 || i >= k.lipatBagian) return k;
  return { ...k, lipatArsir: k.lipatArsir === i ? -1 : i };
}
/** Periksa: alat menolak selama belum ada bagian berarsir (itulah penolakan yang dihitung tantangan). */
export function periksaLipat(k: KeadaanLipat): { k: KeadaanLipat; ok: boolean } {
  if (k.lipatArsir < 0) return { k: { ...k, tolak: true }, ok: false };
  if (k.lipatBagian === targetLipat(k)) {
    return { k: { ...k, lipatBenar: k.lipatBenar.includes(k.lipatKe) ? k.lipatBenar : [...k.lipatBenar, k.lipatKe], lipatKe: k.lipatKe + 1, lipatBagian: BAGIAN_MIN, lipatArsir: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukLipat(k: KeadaanLipat): string {
  if (k.lipatArsir < 0) return "Alat menolak. Belum ada bagian yang diarsir. Ketuk satu bagian kain dulu, lalu tekan Periksa.";
  return "Banyak bagian kain belum sesuai dengan penyebut pecahan pesanan. Hitung lagi bagian sama besar yang dibutuhkan.";
}
export function kalimatLipat(k: KeadaanLipat): string {
  if (k.lipatBenar.length > 0 && k.lipatBagian === BAGIAN_MIN && k.lipatArsir < 0) return "Betul! Ada pesanan berikutnya.";
  if (k.lipatBagian === BAGIAN_MIN) return "Bu Wulan memesan sebuah pecahan. Tambah bagian kain sampai sesuai, lalu arsir satu bagian.";
  return k.lipatArsir < 0 ? `Kain terbagi menjadi ${kata(k.lipatBagian)} bagian. Ketuk satu bagian untuk diarsir.` : "Satu bagian sudah diarsir. Tekan Periksa.";
}

/* ------------------------------ Banding dua pita ------------------------------ */
export const targetBanding = (k: KeadaanLipat) => TARGET_BANDING[k.bandingKe % TARGET_BANDING.length];
export function pilihTanda(k: KeadaanLipat, i: number): KeadaanLipat {
  return i < 0 || i > 2 ? k : { ...k, bandingPilih: i };
}
export function periksaBanding(k: KeadaanLipat): { k: KeadaanLipat; ok: boolean } {
  const t = targetBanding(k);
  if (k.bandingPilih >= 0 && k.bandingPilih === nomorTanda(t.a, t.b)) {
    return { k: { ...k, bandingBenar: k.bandingBenar.includes(k.bandingKe) ? k.bandingBenar : [...k.bandingBenar, k.bandingKe], bandingKe: k.bandingKe + 1, bandingPilih: -1 }, ok: true };
  }
  if (k.bandingPilih < 0) return { k, ok: false };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukBanding(k: KeadaanLipat): string {
  if (k.bandingPilih < 0) return "Alat menolak. Pilih satu tanda dulu, lalu tekan Periksa.";
  return "Bandingkan panjang bagian berarsir kedua pita, lalu pilih tanda lagi.";
}
export function kalimatBanding(k: KeadaanLipat): string {
  return k.bandingBenar.length > 0 && k.bandingPilih < 0 ? "Betul! Ada dua pita berikutnya." : "Lihat bagian berarsir kedua pita, pilih tanda, lalu tekan Periksa.";
}

/* ------------------------------ Urutkan tiga pecahan ------------------------------ */
export const targetUrut = (k: KeadaanLipat): readonly number[] => TARGET_URUT[k.urutKe % TARGET_URUT.length];
/** Taruh kartu ke i di tempat berikutnya. Kartu yang sudah dipakai tidak bisa ditaruh lagi. */
export function taruhKartu(k: KeadaanLipat, i: number): { k: KeadaanLipat; ok: boolean } {
  if (i < 0 || i > 2 || k.urutIsi.includes(i) || k.urutIsi.length >= 3) return { k, ok: false };
  return { k: { ...k, urutIsi: [...k.urutIsi, i] }, ok: true };
}
/** Ambil kembali kartu yang terakhir ditaruh. */
export function hapusKartu(k: KeadaanLipat): { k: KeadaanLipat; ok: boolean } {
  return k.urutIsi.length === 0 ? { k, ok: false } : { k: { ...k, urutIsi: k.urutIsi.slice(0, -1) }, ok: true };
}
/** Periksa: alat menolak selama tempatnya belum penuh (bukan percobaan keliru). */
export function periksaUrut(k: KeadaanLipat): { k: KeadaanLipat; ok: boolean } {
  if (k.urutIsi.length < 3) return { k, ok: false };
  const dens = targetUrut(k);
  const benar = urutKecil(dens);
  if (k.urutIsi.every((kartu, tempat) => dens[kartu] === benar[tempat])) {
    return { k: { ...k, urutBenar: k.urutBenar.includes(k.urutKe) ? k.urutBenar : [...k.urutBenar, k.urutKe], urutKe: k.urutKe + 1, urutIsi: [] }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukUrut(k: KeadaanLipat): string {
  if (k.urutIsi.length < 3) return "Alat menolak. Tempatnya belum penuh. Taruh ketiga kartu dari yang terkecil, lalu tekan Periksa.";
  return "Bandingkan dua pecahan yang berdekatan, lalu susun lagi dari yang terkecil di kiri.";
}
export function kalimatUrut(k: KeadaanLipat): string {
  if (k.urutBenar.length > 0 && k.urutIsi.length === 0) return "Betul! Ada tiga pecahan berikutnya.";
  return k.urutIsi.length === 0 ? "Ketuk kartu pecahan satu per satu, mulai dari yang terkecil." : k.urutIsi.length < 3 ? "Lanjutkan sampai ketiga tempat terisi." : "Ketiga tempat sudah terisi. Tekan Periksa.";
}

/* ------------------------------ Garis pecahan ------------------------------ */
export const targetGaris = (k: KeadaanLipat): number => TARGET_GARIS[k.garisKe % TARGET_GARIS.length];
/** Tambah atau kurangi banyak bagian garis. Jepitan dilepas lagi karena tandanya berubah. */
export function ubahBagianGaris(k: KeadaanLipat, delta: number): KeadaanLipat {
  const garisBagian = batas(k.garisBagian + delta);
  return garisBagian === k.garisBagian ? k : { ...k, garisBagian, garisJepit: 0 };
}
/** Jepit tanda ke i (1 sampai banyak bagian); tanda nol tidak bisa dijepit. Mengetuk tanda yang sama melepas jepitan. */
export function jepitTanda(k: KeadaanLipat, i: number): KeadaanLipat {
  if (i < 1 || i > k.garisBagian) return k;
  return { ...k, garisJepit: k.garisJepit === i ? 0 : i };
}
/** Periksa: alat menolak selama belum ada jepitan (bukan percobaan keliru). */
export function periksaGaris(k: KeadaanLipat): { k: KeadaanLipat; ok: boolean } {
  if (k.garisJepit < 1) return { k, ok: false };
  if (k.garisBagian === targetGaris(k) && k.garisJepit === 1) {
    return { k: { ...k, garisBenar: k.garisBenar.includes(k.garisKe) ? k.garisBenar : [...k.garisBenar, k.garisKe], garisKe: k.garisKe + 1, garisBagian: BAGIAN_MIN, garisJepit: 0 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukGaris(k: KeadaanLipat): string {
  if (k.garisJepit < 1) return "Alat menolak. Belum ada tanda yang dijepit. Ketuk satu tanda pada garis, lalu tekan Periksa.";
  if (k.garisBagian !== targetGaris(k)) return "Banyak bagian garis belum sesuai dengan penyebut pecahan pesanan. Bagi garis lagi.";
  return "Pecahan berpembilang satu terletak pada tanda pertama setelah nol. Jepit tanda yang tepat.";
}
export function kalimatGaris(k: KeadaanLipat): string {
  if (k.garisBenar.length > 0 && k.garisBagian === BAGIAN_MIN && k.garisJepit === 0) return "Betul! Ada pecahan berikutnya.";
  if (k.garisBagian === BAGIAN_MIN) return "Bagi garis dari nol sampai satu sesuai penyebut pecahan pesanan.";
  return k.garisJepit < 1 ? `Garis terbagi menjadi ${kata(k.garisBagian)} bagian. Jepit satu tanda.` : "Satu tanda sudah dijepit. Tekan Periksa.";
}
