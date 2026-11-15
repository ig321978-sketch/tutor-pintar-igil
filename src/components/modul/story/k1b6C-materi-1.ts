import type { AdeganStory } from "./logika-story";
import { ANAK_EMO, OWL, W, deret, emo, idDeret, idKartu, judul, kartu, kartuAngka, petak, tangan, teks } from "./k1b6C-gambar";
import { bersih, hapus, hitungAksi, k, mundurAksi, pudarkan, redamkan, sorotkan, tambah } from "./k1b6C-bantu";

/* ------------------------------ 1. Cerita: apel Upe dimakan ulat ------------------------------ */
const SUARA_C1 = "Siang ini Upe pulang dari pasar. Dia membeli lima belas apel yang segar dan merah. Igil, si burung hantu, ikut melihat.";
const SUARA_C2 = "Tiba di dapur, Upe melihat sesuatu. Ada ulat nakal di keranjang! Tiga apel dimakan ulat.";
const SUARA_C3 = "Upe bertanya-tanya. Berapa sisa apel yang masih bagus? Ayo kita bantu Upe mencarinya.";
const SUARA_C4 = "Hari ini kita belajar mengurangi. Lima belas apel, tiga apel pergi. Berapa sisanya? Kita cari dengan tiga cara.";
const SUARA_C5 = "Apel yang dimakan ulat sudah pergi, jadi jumlah apel berkurang. Itu yang kita sebut mengurangi.";
const SUARA_C6 = "Igil suka mencari sisa. Sisa adalah benda yang masih ada, setelah ada yang pergi. Ayo kita mulai!";
const PC = petak(15, 5, 54, 104, 48, 30);

export const ADEGAN_CERITA: AdeganStory = {
  id: "cerita-apel",
  judul: "Apel Upe dimakan ulat",
  sumber: "Materi: cerita apel dimakan ulat",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Apel Upe")),
      tambah("Upe", emo("a-Upe", 60, 58, ANAK_EMO, 30), teks("n-Upe", 60, 80, "Upe", 8.6)),
      tambah("lima", ...kartu("ap", 100, 40, 100, 22, W.krem, ["15 apel"], 9.4)),
      tambah("apel", ...deret("apel", "ap", PC, 9)),
      tambah("Igil,", emo("a-Igil", 250, 58, OWL, 30), teks("n-Igil", 250, 80, "Igil", 8.6, W.ungu)),
    ),
    k(
      SUARA_C2,
      hapus(0, ...idKartu("ap")),
      tambah("ulat", emo("ul", 215, 72, "\u{1F41B}", 24)),
      tambah("Tiga", ...kartu("ud", 90, 40, 120, 22, W.merahMuda, ["3 apel dimakan ulat"], 8.8)),
      sorotkan("Tiga", "ap12", "ap13", "ap14"),
    ),
    k(
      SUARA_C3,
      pudarkan("sisa", "ap12", "ap13", "ap14"),
      tambah("Berapa", emo("tn", 150, 72, "\u{1F914}", 24)),
    ),
    k(
      SUARA_C4,
      hapus(0, "tn", ...idKartu("ud")),
      tambah("Lima", ...kartu("hk", 90, 40, 120, 22, W.emas, ["15 - 3 = ?"], 11)),
    ),
    k(
      SUARA_C5,
      hapus(0, ...idKartu("hk")),
      tambah("berkurang.", ...kartu("bk", 70, 40, 160, 22, W.langit, ["pergi artinya berkurang"], 9.4)),
      sorotkan("dimakan", "ap12", "ap13", "ap14"),
    ),
    k(
      SUARA_C6,
      hapus(0, ...idKartu("bk")),
      redamkan(0, "ap12", "ap13", "ap14"),
      tambah("Sisa", ...kartu("sk", 70, 40, 160, 22, W.hijauMuda, ["sisa: yang masih ada"], 9.4)),
      sorotkan("masih", ...idDeret("ap", 12)),
    ),
  ],
};
/* ------------------------------ 2. Kata-kata pengurangan ------------------------------ */
const SUARA_K1 = "Banyak cerita memakai kata khusus untuk pengurangan. Kita kenali tiga kata, yaitu sisa, dimakan, dan pergi.";
const SUARA_K2 = "Ada juga kata terbang, jatuh, dan habis. Semua kata ini menandakan benda berkurang.";
const SUARA_K3 = "Contohnya, ada delapan belas balon. Lima balon terbang. Balon yang pergi berarti kita mengurangi.";
const SUARA_K4 = "Dalam pengurangan ada tiga bilangan. Bilangan mula-mula, bilangan yang pergi, dan bilangan sisa.";
const SUARA_K5 = "Untuk apel Upe, mula-mula lima belas, yang pergi tiga, dan sisanya belum kita tahu. Ayo kita cari!";
const WARNA3 = [W.hijauMuda, W.pink, W.langit];

