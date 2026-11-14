import type { AdeganStory } from "./logika-story";
import { W, barisKipas, bulat, busurDerajat, emo, garis, jam, judul, kartu, kaki, kipas, kotak, panah, sudutDua, tabel, tandaSiku, teks } from "./k5b6c-gambar";
import { bersih, hapus, k, tambah } from "./k5b6c-bantu";

const WARNA_KIPAS = [W.jingga, W.langit, W.hijauMuda, W.pink];

/* ------------------------------ LC0. Empat metode luar Subbab C ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode luar untuk mengukur dan membandingkan sudut",
  sumber: "Metode luar buku; contoh dari Buku Siswa hlm. 175–182",
  latar: "#EAF2FF",
  ketukan: [
    k(
      "Video ini membahas empat metode luar untuk Subbab C, yaitu cara tambahan di luar buku untuk mengukur dan membandingkan sudut.",
      tambah(0, judul("metode luar Subbab C")),
      tambah("metode", emo("dunia", 80, 100, "🌐", 44), teks("l1", 80, 132, "metode luar", 9, W.merah)),
      tambah("Subbab", emo("buku", 220, 100, "📘", 44), teks("l2", 220, 132, "Subbab C", 9)),
      tambah("mengukur", garis("pa", 112, 100, 74, 0, W.hijau, 4, { gambar: true })),
    ),
    k(
      "Pertama, Protractor Reading Protocol, urutan baku membaca busur derajat. Kedua, Benchmark Angles, memakai sudut patokan untuk memperkirakan besar sudut.",
      bersih(0),
      tambah(0, judul("empat metode luar")),
      tambah("Pertama,", ...kartu("m1", 10, 34, 134, 66, "#FDE68A", ["Protractor Reading", "Protocol", "urutan membaca busur"], 8.6)),
      tambah("Kedua,", ...kartu("m2", 156, 34, 134, 66, "#FBCFE8", ["Benchmark Angles", "sudut patokan", "untuk menaksir"], 8.6)),
    ),
    k(
      "Ketiga, Degree Measure, memahami derajat sebagai bagian dari satu putaran. Keempat, Clock Face Division, membagi muka jam menjadi dua belas bagian sama.",
      tambah("Ketiga,", ...kartu("m3", 10, 112, 134, 66, "#BBF7D0", ["Degree Measure", "derajat = bagian", "dari satu putaran"], 8.6)),
      tambah("Keempat,", ...kartu("m4", 156, 112, 134, 66, "#BFDBFE", ["Clock Face Division", "muka jam dibagi", "dua belas bagian"], 8.6)),
    ),
    k(
      "Tiap metode dipelajari dalam dua bagian, konsep lalu penerapan, memakai angka dari Buku Siswa seperti kipas seratus dua puluh lima derajat dan jam pukul empat tiga puluh.",
      bersih(0),
      tambah(0, judul("konsep, lalu penerapan")),
      tambah("konsep", ...kartu("c1", 30, 36, 100, 40, W.krem, ["konsep", "cara kerja"], 10)),
      tambah("penerapan", garis("cp", 134, 56, 32, 0, W.hijau, 3, { gambar: true }), ...kartu("c2", 170, 36, 100, 40, W.hijauMuda, ["penerapan", "angka buku"], 10)),
      tambah("kipas", kipas("mk", 70, 150, 40, 55, 180, W.jingga), teks("mk-n", 70, 172, "kipas 125°", 8.6, W.biru)),
      tambah("jam", ...jam("mj", 220, 128, 26, 4, 30), teks("mj-wk", 220, 172, "Pukul 04.30", 8.6, W.biru)),
    ),
  ],
};

/* ------------------------------ LC1. Protractor Reading Protocol: konsep ------------------------------ */
export const ADEGAN_LUAR_PROTOKOL: AdeganStory = {
  id: "luar-protokol",
  judul: "Protractor Reading Protocol: konsep",
  sumber: "Metode luar 1: urutan baku membaca busur derajat",
  latar: "#ECFDF5",
  ketukan: [
    k(
      "Metode pertama, Protractor Reading Protocol: urutan empat langkah yang selalu sama setiap kali kita membaca busur derajat.",
      tambah(0, judul("Protractor Reading Protocol")),
      tambah("empat", ...busurDerajat("pr", 150, 150, 72)),
      tambah("langkah", teks("pr-t", 150, 178, "empat langkah tetap", 10, W.merah)),
    ),
    k(
      "Langkah pertama, Pusat: letakkan titik pusat busur tepat di titik sudut. Langkah kedua, Nol: putar busur sampai garis dasar menutupi satu kaki, lalu tandai angka nol pada kaki itu.",
      bersih(0),
      tambah(0, judul("empat langkah, selalu berurutan")),
      tambah("Pusat:", ...kartu("s1", 20, 36, 260, 42, W.krem, ["1. PUSAT", "titik pusat busur di titik sudut"], 9.4)),
      tambah("Nol:", ...kartu("s2", 20, 90, 260, 42, W.langit, ["2. NOL", "garis dasar menutupi satu kaki"], 9.4)),
    ),
    k(
      "Langkah ketiga, Skala: ikuti skala yang dimulai dari angka nol tadi sampai kaki yang lain. Langkah keempat, Cek: bandingkan hasil dengan sudut siku-siku sembilan puluh derajat.",
      tambah("Skala:", ...kartu("s3", 20, 36, 260, 42, W.hijauMuda, ["3. SKALA", "ikuti skala yang mulai dari nol"], 9.4)),
      tambah("Cek:", ...kartu("s4", 20, 90, 260, 42, W.pink, ["4. CEK", "bandingkan dengan 90°"], 9.4)),
      hapus(0, "s1-k", "s1-t0", "s1-t1", "s2-k", "s2-t0", "s2-t1"),
    ),
    k(
      "Urutan tetap ini mencegah dua kesalahan di Panduan Guru: salah memilih skala luar atau dalam, dan mengira busur harus selalu mendatar.",
      bersih(0),
      tambah(0, judul("dua kesalahan yang dicegah")),
      tambah("skala", ...kartu("x1", 20, 40, 260, 44, W.merahMuda, ["✗ salah memilih skala", "luar atau dalam"], 9.4)),
      tambah("mengira", ...kartu("x2", 20, 100, 260, 44, W.merahMuda, ["✗ mengira busur harus", "selalu mendatar"], 9.4)),
      tambah("mendatar.", teks("x3", 150, 176, "protokol: Pusat, Nol, Skala, Cek", 9.4, W.hijau)),
    ),
  ],
};

