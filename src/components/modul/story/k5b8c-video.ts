import type { VideoStory } from "./logika-story";
import { ADEGAN_PEMBUKA_C, ADEGAN_SKALA_83A, ADEGAN_VERTIKAL_83B } from "./k5b8c-materi-1";
import { ADEGAN_GANDA_83D, ADEGAN_HORIZONTAL_83C, ADEGAN_LELE, ADEGAN_SEAGAMES_TANYA } from "./k5b8c-materi-2";
import { ADEGAN_GABUNG_83E, ADEGAN_LATIHAN_DATA, ADEGAN_UJI_12, ADEGAN_UJI_3 } from "./k5b8c-materi-3";
import { ADEGAN_LUAR_ASC, ADEGAN_LUAR_ASC_TERAPAN, ADEGAN_LUAR_BCRP, ADEGAN_LUAR_BCRP_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k5b8c-luar-1";
import { ADEGAN_LUAR_CBA, ADEGAN_LUAR_CBA_TERAPAN, ADEGAN_LUAR_DBMT, ADEGAN_LUAR_DBMT_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b8c-luar-2";

/** Kelas 5 Bab 8 Sub-Bab C (Diagram Batang): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B8C: VideoStory = {
  id: "k5b8c-materi",
  judul: "Diagram Batang menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 252–272",
  jenis: "materi",
  adegan: [
    ADEGAN_PEMBUKA_C,
    ADEGAN_SKALA_83A,
    ADEGAN_VERTIKAL_83B,
    ADEGAN_SEAGAMES_TANYA,
    ADEGAN_HORIZONTAL_83C,
    ADEGAN_LELE,
    ADEGAN_GANDA_83D,
    ADEGAN_GABUNG_83E,
    ADEGAN_LATIHAN_DATA,
    ADEGAN_UJI_12,
    ADEGAN_UJI_3,
  ],
};

export const VIDEO_LUAR_K5B8C: VideoStory = {
  id: "k5b8c-luar",
  judul: "Diagram Batang: Metode dari Luar",
  subjudul: "Empat metode luar · contoh dari kalori makanan, siswa, perpustakaan, dan nilai ulangan",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BCRP,
    ADEGAN_LUAR_BCRP_TERAPAN,
    ADEGAN_LUAR_ASC,
    ADEGAN_LUAR_ASC_TERAPAN,
    ADEGAN_LUAR_CBA,
    ADEGAN_LUAR_CBA_TERAPAN,
    ADEGAN_LUAR_DBMT,
    ADEGAN_LUAR_DBMT_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
