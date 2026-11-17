import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_CELAH, ADEGAN_KIRA_KIRA, ADEGAN_LANTAI_KOSONG, ADEGAN_UKUR_BENAR } from "./k1b7B-materi-1";
import { ADEGAN_ALAT_BEDA, ADEGAN_ATURAN } from "./k1b7B-materi-2";
import { ADEGAN_PENUTUP, ADEGAN_PETAK, ADEGAN_SELISIH } from "./k1b7B-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_ULANG, ADEGAN_LUAR_ULANG_TERAPAN } from "./k1b7B-luar-1";
import { ADEGAN_LUAR_KIRA, ADEGAN_LUAR_KIRA_TERAPAN, ADEGAN_LUAR_PETAK, ADEGAN_LUAR_PETAK_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k1b7B-luar-2";

/**
 * Kelas 1 Bab 7 Sub-Bab B (mengukur panjang benda), akhir cerita Rumah Pohon Abang.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Papan Lantai Rumah Pohon" (Igil, Kaka, Abang, Mamah, Kakek Jaya).
 * Video kedua: tiga metode global, terpisah.
 */
export const JUDUL_K1B7B = "Papan Lantai Rumah Pohon";

export const VIDEO_MATERI_K1B7B: VideoStory = {
  id: "k1b7B-materi",
  judul: JUDUL_K1B7B,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "mengukur panjang benda", daftar: ["Perkiraan dan cara mengukur", "Mengukur dengan jengkal", "Selisih perkiraan dan hasil"] }),
    ADEGAN_LANTAI_KOSONG,
    ADEGAN_KIRA_KIRA,
    ADEGAN_CELAH,
    ADEGAN_UKUR_BENAR,
    ADEGAN_ALAT_BEDA,
    ADEGAN_ATURAN,
    ADEGAN_SELISIH,
    ADEGAN_PETAK,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B7B: VideoStory = {
  id: "k1b7B-luar",
  judul: JUDUL_K1B7B,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "mengukur panjang benda", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_ULANG,
    ADEGAN_LUAR_ULANG_TERAPAN,
    ADEGAN_LUAR_KIRA,
    ADEGAN_LUAR_KIRA_TERAPAN,
    ADEGAN_LUAR_PETAK,
    ADEGAN_LUAR_PETAK_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
