import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_KOTAK, ADEGAN_MENGURAIKAN, ADEGAN_MENYUSUN } from "./k4b5b-materi-1";
import { ADEGAN_HITUNG_SEGITIGA, ADEGAN_MENYAPU, ADEGAN_SALAH_SEGIENAM } from "./k4b5b-materi-2";
import { ADEGAN_BANYAK_CARA, ADEGAN_PENUTUP, ADEGAN_TANGRAM } from "./k4b5b-materi-3";
import { ADEGAN_LUAR_PASANG, ADEGAN_LUAR_PASANG_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k4b5b-luar-1";
import { ADEGAN_LUAR_BAGI, ADEGAN_LUAR_BAGI_TERAPAN, ADEGAN_LUAR_MOSAIK, ADEGAN_LUAR_MOSAIK_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k4b5b-luar-2";

/**
 * Kelas 4 Bab 5 Sub-Bab B (menyusun dan menguraikan bangun datar), akhir cerita Toko Keramik Bu Dewi.
 * Video materi (sekitar tiga menit): cerita orisinal IGIL "Mosaik Pak Rudi" (Satria, Laras, Genta, Pak Hendro, Pak Rudi, dan Bu Dewi di penutup).
 * Video kedua: tiga metode global (Fit the Pieces, Cut Into Triangles, Many Ways Mosaic), terpisah.
 */
export const JUDUL_K4B5B = "Mosaik Pak Rudi";

export const VIDEO_MATERI_K4B5B: VideoStory = {
  id: "k4b5b-materi",
  judul: JUDUL_K4B5B,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "menyusun dan menguraikan bangun datar", daftar: ["Menyusun", "Menguraikan", "Banyak cara"] }),
    ADEGAN_KOTAK,
    ADEGAN_MENYUSUN,
    ADEGAN_MENGURAIKAN,
    ADEGAN_SALAH_SEGIENAM,
    ADEGAN_HITUNG_SEGITIGA,
    ADEGAN_MENYAPU,
    ADEGAN_BANYAK_CARA,
    ADEGAN_TANGRAM,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K4B5B: VideoStory = {
  id: "k4b5b-luar",
  judul: JUDUL_K4B5B,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "menyusun dan menguraikan bangun datar", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_PASANG,
    ADEGAN_LUAR_PASANG_TERAPAN,
    ADEGAN_LUAR_BAGI,
    ADEGAN_LUAR_BAGI_TERAPAN,
    ADEGAN_LUAR_MOSAIK,
    ADEGAN_LUAR_MOSAIK_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
