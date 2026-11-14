import type { AdeganStory } from "./logika-story";
import { W, barisTabel, busurSemua, daftar, deret, emo, judul, kartu, suku, tabel } from "./k4b1i-gambar";
import { bersih, k, tambah } from "./k4b1i-bantu";

/* ------------------------------ 15. Rubrik penilaian (Panduan Guru hlm. 78-82) ------------------------------ */
const TAB_R1 = tabel("ra", 14, 32, [60, 66], [["Butir", "Bobot"], ["1", "8"], ["2", "4"], ["3", "12"], ["4", "12"], ["5", "12"], ["6", "12"], ["7", "3"], ["8", "6"]], 15, 8.6);
const TAB_R2 = tabel("rb", 164, 32, [60, 66], [["Butir", "Bobot"], ["9", "5"], ["10", "5"], ["11", "5"], ["12", "5"], ["13", "5"], ["14", "5"], ["15", "5"]], 15, 8.6);
export const ADEGAN_RUBRIK: AdeganStory = {
  id: "rubrik",
  judul: "Rubrik penilaian pengetahuan",
  sumber: "Panduan Guru hlm. 78–82",
  latar: "#FFF7ED",
  kutipan: [
    "Rubrik Penilaian Pengetahuan",
    "Tabel 1.12 Pedoman Penilaian Hasil Belajar",
    "Peserta didik tidak menjawab sama sekali",
    "Peserta didik bisa menjawab kurang tepat",
    "Peserta didik bisa menjawab benar",
    "SD Jaya Terus mengirimkan siswa kelas IV, kelas V dan kelas IV untuk mengikuti lomba matematika",
    "Melalui hasil asesmen (penilaian) guru dapat memperhatikan peserta didik yang pemahaman materi masih kurang",
  ],
  ketukan: [
    k(
      "Rubrik penilaian pengetahuan memuat lima belas butir. Tiap butir tiga tingkat: tidak menjawab nol, kurang tepat sebagian, benar skor penuh.",
      ...daftar("rb0", "Rubrik: Tabel 1.12, 15 butir", [
        { at: "nol,", t: "tidak menjawab sama sekali: skor 0", w: W.merahMuda, u: 9 },
        { at: "sebagian", t: "menjawab kurang tepat: skor sebagian", w: W.krem, u: 9 },
        { at: "penuh.", t: "menjawab benar: skor penuh", w: W.hijauMuda, u: 9 },
      ]),
    ),
    k(
      "Bobot: butir satu delapan, butir dua empat. Butir tiga sampai enam masing-masing dua belas, butir tujuh tiga, butir delapan enam. Butir sembilan sampai lima belas masing-masing lima.",
      bersih(0),
      tambah(0, judul("Bobot tiap butir")),
      tambah(0, ...barisTabel(TAB_R1, "ra", 0)),
      tambah(3, ...barisTabel(TAB_R1, "ra", 1)),
      tambah(6, ...barisTabel(TAB_R1, "ra", 2)),
      tambah(13, ...barisTabel(TAB_R1, "ra", 3), ...barisTabel(TAB_R1, "ra", 4), ...barisTabel(TAB_R1, "ra", 5), ...barisTabel(TAB_R1, "ra", 6)),
      tambah(16, ...barisTabel(TAB_R1, "ra", 7)),
      tambah(19, ...barisTabel(TAB_R1, "ra", 8)),
      tambah(26, ...[0, 1, 2, 3, 4, 5, 6, 7].flatMap((r) => barisTabel(TAB_R2, "rb", r))),
    ),
    k(
      "Jumlah bobotnya seratus empat, bukan seratus. Panduan Guru tidak memberi rumus nilai akhir; contoh video: skor dibagi seratus empat, dikali seratus.",
      bersih(0),
      tambah(0, judul("Jumlah bobot")),
      tambah("Jumlah", ...kartu("rj1", 20, 36, 260, 26, W.krem, ["4 × 12 = 48"], 10)),
      tambah("bobotnya", ...kartu("rj2", 20, 68, 260, 26, W.krem, ["7 × 5 = 35"], 10)),
      tambah("seratus", ...kartu("rj3", 12, 102, 276, 32, W.hijauMuda, ["8 + 4 + 48 + 3 + 6 + 35 = 104"], 10.4)),
      tambah("contoh", ...kartu("rj4", 12, 146, 276, 38, W.langit, ["contoh tambahan video:", "nilai = skor : 104 × 100"], 8.8)),
    ),
    k(
      "Catatan: butir sembilan menulis kelas empat, lima, dan empat, seharusnya kelas enam. Butir satu memakai delapan ribu dua, tak cocok dengan tabel soal.",
      bersih(0),
      tambah(0, judul("Catatan rubrik", W.merah)),
      tambah("butir", ...kartu("rn1", 12, 44, 276, 40, W.merahMuda, ["butir 9: kelas IV, V, dan IV", "seharusnya kelas VI"], 9)),
      tambah("satu", ...kartu("rn2", 12, 100, 276, 40, W.merahMuda, ["butir 1: 8.002 (8, 0, 0, 2)", "tabel soal: 8, 0, 3, 2"], 9)),
    ),
  ],
};

