import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_SALAH_BESAR, ADEGAN_TIGA_CARA, ADEGAN_TROLI_DATANG } from "./k2b6A-materi-1";
import { ADEGAN_KIRA_BUKTI, ADEGAN_POSISI_KATA, ADEGAN_TIGA_BENDA } from "./k2b6A-materi-2";
import { ADEGAN_DUA_HASIL, ADEGAN_RANTAI_PENUTUP, ADEGAN_SATUAN } from "./k2b6A-materi-3";
import { ADEGAN_LUAR_BATANG, ADEGAN_LUAR_BATANG_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k2b6A-luar-1";
import { ADEGAN_LUAR_DASAR, ADEGAN_LUAR_DASAR_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TITIK, ADEGAN_LUAR_TITIK_TERAPAN } from "./k2b6A-luar-2";

/**
 * Kelas 2 Bab 6 Sub-Bab A (berat benda), awal cerita Hari Olahraga Sekolah.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Peralatan Lomba Pak Anton" (Chacha, Dika, Nia, Bu Sari, Pak Anton).
 * Video kedua: tiga metode global (Bar Model, Dot Balance, Heavy First), terpisah.
 */
export const JUDUL_K2B6A = "Peralatan Lomba Pak Anton";

export const VIDEO_MATERI_K2B6A: VideoStory = {
  id: "k2b6A-materi",
  judul: JUDUL_K2B6A,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "berat benda", daftar: ["Membandingkan berat dua benda", "Kata lebih berat dan lebih ringan", "Mengukur berat dengan satuan tidak baku"] }),
    ADEGAN_TROLI_DATANG,
    ADEGAN_SALAH_BESAR,
    ADEGAN_TIGA_CARA,
    ADEGAN_POSISI_KATA,
    ADEGAN_TIGA_BENDA,
    ADEGAN_KIRA_BUKTI,
    ADEGAN_SATUAN,
    ADEGAN_DUA_HASIL,
    ADEGAN_RANTAI_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B6A: VideoStory = {
  id: "k2b6A-luar",
  judul: JUDUL_K2B6A,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "berat benda", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BATANG,
    ADEGAN_LUAR_BATANG_TERAPAN,
    ADEGAN_LUAR_TITIK,
    ADEGAN_LUAR_TITIK_TERAPAN,
    ADEGAN_LUAR_DASAR,
    ADEGAN_LUAR_DASAR_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
