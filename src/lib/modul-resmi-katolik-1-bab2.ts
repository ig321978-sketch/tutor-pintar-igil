import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_KATOLIK1_BAB2 = "Bab 2: Rumahku, Gereja Kecilku";

export const MODUL_KATOLIK1_BAB2: ModulResmiPai = {
  id: "katolik-1-bab2",
  judul: JUDUL_KATOLIK1_BAB2,
  pola: /rumahku|gereja kecil|keluarga kudus|kitab suci dan doa/,
  motivasi:
    "Rumah adalah Gereja Domestik. Kita meniru Keluarga Kudus Nazaret: berdoa, taat, dan saling menolong tanpa bertengkar.",
  kunciJawaban: "B,B,A,C,B,A,B,C,A,B",
  sketsaKartu: [
    "Nia dan Ibu menyalakan lilin di depan patung Bunda Maria dan Tuhan Yesus.",
    "Keluarga Kudus Nazaret: Yesus kecil, Maria, dan Yosef bekerja bersama.",
    "Anak merapikan mainan lalu ikut doa rosario jam tujuh malam.",
    "Anak membantu mencuci piring, bukan menyerahkan semua kepada Ibu.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Setiap malam pukul 19.00, Ayah mengajak semua anggota keluarga berkumpul untuk berdoa rosario bersama. Sikapmu sebagai anak yang meneladani Yesus kecil di Nazaret adalah...
A) Meminta izin untuk terus menonton televisi atau bermain game saja.
B) Langsung merapikan mainan, mematikan televisi, dan ikut berdoa dengan sikap batin yang sopan dan khusyuk.
C) Ikut duduk bersama keluarga tetapi sambil berteriak dan bercanda di depan altar.
D) Tidur di kamar supaya tidak dipanggil.`,
    `[Soal 2 - PG - Tipe: HOTS]
Pernyataan: tugas membersihkan rumah dan mencuci piring adalah tugas Ibu saja, anak-anak tidak perlu ikut membantu. Pernyataan ini...
A) Benar, karena anak hanya perlu bermain.
B) Salah, karena keluarga saling menolong seperti Keluarga Kudus Nazaret; anak juga membantu di rumah.
C) Benar, supaya Ibu tidak bosan.
D) Tidak penting dibahas.`,
    `[Soal 3 - PG - Tipe: Reguler]
Gereja Domestik artinya...
A) Rumah kita adalah Gereja kecil di mana Tuhan Yesus tinggal bersama keluarga.
B) Hanya gedung gereja di paroki.
C) Tempat bermain game.
D) Toko lilin.`,
    `[Soal 4 - PG - Tipe: Reguler]
Keluarga Kudus Nazaret terdiri dari...
A) Hanya Bunda Maria.
B) Hanya Santo Yosef.
C) Tuhan Yesus, Bunda Maria, dan Santo Yosef.
D) Semua tetangga desa.`,
    `[Soal 5 - PG - Tipe: Reguler]
Yesus kecil di Nazaret...
A) Tidak pernah membantu.
B) Sangat taat membantu Santo Yosef dan mendengarkan Bunda Maria.
C) Hanya bermain di bengkel.
D) Membantah setiap hari.`,
    `[Soal 6 - PG - Tipe: Reguler]
Tempat pertama anak belajar tanda salib, Bapa Kami, dan Salam Maria adalah...
A) Keluarga, Gereja Domestik.
B) Hanya di kantin.
C) Hanya di lapangan.
D) Hanya di toko buku.`,
    `[Soal 7 - PG - Tipe: Reguler]
Perintah Allah yang keempat mengingatkan kita untuk...
A) Menghormati ayah dan ibu.
B) Menyembunyikan mainan.
C) Menolak doa bersama.
D) Menonton terus saat rosario.`,
    `[Soal 8 - PG - Tipe: HOTS]
Nia senang berdoa bersama karena rumah terasa damai. Damai itu tumbuh jika...
A) Semua rebutan remote.
B) Semua berteriak di altar.
C) Keluarga berdoa dan saling menolong tanpa bertengkar.
D) Anak tidak perlu membantu piring.`,
    `[Soal 9 - PG - Tipe: Reguler]
