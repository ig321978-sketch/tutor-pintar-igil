/**
 * Logika murni Simulasi Gabung Loyang Kelas 5 Bab 3 Sub-Bab B "Roti Isi Pak Seno", mobil roti keliling. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-loyang-k5b3b.mjs.
 * Eksplorasi bebas tanpa skor. Empat alat: Gabung (atur pembilang dan penyebut hasil dua bagian loyang berpenyebut sama; alat menolak bila penyebut diubah),
 * Samakan (pilih KPK dua penyebut beda; alat menolak bila bukan kelipatan kedua penyebut), Campur (atur bilangan bulat dan pembilang hasil dua pecahan campuran;
 * alat menolak bila pembilang belum kurang dari penyebut), dan Sederhana (pilih bentuk paling sederhana; alat menolak bila belum memilih). Data di data-sim.ts; jawaban dihitung dari data.
 */
import { TARGET_CAMPUR, TARGET_GABUNG, TARGET_SAMAKAN, TARGET_SEDERHANA, type SasaranCampur, type SasaranGabung, type SasaranSamakan, type SasaranSederhana } from "./data-sim";
import { bentuk, jumlah, kpk, keBiasa, keCampur } from "./logika-data";
import { kataK5B3 } from "../eja-k5b3";

export type ModeLoyang = "gabung" | "samakan" | "campur" | "sederhana";

