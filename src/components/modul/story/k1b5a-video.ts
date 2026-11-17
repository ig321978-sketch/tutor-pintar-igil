import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_DATANG, ADEGAN_SATU_SATU, ADEGAN_SEPULUH } from "./k1b5a-materi-1";
import { ADEGAN_BACA_TULIS, ADEGAN_DUA_PULUH, ADEGAN_PERKIRAAN } from "./k1b5a-materi-2";
import { ADEGAN_HASIL, ADEGAN_PENUTUP } from "./k1b5a-materi-3";
import { ADEGAN_LUAR_BINGKAI, ADEGAN_LUAR_BINGKAI_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b5a-luar-1";
import { ADEGAN_LUAR_MANIK, ADEGAN_LUAR_MANIK_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TOPLES, ADEGAN_LUAR_TOPLES_TERAPAN } from "./k1b5a-luar-2";

/**
 * Kelas 1 Bab 5 Sub-Bab A (menghitung, membaca, dan menulis bilangan sampai dua puluh), awal cerita Akuarium Ikan Hias Abang.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Ikan Baru Datang" (Igil, Kaka, Abang, Mamah).
 * Video kedua: tiga metode global, terpisah.
 */
export const JUDUL_K1B5A = "Ikan Baru Datang";

export const VIDEO_MATERI_K1B5A: VideoStory = {
  id: "k1b5a-materi",
  judul: JUDUL_K1B5A,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "menghitung bilangan sampai dua puluh", daftar: ["Satu benda, satu hitungan", "Sepuluh dulu, lalu sisanya", "Membaca dan menulis belasan"] }),
    ADEGAN_DATANG,
    ADEGAN_SATU_SATU,
    ADEGAN_SEPULUH,
    ADEGAN_BACA_TULIS,
    ADEGAN_PERKIRAAN,
    ADEGAN_DUA_PULUH,
    ADEGAN_HASIL,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B5A: VideoStory = {
  id: "k1b5a-luar",
  judul: JUDUL_K1B5A,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "menghitung bilangan sampai dua puluh", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BINGKAI,
    ADEGAN_LUAR_BINGKAI_TERAPAN,
    ADEGAN_LUAR_MANIK,
    ADEGAN_LUAR_MANIK_TERAPAN,
    ADEGAN_LUAR_TOPLES,
    ADEGAN_LUAR_TOPLES_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
