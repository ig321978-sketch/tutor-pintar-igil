/**
 * Logika murni Simulasi Kios Kelapa Kelas 4 Bab 1 Sub-Bab D "Kios Kelapa Pak Darwis", Penginapan Pulau Karang Indah.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-kelapa-k4b1d.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Pecah (isi keranjang tiap tempat sampai jumlahnya sama dengan bilangan; alat menolak sepuluh keranjang di satu tempat),
 * Susun (pilih bilangan yang tersusun dari keranjang, tempat kosong diisi nol), Bagan (cari bagian yang hilang, Cek Bagan, lalu Periksa),
 * dan Lain (simpan tiga cara berbeda menguraikan satu bilangan menjadi dua bagian; alat menolak cara yang sama). Data ada di data-sim.ts.
 * Tipe KeadaanKelapa (alat: "kelapa") dipakai misi-k4bab1.ts dan HARUS tetap diekspor.
 */
import { CARA_DIPERLUKAN, MAKS_KERANJANG, TARGET_BAGAN, TARGET_LAIN, TARGET_PECAH, TARGET_SUSUN, TARGET_UANG, URAIAN_UANG_DIPERLUKAN } from "./data-sim";
import { HARGA, STOK_UANG, URUT_PECAHAN, URUT_TEMPAT, baganKeliru, jenisUang, kataBil, rb, susunKeliru, teksUang, type IsiUang } from "./logika-cpa";

export type ModeKelapa = "pecah" | "susun" | "bagan" | "lain" | "uang";

