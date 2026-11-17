import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_KE_TABEL, ADEGAN_MUAT_SEDIKIT, ADEGAN_TANYA } from "./k1b8B-materi-1";
import { ADEGAN_BAGIAN, ADEGAN_BANDING, ADEGAN_RENGGANG } from "./k1b8B-materi-2";
import { ADEGAN_JUMLAH, ADEGAN_KEPUTUSAN, ADEGAN_PENUTUP } from "./k1b8B-materi-3";
import { ADEGAN_LUAR_BALOK, ADEGAN_LUAR_BALOK_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b8B-luar-1";
import { ADEGAN_LUAR_BATANG, ADEGAN_LUAR_BATANG_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TITIK, ADEGAN_LUAR_TITIK_TERAPAN } from "./k1b8B-luar-2";

/**
 * Kelas 1 Bab 8 Sub-Bab B (diagram gambar), akhir cerita Perpustakaan Keliling.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Cerita Kesukaan Anak Kampung" (Igil, Kaka, Abang, Mamah, Pak Pos Pustaka).
 * Video kedua: tiga metode global (Block Graph, Dot Plot, Bar Graph), terpisah.
 */
export const JUDUL_K1B8B = "Cerita Kesukaan Anak Kampung";

export const VIDEO_MATERI_K1B8B: VideoStory = {
  id: "k1b8B-materi",
  judul: JUDUL_K1B8B,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "diagram gambar", daftar: ["Mengumpulkan data dan tabel", "Membuat diagram gambar", "Membaca dan membandingkan diagram"] }),
    ADEGAN_MUAT_SEDIKIT,
    ADEGAN_TANYA,
    ADEGAN_KE_TABEL,
    ADEGAN_RENGGANG,
    ADEGAN_BAGIAN,
    ADEGAN_BANDING,
    ADEGAN_JUMLAH,
    ADEGAN_KEPUTUSAN,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B8B: VideoStory = {
  id: "k1b8B-luar",
  judul: JUDUL_K1B8B,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "diagram gambar", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BALOK,
    ADEGAN_LUAR_BALOK_TERAPAN,
    ADEGAN_LUAR_TITIK,
    ADEGAN_LUAR_TITIK_TERAPAN,
    ADEGAN_LUAR_BATANG,
    ADEGAN_LUAR_BATANG_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
