import type { AdeganStory } from "./logika-story";
import { W, deret, emo, judul, kartu, kartuTitik, keranjang, tata, teks, tulisAngka, type Titik } from "./k1b1a-gambar";
import { bersih, hapus, hitungAksi, k, sorotkan, tambah, ubah, urutKata } from "./k1b1a-bantu";

/* ------------------------------ 1. Nol: keranjang kosong ------------------------------ */
const SUARA_N1 = "Igil menunjuk dua keranjang. Keranjang pertama berisi lima bola. Keranjang kedua kosong.";
const SUARA_N2 = "Hitung isi keranjang pertama. Satu, dua, tiga, empat, lima. Ada lima bola.";
const SUARA_N3 = "Sekarang keranjang kedua. Tidak ada bola di dalamnya. Tidak ada yang bisa disentuh. Wah, keranjang ini kosong.";
const SUARA_N4 = "Kalau tidak ada benda, banyaknya adalah nol. Nol artinya tidak ada.";
const SUARA_NX = "Banyak anak bingung dengan nol. Ingat, nol itu bukan benda, tetapi banyaknya kalau tidak ada apa-apa.";
const SUARA_N5 = "Nol ditulis dengan angka nol. Bentuknya bulat seperti cincin.";
const PB: Titik[] = [40, 60, 80, 100, 120].map((x) => ({ x, y: 92 }));

export const ADEGAN_NOL: AdeganStory = {
  id: "nol",
  judul: "Nol: keranjang yang kosong",
  sumber: "Materi: bilangan nol",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Dua keranjang"), emo("ig", 150, 66, "\u{1F989}", 30)),
      tambah("pertama", ...keranjang("ks1", 20, 100, 110, 44), ...deret("bola", "nb", PB, 10)),
      tambah("kedua", ...keranjang("ks2", 170, 100, 110, 44)),
    ),
    k(SUARA_N2, ...hitungAksi(SUARA_N2, "nb", PB, "pertama.")),
    k(
      SUARA_N3,
      sorotkan("kedua", "ks2"),
      tambah("Tidak", teks("ko", 225, 168, "kosong", 12, W.merah)),
      ubah("disentuh.", { id: "tg", x: 225, y: 150 }),
    ),
    k(
      SUARA_N4,
      tambah("banyaknya", teks("nl", 225, 90, "0", 36, W.merah)),
      tambah("artinya", ...kartu("na", 20, 172, 160, 24, W.emas, ["nol = tidak ada"], 10)),
    ),
    k(SUARA_NX, tambah("bingung", emo("bg", 262, 48, "\u{1F914}", 30)), sorotkan("nol.", "nl")),
    k(
      SUARA_N5,
      bersih(0),
      tambah(0, judul("Menulis nol")),
      tambah("ditulis", ...tulisAngka("z", 124, 46, "0", 2)),
      tambah("Bentuknya", teks("zt", 150, 168, "nol", 16, W.ungu)),
    ),
  ],
};

/* ------------------------------ 2. Latihan 1: layang-layang ------------------------------ */
const SUARA_L1 = "Latihan satu. Hitung layang-layang ini sambil menyentuh satu per satu. Ayo, jangan sampai ada yang terlewat.";
const SUARA_L2 = "Satu, dua, tiga, empat, lima, enam, tujuh.";
const SUARA_LX = "Perhatikan, kita tidak melewatkan satu layang-layang pun. Semua mendapat satu angka.";
const SUARA_L3 = "Angka terakhir tujuh, jadi banyaknya tujuh. Tulis angka tujuh. Ingat, tulis dengan pelan dan rapi.";
const SUARA_L4 = "Betul! Ada tujuh layang-layang. Hebat sekali!";
const P7 = tata(7);

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: hitung layang-layang",
  sumber: "Materi: latihan hitung dan tulis",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_L1, tambah(0, judul("Latihan 1")), tambah("layang-layang", ...deret("layang", "ly", P7, 11))),
    k(SUARA_L2, ...hitungAksi(SUARA_L2, "ly", P7)),
    k(SUARA_LX, sorotkan("tidak", "ly0", "ly1", "ly2", "ly3", "ly4", "ly5", "ly6"), tambah("angka.", teks("lx", 150, 192, "semua dapat angka", 8.8, W.hijau))),
    k(SUARA_L3, bersih(0), tambah(0, judul("Latihan 1")), tambah("tujuh,", ...tulisAngka("w", 124, 50, "7", 2)), tambah("Tulis", teks("wt", 150, 172, "tujuh", 14, W.ungu))),
    k(SUARA_L4, tambah("Betul!", emo("ok", 60, 110, "✅", 36)), tambah("tujuh", teks("lt", 150, 192, "7 layang-layang", 10, W.hijau)), tambah("Hebat", emo("ow", 240, 110, "\u{1F989}", 34))),
  ],
};

