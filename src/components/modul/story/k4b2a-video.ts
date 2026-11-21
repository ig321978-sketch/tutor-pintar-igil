import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_LIPAT_DUA, ADEGAN_LIPAT_EMPAT, ADEGAN_SANGGAR } from "./k4b2a-materi-1";
import { ADEGAN_BANDINGKAN, ADEGAN_MENGADUK, ADEGAN_SALAH_DELAPAN } from "./k4b2a-materi-2";
import { ADEGAN_GARIS, ADEGAN_PENUTUP, ADEGAN_URUT } from "./k4b2a-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_PITA, ADEGAN_LUAR_PITA_TERAPAN } from "./k4b2a-luar-1";
import { ADEGAN_LUAR_GARIS, ADEGAN_LUAR_GARIS_TERAPAN, ADEGAN_LUAR_LIPAT, ADEGAN_LUAR_LIPAT_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k4b2a-luar-2";

/**
 * Kelas 4 Bab 2 Sub-Bab A (pecahan berpembilang satu), awal cerita Sanggar Batik Kampung Mekar.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Kain Lipat Bu Wulan" (Satria, Laras, Genta, Pak Hendro, Bu Wulan).
 * Video kedua: tiga metode global (Unit Fraction Strip, Fold the Paper, Fraction Number Line), terpisah.
 */
export const JUDUL_K4B2A = "Kain Lipat Bu Wulan";

export const VIDEO_MATERI_K4B2A: VideoStory = {
  id: "k4b2a-materi",
  judul: JUDUL_K4B2A,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "pecahan dengan pembilang satu", daftar: ["Satu bagian dari beberapa bagian sama besar", "Membandingkan pecahan", "Garis pecahan"] }),
    ADEGAN_SANGGAR,
    ADEGAN_LIPAT_DUA,
    ADEGAN_LIPAT_EMPAT,
    ADEGAN_SALAH_DELAPAN,
    ADEGAN_BANDINGKAN,
    ADEGAN_MENGADUK,
    ADEGAN_GARIS,
    ADEGAN_URUT,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K4B2A: VideoStory = {
  id: "k4b2a-luar",
  judul: JUDUL_K4B2A,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "pecahan dengan pembilang satu", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_PITA,
    ADEGAN_LUAR_PITA_TERAPAN,
    ADEGAN_LUAR_LIPAT,
    ADEGAN_LUAR_LIPAT_TERAPAN,
    ADEGAN_LUAR_GARIS,
    ADEGAN_LUAR_GARIS_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
