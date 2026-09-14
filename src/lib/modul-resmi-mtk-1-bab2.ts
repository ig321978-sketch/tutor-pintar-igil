import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK1_BAB2 = "Bab 2: Penjumlahan sampai 10";
export const JUDUL_MTK1_BAB2_LAMA = "Bab 2: Penjumlahan sampai dengan 10";

export const MODUL_MTK1_BAB2: ModulResmiPai = {
  id: "mtk-1-bab2",
  judul: JUDUL_MTK1_BAB2,
  pola: /penjumlahan\s+sampai(\s+dengan)?\s+10/,
  motivasi:
    "Hore! Menjumlahkan itu menggabungkan. Satukan dua kelompok benda, lalu hitung semuanya sampai 10.",
  kunciJawaban: "C,A,D,B,A,C,B,A,D,C",
  sketsaKartu: [
    "Ali dan Nia menggabungkan robot di ruang tengah rumah.",
    "Tiga mobil merah digabung dengan dua mobil biru menjadi lima mobil.",
    "Anak menuangkan stik dari dua kantong ke satu wadah besar.",
    "Anak mengisi lembar evaluasi: menjumlahkan benda, memilih jawaban, dan mencocokkan hasil.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: Reguler]
Di kotak merah ada 3 robot. Di kotak biru ada 2 robot. Setelah digabung, jumlah robot adalah...
A) 4
B) 3
C) 5
D) 2`,
    `[Soal 2 - PG - Tipe: Reguler]
Tanda ➕ dalam matematika disebut...
A) Plus atau ditambah
B) Kurang
C) Kali
D) Bagi`,
    `[Soal 3 - PG - Tipe: Reguler]
Tanda ＝ dalam matematika disebut...
A) Plus
B) Ditambah
C) Kurang
D) Sama dengan`,
    `[Soal 4 - PG - Tipe: Reguler]
Kantong A berisi 4 stik. Kantong B berisi 3 stik. Setelah dituang ke Kantong C, jumlahnya...
A) 6
B) 7
C) 8
D) 5`,
    `[Soal 5 - PG - Tipe: Reguler]
Dua biskuit ditambah tiga biskuit sama dengan...
A) 5
B) 4
C) 6
D) 3`,
    `[Soal 6 - PG - Tipe: Reguler]
Hasil dari 5 ➕ 2 adalah...
A) 6
B) 8
C) 7
D) 9`,
    `[Soal 7 - PG - Tipe: Reguler]
Ali punya 4 pensil warna. Nia memberi 3 pensil lagi. Jumlah pensil Ali sekarang...
A) 6
B) 7
C) 8
D) 5`,
    `[Soal 8 - PG - Tipe: Reguler]
Ibu membeli 6 jeruk. Ayah membawa 0 jeruk. Total jeruk di rumah adalah...
A) 6
B) 0
C) 5
D) 7`,
    `[Soal 9 - PG - Tipe: HOTS]
Operasi 3 ➕ 3 ＝ .... Hasil yang benar adalah...
A) 5
B) 7
C) 9
D) 6`,
    `[Soal 10 - PG - Tipe: HOTS]
