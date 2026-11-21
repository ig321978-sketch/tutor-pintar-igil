/**
 * Logika murni Simulasi Batang Bazar Kelas 4 Bab 6 Sub-Bab B "Diagram Batang Pak Dodi", akhir cerita Bazar Kuliner Sekolah.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-bazar-k4b6b.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Buat (naikkan batang sampai tepat pada garis data; alat menolak batang melewati garis paling atas), Baca (telusuri ujung batang ke sumbu lalu pilih banyaknya),
 * Banding (adu dua batang lalu pilih selisih), dan Putar (putar diagram; alat menolak Periksa sebelum diputar, lalu pilih jenis dengan batang paling panjang).
 * Data ada di data-sim.ts. Tipe KeadaanBazar (alat: "bazar") dipakai misi-k4bab6.ts dan harus tetap diekspor.
 */
import { BACA_SIM, BANDING_SIM, BUAT_SIM, PUTAR_SIM, SIM_DIAGRAM } from "./data-sim";
import { banyakGaris, garisBatang, indeksTerbanyak, maksSumbu, selisihBatang, type Diagram } from "./logika-data";

export type ModeBazar = "buat" | "baca" | "banding" | "putar";

export type KeadaanBazar = {
  alat: "bazar";
  mode: ModeBazar;
  /** Buat: sasaran ke berapa, garis tiap batang yang sudah dinaikkan, pernah ditolak (melewati garis paling atas), sasaran yang sudah benar. */
  buatKe: number;
  garis: number[];
  tolakBuat: boolean;
  buatBenar: number[];
  /** Baca: sasaran ke berapa, pilihan (-1 belum), sasaran yang sudah benar. */
  bacaKe: number;
  pilihBaca: number;
  bacaBenar: number[];
  /** Banding: sasaran ke berapa, pilihan selisih (-1 belum), sasaran yang sudah benar. */
  bandingKe: number;
  pilihBanding: number;
  bandingBenar: number[];
  /** Putar: sasaran ke berapa, sudah diputar, pilihan jenis (-1 belum), pernah ditolak (Periksa sebelum diputar), sasaran yang sudah benar. */
  putarKe: number;
  diputar: boolean;
  pilihPutar: number;
  tolakPutar: boolean;
  putarBenar: number[];
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

const nolSemua = (n: number): number[] => Array.from({ length: n }, () => 0);
export const diagramBuat = (ke: number): Diagram => SIM_DIAGRAM[BUAT_SIM[ke % BUAT_SIM.length]];
export const awalBazar = (): KeadaanBazar => ({
  alat: "bazar",
  mode: "buat",
  buatKe: 0,
  garis: nolSemua(diagramBuat(0).batang.length),
  tolakBuat: false,
  buatBenar: [],
  bacaKe: 0,
  pilihBaca: -1,
  bacaBenar: [],
  bandingKe: 0,
  pilihBanding: -1,
  bandingBenar: [],
  putarKe: 0,
  diputar: false,
  pilihPutar: -1,
  tolakPutar: false,
  putarBenar: [],
  salah: 0,
});
export const mulaiLagiBazar = (): KeadaanBazar => awalBazar();
export const pilihModeBazar = (k: KeadaanBazar, mode: ModeBazar): KeadaanBazar => ({ ...k, mode });
const tanpaKembar = (xs: number[]): number[] => xs.filter((x, i) => xs.indexOf(x) === i);
const balikArah = (d: Diagram): Diagram => ({ ...d, arah: d.arah === "tegak" ? "datar" : "tegak" });

/* ------------------------------ Buat: batang demi batang ------------------------------ */
export const targetBuat = (k: KeadaanBazar): Diagram => diagramBuat(k.buatKe);
/** Diagram yang sedang dibangun: tinggi tiap batang sebanyak garis yang sudah dinaikkan; sumbu dikunci sesuai sasaran. */
export const diagramSedangDibuat = (k: KeadaanBazar): Diagram => {
  const t = targetBuat(k);
  return { ...t, maks: maksSumbu(t), batang: t.batang.map((b, i) => ({ ...b, banyak: k.garis[i] * t.tingkat })) };
};
/** Naikkan satu garis pada batang `i`. Ditolak bila batang sudah mencapai garis paling atas (mencatat `tolakBuat`). */
export function naikkanBatang(k: KeadaanBazar, i: number): { k: KeadaanBazar; ok: boolean } {
  const t = targetBuat(k);
  if (i < 0 || i >= t.batang.length) return { k, ok: false };
  if (k.garis[i] >= banyakGaris(t)) return { k: { ...k, tolakBuat: true }, ok: false };
  return { k: { ...k, garis: k.garis.map((g, j) => (j === i ? g + 1 : g)) }, ok: true };
}
export function turunkanBatang(k: KeadaanBazar, i: number): KeadaanBazar {
  if (i < 0 || i >= k.garis.length || k.garis[i] === 0) return k;
  return { ...k, garis: k.garis.map((g, j) => (j === i ? g - 1 : g)) };
}
/** Garis yang benar tiap batang, dihitung dari data. */
export const garisSasaran = (k: KeadaanBazar): number[] => targetBuat(k).batang.map((_, i) => garisBatang(targetBuat(k), i));
export function periksaBuat(k: KeadaanBazar): { k: KeadaanBazar; ok: boolean } {
  const s = garisSasaran(k);
  if (s.every((g, i) => k.garis[i] === g)) {
    const ke = k.buatKe + 1;
    return { k: { ...k, buatBenar: tanpaKembar([...k.buatBenar, k.buatKe % BUAT_SIM.length]), buatKe: ke, garis: nolSemua(diagramBuat(ke).batang.length) }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukBuat(k: KeadaanBazar): string {
  if (k.garis.every((g) => g === 0)) return "Belum ada batang yang dinaikkan. Bagi banyak tiap jenis dengan tingkat sumbu, lalu naikkan batangnya.";
  return "Ada batang yang ujungnya belum tepat. Bagi banyak jenis itu dengan tingkat sumbu untuk mencari garisnya.";
}
export function kalimatBuat(k: KeadaanBazar): string {
  if (k.buatBenar.length > 0 && k.garis.every((g) => g === 0)) return "Betul! Ada data berikutnya untuk digambar.";
  return "Naikkan tiap batang sampai ujungnya tepat pada garis sesuai data, lalu tekan Periksa.";
}

/* ------------------------------ Baca: ujung batang ke sumbu ------------------------------ */
export const targetBaca = (k: KeadaanBazar) => BACA_SIM[k.bacaKe % BACA_SIM.length];
export const diagramBaca = (k: KeadaanBazar): Diagram => SIM_DIAGRAM[targetBaca(k).d];
/** Indeks pilihan yang benar: banyak batang, dihitung dari data. */
export const kunciBaca = (k: KeadaanBazar): number => {
  const t = targetBaca(k);
  const d = SIM_DIAGRAM[t.d];
  return t.pil.indexOf(`${d.batang[t.b].banyak} ${d.satuan}`);
};
export function pilihBaca(k: KeadaanBazar, i: number): KeadaanBazar {
  return i < 0 || i > 2 ? k : { ...k, pilihBaca: i };
}
export function periksaBaca(k: KeadaanBazar): { k: KeadaanBazar; ok: boolean } {
  if (k.pilihBaca === kunciBaca(k) && k.pilihBaca >= 0) return { k: { ...k, bacaBenar: tanpaKembar([...k.bacaBenar, k.bacaKe % BACA_SIM.length]), bacaKe: k.bacaKe + 1, pilihBaca: -1 }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukBaca(k: KeadaanBazar): string {
  if (k.pilihBaca < 0) return "Belum ada pilihan. Telusuri garis dari ujung batang ke sumbu angka dulu, lalu pilih banyaknya.";
  return "Banyaknya belum cocok. Periksa tingkat sumbu, lalu telusuri lagi garis dari ujung batang.";
}
export const kalimatBaca = (k: KeadaanBazar): string =>
  k.bacaBenar.length > 0 && k.pilihBaca < 0 ? "Betul! Ada batang berikutnya untuk dibaca." : "Telusuri ujung batang yang disorot ke sumbu angka, pilih banyaknya, lalu tekan Periksa.";

/* ------------------------------ Banding: adu dua batang ------------------------------ */
export const targetBanding = (k: KeadaanBazar) => BANDING_SIM[k.bandingKe % BANDING_SIM.length];
export const diagramBanding = (k: KeadaanBazar): Diagram => SIM_DIAGRAM[targetBanding(k).d];
export const kunciBanding = (k: KeadaanBazar): number => {
  const t = targetBanding(k);
  const d = SIM_DIAGRAM[t.d];
  return t.pil.indexOf(`${selisihBatang(d, t.a, t.b)} ${d.satuan}`);
};
export function pilihBanding(k: KeadaanBazar, i: number): KeadaanBazar {
  return i < 0 || i > 2 ? k : { ...k, pilihBanding: i };
}
export function periksaBanding(k: KeadaanBazar): { k: KeadaanBazar; ok: boolean } {
  if (k.pilihBanding === kunciBanding(k) && k.pilihBanding >= 0) return { k: { ...k, bandingBenar: tanpaKembar([...k.bandingBenar, k.bandingKe % BANDING_SIM.length]), bandingKe: k.bandingKe + 1, pilihBanding: -1 }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukBanding(k: KeadaanBazar): string {
  if (k.pilihBanding < 0) return "Belum ada pilihan. Cari banyak kedua batang pada sumbu, lalu kurangkan.";
  return "Selisihnya belum cocok. Selisih berarti yang besar dikurangi yang kecil, bukan dijumlahkan.";
}
export const kalimatBanding = (k: KeadaanBazar): string =>
  k.bandingBenar.length > 0 && k.pilihBanding < 0 ? "Betul! Ada pasangan batang berikutnya untuk diadu." : "Adu kedua batang yang disorot, pilih selisihnya, lalu tekan Periksa.";

/* ------------------------------ Putar: ganti arah diagram ------------------------------ */
export const targetPutar = (k: KeadaanBazar) => PUTAR_SIM[k.putarKe % PUTAR_SIM.length];
export const diagramAsli = (k: KeadaanBazar): Diagram => SIM_DIAGRAM[targetPutar(k).d];
/** Diagram yang tampak sekarang: arah berganti bila sudah diputar; data tetap sama. */
export const diagramPutar = (k: KeadaanBazar): Diagram => (k.diputar ? balikArah(diagramAsli(k)) : diagramAsli(k));
export const putarDiagram = (k: KeadaanBazar): KeadaanBazar => ({ ...k, diputar: !k.diputar });
export const kunciPutar = (k: KeadaanBazar): number => {
  const d = diagramAsli(k);
  return targetPutar(k).pil.indexOf(d.batang[indeksTerbanyak(d)].nama);
};
export function pilihPutar(k: KeadaanBazar, i: number): KeadaanBazar {
  return i < 0 || i > 2 ? k : { ...k, pilihPutar: i };
}
/** Periksa putar. Ditolak (tanpa dihitung keliru, mencatat `tolakPutar`) bila diagram belum diputar. */
export function periksaPutar(k: KeadaanBazar): { k: KeadaanBazar; ok: boolean; ditolak?: boolean } {
  if (!k.diputar) return { k: { ...k, tolakPutar: true }, ok: false, ditolak: true };
  if (k.pilihPutar === kunciPutar(k) && k.pilihPutar >= 0) return { k: { ...k, putarBenar: tanpaKembar([...k.putarBenar, k.putarKe % PUTAR_SIM.length]), putarKe: k.putarKe + 1, diputar: false, pilihPutar: -1 }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukPutar(k: KeadaanBazar): string {
  if (k.pilihPutar < 0) return "Belum ada pilihan. Pilih jenis yang batangnya paling panjang pada diagram yang sudah diputar.";
  return "Jenis itu belum cocok. Data tiap batang tetap sama setelah diputar, jadi baca batang yang paling banyak.";
}
export const kalimatPutar = (k: KeadaanBazar): string =>
  k.putarBenar.length > 0 && !k.diputar && k.pilihPutar < 0 ? "Betul! Ada diagram berikutnya untuk diputar." : "Tekan Putar dulu, pilih jenis dengan batang paling panjang, lalu tekan Periksa.";
