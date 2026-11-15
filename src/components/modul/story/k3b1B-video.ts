import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BLOK_251, ADEGAN_NILAI_251, ADEGAN_TIGA_TEMPAT } from "./k3b1B-materi-1";
import { ADEGAN_ANGKA_SAMA, ADEGAN_KARTU_KOTAK, ADEGAN_PERAN_NOL, ADEGAN_TEMPAT_ANGKA } from "./k3b1B-materi-2";
import { ADEGAN_SUSUN, ADEGAN_SUSUN_LAIN, ADEGAN_TABEL_ANGKA, ADEGAN_URAI, ADEGAN_URAI_LAIN } from "./k3b1B-materi-3";
import { ADEGAN_CARA_LANGKAH, ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP } from "./k3b1B-materi-4";
import { ADEGAN_LUAR_NILAI, ADEGAN_LUAR_NILAI_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k3b1B-luar-1";
import { ADEGAN_LUAR_KARTU, ADEGAN_LUAR_KARTU_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_URAIAN, ADEGAN_LUAR_URAIAN_TERAPAN } from "./k3b1B-luar-2";

/** Kelas 3 Bab 1 Sub-Bab B (Nilai Tempat): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K3B1B: VideoStory = {
  id: "k3b1B-materi",
  judul: "Nilai Tempat",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "nilai tempat", daftar: ["Tempat dan nilai angka", "Menyusun bilangan", "Mengurai bilangan"] }),
    ADEGAN_TIGA_TEMPAT,
    ADEGAN_NILAI_251,
    ADEGAN_BLOK_251,
    ADEGAN_ANGKA_SAMA,
    ADEGAN_TEMPAT_ANGKA,
    ADEGAN_PERAN_NOL,
    ADEGAN_KARTU_KOTAK,
    ADEGAN_SUSUN,
    ADEGAN_SUSUN_LAIN,
    ADEGAN_URAI,
    ADEGAN_URAI_LAIN,
    ADEGAN_TABEL_ANGKA,
    ADEGAN_CARA_LANGKAH,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K3B1B: VideoStory = {
  id: "k3b1B-luar",
  judul: "Nilai Tempat: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "nilai tempat" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_NILAI,
    ADEGAN_LUAR_NILAI_TERAPAN,
    ADEGAN_LUAR_KARTU,
    ADEGAN_LUAR_KARTU_TERAPAN,
    ADEGAN_LUAR_URAIAN,
    ADEGAN_LUAR_URAIAN_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
