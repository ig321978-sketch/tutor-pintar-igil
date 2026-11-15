import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BEDA_CARA, ADEGAN_DUA_GARIS, ADEGAN_URAI_ARTI, ADEGAN_URAI_MIRING, ADEGAN_URAI_TENGAH } from "./k2b3B-materi-1";
import { ADEGAN_DUA_SEGITIGA, ADEGAN_HITUNG_KEPING, ADEGAN_SUSUN_ARTI, ADEGAN_SUSUN_SEGIENAM } from "./k2b3B-materi-2";
import { ADEGAN_BALIK, ADEGAN_POLA_EMPAT, ADEGAN_POLA_ENAM, ADEGAN_POLA_LIMA, ADEGAN_POLA_TABEL, ADEGAN_POLA_TENGAH } from "./k2b3B-materi-3";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_EMPAT, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP } from "./k2b3B-materi-4";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_SUSUN, ADEGAN_LUAR_SUSUN_TERAPAN, ADEGAN_LUAR_URAI, ADEGAN_LUAR_URAI_TERAPAN } from "./k2b3B-luar-1";
import { ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TANGRAM, ADEGAN_LUAR_TANGRAM_TERAPAN } from "./k2b3B-luar-2";

/** Kelas 2 Bab 3 Sub-Bab B (Mengurai dan Menyusun Bangun Datar): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K2B3B: VideoStory = {
  id: "k2b3B-materi",
  judul: "Mengurai dan Menyusun Bangun Datar",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "mengurai dan menyusun bangun datar", daftar: ["Mengurai satu bangun", "Menyusun beberapa bangun", "Pola segitiga"] }),
    ADEGAN_URAI_ARTI,
    ADEGAN_URAI_MIRING,
    ADEGAN_URAI_TENGAH,
    ADEGAN_BEDA_CARA,
    ADEGAN_DUA_GARIS,
    ADEGAN_HITUNG_KEPING,
    ADEGAN_SUSUN_ARTI,
    ADEGAN_DUA_SEGITIGA,
    ADEGAN_SUSUN_SEGIENAM,
    ADEGAN_POLA_EMPAT,
    ADEGAN_POLA_LIMA,
    ADEGAN_POLA_ENAM,
    ADEGAN_POLA_TENGAH,
    ADEGAN_POLA_TABEL,
    ADEGAN_BALIK,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_LATIHAN_EMPAT,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B3B: VideoStory = {
  id: "k2b3B-luar",
  judul: "Mengurai dan Menyusun Bangun Datar: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "mengurai dan menyusun bangun datar" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_SUSUN,
    ADEGAN_LUAR_SUSUN_TERAPAN,
    ADEGAN_LUAR_URAI,
    ADEGAN_LUAR_URAI_TERAPAN,
    ADEGAN_LUAR_TANGRAM,
    ADEGAN_LUAR_TANGRAM_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
