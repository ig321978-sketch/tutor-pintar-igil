import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_CERITA, ADEGAN_KATA, ADEGAN_KATA_TELITI, ADEGAN_PASANGKAN } from "./k1b5d-materi-1";
import { ADEGAN_JERUK, ADEGAN_PALING, ADEGAN_URUT_BESAR, ADEGAN_URUT_KECIL } from "./k1b5d-materi-2";
import { ADEGAN_GARIS, ADEGAN_PULUHAN_BEDA, ADEGAN_STOPLES, ADEGAN_TANDA } from "./k1b5d-materi-3";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP } from "./k1b5d-materi-4";
import { ADEGAN_LUAR_HITUNG, ADEGAN_LUAR_HITUNG_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b5d-luar-1";
import { ADEGAN_LUAR_BINGKAI, ADEGAN_LUAR_BINGKAI_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SEPULUH, ADEGAN_LUAR_SEPULUH_TERAPAN } from "./k1b5d-luar-2";

/** Kelas 1 Bab 5 Sub-Bab D (Membandingkan dan Mengurutkan Bilangan): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K1B5D: VideoStory = {
  id: "k1b5d-materi",
  judul: "Membandingkan dan Mengurutkan Bilangan",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "membandingkan dan mengurutkan bilangan", daftar: ["Membandingkan dua kumpulan", "Mencari paling banyak", "Mengurutkan bilangan"] }),
    ADEGAN_CERITA,
    ADEGAN_KATA_TELITI,
    ADEGAN_PASANGKAN,
    ADEGAN_KATA,
    ADEGAN_JERUK,
    ADEGAN_PALING,
    ADEGAN_URUT_KECIL,
    ADEGAN_URUT_BESAR,
    ADEGAN_STOPLES,
    ADEGAN_PULUHAN_BEDA,
    ADEGAN_GARIS,
    ADEGAN_TANDA,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B5D: VideoStory = {
  id: "k1b5d-luar",
  judul: "Membandingkan dan Mengurutkan Bilangan: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "membandingkan dan mengurutkan bilangan" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_HITUNG,
    ADEGAN_LUAR_HITUNG_TERAPAN,
    ADEGAN_LUAR_SEPULUH,
    ADEGAN_LUAR_SEPULUH_TERAPAN,
    ADEGAN_LUAR_BINGKAI,
    ADEGAN_LUAR_BINGKAI_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
