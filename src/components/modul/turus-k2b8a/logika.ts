/**
 * Logika murni Simulasi Meja Catat Kelas 2 Bab 8 Sub-Bab A "Alat Musik Pak Hendra" (diagram turus), awal cerita Pentas Seni Sekolah.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-turus-k2b8a.mjs. Eksplorasi bebas tanpa skor.
 * Lima alat: Pilah (memilah benda panggung ke baris jenisnya), Turus (menulis satu garis untuk satu benda, bundel lima terbentuk sendiri), Tabel (melengkapi banyaknya tiap jenis),
 * Baca (memilih jenis paling banyak dan lebihnya, membandingkan dua jenis) dan Data (mengumpulkan data sendiri dengan satu garis per jawaban). Banyak benda ada di data-peta.ts.
 */
import { BENDA_SIM, JAWABAN_DATA, PILIHAN_LEBIH, WARNA_DATA } from "./data-peta";

export type ModeCatat = "pilah" | "turus" | "tabel" | "baca" | "data";

export type KeadaanCatat = {
  alat: "catat";
  mode: ModeCatat;
  /** Letak tiap benda di tumpukan (urut campur aduk): -1 masih di tumpukan, atau nomor baris jenisnya. */
  letak: number[];
  /** Benda yang sedang dipilih untuk dipindah (-1 bila tidak ada). */
  pilih: number;
  pilahSelesai: boolean;
  /** Jenis yang dipilih untuk menulis turus, garis yang sudah ditulis tiap jenis, dan jenis yang turusnya sudah tepat. */
  jenis: number;
  turus: number[];
  turusBenar: number[];
  /** Banyaknya tiap jenis di tabel (anak mengisi) dan tabel yang sudah benar semua. */
  tabel: number[];
  tabelBenar: boolean;
  /** Jenis paling banyak yang dipilih (-1 bila belum), lebihnya yang dipilih (-1 bila belum), dan hasil periksa membaca. */
  bacaMax: number;
  bacaLebih: number;
  bacaBenar: boolean;
  /** Dua jenis yang dibandingkan (nomor jenis) dan sudah menemukan dua jenis yang sama banyak. */
  banding: number[];
  samaTemu: boolean;
  /** Mengumpulkan data sendiri: jawaban ke berapa yang sedang dicatat, garis tiap warna, dan data sudah selesai dicatat. */
  dataKe: number;
  dataGaris: number[];
  dataSelesai: boolean;
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

/** Jenis tiap benda pada tumpukan campur aduk (urutan tetap, bukan acak sungguhan). */
const URUT_JENIS = BENDA_SIM.flatMap((b, j) => Array.from({ length: b.banyak }, () => j));
export const JENIS_BENDA: readonly number[] = URUT_JENIS.map((_, i) => URUT_JENIS[(i * 7) % URUT_JENIS.length]);
export const TOTAL_BENDA = JENIS_BENDA.length;

export const awalCatat = (): KeadaanCatat => ({
  alat: "catat",
  mode: "pilah",
  letak: JENIS_BENDA.map(() => -1),
  pilih: -1,
  pilahSelesai: false,
  jenis: 0,
  turus: BENDA_SIM.map(() => 0),
  turusBenar: [],
  tabel: BENDA_SIM.map(() => 0),
  tabelBenar: false,
  bacaMax: -1,
  bacaLebih: -1,
  bacaBenar: false,
  banding: [],
  samaTemu: false,
  dataKe: 0,
  dataGaris: WARNA_DATA.map(() => 0),
  dataSelesai: false,
  salah: 0,
});
export const mulaiLagiCatat = (): KeadaanCatat => awalCatat();

/* ------------------------------ Kata (tanpa digit) ------------------------------ */
const SAT = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"] as const;
/** Nama bilangan 0 sampai 99 dalam kata. */
export function kata(n: number): string {
  if (n < 10) return SAT[n] ?? String(n);
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SAT[n - 10]} belas`;
  const p = Math.floor(n / 10);
  const s = n % 10;
  return s === 0 ? `${SAT[p]} puluh` : `${SAT[p]} puluh ${SAT[s]}`;
}
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
export { besar as hurufBesar };

export const pilihModeCatat = (k: KeadaanCatat, mode: ModeCatat): KeadaanCatat => ({ ...k, mode, pilih: -1 });
export const banyakJenis = (j: number): number => BENDA_SIM[j].banyak;
export const jenisTerbanyak = (): number => BENDA_SIM.reduce((b, x, i) => (x.banyak > BENDA_SIM[b].banyak ? i : b), 0);
export const jenisTersedikit = (): number => BENDA_SIM.reduce((b, x, i) => (x.banyak < BENDA_SIM[b].banyak ? i : b), 0);
export const lebihnya = (): number => banyakJenis(jenisTerbanyak()) - banyakJenis(jenisTersedikit());

/* ------------------------------ Pilah ------------------------------ */
/** Banyak benda jenis j yang sudah di barisnya. */
export const dibaris = (k: KeadaanCatat, j: number): number => k.letak.filter((b, i) => b === j && JENIS_BENDA[i] === j).length;
export const sisaTumpukan = (k: KeadaanCatat): number => k.letak.filter((b) => b < 0).length;
/** Pilih satu benda di tumpukan untuk dipindah. Benda yang sudah di baris tidak bisa dipilih. */
export function pilihBenda(k: KeadaanCatat, i: number): { k: KeadaanCatat; ok: boolean } {
  if (i < 0 || i >= TOTAL_BENDA || k.letak[i] >= 0) return { k, ok: false };
  return { k: { ...k, pilih: k.pilih === i ? -1 : i }, ok: true };
}
/** Taruh benda terpilih di baris jenis `baris`. Salah baris menambah hitungan percobaan keliru. */
export function taruhBenda(k: KeadaanCatat, baris: number): { k: KeadaanCatat; ok: boolean; alasan: "tepat" | "keliru" | "belum" } {
  if (k.pilih < 0) return { k, ok: false, alasan: "belum" };
  if (JENIS_BENDA[k.pilih] !== baris) return { k: { ...k, salah: k.salah + 1 }, ok: false, alasan: "keliru" };
  const letak = k.letak.map((b, i) => (i === k.pilih ? baris : b));
  const selesai = letak.every((b) => b >= 0);
  return { k: { ...k, letak, pilih: -1, pilahSelesai: k.pilahSelesai || selesai }, ok: true, alasan: "tepat" };
}
export function kalimatPilah(k: KeadaanCatat): string {
  const sisa = sisaTumpukan(k);
  if (sisa === TOTAL_BENDA) return "Ketuk satu benda di tumpukan, lalu ketuk baris jenisnya.";
  if (sisa === 0) return "Semua benda sudah terpilah. Satu jenis satu baris!";
  return k.pilih >= 0 ? `Sekarang ketuk baris untuk ${BENDA_SIM[JENIS_BENDA[k.pilih]].nama}.` : `Masih ada ${kata(sisa)} benda di tumpukan. Ketuk benda berikutnya.`;
}
export function petunjukPilah(k: KeadaanCatat): string {
  if (k.pilih < 0) return "Ketuk satu benda di tumpukan dulu.";
  return `Benda itu bukan jenis baris tersebut. Lihat gambarnya, itu ${BENDA_SIM[JENIS_BENDA[k.pilih]].nama}. Ketuk baris ${BENDA_SIM[JENIS_BENDA[k.pilih]].nama}.`;
}

/* ------------------------------ Turus ------------------------------ */
export const bundelDi = (n: number): number => Math.floor(n / 5);
export const sisaGaris = (n: number): number => n % 5;
export function pilihJenisTurus(k: KeadaanCatat, j: number): KeadaanCatat {
  return j < 0 || j >= BENDA_SIM.length ? k : { ...k, jenis: j };
}
/** Tambah satu garis (arah 1) atau hapus satu garis (arah -1) pada jenis yang dipilih. Paling banyak sepuluh garis tiap jenis. */
export function ubahTurus(k: KeadaanCatat, arah: 1 | -1): { k: KeadaanCatat; ok: boolean } {
  const j = k.jenis;
  const baru = k.turus[j] + arah;
  if (baru < 0 || baru > 10) return { k, ok: false };
  return { k: { ...k, turus: k.turus.map((n, i) => (i === j ? baru : n)), turusBenar: k.turusBenar.filter((x) => x !== j) }, ok: true };
}
/** Periksa turus jenis terpilih: sama dengan banyak bendanya? */
export function periksaTurus(k: KeadaanCatat): { k: KeadaanCatat; ok: boolean } {
  const j = k.jenis;
  if (k.turus[j] === banyakJenis(j)) return { k: k.turusBenar.includes(j) ? k : { ...k, turusBenar: [...k.turusBenar, j] }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukTurus(k: KeadaanCatat): string {
  const j = k.jenis;
  const n = BENDA_SIM[j].nama;
  return k.turus[j] < banyakJenis(j) ? `Garisnya masih kurang. Satu garis untuk satu ${n}, jadi hitung ${n} di alat Pilah dulu.` : `Garisnya sudah terlalu banyak. Satu garis untuk satu ${n}, tidak lebih.`;
}
export function kalimatTurus(k: KeadaanCatat): string {
  const j = k.jenis;
  const n = k.turus[j];
  const nama = BENDA_SIM[j].nama;
  if (n === 0) return `Tulis satu garis untuk satu ${nama}. Ketuk Tambah garis.`;
  if (n < 5) return `${besar(kata(n))} garis untuk ${nama}.`;
  return `${besar(kata(bundelDi(n)))} bundel lima${sisaGaris(n) > 0 ? ` dan ${kata(sisaGaris(n))} garis` : ""}, jadi ${kata(n)} garis untuk ${nama}.`;
}

/* ------------------------------ Tabel ------------------------------ */
export function ubahTabel(k: KeadaanCatat, j: number, arah: 1 | -1): { k: KeadaanCatat; ok: boolean } {
  if (j < 0 || j >= BENDA_SIM.length) return { k, ok: false };
  const baru = k.tabel[j] + arah;
  if (baru < 0 || baru > 9) return { k, ok: false };
  return { k: { ...k, tabel: k.tabel.map((n, i) => (i === j ? baru : n)), tabelBenar: false }, ok: true };
}
export function periksaTabel(k: KeadaanCatat): { k: KeadaanCatat; ok: boolean } {
  if (BENDA_SIM.every((b, j) => k.tabel[j] === b.banyak)) return { k: { ...k, tabelBenar: true }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukTabel(k: KeadaanCatat): string {
  const j = BENDA_SIM.findIndex((b, i) => k.tabel[i] !== b.banyak);
  return j < 0 ? "" : `Banyaknya ${BENDA_SIM[j].nama} belum tepat. Hitung ${BENDA_SIM[j].nama} yang sudah terpilah, atau hitung turusnya.`;
}
export function kalimatTabel(k: KeadaanCatat): string {
  return k.tabelBenar ? "Tabel turus lengkap dan benar!" : "Atur banyaknya tiap jenis di kolom banyaknya, lalu ketuk Periksa.";
}

/* ------------------------------ Baca ------------------------------ */
export const pilihanLebih = (): readonly number[] => PILIHAN_LEBIH;
export function pilihMax(k: KeadaanCatat, j: number): KeadaanCatat {
  return j < 0 || j >= BENDA_SIM.length ? k : { ...k, bacaMax: j, bacaBenar: false };
}
export function pilihLebih(k: KeadaanCatat, n: number): KeadaanCatat {
  return PILIHAN_LEBIH.includes(n) ? { ...k, bacaLebih: n, bacaBenar: false } : k;
}
export function periksaBaca(k: KeadaanCatat): { k: KeadaanCatat; ok: boolean } {
  if (k.bacaMax === jenisTerbanyak() && k.bacaLebih === lebihnya()) return { k: { ...k, bacaBenar: true }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukBaca(k: KeadaanCatat): string {
  if (k.bacaMax < 0 || k.bacaLebih < 0) return "Pilih jenis yang paling banyak dan lebihnya dulu.";
  if (k.bacaMax !== jenisTerbanyak()) return "Jenis itu belum yang paling banyak. Cari jenis dengan turus yang paling panjang.";
  return "Lebihnya belum tepat. Kurangi banyak jenis yang paling banyak dengan banyak jenis yang paling sedikit.";
}
/** Bandingkan dua jenis: ketuk dua jenis berbeda. Ketukan ketiga mulai pasangan baru. */
export function pilihBanding(k: KeadaanCatat, j: number): KeadaanCatat {
  if (j < 0 || j >= BENDA_SIM.length) return k;
  const b = k.banding.length >= 2 ? [j] : k.banding.includes(j) ? k.banding : [...k.banding, j];
  const sama = b.length === 2 && banyakJenis(b[0]) === banyakJenis(b[1]);
  return { ...k, banding: b, samaTemu: k.samaTemu || sama };
}
export function kalimatBanding(k: KeadaanCatat): string {
  if (k.banding.length < 2) return "Ketuk dua jenis untuk dibandingkan.";
  const [a, b] = k.banding;
  const na = BENDA_SIM[a].nama;
  const nb = BENDA_SIM[b].nama;
  const d = banyakJenis(a) - banyakJenis(b);
  if (d === 0) return `${besar(na)} dan ${nb} sama banyak, yaitu ${kata(banyakJenis(a))}.`;
  return d > 0 ? `${besar(na)} ${kata(d)} lebihnya dari ${nb}, dan ${nb} ${kata(d)} kurangnya dari ${na}.` : `${besar(na)} ${kata(-d)} kurangnya dari ${nb}, dan ${nb} ${kata(-d)} lebihnya dari ${na}.`;
}
export function kalimatBaca(k: KeadaanCatat): string {
  if (k.bacaBenar) return `Betul! ${besar(BENDA_SIM[jenisTerbanyak()].nama)} paling banyak, ${kata(lebihnya())} lebihnya dari ${BENDA_SIM[jenisTersedikit()].nama}.`;
  return "Pilih jenis yang paling banyak, lalu lebihnya dari jenis yang paling sedikit.";
}

/* ------------------------------ Data sendiri ------------------------------ */
export const jawabanKe = (k: KeadaanCatat): number => (k.dataKe < JAWABAN_DATA.length ? JAWABAN_DATA[k.dataKe] : -1);
/** Catat jawaban anak sekarang di baris warna `baris`: satu garis per jawaban. */
export function catatJawaban(k: KeadaanCatat, baris: number): { k: KeadaanCatat; ok: boolean } {
  if (k.dataSelesai || k.dataKe >= JAWABAN_DATA.length) return { k, ok: false };
  if (baris !== JAWABAN_DATA[k.dataKe]) return { k: { ...k, salah: k.salah + 1 }, ok: false };
  const dataGaris = k.dataGaris.map((n, i) => (i === baris ? n + 1 : n));
  const dataKe = k.dataKe + 1;
  return { k: { ...k, dataGaris, dataKe, dataSelesai: dataKe >= JAWABAN_DATA.length }, ok: true };
}
export function kalimatData(k: KeadaanCatat): string {
  if (k.dataSelesai) {
    const maks = k.dataGaris.reduce((b, n, i) => (n > k.dataGaris[b] ? i : b), 0);
    return `Semua jawaban tercatat. ${besar(WARNA_DATA[maks].nama)} paling banyak dipilih, yaitu ${kata(k.dataGaris[maks])} anak.`;
  }
  return `Anak nomor ${kata(k.dataKe + 1)} menjawab ${WARNA_DATA[jawabanKe(k)].nama}. Tulis satu garis di baris yang tepat.`;
}
export function petunjukData(k: KeadaanCatat): string {
  return `Jawaban anak ini ${WARNA_DATA[jawabanKe(k)].nama}. Tulis garisnya di baris ${WARNA_DATA[jawabanKe(k)].nama}.`;
}
