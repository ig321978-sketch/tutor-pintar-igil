import type { AdeganStory } from "./logika-story";
import { OWL, W, benda, emo, garis, judul, kartu, kartuAngka, tata, teks, type Titik } from "./k1b2a-gambar";
import { bersih, hapus, hitungAksi, k, sorotkan, tambah, ubah } from "./k1b2a-bantu";

/* ------------------------------ 1. Goresan ------------------------------ */
const SUARA_G1 = "Kita juga bisa menggambar cerita dengan goresan. Ceritanya tentang empat anak dan tiga anak. Satu anak, satu goresan. Goresan membantu kita mengingat dan menghitung.";
const SUARA_G2 = "Empat goresan untuk bagian pertama. Tiga goresan untuk bagian kedua.";
const SUARA_G3 = "Sekarang kedua bagian digabung. Semua goresan berbaris menjadi satu deret yang rapi dan mudah dihitung.";
const SUARA_G4 = "Hitung goresannya: satu, dua, tiga, empat, lima, enam, tujuh. Empat ditambah tiga sama dengan tujuh.";
const SUARA_G5 = "Kalimatnya: empat ditambah tiga sama dengan tujuh. Ucapkan lagi mengikuti suara guru.";
const GX = (i: number) => 40 + 36 * i;
const GY = 60;
const gores = (i: number, x: number, y: number) => garis(`gs${i}`, x, y, 0, 26, i < 4 ? W.biru : W.merah, 4);
const PG: Titik[] = Array.from({ length: 7 }, (_, i) => ({ x: GX(i), y: GY }));
const KOLOM2 = [40, 76, 112];

export const ADEGAN_GORESAN: AdeganStory = {
  id: "goresan",
  judul: "Cerita dengan goresan",
  sumber: "Materi: goresan dan kalimat",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Goresan")),
      tambah("empat", ...[0, 1, 2, 3].map((i) => gores(i, GX(i), GY))),
      tambah("tiga", ...[4, 5, 6].map((i) => gores(i, KOLOM2[i - 4], 120))),
    ),
    k(SUARA_G2, tambah("Empat", teks("e4", 94, 104, "4", 16, W.biru)), tambah("Tiga", teks("e3", 76, 164, "3", 16, W.merah))),
    k(SUARA_G3, hapus(0, "e4", "e3"), ubah("digabung.", ...[4, 5, 6].map((i) => ({ id: `gs${i}`, x: GX(i), y: GY })))),
    k(SUARA_G4, ...hitungAksi(SUARA_G4, "gs", PG, "goresannya:")),
    k(SUARA_G5, hapus(0, "tg", "gsn0", "gsn1", "gsn2", "gsn3", "gsn4", "gsn5", "gsn6"), tambah("Kalimatnya:", ...kartu("gk", 70, 120, 160, 34, W.emas, ["4 + 3 = 7"], 15))),
  ],
};

/* ------------------------------ 2. Latihan 1: bola ------------------------------ */
const SUARA_A1 = "Latihan satu. Malosi punya tiga bola. Kira punya dua bola. Berapa jumlah semua bola?";
const SUARA_A2 = "Gabungkan bolanya, lalu hitung. Satu, dua, tiga, empat, lima.";
const SUARA_A3 = "Tiga ditambah dua sama dengan lima. Pilih jawaban yang benar di layar. Jawabannya lima.";
const SUARA_A4 = "Betul! Ada lima bola semuanya. Hebat sekali! Kamu sudah bisa menjumlahkan bola dengan benar.";
const P5 = tata(5, 96);
const bola = (i: number) => benda("bola", `lb${i}`, P5[i].x, P5[i].y, 11, i, i < 3 ? {} : { warna: W.hijau });
const pilihan = (xs: number[], isi: string[]) => xs.flatMap((x, i) => kartuAngka(`o${isi[i]}`, x, 140, isi[i], W.krem, 40, 36, 22));

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: bola Malosi dan Kira",
  sumber: "Materi: latihan menjumlahkan bola",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_A1, tambah(0, judul("Latihan 1")), tambah("tiga", ...[0, 1, 2].map(bola)), tambah("dua", ...[3, 4].map(bola))),
    k(SUARA_A2, ...hitungAksi(SUARA_A2, "lb", P5, "hitung.")),
    k(
      SUARA_A3,
      hapus(0, "tg", "lbn0", "lbn1", "lbn2", "lbn3", "lbn4"),
      tambah(0, ...kartu("lq", 85, 40, 130, 28, W.emas, ["3 + 2 = ?"], 13)),
      tambah("Pilih", ...pilihan([70, 130, 190], ["4", "5", "6"])),
      sorotkan("lima.", "o5-k"),
    ),
    k(SUARA_A4, tambah("Betul!", emo("ok", 60, 110, "✅", 36)), tambah("lima", teks("lj", 150, 196, "3 + 2 = 5", 12, W.hijau)), tambah("Hebat", emo("ow", 250, 110, OWL, 34))),
  ],
};

