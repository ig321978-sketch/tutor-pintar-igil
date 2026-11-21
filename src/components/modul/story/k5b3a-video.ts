import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_CAMPURAN, ADEGAN_SALAH, ADEGAN_TOKO } from "./k5b3a-materi-1";
import { ADEGAN_BIASA, ADEGAN_BULAT, ADEGAN_SAMAKAN } from "./k5b3a-materi-2";
import { ADEGAN_GARIS, ADEGAN_PEMBILANG, ADEGAN_PENUTUP } from "./k5b3a-materi-3";
import { ADEGAN_LUAR_GARIS, ADEGAN_LUAR_GARIS_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_PENYEBUT, ADEGAN_LUAR_PENYEBUT_TERAPAN } from "./k5b3a-luar-1";
import { ADEGAN_LUAR_BIASA, ADEGAN_LUAR_BIASA_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b3a-luar-2";

/**
 * Kelas 5 Bab 3 Sub-Bab A (membandingkan dan mengurutkan pecahan), awal cerita Toko Roti Keliling.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Tiga Kantong Tepung Bu Ratna" (Bima, Citra, Fajar, Pak Arif, Bu Ratna, Pak Seno).
 * Video kedua: tiga metode global (Number Line, Common Denominator, Mixed to Improper), terpisah.
 */
export const JUDUL_K5B3A = "Tiga Kantong Tepung Bu Ratna";

export const VIDEO_MATERI_K5B3A: VideoStory = {
  id: "k5b3a-materi",
  judul: JUDUL_K5B3A,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "pecahan", daftar: ["Pecahan campuran", "Garis bilangan", "Membandingkan"] }),
    ADEGAN_TOKO,
    ADEGAN_CAMPURAN,
    ADEGAN_SALAH,
    ADEGAN_BULAT,
    ADEGAN_BIASA,
    ADEGAN_SAMAKAN,
    ADEGAN_PEMBILANG,
    ADEGAN_GARIS,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K5B3A: VideoStory = {
  id: "k5b3a-luar",
  judul: JUDUL_K5B3A,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "pecahan", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_GARIS,
    ADEGAN_LUAR_GARIS_TERAPAN,
    ADEGAN_LUAR_PENYEBUT,
    ADEGAN_LUAR_PENYEBUT_TERAPAN,
    ADEGAN_LUAR_BIASA,
    ADEGAN_LUAR_BIASA_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
