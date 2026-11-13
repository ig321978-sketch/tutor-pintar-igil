import type { AdeganStory } from "./logika-story";
import { W, bacaanDua, digit, emo, judul, kartu, panah, tabelNilai, teks } from "./k5b9a-gambar";
import { bersih, hapus, k, tambah, warnai } from "./k5b9a-bantu";

/* ------------------------------ LA0. Empat metode luar Subbab A ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode luar untuk membaca, menulis, dan nilai tempat",
  sumber: "Metode luar buku; contoh dari Buku Siswa hlm. 273–284",
  latar: "#EAF2FF",
  ketukan: [
    k(
      "Video ini membahas empat metode luar untuk Subbab A, yaitu cara tambahan di luar buku untuk membaca, menulis, dan menentukan nilai tempat.",
      tambah("metode", emo("dunia", 80, 100, "🌐", 44), teks("l1", 80, 132, "metode luar", 9, W.merah)),
      tambah("Subbab", emo("buku", 220, 100, "📘", 44), teks("l2", 220, 132, "Subbab A", 9)),
      tambah("tambahan", panah("pa", 112, 100, 74, 0, W.hijau, 4, { gambar: true })),
    ),
    k(
      "Pertama, Place Value Chart Protocol, aturan mengisi tabel nilai tempat. Kedua, Indonesian Number-Name Mapping, pemetaan angka ke nama bilangan.",
      bersih(0),
      tambah(0, judul("Empat metode luar")),
      tambah("Pertama", ...kartu("m1", 10, 34, 134, 66, "#FDE68A", ["Place Value", "Chart Protocol", "aturan tabel"], 8.6)),
      tambah("Kedua", ...kartu("m2", 156, 34, 134, 66, "#FBCFE8", ["Indonesian", "Number-Name Mapping", "angka ke nama"], 8.2)),
    ),
    k(
      "Ketiga, Digit-Place Value Link, yang mengaitkan angka dengan nilai tempatnya. Keempat, Three-Digit Group Chunking, memotong bilangan menjadi kelompok tiga angka.",
      tambah("Ketiga", ...kartu("m3", 10, 112, 134, 66, "#BBF7D0", ["Digit-Place", "Value Link", "angka dan tempatnya"], 8.6)),
      tambah("Keempat", ...kartu("m4", 156, 112, 134, 66, "#BFDBFE", ["Three-Digit", "Group Chunking", "kelompok tiga angka"], 8.6)),
    ),
    k(
      "Setiap metode kita pelajari dalam dua bagian, konsep lalu penerapan, dengan angka dari buku seperti lemari, Gianyar, dan harga komputer.",
      bersih(0),
      tambah(0, judul("konsep, lalu penerapan")),
      tambah("konsep", ...kartu("c1", 30, 56, 100, 50, W.krem, ["konsep", "cara kerja"], 10)),
      tambah("penerapan", panah("cp", 134, 81, 32, 0, W.hijau, 3, { gambar: true }), ...kartu("c2", 170, 56, 100, 50, "#DCFCE7", ["penerapan", "soal buku"], 10)),
      tambah("lemari,", emo("lm", 70, 156, "🗄", 30), teks("lmt", 70, 178, "lemari", 8.6)),
      tambah("Gianyar,", emo("gy", 150, 156, "🗿", 30), teks("gyt", 150, 178, "Gianyar", 8.6)),
      tambah("komputer.", emo("kp", 230, 156, "💻", 30), teks("kpt", 230, 178, "harga komputer", 8.6)),
    ),
  ],
};

/* ------------------------------ LA1. Place Value Chart Protocol: konsep ------------------------------ */
export const ADEGAN_LUAR_TABEL: AdeganStory = {
  id: "luar-tabel",
  judul: "Place Value Chart Protocol: konsep",
  sumber: "Metode luar 1: aturan mengisi tabel nilai tempat",
  latar: "#ECFDF5",
  ketukan: [
    k(
      "Metode pertama, Place Value Chart Protocol. Ini aturan tetap untuk mengisi tabel nilai tempat supaya tidak ada kolom yang tertukar.",
      tambah(0, judul("Place Value Chart Protocol")),
      tambah("tabel", ...tabelNilai("p", 12, 62, 46)),
      tambah("tertukar.", teks("tk", 150, 150, "jangan sampai ada kolom tertukar", 10.4, W.merah)),
    ),
    k(
      "Aturan satu: tulis angka dari kolom paling kanan, yaitu satuan, lalu bergerak ke kiri. Kita pakai 720.736 dari pembuka bab.",
      bersih(0),
      tambah(0, judul("aturan 1: mulai dari kanan")),
      tambah(0, ...tabelNilai("p", 12, 62, 46), teks("no", 150, 52, "720.736", 22)),
      tambah("kanan,", panah("pk", 280, 140, -60, 0, W.hijau, 3, { gambar: true }), teks("pt", 150, 158, "mulai dari kolom satuan", 10, W.hijau)),
      tambah("satuan,", digit("p", 12, 62, 46, 0, 5, "6", 17, W.merah)),
    ),
    k(
      "Aturan dua: lanjut ke kiri satu kolom satu angka. Puluhan tiga, ratusan tujuh, ribuan nol, puluh ribuan dua, ratus ribuan tujuh.",
      tambah(10, digit("p", 12, 62, 46, 0, 4, "3", 17)),
      tambah(12, digit("p", 12, 62, 46, 0, 3, "7", 17)),
      tambah(14, digit("p", 12, 62, 46, 0, 2, "0", 17)),
      tambah(17, digit("p", 12, 62, 46, 0, 1, "2", 17)),
      tambah(20, digit("p", 12, 62, 46, 0, 0, "7", 17)),
    ),
    k(
      "Aturan tiga: kolom yang nilainya nol tetap harus diisi angka nol. Jangan dikosongkan, sebab kolom kosong membuat angka bergeser.",
      warnai("nol", W.merah, "p-d2"),
      tambah("nol@2", teks("pn", 150, 176, "nol wajib ditulis", 11, W.merah)),
      tambah("bergeser.", teks("pb", 150, 194, "kolom kosong membuat angka bergeser", 9, W.ungu)),
    ),
    k(
      "Aturan empat: setelah penuh, baca ulang tabel dari kiri dan cocokkan dengan bilangan awal. Cek ini menangkap kolom yang tertukar.",
      hapus(0, "pk", "pt"),
      tambah("baca", panah("ck", 30, 134, 240, 0, W.hijau, 3, { gambar: true })),
      tambah("cocokkan", teks("cb", 150, 152, "baca dari kiri, cocok dengan 720.736", 9.6, W.hijau)),
    ),
  ],
};

