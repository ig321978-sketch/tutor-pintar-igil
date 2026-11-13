import type { VideoStory } from "./logika-story";
import { ADEGAN_KONTAINER, ADEGAN_PEMBUKA, ADEGAN_TUJUAN } from "./k6b3a-materi-1";
import { ADEGAN_BALOK, ADEGAN_EKSPLORASI31 } from "./k6b3a-materi-2";
import { ADEGAN_LATIHAN31, ADEGAN_PAK_HASAN } from "./k6b3a-materi-3";
import { ADEGAN_LUAR_A_LAPIS, ADEGAN_LUAR_A_LAPIS_TERAPAN, ADEGAN_LUAR_A_PEMBUKA } from "./k6b3a-luar-1";
import { ADEGAN_LUAR_A_JEJAK, ADEGAN_LUAR_A_JEJAK_TERAPAN, ADEGAN_LUAR_A_PUTAR, ADEGAN_LUAR_A_RINGKAS, ADEGAN_LUAR_A_SANGGA } from "./k6b3a-luar-2";

/** Kelas 6 Bab 3 Sub-Bab A (Mengonstruksi dan Mengurai), termasuk pembuka bab: video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K6B3A: VideoStory = {
  id: "k6b3a-materi",
  judul: "Mengonstruksi dan Mengurai menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 76–85",
  jenis: "materi",
  adegan: [ADEGAN_PEMBUKA, ADEGAN_TUJUAN, ADEGAN_KONTAINER, ADEGAN_EKSPLORASI31, ADEGAN_BALOK, ADEGAN_LATIHAN31, ADEGAN_PAK_HASAN],
};

export const VIDEO_LUAR_K6B3A: VideoStory = {
  id: "k6b3a-luar",
  judul: "Mengonstruksi dan Mengurai: Metode dari Luar",
  subjudul: "Empat metode luar · contoh dari buku Tigor dan Tenri",
  jenis: "metode-luar",
  adegan: [ADEGAN_LUAR_A_PEMBUKA, ADEGAN_LUAR_A_LAPIS, ADEGAN_LUAR_A_LAPIS_TERAPAN, ADEGAN_LUAR_A_SANGGA, ADEGAN_LUAR_A_PUTAR, ADEGAN_LUAR_A_JEJAK, ADEGAN_LUAR_A_JEJAK_TERAPAN, ADEGAN_LUAR_A_RINGKAS],
};
