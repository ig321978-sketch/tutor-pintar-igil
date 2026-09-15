import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_PJOK1_BAB3 = "Bab 3: Bermain dengan Benda";

export const MODUL_PJOK1_BAB3: ModulResmiPai = {
  id: "pjok-1-bab3",
  judul: JUDUL_PJOK1_BAB3,
  pola: /bermain dengan benda|gerak dasar manipulatif|pola gerak dasar manipulatif/,
  motivasi:
    "Melempar, menangkap, menendang, dan memukul butuh mata pada benda. Jari terbuka saat menangkap. Kaki mendorong bola ke sasaran.",
  kunciJawaban: "B,C,A,B,C,A,B,A,C,B",
  sketsaKartu: [
    "Ali melempar bola plastik, Nia menangkap dengan dua tangan di lapangan rumput.",
    "Empat gerak manipulatif: lempar, tangkap, tendang, pukul.",
    "Anak latihan operan bola di sekolah dan menendang bola ke sasaran di rumah.",
    "Siswa menganalisis jari kaku saat menangkap dan mencocokkan gerak dengan anggota tubuh.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Ketika sedang bermain operan bola basket, Nia kesulitan menangkap bola yang dilempar Ali karena bola selalu lepas dari genggamannya. Kesalahan yang mungkin dilakukan Nia adalah...
A) Nia melihat ke arah bola yang datang.
B) Posisi jari-jari tangan Nia terlalu rapat dan kaku saat bola menyentuh telapak tangan.
C) Nia menangkap menggunakan dua tangan.
D) Nia berdiri siap di lapangan.`,
    `[Soal 2 - PG - Tipe: HOTS]
Menendang bola paling tepat dideskripsikan sebagai...
A) Menggunakan kedua tangan untuk menerima objek yang datang.
B) Menggunakan ayunan lengan untuk mendorong objek ke sasaran jauh.
C) Menggunakan punggung atau bagian dalam kaki untuk mendorong objek bawah.
D) Berdiri diam tanpa menyentuh bola.`,
    `[Soal 3 - PG - Tipe: Reguler]
Gerak manipulatif adalah keterampilan menguasai...
A) Benda di luar tubuh seperti bola, pemukul, atau tali.
B) Hanya napas di tempat.
C) Hanya berdiri satu kaki.
D) Hanya tidur setelah olahraga.`,
    `[Soal 4 - PG - Tipe: Reguler]
Melempar bola dilakukan dengan...
A) Kaki semata.
B) Ayunan tangan mendorong bola ke depan atau atas.
C) Menutup mata.
D) Membelakangi sasaran.`,
    `[Soal 5 - PG - Tipe: Reguler]
Menangkap bola yang aman memakai...
A) Satu jari kaku.
B) Siku saja.
C) Kedua tangan, jari terbuka meredam bola.
D) Kepala menunduk menjauhi bola.`,
    `[Soal 6 - PG - Tipe: Reguler]
Agar bola tidak luput, mata kita harus...
A) Konsentrasi melihat ke arah bola.
B) Melihat penonton.
C) Tertutup rapat.
D) Melihat sepatu terus.`,
    `[Soal 7 - PG - Tipe: Reguler]
Memukul objek bisa memakai...
A) Hanya telinga.
B) Bagian tubuh atau alat seperti raket.
C) Hanya duduk diam.
D) Minum air es.`,
    `[Soal 8 - PG - Tipe: HOTS]
Melempar bola artinya...
A) Mengayunkan lengan untuk mendorong objek ke sasaran.
B) Menangkap dengan jari rapat.
C) Menendang dengan punggung kaki.
D) Berdiri satu kaki.`,
    `[Soal 9 - PG - Tipe: Reguler]
Menangkap bola artinya...
A) Menendang ke gawang.
B) Melempar ke teman.
C) Menerima objek yang datang dengan kedua tangan.
D) Memutar pinggang di tempat.`,
    `[Soal 10 - PG - Tipe: Reguler]
