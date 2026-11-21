/**
 * Logika murni Simulasi Dua Lonceng Kelas 5 Bab 2 Sub-Bab B "Dua Lonceng Pak Tarno" (tema Pasar Kuliner Malam).
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-jadwal-k5b2b.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Daftar (lingkari bilangan yang ada di dua daftar kelipatan; alat menolak bilangan yang tidak ada di kedua daftar),
 * KPK (atur kelipatan bilangan pertama sampai kelipatan bilangan kedua yang terkecil; alat menolak Periksa bila bilangan itu bukan kelipatan bilangan kedua),
 * Jadwal (majukan waktu; alat menolak "Bersama" bila belum kedua lonceng berbunyi) dan Tiga (pilih KPK tiga bilangan; alat menolak bilangan yang bukan kelipatan ketiganya).
 * Data ada di data-sim.ts. Tipe KeadaanJadwal (alat: "jadwal") dipakai misi-k5bab2.ts dan harus tetap diekspor.
 */
import { DAFTAR_SIM, JADWAL_SIM, KPK_SIM, TIGA_SIM, WAKTU_MAKS } from "./data-sim";
import { kelipatan, kelipatanPersekutuan, kpk, persekutuan } from "./logika-data";

export type ModeJadwal = "daftar" | "kpk" | "jadwal" | "tiga";

