import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_BUDDHA1_BAB1 = "Bab 1: Aku dan Lingkunganku Ciptaan Karma";

export const MODUL_BUDDHA1_BAB1: ModulResmiPai = {
  id: "buddha-1-bab1",
  judul: JUDUL_BUDDHA1_BAB1,
  pola: /aku dan lingkunganku|ciptaan karma|triratna/,
  motivasi:
    "Alam dan diri kita indah jika dirawat dengan perbuatan baik. Metta dan Karuna: sayangi semua makhluk. Jangan injak semut. Sila ke-1: jangan menyakiti yang hidup.",
  kunciJawaban: "B,B,B,A,C,B,A,B,C,A",
  sketsaKartu: [
    "Nia mengamati bunga mekar, Made menatap barisan semut di pohon.",
    "Anak mengangkat burung kecil yang sayapnya terluka.",
    "Anak menolak menginjak semut di taman sekolah.",
    "Anak berdoa agar semua makhluk berbahagia.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Ketika sedang bermain di taman, kamu melihat seekor burung kecil jatuh dari sarangnya dan sayapnya terluka. Tindakan yang mencerminkan sifat Karuna (belas kasih) adalah...
A) Membiarkannya saja karena burung itu bukan hewan peliharaanmu.
B) Mengangkatnya dengan hati-hati, menaruhnya di tempat aman, dan meminta bantuan guru/orang tua untuk mengobatinya.
C) Mengambil burung tersebut untuk dijadikan mainan di dalam kelas.
D) Menendang ranting di dekat burung agar ia terbang paksa.`,
    `[Soal 2 - PG - Tipe: HOTS]
Mengapa umat Buddha selalu mendoakan agar "Semua makhluk hidup berbahagia" saat selesai berdoa atau bermeditasi?
A) Karena doa tersebut bisa membuat kita mendapatkan hadiah mainan baru.
B) Sebagai wujud pancaran cinta kasih (Metta) yang tulus agar kedamaian tercipta di seluruh dunia untuk semua makhluk, baik yang besar maupun kecil.
C) Supaya hari cepat sore dan bisa segera pulang.
D) Supaya semut tidak lagi berjalan di pohon.`,
    `[Soal 3 - PG - Tipe: HOTS]
Teman sengaja menginjak barisan semut karena menganggap semut hanya hewan kecil yang mengganggu. Sikap bijaksana menurut Made adalah...
A) Ikut menginjak supaya taman bersih.
B) Menolak menyakiti; Metta berlaku untuk semua makhluk, termasuk semut.
C) Menangkap semua semut untuk dimasukkan ke kotak.
D) Tertawa karena semut tidak bisa marah.`,
    `[Soal 4 - PG - Tipe: Reguler]
Hukum Kamma atau perbuatan mengajarkan bahwa alam dan diri kita menjadi indah jika...
A) Dirawat dengan perbuatan baik.
B) Dibiarkan kotor.
C) Hanya dipuji tanpa dirawat.
D) Digunakan untuk menginjak makhluk kecil.`,
    `[Soal 5 - PG - Tipe: Reguler]
Metta artinya...
A) Marah pada semut.
B) Cinta kasih hanya untuk hewan peliharaan.
C) Cinta kasih universal yang mengharapkan semua makhluk berbahagia.
D) Hadiah mainan setelah berdoa.`,
    `[Soal 6 - PG - Tipe: Reguler]
Karuna adalah...
A) Keinginan memiliki burung sebagai mainan.
B) Belas kasih, keinginan meringankan penderitaan makhluk lain.
C) Membiarkan yang terluka.
D) Doa supaya cepat pulang.`,
    `[Soal 7 - PG - Tipe: Reguler]
Pancasila Buddhis Sila ke-1 mengajarkan kita menghindari...
A) Pembunuhan dan penyiksaan makhluk hidup.
B) Menyiram bunga.
C) Melihat semut di pohon.
D) Berdoa Metta.`,
    `[Soal 8 - PG - Tipe: HOTS]
