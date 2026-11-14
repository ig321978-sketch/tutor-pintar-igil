import type { AdeganStory } from "./logika-story";
import { W, bulat, emo, judul, kartu, kotak, garis, pita, teks, panah } from "./k5b2c-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k5b2c-bantu";

/* ------------------------------ 1. Pembuka Subbab C (Panduan Guru hlm. 61; Buku Siswa hlm. 43) ------------------------------ */
export const ADEGAN_PEMBUKA: AdeganStory = {
  id: "pembuka-c",
  judul: "Subbab C: Faktor",
  sumber: "Panduan Guru hlm. 61; Buku Siswa hlm. 43",
  latar: "#EFF6FF",
  kutipan: [
    "C. Faktor",
    "Pengalaman Belajar",
    "Setelah mempelajari bagian C ini, peserta didik diharapkan dapat menentukan faktor dari suatu bilangan.",
    "Eksplorasi 2.3A",
    "Ayo Berkreasi",
    "Eksplorasi 2.3B",
    "Ayo Menemukan Faktor dari 18",
    "Ayo Berlatih",
  ],
  ketukan: [
    k(
      "Subbab C, Faktor. Di subbab sebelumnya kita belajar kelipatan dan kelipatan persekutuan terkecil, atau KPK. Sekarang kita belajar hal baru, yaitu faktor.",
      tambah(0, judul("C. Faktor")),
      tambah("kelipatan", ...kartu("a1", 16, 60, 116, 50, W.langit, ["subbab A dan B", "kelipatan dan KPK"], 8.8)),
      tambah("Sekarang", panah("ar", 136, 85, 26, 0, W.merah, 2.4), ...kartu("a2", 168, 60, 116, 50, W.hijauMuda, ["subbab C", "faktor"], 9.4)),
      tambah("faktor@2", emo("a3", 150, 160, "🧩", 28)),
    ),
    k(
      "Sebelum mulai, guru menjelaskan pengalaman belajar. Setelah mempelajari bagian C, peserta didik diharapkan dapat menentukan faktor dari suatu bilangan.",
      bersih(0),
      tambah(0, judul("Pengalaman belajar")),
      tambah("pengalaman", emo("b1", 150, 76, "🎯", 30)),
      tambah("menentukan", ...kartu("b2", 30, 100, 240, 52, W.hijauMuda, ["menentukan faktor", "dari suatu bilangan"], 11)),
    ),
    k(
      "Jadi tujuan kita jelas: kalau diberi sebuah bilangan, kita mampu menuliskan semua faktornya. Bilangan dua belas dan delapan belas jadi contoh pertama kita.",
      bersih(0),
      tambah(0, judul("Tujuan subbab C")),
      tambah("dua", teks("c1", 90, 100, "12", 34, W.merah)),
      tambah("delapan", teks("c2", 210, 100, "18", 34, W.hijau)),
      tambah("faktornya", ...kartu("c3", 40, 130, 220, 36, W.krem, ["tulis semua faktornya"], 10)),
    ),
    k(
      "Subbab ini punya tiga bagian: Eksplorasi dua titik tiga A, Eksplorasi dua titik tiga B, dan Ayo Berlatih. Kita bahas bergantian.",
      bersih(0),
      tambah(0, judul("Tiga bagian subbab")),
      tambah("Eksplorasi", ...kartu("d1", 24, 36, 252, 36, W.hijauMuda, ["Eksplorasi 2.3A: faktor dari 12"], 9)),
      tambah("Eksplorasi@2", ...kartu("d2", 24, 82, 252, 36, W.langit, ["Eksplorasi 2.3B: faktor dari 18"], 9)),
      tambah("Berlatih.", ...kartu("d3", 24, 128, 252, 36, W.pink, ["Ayo Berlatih: 24, 36, 54, 72, 96"], 9)),
    ),
  ],
};

