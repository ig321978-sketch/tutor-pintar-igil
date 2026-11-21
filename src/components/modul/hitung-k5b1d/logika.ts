/**
 * Logika murni Simulasi Susun Hitung Kelas 5 Bab 1 Sub-Bab D "Hitungan Penonton Pak Darmo", akhir cerita Hari Pertandingan di Stadion Kota.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-hitung-k5b1d.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Jumlah (jumlah bersusun kolom demi kolom; alat menolak satu kolom diisi angka sepuluh atau lebih), Kurang (kurang bersusun; alat menolak mengurangkan kolom yang angka atasnya
 * lebih kecil sebelum meminjam, dan menolak meminjam yang tidak perlu), Kali (pisah pengali, lalu pilih hasil kali; alat menolak Periksa sebelum pengali dipisah),
 * dan Bagi (bagi per kolom dari kiri; alat menolak angka sepuluh pada satu kolom hasil). Data ada di data-sim.ts.
 * Tipe KeadaanHitung (alat: "hitung") dipakai misi-k5bab1.ts dan harus tetap diekspor.
 */
import { BAGI_SIM, JUMLAH_SIM, KALI_SIM, KURANG_SIM } from "./data-sim";
import { BANYAK_KOLOM, NAMA_KOLOM, angkaKolom, angkaSemua, bagiKolom, fmt, kaliHilangNol, kaliPisah, pisahPengali, susun3, susunJumlah, susunKurang } from "./logika-data";

export type ModeHitung = "jumlah" | "kurang" | "kali" | "bagi";

export type KeadaanHitung = {
  alat: "hitung";
  mode: ModeHitung;
  /** Jumlah: sasaran ke berapa, kolom yang sedang dikerjakan (0 = satuan), angka yang akan ditulis dan disimpan, pernah ditolak (angka sepuluh atau lebih), sasaran yang sudah benar. */
  jumlahKe: number;
  kolJ: number;
  tulisJ: number;
  simpanJ: number;
  tolakJumlah: boolean;
  jumlahBenar: number[];
  /** Kurang: sasaran ke berapa, kolom yang sedang dikerjakan, angka atas saat ini (setelah pinjaman), angka hasil yang sudah ditulis, penolakan, sasaran yang sudah benar. */
  kurangKe: number;
  kolK: number;
  atasK: number[];
  hasilK: number[];
  tolakKurang: boolean;
  tolakPinjam: boolean;
  kurangBenar: number[];
  /** Kali: sasaran ke berapa, pengali sudah dipisah, pilihan hasil (-1 belum), pernah ditolak (Periksa sebelum dipisah), sasaran yang sudah benar. */
  kaliKe: number;
  dipisah: boolean;
  pilihKali: number;
  tolakKali: boolean;
  kaliBenar: number[];
  /** Bagi: sasaran ke berapa, langkah kolom ke berapa dari kiri (0 sampai 4), angka hasil yang akan ditulis, angka hasil yang sudah ditulis, pernah ditolak, sasaran yang sudah benar. */
  bagiKe: number;
  langkahB: number;
  tulisB: number;
  hasilB: number[];
  tolakBagi: boolean;
  bagiBenar: number[];
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, tidak dihitung). */
  salah: number;
};

const tanpaKembar = (xs: number[]): number[] => xs.filter((x, i) => xs.indexOf(x) === i);
export const awalHitung = (): KeadaanHitung => ({
  alat: "hitung",
  mode: "jumlah",
  jumlahKe: 0,
  kolJ: 0,
  tulisJ: 0,
  simpanJ: 0,
  tolakJumlah: false,
  jumlahBenar: [],
  kurangKe: 0,
  kolK: 0,
  atasK: angkaSemua(KURANG_SIM[0].a),
  hasilK: [],
  tolakKurang: false,
  tolakPinjam: false,
  kurangBenar: [],
  kaliKe: 0,
  dipisah: false,
  pilihKali: -1,
  tolakKali: false,
  kaliBenar: [],
  bagiKe: 0,
  langkahB: 0,
  tulisB: 0,
  hasilB: [],
  tolakBagi: false,
  bagiBenar: [],
  salah: 0,
});
export const mulaiLagiHitung = (): KeadaanHitung => awalHitung();
export const pilihModeHitung = (k: KeadaanHitung, mode: ModeHitung): KeadaanHitung => ({ ...k, mode });

