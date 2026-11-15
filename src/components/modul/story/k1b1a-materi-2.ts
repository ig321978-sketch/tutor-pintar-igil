import type { AdeganStory } from "./logika-story";
import { W, bingkai, deret, emo, judul, kartu, kartuAngka, kartuTitik, tata, teks, tulisAngka } from "./k1b1a-gambar";
import { KATA_ANGKA, bersih, hapus, hitungAksi, k, sorotkan, tambah, urutKata } from "./k1b1a-bantu";

/* ------------------------------ 1. Kenali banyaknya sekilas ------------------------------ */
const SUARA_S1 = "Kadang kita tidak perlu menghitung satu per satu. Lihat kartu ini sekilas saja. Ayo, buka mata lebar-lebar.";
const SUARA_S2 = "Tiga titik. Kita langsung tahu ini tiga, tanpa menghitung.";
const SUARA_S3 = "Sekarang kartu empat titik. Empat titik seperti sudut-sudut kotak.";
const SUARA_SX = "Mata kita pintar. Titik yang sedikit bisa langsung dikenali, seperti saat kamu melihat dadu.";
const SUARA_S4 = "Lalu kartu lima titik. Seperti angka lima pada dadu. Pasti kamu pernah melihatnya saat bermain.";
const SUARA_S5 = "Benda yang sedikit bisa dikenali sekilas. Kalau banyak, kita hitung satu per satu. Pilih cara yang paling cocok.";

export const ADEGAN_SEKILAS: AdeganStory = {
  id: "sekilas",
  judul: "Mengenali banyaknya sekilas",
  sumber: "Materi: kenali banyak sekilas",
  latar: "#FAF5FF",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Lihat sekilas")),
      tambah("kartu", ...kartuTitik("s3", 118, 52, 3, 64)),
      tambah("sekilas", emo("mt", 150, 150, "\u{1F440}", 30)),
    ),
    k(
      SUARA_S2,
      tambah("langsung", teks("a3", 150, 150, "3", 30, W.merah)),
      tambah("tanpa", ...kartu("tm", 60, 164, 180, 26, W.krem, ["tanpa menghitung"], 9.4)),
    ),
    k(SUARA_SX, sorotkan("pintar.", "s3-k"), tambah("dadu.", emo("dd", 240, 100, "\u{1F3B2}", 36))),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Empat titik"), ...kartuTitik("s4", 118, 52, 4, 64)),
      tambah("Empat", teks("a4", 150, 150, "4", 30, W.merah)),
      sorotkan("sudut-sudut", "s4-t0", "s4-t1", "s4-t2", "s4-t3"),
    ),
    k(
      SUARA_S4,
      bersih(0),
      tambah(0, judul("Tiga, empat, lima"), ...kartuTitik("t3", 30, 50, 3, 56), ...kartuTitik("t4", 122, 50, 4, 56)),
      tambah(0, teks("l3", 58, 134, "3", 22, W.merah), teks("l4", 150, 134, "4", 22, W.merah)),
      tambah("lima", ...kartuTitik("t5", 214, 50, 5, 56)),
      tambah("angka", teks("l5", 242, 134, "5", 22, W.merah)),
    ),
    k(
      SUARA_S5,
      bersih(0),
      tambah(0, judul("Sedikit atau banyak?"), ...kartuTitik("sk", 40, 50, 3, 56)),
      tambah("sedikit", teks("sl", 68, 132, "sedikit: sekilas", 8.6, W.hijau)),
      tambah("banyak,", ...kartuTitik("bk", 190, 50, 8, 64)),
      tambah("hitung", teks("bl", 222, 140, "banyak: hitung", 8.6, W.merah)),
    ),
  ],
};

/* ------------------------------ 2. Hitung sampai sepuluh ------------------------------ */
const SUARA_B1 = "Wei menghitung benda di taman. Ada enam balon. Satu, dua, tiga, empat, lima, enam.";
const SUARA_B2 = "Lalu ada tujuh pensil. Satu, dua, tiga, empat, lima, enam, tujuh.";
const SUARA_B3 = "Ada delapan layang-layang. Satu, dua, tiga, empat, lima, enam, tujuh, delapan.";
const SUARA_B4 = "Ada sembilan kelereng. Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan.";
const SUARA_B5 = "Terakhir ada sepuluh bola. Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh.";
const SUARA_B6 = "Sepuluh adalah bilangan terakhir yang kita pelajari hari ini. Hebat sekali! Kamu sudah bisa menghitung sampai sepuluh.";

