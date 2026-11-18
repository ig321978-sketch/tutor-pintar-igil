import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BOLA_KABUR, ADEGAN_BISA_DIISI, ADEGAN_GUDANG } from "./k2b3C-materi-1";
import { ADEGAN_GELINDING, ADEGAN_KUBUS_BALOK, ADEGAN_TABUNG_KERUCUT_BOLA } from "./k2b3C-materi-2";
import { ADEGAN_PENUTUP, ADEGAN_RAK_RAPI, ADEGAN_TABEL } from "./k2b3C-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_TAS, ADEGAN_LUAR_TAS_TERAPAN } from "./k2b3C-luar-1";
import { ADEGAN_LUAR_CETAK, ADEGAN_LUAR_CETAK_TERAPAN, ADEGAN_LUAR_PANDANG, ADEGAN_LUAR_PANDANG_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k2b3C-luar-2";

/**
 * Kelas 2 Bab 3 Sub-Bab C (bangun ruang), akhir cerita Taman Bermain Sekolah.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Gudang Mainan Pak Rudi" (Chacha, Dika, Nia, Bu Sari, Pak Rudi).
 * Video kedua: tiga metode global, terpisah.
 */
export const JUDUL_K2B3C = "Gudang Mainan Pak Rudi";

export const VIDEO_MATERI_K2B3C: VideoStory = {
  id: "k2b3C-materi",
  judul: JUDUL_K2B3C,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "bangun ruang", daftar: ["Bangun datar dan bangun ruang", "Permukaan datar dan lengkung", "Kubus, balok, tabung, kerucut, dan bola"] }),
    ADEGAN_GUDANG,
    ADEGAN_BOLA_KABUR,
    ADEGAN_BISA_DIISI,
    ADEGAN_GELINDING,
    ADEGAN_KUBUS_BALOK,
    ADEGAN_TABUNG_KERUCUT_BOLA,
    ADEGAN_TABEL,
    ADEGAN_RAK_RAPI,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B3C: VideoStory = {
  id: "k2b3C-luar",
  judul: JUDUL_K2B3C,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "bangun ruang", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_TAS,
    ADEGAN_LUAR_TAS_TERAPAN,
    ADEGAN_LUAR_CETAK,
    ADEGAN_LUAR_CETAK_TERAPAN,
    ADEGAN_LUAR_PANDANG,
    ADEGAN_LUAR_PANDANG_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
