import type { AdeganStory } from "./logika-story";
import { W, emo, garis, judul, kartu, kereta, KERETA_ID, KERETA_RODA, letakRumah, poli, rumah, segiEmpat, siku, teks } from "./k1b4c-gambar";
import { bersih, hapus, hitungBagian, k, redamkan, sorotkan, tambah, ubah } from "./k1b4c-bantu";

const ANAK = "\u{1F9D2}";
const IGIL = "\u{1F989}";
const MERAH = "#F87171";
const BIRU = "#60A5FA";

/* ------------------------------ 1. Cerita dua keping segitiga ------------------------------ */
const SUARA_C1 = "Pagi ini Upe dan Wei bermain di teras bersama Igil, si burung hantu. Mereka punya dua keping berbentuk segitiga yang sama besar.";
const SUARA_C2 = "Upe berkata, kalau kedua keping ini digabung, hasilnya akan menjadi segitiga.";
const SUARA_C3 = "Wei berkata, kalau digabung, hasilnya akan menjadi segi empat. Siapa yang benar?";
const SUARA_C4 = "Igil mengajak kita mencoba di layar. Kita gabungkan dua segitiga yang sama itu, lalu kita lihat bentuk apa yang muncul.";
const SUARA_C5 = "Ayo kita lihat bersama di adegan berikutnya. Ketuk tombol suara kalau kamu ingin mendengar guru lagi.";

export const ADEGAN_CERITA: AdeganStory = {
  id: "cerita-segitiga",
  judul: "Dua keping segitiga",
  sumber: "Materi: cerita dua keping segitiga",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Dua keping segitiga")),
      tambah("Upe", emo("a-Upe", 40, 70, ANAK, 28), teks("n-Upe", 40, 84, "Upe", 8.4)),
      tambah("Wei", emo("a-Wei", 260, 70, ANAK, 28), teks("n-Wei", 260, 84, "Wei", 8.4)),
      tambah("Igil,", emo("a-Igil", 150, 46, IGIL, 26)),
      tambah("segitiga", siku("sa", 90, 70, 40, 56, "kiriBawah", MERAH), siku("sb", 170, 70, 40, 56, "kiriBawah", BIRU)),
    ),
    k(SUARA_C2, tambah(0, ...kartu("cu", 14, 142, 130, 28, W.hijauMuda, ["Upe: jadi segitiga"], 9.4))),
    k(SUARA_C3, tambah(0, ...kartu("cw", 156, 142, 130, 28, W.pink, ["Wei: jadi segi empat"], 9.4)), tambah("benar?", emo("tn", 150, 104, "\u{2753}", 26))),
    k(SUARA_C4, hapus(0, "tn"), sorotkan("gabungkan", "sa", "sb")),
    k(SUARA_C5, redamkan(0, "sa", "sb"), tambah("tombol", emo("sg", 150, 190, "\u{1F50A}", 24)), sorotkan("tombol", "sg")),
  ],
};

/* ------------------------------ 2. Dua cara menggabung ------------------------------ */
const SUARA_D1 = "Ternyata Upe dan Wei sama-sama benar! Ada dua cara untuk menggabungkan dua segitiga yang sama besar.";
const SUARA_D2 = "Cara pertama: balik satu keping, lalu rapatkan pada sisi yang tegak. Lihat, hasilnya satu segitiga yang besar.";
const SUARA_D3 = "Cara kedua: rapatkan kedua keping pada sisi yang miring. Sekarang hasilnya segi empat.";
const SUARA_D4 = "Dua keping yang sama bisa menjadi bangun yang berbeda. Hasilnya tergantung cara kita menggabungkannya.";
const SUARA_D5 = "Menggabung beberapa bentuk menjadi bangun baru kita sebut menyusun. Ucapkan lagi mengikuti suara guru: menyusun.";

export const ADEGAN_CARA: AdeganStory = {
  id: "dua-cara",
  judul: "Dua cara menggabung",
  sumber: "Materi: dua cara menggabung",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_D1, bersih(0), tambah(0, judul("Dua cara menggabung")), tambah("cara", siku("ga", 200, 70, 40, 60, "kiriBawah", MERAH), siku("gb", 40, 70, 40, 60, "kananBawah", BIRU))),
    k(
      SUARA_D2,
      tambah("tegak,", garis("gt", 110, 70, 0, 60, W.hijau, 3)),
      ubah("rapatkan", { id: "ga", x: 110 }, { id: "gb", x: 70 }),
      tambah("segitiga", teks("lb", 150, 152, "segitiga besar", 11, W.merah)),
    ),
    k(
      SUARA_D3,
      hapus(0, "gb", "gt", "lb"),
      tambah(0, siku("gc", 190, 70, 40, 60, "kananAtas", BIRU)),
      ubah("rapatkan", { id: "gc", x: 110 }),
      tambah("miring.", garis("gm", 110, 70, 40, 60, W.hijau, 3)),
      tambah("segi", teks("lc", 150, 152, "segi empat", 11, W.merah)),
    ),
    k(
      SUARA_D4,
      hapus(0, "lc", "gm"),
      tambah("Dua", ...kartu("d1", 14, 164, 132, 28, W.hijauMuda, ["sisi tegak: segitiga"], 9)),
      tambah("Hasilnya", ...kartu("d2", 154, 164, 132, 28, W.pink, ["sisi miring: segi empat"], 9)),
    ),
    k(
      SUARA_D5,
      bersih(0),
      tambah(0, judul("Menyusun"), emo("sn", 150, 84, "\u{1F9E9}", 56)),
      tambah("menyusun", ...kartu("ss", 40, 120, 220, 34, W.emas, ["menyusun = menggabung"], 12)),
      sorotkan("Ucapkan", "ss-k"),
    ),
  ],
};

