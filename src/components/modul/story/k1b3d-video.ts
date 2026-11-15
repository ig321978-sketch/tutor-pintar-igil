import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BAGIAN, ADEGAN_CERITA, ADEGAN_KATA, ADEGAN_KEPIK } from "./k1b3d-materi-1";
import { ADEGAN_JAWAB, ADEGAN_KARDUS, ADEGAN_MULA, ADEGAN_PERGI, ADEGAN_TULIS } from "./k1b3d-materi-2";
import { ADEGAN_BERI, ADEGAN_DUA_KALI, ADEGAN_PERIKSA, ADEGAN_SUSUN } from "./k1b3d-materi-3";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP } from "./k1b3d-materi-4";
import { ADEGAN_LUAR_AMBIL, ADEGAN_LUAR_AMBIL_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b3d-luar-1";
import { ADEGAN_LUAR_BINGKAI, ADEGAN_LUAR_BINGKAI_TERAPAN, ADEGAN_LUAR_MUNDUR, ADEGAN_LUAR_MUNDUR_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k1b3d-luar-2";

/** Kelas 1 Bab 3 Sub-Bab D (Soal Cerita Pengurangan): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K1B3D: VideoStory = {
  id: "k1b3d-materi",
  judul: "Soal Cerita Pengurangan",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "soal cerita pengurangan", daftar: ["Membaca soal cerita", "Menyusun kalimat kurang", "Menjawab lalu memeriksa"] }),
    ADEGAN_CERITA,
    ADEGAN_BAGIAN,
    ADEGAN_KATA,
    ADEGAN_KEPIK,
    ADEGAN_TULIS,
    ADEGAN_JAWAB,
    ADEGAN_PERGI,
    ADEGAN_MULA,
    ADEGAN_KARDUS,
    ADEGAN_BERI,
    ADEGAN_DUA_KALI,
    ADEGAN_PERIKSA,
    ADEGAN_SUSUN,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B3D: VideoStory = {
  id: "k1b3d-luar",
  judul: "Soal Cerita Pengurangan: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "soal cerita pengurangan" }),
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
