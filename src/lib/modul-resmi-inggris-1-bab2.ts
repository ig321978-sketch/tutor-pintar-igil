import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_INGGRIS1_BAB2 = "Unit 2: My School Things";

export const MODUL_INGGRIS1_BAB2: ModulResmiPai = {
  id: "inggris-1-bab2",
  judul: JUDUL_INGGRIS1_BAB2,
  pola: /my school things|objects in the classroom|classroom objects|school things/,
  motivasi:
    "Look around your desk. Book, pencil, eraser, ruler, bag. This is near. That is farther away.",
  kunciJawaban: "B,A,B,A,C,B,A,B,C,A",
  sketsaKartu: [
    "Nia mencari pensil saat jam menggambar, Ali membantu melihat meja dan kotak pensil.",
    "Benda kelas: book, pencil, eraser, ruler, bag, desk, this dan that.",
    "Anak menunjuk benda dekat dan jauh di sekolah serta di rumah.",
    "Siswa memilih penghapus untuk coretan salah dan arti kata This.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
You want to clean the wrong writing on your book. What object do you need?
A) A ruler
B) An eraser
C) A pencil case
D) A bag`,
    `[Soal 2 - PG - Tipe: HOTS]
Ali says: "This is my bag." The word "This" means the bag is...
A) Near Ali (close to his hand).
B) Very far away on the tree.
C) In another classroom.
D) Only in a picture book.`,
    `[Soal 3 - PG - Tipe: HOTS]
Nia says her pencil is wood, not plastic. She is looking at a pen on the desk. Why is the pen not her pencil?
A) Because a pen and a pencil are the same.
B) Because she knows her pencil is made of wood, while the pen is plastic.
C) Because pens cannot be on a desk.
D) Because Ali hid all wooden things.`,
    `[Soal 4 - PG - Tipe: Reguler]
Book in Indonesian is...
A) Buku.
B) Penghapus.
C) Tas.
D) Meja.`,
    `[Soal 5 - PG - Tipe: Reguler]
We use a ruler to...
A) Eat lunch.
B) Open the door.
C) Draw a straight line or measure a short length.
D) Erase a word.`,
    `[Soal 6 - PG - Tipe: Reguler]
"That is a whiteboard" is used when the board is...
A) Inside our pocket.
B) Farther from us, not in our hand.
C) A small pencil.
D) A kind of bag.`,
    `[Soal 7 - PG - Tipe: Reguler]
Desk means...
A) Meja tulis.
B) Penggaris.
C) Pensil.
D) Papan tulis.`,
    `[Soal 8 - PG - Tipe: Reguler]
A pencil case is a place to keep...
A) Shoes.
B) Small school things like a pencil and an eraser.
C) A big whiteboard.
D) The classroom door.`,
    `[Soal 9 - PG - Tipe: HOTS]
Ali finds Nia's pencil inside the pencil case, under the book. The pencil is...
A) On the tree.
B) In another school.
C) Hidden under the book, inside the case.
D) Flying in the sky.`,
    `[Soal 10 - PG - Tipe: Reguler]
