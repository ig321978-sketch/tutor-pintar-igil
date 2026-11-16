import type { AdeganStory } from "./logika-story";
import { W, anak, emo, idKartuSepuluh, judul, kartu, kartuAngka, kartuSepuluh, papanKepala, papanKolom, teks } from "./k4b1ka-gambar";
import { bersih, hias, hapus, idx, k, redamkan, sorotkan, tambah } from "./k4b1ka-bantu";

/* Rujukan topik: Matematika untuk SD/MI Kelas IV, Bab 1 Sub-Bab A (membaca bilangan cacah sampai 10.000), hlm. buku siswa 4 sampai 6. Cerita dan angka orisinal IGIL. */

/* ------------------------------ 2. Skor Kira ------------------------------ */
const SUARA_C1 = "Kira bermain di dunia permainan. Ia mengumpulkan poin di setiap level.";
const SUARA_C2 = "Di akhir permainan, papan skor menampilkan sebuah bilangan. Ada empat angka berjajar.";
const SUARA_C3 = "Kira ingin membacanya dengan benar. Hari ini kita membantunya belajar.";
const SUARA_C4 = "Bilangan empat angka paling kecil adalah seribu. Yang paling besar sembilan ribu sembilan ratus sembilan puluh sembilan.";

export const ADEGAN_CERITA_SKOR: AdeganStory = {
  id: "cerita-skor",
  judul: "Skor Kira",
  sumber: "Materi: skor permainan Kira",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Skor Kira")), hias(),
      tambah(idx(SUARA_C1, "Kira"), ...anak("kira", 40, 80)),
      tambah(idx(SUARA_C1, "permainan."), emo("gm", 130, 84, "\u{1F3AE}", 40)),
      tambah(idx(SUARA_C1, "poin"), emo("p1", 200, 90, "\u{1F48E}", 26), emo("p2", 232, 90, "\u{1F48E}", 26), emo("p3", 264, 90, "\u{1F48E}", 26)),
    ),
    k(
      SUARA_C2,
      hapus(0, "gm", "p1", "p2", "p3"),
      tambah(idx(SUARA_C2, "papan"), teks("ps", 180, 50, "papan skor", 10, W.ungu), ...kartu("bl", 85, 58, 190, 58, W.krem, ["5.842"], 30)),
      tambah(idx(SUARA_C2, "empat", 1), ...kartu("em", 105, 134, 150, 26, W.emas, ["empat angka"], 11)),
    ),
    k(SUARA_C3, tambah(idx(SUARA_C3, "membacanya"), emo("qm", 40, 178, "❓", 26)), sorotkan(idx(SUARA_C3, "membantunya"), "bl-k")),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, judul("Bilangan empat angka")), hias(),
      tambah(idx(SUARA_C4, "seribu."), ...kartu("tk", 20, 54, 124, 56, W.langit, ["terkecil", "1.000"], 14)),
      tambah(idx(SUARA_C4, "sembilan"), ...kartu("tb", 156, 54, 124, 56, W.pink, ["terbesar", "9.999"], 14)),
    ),
  ],
};

/* ------------------------------ 3. Kartu angka ------------------------------ */
const SUARA_K1 = "Supaya mudah, Kira membuat kartu angka di layar. Ada sepuluh kartu, dari nol sampai sembilan.";
const SUARA_K2 = "Kira mengambil empat kartu. Ia memilih lima, delapan, empat, dan dua.";
const SUARA_K3 = "Kartu lima ia taruh paling kiri. Lalu delapan, empat, dan dua di sebelahnya.";
const SUARA_K4 = "Hasilnya sebuah bilangan empat angka. Kira menuliskannya dengan titik setelah angka ribuan.";

