import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_PAPAN_LAYAR, ADEGAN_SATU_BINTANG, ADEGAN_SALAH_GAMBAR } from "./k2b8B-materi-1";
import { ADEGAN_SAMA_UKURAN, ADEGAN_BACA_DIAGRAM, ADEGAN_BANDINGKAN } from "./k2b8B-materi-2";
import { ADEGAN_JUMLAH, ADEGAN_PRESENTASI, ADEGAN_PENUTUP } from "./k2b8B-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_TEMPEL, ADEGAN_LUAR_TEMPEL_TERAPAN } from "./k2b8B-luar-1";
import { ADEGAN_LUAR_BANDING, ADEGAN_LUAR_BANDING_TERAPAN, ADEGAN_LUAR_DETEKTIF, ADEGAN_LUAR_DETEKTIF_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k2b8B-luar-2";

/**
 * Kelas 2 Bab 8 Sub-Bab B (diagram gambar), akhir cerita Pentas Seni Sekolah.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Bintang Bu Maya" (Chacha, Dika, Nia, Bu Sari, Bu Maya).
 * Video kedua: tiga metode global (Sticky Note Graph, Row Comparing, Graph Detective), terpisah.
 */
export const JUDUL_K2B8B = "Bintang Bu Maya";

export const VIDEO_MATERI_K2B8B: VideoStory = {
  id: "k2b8B-materi",
  judul: JUDUL_K2B8B,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "diagram gambar", daftar: ["Membuat diagram gambar", "Membaca diagram gambar", "Menyajikan data"] }),
    ADEGAN_PAPAN_LAYAR,
    ADEGAN_SATU_BINTANG,
    ADEGAN_SALAH_GAMBAR,
    ADEGAN_SAMA_UKURAN,
    ADEGAN_BACA_DIAGRAM,
    ADEGAN_BANDINGKAN,
    ADEGAN_JUMLAH,
    ADEGAN_PRESENTASI,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B8B: VideoStory = {
  id: "k2b8B-luar",
  judul: JUDUL_K2B8B,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "diagram gambar", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_TEMPEL,
    ADEGAN_LUAR_TEMPEL_TERAPAN,
    ADEGAN_LUAR_BANDING,
    ADEGAN_LUAR_BANDING_TERAPAN,
    ADEGAN_LUAR_DETEKTIF,
    ADEGAN_LUAR_DETEKTIF_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
