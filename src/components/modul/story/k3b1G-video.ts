import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BAGI_JERUK, ADEGAN_CERITA_BISKUIT, ADEGAN_SAMA_BANYAK } from "./k3b1G-materi-1";
import { ADEGAN_GARIS_MUNDUR, ADEGAN_KURANG_DUA_BELAS, ADEGAN_KURANG_LIMA_BELAS } from "./k3b1G-materi-2";
import { ADEGAN_CONTOH_DUA_DELAPAN, ADEGAN_KALI_DAN_BAGI, ADEGAN_NAMA_BILANGAN, ADEGAN_TITIK_KALI_BAGI } from "./k3b1G-materi-3";
import { ADEGAN_DIBAGI_SAMA, ADEGAN_DIBAGI_SATU, ADEGAN_SOAL_CERITA } from "./k3b1G-materi-4";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP } from "./k3b1G-materi-5";
import { ADEGAN_LUAR_BAGI, ADEGAN_LUAR_BAGI_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_RINGKAS } from "./k3b1G-luar-1";
import { ADEGAN_LUAR_FAKTA, ADEGAN_LUAR_FAKTA_TERAPAN, ADEGAN_LUAR_KURANG, ADEGAN_LUAR_KURANG_TERAPAN } from "./k3b1G-luar-2";

/** Kelas 3 Bab 1 Sub-Bab G (Pembagian Bilangan Cacah sampai 100): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K3B1G: VideoStory = {
  id: "k3b1G-materi",
  judul: "Pembagian sampai Seratus",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "pembagian sampai seratus", daftar: ["Membagi sama banyak", "Mengurangi berulang", "Hubungan kali dan bagi"] }),
    ADEGAN_CERITA_BISKUIT,
    ADEGAN_BAGI_JERUK,
    ADEGAN_SAMA_BANYAK,
    ADEGAN_KURANG_DUA_BELAS,
    ADEGAN_GARIS_MUNDUR,
    ADEGAN_KURANG_LIMA_BELAS,
    ADEGAN_NAMA_BILANGAN,
    ADEGAN_TITIK_KALI_BAGI,
    ADEGAN_KALI_DAN_BAGI,
    ADEGAN_CONTOH_DUA_DELAPAN,
    ADEGAN_DIBAGI_SATU,
    ADEGAN_DIBAGI_SAMA,
    ADEGAN_SOAL_CERITA,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K3B1G: VideoStory = {
  id: "k3b1G-luar",
  judul: "Pembagian sampai Seratus: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "pembagian sampai seratus" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BAGI,
    ADEGAN_LUAR_BAGI_TERAPAN,
    ADEGAN_LUAR_KURANG,
    ADEGAN_LUAR_KURANG_TERAPAN,
    ADEGAN_LUAR_FAKTA,
    ADEGAN_LUAR_FAKTA_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
