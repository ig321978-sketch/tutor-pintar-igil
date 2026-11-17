import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_MAJU, ADEGAN_PANEN, ADEGAN_TUKAR } from "./k1b2b-materi-1";
import { ADEGAN_KEMBAR, ADEGAN_SEPULUH } from "./k1b2b-materi-2";
import { ADEGAN_HASIL, ADEGAN_PENUTUP } from "./k1b2b-materi-3";
import { ADEGAN_LUAR_GARIS, ADEGAN_LUAR_GARIS_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b2b-luar-1";
import { ADEGAN_LUAR_KEMBAR, ADEGAN_LUAR_KEMBAR_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SEPULUH, ADEGAN_LUAR_SEPULUH_TERAPAN } from "./k1b2b-luar-2";

/**
 * Kelas 1 Bab 2 Sub-Bab B (berbagai cara menjumlah), lanjutan cerita Kebun Sayur Mamah.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Panen Pertama dan Keranjang Sepuluh", lanjutan
 * "Bibit Kiriman Nenek" (Igil, Kaka, Abang, Mamah). Video kedua: tiga metode global, terpisah.
 */
export const JUDUL_K1B2B = "Panen Pertama dan Keranjang Sepuluh";

export const VIDEO_MATERI_K1B2B: VideoStory = {
  id: "k1b2b-materi",
  judul: JUDUL_K1B2B,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "berbagai cara menjumlah", daftar: ["Pasangan bilangan dan tukar tempat", "Hitung maju dan penjumlahan kembar", "Penjumlahan yang hasilnya sepuluh"] }),
    ADEGAN_PANEN,
    ADEGAN_TUKAR,
    ADEGAN_MAJU,
    ADEGAN_KEMBAR,
    ADEGAN_SEPULUH,
    ADEGAN_HASIL,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B2B: VideoStory = {
  id: "k1b2b-luar",
  judul: JUDUL_K1B2B,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "berbagai cara menjumlah", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_GARIS,
    ADEGAN_LUAR_GARIS_TERAPAN,
    ADEGAN_LUAR_KEMBAR,
    ADEGAN_LUAR_KEMBAR_TERAPAN,
    ADEGAN_LUAR_SEPULUH,
    ADEGAN_LUAR_SEPULUH_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
