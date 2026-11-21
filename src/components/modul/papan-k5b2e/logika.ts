/**
 * Logika murni Simulasi Pohon Papan Kelas 5 Bab 2 Sub-Bab E "Papan Bilangan Kak Lintang", akhir cerita Pasar Kuliner Malam.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-papan-k5b2e.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Saring (hapus satu, ambil prima berurutan, hapus kelipatannya; alat menolak bilangan yang sudah terhapus dan bilangan yang bukan gilirannya),
 * Pohon (pecah bilangan dengan pembagi prima; alat menolak pembagi yang tidak habis membagi dan bilangan prima yang dipecah), Gabung (pasangkan prima yang sama
 * pada dua faktorisasi; alat menolak pasangan prima yang berbeda), dan Bagi (pembagian berulang; alat menolak prima yang tidak membagi satu pun bilangan atau yang bukan
 * prima terkecil yang bisa). Data ada di data-sim.ts. Tipe KeadaanPapan (alat: "papan") dipakai misi-k5bab2.ts dan harus tetap diekspor.
 */
import { BAGI_SIM, GABUNG_SIM, POHON_SIM, SARING_SIM } from "./data-sim";
import { bagiSatu, berikutnyaDiambil, faktorisasi, fpbFaktorisasi, laPrima, pasangkan, pembagiBerikut, perluDiambil, terhapusOleh } from "./logika-data";

export type ModePapan = "saring" | "pohon" | "gabung" | "bagi";
export type PilihChip = { baris: "a" | "b"; i: number } | null;

export type KeadaanPapan = {
  alat: "papan";
  mode: ModePapan;
  /** Saring: tabel ke berapa, satu sudah dihapus, prima yang sudah diambil, ditolak karena bilangan sudah terhapus, ditolak karena bukan gilirannya, tabel yang sudah selesai. */
  saringKe: number;
  satuDihapus: boolean;
  diambil: number[];
  tolakHapus: boolean;
  tolakGiliran: boolean;
  saringBenar: number[];
  /** Pohon: bilangan ke berapa, daun saat ini, daun terpilih (-1 belum), ditolak, bilangan yang sudah benar. */
  pohonKe: number;
  daun: number[];
  pilihDaun: number;
  tolakPohon: boolean;
  pohonBenar: number[];
  /** Gabung: pasangan ke berapa, chip terpilih, pasangan yang sudah dibentuk (indeks di faktorisasi a dan b), ditolak, pasangan yang sudah benar. */
  gabungKe: number;
  pilihGabung: PilihChip;
  pasang: [number, number][];
  tolakGabung: boolean;
  gabungBenar: number[];
  /** Bagi: sasaran ke berapa, pembagi yang sudah dipakai, ditolak, sasaran yang sudah benar. */
  bagiKe: number;
  pembagiDipakai: number[];
  tolakBagi: boolean;
  bagiBenar: number[];
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, tidak dihitung). */
  salah: number;
};

const tanpaKembar = (xs: number[]): number[] => xs.filter((x, i) => xs.indexOf(x) === i);
export const awalPapan = (): KeadaanPapan => ({
  alat: "papan",
  mode: "saring",
  saringKe: 0,
  satuDihapus: false,
  diambil: [],
  tolakHapus: false,
  tolakGiliran: false,
  saringBenar: [],
  pohonKe: 0,
  daun: [POHON_SIM[0]],
  pilihDaun: -1,
  tolakPohon: false,
  pohonBenar: [],
  gabungKe: 0,
  pilihGabung: null,
  pasang: [],
  tolakGabung: false,
  gabungBenar: [],
  bagiKe: 0,
  pembagiDipakai: [],
  tolakBagi: false,
  bagiBenar: [],
  salah: 0,
});
export const mulaiLagiPapan = (): KeadaanPapan => awalPapan();
export const pilihModePapan = (k: KeadaanPapan, mode: ModePapan): KeadaanPapan => ({ ...k, mode });