/* ------------------------------ 2. Sarana dan apersepsi (Panduan Guru hlm. 61; Buku Siswa hlm. 43) ------------------------------ */
export const ADEGAN_SARANA: AdeganStory = {
  id: "sarana-apersepsi",
  judul: "Sarana, media, dan apersepsi",
  sumber: "Panduan Guru hlm. 61; Buku Siswa hlm. 43",
  latar: "#FFFBEB",
  kutipan: [
    "Kebutuhan Sarana Prasarana dan Media Pembelajaran",
    "Alat tulis",
    "Penggaris",
    "Gunting",
    "Kertas berpetak ukuran 1 cm x 1 cm",
    "Pensil warna, krayon, atau spidol warna.",
    "Sebelum memulai topik yang baru, coba ingat kembali materi yang sudah dipelajari pada pertemuan sebelumnya, yaitu tentang KPK.",
    "Pastikan semua peserta didik memahami KPK dengan baik.",
    "Jika lebih dari 50% peserta didik belum memahami dengan baik, ulangi kembali materi tersebut secara singkat dengan memberikan beberapa soal latihan.",
    "Jika hanya sedikit yang belum paham, dapat diberikan bimbingan individu kepada peserta didik yang belum paham tersebut.",
  ],
  ketukan: [
    k(
      "Kebutuhan sarana dan media pembelajaran: alat tulis, penggaris, dan gunting. Ada juga kertas berpetak berukuran satu sentimeter kali satu sentimeter.",
      tambah(0, judul("Sarana dan media")),
      tambah("alat", emo("sa", 56, 78, "📝", 28), ...kartu("sa2", 16, 90, 80, 26, W.langit, ["alat tulis"], 9)),
      tambah("penggaris,", emo("sb", 150, 78, "📏", 28), ...kartu("sb2", 110, 90, 80, 26, W.krem, ["penggaris"], 9)),
      tambah("gunting.", emo("sc", 244, 78, "✂", 28), ...kartu("sc2", 204, 90, 80, 26, W.hijauMuda, ["gunting"], 9)),
      tambah("kertas", ...kartu("sd", 40, 134, 220, 32, W.pink, ["kertas berpetak 1 cm x 1 cm"], 9.8)),
    ),
    k(
      "Perlengkapan tambahan: pensil warna, krayon, atau spidol warna, untuk mewarnai potongan kertas. Gunting hanya dipakai untuk menggunting kertas, jadi harus hati-hati.",
      bersih(0),
      tambah(0, judul("Perlengkapan tambahan")),
      tambah("pensil", emo("se", 70, 76, "🖍", 30), ...kartu("se2", 20, 92, 100, 32, W.krem, ["pensil warna,", "krayon, spidol"], 8.6)),
      tambah("mewarnai", emo("sf", 230, 76, "🎨", 30), ...kartu("sf2", 180, 92, 100, 32, W.hijauMuda, ["mewarnai", "potongan kertas"], 8.6)),
      tambah("Gunting", ...kartu("sg", 30, 140, 240, 34, W.merahMuda, ["gunting: hanya untuk kertas, hati-hati"], 9)),
    ),
    k(
      "Apersepsi: sebelum topik baru, ingat kembali materi pertemuan sebelumnya, yaitu KPK. Pastikan semua peserta didik sudah memahaminya dengan baik.",
      bersih(0),
      tambah(0, judul("Apersepsi")),
      tambah("ingat", emo("ap", 150, 74, "💭", 34)),
      tambah("KPK.", ...kartu("ap2", 70, 94, 160, 36, W.langit, ["ingat kembali: KPK"], 11)),
      tambah("Pastikan", ...kartu("ap3", 40, 142, 220, 32, W.hijauMuda, ["semua peserta didik paham"], 9.6)),
    ),
    k(
      "Jika lebih dari lima puluh persen peserta didik belum paham, ulangi materi KPK secara singkat dengan beberapa soal latihan.",
      bersih(0),
      tambah(0, judul("Jika banyak yang belum paham")),
      tambah("lima", teks("pr", 150, 82, "> 50%", 34, W.merah)),
      tambah("ulangi", ...kartu("pr2", 30, 108, 240, 34, W.krem, ["ulangi KPK secara singkat"], 10)),
      tambah("soal", ...kartu("pr3", 30, 150, 240, 30, W.pink, ["beri beberapa soal latihan"], 9.6)),
    ),
    k(
      "Jika hanya sedikit yang belum paham, cukup beri bimbingan individu kepada mereka. Setelah itu kita siap masuk ke faktor.",
      bersih(0),
      tambah(0, judul("Jika hanya sedikit")),
      tambah("sedikit", emo("bi", 150, 76, "🤝", 32)),
      tambah("bimbingan", ...kartu("bi2", 40, 100, 220, 40, W.hijauMuda, ["bimbingan individu"], 11)),
      tambah("faktor.", teks("bi3", 150, 172, "siap belajar faktor", 12, W.ungu)),
    ),
  ],
};

