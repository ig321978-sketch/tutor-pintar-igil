/**
 * Logika murni Simulasi Petak Ubin Kelas 2 Bab 3 Sub-Bab A "Ubin untuk Taman Bermain" (bangun datar), awal cerita Taman Bermain Sekolah.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-ubin-k2b3a.mjs. Eksplorasi bebas tanpa skor.
 * Tiga alat untuk satu keranjang ubin: Hitung (tandai awal lalu hitung sisi berputar, lalu lihat nama), Pilah (segi banyak ke keranjang kuning,
 * bentuk lengkung ke keranjang hijau), dan Pasang (ubin ke petak yang bentuknya tepat). Data ubin ada di data-peta.ts (berbeda dari Story).
 */

export type JenisUbin = "lurus" | "lengkung";
export type BentukUbin = "segitiga" | "layang" | "lima" | "enam" | "delapan" | "lingkaran" | "lonjong";
/** Satu ubin di keranjang: `sisi` = banyak sisi lurus (nol untuk bentuk lengkung). */
export type UbinSim = { id: string; nama: string; emoji: string; warna: string; jenis: JenisUbin; sisi: number; bentuk: BentukUbin };
export type ModeUbin = "hitung" | "pilah" | "pasang";
export type Wadah = "kuning" | "hijau";

export type KeadaanUbin = {
  alat: "ubin";
  mode: ModeUbin;
  /** Ubin yang sedang dipegang (nomor dalam daftar), -1 bila belum ada. */
  pilih: number;
  /** Banyak sisi yang sudah dihitung berurutan pada ubin yang sedang dipegang. */
  langkah: number;
  /** Ubin yang sisinya sudah selesai dihitung dengan tanda awal. */
  dihitung: number[];
  /** Ubin yang namanya sudah dilihat. */
  namaDilihat: number[];
  /** Ubin yang sudah dipilah ke keranjang kuning (segi banyak) dan keranjang hijau (lengkung). */
  kuning: number[];
  hijau: number[];
  /** Ubin yang sudah dipasang pada petak yang tepat (petak ke-i untuk ubin ke-i). */
  dipasang: number[];
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salahHitung: number;
  salahPilah: number;
  salahPasang: number;
};

export const awalUbin = (): KeadaanUbin => ({
  alat: "ubin",
  mode: "hitung",
  pilih: -1,
  langkah: 0,
  dihitung: [],
  namaDilihat: [],
  kuning: [],
  hijau: [],
  dipasang: [],
  salahHitung: 0,
  salahPilah: 0,
  salahPasang: 0,
});
export const mulaiLagiUbin = (): KeadaanUbin => awalUbin();

/* ------------------------------ Kata dan nama bentuk (tanpa digit) ------------------------------ */
const KATA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"] as const;
export const kata = (n: number): string => KATA[n] ?? String(n);
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
/** Nama bentuk menurut banyak sisi lurus. Tujuh dan delapan hanya pengayaan. */
export const NAMA_SEGI: Record<number, string> = { 3: "segitiga", 4: "segi empat", 5: "segi lima", 6: "segi enam", 7: "segi tujuh", 8: "segi delapan" };
export const namaSisi = (n: number): string => NAMA_SEGI[n] ?? "segi banyak";
/** Nama bentuk sebuah ubin: segi banyak dinamai dari banyak sisinya; lingkaran dan lonjong dari bulat atau tidaknya. */
export const namaBentuk = (u: UbinSim): string => (u.jenis === "lurus" ? namaSisi(u.sisi) : u.bentuk === "lingkaran" ? "lingkaran" : "bentuk lengkung");

/* ------------------------------ Gambar bentuk (titik sudut relatif pusat) ------------------------------ */
export type Titik = { x: number; y: number };
const r1 = (n: number): number => Math.round(n * 10) / 10;
const beraturan = (n: number, r: number, awalDeg: number): Titik[] =>
  Array.from({ length: n }, (_, i) => {
    const a = ((awalDeg + (360 / n) * i) * Math.PI) / 180;
    return { x: r1(r * Math.cos(a)), y: r1(r * Math.sin(a)) };
  });
