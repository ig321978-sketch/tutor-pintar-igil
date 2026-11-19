/**
 * Logika murni Simulasi Gudang Handuk Kelas 4 Bab 1 Sub-Bab B "Gudang Handuk Pak Laode" (tempat angka dan banyaknya tiap angka), cerita Penginapan Pulau Karang Indah.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-handuk-k4b1b.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Isi (isi peti, kotak, ikat, dan lembar sampai sama dengan bilangan; sepuluh lembar otomatis menjadi satu ikat), Bagan (tulis angka tiap kolom bagan tempat dari balok yang sudah tersusun),
 * Arti (tekan Lihat tempat, alat menolak menjawab sebelum itu, lalu pilih banyaknya angka yang dilingkari), dan Tukar (pilih dua tempat, tekan Tukar, alat menolak memeriksa sebelum itu, lalu bandingkan bilangan baru).
 * Data ada di data-sim.ts.
 */
import { TARGET_ARTI, TARGET_BAGAN, TARGET_ISI, TARGET_TUKAR } from "./data-sim";

export type ModeHanduk = "isi" | "bagan" | "arti" | "tukar";
export const NAMA_TEMPAT_SIM = ["ribuan", "ratusan", "puluhan", "satuan"] as const;
export const HARGA_SIM = [1000, 100, 10, 1] as const;
export const NAMA_JENIS_SIM = ["peti", "kotak", "ikat", "lembar"] as const;

