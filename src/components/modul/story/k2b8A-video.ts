import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BALIK_TIRAI, ADEGAN_PILAH_HITUNG, ADEGAN_SATU_GARIS } from "./k2b8A-materi-1";
import { ADEGAN_BUNDEL_LIMA, ADEGAN_DIAGRAM_TURUS, ADEGAN_SALAH_HITUNG } from "./k2b8A-materi-2";
import { ADEGAN_BACA_DIAGRAM, ADEGAN_DATA_SENDIRI, ADEGAN_PENUTUP } from "./k2b8A-materi-3";
import { ADEGAN_LUAR_ALAS, ADEGAN_LUAR_ALAS_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k2b8A-luar-1";
import { ADEGAN_LUAR_LIMA, ADEGAN_LUAR_LIMA_TERAPAN, ADEGAN_LUAR_NYATA, ADEGAN_LUAR_NYATA_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k2b8A-luar-2";

/**
 * Kelas 2 Bab 8 Sub-Bab A (diagram turus), awal cerita Pentas Seni Sekolah.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Alat Musik Pak Hendra" (Chacha, Dika, Nia, Bu Sari, Pak Hendra).
 * Video kedua: tiga metode global (Sorting Mat, Count by Fives, Real Graph), terpisah.
 */
export const JUDUL_K2B8A = "Alat Musik Pak Hendra";

export const VIDEO_MATERI_K2B8A: VideoStory = {
  id: "k2b8A-materi",
  judul: JUDUL_K2B8A,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "diagram turus", daftar: ["Memilah dan menghitung data", "Membuat diagram turus", "Membaca diagram turus"] }),
    ADEGAN_BALIK_TIRAI,
    ADEGAN_PILAH_HITUNG,
    ADEGAN_SATU_GARIS,
    ADEGAN_SALAH_HITUNG,
    ADEGAN_BUNDEL_LIMA,
    ADEGAN_DIAGRAM_TURUS,
    ADEGAN_BACA_DIAGRAM,
    ADEGAN_DATA_SENDIRI,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B8A: VideoStory = {
  id: "k2b8A-luar",
  judul: JUDUL_K2B8A,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "diagram turus", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_ALAS,
    ADEGAN_LUAR_ALAS_TERAPAN,
    ADEGAN_LUAR_LIMA,
    ADEGAN_LUAR_LIMA_TERAPAN,
    ADEGAN_LUAR_NYATA,
    ADEGAN_LUAR_NYATA_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
