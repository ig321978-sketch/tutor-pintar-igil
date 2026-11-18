import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_MANIK_TERCECER, ADEGAN_SALAH_LANJUT, ADEGAN_SATUAN_POLA } from "./k2b4B-materi-1";
import { ADEGAN_BUKAN_POLA, ADEGAN_CARI_SATUAN, ADEGAN_POLA_BENTUK } from "./k2b4B-materi-2";
import { ADEGAN_BUAT_POLA, ADEGAN_GERAKAN_SUARA, ADEGAN_PENUTUP_B } from "./k2b4B-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_PITA, ADEGAN_LUAR_PITA_TERAPAN } from "./k2b4B-luar-1";
import { ADEGAN_LUAR_KODE, ADEGAN_LUAR_KODE_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TEPUK, ADEGAN_LUAR_TEPUK_TERAPAN } from "./k2b4B-luar-2";

/**
 * Kelas 2 Bab 4 Sub-Bab B (pola), akhir cerita Pameran Kerajinan Sekolah.
 * Video materi (tiga ketukan tiap adegan, tanpa latihan): cerita orisinal IGIL "Pita Hias Bu Mira" (Chacha, Dika, Nia, Bu Sari, Bu Mira).
 * Video kedua: tiga metode global (Pattern Strips, Letter Coding, Rhythm Clap), terpisah.
 */
export const JUDUL_K2B4B = "Pita Hias Bu Mira";

export const VIDEO_MATERI_K2B4B: VideoStory = {
  id: "k2b4B-materi",
  judul: JUDUL_K2B4B,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "pola", daftar: ["Hal yang berulang dan teratur", "Pola bentuk, warna, gerakan, dan suara", "Melanjutkan dan membuat pola"] }),
    ADEGAN_MANIK_TERCECER,
    ADEGAN_SATUAN_POLA,
    ADEGAN_SALAH_LANJUT,
    ADEGAN_CARI_SATUAN,
    ADEGAN_POLA_BENTUK,
    ADEGAN_BUKAN_POLA,
    ADEGAN_GERAKAN_SUARA,
    ADEGAN_BUAT_POLA,
    ADEGAN_PENUTUP_B,
  ],
};

export const VIDEO_LUAR_K2B4B: VideoStory = {
  id: "k2b4B-luar",
  judul: JUDUL_K2B4B,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "pola", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_PITA,
    ADEGAN_LUAR_PITA_TERAPAN,
    ADEGAN_LUAR_KODE,
    ADEGAN_LUAR_KODE_TERAPAN,
    ADEGAN_LUAR_TEPUK,
    ADEGAN_LUAR_TEPUK_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
