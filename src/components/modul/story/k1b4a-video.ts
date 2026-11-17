import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_FESTIVAL, ADEGAN_KALENG, ADEGAN_KARTON } from "./k1b4a-materi-1";
import { ADEGAN_DIPUTAR, ADEGAN_KARDUS, ADEGAN_KARTU } from "./k1b4a-materi-2";
import { ADEGAN_HASIL, ADEGAN_PENUTUP } from "./k1b4a-materi-3";
import { ADEGAN_LUAR_BERBURU, ADEGAN_LUAR_BERBURU_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b4a-luar-1";
import { ADEGAN_LUAR_MISTERI, ADEGAN_LUAR_MISTERI_TERAPAN, ADEGAN_LUAR_PAKU, ADEGAN_LUAR_PAKU_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k1b4a-luar-2";

/**
 * Kelas 1 Bab 4 Sub-Bab A (mengenal bentuk), awal cerita Festival Mainan Kardus.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Bahan dari Gudang" (Igil, Kaka, Abang, Mamah, Pak RT).
 * Video kedua: tiga metode global, terpisah.
 */
export const JUDUL_K1B4A = "Bahan dari Gudang";

export const VIDEO_MATERI_K1B4A: VideoStory = {
  id: "k1b4a-materi",
  judul: JUDUL_K1B4A,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "mengenal bentuk benda", daftar: ["Bentuk benda", "Sisi lurus dan sudut", "Bentuk tetap sama"] }),
    ADEGAN_FESTIVAL,
    ADEGAN_KALENG,
    ADEGAN_KARTON,
    ADEGAN_KARDUS,
    ADEGAN_DIPUTAR,
    ADEGAN_KARTU,
    ADEGAN_HASIL,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B4A: VideoStory = {
  id: "k1b4a-luar",
  judul: JUDUL_K1B4A,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "mengenal bentuk benda", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BERBURU,
    ADEGAN_LUAR_BERBURU_TERAPAN,
    ADEGAN_LUAR_PAKU,
    ADEGAN_LUAR_PAKU_TERAPAN,
    ADEGAN_LUAR_MISTERI,
    ADEGAN_LUAR_MISTERI_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
