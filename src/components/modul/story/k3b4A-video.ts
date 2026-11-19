import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_LAPANGAN, ADEGAN_SINAR_GARIS, ADEGAN_TITIK_RUAS } from "./k3b4A-materi-1";
import { ADEGAN_KURVA, ADEGAN_SALAH_MILIMETER, ADEGAN_UKUR_NOL } from "./k3b4A-materi-2";
import { ADEGAN_HITUNG_SISI, ADEGAN_PENUTUP, ADEGAN_SISI } from "./k3b4A-materi-3";
import { ADEGAN_LUAR_BEDA, ADEGAN_LUAR_BEDA_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k3b4A-luar-1";
import { ADEGAN_LUAR_HURUF, ADEGAN_LUAR_HURUF_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_UKUR, ADEGAN_LUAR_UKUR_TERAPAN } from "./k3b4A-luar-2";

/**
 * Kelas 3 Bab 4 Sub-Bab A (ruas garis dan sisi bangun datar), awal cerita Festival Layang-layang Kampung.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Rangka Layang-layang Bu Ratih" (Raka, Salsa, Bima, Pak Joko, Bu Ratih).
 * Video kedua: tiga metode global (Odd One Out, Measure Twice, Label and Name), terpisah.
 */
export const JUDUL_K3B4A = "Rangka Layang-layang Bu Ratih";

export const VIDEO_MATERI_K3B4A: VideoStory = {
  id: "k3b4A-materi",
  judul: JUDUL_K3B4A,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "ruas garis dan sisi bangun datar", daftar: ["Sinar garis, garis, dan ruas garis", "Sentimeter dan milimeter", "Sisi bangun datar"] }),
    ADEGAN_LAPANGAN,
    ADEGAN_TITIK_RUAS,
    ADEGAN_SINAR_GARIS,
    ADEGAN_KURVA,
    ADEGAN_SALAH_MILIMETER,
    ADEGAN_UKUR_NOL,
    ADEGAN_SISI,
    ADEGAN_HITUNG_SISI,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K3B4A: VideoStory = {
  id: "k3b4A-luar",
  judul: JUDUL_K3B4A,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "ruas garis dan sisi bangun datar", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BEDA,
    ADEGAN_LUAR_BEDA_TERAPAN,
    ADEGAN_LUAR_UKUR,
    ADEGAN_LUAR_UKUR_TERAPAN,
    ADEGAN_LUAR_HURUF,
    ADEGAN_LUAR_HURUF_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
