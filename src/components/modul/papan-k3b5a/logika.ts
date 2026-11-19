/**
 * Logika murni Simulasi Meja Catat Kelas 3 Bab 5 Sub-Bab A "Catatan Pak Hasan", awal cerita Bengkel Sepeda Pak Hasan.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-papan-k3b5a.mjs. Eksplorasi bebas tanpa skor.
 * Lima alat: Urut (geser kartu data sampai berurutan), Ujung (urutkan, lalu tandai data terkecil dan terbesar; alat menolak menandai sebelum data diurutkan),
 * Jangkauan (pilih jangkauan, Cek Jangkauan, lalu Periksa), Banding (dua hari: yang lebih banyak dan selisihnya), dan Turus (ketuk menambah garis, garis kelima menjadi bundel, baca banyak).
 * Data ada di data-sim.ts.
 */
import { MAKS_GARIS, TARGET_BANDING, TARGET_JANGKAU, TARGET_TURUS, TARGET_UJUNG, TARGET_URUT } from "./data-sim";

export type ModeCatat = "urut" | "ujung" | "jangkau" | "banding" | "turus";

export type KeadaanCatat = {
  alat: "catat";
  mode: ModeCatat;
  /** Urut: sasaran ke berapa, susunan kartu sekarang, kartu yang dipilih (-1 bila belum), sasaran yang sudah benar. */
  urutKe: number;
  susun: number[];
  urutSel: number;
  urutBenar: number[];
  /** Ujung: sasaran ke berapa, susunan kartu, sudah diurutkan, kartu yang dipilih, kartu yang ditandai terkecil dan terbesar (-1 bila belum), sudah mencoba menandai sebelum diurutkan (ditolak), sasaran yang sudah benar. */
  ujungKe: number;
  ujungSusun: number[];
  ujungUrut: boolean;
  ujungSel: number;
  kecilTanda: number;
  besarTanda: number;
  tolak: boolean;
  ujungBenar: number[];
  /** Jangkauan: sasaran ke berapa, pilihan (-1 bila belum), sudah menekan Cek Jangkauan, sasaran yang sudah benar. */
  jangKe: number;
  jangPilih: number;
  jangCek: boolean;
  jangBenar: number[];
  /** Banding: sasaran ke berapa, hari yang dipilih lebih banyak (-1 belum, 0 pertama, 1 kedua), pilihan selisih (-1 bila belum), sasaran yang sudah benar. */
  bandKe: number;
  bandLebih: number;
  bandPilih: number;
  bandBenar: number[];
  /** Turus: sasaran ke berapa, banyak garis yang sudah ditambahkan, pilihan banyak (-1 bila belum), sasaran yang sudah benar. */
  turusKe: number;
  garis: number;
  turusPilih: number;
  turusBenar: number[];
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalCatat = (): KeadaanCatat => ({
  alat: "catat",
  mode: "urut",
  urutKe: 0,
  susun: [...TARGET_URUT[0].data],
  urutSel: -1,
  urutBenar: [],
  ujungKe: 0,
  ujungSusun: [...TARGET_UJUNG[0].data],
  ujungUrut: false,
  ujungSel: -1,
  kecilTanda: -1,
  besarTanda: -1,
  tolak: false,
  ujungBenar: [],
  jangKe: 0,
  jangPilih: -1,
  jangCek: false,
  jangBenar: [],
  bandKe: 0,
  bandLebih: -1,
  bandPilih: -1,
  bandBenar: [],
  turusKe: 0,
  garis: 0,
  turusPilih: -1,
  turusBenar: [],
  salah: 0,
});
export const mulaiLagiCatat = (): KeadaanCatat => awalCatat();

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
export const pilihModeCatat = (k: KeadaanCatat, mode: ModeCatat): KeadaanCatat => ({ ...k, mode });

/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisip<T>(benar: T, lain: T[], geser: number): T[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}
const naik = (d: readonly number[]): number[] => [...d].sort((a, b) => a - b);
const sama = (a: readonly number[], b: readonly number[]): boolean => a.length === b.length && a.every((x, i) => x === b[i]);
export const terkecilCatat = (d: readonly number[]): number => Math.min(...d);
export const terbesarCatat = (d: readonly number[]): number => Math.max(...d);

/* ------------------------------ Urutkan kartu ------------------------------ */
export const targetUrut = (k: KeadaanCatat) => TARGET_URUT[k.urutKe % TARGET_URUT.length];
/** Susunan yang benar untuk sasaran sekarang. */
export const urutanBenar = (k: KeadaanCatat): number[] => {
  const t = targetUrut(k);
  return t.arah === "naik" ? naik(t.data) : naik(t.data).reverse();
};
export function pilihKartu(k: KeadaanCatat, i: number): KeadaanCatat {
  return i < 0 || i >= k.susun.length ? k : { ...k, urutSel: i };
}
/** Geser kartu yang dipilih satu tempat ke kiri (delta -1) atau kanan (delta 1) dengan menukar tetangganya. */
export function geserKartu(k: KeadaanCatat, delta: -1 | 1): { k: KeadaanCatat; ok: boolean } {
  const i = k.urutSel;
  const j = i + delta;
  if (i < 0 || j < 0 || j >= k.susun.length) return { k, ok: false };
  const susun = [...k.susun];
  [susun[i], susun[j]] = [susun[j], susun[i]];
  return { k: { ...k, susun, urutSel: j }, ok: true };
}
export function periksaUrut(k: KeadaanCatat): { k: KeadaanCatat; ok: boolean } {
  if (sama(k.susun, urutanBenar(k))) {
    const ke = k.urutKe + 1;
    return { k: { ...k, urutBenar: k.urutBenar.includes(k.urutKe) ? k.urutBenar : [...k.urutBenar, k.urutKe], urutKe: ke, susun: [...TARGET_URUT[ke % TARGET_URUT.length].data], urutSel: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukUrut(k: KeadaanCatat): string {
  const t = targetUrut(k);
  if (sama(k.susun, t.data)) return "Kartu belum digeser. Pilih satu kartu, lalu geser ke kiri atau ke kanan sampai data berurutan.";
  if (sama(k.susun, [...urutanBenar(k)].reverse())) return t.arah === "naik" ? "Urutannya terbalik. Susun dari yang terkecil di kiri sampai yang terbesar di kanan." : "Urutannya terbalik. Susun dari yang terbesar di kiri sampai yang terkecil di kanan.";
  return "Masih ada kartu yang belum pada tempatnya. Bandingkan dua kartu yang bersebelahan, lalu tukar bila perlu.";
}
export function kalimatUrut(k: KeadaanCatat): string {
  const t = targetUrut(k);
  if (k.urutBenar.length > 0 && sama(k.susun, t.data) && k.urutSel < 0) return "Betul! Ada kartu berikutnya.";
  return t.arah === "naik" ? "Geser kartu sampai berurutan dari yang terkecil ke yang terbesar, lalu tekan Periksa." : "Geser kartu sampai berurutan dari yang terbesar ke yang terkecil, lalu tekan Periksa.";
}

/* ------------------------------ Tandai terkecil dan terbesar ------------------------------ */
export const targetUjung = (k: KeadaanCatat) => TARGET_UJUNG[k.ujungKe % TARGET_UJUNG.length];
/** Urutkan kartu dari terkecil ke terbesar (tombol Urutkan). */
export function urutkanUjung(k: KeadaanCatat): KeadaanCatat {
  return { ...k, ujungSusun: naik(k.ujungSusun), ujungUrut: true, ujungSel: -1, kecilTanda: -1, besarTanda: -1 };
}
export function pilihUjung(k: KeadaanCatat, i: number): KeadaanCatat {
  return i < 0 || i >= k.ujungSusun.length ? k : { ...k, ujungSel: i };
}
/** Tandai kartu yang dipilih sebagai terkecil atau terbesar. Alat menolak bila data belum diurutkan (dan memang belum urut). */
export function tandaiUjung(k: KeadaanCatat, jenis: "kecil" | "besar"): { k: KeadaanCatat; ok: boolean } {
  const urut = k.ujungUrut || sama(k.ujungSusun, naik(k.ujungSusun));
  if (!urut) return { k: { ...k, tolak: true }, ok: false };
  if (k.ujungSel < 0) return { k, ok: false };
  return { k: jenis === "kecil" ? { ...k, kecilTanda: k.ujungSel } : { ...k, besarTanda: k.ujungSel }, ok: true };
}
export function periksaUjung(k: KeadaanCatat): { k: KeadaanCatat; ok: boolean } {
  const d = k.ujungSusun;
  if (k.ujungUrut && k.kecilTanda >= 0 && k.besarTanda >= 0 && d[k.kecilTanda] === terkecilCatat(d) && d[k.besarTanda] === terbesarCatat(d)) {
    const ke = k.ujungKe + 1;
    return {
      k: { ...k, ujungBenar: k.ujungBenar.includes(k.ujungKe) ? k.ujungBenar : [...k.ujungBenar, k.ujungKe], ujungKe: ke, ujungSusun: [...TARGET_UJUNG[ke % TARGET_UJUNG.length].data], ujungUrut: false, ujungSel: -1, kecilTanda: -1, besarTanda: -1 },
      ok: true,
    };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukUjung(k: KeadaanCatat): string {
  if (!k.ujungUrut) return "Data belum diurutkan. Tekan Urutkan dulu, baru tandai data terkecil dan data terbesar.";
  if (k.kecilTanda < 0) return "Pilih satu kartu, lalu tekan Tandai terkecil.";
  if (k.besarTanda < 0) return "Pilih satu kartu, lalu tekan Tandai terbesar.";
  return "Setelah diurutkan, data terkecil ada di ujung kiri dan data terbesar di ujung kanan. Tandai kartu di kedua ujung itu.";
}
export function kalimatUjung(k: KeadaanCatat): string {
  if (k.ujungBenar.length > 0 && !k.ujungUrut && k.kecilTanda < 0 && k.besarTanda < 0) return "Betul! Ada data berikutnya.";
  if (!k.ujungUrut) return "Tekan Urutkan supaya data berurutan, lalu tandai data terkecil dan data terbesar.";
  return k.kecilTanda < 0 || k.besarTanda < 0 ? "Pilih kartu, tandai terkecil dan terbesar, lalu tekan Periksa." : "Kedua tanda sudah dipasang. Tekan Periksa.";
}

/* ------------------------------ Jangkauan dan Cek Jangkauan ------------------------------ */
export const targetJangkau = (k: KeadaanCatat) => TARGET_JANGKAU[k.jangKe % TARGET_JANGKAU.length];
export const jangkauanSasaran = (k: KeadaanCatat): number => terbesarCatat(targetJangkau(k).data) - terkecilCatat(targetJangkau(k).data);
/** Tiga pilihan jangkauan: yang benar, hasil menjumlahkan terbesar dan terkecil, dan data terbesar. Yang benar tidak di tempat pertama. */
export function pilihanJangkau(k: KeadaanCatat): number[] {
  const d = targetJangkau(k).data;
  const benar = jangkauanSasaran(k);
  const lain = [terbesarCatat(d) + terkecilCatat(d), terbesarCatat(d), benar + 1].filter((x, i, a) => x !== benar && a.indexOf(x) === i);
  return sisip(benar, lain.slice(0, 2), benar);
}
export function pilihJangkau(k: KeadaanCatat, i: number): KeadaanCatat {
  return i < 0 || i >= 3 ? k : { ...k, jangPilih: i, jangCek: false };
}
/** Cek Jangkauan: data terkecil ditambah jangkauan yang dipilih, dibandingkan dengan data terbesar. Butuh satu pilihan. */
export function cekJangkau(k: KeadaanCatat): { k: KeadaanCatat; ok: boolean; hasil: number; cocok: boolean } {
  if (k.jangPilih < 0) return { k, ok: false, hasil: 0, cocok: false };
  const d = targetJangkau(k).data;
  const hasil = terkecilCatat(d) + pilihanJangkau(k)[k.jangPilih];
  return { k: { ...k, jangCek: true }, ok: true, hasil, cocok: hasil === terbesarCatat(d) };
}
export function periksaJangkau(k: KeadaanCatat): { k: KeadaanCatat; ok: boolean } {
  if (k.jangPilih >= 0 && k.jangCek && pilihanJangkau(k)[k.jangPilih] === jangkauanSasaran(k)) {
    return { k: { ...k, jangBenar: k.jangBenar.includes(k.jangKe) ? k.jangBenar : [...k.jangBenar, k.jangKe], jangKe: k.jangKe + 1, jangPilih: -1, jangCek: false }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukJangkau(k: KeadaanCatat): string {
  if (k.jangPilih < 0) return "Pilih satu jangkauan dulu.";
  if (!k.jangCek) return "Tekan Cek Jangkauan dulu untuk menambahkan jangkauan itu ke data terkecil.";
  return "Jangkauan adalah selisih, jadi data terbesar dikurangi data terkecil. Data terkecil ditambah jangkauan yang benar harus sama dengan data terbesar.";
}
export function kalimatJangkau(k: KeadaanCatat): string {
  if (k.jangBenar.length > 0 && k.jangPilih < 0) return "Betul! Ada data berikutnya.";
  return k.jangCek ? "Cek Jangkauan sudah dilihat. Tekan Periksa bila yakin." : "Pilih jangkauan, tekan Cek Jangkauan, lalu tekan Periksa.";
}

/* ------------------------------ Bandingkan dua hari ------------------------------ */
export const targetBanding = (k: KeadaanCatat) => TARGET_BANDING[k.bandKe % TARGET_BANDING.length];
/** Indeks hari yang lebih banyak (0 untuk hari pertama, 1 untuk hari kedua). */
export const hariLebih = (k: KeadaanCatat): number => (targetBanding(k).a.n > targetBanding(k).b.n ? 0 : 1);
export const selisihBanding = (k: KeadaanCatat): number => Math.abs(targetBanding(k).a.n - targetBanding(k).b.n);
/** Tiga pilihan selisih: yang benar, hasil menjumlahkan, dan satu lebih banyak. Yang benar tidak di tempat pertama. */
export function pilihanBanding(k: KeadaanCatat): number[] {
  const t = targetBanding(k);
  const benar = selisihBanding(k);
  const lain = [t.a.n + t.b.n, benar + 1, benar - 1].filter((x, i, a) => x > 0 && x !== benar && a.indexOf(x) === i);
  return sisip(benar, lain.slice(0, 2), benar + k.bandKe);
}
export function pilihLebih(k: KeadaanCatat, i: 0 | 1): KeadaanCatat {
  return { ...k, bandLebih: i };
}
export function pilihBanding(k: KeadaanCatat, i: number): KeadaanCatat {
  return i < 0 || i >= 3 ? k : { ...k, bandPilih: i };
}
export function periksaBanding(k: KeadaanCatat): { k: KeadaanCatat; ok: boolean } {
  if (k.bandLebih === hariLebih(k) && k.bandPilih >= 0 && pilihanBanding(k)[k.bandPilih] === selisihBanding(k)) {
    return { k: { ...k, bandBenar: k.bandBenar.includes(k.bandKe) ? k.bandBenar : [...k.bandBenar, k.bandKe], bandKe: k.bandKe + 1, bandLebih: -1, bandPilih: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukBanding(k: KeadaanCatat): string {
  if (k.bandLebih < 0) return "Pilih dulu hari yang datanya lebih banyak.";
  if (k.bandLebih !== hariLebih(k)) return "Hari yang dipilih datanya lebih sedikit. Bandingkan kedua bilangan, lalu pilih yang lebih besar.";
  if (k.bandPilih < 0) return "Pilih satu selisih dulu.";
  return "Selisih didapat dengan mengurangkan bilangan yang lebih besar dengan bilangan yang lebih kecil, bukan menjumlahkan.";
}
export function kalimatBanding(k: KeadaanCatat): string {
  return k.bandBenar.length > 0 && k.bandLebih < 0 ? "Betul! Ada dua hari berikutnya." : "Pilih hari yang lebih banyak dan selisihnya, lalu tekan Periksa.";
}

/* ------------------------------ Turus ------------------------------ */
export const targetTurus = (k: KeadaanCatat) => TARGET_TURUS[k.turusKe % TARGET_TURUS.length];
/** Tambah satu garis turus. Garis kelima otomatis menjadi bundel (digambar miring). Berhenti di batas alat. */
export function tambahGaris(k: KeadaanCatat): { k: KeadaanCatat; ok: boolean } {
  if (k.garis >= MAKS_GARIS) return { k, ok: false };
  return { k: { ...k, garis: k.garis + 1, turusPilih: -1 }, ok: true };
}
export function hapusGaris(k: KeadaanCatat): { k: KeadaanCatat; ok: boolean } {
  if (k.garis <= 0) return { k, ok: false };
  return { k: { ...k, garis: k.garis - 1, turusPilih: -1 }, ok: true };
}
/** Banyak bundel penuh dan garis sisa pada turus sekarang. */
export const bundelSekarang = (k: KeadaanCatat): number => Math.floor(k.garis / 5);
export const sisaSekarang = (k: KeadaanCatat): number => k.garis % 5;
/** Tiga pilihan banyak: yang benar, bundel dihitung satu, dan coretan miring dihitung garis tambahan. Yang benar tidak di tempat pertama. */
export function pilihanTurus(k: KeadaanCatat): number[] {
  const n = targetTurus(k).banyak;
  const b = Math.floor(n / 5);
  const lain = [b + (n % 5), n + b, n - 1].filter((x, i, a) => x > 0 && x !== n && a.indexOf(x) === i);
  return sisip(n, lain.slice(0, 2), n + k.turusKe);
}
export function pilihTurus(k: KeadaanCatat, i: number): KeadaanCatat {
  return i < 0 || i >= 3 || k.garis !== targetTurus(k).banyak ? k : { ...k, turusPilih: i };
}
export function periksaTurus(k: KeadaanCatat): { k: KeadaanCatat; ok: boolean } {
  const n = targetTurus(k).banyak;
  if (k.garis === n && k.turusPilih >= 0 && pilihanTurus(k)[k.turusPilih] === n) {
    const ke = k.turusKe + 1;
    return { k: { ...k, turusBenar: k.turusBenar.includes(k.turusKe) ? k.turusBenar : [...k.turusBenar, k.turusKe], turusKe: ke, garis: 0, turusPilih: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukTurus(k: KeadaanCatat): string {
  const n = targetTurus(k).banyak;
  if (k.garis < n) return "Garis turus belum sebanyak benda. Tekan Tambah garis untuk tiap benda.";
  if (k.garis > n) return "Garis turus terlalu banyak. Tekan Hapus garis sampai sebanyak benda.";
  if (k.turusPilih < 0) return "Pilih satu banyak dulu.";
  return "Satu bundel lima berisi lima garis, yaitu empat tegak dan satu miring. Hitung tiap bundel sebagai lima, lalu tambahkan garis sisanya.";
}
export function kalimatTurus(k: KeadaanCatat): string {
  if (k.turusBenar.length > 0 && k.garis === 0) return "Betul! Ada benda berikutnya.";
  const n = targetTurus(k).banyak;
  if (k.garis === n) return "Garis turus sudah sebanyak benda. Pilih banyaknya, lalu tekan Periksa.";
  return k.garis === 0 ? "Tekan Tambah garis satu kali untuk tiap benda. Garis kelima otomatis menjadi bundel." : `Sudah ${kata(k.garis)} garis, ${kata(bundelSekarang(k))} bundel dan ${kata(sisaSekarang(k))} garis sisa.`;
}