/* ------------------------------ 16. Refleksi (Buku Siswa hlm. 54; Panduan Guru hlm. 82) ------------------------------ */
export const ADEGAN_REFLEKSI: AdeganStory = {
  id: "refleksi",
  judul: "Refleksi bab, dibagi per butir",
  sumber: "Buku Siswa hlm. 54; Panduan Guru hlm. 82",
  latar: "#F5F3FF",
  kutipan: [
    "Kalian sudah mempelajari bilangan cacah sampai 10.000",
    "Dapatkah kalian mengingat kembali?",
    "Masih adakah materi yang belum kalian pahami?",
    "ajaklah teman kalian berdiskusi tentang materi tersebut",
    "Kalian juga bisa bertanya langsung kepada guru",
    "lebih banyak mengerjakan soa-soal",
    "manfaat apa yang kalian peroleh dari materi ini untuk kegiatan kalian sehari-hari?",
    "Apa manfaat yang kalian peroleh dari materi ini?",
    "membaca informasi bilangan yang ada pada struk belanja",
    "menghitung ulang total harga pembelian barang",
    "membandingkan harga dari sebuah barang dengan barang yang lainnya",
  ],
  ketukan: [
    k(
      "Refleksi dari Buku Siswa, butir pertama: kalian sudah mempelajari bilangan cacah sampai sepuluh ribu. Butir kedua: dapatkah kalian mengingat kembali?",
      bersih(0),
      tambah(0, judul("Refleksi: butir 1 dan 2")),
      tambah("pertama:", ...kartu("rf1", 14, 44, 272, 40, W.krem, ["1. sudah belajar bilangan cacah", "sampai 10.000"], 9.4)),
      tambah("kedua:", ...kartu("rf2", 14, 106, 272, 36, W.langit, ["2. dapatkah kalian mengingat kembali?"], 9.4)),
    ),
    k(
      "Butir ketiga: masih adakah materi yang belum dipahami? Butir keempat: bila sulit, ajak teman berdiskusi atau tanya guru.",
      bersih(0),
      tambah(0, judul("Refleksi: butir 3 dan 4")),
      tambah("ketiga:", ...kartu("rf3", 14, 44, 272, 36, W.merahMuda, ["3. masih ada materi yang belum dipahami?"], 9.2)),
      tambah("keempat:", ...kartu("rf4", 14, 104, 272, 44, W.hijauMuda, ["4. masih sulit?", "ajak teman berdiskusi, tanya guru"], 9.4)),
    ),
    k(
      "Butir kelima: perbanyak mengerjakan soal. Butir keenam: manfaat apa untuk kegiatan sehari-hari?",
      bersih(0),
      tambah(0, judul("Refleksi: butir 5 dan 6")),
      tambah("kelima:", ...kartu("rf5", 14, 44, 272, 36, W.krem, ["5. perbanyak mengerjakan soal"], 9.6)),
      tambah("keenam:", ...kartu("rf6", 14, 104, 272, 44, W.pink, ["6. apa manfaatnya untuk", "kegiatan sehari-hari?"], 9.6)),
    ),
    k(
      "Panduan Guru: guru bertanya manfaatnya, lalu mencontohkan membaca informasi bilangan pada struk belanja, menghitung ulang total harga, dan membandingkan harga barang.",
      bersih(0),
      tambah(0, judul("Arahan refleksi guru")),
      tambah("struk", emo("rs", 150, 70, "🧾", 36)),
      tambah("membaca", ...kartu("rg1", 20, 84, 260, 26, W.krem, ["baca informasi bilangan pada struk"], 9.2)),
      tambah("menghitung", ...kartu("rg2", 20, 116, 260, 26, W.hijauMuda, ["hitung ulang total harga"], 9.4)),
      tambah("membandingkan", ...kartu("rg3", 20, 148, 260, 26, W.langit, ["bandingkan harga barang"], 9.4)),
    ),
  ],
};