/* ------------------------------ LC2. Protractor Reading Protocol: penerapan ------------------------------ */
export const ADEGAN_LUAR_PROTOKOL_TERAPAN: AdeganStory = {
  id: "luar-protokol-terapan",
  judul: "Protractor Reading Protocol: penerapan pada kipas buku",
  sumber: "Metode luar 1: contoh kipas Buku Siswa hlm. 176–179",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Terapkan pada kipas contoh buku. Pusat: busur di titik sudut kipas. Nol: garis dasar menutupi kaki kiri, jadi skala dalam yang dipakai.",
      tambah(0, judul("terapan pada kipas contoh")),
      tambah("kipas", kipas("pt", 150, 176, 74, 55, 180, W.jingga, { z: -1 })),
      tambah("Pusat:", ...busurDerajat("pp", 150, 176, 82, { op: 0.8 })),
      tambah("Nol:", ...sudutDua("pt", 150, 176, 100, 180, 55, W.biru, 2.6, { z: 5 }), teks("pt-nol", 52, 172, "0°", 10, W.merah)),
    ),
    k(
      "Skala: kaki yang lain menunjuk seratus dua puluh lima pada skala dalam. Skala luar di tempat yang sama menunjuk lima puluh lima derajat.",
      tambah("Skala:", teks("pt-n", 226, 120, "125° ✓", 9, W.hijau)),
      tambah("luar", teks("pt-o", 212, 92, "55° ✗", 9, W.merah)),
    ),
    k(
      "Cek: sudut ini lebih lebar dari sudut siku-siku, jadi hasilnya harus lebih dari sembilan puluh. Seratus dua puluh lima lolos, lima puluh lima gagal.",
      tambah("Cek:", kaki("pt-s", 150, 176, 100, 90, W.ungu, 1.6, { putus: true, z: 4 }), teks("pt-st", 150, 64, "siku-siku 90°", 8.6, W.ungu)),
      tambah("lolos,", ...kartu("lg1", 8, 28, 88, 24, W.hijauMuda, ["125° > 90° lolos"], 7.8)),
      tambah("gagal.", ...kartu("lg2", 204, 28, 88, 24, W.merahMuda, ["55° < 90° gagal"], 7.8)),
    ),
    k(
      "Sekarang kipas empat di buku. Setelah empat langkah, hasilnya delapan puluh lima derajat. Cek: kurang dari sembilan puluh, dan kipas itu memang tampak lebih sempit dari siku-siku.",
      bersih(0),
      tambah(0, judul("kipas 4: protokol yang sama")),
      tambah("Sekarang", kipas("pu", 150, 176, 74, 95, 180, W.pink, { z: -1 }), ...busurDerajat("pq", 150, 176, 82, { op: 0.8 })),
      tambah("langkah,", ...sudutDua("pu", 150, 176, 100, 180, 95, W.biru, 2.6, { z: 5 })),
      tambah("hasilnya", teks("pu-n", 168, 112, "85°", 11, W.hijau)),
      tambah("Cek:", ...kartu("cu", 20, 28, 260, 26, W.hijauMuda, ["85° kurang dari 90°, tampak lebih sempit ✓"], 8.4)),
    ),
    k(
      "Hasil keempat kipas dengan protokol yang sama: seratus lima, seratus tiga puluh, seratus tiga puluh lima, dan delapan puluh lima derajat. Kipas tiga terlebar.",
      bersih(0),
      tambah(0, judul("hasil empat kipas")),
      tambah("Hasil", ...tabel("pk", 20, 34, [60, 70, 150], [["Kipas", "Hasil", "Cek terhadap 90°"], ["1", "105°", "lebih dari 90°"], ["2", "130°", "lebih dari 90°"], ["3", "135°", "lebih dari 90°"], ["4", "85°", "kurang dari 90°"]], 22, 9)),
      tambah("tiga", teks("pk-w", 150, 178, "terlebar: kipas 3", 9.4, W.hijau)),
    ),
  ],
};