export const ADEGAN_KATA: AdeganStory = {
  id: "kata-kurang",
  judul: "Kata-kata pengurangan",
  sumber: "Materi: kata-kata pengurangan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Kata pengurangan")),
      tambah("sisa,", ...kartu("k0", 14, 60, 88, 40, WARNA3[0], ["sisa"], 12)),
      tambah("dimakan,", ...kartu("k1", 106, 60, 88, 40, WARNA3[1], ["dimakan"], 12)),
      tambah("pergi.", ...kartu("k2", 198, 60, 88, 40, WARNA3[2], ["pergi"], 12)),
    ),
    k(
      SUARA_K2,
      tambah("terbang,", ...kartu("k3", 14, 112, 88, 40, W.krem, ["terbang"], 12)),
      tambah("jatuh,", ...kartu("k4", 106, 112, 88, 40, W.lavender, ["jatuh"], 12)),
      tambah("habis.", ...kartu("k5", 198, 112, 88, 40, W.merahMuda, ["habis"], 12)),
      tambah("berkurang.", teks("kb", 150, 180, "benda berkurang", 10, W.ungu)),
    ),
    k(
      SUARA_K3,
      bersih(0),
      tambah(0, judul("Contoh balon")),
      tambah("balon.", emo("bl", 150, 100, "\u{1F388}", 48)),
      tambah("Lima", ...kartu("bs", 40, 128, 220, 28, W.krem, ["18 balon, 5 terbang"], 11)),
      tambah("mengurangi.", teks("bm", 150, 180, "yang pergi: mengurangi", 10, W.ungu)),
    ),
    k(
      SUARA_K4,
      bersih(0),
      tambah(0, judul("Tiga bilangan")),
      tambah("mula-mula,", ...kartu("t0", 20, 36, 150, 34, WARNA3[0], ["mula-mula"], 11)),
      tambah("pergi,", ...kartu("t1", 20, 80, 150, 34, WARNA3[1], ["yang pergi"], 11)),
      tambah("sisa.", ...kartu("t2", 20, 124, 150, 34, WARNA3[2], ["sisa"], 11)),
    ),
    k(
      SUARA_K5,
      tambah("lima", ...kartuAngka("v0", 190, 36, "15", W.krem, 70, 34, 18)),
      tambah("pergi", ...kartuAngka("v1", 190, 80, "3", W.krem, 70, 34, 18)),
      tambah("belum", ...kartuAngka("v2", 190, 124, "?", W.emas, 70, 34, 18)),
      tambah("Ayo", emo("ig", 150, 188, OWL, 28)),
    ),
  ],
};

/* ------------------------------ 3. Hitung mundur dengan apel ------------------------------ */
const SUARA_M1 = "Cara pertama, menghitung mundur. Ini lima belas apel Upe. Kita mulai dari lima belas.";
const SUARA_M2 = "Ulat memakan tiga apel. Ketuk apel yang dimakan ulat, satu demi satu.";
const SUARA_M3 = "Ketuk apel pertama. Sekarang tinggal empat belas. Ketuk apel kedua, tinggal tiga belas. Ketuk apel ketiga, tinggal dua belas.";
const SUARA_M4 = "Tiga kali mundur, kita berhenti di dua belas. Jadi lima belas dikurangi tiga sama dengan dua belas.";
const SUARA_M5 = "Ayo hitung sisa apelnya untuk memastikan. Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh, sebelas, dua belas.";
const SUARA_M6 = "Benar. Ada dua belas apel yang masih bagus. Sisa apel Upe adalah dua belas.";
const SUARA_M7 = "Menghitung mundur mudah kalau yang pergi sedikit. Ucapkan lagi mengikuti suara guru. Lima belas dikurangi tiga sama dengan dua belas.";
const PM = petak(15, 5, 54, 66, 48, 36);

export const ADEGAN_MUNDUR: AdeganStory = {
  id: "mundur-apel",
  judul: "Menghitung mundur dengan apel",
  sumber: "Materi: menghitung mundur dengan apel",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Hitung mundur")),
      tambah("apel", ...deret("apel", "ma", PM, 9)),
      tambah("mulai", ...kartu("ml", 90, 26, 120, 22, W.krem, ["mulai dari 15"], 9.4)),
    ),
    k(
      SUARA_M2,
      sorotkan("tiga", "ma12", "ma13", "ma14"),
      tambah("Ketuk", tangan(198, 162)),
    ),
    k(
      SUARA_M3,
      hapus(0, "tg", ...idKartu("ml")),
      ...mundurAksi(SUARA_M3, "ma", PM, 3, { setelah: "pertama" }),
    ),
    k(
      SUARA_M4,
      tambah("Jadi", ...kartu("mj", 70, 168, 160, 26, W.emas, ["15 - 3 = 12"], 12)),
      sorotkan("berhenti", "mam12"),
    ),
    k(
      SUARA_M5,
      hapus(0, "mam12", "mam13", "mam14"),
      ...hitungAksi(SUARA_M5, "ma", PM, { setelah: "memastikan", turun: 0, naik: 13, akhir: 12 }),
    ),
    k(
      SUARA_M6,
      sorotkan("Ada", ...Array.from({ length: 12 }, (_, i) => `ma${i}`)),
      tambah("Sisa", emo("ok", 270, 172, "✅", 24)),
    ),
    k(
      SUARA_M7,
      tambah("Ucapkan", emo("ucap", 34, 180, "\u{1F5E3}", 26)),
      sorotkan("Lima", "mj-k"),
    ),
  ],
};
