import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BAK, ADEGAN_BIRU, ADEGAN_MERAH } from "./k4b2b-materi-1";
import { ADEGAN_BANDING, ADEGAN_MENGADUK, ADEGAN_SALAH_SAMA } from "./k4b2b-materi-2";
import { ADEGAN_GARIS, ADEGAN_PENUTUP, ADEGAN_URUT } from "./k4b2b-materi-3";
import { ADEGAN_LUAR_PEMBILANG, ADEGAN_LUAR_PEMBILANG_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k4b2b-luar-1";
import { ADEGAN_LUAR_BATANG, ADEGAN_LUAR_BATANG_TERAPAN, ADEGAN_LUAR_GARIS, ADEGAN_LUAR_GARIS_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k4b2b-luar-2";

/**
 * K4 Bab 2 Sub-Bab B (membandingkan dan mengurutkan pecahan berpenyebut sama), cerita Sanggar Batik Kampung Mekar.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Bak Warna Pak Joyo" (Satria, Laras, Genta, Pak Hendro, Pak Joyo, Kak Sekar).
 * Video kedua: tiga metode global (Compare Numerators, Fraction Bars, Order on Line), terpisah.
 */
export const JUDUL_K4B2B = "Bak Warna Pak Joyo";

export const VIDEO_MATERI_K4B2B: VideoStory = {
  id: "k4b2b-materi",
  judul: JUDUL_K4B2B,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "membandingkan pecahan berpenyebut sama", daftar: ["Penyebut yang sama", "Membandingkan pembilang", "Mengurutkan pecahan"] }),
    ADEGAN_BAK,
    ADEGAN_BIRU,
    ADEGAN_MERAH,
    ADEGAN_SALAH_SAMA,
    ADEGAN_BANDING,
    ADEGAN_MENGADUK,
    ADEGAN_URUT,
    ADEGAN_GARIS,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K4B2B: VideoStory = {
  id: "k4b2b-luar",
  judul: JUDUL_K4B2B,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "membandingkan pecahan berpenyebut sama", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_PEMBILANG,
    ADEGAN_LUAR_PEMBILANG_TERAPAN,
    ADEGAN_LUAR_BATANG,
    ADEGAN_LUAR_BATANG_TERAPAN,
    ADEGAN_LUAR_GARIS,
    ADEGAN_LUAR_GARIS_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
