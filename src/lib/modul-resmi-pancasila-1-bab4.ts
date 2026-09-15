import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_PANCASILA1_BAB4 = "Bab 4: Aku dan Lingkunganku";

export const MODUL_PANCASILA1_BAB4: ModulResmiPai = {
  id: "pancasila-1-bab4",
  judul: JUDUL_PANCASILA1_BAB4,
  pola: /aku dan lingkunganku|lingkunganku|aksi hijau wangi/,
  motivasi:
    "Lingkungan milik kita bersama. Buang sampah pada tempatnya dan gotong royong.",
  kunciJawaban: "B,B,B,A,A,C,B,A,C,B",
  sketsaKartu: [
    "Made mencegah Ali membuang plastik ke selokan di taman sekolah.",
    "Infografis aksi hijau: kamar, kelas, taman dan akibat jika diabaikan.",
    "Siswa operasi semut memilah sampah organik dan anorganik.",
    "Anak mengerjakan lembar evaluasi tentang tanggung jawab lingkungan.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Meja belajar penuh coretan spidol dan sisa rautan pensil. Tindakan yang mencerminkan tanggung jawab adalah...
A) Menutup meja dengan kain agar coretannya tidak terlihat ibu.
B) Membersihkan meja sampai rapi dan membuang sampah ke tempat sampah.
C) Meninggalkannya karena besok akan menggambar lagi.
D) Menyalahkan adik yang lewat dekat meja.`,
    `[Soal 2 - PG - Tipe: HOTS]
Di taman kota tertulis: Jagalah Kebersihan, Dilarang Menginjak Rumput. Mengapa kita harus mematuhinya?
A) Agar kita tidak didenda uang oleh petugas taman.
B) Agar rumput tetap subur, indah, dan taman tidak rusak untuk pengunjung lain.
C) Karena rumput beracun jika disentuh tangan.
D) Supaya taman ditutup untuk umum.`,
    `[Soal 3 - PG - Tipe: HOTS]
Sebab: semua siswa malas piket kebersihan kelas. Akibat paling logis adalah...
A) Nilai rapor siswa akan turun semua.
B) Ruang kelas menjadi kotor, bau, dan tidak nyaman untuk belajar.
C) Guru akan memindahkan kelas ke lapangan.
D) Sekolah diliburkan seminggu.`,
    `[Soal 4 - PG - Tipe: HOTS]
Sebab: keluarga rajin bergotong royong membersihkan selokan. Akibat yang dirasakan adalah...
A) Rumah aman dari banjir saat musim hujan.
B) Rumah menjadi tempat bermain yang sempit.
C) Air selokan bisa digunakan untuk minum.
D) Tetangga marah karena air habis.`,
    `[Soal 5 - PG - Tipe: Reguler]
Membuang sampah di tempat sampah mencerminkan nilai Pancasila karena...
A) Menjaga kebersihan bersama, gotong royong, dan peduli orang lain.
B) Membuat kita terkenal di media sosial.
C) Guru memberi uang saku tambahan.
D) Sampah akan hilang sendiri.`,
    `[Soal 6 - PG - Tipe: Reguler]
Ali hendak membuang plastik ke selokan. Bahayanya adalah...
A) Plastik langsung hilang dan tidak masalah.
B) Ikan di selokan menjadi kenyang.
C) Plastik menyumbat saluran air sehingga bisa banjir.
D) Sekolah menjadi lebih wangi.`,
    `[Soal 7 - PG - Tipe: Reguler]
Tanggung jawab di kamar tidur adalah...
A) Membiarkan selimut berantakan.
B) Merapikan selimut.
C) Membuang baju ke halaman.
D) Menyimpan makanan di bawah bantal.`,
    `[Soal 8 - PG - Tipe: Reguler]
Jika kita memetik bunga di taman sekolah, akibatnya...
A) Tanaman layu dan rusak.
B) Taman menjadi lebih indah.
C) Bunga tumbuh lebih cepat.
D) Guru memberi piala.`,
    `[Soal 9 - PG - Tipe: HOTS]
Mengapa kerja membersihkan kelas terasa lebih cepat jika gotong royong?
A) Karena hanya satu anak yang bekerja.
B) Karena guru mengerjakan semuanya.
C) Karena pekerjaan dibagi, semua membantu, sehingga selesai lebih ringan.
D) Karena kelas dikunci.`,
    `[Soal 10 - PG - Tipe: Reguler]
