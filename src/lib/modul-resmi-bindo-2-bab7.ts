import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_BINDO2_BAB7 = "Bab 7: Bijak Digital";

export const MODUL_BINDO2_BAB7: ModulResmiPai = {
  id: "bindo-2-bab7",
  judul: JUDUL_BINDO2_BAB7,
  pola: /bijak digital|fakta (dan|vs) opini|mengakses informasi|sayang lingkungan/,
  motivasi:
    "Fakta nyata ada buktinya. Opini adalah pendapat yang bisa berbeda. Internet memuat fakta, opini, dan hoaks. Cari informasi dengan izin guru, lalu catat fakta.",
  kunciJawaban: "B,B,B,S,B,A,C,B,A,B",
  sketsaKartu: [
    "Anak memilah fakta baterai HP dan opini game terbaik.",
    "Anak meminta izin guru sebelum mencari lebah di komputer.",
    "Anak mengerjakan evaluasi fakta, opini, dan hoaks.",
    "Anak menarik garis fakta-opini, menggeser keranjang, mengurutkan langkah digital, dan menulis opini di kanvas.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
"Aplikasi game ini terbaik di seluruh bumi." Kalimat itu...
A) Fakta karena ada kata game
B) Opini karena penilaian pribadi
C) Fakta medis
D) Subjek saja`,
    `[Soal 2 - PG - Tipe: HOTS]
Kalimat kenyataan yang ada buktinya disebut...
A) Opini
B) Fakta
C) Hoaks
D) Bait`,
    `[Soal 3 - PG - Tipe: HOTS]
Mata lelah jika menatap layar terlalu lama adalah fakta kesehatan. Pernyataan ini...
A) Salah.
B) Benar; tubuh manusia bisa lelah menatap layar.
C) Hanya opini.
D) Hanya untuk orang dewasa.`,
    `[Soal 4 - PG - Tipe: HOTS]
Semua berita dan video di internet pasti 100% fakta jujur. Pernyataan ini...
A) Benar.
B) Salah; ada hoaks dan opini, wajib disaring.
C) Benar jika warnanya cerah.
D) Internet tidak punya opini.`,
    `[Soal 5 - PG - Tipe: Reguler]
"Komputer adalah alat elektronik." termasuk...
A) Opini
B) Fakta
C) Puisi
D) Legenda`,
    `[Soal 6 - PG - Tipe: Reguler]
"Warna casing gawai itu jelek sekali." termasuk...
A) Opini
B) Fakta
C) Subjek
D) Titik`,
    `[Soal 7 - PG - Tipe: Reguler]
Langkah pertama Ali memakai komputer sekolah adalah...
A) Langsung menonton video
B) Meminjam HP teman
C) Meminta izin dan bimbingan guru
D) Menutup mata`,
    `[Soal 8 - PG - Tipe: Reguler]
Pendapat atau perasaan pribadi disebut...
A) Fakta
B) Opini
C) Denah
D) Rambu`,
    `[Soal 9 - PG - Tipe: HOTS]
Mengapa kita harus kritis saat membaca di internet?
A) Karena ada fakta, opini, dan informasi palsu yang harus dipilah.
B) Supaya kita selalu menang game.
C) Supaya tidak perlu guru.
D) Supaya mata tidak boleh istirahat.`,
    `[Soal 10 - PG - Tipe: Reguler]
