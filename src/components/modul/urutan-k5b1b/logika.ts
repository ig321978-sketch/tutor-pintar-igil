/**
 * Logika murni Simulasi Garis Urutan Kelas 5 Bab 1 Sub-Bab B "Urutan Tribun Pak Hasto" (tema Hari Pertandingan di Stadion Kota).
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-urutan-k5b1b.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Banding (pilih kolom penentu dan tanda; alat menolak Periksa sebelum kolom penentu dipilih), Garis (pilih ruas tempat bilangan di garis berpatokan),
 * Urut (ketuk bilangan naik atau turun; alat menolak bilangan yang bukan giliran), dan Patokan (pilih patokan sepuluh ribuan terdekat).
 * Data ada di data-sim.ts. Tipe KeadaanUrutan (alat: "urutan") dipakai misi-k5bab1.ts dan harus tetap diekspor.
 */
import { BANDING_SIM, GARIS_SIM, PATOKAN_SIM, TANDA_SIM, URUT_SIM } from "./data-sim";
import { fmt, namaPenentu, patokanTerdekat, tandaDari, teksRuas, patokanKiri, urutkan } from "./logika-data";

export type ModeUrutan = "banding" | "garis" | "urut" | "patokan";

export type KeadaanUrutan = {
  alat: "urutan";
  mode: ModeUrutan;
  /** Banding: sasaran ke berapa, kolom penentu terpilih (-1 belum), tanda terpilih (-1 belum), pernah ditolak (Periksa sebelum kolom dipilih), sasaran yang sudah benar. */
  bandingKe: number;
  kolomPilih: number;
  tandaPilih: number;
  tolakBanding: boolean;
  bandingBenar: number[];
  /** Garis: sasaran ke berapa, ruas terpilih (-1 belum), sasaran yang sudah benar. */
  garisKe: number;
  ruasPilih: number;
  garisBenar: number[];
  /** Urut: sasaran ke berapa, indeks item yang sudah diketuk berurutan, pernah ditolak (bilangan bukan giliran), sasaran yang sudah benar. */
  urutKe: number;
  urutPilih: number[];
  tolakUrut: boolean;
  urutBenar: number[];
  /** Patokan: sasaran ke berapa, patokan terpilih (-1 belum), sasaran yang sudah benar. */
  patKe: number;
  patPilih: number;
  patBenar: number[];
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalUrutan = (): KeadaanUrutan => ({
  alat: "urutan",
  mode: "banding",
  bandingKe: 0,
  kolomPilih: -1,
  tandaPilih: -1,
  tolakBanding: false,
  bandingBenar: [],
  garisKe: 0,
  ruasPilih: -1,
  garisBenar: [],
  urutKe: 0,
  urutPilih: [],
  tolakUrut: false,
  urutBenar: [],
  patKe: 0,
  patPilih: -1,
  patBenar: [],
  salah: 0,
});
export const mulaiLagiUrutan = (): KeadaanUrutan => awalUrutan();
export const pilihModeUrutan = (k: KeadaanUrutan, mode: ModeUrutan): KeadaanUrutan => ({ ...k, mode });
const tanpaKembar = (xs: number[]): number[] => xs.filter((x, i) => xs.indexOf(x) === i);

/* ------------------------------ Banding: dari kiri ------------------------------ */
export const targetBanding = (k: KeadaanUrutan) => BANDING_SIM[k.bandingKe % BANDING_SIM.length];
export const kunciKolom = (k: KeadaanUrutan): number => {
  const t = targetBanding(k);
  return t.kol.indexOf(namaPenentu(t.a, t.b));
};
export const kunciTanda = (k: KeadaanUrutan): number => {
  const t = targetBanding(k);
  return TANDA_SIM.indexOf(tandaDari(t.a, t.b));
};
export const pilihKolom = (k: KeadaanUrutan, i: number): KeadaanUrutan => (i < 0 || i > 2 ? k : { ...k, kolomPilih: i });
export const pilihTanda = (k: KeadaanUrutan, i: number): KeadaanUrutan => (i < 0 || i > 2 ? k : { ...k, tandaPilih: i });
/** Periksa banding. Ditolak (tanpa dihitung keliru, mencatat `tolakBanding`) bila kolom penentu belum dipilih. */
export function periksaBanding(k: KeadaanUrutan): { k: KeadaanUrutan; ok: boolean; ditolak?: boolean } {
  if (k.kolomPilih < 0) return { k: { ...k, tolakBanding: true }, ok: false, ditolak: true };
  if (k.kolomPilih === kunciKolom(k) && k.tandaPilih === kunciTanda(k)) {
    return { k: { ...k, bandingBenar: tanpaKembar([...k.bandingBenar, k.bandingKe % BANDING_SIM.length]), bandingKe: k.bandingKe + 1, kolomPilih: -1, tandaPilih: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukBanding(k: KeadaanUrutan): string {
  if (k.kolomPilih < 0) return "Belum ada kolom penentu. Bandingkan dari kiri dulu, lalu pilih kolom tempat angkanya mulai berbeda.";
  if (k.tandaPilih < 0) return "Belum ada tanda. Pilih tanda yang tepat untuk kedua bilangan.";
  if (k.kolomPilih !== kunciKolom(k)) return "Kolom penentunya belum cocok. Bandingkan banyak angka dulu, lalu geser dari kiri sampai angkanya berbeda.";
  return "Tandanya belum cocok. Mulut tanda terbuka ke bilangan yang lebih besar.";
}
export const kalimatBanding = (k: KeadaanUrutan): string =>
  k.bandingBenar.length > 0 && k.kolomPilih < 0 && k.tandaPilih < 0 ? "Betul! Ada pasangan bilangan berikutnya untuk dibandingkan." : "Bandingkan dari kiri, pilih kolom penentu dan tandanya, lalu tekan Periksa.";

/* ------------------------------ Garis: letakkan di garis ------------------------------ */
export const targetGaris = (k: KeadaanUrutan) => GARIS_SIM[k.garisKe % GARIS_SIM.length];
export const kunciRuas = (k: KeadaanUrutan): number => {
  const t = targetGaris(k);
  return t.pil.indexOf(teksRuas(patokanKiri(t.n)));
};
export const pilihRuas = (k: KeadaanUrutan, i: number): KeadaanUrutan => (i < 0 || i > 2 ? k : { ...k, ruasPilih: i });
export function periksaGaris(k: KeadaanUrutan): { k: KeadaanUrutan; ok: boolean } {
  if (k.ruasPilih >= 0 && k.ruasPilih === kunciRuas(k)) return { k: { ...k, garisBenar: tanpaKembar([...k.garisBenar, k.garisKe % GARIS_SIM.length]), garisKe: k.garisKe + 1, ruasPilih: -1 }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukGaris(k: KeadaanUrutan): string {
  if (k.ruasPilih < 0) return "Belum ada pilihan. Bandingkan bilangan dengan patokan di garis, lalu pilih ruasnya.";
  return "Ruasnya belum cocok. Cari dua patokan yang satu lebih kecil dan satu lebih besar daripada bilangan itu.";
}
export const kalimatGaris = (k: KeadaanUrutan): string =>
  k.garisBenar.length > 0 && k.ruasPilih < 0 ? "Betul! Ada bilangan berikutnya untuk diletakkan di garis." : "Letakkan bilangan di garis, pilih ruasnya, lalu tekan Periksa.";

/* ------------------------------ Urut: naik atau turun ------------------------------ */
export const targetUrut = (k: KeadaanUrutan) => URUT_SIM[k.urutKe % URUT_SIM.length];
/** Urutan indeks item yang benar menurut arah (naik atau turun), dihitung dari bilangan. */
export const urutanBenar = (k: KeadaanUrutan): number[] => {
  const t = targetUrut(k);
  return urutkan(t.item.map((x) => x.n), t.arah).map((n) => t.item.findIndex((x) => x.n === n));
};
/** Ketuk satu bilangan: hanya diterima bila itu giliran berikutnya. Selain itu ditolak dan dicatat `tolakUrut` (bukan percobaan keliru). */
export function ketukUrut(k: KeadaanUrutan, i: number): { k: KeadaanUrutan; ok: boolean } {
  const t = targetUrut(k);
  if (i < 0 || i >= t.item.length || k.urutPilih.includes(i)) return { k, ok: false };
  if (urutanBenar(k)[k.urutPilih.length] !== i) return { k: { ...k, tolakUrut: true }, ok: false };
  return { k: { ...k, urutPilih: [...k.urutPilih, i] }, ok: true };
}
export const batalUrut = (k: KeadaanUrutan): KeadaanUrutan => (k.urutPilih.length === 0 ? k : { ...k, urutPilih: k.urutPilih.slice(0, -1) });
export function periksaUrut(k: KeadaanUrutan): { k: KeadaanUrutan; ok: boolean } {
  const t = targetUrut(k);
  if (k.urutPilih.length === t.item.length) return { k: { ...k, urutBenar: tanpaKembar([...k.urutBenar, k.urutKe % URUT_SIM.length]), urutKe: k.urutKe + 1, urutPilih: [] }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukUrut(k: KeadaanUrutan): string {
  if (k.urutPilih.length === 0) return "Belum ada bilangan yang diurutkan. Ketuk bilangan satu per satu mulai dari ujung urutan.";
  return "Urutannya belum lengkap. Teruskan mengetuk bilangan berikutnya sampai semuanya terpakai.";
}
export const kalimatUrut = (k: KeadaanUrutan): string =>
  k.urutBenar.length > 0 && k.urutPilih.length === 0 ? "Betul! Ada kumpulan bilangan berikutnya untuk diurutkan." : `Ketuk bilangan satu per satu dalam urutan ${targetUrut(k).arah}, lalu tekan Periksa.`;

/* ------------------------------ Patokan: terdekat ------------------------------ */
export const targetPatokan = (k: KeadaanUrutan) => PATOKAN_SIM[k.patKe % PATOKAN_SIM.length];
export const kunciPatokan = (k: KeadaanUrutan): number => {
  const t = targetPatokan(k);
  return t.pil.indexOf(fmt(patokanTerdekat(t.n)));
};
export const pilihPatokan = (k: KeadaanUrutan, i: number): KeadaanUrutan => (i < 0 || i > 2 ? k : { ...k, patPilih: i });
export function periksaPatokan(k: KeadaanUrutan): { k: KeadaanUrutan; ok: boolean } {
  if (k.patPilih >= 0 && k.patPilih === kunciPatokan(k)) return { k: { ...k, patBenar: tanpaKembar([...k.patBenar, k.patKe % PATOKAN_SIM.length]), patKe: k.patKe + 1, patPilih: -1 }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukPatokan(k: KeadaanUrutan): string {
  if (k.patPilih < 0) return "Belum ada pilihan. Lihat jarak bilangan itu ke tiap patokan, lalu pilih yang paling dekat.";
  return "Patokan itu belum yang paling dekat. Bandingkan jarak bilangan ke patokan di kiri dan di kanannya.";
}
export const kalimatPatokan = (k: KeadaanUrutan): string =>
  k.patBenar.length > 0 && k.patPilih < 0 ? "Betul! Ada bilangan berikutnya untuk dicari patokannya." : "Pilih patokan yang paling dekat dengan bilangan itu, lalu tekan Periksa.";
