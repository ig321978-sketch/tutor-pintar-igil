import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_KRISTEN1_BAB2 = "Bab 2: Keluargaku yang Pengasih";

export const MODUL_KRISTEN1_BAB2: ModulResmiPai = {
  id: "kristen-1-bab2",
  judul: JUDUL_KRISTEN1_BAB2,
  pola:
    /keluargaku yang pengasih|peran keluarga|keluarga ciptaan|alkitab firman/,
  motivasi:
    "Allah menitipkan kita di keluarga supaya kita merasakan kasih. Hormati orang tua dengan taat, kata sopan, dan tangan yang suka menolong.",
  kunciJawaban: "B,B,A,C,B,A,B,C,A,B",
  sketsaKartu: [
    "Ali dan ibunya merapikan buku pelajaran di ruang makan.",
    "Keluarga kecil duduk bersama: ayah, ibu, anak, dengan hati hangat.",
    "Anak merapikan balok ke dalam kotak dengan wajah gembira.",
    "Anak mendengarkan nasihat orang tua, bukan hanya saat dapat mainan.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Setelah selesai bermain mainan balok di ruang tamu, Ibu meminta tolong kepadamu untuk segera merapikannya kembali ke dalam kotak. Tindakan anak yang taat dan mengasihi keluarganya adalah...
A) Pura-pura tidak mendengar lalu pergi tidur ke kamar.
B) Langsung merapikan mainan tersebut dengan sukacita tanpa mengeluh.
C) Meminta Ibu memberikan uang jajan terlebih dahulu baru mau merapikannya.
D) Menendang balok ke bawah sofa.`,
    `[Soal 2 - PG - Tipe: HOTS]
Pernyataan: kita hanya perlu menghormati orang tua saat mereka membelikan mainan baru. Pernyataan ini...
A) Benar, karena hormat harus dibayar dengan hadiah.
B) Salah, karena menghormati orang tua adalah perintah Tuhan setiap hari, bukan hanya saat ada mainan.
C) Benar, supaya adil.
D) Tidak penting dibahas.`,
    `[Soal 3 - PG - Tipe: Reguler]
Allah mendirikan keluarga sebagai lingkungan pertama untuk...
A) Merasakan kasih, perlindungan, dan mengenal firman Tuhan.
B) Bertengkar setiap malam.
C) Mengumpulkan mainan sebanyak-banyaknya.
D) Menjauhi ayah dan ibu.`,
    `[Soal 4 - PG - Tipe: Reguler]
Efesus 6:1-3 menasihati anak-anak untuk...
A) Membantah orang tua di depan tamu.
B) Hanya menurut jika diberi uang.
C) Taat dan menghormati orang tua.
D) Diam saja tanpa menolong.`,
    `[Soal 5 - PG - Tipe: Reguler]
Hukum Taurat yang kelima mengingatkan kita untuk...
    A) Menghormati ayah dan ibu.
B) Menyembunyikan mainan.
C) Tidur siang lebih lama.
D) Membuang nasihat.`,
    `[Soal 6 - PG - Tipe: HOTS]
Ali berterima kasih kepada Ibu yang memasak dan membantu belajar. Cara Ali membalas kebaikan Tuhan yang memberi orang tua adalah...
A) Menjadi anak yang taat, mendengar nasihat, dan membantu di rumah dengan sukacita.
B) Meminta Ibu berhenti memasak.
C) Hanya berterima kasih jika ada kue.
D) Meninggalkan buku berserakan.`,
    `[Soal 7 - PG - Tipe: Reguler]
Menghormati orang tua dilakukan karena...
A) Takut dihukum saja.
B) Ketaatan kepada perintah Tuhan, bukan semata takut hukuman.
C) Ingin pujian tetangga.
D) Ingin mainan baru setiap hari.`,
    `[Soal 8 - PG - Tipe: Reguler]
Tindakan nyata kasih di rumah meliputi...
A) Membantah dengan suara keras.
B) Menyembunyikan pekerjaan rumah.
C) Berkata sopan dan bergotong royong merapikan rumah.
D) Menonton saja tanpa menolong.`,
    `[Soal 9 - PG - Tipe: Reguler]
