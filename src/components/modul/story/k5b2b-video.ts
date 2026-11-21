import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_DUA_DAFTAR, ADEGAN_DUA_LONCENG, ADEGAN_PERSEKUTUAN } from "./k5b2b-materi-1";
import { ADEGAN_KPK, ADEGAN_PERIKSA, ADEGAN_SALAH_KALI } from "./k5b2b-materi-2";
import { ADEGAN_JADWAL, ADEGAN_PENUTUP, ADEGAN_TIGA_BILANGAN } from "./k5b2b-materi-3";
import { ADEGAN_LUAR_DAFTAR, ADEGAN_LUAR_DAFTAR_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k5b2b-luar-1";
import { ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SAMA, ADEGAN_LUAR_SAMA_TERAPAN, ADEGAN_LUAR_ULANG, ADEGAN_LUAR_ULANG_TERAPAN } from "./k5b2b-luar-2";

/**
 * Kelas 5 Bab 2 Sub-Bab B (kelipatan persekutuan dan KPK), cerita Pasar Kuliner Malam.
 * Video materi (sekitar tiga menit): cerita orisinal IGIL "Dua Lonceng Pak Tarno" (Bima, Citra, Fajar, Pak Arif, Pak Tarno, dan Bu Wati di akhir).
 * Video kedua: tiga metode global (List Both, Spot the Match, Meet Again), terpisah.
 */
export const JUDUL_K5B2B = "Dua Lonceng Pak Tarno";

export const VIDEO_MATERI_K5B2B: VideoStory = {
  id: "k5b2b-materi",
  judul: JUDUL_K5B2B,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "KPK", daftar: ["Dua daftar", "Kelipatan persekutuan", "Yang terkecil"] }),
    ADEGAN_DUA_LONCENG,
    ADEGAN_DUA_DAFTAR,
    ADEGAN_PERSEKUTUAN,
    ADEGAN_SALAH_KALI,
    ADEGAN_PERIKSA,
    ADEGAN_KPK,
    ADEGAN_JADWAL,
    ADEGAN_TIGA_BILANGAN,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K5B2B: VideoStory = {
  id: "k5b2b-luar",
  judul: JUDUL_K5B2B,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "kelipatan persekutuan dan KPK", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_DAFTAR,
    ADEGAN_LUAR_DAFTAR_TERAPAN,
    ADEGAN_LUAR_SAMA,
    ADEGAN_LUAR_SAMA_TERAPAN,
    ADEGAN_LUAR_ULANG,
    ADEGAN_LUAR_ULANG_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
