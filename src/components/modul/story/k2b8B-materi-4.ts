import type { AdeganStory } from "./logika-story";
import { BINTANG, BULAT, HATI, LARI, OWL, PARSEL, PERMAINAN, W, diagram, emo, judul, kartu, pilihan, teks, type Kat } from "./k2b8B-gambar";
import { bersih, hapus, idx, k, redamkan, sorotHitung, sorotkan, tambah } from "./k2b8B-bantu";

/* ------------------------------ 16. Permainan tradisional ------------------------------ */
const DP = diagram("dp", PERMAINAN, "Permainan Tradisional", "anak");
const SUARA_M1 = "Upe mencatat permainan tradisional kesukaan anak-anak. Satu wajah tersenyum untuk satu anak.";
const SUARA_M2 = "Karet ada empat. Lompat tali ada enam.";
const SUARA_M3 = "Petak umpet ada lima. Benteng ada tujuh.";
const SUARA_M4 = "Permainan apa yang paling banyak disukai? Benteng, tujuh anak.";
const SUARA_M5 = "Lompat tali lebih banyak dua dari karet. Karet paling sedikit, empat anak.";

export const ADEGAN_PERMAINAN: AdeganStory = {
  id: "permainan",
  judul: "Permainan tradisional kesukaan",
  sumber: "Materi: membuat diagram dari data",
  latar: "#F0FDFA",
  ketukan: [
    k(SUARA_M1, tambah(0, ...DP.dasar)),
    k(SUARA_M2, tambah("Karet", DP.label(0)), tambah("empat.", ...DP.gambar(0), DP.angka(0)), tambah("Lompat", DP.label(1)), tambah("enam.", ...DP.gambar(1), DP.angka(1))),
    k(SUARA_M3, tambah("Petak", DP.label(2)), tambah("lima.", ...DP.gambar(2), DP.angka(2)), tambah("Benteng", DP.label(3)), tambah("tujuh.", ...DP.gambar(3), DP.angka(3))),
    k(SUARA_M4, sorotkan("paling", ...DP.idGambar(3))),
    k(SUARA_M5, redamkan(0, ...DP.idGambar(3)), sorotkan("Lompat", "dpg1_4", "dpg1_5"), redamkan("Karet@2", "dpg1_4", "dpg1_5"), sorotkan("Karet@2", ...DP.idGambar(0))),
  ],
};

/* ------------------------------ 17. Para siswa berlari ------------------------------ */
const DR = diagram("dr", LARI, "Siswa Berlari", "siswa");
const SUARA_R1 = "Malosi dan Halim melihat para siswa berlari mengelilingi lapangan. Ada empat belas siswa.";
const SUARA_R2 = "Lima siswa berlari satu putaran. Tiga siswa berlari dua putaran.";
const SUARA_R3 = "Empat siswa berlari tiga putaran. Dua siswa berlari empat putaran.";
const SUARA_R4 = "Lima, tiga, empat, dan dua jadi empat belas. Jumlahnya cocok dengan banyaknya siswa.";
const SUARA_R5 = "Siapa yang berlari lebih dari dua putaran? Baris tiga putaran dan baris empat putaran. Empat dan dua jadi enam siswa.";

export const ADEGAN_BERLARI: AdeganStory = {
  id: "berlari",
  judul: "Para siswa berlari mengelilingi lapangan",
  sumber: "Materi: membaca dan menjumlahkan data",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Berlari di lapangan")), tambah("berlari", emo("rn", 150, 100, "\u{1F3C3}", 46)), tambah("empat", ...kartu("sw", 90, 140, 120, 26, W.krem, ["14 siswa"], 13))),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, ...DR.dasar),
      tambah("Lima", DR.label(0), ...DR.gambar(0), DR.angka(0)),
      tambah("Tiga", DR.label(1), ...DR.gambar(1), DR.angka(1)),
    ),
    k(SUARA_R3, tambah("Empat", DR.label(2), ...DR.gambar(2), DR.angka(2)), tambah("Dua", DR.label(3), ...DR.gambar(3), DR.angka(3))),
    k(SUARA_R4, tambah(0, teks("jm", 150, 162, "5 + 3 + 4 + 2 = 14", 12, W.coklat))),
    k(SUARA_R5, hapus(0, "jm"), sorotkan("Baris", ...DR.idGambar(2), ...DR.idGambar(3)), tambah(idx(SUARA_R5, "empat", 2), teks("jn", 150, 162, "4 + 2 = 6", 13, W.coklat))),
  ],
};