/* ------------------------------ 17. Remedial dan Pengayaan 1-3 (Panduan Guru hlm. 83-85) ------------------------------ */
const BB = { bw: 36, gap: 6, u: 8.2 };
const D_MANGGA = deret("kb", 6, 90, ["570", "1.140", "1.710", "2.280", "2.850", "3.420", "3.990"], BB);
const B_MANGGA = busurSemua("kb", 6, 90, ["+570", "+570", "+570", "+570", "+570", "+570"], { ...BB, tinggi: 10 });
export const ADEGAN_PENGAYAAN_1: AdeganStory = {
  id: "pengayaan-1",
  judul: "Remedial dan Pengayaan 1 sampai 3",
  sumber: "Panduan Guru hlm. 83–85",
  latar: "#F0FDF4",
  kutipan: [
    "Panduan untuk Remedial",
    "Remedial yang dapat dilakukan dengan memberikan contoh yang lain",
    "data yang ada di sekitar rumah masing-masing peserta didik",
    "Kegiatan pengayaan dapat dikembangkan materi operasi bilangan dengan memperhatikan urutan dalam operasi",
    "Setiap hari truk pick up tersebut mengangkut 570 buah mangga",
    "3.990 buah mangga",
    "340 kg buah mangga, 235 kg buah apel dan 150 kg buah melon",
    "725 kilogram buah",
    "Dalam 1 dus terdapat 12 pak pensil tulis dan 1 pak berisi 8 pensil tulis",
    "96 pensil tulis",
  ],
  ketukan: [
    k(
      "Murid yang pemahamannya kurang menjalani remedial: contoh lain lewat tugas rumah berupa data di sekitar rumah. Murid yang cukup paham lanjut ke pengayaan, lima soal.",
      ...daftar("rm", "Remedial dan pengayaan", [
        { at: "remedial", t: "remedial: contoh lain, data di sekitar rumah", w: W.merahMuda, u: 8.8 },
        { at: "pengayaan.", t: "pengayaan: soal operasi bilangan cacah", w: W.hijauMuda, u: 9 },
      ]),
    ),
    k(
      "Pengayaan satu: truk mengangkut lima ratus tujuh puluh mangga tiap hari. Seminggu tujuh hari: lima ratus tujuh puluh kali tujuh sama dengan tiga ribu sembilan ratus sembilan puluh.",
      bersih(0),
      tambah(0, judul("Pengayaan 1: mangga seminggu")),
      tambah("mengangkut", ...kartu("p1a", 20, 34, 260, 26, W.krem, ["570 mangga tiap hari"], 9.6)),
      tambah("Seminggu", ...[0, 1, 2, 3, 4, 5, 6].flatMap((i) => suku(D_MANGGA, i))),
      tambah("Seminggu", ...B_MANGGA.flat()),
      tambah("sama", ...kartu("p1b", 20, 130, 260, 30, W.hijauMuda, ["570 × 7 = 3.990"], 11)),
    ),
    k(
      "Pengayaan dua: penjual jus butuh tiga ratus empat puluh kilogram mangga, dua ratus tiga puluh lima apel, dan seratus lima puluh melon. Jumlahnya tujuh ratus dua puluh lima kilogram.",
      bersih(0),
      tambah(0, judul("Pengayaan 2: buah penjual jus")),
      tambah("mangga,", emo("p2a", 60, 62, "🥭", 28)),
      tambah("apel,", emo("p2b", 150, 62, "🍎", 28)),
      tambah("melon.", emo("p2c", 240, 62, "🍈", 28)),
      tambah("Jumlahnya", ...kartu("p2d", 20, 84, 260, 28, W.krem, ["340 + 235 = 575"], 10.4)),
      tambah("Jumlahnya", ...kartu("p2e", 20, 118, 260, 28, W.krem, ["575 + 150 = 725"], 10.4)),
      tambah("kilogram.", ...kartu("p2f", 20, 154, 260, 28, W.hijauMuda, ["jumlah buah 725 kg"], 10.4)),
    ),
    k(
      "Pengayaan tiga: satu dus berisi dua belas pak, tiap pak delapan pensil. Sepuluh kali delapan delapan puluh, dua kali delapan enam belas, jumlahnya sembilan puluh enam.",
      bersih(0),
      tambah(0, judul("Pengayaan 3: pensil satu dus")),
      tambah("dus", ...kartu("p3a", 20, 34, 260, 28, W.krem, ["12 pak × 8 pensil tiap pak"], 10)),
      tambah("sepuluh", ...kartu("p3b", 20, 74, 260, 28, W.langit, ["10 × 8 = 80"], 10.4)),
      tambah("dua@2", ...kartu("p3c", 20, 108, 260, 28, W.langit, ["2 × 8 = 16"], 10.4)),
      tambah("jumlahnya", ...kartu("p3d", 20, 142, 260, 28, W.hijauMuda, ["80 + 16 = 96"], 10.4)),
    ),
  ],
};

