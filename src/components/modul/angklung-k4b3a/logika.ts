/**
 * Logika murni Simulasi Panggung Deret Kelas 4 Bab 3 Sub-Bab A "Deret Angklung Bu Ratri", awal cerita Orkestra Angklung Kampung Senandung.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-angklung-k4b3a.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Tata (tiga deret sudah ada di rak, tata deret keempat dengan menambah angklung; alat menolak memeriksa selama deret keempat masih kosong),
 * Jenis (pilih membesar atau mengecil dari tiga deret; jenis ditentukan arah perubahan, bukan besar angkanya), Tabel (atur selisih bertanda pada tabel selisih),
 * dan Lima (susun sejumlah angklung per lima).
 * Data ada di data-sim.ts.
 */
import { kataBilK4B3 } from "../eja-k4b3";
import { BANYAK_MAKS, BEDA_MAKS, LIMA_MAKS, TARGET_JENIS, TARGET_LIMA, TARGET_TABEL, TARGET_TATA, type PolaSim } from "./data-sim";

export type ModeAngklung = "tata" | "jenis" | "tabel" | "lima";

export type KeadaanAngklung = {
  alat: "angklung";
  mode: ModeAngklung;
  /** Tata: sasaran ke berapa, banyak angklung pada deret keempat, sasaran yang sudah benar. */
  tataKe: number;
  tataIsi: number;
  tataBenar: number[];
  /** Jenis: sasaran ke berapa, jenis dipilih (-1 bila belum; 0 membesar, 1 mengecil), sasaran yang sudah benar. */
  jenisKe: number;
  jenisPilih: number;
  jenisBenar: number[];
  /** Tabel: sasaran ke berapa, selisih bertanda yang diisi (0 bila belum), sasaran yang sudah benar. */
  tabelKe: number;
  tabelBeda: number;
  tabelBenar: number[];
  /** Lima: sasaran ke berapa, banyak angklung yang sudah disusun, sasaran yang sudah benar. */
  limaKe: number;
  limaIsi: number;
  limaBenar: number[];
  /** Alat sudah pernah menolak memeriksa deret keempat yang masih kosong. */
  tolak: boolean;
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalAngklung = (): KeadaanAngklung => ({
  alat: "angklung",
  mode: "tata",
  tataKe: 0,
  tataIsi: 0,
  tataBenar: [],
  jenisKe: 0,
  jenisPilih: -1,
  jenisBenar: [],
  tabelKe: 0,
  tabelBeda: 0,
  tabelBenar: [],
  limaKe: 0,
  limaIsi: 0,
  limaBenar: [],
  tolak: false,
  salah: 0,
});
export const mulaiLagiAngklung = (): KeadaanAngklung => awalAngklung();
export const pilihModeAngklung = (k: KeadaanAngklung, mode: ModeAngklung): KeadaanAngklung => ({ ...k, mode });

/* ------------------------------ Kata dan pola ------------------------------ */
/** Nama bilangan dalam kata (tanpa digit). */
export const kata = (n: number): string => kataBilK4B3(n);
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
export { besar as hurufBesar };
/** Banyak pada deret ke-n: n - 1 lompatan dari deret pertama. */
export const banyakKe = (p: PolaSim, n: number): number => p.a + (n - 1) * p.d;
/** Banyak pada deret pertama sampai ke-`jumlah`. */
export const deretKe = (p: PolaSim, jumlah: number): number[] => Array.from({ length: jumlah }, (_, i) => banyakKe(p, i + 1));
/** Jenis pola menurut selisih: positif membesar, negatif mengecil. Nomor sama dengan `jenisPilih`. */
export const nomorJenis = (d: number): number => (d > 0 ? 0 : 1);
export const NAMA_JENIS: readonly string[] = ["membesar", "mengecil"];
/** Selisih bertanda dalam teks: 3 menjadi "+3", -3 menjadi "−3". */
export const teksBeda = (d: number): string => (d > 0 ? `+${d}` : d < 0 ? `−${Math.abs(d)}` : "0");
const batas = (n: number, min: number, maks: number): number => Math.max(min, Math.min(maks, n));

/* ------------------------------ Tata deret keempat ------------------------------ */
export const targetTata = (k: KeadaanAngklung): PolaSim => TARGET_TATA[k.tataKe % TARGET_TATA.length];
/** Tambah atau kurangi angklung pada deret keempat. */
export function ubahTata(k: KeadaanAngklung, delta: number): KeadaanAngklung {
  const tataIsi = batas(k.tataIsi + delta, 0, BANYAK_MAKS);
  return tataIsi === k.tataIsi ? k : { ...k, tataIsi };
}
/** Periksa: alat menolak selama deret keempat masih kosong (itulah penolakan yang dihitung tantangan). */
export function periksaTata(k: KeadaanAngklung): { k: KeadaanAngklung; ok: boolean } {
  if (k.tataIsi === 0) return { k: { ...k, tolak: true }, ok: false };
  if (k.tataIsi === banyakKe(targetTata(k), 4)) {
    return { k: { ...k, tataBenar: k.tataBenar.includes(k.tataKe) ? k.tataBenar : [...k.tataBenar, k.tataKe], tataKe: k.tataKe + 1, tataIsi: 0 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukTata(k: KeadaanAngklung): string {
  if (k.tataIsi === 0) return "Alat menolak. Deret keempat masih kosong. Tambah angklung dulu, lalu tekan Periksa.";
  return "Banyak angklung pada deret keempat belum sesuai pola. Cari selisih dua deret yang berdekatan, lalu pakai lagi selisih itu.";
}
export function kalimatTata(k: KeadaanAngklung): string {
  if (k.tataBenar.length > 0 && k.tataIsi === 0) return "Betul! Ada rak berikutnya.";
  if (k.tataIsi === 0) return "Tiga deret sudah ada di rak. Tambah angklung untuk menata deret keempat.";
  return `Deret keempat berisi ${kata(k.tataIsi)} angklung. Tekan Periksa bila sudah sesuai pola.`;
}

/* ------------------------------ Jenis pola ------------------------------ */
export const targetJenis = (k: KeadaanAngklung): PolaSim => TARGET_JENIS[k.jenisKe % TARGET_JENIS.length];
export function pilihJenis(k: KeadaanAngklung, i: number): KeadaanAngklung {
  return i < 0 || i > 1 ? k : { ...k, jenisPilih: i };
}
export function periksaJenis(k: KeadaanAngklung): { k: KeadaanAngklung; ok: boolean } {
  if (k.jenisPilih < 0) return { k, ok: false };
  if (k.jenisPilih === nomorJenis(targetJenis(k).d)) {
    return { k: { ...k, jenisBenar: k.jenisBenar.includes(k.jenisKe) ? k.jenisBenar : [...k.jenisBenar, k.jenisKe], jenisKe: k.jenisKe + 1, jenisPilih: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukJenis(k: KeadaanAngklung): string {
  if (k.jenisPilih < 0) return "Alat menolak. Pilih satu jenis pola dulu, lalu tekan Periksa.";
  return "Lihat arah perubahannya: dari deret ke deret, banyaknya bertambah atau berkurang? Besar kecilnya angka tidak menentukan jenis pola.";
}
export function kalimatJenis(k: KeadaanAngklung): string {
  return k.jenisBenar.length > 0 && k.jenisPilih < 0 ? "Betul! Ada tiga deret berikutnya." : "Lihat tiga deret, pilih jenis pola, lalu tekan Periksa.";
}

/* ------------------------------ Tabel selisih ------------------------------ */
export const targetTabel = (k: KeadaanAngklung): PolaSim => TARGET_TABEL[k.tabelKe % TARGET_TABEL.length];
/** Naikkan atau turunkan selisih bertanda. Nol berarti selisih belum diisi. */
export function ubahBeda(k: KeadaanAngklung, delta: number): KeadaanAngklung {
  const tabelBeda = batas(k.tabelBeda + delta, -BEDA_MAKS, BEDA_MAKS);
  return tabelBeda === k.tabelBeda ? k : { ...k, tabelBeda };
}
export function periksaTabel(k: KeadaanAngklung): { k: KeadaanAngklung; ok: boolean } {
  if (k.tabelBeda === 0) return { k, ok: false };
  if (k.tabelBeda === targetTabel(k).d) {
    return { k: { ...k, tabelBenar: k.tabelBenar.includes(k.tabelKe) ? k.tabelBenar : [...k.tabelBenar, k.tabelKe], tabelKe: k.tabelKe + 1, tabelBeda: 0 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukTabel(k: KeadaanAngklung): string {
  if (k.tabelBeda === 0) return "Alat menolak. Selisih belum diisi. Atur selisih dulu, lalu tekan Periksa.";
  return "Bandingkan banyak deret kedua dengan deret pertama, lalu perhatikan arah dan tanda selisihnya.";
}
export function kalimatTabel(k: KeadaanAngklung): string {
  if (k.tabelBenar.length > 0 && k.tabelBeda === 0) return "Betul! Ada tabel berikutnya.";
  return k.tabelBeda === 0 ? "Lihat banyak tiap deret pada tabel, lalu atur selisihnya." : "Selisih sudah diisi. Tekan Periksa bila sudah yakin.";
}

/* ------------------------------ Susun per lima ------------------------------ */
export const targetLima = (k: KeadaanAngklung): number => TARGET_LIMA[k.limaKe % TARGET_LIMA.length];
/** Tambah atau kurangi angklung pada susunan. Baris lima menambah lima sekaligus. */
export function ubahLima(k: KeadaanAngklung, delta: number): KeadaanAngklung {
  const limaIsi = batas(k.limaIsi + delta, 0, LIMA_MAKS);
  return limaIsi === k.limaIsi ? k : { ...k, limaIsi };
}
export function periksaLima(k: KeadaanAngklung): { k: KeadaanAngklung; ok: boolean } {
  if (k.limaIsi === 0) return { k, ok: false };
  if (k.limaIsi === targetLima(k)) {
    return { k: { ...k, limaBenar: k.limaBenar.includes(k.limaKe) ? k.limaBenar : [...k.limaBenar, k.limaKe], limaKe: k.limaKe + 1, limaIsi: 0 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukLima(k: KeadaanAngklung): string {
  if (k.limaIsi === 0) return "Alat menolak. Belum ada angklung yang disusun. Tambah baris lima atau satu angklung dulu, lalu tekan Periksa.";
  return "Banyak angklung belum sesuai permintaan Bu Ratri. Hitung baris penuh berisi lima, lalu sisanya.";
}
export function kalimatLima(k: KeadaanAngklung): string {
  if (k.limaBenar.length > 0 && k.limaIsi === 0) return "Betul! Ada permintaan berikutnya.";
  return k.limaIsi === 0 ? "Bu Ratri meminta sejumlah angklung. Susun per lima, baris demi baris." : `Sekarang ada ${kata(k.limaIsi)} angklung. Tekan Periksa bila sudah sesuai permintaan.`;
}
