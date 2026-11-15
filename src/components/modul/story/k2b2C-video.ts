import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BURUNG, ADEGAN_DONAT_KIRA, ADEGAN_EMPAT_LANGKAH, ADEGAN_KATA_KUNCI } from "./k2b2C-materi-1";
import { ADEGAN_DONAT_JUMLAH, ADEGAN_DONAT_SOLUSI, ADEGAN_KURANG_KUE, ADEGAN_TAMBAH_APEL } from "./k2b2C-materi-2";
import { ADEGAN_JERUK_AWAL, ADEGAN_KURANGNYA, ADEGAN_LEBIHNYA, ADEGAN_SELISIH } from "./k2b2C-materi-3";
import { ADEGAN_BUAT_SOAL, ADEGAN_KELERENG_AWAL, ADEGAN_TIGA_BONEKA } from "./k2b2C-materi-4";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP } from "./k2b2C-materi-5";
import { ADEGAN_LUAR_BAGIAN, ADEGAN_LUAR_BAGIAN_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k2b2C-luar-1";
import { ADEGAN_LUAR_BATANG, ADEGAN_LUAR_BATANG_TERAPAN, ADEGAN_LUAR_OPERASI, ADEGAN_LUAR_OPERASI_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k2b2C-luar-2";

/** Kelas 2 Bab 2 Sub-Bab C (Soal Cerita Penjumlahan dan Pengurangan): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K2B2C: VideoStory = {
  id: "k2b2C-materi",
  judul: "Soal Cerita Penjumlahan dan Pengurangan",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "soal cerita penjumlahan dan pengurangan", daftar: ["Kata kunci soal cerita", "Empat langkah penyelesaian", "Soal cerita yang lebih seru"] }),
    ADEGAN_BURUNG,
    ADEGAN_KATA_KUNCI,
    ADEGAN_DONAT_KIRA,
    ADEGAN_EMPAT_LANGKAH,
    ADEGAN_DONAT_SOLUSI,
    ADEGAN_DONAT_JUMLAH,
    ADEGAN_TAMBAH_APEL,
    ADEGAN_KURANG_KUE,
    ADEGAN_LEBIHNYA,
    ADEGAN_KURANGNYA,
    ADEGAN_SELISIH,
    ADEGAN_JERUK_AWAL,
    ADEGAN_KELERENG_AWAL,
    ADEGAN_TIGA_BONEKA,
    ADEGAN_BUAT_SOAL,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B2C: VideoStory = {
  id: "k2b2C-luar",
  judul: "Soal Cerita Penjumlahan dan Pengurangan: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "soal cerita penjumlahan dan pengurangan" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BAGIAN,
    ADEGAN_LUAR_BAGIAN_TERAPAN,
    ADEGAN_LUAR_BATANG,
    ADEGAN_LUAR_BATANG_TERAPAN,
    ADEGAN_LUAR_OPERASI,
    ADEGAN_LUAR_OPERASI_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