"This is a book" points to a book that is...
A) Near the speaker.
B) On the moon.
C) Always far.
D) Never in the class.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. I Cannot Find My Pencil",
      pengantar:
        "Di dalam kelas saat jam pelajaran menggambar. Nia mencari pensilnya. Ali membantu melihat meja, pena, dan kotak pensil.",
      labelDaftar: "Percakapan Nia dan Ali tentang pencil, pen, desk, book",
      kolom: 1,
      item: [
        {
          nama: "Looking for a pencil",
          singkat: "Nia bertanya",
          uraian:
            "Nia: Ali, I cannot find my pencil. Do you see it? Ali: Oh, look at your desk, Nia. Is that a pencil?",
          contoh: "Do you see my pencil?",
        },
        {
          nama: "Pen or pencil",
          singkat: "Beda benda",
          uraian:
            "Nia: No, that is a pen. My pencil is wood, not plastic. Ia membedakan benda dari bahan dan namanya.",
          contoh: "That is a pen. This is a pencil.",
        },
        {
          nama: "Under the book",
          singkat: "Tempat benda",
          uraian:
            "Ali: Your pencil is inside the pencil case, under the book! Nia: Thank you, Ali! Now I can draw again.",
          contoh: "Inside the pencil case, under the book.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Nia cannot find her...?",
          alias: ["pencil", "pensil"],
        },
        {
          pertanyaan: "2. Benda plastik di meja Nia adalah... (pen / bag)",
          alias: ["pen", "pena"],
        },
        {
          pertanyaan: "3. Pensil Nia ada di dalam...?",
          alias: ["pencil case", "case", "kotak", "under the book"],
        },
      ],
      voice: [
        [
          "In the classroom, Nia is looking for her pencil. She asks, Ali, I cannot find my pencil. Do you see it?",
          "Ali says, Look at your desk, Nia. Is that a pencil? Nia answers, No, that is a pen. My pencil is wood, not plastic.",
        ],
        [
          "Ali finds it. Your pencil is inside the pencil case, under the book! Nia says, Thank you, Ali! Now I can draw again.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Classroom Objects",
      pengantar:
        "Kenali benda di tas dan ruang kelas. This is untuk benda dekat. That is untuk benda yang lebih jauh.",
      labelDaftar: "Book, pencil, eraser, ruler, bag, desk, this, that",
      kolom: 1,
      item: [
        {
          nama: "School things",
          singkat: "Nama benda",
          uraian:
            "Book = buku. Pencil = pensil. Eraser = penghapus. Ruler = penggaris. Bag = tas. Desk = meja tulis.",
          contoh: "This is a book. This is an eraser.",
        },
        {
          nama: "This and that",
          singkat: "Dekat dan jauh",
          uraian:
            "This is a book: benda dekat, bisa dekat tangan. That is a whiteboard: benda lebih jauh, misalnya di dinding kelas.",
          contoh: "This is my bag. That is a whiteboard.",
        },
        {
          nama: "Need the right tool",
          singkat: "Pilih benda yang tepat",
          uraian:
            "Coretan salah di buku dibersihkan dengan eraser, bukan ruler. Ruler untuk garis lurus. Pencil case untuk menyimpan alat tulis kecil.",
          contoh: "I need an eraser.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Eraser artinya apa?",
          alias: ["penghapus", "hapus"],
        },
        {
          pertanyaan: "2. This dipakai jika benda... (dekat / jauh)",
          alias: ["dekat", "near", "tangan", "close"],
        },
        {
          pertanyaan: "3. That is a whiteboard. Whiteboard artinya?",
          alias: ["papan", "papan tulis", "whiteboard"],
        },
      ],
      voice: [
        [
          "Book is buku. Pencil is pensil. Eraser is penghapus. Ruler is penggaris. Bag is tas. Desk is meja tulis.",
        ],
        [
          "Say This is a book when it is near you. Say That is a whiteboard when it is farther away. To clean wrong writing, you need an eraser.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Point and Name",
      pengantar:
        "Latih this dan that dengan menunjuk benda nyata. Guru menata meja kelas. Orang tua memakai benda di rumah.",
      labelDaftar: "Menunjuk benda dekat dan jauh",
      kolom: 2,
      item: [
        {
          nama: "Desk hunt",
          singkat: "Untuk guru",
          uraian:
            "Sembunyikan pencil, eraser, dan ruler. Siswa berkata This is a... saat menemukan benda dekat. Tunjuk papan: That is a whiteboard. Tanyakan: kapan kita memakai this?",
          contoh: "This is a pencil. That is a whiteboard.",
        },
        {
          nama: "Bag at home",
          singkat: "Untuk orang tua",
          uraian:
            "Buka tas. Anak mengangkat buku dekat wajah: This is a book. Tunjuk pintu yang jauh: That is a door. Ulangi nama: bag, pencil, eraser.",
          contoh: "This is my bag.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Ruler artinya apa?",
          alias: ["penggaris", "garis"],
        },
        {
          pertanyaan: "2. Bag artinya apa?",
          alias: ["tas"],
        },
        {
          pertanyaan: "3. Desk artinya apa?",
          alias: ["meja", "meja tulis"],
        },
      ],
      voice: [
        [
          "At school, find a pencil near your hand and say This is a pencil. Point to the board and say That is a whiteboard.",
        ],
        [
          "At home, open the bag. Hold a book and say This is a book. Point to a far door and say That is a door.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Varied Evaluation",
      pengantar:
        "Pilih benda yang tepat untuk menghapus tulisan salah, lalu tentukan arti This pada kalimat Ali.",
      labelDaftar: "Analytical context: eraser dan this",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Analytical context",
          uraian:
            "Tulisan salah di buku dibersihkan dengan eraser. This is my bag artinya tas itu dekat Ali, dekat tangannya.",
          contoh: "Eraser. This = near.",
        },
        {
          nama: "Ingat this dan that",
          singkat: "Jarak benda",
          uraian:
            "This = dekat. That = lebih jauh. Jangan memakai this untuk benda di pohon yang sangat jauh atau di kelas lain.",
          contoh: "This is near. That is far.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Untuk menghapus coretan salah, kita butuh...?",
          alias: ["eraser", "penghapus"],
        },
        {
          pertanyaan: "2. This is my bag. Tas itu posisinya...?",
          alias: ["dekat", "near", "tangan", "close"],
        },
      ],
      voice: [
        [
          "To clean wrong writing on your book, you need an eraser, not a ruler.",
        ],
        [
          "When Ali says This is my bag, the bag is near him, close to his hand.",
        ],
      ],
    },
  ],
};
