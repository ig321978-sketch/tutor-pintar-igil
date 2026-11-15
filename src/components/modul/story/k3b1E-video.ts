import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_APEL, ADEGAN_BALOK, ADEGAN_CERITA_JERUK, ADEGAN_SUSUN_PENDEK } from "./k3b1E-materi-1";
import { ADEGAN_AMBIL_PULUHAN, ADEGAN_ATURAN, ADEGAN_KELERENG, ADEGAN_SATUAN_KURANG } from "./k3b1E-materi-2";
import { ADEGAN_HITUNG_PANJANG, ADEGAN_NOL, ADEGAN_PERIKSA, ADEGAN_PILIH_CARA, ADEGAN_URAI } from "./k3b1E-materi-3";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP } from "./k3b1E-materi-4";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SUSUN, ADEGAN_LUAR_SUSUN_TERAPAN } from "./k3b1E-luar-1";
import { ADEGAN_LUAR_NAIK, ADEGAN_LUAR_NAIK_TERAPAN, ADEGAN_LUAR_PINJAM, ADEGAN_LUAR_PINJAM_TERAPAN } from "./k3b1E-luar-2";

/** Kelas 3 Bab 1 Sub-Bab E (Pengurangan sampai 100): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K3B1E: VideoStory = {
  id: "k3b1E-materi",
  judul: "Pengurangan sampai Seratus",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "pengurangan sampai seratus", daftar: ["Pengurangan susun pendek", "Mengambil satu puluhan", "Pengurangan susun panjang"] }),
    ADEGAN_CERITA_JERUK,
    ADEGAN_BALOK,
    ADEGAN_SUSUN_PENDEK,
    ADEGAN_APEL,
    ADEGAN_KELERENG,
    ADEGAN_SATUAN_KURANG,
    ADEGAN_AMBIL_PULUHAN,
    ADEGAN_ATURAN,
    ADEGAN_URAI,
    ADEGAN_HITUNG_PANJANG,
    ADEGAN_PERIKSA,
    ADEGAN_NOL,
    ADEGAN_PILIH_CARA,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K3B1E: VideoStory = {
  id: "k3b1E-luar",
  judul: "Pengurangan sampai Seratus: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "pengurangan sampai seratus" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_SUSUN,
    ADEGAN_LUAR_SUSUN_TERAPAN,
    ADEGAN_LUAR_NAIK,
    ADEGAN_LUAR_NAIK_TERAPAN,
    ADEGAN_LUAR_PINJAM,
    ADEGAN_LUAR_PINJAM_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
