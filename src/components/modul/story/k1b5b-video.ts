import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_MAJU, ADEGAN_MUNDUR, ADEGAN_RAK } from "./k1b5b-materi-1";
import { ADEGAN_LABEL_HILANG, ADEGAN_SEBELUM_SESUDAH } from "./k1b5b-materi-2";
import { ADEGAN_BERES, ADEGAN_KISI_RAK, ADEGAN_PENUTUP } from "./k1b5b-materi-3";
import { ADEGAN_LUAR_LOMPAT, ADEGAN_LUAR_LOMPAT_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b5b-luar-1";
import { ADEGAN_LUAR_KISI, ADEGAN_LUAR_KISI_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SEBELUM, ADEGAN_LUAR_SEBELUM_TERAPAN } from "./k1b5b-luar-2";

/**
 * Kelas 1 Bab 5 Sub-Bab B (menghitung maju dan mundur), lanjutan cerita Akuarium Ikan Hias Abang.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Rak Akuarium Bernomor" (Igil, Kaka, Abang, Mamah).
 * Video kedua: tiga metode global, terpisah.
 */
export const JUDUL_K1B5B = "Rak Akuarium Bernomor";

export const VIDEO_MATERI_K1B5B: VideoStory = {
  id: "k1b5b-materi",
  judul: JUDUL_K1B5B,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "menghitung maju dan mundur", daftar: ["Menghitung maju dan mundur", "Sesudah, sebelum, di antara", "Mencari nomor yang hilang"] }),
    ADEGAN_RAK,
    ADEGAN_MAJU,
    ADEGAN_MUNDUR,
    ADEGAN_SEBELUM_SESUDAH,
    ADEGAN_LABEL_HILANG,
    ADEGAN_KISI_RAK,
    ADEGAN_BERES,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B5B: VideoStory = {
  id: "k1b5b-luar",
  judul: JUDUL_K1B5B,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "menghitung maju dan mundur", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_LOMPAT,
    ADEGAN_LUAR_LOMPAT_TERAPAN,
    ADEGAN_LUAR_KISI,
    ADEGAN_LUAR_KISI_TERAPAN,
    ADEGAN_LUAR_SEBELUM,
    ADEGAN_LUAR_SEBELUM_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
