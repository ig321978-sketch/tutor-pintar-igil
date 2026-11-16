import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_DIBANTU, ADEGAN_HITUNG_MOBIL, ADEGAN_KAMAR, ADEGAN_TERAKHIR } from "./k1b1a-materi-1";
import { ADEGAN_BACA, ADEGAN_NOL, ADEGAN_SEKILAS, ADEGAN_SEPULUH, ADEGAN_TULIS } from "./k1b1a-materi-2";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP, ADEGAN_TABEL } from "./k1b1a-materi-3";
import { ADEGAN_LUAR_KARDINAL, ADEGAN_LUAR_KARDINAL_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_SATU, ADEGAN_LUAR_SATU_TERAPAN } from "./k1b1a-luar-1";
import { ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SEKILAS, ADEGAN_LUAR_SEKILAS_TERAPAN } from "./k1b1a-luar-2";

/**
 * Kelas 1 Bab 1 Sub-Bab A (menghitung, membaca, dan menulis bilangan nol sampai sepuluh).
 * Video materi: cerita orisinal IGIL "Merapikan Lemari Mainan Igil" (Igil, Kaka, Abang, Mamah). Video metode luar: terpisah.
 */
export const VIDEO_MATERI_K1B1A: VideoStory = {
  id: "k1b1a-materi",
  judul: "Merapikan Lemari Mainan Igil",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "menghitung, membaca, dan menulis bilangan", daftar: ["Menghitung benda", "Membaca angka", "Menulis angka"] }),
    ADEGAN_KAMAR,
    ADEGAN_DIBANTU,
    ADEGAN_HITUNG_MOBIL,
    ADEGAN_TERAKHIR,
    ADEGAN_SEKILAS,
    ADEGAN_SEPULUH,
    ADEGAN_NOL,
    ADEGAN_BACA,
    ADEGAN_TULIS,
    ADEGAN_TABEL,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B1A: VideoStory = {
  id: "k1b1a-luar",
  judul: "Menghitung, Membaca, dan Menulis Bilangan 0 sampai 10: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "menghitung dan menulis bilangan" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_SATU,
    ADEGAN_LUAR_SATU_TERAPAN,
    ADEGAN_LUAR_KARDINAL,
    ADEGAN_LUAR_KARDINAL_TERAPAN,
    ADEGAN_LUAR_SEKILAS,
    ADEGAN_LUAR_SEKILAS_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