export const ADEGAN_SEPULUH: AdeganStory = {
  id: "sampai-sepuluh",
  judul: "Menghitung sampai sepuluh",
  sumber: "Materi: hitung sampai sepuluh",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Hitung sampai sepuluh"), ...deret("balon", "e", tata(6), 12)), ...hitungAksi(SUARA_B1, "e", tata(6), "balon.")),
    k(SUARA_B2, bersih(0), tambah(0, judul("Hitung sampai sepuluh"), ...deret("pensil", "f", tata(7), 11)), ...hitungAksi(SUARA_B2, "f", tata(7), "pensil.")),
    k(SUARA_B3, bersih(0), tambah(0, judul("Hitung sampai sepuluh"), ...deret("layang", "g", tata(8), 11)), ...hitungAksi(SUARA_B3, "g", tata(8), "layang-layang.")),
    k(SUARA_B4, bersih(0), tambah(0, judul("Hitung sampai sepuluh"), ...deret("kelereng", "h", tata(9), 17)), ...hitungAksi(SUARA_B4, "h", tata(9), "kelereng.")),
    k(SUARA_B5, bersih(0), tambah(0, judul("Hitung sampai sepuluh"), ...deret("bola", "i", tata(10), 10)), ...hitungAksi(SUARA_B5, "i", tata(10), "bola.")),
    k(
      SUARA_B6,
      bersih(0),
      tambah(0, teks("s10", 150, 148, "10", 34, W.merah)),
      tambah("bilangan", judul("Bingkai sepuluh"), ...bingkai("bf", 85, 44, 10, 26)),
      tambah("Hebat", emo("ow", 252, 176, "\u{1F989}", 30)),
    ),
  ],
};

/* ------------------------------ 3. Membaca nama angka ------------------------------ */
const SUARA_R1 = "Setiap bilangan punya nama. Ini kartu angka nol, satu, dua, tiga, empat, lima.";
const SUARA_R2 = "Ayo baca bersama. Nol, satu, dua, tiga, empat, lima.";
const SUARA_R3 = "Lanjut ke kartu enam, tujuh, delapan, sembilan, dan sepuluh.";
const SUARA_R4 = "Sekarang kita baca namanya. Enam, tujuh, delapan, sembilan, sepuluh.";
const SUARA_RX = "Perhatikan bentuk angkanya. Angka nol bulat, angka satu seperti tongkat, dan angka tujuh miring ke bawah.";
const SUARA_R5 = "Sekarang tebak. Angka ini dibaca apa? Lihat baik-baik. Jangan buru-buru menjawab.";
const SUARA_R6 = "Betul, ini dibaca tujuh. Kamu pintar, ya!";
const NAMA = ["nol", ...KATA_ANGKA];
const WARNA_KARTU = [W.merahMuda, W.langit, W.hijauMuda, W.krem, W.pink, W.lavender];
const posisiKartu = (i: number) => (i < 6 ? { x: 12 + i * 46, y: 32 } : { x: 12 + (i - 6) * 46, y: 102 });
const kartuKe = (i: number) => kartuAngka(`r${i}`, posisiKartu(i).x, posisiKartu(i).y, String(i), WARNA_KARTU[i % 6], 40, 36, 22);
const namaKe = (i: number) => teks(`rn${i}`, posisiKartu(i).x + 20, posisiKartu(i).y + 46, NAMA[i], 8, W.biru);
const pos1 = urutKata(SUARA_R1, NAMA.slice(0, 6), "angka");
const pos2 = urutKata(SUARA_R2, NAMA.slice(0, 6), "bersama.");
const pos3 = urutKata(SUARA_R3, NAMA.slice(6), "kartu");
const pos4 = urutKata(SUARA_R4, NAMA.slice(6), "namanya.");

