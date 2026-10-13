import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { MISI_MTK1_BAB14, kuisDariMisi } from "@/lib/misi-kebun-mtk-1";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK1_BAB14 = "Bab 14: Bangun Datar dan Bangun Ruang";

export const MODUL_MTK1_BAB14: ModulResmiPai = {
  id: "mtk-1-bab14",
  judul: JUDUL_MTK1_BAB14,
  pola: /bangun\s+datar\s+dan\s+bangun\s+ruang\b|bengkel bentuk wulan|tupai kecil tupi/,
  motivasi:
    "Karin, Bagas, dan Wulan belajar sisi, sudut, dan bangun ruang bersama tupai kecil Tupi.",
  kunciJawaban: "B,B,D,B,C,C,B,B,B,C",
  sketsaKartu: [
    "Karin, Bagas, dan Wulan menghitung sisi dan sudut bersama tupai kecil Tupi.",
    "Papan segitiga, segi empat, lingkaran, dan lima bangun ruang.",
    "Tupi merancang mainan di bengkel bentuk Wulan.",
    "Poin penting dan lembar evaluasi bangun.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: LOTS]
Persegi panjang punya berapa sisi?
A) 3
B) 4
C) 5
D) 0`,
    `[Soal 2 - PG - Tipe: LOTS]
Bangun ruang dengan 6 sisi yang sama besar adalah...
A) Balok
B) Kubus
C) Tabung
D) Bola`,
    `[Soal 3 - PG - Tipe: LOTS]
Bangun mana yang punya 0 sudut?
A) Segitiga
B) Segi empat
C) Segi lima
D) Lingkaran`,
    `[Soal 4 - PG - Tipe: HOTS]
Benda mana yang bisa diangkat, jadi termasuk bentuk ruang?
A) Gambar lingkaran di kertas
B) Dadu
C) Gambar persegi di kertas
D) Gambar segitiga di kertas`,
    `[Soal 5 - PG - Tipe: LOTS]
Kaleng susu termasuk bangun ruang...
A) Kubus
B) Balok
C) Tabung
D) Kerucut`,
    `[Soal 6 - PG - Tipe: HOTS]
Dari lingkaran, segitiga, segi empat, dan segi lima, yang paling sedikit sudutnya adalah...
A) Segi empat
B) Segitiga
C) Lingkaran
D) Segi lima`,
    `[Soal 7 - PG - Tipe: HOTS]
Satu persegi punya 4 sisi dan 4 sudut. Dua persegi punya...
A) 6 sisi dan 6 sudut
B) 8 sisi dan 8 sudut
C) 4 sisi dan 4 sudut
D) 2 sisi dan 2 sudut`,
    `[Soal 8 - PG - Tipe: LOTS]
Topi ulang tahun yang lancip termasuk...
A) Tabung
B) Kerucut
C) Bola
D) Kubus`,
    `[Soal 9 - PG - Tipe: HOTS]
Pernyataan "kubus adalah bentuk datar" adalah...
A) Benar, karena sisinya bisa dihitung
B) Salah, kubus adalah bentuk ruang
C) Benar, karena kubus pipih
D) Tidak bisa ditentukan`,
    `[Soal 10 - PG - Tipe: HOTS]
