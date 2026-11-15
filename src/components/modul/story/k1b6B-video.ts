import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_CERITA, ADEGAN_GABUNG, ADEGAN_MAJU } from "./k1b6B-materi-1";
import { ADEGAN_GARIS_MAJU, ADEGAN_MAJU_LAGI, ADEGAN_SEPULUH, ADEGAN_SEPULUH_LAGI } from "./k1b6B-materi-2";
import { ADEGAN_KEMBAR, ADEGAN_NILAI_TEMPAT, ADEGAN_PASANGAN, ADEGAN_SEDOTAN } from "./k1b6B-materi-3";
import { ADEGAN_DETEKTIF, ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP, ADEGAN_PILIH, ADEGAN_SOAL_CERITA } from "./k1b6B-materi-4";
import { ADEGAN_LUAR_MAJU, ADEGAN_LUAR_MAJU_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b6B-luar-1";
import { ADEGAN_LUAR_PASANGAN, ADEGAN_LUAR_PASANGAN_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SEPULUH, ADEGAN_LUAR_SEPULUH_TERAPAN } from "./k1b6B-luar-2";

/** Kelas 1 Bab 6 Sub-Bab B (Penjumlahan yang Hasilnya Kurang dari 20): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K1B6B: VideoStory = {
  id: "k1b6B-materi",
  judul: "Penjumlahan yang Hasilnya Kurang dari 20",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "menjumlahkan dua bilangan", daftar: ["Menghitung maju", "Memisah dan menggabung", "Menambah puluhan dan satuan"] }),
    ADEGAN_CERITA,
    ADEGAN_GABUNG,
    ADEGAN_MAJU,
    ADEGAN_GARIS_MAJU,
    ADEGAN_MAJU_LAGI,
    ADEGAN_SEPULUH,
    ADEGAN_SEPULUH_LAGI,
    ADEGAN_KEMBAR,
    ADEGAN_PASANGAN,
    ADEGAN_SEDOTAN,
    ADEGAN_NILAI_TEMPAT,
    ADEGAN_PILIH,
    ADEGAN_SOAL_CERITA,
    ADEGAN_DETEKTIF,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B6B: VideoStory = {
  id: "k1b6B-luar",
  judul: "Penjumlahan yang Hasilnya Kurang dari 20: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "menjumlahkan dua bilangan" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_MAJU,
    ADEGAN_LUAR_MAJU_TERAPAN,
    ADEGAN_LUAR_PASANGAN,
    ADEGAN_LUAR_PASANGAN_TERAPAN,
    ADEGAN_LUAR_SEPULUH,
    ADEGAN_LUAR_SEPULUH_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
