import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK2_BAB4 = "Bab 4: Geometri Bangun Datar";

export const MODUL_MTK2_BAB4: ModulResmiPai = {
  id: "mtk-2-bab4",
  judul: JUDUL_MTK2_BAB4,
  pola:
    /geometri bangun datar|bungkus permen unik|karakter bangun datar|identifikasi segitiga|penjumlahan bersusun|pola dan bangun/,
  motivasi:
    "Hore! Kamu sudah membantu Sani mengelompokkan bungkus permen. Segitiga 3 sisi 3 sudut. Segi empat 4 sisi 4 sudut. Lingkaran 1 sisi, 0 sudut.",
  kunciJawaban: "B,A,C,B,A,A,A,A,A,A",
  sketsaKartu: [
    "Paman membawa toples permen: kotak, lolipop lancip, dan koin bundar.",
    "Sani memisahkan segi empat, segitiga, dan lingkaran menurut sisi dan sudut.",
    "Anak menjadi detektif garis tepi: hitung sisi dan sudut dua bungkus misteri.",
    "Anak mengisi lembar evaluasi tantangan para juara tentang bangun datar.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Beni menggelindingkan permen kotak, lolipop, dan koin. Ia bilang semua bisa menggelinding mulus. Pendapat Beni...
A) Benar, karena beratnya sama
B) Salah, hanya permen koin (lingkaran) yang menggelinding mulus karena tidak punya sudut
C) Salah, hanya permen cokelat yang menggelinding
D) Semua permen punya sudut`,
    `[Soal 2 - PG - Tipe: HOTS]
Siti memotong kertas segi empat diagonal dari pojok ke pojok. Potongannya menjadi...
A) Dua buah bangun segitiga
B) Dua buah bangun segi empat yang lebih kecil
C) Satu buah bangun lingkaran
D) Tetap satu segi empat`,
    `[Soal 3 - PG - Tipe: HOTS]
Jumlah sisi ditambah jumlah sudut = 6. Pojokan sama banyak dengan sisinya. Bangun itu...
A) Lingkaran
B) Segi empat
C) Segitiga
D) Tidak ada`,
    `[Soal 4 - PG - Tipe: MOTS]
Cetakan kue berbentuk atap rumah. Jumlah sisi dan sudutnya...
A) 4 sisi dan 4 sudut
B) 3 sisi dan 3 sudut
C) 1 sisi dan 0 sudut
D) 2 sisi dan 2 sudut`,
    `[Soal 5 - PG - Tipe: HOTS]
Dodi menempel dua segitiga sama pada satu sisi miring. Bangun baru yang terbentuk...
A) Segi empat
B) Lingkaran
C) Tetap satu segitiga besar
D) Tidak terbentuk bangun`,
    `[Soal 6 - PG - Tipe: LOTS]
Bangun yang punya 1 sisi melingkar dan 0 sudut dinamakan...
A) Lingkaran
B) Segitiga
C) Segi empat
D) Persegi`,
    `[Soal 7 - PG - Tipe: HOTS]
Ubin kotak, roda gerobak, penggaris segitiga, buku persegi panjang. Yang termasuk segi empat...
A) Nomor 1 dan 4
B) Nomor 2 dan 3
C) Nomor 1 dan 2
D) Nomor 3 dan 4`,
    `[Soal 8 - PG - Tipe: HOTS]
4 sudut sisinya tegak lurus berpasangan dengan segi empat. 3 sudut berpasangan dengan segitiga. Pasangan yang tepat...
A) 1B dan 2A
B) 1A dan 2B
C) Keduanya A
D) Keduanya B`,
    `[Soal 9 - PG - Tipe: HOTS]
Pagar segi empat dari stik, 1 stik patah. Sisa stik membentuk...
A) Segitiga
B) Lingkaran
C) Tetap segi empat
D) Garis lurus`,
    `[Soal 10 - PG - Tipe: HOTS]
