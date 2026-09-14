import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK1_BAB8 =
  "Bab 8: Mengukur Panjang dan Berat (Pengukuran)";
export const JUDUL_MTK1_BAB8_LAMA = "Bab 7: Mengukur Panjang Benda";
export const JUDUL_MTK1_BAB8_ALIAS = "Bab 8: Mengukur Panjang dan Berat";

export const MODUL_MTK1_BAB8: ModulResmiPai = {
  id: "mtk-1-bab8",
  judul: JUDUL_MTK1_BAB8,
  pola: /mengukur\s+panjang(\s+dan\s+berat)?|pengukuran|mengukur\s+panjang\s+benda/,
  motivasi:
    "Jadi detektif pengukuran! Ukur panjang dengan jengkal, langkah, atau depa. Bandingkan mana yang lebih berat.",
  kunciJawaban: "A,B,A,C,A,B,C,A,B,B",
  sketsaKartu: [
    "Nia membandingkan panjang buku dan penghapus, Ali merasakan buku lebih berat.",
    "Infografis detektif: jengkal, langkah, depa di kiri, semangka lebih berat dari apel di kanan.",
    "Siswa mengukur papan tulis dengan jengkal, anak memegang apel dan semangka.",
    "Anak memilih lebih panjang, lebih ringan, dan alasan jengkal kakak lebih panjang.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: Reguler]
Pensil baru milik Ali dibanding rautan pensil biasanya...
A) Lebih panjang
B) Lebih pendek
C) Lebih berat seperti lemari
D) Sama depa`,
    `[Soal 2 - PG - Tipe: Reguler]
Kapas bantal dibanding batu bata terasa...
A) Lebih berat
B) Lebih ringan
C) Lebih panjang
D) Lebih pendek`,
    `[Soal 3 - PG - Tipe: Reguler]
Alat ukur tubuh yang paling cocok untuk mengukur panjang meja tulis adalah...
A) Jengkal
B) Langkah
C) Depa
D) Timbangan`,
    `[Soal 4 - PG - Tipe: Reguler]
Alat ukur tubuh yang paling cocok untuk mengukur panjang lapangan sekolah adalah...
A) Jengkal
B) Depa
C) Langkah
D) Penghapus`,
    `[Soal 5 - PG - Tipe: Reguler]
Buah semangka dibanding buah salak terasa...
A) Lebih berat
B) Lebih ringan
C) Lebih pendek
D) Lebih panjang`,
    `[Soal 6 - PG - Tipe: Reguler]
Satu lembar kertas lipat dibanding kamus tebal terasa...
A) Lebih berat
B) Lebih ringan
C) Lebih panjang
D) Lebih pendek`,
    `[Soal 7 - PG - Tipe: Reguler]
Jengkal adalah jarak dari...
A) Ujung kaki ke kepala
B) Bahu ke siku
C) Ujung ibu jari ke ujung kelingking yang diregangkan
D) Hidung ke telinga`,
    `[Soal 8 - PG - Tipe: Reguler]
Depa memakai...
A) Bentangan dua tangan
B) Satu jari kelingking
C) Langkah kaki
D) Timbangan dapur`,
    `[Soal 9 - PG - Tipe: HOTS]
Lemari dibanding kursi biasanya...
A) Lebih ringan
B) Lebih berat
C) Lebih pendek dari penghapus
D) Sama jengkal`,
    `[Soal 10 - PG - Tipe: HOTS]
