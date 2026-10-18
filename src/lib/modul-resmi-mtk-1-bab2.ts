import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { MISI_MTK1_BAB2, kuisDariMisi } from "@/lib/misi-kebun-mtk-1";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK1_BAB2 = "Bab 2: Penjumlahan sampai dengan 10";
export const JUDUL_MTK1_BAB2_LAMA = "Bab 2: Penjumlahan sampai 10";

export const MODUL_MTK1_BAB2: ModulResmiPai = {
  id: "mtk-1-bab2",
  judul: JUDUL_MTK1_BAB2,
  pola: /penjumlahan\s+sampai(\s+dengan)?\s+10\b|cerita penjumlahan|bermain lompat tali|ayo menjumlahkan/,
  motivasi:
    "Hore! Rara, Bimo, dan Igil belajar menjumlah sampai 10. Buat cerita penjumlahan, coba empat cara menjumlah, lalu selesaikan soal cerita.",
  kunciJawaban: "B,C,B,B,B,B,B,B,B,B",
  sketsaKartu: [
    "Rara, Bimo, dan Igil di halaman: 4 anak bermain lompat tali, lalu datang 2 anak. 4 + 2 = 6.",
    "Empat cara menjumlah: pasangan bilangan, menghitung maju, penjumlahan berulang, dan hasil 10.",
    "Igil menjaga sepuluh pos lapangan lompat: menghitung, membaca, menulis, dan membandingkan.",
    "Lembar evaluasi cerita penjumlahan, hitung maju, pasangan sepuluh, dan soal cerita.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: LOTS]
Ada 4 kelereng merah dan 5 kelereng biru. Semuanya ada...
A) 8
B) 9
C) 10`,
    `[Soal 2 - PG - Tipe: LOTS]
Ada 6 kupu-kupu kuning dan 3 kupu-kupu ungu. Semuanya ada...
A) 6
B) 8
C) 9`,
    `[Soal 3 - PG - Tipe: LOTS]
Ada 3 pita biru dan 4 pita merah. 3 + 4 = ...
A) 6
B) 7
C) 8`,
    `[Soal 4 - PG - Tipe: HOTS]
Pada garis bilangan, 7 + 3 = ...
A) 9
B) 10
C) 8`,
    `[Soal 5 - PG - Tipe: LOTS]
Ada 6 siswa di kelas. Datang lagi 4 siswa. Semuanya ada...
A) 9
B) 10
C) 11`,
    `[Soal 6 - PG - Tipe: LOTS]
Ada 3 motor dan 2 mobil. Jumlah semua kendaraan adalah...
A) 4
B) 5
C) 6`,
    `[Soal 7 - PG - Tipe: HOTS]
Tiga motor punya 6 roda. Dua mobil punya 8 roda. Jumlah semua roda adalah...
A) 12
B) 14
C) 10`,
    `[Soal 8 - PG - Tipe: HOTS]
Mana yang merupakan penjumlahan berulang?
A) 2 + 2 = 5
B) 3 + 3 = 6
C) 4 + 4 = 7`,
    `[Soal 9 - PG - Tipe: HOTS]
8 + ... = 10. Bilangan yang hilang adalah...
A) 1
B) 2
C) 3`,
    `[Soal 10 - PG - Tipe: LOTS]