export type KeadaanHanduk = {
  alat: "handuk";
  mode: ModeHanduk;
  /** Isi: sasaran ke berapa, banyak peti, kotak, ikat, lembar yang sudah diisi, sasaran yang sudah benar. */
  isiKe: number;
  isi: number[];
  isiBenar: number[];
  /** Bagan: sasaran ke berapa, angka tiap kolom bagan (ribuan sampai satuan), sasaran yang sudah benar. */
  baganKe: number;
  bagan: number[];
  baganBenar: number[];
  /** Arti: sasaran ke berapa, sudah menekan Lihat tempat, pilihan (-1 bila belum), sasaran yang sudah benar. */
  artiKe: number;
  sudahLihat: boolean;
  artiPilih: number;
  artiBenar: number[];
  /** Tukar: sasaran ke berapa, tempat yang dipilih (urut ketukan), sudah menukar, pilihan lebih atau kurang (-1 bila belum), sasaran yang sudah benar. */
  tukarKe: number;
  tukarPilih: number[];
  sudahTukar: boolean;
  bandingPilih: number;
  tukarBenar: number[];
  /** Pernah memeriksa jawaban sebelum alat bekerja (Arti sebelum Lihat tempat, Tukar sebelum Tukar): alat menolak. */
  tolak: boolean;
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalHanduk = (): KeadaanHanduk => ({
  alat: "handuk",
  mode: "isi",
  isiKe: 0,
  isi: [0, 0, 0, 0],
  isiBenar: [],
  baganKe: 0,
  bagan: [0, 0, 0, 0],
  baganBenar: [],
  artiKe: 0,
  sudahLihat: false,
  artiPilih: -1,
  artiBenar: [],
  tukarKe: 0,
  tukarPilih: [],
  sudahTukar: false,
  bandingPilih: -1,
  tukarBenar: [],
  tolak: false,
  salah: 0,
});
export const mulaiLagiHanduk = (): KeadaanHanduk => awalHanduk();

/* ------------------------------ Kata dan bilangan ------------------------------ */
const SAT = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"] as const;
function ratusanKata(n: number): string {
  if (n < 10) return SAT[n];
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
  return sisa === 0 ? depan : `${depan} ${ratusanKata(sisa)}`;
}
/** Nama bilangan 0 sampai 9.999 dalam kata (tanpa digit). */
export function kata(n: number): string {
  if (n < 1000) return ratusanKata(n);
  const rb = Math.floor(n / 1000);
  const sisa = n % 1000;
  const depan = rb === 1 ? "seribu" : `${ratusanKata(rb)} ribu`;
  return sisa === 0 ? depan : `${depan} ${ratusanKata(sisa)}`;
}
export const formatBilSim = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
export { besar as hurufBesar };
export const digitSim = (n: number): number[] => [Math.floor(n / 1000) % 10, Math.floor(n / 100) % 10, Math.floor(n / 10) % 10, n % 10];
export const bilSim = (d: number[]): number => d[0] * 1000 + d[1] * 100 + d[2] * 10 + d[3];
export const pilihModeHanduk = (k: KeadaanHanduk, mode: ModeHanduk): KeadaanHanduk => ({ ...k, mode });

/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisip<T>(benar: T, lain: T[], geser: number): T[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}

/* ------------------------------ Isi gudang ------------------------------ */
export const targetIsi = (k: KeadaanHanduk): number => TARGET_ISI[k.isiKe % TARGET_ISI.length];
/** Bilangan yang sedang tersusun di gudang. */
export const bilanganIsi = (k: KeadaanHanduk): number => bilSim(k.isi);
/**
 * Tambah satu balok jenis `p` (0 peti sampai 3 lembar). Bila jenis itu sudah sembilan, sepuluh balok ditukar menjadi satu balok jenis di kirinya (sepuluh lembar menjadi satu ikat).
 * Ditolak bila peti sudah sembilan. `tukar`: jenis yang menerima balok hasil tukar, atau -1.
 */
export function tambahIsi(k: KeadaanHanduk, p: number): { k: KeadaanHanduk; ok: boolean; tukar: number } {
  if (p < 0 || p > 3) return { k, ok: false, tukar: -1 };
  const isi = [...k.isi];
  if (isi[p] < 9) {
    isi[p] += 1;
    return { k: { ...k, isi }, ok: true, tukar: -1 };
  }
  if (p === 0) return { k, ok: false, tukar: -1 };
  isi[p] = 0;
  let q = p - 1;
  isi[q] += 1;
  while (isi[q] > 9 && q > 0) {
    isi[q] = 0;
    q -= 1;
    isi[q] += 1;
  }
  if (isi[q] > 9) return { k, ok: false, tukar: -1 };
  return { k: { ...k, isi }, ok: true, tukar: p - 1 };
}
export function kurangIsi(k: KeadaanHanduk, p: number): { k: KeadaanHanduk; ok: boolean } {
  if (p < 0 || p > 3 || k.isi[p] <= 0) return { k, ok: false };
  return { k: { ...k, isi: k.isi.map((x, i) => (i === p ? x - 1 : x)) }, ok: true };
}
export const kosongkanIsi = (k: KeadaanHanduk): KeadaanHanduk => ({ ...k, isi: [0, 0, 0, 0] });
export function periksaIsi(k: KeadaanHanduk): { k: KeadaanHanduk; ok: boolean } {
  if (bilanganIsi(k) === targetIsi(k)) return { k: { ...k, isiBenar: k.isiBenar.includes(k.isiKe) ? k.isiBenar : [...k.isiBenar, k.isiKe], isiKe: k.isiKe + 1, isi: [0, 0, 0, 0] }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukIsi(k: KeadaanHanduk): string {
  const t = digitSim(targetIsi(k));
  if (k.isi.every((x) => x === 0)) return "Gudang masih kosong. Tambahkan peti, kotak, ikat, dan lembar sesuai angka pada tiap tempat bilangan.";
  const i = k.isi.findIndex((x, q) => x !== t[q]);
  return `Banyak ${NAMA_JENIS_SIM[i]} belum sama dengan angka pada tempat ${NAMA_TEMPAT_SIM[i]}. Baca angka tiap tempat dari kiri ke kanan.`;
}
export function kalimatIsi(k: KeadaanHanduk): string {
  return k.isiBenar.length > 0 && k.isi.every((x) => x === 0) ? "Betul! Ada bilangan berikutnya." : "Isi gudang sesuai bilangan, lalu tekan Periksa.";
}

/* ------------------------------ Bagan tempat ------------------------------ */
export const targetBagan = (k: KeadaanHanduk): [number, number, number, number] => TARGET_BAGAN[k.baganKe % TARGET_BAGAN.length].isi;
/** Ubah angka kolom `c` bagan sebesar `delta`; paling kecil nol dan paling besar sembilan. */
export function ubahBagan(k: KeadaanHanduk, c: number, delta: number): { k: KeadaanHanduk; ok: boolean } {
  if (c < 0 || c > 3) return { k, ok: false };
  const baru = k.bagan[c] + delta;
  if (baru < 0 || baru > 9) return { k, ok: false };
  return { k: { ...k, bagan: k.bagan.map((x, i) => (i === c ? baru : x)) }, ok: true };
}
export function periksaBagan(k: KeadaanHanduk): { k: KeadaanHanduk; ok: boolean } {
  const t = targetBagan(k);
  if (k.bagan.every((x, i) => x === t[i])) return { k: { ...k, baganBenar: k.baganBenar.includes(k.baganKe) ? k.baganBenar : [...k.baganBenar, k.baganKe], baganKe: k.baganKe + 1, bagan: [0, 0, 0, 0] }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukBagan(k: KeadaanHanduk): string {
  const t = targetBagan(k);
  if (k.bagan.every((x) => x === 0)) return "Bagan masih kosong. Hitung balok pada tiap baris, lalu tulis angkanya pada kolom yang sama.";
  const i = k.bagan.findIndex((x, q) => x !== t[q]);
  return t[i] === 0 ? `Baris ${NAMA_JENIS_SIM[i]} tidak punya balok, jadi kolom ${NAMA_TEMPAT_SIM[i]} harus diisi nol.` : `Kolom ${NAMA_TEMPAT_SIM[i]} belum sama dengan banyak balok pada baris ${NAMA_JENIS_SIM[i]}. Hitung balok satu per satu.`;
}
export function kalimatBagan(k: KeadaanHanduk): string {
  return k.baganBenar.length > 0 && k.bagan.every((x) => x === 0) ? "Betul! Ada susunan berikutnya." : "Hitung balok tiap baris, tulis angka tiap kolom bagan, lalu tekan Periksa.";
}
/** Bilangan yang tertulis pada bagan sekarang. */
export const bilanganBagan = (k: KeadaanHanduk): number => bilSim(k.bagan);

/* ------------------------------ Arti sebuah angka ------------------------------ */
export const targetArti = (k: KeadaanHanduk) => TARGET_ARTI[k.artiKe % TARGET_ARTI.length];
/** Banyaknya angka yang dilingkari: angka dikali tempatnya. */
export const jawabanArti = (k: KeadaanHanduk): number => {
  const t = targetArti(k);
  return digitSim(t.n)[t.tanda] * HARGA_SIM[t.tanda];
};
export const pertanyaanArti = (k: KeadaanHanduk): string => `Angka yang dilingkari pada tempat ${NAMA_TEMPAT_SIM[targetArti(k).tanda]} berarti berapa?`;
/** Tiga pilihan: yang benar tidak di tempat pertama. Pengecoh: angka saja dan angka pada tempat lain. */
export function pilihanArti(k: KeadaanHanduk): number[] {
  const t = targetArti(k);
  const d = digitSim(t.n)[t.tanda];
  const benar = jawabanArti(k);
  const lain = [d, d * 10, d * 100, d * 1000].filter((x) => x !== benar && x <= 9000).slice(0, 2);
  return sisip(benar, lain, t.tanda + k.artiKe);
}
/** Tekan Lihat tempat: alat menunjukkan nama tempat tiap angka. */
export const lihatTempat = (k: KeadaanHanduk): KeadaanHanduk => ({ ...k, sudahLihat: true });
export function pilihArti(k: KeadaanHanduk, i: number): KeadaanHanduk {
  return i < 0 || i >= 3 || !k.sudahLihat ? k : { ...k, artiPilih: i };
}
/** Periksa jawaban. Ditolak (bukan percobaan keliru) bila tempat belum dilihat. */
export function periksaArti(k: KeadaanHanduk): { k: KeadaanHanduk; ok: boolean } {
  if (!k.sudahLihat) return { k: { ...k, tolak: true }, ok: false };
  if (k.artiPilih >= 0 && pilihanArti(k)[k.artiPilih] === jawabanArti(k)) {
    return { k: { ...k, artiBenar: k.artiBenar.includes(k.artiKe) ? k.artiBenar : [...k.artiBenar, k.artiKe], artiKe: k.artiKe + 1, sudahLihat: false, artiPilih: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukArti(k: KeadaanHanduk): string {
  if (!k.sudahLihat) return "Alat belum menunjukkan tempat angka. Tekan Lihat tempat dulu, baru pilih jawabannya.";
  if (k.artiPilih < 0) return "Pilih satu jawaban dulu.";
  return "Banyaknya sebuah angka adalah angka dikali tempatnya. Lihat nama tempat angka yang dilingkari, lalu kalikan.";
}
export function kalimatArti(k: KeadaanHanduk): string {
  if (k.artiBenar.length > 0 && !k.sudahLihat && k.artiPilih < 0) return "Betul! Ada bilangan berikutnya.";
  return k.sudahLihat ? "Tempat sudah terlihat. Pilih jawabannya, lalu tekan Periksa." : "Tekan Lihat tempat dulu supaya alat menunjukkan nama tempat tiap angka.";
}

/* ------------------------------ Tukar tempat ------------------------------ */
export const targetTukar = (k: KeadaanHanduk) => TARGET_TUKAR[k.tukarKe % TARGET_TUKAR.length];
/** Bilangan baru bila dua tempat yang dipilih ditukar. */
export function bilanganTukar(k: KeadaanHanduk): number {
  const t = targetTukar(k);
  if (!k.sudahTukar || k.tukarPilih.length !== 2) return t.n;
  const d = digitSim(t.n);
  const [a, b] = k.tukarPilih;
  [d[a], d[b]] = [d[b], d[a]];
  return bilSim(d);
}
/** Pilih tempat untuk ditukar (paling banyak dua; mengetuk lagi tempat yang sama membatalkannya). Tidak bisa berubah setelah menukar. */
export function pilihTempatTukar(k: KeadaanHanduk, c: number): { k: KeadaanHanduk; ok: boolean } {
  if (c < 0 || c > 3 || k.sudahTukar) return { k, ok: false };
  if (k.tukarPilih.includes(c)) return { k: { ...k, tukarPilih: k.tukarPilih.filter((x) => x !== c) }, ok: true };
  if (k.tukarPilih.length >= 2) return { k, ok: false };
  return { k: { ...k, tukarPilih: [...k.tukarPilih, c] }, ok: true };
}
/** Tekan Tukar: butuh dua tempat terpilih. */
export function tukarTempat(k: KeadaanHanduk): { k: KeadaanHanduk; ok: boolean } {
  if (k.tukarPilih.length !== 2 || k.sudahTukar) return { k, ok: false };
  return { k: { ...k, sudahTukar: true }, ok: true };
}
export const ulangTukar = (k: KeadaanHanduk): KeadaanHanduk => ({ ...k, tukarPilih: [], sudahTukar: false, bandingPilih: -1 });
/** Tiga pilihan banding bilangan baru dengan bilangan semula (0 = lebih, 1 = kurang, 2 = sama). */
export const PILIHAN_BANDING = ["lebih", "kurang", "sama"] as const;
export function pilihBanding(k: KeadaanHanduk, i: number): KeadaanHanduk {
  return i < 0 || i > 2 || !k.sudahTukar ? k : { ...k, bandingPilih: i };
}
export const jawabanBanding = (k: KeadaanHanduk): string => {
  const t = targetTukar(k);
  const d = digitSim(t.n);
  [d[t.a], d[t.b]] = [d[t.b], d[t.a]];
  const baru = bilSim(d);
  return baru > t.n ? "lebih" : baru < t.n ? "kurang" : "sama";
};
/** Periksa: ditolak (bukan percobaan keliru) bila belum menukar. Benar bila tempat yang ditukar sesuai sasaran dan pilihan banding tepat. */
export function periksaTukar(k: KeadaanHanduk): { k: KeadaanHanduk; ok: boolean } {
  if (!k.sudahTukar) return { k: { ...k, tolak: true }, ok: false };
  const t = targetTukar(k);
  const pasang = [...k.tukarPilih].sort((x, y) => x - y);
  const betulPasang = pasang[0] === Math.min(t.a, t.b) && pasang[1] === Math.max(t.a, t.b);
  if (betulPasang && k.bandingPilih >= 0 && PILIHAN_BANDING[k.bandingPilih] === jawabanBanding(k)) {
    return { k: { ...k, tukarBenar: k.tukarBenar.includes(k.tukarKe) ? k.tukarBenar : [...k.tukarBenar, k.tukarKe], tukarKe: k.tukarKe + 1, tukarPilih: [], sudahTukar: false, bandingPilih: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukTukar(k: KeadaanHanduk): string {
  const t = targetTukar(k);
  if (k.tukarPilih.length < 2) return `Pilih dulu dua tempat yang harus ditukar: tempat ${NAMA_TEMPAT_SIM[Math.min(t.a, t.b)]} dan tempat ${NAMA_TEMPAT_SIM[Math.max(t.a, t.b)]}.`;
  if (!k.sudahTukar) return "Alat belum menukar. Tekan Tukar sekarang dulu, baru bandingkan bilangannya.";
  const pasang = [...k.tukarPilih].sort((x, y) => x - y);
  if (pasang[0] !== Math.min(t.a, t.b) || pasang[1] !== Math.max(t.a, t.b)) return `Tempat yang ditukar belum sesuai. Tukar tempat ${NAMA_TEMPAT_SIM[Math.min(t.a, t.b)]} dan tempat ${NAMA_TEMPAT_SIM[Math.max(t.a, t.b)]}, lalu tekan Ulang untuk mencoba lagi.`;
  if (k.bandingPilih < 0) return "Pilih lebih, kurang, atau sama dulu.";
  return "Bandingkan bilangan baru dengan bilangan semula mulai dari tempat paling kiri. Angka yang lebih besar di tempat paling kiri menentukan bilangan yang lebih besar.";
}
export function kalimatTukar(k: KeadaanHanduk): string {
  if (k.tukarBenar.length > 0 && !k.sudahTukar && k.tukarPilih.length === 0) return "Betul! Ada bilangan berikutnya.";
  const t = targetTukar(k);
  return k.sudahTukar ? "Sudah ditukar. Pilih lebih, kurang, atau sama, lalu tekan Periksa." : `Pilih tempat ${NAMA_TEMPAT_SIM[Math.min(t.a, t.b)]} dan tempat ${NAMA_TEMPAT_SIM[Math.max(t.a, t.b)]}, lalu tekan Tukar sekarang.`;
}
