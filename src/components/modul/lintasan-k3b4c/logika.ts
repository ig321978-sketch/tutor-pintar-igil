/**
 * Logika murni Simulasi Lintasan Lomba Kelas 3 Bab 4 Sub-Bab C "Lintasan Pak Samsul" (garis tegak lurus, garis sejajar, dan bangun datar sederhana), akhir cerita Festival Layang-layang Kampung.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-lintasan-k3b4c.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Tegak lurus (putar tali kedua sampai pojok kertas pas; alat menolak memeriksa sebelum pojok kertas dipasang),
 * Sejajar (geser ujung kanan tali kedua sampai jarak kedua ujung sama pada kertas petak; alat menolak memeriksa sebelum jarak diukur),
 * Tanda (sepasang tali ditandai tegak lurus, sejajar, atau bukan keduanya), dan Bangun (rakit bangun dari batang lurus atau batang lengkung lalu sebut namanya).
 * Data ada di data-sim.ts.
 */
import { AWAL_SEJAJAR, AWAL_TEGAK, PASANGAN_TANDA, TARGET_BANGUN, type PasangTanda } from "./data-sim";
import type { Bentuk } from "./logika-cpa";

export type ModeLintasan = "tegak" | "sejajar" | "tanda" | "bangun";
export type HubunganTanda = "tegak" | "sejajar" | "bukan";

export type KeadaanLintasan = {
  alat: "lintasan";
  mode: ModeLintasan;
  /** Tegak lurus: sudut tali kedua (derajat), pojok kertas terpasang, sasaran ke berapa, dan sasaran yang sudah tepat. */
  sudut: number;
  pojok: boolean;
  tegakKe: number;
  tegakBenar: number[];
  /** Sejajar: jarak tali kedua di ujung kanan (petak), apakah jarak kedua ujung sudah diukur, sasaran ke berapa, dan yang sudah tepat. */
  kanan: number;
  jarakDiukur: boolean;
  sejajarKe: number;
  sejajarBenar: number[];
  /** Tanda: pasangan ke berapa, tanda yang dipilih, dan pasangan yang sudah tepat. */
  tandaKe: number;
  pilihan: HubunganTanda | null;
  tandaBenar: number[];
  /** Bangun: banyak batang lurus (nol sampai empat), apakah sisinya disamakan, apakah memakai batang lengkung, nama yang disebut, sasaran ke berapa, dan yang sudah tepat. */
  batang: number;
  sama: boolean;
  lengkung: boolean;
  nama: Bentuk | null;
  bangunKe: number;
  bangunBenar: number[];
  /** Banyak kali alat menolak memeriksa dan banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  menolak: number;
  salah: number;
};

export const awalLintasan = (): KeadaanLintasan => ({
  alat: "lintasan",
  mode: "tegak",
  sudut: AWAL_TEGAK[0],
  pojok: false,
  tegakKe: 0,
  tegakBenar: [],
  kanan: AWAL_SEJAJAR[0].kanan,
  jarakDiukur: false,
  sejajarKe: 0,
  sejajarBenar: [],
  tandaKe: 0,
  pilihan: null,
  tandaBenar: [],
  batang: 0,
  sama: false,
  lengkung: false,
  nama: null,
  bangunKe: 0,
  bangunBenar: [],
  menolak: 0,
  salah: 0,
});
export const mulaiLagiLintasan = (): KeadaanLintasan => awalLintasan();

/* ------------------------------ Kata (tanpa digit) ------------------------------ */
const SAT = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"] as const;
export const kata = (n: number): string => SAT[n] ?? String(n);
export const hurufBesar = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);
export const NAMA_BENTUK_SIM: Record<Bentuk, string> = { segitiga: "segitiga", persegi: "persegi", persegiPanjang: "persegi panjang", lingkaran: "lingkaran" };

export const pilihModeLintasan = (k: KeadaanLintasan, mode: ModeLintasan): KeadaanLintasan => ({ ...k, mode });
const tambahUnik = (daftar: number[], n: number): number[] => (daftar.includes(n) ? daftar : [...daftar, n]);