/* ------------------------------ 3. Latihan 2: nol dan tiga ------------------------------ */
const SUARA_M1 = "Latihan dua. Kotak pensil pertama berisi tiga pensil, kotak pensil kedua kosong. Ayo kita hitung pensilnya.";
const SUARA_M2 = "Hitung pensil di kotak pertama. Satu, dua, tiga.";
const SUARA_M3 = "Kotak kedua kosong. Banyak pensilnya nol. Tulis angka nol.";
const SUARA_M4 = "Jawabannya tiga dan nol. Hebat sekali!";
const PM: Titik[] = [50, 75, 100].map((x) => ({ x, y: 90 }));

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: kotak pensil",
  sumber: "Materi: latihan nol",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Latihan 2")),
      tambah("pertama", ...keranjang("kp1", 20, 100, 110, 44), ...deret("pensil", "pm", PM, 11)),
      tambah("kedua", ...keranjang("kp2", 170, 100, 110, 44)),
    ),
    k(SUARA_M2, ...hitungAksi(SUARA_M2, "pm", PM, "pertama.")),
    k(SUARA_M3, sorotkan("kedua", "kp2"), tambah("nol.", teks("m0", 225, 172, "0", 30, W.merah)), tambah("Tulis", teks("m0t", 225, 192, "nol", 10, W.ungu))),
    k(SUARA_M4, tambah("tiga", teks("m3", 75, 172, "3", 30, W.merah)), tambah("Hebat", emo("ow", 150, 180, "\u{1F989}", 30))),
  ],
};

/* ------------------------------ 4. Latihan 3: lihat sekilas ------------------------------ */
const SUARA_K1 = "Latihan tiga. Lihat kartu ini sekilas. Ada berapa titik?";
const SUARA_K2 = "Jangan menghitung dulu. Lihat sekilas, lalu jawab.";
const SUARA_K3 = "Empat titik! Sekarang kita cek dengan menghitung. Satu, dua, tiga, empat.";
const SUARA_K4 = "Betul, ada empat titik. Banyak yang kecil bisa dikenali sekilas.";
const cekPos = urutKata(SUARA_K3, ["satu", "dua", "tiga", "empat"], "menghitung.");

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: lihat sekilas",
  sumber: "Materi: latihan lihat sekilas",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_K1, tambah(0, judul("Latihan 3")), tambah("kartu", ...kartuTitik("lk", 110, 44, 4, 80)), tambah("berapa", emo("tn", 150, 170, "❓", 30))),
    k(SUARA_K2, hapus(0, "tn"), tambah("Jangan", emo("mt", 150, 170, "\u{1F440}", 32)), sorotkan("sekilas,", "lk-k")),
    k(SUARA_K3, hapus(0, "mt"), ...cekPos.map((p, i) => tambah(p, teks(`ck${i}`, 96 + i * 36, 152, String(i + 1), 18, W.merah))), ...[0, 1, 2, 3].map((i) => sorotkan(cekPos[i], `lk-t${i}`))),
    k(SUARA_K4, tambah("Betul,", teks("jw", 240, 100, "4", 44, W.hijau)), tambah("Banyak", emo("ow", 56, 100, "\u{1F989}", 34))),
  ],
};

/* ------------------------------ 5. Penutup ------------------------------ */
const SUARA_P1 = "Mari kita ingat lagi. Menghitung benda: sentuh satu benda, sebut satu angka. Ayo, kita ulangi bersama-sama.";
const SUARA_P2 = "Angka terakhir yang disebut adalah banyaknya. Kalau tidak ada benda, banyaknya nol. Ingat selalu dua hal ini, ya.";
const SUARA_P3 = "Kita juga bisa membaca nama angka dan menulis angkanya, dari nol sampai sepuluh. Kamu pasti bisa melakukannya sendiri.";
const SUARA_P4 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_P1, tambah(0, judul("Mari ingat lagi")), tambah("sentuh", ...kartu("p1", 14, 34, 272, 34, W.hijauMuda, ["sentuh satu, sebut satu angka"], 9.6), emo("p1e", 276, 62, "\u{1F446}", 18))),
    k(
      SUARA_P2,
      tambah("terakhir", ...kartu("p2", 14, 78, 272, 34, W.langit, ["angka terakhir = banyaknya"], 9.6)),
      tambah("Kalau", ...kartu("p3", 14, 122, 272, 34, W.krem, ["tidak ada benda: banyaknya nol"], 9.6)),
    ),
    k(SUARA_P3, tambah("membaca", ...kartu("p4", 14, 166, 272, 28, W.pink, ["baca dan tulis: 0 sampai 10"], 9.6))),
    k(SUARA_P4, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, "\u{1F989}", 56)), tambah("anak-anak!", emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
