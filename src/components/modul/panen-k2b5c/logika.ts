/**
 * Logika murni Simulasi Meja Panen Kelas 2 Bab 5 Sub-Bab C "Panen Raya Pak Joko" (seperempat dari benda utuh), akhir cerita Kebun Sekolah.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-panen-sim-k2b5c.mjs. Eksplorasi bebas tanpa skor.
 * Tiga alat: Pai (pai apel bundar dibagi dua garis lewat pusat), Kain (taplak persegi dibagi dua garis), Dinding (pita seperempat, setengah, utuh disusun
 * pada batang yang sama panjang). Luas tiap bagian dihitung program dari geometri.ts, bukan kunci tetap.
 */
import { bagiBangun, bentukBagian, empatSama, semuaSama, tegakLurus, type Bagian } from "./geometri";

export type ModePanen = "pai" | "kain" | "dinding";
/** Sudut garis pada pai (derajat). */
export const SUDUT_PAI: readonly number[] = [0, 30, 45, 60, 90, 120, 135, 150];
/** Garis pada kain taplak: nama dan sudutnya. */
export const GARIS_KAIN: readonly { id: string; nama: string; a: number }[] = [
  { id: "tegak", nama: "garis tegak", a: 90 },
  { id: "datar", nama: "garis datar", a: 0 },
  { id: "kiri", nama: "garis miring kiri", a: 135 },
  { id: "kanan", nama: "garis miring kanan", a: 45 },
];
/** Ukuran pita dalam satuan seperempat. */
export type UkuranPita = 1 | 2 | 4;
export const NAMA_PITA: Record<UkuranPita, string> = { 1: "seperempat", 2: "setengah", 4: "utuh" };
export const BATAS_SUSUN = 4;

