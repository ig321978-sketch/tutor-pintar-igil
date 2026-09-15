import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_PANCASILA1_BAB2 = "Bab 2: Aku Patuh Pada Aturan";

export const MODUL_PANCASILA1_BAB2: ModulResmiPai = {
  id: "pancasila-1-bab2",
  judul: JUDUL_PANCASILA1_BAB2,
  pola: /aku patuh pada aturan|patuh pada aturan|sebab.?akibat aturan/,
  motivasi:
    "Aturan membuat kita tertib. Datang tepat waktu, antre, dan pamit pada orang tua.",
  kunciJawaban: "B,C,B,A,A,B,C,A,B,C",
  sketsaKartu: [
    "Ali terburu-buru di gerbang sekolah karena begadang menonton televisi.",
    "Infografis sebab dan akibat aturan: pamit, tepat waktu, antre.",
    "Siswa membuat kesepakatan kelas sambil mengangkat tangan.",
    "Anak mengerjakan lembar evaluasi tentang mematuhi aturan.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Di kantin yang ramai, Ali lapar dan ingin memotong antrean. Tindakan Ali salah karena...
A) Penjual kantin akan memarahi Ali.
B) Ali mengambil hak orang lain yang sudah datang lebih dahulu dan mengganggu ketertiban.
C) Makanan di kantin akan habis jika Ali mengantre.
D) Antrean membuat Ali terlambat pulang.`,
    `[Soal 2 - PG - Tipe: HOTS]
Rumah berantakan karena mainan adik berserakan. Sikapmu sebagai anak yang tahu aturan rumah adalah...
A) Memarahi adik karena membuat rumah kotor.
B) Membiarkannya saja karena itu bukan mainan milikmu.
C) Mengajak adik merapikan mainan sambil memberi tahu aturan rumah dengan lembut.
D) Menyembunyikan mainan adik.`,
    `[Soal 3 - PG - Tipe: Reguler]
Menyeberang di zebra cross adalah aturan yang...
A) Hanya untuk orang dewasa.
B) Melindungi keselamatan diri kita sendiri.
C) Boleh dilanggar jika sedang terburu-buru.
D) Hanya berlaku jika ada polisi.`,
    `[Soal 4 - PG - Tipe: Reguler]
Aturan di sekolah hanya berlaku ketika ada guru yang mengawasi. Pernyataan ini...
A) Salah, karena aturan tetap berlaku meski tidak ada yang mengawasi.
B) Benar, karena anak kecil belum mengerti.
C) Benar jika kepala sekolah tidak ada.
D) Hanya berlaku di kantin.`,
    `[Soal 5 - PG - Tipe: Reguler]
Ali menonton televisi sampai larut malam lalu hampir terlambat. Aturan tidur dibuat agar...
A) Tubuh sehat dan tidak terlambat ke sekolah.
B) Televisi cepat rusak.
C) Orang tua marah setiap malam.
D) Teman tidak bisa menelpon.`,
    `[Soal 6 - PG - Tipe: Reguler]
Kita mendengarkan guru atau teman berbicara di depan kelas agar...
A) Kelas menjadi sepi dan menakutkan.
B) Kita mendapatkan ilmu dan menghormati hak orang lain.
C) Kita bisa tidur di bangku.
D) Guru memberi hadiah setiap hari.`,
    `[Soal 7 - PG - Tipe: Reguler]
Akibat malas merapikan tempat tidur adalah kamar menjadi...
A) Lebih luas dan wangi.
B) Tempat bermain yang lebih seru.
C) Kotor dan tidak nyaman untuk ditempati.
D) Tempat menyimpan makanan.`,
    `[Soal 8 - PG - Tipe: HOTS]
Apa jadinya jika lampu lalu lintas dimatikan dan semua orang berjalan sesuka hati?
A) Jalan menjadi kacau, bahaya, dan mudah terjadi tabrakan.
B) Semua orang lebih cepat sampai.
C) Tidak ada perubahan.
D) Anak-anak lebih senang bermain di jalan.`,
    `[Soal 9 - PG - Tipe: Reguler]
Pamit kepada orang tua sebelum pergi berguna agar...
A) Kita boleh pulang kapan saja.
B) Orang tua tenang mengetahui kita ke mana.
C) Teman iri melihat kita.
D) Pelajaran di sekolah ditambah.`,
    `[Soal 10 - PG - Tipe: Reguler]