/* ------------------------------ Saring ------------------------------ */
export const batasSaring = (k: KeadaanPapan): number => SARING_SIM[k.saringKe % SARING_SIM.length];
/** Bilangan yang sudah terhapus pada tabel saat ini. */
export const hapusSaring = (k: KeadaanPapan): Set<number> => terhapusOleh(k.diambil, batasSaring(k), k.satuDihapus);
/** Bilangan yang boleh diambil sekarang (null bila satu belum dihapus atau saringan habis). */
export const giliranSaring = (k: KeadaanPapan): number | null => (k.satuDihapus ? berikutnyaDiambil(k.diambil, batasSaring(k)) : null);
export type HasilKetuk = { k: KeadaanPapan; ok: boolean; jenis: "satu" | "ambil" | "terhapus" | "giliran" };
/** Ketuk satu bilangan di tabel: hapus satu lebih dulu, lalu ambil bilangan prima yang terkecil dan belum terhapus (kelipatannya terhapus sendiri). */
export function ketukSaring(k: KeadaanPapan, n: number): HasilKetuk {
  if (!k.satuDihapus) {
    if (n === 1) return { k: { ...k, satuDihapus: true }, ok: true, jenis: "satu" };
    return { k: { ...k, tolakGiliran: true }, ok: false, jenis: "giliran" };
  }
  if (hapusSaring(k).has(n)) return { k: { ...k, tolakHapus: true }, ok: false, jenis: "terhapus" };
  if (n === giliranSaring(k)) return { k: { ...k, diambil: [...k.diambil, n] }, ok: true, jenis: "ambil" };
  return { k: { ...k, tolakGiliran: true }, ok: false, jenis: "giliran" };
}
/** Saringan selesai bila semua prima yang perlu (p x p tidak lebih dari batas) sudah diambil: sisanya pasti prima. */
export const saringSelesai = (k: KeadaanPapan): boolean => k.satuDihapus && perluDiambil(batasSaring(k)).every((p) => k.diambil.includes(p));
export function periksaSaring(k: KeadaanPapan): { k: KeadaanPapan; ok: boolean } {
  if (!saringSelesai(k)) return { k: { ...k, salah: k.salah + 1 }, ok: false };
  return { k: { ...k, saringKe: k.saringKe + 1, satuDihapus: false, diambil: [], saringBenar: tanpaKembar([...k.saringBenar, k.saringKe % SARING_SIM.length]) }, ok: true };
}
/** Bilangan yang tersisa (belum terhapus, paling kecil dua). */
export const sisaSaring = (k: KeadaanPapan): number[] => {
  const h = hapusSaring(k);
  return Array.from({ length: batasSaring(k) - 1 }, (_, i) => i + 2).filter((n) => !h.has(n));
};
export function petunjukSaring(k: KeadaanPapan): string {
  if (!k.satuDihapus) return "Mulai dari bilangan satu dulu, karena satu bukan bilangan prima.";
  return "Saringan belum selesai. Ambil bilangan terkecil yang masih tersisa, lalu semua kelipatannya terhapus.";
}
export const kalimatSaring = (k: KeadaanPapan): string =>
  k.saringBenar.length > 0 && !k.satuDihapus && k.diambil.length === 0 ? "Betul! Ada tabel berikutnya untuk disaring." : !k.satuDihapus ? "Ketuk bilangan satu untuk menghapusnya." : "Ketuk bilangan terkecil yang masih tersisa untuk mengambilnya.";

