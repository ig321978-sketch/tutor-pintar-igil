import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK1_BAB1 = "Bab 1: Ayo Berhitung!";
export const JUDUL_MTK1_BAB1_LAMA = "Bab 1: Ayo Membilang sampai dengan 10";

export const MODUL_MTK1_BAB1: ModulResmiPai = {
  id: "mtk-1-bab1",
  judul: JUDUL_MTK1_BAB1,
  pola: /ayo\s+berhitung|ayo\s+membilang\s+sampai(\s+dengan)?\s+10|kiko|zuzi/,
  motivasi:
    "Hore! Kamu sudah membilang sampai 10 bersama Kiko dan Zuzi. Hitung satu per satu, bandingkan banyaknya, lalu cari pasangan angkanya.",
  kunciJawaban: "B,B,B,B,A,B,A,A,A,A",
  sketsaKartu: [
    "Kiko si monyet dan Zuzi si kelinci menghitung lima apel merah di bawah pohon.",
    "Kiko memegang 4 pisang dan Zuzi memegang 2 wortel, lalu membandingkan banyaknya.",
    "Kiko naik dan turun tangga pohon sambil menghitung maju dan mundur.",
    "Zuzi membagi 5 permen menjadi pasangan 3 dan 2.",
    "Anak mengisi tantangan juara membilang sampai 10.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Kiko menghitung 6 apel, tetapi ia bilang: satu, dua, tiga, lima, enam. Angka berapa yang lupa diucapkan?
A) Angka 2
B) Angka 4
C) Angka 7
D) Angka 6`,
    `[Soal 2 - PG - Tipe: HOTS]
Siti punya 6 permen dan ingin membaginya sama banyak kepada Kiko dan Zuzi. Pembagian yang adil adalah...
A) Kiko 4, Zuzi 2
B) Kiko 3, Zuzi 3
C) Kiko 5, Zuzi 1
D) Kiko 6, Zuzi 0`,
    `[Soal 3 - PG - Tipe: HOTS]
Saku Beni ada 5 permen. Saku Dodi ada 3 permen. Agar sama banyak dengan Dodi, Beni harus...
A) Meminta 2 permen lagi
B) Memberikan 2 permen miliknya
C) Tidak melakukan apa-apa
D) Memberikan 5 permen`,
    `[Soal 4 - PG - Tipe: MOTS]
Ada 7 donat. Lambang angka dan nama bilangannya adalah...
A) Angka 6 dibaca enam
B) Angka 7 dibaca tujuh
C) Angka 8 dibaca delapan
D) Angka 5 dibaca lima`,
    `[Soal 5 - PG - Tipe: HOTS]
Hitung mundur: 7, 6, 5, bintang, 3. Angka pada bintang adalah...
A) Angka 4
B) Angka 2
C) Angka 8
D) Angka 1`,
    `[Soal 6 - PG - Tipe: HOTS]
Kotak A ada 5 lemon, kotak B ada 2 lemon, kotak C ada 4 lemon. Yang paling sedikit adalah...
A) Kotak A
B) Kotak B
C) Kotak C
D) Kotak A dan C`,
    `[Soal 7 - PG - Tipe: HOTS]
Beni menghitung mundur: 9, 8, 7, 6. Dua angka berikutnya adalah...
A) 5 dan 4
B) 4 dan 3
C) 7 dan 6
D) 10 dan 9`,
    `[Soal 8 - PG - Tipe: HOTS]
Angka utama 8. Pasangannya sudah ada 5. Angka pasangan yang hilang adalah...
A) 3
B) 2
C) 4
D) 8`,
    `[Soal 9 - PG - Tipe: HOTS]
Riko punya 4 roda. Satu mobil-mobilan butuh 4 roda. Berapa mobil yang bisa dibuat sampai roda habis?
A) 1
B) 2
C) 4
D) 0`,
    `[Soal 10 - PG - Tipe: HOTS]
