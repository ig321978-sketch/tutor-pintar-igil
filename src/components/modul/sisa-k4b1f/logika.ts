/**
 * Logika murni Simulasi Papan Sisa Kelas 4 Bab 1 Sub-Bab F "Papan Sisa Pak Usman", cerita Penginapan Pulau Karang Indah.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-sisa-k4b1f.mjs. Eksplorasi bebas tanpa skor.
 * Tiga alat: Susun (kurangkan dari satuan ke kiri; bila angka atas lebih kecil, ambil satu dari tempat di kirinya; alat menolak mengisi hasil sebelum mengambil),
 * Maju (hitung maju lewat puluhan bulat dan ratusan bulat; alat menolak lompatan yang melewati tujuan), dan Cek (tambahkan hasil dengan bilangan yang dikurangkan, lalu putuskan benar atau salah;
 * alat menolak memutuskan sebelum menambahkan). Tipe KeadaanSisa (alat: "sisa") dipakai misi-k4bab1.ts dan HARUS tetap diekspor. Data ada di data-sim.ts.
 */
import { TARGET_CEK, TARGET_MAJU, TARGET_SUSUN } from "./data-sim";

export type ModeSisa = "susun" | "maju" | "cek";

export type KeadaanSisa = {
  alat: "sisa";
  mode: ModeSisa;
  /** Susun: soal ke berapa, angka atas sekarang [ratusan, puluhan, satuan], tempat yang sudah mengambil, hasil tiap tempat (-1 bila belum), tempat sekarang (2 satuan, 1 puluhan, 0 ratusan, -1 selesai), soal yang sudah benar. */
  susunKe: number;
  atas: number[];
  ambil: boolean[];
  hasil: number[];
  kolom: number;
  susunBenar: number[];
  /** Maju: soal ke berapa, posisi sekarang, lompatan yang sudah dibuat, pilihan selisih (-1 bila belum), soal yang sudah benar. */
  majuKe: number;
  posisi: number;
  lompat: number[];
  majuPilih: number;
  majuBenar: number[];
  /** Cek: soal ke berapa, sudah menambahkan, putusan (-1 belum, 0 hasil dicatat benar, 1 salah), soal yang sudah benar, banyak catatan keliru yang tertangkap. */
  cekKe: number;
  sudahTambah: boolean;
  putus: number;
  cekBenar: number[];
  tangkap: number;
  /** Alat pernah menolak langkah yang belum waktunya. */
  tolak: boolean;
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

const digit = (n: number): number[] => [Math.floor(n / 100), Math.floor(n / 10) % 10, n % 10];
export const targetSusun = (k: KeadaanSisa) => TARGET_SUSUN[k.susunKe % TARGET_SUSUN.length];
export const targetMaju = (k: KeadaanSisa) => TARGET_MAJU[k.majuKe % TARGET_MAJU.length];
export const targetCek = (k: KeadaanSisa) => TARGET_CEK[k.cekKe % TARGET_CEK.length];
/** Angka bawah (bilangan yang dikurangkan) [ratusan, puluhan, satuan]. */
export const bawahSusun = (k: KeadaanSisa): number[] => digit(targetSusun(k).b);

export const awalSisa = (): KeadaanSisa => ({
  alat: "sisa",
  mode: "susun",
  susunKe: 0,
  atas: digit(TARGET_SUSUN[0].a),
  ambil: [false, false, false],
  hasil: [-1, -1, -1],
  kolom: 2,
  susunBenar: [],
  majuKe: 0,
  posisi: TARGET_MAJU[0].b,
  lompat: [],
  majuPilih: -1,
  majuBenar: [],
  cekKe: 0,
  sudahTambah: false,
  putus: -1,
  cekBenar: [],
  tangkap: 0,
  tolak: false,
  salah: 0,
});
export const mulaiLagiSisa = (): KeadaanSisa => awalSisa();
export const pilihModeSisa = (k: KeadaanSisa, mode: ModeSisa): KeadaanSisa => ({ ...k, mode });

/* ------------------------------ Kata (tanpa digit) ------------------------------ */
const SAT = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"] as const;
/** Nama bilangan 0 sampai 999 dalam kata. */
export function kata(n: number): string {
  if (n < 10) return SAT[n] ?? String(n);
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SAT[n - 10]} belas`;
  if (n < 100) {
    const s = n % 10;
    return s === 0 ? `${SAT[Math.floor(n / 10)]} puluh` : `${SAT[Math.floor(n / 10)]} puluh ${SAT[s]}`;
  }
  const r = Math.floor(n / 100);
  const sisa = n % 100;
  const depan = r === 1 ? "seratus" : `${SAT[r]} ratus`;
  return sisa === 0 ? depan : `${depan} ${kata(sisa)}`;
}
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
export { besar as hurufBesar };
export const NAMA_TEMPAT = ["ratusan", "puluhan", "satuan"] as const;

/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisip<T>(benar: T, lain: T[], geser: number): T[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}

/* ------------------------------ Susun ------------------------------ */
/** Angka atas pada tempat sekarang dikurangi angka bawahnya (bisa negatif bila belum mengambil). */
export const selisihTempat = (k: KeadaanSisa): number => (k.kolom < 0 ? 0 : k.atas[k.kolom] - bawahSusun(k)[k.kolom]);
/** Tiga pilihan hasil untuk tempat sekarang: yang benar tidak di tempat pertama. Bila belum mengambil (selisih negatif), pilihan memuat hasil membalik angka yang akan ditolak alat. */
export function pilihanHasil(k: KeadaanSisa): number[] {
  const d = selisihTempat(k);
  if (d < 0) return [-d, -d + 1, -d + 2];
  const lain = [d + 1, d - 1, d + 2, d - 2, d + 3].filter((x, i, a) => x !== d && x >= 0 && a.indexOf(x) === i);
  return sisip(d, lain.slice(0, 2), d + k.kolom);
}
/** Ambil satu dari tempat di kirinya: angka atas tempat sekarang bertambah sepuluh dan angka atas di kirinya berkurang satu. Hanya bila angka atas memang lebih kecil. */
export function ambilKiri(k: KeadaanSisa): { k: KeadaanSisa; ok: boolean } {
  if (k.kolom < 1) return { k, ok: false };
  if (k.atas[k.kolom] >= bawahSusun(k)[k.kolom] || k.atas[k.kolom - 1] < 1) return { k, ok: false };
  const atas = [...k.atas];
  atas[k.kolom] += 10;
  atas[k.kolom - 1] -= 1;
  const ambil = [...k.ambil];
  ambil[k.kolom] = true;
  return { k: { ...k, atas, ambil }, ok: true };
}
/** Isi hasil tempat sekarang. Bila angka atas lebih kecil dari angka bawah (belum mengambil), alat menolak. */
export function isiHasil(k: KeadaanSisa, nilai: number): { k: KeadaanSisa; ok: boolean; selesai: boolean } {
  if (k.kolom < 0) return { k, ok: false, selesai: false };
  const d = selisihTempat(k);
  if (d < 0) return { k: { ...k, tolak: true }, ok: false, selesai: false };
  if (nilai !== d) return { k: { ...k, salah: k.salah + 1 }, ok: false, selesai: false };
  const hasil = [...k.hasil];
  hasil[k.kolom] = nilai;
  const kolom = k.kolom - 1;
  if (kolom >= 0) return { k: { ...k, hasil, kolom }, ok: true, selesai: false };
  const ke = k.susunKe + 1;
  return {
    k: { ...k, susunBenar: k.susunBenar.includes(k.susunKe) ? k.susunBenar : [...k.susunBenar, k.susunKe], susunKe: ke, atas: digit(TARGET_SUSUN[ke % TARGET_SUSUN.length].a), ambil: [false, false, false], hasil: [-1, -1, -1], kolom: 2 },
    ok: true,
    selesai: true,
  };
}
/** Hasil lengkap soal sekarang yang sudah terisi (untuk gambar), digit demi digit dari kiri. */
export const hasilTerisi = (k: KeadaanSisa): string[] => k.hasil.map((v) => (v < 0 ? "" : String(v)));
export function petunjukSusun(k: KeadaanSisa): string {
  if (k.kolom < 0) return "Soal ini sudah selesai.";
  const d = selisihTempat(k);
  if (d < 0) return "Angka di atas lebih kecil daripada angka di bawahnya. Tekan Ambil dari kiri dulu, baru isi hasilnya.";
  if (k.hasil.every((v) => v < 0) && !k.ambil.some(Boolean)) return `Mulai dari satuan. Kurangkan angka atas dengan angka bawah, lalu pilih hasilnya untuk tempat ${NAMA_TEMPAT[k.kolom]}.`;
  return `Kurangkan angka atas dengan angka bawah pada tempat ${NAMA_TEMPAT[k.kolom]}. Jangan membalik angka besar dan kecil.`;
}
export function kalimatSusun(k: KeadaanSisa): string {
  if (k.susunBenar.length > 0 && k.kolom === 2 && !k.hasil.some((v) => v >= 0) && !k.ambil.some(Boolean)) return "Betul! Ada pengurangan berikutnya.";
  if (k.kolom < 0) return "Semua tempat sudah terisi.";
  const d = selisihTempat(k);
  return d < 0 ? `Tempat ${NAMA_TEMPAT[k.kolom]}: angka atas lebih kecil. Tekan Ambil dari kiri.` : `Tempat ${NAMA_TEMPAT[k.kolom]}: pilih hasil pengurangannya.`;
}

/* ------------------------------ Maju ------------------------------ */
export const selisihMaju = (k: KeadaanSisa): number => targetMaju(k).a - targetMaju(k).b;
const keAtas = (p: number, langkah: number): number => (p % langkah === 0 ? p + langkah : Math.ceil(p / langkah) * langkah);
export const MAKS_LOMPAT = 6;
/** Lompat ke puluhan bulat berikutnya, ke ratusan bulat berikutnya, atau langsung ke tujuan. Alat menolak lompatan yang melewati tujuan. */
export function lompatMaju(k: KeadaanSisa, jenis: "puluhan" | "ratusan" | "tujuan"): { k: KeadaanSisa; ok: boolean } {
  const t = targetMaju(k);
  if (k.posisi >= t.a || k.lompat.length >= MAKS_LOMPAT) return { k, ok: false };
  const baru = jenis === "tujuan" ? t.a : keAtas(k.posisi, jenis === "puluhan" ? 10 : 100);
  if (baru > t.a) return { k: { ...k, tolak: true }, ok: false };
  return { k: { ...k, posisi: baru, lompat: [...k.lompat, baru - k.posisi], majuPilih: -1 }, ok: true };
}
export function urungLompat(k: KeadaanSisa): { k: KeadaanSisa; ok: boolean } {
  if (k.lompat.length === 0) return { k, ok: false };
  const akhir = k.lompat[k.lompat.length - 1];
  return { k: { ...k, posisi: k.posisi - akhir, lompat: k.lompat.slice(0, -1), majuPilih: -1 }, ok: true };
}
/** Tiga pilihan selisih: yang benar tidak di tempat pertama; pengecoh melupakan lompatan pertama atau salah sepuluh. */
export function pilihanMaju(k: KeadaanSisa): number[] {
  const n = selisihMaju(k);
  const lompat = k.lompat.length > 0 ? k.lompat : [1];
  const lain = [n - lompat[0], n + 10, n - 10, n + 1].filter((x, i, a) => x > 0 && x !== n && a.indexOf(x) === i);
  return sisip(n, lain.slice(0, 2), n + k.majuKe);
}
export function pilihMaju(k: KeadaanSisa, i: number): KeadaanSisa {
  return i < 0 || i >= 3 || k.posisi !== targetMaju(k).a ? k : { ...k, majuPilih: i };
}
export function periksaMaju(k: KeadaanSisa): { k: KeadaanSisa; ok: boolean } {
  if (k.posisi === targetMaju(k).a && k.majuPilih >= 0 && pilihanMaju(k)[k.majuPilih] === selisihMaju(k)) {
    const ke = k.majuKe + 1;
    return { k: { ...k, majuBenar: k.majuBenar.includes(k.majuKe) ? k.majuBenar : [...k.majuBenar, k.majuKe], majuKe: ke, posisi: TARGET_MAJU[ke % TARGET_MAJU.length].b, lompat: [], majuPilih: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukMaju(k: KeadaanSisa): string {
  if (k.lompat.length === 0) return "Belum ada lompatan. Tekan Ke puluhan bulat dulu untuk mulai menghitung maju.";
  if (k.posisi < targetMaju(k).a) return "Belum sampai tujuan. Lanjutkan melompat sampai bilangan yang besar.";
  if (k.majuPilih < 0) return "Sudah sampai tujuan. Pilih selisihnya dulu.";
  return "Selisih adalah jumlah semua lompatan dari bilangan yang kecil sampai bilangan yang besar.";
}
export function kalimatMaju(k: KeadaanSisa): string {
  if (k.majuBenar.length > 0 && k.lompat.length === 0) return "Betul! Ada bilangan berikutnya.";
  if (k.posisi >= targetMaju(k).a) return "Sudah sampai tujuan. Pilih selisihnya, lalu tekan Periksa.";
  return k.lompat.length === 0 ? "Hitung maju dari bilangan yang kecil: tekan Ke puluhan bulat." : `Sudah ${kata(k.lompat.length)} lompatan. Lanjutkan sampai tujuan.`;
}

/* ------------------------------ Cek ------------------------------ */
export const sebenarnyaCek = (k: KeadaanSisa): number => targetCek(k).a - targetCek(k).b;
/** Hasil yang dicatat benar bila sama dengan bilangan awal dikurangi bilangan yang dikurangkan. */
export const klaimBenar = (k: KeadaanSisa): boolean => targetCek(k).klaim === sebenarnyaCek(k);
export const jumlahCek = (k: KeadaanSisa): number => targetCek(k).klaim + targetCek(k).b;
export function tambahCek(k: KeadaanSisa): KeadaanSisa {
  return { ...k, sudahTambah: true };
}
/** Putuskan hasil yang dicatat benar (0) atau salah (1). Alat menolak bila belum menambahkan. */
export function putusCek(k: KeadaanSisa, p: 0 | 1): { k: KeadaanSisa; ok: boolean } {
  if (!k.sudahTambah) return { k: { ...k, tolak: true }, ok: false };
  return { k: { ...k, putus: p }, ok: true };
}
export function periksaCek(k: KeadaanSisa): { k: KeadaanSisa; ok: boolean } {
  if (k.sudahTambah && k.putus >= 0 && (k.putus === 0) === klaimBenar(k)) {
    const ke = k.cekKe + 1;
    return { k: { ...k, cekBenar: k.cekBenar.includes(k.cekKe) ? k.cekBenar : [...k.cekBenar, k.cekKe], tangkap: k.tangkap + (klaimBenar(k) ? 0 : 1), cekKe: ke, sudahTambah: false, putus: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukCek(k: KeadaanSisa): string {
  if (!k.sudahTambah) return "Tekan Tambahkan dulu untuk menjumlahkan hasil yang dicatat dengan bilangan yang dikurangkan.";
  if (k.putus < 0) return "Pilih dulu: hasil yang dicatat benar atau salah.";
  return "Bandingkan jumlahnya dengan bilangan awal: sama berarti hasil yang dicatat benar, berbeda berarti salah.";
}
export function kalimatCek(k: KeadaanSisa): string {
  if (k.cekBenar.length > 0 && !k.sudahTambah && k.putus < 0) return "Betul! Ada catatan berikutnya.";
  return k.sudahTambah ? "Bandingkan jumlahnya dengan bilangan awal, lalu putuskan benar atau salah." : "Tekan Tambahkan untuk memeriksa hasil yang dicatat.";
}
