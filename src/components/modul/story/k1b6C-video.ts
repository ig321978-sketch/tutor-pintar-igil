import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_CERITA, ADEGAN_KATA, ADEGAN_MUNDUR } from "./k1b6C-materi-1";
import { ADEGAN_BOLU, ADEGAN_GARIS, ADEGAN_PASANGAN } from "./k1b6C-materi-2";
import { ADEGAN_HABIS, ADEGAN_NILAI, ADEGAN_PERIKSA, ADEGAN_STIKER } from "./k1b6C-materi-3";
import { ADEGAN_KELUARGA, ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP, ADEGAN_PILIH } from "./k1b6C-materi-4";
import { ADEGAN_LUAR_MUNDUR, ADEGAN_LUAR_MUNDUR_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b6C-luar-1";
import { ADEGAN_LUAR_PASANGAN, ADEGAN_LUAR_PASANGAN_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SEPULUH, ADEGAN_LUAR_SEPULUH_TERAPAN } from "./k1b6C-luar-2";

/** Kelas 1 Bab 6 Sub-Bab C (Pengurangan yang Hasilnya Kurang dari 20): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K1B6C: VideoStory = {
  id: "k1b6C-materi",
  judul: "Pengurangan yang Hasilnya Kurang dari 20",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "mengurangi bilangan belasan", daftar: ["Menghitung mundur", "Memisah puluhan dan satuan", "Memeriksa dengan menambah"] }),
    ADEGAN_CERITA,
    ADEGAN_KATA,
    ADEGAN_MUNDUR,
    ADEGAN_GARIS,
    ADEGAN_BOLU,
    ADEGAN_PASANGAN,
    ADEGAN_NILAI,
    ADEGAN_PERIKSA,
    ADEGAN_HABIS,
    ADEGAN_STIKER,
    ADEGAN_PILIH,
    ADEGAN_KELUARGA,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B6C: VideoStory = {
  id: "k1b6C-luar",
  judul: "Pengurangan yang Hasilnya Kurang dari 20: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "mengurangi bilangan belasan" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_MUNDUR,
    ADEGAN_LUAR_MUNDUR_TERAPAN,
    ADEGAN_LUAR_PASANGAN,
    ADEGAN_LUAR_PASANGAN_TERAPAN,
    ADEGAN_LUAR_SEPULUH,
    ADEGAN_LUAR_SEPULUH_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