Ali mendapat 6 jengkal, kakak mendapat 4 jengkal pada meja yang sama. Mengapa berbeda?
A) Meja bertambah panjang saat diukur kakak
B) Jengkal tangan kakak lebih panjang daripada jengkal Ali
C) Ali salah menghitung
D) Meja berubah jadi depa`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog Buku dan Penghapus",
      pengantar:
        "Nia melihat buku matematikanya lebih panjang daripada penghapusnya. Ali merasakan buku itu juga lebih berat. Mereka ingin mengukur meja dengan jengkal.",
      labelDaftar: "Percakapan Ali dan Nia",
      kolom: 1,
      item: [
        {
          nama: "Lebih panjang dan lebih berat",
          singkat: "Membandingkan",
          uraian:
            "Buku lebih panjang daripada penghapus. Saat diangkat, buku terasa lebih berat daripada penghapus.",
          contoh: "Buku > penghapus, panjang dan berat.",
        },
        {
          nama: "Ukur dengan jengkal",
          singkat: "Alat non-baku",
          uraian:
            "Nia mengajak mengukur panjang meja memakai jengkal tangan. Hasil jengkal tiap orang bisa berbeda karena ukuran tangan berbeda.",
          contoh: "Meja diukur dengan jengkal.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Buku dibanding penghapus, panjangnya bagaimana?",
          alias: ["lebih panjang", "panjang"],
        },
        {
          pertanyaan: "2. Buku dibanding penghapus, beratnya bagaimana?",
          alias: ["lebih berat", "berat"],
        },
        {
          pertanyaan: "3. Nia mengukur meja memakai apa?",
          alias: ["jengkal", "jengkal tangan"],
        },
      ],
      voice: [
        [
          "Nia berkata, Ali, lihat! Buku matematikaku lebih panjang daripada penghapusku.",
          "Ali menjawab, benar, Nia. Dan kalau kita angkat, buku ini juga terasa lebih berat daripada penghapus.",
        ],
        [
          "Nia berkata, yuk, kita ukur panjang meja ini menggunakan jengkal tangan kita! Berapa jengkal mejamu, Ali?",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis Detektif Pengukuran",
      pengantar:
        "Panjang diukur dengan alat non-baku: jengkal, langkah, dan depa. Berat dibanding: lebih berat atau lebih ringan. Ketuk kartu untuk melihat contohnya.",
      labelDaftar: "Panjang dan berat",
      kolom: 2,
      item: [
        {
          nama: "Pengukuran panjang non-baku",
          singkat: "Tubuh sebagai alat",
          uraian:
            "Mengukur benda menggunakan bagian tubuh. Hasilnya bisa berbeda antar orang. Jengkal: ujung ibu jari ke ujung kelingking yang diregangkan. Depa: ujung jari tangan kanan ke kiri saat kedua tangan direntangkan. Langkah: jarak kaki saat berjalan normal.",
          contoh: "Meja pakai jengkal. Lapangan pakai langkah.",
        },
        {
          nama: "Perbandingan berat",
          singkat: "Lebih berat atau lebih ringan",
          uraian:
            "Menentukan berat secara visual atau dengan meraba. Lebih berat: semangka lebih berat dari apel, lemari lebih berat dari kursi. Lebih ringan: kapas lebih ringan dari batu, bulu ayam lebih ringan dari pensil.",
          contoh: "Semangka > apel. Kapas < batu.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Jarak ibu jari ke kelingking yang diregangkan disebut apa?",
          alias: ["jengkal"],
        },
        {
          pertanyaan: "2. Bentangan dua tangan disebut apa?",
          alias: ["depa"],
        },
        {
          pertanyaan: "3. Semangka dibanding apel, beratnya bagaimana?",
          alias: ["lebih berat", "berat"],
        },
      ],
      voice: [
        [
          "Infografis detektif pengukuran. Mengukur panjang dengan alat non-baku. Jengkal: pakai bentangan jari. Langkah: pakai langkah kaki. Depa: pakai bentangan dua tangan.",
        ],
        [
          "Mengukur berat. Lebih berat: semangka lebih berat dari apel. Lebih ringan: kapas lebih ringan dari batu. Hasil jengkal tiap orang bisa berbeda.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Jengkal Papan Tulis dan Timbangan Tangan",
      pengantar:
        "Di sekolah kita mengukur papan tulis dengan jengkal. Di rumah kita membandingkan berat buah di tangan kiri dan kanan.",
      labelDaftar: "Dua Tempat Berlatih",
      kolom: 2,
      item: [
        {
          nama: "Jengkal Papan Tulis",
          singkat: "Untuk guru",
          uraian:
            "Ajak siswa mengukur panjang papan tulis menggunakan jengkal tangan mereka secara bergantian. Bandingkan hasilnya.",
          contoh: "Papan tulis diukur jengkal bergantian.",
        },
        {
          nama: "Apel dan Semangka",
          singkat: "Untuk orang tua",
          uraian:
            "Minta anak memegang buah apel di tangan kanan dan buah melon atau semangka di tangan kiri untuk membandingkan mana yang lebih berat.",
          contoh: "Semangka lebih berat dari apel.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Di sekolah, papan tulis diukur memakai apa?",
          alias: ["jengkal", "jengkal tangan"],
        },
        {
          pertanyaan: "2. Di rumah, semangka dibanding apel rasanya bagaimana?",
          alias: ["lebih berat", "berat"],
        },
        {
          pertanyaan: "3. Hasil jengkal tiap orang sama atau berbeda?",
          alias: ["berbeda", "bisa berbeda", "tidak sama"],
        },
      ],
      voice: [
        [
          "Di sekolah, ukur panjang papan tulis dengan jengkal tangan secara bergantian. Hasilnya bisa berbeda.",
        ],
        [
          "Di rumah, pegang apel di tangan kanan dan semangka di tangan kiri. Rasakan mana yang lebih berat.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Saatnya menjadi detektif pengukuran. Isi lebih panjang atau lebih ringan, pilih alat ukur yang tepat, bandingkan berat, lalu jelaskan mengapa jengkal bisa berbeda.",
      labelDaftar: "Empat Jenis Soal",
      kolom: 1,
      item: [
        {
          nama: "Isian perbandingan",
          singkat: "Panjang dan ringan",
          uraian:
            "Pensil baru lebih panjang daripada rautan. Kapas bantal lebih ringan daripada batu bata.",
          contoh: "Pensil lebih panjang. Kapas lebih ringan.",
        },
        {
          nama: "Alat ukur dan berat",
          singkat: "Jengkal, langkah, berat",
          uraian:
            "Meja tulis paling cocok diukur jengkal. Lapangan sekolah paling cocok diukur langkah. Semangka lebih berat dari salak. Kertas lipat lebih ringan dari kamus tebal.",
          contoh: "Meja: jengkal. Lapangan: langkah.",
        },
        {
          nama: "Analisis jengkal",
          singkat: "Pilihan ganda",
          uraian:
            "Ali 6 jengkal, kakak 4 jengkal pada meja yang sama karena jengkal tangan kakak lebih panjang daripada jengkal Ali.",
          contoh: "Jengkal kakak lebih panjang.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Pensil baru dibanding rautan, panjangnya bagaimana?",
          alias: ["lebih panjang", "panjang"],
        },
        {
          pertanyaan: "2. Kapas bantal dibanding batu bata rasanya bagaimana?",
          alias: ["lebih ringan", "ringan"],
        },
        {
          pertanyaan: "3. Meja tulis paling cocok diukur dengan apa?",
          alias: ["jengkal"],
        },
        {
          pertanyaan: "4. Lapangan sekolah paling cocok diukur dengan apa?",
          alias: ["langkah"],
        },
        {
          pertanyaan: "5. Semangka dibanding salak rasanya bagaimana?",
          alias: ["lebih berat", "berat"],
        },
        {
          pertanyaan: "6. Kertas lipat dibanding kamus tebal rasanya bagaimana?",
          alias: ["lebih ringan", "ringan"],
        },
        {
          pertanyaan: "7. Ali 6 jengkal, kakak 4 jengkal. Mengapa berbeda?",
          alias: [
            "jengkal tangan kakak lebih panjang",
            "jengkal kakak lebih panjang",
            "b",
          ],
        },
        {
          pertanyaan: "8. Depa memakai bentangan apa?",
          alias: ["dua tangan", "bentangan dua tangan", "depa"],
        },
        {
          pertanyaan: "9. Kapas dibanding batu, beratnya bagaimana?",
          alias: ["lebih ringan", "ringan"],
        },
        {
          pertanyaan: "10. Lemari dibanding kursi, beratnya bagaimana?",
          alias: ["lebih berat", "berat"],
        },
      ],
      voice: [
        [
          "Lembar evaluasi Bab 8. Pensil baru lebih panjang daripada rautan. Kapas lebih ringan daripada batu bata. Meja tulis diukur jengkal. Lapangan diukur langkah.",
        ],
        [
          "Semangka lebih berat dari salak. Kertas lebih ringan dari kamus. Ali 6 jengkal, kakak 4 jengkal, karena jengkal kakak lebih panjang. Semangat!",
        ],
      ],
    },
  ],
};
