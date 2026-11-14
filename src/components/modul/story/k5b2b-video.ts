import type { VideoStory } from "./logika-story";
import { ADEGAN_PEMBUKA, ADEGAN_PERSIAPAN, ADEGAN_TEPUK } from "./k5b2b-materi-1";
import { ADEGAN_CARA_KPK, ADEGAN_DEFINISI, ADEGAN_RENANG, ADEGAN_TABEL } from "./k5b2b-materi-2";
import { ADEGAN_BERLATIH, ADEGAN_DISKUSI, ADEGAN_MISKONSEPSI, ADEGAN_PENUTUP } from "./k5b2b-materi-3";
import { ADEGAN_LUAR_DAFTAR, ADEGAN_LUAR_DAFTAR_TERAPAN, ADEGAN_LUAR_IRISAN, ADEGAN_LUAR_IRISAN_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k5b2b-luar-1";
import { ADEGAN_LUAR_PRIMA, ADEGAN_LUAR_PRIMA_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SIKLUS, ADEGAN_LUAR_SIKLUS_TERAPAN } from "./k5b2b-luar-2";

/** Kelas 5 Bab 2 Sub-Bab B (kelipatan persekutuan dan KPK): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B2B: VideoStory = {
  id: "k5b2b-materi",
  judul: "Kelipatan Persekutuan dan KPK menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 38–42 dan Refleksi nomor 2, 3, 7",
  jenis: "materi",
  adegan: [
    ADEGAN_PEMBUKA,
    ADEGAN_PERSIAPAN,
    ADEGAN_TEPUK,
    ADEGAN_TABEL,
    ADEGAN_DEFINISI,
    ADEGAN_CARA_KPK,
    ADEGAN_RENANG,
    ADEGAN_DISKUSI,
    ADEGAN_BERLATIH,
    ADEGAN_MISKONSEPSI,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K5B2B: VideoStory = {
  id: "k5b2b-luar",
  judul: "Kelipatan Persekutuan dan KPK: Metode dari Luar",
  subjudul: "Empat metode luar · angka dari tepuk bilangan, jadwal renang, dan latihan buku",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_DAFTAR,
    ADEGAN_LUAR_DAFTAR_TERAPAN,
    ADEGAN_LUAR_IRISAN,
    ADEGAN_LUAR_IRISAN_TERAPAN,
    ADEGAN_LUAR_PRIMA,
    ADEGAN_LUAR_PRIMA_TERAPAN,
    ADEGAN_LUAR_SIKLUS,
    ADEGAN_LUAR_SIKLUS_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
