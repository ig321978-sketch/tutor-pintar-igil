/**
 * Data Simulasi Pos Waktu Kelas 2 Bab 6 Sub-Bab B "Jadwal Lomba Bu Ratna": jam dinding dan jam digital, kegiatan pada bagian hari, lama dua kegiatan, dan selisih jam.
 * Berbeda dari Story (pembukaan, lomba lari, makan siang, tarik tambang, pesta penutupan, senam pagi, lompat tali). Diuji: scripts/uji-jadwal-k2b6b.mjs.
 */
export const MISI_JADWAL_TEKS =
  "Misi Pos Waktu: putar jarum pendek sampai pukul tiga tepat, samakan jam dinding dengan jam digital, taruh kegiatan pada bagian hari yang tepat, lalu bandingkan lama dua kegiatan. Urutannya bebas.";

/** Jam digital yang harus disamakan oleh jam dinding (jam dua puluh empat). */
export const SAMA_TARGET: readonly number[] = [10, 14, 21];

/** Kegiatan yang ditaruh pada bagian hari. */
export const HARI_KEGIATAN: readonly { nama: string; emoji: string; h: number }[] = [
  { nama: "Bangun tidur", emoji: "\u{1F6CF}", h: 5 },
  { nama: "Istirahat", emoji: "\u{1F96A}", h: 13 },
  { nama: "Layang-layang", emoji: "\u{1FA81}", h: 16 },
  { nama: "Melihat bintang", emoji: "\u{2B50}", h: 20 },
];

/** Pasangan kegiatan yang dibandingkan lamanya (menit). */
export const LAMA_PASANG: readonly { a: { nama: string; emoji: string; menit: number }; b: { nama: string; emoji: string; menit: number } }[] = [
  { a: { nama: "Menyikat gigi", emoji: "\u{1F9B7}", menit: 15 }, b: { nama: "Bermain bola", emoji: "\u{26BD}", menit: 120 } },
  { a: { nama: "Tidur siang", emoji: "\u{1F634}", menit: 120 }, b: { nama: "Makan", emoji: "\u{1F35A}", menit: 30 } },
  { a: { nama: "Membaca", emoji: "\u{1F4D6}", menit: 60 }, b: { nama: "Menonton pertunjukan", emoji: "\u{1F3AD}", menit: 180 } },
];

/** Kegiatan yang dihitung lamanya dari jam mulai sampai jam selesai (jam dua puluh empat). */
export const SELISIH_TARGET: readonly { nama: string; mulai: number; selesai: number }[] = [
  { nama: "Lompat jauh", mulai: 9, selesai: 12 },
  { nama: "Bola voli", mulai: 13, selesai: 17 },
  { nama: "Membaca dongeng", mulai: 18, selesai: 23 },
];

/** Warna empat bagian hari. */
export const WARNA_BAGIAN_SIM = { pagi: "#FDE68A", siang: "#FFC800", sore: "#FBA919", malam: "#C4B5FD" } as const;
