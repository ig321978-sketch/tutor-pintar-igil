import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_PAI2_BAB1 = "Bab 1: Ayo Belajar Al-Qur'an";

export const MODUL_PAI2_BAB1: ModulResmiPai = {
  id: "pai-2-bab1",
  judul: JUDUL_PAI2_BAB1,
  pola: /ayo belajar al[-\s]?qur|surah an[-\s]?nas|hijaiyah bersambung/,
  motivasi:
    "Surah an-Nas adalah tameng iman: Allah Malik dan Ilah manusia. Huruf hijaiyah bergotong royong, kecuali enam huruf yang hanya mau digandeng dari kanan.",
  kunciJawaban: "B,B,B,S,B,A,C,B,A,B",
  sketsaKartu: [
    "Anak berlindung di bawah tameng iman Surah an-Nas dari bisikan setan.",
    "Huruf hijaiyah bergandengan tangan: awal, tengah, akhir, dan enam huruf pemalu.",
    "Anak mengerjakan evaluasi an-Nas dan sambung huruf.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Surah an-Nas adalah surah terakhir di dalam Al-Qur'an yang terdiri dari 6 ayat. Surah ini diturunkan kepada Nabi Muhammad SAW dengan tujuan utama untuk...
A) Mengajarkan manusia cara berhitung.
B) Menjadi doa memohon perlindungan kepada Allah dari kejahatan bisikan setan.
C) Mengenalkan nama-nama malaikat.
D) Mengajarkan nama hari.`,
    `[Soal 2 - PG - Tipe: HOTS]
Perhatikan huruf-huruf berikut: ( ر - ز - و ). Huruf-huruf tersebut memiliki aturan penulisan bersambung yaitu...
A) Boleh disambung dengan huruf di sebelah kanan maupun kirinya.
B) Hanya bisa disambung dari arah kanan dan tidak bisa menggandeng huruf di sebelah kirinya.
C) Tidak boleh ditulis di awal kata.
D) Harus selalu berdiri sendiri tanpa tetangga.`,
    `[Soal 3 - PG - Tipe: HOTS]
Mengucapkan kata bohong atau mengejek teman adalah tanda...
A) Kita sedang pintar.
B) Dada sedang kemasukan bisikan buruk dari setan.
C) Huruf hijaiyah sedang marah.
D) Surah an-Nas sudah selesai.`,
    `[Soal 4 - PG - Tipe: HOTS]
Huruf Alif di tengah kata bisa membuka tangan kiri untuk menyambung huruf setelahnya. Pernyataan ini...
A) Benar.
B) Salah; Alif termasuk huruf yang tidak mau menggandeng ke kiri.
C) Benar hanya di malam hari.
D) Tidak ada hubungannya dengan hijaiyah.`,
    `[Soal 5 - PG - Tipe: Reguler]
An-Nas artinya...
A) Malaikat.
B) Manusia.
C) Setan.
D) Hujan.`,
    `[Soal 6 - PG - Tipe: Reguler]
Malikinnas artinya...
A) Raja manusia.
B) Huruf Nun di awal.
C) Huruf Mim di akhir.
D) Payung hujan.`,
    `[Soal 7 - PG - Tipe: Reguler]
Bentuk ﻧ adalah...
A) Mim akhir.
B) Alif tengah.
C) Huruf Nun di posisi awal kata.
D) Huruf Ra.`,
    `[Soal 8 - PG - Tipe: Reguler]
Bentuk ﻢ adalah...
A) Nun awal.
B) Huruf Mim di posisi akhir kata.
C) Huruf Ba depan.
D) Huruf Ta tengah.`,
    `[Soal 9 - PG - Tipe: HOTS]
Kita dianjurkan membaca Surah an-Nas saat hendak membaca Al-Qur'an atau saat takut di malam hari karena...
A) Surah ini adalah tameng memohon perlindungan kepada Allah dari bisikan setan.
B) Supaya cepat tidur tanpa doa.
C) Supaya bisa berhitung.
D) Supaya huruf Alif mau menggandeng ke kiri.`,
    `[Soal 10 - PG - Tipe: Reguler]