/* ------------------------------ 3. Bangun lain bisa digabung ------------------------------ */
const SUARA_E1 = "Bukan hanya segitiga yang bisa digabung. Dua persegi yang sama bisa digabung menjadi satu persegi panjang.";
const SUARA_E2 = "Sekarang ada potongan biru yang sisi kanannya miring, dan satu segitiga merah yang kecil. Kalau digabung, hasilnya segi empat yang utuh.";
const SUARA_E3 = "Dua bangun datar bisa digabungkan. Hasilnya adalah bangun baru, dan bangun baru itu punya nama yang baru.";
const SUARA_E4 = "Empat persegi kecil yang sama juga bisa digabung. Rapatkan semuanya, dan jadilah satu persegi yang besar.";

export const ADEGAN_BARU: AdeganStory = {
  id: "bangun-baru",
  judul: "Bangun yang baru",
  sumber: "Materi: bangun datar digabung",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_E1,
      bersih(0),
      tambah(0, judul("Bangun yang baru")),
      tambah("persegi", segiEmpat("q1", 40, 70, 40, 40), segiEmpat("q2", 220, 70, 40, 40)),
      ubah("menjadi", { id: "q1", x: 110 }, { id: "q2", x: 150 }),
      tambah("panjang.", teks("lq", 150, 134, "persegi panjang", 12, W.merah)),
    ),
    k(
      SUARA_E2,
      hapus(0, "q1", "q2", "lq"),
      tambah("biru", poli("e1", 100, 60, [[0, 0], [40, 0], [60, 60], [0, 60]], BIRU), poli("e2", 230, 60, [[0, 0], [20, 0], [20, 60]], MERAH)),
      ubah("digabung,", { id: "e2", x: 140 }),
      tambah("utuh.", teks("le", 130, 142, "segi empat utuh", 12, W.merah)),
    ),
    k(SUARA_E3, hapus(0, "le"), tambah("Hasilnya", ...kartu("ek", 20, 152, 260, 30, W.krem, ["dua bangun datar = bangun baru"], 10))),
    k(
      SUARA_E4,
      bersih(0),
      tambah(0, judul("Empat persegi kecil")),
      tambah("persegi", segiEmpat("s1", 60, 50, 30, 30), segiEmpat("s2", 210, 50, 30, 30), segiEmpat("s3", 60, 130, 30, 30), segiEmpat("s4", 210, 130, 30, 30)),
      ubah("Rapatkan", { id: "s1", x: 120, y: 60 }, { id: "s2", x: 150, y: 60 }, { id: "s3", x: 120, y: 90 }, { id: "s4", x: 150, y: 90 }),
      tambah("besar.", teks("ls", 150, 150, "satu persegi besar", 12, W.merah)),
    ),
  ],
};

/* ------------------------------ 4. Kereta dari keping ------------------------------ */
const SUARA_F1 = "Halim punya kereta mainan yang tersusun dari banyak keping. Ayo kita amati bentuk-bentuk pada kereta itu.";
const SUARA_F2 = "Cerobongnya berbentuk segi empat. Mesinnya segi empat. Kabin dan jendelanya juga segi empat, dan gerbong yang panjang segi empat juga.";
const SUARA_F3 = "Kita hitung segi empatnya dengan ketukan: satu, dua, tiga, empat, lima. Jadi segi empat ada lima.";
const SUARA_F4 = "Moncong kereta berbentuk segitiga. Kita hitung segitiganya. Segitiga ada satu.";
const SUARA_F5 = "Roda kereta berbentuk lengkung. Kita hitung rodanya dengan ketukan: satu, dua, tiga. Lengkung ada tiga.";
const SUARA_F6 = "Jadi kereta ini disusun dari lima segi empat, satu segitiga, dan tiga bentuk lengkung. Hebat, kamu sudah mengenal penyusunnya!";

