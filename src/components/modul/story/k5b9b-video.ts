import type { VideoStory } from "./logika-story";
import { ADEGAN_PEMBUKA_B, ADEGAN_SEPATU_HARGA, ADEGAN_SEPATU_TABEL } from "./k5b9b-materi-1";
import { ADEGAN_SEPATU_KOLOM, ADEGAN_SEPATU_URUT, ADEGAN_WISATAWAN_DATA, ADEGAN_WISATAWAN_URUT } from "./k5b9b-materi-2";
import { ADEGAN_LATIHAN_BARISAN, ADEGAN_LATIHAN_TANDA, ADEGAN_REFLEKSI_B } from "./k5b9b-materi-3";
import { ADEGAN_LUAR_KIRI, ADEGAN_LUAR_KIRI_TERAPAN, ADEGAN_LUAR_KOLOM, ADEGAN_LUAR_KOLOM_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k5b9b-luar-1";
import { ADEGAN_LUAR_GARIS, ADEGAN_LUAR_GARIS_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_URUT, ADEGAN_LUAR_URUT_TERAPAN } from "./k5b9b-luar-2";

/** Kelas 5 Bab 9 Sub-Bab B (Mengurutkan dan Membandingkan Bilangan): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B9B: VideoStory = {
  id: "k5b9b-materi",
  judul: "Membandingkan dan Mengurutkan Bilangan menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 284–288",
  jenis: "materi",
  adegan: [ADEGAN_PEMBUKA_B, ADEGAN_SEPATU_HARGA, ADEGAN_SEPATU_TABEL, ADEGAN_SEPATU_KOLOM, ADEGAN_SEPATU_URUT, ADEGAN_WISATAWAN_DATA, ADEGAN_WISATAWAN_URUT, ADEGAN_LATIHAN_TANDA, ADEGAN_LATIHAN_BARISAN, ADEGAN_REFLEKSI_B],
};

export const VIDEO_LUAR_K5B9B: VideoStory = {
  id: "k5b9b-luar",
  judul: "Membandingkan dan Mengurutkan Bilangan: Metode dari Luar",
  subjudul: "Empat metode luar · contoh sepatu, wisatawan, dan barisan bilangan",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_KIRI,
    ADEGAN_LUAR_KIRI_TERAPAN,
    ADEGAN_LUAR_KOLOM,
    ADEGAN_LUAR_KOLOM_TERAPAN,
    ADEGAN_LUAR_URUT,
    ADEGAN_LUAR_URUT_TERAPAN,
    ADEGAN_LUAR_GARIS,
    ADEGAN_LUAR_GARIS_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
