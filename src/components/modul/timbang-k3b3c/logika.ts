/**
 * Logika murni Simulasi Gudang Timbang Kelas 3 Bab 3 Sub-Bab C "Pakan Bu Lastri" (mengukur berat dengan satuan baku), tema Kebun Binatang Mini.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-timbang-k3b3c.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Nol (putar jarum timbangan duduk dan setel layar timbangan digital ke nol; alat menolak menimbang sebelum nol), Timbang (letakkan benda, baca berat, pilih ukuran bersatuan),
 * Pilih (pilih jenis timbangan dan satuan g atau kg untuk satu benda), dan Selisih (kurangi dua berat). Data ada di data-sim.ts.
 */
import {
  JARUM_AWAL,
  JARUM_MAKS,
  LAYAR_AWAL,
  LAYAR_LANGKAH,
  LAYAR_MAKS,
  MISI_TIMBANG_TEKS,
  NAMA_JENIS,
  TARGET_PILIH,
  TARGET_SELISIH,
  TARGET_TIMBANG,
  type SatuanBerat,
  type TargetPilih,
  type TargetSelisih,
  type TargetTimbang,
} from "./data-sim";

export { MISI_TIMBANG_TEKS };
export type ModeTimbang = "nol" | "timbang" | "pilih" | "selisih";