export const ADEGAN_KERETA: AdeganStory = {
  id: "kereta-keping",
  judul: "Kereta dari keping",
  sumber: "Materi: kereta dari keping",
  latar: "#ECFCCB",
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, judul("Kereta dari keping")),
      tambah("Halim", emo("h", 272, 46, ANAK, 24), teks("hn", 272, 60, "Halim", 8.4)),
      tambah("kereta", ...kereta()),
    ),
    k(
      SUARA_F2,
      sorotkan("Cerobongnya", "kr0"),
      redamkan("Mesinnya", "kr0"),
      sorotkan("Mesinnya", "kr1"),
      redamkan("Kabin", "kr1"),
      sorotkan("Kabin", "kr2"),
      redamkan("jendelanya", "kr2"),
      sorotkan("jendelanya", "kr3"),
      redamkan("gerbong", "kr3"),
      sorotkan("gerbong", "kr4"),
    ),
    k(SUARA_F3, redamkan(0, "kr4"), ...hitungBagian(SUARA_F3, KERETA_ID, "segi empat", "cs", 150, 156, "ketukan:")),
    k(SUARA_F4, redamkan(0, "kr4"), ...hitungBagian(SUARA_F4, ["kr5"], "segitiga", "cg", 150, 170, "segitiganya.")),
    k(SUARA_F5, redamkan(0, "kr5"), ...hitungBagian(SUARA_F5, KERETA_RODA, "lengkung", "cl", 150, 184, "ketukan:")),
    k(SUARA_F6, redamkan(0, "kr8"), sorotkan("lima", ...KERETA_ID), redamkan("satu", ...KERETA_ID), sorotkan("satu", "kr5"), redamkan("tiga", "kr5"), sorotkan("tiga", ...KERETA_RODA), redamkan("Hebat,", ...KERETA_RODA), tambah("Hebat,", emo("ow", 272, 120, IGIL, 26))),
  ],
};

/* ------------------------------ 5. Mengurai rumah mainan ------------------------------ */
const SUARA_G1 = "Setelah menyusun, kita juga bisa mengurai. Mengurai artinya memisahkan sebuah bangun menjadi bagian-bagiannya.";
const SUARA_G2 = "Malosi punya rumah mainan. Kita uraikan rumah itu. Lihat, bagian-bagiannya sekarang terpisah.";
const SUARA_G3 = "Atapnya berbentuk segitiga. Dinding, pintu, dan jendelanya berbentuk segi empat.";
const SUARA_G4 = "Sekarang kita susun lagi bagian-bagian itu. Lihat, rumahnya kembali utuh!";
const SUARA_G5 = "Menyusun dan mengurai seperti dua arah yang saling berlawanan. Menyusun menggabungkan, dan mengurai memisahkan.";
const UTUH = letakRumah(false);
const URAI = letakRumah(true);

export const ADEGAN_URAI: AdeganStory = {
  id: "urai-rumah",
  judul: "Mengurai rumah mainan",
  sumber: "Materi: mengurai rumah mainan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_G1, bersih(0), tambah(0, judul("Mengurai")), tambah("bangun", ...rumah(false)), tambah("memisahkan", ...kartu("gk", 20, 168, 260, 28, W.krem, ["mengurai = memisahkan bangun"], 10))),
    k(
      SUARA_G2,
      hapus(0, "gk-k", "gk-t0"),
      tambah("Malosi", emo("a-Malosi", 36, 36, ANAK, 24), teks("n-Malosi", 36, 50, "Malosi", 8.4)),
      ubah("terpisah.", ...["rm0", "rm1", "rm2", "rm3"].map((id) => ({ id, x: URAI[id].x, y: URAI[id].y }))),
    ),
    k(
      SUARA_G3,
      tambah("Atapnya", teks("t0", 74, 98, "segitiga", 8.4, W.merah)),
      tambah("Dinding,", teks("t1", 200, 116, "segi empat", 8.4, W.merah)),
      tambah("pintu,", teks("t2", 72, 166, "segi empat", 8.4, W.merah)),
      tambah("jendelanya", teks("t3", 184, 162, "segi empat", 8.4, W.merah)),
    ),
    k(SUARA_G4, hapus(0, "t0", "t1", "t2", "t3"), ubah("susun", ...["rm0", "rm1", "rm2", "rm3"].map((id) => ({ id, x: UTUH[id].x, y: UTUH[id].y }))), tambah("utuh!", emo("ok", 252, 150, "\u{2705}", 26))),
    k(
      SUARA_G5,
      bersih(0),
      tambah(0, judul("Dua arah berlawanan")),
      tambah("Menyusun", ...kartu("g1", 20, 44, 110, 44, W.hijauMuda, ["menyusun", "menggabung"], 11)),
      tambah("arah", emo("g2", 150, 70, "\u{2194}\u{FE0F}", 30)),
      tambah("mengurai@2", ...kartu("g3", 170, 44, 110, 44, W.pink, ["mengurai", "memisahkan"], 11)),
      tambah("memisahkan.", emo("g4", 150, 140, IGIL, 40)),
    ),
  ],
};
