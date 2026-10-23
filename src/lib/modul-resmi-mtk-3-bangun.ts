import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK3_BANGUN } from "@/lib/misi-mtk-3-bangun";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK3_BANGUN = "Bab 4: Unsur-Unsur Bangun Datar";

export const MODUL_MTK3_BANGUN: ModulResmiPai = {
  id: "mtk-3-bangun",
  judul: JUDUL_MTK3_BANGUN,
  pola: /^bab 4: unsur-unsur bangun datar$/,
  motivasi:
    "Nisa, Farhan, dan Cinta menghitung sisi, sudut, garis tegak lurus, dan garis sejajar bersama burung hantu Igil di sanggar bingkai.",
  kunciJawaban: "B,C,C,A,D,C,C,B,B,A",
  sketsaKartu: [
    "Nisa, Farhan, dan Cinta memegang bingkai bersama burung hantu Igil.",
    "Sisi, segi banyak, sudut siku, lancip, dan tumpul.",
    "Sepuluh pos bingkai.",
    "Poin penting dan lembar evaluasi bangun datar.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
Segitiga punya sisi...
A) 2
B) 3
C) 4
D) 5`,
    `[Soal 2 - PG - Tipe: MOTS]
Bangun dengan 4 sisi disebut...
A) Segitiga
B) Segilima
C) Segiempat
D) Segienam`,
    `[Soal 3 - PG - Tipe: MOTS]
Sudut pojok buku adalah...
A) Lancip
B) Tumpul
C) Siku-siku
D) Lingkaran`,
    `[Soal 4 - PG - Tipe: MOTS]
Sudut yang lebih kecil dari siku buku...
A) Lancip
B) Tumpul
C) Siku-siku
D) Lurus`,
    `[Soal 5 - PG - Tipe: MOTS]
Segienam punya sudut...
A) 5
B) 4
C) 8
D) 6`,
    `[Soal 6 - PG - Tipe: HOTS]
Mana yang bukan segi banyak?
A) Segitiga
B) Segiempat
C) Lingkaran
D) Segilima`,
    `[Soal 7 - PG - Tipe: HOTS]
Sudut yang lebih besar dari siku buku...
A) Lancip
B) Siku-siku
C) Tumpul
D) Sama`,
    `[Soal 8 - PG - Tipe: MOTS]
Ubin punya 5 sisi. Namanya...
A) Segiempat
B) Segilima
C) Segienam
D) Segitiga`,
    `[Soal 9 - PG - Tipe: HOTS]
Persegi panjang punya...
A) 3 sisi dan 3 sudut
B) 4 sisi dan 4 sudut
C) 5 sisi dan 4 sudut
D) 4 sisi dan 3 sudut`,
    `[Soal 10 - PG - Tipe: HOTS]
