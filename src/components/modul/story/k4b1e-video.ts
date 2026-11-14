import type { VideoStory } from "./logika-story";
import { ADEGAN_BUKU_TIGA, ADEGAN_PANDUAN_AWAL, ADEGAN_SIMPAN_PANJANG, ADEGAN_SIMPAN_PENDEK, ADEGAN_TONI_PANJANG, ADEGAN_TONI_PENDEK } from "./k4b1e-materi-1";
import { ADEGAN_BERLATIH_DUA_DUA, ADEGAN_BERLATIH_DUA_SATU, ADEGAN_BERLATIH_LIMA, ADEGAN_BERLATIH_SATU, ADEGAN_BERLATIH_TIGA_EMPAT, ADEGAN_MISKONSEPSI, ADEGAN_PANDUAN_AMATI } from "./k4b1e-materi-2";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_SIMPAN, ADEGAN_LUAR_SIMPAN_TERAPAN, ADEGAN_LUAR_STANDAR, ADEGAN_LUAR_STANDAR_TERAPAN } from "./k4b1e-luar-1";
import { ADEGAN_LUAR_MAJU, ADEGAN_LUAR_MAJU_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SEBAGIAN, ADEGAN_LUAR_SEBAGIAN_TERAPAN } from "./k4b1e-luar-2";

/** Kelas 4 Bab 1 Sub-Bab E (Penjumlahan Bilangan Cacah sampai 1.000): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K4B1E: VideoStory = {
  id: "k4b1e-materi",
  judul: "Penjumlahan Bilangan Cacah sampai 1.000 menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 28–34 · Panduan Guru hlm. 49–54",
  jenis: "materi",
  adegan: [
    ADEGAN_PANDUAN_AWAL,
    ADEGAN_TONI_PANJANG,
    ADEGAN_TONI_PENDEK,
    ADEGAN_BUKU_TIGA,
    ADEGAN_SIMPAN_PANJANG,
    ADEGAN_SIMPAN_PENDEK,
    ADEGAN_PANDUAN_AMATI,
    ADEGAN_BERLATIH_SATU,
    ADEGAN_BERLATIH_DUA_SATU,
    ADEGAN_BERLATIH_DUA_DUA,
    ADEGAN_BERLATIH_TIGA_EMPAT,
    ADEGAN_BERLATIH_LIMA,
    ADEGAN_MISKONSEPSI,
  ],
};

export const VIDEO_LUAR_K4B1E: VideoStory = {
  id: "k4b1e-luar",
  judul: "Penjumlahan sampai 1.000: Metode dari Luar",
  subjudul: "Empat metode luar · angka dari buku",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_STANDAR,
    ADEGAN_LUAR_STANDAR_TERAPAN,
    ADEGAN_LUAR_SIMPAN,
    ADEGAN_LUAR_SIMPAN_TERAPAN,
    ADEGAN_LUAR_MAJU,
    ADEGAN_LUAR_MAJU_TERAPAN,
    ADEGAN_LUAR_SEBAGIAN,
    ADEGAN_LUAR_SEBAGIAN_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