/* ------------------------------ Tegak lurus ------------------------------ */
export const SUDUT_MIN = 15;
export const SUDUT_MAKS = 165;
export const LANGKAH_SUDUT = 15;
export const awalTegak = (k: KeadaanLintasan): number => AWAL_TEGAK[k.tegakKe % AWAL_TEGAK.length];
/** Putar tali kedua searah (arah 1, sudut membesar) atau berlawanan (arah -1), kelipatan lima belas derajat antara lima belas dan seratus enam puluh lima. */
export function putarTali(k: KeadaanLintasan, arah: 1 | -1): { k: KeadaanLintasan; ok: boolean } {
  const baru = k.sudut + arah * LANGKAH_SUDUT;
  if (baru < SUDUT_MIN || baru > SUDUT_MAKS) return { k, ok: false };
  return { k: { ...k, sudut: baru }, ok: true };
}
export const pasangPojok = (k: KeadaanLintasan): KeadaanLintasan => ({ ...k, pojok: !k.pojok });
/** Memeriksa: ditolak bila pojok kertas belum dipasang; tepat bila sudut siku-siku (sembilan puluh derajat). */
export function periksaTegak(k: KeadaanLintasan): { k: KeadaanLintasan; ok: boolean; tolak: boolean } {
  if (!k.pojok) return { k: { ...k, menolak: k.menolak + 1 }, ok: false, tolak: true };
  if (k.sudut === 90) {
    const ke = k.tegakKe + 1;
    return { k: { ...k, tegakBenar: tambahUnik(k.tegakBenar, k.tegakKe), tegakKe: ke, sudut: AWAL_TEGAK[ke % AWAL_TEGAK.length], pojok: false }, ok: true, tolak: false };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false, tolak: false };
}
export function petunjukTegak(k: KeadaanLintasan): string {
  if (!k.pojok) return "Pasang pojok kertas dulu di titik temu kedua tali, baru tekan Periksa.";
  return k.sudut < 90 ? "Pojok kertas belum pas: tali kedua masih terlalu rapat. Putar tali supaya sudutnya membuka." : "Pojok kertas belum pas: tali kedua sudah terlalu terbuka. Putar tali supaya sudutnya menutup.";
}
export function kalimatTegak(k: KeadaanLintasan): string {
  if (k.tegakBenar.length > 0 && !k.pojok && k.sudut === awalTegak(k)) return "Betul! Kedua tali tegak lurus. Ada pasangan tali berikutnya.";
  return k.pojok ? "Putar tali kedua sampai tepat di pojok kertas, lalu tekan Periksa." : "Pasang pojok kertas di titik temu, lalu putar tali kedua sampai tegak lurus.";
}

/* ------------------------------ Sejajar ------------------------------ */
export const KANAN_MIN = 1;
export const KANAN_MAKS = 5;
export const polaSejajar = (k: KeadaanLintasan) => AWAL_SEJAJAR[k.sejajarKe % AWAL_SEJAJAR.length];
/** Geser ujung kanan tali kedua: arah -1 menaikkan (jarak berkurang satu petak), arah 1 menurunkan (jarak bertambah). Mengubah jarak membuat alat harus mengukur lagi. */
export function geserKanan(k: KeadaanLintasan, arah: 1 | -1): { k: KeadaanLintasan; ok: boolean } {
  const baru = k.kanan + arah;
  const p = polaSejajar(k);
  if (baru < KANAN_MIN || baru > KANAN_MAKS || baru + p.miring > 6) return { k, ok: false };
  return { k: { ...k, kanan: baru, jarakDiukur: false }, ok: true };
}
export const ukurJarak = (k: KeadaanLintasan): KeadaanLintasan => ({ ...k, jarakDiukur: true });
/** Memeriksa: ditolak bila jarak belum diukur; tepat bila jarak kedua ujung sama. */
export function periksaSejajar(k: KeadaanLintasan): { k: KeadaanLintasan; ok: boolean; tolak: boolean } {
  if (!k.jarakDiukur) return { k: { ...k, menolak: k.menolak + 1 }, ok: false, tolak: true };
  const p = polaSejajar(k);
  if (k.kanan === p.kiri) {
    const ke = k.sejajarKe + 1;
    return { k: { ...k, sejajarBenar: tambahUnik(k.sejajarBenar, k.sejajarKe), sejajarKe: ke, kanan: AWAL_SEJAJAR[ke % AWAL_SEJAJAR.length].kanan, jarakDiukur: false }, ok: true, tolak: false };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false, tolak: false };
}
export function petunjukSejajar(k: KeadaanLintasan): string {
  const p = polaSejajar(k);
  if (!k.jarakDiukur) return "Ukur jarak kedua tali di ujung kiri dan di ujung kanan dulu, baru tekan Periksa.";
  return k.kanan > p.kiri ? `Jarak di ujung kanan ${kata(k.kanan)} petak, lebih besar daripada di ujung kiri yang ${kata(p.kiri)} petak. Naikkan ujung kanan.` : `Jarak di ujung kanan ${kata(k.kanan)} petak, lebih kecil daripada di ujung kiri yang ${kata(p.kiri)} petak. Turunkan ujung kanan.`;
}
export function kalimatSejajar(k: KeadaanLintasan): string {
  if (k.sejajarBenar.length > 0 && !k.jarakDiukur && k.kanan === AWAL_SEJAJAR[k.sejajarKe % AWAL_SEJAJAR.length].kanan) return "Betul! Kedua tali sejajar. Ada pasangan tali berikutnya.";
  return k.jarakDiukur ? "Jarak sudah diukur. Samakan jarak kedua ujung, lalu tekan Periksa." : "Ukur jarak kedua ujung dulu, lalu geser ujung kanan sampai jaraknya sama.";
}

