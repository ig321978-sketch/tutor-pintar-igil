import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_ADIL_TENGAH, ADEGAN_SALAH_POTONG, ADEGAN_SEMANGKA_DATANG } from "./k2b5A-materi-1";
import { ADEGAN_BAGI_REGU, ADEGAN_LIPAT_KERTAS, ADEGAN_SETENGAH_SEKITAR } from "./k2b5A-materi-2";
import { ADEGAN_DUA_GAMBAR, ADEGAN_LINGKARAN, ADEGAN_PENUTUP } from "./k2b5A-materi-3";
import { ADEGAN_LUAR_ADIL, ADEGAN_LUAR_ADIL_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k2b5A-luar-1";
import { ADEGAN_LUAR_CERMIN, ADEGAN_LUAR_CERMIN_TERAPAN, ADEGAN_LUAR_PITA, ADEGAN_LUAR_PITA_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k2b5A-luar-2";

/**
 * Kelas 2 Bab 5 Sub-Bab A (setengah dari benda utuh), awal cerita Kebun Sekolah.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Semangka Raksasa Pak Danu" (Chacha, Dika, Nia, Bu Sari, Pak Danu).
 * Video kedua: tiga metode global (Fair Sharing, Mirror Test, Fraction Strips), terpisah.
 */
export const JUDUL_K2B5A = "Semangka Raksasa Pak Danu";

export const VIDEO_MATERI_K2B5A: VideoStory = {
  id: "k2b5A-materi",
  judul: JUDUL_K2B5A,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "setengah dari benda utuh", daftar: ["Membagi adil menjadi dua bagian sama besar", "Setengah di sekitar kita", "Melipat kertas menjadi setengah"] }),
    ADEGAN_SEMANGKA_DATANG,
    ADEGAN_SALAH_POTONG,
    ADEGAN_ADIL_TENGAH,
    ADEGAN_BAGI_REGU,
    ADEGAN_SETENGAH_SEKITAR,
    ADEGAN_LIPAT_KERTAS,
    ADEGAN_LINGKARAN,
    ADEGAN_DUA_GAMBAR,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B5A: VideoStory = {
  id: "k2b5A-luar",
  judul: JUDUL_K2B5A,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "setengah dari benda utuh", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_ADIL,
    ADEGAN_LUAR_ADIL_TERAPAN,
    ADEGAN_LUAR_CERMIN,
    ADEGAN_LUAR_CERMIN_TERAPAN,
    ADEGAN_LUAR_PITA,
    ADEGAN_LUAR_PITA_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
