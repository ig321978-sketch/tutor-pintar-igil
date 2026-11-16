/**
 * Kalimat umpan balik belajar bersama (semua tahap, semua sub-bab). Tanpa penilaian:
 * tidak ada skor, poin, peringkat, atau catatan benar-salah. Tiap kalimat paling banyak delapan kata, tanpa digit.
 * Diperiksa uji (scripts/uji-opsi2-mesin.mjs).
 */
export const UMPAN_BENAR = ["Betul! Hebat sekali.", "Tepat! Kamu pandai.", "Bagus! Itu benar."] as const;
export const UMPAN_SALAH_BAWAAN = "Belum pas. Coba lagi pelan-pelan.";
export const UMPAN_HABIS = "Tidak apa-apa. Lihat jawaban yang benar.";
export const UMPAN_BELUM_LENGKAP = "Selesaikan tindakannya dulu, ya.";
export const UMPAN_DENGAR = "Dengarkan soalnya.";

export const semuaUmpan = (): string[] => [...UMPAN_BENAR, UMPAN_SALAH_BAWAAN, UMPAN_HABIS, UMPAN_BELUM_LENGKAP, UMPAN_DENGAR];

export const umpanBenar = (nomor: number): string => UMPAN_BENAR[nomor % UMPAN_BENAR.length];
