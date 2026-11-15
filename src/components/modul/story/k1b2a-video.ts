import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_CERITA, ADEGAN_LOMPAT, ADEGAN_PAPAN } from "./k1b2a-materi-1";
import { ADEGAN_BEBEK, ADEGAN_MOBIL, ADEGAN_PENSIL, ADEGAN_PIRING, ADEGAN_SEPULUH } from "./k1b2a-materi-2";
import { ADEGAN_GORESAN, ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP } from "./k1b2a-materi-3";
import { ADEGAN_LUAR_BAGIAN, ADEGAN_LUAR_MAJU, ADEGAN_LUAR_MAJU_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b2a-luar-1";
import { ADEGAN_LUAR_BAGIAN_TERAPAN, ADEGAN_LUAR_BINGKAI, ADEGAN_LUAR_BINGKAI_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k1b2a-luar-2";

/** Kelas 1 Bab 2 Sub-Bab A (Cerita Penjumlahan): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K1B2A: VideoStory = {
  id: "k1b2a-materi",
  judul: "Cerita Penjumlahan",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "cerita penjumlahan", daftar: ["Menggabungkan benda", "Benda yang bertambah", "Menulis kalimat tambah"] }),
    ADEGAN_CERITA,
    ADEGAN_LOMPAT,
    ADEGAN_PAPAN,
    ADEGAN_PENSIL,
    ADEGAN_MOBIL,
    ADEGAN_BEBEK,
    ADEGAN_PIRING,
    ADEGAN_SEPULUH,
    ADEGAN_GORESAN,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B2A: VideoStory = {
  id: "k1b2a-luar",
  judul: "Cerita Penjumlahan: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "cerita penjumlahan" }),
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
