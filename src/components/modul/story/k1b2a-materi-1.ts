import type { AdeganStory } from "./logika-story";
import { OWL, W, baris, emo, garis, judul, kartu, kotak, papan, tali, teks } from "./k1b2a-gambar";
import { bersih, hapus, hitungAksi, idx, k, redamkan, sorotkan, tambah, ubah } from "./k1b2a-bantu";

const ANAK_EMO = "\u{1F9D2}";

/* ------------------------------ 1. Cerita di taman ------------------------------ */
const SUARA_C1 = "Pagi ini Malosi, Kira, Upe, dan Wei bermain di taman bersama Igil, si burung hantu. Hari ini mereka punya cerita yang seru.";
const SUARA_C2 = "Igil bertanya, kalau ada benda di sini, lalu benda lain datang, ada berapa semuanya? Ayo kita cari jawabannya pelan-pelan.";
const SUARA_C3 = "Hari ini kita belajar tiga hal. Pertama, menggabungkan benda. Kedua, benda yang bertambah. Ketiga, menulis kalimat tambah.";
const SUARA_C4 = "Kita memakai bilangan sampai sepuluh saja. Pelan-pelan, ya. Kalau perlu, ketuk benda di layar satu per satu sambil menghitung.";
const SUARA_C5 = "Kita mulai dari lapangan sekolah. Di sana ada anak-anak yang sedang bermain lompat tali. Ayo kita lihat ceritanya sampai selesai.";

const ANAK: [string, number][] = [["Malosi", 40], ["Kira", 95], ["Upe", 150], ["Wei", 205]];

export const ADEGAN_CERITA: AdeganStory = {
  id: "cerita-taman",
  judul: "Malosi, Kira, Upe, dan Wei di taman",
  sumber: "Materi: cerita di taman",
  latar: "#ECFCCB",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Di taman bermain"), garis("tanah", 14, 142, 272, 0, W.hijau, 3)),
      ...ANAK.map(([nama, x]) => tambah(nama, emo(`a-${nama}`, x, 112, ANAK_EMO, 30), teks(`n-${nama}`, x, 132, nama, 8.6))),
      tambah("Igil,", emo("a-Igil", 262, 112, OWL, 30), teks("n-Igil", 262, 132, "Igil", 8.6, W.ungu)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Ada berapa semuanya?")),
      tambah("berapa", emo("tanya", 150, 100, "❓", 50)),
      tambah("lain", ...kartu("bq", 40, 140, 220, 30, W.krem, ["benda di sini, benda datang"], 9.4)),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Hari ini kita belajar")),
      tambah("menggabungkan", ...kartu("h1", 20, 36, 260, 32, W.hijauMuda, ["Menggabungkan benda"], 10)),
      tambah("bertambah.", ...kartu("h2", 20, 80, 260, 32, W.langit, ["Benda yang bertambah"], 10)),
      tambah("menulis", ...kartu("h3", 20, 124, 260, 32, W.pink, ["Menulis kalimat tambah"], 10)),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, judul("Sampai sepuluh saja")),
      tambah("sepuluh", teks("s10", 150, 96, "10", 44, W.merah)),
      tambah("ketuk", emo("jr", 150, 150, "\u{1F446}", 34)),
    ),
    k(
      SUARA_C5,
      bersih(0),
      tambah(0, judul("Lompat tali"), garis("tanah", 14, 150, 272, 0, W.hijau, 3)),
      tambah("anak-anak", emo("l1", 50, 128, ANAK_EMO, 30), emo("l2", 250, 128, ANAK_EMO, 30)),
      tambah("lompat", tali("tl", 55, 118, 190, 50)),
    ),
  ],
};

/* ------------------------------ 2. Lompat tali: empat anak ditambah dua anak ------------------------------ */
const SUARA_L1 = "Di lapangan sekolah, empat anak bermain lompat tali. Ayo kita hitung anak yang sedang bermain.";
const SUARA_L2 = "Satu, dua, tiga, empat. Ada empat anak yang sedang bermain.";
const SUARA_L3 = "Tidak lama kemudian, datang lagi dua anak. Mereka ikut bermain. Sekarang tali berputar untuk semua anak.";
const SUARA_L4 = "Sekarang kita hitung semuanya. Satu, dua, tiga, empat, lima, enam.";
const SUARA_L5 = "Anak yang bermain bertambah, dari empat menjadi enam. Sekarang ada enam anak. Kita bisa memeriksanya sekali lagi dengan menghitung pelan-pelan.";
const SUARA_L6 = "Ini cerita tentang menggabungkan dua bagian. Bagian pertama empat anak, bagian kedua dua anak. Perhatikan dua warna latar yang berbeda itu.";
const SUARA_L7 = "Kalau kita mencari jumlah semuanya, kita menjumlahkan. Menjumlahkan artinya menggabungkan, lalu menghitung semuanya.";
const P6 = baris(6, 100, 44);
const anakKe = (i: number, x = P6[i].x, y = P6[i].y) => emo(`an${i}`, x, y, ANAK_EMO, 26);

