/**
 * Logika murni Simulasi Meja Jahit Kelas 4 Bab 2 Sub-Bab C "Meja Jahit Kak Sekar", cerita Sanggar Batik Kampung Mekar.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-jahit-k4b2c.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Arsir (ketuk bagian kain bawah sampai arsirannya sama besar dengan kain atas), Kali (pilih pengali dan cara; alat menolak cara menambah),
 * Bagi (bagi pembilang dan penyebut dengan bilangan sama sampai paling sederhana; alat menolak pembagi yang tidak membagi habis keduanya), dan Pasang (pilih kartu pecahan yang sama besar).
 * Data ada di data-sim.ts.
 */
import { kataBilK4B2 } from "../eja-k4b2";
import { PEMBAGI, TARGET_ARSIR, TARGET_BAGI, TARGET_KALI, TARGET_PASANG } from "./data-sim";

export type ModeJahit = "arsir" | "kali" | "bagi" | "pasang";
export type CaraKali = "kali" | "tambah";

export type KeadaanJahit = {
  alat: "jahit";
  mode: ModeJahit;
  /** Arsir: sasaran ke berapa, bagian kain bawah yang diarsir, sasaran yang sudah benar. */
  arsirKe: number;
  arsir: boolean[];
  arsirBenar: number[];
  /** Kali: sasaran ke berapa, cara (kali atau tambah), pengali yang dipilih (0 bila belum), sasaran yang sudah benar. */
  kaliKe: number;
  kaliCara: CaraKali;
  kaliN: number;
  kaliBenar: number[];
  /** Bagi: sasaran ke berapa, pembilang dan penyebut sekarang, sasaran yang sudah benar. */
  bagiKe: number;
  bagiP: number;
  bagiQ: number;
  bagiBenar: number[];
  /** Pasang: sasaran ke berapa, kartu yang dipilih, sasaran yang sudah benar. */
  pasangKe: number;
  pasangPilih: number[];
  pasangBenar: number[];
  /** Alat sudah pernah menolak cara menambah pembilang dan penyebut (Kali). */
  tolak: boolean;
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

const kosongBagian = (n: number): boolean[] => Array.from({ length: n }, () => false);

export const awalJahit = (): KeadaanJahit => ({
  alat: "jahit",
  mode: "arsir",
  arsirKe: 0,
  arsir: kosongBagian(TARGET_ARSIR[0].r),
  arsirBenar: [],
  kaliKe: 0,
  kaliCara: "kali",
  kaliN: 0,
  kaliBenar: [],
  bagiKe: 0,
  bagiP: TARGET_BAGI[0].P,
  bagiQ: TARGET_BAGI[0].Q,
  bagiBenar: [],
  pasangKe: 0,
  pasangPilih: [],
  pasangBenar: [],
  tolak: false,
  salah: 0,
});
export const mulaiLagiJahit = (): KeadaanJahit => awalJahit();
export const pilihModeJahit = (k: KeadaanJahit, mode: ModeJahit): KeadaanJahit => ({ ...k, mode });

/* ------------------------------ Kata dan pecahan ------------------------------ */
export const kata = (n: number): string => kataBilK4B2(n);
export const hurufBesar = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);
export const pec = (p: number, q: number): string => `${p}/${q}`;
export const fpb = (a: number, b: number): number => (b === 0 ? a : fpb(b, a % b));

