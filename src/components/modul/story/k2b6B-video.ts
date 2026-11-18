import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_JAM_LAPANGAN, ADEGAN_PUKUL_TEPAT, ADEGAN_SALAH_JARUM } from "./k2b6B-materi-1";
import { ADEGAN_BAGIAN_HARI, ADEGAN_DIGITAL, ADEGAN_URUT_KEGIATAN } from "./k2b6B-materi-2";
import { ADEGAN_JARUM_SATU_JAM, ADEGAN_LAMA_SEBENTAR, ADEGAN_PENUTUP } from "./k2b6B-materi-3";
import { ADEGAN_LUAR_GARIS, ADEGAN_LUAR_GARIS_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k2b6B-luar-1";
import { ADEGAN_LUAR_BATANG, ADEGAN_LUAR_BATANG_TERAPAN, ADEGAN_LUAR_JALUR, ADEGAN_LUAR_JALUR_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k2b6B-luar-2";

/**
 * Kelas 2 Bab 6 Sub-Bab B (waktu dan jam), akhir cerita Hari Olahraga Sekolah.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Jadwal Lomba Bu Ratna" (Chacha, Dika, Nia, Bu Sari, Bu Ratna).
 * Video kedua: tiga metode global (Day Timeline, Hour Track, Duration Bars), terpisah.
 */
export const JUDUL_K2B6B = "Jadwal Lomba Bu Ratna";

export const VIDEO_MATERI_K2B6B: VideoStory = {
  id: "k2b6B-materi",
  judul: JUDUL_K2B6B,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "waktu dan jam", daftar: ["Membaca jam pukul tepat", "Pagi, siang, sore, dan malam", "Membandingkan lama kegiatan"] }),
    ADEGAN_JAM_LAPANGAN,
    ADEGAN_SALAH_JARUM,
    ADEGAN_PUKUL_TEPAT,
    ADEGAN_DIGITAL,
    ADEGAN_BAGIAN_HARI,
    ADEGAN_URUT_KEGIATAN,
    ADEGAN_LAMA_SEBENTAR,
    ADEGAN_JARUM_SATU_JAM,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B6B: VideoStory = {
  id: "k2b6B-luar",
  judul: JUDUL_K2B6B,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "waktu dan jam", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_GARIS,
    ADEGAN_LUAR_GARIS_TERAPAN,
    ADEGAN_LUAR_JALUR,
    ADEGAN_LUAR_JALUR_TERAPAN,
    ADEGAN_LUAR_BATANG,
    ADEGAN_LUAR_BATANG_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
