import type { VideoStory } from "./logika-story";
import { ADEGAN_AKTIVITAS1, ADEGAN_PEMBUKA, ADEGAN_PETA, ADEGAN_SEGIBANYAK } from "./k4b5a-materi-1";
import { ADEGAN_BERATURAN, ADEGAN_BERLATIH_BANYAK, ADEGAN_SEGITIGA, ADEGAN_SEGITIGA_SISI, ADEGAN_SEGITIGA_SUDUT } from "./k4b5a-materi-2";
import { ADEGAN_BERLATIH_CIRI, ADEGAN_BERPIKIR, ADEGAN_HUBUNGAN, ADEGAN_SEGIEMPAT_1, ADEGAN_SEGIEMPAT_2 } from "./k4b5a-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_PILAH, ADEGAN_LUAR_PILAH_TERAPAN, ADEGAN_LUAR_VH, ADEGAN_LUAR_VH_TERAPAN } from "./k4b5a-luar-1";
import { ADEGAN_LUAR_MATRIKS, ADEGAN_LUAR_MATRIKS_TERAPAN, ADEGAN_LUAR_PAPAN, ADEGAN_LUAR_PAPAN_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k4b5a-luar-2";

/** Kelas 4 Bab 5 Sub-Bab A (ciri-ciri bangun datar), termasuk pembuka bab: video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K4B5A: VideoStory = {
  id: "k4b5a-materi",
  judul: "Ciri-Ciri Bangun Datar menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 139–165 (Aktivitas 1 sampai 5)",
  jenis: "materi",
  adegan: [
    ADEGAN_PEMBUKA,
    ADEGAN_PETA,
    ADEGAN_SEGIBANYAK,
    ADEGAN_AKTIVITAS1,
    ADEGAN_BERATURAN,
    ADEGAN_BERLATIH_BANYAK,
    ADEGAN_SEGITIGA,
    ADEGAN_SEGITIGA_SISI,
    ADEGAN_SEGITIGA_SUDUT,
    ADEGAN_SEGIEMPAT_1,
    ADEGAN_SEGIEMPAT_2,
    ADEGAN_HUBUNGAN,
    ADEGAN_BERPIKIR,
    ADEGAN_BERLATIH_CIRI,
  ],
};

export const VIDEO_LUAR_K4B5A: VideoStory = {
  id: "k4b5a-luar",
  judul: "Ciri Bangun Datar: Metode dari Luar",
  subjudul: "Empat metode luar · bangun dari buku",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_VH,
    ADEGAN_LUAR_VH_TERAPAN,
    ADEGAN_LUAR_PILAH,
    ADEGAN_LUAR_PILAH_TERAPAN,
    ADEGAN_LUAR_PAPAN,
    ADEGAN_LUAR_PAPAN_TERAPAN,
    ADEGAN_LUAR_MATRIKS,
    ADEGAN_LUAR_MATRIKS_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
