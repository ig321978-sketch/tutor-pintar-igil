import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_KERTAS, ADEGAN_SUMBU, ADEGAN_SKALA } from "./k4b6b-materi-1";
import { ADEGAN_BACA_BATANG, ADEGAN_PERIKSA_SKALA, ADEGAN_SALAH_SKALA } from "./k4b6b-materi-2";
import { ADEGAN_BANDING, ADEGAN_MENDATAR, ADEGAN_PENUTUP } from "./k4b6b-materi-3";
import { ADEGAN_LUAR_GARIS, ADEGAN_LUAR_GARIS_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k4b6b-luar-1";
import { ADEGAN_LUAR_ADU, ADEGAN_LUAR_ADU_TERAPAN, ADEGAN_LUAR_PUTAR, ADEGAN_LUAR_PUTAR_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k4b6b-luar-2";

/**
 * Kelas 4 Bab 6 Sub-Bab B (diagram batang), akhir cerita Bazar Kuliner Sekolah.
 * Video materi (sekitar tiga menit): cerita orisinal IGIL "Diagram Batang Pak Dodi" (Satria, Laras, Genta, Pak Hendro, Pak Dodi, dan Bu Rini di data).
 * Video kedua: tiga metode global (Follow the Line, Bar Duel, Flip the Chart), terpisah.
 */
export const JUDUL_K4B6B = "Diagram Batang Pak Dodi";

export const VIDEO_MATERI_K4B6B: VideoStory = {
  id: "k4b6b-materi",
  judul: JUDUL_K4B6B,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "diagram batang", daftar: ["Sumbu", "Tinggi batang", "Membandingkan"] }),
    ADEGAN_KERTAS,
    ADEGAN_SUMBU,
    ADEGAN_SKALA,
    ADEGAN_BACA_BATANG,
    ADEGAN_SALAH_SKALA,
    ADEGAN_PERIKSA_SKALA,
    ADEGAN_BANDING,
    ADEGAN_MENDATAR,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K4B6B: VideoStory = {
  id: "k4b6b-luar",
  judul: JUDUL_K4B6B,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "diagram batang", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_GARIS,
    ADEGAN_LUAR_GARIS_TERAPAN,
    ADEGAN_LUAR_ADU,
    ADEGAN_LUAR_ADU_TERAPAN,
    ADEGAN_LUAR_PUTAR,
    ADEGAN_LUAR_PUTAR_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