Tuhan menitipkan Ali di keluarga supaya Ayah dan Ibu...
A) Menjaga dan mengasihi Ali dengan tulus.
B) Membandingkan Ali dengan tetangga.
C) Membiarkan Ali kotor.
D) Tidak perlu mengajar firman.`,
    `[Soal 10 - PG - Tipe: HOTS]
Jika kita mengeluh setiap diminta merapikan meja, yang kurang adalah...
A) Mainan baru.
B) Sukacita menolong sebagai wujud taat kepada Tuhan dan orang tua.
C) Uang jajan tambahan.
D) Televisi yang lebih besar.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Terima Kasih di Ruang Makan",
      pengantar:
        "Di ruang makan rumah Ali. Ali dibantu ibunya merapikan buku pelajaran.",
      labelDaftar: "Percakapan Ali dan Ibu tentang keluarga titipan Tuhan",
      kolom: 1,
      item: [
        {
          nama: "Terima kasih, Ibu",
          singkat: "Masak dan menemani belajar",
          uraian:
            "Ali berterima kasih karena Ibu memasak makanan enak dan membantu belajar setiap malam. Kasih orang tua adalah wajah kasih Tuhan yang dekat.",
          contoh: "Ucap terima kasih. Jangan dianggap biasa.",
        },
        {
          nama: "Titipan Tuhan",
          singkat: "Ayah dan Ibu menjaga",
          uraian:
            "Ibu berkata: Tuhan menitipkan Ali di keluarga ini agar Ayah dan Ibu menjaga serta mengasihi dengan tulus. Keluarga adalah lembaga pertama dari Allah.",
          contoh: "Kita dititipkan, bukan kebetulan.",
        },
        {
          nama: "Membalas dengan taat",
          singkat: "Sukacita menolong",
          uraian:
            "Cara membalas kebaikan Tuhan yang memberi orang tua: menjadi anak taat, mendengar nasihat, dan suka membantu di rumah dengan sukacita. Itu menyenangkan hati Tuhan dan orang tua.",
          contoh: "Dengar. Bantu. Jangan mengeluh.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Siapa yang membantu Ali merapikan buku?",
          alias: ["ibu"],
        },
        {
          pertanyaan: "2. Tuhan menitipkan Ali di dalam...?",
          alias: ["keluarga", "rumah"],
        },
        {
          pertanyaan: "3. Cara membalas kebaikan Tuhan: menjadi anak yang...?",
          alias: ["taat", "patuh", "membantu"],
        },
      ],
      voice: [
        [
          "Ali berterima kasih kepada Ibu yang memasak dan menemani belajar. Tuhan menitipkan Ali di keluarga ini.",
        ],
        [
          "Membalas kebaikan Tuhan: taat, dengar nasihat, bantu di rumah dengan sukacita. Hati Tuhan dan orang tua jadi senang.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Keluarga Lembaga Pertama",
      pengantar:
        "Allah mendirikan keluarga sebagai tempat pertama anak merasakan kasih dan mengenal firman. Hormat kepada orang tua adalah perintah, bukan dagang hadiah.",
      labelDaftar: "Efesus 6:1-3 dan Hukum Taurat ke-5",
      kolom: 1,
      item: [
        {
          nama: "Lingkungan kasih",
          singkat: "Orang tua, kakak, adik",
          uraian:
            "Keluarga adalah lembaga pertama: ayah, ibu, anak, kakak, adik. Di sanalah anak merasakan kasih sayang, perlindungan, dan mendengar firman Tuhan.",
          contoh: "Rumah = sekolah kasih yang pertama.",
        },
        {
          nama: "Hormat karena Tuhan",
          singkat: "Bukan karena takut saja",
          uraian:
            "Anak menghormati orang tua bukan semata takut dihukum, melainkan taat pada perintah Tuhan, Hukum Taurat yang kelima. Hormat berlaku setiap hari, bukan hanya saat ada mainan baru.",
          contoh: "Hormat terus, bukan hanya saat hadiah.",
        },
        {
          nama: "Tangan yang menolong",
          singkat: "Nasihat, sopan, rapi",
          uraian:
            "Tindakan nyata: mendengarkan nasihat, berkata sopan, dan bergotong royong merapikan rumah. Merapikan balok ke kotak tanpa mengeluh adalah kasih yang kelihatan.",
          contoh: "Dengar. Sopan. Rapikan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Lingkungan pertama anak merasakan kasih namanya?",
          alias: ["keluarga", "rumah"],
        },
        {
          pertanyaan: "2. Hukum Taurat ke-5: hormati...?",
          alias: ["orang tua", "ayah", "ibu"],
        },
        {
          pertanyaan: "3. Hormat hanya saat dapat mainan: benar atau salah?",
          alias: ["salah"],
        },
      ],
      voice: [
        [
          "Allah mendirikan keluarga supaya anak merasakan kasih dan mengenal firman. Efesus enam: anak-anak, taatilah orang tuamu.",
        ],
        [
          "Hormat bukan dagang mainan. Dengar nasihat, kata sopan, rapikan rumah dengan sukacita. Itu perintah Tuhan setiap hari.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Taat di Sekolah dan di Rumah",
      pengantar:
        "Ketaatan dilatih dengan tugas kecil yang selesai tanpa ditawar. Guru memandu cerita keluarga. Orang tua menuntun tangan menolong di rumah.",
      labelDaftar: "Latihan hormat yang kelihatan",
      kolom: 2,
      item: [
        {
          nama: "Drama ruang tamu",
          singkat: "Untuk guru",
          uraian:
            "Perankan Ibu yang meminta merapikan balok. Diskusikan tiga pilihan: pura-pura tuli, merapikan dengan sukacita, atau minta uang dulu. Mana yang menyenangkan hati Tuhan?",
          contoh: "Rapikan sekarang. Jangan tawar-menawar.",
        },
        {
          nama: "Satu tugas sukacita",
          singkat: "Untuk orang tua",
          uraian:
            "Pilih satu tugas harian: merapikan sepatu, mengangkat piring, atau merapikan buku. Puji prosesnya, bukan hanya hasil. Ingatkan: ini cara mengasihi keluarga titipan Tuhan.",
          contoh: "Satu tugas. Tanpa mengeluh. Ucap terima kasih.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Ibu minta rapikan balok: kita rapikan atau minta uang dulu?",
          alias: ["rapikan", "segera", "sukacita"],
        },
        {
          pertanyaan: "2. Berkata sopan di rumah adalah wujud...?",
          alias: ["hormat", "taat", "kasih"],
        },
        {
          pertanyaan: "3. Siapa yang menitipkan kita di keluarga?",
          alias: ["tuhan", "allah"],
        },
      ],
      voice: [
        [
          "Di kelas, perankan permintaan Ibu merapikan balok. Pilih sukacita, bukan pura-pura tuli, bukan minta uang jajan dulu.",
        ],
        [
          "Di rumah, selesaikan satu tugas kecil setiap hari. Itu cara anak menghormati orang tua karena Tuhan yang menitipkan kita.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih tindakan taat saat diminta merapikan mainan, lalu tentukan benar atau salah: hormat hanya saat ada mainan baru.",
      labelDaftar: "Kasus ketaatan dan benar-salah",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Rapikan balok",
          uraian:
            "Anak yang taat langsung merapikan mainan ke kotak dengan sukacita, tanpa mengeluh, tanpa minta uang, tanpa pura-pura tidak dengar.",
          contoh: "Dengar. Rapikan. Senang menolong.",
        },
        {
          nama: "Kelompok B",
          singkat: "Hormat setiap hari",
          uraian:
            "Pernyataan 'hanya hormat saat dibelikan mainan' adalah salah. Hormat adalah perintah Tuhan sepanjang hari, juga saat tidak ada hadiah.",
          contoh: "Salah. Hormat bukan karena mainan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Ibu minta rapikan balok: tindakan taat yang mana?",
          alias: ["rapikan", "sukacita", "langsung"],
        },
        {
          pertanyaan: "2. Hormat hanya saat dapat mainan: benar atau salah?",
          alias: ["salah"],
        },
      ],
      voice: [
        [
          "Kalau Ibu minta rapikan balok, kita rapikan sekarang dengan sukacita. Bukan pura-pura tuli, bukan minta uang dulu.",
        ],
        [
          "Salah jika kita hanya hormat saat dapat mainan baru. Hormat kepada orang tua adalah perintah Tuhan setiap hari.",
        ],
      ],
    },
  ],
};
