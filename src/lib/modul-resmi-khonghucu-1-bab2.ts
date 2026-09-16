import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_KHONGHUCU1_BAB2 = "Bab 2: Indahnya Laku Bakti di Rumah";

export const MODUL_KHONGHUCU1_BAB2: ModulResmiPai = {
  id: "khonghucu-1-bab2",
  judul: JUDUL_KHONGHUCU1_BAB2,
  pola: /laku bakti|nilai xiao|indahnya laku|kitab suci ru/,
  motivasi:
    "Xiao adalah akar segala kebajikan. Bawa piring tanpa diminta, rapikan sepatu, dengar nasihat Ayah, jangan tidur larut main game. Rumah yang rukun diberkahi Tian.",
  kunciJawaban: "B,C,A,B,A,B,C,A,B,B",
  sketsaKartu: [
    "Nia membawa piring kotor ke dapur setelah makan malam tanpa diminta.",
    "Anak merapikan sepatu sekolah di rak setelah pulang.",
    "Anak mendengarkan nasihat Ayah dengan tenang.",
    "Keluarga Nia rukun di meja makan yang bersih.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Sebab: Nia selalu menyapa orang tuanya dengan hormat setiap pagi dan rajin membantu membersihkan meja makan. Akibat yang terwujud di dalam rumah Nia adalah...
A) Suasana rumah menjadi sepi karena tidak ada yang berteriak.
B) Hubungan keluarga menjadi sangat harmonis, penuh kasih sayang, dan diberkahi Huang Tian.
C) Ibu Nia akan membelikan semua toko mainan untuk Nia.
D) Nia boleh tidur larut main game.`,
    `[Soal 2 - PG - Tipe: HOTS]
Jika kita sering bertengkar dan berebut mainan dengan adik, hati orang tua menjadi...
A) Gembira.
B) Bangga tanpa sedih.
C) Sedih atau kecewa.
D) Tidak peduli.`,
    `[Soal 3 - PG - Tipe: Reguler]
Xiao adalah akar dari semua...
A) Kebajikan atau perbuatan baik.
B) Permainan.
C) Hadiah.
D) Pertengkaran.`,
    `[Soal 4 - PG - Tipe: HOTS]
Mendengarkan dengan tenang saat Ayah memberi nasihat belajar...
A) Bukan laku bakti.
B) Termasuk perwujudan Xiao.
C) Hanya tugas Ibu.
D) Membuang waktu.`,
    `[Soal 5 - PG - Tipe: HOTS]
Tidur larut malam sambil bermain game hingga besok terlambat bangun...
A) Bukan laku bakti.
B) Termasuk Xiao.
C) Wajib setiap malam.
D) Membawa berkah.`,
    `[Soal 6 - PG - Tipe: HOTS]
Merapikan sepatu sekolah di rak setelah pulang...
A) Bukan bakti.
B) Termasuk Xiao, meringankan beban orang tua.
C) Tugas adik saja.
D) Hanya jika ada hadiah.`,
    `[Soal 7 - PG - Tipe: Reguler]
Junzi kecil di rumah berarti...
A) Manja dan menunggu dilayani.
B) Tidur larut.
C) Mandiri merapikan mainan, patuh pada nasihat baik, dan menjaga kasih saudara (Ti).
D) Berebut mainan setiap malam.`,
    `[Soal 8 - PG - Tipe: Reguler]
Konfusius mengajarkan pendidikan moral anak dimulai dari...
A) Rumah, melalui bakti kepada orang tua.
B) Toko mainan.
C) Game saja.
D) Bertengkar dulu.`,
    `[Soal 9 - PG - Tipe: Reguler]
Setelah makan malam, Nia membawa piring kotor ke dapur...
A) Karena lelah dan terpaksa.
B) Sebagai wujud Xiao, tanpa diminta.
C) Agar mendapat semua toko mainan.
D) Supaya rumah sepi.`,
    `[Soal 10 - PG - Tipe: Reguler]