Pesanan: mainan yang bisa dipegang. Mana yang tidak cocok?
A) Kubus kayu
B) Bola kayu
C) Gambar segitiga di kertas
D) Tabung kayu`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Kamar Main Karin",
      pengantar: "Karin, Bagas, dan Wulan menghitung sisi dan sudut, lalu membedakan bentuk datar dari bentuk ruang.",
      labelDaftar: "Lima adegan bentuk",
      kolom: 1,
      item: [
        {
          nama: "Sisi",
          singkat: "Garis pembatas",
          uraian: "Persegi punya 4 sisi. Segitiga punya 3 sisi. Lingkaran melengkung, jadi sisinya tidak dihitung seperti garis lurus.",
          contoh: "Tunjuk satu sisi, hitung satu.",
        },
        {
          nama: "Sudut",
          singkat: "Dua sisi bertemu",
          uraian: "Segitiga punya 3 sudut. Persegi punya 4 sudut. Lingkaran tidak punya sudut.",
          contoh: "Sudut adalah ujung yang tajam.",
        },
        {
          nama: "Tiga bangun datar",
          singkat: "Ada di sekitar kita",
          uraian: "Rambu dan pizza berbentuk segitiga. Jendela dan buku berbentuk segi empat. Jam dan koin berbentuk lingkaran.",
          contoh: "Bentuk datar bisa digambar di kertas.",
        },
        {
          nama: "Bangun ruang",
          singkat: "Bisa dipegang",
          uraian: "Kubus, balok, tabung, kerucut, dan bola punya isi.",
          contoh: "Dadu adalah kubus. Kotak sepatu adalah balok.",
        },
        {
          nama: "Datar atau ruang",
          singkat: "Coba diangkat",
          uraian: "Gambar di kertas adalah bentuk datar. Benda yang bisa diangkat adalah bentuk ruang.",
          contoh: "Lingkaran datar, bola ruang.",
        },
      ],
      kuis: [
        { pertanyaan: "Berapa sisi persegi panjang?", alias: ["empat", "4"] },
        { pertanyaan: "Berapa sisi segitiga?", alias: ["tiga", "3"] },
        { pertanyaan: "Berapa sudut persegi panjang?", alias: ["empat", "4"] },
        { pertanyaan: "Berapa sudut segitiga?", alias: ["tiga", "3"] },
        { pertanyaan: "Benda mana yang berbentuk segitiga: pizza, buku, atau jam?", alias: ["pizza"] },
        { pertanyaan: "Gambar satu benda untuk segitiga, segi empat, dan lingkaran.", alias: [] },
        { pertanyaan: "Dadu itu bangun ruang apa?", alias: ["kubus"] },
        { pertanyaan: "Kotak sepatu itu bangun ruang apa?", alias: ["balok"] },
        { pertanyaan: "Gambar persegi atau dadu, mana yang bentuk ruang?", alias: ["dadu"] },
        { pertanyaan: "Kelompokkan segitiga, lingkaran, kubus, dan balok.", alias: ["segitiga", "lingkaran", "kubus", "balok"] },
        { pertanyaan: "Berapa sisi persegi panjang?", alias: ["4"] },
        { pertanyaan: "Pasangkan segitiga, segi empat, dan lingkaran dengan cirinya.", alias: ["3", "4", "sudut"] },
        { pertanyaan: "Susun dari sudut paling sedikit ke paling banyak.", alias: ["lingkaran", "segitiga", "segi empat"] },
        { pertanyaan: "Periksa tiga pernyataan bentuk.", alias: ["benar", "salah"] },
        { pertanyaan: "Mana yang berbentuk datar?", alias: ["gambar", "kertas"] },
      ],
      voice: [
        [
          "Sisi adalah garis yang membatasi bentuk. Sudut adalah tempat dua sisi bertemu.",
          "Segitiga punya 3 sisi dan 3 sudut. Segi empat punya 4. Lingkaran tidak punya sudut.",
          "Bangun ruang bisa dipegang. Kalau hanya bisa digambar, itu bentuk datar.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Papan Bentuk",
      pengantar: "Menghitung sisi dan sudut, lalu mengenal lima bangun ruang.",
      labelDaftar: "Lima papan bentuk",
      kolom: 1,
      item: [
        {
          nama: "Menghitung sisi",
          singkat: "Searah jarum jam",
          uraian: "Segitiga 3 sisi, persegi 4 sisi, persegi panjang 4 sisi, segi lima 5 sisi.",
          contoh: "Tunjuk satu sisi, hitung satu.",
        },
        {
          nama: "Menghitung sudut",
          singkat: "Ujung yang tajam",
          uraian: "Segitiga 3 sudut, persegi 4 sudut, lingkaran 0 sudut.",
          contoh: "Pada bangun lurus, jumlah sudut sama dengan jumlah sisi.",
        },
        {
          nama: "Tiga bangun utama",
          singkat: "Sisi dan sudut",
          uraian: "Segitiga 3 dan 3. Segi empat 4 dan 4. Lingkaran melengkung dan 0 sudut.",
          contoh: "Buku adalah segi empat.",
        },
        {
          nama: "Lima bangun ruang",
          singkat: "Punya isi",
          uraian: "Kubus, balok, tabung, kerucut, dan bola.",
          contoh: "Kaleng susu adalah tabung. Topi ulang tahun adalah kerucut.",
        },
        {
          nama: "Tes angkat",
          singkat: "Datar atau ruang",
          uraian: "Bisa diangkat berarti ruang. Hanya bisa digambar berarti datar.",
          contoh: "Dadu adalah ruang. Gambar persegi adalah datar.",
        },
      ],
      kuis: [
        { pertanyaan: "Berapa sisi segi lima?", alias: ["lima", "5"] },
        { pertanyaan: "Berapa sisi persegi panjang?", alias: ["empat", "4"] },
        { pertanyaan: "Berapa sudut persegi?", alias: ["empat", "4"] },
        { pertanyaan: "Berapa sudut lingkaran, dan mengapa?", alias: ["nol", "tidak"] },
        { pertanyaan: "Rambu segitiga itu bangun apa?", alias: ["segitiga"] },
        { pertanyaan: "Gambar bentuk untuk 3 sisi, 4 sisi, dan 0 sudut.", alias: ["segitiga", "persegi", "lingkaran"] },
        { pertanyaan: "Topi ulang tahun itu bangun ruang apa?", alias: ["kerucut"] },
        { pertanyaan: "Dadu dan kotak sepatu itu bangun apa?", alias: ["kubus", "balok"] },
        { pertanyaan: "Balok kayu atau gambar segitiga, mana yang bentuk ruang?", alias: ["balok"] },
        { pertanyaan: "Kelompokkan lingkaran, segitiga, tabung, dan bola.", alias: ["lingkaran", "segitiga", "tabung", "bola"] },
        { pertanyaan: "Pernyataan mana yang benar tentang sisi dan sudut?", alias: ["3 sisi", "3 sudut"] },
        { pertanyaan: "Pasangkan kubus, balok, dan tabung dengan bendanya.", alias: ["dadu", "sepatu", "kaleng"] },
        { pertanyaan: "Susun gambar lingkaran, gambar persegi panjang, dan bola.", alias: ["lingkaran", "persegi", "bola"] },
        { pertanyaan: "Periksa tiga pernyataan bangun ruang.", alias: ["benar", "salah"] },
        { pertanyaan: "Bentuk apa yang punya 6 sisi sama besar dan dipakai untuk dadu?", alias: ["kubus"] },
      ],
      voice: [
        [
          "Sisi dihitung satu per satu. Sudut adalah ujung tempat dua sisi bertemu.",
          "Lingkaran melengkung, jadi tidak punya sudut.",
          "Kubus dan balok sama-sama punya 6 sisi, tetapi hanya kubus yang sama semua.",
          "Bisa diangkat berarti bentuk ruang.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Bengkel Bentuk Wulan",
      pengantar: "Siswa menjadi perancang mainan. Setiap pesanan meminta bentuk dengan ciri yang tepat.",
      labelDaftar: "Sepuluh pos bengkel",
      kolom: 1,
      item: [
        {
          nama: "Pesanan bentuk",
          singkat: "Cocokkan cirinya",
          uraian: "Segitiga untuk 3 sisi. Kubus untuk 6 sisi yang sama. Rumah disusun dari badan, pintu, dan atap.",
          contoh: "Sepuluh pesanan selesai, sepuluh bintang terkumpul.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK1_BAB14),
      voice: [
        [
          "Kalian menjadi perancang mainan di bengkel. Pelanggan memesan bentuk dengan ciri tertentu.",
          "Pilih bentuk yang cirinya cocok. Kalau benar, mesin berbunyi.",
          "Sepuluh pesanan selesai, sepuluh bintang terkumpul, bengkel besar terbuka.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal menghitung sisi, memilih bentuk, dan membedakan datar dari ruang.",
      labelDaftar: "Lembar evaluasi bentuk",
      kolom: 1,
      item: [
        {
          nama: "Sisi dan sudut",
          singkat: "Hitung lalu tandai",
          uraian: "Persegi panjang punya 4 sisi dan 4 sudut. Lingkaran punya 0 sudut. Dua persegi punya 8 sisi dan 8 sudut.",
          contoh: "Lingkaran bulat, tetapi tetap bentuk datar.",
        },
        {
          nama: "Kotak Wulan",
          singkat: "Kelompokkan",
          uraian: "Kotak C berisi balok dan tabung, semuanya ruang. Kotak A dan B bercampur. Kubus dipindahkan dari kotak A.",
          contoh: "Dadu bisa diangkat, gambar dadu tidak.",
        },
      ],
      kuis: [
        { pertanyaan: "Tulis jumlah sisi dan sudut persegi panjang.", alias: ["4 sisi", "4 sudut"] },
        { pertanyaan: "Bentuk mana yang punya 0 sudut?", alias: ["lingkaran"] },
        { pertanyaan: "Sebutkan bangun ruang topi ulang tahun dan kaleng susu.", alias: ["kerucut", "tabung"] },
        { pertanyaan: "Apakah lingkaran termasuk bentuk ruang karena bulat seperti bola?", alias: ["salah", "datar"] },
        { pertanyaan: "Pasangkan kubus, balok, dan kerucut dengan cirinya.", alias: ["sama", "tidak sama", "lancip"] },
        { pertanyaan: "Kelompokkan segitiga, persegi, bola, dan tabung.", alias: ["segitiga", "persegi", "bola", "tabung"] },
        { pertanyaan: "Dua persegi punya berapa sisi dan sudut?", alias: ["8"] },
        { pertanyaan: "Susun dari sisi paling sedikit ke paling banyak.", alias: ["lingkaran", "segitiga", "persegi", "lima"] },
        { pertanyaan: "Dadu atau gambar dadu, mana yang bentuk ruang, dan mengapa?", alias: ["dadu"] },
        { pertanyaan: "Kotak mana yang semuanya ruang, mana yang bercampur, dan benda apa yang dipindahkan?", alias: ["kotak c", "kubus"] },
      ],
      voice: [
        [
          "Ada sepuluh soal. Hitung sisi dan sudutnya, atau bedakan bentuk datar dari bentuk ruang.",
          "Cari tahu jumlah sisi dan sudutnya. Bayangkan apakah benda itu bisa diangkat.",
          "Jangan terburu-buru, lalu periksa lagi jawabanmu.",
        ],
      ],
    },
  ],
};