/* ------------------------------ LA1T. Place Value Chart Protocol: penerapan ------------------------------ */
export const ADEGAN_LUAR_TABEL_TERAPAN: AdeganStory = {
  id: "luar-tabel-terapan",
  judul: "Place Value Chart Protocol: penerapan pada harga komputer",
  sumber: "Metode luar 1: penerapan pada Ayo Berlatih nomor 1",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Terapkan pada harga hardisk, 834.759. Dari kanan, sembilan di satuan, lima di puluhan, tujuh di ratusan, empat di ribuan, tiga di puluh ribuan, delapan di ratus ribuan.",
      tambah(0, judul("harga hardisk eksternal")),
      tambah(0, teks("no", 150, 48, "834.759", 22), ...tabelNilai("h", 12, 56, 46)),
      tambah("sembilan", digit("h", 12, 56, 46, 0, 5, "9", 17, W.merah)),
      tambah("lima", digit("h", 12, 56, 46, 0, 4, "5", 17)),
      tambah("tujuh", digit("h", 12, 56, 46, 0, 3, "7", 17)),
      tambah("empat", digit("h", 12, 56, 46, 0, 2, "4", 17)),
      tambah("tiga", digit("h", 12, 56, 46, 0, 1, "3", 17)),
      tambah("delapan", digit("h", 12, 56, 46, 0, 0, "8", 17)),
    ),
    k(
      "Cek: baca tabel dari kiri, delapan, tiga, empat, tujuh, lima, sembilan. Urutannya cocok dengan 834.759, jadi tabel benar.",
      tambah("baca", teks("ck", 150, 134, "8  3  4  7  5  9", 14, W.hijau)),
      tambah("cocok", teks("cc", 150, 164, "cocok dengan 834.759", 11, W.hijau)),
    ),
    k(
      "Sekarang harga mouse, 179.500. Dari kanan, dua kolom pertama nol: nol di satuan dan nol di puluhan. Nol itu wajib ditulis.",
      bersih(0),
      tambah(0, judul("harga mouse")),
      tambah(0, teks("no", 150, 48, "179.500", 22), ...tabelNilai("m", 12, 56, 46)),
      tambah("satuan", digit("m", 12, 56, 46, 0, 5, "0", 17, W.merah)),
      tambah("puluhan.", digit("m", 12, 56, 46, 0, 4, "0", 17, W.merah)),
      tambah("wajib", teks("nw", 150, 140, "nol wajib ditulis", 11, W.merah)),
    ),
    k(
      "Lanjut ke kiri: lima di ratusan, sembilan di ribuan, tujuh di puluh ribuan, satu di ratus ribuan. Tabel penuh.",
      tambah("lima", digit("m", 12, 56, 46, 0, 3, "5", 17)),
      tambah("sembilan", digit("m", 12, 56, 46, 0, 2, "9", 17)),
      tambah("tujuh", digit("m", 12, 56, 46, 0, 1, "7", 17)),
      tambah("satu", digit("m", 12, 56, 46, 0, 0, "1", 17)),
      tambah("penuh.", teks("tp", 150, 172, "tabel penuh, tidak ada kolom kosong", 10, W.hijau)),
    ),
  ],
};

