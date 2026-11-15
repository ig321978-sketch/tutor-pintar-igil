import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_CERITA_JAMBU, ADEGAN_MAJU_JALUR, ADEGAN_PECAH_SEPULUH, ADEGAN_TABEL_NILAI_TEMPAT, ADEGAN_TIGA_SATU_HASIL } from "./k2b2A-materi-1";
import { ADEGAN_BUKA_PULUHAN, ADEGAN_SAHABAT_SEPULUH, ADEGAN_TUKAR_SEPULUH, ADEGAN_TUKAR_TABEL, ADEGAN_TUKAR_URUTAN } from "./k2b2A-materi-2";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP, ADEGAN_PILIH_CARA } from "./k2b2A-materi-3";
import { ADEGAN_LUAR_MAJU, ADEGAN_LUAR_MAJU_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_RINGKAS } from "./k2b2A-luar-1";
import { ADEGAN_LUAR_DIENES, ADEGAN_LUAR_DIENES_TERAPAN, ADEGAN_LUAR_PASANGAN, ADEGAN_LUAR_PASANGAN_TERAPAN } from "./k2b2A-luar-2";

/** Kelas 2 Bab 2 Sub-Bab A (Berbagai Cara Melakukan Penjumlahan): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K2B2A: VideoStory = {
  id: "k2b2A-materi",
  judul: "Berbagai Cara Melakukan Penjumlahan",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "berbagai cara melakukan penjumlahan", daftar: ["Maju di jalur bilangan", "Pecah bilangan jadi bagian", "Tukar satuan jadi puluhan"] }),
    ADEGAN_CERITA_JAMBU,
    ADEGAN_MAJU_JALUR,
    ADEGAN_PECAH_SEPULUH,
    ADEGAN_TABEL_NILAI_TEMPAT,
    ADEGAN_TIGA_SATU_HASIL,
    ADEGAN_TUKAR_URUTAN,
    ADEGAN_SAHABAT_SEPULUH,
    ADEGAN_TUKAR_SEPULUH,
    ADEGAN_TUKAR_TABEL,
    ADEGAN_BUKA_PULUHAN,
    ADEGAN_PILIH_CARA,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B2A: VideoStory = {
  id: "k2b2A-luar",
  judul: "Berbagai Cara Penjumlahan: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "berbagai cara melakukan penjumlahan" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_MAJU,
    ADEGAN_LUAR_MAJU_TERAPAN,
    ADEGAN_LUAR_PASANGAN,
    ADEGAN_LUAR_PASANGAN_TERAPAN,
    ADEGAN_LUAR_DIENES,
    ADEGAN_LUAR_DIENES_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
