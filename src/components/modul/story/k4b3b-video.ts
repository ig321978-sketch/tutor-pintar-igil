import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BEDA, ADEGAN_LANJUT, ADEGAN_PANGGUNG } from "./k4b3b-materi-1";
import { ADEGAN_PERIKSA, ADEGAN_SALAH_BEDA, ADEGAN_SPANDUK } from "./k4b3b-materi-2";
import { ADEGAN_KELIMA, ADEGAN_MENGECIL, ADEGAN_PENUTUP } from "./k4b3b-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_RANTAI, ADEGAN_LUAR_RANTAI_TERAPAN } from "./k4b3b-luar-1";
import { ADEGAN_LUAR_MESIN, ADEGAN_LUAR_MESIN_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TABEL, ADEGAN_LUAR_TABEL_TERAPAN } from "./k4b3b-luar-2";

/**
 * Kelas 4 Bab 3 Sub-Bab B (pola bilangan), akhir cerita Orkestra Angklung Kampung Senandung.
 * Video materi (sekitar tiga menit): cerita orisinal IGIL "Barisan Kursi Pak Gunawan" (Satria, Laras, Genta, Pak Hendro, Pak Gunawan, dan Bu Ratri di penutup).
 * Video kedua: tiga metode global (Jump Chain, Rule Machine, Position Table), terpisah.
 */
export const JUDUL_K4B3B = "Barisan Kursi Pak Gunawan";

export const VIDEO_MATERI_K4B3B: VideoStory = {
  id: "k4b3b-materi",
  judul: JUDUL_K4B3B,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "pola bilangan", daftar: ["Beda tetap", "Melanjutkan pola", "Bilangan ke berapa"] }),
    ADEGAN_PANGGUNG,
    ADEGAN_BEDA,
    ADEGAN_LANJUT,
    ADEGAN_SALAH_BEDA,
    ADEGAN_PERIKSA,
    ADEGAN_SPANDUK,
    ADEGAN_KELIMA,
    ADEGAN_MENGECIL,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K4B3B: VideoStory = {
  id: "k4b3b-luar",
  judul: JUDUL_K4B3B,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "pola bilangan", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_RANTAI,
    ADEGAN_LUAR_RANTAI_TERAPAN,
    ADEGAN_LUAR_MESIN,
    ADEGAN_LUAR_MESIN_TERAPAN,
    ADEGAN_LUAR_TABEL,
    ADEGAN_LUAR_TABEL_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
