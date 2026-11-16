import type { AdeganStory } from "./logika-story";
import { OWL, W, emo, idKartu, judul, kartu, papanIsi, papanKepala, papanKolom, teks } from "./k4b1a-gambar";
import { bersih, hias, hapus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k4b1a-bantu";

/* Rujukan topik: Matematika untuk SD/MI Kelas IV, Bab 1 Sub-Bab A, cara membaca dan menulis nama bilangan dengan angka nol (hlm. buku siswa 6 sampai 9). Angka dan cerita orisinal IGIL. */

/* ------------------------------ 5. Cara membaca ------------------------------ */
const SUARA_B1 = "Sekarang kita baca bilangan skor Kira. Bacalah dari kiri ke kanan, satu tempat demi satu tempat.";
const SUARA_B2 = "Angka lima di tempat ribuan dibaca lima ribu. Angka delapan di tempat ratusan dibaca delapan ratus.";
const SUARA_B3 = "Angka empat di tempat puluhan dibaca empat puluh. Angka dua di tempat satuan dibaca dua.";
const SUARA_B4 = "Gabungkan semuanya dari kiri ke kanan. Namanya lima ribu delapan ratus empat puluh dua.";
const SUARA_B5 = "Titik pada bilangan tidak ikut dibaca. Ia hanya membantu mata kita.";

export const ADEGAN_CARA_BACA: AdeganStory = {
  id: "cara-baca",
  judul: "Cara membaca bilangan",
  sumber: "Materi: cara membaca bilangan",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Cara membaca")), hias(),
      tambah(idx(SUARA_B1, "bilangan"), ...papanKepala("pp", 10, 30, 280), ...papanIsi("pp", 10, 45, 280, "5842")),
      tambah(idx(SUARA_B1, "kiri"), teks("ar", 150, 100, "dari kiri ke kanan", 10, W.ungu)),
    ),
    k(
      SUARA_B2,
      hapus(0, "ar"),
      sorotkan(idx(SUARA_B2, "lima"), "pp-d0"),
      tambah(idx(SUARA_B2, "ribu"), ...kartu("n1", 14, 92, 130, 22, W.merahMuda, ["lima ribu"], 10)),
      redamkan(idx(SUARA_B2, "delapan"), "pp-d0"),
      sorotkan(idx(SUARA_B2, "delapan"), "pp-d1"),
      tambah(idx(SUARA_B2, "ratus."), ...kartu("n2", 156, 92, 130, 22, W.langit, ["delapan ratus"], 10)),
    ),
    k(
      SUARA_B3,
      hapus(0, "jud"),
      redamkan(0, "pp-d1"),
      sorotkan(idx(SUARA_B3, "empat"), "pp-d2"),
      tambah(idx(SUARA_B3, "puluh."), ...kartu("n3", 14, 122, 130, 22, W.hijauMuda, ["empat puluh"], 10)),
      redamkan(idx(SUARA_B3, "dua"), "pp-d2"),
      sorotkan(idx(SUARA_B3, "dua"), "pp-d3"),
      tambah(idx(SUARA_B3, "dibaca", 2), ...kartu("n4", 156, 122, 130, 22, W.krem, ["dua"], 10)),
    ),
    k(
      SUARA_B4,
      hapus(0, ...idKartu("n1"), ...idKartu("n2"), ...idKartu("n3"), ...idKartu("n4")),
      redamkan(0, "pp-d3"),
      tambah(idx(SUARA_B4, "Namanya"), ...kartu("nm", 20, 100, 260, 46, W.emas, ["lima ribu delapan ratus", "empat puluh dua"], 12)),
    ),
    k(SUARA_B5, tambah(idx(SUARA_B5, "Titik"), ...kartu("bl", 90, 154, 120, 36, W.krem, ["5.842"], 22)), tambah(idx(SUARA_B5, "mata"), emo("mt", 262, 176, "\u{1F440}", 24))),
  ],
};

