import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_LENGKUNG, ADEGAN_PIKNIK, ADEGAN_SEGIEMPAT, ADEGAN_SEGITIGA, ADEGAN_TIGA_BENTUK } from "./k1b4a-materi-1";
import { ADEGAN_BAYANGAN, ADEGAN_DESKRIPSI, ADEGAN_DUA_SEGIEMPAT, ADEGAN_KERANJANG, ADEGAN_TETAP } from "./k1b4a-materi-2";
import { ADEGAN_DETEKTIF, ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PAKU, ADEGAN_PENUTUP, ADEGAN_WARNAI } from "./k1b4a-materi-3";
import { ADEGAN_LUAR_KENALI, ADEGAN_LUAR_KENALI_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_PILAH } from "./k1b4a-luar-1";
import { ADEGAN_LUAR_PILAH_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SEKITAR, ADEGAN_LUAR_SEKITAR_TERAPAN } from "./k1b4a-luar-2";

/** Kelas 1 Bab 4 Sub-Bab A (Mendeskripsikan Benda Berdasarkan Bentuk): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K1B4A: VideoStory = {
  id: "k1b4a-materi",
  judul: "Mendeskripsikan Benda Berdasarkan Bentuk",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "mengenal bentuk benda", daftar: ["Bentuk lengkung", "Bentuk segitiga", "Bentuk segi empat"] }),
    ADEGAN_PIKNIK,
    ADEGAN_TIGA_BENTUK,
    ADEGAN_LENGKUNG,
    ADEGAN_SEGITIGA,
    ADEGAN_SEGIEMPAT,
    ADEGAN_DUA_SEGIEMPAT,
    ADEGAN_TETAP,
    ADEGAN_DESKRIPSI,
    ADEGAN_KERANJANG,
    ADEGAN_BAYANGAN,
    ADEGAN_PAKU,
    ADEGAN_WARNAI,
    ADEGAN_DETEKTIF,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B4A: VideoStory = {
  id: "k1b4a-luar",
  judul: "Mendeskripsikan Benda Berdasarkan Bentuk: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "mengenal bentuk benda" }),
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
