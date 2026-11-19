/**
 * Logika murni Simulasi Loket Tiket Kelas 4 Bab 1 Sub-Bab A "Loket Tiket Bu Maya", awal cerita Penginapan Pulau Karang Indah.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-tiket-k4b1a.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Susun (isi empat kotak dengan kartu angka dari ucapan; alat menolak memeriksa selama masih ada kotak kosong), Baca (pilih cara membaca tiket),
 * Nol (isi kotak kosong yang nolnya hilang; alat menolak mengubah angka yang sudah ada dan menolak memeriksa selama masih ada kotak kosong), dan Tempat (tentukan tempat angka yang ditandai).
 * Data ada di data-sim.ts.
 */
import { kataBilK4B1 } from "../eja-k4b1";
import { NAMA_TEMPAT, TARGET_BACA, TARGET_NOL, TARGET_SUSUN, TARGET_TEMPAT } from "./data-sim";

export type ModeTiket = "susun" | "baca" | "nol" | "tempat";
type Kotak = (number | null)[];

export type KeadaanTiket = {
  alat: "tiket";
  mode: ModeTiket;
  /** Susun: sasaran ke berapa, isi empat kotak (null = kosong), kotak yang dipilih (-1 bila belum), sasaran yang sudah benar. */
  susunKe: number;
  susun: Kotak;
  susunSel: number;
  susunBenar: number[];
  /** Baca: sasaran ke berapa, pilihan (-1 bila belum), sasaran yang sudah benar. */
  bacaKe: number;
  bacaPilih: number;
  bacaBenar: number[];
  /** Nol: sasaran ke berapa, isi empat kotak (null = kosong), kotak yang dipilih, sasaran yang sudah benar. */
  nolKe: number;
  nol: Kotak;
  nolSel: number;
  nolBenar: number[];
  /** Tempat: sasaran ke berapa, pilihan nama tempat (-1 bila belum), sasaran yang sudah benar. */
  tempatKe: number;
  tempatPilih: number;
  tempatBenar: number[];
  /** Alat sudah pernah menolak sebuah langkah yang belum benar. */
  tolak: boolean;
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

const kosongEmpat = (): Kotak => [null, null, null, null];

export const awalTiket = (): KeadaanTiket => ({
  alat: "tiket",
  mode: "susun",
  susunKe: 0,
  susun: kosongEmpat(),
  susunSel: -1,
  susunBenar: [],
  bacaKe: 0,
  bacaPilih: -1,
  bacaBenar: [],
  nolKe: 0,
  nol: [...TARGET_NOL[0].awal],
  nolSel: -1,
  nolBenar: [],
  tempatKe: 0,
  tempatPilih: -1,
  tempatBenar: [],
  tolak: false,
  salah: 0,
});
export const mulaiLagiTiket = (): KeadaanTiket => awalTiket();

/* ------------------------------ Kata dan bilangan ------------------------------ */
/** Nama bilangan 0 sampai 10.000 dalam kata (tanpa digit). */
export const kata = (n: number): string => kataBilK4B1(n);
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
export { besar as hurufBesar };
/** Bilangan dengan titik ribuan: 7208 menjadi 7.208. */
export const fmt = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
export const empatAngka = (n: number): number[] => String(n).padStart(4, "0").split("").map(Number);
export const pilihModeTiket = (k: KeadaanTiket, mode: ModeTiket): KeadaanTiket => ({ ...k, mode });

/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisip<T>(benar: T, lain: T[], geser: number): T[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}
const gabung = (a: Kotak): number => Number(a.map((x) => x ?? 0).join(""));
const sama = (a: Kotak, b: readonly number[]): boolean => a.length === b.length && a.every((x, i) => x === b[i]);
const kosongPertama = (a: Kotak): number => a.findIndex((x) => x === null);

/* ------------------------------ Susun kartu angka dari ucapan ------------------------------ */
export const targetSusun = (k: KeadaanTiket): number => TARGET_SUSUN[k.susunKe % TARGET_SUSUN.length];
/** Pilih kotak yang akan diisi. */
export function pilihKotakSusun(k: KeadaanTiket, i: number): KeadaanTiket {
  return i < 0 || i > 3 ? k : { ...k, susunSel: i };
}
/** Isi kotak yang dipilih (atau kotak kosong pertama bila belum memilih) dengan kartu angka `d` (0 sampai 9). Kotak pilihan berikutnya adalah kotak kosong berikutnya. */
export function isiSusun(k: KeadaanTiket, d: number): { k: KeadaanTiket; ok: boolean } {
  if (!Number.isInteger(d) || d < 0 || d > 9) return { k, ok: false };
  const i = k.susunSel >= 0 ? k.susunSel : kosongPertama(k.susun);
  if (i < 0) return { k, ok: false };
  const susun = [...k.susun];
  susun[i] = d;
  return { k: { ...k, susun, susunSel: kosongPertama(susun) }, ok: true };
}
/** Kosongkan kotak terakhir yang terisi. */
export function hapusSusun(k: KeadaanTiket): { k: KeadaanTiket; ok: boolean } {
  let i = k.susun.length - 1;
  while (i >= 0 && k.susun[i] === null) i -= 1;
  if (i < 0) return { k, ok: false };
  const susun = [...k.susun];
  susun[i] = null;
  return { k: { ...k, susun, susunSel: i }, ok: true };
}
/** Periksa: alat menolak selama masih ada kotak kosong (bukan percobaan keliru). */
export function periksaSusun(k: KeadaanTiket): { k: KeadaanTiket; ok: boolean } {
  if (k.susun.some((x) => x === null)) return { k: { ...k, tolak: true }, ok: false };
  if (sama(k.susun, empatAngka(targetSusun(k)))) {
    const ke = k.susunKe + 1;
    return { k: { ...k, susunBenar: k.susunBenar.includes(k.susunKe) ? k.susunBenar : [...k.susunBenar, k.susunKe], susunKe: ke, susun: kosongEmpat(), susunSel: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukSusun(k: KeadaanTiket): string {
  if (k.susun.some((x) => x === null)) return "Alat menolak. Masih ada kotak kosong. Isi semua kotak dulu, mulai dari ribuan, baru tekan Periksa.";
  const sasaran = empatAngka(targetSusun(k));
  const i = k.susun.findIndex((x, q) => x !== sasaran[q]);
  return `Kotak ${NAMA_TEMPAT[Math.max(0, i)]} belum cocok dengan ucapan. Dengarkan lagi dari ribuan, dan tempat yang tidak disebut diisi nol.`;
}
export function kalimatSusun(k: KeadaanTiket): string {
  if (k.susunBenar.length > 0 && k.susun.every((x) => x === null)) return "Betul! Ada ucapan berikutnya.";
  const terisi = k.susun.filter((x) => x !== null).length;
  return terisi === 0 ? "Dengarkan ucapan Bu Maya, lalu isi kotak dengan kartu angka mulai dari ribuan." : terisi < 4 ? `Sudah ${kata(terisi)} kotak terisi. Isi sampai keempat kotak penuh.` : "Keempat kotak sudah terisi. Tekan Periksa.";
}

/* ------------------------------ Baca tiket ------------------------------ */
export const targetBaca = (k: KeadaanTiket): number => TARGET_BACA[k.bacaKe % TARGET_BACA.length];
const tanpaNolBil = (n: number): number => Number([...String(n)].filter((c) => c !== "0").join("") || "0");
/** Tiga cara baca: yang benar, nol dibaca sebagai angka lain, dan tempat nol hilang. Yang benar tidak di tempat pertama. */
export function pilihanBaca(k: KeadaanTiket): string[] {
  const n = targetBaca(k);
  const benar = kata(n);
  const calon = [kata(tanpaNolBil(n)), kata(Math.floor(n / 10)), kata(Number(String(n).split("").reverse().join("")))].filter((x, i, a) => x !== benar && a.indexOf(x) === i);
  return sisip(benar, calon.slice(0, 2), n);
}
export function pilihBaca(k: KeadaanTiket, i: number): KeadaanTiket {
  return i < 0 || i >= 3 ? k : { ...k, bacaPilih: i };
}
export function periksaBaca(k: KeadaanTiket): { k: KeadaanTiket; ok: boolean } {
  if (k.bacaPilih >= 0 && pilihanBaca(k)[k.bacaPilih] === kata(targetBaca(k))) {
    return { k: { ...k, bacaBenar: k.bacaBenar.includes(k.bacaKe) ? k.bacaBenar : [...k.bacaBenar, k.bacaKe], bacaKe: k.bacaKe + 1, bacaPilih: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukBaca(k: KeadaanTiket): string {
  if (k.bacaPilih < 0) return "Pilih satu cara membaca dulu.";
  return "Bacalah dari kiri, dimulai dari ribuan. Angka nol tidak disebut, tetapi tempatnya tetap dihitung.";
}
export function kalimatBaca(k: KeadaanTiket): string {
  return k.bacaBenar.length > 0 && k.bacaPilih < 0 ? "Betul! Ada tiket berikutnya." : "Lihat nomor tiket, pilih cara membacanya, lalu tekan Periksa.";
}

/* ------------------------------ Isi nol yang hilang ------------------------------ */
export const targetNol = (k: KeadaanTiket) => TARGET_NOL[k.nolKe % TARGET_NOL.length];
/** Kotak yang sudah terisi sejak awal terkunci: hanya kotak kosong yang boleh diisi. */
export const terkunciNol = (k: KeadaanTiket, i: number): boolean => targetNol(k).awal[i] !== null;
export function pilihKotakNol(k: KeadaanTiket, i: number): { k: KeadaanTiket; ok: boolean } {
  if (i < 0 || i > 3) return { k, ok: false };
  if (terkunciNol(k, i)) return { k: { ...k, tolak: true }, ok: false };
  return { k: { ...k, nolSel: i }, ok: true };
}
/** Isi kotak kosong yang dipilih (atau kotak kosong pertama) dengan kartu angka `d`. Angka yang sudah ada tidak diubah. */
export function isiNol(k: KeadaanTiket, d: number): { k: KeadaanTiket; ok: boolean } {
  if (!Number.isInteger(d) || d < 0 || d > 9) return { k, ok: false };
  const i = k.nolSel >= 0 ? k.nolSel : kosongPertama(k.nol);
  if (i < 0 || terkunciNol(k, i)) return { k: { ...k, tolak: true }, ok: false };
  const nol = [...k.nol];
  nol[i] = d;
  return { k: { ...k, nol, nolSel: kosongPertama(nol) }, ok: true };
}
/** Kosongkan lagi kotak yang tadi diisi (bukan kotak terkunci). */
export function hapusNol(k: KeadaanTiket, i: number): { k: KeadaanTiket; ok: boolean } {
  if (i < 0 || i > 3 || terkunciNol(k, i) || k.nol[i] === null) return { k, ok: false };
  const nol = [...k.nol];
  nol[i] = null;
  return { k: { ...k, nol, nolSel: i }, ok: true };
}
/** Periksa Nol: alat menolak selama masih ada kotak kosong (bukan percobaan keliru). */
export function periksaNol(k: KeadaanTiket): { k: KeadaanTiket; ok: boolean } {
  if (k.nol.some((x) => x === null)) return { k: { ...k, tolak: true }, ok: false };
  if (gabung(k.nol) === targetNol(k).angka) {
    const ke = k.nolKe + 1;
    return { k: { ...k, nolBenar: k.nolBenar.includes(k.nolKe) ? k.nolBenar : [...k.nolBenar, k.nolKe], nolKe: ke, nol: [...TARGET_NOL[ke % TARGET_NOL.length].awal], nolSel: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukNol(k: KeadaanTiket): string {
  if (k.nol.some((x) => x === null)) return "Alat menolak. Masih ada kotak kosong. Dengarkan ucapan lagi, lalu isi kotak kosong dengan kartu angka.";
  return "Dengarkan ucapan lagi. Tempat yang tidak disebut harus diisi nol, dan angka yang lain tidak boleh bergeser.";
}
export function kalimatNol(k: KeadaanTiket): string {
  const kosong = k.nol.filter((x) => x === null).length;
  if (k.nolBenar.length > 0 && kosong === targetNol(k).awal.filter((x) => x === null).length && k.nolSel < 0) return "Betul! Ada ucapan berikutnya.";
  return kosong > 0 ? `Ada ${kata(kosong)} kotak kosong. Ketuk kotak kosong, lalu pilih kartu angka.` : "Semua kotak terisi. Tekan Periksa Nol.";
}

/* ------------------------------ Tempat angka ------------------------------ */
export const targetTempat = (k: KeadaanTiket) => TARGET_TEMPAT[k.tempatKe % TARGET_TEMPAT.length];
export function pilihTempat(k: KeadaanTiket, i: number): KeadaanTiket {
  return i < 0 || i > 3 ? k : { ...k, tempatPilih: i };
}
export function periksaTempat(k: KeadaanTiket): { k: KeadaanTiket; ok: boolean } {
  if (k.tempatPilih === targetTempat(k).urut) {
    const ke = k.tempatKe + 1;
    return { k: { ...k, tempatBenar: k.tempatBenar.includes(k.tempatKe) ? k.tempatBenar : [...k.tempatBenar, k.tempatKe], tempatKe: ke, tempatPilih: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukTempat(k: KeadaanTiket): string {
  if (k.tempatPilih < 0) return "Pilih satu nama tempat dulu.";
  return "Hitung dari kiri: angka pertama ada di ribuan, lalu ratusan, puluhan, dan satuan.";
}
export function kalimatTempat(k: KeadaanTiket): string {
  return k.tempatBenar.length > 0 && k.tempatPilih < 0 ? "Betul! Ada angka berikutnya." : "Lihat angka yang ditandai, pilih nama tempatnya, lalu tekan Periksa.";
}
