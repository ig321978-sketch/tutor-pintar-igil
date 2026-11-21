import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BAKI, ADEGAN_FAKTOR, ADEGAN_PIRING } from "./k5b2c-materi-1";
import { ADEGAN_ONDE, ADEGAN_PERIKSA, ADEGAN_SALAH_BUANG } from "./k5b2c-materi-2";
import { ADEGAN_CEK_LIMA, ADEGAN_PASANGAN, ADEGAN_PENUTUP } from "./k5b2c-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_POTONG, ADEGAN_LUAR_POTONG_TERAPAN } from "./k5b2c-luar-1";
import { ADEGAN_LUAR_BAGI, ADEGAN_LUAR_BAGI_TERAPAN, ADEGAN_LUAR_PASANG, ADEGAN_LUAR_PASANG_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b2c-luar-2";

/**
 * Kelas 5 Bab 2 Sub-Bab C (faktor), lanjutan cerita Pasar Kuliner Malam.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Klepon Bu Wati" (Bima, Citra, Fajar, Pak Arif, Bu Wati, Pak Joko).
 * Video kedua: tiga metode global (Cut and Count, Pair Up, Divide Check), terpisah.
 */
export const JUDUL_K5B2C = "Klepon Bu Wati";

export const VIDEO_MATERI_K5B2C: VideoStory = {
  id: "k5b2c-materi",
  judul: JUDUL_K5B2C,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "faktor", daftar: ["Bagi tanpa sisa", "Pasangan faktor", "Daftar faktor"] }),
    ADEGAN_BAKI,
    ADEGAN_PIRING,
    ADEGAN_FAKTOR,
    ADEGAN_SALAH_BUANG,
    ADEGAN_PERIKSA,
    ADEGAN_ONDE,
    ADEGAN_PASANGAN,
    ADEGAN_CEK_LIMA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K5B2C: VideoStory = {
  id: "k5b2c-luar",
  judul: JUDUL_K5B2C,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "faktor", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_POTONG,
    ADEGAN_LUAR_POTONG_TERAPAN,
    ADEGAN_LUAR_PASANG,
    ADEGAN_LUAR_PASANG_TERAPAN,
    ADEGAN_LUAR_BAGI,
    ADEGAN_LUAR_BAGI_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
