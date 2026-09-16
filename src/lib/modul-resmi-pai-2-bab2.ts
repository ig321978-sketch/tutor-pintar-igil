import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_PAI2_BAB2 = "Bab 2: Mari Mengenal Allah Swt.";

export const MODUL_PAI2_BAB2: ModulResmiPai = {
  id: "pai-2-bab2",
  judul: JUDUL_PAI2_BAB2,
  pola: /mari mengenal allah|asmaulhusna|asmaul husna|bukti adanya allah/,
  motivasi:
    "Al-Hafiz memelihara, Al-Wali melindungi, Al-'Alim mengetahui isi hati. Meja ada tukangnya, alam ada Khaliknya. Allah tidak sama dengan makhluk.",
  kunciJawaban: "B,B,B,S,A,B,C,A,B,B",
  sketsaKartu: [
    "Anak meneladani Al-Hafiz, Al-Wali, dan Al-'Alim di kelas dan di hati.",
    "Meja punya tukang, gunung dan laut punya Pencipta.",
    "Anak menjelaskan bukti Allah lewat ciptaan di sekitar.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Nia tidak sengaja menjatuhkan pensil Tono saat kelas sepi. Walau tidak ada teman yang melihat, Nia segera mengembalikan pensil itu karena ia tahu Allah memiliki sifat Al-'Alim, yang artinya...
A) Allah Maha Melindungi anak yang sedih.
B) Allah Maha Mengetahui segala sesuatu termasuk perbuatan yang tersembunyi.
C) Allah Maha Memelihara semua mainan kita.
D) Allah Maha Membuat pensil.`,
    `[Soal 2 - PG - Tipe: HOTS]
Adanya keteraturan pergantian siang dan malam serta buah-buahan yang tumbuh subur di bumi merupakan bukti nyata bahwa...
A) Alam semesta tercipta secara kebetulan dan bergerak sendiri.
B) Allah SWT itu Ada dan Mengatur seluruh kehidupan makhluk-Nya.
C) Manusia bisa membuat matahari sendiri.
D) Meja bisa muncul dari tanah.`,
    `[Soal 3 - PG - Tipe: HOTS]
Kita meneladani Al-Hafiz dengan merawat kebersihan lingkungan. Pernyataan ini...
A) Salah.
B) Benar; menjaga kelas dan bumi adalah meneladani Maha Memelihara.
C) Benar hanya di rumah.
D) Tidak berhubungan dengan Asmaulhusna.`,
    `[Soal 4 - PG - Tipe: HOTS]
Allah memiliki wujud dan kelemahan yang sama persis seperti makhluk. Pernyataan ini...
A) Benar.
B) Salah; Khalik tidak sama dengan makhluk.
C) Benar jika kita lelah.
D) Hanya untuk ikan.`,
    `[Soal 5 - PG - Tipe: Reguler]
Al-Hafiz artinya...
A) Maha Memelihara.
B) Maha Melindungi saja.
C) Sang makhluk.
D) Tukang meja.`,
    `[Soal 6 - PG - Tipe: Reguler]
Al-Wali artinya...
A) Maha Mengetahui.
B) Maha Melindungi.
C) Maha Membuat hujan.
D) Maha Membuat pensil.`,
    `[Soal 7 - PG - Tipe: Reguler]
Khalik artinya...
A) Yang diciptakan.
B) Meja kayu.
C) Sang Pencipta.
D) Ikan laut.`,
    `[Soal 8 - PG - Tipe: HOTS]
Jika sendirian di kamar, apakah rahasia bisa disembunyikan dari Allah?
A) Tidak; Al-'Alim Maha Mengetahui isi hati.
B) Ya, karena pintu tertutup.
C) Ya, jika lampu dimatikan.
D) Hanya malaikat yang tahu.`,
    `[Soal 9 - PG - Tipe: HOTS]
Meja tidak muncul sendiri, maka alam yang luas...
A) Muncul kebetulan.
B) Pasti ada Penciptanya, yaitu Allah.
C) Dibuat manusia di pabrik.
D) Tidak perlu dijelaskan.`,
    `[Soal 10 - PG - Tipe: Reguler]
