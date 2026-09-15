import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MUSIK1_BAB1 = "Bab 1: Bermain dengan Bunyi";

export const MODUL_MUSIK1_BAB1: ModulResmiPai = {
  id: "musik-1-bab1",
  judul: JUDUL_MUSIK1_BAB1,
  pola: /bermain dengan bunyi|sumber bunyi|eksplorasi bunyi|warna bunyi|timbre/,
  motivasi:
    "Tubuh adalah alat musik pertama. Ketuk, tepuk, hentak. Bahan benda mengubah warna bunyi: kayu, plastik, atau besi.",
  kunciJawaban: "B,B,A,C,B,A,B,C,A,B",
  sketsaKartu: [
    "Ali dan Nia mengetuk meja dengan jari dan telapak, membandingkan Tuk dan Dug.",
    "Sumber bunyi internal tubuh dan eksternal benda, plus timbre bahan.",
    "Anak mengeksplorasi tepuk, hentak, dan ketukan benda di sekolah serta di rumah.",
    "Siswa menilai botol beras sebagai perkusif dan bunyi sendok pada kaca.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Ali mengisi sebuah botol plastik dengan beras, lalu ia mengocoknya hingga berbunyi "Srek! Srek! Srek!". Eksplorasi yang dilakukan Ali mengubah fungsi botol tersebut menjadi alat musik...
A) Tiup yang menghasilkan nada tinggi.
B) Perkusif (pukul/kocok) sederhana penghasil irama.
C) Gesek yang membutuhkan busur.
D) Petik seperti gitar.`,
    `[Soal 2 - PG - Tipe: HOTS]
Mengapa sendok besi yang diketuk ke gelas kaca menghasilkan bunyi yang lebih melengking tinggi dibandingkan jika diketuk ke meja kayu?
A) Karena gelas kaca memiliki permukaan yang empuk.
B) Karena besi dan kaca adalah bahan padat keras yang memantulkan getaran bunyi dengan sangat cepat dan rapat.
C) Karena sendok besi tidak menyukai meja kayu.
D) Karena kayu selalu lebih nyaring dari kaca.`,
    `[Soal 3 - PG - Tipe: HOTS]
Ali mengetuk meja dengan ujung jari, bunyinya Tuk. Nia mengetuk meja yang sama dengan telapak, bunyinya Dug. Mengapa bunyinya berbeda?
A) Bagian tubuh yang menyentuh benda memengaruhi cara suara lahir.
B) Meja Ali dan meja Nia terbuat dari bahan yang berbeda.
C) Bunyi Tuk hanya boleh dihasilkan di pagi hari.
D) Telapak tangan tidak bisa menghasilkan bunyi.`,
    `[Soal 4 - PG - Tipe: Reguler]
Sumber bunyi musik dari dalam tubuh manusia disebut...
A) Eksternal, seperti gendang.
B) Alat tiup saja.
C) Internal, misalnya tepuk tangan dan hentakan kaki.
D) Hanya suara radio.`,
    `[Soal 5 - PG - Tipe: Reguler]
Hentakan kaki ke lantai biasanya terdengar...
A) Seperti bisikan angin.
B) Berat dan mantap.
C) Sama persis dengan petikan jari.
D) Tanpa getaran sama sekali.`,
    `[Soal 6 - PG - Tipe: Reguler]
Tepuk tangan termasuk eksplorasi bunyi...
A) Anggota tubuh (internal).
B) Hanya alat musik pabrik.
C) Gesek dengan busur.
D) Tiup ke dalam botol.`,
    `[Soal 7 - PG - Tipe: Reguler]
Botol plastik dan sendok besi yang diketuk bunyinya berbeda karena...
A) Keduanya selalu senyap.
B) Bahannya berbeda, jadi warna bunyinya (timbre) berbeda.
C) Botol tidak boleh diketuk.
D) Sendok tidak menghasilkan getaran.`,
    `[Soal 8 - PG - Tipe: Reguler]
Petikan jari atau ketukan dada menghasilkan bunyi dari...
A) Radio kelas.
B) Angklung bambu.
C) Tubuh kita sendiri.
D) Mesin pabrik.`,
    `[Soal 9 - PG - Tipe: HOTS]
