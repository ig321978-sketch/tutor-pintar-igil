import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_CERITA, ADEGAN_EMPAT, ADEGAN_KELUARGA, ADEGAN_KURANG, ADEGAN_TAMBAH } from "./k1b3c-materi-1";
import { ADEGAN_HILANG, ADEGAN_KAOS, ADEGAN_KEBALIKAN, ADEGAN_PERIKSA_KURANG, ADEGAN_PERIKSA_TAMBAH, ADEGAN_TANDA, ADEGAN_TUKAR } from "./k1b3c-materi-2";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP, ADEGAN_SUSUN } from "./k1b3c-materi-3";
import { ADEGAN_LUAR_AMBIL, ADEGAN_LUAR_AMBIL_TERAPAN, ADEGAN_LUAR_MUNDUR, ADEGAN_LUAR_MUNDUR_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b3c-luar-1";
import { ADEGAN_LUAR_BINGKAI, ADEGAN_LUAR_BINGKAI_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k1b3c-luar-2";

/** Kelas 1 Bab 3 Sub-Bab C (Hubungan Penjumlahan dan Pengurangan): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K1B3C: VideoStory = {
  id: "k1b3c-materi",
  judul: "Hubungan Penjumlahan dan Pengurangan",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "hubungan penjumlahan dan pengurangan", daftar: ["Keluarga bilangan", "Dua tambah, dua kurang", "Memeriksa jawaban"] }),
    ADEGAN_CERITA,
    ADEGAN_KELUARGA,
    ADEGAN_TAMBAH,
    ADEGAN_KURANG,
    ADEGAN_EMPAT,
    ADEGAN_KEBALIKAN,
    ADEGAN_KAOS,
    ADEGAN_TUKAR,
    ADEGAN_PERIKSA_KURANG,
    ADEGAN_PERIKSA_TAMBAH,
    ADEGAN_HILANG,
    ADEGAN_TANDA,
    ADEGAN_SUSUN,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B3C: VideoStory = {
  id: "k1b3c-luar",
  judul: "Hubungan Penjumlahan dan Pengurangan: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "hubungan penjumlahan dan pengurangan" }),
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
