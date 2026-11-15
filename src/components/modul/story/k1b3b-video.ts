import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BAGAN, ADEGAN_BALON, ADEGAN_CERITA, ADEGAN_TELUR } from "./k1b3b-materi-1";
import { ADEGAN_BATU, ADEGAN_KIRA, ADEGAN_LAIN, ADEGAN_NOL } from "./k1b3b-materi-2";
import { ADEGAN_BINGKAI, ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP, ADEGAN_PILIH, ADEGAN_SEPULUH } from "./k1b3b-materi-3";
import { ADEGAN_LUAR_AMBIL, ADEGAN_LUAR_AMBIL_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b3b-luar-1";
import { ADEGAN_LUAR_BINGKAI, ADEGAN_LUAR_BINGKAI_TERAPAN, ADEGAN_LUAR_MUNDUR, ADEGAN_LUAR_MUNDUR_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k1b3b-luar-2";

/** Kelas 1 Bab 3 Sub-Bab B (Berbagai Cara Pengurangan): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K1B3B: VideoStory = {
  id: "k1b3b-materi",
  judul: "Berbagai Cara Pengurangan",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "berbagai cara pengurangan", daftar: ["Pasangan bilangan", "Hitung mundur", "Pengurangan di bingkai"] }),
    ADEGAN_CERITA,
    ADEGAN_TELUR,
    ADEGAN_BAGAN,
    ADEGAN_BALON,
    ADEGAN_BATU,
    ADEGAN_KIRA,
    ADEGAN_LAIN,
    ADEGAN_NOL,
    ADEGAN_BINGKAI,
    ADEGAN_SEPULUH,
    ADEGAN_PILIH,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B3B: VideoStory = {
  id: "k1b3b-luar",
  judul: "Berbagai Cara Pengurangan: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "berbagai cara pengurangan" }),
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