/* ------------------------------ 3. Pemanasan: membagi permen (Panduan Guru hlm. 61 dan 62) ------------------------------ */
const permen = (xs: number[], y: number): ReturnType<typeof bulat>[] => xs.map((x, i) => bulat(`pm-${i}`, x, y, 10, W.pinkTua, W.putih));

export const ADEGAN_PERMEN: AdeganStory = {
  id: "pemanasan-permen",
  judul: "Pemanasan: membagi permen",
  sumber: "Panduan Guru hlm. 61–62",
  latar: "#FDF2F8",
  kutipan: [
    "Mulai kegiatan pada bagian ini dengan bercerita pada peserta didik tentang cara membagi permen.",
    "Ibu guru memiliki 6 buah permen.",
    "Permen tersebut dibagikan sama banyak kepada 3 orang siswa dan tidak ada permen tersisa.",
    "Apakah hal ini mungkin dilakukan?",
    "Selanjutnya, bagaimana jika permen tersebut hendak dibagikan sama banyak kepada 4 orang siswa, apakah akan ada sisa?",
    "3 adalah faktor dari 6, karena 3 dapat membagi habis 6; sedangkan 4 bukan faktor dari 6, karena 4 tidak membagi habis 6.",
    "Jika 6 dibagi 4, maka akan ada sisanya.",
    "mempelajari faktor dapat membantu menyelesaikan masalah dalam kehidupan sehari-hari.",
    "Masalah tentang cara membagi permen adalah masalah sederhana yang sering kita jumpai.",
  ],
  ketukan: [
    k(
      "Pemanasan. Guru bercerita tentang cara membagi permen. Ibu guru memiliki enam buah permen.",
      tambah(0, judul("Pemanasan: membagi permen")),
      tambah("memiliki", permen([45, 87, 129, 171, 213, 255], 72)),
      tambah("enam", teks("pj", 150, 114, "6 permen", 14, W.pinkTua)),
    ),
    k(
      "Permen itu dibagikan sama banyak kepada tiga orang siswa, dan tidak ada permen tersisa. Apakah ini mungkin? Tanyakan pendapat peserta didik.",
      hapus("dibagikan", "pj"),
      tambah("tiga", emo("sw1", 70, 152, "🧒", 26), emo("sw2", 150, 152, "🧒", 26), emo("sw3", 230, 152, "🧒", 26), teks("s3", 150, 46, "3 siswa", 13, W.biru)),
      ubah("sama", { id: "pm-0", x: 58, y: 118 }, { id: "pm-1", x: 82, y: 118 }, { id: "pm-2", x: 138, y: 118 }, { id: "pm-3", x: 162, y: 118 }, { id: "pm-4", x: 218, y: 118 }, { id: "pm-5", x: 242, y: 118 }),
      tambah("mungkin?", teks("pq", 150, 188, "mungkin?", 12, W.merah)),
    ),
    k(
      "Bisa. Tiap siswa mendapat dua permen dan tidak ada sisa, karena enam dibagi tiga habis. Jadi tiga adalah faktor dari enam.",
      hapus(0, "pq", "s3"),
      tambah("sisa", teks("bs", 150, 190, "sisa 0", 11, W.hijau)),
      tambah("enam", teks("bg", 150, 52, "6 : 3 = 2", 18, W.hijau)),
      tambah("faktor", teks("bf", 150, 76, "3 faktor dari 6", 12, W.ungu)),
    ),
    k(
      "Bagaimana kalau permen yang sama dibagikan kepada empat orang siswa? Tiap siswa dapat satu permen, dan dua permen masih tersisa.",
      bersih(0),
      tambah(0, judul("Dibagi 4 siswa")),
      tambah("empat", emo("sx1", 45, 160, "🧒", 26), emo("sx2", 115, 160, "🧒", 26), emo("sx3", 185, 160, "🧒", 26), emo("sx4", 255, 160, "🧒", 26)),
      tambah("satu", permen([45, 115, 185, 255], 128).slice(0, 4), teks("sa1", 150, 192, "tiap siswa: 1 permen", 11, W.hitam)),
      tambah("dua", bulat("pm-4", 128, 70, 10, W.pinkTua, W.merah, { tebal: 2.6 }), bulat("pm-5", 172, 70, 10, W.pinkTua, W.merah, { tebal: 2.6 }), teks("sa2", 150, 100, "sisa 2", 12, W.merah)),
    ),
    k(
      "Jadi tiga adalah faktor dari enam, karena tiga membagi habis enam. Empat bukan faktor dari enam, karena enam dibagi empat masih bersisa.",
      bersih(0),
      tambah(0, judul("Faktor atau bukan?")),
      tambah("tiga", ...kartu("fk1", 20, 44, 260, 44, W.hijauMuda, ["6 : 3 = 2, sisa 0", "3 faktor dari 6"], 10)),
      tambah("Empat", ...kartu("fk2", 20, 100, 260, 44, W.merahMuda, ["6 : 4 = 1, sisa 2", "4 bukan faktor dari 6"], 10)),
    ),
    k(
      "Mempelajari faktor membantu menyelesaikan masalah sehari-hari. Membagi permen adalah contoh sederhananya.",
      bersih(0),
      tambah(0, judul("Faktor dalam keseharian")),
      tambah("Mempelajari", emo("hs", 150, 82, "🏠", 36)),
      tambah("permen", ...kartu("hs2", 40, 110, 220, 36, W.krem, ["membagi permen sama banyak"], 10)),
      tambah("sederhana", teks("hs3", 150, 172, "masalah sederhana, sering dijumpai", 9.6, W.coklat)),
    ),
  ],
};

