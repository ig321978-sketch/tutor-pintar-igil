import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_PERAHU, ADEGAN_SALAH_PULUH, ADEGAN_SUSUN } from "./k4b1g-materi-1";
import { ADEGAN_DAYUNG, ADEGAN_ULANG, ADEGAN_URAI } from "./k4b1g-materi-2";
import { ADEGAN_BERSUSUN, ADEGAN_PENUTUP, ADEGAN_TANPA_SIMPAN } from "./k4b1g-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_ULANG, ADEGAN_LUAR_ULANG_TERAPAN } from "./k4b1g-luar-1";
import { ADEGAN_LUAR_KALI, ADEGAN_LUAR_KALI_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_URAI, ADEGAN_LUAR_URAI_TERAPAN } from "./k4b1g-luar-2";

/**
 * Kelas 4 Bab 1 Sub-Bab G (perkalian sampai seratus), cerita Penginapan Pulau Karang Indah.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Baris Perahu Bu Marni" (Satria, Laras, Genta, Pak Hendro, Bu Marni, Bu Ratna).
 * Video kedua: tiga metode global (Repeated Addition, Split and Multiply, Column Multiply), terpisah.
 */
export const JUDUL_K4B1G = "Baris Perahu Bu Marni";

export const VIDEO_MATERI_K4B1G: VideoStory = {
  id: "k4b1g-materi",
  judul: JUDUL_K4B1G,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "perkalian sampai seratus", daftar: ["Penjumlahan berulang", "Mengurai puluhan dan satuan", "Perkalian bersusun"] }),
    ADEGAN_PERAHU,
    ADEGAN_SUSUN,
    ADEGAN_SALAH_PULUH,
    ADEGAN_URAI,
    ADEGAN_ULANG,
    ADEGAN_DAYUNG,
    ADEGAN_BERSUSUN,
    ADEGAN_TANPA_SIMPAN,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K4B1G: VideoStory = {
  id: "k4b1g-luar",
  judul: JUDUL_K4B1G,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "perkalian sampai seratus", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_ULANG,
    ADEGAN_LUAR_ULANG_TERAPAN,
    ADEGAN_LUAR_URAI,
    ADEGAN_LUAR_URAI_TERAPAN,
    ADEGAN_LUAR_KALI,
    ADEGAN_LUAR_KALI_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
