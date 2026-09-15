import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_KATOLIK1_BAB1 = "Bab 1: Diriku Ciptaan yang Istimewa";

export const MODUL_KATOLIK1_BAB1: ModulResmiPai = {
  id: "katolik-1-bab1",
  judul: JUDUL_KATOLIK1_BAB1,
  pola: /diriku ciptaan|citra allah|allah bapa yang mengasihi/,
  motivasi:
    "Setiap anak adalah Citra Allah. Kita unik, kudus, dan berharga. Rawat tubuh, hormati teman, jangan mengejek: Kristus hadir dalam sesama.",
  kunciJawaban: "B,B,B,A,C,B,A,B,C,A",
  sketsaKartu: [
    "Ali dan Nia melihat bayangan wajah berbeda di kolam jernih.",
    "Anak-anak berbeda wajah seperti cermin kebaikan Allah.",
    "Made mencuci kaki berlumur di wastafel.",
    "Anak menolak mengejek teman yang pendek atau berkulit gelap.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Dalam pelajaran agama, kita belajar bahwa manusia adalah Citra Allah. Arti dari "Citra Allah" yang paling tepat untuk kehidupan sehari-hari di kelas 1 adalah...
A) Wajah kita harus selalu digambar di kertas agar mirip dengan Tuhan.
B) Diri kita dan sesama manusia adalah gambaran Allah yang mulia, sehingga kita wajib saling menghormati dan menyayangi.
C) Kita hanya perlu berteman dengan anak yang berwajah mirip dengan kita saja.
D) Citra Allah hanya untuk orang dewasa di gereja.`,
    `[Soal 2 - PG - Tipe: HOTS]
Saat bermain di halaman, kaki Made tidak sengaja mengenai lumpur hingga kotor. Tindakan bersyukur atas tubuh yang ditunjukkan Made adalah...
A) Membiarkan lumpur itu mengering sampai besok karena malas membersihkannya.
B) Segera pergi ke wastafel untuk mencuci kakinya dengan air bersih sebagai tanda merawat tubuh pemberian Allah.
C) Menangis keras dan meminta temannya yang membersihkan.
D) Mengoleskan lumpur ke teman lain.`,
    `[Soal 3 - PG - Tipe: HOTS]
Mengapa mengejek teman yang bertubuh pendek atau berkulit gelap tidak menghormati Tuhan?
A) Karena suster akan memarahi tanpa alasan.
B) Karena setiap orang adalah Citra Allah; mengejek ciptaan berarti tidak menghormati Tuhan yang memahat mereka dengan cinta.
C) Karena semua anak harus berwajah sama.
D) Karena kulit gelap tidak boleh disebut.`,
    `[Soal 4 - PG - Tipe: Reguler]
Kejadian 1:26-27 mengajarkan manusia diciptakan...
A) Sebagai secitra dengan Allah, Imago Dei.
B) Sebagai salinan foto di majalah.
C) Tanpa keunikan apa pun.
D) Hanya untuk bermain sendiri.`,
    `[Soal 5 - PG - Tipe: Reguler]
Keunikan fisik, bakat, dan karakter adalah...
A) Hukuman.
B) Kesalahan pabrik.
C) Anugerah atau rahmat dari Allah yang mahabaik.
D) Alasan untuk mengejek.`,
    `[Soal 6 - PG - Tipe: Reguler]
Tubuh kita disebut pemberian Tuhan yang kudus. Artinya...
A) Tubuh boleh dikotori terus-menerus.
B) Kita merawat kesehatan dan kebersihan sebagai syukur.
C) Hanya rambut yang kudus.
D) Kita tidak perlu mandi.`,
    `[Soal 7 - PG - Tipe: Reguler]
Matius 25:40 mengingatkan: apa yang kita lakukan kepada sesama...
A) Kita lakukan kepada Kristus yang hadir dalam diri mereka.
B) Tidak ada hubungannya dengan iman.
C) Hanya berlaku di gereja.
D) Hanya untuk keluarga sendiri.`,
    `[Soal 8 - PG - Tipe: HOTS]
Sikap anti-perundungan di kelas 1 yang paling tepat adalah...
A) Ikut tertawa supaya aman.
B) Menolak mengejek dan mengingatkan bahwa setiap anak adalah cermin kebaikan Tuhan.
C) Menyembunyikan teman yang diejek.
D) Membalas dengan ejekan yang lebih keras.`,
    `[Soal 9 - PG - Tipe: Reguler]