export type KeadaanKelapa = {
  alat: "kelapa";
  mode: ModeKelapa;
  /** Pecah: sasaran ke berapa, banyak keranjang tiap tempat (ribuan, ratusan, puluhan, satuan), sasaran yang sudah benar. */
  pecahKe: number;
  isi: number[];
  pecahBenar: number[];
  /** Susun: sasaran ke berapa, pilihan bilangan (-1 bila belum), sasaran yang sudah benar. */
  susunKe: number;
  susunPilih: number;
  susunBenar: number[];
  /** Bagan: sasaran ke berapa, pilihan bagian lain (-1 bila belum), sudah menekan Cek Bagan, sasaran yang sudah benar. */
  bagKe: number;
  bagPilih: number;
  bagCek: boolean;
  bagBenar: number[];
  /** Lain: sasaran ke berapa, ribuan bagian pertama yang dipilih, ribuan yang sudah disimpan, sasaran yang sudah benar. */
  lainKe: number;
  lainA: number;
  lainSimpan: number[];
  lainBenar: number[];
  /** Uang: sasaran ke berapa, banyak lembar atau keping tiap pecahan (Rp 2.000, 1.000, 500, 100), uraian yang sudah disimpan, sasaran yang sudah benar. */
  uangKe: number;
  uangIsi: number[];
  uangSimpan: string[];
  uangBenar: number[];
  /** Pernah mencoba langkah yang ditolak alat (sepuluh keranjang di satu tempat, atau cara yang sama). */
  tolak: boolean;
  /** Banyak percobaan Periksa yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalKelapa = (): KeadaanKelapa => ({
  alat: "kelapa",
  mode: "pecah",
  pecahKe: 0,
  isi: [0, 0, 0, 0],
  pecahBenar: [],
  susunKe: 0,
  susunPilih: -1,
  susunBenar: [],
  bagKe: 0,
  bagPilih: -1,
  bagCek: false,
  bagBenar: [],
  lainKe: 0,
  lainA: 1,
  lainSimpan: [],
  lainBenar: [],
  uangKe: 0,
  uangIsi: [0, 0, 0, 0],
  uangSimpan: [],
  uangBenar: [],
  tolak: false,
  salah: 0,
});
export const mulaiLagiKelapa = (): KeadaanKelapa => awalKelapa();

export const kata = kataBil;
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
export { besar as hurufBesar };
export const pilihModeKelapa = (k: KeadaanKelapa, mode: ModeKelapa): KeadaanKelapa => ({ ...k, mode });

/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisip<T>(benar: T, lain: T[], geser: number): T[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}
const keAngka = (s: string): number => Number(s.replace(/\./g, ""));
const tambahBenar = (daftar: number[], ke: number): number[] => (daftar.includes(ke) ? daftar : [...daftar, ke]);

/* ------------------------------ Pecah: isi keranjang ------------------------------ */
export const targetPecah = (k: KeadaanKelapa) => TARGET_PECAH[k.pecahKe % TARGET_PECAH.length];
/** Jumlah semua keranjang: tiap keranjang di tempat angka punya harga tempatnya. */
export const jumlahIsi = (k: KeadaanKelapa): number => k.isi.reduce((t, c, i) => t + c * HARGA[URUT_TEMPAT[i]], 0);
/** Tambah satu keranjang di tempat ke-`i` (0 ribuan, 3 satuan). Paling banyak sembilan; yang kesepuluh ditolak alat. */
export function tambahKeranjang(k: KeadaanKelapa, i: number): { k: KeadaanKelapa; ok: boolean } {
  if (i < 0 || i >= 4) return { k, ok: false };
  if (k.isi[i] >= MAKS_KERANJANG) return { k: { ...k, tolak: true }, ok: false };
  const isi = [...k.isi];
  isi[i] += 1;
  return { k: { ...k, isi }, ok: true };
}
export function kurangKeranjang(k: KeadaanKelapa, i: number): { k: KeadaanKelapa; ok: boolean } {
  if (i < 0 || i >= 4 || k.isi[i] <= 0) return { k, ok: false };
  const isi = [...k.isi];
  isi[i] -= 1;
  return { k: { ...k, isi }, ok: true };
}
export function periksaPecah(k: KeadaanKelapa): { k: KeadaanKelapa; ok: boolean } {
  if (jumlahIsi(k) === targetPecah(k).n) {
    return { k: { ...k, pecahBenar: tambahBenar(k.pecahBenar, k.pecahKe), pecahKe: k.pecahKe + 1, isi: [0, 0, 0, 0] }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukPecah(k: KeadaanKelapa): string {
  const j = jumlahIsi(k);
  const n = targetPecah(k).n;
  if (j === 0) return "Belum ada keranjang di rak. Tekan tambah pada tiap tempat sesuai angka pada bilangan.";
  if (j < n) return "Isi keranjang masih kurang dari bilangan. Periksa angka di tiap tempat, dari ribuan sampai satuan.";
  if (j > n) return "Isi keranjang sudah lebih dari bilangan. Kurangi keranjang di tempat yang terlalu banyak.";
  return "Isi keranjang sudah pas. Tekan Periksa.";
}
export function kalimatPecah(k: KeadaanKelapa): string {
  if (k.pecahBenar.length > 0 && jumlahIsi(k) === 0) return "Betul! Ada bilangan berikutnya.";
  return jumlahIsi(k) === 0 ? "Tekan tambah pada tiap tempat sampai keranjang sesuai dengan bilangan, lalu tekan Periksa." : "Terus isi keranjang sampai sesuai dengan bilangan, lalu tekan Periksa.";
}
export const petunjukTolak = (): string => "Alat menolak. Satu tempat paling banyak sembilan keranjang. Sepuluh keranjang kecil ditukar dengan satu keranjang di tempat yang lebih besar.";

/* ------------------------------ Susun: bilangan dari keranjang ------------------------------ */
export const targetSusun = (k: KeadaanKelapa) => TARGET_SUSUN[k.susunKe % TARGET_SUSUN.length];
export const bilanganSusun = (k: KeadaanKelapa): number => targetSusun(k).isi.reduce((t, c, i) => t + c * HARGA[URUT_TEMPAT[i]], 0);
/** Tiga pilihan bilangan: yang benar dan dua susunan keliru (nol hilang, angka dirapatkan, atau bertukar). Yang benar tidak di tempat pertama. */
export function pilihanSusun(k: KeadaanKelapa): number[] {
  const n = bilanganSusun(k);
  const lain = susunKeliru(n).map(keAngka).slice(0, 2);
  return sisip(n, lain, n + k.susunKe);
}
export function pilihSusun(k: KeadaanKelapa, i: number): KeadaanKelapa {
  return i < 0 || i >= 3 ? k : { ...k, susunPilih: i };
}
export function periksaSusun(k: KeadaanKelapa): { k: KeadaanKelapa; ok: boolean } {
  if (k.susunPilih >= 0 && pilihanSusun(k)[k.susunPilih] === bilanganSusun(k)) {
    return { k: { ...k, susunBenar: tambahBenar(k.susunBenar, k.susunKe), susunKe: k.susunKe + 1, susunPilih: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukSusun(k: KeadaanKelapa): string {
  if (k.susunPilih < 0) return "Pilih satu bilangan dulu.";
  return "Taruh tiap keranjang pada tempatnya, dari ribuan sampai satuan. Tempat yang kosong harus diisi nol, jangan dilewati.";
}
export function kalimatSusun(k: KeadaanKelapa): string {
  return k.susunBenar.length > 0 && k.susunPilih < 0 ? "Betul! Ada keranjang berikutnya." : "Lihat keranjang di tiap tempat, pilih bilangan yang tersusun, lalu tekan Periksa.";
}

/* ------------------------------ Bagan bagian utuh ------------------------------ */
export const targetBagan = (k: KeadaanKelapa) => TARGET_BAGAN[k.bagKe % TARGET_BAGAN.length];
export const sisaBagianKu = (k: KeadaanKelapa): number => targetBagan(k).utuh - targetBagan(k).bagian;
/** Tiga pilihan bagian lain: yang benar dan dua yang bergeser seribu atau seratus. Yang benar tidak di tempat pertama. */
export function pilihanBagan(k: KeadaanKelapa): number[] {
  const t = targetBagan(k);
  const sisa = sisaBagianKu(k);
  const lain = baganKeliru({ tipe: "bagan", benda: "kelapa", utuh: t.utuh, bagian: t.bagian, satuan: 100 }).map(keAngka).slice(0, 2);
  return sisip(sisa, lain, sisa / 100 + k.bagKe);
}
export function pilihBagan(k: KeadaanKelapa, i: number): KeadaanKelapa {
  return i < 0 || i >= 3 ? k : { ...k, bagPilih: i, bagCek: false };
}
/** Cek Bagan: bagian yang diketahui ditambah bagian yang dipilih, dibandingkan dengan bilangan utuh. Butuh satu pilihan. */
export function cekBagan(k: KeadaanKelapa): { k: KeadaanKelapa; ok: boolean; hasil: number; cocok: boolean } {
  if (k.bagPilih < 0) return { k, ok: false, hasil: 0, cocok: false };
  const hasil = targetBagan(k).bagian + pilihanBagan(k)[k.bagPilih];
  return { k: { ...k, bagCek: true }, ok: true, hasil, cocok: hasil === targetBagan(k).utuh };
}
export function periksaBagan(k: KeadaanKelapa): { k: KeadaanKelapa; ok: boolean } {
  if (k.bagPilih >= 0 && k.bagCek && pilihanBagan(k)[k.bagPilih] === sisaBagianKu(k)) {
    return { k: { ...k, bagBenar: tambahBenar(k.bagBenar, k.bagKe), bagKe: k.bagKe + 1, bagPilih: -1, bagCek: false }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukBagan(k: KeadaanKelapa): string {
  if (k.bagPilih < 0) return "Pilih satu bagian dulu.";
  if (!k.bagCek) return "Tekan Cek Bagan dulu untuk menjumlahkan kedua bagian.";
  return "Bagian yang lain didapat dengan mengurangkan bilangan utuh dengan bagian yang sudah diketahui. Jumlah kedua bagian harus sama dengan bilangan utuh.";
}
export function kalimatBagan(k: KeadaanKelapa): string {
  if (k.bagBenar.length > 0 && k.bagPilih < 0) return "Betul! Ada bagan berikutnya.";
  return k.bagCek ? "Cek Bagan sudah dilihat. Tekan Periksa bila yakin." : "Pilih bagian yang lain, tekan Cek Bagan, lalu tekan Periksa.";
}

/* ------------------------------ Lain: lebih dari satu cara ------------------------------ */
export const targetLain = (k: KeadaanKelapa) => TARGET_LAIN[k.lainKe % TARGET_LAIN.length];
/** Ribuan paling banyak untuk bagian pertama: bagian pertama tidak boleh melebihi bilangan. */
export const maksRibu = (k: KeadaanKelapa): number => Math.floor(targetLain(k).n / 1000);
export function aturRibu(k: KeadaanKelapa, delta: -1 | 1): { k: KeadaanKelapa; ok: boolean } {
  const a = k.lainA + delta;
  if (a < 1 || a > maksRibu(k)) return { k, ok: false };
  return { k: { ...k, lainA: a }, ok: true };
}
export const caraLain = (k: KeadaanKelapa, a = k.lainA): string => `${rb(a * 1000)} + ${rb(targetLain(k).n - a * 1000)}`;
/** Simpan cara sekarang. Cara yang sama dengan yang sudah disimpan ditolak alat. Setelah tiga cara berbeda, sasaran selesai. */
export function simpanCara(k: KeadaanKelapa): { k: KeadaanKelapa; ok: boolean; selesai: boolean } {
  if (k.lainSimpan.includes(k.lainA)) return { k: { ...k, tolak: true }, ok: false, selesai: false };
  const simpan = [...k.lainSimpan, k.lainA];
  if (simpan.length >= CARA_DIPERLUKAN) {
    return { k: { ...k, lainBenar: tambahBenar(k.lainBenar, k.lainKe), lainKe: k.lainKe + 1, lainA: 1, lainSimpan: [] }, ok: true, selesai: true };
  }
  return { k: { ...k, lainSimpan: simpan }, ok: true, selesai: false };
}
export function petunjukLain(k: KeadaanKelapa): string {
  if (k.lainSimpan.includes(k.lainA)) return "Alat menolak. Cara itu sudah disimpan. Ubah ribuan bagian pertama, lalu simpan cara yang berbeda.";
  return "Ubah ribuan bagian pertama, lihat bagian lain di sebelahnya, lalu tekan Simpan cara.";
}
export function kalimatLain(k: KeadaanKelapa): string {
  if (k.lainBenar.length > 0 && k.lainSimpan.length === 0) return "Betul! Tiga cara sudah tersimpan. Ada bilangan berikutnya.";
  return k.lainSimpan.length === 0 ? "Ubah ribuan bagian pertama, lalu simpan cara. Cari tiga cara yang berbeda." : `Sudah ${kata(k.lainSimpan.length)} cara tersimpan. Cari cara lain yang berbeda.`;
}

/* ------------------------------ Uang: uraikan uang dengan lembar dan keping ------------------------------ */
export const targetUang = (k: KeadaanKelapa) => TARGET_UANG[k.uangKe % TARGET_UANG.length];
export const isiUangDari = (isi: number[]): IsiUang => ({ 2000: isi[0], 1000: isi[1], 500: isi[2], 100: isi[3] });
/** Jumlah uang di meja: banyak tiap pecahan dikali harga pecahannya. */
export const jumlahUangKu = (k: KeadaanKelapa): number => k.uangIsi.reduce((t, c, i) => t + c * URUT_PECAHAN[i], 0);
/** Tambah (+1) atau ambil (-1) satu lembar atau keping pecahan ke-`i` (0 = Rp 2.000, 3 = Rp 100). Paling banyak sebanyak uang di kotak kios; yang melebihi ditolak alat. */
export function aturUang(k: KeadaanKelapa, i: number, d: -1 | 1): { k: KeadaanKelapa; ok: boolean } {
  if (i < 0 || i >= 4) return { k, ok: false };
  const v = k.uangIsi[i] + d;
  if (v < 0 || v > STOK_UANG[URUT_PECAHAN[i]]) return { k: d > 0 ? { ...k, tolak: true } : k, ok: false };
  const isi = [...k.uangIsi];
  isi[i] = v;
  return { k: { ...k, uangIsi: isi }, ok: true };
}
export const petunjukBatasUang = (i: number, d: -1 | 1): string => {
  const p = URUT_PECAHAN[i];
  return d > 0 ? `Alat menolak. Di kotak kios hanya ada ${kata(STOK_UANG[p])} ${jenisUang(p)} uang ${kata(p)}.` : "Tidak ada lagi yang bisa diambil dari pecahan itu.";
};
/** Simpan uraian sekarang. Jumlah harus pas dengan uang yang dibayar; uraian yang sama dengan yang sudah disimpan ditolak alat. Setelah dua uraian berbeda, sasaran selesai. */
export function simpanUang(k: KeadaanKelapa): { k: KeadaanKelapa; ok: boolean; selesai: boolean } {
  if (jumlahUangKu(k) !== targetUang(k).n) return { k: { ...k, salah: k.salah + 1 }, ok: false, selesai: false };
  const teks = teksUang(isiUangDari(k.uangIsi));
  if (k.uangSimpan.includes(teks)) return { k: { ...k, tolak: true }, ok: false, selesai: false };
  const simpan = [...k.uangSimpan, teks];
  if (simpan.length >= URAIAN_UANG_DIPERLUKAN) {
    return { k: { ...k, uangBenar: tambahBenar(k.uangBenar, k.uangKe), uangKe: k.uangKe + 1, uangIsi: [0, 0, 0, 0], uangSimpan: [] }, ok: true, selesai: true };
  }
  return { k: { ...k, uangSimpan: simpan }, ok: true, selesai: false };
}
export function petunjukUang(k: KeadaanKelapa): string {
  const j = jumlahUangKu(k);
  const n = targetUang(k).n;
  if (j === 0) return "Belum ada uang di meja. Tekan tambah pada lembar atau keping sampai jumlahnya sama dengan uang yang dibayar.";
  if (j < n) return "Jumlah uang masih kurang dari uang yang dibayar. Tambah lembar atau keping.";
  if (j > n) return "Jumlah uang sudah lebih dari uang yang dibayar. Ambil satu lembar atau keping.";
  if (k.uangSimpan.includes(teksUang(isiUangDari(k.uangIsi)))) return "Alat menolak. Uraian itu sudah disimpan. Ubah lembar atau keping, lalu simpan uraian yang berbeda.";
  return "Jumlah uang sudah pas. Tekan Simpan uraian.";
}
export function kalimatUang(k: KeadaanKelapa): string {
  if (k.uangBenar.length > 0 && k.uangSimpan.length === 0 && jumlahUangKu(k) === 0) return "Betul! Dua uraian berbeda sudah tersimpan. Ada uang berikutnya.";
  return k.uangSimpan.length === 0 ? "Atur lembar dan keping sampai jumlahnya pas, lalu simpan uraian. Cari dua uraian yang berbeda." : `Sudah ${kata(k.uangSimpan.length)} uraian tersimpan. Cari uraian lain yang berbeda.`;
}
