import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_CABAI, ADEGAN_KALIMAT, ADEGAN_KEBUN } from "./k1b2a-materi-1";
import { ADEGAN_NOL, ADEGAN_SAWI, ADEGAN_TOMAT } from "./k1b2a-materi-2";
import { ADEGAN_HASIL, ADEGAN_PENUTUP } from "./k1b2a-materi-3";
import { ADEGAN_LUAR_MAJU, ADEGAN_LUAR_MAJU_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b2a-luar-1";
import { ADEGAN_LUAR_BAGIAN, ADEGAN_LUAR_BAGIAN_TERAPAN, ADEGAN_LUAR_BINGKAI, ADEGAN_LUAR_BINGKAI_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k1b2a-luar-2";

/**
 * Kelas 1 Bab 2 Sub-Bab A (cerita penjumlahan), awal cerita Kebun Sayur Mamah.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Bibit Kiriman Nenek" (Igil, Kaka, Abang, Mamah).
 * Video kedua: tiga metode global, terpisah.
 */
export const JUDUL_K1B2A = "Bibit Kiriman Nenek";

export const VIDEO_MATERI_K1B2A: VideoStory = {
  id: "k1b2a-materi",
  judul: JUDUL_K1B2A,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "penjumlahan sampai sepuluh", daftar: ["Benda yang bertambah", "Menggabungkan dua kumpulan", "Menulis kalimat penjumlahan"] }),
    ADEGAN_KEBUN,
    ADEGAN_CABAI,
    ADEGAN_KALIMAT,
    ADEGAN_TOMAT,
    ADEGAN_NOL,
    ADEGAN_SAWI,
    ADEGAN_HASIL,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B2A: VideoStory = {
  id: "k1b2a-luar",
  judul: JUDUL_K1B2A,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "penjumlahan sampai sepuluh", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_MAJU,
    ADEGAN_LUAR_MAJU_TERAPAN,
    ADEGAN_LUAR_BAGIAN,
    ADEGAN_LUAR_BAGIAN_TERAPAN,
    ADEGAN_LUAR_BINGKAI,
    ADEGAN_LUAR_BINGKAI_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
