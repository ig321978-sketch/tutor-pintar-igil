import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_KHONGHUCU1_BAB1 = "Bab 1: Aku Karunia Tian";

export const MODUL_KHONGHUCU1_BAB1: ModulResmiPai = {
  id: "khonghucu-1-bab1",
  judul: JUDUL_KHONGHUCU1_BAB1,
  pola: /aku karunia tian|watak sejati|tian yang esa/,
  motivasi:
    "Tian menanam Watak Sejati yang baik sejak lahir. Ren, Yi, Li, dan Zhi adalah benih yang harus disiram setiap hari. Jujur menasihati teman, sopan di depan guru, dan menyayangi makhluk.",
  kunciJawaban: "B,B,B,A,C,B,A,B,C,A",
  sketsaKartu: [
    "Ali dan Nia menggambar pohon besar dikelilingi bunga di kelas seni.",
    "Anak menasihati Tono agar jujur meminta maaf kepada Made.",
    "Anak mengucapkan permisi dan membungkuk di depan guru.",
    "Anak menyayangi kucing jalanan yang kelaparan.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Saat jam istirahat, kamu melihat Tono tidak sengaja merobek kertas gambar milik Made. Tono ketakutan. Tindakan yang mencerminkan sifat Yi (Kebenaran/Keadilan) pada dirimu adalah...
A) Menyembunyikan buku Made agar Made tidak tahu kertasnya robek.
B) Menasihati Tono dengan lembut agar berani jujur mengaku dan meminta maaf kepada Made, serta ikut membantu menempel kembali kertas yang robek.
C) Menyoraki Tono agar dimarahi oleh Ibu Guru.
D) Diam saja agar tidak ikut campur.`,
    `[Soal 2 - PG - Tipe: HOTS]
Watak sejati yang diberikan oleh Tian kepada setiap manusia sejak lahir adalah...
A) Buruk dan suka bertengkar.
B) Baik, mulia, dan penuh dengan benih kebajikan.
C) Kosong seperti kertas putih tanpa arti.
D) Hanya milik orang dewasa.`,
    `[Soal 3 - PG - Tipe: HOTS]
Mengucapkan permisi dan membungkuk sedikit saat berjalan di depan Ibu Guru yang sedang duduk adalah wujud...
A) Yi semata.
B) Li, yaitu kesusilaan dan sopan santun.
C) Marah-marah.
D) Pelit.`,
    `[Soal 4 - PG - Tipe: Reguler]
Ren (Cinta Kasih) dicontohkan dengan...
A) Menyayangi kucing jalanan yang kelaparan.
B) Menyoraki teman yang salah.
C) Menyembunyikan kertas yang robek.
D) Marah-marah setiap hari.`,
    `[Soal 5 - PG - Tipe: Reguler]
Yi (Kebenaran) dicontohkan dengan...
A) Menghormati orang tua dengan tutur santun saja.
B) Menyayangi hewan saja.
C) Berani mengakui kesalahan dengan jujur.
D) Diam saat melihat kecurangan.`,
    `[Soal 6 - PG - Tipe: Reguler]
Li (Kesusilaan) dicontohkan dengan...
A) Menyoraki teman.
B) Menghormati orang tua dan guru dengan tutur kata santun.
C) Menyembunyikan kesalahan.
D) Bertengkar di kelas seni.`,
    `[Soal 7 - PG - Tipe: Reguler]
Zhi (Bijaksana) artinya...
A) Bisa membedakan perbuatan yang benar dan yang salah.
B) Selalu marah.
C) Pelit pada teman.
D) Tidak perlu belajar.`,
    `[Soal 8 - PG - Tipe: HOTS]
Mengapa kadang ada anak yang suka marah-marah atau pelit, padahal watak sejati sudah baik?
A) Karena Tian menciptakan mereka buruk.
B) Karena benih kebaikan tidak dirawat, seperti tanaman yang tidak disiram.
C) Karena kertas gambar selalu kosong.
D) Karena tidak boleh belajar.`,
    `[Soal 9 - PG - Tipe: Reguler]
