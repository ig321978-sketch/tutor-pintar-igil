import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_BINDO2_BAB8 = "Bab 8: Cinta Budaya Nusantara";

export const MODUL_BINDO2_BAB8: ModulResmiPai = {
  id: "bindo-2-bab8",
  judul: JUDUL_BINDO2_BAB8,
  pola: /cinta budaya|hikayat|dongeng asal-usul|legenda nusantara|hobi yang jadi prestasi/,
  motivasi:
    "Legenda mengisahkan asal-usul tempat. Hikayat berkisah di istana. Fabel tokohnya hewan. Hikmah: gotong royong, jujur, berbakti. Latar bisa gunung atau desa nyata.",
  kunciJawaban: "B,A,S,B,B,A,C,B,A,B",
  sketsaKartu: [
    "Anak mendengar legenda danau dan memetik hikmah adil.",
    "Anak membedakan kata baginda, istana, dan gotong royong.",
    "Anak mengerjakan evaluasi legenda, hikayat, dan watak.",
    "Anak menarik garis antagonis-latar-hikmah, menggeser watak, mengurutkan lidi ajaib, dan menulis hikayat di kanvas.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Cerita rakyat tentang asal-usul suatu tempat dinamakan...
A) Fabel
B) Legenda
C) Opini
D) Denah`,
    `[Soal 2 - PG - Tipe: HOTS]
Gotong royong hanya ada di cerita modern, tidak di dongeng Nusantara. Pernyataan ini...
A) Salah; gotong royong sering diajarkan cerita rakyat.
B) Benar.
C) Benar hanya di kota.
D) Dongeng tidak punya nilai.`,
    `[Soal 3 - PG - Tipe: HOTS]
Latar legenda bisa gunung, danau, atau desa nyata di Indonesia. Pernyataan ini...
A) Salah.
B) Benar; legenda mengaitkan khayalan dengan tempat nyata.
C) Benar hanya di luar negeri.
D) Latar hanya istana bulan.`,
    `[Soal 4 - PG - Tipe: HOTS]
Raja yang membagikan padi secara adil saat kemarau mencontohkan nilai...
A) Serakah
B) Adil dan peduli rakyat
C) Iri hati
D) Hoaks`,
    `[Soal 5 - PG - Tipe: Reguler]
Tokoh yang wataknya buruk dan memicu masalah disebut...
A) Antagonis
B) Latar
C) Hikmah
D) Fakta`,
    `[Soal 6 - PG - Tipe: Reguler]
Hikmah cerita artinya...
A) Pesan kebaikan atau amanat moral
B) Nama gunung saja
C) Tanda tanya
D) Baterai`,
    `[Soal 7 - PG - Tipe: Reguler]
Cerita istana, raja, dan pangeran zaman dahulu disebut...
A) Fakta digital
B) Opini
C) Hikayat
D) Rambu`,
    `[Soal 8 - PG - Tipe: Reguler]
Baginda artinya...
A) Sungai
B) Sebutan hormat untuk raja
C) Sampah
D) Keyboard`,
    `[Soal 9 - PG - Tipe: HOTS]
Mengapa kita membaca dongeng Nusantara, bukan hanya untuk tertawa?
A) Supaya memetik budi pekerti luhur dan mengenal budaya daerah.
B) Supaya lupa orang tua.
C) Supaya tidak perlu sekolah.
D) Supaya jadi antagonis.`,
    `[Soal 10 - PG - Tipe: Reguler]