export const ADEGAN_BACA: AdeganStory = {
  id: "baca-nama",
  judul: "Membaca nama angka",
  sumber: "Materi: baca nama angka",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Kartu angka nol sampai sepuluh")), ...pos1.map((p, i) => tambah(p, kartuKe(i)))),
    k(SUARA_R2, ...pos2.map((p, i) => tambah(p, namaKe(i)))),
    k(SUARA_R3, ...pos3.map((p, i) => tambah(p, kartuKe(i + 6)))),
    k(SUARA_R4, ...pos4.map((p, i) => tambah(p, namaKe(i + 6)))),
    k(SUARA_RX, sorotkan("nol", "r0-k"), sorotkan("satu", "r1-k"), sorotkan("tujuh", "r7-k")),
    k(
      SUARA_R5,
      bersih(0),
      tambah(0, judul("Tebak angkanya")),
      tambah("tebak.", ...kartuAngka("q", 100, 46, "7", W.krem, 100, 90, 60)),
      tambah("dibaca", teks("qt", 150, 168, "dibaca apa?", 14, W.ungu)),
    ),
    k(SUARA_R6, hapus(0, "qt"), tambah("tujuh.", teks("qj", 150, 168, "tujuh", 24, W.hijau)), tambah("pintar,", emo("ow", 250, 180, "\u{1F989}", 30))),
  ],
};

/* ------------------------------ 4. Menulis angka ------------------------------ */
const SUARA_W1 = "Sekarang kita belajar menulis angka. Tulis pelan-pelan dan rapi. Pegang pensil dengan nyaman.";
const SUARA_W2 = "Angka satu: tarik garis lurus dari atas ke bawah.";
const SUARA_W3 = "Angka dua: melengkung dulu, lalu turun, lalu garis mendatar.";
const SUARA_W4 = "Angka tiga: dua lengkungan yang bersusun ke bawah.";
const SUARA_WX = "Latihan menulis butuh waktu. Kalau tulisanmu belum bagus, tidak apa-apa. Ulangi lagi sampai rapi.";
const SUARA_W5 = "Angka sepuluh ditulis dengan angka satu dan angka nol. Satu di depan, nol di belakangnya.";
const SUARA_W6 = "Ayo menulis angka di kertas. Hitung bendanya dulu, lalu tulis angkanya. Jangan lupa, tulis dengan rapi.";

export const ADEGAN_TULIS: AdeganStory = {
  id: "tulis-angka",
  judul: "Menulis angka",
  sumber: "Materi: tulis angka",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_W1,
      tambah(0, judul("Menulis angka"), emo("pn", 150, 112, "✏️", 56)),
      tambah("pelan-pelan", ...kartu("pl", 60, 140, 180, 28, W.krem, ["pelan dan rapi"], 10)),
    ),
    k(SUARA_W2, bersih(0), tambah(0, judul("Angka satu")), tambah("tarik", ...tulisAngka("w", 124, 50, "1", 2)), tambah("bawah.", teks("wt", 150, 172, "satu", 14, W.ungu))),
    k(SUARA_W3, bersih(0), tambah(0, judul("Angka dua")), tambah("melengkung", ...tulisAngka("w", 124, 50, "2", 2)), tambah("mendatar.", teks("wt", 150, 172, "dua", 14, W.ungu))),
    k(SUARA_W4, bersih(0), tambah(0, judul("Angka tiga")), tambah("dua", ...tulisAngka("w", 124, 50, "3", 2)), tambah("bersusun", teks("wt", 150, 172, "tiga", 14, W.ungu))),
    k(SUARA_WX, tambah("Latihan", emo("sm", 52, 110, "\u{1F4AA}", 34)), tambah("Ulangi", emo("sn", 248, 110, "\u{1F31F}", 34))),
    k(SUARA_W5, bersih(0), tambah(0, judul("Angka sepuluh")), tambah("ditulis", ...tulisAngka("w", 92, 50, "10", 2)), tambah("nol.", teks("wt", 150, 172, "10 dibaca sepuluh", 14, W.ungu))),
    k(
      SUARA_W6,
      bersih(0),
      tambah(0, judul("Hitung, lalu tulis")),
      tambah("Hitung", ...deret("bola", "wb", tata(5, 48), 9)),
      tambah("tulis", ...tulisAngka("w", 132, 78, "5", 1.8)),
      tambah("angkanya.", teks("wt", 150, 190, "lima", 12, W.ungu)),
    ),
  ],
};