/* ------------------------------ Pohon ------------------------------ */
export const targetPohon = (k: KeadaanPapan): number => POHON_SIM[k.pohonKe % POHON_SIM.length];
export function pilihDaunPohon(k: KeadaanPapan, i: number): KeadaanPapan {
  return i < 0 || i >= k.daun.length ? k : { ...k, pilihDaun: i };
}
/** Pecah daun terpilih dengan pembagi prima p: daun diganti p dan hasil baginya. Ditolak bila p tidak habis membagi atau daun itu sudah prima (mencatat `tolakPohon`). */
export function pecahPohon(k: KeadaanPapan, p: number): { k: KeadaanPapan; ok: boolean; alasan: "belum" | "prima" | "tidak" | "ok" } {
  if (k.pilihDaun < 0) return { k, ok: false, alasan: "belum" };
  const v = k.daun[k.pilihDaun];
  if (laPrima(v)) return { k: { ...k, tolakPohon: true }, ok: false, alasan: "prima" };
  if (v % p !== 0) return { k: { ...k, tolakPohon: true }, ok: false, alasan: "tidak" };
  const daun = [...k.daun];
  daun.splice(k.pilihDaun, 1, p, v / p);
  return { k: { ...k, daun, pilihDaun: -1 }, ok: true, alasan: "ok" };
}
export const pohonSelesai = (k: KeadaanPapan): boolean => k.daun.every(laPrima);
export function periksaPohon(k: KeadaanPapan): { k: KeadaanPapan; ok: boolean } {
  if (!pohonSelesai(k)) return { k: { ...k, salah: k.salah + 1 }, ok: false };
  const ke = k.pohonKe + 1;
  return { k: { ...k, pohonKe: ke, daun: [POHON_SIM[ke % POHON_SIM.length]], pilihDaun: -1, pohonBenar: tanpaKembar([...k.pohonBenar, k.pohonKe % POHON_SIM.length]) }, ok: true };
}
export function petunjukPohon(): string {
  return "Masih ada daun yang belum prima. Pilih daun itu, lalu pecah dengan bilangan prima yang habis membagi.";
}
export const kalimatPohon = (k: KeadaanPapan): string =>
  k.pohonBenar.length > 0 && k.daun.length === 1 && k.pilihDaun < 0 ? "Betul! Ada bilangan berikutnya untuk dipecah." : k.pilihDaun < 0 ? "Ketuk satu daun yang belum prima, lalu pilih pembaginya." : "Pilih bilangan prima untuk memecah daun itu.";

/* ------------------------------ Gabung ------------------------------ */
export const targetGabung = (k: KeadaanPapan): readonly [number, number] => GABUNG_SIM[k.gabungKe % GABUNG_SIM.length];
export const faktorGabung = (k: KeadaanPapan): [number[], number[]] => [faktorisasi(targetGabung(k)[0]), faktorisasi(targetGabung(k)[1])];
export const sudahDipasang = (k: KeadaanPapan, baris: "a" | "b", i: number): boolean => k.pasang.some((s) => s[baris === "a" ? 0 : 1] === i);
/** Ketuk satu prima pada baris a atau b. Dua prima dari baris yang berbeda dipasangkan bila sama (mencatat `tolakGabung` bila berbeda). */
export function ketukGabung(k: KeadaanPapan, baris: "a" | "b", i: number): { k: KeadaanPapan; ok: boolean; pasangan: boolean } {
  if (sudahDipasang(k, baris, i)) return { k, ok: false, pasangan: false };
  const p = k.pilihGabung;
  if (p === null || p.baris === baris) return { k: { ...k, pilihGabung: { baris, i } }, ok: true, pasangan: false };
  const [fa, fb] = faktorGabung(k);
  const ia = baris === "a" ? i : p.i;
  const ib = baris === "b" ? i : p.i;
  if (fa[ia] !== fb[ib]) return { k: { ...k, pilihGabung: null, tolakGabung: true }, ok: false, pasangan: false };
  return { k: { ...k, pilihGabung: null, pasang: [...k.pasang, [ia, ib]] }, ok: true, pasangan: true };
}
/** Banyak pasangan yang bisa dibentuk (prima yang berpasangan menurut faktorisasi). */
export const banyakPasangan = (k: KeadaanPapan): number => fpbFaktorisasi([...faktorGabung(k)]).faktor.length;
export const gabungSelesai = (k: KeadaanPapan): boolean => k.pasang.length === banyakPasangan(k);
export function periksaGabung(k: KeadaanPapan): { k: KeadaanPapan; ok: boolean } {
  if (!gabungSelesai(k)) return { k: { ...k, salah: k.salah + 1 }, ok: false };
  return { k: { ...k, gabungKe: k.gabungKe + 1, pilihGabung: null, pasang: [], gabungBenar: tanpaKembar([...k.gabungBenar, k.gabungKe % GABUNG_SIM.length]) }, ok: true };
}
/** KPK dan FPB sasaran dari pasangan prima (pasangan ditulis sekali untuk KPK). */
export const hasilGabung = (k: KeadaanPapan): { kpk: number[]; fpb: number[] } => {
  const [fa, fb] = faktorGabung(k);
  const s = pasangkan(fa, fb);
  return { kpk: s.kpk, fpb: s.pasangan };
};
export function petunjukGabung(): string {
  return "Masih ada prima yang bisa dipasangkan. Ketuk satu prima di baris atas dan satu prima yang sama di baris bawah.";
}
export const kalimatGabung = (k: KeadaanPapan): string =>
  k.gabungBenar.length > 0 && k.pasang.length === 0 && k.pilihGabung === null ? "Betul! Ada dua bilangan berikutnya untuk dipasangkan." : k.pilihGabung ? "Sekarang ketuk prima yang sama di baris lain." : "Ketuk satu prima, lalu pasangannya di baris lain.";

