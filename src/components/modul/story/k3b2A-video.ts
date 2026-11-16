import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_CERITA_BINTANG, ADEGAN_NAMA_KALIMAT, ADEGAN_TITIK } from "./k3b2A-materi-1";
import { ADEGAN_BAGAN, ADEGAN_HALIM_KIRA, ADEGAN_JUMLAH_DIKURANGI, ADEGAN_PERIKSA } from "./k3b2A-materi-2";
import { ADEGAN_CONTOH_36, ADEGAN_CONTOH_8, ADEGAN_CONTOH_23, ADEGAN_CONTOH_DEPAN, ADEGAN_KEMUNGKINAN } from "./k3b2A-materi-3";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA } from "./k3b2A-materi-4";
import { ADEGAN_PENUTUP } from "./k3b2A-materi-5";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TIMBANGAN, ADEGAN_LUAR_TIMBANGAN_TERAPAN } from "./k3b2A-luar-1";
import { ADEGAN_LUAR_BUNGKUS, ADEGAN_LUAR_BUNGKUS_TERAPAN, ADEGAN_LUAR_LONCAT, ADEGAN_LUAR_LONCAT_TERAPAN } from "./k3b2A-luar-2";

/** Kelas 3 Bab 2 Sub-Bab A (Kalimat Matematika Penjumlahan): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K3B2A: VideoStory = {
  id: "k3b2A-materi",
  judul: "Kalimat Matematika Penjumlahan",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "kalimat Matematika penjumlahan", daftar: ["Menulis kalimat dari cerita", "Mengisi titik-titik", "Memeriksa dan kemungkinan"] }),
    ADEGAN_CERITA_BINTANG,
    ADEGAN_TITIK,
    ADEGAN_NAMA_KALIMAT,
    ADEGAN_HALIM_KIRA,
    ADEGAN_BAGAN,
    ADEGAN_JUMLAH_DIKURANGI,
    ADEGAN_PERIKSA,
    ADEGAN_CONTOH_8,
    ADEGAN_CONTOH_23,
    ADEGAN_CONTOH_DEPAN,
    ADEGAN_CONTOH_36,
    ADEGAN_KEMUNGKINAN,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K3B2A: VideoStory = {
  id: "k3b2A-luar",
  judul: "Kalimat Matematika Penjumlahan: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "kalimat Matematika penjumlahan" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_TIMBANGAN,
    ADEGAN_LUAR_TIMBANGAN_TERAPAN,
    ADEGAN_LUAR_LONCAT,
    ADEGAN_LUAR_LONCAT_TERAPAN,
    ADEGAN_LUAR_BUNGKUS,
    ADEGAN_LUAR_BUNGKUS_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