/* ------------------------------ Arsir kain bawah ------------------------------ */
export const targetArsir = (k: KeadaanJahit) => TARGET_ARSIR[k.arsirKe % TARGET_ARSIR.length];
/** Banyak bagian kain bawah yang harus diarsir. */
export const perluArsir = (k: KeadaanJahit): number => {
  const t = targetArsir(k);
  return (t.p * t.r) / t.q;
};
export const banyakArsir = (k: KeadaanJahit): number => k.arsir.filter(Boolean).length;
/** Ketuk satu bagian kain bawah: diarsir atau dibersihkan lagi. */
export function ketukBagian(k: KeadaanJahit, i: number): KeadaanJahit {
  if (!Number.isInteger(i) || i < 0 || i >= k.arsir.length) return k;
  const arsir = [...k.arsir];
  arsir[i] = !arsir[i];
  return { ...k, arsir };
}
/** Periksa: tanpa arsiran, alat hanya mengingatkan (bukan percobaan keliru). */
export function periksaArsir(k: KeadaanJahit): { k: KeadaanJahit; ok: boolean } {
  const n = banyakArsir(k);
  if (n === 0) return { k, ok: false };
  if (n === perluArsir(k)) {
    const ke = k.arsirKe + 1;
    return { k: { ...k, arsirBenar: k.arsirBenar.includes(k.arsirKe) ? k.arsirBenar : [...k.arsirBenar, k.arsirKe], arsirKe: ke, arsir: kosongBagian(TARGET_ARSIR[ke % TARGET_ARSIR.length].r) }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukArsir(k: KeadaanJahit): string {
  const n = banyakArsir(k);
  if (n === 0) return "Ketuk bagian kain bawah untuk mengarsirnya dulu, lalu tekan Periksa.";
  return n < perluArsir(k) ? "Arsiran kain bawah masih lebih pendek dari kain atas. Tambah bagian yang diarsir." : "Arsiran kain bawah lebih panjang dari kain atas. Kurangi bagian yang diarsir.";
}
export function kalimatArsir(k: KeadaanJahit): string {
  const n = banyakArsir(k);
  if (k.arsirBenar.length > 0 && n === 0) return "Betul! Ada kain berikutnya.";
  return n === 0 ? "Bandingkan kain atas dengan kain bawah, lalu ketuk bagian kain bawah yang harus diarsir." : `Sudah ${kata(n)} bagian diarsir. Tekan Periksa bila arsirannya sudah sama panjang.`;
}

/* ------------------------------ Kali bentuk satu ------------------------------ */
export const targetKali = (k: KeadaanJahit) => TARGET_KALI[k.kaliKe % TARGET_KALI.length];
/** Pengali yang benar untuk sasaran sekarang (penyebut pesanan dibagi penyebut lama). */
export const pengaliBenar = (k: KeadaanJahit): number => targetKali(k).t / targetKali(k).q;
export function pilihCaraKali(k: KeadaanJahit, cara: CaraKali): KeadaanJahit {
  return { ...k, kaliCara: cara };
}
export function pilihPengali(k: KeadaanJahit, n: number): KeadaanJahit {
  return !Number.isInteger(n) || n < 2 || n > 9 ? k : { ...k, kaliN: n };
}
/** Pecahan yang terbentuk dari pilihan sekarang (null bila belum memilih pengali). */
export function hasilKaliTampil(k: KeadaanJahit): [number, number] | null {
  if (k.kaliN === 0) return null;
  const t = targetKali(k);
  return k.kaliCara === "kali" ? [t.p * k.kaliN, t.q * k.kaliN] : [t.p + k.kaliN, t.q + k.kaliN];
}
/** Periksa: cara menambah ditolak alat (tantangan tolak); tanpa pilihan hanya diingatkan; pengali yang keliru dihitung percobaan keliru. */
export function periksaKali(k: KeadaanJahit): { k: KeadaanJahit; ok: boolean } {
  if (k.kaliN === 0) return { k, ok: false };
  if (k.kaliCara === "tambah") return { k: { ...k, tolak: true }, ok: false };
  if (k.kaliN === pengaliBenar(k)) {
    const ke = k.kaliKe + 1;
    return { k: { ...k, kaliBenar: k.kaliBenar.includes(k.kaliKe) ? k.kaliBenar : [...k.kaliBenar, k.kaliKe], kaliKe: ke, kaliN: 0, kaliCara: "kali" }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukKali(k: KeadaanJahit): string {
  if (k.kaliN === 0) return "Pilih bilangan pengali dulu, lalu tekan Periksa.";
  if (k.kaliCara === "tambah") return "Alat menolak. Menambah bilangan yang sama pada pembilang dan penyebut mengubah besar pecahan. Hanya mengalikan keduanya yang menjaga besarnya.";
  return "Penyebut baru belum sama dengan pesanan Kak Sekar. Cari penyebut lama dikali berapa menjadi penyebut pesanan.";
}
export function kalimatKali(k: KeadaanJahit): string {
  if (k.kaliBenar.length > 0 && k.kaliN === 0) return "Betul! Ada pesanan berikutnya.";
  return k.kaliN === 0 ? "Lihat pesanan Kak Sekar, lalu pilih cara dan pengalinya." : "Lihat pecahan yang terbentuk, lalu tekan Periksa.";
}

/* ------------------------------ Bagi keduanya ------------------------------ */
export const targetBagi = (k: KeadaanJahit) => TARGET_BAGI[k.bagiKe % TARGET_BAGI.length];
export const sudahDibagi = (k: KeadaanJahit): boolean => k.bagiP !== targetBagi(k).P || k.bagiQ !== targetBagi(k).Q;
/** Bagi pembilang dan penyebut sekarang dengan `d`. Alat menolak pembagi yang tidak membagi habis keduanya (bukan percobaan keliru). */
export function bagiDengan(k: KeadaanJahit, d: number): { k: KeadaanJahit; ok: boolean } {
  if (!PEMBAGI.includes(d)) return { k, ok: false };
  if (k.bagiP % d !== 0 || k.bagiQ % d !== 0) return { k, ok: false };
  return { k: { ...k, bagiP: k.bagiP / d, bagiQ: k.bagiQ / d }, ok: true };
}
export const ulangBagi = (k: KeadaanJahit): KeadaanJahit => ({ ...k, bagiP: targetBagi(k).P, bagiQ: targetBagi(k).Q });
export const bisaDibagi = (k: KeadaanJahit): boolean => fpb(k.bagiP, k.bagiQ) > 1;
/** Periksa: tanpa pembagian apa pun hanya diingatkan; pecahan yang masih bisa dibagi dihitung percobaan keliru. */
export function periksaBagi(k: KeadaanJahit): { k: KeadaanJahit; ok: boolean } {
  if (!sudahDibagi(k)) return { k, ok: false };
  if (!bisaDibagi(k)) {
    const ke = k.bagiKe + 1;
    const t = TARGET_BAGI[ke % TARGET_BAGI.length];
    return { k: { ...k, bagiBenar: k.bagiBenar.includes(k.bagiKe) ? k.bagiBenar : [...k.bagiBenar, k.bagiKe], bagiKe: ke, bagiP: t.P, bagiQ: t.Q }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukBagi(k: KeadaanJahit): string {
  if (!sudahDibagi(k)) return "Bagi dulu pembilang dan penyebut dengan satu bilangan yang sama, lalu tekan Periksa.";
  return "Masih ada bilangan lain yang membagi habis pembilang dan penyebutnya. Bagi lagi sampai tidak ada.";
}
export const petunjukTolakBagi = (): string => "Alat menolak. Bilangan itu tidak membagi habis pembilang dan penyebut sekaligus. Pilih bilangan lain.";
export function kalimatBagi(k: KeadaanJahit): string {
  if (k.bagiBenar.length > 0 && !sudahDibagi(k)) return "Betul! Ada pecahan berikutnya.";
  return sudahDibagi(k) ? "Bagi lagi bila masih bisa, atau tekan Periksa." : "Pilih bilangan untuk membagi pembilang dan penyebut.";
}

/* ------------------------------ Pasang kartu yang sama besar ------------------------------ */
export const targetPasang = (k: KeadaanJahit) => TARGET_PASANG[k.pasangKe % TARGET_PASANG.length];
export function ketukKartu(k: KeadaanJahit, i: number): KeadaanJahit {
  if (!Number.isInteger(i) || i < 0 || i >= targetPasang(k).kartu.length) return k;
  return { ...k, pasangPilih: k.pasangPilih.includes(i) ? k.pasangPilih.filter((x) => x !== i) : [...k.pasangPilih, i].sort((a, b) => a - b) };
}
/** Periksa: tanpa pilihan hanya diingatkan; pilihan yang tidak sama persis dengan kartu yang sama besar dihitung percobaan keliru. */
export function periksaPasang(k: KeadaanJahit): { k: KeadaanJahit; ok: boolean } {
  if (k.pasangPilih.length === 0) return { k, ok: false };
  const benar = [...targetPasang(k).benar].sort((a, b) => a - b);
  if (benar.length === k.pasangPilih.length && benar.every((x, i) => x === k.pasangPilih[i])) {
    return { k: { ...k, pasangBenar: k.pasangBenar.includes(k.pasangKe) ? k.pasangBenar : [...k.pasangBenar, k.pasangKe], pasangKe: k.pasangKe + 1, pasangPilih: [] }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukPasang(k: KeadaanJahit): string {
  if (k.pasangPilih.length === 0) return "Ketuk semua kartu yang menurutmu sama besar dengan pecahan di papan, lalu tekan Periksa.";
  return "Ada kartu yang belum cocok atau yang terlewat. Kalikan atau bagi pembilang dan penyebut kartu sampai bisa dibandingkan dengan papan.";
}
export function kalimatPasang(k: KeadaanJahit): string {
  if (k.pasangBenar.length > 0 && k.pasangPilih.length === 0) return "Betul! Ada papan berikutnya.";
  return k.pasangPilih.length === 0 ? "Lihat pecahan di papan, lalu ketuk semua kartu yang sama besar." : `Sudah ${kata(k.pasangPilih.length)} kartu dipilih. Tekan Periksa bila sudah yakin.`;
}