Kesepakatan kelas dibuat bersama murid supaya...
A) Guru saja yang mengatur semua.
B) Murid takut dihukum.
C) Tumbuh rasa tanggung jawab karena aturan dibuat sendiri.
D) Kelas tidak perlu aturan.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog di Gerbang Sekolah",
      pengantar:
        "Pagi hari di depan gerbang sekolah. Jam digital menunjukkan pukul 06.55. Ali berlari terengah-engah dan hampir menabrak Nia.",
      labelDaftar: "Percakapan Ali dan Nia",
      kolom: 1,
      item: [
        {
          nama: "Ali hampir terlambat",
          singkat: "Pukul 06.55",
          uraian:
            "Ali terburu-buru sampai lupa berpamitan pada ibu. Gerbang sekolah akan ditutup lima menit lagi.",
          contoh: "Gerbang ditutup lima menit lagi.",
        },
        {
          nama: "Akibat begadang",
          singkat: "Melanggar aturan tidur",
          uraian:
            "Semalam Ali menonton televisi sampai larut malam. Ia pikir tidak apa-apa sekali-sekali melanggar aturan tidur.",
          contoh: "Menonton sampai larut malam.",
        },
        {
          nama: "Aturan melindungi diri",
          singkat: "Supaya tidak rugi",
          uraian:
            "Nia mengingatkan: aturan tidur dibuat orang tua agar tubuh sehat dan tidak terlambat. Jika terlambat, Ali tertinggal pelajaran.",
          contoh: "Tertinggal pelajaran merugikan diri sendiri.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Jam berapa Ali tiba di gerbang?",
          alias: ["enam lima lima", "6.55", "hampir jam 7", "pagi"],
        },
        {
          pertanyaan: "2. Mengapa Ali terlambat bangun?",
          alias: [
            "nonton",
            "televisi",
            "begadang",
            "larut malam",
            "menonton televisi",
          ],
        },
        {
          pertanyaan: "3. Jika terlambat, Ali merugikan siapa?",
          alias: ["dirinya", "diri sendiri", "ali", "pelajaran"],
        },
      ],
      voice: [
        [
          "Pagi hari di gerbang sekolah. Jam menunjukkan pukul enam lewat lima puluh lima. Ali berlari terengah-engah dan hampir menabrak Nia.",
          "Ali berkata, Aduh Nia, maaf! Aku terburu-buru sampai lupa berpamitan pada ibuku.",
        ],
        [
          "Nia bertanya, kenapa kamu terlambat bangun? Gerbang ditutup lima menit lagi. Ali menjawab, semalam aku menonton televisi sampai larut malam.",
          "Nia mengingatkan, aturan tidur dibuat orang tua agar tubuh sehat dan tidak terlambat. Kalau terlambat, kamu tertinggal pelajaran.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Sebab dan Akibat Aturan",
      pengantar:
        "Aturan bukan alat mengekang kebebasan, melainkan instrumen ketertiban, keadilan, dan keamanan. Setiap aturan punya alasan logis. Hak anak dibatasi oleh hak orang lain.",
      labelDaftar: "Aturan, Mengapa Dibuat, Jika Dilanggar",
      kolom: 1,
      item: [
        {
          nama: "Pamit orang tua",
          singkat: "Agar orang tua tenang",
          uraian:
            "Pamit dibuat supaya orang tua tahu kita ke mana. Jika dilanggar, orang tua cemas.",
          contoh: "Pamit sebelum pergi ke sekolah.",
        },
        {
          nama: "Datang tepat waktu",
          singkat: "Agar kelas kondusif",
          uraian:
            "Datang tepat waktu menjaga ketenangan kelas. Jika dilanggar, kita tertinggal pelajaran.",
          contoh: "Jangan terlambat masuk kelas.",
        },
        {
          nama: "Antre di kantin",
          singkat: "Melatih kesabaran dan hak",
          uraian:
            "Antre menghormati orang yang datang lebih dulu. Jika dilanggar, terjadi pertengkaran.",
          contoh: "Jangan memotong antrean.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Jika tidak pamit, orang tua merasa apa?",
          alias: ["cemas", "khawatir", "gelisah", "takut"],
        },
        {
          pertanyaan: "2. Jika terlambat, kita bisa tertinggal apa?",
          alias: ["pelajaran", "materi", "belajar"],
        },
        {
          pertanyaan: "3. Jika lampu lalu lintas dimatikan, jalan menjadi apa?",
          alias: ["kacau", "bahaya", "tabrakan", "macet", "berbahaya"],
        },
      ],
      voice: [
        [
          "Aturan dibuat berdasarkan kesepakatan. Aturan menjaga ketertiban, keadilan, dan keamanan bersama.",
          "Pamit supaya orang tua tenang. Datang tepat waktu supaya kelas kondusif. Antre di kantin supaya hak orang lain terlindungi.",
        ],
        [
          "Bayangkan lampu lalu lintas dimatikan dan semua orang berjalan sesuka hati. Jalan menjadi kacau dan berbahaya. Itulah sebabnya aturan diperlukan.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Musyawarah Kelas dan Jadwal di Rumah",
      pengantar:
        "Aturan lebih mudah dijalankan jika kita ikut membuatnya. Di sekolah kita bermusyawarah. Di rumah kita menyusun jadwal harian.",
      labelDaftar: "Dua Tempat Berlatih",
      kolom: 2,
      item: [
        {
          nama: "Musyawarah Kelas",
          singkat: "Untuk guru",
          uraian:
            "Guru mengajak siswa membuat Kesepakatan Kelas bersama, misalnya mengangkat tangan sebelum bicara. Murid berpikir kritis tentang aturan yang mereka buat sendiri agar tumbuh rasa tanggung jawab.",
          contoh: "Angkat tangan sebelum bicara.",
        },
        {
          nama: "Jadwal harian",
          singkat: "Untuk orang tua",
          uraian:
            "Libatkan anak membuat jadwal harian. Tanyakan opininya: Menurutmu, jam berapa waktu yang baik untuk belajar dan bermain?",
          contoh: "Jam berapa waktu belajar dan bermain?",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Sebelum bicara di kelas, kita sebaiknya apa?",
          alias: ["angkat tangan", "mengangkat tangan", "tunjuk"],
        },
        {
          pertanyaan: "2. Kesepakatan kelas dibuat oleh siapa?",
          alias: ["bersama", "guru dan siswa", "semua", "murid bersama guru"],
        },
        {
          pertanyaan: "3. Di rumah, anak diajak membuat apa?",
          alias: ["jadwal", "jadwal harian", "aturan rumah"],
        },
      ],
      voice: [
        [
          "Di sekolah, kita bermusyawarah membuat Kesepakatan Kelas. Misalnya, angkat tangan sebelum bicara. Karena aturan dibuat bersama, kita bertanggung jawab menjaganya.",
        ],
        [
          "Di rumah, buat jadwal harian bersama. Tanyakan, jam berapa waktu yang baik untuk belajar dan bermain? Anak yang ikut menyusun jadwal lebih mudah menaatinya.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Saatnya menunjukkan pemahaman tentang aturan. Pilih alasan yang tepat, lengkapi kalimat, lalu tentukan benar atau salah.",
      labelDaftar: "Tiga Kelompok Soal",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Pilihan ganda HOTS",
          uraian:
            "Pilih alasan mengapa memotong antrean salah, dan sikap terbaik saat rumah berantakan.",
          contoh: "Jangan mengambil hak orang yang sudah antre.",
        },
        {
          nama: "Kelompok B",
          singkat: "Isian singkat",
          uraian:
            "Lengkapi: mendengarkan pembicara agar mendapat ilmu dan menghormati hak orang lain. Kamar jadi kotor dan tidak nyaman jika malas merapikan tempat tidur.",
          contoh: "Ilmu dan hak. Kotor dan nyaman.",
        },
        {
          nama: "Kelompok C",
          singkat: "Benar atau salah",
          uraian:
            "Menyeberang di zebra cross melindungi keselamatan: benar. Aturan sekolah hanya berlaku jika diawasi guru: salah.",
          contoh: "Aturan tetap berlaku tanpa pengawasan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Memotong antrean salah karena mengambil apa?",
          alias: ["hak", "hak orang lain", "giliran", "ketertiban"],
        },
        {
          pertanyaan: "2. Rumah berantakan. Sikap terbaik?",
          alias: ["merapikan", "mengajak adik", "rapikan bersama", "lembut"],
        },
        {
          pertanyaan: "3. Mendengarkan pembicara agar kita mendapat apa?",
          alias: ["ilmu", "pelajaran", "pengetahuan"],
        },
        {
          pertanyaan: "4. Kamar yang tidak dirapikan menjadi apa?",
          alias: ["kotor", "tidak nyaman", "berantakan", "kotor dan tidak nyaman"],
        },
        {
          pertanyaan: "5. Menyeberang di zebra cross melindungi keselamatan. Benar atau salah?",
          alias: ["benar", "betul", "iya"],
        },
        {
          pertanyaan: "6. Aturan sekolah hanya berlaku jika ada guru. Benar atau salah?",
          alias: ["salah", "tidak", "bukan"],
        },
      ],
      voice: [
        [
          "Ini lembar evaluasi. Kelompok A: pilih alasan yang tepat tentang antrean dan merapikan mainan.",
          "Kelompok B: lengkapi kalimat tentang ilmu, hak, kamar kotor, dan nyaman.",
        ],
        [
          "Kelompok C: menyeberang di zebra cross melindungi keselamatan. Itu benar. Aturan sekolah tetap berlaku meski guru tidak mengawasi. Jangan hanya patuh jika dilihat.",
        ],
      ],
    },
  ],
};
