import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_PAI2_BAB6 = "Bab 6: Senangnya Belajar Surah al-Asr";

export const MODUL_PAI2_BAB6: ModulResmiPai = {
  id: "pai-2-bab6",
  judul: JUDUL_PAI2_BAB6,
  pola: /senangnya belajar surah|surah al[-\s]?[`']?asr|al[-\s]?asr|senang bisa membaca al[-\s]?qur/,
  motivasi:
    "Al-Asr artinya waktu. Allah bersumpah demi masa: manusia merugi kecuali yang beriman, beramal salih, dan saling menasihati dalam kebenaran serta kesabaran.",
  kunciJawaban: "B,B,S,B,B,A,C,B,A,B",
  sketsaKartu: [
    "Anak menghafal Surah al-Asr tiga ayat sambil menjaga jam pasir waktu.",
    "Empat kunci orang beruntung: iman, amal salih, nasihat benar, sabar.",
    "Anak mengerjakan evaluasi al-Asr dan jadwal harian.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Berdasarkan pesan pokok Surah al-Asr, semua manusia berada dalam keadaan merugi di dunia dan akhirat, kecuali orang-orang yang...
A) Memiliki banyak harta benda dan mainan mahal.
B) Beriman, beramal salih, serta saling menasihati dalam kebenaran dan kesabaran.
C) Menghabiskan seluruh waktunya untuk tidur dan bermain.
D) Hanya pintar menghafal tanpa beramal.`,
    `[Soal 2 - PG - Tipe: HOTS]
Tindakan di bawah ini yang mencerminkan sikap menghargai waktu sebagai bentuk pengamalan Surah al-Asr adalah...
A) Menunda mengerjakan PR sekolah hingga larut malam.
B) Membuat jadwal harian dan disiplin melaksanakannya (seperti waktu salat, belajar, dan bermain).
C) Datang terlambat ke sekolah karena bangun kesiangan akibat menonton TV.
D) Bermain game sampai lupa makan.`,
    `[Soal 3 - PG - Tipe: HOTS]
Saling menasihati sesama teman harus dilakukan dengan cara berteriak atau memarahi mereka di depan kelas agar mereka kapok. Pernyataan ini...
A) Benar.
B) Salah; menasihati harus sopan, bukan memalukan teman.
C) Benar hanya untuk kakak kelas.
D) Tidak ada hubungannya dengan al-Asr.`,
    `[Soal 4 - PG - Tipe: HOTS]
Menggunakan waktu muda untuk rajin menuntut ilmu adalah contoh amal salih yang menyelamatkan kita dari kerugian. Pernyataan ini...
A) Salah.
B) Benar; belajar adalah amal salih yang mengisi waktu dengan manfaat.
C) Benar hanya di hari Jumat.
D) Hanya berlaku untuk orang dewasa.`,
    `[Soal 5 - PG - Tipe: Reguler]
Wal Asr artinya...
A) Kecuali orang yang beriman.
B) Demi masa atau waktu.
C) Dan mengerjakan kebajikan.
D) Manusia merugi.`,
    `[Soal 6 - PG - Tipe: Reguler]
Illal ladziina aamanu artinya...
A) Kecuali orang-orang yang beriman.
B) Demi masa.
C) Saling menasihati.
D) Tiga ayat.`,
    `[Soal 7 - PG - Tipe: Reguler]
Surah al-Asr menempati urutan surah yang ke...
A) 114.
B) 1.
C) 103.
D) 3.`,
    `[Soal 8 - PG - Tipe: Reguler]
Surah al-Asr termasuk surah...
A) Madaniyyah.
B) Makkiyyah, diturunkan di Mekah, 3 ayat.
C) Terpanjang dalam Al-Qur'an.
D) Tanpa sumpah.`,
    `[Soal 9 - PG - Tipe: HOTS]
Anak yang menunda salat atau menunda belajar disebut merugi menurut al-Asr karena...
A) Waktu yang lewat tidak kembali, dan kesempatan beramal hilang.
B) Mainan menjadi mahal.
C) Guru memberi hadiah.
D) Ayatnya menjadi panjang.`,
    `[Soal 10 - PG - Tipe: Reguler]
Jika melihat teman berbuat salah, kita wajib saling...
A) Mengejek.
B) Menasihati dalam kebenaran.
C) Diam saja.
D) Memarahi di depan kelas.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Membaca dan Menghafal Surah al-Asr",
      pengantar:
        "Infografis: Al-Asr artinya waktu atau masa. Surah ke-103, 3 ayat, Makkiyyah. Puncaknya: hargai setiap detik. Bacalah Wal Asr hingga ayat ketiga dengan tartil.",
      labelDaftar: "Nama, ciri, dan puncak Surah al-Asr",
      kolom: 1,
      item: [
        {
          nama: "Nama surah",
          singkat: "Waktu, surah ke-103, 3 ayat",
          arab: "وَالْعَصْرِ",
          uraian:
            "Al-Asr artinya waktu atau masa. Ini surah pendek, tiga ayat, mudah dihafal anak kelas 2. Allah bersumpah demi masa: waktu yang sudah lewat tidak pernah kembali.",
          contoh: "Al-Asr = waktu / masa.",
        },
        {
          nama: "Ciri khas",
          singkat: "Makkiyyah, di Mekah",
          uraian:
            "Surah ini termasuk Makkiyyah, diturunkan di Mekah. Ayatnya pendek tetapi pesannya besar: jangan sia-siakan detik hidup.",
          contoh: "Makkiyyah = turun di Mekah.",
        },
        {
          nama: "Puncak utama",
          singkat: "Hargai setiap detik",
          uraian:
            "Waktu seperti modal yang hangus jika tidak dipakai. Yuk hafalkan Wal Asr sampai ayat ketiga dengan makhraj yang benar dan tartil.",
          contoh: "Hafal 3 ayat, jaga waktu.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Jika Surah al-Asr artinya demi masa atau waktu, mengapa Allah sampai bersumpah atas nama waktu di dalam Al-Qur'an?",
          alias: ["berharga", "penting", "tidak kembali", "hilang", "modal", "jaga", "sia"],
        },
      ],
      kuisTulis: {
        pertanyaan: "Surah al-Asr menempati urutan surah yang ke-............. di dalam Al-Qur'an.",
        alias: ["103", "seratus tiga", "ke-103", "keseratus tiga"],
      },
      voice: [
        [
          "Halo anak-anak kelas 2 yang cerdas! Coba bayangkan jika kita diberi modal uang satu juta rupiah setiap pagi, tetapi uang itu akan hangus dan hilang jika tidak kita belanjakan sebelum malam. Pasti kita akan menggunakannya dengan sangat hati-hati, bukan?",
          "Nah, Allah memberikan kita modal yang jauh lebih berharga dari uang, yaitu waktu hidup kita. Surah al-Asr yang hanya terdiri dari tiga ayat ini mengingatkan kita betapa pentingnya waktu.",
          "Demi masa atau demi waktu, Allah bersumpah bahwa waktu yang sudah lewat tidak akan pernah bisa kembali lagi. Yuk, kita hafalkan surah pendek yang sangat hebat ini agar kita selalu ingat untuk menjaga waktu kita dengan baik!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Pesan Pokok Surah al-Asr, Mengatasi Kerugian",
      pengantar:
        "Infografis empat kunci orang beruntung: beriman, beramal salih, saling menasihati dalam kebenaran, dan saling menasihati dalam kesabaran. Menunda belajar demi game berlebihan adalah rugi.",
      labelDaftar: "Empat kunci tidak merugi",
      kolom: 1,
      item: [
        {
          nama: "Iman dan amal salih",
          singkat: "Kunci 1 dan 2",
          uraian:
            "Manusia merugi kecuali yang beriman kepada Allah dan mengerjakan kebajikan. Belajar, membantu orang tua, dan salat tepat waktu adalah amal salih anak kelas 2.",
          contoh: "Iman + amal salih = beruntung.",
        },
        {
          nama: "Nasihat dan sabar",
          singkat: "Kunci 3 dan 4",
          uraian:
            "Anak beruntung saling menasihati dalam kebenaran dengan sopan, dan sabar ketika diberi tahu kebaikan. Jangan berteriak memalukan teman.",
          contoh: "Ingatkan teman dengan lembut.",
        },
        {
          nama: "Berbalik arah",
          singkat: "Isi waktu bermanfaat",
          uraian:
            "Menunda belajar untuk bermain game berlebihan adalah contoh orang yang merugi. Istirahat boleh, tetapi isi juga dengan baca, bantu, atau menghafal.",
          contoh: "Game berlebih = rugi. Manfaat = untung.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Berikan contoh perbuatan nyata di sekolah yang menunjukkan bahwa kamu tidak merugi dalam menggunakan waktu istirahatmu!",
          alias: [
            "baca",
            "hafal",
            "bantu",
            "makan",
            "shalat",
            "salat",
            "belajar",
            "berbagi",
            "rapi",
            "main sehat",
          ],
        },
      ],
      kuisTulis: {
        pertanyaan:
          "Menurut Surah al-Asr, jika kita melihat teman berbuat salah, kita wajib saling ........................ dalam kebenaran.",
        alias: ["menasihati", "nasihat", "saling menasihati", "nasehat"],
      },
      voice: [
        [
          "Anak-anak yang salih, di dalam Surah al-Asr, Allah memberi tahu kita sebuah rahasia besar. Kebanyakan manusia itu berada dalam kerugian. Mengapa merugi? Karena mereka membuang-buang waktunya untuk hal yang sia-sia.",
          "Namun, ada empat golongan anak yang sangat beruntung dan tidak akan merugi. Siapa mereka? Pertama, anak yang beriman. Kedua, anak yang rajin beramal salih, seperti belajar dan membantu orang tua.",
          "Ketiga, anak yang suka menasihati temannya dalam kebenaran. Dan keempat, anak yang sabar ketika diberi tahu kebaikan. Jadi, kalau kalian melihat temanmu berbuat salah, ingatkan dengan sopan ya! Itu tanda kalian adalah anak yang beruntung.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih siapa yang tidak merugi dan cara menghargai waktu, tentukan benar-salah cara menasihati, jodohkan potongan ayat, lalu jelaskan akibat menunda kebaikan.",
      labelDaftar: "Pilihan, benar-salah, mencocokkan, dan esai",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A dan B",
          singkat: "Empat kunci dan jadwal",
          uraian:
            "Tidak merugi: iman, amal salih, nasihat benar dan sabar. Menghargai waktu: buat jadwal salat, belajar, bermain. Menasihati sambil berteriak itu salah. Belajar di usia muda adalah amal salih, benar.",
          contoh: "Empat kunci. Jadwal. Sopan. Belajar.",
        },
        {
          nama: "Kelompok C dan D",
          singkat: "Ayat dan akibat menunda",
          uraian:
            "Wal Asr: Demi masa. Illal ladziina aamanu: kecuali orang beriman. Amal salih: mengerjakan kebajikan. Menunda salat atau belajar merugi karena waktu tidak kembali.",
          contoh: "Demi masa. Beriman. Amal salih. Waktu hilang.",
        },
      ],
      kuis: [
        { pertanyaan: "Siapa yang tidak merugi?", alias: ["iman", "amal", "nasihat", "sabar"] },
        { pertanyaan: "Contoh menghargai waktu?", alias: ["jadwal", "disiplin"] },
        { pertanyaan: "Menasihati sambil berteriak?", alias: ["salah", "tidak"] },
        { pertanyaan: "Belajar termasuk amal salih?", alias: ["benar"] },
        { pertanyaan: "Wal Asr artinya?", alias: ["masa", "waktu"] },
        { pertanyaan: "Mengapa menunda merugi?", alias: ["waktu", "tidak kembali", "hilang"] },
      ],
      voice: [
        [
          "Al-Asr mengingatkan: manusia merugi kecuali yang beriman, beramal salih, dan saling menasihati dalam kebenaran serta kesabaran.",
        ],
        [
          "Wal Asr artinya demi masa. Waktu yang lewat tidak kembali. Buat jadwal dan isi hari dengan hal bermanfaat.",
        ],
      ],
    },
  ],
};
