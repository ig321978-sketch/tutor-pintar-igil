import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { MISI_MTK1_BAB9, kuisDariMisi } from "@/lib/misi-kebun-mtk-1";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK1_BAB9 = "Bab 9: Bilangan sampai 100";

export const MODUL_MTK1_BAB9: ModulResmiPai = {
  id: "mtk-1-bab9",
  judul: JUDUL_MTK1_BAB9,
  pola: /bilangan\s+sampai\s+100\b|puluhan yang hilang|pasar peci seribu/,
  motivasi:
    "Sari, Bima, dan Danu belajar puluhan dan satuan bersama Kura, dari gudang stik sampai pasar peci.",
  kunciJawaban: "A,B,A,B,A,C,B,A,C,A",
  sketsaKartu: [
    "Sari mengikat stik es krim per sepuluh di gudang sekolah, ditemani Bima, Danu, dan Kura.",
    "Rumah puluhan biru dan rumah satuan kuning untuk membaca, membandingkan, dan mengurutkan sampai 100.",
    "Kura menjaga sepuluh pos di pasar peci: peti isi sepuluh, jeruk lepas, dan koin.",
    "Poin penting dan lembar evaluasi bilangan sampai 100.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: LOTS]
Angka 46 terdiri dari...
A) 4 puluhan dan 6 satuan
B) 6 puluhan dan 4 satuan
C) 46 puluhan
D) 4 satuan dan 6 puluhan`,
    `[Soal 2 - PG - Tipe: LOTS]
Angka 90 dibaca...
A) Sembilan belas
B) Sembilan puluh
C) Sembilan puluh nol
D) Sembilan`,
    `[Soal 3 - PG - Tipe: LOTS]
Bentuk yang benar untuk angka 74 adalah...
A) 7 ikat dan 4 lepas
B) 4 ikat dan 7 lepas
C) 74 ikat
D) 7 ikat dan 40 lepas`,
    `[Soal 4 - PG - Tipe: HOTS]
Simbol yang tepat untuk 63 dan 36 adalah...
A) 63 < 36
B) 63 > 36
C) 63 = 36
D) 36 > 63`,
    `[Soal 5 - PG - Tipe: HOTS]
Yang paling kecil di antara 62, 26, dan 56 adalah...
A) 26
B) 56
C) 62
D) 66`,
    `[Soal 6 - PG - Tipe: HOTS]
Dari angka 28 dan 82, yang lebih besar adalah...
A) 28
B) Sama besar
C) 82
D) 20`,
    `[Soal 7 - PG - Tipe: HOTS]
Deret 35, 40, kotak, 50, 55 naik 5. Kotaknya berisi...
A) 42
B) 45
C) 44
D) 48`,
    `[Soal 8 - PG - Tipe: HOTS]
Nilai angka 5 pada bilangan 54 adalah...
A) 50
B) 5
C) 54
D) 500`,
    `[Soal 9 - PG - Tipe: HOTS]
Urutan dari yang paling kecil untuk 38, 71, 45, dan 56 adalah...
A) 71, 56, 45, 38
B) 38, 56, 45, 71
C) 38, 45, 56, 71
D) 45, 38, 56, 71`,
    `[Soal 10 - PG - Tipe: HOTS]
