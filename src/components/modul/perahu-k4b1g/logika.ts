/**
 * Logika murni Simulasi Baris Perahu Kelas 4 Bab 1 Sub-Bab G "Baris Perahu Bu Marni", cerita Penginapan Pulau Karang Indah.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-perahu-k4b1g.mjs. Eksplorasi bebas tanpa skor.
 * Tiga alat: Ulang (tambah perahu satu per satu sampai jumlah penumpang tercapai), Urai (pilih hasil kali puluhan dan satuan),
 * dan Susun (kalikan satuan dulu: tulis dan simpan; alat menolak memeriksa sebelum satuan dikalikan). Data ada di data-sim.ts.
 */
import { TARGET_SUSUN, TARGET_ULANG, TARGET_URAI } from "./data-sim";

export type ModePerahu = "ulang" | "urai" | "susun";

export type KeadaanPerahu = {
  alat: "perahu";
  mode: ModePerahu;
  /** Ulang: sasaran ke berapa, banyak perahu yang sudah ditambah, sasaran yang sudah benar. */
  ulangKe: number;
  perahu: number;
  ulangBenar: number[];
  /** Urai: sasaran ke berapa, pilihan hasil puluhan dan satuan (-1 bila belum), sasaran yang sudah benar. */
  uraiKe: number;
  uraiP: number;
  uraiS: number;
  uraiBenar: number[];
  /** Susun: sasaran ke berapa, sudah mengalikan satuan, angka yang ditulis dan disimpan, pilihan hasil (-1 bila belum), sasaran yang sudah benar. */
  susunKe: number;
  sudahSatuan: boolean;
  tulis: number;
  simpan: number;
  susunPilih: number;
  susunBenar: number[];
  /** Pernah mencoba memeriksa susun sebelum satuan dikalikan (ditolak). */
  tolak: boolean;
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalPerahu = (): KeadaanPerahu => ({
  alat: "perahu",
  mode: "ulang",
  ulangKe: 0,
  perahu: 0,
  ulangBenar: [],
  uraiKe: 0,
  uraiP: -1,
  uraiS: -1,
  uraiBenar: [],
  susunKe: 0,
  sudahSatuan: false,
  tulis: 0,
  simpan: 0,
  susunPilih: -1,
  susunBenar: [],
  tolak: false,
  salah: 0,
});
export const mulaiLagiPerahu = (): KeadaanPerahu => awalPerahu();

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
export const pilihModePerahu = (k: KeadaanPerahu, mode: ModePerahu): KeadaanPerahu => ({ ...k, mode });

/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisip<T>(benar: T, lain: T[], geser: number): T[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}
const unikPos = (xs: number[], kecuali: number): number[] => xs.filter((x, i) => x >= 0 && x !== kecuali && xs.indexOf(x) === i);

/** Bagian-bagian perkalian a x b: puluhan, satuan, hasil kali puluhan (dalam puluhan), hasil kali satuan, simpanan, angka yang ditulis, hasil. */
export const bagian = (a: number, b: number) => {
  const t = Math.floor(a / 10);
  const u = a % 10;
  const p = u * b;
  return { t, u, puluhan: t * 10 * b, satuan: p, simpan: Math.floor(p / 10), tulis: p % 10, hasil: a * b };
};

/* ------------------------------ Ulang ------------------------------ */
export const targetUlang = (k: KeadaanPerahu) => TARGET_ULANG[k.ulangKe % TARGET_ULANG.length];
export const jumlahPenumpang = (k: KeadaanPerahu): number => k.perahu * targetUlang(k).a;
/** Tambah (delta 1) atau kurangi (delta -1) satu perahu; paling banyak sembilan. */
export function ubahPerahu(k: KeadaanPerahu, delta: number): { k: KeadaanPerahu; ok: boolean } {
  const baru = k.perahu + delta;
  if (baru < 0 || baru > 9) return { k, ok: false };
  return { k: { ...k, perahu: baru }, ok: true };
}
export function periksaUlang(k: KeadaanPerahu): { k: KeadaanPerahu; ok: boolean } {
  if (k.perahu === targetUlang(k).b) return { k: { ...k, ulangBenar: k.ulangBenar.includes(k.ulangKe) ? k.ulangBenar : [...k.ulangBenar, k.ulangKe], ulangKe: k.ulangKe + 1, perahu: 0 }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukUlang(k: KeadaanPerahu): string {
  if (k.perahu === 0) return "Belum ada perahu. Tekan tambah perahu, lalu perhatikan jumlah penumpangnya.";
  const j = jumlahPenumpang(k);
  const hasil = targetUlang(k).a * targetUlang(k).b;
  if (j < hasil) return `Baru ${kata(j)} penumpang. Tambah perahu sampai penumpangnya cukup.`;
  return "Penumpang sudah terlalu banyak. Kurangi perahu sampai pas.";
}
export function kalimatUlang(k: KeadaanPerahu): string {
  return k.ulangBenar.length > 0 && k.perahu === 0 ? "Betul! Ada baris perahu berikutnya." : "Tambah perahu satu per satu sampai jumlah penumpang sama dengan sasaran, lalu tekan Periksa.";
}
/** Pilihan jumlah sasaran ulang: hasil kali (satu nilai, dipakai tampilan sebagai sasaran). */
export const sasaranUlang = (k: KeadaanPerahu): number => {
  const t = targetUlang(k);
  return t.a * t.b;
};

/* ------------------------------ Urai ------------------------------ */
export const targetUrai = (k: KeadaanPerahu) => TARGET_URAI[k.uraiKe % TARGET_URAI.length];
/** Tiga pilihan hasil kali puluhan (benar tidak di tempat pertama). */
export function pilihanUraiP(k: KeadaanPerahu): number[] {
  const t = targetUrai(k);
  const g = bagian(t.a, t.b);
  const lain = unikPos([g.puluhan / 10, g.puluhan + 10, g.puluhan - 10, g.puluhan * 2], g.puluhan).slice(0, 2);
  return sisip(g.puluhan, lain, t.b + k.uraiKe);
}
/** Tiga pilihan hasil kali satuan (benar tidak di tempat pertama). */
export function pilihanUraiS(k: KeadaanPerahu): number[] {
  const t = targetUrai(k);
  const g = bagian(t.a, t.b);
  const lain = unikPos([g.u, g.satuan + 1, g.satuan - 1, g.satuan + 2], g.satuan).slice(0, 2);
  return sisip(g.satuan, lain, t.a + k.uraiKe);
}
export const pilihUrai = (k: KeadaanPerahu, bagianPilih: "p" | "s", i: number): KeadaanPerahu => {
  if (i < 0 || i > 2) return k;
  return bagianPilih === "p" ? { ...k, uraiP: i } : { ...k, uraiS: i };
};
export function periksaUrai(k: KeadaanPerahu): { k: KeadaanPerahu; ok: boolean } {
  const t = targetUrai(k);
  const g = bagian(t.a, t.b);
  if (k.uraiP >= 0 && k.uraiS >= 0 && pilihanUraiP(k)[k.uraiP] === g.puluhan && pilihanUraiS(k)[k.uraiS] === g.satuan) {
    return { k: { ...k, uraiBenar: k.uraiBenar.includes(k.uraiKe) ? k.uraiBenar : [...k.uraiBenar, k.uraiKe], uraiKe: k.uraiKe + 1, uraiP: -1, uraiS: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukUrai(k: KeadaanPerahu): string {
  if (k.uraiP < 0 || k.uraiS < 0) return "Pilih hasil kali puluhan dan hasil kali satuan dulu, lalu tekan Periksa.";
  const t = targetUrai(k);
  const g = bagian(t.a, t.b);
  if (pilihanUraiP(k)[k.uraiP] !== g.puluhan) return "Bagian puluhan dikalikan sebagai puluhan. Kalikan angka puluhannya dengan pengali, lalu beri nol di belakang.";
  return "Bagian satuan dikalikan dengan pengali yang sama. Jangan hanya menyalin angka satuannya.";
}
export function kalimatUrai(k: KeadaanPerahu): string {
  return k.uraiBenar.length > 0 && k.uraiP < 0 ? "Betul! Ada bilangan berikutnya." : "Uraikan bilangannya, pilih hasil kali tiap bagian, lalu tekan Periksa.";
}

/* ------------------------------ Susun ------------------------------ */
export const targetSusun = (k: KeadaanPerahu) => TARGET_SUSUN[k.susunKe % TARGET_SUSUN.length];
/** Tekan Kalikan satuan: alat menghitung hasil kali satuan. */
export const kalikanSatuan = (k: KeadaanPerahu): KeadaanPerahu => ({ ...k, sudahSatuan: true });
export function ubahTulis(k: KeadaanPerahu, bagianUbah: "tulis" | "simpan", delta: number): { k: KeadaanPerahu; ok: boolean } {
  if (!k.sudahSatuan) return { k, ok: false };
  const baru = k[bagianUbah] + delta;
  if (baru < 0 || baru > 9) return { k, ok: false };
  return { k: { ...k, [bagianUbah]: baru }, ok: true };
}
/** Tiga pilihan hasil akhir (benar tidak di tempat pertama): pengecoh lupa menyimpan dan menukar. */
export function pilihanSusun(k: KeadaanPerahu): number[] {
  const t = targetSusun(k);
  const g = bagian(t.a, t.b);
  const lupa = g.t * t.b * 10 + g.tulis;
  const lain = unikPos([lupa, g.hasil + 10, g.hasil - 10, g.hasil + 1], g.hasil).slice(0, 2);
  return sisip(g.hasil, lain, t.b + k.susunKe);
}
export const pilihSusun = (k: KeadaanPerahu, i: number): KeadaanPerahu => (i < 0 || i > 2 || !k.sudahSatuan ? k : { ...k, susunPilih: i });
/** Periksa. Ditolak (bukan percobaan keliru) bila satuan belum dikalikan. */
export function periksaSusun(k: KeadaanPerahu): { k: KeadaanPerahu; ok: boolean } {
  if (!k.sudahSatuan) return { k: { ...k, tolak: true }, ok: false };
  const t = targetSusun(k);
  const g = bagian(t.a, t.b);
  if (k.tulis === g.tulis && k.simpan === g.simpan && k.susunPilih >= 0 && pilihanSusun(k)[k.susunPilih] === g.hasil) {
    return { k: { ...k, susunBenar: k.susunBenar.includes(k.susunKe) ? k.susunBenar : [...k.susunBenar, k.susunKe], susunKe: k.susunKe + 1, sudahSatuan: false, tulis: 0, simpan: 0, susunPilih: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukSusun(k: KeadaanPerahu): string {
  if (!k.sudahSatuan) return "Satuan belum dikalikan. Tekan Kalikan satuan dulu, baru tulis dan simpan angkanya.";
  const t = targetSusun(k);
  const g = bagian(t.a, t.b);
  if (k.tulis !== g.tulis || k.simpan !== g.simpan) return "Hasil kali satuan terdiri dari dua angka. Angka satuannya ditulis, angka puluhannya disimpan.";
  if (k.susunPilih < 0) return "Pilih satu hasil akhir dulu.";
  return "Kalikan puluhan dengan pengali, lalu tambahkan simpanannya.";
}
export function kalimatSusun(k: KeadaanPerahu): string {
  if (k.susunBenar.length > 0 && !k.sudahSatuan && k.susunPilih < 0) return "Betul! Ada perkalian berikutnya.";
  return k.sudahSatuan ? "Tulis dan simpan angkanya, pilih hasil akhir, lalu tekan Periksa." : "Tekan Kalikan satuan dulu supaya alat menghitung hasil kali satuan.";
}
