import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_GEROBAK, ADEGAN_GABUNG, ADEGAN_ARSIR } from "./k5b3b-materi-1";
import { ADEGAN_MENTEGA, ADEGAN_PISAH, ADEGAN_SALAH } from "./k5b3b-materi-2";
import { ADEGAN_KPK, ADEGAN_CAMPURAN, ADEGAN_PENUTUP } from "./k5b3b-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_ATAS, ADEGAN_LUAR_ATAS_TERAPAN } from "./k5b3b-luar-1";
import { ADEGAN_LUAR_BAWAH, ADEGAN_LUAR_BAWAH_TERAPAN, ADEGAN_LUAR_BULAT, ADEGAN_LUAR_BULAT_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b3b-luar-2";

/**
 * Kelas 5 Bab 3 Sub-Bab B (penjumlahan pecahan), lanjutan cerita Toko Roti Keliling.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Roti Isi Pak Seno" (Bima, Citra, Fajar, Pak Arif, Pak Seno, Bu Nani).
 * Video kedua: tiga metode global (Add the Tops, Match the Bottoms, Whole Then Part), terpisah.
 */
export const JUDUL_K5B3B = "Roti Isi Pak Seno";

export const VIDEO_MATERI_K5B3B: VideoStory = {
  id: "k5b3b-materi",
  judul: JUDUL_K5B3B,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "penjumlahan pecahan", daftar: ["Penyebut sama", "Samakan dengan KPK", "Disederhanakan"] }),
    ADEGAN_GEROBAK,
    ADEGAN_GABUNG,
    ADEGAN_ARSIR,
    ADEGAN_MENTEGA,
    ADEGAN_PISAH,
    ADEGAN_SALAH,
    ADEGAN_KPK,
    ADEGAN_CAMPURAN,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K5B3B: VideoStory = {
  id: "k5b3b-luar",
  judul: JUDUL_K5B3B,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "penjumlahan pecahan", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_ATAS,
    ADEGAN_LUAR_ATAS_TERAPAN,
    ADEGAN_LUAR_BAWAH,
    ADEGAN_LUAR_BAWAH_TERAPAN,
    ADEGAN_LUAR_BULAT,
    ADEGAN_LUAR_BULAT_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
