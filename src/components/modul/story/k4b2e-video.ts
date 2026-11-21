import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_DESIMAL, ADEGAN_PAMERAN, ADEGAN_PERSEN } from "./k4b2e-materi-1";
import { ADEGAN_GESER, ADEGAN_LAMPION, ADEGAN_SALAH_ENAM } from "./k4b2e-materi-2";
import { ADEGAN_KEMBALI, ADEGAN_PENUTUP, ADEGAN_ULANG } from "./k4b2e-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_PERSERATUS, ADEGAN_LUAR_PERSERATUS_TERAPAN } from "./k4b2e-luar-1";
import { ADEGAN_LUAR_JEMBATAN, ADEGAN_LUAR_JEMBATAN_TERAPAN, ADEGAN_LUAR_KISI, ADEGAN_LUAR_KISI_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k4b2e-luar-2";

/**
 * Kelas 4 Bab 2 Sub-Bab E (desimal perseratusan dan persen), akhir cerita Sanggar Batik Kampung Mekar.
 * Video materi (sekitar tiga menit): cerita orisinal IGIL "Papan Pameran Bu Tuti" (Satria, Laras, Genta, Pak Hendro, Bu Tuti, dan tamu Sub-Bab A sampai D di penutup).
 * Video kedua: tiga metode global (Percent as Hundredths, Hundred Grid, Decimal Percent Bridge), terpisah.
 */
export const JUDUL_K4B2E = "Papan Pameran Bu Tuti";

export const VIDEO_MATERI_K4B2E: VideoStory = {
  id: "k4b2e-materi",
  judul: JUDUL_K4B2E,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "desimal dan persen", daftar: ["Persen berarti per seratus", "Desimal menjadi persen", "Persen menjadi desimal"] }),
    ADEGAN_PAMERAN,
    ADEGAN_PERSEN,
    ADEGAN_DESIMAL,
    ADEGAN_SALAH_ENAM,
    ADEGAN_GESER,
    ADEGAN_LAMPION,
    ADEGAN_KEMBALI,
    ADEGAN_ULANG,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K4B2E: VideoStory = {
  id: "k4b2e-luar",
  judul: JUDUL_K4B2E,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "desimal dan persen", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_PERSERATUS,
    ADEGAN_LUAR_PERSERATUS_TERAPAN,
    ADEGAN_LUAR_KISI,
    ADEGAN_LUAR_KISI_TERAPAN,
    ADEGAN_LUAR_JEMBATAN,
    ADEGAN_LUAR_JEMBATAN_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
