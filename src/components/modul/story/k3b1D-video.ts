import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_PESANAN_KUE, ADEGAN_SUSUN_PANJANG, ADEGAN_SUSUN_PENDEK } from "./k3b1D-materi-1";
import { ADEGAN_LUPA_SIMPAN, ADEGAN_TIGA_BILANGAN, ADEGAN_TUKAR_SEPULUH } from "./k3b1D-materi-2";
import { ADEGAN_CERITA_TAMBAH, ADEGAN_PENUTUP, ADEGAN_PERIKSA_TUKAR } from "./k3b1D-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_SUSUN, ADEGAN_LUAR_SUSUN_TERAPAN } from "./k3b1D-luar-1";
import { ADEGAN_LUAR_MAJU, ADEGAN_LUAR_MAJU_TERAPAN, ADEGAN_LUAR_PASANGAN, ADEGAN_LUAR_PASANGAN_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k3b1D-luar-2";

/**
 * Kelas 3 Bab 1 Sub-Bab D (penjumlahan sampai 100), Toko Kelontong Pak Joko.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Pesanan Bu Tuti" (Raka, Salsa, Bima, Pak Joko, Bu Tuti).
 * Video kedua: tiga metode global (Standard Addition, Number Bond, Counting On), terpisah.
 */
export const JUDUL_K3B1D = "Pesanan Bu Tuti";

export const VIDEO_MATERI_K3B1D: VideoStory = {
  id: "k3b1D-materi",
  judul: JUDUL_K3B1D,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "penjumlahan sampai seratus", daftar: ["Menjumlah dengan susun pendek dan susun panjang", "Menjumlah dengan menyimpan", "Menjumlah tiga bilangan"] }),
    ADEGAN_PESANAN_KUE,
    ADEGAN_SUSUN_PENDEK,
    ADEGAN_SUSUN_PANJANG,
    ADEGAN_LUPA_SIMPAN,
    ADEGAN_TUKAR_SEPULUH,
    ADEGAN_TIGA_BILANGAN,
    ADEGAN_CERITA_TAMBAH,
    ADEGAN_PERIKSA_TUKAR,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K3B1D: VideoStory = {
  id: "k3b1D-luar",
  judul: JUDUL_K3B1D,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "penjumlahan sampai seratus", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_SUSUN,
    ADEGAN_LUAR_SUSUN_TERAPAN,
    ADEGAN_LUAR_PASANGAN,
    ADEGAN_LUAR_PASANGAN_TERAPAN,
    ADEGAN_LUAR_MAJU,
    ADEGAN_LUAR_MAJU_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
