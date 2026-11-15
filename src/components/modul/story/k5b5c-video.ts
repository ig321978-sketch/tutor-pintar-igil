import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_CARA_YOHANA, ADEGAN_EKSPLORASI } from "./k5b5c-materi-1";
import { ADEGAN_CARA_KOMANG, ADEGAN_MISKONSEPSI, ADEGAN_PENGUATAN } from "./k5b5c-materi-2";
import { ADEGAN_UJI_1, ADEGAN_UJI_2, ADEGAN_UJI_3, ADEGAN_UJI_4 } from "./k5b5c-materi-3";
import { ADEGAN_LUAR_ADITIF, ADEGAN_LUAR_ADITIF_TERAPAN, ADEGAN_LUAR_KOMPOSIT, ADEGAN_LUAR_KOMPOSIT_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k5b5c-luar-1";
import { ADEGAN_LUAR_KEKAL, ADEGAN_LUAR_KEKAL_TERAPAN, ADEGAN_LUAR_KURANG, ADEGAN_LUAR_KURANG_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b5c-luar-2";

/** Kelas 5 Bab 5 Sub-Bab C (luas daerah bangun gabungan): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B5C: VideoStory = {
  id: "k5b5c-materi",
  judul: "Luas Daerah Bangun Gabungan",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "luas bangun gabungan", daftar: ["Memecah bangun gabungan", "Menghitung luas tiap bagian", "Menjumlahkan luas bagian"] }),
    ADEGAN_EKSPLORASI,
    ADEGAN_CARA_YOHANA,
    ADEGAN_CARA_KOMANG,
    ADEGAN_MISKONSEPSI,
    ADEGAN_PENGUATAN,
    ADEGAN_UJI_1,
    ADEGAN_UJI_2,
    ADEGAN_UJI_3,
    ADEGAN_UJI_4,
  ],
};

export const VIDEO_LUAR_K5B5C: VideoStory = {
  id: "k5b5c-luar",
  judul: "Luas Bangun Gabungan: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "luas bangun gabungan" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_ADITIF,
    ADEGAN_LUAR_ADITIF_TERAPAN,
    ADEGAN_LUAR_KOMPOSIT,
    ADEGAN_LUAR_KOMPOSIT_TERAPAN,
    ADEGAN_LUAR_KURANG,
    ADEGAN_LUAR_KURANG_TERAPAN,
    ADEGAN_LUAR_KEKAL,
    ADEGAN_LUAR_KEKAL_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
