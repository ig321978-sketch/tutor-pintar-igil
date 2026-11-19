/**
 * Logika murni Simulasi Pos Persediaan Kelas 3 Bab 2 Sub-Bab B "Botol Air Pak Darto" (kalimat Matematika pengurangan), akhir cerita Perkemahan Akhir Pekan.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-botol-k3b2b.mjs. Eksplorasi bebas tanpa skor.
 * Lima alat: Bagikan (ambil benda dari rak sampai sisa sesuai sasaran, kalimat pengurangan ikut tampil), Dikurangkan (cari bilangan yang dikurangkan dengan awal dikurangi sisa),
 * Awal (cari bilangan awal dengan menambah yang dikurangkan dan sisa), Periksa (periksa dengan mengurangkan lagi: cocok atau tidak cocok) dan Pasangan (banyak kemungkinan terjual dan sisa untuk seratus).
 * Data ada di data-sim.ts. Bilangan paling besar seratus.
 */
import { AWAL_PASANGAN, BARANG_POS, TARGET_AWAL, TARGET_BAGIKAN, TARGET_KURANG, TARGET_PERIKSA } from "./data-sim";

export type ModePersediaan = "bagikan" | "kurang" | "awal" | "periksa" | "pasangan";

export type KeadaanPersediaan = {
  alat: "persediaan";
  mode: ModePersediaan;
  /** Barang persediaan yang dipakai (nomor dalam BARANG_POS). */
  barang: number;
  /** Bagikan: sasaran ke berapa, banyak benda yang sudah dibagikan, dan sasaran yang sudah benar. */
  bagikanKe: number;
  dibagikan: number;
  bagikanBenar: number[];
  /** Dikurangkan: kalimat ke berapa, angka puluhan dan satuan yang diatur anak, dan yang sudah benar. */
  kurangKe: number;
  kurang: [number, number];
  kurangBenar: number[];
  /** Awal: bilangan awal yang diatur anak (puluhan dan satuan). */
  awalKe: number;
  awal: [number, number];
  awalBenar: number[];
  /** Periksa: catatan ke berapa, pilihan anak (0 cocok, 1 tidak cocok, -1 belum memilih), dan catatan yang sudah benar. */
  periksaKe: number;
  periksaPilih: number;
  periksaBenar: number[];
  /** Pasangan: banyak terjual yang diatur (puluhan dan satuan) dan pasangan yang sudah dicatat (banyak terjual). */
  terjual: [number, number];
  pasangan: number[];
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalPersediaan = (): KeadaanPersediaan => ({
  alat: "persediaan",
  mode: "bagikan",
  barang: 0,
  bagikanKe: 0,
  dibagikan: 0,
  bagikanBenar: [],
  kurangKe: 0,
  kurang: [0, 0],
  kurangBenar: [],
  awalKe: 0,
  awal: [0, 0],
  awalBenar: [],
  periksaKe: 0,
  periksaPilih: -1,
  periksaBenar: [],
  terjual: [0, 0],
  pasangan: [],
  salah: 0,
});
export const mulaiLagiPersediaan = (): KeadaanPersediaan => awalPersediaan();

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
export const bilDigit = (d: readonly number[]): number => d[0] * 10 + d[1];

export const pilihModePersediaan = (k: KeadaanPersediaan, mode: ModePersediaan): KeadaanPersediaan => ({ ...k, mode });
export const pilihBarangPos = (k: KeadaanPersediaan, i: number): KeadaanPersediaan => (i < 0 || i >= BARANG_POS.length ? k : { ...k, barang: i });
export const satuanBarangPos = (k: KeadaanPersediaan): readonly [string, string] => BARANG_POS[k.barang].satuan;

/** Mengubah satu angka (puluhan atau satuan) naik atau turun, paling sedikit nol dan paling banyak sembilan. */
export function ubahDigit(d: [number, number], t: number, arah: 1 | -1): { d: [number, number]; ok: boolean } {
  if (t < 0 || t > 1) return { d, ok: false };
  const baru = d[t] + arah;
  if (baru < 0 || baru > 9) return { d, ok: false };
  return { d: t === 0 ? [baru, d[1]] : [d[0], baru], ok: true };
}

/* ------------------------------ Bagikan ------------------------------ */
export const targetBagikan = (k: KeadaanPersediaan) => TARGET_BAGIKAN[k.bagikanKe % TARGET_BAGIKAN.length];
export const sisaBagikan = (k: KeadaanPersediaan): number => targetBagikan(k).awal - k.dibagikan;
/** Bagikan sebanyak `n` (satu atau sepuluh) benda dari rak; tidak boleh melebihi isi rak. */
export function bagikanBenda(k: KeadaanPersediaan, n: number): { k: KeadaanPersediaan; ok: boolean } {
  if (n < 1 || k.dibagikan + n > targetBagikan(k).awal) return { k, ok: false };
  return { k: { ...k, dibagikan: k.dibagikan + n }, ok: true };
}
export const kembalikanBagikan = (k: KeadaanPersediaan): KeadaanPersediaan => ({ ...k, dibagikan: 0 });
/** Periksa: bila sisa sama dengan sasaran, sasaran berikutnya dibuka dan rak diisi penuh lagi. */
export function periksaBagikan(k: KeadaanPersediaan): { k: KeadaanPersediaan; ok: boolean } {
  const t = targetBagikan(k);
  if (t.awal - k.dibagikan === t.sisa) return { k: { ...k, bagikanBenar: k.bagikanBenar.includes(k.bagikanKe) ? k.bagikanBenar : [...k.bagikanBenar, k.bagikanKe], bagikanKe: k.bagikanKe + 1, dibagikan: 0 }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukBagikan(k: KeadaanPersediaan): string {
  const t = targetBagikan(k);
  const s = t.awal - k.dibagikan;
  if (k.dibagikan === 0) return `Bagikan benda dari rak sampai tersisa ${kata(t.sisa)}.`;
  return s > t.sisa ? "Sisanya masih terlalu banyak. Bagikan lebih banyak lagi." : "Sisanya sudah terlalu sedikit. Kembalikan, lalu bagikan lebih sedikit.";
}
export function kalimatBagikan(k: KeadaanPersediaan): string {
  const t = targetBagikan(k);
  if (k.bagikanBenar.length > 0 && k.dibagikan === 0) return "Betul! Sisanya sudah sesuai. Ada rak berikutnya.";
  return `Rak berisi ${kata(t.awal)}. Bagikan sampai tersisa ${kata(t.sisa)}, lalu tekan Periksa. Yang dibagikan sekarang ${kata(k.dibagikan)}, sisanya ${kata(sisaBagikan(k))}.`;
}

/* ------------------------------ Dikurangkan ------------------------------ */
export const targetKurang = (k: KeadaanPersediaan) => TARGET_KURANG[k.kurangKe % TARGET_KURANG.length];
export const jawabKurang = (k: KeadaanPersediaan): number => targetKurang(k).awal - targetKurang(k).sisa;
export function ubahKurang(k: KeadaanPersediaan, t: number, arah: 1 | -1): { k: KeadaanPersediaan; ok: boolean } {
  const r = ubahDigit(k.kurang, t, arah);
  return { k: r.ok ? { ...k, kurang: r.d } : k, ok: r.ok };
}
export function periksaKurang(k: KeadaanPersediaan): { k: KeadaanPersediaan; ok: boolean } {
  if (bilDigit(k.kurang) === jawabKurang(k)) return { k: { ...k, kurangBenar: k.kurangBenar.includes(k.kurangKe) ? k.kurangBenar : [...k.kurangBenar, k.kurangKe], kurangKe: k.kurangKe + 1, kurang: [0, 0] }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukKurang(k: KeadaanPersediaan): string {
  const b = bilDigit(k.kurang);
  const t = targetKurang(k);
  if (b > t.awal) return "Bilangan yang dikurangkan tidak mungkin lebih besar daripada bilangan awal. Cari dengan awal dikurangi sisa.";
  return `Bilangan yang dikurangkan dicari dengan awal dikurangi sisa: ${kata(t.awal)} dikurangi ${kata(t.sisa)}. Periksa dengan mengurangkan lagi.`;
}
export function kalimatKurang(k: KeadaanPersediaan): string {
  const t = targetKurang(k);
  return k.kurangBenar.length > 0 && bilDigit(k.kurang) === 0 ? "Betul! Bilangan yang dikurangkan ketemu. Ada kalimat berikutnya." : `Kalimatnya ${kata(t.awal)} dikurangi titik-titik sama dengan ${kata(t.sisa)}. Atur bilangan yang dikurangkan, lalu tekan Periksa.`;
}

/* ------------------------------ Awal ------------------------------ */
export const targetAwal = (k: KeadaanPersediaan) => TARGET_AWAL[k.awalKe % TARGET_AWAL.length];
export const jawabAwal = (k: KeadaanPersediaan): number => targetAwal(k).kurang + targetAwal(k).sisa;
export function ubahAwal(k: KeadaanPersediaan, t: number, arah: 1 | -1): { k: KeadaanPersediaan; ok: boolean } {
  const r = ubahDigit(k.awal, t, arah);
  return { k: r.ok ? { ...k, awal: r.d } : k, ok: r.ok };
}
export function periksaAwal(k: KeadaanPersediaan): { k: KeadaanPersediaan; ok: boolean } {
  if (bilDigit(k.awal) === jawabAwal(k)) return { k: { ...k, awalBenar: k.awalBenar.includes(k.awalKe) ? k.awalBenar : [...k.awalBenar, k.awalKe], awalKe: k.awalKe + 1, awal: [0, 0] }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukAwal(k: KeadaanPersediaan): string {
  const t = targetAwal(k);
  const b = bilDigit(k.awal);
  if (b > 0 && b < t.sisa) return "Bilangan awal tidak mungkin lebih kecil daripada sisa. Awal dicari dengan menambah, bukan dikurangkan.";
  return `Bilangan awal dicari dengan menambah yang dikurangkan dan sisa: ${kata(t.kurang)} tambah ${kata(t.sisa)}. Periksa dengan mengurangkan lagi.`;
}
export function kalimatAwal(k: KeadaanPersediaan): string {
  const t = targetAwal(k);
  return k.awalBenar.length > 0 && bilDigit(k.awal) === 0 ? "Betul! Bilangan awal ketemu. Ada kalimat berikutnya." : `Kalimatnya titik-titik dikurangi ${kata(t.kurang)} sama dengan ${kata(t.sisa)}. Atur bilangan awal, lalu tekan Periksa.`;
}

/* ------------------------------ Periksa ------------------------------ */
export const targetPeriksa = (k: KeadaanPersediaan) => TARGET_PERIKSA[k.periksaKe % TARGET_PERIKSA.length];
export const hasilPengurangan = (k: KeadaanPersediaan): number => targetPeriksa(k).awal - targetPeriksa(k).kurang;
/** Catatan cocok bila awal dikurangi yang dikurangkan sama dengan sisa yang dicatat. */
export const catatanCocok = (k: KeadaanPersediaan): boolean => hasilPengurangan(k) === targetPeriksa(k).sisa;
export function pilihPeriksa(k: KeadaanPersediaan, i: number): KeadaanPersediaan {
  return i < 0 || i > 1 ? k : { ...k, periksaPilih: i };
}
export function periksaPeriksa(k: KeadaanPersediaan): { k: KeadaanPersediaan; ok: boolean } {
  if (k.periksaPilih >= 0 && (k.periksaPilih === 0) === catatanCocok(k)) return { k: { ...k, periksaBenar: k.periksaBenar.includes(k.periksaKe) ? k.periksaBenar : [...k.periksaBenar, k.periksaKe], periksaKe: k.periksaKe + 1, periksaPilih: -1 }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukPeriksa(k: KeadaanPersediaan): string {
  if (k.periksaPilih < 0) return "Pilih cocok atau tidak cocok dulu.";
  const t = targetPeriksa(k);
  return `Kurangkan lagi: ${kata(t.awal)} dikurangi ${kata(t.kurang)} sama dengan ${kata(hasilPengurangan(k))}. Bandingkan dengan sisa yang dicatat, yaitu ${kata(t.sisa)}.`;
}
export function kalimatPeriksa(k: KeadaanPersediaan): string {
  return k.periksaBenar.length > 0 && k.periksaPilih < 0 ? "Betul! Pemeriksaannya tepat. Ada catatan berikutnya." : "Kurangkan lagi bilangan awal dengan yang dikurangkan, bandingkan dengan sisa, lalu pilih dan tekan Periksa.";
}

/* ------------------------------ Pasangan ------------------------------ */
export const banyakTerjual = (k: KeadaanPersediaan): number => bilDigit(k.terjual);
export const sisaPasangan = (k: KeadaanPersediaan): number => AWAL_PASANGAN - banyakTerjual(k);
export function ubahTerjual(k: KeadaanPersediaan, t: number, arah: 1 | -1): { k: KeadaanPersediaan; ok: boolean } {
  const r = ubahDigit(k.terjual, t, arah);
  return { k: r.ok ? { ...k, terjual: r.d } : k, ok: r.ok };
}
/** Catat pasangan terjual dan sisa; banyak terjual harus satu sampai sembilan puluh sembilan dan belum pernah dicatat. */
export function catatPasangan(k: KeadaanPersediaan): { k: KeadaanPersediaan; ok: boolean; alasan: "kosong" | "kembar" | null } {
  const n = banyakTerjual(k);
  if (n < 1 || n > 99) return { k, ok: false, alasan: "kosong" };
  if (k.pasangan.includes(n)) return { k, ok: false, alasan: "kembar" };
  return { k: { ...k, pasangan: [...k.pasangan, n] }, ok: true, alasan: null };
}
export function kalimatPasangan(k: KeadaanPersediaan): string {
  const n = banyakTerjual(k);
  if (n === 0) return `Rak berisi ${kata(AWAL_PASANGAN)}. Atur banyak yang terjual, sisanya dihitung, lalu catat pasangannya.`;
  return `${hurufBesar(kata(n))} terjual dan ${kata(sisaPasangan(k))} tersisa. Semuanya ${kata(AWAL_PASANGAN)}.`;
}
