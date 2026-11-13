import type { VideoStory } from "./logika-story";
import { ADEGAN_MENGINGAT, ADEGAN_PEMBUKA, ADEGAN_TUJUAN } from "./k5b9a-materi-1";
import { ADEGAN_BERMAIN, ADEGAN_CARA_BACA, ADEGAN_EKSPLORASI91A, ADEGAN_EKSPLORASI91B } from "./k5b9a-materi-2";
import { ADEGAN_EKSPLORASI91C, ADEGAN_EKSPLORASI91D, ADEGAN_LATIHAN, ADEGAN_REFLEKSI } from "./k5b9a-materi-3";
import { ADEGAN_LUAR_NAMA, ADEGAN_LUAR_NAMA_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_TABEL, ADEGAN_LUAR_TABEL_TERAPAN } from "./k5b9a-luar-1";
import { ADEGAN_LUAR_KELOMPOK, ADEGAN_LUAR_KELOMPOK_TERAPAN, ADEGAN_LUAR_NILAI, ADEGAN_LUAR_NILAI_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b9a-luar-2";

/** Kelas 5 Bab 9 Sub-Bab A (membaca, menulis, nilai tempat), termasuk pembuka bab: video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B9A: VideoStory = {
  id: "k5b9a-materi",
  judul: "Membaca, Menulis, dan Nilai Tempat menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 273–284",
  jenis: "materi",
  adegan: [ADEGAN_PEMBUKA, ADEGAN_TUJUAN, ADEGAN_MENGINGAT, ADEGAN_EKSPLORASI91A, ADEGAN_EKSPLORASI91B, ADEGAN_CARA_BACA, ADEGAN_BERMAIN, ADEGAN_EKSPLORASI91C, ADEGAN_EKSPLORASI91D, ADEGAN_LATIHAN, ADEGAN_REFLEKSI],
};

export const VIDEO_LUAR_K5B9A: VideoStory = {
  id: "k5b9a-luar",
  judul: "Bilangan sampai Satu Juta: Metode dari Luar",
  subjudul: "Empat metode luar · contoh dari lemari Jepara, Gianyar, dan harga komputer",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_TABEL,
    ADEGAN_LUAR_TABEL_TERAPAN,
    ADEGAN_LUAR_NAMA,
    ADEGAN_LUAR_NAMA_TERAPAN,
    ADEGAN_LUAR_NILAI,
    ADEGAN_LUAR_NILAI_TERAPAN,
    ADEGAN_LUAR_KELOMPOK,
    ADEGAN_LUAR_KELOMPOK_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
