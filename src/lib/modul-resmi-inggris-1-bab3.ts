import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_INGGRIS1_BAB3 = "Unit 3: Let's Count";

export const MODUL_INGGRIS1_BAB3: ModulResmiPai = {
  id: "inggris-1-bab3",
  judul: JUDUL_INGGRIS1_BAB3,
  pola: /let'?s count|lets count|numbers 1-10|numbers 1 to 10|one two three/,
  motivasi:
    "Count with a happy voice: one to ten. One book. Three books. Add -s when there is more than one.",
  kunciJawaban: "B,A,C,B,A,B,C,A,B,A",
  sketsaKartu: [
    "Joshua dan Nia menghitung tujuh buku di meja perpustakaan, rak kosong zero.",
    "Angka one sampai ten dan konsep one book, three books.",
    "Anak menghitung benda nyata di sekolah serta di rumah.",
    "Siswa menjumlah apel dan memilih four pencils.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Ali has three apples. Nia gives him two more apples. How many apples does Ali have now?
A) Four apples
B) Five apples
C) Six apples
D) Three apples`,
    `[Soal 2 - PG - Tipe: HOTS]
Look at this group of objects: four pencils. The correct phrase is...
A) Four pencils
B) Four pencil
C) One pencil
D) Four book`,
    `[Soal 3 - PG - Tipe: HOTS]
There are zero books on the empty shelf. Zero means...
A) Ten books are hiding.
B) The shelf has seven books.
C) There is not even one book.
D) We cannot count anymore.`,
    `[Soal 4 - PG - Tipe: Reguler]
The English word for 7 is...
A) Six
B) Seven
C) Eight
D) Five`,
    `[Soal 5 - PG - Tipe: Reguler]
1 book is said...
A) One book
B) One books
C) Ten book
D) Zero books`,
    `[Soal 6 - PG - Tipe: Reguler]
We add -s to book when we have...
A) Zero things only.
B) More than one book.
C) A color, not a number.
D) Only a pencil.`,
    `[Soal 7 - PG - Tipe: Reguler]
Eight is the number...
A) 6
B) 9
C) 8
D) 10`,
    `[Soal 8 - PG - Tipe: Reguler]
Ten is written as...
A) 10
B) 2
C) 0
D) 7`,
    `[Soal 9 - PG - Tipe: HOTS]
Joshua counts seven books on the desk. If he puts all of them on the empty shelf, the shelf has...
A) Zero books
B) Seven books
C) One book
D) Ten books`,
    `[Soal 10 - PG - Tipe: Reguler]
