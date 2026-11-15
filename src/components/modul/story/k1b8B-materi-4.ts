import type { AdeganStory } from "./logika-story";
import { OWL, W, diagram, emo, judul, kartu, pilihan, tabel, type Kat } from "./k1b8B-gambar";
import { bersih, hapus, k, redamkan, sorotHitung, sorotkan, tambah } from "./k1b8B-bantu";

/* ------------------------------ 17. Latihan 1: membaca diagram tegak ------------------------------ */
const KUE: Kat[] = [
  { nama: "donat", n: 4, emo: "\u{1F369}" },
  { nama: "roti", n: 3, emo: "\u{1F35E}" },
  { nama: "pai", n: 2, emo: "\u{1F967}" },
];
const DK = diagram("lk", "tegak", KUE, "Kue Kesukaan", "anak", { yb: 112, ketY: 140 });
const SUARA_A1 = "Latihan satu. Ini diagram kue kesukaan. Hitung gambar pada kolom donat.";
const SUARA_A2 = "Berapa anak yang suka donat? Ketuk jawabannya. Tiga, empat, atau lima?";
const SUARA_A3 = "Betul! Hitung lagi. Satu, dua, tiga, empat. Empat anak suka donat.";
const SUARA_A4 = "Hebat! Roti ada tiga gambar dan pai ada dua gambar. Jumlah semuanya sembilan.";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: membaca diagram",
  sumber: "Materi: latihan membaca diagram",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_A1, tambah(0, ...DK.semua)),
    k(SUARA_A2, tambah("Ketuk", ...pilihan(152, ["3", "4", "5"]))),
    k(SUARA_A3, sorotkan("Betul!", "c2-k"), ...sorotHitung(SUARA_A3, DK.idGambar(0), { setelah: "lagi." }), tambah("Empat@2", DK.angka(0))),
    k(SUARA_A4, redamkan(0, "c2-k", ...DK.idGambar(0)), tambah("Roti", DK.angka(1)), tambah("pai", DK.angka(2)), tambah("Hebat!", emo("ok", 262, 50, "✅", 22))),
  ],
};

/* ------------------------------ 18. Latihan 2: paling sedikit ------------------------------ */
const TERNAK: Kat[] = [
  { nama: "bebek", n: 5, emo: "\u{1F986}" },
  { nama: "ayam", n: 3, emo: "\u{1F414}" },
  { nama: "sapi", n: 4, emo: "\u{1F404}" },
];
const DL = diagram("lb", "datar", TERNAK, "Hewan Peternakan", "anak", { y0: 38, rowH: 22, ketY: 122 });
const SUARA_B1 = "Latihan dua. Ini diagram hewan peternakan. Bebek ada lima gambar, ayam ada tiga gambar, sapi ada empat gambar.";
const SUARA_B2 = "Hewan apa yang paling sedikit? Ketuk jawabannya.";
const SUARA_B3 = "Betul! Ayam paling sedikit, hanya tiga gambar.";
const SUARA_B4 = "Ayam lebih sedikit dua dari bebek. Lebihnya disebut selisih.";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: paling sedikit",
  sumber: "Materi: latihan paling sedikit",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_B1, tambah(0, ...DL.dasar, DL.label(0), DL.label(1), DL.label(2)), tambah("lima", ...DL.gambar(0)), tambah("tiga", ...DL.gambar(1)), tambah("empat", ...DL.gambar(2))),
    k(SUARA_B2, tambah("Hewan", ...pilihan(136, ["bebek", "ayam", "sapi"], 10))),
    k(SUARA_B3, sorotkan("Betul!", "c2-k", ...DL.idGambar(1)), tambah("Ayam", emo("ok", 262, 50, "✅", 22))),
    k(SUARA_B4, redamkan(0, "c2-k", ...DL.idGambar(1)), sorotkan("bebek.", "lbg0_3", "lbg0_4"), tambah("Lebihnya", ...kartu("sd", 196, 34, 96, 22, W.emas, ["selisih: 2"], 10))),
  ],
};

/* ------------------------------ 19. Latihan 3: jumlah semuanya ------------------------------ */
const BUNGA: Kat[] = [
  { nama: "mawar", n: 4, emo: "\u{1F339}" },
  { nama: "melati", n: 5, emo: "\u{1F338}" },
  { nama: "tulip", n: 3, emo: "\u{1F337}" },
];
const TL = tabel("lt", "menurun", BUNGA, "Bunga di Taman", "bunga", { jumlah: false, y0: 34 });
const TL_TOTAL = tabel("lt", "menurun", BUNGA, "Bunga di Taman", "bunga", { jumlah: true, y0: 34 });
const SUARA_C1 = "Latihan tiga. Ini tabel bunga di taman. Mawar ada empat, melati ada lima, tulip ada tiga.";
const SUARA_C2 = "Berapa jumlah semuanya? Ketuk jawabannya. Sebelas, dua belas, atau tiga belas?";
const SUARA_C3 = "Betul! Empat, lima, dan tiga jadi dua belas.";
const SUARA_C4 = "Jumlah semuanya dua belas. Hebat sekali!";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: jumlah semuanya",
  sumber: "Materi: latihan jumlah semuanya",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_C1, tambah(0, ...TL.kepala), tambah("Mawar", ...TL.isi(0)), tambah("melati", ...TL.isi(1)), tambah("tulip", ...TL.isi(2))),
    k(SUARA_C2, tambah("Berapa", ...pilihan(138, ["11", "12", "13"]))),
    k(SUARA_C3, sorotkan("Betul!", "c2-k")),
    k(SUARA_C4, hapus(0, "c1-k", "c1-t", "c2-k", "c2-t", "c3-k", "c3-t"), tambah("Jumlah", ...TL_TOTAL.total), tambah("Hebat", emo("ok", 262, 50, "✅", 22))),
  ],
};

/* ------------------------------ 20. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi. Data dicatat dengan turus, lalu disajikan dalam tabel dan diagram gambar.";
const SUARA_Z2 = "Diagram gambar punya judul, nama kolom atau baris, gambar, angka, dan keterangan. Satu gambar mewakili satu data.";
const SUARA_Z3 = "Kita membaca diagram dengan kata paling banyak, paling sedikit, lebih banyak, sama banyak, dan jumlah semuanya.";
const SUARA_Z4 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Mari ingat lagi")), tambah("turus,", ...kartu("p1", 14, 36, 272, 40, W.hijauMuda, ["catat dengan turus,", "sajikan dalam tabel dan diagram"], 9.4))),
    k(SUARA_Z2, tambah("judul,", ...kartu("p2", 14, 86, 272, 36, W.langit, ["judul, nama, gambar, angka, keterangan:", "1 gambar = 1 data"], 8.8))),
    k(SUARA_Z3, tambah("paling", ...kartu("p3", 14, 132, 272, 36, W.krem, ["paling banyak, paling sedikit,", "sama banyak, jumlah semuanya"], 9))),
    k(SUARA_Z4, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, OWL, 56)), tambah("anak-anak!", emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
