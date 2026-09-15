import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_SENIRUPA1_BAB3 = "Bab 3: Potong dan Tempel";

export const MODUL_SENIRUPA1_BAB3: ModulResmiPai = {
  id: "senirupa-1-bab3",
  judul: JUDUL_SENIRUPA1_BAB3,
  pola: /potong dan tempel|kolase|gunting-tempel|gunting tempel/,
  motivasi:
    "Gambar pola dulu, oles lem di dalam pola, tempel potongan kecil satu per satu. Jari belajar sabar. Mata dan tangan bekerja bersama.",
  kunciJawaban: "B,A,C,B,A,B,C,A,B,A",
  sketsaKartu: [
    "Ali menggunting kertas merah jadi segi empat kecil, Nia menempel pada pola burung.",
    "Hakikat kolase dan latihan motorik halus.",
    "Anak menggunting dan menempel di sekolah serta di rumah.",
    "Siswa memilih urutan kolase biji kacang yang rapi.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Saat membuat karya kolase menggunakan bahan biji kacang hijau di atas kertas gambar, urutan langkah pengerjaan yang paling tepat dan rapi agar kertas tidak sobek atau kotor adalah...
A) Menempelkan semua biji terlebih dahulu, baru diberi lem di atas bijinya secara acak.
B) Membuat gambar pola dasar di kertas, mengoleskan lem secukupnya di dalam pola, lalu menempelkan biji kacang hijau satu per satu dengan sabar.
C) Merendam kertas gambar di dalam mangkuk berisi lem dan kacang hijau.
D) Membuang kertas karena biji tidak boleh menempel.`,
    `[Soal 2 - PG - Tipe: HOTS]
Mengapa potongan kertas kolase dibuat kecil-kecil pada pola burung?
A) Supaya potongan bisa mengikuti lekukan gambar dengan rapi dan melatih kesabaran jari.
B) Supaya kertas cepat habis tanpa bentuk.
C) Supaya gunting tidak boleh dipakai.
D) Supaya lem dicurahkan ke seluruh meja.`,
    `[Soal 3 - PG - Tipe: HOTS]
Jika lem dioles terlalu banyak di luar pola, risiko yang paling mungkin adalah...
A) Gambar otomatis menjadi patung.
B) Gunting menjadi lebih tajam.
C) Kertas kotor, sobek, atau biji menempel di tempat yang salah.
D) Warna primer hilang dari kotak pensil.`,
    `[Soal 4 - PG - Tipe: Reguler]
Kolase adalah teknik membuat karya dua dimensi dengan cara...
A) Hanya menyanyi lagu.
B) Menempelkan berbagai bahan pada permukaan pola gambar.
C) Hanya mengetuk meja.
D) Hanya meraba jeruk.`,
    `[Soal 5 - PG - Tipe: Reguler]
Bahan kolase bisa berupa...
A) Kertas, kain, biji-bijian, atau daun kering.
B) Hanya air minum.
C) Hanya udara.
D) Hanya layar ponsel.`,
    `[Soal 6 - PG - Tipe: Reguler]
Menggunting dan menempel melatih...
A) Hanya telinga.
B) Koordinasi mata dan otot tangan, atau motorik halus.
C) Hanya lari di lapangan.
D) Hanya tempo lagu.`,
    `[Soal 7 - PG - Tipe: Reguler]
Karya kolase Ali dan Nia terlihat timbul karena...
A) Mereka merendam kertas.
B) Mereka tidak memakai lem.
C) Potongan kertas menempel menumpuk rapi di atas pola.
D) Mereka membuang gunting.`,
    `[Soal 8 - PG - Tipe: Reguler]
Langkah pertama yang rapi biasanya adalah...
A) Membuat gambar pola dasar di kertas.
B) Menumpahkan lem ke lantai.
C) Menempel tanpa pola.
D) Merendam biji semalaman di mangkuk lem.`,
    `[Soal 9 - PG - Tipe: HOTS]