/* ------------------------------ 6. Menulis bilangan dari namanya ------------------------------ */
const SUARA_M1 = "Sekarang kebalikannya. Kira mendengar nama bilangan, lalu menuliskannya dengan angka.";
const SUARA_M2 = "Namanya tujuh ribu empat ratus dua puluh tiga. Kira menulisnya satu tempat demi satu tempat.";
const SUARA_M3 = "Tujuh ribu, berarti angka tujuh di ribuan. Empat ratus, berarti angka empat di ratusan.";
const SUARA_M4 = "Dua puluh, berarti angka dua di puluhan. Tiga, berarti angka tiga di satuan.";
const SUARA_M5 = "Jadi bilangannya kita tulis seperti ini. Jangan lupa titik setelah ribuan.";

export const ADEGAN_MENULIS: AdeganStory = {
  id: "menulis-bilangan",
  judul: "Menulis bilangan dari namanya",
  sumber: "Materi: menulis bilangan",
  latar: "#ECFDF5",
  ketukan: [
    k(SUARA_M1, tambah(0, judul("Menulis bilangan")), hias(), tambah(idx(SUARA_M1, "mendengar"), emo("hp", 100, 100, "\u{1F3A7}", 44)), tambah(idx(SUARA_M1, "angka."), emo("qm", 200, 100, "❓", 44))),
    k(
      SUARA_M2,
      hapus(0, "hp", "qm"),
      tambah(idx(SUARA_M2, "Namanya"), ...kartu("nm", 20, 28, 260, 46, W.krem, ["tujuh ribu empat ratus", "dua puluh tiga"], 12)),
      tambah(idx(SUARA_M2, "tempat"), ...papanKepala("pp", 10, 88, 280)),
    ),
    k(
      SUARA_M3,
      tambah(idx(SUARA_M3, "tujuh"), ...papanKolom("pp", 10, 103, 280, 0, "7")),
      tambah(idx(SUARA_M3, "empat"), ...papanKolom("pp", 10, 103, 280, 1, "4")),
    ),
    k(
      SUARA_M4,
      tambah(idx(SUARA_M4, "dua"), ...papanKolom("pp", 10, 103, 280, 2, "2")),
      tambah(idx(SUARA_M4, "tiga,"), ...papanKolom("pp", 10, 103, 280, 3, "3")),
    ),
    k(SUARA_M5, tambah(idx(SUARA_M5, "bilangannya"), ...kartu("bl", 80, 150, 140, 40, W.emas, ["7.423"], 24)), tambah(idx(SUARA_M5, "titik"), emo("ok", 258, 172, "✅", 26))),
  ],
};

/* ------------------------------ 7. Angka nol saat membaca ------------------------------ */
const SUARA_N1 = "Kadang ada angka nol dalam bilangan. Lihat bilangan lima ribu dua puluh tujuh ini.";
const SUARA_N2 = "Di tempat ratusan ada angka nol. Angka nol tidak dibaca.";
const SUARA_N3 = "Sekarang bilangan delapan ribu dua ratus enam. Tempat puluhannya berisi nol.";
const SUARA_N4 = "Puluhan kosong, jadi tidak dibaca. Kita langsung dari ratusan ke satuan.";
const SUARA_N5 = "Contoh terakhir, tiga ribu empat ratus sembilan puluh. Satuannya nol, jadi tidak dibaca.";
const SUARA_N6 = "Ingat, angka nol tidak dibaca saat kita menyebut bilangan.";