/* ------------------------------ Jumlah: kolom demi kolom ------------------------------ */
export const targetJumlah = (k: KeadaanHitung) => JUMLAH_SIM[k.jumlahKe % JUMLAH_SIM.length];
export const susunTargetJumlah = (k: KeadaanHitung) => {
  const t = targetJumlah(k);
  return susunJumlah([t.a, t.b]);
};
/** Simpanan yang masuk ke kolom yang sedang dikerjakan (dari kolom di kanannya yang sudah selesai). */
export const simpananMasuk = (k: KeadaanHitung): number => susunTargetJumlah(k).kolom[k.kolJ].masuk;
const kosongJ = { kolJ: 0, tulisJ: 0, simpanJ: 0 };
/** Naikkan atau turunkan angka yang ditulis. Ditolak bila ada yang mencoba menulis sepuluh atau lebih di satu kolom (mencatat `tolakJumlah`). */
export function ubahTulis(k: KeadaanHitung, arah: 1 | -1): { k: KeadaanHitung; ok: boolean } {
  if (arah === 1 && k.tulisJ >= 9) return { k: { ...k, tolakJumlah: true }, ok: false };
  if (arah === -1 && k.tulisJ <= 0) return { k, ok: false };
  return { k: { ...k, tulisJ: k.tulisJ + arah }, ok: true };
}
export function ubahSimpan(k: KeadaanHitung, arah: 1 | -1): KeadaanHitung {
  const n = k.simpanJ + arah;
  return n < 0 || n > 9 ? k : { ...k, simpanJ: n };
}
/** Periksa kolom yang sedang dikerjakan. Bila benar, maju ke kolom kiri; setelah kolom terakhir, sasaran berikutnya. */
export function periksaKolomJumlah(k: KeadaanHitung): { k: KeadaanHitung; ok: boolean; selesai: boolean } {
  const s = susunTargetJumlah(k);
  const c = s.kolom[k.kolJ];
  if (k.tulisJ !== c.tulis || k.simpanJ !== c.simpan) return { k: { ...k, salah: k.salah + 1 }, ok: false, selesai: false };
  if (k.kolJ + 1 < BANYAK_KOLOM) return { k: { ...k, kolJ: k.kolJ + 1, tulisJ: 0, simpanJ: 0 }, ok: true, selesai: false };
  return { k: { ...k, ...kosongJ, jumlahBenar: tanpaKembar([...k.jumlahBenar, k.jumlahKe % JUMLAH_SIM.length]), jumlahKe: k.jumlahKe + 1 }, ok: true, selesai: true };
}
export function petunjukJumlah(): string {
  return "Angka kolom itu belum cocok. Jumlahkan kedua angka dan simpanan dari kolom kanan. Bila lebih dari sembilan, tulis satu angka dan simpan sisanya.";
}
export const kalimatJumlah = (k: KeadaanHitung): string =>
  k.jumlahBenar.length > 0 && k.kolJ === 0 && k.tulisJ === 0 && k.simpanJ === 0 ? "Betul! Ada penjumlahan berikutnya untuk disusun." : `Kerjakan kolom ${NAMA_KOLOM[k.kolJ]}: atur angka yang ditulis dan yang disimpan, lalu tekan Periksa kolom.`;

