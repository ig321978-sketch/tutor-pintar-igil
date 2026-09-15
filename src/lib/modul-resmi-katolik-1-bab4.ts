import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_KATOLIK1_BAB4 = "Bab 4: Menjadi Sahabat Bagi Semua Orang";

export const MODUL_KATOLIK1_BAB4: ModulResmiPai = {
  id: "katolik-1-bab4",
  judul: JUDUL_KATOLIK1_BAB4,
  pola: /sahabat bagi semua|orang samaria|hidup menggereja|fratelli/,
  motivasi:
    "Sesama adalah siapa saja yang membutuhkan. Orang Samaria menolong tanpa membeda-bedakan. Kita memaafkan, berbagi, dan menjadi pembawa damai.",
  kunciJawaban: "B,A,C,B,A,B,C,A,B,B",
  sketsaKartu: [
    "Made dan Nia mengantar anak jatuh berlutut berdarah ke UKS.",
    "Orang Samaria menolong orang terluka di jalan.",
    "Anak meminjamkan pensil kepada teman yang pernah menjahili lalu minta maaf.",
    "Dua anak berdamai sebelum berdoa di altar.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Ketika ada seorang teman yang sering menjahili kita di kelas meminta maaf karena pensilnya patah dan ingin meminjam pensil cadanganmu, sikap Kristiani yang paling tepat kamu lakukan adalah...
A) Menolaknya dengan kasar sebagai balasan karena dia pernah menjahili kita.
B) Memaafkan kesalahannya dengan tulus dan meminjamkannya pensil dengan sukacita seperti ajaran Yesus untuk mengasihi sesama.
C) Melaporkannya ke kepala sekolah agar dia dihukum.
D) Menyembunyikan semua pensil.`,
    `[Soal 2 - PG - Tipe: HOTS]
Anak dari kelas lain terjatuh, lutut berdarah, sukunya berbeda. Sikap yang meneladan Orang Samaria yang Murah Hati adalah...
A) Menghampiri dan mengantar ke UKS, tanpa membeda-bedakan kelas atau suku.
B) Lewat saja karena ia bukan teman sekelas.
C) Menertawakan lututnya yang berdarah.
D) Menunggu guru yang lewat tanpa menolong.`,
    `[Soal 3 - PG - Tipe: Reguler]
Dalam Lukas 10:25-37, Yesus mengajarkan kata sesama berarti...
A) Hanya teman sekelas.
B) Hanya orang satu suku.
C) Siapa saja yang membutuhkan pertolongan, tanpa membeda-bedakan.
D) Hanya orang yang tidak pernah menjahili kita.`,
    `[Soal 4 - PG - Tipe: Reguler]
Orang Samaria menolong karena hatinya penuh...
A) Rasa jengkel.
B) Rasa belas kasih yang diajarkan Allah.
C) Rasa ingin dipuji.
D) Rasa takut dihukum.`,
    `[Soal 5 - PG - Tipe: Reguler]
Sebelum berdoa atau memberi persembahan di altar, jika ingat bertengkar dengan teman, kita harus terlebih dahulu...
A) Berdamai / berdamai dengan teman tersebut.
B) Membeli lilin yang lebih mahal.
C) Menyembunyikan marah.
D) Menyanyi lebih keras.`,
    `[Soal 6 - PG - Tipe: HOTS]
Beberapa anak hanya lewat mengabaikan yang jatuh. Mereka mirip orang dalam perumpamaan yang...
A) Menolong dengan minyak dan perban.
B) Melihat tetapi tidak berbela rasa dan tidak bertindak.
C) Membawa ke penginapan.
D) Menjadi sahabat bagi semua.`,
    `[Soal 7 - PG - Tipe: Reguler]
Fratelli Tutti menanamkan...
A) Persaudaraan hanya di dalam satu suku.
B) Persaudaraan hanya di rumah.
C) Persaudaraan universal: semua orang saudara.
D) Persaudaraan hanya saat dapat hadiah.`,
    `[Soal 8 - PG - Tipe: Reguler]
Matius 18:22 mengajak kita...
A) Memaafkan berulang kali, bukan membalas dendam.
B) Menghitung kesalahan teman selamanya.
C) Melapor agar selalu dihukum.
D) Menolak meminjamkan pensil selamanya.`,
    `[Soal 9 - PG - Tipe: HOTS]
