import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_DUA_PER_EMPAT, ADEGAN_JAHIT, ADEGAN_SETENGAH } from "./k4b2c-materi-1";
import { ADEGAN_KANCING, ADEGAN_PERIKSA, ADEGAN_SALAH_TAMBAH } from "./k4b2c-materi-2";
import { ADEGAN_KALI, ADEGAN_PENUTUP, ADEGAN_SEDERHANA } from "./k4b2c-materi-3";
import { ADEGAN_LUAR_DAERAH, ADEGAN_LUAR_DAERAH_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k4b2c-luar-1";
import { ADEGAN_LUAR_BAGI, ADEGAN_LUAR_BAGI_TERAPAN, ADEGAN_LUAR_KALI, ADEGAN_LUAR_KALI_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k4b2c-luar-2";

/**
 * Kelas 4 Bab 2 Sub-Bab C (pecahan yang sama besar), cerita Sanggar Batik Kampung Mekar.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Meja Jahit Kak Sekar" (Satria, Laras, Genta, Pak Hendro, Kak Sekar).
 * Video kedua: tiga metode global (Area Model Match, Multiply by One, Divide Both), terpisah.
 */
export const JUDUL_K4B2C = "Meja Jahit Kak Sekar";

export const VIDEO_MATERI_K4B2C: VideoStory = {
  id: "k4b2c-materi",
  judul: JUDUL_K4B2C,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "pecahan yang sama besar", daftar: ["Bagian berbeda tetapi sama besar", "Mengalikan atau membagi dengan bilangan sama", "Menyederhanakan pecahan"] }),
    ADEGAN_JAHIT,
    ADEGAN_SETENGAH,
    ADEGAN_DUA_PER_EMPAT,
    ADEGAN_SALAH_TAMBAH,
    ADEGAN_PERIKSA,
    ADEGAN_KANCING,
    ADEGAN_KALI,
    ADEGAN_SEDERHANA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K4B2C: VideoStory = {
  id: "k4b2c-luar",
  judul: JUDUL_K4B2C,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "pecahan yang sama besar", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_DAERAH,
    ADEGAN_LUAR_DAERAH_TERAPAN,
    ADEGAN_LUAR_KALI,
    ADEGAN_LUAR_KALI_TERAPAN,
    ADEGAN_LUAR_BAGI,
    ADEGAN_LUAR_BAGI_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
