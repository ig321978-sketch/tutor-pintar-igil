import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BUNGKUS, ADEGAN_CERITA_KUE, ADEGAN_LOMPAT } from "./k2b7A-materi-1";
import { ADEGAN_KELERENG, ADEGAN_NILAI_TEMPAT, ADEGAN_PASANGAN, ADEGAN_RAMBUTAN } from "./k2b7A-materi-2";
import { ADEGAN_BACA_TULIS, ADEGAN_PERKIRAAN, ADEGAN_TERTUKAR } from "./k2b7A-materi-3";
import { ADEGAN_BUKTIKAN, ADEGAN_PENUTUP, ADEGAN_SELISIH } from "./k2b7A-materi-4";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA } from "./k2b7A-materi-5";
import { ADEGAN_LUAR_HITUNG, ADEGAN_LUAR_HITUNG_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_RINGKAS } from "./k2b7A-luar-1";
import { ADEGAN_LUAR_PULUHAN, ADEGAN_LUAR_PULUHAN_TERAPAN, ADEGAN_LUAR_TABEL, ADEGAN_LUAR_TABEL_TERAPAN } from "./k2b7A-luar-2";

/** Kelas 2 Bab 7 Sub-Bab A (Menghitung, Membaca, dan Menulis Bilangan sampai 100): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K2B7A: VideoStory = {
  id: "k2b7A-materi",
  judul: "Menghitung, Membaca, dan Menulis Bilangan",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "membilang sampai seratus", daftar: ["Menghitung puluhan", "Membaca dan menulis bilangan", "Memperkirakan banyak benda"] }),
    ADEGAN_CERITA_KUE,
    ADEGAN_BUNGKUS,
    ADEGAN_LOMPAT,
    ADEGAN_RAMBUTAN,
    ADEGAN_KELERENG,
    ADEGAN_NILAI_TEMPAT,
    ADEGAN_PASANGAN,
    ADEGAN_BACA_TULIS,
    ADEGAN_TERTUKAR,
    ADEGAN_PERKIRAAN,
    ADEGAN_BUKTIKAN,
    ADEGAN_SELISIH,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B7A: VideoStory = {
  id: "k2b7A-luar",
  judul: "Menghitung sampai Seratus: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "membilang sampai seratus" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_HITUNG,
    ADEGAN_LUAR_HITUNG_TERAPAN,
    ADEGAN_LUAR_PULUHAN,
    ADEGAN_LUAR_PULUHAN_TERAPAN,
    ADEGAN_LUAR_TABEL,
    ADEGAN_LUAR_TABEL_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