Enam huruf yang hanya mau digandeng dari kanan adalah...
A) Ba, Ta, Tsa, Nun, Ya, Mim.
B) Alif, Dal, Dzal, Ra, Zai, dan Wau.
C) Ha, Kha, Jim, Sin, Syin, Sad.
D) Qaf, Kaf, Lam, Mim, Nun, Ha.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Tameng Iman Surah an-Nas",
      pengantar:
        "Infografis: An-Nas artinya manusia. Setan membisikkan Khannas. Allah adalah Malik dan Ilah kita. Bacaan ini menjadi payung dari hujan godaan.",
      labelDaftar: "Peta perlindungan Surah an-Nas",
      kolom: 1,
      item: [
        {
          nama: "Arti nama",
          singkat: "Manusia, surah ke-114, 6 ayat",
          uraian:
            "An-Nas artinya manusia. Ini surah terakhir dalam mushaf, enam ayat pendek yang mudah dihafal anak kelas 2. Isinya doa agar seluruh manusia dilindungi Allah.",
          contoh: "An-Nas = manusia.",
        },
        {
          nama: "Peta perlindungan",
          singkat: "Bisikan Khannas",
          uraian:
            "Setan tidak kelihatan, tetapi bisikannya terasa: malas belajar, malas salat, berbohong, atau mengejek teman. Itu tanda dada sedang digoda.",
          contoh: "Malas dan bohong = bisikan buruk.",
        },
        {
          nama: "Benteng gaib",
          singkat: "Malik dan Ilah",
          uraian:
            "Allah adalah Malik, Raja manusia, dan Ilah, Tuhan yang kita sembah. Setiap takut atau mulai malas, bacalah Surah an-Nas sebagai tameng.",
          contoh: "Takut atau malas? Baca an-Nas.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Jika setan tidak bisa dilihat, bagaimana kita tahu ia sedang menggoda? Sebutkan contoh bisikan setan di sekolah.",
          alias: ["malas", "bohong", "berbohong", "ejek", "mengejek", "nakal", "tidak mau belajar"],
        },
      ],
      kuisTulis: {
        pertanyaan: "Tuliskan arti dari kata An-Nas pada kotak di bawah ini!",
        alias: ["manusia"],
      },
      voice: [
        [
          "Halo anak-anak hebat yang disayangi Allah! Coba bayangkan jika kita sedang berjalan di luar rumah lalu tiba-tiba turun hujan deras. Apa yang kita cari? Pasti payung atau tempat berteduh, kan?",
          "Nah, di dalam hidup ini, ada godaan tak terlihat bernama setan yang suka membisikkan hal buruk ke dalam dada manusia, seperti mengajak kita malas salat atau malas membantu ibu.",
          "Supaya kita aman dari hujan godaan itu, Allah yang Maha Penyayang memberikan kita hadiah berupa Surah an-Nas. Surah ini adalah tameng pelindung kita. Allah adalah Raja dan Tuhan yang menguasai seluruh manusia.",
          "Jadi, setiap kali anak-anak merasa takut atau mulai malas, yuk langsung baca Surah an-Nas!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Kreasi Huruf Hijaiyah Bersambung",
      pengantar:
        "Infografis: huruf di depan memotong ekor, di tengah membuka dua tangan, di akhir kembali utuh. Enam huruf pemalu hanya mau digandeng dari kanan.",
      labelDaftar: "Bentuk awal, tengah, akhir, dan aturan khusus",
      kolom: 1,
      item: [
        {
          nama: "Bentuk awal",
          singkat: "Ekor dipotong",
          arab: "بـ تـ",
          uraian:
            "Huruf di depan kata biasanya merampingkan ekornya supaya bisa menggandeng ke kiri. Ba dan Ta di depan kehilangan ekor gantungnya.",
          contoh: "Di depan: potong ekor.",
        },
        {
          nama: "Bentuk tengah dan akhir",
          singkat: "Dua tangan, lalu utuh",
          arab: "ـبـ ـب",
          uraian:
            "Di tengah, huruf membuka tangan ke kanan dan kiri. Di akhir, wajahnya kembali utuh seperti bentuk asli.",
          contoh: "Tengah: dua tangan. Akhir: utuh.",
        },
        {
          nama: "Enam huruf pemalu",
          singkat: "Hanya dari kanan",
          arab: "ا د ذ ر ز و",
          uraian:
            "Alif, Dal, Dzal, Ra, Zai, dan Wau mau digandeng dari kanan, tetapi tidak mau menggandeng ke kiri. Mereka seperti anak yang hanya mau dipegang tangan kanannya.",
          contoh: "Alif, Dal, Dzal, Ra, Zai, Wau.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Perhatikan huruf Ba dan Ta. Kalau mereka di posisi paling depan sebuah kata, bagian tubuh mana yang harus kita hapus?",
          alias: ["ekor", "potong", "hapus", "ramping", "belakang"],
        },
      ],
      kuisTulis: {
        pertanyaan: "Sambungkan huruf terpisah berikut ini menjadi satu kata yang benar: ب - ک - م →",
        alias: ["بكم", "bikum", "bakam", "bkm"],
      },
      voice: [
        [
          "Anak-anak kelas 2 yang pintar, tahukah kalian kalau huruf-huruf hijaiyah di dalam Al-Qur'an itu suka bergotong royong? Seperti kita yang bergandengan tangan saat bermain, huruf hijaiyah juga merangkai diri mereka agar bisa dibaca menjadi kata yang indah.",
          "Uniknya, wajah huruf itu bisa berubah! Kalau di depan, ekornya dipotong agar ramping. Kalau di tengah, mereka membuka dua tangan ke kanan dan kiri.",
          "Tapi ingat, ada enam huruf yang sedikit pemalu, mereka tidak mau menggandeng huruf di sebelah kirinya. Huruf apa saja itu? Benar! Alif, Dal, Dzal, Ra, Zai, dan Wau. Yuk, kita latihan menggandeng mereka!",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih tujuan Surah an-Nas dan aturan huruf pemalu, tentukan benar-salah, jodohkan Malikinnas dengan artinya, lalu jelaskan mengapa an-Nas dibaca saat takut.",
      labelDaftar: "Pilihan, benar-salah, mencocokkan, dan esai",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A dan B",
          singkat: "Tameng dan huruf pemalu",
          uraian:
            "An-Nas: doa perlindungan dari bisikan setan. Ra, Zai, Wau hanya disambung dari kanan. Bohong dan ejekan adalah bisikan setan, benar. Alif tidak membuka tangan kiri, salah.",
          contoh: "Tameng. Hanya dari kanan. Alif tidak ke kiri.",
        },
        {
          nama: "Kelompok C dan D",
          singkat: "Jodoh dan alasan",
          uraian:
            "Malikinnas: Raja manusia. ﻧ : Nun awal. ﻢ : Mim akhir. Kita baca an-Nas saat takut atau hendak tilawah karena Allah pelindung dari setan.",
          contoh: "Raja manusia. Nun awal. Mim akhir. Tameng.",
        },
      ],
      kuis: [
        { pertanyaan: "Tujuan an-Nas?", alias: ["lindung", "setan", "doa"] },
        { pertanyaan: "Ra Zai Wau disambung dari?", alias: ["kanan"] },
        { pertanyaan: "Bohong termasuk bisikan setan?", alias: ["benar"] },
        { pertanyaan: "Alif mau menggandeng ke kiri?", alias: ["salah", "tidak"] },
        { pertanyaan: "Malikinnas artinya?", alias: ["raja"] },
        { pertanyaan: "Mengapa baca an-Nas saat takut?", alias: ["lindung", "tameng", "setan"] },
      ],
      voice: [
        [
          "Surah an-Nas tameng dari bisikan setan. Enam huruf pemalu hanya mau digandeng dari kanan.",
        ],
        [
          "Malikinnas artinya Raja manusia. Saat takut di malam hari, bacalah an-Nas memohon perlindungan Allah.",
        ],
      ],
    },
  ],
};
