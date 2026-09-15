import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_BINDO1_BAB1 = "Bab 1: Bunyi Apa?";

export const MODUL_BINDO1_BAB1: ModulResmiPai = {
  id: "bindo-1-bab1",
  judul: JUDUL_BINDO1_BAB1,
  pola: /bunyi apa/,
  motivasi:
    "Tutup mata, buka telinga. Setiap bunyi punya cerita. Tuhan menciptakan bunyi unik supaya kita tahu benda apa itu.",
  kunciJawaban: "B,A,B,B,A,B,A,B,C,A",
  sketsaKartu: [
    "Ali dan Nia di teras kelas pagi hari, menutup mata, mendengar bola dan bel sepeda.",
    "Peta bunyi: alami, buatan, dan fonem huruf B seperti bola.",
    "Anak menebak bunyi bel, tepuk, dan langkah di sekolah serta di rumah.",
    "Siswa mengerjakan analisis bunyi dan mencocokkan huruf fonik ayam, bebek, kucing.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Ketika hujan deras di malam hari, tiba-tiba terdengar bunyi "Blarrr!" yang menggelegar di langit. Bunyi tersebut termasuk jenis...
A) Bunyi buatan manusia yang disengaja.
B) Bunyi alamiah yang bersumber dari fenomena alam.
C) Bunyi alat musik tradisional.
D) Bunyi mesin pabrik yang rusak.`,
    `[Soal 2 - PG - Tipe: HOTS]
Mengapa bel penanda istirahat di sekolah dibuat dengan bunyi yang sangat nyaring dan keras?
A) Agar semua siswa di seluruh penjuru sekolah bisa mendengar tanda istirahat dengan jelas walau sedang bermain.
B) Karena guru-guru menyukai suara yang bising.
C) Supaya burung-burung yang hinggap di pohon terbang pergi.
D) Agar lampu kelas ikut menyala.`,
    `[Soal 3 - PG - Tipe: Reguler]
Anak diperkenalkan pada bunyi huruf terlebih dahulu sebelum nama hurufnya. Huruf B dibaca...
A) "Be" seperti nama huruf di abjad.
B) /b/ seperti awalan kata bola.
C) /p/ seperti awalan kata pintu.
D) /m/ seperti awalan kata mata.`,
    `[Soal 4 - PG - Tipe: Reguler]
Suara kucing /meong/ termasuk bunyi...
A) Buatan, karena kucing dipelihara manusia.
B) Alami, karena berasal dari makhluk hidup tanpa alat.
C) Musik, karena merdu.
D) Mesin, karena keras.`,
    `[Soal 5 - PG - Tipe: Reguler]
Suara klakson mobil termasuk bunyi...
A) Buatan, karena dihasilkan alat buatan manusia.
B) Alami, karena terdengar di jalan.
C) Hewan, karena seperti teriakan.
D) Petir, karena menggelegar.`,
    `[Soal 6 - PG - Tipe: HOTS]
Mengapa setiap benda mengeluarkan bunyi yang berbeda-beda?
A) Supaya kita bosan mendengarnya.
B) Supaya kita bisa tahu benda apa itu meskipun sedang memejamkan mata.
C) Supaya bel sekolah tidak bunyi.
D) Supaya huruf A dan B menjadi sama.`,
    `[Soal 7 - PG - Tipe: Reguler]
Suara air mengalir di sungai termasuk...
A) Bunyi alami.
B) Bunyi bel sepeda.
C) Bunyi peluit wasit.
D) Bunyi ketukan pintu.`,
    `[Soal 8 - PG - Tipe: Reguler]
Suara peluit wasit saat olahraga termasuk...
A) Bunyi alami dari angin.
B) Bunyi buatan dari alat dan perbuatan manusia.
C) Bunyi hewan di hutan.
D) Bunyi petir di langit.`,
    `[Soal 9 - PG - Tipe: Reguler]
Gambar ayam paling tepat dihubungkan dengan bunyi huruf awalan...
A) /b/ (B-b)
B) /k/ (K-k)
C) /a/ (A-a)
D) /m/ (M-m)`,
    `[Soal 10 - PG - Tipe: Reguler]