Kartu angka 4 dan 7. Angka terbesar yang bisa dibuat adalah...
A) 74
B) 47
C) 11
D) 27`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Puluhan yang Hilang",
      pengantar:
        "Di gudang sekolah, Sari, Bima, dan Danu menghitung stik es krim. Kura menunjukkan bahwa angka yang sama bisa bernilai beda, tergantung rumahnya.",
      labelDaftar: "Lima adegan puluhan dan satuan",
      kolom: 1,
      item: [
        {
          nama: "Ikatan sepuluh",
          singkat: "1 ikat = 10 = 1 puluhan",
          uraian:
            "Empat ikat dan enam stik lepas sama dengan 46. Angka 4 di kiri artinya empat puluhan, bukan empat saja. Angka 6 di kanan adalah satuan.",
          contoh: "4 ikat + 6 lepas = 46.",
        },
        {
          nama: "Membaca, membandingkan, mengurutkan",
          singkat: "Puluhan dulu, baru satuan",
          uraian:
            "Angka yang berakhir nol dibaca sepuluh, dua puluh, sampai seratus. Belasan hanya untuk 11 sampai 19. Kalau puluhan beda, puluhan yang menentukan. Kalau puluhan sama, lihat satuannya. 28 dan 82 memakai angka yang sama, tetapi nilainya jauh berbeda.",
          contoh: "52 < 57. Urutan 25, 38, 40.",
        },
      ],
      kuis: [
        { pertanyaan: "Ada 3 ikat dan 5 stik lepas. Berapa semuanya?", alias: ["35", "tiga puluh lima"] },
        { pertanyaan: "Isi rumah nilai tempat untuk angka 68.", alias: ["6", "8"] },
        { pertanyaan: "Bacalah angka 73.", alias: ["tujuh puluh tiga", "73"] },
        { pertanyaan: "Tuliskan angka dari bacaan sembilan puluh satu.", alias: ["91"] },
        { pertanyaan: "Mana yang lebih besar, 84 atau 79?", alias: ["84", "delapan puluh empat"] },
        { pertanyaan: "Tulis simbol yang tepat untuk 63 dan 36.", alias: ["lebih besar"] },
        { pertanyaan: "Sebutkan yang paling kecil di antara 62, 26, dan 56.", alias: ["26", "dua puluh enam"] },
        { pertanyaan: "Urutkan 49, 31, 88, dan 72 dari yang paling kecil.", alias: ["31 49 72 88"] },
        { pertanyaan: "Mana yang lebih besar, 35 atau 53?", alias: ["53", "lima puluh tiga"] },
        { pertanyaan: "Tuliskan nilai angka 4 dan angka 7 pada bilangan 47.", alias: ["40", "7"] },
        { pertanyaan: "Bentuk mana yang benar untuk angka 74?", alias: ["7 ikat", "4 lepas"] },
        { pertanyaan: "Pasangkan 19, 80, dan 66 dengan namanya.", alias: ["sembilan belas", "delapan puluh", "enam puluh enam"] },
        { pertanyaan: "Urutkan 45, 91, 23, 68, dan 100 dari yang paling besar.", alias: ["100", "91", "68", "45", "23"] },
        { pertanyaan: "Periksa tiga pernyataan tentang nilai tempat.", alias: ["benar", "salah"] },
        { pertanyaan: "Kotak mana yang berbeda dari 63?", alias: ["36", "3 ikat"] },
      ],
      voice: [
        [
          "Sari menghitung stik es krim dan mendapat empat puluh enam.",
          "Empat ikat isi sepuluh sama dengan empat puluh. Sisa enam. Jadi empat puluh enam.",
          "Angka empat di depan artinya empat puluhan, bukan empat saja.",
          "Tiga puluh dibaca tiga puluh, tanpa tambahan. Belasan hanya untuk sebelas sampai sembilan belas.",
          "Kalau puluhan sama, bandingkan satuannya. Lima puluh dua lebih kecil dari lima puluh tujuh.",
          "Untuk mengurutkan, mulai dari yang paling kecil. Dua puluh lima, tiga puluh delapan, lalu empat puluh.",
          "Pada dua puluh delapan, angka dua bernilai dua puluh. Pada delapan puluh dua, angka dua hanya bernilai dua.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Membaca, Nilai Tempat, Membandingkan, dan Mengurutkan",
      pengantar:
        "Rumah biru untuk puluhan. Rumah kuning untuk satuan. Puluhan dikali sepuluh. Satuan dikali satu.",
      labelDaftar: "Empat langkah bilangan sampai 100",
      kolom: 1,
      item: [
        {
          nama: "Membaca dan nilai tempat",
          singkat: "Tujuh puluh dua ditulis 72",
          uraian:
            "Dengar kata puluh lebih dulu, tulis di rumah puluhan, lalu tulis satuannya. Angka 90 dibaca sembilan puluh. Angka 5 pada 54 ada di puluhan, jadi nilainya 50. 72 sama dengan 70 ditambah 2.",
          contoh: "91 = 90 + 1.",
        },
        {
          nama: "Membandingkan dan mengurutkan",
          singkat: "Puluhan beda, berhenti di puluhan",
          uraian:
            "46 lebih kecil dari 64 karena puluhan 4 lebih kecil dari puluhan 6. Kalau puluhan sama, bandingkan satuan: 73 lebih kecil dari 78. Urutkan kelompok puluhan dulu, lalu rapikan satuan di dalam kelompok yang sama.",
          contoh: "38, 45, 56, 71.",
        },
      ],
      kuis: [
        { pertanyaan: "Bacalah angka 85.", alias: ["delapan puluh lima"] },
        { pertanyaan: "Tuliskan angka dari bacaan empat puluh tujuh.", alias: ["47"] },
        { pertanyaan: "Berapa nilai angka 3 pada bilangan 38?", alias: ["30", "tiga puluh"] },
        { pertanyaan: "Tuliskan pemecahan 91.", alias: ["90 + 1"] },
        { pertanyaan: "Mana yang lebih besar, 29 atau 92?", alias: ["92", "sembilan puluh dua"] },
        { pertanyaan: "Tulis simbol yang tepat untuk 45 dan 54.", alias: ["lebih kecil"] },
        { pertanyaan: "Sebutkan yang paling kecil di antara 81, 18, dan 44.", alias: ["18", "delapan belas"] },
        { pertanyaan: "Urutkan 27, 72, dan 52 dari yang paling kecil.", alias: ["27 52 72"] },
        { pertanyaan: "Manakah pernyataan yang benar tentang 40 dan 39?", alias: ["40"] },
        { pertanyaan: "Pasangkan 37, 65, dan 83 dengan pemecahannya.", alias: ["30 + 7", "60 + 5", "80 + 3"] },
        { pertanyaan: "Urutkan 88, 19, 52, 76, dan 43 dari yang paling kecil.", alias: ["19", "43", "52", "76", "88"] },
        { pertanyaan: "Periksa tiga pernyataan tentang puluhan.", alias: ["benar", "salah"] },
        { pertanyaan: "Lengkapi deret 35, 40, kotak, 50, 55.", alias: ["45"] },
      ],
      voice: [
        [
          "Puluhan dulu, satuan kemudian. Yang belakang nol tidak usah disebut satuannya.",
          "Satu angka punya dua wajah: wajah aslinya, dan wajah nilainya. Lima di puluhan bernilai lima puluh.",
          "Puluhan beda? Berhenti di situ. Puluhan sama? Lanjut ke satuan.",
          "Urutkan puluhan dulu, lalu rapikan satuan di dalam kelompok yang sama.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Pasar Peci Seribu",
      pengantar:
        "Siswa menjadi penjaga gudang di pasar. Barang disimpan dalam peti isi sepuluh dan barang lepas. Sepuluh pos menguji merakit, membaca, membandingkan, dan mengurutkan.",
      labelDaftar: "Sepuluh pos pasar",
      kolom: 1,
      item: [
        {
          nama: "Peti dan lepas",
          singkat: "Satu peti sama dengan sepuluh",
          uraian:
            "Pesanan 47 dirakit dari 4 peti dan 7 barang lepas. Salah rakit ditolak pembeli, lalu barang kembali ke rak. Lentera periksa membantu melihat isi peti. Jawaban benar pertama mendapat tiga koin.",
          contoh: "56 = 5 peti + 6 jeruk.",
        },
        {
          nama: "Baris pedagang",
          singkat: "Dari yang sedikit ke yang banyak",
          uraian:
            "Dua keranjang dibandingkan dari puluhannya. Lima pedagang disusun dari barang paling sedikit ke paling banyak. Sepuluh koin membuka gudang emas.",
          contoh: "19, 34, 45, 72, 90.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK1_BAB9),
      voice: [
        [
          "Selamat datang di Pasar Peci Seribu. Satu peti berisi sepuluh barang.",
          "Rakit pesanan dari peti dan barang lepas. Bacalah label puluhan dan satuan.",
          "Bandingkan dagangan. Susun pedagang dari yang paling sedikit ke yang paling banyak.",
          "Sepuluh pos selesai, sepuluh koin terkumpul, gudang emas terbuka.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar:
        "Sepuluh soal untuk membaca, menulis, membandingkan, dan mengurutkan bilangan sampai seratus.",
      labelDaftar: "Lembar evaluasi bilangan sampai 100",
      kolom: 1,
      item: [
        {
          nama: "Nilai tempat",
          singkat: "Kiri puluhan, kanan satuan",
          uraian:
            "Angka di rumah puluhan bernilai sepuluh kali. Empat di puluhan sama dengan empat puluh. Tulis puluhan lebih dulu supaya angka tidak terbalik.",
          contoh: "74 = 70 + 4.",
        },
        {
          nama: "Membandingkan dan menyusun",
          singkat: "Puluhan yang menang",
          uraian:
            "Tiga puluh dibaca tiga puluh, bukan tiga belas. Kalau puluhan beda, puluhan yang menentukan urutan. Kartu 4 dan 7 bisa menjadi 74 atau 47. Selisihnya 27.",
          contoh: "24, 46, 67, 73, 90.",
        },
      ],
      kuis: [
        { pertanyaan: "Isi nilai tempat angka 74, lalu pecahkan nilainya.", alias: ["70 + 4", "7", "4"] },
        { pertanyaan: "Manakah cara baca yang benar untuk 30 dan 13?", alias: ["tiga puluh"] },
        { pertanyaan: "Bacalah angka 69.", alias: ["enam puluh sembilan"] },
        { pertanyaan: "Bima berkata angka 5 pada 58 bernilai 5. Apakah dia benar?", alias: ["salah", "50"] },
        { pertanyaan: "Pasangkan 27, 63, dan 90 dengan nilai tempatnya.", alias: ["2 puluhan", "6 puluhan", "9 puluhan"] },
        { pertanyaan: "Tulis simbol untuk 46 dan 64, lalu sebutkan alasannya.", alias: ["lebih kecil"] },
        { pertanyaan: "Puluhannya 6. Satuannya lebih besar dari 6 dan lebih kecil dari 8. Siapa aku?", alias: ["67"] },
        { pertanyaan: "Urutkan 67, 24, 90, 46, dan 73 dari yang paling kecil.", alias: ["24", "46", "67", "73", "90"] },
        { pertanyaan: "Mana yang lebih besar, 31 atau 13? Sebutkan alasannya.", alias: ["tiga puluh satu", "31"] },
        { pertanyaan: "Dari kartu 4 dan 7, berapa angka terbesar, terkecil, dan selisihnya?", alias: ["74", "47", "27"] },
      ],
      voice: [
        [
          "Sepuluh diikat jadi satu puluhan.",
          "Kiri puluhan, kanan satuan. Urutannya tidak boleh dibalik.",
          "Angka di rumah puluhan bernilai sepuluh kali.",
          "Puluhan beda, puluhan yang menang. Puluhan sama, lihat satuannya.",
          "Belasan hanya sebelas sampai sembilan belas. Yang berakhir nol tidak usah disebut satuannya.",
          "Angka yang sama di tempat yang beda punya nilai yang beda.",
        ],
      ],
    },
  ],
};
