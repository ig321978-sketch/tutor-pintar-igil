import type { AdeganStory } from "./logika-story";
import { W, barisTabel, emo, kartu, kotak, panah, tabel, teks } from "./k6b1c-gambar";
import { bersih, k, sorotkan, tambah } from "./k6b1c-bantu";

/* ------------------------------ 1. Jarak rumah ke sekolah dan nilai tempat ------------------------------ */
const LB = [58, 52];
const kiriData = [
  ["Alma", "2,3"],
  ["Budi", "10,9"],
  ["Anita", "1,9"],
  ["Fadilah", "4,7"],
  ["Musa", "11,3"],
];
const kananData = [
  ["Rini", "2,6"],
  ["Rido", "3,6"],
  ["Dias", "3,1"],
  ["Fatim", "2,8"],
  ["Andi", "1,5"],
];
const TP = [44, 50, 50, 66, 70];
const nilaiTempat = (id: string, y: number, jarak: string, p: string, s: string, pr: string, ps: string) => barisTabel(id, 10, y, TP, 22, [jarak, p, s, pr, ps], 8.4);

export const ADEGAN_JARAK: AdeganStory = {
  id: "jarak-sekolah",
  judul: "Jarak rumah ke sekolah dan nilai tempat",
  sumber: "Materi: jarak rumah ke sekolah",
  latar: "#EFF6FF",
  kutipan: [
    "Membandingkan dan Mengurutkan Bilangan Desimal",
    "Agam mendapat tugas untuk mencari data jarak dari rumah ke sekolah 10 orang temannya di sekolah",
    "Bantulah Agam untuk menyusun kembali tabelnya dengan mengurutkan mulai dari yang jarak rumahnya ke sekolah yang terdekat",
    "Siapakah yang paling jauh jarak rumahnya ke sekolah",
    "Siapakah yang jarak dari rumahnya ke sekolah paling dekat",
    "Tentukan nilai tempat dari data masing-masing jarak rumah ke sekolah tersebut",
    "Puluhan Satuan Persepuluhan Perseratusan",
  ],
  ketukan: [
    k(
      "Sekarang kita belajar membandingkan dan mengurutkan desimal. Agam mendapat tugas mencari data jarak rumah ke sekolah dari sepuluh temannya.",
      tambah(0, teks("jud", 150, 24, "Membandingkan dan Mengurutkan", 12, W.ungu)),
      tambah("Agam", emo("ag", 70, 100, "👦", 36), teks("agt", 70, 122, "Agam", 8.6)),
      tambah("sekolah", emo("sk", 230, 100, "🏫", 36), teks("skt", 230, 122, "sekolah", 8.6), panah("pj", 98, 96, 100, 0, W.hijau, 2.5, { gambar: true })),
      tambah("sepuluh", teks("sp", 150, 176, "10 teman, 10 jarak (km)", 11, W.merah)),
    ),
    k(
      "Datanya begini, dalam kilometer: Alma dua koma tiga, Budi sepuluh koma sembilan, Anita satu koma sembilan, Fadilah empat koma tujuh, dan Musa sebelas koma tiga.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Jarak rumah ke sekolah (km)", 11, W.ungu), tabel("tl", 10, 34, LB, 22, [["Nama", "km"]], 8.4)),
      tambah("Alma", barisTabel("r1", 10, 56, LB, 22, kiriData[0], 8.4)),
      tambah("Budi", barisTabel("r2", 10, 78, LB, 22, kiriData[1], 8.4)),
      tambah("Anita", barisTabel("r3", 10, 100, LB, 22, kiriData[2], 8.4)),
      tambah("Fadilah", barisTabel("r4", 10, 122, LB, 22, kiriData[3], 8.4)),
      tambah("Musa", barisTabel("r5", 10, 144, LB, 22, kiriData[4], 8.4)),
    ),
    k(
      "Berikutnya: Rini dua koma enam, Rido tiga koma enam, Dias tiga koma satu, Fatim dua koma delapan, dan Andi satu koma lima.",
      tambah(0, tabel("tr", 150, 34, LB, 22, [["Nama", "km"]], 8.4)),
      tambah("Rini", barisTabel("q1", 150, 56, LB, 22, kananData[0], 8.4)),
      tambah("Rido", barisTabel("q2", 150, 78, LB, 22, kananData[1], 8.4)),
      tambah("Dias", barisTabel("q3", 150, 100, LB, 22, kananData[2], 8.4)),
      tambah("Fatim", barisTabel("q4", 150, 122, LB, 22, kananData[3], 8.4)),
      tambah("Andi", barisTabel("q5", 150, 144, LB, 22, kananData[4], 8.4)),
    ),
    k(
      "Sekarang tentukan nilai tempat tiap jarak. Jarak dua koma tiga punya dua satuan dan tiga persepuluhan. Jarak sepuluh koma sembilan punya satu puluhan, nol satuan, dan sembilan persepuluhan.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Nilai tempat tiap jarak", 12, W.ungu), tabel("nt", 10, 34, TP, 22, [["km", "Puluhan", "Satuan", "Persepuluhan", "Perseratusan"]], 7)),
      tambah("tiga", nilaiTempat("n1", 56, "2,3", "0", "2", "3", "0")),
      tambah("sepuluh@2", nilaiTempat("n2", 78, "10,9", "1", "0", "9", "0")),
    ),
    k(
      "Jarak satu koma sembilan punya nol puluhan, satu satuan, dan sembilan persepuluhan. Jarak empat koma tujuh punya empat satuan dan tujuh persepuluhan. Jarak sebelas koma tiga punya satu puluhan, satu satuan, dan tiga persepuluhan.",
      tambah("satu", nilaiTempat("n3", 100, "1,9", "0", "1", "9", "0")),
      tambah("empat", nilaiTempat("n4", 122, "4,7", "0", "4", "7", "0")),
      tambah("sebelas", nilaiTempat("n5", 144, "11,3", "1", "1", "3", "0")),
    ),
  ],
};