/* ------------------------------ LC3. Benchmark Angles: konsep ------------------------------ */
export const ADEGAN_LUAR_PATOKAN: AdeganStory = {
  id: "luar-patokan",
  judul: "Benchmark Angles: konsep",
  sumber: "Metode luar 2: sudut patokan untuk menaksir",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Metode kedua, Benchmark Angles: kita mengingat beberapa sudut patokan, lalu menaksir sudut lain dengan membandingkannya sebelum memakai busur.",
      tambah(0, judul("Benchmark Angles")),
      tambah("mengingat", ...kartu("b1", 20, 44, 260, 44, W.krem, ["1. ingat sudut patokan"], 10)),
      tambah("menaksir", ...kartu("b2", 20, 100, 260, 44, W.langit, ["2. taksir dengan membandingkan"], 10)),
      tambah("busur.", ...kartu("b3", 20, 156, 260, 36, W.hijauMuda, ["3. baru ukur dengan busur"], 10)),
    ),
    k(
      "Empat patokan: nol derajat, sembilan puluh derajat atau siku-siku, seratus delapan puluh derajat atau lurus, dan tiga ratus enam puluh derajat atau satu putaran penuh.",
      bersih(0),
      tambah(0, judul("empat sudut patokan")),
      tambah("nol", ...sudutDua("e0", 36, 110, 40, 0, 0, W.biru, 2.6), kaki("e0-c", 36, 110, 40, 0, W.merah, 1.2), teks("e0-n", 56, 140, "0°", 10, W.merah)),
      tambah("sembilan", ...sudutDua("e9", 114, 110, 40, 0, 90, W.biru, 2.6), tandaSiku("e9-t", 114, 110, 10, 0, W.merah), teks("e9-n", 134, 140, "90°", 10, W.merah)),
      tambah("seratus", ...sudutDua("e18", 192, 110, 40, 0, 180, W.biru, 2.6), teks("e18-n", 192, 140, "180°", 10, W.merah)),
      tambah("tiga", bulat("e36-c", 262, 96, 20, "none", W.biru, { tebal: 2 }), kaki("e36-a", 262, 96, 20, 0, W.biru, 2.6), teks("e36-n", 262, 140, "360°", 10, W.merah)),
      tambah("lurus,", teks("e-m1", 192, 158, "lurus", 8.6, W.hijau)),
    ),
    k(
      "Cara menaksir: bandingkan dulu dengan sembilan puluh. Kurang dari itu lancip, lebih dari itu tumpul sampai seratus delapan puluh. Lebih dari seratus delapan puluh berarti refleks.",
      bersih(0),
      tambah(0, judul("menaksir dengan patokan")),
      tambah("sembilan", kotak("nz1", 20, 90, 65, 18, W.hijauMuda, W.biru, { rx: 0 }), teks("nz-0", 20, 82, "0°", 8.6, W.merah), teks("nz-90", 85, 82, "90°", 8.6, W.merah)),
      tambah("lancip", teks("nz-l", 52, 124, "lancip", 8.6, W.hijau)),
      tambah("tumpul", kotak("nz2", 85, 90, 65, 18, W.langit, W.biru, { rx: 0 }), teks("nz-180", 150, 82, "180°", 8.6, W.merah), teks("nz-t", 118, 124, "tumpul", 8.6, W.hijau)),
      tambah("refleks.", kotak("nz3", 150, 90, 130, 18, W.pink, W.biru, { rx: 0 }), teks("nz-360", 280, 82, "360°", 8.6, W.merah), teks("nz-r", 215, 124, "refleks", 8.6, W.hijau)),
    ),
    k(
      "Setelah menaksir, barulah mengukur dengan busur derajat. Jika hasil ukur jauh dari taksiran, kita periksa ulang cara membaca skalanya.",
      bersih(0),
      tambah(0, judul("taksir dulu, lalu ukur")),
      tambah("menaksir,", ...kartu("f1", 10, 80, 80, 44, W.krem, ["taksir", "dengan patokan"], 8.6)),
      tambah("mengukur", panah("fa1", 92, 102, 24, 0, W.hijau, 2.4, { gambar: true }), ...kartu("f2", 118, 80, 80, 44, W.langit, ["ukur", "dengan busur"], 8.6)),
      tambah("jauh", panah("fa2", 200, 102, 24, 0, W.merah, 2.4, { gambar: true }), ...kartu("f3", 226, 80, 66, 44, W.merahMuda, ["periksa", "ulang"], 8.6)),
    ),
  ],
};

