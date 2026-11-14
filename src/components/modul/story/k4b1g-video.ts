import type { VideoStory } from "./logika-story";
import { ADEGAN_AMATI_DONAT, ADEGAN_CARA_PANJANG, ADEGAN_PANDUAN_AWAL, ADEGAN_PEMANTIK } from "./k4b1g-materi-1";
import { ADEGAN_AYO_MENCOBA, ADEGAN_KELERENG, ADEGAN_SUSUN_SIMPAN, ADEGAN_SUSUN_TANPA } from "./k4b1g-materi-2";
import { ADEGAN_BERLATIH_DUA_A, ADEGAN_BERLATIH_DUA_B, ADEGAN_BERLATIH_SATU, ADEGAN_MISKONSEPSI } from "./k4b1g-materi-3";
import { ADEGAN_LUAR_KELOMPOK, ADEGAN_LUAR_KELOMPOK_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_SUSUNAN, ADEGAN_LUAR_SUSUNAN_TERAPAN } from "./k4b1g-luar-1";
import { ADEGAN_LUAR_FAKTA, ADEGAN_LUAR_FAKTA_TERAPAN, ADEGAN_LUAR_GANDA, ADEGAN_LUAR_GANDA_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k4b1g-luar-2";

/** Kelas 4 Bab 1 Sub-Bab G (Perkalian Bilangan Cacah sampai 100): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K4B1G: VideoStory = {
  id: "k4b1g-materi",
  judul: "Perkalian sampai 100 menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 39–43",
  jenis: "materi",
  adegan: [
    ADEGAN_PANDUAN_AWAL,
    ADEGAN_PEMANTIK,
    ADEGAN_AMATI_DONAT,
    ADEGAN_CARA_PANJANG,
    ADEGAN_SUSUN_TANPA,
    ADEGAN_KELERENG,
    ADEGAN_SUSUN_SIMPAN,
    ADEGAN_AYO_MENCOBA,
    ADEGAN_BERLATIH_SATU,
    ADEGAN_BERLATIH_DUA_A,
    ADEGAN_BERLATIH_DUA_B,
    ADEGAN_MISKONSEPSI,
  ],
};

export const VIDEO_LUAR_K4B1G: VideoStory = {
  id: "k4b1g-luar",
  judul: "Perkalian sampai 100: Metode dari Luar",
  subjudul: "Empat metode luar · angka dari buku",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_KELOMPOK,
    ADEGAN_LUAR_KELOMPOK_TERAPAN,
    ADEGAN_LUAR_SUSUNAN,
    ADEGAN_LUAR_SUSUNAN_TERAPAN,
    ADEGAN_LUAR_FAKTA,
    ADEGAN_LUAR_FAKTA_TERAPAN,
    ADEGAN_LUAR_GANDA,
    ADEGAN_LUAR_GANDA_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
