/**
 * Logika murni Simulasi Meja Resepsi Kelas 4 Bab 1 Sub-Bab E "Meja Resepsi Bu Rina", lanjutan cerita Penginapan Pulau Karang Indah.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-resepsi-k4b1e.mjs. Eksplorasi bebas tanpa skor.
 * Tiga alat: Susun (jumlahkan dua bilangan bersusun mulai dari kolom satuan: tulis satu angka dan simpan bila perlu; alat menolak bila kolom lain dipilih lebih dulu
 * dan menolak hasil kolom yang belum benar), Tukar (jumlahkan balok tiap tempat, lalu tukar sepuluh butir menjadi satu batang dan sepuluh batang menjadi satu kotak; alat menolak bila belum sepuluh),
 * dan Genap (bulatkan dulu, lalu sesuaikan dengan menambah atau mengurangi; alat menolak menyesuaikan sebelum membulatkan). Data ada di data-sim.ts.
 */
import { TARGET_GENAP, TARGET_SUSUN, TARGET_TUKAR } from "./data-sim";

export type ModeResepsi = "susun" | "tukar" | "genap";

export type KeadaanResepsi = {
  alat: "resepsi";
  mode: ModeResepsi;
  /** Susun: sasaran ke berapa, kolom aktif (0 satuan, 1 puluhan, 2 ratusan), angka yang sudah ditulis tiap kolom (-1 bila belum), simpanan yang masuk ke tiap kolom, angka dan simpanan yang dipilih untuk kolom aktif,
   * sasaran yang sudah selesai, dan sasaran selesai yang memakai simpanan. */
  susunKe: number;
  kol: number;
  tulis: number[];
  masuk: number[];
  pilihTulis: number;
  pilihSimpan: number;
  susunBenar: number[];
  simpanBenar: number[];
  /** Tukar: sasaran ke berapa, banyak balok tiap tempat (satuan, puluhan, ratusan), sasaran yang sudah selesai, dan sasaran yang memakai penukaran. */
  tukarKe: number;
  tukar: number[];
  tukarBenar: number[];
  /** Genap: sasaran ke berapa, sudah dibulatkan, pilihan menyesuaikan (-1 belum, 0 ditambah, 1 dikurangi), sasaran yang sudah selesai. */
  genapKe: number;
  bulat: boolean;
  arah: number;
  genapBenar: number[];
  /** Alat pernah menolak langkah yang belum benar. */
  tolak: boolean;
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

const angkaDi = (n: number, k: number): number => Math.floor(n / 10 ** k) % 10;
const jumlahTempat = (a: number, b: number): number[] => [0, 1, 2].map((k) => angkaDi(a, k) + angkaDi(b, k));

export const awalResepsi = (): KeadaanResepsi => ({
  alat: "resepsi",
  mode: "susun",
  susunKe: 0,
  kol: 0,
  tulis: [-1, -1, -1],
  masuk: [0, 0, 0],
  pilihTulis: -1,
  pilihSimpan: 0,
  susunBenar: [],
  simpanBenar: [],
  tukarKe: 0,
  tukar: jumlahTempat(TARGET_TUKAR[0].a, TARGET_TUKAR[0].b),
  tukarBenar: [],
  genapKe: 0,
  bulat: false,
  arah: -1,
  genapBenar: [],
  tolak: false,
  salah: 0,
});
export const mulaiLagiResepsi = (): KeadaanResepsi => awalResepsi();

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
export const NAMA_KOLOM = ["satuan", "puluhan", "ratusan"] as const;
export const pilihModeResepsi = (k: KeadaanResepsi, mode: ModeResepsi): KeadaanResepsi => ({ ...k, mode });

/* ------------------------------ Susun ------------------------------ */
export const targetSusun = (k: KeadaanResepsi) => TARGET_SUSUN[k.susunKe % TARGET_SUSUN.length];
/** Jumlah angka kolom `kol` ditambah simpanan yang masuk ke kolom itu. */
export const jumlahKolom = (k: KeadaanResepsi, kol: number): number => angkaDi(targetSusun(k).a, kol) + angkaDi(targetSusun(k).b, kol) + k.masuk[kol];
/** Angka yang benar ditulis dan simpanan yang benar untuk kolom aktif. */
export const tulisBenar = (k: KeadaanResepsi): number => jumlahKolom(k, k.kol) % 10;
export const simpanBenarKolom = (k: KeadaanResepsi): number => Math.floor(jumlahKolom(k, k.kol) / 10);
export const jumlahSusun = (k: KeadaanResepsi): number => targetSusun(k).a + targetSusun(k).b;

/** Pilih sebuah kolom untuk dikerjakan. Alat menolak bila bukan kolom aktif (harus mulai dari satuan, lalu ke kiri). */
export function pilihKolom(k: KeadaanResepsi, i: number): { k: KeadaanResepsi; ok: boolean } {
  if (i < 0 || i > 2) return { k, ok: false };
  if (i !== k.kol) return { k: { ...k, tolak: true }, ok: false };
  return { k, ok: true };
}
export function pilihTulisSusun(k: KeadaanResepsi, d: number): KeadaanResepsi {
  return d < 0 || d > 9 ? k : { ...k, pilihTulis: d };
}
export function pilihSimpanSusun(k: KeadaanResepsi, c: number): KeadaanResepsi {
  return c !== 0 && c !== 1 ? k : { ...k, pilihSimpan: c };
}
/** Jumlahkan kolom aktif: bila angka yang ditulis dan simpanannya benar, kolom selesai dan lanjut ke kiri; kolom ketiga selesai berarti sasaran selesai dan sasaran berikutnya dibuka. */
export function jumlahkanKolom(k: KeadaanResepsi): { k: KeadaanResepsi; ok: boolean; selesai: boolean } {
  if (k.pilihTulis !== tulisBenar(k) || k.pilihSimpan !== simpanBenarKolom(k)) return { k: { ...k, salah: k.salah + 1 }, ok: false, selesai: false };
  const tulis = [...k.tulis];
  tulis[k.kol] = k.pilihTulis;
  const masuk = [...k.masuk];
  if (k.kol < 2) masuk[k.kol + 1] = k.pilihSimpan;
  if (k.kol < 2) return { k: { ...k, tulis, masuk, kol: k.kol + 1, pilihTulis: -1, pilihSimpan: 0 }, ok: true, selesai: false };
  const pakaiSimpan = masuk[1] > 0 || masuk[2] > 0;
  const ke = k.susunKe + 1;
  return {
    k: {
      ...k,
      susunBenar: k.susunBenar.includes(k.susunKe) ? k.susunBenar : [...k.susunBenar, k.susunKe],
      simpanBenar: pakaiSimpan && !k.simpanBenar.includes(k.susunKe) ? [...k.simpanBenar, k.susunKe] : k.simpanBenar,
      susunKe: ke,
      kol: 0,
      tulis: [-1, -1, -1],
      masuk: [0, 0, 0],
      pilihTulis: -1,
      pilihSimpan: 0,
    },
    ok: true,
    selesai: true,
  };
}
export function petunjukSusun(k: KeadaanResepsi): string {
  if (k.pilihTulis < 0) return "Pilih angka yang ditulis di kolom ini dulu.";
  const jumlah = jumlahKolom(k, k.kol);
  if (jumlah >= 10 && k.pilihSimpan === 0) return "Jumlah di kolom ini sepuluh atau lebih. Satuan atau puluhan hanya boleh berisi satu angka, jadi simpan satu ke kolom di kirinya.";
  if (jumlah < 10 && k.pilihSimpan === 1) return "Jumlah di kolom ini kurang dari sepuluh, jadi tidak ada yang disimpan.";
  if (k.kol > 0 && k.masuk[k.kol] > 0) return "Jumlahkan angka di kolom ini bersama simpanan dari kolom di kanannya, lalu tulis satu angkanya.";
  return "Jumlahkan angka kedua bilangan di kolom ini, lalu tulis sisanya setelah sepuluh dipindahkan.";
}
export function kalimatSusun(k: KeadaanResepsi): string {
  if (k.susunBenar.length > 0 && k.kol === 0 && k.pilihTulis < 0) return "Betul! Ada penjumlahan berikutnya.";
  return `Kerjakan kolom ${NAMA_KOLOM[k.kol]}: pilih angka yang ditulis, simpan bila perlu, lalu tekan Jumlahkan kolom.`;
}

/* ------------------------------ Tukar ------------------------------ */
export const targetTukar = (k: KeadaanResepsi) => TARGET_TUKAR[k.tukarKe % TARGET_TUKAR.length];
export const sasaranTukar = (k: KeadaanResepsi): number[] => jumlahTempat(targetTukar(k).a, targetTukar(k).b);
/** Tukar sepuluh balok di tempat `dari` (0 satuan, 1 puluhan) menjadi satu balok di tempat kirinya. Alat menolak bila isinya kurang dari sepuluh. */
export function tukarBalok(k: KeadaanResepsi, dari: 0 | 1): { k: KeadaanResepsi; ok: boolean } {
  if (k.tukar[dari] < 10) return { k: { ...k, tolak: true }, ok: false };
  const tukar = [...k.tukar];
  tukar[dari] -= 10;
  tukar[dari + 1] += 1;
  return { k: { ...k, tukar }, ok: true };
}
export function periksaTukar(k: KeadaanResepsi): { k: KeadaanResepsi; ok: boolean } {
  if (k.tukar.every((n) => n <= 9)) {
    const ke = k.tukarKe + 1;
    const t = TARGET_TUKAR[ke % TARGET_TUKAR.length];
    return { k: { ...k, tukarBenar: k.tukarBenar.includes(k.tukarKe) ? k.tukarBenar : [...k.tukarBenar, k.tukarKe], tukarKe: ke, tukar: jumlahTempat(t.a, t.b) }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukTukar(k: KeadaanResepsi): string {
  const i = k.tukar.findIndex((n) => n >= 10);
  return i < 0 ? "Semua tempat sudah berisi satu angka." : `Tempat ${NAMA_KOLOM[i]} masih berisi sepuluh atau lebih. Tukar sepuluh balok di tempat itu menjadi satu balok di tempat kirinya.`;
}
export function kalimatTukar(k: KeadaanResepsi): string {
  if (k.tukarBenar.length > 0 && k.tukar.some((n) => n >= 10) && k.tukarKe > 0 && !k.tolak) return "Betul! Ada balok berikutnya.";
  return k.tukar.some((n) => n >= 10) ? "Tukar sepuluh balok menjadi satu balok di kirinya sampai tiap tempat berisi satu angka, lalu tekan Periksa." : "Semua tempat berisi satu angka. Tekan Periksa.";
}
export const jumlahTukarSekarang = (k: KeadaanResepsi): number => k.tukar[2] * 100 + k.tukar[1] * 10 + k.tukar[0];

/* ------------------------------ Genap ------------------------------ */
export const targetGenap = (k: KeadaanResepsi) => TARGET_GENAP[k.genapKe % TARGET_GENAP.length];
export const selisihGenap = (k: KeadaanResepsi): number => Math.abs(targetGenap(k).b - targetGenap(k).bulat);
/** Arah yang benar: bilangan lebih kecil dari bulatnya berarti dibulatkan ke atas, jadi hasil dikurangi (1); lebih besar berarti ke bawah, jadi ditambah (0). */
export const arahGenapBenar = (k: KeadaanResepsi): number => (targetGenap(k).b < targetGenap(k).bulat ? 1 : 0);
export const jumlahBulat = (k: KeadaanResepsi): number => targetGenap(k).a + targetGenap(k).bulat;
export function bulatkanGenap(k: KeadaanResepsi): KeadaanResepsi {
  return { ...k, bulat: true, arah: -1 };
}
/** Pilih menambah (0) atau mengurangi (1). Alat menolak bila bilangannya belum dibulatkan. */
export function pilihArahGenap(k: KeadaanResepsi, arah: 0 | 1): { k: KeadaanResepsi; ok: boolean } {
  if (!k.bulat) return { k: { ...k, tolak: true }, ok: false };
  return { k: { ...k, arah }, ok: true };
}
export function periksaGenap(k: KeadaanResepsi): { k: KeadaanResepsi; ok: boolean } {
  if (k.bulat && k.arah === arahGenapBenar(k)) {
    const ke = k.genapKe + 1;
    return { k: { ...k, genapBenar: k.genapBenar.includes(k.genapKe) ? k.genapBenar : [...k.genapBenar, k.genapKe], genapKe: ke, bulat: false, arah: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukGenap(k: KeadaanResepsi): string {
  if (!k.bulat) return "Bulatkan dulu bilangan yang hampir bulat, baru menyesuaikan hasilnya.";
  if (k.arah < 0) return "Pilih dulu: hasilnya ditambah atau dikurangi.";
  return "Bila bilangan dibulatkan ke atas, hasilnya jadi kelebihan, jadi dikurangi. Bila dibulatkan ke bawah, hasilnya jadi kekurangan, jadi ditambah.";
}
export function kalimatGenap(k: KeadaanResepsi): string {
  if (k.genapBenar.length > 0 && !k.bulat && k.arah < 0) return "Betul! Ada bilangan berikutnya.";
  return k.bulat ? "Sudah dibulatkan. Pilih ditambah atau dikurangi, lalu tekan Periksa." : "Tekan Bulatkan dulu, lalu sesuaikan hasilnya.";
}
