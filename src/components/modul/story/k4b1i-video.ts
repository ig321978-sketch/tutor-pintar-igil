import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_FAKTOR, ADEGAN_PANTAI, ADEGAN_SALAH_FAKTOR } from "./k4b1i-materi-1";
import { ADEGAN_BUKAN, ADEGAN_LENTERA, ADEGAN_PASANGAN } from "./k4b1i-materi-2";
import { ADEGAN_CARA, ADEGAN_JADWAL, ADEGAN_PENUTUP } from "./k4b1i-materi-3";
import { ADEGAN_LUAR_PASANGAN, ADEGAN_LUAR_PASANGAN_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k4b1i-luar-1";
import { ADEGAN_LUAR_CEK, ADEGAN_LUAR_CEK_TERAPAN, ADEGAN_LUAR_DAFTAR, ADEGAN_LUAR_DAFTAR_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k4b1i-luar-2";

/**
 * Kelas 4 Bab 1 Sub-Bab I (faktor dan kelipatan), akhir cerita Penginapan Pulau Karang Indah.
 * Video materi (sekitar tiga menit): cerita orisinal IGIL "Papan Jadwal Kak Yoga" (Satria, Laras, Genta, Pak Hendro, Kak Yoga, Bu Maya).
 * Video kedua: tiga metode global (Factor Pairs, Multiples List, Divisibility Check), terpisah.
 */
export const JUDUL_K4B1I = "Papan Jadwal Kak Yoga";

export const VIDEO_MATERI_K4B1I: VideoStory = {
  id: "k4b1i-materi",
  judul: JUDUL_K4B1I,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "faktor dan kelipatan", daftar: ["Faktor suatu bilangan", "Pasangan faktor", "Kelipatan"] }),
    ADEGAN_PANTAI,
    ADEGAN_FAKTOR,
    ADEGAN_SALAH_FAKTOR,
    ADEGAN_PASANGAN,
    ADEGAN_BUKAN,
    ADEGAN_LENTERA,
    ADEGAN_JADWAL,
    ADEGAN_CARA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K4B1I: VideoStory = {
  id: "k4b1i-luar",
  judul: JUDUL_K4B1I,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "faktor dan kelipatan", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_PASANGAN,
    ADEGAN_LUAR_PASANGAN_TERAPAN,
    ADEGAN_LUAR_DAFTAR,
    ADEGAN_LUAR_DAFTAR_TERAPAN,
    ADEGAN_LUAR_CEK,
    ADEGAN_LUAR_CEK_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