/* ------------------------------ Bagi ------------------------------ */
export const targetBagi = (k: KeadaanPapan): readonly number[] => BAGI_SIM[k.bagiKe % BAGI_SIM.length];
/** Bilangan saat ini setelah semua pembagi yang sudah dipakai. */
export function angkaBagi(k: KeadaanPapan): number[] {
  let cur = [...targetBagi(k)];
  for (const p of k.pembagiDipakai) cur = (bagiSatu(cur, p)?.sesudah ?? cur) as number[];
  return cur;
}
/** Semua baris pembagian yang sudah dibuat (bilangan sebelum dan sesudah tiap pembagi). */
export function barisBagiSim(k: KeadaanPapan): { p: number; sebelum: number[]; sesudah: number[]; semua: boolean }[] {
  const hasil: { p: number; sebelum: number[]; sesudah: number[]; semua: boolean }[] = [];
  let cur = [...targetBagi(k)];
  for (const p of k.pembagiDipakai) {
    const b = bagiSatu(cur, p);
    if (!b) break;
    hasil.push(b);
    cur = b.sesudah;
  }
  return hasil;
}
export const bagiSelesai = (k: KeadaanPapan): boolean => angkaBagi(k).every((x) => x === 1);
/** Pakai pembagi prima p. Ditolak bila p tidak membagi satu pun bilangan, atau bila p bukan prima terkecil yang bisa membagi (mencatat `tolakBagi`). Setelah semuanya satu, sasaran dinyatakan selesai. */
export function pakaiPembagi(k: KeadaanPapan, p: number): { k: KeadaanPapan; ok: boolean; selesai: boolean; alasan: "tidak" | "urut" | "ok" } {
  const cur = angkaBagi(k);
  if (!bagiSatu(cur, p)) return { k: { ...k, tolakBagi: true }, ok: false, selesai: false, alasan: "tidak" };
  if (p !== pembagiBerikut(cur)) return { k: { ...k, tolakBagi: true }, ok: false, selesai: false, alasan: "urut" };
  const baru = { ...k, pembagiDipakai: [...k.pembagiDipakai, p] };
  if (!bagiSelesai(baru)) return { k: baru, ok: true, selesai: false, alasan: "ok" };
  const ke = k.bagiKe + 1;
  return { k: { ...baru, bagiKe: ke, pembagiDipakai: [], bagiBenar: tanpaKembar([...k.bagiBenar, k.bagiKe % BAGI_SIM.length]) }, ok: true, selesai: true, alasan: "ok" };
}
export const kalimatBagi = (k: KeadaanPapan): string =>
  k.bagiBenar.length > 0 && k.pembagiDipakai.length === 0 ? "Betul! Ada bilangan berikutnya untuk dibagi berulang." : "Pilih bilangan prima terkecil yang bisa membagi paling sedikit satu bilangan.";
