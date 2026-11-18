import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_SALAH_HITUNG, ADEGAN_PILAH_TEPI, ADEGAN_UBIN_DATANG } from "./k2b3A-materi-1";
import { ADEGAN_CARI_TAMAN, ADEGAN_LINGKARAN, ADEGAN_TANDAI_AWAL } from "./k2b3A-materi-2";
import { ADEGAN_PENUTUP, ADEGAN_TIGA_TANYA, ADEGAN_UBIN_TELUR } from "./k2b3A-materi-3";
import { ADEGAN_LUAR_PAPAN, ADEGAN_LUAR_PAPAN_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k2b3A-luar-1";
import { ADEGAN_LUAR_BURU, ADEGAN_LUAR_BURU_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_VENN, ADEGAN_LUAR_VENN_TERAPAN } from "./k2b3A-luar-2";

/**
 * Kelas 2 Bab 3 Sub-Bab A (bangun datar), awal cerita Taman Bermain Sekolah.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Ubin untuk Taman Bermain" (Chacha, Dika, Nia, Bu Sari, Pak Tono).
 * Video kedua: tiga metode global (Geoboard, Venn Diagram, Shape Hunt), terpisah.
 */
export const JUDUL_K2B3A = "Ubin untuk Taman Bermain";

export const VIDEO_MATERI_K2B3A: VideoStory = {
  id: "k2b3A-materi",
  judul: JUDUL_K2B3A,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "bangun datar", daftar: ["Segi banyak dan bentuk lengkung", "Menamai bentuk dari banyak sisinya", "Mengenal lingkaran"] }),
    ADEGAN_UBIN_DATANG,
    ADEGAN_PILAH_TEPI,
    ADEGAN_SALAH_HITUNG,
    ADEGAN_TANDAI_AWAL,
    ADEGAN_CARI_TAMAN,
    ADEGAN_LINGKARAN,
    ADEGAN_UBIN_TELUR,
    ADEGAN_TIGA_TANYA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B3A: VideoStory = {
  id: "k2b3A-luar",
  judul: JUDUL_K2B3A,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "bangun datar", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_PAPAN,
    ADEGAN_LUAR_PAPAN_TERAPAN,
    ADEGAN_LUAR_VENN,
    ADEGAN_LUAR_VENN_TERAPAN,
    ADEGAN_LUAR_BURU,
    ADEGAN_LUAR_BURU_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