Segala sesuatu yang diciptakan Allah disebut...
A) Khalik.
B) Makhluk.
C) Asmaulhusna.
D) Al-Wali.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Tiga Nama Agung Allah",
      pengantar:
        "Infografis Asmaulhusna: Al-Hafiz Maha Memelihara, Al-Wali Maha Melindungi, Al-'Alim Maha Mengetahui. Kita meneladani dengan jaga kelas, jujur, dan rajin belajar.",
      labelDaftar: "Al-Hafiz, Al-Wali, Al-'Alim",
      kolom: 1,
      item: [
        {
          nama: "Al-Hafiz",
          singkat: "Maha Memelihara",
          uraian:
            "Bumi tidak menabrak matahari. Ikan di laut dalam tetap mendapat makan. Itu pemeliharaan Allah yang rapi. Teladan kita: jaga kebersihan kelas dan jangan merusak tanaman.",
          contoh: "Jaga kelas. Jaga bumi.",
        },
        {
          nama: "Al-Wali",
          singkat: "Maha Melindungi",
          uraian:
            "Allah sahabat terbaik yang melindungi hamba yang beriman. Saat berdoa memohon keselamatan, kita bersandar kepada Al-Wali.",
          contoh: "Berdoa. Allah melindungi.",
        },
        {
          nama: "Al-'Alim",
          singkat: "Maha Mengetahui",
          uraian:
            "Allah tahu jumlah helai rambut dan bisikan hati. Walau kelas sepi, Nia mengembalikan pensil Tono karena Allah melihat. Kita jujur karena Al-'Alim.",
          contoh: "Allah tahu hati. Tetap jujur.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Jika tidak ada manusia yang melihatmu sendirian di kamar, apakah rahasiamu bisa disembunyikan dari Allah? Sifat Asmaulhusna apa yang membuktikannya?",
          alias: ["alim", "mengetahui", "tidak", "tidak bisa", "allah tahu"],
        },
      ],
      kuisTulis: {
        pertanyaan: "Tuliskan arti dari sifat Allah Al-Wali!",
        alias: ["melindungi", "pelindung", "wali"],
      },
      voice: [
        [
          "Anak-anak soleh, pernahkah kalian berpikir, mengapa bumi yang kita tinggali ini tidak pernah tabrakan dengan matahari? Dan mengapa ikan-ikan di lautan dalam bisa tetap hidup dan mendapatkan makanan?",
          "Itu semua karena Allah memiliki sifat Al-Hafiz, artinya Allah Maha Memelihara alam semesta ini dengan sangat rapi. Allah juga bernama Al-Wali, Sahabat Terbaik yang selalu melindungi kita saat kita berdoa memohon keselamatan.",
          "Dan ingat anak-anak, Allah adalah Al-'Alim. Allah tahu segalanya! Allah tahu jumlah helai rambut di kepalamu, dan Allah tahu apa yang sedang kamu bisikkan di dalam hatimu.",
          "Karena Allah Maha Mengetahui, yuk kita selalu menjaga pikiran dan perbuatan kita agar tetap jujur dan baik!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Melihat Allah lewat Ciptaan",
      pengantar:
        "Infografis: ada meja tentu ada tukang. Ada alam tentu ada Pencipta. Allah adalah Khalik. Semua yang diciptakan disebut makhluk. Khalik tidak sama dengan makhluk.",
      labelDaftar: "Bukti nyata keberadaan Allah",
      kolom: 1,
      item: [
        {
          nama: "Ada meja, ada tukang",
          singkat: "Tidak muncul sendiri",
          uraian:
            "Meja tulis tidak tiba-tiba muncul dari tanah. Ada tukang kayu dengan palu dan gergaji. Benda kecil pun punya pembuat.",
          contoh: "Meja = ada yang membuat.",
        },
        {
          nama: "Ada alam, ada Pencipta",
          singkat: "Gunung, laut, napas",
          uraian:
            "Awan berarak, gunung menjulang, jantung berdetak otomatis. Jika meja ada pembuatnya, alam yang luas pasti ada Pencipta yang Maha Hebat: Allah SWT.",
          contoh: "Alam = ada Allah.",
        },
        {
          nama: "Khalik dan makhluk",
          singkat: "Tidak sama",
          uraian:
            "Allah adalah Khalik, Sang Pencipta. Kita, meja, ikan, dan gunung adalah makhluk. Allah tidak berwujud lemah seperti makhluk.",
          contoh: "Khalik menciptakan. Makhluk diciptakan.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Siapa yang bisa memberikan contoh perbedaan antara pencipta (Khalik) dengan yang diciptakan (makhluk)?",
          alias: ["allah", "khalik", "makhluk", "cipta", "meja", "manusia"],
        },
      ],
      kuisTulis: {
        pertanyaan: "Sebutan bagi Allah sebagai Sang Pencipta adalah ........................",
        alias: ["khalik", "pencipta"],
      },
      voice: [
        [
          "Anak-anak kelas 2 yang cerdas, mari kita lakukan eksperimen kecil. Coba lihat meja tulis yang ada di depanmu. Apakah meja itu tiba-tiba muncul sendiri dari dalam tanah secara ajaib? Tentu tidak. Meja itu ada karena ada tukang kayu yang membuatnya dengan palu dan gergaji.",
          "Sekarang, mari kita lihat ke luar jendela. Ada awan yang berarak, ada gunung yang menjulang tinggi, dan ada tubuh kita yang bisa bernapas dengan jantung yang berdetak otomatis.",
          "Jika meja yang kecil saja ada pembuatnya, tentu alam semesta yang super luas ini ada Penciptanya yang Maha Hebat! Itulah Allah SWT. Kita tidak bisa melihat Allah dengan mata, tetapi kita bisa melihat bukti kehebatan-Nya melalui semua ciptaan-Nya.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih arti Al-'Alim dan bukti siang-malam, tentukan benar-salah Al-Hafiz dan wujud Allah, jodohkan Asmaulhusna, lalu jelaskan bukti Allah lewat benda di sekitar.",
      labelDaftar: "Pilihan, benar-salah, mencocokkan, dan esai",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A dan B",
          singkat: "Alim dan bukti alam",
          uraian:
            "Al-'Alim: Maha Mengetahui yang tersembunyi. Siang-malam dan buah subur: Allah ada dan mengatur. Teladan Al-Hafiz: jaga lingkungan, benar. Allah sama seperti makhluk: salah.",
          contoh: "Tahu yang tersembunyi. Allah mengatur. Bukan makhluk.",
        },
        {
          nama: "Kelompok C dan D",
          singkat: "Jodoh dan meja",
          uraian:
            "Al-Hafiz: Maha Memelihara. Al-Wali: Maha Melindungi. Khalik: Sang Pencipta. Jelaskan: meja ada tukangnya, alam ada Allah.",
          contoh: "Hafiz-pelihara. Wali-lindung. Khalik-pencipta.",
        },
      ],
      kuis: [
        { pertanyaan: "Al-'Alim artinya?", alias: ["mengetahui"] },
        { pertanyaan: "Siang malam bukti?", alias: ["allah", "ada"] },
        { pertanyaan: "Jaga lingkungan meneladani Al-Hafiz?", alias: ["benar"] },
        { pertanyaan: "Allah sama seperti makhluk?", alias: ["salah", "tidak"] },
        { pertanyaan: "Khalik artinya?", alias: ["pencipta"] },
        { pertanyaan: "Bukti Allah lewat apa?", alias: ["cipta", "meja", "alam"] },
      ],
      voice: [
        [
          "Al-'Alim mengetahui yang tersembunyi. Siang dan malam bukti Allah mengatur makhluk-Nya.",
        ],
        [
          "Al-Hafiz memelihara, Al-Wali melindungi, Khalik mencipta. Meja ada tukang, alam ada Allah.",
        ],
      ],
    },
  ],
};
