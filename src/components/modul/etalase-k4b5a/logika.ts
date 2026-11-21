/**
 * Logika murni Simulasi Etalase Keramik Kelas 4 Bab 5 Sub-Bab A "Etalase Keramik Bu Dewi", awal cerita Toko Keramik Bu Dewi.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-etalase-k4b5a.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Pilah (golongkan keramik menurut banyak sisinya; alat menolak memeriksa selama masih ada keramik yang belum digolongkan),
 * Sisi (tandai ciri segiempat), Pohon (pilih nama bangun anak pada pohon keluarga bentuk), dan Segitiga (jenis menurut sisi dan menurut sudut). Data ada di data-sim.ts.
 * Semua jawaban benar dihitung dari koordinat bangun (logika-bangun.ts).
 */
import { kataBilK4B5 } from "../eja-k4b5";
import { GOLONGAN_PILAH, NAMA_SISI_SEGITIGA, NAMA_SUDUT_SEGITIGA, TARGET_PILAH, TARGET_POHON, TARGET_SEGITIGA, TARGET_SISI, type CiriSisi } from "./data-sim";
import { ANAK, pilihanKlik } from "./logika-cpa";
import { banyakSejajar, banyakSiku, bangun, banyakSisi, jenisSegitigaSisi, jenisSegitigaSudut, namaDari, semuaSisiSama } from "./logika-bangun";

export type ModeEtalase = "pilah" | "sisi" | "pohon" | "segitiga";

