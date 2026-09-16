import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_BUDDHA1_BAB4 = "Bab 4: Berbagi Kebaikan Melalui Dana";

export const MODUL_BUDDHA1_BAB4: ModulResmiPai = {
  id: "buddha-1-bab4",
  judul: JUDUL_BUDDHA1_BAB4,
  pola: /berbagi kebaikan|melalui dana|jalan menuju kebahagiaan/,
  motivasi:
    "Dana adalah memberi dengan ikhlas dan gembira. Bukan hanya uang: senyum, pel lantai, mengajari teman, memaafkan. Mengikis serakah. Benih kebaikan berbuah manis.",
  kunciJawaban: "B,A,C,B,A,B,C,A,B,B",
  sketsaKartu: [
    "Made memasukkan uang saku ke kotak dana di vihara, tersenyum.",
    "Anak menyapu vihara dan membagikan senyum.",
    "Anak mengepel lantai koridor yang licin agar tidak ada yang jatuh.",
    "Anak berdana dengan hati gembira, tidak kikir.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Ketika jam istirahat, kamu melihat seorang teman tidak sengaja menumpahkan air minumnya ke lantai koridor hingga licin. Tindakan berdana dalam bentuk jasa (Abhaya Dana) yang tepat adalah...
A) Menertawakannya dan melewatinya dengan berlari agar tidak ikut basah.
B) Mengambil alat pel sekolah bersama-sama untuk membersihkan lantai tersebut agar tidak ada orang lain yang terpeleset jatuh.
C) Membiarkannya saja karena itu bukan kesalahanmu.
D) Menyuruh teman lain yang mengepel sendirian.`,
    `[Soal 2 - PG - Tipe: HOTS]
Syarat utama agar perbuatan berdana membuahkan kebahagiaan yang besar adalah kita memberikannya dengan hati yang...
A) Gembira, ikhlas, dan tanpa pamrih.
B) Terpaksa dan mengeluh.
C) Ingin dipuji di depan kelas.
D) Sedih karena uang berkurang.`,
    `[Soal 3 - PG - Tipe: Reguler]
Made memasukkan uang jajan ke kotak dana. Ia merasa...
A) Rugi karena tidak bisa beli es krim.
B) Terpaksa.
C) Tidak rugi; itu Dana, memberi dengan ikhlas, mengikis serakah dan pelit.
D) Marah pada Nia.`,
    `[Soal 4 - PG - Tipe: Reguler]
Berdana tidak selalu memakai uang. Contoh lain adalah...
A) Hanya menabung untuk diri sendiri.
B) Membersihkan vihara atau membagikan senyuman ramah.
C) Menertawakan teman yang tumpah air.
D) Menyembunyikan alat pel.`,
    `[Soal 5 - PG - Tipe: Reguler]
Amisa Dana artinya...
A) Memberi materi atau barang, misalnya makanan bagi Sangha atau pakaian bagi korban bencana.
B) Hanya tersenyum.
C) Hanya diam.
D) Menertawakan yang kesusahan.`,
    `[Soal 6 - PG - Tipe: Reguler]
Abhaya Dana adalah...
A) Memberi uang saja.
B) Memberi rasa aman: memaafkan, melindungi, membersihkan lantai licin, menyelamatkan hewan.
C) Menyimpan semua milik.
D) Memaksa teman berdana.`,
    `[Soal 7 - PG - Tipe: Reguler]
Dhamma Dana adalah...
A) Membeli es krim.
B) Menertawakan yang belum bisa.
C) Membagikan pengetahuan baik atau mengajari teman pelajaran sulit dengan sabar.
D) Menyembunyikan jawaban.`,
    `[Soal 8 - PG - Tipe: HOTS]
Kebaikan yang kita berikan diibaratkan...
A) Menanam benih buah yang manis.
B) Membuang uang sia-sia.
C) Membuat kita miskin selamanya.
D) Menghapus pelajaran.`,
    `[Soal 9 - PG - Tipe: Reguler]
