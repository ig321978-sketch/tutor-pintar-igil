import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_DIGITAL, ADEGAN_GRAM_KG, ADEGAN_GUDANG_PAKAN, ADEGAN_TIMBANGAN } from "./k3b3C-materi-1";
import { ADEGAN_MULAI_NOL, ADEGAN_SALAH_NOL, ADEGAN_SELISIH } from "./k3b3C-materi-2";
import { ADEGAN_PENUTUP, ADEGAN_PILIH_TIMBANGAN } from "./k3b3C-materi-3";
import { ADEGAN_LUAR_ANGKAT, ADEGAN_LUAR_ANGKAT_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k3b3C-luar-1";
import { ADEGAN_LUAR_ACUAN, ADEGAN_LUAR_ACUAN_TERAPAN, ADEGAN_LUAR_CEK_NOL, ADEGAN_LUAR_CEK_NOL_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k3b3C-luar-2";

/**
 * Kelas 3 Bab 3 Sub-Bab C (mengukur berat dengan satuan baku), cerita Kebun Binatang Mini.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Pakan Bu Lastri" (Raka, Salsa, Bima, Pak Joko, Bu Lastri).
 * Video kedua: tiga metode global (Hefting, Benchmark Weights, Zero Check), terpisah.
 */
export const JUDUL_K3B3C = "Pakan Bu Lastri";

export const VIDEO_MATERI_K3B3C: VideoStory = {
  id: "k3b3C-materi",
  judul: JUDUL_K3B3C,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "mengukur berat dengan satuan baku", daftar: ["Gram dan kilogram", "Menimbang dari angka nol", "Memilih timbangan yang tepat"] }),
    ADEGAN_GUDANG_PAKAN,
    ADEGAN_TIMBANGAN,
    ADEGAN_GRAM_KG,
    ADEGAN_DIGITAL,
    ADEGAN_SALAH_NOL,
    ADEGAN_MULAI_NOL,
    ADEGAN_SELISIH,
    ADEGAN_PILIH_TIMBANGAN,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K3B3C: VideoStory = {
  id: "k3b3C-luar",
  judul: JUDUL_K3B3C,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "mengukur berat dengan satuan baku", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_ANGKAT,
    ADEGAN_LUAR_ANGKAT_TERAPAN,
    ADEGAN_LUAR_ACUAN,
    ADEGAN_LUAR_ACUAN_TERAPAN,
    ADEGAN_LUAR_CEK_NOL,
    ADEGAN_LUAR_CEK_NOL_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