/* ------------------------------ 18. Pengayaan 4-5 (Panduan Guru hlm. 83-87) ------------------------------ */
export const ADEGAN_PENGAYAAN_2: AdeganStory = {
  id: "pengayaan-2",
  judul: "Pengayaan 4 dan 5",
  sumber: "Panduan Guru hlm. 83–87",
  latar: "#FEFCE8",
  kutipan: [
    "terdapat 59 buah apel yang busuk dan 97 buah apel yang cacat",
    "Hitunglah berapa banyak buah apel yang masih bagus",
    "Kelas IV Sekolah Dasar Suka Maju mempunyai 48 siswa",
    "Jika setiap kelompok belajar beranggotakan 8 siswa",
    "Jika setiap kelompok belajar beranggotakan 4 siswa",
    "Jika Pak Guru mempunyai 96 lembar kertas kosong",
    "Guru menunjukkan kepada peserta didik bahwa hasil pembagian",
  ],
  ketukan: [
    k(
      "Pengayaan empat: dari tujuh ratus delapan puluh lima apel, lima puluh sembilan busuk dan sembilan puluh tujuh cacat. Dikurangi bertahap: tujuh ratus dua puluh enam, lalu enam ratus dua puluh sembilan apel bagus.",
      bersih(0),
      tambah(0, judul("Pengayaan 4: apel petani")),
      tambah(2, emo("p4e", 40, 62, "🍎", 26)),
      tambah("tujuh", ...kartu("p4a", 80, 34, 200, 26, W.krem, ["785 apel dipanen"], 9.6)),
      tambah("busuk", ...kartu("p4b", 20, 74, 260, 28, W.merahMuda, ["785 − 59 = 726"], 11)),
      tambah("cacat.", ...kartu("p4c", 20, 110, 260, 28, W.merahMuda, ["726 − 97 = 629"], 11)),
      tambah("bagus.", ...kartu("p4d", 20, 148, 260, 28, W.hijauMuda, ["apel bagus: 629"], 10.4)),
    ),
    k(
      "Pengayaan lima, kelas empat memiliki empat puluh delapan siswa. Soal membentuk kelompok delapan siswa, jadi enam kelompok. Kunci memakai empat siswa, jadi dua belas kelompok.",
      bersih(0),
      tambah(0, judul("Pengayaan 5a: kelompok belajar")),
      tambah("memiliki", ...kartu("p5a", 20, 34, 260, 26, W.krem, ["48 siswa di kelas IV"], 9.6)),
      tambah("Soal", ...kartu("p5b", 20, 72, 260, 30, W.hijauMuda, ["soal: 8 siswa, 48 : 8 = 6 kelompok"], 9.6)),
      tambah("Kunci", ...kartu("p5c", 20, 114, 260, 30, W.merahMuda, ["kunci: 4 siswa, 48 : 4 = 12 kelompok"], 9.2)),
      tambah("jadi@2", ...kartu("p5d", 20, 156, 260, 28, W.krem, ["soal dan kunci tidak cocok"], 9.6)),
    ),
    k(
      "Soal lima b: sembilan puluh enam lembar dibagi rata kepada empat puluh delapan siswa, jadi dua lembar tiap siswa, cocok dengan kunci.",
      bersih(0),
      tambah(0, judul("Pengayaan 5b: kertas")),
      tambah("lembar", ...kartu("p5e", 20, 40, 260, 30, W.krem, ["96 lembar kertas, 48 siswa"], 10)),
      tambah("dibagi", ...kartu("p5f", 20, 86, 260, 32, W.hijauMuda, ["96 : 48 = 2"], 11)),
      tambah("dua", ...kartu("p5g", 20, 134, 260, 30, W.pink, ["tiap siswa 2 lembar"], 10)),
    ),
  ],
};

