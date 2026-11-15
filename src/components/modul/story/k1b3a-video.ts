import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_CERITA, ADEGAN_PAPAN, ADEGAN_TUTUP } from "./k1b3a-materi-1";
import { ADEGAN_KELERENG, ADEGAN_KUE, ADEGAN_KUPU, ADEGAN_MOBIL, ADEGAN_SISA_NOL } from "./k1b3a-materi-2";
import { ADEGAN_BINGKAI, ADEGAN_GORESAN, ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP, ADEGAN_PERIKSA } from "./k1b3a-materi-3";
import { ADEGAN_LUAR_AMBIL, ADEGAN_LUAR_AMBIL_TERAPAN, ADEGAN_LUAR_MUNDUR, ADEGAN_LUAR_MUNDUR_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b3a-luar-1";
import { ADEGAN_LUAR_BINGKAI, ADEGAN_LUAR_BINGKAI_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k1b3a-luar-2";

/** Kelas 1 Bab 3 Sub-Bab A (Cerita Pengurangan: berkurang dan tersisa): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K1B3A: VideoStory = {
  id: "k1b3a-materi",
  judul: "Cerita Pengurangan",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "cerita pengurangan", daftar: ["Benda yang berkurang", "Benda yang tersisa", "Menyusun kalimat kurang"] }),
    ADEGAN_CERITA,
    ADEGAN_TUTUP,
    ADEGAN_PAPAN,
    ADEGAN_KUE,
    ADEGAN_MOBIL,
    ADEGAN_KUPU,
    ADEGAN_KELERENG,
    ADEGAN_SISA_NOL,
    ADEGAN_BINGKAI,
    ADEGAN_GORESAN,
    ADEGAN_PERIKSA,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B3A: VideoStory = {
  id: "k1b3a-luar",
  judul: "Cerita Pengurangan: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "cerita pengurangan" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_AMBIL,
    ADEGAN_LUAR_AMBIL_TERAPAN,
    ADEGAN_LUAR_MUNDUR,
    ADEGAN_LUAR_MUNDUR_TERAPAN,
    ADEGAN_LUAR_BINGKAI,
    ADEGAN_LUAR_BINGKAI_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
