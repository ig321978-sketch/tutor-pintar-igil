import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BARU, ADEGAN_CARA, ADEGAN_CERITA, ADEGAN_KERETA, ADEGAN_URAI } from "./k1b4c-materi-1";
import { ADEGAN_JENIS, ADEGAN_KURANG_BAGIAN, ADEGAN_LIDI_BENTUK, ADEGAN_LIDI_RUMAH, ADEGAN_TAMBAH_BAGIAN } from "./k1b4c-materi-2";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PAS, ADEGAN_PENUTUP, ADEGAN_SUSUN } from "./k1b4c-materi-3";
import { ADEGAN_LUAR_KENALI, ADEGAN_LUAR_KENALI_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_PILAH } from "./k1b4c-luar-1";
import { ADEGAN_LUAR_PILAH_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SEKITAR, ADEGAN_LUAR_SEKITAR_TERAPAN } from "./k1b4c-luar-2";

/** Kelas 1 Bab 4 Sub-Bab C (Menyusun dan Mengurai Bentuk Bangun): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K1B4C: VideoStory = {
  id: "k1b4c-materi",
  judul: "Menyusun dan Mengurai Bentuk Bangun",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "menyusun dan mengurai bentuk bangun", daftar: ["Menyusun bentuk", "Mengurai bangun", "Menghitung penyusunnya"] }),
    ADEGAN_CERITA,
    ADEGAN_CARA,
    ADEGAN_BARU,
    ADEGAN_KERETA,
    ADEGAN_URAI,
    ADEGAN_JENIS,
    ADEGAN_TAMBAH_BAGIAN,
    ADEGAN_KURANG_BAGIAN,
    ADEGAN_LIDI_BENTUK,
    ADEGAN_LIDI_RUMAH,
    ADEGAN_SUSUN,
    ADEGAN_PAS,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B4C: VideoStory = {
  id: "k1b4c-luar",
  judul: "Menyusun dan Mengurai Bentuk Bangun: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "menyusun dan mengurai bentuk bangun" }),
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
