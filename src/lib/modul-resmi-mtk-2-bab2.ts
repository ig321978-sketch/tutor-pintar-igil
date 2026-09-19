import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK2_BAB2 = "Bab 2: Penjumlahan dan Pengurangan Bersusun";

export const MODUL_MTK2_BAB2: ModulResmiPai = {
  id: "mtk-2-bab2",
  judul: JUDUL_MTK2_BAB2,
  pola:
    /penjumlahan dan pengurangan bersusun|jalan bersusun matematika|cara berhitung|operasi hitung/,
  motivasi:
    "Sejajarkan satuan di bawah satuan. Hitung dari kanan. Jika jumlah ≥ 10, simpan 1. Jika atas lebih kecil, pinjam 1 dari kiri.",
  kunciJawaban: "B,B,B,B,B,A,C,B,A,B",
  sketsaKartu: [
    "Anak menuliskan 27 + 5 bersusun dan menyimpan 1.",
    "Anak meminjam puluhan pada 42 - 15.",
    "Anak mengerjakan evaluasi simpan dan pinjam.",
    "Anak menarik garis 34+25, menggeser 25+18, mengurutkan cerita apel, dan menulis 90.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
27 + 5 bersusun: satuan kanan dan yang disimpan ke kiri adalah...
A) 2 dan simpan 1
B) 2 dan simpan 1 puluhan
C) 12 tanpa simpan
D) 32 tanpa hitung kanan`,
    `[Soal 2 - PG - Tipe: HOTS]
42 - 15 = ...
A) 37
B) 27
C) 57
D) 33`,
    `[Soal 3 - PG - Tipe: HOTS]
Saat 30 - 7 kita harus meminjam 1 puluhan dari angka 3. Pernyataan ini...
A) Salah.
B) Benar; 0 lebih kecil dari 7, jadi 10 - 7 = 3.
C) Benar hanya untuk penjumlahan.
D) 3 langsung dikurangi 7.`,
    `[Soal 4 - PG - Tipe: HOTS]
88 - 45 = 43. Pernyataan ini...
A) Salah.
B) Benar; 8-5=3 dan 8-4=4.
C) Hasilnya 133.
D) Wajib meminjam.`,
    `[Soal 5 - PG - Tipe: Reguler]
34 + 25 tanpa menyimpan hasilnya...
A) 49
B) 59
C) 69
D) 39`,
    `[Soal 6 - PG - Tipe: Reguler]
48 + 15 dengan menyimpan 1 hasilnya...
A) 63
B) 53
C) 33
D) 73`,
    `[Soal 7 - PG - Tipe: Reguler]
52 - 14 dengan meminjam 1 hasilnya...
A) 48
B) 42
C) 38
D) 66`,
    `[Soal 8 - PG - Tipe: Reguler]
67 + 23 = ...
A) 80
B) 90
C) 89
D) 70`,
    `[Soal 9 - PG - Tipe: HOTS]
Mengapa kita selalu mulai dari satuan di kanan?
A) Karena jika perlu simpan atau pinjam, hasilnya menumpang ke puluhan di kiri.
B) Supaya kiri selesai dulu.
C) Karena puluhan tidak dihitung.
D) Karena titik harus di kanan.`,
    `[Soal 10 - PG - Tipe: Reguler]
