import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_PANCASILA1_BAB3 = "Bab 3: Aku Mengenal Indonesia";

export const MODUL_PANCASILA1_BAB3: ModulResmiPai = {
  id: "pancasila-1-bab3",
  judul: JUDUL_PANCASILA1_BAB3,
  pola: /aku mengenal indonesia|mengenal indonesia|perisai pancasila/,
  motivasi:
    "Pegang teguh persatuan. Hormati bendera Merah Putih dan lambang Garuda Pancasila.",
  kunciJawaban: "B,B,B,A,C,A,B,C,A,B",
  sketsaKartu: [
    "Ali dan Nia memandangi Garuda Pancasila di aula setelah upacara.",
    "Infografis perisai Pancasila: bintang, rantai, beringin, banteng, padi kapas.",
    "Siswa menjadi detektif Garuda mencocokkan simbol sila.",
    "Anak mengerjakan lembar evaluasi tentang simbol negara.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Mata rantai pada sila ke-2 berbentuk lingkaran dan persegi yang saling menyambung. Maknanya...
A) Bangsa Indonesia suka memakai perhiasan emas.
B) Seluruh rakyat, laki-laki maupun perempuan, harus bersatu dan saling membantu.
C) Rantai digunakan untuk mengikat hewan agar jinak.
D) Rantai hanya hiasan di dada Garuda.`,
    `[Soal 2 - PG - Tipe: HOTS]
Pendapatmu tidak terpilih saat pemilihan ketua kelas. Sikap yang mencerminkan sila ke-4 adalah...
A) Marah dan tidak mau membersihkan kelas lagi.
B) Menghargai keputusan bersama dan mendukung ketua kelas yang terpilih dengan ikhlas.
C) Meminta guru membatalkan hasil pemilihan.
D) Membuat kelompok sendiri di luar kelas.`,
    `[Soal 3 - PG - Tipe: Reguler]
Pohon beringin pada perisai Pancasila adalah simbol sila...
A) Ke-1 Ketuhanan Yang Maha Esa
B) Ke-3 Persatuan Indonesia
C) Ke-5 Keadilan Sosial
D) Ke-2 Kemanusiaan yang Adil dan Beradab`,
    `[Soal 4 - PG - Tipe: Reguler]
Bintang emas pada perisai Pancasila adalah simbol sila...
A) Ke-1 Ketuhanan Yang Maha Esa
B) Ke-3 Persatuan Indonesia
C) Ke-4 Kerakyatan
D) Ke-5 Keadilan Sosial`,
    `[Soal 5 - PG - Tipe: Reguler]
Padi dan kapas pada perisai Pancasila adalah simbol sila...
A) Ke-2 Kemanusiaan
B) Ke-3 Persatuan Indonesia
C) Ke-5 Keadilan Sosial
D) Ke-1 Ketuhanan`,
    `[Soal 6 - PG - Tipe: Reguler]
Bendera negara kita berwarna...
A) Merah dan putih
B) Merah dan hijau
C) Biru dan putih
D) Kuning dan hitam`,
    `[Soal 7 - PG - Tipe: Reguler]
Jika bendera Merah Putih kotor atau jatuh ke tanah, tindakan yang benar adalah...
A) Membiarkannya karena hanya kain.
B) Mengambilnya dengan hormat, membersihkannya, dan memberitahu guru atau orang tua.
C) Menyinahkan ke tempat sampah.
D) Menginjaknya supaya rata.`,
    `[Soal 8 - PG - Tipe: Reguler]
Cakar Garuda mencengkeram pita Bhinneka Tunggal Ika artinya...
A) Burung itu lapar.
B) Pita itu akan lepas sendiri.
C) Kita harus memegang teguh persatuan agar bangsa tidak bercerai-berai.
D) Hanya suku tertentu yang boleh bersatu.`,
    `[Soal 9 - PG - Tipe: Reguler]
Contoh perilaku sila ke-1 di kelas adalah...
A) Berdoa sebelum dan sesudah belajar.
B) Berbagi makanan secara adil.
C) Memilih ketua kelas.
D) Mencintai batik.`,
    `[Soal 10 - PG - Tipe: Reguler]