/* ------------------------------ Kurang: pinjam bila perlu ------------------------------ */
export const targetKurang = (k: KeadaanHitung) => KURANG_SIM[k.kurangKe % KURANG_SIM.length];
export const bawahKurang = (k: KeadaanHitung): number => angkaKolom(targetKurang(k).b, k.kolK);
/** Apakah kolom yang sedang dikerjakan perlu meminjam (angka atas lebih kecil dari angka bawah)? */
export const perluPinjam = (k: KeadaanHitung): boolean => k.atasK[k.kolK] < bawahKurang(k);
const awalSasaranKurang = (ke: number) => ({ kurangKe: ke, kolK: 0, atasK: angkaSemua(KURANG_SIM[ke % KURANG_SIM.length].a), hasilK: [] as number[] });
/** Pinjam untuk kolom yang sedang dikerjakan: dari kolom kiri terdekat yang tidak nol; kolom nol di antaranya menjadi sembilan. Ditolak bila tidak perlu (mencatat `tolakPinjam`). */
export function pinjamKolom(k: KeadaanHitung): { k: KeadaanHitung; ok: boolean; sumber: number } {
  if (!perluPinjam(k)) return { k: { ...k, tolakPinjam: true }, ok: false, sumber: -1 };
  const atas = [...k.atasK];
  let j = k.kolK + 1;
  while (j < BANYAK_KOLOM && atas[j] === 0) j += 1;
  if (j >= BANYAK_KOLOM) return { k, ok: false, sumber: -1 };
  atas[j] -= 1;
  for (let m = j - 1; m > k.kolK; m -= 1) atas[m] = 9;
  atas[k.kolK] += 10;
  return { k: { ...k, atasK: atas }, ok: true, sumber: j };
}
/** Kurangkan kolom yang sedang dikerjakan. Ditolak bila angka atas masih lebih kecil (mencatat `tolakKurang`). Setelah kolom terakhir, sasaran dinyatakan selesai. */
export function kurangkanKolom(k: KeadaanHitung): { k: KeadaanHitung; ok: boolean; selesai: boolean } {
  if (perluPinjam(k)) return { k: { ...k, tolakKurang: true }, ok: false, selesai: false };
  const tulis = k.atasK[k.kolK] - bawahKurang(k);
  const hasil = [...k.hasilK, tulis];
  if (k.kolK + 1 < BANYAK_KOLOM) return { k: { ...k, hasilK: hasil, kolK: k.kolK + 1 }, ok: true, selesai: false };
  return { k: { ...k, ...awalSasaranKurang(k.kurangKe + 1), kurangBenar: tanpaKembar([...k.kurangBenar, k.kurangKe % KURANG_SIM.length]) }, ok: true, selesai: true };
}
/** Hasil benar sasaran kurang, dihitung dari susunKurang (cara yang berbeda dari penelusuran kolom di atas). */
export const hasilBenarKurang = (k: KeadaanHitung): number => susunKurang(targetKurang(k).a, targetKurang(k).b).hasil;
export const kalimatKurang = (k: KeadaanHitung): string =>
  k.kurangBenar.length > 0 && k.kolK === 0 && k.hasilK.length === 0 ? "Betul! Ada pengurangan berikutnya untuk disusun." : `Kerjakan kolom ${NAMA_KOLOM[k.kolK]}: pinjam bila angka atas lebih kecil, lalu tekan Kurangkan.`;