/* ------------------------------ 4. Persiapan dan pelaksanaan guru (Panduan Guru hlm. 62 sampai 64) ------------------------------ */
const sepuluhDua = (id: string, x: number, y: number, w: number, h: number) => {
  // potongan tidak sama panjang: 5, 4, dan 3 petak (hanya untuk contoh kesulitan peserta didik)
  const lebar = w / 12;
  const warna = [W.jingga, W.pink, W.hijauPita];
  const batas = [0, 5, 9, 12];
  return [
    ...Array.from({ length: 12 }, (_, i) => {
      const bagian = i < 5 ? 0 : i < 9 ? 1 : 2;
      return kotak(`${id}-${i}`, Math.round((x + i * lebar) * 10) / 10, y, Math.round(lebar * 10) / 10, h, warna[bagian], W.biru, { rx: 0, tebal: 1.1 });
    }),
    garis(`${id}-p1`, Math.round((x + batas[1] * lebar) * 10) / 10, y - 3, 0, h + 6, W.merah, 1.6),
    garis(`${id}-p2`, Math.round((x + batas[2] * lebar) * 10) / 10, y - 3, 0, h + 6, W.merah, 1.6),
  ];
};

export const ADEGAN_GURU: AdeganStory = {
  id: "persiapan-guru",
  judul: "Persiapan dan pelaksanaan guru",
  sumber: "Panduan Guru hlm. 62–64",
  latar: "#F0FDF4",
  kutipan: [
    "Hal-hal yang perlu dilakukan guru sebelum kegiatan dimulai adalah sebagai berikut.",
    "Membuat kelompok kecil dengan anggota 3–4 orang.",
    "Memastikan setiap kelompok memiliki perlengkapan lengkap.",
    "Meminta setiap kelompok untuk membuat 6 buah potongan kertas berpetak dengan panjang setiap potongan adalah 12 petak.",
    "Ukuran petak sebaiknya 1 cm x 1 cm agar lebih mudah diamati.",
    "Jika guru kesulitan mendapatkan kertas ukuran tersebut, guru dapat mencetak sendiri, kemudian memperbanyaknya.",
    "Pastikan setiap anggota kelompok bekerja sama dan semuanya bekerja.",
    "Selain diskusi, tujuan kerja kelompok adalah agar kegiatan mewarnai petak-petak kertas menjadi lebih cepat.",
    "Menyampaikan tugas kepada setiap kelompok, yaitu mereka harus membagi setiap potongan kertas dengan panjang 12 kotak menjadi bagian yang sama panjang dan tidak boleh ada sisa.",
    "Mungkin ada peserta didik yang mengalami kesulitan dan akhirnya memotong kertas menjadi potongan yang tidak sama panjang atau menjadi beberapa potongan yang sama panjang, tetapi memberikan sisa potongan.",
    "lakukan bimbingan kepada kelompok yang masih kesulitan dengan memberikan satu contoh.",
  ],
  ketukan: [
    k(
      "Persiapan guru untuk Eksplorasi dua titik tiga A. Pertama, buat kelompok kecil beranggotakan tiga sampai empat orang, dan pastikan tiap kelompok punya perlengkapan lengkap.",
      tambah(0, judul("Persiapan: Eksplorasi 2.3A")),
      tambah("kelompok", ...kartu("pg1", 24, 40, 252, 36, W.hijauMuda, ["kelompok kecil, 3–4 orang"], 10)),
      tambah("perlengkapan", ...kartu("pg2", 24, 88, 252, 36, W.langit, ["perlengkapan lengkap"], 10)),
      tambah("punya", emo("pg3", 150, 166, "👥", 34)),
    ),
    k(
      "Kedua, minta tiap kelompok membuat enam potongan kertas berpetak. Panjang tiap potongan dua belas petak, dengan ukuran petak sebaiknya satu sentimeter kali satu sentimeter.",
      bersih(0),
      tambah(0, judul("Potongan kertas berpetak")),
      tambah("enam", teks("kx", 150, 52, "6 potongan kertas", 12, W.coklat)),
      tambah("dua", ...pita("p12x12", 42, 82, 216, 18, 12, 12, W.hijauPita), teks("kp", 150, 72, "12 petak", 11, W.merah)),
      tambah("satu", teks("ku", 150, 132, "tiap petak: 1 cm x 1 cm", 11, W.hitam)),
    ),
    k(
      "Kalau kertas berpetak sulit didapat, guru dapat mencetaknya sendiri lalu memperbanyaknya. Pastikan semua anggota kelompok ikut bekerja, termasuk mewarnai.",
      bersih(0),
      tambah(0, judul("Kertas sulit didapat?")),
      tambah("mencetaknya", emo("ct", 70, 66, "🖨", 30), teks("ct2", 70, 86, "cetak sendiri", 8.2, W.hitam)),
      tambah("memperbanyaknya", emo("cb", 150, 66, "📑", 30), teks("cb2", 150, 86, "perbanyak", 8.2, W.hitam)),
      tambah("bekerja", ...kartu("cs", 40, 108, 220, 36, W.hijauMuda, ["semua anggota bekerja sama"], 10)),
      tambah("mewarnai", emo("cw", 230, 66, "🎨", 30), teks("cw2", 230, 86, "warnai petak", 8.2, W.hitam)),
    ),
    k(
      "Pelaksanaan. Peran guru: sampaikan tugas kepada tiap kelompok. Bagi setiap potongan sepanjang dua belas petak menjadi bagian yang sama panjang, tanpa boleh ada sisa.",
      bersih(0),
      tambah(0, judul("Pelaksanaan: peran guru")),
      tambah("potongan", ...pita("p12x12", 42, 66, 216, 18, 12, 12, W.hijauPita), teks("kp", 150, 56, "12 petak", 11, W.merah)),
      tambah("bagian", teks("pk", 150, 118, "bagian sama panjang", 11, W.hijau)),
      tambah("sisa.", teks("ps", 150, 146, "tanpa sisa", 13, W.merah)),
    ),
    k(
      "Mungkin ada kelompok yang memotong tidak sama panjang, atau sama panjang tetapi masih bersisa. Bimbinglah kelompok itu dengan memberikan satu contoh.",
      bersih(0),
      tambah(0, judul("Kemungkinan kesulitan")),
      tambah("tidak", ...sepuluhDua("tx12", 42, 46, 216, 18), teks("tx", 150, 84, "tidak sama panjang", 10, W.merah)),
      tambah("bersisa.", ...pita("p12x5", 42, 106, 216, 18, 12, 5), teks("ty", 150, 144, "sama panjang, tetapi bersisa", 10, W.merah)),
      tambah("satu", ...kartu("bc", 60, 158, 180, 28, W.hijauMuda, ["bimbing: beri 1 contoh"], 9.4)),
    ),
  ],
};
