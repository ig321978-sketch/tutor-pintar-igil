import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_BINDO1_BAB3 = "Bab 3: Awas Kuman!";

export const MODUL_BINDO1_BAB3: ModulResmiPai = {
  id: "bindo-1-bab3",
  judul: JUDUL_BINDO1_BAB3,
  pola: /awas kuman/,
  motivasi:
    "Kuman tidak terlihat, tetapi bisa membuat perut sakit. Cuci tangan, potong kuku, sikat gigi. Membaca suku kata Ka-Ki-Ku-Ke-Ko sambil merawat tubuh.",
  kunciJawaban: "B,B,A,C,B,A,B,C,A,B",
  sketsaKartu: [
    "Ali hendak makan roti berkotoran tanah, Nia menahan di depan wastafel sekolah.",
    "Kartu suku kata K: kaki, kijang, kuku, kera, kotak.",
    "Praktik cuci tangan enam langkah dan merawat kuku serta gigi di rumah.",
    "Siswa menilai sebab-akibat kesehatan: cuci tangan, potong kuku, membaca di tempat terang.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Mengapa kita diwajibkan mencuci tangan menggunakan sabun setelah selesai bermain di halaman sekolah?
A) Supaya tangan kita menjadi wangi buah-buahan dan berwarna putih bersih.
B) Agar kuman berbahaya yang menempel mati sehingga tubuh kita terhindar dari penyakit perut.
C) Karena air keran tidak bisa mengalir jika tidak diberi sabun.
D) Supaya bel istirahat berbunyi lebih nyaring.`,
    `[Soal 2 - PG - Tipe: HOTS]
Kuman tidak terlihat oleh mata. Sikap paling bijak sebelum makan roti setelah bermain tanah adalah...
A) Langsung makan karena rotinya masih bersih.
B) Mencuci tangan memakai sabun, lalu baru makan.
C) Meniup tangan tiga kali.
D) Menyimpan roti di saku.`,
    `[Soal 3 - PG - Tipe: Reguler]
Kata ka-ki diurai menjadi suku kata...
A) Ka-ki
B) Ki-ka
C) Ku-ki
D) Ke-ki`,
    `[Soal 4 - PG - Tipe: Reguler]
Kata ku-ku paling tepat merujuk pada...
A) Tempat menyimpan pensil.
B) Hewan di hutan.
C) Bagian ujung jari yang perlu dipotong jika panjang.
D) Minuman manis.`,
    `[Soal 5 - PG - Tipe: Reguler]
Bunyi /k/ pada awal kata kaki, kijang, dan kotak adalah bunyi...
A) Hidung.
B) Konsonan yang keluar dari belakang lidah.
C) Vokal a i u e o.
D) Bunyi petir.`,
    `[Soal 6 - PG - Tipe: Reguler]
Membaca buku di ruangan yang redup atau gelap dapat...
A) Mengganggu kesehatan mata.
B) Membuat kuman di tangan mati.
C) Memotong kuku lebih cepat.
D) Membuat roti lebih bersih.`,
    `[Soal 7 - PG - Tipe: Reguler]
Kata ke-ra dan ko-tak huruf awalnya sama, yaitu...
A) R
B) K
C) T
D) E`,
    `[Soal 8 - PG - Tipe: Reguler]
Sikat gigi dilakukan agar...
A) Kuman di halaman sekolah hilang.
B) Tali sepatu tidak lepas.
C) Gigi bersih dan mulut sehat.
D) Bel sekolah berbunyi.`,
    `[Soal 9 - PG - Tipe: HOTS]
Jika kuku jari terlalu panjang dan kotor, kuman lebih mudah...
A) Bersembunyi dan terbawa ke mulut saat makan.
B) Menjadi teman bermain.
C) Membuat buku lebih rapi.
D) Menyanyi di kelas.`,
    `[Soal 10 - PG - Tipe: Reguler]