/* ------------------------------ Kali: pisah pengali ------------------------------ */
export const targetKali = (k: KeadaanHitung) => KALI_SIM[k.kaliKe % KALI_SIM.length];
/** Hasil benar sasaran kali, dihitung dari kaliPisah (bagian pengali dikalikan lalu dijumlahkan). */
export const hasilKaliSim = (k: KeadaanHitung): number => kaliPisah(targetKali(k).a, targetKali(k).b).total;
/** Bagian pengali setelah dipisah: dua belas menjadi sepuluh dan dua. */
export const bagianKali = (k: KeadaanHitung): number[] => pisahPengali(targetKali(k).b);
/** Tiga pilihan hasil kali (jawaban benar di posisi kedua atau ketiga): benar, satu nol hilang, dan hanya bagian sepuluh. */
export const pilKali = (k: KeadaanHitung): [string, string, string] => {
  const t = targetKali(k);
  const teks = (n: number) => `${fmt(n)} ${t.satuan}`;
  return susun3(teks(hasilKaliSim(k)), [teks(kaliHilangNol(t.a, t.b)), teks(t.a * pisahPengali(t.b)[0])], k.kaliKe % 2 === 0 ? 1 : 2);
};
export const kunciKali = (k: KeadaanHitung): number => pilKali(k).indexOf(`${fmt(hasilKaliSim(k))} ${targetKali(k).satuan}`);
export const pisahkan = (k: KeadaanHitung): KeadaanHitung => ({ ...k, dipisah: !k.dipisah, pilihKali: -1 });
export function pilihKali(k: KeadaanHitung, i: number): KeadaanHitung {
  return i < 0 || i > 2 ? k : { ...k, pilihKali: i };
}
/** Periksa kali. Ditolak (tanpa dihitung keliru, mencatat `tolakKali`) bila pengali belum dipisah. */
export function periksaKali(k: KeadaanHitung): { k: KeadaanHitung; ok: boolean; ditolak?: boolean } {
  if (!k.dipisah) return { k: { ...k, tolakKali: true }, ok: false, ditolak: true };
  if (k.pilihKali >= 0 && k.pilihKali === kunciKali(k)) return { k: { ...k, kaliBenar: tanpaKembar([...k.kaliBenar, k.kaliKe % KALI_SIM.length]), kaliKe: k.kaliKe + 1, dipisah: false, pilihKali: -1 }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukKali(k: KeadaanHitung): string {
  if (k.pilihKali < 0) return "Belum ada pilihan. Kalikan tiap bagian pengali dengan bilangan besarnya, lalu jumlahkan hasilnya.";
  return "Hasilnya belum cocok. Kalikan kedua bagian pengali, jangan hanya satu bagian, lalu jumlahkan dengan teliti.";
}
export const kalimatKali = (k: KeadaanHitung): string =>
  k.kaliBenar.length > 0 && !k.dipisah && k.pilihKali < 0 ? "Betul! Ada perkalian berikutnya untuk dipisah." : k.dipisah ? "Pengali sudah dipisah. Kalikan tiap bagian, pilih hasilnya, lalu tekan Periksa." : "Tekan Pisah dulu, pilih hasilnya, lalu tekan Periksa.";

/* ------------------------------ Bagi: per kolom dari kiri ------------------------------ */
export const targetBagi = (k: KeadaanHitung) => BAGI_SIM[k.bagiKe % BAGI_SIM.length];
export const langkahBagi = (k: KeadaanHitung) => bagiKolom(targetBagi(k).a, targetBagi(k).b);
/** Angka yang dibawa ke kolom yang sedang dibagi (sisa kolom kiri ditukar menjadi sepuluh, ditambah angka kolom ini). */
export const angkaDibawa = (k: KeadaanHitung): number => langkahBagi(k).langkah[k.langkahB].angka;
/** Naikkan atau turunkan angka hasil. Ditolak bila ada yang mencoba menulis sepuluh di satu kolom hasil (mencatat `tolakBagi`). */
export function ubahTulisBagi(k: KeadaanHitung, arah: 1 | -1): { k: KeadaanHitung; ok: boolean } {
  if (arah === 1 && k.tulisB >= 9) return { k: { ...k, tolakBagi: true }, ok: false };
  if (arah === -1 && k.tulisB <= 0) return { k, ok: false };
  return { k: { ...k, tulisB: k.tulisB + arah }, ok: true };
}
/** Periksa kolom hasil yang sedang dibagi. Bila benar, maju ke kolom kanan; setelah kolom terakhir, sasaran berikutnya. */
export function periksaKolomBagi(k: KeadaanHitung): { k: KeadaanHitung; ok: boolean; selesai: boolean } {
  const l = langkahBagi(k).langkah[k.langkahB];
  if (k.tulisB !== l.q) return { k: { ...k, salah: k.salah + 1 }, ok: false, selesai: false };
  const hasil = [...k.hasilB, l.q];
  if (k.langkahB + 1 < BANYAK_KOLOM) return { k: { ...k, hasilB: hasil, langkahB: k.langkahB + 1, tulisB: 0 }, ok: true, selesai: false };
  return { k: { ...k, bagiKe: k.bagiKe + 1, langkahB: 0, tulisB: 0, hasilB: [], bagiBenar: tanpaKembar([...k.bagiBenar, k.bagiKe % BAGI_SIM.length]) }, ok: true, selesai: true };
}
export function petunjukBagi(): string {
  return "Angka hasil di kolom itu belum cocok. Bagi angka yang dibawa dengan pembagi, dan tulis berapa kali pembagi masuk.";
}
export const kalimatBagi = (k: KeadaanHitung): string =>
  k.bagiBenar.length > 0 && k.langkahB === 0 && k.tulisB === 0 && k.hasilB.length === 0 ? "Betul! Ada pembagian berikutnya untuk dibagi per kolom." : `Bagi ${angkaDibawa(k)} dengan ${targetBagi(k).b}, atur angka hasil, lalu tekan Periksa kolom.`;