export type KeadaanEtalase = {
  alat: "etalase";
  mode: ModeEtalase;
  /** Pilah: sasaran ke berapa, golongan tiap keramik (0 bila belum digolongkan), sasaran yang sudah benar. */
  pilahKe: number;
  pilahIsi: number[];
  pilahBenar: number[];
  /** Sisi: sasaran ke berapa, ciri yang ditandai, sasaran yang sudah benar. */
  sisiKe: number;
  sisiPilih: CiriSisi[];
  sisiBenar: number[];
  /** Pohon: sasaran ke berapa, pilihan nama (-1 bila belum), sasaran yang sudah benar. */
  pohonKe: number;
  pohonPilih: number;
  pohonBenar: number[];
  /** Segitiga: sasaran ke berapa, jenis menurut sisi dan menurut sudut (-1 bila belum), sasaran yang sudah benar. */
  segKe: number;
  segSisi: number;
  segSudut: number;
  segBenar: number[];
  /** Alat Pilah sudah pernah menolak memeriksa keramik yang belum digolongkan semua. */
  tolak: boolean;
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

const kosongPilah = (ke: number): number[] => TARGET_PILAH[ke % TARGET_PILAH.length].map(() => 0);

export const awalEtalase = (): KeadaanEtalase => ({
  alat: "etalase",
  mode: "pilah",
  pilahKe: 0,
  pilahIsi: kosongPilah(0),
  pilahBenar: [],
  sisiKe: 0,
  sisiPilih: [],
  sisiBenar: [],
  pohonKe: 0,
  pohonPilih: -1,
  pohonBenar: [],
  segKe: 0,
  segSisi: -1,
  segSudut: -1,
  segBenar: [],
  tolak: false,
  salah: 0,
});
export const mulaiLagiEtalase = (): KeadaanEtalase => awalEtalase();
export const pilihModeEtalase = (k: KeadaanEtalase, mode: ModeEtalase): KeadaanEtalase => ({ ...k, mode });

/* ------------------------------ Kata ------------------------------ */
/** Nama bilangan dalam kata (tanpa digit). */
export const kata = (n: number): string => kataBilK4B5(n);
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
export { besar as hurufBesar };

/* ------------------------------ Pilah keramik ------------------------------ */
export const daftarPilah = (k: KeadaanEtalase): readonly string[] => TARGET_PILAH[k.pilahKe % TARGET_PILAH.length];
/** Golongan berikutnya bagi keramik ke-i: belum, lalu bersisi 3, 4, 5, 6, lalu kembali belum. */
export function ubahPilah(k: KeadaanEtalase, i: number): KeadaanEtalase {
  if (i < 0 || i >= k.pilahIsi.length) return k;
  const kini = GOLONGAN_PILAH.indexOf(k.pilahIsi[i]);
  const baru = kini + 1 >= GOLONGAN_PILAH.length ? 0 : GOLONGAN_PILAH[kini + 1];
  return { ...k, pilahIsi: k.pilahIsi.map((g, j) => (j === i ? baru : g)) };
}
/** Periksa: alat menolak selama masih ada keramik yang belum digolongkan (itulah penolakan yang dihitung tantangan). */
export function periksaPilah(k: KeadaanEtalase): { k: KeadaanEtalase; ok: boolean } {
  if (k.pilahIsi.some((g) => g === 0)) return { k: { ...k, tolak: true }, ok: false };
  const benar = daftarPilah(k).every((b, i) => banyakSisi(bangun(b).titik) === k.pilahIsi[i]);
  if (benar) {
    const ke = k.pilahKe + 1;
    return { k: { ...k, pilahBenar: k.pilahBenar.includes(k.pilahKe) ? k.pilahBenar : [...k.pilahBenar, k.pilahKe], pilahKe: ke, pilahIsi: kosongPilah(ke) }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukPilah(k: KeadaanEtalase): string {
  if (k.pilahIsi.some((g) => g === 0)) return "Alat menolak. Masih ada keramik yang belum digolongkan. Golongkan semuanya dulu, lalu tekan Periksa.";
  return "Ada keramik yang salah golongan. Hitung ulang banyak sisi tiap keramik.";
}
export function kalimatPilah(k: KeadaanEtalase): string {
  if (k.pilahBenar.length > 0 && k.pilahIsi.every((g) => g === 0)) return "Betul! Ada rak berikutnya.";
  const sisa = k.pilahIsi.filter((g) => g === 0).length;
  return sisa === 0 ? "Semua keramik sudah digolongkan. Tekan Periksa bila sudah yakin." : `Ketuk keramik untuk memilih golongannya. Masih ada ${kata(sisa)} keramik yang belum digolongkan.`;
}

/* ------------------------------ Ciri segiempat ------------------------------ */
export const targetSisi = (k: KeadaanEtalase): string => TARGET_SISI[k.sisiKe % TARGET_SISI.length];
/** Ciri yang benar bagi segiempat: dihitung dari koordinat. */
export function cirinya(kunci: string): CiriSisi[] {
  const t = bangun(kunci).titik;
  const hasil: CiriSisi[] = [];
  if (semuaSisiSama(t)) hasil.push("sama");
  if (banyakSiku(t) === 4) hasil.push("siku");
  if (banyakSejajar(t) === 2) hasil.push("sejajar");
  return hasil;
}
export function ubahSisi(k: KeadaanEtalase, c: CiriSisi): KeadaanEtalase {
  return { ...k, sisiPilih: k.sisiPilih.includes(c) ? k.sisiPilih.filter((x) => x !== c) : [...k.sisiPilih, c] };
}
export function periksaSisi(k: KeadaanEtalase): { k: KeadaanEtalase; ok: boolean } {
  if (k.sisiPilih.length === 0) return { k, ok: false };
  const benar = cirinya(targetSisi(k));
  if (benar.length === k.sisiPilih.length && benar.every((c) => k.sisiPilih.includes(c))) {
    return { k: { ...k, sisiBenar: k.sisiBenar.includes(k.sisiKe) ? k.sisiBenar : [...k.sisiBenar, k.sisiKe], sisiKe: k.sisiKe + 1, sisiPilih: [] }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukSisi(k: KeadaanEtalase): string {
  if (k.sisiPilih.length === 0) return "Alat menolak. Belum ada ciri yang ditandai. Tandai ciri dulu, lalu tekan Periksa.";
  return "Ada ciri yang belum tepat. Periksa lagi sisi dan sudutnya dengan penggaris dan penyiku.";
}
export function kalimatSisi(k: KeadaanEtalase): string {
  if (k.sisiBenar.length > 0 && k.sisiPilih.length === 0) return "Betul! Ada keramik berikutnya.";
  return k.sisiPilih.length === 0 ? "Periksa keramik itu, lalu tandai cirinya." : "Ciri sudah ditandai. Tekan Periksa bila sudah yakin.";
}

/* ------------------------------ Pohon keluarga bentuk ------------------------------ */
export const nomorPohon = (k: KeadaanEtalase): number => TARGET_POHON[k.pohonKe % TARGET_POHON.length];
/** Tiga pilihan nama bangun anak; yang benar tidak pernah di tempat pertama. */
export const opsiPohon = (k: KeadaanEtalase): string[] => pilihanKlik({ tipe: "pohon", i: nomorPohon(k) });
export function pilihPohon(k: KeadaanEtalase, i: number): KeadaanEtalase {
  return i < 0 || i > 2 ? k : { ...k, pohonPilih: i };
}
export function periksaPohon(k: KeadaanEtalase): { k: KeadaanEtalase; ok: boolean } {
  if (k.pohonPilih < 0) return { k, ok: false };
  if (opsiPohon(k)[k.pohonPilih] === namaDari(ANAK[nomorPohon(k)].hasil)) {
    return { k: { ...k, pohonBenar: k.pohonBenar.includes(k.pohonKe) ? k.pohonBenar : [...k.pohonBenar, k.pohonKe], pohonKe: k.pohonKe + 1, pohonPilih: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukPohon(k: KeadaanEtalase): string {
  if (k.pohonPilih < 0) return "Alat menolak. Nama bangun belum dipilih. Pilih satu nama dulu, lalu tekan Periksa.";
  return "Nama itu belum cocok. Mulailah dari ciri bangun induk, tambahkan ciri baru, lalu cocokkan dengan nama bangunnya.";
}
export function kalimatPohon(k: KeadaanEtalase): string {
  if (k.pohonBenar.length > 0 && k.pohonPilih < 0) return "Betul! Ada cabang berikutnya.";
  return k.pohonPilih < 0 ? "Lihat bangun induknya dan ciri tambahannya, lalu pilih nama bangun anaknya." : "Nama sudah dipilih. Tekan Periksa bila sudah yakin.";
}

/* ------------------------------ Golongkan segitiga ------------------------------ */
export const targetSegitiga = (k: KeadaanEtalase): string => TARGET_SEGITIGA[k.segKe % TARGET_SEGITIGA.length];
export function pilihSegitiga(k: KeadaanEtalase, bagian: "sisi" | "sudut", i: number): KeadaanEtalase {
  if (i < 0 || i > 2) return k;
  return bagian === "sisi" ? { ...k, segSisi: i } : { ...k, segSudut: i };
}
export function periksaSegitiga(k: KeadaanEtalase): { k: KeadaanEtalase; ok: boolean } {
  if (k.segSisi < 0 || k.segSudut < 0) return { k, ok: false };
  const t = bangun(targetSegitiga(k)).titik;
  if (NAMA_SISI_SEGITIGA[k.segSisi] === jenisSegitigaSisi(t) && NAMA_SUDUT_SEGITIGA[k.segSudut] === jenisSegitigaSudut(t)) {
    return { k: { ...k, segBenar: k.segBenar.includes(k.segKe) ? k.segBenar : [...k.segBenar, k.segKe], segKe: k.segKe + 1, segSisi: -1, segSudut: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukSegitiga(k: KeadaanEtalase): string {
  if (k.segSisi < 0 || k.segSudut < 0) return "Alat menolak. Pilih jenis menurut sisi dan menurut sudut dulu, lalu tekan Periksa.";
  return "Jenis itu belum cocok. Bandingkan panjang ketiga sisinya, lalu periksa sudutnya dengan penyiku.";
}
export function kalimatSegitiga(k: KeadaanEtalase): string {
  if (k.segBenar.length > 0 && k.segSisi < 0 && k.segSudut < 0) return "Betul! Ada segitiga berikutnya.";
  return k.segSisi < 0 || k.segSudut < 0 ? "Periksa segitiga itu, lalu pilih jenisnya menurut sisi dan menurut sudut." : "Jenis sudah dipilih. Tekan Periksa bila sudah yakin.";
}