Kata ki-jang diurai menjadi...
A) Ka-jang
B) Ki-jang
C) Ku-jang
D) Ko-jang`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog di Depan Wastafel",
      pengantar:
        "Di depan wastafel sekolah. Ali langsung mengambil roti setelah bermain tanah tanpa mencuci tangan. Nia menahannya.",
      labelDaftar: "Percakapan Ali dan Nia tentang kuman",
      kolom: 1,
      item: [
        {
          nama: "Tangan kotor",
          singkat: "Tanah kering",
          uraian:
            "Ali pikir tanah kering tidak apa-apa dan rotinya masih bersih. Nia mengingatkan: jangan makan dengan tangan kotor.",
          contoh: "Cuci tangan dulu sebelum makan.",
        },
        {
          nama: "Ku-man",
          singkat: "Tidak terlihat",
          uraian:
            "Di tanah ada banyak kuman kecil tersembunyi. Kuman tidak terlihat. Kalau tertelan, perut bisa sakit.",
          contoh: "Kuman tersembunyi di tanah.",
        },
        {
          nama: "Sabun mengusir kuman",
          singkat: "Monster kecil",
          uraian:
            "Mencuci tangan pakai sabun seperti mengusir monster kuman. Tangan bersih, perut aman.",
          contoh: "Air dan sabun, gosok sampai bersih.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Mengapa Nia menahan Ali makan roti?",
          alias: ["tangan kotor", "tanah", "kuman", "cuci"],
        },
        {
          pertanyaan: "2. Kuman di tanah kelihatan tidak?",
          alias: ["tidak", "tidak terlihat", "tersembunyi", "halus"],
        },
        {
          pertanyaan: "3. Mencuci tangan pakai sabun seperti mengusir apa?",
          alias: ["kuman", "monster", "monster kuman"],
        },
      ],
      voice: [
        [
          "Di depan wastafel, Ali hendak makan roti setelah bermain tanah. Nia berkata, Ali, tunggu! Jangan langsung makan roti itu dengan tangan yang kotor!",
          "Ali bertanya, Kenapa, Nia? Tanganku hanya terkena sedikit tanah kering kok, rotinya masih bersih.",
        ],
        [
          "Nia menjelaskan, Di tanah itu ada banyak ku-man kecil tersembunyi. Kuman itu tidak terlihat oleh mata kita. Kalau tertelan, perutmu bisa sakit!",
          "Ali kaget. Hii, seram sekali! Jadi, mencuci tangan pakai sabun itu seperti mengusir monster kuman ya?",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Suku Kata Ka Ki Ku Ke Ko",
      pengantar:
        "Latih artikulasi vokal dan konsonan /k/ pada posisi awal kata: ka-ki, ki-jang, ku-ku, ke-ra, ko-tak. Teks diarahkan pada kebersihan diri: potong kuku, sikat gigi, cuci tangan. Anak belajar sebab-akibat kesehatan.",
      labelDaftar: "Suku kata K dan literasi kesehatan",
      kolom: 1,
      item: [
        {
          nama: "Ka-ki dan ki-jang",
          singkat: "Tubuh dan hewan",
          uraian: "Ka-ki adalah bagian tubuh untuk berjalan. Ki-jang adalah hewan. Keduanya berawalan /k/.",
          contoh: "Ka-ki, ki-jang.",
        },
        {
          nama: "Ku-ku",
          singkat: "Jaga bersih",
          uraian: "Ku-ku di ujung jari. Kuku panjang dan kotor menjadi rumah kuman. Potong kuku secara teratur, jangan hanya sebulan sekali jika sudah panjang.",
          contoh: "Potong kuku, cuci tangan.",
        },
        {
          nama: "Ke-ra dan ko-tak",
          singkat: "Hewan dan benda",
          uraian: "Ke-ra hewan. Ko-tak wadah. Urai: ke-ra, ko-tak. Setelah bermain, simpan mainan di kotak dan cuci tangan.",
          contoh: "Ke-ra, ko-tak.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Sebut satu kata berawalan ka.",
          alias: ["kaki", "ka-ki", "kaca", "kamar"],
        },
        {
          pertanyaan: "2. Mengapa kuku panjang perlu dipotong?",
          alias: ["kuman", "kotor", "bersih", "sakit"],
        },
        {
          pertanyaan: "3. Setelah bermain tanah, kita harus apa sebelum makan?",
          alias: ["cuci tangan", "sabun", "cuci", "wastafel"],
        },
      ],
      voice: [
        [
          "Suku kata K: ka-ki, ki-jang, ku-ku, ke-ra, ko-tak. Bunyi /k/ di awal kata, jelas dan tegas.",
        ],
        [
          "Kuman tidak kelihatan. Potong kuku, sikat gigi, cuci tangan pakai sabun. Kalau kuman tertelan, perut bisa sakit.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Cuci Tangan di Sekolah dan di Rumah",
      pengantar:
        "Membaca dan menulis suku kata K dipraktikkan lewat gerakan sehat. Anak membaca langkah, lalu melakukannya sendiri.",
      labelDaftar: "Dua tempat berlatih",
      kolom: 2,
      item: [
        {
          nama: "Enam langkah cuci tangan",
          singkat: "Untuk guru",
          uraian:
            "Baca bersama: basahi, sabun, gosok punggung, sela jari, kuku, bilas, keringkan. Setiap langkah ditulis suku kata pendek di papan, lalu dipraktikkan di wastafel.",
          contoh: "Gosok, bilas, keringkan.",
        },
        {
          nama: "Kuku dan gigi malam hari",
          singkat: "Untuk orang tua",
          uraian:
            "Periksa kuku anak. Jika panjang atau kotor, potong. Sikat gigi malam sebelum tidur. Tanyakan: mengapa kita cuci tangan sebelum makan?",
          contoh: "Potong kuku. Sikat gigi. Cuci tangan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Mencuci tangan memakai apa selain air?",
          alias: ["sabun"],
        },
        {
          pertanyaan: "2. Kuku yang panjang sebaiknya apa?",
          alias: ["potong", "dipotong", "pendek"],
        },
        {
          pertanyaan: "3. Sikat gigi dilakukan agar apa yang bersih?",
          alias: ["gigi", "mulut"],
        },
      ],
      voice: [
        [
          "Di sekolah, baca langkah cuci tangan lalu praktik di wastafel. Basahi, sabun, gosok, bilas, keringkan.",
        ],
        [
          "Di rumah, potong kuku jika panjang. Sikat gigi malam hari. Cuci tangan sebelum makan supaya kuman tidak tertelan.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Saatnya menilai kasus kesehatan. Pilih alasan mencuci tangan yang tepat, lalu tentukan benar atau salah beserta alasan.",
      labelDaftar: "Pilihan ganda dan benar-salah",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Pilihan ganda kasus",
          uraian:
            "Cuci tangan pakai sabun setelah bermain supaya kuman berbahaya mati dan tubuh terhindar dari penyakit perut.",
          contoh: "Sabun mematikan kuman, bukan hanya agar wangi.",
        },
        {
          nama: "Kelompok B",
          singkat: "Benar atau salah",
          uraian:
            "Memotong kuku hanya sebulan sekali saja adalah kurang tepat jika kuku sudah panjang. Membaca di ruang redup dapat mengganggu kesehatan mata.",
          contoh: "Kuku dipotong saat panjang. Baca di tempat terang.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Mengapa cuci tangan pakai sabun setelah bermain?",
          alias: ["kuman", "penyakit", "perut", "mati", "sabun"],
        },
        {
          pertanyaan: "2. Potong kuku hanya sebulan sekali. Benar atau salah?",
          alias: ["salah", "tidak", "panjang"],
        },
        {
          pertanyaan: "3. Membaca di ruang gelap mengganggu mata. Benar atau salah?",
          alias: ["benar", "betul", "iya", "mata"],
        },
      ],
      voice: [
        [
          "Kelompok A: cuci tangan pakai sabun setelah bermain supaya kuman mati dan perut tidak sakit.",
        ],
        [
          "Kelompok B: kuku dipotong ketika panjang, bukan hanya sebulan sekali. Membaca di tempat gelap mengganggu mata. Itu benar.",
        ],
      ],
    },
  ],
};