Kipas terbuka lebar disebut lancip. Jenis yang benar...
A) Tumpul
B) Lancip
C) Siku-siku
D) Tidak ada sudut`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar: "Nisa, Farhan, Cinta, dan Igil mengamati bingkai di sanggar. Infografis tiap sub-bab ada di dalam materi.",
      labelDaftar: "Lima adegan bingkai",
      kolom: 1,
      item: [
        { nama: "Sisi pada bangun datar", singkat: "Ruas garis", uraian: "Bingkai punya 4 sisi dan 4 sudut. Ruas PQ panjangnya 7 cm. 1 cm = 10 mm.", contoh: "Hitung garisnya, lalu hitung pojoknya." },
        { nama: "Bangun datar sederhana", singkat: "Nama dari sisi", uraian: "3 pensil jadi segitiga. 4 pensil jadi persegi panjang. 4 korek api sama panjang jadi persegi. Lingkaran tidak punya sudut.", contoh: "Jumlah sisi menjadi namanya." },
        { nama: "Sudut siku dan tegak lurus", singkat: "90 derajat", uraian: "Pojok buku adalah sudut siku, tepat 90 derajat. Dua garis yang bertemu siku disebut tegak lurus.", contoh: "Bandingkan dengan sampul buku." },
        { nama: "Sudut lancip", singkat: "Di bawah 90", uraian: "Sudut lancip lebih kecil dari 90 derajat. Contohnya 50 derajat.", contoh: "Yang lebih kecil disebut lancip." },
        { nama: "Tumpul dan sejajar", singkat: "Jarak tetap", uraian: "Sudut tumpul lebih besar dari 90 derajat. Sudut lurus 180 derajat. Sisi bingkai yang jaraknya tetap disebut sejajar.", contoh: "Garis sejajar tidak pernah bertemu." },
      ],
      kuis: [
        { pertanyaan: "Segitiga punya berapa sisi?", alias: ["3"] },
        { pertanyaan: "Segienam punya berapa sudut?", alias: ["6"] },
        { pertanyaan: "4 sisi namanya?", alias: ["segiempat"] },
        { pertanyaan: "3 sisi namanya?", alias: ["segitiga"] },
        { pertanyaan: "Sudut pojok meja. Jenisnya?", alias: ["siku"] },
        { pertanyaan: "Sudut ubin persegi. Jenisnya?", alias: ["siku"] },
        { pertanyaan: "Sudut lebih kecil dari pojok buku. Jenisnya?", alias: ["lancip"] },
        { pertanyaan: "Ujung gunting yang runcing. Jenisnya?", alias: ["lancip"] },
        { pertanyaan: "Sudut lebih besar dari pojok buku. Jenisnya?", alias: ["tumpul"] },
        { pertanyaan: "Bukaan pintu yang lebar. Jenisnya?", alias: ["tumpul"] },
        { pertanyaan: "6 sisi namanya?", alias: ["segienam"] },
        { pertanyaan: "Pasangkan ciri dan namanya.", alias: ["segitiga", "siku", "tumpul"] },
        { pertanyaan: "Susun dari sisi paling sedikit.", alias: ["segitiga", "segiempat", "segilima", "segienam"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "Sudut lebih kecil dari pojok meja. Jenisnya?", alias: ["lancip"] },
      ],
      voice: [["Di sanggar, bingkai punya sisi dan sudut. Garis yang bertemu siku disebut tegak lurus. Garis yang jaraknya tetap disebut sejajar."]],
    },
    {
      kode: "B",
      judul: "B. Latihan di dalam sub-bab",
      pengantar: "Papan infografis sudah masuk ke tiap sub-bab materi. Latihan ini menghitung sisi, menamai segi banyak, dan membedakan sudut.",
      labelDaftar: "Lima papan bangun",
      kolom: 1,
      item: [
        { nama: "Hitung", singkat: "Sisi dan sudut", uraian: "Segitiga 3 sisi dan 3 sudut. Segienam 6 dan 6.", contoh: "Jumlah sisi dan sudutnya sama." },
        { nama: "Nama", singkat: "Dari jumlah sisi", uraian: "3 segitiga. 4 segiempat.", contoh: "Sebut jumlahnya, lalu namanya." },
        { nama: "Siku", singkat: "Pojok buku", uraian: "Sudut yang sama dengan pojok buku.", contoh: "Tempelkan pada sampul buku." },
        { nama: "Lancip", singkat: "Lebih kecil", uraian: "Lebih sempit dari pojok buku.", contoh: "Ujung yang runcing." },
        { nama: "Tumpul", singkat: "Lebih besar", uraian: "Lebih terbuka dari pojok buku.", contoh: "Kipas yang melebar." },
      ],
      kuis: [
        { pertanyaan: "Persegi punya berapa sudut?", alias: ["4"] },
        { pertanyaan: "Segilima punya berapa sisi?", alias: ["5"] },
        { pertanyaan: "6 sisi namanya?", alias: ["segienam"] },
        { pertanyaan: "5 sisi namanya?", alias: ["segilima"] },
        { pertanyaan: "Sudut kotak pensil. Jenisnya?", alias: ["siku"] },
        { pertanyaan: "Sudut kertas yang sama dengan buku. Jenisnya?", alias: ["siku"] },
        { pertanyaan: "Ujung panah kertas yang runcing. Jenisnya?", alias: ["lancip"] },
        { pertanyaan: "Sudut irisan kecil. Jenisnya?", alias: ["lancip"] },
        { pertanyaan: "Sudut atap yang melebar. Jenisnya?", alias: ["tumpul"] },
        { pertanyaan: "Sudut pagar yang terbuka lebar. Jenisnya?", alias: ["tumpul"] },
        { pertanyaan: "Segiempat punya sudut berapa?", alias: ["4"] },
        { pertanyaan: "Pasangkan ciri dan jawabannya.", alias: ["3", "lancip", "segienam"] },
        { pertanyaan: "Susun dari sudut yang paling kecil.", alias: ["lancip", "siku", "tumpul"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "Ubin 4 sisi namanya?", alias: ["segiempat"] },
      ],
      voice: [["Papan ini menunjukkan sisi, nama segi banyak, dan cara membandingkan sudut dengan pojok buku."]],
    },
    {
      kode: "C",
      judul: "C. Pos Bingkai Igil",
      pengantar: "Sepuluh soal sisi, segi banyak, dan jenis sudut.",
      labelDaftar: "Sepuluh soal bingkai",
      kolom: 1,
      item: [
        {
          nama: "Soal bingkai",
          singkat: "Sisi dan sudut",
          uraian: "Hitung sisi, sebut nama segi banyak, atau bandingkan sudut.",
          contoh: "Salah boleh diulang. Bingkai tidak berkurang.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK3_BANGUN),
      voice: [["Sepuluh pos bingkai. Pilih satu, lalu jawab."]],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal bangun datar, segi banyak, dan jenis sudut.",
      labelDaftar: "Lembar evaluasi bangun",
      kolom: 1,
      item: [
        {
          nama: "Evaluasi",
          singkat: "Sepuluh soal",
          uraian: "Menghitung sisi, menamai segi banyak, dan membedakan sudut.",
          contoh: "Bandingkan dengan pojok buku.",
        },
      ],
      kuis: [
        { pertanyaan: "Segilima punya berapa sudut?", alias: ["5"] },
        { pertanyaan: "Sudut sampul buku. Jenisnya?", alias: ["siku"] },
        { pertanyaan: "3 sisi namanya?", alias: ["segitiga"] },
        { pertanyaan: "Sudut lebih besar dari siku. Jenisnya?", alias: ["tumpul"] },
        { pertanyaan: "Pasangkan ciri dan jawabannya.", alias: ["6", "lancip", "segiempat"] },
        { pertanyaan: "Sudut lebih besar dari pojok buku. Jenisnya?", alias: ["tumpul"] },
        { pertanyaan: "Susun langkah membandingkan sudut.", alias: ["tempel pada buku", "lihat ukurannya", "sebut jenisnya"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "Segitiga punya berapa sisi?", alias: ["3"] },
        { pertanyaan: "Ubin 5 sisi milik siapa?", alias: ["Farhan"] },
      ],
      voice: [["Sepuluh soal. Hitung sisinya, atau bandingkan sudutnya dengan pojok buku."]],
    },
  ],
};
