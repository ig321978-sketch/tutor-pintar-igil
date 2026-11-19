import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_LAMBANG_TEGAK, ADEGAN_LINTASAN, ADEGAN_TEGAK_LURUS } from "./k3b4C-materi-1";
import { ADEGAN_PERIKSA_JARAK, ADEGAN_SALAH_SEJAJAR, ADEGAN_SEJAJAR } from "./k3b4C-materi-2";
import { ADEGAN_BANGUN_DATAR, ADEGAN_LINGKARAN, ADEGAN_PENUTUP } from "./k3b4C-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_PETAK, ADEGAN_LUAR_PETAK_TERAPAN } from "./k3b4C-luar-1";
import { ADEGAN_LUAR_LIPAT, ADEGAN_LUAR_LIPAT_TERAPAN, ADEGAN_LUAR_PILAH, ADEGAN_LUAR_PILAH_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k3b4C-luar-2";

/**
 * Kelas 3 Bab 4 Sub-Bab C (garis tegak lurus, garis sejajar, dan bangun datar sederhana), akhir cerita Festival Layang-layang Kampung.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Lintasan Pak Samsul" (Raka, Salsa, Bima, Pak Joko, Pak Samsul, dan semua tamu).
 * Video kedua: tiga metode global (Grid Paper Check, Fold and Match, Shape Sort), terpisah.
 */
export const JUDUL_K3B4C = "Lintasan Pak Samsul";

export const VIDEO_MATERI_K3B4C: VideoStory = {
  id: "k3b4C-materi",
  judul: JUDUL_K3B4C,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "garis tegak lurus, garis sejajar, dan bangun datar", daftar: ["Garis tegak lurus", "Garis sejajar", "Ciri bangun datar"] }),
    ADEGAN_LINTASAN,
    ADEGAN_TEGAK_LURUS,
    ADEGAN_LAMBANG_TEGAK,
    ADEGAN_SEJAJAR,
    ADEGAN_SALAH_SEJAJAR,
    ADEGAN_PERIKSA_JARAK,
    ADEGAN_BANGUN_DATAR,
    ADEGAN_LINGKARAN,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K3B4C: VideoStory = {
  id: "k3b4C-luar",
  judul: JUDUL_K3B4C,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "garis tegak lurus, garis sejajar, dan bangun datar", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_PETAK,
    ADEGAN_LUAR_PETAK_TERAPAN,
    ADEGAN_LUAR_LIPAT,
    ADEGAN_LUAR_LIPAT_TERAPAN,
    ADEGAN_LUAR_PILAH,
    ADEGAN_LUAR_PILAH_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