/* ------------------------------ Tanda ------------------------------ */
export const pasanganTanda = (k: KeadaanLintasan): PasangTanda => PASANGAN_TANDA[k.tandaKe % PASANGAN_TANDA.length];
/** Hubungan sepasang tali menurut data: sejajar bila jarak kedua ujung sama, tegak lurus bila sudutnya sembilan puluh derajat. */
export const hubunganDari = (p: PasangTanda): HubunganTanda => (p.jenis === "tali" ? (p.kiri === p.kanan ? "sejajar" : "bukan") : p.sudut === 90 ? "tegak" : "bukan");
export const pilihTanda = (k: KeadaanLintasan, h: HubunganTanda): KeadaanLintasan => ({ ...k, pilihan: h });
export const NAMA_HUBUNGAN: Record<HubunganTanda, string> = { tegak: "tegak lurus", sejajar: "sejajar", bukan: "bukan keduanya" };
export function periksaTanda(k: KeadaanLintasan): { k: KeadaanLintasan; ok: boolean } {
  if (k.pilihan === null) return { k, ok: false };
  if (k.pilihan === hubunganDari(pasanganTanda(k))) return { k: { ...k, tandaBenar: tambahUnik(k.tandaBenar, k.tandaKe), tandaKe: k.tandaKe + 1, pilihan: null }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukTanda(k: KeadaanLintasan): string {
  if (k.pilihan === null) return "Pilih dulu tanda untuk pasangan tali ini: tegak lurus, sejajar, atau bukan keduanya.";
  const p = pasanganTanda(k);
  if (p.jenis === "tali") return p.kiri === p.kanan ? "Jarak kedua ujung sama, jadi kedua tali sejajar." : "Jarak kedua ujung berbeda, jadi kedua tali tidak sejajar.";
  return p.sudut === 90 ? "Pojok kertas pas di titik temu, jadi kedua garis tegak lurus." : "Pojok kertas tidak pas di titik temu, jadi kedua garis tidak tegak lurus.";
}
export function kalimatTanda(k: KeadaanLintasan): string {
  if (k.tandaBenar.length > 0 && k.pilihan === null && !k.tandaBenar.includes(k.tandaKe)) return "Betul! Tandanya tepat. Ada pasangan tali berikutnya.";
  return "Lihat pasangan tali ini: periksa jaraknya atau pojoknya, pilih tandanya, lalu tekan Periksa.";
}

/* ------------------------------ Bangun ------------------------------ */
export const targetBangun = (k: KeadaanLintasan) => TARGET_BANGUN[k.bangunKe % TARGET_BANGUN.length];
export const BATANG_MAKS = 4;
/** Bangun yang terbentuk dari batang: tiga batang segitiga, empat batang persegi (disamakan) atau persegi panjang, batang lengkung lingkaran. Selain itu belum berbentuk bangun. */
export function bentukRakitan(k: KeadaanLintasan): Bentuk | null {
  if (k.lengkung) return "lingkaran";
  if (k.batang === 3) return "segitiga";
  if (k.batang === 4) return k.sama ? "persegi" : "persegiPanjang";
  return null;
}
/** Tambah (arah 1) atau kurangi (arah -1) batang lurus; paling banyak empat. Batang lengkung dilepas bila batang lurus ditambah. */
export function tambahBatang(k: KeadaanLintasan, arah: 1 | -1): { k: KeadaanLintasan; ok: boolean } {
  const baru = k.batang + arah;
  if (baru < 0 || baru > BATANG_MAKS) return { k, ok: false };
  return { k: { ...k, batang: baru, lengkung: false, sama: baru === 4 ? k.sama : false, nama: null }, ok: true };
}
export const samakanSisi = (k: KeadaanLintasan): { k: KeadaanLintasan; ok: boolean } => (k.batang === 4 ? { k: { ...k, sama: !k.sama, nama: null }, ok: true } : { k, ok: false });
export const pakaiLengkung = (k: KeadaanLintasan): KeadaanLintasan => ({ ...k, lengkung: !k.lengkung, batang: 0, sama: false, nama: null });
export const sebutNama = (k: KeadaanLintasan, b: Bentuk): KeadaanLintasan => ({ ...k, nama: b });
export const kosongkanBangun = (k: KeadaanLintasan): KeadaanLintasan => ({ ...k, batang: 0, sama: false, lengkung: false, nama: null });
/** Memeriksa: tepat bila bangun yang dirakit sama dengan sasaran dan namanya disebut dengan benar. */
export function periksaBangun(k: KeadaanLintasan): { k: KeadaanLintasan; ok: boolean } {
  const b = bentukRakitan(k);
  if (b !== null && b === targetBangun(k).bentuk && k.nama === b) {
    const ke = k.bangunKe + 1;
    return { k: { ...k, bangunBenar: tambahUnik(k.bangunBenar, k.bangunKe), bangunKe: ke, batang: 0, sama: false, lengkung: false, nama: null }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukBangun(k: KeadaanLintasan): string {
  const t = targetBangun(k);
  const b = bentukRakitan(k);
  if (b === null) {
    if (k.batang === 0) return `Tambah batang atau pakai batang lengkung dulu untuk merakit bangun yang ${t.ciri}.`;
    return `Batangnya belum membentuk bangun. Bangun yang dicari ${t.ciri}.`;
  }
  if (b !== t.bentuk) return `Bangun yang dirakit belum cocok. Bangun yang dicari ${t.ciri}.`;
  if (k.nama === null) return "Rakitannya sudah cocok. Sebut namanya dulu, baru tekan Periksa.";
  return "Namanya belum tepat. Lihat lagi ciri bangunnya, lalu pilih nama yang cocok.";
}
export function kalimatBangun(k: KeadaanLintasan): string {
  const t = targetBangun(k);
  if (k.bangunBenar.length > 0 && bentukRakitan(k) === null && k.batang === 0 && !k.lengkung) return "Betul! Bangunnya tepat. Ada bangun berikutnya.";
  return `Rakit bangun yang ${t.ciri}, sebut namanya, lalu tekan Periksa.`;
}
/** Ciri bangun yang sedang dirakit, untuk ditampilkan di layar. */
export function ciriRakitan(k: KeadaanLintasan): string {
  const b = bentukRakitan(k);
  if (b === null) return k.batang === 0 ? "Belum ada batang." : `${k.batang} batang lurus: belum menutup menjadi bangun.`;
  if (b === "lingkaran") return "Dibatasi satu garis lengkung, tanpa sisi lurus dan tanpa sudut.";
  if (b === "segitiga") return "Ciri: 3 sisi dan 3 sudut.";
  return b === "persegi" ? "Ciri: 4 sisi sama panjang dan 4 sudut siku-siku." : "Ciri: 4 sisi, sepasang-sepasang sama panjang, dan 4 sudut siku-siku.";
}
