/**
 * Logika murni Simulasi Rak Stok Kelas 3 Bab 1 Sub-Bab A "Toples Permen Pak Joko" (bilangan tiga angka), awal cerita Toko Kelontong Pak Joko.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-tempat-k3b1a.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Tuang (tuang butir lepas sampai sepuluh jadi satu bungkus, sepuluh bungkus jadi satu dus; papan tiga tempat ikut berubah), Papan (atur papan tiga tempat
 * agar sama dengan benda di rak), Baca (pilih cara membaca bilangan di papan), dan Tulis (tulis angka dari kata bilangan, dengan nol penjaga tempat). Data ada di data-sim.ts.
 */
import { BARANG_STOK, TARGET_BACA, TARGET_PAPAN, TARGET_TULIS } from "./data-sim";

export type ModeStok = "tuang" | "papan" | "baca" | "tulis";

export type KeadaanStok = {
  alat: "stok";
  mode: ModeStok;
  /** Barang stok yang dipakai (nomor dalam BARANG_STOK). */
  barang: number;
  /** Tuang: benda lepas, kemasan sepuluh, dan kemasan seratus (penukaran sepuluh jadi satu terjadi otomatis). */
  butir: number;
  bungkus: number;
  dus: number;
  /** Sudah pernah menukar sepuluh benda lepas menjadi satu kemasan sepuluh, dan sepuluh kemasan sepuluh menjadi satu kemasan seratus. */
  tukarButir: boolean;
  tukarBungkus: boolean;
  /** Papan: sasaran ke berapa, angka yang diatur anak (ratusan, puluhan, satuan), dan sasaran yang sudah benar. */
  papanKe: number;
  papan: number[];
  papanBenar: number[];
  /** Baca: sasaran ke berapa, cara baca yang dipilih (-1 bila belum), dan sasaran yang sudah benar. */
  bacaKe: number;
  bacaPilih: number;
  bacaBenar: number[];
  /** Tulis: sasaran ke berapa, angka yang ditulis anak, dan sasaran yang sudah benar. */
  tulisKe: number;
  tulis: number[];
  tulisBenar: number[];
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalStok = (): KeadaanStok => ({
  alat: "stok",
  mode: "tuang",
  barang: 0,
  butir: 0,
  bungkus: 0,
  dus: 0,
  tukarButir: false,
  tukarBungkus: false,
  papanKe: 0,
  papan: [0, 0, 0],
  papanBenar: [],
  bacaKe: 0,
  bacaPilih: -1,
  bacaBenar: [],
  tulisKe: 0,
  tulis: [0, 0, 0],
  tulisBenar: [],
  salah: 0,
});
export const mulaiLagiStok = (): KeadaanStok => awalStok();

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
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
export { besar as hurufBesar };
export const digit = (n: number, t: number): number => (t === 0 ? Math.floor(n / 100) : t === 1 ? Math.floor(n / 10) % 10 : n % 10);
export const angkaDari = (d: number[]): number => d[0] * 100 + d[1] * 10 + d[2];
const NAMA_TEMPAT = ["ratusan", "puluhan", "satuan"] as const;
export const namaTempat = (t: number): string => NAMA_TEMPAT[t];

export const pilihModeStok = (k: KeadaanStok, mode: ModeStok): KeadaanStok => ({ ...k, mode });
export const pilihBarang = (k: KeadaanStok, i: number): KeadaanStok => (i < 0 || i >= BARANG_STOK.length ? k : { ...k, barang: i });
export const satuanBarang = (k: KeadaanStok): readonly [string, string, string] => BARANG_STOK[k.barang].satuan;

/* ------------------------------ Tuang ------------------------------ */
export const jumlahStok = (k: KeadaanStok): number => k.dus * 100 + k.bungkus * 10 + k.butir;
export type HasilTuang = { k: KeadaanStok; ok: boolean; tukar: "butir" | "bungkus" | null };
const penuh = (k: KeadaanStok): boolean => jumlahStok(k) >= 999;
/** Tuang satu benda lepas. Sepuluh benda lepas langsung menjadi satu bungkus, dan sepuluh bungkus menjadi satu dus. */
export function tambahButir(k: KeadaanStok): HasilTuang {
  if (penuh(k)) return { k, ok: false, tukar: null };
  let { butir, bungkus, dus, tukarButir, tukarBungkus } = k;
  let tukar: HasilTuang["tukar"] = null;
  butir += 1;
  if (butir === 10) {
    butir = 0;
    bungkus += 1;
    tukarButir = true;
    tukar = "butir";
    if (bungkus === 10) {
      bungkus = 0;
      dus += 1;
      tukarBungkus = true;
      tukar = "bungkus";
    }
  }
  return { k: { ...k, butir, bungkus, dus, tukarButir, tukarBungkus }, ok: true, tukar };
}
/** Tuang satu bungkus penuh (sepuluh benda). Sepuluh bungkus langsung menjadi satu dus. */
export function tambahBungkus(k: KeadaanStok): HasilTuang {
  if (jumlahStok(k) + 10 > 999) return { k, ok: false, tukar: null };
  let { bungkus, dus, tukarBungkus } = k;
  let tukar: HasilTuang["tukar"] = null;
  bungkus += 1;
  if (bungkus === 10) {
    bungkus = 0;
    dus += 1;
    tukarBungkus = true;
    tukar = "bungkus";
  }
  return { k: { ...k, bungkus, dus, tukarBungkus }, ok: true, tukar };
}
/** Tuang satu dus penuh (seratus benda). */
export function tambahDus(k: KeadaanStok): HasilTuang {
  if (jumlahStok(k) + 100 > 999) return { k, ok: false, tukar: null };
  return { k: { ...k, dus: k.dus + 1 }, ok: true, tukar: null };
}
export const kosongkanTuang = (k: KeadaanStok): KeadaanStok => ({ ...k, butir: 0, bungkus: 0, dus: 0 });
export function kalimatTuang(k: KeadaanStok): string {
  const [a, b, c] = satuanBarang(k);
  const n = jumlahStok(k);
  if (n === 0) return `Rak kosong. Tuang ${a} satu per satu, atau tuang ${b} dan ${c}.`;
  return `${besar(kata(k.dus))} ${c}, ${kata(k.bungkus)} ${b}, dan ${kata(k.butir)} ${a} lepas. Papan membaca ${kata(n)}.`;
}
export function kalimatTukar(tukar: "butir" | "bungkus", k: KeadaanStok): string {
  const [a, b, c] = satuanBarang(k);
  return tukar === "butir" ? `Sepuluh ${a} lepas langsung menjadi satu ${b}. Sepuluh jadi satu, tempatnya naik.` : `Sepuluh ${b} langsung menjadi satu ${c}. Sepuluh jadi satu, tempatnya naik.`;
}

/* ------------------------------ Pengecoh bilangan ------------------------------ */
/** Dua pengecoh khas untuk bilangan `n` (angka nol dibuang, tempat tertukar, atau selisih sepuluh), tanpa kembar. */
export function pengecohSim(n: number): number[] {
  const r = digit(n, 0);
  const p = digit(n, 1);
  const s = digit(n, 2);
  const buang = Number(String(n).replace(/0/g, "") || "0");
  const calon = [buang, r * 100 + s * 10 + p, p * 100 + r * 10 + s, n + 10, n - 10, n + 1];
  const hasil: number[] = [];
  for (const c of calon) if (Number.isInteger(c) && c >= 1 && c <= 999 && c !== n && !hasil.includes(c)) hasil.push(c);
  return hasil.slice(0, 2);
}

/* ------------------------------ Papan (dari benda ke angka) ------------------------------ */
export const targetPapan = (k: KeadaanStok): number => TARGET_PAPAN[k.papanKe % TARGET_PAPAN.length];
export function ubahAngka(papan: number[], t: number, arah: 1 | -1): { papan: number[]; ok: boolean } {
  if (t < 0 || t > 2) return { papan, ok: false };
  const baru = papan[t] + arah;
  if (baru < 0 || baru > 9) return { papan, ok: false };
  return { papan: papan.map((d, i) => (i === t ? baru : d)), ok: true };
}
export function ubahPapan(k: KeadaanStok, t: number, arah: 1 | -1): { k: KeadaanStok; ok: boolean } {
  const r = ubahAngka(k.papan, t, arah);
  return { k: r.ok ? { ...k, papan: r.papan } : k, ok: r.ok };
}
/** Periksa papan dengan benda di rak. Bila tepat, sasaran berikutnya dibuka dan papan dikosongkan. */
export function periksaPapan(k: KeadaanStok): { k: KeadaanStok; ok: boolean } {
  const t = targetPapan(k);
  if (angkaDari(k.papan) === t) return { k: { ...k, papanBenar: k.papanBenar.includes(k.papanKe) ? k.papanBenar : [...k.papanBenar, k.papanKe], papanKe: k.papanKe + 1, papan: [0, 0, 0] }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukPapan(k: KeadaanStok): string {
  const t = targetPapan(k);
  const j = [0, 1, 2].find((i) => k.papan[i] !== digit(t, i));
  if (j === undefined) return "";
  return `Angka di tempat ${namaTempat(j)} belum tepat. Hitung benda di rak ${namaTempat(j)}, lalu atur angkanya.`;
}
export function kalimatPapan(k: KeadaanStok): string {
  return k.papanBenar.length > 0 && k.papan.every((d) => d === 0) ? "Papan sudah tepat! Ada rak berikutnya." : "Hitung benda di tiap rak, lalu atur angka di papan tiga tempat dan tekan Periksa.";
}

/* ------------------------------ Baca ------------------------------ */
export const targetBaca = (k: KeadaanStok): number => TARGET_BACA[k.bacaKe % TARGET_BACA.length];
/** Tiga cara baca (kata) untuk bilangan sasaran: yang benar tidak di tempat pertama (deterministik). */
export function pilihanBaca(n: number): string[] {
  const [a, b] = pengecohSim(n);
  const lain = [kata(a), kata(b)];
  const p = 1 + (n % 2);
  return [...lain.slice(0, p), kata(n), ...lain.slice(p)];
}
export function pilihBaca(k: KeadaanStok, i: number): KeadaanStok {
  return i < 0 || i >= 3 ? k : { ...k, bacaPilih: i };
}
export function periksaBaca(k: KeadaanStok): { k: KeadaanStok; ok: boolean } {
  const n = targetBaca(k);
  const pil = pilihanBaca(n);
  if (k.bacaPilih >= 0 && pil[k.bacaPilih] === kata(n)) return { k: { ...k, bacaBenar: k.bacaBenar.includes(k.bacaKe) ? k.bacaBenar : [...k.bacaBenar, k.bacaKe], bacaKe: k.bacaKe + 1, bacaPilih: -1 }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukBaca(k: KeadaanStok): string {
  if (k.bacaPilih < 0) return "Pilih satu cara membaca dulu.";
  return "Baca dari kiri: ratusan dulu, lalu puluhan, lalu satuan. Angka nol tidak diucapkan, tetapi tempatnya tetap dihitung.";
}
export function kalimatBaca(k: KeadaanStok): string {
  return k.bacaBenar.length > 0 && k.bacaPilih < 0 ? "Betul! Bacaannya tepat. Ada papan berikutnya." : "Baca bilangan di papan dari kiri, lalu pilih cara membacanya dan tekan Periksa.";
}

/* ------------------------------ Tulis (dari kata ke angka) ------------------------------ */
export const targetTulis = (k: KeadaanStok): number => TARGET_TULIS[k.tulisKe % TARGET_TULIS.length];
export function ubahTulis(k: KeadaanStok, t: number, arah: 1 | -1): { k: KeadaanStok; ok: boolean } {
  const r = ubahAngka(k.tulis, t, arah);
  return { k: r.ok ? { ...k, tulis: r.papan } : k, ok: r.ok };
}
export function periksaTulis(k: KeadaanStok): { k: KeadaanStok; ok: boolean } {
  const t = targetTulis(k);
  if (angkaDari(k.tulis) === t) return { k: { ...k, tulisBenar: k.tulisBenar.includes(k.tulisKe) ? k.tulisBenar : [...k.tulisBenar, k.tulisKe], tulisKe: k.tulisKe + 1, tulis: [0, 0, 0] }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukTulis(k: KeadaanStok): string {
  const t = targetTulis(k);
  const j = [0, 1, 2].find((i) => k.tulis[i] !== digit(t, i));
  if (j === undefined) return "";
  const kosong = digit(t, j) === 0;
  return kosong ? `Kata ${NAMA_TEMPAT[j] === "puluhan" ? "puluh" : NAMA_TEMPAT[j] === "ratusan" ? "ratus" : "satuan"} tidak disebut, jadi tempat ${namaTempat(j)} diisi angka nol.` : `Angka di tempat ${namaTempat(j)} belum tepat. Dengarkan kata ratus, puluh, dan angka satuannya.`;
}
export function kalimatTulis(k: KeadaanStok): string {
  return k.tulisBenar.length > 0 && k.tulis.every((d) => d === 0) ? "Betul! Tulisannya tepat. Ada kata berikutnya." : "Baca kata bilangannya, atur angka di tiap tempat, lalu tekan Periksa.";
}
