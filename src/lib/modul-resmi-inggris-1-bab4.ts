import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_INGGRIS1_BAB4 = "Unit 4: Rainbow Colors";

export const MODUL_INGGRIS1_BAB4: ModulResmiPai = {
  id: "inggris-1-bab4",
  judul: JUDUL_INGGRIS1_BAB4,
  pola: /rainbow colors|mengenal warna|warna benda|colors vocabulary/,
  motivasi:
    "Name the colors you see: yellow sun, green grass, blue sky. Say color then thing: a red balloon.",
  kunciJawaban: "B,B,A,C,B,A,C,B,A,B",
  sketsaKartu: [
    "Ali dan Nia di taman sekolah, matahari kuning, rumput hijau, sepatu hitam dan putih.",
    "Warna red blue green yellow black white dan frasa color plus noun.",
    "Anak menamai warna benda di sekolah serta di rumah.",
    "Siswa melengkapi warna langit dan mencampur merah-kuning menjadi oranye.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Complete this natural sentence: "The sky on a sunny day is usually ........, and the cloud is white."
A) Red
B) Blue
C) Black
D) Green`,
    `[Soal 2 - PG - Tipe: HOTS]
You mix red paint and yellow paint together. What new color do you get?
A) Green
B) Orange
C) Purple
D) Black`,
    `[Soal 3 - PG - Tipe: HOTS]
Why do colors make the world not boring, as Nia says?
A) Because different colors help us see and enjoy many things around us.
B) Because we must wear only black every day.
C) Because the sun has no color.
D) Because bags cannot have colors.`,
    `[Soal 4 - PG - Tipe: Reguler]
Green in Indonesian is...
A) Merah
B) Kuning
C) Hijau
D) Hitam`,
    `[Soal 5 - PG - Tipe: Reguler]
A red balloon means...
A) A blue chair.
B) A balloon that is red.
C) A yellow sun.
D) A black shoe.`,
    `[Soal 6 - PG - Tipe: Reguler]
Black is...
A) Hitam.
B) Putih.
C) Biru.
D) Hijau.`,
    `[Soal 7 - PG - Tipe: Reguler]
White is...
A) Merah
B) Kuning
C) Putih
D) Biru`,
    `[Soal 8 - PG - Tipe: Reguler]
The sun in the dialogue is...
A) Blue
B) Yellow
C) Black
D) Purple`,
    `[Soal 9 - PG - Tipe: HOTS]
We say "a blue chair", not "a chair blue", because in English the color usually comes...
A) Before the noun.
B) After a long story only.
C) Never with a noun.
D) Only in Indonesian.`,
    `[Soal 10 - PG - Tipe: Reguler]
