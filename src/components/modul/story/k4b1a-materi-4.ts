import type { AdeganStory } from "./logika-story";
import { OWL, W, anak, emo, judul, kartu } from "./k4b1a-gambar";
import { bersih, hias, hapus, idPilihan, idx, k, pilihBaris, pilihKata, sorotkan, tambah, ubah } from "./k4b1a-bantu";

/* Rujukan topik: Matematika untuk SD/MI Kelas IV, Bab 1 Sub-Bab A, latihan membaca dan menulis bilangan (hlm. buku siswa 10 sampai 12). Soal, tokoh, dan angka orisinal IGIL. */

/* ------------------------------ Latihan 1: membaca bilangan ------------------------------ */
const SUARA_L1 = "Latihan satu. Wei mendapat skor seperti di layar. Bagaimana cara membacanya?";
const SUARA_L2 = "Pilih nama bilangan yang tepat untuk skor Wei.";
const SUARA_L3 = "Betul! Enam ribu sembilan ratus empat. Tempat puluhan berisi nol, jadi tidak dibaca.";
const SUARA_L4 = "Periksa lagi: ribuan enam, ratusan sembilan, puluhan nol, satuan empat. Cocok dengan jawabannya.";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: membaca bilangan",
  sumber: "Materi: Latihan satu",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_L1, tambah(0, judul("Latihan 1")), hias(), tambah(idx(SUARA_L1, "Wei"), ...anak("wei", 40, 56)), tambah(idx(SUARA_L1, "skor"), ...kartu("bl", 95, 36, 150, 46, W.krem, ["6.904"], 28))),
    k(SUARA_L2, tambah(idx(SUARA_L2, "Pilih"), ...pilihBaris(112, ["sembilan ribu enam ratus empat", "enam ribu sembilan ratus empat", "enam ribu sembilan puluh empat"], 10))),
    k(SUARA_L3, sorotkan(idx(SUARA_L3, "Betul!"), "c2-k")),
    k(SUARA_L4, hapus(0, ...idPilihan(3)), tambah(idx(SUARA_L4, "Periksa"), ...kartu("nm", 20, 112, 260, 46, W.emas, ["enam ribu sembilan ratus", "empat"], 12))),
  ],
};

/* ------------------------------ Latihan 2: menulis bilangan ------------------------------ */
const SUARA_M1 = "Latihan dua. Upe mendengar nama bilangan delapan ribu lima puluh enam. Ia ingin menulisnya.";
const SUARA_M2 = "Ketuk bilangan yang tepat untuk nama itu.";
const SUARA_M3 = "Betul! Tempat ratusan tidak disebut, jadi di sana ditulis nol.";
const SUARA_M4 = "Periksa: delapan ribu, lalu lima puluh enam, dan tempat ratusan nol.";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: menulis bilangan",
  sumber: "Materi: Latihan dua",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_M1, tambah(0, judul("Latihan 2")), hias(), tambah(idx(SUARA_M1, "Upe"), ...anak("upe", 40, 56)), tambah(idx(SUARA_M1, "delapan"), ...kartu("nm", 90, 38, 190, 46, W.krem, ["delapan ribu", "lima puluh enam"], 12))),
    k(SUARA_M2, tambah(idx(SUARA_M2, "Ketuk"), ...pilihKata(128, ["8.056", "8.560", "8.506"], 16))),
    k(SUARA_M3, sorotkan(idx(SUARA_M3, "Betul!"), "c1-k"), tambah(idx(SUARA_M3, "nol."), emo("ok", 150, 190, "✅", 24))),
    k(SUARA_M4, hapus(0, "ok", "c2-k", "c2-t", "c3-k", "c3-t"), tambah(idx(SUARA_M4, "Periksa:"), ...kartu("bl", 90, 150, 120, 36, W.hijauMuda, ["8.056"], 22))),
  ],
};

/* ------------------------------ Latihan 3: seribu dan nol ------------------------------ */
const SUARA_N1 = "Latihan tiga. Halim melihat bilangan di layar. Ia harus membacanya dengan tepat.";
const SUARA_N2 = "Ingat aturan angka satu dan angka nol. Pilih cara membaca yang tepat.";
const SUARA_N3 = "Betul! Seribu empat ratus sembilan. Angka satu di ribuan dibaca seribu, dan puluhan nol dilewati.";
const SUARA_N4 = "Dua jawaban lain keliru. Satu salah menyebut ribuan, satu lagi salah pada puluhan.";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: seribu dan nol",
  sumber: "Materi: Latihan tiga",
  latar: "#FDF4FF",
  ketukan: [
    k(SUARA_N1, tambah(0, judul("Latihan 3")), hias(), tambah(idx(SUARA_N1, "Halim"), ...anak("halim", 40, 56)), tambah(idx(SUARA_N1, "bilangan"), ...kartu("bl", 95, 36, 150, 46, W.krem, ["1.409"], 28))),
    k(SUARA_N2, tambah(idx(SUARA_N2, "Pilih"), ...pilihBaris(112, ["satu ribu empat ratus sembilan", "seribu empat ratus sembilan puluh", "seribu empat ratus sembilan"], 10))),
    k(SUARA_N3, sorotkan(idx(SUARA_N3, "Betul!"), "c3-k"), tambah(idx(SUARA_N3, "dilewati."), emo("ok", 272, 100, "✅", 22))),
    k(SUARA_N4, hapus(0, "ok"), ubah(idx(SUARA_N4, "lain"), { id: "c1-k", op: 0.35 }, { id: "c1-t", op: 0.35 }, { id: "c2-k", op: 0.35 }, { id: "c2-t", op: 0.35 })),
  ],
};