Keyboard dipakai untuk...
A) Berenang
B) Mengetik
C) Menanam pohon
D) Menyeberang`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Detektif Informasi",
      pengantar:
        "Infografis kunci fakta dan opini. Fakta nyata ada bukti. Opini pendapat yang bisa berbeda. Di internet kita menyaring keduanya.",
      labelDaftar: "Fakta, opini, dan kecerdasan digital",
      kolom: 1,
      item: [
        {
          nama: "Fakta",
          singkat: "Nyata dan ada bukti",
          uraian:
            "Fakta benar-benar terjadi, semua orang bisa memeriksa buktinya. Contoh: layar gawai memancarkan cahaya. Gawai membutuhkan baterai. Keyboard dipakai mengetik.",
          contoh: "Baterai HP bisa habis.",
        },
        {
          nama: "Opini",
          singkat: "Pendapat atau perasaan",
          uraian:
            "Opini adalah pendapat. Bisa berbeda di tiap kepala. Contoh: bermain gawai paling seru. Belajar lewat komputer membosankan. Robot itu menyeramkan.",
          contoh: "Game ini terbaik di bumi = opini.",
        },
        {
          nama: "Kecerdasan digital",
          singkat: "Saring sebelum percaya",
          uraian:
            "Di internet ada fakta, opini, dan hoaks. Detektif informasi bertanya: ada buktinya? Atau hanya perasaan penulis?",
          contoh: "Jangan percaya semua video.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Kalimat: Aplikasi game ini adalah game terbaik dan terbagus di seluruh bumi. Fakta atau opini? Mengapa?",
          alias: ["opini", "pendapat", "perasaan", "bukan fakta"],
        },
      ],
      kuisTulis: {
        pertanyaan:
          "Kalimat yang berisi kenyataan nyata yang benar-benar terjadi dan memiliki bukti disebut kalimat ...",
        alias: ["fakta"],
      },
      voice: [
        [
          "Anak-anak kelas 2 yang keren di era digital, hati-hati: tidak semua kalimat di layar adalah kebenaran mutlak.",
          "Fakta itu kenyataan yang terjadi, nyata, dan ada buktinya. Contoh: gawai membutuhkan baterai agar menyala.",
          "Opini itu pendapat atau perasaan. Belajar lewat komputer membosankan bagi sebagian anak, tetapi seru bagi yang lain. Yuk, jadi detektif informasi yang cerdas!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Mengakses Informasi dengan Aman",
      pengantar:
        "Infografis tiga langkah: izin guru, ketik kata kunci, catat fakta. Istirahatkan mata. Jangan percaya semua unggahan.",
      labelDaftar: "Izin, kata kunci, dan catat fakta",
      kolom: 1,
      item: [
        {
          nama: "Langkah 1 izin",
          singkat: "Jangan sendirian",
          uraian:
            "Komputer sekolah milik bersama. Ali meminta izin dan bimbingan Ibu Guru sebelum menyala. Orang dewasa membantu menyaring situs aman.",
          contoh: "Izin dulu, baru klik.",
        },
        {
          nama: "Langkah 2 kata kunci",
          singkat: "Tulis yang dicari",
          uraian:
            "Ketik kata yang jelas, misalnya Cara lebah membuat madu, bukan kata main-main. Kata kunci yang tepat menuntun ke teks fakta.",
          contoh: "Cara lebah membuat madu.",
        },
        {
          nama: "Langkah 3 catat dan istirahat",
          singkat: "Fakta ke buku, mata istirahat",
          uraian:
            "Baca, pilih yang ada buktinya, catat di buku. Mata bisa lelah jika menatap layar terlalu lama. Jauhkan layar, lihat jauh, kedipkan mata.",
          contoh: "Catat fakta, istirahat mata.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Apa langkah pertama yang harus dilakukan Ali sebelum menyalakan komputer sekolah?",
          alias: ["izin", "guru", "bimbingan"],
        },
      ],
      kuisTulis: {
        pertanyaan: "Informasi palsu di internet yang seolah-olah fakta disebut...",
        alias: ["hoaks", "hoax", "palsu"],
      },
      voice: [
        [
          "Mengakses informasi itu seperti masuk perpustakaan raksasa. Ada buku benar, ada coretan opini, ada kabar bohong.",
          "Langkah aman: izin guru, ketik kata kunci yang jelas, baca dan catat fakta. Jangan menonton sendirian tanpa batas waktu.",
          "Mata kita fakta kesehatan: lelah jika menatap layar terlalu lama. Istirahat adalah bagian dari bijak digital.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih opini game terbaik dan nama fakta, tentukan benar-salah mata lelah serta semua internet jujur, jodohkan kalimat digital, lalu jelaskan mengapa harus kritis.",
      labelDaftar: "Pilihan, benar-salah, mencocokkan, dan esai",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A dan B",
          singkat: "Opini dan fakta",
          uraian:
            "Game terbaik di bumi = opini. Kalimat berbukti = fakta. Mata lelah karena layar = fakta. Tidak semua unggahan jujur.",
          contoh: "Opini. Fakta. Hoaks ada.",
        },
        {
          nama: "Kelompok C dan D",
          singkat: "Langkah dan saring",
          uraian:
            "Komputer alat elektronik = fakta. Casing jelek = opini. Izin guru dulu. Kritis karena ada hoaks.",
          contoh: "Izin. Saring. Catat.",
        },
      ],
      kuis: [
        { pertanyaan: "Game terbaik di bumi?", alias: ["opini"] },
        { pertanyaan: "Kenyataan berbukti?", alias: ["fakta"] },
        { pertanyaan: "Mata lelah fakta?", alias: ["benar"] },
        { pertanyaan: "Semua internet jujur?", alias: ["salah", "hoaks"] },
        { pertanyaan: "Komputer alat elektronik?", alias: ["fakta"] },
        { pertanyaan: "Mengapa kritis?", alias: ["hoaks", "opini", "saring"] },
      ],
      voice: [
        ["Game terbaik itu opini. Kenyataan berbukti itu fakta."],
        ["Izin guru dulu. Tidak semua unggahan jujur."],
      ],
    },
    {
      kode: "D",
      judul: "D. Kartu Evaluasi Ekstra",
      pengantar:
        "Tanpa keyboard. Tarik garis fakta-opini, geser ke keranjang, urutkan langkah Ali mencari lebah, coretkan huruf opini, lalu tekan BENAR atau SALAH.",
      labelDaftar: "Tarik garis, keranjang, urutan, kanvas, detektif",
      kolom: 1,
      item: [
        {
          nama: "Permainan A sampai C",
          singkat: "Garis, keranjang, urutan",
          uraian:
            "Komputer alat elektronik = fakta. Casing jelek = opini. Internet banyak informasi = fakta. Urutan: izin, ketik, catat.",
          contoh: "Fakta. Opini. Izin dulu.",
        },
        {
          nama: "Permainan D dan E",
          singkat: "Kanvas dan detektif",
          uraian:
            "O-P-I-N-I. Mata lelah karena layar = fakta. Tidak semua unggahan 100% jujur.",
          contoh: "Coretkan I. BENAR lalu SALAH.",
        },
      ],
      kuis: [
        { pertanyaan: "Tarik garis fakta opini?", alias: ["fakta", "opini"] },
        { pertanyaan: "Keranjang informasi?", alias: ["baterai", "asyik"] },
        { pertanyaan: "Urutan Ali komputer?", alias: ["izin", "ketik", "catat"] },
        { pertanyaan: "Mata lelah fakta?", alias: ["benar"] },
        { pertanyaan: "Semua internet jujur?", alias: ["salah"] },
      ],
      kuisTulis: {
        pertanyaan: "Coretkan huruf terakhir O-P-I-N-__.",
        alias: ["opini", "i"],
      },
      voice: [
        [
          "Tanpa keyboard. Tarik garis kalimat ke fakta atau opini. Geser baterai habis ke fakta, menonton asyik ke opini.",
          "Urutkan: izin guru, ketik cara lebah membuat madu, catat fakta. Coretkan I untuk kata opini.",
          "Detektif: mata lelah karena layar adalah fakta. Tidak semua video di internet jujur.",
        ],
      ],
    },
  ],
};