Motorik halus penting untuk anak kelas 1 karena membantu...
A) Hanya berteriak lebih keras.
B) Kekuatan jemari untuk menulis dan kegiatan harian.
C) Membuat ombak tanpa kertas.
D) Mengubah kotak susu tanpa gunting.`,
    `[Soal 10 - PG - Tipe: Reguler]
Lem dioles...
A) Secukupnya di dalam pola, lalu bahan ditempel satu per satu.
B) Di atas biji setelah semua biji ditumpuk acak.
C) Ke seluruh buku cerita.
D) Ke gunting agar lengket.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Gunting Merah di Meja Keterampilan",
      pengantar:
        "Di meja keterampilan kelas. Ali memegang gunting plastik dan kertas lipat warna-warni. Nia menyiapkan pola burung.",
      labelDaftar: "Percakapan Ali dan Nia tentang potong-tempel",
      kolom: 1,
      item: [
        {
          nama: "Potongan segi empat kecil",
          singkat: "Kertas merah",
          uraian:
            "Ali sudah memotong kertas merah menjadi potongan segi empat yang kecil-kecil. Nia mengajak mengoles lem di dalam skema pola burung, lalu menempel satu per satu sampai penuh.",
          contoh: "Potong kecil. Tempel satu-satu.",
        },
        {
          nama: "Gambar jadi timbul",
          singkat: "Menonjol rapi",
          uraian:
            "Polanya tertutup rapi. Gambar terlihat timbul menonjol karena potongan kertas menempel di atas kertas dasar.",
          contoh: "Penuh, rapi, timbul.",
        },
        {
          nama: "Mengapa harus kecil?",
          singkat: "Lekukan dan sabar",
          uraian:
            "Potongan kecil bisa mengikuti lekukan gambar burung dengan rapi. Jari-jari belajar sabar. Mata dan tangan bekerja bersama.",
          contoh: "Kecil mengikuti lekuk. Jari sabar.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Ali memotong kertas menjadi bentuk apa yang kecil?",
          alias: ["segi empat", "segiempat", "kotak"],
        },
        {
          pertanyaan: "2. Potongan kertas ditempel pada pola gambar apa?",
          alias: ["burung"],
        },
        {
          pertanyaan: "3. Potongan dibuat kecil supaya bisa mengikuti apa?",
          alias: ["lekuk", "lekukan", "rapi", "sabar"],
        },
      ],
      voice: [
        [
          "Ali menggunting kertas merah menjadi segi empat kecil. Nia mengoles lem di dalam pola burung, lalu menempel potongan satu per satu.",
        ],
        [
          "Gambar jadi tertutup rapi dan terlihat timbul. Potongan kecil mengikuti lekukan burung. Jari belajar sabar.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Kolase dan Jari yang Sabar",
      pengantar:
        "Kolase menempelkan bahan pada pola dua dimensi. Menggunting dan menempel melatih motorik halus Fase A.",
      labelDaftar: "Pola, lem, tempel, koordinasi mata-tangan",
      kolom: 1,
      item: [
        {
          nama: "Hakikat kolase",
          singkat: "Tempel pada pola",
          uraian:
            "Kolase adalah karya seni rupa dua dimensi. Bahan bisa kertas, kain, biji-bijian, atau daun kering. Semua menempel pada permukaan pola gambar.",
          contoh: "Pola dulu. Bahan menempel di pola.",
        },
        {
          nama: "Urutan yang rapi",
          singkat: "Supaya kertas aman",
          uraian:
            "Gambar pola, oles lem secukupnya di dalam pola, tempel bahan satu per satu. Jangan tempel dulu baru lem di atasnya. Jangan rendam kertas dalam mangkuk lem.",
          contoh: "Pola. Lem. Tempel sabar.",
        },
        {
          nama: "Motorik halus",
          singkat: "Mata dan tangan",
          uraian:
            "Menggunting dan menempel melatih koordinasi mata dan otot tangan. Kekuatan jemari ini penting untuk menulis dan kegiatan harian.",
          contoh: "Mata melihat. Jari menempel.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Kolase menempelkan bahan pada apa?",
          alias: ["pola", "gambar", "kertas"],
        },
        {
          pertanyaan: "2. Lem dioles di mana?",
          alias: ["dalam pola", "pola", "secukupnya"],
        },
        {
          pertanyaan: "3. Menggunting-menempel melatih motorik...?",
          alias: ["halus", "jari", "tangan"],
        },
      ],
      voice: [
        [
          "Kolase menempelkan kertas, kain, biji, atau daun kering pada pola gambar. Itu karya dua dimensi.",
        ],
        [
          "Urutan rapi: gambar pola, oles lem secukupnya, tempel satu per satu. Jari dan mata bekerja bersama. Itu motorik halus.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Gunting Aman, Tempel Rapi",
      pengantar:
        "Gunting plastik dipakai dengan dampingan. Lem secukupnya. Potongan kecil dikumpulkan dulu agar tidak berterbangan.",
      labelDaftar: "Latihan kolase di sekolah dan di rumah",
      kolom: 2,
      item: [
        {
          nama: "Pola burung",
          singkat: "Untuk guru",
          uraian:
            "Bagikan pola sederhana. Siswa menggunting kertas kecil, oles lem di dalam pola, tempel sampai penuh. Diskusikan: mengapa tidak merendam kertas dalam lem?",
          contoh: "Gunting kecil. Lem di pola. Tempel.",
        },
        {
          nama: "Biji di rumah",
          singkat: "Untuk orang tua",
          uraian:
            "Gambar pola buah atau bunga. Oles lem tipis. Tempel biji atau kertas bekas satu per satu. Jaga agar biji tidak masuk mulut.",
          contoh: "Pola. Lem tipis. Satu-satu.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Setelah pola jadi, langkah berikutnya adalah mengoles apa?",
          alias: ["lem"],
        },
        {
          pertanyaan: "2. Bahan kolase ditempel satu per satu atau sekaligus acak?",
          alias: ["satu", "sabar", "satu per satu"],
        },
        {
          pertanyaan: "3. Merendam kertas dalam mangkuk lem itu rapi atau tidak?",
          alias: ["tidak", "jangan", "kotor"],
        },
      ],
      voice: [
        [
          "Di sekolah, gunting kertas kecil. Oles lem di dalam pola burung. Tempel sampai penuh, jangan rendam kertas.",
        ],
        [
          "Di rumah, gambar pola, oles lem tipis, tempel biji atau kertas bekas satu per satu bersama orang tua.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih urutan kolase biji kacang hijau yang paling rapi agar kertas tidak sobek atau kotor.",
      labelDaftar: "Prosedur pembuatan karya HOTS",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Prosedur kolase",
          uraian:
            "Urutan tepat: buat pola, oles lem secukupnya di dalam pola, tempel biji satu per satu. Bukan tempel dulu lalu lem acak, bukan rendam kertas.",
          contoh: "Pola. Lem. Tempel sabar.",
        },
        {
          nama: "Ingat kerapian",
          singkat: "Kertas tetap utuh",
          uraian:
            "Lem berlebih dan langkah terbalik membuat kertas sobek atau kotor. Kesabaran jari menjaga hasil tetap rapi.",
          contoh: "Secukupnya. Satu per satu.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Urutan kolase yang rapi: pola, lalu apa, lalu tempel?",
          alias: ["lem", "oles", "pola"],
        },
      ],
      voice: [
        [
          "Untuk kolase biji kacang hijau, buat pola di kertas dulu. Oles lem secukupnya di dalam pola.",
        ],
        [
          "Tempel biji satu per satu dengan sabar. Jangan tempel dulu lalu lem acak. Jangan rendam kertas dalam mangkuk lem.",
        ],
      ],
    },
  ],
};
