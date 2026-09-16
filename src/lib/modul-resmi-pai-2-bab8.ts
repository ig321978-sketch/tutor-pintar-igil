import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_PAI2_BAB8 = "Bab 8: Aku Senang Hidup Bersih, Rapi, dan Teratur";

export const MODUL_PAI2_BAB8: ModulResmiPai = {
  id: "pai-2-bab8",
  judul: JUDUL_PAI2_BAB8,
  pola: /hidup bersih|rapi, dan teratur|rapi dan teratur|senang bisa berakhlak|akhlak higienis|bersih pangkal iman/,
  motivasi:
    "Kebersihan sebagian dari iman. Jaga badan, pakaian, dan tempat. Hidup rapi dan teratur membuat pikiran tenang, mandiri, dan disayang orang tua.",
  kunciJawaban: "B,B,B,B,B,A,C,B,A,B",
  sketsaKartu: [
    "Anak mandi, gosok gigi, dan membuang sampah pada tempatnya.",
    "Meja rapi, sepatu berjajar, bangun subuh, tidur tidak larut.",
    "Anak mengelompokkan perilaku bersih versus berantakan.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Rasulullah SAW bersabda bahwa kebersihan adalah sebagian dari iman. Salah satu contoh perbuatan menjaga kebersihan pakaian yang tepat adalah...
A) Membiarkan baju seragam yang basah oleh keringat dipakai tidur.
B) Segera mencuci baju yang kotor menggunakan sabun dan menggantinya dengan pakaian yang bersih dan suci.
C) Menyemprotkan banyak parfum pada pakaian yang penuh lumpur agar tidak bau.
D) Menyimpan baju kotor di bawah bantal.`,
    `[Soal 2 - PG - Tipe: HOTS]
Manfaat utama yang dirasakan oleh seorang murid yang selalu menjaga kerapian meja belajarnya di kelas adalah...
A) Meja menjadi tempat bersembunyi yang aman.
B) Suasana belajar menjadi sangat nyaman dan mudah menemukan alat tulis yang dibutuhkan tanpa panik.
C) Guru akan memberikan nilai matematika seratus secara gratis.
D) Teman boleh menumpuk sampah di mejanya.`,
    `[Soal 3 - PG - Tipe: HOTS]
Membuang kulit pisang di laci meja kelas termasuk...
A) Bersih dan rapi.
B) Tercela atau berantakan.
C) Amal salih.
D) Adab berdoa.`,
    `[Soal 4 - PG - Tipe: HOTS]
Menyusun sepatu di rak dengan teratur termasuk...
A) Tercela.
B) Bersih dan rapi.
C) Membuang waktu.
D) Tidak penting.`,
    `[Soal 5 - PG - Tipe: Reguler]
Menggosok gigi sebelum tidur malam termasuk...
A) Tercela.
B) Bersih dan rapi.
C) Hanya untuk dokter.
D) Boleh ditunda seminggu.`,
    `[Soal 6 - PG - Tipe: Reguler]
Kebersihan adalah sebagian dari...
A) Iman.
B) Permainan.
C) Hukuman.
D) Harta.`,
    `[Soal 7 - PG - Tipe: Reguler]
Meletakkan sepatu di rak sepatu dengan berjajar rapi merupakan contoh hidup...
A) Boros.
B) Malas.
C) Rapi dan teratur.
D) Sombong.`,
    `[Soal 8 - PG - Tipe: Reguler]
Kuku panjang dan hitam di sela-selanya harus dipotong karena...
A) Supaya lebih panjang.
B) Menjaga kebersihan dan mencegah kotoran serta kuman.
C) Supaya sulit wudu.
D) Hanya untuk orang dewasa.`,
    `[Soal 9 - PG - Tipe: HOTS]
Tidur tepat waktu dan mengulang pelajaran membantu prestasi karena...
A) Otak istirahat, jadwal teratur, ilmu menempel, tidak panik saat ujian.
B) Guru memberi nilai gratis.
C) Meja menjadi tempat sembunyi.
D) Parfum menghapus lumpur.`,
    `[Soal 10 - PG - Tipe: Reguler]