export type KeadaanTimbang = {
  alat: "timbang";
  mode: ModeTimbang;
  /** Nol: posisi jarum timbangan duduk (0 sampai 9 kg), angka layar timbangan digital (g), dan apakah masing-masing pernah tepat di nol. */
  jarum: number;
  layar: number;
  nolJarum: boolean;
  nolLayar: boolean;
  /** Banyak kali alat menolak menimbang karena belum di nol (hanya untuk misi bebas, bukan skor). */
  menolak: number;
  /** Timbang: benda ke berapa, apakah benda sudah diletakkan, ukuran yang dipilih (-1 bila belum), benda yang sudah benar, dan apakah benda ringan (g) dan berat (kg) pernah benar. */
  timbangKe: number;
  diletakkan: boolean;
  bacaPilih: number;
  bacaBenar: number[];
  ringanBenar: boolean;
  beratBenar: boolean;
  /** Pilih: sasaran ke berapa, jenis timbangan dan satuan yang dipilih (-1 bila belum), dan sasaran yang sudah benar. */
  pilihKe: number;
  pilihJenis: number;
  pilihSatuan: number;
  pilihBenar: number[];
  /** Selisih: sasaran ke berapa, pilihan (-1 bila belum), dan sasaran yang sudah benar. */
  selisihKe: number;
  selisihPilih: number;
  selisihBenar: number[];
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalTimbang = (): KeadaanTimbang => ({
  alat: "timbang",
  mode: "nol",
  jarum: JARUM_AWAL,
  layar: LAYAR_AWAL,
  nolJarum: false,
  nolLayar: false,
  menolak: 0,
  timbangKe: 0,
  diletakkan: false,
  bacaPilih: -1,
  bacaBenar: [],
  ringanBenar: false,
  beratBenar: false,
  pilihKe: 0,
  pilihJenis: -1,
  pilihSatuan: -1,
  pilihBenar: [],
  selisihKe: 0,
  selisihPilih: -1,
  selisihBenar: [],
  salah: 0,
});
export const mulaiLagiTimbang = (): KeadaanTimbang => awalTimbang();

/* ------------------------------ Kata (tanpa digit) ------------------------------ */
const SAT = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"] as const;
/** Nama bilangan 0 sampai 999 dalam kata. */
export function kata(n: number): string {
  if (n < 0 || n > 999 || !Number.isInteger(n)) return String(n);
  if (n < 10) return SAT[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SAT[n - 10]} belas`;
  if (n < 100) {
    const p = Math.floor(n / 10);
    const s = n % 10;
    return s === 0 ? `${SAT[p]} puluh` : `${SAT[p]} puluh ${SAT[s]}`;
  }
  const r = Math.floor(n / 100);
  const sisa = n % 100;
  const ratus = r === 1 ? "seratus" : `${SAT[r]} ratus`;
  return sisa === 0 ? ratus : `${ratus} ${kata(sisa)}`;
}
export const namaSatuan = (s: SatuanBerat): string => (s === "g" ? "gram" : "kilogram");
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
export { besar as hurufBesar };
export const pilihModeTimbang = (k: KeadaanTimbang, mode: ModeTimbang): KeadaanTimbang => ({ ...k, mode });
/** Ukuran bersatuan untuk tampilan, mis. "180 g". */
export const ukuran = (angka: number, satuan: SatuanBerat): string => `${angka} ${satuan}`;
/** Ukuran dalam kata untuk suara, mis. "seratus delapan puluh gram". */
export const ukuranKata = (angka: number, satuan: SatuanBerat): string => `${kata(angka)} ${namaSatuan(satuan)}`;
/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisipkan<T>(benar: T, lain: T[], geser: number): T[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}

/* ------------------------------ Nol ------------------------------ */
export const jarumDi = (k: KeadaanTimbang): number => k.jarum;
/** Putar jarum (tambah atau kurang satuan kilogram), 0 sampai 9. Jarum yang sampai di nol dicatat. */
export function putarJarum(k: KeadaanTimbang, delta: number): { k: KeadaanTimbang; ok: boolean } {
  const baru = k.jarum + delta;
  if (baru < 0 || baru > JARUM_MAKS) return { k, ok: false };
  return { k: { ...k, jarum: baru, nolJarum: k.nolJarum || baru === 0 }, ok: true };
}
/** Geser layar (per sepuluh gram), 0 sampai batas. Layar yang sampai di nol dicatat. */
export function geserLayar(k: KeadaanTimbang, delta: number): { k: KeadaanTimbang; ok: boolean } {
  const baru = k.layar + delta * LAYAR_LANGKAH;
  if (baru < 0 || baru > LAYAR_MAKS) return { k, ok: false };
  return { k: { ...k, layar: baru, nolLayar: k.nolLayar || baru === 0 }, ok: true };
}
/** Tombol nol pada timbangan digital. */
export const tekanNol = (k: KeadaanTimbang): KeadaanTimbang => ({ ...k, layar: 0, nolLayar: true });
export const sudahNol = (k: KeadaanTimbang, alat: "digital" | "duduk"): boolean => (alat === "duduk" ? k.jarum === 0 : k.layar === 0);
export function kalimatNol(k: KeadaanTimbang): string {
  if (k.jarum === 0 && k.layar === 0) return "Jarum dan layar sudah tepat di nol. Timbangan siap dipakai.";
  if (k.jarum === 0) return "Jarum sudah tepat di nol. Layar timbangan digital belum di nol.";
  if (k.layar === 0) return "Layar sudah tepat di nol. Jarum timbangan duduk belum di nol.";
  return "Jarum dan layar belum di nol. Putar jarum dan setel layar sampai tepat di nol.";
}

/* ------------------------------ Timbang ------------------------------ */
export const targetTimbang = (k: KeadaanTimbang): TargetTimbang => TARGET_TIMBANG[k.timbangKe % TARGET_TIMBANG.length];
export type HasilLetak = { k: KeadaanTimbang; ok: boolean; alasan: "nol" | "sudah" | "ok" };
/** Letakkan benda. Alat menolak bila jarum atau layar yang dipakai belum di nol. */
export function letakkanBenda(k: KeadaanTimbang): HasilLetak {
  if (k.diletakkan) return { k, ok: false, alasan: "sudah" };
  const t = targetTimbang(k);
  if (!sudahNol(k, t.alat)) return { k: { ...k, menolak: k.menolak + 1 }, ok: false, alasan: "nol" };
  return { k: { ...k, diletakkan: true }, ok: true, alasan: "ok" };
}
export const angkatBenda = (k: KeadaanTimbang): KeadaanTimbang => ({ ...k, diletakkan: false, bacaPilih: -1 });
/** Tiga ukuran bersatuan: yang benar, satuan yang keliru, dan bilangan yang keliru. Yang benar tidak di tempat pertama. */
export function pilihanBaca(k: KeadaanTimbang): string[] {
  const t = targetTimbang(k);
  const lain: SatuanBerat = t.satuan === "g" ? "kg" : "g";
  const bilanganKeliru = t.angka >= 100 ? Math.round(t.angka / 10) : t.angka * 10;
  return sisipkan(ukuran(t.angka, t.satuan), [ukuran(t.angka, lain), ukuran(bilanganKeliru, t.satuan)], t.angka);
}
export function pilihBaca(k: KeadaanTimbang, i: number): KeadaanTimbang {
  return i < 0 || i >= 3 ? k : { ...k, bacaPilih: i };
}
export function periksaBaca(k: KeadaanTimbang): { k: KeadaanTimbang; ok: boolean } {
  const t = targetTimbang(k);
  const pil = pilihanBaca(k);
  if (k.diletakkan && k.bacaPilih >= 0 && pil[k.bacaPilih] === ukuran(t.angka, t.satuan)) {
    return {
      k: {
        ...k,
        bacaBenar: k.bacaBenar.includes(k.timbangKe) ? k.bacaBenar : [...k.bacaBenar, k.timbangKe],
        ringanBenar: k.ringanBenar || t.satuan === "g",
        beratBenar: k.beratBenar || t.satuan === "kg",
        timbangKe: k.timbangKe + 1,
        diletakkan: false,
        bacaPilih: -1,
      },
      ok: true,
    };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukBaca(k: KeadaanTimbang): string {
  const t = targetTimbang(k);
  if (!k.diletakkan) return sudahNol(k, t.alat) ? "Letakkan bendanya di timbangan dulu." : "Setel timbangan itu ke nol dulu, lalu letakkan bendanya.";
  if (k.bacaPilih < 0) return "Pilih satu ukuran dulu.";
  return "Baca angka pada layar atau jarum, lalu tulis dengan satuan yang cocok: gram untuk benda ringan dan kilogram untuk benda berat.";
}
export function kalimatTimbang(k: KeadaanTimbang): string {
  const t = targetTimbang(k);
  if (k.bacaBenar.length > 0 && !k.diletakkan && k.bacaPilih < 0 && k.bacaBenar.includes(k.timbangKe - 1)) return "Betul! Beratnya tepat. Ada benda berikutnya.";
  if (k.diletakkan) return `Layar atau jarum menunjukkan berat ${t.benda}. Pilih ukuran yang tepat, lalu tekan Periksa.`;
  return "Setel timbangan ke nol, letakkan benda, baca beratnya, lalu tekan Periksa.";
}
export function kalimatTolak(t: TargetTimbang): string {
  return t.alat === "duduk" ? "Alat menolak menimbang. Jarum timbangan duduk belum di nol, putar dulu sampai tepat di nol." : "Alat menolak menimbang. Layar timbangan digital belum di nol, tekan tombol nol dulu.";
}

/* ------------------------------ Pilih timbangan dan satuan ------------------------------ */
export const targetPilih = (k: KeadaanTimbang): TargetPilih => TARGET_PILIH[k.pilihKe % TARGET_PILIH.length];
export function pilihJenis(k: KeadaanTimbang, i: number): KeadaanTimbang {
  return i < 0 || i >= NAMA_JENIS.length ? k : { ...k, pilihJenis: i };
}
export function pilihSatuan(k: KeadaanTimbang, i: number): KeadaanTimbang {
  return i !== 0 && i !== 1 ? k : { ...k, pilihSatuan: i };
}
export function periksaPilih(k: KeadaanTimbang): { k: KeadaanTimbang; ok: boolean } {
  const t = targetPilih(k);
  const jenisBenar = ["digital", "duduk", "badan"].indexOf(t.jenis);
  const satuanBenar = t.satuan === "g" ? 0 : 1;
  if (k.pilihJenis === jenisBenar && k.pilihSatuan === satuanBenar)
    return { k: { ...k, pilihBenar: k.pilihBenar.includes(k.pilihKe) ? k.pilihBenar : [...k.pilihBenar, k.pilihKe], pilihKe: k.pilihKe + 1, pilihJenis: -1, pilihSatuan: -1 }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukPilih(k: KeadaanTimbang): string {
  if (k.pilihJenis < 0) return "Pilih jenis timbangan dulu.";
  if (k.pilihSatuan < 0) return "Pilih satuannya dulu.";
  const t = targetPilih(k);
  const jenisBenar = ["digital", "duduk", "badan"].indexOf(t.jenis);
  if (k.pilihJenis !== jenisBenar) return "Sesuaikan timbangan dengan bendanya: benda kecil dan ringan di timbangan digital, benda berat di timbangan duduk, dan hewan atau orang di timbangan badan.";
  return "Benda ringan memakai gram, benda berat memakai kilogram. Pilih satuan yang membuat bilangannya mudah dibaca.";
}
export function kalimatPilih(k: KeadaanTimbang): string {
  return k.pilihBenar.length > 0 && k.pilihJenis < 0 && k.pilihSatuan < 0 ? "Betul! Timbangan dan satuannya tepat. Ada benda berikutnya." : "Pilih jenis timbangan dan satuan untuk benda itu, lalu tekan Periksa.";
}

/* ------------------------------ Selisih ------------------------------ */
export const targetSelisih = (k: KeadaanTimbang): TargetSelisih => TARGET_SELISIH[k.selisihKe % TARGET_SELISIH.length];
export const selisihDari = (t: TargetSelisih): number => t.wa - t.wb;
/** Tiga pilihan selisih: yang benar, jumlah kedua berat, dan berat yang lebih kecil. Yang benar tidak di tempat pertama. */
export function pilihanSelisih(k: KeadaanTimbang): string[] {
  const t = targetSelisih(k);
  const s = selisihDari(t);
  return sisipkan(ukuran(s, t.satuan), [ukuran(t.wa + t.wb, t.satuan), ukuran(t.wb, t.satuan)], s);
}
export function pilihSelisih(k: KeadaanTimbang, i: number): KeadaanTimbang {
  return i < 0 || i >= 3 ? k : { ...k, selisihPilih: i };
}
export function periksaSelisih(k: KeadaanTimbang): { k: KeadaanTimbang; ok: boolean } {
  const t = targetSelisih(k);
  const pil = pilihanSelisih(k);
  if (k.selisihPilih >= 0 && pil[k.selisihPilih] === ukuran(selisihDari(t), t.satuan))
    return { k: { ...k, selisihBenar: k.selisihBenar.includes(k.selisihKe) ? k.selisihBenar : [...k.selisihBenar, k.selisihKe], selisihKe: k.selisihKe + 1, selisihPilih: -1 }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukSelisih(k: KeadaanTimbang): string {
  if (k.selisihPilih < 0) return "Pilih satu ukuran dulu.";
  return "Selisih didapat dengan mengurangkan berat yang besar dengan berat yang kecil, dan satuannya tetap sama.";
}
export function kalimatSelisih(k: KeadaanTimbang): string {
  return k.selisihBenar.length > 0 && k.selisihPilih < 0 ? "Betul! Selisihnya tepat. Ada pasangan berikutnya." : "Kurangi berat yang besar dengan berat yang kecil, lalu pilih selisihnya.";
}
