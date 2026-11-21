/**
 * Logika murni Simulasi Bak Ember Kelas 4 Bab 4 Sub-Bab B "Ember Pak Anto", akhir cerita Kolam Renang Tirta Ceria.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-ember-k4b4b.mjs. Eksplorasi bebas tanpa skor.
 * Tiga alat: Tuang (pilih ukuran gelas takar lalu tuang ke ember sampai garis sasaran; alat menolak tuangan yang membuat ember meluap),
 * Susun (tumpuk lapisan kubus sampai volume sasaran; alat menolak lapisan melebihi tinggi bak), dan Tangga (pilih turun atau naik, lalu hasil ubah satuan liter dan mililiter).
 * Data ada di data-sim.ts. Tipe KeadaanEmber (alat: "ember") dipakai misi-k4bab4.ts dan harus tetap diekspor.
 */
import { SUSUN_SIM, TANGGA_SIM, TUANG_SIM, hasilTangga } from "./data-sim";
import { fmt } from "./logika-cpa";

export type ModeEmber = "tuang" | "susun" | "tangga";
export type ArahTangga = "turun" | "naik";

export type KeadaanEmber = {
  alat: "ember";
  mode: ModeEmber;
  /** Tuang: sasaran ke berapa, ukuran gelas terpilih (0 belum dipilih), isi tiap gelas yang sudah dituang, sasaran yang sudah benar. */
  tuangKe: number;
  takar: number;
  tuangan: number[];
  tuangBenar: number[];
  /** Pernah ditolak alat karena air meluap dari ember. */
  tolak: boolean;
  /** Susun: sasaran ke berapa, banyak lapisan, sasaran yang sudah benar, dan pernah ditolak alat karena melebihi tinggi bak. */
  susunKe: number;
  lapis: number;
  susunBenar: number[];
  tolakSusun: boolean;
  /** Tangga: sasaran ke berapa, arah terpilih (null belum), pilihan hasil (-1 belum memilih), sasaran yang sudah benar (indeks genap turun, ganjil naik). */
  tanggaKe: number;
  arah: ArahTangga | null;
  pilih: number;
  tanggaBenar: number[];
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalEmber = (): KeadaanEmber => ({
  alat: "ember",
  mode: "tuang",
  tuangKe: 0,
  takar: 0,
  tuangan: [],
  tuangBenar: [],
  tolak: false,
  susunKe: 0,
  lapis: 0,
  susunBenar: [],
  tolakSusun: false,
  tanggaKe: 0,
  arah: null,
  pilih: -1,
  tanggaBenar: [],
  salah: 0,
});
export const mulaiLagiEmber = (): KeadaanEmber => awalEmber();
export const pilihModeEmber = (k: KeadaanEmber, mode: ModeEmber): KeadaanEmber => ({ ...k, mode });

const tanpaKembar = (xs: number[]): number[] => xs.filter((x, i) => xs.indexOf(x) === i);
const jumlah = (xs: number[]): number => xs.reduce((s, x) => s + x, 0);

/* ------------------------------ Tuang: isi ember sampai garis sasaran ------------------------------ */
export const targetTuang = (k: KeadaanEmber) => TUANG_SIM[k.tuangKe % TUANG_SIM.length];
/** Air di ember sekarang (ml). */
export const isiEmber = (k: KeadaanEmber): number => jumlah(k.tuangan);
/** Pilih ukuran gelas takar; hanya ukuran yang ada pada sasaran. */
export function pilihTakar(k: KeadaanEmber, takar: number): KeadaanEmber {
  return targetTuang(k).takar.includes(takar as never) ? { ...k, takar } : k;
}
export type SebabTuang = "belum" | "luap";
/**
 * Tuang satu gelas takar. Ditolak (tanpa dihitung keliru) bila ukuran gelas belum dipilih ("belum") dan bila air akan melebihi kapasitas ember ("luap", mencatat `tolak`).
 */
export function tuang(k: KeadaanEmber): { k: KeadaanEmber; ok: boolean; sebab?: SebabTuang } {
  if (k.takar === 0) return { k, ok: false, sebab: "belum" };
  if (isiEmber(k) + k.takar > targetTuang(k).kapasitas) return { k: { ...k, tolak: true }, ok: false, sebab: "luap" };
  return { k: { ...k, tuangan: [...k.tuangan, k.takar] }, ok: true };
}
/** Urungkan tuangan terakhir. */
export const urungkanTuang = (k: KeadaanEmber): KeadaanEmber => (k.tuangan.length === 0 ? k : { ...k, tuangan: k.tuangan.slice(0, -1) });
export const kosongkanEmber = (k: KeadaanEmber): KeadaanEmber => ({ ...k, tuangan: [], takar: 0 });
export function periksaTuang(k: KeadaanEmber): { k: KeadaanEmber; ok: boolean } {
  if (isiEmber(k) === targetTuang(k).target) {
    const ke = k.tuangKe + 1;
    return { k: { ...k, tuangBenar: tanpaKembar([...k.tuangBenar, k.tuangKe]), tuangKe: ke, takar: 0, tuangan: [] }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukTuang(k: KeadaanEmber): string {
  const t = targetTuang(k);
  if (k.tuangan.length === 0) return k.takar === 0 ? "Belum ada air. Pilih ukuran gelas takar dulu, lalu tekan Tuang." : "Belum ada air. Tekan Tuang untuk menuang gelas takar ke ember.";
  if (isiEmber(k) < t.target) return "Airnya belum sampai garis sasaran. Tuang lagi, atau ganti ukuran gelas.";
  return "Airnya melewati garis sasaran. Urungkan satu tuangan, lalu pilih gelas yang lebih kecil.";
}
export function kalimatTuang(k: KeadaanEmber): string {
  const t = targetTuang(k);
  if (k.tuangBenar.length > 0 && k.tuangan.length === 0 && k.takar === 0) return "Betul! Ada ember berikutnya untuk diisi.";
  return `Isi ember sampai garis sasaran ${fmt(t.target)} ml. Air sekarang ${fmt(isiEmber(k))} ml dari ${fmt(t.kapasitas)} ml. Tekan Periksa bila sudah pas.`;
}

/* ------------------------------ Susun: tumpuk lapisan kubus ------------------------------ */
export const targetSusun = (k: KeadaanEmber) => SUSUN_SIM[k.susunKe % SUSUN_SIM.length];
/** Kubus satuan tiap lapisan pada sasaran sekarang. */
export const kubusPerLapis = (k: KeadaanEmber): number => targetSusun(k).kolom * targetSusun(k).baris;
/** Volume susunan sekarang (cm³): kubus tiap lapisan dikali banyak lapisan. */
export const volumeSusun = (k: KeadaanEmber): number => kubusPerLapis(k) * k.lapis;
/** Banyak lapisan yang benar untuk sasaran sekarang, dihitung dari data. */
export const lapisBenar = (k: KeadaanEmber): number => targetSusun(k).target / kubusPerLapis(k);
export function tambahLapis(k: KeadaanEmber): { k: KeadaanEmber; ok: boolean } {
  if (k.lapis >= targetSusun(k).tinggiMaks) return { k: { ...k, tolakSusun: true }, ok: false };
  return { k: { ...k, lapis: k.lapis + 1 }, ok: true };
}
export const kurangiLapis = (k: KeadaanEmber): KeadaanEmber => (k.lapis === 0 ? k : { ...k, lapis: k.lapis - 1 });
export function periksaSusun(k: KeadaanEmber): { k: KeadaanEmber; ok: boolean } {
  if (volumeSusun(k) === targetSusun(k).target) {
    const ke = k.susunKe + 1;
    return { k: { ...k, susunBenar: tanpaKembar([...k.susunBenar, k.susunKe]), susunKe: ke, lapis: 0 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukSusun(k: KeadaanEmber): string {
  if (k.lapis === 0) return "Belum ada lapisan. Tekan Tambah lapisan untuk menumpuk kubus.";
  if (volumeSusun(k) < targetSusun(k).target) return "Volumenya belum sampai sasaran. Tambah lapisan lagi.";
  return "Volumenya melebihi sasaran. Kurangi satu lapisan.";
}
export function kalimatSusun(k: KeadaanEmber): string {
  if (k.susunBenar.length > 0 && k.lapis === 0) return "Betul! Ada bak berikutnya untuk disusun.";
  return `Tumpuk lapisan sampai volume ${fmt(targetSusun(k).target)} cm³. Sekarang ${k.lapis} lapisan, ${fmt(volumeSusun(k))} cm³. Tekan Periksa bila sudah pas.`;
}

/* ------------------------------ Tangga: ubah liter dan mililiter ------------------------------ */
export const targetTangga = (k: KeadaanEmber) => TANGGA_SIM[k.tanggaKe % TANGGA_SIM.length];
/** Indeks pilihan hasil yang benar, dihitung dari data. */
export const kunciTangga = (k: KeadaanEmber): number => targetTangga(k).pil.indexOf(hasilTangga(targetTangga(k)));
export const pilihArah = (k: KeadaanEmber, arah: ArahTangga): KeadaanEmber => ({ ...k, arah });
export function pilihHasil(k: KeadaanEmber, i: number): KeadaanEmber {
  if (i < 0 || i > 2) return k;
  return { ...k, pilih: i };
}
export function periksaTangga(k: KeadaanEmber): { k: KeadaanEmber; ok: boolean } {
  const t = targetTangga(k);
  if (k.arah === t.arah && k.pilih === kunciTangga(k)) {
    const ke = k.tanggaKe + 1;
    return { k: { ...k, tanggaBenar: tanpaKembar([...k.tanggaBenar, k.tanggaKe]), tanggaKe: ke, arah: null, pilih: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukTangga(k: KeadaanEmber): string {
  const t = targetTangga(k);
  if (k.arah === null && k.pilih < 0) return "Belum ada pilihan. Lihat satuan yang diketahui, pilih turun atau naik tangga, lalu pilih hasilnya.";
  if (k.arah === null) return "Arah tangga belum dipilih. Dari liter ke mililiter kamu menuruni tangga, dan sebaliknya kamu menaikinya.";
  if (k.arah !== t.arah) return "Arah tangga belum cocok. Dari liter ke mililiter kamu menuruni tangga, dan dari mililiter ke liter kamu menaikinya.";
  if (k.pilih < 0) return "Hasilnya belum dipilih. Kalikan atau bagi dengan seribu sesuai arah tangga.";
  return "Hasil belum cocok. Ingat satu liter sama dengan seribu mililiter, dan periksa jumlah nolnya.";
}
export function kalimatTangga(k: KeadaanEmber): string {
  if (k.tanggaBenar.length > 0 && k.arah === null && k.pilih < 0) return "Betul! Ada tangga berikutnya untuk dilalui.";
  return "Pilih turun atau naik tangga, pilih hasilnya, lalu tekan Periksa.";
}
