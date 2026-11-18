import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BIBIT_DATANG, ADEGAN_SALAH_BAGI, ADEGAN_SATU_SATU } from "./k2b5B-materi-1";
import { ADEGAN_BUKAN_SETENGAH, ADEGAN_GANJIL, ADEGAN_POLA_SETENGAH } from "./k2b5B-materi-2";
import { ADEGAN_GABUNG, ADEGAN_PENUTUP_B, ADEGAN_TIGA_TANYA } from "./k2b5B-materi-3";
import { ADEGAN_LUAR_BAGI, ADEGAN_LUAR_BAGI_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k2b5B-luar-1";
import { ADEGAN_LUAR_KALI, ADEGAN_LUAR_KALI_TERAPAN, ADEGAN_LUAR_NERACA, ADEGAN_LUAR_NERACA_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k2b5B-luar-2";

/**
 * Kelas 2 Bab 5 Sub-Bab B (setengah dari kumpulan benda), tengah cerita Kebun Sekolah.
 * Video materi (tiga ketukan tiap adegan, tanpa latihan): cerita orisinal IGIL "Bibit untuk Dua Petak" (Chacha, Dika, Nia, Bu Sari, Bu Wati).
 * Video kedua: tiga metode global (Dealing Out, Balance Scale, Doubling Check), terpisah.
 */
export const JUDUL_K2B5B = "Bibit untuk Dua Petak";

export const VIDEO_MATERI_K2B5B: VideoStory = {
  id: "k2b5B-materi",
  judul: JUDUL_K2B5B,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "setengah dari sekumpulan benda", daftar: ["Membagi bibit sama banyak", "Setengah dari bilangan", "Kapan tidak punya setengah"] }),
    ADEGAN_BIBIT_DATANG,
    ADEGAN_SALAH_BAGI,
    ADEGAN_SATU_SATU,
    ADEGAN_BUKAN_SETENGAH,
    ADEGAN_POLA_SETENGAH,
    ADEGAN_GANJIL,
    ADEGAN_GABUNG,
    ADEGAN_TIGA_TANYA,
    ADEGAN_PENUTUP_B,
  ],
};

export const VIDEO_LUAR_K2B5B: VideoStory = {
  id: "k2b5B-luar",
  judul: JUDUL_K2B5B,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "setengah dari sekumpulan benda", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BAGI,
    ADEGAN_LUAR_BAGI_TERAPAN,
    ADEGAN_LUAR_NERACA,
    ADEGAN_LUAR_NERACA_TERAPAN,
    ADEGAN_LUAR_KALI,
    ADEGAN_LUAR_KALI_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