Teladan Keluarga Kudus dipenuhi...
A) Ketaatan, kesederhanaan, dan kasih.
B) Harta yang berlimpah.
C) Pertengkaran setiap malam.
D) Televisi yang tidak pernah mati.`,
    `[Soal 10 - PG - Tipe: HOTS]
Jika kita ikut duduk doa tetapi bercanda keras di depan altar, yang kurang adalah...
A) Mainan baru.
B) Sikap batin yang sopan dan khusyuk.
C) Lilin yang lebih besar.
D) Volume televisi.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Lilin Doa di Ruang Keluarga",
      pengantar:
        "Di ruang keluarga. Nia membantu Ibu menyalakan lilin di depan patung Bunda Maria dan Tuhan Yesus sebelum doa malam.",
      labelDaftar: "Percakapan tentang Gereja Domestik dan Keluarga Kudus",
      kolom: 1,
      item: [
        {
          nama: "Rumah yang damai",
          singkat: "Doa bersama",
          uraian:
            "Nia senang berdoa bersama. Rumah terasa damai. Ibu menyebut rumah sebagai Gereja Domestik: Gereja kecil di mana Tuhan Yesus tinggal bersama keluarga.",
          contoh: "Doa bersama. Rumah jadi damai.",
        },
        {
          nama: "Nazaret",
          singkat: "Yesus, Maria, Yosef",
          uraian:
            "Ali bertanya apakah Keluarga Kudus juga berdoa dan bekerja sama. Ibu menjawab: Yesus kecil taat membantu Santo Yosef dan mendengarkan Bunda Maria.",
          contoh: "Mereka berdoa. Mereka saling menolong.",
        },
        {
          nama: "Tanpa bertengkar",
          singkat: "Teladan suci",
          uraian:
            "Keluarga kita meniru teladan suci mereka dengan saling menolong tanpa bertengkar. Membersihkan rumah dan mencuci piring bukan tugas Ibu saja.",
          contoh: "Tolong. Jangan lempar semua ke Ibu.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Rumah kita disebut Gereja...?",
          alias: ["domestik", "kecil"],
        },
        {
          pertanyaan: "2. Keluarga Kudus Nazaret: Yesus, Maria, dan...?",
          alias: ["yosef", "joseph"],
        },
        {
          pertanyaan: "3. Yesus kecil membantu Santo...?",
          alias: ["yosef", "joseph"],
        },
      ],
      voice: [
        [
          "Nia menyalakan lilin bersama Ibu. Rumah adalah Gereja Domestik, Gereja kecil tempat Yesus tinggal bersama keluarga.",
        ],
        [
          "Yesus kecil taat membantu Yosef dan mendengar Maria. Kita saling menolong di rumah, tanpa bertengkar.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Gereja Domestik",
      pengantar:
        "Keluarga Kudus Nazaret adalah teladan. Di rumah, anak belajar doa, Kitab Suci, hormat kepada orang tua, dan kasih kepada saudara.",
      labelDaftar: "Ecclesia Domestica dan Perintah Allah ke-4",
      kolom: 1,
      item: [
        {
          nama: "Teladan Nazaret",
          singkat: "Taat, sederhana, kasih",
          uraian:
            "Model ideal keluarga Katolik adalah Keluarga Kudus Nazaret: ketaatan, kesederhanaan, dan kasih. Bukan rumah yang ramai bertengkar atau diam tanpa doa.",
          contoh: "Taat. Sederhana. Saling kasih.",
        },
        {
          nama: "Sekolah doa pertama",
          singkat: "Tanda salib sampai rosario",
          uraian:
            "Keluarga adalah tempat pertama anak belajar tanda salib, Bapa Kami, Salam Maria, membaca Kitab Suci, dan berdoa rosario bersama dengan khusyuk.",
          contoh: "Doa dipelajari di rumah dulu.",
        },
        {
          nama: "Perintah keempat",
          singkat: "Hormati orang tua",
          uraian:
            "Menghormati ayah dan ibu serta menyayangi saudara adalah kebajikan Kristiani. Saat Ayah memanggil rosario pukul tujuh, anak merapikan mainan, mematikan TV, dan ikut dengan sopan.",
          contoh: "TV mati. Mainan rapi. Doa khusyuk.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Tempat pertama belajar Bapa Kami dan Salam Maria?",
          alias: ["rumah", "keluarga"],
        },
        {
          pertanyaan: "2. Perintah Allah ke-4: hormati...?",
          alias: ["orang tua", "ayah", "ibu"],
        },
        {
          pertanyaan: "3. Cuci piring hanya tugas Ibu: benar atau salah?",
          alias: ["salah"],
        },
      ],
      voice: [
        [
          "Keluarga Kudus Nazaret penuh ketaatan, kesederhanaan, dan kasih. Rumah adalah sekolah doa yang pertama.",
        ],
        [
          "Pukul tujuh rosario: rapikan mainan, matikan televisi, duduk khusyuk. Cuci piring dan bersih rumah dikerjakan bersama, bukan Ibu saja.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Doa dan Tugas di Sekolah dan di Rumah",
      pengantar:
        "Gereja kecil tumbuh dari kebiasaan kecil: lilin, doa, tangan yang menolong. Guru memandu cerita Nazaret. Orang tua menuntun doa malam.",
      labelDaftar: "Latihan meneladani Yesus kecil",
      kolom: 2,
      item: [
        {
          nama: "Jam rosario",
          singkat: "Untuk guru",
          uraian:
            "Perankan Ayah yang memanggil doa pukul 19.00. Diskusikan tiga sikap: tetap nonton, berteriak di altar, atau merapikan mainan lalu berdoa khusyuk. Mana yang seperti Yesus kecil?",
          contoh: "Rapikan. Matikan TV. Doa sopan.",
        },
        {
          nama: "Satu tugas rumah",
          singkat: "Untuk orang tua",
          uraian:
            "Ajak anak menyalakan lilin, membuat tanda salib, atau mencuci satu piring. Ingatkan: ini Gereja Domestik, bukan hotel. Jangan paksa doa yang terlalu panjang untuk usia tujuh tahun.",
          contoh: "Lilin. Tanda salib. Satu piring.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Ayah memanggil rosario: kita nonton terus atau ikut doa?",
          alias: ["doa", "ikut", "rapikan"],
        },
        {
          pertanyaan: "2. Membersihkan rumah dikerjakan oleh...?",
          alias: ["semua", "bersama", "keluarga"],
        },
        {
          pertanyaan: "3. Rumah kita adalah Gereja...?",
          alias: ["kecil", "domestik"],
        },
      ],
      voice: [
        [
          "Saat rosario, rapikan mainan dan ikut dengan khusyuk. Jangan nonton terus, jangan bercanda di altar.",
        ],
        [
          "Di rumah, bantu piring dan bersih-bersih. Keluarga Kudus saling menolong. Ibu tidak bekerja sendirian.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih sikap saat rosario malam, lalu tentukan benar atau salah: cuci piring hanya tugas Ibu.",
      labelDaftar: "Kasus ketaatan dan benar-salah",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Rosario pukul 19.00",
          uraian:
            "Anak yang meneladani Yesus kecil merapikan mainan, mematikan TV, dan berdoa sopan khusyuk. Bukan terus nonton, bukan berteriak di altar.",
          contoh: "Rapikan. TV mati. Doa khusyuk.",
        },
        {
          nama: "Kelompok B",
          singkat: "Bukan tugas Ibu saja",
          uraian:
            "Pernyataan 'cuci piring dan bersih rumah hanya tugas Ibu' adalah salah. Keluarga Kudus saling menolong. Anak ikut membantu.",
          contoh: "Salah. Kita ikut menolong.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Rosario malam: sikap seperti Yesus kecil yang mana?",
          alias: ["doa", "rapikan", "khusyuk"],
        },
        {
          pertanyaan: "2. Cuci piring hanya tugas Ibu: benar atau salah?",
          alias: ["salah"],
        },
      ],
      voice: [
        [
          "Pukul tujuh rosario: rapikan mainan, matikan televisi, berdoa dengan sopan. Itu teladan Yesus kecil.",
        ],
        [
          "Salah jika cuci piring hanya tugas Ibu. Di Gereja Domestik, semua saling menolong seperti Keluarga Kudus.",
        ],
      ],
    },
  ],
};
