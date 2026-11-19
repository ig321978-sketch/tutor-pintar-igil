/**
 * Logika murni Simulasi Gudang Ikat Kelas 2 Bab 7 Sub-Bab A "Botol Pak Ujang" (bilangan sampai seratus), awal cerita Bank Sampah Sekolah.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-ikat-k2b7a.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Ikat (mengikat benda sepuluh-sepuluh menjadi puluhan), Papan (menaruh puluhan dan satuan di papan puluhan dan satuan), Tulis (memilih angka puluhan dan satuan,
 * atau menukarnya) dan Kira (membuat perkiraan lebih dulu, lalu membuktikan dengan mengikat). Banyak benda ada di data-peta.ts (berbeda dari Story) dan tidak ditulis di layar.
 */
import { BATAS_DEKAT, BENDA_SIM } from "./data-peta";

export type ModeIkat = "ikat" | "papan" | "tulis" | "kira";

export type KeadaanIkat = {
  alat: "ikat";
  mode: ModeIkat;
  /** Tumpukan benda yang dipilih (nomor dalam BENDA_SIM). */
  jenis: number;
  /** Banyak ikat yang sudah dibuat untuk tiap tumpukan. */
  diikat: number[];
  /** Tumpukan yang sudah diikat sampai tidak ada lagi yang bisa diikat. */
  selesaiIkat: number[];
  /** Angka di papan puluhan dan satuan, dan tumpukan yang papannya sudah benar. */
  papanP: number;
  papanS: number;
  papanBenar: number[];
  /** Angka puluhan dan satuan yang dipilih untuk menulis bilangan (-1 bila belum), tumpukan yang tulisannya sudah benar, dan pernah menukar angka sampai bilangannya berbeda. */
  tulisP: number;
  tulisS: number;
  tulisBenar: number[];
  terbalik: boolean;
  /** Perkiraan tiap tumpukan (-1 bila belum), perkiraan yang dekat, dan tumpukan yang perkiraannya sudah dibuktikan dengan mengikat. */
  kira: number[];
  kiraDekat: number[];
  kiraTuntas: number[];
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalIkat = (): KeadaanIkat => ({
  alat: "ikat",
  mode: "ikat",
  jenis: 0,
  diikat: BENDA_SIM.map(() => 0),
  selesaiIkat: [],
  papanP: 0,
  papanS: 0,
  papanBenar: [],
  tulisP: -1,
  tulisS: -1,
  tulisBenar: [],
  terbalik: false,
  kira: BENDA_SIM.map(() => -1),
  kiraDekat: [],
  kiraTuntas: [],
  salah: 0,
});
export const mulaiLagiIkat = (): KeadaanIkat => awalIkat();

/* ------------------------------ Kata (tanpa digit) ------------------------------ */
const SAT = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"] as const;
/** Nama bilangan 0 sampai 100 dalam kata. */
export function kata(n: number): string {
  if (n === 100) return "seratus";
  if (n < 10) return SAT[n] ?? String(n);
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SAT[n - 10]} belas`;
  const p = Math.floor(n / 10);
  const s = n % 10;
  return s === 0 ? `${SAT[p]} puluh` : `${SAT[p]} puluh ${SAT[s]}`;
}
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
export { besar as hurufBesar };

export const pilihModeIkat = (k: KeadaanIkat, mode: ModeIkat): KeadaanIkat => ({ ...k, mode });
/** Ganti tumpukan: papan dan pilihan angka dikosongkan untuk tumpukan baru. */
export function pilihJenis(k: KeadaanIkat, i: number): KeadaanIkat {
  if (i < 0 || i >= BENDA_SIM.length || i === k.jenis) return k;
  return { ...k, jenis: i, papanP: 0, papanS: 0, tulisP: -1, tulisS: -1 };
}

/* ------------------------------ Ikat ------------------------------ */
export const banyakBenda = (i: number): number => BENDA_SIM[i].banyak;
/** Benda lepas yang belum diikat pada tumpukan i. */
export const lepasDi = (k: KeadaanIkat, i: number): number => banyakBenda(i) - k.diikat[i] * 10;
export const puluhanDi = (i: number): number => Math.floor(banyakBenda(i) / 10);
export const satuanDi = (i: number): number => banyakBenda(i) % 10;
/** Ikat sepuluh benda lepas menjadi satu ikat. Bila tinggal kurang dari sepuluh, tumpukan selesai diikat; bila perkiraannya sudah dibuat, terbukti. */
export function ikatSepuluh(k: KeadaanIkat): { k: KeadaanIkat; ok: boolean } {
  const i = k.jenis;
  if (lepasDi(k, i) < 10) return { k, ok: false };
  const diikat = k.diikat.map((n, j) => (j === i ? n + 1 : n));
  let baru: KeadaanIkat = { ...k, diikat };
  if (lepasDi(baru, i) < 10) {
    if (!baru.selesaiIkat.includes(i)) baru = { ...baru, selesaiIkat: [...baru.selesaiIkat, i] };
    if (baru.kira[i] >= 0 && !baru.kiraTuntas.includes(i)) {
      const dekat = Math.abs(baru.kira[i] - banyakBenda(i)) <= BATAS_DEKAT;
      baru = { ...baru, kiraTuntas: [...baru.kiraTuntas, i], kiraDekat: dekat && !baru.kiraDekat.includes(i) ? [...baru.kiraDekat, i] : baru.kiraDekat };
    }
  }
  return { k: baru, ok: true };
}
/** Lepas satu ikat kembali menjadi benda lepas. */
export function lepasIkat(k: KeadaanIkat): { k: KeadaanIkat; ok: boolean } {
  const i = k.jenis;
  if (k.diikat[i] <= 0) return { k, ok: false };
  return { k: { ...k, diikat: k.diikat.map((n, j) => (j === i ? n - 1 : n)) }, ok: true };
}
export function kalimatIkat(k: KeadaanIkat): string {
  const i = k.jenis;
  const n = BENDA_SIM[i].nama;
  const p = k.diikat[i];
  const s = lepasDi(k, i);
  if (p === 0) return `Ada setumpuk ${n}. Ketuk Ikat sepuluh untuk mengikat sepuluh ${n}.`;
  if (s >= 10) return `Sudah ${kata(p)} ikat, itu ${kata(p)} puluhan. Masih ada ${n} yang bisa diikat lagi.`;
  return `Selesai! ${besar(kata(p))} ikat berarti ${kata(p)} puluhan, dan ${s === 0 ? "tidak ada satuan" : `${kata(s)} ${n} lepas adalah ${kata(s)} satuan`}.`;
}

/* ------------------------------ Papan ------------------------------ */
export const bilanganPapan = (k: KeadaanIkat): number => k.papanP * 10 + k.papanS;
/** Tambah (arah 1) atau kurangi (arah -1) satu pada kolom puluhan atau satuan. Paling banyak sembilan per kolom. */
export function ubahPapan(k: KeadaanIkat, kolom: "puluhan" | "satuan", arah: 1 | -1): { k: KeadaanIkat; ok: boolean } {
  const lama = kolom === "puluhan" ? k.papanP : k.papanS;
  const baru = lama + arah;
  if (baru < 0 || baru > 9) return { k, ok: false };
  return { k: kolom === "puluhan" ? { ...k, papanP: baru } : { ...k, papanS: baru }, ok: true };
}
/** Periksa papan: sama dengan banyak benda tumpukan yang dipilih? Benar dicatat; salah menambah hitungan percobaan. */
export function periksaPapan(k: KeadaanIkat): { k: KeadaanIkat; ok: boolean } {
  const i = k.jenis;
  if (bilanganPapan(k) === banyakBenda(i)) return { k: k.papanBenar.includes(i) ? k : { ...k, papanBenar: [...k.papanBenar, i] }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukPapan(k: KeadaanIkat): string {
  const i = k.jenis;
  const kurang = bilanganPapan(k) < banyakBenda(i);
  if (k.papanP === puluhanDi(i) && k.papanS !== satuanDi(i)) return "Banyak puluhannya sudah tepat. Periksa lagi benda yang lepas, yaitu satuannya.";
  if (k.papanP !== puluhanDi(i) && k.papanS === satuanDi(i)) return "Banyak satuannya sudah tepat. Periksa lagi banyak ikat, yaitu puluhannya.";
  return kurang ? "Bilangan di papan masih kurang dari banyak benda. Ikat benda dulu di alat Ikat untuk mengetahui puluhan dan satuannya." : "Bilangan di papan sudah terlalu banyak. Ikat benda dulu di alat Ikat untuk mengetahui puluhan dan satuannya.";
}
export function kalimatPapan(k: KeadaanIkat): string {
  if (k.papanP === 0 && k.papanS === 0) return "Atur puluhan dan satuan di papan, lalu ketuk Periksa.";
  return `Papan menunjukkan ${kata(k.papanP)} puluhan dan ${kata(k.papanS)} satuan, yaitu ${kata(bilanganPapan(k))}.`;
}

/* ------------------------------ Tulis ------------------------------ */
export const bilanganTulis = (k: KeadaanIkat): number => (k.tulisP < 0 || k.tulisS < 0 ? -1 : k.tulisP * 10 + k.tulisS);
export function pilihAngka(k: KeadaanIkat, kolom: "puluhan" | "satuan", n: number): KeadaanIkat {
  if (n < 0 || n > 9) return k;
  return kolom === "puluhan" ? { ...k, tulisP: n } : { ...k, tulisS: n };
}
/** Tukar angka puluhan dan satuan. Bila keduanya sudah dipilih dan berbeda, tercatat pernah melihat bilangan yang berbeda. */
export function tukarAngka(k: KeadaanIkat): { k: KeadaanIkat; ok: boolean } {
  if (k.tulisP < 0 || k.tulisS < 0) return { k, ok: false };
  const baru = { ...k, tulisP: k.tulisS, tulisS: k.tulisP };
  return { k: k.tulisP !== k.tulisS ? { ...baru, terbalik: true } : baru, ok: true };
}
export function periksaTulis(k: KeadaanIkat): { k: KeadaanIkat; ok: boolean } {
  const i = k.jenis;
  if (bilanganTulis(k) === banyakBenda(i)) return { k: k.tulisBenar.includes(i) ? k : { ...k, tulisBenar: [...k.tulisBenar, i] }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukTulis(k: KeadaanIkat): string {
  const i = k.jenis;
  if (k.tulisP < 0 || k.tulisS < 0) return "Pilih angka untuk puluhan dan angka untuk satuan dulu.";
  if (k.tulisP === satuanDi(i) && k.tulisS === puluhanDi(i) && k.tulisP !== k.tulisS) return "Angkanya benar, tetapi tertukar. Puluhan ditulis di kiri dan satuan di kanan.";
  return "Bilangan itu belum sama dengan banyak benda. Ikat benda di alat Ikat, lalu baca puluhan dan satuannya.";
}
export function kalimatTulis(k: KeadaanIkat): string {
  const n = bilanganTulis(k);
  if (n < 0) return "Pilih angka puluhan di kiri dan angka satuan di kanan.";
  return `Tulisanmu dibaca ${kata(n)}: ${kata(k.tulisP)} puluhan dan ${kata(k.tulisS)} satuan.`;
}
/** Kalimat setelah menukar angka. */
export function kalimatTukar(k: KeadaanIkat): string {
  const n = bilanganTulis(k);
  return n < 0 ? "Pilih kedua angka dulu." : `Setelah ditukar menjadi ${kata(n)}. Angka yang tertukar membuat bilangan yang berbeda.`;
}

/* ------------------------------ Kira ------------------------------ */
/** Perkiraan hanya boleh dibuat sebelum tumpukan itu diikat dan hanya sekali. */
export function pilihKira(k: KeadaanIkat, n: number): { k: KeadaanIkat; ok: boolean } {
  const i = k.jenis;
  if (k.diikat[i] > 0 || k.kira[i] >= 0 || !BENDA_SIM[i].kira.includes(n)) return { k, ok: false };
  return { k: { ...k, kira: k.kira.map((x, j) => (j === i ? n : x)) }, ok: true };
}
export function kalimatKira(k: KeadaanIkat): string {
  const i = k.jenis;
  const n = BENDA_SIM[i].nama;
  if (k.kira[i] < 0) return k.diikat[i] > 0 ? `Tumpukan ${n} ini sudah mulai diikat. Pilih tumpukan lain untuk membuat perkiraan, atau mulai lagi.` : `Kira-kira ada berapa ${n}? Pilih perkiraan, lalu buktikan dengan mengikat sepuluh-sepuluh.`;
  if (k.kiraTuntas.includes(i)) {
    const sebenarnya = banyakBenda(i);
    const dekat = Math.abs(k.kira[i] - sebenarnya) <= BATAS_DEKAT;
    return dekat ? `Terbukti ada ${kata(sebenarnya)} ${n}. Perkiraanmu ${kata(k.kira[i])} dekat sekali!` : `Terbukti ada ${kata(sebenarnya)} ${n}. Perkiraanmu ${kata(k.kira[i])} masih jauh. Keliru boleh, mari coba perkiraan yang lain.`;
  }
  return `Perkiraanmu ${kata(k.kira[i])}. Ketuk Ikat sepuluh sampai semua ${n} yang bisa diikat sudah diikat.`;
}
