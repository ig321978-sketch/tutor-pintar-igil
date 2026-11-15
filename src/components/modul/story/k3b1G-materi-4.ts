import type { AdeganStory } from "./logika-story";
import { W, bagian, bagikan, emo, hbAtas, jumlahBagian, judul, kartu, teks, tumpukan } from "./k3b1G-gambar";
import { idx, k, tambah, ubah } from "./k3b1G-bantu";

/* ------------------------------ 12. Dibagi satu ------------------------------ */
const SUARA_O1 = "Bagaimana kalau bilangan dibagi satu? Wei punya lima bintang dan satu piring.";
const SUARA_O2 = "Semua bintang masuk ke satu piring. Wei mendapat lima bintang.";
const SUARA_O3 = "Lima dibagi satu sama dengan lima. Jadi bilangan dibagi satu hasilnya bilangan itu sendiri.";
const SUARA_O4 = "Coba lagi dengan bilangan lain. Sepuluh dibagi satu sama dengan sepuluh.";
const SUARA_O5 = "Hasilnya selalu bilangan itu sendiri. Membagi dengan satu tidak mengubah bilangan.";

export const ADEGAN_DIBAGI_SATU: AdeganStory = {
  id: "dibagi-satu",
  judul: "Bilangan dibagi satu",
  sumber: "Materi: dibagi satu",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Dibagi satu")), tambah(idx(SUARA_O1, "lima"), ...tumpukan("bintang", 5)), tambah(idx(SUARA_O1, "satu", 2), ...bagian(["Wei"]))),
    k(SUARA_O2, ubah(idx(SUARA_O2, "masuk"), bagikan("bintang", 1, 1, 5)), tambah(idx(SUARA_O2, "lima"), jumlahBagian(0, 1, 5))),
    k(SUARA_O3, tambah(0, hbAtas("5 : 1 = 5"))),
    k(SUARA_O4, tambah(idx(SUARA_O4, "Sepuluh"), teks("hb2", 150, 66, "10 : 1 = 10", 12, W.merah))),
    k(SUARA_O5, tambah(idx(SUARA_O5, "selalu"), emo("ok", 262, 66, "✅", 24))),
  ],
};

/* ------------------------------ 13. Dibagi bilangan yang sama ------------------------------ */
const SUARA_M1 = "Sekarang ada enam bintang dan enam anak, yaitu Malosi, Kira, Upe, Wei, Halim, dan Igil.";
const SUARA_M2 = "Bintang dibagi sama banyak untuk keenam anak itu. Satu bintang untuk setiap anak.";
const SUARA_M3 = "Setiap anak mendapat satu bintang, tidak lebih dan tidak kurang.";
const SUARA_M4 = "Enam dibagi enam sama dengan satu. Bilangan dibagi bilangan yang sama hasilnya satu.";
const SUARA_M5 = "Sepuluh dibagi sepuluh sama dengan satu, dan dua puluh dibagi dua puluh sama dengan satu.";

export const ADEGAN_DIBAGI_SAMA: AdeganStory = {
  id: "dibagi-sama",
  judul: "Bilangan dibagi bilangan yang sama",
  sumber: "Materi: dibagi bilangan yang sama",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_M1, tambah(0, judul("Enam bintang, enam anak")), tambah(idx(SUARA_M1, "enam"), ...tumpukan("bintang", 6)), tambah(idx(SUARA_M1, "yaitu"), ...bagian(["Malosi", "Kira", "Upe", "Wei", "Halim", "Igil"]))),
    k(SUARA_M2, ubah(idx(SUARA_M2, "Satu"), bagikan("bintang", 6, 1, 6))),
    k(SUARA_M3, tambah(idx(SUARA_M3, "satu"), ...[0, 1, 2, 3, 4, 5].map((g) => jumlahBagian(g, 6, 1)))),
    k(SUARA_M4, tambah(0, hbAtas("6 : 6 = 1"))),
    k(SUARA_M5, tambah(idx(SUARA_M5, "Sepuluh"), teks("hb2", 150, 62, "10 : 10 = 1", 12, W.merah)), tambah(idx(SUARA_M5, "dua"), teks("hb3", 150, 44, "20 : 20 = 1", 12, W.merah))),
  ],
};

/* ------------------------------ 14. Soal cerita ------------------------------ */
const SUARA_Q1 = "Sekarang kita pakai pembagian pada soal cerita. Halim punya dua puluh empat bunga untuk dibagi sama banyak ke empat vas.";
const SUARA_Q2 = "Langkah pertama, cari bilangan yang dibagi. Itu banyak bunga seluruhnya, yaitu dua puluh empat.";
const SUARA_Q3 = "Langkah kedua, cari pembagi. Itu banyak vas, yaitu empat.";
const SUARA_Q4 = "Langkah ketiga, hitung. Dua puluh empat dibagi empat sama dengan enam.";
const SUARA_Q5 = "Langkah keempat, periksa dengan kali. Enam kali empat sama dengan dua puluh empat.";
const SUARA_Q6 = "Jadi jawabannya, setiap vas berisi enam bunga.";

export const ADEGAN_SOAL_CERITA: AdeganStory = {
  id: "soal-cerita",
  judul: "Soal cerita pembagian",
  sumber: "Materi: soal cerita pembagian",
  latar: "#FFF1F2",
  ketukan: [
    k(SUARA_Q1, tambah(0, judul("Soal cerita")), tambah(idx(SUARA_Q1, "Halim"), ...kartu("so", 14, 28, 272, 26, W.emas, ["24 bunga dibagi ke 4 vas"], 11))),
    k(SUARA_Q2, tambah(idx(SUARA_Q2, "Langkah"), ...kartu("st1", 14, 62, 170, 24, W.hijauMuda, ["1. yang dibagi: 24"], 9.5))),
    k(SUARA_Q3, tambah(idx(SUARA_Q3, "Langkah"), ...kartu("st2", 14, 90, 170, 24, W.langit, ["2. pembagi: 4"], 9.5))),
    k(SUARA_Q4, tambah(idx(SUARA_Q4, "Langkah"), ...kartu("st3", 14, 118, 170, 24, W.pink, ["3. hitung"], 9.5)), tambah(idx(SUARA_Q4, "Dua"), teks("hb", 240, 134, "24 : 4 = 6", 12, W.merah))),
    k(SUARA_Q5, tambah(idx(SUARA_Q5, "Langkah"), ...kartu("st4", 14, 146, 170, 24, W.krem, ["4. periksa dengan kali"], 9.5)), tambah(idx(SUARA_Q5, "Enam"), teks("pr", 240, 162, "6 × 4 = 24", 12, W.ungu))),
    k(SUARA_Q6, tambah(idx(SUARA_Q6, "jawabannya,"), ...kartu("jw", 14, 176, 272, 24, W.emas, ["tiap vas: 6 bunga"], 11))),
  ],
};