/* ------------------------------ LC4. Benchmark Angles: penerapan ------------------------------ */
export const ADEGAN_LUAR_PATOKAN_TERAPAN: AdeganStory = {
  id: "luar-patokan-terapan",
  judul: "Benchmark Angles: penerapan pada kipas dan sudut refleks",
  sumber: "Metode luar 2: contoh kipas dan Tantangan Buku Siswa hlm. 176–181",
  latar: "#FEFCE8",
  ketukan: [
    k(
      "Taksir empat kipas di buku. Kipas empat tampak kurang dari siku-siku, jadi lancip. Kipas satu, dua, dan tiga tampak lebih dari siku-siku, jadi tumpul.",
      tambah(0, judul("menaksir empat kipas")),
      tambah("Taksir", ...barisKipas("bt", [105, 130, 135, 85], 120, 34, WARNA_KIPAS)),
      tambah("lancip.", teks("bt4-j", 262.5, 156, "lancip", 9, W.hijau)),
      tambah("tumpul.", teks("bt1-j", 37.5, 156, "tumpul", 9, W.merah), teks("bt2-j", 112.5, 156, "tumpul", 9, W.merah), teks("bt3-j", 187.5, 156, "tumpul", 9, W.merah)),
    ),
    k(
      "Patokan saja belum cukup untuk membedakan kipas dua dan tiga. Keduanya sama-sama antara sembilan puluh dan seratus delapan puluh, jadi kita perlu busur derajat.",
      bersih(0),
      tambah(0, judul("kipas 2 atau kipas 3?")),
      tambah("kipas", kipas("bd2", 80, 150, 60, 25, 155, W.langit), teks("bd2-l", 80, 170, "Kipas 2", 9)),
      tambah("tiga.", kipas("bd3", 220, 150, 60, 22.5, 157.5, W.hijauMuda), teks("bd3-l", 220, 170, "Kipas 3", 9)),
      tambah("busur", teks("bd-q", 150, 120, "?", 24, W.merah), teks("bd-r", 150, 186, "antara 90° dan 180°", 8.6, W.coklat)),
    ),
    k(
      "Hasil ukur: kipas dua seratus tiga puluh, kipas tiga seratus tiga puluh lima. Selisihnya hanya lima derajat, tetapi kipas tiga tetap lebih lebar.",
      tambah("dua", teks("bd2-n", 80, 130, "130°", 9, W.merah)),
      tambah("tiga", teks("bd3-n", 220, 130, "135°", 9, W.merah)),
      tambah("Selisihnya", ...kartu("sl", 100, 34, 100, 28, W.krem, ["135 - 130 = 5"], 10)),
    ),
    k(
      "Patokan juga berguna untuk sudut refleks. Dua ratus empat puluh derajat lebih dari seratus delapan puluh dan kurang dari tiga ratus enam puluh, jadi memang refleks.",
      bersih(0),
      tambah(0, judul("patokan untuk sudut refleks")),
      tambah("refleks.", kotak("rz1", 20, 100, 130, 16, W.langit, W.biru, { rx: 0 }), kotak("rz2", 150, 100, 130, 16, W.pink, W.biru, { rx: 0 }), teks("rz-0", 20, 92, "0°", 8.6, W.merah), teks("rz-180", 150, 92, "180°", 8.6, W.merah), teks("rz-360", 280, 92, "360°", 8.6, W.merah)),
      tambah("Dua", panah("rz-p", 193, 74, 0, 22, W.hijau, 2.6, { gambar: true }), teks("rz-n", 193, 66, "240°", 10, W.hijau)),
      tambah("lebih", teks("rz-a", 215, 140, "lebih dari 180°", 8.6, W.coklat)),
      tambah("kurang", teks("rz-b", 215, 154, "kurang dari 360°", 8.6, W.coklat)),
    ),
  ],
};
