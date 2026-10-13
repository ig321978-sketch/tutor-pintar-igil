import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { MISI_MTK1_BAB5, kuisDariMisi } from "@/lib/misi-kebun-mtk-1";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK1_BAB5 = "Bab 5: Ayo Membilang sampai dengan 20";

export const MODUL_MTK1_BAB5: ModulResmiPai = {
  id: "mtk-1-bab5",
  judul: JUDUL_MTK1_BAB5,
  pola: /membilang\s+sampai(\s+dengan)?\s+20\b|bendera kecil untuk lomba|pasar malam kemerdekaan|misi lomba bendera/,
  motivasi:
    "Tari, Dimas, dan Ojan menyiapkan dua puluh bendera kecil bersama Pipit. Sepuluh bendera diikat jadi satu puluhan.",
  kunciJawaban: "A,A,A,A,B,A,B,C,C,A",
  sketsaKartu: [
    "Tari, Dimas, dan Ojan mengikat bendera per sepuluh bersama Pipit untuk lomba 17 Agustus.",
    "Angka 11 sampai 20, rumah nilai tempat, bingkai sepuluh, dan garis bilangan.",
    "Pipit menemani sepuluh tiang lomba bendera: puluhan, satuan, dan membandingkan sampai 20.",
    "Poin penting dan lembar evaluasi membilang sampai 20.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: LOTS]
Ada 1 ikat bendera dan 5 bendera lepas. Semuanya ada...
A) 15
B) 5
C) 51
D) 10`,
    `[Soal 2 - PG - Tipe: LOTS]
Angka 11 dibaca...
A) Sebelas
B) Satu belas
C) Sepuluh
D) Dua puluh`,
    `[Soal 3 - PG - Tipe: LOTS]
Angka 1 di depan pada bilangan 13 artinya...
A) 1 puluhan
B) 1 satuan
C) 13 satuan
D) 3 puluhan`,
    `[Soal 4 - PG - Tipe: LOTS]
Dua ikat penuh sama dengan...
A) 20
B) 2
C) 12
D) 10`,
    `[Soal 5 - PG - Tipe: HOTS]
Angka 18 terdiri dari...
A) 8 puluhan dan 1 satuan
B) 1 puluhan dan 8 satuan
C) 18 puluhan
D) 0 puluhan dan 18 satuan`,
    `[Soal 6 - PG - Tipe: HOTS]
Empat belas ditulis...
A) 14
B) 41
C) 4
D) 40`,
    `[Soal 7 - PG - Tipe: HOTS]
Mana yang lebih besar, 12 atau 19?
A) 12
B) 19
C) Sama besar
D) 21`,
    `[Soal 8 - PG - Tipe: HOTS]
Satu bingkai penuh dan 3 titik. Jumlahnya...
A) 3
B) 10
C) 13
D) 30`,
    `[Soal 9 - PG - Tipe: HOTS]
Mana yang paling banyak?
A) 1 ikat dan 6 lepas
B) Angka 13
C) 10 + 8
D) 1 ikat dan 2 lepas`,
    `[Soal 10 - PG - Tipe: HOTS]
