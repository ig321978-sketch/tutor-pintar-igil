import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BAGIAN, ADEGAN_CARI, ADEGAN_CERITA, ADEGAN_KATA } from "./k1b2c-materi-1";
import { ADEGAN_ANAK, ADEGAN_JAWAB, ADEGAN_PENSIL, ADEGAN_SEPEDA, ADEGAN_TULIS } from "./k1b2c-materi-2";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP, ADEGAN_PERIKSA, ADEGAN_SUSUN } from "./k1b2c-materi-3";
import { ADEGAN_LUAR_MAJU, ADEGAN_LUAR_MAJU_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b2c-luar-1";
import { ADEGAN_LUAR_BAGIAN, ADEGAN_LUAR_BAGIAN_TERAPAN, ADEGAN_LUAR_BINGKAI, ADEGAN_LUAR_BINGKAI_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k1b2c-luar-2";

/** Kelas 1 Bab 2 Sub-Bab C (Soal Cerita Penjumlahan): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K1B2C: VideoStory = {
  id: "k1b2c-materi",
  judul: "Soal Cerita Penjumlahan",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "soal cerita penjumlahan", daftar: ["Membaca soal cerita", "Menulis kalimat tambah", "Menjawab lalu memeriksa"] }),
    ADEGAN_CERITA,
    ADEGAN_BAGIAN,
    ADEGAN_CARI,
    ADEGAN_KATA,
    ADEGAN_TULIS,
    ADEGAN_JAWAB,
    ADEGAN_PENSIL,
    ADEGAN_ANAK,
    ADEGAN_SEPEDA,
    ADEGAN_PERIKSA,
    ADEGAN_SUSUN,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B2C: VideoStory = {
  id: "k1b2c-luar",
  judul: "Soal Cerita Penjumlahan: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "soal cerita penjumlahan" }),
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
