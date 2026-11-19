import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BENGKEL, ADEGAN_CATATAN, ADEGAN_URUT } from "./k3b5A-materi-1";
import { ADEGAN_SALAH_JANGKAUAN, ADEGAN_JANGKAUAN, ADEGAN_UJUNG } from "./k3b5A-materi-2";
import { ADEGAN_BANYAK, ADEGAN_PENUTUP, ADEGAN_TURUS } from "./k3b5A-materi-3";
import { ADEGAN_LUAR_GARIS, ADEGAN_LUAR_GARIS_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k3b5A-luar-1";
import { ADEGAN_LUAR_CEK, ADEGAN_LUAR_CEK_TERAPAN, ADEGAN_LUAR_HITUNG, ADEGAN_LUAR_HITUNG_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k3b5A-luar-2";

/**
 * Kelas 3 Bab 5 Sub-Bab A (mengurutkan dan membandingkan data), awal cerita Bengkel Sepeda Pak Hasan.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Catatan Pak Hasan" (Raka, Salsa, Bima, Pak Joko, Pak Hasan).
 * Video kedua: tiga metode global (Number Order Line, Range Check, Tally Count), terpisah.
 */
export const JUDUL_K3B5A = "Catatan Pak Hasan";

export const VIDEO_MATERI_K3B5A: VideoStory = {
  id: "k3b5A-materi",
  judul: JUDUL_K3B5A,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "mengurutkan dan membandingkan data", daftar: ["Data terkecil dan terbesar", "Jangkauan", "Turus"] }),
    ADEGAN_BENGKEL,
    ADEGAN_CATATAN,
    ADEGAN_URUT,
    ADEGAN_UJUNG,
    ADEGAN_SALAH_JANGKAUAN,
    ADEGAN_JANGKAUAN,
    ADEGAN_TURUS,
    ADEGAN_BANYAK,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K3B5A: VideoStory = {
  id: "k3b5A-luar",
  judul: JUDUL_K3B5A,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "mengurutkan dan membandingkan data", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_GARIS,
    ADEGAN_LUAR_GARIS_TERAPAN,
    ADEGAN_LUAR_CEK,
    ADEGAN_LUAR_CEK_TERAPAN,
    ADEGAN_LUAR_HITUNG,
    ADEGAN_LUAR_HITUNG_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
