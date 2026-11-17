import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_GARIS, ADEGAN_LEBIH, ADEGAN_PAGI } from "./k1b7A-materi-1";
import { ADEGAN_PALING, ADEGAN_SAMA_TINGGI, ADEGAN_TANGGA } from "./k1b7A-materi-2";
import { ADEGAN_BURUNG, ADEGAN_PENUTUP_A, ADEGAN_TALI } from "./k1b7A-materi-3";
import { ADEGAN_LUAR_LANGSUNG, ADEGAN_LUAR_LANGSUNG_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b7A-luar-1";
import { ADEGAN_LUAR_PERANTARA, ADEGAN_LUAR_PERANTARA_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TANGGA, ADEGAN_LUAR_TANGGA_TERAPAN } from "./k1b7A-luar-2";

/**
 * Kelas 1 Bab 7 Sub-Bab A (membandingkan dan mengurutkan panjang), awal cerita Rumah Pohon Abang.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Tiang dan Tangga" (Igil, Kaka, Abang, Mamah, Kakek Jaya).
 * Video kedua: tiga metode global, terpisah.
 */
export const JUDUL_K1B7A = "Tiang dan Tangga";

export const VIDEO_MATERI_K1B7A: VideoStory = {
  id: "k1b7a-materi",
  judul: JUDUL_K1B7A,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "membandingkan dan mengurutkan panjang benda", daftar: ["Lebih tinggi, lebih pendek", "Paling tinggi, paling pendek", "Urutan dari garis awal sama"] }),
    ADEGAN_PAGI,
    ADEGAN_GARIS,
    ADEGAN_LEBIH,
    ADEGAN_SAMA_TINGGI,
    ADEGAN_PALING,
    ADEGAN_TANGGA,
    ADEGAN_TALI,
    ADEGAN_BURUNG,
    ADEGAN_PENUTUP_A,
  ],
};

export const VIDEO_LUAR_K1B7A: VideoStory = {
  id: "k1b7a-luar",
  judul: JUDUL_K1B7A,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "membandingkan dan mengurutkan panjang benda", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_LANGSUNG,
    ADEGAN_LUAR_LANGSUNG_TERAPAN,
    ADEGAN_LUAR_PERANTARA,
    ADEGAN_LUAR_PERANTARA_TERAPAN,
    ADEGAN_LUAR_TANGGA,
    ADEGAN_LUAR_TANGGA_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