export const ADEGAN_LOMPAT: AdeganStory = {
  id: "lompat-tali",
  judul: "Lompat tali: empat anak, datang lagi dua anak",
  sumber: "Materi: cerita lompat tali",
  latar: "#FEF3C7",
  ketukan: [
    k(SUARA_L1, tambah(0, judul("Lompat tali"), garis("tanah", 14, 140, 272, 0, W.hijau, 3)), tambah("empat", ...[0, 1, 2, 3].map((i) => anakKe(i)))),
    k(SUARA_L2, ...hitungAksi(SUARA_L2, "an", P6.slice(0, 4))),
    k(
      SUARA_L3,
      hapus(0, "tg"),
      tambah("datang", anakKe(4, 282, 100), anakKe(5, 282, 100)),
      ubah("ikut", { id: "an4", x: P6[4].x }, { id: "an5", x: P6[5].x }),
    ),
    k(SUARA_L4, hapus(0, "ann0", "ann1", "ann2", "ann3"), ...hitungAksi(SUARA_L4, "an", P6, "semuanya.")),
    k(
      SUARA_L5,
      hapus(0, "tg"),
      tambah("bertambah,", ...kartu("tb", 30, 146, 240, 44, W.krem, ["4 anak, datang lagi 2 anak", "jadi 6 anak semuanya"], 9.4)),
      sorotkan("enam.", "an4", "an5"),
    ),
    k(
      SUARA_L6,
      redamkan(0, "an4", "an5"),
      tambah("pertama", kotak("g1", 18, 66, 176, 56, W.langit, undefined, { rx: 8, z: -1 })),
      tambah("kedua", kotak("g2", 196, 66, 88, 56, W.pink, undefined, { rx: 8, z: -1 })),
    ),
    k(
      SUARA_L7,
      bersih(0),
      tambah(0, judul("Menjumlahkan"), emo("ow", 150, 70, OWL, 40)),
      tambah("menggabungkan,", ...kartu("jm", 30, 100, 240, 40, W.emas, ["menjumlahkan =", "menggabungkan, lalu hitung"], 10)),
    ),
  ],
};

/* ------------------------------ 3. Papan tulis Igil: 4 + 2 = 6 ------------------------------ */
const SUARA_P1 = "Igil menulis cerita lompat tali di papan tulis. Mula-mula empat anak. Datang lagi dua anak. Semuanya enam anak.";
const SUARA_P2 = "Sekarang kita tulis dengan angka. Empat, tanda tambah, dua, tanda sama dengan, enam.";
const SUARA_P3 = "Tanda tambah artinya ada yang datang lagi, atau dua bagian digabung. Tanda sama dengan menunjukkan hasilnya.";
const SUARA_P4 = "Kita membaca dari kiri ke kanan. Empat ditambah dua sama dengan enam. Ucapkan lagi mengikuti suara guru.";
const SUARA_P5 = "Enam adalah jumlahnya. Jumlah adalah banyak semuanya setelah dua bagian digabung. Jumlah selalu muncul sesudah tanda sama dengan.";
const SUARA_P6 = "Jadi kalimat tambah menceritakan benda yang digabung atau bertambah. Mudah sekali, bukan?";
const bagianKalimat = (id: string, x: number, isi: string) => teks(id, x, 112, isi, 36, W.putih);

export const ADEGAN_PAPAN: AdeganStory = {
  id: "papan-kalimat",
  judul: "Igil menulis kalimat tambah di papan",
  sumber: "Materi: tanda tambah dan sama dengan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Papan tulis Igil"), papan("pp", 14, 30, 272, 134), emo("ig", 262, 198, OWL, 28)),
      tambah("Mula-mula", teks("p1", 150, 66, "Mula-mula: 4 anak", 11, W.putih)),
      tambah("Datang", teks("p2", 150, 98, "Datang lagi: 2 anak", 11, W.putih)),
      tambah("Semuanya", teks("p3", 150, 130, "Semuanya: 6 anak", 11, W.putih)),
    ),
    k(
      SUARA_P2,
      hapus(0, "p1", "p2", "p3"),
      tambah(idx(SUARA_P2, "Empat"), bagianKalimat("a4", 60, "4")),
      tambah(idx(SUARA_P2, "tambah"), bagianKalimat("pl", 105, "+")),
      tambah(idx(SUARA_P2, "dua"), bagianKalimat("a2", 150, "2")),
      tambah(idx(SUARA_P2, "dengan", 2), bagianKalimat("eq", 195, "=")),
      tambah(idx(SUARA_P2, "enam"), bagianKalimat("a6", 240, "6")),
    ),
    k(
      SUARA_P3,
      sorotkan("tambah", "pl"),
      tambah("tambah", teks("c1", 105, 150, "digabung", 9, W.emas)),
      redamkan("sama", "pl"),
      sorotkan("sama", "eq"),
      tambah("sama", teks("c2", 195, 150, "hasilnya", 9, W.emas)),
    ),
    k(
      SUARA_P4,
      redamkan(0, "eq"),
      sorotkan(idx(SUARA_P4, "Empat"), "a4"),
      redamkan("ditambah", "a4"),
      sorotkan("ditambah", "pl"),
      redamkan("dua", "pl"),
      sorotkan("dua", "a2"),
      redamkan("sama", "a2"),
      sorotkan("sama", "eq"),
      redamkan("enam.", "eq"),
      sorotkan(idx(SUARA_P4, "enam"), "a6"),
    ),
    k(
      SUARA_P5,
      redamkan(0, "a6"),
      sorotkan("Enam", "a6"),
      tambah("Jumlah", ...kartu("jm", 20, 168, 216, 26, W.emas, ["jumlah = banyak semuanya"], 9.4)),
    ),
    k(SUARA_P6, hapus(0, "c1", "c2"), tambah("menceritakan", teks("c3", 150, 150, "cerita jadi angka", 10, W.emas)), tambah("Mudah", emo("ok", 40, 198, "✅", 26))),
  ],
};
