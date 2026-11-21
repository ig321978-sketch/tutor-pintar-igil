/**
 * Logika murni Simulasi Garis Timbang Kelas 5 Bab 3 Sub-Bab A "Tiga Kantong Tepung Bu Ratna", awal cerita Toko Roti Keliling.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-timbang-k5b3a.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Garis (ketuk tanda pada garis bilangan tempat pecahan berada), Ubah (atur pembilang pecahan biasa yang sama besar dengan pecahan campuran, penyebut tetap),
 * Banding (atur penyebut baru dengan KPK, lalu pilih tanda; alat menolak penyebut yang bukan kelipatan kedua penyebut), dan Urut (ketuk tiga pecahan berurutan; alat menolak kartu yang belum waktunya).
 * Data di data-sim.ts; jawaban dihitung dari bilangan (logika-data.ts).
 */
import {
  TARGET_BANDING,
  TARGET_GARIS,
  TARGET_UBAH,
  TARGET_URUT,
  type SasaranBanding,
  type SasaranGaris,
  type SasaranUbah,
  type SasaranUrut,
} from "./data-sim";
import { bisaSama, keBiasa, kpk, ruasGaris, sebutPec, tandaBanding, urutan, kapital, kata, teksPec } from "./logika-data";

export type ModeTimbang = "garis" | "ubah" | "banding" | "urut";
export type TandaBanding = "" | "<" | "=" | ">";

