import type { VideoStory } from "./logika-story";
import { ADEGAN_KOMPOSISI_AMATI, ADEGAN_KOMPOSISI_BERLATIH, ADEGAN_KOMPOSISI_NILAI } from "./k4b1d-materi-1";
import { ADEGAN_BERLATIH_SATU, ADEGAN_DEKOMPOSISI_AMATI, ADEGAN_DEKOMPOSISI_NOL, ADEGAN_DEKOMPOSISI_URAIAN } from "./k4b1d-materi-2";
import { ADEGAN_BERLATIH_UANG, ADEGAN_MISKONSEPSI } from "./k4b1d-materi-3";
import { ADEGAN_LUAR_DEKOMPOSISI, ADEGAN_LUAR_DEKOMPOSISI_TERAPAN, ADEGAN_LUAR_KOMPOSISI, ADEGAN_LUAR_KOMPOSISI_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k4b1d-luar-1";
import { ADEGAN_LUAR_IKATAN, ADEGAN_LUAR_IKATAN_TERAPAN, ADEGAN_LUAR_KELOMPOK, ADEGAN_LUAR_KELOMPOK_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k4b1d-luar-2";

/** Kelas 4 Bab 1 Sub-Bab D (Komposisi dan Dekomposisi Bilangan Cacah sampai 10.000): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K4B1D: VideoStory = {
  id: "k4b1d-materi",
  judul: "Komposisi dan Dekomposisi Bilangan menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 24–28; Panduan Guru hlm. 45–49",
  jenis: "materi",
  adegan: [
    ADEGAN_KOMPOSISI_AMATI,
    ADEGAN_KOMPOSISI_NILAI,
    ADEGAN_KOMPOSISI_BERLATIH,
    ADEGAN_DEKOMPOSISI_AMATI,
    ADEGAN_DEKOMPOSISI_URAIAN,
    ADEGAN_DEKOMPOSISI_NOL,
    ADEGAN_BERLATIH_SATU,
    ADEGAN_BERLATIH_UANG,
    ADEGAN_MISKONSEPSI,
  ],
};

export const VIDEO_LUAR_K4B1D: VideoStory = {
  id: "k4b1d-luar",
  judul: "Menyusun dan Mengurai Bilangan: Metode dari Luar",
  subjudul: "Empat metode luar · angka dari buku",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_KOMPOSISI,
    ADEGAN_LUAR_KOMPOSISI_TERAPAN,
    ADEGAN_LUAR_DEKOMPOSISI,
    ADEGAN_LUAR_DEKOMPOSISI_TERAPAN,
    ADEGAN_LUAR_KELOMPOK,
    ADEGAN_LUAR_KELOMPOK_TERAPAN,
    ADEGAN_LUAR_IKATAN,
    ADEGAN_LUAR_IKATAN_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
