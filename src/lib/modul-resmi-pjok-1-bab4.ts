import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_PJOK1_BAB4 = "Bab 4: Tubuhku Bersih dan Kuat";

export const MODUL_PJOK1_BAB4: ModulResmiPai = {
  id: "pjok-1-bab4",
  judul: JUDUL_PJOK1_BAB4,
  pola: /tubuhku bersih|bersih dan kuat|kebugaran jasmani/,
  motivasi:
    "Setelah olahraga: pendinginan, keringkan keringat, minum air putih, ganti baju basah, lalu istirahat cukup. Tubuh bersih, tubuh kuat.",
  kunciJawaban: "B,B,A,C,B,A,B,C,A,B",
  sketsaKartu: [
    "Ali haus berkeringat di kantin, Nia menyarankan air putih dan ganti baju basah.",
    "Tiga prinsip: hidrasi air putih, ganti pakaian lembap, tidur cukup.",
    "Anak mengeringkan keringat dan mengganti seragam di sekolah serta di rumah.",
    "Siswa memilih tindakan darurat setelah lari di terik matahari.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Setelah melakukan olahraga lari yang cukup melelahkan di bawah terik matahari, tindakan darurat pertama yang paling tepat dan aman untuk menjaga kesehatan tubuh kita adalah...
A) Langsung mandi dengan air es yang sangat dingin agar tubuh segera sejuk.
B) Melakukan pendinginan ringan, mengeringkan keringat, lalu meminum air putih secukupnya untuk menghidrasi tubuh.
C) Langsung tidur telentang di lantai kelas yang dingin tanpa mengganti baju yang basah.
D) Membeli es sirup manis sebanyak-banyaknya.`,
    `[Soal 2 - PG - Tipe: HOTS]
Mengapa kita tidak disarankan untuk terus menggunakan pakaian yang basah oleh keringat dalam waktu yang lama?
A) Karena pakaian basah bisa membuat warna baju sekolah kita menjadi pudar.
B) Karena kelembapan pada kain yang kotor dapat memicu pertumbuhan kuman dan jamur penyebab gatal-gatal pada kulit.
C) Supaya kita tidak dimarahi oleh penjaga sekolah.
D) Karena bel istirahat tidak akan bunyi.`,
    `[Soal 3 - PG - Tipe: Reguler]
Setelah olahraga, minuman yang paling baik untuk mengembalikan cairan tubuh adalah...
A) Air putih.
B) Es sirup sangat manis.
C) Minuman bersoda.
D) Kopi pahit.`,
    `[Soal 4 - PG - Tipe: Reguler]
Keringat yang banyak artinya tubuh kehilangan...
A) Sepatu.
B) Buku pelajaran.
C) Cairan.
D) Teman bermain.`,
    `[Soal 5 - PG - Tipe: Reguler]
Baju basah keringat sebaiknya...
A) Dipakai sampai pulang tanpa diganti.
B) Diganti dengan baju bersih setelah dikeringkan keringatnya.
C) Direndam di kantin.
D) Diberikan kepada teman.`,
    `[Soal 6 - PG - Tipe: Reguler]
Anak usia dini perlu tidur teratur sekitar...
A) Minimal 8 jam untuk memulihkan energi.
B) 2 jam saja.
C) Tidak perlu tidur.
D) Hanya di akhir pekan.`,
    `[Soal 7 - PG - Tipe: HOTS]
Mandi air es langsung setelah lari terik matahari kurang aman karena tubuh masih...
A) Sangat dingin.
B) Panas dan perlu pendinginan bertahap, bukan kejut dingin.
C) Tidak berkeringat.
D) Tidak membutuhkan air putih.`,
    `[Soal 8 - PG - Tipe: Reguler]
Mengeringkan keringat bisa memakai...
A) Buku tulis.
B) Batu lapangan.
C) Handuk atau tisu.
D) Kapur tulis.`,
    `[Soal 9 - PG - Tipe: Reguler]
