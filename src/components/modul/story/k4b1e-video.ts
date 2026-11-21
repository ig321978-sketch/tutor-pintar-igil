import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_DAFTAR, ADEGAN_RESEPSI, ADEGAN_SALAH_SIMPAN } from "./k4b1e-materi-1";
import { ADEGAN_PANJANG, ADEGAN_PULUHAN, ADEGAN_SIMPAN } from "./k4b1e-materi-2";
import { ADEGAN_PENUTUP, ADEGAN_PERIKSA, ADEGAN_TIGA } from "./k4b1e-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_SUSUN, ADEGAN_LUAR_SUSUN_TERAPAN } from "./k4b1e-luar-1";
import { ADEGAN_LUAR_GENAP, ADEGAN_LUAR_GENAP_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TAMBAH, ADEGAN_LUAR_TAMBAH_TERAPAN } from "./k4b1e-luar-2";

/**
 * Kelas 4 Bab 1 Sub-Bab E (penjumlahan bilangan sampai seribu), lanjutan cerita Penginapan Pulau Karang Indah.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Meja Resepsi Bu Rina" (Satria, Laras, Genta, Pak Hendro, Bu Rina).
 * Video kedua: tiga metode global (Column Add, Place Add, Round and Adjust), terpisah.
 */
export const JUDUL_K4B1E = "Meja Resepsi Bu Rina";

export const VIDEO_MATERI_K4B1E: VideoStory = {
  id: "k4b1e-materi",
  judul: JUDUL_K4B1E,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "menjumlahkan bilangan sampai seribu", daftar: ["Susun panjang dan pendek", "Menyimpan", "Memeriksa hasil"] }),
    ADEGAN_RESEPSI,
    ADEGAN_DAFTAR,
    ADEGAN_SALAH_SIMPAN,
    ADEGAN_SIMPAN,
    ADEGAN_PULUHAN,
    ADEGAN_PANJANG,
    ADEGAN_PERIKSA,
    ADEGAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K4B1E: VideoStory = {
  id: "k4b1e-luar",
  judul: JUDUL_K4B1E,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "menjumlahkan bilangan sampai seribu", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_SUSUN,
    ADEGAN_LUAR_SUSUN_TERAPAN,
    ADEGAN_LUAR_TAMBAH,
    ADEGAN_LUAR_TAMBAH_TERAPAN,
    ADEGAN_LUAR_GENAP,
    ADEGAN_LUAR_GENAP_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
