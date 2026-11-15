import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_SEPATU_HARGA, ADEGAN_SEPATU_TABEL } from "./k5b9b-materi-1";
import { ADEGAN_SEPATU_KOLOM, ADEGAN_SEPATU_URUT, ADEGAN_WISATAWAN_DATA, ADEGAN_WISATAWAN_URUT } from "./k5b9b-materi-2";
import { ADEGAN_LATIHAN_BARISAN, ADEGAN_LATIHAN_TANDA, ADEGAN_REFLEKSI_B } from "./k5b9b-materi-3";
import { ADEGAN_LUAR_KIRI, ADEGAN_LUAR_KIRI_TERAPAN, ADEGAN_LUAR_KOLOM, ADEGAN_LUAR_KOLOM_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k5b9b-luar-1";
import { ADEGAN_LUAR_GARIS, ADEGAN_LUAR_GARIS_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_URUT, ADEGAN_LUAR_URUT_TERAPAN } from "./k5b9b-luar-2";

/**
 * Kelas 5 Bab 9 Sub-Bab B (Membandingkan dan Mengurutkan Bilangan): video materi kurikulum dan video metode luar, dua video terpisah.
 * Adegan administratif (pembuka sub-bab, tujuan, dan pemanasan) tetap ada di berkas materi, tetapi tidak diputar.
 */
export const VIDEO_MATERI_K5B9B: VideoStory = {
  id: "k5b9b-materi",
  judul: "Membandingkan dan Mengurutkan Bilangan",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "membandingkan dan mengurutkan bilangan", daftar: ["Membandingkan dua bilangan", "Mengurutkan bilangan", "Melengkapi barisan bilangan"] }),
    ADEGAN_SEPATU_HARGA,
    ADEGAN_SEPATU_TABEL,
    ADEGAN_SEPATU_KOLOM,
    ADEGAN_SEPATU_URUT,
    ADEGAN_WISATAWAN_DATA,
    ADEGAN_WISATAWAN_URUT,
    ADEGAN_LATIHAN_TANDA,
    ADEGAN_LATIHAN_BARISAN,
    ADEGAN_REFLEKSI_B,
  ],
};

export const VIDEO_LUAR_K5B9B: VideoStory = {
  id: "k5b9b-luar",
  judul: "Membandingkan dan Mengurutkan Bilangan: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "membandingkan dan mengurutkan bilangan" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_KIRI,
    ADEGAN_LUAR_KIRI_TERAPAN,
    ADEGAN_LUAR_KOLOM,
    ADEGAN_LUAR_KOLOM_TERAPAN,
    ADEGAN_LUAR_URUT,
    ADEGAN_LUAR_URUT_TERAPAN,
    ADEGAN_LUAR_GARIS,
    ADEGAN_LUAR_GARIS_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