export type KeadaanPanen = {
  alat: "panen";
  mode: ModePanen;
  /** Sudut garis yang sudah ditarik pada pai (paling banyak dua). */
  paiGaris: number[];
  paiSeperempat: number;
  paiTidakSama: number;
  /** Id garis yang sudah ditarik pada kain (paling banyak dua). */
  kainGaris: string[];
  kainSeperempat: number;
  kainSegitiga: number;
  kainPersegi: number;
  kainTidakSama: number;
  /** Pita pada batang susun, dalam satuan seperempat. */
  susun: UkuranPita[];
  /** Kesetaraan yang sudah dibuktikan: "2s=1t", "4s=1u", "2t=1u". */
  bukti: string[];
  /** Percobaan keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalPanen = (): KeadaanPanen => ({
  alat: "panen",
  mode: "pai",
  paiGaris: [],
  paiSeperempat: 0,
  paiTidakSama: 0,
  kainGaris: [],
  kainSeperempat: 0,
  kainSegitiga: 0,
  kainPersegi: 0,
  kainTidakSama: 0,
  susun: [],
  bukti: [],
  salah: 0,
});
export const mulaiLagiPanen = (): KeadaanPanen => awalPanen();
export const pilihModePanen = (k: KeadaanPanen, mode: ModePanen): KeadaanPanen => ({ ...k, mode });

/** Mengulang satu alat tanpa menghapus kemajuan alat lain. */
export const ulangPai = (k: KeadaanPanen): KeadaanPanen => ({ ...k, paiGaris: [] });
export const ulangKain = (k: KeadaanPanen): KeadaanPanen => ({ ...k, kainGaris: [] });
export const ulangSusun = (k: KeadaanPanen): KeadaanPanen => ({ ...k, susun: [] });

/* ------------------------------ Pai apel ------------------------------ */
export const bagianPai = (garis: readonly number[]): Bagian[] => bagiBangun("lingkaran", garis.map((a) => ({ a })));
export type HasilGaris = { k: KeadaanPanen; ok: boolean; selesai: boolean; pesan: string };

/** Tarik satu garis pada pai. Garis yang sama dengan garis pertama ditolak (tidak menambah bagian). */
export function tarikGarisPai(k: KeadaanPanen, a: number): HasilGaris {
  if (k.paiGaris.length >= 2) return { k, ok: false, selesai: true, pesan: "Pai sudah dibagi dengan dua garis. Tekan ulangi untuk mencoba garis lain." };
  if (k.paiGaris.includes(a)) return { k: { ...k, salah: k.salah + 1 }, ok: false, selesai: false, pesan: "Garis itu sudah ada. Pilih arah garis yang lain." };
  const garis = [...k.paiGaris, a];
  if (garis.length < 2) return { k: { ...k, paiGaris: garis }, ok: true, selesai: false, pesan: "Satu garis menjadi dua bagian. Tarik satu garis lagi." };
  const sama = empatSama(bagianPai(garis));
  const baru: KeadaanPanen = { ...k, paiGaris: garis, paiSeperempat: k.paiSeperempat + (sama ? 1 : 0), paiTidakSama: k.paiTidakSama + (sama ? 0 : 1) };
  return { k: baru, ok: true, selesai: true, pesan: kalimatPaiHasil(garis) };
}
export function kalimatPaiHasil(garis: readonly number[]): string {
  if (garis.length < 2) return "";
  if (empatSama(bagianPai(garis))) return "Empat bagian sama besar, dan setiap bagian disebut seperempat. Kedua garis saling tegak lurus.";
  return "Empat bagian ini tidak sama besar, jadi bukan seperempat. Dua garis harus saling tegak lurus.";
}
export const tegakLurusPai = (garis: readonly number[]): boolean => garis.length === 2 && tegakLurus(garis[0], garis[1]);

/* ------------------------------ Kain taplak ------------------------------ */
export const bagianKain = (garis: readonly string[]): Bagian[] => bagiBangun("persegi", garis.map((id) => ({ a: GARIS_KAIN.find((g) => g.id === id)?.a ?? 0 })));

export function tarikGarisKain(k: KeadaanPanen, id: string): HasilGaris {
  if (!GARIS_KAIN.some((g) => g.id === id)) return { k, ok: false, selesai: false, pesan: "" };
  if (k.kainGaris.length >= 2) return { k, ok: false, selesai: true, pesan: "Kain sudah dibagi dengan dua garis. Tekan ulangi untuk mencoba garis lain." };
  if (k.kainGaris.includes(id)) return { k: { ...k, salah: k.salah + 1 }, ok: false, selesai: false, pesan: "Garis itu sudah ada. Pilih garis yang lain." };
  const garis = [...k.kainGaris, id];
  if (garis.length < 2) return { k: { ...k, kainGaris: garis }, ok: true, selesai: false, pesan: "Satu garis menjadi dua bagian. Tarik satu garis lagi." };
  const b = bagianKain(garis);
  const sama = empatSama(b);
  const segitiga = sama && b.every((x) => bentukBagian(x) === "segitiga");
  const persegi = sama && b.every((x) => bentukBagian(x) === "segiempat");
  const baru: KeadaanPanen = {
    ...k,
    kainGaris: garis,
    kainSeperempat: k.kainSeperempat + (sama ? 1 : 0),
    kainSegitiga: k.kainSegitiga + (segitiga ? 1 : 0),
    kainPersegi: k.kainPersegi + (persegi ? 1 : 0),
    kainTidakSama: k.kainTidakSama + (sama ? 0 : 1),
  };
  return { k: baru, ok: true, selesai: true, pesan: kalimatKainHasil(garis) };
}
export function kalimatKainHasil(garis: readonly string[]): string {
  if (garis.length < 2) return "";
  const b = bagianKain(garis);
  if (empatSama(b)) return b.every((x) => bentukBagian(x) === "segitiga") ? "Empat segitiga sama besar, dan setiap segitiga disebut seperempat." : "Empat persegi sama besar, dan setiap persegi disebut seperempat.";
  return semuaSama(b) ? "Bagian ini sama besar." : "Bagian kain ini tidak sama besar, jadi bukan seperempat. Coba pasangan garis yang lain.";
}

/* ------------------------------ Dinding pita ------------------------------ */
export const jumlahSusun = (s: readonly UkuranPita[]): number => s.reduce((n, x) => n + x, 0);
const hitung = (s: readonly UkuranPita[], u: UkuranPita): number => s.filter((x) => x === u).length;
/** Kesetaraan yang dibuktikan oleh susunan saat ini (hanya bila susunan terdiri dari satu jenis pita). */
export function buktiSusun(s: readonly UkuranPita[]): string | null {
  if (s.length === 2 && hitung(s, 1) === 2) return "2s=1t";
  if (s.length === 4 && hitung(s, 1) === 4) return "4s=1u";
  if (s.length === 2 && hitung(s, 2) === 2) return "2t=1u";
  return null;
}
export function kalimatSusun(s: readonly UkuranPita[]): string {
  const b = buktiSusun(s);
  if (b === "2s=1t") return "Dua pita seperempat sama panjang dengan satu pita setengah.";
  if (b === "4s=1u") return "Empat pita seperempat sama panjang dengan satu pita utuh.";
  if (b === "2t=1u") return "Dua pita setengah sama panjang dengan satu pita utuh.";
  if (s.length === 0) return "Ketuk pita untuk menyusunnya di batang.";
  if (jumlahSusun(s) === BATAS_SUSUN) return "Batang sudah penuh, sama panjang dengan satu pita utuh.";
  return `Sudah ${s.length === 1 ? "satu" : s.length === 2 ? "dua" : "tiga"} pita di batang. Tambah lagi.`;
}
export function tambahPita(k: KeadaanPanen, u: UkuranPita): { k: KeadaanPanen; ok: boolean; pesan: string } {
  if (jumlahSusun(k.susun) + u > BATAS_SUSUN) return { k: { ...k, salah: k.salah + 1 }, ok: false, pesan: "Pita itu terlalu panjang untuk batang ini. Pilih pita yang lebih pendek, atau ulangi." };
  const susun = [...k.susun, u];
  const b = buktiSusun(susun);
  const bukti = b && !k.bukti.includes(b) ? [...k.bukti, b] : k.bukti;
  return { k: { ...k, susun, bukti }, ok: true, pesan: kalimatSusun(susun) };
}

/** Ucapan awal tiap alat (tanpa digit). */
export const SUARA_MODE: Record<ModePanen, string> = {
  pai: "Tarik dua garis lewat pusat pai apel, lalu lihat apakah keempat bagian sama besar.",
  kain: "Pilih dua garis pada kain taplak, lalu lihat bentuk dan besar keempat bagiannya.",
  dinding: "Susun pita di batang. Coba dua seperempat, atau empat seperempat, dan bandingkan panjangnya.",
};
export function kalimatPanen(k: KeadaanPanen): string {
  if (k.mode === "pai") return k.paiGaris.length === 2 ? kalimatPaiHasil(k.paiGaris) : SUARA_MODE.pai;
  if (k.mode === "kain") return k.kainGaris.length === 2 ? kalimatKainHasil(k.kainGaris) : SUARA_MODE.kain;
  return k.susun.length === 0 ? SUARA_MODE.dinding : kalimatSusun(k.susun);
}
