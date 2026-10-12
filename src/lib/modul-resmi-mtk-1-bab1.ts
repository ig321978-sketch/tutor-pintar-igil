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
    "Hore! Kamu sudah piknik bersama Rara, Bimo, dan Miko. Hitung buahnya satu per satu, tulis angkanya, lalu bandingkan jumlahnya.",
  kunciJawaban: "B,C,A,B,A,B,B,A,A,B",
  sketsaKartu: [
    "Rara dan Bimo piknik di taman, menghitung apel, jeruk, pisang, dan stroberi bersama Miko.",
    "Tangga bilangan 1 sampai 10, mulut ikan untuk tanda lebih besar, dan kereta bilangan.",
    "Toko angka mini dengan kartu angka, benda hitung, dan dua wadah.",
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
        "Rara dan Bimo piknik di taman bersama Miko si Kucing. Mereka menghitung apel, jeruk, pisang, dan stroberi.",
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
            "Tiga apel dibaca 3. Lima jeruk dibaca 5. Miko membawa 4 pisang. Urutannya 3, 4, 5. Jeruk lebih banyak daripada apel karena 5 > 3. Stroberi dan pisang sama-sama 4, jadi 4 = 4.",
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
      ],
      voice: [
        [
          "Rara dan Bimo duduk di tikar piknik. Ada keranjang buah dan Miko si Kucing.",
          "Rara menghitung tiga apel. Lambang bilangannya adalah 3. Bimo mengeluarkan lima jeruk. Miko membawa empat pisang.",
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
      judul: "C. Toko Angka Mini",
      pengantar:
        "Rara membuka toko mainan. Ambil benda sesuai kartu angka, lalu bandingkan dua wadah.",
      labelDaftar: "Permainan menghitung dan membandingkan",
      kolom: 1,
      item: [
        {
          nama: "Cara bermain",
          singkat: "Kartu, benda, dua wadah",
          uraian:
            "Acak kartu angka. Baca bilangannya. Ambil benda satu per satu sesuai angka, lalu masukkan ke wadah. Ulangi untuk wadah kedua. Bandingkan, lalu tulis kedua angka dan tandanya.",
          contoh: "Kartu 4 dan kartu 7 ditulis 4 < 7. Empat lebih sedikit daripada tujuh.",
        },
        {
          nama: "Pendamping",
          singkat: "Hitung sekali",
          uraian:
            "Pindahkan benda satu per satu. Benda yang sudah dihitung diletakkan di dalam wadah agar tidak dihitung dua kali.",
          contoh: "Wadah A 5 benda. Wadah B 3 benda. Wadah B lebih sedikit.",
        },
      ],
      kuis: [
        {
          pertanyaan: "Kartu angka 6. Baca bilangannya, lalu sebutkan bilangan setelahnya.",
          alias: ["enam", "tujuh", "6", "7"],
        },
        {
          pertanyaan: "Wadah A ada 5 benda. Wadah B ada 3 benda. Wadah mana yang lebih sedikit?",
          alias: ["wadah b", "b", "sedikit"],
        },
        {
          pertanyaan: "Ambil 8 benda. Tuliskan lambang bilangannya.",
          alias: ["8", "delapan"],
        },
      ],
      voice: [
        [
          "Selamat datang di toko angka mini. Ambil satu kartu, baca angkanya, lalu ambil benda sebanyak angka itu.",
          "Contoh: kartu 4 dan kartu 7. Empat lebih sedikit daripada tujuh, jadi 4 < 7.",
          "Wadah A ada lima benda. Wadah B ada tiga benda. Wadah B lebih sedikit. Enam benda lebih banyak daripada empat benda.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Poin Penting dan Lembar Kerja",
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
        { pertanyaan: "Tuliskan perbandingan kelompok 4 dengan kelompok yang lebih banyak.", alias: ["4 < 5", "4 < 6", "4 < 7", "4 < 8", "4 < 9", "4 < 10"] },
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
