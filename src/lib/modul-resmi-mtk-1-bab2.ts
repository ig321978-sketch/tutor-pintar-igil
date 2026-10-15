import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { MISI_MTK1_BAB2, kuisDariMisi } from "@/lib/misi-kebun-mtk-1";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK1_BAB2 = "Bab 2: Penjumlahan sampai dengan 10";
export const JUDUL_MTK1_BAB2_LAMA = "Bab 2: Penjumlahan sampai 10";

export const MODUL_MTK1_BAB2: ModulResmiPai = {
  id: "mtk-1-bab2",
  judul: JUDUL_MTK1_BAB2,
  pola: /penjumlahan\s+sampai(\s+dengan)?\s+10\b|piknik seru di pantai|kapal pengumpul harta|misi piknik di pantai/,
  motivasi:
    "Hore! Kamu piknik di pantai bersama Rara, Bimo, Bimo, dan Igil. Gabungkan benda, tulis tanda tambah, lalu hitung sampai 10.",
  kunciJawaban: "A,B,C,B,B,B,B,B,B,B",
  sketsaKartu: [
    "Rara, Bimo, dan Igil piknik di pantai, menggabungkan kerang dan bendera istana pasir bersama Igil.",
    "Tujuh cara menjumlah: gabungkan, hitung semua, lompat kanguru, jari, dibalik tetap sama, teman sepuluh, dan soal cerita.",
    "Igil menemani sepuluh pos piknik di pantai: menghitung, membaca, menulis, dan membandingkan.",
    "Poin penting dan lembar evaluasi penjumlahan sampai 10.",
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
      judul: "A. Piknik Seru di Pantai",
      pengantar:
        "Rara, Bimo, dan Igil tiba di pantai bersama Igil. Mereka menggabungkan kerang dan bendera, lalu mengenal tanda + dan =.",
      labelDaftar: "Menggabungkan kerang dan bendera di pantai",
      kolom: 1,
      item: [
        {
          nama: "Menggabungkan kerang",
          singkat: "3 kerang ditambah 2 kerang",
          uraian:
            "Ember Rara berisi 3 kerang. Ember Bimo berisi 2 kerang. Keduanya dituang ke satu ember dan dihitung satu, dua, tiga, empat, lima. 3 ditambah 2 sama dengan 5.",
          contoh: "3 + 2 = 5",
        },
        {
          nama: "Tanda tambah dan sama dengan",
          singkat: "Plus artinya digabung",
          uraian:
            "Tanda tambah artinya digabung. Tanda sama dengan artinya hasilnya.",
          contoh: "4 + 3 = 7",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Ada 2 kepiting, lalu datang 4 kepiting lagi. Jadi berapa semuanya?",
          alias: ["6", "enam"],
        },
        {
          pertanyaan: "Rara, Bimo, dan Igil tiba di pantai. Ada berapa teman?",
          alias: ["3", "tiga"],
        },
        {
          pertanyaan: "Tuliskan angka banyak teman itu.",
          alias: ["3", "tiga"],
        },
        {
          pertanyaan: "Rara punya 3 kerang. Bimo punya 2 kerang. Semuanya berapa?",
          alias: ["5", "lima"],
        },
        {
          pertanyaan: "Tuliskan 3 + 2 = 5.",
          alias: ["3 + 2 = 5", "3+2=5"],
        },
        {
          pertanyaan: "Tanda tambah artinya apa?",
          alias: ["digabung", "menggabungkan", "tambah"],
        },
        {
          pertanyaan: "Tuliskan 2 + 1 = 3.",
          alias: ["2 + 1 = 3", "2+1=3"],
        },
        {
          pertanyaan: "Istana pasir punya 4 bendera, lalu ditambah 3. Berapa semuanya?",
          alias: ["7", "tujuh"],
        },
        {
          pertanyaan: "Tuliskan 4 + 3 = 7.",
          alias: ["4 + 3 = 7", "4+3=7"],
        },
      ],
      voice: [
        [
          "Rara, Bimo, dan Igil tiba di pantai. Ombak biru, pasir kuning, dan payung merah putih.",
          "Rara punya 3 kerang. Bimo punya 2 kerang. Digabung menjadi 5 kerang. Tiga tambah dua sama dengan lima.",
          "Tanda tambah artinya digabung. Tanda sama dengan artinya hasilnya.",
          "Istana pasir punya 4 bendera. Bimo menambah 3 bendera. Empat tambah tiga sama dengan tujuh.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Ayo Menjumlahkan!",
      pengantar:
        "Menjumlahkan artinya menggabungkan. Hitung semua, hitung lanjut, pakai jari, lalu cari teman sepuluh.",
      labelDaftar: "Cara menjumlah sampai 10",
      kolom: 1,
      item: [
        {
          nama: "Hitung semua",
          singkat: "4 bintang ditambah 2 bintang",
          uraian:
            "Gabungkan semua benda, lalu hitung dari satu. Empat tambah dua sama dengan enam.",
          contoh: "4 + 2 = 6",
        },
        {
          nama: "Hitung lanjut",
          singkat: "5 ditambah 3",
          uraian:
            "Simpan angka yang lebih besar, lalu lompat sebanyak angka yang kecil. Lima, lalu enam, tujuh, delapan.",
          contoh: "5 + 3 = 8",
        },
        {
          nama: "Teman sepuluh",
          singkat: "7 dan 3",
          uraian:
            "1 dengan 9, 2 dengan 8, 3 dengan 7, 4 dengan 6, dan 5 dengan 5. Semuanya berjumlah 10.",
          contoh: "7 + 3 = 10",
        },
      ],
      kuis: [
        {
          pertanyaan: "Cocokkan gambar ikan, es krim, dan lebah dengan kalimat matematikanya.",
          alias: ["2 + 5 = 7", "3 + 3 = 6", "1 + 8 = 9"],
        },
        {
          pertanyaan: "Susun balok menjadi 4 tambah 3 sama dengan 7, atau 3 tambah 4 sama dengan 7.",
          alias: ["4 + 3 = 7", "3 + 4 = 7"],
        },
        {
          pertanyaan: "Kartu yang hasilnya berbeda adalah 4 tambah 5.",
          alias: ["c", "4 + 5", "sembilan"],
        },
        {
          pertanyaan: "Teman sepuluh dari angka 7 adalah berapa?",
          alias: ["3", "tiga"],
        },
      ],
      voice: [
        [
          "Menjumlahkan artinya menggabungkan dua kelompok menjadi satu.",
          "Cara hitung semua: gabungkan, lalu hitung satu per satu. Angka terakhir adalah hasilnya.",
          "Cara hitung lanjut: simpan angka besar, lalu lompat sebanyak angka kecil.",
          "Dibalik, hasilnya tetap sama. Tiga tambah satu sama dengan satu tambah tiga.",
          "Teman sepuluh: tujuh tambah tiga sama dengan sepuluh.",
        ],
      ],
    },
        {
      kode: "C",
      judul: "C. Misi Piknik di Pantai",
      pengantar:
        "Bantu Igil mengisi 10 pos piknik di pantai. Hijau untuk menghitung, biru untuk membaca, kuning untuk menulis, dan ungu untuk membandingkan.",
      labelDaftar: "Sepuluh pos tambah di pantai",
      kolom: 1,
      item: [
        {
          nama: "Alur permainan",
          singkat: "Pilih pos, jawab, dapat bintang",
          uraian:
            "Siswa memilih satu pos pantai. Igil membacakan misi penjumlahan. Jawaban benar mendapat 1 bintang pantai. Jawaban yang belum tepat mendapat petunjuk, tanpa kehilangan kerang. Setelah 10 pos selesai, istana pasir Igil selesai.",
          contoh: "4 + 3 = 7. Angka hilang pada 4 + kotak = 10 adalah 6. 5 + 3 bukan 7.",
        },
        {
          nama: "Kerang ajaib",
          singkat: "3, 2, atau 1 kerang",
          uraian:
            "Jawaban pertama benar mendapat 3 kerang ajaib. Benar setelah satu petunjuk mendapat 2 kerang. Benar setelah dua petunjuk mendapat 1 kerang. Belum tepat tidak mengurangi kerang. Siswa boleh mencoba lagi.",
          contoh: "Petunjuk: benda bergoyang, lalu muncul titik, lalu Igil menghitung bersama.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK1_BAB2),
      voice: [
        [
          "Igil menemani piknik di pantai. Ada sepuluh pos dari payung sampai istana pasir.",
          "Pos hijau untuk menghitung. Pos biru untuk membaca. Pos kuning untuk menulis. Pos ungu untuk membandingkan.",
          "Empat tambah tiga sama dengan tujuh. Tambah nol, angkanya tetap. Angka yang hilang supaya empat tambah kotak sama dengan sepuluh adalah enam.",
          "Lima tambah tiga sama dengan delapan, bukan tujuh. Satu tambah sembilan sama dengan sembilan tambah satu.",
          "Jawaban benar mendapat satu bintang pantai. Jika belum tepat, Igil memberi petunjuk. Kerang tidak berkurang.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar:
        "Tambah artinya gabung. Sama dengan artinya hasilnya. Selesaikan sepuluh misi penjumlahan.",
      labelDaftar: "Evaluasi penjumlahan sampai 10",
      kolom: 1,
      item: [
        {
          nama: "Kalimat kunci",
          singkat: "Tambah artinya gabung",
          uraian:
            "Tambah artinya gabung. Sama dengan artinya hasilnya. Simpan yang besar, lompat yang kecil. Dibalik tetap sama. Tambah nol, angkanya tetap. Cari angka, cari kata kunci, lalu hitung.",
          contoh: "5 + 0 = 5",
        },
      ],
      kuis: [
        {
          pertanyaan: "Tiga kue ditambah empat kue. Berapa jumlah semuanya?",
          alias: ["7", "tujuh"],
        },
        {
          pertanyaan: "Dua kupu-kupu ditambah tiga kupu-kupu. Semuanya berapa?",
          alias: ["2 + 3 = 5", "2+3=5"],
        },
        {
          pertanyaan: "Empat ditambah berapa sama dengan sembilan?",
          alias: ["5", "lima"],
        },
        {
          pertanyaan: "Bimo berkata 6 tambah 3 sama dengan 8. Apakah Bimo benar?",
          alias: ["salah", "9", "sembilan"],
        },
        {
          pertanyaan: "Mana pasangan yang keduanya hasilnya 8?",
          alias: ["4 + 4 = 8", "5 + 3 = 8", "6 + 2 = 8"],
        },
        {
          pertanyaan: "Timbangan 3 tambah 4 seimbang dengan kartu yang mana?",
          alias: ["b", "5 + 2", "7"],
        },
        {
          pertanyaan: "Ibu membeli 5 tomat dan 5 wortel. Berapa sayur semuanya?",
          alias: ["10", "sepuluh", "5 + 5 = 10"],
        },
        {
          pertanyaan: "Pasangkan kartu yang hasilnya sama.",
          alias: ["2 + 7", "4 + 5", "1 + 5", "6 + 0"],
        },
        {
          pertanyaan: "Bus berisi 10 kursi dan sudah ada 6 anak. Berapa anak lagi supaya penuh?",
          alias: ["4", "empat"],
        },
        {
          pertanyaan: "Buat cerita dari 3 anak ayam ditambah 5 anak ayam, lalu sebutkan hasilnya.",
          alias: ["8", "delapan", "3", "5"],
        },
      ],
      voice: [
        [
          "Tambah artinya gabung. Sama dengan artinya hasilnya.",
          "Simpan angka yang besar, lalu lompat sebanyak angka yang kecil.",
          "Tiga tambah dua sama dengan dua tambah tiga.",
          "Lima ditambah nol tetap lima.",
          "Pada soal cerita, cari angkanya, cari kata kuncinya, lalu hitung.",
        ],
      ],
    },
  ],
};
