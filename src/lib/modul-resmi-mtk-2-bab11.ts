import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK2_BAB11 = "Bab 11: Segitiga dan Segiempat";

export const MODUL_MTK2_BAB11: ModulResmiPai = {
  id: "mtk-2-bab11",
  judul: JUDUL_MTK2_BAB11,
  pola:
    /papan catur sani|bab 11: segitiga|segitiga dan segiempat|memotong segiempat|menggabungkan bangun datar/,
  motivasi:
    "Hore! Kamu sudah membantu Sani menghias meja. Satu segiempat dipotong miring jadi dua segitiga. Dua segitiga sama besar ditempel sisi miringnya jadi satu segiempat baru.",
  kunciJawaban: "B,A,B,A,B,A,A,A,A,A",
  sketsaKartu: [
    "Sani ingin menghias meja kasir seperti papan catur. Lani mengajak membuat segitiga dari kertas segi empat.",
    "Satu segiempat dipotong diagonal jadi dua segitiga. Dua segitiga ditempel jadi satu segiempat.",
    "Anak menjadi arsitek puzzle: potong lurus jadi dua segiempat, tempel alas segitiga jadi ketupat.",
    "Anak mengisi lembar evaluasi tantangan para juara tentang memotong dan menggabung bangun.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Edo menggunting segi empat lurus di tengah, lalu bilang hasilnya dua segitiga. Pendapat Edo...
A) Benar, setiap guntingan segi empat pasti segitiga
B) Salah, hasilnya dua segi empat lebih kecil
C) Salah, hasilnya lingkaran
D) Benar jika guntingannya miring`,
    `[Soal 2 - PG - Tipe: HOTS]
Siti butuh 4 segitiga. Setiap segi empat dibelah miring jadi 2 segitiga. Papan segi empat yang disiapkan...
A) 2
B) 4
C) 1
D) 8`,
    `[Soal 3 - PG - Tipe: HOTS]
Sani menempel 1 segiempat dan 1 segitiga di sisi atasnya, bentuknya seperti rumah. Jumlah sudut bangun rumah...
A) 7
B) 5
C) 6
D) 4`,
    `[Soal 4 - PG - Tipe: MOTS]
Dua sapu tangan segitiga ditempel garis miringnya. Wujud baru...
A) Segi empat
B) Lingkaran
C) Segitiga sama sisi
D) Oval`,
    `[Soal 5 - PG - Tipe: HOTS]
Papan Hijau = 2 segitiga jadi segiempat. Papan Biru = 1 segiempat utuh. Garis tepi luar...
A) Hijau lebih banyak
B) Keduanya sama, 4 sisi
C) Biru lebih banyak
D) Keduanya 3 sisi`,
    `[Soal 6 - PG - Tipe: LOTS]
Persegi dipotong diagonal pojok ke pojok. Hasilnya dua buah...
A) Segitiga
B) Lingkaran
C) Persegi panjang
D) Oval`,
    `[Soal 7 - PG - Tipe: HOTS]
3 papan segitiga dan 2 papan segi empat. Total sudut...
A) 17
B) 14
C) 12
D) 9`,
    `[Soal 8 - PG - Tipe: HOTS]
(1) Potong miring segi empat. (2) Tempel sisi miring 2 segitiga. Pasangan...
A) 1B 2A
B) 1A 2B
C) Keduanya A
D) Keduanya B`,
    `[Soal 9 - PG - Tipe: HOTS]
Segitiga dipotong mendatar di puncaknya, puncak dibuang. Sisa bawah...
A) Trapesium
B) Lingkaran
C) Segitiga lebih besar
D) Oval`,
    `[Soal 10 - PG - Tipe: HOTS]
