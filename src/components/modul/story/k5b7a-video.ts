import type { VideoStory } from "./logika-story";
import { ADEGAN_DENAH_PETA, ADEGAN_PEMBUKA, ADEGAN_SEDOTAN } from "./k5b7a-materi-1";
import { ADEGAN_LANCIP, ADEGAN_SIKU_TUMPUL, ADEGAN_SYARAT } from "./k5b7a-materi-2";
import { ADEGAN_BANDING, ADEGAN_JUMLAH, ADEGAN_SAMA_KAKI, ADEGAN_SAMA_SISI, ADEGAN_UJI } from "./k5b7a-materi-3";
import { ADEGAN_LUAR_JUMLAH, ADEGAN_LUAR_JUMLAH_TERAPAN, ADEGAN_LUAR_KETAKSAMAAN, ADEGAN_LUAR_KETAKSAMAAN_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k5b7a-luar-1";
import { ADEGAN_LUAR_HIERARKI, ADEGAN_LUAR_HIERARKI_TERAPAN, ADEGAN_LUAR_KLASIFIKASI, ADEGAN_LUAR_KLASIFIKASI_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b7a-luar-2";

/** Kelas 5 Bab 7 Sub-Bab A (ciri-ciri segitiga), termasuk pembuka bab: video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B7A: VideoStory = {
  id: "k5b7a-materi",
  judul: "Membandingkan Ciri-Ciri Segitiga menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 191–208 dan Uji Kompetensi 1–4",
  jenis: "materi",
  adegan: [ADEGAN_PEMBUKA, ADEGAN_DENAH_PETA, ADEGAN_SEDOTAN, ADEGAN_SYARAT, ADEGAN_LANCIP, ADEGAN_SIKU_TUMPUL, ADEGAN_JUMLAH, ADEGAN_SAMA_KAKI, ADEGAN_SAMA_SISI, ADEGAN_BANDING, ADEGAN_UJI],
};

export const VIDEO_LUAR_K5B7A: VideoStory = {
  id: "k5b7a-luar",
  judul: "Ciri-Ciri Segitiga: Metode dari Luar",
  subjudul: "Empat metode luar · contoh dari sedotan, sudut siku-siku sama kaki, dan segitiga sama sisi",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_KETAKSAMAAN,
    ADEGAN_LUAR_KETAKSAMAAN_TERAPAN,
    ADEGAN_LUAR_JUMLAH,
    ADEGAN_LUAR_JUMLAH_TERAPAN,
    ADEGAN_LUAR_KLASIFIKASI,
    ADEGAN_LUAR_KLASIFIKASI_TERAPAN,
    ADEGAN_LUAR_HIERARKI,
    ADEGAN_LUAR_HIERARKI_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
