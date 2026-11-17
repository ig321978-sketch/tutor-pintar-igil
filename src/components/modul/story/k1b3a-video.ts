import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_KALIMAT, ADEGAN_KERETA, ADEGAN_KUE } from "./k1b3a-materi-1";
import { ADEGAN_MINUMAN, ADEGAN_NOL, ADEGAN_TURUN } from "./k1b3a-materi-2";
import { ADEGAN_HASIL, ADEGAN_PENUTUP } from "./k1b3a-materi-3";
import { ADEGAN_LUAR_AMBIL, ADEGAN_LUAR_AMBIL_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b3a-luar-1";
import { ADEGAN_LUAR_BINGKAI, ADEGAN_LUAR_BINGKAI_TERAPAN, ADEGAN_LUAR_MUNDUR, ADEGAN_LUAR_MUNDUR_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k1b3a-luar-2";

/**
 * Kelas 1 Bab 3 Sub-Bab A (cerita pengurangan), awal cerita Kereta ke Rumah Nenek.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Bekal untuk Nenek" (Igil, Kaka, Abang, Mamah).
 * Video kedua: tiga metode global, terpisah.
 */
export const JUDUL_K1B3A = "Bekal untuk Nenek";

export const VIDEO_MATERI_K1B3A: VideoStory = {
  id: "k1b3a-materi",
  judul: JUDUL_K1B3A,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "pengurangan sampai sepuluh", daftar: ["Benda yang berkurang", "Benda yang tersisa", "Menulis kalimat pengurangan"] }),
    ADEGAN_KERETA,
    ADEGAN_KUE,
    ADEGAN_KALIMAT,
    ADEGAN_TURUN,
    ADEGAN_MINUMAN,
    ADEGAN_NOL,
    ADEGAN_HASIL,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B3A: VideoStory = {
  id: "k1b3a-luar",
  judul: JUDUL_K1B3A,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "pengurangan sampai sepuluh", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_AMBIL,
    ADEGAN_LUAR_AMBIL_TERAPAN,
    ADEGAN_LUAR_MUNDUR,
    ADEGAN_LUAR_MUNDUR_TERAPAN,
    ADEGAN_LUAR_BINGKAI,
    ADEGAN_LUAR_BINGKAI_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