Contoh perilaku sila ke-5 di kelas adalah...
A) Berdoa sendiri tanpa teman.
B) Berbagi makanan secara adil.
C) Mengejek teman yang berbeda.
D) Datang terlambat setiap hari.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog di Aula Sekolah",
      pengantar:
        "Hari Senin setelah upacara bendera. Ali dan Nia memandangi lambang Garuda Pancasila yang tergantung besar di dinding aula sekolah.",
      labelDaftar: "Percakapan Ali dan Nia",
      kolom: 1,
      item: [
        {
          nama: "Perisai di dada Garuda",
          singkat: "Lima gambar berbeda",
          uraian:
            "Di dada Garuda ada perisai berisi bintang, rantai, pohon, banteng, serta padi dan kapas.",
          contoh: "Lima gambar di perisai.",
        },
        {
          nama: "Pita Bhinneka Tunggal Ika",
          singkat: "Dicekeram erat",
          uraian:
            "Cakar Garuda mencengkeram pita bertuliskan Bhinneka Tunggal Ika. Itu pelindung bangsa.",
          contoh: "Pegang teguh persatuan.",
        },
        {
          nama: "Tidak boleh dilepas",
          singkat: "Satu Indonesia",
          uraian:
            "Meskipun isi perisai berbeda-beda dan suku bermacam-macam, kita tetap satu Indonesia. Tidak boleh dilepas agar bangsa tidak bercerai-berai.",
          contoh: "Kita tetap satu Indonesia.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Di dada Garuda ada apa?",
          alias: ["perisai", "perisai pancasila", "lima gambar"],
        },
        {
          pertanyaan: "2. Cakar Garuda mencengkeram pita bertuliskan apa?",
          alias: ["bhinneka tunggal ika", "bhinneka", "persatuan"],
        },
        {
          pertanyaan: "3. Kita harus memegang teguh apa?",
          alias: ["persatuan", "persatuan indonesia", "satu indonesia"],
        },
      ],
      voice: [
        [
          "Setelah upacara, Ali dan Nia memandangi Garuda Pancasila di aula. Ali berkata, lihat dada Burung Garuda. Ada perisai dengan lima gambar: bintang, rantai, pohon, banteng, padi dan kapas.",
        ],
        [
          "Nia menjawab, perisai itu pelindung bangsa. Cakarnya mencengkeram pita Bhinneka Tunggal Ika. Artinya kita memegang teguh persatuan. Meskipun suku bermacam-macam, kita tetap satu Indonesia.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Perisai Pancasilaku",
      pengantar:
        "Bendera Merah Putih dan lambang Garuda Pancasila bukan pajangan belaka, melainkan representasi kedaulatan dan harga diri bangsa. Merah berarti berani. Putih berarti suci.",
      labelDaftar: "Sila, Simbol, Perilaku Nyata",
      kolom: 1,
      item: [
        {
          nama: "Sila ke-1 Bintang",
          singkat: "Pondasi spiritual",
          uraian: "Berdoa sebelum dan sesudah belajar.",
          contoh: "Doa bersama di kelas.",
        },
        {
          nama: "Sila ke-2 Rantai",
          singkat: "Kemanusiaan setara",
          uraian:
            "Mata rantai bulat melambangkan perempuan, persegi melambangkan laki-laki. Mereka saling terikat. Menolong teman yang jatuh dari sepeda.",
          contoh: "Menolong teman yang jatuh.",
        },
        {
          nama: "Sila ke-3 Pohon Beringin",
          singkat: "Tempat berteduh persatuan",
          uraian: "Mencintai produk dan batik Indonesia.",
          contoh: "Pakai batik kebanggaan.",
        },
        {
          nama: "Sila ke-4 Kepala Banteng",
          singkat: "Musyawarah",
          uraian: "Berdiskusi menentukan ketua kelas.",
          contoh: "Pemilihan ketua kelas.",
        },
        {
          nama: "Sila ke-5 Padi dan Kapas",
          singkat: "Pangan dan sandang",
          uraian: "Berbagi makanan secara adil.",
          contoh: "Bagi bekal merata.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Simbol sila ke-1 adalah apa?",
          alias: ["bintang", "bintang emas"],
        },
        {
          pertanyaan: "2. Simbol sila ke-3 adalah apa?",
          alias: ["pohon beringin", "beringin", "pohon"],
        },
        {
          pertanyaan: "3. Merah pada bendera berarti apa?",
          alias: ["berani", "keberanian"],
        },
      ],
      voice: [
        [
          "Bendera kita merah putih. Merah berarti berani. Putih berarti suci. Di perisai Pancasila ada lima simbol.",
          "Bintang untuk sila ke-1: berdoa sebelum dan sesudah belajar. Rantai untuk sila ke-2: menolong teman yang jatuh.",
        ],
        [
          "Pohon beringin untuk sila ke-3: cintai produk dan batik Indonesia. Kepala banteng untuk sila ke-4: berdiskusi memilih ketua kelas. Padi dan kapas untuk sila ke-5: berbagi makanan secara adil.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Detektif Garuda di Sekolah dan di Rumah",
      pengantar:
        "Simbol negara dipelajari sambil bergerak. Di sekolah kita menjadi detektif Garuda. Di rumah kita hormat pada bendera.",
      labelDaftar: "Dua Tempat Berlatih",
      kolom: 2,
      item: [
        {
          nama: "Detektif Garuda",
          singkat: "Untuk guru",
          uraian:
            "Guru membagikan potongan gambar simbol sila. Siswa mencocokkan simbol dengan teks sila yang dibacakan guru, lalu menyebutkan satu contoh perbuatan.",
          contoh: "Cocokkan bintang dengan sila ke-1.",
        },
        {
          nama: "Hormat pada bendera",
          singkat: "Untuk orang tua",
          uraian:
            "Saat upacara atau melihat bendera berkibar, ajak anak berdialog: Mengapa kita harus berdiri tegap dan hormat saat bendera Merah Putih dinaikkan?",
          contoh: "Berdiri tegap saat bendera dinaikkan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Detektif Garuda mencocokkan simbol dengan apa?",
          alias: ["sila", "teks sila", "bunyi sila"],
        },
        {
          pertanyaan: "2. Saat bendera dinaikkan, kita berdiri bagaimana?",
          alias: ["tegap", "hormat", "berdiri tegap", "tegap dan hormat"],
        },
        {
          pertanyaan: "3. Bendera kita disebut apa?",
          alias: ["merah putih", "sang merah putih", "bendera merah putih"],
        },
      ],
      voice: [
        [
          "Di sekolah, kita bermain Detektif Garuda. Cocokkan potongan gambar simbol sila dengan bunyi sila yang dibacakan guru. Sebut satu contoh perbuatannya.",
        ],
        [
          "Di rumah atau saat upacara, berdiri tegap dan hormat ketika bendera Merah Putih dinaikkan. Itu tanda kita cinta Indonesia.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Saatnya menunjukkan pengenalan Indonesia. Pilih makna simbol, cocokkan garis, lalu lengkapi kalimat tentang bendera.",
      labelDaftar: "Tiga Kelompok Soal",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Pilihan ganda HOTS",
          uraian:
            "Pilih makna rantai sila ke-2 dan sikap sila ke-4 saat pendapat tidak terpilih.",
          contoh: "Dukung ketua kelas yang terpilih.",
        },
        {
          nama: "Kelompok B",
          singkat: "Mencocokkan simbol",
          uraian:
            "Hubungkan pohon beringin dengan sila ke-3, bintang dengan sila ke-1, padi dan kapas dengan sila ke-5.",
          contoh: "Bintang emas: sila ke-1.",
        },
        {
          nama: "Kelompok C",
          singkat: "Isian analisis",
          uraian:
            "Bendera berwarna merah dan putih. Jika kotor atau jatuh, ambil dengan hormat dan bersihkan.",
          contoh: "Merah dan putih.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Rantai sila ke-2 artinya rakyat harus apa?",
          alias: ["bersatu", "saling membantu", "bersatu dan saling membantu"],
        },
        {
          pertanyaan: "2. Pendapat tidak terpilih. Sikap sila ke-4?",
          alias: ["menghargai", "mendukung", "ikhlas", "menghargai keputusan"],
        },
        {
          pertanyaan: "3. Pohon beringin adalah sila ke berapa?",
          alias: ["tiga", "3", "sila 3", "sila ke-3"],
        },
        {
          pertanyaan: "4. Bintang emas adalah sila ke berapa?",
          alias: ["satu", "1", "sila 1", "sila ke-1"],
        },
        {
          pertanyaan: "5. Padi dan kapas adalah sila ke berapa?",
          alias: ["lima", "5", "sila 5", "sila ke-5"],
        },
        {
          pertanyaan: "6. Bendera kita berwarna apa?",
          alias: ["merah putih", "merah dan putih"],
        },
        {
          pertanyaan: "7. Jika bendera jatuh, kita harus apa?",
          alias: ["ambil", "bersihkan", "hormat", "memberitahu guru"],
        },
      ],
      voice: [
        [
          "Ini lembar evaluasi. Kelompok A: pilih makna rantai dan sikap saat pemilihan ketua kelas.",
          "Kelompok B: cocokkan pohon beringin, bintang, serta padi dan kapas dengan bunyi silanya.",
        ],
        [
          "Kelompok C: bendera kita merah dan putih. Jika kotor atau jatuh ke tanah, ambil dengan hormat, bersihkan, dan beritahu guru atau orang tua.",
        ],
      ],
    },
  ],
};
