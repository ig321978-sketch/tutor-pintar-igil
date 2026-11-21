import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_CATATAN, ADEGAN_DERMAGA, ADEGAN_SALAH_KANAN } from "./k4b1c-materi-1";
import { ADEGAN_KALAH, ADEGAN_KIRI, ADEGAN_PULUHAN, ADEGAN_SAMA } from "./k4b1c-materi-2";
import { ADEGAN_PENUTUP, ADEGAN_SELATAN, ADEGAN_URUT } from "./k4b1c-materi-3";
import { ADEGAN_LUAR_KIRI, ADEGAN_LUAR_KIRI_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k4b1c-luar-1";
import { ADEGAN_LUAR_GARIS, ADEGAN_LUAR_GARIS_TERAPAN, ADEGAN_LUAR_KARTU, ADEGAN_LUAR_KARTU_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k4b1c-luar-2";

/**
 * K4 Bab 1 Sub-Bab C (membandingkan dan mengurutkan bilangan sampai sepuluh ribu), cerita Penginapan Pulau Karang Indah.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Papan Dermaga Kak Tiara" (Satria, Laras, Genta, Pak Hendro, Kak Tiara, Pak Darwis).
 * Video kedua: tiga metode global (Left-to-Right Compare, Number Line, Card Sort), terpisah.
 */
export const JUDUL_K4B1C = "Papan Dermaga Kak Tiara";

export const VIDEO_MATERI_K4B1C: VideoStory = {
  id: "k4b1c-materi",
  judul: JUDUL_K4B1C,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "membandingkan dan mengurutkan bilangan", daftar: ["Membandingkan dari kiri", "Tanda lebih kecil, lebih besar, dan sama dengan", "Mengurutkan"] }),
    ADEGAN_DERMAGA,
    ADEGAN_CATATAN,
    ADEGAN_SALAH_KANAN,
    ADEGAN_KIRI,
    ADEGAN_PULUHAN,
    ADEGAN_KALAH,
    ADEGAN_SAMA,
    ADEGAN_SELATAN,
    ADEGAN_URUT,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K4B1C: VideoStory = {
  id: "k4b1c-luar",
  judul: JUDUL_K4B1C,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "membandingkan dan mengurutkan bilangan", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_KIRI,
    ADEGAN_LUAR_KIRI_TERAPAN,
    ADEGAN_LUAR_GARIS,
    ADEGAN_LUAR_GARIS_TERAPAN,
    ADEGAN_LUAR_KARTU,
    ADEGAN_LUAR_KARTU_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