Ibu Guru berkata tubuh adalah alat musik pertama. Maksudnya...
A) Kita bisa membuat irama dengan tepuk, ketuk, dan hentak sebelum memakai alat lain.
B) Kita tidak boleh memakai meja.
C) Hanya guru yang boleh bertepuk.
D) Bunyi hanya datang dari televisi.`,
    `[Soal 10 - PG - Tipe: Reguler]
Sumber bunyi eksternal contohnya...
A) Suara jantung kita sendiri.
B) Alat musik atau benda di sekitar, seperti pensil kayu.
C) Hanya napas diam.
D) Pikiran tanpa suara.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Tuk dan Dug di Meja Kelas",
      pengantar:
        "Di dalam kelas seni. Ibu Guru meminta siswa mengetuk meja memakai jari dan telapak tangan secara bergantian.",
      labelDaftar: "Percakapan Ali dan Nia tentang ketukan meja",
      kolom: 1,
      item: [
        {
          nama: "Tuk dari ujung jari",
          singkat: "Nyaring dan ringan",
          uraian:
            "Ali: Nia, dengar deh! Kalau aku ketuk meja memakai ujung jari, bunyinya Tuk! Tuk! Tuk! nyaring sekali.",
          contoh: "Ujung jari: Tuk, Tuk, Tuk.",
        },
        {
          nama: "Dug dari telapak",
          singkat: "Berat dan mantap",
          uraian:
            "Nia: Iya, Ali! Tapi kalau aku ketuk memakai telapak tangan, bunyinya berubah jadi Dug! Dug! Dug! terasa lebih berat dan mantap.",
          contoh: "Telapak: Dug, Dug, Dug.",
        },
        {
          nama: "Tubuh alat musik pertama",
          singkat: "Bagian yang menyentuh",
          uraian:
            "Benda sama, bunyi beda. Bagian tubuh yang menyentuh benda memengaruhi cara suara lahir. Tubuh kita adalah alat musik pertama.",
          contoh: "Jari atau telapak, bunyi berubah.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Ketukan ujung jari di meja bunyinya apa?",
          alias: ["tuk", "nyaring"],
        },
        {
          pertanyaan: "2. Ketukan telapak tangan bunyinya apa?",
          alias: ["dug", "berat", "mantap"],
        },
        {
          pertanyaan: "3. Alat musik pertama kita adalah apa?",
          alias: ["tubuh", "badan", "tangan"],
        },
      ],
      voice: [
        [
          "Di kelas seni, Ali mengetuk meja dengan ujung jari. Bunyinya Tuk, Tuk, Tuk, nyaring sekali.",
          "Nia mengetuk meja yang sama dengan telapak tangan. Bunyinya Dug, Dug, Dug, lebih berat dan mantap.",
        ],
        [
          "Benda sama, bunyi bisa berbeda. Bagian tubuh yang menyentuh benda memengaruhi cara suara lahir. Tubuh kita adalah alat musik pertama.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Sumber Bunyi dan Warna Bunyi",
      pengantar:
        "Bunyi musik bisa dari dalam tubuh (internal) atau dari luar tubuh (eksternal). Bahan benda mengubah warna bunyi atau timbre.",
      labelDaftar: "Internal, eksternal, dan timbre bahan",
      kolom: 1,
      item: [
        {
          nama: "Sumber bunyi",
          singkat: "Dalam dan luar tubuh",
          uraian:
            "Internal: suara manusia dan bunyi tubuh. Eksternal: alat musik atau benda sekitar, seperti botol, sendok, dan pensil.",
          contoh: "Tepuk tangan. Ketuk pensil.",
        },
        {
          nama: "Eksplorasi tubuh",
          singkat: "Tepuk, hentak, petik",
          uraian:
            "Tepuk tangan: plak jika jari renggang, plok jika jari rapat. Hentakan kaki ke lantai: bunyi berat. Petikan jari atau ketukan dada: irama dari tubuh.",
          contoh: "Plak, plok, hentak, petik.",
        },
        {
          nama: "Timbre bahan",
          singkat: "HOTS non-musikal",
          uraian:
            "Botol plastik, sendok besi, dan pensil kayu bunyinya berbeda saat diketuk. Besi dan kaca keras, getarannya cepat dan rapat, bunyinya lebih melengking.",
          contoh: "Plastik, kayu, besi: warna bunyi beda.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Tepuk tangan termasuk sumber bunyi dari mana?",
          alias: ["tubuh", "internal", "dalam"],
        },
        {
          pertanyaan: "2. Hentakan kaki bunyinya terasa bagaimana?",
          alias: ["berat", "mantap", "lantai"],
        },
        {
          pertanyaan: "3. Botol plastik dan sendok besi bunyinya sama atau beda?",
          alias: ["beda", "berbeda", "tidak sama", "timbre"],
        },
      ],
      voice: [
        [
          "Sumber bunyi internal berasal dari tubuh: tepuk tangan, hentakan kaki, petikan jari, ketukan dada.",
        ],
        [
          "Sumber eksternal dari benda di sekitar. Plastik, kayu, dan besi menghasilkan warna bunyi yang berbeda. Itulah timbre.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Eksplorasi di Sekolah dan di Rumah",
      pengantar:
        "Kepekaan bunyi dilatih dengan mendengar dulu, meniru, lalu membandingkan. Guru memandu di kelas. Orang tua menemani di rumah.",
      labelDaftar: "Dua tempat bermain bunyi",
      kolom: 2,
      item: [
        {
          nama: "Meja bunyi",
          singkat: "Untuk guru",
          uraian:
            "Siswa mengetuk meja: jari, lalu telapak. Bandingkan Tuk dan Dug. Kocok botol beras: Srek. Ketuk sendok ke gelas dan ke kayu. Diskusikan: mengapa bahannya mengubah bunyi?",
          contoh: "Tuk. Dug. Srek.",
        },
        {
          nama: "Dapur aman",
          singkat: "Untuk orang tua",
          uraian:
            "Pilih sendok dan gelas yang tidak mudah pecah, dampingi anak. Ketuk pelan. Tepuk tangan plak dan plok. Tanyakan: mana yang lebih nyaring?",
          contoh: "Ketuk pelan. Dengar dulu.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Botol diisi beras lalu dikocok bunyinya seperti apa?",
          alias: ["srek", "kocok", "beras"],
        },
        {
          pertanyaan: "2. Tepuk jari renggang bunyinya lebih... (cempreng / diam)",
          alias: ["cempreng", "plak", "nyaring"],
        },
        {
          pertanyaan: "3. Saat bereksplorasi di rumah, ketukannya harus bagaimana?",
          alias: ["pelan", "aman", "hati"],
        },
      ],
      voice: [
        [
          "Di sekolah, ketuk meja dengan jari lalu telapak. Bandingkan Tuk dan Dug. Kocok botol beras. Dengarkan Srek.",
        ],
        [
          "Di rumah, ketuk pelan sendok dan gelas bersama orang tua. Tepuk plak dan plok. Mana yang lebih nyaring?",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Analisis botol beras sebagai alat perkusif, lalu bandingkan bunyi sendok pada kaca dan pada kayu.",
      labelDaftar: "Pilihan ganda analisis HOTS",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Pilihan ganda HOTS",
          uraian:
            "Botol beras yang dikocok menjadi perkusif sederhana penghasil irama. Besi dan kaca keras, getaran cepat dan rapat, bunyinya lebih melengking daripada kayu.",
          contoh: "Kocok = perkusif. Kaca lebih melengking.",
        },
        {
          nama: "Ingat timbre",
          singkat: "Bahan mengubah bunyi",
          uraian:
            "Bukan karena sendok tidak suka kayu. Kayu lebih empuk menyerap getaran. Kaca dan besi memantulkan getaran lebih rapat.",
          contoh: "Bahan padat keras, bunyi nyaring.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Botol beras yang dikocok menjadi alat musik jenis apa?",
          alias: ["perkusif", "pukul", "kocok", "irama"],
        },
        {
          pertanyaan: "2. Sendok ke gelas kaca bunyinya lebih... daripada ke kayu?",
          alias: ["nyaring", "melengking", "tinggi", "keras"],
        },
      ],
      voice: [
        [
          "Botol plastik berisi beras yang dikocok menjadi alat perkusif sederhana. Bunyinya Srek, Srek, Srek, menghasilkan irama.",
        ],
        [
          "Sendok besi ke gelas kaca lebih melengking karena besi dan kaca keras, getarannya cepat dan rapat. Kayu lebih menyerap getaran.",
        ],
      ],
    },
  ],
};