Two means...
A) 2
B) 5
C) 9
D) 1`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Counting Books in the Library",
      pengantar:
        "Di perpustakaan sekolah. Joshua merapikan buku di atas meja. Nia mengajak menghitung bersama.",
      labelDaftar: "One to seven on the desk, zero on the shelf",
      kolom: 1,
      item: [
        {
          nama: "Let's count them",
          singkat: "Menghitung bersama",
          uraian:
            "Nia: Joshua, you have a lot of books on the desk. Let's count them. Joshua: Okay, Nia! One, two, three, four, five, six, seven!",
          contoh: "One, two, three, four, five, six, seven!",
        },
        {
          nama: "Seven books",
          singkat: "Lebih dari satu",
          uraian:
            "Nia: Wow, seven books! Jumlah lebih dari satu, jadi books, bukan book.",
          contoh: "Seven books.",
        },
        {
          nama: "Zero on the shelf",
          singkat: "Rak kosong",
          uraian:
            "Nia: Look at the empty shelf. How many books are there? Joshua: There are zero books on the shelf. It is completely empty!",
          contoh: "Zero books. The shelf is empty.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. How many books are on the desk?",
          alias: ["seven", "tujuh", "7"],
        },
        {
          pertanyaan: "2. How many books are on the empty shelf?",
          alias: ["zero", "nol", "kosong", "0"],
        },
        {
          pertanyaan: "3. Ucapkan angka 3 dalam bahasa Inggris.",
          alias: ["three", "tri"],
        },
      ],
      voice: [
        [
          "In the library, Nia says, Joshua, you have a lot of books on the desk. Let's count them.",
          "Joshua counts, One, two, three, four, five, six, seven! Nia says, Wow, seven books!",
        ],
        [
          "Nia looks at the empty shelf. How many books are there? Joshua says, There are zero books on the shelf. It is completely empty!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Numbers 1 to 10 and Plural -s",
      pengantar:
        "Lafalkan angka 1 sampai 10 dengan fasih. Jika benda lebih dari satu, tambahkan -s pada kata benda yang biasa.",
      labelDaftar: "One to ten, one book, three books",
      kolom: 1,
      item: [
        {
          nama: "Cardinals",
          singkat: "One to ten",
          uraian:
            "One 1, two 2, three 3, four 4, five 5, six 6, seven 7, eight 8, nine 9, ten 10.",
          contoh: "One, two, three, four, five.",
        },
        {
          nama: "Plural nouns",
          singkat: "Tambah -s",
          uraian:
            "1 book → one book. 3 books → three books. 4 pencils → four pencils, bukan four pencil.",
          contoh: "One book. Three books. Four pencils.",
        },
        {
          nama: "Add and count",
          singkat: "Hitung lagi",
          uraian:
            "Three apples plus two apples is five apples. Ulangi benda dan angka bersama-sama.",
          contoh: "Three and two is five.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Ucapkan angka 10 dalam bahasa Inggris.",
          alias: ["ten"],
        },
        {
          pertanyaan: "2. 3 books atau 3 book?",
          alias: ["books", "three books"],
        },
        {
          pertanyaan: "3. Eight adalah angka berapa?",
          alias: ["8", "delapan", "eight"],
        },
      ],
      voice: [
        [
          "Listen and say: one, two, three, four, five, six, seven, eight, nine, ten.",
        ],
        [
          "One book. Three books. We add s when there is more than one. Four pencils, not four pencil. Three apples and two apples make five apples.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Count Together",
      pengantar:
        "Hitung benda nyata. Guru memakai kartu angka. Orang tua menghitung mainan atau buah di rumah.",
      labelDaftar: "Latihan menghitung 1-10",
      kolom: 2,
      item: [
        {
          nama: "Number train",
          singkat: "Untuk guru",
          uraian:
            "Taruh 1 sampai 10 pensil. Siswa menghitung nyaring. Tunjuk 1 book dan 3 books. Tanyakan: mengapa ada huruf s?",
          contoh: "One book. Three books.",
        },
        {
          nama: "Fruit count",
          singkat: "Untuk orang tua",
          uraian:
            "Ambil apel atau biskuit. Hitung one sampai ten. Beri dua lagi, hitung ulang. Kosongkan piring: zero.",
          contoh: "Five apples. Zero apples.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Ucapkan angka 1.",
          alias: ["one", "wan"],
        },
        {
          pertanyaan: "2. Ucapkan angka 5.",
          alias: ["five"],
        },
        {
          pertanyaan: "3. Zero artinya...?",
          alias: ["nol", "kosong", "tidak ada", "zero"],
        },
      ],
      voice: [
        [
          "At school, count pencils from one to ten. Say one book and three books. The s shows more than one.",
        ],
        [
          "At home, count fruit. Add two more and count again. An empty plate has zero.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Varied Evaluation",
      pengantar:
        "Jumlahkan apel Ali, lalu pilih frasa yang benar untuk empat pensil.",
      labelDaftar: "Critical counting: five apples, four pencils",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Critical counting",
          uraian:
            "Three apples plus two apples = five apples. Empat pensil: four pencils, ada -s karena lebih dari satu.",
          contoh: "Five apples. Four pencils.",
        },
        {
          nama: "Ingat -s",
          singkat: "Lebih dari satu",
          uraian:
            "Four pencil salah. One pencil benar untuk satu. Four pencils benar untuk empat.",
          contoh: "More than one → add s.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Three apples plus two apples = ... apples?",
          alias: ["five", "5", "lima"],
        },
        {
          pertanyaan: "2. Empat pensil dalam bahasa Inggris?",
          alias: ["four pencils", "pencils"],
        },
      ],
      voice: [
        [
          "Ali has three apples. Nia gives two more. Ali has five apples now.",
        ],
        [
          "Four pencils, with s, because there is more than one pencil.",
        ],
      ],
    },
  ],
};
