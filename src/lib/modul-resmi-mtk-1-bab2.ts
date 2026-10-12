import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK1_BAB2 = "Bab 2: Penjumlahan sampai dengan 10";
export const JUDUL_MTK1_BAB2_LAMA = "Bab 2: Penjumlahan sampai 10";

export const MODUL_MTK1_BAB2: ModulResmiPai = {
  id: "mtk-1-bab2",
  judul: JUDUL_MTK1_BAB2,
  pola: /penjumlahan\s+sampai(\s+dengan)?\s+10\b/,
  motivasi:
    "Hore! Kamu sudah menjumlah sampai 10 bersama Ciko dan Cika. Gabungkan benda, hitung maju, lalu cari pasangan angkanya.",
  kunciJawaban: "A,B,C,B,B,B,B,B,B,B",
  sketsaKartu: [
    "Ciko mengumpulkan 4 apel merah dan Cika mengumpulkan 3 apel hijau ke dalam keranjang.",
    "Tiga cara menjumlah: hitung semua, hitung maju, dan pasangan bilangan sampai 10.",
    "Katak Ciko melompat maju di atas kertas angka 1 sampai 10.",
    "Anak menyelesaikan misi penjumlahan sampai 10.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Di tempat parkir ada 3 mobil merah. Datang lagi beberapa mobil hitam hingga totalnya menjadi 5 mobil. Kalimat matematika yang benar adalah...
A) 3 + 2 = 5
B) 5 + 3 = 8
C) 3 + 5 = 8
D) 2 + 2 = 4`,
    `[Soal 2 - PG - Tipe: HOTS]
Timbangan seimbang dengan angka 9. Di sisi kiri ada angka 5 dan sebuah kotak misteri. Angka di dalam kotak misteri adalah...
A) 3
B) 4
C) 5
D) 9`,
    `[Soal 3 - PG - Tipe: HOTS]
Stoples muat tepat 10 permen. Pilihan mana yang tidak mungkin dipilih Boni?
A) 5 jeruk dan 5 apel
B) 6 jeruk dan 4 apel
C) 7 jeruk dan 4 apel
D) 8 jeruk dan 2 apel`,
    `[Soal 4 - PG - Tipe: HOTS]
Ada 4 bebek di kolam dan 3 bebek di rumput yang ikut mencebur. Total bebek di kolam adalah...
A) 4
B) 7
C) 3
D) 8`,
    `[Soal 5 - PG - Tipe: HOTS]
2 sepeda masing-masing 2 roda dan 1 becak dengan 3 roda. Jumlah semua roda adalah...
A) 4
B) 7
C) 5
D) 9`,
    `[Soal 6 - PG - Tipe: HOTS]
Pion di angka 4. Dadu pertama 3, dadu kedua 2. Pion sekarang berada di...
A) Angka 7
B) Angka 9
C) Angka 8
D) Angka 6`,
    `[Soal 7 - PG - Tipe: HOTS]
Sayap kiri punya 5 bintik dan sayap kanan punya 5 bintik. Total bintik kupu-kupu adalah...
A) 5
B) 10
C) 8
D) 15`,
    `[Soal 8 - PG - Tipe: HOTS]
Ibu membuat 6 potong roti isi. Ayah memakan 0 potong. Roti yang tersisa adalah...
A) 0 potong
B) 6 potong
C) 7 potong
D) 5 potong`,
    `[Soal 9 - PG - Tipe: HOTS]
Grafik mainan Ciko setinggi 4 kotak dan mainan Cika setinggi 5 kotak. Jika ditumpuk, tinggi menaranya...
A) 4 kotak
B) 9 kotak
C) 5 kotak
D) 1 kotak`,
    `[Soal 10 - PG - Tipe: HOTS]
