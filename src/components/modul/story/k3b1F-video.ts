import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_KOTAK_TELUR, ADEGAN_TAMBAH_BERULANG, ADEGAN_TULIS_KALI } from "./k3b1F-materi-1";
import { ADEGAN_BARIS_KOLOM, ADEGAN_SALAH_JUMLAH, ADEGAN_TUKAR_URUTAN } from "./k3b1F-materi-2";
import { ADEGAN_CERITA_KALI, ADEGAN_LOMPAT_HITUNG, ADEGAN_PENUTUP } from "./k3b1F-materi-3";
import { ADEGAN_LUAR_ISI, ADEGAN_LUAR_ISI_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_SUSUNAN } from "./k3b1F-luar-1";
import { ADEGAN_LUAR_LOMPAT, ADEGAN_LUAR_LOMPAT_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SUSUNAN_TERAPAN } from "./k3b1F-luar-2";

/**
 * Kelas 3 Bab 1 Sub-Bab F (perkalian sampai seratus), cerita Toko Kelontong Pak Joko.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Telur Bu Mirna" (Raka, Salsa, Bima, Pak Joko, Bu Mirna).
 * Video kedua: tiga metode global (Equal Groups, Array, Skip Counting), terpisah.
 */
export const JUDUL_K3B1F = "Telur Bu Mirna";

export const VIDEO_MATERI_K3B1F: VideoStory = {
  id: "k3b1F-materi",
  judul: JUDUL_K3B1F,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "perkalian sampai seratus", daftar: ["Perkalian sebagai penjumlahan berulang", "Menulis perkalian", "Menukar urutan bilangan perkalian"] }),
    ADEGAN_KOTAK_TELUR,
    ADEGAN_TAMBAH_BERULANG,
    ADEGAN_TULIS_KALI,
    ADEGAN_SALAH_JUMLAH,
    ADEGAN_BARIS_KOLOM,
    ADEGAN_TUKAR_URUTAN,
    ADEGAN_LOMPAT_HITUNG,
    ADEGAN_CERITA_KALI,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K3B1F: VideoStory = {
  id: "k3b1F-luar",
  judul: JUDUL_K3B1F,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "perkalian sampai seratus", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_ISI,
    ADEGAN_LUAR_ISI_TERAPAN,
    ADEGAN_LUAR_SUSUNAN,
    ADEGAN_LUAR_SUSUNAN_TERAPAN,
    ADEGAN_LUAR_LOMPAT,
    ADEGAN_LUAR_LOMPAT_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
