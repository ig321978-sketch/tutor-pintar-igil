import type { VideoStory } from "./logika-story";
import { ADEGAN_AKTIVITAS_LIMA, ADEGAN_PEMANTIK, ADEGAN_PEMBUKA_H, ADEGAN_TABEL_WADAH } from "./k4b1h-materi-1";
import { ADEGAN_BERLATIH_SATU, ADEGAN_SUSUN_ISTILAH, ADEGAN_SUSUN_LANGKAH } from "./k4b1h-materi-2";
import { ADEGAN_CERITA_BAGI, ADEGAN_CERITA_KOTAK, ADEGAN_MISKONSEPSI } from "./k4b1h-materi-3";
import { ADEGAN_LUAR_BAGI_RATA, ADEGAN_LUAR_BAGI_RATA_TERAPAN, ADEGAN_LUAR_BAGI_UKUR, ADEGAN_LUAR_BAGI_UKUR_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k4b1h-luar-1";
import { ADEGAN_LUAR_KALI_BALIK, ADEGAN_LUAR_KALI_BALIK_TERAPAN, ADEGAN_LUAR_KURANG_ULANG, ADEGAN_LUAR_KURANG_ULANG_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k4b1h-luar-2";

/** Kelas 4 Bab 1 Sub-Bab H (Pembagian Bilangan Cacah sampai 100): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K4B1H: VideoStory = {
  id: "k4b1h-materi",
  judul: "Pembagian Bilangan Cacah sampai 100 menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 44–47 (Aktivitas 5)",
  jenis: "materi",
  adegan: [
    ADEGAN_PEMBUKA_H,
    ADEGAN_PEMANTIK,
    ADEGAN_AKTIVITAS_LIMA,
    ADEGAN_TABEL_WADAH,
    ADEGAN_SUSUN_ISTILAH,
    ADEGAN_SUSUN_LANGKAH,
    ADEGAN_BERLATIH_SATU,
    ADEGAN_CERITA_BAGI,
    ADEGAN_CERITA_KOTAK,
    ADEGAN_MISKONSEPSI,
  ],
};

export const VIDEO_LUAR_K4B1H: VideoStory = {
  id: "k4b1h-luar",
  judul: "Pembagian sampai 100: Metode dari Luar",
  subjudul: "Empat metode luar · angka dari buku",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BAGI_RATA,
    ADEGAN_LUAR_BAGI_RATA_TERAPAN,
    ADEGAN_LUAR_BAGI_UKUR,
    ADEGAN_LUAR_BAGI_UKUR_TERAPAN,
    ADEGAN_LUAR_KALI_BALIK,
    ADEGAN_LUAR_KALI_BALIK_TERAPAN,
    ADEGAN_LUAR_KURANG_ULANG,
    ADEGAN_LUAR_KURANG_ULANG_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