/* ------------------------------ LA2. Indonesian Number-Name Mapping: konsep ------------------------------ */
const baris = (id: string, y: number, kiri: string, kanan: string) => [
  ...kartu(`${id}a`, 10, y, 126, 28, W.krem, [kiri], 9),
  panah(`${id}p`, 138, y + 14, 28, 0, W.hijau, 2.4, { gambar: true }),
  ...kartu(`${id}b`, 170, y, 120, 28, W.langit, [kanan], 9),
];

export const ADEGAN_LUAR_NAMA: AdeganStory = {
  id: "luar-nama",
  judul: "Indonesian Number-Name Mapping: konsep",
  sumber: "Metode luar 2: pemetaan angka ke nama bilangan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Metode kedua, Indonesian Number-Name Mapping, yaitu pemetaan angka ke nama bilangan dalam bahasa Indonesia.",
      tambah(0, judul("Indonesian Number-Name Mapping")),
      tambah("pemetaan", ...kartu("a1", 20, 60, 100, 56, W.krem, ["angka", "979.875"], 12)),
      tambah("nama", panah("a2", 124, 88, 52, 0, W.hijau, 3, { gambar: true }), ...kartu("a3", 180, 60, 100, 56, W.langit, ["nama bilangan", "bahasa Indonesia"], 9)),
    ),
    k(
      "Pemetaannya sederhana. Satu angka di kolom ratusan dibaca angka itu lalu ratus, di kolom puluhan angka lalu puluh, di kolom satuan angka saja.",
      bersih(0),
      tambah(0, judul("pemetaan tiap kolom")),
      tambah("ratusan", ...baris("r1", 40, "ratusan: angka 3", "tiga ratus")),
      tambah("puluhan", ...baris("r2", 76, "puluhan: angka 4", "empat puluh")),
      tambah("satuan", ...baris("r3", 112, "satuan: angka 5", "lima")),
    ),
    k(
      "Ada dua pengecualian. Angka satu di ratusan dibaca seratus, bukan satu ratus. Kolom yang berisi nol tidak disebutkan.",
      bersih(0),
      tambah(0, judul("dua pengecualian")),
      tambah("seratus,", ...kartu("e1", 14, 44, 272, 48, W.merahMuda, ["angka 1 di ratusan: seratus", "bukan satu ratus"], 9.6)),
      tambah("nol", ...kartu("e2", 14, 108, 272, 48, W.krem, ["kolom nol dilewati", "963.000: tanpa kata nol"], 9.6)),
    ),
    k(
      "Angka belasan, misalnya sebelas atau lima belas, punya nama khusus. Soal bab ini tidak memakainya, tetapi bilangan lain bisa.",
      bersih(0),
      tambah(0, judul("angka belasan")),
      tambah("sebelas", ...kartu("b1", 10, 56, 86, 46, W.langit, ["11", "sebelas"], 11)),
      tambah("lima@1", ...kartu("b2", 107, 56, 86, 46, W.krem, ["15", "lima belas"], 11)),
      tambah("khusus.", ...kartu("b3", 204, 56, 86, 46, "#DCFCE7", ["19", "sembilan belas"], 10)),
    ),
    k(
      "Terakhir, kelompok kiri dan kanan dipetakan sendiri-sendiri, lalu disambung dengan kata ribu di tengahnya.",
      bersih(0),
      tambah(0, judul("dua kelompok, satu kata ribu")),
      tambah("kiri", ...kartu("g1", 10, 60, 106, 50, W.langit, ["kelompok", "kiri"], 10)),
      tambah("ribu", ...kartu("g2", 122, 60, 56, 50, W.merahMuda, ["ribu"], 12)),
      tambah("kanan", ...kartu("g3", 184, 60, 106, 50, W.krem, ["kelompok", "kanan"], 10)),
      tambah("tengahnya.", teks("gt", 150, 152, "kata ribu ada di tengah", 10.4, W.ungu)),
    ),
  ],
};

