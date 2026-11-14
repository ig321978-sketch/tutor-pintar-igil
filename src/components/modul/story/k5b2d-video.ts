import type { VideoStory } from "./logika-story";
import { ADEGAN_ATURAN, ADEGAN_MENYIMAK, ADEGAN_PEMBUKA, ADEGAN_PERSIAPAN } from "./k5b2d-materi-1";
import { ADEGAN_EKS_A_AB, ADEGAN_EKS_A_C, ADEGAN_EKS_B_MASALAH, ADEGAN_FAKTOR_PERSEKUTUAN } from "./k5b2d-materi-2";
import { ADEGAN_BERLATIH_1, ADEGAN_BERLATIH_2, ADEGAN_EKS_B_HASIL, ADEGAN_PENUTUP } from "./k5b2d-materi-3";
import { ADEGAN_LUAR_DAFTAR, ADEGAN_LUAR_DAFTAR_TERAPAN, ADEGAN_LUAR_GCF, ADEGAN_LUAR_GCF_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k5b2d-luar-1";
import { ADEGAN_LUAR_EUCLID, ADEGAN_LUAR_EUCLID_TERAPAN, ADEGAN_LUAR_PAKET, ADEGAN_LUAR_PAKET_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b2d-luar-2";

/** Kelas 5 Bab 2 Sub-Bab D (faktor persekutuan dan FPB): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B2D: VideoStory = {
  id: "k5b2d-materi",
  judul: "Faktor Persekutuan dan FPB menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 46–53 dan Refleksi nomor 5, 6, 7",
  jenis: "materi",
  adegan: [
    ADEGAN_PEMBUKA,
    ADEGAN_PERSIAPAN,
    ADEGAN_MENYIMAK,
    ADEGAN_ATURAN,
    ADEGAN_FAKTOR_PERSEKUTUAN,
    ADEGAN_EKS_A_AB,
    ADEGAN_EKS_A_C,
    ADEGAN_EKS_B_MASALAH,
    ADEGAN_EKS_B_HASIL,
    ADEGAN_BERLATIH_1,
    ADEGAN_BERLATIH_2,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K5B2D: VideoStory = {
  id: "k5b2d-luar",
  judul: "Faktor Persekutuan dan FPB: Metode dari Luar",
  subjudul: "Empat metode luar · faktor dua belas dan delapan belas, mawar Nisa, dan paket Dania",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_DAFTAR,
    ADEGAN_LUAR_DAFTAR_TERAPAN,
    ADEGAN_LUAR_GCF,
    ADEGAN_LUAR_GCF_TERAPAN,
    ADEGAN_LUAR_EUCLID,
    ADEGAN_LUAR_EUCLID_TERAPAN,
    ADEGAN_LUAR_PAKET,
    ADEGAN_LUAR_PAKET_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
