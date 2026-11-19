import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_GUDANG_TOKO, ADEGAN_TIGA_UKURAN, ADEGAN_TUKAR_SEPULUH } from "./k3b1A-materi-1";
import { ADEGAN_CARA_BACA, ADEGAN_PAPAN_TEMPAT, ADEGAN_SALAH_BACA } from "./k3b1A-materi-2";
import { ADEGAN_DAFTAR_STOK, ADEGAN_PENUTUP, ADEGAN_TULIS_DARI_KATA } from "./k3b1A-materi-3";
import { ADEGAN_LUAR_BALOK, ADEGAN_LUAR_BALOK_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k3b1A-luar-1";
import { ADEGAN_LUAR_NAMA, ADEGAN_LUAR_NAMA_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TABEL, ADEGAN_LUAR_TABEL_TERAPAN } from "./k3b1A-luar-2";

/**
 * Kelas 3 Bab 1 Sub-Bab A (bilangan tiga angka), awal cerita Toko Kelontong Pak Joko.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Toples Permen Pak Joko" (Raka, Salsa, Bima, Pak Joko, Kak Dewi).
 * Video kedua: tiga metode global (Dienes Blocks, Place-Value Chart, Number Names), terpisah.
 */
export const JUDUL_K3B1A = "Toples Permen Pak Joko";

export const VIDEO_MATERI_K3B1A: VideoStory = {
  id: "k3b1A-materi",
  judul: JUDUL_K3B1A,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "bilangan tiga angka", daftar: ["Satuan, puluhan, dan ratusan", "Membaca bilangan tiga angka", "Menulis bilangan dengan angka nol"] }),
    ADEGAN_GUDANG_TOKO,
    ADEGAN_TIGA_UKURAN,
    ADEGAN_TUKAR_SEPULUH,
    ADEGAN_PAPAN_TEMPAT,
    ADEGAN_SALAH_BACA,
    ADEGAN_CARA_BACA,
    ADEGAN_TULIS_DARI_KATA,
    ADEGAN_DAFTAR_STOK,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K3B1A: VideoStory = {
  id: "k3b1A-luar",
  judul: JUDUL_K3B1A,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "bilangan tiga angka", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BALOK,
    ADEGAN_LUAR_BALOK_TERAPAN,
    ADEGAN_LUAR_TABEL,
    ADEGAN_LUAR_TABEL_TERAPAN,
    ADEGAN_LUAR_NAMA,
    ADEGAN_LUAR_NAMA_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