Menjaga kerukunan dengan adik, bicara lembut, dan rajin belajar adalah cara...
A) Menghindar dari orang tua.
B) Berbakti yang membawa berkah kebahagiaan bagi seluruh rumah.
C) Tidur larut.
D) Berebut mainan.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Piring ke Dapur tanpa Diminta",
      pengantar:
        "Di ruang tengah rumah Nia setelah makan malam bersama.",
      labelDaftar: "Percakapan Ali dan Nia tentang Xiao",
      kolom: 1,
      item: [
        {
          nama: "Bawa piring",
          singkat: "Tanpa diminta",
          uraian:
            "Nia langsung membantu Ibu membawa piring kotor ke dapur. Ia tidak lelah, karena ini wujud Xiao, laku bakti kepada orang tua.",
          contoh: "Bawa piring. Jangan ditunggu perintah.",
        },
        {
          nama: "Balas kasih",
          singkat: "Ayah dan Ibu bekerja keras",
          uraian:
            "Ayah dan Ibu sudah merawat kita dengan cinta kasih. Bakti adalah cara kita membalas dengan perbuatan, bukan hanya kata.",
          contoh: "Mereka merawat. Kita membantu.",
        },
        {
          nama: "Rumah yang berkah",
          singkat: "Patuh dan rukun",
          uraian:
            "Menjaga kerukunan dengan adik, berbicara lembut, dan rajin belajar adalah cara berbakti. Anak yang mengamalkan Xiao membawa kebahagiaan bagi seluruh rumah.",
          contoh: "Rukun. Lembut. Rajin belajar.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Laku bakti kepada orang tua disebut...?",
          alias: ["xiao"],
        },
        {
          pertanyaan: "2. Nia membawa... kotor ke dapur tanpa diminta?",
          alias: ["piring"],
        },
        {
          pertanyaan: "3. Anak yang mengamalkan Xiao membawa... bagi rumah?",
          alias: ["berkah", "kebahagiaan", "rukun"],
        },
      ],
      voice: [
        [
          "Setelah makan, Nia membawa piring ke dapur tanpa diminta. Itu Xiao, laku bakti kepada orang tua.",
        ],
        [
          "Ayah dan Ibu merawat kita. Kita berbakti dengan rukun, bicara lembut, dan rajin belajar.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Xiao, Ti, dan Junzi Kecil",
      pengantar:
        "Xiao adalah akar segala kebajikan. Di rumah, anak kelas 1 belajar mandiri, patuh, dan menyayangi saudara.",
      labelDaftar: "Hakikat Xiao dan laku di rumah",
      kolom: 1,
      item: [
        {
          nama: "Akar kebajikan",
          singkat: "Mulai dari rumah",
          uraian:
            "Konfusius mengajarkan: mendidik moral anak dimulai dari rumah melalui bakti kepada orang tua. Xiao adalah akar semua kebajikan dan perbuatan baik.",
          contoh: "Rumah dulu. Bakti dulu. Akar baik.",
        },
        {
          nama: "Junzi kecil",
          singkat: "Mandiri dan patuh",
          uraian:
            "Merapikan mainan sendiri, merapikan sepatu di rak, mendengarkan nasihat Ayah. Bukan tidur larut main game hingga terlambat bangun.",
          contoh: "Rapikan. Dengar nasihat. Jangan larut game.",
        },
        {
          nama: "Ti dan rumah harmonis",
          singkat: "Kasih saudara",
          uraian:
            "Jangan bertengkar dan berebut mainan: hati orang tua menjadi sedih atau kecewa. Sapa hormat setiap pagi dan bersihkan meja: rumah harmonis, penuh kasih, diberkahi Huang Tian. Bukan sepi, bukan toko mainan.",
          contoh: "Jangan rebut. Sapa. Bersihkan meja.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Xiao adalah akar dari semua...?",
          alias: ["kebajikan", "baik"],
        },
        {
          pertanyaan: "2. Bertengkar dengan adik membuat hati orang tua...?",
          alias: ["sedih", "kecewa"],
        },
        {
          pertanyaan: "3. Sapa hormat dan bersihkan meja membuat rumah...?",
          alias: ["harmonis", "rukun", "berkah"],
        },
      ],
      voice: [
        [
          "Xiao adalah akar segala kebajikan. Rapikan sepatu, dengar nasihat, jangan tidur larut main game.",
        ],
        [
          "Berebut mainan membuat orang tua sedih. Sapa hormat dan bersihkan meja: rumah harmonis, diberkahi Tian.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Bakti di Sekolah dan di Rumah",
      pengantar:
        "Xiao dilatih saat pulang sekolah dan setelah makan. Guru memandu. Orang tua menemani.",
      labelDaftar: "Latihan Xiao dan Ti",
      kolom: 2,
      item: [
        {
          nama: "Centang bakti",
          singkat: "Untuk guru",
          uraian:
            "Centang mana yang Xiao: dengar nasihat Ayah dan rapikan sepatu. Jangan centang tidur larut main game. Diskusikan akibat rumah yang rukun.",
          contoh: "Centang bakti. Jangan centang game larut.",
        },
        {
          nama: "Piring dan adik",
          singkat: "Untuk orang tua",
          uraian:
            "Ajak anak membawa piring tanpa diminta. Jika berebut mainan, tanyakan: bagaimana hati Ayah dan Ibu? Puji proses, bukan janji toko mainan.",
          contoh: "Bawa piring. Jangan rebut. Puji proses.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Merapikan sepatu setelah pulang: Xiao atau bukan?",
          alias: ["xiao", "bakti", "ya"],
        },
        {
          pertanyaan: "2. Tidur larut main game: termasuk bakti atau bukan?",
          alias: ["bukan", "tidak"],
        },
        {
          pertanyaan: "3. Xiao adalah akar semua...?",
          alias: ["kebajikan", "baik"],
        },
      ],
      voice: [
        [
          "Di kelas, centang: dengar nasihat dan rapikan sepatu. Jangan centang tidur larut main game.",
        ],
        [
          "Di rumah, bawa piring tanpa diminta. Jangan berebut mainan. Itu Xiao yang membuat rumah bahagia.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Centang tindakan Xiao, lengkapi akibat bertengkar dan arti Xiao, lalu pilih akibat rumah yang rukun.",
      labelDaftar: "Centang, isian, dan sebab-akibat",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Centang Xiao",
          uraian:
            "Yang benar: mendengarkan nasihat Ayah dengan tenang, dan merapikan sepatu di rak. Tidur larut main game bukan Xiao.",
          contoh: "Dengar. Rapikan sepatu. Bukan game larut.",
        },
        {
          nama: "Kelompok B dan C",
          singkat: "Sedih dan harmonis",
          uraian:
            "Berebut mainan: hati orang tua sedih atau kecewa. Xiao akar semua kebajikan. Akibat sapa hormat dan bersihkan meja: rumah harmonis, penuh kasih, diberkahi Huang Tian.",
          contoh: "Sedih. Kebajikan. Rumah harmonis.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Xiao: dengar nasihat dan rapikan sepatu, bukan tidur larut...?",
          alias: ["game", "bermain"],
        },
        {
          pertanyaan: "2. Berebut mainan: hati orang tua... atau kecewa?",
          alias: ["sedih", "kecewa"],
        },
        {
          pertanyaan: "3. Xiao adalah akar semua...?",
          alias: ["kebajikan", "baik"],
        },
        {
          pertanyaan: "4. Rumah Nia menjadi... dan diberkahi Tian?",
          alias: ["harmonis", "rukun", "kasih"],
        },
      ],
      voice: [
        [
          "Centang Xiao: dengar nasihat Ayah dan rapikan sepatu. Jangan centang tidur larut main game.",
        ],
        [
          "Berebut mainan membuat orang tua sedih. Xiao akar kebajikan. Rumah Nia harmonis dan diberkahi Tian.",
        ],
      ],
    },
  ],
};
