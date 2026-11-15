import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_KOMANG, ADEGAN_YOSEP_TABEL, ADEGAN_YOSEP_UANG } from "./k5b9c-materi-1";
import { ADEGAN_JAM_CARA, ADEGAN_JAM_SOAL } from "./k5b9c-materi-2";
import { ADEGAN_UJI_ANGKA, ADEGAN_UJI_PASANG, ADEGAN_UJI_PERNYATAAN } from "./k5b9c-materi-3";
import { ADEGAN_LUAR_C_BENTUK, ADEGAN_LUAR_C_BENTUK_TERAPAN, ADEGAN_LUAR_C_PEMBUKA, ADEGAN_LUAR_C_SEBAGIAN, ADEGAN_LUAR_C_SEBAGIAN_TERAPAN } from "./k5b9c-luar-1";
import { ADEGAN_LUAR_C_FLEKSIBEL, ADEGAN_LUAR_C_FLEKSIBEL_TERAPAN, ADEGAN_LUAR_C_RINGKAS, ADEGAN_LUAR_C_UANG, ADEGAN_LUAR_C_UANG_TERAPAN } from "./k5b9c-luar-2";

/**
 * Kelas 5 Bab 9 Sub-Bab C (Komposisi dan Dekomposisi): video materi kurikulum dan video metode luar, dua video terpisah.
 * Adegan administratif (pembuka sub-bab dan daftar refleksi) tetap ada di berkas materi, tetapi tidak diputar.
 */
export const VIDEO_MATERI_K5B9C: VideoStory = {
  id: "k5b9c-materi",
  judul: "Komposisi dan Dekomposisi",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "menyusun dan menguraikan bilangan", daftar: ["Menyusun uang jadi bilangan", "Menguraikan bilangan", "Cara lain membayar"] }),
    ADEGAN_YOSEP_UANG,
    ADEGAN_YOSEP_TABEL,
    ADEGAN_KOMANG,
    ADEGAN_JAM_SOAL,
    ADEGAN_JAM_CARA,
    ADEGAN_UJI_ANGKA,
    ADEGAN_UJI_PERNYATAAN,
    ADEGAN_UJI_PASANG,
  ],
};

export const VIDEO_LUAR_K5B9C: VideoStory = {
  id: "k5b9c-luar",
  judul: "Komposisi dan Dekomposisi: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "menyusun dan menguraikan bilangan" }),
    ADEGAN_LUAR_C_PEMBUKA,
    ADEGAN_LUAR_C_SEBAGIAN,
    ADEGAN_LUAR_C_SEBAGIAN_TERAPAN,
    ADEGAN_LUAR_C_BENTUK,
    ADEGAN_LUAR_C_BENTUK_TERAPAN,
    ADEGAN_LUAR_C_FLEKSIBEL,
    ADEGAN_LUAR_C_FLEKSIBEL_TERAPAN,
    ADEGAN_LUAR_C_UANG,
    ADEGAN_LUAR_C_UANG_TERAPAN,
    ADEGAN_LUAR_C_RINGKAS,
  ],
};