/* ------------------------------ 2. Tabel terurut dari terdekat ------------------------------ */
const urutKiri = [
  ["Andi", "1,5"],
  ["Anita", "1,9"],
  ["Alma", "2,3"],
  ["Rini", "2,6"],
  ["Fatim", "2,8"],
];
const urutKanan = [
  ["Dias", "3,1"],
  ["Rido", "3,6"],
  ["Fadilah", "4,7"],
  ["Budi", "10,9"],
  ["Musa", "11,3"],
];

export const ADEGAN_URUT: AdeganStory = {
  id: "urut-terdekat",
  judul: "Tabel jarak diurutkan dari terdekat",
  sumber: "Materi: tabel dari yang terdekat",
  latar: "#F0FDF4",
  kutipan: [
    "Isilah tabel berikut ini sesuai dengan jarak rumah ke sekolah dari yang terdekat",
    "Siswa yang jarak rumahnya ke sekolah paling jauh adalah",
    "Siswa yang jarak rumahnya ke sekolah paling dekat adalah",
  ],
  ketukan: [
    k(
      "Sekarang isi tabel dari yang terdekat. Terdekat adalah Andi satu koma lima, lalu Anita satu koma sembilan, Alma dua koma tiga, Rini dua koma enam, dan Fatim dua koma delapan.",
      tambah(0, teks("jud", 150, 22, "Urutan dari terdekat", 12, W.ungu), tabel("tl", 10, 34, LB, 22, [["Nama", "km"]], 8.4)),
      tambah("Andi", barisTabel("a1", 10, 56, LB, 22, urutKiri[0], 8.4)),
      tambah("Anita", barisTabel("a2", 10, 78, LB, 22, urutKiri[1], 8.4)),
      tambah("Alma", barisTabel("a3", 10, 100, LB, 22, urutKiri[2], 8.4)),
      tambah("Rini", barisTabel("a4", 10, 122, LB, 22, urutKiri[3], 8.4)),
      tambah("Fatim", barisTabel("a5", 10, 144, LB, 22, urutKiri[4], 8.4)),
    ),
    k(
      "Berikutnya Dias tiga koma satu, Rido tiga koma enam, Fadilah empat koma tujuh, Budi sepuluh koma sembilan, dan terakhir Musa sebelas koma tiga.",
      tambah(0, tabel("tr", 150, 34, LB, 22, [["Nama", "km"]], 8.4)),
      tambah("Dias", barisTabel("b1", 150, 56, LB, 22, urutKanan[0], 8.4)),
      tambah("Rido", barisTabel("b2", 150, 78, LB, 22, urutKanan[1], 8.4)),
      tambah("Fadilah", barisTabel("b3", 150, 100, LB, 22, urutKanan[2], 8.4)),
      tambah("Budi", barisTabel("b4", 150, 122, LB, 22, urutKanan[3], 8.4)),
      tambah("Musa", barisTabel("b5", 150, 144, LB, 22, urutKanan[4], 8.4)),
    ),
    k(
      "Siapa yang rumahnya paling jauh dari sekolah? Musa, dengan jarak sebelas koma tiga kilometer.",
      sorotkan("Musa", "b5-s0", "b5-s1"),
      tambah("jauh", teks("jh", 215, 184, "paling jauh: Musa, 11,3 km", 9.4, W.merah)),
    ),
    k(
      "Dan yang paling dekat? Andi, dengan jarak satu koma lima kilometer.",
      sorotkan("Andi", "a1-s0", "a1-s1"),
      tambah("dekat", teks("dk", 75, 184, "paling dekat: Andi, 1,5 km", 9.4, W.hijau)),
    ),
  ],
};

/* ------------------------------ 3. Pembahasan membandingkan dan mengurutkan ------------------------------ */
const TT = [46, 50, 66, 70];
const bandingBaris = (id: string, y: number, jarak: string, s: string, pr: string, ps: string) => barisTabel(id, 34, y, TT, 20, [jarak, s, pr, ps], 8.4);