Ada 4 burung di dahan. Datang lagi 2 burung. Semuanya ada...
A) 5
B) 6
C) 7`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "Bermain Lompat Tali",
      pengantar:
        "Rara, Bimo, dan Igil melihat anak-anak bermain lompat tali. Empat anak sudah bermain. Dua anak datang lagi. Jumlahnya menjadi enam.",
      labelDaftar: "Cerita penjumlahan",
      kolom: 1,
      item: [
        {
          nama: "Tujuan pembelajaran",
          singkat: "Menjumlah sampai 10",
          uraian:
            "Siswa dapat membuat cerita penjumlahan, menulis operasi dengan tanda + dan =, menjumlah dengan pasangan bilangan, menghitung maju, penjumlahan berulang, dan pasangan yang hasilnya 10, lalu menyelesaikan soal cerita.",
          contoh: "4 + 2 = 6",
        },
        {
          nama: "Cerita lompat tali",
          singkat: "4 anak ditambah 2 anak",
          uraian:
            "Mula-mula ada 4 anak. Bertambah 2 anak. Hasilnya 6 anak. Ditulis 4 + 2 = 6. Dibaca: empat ditambah dua hasilnya enam. Tanda + berarti digabung. Menjumlahkan berarti menggabungkan dua kelompok.",
          contoh: "3 pensil merah + 4 pensil biru = 7",
        },
      ],
      kuis: [
        { pertanyaan: "Ada 4 bola di keranjang dan 3 bola di luar. Semuanya berapa?", alias: ["7", "tujuh"] },
        { pertanyaan: "Ada 4 anak, lalu datang 2 anak. Berapa semuanya?", alias: ["6", "enam"] },
        { pertanyaan: "Tuliskan 4 + 2 = 6.", alias: ["4 + 2 = 6", "4+2=6"] },
        { pertanyaan: "Ada 3 pensil merah dan 4 pensil biru. Semuanya berapa?", alias: ["7", "tujuh"] },
        { pertanyaan: "Tuliskan 3 + 4 = 7.", alias: ["3 + 4 = 7", "3+4=7"] },
        { pertanyaan: "Ada 4 mobil kuning dan 4 mobil merah. Semuanya berapa?", alias: ["8", "delapan"] },
        { pertanyaan: "Ada 4 burung, lalu datang 2 burung. Berapa semuanya?", alias: ["6", "enam"] },
        { pertanyaan: "Tuliskan 4 + 2 = 6 untuk burung.", alias: ["4 + 2 = 6", "4+2=6"] },
        { pertanyaan: "Ada 5 siswa, lalu datang 3 siswa. Berapa semuanya?", alias: ["8", "delapan"] },
        { pertanyaan: "Tuliskan 5 + 3 = 8.", alias: ["5 + 3 = 8", "5+3=8"] },
        { pertanyaan: "Ada 3 sepeda dan 1 becak. Berapa kendaraannya?", alias: ["4", "empat"] },
        { pertanyaan: "Roda sepeda ada 6 dan roda becak ada 3. Semuanya berapa?", alias: ["9", "sembilan"] },
        { pertanyaan: "Ada 2 kelereng merah dan 3 kelereng biru. Tuliskan operasinya.", alias: ["2 + 3 = 5", "2+3=5"] },
      ],
      voice: [
        [
          "Rara, Bimo, dan Igil berdiri di halaman. Empat anak sudah bermain lompat tali. Dua anak datang lagi. Sekarang ada enam anak.",
          "Kita menulis 4 + 2 = 6. Dibaca: empat ditambah dua hasilnya enam. Tanda tambah berarti digabung.",
          "Rara punya 3 pensil merah. Bimo punya 4 pensil biru. Digabung menjadi 7 pensil. Tiga tambah empat sama dengan tujuh.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Berbagai Cara Melakukan Penjumlahan",
      pengantar:
        "Ada empat cara menjumlah: pasangan bilangan, menghitung maju, penjumlahan berulang, dan pasangan yang hasilnya 10.",
      labelDaftar: "Empat cara menjumlah sampai 10",
      kolom: 1,
      item: [
        {
          nama: "Pasangan bilangan",
          singkat: "Sebagian ditambah sebagian",
          uraian:
            "Lima apel terdiri dari 3 apel merah dan 2 apel hijau. 3 + 2 = 5 dan 2 + 3 = 5. Empat kupu-kupu kuning dan 1 kupu-kupu merah juga menjadi 5. Urutan boleh dibalik, hasilnya tetap sama.",
          contoh: "4 + 1 = 5",
        },
        {
          nama: "Menghitung maju",
          singkat: "Lompat ke depan",
          uraian:
            "Berdiri di angka yang pertama, lalu melompat sebanyak angka yang kedua. Dari 5, lompat 3 langkah: 6, 7, 8. Jadi 5 + 3 = 8. Dari 1, lompat 2 langkah: 2, 3. Jadi 1 + 2 = 3.",
          contoh: "5 + 3 = 8",
        },
        {
          nama: "Penjumlahan berulang",
          singkat: "Dua bilangan yang sama",
          uraian:
            "1 + 1 = 2, 2 + 2 = 4, 3 + 3 = 6, 4 + 4 = 8, dan 5 + 5 = 10. Dua kelompok yang sama banyak digabung.",
          contoh: "3 + 3 = 6",
        },
        {
          nama: "Penjumlahan yang hasilnya 10",
          singkat: "Teman sepuluh",
          uraian:
            "9 + 1 = 10, 8 + 2 = 10, 7 + 3 = 10, 6 + 4 = 10, dan 5 + 5 = 10. Urutan boleh dibalik: 1 + 9 = 10, 2 + 8 = 10, 3 + 7 = 10, dan 4 + 6 = 10.",
          contoh: "7 + 3 = 10",
        },
      ],
      kuis: [
        { pertanyaan: "Lima apel terdiri dari 3 merah dan berapa hijau?", alias: ["2", "dua"] },
        { pertanyaan: "Tuliskan 3 + 2 = 5.", alias: ["3 + 2 = 5", "3+2=5"] },
        { pertanyaan: "Mana pasangan lain untuk 5?", alias: ["4 dan 1", "a"] },
        { pertanyaan: "Susun lompatan dari 5: 6, 7, 8.", alias: ["6", "7", "8"] },
        { pertanyaan: "Dari angka 5, lompat 3 langkah. Sekarang di angka berapa?", alias: ["8", "delapan"] },
        { pertanyaan: "Mana penjumlahan berulang?", alias: ["2 + 2 = 4", "a"] },
        { pertanyaan: "3 + 3 hasilnya berapa?", alias: ["6", "enam"] },
        { pertanyaan: "Agar 8 menjadi 10, tambah berapa?", alias: ["2", "dua"] },
        { pertanyaan: "Tuliskan 8 + 2 = 10.", alias: ["8 + 2 = 10", "8+2=10"] },
        { pertanyaan: "9 ditambah berapa sama dengan 10?", alias: ["1", "satu"] },
      ],
      voice: [
        [
          "Cara pertama, pasangan bilangan. Lima apel dipisah menjadi 3 merah dan 2 hijau. Tiga tambah dua sama dengan lima. Dua tambah tiga juga lima.",
          "Cara kedua, menghitung maju. Berdiri di angka 5, lalu lompat tiga langkah: enam, tujuh, delapan.",
          "Cara ketiga, penjumlahan berulang. Satu tambah satu, dua tambah dua, tiga tambah tiga.",
          "Cara keempat, cari teman supaya hasilnya sepuluh. Tujuh butuh tiga. Delapan butuh dua. Sembilan butuh satu.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Misi Lapangan Lompat",
      pengantar:
        "Bantu Igil mengisi 10 pos di lapangan lompat tali. Hijau untuk menghitung, biru untuk membaca, kuning untuk menulis, dan ungu untuk membandingkan.",
      labelDaftar: "Sepuluh pos penjumlahan di lapangan",
      kolom: 1,
      item: [
        {
          nama: "Alur permainan",
          singkat: "Pilih pos, jawab, dapat bintang",
          uraian:
            "Siswa memilih satu pos. Igil membacakan misi penjumlahan. Jawaban benar mendapat 1 bintang lompat. Jawaban yang belum tepat mendapat petunjuk, tanpa kehilangan tali. Setelah 10 pos selesai, lapangan lompat siap.",
          contoh: "4 + 2 = 6. Bacaan tujuh. Tulis 3 + 4 = 7. Bandingkan 2 + 4 dengan 4 + 4.",
        },
        {
          nama: "Tali ajaib",
          singkat: "3, 2, atau 1 tali",
          uraian:
            "Jawaban pertama benar mendapat 3 tali ajaib. Benar setelah satu petunjuk mendapat 2 tali. Benar setelah dua petunjuk mendapat 1 tali. Belum tepat tidak mengurangi tali. Siswa boleh mencoba lagi.",
          contoh: "Petunjuk: benda bergoyang, lalu muncul titik, lalu Igil menghitung bersama.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK1_BAB2),
      voice: [
        [
          "Igil menjaga lapangan lompat. Ada sepuluh pos dari tali sampai medali.",
          "Pos hijau untuk menghitung. Pos biru untuk membaca. Pos kuning untuk menulis. Pos ungu untuk membandingkan.",
          "Empat ditambah dua sama dengan enam. Tiga ditambah empat sama dengan tujuh. Lima ditambah tiga sama dengan delapan.",
          "Jawaban benar mendapat satu bintang lompat. Jika belum tepat, Igil memberi petunjuk. Tali tidak berkurang.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar:
        "Menjumlahkan berarti menggabungkan. Tulis operasinya, lalu hitung hasilnya. Ini tantangan para juara.",
      labelDaftar: "Evaluasi penjumlahan sampai 10",
      kolom: 1,
      item: [
        {
          nama: "Kalimat kunci",
          singkat: "Gabungkan, lalu tulis operasinya",
          uraian:
            "Menjumlahkan berarti menggabungkan dua kelompok. Tanda + berarti digabung. Tanda = berarti hasilnya. Pasangan boleh dibalik. Menghitung maju berarti melompat ke depan. Penjumlahan berulang menggabungkan dua bilangan yang sama. Beberapa pasangan hasilnya 10.",
          contoh: "4 + 2 = 6",
        },
      ],
      kuis: [
        { pertanyaan: "4 kelereng merah dan 5 kelereng biru. Semuanya berapa?", alias: ["9", "sembilan", "b"] },
        { pertanyaan: "6 kupu-kupu kuning dan 3 kupu-kupu ungu. Semuanya berapa?", alias: ["9", "sembilan", "c"] },
        { pertanyaan: "3 pita biru ditambah 4 pita merah. Hasilnya berapa?", alias: ["7", "tujuh", "3 + 4 = 7"] },
        { pertanyaan: "7 ditambah 3 hasilnya berapa?", alias: ["10", "sepuluh"] },
        { pertanyaan: "6 siswa ditambah 4 siswa. Semuanya berapa?", alias: ["10", "sepuluh"] },
        { pertanyaan: "3 motor dan 2 mobil. Berapa kendaraannya?", alias: ["5", "lima", "b"] },
        { pertanyaan: "6 roda motor ditambah 8 roda mobil. Semuanya berapa?", alias: ["14", "empat belas", "b"] },
        { pertanyaan: "Mana penjumlahan berulang yang benar?", alias: ["3 + 3 = 6", "b"] },
        { pertanyaan: "8 ditambah berapa sama dengan 10?", alias: ["2", "dua"] },
        { pertanyaan: "4 burung ditambah 2 burung. Semuanya berapa?", alias: ["6", "enam"] },
      ],
      voice: [
        [
          "Menjumlahkan berarti menggabungkan dua kelompok menjadi satu.",
          "Tanda tambah berarti digabung. Tanda sama dengan berarti hasilnya.",
          "Empat ditambah dua sama dengan enam. Tiga ditambah dua sama dengan lima. Lima ditambah tiga sama dengan delapan.",
          "Penjumlahan berulang: tiga tambah tiga sama dengan enam. Teman sepuluh: delapan butuh dua, sembilan butuh satu.",
        ],
        [
          "Empat kelereng merah ditambah lima kelereng biru sama dengan sembilan. Enam kupu-kupu kuning ditambah tiga kupu-kupu ungu sama dengan sembilan.",
          "Tiga pita ditambah empat pita sama dengan tujuh. Tujuh ditambah tiga sama dengan sepuluh. Enam siswa ditambah empat siswa sama dengan sepuluh.",
          "Tiga motor dan dua mobil ada lima kendaraan. Enam roda ditambah delapan roda sama dengan empat belas. Empat burung ditambah dua burung sama dengan enam.",
        ],
      ],
    },
  ],
};