export const ADEGAN_KARTU_ANGKA: AdeganStory = {
  id: "kartu-angka",
  judul: "Kartu angka",
  sumber: "Materi: kartu angka",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Kartu angka")), hias(),
      tambah(idx(SUARA_K1, "kartu"), ...kartuSepuluh(35, 40)),
      tambah(idx(SUARA_K1, "sepuluh"), ...kartu("jk", 90, 134, 120, 28, W.emas, ["10 kartu"], 12)),
    ),
    k(
      SUARA_K2,
      sorotkan(idx(SUARA_K2, "lima,"), "kd5-k"),
      sorotkan(idx(SUARA_K2, "delapan,"), "kd8-k"),
      sorotkan(idx(SUARA_K2, "empat,", 1), "kd4-k"),
      sorotkan(idx(SUARA_K2, "dua."), "kd2-k"),
    ),
    k(
      SUARA_K3,
      hapus(0, ...idKartuSepuluh, "jk-k", "jk-t0"),
      tambah(idx(SUARA_K3, "lima"), ...kartuAngka("ks0", 52, 60, "5", W.langit, 40, 50, 28)),
      tambah(idx(SUARA_K3, "delapan,"), ...kartuAngka("ks1", 104, 60, "8", W.hijauMuda, 40, 50, 28)),
      tambah(idx(SUARA_K3, "empat,"), ...kartuAngka("ks2", 156, 60, "4", W.krem, 40, 50, 28)),
      tambah(idx(SUARA_K3, "dua"), ...kartuAngka("ks3", 208, 60, "2", W.pink, 40, 50, 28)),
    ),
    k(
      SUARA_K4,
      tambah(idx(SUARA_K4, "Hasilnya"), ...kartu("bl", 80, 130, 140, 40, W.krem, ["5.842"], 24)),
      tambah(idx(SUARA_K4, "titik"), teks("tk", 150, 188, "titik setelah ribuan", 9, W.ungu)),
    ),
  ],
};

/* ------------------------------ 4. Tabel empat tempat ------------------------------ */
const SUARA_T1 = "Tiap angka dalam bilangan menempati satu tempat. Ada empat tempat, dari kiri ke kanan.";
const SUARA_T2 = "Tempat pertama bernama ribuan. Tempat kedua ratusan. Tempat ketiga puluhan. Tempat keempat satuan.";
const SUARA_T3 = "Sekarang kita taruh bilangan skor Kira. Lima di ribuan, delapan di ratusan, empat di puluhan, dua di satuan.";
const SUARA_T4 = "Angka-angka itu membentuk bilangan skor Kira. Kita menulisnya dengan titik setelah ribuan.";

export const ADEGAN_TABEL_TEMPAT: AdeganStory = {
  id: "tabel-tempat",
  judul: "Tabel empat tempat",
  sumber: "Materi: tabel empat tempat",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Empat tempat")), hias(),
      tambah(idx(SUARA_T1, "empat"), ...papanKepala("pp", 10, 40, 280)),
      tambah(idx(SUARA_T1, "kanan."), teks("ar", 150, 124, "dibaca dari kiri ke kanan", 10, W.ungu)),
    ),
    k(
      SUARA_T2,
      hapus(0, "ar"),
      sorotkan(idx(SUARA_T2, "ribuan."), "pp-h0"),
      sorotkan(idx(SUARA_T2, "ratusan."), "pp-h1"),
      sorotkan(idx(SUARA_T2, "puluhan."), "pp-h2"),
      sorotkan(idx(SUARA_T2, "satuan."), "pp-h3"),
    ),
    k(
      SUARA_T3,
      redamkan(0, "pp-h0", "pp-h1", "pp-h2", "pp-h3"),
      tambah(idx(SUARA_T3, "Lima"), ...papanKolom("pp", 10, 58, 280, 0, "5")),
      tambah(idx(SUARA_T3, "delapan,"), ...papanKolom("pp", 10, 58, 280, 1, "8")),
      tambah(idx(SUARA_T3, "empat"), ...papanKolom("pp", 10, 58, 280, 2, "4")),
      tambah(idx(SUARA_T3, "dua"), ...papanKolom("pp", 10, 58, 280, 3, "2")),
    ),
    k(
      SUARA_T4,
      tambah(idx(SUARA_T4, "bilangan"), ...kartu("bl", 80, 118, 140, 40, W.krem, ["5.842"], 24)),
      sorotkan(idx(SUARA_T4, "titik"), "bl-k"),
    ),
  ],
};

