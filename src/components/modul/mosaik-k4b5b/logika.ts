/**
 * Logika murni Simulasi Mosaik Keramik Kelas 4 Bab 5 Sub-Bab B "Mosaik Pak Rudi", akhir cerita Toko Keramik Bu Dewi.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-mosaik-k4b5b.mjs. Eksplorasi bebas tanpa skor.
 * Tiga alat: Pasang (pilih dua keping dari rak dan sisi yang dipertemukan; alat menolak dua keping yang tidak sama besar), Bagi (tarik garis dari titik tengah ke tiap sudut;
 * alat menolak garis yang melebihi banyak sudut, lalu pilih banyak segitiga), dan Sudut (tarik garis dari satu sudut ke sudut yang tidak bersebelahan; alat menolak sudut yang bersebelahan).
 * Data ada di data-sim.ts. Tipe KeadaanMosaik (alat: "mosaik") dipakai misi-k4bab5.ts dan harus tetap diekspor.
 */
import { BAGI_SIM, PASANG_SIM, SUDUT_SIM } from "./data-sim";
import { namaBangun, type Bidang } from "./logika-cpa";

export type ModeMosaik = "pasang" | "bagi" | "sudut";
export type SisiPasang = "miring" | "tegak";

export type KeadaanMosaik = {
  alat: "mosaik";
  mode: ModeMosaik;
  /** Pasang: sasaran ke berapa, keping terpilih (indeks pada rak, paling banyak dua), sisi yang dipertemukan, sudah dipasang, pernah ditolak (keping tidak sama besar), sasaran yang sudah benar. */
  pasangKe: number;
  pilih: number[];
  sisi: SisiPasang | null;
  terpasang: boolean;
  tolakPasang: boolean;
  pasangBenar: number[];
  /** Bagi: sasaran ke berapa, banyak garis dari titik tengah, pilihan banyak segitiga (-1 belum), pernah ditolak (garis melebihi banyak sudut), sasaran yang sudah benar. */
  bagiKe: number;
  garis: number;
  pilihBagi: number;
  tolakBagi: boolean;
  bagiBenar: number[];
  /** Sudut: sasaran ke berapa, sudut yang sudah dihubungkan dari sudut pertama, pernah ditolak (sudut bersebelahan), sasaran yang sudah benar. */
  sudutKe: number;
  hubung: number[];
  tolakSudut: boolean;
  sudutBenar: number[];
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalMosaik = (): KeadaanMosaik => ({
  alat: "mosaik",
  mode: "pasang",
  pasangKe: 0,
  pilih: [],
  sisi: null,
  terpasang: false,
  tolakPasang: false,
  pasangBenar: [],
  bagiKe: 0,
  garis: 0,
  pilihBagi: -1,
  tolakBagi: false,
  bagiBenar: [],
  sudutKe: 0,
  hubung: [],
  tolakSudut: false,
  sudutBenar: [],
  salah: 0,
});
export const mulaiLagiMosaik = (): KeadaanMosaik => awalMosaik();
export const pilihModeMosaik = (k: KeadaanMosaik, mode: ModeMosaik): KeadaanMosaik => ({ ...k, mode });
const tanpaKembar = (xs: number[]): number[] => xs.filter((x, i) => xs.indexOf(x) === i);

/* ------------------------------ Pasang: dua keping sama besar ------------------------------ */
export const targetPasang = (k: KeadaanMosaik) => PASANG_SIM[k.pasangKe % PASANG_SIM.length];
/** Pilih atau lepas satu keping (paling banyak dua dipilih); perubahan memutus pasangan yang sudah ada. */
export function pilihKeping(k: KeadaanMosaik, i: number): KeadaanMosaik {
  if (i < 0 || i > 3) return k;
  const sisa = k.pilih.includes(i) ? k.pilih.filter((x) => x !== i) : k.pilih.length >= 2 ? [k.pilih[1], i] : [...k.pilih, i];
  return { ...k, pilih: sisa, terpasang: false };
}
export const pilihSisi = (k: KeadaanMosaik, sisi: SisiPasang): KeadaanMosaik => ({ ...k, sisi, terpasang: false });
/** Bangun hasil pasangan dua keping segitiga siku-siku sama kaki berkaki `a`, dipertemukan pada sisi miring (persegi) atau sisi tegak (segitiga yang lebih besar). Dihitung dari koordinat. */
export function bidangPasang(a: number, sisi: SisiPasang): Bidang {
  return sisi === "miring"
    ? [[0, 0], [a, 0], [a, a], [0, a]]
    : [[-a, 0], [a, 0], [0, a]];
}
export type SebabPasang = "belum" | "sisi" | "beda";
/** Pasang dua keping pilihan. Ditolak (tanpa dihitung keliru) bila belum dua keping ("belum"), sisi belum dipilih ("sisi"), dan bila kedua keping tidak sama besar ("beda", mencatat `tolakPasang`). */
export function pasangKeping(k: KeadaanMosaik): { k: KeadaanMosaik; ok: boolean; sebab?: SebabPasang } {
  if (k.pilih.length < 2) return { k, ok: false, sebab: "belum" };
  if (k.sisi === null) return { k, ok: false, sebab: "sisi" };
  const rak = targetPasang(k).rak;
  if (rak[k.pilih[0]] !== rak[k.pilih[1]]) return { k: { ...k, tolakPasang: true, terpasang: false }, ok: false, sebab: "beda" };
  return { k: { ...k, terpasang: true }, ok: true };
}
/** Nama bangun hasil pasangan sekarang (dihitung dari koordinat), atau null bila belum terpasang. */
export function hasilPasang(k: KeadaanMosaik): string | null {
  if (!k.terpasang || k.sisi === null || k.pilih.length < 2) return null;
  return namaBangun(bidangPasang(targetPasang(k).rak[k.pilih[0]], k.sisi));
}
export function periksaPasang(k: KeadaanMosaik): { k: KeadaanMosaik; ok: boolean } {
  if (hasilPasang(k) === targetPasang(k).sasaran) {
    return { k: { ...k, pasangBenar: tanpaKembar([...k.pasangBenar, k.pasangKe % PASANG_SIM.length]), pasangKe: k.pasangKe + 1, pilih: [], sisi: null, terpasang: false }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukPasang(k: KeadaanMosaik): string {
  if (k.pilih.length < 2) return "Belum ada dua keping. Pilih dua keping dari rak dulu.";
  if (k.sisi === null) return "Sisi yang dipertemukan belum dipilih. Pilih sisi miring atau sisi tegak.";
  if (!k.terpasang) return "Kedua keping belum dipasang. Tekan Pasang dulu.";
  return "Bangun yang terbentuk belum sama dengan sasaran. Coba sisi yang lain untuk dipertemukan.";
}
export function kalimatPasang(k: KeadaanMosaik): string {
  if (k.pasangBenar.length > 0 && k.pilih.length === 0 && !k.terpasang) return "Betul! Ada sasaran berikutnya untuk dipasang.";
  return `Pasang dua keping yang sama besar menjadi ${targetPasang(k).sasaran}. Tekan Periksa bila sudah pas.`;
}

/* ------------------------------ Bagi: garis dari titik tengah ------------------------------ */
export const targetBagi = (k: KeadaanMosaik) => BAGI_SIM[k.bagiKe % BAGI_SIM.length];
/** Tarik satu garis dari titik tengah ke satu sudut lagi. Ditolak bila semua sudut sudah punya garis (mencatat `tolakBagi`). */
export function tambahGaris(k: KeadaanMosaik): { k: KeadaanMosaik; ok: boolean } {
  if (k.garis >= targetBagi(k).n) return { k: { ...k, tolakBagi: true }, ok: false };
  return { k: { ...k, garis: k.garis + 1 }, ok: true };
}
export const kurangiGaris = (k: KeadaanMosaik): KeadaanMosaik => (k.garis === 0 ? k : { ...k, garis: k.garis - 1, pilihBagi: -1 });
export function pilihBanyak(k: KeadaanMosaik, i: number): KeadaanMosaik {
  if (i < 0 || i > 2) return k;
  return { ...k, pilihBagi: i };
}
/** Indeks pilihan yang benar: banyak segitiga sama dengan banyak sisi, dihitung dari data. */
export const kunciBagi = (k: KeadaanMosaik): number => targetBagi(k).pil.indexOf(targetBagi(k).n);
export function periksaBagi(k: KeadaanMosaik): { k: KeadaanMosaik; ok: boolean } {
  if (k.garis === targetBagi(k).n && k.pilihBagi === kunciBagi(k)) {
    return { k: { ...k, bagiBenar: tanpaKembar([...k.bagiBenar, k.bagiKe]), bagiKe: k.bagiKe + 1, garis: 0, pilihBagi: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukBagi(k: KeadaanMosaik): string {
  if (k.garis === 0) return "Belum ada garis. Tekan Tarik garis untuk menghubungkan titik tengah ke satu sudut.";
  if (k.garis < targetBagi(k).n) return "Masih ada sudut yang belum punya garis dari titik tengah. Tarik garis lagi.";
  if (k.pilihBagi < 0) return "Garisnya sudah lengkap. Pilih banyak segitiga yang terbentuk.";
  return "Banyak segitiga belum cocok. Hitung sudutnya, lalu cocokkan dengan banyak segitiga di antara tiap dua sudut yang bersebelahan.";
}
export function kalimatBagi(k: KeadaanMosaik): string {
  if (k.bagiBenar.length > 0 && k.garis === 0) return "Betul! Ada keramik berikutnya untuk dibelah.";
  return "Tarik garis dari titik tengah ke tiap sudut, pilih banyak segitiga, lalu tekan Periksa.";
}

/* ------------------------------ Sudut: garis dari satu sudut ------------------------------ */
export const targetSudut = (k: KeadaanMosaik) => SUDUT_SIM[k.sudutKe % SUDUT_SIM.length];
/** Banyak garis yang harus ditarik dari satu sudut: ke semua sudut kecuali dirinya dan dua sudut yang bersebelahan. */
export const garisSudut = (k: KeadaanMosaik): number => targetSudut(k).n - 3;
/** Hubungkan sudut pertama dengan sudut ke-`i` (indeks 0 sampai n - 1). Ditolak bila `i` adalah sudut pertama atau sudut yang bersebelahan (mencatat `tolakSudut`). */
export function hubungkan(k: KeadaanMosaik, i: number): { k: KeadaanMosaik; ok: boolean } {
  const n = targetSudut(k).n;
  if (i <= 0 || i >= n) return { k, ok: false };
  if (i === 1 || i === n - 1) return { k: { ...k, tolakSudut: true }, ok: false };
  if (k.hubung.includes(i)) return { k: { ...k, hubung: k.hubung.filter((x) => x !== i) }, ok: true };
  return { k: { ...k, hubung: [...k.hubung, i].sort((a, b) => a - b) }, ok: true };
}
/** Banyak segitiga yang terbentuk dari garis yang sudah ditarik: satu lebih banyak dari banyak garis. */
export const segitigaSudut = (k: KeadaanMosaik): number => k.hubung.length + 1;
export function periksaSudut(k: KeadaanMosaik): { k: KeadaanMosaik; ok: boolean } {
  if (k.hubung.length === garisSudut(k)) {
    return { k: { ...k, sudutBenar: tanpaKembar([...k.sudutBenar, k.sudutKe]), sudutKe: k.sudutKe + 1, hubung: [] }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukSudut(k: KeadaanMosaik): string {
  if (k.hubung.length === 0) return "Belum ada garis. Ketuk sudut yang tidak bersebelahan dengan sudut pertama.";
  return "Masih ada sudut yang belum dihubungkan. Hubungkan semua sudut yang tidak bersebelahan dengan sudut pertama.";
}
export function kalimatSudut(k: KeadaanMosaik): string {
  if (k.sudutBenar.length > 0 && k.hubung.length === 0) return "Betul! Ada segi banyak berikutnya untuk dibelah.";
  return "Ketuk sudut yang tidak bersebelahan dengan sudut pertama sampai semuanya terhubung, lalu tekan Periksa.";
}
