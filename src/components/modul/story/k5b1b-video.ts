import type { VideoStory } from "./logika-story";
import { ADEGAN_BERMAIN, ADEGAN_MASALAH, ADEGAN_PEMBUKA, ADEGAN_PERSIAPAN } from "./k5b1b-materi-1";
import { ADEGAN_KRITIS, ADEGAN_PERCAKAPAN, ADEGAN_TABEL, ADEGAN_URUT } from "./k5b1b-materi-2";
import { ADEGAN_BARISAN, ADEGAN_BERLATIH, ADEGAN_PELAKSANAAN, ADEGAN_PENUTUP } from "./k5b1b-materi-3";
import { ADEGAN_LUAR_GARIS, ADEGAN_LUAR_GARIS_TERAPAN, ADEGAN_LUAR_KIRI, ADEGAN_LUAR_KIRI_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k5b1b-luar-1";
import { ADEGAN_LUAR_ACUAN, ADEGAN_LUAR_ACUAN_TERAPAN, ADEGAN_LUAR_BULAT, ADEGAN_LUAR_BULAT_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b1b-luar-2";

/** Kelas 5 Bab 1 Sub-Bab B (membandingkan dan mengurutkan bilangan cacah sampai 100.000): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B1B: VideoStory = {
  id: "k5b1b-materi",
  judul: "Membandingkan dan Mengurutkan Bilangan Cacah menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 10–15 dan Refleksi nomor 4, 5",
  jenis: "materi",
  adegan: [
    ADEGAN_PEMBUKA,
    ADEGAN_PERSIAPAN,
    ADEGAN_MASALAH,
    ADEGAN_BERMAIN,
    ADEGAN_TABEL,
    ADEGAN_PERCAKAPAN,
    ADEGAN_URUT,
    ADEGAN_KRITIS,
    ADEGAN_PELAKSANAAN,
    ADEGAN_BERLATIH,
    ADEGAN_BARISAN,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K5B1B: VideoStory = {
  id: "k5b1b-luar",
  judul: "Membandingkan dan Mengurutkan Bilangan Cacah: Metode dari Luar",
  subjudul: "Empat metode luar · harga papan dakon dan latihan buku",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_KIRI,
    ADEGAN_LUAR_KIRI_TERAPAN,
    ADEGAN_LUAR_GARIS,
    ADEGAN_LUAR_GARIS_TERAPAN,
    ADEGAN_LUAR_ACUAN,
    ADEGAN_LUAR_ACUAN_TERAPAN,
    ADEGAN_LUAR_BULAT,
    ADEGAN_LUAR_BULAT_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
