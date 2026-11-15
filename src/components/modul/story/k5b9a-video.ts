import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BERMAIN, ADEGAN_CARA_BACA, ADEGAN_EKSPLORASI91A, ADEGAN_EKSPLORASI91B } from "./k5b9a-materi-2";
import { ADEGAN_EKSPLORASI91C, ADEGAN_EKSPLORASI91D, ADEGAN_LATIHAN, ADEGAN_REFLEKSI } from "./k5b9a-materi-3";
import { ADEGAN_LUAR_NAMA, ADEGAN_LUAR_NAMA_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_TABEL, ADEGAN_LUAR_TABEL_TERAPAN } from "./k5b9a-luar-1";
import { ADEGAN_LUAR_KELOMPOK, ADEGAN_LUAR_KELOMPOK_TERAPAN, ADEGAN_LUAR_NILAI, ADEGAN_LUAR_NILAI_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b9a-luar-2";

/**
 * Kelas 5 Bab 9 Sub-Bab A (membaca, menulis, dan nilai tempat): video materi kurikulum dan video metode luar, dua video terpisah.
 * Adegan administratif (pembuka bab dengan data sensus, tujuan dan peta konsep, serta apersepsi) tetap ada di berkas materi, tetapi tidak diputar.
 */
export const VIDEO_MATERI_K5B9A: VideoStory = {
  id: "k5b9a-materi",
  judul: "Membaca, Menulis, dan Nilai Tempat",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "membaca dan menulis bilangan besar", daftar: ["Membaca bilangan besar", "Menulis dengan titik", "Nilai tempat tiap angka"] }),
    ADEGAN_EKSPLORASI91A,
    ADEGAN_EKSPLORASI91B,
    ADEGAN_CARA_BACA,
    ADEGAN_BERMAIN,
    ADEGAN_EKSPLORASI91C,
    ADEGAN_EKSPLORASI91D,
    ADEGAN_LATIHAN,
    ADEGAN_REFLEKSI,
  ],
};

export const VIDEO_LUAR_K5B9A: VideoStory = {
  id: "k5b9a-luar",
  judul: "Bilangan sampai Satu Juta: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "membaca dan menulis bilangan besar" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_TABEL,
    ADEGAN_LUAR_TABEL_TERAPAN,
    ADEGAN_LUAR_NAMA,
    ADEGAN_LUAR_NAMA_TERAPAN,
    ADEGAN_LUAR_NILAI,
    ADEGAN_LUAR_NILAI_TERAPAN,
    ADEGAN_LUAR_KELOMPOK,
    ADEGAN_LUAR_KELOMPOK_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
