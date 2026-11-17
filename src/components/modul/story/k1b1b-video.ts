import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BARISAN, ADEGAN_HADIAH, ADEGAN_HITUNG, ADEGAN_PASANGKAN } from "./k1b1b-materi-1";
import { ADEGAN_NOL, ADEGAN_SAMA } from "./k1b1b-materi-2";
import { ADEGAN_PAPAN, ADEGAN_PENUTUP } from "./k1b1b-materi-3";
import { ADEGAN_LUAR_BINGKAI, ADEGAN_LUAR_BINGKAI_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b1b-luar-1";
import { ADEGAN_LUAR_GARIS, ADEGAN_LUAR_GARIS_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SATU, ADEGAN_LUAR_SATU_TERAPAN } from "./k1b1b-luar-2";

/**
 * Kelas 1 Bab 1 Sub-Bab B (membandingkan banyak benda).
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Hadiah Nenek untuk Rak yang Lebih Sedikit",
 * lanjutan "Merapikan Lemari Mainan Igil" (Igil, Kaka, Abang, Mamah). Video kedua: tiga metode global, terpisah.
 */
export const JUDUL_K1B1B = "Hadiah Nenek untuk Rak yang Lebih Sedikit";

export const VIDEO_MATERI_K1B1B: VideoStory = {
  id: "k1b1b-materi",
  judul: JUDUL_K1B1B,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "membandingkan banyak benda", daftar: ["Memasangkan benda", "Lebih banyak dan lebih sedikit", "Sama banyak"] }),
    ADEGAN_HADIAH,
    ADEGAN_BARISAN,
    ADEGAN_PASANGKAN,
    ADEGAN_HITUNG,
    ADEGAN_SAMA,
    ADEGAN_NOL,
    ADEGAN_PAPAN,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B1B: VideoStory = {
  id: "k1b1b-luar",
  judul: JUDUL_K1B1B,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "membandingkan banyak benda", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BINGKAI,
    ADEGAN_LUAR_BINGKAI_TERAPAN,
    ADEGAN_LUAR_GARIS,
    ADEGAN_LUAR_GARIS_TERAPAN,
    ADEGAN_LUAR_SATU,
    ADEGAN_LUAR_SATU_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