/** Titik sudut bentuk lurus berjari-jari `r`; null untuk bentuk lengkung (lingkaran dan lonjong). Banyak titik sama dengan banyak sisi. */
export function titikUbin(b: BentukUbin, r: number): Titik[] | null {
  switch (b) {
    case "segitiga":
      return [{ x: 0, y: r1(-r) }, { x: r1(r * 0.95), y: r1(r * 0.7) }, { x: r1(-r * 0.95), y: r1(r * 0.7) }];
    case "layang":
      return [{ x: 0, y: r1(-r) }, { x: r1(r * 0.62), y: r1(-r * 0.12) }, { x: 0, y: r1(r) }, { x: r1(-r * 0.62), y: r1(-r * 0.12) }];
    case "lima":
      return [{ x: 0, y: r1(-r) }, { x: r1(r), y: r1(-r * 0.25) }, { x: r1(r), y: r1(r * 0.8) }, { x: r1(-r), y: r1(r * 0.8) }, { x: r1(-r), y: r1(-r * 0.25) }];
    case "enam":
      return beraturan(6, r, 0);
    case "delapan":
      return beraturan(8, r, 22.5);
    default:
      return null;
  }
}
/** Setengah lebar dan setengah tinggi bentuk lengkung. */
export const ukuranLengkung = (b: BentukUbin, r: number): { rx: number; ry: number } => (b === "lonjong" ? { rx: r1(r), ry: r1(r * 0.62) } : { rx: r1(r), ry: r1(r) });

/* ------------------------------ Alat ------------------------------ */
export const pilihModeUbin = (k: KeadaanUbin, mode: ModeUbin): KeadaanUbin => ({ ...k, mode });

/** Pegang satu ubin. Ubin yang sudah selesai dihitung menampilkan hitungan penuh; yang lain mulai dari awal. */
export function pilihUbin(k: KeadaanUbin, i: number, d: readonly UbinSim[]): KeadaanUbin {
  if (i < 0 || i >= d.length) return k;
  if (k.pilih === i) return { ...k, pilih: -1, langkah: 0 };
  return { ...k, pilih: i, langkah: k.dihitung.includes(i) ? d[i].sisi : 0 };
}

export type HasilHitung = { k: KeadaanUbin; ok: boolean; selesai: boolean; perlu: "pilih" | "lengkung" | "sudah" | "awal" | null };
/**
 * Ketuk sisi bernomor `urutan` (mulai nol, berputar dari sisi bertanda awal). Hanya sisi berikutnya yang diterima;
 * melompat atau mengulang tidak mengubah hitungan. Bentuk lengkung tidak punya sisi untuk dihitung.
 */
export function ketukSisi(k: KeadaanUbin, urutan: number, d: readonly UbinSim[]): HasilHitung {
  if (k.pilih < 0) return { k, ok: false, selesai: false, perlu: "pilih" };
  const u = d[k.pilih];
  if (u.jenis === "lengkung") return { k, ok: false, selesai: false, perlu: "lengkung" };
  if (k.dihitung.includes(k.pilih)) return { k, ok: false, selesai: false, perlu: "sudah" };
  if (urutan !== k.langkah) return { k: { ...k, salahHitung: k.salahHitung + 1 }, ok: false, selesai: false, perlu: "awal" };
  const langkah = k.langkah + 1;
  const selesai = langkah === u.sisi;
  return { k: { ...k, langkah, dihitung: selesai ? [...k.dihitung, k.pilih] : k.dihitung }, ok: true, selesai, perlu: null };
}
/** Hitung ulang ubin yang sedang dipegang dari awal (tanda awal lagi). */
export const hitungUlang = (k: KeadaanUbin): KeadaanUbin => (k.pilih < 0 ? k : { ...k, langkah: 0, dihitung: k.dihitung.filter((x) => x !== k.pilih) });

/** Lihat nama bentuk: segi banyak baru dinamai setelah sisinya dihitung; bentuk lengkung boleh langsung. */
export function lihatNama(k: KeadaanUbin, d: readonly UbinSim[]): { k: KeadaanUbin; ok: boolean; perlu: "pilih" | "hitung" | null } {
  if (k.pilih < 0) return { k, ok: false, perlu: "pilih" };
  const u = d[k.pilih];
  if (u.jenis === "lurus" && !k.dihitung.includes(k.pilih)) return { k, ok: false, perlu: "hitung" };
  return { k: k.namaDilihat.includes(k.pilih) ? k : { ...k, namaDilihat: [...k.namaDilihat, k.pilih] }, ok: true, perlu: null };
}

