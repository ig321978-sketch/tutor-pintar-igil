import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_KIRI, ADEGAN_PENYIAR, ADEGAN_TANDA } from "./k5b1b-materi-1";
import { ADEGAN_GESER, ADEGAN_PERIKSA_PANJANG, ADEGAN_SALAH_BANDING } from "./k5b1b-materi-2";
import { ADEGAN_GARIS, ADEGAN_PENUTUP, ADEGAN_URUT } from "./k5b1b-materi-3";
import { ADEGAN_LUAR_KIRI, ADEGAN_LUAR_KIRI_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k5b1b-luar-1";
import { ADEGAN_LUAR_GARIS, ADEGAN_LUAR_GARIS_TERAPAN, ADEGAN_LUAR_PATOKAN, ADEGAN_LUAR_PATOKAN_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b1b-luar-2";

/**
 * Kelas 5 Bab 1 Sub-Bab B (membandingkan dan mengurutkan bilangan), cerita Hari Pertandingan di Stadion Kota.
 * Video materi (sekitar tiga menit): cerita orisinal IGIL "Urutan Tribun Pak Hasto" (Bima, Citra, Fajar, Pak Arif, Pak Hasto, dan Bu Lestari di akhir).
 * Video kedua: tiga metode global (Left First, Line It Up, Pick a Marker), terpisah.
 */
export const JUDUL_K5B1B = "Urutan Tribun Pak Hasto";

export const VIDEO_MATERI_K5B1B: VideoStory = {
  id: "k5b1b-materi",
  judul: JUDUL_K5B1B,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "membandingkan bilangan", daftar: ["Dari kiri", "Tanda", "Urutan"] }),
    ADEGAN_PENYIAR,
    ADEGAN_KIRI,
    ADEGAN_TANDA,
    ADEGAN_SALAH_BANDING,
    ADEGAN_PERIKSA_PANJANG,
    ADEGAN_GESER,
    ADEGAN_URUT,
    ADEGAN_GARIS,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K5B1B: VideoStory = {
  id: "k5b1b-luar",
  judul: JUDUL_K5B1B,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "membandingkan bilangan", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_KIRI,
    ADEGAN_LUAR_KIRI_TERAPAN,
    ADEGAN_LUAR_GARIS,
    ADEGAN_LUAR_GARIS_TERAPAN,
    ADEGAN_LUAR_PATOKAN,
    ADEGAN_LUAR_PATOKAN_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