/* ------------------------------ LA2T. Indonesian Number-Name Mapping: penerapan ------------------------------ */
export const ADEGAN_LUAR_NAMA_TERAPAN: AdeganStory = {
  id: "luar-nama-terapan",
  judul: "Indonesian Number-Name Mapping: penerapan pada harga komputer",
  sumber: "Metode luar 2: penerapan pada Ayo Berlatih nomor 2 dan kunci Buku Panduan Guru",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Terapkan pada harga speaker, 296.575. Kelompok kiri 296 dipetakan menjadi dua ratus sembilan puluh enam.",
      tambah(0, judul("harga speaker aktif")),
      tambah(0, teks("no", 150, 50, "296.575", 24), teks("hk", 78, 74, "kelompok kiri: 296", 9, W.biru)),
      tambah("dua", teks("k1", 12, 94, "2  menjadi  dua ratus", 9, W.biru, { anchor: "start" })),
      tambah("sembilan", teks("k2", 12, 110, "9  menjadi  sembilan puluh", 9, W.biru, { anchor: "start" })),
      tambah("enam.", teks("k3", 12, 126, "6  menjadi  enam", 9, W.biru, { anchor: "start" })),
    ),
    k(
      "Kelompok kanan 575 menjadi lima ratus tujuh puluh lima. Di tengahnya kita sisipkan kata ribu.",
      tambah("575", teks("hr", 222, 74, "kelompok kanan: 575", 9, W.hijau)),
      tambah("lima", teks("r1", 156, 94, "5  menjadi  lima ratus", 9, W.hijau, { anchor: "start" })),
      tambah("tujuh", teks("r2", 156, 110, "7  menjadi  tujuh puluh", 9, W.hijau, { anchor: "start" })),
      tambah("lima@2", teks("r3", 156, 126, "5  menjadi  lima", 9, W.hijau, { anchor: "start" })),
      tambah("ribu.", ...bacaanDua("bc", 150, 140, "dua ratus sembilan puluh enam ribu", "lima ratus tujuh puluh lima")),
    ),
    k(
      "Kunci Buku Panduan Guru menulis dua ratus ribu sembilan puluh enam ribu lima ratus tujuh puluh lima. Kata ribu muncul dua kali, jadi keliru.",
      bersih(0),
      tambah(0, judul("memeriksa kunci")),
      tambah("Kunci", ...kartu("kk", 14, 38, 272, 54, W.merahMuda, ["kunci Panduan Guru:", "dua ratus ribu sembilan puluh enam ribu", "lima ratus tujuh puluh lima"], 8.8)),
      tambah("keliru.", teks("kx", 150, 112, "kata ribu dua kali: keliru", 11, W.merah)),
    ),
    k(
      "Bacaan yang benar hanya memakai kata ribu sekali, tepat di antara dua kelompok. Itu aturan pemetaan kelompok.",
      tambah("benar", ...kartu("kb", 14, 126, 272, 54, "#DCFCE7", ["bacaan benar:", "dua ratus sembilan puluh enam ribu", "lima ratus tujuh puluh lima"], 8.8)),
      tambah("sekali,", panah("kp", 150, 118, 0, 6, W.hijau, 2.4, { gambar: true })),
    ),
    k(
      "Satu lagi, 159.899. Kelompok kiri dibaca seratus lima puluh sembilan, karena angka satu di ratusan menjadi seratus. Kelompok kanan dibaca delapan ratus sembilan puluh sembilan.",
      bersih(0),
      tambah(0, judul("harga headset")),
      tambah(0, teks("no", 150, 52, "159.899", 24)),
      tambah("seratus", ...kartu("hl", 14, 70, 124, 60, W.langit, ["159", "seratus lima puluh", "sembilan"], 9.4)),
      tambah("karena", teks("hrb", 150, 104, "ribu", 11, W.merah)),
      tambah("delapan", ...kartu("hrr", 162, 70, 124, 60, W.krem, ["899", "delapan ratus", "sembilan puluh sembilan"], 8.6)),
    ),
  ],
};
