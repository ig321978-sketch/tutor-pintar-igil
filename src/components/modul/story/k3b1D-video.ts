import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_CERITA_KELERENG, ADEGAN_NILAI_TEMPAT, ADEGAN_PERIKSA_BLOK, ADEGAN_SUSUN_PENDEK } from "./k3b1D-materi-1";
import { ADEGAN_SIMPAN_SATUAN, ADEGAN_TANPA_SIMPAN_DUA, ADEGAN_TUKAR_SEPULUH } from "./k3b1D-materi-2";
import { ADEGAN_PANJANG_URAI, ADEGAN_SIMPAN_CONTOH, ADEGAN_SIMPAN_PULUHAN } from "./k3b1D-materi-3";
import { ADEGAN_PANJANG_JUMLAH, ADEGAN_PANJANG_SAMA, ADEGAN_SOAL_CERITA, ADEGAN_TIGA_BILANGAN } from "./k3b1D-materi-4";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP, ADEGAN_PILIH_CARA } from "./k3b1D-materi-5";
import { ADEGAN_LUAR_BERSUSUN, ADEGAN_LUAR_BERSUSUN_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_RINGKAS } from "./k3b1D-luar-1";
import { ADEGAN_LUAR_MAJU, ADEGAN_LUAR_MAJU_TERAPAN, ADEGAN_LUAR_PASANGAN, ADEGAN_LUAR_PASANGAN_TERAPAN } from "./k3b1D-luar-2";

/** Kelas 3 Bab 1 Sub-Bab D (Penjumlahan sampai 100): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K3B1D: VideoStory = {
  id: "k3b1D-materi",
  judul: "Penjumlahan sampai Seratus",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "penjumlahan sampai seratus", daftar: ["Susun pendek", "Susun panjang", "Soal cerita penjumlahan"] }),
    ADEGAN_CERITA_KELERENG,
    ADEGAN_NILAI_TEMPAT,
    ADEGAN_SUSUN_PENDEK,
    ADEGAN_PERIKSA_BLOK,
    ADEGAN_TANPA_SIMPAN_DUA,
    ADEGAN_TUKAR_SEPULUH,
    ADEGAN_SIMPAN_SATUAN,
    ADEGAN_SIMPAN_PULUHAN,
    ADEGAN_SIMPAN_CONTOH,
    ADEGAN_PANJANG_URAI,
    ADEGAN_PANJANG_JUMLAH,
    ADEGAN_PANJANG_SAMA,
    ADEGAN_TIGA_BILANGAN,
    ADEGAN_SOAL_CERITA,
    ADEGAN_PILIH_CARA,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K3B1D: VideoStory = {
  id: "k3b1D-luar",
  judul: "Penjumlahan sampai Seratus: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "penjumlahan sampai seratus" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BERSUSUN,
    ADEGAN_LUAR_BERSUSUN_TERAPAN,
    ADEGAN_LUAR_PASANGAN,
    ADEGAN_LUAR_PASANGAN_TERAPAN,
    ADEGAN_LUAR_MAJU,
    ADEGAN_LUAR_MAJU_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