Menjaga fasilitas umum adalah...
A) Hak orang kaya saja.
B) Kewajiban kewarganegaraan kita semua.
C) Tugas satpam semata.
D) Boleh diabaikan jika lelah.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog di Taman Sekolah",
      pengantar:
        "Di taman sekolah setelah kerja bakti. Made melihat Ali hendak membuang bungkus plastik makanannya ke dalam selokan.",
      labelDaftar: "Percakapan Made dan Ali",
      kolom: 1,
      item: [
        {
          nama: "Jangan buang plastik ke selokan",
          singkat: "Plastik tidak hilang",
          uraian:
            "Ali pikir air akan membawa plastik pergi. Made mengingatkan: plastik tidak hilang, melainkan menyumbat saluran di hilir.",
          contoh: "Plastik menyumbat selokan.",
        },
        {
          nama: "Akibat hujan deras",
          singkat: "Bisa banjir",
          uraian:
            "Jika hujan deras, air selokan meluap dan sekolah bisa banjir. Lingkungan milik kita bersama.",
          contoh: "Sekolah bisa banjir.",
        },
        {
          nama: "Warga negara yang baik",
          singkat: "Jaga kebersihan",
          uraian:
            "Jika merusak lingkungan di sini, teman di tempat lain juga terkena akibatnya. Menjaga kebersihan adalah tugas warga negara yang baik.",
          contoh: "Jaga lingkungan bersama.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Ali hendak membuang plastik ke mana?",
          alias: ["selokan", "saluran air", "got"],
        },
        {
          pertanyaan: "2. Plastik di selokan bisa menyebabkan apa saat hujan?",
          alias: ["banjir", "meluap", "air meluap"],
        },
        {
          pertanyaan: "3. Menjaga kebersihan adalah tugas kita sebagai apa?",
          alias: ["warga negara", "warga negara yang baik", "warga"],
        },
      ],
      voice: [
        [
          "Setelah kerja bakti, Made melihat Ali hendak membuang plastik ke selokan. Made berkata, tunggu dulu, jangan lempar plastik itu ke selokan!",
          "Ali pikir air akan membawa plastik pergi. Made menjelaskan, plastik tidak hilang. Ia menyumbat saluran. Kalau hujan deras, sekolah bisa banjir.",
        ],
        [
          "Ali sadar, lingkungan milik kita bersama. Jika merusaknya di sini, teman di tempat lain juga terkena akibatnya. Menjaga kebersihan adalah tugas warga negara yang baik.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Aksi Hijau Wangi",
      pengantar:
        "Rumah dan sekolah adalah ruang hidup pertama. Gotong royong menjaga kebersihan adalah pengamalan sila ke-3 dan ke-5. Sampah sembarangan berakibat pada kesehatan, keindahan, dan bencana.",
      labelDaftar: "Lingkunganku, Tanggung Jawabku, Jika Diabaikan",
      kolom: 1,
      item: [
        {
          nama: "Kamar tidur",
          singkat: "Merapikan selimut",
          uraian: "Jika diabaikan, kamar menjadi sarang nyamuk.",
          contoh: "Rapikan selimut setiap pagi.",
        },
        {
          nama: "Ruang kelas",
          singkat: "Melaksanakan piket",
          uraian: "Jika diabaikan, belajar tidak nyaman.",
          contoh: "Piket sesuai jadwal.",
        },
        {
          nama: "Taman sekolah",
          singkat: "Tidak memetik bunga",
          uraian: "Jika diabaikan, tanaman layu dan rusak.",
          contoh: "Pandang, jangan petik.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Jika selimut tidak dirapikan, kamar menjadi sarang apa?",
          alias: ["nyamuk", "sarang nyamuk"],
        },
        {
          pertanyaan: "2. Jika piket diabaikan, belajar menjadi apa?",
          alias: ["tidak nyaman", "kotor", "tidak enak"],
        },
        {
          pertanyaan: "3. Mengapa kerja gotong royong terasa lebih cepat?",
          alias: ["bersama", "dibagi", "semua membantu", "ringan", "banyak orang"],
        },
      ],
      voice: [
        [
          "Rumah dan sekolah adalah ruang hidup kita. Rapikan selimut di kamar. Laksanakan piket di kelas. Jangan memetik bunga di taman.",
          "Jika diabaikan, kamar jadi sarang nyamuk, kelas tidak nyaman, dan tanaman layu.",
        ],
        [
          "Mengapa kerja membersihkan kelas terasa lebih cepat jika gotong royong? Karena pekerjaan dibagi. Semua membantu. Selesai lebih ringan.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Operasi Semut di Sekolah dan di Rumah",
      pengantar:
        "Peduli lingkungan dipraktikkan dengan aksi nyata. Di sekolah kita operasi semut. Di rumah kita kerja bakti.",
      labelDaftar: "Dua Tempat Berlatih",
      kolom: 2,
      item: [
        {
          nama: "Operasi Semut",
          singkat: "Untuk guru",
          uraian:
            "Guru mengajak siswa keluar kelas selama 10 menit memungut sampah plastik di taman secara berkelompok. Kelompok yang memilah organik dan anorganik dengan benar mendapat apresiasi piala ramah lingkungan.",
          contoh: "Pungut dan pilah sampah.",
        },
        {
          nama: "Kerja bakti Minggu",
          singkat: "Untuk orang tua",
          uraian:
            "Ajak anak kerja bakti membersihkan rumah di hari Minggu. Beri tanggung jawab spesifik yang aman, misalnya mengelap meja atau menyiram tanaman.",
          contoh: "Mengelap meja atau menyiram tanaman.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Operasi semut memungut apa di taman?",
          alias: ["sampah", "sampah plastik", "plastik"],
        },
        {
          pertanyaan: "2. Sampah dipilah menjadi apa?",
          alias: ["organik dan anorganik", "organik", "anorganik", "dua jenis"],
        },
        {
          pertanyaan: "3. Di rumah, anak bisa mendapat tugas apa?",
          alias: ["mengelap", "menyiram", "mengelap meja", "menyiram tanaman"],
        },
      ],
      voice: [
        [
          "Di sekolah, kita Operasi Semut. Keluar kelas sepuluh menit. Pungut sampah plastik di taman. Pilah organik dan anorganik. Kelompok yang benar mendapat piala ramah lingkungan.",
        ],
        [
          "Di rumah pada hari Minggu, kerja bakti bersama. Anak bisa mengelap meja atau menyiram tanaman. Tugas kecil yang aman tetap penting.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Saatnya menunjukkan tanggung jawab pada lingkungan. Pilih tindakan terbaik, pilih akibat yang logis, lalu jelaskan kaitan sampah dengan Pancasila.",
      labelDaftar: "Tiga Kelompok Soal",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Pilihan ganda HOTS",
          uraian:
            "Pilih tindakan saat meja penuh coretan, dan alasan mematuhi larangan menginjak rumput.",
          contoh: "Bersihkan meja, jaga rumput tetap subur.",
        },
        {
          nama: "Kelompok B",
          singkat: "Sebab-akibat",
          uraian:
            "Malas piket membuat kelas kotor dan bau. Gotong royong membersihkan selokan membuat rumah aman dari banjir.",
          contoh: "Piket: kelas nyaman. Selokan: aman banjir.",
        },
        {
          nama: "Kelompok C",
          singkat: "Esai penalaran",
          uraian:
            "Jelaskan mengapa membuang sampah di tempatnya mencerminkan nilai Pancasila: peduli bersama, gotong royong, dan tidak merugikan orang lain.",
          contoh: "Sampah pada tempatnya = peduli teman.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Meja penuh coretan. Sikap bertanggung jawab?",
          alias: ["membersihkan", "bersihkan", "buang sampah", "rapikan"],
        },
        {
          pertanyaan: "2. Mengapa tidak boleh menginjak rumput taman?",
          alias: ["subur", "indah", "jangan rusak", "pengunjung lain"],
        },
        {
          pertanyaan: "3. Jika malas piket, kelas menjadi apa?",
          alias: ["kotor", "bau", "tidak nyaman", "kotor dan bau"],
        },
        {
          pertanyaan: "4. Membersihkan selokan membuat rumah aman dari apa?",
          alias: ["banjir", "air bah", "genangan"],
        },
        {
          pertanyaan: "5. Membuang sampah pada tempatnya mencerminkan nilai apa?",
          alias: ["pancasila", "gotong royong", "peduli", "kebersihan"],
        },
      ],
      voice: [
        [
          "Ini lembar evaluasi. Kelompok A: pilih tindakan saat meja kotor dan alasan menjaga rumput taman.",
          "Kelompok B: pilih akibat jika malas piket, dan akibat jika keluarga membersihkan selokan.",
        ],
        [
          "Kelompok C: mengapa membuang sampah di tempat sampah mencerminkan Pancasila? Karena kita peduli kebersihan bersama, bergotong royong, dan tidak merugikan teman lain.",
        ],
      ],
    },
  ],
};
