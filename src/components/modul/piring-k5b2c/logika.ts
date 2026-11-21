/**
 * Logika murni Simulasi Tata Piring Kelas 5 Bab 2 Sub-Bab C "Klepon Bu Wati", meja pasar malam. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-piring-k5b2c.mjs.
 * Eksplorasi bebas tanpa skor. Empat alat: Tata (atur isi tiap piring; alat menolak bila klepon bersisa, dan mencatat tiap cara yang habis dibagi sampai semua faktor ditemukan),
 * Pasang (ketuk dua kartu faktor yang hasil kalinya sama dengan bilangan; alat menolak pasangan yang keliru), Cek (isi sisa pembagian; alat menolak bila belum diisi),
 * dan Daftar (pilih semua faktor; alat menolak bila belum ada yang dipilih). Data di data-sim.ts; jawaban dihitung dari data.
 */
import { TARGET_CEK, TARGET_DAFTAR, TARGET_PASANG, TARGET_TATA, type SasaranCek, type SasaranDaftar } from "./data-sim";
import { bagiSisa, faktorDari } from "./logika-data";
import { kataK5B1 } from "../eja-k5b1";

export type ModePiring = "tata" | "pasang" | "cek" | "daftar";

export type KeadaanPiring = {
  alat: "piring";
  mode: ModePiring;
  /** Tata: sasaran ke berapa, isi tiap piring yang sedang dicoba, isi piring yang sudah dicatat (faktor), sasaran yang sudah benar. */
  tataKe: number;
  tataP: number;
  tataTemu: number[];
  tataBenar: number[];
  /** Pasang: sasaran ke berapa, kartu yang sedang dipilih (-1 bila tidak ada), kartu yang sudah berpasangan, sasaran yang sudah benar. */
  pasangKe: number;
  pasangPilih: number;
  pasangTemu: number[];
  pasangBenar: number[];
  /** Cek: sasaran ke berapa, sisa yang diisi (-1 bila belum diisi), sasaran yang sudah benar. */
  cekKe: number;
  cekSisa: number;
  cekBenar: number[];
  /** Daftar: sasaran ke berapa, kartu yang dipilih, sasaran yang sudah benar. */
  daftarKe: number;
  daftarPilih: boolean[];
  daftarBenar: number[];
  /** Alat Tata sudah pernah menolak isi piring yang membuat klepon bersisa. */
  tolak: boolean;
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

const ke = <T,>(daftar: readonly T[], n: number): T => daftar[n % daftar.length];

/* ------------------------------ Sasaran ------------------------------ */
export const bilanganTata = (k: KeadaanPiring): number => ke(TARGET_TATA, k.tataKe);
export const bilanganPasang = (k: KeadaanPiring): number => ke(TARGET_PASANG, k.pasangKe);
export const sasaranCek = (k: KeadaanPiring): SasaranCek => ke(TARGET_CEK, k.cekKe);
export const sasaranDaftar = (k: KeadaanPiring): SasaranDaftar => ke(TARGET_DAFTAR, k.daftarKe);
/** Kartu faktor yang diacak tetap: faktor urutan genap lebih dulu, lalu urutan ganjil dari belakang. */
export function kartuPasang(n: number): number[] {
  const f = faktorDari(n);
  return [...f.filter((_, i) => i % 2 === 0), ...f.filter((_, i) => i % 2 === 1).reverse()];
}
/** Indeks kartu daftar yang merupakan faktor (dihitung dengan mencoba tiap kartu). */
export const kartuFaktor = (x: SasaranDaftar): number[] => x.kartu.map((c, i) => (x.n % c === 0 ? i : -1)).filter((i) => i >= 0);

export const awalPiring = (): KeadaanPiring => ({
  alat: "piring",
  mode: "tata",
  tataKe: 0,
  tataP: 1,
  tataTemu: [],
  tataBenar: [],
  pasangKe: 0,
  pasangPilih: -1,
  pasangTemu: [],
  pasangBenar: [],
  cekKe: 0,
  cekSisa: -1,
  cekBenar: [],
  daftarKe: 0,
  daftarPilih: TARGET_DAFTAR[0].kartu.map(() => false),
  daftarBenar: [],
  tolak: false,
  salah: 0,
});
export const mulaiLagiPiring = (): KeadaanPiring => awalPiring();
export const pilihModePiring = (k: KeadaanPiring, mode: ModePiring): KeadaanPiring => ({ ...k, mode });

/* ------------------------------ Kata ------------------------------ */
/** Nama bilangan dalam kata (tanpa digit). */
export const kata = (n: number): string => kataK5B1(n);
const besar = (t: string) => t.replace(/(^|[.!?] )([a-z])/g, (_, a: string, b: string) => a + b.toUpperCase());
export { besar as hurufBesar };

/* ------------------------------ Tata ------------------------------ */
export function ubahTata(k: KeadaanPiring, delta: 1 | -1): KeadaanPiring {
  const baru = Math.max(1, Math.min(bilanganTata(k), k.tataP + delta));
  return { ...k, tataP: baru };
}
/** Periksa isi tiap piring: bersisa = ditolak (menandai tantangan menolak); habis dibagi = dicatat; semua faktor tercatat = sasaran berikutnya. */
export function periksaTata(k: KeadaanPiring): { k: KeadaanPiring; ok: boolean; baru: boolean } {
  const n = bilanganTata(k);
  if (n % k.tataP !== 0) return { k: { ...k, tolak: true }, ok: false, baru: false };
  if (k.tataTemu.includes(k.tataP)) return { k, ok: true, baru: false };
  const temu = [...k.tataTemu, k.tataP].sort((a, b) => a - b);
  if (temu.length === faktorDari(n).length) {
    const lanjut = k.tataKe + 1;
    return { k: { ...k, tataBenar: k.tataBenar.includes(k.tataKe) ? k.tataBenar : [...k.tataBenar, k.tataKe], tataKe: lanjut, tataP: 1, tataTemu: [] }, ok: true, baru: true };
  }
  return { k: { ...k, tataTemu: temu }, ok: true, baru: true };
}
export function petunjukTata(k: KeadaanPiring): string {
  const { r } = bagiSisa(bilanganTata(k), k.tataP);
  return `Alat menolak. Klepon bersisa ${kata(r)} butir, jadi isi piring itu belum membagi habis. Coba isi piring yang lain.`;
}
export function kalimatTata(k: KeadaanPiring): string {
  if (k.tataBenar.length > 0 && k.tataTemu.length === 0 && k.tataP === 1 && k.tataKe === k.tataBenar.length) return "Betul! Semua cara sudah tercatat. Ada klepon berikutnya.";
  return k.tataTemu.length === 0 ? "Atur isi tiap piring, lalu tekan Periksa. Catat semua cara yang habis dibagi." : "Terus cari cara lain sampai semua faktor tercatat.";
}
/** Kalimat setelah cara yang habis dibagi diterima. */
export function kalimatTerima(k: KeadaanPiring, baru: boolean): string {
  const n = bilanganTata(k);
  const p = k.tataP;
  if (!baru) return "Cara itu sudah kamu catat. Cari cara yang lain.";
  return `Betul! ${kata(n)} klepon habis dibagi, tiap piring berisi ${kata(p)} klepon, jadi ada ${kata(n / p)} piring.`;
}

/* ------------------------------ Pasang ------------------------------ */
export type HasilPasang = "pilih" | "batal" | "cocok" | "tolak" | "abaikan";
/** Ketuk satu kartu: pilih, batalkan pilihan, atau memasangkan dengan kartu yang sudah dipilih (cocok bila hasil kalinya sama dengan bilangan). */
export function ketukPasang(k: KeadaanPiring, i: number): { k: KeadaanPiring; hasil: HasilPasang } {
  const kartu = kartuPasang(bilanganPasang(k));
  if (i < 0 || i >= kartu.length || k.pasangTemu.includes(i)) return { k, hasil: "abaikan" };
  if (k.pasangPilih < 0) return { k: { ...k, pasangPilih: i }, hasil: "pilih" };
  if (k.pasangPilih === i) return { k: { ...k, pasangPilih: -1 }, hasil: "batal" };
  if (kartu[k.pasangPilih] * kartu[i] === bilanganPasang(k)) {
    const temu = [...k.pasangTemu, k.pasangPilih, i];
    if (temu.length === kartu.length) {
      const lanjut = k.pasangKe + 1;
      return { k: { ...k, pasangBenar: k.pasangBenar.includes(k.pasangKe) ? k.pasangBenar : [...k.pasangBenar, k.pasangKe], pasangKe: lanjut, pasangPilih: -1, pasangTemu: [] }, hasil: "cocok" };
    }
    return { k: { ...k, pasangPilih: -1, pasangTemu: temu }, hasil: "cocok" };
  }
  return { k: { ...k, pasangPilih: -1, salah: k.salah + 1 }, hasil: "tolak" };
}
export const petunjukPasang = (): string => "Alat menolak. Hasil kali kedua kartu itu belum sama dengan bilangan di papan. Cari pasangan yang tepat.";
export function kalimatPasang(k: KeadaanPiring): string {
  if (k.pasangBenar.length > 0 && k.pasangTemu.length === 0 && k.pasangPilih < 0 && k.pasangKe === k.pasangBenar.length) return "Betul! Semua faktor sudah berpasangan. Ada bilangan berikutnya.";
  return k.pasangPilih >= 0 ? "Pilih kartu kedua yang berpasangan dengan kartu pertama." : "Ketuk dua kartu yang hasil kalinya sama dengan bilangan di papan.";
}

/* ------------------------------ Cek ------------------------------ */
export function ubahCek(k: KeadaanPiring, delta: 1 | -1): KeadaanPiring {
  const { x } = sasaranCek(k);
  const dari = k.cekSisa < 0 ? (delta > 0 ? -1 : 0) : k.cekSisa;
  return { ...k, cekSisa: Math.max(0, Math.min(x - 1, dari + delta)) };
}
export function periksaCek(k: KeadaanPiring): { k: KeadaanPiring; ok: boolean } {
  if (k.cekSisa < 0) return { k, ok: false };
  const { n, x } = sasaranCek(k);
  if (k.cekSisa === n % x) {
    const lanjut = k.cekKe + 1;
    return { k: { ...k, cekBenar: k.cekBenar.includes(k.cekKe) ? k.cekBenar : [...k.cekBenar, k.cekKe], cekKe: lanjut, cekSisa: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukCek(k: KeadaanPiring): string {
  if (k.cekSisa < 0) return "Alat menolak. Sisanya belum diisi. Atur sisa pembagian dulu, lalu tekan Periksa.";
  return "Sisanya belum tepat. Bagi dengan teliti, lalu hitung klepon yang tidak cukup untuk satu piring penuh.";
}
export function kalimatCek(k: KeadaanPiring): string {
  if (k.cekBenar.length > 0 && k.cekSisa < 0 && k.cekKe === k.cekBenar.length) return "Betul! Ada pembagian berikutnya.";
  return k.cekSisa < 0 ? "Atur sisa pembagian dengan tombol tambah dan kurang." : "Bandingkan dengan hitunganmu, lalu tekan Periksa.";
}

/* ------------------------------ Daftar ------------------------------ */
export function ubahDaftar(k: KeadaanPiring, i: number): KeadaanPiring {
  if (i < 0 || i >= k.daftarPilih.length) return k;
  return { ...k, daftarPilih: k.daftarPilih.map((p, j) => (j === i ? !p : p)) };
}
export function periksaDaftar(k: KeadaanPiring): { k: KeadaanPiring; ok: boolean } {
  if (k.daftarPilih.every((p) => !p)) return { k, ok: false };
  const benar = kartuFaktor(sasaranDaftar(k));
  const dipilih = k.daftarPilih.map((p, i) => (p ? i : -1)).filter((i) => i >= 0);
  if (dipilih.length === benar.length && dipilih.every((i, j) => i === benar[j])) {
    const lanjut = k.daftarKe + 1;
    return { k: { ...k, daftarBenar: k.daftarBenar.includes(k.daftarKe) ? k.daftarBenar : [...k.daftarBenar, k.daftarKe], daftarKe: lanjut, daftarPilih: ke(TARGET_DAFTAR, lanjut).kartu.map(() => false) }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukDaftar(k: KeadaanPiring): string {
  if (k.daftarPilih.every((p) => !p)) return "Alat menolak. Belum ada kartu yang dipilih. Pilih dulu, lalu tekan Periksa.";
  return "Pilihannya belum tepat. Coba bagi bilangan di papan dengan tiap kartu, dan jangan lupa kartu yang selalu menjadi faktor.";
}
export function kalimatDaftar(k: KeadaanPiring): string {
  if (k.daftarBenar.length > 0 && k.daftarPilih.every((p) => !p) && k.daftarKe === k.daftarBenar.length) return "Betul! Ada bilangan berikutnya.";
  return k.daftarPilih.every((p) => !p) ? "Ketuk semua kartu yang membagi bilangan di papan tanpa sisa." : "Sudah dipilih. Tekan Periksa bila sudah yakin.";
}
