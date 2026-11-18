import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_DUA_NAMPAN, ADEGAN_KIRA_KIRA, ADEGAN_SATUAN_DULU } from "./k2b1C-materi-1";
import { ADEGAN_PULUHAN_DULU, ADEGAN_SATUAN_LANJUT, ADEGAN_TANDA } from "./k2b1C-materi-2";
import { ADEGAN_MEJA_PESTA, ADEGAN_PENUTUP, ADEGAN_URUTAN } from "./k2b1C-materi-3";
import { ADEGAN_LUAR_GARIS, ADEGAN_LUAR_GARIS_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k2b1C-luar-1";
import { ADEGAN_LUAR_BATANG, ADEGAN_LUAR_BATANG_TERAPAN, ADEGAN_LUAR_PATOKAN, ADEGAN_LUAR_PATOKAN_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k2b1C-luar-2";

/**
 * Kelas 2 Bab 1 Sub-Bab C (membandingkan bilangan sampai lima puluh), akhir cerita Kue di Kantin Sekolah.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Dua Nampan untuk Pesta Kue" (Chacha, Dika, Nia, Bu Sari, Bu Dewi).
 * Video kedua: tiga metode global, terpisah.
 */
export const JUDUL_K2B1C = "Dua Nampan untuk Pesta Kue";

export const VIDEO_MATERI_K2B1C: VideoStory = {
  id: "k2b1C-materi",
  judul: JUDUL_K2B1C,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "membandingkan bilangan sampai lima puluh", daftar: ["Memperkirakan lalu menghitung", "Membandingkan puluhan dan satuan", "Memakai tanda lebih besar, lebih kecil, dan sama dengan"] }),
    ADEGAN_DUA_NAMPAN,
    ADEGAN_KIRA_KIRA,
    ADEGAN_SATUAN_DULU,
    ADEGAN_PULUHAN_DULU,
    ADEGAN_TANDA,
    ADEGAN_SATUAN_LANJUT,
    ADEGAN_URUTAN,
    ADEGAN_MEJA_PESTA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B1C: VideoStory = {
  id: "k2b1C-luar",
  judul: JUDUL_K2B1C,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "membandingkan bilangan sampai lima puluh", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_GARIS,
    ADEGAN_LUAR_GARIS_TERAPAN,
    ADEGAN_LUAR_PATOKAN,
    ADEGAN_LUAR_PATOKAN_TERAPAN,
    ADEGAN_LUAR_BATANG,
    ADEGAN_LUAR_BATANG_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