Yellow means...
A) Hitam
B) Kuning
C) Putih
D) Merah`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Colors in the School Garden",
      pengantar:
        "Di taman sekolah siang hari. Ali dan Nia melihat matahari, rumput, dan sepatu. Warna membuat dunia indah.",
      labelDaftar: "Yellow sun, green grass, black and white shoes",
      kolom: 1,
      item: [
        {
          nama: "What color is the sun?",
          singkat: "Matahari kuning",
          uraian:
            "Ali: Nia, look at the sky! The sun is so bright. What color is the sun? Nia: The sun is yellow, Ali. And look at the grass, it is green.",
          contoh: "The sun is yellow. The grass is green.",
        },
        {
          nama: "Black and white shoes",
          singkat: "Sepatu berbeda",
          uraian:
            "Ali: Wow, nature is beautiful! My shoes are black, and your shoes are white.",
          contoh: "My shoes are black. Your shoes are white.",
        },
        {
          nama: "Colors are not boring",
          singkat: "Dunia berwarna",
          uraian:
            "Nia: Yes! Colors make our world beautiful and not boring. Banyak warna membantu kita melihat dan menikmati benda di sekitar.",
          contoh: "Colors make our world beautiful.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. What color is the sun?",
          alias: ["yellow", "kuning"],
        },
        {
          pertanyaan: "2. What color is the grass?",
          alias: ["green", "hijau"],
        },
        {
          pertanyaan: "3. Ali's shoes are...?",
          alias: ["black", "hitam"],
        },
      ],
      voice: [
        [
          "In the school garden, Ali says, Look at the sky! The sun is so bright. What color is the sun?",
          "Nia answers, The sun is yellow, Ali. And look at the grass, it is green.",
        ],
        [
          "Ali says, Nature is beautiful! My shoes are black, and your shoes are white. Nia says, Colors make our world beautiful and not boring.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Color Words and Color + Noun",
      pengantar:
        "Hafalkan warna dasar, lalu susun frasa: warna dulu, nama benda kemudian.",
      labelDaftar: "Red, blue, green, yellow, black, white",
      kolom: 1,
      item: [
        {
          nama: "Colors vocabulary",
          singkat: "Enam warna dasar",
          uraian:
            "Red = merah. Blue = biru. Green = hijau. Yellow = kuning. Black = hitam. White = putih.",
          contoh: "Red, blue, green, yellow, black, white.",
        },
        {
          nama: "Color + noun",
          singkat: "Warna lalu benda",
          uraian:
            "A red balloon = sebuah balon merah. A blue chair = sebuah kursi biru. Dalam bahasa Inggris, warna biasanya di depan nama benda.",
          contoh: "A red balloon. A blue chair.",
        },
        {
          nama: "Mix and think",
          singkat: "HOTS warna",
          uraian:
            "Langit cerah biasanya blue, awan white. Campur cat red dan yellow menjadi orange. Green dari blue dan yellow.",
          contoh: "Red and yellow make orange.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Blue artinya apa?",
          alias: ["biru"],
        },
        {
          pertanyaan: "2. A red balloon. Red artinya?",
          alias: ["merah"],
        },
        {
          pertanyaan: "3. White artinya apa?",
          alias: ["putih"],
        },
      ],
      voice: [
        [
          "Red is merah. Blue is biru. Green is hijau. Yellow is kuning. Black is hitam. White is putih.",
        ],
        [
          "Say the color first, then the thing. A red balloon. A blue chair. On a sunny day the sky is usually blue, and the cloud is white. Red and yellow make orange.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Color Walk",
      pengantar:
        "Cari warna di sekitar. Guru menata kertas warna. Orang tua menunjuk benda di rumah.",
      labelDaftar: "Menamai warna benda nyata",
      kolom: 2,
      item: [
        {
          nama: "Rainbow table",
          singkat: "Untuk guru",
          uraian:
            "Taruh balon, kursi mainan, dan kertas. Siswa berkata a red balloon, a blue chair. Tanya: langit cerah biasanya warna apa? Campur cat merah dan kuning.",
          contoh: "A red balloon. A blue chair.",
        },
        {
          nama: "Home colors",
          singkat: "Untuk orang tua",
          uraian:
            "Tunjuk baju, sepatu, dan buah. Ucapkan color + noun: a yellow banana, a white shirt. Lihat langit: The sky is blue.",
          contoh: "A yellow banana. The sky is blue.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Yellow artinya apa?",
          alias: ["kuning"],
        },
        {
          pertanyaan: "2. Black artinya apa?",
          alias: ["hitam"],
        },
        {
          pertanyaan: "3. Green artinya apa?",
          alias: ["hijau"],
        },
      ],
      voice: [
        [
          "At school, hold a balloon and say a red balloon. Point to a chair and say a blue chair.",
        ],
        [
          "At home, find a yellow banana and a white shirt. Look up and say, The sky is blue.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Varied Evaluation",
      pengantar:
        "Lengkapi kalimat tentang langit cerah, lalu pikirkan hasil campur cat merah dan kuning.",
      labelDaftar: "Logic and colors: blue sky, orange paint",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Logic and colors",
          uraian:
            "Langit siang yang cerah biasanya blue, awan white. Red mix yellow = orange, bukan green atau purple.",
          contoh: "Blue sky. Orange paint.",
        },
        {
          nama: "Ingat campuran",
          singkat: "HOTS",
          uraian:
            "Green biasanya dari blue dan yellow. Purple dari red dan blue. Orange dari red dan yellow.",
          contoh: "Red + yellow = orange.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Langit cerah biasanya warna...?",
          alias: ["blue", "biru"],
        },
        {
          pertanyaan: "2. Red plus yellow makes...?",
          alias: ["orange", "oranye", "jingga"],
        },
      ],
      voice: [
        [
          "The sky on a sunny day is usually blue, and the cloud is white.",
        ],
        [
          "If you mix red paint and yellow paint, you get orange.",
        ],
      ],
    },
  ],
};
