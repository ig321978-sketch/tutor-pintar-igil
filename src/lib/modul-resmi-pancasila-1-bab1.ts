import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_PANCASILA1_BAB1 = "Bab 1: Aku dan Teman-Temanku";

export const MODUL_PANCASILA1_BAB1: ModulResmiPai = {
  id: "pancasila-1-bab1",
  judul: JUDUL_PANCASILA1_BAB1,
  pola: /aku dan teman-temanku|teman temanku|pelangi di kelasku/,
  motivasi:
    "Kelas jadi indah karena kita berbeda. Ajak teman bermain, jangan mengejek.",
  kunciJawaban: "B,C,A,B,B,C,A,B,C,A",
  sketsaKartu: [
    "Nia menggambar tangan kanan, Made kidal, Joko di kursi roda di pojok literasi.",
    "Pelangi di kelasku: identitas, cara menghargai, manfaat nyata.",
    "Anak menjiplak telapak tangan di pohon keragaman.",
    "Siswa mengerjakan lembar evaluasi tentang berteman tanpa perundungan.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Made beragama Hindu dan menyukai tari Bali. Joko beragama Islam dan menyukai sepak bola. Jika mereka ingin bermain bersama di istirahat, sikap terbaik adalah...
A) Made memaksa Joko ikut menari Bali.
B) Mereka mencari permainan baru yang bisa dimainkan bersama dengan gembira.
C) Mereka bermain sendiri-sendiri agar tidak bertengkar.
D) Mereka hanya bermain jika agamanya sama.`,
    `[Soal 2 - PG - Tipe: HOTS]
Saat istirahat, teman baru duduk sendirian di pojok kelas dan tampak sedih. Tindakan bernalar kritis yang harus kamu lakukan adalah...
A) Membiarkannya karena dia mungkin ingin sendiri.
B) Melaporkannya ke guru agar guru saja yang mengajaknya bicara.
C) Menghampirinya dengan senyuman, menyapa, dan mengajaknya bergabung bermain.
D) Menertawakannya karena dia tidak punya teman.`,
    `[Soal 3 - PG - Tipe: Reguler]
Mengajak teman yang berkulit gelap bermain bersama adalah perbuatan...
A) Benar, karena semua teman sama-sama hebat dan boleh bermain bersama.
B) Salah, karena kita hanya boleh berteman dengan yang mirip.
C) Biasa saja, tidak perlu dilakukan.
D) Dilarang guru.`,
    `[Soal 4 - PG - Tipe: Reguler]
Kita hanya boleh membantu teman yang satu suku atau satu agama saja. Pernyataan ini...
A) Benar, supaya tidak salah agama.
B) Salah, karena kita menolong semua teman tanpa memandang suku atau agama.
C) Benar jika guru mengizinkan.
D) Hanya berlaku di rumah.`,
    `[Soal 5 - PG - Tipe: Reguler]
Nia tidak sengaja menjatuhkan pensil Made. Sikap bijak Nia adalah...
A) Diam saja seolah tidak terjadi apa-apa.
B) Meminta maaf dengan tulus.
C) Menyalahkan Joko.
D) Membeli pensil baru tanpa bicara.`,
    `[Soal 6 - PG - Tipe: Reguler]
Joko meminjamkan penghapusnya kepada Nia. Sikap bijak Nia adalah...
A) Langsung pergi tanpa bicara.
B) Menyimpan penghapus itu selamanya.
C) Mengucapkan terima kasih.
D) Mengejek penghapus Joko.`,
    `[Soal 7 - PG - Tipe: Reguler]
Made menyanyikan lagu daerahnya di kelas. Sikap bijak teman-teman adalah...
A) Mendengarkan dengan hormat.
B) Tertawa karena lagunya aneh.
C) Menyuruh Made diam.
D) Keluar kelas.`,
    `[Soal 8 - PG - Tipe: HOTS]
Apa yang akan terjadi jika semua manusia memiliki wajah, suara, dan sifat yang persis sama?
A) Dunia menjadi lebih mudah karena semua orang identik.
B) Dunia terasa membosankan dan kita sulit saling mengenal keunikan.
C) Semua orang otomatis menjadi teman baik.
D) Tidak ada perubahan sama sekali.`,
    `[Soal 9 - PG - Tipe: Reguler]
Nia berkata kelas jadi berwarna karena kita berbeda-beda. Artinya...
A) Hanya pensil merah yang boleh dipakai.
B) Perbedaan membuat kelas jelek.
C) Perbedaan membuat kelas indah seperti pelangi.
D) Semua anak harus sama.`,
    `[Soal 10 - PG - Tipe: Reguler]