Pengunjung punya 16 tiket. Boneka 15 tiket, mobil-mobilan 19 tiket. Hadiah yang bisa diambil adalah...
A) Boneka
B) Mobil-mobilan
C) Keduanya
D) Tidak ada`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Bendera Kecil untuk Lomba 17 Agustus",
      pengantar:
        "Besok 17 Agustus. Pak RT meminta Tari, Dimas, dan Ojan memasang dua puluh bendera kecil. Pipit menunjukkan ikatan ajaib: setiap sepuluh bendera diikat jadi satu puluhan.",
      labelDaftar: "Ikatan ajaib sepuluh bendera",
      kolom: 1,
      item: [
        {
          nama: "Ikat sepuluh",
          singkat: "1 ikat = 10 = 1 puluhan",
          uraian:
            "Bendera yang berantakan mudah salah hitung. Sepuluh bendera diikat jadi satu. Satu ikat sama dengan sepuluh, dan itu satu puluhan. Bendera yang belum diikat adalah satuan.",
          contoh: "1 ikat dan 3 lepas = 13.",
        },
        {
          nama: "Angka belasan",
          singkat: "Sebelas sampai dua puluh",
          uraian:
            "Belas artinya sepuluh lebih sedikit. Tiga belas sama dengan sepuluh dan tiga. Sebelas adalah nama istimewa, bukan satu belas. Dua ikat penuh dan tidak ada yang lepas sama dengan 20, dua puluh.",
          contoh: "1 ikat dan 5 lepas = 15. 1 ikat dan 8 lepas = 18.",
        },
      ],
      kuis: [
        {
          pertanyaan: "Ada satu ikat dan lima bendera lepas. Semuanya berapa?",
          alias: ["lima belas", "15"],
        },
        {
          pertanyaan: "Pak RT butuh berapa bendera?",
          alias: ["20", "dua puluh"],
        },
        {
          pertanyaan: "Tuliskan angka 20.",
          alias: ["20", "dua puluh"],
        },
        {
          pertanyaan: "Bendera diikat setiap berapa?",
          alias: ["10", "sepuluh"],
        },
        {
          pertanyaan: "Tuliskan angka sepuluh.",
          alias: ["10", "sepuluh"],
        },
        {
          pertanyaan: "Satu ikat isinya berapa bendera?",
          alias: ["10", "sepuluh"],
        },
        {
          pertanyaan: "Tuliskan 1 ikat = 10.",
          alias: ["1 ikat = 10", "1ikat=10"],
        },
        {
          pertanyaan: "Satu ikat dan tiga bendera lepas. Semuanya berapa?",
          alias: ["13", "tiga belas"],
        },
        {
          pertanyaan: "Tuliskan angka 13.",
          alias: ["13", "tiga belas"],
        },
        {
          pertanyaan: "Tiga belas sama dengan sepuluh dan berapa?",
          alias: ["3", "tiga"],
        },
        {
          pertanyaan: "Tuliskan nama angka 11.",
          alias: ["sebelas"],
        },
        {
          pertanyaan: "Dua ikat bendera sama dengan berapa?",
          alias: ["20", "dua puluh"],
        },
        {
          pertanyaan: "Tuliskan 2 ikat = 20.",
          alias: ["2 ikat = 20", "2ikat=20"],
        },
      ],
      voice: [
        [
          "Besok hari tujuh belas Agustus. Kampung memasang bendera kecil.",
          "Sepuluh bendera diikat jadi satu. Satu ikat sama dengan sepuluh. Itu satu puluhan.",
          "Satu ikat dan tiga bendera lepas adalah tiga belas. Angka satu di depan artinya puluhan.",
          "Belas artinya sepuluh lebih sedikit. Sebelas adalah nama istimewa.",
          "Dua ikat penuh, lepasnya nol, sama dengan dua puluh. Merdeka!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Rahasia Angka 11–20",
      pengantar:
        "Angka belasan punya rumah puluhan di kiri dan rumah satuan di kanan. Simpan sepuluh di kepala, lalu lanjut hitung benda yang lepas.",
      labelDaftar: "Nilai tempat, bingkai sepuluh, dan garis bilangan",
      kolom: 1,
      item: [
        {
          nama: "Rumah nilai tempat",
          singkat: "Kiri puluhan, kanan satuan",
          uraian:
            "Angka 16 punya 1 di rumah puluhan dan 6 di rumah satuan. Itu satu ikat dan enam benda lepas, atau 10 ditambah 6. Empat belas ditulis 14, bukan 41. Tulis puluhan lebih dulu.",
          contoh: "16 = 10 + 6.",
        },
        {
          nama: "Membilang lanjut",
          singkat: "Jangan hitung ulang dari satu",
          uraian:
            "Bingkai penuh bernilai 10. Tiga titik di bingkai kedua membuat 13. Satu ikat dan tujuh permen dihitung sebelas sampai tujuh belas. Sepuluh jari teman dan empat jari sendiri sama dengan 14. Pada garis bilangan, 19 lebih besar dari 12 karena satuannya lebih besar.",
          contoh: "19 lebih besar dari 12.",
        },
      ],
      kuis: [
        {
          pertanyaan: "Pasangkan satu ikat dua lepas dengan 12, satu ikat sembilan lepas dengan 19, dan dua ikat dengan 20.",
          alias: ["12", "19", "20"],
        },
        {
          pertanyaan: "Urutkan 17, 11, 20, 14, dan 16 dari yang paling kecil.",
          alias: ["11", "14", "16", "17", "20"],
        },
        {
          pertanyaan: "Kartu mana yang berbeda dari 15?",
          alias: ["14", "empat belas"],
        },
        {
          pertanyaan: "Angka 18 punya berapa puluhan dan berapa satuan?",
          alias: ["satu puluhan", "delapan satuan"],
        },
      ],
      voice: [
        [
          "Sebelas, dua belas, tiga belas, empat belas, lima belas.",
          "Enam belas, tujuh belas, delapan belas, sembilan belas, dua puluh.",
          "Rumah kiri untuk ikatan. Rumah kanan untuk benda yang lepas.",
          "Tulis angka satu lebih dulu, baru satuannya. Empat belas adalah satu empat, bukan empat satu.",
          "Kalau puluhannya sama, bandingkan satuannya. Sembilan belas lebih besar dari dua belas.",
        ],
      ],
    },
        {
      kode: "C",
      judul: "C. Misi Lomba Bendera",
      pengantar:
        "Bantu Pipit memasang bendera di 10 tiang lomba. Hijau untuk menghitung, biru untuk membaca, kuning untuk menulis, dan ungu untuk membandingkan.",
      labelDaftar: "Sepuluh tiang belasan di lomba",
      kolom: 1,
      item: [
        {
          nama: "Alur permainan",
          singkat: "Pilih tiang, jawab, dapat bintang",
          uraian:
            "Siswa memilih satu tiang lomba. Pipit menanyakan gulungan sepuluh, satuan, dan perbandingan belasan. Jawaban benar mendapat 1 bintang bendera. Jawaban yang belum tepat mendapat petunjuk, tanpa kehilangan pita.",
          contoh: "10 + 4 = 14. 19 lebih besar dari 12. 16 cukup untuk boneka seharga 15, belum cukup untuk mobil seharga 19.",
        },
        {
          nama: "Pita ajaib",
          singkat: "3, 2, atau 1 pita",
          uraian:
            "Jawaban pertama benar mendapat 3 pita ajaib. Benar setelah satu petunjuk mendapat 2 pita. Benar setelah dua petunjuk mendapat 1 pita. Belum tepat tidak mengurangi pita. Siswa boleh mencoba lagi.",
          contoh: "Empat belas ditulis 14, bukan 41.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK1_BAB5),
      voice: [
        [
          "Pipit memasang bendera lomba. Ada sepuluh tiang dari gang sampai pagar.",
          "Satu gulungan sepuluh ditambah empat tiket lepas sama dengan empat belas.",
          "Sembilan belas lebih besar daripada dua belas karena satuannya lebih besar.",
          "Enam belas cukup untuk boneka seharga lima belas, belum cukup untuk mobil seharga sembilan belas.",
          "Jawaban benar mendapat satu bintang bendera. Jika belum tepat, Pipit memberi petunjuk. Pita tidak berkurang.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar:
        "Sepuluh diikat jadi satu. Kiri puluhan, kanan satuan. Belas artinya sepuluh lebih sedikit. Dua ikat penuh sama dengan dua puluh.",
      labelDaftar: "Evaluasi membilang sampai 20",
      kolom: 1,
      item: [
        {
          nama: "Yang perlu diingat",
          singkat: "Ikat, tulis, lalu bandingkan",
          uraian:
            "Simpan sepuluh di kepala, jangan hitung ulang dari satu. Tulis puluhan dulu supaya 14 tidak menjadi 41. Kalau puluhannya sama, lihat satuannya. Sembilan belas lebih besar dari dua belas.",
          contoh: "Sepuluh diikat jadi satu.",
        },
      ],
      kuis: [
        { pertanyaan: "Berapa banyak kelereng pada bingkai penuh dan tujuh kelereng?", alias: ["17", "tujuh belas"] },
        { pertanyaan: "Angka 19 punya puluhan dan satuan berapa?", alias: ["1", "9", "sembilan belas"] },
        { pertanyaan: "Dimas menulis lima belas sebagai 51. Apakah itu benar?", alias: ["salah", "15"] },
        { pertanyaan: "Angka yang hilang pada 12, 13, kosong, 15, kosong, kosong, 18.", alias: ["14", "16", "17"] },
        { pertanyaan: "Puluhan 1, satuan lebih besar dari 6 dan lebih kecil dari 8. Angka berapa?", alias: ["tujuh belas", "17"] },
        { pertanyaan: "Gambar angka 14 sebagai satu ikat dan empat bulatan.", alias: ["14", "empat belas"] },
        { pertanyaan: "Mana yang paling banyak: 16, 13, atau 10 tambah 8?", alias: ["18", "10 tambah 8"] },
        { pertanyaan: "Pasangkan 10 tambah 2, dua ikat, dan 15 dengan nama yang sama nilainya.", alias: ["dua belas", "dua puluh", "15"] },
        { pertanyaan: "Tari membawa 17 bendera untuk 20 tiang. Cukup atau tidak?", alias: ["17", "tidak cukup"] },
        { pertanyaan: "Kartu 1 dan 8 disusun menjadi belasan. Kalau ditukar, apakah masih belasan?", alias: ["18", "bukan"] },
      ],
      voice: [
        [
          "Sepuluh diikat jadi satu. Satu ikat sama dengan sepuluh, sama dengan satu puluhan.",
          "Kiri puluhan, kanan satuan.",
          "Belas artinya sepuluh lebih sedikit. Tiga belas sama dengan sepuluh ditambah tiga.",
          "Simpan sepuluh, lalu lanjut hitung. Jangan hitung ulang dari satu.",
          "Tulis puluhan dulu. Empat belas ditulis satu empat, bukan empat satu.",
          "Dua ikat penuh sama dengan dua puluh.",
          "Kalau puluhannya sama, lihat satuannya. Sembilan belas lebih besar dari dua belas.",
        ],
      ],
    },
  ],
};
