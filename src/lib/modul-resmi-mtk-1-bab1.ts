import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK1_BAB1 = "Bab 1: Ayo Membilang sampai dengan 10";
export const JUDUL_MTK1_BAB1_LAMA = "Bab 1: Ayo Berhitung!";

export const MODUL_MTK1_BAB1: ModulResmiPai = {
  id: "mtk-1-bab1",
  judul: JUDUL_MTK1_BAB1,
  pola: /ayo\s+berhitung|ayo\s+membilang\s+sampai(\s+dengan)?\s+10\b|piknik buah rara|rara dan bimo|permen warna-warni sani/,
  motivasi:
    "Hore! Kamu sudah piknik bersama Rara, Bimo, dan Igil. Hitung buahnya satu per satu, tulis angkanya, lalu bandingkan jumlahnya.",
  kunciJawaban: "B,C,A,B,A,B,B,A,A,B",
  sketsaKartu: [
    "Rara dan Bimo piknik di taman, menghitung apel, jeruk, pisang, dan stroberi bersama Igil.",
    "Tangga bilangan 1 sampai 10, mulut ikan untuk tanda lebih besar, dan kereta bilangan.",
    "Kiko menjaga sepuluh petak kebun angka: menghitung, membaca, menulis, dan membandingkan.",
    "Lembar kerja tantangan juara membilang dan membandingkan sampai 10.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: LOTS]
Di piring ada 7 ikan. Berapa jumlah ikannya?
A) 6
B) 7
C) 8`,
    `[Soal 2 - PG - Tipe: LOTS]
Ada 9 kue mangkuk. Lambang bilangan yang sesuai adalah...
A) 6
B) 8
C) 9`,
    `[Soal 3 - PG - Tipe: HOTS]
Roket bilangan: 3, 4, titik, 6, 7. Angka yang hilang adalah...
A) 5
B) 2
C) 8`,
    `[Soal 4 - PG - Tipe: HOTS]
Ada 6 ceri. Dina berkata, "Ada 5 ceri." Pernyataan yang tepat adalah...
A) Dina benar, ada 5 ceri
B) Dina salah, ada 6 ceri
C) Dina benar, ada 6 ceri`,
    `[Soal 5 - PG - Tipe: HOTS]
Bebek ada 4. Kelinci ada 6. Tanda yang tepat adalah...
A) 4 < 6
B) 4 > 6
C) 4 = 6`,
    `[Soal 6 - PG - Tipe: HOTS]
Piring A ada 5 kue. Piring B ada 3 kue. Kue yang ditambahkan ke piring B agar sama banyak adalah...
A) 1
B) 2
C) 3`,
    `[Soal 7 - PG - Tipe: HOTS]
Ada 8 kancing. Cara paling baik agar semua kancing dihitung satu kali adalah...
A) Menghitung dengan sangat cepat
B) Memindahkan kancing satu per satu sambil menghitung
C) Menebak jumlah kancing`,
    `[Soal 8 - PG - Tipe: HOTS]
Kotak A ada 3 bintang, kotak C ada 5, kotak B ada 7. Urutan dari paling sedikit ke paling banyak adalah...
A) A, C, B
B) B, A, C
C) C, A, B`,
    `[Soal 9 - PG - Tipe: HOTS]
Kelompok pertama berjumlah 4. Kelompok kedua lebih banyak dan tidak lebih dari 10. Pilihan yang benar adalah...
A) 4 < 6
B) 4 > 6
C) 4 = 11`,
    `[Soal 10 - PG - Tipe: HOTS]