export const ADEGAN_NILAI_TEMPAT: AdeganStory = {
  id: "nilai-tempat-banding",
  judul: "Nilai tempat, 2,49 dan 2,9, mengurutkan",
  sumber: "Materi: nilai tempat dan urutan",
  latar: "#FFF7ED",
  kutipan: [
    "Untuk membandingkan dua bilangan desimal, kalian dapat menggunakan nilai tempat dari bilangan desimal tersebut",
    "Bilangan desimal diletakkan di sebelah kanan tanda koma",
    "bilangan asli diletakkan di sebelah kiri tanda koma",
    "Untuk mengurutkan bilangan desimal dari yang terbesar ke yang terkecil",
    "Nilai tempat dapat membantu kalian untuk menentukan bilangan mana yang lebih besar atau lebih kecil dari yang lainnya",
    "Ayo Menggunakan Teknologi",
    "Ada siswa yang mengatakan bahwa 2,49 lebih besar dari 2,9 karena 49 lebih besar dari 9",
    "Bagaimana pendapat kalian",
    "Urutan dari yang terdekat ke yang terjauh adalah 0,9 km, 1,9 km, 2,3 km, 2,6 km, dan 3,6 km",
  ],
  ketukan: [
    k(
      "Sekarang pembahasannya. Untuk membandingkan dua desimal, gunakan nilai tempat. Bilangan asli ada di sebelah kiri tanda koma, dan bagian desimal ada di sebelah kanan.",
      tambah(0, teks("jud", 150, 24, "Nilai tempat bilangan desimal", 12, W.ungu)),
      tambah("kiri", kotak("kr", 20, 50, 110, 60, W.langit, W.biru, { rx: 6 }), teks("krt", 75, 86, "3", 28), teks("krl", 75, 124, "bilangan asli (kiri)", 8.4)),
      tambah("koma", teks("kma", 143, 100, ",", 30, W.merah)),
      tambah("kanan", kotak("kn", 156, 50, 124, 60, W.mint, W.biru, { rx: 6 }), teks("knt", 218, 86, "6", 28), teks("knl", 218, 124, "bagian desimal (kanan)", 8.4)),
    ),
    k(
      "Hati-hati. Ada teman yang bilang dua koma empat sembilan lebih besar dari dua koma sembilan, karena empat puluh sembilan lebih besar dari sembilan. Setujukah kamu?",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Hati-hati", 13, W.merah)),
      tambah("teman", emo("sw", 60, 110, "🙋", 36)),
      tambah("koma", kotak("bl", 100, 60, 180, 64, W.putih, W.biru, { rx: 8 }), teks("bl1", 190, 86, "2,49 lebih besar dari 2,9", 9.4), teks("bl2", 190, 106, "karena 49 lebih besar dari 9", 9.4)),
      tambah("Setujukah", teks("tn", 190, 160, "setuju?", 20, W.merah)),
    ),
    k(
      "Samakan dulu panjangnya: dua koma sembilan sama dengan dua koma sembilan nol. Satuannya sama, yaitu dua. Persepuluhannya empat, lebih kecil dari sembilan. Jadi dua koma empat sembilan lebih kecil, dan teman tadi keliru.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Bandingkan dari kiri", 12, W.ungu), tabel("hd", 34, 36, TT, 20, [["", "Satuan", "Persepuluhan", "Perseratusan"]], 7)),
      tambah("sembilan", ...bandingBaris("c1", 56, "2,49", "2", "4", "9")),
      tambah("sama@2", ...bandingBaris("c2", 76, "2,90", "2", "9", "0")),
      sorotkan("Persepuluhannya", "c1-s2", "c2-s2"),
      tambah("keliru", teks("hs", 150, 130, "2,49 lebih kecil dari 2,90", 13, W.merah), teks("hs2", 150, 150, "2,49 < 2,9", 18, W.hijau), teks("hs3", 150, 176, "bukan karena 49 lebih besar dari 9", 8.8, W.merah)),
    ),
    k(
      "Contoh urutan lima jarak: yang terdekat nol koma sembilan kilometer dan yang terjauh tiga koma enam. Urutannya nol koma sembilan, satu koma sembilan, dua koma tiga, dua koma enam, lalu tiga koma enam.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Contoh lima jarak (km)", 12, W.ungu)),
      tambah("terdekat", teks("u0", 40, 100, "0,9", 20, W.hijau), teks("u0t", 40, 120, "terdekat", 8, W.hijau)),
      tambah("terjauh", teks("u4", 260, 100, "3,6", 20, W.merah), teks("u4t", 260, 120, "terjauh", 8, W.merah)),
      tambah("Urutannya", teks("u1", 100, 160, "1,9", 16), teks("u2", 150, 160, "2,3", 16), teks("u3", 200, 160, "2,6", 16)),
    ),
    k(
      "Renungan: bagaimana caramu membandingkan dua desimal? Lihat nilai tempatnya dari kiri. Bagaimana cara mengurutkan? Bandingkan semuanya, lalu susun dari yang terkecil.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Renungan", 13, W.ungu)),
      tambah("membandingkan", kartu("r1", 24, 52, 252, 44, W.krem, ["membandingkan: nilai tempat", "dari kiri ke kanan"], 9)),
      tambah("mengurutkan", kartu("r2", 24, 112, 252, 44, W.mint, ["mengurutkan: bandingkan semua,", "lalu susun dari terkecil"], 9)),
    ),
  ],
};
