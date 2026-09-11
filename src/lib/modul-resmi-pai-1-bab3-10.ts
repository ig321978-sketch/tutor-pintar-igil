import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const MODUL_PAI1_BAB3_10: ModulResmiPai[] = [
  {
    id: "pai-1-bab3",
    judul: "Bab 3: Perilaku Terpuji (Akhlak Mulia)",
    pola: /perilaku\s+terpuji|akhlak\s+mulia|basmalah|hamdalah/,
    motivasi: "Ayo mulai dengan Basmalah, tutup dengan Hamdalah, dan sayangi keluarga serta teman.",
    kunciJawaban: "B,C,A,B,C,A,B,C,A,B",
    sketsaKartu: [
      "Anak membaca Basmalah sebelum makan.",
      "Anak mengucapkan Hamdalah setelah belajar.",
      "Anak mencium tangan orang tua.",
      "Dua anak berbagi mainan di halaman.",
    ],
    latihan: pg([
      `[Soal 1 - PG - Tipe: Reguler]
Basmalah diucapkan ketika...
A) Tidur saja
B) Memulai kegiatan
C) Marah
D) Bertengkar`,
      `[Soal 2 - PG - Tipe: Reguler]
Bacaan Basmalah adalah...
A) Alhamdulillah
B) Subhanallah
C) Bismillahirrahmanirrahim
D) Allhu akbar`,
      `[Soal 3 - PG - Tipe: Reguler]
Hamdalah diucapkan sebagai rasa...
A) Syukur
B) Marah
C) Takut
D) Malas`,
      `[Soal 4 - PG - Tipe: Reguler]
Anak yang salih kepada orang tua harus...
A) Membantah
B) Menghormati
C) Membentak
D) Melupakan`,
      `[Soal 5 - PG - Tipe: Reguler]
Kepada guru, kita harus...
A) Acuh
B) Mengejek
C) Mendengarkan nasihat
D) Ribut`,
      `[Soal 6 - PG - Tipe: Reguler]
Dengan teman, kita sebaiknya...
A) Berbagi mainan
B) Merebut
C) Memukul
D) Mengucilkan`,
      `[Soal 7 - PG - Tipe: Reguler]
Setelah selesai makan, ucapan yang tepat adalah...
A) Basmalah
B) Hamdalah
C) Diam
D) Marah`,
      `[Soal 8 - PG - Tipe: HOTS]
Teman tidak punya pensil. Akhlak mulia yang tepat adalah...
A) Tertawa
B) Menyembunyikan pensil
C) Meminjamkan pensil
D) Menyuruhnya pulang`,
      `[Soal 9 - PG - Tipe: HOTS]
Anak lupa Basmalah lalu ingat di tengah makan. Sikap terbaik adalah...
A) Melanjutkan sambil mengucap Basmalah
B) Membuang makanan
C) Marah pada diri sendiri
D) Berhenti selamanya`,
      `[Soal 10 - PG - Tipe: HOTS]
Hamdalah yang benar terlihat jika kita...
A) Hanya mengucap, lalu merusak mainan
B) Bersyukur dan merawat pemberian
C) Meminta terus tanpa terima kasih
D) Menyembunyikan rezeki dari teman`,
    ]),
    kartu: [
      {
        kode: "A",
        judul: "A. Membaca Basmalah dan Hamdalah",
        pengantar:
          "Sebelum memulai kegiatan, kita mengetuk pintu kebaikan dengan Basmalah. Setelah selesai, kita mengucapkan terima kasih kepada Allah dengan Hamdalah. Dua ucapan ini seperti tombol mulai dan tombol selesai pada hati yang sopan.",
        labelDaftar: "Dua Ucapan Mulia",
        kolom: 2,
        item: [
          {
            nama: "Basmalah",
            latin: "Bismillahirrahmanirrahim",
            singkat: "Tombol mulai",
            uraian:
              "Artinya: dengan nama Allah Yang Maha Pengasih, Maha Penyayang. Kita mengucapkannya sebelum makan, belajar, bermain, dan kegiatan baik lainnya supaya langkah kita diingat sebagai niat yang bersih.",
            contoh: "Sebelum membuka buku, kita membaca Basmalah.",
          },
          {
            nama: "Hamdalah",
            latin: "Alhamdulillahirabbil 'aalamiin",
            singkat: "Tombol syukur",
            uraian:
              "Artinya: segala puji bagi Allah, Tuhan semesta alam. Kita mengucapkannya setelah selesai berkegiatan sebagai rasa syukur, bukan karena terpaksa.",
            contoh: "Setelah makan kenyang, kita mengucapkan Hamdalah.",
          },
        ],
        kuis: [
          {
            pertanyaan: "1. Sebutkan bacaan Basmalah.",
            alias: ["bismillah", "bismillahirrahmanirrahim", "bismillahirrahmanirrahim"],
          },
          {
            pertanyaan: "2. Hamdalah diucapkan sebagai rasa apa?",
            alias: ["syukur", "terima kasih", "bersyukur"],
          },
          {
            pertanyaan: "3. Basmalah dibaca sebelum atau sesudah kegiatan?",
            alias: ["sebelum", "sebelum kegiatan", "awal"],
          },
        ],
        voice: [
          [
            "Anak-anak, setiap permainan punya tombol mulai. Hati kita juga punya tombol mulai. Namanya Basmalah.",
            "Sebelum makan, belajar, atau bermain, kita membaca Bismillahirrahmanirrahim. Artinya, kita memulai dengan nama Allah Yang Maha Pengasih, Maha Penyayang.",
            "Kalau kita lupa menekan tombol mulai, permainan bisa kacau. Kalau kita lupa Basmalah, niat kita mudah berubah jadi tergesa-gesa.",
            "Setelah selesai, ada tombol syukur. Namanya Hamdalah. Kita mengucapkan Alhamdulillahirabbil alamin. Artinya, segala puji bagi Allah, Tuhan semesta alam.",
            "Hamdalah bukan sekadar kata penutup. Itu cara kita bilang terima kasih kepada Allah karena kegiatan tadi diberi kekuatan dan keselamatan.",
          ],
          [
            "Kalau anak makan sampai kenyang, lalu langsung lari tanpa Hamdalah, kira-kira hatinya sudah berterima kasih atau masih terburu-buru? Masih terburu-buru. Jadi, mulai dengan Basmalah, selesai dengan Hamdalah.",
          ],
        ],
      },
      {
        kode: "B",
        judul: "B. Sayang kepada Keluarga dan Teman",
        pengantar:
          "Anak yang salih selalu menyayangi sesama. Kasih sayang itu seperti lampu: kalau menyala di rumah, hangat. Kalau dibawa ke sekolah, teman merasa aman.",
        labelDaftar: "Dua Lingkaran Kasih",
        kolom: 2,
        item: [
          {
            nama: "Sayang kepada keluarga dan guru",
            singkat: "Hormat dan patuh yang lembut",
            uraian:
              "Kita menghormati orang tua dan mendengarkan nasihat guru. Hormat bukan takut dibentak, tetapi percaya bahwa mereka menjaga kita.",
            contoh: "Menjawab dengan suara sopan ketika dipanggil ibu atau ayah.",
          },
          {
            nama: "Sayang kepada teman",
            singkat: "Berbagi, bukan bertengkar",
            uraian:
              "Kita berbagi mainan dan tidak boleh bertengkar. Kalau berselisih, kita bicara, meminta maaf, lalu bermain lagi.",
            contoh: "Giliran ayunan dibagi, bukan direbut.",
          },
        ],
        kuis: [
          {
            pertanyaan: "1. Kepada orang tua kita harus apa?",
            alias: ["menghormati", "hormat", "patuh", "mendengarkan"],
          },
          {
            pertanyaan: "2. Kepada teman kita tidak boleh apa?",
            alias: ["bertengkar", "ribut", "memukul", "merebut"],
          },
          {
            pertanyaan: "3. Mainan sebaiknya apa dengan teman?",
            alias: ["berbagi", "bagi", "dipinjamkan", "giliran"],
          },
        ],
        voice: [
          [
            "Anak-anak, kasih sayang itu seperti lampu. Di rumah, lampu itu menyinari ayah, ibu, dan adik. Di sekolah, lampu itu menyinari guru dan teman.",
            "Anak yang salih menghormati orang tua. Kalau dipanggil, kita jawab. Kalau dinasihati, kita dengarkan, bukan membanting pintu.",
            "Guru adalah penjaga ilmu. Mendengarkan nasihat guru artinya kita menjaga keselamatan diri dan teman.",
            "Dengan teman, kita berbagi mainan. Bertengkar membuat hati panas, seperti lampu yang meledak. Berbagi membuat hati terang.",
          ],
          [
            "Kalau ada satu bola dan dua anak, kira-kira akhlak mulia memilih merebut atau bergiliran? Bergiliran. Itu kasih sayang yang kelihatan.",
          ],
        ],
      },
    ],
  },
  {
    id: "pai-1-bab4",
    judul: "Bab 4: Mengenal Bersuci (Thaharah)",
    pola: /bersuci|thaharah|taharah/,
    motivasi: "Ayo suci dan bersih: Allah mencintai anak yang menjaga badan, pakaian, dan tempat.",
    kunciJawaban: "B,A,C,B,A,C,B,A,C,B",
    sketsaKartu: [
      "Anak mencuci tangan dengan sabun.",
      "Anak mandi hingga bersih.",
      "Anak berwudu di kran sekolah.",
      "Kamar mandi yang bersih dan rapi.",
    ],
    latihan: pg([
      `[Soal 1 - PG - Tipe: Reguler]
Bersuci dalam Islam disebut...
A) Olahraga
B) Thaharah
C) Bernyanyi
D) Berkebun`,
      `[Soal 2 - PG - Tipe: Reguler]
Thaharah artinya membersihkan...
A) Badan, pakaian, dan tempat
B) Hanya mainan
C) Hanya buku
D) Hanya tas`,
      `[Soal 3 - PG - Tipe: Reguler]
Allah mencintai anak yang...
A) Kotor
B) Ceroboh
C) Bersih dan suci
D) Membuang sampah sembarangan`,
      `[Soal 4 - PG - Tipe: Reguler]
Membersihkan seluruh tubuh dengan air dan sabun disebut...
A) Istinja
B) Mandi
C) Tidur
D) Lari`,
      `[Soal 5 - PG - Tipe: Reguler]
Membersihkan diri setelah buang air disebut...
A) Istinja
B) Nyanyi
C) Tidur
D) Makan`,
      `[Soal 6 - PG - Tipe: Reguler]
Bersuci dengan air sebelum salat disebut...
A) Tidur
B) Istinja
C) Wudu
D) Lari`,
      `[Soal 7 - PG - Tipe: Reguler]
Mandi membuat tubuh...
A) Kotor
B) Sehat dan bersih
C) Lapar
D) Marah`,
      `[Soal 8 - PG - Tipe: HOTS]
Pakaian kena lumpur lalu dipakai salat. Sikap terbaik adalah...
A) Diganti atau dibersihkan dulu
B) Dibiarkan
C) Ditambah lumpur
D) Disembunyikan`,
      `[Soal 9 - PG - Tipe: HOTS]
Tempat wudu kotor. Thaharah yang lengkap juga menjaga...
A) Hanya muka
B) Hanya tangan
C) Tempat supaya bersih
D) Hanya sepatu`,
      `[Soal 10 - PG - Tipe: HOTS]
Anak sudah mandi tetapi tidak istinja setelah buang air. Bersucinya...
A) Sudah sempurna
B) Belum lengkap
C) Tidak perlu
D) Diganti nyanyi`,
    ]),
    kartu: [
      {
        kode: "A",
        judul: "A. Arti Bersuci",
        pengantar:
          "Bersuci artinya membersihkan badan, pakaian, dan tempat dari kotoran. Dalam Islam, bersuci disebut Thaharah. Allah mencintai anak yang bersih dan suci, karena hati yang rapi lebih mudah berbuat baik.",
        labelDaftar: "Tiga Hal yang Disucikan",
        kolom: 3,
        item: [
          {
            nama: "Badan",
            uraian:
              "Kulit, tangan, kaki, dan gigi dijaga agar kuman tidak bersembunyi. Badan bersih membuat kita nyaman belajar dan beribadah.",
            contoh: "Cuci tangan pakai sabun sebelum makan.",
          },
          {
            nama: "Pakaian",
            uraian:
              "Baju yang kotor seperti kaca berdebu: masih bisa dipakai, tetapi tampilannya dan rasanya tidak nyaman. Pakaian suci membuat salat lebih tertib.",
            contoh: "Ganti baju yang terkena lumpur sebelum masuk masjid.",
          },
          {
            nama: "Tempat",
            uraian:
              "Lantai, kamar mandi, dan tempat wudu adalah rumah bersama. Menjaganya termasuk thaharah, bukan pekerjaan orang lain saja.",
            contoh: "Tidak meninggalkan tisu basah di lantai.",
          },
        ],
        kuis: [
          {
            pertanyaan: "1. Bersuci dalam Islam disebut apa?",
            alias: ["thaharah", "taharah", "taharah", "bersuci"],
          },
          {
            pertanyaan: "2. Selain badan, apa lagi yang dibersihkan?",
            alias: ["pakaian", "tempat", "baju", "rumah"],
          },
          {
            pertanyaan: "3. Allah mencintai anak yang seperti apa?",
            alias: ["bersih", "suci", "bersih dan suci"],
          },
        ],
        voice: [
          [
            "Anak-anak, kaca yang berdebu tetap kaca, tetapi pemandangannya kabur. Badan, pakaian, dan tempat yang kotor membuat ibadah terasa kabur.",
            "Bersuci artinya membersihkan kotoran. Dalam Islam namanya Thaharah.",
            "Allah mencintai anak yang bersih dan suci. Bukan karena wangi parfum mahal, tetapi karena menjaga amanah tubuh dan lingkungan.",
            "Thaharah punya tiga rumah: badan, pakaian, dan tempat. Kalau satu rumah kotor, rasa nyaman berkurang.",
          ],
          [
            "Kalau tangan sudah dicuci, tetapi lantai tempat salat penuh sampah, kira-kira thaharahnya sudah utuh atau masih bolong? Masih bolong. Bersuci itu menjaga tiga rumah sekaligus.",
          ],
        ],
      },
      {
        kode: "B",
        judul: "B. Macam-Macam Bersuci",
        pengantar:
          "Ada beberapa cara bersuci yang harus dikenali anak. Tiga yang paling dekat dengan kehidupan sehari-hari adalah mandi, istinja, dan wudu.",
        labelDaftar: "Tiga Cara Bersuci",
        kolom: 3,
        item: [
          {
            nomor: 1,
            nama: "Mandi",
            uraian:
              "Membersihkan seluruh tubuh dengan air bersih dan sabun agar sehat. Mandi mencuci debu, keringat, dan kuman yang tidak kelihatan.",
            contoh: "Mandi setelah bermain bola di lapangan.",
          },
          {
            nomor: 2,
            nama: "Istinja (Cebok)",
            uraian:
              "Membersihkan diri setelah buang air kecil atau buang air besar. Istinja menjaga aurat, bau, dan kesucian sebelum beraktivitas lagi.",
            contoh: "Memakai air sampai bersih, lalu mencuci tangan.",
          },
          {
            nomor: 3,
            nama: "Wudu",
            uraian:
              "Bersuci menggunakan air sebelum kita melaksanakan salat. Wudu mencuci anggota tertentu secara tertib, seperti kunci yang membuka pintu salat.",
            contoh: "Berwudu di sekolah sebelum salat zuhur.",
          },
        ],
        kuis: [
          {
            pertanyaan: "1. Membersihkan seluruh tubuh disebut apa?",
            alias: ["mandi", "mandi besar"],
          },
          {
            pertanyaan: "2. Membersihkan diri setelah buang air disebut apa?",
            alias: ["istinja", "cebok", "istinja cebok"],
          },
          {
            pertanyaan: "3. Bersuci sebelum salat disebut apa?",
            alias: ["wudu", "wudhu", "wudlu"],
          },
        ],
        voice: [
          [
            "Anak-anak, thaharah punya tiga alat yang sering kita pakai.",
            "Yang pertama mandi. Mandi membersihkan seluruh tubuh dengan air bersih dan sabun agar sehat.",
            "Yang kedua istinja atau cebok. Setelah buang air kecil atau besar, kita membersihkan diri sampai benar-benar bersih.",
            "Yang ketiga wudu. Wudu adalah kunci air sebelum salat. Tanpa kunci itu, pintu salat terasa belum terbuka.",
          ],
          [
            "Kalau anak sudah mandi, tetapi lupa istinja, lalu mau salat, kira-kira kuncinya sudah lengkap? Belum. Tiap cara bersuci punya waktu dan tugasnya sendiri.",
          ],
        ],
      },
    ],
  },
  {
    id: "pai-1-bab5",
    judul: "Bab 5: Kisah Teladan Nabi Muhammad SAW",
    pola: /nabi\s+muhammad|kisah\s+teladan\s+nabi/,
    motivasi: "Ayo teladani Nabi Muhammad: lahir di Mekah, jujur, dan digelari Al-Amin.",
    kunciJawaban: "C,A,B,C,A,B,C,A,B,C",
    sketsaKartu: [
      "Kota Mekah dan Tahun Gajah.",
      "Bayi Nabi Muhammad dalam gendongan Aminah.",
      "Anak jujur mengembalikan barang temuan.",
      "Lencana Al-Amin yang berarti dapat dipercaya.",
    ],
    latihan: pg([
      `[Soal 1 - PG - Tipe: Reguler]
Nabi Muhammad adalah nabi dan rasul...
A) Pertama
B) Kedua
C) Terakhir
D) Ketiga`,
      `[Soal 2 - PG - Tipe: Reguler]
Nabi Muhammad lahir di kota...
A) Mekah
B) Madinah
C) Jakarta
D) Mesir`,
      `[Soal 3 - PG - Tipe: Reguler]
Tahun kelahiran Nabi disebut Tahun...
A) Harimau
B) Gajah
C) Kuda
D) Unta`,
      `[Soal 4 - PG - Tipe: Reguler]
Ayah Nabi Muhammad bernama...
A) Abu Thalib
B) Abu Bakar
C) Abdullah
D) Umar`,
      `[Soal 5 - PG - Tipe: Reguler]
Ibu Nabi Muhammad bernama...
A) Aminah
B) Khadijah
C) Fatimah
D) Aisyah`,
      `[Soal 6 - PG - Tipe: Reguler]
Gelar Nabi karena jujur adalah...
A) Al-Hadi
B) Al-Amin
C) Al-Rasyid
D) Al-Karim`,
      `[Soal 7 - PG - Tipe: Reguler]
Al-Amin artinya...
A) Pemberani
B) Kaya
C) Dapat dipercaya
D) Cepat lari`,
      `[Soal 8 - PG - Tipe: HOTS]
Menemukan pensil teman lalu diam. Meneladani Al-Amin berarti...
A) Mengembalikan
B) Menyimpan
C) Membuang
D) Menjual`,
      `[Soal 9 - PG - Tipe: HOTS]
Berbohong supaya tidak dimarahi. Sikap Nabi mengajarkan kita...
A) Tetap jujur meski takut
B) Berbohong lagi
C) Menyalahkan teman
D) Lari dari rumah`,
      `[Soal 10 - PG - Tipe: HOTS]
Teman menitipkan bekal. Al-Amin berarti bekal itu...
A) Dimakan sendiri
B) Ditukar
C) Dijaga lalu dikembalikan utuh
D) Dibuang`,
    ]),
    kartu: [
      {
        kode: "A",
        judul: "A. Kelahiran Nabi Muhammad SAW",
        pengantar:
          "Nabi Muhammad SAW adalah nabi dan rasul terakhir. Beliau lahir di kota Mekah pada Tahun Gajah. Ayah beliau bernama Abdullah dan ibu beliau bernama Aminah. Kisah lahirnya seperti bintang yang muncul di malam yang gelap: memberi arah.",
        labelDaftar: "Identitas Kelahiran",
        kolom: 2,
        item: [
          {
            nama: "Nabi dan rasul terakhir",
            uraian:
              "Tidak ada nabi setelah Nabi Muhammad. Ajaran beliau menjadi pedoman sampai hari kiamat.",
            contoh: "Kita meneladani akhlak beliau, bukan menunggu nabi baru.",
          },
          {
            nama: "Lahir di Mekah, Tahun Gajah",
            uraian:
              "Mekah adalah kota suci. Tahun Gajah mengingatkan peristiwa besar saat pasukan gajah ingin meruntuhkan Kakbah, lalu Allah menjaganya.",
            contoh: "Kita menjaga tempat suci dan tidak merusak rumah ibadah.",
          },
          {
            nama: "Ayah Abdullah, ibu Aminah",
            uraian:
              "Nabi lahir dalam keluarga yang mulia. Ayahnya wafat sebelum beliau lahir, ibunya merawatnya dengan kasih.",
            contoh: "Kita menyayangi ibu karena perjuangannya besar.",
          },
        ],
        kuis: [
          {
            pertanyaan: "1. Nabi Muhammad lahir di kota mana?",
            alias: ["mekah", "makkah", "mekkah"],
          },
          {
            pertanyaan: "2. Ayah Nabi Muhammad bernama siapa?",
            alias: ["abdullah", "abdullah"],
          },
          {
            pertanyaan: "3. Ibu Nabi Muhammad bernama siapa?",
            alias: ["aminah", "siti aminah"],
          },
        ],
        voice: [
          [
            "Anak-anak, malam yang gelap butuh bintang. Umat manusia butuh teladan. Allah mengutus Nabi Muhammad sebagai nabi dan rasul terakhir.",
            "Beliau lahir di kota Mekah pada Tahun Gajah. Tahun itu diingat karena Allah menjaga Kakbah dari pasukan yang sombong.",
            "Ayah beliau bernama Abdullah. Ibu beliau bernama Aminah. Meski ayah telah tiada, Allah merawat Nabi melalui kasih ibu dan keluarga.",
          ],
          [
            "Kenapa kita perlu tahu tempat dan tahun lahir Nabi? Supaya kisahnya nyata, bukan dongeng. Teladan yang nyata bisa ditiru tangan kita hari ini.",
          ],
        ],
      },
      {
        kode: "B",
        judul: "B. Sifat Jujur Nabi Muhammad SAW",
        pengantar:
          "Sejak kecil, Nabi Muhammad terkenal sangat jujur. Beliau tidak pernah berbohong. Karena kejujurannya, beliau diberi gelar Al-Amin, yang artinya Dapat Dipercaya. Jujur itu seperti kaca bening: orang melihat dan tidak ragu.",
        labelDaftar: "Jejak Al-Amin",
        kolom: 2,
        item: [
          {
            nama: "Tidak pernah berbohong",
            uraian:
              "Jujur menjaga hati agar tidak pecah. Sekali berbohong, kepercayaan retak seperti gelas jatuh.",
            contoh: "Mengaku jika tidak mengerjakan tugas, lalu memperbaikinya.",
          },
          {
            nama: "Gelar Al-Amin",
            singkat: "Dapat dipercaya",
            uraian:
              "Orang Mekah menitipkan barang kepada Nabi karena yakin tidak akan dikhianati. Kepercayaan itu lebih berharga daripada emas.",
            contoh: "Menjaga titipan teman sampai dikembalikan utuh.",
          },
        ],
        kuis: [
          {
            pertanyaan: "1. Gelar Nabi karena jujur disebut apa?",
            alias: ["al amin", "alamin", "al-amin", "amin"],
          },
          {
            pertanyaan: "2. Al-Amin artinya apa?",
            alias: ["dapat dipercaya", "dipercaya", "terpercaya"],
          },
          {
            pertanyaan: "3. Nabi Muhammad tidak pernah apa?",
            alias: ["berbohong", "bohong", "dusta"],
          },
        ],
        voice: [
          [
            "Anak-anak, kaca yang bening membuat orang berani melihat. Hati yang jujur membuat orang berani percaya.",
            "Sejak kecil, Nabi Muhammad tidak pernah berbohong. Karena itu beliau digelari Al-Amin, artinya dapat dipercaya.",
            "Orang menitipkan barang kepada beliau. Titipan itu pulang utuh. Kepercayaan tumbuh seperti pohon yang disiram setiap hari.",
          ],
          [
            "Kalau kita menemukan uang teman di laci, Al-Amin memilih menyimpan atau mengembalikan? Mengembalikan. Jujur itu perbuatan, bukan hanya gelar di buku.",
          ],
        ],
      },
    ],
  },
  {
    id: "pai-1-bab6",
    judul: "Bab 6: Mengenal Surah Al-Ikhlas",
    pola: /al[-\s]?ikhlas/,
    motivasi: "Ayo hafal Al-Ikhlas: Allah Maha Esa dan tempat meminta segala sesuatu.",
    kunciJawaban: "B,A,C,B,A,C,B,A,C,B",
    sketsaKartu: [
      "Empat ayat Surah Al-Ikhlas.",
      "Anak menghafal qul huwallahu ahad.",
      "Satu lampu yang tidak perlu lampu lain.",
      "Anak berdoa hanya kepada Allah.",
    ],
    latihan: pg([
      `[Soal 1 - PG - Tipe: Reguler]
Surah Al-Ikhlas terdiri dari...
A) 3 ayat
B) 4 ayat
C) 5 ayat
D) 7 ayat`,
      `[Soal 2 - PG - Tipe: Reguler]
Ayat pertama Al-Ikhlas berisi...
A) Allah Maha Esa
B) Cerita hewan
C) Nama kota
D) Nama makanan`,
      `[Soal 3 - PG - Tipe: Reguler]
Allahus samad artinya Allah...
A) Beranak
B) Dibandingkan
C) Tempat meminta segala sesuatu
D) Membutuhkan bantuan`,
      `[Soal 4 - PG - Tipe: Reguler]
Allah tidak beranak dan tidak...
A) Tidur
B) Diperanakkan
C) Melihat
D) Mendengar`,
      `[Soal 5 - PG - Tipe: Reguler]
Tidak ada yang setara dengan...
A) Allah
B) Mainan
C) Gunung
D) Laut`,
      `[Soal 6 - PG - Tipe: Reguler]
Esa artinya...
A) Banyak
B) Dua
C) Satu
D) Nol`,
      `[Soal 7 - PG - Tipe: Reguler]
Kita meminta pertolongan terutama kepada...
A) Benda
B) Allah
C) Berhala
D) Angin`,
      `[Soal 8 - PG - Tipe: HOTS]
Menyembah gambar supaya cepat kaya. Al-Ikhlas mengajarkan...
A) Hanya Allah tempat meminta
B) Gambar itu Tuhan
C) Uang lebih penting
D) Boleh campur-campur`,
      `[Soal 9 - PG - Tipe: HOTS]
Teman bilang Tuhannya banyak. Kita menjawab dengan lembut bahwa...
A) Allah itu Esa
B) Semua sama saja
C) Tidak usah iman
D) Tuhan bisa diganti`,
      `[Soal 10 - PG - Tipe: HOTS]
Hafal Al-Ikhlas tetapi menyakiti teman. Kandungan surah juga menuntut...
A) Hanya hafalan
B) Akhlak yang selaras dengan tauhid
C) Diam saja
D) Menyembunyikan hafalan`,
    ]),
    kartu: [
      {
        kode: "A",
        judul: "A. Membaca dan Menghafal Surah Al-Ikhlas",
        pengantar:
          "Surah Al-Ikhlas punya 4 ayat. Ayatnya pendek, tetapi maknanya sebesar langit: Allah Esa, tidak beranak, tidak diperanakkan, dan tidak ada yang setara dengan-Nya.",
        labelDaftar: "4 Ayat Al-Ikhlas",
        kolom: 2,
        item: [
          {
            nomor: 1,
            nama: "Ayat 1",
            arab: "قُلْ هُوَ اللَّهُ أَحَدٌ",
            latin: "Qul huwallahu ahad",
            uraian: "Katakanlah, Dialah Allah, Yang Maha Esa.",
          },
          {
            nomor: 2,
            nama: "Ayat 2",
            arab: "اللَّهُ الصَّمَدُ",
            latin: "Allahus samad",
            uraian: "Allah tempat meminta segala sesuatu.",
          },
          {
            nomor: 3,
            nama: "Ayat 3",
            arab: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
            latin: "Lam yalid wa lam yulad",
            uraian: "Dia tidak beranak dan tidak diperanakkan.",
          },
          {
            nomor: 4,
            nama: "Ayat 4",
            arab: "وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ",
            latin: "Wa lam yakun lahu kufuwan ahad",
            uraian: "Dan tidak ada sesuatu yang setara dengan-Nya.",
          },
        ],
        kuis: [
          {
            pertanyaan: "1. Surah Al-Ikhlas ada berapa ayat?",
            alias: ["empat", "4", "empat ayat"],
          },
          {
            pertanyaan: "2. Bacakan ayat pertama Al-Ikhlas.",
            alias: ["qul huwallahu ahad", "qulhuwallahuahad", "ahu ahad", "allahu ahad"],
          },
          {
            pertanyaan: "3. Allahus samad artinya Allah tempat apa?",
            alias: ["meminta", "tempat meminta", "memohon"],
          },
        ],
        voice: [
          [
            "Anak-anak, ada surat pendek yang isinya sebesar langit. Namanya Surah Al-Ikhlas. Ayatnya ada empat.",
            "Yuk kita baca bersama. Ayat satu: Qul huwallahu ahad. Katakanlah, Dialah Allah, Yang Maha Esa.",
            "Ayat dua: Allahus samad. Allah tempat meminta segala sesuatu.",
            "Ayat tiga: Lam yalid wa lam yulad. Allah tidak beranak dan tidak diperanakkan.",
            "Ayat empat: Wa lam yakun lahu kufuwan ahad. Tidak ada yang setara dengan Allah.",
          ],
          [
            "Coba ulang dari awal, pelan-pelan. Empat ayat ini seperti empat kunci kecil yang membuka pintu tauhid.",
          ],
        ],
      },
      {
        kode: "B",
        judul: "B. Kandungan Surah Al-Ikhlas",
        pengantar:
          "Kandungan surah ini sederhana dan dalam: Allah itu Esa, Satu, dan tempat meminta segala sesuatu. Tidak ada lampu kedua di langit tauhid.",
        labelDaftar: "Dua Makna Utama",
        kolom: 2,
        item: [
          {
            nama: "Allah Maha Esa",
            uraian:
              "Esa artinya satu, tidak terbagi, tidak butuh pasangan. Menyembah selain Allah membuat hati terpecah.",
            contoh: "Kita berdoa hanya kepada Allah, bukan kepada benda.",
          },
          {
            nama: "Tempat meminta segala sesuatu",
            uraian:
              "Allahus samad mengajarkan kita meminta tolong kepada Allah. Manusia bisa membantu, tetapi sumber kekuatan tetap Allah.",
            contoh: "Sebelum ujian, kita belajar dan berdoa kepada Allah.",
          },
        ],
        kuis: [
          {
            pertanyaan: "1. Esa artinya berapa?",
            alias: ["satu", "1", "esa satu"],
          },
          {
            pertanyaan: "2. Kita meminta kepada siapa?",
            alias: ["allah", "tuhan", "kepada allah"],
          },
          {
            pertanyaan: "3. Apakah ada yang setara dengan Allah?",
            alias: ["tidak", "tidak ada", "tidak setara"],
          },
        ],
        voice: [
          [
            "Anak-anak, bayangkan satu matahari. Langit tidak butuh dua matahari. Tauhid juga begitu. Allah Maha Esa.",
            "Kalau ada banyak tuhan, hati kita bingung meminta ke mana. Al-Ikhlas menutup kebingungan itu: mintalah kepada Allah.",
            "Allah tidak beranak dan tidak diperanakkan. Tidak ada yang setara dengan-Nya. Itu sebabnya kita tidak menyembah gambar atau mainan.",
          ],
          [
            "Kalau pensil patah, kita boleh minta bantuan guru. Tetapi kekuatan, ilmu, dan keselamatan kita minta kepada Allah. Itu kandungan Al-Ikhlas yang hidup.",
          ],
        ],
      },
    ],
  },
  {
    id: "pai-1-bab7",
    judul: "Bab 7: Rukun Islam",
    pola: /rukun\s+islam/,
    motivasi: "Ayo ingat lima pilar: syahadat, salat, zakat, puasa, dan haji.",
    kunciJawaban: "C,A,B,C,A,B,C,A,B,C",
    sketsaKartu: [
      "Lima pilar rumah Rukun Islam.",
      "Anak mengucap syahadat.",
      "Anak salat berjamaah.",
      "Anak menyanyi lagu Rukun Islam.",
    ],
    latihan: pg([
      `[Soal 1 - PG - Tipe: Reguler]
Rukun Islam ada...
A) 3
B) 4
C) 5
D) 6`,
      `[Soal 2 - PG - Tipe: Reguler]
Pilar pertama Rukun Islam adalah...
A) Syahadat
B) Haji
C) Puasa
D) Zakat`,
      `[Soal 3 - PG - Tipe: Reguler]
Ibadah wajib lima waktu disebut...
A) Zakat
B) Salat
C) Haji
D) Puasa`,
      `[Soal 4 - PG - Tipe: Reguler]
Berbagi harta kepada yang berhak disebut...
A) Salat
B) Syahadat
C) Zakat
D) Haji`,
      `[Soal 5 - PG - Tipe: Reguler]
Menahan lapar dan haus di Ramadan disebut...
A) Puasa
B) Haji
C) Zakat
D) Syahadat`,
      `[Soal 6 - PG - Tipe: Reguler]
Ibadah ke Mekah bagi yang mampu disebut...
A) Zakat
B) Haji
C) Salat
D) Puasa`,
      `[Soal 7 - PG - Tipe: Reguler]
Supaya mudah diingat, Rukun Islam bisa...
A) Dilupakan
B) Dihapus
C) Dinyanyikan
D) Ditakuti`,
      `[Soal 8 - PG - Tipe: HOTS]
Rumah kehilangan satu pilar. Rukun Islam yang dihilangkan membuat...
A) Iman terasa miring
B) Lebih ringan
C) Lebih meriah
D) Tidak masalah`,
      `[Soal 9 - PG - Tipe: HOTS]
Anak sudah syahadat tetapi tidak mau salat. Pilarnya...
A) Belum lengkap dikerjakan
B) Sudah sempurna
C) Boleh diganti nyanyi saja
D) Tidak perlu`,
      `[Soal 10 - PG - Tipe: HOTS]
Teman lapar di sekolah. Semangat zakat mengajarkan kita...
A) Berbagi sesuai kemampuan
B) Menertawakan
C) Menyembunyikan bekal
D) Menyuruhnya pulang`,
    ]),
    kartu: [
      {
        kode: "A",
        judul: "A. Lima Pilar Rukun Islam",
        pengantar:
          "Rukun Islam adalah 5 pilar utama umat Islam. Seperti tiang rumah, kelimanya menahan atap keislaman: syahadat, salat, zakat, puasa, dan haji.",
        labelDaftar: "5 Pilar Rukun Islam",
        kolom: 2,
        item: [
          {
            nomor: 1,
            nama: "Syahadat",
            uraian:
              "Mengucapkan dua kalimat syahadat: bersaksi tidak ada tuhan selain Allah, dan Nabi Muhammad utusan Allah. Ini kunci pintu Islam.",
            contoh: "Mengucap syahadat dengan yakin, bukan asal hafal.",
          },
          {
            nomor: 2,
            nama: "Salat",
            uraian:
              "Menghadap Allah pada waktu yang ditentukan. Bagi anak, belajar salat adalah menata hati lima kali sehari.",
            contoh: "Salat berjamaah di sekolah dengan khusyuk.",
          },
          {
            nomor: 3,
            nama: "Zakat",
            uraian:
              "Membersihkan harta dengan berbagi kepada yang berhak. Semangatnya bisa dimulai dari berbagi bekal.",
            contoh: "Menabung lalu berbagi kepada teman yang membutuhkan.",
          },
          {
            nomor: 4,
            nama: "Puasa",
            uraian:
              "Menahan lapar, haus, dan sikap buruk dari terbit fajar sampai terbenam matahari di bulan Ramadan.",
            contoh: "Latihan menahan diri tidak marah saat lapar.",
          },
          {
            nomor: 5,
            nama: "Haji",
            uraian:
              "Berkunjung ke Baitullah di Mekah bagi yang mampu. Kita merawat niat dan menabung adab menuju rumah Allah.",
            contoh: "Mengenal Kakbah sebagai kiblat salat kita.",
          },
        ],
        kuis: [
          {
            pertanyaan: "1. Rukun Islam ada berapa?",
            alias: ["lima", "5", "lima pilar"],
          },
          {
            pertanyaan: "2. Pilar pertama Rukun Islam apa?",
            alias: ["syahadat", "dua kalimat syahadat"],
          },
          {
            pertanyaan: "3. Sebutkan salah satu rukun setelah syahadat.",
            alias: ["salat", "zakat", "puasa", "haji", "sholat"],
          },
        ],
        voice: [
          [
            "Anak-anak, rumah yang kuat punya tiang. Islam punya lima tiang. Namanya Rukun Islam.",
            "Tiang pertama syahadat. Kita bersaksi Allah Tuhan kita, dan Nabi Muhammad utusan-Nya.",
            "Tiang kedua salat. Kita menghadap Allah pada waktunya.",
            "Tiang ketiga zakat. Harta dibersihkan dengan berbagi.",
            "Tiang keempat puasa. Kita menahan lapar, haus, dan sikap buruk.",
            "Tiang kelima haji. Bagi yang mampu, kita menuju rumah Allah di Mekah.",
          ],
          [
            "Kalau satu tiang dicabut, rumah goyah. Maka lima rukun ini dikerjakan bersama, sesuai kemampuan anak yang sedang belajar.",
          ],
        ],
      },
      {
        kode: "B",
        judul: "B. Menyanyikan Lagu Rukun Islam",
        pengantar:
          "Supaya lima pilar mudah diingat, kita menyanyikannya. Lagu adalah tali yang mengikat hafalan di hati.",
        labelDaftar: "Lirik Pengingat",
        kolom: 1,
        item: [
          {
            nama: "Bait 1",
            uraian:
              "Rukun Islam ada lima. Pertama mengucap dua kalimat syahadat.",
          },
          {
            nama: "Bait 2",
            uraian: "Kedua mendirikan salat. Ketiga menunaikan zakat.",
          },
          {
            nama: "Bait 3",
            uraian:
              "Keempat berpuasa di bulan Ramadan. Kelima naik haji bagi yang mampu.",
          },
        ],
        kuis: [
          {
            pertanyaan: "1. Lagu Rukun Islam membantu kita apa?",
            alias: ["mengingat", "hafal", "ingat", "menghafal"],
          },
          {
            pertanyaan: "2. Dalam lagu, rukun kedua apa?",
            alias: ["salat", "sholat", "mendirikan salat"],
          },
          {
            pertanyaan: "3. Haji dikerjakan oleh siapa?",
            alias: ["yang mampu", "mampu", "orang mampu"],
          },
        ],
        voice: [
          [
            "Yuk kita nyanyi pelan, seperti menaiki tangga satu per satu.",
            "Rukun Islam ada lima. Pertama mengucap dua kalimat syahadat.",
            "Kedua mendirikan salat. Ketiga menunaikan zakat.",
            "Keempat berpuasa di bulan Ramadan. Kelima naik haji bagi yang mampu.",
          ],
          [
            "Coba nyanyikan lagi di hati. Kalau lupa urutannya, lagu ini menjadi peta. Peta yang dinyanyikan lebih mudah dibawa pulang.",
          ],
        ],
      },
    ],
  },
  {
    id: "pai-1-bab8",
    judul: "Bab 8: Bersyukur dan Berterima Kasih",
    pola: /bersyukur|berterima\s+kasih/,
    motivasi: "Ayo ucapkan terima kasih dan jaga bumi sebagai syukur kepada Allah.",
    kunciJawaban: "A,B,C,A,B,C,A,B,C,A",
    sketsaKartu: [
      "Anak mengucapkan terima kasih saat diberi hadiah.",
      "Anak membuang sampah pada tempatnya.",
      "Anak menyiram tanaman.",
      "Senyum kepada teman yang menolong.",
    ],
    latihan: pg([
      `[Soal 1 - PG - Tipe: Reguler]
Saat diberi bantuan, kita mengucapkan...
A) Terima kasih
B) Diam saja
C) Marah
D) Ejekan`,
      `[Soal 2 - PG - Tipe: Reguler]
Syukur kepada Allah bisa dengan...
A) Merusak tanaman
B) Menjaga lingkungan
C) Membuang sampah ke sungai
D) Mencoret dinding`,
      `[Soal 3 - PG - Tipe: Reguler]
Hadiah dari teman sebaiknya...
A) Direbut
B) Dibuang
C) Diterima dengan terima kasih
D) Ditukar marah`,
      `[Soal 4 - PG - Tipe: Reguler]
Membuang sampah pada tempatnya adalah bentuk...
A) Syukur
B) Sompong
C) Lupa
D) Marah`,
      `[Soal 5 - PG - Tipe: Reguler]
Menyiram tanaman artinya kita...
A) Merusak
B) Menjaga ciptaan Allah
C) Membuang air sia-sia
D) Tidak peduli`,
      `[Soal 6 - PG - Tipe: Reguler]
Ucapan terima kasih membuat pemberi merasa...
A) Sedih
B) Takut
C) Dihargai
D) Marah`,
      `[Soal 7 - PG - Tipe: Reguler]
Lingkungan bersih adalah tanda kita...
A) Bersyukur
B) Malas
C) Cuek
D) Sompong`,
      `[Soal 8 - PG - Tipe: HOTS]
Ditolong tetapi tidak berterima kasih. Hatinya seperti...
A) Ember bocor
B) Ember penuh syukur
C) Taman rapi
D) Lampu terang`,
      `[Soal 9 - PG - Tipe: HOTS]
Mencintai bumi berarti...
A) Membakar sampah di selokan
B) Menghemat air dan tidak merusak
C) Mematahkan ranting
D) Membiarkan kelas kotor`,
      `[Soal 10 - PG - Tipe: HOTS]
Syukur yang lengkap adalah ucapan plus...
A) Perbuatan menjaga pemberian
B) Permintaan terus-menerus
C) Membandingkan hadiah
D) Menyembunyikan bantuan`,
    ]),
    kartu: [
      {
        kode: "A",
        judul: "A. Mengucapkan Terima Kasih",
        pengantar:
          "Belajar mengucapkan terima kasih saat diberi bantuan atau hadiah. Ucapan itu seperti cap stempel: menandai bahwa hati tidak sombong.",
        labelDaftar: "Kapan Berterima Kasih",
        kolom: 2,
        item: [
          {
            nama: "Saat dibantu",
            uraian:
              "Teman meminjamkan pensil, guru menjelaskan, penjaga sekolah membuka pintu. Semua itu pantas dibalas terima kasih.",
            contoh: "Mengucap terima kasih setelah dipinjami penghapus.",
          },
          {
            nama: "Saat diberi hadiah",
            uraian:
              "Hadiah adalah titipan kasih. Menerimanya dengan senyum dan terima kasih lebih indah daripada membandingkan harga.",
            contoh: "Menerima bekal tambahan tanpa merebut.",
          },
        ],
        kuis: [
          {
            pertanyaan: "1. Saat diberi bantuan kita mengucapkan apa?",
            alias: ["terima kasih", "makasih", "terimakasih"],
          },
          {
            pertanyaan: "2. Terima kasih membuat pemberi merasa apa?",
            alias: ["dihargai", "senang", "bahagia", "terhargai"],
          },
          {
            pertanyaan: "3. Apakah boleh diam saja setelah ditolong?",
            alias: ["tidak", "tidak boleh", "jangan"],
          },
        ],
        voice: [
          [
            "Anak-anak, hadiah dan bantuan adalah paket. Di dalam paket itu ada kasih orang lain. Stempelnya adalah ucapan terima kasih.",
            "Kalau paket dibuka tanpa stempel, pemberi tidak tahu apakah kita menghargai.",
            "Ucapkan terima kasih kepada teman, guru, orang tua, dan siapa saja yang menolong. Suaranya kecil, tetapi maknanya besar.",
          ],
          [
            "Ada anak diberi pensil, lalu diam dan langsung pergi. Kira-kira paketnya sudah lengkap? Belum. Lengkapi dengan terima kasih.",
          ],
        ],
      },
      {
        kode: "B",
        judul: "B. Menjaga Lingkungan sebagai Syukur",
        pengantar:
          "Menjaga lingkungan sekitar adalah bentuk syukur atas ciptaan Allah. Bumi, air, pohon, dan udara adalah hadiah yang tidak boleh dirusak.",
        labelDaftar: "Cara Bersyukur pada Bumi",
        kolom: 3,
        item: [
          {
            nama: "Buang sampah pada tempatnya",
            uraian:
              "Sampah di sungai seperti luka di tubuh bumi. Kita menutup luka itu dengan membuang sampah benar.",
          },
          {
            nama: "Hemat air dan listrik",
            uraian:
              "Mematikan keran dan lampu yang tidak dipakai artinya kita tidak menyia-nyiakan pemberian Allah.",
          },
          {
            nama: "Merawat tanaman dan hewan",
            uraian:
              "Menyiram tanaman dan tidak menyakiti hewan adalah terima kasih kepada Allah yang menciptakan hidup.",
          },
        ],
        kuis: [
          {
            pertanyaan: "1. Sampah dibuang ke mana?",
            alias: ["tempatnya", "tempat sampah", "pada tempatnya"],
          },
          {
            pertanyaan: "2. Menjaga lingkungan termasuk rasa apa kepada Allah?",
            alias: ["syukur", "bersyukur", "terima kasih"],
          },
          {
            pertanyaan: "3. Tanaman kita jaga dengan apa?",
            alias: ["menyiram", "merawat", "siram", "dijaga"],
          },
        ],
        voice: [
          [
            "Anak-anak, bumi adalah hadiah besar. Mengucap syukur hanya di mulut, lalu membuang sampah ke selokan, membuat ucapan dan perbuatan tidak cocok.",
            "Syukur yang terlihat: membuang sampah pada tempatnya, menghemat air, merawat tanaman, dan tidak menyakiti hewan.",
            "Kalau kelas bersih, napas kita lega. Itu cara Allah menunjukkan bahwa syukur membuat hidup lebih nyaman.",
          ],
          [
            "Kalau ada dua jalan, membuang bungkus ke laci atau ke tanah, syukur memilih yang mana? Ke tempat sampah. Itu terima kasih kepada Allah yang memberi bumi.",
          ],
        ],
      },
    ],
  },
  {
    id: "pai-1-bab9",
    judul: "Bab 9: Tata Cara Berwudu",
    pola: /berwudu|wudu|wudhu/,
    motivasi: "Ayo wudu tertib: dari tangan hingga kaki, supaya kunci salat terbuka.",
    kunciJawaban: "B,C,A,B,C,A,B,C,A,B",
    sketsaKartu: [
      "Anak mencuci tangan saat wudu.",
      "Anak berkumur dan membasuh hidung.",
      "Anak membasuh muka dan lengan.",
      "Anak membasuh kaki sampai mata kaki.",
    ],
    latihan: pg([
      `[Soal 1 - PG - Tipe: Reguler]
Wudu dikerjakan secara...
A) Acak
B) Tertib
C) Sambil lari
D) Sambil marah`,
      `[Soal 2 - PG - Tipe: Reguler]
Wudu memakai...
A) Debu saja selalu
B) Minyak
C) Air
D) Pasir basah seenaknya`,
      `[Soal 3 - PG - Tipe: Reguler]
Setelah niat, kita biasanya memulai dengan mencuci...
A) Tangan
B) Kaki dulu
C) Rambut dulu
D) Punggung`,
      `[Soal 4 - PG - Tipe: Reguler]
Berkumur membersihkan...
A) Kaki
B) Mulut
C) Telinga
D) Punggung`,
      `[Soal 5 - PG - Tipe: Reguler]
Membasuh hidung disebut juga...
A) Istinja
B) Mandi
C) Istinsyaq
D) Zakat`,
      `[Soal 6 - PG - Tipe: Reguler]
Muka dibasuh pada langkah...
A) Setelah hidung
B) Paling akhir
C) Hanya kalau kotor
D) Tidak perlu`,
      `[Soal 7 - PG - Tipe: Reguler]
Tangan dibasuh sampai...
A) Pergelangan saja selalu
B) Siku
C) Bahu
D) Jari saja`,
      `[Soal 8 - PG - Tipe: HOTS]
Membasuh kaki sebelum muka. Urutannya...
A) Tidak tertib
B) Lebih cepat jadi lebih baik
C) Boleh setiap hari
D) Mengganti niat`,
      `[Soal 9 - PG - Tipe: HOTS]
Air keran dibiarkan deras saat wudu. Sikap hemat berarti...
A) Memakai air secukupnya
B) Membiarkan terbuang
C) Mandi dua kali
D) Tidak wudu`,
      `[Soal 10 - PG - Tipe: HOTS]
Wudu sudah selesai tetapi kaki belum dibasuh. Kunci salat...
A) Sudah sempurna
B) Belum lengkap
C) Boleh diganti nyanyi
D) Tidak penting`,
    ]),
    kartu: [
      {
        kode: "A",
        judul: "A. Praktik Berwudu secara Tertib",
        pengantar:
          "Wudu adalah kunci air sebelum salat. Kunci itu harus diputar berurutan, bukan loncat-loncat. Tertib artinya setiap langkah mengikuti langkah sebelumnya.",
        labelDaftar: "Urutan Wudu",
        kolom: 2,
        item: [
          {
            nomor: 1,
            nama: "Niat dan Basmalah",
            uraian: "Dalam hati berniat wudu, lalu mengucap Basmalah.",
          },
          {
            nomor: 2,
            nama: "Mencuci tangan",
            uraian: "Cuci kedua telapak tangan sampai sela-sela jari.",
          },
          {
            nomor: 3,
            nama: "Berkumur",
            uraian: "Membersihkan mulut supaya ucapan salat dimulai dari rongga yang bersih.",
          },
          {
            nomor: 4,
            nama: "Membasuh hidung",
            uraian: "Memasukkan air ke hidung lalu mengeluarkannya dengan lembut.",
          },
          {
            nomor: 5,
            nama: "Membasuh muka",
            uraian: "Dari tempat tumbuh rambut hingga dagu, dan dari telinga ke telinga.",
          },
          {
            nomor: 6,
            nama: "Membasuh tangan sampai siku",
            uraian: "Tangan kanan lalu kiri, termasuk siku, tidak boleh ada bagian yang kering.",
          },
          {
            nomor: 7,
            nama: "Membasuh rambut / mengusap kepala",
            uraian: "Mengusap kepala dengan tangan yang basah.",
          },
          {
            nomor: 8,
            nama: "Mengusap telinga",
            uraian: "Bagian luar dan dalam telinga diusap dengan sisa air yang suci.",
          },
          {
            nomor: 9,
            nama: "Membasuh kaki sampai mata kaki",
            uraian: "Kaki kanan lalu kiri, termasuk sela-sela jari dan mata kaki.",
          },
        ],
        kuis: [
          {
            pertanyaan: "1. Wudu harus dikerjakan secara apa?",
            alias: ["tertib", "berurutan", "urut"],
          },
          {
            pertanyaan: "2. Setelah niat, kita mencuci apa?",
            alias: ["tangan", "mencuci tangan"],
          },
          {
            pertanyaan: "3. Bagian terakhir yang dibasuh apa?",
            alias: ["kaki", "kaki sampai mata kaki", "membasuh kaki"],
          },
        ],
        voice: [
          [
            "Anak-anak, wudu itu kunci. Kunci diputar berurutan. Kalau loncat, pintu salat terasa macet.",
            "Mulai dari niat dan Basmalah. Lalu cuci tangan.",
            "Berkumur. Basuh hidung. Basuh muka.",
            "Basuh tangan sampai siku. Usap kepala dan rambut. Usap telinga.",
            "Terakhir, basuh kaki sampai mata kaki. Kanan dulu, lalu kiri.",
            "Jangan lupa hemat air. Tertib bukan berarti boros.",
          ],
          [
            "Coba sebut dari tangan sampai kaki. Kalau ada yang terlewat, ulangi langkah itu. Tertib lebih penting daripada cepat.",
          ],
        ],
      },
      {
        kode: "B",
        judul: "B. Mengapa Wudu Harus Tertib",
        pengantar:
          "Tertib menjaga kita tidak lupa. Seperti memakai sepatu: kaos kaki dulu, baru sepatu. Wudu yang loncat membuat bagian penting kering.",
        labelDaftar: "Tiga Alasan Tertib",
        kolom: 3,
        item: [
          {
            nama: "Tidak ada yang terlewat",
            uraian: "Urutan adalah peta. Peta menolong anak yang masih belajar.",
          },
          {
            nama: "Hati lebih khusyuk",
            uraian: "Gerakan yang teratur menenangkan napas sebelum menghadap Allah.",
          },
          {
            nama: "Meneladani Nabi",
            uraian: "Nabi berwudu dengan tertib. Meniru beliau adalah cinta yang dipraktikkan.",
          },
        ],
        kuis: [
          {
            pertanyaan: "1. Tertib menolong supaya tidak apa?",
            alias: ["lupa", "terlewat", "loncat"],
          },
          {
            pertanyaan: "2. Wudu mencontoh siapa?",
            alias: ["nabi", "nabi muhammad", "rasul"],
          },
          {
            pertanyaan: "3. Apakah boleh membasuh kaki paling awal?",
            alias: ["tidak", "tidak boleh", "jangan"],
          },
        ],
        voice: [
          [
            "Anak-anak, kaos kaki dipakai sebelum sepatu. Wudu juga punya urutan. Tertib menjaga tidak ada kulit yang kering.",
            "Hati yang mengikuti urutan lebih tenang. Kita tidak sibuk mengingat, karena tangan sudah hafal jalannya.",
            "Nabi berwudu tertib. Meniru beliau lebih indah daripada wudu yang cepat tetapi loncat.",
          ],
          [
            "Kalau ada yang membasuh kaki paling awal supaya cepat selesai, kuncinya sudah tertib? Belum. Ulangi dari langkah yang benar.",
          ],
        ],
      },
    ],
  },
  {
    id: "pai-1-bab10",
    judul: "Bab 10: Kisah Nabi Adam AS",
    pola: /nabi\s+adam/,
    motivasi: "Ayo kenali Nabi Adam: manusia dan nabi pertama, lalu jaga amanah di bumi.",
    kunciJawaban: "A,B,C,A,B,C,A,B,C,A",
    sketsaKartu: [
      "Nabi Adam sebagai manusia pertama.",
      "Penciptaan dari tanah.",
      "Hawa sebagai pasangan.",
      "Anak menjaga bumi sebagai amanah.",
    ],
    latihan: pg([
      `[Soal 1 - PG - Tipe: Reguler]
Nabi Adam adalah manusia...
A) Pertama
B) Terakhir
C) Kedua
D) Ketiga`,
      `[Soal 2 - PG - Tipe: Reguler]
Nabi Adam juga seorang...
A) Pedagang saja
B) Nabi
C) Raja batu
D) Nelayan`,
      `[Soal 3 - PG - Tipe: Reguler]
Nabi Adam diciptakan oleh...
A) Malaikat sendiri
B) Manusia lain
C) Allah SWT
D) Jin`,
      `[Soal 4 - PG - Tipe: Reguler]
Manusia pertama berarti sebelum Adam...
A) Belum ada manusia
B) Sudah banyak manusia
C) Sudah ada robot
D) Sudah ada nabi lain`,
      `[Soal 5 - PG - Tipe: Reguler]
Kita meneladani Nabi Adam dengan...
A) Menyombongkan diri
B) Mengakui salah dan bertobat
C) Menyalahkan terus
D) Melarikan diri`,
      `[Soal 6 - PG - Tipe: Reguler]
Bumi dijaga karena...
A) Bukan urusan kita
B) Mainan rusak
C) Amanah dari Allah
D) Tidak penting`,
      `[Soal 7 - PG - Tipe: Reguler]
Nabi pertama adalah...
A) Nabi Adam
B) Nabi Muhammad
C) Nabi Musa
D) Nabi Isa`,
      `[Soal 8 - PG - Tipe: HOTS]
Merusak tanaman tanpa alasan. Amanah Nabi Adam berarti kita seharusnya...
A) Menjaga, bukan merusak
B) Merusak lagi
C) Menyalahkan angin
D) Diam saja`,
      `[Soal 9 - PG - Tipe: HOTS]
Berbuat salah lalu menyangkal. Teladan tobat mengajarkan...
A) Mengakui dan memperbaiki
B) Menyembunyikan
C) Menyalahkan adik
D) Marah pada guru`,
      `[Soal 10 - PG - Tipe: HOTS]
Semua manusia bersaudara karena...
A) Berasal dari manusia pertama, Nabi Adam
B) Sama-sama punya HP
C) Sama-sama tinggi
D) Sama-sama cepat lari`,
    ]),
    kartu: [
      {
        kode: "A",
        judul: "A. Nabi Adam Manusia dan Nabi Pertama",
        pengantar:
          "Nabi Adam AS adalah manusia dan nabi pertama yang diciptakan Allah SWT. Beliau awal silsilah kita. Mengenalnya membuat kita tahu dari mana kisah manusia dimulai.",
        labelDaftar: "Identitas Nabi Adam",
        kolom: 2,
        item: [
          {
            nama: "Manusia pertama",
            uraian:
              "Sebelum Nabi Adam, belum ada manusia. Allah menciptakannya sebagai awal kehidupan manusia di bumi.",
            contoh: "Kita semua bersaudara karena satu asal usul.",
          },
          {
            nama: "Nabi pertama",
            uraian:
              "Allah memberi petunjuk kepada Nabi Adam. Beliau mengajarkan anak-cucunya menyembah Allah.",
            contoh: "Kita belajar agama dari kecil, seperti generasi pertama yang diajari Allah.",
          },
          {
            nama: "Diciptakan Allah SWT",
            uraian:
              "Adam bukan hasil kebetulan. Allah yang merancang, meniupkan kehidupan, dan menempatkannya di bumi.",
            contoh: "Kita menjaga tubuh karena Allah yang menciptakannya.",
          },
        ],
        kuis: [
          {
            pertanyaan: "1. Nabi Adam adalah manusia yang ke berapa?",
            alias: ["pertama", "satu", "manusia pertama"],
          },
          {
            pertanyaan: "2. Siapa yang menciptakan Nabi Adam?",
            alias: ["allah", "allah swt", "tuhan"],
          },
          {
            pertanyaan: "3. Apakah Nabi Adam juga seorang nabi?",
            alias: ["ya", "iya", "nabi", "nabi pertama"],
          },
        ],
        voice: [
          [
            "Anak-anak, setiap cerita punya halaman pertama. Halaman pertama manusia adalah Nabi Adam.",
            "Nabi Adam adalah manusia pertama dan nabi pertama. Allah SWT yang menciptakannya.",
            "Karena beliau yang pertama, kita semua seperti daun dari satu pohon. Itu sebabnya kita tidak boleh merendahkan teman.",
          ],
          [
            "Kalau ada yang bertanya, dari mana manusia mulai? Kita jawab dengan lembut: dari Nabi Adam, ciptaan Allah. Bukan dari dongeng sembarangan.",
          ],
        ],
      },
      {
        kode: "B",
        judul: "B. Pelajaran dari Kisah Nabi Adam",
        pengantar:
          "Kisah Nabi Adam mengajarkan tobat, tanggung jawab, dan menjaga bumi. Salah boleh terjadi, tetapi menyembunyikan salah membuat hati gelap.",
        labelDaftar: "Tiga Pelajaran",
        kolom: 3,
        item: [
          {
            nama: "Mengakui kesalahan",
            uraian:
              "Nabi Adam berdoa memohon ampun. Anak yang berani mengakui salah sedang meniru nabi, bukan kalah.",
            contoh: "Mengaku jika memecahkan gelas, lalu membantu membersihkannya.",
          },
          {
            nama: "Menjaga amanah bumi",
            uraian:
              "Manusia ditugasi merawat bumi. Merusak tanaman dan membuang sampah sembarangan merusak amanah itu.",
            contoh: "Menyiram tanaman kelas dan tidak mematahkan ranting.",
          },
          {
            nama: "Hidup rukun sebagai saudara",
            uraian:
              "Karena satu asal, kita belajar tidak iri dan tidak menyakiti. Perselisihan diselesaikan dengan bicara.",
            contoh: "Berdamai setelah berebut giliran.",
          },
        ],
        kuis: [
          {
            pertanyaan: "1. Jika salah, kita harus apa?",
            alias: ["mengaku", "tobat", "minta maaf", "memperbaiki"],
          },
          {
            pertanyaan: "2. Bumi harus kita apa?",
            alias: ["jaga", "jaga bumi", "merawat", "rawat"],
          },
          {
            pertanyaan: "3. Semua manusia adalah apa?",
            alias: ["saudara", "bersaudara", "teman"],
          },
        ],
        voice: [
          [
            "Anak-anak, Nabi Adam juga mengajarkan tobat. Salah bukan akhir cerita. Mengaku dan memperbaiki adalah halaman berikutnya.",
            "Bumi ini titipan. Kita merawat air, tanah, dan tanaman. Itu pekerjaan manusia sejak Nabi Adam.",
            "Karena satu asal, kita bersaudara. Jangan merendahkan teman. Selesaikan ribut dengan kata yang lembut.",
          ],
          [
            "Kalau gelas pecah lalu kita menyembunyikan pecahannya, kira-kira kita sedang meniru tobat Nabi Adam? Belum. Ambil sapu, mengaku, dan perbaiki.",
          ],
        ],
      },
    ],
  },
];