Wujud syukur kepada Tuhan karena tubuh kita unik adalah...
A) Menghargai dan merawat tubuh sendiri, serta tidak mengejek tubuh teman.
B) Membandingkan tubuh agar terlihat lebih hebat.
C) Menyembunyikan perbedaan.
D) Memaksa teman mengubah dirinya.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog di Pojok Literasi",
      pengantar:
        "Di pojok literasi kelas, Nia menggambar memakai tangan kanan. Made menggambar memakai tangan kiri. Di dekat mereka, Joko duduk di kursi roda.",
      labelDaftar: "Percakapan Nia, Made, dan Joko",
      kolom: 1,
      item: [
        {
          nama: "Made memakai tangan kiri",
          singkat: "Unik sejak lahir",
          uraian:
            "Made menjelaskan bahwa tangan kiri adalah pemberian Tuhan. Tangan kiri atau kanan sama-sama hebat asalkan dipakai untuk kebaikan.",
          contoh: "Tangan kiri atau kanan sama-sama hebat.",
        },
        {
          nama: "Joko memakai kursi roda",
          singkat: "Fisik boleh berbeda",
          uraian:
            "Joko memakai kursi roda untuk berjalan. Fisik boleh berbeda, tetapi semua anak bisa belajar bersama dan berteman baik.",
          contoh: "Kita semua bisa belajar bersama.",
        },
        {
          nama: "Kelas jadi berwarna",
          singkat: "Perbedaan itu indah",
          uraian:
            "Nia membayangkan jika pensilnya hanya merah, gambarnya tidak indah. Karena kita berbeda-beda, kelas jadi berwarna.",
          contoh: "Kelas kita jadi berwarna!",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Made menggambar memakai tangan yang mana?",
          alias: ["kiri", "tangan kiri", "kidal"],
        },
        {
          pertanyaan: "2. Joko memakai apa untuk berjalan?",
          alias: ["kursi roda", "kursi", "roda"],
        },
        {
          pertanyaan: "3. Menurut Nia, kelas jadi apa karena kita berbeda?",
          alias: ["berwarna", "indah", "berwarna indah", "pelangi"],
        },
      ],
      voice: [
        [
          "Anak-anak, kita ke pojok literasi. Nia menggambar memakai tangan kanan. Made menggambar memakai tangan kiri.",
          "Nia berkata, Made, kamu unik sekali. Menulis dan menggambar memakai tangan kiri. Apakah tidak sulit?",
          "Made menjawab, Tidak, Nia. Ini pemberian Tuhan sejak lahir. Tangan kiri atau kanan sama-sama hebat asalkan dipakai untuk kebaikan.",
        ],
        [
          "Joko berkata, Betul, Made! Aku memakai kursi roda untuk berjalan. Fisik kita boleh berbeda, tapi kita semua bisa belajar bersama dan berteman baik.",
          "Nia tersenyum. Kalau pensilku hanya merah, gambarku tidak indah. Karena kita berbeda-beda, kelas kita jadi berwarna!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Pelangi di Kelasku",
      pengantar:
        "Setiap manusia diciptakan unik oleh Tuhan Yang Maha Esa. Perbedaan suku, agama, ras, maupun kemampuan fisik bukan pemisah, melainkan kekuatan Bhinneka Tunggal Ika.",
      labelDaftar: "Identitas, Cara Menghargai, Manfaat Nyata",
      kolom: 1,
      item: [
        {
          nama: "Hakikat identitas diri",
          singkat: "Sila ke-1",
          uraian:
            "Identitas diri meliputi ciri fisik, hobi, dan asal-usul. Menghargai dan merawat tubuh sendiri adalah wujud syukur kepada Pencipta.",
          contoh: "Rambut keriting atau lurus sama-sama indah.",
        },
        {
          nama: "Kebinekaan sebagai kekuatan",
          singkat: "Sila ke-3",
          uraian:
            "Menerima keunikan teman tanpa perundungan. Perbedaan adalah laboratorium sosial untuk menumbuhkan empati.",
          contoh: "Tidak mengejek kekurangan teman.",
        },
        {
          nama: "Cara menghargai",
          singkat: "Ajak bermain bersama",
          uraian:
            "Mengajak bermain, bergantian memakai mainan, dan tidak mengejek. Manfaatnya: kelas damai dan punya banyak teman pintar.",
          contoh: "Bergantian memakai mainan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Identitas diri adalah pemberian siapa?",
          alias: ["tuhan", "tuhan yang maha esa", "pencipta"],
        },
        {
          pertanyaan: "2. Tidak mengejek teman termasuk cara apa?",
          alias: ["menghargai", "menghormati", "cara menghargai"],
        },
        {
          pertanyaan: "3. Jika semua orang sama persis, dunia terasa apa?",
          alias: ["membosankan", "bosan", "sulit mengenal", "tidak indah"],
        },
      ],
      voice: [
        [
          "Setiap manusia diciptakan unik oleh Tuhan Yang Maha Esa. Identitas diri meliputi ciri fisik, hobi, dan asal-usul.",
          "Menghargai dan merawat tubuh sendiri adalah wujud syukur kepada Pencipta.",
        ],
        [
          "Perbedaan suku, agama, ras, maupun kemampuan fisik bukan pemisah. Terima keunikan teman tanpa perundungan.",
          "Ajak bermain bersama, bergantian memakai mainan, jangan mengejek. Kelas jadi damai dan punya banyak teman pintar.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Pohon Keragaman di Sekolah dan di Rumah",
      pengantar:
        "Keragaman dipraktikkan. Di sekolah kita membuat pohon keragaman. Di rumah kita bercerita tentang teman dan cara membantu.",
      labelDaftar: "Dua Tempat Berlatih",
      kolom: 2,
      item: [
        {
          nama: "Pohon Keragaman",
          singkat: "Untuk guru",
          uraian:
            "Setiap anak menjiplak telapak tangannya di kertas warna-warni, menulis nama dan hobi, lalu menempelkannya di batang pohon besar. Guru mendiskusikan indahnya pohon karena warna yang beragam.",
          contoh: "Jiplak tangan, tulis nama dan hobi.",
        },
        {
          nama: "Cerita teman baru",
          singkat: "Untuk orang tua",
          uraian:
            "Ajak anak bercerita tentang teman barunya. Stimulus empati: Bagaimana cara Kakak membantu teman yang sedang kesulitan di kelas?",
          contoh: "Bagaimana cara membantu teman yang kesulitan?",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Di pohon keragaman, anak menjiplak apa?",
          alias: ["tangan", "telapak tangan", "telapak"],
        },
        {
          pertanyaan: "2. Pohon indah karena warnanya apa?",
          alias: ["beragam", "berbeda", "beraneka", "bermacam"],
        },
        {
          pertanyaan: "3. Di rumah, orang tua menanyakan cara apa kepada anak?",
          alias: ["membantu teman", "membantu", "menolong teman", "empati"],
        },
      ],
      voice: [
        [
          "Di sekolah, kita membuat Pohon Keragaman. Jiplak telapak tangan di kertas warna-warni. Tulis nama dan hobimu. Tempel di batang pohon besar.",
          "Pohon itu indah karena warnanya beragam, seperti kita di kelas.",
        ],
        [
          "Di rumah, ceritakan teman barumu. Orang tua bisa bertanya, bagaimana cara Kakak membantu teman yang sedang kesulitan di kelas?",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Saatnya menunjukkan sikap berteman tanpa perundungan. Pilih sikap terbaik, tentukan benar atau salah, lalu hubungkan situasi dengan sikap bijak.",
      labelDaftar: "Tiga Kelompok Soal",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Pilihan ganda HOTS",
          uraian:
            "Pilih sikap terbaik saat Made dan Joko ingin bermain bersama, dan saat teman baru tampak sedih.",
          contoh: "Cari permainan yang bisa dimainkan bersama.",
        },
        {
          nama: "Kelompok B",
          singkat: "Benar atau salah",
          uraian:
            "Tentukan benar atau salah, lalu tulis alasannya. Mengajak teman berkulit gelap bermain adalah benar. Hanya menolong satu suku atau agama adalah salah.",
          contoh: "Menolong semua teman, bukan hanya satu suku.",
        },
        {
          nama: "Kelompok C",
          singkat: "Menghubungkan kasus",
          uraian:
            "Hubungkan situasi dengan sikap bijak: minta maaf, ucapkan terima kasih, dengarkan dengan hormat.",
          contoh: "Pensil jatuh: minta maaf.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Made dan Joko ingin bermain bersama. Sikap terbaik?",
          alias: [
            "permainan bersama",
            "bermain bersama",
            "cari permainan baru",
            "bersama",
          ],
        },
        {
          pertanyaan: "2. Teman baru tampak sedih. Apa yang kamu lakukan?",
          alias: ["menyapa", "mengajak bermain", "senyum", "menghampiri"],
        },
        {
          pertanyaan: "3. Mengajak teman berkulit gelap bermain. Benar atau salah?",
          alias: ["benar", "betul", "iya"],
        },
        {
          pertanyaan: "4. Hanya menolong teman satu suku. Benar atau salah?",
          alias: ["salah", "tidak", "bukan"],
        },
        {
          pertanyaan: "5. Nia menjatuhkan pensil Made. Sikap Nia?",
          alias: ["minta maaf", "meminta maaf", "maaf"],
        },
        {
          pertanyaan: "6. Joko meminjamkan penghapus. Sikap Nia?",
          alias: ["terima kasih", "mengucapkan terima kasih", "makasih"],
        },
        {
          pertanyaan: "7. Made menyanyi lagu daerah. Sikap teman?",
          alias: ["mendengarkan", "hormat", "mendengarkan dengan hormat"],
        },
      ],
      voice: [
        [
          "Ini lembar evaluasi. Kelompok A: pilih sikap terbaik saat bermain bersama dan saat teman tampak sedih.",
          "Kelompok B: tentukan benar atau salah, lalu tulis alasannya.",
        ],
        [
          "Kelompok C: hubungkan situasi dengan sikap bijak. Pensil jatuh, minta maaf. Dipinjami penghapus, ucapkan terima kasih. Teman menyanyi lagu daerah, dengarkan dengan hormat.",
        ],
      ],
    },
  ],
};
