import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_ARSIR, ADEGAN_LOYANG, ADEGAN_SAMA } from "./k5b3c-materi-1";
import { ADEGAN_CAMPURAN, ADEGAN_PISAH, ADEGAN_SALAH } from "./k5b3c-materi-2";
import { ADEGAN_CAMPURAN_BEDA, ADEGAN_KPK, ADEGAN_PENUTUP } from "./k5b3c-materi-3";
import { ADEGAN_LUAR_ATAS, ADEGAN_LUAR_ATAS_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k5b3c-luar-1";
import { ADEGAN_LUAR_PISAH, ADEGAN_LUAR_PISAH_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SAMAKAN, ADEGAN_LUAR_SAMAKAN_TERAPAN } from "./k5b3c-luar-2";

/**
 * Kelas 5 Bab 3 Sub-Bab C (pengurangan pecahan), akhir cerita Toko Roti Keliling.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Sisa Adonan Bu Nani" (Bima, Citra, Fajar, Pak Arif, Bu Nani; Bu Ratna dan Pak Seno di penutup).
 * Video kedua: tiga metode global (Take Away the Tops, Match and Take Away, Split Whole and Part), terpisah.
 */
export const JUDUL_K5B3C = "Sisa Adonan Bu Nani";

export const VIDEO_MATERI_K5B3C: VideoStory = {
  id: "k5b3c-materi",
  judul: JUDUL_K5B3C,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "pengurangan pecahan", daftar: ["Penyebut sama", "KPK", "Pecahan campuran"] }),
    ADEGAN_LOYANG,
    ADEGAN_SAMA,
    ADEGAN_ARSIR,
    ADEGAN_CAMPURAN,
    ADEGAN_PISAH,
    ADEGAN_SALAH,
    ADEGAN_KPK,
    ADEGAN_CAMPURAN_BEDA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K5B3C: VideoStory = {
  id: "k5b3c-luar",
  judul: JUDUL_K5B3C,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "pengurangan pecahan", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_ATAS,
    ADEGAN_LUAR_ATAS_TERAPAN,
    ADEGAN_LUAR_SAMAKAN,
    ADEGAN_LUAR_SAMAKAN_TERAPAN,
    ADEGAN_LUAR_PISAH,
    ADEGAN_LUAR_PISAH_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
