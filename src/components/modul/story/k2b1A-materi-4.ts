import type { AdeganStory, Obj } from "./logika-story";
import { EMO_BIRU, OWL, W, angkaKotak, batangP, benda, emo, jalur, judul, kartu, kotakSepuluh, kubusS, letakKotak, namaG, nilaiV, titikKotak } from "./k2b1A-gambar";
import { bersih, idx, k, pilihKata, redamkan, sorotJalur, sorotkan, tambah, ubah } from "./k2b1A-bantu";

/* ------------------------------ 13. Latihan 1: menghitung per sepuluh ------------------------------ */
const Y_L = 40;
const N_L = 43;
const SUARA_A1 = "Latihan satu. Malosi menaruh kelereng di kotak sepuluh. Mari kita hitung per sepuluh.";
const SUARA_A2 = "Empat kotak penuh, yaitu empat puluh. Kotak terakhir berisi tiga kelereng.";
const SUARA_A3 = "Pilih jawabannya. Ada berapa kelereng semuanya? Ketuk bilangan yang tepat.";
const SUARA_A4 = "Betul! Empat puluh ditambah tiga sama dengan empat puluh tiga. Hebat!";
const kelereng = (i: number): Obj => benda("a", i, titikKotak(i, Y_L).x, titikKotak(i, Y_L).y, EMO_BIRU, 15);

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: menghitung per sepuluh",
  sumber: "Materi: latihan menghitung",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Latihan 1")),
      tambah(idx(SUARA_A1, "kotak"), namaG("a", 4, 34, "Kelereng"), ...[0, 1, 2, 3, 4].flatMap((f) => kotakSepuluh("a", f, letakKotak(f, Y_L)))),
      tambah(idx(SUARA_A1, "hitung"), ...Array.from({ length: N_L }, (_, i) => kelereng(i))),
      tambah(idx(SUARA_A1, "sepuluh", 2), angkaKotak("a", 0, "10", Y_L)),
    ),
    k(SUARA_A2, tambah(idx(SUARA_A2, "puluh."), angkaKotak("a", 3, "40", Y_L)), tambah(idx(SUARA_A2, "berisi"), angkaKotak("a", 4, "43", Y_L))),
    k(SUARA_A3, tambah(idx(SUARA_A3, "jawabannya."), ...pilihKata(150, ["42", "43", "44"])), sorotkan(idx(SUARA_A3, "Ketuk"), "c2-k")),
    k(SUARA_A4, tambah(idx(SUARA_A4, "ditambah"), ...kartu("eq", 206, 96, 90, 28, W.emas, ["40 + 3 = 43"], 10)), tambah(idx(SUARA_A4, "Hebat!"), emo("ow", 150, 198, OWL, 20))),
  ],
};

/* ------------------------------ 14. Latihan 2: membaca balok ------------------------------ */
const SUARA_B1 = "Latihan dua. Halim menyusun balok. Lihat batang puluhan dan kubus satuannya.";
const SUARA_B2 = "Ada tiga batang puluhan dan delapan kubus satuan.";
const SUARA_B3 = "Pilih jawabannya. Bilangan berapa yang ditunjukkan balok ini? Ketuk lambang yang tepat.";
const SUARA_B4 = "Betul! Tiga puluh delapan itu tiga puluhan dan delapan satuan. Hebat!";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: membaca balok",
  sumber: "Materi: latihan membaca bilangan",
  latar: "#F0FDFA",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Latihan 2")), tambah(idx(SUARA_B1, "batang"), ...[0, 1, 2].flatMap((i) => batangP("a", i))), tambah(idx(SUARA_B1, "kubus"), ...Array.from({ length: 8 }, (_, i) => kubusS("a", i)))),
    k(SUARA_B2, sorotkan(idx(SUARA_B2, "tiga"), "pa0-k", "pa1-k", "pa2-k"), redamkan(idx(SUARA_B2, "delapan"), "pa0-k", "pa1-k", "pa2-k"), sorotkan(idx(SUARA_B2, "delapan"), ...Array.from({ length: 8 }, (_, i) => `sa${i}`))),
    k(SUARA_B3, redamkan(0, ...Array.from({ length: 8 }, (_, i) => `sa${i}`)), tambah(idx(SUARA_B3, "jawabannya."), ...pilihKata(150, ["28", "38", "48"])), sorotkan(idx(SUARA_B3, "Ketuk"), "c2-k")),
    k(SUARA_B4, tambah(idx(SUARA_B4, "Tiga"), nilaiV("a", "38", 150, 124)), tambah(idx(SUARA_B4, "Hebat!"), emo("ow", 150, 194, OWL, 18))),
  ],
};

