import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK2_BAB7 = "Bab 7: Ayo Membilang sampai dengan 100";
export const JUDUL_MTK2_BAB7_LAMA = "Bab 7: Pengukuran Berat Standar";

export const MODUL_MTK2_BAB7: ModulResmiPai = {
  id: "mtk-2-bab7",
  judul: JUDUL_MTK2_BAB7,
  pola:
    /bab\s*7[:.]\s*(ayo )?membilang|ayo membilang sampai( dengan)? 100|penyelam igil|ekspedisi kapal selam|palung 100|pengukuran berat standar|timbangan toko permen|satuan g dan kg|dunia timbangan/,
  motivasi:
    "Hore! Kamu sudah bantu Penyelam IGIL menghitung mutiara sampai 100. Kelompokkan sepuluh-sepuluh. Angka depan puluhan, angka belakang satuan. Bandingkan puluhannya dulu.",
  kunciJawaban: "B,B,B,B,A,A,C,A,B,A",
  sketsaKartu: [
    "Penyelam IGIL, Nala, dan Arka menghitung mutiara 51 sampai 100. Tujuh kerang puluhan dan tiga mutiara satuan menjadi 73.",
    "Penyu Toti membawa karang puluhan dan satuan. Angka depan nilainya puluhan. Sepuluh puluhan sama dengan 100.",
    "Sepuluh gerbang kapal selam menuju Palung 100. Kode angka 51 sampai 100 membuka karang.",
    "Lembar juara membilang sampai 100. Nilai tempat, bandingkan puluhan, lompat 2, 5, dan 10.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Nala punya kartu 6 dan 9. Bilangan dua angka PALING BESAR dan nilai tempatnya...
A) 6 Puluhan dan 9 Satuan (69)
B) 9 Puluhan dan 6 Satuan (96)
C) 9 Puluhan dan 9 Satuan (99)`,
    `[Soal 2 - PG - Tipe: HOTS]
6 kantong puluhan (60) dan 14 kelereng satuan. 10 satuan masuk kantong baru. Jumlah seluruhnya...
A) 64 kelereng
B) 74 kelereng
C) 84 kelereng`,
    `[Soal 3 - PG - Tipe: HOTS]
Aku bilangan di antara 70 dan 80. Angka satuanku sama dengan angka puluhanku. Aku adalah...
A) 70
B) 77
C) 88`,
    `[Soal 4 - PG - Tipe: HOTS]
Katak laut lompat mundur 5: 95 → 90 → 85 → [P] → 75. Bilangan P...
A) 84
B) 80
C) 70`,
    `[Soal 5 - PG - Tipe: MOTS]
Pasangan yang tepat...
A) 8 Puluhan + 0 Satuan = 80, 10 Puluhan = 100, 5 Satuan + 7 Puluhan = 75
B) 8 Puluhan + 0 Satuan = 8, 10 Puluhan = 10
C) 5 Satuan + 7 Puluhan = 57`,
    `[Soal 6 - PG - Tipe: HOTS]
Arka 89 kerang, Nala 91, Toti 85. Arka: urutan paling banyak Nala, Arka, lalu Toti. Benar atau salah?
A) Benar
B) Salah
C) Sama saja`,
    `[Soal 7 - PG - Tipe: HOTS]
Sudah 90 mutiara. Tambah berapa supaya genap 100?
A) 9
B) 20
C) 10`,
    `[Soal 8 - PG - Tipe: LOTS]
Antara 64 dan 69, mana yang lebih besar?
A) 69
B) 64
C) 60`,
    `[Soal 9 - PG - Tipe: HOTS]
Bilangan dari 3 Satuan dan 9 Puluhan...
A) 39
B) 93
C) 36`,
    `[Soal 10 - PG - Tipe: MOTS]
