import type { VideoStory } from "./logika-story";
import { ADEGAN_MENGINGAT, ADEGAN_SEPERLIMA, ADEGAN_TIMBANGAN } from "./k6b1c-materi-1";
import { ADEGAN_JARAK, ADEGAN_NILAI_TEMPAT, ADEGAN_URUT } from "./k6b1c-materi-2";
import { ADEGAN_LATIHAN13A, ADEGAN_LATIHAN13B, ADEGAN_PENGAYAAN, ADEGAN_UJI } from "./k6b1c-materi-3";
import { ADEGAN_LUAR_C_PEMBUKA, ADEGAN_LUAR_C_SENILAI, ADEGAN_LUAR_C_SENILAI_TERAPAN } from "./k6b1c-luar-1";
import { ADEGAN_LUAR_C_KISI, ADEGAN_LUAR_C_KISI_TERAPAN, ADEGAN_LUAR_C_RINGKAS, ADEGAN_LUAR_C_TEMPAT, ADEGAN_LUAR_C_TEMPAT_TERAPAN, ADEGAN_LUAR_C_URUT, ADEGAN_LUAR_C_URUT_TERAPAN } from "./k6b1c-luar-2";

/** Kelas 6 Bab 1 Sub-Bab C (Bilangan Desimal): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K6B1C: VideoStory = {
  id: "k6b1c-materi",
  judul: "Bilangan Desimal menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 29–44",
  jenis: "materi",
  adegan: [ADEGAN_MENGINGAT, ADEGAN_TIMBANGAN, ADEGAN_SEPERLIMA, ADEGAN_JARAK, ADEGAN_URUT, ADEGAN_NILAI_TEMPAT, ADEGAN_LATIHAN13A, ADEGAN_LATIHAN13B, ADEGAN_UJI, ADEGAN_PENGAYAAN],
};

export const VIDEO_LUAR_K6B1C: VideoStory = {
  id: "k6b1c-luar",
  judul: "Bilangan Desimal: Metode dari Luar",
  subjudul: "Empat metode luar · contoh dari buku Agam dan timbangan buah",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_C_PEMBUKA,
    ADEGAN_LUAR_C_SENILAI,
    ADEGAN_LUAR_C_SENILAI_TERAPAN,
    ADEGAN_LUAR_C_KISI,
    ADEGAN_LUAR_C_KISI_TERAPAN,
    ADEGAN_LUAR_C_TEMPAT,
    ADEGAN_LUAR_C_TEMPAT_TERAPAN,
    ADEGAN_LUAR_C_URUT,
    ADEGAN_LUAR_C_URUT_TERAPAN,
    ADEGAN_LUAR_C_RINGKAS,
  ],
};
