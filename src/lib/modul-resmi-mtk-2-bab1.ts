import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK2_BAB1 = "Bab 1: Bilangan Cacah sampai 100";

export const MODUL_MTK2_BAB1: ModulResmiPai = {
  id: "mtk-2-bab1",
  judul: JUDUL_MTK2_BAB1,
  pola:
    /bilangan cacah sampai 100|desa angka|kakek tono|ikat( menjadi)? puluhan|nilai tempat puluhan|bilangan 1 sampai( dengan)? 1.?000|bilangan 1 sampai 100|rumah tinggal angka/,
  motivasi:
    "Hore! Kamu sudah bisa hitung sampai 100. Tiap 10 jadi 1 puluhan. 25 = 2 puluhan + 5 satuan.",
  kunciJawaban: "B,B,C,B,B,B,A,C,B,A",
  sketsaKartu: [
    "Anak menghitung apel Kakek Tono dengan mengikat tiap 10 apel.",
    "Angka 25 masuk rumah puluhan dan rumah satuan.",
    "Anak menghitung jeruk: 2 ikat dan 4 sisa.",
    "Anak memasangkan angka, mengurutkan, dan menulis 25.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: Reguler]
1 ikat berisi 10 disebut...
A) 1 Satuan
B) 1 Puluhan
C) 10 Puluhan
D) 2 Puluhan`,
    `[Soal 2 - PG - Tipe: Reguler]
Pada angka 25, angka 2 menempati tempat...
A) Satuan, nilainya 2
B) Puluhan, nilainya 20
C) Ratusan, nilainya 200
D) Puluhan, nilainya 2`,
    `[Soal 3 - PG - Tipe: Reguler]
Ada 2 ikat jeruk dan 4 jeruk sisa. Jumlahnya...
A) 14
B) 6
C) 24
D) 42`,
    `[Soal 4 - PG - Tipe: HOTS]
Angka 100 terdiri dari...
A) 10 puluhan dan 10 satuan
B) 1 ratusan, 0 puluhan, dan 0 satuan
C) 100 puluhan
D) 1 satuan saja`,
    `[Soal 5 - PG - Tipe: Reguler]
Cara membaca 37 adalah...
A) Tiga tujuh
B) Tiga puluh tujuh
C) Tujuh puluh tiga
D) Tiga puluh`,
    `[Soal 6 - PG - Tipe: Reguler]
49 = ... puluhan + ... satuan
A) 9 puluhan + 4 satuan
B) 4 puluhan + 9 satuan
C) 49 puluhan + 0 satuan
D) 4 satuan + 9 puluhan`,
    `[Soal 7 - PG - Tipe: Reguler]
71 terdiri dari...
A) 7 puluhan + 1 satuan
B) 1 puluhan + 7 satuan
C) 71 satuan saja
D) 7 satuan`,
    `[Soal 8 - PG - Tipe: Reguler]
Cara membaca 85 adalah...
A) Delapan lima
B) Lima puluh delapan
C) Delapan puluh lima
D) Delapan puluh`,
    `[Soal 9 - PG - Tipe: HOTS]
Mengapa kita ikat tiap 10 benda?
A) Supaya bendanya kelihatan lebih banyak
B) Agar menghitung cepat tanpa menghitung satu per satu
C) Karena satuan lebih besar dari puluhan
D) Karena angka 100 tidak punya rumah`,
    `[Soal 10 - PG - Tipe: Reguler]
