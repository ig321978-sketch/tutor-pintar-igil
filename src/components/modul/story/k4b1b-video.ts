import type { VideoStory } from "./logika-story";
import { ADEGAN_AKTIVITAS_ALAT, ADEGAN_AKTIVITAS_KARTU, ADEGAN_STRUK } from "./k4b1b-materi-1";
import { ADEGAN_AMBIL, ADEGAN_CONTOH, ADEGAN_LATIH_DUA, ADEGAN_LATIH_SATU } from "./k4b1b-materi-2";
import { ADEGAN_DIFERENSIASI, ADEGAN_KUNCI_EMPAT, ADEGAN_LATIH_TIGA, ADEGAN_MISKONSEPSI } from "./k4b1b-materi-3";
import { ADEGAN_LUAR_CAKRAM, ADEGAN_LUAR_CAKRAM_TERAPAN, ADEGAN_LUAR_NILAI, ADEGAN_LUAR_NILAI_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_TUKAR, ADEGAN_LUAR_TUKAR_TERAPAN } from "./k4b1b-luar-1";
import { ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_URAIAN, ADEGAN_LUAR_URAIAN_TERAPAN } from "./k4b1b-luar-2";

/** Kelas 4 Bab 1 Sub-Bab B (Menentukan dan Menggunakan Nilai Tempat): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K4B1B: VideoStory = {
  id: "k4b1b-materi",
  judul: "Menentukan dan Menggunakan Nilai Tempat menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 12–15 (Aktivitas 2)",
  jenis: "materi",
  adegan: [
    ADEGAN_STRUK,
    ADEGAN_AKTIVITAS_ALAT,
    ADEGAN_AKTIVITAS_KARTU,
    ADEGAN_AMBIL,
    ADEGAN_CONTOH,
    ADEGAN_LATIH_SATU,
    ADEGAN_LATIH_DUA,
    ADEGAN_LATIH_TIGA,
    ADEGAN_KUNCI_EMPAT,
    ADEGAN_MISKONSEPSI,
    ADEGAN_DIFERENSIASI,
  ],
};

export const VIDEO_LUAR_K4B1B: VideoStory = {
  id: "k4b1b-luar",
  judul: "Nilai Tempat Bilangan: Metode dari Luar",
  subjudul: "Empat metode luar · angka dari buku",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_NILAI,
    ADEGAN_LUAR_NILAI_TERAPAN,
    ADEGAN_LUAR_TUKAR,
    ADEGAN_LUAR_TUKAR_TERAPAN,
    ADEGAN_LUAR_URAIAN,
    ADEGAN_LUAR_URAIAN_TERAPAN,
    ADEGAN_LUAR_CAKRAM,
    ADEGAN_LUAR_CAKRAM_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