Pada Tabel 100, di bawah 72 ditambah 10 menjadi...
A) 82
B) 62
C) 72`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar Palung Mutiara",
      pengantar:
        "🗺️ Halo penyelam cilik! Bersama Penyelam IGIL kita menghitung harta karun mutiara dari 51 sampai 100.",
      labelDaftar: "Tiga sub-bab palung",
      kolom: 1,
      item: [
        {
          nama: "🐚 7.1 Menghitung, membaca, menulis 51–100",
          singkat: "10 mutiara = 1 kerang",
          uraian:
            "Kumpulkan setiap 10 mutiara ke 1 kerang besar. Tujuh kerang dan 3 mutiara dibaca tujuh puluh tiga.",
          contoh: "7 kerang + 3 mutiara = 73.",
        },
        {
          nama: "🏠 7.2 Nilai tempat puluhan dan satuan",
          singkat: "Depan puluhan, belakang satuan",
          uraian:
            "Angka depan menempati Puluhan. Angka belakang menempati Satuan. 10 puluhan = 100 seratus.",
          contoh: "96: 9 puluhan = 90, 6 satuan = 6.",
        },
        {
          nama: "🐬 7.3 Membandingkan dan membilang lompat",
          singkat: "Cek puluhan dulu",
          uraian:
            "Bandingkan puluhan dulu. Kalau puluhan sama, bandingkan satuan. Lompat 2, 5, atau 10.",
          contoh: "81 lebih dari 79 karena 8 puluhan > 7 puluhan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Bagaimana cara membaca bilangan 85?",
          alias: ["delapan puluh lima", "85"],
        },
        {
          pertanyaan: "2. Pada 79, angka 7 menempati nilai tempat apa?",
          alias: ["puluhan"],
        },
        {
          pertanyaan: "3. Mana yang lebih banyak: 68 atau 86?",
          alias: ["delapan puluh enam", "86"],
        },
      ],
      voice: [
        [
          "Halo penyelam cilik! Bersama Penyelam IGIL, kita akan menghitung harta karun mutiara dari angka 51 sampai 100.",
          "Agar cepat dan tidak salah hitung, kita kumpulkan setiap 10 mutiara ke dalam 1 kerang besar!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis Puluhan sampai 100",
      pengantar:
        "📊 Tiga rumus cepat: kelompok puluhan, peta nilai tempat, dan jurus banding plus lompat.",
      labelDaftar: "Tiga infografis",
      kolom: 1,
      item: [
        {
          nama: "🐚 Kelompok puluhan",
          singkat: "10 puluhan = 100",
          uraian:
            "Hitung dulu berapa kelompok puluhannya, lalu tambahkan satuan. 10 kelompok puluhan sama dengan 100.",
          contoh: "7 kerang + 4 mutiara = 70 + 4 = 74.",
        },
        {
          nama: "🔢 Peta nilai tempat",
          singkat: "Kiri puluhan, kanan satuan",
          uraian:
            "Angka kiri adalah Puluhan. Angka kanan adalah Satuan. 59 berbeda dengan 95.",
          contoh: "87: 8 nilainya 80, 7 nilainya 7. 80 + 7 = 87.",
        },
        {
          nama: "⚖️ Banding dan lompat",
          singkat: "Puluhan dulu",
          uraian:
            "Kalau puluhan berbeda, yang puluhannya lebih besar lebih banyak. Kalau puluhan sama, lihat satuan. Lompat 2, 5, atau 10.",
          contoh: "91 > 89. 74 < 78. Lompat 2: 62, 64, 66.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Sepuluh kelompok puluhan sama dengan bilangan berapa?",
          alias: ["seratus", "100"],
        },
        {
          pertanyaan: "2. Pada 63, nilai angka 6 di puluhan: enam atau enam puluh?",
          alias: ["enam puluh", "60"],
        },
        {
          pertanyaan: "3. Antara 74 dan 78, mana yang kurang dari yang lain?",
          alias: ["tujuh puluh empat", "74"],
        },
      ],
      voice: [
        [
          "Ingat rumus cepat menghitung benda sampai 100: hitung dulu berapa kelompok puluhannya, lalu tambahkan satuannya. Kalau ada 10 kelompok puluhan, itu sama dengan 100!",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Ekspedisi Kapal Selam Menuju Palung 100",
      pengantar:
        "🚢 Kapal selam butuh kode angka 51 sampai 100 untuk membuka 10 gerbang karang.",
      labelDaftar: "Sepuluh gerbang palung",
      kolom: 1,
      item: [
        {
          nama: "🐚 Kode puluhan dan satuan",
          singkat: "Kelompokkan sepuluh-sepuluh",
          uraian:
            "5 ikat puluhan dan 9 satuan = 59. Sembilan puluh satu ditulis 91. 70 + 6 = 76.",
          contoh: "Jalur kanan 71 lebih banyak dari jalur kiri 69.",
        },
        {
          nama: "🐬 Lompat dan seratus",
          singkat: "10 puluhan = 100",
          uraian:
            "Lompat 10: 63, 73, 83, 93. Pada 80, satuan 0 dan puluhan 8. 10 puluhan dibaca seratus.",
          contoh: "8 kerang + 3 mutiara = 83. Paling besar di 67, 76, 70 adalah 76.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. 5 ikat puluhan dan 9 satuan. Kodenya berapa?",
          alias: ["59", "lima puluh sembilan"],
        },
        {
          pertanyaan: "2. Sembilan puluh satu ditulis?",
          alias: ["91", "sembilan puluh satu"],
        },
        {
          pertanyaan: "3. 70 tambah 6 membentuk bilangan?",
          alias: ["76", "tujuh puluh enam"],
        },
      ],
      voice: [
        [
          "Selamat datang di permainan Ekspedisi Kapal Selam Menuju Palung 100! Kapal selam Penyelam IGIL membutuhkan kode angka dari 51 sampai 100 untuk membuka 10 gerbang karang bawah laut.",
          "Setiap jawaban benar akan mengisi bahan bakar oksigen dan menyalakan lampu sonar!",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "📝 Sepuluh soal ketelitian. Perhatikan nilai tempat puluhan dan satuan.",
      labelDaftar: "Evaluasi HOTS membilang sampai 100",
      kolom: 1,
      item: [
        {
          nama: "🧠 Nilai tempat dan gabung satuan",
          singkat: "Kartu 6 dan 9",
          uraian:
            "Bilangan terbesar dari 6 dan 9 adalah 96. Enam puluhan plus 14 satuan menjadi 7 puluhan dan 4 satuan = 74.",
          contoh: "Di antara 70 dan 80, satuan sama puluhan: 77.",
        },
        {
          nama: "🐬 Lompat, banding, papan 100",
          singkat: "Puluhan dulu",
          uraian:
            "Lompat mundur 5 dari 85 adalah 80. 91 > 89 > 85. 90 butuh 10 lagi jadi 100. 3 satuan dan 9 puluhan = 93. Di bawah 72 adalah 82.",
          contoh: "69 lebih besar dari 64.",
        },
      ],
      kuis: [
        { pertanyaan: "1. Kartu 6 dan 9, bilangan terbesar?", alias: ["96", "sembilan puluh enam"] },
        { pertanyaan: "2. 6 puluhan dan 14 satuan, setelah dikelompokkan?", alias: ["74", "tujuh puluh empat"] },
        { pertanyaan: "3. Antara 70 dan 80, satuan sama puluhan?", alias: ["77", "tujuh puluh tujuh"] },
        { pertanyaan: "4. 95 lompat mundur 5, setelah 85?", alias: ["80", "delapan puluh"] },
        { pertanyaan: "5. 8 puluhan 0 satuan sama dengan?", alias: ["80", "delapan puluh"] },
        { pertanyaan: "6. Urutan Nala 91, Arka 89, Toti 85. Arka benar?", alias: ["benar"] },
        { pertanyaan: "7. 90 butuh tambah berapa ke 100?", alias: ["sepuluh", "10"] },
        { pertanyaan: "8. Mana lebih besar, 64 atau 69?", alias: ["enam puluh sembilan", "69"] },
        { pertanyaan: "9. 3 satuan dan 9 puluhan ditulis?", alias: ["93"] },
        { pertanyaan: "10. Di bawah 72 pada papan 100?", alias: ["82"] },
      ],
      voice: [
        [
          "Hebat sekali, Penyelam Cilik! Sebelum kita mulai Lembar Evaluasi Siswa, yuk kita ingat kembali tiga kalimat kunci tentang bilangan sampai 100 bersama Penyelam IGIL!",
        ],
        [
          "Sekarang waktunya menguji ketangkasanmu di Lembar Evaluasi Siswa Bab 7! Ada 10 soal HOTS tentang bilangan sampai dengan 100. Perhatikan nilai tempat puluhan dan satuannya dengan teliti ya!",
        ],
      ],
    },
  ],
};