25 + 18 harus...
A) Tanpa menyimpan
B) Menyimpan, karena 5+8=13
C) Meminjam
D) Tidak boleh bersusun`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Trik Bersusun Simpan dan Pinjam",
      pengantar:
        "Infografis jalan bersusun: sejajarkan satuan dan puluhan, hitung dari kanan, simpan jika jumlah ≥ 10, pinjam jika atas lebih kecil.",
      labelDaftar: "Sejajar, kanan dulu, simpan, pinjam",
      kolom: 1,
      item: [
        {
          nama: "Sejajarkan",
          singkat: "Satuan di bawah satuan",
          uraian:
            "Tulis angka lurus ke bawah. Satuan lurus satuan, puluhan lurus puluhan. Jangan geser ke kiri atau kanan.",
          contoh: "27 di atas, 5 di bawah satuan.",
        },
        {
          nama: "Hitung dari kanan",
          singkat: "Kamar satuan dulu",
          uraian:
            "Selalu mulai dari kanan. 27 + 5: 7 + 5 = 12. Tulis 2 di satuan, simpan 1 puluhan ke atas kiri. Puluhan: 2 + 0 + 1 = 3. Hasil 32.",
          contoh: "27 + 5: satuan 2, simpan 1.",
        },
        {
          nama: "Pinjam jika kurang",
          singkat: "Ambil 1 dari kiri",
          uraian:
            "Jika angka atas lebih kecil, pinjam 1 puluhan. 42 - 15: 2 tidak cukup dikurangi 5, pinjam jadi 12 - 5 = 7. Puluhan 3 - 1 = 2. Hasil 27.",
          contoh: "42 - 15 = 27.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Jika kamu menghitung bersusun 27 + 5, berapakah hasil satuan di kanan dan berapa puluhan yang kamu simpan ke atas kiri?",
          alias: ["2", "1", "simpan"],
        },
      ],
      kuisTulis: {
        pertanyaan: "Hitunglah hasil pengurangan bersusun 42 - 15 =",
        alias: ["27"],
      },
      voice: [
        [
          "Anak-anak yang hebat, menumpuk mainan ke bawah itu seru. Begitu juga menjumlahkan atau mengurangkan angka besar dengan bersusun pendek.",
          "Aturan emas: sejajarkan. Satuan di bawah satuan, puluhan di bawah puluhan. Kerjakan dari kanan. Jika 8 + 5 = 13, tulis 3, simpan 1 ke kiri.",
          "Kalau atas lebih kecil dari bawah, pinjam 1 puluhan dari tetangga kiri agar angka atas menjadi besar dan bisa dikurangi!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Tanpa Menyimpan dan Dengan Menyimpan",
      pengantar:
        "Infografis dua jenis: tanpa simpan/pinjam jika tiap kamar cukup, dan dengan simpan/pinjam jika satuan lebih dari 9 atau atas lebih kecil.",
      labelDaftar: "Tanpa simpan, dengan simpan, soal cerita",
      kolom: 1,
      item: [
        {
          nama: "Tanpa menyimpan",
          singkat: "Tiap kamar cukup",
          uraian:
            "34 + 25: 4+5=9, 3+2=5, hasil 59. 43 - 12: 3-2=1, 4-1=3, hasil 31. 32 + 54 dan 88 - 45 juga tanpa pinjam.",
          contoh: "34 + 25 = 59.",
        },
        {
          nama: "Harus simpan atau pinjam",
          singkat: "Satuan penuh atau kurang",
          uraian:
            "48 + 15: 8+5=13, simpan 1, hasil 63. 25 + 18 sama. 52 - 14 dan 61 - 15 harus meminjam. 30 - 7: 0 pinjam jadi 10.",
          contoh: "48 + 15 = 63. 52 - 14 = 38.",
        },
        {
          nama: "Soal cerita apel",
          singkat: "Awal, tambah, tanya",
          uraian:
            "Ali sudah punya 24 apel. Ia membeli lagi 15. Berapa seluruhnya? 24 + 15 = 39. Cerita selalu: yang sudah ada, yang ditambah, lalu pertanyaan.",
          contoh: "24 + 15 = 39 apel.",
        },
      ],
      kuis: [
        {
          pertanyaan: "34 + 25 perlu menyimpan atau tidak? Berapa hasilnya?",
          alias: ["tidak", "tanpa", "59"],
        },
      ],
      kuisTulis: {
        pertanyaan: "Hasil 67 + 23 adalah...",
        alias: ["90"],
      },
      voice: [
        [
          "Tidak semua soal harus menyimpan. Jika satuan belum sampai 10 dan atas cukup dikurangi, kerjakan lurus.",
          "Kalau satuan 8 + 5, wajib simpan. Kalau 0 - 7, wajib pinjam.",
          "Soal cerita: mulai dari yang sudah dimiliki, lalu yang bertambah, baru ditanya jumlahnya.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih satuan 27+5 dan hasil 42-15, tentukan benar-salah 30-7 serta 88-45, jodohkan 34+25, 48+15, 52-14, lalu jelaskan mengapa mulai dari kanan.",
      labelDaftar: "Pilihan, benar-salah, mencocokkan, dan esai",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A dan B",
          singkat: "Simpan dan pinjam",
          uraian:
            "27+5: satuan 2, simpan 1. 42-15=27. 30-7 harus pinjam. 88-45=43 tanpa pinjam.",
          contoh: "32. 27. Pinjam. 43.",
        },
        {
          nama: "Kelompok C dan D",
          singkat: "Hasil dan cerita",
          uraian:
            "34+25=59. 48+15=63. 52-14=38. 67+23=90. Mulai dari kanan supaya simpan/pinjam tertata.",
          contoh: "59. 63. 38. 90.",
        },
      ],
      kuis: [
        { pertanyaan: "27+5 satuan dan simpan?", alias: ["2", "1"] },
        { pertanyaan: "42-15?", alias: ["27"] },
        { pertanyaan: "30-7 pinjam?", alias: ["benar"] },
        { pertanyaan: "88-45=43?", alias: ["benar"] },
        { pertanyaan: "34+25?", alias: ["59"] },
        { pertanyaan: "Mengapa dari kanan?", alias: ["simpan", "pinjam", "puluhan"] },
      ],
      voice: [
        ["27 + 5: tulis 2, simpan 1. 42 - 15 = 27."],
        ["Sejajarkan dulu. Hitung satuan, baru puluhan."],
      ],
    },
    {
      kode: "D",
      judul: "D. Kartu Evaluasi Ekstra",
      pengantar:
        "Tanpa keyboard. Tarik garis hasil bersusun, geser soal ke keranjang simpan/pinjam, urutkan cerita apel Ali, coretkan angka 9 pada 90, lalu tekan BENAR atau SALAH.",
      labelDaftar: "Tarik garis, keranjang, urutan, kanvas, detektif",
      kolom: 1,
      item: [
        {
          nama: "Permainan A sampai C",
          singkat: "Garis, keranjang, urutan",
          uraian:
            "34+25=59 tanpa simpan. 48+15=63 simpan 1. 52-14=38 pinjam 1. Harus simpan/pinjam: 25+18, 61-15. Tanpa: 43-12, 32+54. Cerita: 24 apel, beli 15, berapa seluruhnya?",
          contoh: "59. 63. 38.",
        },
        {
          nama: "Permainan D dan E",
          singkat: "Kanvas dan detektif",
          uraian:
            "67+23=90, coretkan 9. 30-7 harus pinjam. 88-45=43.",
          contoh: "Coretkan 9. BENAR lalu BENAR.",
        },
      ],
      kuis: [
        { pertanyaan: "Tarik garis hasil?", alias: ["59", "63", "38"] },
        { pertanyaan: "Keranjang simpan pinjam?", alias: ["25", "43"] },
        { pertanyaan: "Urutan cerita apel?", alias: ["24", "15", "berapa"] },
        { pertanyaan: "30-7 pinjam?", alias: ["benar"] },
        { pertanyaan: "88-45=43?", alias: ["benar"] },
      ],
      kuisTulis: {
        pertanyaan: "Coretkan angka depan __ - 0 dari hasil 67 + 23.",
        alias: ["90", "9"],
      },
      voice: [
        [
          "Tanpa keyboard. Tarik garis 34+25 ke 59, 48+15 ke 63, 52-14 ke 38. Geser 25+18 ke keranjang harus menyimpan.",
          "Urutkan: Ali punya 24 apel, membeli 15, lalu ditanya jumlahnya. Coretkan 9 untuk hasil 90.",
          "Detektif: 30-7 harus pinjam. 88-45 memang 43.",
        ],
      ],
    },
  ],
};
