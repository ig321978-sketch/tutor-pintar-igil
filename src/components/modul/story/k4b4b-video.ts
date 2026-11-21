import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_EMBER, ADEGAN_GELAS, ADEGAN_LITER } from "./k4b4b-materi-1";
import { ADEGAN_MENGEPEL, ADEGAN_PERIKSA, ADEGAN_SALAH_SERATUS } from "./k4b4b-materi-2";
import { ADEGAN_KUBUS, ADEGAN_PENUTUP, ADEGAN_SAMA } from "./k4b4b-materi-3";
import { ADEGAN_LUAR_ISI, ADEGAN_LUAR_ISI_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k4b4b-luar-1";
import { ADEGAN_LUAR_LAPISAN, ADEGAN_LUAR_LAPISAN_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TANGGA, ADEGAN_LUAR_TANGGA_TERAPAN } from "./k4b4b-luar-2";

/**
 * Kelas 4 Bab 4 Sub-Bab B (volume), akhir cerita Kolam Renang Tirta Ceria.
 * Video materi (sekitar tiga menit): cerita orisinal IGIL "Ember Pak Anto" (Satria, Laras, Genta, Pak Hendro, Pak Anto, dan Bu Sinta di penutup).
 * Video kedua: tiga metode global (Fill and Pour, Layer Cubes, Liter Ladder), terpisah.
 */
export const JUDUL_K4B4B = "Ember Pak Anto";

export const VIDEO_MATERI_K4B4B: VideoStory = {
  id: "k4b4b-materi",
  judul: JUDUL_K4B4B,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "pengukuran volume", daftar: ["Liter dan mililiter", "Sentimeter kubik", "Kubus satuan"] }),
    ADEGAN_EMBER,
    ADEGAN_GELAS,
    ADEGAN_LITER,
    ADEGAN_SALAH_SERATUS,
    ADEGAN_PERIKSA,
    ADEGAN_MENGEPEL,
    ADEGAN_KUBUS,
    ADEGAN_SAMA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K4B4B: VideoStory = {
  id: "k4b4b-luar",
  judul: JUDUL_K4B4B,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "pengukuran volume", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_ISI,
    ADEGAN_LUAR_ISI_TERAPAN,
    ADEGAN_LUAR_LAPISAN,
    ADEGAN_LUAR_LAPISAN_TERAPAN,
    ADEGAN_LUAR_TANGGA,
    ADEGAN_LUAR_TANGGA_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