Cara membaca 62 adalah...
A) Enam puluh dua
B) Dua puluh enam
C) Enam dua
D) Enam puluh`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Hitung Apel Kakek Tono",
      pengantar:
        "🎒 Kita ke Desa Angka. 🌟 Belajar angka 21 sampai 100. 🗺️ Kakek Tono punya banyak apel 🍎. Yuk hitung bersama!",
      labelDaftar: "Target, cerita, dan ikat puluhan",
      kolom: 1,
      item: [
        {
          nama: "🌟 Hari ini kita belajar",
          singkat: "21 sampai 100",
          uraian:
            "🎯 Aku bisa menulis angka 21 sampai 100. 🎯 Aku bisa lihat mana puluhan dan mana satuan.",
          contoh: "25 = 2 puluhan + 5 satuan.",
        },
        {
          nama: "🗺️ Apel Kakek Tono",
          singkat: "Lebih dari 20",
          uraian:
            "Apel Kakek banyak. Lebih dari 20. Kalau dihitung satu-satu, lama sekali.",
          contoh: "Kita bantu Kakek hitung lebih cepat.",
        },
        {
          nama: "🪵 Ikat tiap 10",
          singkat: "1 ikat = 1 puluhan",
          uraian:
            "Ikat tiap 10 benda. 🥢 1 ikat = 10 = 1 puluhan. 🥢 2 ikat = 20 = 2 puluhan. Sisa yang kurang dari 10 = satuan.",
          contoh: "1 ikat = 1 puluhan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1 ikat berisi 10 disebut apa?",
          alias: ["puluhan", "satu puluhan", "1 puluhan"],
        },
      ],
      kuisTulis: {
        pertanyaan: "2 ikat berisi 20 disebut ... puluhan.",
        alias: ["2", "dua", "2 puluhan", "dua puluhan"],
      },
      voice: [
        [
          "Hari ini kita ke Desa Angka. Kita belajar angka 21 sampai 100.",
          "Kakek Tono punya banyak apel. Lebih dari 20. Susah dihitung satu-satu.",
          "Rahasianya: ikat tiap 10. Satu ikat disebut satu puluhan. Dua ikat disebut dua puluhan.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Rumah Angka 25",
      pengantar:
        "🏠 Angka punya 2 rumah. Kiri = puluhan. Kanan = satuan. Pada 25: angka 2 nilainya 20, angka 5 nilainya 5.",
      labelDaftar: "Rumah 25 dan angka 100",
      kolom: 1,
      item: [
        {
          nama: "🏠 Rumah kiri",
          singkat: "Puluhan",
          uraian: "Angka di kiri = puluhan. Pada 25, angka 2 nilainya 20. 🪵🪵 Dua ikat.",
          contoh: "Angka 2 pada 25 = 20.",
        },
        {
          nama: "🥢 Rumah kanan",
          singkat: "Satuan",
          uraian:
            "Angka di kanan = satuan. Pada 25, angka 5 nilainya 5. 🥢 Lima batang. Jadi 20 + 5 = 25.",
          contoh: "Angka 5 pada 25 = 5.",
        },
        {
          nama: "💡 Angka 100",
          singkat: "Tiga angka",
          uraian: "100 punya 3 angka. Itu 1 ratusan, 0 puluhan, dan 0 satuan.",
          contoh: "100 = 1 ratusan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "Pada angka 25, angka 2 ada di rumah mana? Nilainya berapa?",
          alias: ["puluhan", "20", "dua puluh"],
        },
      ],
      kuisTulis: {
        pertanyaan: "Bagaimana cara membaca 25?",
        alias: ["dua puluh lima", "25", "2 puluhan 5 satuan"],
      },
      voice: [
        [
          "Angka punya dua rumah. Kiri puluhan. Kanan satuan.",
          "Lihat angka 25. Angka 2 di kiri, nilainya 20. Angka 5 di kanan, nilainya 5. Dibaca dua puluh lima.",
          "Angka 100 punya tiga angka. Satu ratusan, nol puluhan, nol satuan.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Ayo Berlatih",
      pengantar:
        "🕵️‍♂️ Hitung jeruk 🍊. ✍️ Jodohkan 37, 62, dan 85. 🧩 Isi 49 dan 71. 🎭 Lalu pilih perasaanmu.",
      labelDaftar: "Jeruk, pasangkan, kotak, jurnal",
      kolom: 1,
      item: [
        {
          nama: "🕵️‍♂️ Hitung jeruk",
          singkat: "2 ikat + 4 sisa",
          uraian: "Tiap 10 jeruk = 1 ikat. Ada 2 ikat dan 4 sisa. Jumlahnya 24.",
          contoh: "2 puluhan + 4 satuan = 24.",
        },
        {
          nama: "✍️ Jodohkan dan 🧩 isi kotak",
          singkat: "37, 62, 85, 49, 71",
          uraian:
            "37 = tiga puluh tujuh. 62 = enam puluh dua. 85 = delapan puluh lima. 49 = 4 puluhan + 9 satuan. 71 = 7 puluhan + 1 satuan.",
          contoh: "49 = 4 puluhan + 9 satuan.",
        },
        {
          nama: "🎭 Perasaanku",
          singkat: "Pilih wajah",
          uraian:
            "😀 Aku sudah paham. 😐 Mau latihan lagi. 😢 Butuh bantuan. Kamu hebat!",
          contoh: "Pilih satu wajah.",
        },
      ],
      kuis: [
        { pertanyaan: "2 ikat + 4 sisa jeruk sama dengan berapa?", alias: ["24", "dua puluh empat"] },
        { pertanyaan: "37 dibaca apa?", alias: ["tiga puluh tujuh"] },
        { pertanyaan: "62 dibaca apa?", alias: ["enam puluh dua"] },
        { pertanyaan: "85 dibaca apa?", alias: ["delapan puluh lima"] },
        { pertanyaan: "49 terdiri dari berapa puluhan?", alias: ["4", "empat", "empat puluhan"] },
        { pertanyaan: "71 terdiri dari berapa satuan?", alias: ["1", "satu", "satu satuan"] },
      ],
      voice: [
        ["Hitung jeruk. Dua ikat dan empat sisa. Jumlahnya 24. Dua puluh empat."],
        [
          "37 tiga puluh tujuh. 62 enam puluh dua. 85 delapan puluh lima. 49 itu 4 puluhan dan 9 satuan. 71 itu 7 puluhan dan 1 satuan.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Mainkan Lagi",
      pengantar:
        "✍️ Tarik garis 37, 62, 85. 🏠 Masukkan ikat ke kiri, sisa ke kanan. Urutkan 24, 49, 71. Tulis 25.",
      labelDaftar: "Garis, keranjang, urutan, tulis, detektif",
      kolom: 1,
      item: [
        {
          nama: "✍️ Main A sampai C",
          singkat: "Garis, rumah, urutan",
          uraian:
            "Jodohkan angka dengan cara bacanya. Ikat masuk rumah puluhan. Sisa masuk rumah satuan. Urutkan dari yang kecil.",
          contoh: "24, lalu 49, lalu 71.",
        },
        {
          nama: "🏆 Main D dan E",
          singkat: "Tulis dan detektif",
          uraian:
            "Tulis 25. Lalu pilih BENAR atau SALAH. 🏆 Kamu hebat! Sampai jumpa di petualangan berikutnya.",
          contoh: "Dua puluh lima = 25.",
        },
      ],
      kuis: [
        { pertanyaan: "37 dibaca?", alias: ["tiga puluh tujuh"] },
        { pertanyaan: "2 ikat ke rumah mana?", alias: ["puluhan"] },
        { pertanyaan: "Urutan 24 49 71?", alias: ["24", "49", "71"] },
        { pertanyaan: "100 punya 1 ratusan?", alias: ["benar"] },
        { pertanyaan: "Angka 2 pada 25 nilainya 2?", alias: ["salah"] },
      ],
      kuisTulis: {
        pertanyaan: "Tulis lambang dua puluh lima.",
        alias: ["25", "dua puluh lima"],
      },
      voice: [
        [
          "Tarik garis dari angka ke cara bacanya. Masukkan ikat ke rumah puluhan. Masukkan sisa ke rumah satuan.",
          "Urutkan 24, 49, lalu 71. Tulis angka 25.",
          "Angka 100 punya satu ratusan. Angka 2 pada 25 nilainya 20. Kamu hebat!",
        ],
      ],
    },
  ],
};
