import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_DIBANTU, ADEGAN_HITUNG_MOBIL, ADEGAN_KAMAR, ADEGAN_TERAKHIR } from "./k1b1a-materi-1";
import { ADEGAN_BACA_TULIS, ADEGAN_NOL, ADEGAN_SEKILAS, ADEGAN_SEPULUH } from "./k1b1a-materi-2";
import { ADEGAN_PENUTUP, ADEGAN_TABEL } from "./k1b1a-materi-3";
import { ADEGAN_LUAR_KARDINAL, ADEGAN_LUAR_KARDINAL_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_SATU, ADEGAN_LUAR_SATU_TERAPAN } from "./k1b1a-luar-1";
import { ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SEKILAS, ADEGAN_LUAR_SEKILAS_TERAPAN } from "./k1b1a-luar-2";

/**
 * Kelas 1 Bab 1 Sub-Bab A (menghitung, membaca, dan menulis bilangan nol sampai sepuluh).
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Merapikan Lemari Mainan Igil" (Igil, Kaka, Abang, Mamah). Video kedua: metode global (tiga metode), terpisah.
 */
export const VIDEO_MATERI_K1B1A: VideoStory = {
  id: "k1b1a-materi",
  judul: "Merapikan Lemari Mainan Igil",
  subjudul: "Metode Kurikulum",
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
    ADEGAN_BACA_TULIS,
    ADEGAN_TABEL,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B1A: VideoStory = {
  id: "k1b1a-luar",
  judul: "Merapikan Lemari Mainan Igil",
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "menghitung dan menulis bilangan", labelMetode: "Metode global" }),
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
