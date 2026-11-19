import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_RAK_MI, ADEGAN_SUSUN_KURANG, ADEGAN_SUSUN_PANJANG_KURANG } from "./k3b1E-materi-1";
import { ADEGAN_SALAH_BALIK, ADEGAN_PINJAM_PULUHAN, ADEGAN_PERIKSA_TAMBAH } from "./k3b1E-materi-2";
import { ADEGAN_SOAL_CERITA_KURANG, ADEGAN_KURANG_SAMA, ADEGAN_PENUTUP } from "./k3b1E-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_SUSUN, ADEGAN_LUAR_SUSUN_TERAPAN } from "./k3b1E-luar-1";
import { ADEGAN_LUAR_NAIK, ADEGAN_LUAR_NAIK_TERAPAN, ADEGAN_LUAR_PINJAM, ADEGAN_LUAR_PINJAM_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k3b1E-luar-2";

/**
 * Kelas 3 Bab 1 Sub-Bab E (pengurangan sampai seratus).
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Sisa Stok Pak Anto" (Raka, Salsa, Bima, Pak Joko, Pak Anto, Bu Mirna).
 * Video kedua: tiga metode global (Standard Subtraction, Counting Up, Regrouping), terpisah.
 */
export const JUDUL_K3B1E = "Sisa Stok Pak Anto";

export const VIDEO_MATERI_K3B1E: VideoStory = {
  id: "k3b1E-materi",
  judul: JUDUL_K3B1E,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "pengurangan sampai seratus", daftar: ["Mengurang dengan susun pendek dan susun panjang", "Meminjam satu puluhan", "Memeriksa dengan penjumlahan"] }),
    ADEGAN_RAK_MI,
    ADEGAN_SUSUN_KURANG,
    ADEGAN_SUSUN_PANJANG_KURANG,
    ADEGAN_SALAH_BALIK,
    ADEGAN_PINJAM_PULUHAN,
    ADEGAN_PERIKSA_TAMBAH,
    ADEGAN_SOAL_CERITA_KURANG,
    ADEGAN_KURANG_SAMA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K3B1E: VideoStory = {
  id: "k3b1E-luar",
  judul: JUDUL_K3B1E,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "pengurangan sampai seratus", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_SUSUN,
    ADEGAN_LUAR_SUSUN_TERAPAN,
    ADEGAN_LUAR_NAIK,
    ADEGAN_LUAR_NAIK_TERAPAN,
    ADEGAN_LUAR_PINJAM,
    ADEGAN_LUAR_PINJAM_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
