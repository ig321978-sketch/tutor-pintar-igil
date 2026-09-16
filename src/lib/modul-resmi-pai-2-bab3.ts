import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_PAI2_BAB3 = "Bab 3: Ayo Berperilaku Terpuji";

export const MODUL_PAI2_BAB3: ModulResmiPai = {
  id: "pai-2-bab3",
  judul: JUDUL_PAI2_BAB3,
  pola: /ayo berperilaku|kasih sayang dan sopan|bersaudara/,
  motivasi:
    "Ukhuwah: berbagi, menolong, jangan mengejek suku. 5S: Senyum, Sapa, Salam, Sopan, Santun. Ridha Allah pada ridha orang tua. Hormat guru membuat ilmu berkah.",
  kunciJawaban: "B,B,S,B,A,B,C,A,B,B",
  sketsaKartu: [
    "Anak berbagi bekal dan menolong teman berbeda suku.",
    "Anak mencium tangan orang tua dan menyimak guru dengan 5S.",
    "Anak membedakan akhlak terpuji dan tercela.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Ketika bel istirahat berbunyi, Tono melihat bekal makanan milik Made tertinggal di rumah. Sikap terpuji yang mencerminkan rasa kasih sayang bersaudara adalah...
A) Memakan bekal sendiri di pojok kelas agar tidak ketahuan Made.
B) Menghampiri Made dan mengajaknya berbagi makanan bersama dengan gembira.
C) Mengejek Made karena pelupa.
D) Diam saja di kantin.`,
    `[Soal 2 - PG - Tipe: HOTS]
Saat Ibu Guru sedang menjelaskan materi di depan kelas, tindakan sopan santun yang wajib dilakukan siswa kelas 2 adalah...
A) Mengobrol dengan teman sebangku membahas mainan baru.
B) Duduk dengan rapi, menyimak penjelasan guru dengan tenang, dan tidak membuat gaduh.
C) Menggambar di buku tulis tanpa memperhatikan papan tulis.
D) Berteriak minta izin keluar tanpa angkat tangan.`,
    `[Soal 3 - PG - Tipe: HOTS]
Kita boleh berbicara keras dan membentak orang tua jika keinginan tidak dituruti. Pernyataan ini...
A) Benar.
B) Salah; anak terpuji berbicara lembut dan patuh.
C) Benar hanya pada hari libur.
D) Tidak ada hubungannya dengan 5S.`,
    `[Soal 4 - PG - Tipe: HOTS]
Menjaga kerukunan antar teman termasuk meneladani akhlak Rasulullah SAW. Pernyataan ini...
A) Salah.
B) Benar; Rasul menyayangi saudara seperti diri sendiri.
C) Benar hanya untuk satu suku.
D) Hanya untuk di rumah.`,
    `[Soal 5 - PG - Tipe: Reguler]
Mencium tangan Ayah sebelum pergi termasuk...
A) Sopan santun kepada orang tua.
B) Perilaku tercela.
C) Sopan santun kepada guru saja.
D) Mengejek nama.`,
    `[Soal 6 - PG - Tipe: Reguler]
Mengangkat tangan sebelum bertanya termasuk...
A) Mengejek teman.
B) Sopan santun kepada guru.
C) Bentak orang tua.
D) Mazmumah.`,
    `[Soal 7 - PG - Tipe: Reguler]
Mengejek nama orang tua teman termasuk...
A) Akhlak terpuji.
B) 5S.
C) Perilaku tercela atau Mazmumah.
D) Birrul walidain.`,
    `[Soal 8 - PG - Tipe: Reguler]
Hormat dan patuh kepada orang tua disebut...
A) Birrul walidain.
B) Mazmumah.
C) Khalik.
D) Khannas.`,
    `[Soal 9 - PG - Tipe: HOTS]
Menghormati guru penting karena...
A) Supaya boleh gaduh.
B) Ilmu menjadi berkah dan bermanfaat, belajar lebih berhasil.
C) Supaya tidak perlu menyimak.
D) Supaya boleh membentak di rumah.`,
    `[Soal 10 - PG - Tipe: Reguler]
