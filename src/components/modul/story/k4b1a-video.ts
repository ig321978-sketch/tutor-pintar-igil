import type { VideoStory } from "./logika-story";
import { ADEGAN_CERITA, ADEGAN_PANDUAN_AWAL, ADEGAN_PEMBUKA, ADEGAN_PETA } from "./k4b1a-materi-1";
import { ADEGAN_AKTIVITAS, ADEGAN_CARA_BACA, ADEGAN_JARAK, ADEGAN_MENULIS } from "./k4b1a-materi-2";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_EMPAT, ADEGAN_LATIHAN_SATU, ADEGAN_NAMA } from "./k4b1a-materi-3";
import { ADEGAN_LUAR_DIENES, ADEGAN_LUAR_DIENES_TERAPAN, ADEGAN_LUAR_PAPAN, ADEGAN_LUAR_PAPAN_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k4b1a-luar-1";
import { ADEGAN_LUAR_NOL, ADEGAN_LUAR_NOL_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_UCAP, ADEGAN_LUAR_UCAP_TERAPAN } from "./k4b1a-luar-2";

/** Kelas 4 Bab 1 Sub-Bab A (Membaca dan Menulis Bilangan Cacah sampai 10.000), termasuk pembuka bab: video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K4B1A: VideoStory = {
  id: "k4b1a-materi",
  judul: "Membaca dan Menulis Bilangan Cacah menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 1–12",
  jenis: "materi",
  adegan: [
    ADEGAN_PEMBUKA,
    ADEGAN_PETA,
    ADEGAN_PANDUAN_AWAL,
    ADEGAN_CERITA,
    ADEGAN_JARAK,
    ADEGAN_AKTIVITAS,
    ADEGAN_CARA_BACA,
    ADEGAN_MENULIS,
    ADEGAN_NAMA,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_EMPAT,
  ],
};

export const VIDEO_LUAR_K4B1A: VideoStory = {
  id: "k4b1a-luar",
  judul: "Membaca dan Menulis Bilangan Empat Angka: Metode dari Luar",
  subjudul: "Empat metode luar · angka dari buku",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_DIENES,
    ADEGAN_LUAR_DIENES_TERAPAN,
    ADEGAN_LUAR_PAPAN,
    ADEGAN_LUAR_PAPAN_TERAPAN,
    ADEGAN_LUAR_NOL,
    ADEGAN_LUAR_NOL_TERAPAN,
    ADEGAN_LUAR_UCAP,
    ADEGAN_LUAR_UCAP_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