/* ------------------------------ 18. Parsel buah Wei ------------------------------ */
const DS = diagram("pr", PARSEL, "Parsel Buah Wei", "buah");
const eq = (id: string, y: number, isi: string) => teks(id, 296, y, isi, 10, W.coklat, { anchor: "end" });
const SUARA_S1 = "Wei menyusun parsel buah. Ada apel, jeruk, mangga, dan pisang.";
const SUARA_S2 = "Apel ada tiga. Jeruk ada empat. Mangga ada lima. Pisang ada tiga.";
const SUARA_S3 = "Apel dan jeruk. Tiga dan empat jadi tujuh.";
const SUARA_S4 = "Mangga dan pisang. Lima dan tiga jadi delapan.";
const SUARA_S5 = "Tujuh dan delapan jadi lima belas. Jumlah semuanya lima belas.";

export const ADEGAN_PARSEL: AdeganStory = {
  id: "parsel",
  judul: "Parsel buah Wei",
  sumber: "Materi: jumlah dua bagian data",
  latar: "#FEF2F2",
  ketukan: [
    k(SUARA_S1, tambah(0, ...DS.dasar), tambah("apel,", DS.label(0)), tambah("jeruk,", DS.label(1)), tambah("mangga,", DS.label(2)), tambah("pisang.", DS.label(3))),
    k(
      SUARA_S2,
      tambah(idx(SUARA_S2, "tiga"), ...DS.gambar(0), DS.angka(0)),
      tambah("empat.", ...DS.gambar(1), DS.angka(1)),
      tambah("lima.", ...DS.gambar(2), DS.angka(2)),
      tambah(idx(SUARA_S2, "tiga", 2), ...DS.gambar(3), DS.angka(3)),
    ),
    k(SUARA_S3, sorotkan("Apel", ...DS.idGambar(0), ...DS.idGambar(1)), tambah("Tiga", eq("e1", 70, "3 + 4 = 7"))),
    k(SUARA_S4, redamkan(0, ...DS.idGambar(0), ...DS.idGambar(1)), sorotkan("Mangga", ...DS.idGambar(2), ...DS.idGambar(3)), tambah("Lima", eq("e2", 100, "5 + 3 = 8"))),
    k(SUARA_S5, redamkan(0, ...DS.idGambar(2), ...DS.idGambar(3)), tambah("Tujuh", eq("e3", 130, "7 + 8 = 15")), tambah("Jumlah", teks("jt", 262, 160, "jumlah: 15", 10.6, W.merah))),
  ],
};

/* ------------------------------ 19. Latihan 1: membaca diagram ------------------------------ */
const WARNA_KESUKAAN: Kat[] = [
  { nama: "merah", n: 5, g: BINTANG, warna: W.merah },
  { nama: "biru", n: 3, g: BINTANG, warna: W.biruGambar },
  { nama: "kuning", n: 4, g: BINTANG, warna: "#EAB308" },
];
const DW = diagram("lw", WARNA_KESUKAAN, "Warna Kesukaan", "anak", { y0: 44, rowH: 26, ketY: 128 });
const SUARA_A1 = "Latihan satu. Ini diagram warna kesukaan. Hitung bintang pada baris merah.";
const SUARA_A2 = "Berapa anak yang suka warna merah? Ketuk jawabannya. Empat, lima, atau enam?";
const SUARA_A3 = "Betul! Hitung lagi. Satu, dua, tiga, empat, lima. Lima anak suka merah.";
const SUARA_A4 = "Hebat! Biru ada tiga bintang, dan kuning ada empat bintang. Biru paling sedikit.";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: membaca diagram",
  sumber: "Materi: latihan membaca diagram",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_A1, tambah(0, ...DW.semua)),
    k(SUARA_A2, tambah("Ketuk", ...pilihan(142, ["4", "5", "6"]))),
    k(SUARA_A3, sorotkan("Betul!", "c2-k"), ...sorotHitung(SUARA_A3, DW.idGambar(0), { setelah: "lagi." }), tambah(idx(SUARA_A3, "lima", 2), DW.angka(0))),
    k(SUARA_A4, redamkan(0, "c2-k", ...DW.idGambar(0)), tambah(idx(SUARA_A4, "tiga"), DW.angka(1)), tambah(idx(SUARA_A4, "empat"), DW.angka(2)), tambah("Hebat!", emo("ok", 262, 56, "✅", 22)), sorotkan("sedikit.", ...DW.idGambar(1))),
  ],
};

