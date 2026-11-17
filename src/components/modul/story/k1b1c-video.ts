import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_LOTENG, ADEGAN_NAIK, ADEGAN_TURUN } from "./k1b1c-materi-1";
import { ADEGAN_LENGKAPI, ADEGAN_SEBELUM, ADEGAN_TENGAH } from "./k1b1c-materi-2";
import { ADEGAN_PENUTUP, ADEGAN_URUT } from "./k1b1c-materi-3";
import { ADEGAN_LUAR_JALUR, ADEGAN_LUAR_JALUR_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b1c-luar-1";
import { ADEGAN_LUAR_LANJUT, ADEGAN_LUAR_LANJUT_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TONGKAT, ADEGAN_LUAR_TONGKAT_TERAPAN } from "./k1b1c-luar-2";

/**
 * Kelas 1 Bab 1 Sub-Bab C (menghitung maju dan mundur).
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Tangga Gudang Loteng", lanjutan
 * "Hadiah Nenek untuk Rak yang Lebih Sedikit" (Igil, Kaka, Abang, Mamah). Video kedua: tiga metode global, terpisah.
 */
export const JUDUL_K1B1C = "Tangga Gudang Loteng";

export const VIDEO_MATERI_K1B1C: VideoStory = {
  id: "k1b1c-materi",
  judul: JUDUL_K1B1C,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "menghitung maju dan mundur", daftar: ["Menghitung maju dan mundur", "Sebelum dan sesudah", "Melengkapi urutan"] }),
    ADEGAN_LOTENG,
    ADEGAN_NAIK,
    ADEGAN_TURUN,
    ADEGAN_TENGAH,
    ADEGAN_SEBELUM,
    ADEGAN_LENGKAPI,
    ADEGAN_URUT,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B1C: VideoStory = {
  id: "k1b1c-luar",
  judul: JUDUL_K1B1C,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "menghitung maju dan mundur", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_JALUR,
    ADEGAN_LUAR_JALUR_TERAPAN,
    ADEGAN_LUAR_LANJUT,
    ADEGAN_LUAR_LANJUT_TERAPAN,
    ADEGAN_LUAR_TONGKAT,
    ADEGAN_LUAR_TONGKAT_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