Ada 7 kupu-kupu, lalu datang 1 kupu-kupu lagi. Jumlahnya sekarang...
A) 6
B) 7
C) 8
D) 9`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog di Ruang Tengah",
      pengantar:
        "Di ruang tengah rumah Ali, Ali dan Nia belajar bersama di atas karpet. Mereka mengelompokkan robot, lalu menggabungkannya menjadi satu kotak besar.",
      labelDaftar: "Percakapan Ali dan Nia",
      kolom: 1,
      item: [
        {
          nama: "Kotak merah dan kotak biru",
          singkat: "3 robot dan 2 robot",
          uraian:
            "Di kotak merah ada 3 robot. Di kotak biru ada 2 robot. Kalau semua robot digabung ke kotak besar, jumlahnya bertambah.",
          contoh: "3 robot ditambah 2 robot.",
        },
        {
          nama: "Menggabungkan artinya menjumlahkan",
          singkat: "3 ➕ 2 ＝ 5",
          uraian:
            "Setelah digabung, mereka menghitung: satu, dua, tiga, empat, lima. Totalnya 5 robot. Menjumlahkan itu menggabungkan benda.",
          contoh: "3 ➕ 2 ＝ 5",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Ada berapa robot di kotak merah?",
          alias: ["tiga", "3", "tiga robot", "ada tiga"],
        },
        {
          pertanyaan: "2. Setelah digabung, total robot jadi berapa?",
          alias: ["lima", "5", "lima robot", "ada lima"],
        },
        {
          pertanyaan: "3. Menjumlahkan itu artinya apa?",
          alias: [
            "menggabungkan",
            "gabung",
            "menggabungkan benda",
            "menggabung",
            "menyatukan",
          ],
        },
      ],
      voice: [
        [
          "Anak-anak, kita ke ruang tengah rumah Ali. Ali dan Nia belajar bersama di atas karpet.",
          "Ali berkata, Nia, aku sedang mengelompokkan mainan robotku. Di kotak merah ada tiga robot, dan di kotak biru ada dua robot.",
          "Nia menjawab, wah, kalau semua robot itu digabungkan dan dimasukkan ke dalam satu kotak besar, jumlahnya jadi bertambah banyak ya, Ali?",
        ],
        [
          "Ali berkata, iya, betul! Mari kita hitung bersama setelah digabung. Satu, dua, tiga, empat, lima! Sekarang totalnya ada lima robot!",
          "Nia berkata, hebat! Jadi, tiga robot ditambah dua robot sama dengan lima robot. Menjumlahkan itu ternyata cuma menggabungkan benda ya!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis Kotak Gabung",
      pengantar:
        "Dua kelompok benda digabung menjadi satu kelompok besar. Tanda plus artinya ditambah. Tanda sama dengan menunjukkan hasilnya.",
      labelDaftar: "Kenalan dengan Simbol Matematika",
      kolom: 1,
      item: [
        {
          nama: "Kotak gabung mobil",
          singkat: "3 ➕ 2 ＝ 5",
          uraian:
            "Tiga mobil digabung dengan dua mobil menjadi satu kelompok besar: lima mobil.",
          contoh: "🚗🚗🚗 ➕ 🚗🚗 ＝ 🚗🚗🚗🚗🚗",
        },
        {
          nama: "Simbol plus dan sama dengan",
          singkat: "➕ dan ＝",
          uraian:
            "Tanda plus disebut plus atau ditambah. Tanda sama dengan disebut sama dengan. Bisa ditulis dengan angka: 3 ➕ 2 ＝ 5.",
          contoh: "3 ➕ 2 ＝ 5",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Tiga mobil ditambah dua mobil sama dengan berapa?",
          alias: ["lima", "5", "lima mobil", "angka 5"],
        },
        {
          pertanyaan: "2. Tanda plus disebut apa?",
          alias: ["plus", "ditambah", "plus atau ditambah", "tambah"],
        },
        {
          pertanyaan: "3. Tanda sama dengan disebut apa?",
          alias: ["sama dengan", "sama", "hasil"],
        },
      ],
      voice: [
        [
          "Anak-anak, selamat datang di kotak gabung. Lihat tiga mobil. Lalu lihat dua mobil. Kalau digabung, menjadi satu kelompok besar: lima mobil.",
          "Tiga ditambah dua sama dengan lima. Menjumlahkan artinya menggabungkan dua kelompok menjadi satu.",
        ],
        [
          "Sekarang kenalan dengan simbol matematika. Tanda plus disebut plus atau ditambah. Tanda sama dengan disebut sama dengan.",
          "Kita bisa menulisnya dengan angka: tiga plus dua sama dengan lima.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Penjumlahan di Sekolah dan di Rumah",
      pengantar:
        "Penjumlahan makin kuat kalau dipraktikkan. Di sekolah kita bermain Kantong Ajaib. Di rumah kita menjumlahkan camilan di piring.",
      labelDaftar: "Dua Tempat Berlatih",
      kolom: 2,
      item: [
        {
          nama: "Kantong Ajaib Penjumlahan",
          singkat: "Untuk guru",
          uraian:
            "Dua siswa mengisi Kantong A dan Kantong B, lalu menuang isinya ke Kantong C. Seluruh kelas menghitung hasil gabungannya.",
          contoh: "4 stik ➕ 3 stik ＝ 7 stik.",
        },
        {
          nama: "Camilan Tambah-Tambahan",
          singkat: "Untuk orang tua",
          uraian:
            "Letakkan 2 biskuit di kiri piring dan 3 biskuit di kanan. Anak menghitung, lalu menggabungkannya di tengah sambil mengucapkan kalimat matematika.",
          contoh: "Dua biskuit ditambah tiga biskuit sama dengan lima biskuit!",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Empat stik ditambah tiga stik sama dengan berapa?",
          alias: ["tujuh", "7", "tujuh stik"],
        },
        {
          pertanyaan: "2. Dua biskuit ditambah tiga biskuit sama dengan berapa?",
          alias: ["lima", "5", "lima biskuit"],
        },
        {
          pertanyaan: "3. Nama kegiatan penjumlahan di rumah apa?",
          alias: [
            "camilan tambah-tambahan",
            "camilan",
            "tambah-tambahan",
            "camilan tambahan",
          ],
        },
      ],
      voice: [
        [
          "Di sekolah, kita bermain Kantong Ajaib Penjumlahan. Siswa pertama mengisi Kantong A dengan empat stik. Siswa kedua mengisi Kantong B dengan tiga stik.",
          "Lalu keduanya menuang isi kantong ke Kantong C. Seluruh kelas menghitung bersama: empat ditambah tiga sama dengan tujuh.",
        ],
        [
          "Di rumah, bermain Camilan Tambah-Tambahan. Letakkan dua biskuit di kiri piring dan tiga biskuit di kanan.",
          "Anak menghitung masing-masing, lalu menggabungkannya di tengah. Dua biskuit ditambah tiga biskuit sama dengan lima biskuit. Setelah itu, camilannya boleh dimakan sebagai hadiah.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Saatnya menunjukkan kemampuan penjumlahan sampai 10. Hitung dan jumlahkan benda, pilih jawaban yang benar, lalu cocokkan hasil penjumlahannya.",
      labelDaftar: "Tiga Kelompok Soal",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Hitung dan jumlahkan",
          uraian:
            "Hitung benda di setiap kotak, lalu tulis angka dan hasil penjumlahannya.",
          contoh: "2 ➕ 3 ＝ 5, 4 ➕ 2 ＝ 6, 1 ➕ 4 ＝ 5.",
        },
        {
          nama: "Kelompok B",
          singkat: "Pilihan ganda",
          uraian:
            "Pilih satu jawaban yang paling benar: 5 ➕ 2, pensil warna Ali, dan jeruk ditambah nol.",
          contoh: "5 ➕ 2 ＝ 7. Enam ditambah nol tetap enam.",
        },
        {
          nama: "Kelompok C",
          singkat: "Menghubungkan garis",
          uraian:
            "Cocokkan soal penjumlahan dengan angka hasilnya yang benar.",
          contoh: "3 ➕ 3 ＝ 6, 4 ➕ 5 ＝ 9, 7 ➕ 1 ＝ 8.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Dua apel ditambah tiga apel sama dengan berapa?",
          alias: ["lima", "5", "2 + 3 = 5"],
        },
        {
          pertanyaan: "2. Empat kupu-kupu ditambah dua kupu-kupu sama dengan berapa?",
          alias: ["enam", "6", "4 + 2 = 6"],
        },
        {
          pertanyaan: "3. Satu es krim ditambah empat es krim sama dengan berapa?",
          alias: ["lima", "5", "1 + 4 = 5"],
        },
        {
          pertanyaan: "4. Hasil 5 ditambah 2 adalah?",
          alias: ["tujuh", "7", "b"],
        },
        {
          pertanyaan: "5. Empat pensil ditambah tiga pensil sama dengan berapa?",
          alias: ["tujuh", "7", "b"],
        },
        {
          pertanyaan: "6. Enam jeruk ditambah nol jeruk sama dengan berapa?",
          alias: ["enam", "6", "c"],
        },
        {
          pertanyaan: "7. Tiga ditambah tiga sama dengan berapa?",
          alias: ["enam", "6"],
        },
        {
          pertanyaan: "8. Empat ditambah lima sama dengan berapa?",
          alias: ["sembilan", "9"],
        },
        {
          pertanyaan: "9. Tujuh ditambah satu sama dengan berapa?",
          alias: ["delapan", "8"],
        },
      ],
      voice: [
        [
          "Anak-anak, ini lembar evaluasi Bab 2. Kita menjumlahkan benda, memilih jawaban, lalu mencocokkan hasilnya.",
          "Kelompok A: hitung benda di kiri dan kanan, lalu tulis angka penjumlahannya. Kelompok B: pilih satu jawaban yang paling benar.",
        ],
        [
          "Kelompok C: cocokkan soal penjumlahan dengan angka hasilnya. Ingat, ditambah nol hasilnya tetap. Semangat mengerjakan sampai tuntas!",
        ],
      ],
    },
  ],
};