Tidak ada manusia yang...
A) Boleh berbeda rambut.
B) Perlu dicuci kakinya.
C) Kembar identik sama persis di seluruh dunia, menurut Nia.
D) Boleh berteman lintas wajah.`,
    `[Soal 10 - PG - Tipe: Reguler]
Bersyukur atas diri sendiri diwujudkan dengan...
A) Merawat kesehatan dan memperlakukan teman penuh hormat.
B) Menyembunyikan wajah di kolam.
C) Hanya berteman dengan yang mirip.
D) Membiarkan tubuh kotor.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Bayangan di Kolam Taman",
      pengantar:
        "Di taman sekolah. Ali dan Nia melihat bayangan mereka di air kolam yang jernih.",
      labelDaftar: "Percakapan Ali dan Nia tentang wajah yang berbeda",
      kolom: 1,
      item: [
        {
          nama: "Wajah di air",
          singkat: "Pendek dan kuncir dua",
          uraian:
            "Ali rambutnya pendek, Nia dikuncir dua. Bayangan di kolam memperlihatkan perbedaan dengan jelas. Berbeda bukan berarti salah.",
          contoh: "Lihat bayangan. Kita berbeda. Kita istimewa.",
        },
        {
          nama: "Tidak ada yang sama persis",
          singkat: "Kata suster",
          uraian:
            "Suster di sekolah minggu berkata: Allah menciptakan kita masing-masing secara istimewa. Tidak ada manusia yang kembar identik sama persis di dunia.",
          contoh: "Istimewa satu-satu. Bukan salinan.",
        },
        {
          nama: "Citra Allah",
          singkat: "Cermin kebaikan Tuhan",
          uraian:
            "Setiap orang adalah Citra Allah, seperti cermin yang memantulkan kebaikan Tuhan. Mengejek ciptaan-Nya berarti tidak menghormati Tuhan yang memahat mereka dengan cinta.",
          contoh: "Ejek teman = tidak hormat pada Tuhan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Ali dan Nia melihat wajah mereka di mana?",
          alias: ["kolam", "air"],
        },
        {
          pertanyaan: "2. Setiap orang adalah Citra...?",
          alias: ["allah", "tuhan"],
        },
        {
          pertanyaan: "3. Mengejek ciptaan berarti tidak menghormati...?",
          alias: ["tuhan", "allah"],
        },
      ],
      voice: [
        [
          "Ali dan Nia melihat bayangan di kolam. Rambut Ali pendek, Nia dikuncir dua. Kita berbeda, kita istimewa.",
        ],
        [
          "Setiap orang adalah Citra Allah, cermin kebaikan Tuhan. Mengejek teman yang pendek atau berkulit gelap berarti tidak menghormati Tuhan.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Citra Allah dan Tubuh yang Kudus",
      pengantar:
        "Manusia secitra dengan Allah. Keunikan adalah rahmat. Tubuh kudus dirawat; sesama dihormati karena Kristus hadir dalam diri mereka.",
      labelDaftar: "Kejadian 1:26-27 dan Matius 25:40",
      kolom: 1,
      item: [
        {
          nama: "Imago Dei",
          singkat: "Kejadian 1:26-27",
          uraian:
            "Manusia diciptakan sebagai secitra dengan Allah. Keunikan fisik, bakat, dan karakter adalah anugerah gratis, rahmat dari Allah yang mahabaik. Tidak ada anak yang gagal.",
          contoh: "Unik = rahmat, bukan cacat.",
        },
        {
          nama: "Tubuh kudus",
          singkat: "Pemberian yang dirawat",
          uraian:
            "Tubuh adalah pemberian Tuhan yang kudus. Syukur tampak saat Made mencuci kaki berlumur di wastafel, bukan membiarkan kotor atau meminta orang lain yang membersihkan.",
          contoh: "Kotor? Cuci sekarang. Itu syukur.",
        },
        {
          nama: "Kristus dalam sesama",
          singkat: "Matius 25:40",
          uraian:
            "Memperlakukan teman dengan hormat, tanpa perundungan, karena Kristus sendiri hadir dalam diri sesama. Menghormati wajah yang berbeda adalah menghormati Tuhan.",
          contoh: "Hormati teman. Hormati Kristus.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Citra Allah artinya kita adalah... Allah yang mulia?",
          alias: ["gambaran", "citra", "cermin"],
        },
        {
          pertanyaan: "2. Kaki Made kotor lumpur: ia pergi ke...?",
          alias: ["wastafel", "cuci", "air"],
        },
        {
          pertanyaan: "3. Kristus hadir dalam diri...?",
          alias: ["sesama", "teman", "orang"],
        },
      ],
      voice: [
        [
          "Kejadian satu: manusia secitra dengan Allah. Bakat dan wajah yang berbeda adalah rahmat, bukan alasan mengejek.",
        ],
        [
          "Kaki kotor dicuci di wastafel. Itu merawat tubuh kudus. Matius dua puluh lima: apa yang kita lakukan kepada sesama, kita lakukan kepada Kristus.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Hormat di Sekolah dan di Rumah",
      pengantar:
        "Citra Allah dilatih dengan mata yang menolak ejekan dan tangan yang merawat tubuh. Guru memandu di kelas. Orang tua menemani di rumah.",
      labelDaftar: "Latihan anti-perundungan dan merawat tubuh",
      kolom: 2,
      item: [
        {
          nama: "Lingkaran kolam",
          singkat: "Untuk guru",
          uraian:
            "Setiap anak menyebut satu keunikan teman, lalu berkata: kamu Citra Allah. Diskusikan: apa yang kita ucapkan jika ada yang mengejek tubuh pendek atau kulit gelap?",
          contoh: "Sapa. Hormati. Tolak ejekan.",
        },
        {
          nama: "Wastafel syukur",
          singkat: "Untuk orang tua",
          uraian:
            "Temani anak mencuci tangan atau kaki yang kotor tanpa menunda. Bacakan Kejadian 1:27 dengan kata sederhana. Tanyakan: tubuh ini pemberian siapa?",
          contoh: "Cuci. Syukur. Jangan tunda.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Teman diejek karena pendek: kita ikut ejek atau menolak?",
          alias: ["menolak", "tolak", "hormat"],
        },
        {
          pertanyaan: "2. Kaki berlumur segera...?",
          alias: ["dicuci", "cuci", "wastafel"],
        },
        {
          pertanyaan: "3. Kita adalah Citra...?",
          alias: ["allah", "tuhan"],
        },
      ],
      voice: [
        [
          "Di kelas, sebut keunikan teman dan katakan: kamu Citra Allah. Jangan ikut mengejek.",
        ],
        [
          "Di rumah, cuci kaki atau tangan yang kotor sekarang. Tubuh kudus adalah pemberian Allah.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih arti Citra Allah di kelas 1, lalu pilih cara Made bersyukur saat kaki berlumur.",
      labelDaftar: "Pilihan ganda analisis HOTS",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Arti Citra Allah",
          uraian:
            "Citra Allah: diri kita dan sesama adalah gambaran Allah yang mulia, wajib dihormati dan disayangi. Bukan menggambar wajah Tuhan di kertas, bukan hanya berteman dengan yang mirip.",
          contoh: "Hormati semua. Jangan pilih-pilih wajah.",
        },
        {
          nama: "Kaki berlumur",
          singkat: "Syukur yang kelihatan",
          uraian:
            "Made mencuci kaki di wastafel. Itu merawat tubuh pemberian Allah. Bukan membiarkan lumpur mengering, bukan menangis meminta teman yang membersihkan.",
          contoh: "Cuci sendiri. Itu syukur.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Citra Allah di kelas 1 artinya kita wajib... sesama?",
          alias: ["hormat", "hormati", "sayang", "menghormati"],
        },
        {
          pertanyaan: "2. Kaki Made kotor: ia pergi ke wastafel untuk...?",
          alias: ["cuci", "mencuci", "air"],
        },
      ],
      voice: [
        [
          "Citra Allah berarti kita dan teman adalah gambaran Allah yang mulia. Kita wajib saling menghormati dan menyayangi.",
        ],
        [
          "Kaki berlumur dicuci di wastafel. Itu bersyukur atas tubuh pemberian Allah, bukan malas, bukan minta orang lain yang mencuci.",
        ],
      ],
    },
  ],
};
