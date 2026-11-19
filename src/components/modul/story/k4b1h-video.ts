import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_KAMAR, ADEGAN_ROMBONGAN, ADEGAN_SALAH_TURUN } from "./k4b1h-materi-1";
import { ADEGAN_BAGI_RATA, ADEGAN_BERSUSUN, ADEGAN_SIKAT } from "./k4b1h-materi-2";
import { ADEGAN_PERIKSA, ADEGAN_PENUTUP, ADEGAN_SISA } from "./k4b1h-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_RATA, ADEGAN_LUAR_RATA_TERAPAN } from "./k4b1h-luar-1";
import { ADEGAN_LUAR_KURANG, ADEGAN_LUAR_KURANG_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SUSUN, ADEGAN_LUAR_SUSUN_TERAPAN } from "./k4b1h-luar-2";

/**
 * Kelas 4 Bab 1 Sub-Bab H (pembagian bilangan sampai seratus), cerita Penginapan Pulau Karang Indah.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Papan Jatah Bu Ratna" (Satria, Laras, Genta, Pak Hendro, Bu Ratna).
 * Video kedua: tiga metode global (Equal Sharing, Repeated Subtraction, Long Division), terpisah.
 */
export const JUDUL_K4B1H = "Papan Jatah Bu Ratna";

export const VIDEO_MATERI_K4B1H: VideoStory = {
  id: "k4b1h-materi",
  judul: JUDUL_K4B1H,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "pembagian sampai seratus", daftar: ["Membagi sama banyak", "Pembagian bersusun", "Memeriksa dengan perkalian"] }),
    ADEGAN_KAMAR,
    ADEGAN_ROMBONGAN,
    ADEGAN_SALAH_TURUN,
    ADEGAN_BAGI_RATA,
    ADEGAN_BERSUSUN,
    ADEGAN_SIKAT,
    ADEGAN_PERIKSA,
    ADEGAN_SISA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K4B1H: VideoStory = {
  id: "k4b1h-luar",
  judul: JUDUL_K4B1H,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "pembagian sampai seratus", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_RATA,
    ADEGAN_LUAR_RATA_TERAPAN,
    ADEGAN_LUAR_KURANG,
    ADEGAN_LUAR_KURANG_TERAPAN,
    ADEGAN_LUAR_SUSUN,
    ADEGAN_LUAR_SUSUN_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
