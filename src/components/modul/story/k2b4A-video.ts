import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_ATAS_BAWAH, ADEGAN_DEPAN_BELAKANG, ADEGAN_RAK_DATANG } from "./k2b4A-materi-1";
import { ADEGAN_BERLAWANAN, ADEGAN_KANAN_KIRI, ADEGAN_SALAH_KANAN } from "./k2b4A-materi-2";
import { ADEGAN_GABUNG_PETUNJUK, ADEGAN_KALIMAT, ADEGAN_PENUTUP } from "./k2b4A-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_SIMON, ADEGAN_LUAR_SIMON_TERAPAN } from "./k2b4A-luar-1";
import { ADEGAN_LUAR_PETA, ADEGAN_LUAR_PETA_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SEKAT, ADEGAN_LUAR_SEKAT_TERAPAN } from "./k2b4A-luar-2";

/**
 * Kelas 2 Bab 4 Sub-Bab A (posisi benda), awal cerita Pameran Kerajinan Sekolah.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Rak Pameran Pak Hasan" (Chacha, Dika, Nia, Bu Sari, Pak Hasan).
 * Video kedua: tiga metode global (Simon Says, Treasure Map, Barrier Game), terpisah.
 */
export const JUDUL_K2B4A = "Rak Pameran Pak Hasan";

export const VIDEO_MATERI_K2B4A: VideoStory = {
  id: "k2b4A-materi",
  judul: JUDUL_K2B4A,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "posisi benda", daftar: ["Enam kata posisi dan lawannya", "Kanan dan kiri sesuai pembaca", "Menggabungkan petunjuk posisi"] }),
    ADEGAN_RAK_DATANG,
    ADEGAN_ATAS_BAWAH,
    ADEGAN_DEPAN_BELAKANG,
    ADEGAN_SALAH_KANAN,
    ADEGAN_KANAN_KIRI,
    ADEGAN_BERLAWANAN,
    ADEGAN_KALIMAT,
    ADEGAN_GABUNG_PETUNJUK,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B4A: VideoStory = {
  id: "k2b4A-luar",
  judul: JUDUL_K2B4A,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "posisi benda", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_SIMON,
    ADEGAN_LUAR_SIMON_TERAPAN,
    ADEGAN_LUAR_PETA,
    ADEGAN_LUAR_PETA_TERAPAN,
    ADEGAN_LUAR_SEKAT,
    ADEGAN_LUAR_SEKAT_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