/* ------------------------------ Latihan 4: menulis dengan nol ------------------------------ */
const SUARA_P1 = "Latihan empat. Malosi mendengar tiga ribu empat ratus. Ia akan menuliskannya dengan angka.";
const SUARA_P2 = "Perhatikan tempat puluhan dan satuan. Pilih tulisan yang tepat.";
const SUARA_P3 = "Betul! Ratusan berisi empat. Puluhan dan satuan tidak disebut, jadi keduanya nol.";
const SUARA_P4 = "Periksa: empat ratus ada di tempat ratusan, bukan di puluhan.";

export const ADEGAN_LATIHAN_EMPAT: AdeganStory = {
  id: "latihan-empat",
  judul: "Latihan 4: menulis dengan nol",
  sumber: "Materi: Latihan empat",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_P1, tambah(0, judul("Latihan 4")), hias(), tambah(idx(SUARA_P1, "Malosi"), ...anak("malosi", 40, 56)), tambah(idx(SUARA_P1, "tiga"), ...kartu("nm", 90, 38, 190, 46, W.krem, ["tiga ribu", "empat ratus"], 12))),
    k(SUARA_P2, tambah(idx(SUARA_P2, "Pilih"), ...pilihKata(128, ["3.040", "3.400", "3.004"], 16))),
    k(SUARA_P3, sorotkan(idx(SUARA_P3, "Betul!"), "c2-k"), tambah(idx(SUARA_P3, "nol."), emo("ok", 150, 190, "✅", 24))),
    k(SUARA_P4, hapus(0, "ok", "c1-k", "c1-t", "c3-k", "c3-t"), tambah(idx(SUARA_P4, "Periksa:"), ...kartu("bl", 90, 150, 120, 36, W.hijauMuda, ["3.400"], 22))),
  ],
};

/* ------------------------------ Penutup ------------------------------ */
const SUARA_Y1 = "Mari kita ingat lagi. Ada empat langkah untuk membaca dan menulis bilangan empat angka.";
const SUARA_Y2 = "Langkah satu, lihat tempat tiap angka: ribuan, ratusan, puluhan, dan satuan.";
const SUARA_Y3 = "Langkah dua, baca dari kiri ke kanan dengan nama tempatnya.";
const SUARA_Y4 = "Langkah tiga, angka nol dilewati saat membaca, tetapi ditulis saat menulis.";
const SUARA_Y5 = "Langkah empat, beri titik setelah ribuan supaya bilangan mudah dibaca.";
const SUARA_Y6 = "Hebat! Kini kamu mampu menyebut dan menuliskan bilangan hingga sepuluh ribu.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Y1, tambah(0, judul("Empat langkah")), hias(), tambah(idx(SUARA_Y1, "langkah"), emo("ow", 150, 100, OWL, 54))),
    k(SUARA_Y2, bersih(0), tambah(0, judul("Empat langkah")), hias(), tambah(idx(SUARA_Y2, "lihat"), ...kartu("y1", 14, 36, 272, 30, W.langit, ["1. lihat tempat tiap angka"], 10))),
    k(SUARA_Y3, tambah(idx(SUARA_Y3, "baca"), ...kartu("y2", 14, 74, 272, 30, W.hijauMuda, ["2. baca dari kiri ke kanan"], 10))),
    k(SUARA_Y4, tambah(idx(SUARA_Y4, "nol"), ...kartu("y3", 14, 112, 272, 30, W.pink, ["3. nol: dilewati, tetapi ditulis"], 10))),
    k(SUARA_Y5, tambah(idx(SUARA_Y5, "titik"), ...kartu("y4", 14, 150, 272, 30, W.emas, ["4. titik setelah ribuan"], 10))),
    k(SUARA_Y6, bersih(0), tambah(0, judul("Hebat!")), hias(), tambah(idx(SUARA_Y6, "Hebat!"), emo("ow2", 150, 90, OWL, 56)), tambah(idx(SUARA_Y6, "sepuluh"), ...kartu("bl", 80, 140, 140, 40, W.emas, ["10.000"], 26))),
  ],
};
