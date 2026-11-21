import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_KISI, ADEGAN_METERAN, ADEGAN_SEPULUH } from "./k4b2d-materi-1";
import { ADEGAN_MENGGULUNG, ADEGAN_PERBAIKI, ADEGAN_SALAH_NOL } from "./k4b2d-materi-2";
import { ADEGAN_JEMBATAN, ADEGAN_PENUTUP, ADEGAN_SERATUS } from "./k4b2d-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_PERSEPULUH, ADEGAN_LUAR_PERSEPULUH_TERAPAN } from "./k4b2d-luar-1";
import { ADEGAN_LUAR_JEMBATAN, ADEGAN_LUAR_JEMBATAN_TERAPAN, ADEGAN_LUAR_PERSERATUS, ADEGAN_LUAR_PERSERATUS_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k4b2d-luar-2";

/**
 * Kelas 4 Bab 2 Sub-Bab D (pecahan per sepuluh dan per seratus menjadi desimal), Sanggar Batik Kampung Mekar.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Meteran Kain Pak Bagas" (Satria, Laras, Genta, Pak Hendro, Pak Bagas, Bu Tuti).
 * Video kedua: tiga metode global (Tenths Grid, Hundredths Grid, Fraction Decimal Bridge), terpisah.
 */
export const JUDUL_K4B2D = "Meteran Kain Pak Bagas";

export const VIDEO_MATERI_K4B2D: VideoStory = {
  id: "k4b2d-materi",
  judul: JUDUL_K4B2D,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "pecahan desimal per sepuluh dan per seratus", daftar: ["Persepuluhan", "Perseratusan", "Menulis dengan koma"] }),
    ADEGAN_METERAN,
    ADEGAN_SEPULUH,
    ADEGAN_KISI,
    ADEGAN_SALAH_NOL,
    ADEGAN_PERBAIKI,
    ADEGAN_MENGGULUNG,
    ADEGAN_SERATUS,
    ADEGAN_JEMBATAN,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K4B2D: VideoStory = {
  id: "k4b2d-luar",
  judul: JUDUL_K4B2D,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "pecahan desimal per sepuluh dan per seratus", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_PERSEPULUH,
    ADEGAN_LUAR_PERSEPULUH_TERAPAN,
    ADEGAN_LUAR_PERSERATUS,
    ADEGAN_LUAR_PERSERATUS_TERAPAN,
    ADEGAN_LUAR_JEMBATAN,
    ADEGAN_LUAR_JEMBATAN_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
