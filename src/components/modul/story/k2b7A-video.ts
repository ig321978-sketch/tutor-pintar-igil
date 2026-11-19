import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_GEROBAK_BOTOL, ADEGAN_SALAH_HITUNG, ADEGAN_SATU_IKAT } from "./k2b7A-materi-1";
import { ADEGAN_DUA_CARA, ADEGAN_IKAT_LEPAS, ADEGAN_SAMPAI_SERATUS } from "./k2b7A-materi-2";
import { ADEGAN_KIRA_KIRA, ADEGAN_PENUTUP, ADEGAN_TULIS_TERBALIK } from "./k2b7A-materi-3";
import { ADEGAN_LUAR_BINGKAI, ADEGAN_LUAR_BINGKAI_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k2b7A-luar-1";
import { ADEGAN_LUAR_BALOK, ADEGAN_LUAR_BALOK_TERAPAN, ADEGAN_LUAR_LONCAT, ADEGAN_LUAR_LONCAT_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k2b7A-luar-2";

/**
 * Kelas 2 Bab 7 Sub-Bab A (menghitung, membaca, dan menulis bilangan sampai seratus), awal cerita Bank Sampah Sekolah.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Botol Pak Ujang" (Chacha, Dika, Nia, Bu Sari, Pak Ujang).
 * Video kedua: tiga metode global (Ten Frame, Skip Counting, Base Ten Blocks), terpisah.
 */
export const JUDUL_K2B7A = "Botol Pak Ujang";

export const VIDEO_MATERI_K2B7A: VideoStory = {
  id: "k2b7A-materi",
  judul: JUDUL_K2B7A,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "bilangan sampai seratus", daftar: ["Menghitung puluhan dan satuan", "Membaca dan menulis bilangan", "Memperkirakan banyak benda"] }),
    ADEGAN_GEROBAK_BOTOL,
    ADEGAN_SATU_IKAT,
    ADEGAN_SALAH_HITUNG,
    ADEGAN_SAMPAI_SERATUS,
    ADEGAN_IKAT_LEPAS,
    ADEGAN_DUA_CARA,
    ADEGAN_TULIS_TERBALIK,
    ADEGAN_KIRA_KIRA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B7A: VideoStory = {
  id: "k2b7A-luar",
  judul: JUDUL_K2B7A,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "bilangan sampai seratus", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BINGKAI,
    ADEGAN_LUAR_BINGKAI_TERAPAN,
    ADEGAN_LUAR_LONCAT,
    ADEGAN_LUAR_LONCAT_TERAPAN,
    ADEGAN_LUAR_BALOK,
    ADEGAN_LUAR_BALOK_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