Istirahat cukup setelah lelah berolahraga bertujuan untuk...
A) Memulihkan energi tubuh.
B) Membuat kuman di baju bertambah.
C) Menghindari air putih.
D) Memakai baju basah lebih lama.`,
    `[Soal 10 - PG - Tipe: Reguler]
Kesehatan olahraga mencakup juga perilaku...
A) Hanya saat di lapangan.
B) Setelah beraktivitas fisik: minum, bersih, istirahat.
C) Hanya saat menonton TV.
D) Hanya saat membeli es.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog di Kantin Setelah Olahraga",
      pengantar:
        "Di kantin sekolah setelah pelajaran olahraga selesai. Baju Ali basah kuyup oleh keringat.",
      labelDaftar: "Percakapan Ali dan Nia tentang air putih dan baju basah",
      kolom: 1,
      item: [
        {
          nama: "Haus dan gerah",
          singkat: "Ingin es sirup",
          uraian:
            "Ali merasa segar tapi gerah. Ia ingin es sirup manis yang dingin. Nia mengingatkan tubuh kehilangan banyak cairan lewat keringat.",
          contoh: "Setelah olahraga, tubuh butuh cairan.",
        },
        {
          nama: "Air putih lebih baik",
          singkat: "Bukan es terlalu manis",
          uraian:
            "Minum air putih jauh lebih baik dan sehat untuk mengembalikan kesegaran daripada es sirup yang terlalu manis.",
          contoh: "Pilih air putih, bukan es sirup berlebih.",
        },
        {
          nama: "Ganti baju basah",
          singkat: "Cegah kuman dan jamur",
          uraian:
            "Baju basah keringat bisa menjadi tempat kuman dan jamur. Ganti dengan seragam bersih agar kulit tidak gatal-gatal.",
          contoh: "Keringkan, ganti baju bersih.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Setelah olahraga, minuman yang disarankan Nia apa?",
          alias: ["air putih", "air", "putih"],
        },
        {
          pertanyaan: "2. Mengapa baju basah keringat tidak boleh dipakai lama?",
          alias: ["kuman", "jamur", "gatal", "kulit"],
        },
        {
          pertanyaan: "3. Tubuh kehilangan apa melalui keringat?",
          alias: ["cairan", "air"],
        },
      ],
      voice: [
        [
          "Di kantin, baju Ali basah keringat. Ali berkata, Aduh haus sekali, setelah berolahraga rasanya segar tapi gerah ya. Aku mau langsung beli es sirup manis yang dingin ah.",
          "Nia menahan. Ali, setelah olahraga yang melelahkan, tubuh kita kehilangan banyak cairan melalui keringat. Minum air putih jauh lebih baik dan sehat daripada es sirup yang terlalu manis.",
        ],
        [
          "Ali bertanya, Lalu setelah ini, apakah aku boleh langsung memakai baju olahraga yang basah ini sampai pulang sekolah?",
          "Nia menggeleng. Jangan, Ali! Baju yang basah oleh keringat bisa menjadi tempat kuman dan jamur. Kita harus menggantinya dengan baju seragam bersih agar kulit kita tidak gatal-gatal.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Pola Hidup Sehat Setelah Olahraga",
      pengantar:
        "Kesehatan olahraga tidak hanya di lapangan, melainkan juga perilaku sesudahnya: hidrasi, kebersihan pakaian dan kulit, serta istirahat cukup.",
      labelDaftar: "Air putih, baju bersih, tidur cukup",
      kolom: 1,
      item: [
        {
          nama: "Hidrasi yang benar",
          singkat: "Air putih",
          uraian:
            "Minum air putih setelah olahraga untuk mengganti cairan. Hindari minuman dengan pemanis buatan berlebih. Pendinginan ringan dulu, jangan kejut air es.",
          contoh: "Pendinginan, lalu air putih.",
        },
        {
          nama: "Pakaian dan kulit",
          singkat: "Keringkan, ganti",
          uraian:
            "Keringkan keringat dengan handuk atau tisu. Ganti pakaian lembap agar tidak biang keringat atau jamur.",
          contoh: "Handuk, lalu baju bersih.",
        },
        {
          nama: "Istirahat yang cukup",
          singkat: "Tidur teratur",
          uraian:
            "Anak usia dini perlu tidur teratur, minimal sekitar 8 jam, untuk memulihkan energi setelah lelah beraktivitas fisik.",
          contoh: "Tidur cukup, energi pulih.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Setelah olahraga, minum apa yang paling baik?",
          alias: ["air putih", "air"],
        },
        {
          pertanyaan: "2. Baju basah keringat harus apa?",
          alias: ["ganti", "diganti", "bersih"],
        },
        {
          pertanyaan: "3. Anak perlu tidur sekitar berapa jam?",
          alias: ["8", "delapan", "cukup"],
        },
      ],
      voice: [
        [
          "Setelah olahraga: pendinginan ringan, keringkan keringat, minum air putih. Jangan langsung mandi air es. Jangan es sirup terlalu manis.",
        ],
        [
          "Ganti baju basah supaya kuman dan jamur tidak tumbuh. Tidur teratur sekitar delapan jam agar energi pulih. Tubuh bersih, tubuh kuat.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Bersih Setelah Olahraga di Sekolah dan di Rumah",
      pengantar:
        "Guru menyiapkan air putih dan waktu ganti baju. Orang tua menyiapkan handuk dan seragam cadangan.",
      labelDaftar: "Dua tempat berlatih",
      kolom: 2,
      item: [
        {
          nama: "Stasiun pendinginan",
          singkat: "Untuk guru",
          uraian:
            "Setelah lari, siswa jalan pelan, mengeringkan keringat, antre minum air putih, lalu ganti baju jika basah. Diskusikan: mengapa bukan es sirup?",
          contoh: "Jalan pelan, lap keringat, minum air putih.",
        },
        {
          nama: "Handuk dan baju cadangan",
          singkat: "Untuk orang tua",
          uraian:
            "Siapkan handuk kecil dan baju ganti di tas. Tanyakan: apa yang terjadi jika baju basah dipakai sampai malam?",
          contoh: "Kulit bisa gatal karena kuman dan jamur.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Setelah lari, langkah pertama yang aman adalah apa?",
          alias: ["pendingin", "jalan pelan", "keringkan", "air putih"],
        },
        {
          pertanyaan: "2. Di tas sekolah, baik ada handuk dan apa?",
          alias: ["baju", "cadangan", "ganti", "seragam"],
        },
        {
          pertanyaan: "3. Es sirup terlalu manis kurang baik karena apa?",
          alias: ["manis", "pemanis", "air putih lebih baik"],
        },
      ],
      voice: [
        [
          "Di sekolah, setelah lari: jalan pelan, lap keringat, minum air putih, ganti baju jika basah. Bukan es sirup.",
        ],
        [
          "Di rumah dan di tas, siapkan handuk dan baju ganti. Baju basah dipakai lama membuat kulit gatal karena kuman dan jamur.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Saatnya memilih tindakan paling aman setelah lari di terik matahari, dan menjelaskan bahaya baju basah keringat.",
      labelDaftar: "Bernalar kritis tentang kesehatan",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Pilihan ganda HOTS",
          uraian:
            "Tindakan pertama: pendinginan ringan, keringkan keringat, minum air putih. Baju basah memicu kuman dan jamur, bukan hanya pudar warna.",
          contoh: "Pendinginan + air putih. Ganti baju basah.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Setelah lari terik, tindakan pertama yang aman?",
          alias: ["pendingin", "air putih", "keringkan", "handuk"],
        },
        {
          pertanyaan: "2. Baju basah keringat memicu apa di kulit?",
          alias: ["kuman", "jamur", "gatal"],
        },
      ],
      voice: [
        [
          "Setelah lari di terik matahari: pendinginan ringan, keringkan keringat, minum air putih. Jangan mandi air es, jangan tidur di lantai dengan baju basah.",
          "Baju basah keringat dipakai lama membuat kuman dan jamur tumbuh, kulit gatal. Ganti baju bersih.",
        ],
      ],
    },
  ],
};
