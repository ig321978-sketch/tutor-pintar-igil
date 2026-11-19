import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_PAPAN, ADEGAN_PULAU, ADEGAN_TIKET } from "./k4b1a-materi-1";
import { ADEGAN_BACA, ADEGAN_PERBAIKI, ADEGAN_SALAH_NOL } from "./k4b1a-materi-2";
import { ADEGAN_KEDUA, ADEGAN_PENUTUP, ADEGAN_ULANG } from "./k4b1a-materi-3";
import { ADEGAN_LUAR_KARTU, ADEGAN_LUAR_KARTU_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k4b1a-luar-1";
import { ADEGAN_LUAR_BACA, ADEGAN_LUAR_BACA_TERAPAN, ADEGAN_LUAR_NOL, ADEGAN_LUAR_NOL_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k4b1a-luar-2";

/**
 * Kelas 4 Bab 1 Sub-Bab A (membaca dan menulis bilangan sampai sepuluh ribu), awal cerita Penginapan Pulau Karang Indah.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Loket Tiket Bu Maya" (Satria, Laras, Genta, Pak Hendro, Bu Maya).
 * Video kedua: tiga metode global (Digit Cards, Chunk and Read, Zero Check), terpisah.
 */
export const JUDUL_K4B1A = "Loket Tiket Bu Maya";

export const VIDEO_MATERI_K4B1A: VideoStory = {
  id: "k4b1a-materi",
  judul: JUDUL_K4B1A,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "membaca dan menulis bilangan sampai sepuluh ribu", daftar: ["Bilangan empat angka", "Membaca dari ribuan", "Menulis dengan nol"] }),
    ADEGAN_PULAU,
    ADEGAN_TIKET,
    ADEGAN_PAPAN,
    ADEGAN_SALAH_NOL,
    ADEGAN_PERBAIKI,
    ADEGAN_BACA,
    ADEGAN_KEDUA,
    ADEGAN_ULANG,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K4B1A: VideoStory = {
  id: "k4b1a-luar",
  judul: JUDUL_K4B1A,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "membaca dan menulis bilangan sampai sepuluh ribu", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_KARTU,
    ADEGAN_LUAR_KARTU_TERAPAN,
    ADEGAN_LUAR_BACA,
    ADEGAN_LUAR_BACA_TERAPAN,
    ADEGAN_LUAR_NOL,
    ADEGAN_LUAR_NOL_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
