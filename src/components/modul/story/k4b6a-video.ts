import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_AKTIVITAS1 } from "./k4b6a-materi-1";
import { ADEGAN_AKTIVITAS2, ADEGAN_KAREL, ADEGAN_KELAS, ADEGAN_WARNA } from "./k4b6a-materi-2";
import { ADEGAN_BERLATIH_1, ADEGAN_BERLATIH_2, ADEGAN_BERPIKIR, ADEGAN_PENUTUP } from "./k4b6a-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_PK, ADEGAN_LUAR_PK_TERAPAN, ADEGAN_LUAR_TURUS, ADEGAN_LUAR_TURUS_TERAPAN } from "./k4b6a-luar-1";
import { ADEGAN_LUAR_BACA, ADEGAN_LUAR_BACA_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SKALA, ADEGAN_LUAR_SKALA_TERAPAN } from "./k4b6a-luar-2";

/** Kelas 4 Bab 6 Sub-Bab A (piktogram), termasuk pembuka bab: video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K4B6A: VideoStory = {
  id: "k4b6a-materi",
  judul: "Piktogram",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "piktogram", daftar: ["Menyajikan data jadi gambar", "Piktogram dengan skala", "Membandingkan data"] }),
    ADEGAN_AKTIVITAS1,
    ADEGAN_KELAS,
    ADEGAN_KAREL,
    ADEGAN_AKTIVITAS2,
    ADEGAN_WARNA,
    ADEGAN_BERLATIH_1,
    ADEGAN_BERLATIH_2,
    ADEGAN_BERPIKIR,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K4B6A: VideoStory = {
  id: "k4b6a-luar",
  judul: "Piktogram: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "piktogram" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_PK,
    ADEGAN_LUAR_PK_TERAPAN,
    ADEGAN_LUAR_TURUS,
    ADEGAN_LUAR_TURUS_TERAPAN,
    ADEGAN_LUAR_BACA,
    ADEGAN_LUAR_BACA_TERAPAN,
    ADEGAN_LUAR_SKALA,
    ADEGAN_LUAR_SKALA_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
