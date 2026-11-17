import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_CAMPUR, ADEGAN_MOBIL, ADEGAN_PILAH } from "./k1b8A-materi-1";
import { ADEGAN_SELISIH, ADEGAN_TABEL, ADEGAN_TERBANYAK, ADEGAN_TURUS } from "./k1b8A-materi-2";
import { ADEGAN_JUMLAH, ADEGAN_PENUTUP_A } from "./k1b8A-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_PILAH, ADEGAN_LUAR_PILAH_TERAPAN } from "./k1b8A-luar-1";
import { ADEGAN_LUAR_PASANG, ADEGAN_LUAR_PASANG_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TABEL, ADEGAN_LUAR_TABEL_TERAPAN } from "./k1b8A-luar-2";

/**
 * Kelas 1 Bab 8 Sub-Bab A (memilah benda, turus, dan tabel), awal cerita Perpustakaan Keliling.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Kotak Cerita Berantakan" (Igil, Kaka, Abang, Mamah, Pak Pos Pustaka).
 * Video kedua: tiga metode global, terpisah.
 */
export const JUDUL_K1B8A = "Kotak Cerita Berantakan";

export const VIDEO_MATERI_K1B8A: VideoStory = {
  id: "k1b8A-materi",
  judul: JUDUL_K1B8A,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "memilah benda dan membaca tabel", daftar: ["Pilah menurut jenis", "Turus dan tabel", "Paling banyak, paling sedikit, selisih"] }),
    ADEGAN_MOBIL,
    ADEGAN_CAMPUR,
    ADEGAN_PILAH,
    ADEGAN_TURUS,
    ADEGAN_TABEL,
    ADEGAN_TERBANYAK,
    ADEGAN_SELISIH,
    ADEGAN_JUMLAH,
    ADEGAN_PENUTUP_A,
  ],
};

export const VIDEO_LUAR_K1B8A: VideoStory = {
  id: "k1b8A-luar",
  judul: JUDUL_K1B8A,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "memilah benda dan membaca tabel", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_PILAH,
    ADEGAN_LUAR_PILAH_TERAPAN,
    ADEGAN_LUAR_PASANG,
    ADEGAN_LUAR_PASANG_TERAPAN,
    ADEGAN_LUAR_TABEL,
    ADEGAN_LUAR_TABEL_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
