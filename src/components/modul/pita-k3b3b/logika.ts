/**
 * Logika murni Simulasi Bengkel Pita Kelas 3 Bab 3 Sub-Bab B "Pita Pak Wayan" (hubungan sentimeter dan meter), Kebun Binatang Mini.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-pita-k3b3b.mjs. Eksplorasi bebas tanpa skor.
 * Lima alat: Tukar (potongan pita 100 cm, 10 cm, dan 1 cm ditukar sepuluh-ke-satu), Ubah (meter ke sentimeter dikali seratus, sentimeter ke meter dibagi seratus),
 * Gabung (ukuran sentimeter ditulis dengan meter dan sentimeter bersama), Sambung (menyambung dan memotong pita: meter dengan meter, sentimeter dengan sentimeter, tukar dan pinjam)
 * dan Banding (memilih pita yang paling panjang). Data ada di data-sim.ts. Ukuran paling panjang sembilan ratus sembilan puluh sembilan sentimeter.
 */
import { TARGET_BANDING, TARGET_GABUNG, TARGET_SAMBUNG, TARGET_TUKAR, TARGET_UBAH } from "./data-sim";

export type ModePita = "tukar" | "ubah" | "gabung" | "sambung" | "banding";
type Tiga = [number, number, number];

export type KeadaanPita = {
  alat: "pita";
  mode: ModePita;
  /** Tukar: sasaran ke berapa, potongan pita yang ada [100 cm, 10 cm, 1 cm], dan sasaran yang sudah benar. */
  tukarKe: number;
  potongan: Tiga;
  tukarBenar: number[];
  /** Ubah: sasaran ke berapa, tiga angka yang diatur anak (ratusan, puluhan, satuan), dan sasaran yang sudah benar. */
  ubahKe: number;
  ubah: Tiga;
  ubahBenar: number[];
  /** Gabung: sasaran ke berapa, angka meter, puluhan, dan satuan sentimeter yang diatur anak, dan sasaran yang sudah benar. */
  gabungKe: number;
  gabung: Tiga;
  gabungBenar: number[];
  /** Sambung: sasaran ke berapa, hasil meter, puluhan, dan satuan sentimeter yang diatur anak, dan sasaran yang sudah benar. */
  sambungKe: number;
  sambung: Tiga;
  sambungBenar: number[];
  /** Banding: sasaran ke berapa, pita yang dipilih anak (-1 belum memilih), dan sasaran yang sudah benar. */
  bandingKe: number;
  bandingPilih: number;
  bandingBenar: number[];
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalPita = (): KeadaanPita => ({
  alat: "pita",
  mode: "tukar",
  tukarKe: 0,
  potongan: [...TARGET_TUKAR[0].awal],
  tukarBenar: [],
  ubahKe: 0,
  ubah: [0, 0, 0],
  ubahBenar: [],
  gabungKe: 0,
  gabung: [0, 0, 0],
  gabungBenar: [],
  sambungKe: 0,
  sambung: [0, 0, 0],
  sambungBenar: [],
  bandingKe: 0,
  bandingPilih: -1,
  bandingBenar: [],
  salah: 0,
});
export const mulaiLagiPita = (): KeadaanPita => awalPita();

/* ------------------------------ Kata (tanpa digit) ------------------------------ */
const SAT = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"] as const;
/** Nama bilangan 0 sampai 999 dalam kata. */
export function kata(n: number): string {
  if (n < 10) return SAT[n] ?? String(n);
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SAT[n - 10]} belas`;
  if (n < 100) {
    const p = Math.floor(n / 10);
    const s = n % 10;
    return s === 0 ? `${SAT[p]} puluh` : `${SAT[p]} puluh ${SAT[s]}`;
  }
  const r = Math.floor(n / 100);
  const sisa = n % 100;
  const ratus = r === 1 ? "seratus" : `${SAT[r]} ratus`;
  return sisa === 0 ? ratus : `${ratus} ${kata(sisa)}`;
}
export const hurufBesar = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);
/** Ukuran dalam kata: "dua meter enam puluh sentimeter". */
export const kataUkuran = (m: number, c: number): string => (c === 0 ? `${kata(m)} meter` : m === 0 ? `${kata(c)} sentimeter` : `${kata(m)} meter ${kata(c)} sentimeter`);

export const pilihModePita = (k: KeadaanPita, mode: ModePita): KeadaanPita => ({ ...k, mode });
export const tigaAngka = (d: readonly number[]): number => d[0] * 100 + d[1] * 10 + d[2];
export const bilDigit = tigaAngka;

/** Mengubah satu angka naik atau turun, paling sedikit nol dan paling banyak sembilan. */
export function ubahDigit(d: Tiga, t: number, arah: 1 | -1): { d: Tiga; ok: boolean } {
  if (t < 0 || t > 2) return { d, ok: false };
  const baru = d[t] + arah;
  if (baru < 0 || baru > 9) return { d, ok: false };
  const n: Tiga = [d[0], d[1], d[2]];
  n[t] = baru;
  return { d: n, ok: true };
}
const tambahBenar = (daftar: number[], i: number): number[] => (daftar.includes(i) ? daftar : [...daftar, i]);

/* ------------------------------ Tukar ------------------------------ */
export const targetTukar = (k: KeadaanPita) => TARGET_TUKAR[k.tukarKe % TARGET_TUKAR.length];
export const jumlahPotongan = (p: readonly number[]): number => p[0] * 100 + p[1] * 10 + p[2];
/** Pita sudah paling sedikit potongan: kurang dari sepuluh potongan 10 cm dan kurang dari sepuluh potongan 1 cm. */
export const sudahDitukar = (p: readonly number[]): boolean => p[1] < 10 && p[2] < 10;
/** Tukar sepuluh potongan 1 cm menjadi satu potongan 10 cm. */
export function tukarSatuan(k: KeadaanPita): { k: KeadaanPita; ok: boolean } {
  if (k.potongan[2] < 10) return { k, ok: false };
  return { k: { ...k, potongan: [k.potongan[0], k.potongan[1] + 1, k.potongan[2] - 10] }, ok: true };
}
/** Tukar sepuluh potongan 10 cm menjadi satu potongan 100 cm. */
export function tukarPuluhan(k: KeadaanPita): { k: KeadaanPita; ok: boolean } {
  if (k.potongan[1] < 10) return { k, ok: false };
  return { k: { ...k, potongan: [k.potongan[0] + 1, k.potongan[1] - 10, k.potongan[2]] }, ok: true };
}
export const kembalikanTukar = (k: KeadaanPita): KeadaanPita => ({ ...k, potongan: [...targetTukar(k).awal] });
/** Periksa: bila semua yang bisa ditukar sudah ditukar, sasaran berikutnya dibuka. */
export function periksaTukar(k: KeadaanPita): { k: KeadaanPita; ok: boolean } {
  if (sudahDitukar(k.potongan)) {
    const ke = k.tukarKe + 1;
    return { k: { ...k, tukarBenar: tambahBenar(k.tukarBenar, k.tukarKe), tukarKe: ke, potongan: [...TARGET_TUKAR[ke % TARGET_TUKAR.length].awal] }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukTukar(k: KeadaanPita): string {
  if (k.potongan[2] >= 10) return "Masih ada sepuluh potongan satu sentimeter atau lebih. Tukar sepuluh potongan itu menjadi satu potongan sepuluh sentimeter.";
  if (k.potongan[1] >= 10) return "Masih ada sepuluh potongan sepuluh sentimeter atau lebih. Tukar sepuluh potongan itu menjadi satu potongan seratus sentimeter, yaitu satu meter.";
  return "Pita sudah ditukar.";
}
export function kalimatTukar(k: KeadaanPita): string {
  if (k.tukarBenar.length > 0 && k.potongan.join() === targetTukar(k).awal.join()) return "Betul! Pita sudah ditukar. Ada tumpukan potongan berikutnya.";
  const p = k.potongan;
  return `Ada ${kata(p[0])} potongan satu meter, ${kata(p[1])} potongan sepuluh sentimeter, dan ${kata(p[2])} potongan satu sentimeter. Tukar sepuluh-ke-satu, lalu tekan Periksa.`;
}

/* ------------------------------ Ubah ------------------------------ */
export const targetUbah = (k: KeadaanPita) => TARGET_UBAH[k.ubahKe % TARGET_UBAH.length];
/** Bilangan yang dicari: sentimeter (ke-cm) atau banyak meter (ke-m). */
export const jawabUbah = (k: KeadaanPita): number => {
  const t = targetUbah(k);
  return t.arah === "ke-cm" ? t.m * 100 + t.c : t.m;
};
export function ubahAngka(k: KeadaanPita, t: number, arah: 1 | -1): { k: KeadaanPita; ok: boolean } {
  const r = ubahDigit(k.ubah, t, arah);
  return { k: r.ok ? { ...k, ubah: r.d } : k, ok: r.ok };
}
export function periksaUbah(k: KeadaanPita): { k: KeadaanPita; ok: boolean } {
  if (tigaAngka(k.ubah) === jawabUbah(k)) return { k: { ...k, ubahBenar: tambahBenar(k.ubahBenar, k.ubahKe), ubahKe: k.ubahKe + 1, ubah: [0, 0, 0] }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukUbah(k: KeadaanPita): string {
  const t = targetUbah(k);
  if (t.arah === "ke-cm") return `Meter ke sentimeter dikalikan seratus: ${kata(t.m)} kali seratus${t.c > 0 ? `, ditambah ${kata(t.c)} sentimeter` : ""}. Satu meter sama dengan seratus sentimeter.`;
  return `Sentimeter ke meter dibagi seratus: ${kata(t.m * 100)} dibagi seratus. Cari berapa kali seratus sentimeter ada di dalamnya.`;
}
export function kalimatUbah(k: KeadaanPita): string {
  const t = targetUbah(k);
  if (k.ubahBenar.length > 0 && tigaAngka(k.ubah) === 0) return "Betul! Ukurannya sudah diubah. Ada ukuran berikutnya.";
  return t.arah === "ke-cm" ? `Pita panjangnya ${kataUkuran(t.m, t.c)}. Atur berapa sentimeternya, lalu tekan Periksa.` : `Pita panjangnya ${kata(t.m * 100)} sentimeter. Atur berapa meternya, lalu tekan Periksa.`;
}

/* ------------------------------ Gabung ------------------------------ */
export const targetGabung = (k: KeadaanPita) => TARGET_GABUNG[k.gabungKe % TARGET_GABUNG.length];
/** Meter dan sentimeter yang benar untuk sasaran ini. */
export const bagianGabung = (k: KeadaanPita): [number, number] => [Math.floor(targetGabung(k).total / 100), targetGabung(k).total % 100];
export function ubahGabung(k: KeadaanPita, t: number, arah: 1 | -1): { k: KeadaanPita; ok: boolean } {
  const r = ubahDigit(k.gabung, t, arah);
  return { k: r.ok ? { ...k, gabung: r.d } : k, ok: r.ok };
}
export function periksaGabung(k: KeadaanPita): { k: KeadaanPita; ok: boolean } {
  const [m, c] = bagianGabung(k);
  if (k.gabung[0] === m && k.gabung[1] * 10 + k.gabung[2] === c) return { k: { ...k, gabungBenar: tambahBenar(k.gabungBenar, k.gabungKe), gabungKe: k.gabungKe + 1, gabung: [0, 0, 0] }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukGabung(k: KeadaanPita): string {
  const [m, c] = bagianGabung(k);
  return `Tiap seratus sentimeter menjadi satu meter. ${kata(targetGabung(k).total)} sentimeter: ambil dulu banyak meternya, sisanya tetap sentimeter. Hasilnya ${kataUkuran(m, c)}.`;
}
export function kalimatGabung(k: KeadaanPita): string {
  if (k.gabungBenar.length > 0 && tigaAngka(k.gabung) === 0) return "Betul! Ukurannya sudah ditulis dengan meter dan sentimeter. Ada ukuran berikutnya.";
  return `Pita panjangnya ${kata(targetGabung(k).total)} sentimeter. Tulis dengan meter dan sentimeter bersama, lalu tekan Periksa.`;
}

/* ------------------------------ Sambung ------------------------------ */
export const targetSambung = (k: KeadaanPita) => TARGET_SAMBUNG[k.sambungKe % TARGET_SAMBUNG.length];
/** Hasil sambung atau potong: [meter, sentimeter]. */
export function hasilSambung(k: KeadaanPita): [number, number] {
  const t = targetSambung(k);
  const a = t.a[0] * 100 + t.a[1];
  const b = t.b[0] * 100 + t.b[1];
  const r = t.op === "tambah" ? a + b : a - b;
  return [Math.floor(r / 100), r % 100];
}
export function ubahSambung(k: KeadaanPita, t: number, arah: 1 | -1): { k: KeadaanPita; ok: boolean } {
  const r = ubahDigit(k.sambung, t, arah);
  return { k: r.ok ? { ...k, sambung: r.d } : k, ok: r.ok };
}
export function periksaSambung(k: KeadaanPita): { k: KeadaanPita; ok: boolean } {
  const [m, c] = hasilSambung(k);
  if (k.sambung[0] === m && k.sambung[1] * 10 + k.sambung[2] === c) return { k: { ...k, sambungBenar: tambahBenar(k.sambungBenar, k.sambungKe), sambungKe: k.sambungKe + 1, sambung: [0, 0, 0] }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukSambung(k: KeadaanPita): string {
  const t = targetSambung(k);
  const [m, c] = hasilSambung(k);
  const tukar = t.op === "tambah" ? t.a[1] + t.b[1] >= 100 : t.a[1] < t.b[1];
  const aturan = t.op === "tambah" ? "Jumlahkan meter dengan meter dan sentimeter dengan sentimeter." : "Kurangkan meter dengan meter dan sentimeter dengan sentimeter.";
  const khusus = !tukar ? "" : t.op === "tambah" ? " Sentimeternya lebih dari seratus, jadi seratus sentimeter ditukar menjadi satu meter." : " Sentimeternya kurang, jadi pinjam satu meter menjadi seratus sentimeter.";
  return `${aturan}${khusus} Hasilnya ${kataUkuran(m, c)}.`;
}
export function kalimatSambung(k: KeadaanPita): string {
  const t = targetSambung(k);
  if (k.sambungBenar.length > 0 && tigaAngka(k.sambung) === 0) return "Betul! Hasilnya sudah tepat. Ada pita berikutnya.";
  return `${t.op === "tambah" ? "Sambung" : "Potong"} pita ${kataUkuran(t.a[0], t.a[1])} ${t.op === "tambah" ? "dengan" : "sebanyak"} ${kataUkuran(t.b[0], t.b[1])}. Atur hasilnya, lalu tekan Periksa.`;
}

/* ------------------------------ Banding ------------------------------ */
export const targetBanding = (k: KeadaanPita) => TARGET_BANDING[k.bandingKe % TARGET_BANDING.length];
export const nomorPanjang = (k: KeadaanPita): number => {
  const u = targetBanding(k).ukuran;
  return u.indexOf(Math.max(...u));
};
export function pilihBanding(k: KeadaanPita, i: number): KeadaanPita {
  return i < 0 || i > 2 ? k : { ...k, bandingPilih: i };
}
export function periksaBanding(k: KeadaanPita): { k: KeadaanPita; ok: boolean } {
  if (k.bandingPilih === nomorPanjang(k)) return { k: { ...k, bandingBenar: tambahBenar(k.bandingBenar, k.bandingKe), bandingKe: k.bandingKe + 1, bandingPilih: -1 }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukBanding(k: KeadaanPita): string {
  if (k.bandingPilih < 0) return "Pilih satu pita dulu.";
  const u = targetBanding(k).ukuran;
  return `Ubah semua ukuran ke sentimeter dulu: ${kata(u[0])}, ${kata(u[1])}, dan ${kata(u[2])}. Yang paling besar paling panjang.`;
}
export function kalimatBanding(k: KeadaanPita): string {
  return k.bandingBenar.length > 0 && k.bandingPilih < 0 ? "Betul! Pita terpanjangnya tepat. Ada tiga pita berikutnya." : "Ubah semua ukuran ke sentimeter, pilih pita yang paling panjang, lalu tekan Periksa.";
}
