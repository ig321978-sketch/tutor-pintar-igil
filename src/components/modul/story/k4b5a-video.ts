import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BERATURAN, ADEGAN_SEGI_BANYAK, ADEGAN_TOKO } from "./k4b5a-materi-1";
import { ADEGAN_PERIKSA_SUDUT, ADEGAN_SALAH_JAJARGENJANG, ADEGAN_SEGITIGA } from "./k4b5a-materi-2";
import { ADEGAN_KATALOG, ADEGAN_KELUARGA, ADEGAN_PENUTUP } from "./k4b5a-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_PILAH, ADEGAN_LUAR_PILAH_TERAPAN } from "./k4b5a-luar-1";
import { ADEGAN_LUAR_POHON, ADEGAN_LUAR_POHON_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SISI, ADEGAN_LUAR_SISI_TERAPAN } from "./k4b5a-luar-2";

/**
 * Kelas 4 Bab 5 Sub-Bab A (ciri-ciri bangun datar), awal cerita Toko Keramik Bu Dewi.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Etalase Keramik Bu Dewi" (Satria, Laras, Genta, Pak Hendro, Bu Dewi, Pak Rudi).
 * Video kedua: tiga metode global (Sort the Tiles, Sides and Corners, Shape Family Tree), terpisah.
 */
export const JUDUL_K4B5A = "Etalase Keramik Bu Dewi";

export const VIDEO_MATERI_K4B5A: VideoStory = {
  id: "k4b5a-materi",
  judul: JUDUL_K4B5A,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "bangun datar", daftar: ["Segi banyak", "Segitiga", "Segiempat"] }),
    ADEGAN_TOKO,
    ADEGAN_SEGI_BANYAK,
    ADEGAN_BERATURAN,
    ADEGAN_SEGITIGA,
    ADEGAN_SALAH_JAJARGENJANG,
    ADEGAN_PERIKSA_SUDUT,
    ADEGAN_KELUARGA,
    ADEGAN_KATALOG,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K4B5A: VideoStory = {
  id: "k4b5a-luar",
  judul: JUDUL_K4B5A,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "bangun datar", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_PILAH,
    ADEGAN_LUAR_PILAH_TERAPAN,
    ADEGAN_LUAR_SISI,
    ADEGAN_LUAR_SISI_TERAPAN,
    ADEGAN_LUAR_POHON,
    ADEGAN_LUAR_POHON_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
