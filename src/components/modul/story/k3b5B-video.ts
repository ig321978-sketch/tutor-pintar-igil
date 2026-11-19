import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_CATAT, ADEGAN_KLUB, ADEGAN_TURUS_LIMA } from "./k3b5B-materi-1";
import { ADEGAN_BETUL, ADEGAN_SALAH_HITUNG, ADEGAN_TABEL } from "./k3b5B-materi-2";
import { ADEGAN_BACA, ADEGAN_PENUTUP, ADEGAN_URUT_DULU } from "./k3b5B-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_TURUS, ADEGAN_LUAR_TURUS_TERAPAN } from "./k3b5B-luar-1";
import { ADEGAN_LUAR_BACA, ADEGAN_LUAR_BACA_TERAPAN, ADEGAN_LUAR_ISI, ADEGAN_LUAR_ISI_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k3b5B-luar-2";

/**
 * Kelas 3 Bab 5 Sub-Bab B (menyajikan data dalam bentuk tabel), akhir cerita Bengkel Sepeda Pak Hasan.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Tabel Bu Wulan" (Raka, Salsa, Bima, Pak Joko, Pak Hasan, Bu Wulan).
 * Video kedua: tiga metode global (Tally Groups, Table Fill, Read and Ask), terpisah.
 */
export const JUDUL_K3B5B = "Tabel Bu Wulan";

export const VIDEO_MATERI_K3B5B: VideoStory = {
  id: "k3b5B-materi",
  judul: JUDUL_K3B5B,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "menyajikan data dalam tabel", daftar: ["Turus berlima", "Tabel tiga kolom", "Membaca tabel"] }),
    ADEGAN_KLUB,
    ADEGAN_TURUS_LIMA,
    ADEGAN_CATAT,
    ADEGAN_SALAH_HITUNG,
    ADEGAN_BETUL,
    ADEGAN_TABEL,
    ADEGAN_BACA,
    ADEGAN_URUT_DULU,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K3B5B: VideoStory = {
  id: "k3b5B-luar",
  judul: JUDUL_K3B5B,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "menyajikan data dalam tabel", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_TURUS,
    ADEGAN_LUAR_TURUS_TERAPAN,
    ADEGAN_LUAR_ISI,
    ADEGAN_LUAR_ISI_TERAPAN,
    ADEGAN_LUAR_BACA,
    ADEGAN_LUAR_BACA_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
