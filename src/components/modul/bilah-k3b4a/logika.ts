/**
 * Logika murni Simulasi Meja Bilah Kelas 3 Bab 4 Sub-Bab A "Rangka Layang-layang Bu Ratih", awal cerita Festival Layang-layang Kampung.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-bilah-k3b4a.mjs. Eksplorasi bebas tanpa skor.
 * Lima alat: Kenali (tarik ujung gambar lalu pilih jenisnya: sinar garis, garis, ruas garis, kurva), Jalan (pilih benang terpendek antara dua paku),
 * Ukur (geser bilah sampai ujung kirinya tepat di angka nol, alat menolak membaca sebelum itu, lalu baca panjangnya dalam milimeter),
 * Ubah (tulis ukuran dalam milimeter atau sentimeter desimal), dan Sisi (beri huruf pada titik sudut lalu hitung sisi). Data ada di data-sim.ts. Penggaris sepanjang seratus milimeter.
 */
import { SKALA_BILAH, TARGET_JALAN, TARGET_KENALI, TARGET_SISI, TARGET_UBAH, TARGET_UKUR } from "./data-sim";

export type ModeBilah = "kenali" | "jalan" | "ukur" | "ubah" | "sisi";

export type KeadaanBilah = {
  alat: "bilah";
  mode: ModeBilah;
  /** Kenali: sasaran ke berapa, ujung kiri dan kanan yang berhasil ditarik, ujung yang ditolak ditarik, pilihan (-1 bila belum), sasaran yang sudah benar. */
  kenaliKe: number;
  tarikKiri: boolean;
  tarikKanan: boolean;
  tarikTolak: boolean;
  kenaliPilih: number;
  kenaliBenar: number[];
  /** Jalan: sasaran ke berapa, pilihan (-1 bila belum), sasaran yang sudah benar. */
  jalanKe: number;
  jalanPilih: number;
  jalanBenar: number[];
  /** Ukur: sasaran ke berapa, posisi ujung kiri bilah pada penggaris (milimeter), sudah pernah mencoba membaca sebelum di nol (ditolak), sudah membaca di nol, pilihan, sasaran yang sudah benar. */
  ukurKe: number;
  posisi: number;
  tolak: boolean;
  sudahBaca: boolean;
  ukurPilih: number;
  ukurBenar: number[];
  /** Ubah: sasaran ke berapa, pilihan (-1 bila belum), sasaran yang sudah benar. */
  ubahKe: number;
  ubahPilih: number;
  ubahBenar: number[];
  /** Sisi: sasaran ke berapa, banyak titik sudut yang sudah diberi huruf, pilihan, sasaran yang sudah benar. */
  sisiKe: number;
  huruf: number;
  sisiPilih: number;
  sisiBenar: number[];
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalBilah = (): KeadaanBilah => ({
  alat: "bilah",
  mode: "kenali",
  kenaliKe: 0,
  tarikKiri: false,
  tarikKanan: false,
  tarikTolak: false,
  kenaliPilih: -1,
  kenaliBenar: [],
  jalanKe: 0,
  jalanPilih: -1,
  jalanBenar: [],
  ukurKe: 0,
  posisi: TARGET_UKUR[0].awal,
  tolak: false,
  sudahBaca: false,
  ukurPilih: -1,
  ukurBenar: [],
  ubahKe: 0,
  ubahPilih: -1,
  ubahBenar: [],
  sisiKe: 0,
  huruf: 0,
  sisiPilih: -1,
  sisiBenar: [],
  salah: 0,
});
export const mulaiLagiBilah = (): KeadaanBilah => awalBilah();

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
export const pilihModeBilah = (k: KeadaanBilah, mode: ModeBilah): KeadaanBilah => ({ ...k, mode });

/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisip<T>(benar: T, lain: T[], geser: number): T[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}

/* ------------------------------ Kenali jenis garis ------------------------------ */
export const targetKenali = (k: KeadaanBilah) => TARGET_KENALI[k.kenaliKe % TARGET_KENALI.length];
const NAMA_JENIS = ["sinar garis", "garis", "ruas garis", "kurva"] as const;
/** Tiga nama jenis: yang benar tidak di tempat pertama dan tempatnya berganti tiap sasaran. */
export function pilihanKenali(k: KeadaanBilah): string[] {
  const benar = targetKenali(k).jenis;
  const lain = NAMA_JENIS.filter((x) => x !== benar);
  const dua = [lain[k.kenaliKe % 3], lain[(k.kenaliKe + 1) % 3]];
  return sisip<string>(benar, dua, k.kenaliKe + 1);
}
/** Tarik ujung kiri atau kanan gambar. Ruas garis punya dua ujung, sinar garis hanya bisa ditarik dari ujung bebasnya (kanan), garis bisa ditarik ke dua arah, kurva hanya meluruskan. */
export function tarikUjung(k: KeadaanBilah, sisi: "kiri" | "kanan"): { k: KeadaanBilah; ok: boolean; pesan: string } {
  const j = targetKenali(k).jenis;
  const ok = j === "garis" || (j === "sinar garis" && sisi === "kanan");
  const pesan =
    j === "ruas garis"
      ? "Ruas garis punya dua titik ujung, jadi tidak bisa ditarik terus ke satu arah."
      : j === "sinar garis"
        ? sisi === "kiri"
          ? "Ujung kiri adalah pangkal sinar garis, jadi tidak bisa ditarik ke kiri."
          : "Sinar garis bisa ditarik terus ke kanan, ke satu arah saja."
        : j === "garis"
          ? "Garis bisa ditarik terus ke dua arah, karena tidak punya ujung."
          : "Kurva melengkung. Ditarik pun tetap melengkung, bukan garis lurus.";
  if (!ok) return { k: { ...k, tarikTolak: true }, ok: false, pesan };
  return { k: sisi === "kiri" ? { ...k, tarikKiri: true } : { ...k, tarikKanan: true }, ok: true, pesan };
}
export function pilihKenali(k: KeadaanBilah, i: number): KeadaanBilah {
  return i < 0 || i >= 3 ? k : { ...k, kenaliPilih: i };
}
export function periksaKenali(k: KeadaanBilah): { k: KeadaanBilah; ok: boolean } {
  const t = targetKenali(k);
  if (k.kenaliPilih >= 0 && pilihanKenali(k)[k.kenaliPilih] === t.jenis) {
    const ke = k.kenaliKe + 1;
    return { k: { ...k, kenaliBenar: k.kenaliBenar.includes(k.kenaliKe) ? k.kenaliBenar : [...k.kenaliBenar, k.kenaliKe], kenaliKe: ke, kenaliPilih: -1, tarikKiri: false, tarikKanan: false, tarikTolak: false }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukKenali(k: KeadaanBilah): string {
  if (k.kenaliPilih < 0) return "Pilih satu nama jenis dulu.";
  return "Sinar garis berpangkal di satu titik dan menuju satu arah. Garis tidak punya ujung. Ruas garis punya dua titik ujung. Kurva melengkung atau berkelok. Tarik ujung gambar untuk mencobanya.";
}
export function kalimatKenali(k: KeadaanBilah): string {
  if (k.kenaliBenar.length > 0 && k.kenaliPilih < 0 && !k.tarikKiri && !k.tarikKanan && !k.tarikTolak) return "Betul! Ada gambar berikutnya.";
  return "Tarik ujung gambar untuk mencobanya, pilih nama jenisnya, lalu tekan Periksa.";
}

/* ------------------------------ Jalan terpendek ------------------------------ */
export const urutanJalan = (k: KeadaanBilah) => TARGET_JALAN[k.jalanKe % TARGET_JALAN.length];
export function pilihJalan(k: KeadaanBilah, i: number): KeadaanBilah {
  return i < 0 || i >= 3 ? k : { ...k, jalanPilih: i };
}
export function periksaJalan(k: KeadaanBilah): { k: KeadaanBilah; ok: boolean } {
  if (k.jalanPilih >= 0 && urutanJalan(k)[k.jalanPilih] === "lurus") return { k: { ...k, jalanBenar: k.jalanBenar.includes(k.jalanKe) ? k.jalanBenar : [...k.jalanBenar, k.jalanKe], jalanKe: k.jalanKe + 1, jalanPilih: -1 }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukJalan(k: KeadaanBilah): string {
  if (k.jalanPilih < 0) return "Pilih satu benang dulu.";
  return "Benang yang melengkung atau berkelok lebih panjang. Antara dua titik, ruas garis yang lurus adalah jalan yang paling pendek.";
}
export function kalimatJalan(k: KeadaanBilah): string {
  return k.jalanBenar.length > 0 && k.jalanPilih < 0 ? "Betul! Ada dua paku berikutnya." : "Pilih benang yang paling pendek antara dua paku, lalu tekan Periksa.";
}

/* ------------------------------ Ukur dari nol ------------------------------ */
export const targetUkur = (k: KeadaanBilah) => TARGET_UKUR[k.ukurKe % TARGET_UKUR.length];
/** Angka di ujung kanan bilah pada posisi sekarang (milimeter). */
export const ujungKananBilah = (k: KeadaanBilah): number => k.posisi + targetUkur(k).panjang;
export const diNol = (k: KeadaanBilah): boolean => k.posisi === 0;
/** Geser bilah (delta milimeter, negatif ke kiri); ujung kiri tidak boleh di bawah nol dan ujung kanan tidak boleh melewati ujung penggaris. */
export function geserBilah(k: KeadaanBilah, delta: number): { k: KeadaanBilah; ok: boolean } {
  const baru = k.posisi + delta;
  if (baru < 0 || baru + targetUkur(k).panjang > SKALA_BILAH) return { k, ok: false };
  return { k: { ...k, posisi: baru, sudahBaca: false, ukurPilih: -1 }, ok: true };
}
/** Minta alat membaca panjang bilah. Ditolak bila ujung kiri belum tepat di angka nol. */
export function bacaUkur(k: KeadaanBilah): { k: KeadaanBilah; ok: boolean } {
  if (!diNol(k)) return { k: { ...k, tolak: true }, ok: false };
  return { k: { ...k, sudahBaca: true }, ok: true };
}
/** Tiga pilihan bacaan (milimeter): yang benar (panjang), bacaan sebelum digeser (awal ditambah panjang), dan satu angka lain. Yang benar tidak di tempat pertama. */
export function pilihanUkur(k: KeadaanBilah): number[] {
  const t = targetUkur(k);
  const calon = [t.awal + t.panjang, t.panjang + 10, t.panjang - 5, t.panjang + 5].filter((x, i, a) => x >= 5 && x <= SKALA_BILAH && x !== t.panjang && a.indexOf(x) === i);
  return sisip(t.panjang, calon.slice(0, 2), t.panjang / 5);
}
export function pilihUkur(k: KeadaanBilah, i: number): KeadaanBilah {
  return i < 0 || i >= 3 || !k.sudahBaca ? k : { ...k, ukurPilih: i };
}
export function periksaUkur(k: KeadaanBilah): { k: KeadaanBilah; ok: boolean } {
  const t = targetUkur(k);
  if (k.sudahBaca && diNol(k) && k.ukurPilih >= 0 && pilihanUkur(k)[k.ukurPilih] === t.panjang) {
    const ke = k.ukurKe + 1;
    const n = TARGET_UKUR[ke % TARGET_UKUR.length];
    return { k: { ...k, ukurBenar: k.ukurBenar.includes(k.ukurKe) ? k.ukurBenar : [...k.ukurBenar, k.ukurKe], ukurKe: ke, posisi: n.awal, sudahBaca: false, ukurPilih: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukUkur(k: KeadaanBilah): string {
  if (!diNol(k)) return "Ujung kiri bilah belum tepat di angka nol. Geser bilah ke kiri dulu, baru alat mau membaca.";
  if (!k.sudahBaca) return "Tekan Baca dulu supaya alat membaca panjang bilah.";
  if (k.ukurPilih < 0) return "Pilih satu bacaan dulu.";
  return "Ujung kiri sudah di angka nol, jadi panjang bilah sama dengan angka di ujung kanan. Baca angka di ujung kanan, bukan angka sebelum bilah digeser.";
}
export function kalimatUkur(k: KeadaanBilah): string {
  if (k.ukurBenar.length > 0 && k.posisi === targetUkur(k).awal && !k.sudahBaca) return "Betul! Ada bilah berikutnya.";
  return diNol(k) ? "Ujung kiri sudah di angka nol. Tekan Baca, lalu pilih bacaan yang tepat." : "Geser bilah sampai ujung kirinya tepat di angka nol.";
}
export const kalimatPosisi = (k: KeadaanBilah): string => `Ujung kiri di ${kata(k.posisi)} milimeter, ujung kanan di ${kata(ujungKananBilah(k))} milimeter.`;

/* ------------------------------ Ubah satuan ------------------------------ */
export const targetUbah = (k: KeadaanBilah) => TARGET_UBAH[k.ubahKe % TARGET_UBAH.length];
/** Tulisan benar: semua milimeter ("75 mm") atau sentimeter desimal ("4,5 cm"). */
export const teksBenarUbah = (k: KeadaanBilah): string => {
  const t = targetUbah(k);
  return t.bentuk === "mm" ? `${t.cm * 10 + t.mm} mm` : `${t.cm},${t.mm} cm`;
};
/** Tiga cara menulis: yang benar, salah menganggap satu sentimeter seratus milimeter atau menggabung angka, dan jumlah angkanya. Yang benar tidak di tempat pertama. */
export function pilihanUbah(k: KeadaanBilah): string[] {
  const t = targetUbah(k);
  const benar = teksBenarUbah(k);
  const lain = t.bentuk === "mm" ? [`${t.cm * 100 + t.mm} mm`, `${t.cm + t.mm} mm`] : [`${t.cm * 10 + t.mm} cm`, `${t.cm},0${t.mm} cm`];
  return sisip(benar, lain, t.cm);
}
export function pilihUbah(k: KeadaanBilah, i: number): KeadaanBilah {
  return i < 0 || i >= 3 ? k : { ...k, ubahPilih: i };
}
export function periksaUbah(k: KeadaanBilah): { k: KeadaanBilah; ok: boolean } {
  if (k.ubahPilih >= 0 && pilihanUbah(k)[k.ubahPilih] === teksBenarUbah(k)) return { k: { ...k, ubahBenar: k.ubahBenar.includes(k.ubahKe) ? k.ubahBenar : [...k.ubahBenar, k.ubahKe], ubahKe: k.ubahKe + 1, ubahPilih: -1 }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukUbah(k: KeadaanBilah): string {
  if (k.ubahPilih < 0) return "Pilih satu tulisan dulu.";
  return targetUbah(k).bentuk === "mm"
    ? "Satu sentimeter sama dengan sepuluh milimeter. Kalikan sentimeter dengan sepuluh, lalu tambahkan milimeter yang tersisa."
    : "Sepuluh milimeter sama dengan satu sentimeter. Sentimeter ditulis di depan koma, dan milimeter yang tersisa menjadi angka setelah koma.";
}
export function kalimatUbah(k: KeadaanBilah): string {
  return k.ubahBenar.length > 0 && k.ubahPilih < 0 ? "Betul! Ada ukuran berikutnya." : "Tulis ukuran yang sama dengan cara yang diminta, lalu tekan Periksa.";
}

/* ------------------------------ Sisi bangun datar ------------------------------ */
export const targetSisi = (k: KeadaanBilah) => TARGET_SISI[k.sisiKe % TARGET_SISI.length];
export const banyakSisiSim = (k: KeadaanBilah): number => targetSisi(k).huruf.length;
/** Beri huruf pada titik sudut berikutnya. Ditolak bila semua titik sudut sudah bernama (atau bangun bundar tidak punya titik sudut). */
export function beriHuruf(k: KeadaanBilah): { k: KeadaanBilah; ok: boolean } {
  if (k.huruf >= banyakSisiSim(k)) return { k, ok: false };
  return { k: { ...k, huruf: k.huruf + 1, sisiPilih: -1 }, ok: true };
}
/** Tiga pilihan banyak sisi: yang benar tidak di tempat pertama. */
export function pilihanSisi(k: KeadaanBilah): number[] {
  const n = banyakSisiSim(k);
  const calon = [n + 1, n - 1, n + 2, n + 3].filter((x) => x >= 0 && x !== n);
  return sisip(n, calon.slice(0, 2), n + k.sisiKe);
}
export function pilihSisi(k: KeadaanBilah, i: number): KeadaanBilah {
  return i < 0 || i >= 3 ? k : { ...k, sisiPilih: i };
}
export function periksaSisi(k: KeadaanBilah): { k: KeadaanBilah; ok: boolean } {
  const n = banyakSisiSim(k);
  if (k.huruf >= n && k.sisiPilih >= 0 && pilihanSisi(k)[k.sisiPilih] === n) {
    const ke = k.sisiKe + 1;
    return { k: { ...k, sisiBenar: k.sisiBenar.includes(k.sisiKe) ? k.sisiBenar : [...k.sisiBenar, k.sisiKe], sisiKe: ke, huruf: 0, sisiPilih: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukSisi(k: KeadaanBilah): string {
  if (k.huruf < banyakSisiSim(k)) return "Beri huruf pada semua titik sudut dulu dengan menekan Beri huruf.";
  if (k.sisiPilih < 0) return "Pilih satu jumlah dulu.";
  return banyakSisiSim(k) === 0 ? "Tepi bangun bundar berupa kurva, bukan ruas garis lurus, jadi tidak ada sisi lurus." : "Sisi adalah ruas garis yang membatasi bangun. Hitung tiap ruas garis di antara dua titik sudut yang bersebelahan.";
}
export function kalimatSisi(k: KeadaanBilah): string {
  if (k.sisiBenar.length > 0 && k.huruf === 0 && k.sisiPilih < 0) return "Betul! Ada bangun berikutnya.";
  if (banyakSisiSim(k) === 0) return "Bangun ini bundar dan tidak punya titik sudut. Pilih banyak sisinya, lalu tekan Periksa.";
  return k.huruf < banyakSisiSim(k) ? "Tekan Beri huruf untuk menamai titik sudut satu per satu." : "Semua titik sudut sudah bernama. Pilih banyak sisinya, lalu tekan Periksa.";
}
/** Nama sisi dari huruf titik sudut yang sudah diberikan, mis. "PQ", "QR". Hanya sisi yang kedua ujungnya sudah bernama. */
export function sisiBernama(k: KeadaanBilah): string[] {
  const h = targetSisi(k).huruf;
  const n = h.length;
  const out: string[] = [];
  for (let i = 0; i < n; i += 1) if (i + 1 < k.huruf || (k.huruf === n && i + 1 === n)) out.push(`${h[i]}${h[(i + 1) % n]}`);
  return out;
}
