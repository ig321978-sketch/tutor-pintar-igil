/**
 * Logika murni Simulasi Tabel Tribun Kelas 5 Bab 1 Sub-Bab A "Tiket Tribun Bu Ningsih", awal cerita Hari Pertandingan di Stadion Kota.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-tribun-k5b1a.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Isi (isi angka tiap kolom dari bilangan yang diucapkan), Nol (isi nol penjaga pada kolom yang tidak disebut; alat menolak bila masih ada kolom kosong),
 * Titik (pasang titik pemisah tiga angka dari kanan lalu pilih bacaan per periode; alat menolak titik di tempat lain), dan Urai (pilih banyak yang diwakili satu angka).
 * Data di data-sim.ts; jawaban dihitung dari bilangan (logika-data.ts).
 */
import { TARGET_ISI, TARGET_NOL, TARGET_TITIK, TARGET_URAI, type SasaranIsi, type SasaranNol, type SasaranTitik, type SasaranUrai } from "./data-sim";
import { ARTI_KOLOM, angkaKolom, banyakAngka, kata, lambang, namaKolom } from "./logika-data";
import { bilanganPengecoh } from "./logika-cpa";

export type ModeTribun = "isi" | "nol" | "titik" | "urai";

export type KeadaanTribun = {
  alat: "tribun";
  mode: ModeTribun;
  /** Isi: sasaran ke berapa, angka tiap kolom (lima kolom dari kiri), sasaran yang sudah benar. */
  isiKe: number;
  isiAngka: number[];
  isiBenar: number[];
  /** Nol: sasaran ke berapa, kolom (dari kiri) yang sudah diberi nol, sasaran yang sudah benar. */
  nolKe: number;
  nolTaruh: boolean[];
  nolBenar: number[];
  /** Titik: sasaran ke berapa, titik dipasang setelah berapa angka dari kiri (0 bila belum), pilihan bacaan (-1 bila belum), sasaran yang sudah benar. */
  titikKe: number;
  titikPos: number;
  titikPilih: number;
  titikBenar: number[];
  /** Urai: sasaran ke berapa, pilihan (-1 bila belum), sasaran yang sudah benar. */
  uraiKe: number;
  uraiPilih: number;
  uraiBenar: number[];
  /** Alat Titik sudah pernah menolak titik pemisah di tempat yang salah. */
  tolak: boolean;
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

const ke = <T,>(daftar: readonly T[], n: number): T => daftar[n % daftar.length];
export const KOLOM_PAPAN = 5;
const polos = (): number[] => Array.from({ length: KOLOM_PAPAN }, () => 0);
const tidak = (): boolean[] => Array.from({ length: KOLOM_PAPAN }, () => false);

export const awalTribun = (): KeadaanTribun => ({
  alat: "tribun",
  mode: "isi",
  isiKe: 0,
  isiAngka: polos(),
  isiBenar: [],
  nolKe: 0,
  nolTaruh: tidak(),
  nolBenar: [],
  titikKe: 0,
  titikPos: 0,
  titikPilih: -1,
  titikBenar: [],
  uraiKe: 0,
  uraiPilih: -1,
  uraiBenar: [],
  tolak: false,
  salah: 0,
});
export const mulaiLagiTribun = (): KeadaanTribun => awalTribun();
export const pilihModeTribun = (k: KeadaanTribun, mode: ModeTribun): KeadaanTribun => ({ ...k, mode });

/** Nama bilangan dalam kata (tanpa digit). */
export { kata };
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
export { besar as hurufBesar };

/** Angka bilangan di lima kolom papan dari kiri ke kanan (kolom di kiri angka pertama berisi nol). */
export const lima = (n: number): number[] => Array.from({ length: KOLOM_PAPAN }, (_, i) => angkaKolom(n, KOLOM_PAPAN - 1 - i));

/* ------------------------------ Isi kolom ------------------------------ */
export const sasaranIsi = (k: KeadaanTribun): SasaranIsi => ke(TARGET_ISI, k.isiKe);
/** Ubah angka satu kolom (indeks dari kiri) naik atau turun satu, berputar antara nol dan sembilan. */
export function ubahAngka(k: KeadaanTribun, i: number, delta: 1 | -1): KeadaanTribun {
  if (i < 0 || i >= KOLOM_PAPAN) return k;
  const baru = (k.isiAngka[i] + delta + 10) % 10;
  return { ...k, isiAngka: k.isiAngka.map((a, j) => (j === i ? baru : a)) };
}
export function periksaIsi(k: KeadaanTribun): { k: KeadaanTribun; ok: boolean } {
  if (k.isiAngka.every((a) => a === 0)) return { k, ok: false };
  const s = sasaranIsi(k);
  if (lima(s.n).every((a, i) => a === k.isiAngka[i])) {
    const baru = k.isiKe + 1;
    return { k: { ...k, isiBenar: k.isiBenar.includes(k.isiKe) ? k.isiBenar : [...k.isiBenar, k.isiKe], isiKe: baru, isiAngka: polos() }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukIsi(k: KeadaanTribun): string {
  if (k.isiAngka.every((a) => a === 0)) return "Alat menolak. Belum ada angka yang diisi. Isi angka tiap kolom dulu, lalu tekan Periksa.";
  return "Isinya belum cocok dengan bilangan yang diumumkan. Pecah bilangan itu menjadi ribu, ratus, puluh, dan satuan, lalu isi kolomnya satu per satu.";
}
export function kalimatIsi(k: KeadaanTribun): string {
  if (k.isiBenar.length > 0 && k.isiAngka.every((a) => a === 0) && k.isiKe === k.isiBenar.length) return "Betul! Ada pengumuman berikutnya.";
  return "Dengarkan bilangan yang diumumkan, isi angka tiap kolom, lalu tekan Periksa.";
}

/* ------------------------------ Jaga nol ------------------------------ */
export const sasaranNol = (k: KeadaanTribun): SasaranNol => ke(TARGET_NOL, k.nolKe);
/** Kolom papan (indeks dari kiri) yang tidak disebut pada pengumuman: nol penjaga di dalam bilangan. */
export function kolomTakDisebut(n: number): number[] {
  const a = lima(n);
  const awal = KOLOM_PAPAN - banyakAngka(n);
  return a.map((x, i) => (i >= awal && x === 0 ? i : -1)).filter((i) => i >= 0);
}
/** Kolom di kiri angka pertama bilangan: tidak dipakai. */
export const kolomKosongKiri = (n: number): number => KOLOM_PAPAN - banyakAngka(n);
/** Ketuk kolom yang tidak disebut: nol penjaga dipasang atau dilepas. Kolom lain tidak bisa diubah. */
export function ubahNol(k: KeadaanTribun, i: number): KeadaanTribun {
  if (!kolomTakDisebut(sasaranNol(k).n).includes(i)) return k;
  return { ...k, nolTaruh: k.nolTaruh.map((t, j) => (j === i ? !t : t)) };
}
export function periksaNol(k: KeadaanTribun): { k: KeadaanTribun; ok: boolean } {
  const kosong = kolomTakDisebut(sasaranNol(k).n).filter((i) => !k.nolTaruh[i]);
  if (kosong.length > 0) return { k, ok: false };
  const baru = k.nolKe + 1;
  return { k: { ...k, nolBenar: k.nolBenar.includes(k.nolKe) ? k.nolBenar : [...k.nolBenar, k.nolKe], nolKe: baru, nolTaruh: tidak() }, ok: true };
}
export function petunjukNol(k: KeadaanTribun): string {
  void k;
  return "Alat menolak. Masih ada kolom yang kosong. Tiap kolom harus terisi, jadi beri nol penjaga pada kolom yang tidak disebut.";
}
export function kalimatNol(k: KeadaanTribun): string {
  if (k.nolBenar.length > 0 && k.nolTaruh.every((t) => !t) && k.nolKe === k.nolBenar.length) return "Betul! Ada pengumuman berikutnya.";
  return "Ketuk kolom yang tidak disebut untuk memberi nol penjaga, lalu tekan Periksa.";
}

/* ------------------------------ Titik pemisah dan bacaan ------------------------------ */
export const sasaranTitik = (k: KeadaanTribun): SasaranTitik => ke(TARGET_TITIK, k.titikKe);
/** Titik pemisah yang benar: tiga angka dari kanan. */
export const posisiBenar = (n: number): number => banyakAngka(n) - 3;
/** Tiga pilihan bacaan; yang benar tidak pernah di tempat pertama. */
export function opsiTitik(k: KeadaanTribun): string[] {
  const { n } = sasaranTitik(k);
  const lain = bilanganPengecoh(n, "tukar").slice(0, 2).map((x) => kata(x));
  const pos = 1 + (k.titikKe % 2);
  return [...lain.slice(0, pos), kata(n), ...lain.slice(pos)];
}
/** Ketuk celah di antara dua angka (p = setelah berapa angka dari kiri). Titik hanya diterima tiga angka dari kanan. */
export function pasangTitik(k: KeadaanTribun, p: number): { k: KeadaanTribun; ok: boolean } {
  const { n } = sasaranTitik(k);
  if (p < 1 || p >= banyakAngka(n)) return { k, ok: false };
  if (p === posisiBenar(n)) return { k: { ...k, titikPos: k.titikPos === p ? 0 : p }, ok: true };
  return { k: { ...k, titikPos: 0, tolak: true }, ok: false };
}
export function pilihTitik(k: KeadaanTribun, i: number): KeadaanTribun {
  return i < 0 || i > 2 ? k : { ...k, titikPilih: i };
}
export function periksaTitik(k: KeadaanTribun): { k: KeadaanTribun; ok: boolean } {
  if (k.titikPos === 0 || k.titikPilih < 0) return { k, ok: false };
  const { n } = sasaranTitik(k);
  if (opsiTitik(k)[k.titikPilih] === kata(n)) {
    const baru = k.titikKe + 1;
    return { k: { ...k, titikBenar: k.titikBenar.includes(k.titikKe) ? k.titikBenar : [...k.titikBenar, k.titikKe], titikKe: baru, titikPos: 0, titikPilih: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukTitik(k: KeadaanTribun): string {
  if (k.titikPos === 0) return "Alat menolak. Titik pemisah belum dipasang. Pasang titik pemisah dulu, lalu pilih bacaannya.";
  if (k.titikPilih < 0) return "Alat menolak. Bacaan belum dipilih. Pilih satu bacaan dulu, lalu tekan Periksa.";
  return "Bacaan itu belum cocok. Baca periode kiri lebih dulu, sambung dengan kata penghubungnya, lalu baca periode kanan.";
}
export const petunjukCelahSalah = "Alat menolak. Titik pemisah dipasang tiga angka dari kanan, bukan di tempat itu.";
export function kalimatTitik(k: KeadaanTribun): string {
  if (k.titikBenar.length > 0 && k.titikPos === 0 && k.titikPilih < 0 && k.titikKe === k.titikBenar.length) return "Betul! Ada deret angka berikutnya.";
  return k.titikPos === 0 ? "Ketuk celah di antara dua angka untuk memasang titik pemisah." : "Titik sudah terpasang. Pilih bacaannya, lalu tekan Periksa.";
}

/* ------------------------------ Uraian ------------------------------ */
export const sasaranUrai = (k: KeadaanTribun): SasaranUrai => ke(TARGET_URAI, k.uraiKe);
export const jawabUrai = (s: SasaranUrai): number => angkaKolom(s.n, s.k) * ARTI_KOLOM[s.k];
/** Tiga pilihan banyak yang diwakili; yang benar tidak pernah di tempat pertama. */
export function opsiUrai(k: KeadaanTribun): number[] {
  const s = sasaranUrai(k);
  const a = angkaKolom(s.n, s.k);
  const lain = [-1, 1, 2, -2]
    .map((j) => s.k + j)
    .filter((q) => q >= 0 && q < ARTI_KOLOM.length)
    .map((q) => a * ARTI_KOLOM[q])
    .filter((x, i, arr) => x !== jawabUrai(s) && arr.indexOf(x) === i)
    .slice(0, 2);
  const pos = 1 + (k.uraiKe % 2);
  return [...lain.slice(0, pos), jawabUrai(s), ...lain.slice(pos)];
}
export function pilihUrai(k: KeadaanTribun, i: number): KeadaanTribun {
  return i < 0 || i > 2 ? k : { ...k, uraiPilih: i };
}
export function periksaUrai(k: KeadaanTribun): { k: KeadaanTribun; ok: boolean } {
  if (k.uraiPilih < 0) return { k, ok: false };
  const s = sasaranUrai(k);
  if (opsiUrai(k)[k.uraiPilih] === jawabUrai(s)) {
    const baru = k.uraiKe + 1;
    return { k: { ...k, uraiBenar: k.uraiBenar.includes(k.uraiKe) ? k.uraiBenar : [...k.uraiBenar, k.uraiKe], uraiKe: baru, uraiPilih: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukUrai(k: KeadaanTribun): string {
  if (k.uraiPilih < 0) return "Alat menolak. Jawaban belum dipilih. Pilih satu jawaban dulu, lalu tekan Periksa.";
  return "Jawaban itu belum cocok. Lihat kolom tempat angka itu berada, lalu ingat berapa banyak yang diwakili satu angka di kolom itu.";
}
export function kalimatUrai(k: KeadaanTribun): string {
  if (k.uraiBenar.length > 0 && k.uraiPilih < 0 && k.uraiKe === k.uraiBenar.length) return "Betul! Ada bilangan berikutnya.";
  return k.uraiPilih < 0 ? "Lihat kolom angka yang ditanya, lalu pilih banyak yang diwakilinya." : "Jawaban sudah dipilih. Tekan Periksa bila sudah yakin.";
}

/** Kalimat penjelas "Betul!" tiap alat (diawali kapital). */
export const kalimatBetulIsi = (s: SasaranIsi): string => `Betul! ${besar(kata(s.n))} ${s.satuan} ditulis ${lambang(s.n)}.`;
export const kalimatBetulNol = (s: SasaranNol): string => `Betul! Nol penjaga membuat angka lain tetap di kolomnya, sehingga tulisannya ${lambang(s.n)}.`;
export const kalimatBetulTitik = (s: SasaranTitik): string => `Betul! Bacaannya ${kata(s.n)}.`;
export const kalimatBetulUrai = (s: SasaranUrai): string => `Betul! Angka ${kata(angkaKolom(s.n, s.k))} di kolom ${namaKolom(s.k)} mewakili ${kata(jawabUrai(s))}.`;
