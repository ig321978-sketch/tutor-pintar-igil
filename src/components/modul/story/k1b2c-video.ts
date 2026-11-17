import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BACA, ADEGAN_PESAN } from "./k1b2c-materi-1";
import { ADEGAN_PERIKSA, ADEGAN_SEPULUH, ADEGAN_TULIS } from "./k1b2c-materi-2";
import { ADEGAN_PENUTUP, ADEGAN_PESTA } from "./k1b2c-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_PERAGA, ADEGAN_LUAR_PERAGA_TERAPAN } from "./k1b2c-luar-1";
import { ADEGAN_LUAR_BATANG, ADEGAN_LUAR_BATANG_TERAPAN, ADEGAN_LUAR_RDW, ADEGAN_LUAR_RDW_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k1b2c-luar-2";

/**
 * Kelas 1 Bab 2 Sub-Bab C (soal cerita penjumlahan), sub-bab terakhir dan akhir cerita Kebun Sayur Mamah.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Pesanan Tetangga", lanjutan "Panen Pertama dan
 * Keranjang Sepuluh" (Igil, Kaka, Abang, Mamah). Video kedua: tiga metode global, terpisah.
 */
export const JUDUL_K1B2C = "Pesanan Tetangga";

export const VIDEO_MATERI_K1B2C: VideoStory = {
  id: "k1b2c-materi",
  judul: JUDUL_K1B2C,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "soal cerita penjumlahan", daftar: ["Membaca cerita dan mencari dua bilangan", "Menulis kalimat penjumlahan", "Menjawab lengkap dan memeriksa"] }),
    ADEGAN_PESAN,
    ADEGAN_BACA,
    ADEGAN_TULIS,
    ADEGAN_PERIKSA,
    ADEGAN_SEPULUH,
    ADEGAN_PESTA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B2C: VideoStory = {
  id: "k1b2c-luar",
  judul: JUDUL_K1B2C,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "soal cerita penjumlahan", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_PERAGA,
    ADEGAN_LUAR_PERAGA_TERAPAN,
    ADEGAN_LUAR_RDW,
    ADEGAN_LUAR_RDW_TERAPAN,
    ADEGAN_LUAR_BATANG,
    ADEGAN_LUAR_BATANG_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
