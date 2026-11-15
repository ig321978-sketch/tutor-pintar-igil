import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BINGKAI, ADEGAN_EKSPLORASI_ALAT, ADEGAN_EKSPLORASI_PERIKSA } from "./k5b6a-materi-2";
import { ADEGAN_SEKITAR } from "./k5b6a-materi-1";
import { ADEGAN_LATIHAN_1, ADEGAN_LATIHAN_2, ADEGAN_MISKONSEPSI, ADEGAN_REFLEKSI } from "./k5b6a-materi-3";
import { ADEGAN_LUAR_BENCHMARK, ADEGAN_LUAR_BENCHMARK_TERAPAN, ADEGAN_LUAR_LIPAT, ADEGAN_LUAR_LIPAT_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k5b6a-luar-1";
import { ADEGAN_LUAR_DETEKTIF, ADEGAN_LUAR_DETEKTIF_TERAPAN, ADEGAN_LUAR_PUTARAN, ADEGAN_LUAR_PUTARAN_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b6a-luar-2";

/**
 * Kelas 5 Bab 6 Sub-Bab A (sudut siku-siku): video materi kurikulum dan video metode luar, dua video terpisah.
 * Adegan administratif (pembuka bab, peta konsep, Ayo Mengingat Kembali beserta skema pembelajaran) tetap ada di berkas materi, tetapi tidak diputar.
 */
export const VIDEO_MATERI_K5B6A: VideoStory = {
  id: "k5b6a-materi",
  judul: "Sudut Siku-Siku",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "sudut siku-siku", daftar: ["Sudut di sekitar kita", "Patokan sudut siku-siku", "Memeriksa pojok dengan alat"] }),
    ADEGAN_SEKITAR,
    ADEGAN_BINGKAI,
    ADEGAN_EKSPLORASI_ALAT,
    ADEGAN_EKSPLORASI_PERIKSA,
    ADEGAN_LATIHAN_1,
    ADEGAN_LATIHAN_2,
    ADEGAN_MISKONSEPSI,
    ADEGAN_REFLEKSI,
  ],
};

export const VIDEO_LUAR_K5B6A: VideoStory = {
  id: "k5b6a-luar",
  judul: "Sudut Siku-Siku: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "sudut siku-siku" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BENCHMARK,
    ADEGAN_LUAR_BENCHMARK_TERAPAN,
    ADEGAN_LUAR_LIPAT,
    ADEGAN_LUAR_LIPAT_TERAPAN,
    ADEGAN_LUAR_DETEKTIF,
    ADEGAN_LUAR_DETEKTIF_TERAPAN,
    ADEGAN_LUAR_PUTARAN,
    ADEGAN_LUAR_PUTARAN_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