Rumus 5S adalah...
A) Sepeda, Soto, Sate, Susu, Semangka.
B) Senyum, Sapa, Salam, Sopan, Santun.
C) Setan, Salah, Sedih, Sompong, Sombong.
D) Siku, Kepala, Kaki, Wajah, Telinga.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Indahnya Bersaudara",
      pengantar:
        "Infografis: semua muslim bersaudara. Aksi nyata: berbagi makanan, menolong yang jatuh, jangan mengejek suku atau kulit. Hadis: sayangi saudara seperti diri sendiri.",
      labelDaftar: "Ukhuwah Islamiyah dan aksi kasih",
      kolom: 1,
      item: [
        {
          nama: "Satu tubuh",
          singkat: "Ukhuwah Islamiyah",
          uraian:
            "Jika tangan kanan terluka, tangan kiri menolong. Sesama muslim seperti satu tubuh. Kita gembira saat teman gembira, dan membantu saat ia kesusahan.",
          contoh: "Teman susah? Kita bantu.",
        },
        {
          nama: "Aksi nyata",
          singkat: "Berbagi, tolong, jangan ejek",
          uraian:
            "Bagi bekal saat istirahat. Tolong teman yang jatuh dari sepeda. Jangan pilih-pilih teman karena suku atau bentuk fisik. Di hadapan Allah, yang mulia adalah yang bertakwa.",
          contoh: "Bagi. Tolong. Jangan ejek.",
        },
        {
          nama: "Pesan Nabi",
          singkat: "Hadis Bukhari",
          uraian:
            "Tidak beriman seseorang di antara kamu sebelum ia menyayangi saudaranya seperti ia menyayangi dirinya sendiri.",
          contoh: "Sayangi teman seperti diri sendiri.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Jika teman sekelas yang berbeda suku kesulitan membawa buku berat, apa yang kamu lakukan sesuai ajaran kasih sayang?",
          alias: ["bantu", "tolong", "angkat", "bawa", "bantu bawa"],
        },
      ],
      kuisTulis: {
        pertanyaan:
          "Menyayangi sesama manusia adalah contoh pengamalan akhlak yang ........................ (Kamil / Terpuji).",
        alias: ["terpuji"],
      },
      voice: [
        [
          "Anak-anak soleh yang berbudi pekerti mulia, coba bayangkan jika tangan kanan kita terluka dan terasa sakit, apakah tangan kiri kita akan diam saja? Tentu tidak. Tangan kiri akan membantu mengobati atau mengelus tangan kanan yang sakit.",
          "Begitulah sesama manusia, terutama sesama muslim, kita adalah satu tubuh yang bersaudara. Allah sangat mencintai anak yang hidup rukun. Menyayangi sesama artinya kita ikut gembira saat teman kita gembira, dan kita ikut membantu saat teman kita sedang kesusahan.",
          "Jangan pernah memilih-milih teman hanya karena perbedaan suku atau bentuk fisik ya, karena di hadapan Allah, anak yang paling mulia adalah anak yang paling bertakwa dan baik akhlaknya!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Tata Krama Anak Hebat, Lima S",
      pengantar:
        "Infografis: di rumah cium tangan dan bicara lembut. Di sekolah ucap salam dan dengar guru. Rumus 5S. Ridha Allah pada ridha orang tua. Hormat guru membuat ilmu berkah.",
      labelDaftar: "Rumah, sekolah, dan 5S",
      kolom: 1,
      item: [
        {
          nama: "Di rumah",
          singkat: "Birrul walidain",
          uraian:
            "Cium tangan Ayah dan Ibu, berbicara lembut, patuh pada nasihat. Jangan membentak jika keinginan belum dituruti.",
          contoh: "Cium tangan. Bicara lembut.",
        },
        {
          nama: "Di sekolah",
          singkat: "Hormat guru",
          uraian:
            "Ucapkan salam, duduk rapi, menyimak, angkat tangan sebelum bertanya, minta izin dengan sopan jika ingin keluar kelas.",
          contoh: "Salam. Simak. Angkat tangan.",
        },
        {
          nama: "Rumus 5S",
          singkat: "Murah dan mudah",
          uraian:
            "Senyum, Sapa, Salam, Sopan, Santun. Anak yang sopan jalannya dimudahkan Allah dan disukai banyak orang. Ilmu dari guru yang dihormati menjadi berkah.",
          contoh: "Senyum. Sapa. Salam. Sopan. Santun.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Bagaimana sikap duduk dan bicaramu yang sopan ketika ingin meminta izin keluar kelas kepada Ibu Guru saat pelajaran berlangsung?",
          alias: ["angkat", "izin", "lembut", "sopan", "duduk", "salam"],
        },
      ],
      kuisTulis: {
        pertanyaan: "Hormat dan patuh kepada orang tua di dalam Islam disebut dengan istilah Birrul ........................",
        alias: ["walidain", "walidain"],
      },
      voice: [
        [
          "Anak-anak kelas 2 yang hebat, siapa orang yang paling berjasa merawat kita sejak bayi dengan penuh kesabaran? Ya, Ayah dan Ibu di rumah. Lalu, siapa orang yang membimbing kita dengan sabar di sekolah hingga kita bisa membaca dan berhitung? Benar, Bapak dan Ibu Guru.",
          "Mereka semua adalah orang tua kita yang wajib kita hormati. Sopan santun itu murah dan mudah, lho! Caranya adalah dengan menerapkan rumus 5S: Senyum, Sapa, Salam, Sopan, dan Santun.",
          "Berbicaralah dengan suara yang lembut, jangan memotong pembicaraan mereka, dan ciumlah tangan mereka dengan takzim. Anak yang sopan jalannya akan dimudahkan oleh Allah dan disukai oleh semua orang.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih berbagi bekal dan menyimak guru, tentukan benar-salah bentak dan kerukunan, jodohkan perilaku ke akhlak, lalu jelaskan mengapa hormat guru membuat ilmu berkah.",
      labelDaftar: "Pilihan, benar-salah, mencocokkan, dan esai",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A dan B",
          singkat: "Bagi dan simak",
          uraian:
            "Made lupa bekal: hampiri dan berbagi. Saat guru menjelaskan: duduk rapi dan menyimak. Membentak orang tua: salah. Kerukunan meneladani Rasul: benar.",
          contoh: "Bagi. Simak. Jangan bentak.",
        },
        {
          nama: "Kelompok C dan D",
          singkat: "Jodoh dan berkah ilmu",
          uraian:
            "Cium tangan Ayah: sopan ke orang tua. Angkat tangan: sopan ke guru. Ejek nama orang tua: tercela. Hormat guru: ilmu berkah dan belajar berhasil.",
          contoh: "Orang tua. Guru. Tercela. Ilmu berkah.",
        },
      ],
      kuis: [
        { pertanyaan: "Made lupa bekal: kita?", alias: ["bagi", "berbagi"] },
        { pertanyaan: "Guru menjelaskan: kita?", alias: ["simak", "rapi"] },
        { pertanyaan: "Boleh membentak orang tua?", alias: ["salah", "tidak"] },
        { pertanyaan: "Rukun meneladani Rasul?", alias: ["benar"] },
        { pertanyaan: "Cium tangan Ayah: sopan kepada?", alias: ["orang tua", "ayah"] },
        { pertanyaan: "Hormat guru membuat ilmu?", alias: ["berkah", "manfaat"] },
      ],
      voice: [
        [
          "Berbagi bekal adalah kasih sayang. Menyimak guru adalah sopan santun. Jangan membentak orang tua.",
        ],
        [
          "Cium tangan Ayah, angkat tangan sebelum bertanya, jangan mengejek. Hormat guru membuat ilmu berkah.",
        ],
      ],
    },
  ],
};