Pasangan pembentuk angka 7 yang selisihnya satu adalah...
A) 3 dan 4
B) 2 dan 2
C) 5 dan 1
D) 6 dan 2`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Menghitung, Membaca, dan Menulis Bilangan",
      pengantar:
        "Kiko dan Zuzi berdiri di bawah pohon apel. Mereka menghitung apel yang jatuh, lalu menulis lambang angkanya.",
      labelDaftar: "Membilang, membaca, dan menulis sampai 10",
      kolom: 1,
      item: [
        {
          nama: "Naskah Kiko dan Zuzi",
          singkat: "Lima apel",
          uraian:
            "Kiko melihat apel merah jatuh. Zuzi mengajak menghitung. Satu, dua, tiga, empat, lima. Ada lima apel. Ditulis angka 5 dan dibaca L-I-M-A.",
          contoh: "5 apel dibaca lima.",
        },
        {
          nama: "Infografis angka 1 sampai 10",
          singkat: "Cara baku dan trik kilat",
          uraian:
            "1 satu, 2 dua, 3 tiga, 4 empat, 5 lima. Cara baku: hitung satu per satu sambil menunjuk benda. Trik kilat: kelompokkan per 2 benda.",
          contoh: "Dua ditambah dua ditambah satu sama dengan lima.",
        },
        {
          nama: "Misi Kantong Rahasia Sani",
          singkat: "Mangkuk 3 dan 6",
          uraian:
            "Siapkan 10 kelereng atau tutup botol. Masukkan 3 benda ke mangkuk A dan 6 benda ke mangkuk B. Mangkuk 6 terasa lebih penuh.",
          contoh: "6 lebih penuh daripada 3.",
        },
        {
          nama: "Trik kunci",
          singkat: "Tandai yang sudah dihitung",
          uraian:
            "Selalu coret atau tandai benda yang sudah dihitung agar tidak dihitung dua kali.",
          contoh: "Tandai dengan pensil.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Ada berapa gambar buah pisang di samping Kiko? 🍌🍌🍌",
          alias: ["3", "tiga"],
        },
        {
          pertanyaan:
            "Sebutkan huruf untuk membaca angka 3. T-I-G, lanjutannya apa?",
          alias: ["a", "tiga"],
        },
        {
          pertanyaan:
            "Apakah mangkuk yang berisi 6 permen terasa lebih penuh? Jawab ya atau tidak.",
          alias: ["ya", "iya", "lebih penuh"],
        },
        {
          pertanyaan: "Sebutkan benda di rumahmu yang jumlahnya tepat ada 2 buah.",
          alias: ["2", "dua", "sepatu", "mata", "telinga", "tangan", "kaki", "sendok"],
        },
      ],
      voice: [
        [
          "Kiko berkata: Zuzi! Lihat, banyak sekali apel merah segar jatuh dari pohon!",
          "Zuzi berkata: Wah, iya! Tapi sebelum dimakan, yuk kita hitung dulu ada berapa buah apelnya!",
          "Kiko berkata: Satu, dua, tiga, empat, lima! Ada lima apel, Zuzi!",
          "Zuzi berkata: Hebat, Kiko! Ditulis dengan angka 5 dan dibaca L-I-M-A.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Membandingkan Banyak Benda",
      pengantar:
        "Kiko memegang 4 pisang. Zuzi memegang 2 wortel. Pisang lebih banyak. Wortel lebih sedikit.",
      labelDaftar: "Lebih banyak, lebih sedikit, dan sama banyak",
      kolom: 1,
      item: [
        {
          nama: "Naskah membandingkan",
          singkat: "4 pisang dan 2 wortel",
          uraian:
            "Pisang Kiko ada 4. Wortel Zuzi ada 2. Empat lebih banyak dari dua. Dua lebih sedikit dari empat.",
          contoh: "4 lebih banyak dari 2.",
        },
        {
          nama: "Infografis membandingkan",
          singkat: "Pasangkan satu-satu",
          uraian:
            "Cara baku: pasangkan benda kiri ke kanan. Yang punya sisa berarti lebih banyak. Trik kilat: ubah gambar menjadi angka. Angka yang lebih jauh saat berhitung adalah yang paling banyak.",
          contoh: "4 jeruk lebih banyak dari 2 jeruk.",
        },
        {
          nama: "Detektif Tangan Timbangan",
          singkat: "Kanan 5, kiri 2",
          uraian:
            "Tangan kanan memegang 5 mainan. Tangan kiri memegang 2 mainan. Tangan kiri lebih sedikit. Jika kedua tangan memegang 3, sebutannya sama banyak.",
          contoh: "Kiri lebih sedikit.",
        },
        {
          nama: "Trik kunci",
          singkat: "Sama banyak",
          uraian:
            "Kata sama banyak hanya dipakai jika jumlah kedua benda persis sama.",
          contoh: "5 dan 5 sama banyak.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Piring A berisi 5 permen dan piring B berisi 5 permen. Apakah mereka sama banyak?",
          alias: ["ya", "iya", "sama", "sama banyak"],
        },
        {
          pertanyaan: "Antara angka 3 dan angka 7, angka mana yang nilainya lebih sedikit?",
          alias: ["3", "tiga"],
        },
        {
          pertanyaan: "Tangan mana yang memegang benda lebih sedikit? Kanan atau kiri?",
          alias: ["kiri"],
        },
        {
          pertanyaan:
            "Jika kedua tangan memegang 3 mainan, apa sebutan perbandingannya?",
          alias: ["sama", "sama banyak"],
        },
      ],
      voice: [
        [
          "Kiko berkata: Zuzi, lihat! Pisangku banyak sekali, ada 4 buah!",
          "Zuzi berkata: Wortelku hanya ada 2 buah, Kiko.",
          "Kiko berkata: Hore, pisangku lebih banyak dari wortelmu!",
          "Zuzi berkata: Betul! Wortelku lebih sedikit dari pisangmu.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Menghitung Maju dan Mundur",
      pengantar:
        "Kiko naik tangga pohon sambil menghitung maju, lalu turun sambil menghitung mundur.",
      labelDaftar: "Hitung maju makin besar, hitung mundur makin kecil",
      kolom: 1,
      item: [
        {
          nama: "Naskah tangga",
          singkat: "Naik dan turun",
          uraian:
            "Menghitung maju: satu, dua, tiga, empat, lima. Angkanya makin besar. Menghitung mundur: lima, empat, tiga, dua, satu. Angkanya makin kecil.",
          contoh: "Maju naik, mundur turun.",
        },
        {
          nama: "Infografis lompatan",
          singkat: "Garis bilangan",
          uraian:
            "Hitung maju melompat ke kanan: 1, 2, 3, 4, 5, 6, 7. Hitung mundur melompat ke kiri: 7, 6, 5, 4, 3, 2, 1. Trik kilat: bayangkan roket, 5, 4, 3, 2, 1, dorr!",
          contoh: "Mundur seperti roket.",
        },
        {
          nama: "Kangaroo Melompat Tangga",
          singkat: "Lompat 3 kali",
          uraian:
            "Lompat ke depan 3 kali sambil berhitung maju: 1, 2, 3. Lalu melompat mundur 3 kali: 3, 2, 1. Saat mundur, tubuh bergerak ke belakang.",
          contoh: "Angka paling besar pada lompatan maju tadi adalah 3.",
        },
        {
          nama: "Trik kunci",
          singkat: "Maju tambah, mundur kurang",
          uraian:
            "Hitung maju seperti menambah mainan. Hitung mundur seperti mainan berkurang. Trik ini membantu belajar penjumlahan nanti.",
          contoh: "Maju tambah, mundur kurang.",
        },
      ],
      kuis: [
        {
          pertanyaan: "Habis angka 3, 4, 5, lalu angka berapa?",
          alias: ["6", "enam"],
        },
        {
          pertanyaan: "Hitung mundur: 4, 3, 2, lalu angka berapa?",
          alias: ["1", "satu"],
        },
        {
          pertanyaan:
            "Saat kamu melompat mundur, apakah tubuhmu bergerak ke belakang? Jawab ya atau tidak.",
          alias: ["ya", "iya"],
        },
        {
          pertanyaan: "Sebutkan hitung mundur dari angka 3 sampai angka 1.",
          alias: ["3 2 1", "tiga dua satu", "3, 2, 1"],
        },
      ],
      voice: [
        [
          "Kiko berkata: Satu, dua, tiga, empat, lima! Hore, aku memanjat naik tangga pohon!",
          "Zuzi berkata: Itu namanya menghitung maju. Angkanya makin lama makin besar!",
          "Kiko berkata: Sekarang aku mau turun. Lima, empat, tiga, dua, satu!",
          "Zuzi berkata: Kalau turun tangga, itu namanya menghitung mundur. Angkanya makin kecil!",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Pasangan Bilangan",
      pengantar:
        "Zuzi membagi 5 permen. 3 masuk kantong merah dan 2 masuk kantong biru. Tiga dan dua jika digabung tetap lima.",
      labelDaftar: "Mengurai dan menyusun pasangan bilangan",
      kolom: 1,
      item: [
        {
          nama: "Naskah kantong permen",
          singkat: "5 = 3 dan 2",
          uraian:
            "Zuzi punya 5 permen. 3 permen ke kantong merah, 2 permen ke kantong biru. 3 dan 2 adalah pasangan angka 5.",
          contoh: "5 sama dengan 3 dan 2.",
        },
        {
          nama: "Infografis number bond",
          singkat: "Jari tangan",
          uraian:
            "Cara baku: pisahkan benda menjadi dua kelompok. Trik kilat: buka 5 jari, tekuk 3, jari yang masih berdiri ada 2. Itulah pasangannya.",
          contoh: "5 diurai menjadi 3 dan 2.",
        },
        {
          nama: "Misi Pecah Pasukan Kelereng",
          singkat: "6 batu jadi 4 dan 2",
          uraian:
            "Ambil 6 kelereng. Pecah menjadi kelompok kiri 4 dan kanan 2. Jumlah semula tetap 6. Jika dibagi sama rata, masing-masing kelompok berisi 3.",
          contoh: "4 ditambah 2 sama dengan 6.",
        },
        {
          nama: "Trik kunci",
          singkat: "Banyak pasangan",
          uraian:
            "Setiap angka punya banyak pasangan rahasia. Berlatih menekuk jari untuk menemukan semua pasangan sampai 10.",
          contoh: "7 bisa 4 dan 3.",
        },
      ],
      kuis: [
        {
          pertanyaan: "Angka 4 bisa dibentuk dari angka 2 dan angka berapa lagi?",
          alias: ["2", "dua"],
        },
        {
          pertanyaan: "Angka 1 dan angka 2 digabungkan menjadi angka berapa?",
          alias: ["3", "tiga"],
        },
        {
          pertanyaan:
            "Kelompok kiri ada 4 batu dan kanan ada 2 batu. Berapa jumlah total batu semula?",
          alias: ["6", "enam"],
        },
        {
          pertanyaan:
            "Jika 6 batu dipecah sama rata, berapa isi batu di masing-masing kelompok?",
          alias: ["3", "tiga"],
        },
      ],
      voice: [
        [
          "Zuzi berkata: Kiko, aku punya 5 permen. Mau aku bagi ke kantong merah dan kantong biru.",
          "Kiko bertanya: Bagaimana caranya, Zuzi?",
          "Zuzi berkata: 3 permen ke kantong merah, dan sisanya 2 permen ke kantong biru. 3 dan 2 jika digabung tetap jadi 5!",
          "Kiko berkata: Berarti 5 itu pasangannya bisa 3 dan 2!",
        ],
      ],
    },
    {
      kode: "L",
      judul: "L. Lembar Evaluasi Siswa",
      pengantar:
        "Tantangan juara. Hitung dengan teliti, lalu tulis jawaban akhirmu.",
      labelDaftar: "Pilihan ganda dan isian HOTS",
      kolom: 1,
      item: [
        {
          nama: "Bagian pilihan ganda",
          singkat: "Lima soal analitis",
          uraian:
            "Kiko lupa mengucapkan angka 4. Pembagian 6 permen yang adil adalah 3 dan 3. Beni harus memberikan 2 permen agar sama dengan Dodi. Tujuh donat dibaca tujuh. Bintang pada hitung mundur adalah 4.",
          contoh: "Jawaban B, B, B, B, A.",
        },
        {
          nama: "Bagian isian",
          singkat: "Lima soal kanvas",
          uraian:
            "Kotak paling sedikit adalah kotak B. Hitung mundur setelah 9, 8, 7, 6 berlanjut 5 dan 4. Pasangan 8 dengan 5 adalah 3. Empat roda cukup untuk 1 mobil. Pasangan 7 yang selisihnya satu adalah 3 dan 4.",
          contoh: "Kotak B, 5 dan 4, 3, 1, 3 dan 4.",
        },
      ],
      kuis: [
        {
          pertanyaan: "Angka berapa yang lupa diucapkan Kiko saat menghitung 6 apel?",
          alias: ["4", "empat", "b"],
        },
        {
          pertanyaan: "Pembagian 6 permen yang paling adil untuk Kiko dan Zuzi?",
          alias: ["3 dan 3", "3", "b", "sama banyak"],
        },
        {
          pertanyaan: "Apa yang harus dilakukan Beni agar permennya sama dengan Dodi?",
          alias: ["memberikan 2", "buang 2", "b"],
        },
        {
          pertanyaan: "Lambang angka untuk 7 donat?",
          alias: ["7", "tujuh", "b"],
        },
        {
          pertanyaan: "Angka rahasia pada pola 7, 6, 5, bintang, 3?",
          alias: ["4", "empat", "a"],
        },
        {
          pertanyaan: "Kotak lemon mana yang isinya paling sedikit?",
          alias: ["kotak b", "b"],
        },
        {
          pertanyaan: "Dua angka berikutnya setelah 9, 8, 7, 6?",
          alias: ["5 dan 4", "5 4", "lima dan empat"],
        },
        {
          pertanyaan: "Pasangan yang hilang dari 8 dan 5?",
          alias: ["3", "tiga"],
        },
        {
          pertanyaan: "Berapa mobil-mobilan yang bisa dibuat dari 4 roda?",
          alias: ["1", "satu"],
        },
        {
          pertanyaan: "Dua angka berurutan yang jumlahnya 7?",
          alias: ["3 dan 4", "4 dan 3", "tiga dan empat"],
        },
      ],
      voice: [
        [
          "Ini lembar evaluasi tantangan juara. Kiko lupa mengucapkan angka 4. Enam permen dibagi adil menjadi 3 dan 3.",
          "Beni harus memberikan 2 permen. Tujuh donat dibaca tujuh. Bintang pada hitung mundur adalah angka 4.",
        ],
        [
          "Kotak paling sedikit adalah kotak B. Setelah 9, 8, 7, 6, lanjutannya 5 dan 4.",
          "Pasangan 8 dan 5 adalah 3. Empat roda membuat 1 mobil. Pasangan berurutan untuk 7 adalah 3 dan 4.",
        ],
      ],
    },
  ],
};