/* ------------------------------ 15. Latihan 3: melengkapi urutan ------------------------------ */
const SUARA_C1 = "Latihan tiga. Igil menyusun kartu bilangan di jalur bilangan. Ada satu kartu yang hilang.";
const SUARA_C2 = "Bilangannya empat puluh empat, empat puluh lima, lalu tanda tanya, empat puluh tujuh, empat puluh delapan.";
const SUARA_C3 = "Pilih jawabannya. Bilangan berapa yang hilang? Ketuk bilangan yang tepat.";
const SUARA_C4 = "Betul! Setelah empat puluh lima datang empat puluh enam. Sebelum empat puluh tujuh ada empat puluh enam. Hebat!";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: melengkapi urutan",
  sumber: "Materi: latihan melengkapi urutan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_C1, tambah(0, judul("Latihan 3")), tambah(idx(SUARA_C1, "jalur"), ...jalur([44, 45, "?", 47, 48], 70, 44))),
    k(SUARA_C2, ...sorotJalur(SUARA_C2, 44, [44, 45, 47, 48]), sorotkan(idx(SUARA_C2, "tanda"), "nl2-k")),
    k(SUARA_C3, redamkan(0, "nl4-k", "nl2-k"), tambah(idx(SUARA_C3, "jawabannya."), ...pilihKata(130, ["45", "46", "47"])), sorotkan(idx(SUARA_C3, "Ketuk"), "c2-k")),
    k(SUARA_C4, ubah(idx(SUARA_C4, "Setelah"), { id: "nl2", isi: "46" }), sorotkan(idx(SUARA_C4, "Setelah"), "nl2-k"), tambah(idx(SUARA_C4, "Hebat!"), emo("ow", 150, 194, OWL, 18))),
  ],
};

/* ------------------------------ 16. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi. Kita menghitung benda satu per satu, atau dikelompokkan setiap sepuluh supaya lebih cepat.";
const SUARA_Z2 = "Bilangan dua puluh sampai lima puluh punya puluhan dan satuan. Kita bisa membaca dan menulisnya, misalnya empat puluh tujuh.";
const SUARA_Z3 = "Kita juga bisa menghitung maju dan mundur di jalur bilangan. Maju, bilangannya bertambah satu. Mundur, bilangannya berkurang satu.";
const SUARA_Z4 = "Sebelum menghitung, kita boleh menebak dulu dengan patokan sepuluh. Lalu kita buktikan dengan menghitung.";
const SUARA_Z5 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Mari ingat lagi")), tambah("Kita", ...kartu("p1", 14, 30, 272, 36, W.hijauMuda, ["menghitung: satu per satu,", "atau kelompokkan per 10"], 9.2))),
    k(SUARA_Z2, tambah("Bilangan", ...kartu("p2", 14, 72, 272, 36, W.krem, ["20 sampai 50: puluhan dan satuan,", "misalnya 47 dibaca empat puluh tujuh"], 9.2))),
    k(SUARA_Z3, tambah("Kita", ...kartu("p3", 14, 114, 272, 36, W.langit, ["maju: makin besar, tambah satu", "mundur: makin kecil, kurang satu"], 9.2))),
    k(SUARA_Z4, tambah("Sebelum", ...kartu("p4", 14, 156, 272, 36, W.pink, ["tebak dulu dengan patokan 10,", "lalu buktikan dengan menghitung"], 9.2))),
    k(SUARA_Z5, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, OWL, 56)), tambah("anak-anak!", emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