Rara punya 6 balon. Bimo punya 8 balon. Siapa yang lebih banyak, dan berapa selisihnya?
A) Rara, selisih 2
B) Bimo, selisih 2
C) Bimo, selisih 4`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Piknik Buah Rara dan Bimo",
      pengantar:
        "Rara dan Bimo piknik di taman bersama Igil si burung hantu. Mereka menghitung apel, jeruk, pisang, dan stroberi.",
      labelDaftar: "Cerita piknik dan menghitung buah",
      kolom: 1,
      item: [
        {
          nama: "Tujuan pembelajaran",
          singkat: "Membilang sampai 10",
          uraian:
            "Siswa dapat menghitung benda sampai 10, membaca dan menulis lambang 1 sampai 10, mencocokkan jumlah dengan lambangnya, serta membandingkan lebih banyak, lebih sedikit, atau sama banyak.",
          contoh: "Hitung satu per satu, lalu tulis angkanya.",
        },
        {
          nama: "Cerita piknik",
          singkat: "Apel 3, pisang 4, jeruk 5",
          uraian:
            "Tiga apel dibaca 3. Lima jeruk dibaca 5. Igil membawa 4 pisang. Urutannya 3, 4, 5. Jeruk lebih banyak daripada apel karena 5 > 3. Stroberi dan pisang sama-sama 4, jadi 4 = 4.",
          contoh: "Jeruk lebih banyak. Stroberi dan pisang sama banyak.",
        },
      ],
      kuis: [
        {
          pertanyaan: "Di atas tikar ada tujuh mangga. Berapa jumlah mangganya?",
          alias: ["tujuh", "7", "ada tujuh mangga"],
        },
        {
          pertanyaan: "Tebalkan angka 3.",
          alias: ["3", "tiga"],
        },
        {
          pertanyaan: "Ada berapa apel di piring?",
          alias: ["3", "tiga"],
        },
        {
          pertanyaan: "Ada berapa jeruk dari keranjang?",
          alias: ["5", "lima"],
        },
        {
          pertanyaan: "Tuliskan angka banyak jeruk.",
          alias: ["5", "lima"],
        },
        {
          pertanyaan: "Urutan dari yang paling sedikit: tiga, empat, lalu berapa?",
          alias: ["5", "lima"],
        },
        {
          pertanyaan: "Tuliskan urutan 3, 4, 5.",
          alias: ["3, 4, 5", "3 4 5", "345"],
        },
        {
          pertanyaan: "Mana yang lebih banyak, apel atau jeruk?",
          alias: ["jeruk"],
        },
        {
          pertanyaan: "Tuliskan 5 > 3.",
          alias: ["5 > 3", "5>3", "lima lebih besar dari tiga"],
        },
        {
          pertanyaan: "Stroberi dan pisang sama banyak. Masing-masing berapa?",
          alias: ["4", "empat"],
        },
        {
          pertanyaan: "Tuliskan 4 = 4.",
          alias: ["4 = 4", "4=4", "empat sama dengan empat"],
        },
      ],
      voice: [
        [
          "Rara dan Bimo duduk di tikar piknik. Ada keranjang buah dan Igil si burung hantu.",
          "Rara menghitung tiga apel. Lambang bilangannya adalah 3. Bimo mengeluarkan lima jeruk. Igil membawa empat pisang.",
          "Urutannya 3, 4, 5. Jeruk lebih banyak daripada apel, karena lima lebih besar daripada tiga. Stroberi dan pisang sama-sama empat.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Ayo Mengenal Bilangan 1-10",
      pengantar:
        "Kenali jumlah, nama bilangan, dan lambangnya. Lalu cocokkan, urutkan, dan bandingkan.",
      labelDaftar: "Infografis bilangan dan perbandingan",
      kolom: 1,
      item: [
        {
          nama: "Lambang 1 sampai 10",
          singkat: "Satu sampai sepuluh",
          uraian:
            "Satu 1, dua 2, tiga 3, empat 4, lima 5, enam 6, tujuh 7, delapan 8, sembilan 9, sepuluh 10. Tunjuk benda satu per satu. Benda terakhir menunjukkan jumlah semuanya.",
          contoh: "Enam ikan ditulis 6.",
        },
        {
          nama: "Membandingkan jumlah",
          singkat: "Lebih banyak, lebih sedikit, sama banyak",
          uraian:
            "Ayam 5 lebih banyak daripada katak 3, jadi 5 > 3. Mobil 2 lebih sedikit daripada bola 4, jadi 2 < 4. Bunga dan stroberi sama-sama 3, jadi 3 = 3. Mulut tanda terbuka ke jumlah yang lebih banyak.",
          contoh: "8 > 5, mulut terbuka ke arah 8.",
        },
      ],
      kuis: [
        {
          pertanyaan: "Cocokkan kumbang, kue, dan balon dengan angka 2, 5, dan 7.",
          alias: ["2", "5", "7"],
        },
        {
          pertanyaan: "Susun gerbong dari bilangan paling kecil: 6, 4, 5, 2, 3.",
          alias: ["2", "3", "4", "5", "6"],
        },
        {
          pertanyaan: "Keranjang mana yang buahnya paling banyak?",
          alias: ["b", "keranjang b", "enam"],
        },
        {
          pertanyaan: "Ada delapan burung di pohon. Sebutkan bilangan sebelum delapan.",
          alias: ["tujuh", "7"],
        },
      ],
      voice: [
        [
          "Ayo mengenal bilangan satu sampai sepuluh. Tunjuk benda satu per satu, lalu ucapkan bilangannya. Benda terakhir adalah jumlah semuanya.",
          "Empat kupu-kupu dipasangkan dengan angka 4. Lima ayam lebih banyak daripada tiga katak. Dua mobil lebih sedikit daripada empat bola. Tiga bunga sama banyak dengan tiga stroberi.",
        ],
        [
          "Dua kumbang ke angka 2. Lima kue ke angka 5. Tujuh balon ke angka 7. Kereta dari kecil: 2, 3, 4, 5, 6. Keranjang B paling banyak karena ada enam buah.",
          "Bilangan sebelum delapan adalah tujuh. Tiga kura-kura lebih sedikit daripada lima kelinci, jadi 3 < 5.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Misi Penjaga Kebun Angka",
      pengantar:
        "Bantu Kiko mengisi 10 petak kebun. Hijau untuk menghitung, biru untuk membaca, kuning untuk menulis, dan ungu untuk membandingkan.",
      labelDaftar: "Sepuluh misi bilangan di kebun",
      kolom: 1,
      item: [
        {
          nama: "Alur permainan",
          singkat: "Pilih petak, jawab, dapat bintang",
          uraian:
            "Siswa memilih satu petak. Kiko membacakan misi. Jawaban benar mendapat 1 bintang kebun. Jawaban yang belum tepat mendapat petunjuk, tanpa kehilangan daun. Setelah 10 petak selesai, bunga pelangi tumbuh.",
          contoh: "Lima bunga, bacaan delapan, lambang 6, dan kelompok lebah yang lebih banyak.",
        },
        {
          nama: "Daun ajaib",
          singkat: "3, 2, atau 1 daun",
          uraian:
            "Jawaban pertama benar mendapat 3 daun ajaib. Benar setelah satu petunjuk mendapat 2 daun. Benar setelah dua petunjuk mendapat 1 daun. Belum tepat tidak mengurangi daun. Siswa boleh mencoba lagi.",
          contoh: "Petunjuk: benda bergoyang, lalu muncul titik, lalu Kiko menghitung bersama.",
        },
      ],
      kuis: [
        { pertanyaan: "Berapa jumlah bunga tulip?", alias: ["5", "lima"] },
        { pertanyaan: "Bacalah bilangan 8.", alias: ["delapan", "8"] },
        { pertanyaan: "Tuliskan lambang jumlah wortel.", alias: ["6", "enam"] },
        { pertanyaan: "Kelompok lebah mana yang lebih banyak?", alias: ["kedua", "kelompok kedua"] },
        { pertanyaan: "Berapa jumlah bunga matahari?", alias: ["3", "tiga"] },
        { pertanyaan: "Bacalah bilangan 4.", alias: ["empat", "4"] },
        { pertanyaan: "Tuliskan lambang jumlah stroberi.", alias: ["9", "sembilan"] },
        { pertanyaan: "Kelompok anak ayam mana yang lebih banyak?", alias: ["pertama", "kelompok pertama"] },
        { pertanyaan: "Berapa jumlah bintang di petak?", alias: ["10", "sepuluh"] },
        { pertanyaan: "Bacalah bilangan 1.", alias: ["satu", "1"] },
      ],
      voice: [
        [
          "Kiko menjaga kebun angka. Ada sepuluh petak dari rumah sampai piala.",
          "Petak hijau untuk menghitung. Petak biru untuk membaca. Petak kuning untuk menulis. Petak ungu untuk membandingkan.",
          "Jawaban benar mendapat satu bintang kebun. Jika belum tepat, Kiko memberi petunjuk. Daun tidak berkurang. Setelah sepuluh petak selesai, bunga pelangi tumbuh.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar:
        "Hitung satu per satu, tulis angkanya, lalu bandingkan jumlahnya. Ini tantangan para juara.",
      labelDaftar: "Poin penting dan evaluasi",
      kolom: 1,
      item: [
        {
          nama: "Poin penting",
          singkat: "Hitung, tulis, bandingkan",
          uraian:
            "Tunjuk satu, sebut satu. Setiap benda hanya dihitung sekali. Bilangan terakhir adalah jumlah semua benda. Urutan 1 sampai 10. Lebih banyak berarti lebih besar. Lebih sedikit berarti lebih kecil. Sama banyak berarti jumlahnya sama. Mulut tanda terbuka ke bilangan yang lebih besar. Tanda sama dengan berarti kedua jumlah sama.",
          contoh: "Hitung satu per satu, tulis angkanya, lalu bandingkan jumlahnya.",
        },
        {
          nama: "Lembar kerja",
          singkat: "Sepuluh tantangan",
          uraian:
            "Ikan ada 7. Kue mangkuk ada 9. Angka hilang pada 3, 4, 5, 6, 7 adalah 5. Dina salah karena ceri ada 6. Tanda 4 dan 6 adalah kurang dari. Piring B perlu 2 kue lagi. Kancing dihitung dengan dipindahkan satu per satu. Urutan bintang dari sedikit adalah kotak A, C, lalu B. Kelompok 4 dibanding kelompok yang lebih banyak. Bimo punya lebih banyak balon, selisihnya 2.",
          contoh: "Jawaban latihan: B, C, A, B, A, B, B, A, A, B.",
        },
      ],
      kuis: [
        { pertanyaan: "Berapa jumlah ikan?", alias: ["7", "tujuh", "b"] },
        { pertanyaan: "Lambang bilangan untuk 9 kue mangkuk?", alias: ["9", "sembilan", "c"] },
        { pertanyaan: "Angka yang hilang pada 3, 4, titik, 6, 7?", alias: ["5", "lima"] },
        { pertanyaan: "Apakah Dina benar saat berkata ada 5 ceri?", alias: ["salah", "enam", "6"] },
        { pertanyaan: "Tanda antara 4 dan 6?", alias: ["<", "4 < 6"] },
        { pertanyaan: "Berapa kue yang ditambahkan agar sama banyak?", alias: ["2", "dua"] },
        { pertanyaan: "Cara terbaik menghitung 8 kancing?", alias: ["b", "satu per satu"] },
        { pertanyaan: "Urutan kotak dari bintang paling sedikit?", alias: ["a c b", "a, c, b"] },
        { pertanyaan: "Kelompok pertama 4 dan kelompok kedua 6. Tanda yang benar?", alias: ["4 < 6", "4<6", "b"] },
        { pertanyaan: "Siapa yang balonnya lebih banyak, dan berapa selisihnya?", alias: ["bimo", "2", "dua"] },
      ],
      voice: [
        [
          "Poin penting. Tunjuk satu, sebut satu. Bilangan terakhir adalah jumlah semua benda. Urutannya satu sampai sepuluh.",
          "Lebih banyak berarti lebih besar. Lebih sedikit berarti lebih kecil. Sama banyak berarti jumlahnya sama. Mulut tanda terbuka ke bilangan yang lebih besar.",
        ],
        [
          "Tujuh ikan. Sembilan kue. Angka yang hilang adalah 5. Dina salah, cerinya ada enam. Empat lebih sedikit daripada enam.",
          "Tambahkan dua kue. Pindahkan kancing satu per satu. Urutan bintang dari sedikit: kotak A, C, lalu B. Bimo punya lebih banyak balon. Selisihnya dua.",
        ],
      ],
    },
  ],
};