Caga, hakikat berdana, melatih...
A) Kemelekatan pada barang.
B) Kerelaan melepas dan ketulusan, Alobha, tidak serakah.
C) Sifat kikir.
D) Pamrih hadiah.`,
    `[Soal 10 - PG - Tipe: Reguler]
Rajin menyisihkan sebagian milik untuk yang kesusahan menjauhkan kita dari sifat...
A) Metta.
B) Serakah, pelit, atau kikir.
C) Karuna.
D) Sati.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Kotak Dana di Vihara",
      pengantar:
        "Di vihara saat perayaan hari besar. Nia melihat Made memasukkan uang saku ke kotak dana dengan wajah tersenyum.",
      labelDaftar: "Percakapan Nia dan Made tentang Dana",
      kolom: 1,
      item: [
        {
          nama: "Bukan rugi",
          singkat: "Uang jajan",
          uraian:
            "Nia khawatir Made rugi karena uang es krim berkurang. Made menjawab: ini Dana, memberi dengan ikhlas. Hati yang gembira mengikis serakah dan pelit.",
          contoh: "Beri ikhlas. Bukan rugi.",
        },
        {
          nama: "Benih manis",
          singkat: "Kamma baik",
          uraian:
            "Berdana tidak membuat kita miskin. Kebaikan yang diberikan seperti menanam benih buah yang manis.",
          contoh: "Tanam kebaikan. Kelak berbuah.",
        },
        {
          nama: "Tidak harus uang",
          singkat: "Senyum dan sapu",
          uraian:
            "Membersihkan vihara atau membagikan senyuman ramah juga dana yang luhur.",
          contoh: "Senyum. Sapu. Itu dana.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Made memasukkan uang ke kotak...?",
          alias: ["dana"],
        },
        {
          pertanyaan: "2. Memberi dengan hati gembira mengikis sifat...?",
          alias: ["serakah", "pelit", "kikir"],
        },
        {
          pertanyaan: "3. Membersihkan vihara atau senyum ramah juga disebut...?",
          alias: ["dana"],
        },
      ],
      voice: [
        [
          "Made tersenyum memasukkan uang saku ke kotak dana. Ia tidak merasa rugi. Itu memberi dengan ikhlas.",
        ],
        [
          "Berdana menanam benih manis. Senyum dan membersihkan vihara juga dana yang luhur.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Caga dan Tiga Macam Dana",
      pengantar:
        "Caga adalah kerelaan melepas kemelekatan. Ada Amisa Dana, Abhaya Dana, dan Dhamma Dana. Semuanya dilatih dengan hati tulus, Alobha.",
      labelDaftar: "Hakikat dan jenis dana sederhana",
      kolom: 1,
      item: [
        {
          nama: "Caga",
          singkat: "Alobha, tidak serakah",
          uraian:
            "Berdana melatih ketulusan dan melepas kemelekatan pada barang. Syarat kebahagiaan besar: hati gembira dan tanpa pamrih.",
          contoh: "Gembira. Tanpa pamrih.",
        },
        {
          nama: "Amisa Dana",
          singkat: "Barang dan makanan",
          uraian:
            "Memberi materi: makanan kepada bhikkhu atau anggota Sangha, pakaian bagi korban bencana, atau uang saku ke kotak dana.",
          contoh: "Beri barang. Bukan terpaksa.",
        },
        {
          nama: "Abhaya dan Dhamma",
          singkat: "Aman dan pengetahuan",
          uraian:
            "Abhaya Dana: rasa aman—memaafkan, melindungi, mengepel lantai licin, menyelamatkan hewan. Dhamma Dana: mengajari teman yang sulit dengan sabar.",
          contoh: "Pel lantai. Ajar teman. Maafkan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Mengepel lantai licin agar tidak ada yang jatuh adalah... Dana?",
          alias: ["abhaya", "jasa"],
        },
        {
          pertanyaan: "2. Mengajari teman dengan sabar adalah... Dana?",
          alias: ["dhamma"],
        },
        {
          pertanyaan: "3. Berdana harus dengan hati yang... dan tanpa pamrih?",
          alias: ["gembira", "ikhlas", "tulus"],
        },
      ],
      voice: [
        [
          "Caga: rela memberi, tidak serakah. Amisa Dana memberi barang. Abhaya Dana memberi rasa aman.",
        ],
        [
          "Dhamma Dana: mengajari teman dengan sabar. Air tumpah di koridor, kita pel bersama agar tidak ada yang jatuh.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Berdana di Vihara, Sekolah, dan Rumah",
      pengantar:
        "Dana dilatih di kotak vihara, di koridor yang licin, dan saat berbagi bekal. Guru memandu. Orang tua menemani.",
      labelDaftar: "Latihan kedermawanan usia dini",
      kolom: 2,
      item: [
        {
          nama: "Pel bersama",
          singkat: "Untuk guru",
          uraian:
            "Simulasikan air tumpah di kelas. Siapa yang menertawakan, siapa yang mengambil pel? Namai tindakan itu Abhaya Dana. Puji yang mengajari teman.",
          contoh: "Pel. Jangan tertawa. Ajar teman.",
        },
        {
          nama: "Sisihkan sedikit",
          singkat: "Untuk orang tua",
          uraian:
            "Ajak anak menyisihkan sebagian jajan atau mainan untuk yang membutuhkan. Tekankan wajah gembira, bukan terpaksa. Senyum kepada tetangga juga dana.",
          contoh: "Sisihkan. Tersenyum. Jangan kikir.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Lantai licin: kita mengambil alat... bersama?",
          alias: ["pel"],
        },
        {
          pertanyaan: "2. Berdana dengan hati terpaksa: baik atau kurang baik?",
          alias: ["kurang", "tidak"],
        },
        {
          pertanyaan: "3. Menyisihkan milik menjauhkan kita dari sifat...?",
          alias: ["serakah", "pelit", "kikir"],
        },
      ],
      voice: [
        [
          "Di sekolah, lantai licin diplel bersama. Itu Abhaya Dana. Jangan ditertawakan.",
        ],
        [
          "Di rumah, sisihkan sedikit jajan dengan wajah gembira. Senyum juga dana.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih tindakan Abhaya Dana saat air tumpah di koridor, lalu lengkapi: hati yang gembira, dan sifat yang dijauhi.",
      labelDaftar: "Studi kasus dan isian kausalitas kamma",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Lantai licin",
          uraian:
            "Abhaya Dana: pel bersama agar tidak ada yang terpeleset. Bukan menertawakan dan lari, bukan membiarkan karena 'bukan salahku'.",
          contoh: "Pel bersama. Jangan tertawa.",
        },
        {
          nama: "Kelompok B",
          singkat: "Gembira, bukan kikir",
          uraian:
            "Syarat buah kebahagiaan: hati gembira dan tanpa pamrih. Menyisihkan milik menjauhkan kita dari serakah atau kikir.",
          contoh: "Gembira. Jauh dari kikir.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Air tumpah di koridor: kita pel bersama sebagai... Dana?",
          alias: ["abhaya", "jasa", "pel"],
        },
        {
          pertanyaan: "2. Berdana membuahkan kebahagiaan jika hatinya...?",
          alias: ["gembira", "ikhlas", "tulus"],
        },
        {
          pertanyaan: "3. Menyisihkan milik menjauhkan sifat... atau kikir?",
          alias: ["serakah", "pelit", "kikir"],
        },
      ],
      voice: [
        [
          "Air tumpah, lantai licin: ambil pel bersama agar tidak ada yang jatuh. Itu Abhaya Dana.",
        ],
        [
          "Beri dengan hati gembira tanpa pamrih. Menyisihkan milik menjauhkan kita dari serakah dan kikir.",
        ],
      ],
    },
  ],
};