/* ------------------------------ 20. Latihan 2: paling sedikit dan selisih ------------------------------ */
const HOBI: Kat[] = [
  { nama: "renang", n: 4, g: BULAT, warna: W.biruGambar },
  { nama: "bersepeda", n: 6, g: BULAT, warna: W.hijau },
  { nama: "menari", n: 3, g: BULAT, warna: W.merah },
];
const DH = diagram("lh", HOBI, "Hobi Anak", "anak", { y0: 44, rowH: 26, ketY: 128 });
const SUARA_B1 = "Latihan dua. Ini diagram hobi anak. Renang ada empat, bersepeda ada enam, menari ada tiga.";
const SUARA_B2 = "Hobi apa yang paling sedikit? Ketuk jawabannya.";
const SUARA_B3 = "Betul! Menari paling sedikit, hanya tiga lingkaran.";
const SUARA_B4 = "Menari lebih sedikit tiga dari bersepeda. Lebihnya disebut selisih.";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: paling sedikit",
  sumber: "Materi: latihan paling sedikit",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, ...DH.dasar),
      tambah("Renang", DH.label(0)),
      tambah("empat,", ...DH.gambar(0)),
      tambah("bersepeda", DH.label(1)),
      tambah("enam,", ...DH.gambar(1)),
      tambah("menari", DH.label(2)),
      tambah(idx(SUARA_B1, "tiga"), ...DH.gambar(2)),
    ),
    k(SUARA_B2, tambah("Hobi", ...pilihan(142, ["renang", "bersepeda", "menari"], 9))),
    k(SUARA_B3, sorotkan("Betul!", "c3-k", ...DH.idGambar(2)), tambah("Menari", emo("ok", 262, 56, "✅", 22))),
    k(SUARA_B4, redamkan(0, "c3-k", ...DH.idGambar(2)), sorotkan("bersepeda.", "lhg1_3", "lhg1_4", "lhg1_5"), tambah("Lebihnya", ...kartu("sd", 200, 66, 96, 22, W.emas, ["selisih: 3"], 10))),
  ],
};

/* ------------------------------ 21. Latihan 3: jumlah semuanya ------------------------------ */
const ALAT: Kat[] = [
  { nama: "gendang", n: 3, g: HATI, warna: W.merah },
  { nama: "seruling", n: 4, g: HATI, warna: W.ungu },
  { nama: "angklung", n: 5, g: HATI, warna: W.jingga },
];
const DA = diagram("la", ALAT, "Alat Musik", "anak", { y0: 44, rowH: 26, ketY: 128 });
const SUARA_C1 = "Latihan tiga. Ini diagram alat musik. Gendang ada tiga, seruling ada empat, angklung ada lima.";
const SUARA_C2 = "Berapa jumlah semuanya? Ketuk jawabannya. Sebelas, dua belas, atau tiga belas?";
const SUARA_C3 = "Betul! Tiga, empat, dan lima jadi dua belas.";
const SUARA_C4 = "Jumlah semuanya dua belas. Hebat sekali!";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: jumlah semuanya",
  sumber: "Materi: latihan jumlah semuanya",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, ...DA.dasar),
      tambah("Gendang", DA.label(0)),
      tambah(idx(SUARA_C1, "tiga", 2), ...DA.gambar(0)),
      tambah("seruling", DA.label(1)),
      tambah(idx(SUARA_C1, "empat"), ...DA.gambar(1)),
      tambah("angklung", DA.label(2)),
      tambah(idx(SUARA_C1, "lima"), ...DA.gambar(2)),
    ),
    k(SUARA_C2, tambah("Berapa", ...pilihan(142, ["11", "12", "13"]))),
    k(SUARA_C3, sorotkan("Betul!", "c2-k"), tambah("Tiga,", teks("jm", 258, 70, "3 + 4 + 5 = 12", 10.6, W.coklat))),
    k(SUARA_C4, hapus(0, "c1-k", "c1-t", "c2-k", "c2-t", "c3-k", "c3-t"), tambah("Jumlah", ...kartu("jt", 70, 146, 160, 26, W.hijauMuda, ["jumlah: 12"], 12)), tambah("Hebat", emo("ok", 262, 56, "✅", 22))),
  ],
};

/* ------------------------------ 22. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi. Satu bintang atau satu gambar lain mewakili satu benda, dan semua gambar sama besar.";
const SUARA_Z2 = "Baris dibaca dari kiri ke kanan. Diagram punya judul, nama baris, gambar, angka, dan keterangan.";
const SUARA_Z3 = "Kita membandingkan baris dengan kata paling banyak, paling sedikit, sama banyak, lebihnya, kurangnya, dan jumlah semuanya.";
const SUARA_Z4 = "Hebat sekali, anak-anak! Igil bangga padamu. Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Mari ingat lagi")), tambah("bintang", ...kartu("p1", 14, 36, 272, 40, W.hijauMuda, ["satu gambar mewakili satu benda,", "semua gambar sama besar"], 9.4))),
    k(SUARA_Z2, tambah("Baris", ...kartu("p2", 14, 86, 272, 36, W.langit, ["dibaca dari kiri ke kanan", "judul, nama baris, gambar, angka, keterangan"], 8.4))),
    k(SUARA_Z3, tambah("paling", ...kartu("p3", 14, 132, 272, 36, W.krem, ["paling banyak, paling sedikit, sama banyak,", "lebihnya, kurangnya, jumlah semuanya"], 8.4))),
    k(SUARA_Z4, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, OWL, 56)), tambah("anak-anak!", emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