/* ------------------------------ 19. Interaksi dengan orang tua dan penutup bab (Panduan Guru hlm. 88) ------------------------------ */
export const ADEGAN_ORANG_TUA: AdeganStory = {
  id: "orang-tua",
  judul: "Interaksi dengan orang tua dan penutup bab",
  sumber: "Panduan Guru hlm. 88",
  latar: "#FDF2F8",
  kutipan: [
    "Interaksi dengan Orang Tua",
    "mencari benda-benda kontekstual yang bisa merepresentasikan bilangan cacah 4 angka",
    "struk pembayaran pembelian barang",
    "menentukan nilai tempat dari masing-masing bilangan tersebut",
    "Sumber bacaan peserta didik yang dapat diakses meliputi",
    "https://sumber.belajar.kemdikbud.go.id",
    "Buku Pedoman Guru Matematika Kelas IV",
  ],
  ketukan: [
    k(
      "Interaksi dengan orang tua: murid mencari benda kontekstual yang menunjukkan bilangan cacah empat angka, dan menyampaikan idenya kepada orang tua, misalnya ikut ke swalayan untuk mendapat struk belanja.",
      bersih(0),
      tambah(0, judul("Interaksi dengan orang tua")),
      tambah("mencari", ...kartu("ot1", 20, 36, 260, 30, W.krem, ["cari benda: bilangan 4 angka"], 9.6)),
      tambah("menyampaikan", ...kartu("ot2", 20, 76, 260, 30, W.hijauMuda, ["sampaikan ide kepada orang tua"], 9.6)),
      tambah("swalayan", emo("ot3", 70, 140, "🛒", 30)),
      tambah("struk", emo("ot4", 150, 140, "🧾", 30)),
    ),
    k(
      "Tugas rumah: bersama orang tua, susun beberapa bilangan cacah empat angka di buku tulis, lalu tentukan nilai tempat tiap angka.",
      ...daftar("ot5", "Tugas rumah", [
        { at: "susun", t: "susun beberapa bilangan 4 angka", w: W.krem, u: 9.4 },
        { at: "buku", t: "tulis di buku tulis", w: W.langit, u: 9.6 },
        { at: "nilai", t: "tentukan nilai tempat tiap angka", w: W.hijauMuda, u: 9.4 },
      ]),
    ),
    k(
      "Sumber bacaan murid: Buku Siswa Matematika Kelas empat dan sumber belajar Kemdikbud. Guru juga memakai Buku Pedoman Guru. Sekian Bab satu, bilangan cacah sampai sepuluh ribu.",
      bersih(0),
      tambah(0, judul("Sumber bacaan")),
      tambah("Buku", ...kartu("sb1", 20, 36, 260, 28, W.krem, ["Buku Siswa Matematika Kelas IV"], 9.6)),
      tambah("sumber@2", ...kartu("sb2", 20, 72, 260, 28, W.langit, ["sumber.belajar.kemdikbud.go.id"], 9.2)),
      tambah("Guru", ...kartu("sb3", 20, 108, 260, 28, W.hijauMuda, ["guru: Buku Pedoman Guru"], 9.6)),
      tambah("Sekian", ...kartu("sb4", 20, 150, 260, 34, W.pink, ["Bab 1 selesai:", "bilangan cacah sampai 10.000"], 9.6)),
    ),
  ],
};
