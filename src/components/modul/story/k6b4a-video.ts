import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_DATA, ADEGAN_PAGI } from "./k6b4a-materi-1";
import { ADEGAN_CONTOH, ADEGAN_PELUANG, ADEGAN_POSTER } from "./k6b4a-materi-2";
import { ADEGAN_LATIHAN, ADEGAN_RAK, ADEGAN_RODA } from "./k6b4a-materi-3";
import { ADEGAN_LUAR_KONTINUM, ADEGAN_LUAR_LSS, ADEGAN_LUAR_LSS_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_TAS } from "./k6b4a-luar-1";
import { ADEGAN_LUAR_BAHASA, ADEGAN_LUAR_BAHASA_TERAPAN, ADEGAN_LUAR_FREKUENSI, ADEGAN_LUAR_FREKUENSI_DADU, ADEGAN_LUAR_RINGKAS } from "./k6b4a-luar-2";

/**
 * Kelas 6 Bab 4 Sub-Bab A (Skala Peluang): video materi kurikulum dan video metode luar, dua video terpisah.
 * Adegan administratif (tujuan dan peta konsep) tetap ada di berkas materi, tetapi tidak diputar.
 */
export const VIDEO_MATERI_K6B4A: VideoStory = {
  id: "k6b4a-materi",
  judul: "Skala Peluang",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "skala peluang", daftar: ["Lima tingkat kemungkinan", "Menyusun skala dari jumlah", "Mencoba dengan roda putar"] }),
    ADEGAN_PAGI,
    ADEGAN_DATA,
    ADEGAN_POSTER,
    ADEGAN_PELUANG,
    ADEGAN_CONTOH,
    ADEGAN_RAK,
    ADEGAN_LATIHAN,
    ADEGAN_RODA,
  ],
};

export const VIDEO_LUAR_K6B4A: VideoStory = {
  id: "k6b4a-luar",
  judul: "Skala Peluang: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "skala peluang" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_LSS,
    ADEGAN_LUAR_LSS_TERAPAN,
    ADEGAN_LUAR_KONTINUM,
    ADEGAN_LUAR_TAS,
    ADEGAN_LUAR_BAHASA,
    ADEGAN_LUAR_BAHASA_TERAPAN,
    ADEGAN_LUAR_FREKUENSI,
    ADEGAN_LUAR_FREKUENSI_DADU,
    ADEGAN_LUAR_RINGKAS,
  ],
};