/* ------------------------------ 3. Latihan 2: balon ------------------------------ */
const SUARA_B1 = "Latihan dua. Wei punya enam balon. Lalu datang lagi tiga balon dari Igil. Berapa jumlah semua balon?";
const SUARA_B2 = "Hitung semua balon. Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan.";
const SUARA_B3 = "Enam ditambah tiga sama dengan sembilan. Susun kalimatnya dengan mengetuk kartu enam, tambah, tiga, sama dengan, sembilan.";
const SUARA_B4 = "Hebat! Ada sembilan balon. Sembilan masih di bawah sepuluh, jadi aman.";
const P9 = tata(9);
const balon = (i: number) => benda("balon", `lc${i}`, P9[i].x, P9[i].y, 12, i);
const TOKEN = ["6", "+", "3", "=", "9"];

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: balon Wei dan Igil",
  sumber: "Materi: latihan menyusun kalimat",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Latihan 2")), tambah("enam", ...[0, 1, 2, 3, 4, 5].map(balon)), tambah("datang", ...[6, 7, 8].map(balon))),
    k(SUARA_B2, ...hitungAksi(SUARA_B2, "lc", P9, "balon.")),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Susun kalimat")),
      ...TOKEN.map((t, i) => tambah(["Enam", "tambah,", "tiga,", "sama", "sembilan."][i], ...kartuAngka(`t${i}`, 30 + i * 48, 90, t, W.krem, 40, 40, 24))),
    ),
    k(SUARA_B4, bersih(0), tambah(0, judul("Hebat!"), emo("ow", 150, 90, OWL, 46)), tambah("sembilan", teks("bj", 150, 150, "6 + 3 = 9", 20, W.hijau)), tambah("sepuluh,", teks("b10", 150, 180, "paling banyak: 10", 10, W.ungu))),
  ],
};

/* ------------------------------ 4. Latihan 3: kupu-kupu ------------------------------ */
const SUARA_Q1 = "Latihan tiga. Dua kupu-kupu hinggap di bunga. Lalu datang enam kupu-kupu lagi. Berapa jumlah semuanya?";
const SUARA_Q2 = "Hitung semua kupu-kupu. Satu, dua, tiga, empat, lima, enam, tujuh, delapan.";
const SUARA_Q3 = "Dua ditambah enam sama dengan berapa? Pilih kartu angka yang tepat untuk kotak yang kosong. Pikirkan dulu dengan tenang.";
const SUARA_Q4 = "Betul, delapan! Kamu sudah bisa menyusun kalimat penjumlahan sendiri.";
const P8 = tata(8);
const kupu = (i: number) => emo(`kp${i}`, P8[i].x, P8[i].y, "\u{1F98B}", 26);

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: kupu-kupu di taman",
  sumber: "Materi: latihan kalimat tambah",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_Q1, tambah(0, judul("Latihan 3")), tambah("Dua", ...[0, 1].map(kupu)), tambah("enam", ...[2, 3, 4, 5, 6, 7].map(kupu))),
    k(SUARA_Q2, ...hitungAksi(SUARA_Q2, "kp", P8, "kupu-kupu.")),
    k(
      SUARA_Q3,
      hapus(0, "tg", "kpn0", "kpn1", "kpn2", "kpn3", "kpn4", "kpn5", "kpn6", "kpn7"),
      ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => ubah(0, { id: `kp${i}`, op: 0.35 })),
      tambah(0, ...kartu("qq", 70, 150, 160, 32, W.emas, ["2 + 6 = ?"], 15)),
      tambah("Pilih", ...[7, 8, 9].flatMap((n, i) => kartuAngka(`q${n}`, 66 + i * 60, 96, String(n), W.krem, 40, 36, 22))),
    ),
    k(SUARA_Q4, hapus(0, "qq-k", "qq-t0"), sorotkan("delapan!", "q8-k"), tambah("Betul,", ...kartu("qj", 70, 150, 160, 32, W.hijauMuda, ["2 + 6 = 8"], 15)), tambah("Kamu", emo("ow", 262, 60, OWL, 30))),
  ],
};

/* ------------------------------ 5. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi. Menjumlahkan artinya menggabungkan benda, atau benda yang bertambah. Ucapkan lagi mengikuti suara guru.";
const SUARA_Z2 = "Kita menulis kalimat tambah dengan tanda tambah dan tanda sama dengan. Contohnya empat ditambah dua sama dengan enam.";
const SUARA_Z3 = "Jumlahnya paling banyak sepuluh. Kamu bisa menggabungkan benda di layar, lalu menghitung semuanya dengan teliti.";
const SUARA_Z4 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Mari ingat lagi")), tambah("menggabungkan", ...kartu("z1", 14, 34, 272, 34, W.hijauMuda, ["digabung atau bertambah"], 9.6))),
    k(SUARA_Z2, tambah("Kita", ...kartu("z2", 14, 78, 272, 34, W.langit, ["tanda + dan tanda ="], 9.6)), tambah("Contohnya", ...kartu("z3", 14, 122, 272, 34, W.krem, ["4 + 2 = 6"], 12))),
    k(SUARA_Z3, tambah("paling", ...kartu("z4", 14, 166, 272, 28, W.pink, ["jumlah paling banyak: 10"], 9.6))),
    k(SUARA_Z4, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, OWL, 56)), tambah("anak-anak!", emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