Ren Zhi Chu, Xing Ben Shan mengajarkan bahwa manusia lahir...
A) Jahat.
B) Kosong.
C) Sebagai makhluk yang baik.
D) Tanpa watak.`,
    `[Soal 10 - PG - Tipe: Reguler]
Hati terasa sejuk dan gembira saat berbagi kue atau meminjamkan pensil karena...
A) Tian menanamkan Watak Sejati yang baik di dalam hati.
B) Kue selalu manis.
C) Pensil selalu baru.
D) Kita ingin dipuji saja.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Benih Kebaikan di Kelas Seni",
      pengantar:
        "Di dalam kelas seni. Ali dan Nia menggambar pohon besar yang dikelilingi bunga.",
      labelDaftar: "Percakapan Ali dan Nia tentang Watak Sejati",
      kolom: 1,
      item: [
        {
          nama: "Hati yang sejuk",
          singkat: "Saat berbuat baik",
          uraian:
            "Setiap kali kita berbagi kue atau meminjamkan pensil, hati terasa sejuk dan gembira. Itu tanda Tian sudah menanam Watak Sejati yang baik sejak lahir.",
          contoh: "Bagi. Pinjamkan. Hati gembira.",
        },
        {
          nama: "Benih dari Tian",
          singkat: "Watak Sejati",
          uraian:
            "Kita dilahirkan dengan benih kebaikan. Tidak ada manusia yang lahir tanpa karunia Tian.",
          contoh: "Lahir sudah ada benih baik.",
        },
        {
          nama: "Harus disiram",
          singkat: "Belajar setiap hari",
          uraian:
            "Anak yang marah-marah atau pelit sedang malas merawat benih baiknya. Seperti tanaman, jika tidak disiram, ia tidak tumbuh. Kita harus terus belajar agar benih mekar sempurna.",
          contoh: "Siram benih. Jangan malas.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Watak Sejati ditanam oleh...?",
          alias: ["tian", "tuhan"],
        },
        {
          pertanyaan: "2. Kita lahir dengan benih...?",
          alias: ["kebaikan", "baik"],
        },
        {
          pertanyaan: "3. Benih baik harus... seperti tanaman?",
          alias: ["disiram", "dirawat", "belajar"],
        },
      ],
      voice: [
        [
          "Ali dan Nia menggambar pohon di kelas seni. Hati sejuk saat berbagi karena Tian menanam Watak Sejati yang baik.",
        ],
        [
          "Anak yang marah atau pelit sedang malas merawat benihnya. Siram dengan belajar, supaya kebaikan mekar.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Xing, Ren, Yi, Li, dan Zhi",
      pengantar:
        "Watak Sejati manusia mulia. Empat kebajikan dasar: cinta kasih, kebenaran, kesusilaan, dan bijaksana.",
      labelDaftar: "Watak Sejati dan empat pilar",
      kolom: 1,
      item: [
        {
          nama: "Xing",
          singkat: "Watak Sejati",
          uraian:
            "Tian menciptakan manusia dengan watak mulia dan penuh kebajikan. Ren Zhi Chu, Xing Ben Shan: manusia lahir sebagai makhluk yang baik, bukan kertas kosong, bukan watak buruk.",
          contoh: "Lahir baik. Bukan kosong. Bukan jahat.",
        },
        {
          nama: "Ren dan Yi",
          singkat: "Kasih dan jujur",
          uraian:
            "Ren: empati, menyayangi keluarga, teman, dan hewan. Yi: berani jujur, membela yang benar, tidak curang. Jika Tono merobek kertas Made, nasihatilah ia mengaku dan bantu tempel kembali.",
          contoh: "Sayangi. Jujur. Bantu tempel.",
        },
        {
          nama: "Li dan Zhi",
          singkat: "Sopan dan bijak",
          uraian:
            "Li: sopan santun, hormat guru dan orang tua, tata krama. Permisi dan membungkuk di depan guru adalah Li. Zhi: membedakan yang benar dan yang salah.",
          contoh: "Permisi. Bungkuk. Bedakan benar-salah.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Watak sejati sejak lahir: baik atau buruk?",
          alias: ["baik", "mulia"],
        },
        {
          pertanyaan: "2. Menasihati Tono agar jujur termasuk...?",
          alias: ["yi", "kebenaran", "jujur"],
        },
        {
          pertanyaan: "3. Permisi di depan guru termasuk...?",
          alias: ["li", "sopan", "kesusilaan"],
        },
      ],
      voice: [
        [
          "Tian memberi Watak Sejati yang baik. Ren menyayangi, Yi jujur, Li sopan, Zhi membedakan benar dan salah.",
        ],
        [
          "Tono merobek kertas: nasihatilah ia jujur dan bantu tempel. Di depan guru: ucapkan permisi dan membungkuk.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Menyiram Benih di Sekolah dan di Rumah",
      pengantar:
        "Watak Sejati dilatih saat kertas robek dan saat berjalan di depan orang tua. Guru memandu. Orang tua menemani.",
      labelDaftar: "Latihan empat kebajikan",
      kolom: 2,
      item: [
        {
          nama: "Kertas yang robek",
          singkat: "Untuk guru",
          uraian:
            "Simulasikan kertas gambar yang robek. Siapa yang menyoraki, siapa yang menasihati jujur? Jodohkan Ren, Yi, dan Li dengan contoh nyata.",
          contoh: "Nasihati. Jodohkan. Jangan soraki.",
        },
        {
          nama: "Permisi di rumah",
          singkat: "Untuk orang tua",
          uraian:
            "Latih anak mengucapkan permisi dan membungkuk saat lewat di depan orang tua. Ajak menyayangi hewan di sekitar rumah sebagai Ren.",
          contoh: "Permisi. Bungkuk. Sayangi hewan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Kertas robek: kita menasihati jujur atau menyoraki?",
          alias: ["nasihati", "jujur", "yi"],
        },
        {
          pertanyaan: "2. Di depan guru: kita mengucapkan...?",
          alias: ["permisi", "li"],
        },
        {
          pertanyaan: "3. Menyayangi kucing lapar termasuk...?",
          alias: ["ren", "kasih", "cinta"],
        },
      ],
      voice: [
        [
          "Di kelas, latih Yi: nasihatilah teman yang merobek kertas agar jujur, lalu bantu tempel.",
        ],
        [
          "Di rumah, latih Li: permisi dan membungkuk. Latih Ren: sayangi hewan yang lapar.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih Yi saat kertas robek dan arti Watak Sejati, tentukan benar-salah tentang Li, lalu jodohkan Ren, Yi, dan Li.",
      labelDaftar: "Pilihan, benar-salah, dan mencocokkan garis",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Yi dan Watak Sejati",
          uraian:
            "Yi: nasihati Tono jujur dan bantu tempel kertas. Watak Sejati: baik, mulia, penuh benih kebajikan. Bukan menyembunyikan, menyoraki, watak buruk, atau kertas kosong.",
          contoh: "Nasihati jujur. Watak baik.",
        },
        {
          nama: "Kelompok B dan C",
          singkat: "Li dan jodoh kebajikan",
          uraian:
            "Permisi dan membungkuk di depan guru adalah Li, benar. Ren: menyayangi kucing lapar. Yi: berani mengakui kesalahan. Li: menghormati orang tua dengan tutur santun.",
          contoh: "Benar Li. Ren-kasih. Yi-jujur. Li-sopan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Tono merobek kertas: kita menasihati ia... dan bantu tempel?",
          alias: ["jujur", "yi", "maaf"],
        },
        {
          pertanyaan: "2. Watak sejati sejak lahir: baik, mulia, dan penuh...?",
          alias: ["kebajikan", "baik", "benih"],
        },
        {
          pertanyaan: "3. Permisi dan membungkuk di depan guru: termasuk Li, benar atau salah?",
          alias: ["benar"],
        },
        {
          pertanyaan: "4. Menyayangi kucing lapar termasuk Ren, Yi, atau Li?",
          alias: ["ren", "kasih"],
        },
      ],
      voice: [
        [
          "Tono merobek kertas Made: nasihati ia jujur, minta maaf, dan bantu tempel. Itu Yi.",
        ],
        [
          "Watak Sejati baik dan mulia. Permisi di depan guru adalah Li. Ren menyayangi, Yi jujur, Li sopan.",
        ],
      ],
    },
  ],
};
