import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_ATURAN, ADEGAN_BENTUK, ADEGAN_CERITA, ADEGAN_NAMA, ADEGAN_PERIKSA } from "./k1b4b-materi-1";
import { ADEGAN_BESAR, ADEGAN_GANTI, ADEGAN_LANGKAH, ADEGAN_MAINAN, ADEGAN_RAPI, ADEGAN_WARNA } from "./k1b4b-materi-2";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP } from "./k1b4b-materi-3";
import { ADEGAN_LUAR_KENALI, ADEGAN_LUAR_KENALI_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b4b-luar-1";
import { ADEGAN_LUAR_PILAH, ADEGAN_LUAR_PILAH_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SEKITAR, ADEGAN_LUAR_SEKITAR_TERAPAN } from "./k1b4b-luar-2";

/** Kelas 1 Bab 4 Sub-Bab B (Mengelompokkan Benda): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K1B4B: VideoStory = {
  id: "k1b4b-materi",
  judul: "Mengelompokkan Benda",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "mengelompokkan benda", daftar: ["Memilih satu aturan", "Memeriksa tiap benda", "Menghitung anggota"] }),
    ADEGAN_CERITA,
    ADEGAN_ATURAN,
    ADEGAN_BENTUK,
    ADEGAN_PERIKSA,
    ADEGAN_NAMA,
    ADEGAN_WARNA,
    ADEGAN_GANTI,
    ADEGAN_BESAR,
    ADEGAN_MAINAN,
    ADEGAN_RAPI,
    ADEGAN_LANGKAH,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B4B: VideoStory = {
  id: "k1b4b-luar",
  judul: "Mengelompokkan Benda: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "mengelompokkan benda" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_KENALI,
    ADEGAN_LUAR_KENALI_TERAPAN,
    ADEGAN_LUAR_PILAH,
    ADEGAN_LUAR_PILAH_TERAPAN,
    ADEGAN_LUAR_SEKITAR,
    ADEGAN_LUAR_SEKITAR_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