Dinding punya 2 bungkus segitiga dan 1 bungkus segi empat. Total sudut...
A) 10
B) 8
C) 7
D) 6`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog Oleh-oleh Permen dari Paman",
      pengantar:
        "🗺️ Paman membawa toples permen untuk Sani. Bungkusnya ada yang kotak, lancip, dan bundar.",
      labelDaftar: "Target dan cerita apersepsi",
      kolom: 1,
      item: [
        {
          nama: "🌟 Target belajarku hari ini",
          singkat: "Sisi dan sudut",
          uraian:
            "🎯 Aku bisa mengenal segitiga, segi empat, dan lingkaran dari benda di sekitarku. 🎯 Aku bisa menghitung jumlah sisi dan sudut dengan tepat.",
          contoh: "Hitung garis tepi dan pojokan.",
        },
        {
          nama: "🗺️ Oleh-oleh permen dari paman",
          singkat: "Kotak, lolipop, koin",
          uraian:
            "Ada bungkus kotak kaku, ada yang lancip seperti atap, ada yang melingkar. Ada yang punya pojokan tajam, ada yang tidak.",
          contoh: "Yuk bantu Sani mengelompokkan menurut bentuk pinggirannya!",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Siapa yang membawa toples permen untuk Sani?",
          alias: ["paman"],
        },
        {
          pertanyaan: "2. Bungkus permen cokelat bentuknya seperti apa?",
          alias: ["kotak", "segi empat", "kaku"],
        },
        {
          pertanyaan: "3. Permen koin bentuknya seperti apa?",
          alias: ["lingkaran", "bundar", "melingkar", "bulat"],
        },
      ],
      voice: [
        [
          "Hari ini paman membawa toples permen untuk Sani. Ada bungkus kotak, ada yang lancip seperti atap rumah, ada yang bundar seperti koin.",
          "Sani meraba pinggirannya. Ada yang punya pojokan tajam, ada yang tidak. Yuk, kita bantu Sani mengelompokkan permen menurut bentuk pinggirannya!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis Bungkus Permen Unik",
      pengantar:
        "📐 Sisi adalah garis tepi. Sudut adalah pojokan lancip. Segi empat 4 sisi 4 sudut. Segitiga 3 sisi 3 sudut. Lingkaran 1 sisi, 0 sudut.",
      labelDaftar: "Sisi, sudut, dan tiga kelompok bangun",
      kolom: 1,
      item: [
        {
          nama: "🟥 Segi empat",
          singkat: "4 sisi dan 4 sudut",
          uraian:
            "Seperti bungkus cokelat batang atau ubin. Ada garis atas, bawah, kiri, dan kanan. 4 sisi dan 4 sudut.",
          contoh: "Kotak = 4 sisi, 4 sudut.",
        },
        {
          nama: "🔺 Segitiga",
          singkat: "3 sisi dan 3 sudut",
          uraian:
            "Seperti atap rumah atau potongan pizza. Ada garis miring kanan, miring kiri, dan alas. 3 sisi dan 3 sudut.",
          contoh: "Atap = 3 sisi, 3 sudut.",
        },
        {
          nama: "🟡 Lingkaran",
          singkat: "1 sisi, 0 sudut",
          uraian:
            "Seperti permen koin atau roda. Melingkar penuh tanpa putus. 1 sisi melingkar dan tidak punya sudut.",
          contoh: "Koin = 1 sisi, 0 sudut.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Segi empat punya berapa sisi dan sudut?",
          alias: ["4", "empat"],
        },
        {
          pertanyaan: "2. Segitiga punya berapa sisi?",
          alias: ["3", "tiga"],
        },
        {
          pertanyaan: "3. Lingkaran punya berapa sudut?",
          alias: ["0", "nol", "tidak punya", "tidak ada"],
        },
      ],
      voice: [
        [
          "Sisi adalah garis tepi bungkus. Sudut adalah pojokan lancip. Segi empat punya empat sisi dan empat sudut. Segitiga punya tiga sisi dan tiga sudut.",
          "Lingkaran punya satu sisi melingkar dan tidak punya sudut. Jangan sampai tertukar ya!",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Detektif Garis Tepi",
      pengantar:
        "🕵️‍♂️ Hitung garis tepi dan pojokan dua bungkus misteri. Bungkus A seperti atap. Bungkus B seperti kotak.",
      labelDaftar: "Aktivitas terbimbing dan jurnal",
      kolom: 1,
      item: [
        {
          nama: "🕵️‍♂️ Aktivitas 1",
          singkat: "Segitiga dan segi empat",
          uraian:
            "Bungkus A: 3 sisi, 3 sudut, segitiga. Bungkus B: 4 sisi, 4 sudut, segi empat.",
          contoh: "A segitiga, B segi empat.",
        },
        {
          nama: "🎭 Jurnal perasaanku",
          singkat: "Pilih wajah",
          uraian:
            "😀 Seru sekali, sekarang aku tahu nama pojokan bangun datar! 😐 Sedikit bingung menghitung sisi pada lingkaran. 😢 Masih butuh bantuan membedakan sisi dan sudut.",
          contoh: "Pilih satu wajah.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Bungkus A yang seperti atap punya berapa sisi?",
          alias: ["3", "tiga"],
        },
        {
          pertanyaan: "2. Bungkus B yang seperti kotak punya berapa sudut?",
          alias: ["4", "empat"],
        },
        {
          pertanyaan: "3. Bungkus A dinamakan bangun apa?",
          alias: ["segitiga"],
        },
      ],
      voice: [
        [
          "Yuk jadi detektif garis tepi. Bungkus A seperti atap: tiga sisi dan tiga sudut. Namanya segitiga.",
          "Bungkus B seperti kotak: empat sisi dan empat sudut. Namanya segi empat.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "📝 Tantangan para juara! Kenali sisi dan sudut bungkus Sani, Siti, Beni, Dodi, dan Riko.",
      labelDaftar: "Evaluasi pilihan ganda dan isian",
      kolom: 1,
      item: [
        {
          nama: "🍓 Bagian A",
          singkat: "Pilihan ganda",
          uraian:
            "Hanya koin yang menggelinding. Potong diagonal jadi 2 segitiga. Teka-teki 6 adalah segitiga. Cetakan atap 3 sisi 3 sudut. Dua segitiga menempel jadi segi empat.",
          contoh: "Lingkaran menggelinding. Potong jadi 2 segitiga.",
        },
        {
          nama: "✏️ Bagian B",
          singkat: "Isian singkat",
          uraian:
            "1 sisi 0 sudut = lingkaran. Ubin dan buku = 1 dan 4. Pasangan 1B 2A. Sisa stik = segitiga. Total sudut 10.",
          contoh: "Lingkaran, 1 dan 4, 10.",
        },
      ],
      kuis: [
        { pertanyaan: "1. Permen mana yang menggelinding mulus?", alias: ["koin", "lingkaran"] },
        { pertanyaan: "2. Potong segi empat diagonal jadi bangun apa?", alias: ["segitiga", "dua segitiga"] },
        { pertanyaan: "3. Sisi plus sudut = 6, pojokan sama dengan sisi?", alias: ["segitiga"] },
        { pertanyaan: "4. Cetakan atap punya berapa sisi?", alias: ["3", "tiga"] },
        { pertanyaan: "5. Dua segitiga menempel jadi bangun apa?", alias: ["segi empat", "segiempat"] },
        { pertanyaan: "6. 1 sisi melingkar 0 sudut namanya?", alias: ["lingkaran"] },
        { pertanyaan: "7. Ubin kotak dan buku termasuk kelompok apa?", alias: ["segi empat", "1", "4"] },
        { pertanyaan: "8. 4 sudut tegak lurus namanya?", alias: ["segi empat", "b"] },
        { pertanyaan: "9. Segi empat kehilangan 1 stik jadi?", alias: ["segitiga"] },
        { pertanyaan: "10. 2 segitiga dan 1 segi empat total sudut?", alias: ["10", "sepuluh"] },
      ],
      voice: [
        [
          "Ini lembar evaluasi tantangan para juara. Hanya permen koin yang menggelinding mulus. Potong kertas segi empat diagonal jadi dua segitiga. Teka-teki sisi tambah sudut enam adalah segitiga.",
          "Cetakan atap punya tiga sisi tiga sudut. Dua segitiga menempel jadi segi empat.",
        ],
        [
          "Satu sisi melingkar tanpa sudut namanya lingkaran. Ubin dan buku termasuk segi empat. Empat sudut tegak lurus itu segi empat. Tiga sudut itu segitiga. Sisa stik jadi segitiga. Total sudut Sani sepuluh.",
        ],
      ],
    },
  ],
};