export type KeadaanTimbang = {
  alat: "timbang";
  mode: ModeTimbang;
  /** Garis: sasaran ke berapa, tanda yang dipilih (-1 belum), sasaran yang sudah benar. */
  garisKe: number;
  garisPilih: number;
  garisBenar: number[];
  /** Ubah: sasaran ke berapa, pembilang yang diatur, sasaran yang sudah benar. */
  ubahKe: number;
  ubahP: number;
  ubahBenar: number[];
  /** Banding: sasaran ke berapa, penyebut baru yang diatur, tanda yang dipilih, sasaran yang sudah benar. */
  bandingKe: number;
  bandingD: number;
  bandingTanda: TandaBanding;
  bandingBenar: number[];
  /** Urut: sasaran ke berapa, indeks kartu yang sudah diketuk berurutan, sasaran yang sudah benar. */
  urutKe: number;
  urutIsi: number[];
  urutBenar: number[];
  /** Alat Banding sudah pernah menolak penyebut baru yang bukan kelipatan kedua penyebut. */
  tolak: boolean;
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

const ke = <T,>(daftar: readonly T[], n: number): T => daftar[n % daftar.length];

export const sasaranGaris = (k: KeadaanTimbang): SasaranGaris => ke(TARGET_GARIS, k.garisKe);
export const sasaranUbah = (k: KeadaanTimbang): SasaranUbah => ke(TARGET_UBAH, k.ubahKe);
export const sasaranBanding = (k: KeadaanTimbang): SasaranBanding => ke(TARGET_BANDING, k.bandingKe);
export const sasaranUrut = (k: KeadaanTimbang): SasaranUrut => ke(TARGET_URUT, k.urutKe);

export const awalTimbang = (): KeadaanTimbang => ({
  alat: "timbang",
  mode: "garis",
  garisKe: 0,
  garisPilih: -1,
  garisBenar: [],
  ubahKe: 0,
  ubahP: 1,
  ubahBenar: [],
  bandingKe: 0,
  bandingD: 2,
  bandingTanda: "",
  bandingBenar: [],
  urutKe: 0,
  urutIsi: [],
  urutBenar: [],
  tolak: false,
  salah: 0,
});
export const mulaiLagiTimbang = (): KeadaanTimbang => awalTimbang();
export const pilihModeTimbang = (k: KeadaanTimbang, mode: ModeTimbang): KeadaanTimbang => ({ ...k, mode });

export { kata, kapital };
export const hurufBesar = kapital;

/* ------------------------------ Garis ------------------------------ */
export const penyebutGaris = (s: SasaranGaris): number => s.f.q;
export const tandaTerakhirGaris = (s: SasaranGaris): number => s.maks * s.f.q;
export function pilihGaris(k: KeadaanTimbang, i: number): KeadaanTimbang {
  const s = sasaranGaris(k);
  return i < 0 || i > tandaTerakhirGaris(s) ? k : { ...k, garisPilih: i };
}
export function periksaGaris(k: KeadaanTimbang): { k: KeadaanTimbang; ok: boolean } {
  const s = sasaranGaris(k);
  if (k.garisPilih >= 0 && k.garisPilih === ruasGaris(s.f)) {
    const baru = k.garisKe + 1;
    return { k: { ...k, garisBenar: k.garisBenar.includes(k.garisKe) ? k.garisBenar : [...k.garisBenar, k.garisKe], garisKe: baru, garisPilih: -1 }, ok: true };
  }
  return { k: k.garisPilih >= 0 ? { ...k, salah: k.salah + 1 } : k, ok: false };
}
export function petunjukGaris(k: KeadaanTimbang): string {
  if (k.garisPilih < 0) return "Alat menolak. Belum ada tanda yang dipilih. Ketuk satu tanda pada garis bilangan, lalu periksa.";
  const s = sasaranGaris(k);
  return k.garisPilih < ruasGaris(s.f)
    ? "Tanda itu masih di sebelah kiri. Hitung ruas dari nol, dan ingat tiap satuan dibagi sama banyak."
    : "Tanda itu sudah terlalu ke kanan. Hitung ruas dari nol, dan ingat tiap satuan dibagi sama banyak.";
}
export function kalimatGaris(k: KeadaanTimbang): string {
  if (k.garisBenar.length > 0 && k.garisPilih < 0 && k.garisKe === k.garisBenar.length) return "Betul! Ada pecahan berikutnya.";
  return k.garisPilih >= 0 ? "Tanda sudah dipilih. Tekan Periksa." : "Ketuk tanda pada garis bilangan tempat pecahan itu berada.";
}
export const kalimatBetulGaris = (s: SasaranGaris): string => `Betul! ${teksPec(s.f)} ${s.satuan} berada di ${ruasGaris(s.f)} ruas dari nol, karena tiap satuan dibagi ${s.f.q} bagian.`;

/* ------------------------------ Ubah ------------------------------ */
export const hasilUbah = (s: SasaranUbah): number => keBiasa(s.f).p;
export function ubahPembilang(k: KeadaanTimbang, delta: 1 | -1): KeadaanTimbang {
  return { ...k, ubahP: Math.min(60, Math.max(1, k.ubahP + delta)) };
}
export function periksaUbah(k: KeadaanTimbang): { k: KeadaanTimbang; ok: boolean } {
  const s = sasaranUbah(k);
  if (k.ubahP === hasilUbah(s)) {
    const baru = k.ubahKe + 1;
    return { k: { ...k, ubahBenar: k.ubahBenar.includes(k.ubahKe) ? k.ubahBenar : [...k.ubahBenar, k.ubahKe], ubahKe: baru, ubahP: 1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukUbah(k: KeadaanTimbang): string {
  const s = sasaranUbah(k);
  return k.ubahP < hasilUbah(s)
    ? "Pembilangnya masih terlalu kecil. Tiap bilangan bulat berisi sebanyak penyebut bagian, lalu tambahkan pembilang pecahannya."
    : "Pembilangnya sudah terlalu besar. Kalikan bilangan bulat dengan penyebut, lalu tambahkan pembilang pecahannya.";
}
export function kalimatUbah(k: KeadaanTimbang): string {
  if (k.ubahBenar.length > 0 && k.ubahP === 1 && k.ubahKe === k.ubahBenar.length) return "Betul! Ada pecahan campuran berikutnya.";
  return "Atur pembilang sampai sama besar dengan pecahan campuran. Penyebutnya tetap.";
}
export const kalimatBetulUbah = (s: SasaranUbah): string => `Betul! ${s.f.w} × ${s.f.q} + ${s.f.p} = ${hasilUbah(s)}, jadi ${teksPec(s.f)} sama besar dengan ${hasilUbah(s)}/${s.f.q}.`;

/* ------------------------------ Banding ------------------------------ */
export const penyebutKpk = (s: SasaranBanding): number => kpk(s.a.q, s.b.q);
export function ubahPenyebutBaru(k: KeadaanTimbang, delta: 1 | -1): KeadaanTimbang {
  return { ...k, bandingD: Math.min(36, Math.max(1, k.bandingD + delta)), bandingTanda: "" };
}
export function pilihTanda(k: KeadaanTimbang, t: TandaBanding): KeadaanTimbang {
  return { ...k, bandingTanda: t };
}
/** Penyebut baru dipakai gambar hanya bila kedua penyebut habis membaginya. */
export const penyebutBaruSah = (k: KeadaanTimbang): boolean => {
  const s = sasaranBanding(k);
  return bisaSama(s.a, k.bandingD) && bisaSama(s.b, k.bandingD);
};
export function periksaBanding(k: KeadaanTimbang): { k: KeadaanTimbang; ok: boolean } {
  const s = sasaranBanding(k);
  if (!penyebutBaruSah(k)) return { k: { ...k, tolak: true }, ok: false };
  if (k.bandingD !== penyebutKpk(s)) return { k, ok: false };
  if (k.bandingTanda === "") return { k, ok: false };
  if (k.bandingTanda === tandaBanding(s.a, s.b)) {
    const baru = k.bandingKe + 1;
    return {
      k: { ...k, bandingBenar: k.bandingBenar.includes(k.bandingKe) ? k.bandingBenar : [...k.bandingBenar, k.bandingKe], bandingKe: baru, bandingD: 2, bandingTanda: "" },
      ok: true,
    };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukBanding(k: KeadaanTimbang): string {
  const s = sasaranBanding(k);
  if (!penyebutBaruSah(k)) return "Alat menolak. Penyebut baru harus bisa dibagi oleh kedua penyebut, karena kedua pecahan harus punya penyebut yang sama.";
  if (k.bandingD !== penyebutKpk(s)) return "Alat menolak. Pakai KPK dari kedua penyebut, yaitu kelipatan persekutuan yang paling kecil.";
  if (k.bandingTanda === "") return "Alat menolak. Tanda belum dipilih. Bandingkan kedua pembilang, lalu pilih tanda.";
  return "Tanda itu belum cocok. Bandingkan pembilang kedua pecahan setelah penyebutnya sama.";
}
export function kalimatBanding(k: KeadaanTimbang): string {
  if (k.bandingBenar.length > 0 && k.bandingD === 2 && k.bandingTanda === "" && k.bandingKe === k.bandingBenar.length) return "Betul! Ada pasangan pecahan berikutnya.";
  return penyebutBaruSah(k) && k.bandingD === penyebutKpk(sasaranBanding(k)) ? "Penyebut sudah sama. Bandingkan pembilangnya, pilih tanda, lalu tekan Periksa." : "Atur penyebut baru sampai kedua pecahan punya penyebut yang sama, lalu tekan Periksa.";
}
export function kalimatBetulBanding(s: SasaranBanding): string {
  const d = penyebutKpk(s);
  return `Betul! KPK ${s.a.q} dan ${s.b.q} adalah ${d}, jadi ${(keBiasa(s.a).p * d) / s.a.q}/${d} ${tandaBanding(s.a, s.b)} ${(keBiasa(s.b).p * d) / s.b.q}/${d}.`;
}

/* ------------------------------ Urut ------------------------------ */
export const urutBenarSasaran = (s: SasaranUrut): number[] => urutan([...s.daftar], s.naik);
/** Ketuk kartu ke-i. Alat hanya menerima kartu yang memang berikutnya dalam urutan. Selesai bila ketiganya terpasang. */
export function ketukUrut(k: KeadaanTimbang, i: number): { k: KeadaanTimbang; ok: boolean; selesai: boolean } {
  const s = sasaranUrut(k);
  if (k.urutIsi.includes(i) || i < 0 || i >= s.daftar.length) return { k, ok: false, selesai: false };
  const urut = urutBenarSasaran(s);
  if (urut[k.urutIsi.length] !== i) return { k: { ...k, salah: k.salah + 1 }, ok: false, selesai: false };
  const isi = [...k.urutIsi, i];
  if (isi.length === s.daftar.length) {
    const baru = k.urutKe + 1;
    return { k: { ...k, urutIsi: [], urutKe: baru, urutBenar: k.urutBenar.includes(k.urutKe) ? k.urutBenar : [...k.urutBenar, k.urutKe] }, ok: true, selesai: true };
  }
  return { k: { ...k, urutIsi: isi }, ok: true, selesai: false };
}
export const ulangUrut = (k: KeadaanTimbang): KeadaanTimbang => ({ ...k, urutIsi: [] });
export function petunjukUrut(k: KeadaanTimbang): string {
  const s = sasaranUrut(k);
  return s.naik
    ? "Alat menolak. Kartu itu belum yang paling kecil di antara yang tersisa. Bandingkan bilangan bulatnya dulu, lalu pecahannya."
    : "Alat menolak. Kartu itu belum yang paling besar di antara yang tersisa. Bandingkan bilangan bulatnya dulu, lalu pecahannya.";
}
export function kalimatUrut(k: KeadaanTimbang): string {
  if (k.urutBenar.length > 0 && k.urutIsi.length === 0 && k.urutKe === k.urutBenar.length) return "Betul! Ada tiga pecahan berikutnya.";
  const s = sasaranUrut(k);
  return `Ketuk kartu dari yang paling ${s.naik ? "kecil" : "besar"}. Sudah ${k.urutIsi.length} dari ${s.daftar.length}.`;
}
export function kalimatBetulUrut(s: SasaranUrut): string {
  const urut = urutBenarSasaran(s).map((i) => teksPec(s.daftar[i]));
  return `Betul! Urutan dari yang paling ${s.naik ? "kecil" : "besar"}: ${urut.join(s.naik ? " < " : " > ")}.`;
}
export const ucapanUrut = (s: SasaranUrut): string => urutBenarSasaran(s).map((i) => sebutPec(s.daftar[i])).join(", ");
