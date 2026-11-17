import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_JUMLAH_SALAH, ADEGAN_PASANGKAN, ADEGAN_PETANG } from "./k1b6A-materi-1";
import { ADEGAN_LAMPION, ADEGAN_SAMAKAN, ADEGAN_SELISIH } from "./k1b6A-materi-2";
import { ADEGAN_ES_LILIN, ADEGAN_LOKET, ADEGAN_PENUTUP } from "./k1b6A-materi-3";
import { ADEGAN_LUAR_BATANG, ADEGAN_LUAR_BATANG_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b6A-luar-1";
import { ADEGAN_LUAR_GARIS, ADEGAN_LUAR_GARIS_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SAMAKAN, ADEGAN_LUAR_SAMAKAN_TERAPAN } from "./k1b6A-luar-2";

/**
 * Kelas 1 Bab 6 Sub-Bab A (lebih dari, kurang dari, dan selisih), awal cerita Pasar Malam Kampung.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Dua Nampan Kue" (Igil, Kaka, Abang, Mamah, Pak RT).
 * Video kedua: tiga metode global, terpisah.
 */
export const JUDUL_K1B6A = "Dua Nampan Kue";

export const VIDEO_MATERI_K1B6A: VideoStory = {
  id: "k1b6a-materi",
  judul: JUDUL_K1B6A,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "lebih dari, kurang dari, dan selisih", daftar: ["Memasangkan benda satu-satu", "Lebihnya dan kurangnya", "Mencari selisih dua bilangan"] }),
    ADEGAN_PETANG,
    ADEGAN_JUMLAH_SALAH,
    ADEGAN_PASANGKAN,
    ADEGAN_SELISIH,
    ADEGAN_SAMAKAN,
    ADEGAN_LAMPION,
    ADEGAN_ES_LILIN,
    ADEGAN_LOKET,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B6A: VideoStory = {
  id: "k1b6a-luar",
  judul: JUDUL_K1B6A,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "lebih dari, kurang dari, dan selisih", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BATANG,
    ADEGAN_LUAR_BATANG_TERAPAN,
    ADEGAN_LUAR_GARIS,
    ADEGAN_LUAR_GARIS_TERAPAN,
    ADEGAN_LUAR_SAMAKAN,
    ADEGAN_LUAR_SAMAKAN_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
