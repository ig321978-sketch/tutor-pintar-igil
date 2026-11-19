/**
 * Logika murni Simulasi Papan Jatah Kelas 4 Bab 1 Sub-Bab H "Papan Jatah Bu Ratna", cerita Penginapan Pulau Karang Indah.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-jatah-k4b1h.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Rata (bagikan satu putaran ke tiap kamar; alat menolak Periksa selama masih bisa satu putaran lagi), Kurang (kurangi pembagi berulang kali; alat menolak bila sisa kurang dari pembagi),
 * Susun (hasil puluhan, sisa puluhan, turunkan angka satuan; alat menolak menurunkan sebelum sisa puluhan dipilih benar), dan Kali (Cek Kali, lalu putuskan benar atau keliru). Data ada di data-sim.ts.
 */
import { TARGET_KALI, TARGET_KURANG, TARGET_RATA, TARGET_SUSUN } from "./data-sim";

export type ModeJatah = "rata" | "kurang" | "susun" | "kali";

export type KeadaanJatah = {
  alat: "jatah";
  mode: ModeJatah;
  /** Rata: sasaran ke berapa, putaran yang sudah dibagikan, pilihan hasil tiap kamar (-1 bila belum), sasaran yang sudah benar, pernah benar pada tamu yang bersisa. */
  rataKe: number;
  putaran: number;
  rataPilih: number;
  rataBenar: number[];
  rataSisa: boolean;
  /** Kurang: sasaran ke berapa, banyak pengurangan, pilihan banyak pengurangan, sasaran yang sudah benar. */
  kurangKe: number;
  kali: number;
  kurangPilih: number;
  kurangBenar: number[];
  /** Susun: sasaran ke berapa, pilihan hasil puluhan, pilihan sisa puluhan, sudah menurunkan angka, pilihan hasil satuan (-1 bila belum), sasaran yang sudah benar. */
  susunKe: number;
  q1Pilih: number;
  s1Pilih: number;
  turun: boolean;
  q2Pilih: number;
  susunBenar: number[];
  /** Kali: sasaran ke berapa, sudah Cek Kali, keputusan (-1 belum, 0 benar, 1 keliru), sasaran yang sudah benar. */
  kaliKe: number;
  kaliCek: boolean;
  kaliPutus: number;
  kaliBenar: number[];
  /** Alat pernah menolak langkah yang belum waktunya. */
  tolak: boolean;
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalJatah = (): KeadaanJatah => ({
  alat: "jatah",
  mode: "rata",
  rataKe: 0,
  putaran: 0,
  rataPilih: -1,
  rataBenar: [],
  rataSisa: false,
  kurangKe: 0,
  kali: 0,
  kurangPilih: -1,
  kurangBenar: [],
  susunKe: 0,
  q1Pilih: -1,
  s1Pilih: -1,
  turun: false,
  q2Pilih: -1,
  susunBenar: [],
  kaliKe: 0,
  kaliCek: false,
  kaliPutus: -1,
  kaliBenar: [],
  tolak: false,
  salah: 0,
});
export const mulaiLagiJatah = (): KeadaanJatah => awalJatah();

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
export const pilihModeJatah = (k: KeadaanJatah, mode: ModeJatah): KeadaanJatah => ({ ...k, mode });

/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisip<T>(benar: T, lain: T[], geser: number): T[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}
/** Tiga pilihan bilangan: yang benar dan dua pengecoh (tidak negatif, berbeda), benar bukan yang pertama. */
function tigaPilihan(benar: number, pengecoh: number[], geser: number): number[] {
  const lain: number[] = [];
  for (const c of [...pengecoh, benar + 1, benar + 2, benar - 1, benar + 3]) if (Number.isInteger(c) && c >= 0 && c !== benar && !lain.includes(c)) lain.push(c);
  return sisip(benar, lain.slice(0, 2), geser);
}

/* ------------------------------ Bagi rata ------------------------------ */
export const targetRata = (k: KeadaanJatah) => TARGET_RATA[k.rataKe % TARGET_RATA.length];
export const hasilRata = (k: KeadaanJatah): number => Math.floor(targetRata(k).n / targetRata(k).d);
export const sisaRata = (k: KeadaanJatah): number => targetRata(k).n % targetRata(k).d;
/** Tamu yang belum dibagikan. */
export const tamuTersisa = (k: KeadaanJatah): number => targetRata(k).n - k.putaran * targetRata(k).d;
/** Bagikan satu putaran: tiap kamar mendapat satu tamu. Ditolak bila tamu tersisa kurang dari banyak kamar. */
export function bagikanPutaran(k: KeadaanJatah): { k: KeadaanJatah; ok: boolean } {
  if (tamuTersisa(k) < targetRata(k).d) return { k: { ...k, tolak: true }, ok: false };
  return { k: { ...k, putaran: k.putaran + 1, rataPilih: -1 }, ok: true };
}
export const pilihanRata = (k: KeadaanJatah): number[] => tigaPilihan(hasilRata(k), [targetRata(k).d, hasilRata(k) + sisaRata(k) + 1], hasilRata(k) + k.rataKe);
export function pilihRata(k: KeadaanJatah, i: number): KeadaanJatah {
  return i < 0 || i >= 3 || tamuTersisa(k) >= targetRata(k).d ? k : { ...k, rataPilih: i };
}
export function periksaRata(k: KeadaanJatah): { k: KeadaanJatah; ok: boolean } {
  if (tamuTersisa(k) < targetRata(k).d && k.rataPilih >= 0 && pilihanRata(k)[k.rataPilih] === hasilRata(k)) {
    return { k: { ...k, rataBenar: k.rataBenar.includes(k.rataKe) ? k.rataBenar : [...k.rataBenar, k.rataKe], rataSisa: k.rataSisa || sisaRata(k) > 0, rataKe: k.rataKe + 1, putaran: 0, rataPilih: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukRata(k: KeadaanJatah): string {
  const b = targetRata(k).benda;
  if (tamuTersisa(k) >= targetRata(k).d) return `Masih ada ${b} yang bisa dibagikan satu putaran lagi. Tekan Bagikan satu putaran sampai ${b} yang tersisa tidak cukup untuk semua kamar.`;
  if (k.rataPilih < 0) return `Pilih dulu banyak ${b} di tiap kamar.`;
  return `Banyak ${b} di satu kamar adalah hasil bagi. Hitung berapa putaran yang sudah dibagikan, bukan banyak kamarnya.`;
}
export function kalimatRata(k: KeadaanJatah): string {
  const b = targetRata(k).benda;
  if (k.rataBenar.length > 0 && k.putaran === 0) return `Betul! Ada ${b} berikutnya yang harus dibagikan. Tekan Bagikan satu putaran.`;
  if (tamuTersisa(k) >= targetRata(k).d) return k.putaran === 0 ? `Tekan Bagikan satu putaran. Tiap kamar mendapat satu ${b}.` : `Sudah ${kata(k.putaran)} putaran. Masih ada ${b}, bagikan lagi.`;
  return sisaRata(k) > 0 ? `${besar(b)} yang tersisa tidak cukup untuk satu putaran lagi, tersisa ${kata(sisaRata(k))}. Pilih banyak ${b} di tiap kamar, lalu tekan Periksa.` : `Semua ${b} sudah terbagi. Pilih banyak ${b} di tiap kamar, lalu tekan Periksa.`;
}

/* ------------------------------ Kurang berulang ------------------------------ */
export const targetKurang = (k: KeadaanJatah) => TARGET_KURANG[k.kurangKe % TARGET_KURANG.length];
export const hasilKurang = (k: KeadaanJatah): number => Math.floor(targetKurang(k).n / targetKurang(k).d);
/** Bilangan sekarang setelah dikurangi. */
export const sisaKurang = (k: KeadaanJatah): number => targetKurang(k).n - k.kali * targetKurang(k).d;
export function kurangi(k: KeadaanJatah): { k: KeadaanJatah; ok: boolean } {
  if (sisaKurang(k) < targetKurang(k).d) return { k: { ...k, tolak: true }, ok: false };
  return { k: { ...k, kali: k.kali + 1, kurangPilih: -1 }, ok: true };
}
export const pilihanKurang = (k: KeadaanJatah): number[] => tigaPilihan(hasilKurang(k), [targetKurang(k).d, hasilKurang(k) + 1], hasilKurang(k) + k.kurangKe);
export function pilihKurang(k: KeadaanJatah, i: number): KeadaanJatah {
  return i < 0 || i >= 3 || sisaKurang(k) >= targetKurang(k).d ? k : { ...k, kurangPilih: i };
}
export function periksaKurang(k: KeadaanJatah): { k: KeadaanJatah; ok: boolean } {
  if (sisaKurang(k) < targetKurang(k).d && k.kurangPilih >= 0 && pilihanKurang(k)[k.kurangPilih] === hasilKurang(k)) {
    return { k: { ...k, kurangBenar: k.kurangBenar.includes(k.kurangKe) ? k.kurangBenar : [...k.kurangBenar, k.kurangKe], kurangKe: k.kurangKe + 1, kali: 0, kurangPilih: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukKurang(k: KeadaanJatah): string {
  if (sisaKurang(k) >= targetKurang(k).d) return "Bilangan masih bisa dikurangi lagi. Tekan Kurangi sampai sisanya kurang dari pembagi.";
  if (k.kurangPilih < 0) return "Pilih dulu banyak pengurangan.";
  return "Hasil bagi adalah banyaknya pengurangan sampai bilangan habis, bukan angka pembaginya.";
}
export function kalimatKurang(k: KeadaanJatah): string {
  if (k.kurangBenar.length > 0 && k.kali === 0) return "Betul! Ada bilangan berikutnya.";
  if (sisaKurang(k) >= targetKurang(k).d) return k.kali === 0 ? "Tekan Kurangi untuk mengurangi bilangan dengan pembagi." : `Sudah ${kata(k.kali)} kali dikurangi. Lanjutkan sampai sisanya kurang dari pembagi.`;
  return "Sisa sudah kurang dari pembagi. Pilih banyak pengurangan, lalu tekan Periksa.";
}

/* ------------------------------ Bagi susun ------------------------------ */
export const targetSusun = (k: KeadaanJatah) => TARGET_SUSUN[k.susunKe % TARGET_SUSUN.length];
const puluhan = (k: KeadaanJatah): number => Math.floor(targetSusun(k).n / 10);
export const hasilPuluhanSusun = (k: KeadaanJatah): number => Math.floor(puluhan(k) / targetSusun(k).d);
export const sisaPuluhanSusun = (k: KeadaanJatah): number => puluhan(k) % targetSusun(k).d;
export const satuanSusun = (k: KeadaanJatah): number => targetSusun(k).n % 10;
export const gabungSusun = (k: KeadaanJatah): number => sisaPuluhanSusun(k) * 10 + satuanSusun(k);
export const hasilSatuanSusun = (k: KeadaanJatah): number => Math.floor(gabungSusun(k) / targetSusun(k).d);
export const hasilSusun = (k: KeadaanJatah): number => hasilPuluhanSusun(k) * 10 + hasilSatuanSusun(k);
export const pilihanQ1 = (k: KeadaanJatah): number[] => tigaPilihan(hasilPuluhanSusun(k), [targetSusun(k).d, puluhan(k)], hasilPuluhanSusun(k) + k.susunKe);
export const pilihanS1 = (k: KeadaanJatah): number[] => tigaPilihan(sisaPuluhanSusun(k), [hasilPuluhanSusun(k), targetSusun(k).d - 1], sisaPuluhanSusun(k) + k.susunKe + 1);
export const pilihanQ2 = (k: KeadaanJatah): number[] => tigaPilihan(hasilSatuanSusun(k), [hasilPuluhanSusun(k), sisaPuluhanSusun(k)], hasilSatuanSusun(k) + k.susunKe);
export function pilihQ1(k: KeadaanJatah, i: number): KeadaanJatah {
  return i < 0 || i >= 3 ? k : { ...k, q1Pilih: i, s1Pilih: -1, turun: false, q2Pilih: -1 };
}
export function pilihS1(k: KeadaanJatah, i: number): KeadaanJatah {
  return i < 0 || i >= 3 || k.q1Pilih < 0 ? k : { ...k, s1Pilih: i, turun: false, q2Pilih: -1 };
}
/** Turunkan angka satuan. Ditolak sebelum hasil puluhan dan sisa puluhan dipilih dengan benar. */
export function turunkanSusun(k: KeadaanJatah): { k: KeadaanJatah; ok: boolean } {
  const siap = k.q1Pilih >= 0 && k.s1Pilih >= 0 && pilihanQ1(k)[k.q1Pilih] === hasilPuluhanSusun(k) && pilihanS1(k)[k.s1Pilih] === sisaPuluhanSusun(k);
  if (!siap) return { k: { ...k, tolak: true }, ok: false };
  return { k: { ...k, turun: true }, ok: true };
}
export function pilihQ2(k: KeadaanJatah, i: number): KeadaanJatah {
  return i < 0 || i >= 3 || !k.turun ? k : { ...k, q2Pilih: i };
}
export function periksaSusun(k: KeadaanJatah): { k: KeadaanJatah; ok: boolean } {
  if (k.turun && k.q2Pilih >= 0 && pilihanQ2(k)[k.q2Pilih] === hasilSatuanSusun(k)) {
    return { k: { ...k, susunBenar: k.susunBenar.includes(k.susunKe) ? k.susunBenar : [...k.susunBenar, k.susunKe], susunKe: k.susunKe + 1, q1Pilih: -1, s1Pilih: -1, turun: false, q2Pilih: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukSusun(k: KeadaanJatah): string {
  if (k.q1Pilih < 0) return "Mulai dari puluhan. Pilih dulu hasil membagi angka puluhan.";
  if (pilihanQ1(k)[k.q1Pilih] !== hasilPuluhanSusun(k)) return "Bagi angka puluhannya saja lebih dulu dengan pembagi. Angka satuan belum ikut dibagi.";
  if (k.s1Pilih < 0) return "Pilih sisa dari puluhan.";
  if (pilihanS1(k)[k.s1Pilih] !== sisaPuluhanSusun(k)) return "Sisa dari puluhan didapat dari angka puluhan dikurangi hasil kali pembagi dengan hasil bagi puluhan.";
  if (!k.turun) return "Tekan Turunkan angka dulu, supaya angka satuan ikut dibagi.";
  if (k.q2Pilih < 0) return "Pilih hasil membagi bilangan yang baru diturunkan.";
  return "Bagi bilangan baru hasil penurunan dengan pembagi yang sama.";
}
export function kalimatSusun(k: KeadaanJatah): string {
  if (k.susunBenar.length > 0 && k.q1Pilih < 0) return "Betul! Ada bilangan berikutnya.";
  if (k.q1Pilih < 0) return "Bagi dari puluhan: pilih hasil membagi angka puluhan.";
  if (k.s1Pilih < 0) return "Pilih sisa dari puluhan.";
  if (!k.turun) return "Sisa puluhan sudah dipilih. Tekan Turunkan angka.";
  return k.q2Pilih < 0 ? "Pilih hasil membagi bilangan yang diturunkan, lalu tekan Periksa." : "Tekan Periksa bila yakin.";
}

/* ------------------------------ Periksa dengan perkalian ------------------------------ */
export const targetKali = (k: KeadaanJatah) => TARGET_KALI[k.kaliKe % TARGET_KALI.length];
/** Hasil bagi yang diklaim dikalikan pembagi. */
export const hasilKaliKlaim = (k: KeadaanJatah): number => targetKali(k).klaim * targetKali(k).d;
/** Klaim benar bila hasil kali sama dengan bilangan awal. */
export const klaimBenar = (k: KeadaanJatah): boolean => hasilKaliKlaim(k) === targetKali(k).n;
export function cekKali(k: KeadaanJatah): KeadaanJatah {
  return { ...k, kaliCek: true };
}
/** Putuskan klaim benar (0) atau keliru (1). Ditolak sebelum Cek Kali. */
export function putusKali(k: KeadaanJatah, p: 0 | 1): { k: KeadaanJatah; ok: boolean } {
  if (!k.kaliCek) return { k: { ...k, tolak: true }, ok: false };
  return { k: { ...k, kaliPutus: p }, ok: true };
}
export function periksaKali(k: KeadaanJatah): { k: KeadaanJatah; ok: boolean } {
  if (k.kaliCek && k.kaliPutus >= 0 && (k.kaliPutus === 0) === klaimBenar(k)) {
    return { k: { ...k, kaliBenar: k.kaliBenar.includes(k.kaliKe) ? k.kaliBenar : [...k.kaliBenar, k.kaliKe], kaliKe: k.kaliKe + 1, kaliCek: false, kaliPutus: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukKali(k: KeadaanJatah): string {
  if (!k.kaliCek) return "Tekan Cek Kali dulu untuk mengalikan hasil bagi dengan pembagi.";
  if (k.kaliPutus < 0) return "Pilih dulu: hasil bagi benar atau keliru.";
  return klaimBenar(k) ? "Hasil kali sama dengan bilangan awal, jadi hasil bagi itu benar." : "Hasil kali belum sama dengan bilangan awal, jadi hasil bagi itu keliru dan harus dihitung ulang.";
}
export function kalimatKali(k: KeadaanJatah): string {
  if (k.kaliBenar.length > 0 && !k.kaliCek) return "Betul! Ada hasil bagi berikutnya.";
  return k.kaliCek ? "Bandingkan hasil kali dengan bilangan awal, putuskan, lalu tekan Periksa." : "Tekan Cek Kali untuk mengalikan hasil bagi dengan pembagi.";
}