Gambar bebek paling tepat dihubungkan dengan bunyi huruf awalan...
A) /b/ (B-b)
B) /k/ (K-k)
C) /a/ (A-a)
D) /n/ (N-n)`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog di Teras Kelas",
      pengantar:
        "Di teras kelas pada pagi hari. Ali dan Nia mendengar berbagai suara dari arah halaman sekolah. Mereka menutup mata supaya telinga lebih tajam.",
      labelDaftar: "Percakapan Ali dan Nia tentang bunyi",
      kolom: 1,
      item: [
        {
          nama: "Duk! Duk! Duk!",
          singkat: "Bola memantul",
          uraian:
            "Ali meminta Nia menutup mata. Bunyi keras itu adalah suara bola tendang yang memantul di lantai.",
          contoh: "Bola: Duk! Duk! Duk!",
        },
        {
          nama: "Kringgg! Kringgg!",
          singkat: "Bel sepeda",
          uraian:
            "Bunyi nyaring berikutnya adalah bel sepeda Pak Satpam. Setiap benda punya bunyi yang berbeda.",
          contoh: "Bel sepeda: Kringgg!",
        },
        {
          nama: "Bunyi itu unik",
          singkat: "Pemberian Tuhan",
          uraian:
            "Tuhan menciptakan bunyi-bunyi unik supaya kita tahu benda apa itu meskipun sedang memejamkan mata.",
          contoh: "Tutup mata, tebak bunyinya.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Bunyi Duk! Duk! Duk! itu suara apa?",
          alias: ["bola", "bola tendang", "memantul", "lantai"],
        },
        {
          pertanyaan: "2. Bunyi Kringgg! Kringgg! itu suara apa?",
          alias: ["bel", "sepeda", "bel sepeda", "satpam"],
        },
        {
          pertanyaan: "3. Mengapa setiap benda bunyinya berbeda?",
          alias: ["tahu benda", "unik", "mejam", "mengenal", "beda"],
        },
      ],
      voice: [
        [
          "Anak-anak, kita ke teras kelas pagi hari. Ali berkata, Nia, coba tutup matamu sebentar. Dengar... Duk! Duk! Duk! Suara apa ya itu?",
          "Nia menutup mata. Hmm, bunyinya keras sekali. Ah, itu pasti suara bola tendang yang memantul di lantai!",
        ],
        [
          "Ali berkata, Betul! Kalau yang ini... Kringgg! Kringgg!",
          "Nia menjawab, Itu suara bel sepeda Pak Satpam. Ali, mengapa setiap benda mengeluarkan bunyi yang berbeda-beda, ya?",
          "Ali tersenyum. Supaya kita bisa tahu benda apa itu meskipun kita sedang memejamkan mata, Nia. Tuhan menciptakan bunyi-bunyi itu unik!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Peta Bunyi di Sekitar Kita",
      pengantar:
        "Kesadaran fonemis: anak mengenal bunyi huruf (fonem) terlebih dahulu sebelum nama hurufnya. Contoh: huruf B dibaca /b/ seperti awalan kata bola, bukan langsung 'be'. Bunyi sekitar dibagi menjadi bunyi alami dan bunyi buatan.",
      labelDaftar: "Fonem, bunyi alami, bunyi buatan",
      kolom: 1,
      item: [
        {
          nama: "Kesadaran fonemis",
          singkat: "Bunyi huruf dulu",
          uraian:
            "Latih telinga anak pada bunyi murni /b/, /a/, /k/ sebelum mengeja nama huruf. Fonem adalah batu pertama membaca.",
          contoh: "B = /b/ seperti bola.",
        },
        {
          nama: "Bunyi alami",
          singkat: "Sila ke-1",
          uraian:
            "Bunyi dari alam atau makhluk hidup tanpa campur tangan manusia. Contoh: petir, suara kucing /meong/, suara air mengalir.",
          contoh: "Petir: Blarrr!",
        },
        {
          nama: "Bunyi buatan",
          singkat: "Artifisial",
          uraian:
            "Bunyi yang dihasilkan oleh alat atau perbuatan manusia. Contoh: peluit, klakson, musik, suara ketukan pintu.",
          contoh: "Bel sekolah dan peluit wasit.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Huruf B dibaca bunyi apa pada kata bola?",
          alias: ["/b/", "b", "be", "bola"],
        },
        {
          pertanyaan: "2. Petir dan suara kucing termasuk bunyi apa?",
          alias: ["alami", "alam", "makhluk hidup", "alamiah"],
        },
        {
          pertanyaan: "3. Peluit dan klakson termasuk bunyi apa?",
          alias: ["buatan", "alat", "manusia", "artifisial"],
        },
      ],
      voice: [
        [
          "Anak-anak, sebelum nama huruf, kita dengar bunyi huruf. Huruf B dibaca /b/, seperti awalan kata bola.",
          "Bunyi alami datang dari alam atau makhluk hidup. Petir, kucing meong, air mengalir.",
        ],
        [
          "Bunyi buatan datang dari alat atau perbuatan manusia. Peluit, klakson, musik, ketukan pintu.",
          "Telinga yang tajam menolong kita membaca dan menjaga keselamatan.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Tebak Bunyi di Sekolah dan di Rumah",
      pengantar:
        "Menyimak dan berbicara dilatih dengan permainan telinga. Di sekolah dan di rumah, anak menutup mata, mendengar, lalu menyebut sumber bunyinya.",
      labelDaftar: "Dua tempat berlatih",
      kolom: 2,
      item: [
        {
          nama: "Tebak bunyi halaman",
          singkat: "Untuk guru",
          uraian:
            "Guru membunyikan bel kecil, tepukan tangan, dan langkah kaki. Siswa menutup mata, menirukan bunyi, lalu menyebut sumbernya. Diskusikan: bunyi mana yang alami, bunyi mana yang buatan?",
          contoh: "Tutup mata, tebak: bel, tepuk, atau langkah?",
        },
        {
          nama: "Kuping di jendela",
          singkat: "Untuk orang tua",
          uraian:
            "Ajak anak duduk di jendela atau teras. Dengarkan bunyi dapur, hujan, atau kendaraan. Tanyakan: bunyi itu dari alam atau dari alat manusia?",
          contoh: "Itu bunyi apa, Nak? Alami atau buatan?",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Saat tebak bunyi, mata siswa bagaimana?",
          alias: ["tutup", "pejam", "tertutup", "menutup"],
        },
        {
          pertanyaan: "2. Bel kecil termasuk bunyi apa?",
          alias: ["buatan", "alat", "bel"],
        },
        {
          pertanyaan: "3. Hujan di luar jendela termasuk bunyi apa?",
          alias: ["alami", "alam", "hujan"],
        },
      ],
      voice: [
        [
          "Di sekolah, tutup mata. Guru membunyikan bel, tepukan, dan langkah. Tebak, bunyi apa itu? Alami atau buatan?",
        ],
        [
          "Di rumah, duduk di jendela. Dengar dapur, hujan, atau kendaraan. Tanya, itu bunyi apa? Dari alam atau dari alat manusia?",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Saatnya menganalisis bunyi dan mencocokkan huruf fonik. Pilih jenis bunyi yang tepat, lalu hubungkan gambar hewan dengan bunyi huruf awalannya.",
      labelDaftar: "Analisis bunyi dan huruf fonik",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Analisis bunyi HOTS",
          uraian:
            "Blarrr di langit saat hujan adalah bunyi alamiah. Bel istirahat dibuat nyaring agar semua siswa mendengar tanda istirahat.",
          contoh: "Petir = alami. Bel = nyaring supaya terdengar.",
        },
        {
          nama: "Kelompok B",
          singkat: "Mencocokkan huruf fonik",
          uraian:
            "Ayam berawalan /a/, bebek berawalan /b/, kucing berawalan /k/. Cocokkan gambar dengan bunyi huruf awalannya.",
          contoh: "Ayam-/a/, bebek-/b/, kucing-/k/.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Bunyi Blarrr di langit saat hujan termasuk jenis apa?",
          alias: ["alami", "alamiah", "alam", "petir"],
        },
        {
          pertanyaan: "2. Mengapa bel istirahat dibuat nyaring?",
          alias: ["mendengar", "jelas", "semua siswa", "istirahat"],
        },
        {
          pertanyaan: "3. Gambar ayam bunyi huruf awalannya apa?",
          alias: ["/a/", "a", "a-a"],
        },
        {
          pertanyaan: "4. Gambar bebek bunyi huruf awalannya apa?",
          alias: ["/b/", "b", "b-b", "bebek"],
        },
        {
          pertanyaan: "5. Gambar kucing bunyi huruf awalannya apa?",
          alias: ["/k/", "k", "k-k", "kucing"],
        },
      ],
      voice: [
        [
          "Ini lembar evaluasi. Kelompok A: bunyi Blarrr di langit adalah bunyi alamiah. Bel istirahat nyaring supaya semua siswa mendengar.",
        ],
        [
          "Kelompok B: tarik garis. Ayam bunyi /a/. Bebek bunyi /b/. Kucing bunyi /k/.",
        ],
      ],
    },
  ],
};
