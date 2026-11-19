import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_LIPAT, ADEGAN_SUDUT, ADEGAN_TALI } from "./k3b4B-materi-1";
import { ADEGAN_IRISAN, ADEGAN_LANCIP_TUMPUL, ADEGAN_SALAH_SKALA } from "./k3b4B-materi-2";
import { ADEGAN_BACA_BENAR, ADEGAN_PENUTUP, ADEGAN_REFLEKS } from "./k3b4B-materi-3";
import { ADEGAN_LUAR_LIPAT, ADEGAN_LUAR_LIPAT_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k3b4B-luar-1";
import { ADEGAN_LUAR_ACUAN, ADEGAN_LUAR_ACUAN_TERAPAN, ADEGAN_LUAR_BUSUR, ADEGAN_LUAR_BUSUR_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k3b4B-luar-2";

/**
 * Kelas 3 Bab 4 Sub-Bab B (sudut pada bidang datar), tengah cerita Festival Layang-layang Kampung.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Sudut Kak Anton" (Raka, Salsa, Bima, Pak Joko, Kak Anton).
 * Video kedua: tiga metode global (Paper Folding, Benchmark Angles, Protractor Walk), terpisah.
 */
export const JUDUL_K3B4B = "Sudut Kak Anton";

export const VIDEO_MATERI_K3B4B: VideoStory = {
  id: "k3b4B-materi",
  judul: JUDUL_K3B4B,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "sudut dan cara mengukurnya", daftar: ["Sudut siku-siku dari kertas lipat", "Sudut lancip dan tumpul", "Busur derajat"] }),
    ADEGAN_TALI,
    ADEGAN_SUDUT,
    ADEGAN_LIPAT,
    ADEGAN_LANCIP_TUMPUL,
    ADEGAN_IRISAN,
    ADEGAN_SALAH_SKALA,
    ADEGAN_BACA_BENAR,
    ADEGAN_REFLEKS,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K3B4B: VideoStory = {
  id: "k3b4B-luar",
  judul: JUDUL_K3B4B,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "sudut dan cara mengukurnya", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_LIPAT,
    ADEGAN_LUAR_LIPAT_TERAPAN,
    ADEGAN_LUAR_ACUAN,
    ADEGAN_LUAR_ACUAN_TERAPAN,
    ADEGAN_LUAR_BUSUR,
    ADEGAN_LUAR_BUSUR_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