Fabel berbeda dari legenda karena fabel...
A) Tokoh utamanya hewan yang berbicara
B) Selalu tentang danau nyata
C) Tidak punya amanat
D) Hanya opini`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Memetik Nilai Luhur Dongeng Asal-Usul",
      pengantar:
        "Infografis unsur dongeng Nusantara: latar budaya, tokoh dan watak, hikmah gotong royong dan berbakti. Legenda = asal-usul tempat.",
      labelDaftar: "Latar, tokoh, hikmah, kenal budaya",
      kolom: 1,
      item: [
        {
          nama: "Latar budaya",
          singkat: "Tempat, pakaian, adat",
          uraian:
            "Dongeng menceritakan daerah: desa, gunung, danau, istana. Ada pakaian dan adat setempat. Legenda sering menjelaskan nama tempat, misalnya danau atau kota.",
          contoh: "Danau Toba. Desa gersang.",
        },
        {
          nama: "Tokoh dan watak",
          singkat: "Bijaksana atau serakah",
          uraian:
            "Ada tokoh bijaksana, sabar, jujur. Ada juga yang serakah atau iri. Raja adil membagi padi. Raksasa merebut ladang.",
          contoh: "Raja adil. Raksasa serakah.",
        },
        {
          nama: "Hikmah utama",
          singkat: "Budi pekerti luhur",
          uraian:
            "Hikmah adalah pesan kebaikan: gotong royong, berbakti, jujur, setia kawan. Legenda membantu kita mengenal sejarah nama daerah sambil belajar moral.",
          contoh: "Bagi padi secara adil.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Jika kamu membaca dongeng Raja yang Bijaksana Membagikan Padi Secara Adil Saat Kemarau, nilai budi pekerti apa yang dicontohkan raja?",
          alias: ["adil", "bagi", "peduli", "rakyat", "tidak serakah"],
        },
      ],
      kuisTulis: {
        pertanyaan:
          "Cerita rakyat yang mengisahkan asal-usul suatu tempat dinamakan... (Legenda / Fabel)",
        alias: ["legenda"],
      },
      voice: [
        [
          "Anak-anak kelas 2 yang bangga menjadi anak Indonesia! Negeri kita kaya cerita rakyat dari Sabang sampai Merauke.",
          "Legenda atau dongeng asal-usul, seperti nama kota atau danau, mengajak kita ke masa lalu dan mengenal kata baginda, istana, atau gotong royong.",
          "Yang paling penting: memetik hikmah. Cerita budaya mengajarkan hormat pada orang tua, jujur, setia kawan, dan suka menolong. Yuk, lestarikan budaya kita!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Kosakata Budaya dan Jenis Cerita",
      pengantar:
        "Infografis kamus istana: baginda, istana, gotong royong. Bedakan hikayat, legenda, dan fabel supaya tidak tertukar.",
      labelDaftar: "Baginda, hikayat, legenda, fabel",
      kolom: 1,
      item: [
        {
          nama: "Kata istana",
          singkat: "Baginda dan gotong royong",
          uraian:
            "Baginda: sebutan hormat untuk raja. Istana: rumah raja. Gotong royong: bekerja bersama tanpa upah, nilai luhur Indonesia yang sering muncul di cerita rakyat.",
          contoh: "Baginda mengajak rakyat gotong royong.",
        },
        {
          nama: "Hikayat",
          singkat: "Keluarga istana",
          uraian:
            "Hikayat adalah cerita tradisional tentang kehidupan raja, pangeran, dan istana. Bahasanya terasa kuno dan hormat.",
          contoh: "Hikayat pangeran yang suka berbagi.",
        },
        {
          nama: "Jangan tertukar",
          singkat: "Legenda, hikayat, fabel",
          uraian:
            "Legenda: asal-usul tempat nyata. Hikayat: istana dan raja. Fabel: hewan berbicara. Malin Kundang lebih dekat legenda manusia, bukan fabel.",
          contoh: "Danau = legenda. Semut = fabel.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Apa perbedaan legenda, hikayat, dan fabel? Sebutkan satu ciri masing-masing.",
          alias: ["tempat", "istana", "hewan", "legenda", "hikayat", "fabel"],
        },
      ],
      kuisTulis: {
        pertanyaan: "Sebutan hormat untuk raja dalam cerita rakyat adalah...",
        alias: ["baginda"],
      },
      voice: [
        [
          "Kosakata budaya membuat kita ikut masuk ke istana dan desa zaman dahulu. Baginda artinya raja yang dihormati. Gotong royong artinya kerja bersama.",
          "Hikayat berkisah tentang keluarga istana. Legenda menjelaskan asal tempat. Fabel tokohnya hewan.",
          "Jangan tertukar ya, supaya saat kita memetik hikmah, kita tahu jenis ceritanya.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih nama legenda dan nilai raja adil, tentukan benar-salah gotong royong serta latar nyata, jodohkan antagonis-latar-hikmah, lalu jelaskan mengapa membaca dongeng Nusantara.",
      labelDaftar: "Pilihan, benar-salah, mencocokkan, dan esai",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A dan B",
          singkat: "Legenda dan hikmah",
          uraian:
            "Asal-usul tempat = legenda. Gotong royong ada di dongeng Nusantara. Latar bisa danau nyata. Raja bagi padi = adil.",
          contoh: "Legenda. Adil. Latar nyata.",
        },
        {
          nama: "Kelompok C dan D",
          singkat: "Watak dan hikayat",
          uraian:
            "Antagonis watak buruk. Hikmah = amanat. Hikayat = istana. Fabel = hewan. Kita baca untuk budi pekerti, bukan hanya tertawa.",
          contoh: "Antagonis. Hikayat. Budi pekerti.",
        },
      ],
      kuis: [
        { pertanyaan: "Asal-usul tempat?", alias: ["legenda"] },
        { pertanyaan: "Gotong royong hanya modern?", alias: ["salah"] },
        { pertanyaan: "Latar danau nyata?", alias: ["benar"] },
        { pertanyaan: "Raja bagi padi?", alias: ["adil"] },
        { pertanyaan: "Antagonis itu?", alias: ["buruk", "masalah"] },
        { pertanyaan: "Mengapa baca dongeng?", alias: ["hikmah", "budaya", "budi"] },
      ],
      voice: [
        ["Asal-usul tempat disebut legenda. Gotong royong ada di cerita rakyat."],
        ["Hikayat di istana. Fabel hewannya berbicara. Petik hikmahnya."],
      ],
    },
    {
      kode: "D",
      judul: "D. Kartu Evaluasi Ekstra",
      pengantar:
        "Tanpa keyboard. Tarik garis antagonis-latar-hikmah, geser watak baik atau serakah, urutkan lidi ajaib, coretkan huruf hikayat, lalu tekan BENAR atau SALAH.",
      labelDaftar: "Tarik garis, keranjang, urutan, kanvas, detektif",
      kolom: 1,
      item: [
        {
          nama: "Permainan A sampai C",
          singkat: "Garis, keranjang, urutan",
          uraian:
            "Antagonis: watak buruk. Latar: tempat atau waktu. Hikmah: amanat. Baik: pangeran berbagi, petani jujur. Serakah: raksasa, penyihir. Urutan: pemuda datang, cabut lidi, air jadi danau.",
          contoh: "Hikmah. Petani jujur. Lidi lalu danau.",
        },
        {
          nama: "Permainan D dan E",
          singkat: "Kanvas dan detektif",
          uraian:
            "H-I-K-A-Y-A-T. Gotong royong ada di dongeng Nusantara. Latar legenda bisa tempat nyata.",
          contoh: "Coretkan AT. SALAH lalu BENAR.",
        },
      ],
      kuis: [
        { pertanyaan: "Tarik garis unsur cerita?", alias: ["antagonis", "latar", "hikmah"] },
        { pertanyaan: "Keranjang watak?", alias: ["pangeran", "raksasa"] },
        { pertanyaan: "Urutan lidi danau?", alias: ["desa", "lidi", "danau"] },
        { pertanyaan: "Gotong royong hanya modern?", alias: ["salah"] },
        { pertanyaan: "Latar legenda bisa nyata?", alias: ["benar"] },
      ],
      kuisTulis: {
        pertanyaan: "Coretkan dua huruf terakhir H-I-K-A-Y-__-__.",
        alias: ["hikayat", "at", "t"],
      },
      voice: [
        [
          "Tanpa keyboard. Tarik garis antagonis, latar, dan hikmah. Geser pangeran ke watak baik, raksasa ke serakah.",
          "Urutkan: pemuda datang ke desa gersang, mencabut lidi ajaib, air memancar jadi danau. Coretkan A dan T untuk kata hikayat.",
          "Detektif: gotong royong ada di dongeng Nusantara. Latar legenda bisa gunung atau desa yang nyata.",
        ],
      ],
    },
  ],
};
