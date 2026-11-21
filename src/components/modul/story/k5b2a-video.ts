import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_KALI, ADEGAN_KELIPATAN, ADEGAN_PASAR } from "./k5b2a-materi-1";
import { ADEGAN_PERIKSA, ADEGAN_TABEL, ADEGAN_TEPUK } from "./k5b2a-materi-2";
import { ADEGAN_ENAM, ADEGAN_PENUTUP, ADEGAN_SERATUS } from "./k5b2a-materi-3";
import { ADEGAN_LUAR_LOMPAT, ADEGAN_LUAR_LOMPAT_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_TABEL, ADEGAN_LUAR_TABEL_TERAPAN } from "./k5b2a-luar-1";
import { ADEGAN_LUAR_KALI, ADEGAN_LUAR_KALI_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b2a-luar-2";

/**
 * Kelas 5 Bab 2 Sub-Bab A (kelipatan), awal cerita Pasar Kuliner Malam.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Lonceng Bu Marni" (Bima, Citra, Fajar, Pak Arif, Bu Marni, Pak Tarno).
 * Video kedua: tiga metode global (Skip Counting, Grid Marking, Times Check), terpisah.
 */
export const JUDUL_K5B2A = "Lonceng Bu Marni";

export const VIDEO_MATERI_K5B2A: VideoStory = {
  id: "k5b2a-materi",
  judul: JUDUL_K5B2A,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "kelipatan", daftar: ["Kelipatan", "Bilangan kali", "Tabel bilangan"] }),
    ADEGAN_PASAR,
    ADEGAN_KELIPATAN,
    ADEGAN_KALI,
    ADEGAN_TEPUK,
    ADEGAN_PERIKSA,
    ADEGAN_TABEL,
    ADEGAN_ENAM,
    ADEGAN_SERATUS,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K5B2A: VideoStory = {
  id: "k5b2a-luar",
  judul: JUDUL_K5B2A,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "kelipatan", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_LOMPAT,
    ADEGAN_LUAR_LOMPAT_TERAPAN,
    ADEGAN_LUAR_TABEL,
    ADEGAN_LUAR_TABEL_TERAPAN,
    ADEGAN_LUAR_KALI,
    ADEGAN_LUAR_KALI_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