export type KeadaanLoyang = {
  alat: "loyang";
  mode: ModeLoyang;
  /** Gabung: sasaran ke berapa, pembilang dan penyebut yang diatur, sasaran yang sudah benar. */
  gabungKe: number;
  gabungN: number;
  gabungD: number;
  gabungBenar: number[];
  /** Samakan: sasaran ke berapa, KPK yang diatur (0 bila belum), sasaran yang sudah benar. */
  samaKe: number;
  samaM: number;
  samaBenar: number[];
  /** Campur: sasaran ke berapa, bilangan bulat dan pembilang yang diatur, sasaran yang sudah benar. */
  campKe: number;
  campW: number;
  campN: number;
  campBenar: number[];
  /** Sederhana: sasaran ke berapa, kartu yang dipilih (-1 bila belum), sasaran yang sudah benar. */
  sedKe: number;
  sedPilih: number;
  sedBenar: number[];
  /** Alat Gabung sudah pernah menolak hasil yang penyebutnya diubah. */
  tolakPenyebut: boolean;
  /** Alat Samakan sudah pernah menolak KPK yang bukan kelipatan kedua penyebut. */
  tolakKelipatan: boolean;
  /** Alat Campur sudah pernah menolak pembilang yang belum kurang dari penyebut. */
  tolakCampur: boolean;
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

const ke = <T,>(daftar: readonly T[], n: number): T => daftar[n % daftar.length];

/* ------------------------------ Sasaran ------------------------------ */
export const sasaranGabung = (k: KeadaanLoyang): SasaranGabung => ke(TARGET_GABUNG, k.gabungKe);
export const sasaranSamakan = (k: KeadaanLoyang): SasaranSamakan => ke(TARGET_SAMAKAN, k.samaKe);
export const sasaranCampur = (k: KeadaanLoyang): SasaranCampur => ke(TARGET_CAMPUR, k.campKe);
export const sasaranSederhana = (k: KeadaanLoyang): SasaranSederhana => ke(TARGET_SEDERHANA, k.sedKe);
/** Indeks kartu bentuk paling sederhana (dicari dari data, bukan disimpan). */
export const kartuSederhana = (x: SasaranSederhana): number => x.kartu.findIndex((t) => t === bentuk({ n: x.n, d: x.d }));

export const awalLoyang = (): KeadaanLoyang => ({
  alat: "loyang",
  mode: "gabung",
  gabungKe: 0,
  gabungN: 1,
  gabungD: TARGET_GABUNG[0].d,
  gabungBenar: [],
  samaKe: 0,
  samaM: 0,
  samaBenar: [],
  campKe: 0,
  campW: 0,
  campN: 0,
  campBenar: [],
  sedKe: 0,
  sedPilih: -1,
  sedBenar: [],
  tolakPenyebut: false,
  tolakKelipatan: false,
  tolakCampur: false,
  salah: 0,
});
export const mulaiLagiLoyang = (): KeadaanLoyang => awalLoyang();
export const pilihModeLoyang = (k: KeadaanLoyang, mode: ModeLoyang): KeadaanLoyang => ({ ...k, mode });

/* ------------------------------ Kata ------------------------------ */
/** Nama bilangan dalam kata (tanpa digit). */
export const kata = (n: number): string => kataK5B3(n);
const besar = (t: string) => t.replace(/(^|[.!?] )([a-z])/g, (_, a: string, b: string) => a + b.toUpperCase());
export { besar as hurufBesar };

/* ------------------------------ Gabung ------------------------------ */
export function ubahGabungN(k: KeadaanLoyang, delta: 1 | -1): KeadaanLoyang {
  return { ...k, gabungN: Math.max(1, Math.min(12, k.gabungN + delta)) };
}
export function ubahGabungD(k: KeadaanLoyang, delta: 1 | -1): KeadaanLoyang {
  return { ...k, gabungD: Math.max(2, Math.min(24, k.gabungD + delta)) };
}
/** Periksa hasil: penyebut yang diubah ditolak (menandai tantangan menolak); pembilang yang keliru dihitung percobaan; yang tepat menaikkan sasaran. */
export function periksaGabung(k: KeadaanLoyang): { k: KeadaanLoyang; ok: boolean; tolak: boolean } {
  const x = sasaranGabung(k);
  if (k.gabungD !== x.d) return { k: { ...k, tolakPenyebut: true }, ok: false, tolak: true };
  if (k.gabungN === x.a + x.b) {
    const lanjut = k.gabungKe + 1;
    return { k: { ...k, gabungBenar: k.gabungBenar.includes(k.gabungKe) ? k.gabungBenar : [...k.gabungBenar, k.gabungKe], gabungKe: lanjut, gabungN: 1, gabungD: ke(TARGET_GABUNG, lanjut).d }, ok: true, tolak: false };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false, tolak: false };
}
export function petunjukGabung(k: KeadaanLoyang): string {
  if (k.gabungD !== sasaranGabung(k).d) return "Alat menolak. Penyebutnya berubah, padahal ukuran potongannya sama besar. Kembalikan penyebut seperti pecahan di papan.";
  return "Pembilangnya belum tepat. Hitung semua bagian yang terambil dari kedua pecahan.";
}
export function kalimatGabung(k: KeadaanLoyang): string {
  if (k.gabungBenar.length > 0 && k.gabungN === 1 && k.gabungKe === k.gabungBenar.length) return "Betul! Ada dua bagian loyang berikutnya.";
  return "Atur pembilang dan penyebut hasil, lalu tekan Periksa.";
}
export function kalimatTerimaGabung(x: SasaranGabung): string {
  return `Betul! ${kata(x.a)} per ${kata(x.d)} ditambah ${kata(x.b)} per ${kata(x.d)} sama dengan ${kata(x.a + x.b)} per ${kata(x.d)}, penyebutnya tetap.`;
}

/* ------------------------------ Samakan ------------------------------ */
export function ubahSamaM(k: KeadaanLoyang, delta: 1 | -1): KeadaanLoyang {
  const { p, q } = sasaranSamakan(k);
  const dari = k.samaM <= 0 ? Math.max(p, q) - (delta > 0 ? 1 : 0) : k.samaM;
  return { ...k, samaM: Math.max(1, Math.min(60, dari + delta)) };
}
/** Periksa KPK: bukan kelipatan kedua penyebut ditolak (menandai tantangan); kelipatan yang bukan terkecil dihitung percobaan; KPK menaikkan sasaran. */
export function periksaSamakan(k: KeadaanLoyang): { k: KeadaanLoyang; ok: boolean; tolak: boolean } {
  if (k.samaM <= 0) return { k, ok: false, tolak: false };
  const { p, q } = sasaranSamakan(k);
  if (k.samaM % p !== 0 || k.samaM % q !== 0) return { k: { ...k, tolakKelipatan: true }, ok: false, tolak: true };
  if (k.samaM === kpk(p, q)) {
    const lanjut = k.samaKe + 1;
    return { k: { ...k, samaBenar: k.samaBenar.includes(k.samaKe) ? k.samaBenar : [...k.samaBenar, k.samaKe], samaKe: lanjut, samaM: 0 }, ok: true, tolak: false };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false, tolak: false };
}
export function petunjukSamakan(k: KeadaanLoyang): string {
  if (k.samaM <= 0) return "Alat menolak. KPK belum diatur. Atur dulu dengan tombol tambah dan kurang, lalu tekan Periksa.";
  const { p, q } = sasaranSamakan(k);
  if (k.samaM % p !== 0 || k.samaM % q !== 0) return "Alat menolak. Bilangan itu belum bisa dibagi habis oleh kedua penyebut, jadi penyebutnya belum bisa disamakan.";
  return "Kedua penyebut memang bisa menjadi bilangan itu, tetapi masih ada yang lebih kecil. Cari kelipatan persekutuan yang terkecil.";
}
export function kalimatSamakan(k: KeadaanLoyang): string {
  if (k.samaBenar.length > 0 && k.samaM <= 0 && k.samaKe === k.samaBenar.length) return "Betul! Ada pecahan berikutnya.";
  return k.samaM <= 0 ? "Atur KPK kedua penyebut dengan tombol tambah dan kurang." : "Bandingkan dengan hitunganmu, lalu tekan Periksa.";
}

/* ------------------------------ Campur ------------------------------ */
export function ubahCampW(k: KeadaanLoyang, delta: 1 | -1): KeadaanLoyang {
  return { ...k, campW: Math.max(0, Math.min(9, k.campW + delta)) };
}
export function ubahCampN(k: KeadaanLoyang, delta: 1 | -1): KeadaanLoyang {
  const { d } = sasaranCampur(k);
  return { ...k, campN: Math.max(0, Math.min(d * 2, k.campN + delta)) };
}
/** Hasil benar sasaran: bilangan bulat dan pembilang dari jumlah dua campuran (dihitung lewat pecahan biasa). */
export function hasilCampur(x: SasaranCampur): { w: number; n: number } {
  const c = keCampur(jumlah(keBiasa({ w: x.w1, n: x.n1, d: x.d }), keBiasa({ w: x.w2, n: x.n2, d: x.d })));
  return { w: c.w, n: c.n };
}
/** Periksa hasil: pembilang yang belum kurang dari penyebut ditolak (menandai tantangan); yang keliru dihitung percobaan; yang tepat menaikkan sasaran. */
export function periksaCampur(k: KeadaanLoyang): { k: KeadaanLoyang; ok: boolean; tolak: boolean } {
  const x = sasaranCampur(k);
  if (k.campN >= x.d) return { k: { ...k, tolakCampur: true }, ok: false, tolak: true };
  const h = hasilCampur(x);
  if (k.campW === h.w && k.campN === h.n) {
    const lanjut = k.campKe + 1;
    return { k: { ...k, campBenar: k.campBenar.includes(k.campKe) ? k.campBenar : [...k.campBenar, k.campKe], campKe: lanjut, campW: 0, campN: 0 }, ok: true, tolak: false };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false, tolak: false };
}
export function petunjukCampur(k: KeadaanLoyang): string {
  if (k.campN >= sasaranCampur(k).d) return "Alat menolak. Pembilangnya sudah sama dengan penyebut atau lebih. Pindahkan satu bilangan bulat ke bilangan bulat hasil.";
  return "Hasilnya belum tepat. Jumlahkan bilangan bulatnya sendiri dan pecahannya sendiri, lalu periksa apakah pecahannya melebihi seluruhnya.";
}
export function kalimatCampur(k: KeadaanLoyang): string {
  if (k.campBenar.length > 0 && k.campW === 0 && k.campN === 0 && k.campKe === k.campBenar.length) return "Betul! Ada pecahan campuran berikutnya.";
  return "Atur bilangan bulat dan pembilang hasil, lalu tekan Periksa.";
}

/* ------------------------------ Sederhana ------------------------------ */
export function pilihSederhana(k: KeadaanLoyang, i: number): KeadaanLoyang {
  if (i < 0 || i > 3) return k;
  return { ...k, sedPilih: k.sedPilih === i ? -1 : i };
}
export function periksaSederhana(k: KeadaanLoyang): { k: KeadaanLoyang; ok: boolean } {
  if (k.sedPilih < 0) return { k, ok: false };
  if (k.sedPilih === kartuSederhana(sasaranSederhana(k))) {
    const lanjut = k.sedKe + 1;
    return { k: { ...k, sedBenar: k.sedBenar.includes(k.sedKe) ? k.sedBenar : [...k.sedBenar, k.sedKe], sedKe: lanjut, sedPilih: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukSederhana(k: KeadaanLoyang): string {
  if (k.sedPilih < 0) return "Alat menolak. Belum ada kartu yang dipilih. Pilih dulu, lalu tekan Periksa.";
  return "Kartu itu belum tepat. Cari pecahan campuran yang pecahannya tidak bisa disederhanakan lagi.";
}
export function kalimatSederhana(k: KeadaanLoyang): string {
  if (k.sedBenar.length > 0 && k.sedPilih < 0 && k.sedKe === k.sedBenar.length) return "Betul! Ada hasil berikutnya.";
  return k.sedPilih < 0 ? "Pilih kartu pecahan campuran yang paling sederhana." : "Sudah dipilih. Tekan Periksa bila sudah yakin.";
}