/** Pilah ubin yang dipegang: keranjang kuning untuk segi banyak (tepi lurus), keranjang hijau untuk bentuk lengkung. */
export function pilahUbin(k: KeadaanUbin, wadah: Wadah, d: readonly UbinSim[]): { k: KeadaanUbin; ok: boolean; perlu: "pilih" | null } {
  if (k.pilih < 0) return { k, ok: false, perlu: "pilih" };
  const benar = (d[k.pilih].jenis === "lurus") === (wadah === "kuning");
  if (!benar) return { k: { ...k, salahPilah: k.salahPilah + 1 }, ok: false, perlu: null };
  const daftar = wadah === "kuning" ? k.kuning : k.hijau;
  if (daftar.includes(k.pilih)) return { k, ok: true, perlu: null };
  return { k: wadah === "kuning" ? { ...k, kuning: [...k.kuning, k.pilih] } : { ...k, hijau: [...k.hijau, k.pilih] }, ok: true, perlu: null };
}

/** Pasang ubin yang dipegang pada petak ke-`petak` (petak ke-i hanya muat ubin ke-i). */
export function pasangUbin(k: KeadaanUbin, petak: number, d: readonly UbinSim[]): { k: KeadaanUbin; ok: boolean; perlu: "pilih" | "terisi" | null } {
  if (k.pilih < 0) return { k, ok: false, perlu: "pilih" };
  if (petak < 0 || petak >= d.length) return { k, ok: false, perlu: null };
  if (k.dipasang.includes(petak)) return { k, ok: false, perlu: "terisi" };
  if (k.dipasang.includes(k.pilih)) return { k, ok: false, perlu: null };
  if (k.pilih !== petak) return { k: { ...k, salahPasang: k.salahPasang + 1 }, ok: false, perlu: null };
  return { k: { ...k, dipasang: [...k.dipasang, petak], pilih: -1, langkah: 0 }, ok: true, perlu: null };
}
export const semuaTerpasang = (k: KeadaanUbin, d: readonly UbinSim[]): boolean => k.dipasang.length === d.length;

/* ------------------------------ Kalimat untuk suara (tanpa digit) ------------------------------ */
/** Petunjuk saat ubin dipasang pada petak yang keliru: menyebut selisih ciri (lurus atau lengkung, banyak sisi, atau bulat tidaknya). */
export function petunjukPasang(ubin: UbinSim, petak: UbinSim): string {
  if (ubin.jenis !== petak.jenis) return ubin.jenis === "lurus" ? "Ubin ini bertepi lurus, sedangkan petaknya bertepi lengkung. Cari petak yang tepinya lurus." : "Ubin ini bertepi lengkung, sedangkan petaknya bertepi lurus. Cari petak yang tepinya melengkung.";
  if (ubin.jenis === "lurus" && ubin.sisi !== petak.sisi) return `Ubin ini punya ${kata(ubin.sisi)} sisi, sedangkan petak ini muat ${kata(petak.sisi)} sisi. Hitung sisi petaknya dulu.`;
  if (ubin.jenis === "lengkung") return "Keduanya lengkung, tetapi yang satu bulat sempurna dan yang lain lonjong. Putar ubinnya, dan lihat apakah selalu pas.";
  return "Sisinya sama banyak, tetapi bentuknya berbeda. Perhatikan sudut dan panjang sisinya.";
}

export function kalimatUbin(k: KeadaanUbin, d: readonly UbinSim[]): string {
  const u = k.pilih >= 0 ? d[k.pilih] : null;
  if (k.mode === "hitung") {
    if (!u) return "Ketuk satu ubin di keranjang dulu.";
    if (u.jenis === "lengkung") return `Tepi ${u.nama} melengkung, jadi tidak ada sisi lurus untuk dihitung. Ini bentuk lengkung.`;
    if (k.dihitung.includes(k.pilih)) return k.namaDilihat.includes(k.pilih) ? `${besar(u.nama)} termasuk ${namaBentuk(u)}.` : `Sudah ${kata(u.sisi)} sisi. Ketuk lihat nama untuk tahu namanya.`;
    if (k.langkah === 0) return "Mulai dari sisi yang bertanda bendera, lalu hitung berputar sampai kembali ke tanda.";
    return `Sudah ${kata(k.langkah)} sisi. Lanjut ke sisi di sebelahnya, jangan melompat.`;
  }
  if (k.mode === "pilah") return u ? `Tepi ${u.nama} ${u.jenis === "lurus" ? "lurus" : "melengkung"}. Masukkan ke keranjang yang pas.` : "Ketuk satu ubin dulu, lalu pilih keranjangnya.";
  if (semuaTerpasang(k, d)) return "Semua petak terisi pas. Papan permainan siap dibuka.";
  return u ? `Cari petak untuk ${u.nama}. Cocokkan tepi dan banyak sisinya.` : `Sudah ${kata(k.dipasang.length)} petak terisi. Ketuk satu ubin dulu, lalu ketuk petaknya.`;
}
