/**
 * Logika murni Simulasi Lompat Lonceng Kelas 5 Bab 2 Sub-Bab A "Lonceng Bu Marni", awal cerita Pasar Kuliner Malam.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-lonceng-k5b2a.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Lompat (lompat dengan jarak yang sama sampai kelipatan terakhir sebelum batas), Warnai (warnai kelipatan pada tabel bilangan),
 * Cek (kurangi dengan pembagi sampai sisa lebih kecil dari pembagi, lalu putuskan kelipatan atau bukan; alat menolak bila sisa masih cukup untuk dikurangi),
 * dan Kali (atur pengali sampai hasil kali sama dengan sasaran; alat menolak pengali nol karena nol bukan kelipatan).
 * Data di data-sim.ts; jawaban dihitung dari bilangan (logika-data.ts).
 */
import {
  TARGET_CEK,
  TARGET_KALI,
  TARGET_LOMPAT,
  TARGET_WARNAI,
  type SasaranCek,
  type SasaranKali,
  type SasaranLompat,
  type SasaranWarnai,
} from "./data-sim";
import { adalahKelipatan, banyakKelipatan, daftarKelipatan, kapital, kata } from "./logika-data";

export type ModeLonceng = "lompat" | "warnai" | "cek" | "kali";

export type KeadaanLonceng = {
  alat: "lonceng";
  mode: ModeLonceng;
  /** Lompat: sasaran ke berapa, banyak lompatan yang sudah dibuat, sasaran yang sudah benar. */
  lompatKe: number;
  lompatBuat: number;
  lompatBenar: number[];
  /** Warnai: sasaran ke berapa, bilangan yang sudah diwarnai, sasaran yang sudah benar. */
  warnaiKe: number;
  warnaiPilih: number[];
  warnaiBenar: number[];
  /** Cek: sasaran ke berapa, sisa sekarang (dimulai dari bilangan itu sendiri), pilihan (-1 belum, 0 kelipatan, 1 bukan), sasaran yang sudah benar. */
  cekKe: number;
  cekSisa: number;
  cekPilih: number;
  cekBenar: number[];
  /** Kali: sasaran ke berapa, pengali yang dipilih, sasaran yang sudah benar. */
  kaliKe: number;
  kaliP: number;
  kaliBenar: number[];
  /** Alat Kali sudah pernah menolak pengali nol. */
  tolak: boolean;
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

const ke = <T,>(daftar: readonly T[], n: number): T => daftar[n % daftar.length];

export const sasaranLompat = (k: KeadaanLonceng): SasaranLompat => ke(TARGET_LOMPAT, k.lompatKe);
export const sasaranWarnai = (k: KeadaanLonceng): SasaranWarnai => ke(TARGET_WARNAI, k.warnaiKe);
export const sasaranCek = (k: KeadaanLonceng): SasaranCek => ke(TARGET_CEK, k.cekKe);
export const sasaranKali = (k: KeadaanLonceng): SasaranKali => ke(TARGET_KALI, k.kaliKe);

export const awalLonceng = (): KeadaanLonceng => ({
  alat: "lonceng",
  mode: "lompat",
  lompatKe: 0,
  lompatBuat: 0,
  lompatBenar: [],
  warnaiKe: 0,
  warnaiPilih: [],
  warnaiBenar: [],
  cekKe: 0,
  cekSisa: TARGET_CEK[0].n,
  cekPilih: -1,
  cekBenar: [],
  kaliKe: 0,
  kaliP: 1,
  kaliBenar: [],
  tolak: false,
  salah: 0,
});
export const mulaiLagiLonceng = (): KeadaanLonceng => awalLonceng();
export const pilihModeLonceng = (k: KeadaanLonceng, mode: ModeLonceng): KeadaanLonceng => ({ ...k, mode });

export { kata, kapital };
export const hurufBesar = kapital;

/* ------------------------------ Lompat ------------------------------ */
/** Bilangan tempat lompatan mendarat: kelipatan pertama sampai kelipatan ke-`lompatBuat`. */
export const pendaratan = (k: KeadaanLonceng): number[] => daftarKelipatan(sasaranLompat(k).b, sasaranLompat(k).b * k.lompatBuat);
export const lompatMaks = (s: SasaranLompat): number => banyakKelipatan(s.b, s.batas);
/** Satu lompatan lagi; alat berhenti di kelipatan terakhir yang tidak melewati batas. */
export function lompatLagi(k: KeadaanLonceng): { k: KeadaanLonceng; ok: boolean } {
  if (k.lompatBuat >= lompatMaks(sasaranLompat(k))) return { k, ok: false };
  return { k: { ...k, lompatBuat: k.lompatBuat + 1 }, ok: true };
}
export function lompatMundur(k: KeadaanLonceng): KeadaanLonceng {
  return k.lompatBuat === 0 ? k : { ...k, lompatBuat: k.lompatBuat - 1 };
}
export function periksaLompat(k: KeadaanLonceng): { k: KeadaanLonceng; ok: boolean } {
  const s = sasaranLompat(k);
  if (k.lompatBuat < lompatMaks(s)) return { k, ok: false };
  const baru = k.lompatKe + 1;
  return { k: { ...k, lompatBenar: k.lompatBenar.includes(k.lompatKe) ? k.lompatBenar : [...k.lompatBenar, k.lompatKe], lompatKe: baru, lompatBuat: 0 }, ok: true };
}
export function petunjukLompat(k: KeadaanLonceng): string {
  const s = sasaranLompat(k);
  return k.lompatBuat === 0
    ? "Alat menolak. Belum ada lompatan. Tekan Lompat dulu, lalu periksa."
    : `Alat menolak. Masih ada kelipatan ${s.b} sebelum batas ${s.batas}. Teruslah melompat dengan jarak yang sama.`;
}
export function kalimatLompat(k: KeadaanLonceng): string {
  if (k.lompatBenar.length > 0 && k.lompatBuat === 0 && k.lompatKe === k.lompatBenar.length) return "Betul! Ada jadwal berikutnya.";
  const s = sasaranLompat(k);
  return k.lompatBuat >= lompatMaks(s) ? "Lompatan sudah sampai batas. Tekan Periksa." : "Tekan Lompat untuk melompat dengan jarak yang sama.";
}

/* ------------------------------ Warnai ------------------------------ */
/** Ketuk sebuah bilangan pada tabel: diwarnai atau dilepas. */
export function ubahWarna(k: KeadaanLonceng, n: number): KeadaanLonceng {
  const s = sasaranWarnai(k);
  if (n < 1 || n > s.sampai) return k;
  return { ...k, warnaiPilih: k.warnaiPilih.includes(n) ? k.warnaiPilih.filter((x) => x !== n) : [...k.warnaiPilih, n].sort((a, b) => a - b) };
}
export function periksaWarnai(k: KeadaanLonceng): { k: KeadaanLonceng; ok: boolean } {
  const s = sasaranWarnai(k);
  const benar = daftarKelipatan(s.b, s.sampai);
  if (k.warnaiPilih.length === benar.length && benar.every((x) => k.warnaiPilih.includes(x))) {
    const baru = k.warnaiKe + 1;
    return { k: { ...k, warnaiBenar: k.warnaiBenar.includes(k.warnaiKe) ? k.warnaiBenar : [...k.warnaiBenar, k.warnaiKe], warnaiKe: baru, warnaiPilih: [] }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukWarnai(k: KeadaanLonceng): string {
  const s = sasaranWarnai(k);
  if (k.warnaiPilih.length === 0) return "Alat menolak. Belum ada bilangan yang diwarnai. Ketuk bilangan yang kamu anggap kelipatan, lalu periksa.";
  if (k.warnaiPilih.some((n) => !adalahKelipatan(n, s.b))) return "Ada bilangan berwarna yang belum habis dibagi tanpa sisa. Periksa lagi dengan pembagian.";
  return "Masih ada kelipatan yang belum diwarnai. Lompat dengan jarak yang sama untuk mencarinya.";
}
export function kalimatWarnai(k: KeadaanLonceng): string {
  if (k.warnaiBenar.length > 0 && k.warnaiPilih.length === 0 && k.warnaiKe === k.warnaiBenar.length) return "Betul! Ada tabel berikutnya.";
  return "Ketuk tiap kelipatan pada tabel untuk mewarnainya, lalu tekan Periksa.";
}

/* ------------------------------ Cek ------------------------------ */
/** Kurangi sisa dengan pembagi. Alat menolak bila sisa sudah lebih kecil dari pembagi. */
export function kurangiCek(k: KeadaanLonceng): { k: KeadaanLonceng; ok: boolean } {
  const s = sasaranCek(k);
  if (k.cekSisa < s.b) return { k, ok: false };
  return { k: { ...k, cekSisa: k.cekSisa - s.b, cekPilih: -1 }, ok: true };
}
export function pilihCek(k: KeadaanLonceng, p: number): KeadaanLonceng {
  return p < 0 || p > 1 ? k : { ...k, cekPilih: p };
}
/** Sisa sudah lebih kecil dari pembagi: pembagian selesai. */
export const cekSelesai = (k: KeadaanLonceng): boolean => k.cekSisa < sasaranCek(k).b;
export function periksaCek(k: KeadaanLonceng): { k: KeadaanLonceng; ok: boolean } {
  const s = sasaranCek(k);
  if (!cekSelesai(k) || k.cekPilih < 0) return { k, ok: false };
  const kelipatan = adalahKelipatan(s.n, s.b);
  if ((k.cekPilih === 0) === kelipatan) {
    const baru = k.cekKe + 1;
    return { k: { ...k, cekBenar: k.cekBenar.includes(k.cekKe) ? k.cekBenar : [...k.cekBenar, k.cekKe], cekKe: baru, cekSisa: ke(TARGET_CEK, baru).n, cekPilih: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukCek(k: KeadaanLonceng): string {
  if (!cekSelesai(k)) return "Alat menolak. Sisanya belum lebih kecil dari pembagi. Teruskan mengurangi dengan pembagi.";
  if (k.cekPilih < 0) return "Alat menolak. Jawaban belum dipilih. Pilih kelipatan atau bukan, lalu tekan Periksa.";
  return "Pilihan itu belum cocok. Lihat lagi sisa akhirnya: bilangan itu kelipatan hanya bila habis tanpa sisa.";
}
export const petunjukKurangiCek = "Alat menolak. Sisanya sudah lebih kecil dari pembagi, jadi tidak bisa dikurangi lagi.";
export function kalimatCek(k: KeadaanLonceng): string {
  if (k.cekBenar.length > 0 && k.cekPilih < 0 && k.cekKe === k.cekBenar.length && k.cekSisa === sasaranCek(k).n) return "Betul! Ada bilangan berikutnya.";
  return cekSelesai(k) ? "Pembagian selesai. Pilih kelipatan atau bukan, lalu tekan Periksa." : "Tekan Kurangi untuk mengurangi dengan pembagi sampai sisanya lebih kecil.";
}

/* ------------------------------ Kali ------------------------------ */
export const hasilKali = (k: KeadaanLonceng): number => k.kaliP * sasaranKali(k).b;
export function ubahKali(k: KeadaanLonceng, delta: 1 | -1): KeadaanLonceng {
  const p = Math.min(9, Math.max(0, k.kaliP + delta));
  return { ...k, kaliP: p };
}
export function periksaKali(k: KeadaanLonceng): { k: KeadaanLonceng; ok: boolean } {
  if (k.kaliP === 0) return { k: { ...k, tolak: true }, ok: false };
  const s = sasaranKali(k);
  if (hasilKali(k) === s.n) {
    const baru = k.kaliKe + 1;
    return { k: { ...k, kaliBenar: k.kaliBenar.includes(k.kaliKe) ? k.kaliBenar : [...k.kaliBenar, k.kaliKe], kaliKe: baru, kaliP: 1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukKali(k: KeadaanLonceng): string {
  if (k.kaliP === 0) return "Alat menolak. Nol kali berapa pun hasilnya nol, dan nol bukan kelipatan. Pilih pengali yang lebih besar.";
  return hasilKali(k) < sasaranKali(k).n ? "Hasil kalinya masih lebih kecil dari sasaran. Naikkan pengalinya." : "Hasil kalinya sudah melewati sasaran. Turunkan pengalinya.";
}
export function kalimatKali(k: KeadaanLonceng): string {
  if (k.kaliBenar.length > 0 && k.kaliP === 1 && k.kaliKe === k.kaliBenar.length) return "Betul! Ada sasaran berikutnya.";
  return "Atur pengalinya sampai hasil kali sama dengan sasaran, lalu tekan Periksa.";
}

/** Kalimat penjelas "Betul!" tiap alat (diawali kapital). */
export const kalimatBetulLompat = (s: SasaranLompat): string => `Betul! ${kapital(s.benda)} tiap ${s.b} ${s.satuan}, dan lompatan terakhir mendarat di ${s.b * lompatMaks(s)}.`;
export const kalimatBetulWarnai = (s: SasaranWarnai): string => `Betul! Ada ${banyakKelipatan(s.b, s.sampai)} kelipatan ${s.b} sampai ${s.sampai}.`;
export const kalimatBetulCek = (s: SasaranCek): string =>
  adalahKelipatan(s.n, s.b) ? `Betul! ${s.n} habis dibagi ${s.b}, jadi kelipatan ${s.b}.` : `Betul! ${s.n} dibagi ${s.b} bersisa ${s.n % s.b}, jadi bukan kelipatan ${s.b}.`;
export const kalimatBetulKali = (s: SasaranKali): string => `Betul! ${s.n / s.b} × ${s.b} = ${s.n}, jadi ${s.n} kelipatan ${s.b} yang ke ${kata(s.n / s.b)}.`;