Segi empat dibagi jadi 4 segitiga sama besar dengan garis pojok ke pojok. Jumlah garis...
A) 2
B) 1
C) 4
D) 3`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog Menghias Meja Pesta",
      pengantar:
        "🗺️ Sani ingin menghias meja kasir seperti papan catur. Yang ada hanya kertas segi empat. Lani bilang bangun datar ajaib: bisa dipotong dan digabung menjadi segitiga!",
      labelDaftar: "Target dan cerita apersepsi",
      kolom: 1,
      item: [
        {
          nama: "🌟 Target belajarku hari ini",
          singkat: "Potong dan gabung bangun",
          uraian:
            "🎯 Aku bisa memotong bangun datar segiempat menjadi bentuk segitiga dengan tepat. 🎯 Aku bisa menggabungkan berbagai bangun datar untuk membentuk bangun baru yang seru.",
          contoh: "Potong miring dari pojok ke pojok.",
        },
        {
          nama: "🗺️ Menghias meja pesta",
          singkat: "Kertas segi empat jadi dekorasi",
          uraian:
            "Sani hanya punya kertas segi empat. Lani membawa gunting: potong miring, lalu tempel seperti puzzle. Meja bisa jadi kombinasi segi empat dan segitiga.",
          contoh: "Yuk bantu Sani dan Lani berkreasi!",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Kertas hias Sani berbentuk apa?",
          alias: ["segi empat", "segiempat", "persegi", "kotak"],
        },
        {
          pertanyaan: "2. Lani ingin menambah dekorasi berbentuk apa?",
          alias: ["segitiga"],
        },
        {
          pertanyaan: "3. Alat apa yang dipakai Lani untuk mengubah kertas?",
          alias: ["gunting"],
        },
      ],
      voice: [
        [
          "Toko permen Sani bersiap pesta besar. Sani ingin menghias meja seperti papan catur. Yang ada hanya kertas segi empat.",
          "Lani bilang, bangun datar ajaib. Kita bisa memotong dan menggabungkannya. Yuk bantu Sani dan Lani!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis Potong dan Tempel",
      pengantar:
        "✂️ Satu segiempat dipotong miring dari pojok ke pojok jadi dua segitiga sama besar. Dua segitiga sama besar ditempel sisi miringnya jadi satu segiempat baru.",
      labelDaftar: "Rahasia memotong dan menempel",
      kolom: 1,
      item: [
        {
          nama: "✂️ Memotong segiempat",
          singkat: "1 kotak jadi 2 segitiga",
          uraian:
            "Potong miring dari pojok atas ke pojok bawah. Garis itu disebut diagonal. Hasilnya dua segitiga yang sama besar.",
          contoh: "Bukan potong lurus tengah.",
        },
        {
          nama: "🤝 Menggabungkan segitiga",
          singkat: "2 segitiga jadi 1 kotak",
          uraian:
            "Tempelkan sisi miring dua segitiga yang sama besar. Wujudnya berubah menjadi satu segiempat baru.",
          contoh: "Seperti puzzle mainan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Satu segiempat dipotong miring jadi berapa segitiga?",
          alias: ["2", "dua"],
        },
        {
          pertanyaan: "2. Garis potong pojok ke pojok disebut apa?",
          alias: ["diagonal", "miring"],
        },
        {
          pertanyaan: "3. Dua segitiga sama besar ditempel sisi miringnya jadi apa?",
          alias: ["segi empat", "segiempat", "persegi"],
        },
      ],
      voice: [
        [
          "Satu segiempat dipotong miring dari pojok ke pojok. Hasilnya dua segitiga sama besar. Garis potong itu disebut diagonal.",
          "Dua segitiga sama besar ditempel sisi miringnya. Wujudnya jadi satu segiempat baru.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Arsitek Puzzle Kertas",
      pengantar:
        "🕵️‍♂️ Tebak hasil gunting dan tempel. Eksperimen A potong lurus tengah. Eksperimen B tempel alas dua segitiga sama kaki.",
      labelDaftar: "Aktivitas terbimbing dan jurnal",
      kolom: 1,
      item: [
        {
          nama: "🕵️‍♂️ Aktivitas 1",
          singkat: "Segiempat dan ketupat",
          uraian:
            "A: potong lurus tengah persegi panjang jadi dua segiempat lebih kecil. B: tempel alas dua segitiga sama kaki jadi belah ketupat atau segiempat.",
          contoh: "Lurus tengah bukan miring.",
        },
        {
          nama: "🎭 Jurnal perasaanku",
          singkat: "Pilih wajah",
          uraian:
            "😀 Sangat seru, bangun datar seperti puzzle ajaib! 😐 Harus membayangkan pelan-pelan. 😢 Masih bingung membedakan potong miring dan potong lurus.",
          contoh: "Pilih satu wajah.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Potong lurus tengah segiempat, hasilnya dua bangun apa?",
          alias: ["segi empat", "segiempat", "persegi panjang"],
        },
        {
          pertanyaan: "2. Dua segitiga ditempel alasnya, bangun barunya?",
          alias: ["ketupat", "belah ketupat", "segi empat", "segiempat"],
        },
        {
          pertanyaan: "3. Potong miring pojok ke pojok menghasilkan apa?",
          alias: ["segitiga"],
        },
      ],
      voice: [
        [
          "Yuk jadi arsitek puzzle. Potong lurus tengah persegi panjang. Hasilnya dua segi empat lebih kecil.",
          "Tempel alas dua segitiga sama kaki. Bangun barunya belah ketupat, itu juga segi empat.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "📝 Tantangan para juara! Bedakan potong miring dan potong lurus. Hitung sudut bangun gabungan dari wujud barunya, bukan hanya menjumlah pojok lama.",
      labelDaftar: "Evaluasi pilihan ganda dan isian",
      kolom: 1,
      item: [
        {
          nama: "🍓 Bagian A",
          singkat: "Pilihan ganda",
          uraian:
            "Edo salah, potong lurus jadi dua segiempat. Empat segitiga butuh 2 papan. Rumah punya 5 sudut. Tempel miring jadi segi empat. Tepi luar hijau dan biru sama 4.",
          contoh: "Lihat wujud baru di luar.",
        },
        {
          nama: "✏️ Bagian B",
          singkat: "Isian singkat",
          uraian:
            "Potong diagonal jadi dua segitiga. Total sudut Lani 17. Tindakan 1 = B, 2 = A. Sisa potong puncak = trapesium. Empat segitiga butuh 2 garis diagonal.",
          contoh: "Segitiga. 17. 1B 2A. Trapesium. 2.",
        },
      ],
      kuis: [
        { pertanyaan: "1. Potong lurus tengah segi empat, hasilnya?", alias: ["segi empat", "segiempat"] },
        { pertanyaan: "2. Empat segitiga butuh berapa papan segi empat?", alias: ["2"] },
        { pertanyaan: "3. Rumah dari 1 kotak plus 1 segitiga punya berapa sudut?", alias: ["5"] },
        { pertanyaan: "4. Dua segitiga ditempel garis miring jadi apa?", alias: ["segi empat", "segiempat"] },
        { pertanyaan: "5. Jumlah sisi luar papan hijau dan biru?", alias: ["4", "sama"] },
        { pertanyaan: "6. Persegi dipotong diagonal jadi dua apa?", alias: ["segitiga"] },
        { pertanyaan: "7. Total sudut 3 segitiga dan 2 segi empat?", alias: ["17"] },
        { pertanyaan: "8. Tindakan 1 dan 2, pasangannya?", alias: ["1b"] },
        { pertanyaan: "9. Segitiga dipotong puncaknya, sisa bawah?", alias: ["trapesium", "segi empat", "segiempat"] },
        { pertanyaan: "10. Berapa garis pojok ke pojok untuk 4 segitiga?", alias: ["2"] },
      ],
      voice: [
        [
          "Ini lembar evaluasi tantangan para juara. Edo salah, potong lurus jadi dua segi empat. Empat segitiga butuh dua papan. Rumah punya lima sudut.",
          "Tempel garis miring jadi segi empat. Tepi luar hijau dan biru sama, empat sisi.",
        ],
        [
          "Potong diagonal jadi dua segitiga. Total sudut Lani tujuh belas. Tindakan satu jadi dua segitiga, tindakan dua jadi satu segi empat. Sisa potong puncak adalah trapesium. Empat segitiga butuh dua garis diagonal.",
        ],
      ],
    },
  ],
};
