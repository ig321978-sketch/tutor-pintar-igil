import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_ANGIN, ADEGAN_ATURAN, ADEGAN_TUMPUK } from "./k2b3B-materi-1";
import { ADEGAN_SEGIENAM, ADEGAN_SUSUN, ADEGAN_URAI } from "./k2b3B-materi-2";
import { ADEGAN_PENUTUP_B, ADEGAN_POLA, ADEGAN_TANGRAM } from "./k2b3B-materi-3";
import { ADEGAN_LUAR_BLOK, ADEGAN_LUAR_BLOK_TERAPAN, ADEGAN_LUAR_LIPAT, ADEGAN_LUAR_PEMBUKA } from "./k2b3B-luar-1";
import { ADEGAN_LUAR_BAYANGAN, ADEGAN_LUAR_BAYANGAN_TERAPAN, ADEGAN_LUAR_LIPAT_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k2b3B-luar-2";

/**
 * Kelas 2 Bab 3 Sub-Bab B (mengurai dan menyusun bangun datar), tengah cerita Taman Bermain Sekolah.
 * Video materi (tiga ketukan tiap adegan, tanpa latihan): cerita orisinal IGIL "Papan Puzzle yang Berantakan" (Chacha, Dika, Nia, Bu Sari, Bu Ratna).
 * Video kedua: tiga metode global (Pattern Blocks, Paper Folding, Silhouette Puzzle), terpisah.
 */
export const JUDUL_K2B3B = "Papan Puzzle yang Berantakan";

export const VIDEO_MATERI_K2B3B: VideoStory = {
  id: "k2b3B-materi",
  judul: JUDUL_K2B3B,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "mengurai dan menyusun bangun datar", daftar: ["Mengurai satu bangun menjadi beberapa bagian", "Menyusun beberapa bagian menjadi satu bentuk", "Bermain tangram"] }),
    ADEGAN_ANGIN,
    ADEGAN_TUMPUK,
    ADEGAN_ATURAN,
    ADEGAN_URAI,
    ADEGAN_SUSUN,
    ADEGAN_SEGIENAM,
    ADEGAN_TANGRAM,
    ADEGAN_POLA,
    ADEGAN_PENUTUP_B,
  ],
};

export const VIDEO_LUAR_K2B3B: VideoStory = {
  id: "k2b3B-luar",
  judul: JUDUL_K2B3B,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "mengurai dan menyusun bangun datar", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BLOK,
    ADEGAN_LUAR_BLOK_TERAPAN,
    ADEGAN_LUAR_LIPAT,
    ADEGAN_LUAR_LIPAT_TERAPAN,
    ADEGAN_LUAR_BAYANGAN,
    ADEGAN_LUAR_BAYANGAN_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
