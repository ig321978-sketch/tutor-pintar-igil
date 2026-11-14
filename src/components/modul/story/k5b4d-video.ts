import type { VideoStory } from "./logika-story";
import { ADEGAN_APERSEPSI_D, ADEGAN_PEMBUKA_D, ADEGAN_SARANA_D } from "./k5b4d-materi-1";
import { ADEGAN_ENAM_1, ADEGAN_ENAM_2, ADEGAN_LIMA_1, ADEGAN_LIMA_2 } from "./k5b4d-materi-2";
import { ADEGAN_AKHIR_D, ADEGAN_RANGKUM_D, ADEGAN_TIDAK_SAMA, ADEGAN_UJI_D } from "./k5b4d-materi-3";
import { ADEGAN_LUAR_JUMLAH, ADEGAN_LUAR_JUMLAH_TERAPAN, ADEGAN_LUAR_NGON, ADEGAN_LUAR_NGON_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k5b4d-luar-1";
import { ADEGAN_LUAR_BALIK, ADEGAN_LUAR_BALIK_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TABEL, ADEGAN_LUAR_TABEL_TERAPAN } from "./k5b4d-luar-2";

/** Kelas 5 Bab 4 Sub-Bab D (keliling segi banyak): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B4D: VideoStory = {
  id: "k5b4d-materi",
  judul: "Keliling Segi Banyak menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 122–124 dan Refleksi nomor 13 sampai 15",
  jenis: "materi",
  adegan: [
    ADEGAN_PEMBUKA_D,
    ADEGAN_APERSEPSI_D,
    ADEGAN_SARANA_D,
    ADEGAN_LIMA_1,
    ADEGAN_LIMA_2,
    ADEGAN_ENAM_1,
    ADEGAN_ENAM_2,
    ADEGAN_RANGKUM_D,
    ADEGAN_TIDAK_SAMA,
    ADEGAN_AKHIR_D,
    ADEGAN_UJI_D,
  ],
};

export const VIDEO_LUAR_K5B4D: VideoStory = {
  id: "k5b4d-luar",
  judul: "Keliling Segi Banyak: Metode dari Luar",
  subjudul: "Empat metode luar · segi lima, enam, dan delapan beraturan bersisi 3 sentimeter",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_NGON,
    ADEGAN_LUAR_NGON_TERAPAN,
    ADEGAN_LUAR_JUMLAH,
    ADEGAN_LUAR_JUMLAH_TERAPAN,
    ADEGAN_LUAR_TABEL,
    ADEGAN_LUAR_TABEL_TERAPAN,
    ADEGAN_LUAR_BALIK,
    ADEGAN_LUAR_BALIK_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
