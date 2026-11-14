import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_MENYIMAK } from "./k5b1a-materi-1";
import { ADEGAN_JUS, ADEGAN_KAYU, ADEGAN_OBAT, ADEGAN_YOHANA } from "./k5b1a-materi-2";
import { ADEGAN_BERLATIH_1, ADEGAN_BERLATIH_2, ADEGAN_PENUTUP } from "./k5b1a-materi-3";
import { ADEGAN_LUAR_DIENES, ADEGAN_LUAR_DIENES_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_PV, ADEGAN_LUAR_PV_TERAPAN } from "./k5b1a-luar-1";
import { ADEGAN_LUAR_BACA, ADEGAN_LUAR_BACA_TERAPAN, ADEGAN_LUAR_PERIODE, ADEGAN_LUAR_PERIODE_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b1a-luar-2";

/** Kelas 5 Bab 1 Sub-Bab A (membaca dan menulis bilangan cacah sampai 100.000 dan nilai tempatnya), termasuk pembuka bab: video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B1A: VideoStory = {
  id: "k5b1a-materi",
  judul: "Membaca dan Menulis Bilangan Cacah",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "membaca dan menulis bilangan besar", daftar: ["Membaca bilangan besar","Menulis bilangan besar","Nilai tempat tiap angka"] }),
    ADEGAN_MENYIMAK,
    ADEGAN_JUS,
    ADEGAN_YOHANA,
    ADEGAN_OBAT,
    ADEGAN_KAYU,
    ADEGAN_BERLATIH_1,
    ADEGAN_BERLATIH_2,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K5B1A: VideoStory = {
  id: "k5b1a-luar",
  judul: "Membaca dan Menulis Bilangan Cacah: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "membaca dan menulis bilangan besar" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_PV,
    ADEGAN_LUAR_PV_TERAPAN,
    ADEGAN_LUAR_DIENES,
    ADEGAN_LUAR_DIENES_TERAPAN,
    ADEGAN_LUAR_BACA,
    ADEGAN_LUAR_BACA_TERAPAN,
    ADEGAN_LUAR_PERIODE,
    ADEGAN_LUAR_PERIODE_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
