import type { VideoStory } from "./logika-story";
import { ADEGAN_AMATI_BUKU, ADEGAN_APERSEPSI, ADEGAN_SEKALI } from "./k4b1f-materi-1";
import { ADEGAN_DUA_KALI, ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_PENDEK } from "./k4b1f-materi-2";
import { ADEGAN_LATIHAN_EMPAT, ADEGAN_LATIHAN_LIMA, ADEGAN_LATIHAN_TIGA, ADEGAN_MISKONSEPSI } from "./k4b1f-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_PINJAM, ADEGAN_LUAR_PINJAM_TERAPAN, ADEGAN_LUAR_STANDAR, ADEGAN_LUAR_STANDAR_TERAPAN } from "./k4b1f-luar-1";
import { ADEGAN_LUAR_KOMPENSASI, ADEGAN_LUAR_KOMPENSASI_TERAPAN, ADEGAN_LUAR_NAIK, ADEGAN_LUAR_NAIK_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k4b1f-luar-2";

/** Kelas 4 Bab 1 Sub-Bab F (Pengurangan Bilangan Cacah sampai 1.000): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K4B1F: VideoStory = {
  id: "k4b1f-materi",
  judul: "Pengurangan Bilangan Cacah sampai 1.000 menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 34–39",
  jenis: "materi",
  adegan: [
    ADEGAN_APERSEPSI,
    ADEGAN_AMATI_BUKU,
    ADEGAN_SEKALI,
    ADEGAN_DUA_KALI,
    ADEGAN_PENDEK,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_LATIHAN_EMPAT,
    ADEGAN_LATIHAN_LIMA,
    ADEGAN_MISKONSEPSI,
  ],
};

export const VIDEO_LUAR_K4B1F: VideoStory = {
  id: "k4b1f-luar",
  judul: "Pengurangan sampai 1.000: Metode dari Luar",
  subjudul: "Empat metode luar · angka dari buku",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_STANDAR,
    ADEGAN_LUAR_STANDAR_TERAPAN,
    ADEGAN_LUAR_PINJAM,
    ADEGAN_LUAR_PINJAM_TERAPAN,
    ADEGAN_LUAR_NAIK,
    ADEGAN_LUAR_NAIK_TERAPAN,
    ADEGAN_LUAR_KOMPENSASI,
    ADEGAN_LUAR_KOMPENSASI_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
