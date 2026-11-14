import type { VideoStory } from "./logika-story";
import { ADEGAN_ASEP_1, ADEGAN_DENAH_E, ADEGAN_DUGAAN, ADEGAN_PEMBUKA_E } from "./k5b4e-materi-1";
import { ADEGAN_JUMLAH_ASEP, ADEGAN_KOMANG, ADEGAN_SISI_HILANG } from "./k5b4e-materi-2";
import { ADEGAN_MISKON_1, ADEGAN_MISKON_2, ADEGAN_PENGAYAAN, ADEGAN_REFLEKSI_E, ADEGAN_UK_1, ADEGAN_UK_2 } from "./k5b4e-materi-3";
import { ADEGAN_LUAR_BR, ADEGAN_LUAR_BR_TERAPAN, ADEGAN_LUAR_OPO, ADEGAN_LUAR_OPO_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k5b4e-luar-1";
import { ADEGAN_LUAR_CPB, ADEGAN_LUAR_CPB_TERAPAN, ADEGAN_LUAR_ML, ADEGAN_LUAR_ML_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b4e-luar-2";

/** Kelas 5 Bab 4 Sub-Bab E (keliling bangun gabungan), penutup bab: video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B4E: VideoStory = {
  id: "k5b4e-materi",
  judul: "Keliling Bangun Gabungan menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 125–130 dan Refleksi nomor 16 sampai 20",
  jenis: "materi",
  adegan: [
    ADEGAN_PEMBUKA_E,
    ADEGAN_DENAH_E,
    ADEGAN_DUGAAN,
    ADEGAN_ASEP_1,
    ADEGAN_SISI_HILANG,
    ADEGAN_JUMLAH_ASEP,
    ADEGAN_KOMANG,
    ADEGAN_MISKON_1,
    ADEGAN_MISKON_2,
    ADEGAN_UK_1,
    ADEGAN_UK_2,
    ADEGAN_PENGAYAAN,
    ADEGAN_REFLEKSI_E,
  ],
};

export const VIDEO_LUAR_K5B4E: VideoStory = {
  id: "k5b4e-luar",
  judul: "Keliling Bangun Gabungan: Metode dari Luar",
  subjudul: "Empat metode luar · contoh denah rumah, Uji Kompetensi, dan gedung sekolah",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_OPO,
    ADEGAN_LUAR_OPO_TERAPAN,
    ADEGAN_LUAR_BR,
    ADEGAN_LUAR_BR_TERAPAN,
    ADEGAN_LUAR_ML,
    ADEGAN_LUAR_ML_TERAPAN,
    ADEGAN_LUAR_CPB,
    ADEGAN_LUAR_CPB_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
