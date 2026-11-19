import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_KEPIK_MAJU, ADEGAN_KEPIK_MUNDUR, ADEGAN_PULUHAN_DULU } from "./k2b7B-materi-1";
import { ADEGAN_KATA_TANDA, ADEGAN_PULUHAN_SAMA, ADEGAN_URUTKAN } from "./k2b7B-materi-2";
import { ADEGAN_PENUTUP, ADEGAN_TEKA_LEBIH, ADEGAN_TEKA_MUNDUR } from "./k2b7B-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_TABEL, ADEGAN_LUAR_TABEL_TERAPAN } from "./k2b7B-luar-1";
import { ADEGAN_LUAR_KARTU, ADEGAN_LUAR_KARTU_TERAPAN, ADEGAN_LUAR_PATOKAN, ADEGAN_LUAR_PATOKAN_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k2b7B-luar-2";

/**
 * Kelas 2 Bab 7 Sub-Bab B (membandingkan dan mengurutkan bilangan), akhir cerita Bank Sampah Sekolah.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Pengumuman Bu Lia" (Chacha, Dika, Nia, Bu Sari, Bu Lia).
 * Video kedua: tiga metode global (Hundred Chart, Benchmark Numbers, Card Sort), terpisah.
 */
export const JUDUL_K2B7B = "Pengumuman Bu Lia";

export const VIDEO_MATERI_K2B7B: VideoStory = {
  id: "k2b7B-materi",
  judul: JUDUL_K2B7B,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "membandingkan bilangan", daftar: ["Menghitung maju dan mundur", "Membandingkan dua bilangan", "Mengurutkan bilangan"] }),
    ADEGAN_KEPIK_MAJU,
    ADEGAN_KEPIK_MUNDUR,
    ADEGAN_PULUHAN_DULU,
    ADEGAN_PULUHAN_SAMA,
    ADEGAN_KATA_TANDA,
    ADEGAN_URUTKAN,
    ADEGAN_TEKA_LEBIH,
    ADEGAN_TEKA_MUNDUR,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B7B: VideoStory = {
  id: "k2b7B-luar",
  judul: JUDUL_K2B7B,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "membandingkan bilangan", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_TABEL,
    ADEGAN_LUAR_TABEL_TERAPAN,
    ADEGAN_LUAR_PATOKAN,
    ADEGAN_LUAR_PATOKAN_TERAPAN,
    ADEGAN_LUAR_KARTU,
    ADEGAN_LUAR_KARTU_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
