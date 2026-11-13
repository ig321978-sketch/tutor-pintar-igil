import type { VideoStory } from "./logika-story";
import { ADEGAN_MENGINGAT, ADEGAN_PEMBUKA, ADEGAN_TABEL_DONAT, ADEGAN_TUJUAN } from "./k5b8a-materi-1";
import { ADEGAN_CENTANG_GARIS, ADEGAN_DISKUSI, ADEGAN_SAYURAN, ADEGAN_TURUS } from "./k5b8a-materi-2";
import { ADEGAN_LATIHAN, ADEGAN_REFLEKSI, ADEGAN_SEPATU } from "./k5b8a-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_SIKLUS, ADEGAN_LUAR_SIKLUS_TERAPAN, ADEGAN_LUAR_TURUS, ADEGAN_LUAR_TURUS_TERAPAN } from "./k5b8a-luar-1";
import { ADEGAN_LUAR_KEPUTUSAN, ADEGAN_LUAR_KEPUTUSAN_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TABEL, ADEGAN_LUAR_TABEL_TERAPAN } from "./k5b8a-luar-2";

/** Kelas 5 Bab 8 Sub-Bab A (mengumpulkan data), termasuk pembuka bab: video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B8A: VideoStory = {
  id: "k5b8a-materi",
  judul: "Mengumpulkan Data dan Tabel Frekuensi menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 235–247",
  jenis: "materi",
  adegan: [ADEGAN_PEMBUKA, ADEGAN_TABEL_DONAT, ADEGAN_TUJUAN, ADEGAN_MENGINGAT, ADEGAN_SAYURAN, ADEGAN_CENTANG_GARIS, ADEGAN_TURUS, ADEGAN_DISKUSI, ADEGAN_SEPATU, ADEGAN_LATIHAN, ADEGAN_REFLEKSI],
};

export const VIDEO_LUAR_K5B8A: VideoStory = {
  id: "k5b8a-luar",
  judul: "Mengumpulkan Data: Metode dari Luar",
  subjudul: "Empat metode luar · contoh dari sayuran favorit, donat Anggi, dan nilai ulangan",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_SIKLUS,
    ADEGAN_LUAR_SIKLUS_TERAPAN,
    ADEGAN_LUAR_TURUS,
    ADEGAN_LUAR_TURUS_TERAPAN,
    ADEGAN_LUAR_TABEL,
    ADEGAN_LUAR_TABEL_TERAPAN,
    ADEGAN_LUAR_KEPUTUSAN,
    ADEGAN_LUAR_KEPUTUSAN_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
