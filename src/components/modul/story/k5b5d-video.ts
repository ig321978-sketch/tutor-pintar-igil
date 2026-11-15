import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BANDING, ADEGAN_BENTUK_1, ADEGAN_TABEL_1, ADEGAN_TABEL_2 } from "./k5b5d-materi-2";
import { ADEGAN_MISKONSEPSI, ADEGAN_PENGAYAAN, ADEGAN_REFLEKSI_D } from "./k5b5d-materi-3";
import { ADEGAN_SOAL_KAWAT } from "./k5b5d-materi-1";
import { ADEGAN_LUAR_ISO, ADEGAN_LUAR_ISO_TERAPAN, ADEGAN_LUAR_MAKS, ADEGAN_LUAR_MAKS_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k5b5d-luar-1";
import { ADEGAN_LUAR_MIN, ADEGAN_LUAR_MIN_TERAPAN, ADEGAN_LUAR_RASIO, ADEGAN_LUAR_RASIO_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b5d-luar-2";

/** Kelas 5 Bab 5 Sub-Bab D (hubungan keliling dan luas, penutup bab): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B5D: VideoStory = {
  id: "k5b5d-materi",
  judul: "Hubungan Keliling dan Luas",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "hubungan keliling dan luas", daftar: ["Ukuran dari keliling tetap", "Menghitung keliling dan luas", "Bentuk dengan luas terbesar"] }),
    ADEGAN_SOAL_KAWAT,
    ADEGAN_BENTUK_1,
    ADEGAN_TABEL_1,
    ADEGAN_TABEL_2,
    ADEGAN_BANDING,
    ADEGAN_MISKONSEPSI,
    ADEGAN_REFLEKSI_D,
    ADEGAN_PENGAYAAN,
  ],
};

export const VIDEO_LUAR_K5B5D: VideoStory = {
  id: "k5b5d-luar",
  judul: "Hubungan Keliling dan Luas: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "hubungan keliling dan luas" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_ISO,
    ADEGAN_LUAR_ISO_TERAPAN,
    ADEGAN_LUAR_MAKS,
    ADEGAN_LUAR_MAKS_TERAPAN,
    ADEGAN_LUAR_MIN,
    ADEGAN_LUAR_MIN_TERAPAN,
    ADEGAN_LUAR_RASIO,
    ADEGAN_LUAR_RASIO_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
