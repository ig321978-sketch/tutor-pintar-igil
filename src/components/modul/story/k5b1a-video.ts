import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_STADION, ADEGAN_TEMPAT, ADEGAN_TULIS_BACA } from "./k5b1a-materi-1";
import { ADEGAN_PERIKSA_NOL, ADEGAN_PERIODE, ADEGAN_SALAH_TULIS } from "./k5b1a-materi-2";
import { ADEGAN_PENUTUP, ADEGAN_SERATUS_RIBU, ADEGAN_URAIAN } from "./k5b1a-materi-3";
import { ADEGAN_LUAR_ISI, ADEGAN_LUAR_ISI_TERAPAN, ADEGAN_LUAR_NOL, ADEGAN_LUAR_NOL_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k5b1a-luar-1";
import { ADEGAN_LUAR_PERIODE, ADEGAN_LUAR_PERIODE_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b1a-luar-2";

/**
 * Kelas 5 Bab 1 Sub-Bab A (membaca dan menulis bilangan cacah sampai 100.000), awal cerita Hari Pertandingan di Stadion Kota.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Tiket Tribun Bu Ningsih" (Bima, Citra, Fajar, Pak Arif, Bu Ningsih, Pak Hasto).
 * Video kedua: tiga metode global (Fill the Slots, Guard the Zero, Read by Period), terpisah.
 */
export const JUDUL_K5B1A = "Tiket Tribun Bu Ningsih";

export const VIDEO_MATERI_K5B1A: VideoStory = {
  id: "k5b1a-materi",
  judul: JUDUL_K5B1A,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "bilangan besar", daftar: ["Tabel tempat", "Nol penjaga", "Periode"] }),
    ADEGAN_STADION,
    ADEGAN_TEMPAT,
    ADEGAN_TULIS_BACA,
    ADEGAN_SALAH_TULIS,
    ADEGAN_PERIKSA_NOL,
    ADEGAN_PERIODE,
    ADEGAN_URAIAN,
    ADEGAN_SERATUS_RIBU,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K5B1A: VideoStory = {
  id: "k5b1a-luar",
  judul: JUDUL_K5B1A,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "bilangan besar", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_ISI,
    ADEGAN_LUAR_ISI_TERAPAN,
    ADEGAN_LUAR_NOL,
    ADEGAN_LUAR_NOL_TERAPAN,
    ADEGAN_LUAR_PERIODE,
    ADEGAN_LUAR_PERIODE_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
