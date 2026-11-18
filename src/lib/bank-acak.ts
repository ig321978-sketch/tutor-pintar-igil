/**
 * Bab yang Latihan dan Ujiannya memakai bank acak di server (server_chapters.mode_undian = 'acak').
 * Tambahkan kode bab di sini HANYA setelah seed bank bab itu diterapkan ke Supabase
 * (supabase/seed/02_<bab>_bank_keys.sql). Kode bab sama dengan chapter_id di berkas data bab.
 * Bila bab ada di daftar ini tetapi server belum memuat bank, Latihan jatuh kembali ke 10 soal di berkas bab.
 */
export const BAB_BANK_ACAK: ReadonlySet<string> = new Set(["k1-mat-bab1", "k1-mat-bab2", "k1-mat-bab3", "k1-mat-bab4", "k1-mat-bab5", "k1-mat-bab6", "k1-mat-bab7", "k1-mat-bab8"]);

export function babPakaiBankAcak(chapterId: string | undefined | null): boolean {
  return Boolean(chapterId) && BAB_BANK_ACAK.has(chapterId as string);
}