Saat menendang, kaki yang dipakai biasanya...
A) Tidak boleh menyentuh bola.
B) Punggung kaki atau kaki bagian dalam/luar menuju sasaran.
C) Hanya ujung kuku.
D) Kedua tangan.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog Oper-Operan Bola",
      pengantar:
        "Lapangan rumput sekolah. Ali dan Nia sedang bermain oper-operan bola plastik.",
      labelDaftar: "Percakapan Ali dan Nia tentang melempar dan menendang",
      kolom: 1,
      item: [
        {
          nama: "Me-le-m-par",
          singkat: "Bola ke atas ke teman",
          uraian:
            "Ali melempar bola agak tinggi ke arah Nia. Melempar memakai ayunan tangan.",
          contoh: "Lempar pelan dulu, lalu lebih jauh.",
        },
        {
          nama: "Menangkap dua tangan",
          singkat: "Hore, tertangkap",
          uraian:
            "Nia menangkap dengan kedua tangan, lalu menendang bola kembali ke kaki Ali.",
          contoh: "Dua tangan terbuka, lalu tendang.",
        },
        {
          nama: "Mata pada bola",
          singkat: "Konsentrasi",
          uraian:
            "Bermain dengan alat bantu seperti bola itu seru. Kita harus konsentrasi melihat bolanya agar tidak luput.",
          contoh: "Lihat bolanya, jangan luput.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Ali mengirim bola kepada Nia dengan cara apa?",
          alias: ["lempar", "melempar", "lemparan"],
        },
        {
          pertanyaan: "2. Nia mengembalikan bola dengan cara apa?",
          alias: ["tendang", "menendang", "kaki"],
        },
        {
          pertanyaan: "3. Agar bola tidak luput, kita harus melihat ke mana?",
          alias: ["bola", "arah bola", "konsentrasi"],
        },
      ],
      voice: [
        [
          "Di lapangan rumput, Ali dan Nia oper-operan bola plastik. Ali berkata, Nia, tangkap bolanya ya! Aku akan me-le-m-par bola ini agak tinggi ke arahmu.",
          "Nia menangkap dengan kedua tangan. Hore, tertangkap! Sekarang gantian, aku akan me-n-d-a-ng bola ini kembali ke arah kakimu ya, Ali.",
        ],
        [
          "Ali tersenyum. Wah, bermain menggunakan alat bantu seperti bola ini seru sekali ya. Kita harus konsentrasi melihat ke arah bolanya agar tidak luput!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Gerak Manipulatif Utama",
      pengantar:
        "Gerak manipulatif dilakukan secara sadar dengan menguasai objek di luar tubuh: bola, pemukul, simpai, atau tali. Empat gerak utama kelas 1: melempar, menangkap, menendang, memukul.",
      labelDaftar: "Lempar, tangkap, tendang, pukul",
      kolom: 1,
      item: [
        {
          nama: "Melempar",
          singkat: "Ayunan tangan",
          uraian:
            "Ayunkan tangan untuk mendorong bola ke depan atau atas, satu atau dua tangan, menuju sasaran.",
          contoh: "Ayun lengan, dorong bola ke sasaran.",
        },
        {
          nama: "Menangkap",
          singkat: "Jari terbuka",
          uraian:
            "Terima objek yang datang dengan kedua tangan. Jari terbuka meredam bola. Jari rapat dan kaku membuat bola mudah lepas.",
          contoh: "Jari terbuka, dua tangan meredam.",
        },
        {
          nama: "Menendang dan memukul",
          singkat: "Kaki atau alat",
          uraian:
            "Menendang: dorong bola dengan punggung kaki atau kaki bagian dalam/luar ke sasaran. Memukul: pakai bagian tubuh atau alat seperti raket.",
          contoh: "Kaki ke bola. Raket ke objek.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Melempar memakai ayunan apa?",
          alias: ["tangan", "lengan", "ayunan"],
        },
        {
          pertanyaan: "2. Saat menangkap, jari sebaiknya bagaimana?",
          alias: ["terbuka", "meredam", "tidak kaku"],
        },
        {
          pertanyaan: "3. Menendang bola memakai apa?",
          alias: ["kaki", "punggung kaki", "kaki dalam"],
        },
      ],
      voice: [
        [
          "Gerak manipulatif: menguasai benda di luar tubuh. Melempar dengan ayunan tangan. Menangkap dengan dua tangan, jari terbuka meredam bola.",
        ],
        [
          "Menendang dengan punggung atau bagian dalam kaki ke sasaran. Memukul dengan tangan atau raket. Mata selalu pada benda.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Operan Bola di Sekolah dan di Rumah",
      pengantar:
        "Manipulatif dilatih berpasangan. Mulai jarak dekat, bola ringan, lalu sedikit lebih jauh.",
      labelDaftar: "Dua tempat berlatih",
      kolom: 2,
      item: [
        {
          nama: "Estafet bola plastik",
          singkat: "Untuk guru",
          uraian:
            "Berpasangan: lempar-tangkap, lalu tendang pelan. Koreksi jari yang kaku. Tanyakan: mengapa bola lepas jika jari rapat?",
          contoh: "Jari terbuka, mata pada bola.",
        },
        {
          nama: "Sasaran bantal",
          singkat: "Untuk orang tua",
          uraian:
            "Tendang atau lempar bola kain ke bantal sebagai sasaran. Jaga barang rapuh. Puji usaha, bukan hanya yang masuk sasaran.",
          contoh: "Lempar ke bantal. Tendang pelan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Latihan operan dimulai dari jarak yang bagaimana?",
          alias: ["dekat", "pelan", "dekat dulu"],
        },
        {
          pertanyaan: "2. Jika jari rapat, bola mudah apa?",
          alias: ["lepas", "luput", "jatuh"],
        },
        {
          pertanyaan: "3. Di rumah, sasaran yang aman bisa berupa apa?",
          alias: ["bantal", "bola kain", "sasaran"],
        },
      ],
      voice: [
        [
          "Di sekolah, berpasangan. Lempar-tangkap, lalu tendang pelan. Jari terbuka. Mata pada bola.",
        ],
        [
          "Di rumah, lempar atau tendang bola kain ke bantal. Jaga barang rapuh. Yang penting berusaha, bukan hanya yang masuk sasaran.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Saatnya menganalisis kesalahan menangkap dan mencocokkan gerakan dengan deskripsinya.",
      labelDaftar: "Studi kasus dan mencocokkan",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Pengamatan gerak",
          uraian:
            "Bola lepas saat ditangkap sering karena jari terlalu rapat dan kaku, bukan karena memakai dua tangan atau melihat bola.",
          contoh: "Jari kaku = bola mudah lepas.",
        },
        {
          nama: "Kelompok B",
          singkat: "Mencocokkan gerak",
          uraian:
            "Menendang: kaki mendorong objek bawah. Menangkap: dua tangan menerima. Melempar: ayunan lengan mendorong objek.",
          contoh: "Tendang-kaki, tangkap-tangan, lempar-lengan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Bola lepas dari genggaman. Kesalahan yang mungkin?",
          alias: ["jari", "rapat", "kaku"],
        },
        {
          pertanyaan: "2. Menendang bola memakai apa?",
          alias: ["kaki", "punggung", "kaki dalam"],
        },
        {
          pertanyaan: "3. Menangkap bola memakai apa?",
          alias: ["tangan", "dua tangan", "jari"],
        },
      ],
      voice: [
        [
          "Jika bola selalu lepas, cek jari. Jari rapat dan kaku membuat bola sulit diredam. Buka jari, dua tangan.",
        ],
        [
          "Cocokkan. Menendang: kaki. Menangkap: dua tangan menerima. Melempar: ayunan lengan mendorong bola.",
        ],
      ],
    },
  ],
};