Jika kita tidak ingin disakiti, maka kita...
A) Boleh menyakiti yang lebih kecil.
B) Tidak menyakiti makhluk lain.
C) Hanya menyayangi yang lucu.
D) Menunggu guru yang menolong semut.`,
    `[Soal 9 - PG - Tipe: Reguler]
Sabbe Satta Bhavantu Sukhitatta berarti...
A) Semua semut harus diusir.
B) Hanya manusia yang boleh bahagia.
C) Semoga semua makhluk berbahagia.
D) Taman hanya untuk bunga.`,
    `[Soal 10 - PG - Tipe: Reguler]
Menyakiti makhluk lain menanam...
A) Kamma buruk yang bisa membawa ketidakbahagiaan bagi diri sendiri kelak.
B) Kamma baik otomatis.
C) Bunga yang lebih indah.
D) Hadiah es krim.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Bunga, Semut, dan Taman Sekolah",
      pengantar:
        "Di taman sekolah. Nia mengamati bunga yang mekar, lalu menghampiri Made yang melihat barisan semut di pohon.",
      labelDaftar: "Percakapan Nia dan Made tentang Metta",
      kolom: 1,
      item: [
        {
          nama: "Alam yang indah",
          singkat: "Bunga mekar",
          uraian:
            "Nia kagum pada bunga yang subur. Made menjawab: itu Hukum Kamma. Alam dan diri kita menjadi indah jika dirawat dengan perbuatan baik.",
          contoh: "Rawat. Jangan rusak. Itu kamma baik.",
        },
        {
          nama: "Semut juga ingin tenang",
          singkat: "Makhluk kecil",
          uraian:
            "Semua makhluk hidup, bahkan semut kecil, ingin hidup tenang dan bahagia. Menginjak semut karena dianggap mengganggu adalah tindakan kurang bijaksana.",
          contoh: "Semut kecil tetap ingin hidup.",
        },
        {
          nama: "Metta tanpa terkecuali",
          singkat: "Cinta kasih",
          uraian:
            "Dalam agama Buddha kita belajar Metta kepada semua makhluk. Menyakiti makhluk lain menanam kamma buruk yang bisa membawa ketidakbahagiaan bagi diri sendiri kelak.",
          contoh: "Sayangi semua. Jangan injak.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Made melihat barisan apa di pohon?",
          alias: ["semut"],
        },
        {
          pertanyaan: "2. Cinta kasih kepada semua makhluk disebut...?",
          alias: ["metta"],
        },
        {
          pertanyaan: "3. Menginjak semut menanam kamma...?",
          alias: ["buruk", "jelek"],
        },
      ],
      voice: [
        [
          "Nia memandang bunga mekar. Made menatap semut di pohon. Alam indah jika dirawat dengan perbuatan baik.",
        ],
        [
          "Semut kecil juga ingin hidup tenang. Metta adalah cinta kasih untuk semua makhluk. Menginjak semut menanam kamma buruk.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Metta, Karuna, dan Sila ke-1",
      pengantar:
        "Metta mengharapkan semua makhluk berbahagia. Karuna meredakan penderitaan. Sila ke-1: jangan membunuh atau menyiksa yang hidup.",
      labelDaftar: "Cinta kasih, belas kasih, dan sila pertama",
      kolom: 1,
      item: [
        {
          nama: "Metta",
          singkat: "Cinta kasih universal",
          uraian:
            "Metta mengharapkan semua makhluk berbahagia: Sabbe Satta Bhavantu Sukhitatta. Doa ini dipancarkan setelah puja atau meditasi, untuk yang besar maupun kecil, bukan untuk mendapat mainan.",
          contoh: "Semua makhluk, semoga bahagia.",
        },
        {
          nama: "Karuna",
          singkat: "Belas kasih",
          uraian:
            "Karuna adalah keinginan meringankan penderitaan. Burung jatuh, sayap terluka: angkat hati-hati, taruh di tempat aman, minta bantuan guru atau orang tua. Bukan dibiarkan, bukan dijadikan mainan.",
          contoh: "Yang terluka ditolong, bukan dimainkan.",
        },
        {
          nama: "Sila ke-1",
          singkat: "Panatipata Veramani",
          uraian:
            "Pancasila Buddhis sila pertama: menghindari pembunuhan dan penyiksaan makhluk hidup. Kausalitas sederhana: jika kita tidak ingin disakiti, jangan menyakiti makhluk lain.",
          contoh: "Tidak ingin sakit? Jangan sakiti.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Karuna artinya rasa... kasih?",
          alias: ["belas", "kasih", "iba"],
        },
        {
          pertanyaan: "2. Burung terluka: kita mengangkatnya dengan...?",
          alias: ["hati-hati", "hati hati", "aman"],
        },
        {
          pertanyaan: "3. Sila ke-1: jangan... makhluk hidup?",
          alias: ["sakiti", "bunuh", "siksa", "menyakiti"],
        },
      ],
      voice: [
        [
          "Metta: semoga semua makhluk berbahagia. Karuna: burung terluka kita angkat hati-hati dan minta bantuan guru.",
        ],
        [
          "Sila pertama: jangan membunuh atau menyiksa yang hidup. Kalau kita tidak ingin disakiti, jangan menyakiti yang lain.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Sayangi Makhluk di Sekolah dan di Rumah",
      pengantar:
        "Metta dilatih dengan kaki yang tidak menginjak semut dan tangan yang menolong yang terluka. Guru memandu di taman. Orang tua menemani di rumah.",
      labelDaftar: "Latihan Metta dan Karuna",
      kolom: 2,
      item: [
        {
          nama: "Jalan semut",
          singkat: "Untuk guru",
          uraian:
            "Ajak anak mengamati semut atau bunga tanpa menyentuh kasar. Diskusikan: jika ada yang hendak menginjak, apa yang kita ucapkan? Latih kalimat: semua makhluk ingin bahagia.",
          contoh: "Lihat. Jangan injak. Ucapkan Metta.",
        },
        {
          nama: "Burung atau kucing",
          singkat: "Untuk orang tua",
          uraian:
            "Jika ada hewan terluka di halaman, temani anak meminta bantuan orang dewasa. Jangan dijadikan mainan. Ucapkan bersama: semoga semua makhluk berbahagia.",
          contoh: "Tolong. Jangan mainkan. Doakan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Teman hendak injak semut: kita ikut atau menolak?",
          alias: ["menolak", "tolak"],
        },
        {
          pertanyaan: "2. Hewan terluka: minta bantuan...?",
          alias: ["guru", "orang tua", "dewasa"],
        },
        {
          pertanyaan: "3. Doa Metta: semua makhluk semoga...?",
          alias: ["bahagia", "bahagia"],
        },
      ],
      voice: [
        [
          "Di taman, lihat semut tanpa menginjak. Katakan: semua makhluk ingin bahagia.",
        ],
        [
          "Di rumah, hewan terluka ditolong bersama orang dewasa. Jangan dijadikan mainan.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih tindakan Karuna saat burung terluka, lalu pilih arti doa semua makhluk berbahagia.",
      labelDaftar: "Pilihan ganda analisis HOTS",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Burung terluka",
          uraian:
            "Karuna: angkat hati-hati, taruh di tempat aman, minta bantuan guru atau orang tua. Bukan dibiarkan, bukan dijadikan mainan kelas.",
          contoh: "Tolong. Jangan mainkan.",
        },
        {
          nama: "Doa Metta",
          singkat: "Semua makhluk bahagia",
          uraian:
            "Doa itu pancaran Metta agar damai bagi semua makhluk, besar dan kecil. Bukan untuk hadiah mainan, bukan supaya cepat pulang.",
          contoh: "Metta tulus. Bukan pamrih mainan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Burung sayap terluka: kita menolong dengan rasa...?",
          alias: ["karuna", "belas", "kasih"],
        },
        {
          pertanyaan: "2. Doa semua makhluk berbahagia adalah pancaran...?",
          alias: ["metta", "cinta"],
        },
      ],
      voice: [
        [
          "Burung jatuh, sayap terluka: angkat hati-hati, taruh aman, minta bantuan guru. Itu Karuna.",
        ],
        [
          "Kita berdoa semoga semua makhluk berbahagia sebagai Metta yang tulus, bukan supaya dapat mainan.",
        ],
      ],
    },
  ],
};
