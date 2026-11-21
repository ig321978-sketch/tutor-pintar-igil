import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_PAPAN, ADEGAN_PRIMA, ADEGAN_SALAH_SATU } from "./k5b2e-materi-1";
import { ADEGAN_PERIKSA, ADEGAN_POHON, ADEGAN_SARING } from "./k5b2e-materi-2";
import { ADEGAN_BERULANG, ADEGAN_KPK_FPB, ADEGAN_PENUTUP } from "./k5b2e-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_SARING, ADEGAN_LUAR_SARING_TERAPAN } from "./k5b2e-luar-1";
import { ADEGAN_LUAR_BAGI, ADEGAN_LUAR_BAGI_TERAPAN, ADEGAN_LUAR_POHON, ADEGAN_LUAR_POHON_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b2e-luar-2";

/**
 * Kelas 5 Bab 2 Sub-Bab E (bilangan prima, faktorisasi prima, KPK dan FPB dengan faktor prima), akhir cerita Pasar Kuliner Malam.
 * Video materi (sekitar tiga menit): cerita orisinal IGIL "Papan Bilangan Kak Lintang" (Bima, Citra, Fajar, Pak Arif, dan Kak Lintang; di perayaan akhir bab semua tamu hadir).
 * Video kedua: tiga metode global (Sieve It, Factor Tree, Divide Down), terpisah.
 */
export const JUDUL_K5B2E = "Papan Bilangan Kak Lintang";

export const VIDEO_MATERI_K5B2E: VideoStory = {
  id: "k5b2e-materi",
  judul: JUDUL_K5B2E,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "bilangan prima", daftar: ["Bilangan prima", "Pohon faktor", "KPK dan FPB"] }),
    ADEGAN_PAPAN,
    ADEGAN_PRIMA,
    ADEGAN_SALAH_SATU,
    ADEGAN_PERIKSA,
    ADEGAN_SARING,
    ADEGAN_POHON,
    ADEGAN_KPK_FPB,
    ADEGAN_BERULANG,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K5B2E: VideoStory = {
  id: "k5b2e-luar",
  judul: JUDUL_K5B2E,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "bilangan prima", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_SARING,
    ADEGAN_LUAR_SARING_TERAPAN,
    ADEGAN_LUAR_POHON,
    ADEGAN_LUAR_POHON_TERAPAN,
    ADEGAN_LUAR_BAGI,
    ADEGAN_LUAR_BAGI_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
