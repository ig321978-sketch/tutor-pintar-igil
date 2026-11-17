import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_GELAS, ADEGAN_KUE, ADEGAN_PESTA } from "./k1b1d-materi-1";
import { ADEGAN_BALON, ADEGAN_KURSI } from "./k1b1d-materi-2";
import { ADEGAN_PENUTUP, ADEGAN_TERBAGI } from "./k1b1d-materi-3";
import { ADEGAN_LUAR_IKATAN, ADEGAN_LUAR_IKATAN_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b1d-luar-1";
import { ADEGAN_LUAR_BATANG, ADEGAN_LUAR_BATANG_TERAPAN, ADEGAN_LUAR_MANIK, ADEGAN_LUAR_MANIK_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k1b1d-luar-2";

/**
 * Kelas 1 Bab 1 Sub-Bab D (pasangan bilangan), sub-bab terakhir dan akhir cerita Misi Rumah Rapi.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Pesta Rumah Rapi", lanjutan "Tangga Gudang Loteng"
 * (Igil, Kaka, Abang, Mamah). Video kedua: tiga metode global, terpisah.
 */
export const JUDUL_K1B1D = "Pesta Rumah Rapi";

export const VIDEO_MATERI_K1B1D: VideoStory = {
  id: "k1b1d-materi",
  judul: JUDUL_K1B1D,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "pasangan bilangan", daftar: ["Memisahkan bilangan", "Menggabungkan dua bagian", "Mencari pasangan sepuluh"] }),
    ADEGAN_PESTA,
    ADEGAN_KUE,
    ADEGAN_GELAS,
    ADEGAN_BALON,
    ADEGAN_KURSI,
    ADEGAN_TERBAGI,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B1D: VideoStory = {
  id: "k1b1d-luar",
  judul: JUDUL_K1B1D,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "pasangan bilangan", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_IKATAN,
    ADEGAN_LUAR_IKATAN_TERAPAN,
    ADEGAN_LUAR_BATANG,
    ADEGAN_LUAR_BATANG_TERAPAN,
    ADEGAN_LUAR_MANIK,
    ADEGAN_LUAR_MANIK_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
