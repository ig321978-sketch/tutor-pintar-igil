import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_CERITA_SKOR, ADEGAN_KARTU_ANGKA, ADEGAN_TABEL_TEMPAT } from "./k4b1a-materi-1";
import { ADEGAN_CARA_BACA, ADEGAN_MENULIS, ADEGAN_NOL_MEMBACA, ADEGAN_NOL_MENULIS } from "./k4b1a-materi-2";
import { ADEGAN_SEPULUH_RIBU, ADEGAN_SERIBU_BELAS } from "./k4b1a-materi-3";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_EMPAT, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP } from "./k4b1a-materi-4";
import { ADEGAN_LUAR_BALOK, ADEGAN_LUAR_BALOK_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k4b1a-luar-1";
import { ADEGAN_LUAR_NOL, ADEGAN_LUAR_NOL_TERAPAN, ADEGAN_LUAR_PAPAN, ADEGAN_LUAR_PAPAN_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k4b1a-luar-2";

/** Kelas 4 Bab 1 Sub-Bab A (Membaca dan Menulis Bilangan Cacah sampai 10.000): video materi kurikulum dan video metode luar, dua video terpisah. Rujukan topik: Matematika untuk SD/MI Kelas IV, Bab 1 Sub-Bab A. Konten orisinal IGIL (draf sampai disetujui pemilik). */
export const VIDEO_MATERI_K4B1A: VideoStory = {
  id: "k4b1a-materi",
  judul: "Membaca dan Menulis Bilangan Cacah",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "membaca dan menulis bilangan cacah", daftar: ["Kartu angka dan tabel", "Membaca dan menulis", "Angka nol dalam bilangan"] }),
    ADEGAN_CERITA_SKOR,
    ADEGAN_KARTU_ANGKA,
    ADEGAN_TABEL_TEMPAT,
    ADEGAN_CARA_BACA,
    ADEGAN_MENULIS,
    ADEGAN_NOL_MEMBACA,
    ADEGAN_NOL_MENULIS,
    ADEGAN_SERIBU_BELAS,
    ADEGAN_SEPULUH_RIBU,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_LATIHAN_EMPAT,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K4B1A: VideoStory = {
  id: "k4b1a-luar",
  judul: "Membaca dan Menulis Bilangan Cacah: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "membaca dan menulis bilangan cacah" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BALOK,
    ADEGAN_LUAR_BALOK_TERAPAN,
    ADEGAN_LUAR_PAPAN,
    ADEGAN_LUAR_PAPAN_TERAPAN,
    ADEGAN_LUAR_NOL,
    ADEGAN_LUAR_NOL_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