export type KeadaanJadwal = {
  alat: "jadwal";
  mode: ModeJadwal;
  /** Daftar: sasaran ke berapa, bilangan yang sudah dilingkari, pernah ditolak (melingkari bilangan yang tidak ada di kedua daftar), sasaran yang sudah benar. */
  daftarKe: number;
  lingkar: number[];
  tolakDaftar: boolean;
  daftarBenar: number[];
  /** KPK: sasaran ke berapa, kelipatan ke berapa dari bilangan pertama (1 sampai 9), pernah ditolak, sasaran yang sudah benar. */
  kpkKe: number;
  kaliKpk: number;
  tolakKpk: boolean;
  kpkBenar: number[];
  /** Jadwal: sasaran ke berapa, waktu sekarang, pernah ditolak ("Bersama" sebelum kedua lonceng bunyi), sasaran yang sudah benar. */
  jadwalKe: number;
  waktu: number;
  tolakJadwal: boolean;
  jadwalBenar: number[];
  /** Tiga: sasaran ke berapa, indeks bilangan terpilih (-1 belum), pernah ditolak, sasaran yang sudah benar. */
  tigaKe: number;
  tigaPilih: number;
  tolakTiga: boolean;
  tigaBenar: number[];
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalJadwal = (): KeadaanJadwal => ({
  alat: "jadwal",
  mode: "daftar",
  daftarKe: 0,
  lingkar: [],
  tolakDaftar: false,
  daftarBenar: [],
  kpkKe: 0,
  kaliKpk: 1,
  tolakKpk: false,
  kpkBenar: [],
  jadwalKe: 0,
  waktu: 0,
  tolakJadwal: false,
  jadwalBenar: [],
  tigaKe: 0,
  tigaPilih: -1,
  tolakTiga: false,
  tigaBenar: [],
  salah: 0,
});
export const mulaiLagiJadwal = (): KeadaanJadwal => awalJadwal();
export const pilihModeJadwal = (k: KeadaanJadwal, mode: ModeJadwal): KeadaanJadwal => ({ ...k, mode });
const tanpaKembar = (xs: number[]): number[] => xs.filter((x, i) => xs.indexOf(x) === i);

/* ------------------------------ Daftar: lingkari yang sama ------------------------------ */
export const targetDaftar = (k: KeadaanJadwal) => DAFTAR_SIM[k.daftarKe % DAFTAR_SIM.length];
/** Bilangan yang ada di kedua daftar pada sasaran sekarang (dihitung dari daftar kelipatan). */
export const umumDaftar = (k: KeadaanJadwal): number[] => {
  const t = targetDaftar(k);
  return persekutuan([t.a, t.b], t.w);
};
/** Ketuk satu bilangan: ditolak (dicatat `tolakDaftar`, bukan percobaan keliru) bila bilangan itu tidak ada di kedua daftar; ketuk lagi untuk melepas lingkaran. */
export function lingkari(k: KeadaanJadwal, n: number): { k: KeadaanJadwal; ok: boolean } {
  const t = targetDaftar(k);
  const ada = kelipatan(t.a, t.w).includes(n) || kelipatan(t.b, t.w).includes(n);
  if (!ada) return { k, ok: false };
  if (!umumDaftar(k).includes(n)) return { k: { ...k, tolakDaftar: true }, ok: false };
  return { k: { ...k, lingkar: k.lingkar.includes(n) ? k.lingkar.filter((x) => x !== n) : [...k.lingkar, n].sort((p, q) => p - q) }, ok: true };
}
export function periksaDaftar(k: KeadaanJadwal): { k: KeadaanJadwal; ok: boolean } {
  const umum = umumDaftar(k);
  if (k.lingkar.length === umum.length && umum.every((n) => k.lingkar.includes(n))) {
    return { k: { ...k, daftarBenar: tanpaKembar([...k.daftarBenar, k.daftarKe % DAFTAR_SIM.length]), daftarKe: k.daftarKe + 1, lingkar: [] }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukDaftar(k: KeadaanJadwal): string {
  if (k.lingkar.length === 0) return "Belum ada bilangan yang dilingkari. Cari bilangan yang muncul di daftar pertama dan juga di daftar kedua.";
  return "Masih ada bilangan yang sama di kedua daftar yang belum dilingkari. Periksa lagi kedua daftar sampai ujungnya.";
}
export const kalimatDaftar = (k: KeadaanJadwal): string =>
  k.daftarBenar.length > 0 && k.lingkar.length === 0 ? "Betul! Ada pasangan daftar berikutnya untuk dicari bilangan yang sama." : "Lingkari bilangan yang ada di kedua daftar, lalu tekan Periksa.";

/* ------------------------------ KPK: atur kelipatan ------------------------------ */
export const targetKpk = (k: KeadaanJadwal) => KPK_SIM[k.kpkKe % KPK_SIM.length];
export const nilaiKpk = (k: KeadaanJadwal): number => k.kaliKpk * targetKpk(k).a;
export const kunciKpk = (k: KeadaanJadwal): number => {
  const t = targetKpk(k);
  return kpk([t.a, t.b]);
};
export const ubahKali = (k: KeadaanJadwal, selisih: number): KeadaanJadwal => ({ ...k, kaliKpk: Math.max(1, Math.min(9, k.kaliKpk + selisih)) });
/** Periksa KPK. Ditolak (tanpa dihitung keliru, mencatat `tolakKpk`) bila bilangan itu bukan kelipatan bilangan kedua. */
export function periksaKpk(k: KeadaanJadwal): { k: KeadaanJadwal; ok: boolean; ditolak?: boolean } {
  const t = targetKpk(k);
  const n = nilaiKpk(k);
  if (!kelipatanPersekutuan([t.a, t.b], n)) return { k: { ...k, tolakKpk: true }, ok: false, ditolak: true };
  if (n === kunciKpk(k)) return { k: { ...k, kpkBenar: tanpaKembar([...k.kpkBenar, k.kpkKe % KPK_SIM.length]), kpkKe: k.kpkKe + 1, kaliKpk: 1 }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukKpk(k: KeadaanJadwal): string {
  const t = targetKpk(k);
  if (kelipatanPersekutuan([t.a, t.b], nilaiKpk(k))) return "Bilangan itu memang kelipatan persekutuan, tetapi masih ada yang lebih kecil. Cari kelipatan pertama yang cocok.";
  return "Bilangan itu belum kelipatan bilangan kedua. Ubah kelipatannya sampai cocok dengan kedua bilangan.";
}
export const kalimatKpk = (k: KeadaanJadwal): string =>
  k.kpkBenar.length > 0 && k.kaliKpk === 1 ? "Betul! Ada pasangan bilangan berikutnya untuk dicari KPK-nya." : "Ubah kelipatannya sampai cocok dengan kedua bilangan dan yang terkecil, lalu tekan Periksa.";

/* ------------------------------ Jadwal: majukan waktu ------------------------------ */
export const targetJadwal = (k: KeadaanJadwal) => JADWAL_SIM[k.jadwalKe % JADWAL_SIM.length];
export const bunyiJadwal = (k: KeadaanJadwal): { a: boolean; b: boolean } => {
  const t = targetJadwal(k);
  return { a: k.waktu > 0 && k.waktu % t.a === 0, b: k.waktu > 0 && k.waktu % t.b === 0 };
};
export const kunciJadwal = (k: KeadaanJadwal): number => {
  const t = targetJadwal(k);
  return kpk([t.a, t.b]);
};
export const majukan = (k: KeadaanJadwal): KeadaanJadwal => (k.waktu >= WAKTU_MAKS ? k : { ...k, waktu: k.waktu + 1 });
export const ulangWaktu = (k: KeadaanJadwal): KeadaanJadwal => ({ ...k, waktu: 0 });
/** Tekan "Bersama": ditolak (mencatat `tolakJadwal`, bukan percobaan keliru) bila belum kedua lonceng berbunyi pada waktu itu. */
export function tekanBersama(k: KeadaanJadwal): { k: KeadaanJadwal; ok: boolean; ditolak?: boolean } {
  const b = bunyiJadwal(k);
  if (!(b.a && b.b)) return { k: { ...k, tolakJadwal: true }, ok: false, ditolak: true };
  if (k.waktu === kunciJadwal(k)) return { k: { ...k, jadwalBenar: tanpaKembar([...k.jadwalBenar, k.jadwalKe % JADWAL_SIM.length]), jadwalKe: k.jadwalKe + 1, waktu: 0 }, ok: true };
  return { k: { ...k, salah: k.salah + 1, waktu: 0 }, ok: false };
}
export function petunjukJadwal(): string {
  return "Pada waktu itu kedua lonceng memang bersama, tetapi sudah ada pertemuan yang lebih awal. Mulai lagi dari awal dan berhenti pada pertemuan pertama.";
}
export const kalimatJadwal = (k: KeadaanJadwal): string =>
  k.jadwalBenar.length > 0 && k.waktu === 0 ? "Betul! Ada pasangan lonceng berikutnya untuk dijadwalkan." : "Majukan waktu satu demi satu, lalu tekan Bersama saat kedua lonceng berbunyi untuk pertama kali.";

/* ------------------------------ Tiga: KPK tiga bilangan ------------------------------ */
export const targetTiga = (k: KeadaanJadwal) => TIGA_SIM[k.tigaKe % TIGA_SIM.length];
export const kunciTiga = (k: KeadaanJadwal): number => kpk([...targetTiga(k).angka]);
/** Pilih satu bilangan: ditolak (mencatat `tolakTiga`) bila bukan kelipatan ketiga bilangan. */
export function pilihTiga(k: KeadaanJadwal, i: number): { k: KeadaanJadwal; ok: boolean } {
  const t = targetTiga(k);
  if (i < 0 || i >= t.kandidat.length) return { k, ok: false };
  if (!kelipatanPersekutuan([...t.angka], t.kandidat[i])) return { k: { ...k, tolakTiga: true }, ok: false };
  return { k: { ...k, tigaPilih: i }, ok: true };
}
export function periksaTiga(k: KeadaanJadwal): { k: KeadaanJadwal; ok: boolean } {
  const t = targetTiga(k);
  if (k.tigaPilih >= 0 && t.kandidat[k.tigaPilih] === kunciTiga(k)) return { k: { ...k, tigaBenar: tanpaKembar([...k.tigaBenar, k.tigaKe % TIGA_SIM.length]), tigaKe: k.tigaKe + 1, tigaPilih: -1 }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukTiga(k: KeadaanJadwal): string {
  if (k.tigaPilih < 0) return "Belum ada bilangan yang dipilih. Pilih bilangan yang kelipatan ketiga-tiganya.";
  return "Bilangan itu memang kelipatan ketiganya, tetapi masih ada yang lebih kecil. Pilih yang paling kecil.";
}
export const kalimatTiga = (k: KeadaanJadwal): string =>
  k.tigaBenar.length > 0 && k.tigaPilih < 0 ? "Betul! Ada tiga bilangan berikutnya untuk dicari KPK-nya." : "Pilih kelipatan persekutuan terkecil dari ketiga bilangan, lalu tekan Periksa.";