Sebuah angka ditambah 3 hasilnya 10. Angka itu adalah...
A) 3
B) 7
C) 10
D) 13`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Petualangan Ciko dan Cika di Taman Buah",
      pengantar:
        "Ciko menemukan 4 apel merah. Cika menemukan 3 apel hijau. Keduanya digabung ke dalam keranjang.",
      labelDaftar: "Menggabungkan dua kelompok benda",
      kolom: 1,
      item: [
        {
          nama: "Naskah taman buah",
          singkat: "4 apel merah dan 3 apel hijau",
          uraian:
            "Ciko menemukan 4 apel merah di bawah pohon. Cika menemukan 3 apel hijau di dekat semak. Jika digabungkan, jumlah apel menjadi lebih banyak. 4 ditambah 3 sama dengan 7.",
          contoh: "4 + 3 = 7",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Halo Sahabat IGIL! Tadi Ciko punya 4 apel merah dan Cika punya 3 apel hijau. Jika digabungkan, sebutkan kata ajaib yang artinya membuat benda menjadi lebih banyak. Pilihannya penjumlahan atau pengurangan.",
          alias: ["penjumlahan", "tambah", "plus"],
        },
        {
          pertanyaan:
            "Hitung keras-keras, berapa total seluruh apel yang ada di dalam keranjang Ciko dan Cika?",
          alias: ["7", "tujuh"],
        },
      ],
      voice: [
        [
          "Ciko berkata: Cika! Lihat, aku menemukan 4 buah apel merah yang jatuh di bawah pohon!",
          "Cika berkata: Wah, asyik! Aku juga menemukan 3 buah apel hijau di dekat semak-semak!",
          "Ciko berkata: Kalau kita kumpulkan semua ke dalam keranjang, sekarang jumlah apel kita jadi bertambah banyak!",
          "Cika berkata: Benar! Mari kita hitung semuanya bersama-sama!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Cara Kilat Menjumlah sampai 10",
      pengantar:
        "Ada tiga cara mudah: hitung semua, hitung maju, dan pasangan bilangan.",
      labelDaftar: "Hitung semua, hitung maju, pasangan 10",
      kolom: 1,
      item: [
        {
          nama: "Hitung semua",
          singkat: "4 jeruk ditambah 2 jeruk",
          uraian:
            "Gabungkan dua kelompok lalu hitung dari angka 1. Contoh: 4 jeruk digabung 2 jeruk. Hitung 1, 2, 3, 4, 5, 6. Totalnya 6.",
          contoh: "4 + 2 = 6",
        },
        {
          nama: "Menghitung maju",
          singkat: "5 ditambah 3",
          uraian:
            "Simpan angka yang besar di dalam hati, lalu hitung maju sebanyak angka yang kecil. Contoh: 5 ditambah 3. Ingat 5, lalu hitung 6, 7, 8. Hasilnya 8.",
          contoh: "5 + 3 = 8",
        },
        {
          nama: "Pasangan bilangan",
          singkat: "6 dan 4 membentuk 10",
          uraian:
            "Dua angka kecil yang bersahabat membentuk angka 10. Contoh: 6 dan 4 berteman membentuk 10.",
          contoh: "6 + 4 = 10",
        },
      ],
      kuis: [
        {
          pertanyaan: "Angka berapa yang ditambah 7 menjadi 10? Pilihannya 2, 3, atau 4.",
          alias: ["3", "tiga"],
        },
        {
          pertanyaan: "Angka berapa yang ditambah 8 menjadi 10? Pilihannya 2, 5, atau 1.",
          alias: ["2", "dua"],
        },
        {
          pertanyaan: "Angka berapa yang ditambah 5 menjadi 10? Pilihannya 3, 4, atau 5.",
          alias: ["5", "lima"],
        },
        {
          pertanyaan:
            "Susun gerbong kereta yang melompat maju dari angka 4 sebanyak 3 langkah.",
          alias: ["5", "6", "7"],
        },
        {
          pertanyaan:
            "Kotak hantaran muat 9 donat. Kombinasi yang benar adalah 6 donat cokelat dan 3 donat stroberi.",
          alias: ["b", "6", "9"],
        },
      ],
      voice: [
        [
          "Cara pertama, hitung semua. Empat jeruk digabung dua jeruk. Hitung satu, dua, tiga, empat, lima, enam. Totalnya enam.",
          "Cara kedua, menghitung maju. Lima ditambah tiga. Ingat lima di kepala, lalu hitung enam, tujuh, delapan.",
          "Cara ketiga, pasangan bilangan. Enam dan empat berteman membentuk sepuluh.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Lompat Katak Ceria",
      pengantar:
        "Katak Ciko berdiri di batu angka 5, lalu melompat maju 4 kali dan mendarat di angka 9.",
      labelDaftar: "Melompat maju di garis angka",
      kolom: 1,
      item: [
        {
          nama: "Permainan lompat katak",
          singkat: "Dari 5 melompat 4 kali",
          uraian:
            "Tempel kertas angka 1 sampai 10 di lantai. Katak berdiri di angka 5, melihat 4 nyamuk, lalu melompat 4 kali sambil berhitung 6, 7, 8, 9. Ia mendarat di angka 9.",
          contoh: "5 + 4 = 9",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Saat bermain Lompat Katak Ceria, jika kamu berdiri di angka 3 dan harus melompat maju sebanyak 3 kali, sebutkan angka tempat kamu mendarat.",
          alias: ["6", "enam"],
        },
        {
          pertanyaan:
            "Jika kamu melompat dari angka 2 dan mendarat di angka 7, apakah jumlah lompatanmu makin banyak atau makin sedikit?",
          alias: ["makin banyak", "lebih banyak", "banyak"],
        },
      ],
      voice: [
        [
          "Katak Ciko sedang berdiri di batu angka 5.",
          "Nyam nyam! Dia melihat 4 ekor nyamuk di depannya dan ingin melompat 4 kali untuk menangkapnya.",
          "Anak melompat sambil berhitung: enam, tujuh, delapan, sembilan.",
          "Katak mendarat di angka 9.",
        ],
      ],
    },
    {
      kode: "L",
      judul: "L. Lembar Evaluasi Siswa",
      pengantar:
        "Selesaikan sepuluh misi penjumlahan sampai 10. Ada pilihan jawaban dan kotak kanvas.",
      labelDaftar: "Evaluasi penjumlahan sampai 10",
      kolom: 1,
      item: [
        {
          nama: "Misi penjumlahan",
          singkat: "Sepuluh soal",
          uraian:
            "Soal cerita mobil, timbangan, stoples permen, bebek, roda, ular tangga, sayap kupu-kupu, roti, menara mainan, dan teka-teki angka.",
          contoh: "3 + 2 = 5",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Di tempat parkir ada 3 mobil merah. Datang lagi mobil hitam hingga totalnya 5. Kalimat matematika yang benar adalah 3 ditambah 2 sama dengan 5.",
          alias: ["a", "3 + 2 = 5", "3+2=5"],
        },
        {
          pertanyaan:
            "Timbangan angka 9 seimbang. Sisi kiri ada 5 dan kotak misteri. Angka di kotak misteri adalah 4.",
          alias: ["4", "empat"],
        },
        {
          pertanyaan:
            "Stoples muat tepat 10 permen. Pilihan yang tidak mungkin adalah 7 jeruk dan 4 apel karena hasilnya 11.",
          alias: ["c", "7", "11"],
        },
        {
          pertanyaan:
            "4 bebek di air dan 3 bebek di rumput ikut masuk kolam. Totalnya 7.",
          alias: ["7", "tujuh"],
        },
        {
          pertanyaan:
            "2 sepeda masing-masing 2 roda dan 1 becak 3 roda. Jumlah roda adalah 7.",
          alias: ["7", "tujuh"],
        },
        {
          pertanyaan:
            "Pion di angka 4, dadu 3 lalu dadu 2. Pion sekarang di angka 9.",
          alias: ["b", "9", "sembilan"],
        },
        {
          pertanyaan:
            "Sayap kiri 5 bintik dan sayap kanan 5 bintik. Total bintik adalah 10.",
          alias: ["10", "sepuluh"],
        },
        {
          pertanyaan:
            "Ibu membuat 6 roti. Ayah memakan 0 roti. Yang tersisa 6 potong.",
          alias: ["b", "6", "enam"],
        },
        {
          pertanyaan:
            "Mainan Ciko 4 kotak ditumpuk dengan mainan Cika 5 kotak. Tinggi menara 9.",
          alias: ["9", "sembilan"],
        },
        {
          pertanyaan:
            "Sebuah angka ditambah 3 hasilnya 10. Angka itu adalah 7.",
          alias: ["7", "tujuh"],
        },
      ],
      voice: [
        [
          "Gunakan kanvas tulis tangan atau klik pilihan jawaban untuk menyelesaikan misi penjumlahan sampai 10.",
        ],
      ],
    },
  ],
};
