import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_JUMLAH, ADEGAN_KETUA, ADEGAN_KURANG } from "./k5b1d-materi-1";
import { ADEGAN_KALI_PISAH, ADEGAN_PERIKSA_KALI, ADEGAN_SALAH_KALI } from "./k5b1d-materi-2";
import { ADEGAN_BAGI, ADEGAN_CEK, ADEGAN_PENUTUP } from "./k5b1d-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_SUSUN, ADEGAN_LUAR_SUSUN_TERAPAN } from "./k5b1d-luar-1";
import { ADEGAN_LUAR_BAGI, ADEGAN_LUAR_BAGI_TERAPAN, ADEGAN_LUAR_PISAH, ADEGAN_LUAR_PISAH_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b1d-luar-2";

/**
 * Kelas 5 Bab 1 Sub-Bab D (operasi hitung bilangan besar), akhir cerita Hari Pertandingan di Stadion Kota.
 * Video materi (sekitar tiga menit): cerita orisinal IGIL "Hitungan Penonton Pak Darmo" (Bima, Citra, Fajar, Pak Arif, dan Pak Darmo; di perayaan akhir bab semua tamu hadir).
 * Video kedua: tiga metode global (Stack and Trade, Split and Multiply, Share and Check), terpisah.
 */
export const JUDUL_K5B1D = "Hitungan Penonton Pak Darmo";

export const VIDEO_MATERI_K5B1D: VideoStory = {
  id: "k5b1d-materi",
  judul: JUDUL_K5B1D,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "operasi hitung bilangan besar", daftar: ["Bersusun", "Kali", "Bagi"] }),
    ADEGAN_KETUA,
    ADEGAN_JUMLAH,
    ADEGAN_KURANG,
    ADEGAN_KALI_PISAH,
    ADEGAN_SALAH_KALI,
    ADEGAN_PERIKSA_KALI,
    ADEGAN_BAGI,
    ADEGAN_CEK,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K5B1D: VideoStory = {
  id: "k5b1d-luar",
  judul: JUDUL_K5B1D,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "operasi hitung bilangan besar", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_SUSUN,
    ADEGAN_LUAR_SUSUN_TERAPAN,
    ADEGAN_LUAR_PISAH,
    ADEGAN_LUAR_PISAH_TERAPAN,
    ADEGAN_LUAR_BAGI,
    ADEGAN_LUAR_BAGI_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
