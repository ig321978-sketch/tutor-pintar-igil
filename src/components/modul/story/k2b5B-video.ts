import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BAGI_EMPAT, ADEGAN_KUMPULAN } from "./k2b5B-materi-1";
import { ADEGAN_BINTANG_DELAPAN, ADEGAN_BUKAN_SETENGAH, ADEGAN_IKAN_ENAM, ADEGAN_KARTU_SEPULUH } from "./k2b5B-materi-2";
import { ADEGAN_GANJIL_LIMA, ADEGAN_GANJIL_TUJUH, ADEGAN_GENAP_GANJIL, ADEGAN_POLA_SETENGAH } from "./k2b5B-materi-3";
import { ADEGAN_PASANGAN_DELAPAN, ADEGAN_PASANGAN_TUJUH, ADEGAN_PERIKSA_GABUNG, ADEGAN_SETENGAH_UTUH, ADEGAN_TABEL } from "./k2b5B-materi-4";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_EMPAT, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP } from "./k2b5B-materi-5";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_SETENGAH, ADEGAN_LUAR_SETENGAH_TERAPAN } from "./k2b5B-luar-1";
import { ADEGAN_LUAR_BAGIRATA, ADEGAN_LUAR_BAGIRATA_TERAPAN, ADEGAN_LUAR_CEK, ADEGAN_LUAR_CEK_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k2b5B-luar-2";

/** Kelas 2 Bab 5 Sub-Bab B (Setengah dari Kumpulan Benda): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K2B5B: VideoStory = {
  id: "k2b5B-materi",
  judul: "Setengah dari Kumpulan Benda",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "setengah dari kumpulan benda", daftar: ["Bagi dua sama banyak", "Pola setengah bilangan", "Mengenal genap dan ganjil"] }),
    ADEGAN_KUMPULAN,
    ADEGAN_BAGI_EMPAT,
    ADEGAN_IKAN_ENAM,
    ADEGAN_BUKAN_SETENGAH,
    ADEGAN_BINTANG_DELAPAN,
    ADEGAN_KARTU_SEPULUH,
    ADEGAN_POLA_SETENGAH,
    ADEGAN_GANJIL_LIMA,
    ADEGAN_GANJIL_TUJUH,
    ADEGAN_GENAP_GANJIL,
    ADEGAN_TABEL,
    ADEGAN_PASANGAN_DELAPAN,
    ADEGAN_PASANGAN_TUJUH,
    ADEGAN_PERIKSA_GABUNG,
    ADEGAN_SETENGAH_UTUH,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_LATIHAN_EMPAT,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B5B: VideoStory = {
  id: "k2b5B-luar",
  judul: "Setengah dari Kumpulan Benda: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "setengah dari kumpulan benda" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_SETENGAH,
    ADEGAN_LUAR_SETENGAH_TERAPAN,
    ADEGAN_LUAR_BAGIRATA,
    ADEGAN_LUAR_BAGIRATA_TERAPAN,
    ADEGAN_LUAR_CEK,
    ADEGAN_LUAR_CEK_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