Kasih sejati menurut Yesus adalah kasih yang...
A) Hanya diucapkan di bibir.
B) Berbela rasa dan berani bertindak menolong yang menderita.
C) Hanya untuk teman yang mirip.
D) Hanya di hari Minggu.`,
    `[Soal 10 - PG - Tipe: Reguler]
Anak pembawa damai di kelas...
A) Membuat pertengkaran lebih lama.
B) Berempati, berbagi bekal, dan memaafkan.
C) Mengabaikan yang jatuh.
D) Menolak semua permintaan maaf.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Lutut yang Terluka di Istirahat",
      pengantar:
        "Di kelas jam istirahat. Made melihat anak dari kelas lain terjatuh, lutut berdarah, dan menangis. Beberapa anak hanya lewat.",
      labelDaftar: "Percakapan Made dan Nia tentang Orang Samaria",
      kolom: 1,
      item: [
        {
          nama: "Bukan sekelas",
          singkat: "Suku berbeda",
          uraian:
            "Made ragu: anak itu bukan teman sekelas dan sukunya berbeda. Keraguan itu jujur, tetapi bukan alasan melewati orang yang menderita.",
          contoh: "Lihat yang terluka. Jangan lewat saja.",
        },
        {
          nama: "Ingat Samaria",
          singkat: "Tanpa membeda-bedakan",
          uraian:
            "Nia mengingat perumpamaan Orang Samaria yang Murah Hati. Ia menolong orang terluka tanpa melihat latar belakang atau agama.",
          contoh: "Sesama = yang butuh tolong.",
        },
        {
          nama: "Ke UKS sekarang",
          singkat: "Kasih yang bertindak",
          uraian:
            "Yesus mengajarkan sesama adalah siapa saja yang membutuhkan. Made dan Nia menghampiri dan mengantar ke ruang UKS.",
          contoh: "Hampiri. Antar ke UKS.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Anak terjatuh, lututnya...?",
          alias: ["berdarah", "luka", "sakit"],
        },
        {
          pertanyaan: "2. Orang Samaria menolong tanpa melihat...?",
          alias: ["suku", "agama", "latar"],
        },
        {
          pertanyaan: "3. Made dan Nia mengantar anak itu ke...?",
          alias: ["uks"],
        },
      ],
      voice: [
        [
          "Anak dari kelas lain jatuh, lutut berdarah. Beberapa hanya lewat. Made ragu karena suku berbeda.",
        ],
        [
          "Nia ingat Orang Samaria yang Murah Hati. Sesama adalah siapa saja yang membutuhkan. Mereka antar ke UKS.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Sesama Melampaui Batas",
      pengantar:
        "Yesus mendefinisikan sesama tanpa batas suku dan kelompok. Kasih berbela rasa dan berani bertindak. Kita juga memaafkan dan berdamai sebelum ke altar.",
      labelDaftar: "Lukas 10:25-37 dan Fratelli Tutti",
      kolom: 1,
      item: [
        {
          nama: "Perumpamaan Samaria",
          singkat: "Lukas 10:25-37",
          uraian:
            "Yesus mengajarkan kasih sejati: compassion, belas kasih yang bergerak. Bukan hanya melihat, melainkan menolong orang yang menderita.",
          contoh: "Lihat, kasihan, lalu bertindak.",
        },
        {
          nama: "Persaudaraan universal",
          singkat: "Fratelli Tutti",
          uraian:
            "Anak dilatih berempati aktif, berbagi bekal, memaafkan (Matius 18:22), dan menjadi pembawa damai di kelas. Teman yang pernah menjahili tetap boleh dipinjamkan pensil setelah minta maaf.",
          contoh: "Maafkan. Pinjamkan. Jangan balas dendam.",
        },
        {
          nama: "Berdamai dulu",
          singkat: "Sebelum altar",
          uraian:
            "Sebelum berdoa atau memberi persembahan, jika ingat pertengkaran, kita berdamai terlebih dahulu dengan teman. Damai lebih dulu, baru doa.",
          contoh: "Berdamai dulu. Baru ke altar.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Sesama adalah siapa saja yang...?",
          alias: ["butuh", "membutuhkan", "tolong"],
        },
        {
          pertanyaan: "2. Hati Orang Samaria penuh rasa...?",
          alias: ["belas", "kasih", "iba"],
        },
        {
          pertanyaan: "3. Sebelum ke altar, jika bertengkar, kita harus...?",
          alias: ["berdamai", "maaf", "memaafkan"],
        },
      ],
      voice: [
        [
          "Lukas sepuluh: Orang Samaria menolong yang terluka. Sesama melampaui suku dan kelas.",
        ],
        [
          "Pinjamkan pensil kepada yang minta maaf. Berdamai dulu sebelum doa di altar. Itu kasih yang berani.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Mata yang Tidak Lewat di Sekolah dan di Rumah",
      pengantar:
        "Sahabat bagi semua dilatih: siapa yang jatuh, siapa yang pensilnya patah, siapa yang belum berdamai. Guru dan orang tua menuntun belas kasih.",
      labelDaftar: "Latihan belas kasih yang bertindak",
      kolom: 2,
      item: [
        {
          nama: "UKS mini",
          singkat: "Untuk guru",
          uraian:
            "Ceritakan Samaria, lalu perankan anak jatuh di istirahat. Diskusikan: lewat, tertawa, atau antar ke UKS? Latihan memaafkan dan meminjamkan alat tulis.",
          contoh: "Jangan lewat. Antar. Maafkan.",
        },
        {
          nama: "Damai sebelum doa",
          singkat: "Untuk orang tua",
          uraian:
            "Jika bersaudara bertengkar, ajak berdamai sebelum doa malam. Berbagi camilan dengan tetangga atau teman yang berbeda. Jangan memaksa menolong situasi yang tidak aman tanpa orang dewasa.",
          contoh: "Berdamai. Bagi. Panggil orang dewasa jika perlu.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Teman jatuh berdarah: antar ke UKS atau lewat saja?",
          alias: ["uks", "antar", "tolong"],
        },
        {
          pertanyaan: "2. Teman yang minta maaf ingin pinjam pensil: kita...?",
          alias: ["maafkan", "pinjamkan", "kasih"],
        },
        {
          pertanyaan: "3. Sebelum persembahan di altar, kita harus... dulu?",
          alias: ["berdamai", "maaf"],
        },
      ],
      voice: [
        [
          "Di sekolah, jangan lewat saat ada yang jatuh. Antar ke UKS. Pinjamkan pensil kepada yang sungguh minta maaf.",
        ],
        [
          "Di rumah, berdamai sebelum doa malam. Yesus mengajar kita menjadi sahabat bagi semua orang.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih sikap saat teman yang pernah menjahili minta maaf dan pinjam pensil, lalu lengkapi: berdamai sebelum altar, dan rasa di hati Orang Samaria.",
      labelDaftar: "Studi kasus dan isian kausalitas iman",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Pensil dan maaf",
          uraian:
            "Sikap Kristiani: memaafkan tulus dan meminjamkan pensil dengan sukacita. Bukan menolak kasar sebagai balasan, bukan semata ingin ia dihukum.",
          contoh: "Maafkan. Pinjamkan. Jangan dendam.",
        },
        {
          nama: "Kelompok B",
          singkat: "Damai dan belas kasih",
          uraian:
            "Sebelum doa atau persembahan di altar, berdamai dulu dengan teman. Orang Samaria menolong karena hatinya penuh belas kasih yang diajarkan Allah.",
          contoh: "Berdamai. Belas kasih.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Teman yang pernah jahil minta maaf dan pinjam pensil: kita?",
          alias: ["maafkan", "pinjamkan", "kasih"],
        },
        {
          pertanyaan: "2. Sebelum ke altar, jika ada pertengkaran, kita harus...?",
          alias: ["berdamai", "maaf", "memaafkan"],
        },
        {
          pertanyaan: "3. Hati Orang Samaria penuh rasa...?",
          alias: ["belas", "kasih", "iba", "belas kasih"],
        },
      ],
      voice: [
        [
          "Teman yang pernah menjahili minta maaf dan pinjam pensil: kita maafkan dan pinjamkan, seperti Yesus mengajar.",
        ],
        [
          "Sebelum ke altar, berdamai dulu. Orang Samaria menolong karena hatinya penuh belas kasih dari Allah.",
        ],
      ],
    },
  ],
};