export const ADEGAN_NOL_MEMBACA: AdeganStory = {
  id: "nol-membaca",
  judul: "Angka nol saat membaca",
  sumber: "Materi: angka nol saat membaca",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Angka nol")), hias(),
      tambah(idx(SUARA_N1, "Lihat"), ...papanKepala("pp", 10, 30, 280), ...papanIsi("pp", 10, 45, 280, "5027")),
      tambah(idx(SUARA_N1, "ini."), ...kartu("bl", 90, 146, 120, 36, W.krem, ["5.027"], 22)),
    ),
    k(
      SUARA_N2,
      sorotkan(idx(SUARA_N2, "ratusan"), "pp-d1"),
      tambah(idx(SUARA_N2, "dibaca."), ...kartu("nm", 20, 96, 260, 46, W.emas, ["lima ribu", "dua puluh tujuh"], 12)),
    ),
    k(
      SUARA_N3,
      bersih(0),
      tambah(0, judul("Nol di puluhan")), hias(),
      tambah(0, ...papanKepala("pp", 10, 30, 280), ...papanIsi("pp", 10, 45, 280, "8206")),
      tambah(idx(SUARA_N3, "puluhannya"), ...kartu("bl", 90, 146, 120, 36, W.krem, ["8.206"], 22)),
      sorotkan(idx(SUARA_N3, "nol."), "pp-d2"),
    ),
    k(SUARA_N4, tambah(idx(SUARA_N4, "tidak"), ...kartu("nm", 20, 96, 260, 46, W.emas, ["delapan ribu", "dua ratus enam"], 12))),
    k(
      SUARA_N5,
      bersih(0),
      tambah(0, judul("Nol di satuan")), hias(),
      tambah(0, ...papanKepala("pp", 10, 30, 280), ...papanIsi("pp", 10, 45, 280, "3490")),
      tambah(idx(SUARA_N5, "terakhir,"), ...kartu("bl", 90, 146, 120, 36, W.krem, ["3.490"], 22)),
      sorotkan(idx(SUARA_N5, "Satuannya"), "pp-d3"),
      tambah(idx(SUARA_N5, "dibaca."), ...kartu("nm", 20, 96, 260, 46, W.emas, ["tiga ribu empat ratus", "sembilan puluh"], 12)),
    ),
    k(SUARA_N6, bersih(0), tambah(0, judul("Nol tidak dibaca")), hias(), tambah(idx(SUARA_N6, "nol"), emo("nl", 150, 118, "0", 80, { warna: W.merah })), tambah(idx(SUARA_N6, "dibaca"), emo("ow", 252, 70, OWL, 34))),
  ],
};

/* ------------------------------ 8. Angka nol saat menulis ------------------------------ */
const SUARA_W1 = "Sekarang menulis. Kira mendengar empat ribu tiga. Angka apa yang harus ditulis?";
const SUARA_W2 = "Empat di ribuan, tiga di satuan. Ratusan dan puluhan tidak disebut.";
const SUARA_W3 = "Tempat yang tidak disebut harus diisi angka nol.";
const SUARA_W4 = "Jadi bilangannya empat ribu tiga ditulis seperti ini, dengan titik setelah ribuan.";
const SUARA_W5 = "Kalau nol dihilangkan, bilangannya menjadi empat puluh tiga. Nilainya jauh berbeda.";

export const ADEGAN_NOL_MENULIS: AdeganStory = {
  id: "nol-menulis",
  judul: "Angka nol saat menulis",
  sumber: "Materi: angka nol saat menulis",
  latar: "#F0FDFA",
  ketukan: [
    k(SUARA_W1, tambah(0, judul("Menulis dengan nol")), hias(), tambah(idx(SUARA_W1, "mendengar"), ...kartu("nm", 40, 44, 220, 36, W.krem, ["empat ribu tiga"], 14)), tambah(idx(SUARA_W1, "apa"), emo("qm", 150, 130, "❓", 50))),
    k(
      SUARA_W2,
      hapus(0, "qm"),
      tambah(0, ...papanKepala("pp", 10, 96, 280)),
      tambah(idx(SUARA_W2, "Empat"), ...papanKolom("pp", 10, 111, 280, 0, "4")),
      tambah(idx(SUARA_W2, "tiga"), ...papanKolom("pp", 10, 111, 280, 3, "3")),
      tambah(idx(SUARA_W2, "Ratusan"), ...papanKolom("pp", 10, 111, 280, 1, "?"), ...papanKolom("pp", 10, 111, 280, 2, "?")),
    ),
    k(SUARA_W3, ubah(idx(SUARA_W3, "nol."), { id: "pp-dt1", isi: "0" }, { id: "pp-dt2", isi: "0" }), sorotkan(idx(SUARA_W3, "diisi"), "pp-d1", "pp-d2")),
    k(SUARA_W4, tambah(idx(SUARA_W4, "ditulis"), ...kartu("bl", 80, 154, 140, 40, W.emas, ["4.003"], 24))),
    k(SUARA_W5, hapus(0, "nm-k", "nm-t0"), tambah(idx(SUARA_W5, "dihilangkan,"), ...kartu("sl", 200, 40, 90, 40, W.merahMuda, ["43"], 22)), tambah(idx(SUARA_W5, "jauh"), emo("sd", 150, 70, "⚠️", 30))),
  ],
};

