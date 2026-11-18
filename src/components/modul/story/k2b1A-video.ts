import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_GESER, ADEGAN_JARI_KRIM, ADEGAN_KUE_DATANG } from "./k2b1A-materi-1";
import { ADEGAN_ANTREAN, ADEGAN_BACA, ADEGAN_KOTAK } from "./k2b1A-materi-2";
import { ADEGAN_PENUTUP_A, ADEGAN_SOBEK, ADEGAN_TERCATAT } from "./k2b1A-materi-3";
import { ADEGAN_LUAR_BINGKAI, ADEGAN_LUAR_BINGKAI_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k2b1A-luar-1";
import { ADEGAN_LUAR_LANJUT, ADEGAN_LUAR_LANJUT_TERAPAN, ADEGAN_LUAR_LONCAT, ADEGAN_LUAR_LONCAT_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k2b1A-luar-2";

/**
 * Kelas 2 Bab 1 Sub-Bab A (menghitung, membaca, dan menulis bilangan sampai lima puluh), awal cerita Kue di Kantin Sekolah.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Kue Kiriman dari Dapur" (Chacha, Dika, Nia, Bu Sari).
 * Video kedua: tiga metode global (Ten Frame, Skip Counting, Counting On), terpisah.
 */
export const JUDUL_K2B1A = "Kue Kiriman dari Dapur";

export const VIDEO_MATERI_K2B1A: VideoStory = {
  id: "k2b1A-materi",
  judul: JUDUL_K2B1A,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "menghitung dan membaca bilangan sampai lima puluh", daftar: ["Menghitung kue satu per satu", "Mengemas per sepuluh", "Menghitung maju dan mundur"] }),
    ADEGAN_KUE_DATANG,
    ADEGAN_JARI_KRIM,
    ADEGAN_GESER,
    ADEGAN_KOTAK,
    ADEGAN_BACA,
    ADEGAN_ANTREAN,
    ADEGAN_SOBEK,
    ADEGAN_TERCATAT,
    ADEGAN_PENUTUP_A,
  ],
};

export const VIDEO_LUAR_K2B1A: VideoStory = {
  id: "k2b1A-luar",
  judul: JUDUL_K2B1A,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "menghitung dan membaca bilangan sampai lima puluh", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BINGKAI,
    ADEGAN_LUAR_BINGKAI_TERAPAN,
    ADEGAN_LUAR_LONCAT,
    ADEGAN_LUAR_LONCAT_TERAPAN,
    ADEGAN_LUAR_LANJUT,
    ADEGAN_LUAR_LANJUT_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