Setelah bangun tidur, sebaiknya kita...
A) Membiarkan selimut berserakan seharian.
B) Merapikan tempat tidur lalu mandi dan salat.
C) Mencari sepatu sampai gerbang ditutup.
D) Membuang kulit pisang ke laci.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Indahnya Hidup Bersih Kesukaan Allah",
      pengantar:
        "Infografis bersih pangkal iman: badan, pakaian, dan tempat. Hadis: kebersihan sebagian dari iman. Allah Maha Indah dan mencintai hamba yang menjaga kebersihan.",
      labelDaftar: "Bersih badan, pakaian, dan tempat",
      kolom: 1,
      item: [
        {
          nama: "Bersih badan",
          singkat: "Mandi, gigi, kuku Jumat",
          uraian:
            "Mandi dua kali sehari, gosok gigi agar tidak berlubang, dan potong kuku setiap Jumat. Kuku panjang menampung kotoran hitam dan kuman.",
          contoh: "Mandi, gosok gigi, potong kuku.",
        },
        {
          nama: "Bersih pakaian",
          singkat: "Suci, bebas najis",
          uraian:
            "Pakaian salat dan seragam harus suci, bebas najis dan kotoran. Cuci dengan sabun, jangan hanya semprot parfum pada lumpur.",
          contoh: "Cuci, ganti, suci.",
        },
        {
          nama: "Bersih tempat",
          singkat: "Sampah pada tempatnya",
          uraian:
            "Buang sampah di tempat sampah, sapu debu, rawat kamar. Kamar bersih membuat malaikat senang berkunjung dan mendoakan kita.",
          contoh: "Sampah ke tong, kamar disapu.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Mengapa kuku tangan yang panjang dan hitam di sela-selanya harus segera dipotong menurut ajaran kebersihan Islam?",
          alias: ["kotor", "kuman", "najis", "kuman", "bersih", "iman", "wudu", "penyakit"],
        },
      ],
      kuisTulis: {
        pertanyaan: "Kebersihan adalah sebagian dari ........................",
        alias: ["iman", "keimanan", "iman kita"],
      },
      voice: [
        [
          "Anak-anak kelas 2 yang wangi dan rapi, tahukah kalian kalau kebersihan itu mencerminkan isi hati kita? Islam adalah agama yang sangat indah dan bersih. Allah SWT sangat mencintai anak-anak yang pandai merawat kebersihan dirinya.",
          "Bersih itu artinya bebas dari kotoran dan najis. Caranya mudah: mandi secara teratur, menggosok gigi agar tidak berlubang, dan memotong kuku yang panjang setiap hari Jumat.",
          "Selain badan, pakaian kita untuk salat dan tempat belajar kita juga harus disapu dan dibersihkan dari debu. Kamar yang bersih akan membuat malaikat senang berkunjung dan mendoakan kita!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Hidup Rapi dan Teratur, Kedisiplinan",
      pengantar:
        "Infografis roda hidup anak teratur: rapi di meja, teratur waktu, akibat baik pikiran tenang. Merapikan mainan setelah dipakai adalah tanda mandiri dan bertanggung jawab.",
      labelDaftar: "Rapi, teratur, dan akibat baik",
      kolom: 1,
      item: [
        {
          nama: "Rapi di meja",
          singkat: "Buku dan alat pada tempatnya",
          uraian:
            "Susun buku sesuai jadwal, simpan alat tulis rapi. Setelah membaca, kembalikan buku ke rak. Hidup rapi artinya meletakkan segala sesuatu pada tempatnya.",
          contoh: "Buku ke rak. Pensil ke kotak.",
        },
        {
          nama: "Teratur waktu",
          singkat: "Subuh, makan, tidur",
          uraian:
            "Bangun subuh, makan teratur, tidur tidak larut malam. Waktu salat tepat waktu. Anak teratur punya pikiran tenang dan tidak panik mencari barang hilang.",
          contoh: "Jadwal: salat, makan, tidur.",
        },
        {
          nama: "Karakter utama",
          singkat: "Mandiri dan tanggung jawab",
          uraian:
            "Setelah bangun, rapikan tempat tidur. Setelah bermain, masukkan lego dan boneka ke kotak. Itu tanda anak mandiri yang bertanggung jawab pada rumahnya.",
          contoh: "Mainan selesai, rapikan.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Apa yang sebaiknya kamu lakukan pada kamarmu segera setelah kamu bangun tidur di pagi hari?",
          alias: ["rapi", "selimut", "tidur", "bantal", "sapu", "mandi", "salat", "merapikan"],
        },
      ],
      kuisTulis: {
        pertanyaan:
          "Meletakkan sepatu di rak sepatu dengan berjajar rapi merupakan contoh hidup ........................",
        alias: ["rapi", "teratur", "rapi dan teratur", "rapih"],
      },
      voice: [
        [
          "Anak-anak yang hebat, pernahkah kalian panik mencari buku tugas atau kaos kaki yang hilang saat gerbang sekolah sebentar lagi ditutup? Wah, rasanya tidak enak dan menegangkan, ya. Hal itu terjadi karena kita tidak membiasakan hidup rapi dan teratur.",
          "Hidup rapi artinya meletakkan segala sesuatu pada tempatnya yang benar. Setelah membaca, kembalikan buku ke rak. Setelah bermain, rapikan lego dan boneka ke dalam kotaknya.",
          "Hidup teratur juga berarti kita disiplin mengatur waktu: waktu salat tepat waktu, waktu makan, dan waktu tidur. Anak yang hidupnya teratur akan memiliki pikiran yang tenang, disayang orang tua, dan menjadi anak yang sukses!",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih cara mencuci baju dan manfaat meja rapi, kelompokkan tindakan bersih versus berantakan, lalu jelaskan mengapa hidup teratur membantu prestasi.",
      labelDaftar: "Pilihan, mengelompokkan, dan esai",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Pakaian dan meja",
          uraian:
            "Cuci baju kotor dengan sabun, ganti yang suci. Jangan hanya parfum pada lumpur. Meja rapi: nyaman belajar, alat tulis mudah ketemu, tidak panik.",
          contoh: "Cuci sabun. Meja nyaman.",
        },
        {
          nama: "Kelompok B dan C",
          singkat: "Centang dan prestasi",
          uraian:
            "Kulit pisang di laci: tercela. Sepatu di rak: bersih dan rapi. Gosok gigi malam: bersih dan rapi. Tidur tepat waktu plus mengulang pelajaran = disiplin, otak segar, prestasi naik.",
          contoh: "Laci tercela. Rak rapi. Gigi bersih. Disiplin.",
        },
      ],
      kuis: [
        { pertanyaan: "Cara jaga pakaian?", alias: ["cuci", "sabun", "suci"] },
        { pertanyaan: "Manfaat meja rapi?", alias: ["nyaman", "mudah", "tidak panik"] },
        { pertanyaan: "Kulit pisang di laci?", alias: ["tercela", "berantakan"] },
        { pertanyaan: "Sepatu di rak?", alias: ["bersih", "rapi"] },
        { pertanyaan: "Gosok gigi malam?", alias: ["bersih", "rapi"] },
        { pertanyaan: "Mengapa teratur bantu prestasi?", alias: ["disiplin", "tidur", "belajar"] },
      ],
      voice: [
        [
          "Kebersihan sebagian dari iman. Cuci baju, jangan hanya parfum. Meja rapi membuat belajar nyaman.",
        ],
        [
          "Kulit pisang di laci itu berantakan. Sepatu di rak dan gosok gigi malam itu bersih. Hidup teratur membantu prestasi.",
        ],
      ],
    },
  ],
};
