/**
 * Logika murni Simulasi Papan Pameran Kelas 4 Bab 2 Sub-Bab E "Papan Pameran Bu Tuti", akhir cerita Sanggar Batik Kampung Mekar.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-pameran-k4b2e.mjs. Eksplorasi bebas tanpa skor.
 * Tiga alat: Kisi (warnai kotak pada kisi seratus sebanyak persen sasaran), Geser (geser koma dua tempat untuk desimal ke persen dan persen ke desimal;
 * alat menolak menempel tanda persen sebelum koma sampai di ujung kanan), dan Baca (kisi sudah berwarna; pilih persen dan desimalnya). Data ada di data-sim.ts.
 * Tipe KeadaanPameran (alat: "pameran") dipakai misi-k4bab2.ts dan harus tetap diekspor.
 */
import { BACA_SIM, GESER_SIM, KISI_SIM } from "./data-sim";
import { desimalDari } from "./logika-cpa";

export type ModePameran = "kisi" | "geser" | "baca";

export type KeadaanPameran = {
  alat: "pameran";
  mode: ModePameran;
  /** Kisi: sasaran ke berapa, nomor kotak (0 sampai 99) yang diwarnai, sasaran yang sudah benar. */
  kisiKe: number;
  kisiWarna: number[];
  kisiBenar: number[];
  /** Geser: sasaran ke berapa, letak koma (dari kiri, paling kanan di belakang angka terakhir), tanda persen menempel, sasaran kanan dan kiri yang sudah benar. */
  geserKe: number;
  koma: number;
  persen: boolean;
  geserBenar: number[];
  balikBenar: number[];
  /** Baca: sasaran ke berapa, pilihan persen dan desimal (-1 belum memilih), sasaran yang sudah benar. */
  bacaKe: number;
  bacaPersen: number;
  bacaDesimal: number;
  bacaBenar: number[];
  /** Pernah ditolak alat (menempel tanda persen sebelum koma sampai di ujung kanan). */
  tolak: boolean;
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

/** Angka alat Geser untuk `p` persen: nol di depan lalu angka persen (9 menjadi "009", 215 menjadi "0215"). */
const angkaDari = (p: number): string => `0${p >= 100 ? p : String(p).padStart(2, "0")}`;
/**
 * Letak awal koma dan tanda persen untuk sasaran geser: kanan mulai dari desimal (koma dua tempat sebelum ujung kanan), kiri mulai dari persen (koma di ujung kanan, tanda persen menempel).
 * Untuk persen di bawah seratus angkanya tiga (koma 1 atau 3), untuk seratus persen atau lebih angkanya empat (koma 2 atau 4).
 */
const awalGeser = (i: number): { koma: number; persen: boolean } => {
  const t = GESER_SIM[i % GESER_SIM.length];
  const n = angkaDari(t.p).length;
  return t.arah === "kanan" ? { koma: n - 2, persen: false } : { koma: n, persen: true };
};

export const awalPameran = (): KeadaanPameran => ({
  alat: "pameran",
  mode: "kisi",
  kisiKe: 0,
  kisiWarna: [],
  kisiBenar: [],
  geserKe: 0,
  ...awalGeser(0),
  geserBenar: [],
  balikBenar: [],
  bacaKe: 0,
  bacaPersen: -1,
  bacaDesimal: -1,
  bacaBenar: [],
  tolak: false,
  salah: 0,
});
export const mulaiLagiPameran = (): KeadaanPameran => awalPameran();

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
export const pilihModePameran = (k: KeadaanPameran, mode: ModePameran): KeadaanPameran => ({ ...k, mode });

const tanpaKembar = (xs: number[]): number[] => xs.filter((x, i) => xs.indexOf(x) === i);

/* ------------------------------ Kisi: warnai sampai persen sasaran ------------------------------ */
export const targetKisi = (k: KeadaanPameran) => KISI_SIM[k.kisiKe % KISI_SIM.length];
/** Banyak kotak yang sedang berwarna. */
export const banyakWarna = (k: KeadaanPameran): number => k.kisiWarna.length;
/** Warnai atau lepas warna satu kotak (0 sampai 99). Nomor di luar kisi ditolak. */
export function warnaiKotak(k: KeadaanPameran, i: number): { k: KeadaanPameran; ok: boolean } {
  if (!Number.isInteger(i) || i < 0 || i > 99) return { k, ok: false };
  return { k: { ...k, kisiWarna: k.kisiWarna.includes(i) ? k.kisiWarna.filter((x) => x !== i) : [...k.kisiWarna, i] }, ok: true };
}
/** Warnai satu baris penuh (sepuluh kotak), atau lepas warnanya bila baris itu sudah penuh berwarna. Baris 0 sampai 9. */
export function warnaiBaris(k: KeadaanPameran, r: number): { k: KeadaanPameran; ok: boolean } {
  if (!Number.isInteger(r) || r < 0 || r > 9) return { k, ok: false };
  const baris = Array.from({ length: 10 }, (_, c) => r * 10 + c);
  const penuh = baris.every((i) => k.kisiWarna.includes(i));
  return { k: { ...k, kisiWarna: penuh ? k.kisiWarna.filter((i) => !baris.includes(i)) : tanpaKembar([...k.kisiWarna, ...baris]) }, ok: true };
}
export const hapusKisi = (k: KeadaanPameran): KeadaanPameran => ({ ...k, kisiWarna: [] });
export function periksaKisi(k: KeadaanPameran): { k: KeadaanPameran; ok: boolean } {
  if (banyakWarna(k) === targetKisi(k).p) return { k: { ...k, kisiBenar: tanpaKembar([...k.kisiBenar, k.kisiKe]), kisiKe: k.kisiKe + 1, kisiWarna: [] }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukKisi(k: KeadaanPameran): string {
  if (banyakWarna(k) === 0) return "Belum ada kotak yang diwarnai. Ketuk kotak, atau ketuk nomor baris untuk mewarnai satu baris penuh.";
  return banyakWarna(k) < targetKisi(k).p ? "Kotak yang diwarnai masih kurang dari sasaran. Persen berarti per seratus kotak, jadi hitung lagi." : "Kotak yang diwarnai sudah lebih dari sasaran. Persen berarti per seratus kotak, jadi lepas beberapa warna.";
}
export function kalimatKisi(k: KeadaanPameran): string {
  return k.kisiBenar.length > 0 && k.kisiWarna.length === 0 ? "Betul! Ada sasaran persen berikutnya." : "Warnai kotak sampai sebanyak persen sasaran, lalu tekan Periksa.";
}

/* ------------------------------ Geser: desimal dan persen ------------------------------ */
export const targetGeser = (k: KeadaanPameran) => GESER_SIM[k.geserKe % GESER_SIM.length];
/** Angka bilangan: nol di depan lalu dua angka perseratus (p = 9 menjadi "009"), atau empat angka untuk seratus persen atau lebih (p = 215 menjadi "0215"). */
export const angkaGeser = (k: KeadaanPameran): string => angkaDari(targetGeser(k).p);
/** Tampilan bilangan di alat: koma pada letaknya, nol di depan dibuang, tanda persen bila menempel. */
export function tampilGeser(k: KeadaanPameran): string {
  const a = angkaGeser(k);
  const kiri = a.slice(0, k.koma).replace(/^0+(?=\d)/, "") || "0";
  const kanan = a.slice(k.koma);
  return `${kanan ? `${kiri},${kanan}` : kiri}${k.persen ? "%" : ""}`;
}
/** Geser koma satu tempat ke kanan (delta 1) atau ke kiri (delta -1). Di ujung ditolak tanpa dihitung keliru. */
export function geserKoma(k: KeadaanPameran, delta: 1 | -1): { k: KeadaanPameran; ok: boolean } {
  const baru = k.koma + delta;
  if (baru < 0 || baru > angkaGeser(k).length) return { k, ok: false };
  return { k: { ...k, koma: baru }, ok: true };
}
/** Tombol tanda persen: melepas tanda yang menempel, atau menempel. Menempel ditolak (tolak = true, bukan percobaan keliru) bila koma belum sampai di ujung kanan. */
export function tandaPersen(k: KeadaanPameran): { k: KeadaanPameran; ok: boolean } {
  if (k.persen) return { k: { ...k, persen: false }, ok: true };
  if (k.koma !== angkaGeser(k).length) return { k: { ...k, tolak: true }, ok: false };
  return { k: { ...k, persen: true }, ok: true };
}
export function periksaGeser(k: KeadaanPameran): { k: KeadaanPameran; ok: boolean } {
  const t = targetGeser(k);
  const n = angkaGeser(k).length;
  const betul = t.arah === "kanan" ? k.koma === n && k.persen : k.koma === n - 2 && !k.persen;
  if (!betul) return { k: { ...k, salah: k.salah + 1 }, ok: false };
  const ke = k.geserKe + 1;
  const baru = awalGeser(ke);
  return {
    k: {
      ...k,
      geserBenar: t.arah === "kanan" ? tanpaKembar([...k.geserBenar, k.geserKe]) : k.geserBenar,
      balikBenar: t.arah === "kiri" ? tanpaKembar([...k.balikBenar, k.geserKe]) : k.balikBenar,
      geserKe: ke,
      koma: baru.koma,
      persen: baru.persen,
    },
    ok: true,
  };
}
export function petunjukGeser(k: KeadaanPameran): string {
  const t = targetGeser(k);
  const awal = awalGeser(k.geserKe);
  const n = angkaGeser(k).length;
  if (t.arah === "kanan") {
    if (k.koma === awal.koma && !k.persen) return "Belum ada geseran. Geser koma ke kanan dulu, lalu tempel tanda persen.";
    if (k.koma < n) return "Koma belum sampai di tempat yang tepat. Geser lagi ke kanan sampai tidak ada angka di belakang koma.";
    return "Tanda persen belum menempel. Tekan tombol tanda persen setelah koma digeser.";
  }
  if (k.persen) return "Tanda persen masih menempel. Lepas tanda persen dulu, lalu geser koma ke kiri.";
  if (k.koma === awal.koma) return "Koma belum digeser. Geser koma ke kiri sampai tinggal dua angka di belakang koma.";
  if (k.koma > n - 2) return "Koma belum sampai di tempat yang tepat. Geser lagi ke kiri.";
  return "Koma sudah terlalu jauh ke kiri. Geser kembali ke kanan sedikit.";
}
export function kalimatGeser(k: KeadaanPameran): string {
  if ((k.geserBenar.length > 0 || k.balikBenar.length > 0) && k.koma === awalGeser(k.geserKe).koma && k.persen === awalGeser(k.geserKe).persen) return "Betul! Ada bilangan berikutnya di alat Geser.";
  return targetGeser(k).arah === "kanan" ? "Ubah desimal menjadi persen: geser koma, tempel tanda persen, lalu tekan Periksa." : "Ubah persen menjadi desimal: lepas tanda persen, geser koma, lalu tekan Periksa.";
}

/* ------------------------------ Baca: persen dan desimal dari kisi ------------------------------ */
export const targetBaca = (k: KeadaanPameran) => BACA_SIM[k.bacaKe % BACA_SIM.length];
/** Indeks pilihan persen dan pilihan desimal yang benar, dihitung dari banyak kotak berwarna. */
export const kunciBaca = (k: KeadaanPameran): { persen: number; desimal: number } => {
  const t = targetBaca(k);
  return { persen: t.persen.indexOf(`${t.p}%`), desimal: t.desimal.indexOf(desimalDari(t.p)) };
};
export function pilihBaca(k: KeadaanPameran, jenis: "persen" | "desimal", i: number): KeadaanPameran {
  if (i < 0 || i > 2) return k;
  return jenis === "persen" ? { ...k, bacaPersen: i } : { ...k, bacaDesimal: i };
}
export function periksaBaca(k: KeadaanPameran): { k: KeadaanPameran; ok: boolean } {
  const kunci = kunciBaca(k);
  if (k.bacaPersen === kunci.persen && k.bacaDesimal === kunci.desimal) return { k: { ...k, bacaBenar: tanpaKembar([...k.bacaBenar, k.bacaKe]), bacaKe: k.bacaKe + 1, bacaPersen: -1, bacaDesimal: -1 }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukBaca(k: KeadaanPameran): string {
  if (k.bacaPersen < 0 && k.bacaDesimal < 0) return "Belum ada pilihan. Hitung kotak berwarna pada kisi, lalu pilih persen dan desimalnya.";
  if (k.bacaPersen < 0) return "Persen belum dipilih. Banyak kotak berwarna dari seratus kotak adalah persennya.";
  if (k.bacaDesimal < 0) return "Desimal belum dipilih. Persen sama dengan per seratus, jadi desimalnya punya dua angka di belakang koma.";
  if (targetBaca(k).peny) return "Salah satu pilihan belum cocok dengan kisi. Kisi ini bukan seratus kotak, jadi samakan dulu penyebutnya menjadi seratus, lalu periksa letak koma pada desimal.";
  return "Salah satu pilihan belum cocok dengan kisi. Hitung lagi kotak berwarna, lalu periksa letak koma pada desimal.";
}
export function kalimatBaca(k: KeadaanPameran): string {
  return k.bacaBenar.length > 0 && k.bacaPersen < 0 && k.bacaDesimal < 0 ? "Betul! Ada kisi berikutnya untuk dibaca." : "Hitung kotak berwarna, pilih persen dan desimalnya, lalu tekan Periksa.";
}
