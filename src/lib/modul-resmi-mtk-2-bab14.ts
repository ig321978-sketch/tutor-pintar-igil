import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK2_BAB14 = "Bab 14: Bentuk-bentuk Kotak";

export const MODUL_MTK2_BAB14: ModulResmiPai = {
  id: "mtk-2-bab14",
  judul: JUDUL_MTK2_BAB14,
  pola: /kotak paket sani|bab 14: bentuk|bentuk-bentuk kotak|bangun ruang dasar|kubus dan balok/,
  motivasi:
    "Hore! Kamu sudah membantu Sani mengenal kotak paket. Kubus semua dindingnya sama besar, seperti dadu. Balok ada sisi yang lebih panjang, seperti kotak susu. Kubus dan balok sama-sama punya 6 sisi dan 8 titik sudut.",
  kunciJawaban: "B,B,B,A,B,A,A,A,A,A",
  sketsaKartu: [
    "Sani memegang kardus kosong di gudang paket Toko Permen.",
    "Kubus seperti dadu di samping balok seperti kotak susu, dengan 6 sisi dan 8 pojok.",
    "Anak memeriksa kardus dadu dan kardus panjang di lantai gudang.",
    "Anak mengisi lembar evaluasi tantangan para juara tentang bangun ruang.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Edo menggambar kotak persegi di kertas lalu berkata itu kubus. Lani menyanggah karena...
A) Gambar Edo berbentuk lingkaran
B) Gambar di kertas hanya bangun datar, tidak punya ruangan di dalamnya
C) Pernyataan Edo sudah benar
D) Kubus hanya boleh digambar dengan spidol`,
    `[Soal 2 - PG - Tipe: HOTS]
Cetakan es batu kubus dibungkus stiker. Satu dinding butuh 1 lembar. Stiker yang disiapkan...
A) 4 lembar
B) 6 lembar
C) 8 lembar
D) 12 lembar`,
    `[Soal 3 - PG - Tipe: HOTS]
Kotak punya isi, 8 titik sudut, dinding depan panjang dan dinding samping pendek. Bentuknya...
A) Kubus
B) Balok
C) Segitiga
D) Lingkaran`,
    `[Soal 4 - PG - Tipe: MOTS]
Kotak susu cair cokelat yang tegak di meja berbentuk...
A) Balok
B) Kubus
C) Lingkaran
D) Segitiga`,
    `[Soal 5 - PG - Tipe: HOTS]
Rubik berbentuk kubus dan tempat pensil berbentuk balok. Titik sudut keduanya...
A) Rubik lebih banyak
B) Sama banyak, yaitu 8
C) Tempat pensil lebih sedikit karena panjang
D) Rubik tidak punya titik sudut`,
    `[Soal 6 - PG - Tipe: LOTS]
Bangun ruang yang semua dindingnya segi empat sama besar disebut...
A) Kubus
B) Balok
C) Segitiga
D) Lingkaran`,
    `[Soal 7 - PG - Tipe: HOTS]
Kotak balok utuh, penutup atas dibuang. Dinding yang tersisa...
A) 5
B) 6
C) 4
D) 8`,
    `[Soal 8 - PG - Tipe: HOTS]
(1) Dadu ular tangga. (2) Kardus sepatu. Pasangan...
A) 1B 2A
B) 1A 2B
C) Keduanya A
D) Keduanya B`,
    `[Soal 9 - PG - Tipe: HOTS]
Dua kubus sama besar ditumpuk pas dan rapat. Wujud barunya...
A) Balok
B) Kubus yang lebih besar
C) Lingkaran
D) Segitiga`,
    `[Soal 10 - PG - Tipe: HOTS]
Bola pas di dalam kubus yang ditutup lalu digoyang. Bagian dalam yang tidak tersentuh bola...
A) Pojokan lancip, karena bola bulat dan kotak punya sudut lancip
B) Tengah dinding, karena bola tidak bisa menempel
C) Seluruh isi kotak
D) Tutup kotak saja`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog Kardus Paket Pengiriman",
      pengantar:
        "🗺️ Toko Permen Sani sibuk mengirim pesanan ke luar kota. Permen harus masuk kardus supaya tidak hancur. Kotak ini punya ruangan di dalamnya, berbeda dari gambar segi empat di kertas.",
      labelDaftar: "Target dan cerita apersepsi",
      kolom: 1,
      item: [
        {
          nama: "🌟 Target belajarku hari ini",
          singkat: "Kubus, balok, sisi, titik sudut",
          uraian:
            "🎯 Aku bisa mengenal kubus dan balok lewat benda nyata. 🎯 Aku bisa menemukan dinding (sisi) dan pojokan (titik sudut) pada kotak.",
          contoh: "Pegang kotak tisu atau kardus pasta gigi.",
        },
        {
          nama: "🗺️ Kardus paket pengiriman",
          singkat: "Permen dikirim dalam kotak",
          uraian:
            "Paman membawa kardus kosong. Sani kagum: kotak ini punya ruangan dan bisa diisi permen sampai penuh, tidak seperti gambar di kertas.",
          contoh: "Yuk bantu Sani menata permen di dalam kotak!",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Bangun ruang berbeda dari gambar kertas karena punya apa?",
          alias: ["ruangan", "isi", "dalam"],
        },
        {
          pertanyaan: "2. Nama dinding datar pada kotak disebut apa?",
          alias: ["sisi", "dinding"],
        },
        {
          pertanyaan: "3. Pojokan lancip pada kotak disebut apa?",
          alias: ["titik sudut", "sudut", "pojok"],
        },
      ],
      voice: [
        [
          "Toko Permen Sani hari ini sibuk. Permen dari luar kota harus dikirim di dalam kardus supaya tidak hancur di jalan.",
          "Sani kagum. Kotak ini berbeda dari gambar segi empat di kertas. Kotak ini punya ruangan di dalamnya dan bisa diisi permen.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis Kubus dan Balok",
      pengantar:
        "📦 Bangun ruang adalah benda tiga dimensi yang punya isi. Kubus semua dindingnya sama besar. Balok ada bagian yang lebih panjang. Keduanya punya 6 sisi dan 8 titik sudut.",
      labelDaftar: "Kubus, balok, sisi, dan titik sudut",
      kolom: 1,
      item: [
        {
          nama: "📦 Kubus",
          singkat: "Seperti dadu",
          uraian:
            "Semua permukaan dinding kubus ukurannya sama persis. Bentuknya seperti dadu, kotak kado persegi, atau rubik. Setiap dinding berbentuk segi empat sama besar.",
          contoh: "Dindingnya adil, sama besar.",
        },
        {
          nama: "🧃 Balok",
          singkat: "Seperti kotak susu",
          uraian:
            "Balok lebih panjang. Bentuknya seperti kotak susu, kardus sepatu, atau pasta gigi. Dindingnya segi empat yang panjangnya berbeda. Kubus dan balok sama-sama punya 6 sisi dan 8 titik sudut.",
          contoh: "6 dinding. 8 pojokan lancip.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Kotak yang semua dindingnya sama besar disebut apa?",
          alias: ["kubus", "dadu"],
        },
        {
          pertanyaan: "2. Kubus dan balok punya berapa sisi?",
          alias: ["6", "enam"],
        },
        {
          pertanyaan: "3. Kubus dan balok punya berapa titik sudut?",
          alias: ["8", "delapan"],
        },
      ],
      voice: [
        [
          "Bangun ruang punya isi di dalamnya. Kubus seperti dadu, semua dindingnya sama besar. Balok seperti kotak susu, ada bagian yang lebih panjang.",
          "Kubus dan balok sama-sama punya enam sisi dan delapan titik sudut.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Inspektur Kotak Paket",
      pengantar:
        "🕵️‍♂️ Kardus A dindingnya sama persis seperti dadu. Kardus B berbentuk panjang. Periksa nama bentuk, jumlah sisi, dan jumlah titik sudut.",
      labelDaftar: "Aktivitas terbimbing dan jurnal",
      kolom: 1,
      item: [
        {
          nama: "🕵️‍♂️ Aktivitas 1",
          singkat: "Kardus A kubus, kardus B balok",
          uraian:
            "Kardus A adalah kubus dan punya 6 sisi. Kardus B adalah balok dan punya 8 titik sudut. Kubus juga punya 8 titik sudut, balok juga punya 6 sisi.",
          contoh: "Kubus 6 sisi. Balok 8 titik sudut.",
        },
        {
          nama: "🎭 Jurnal perasaanku",
          singkat: "Pilih wajah",
          uraian:
            "😀 Sangat seru, aku tahu beda kotak sepatu dan kotak dadu. 😐 Aku harus pelan menghitung dinding. 😢 Aku masih bingung istilah sisi pada bangun datar dan bangun ruang.",
          contoh: "Pilih satu wajah.",
        },
      ],
      kuis: [
        { pertanyaan: "1. Nama bentuk kardus seperti dadu?", alias: ["kubus"] },
        { pertanyaan: "2. Jumlah dinding penutup kubus?", alias: ["6", "enam"] },
        { pertanyaan: "3. Jumlah pojokan lancip pada balok?", alias: ["8", "delapan"] },
      ],
      voice: [
        [
          "Kardus A dindingnya sama persis. Namanya kubus, dan seluruh dinding penutupnya ada enam sisi.",
          "Kardus B berbentuk panjang. Namanya balok, dan pojokan lancipnya ada delapan titik sudut.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "📝 Tantangan para juara! Gambar di kertas masih bangun datar. Kubus dan balok punya 6 sisi dan 8 titik sudut. Dua kubus yang ditumpuk menjadi balok.",
      labelDaftar: "Evaluasi pilihan ganda dan isian",
      kolom: 1,
      item: [
        {
          nama: "🍓 Bagian A",
          singkat: "Pilihan ganda",
          uraian:
            "Gambar Edo belum kubus nyata. Stiker Siti 6 lembar. Kotak rahasia Sani adalah balok. Kotak susu adalah balok. Rubik dan tempat pensil sama-sama punya 8 titik sudut.",
          contoh: "Cek isi, sisi, dan titik sudut.",
        },
        {
          nama: "✏️ Bagian B",
          singkat: "Isian singkat",
          uraian:
            "Dinding sama besar namanya kubus. Tutup atas dibuang, tersisa 5 dinding. Dadu kubus huruf B, kardus sepatu balok huruf A. Dua kubus ditumpuk menjadi balok. Bola tidak menyentuh pojokan lancip.",
          contoh: "Kubus. 5. 1B 2A. Balok. Pojokan lancip.",
        },
      ],
      kuis: [
        { pertanyaan: "1. Mengapa gambar Edo belum disebut kubus?", alias: ["datar", "kertas"] },
        { pertanyaan: "2. Berapa lembar stiker untuk kubus?", alias: ["6", "enam"] },
        { pertanyaan: "3. Kotak rahasia Sani berbentuk apa?", alias: ["balok"] },
        { pertanyaan: "4. Kotak susu berbentuk apa?", alias: ["balok"] },
        { pertanyaan: "5. Titik sudut rubik dan tempat pensil?", alias: ["8", "sama", "delapan"] },
        { pertanyaan: "6. Nama kotak yang semua dindingnya sama?", alias: ["kubus"] },
        { pertanyaan: "7. Dinding yang tersisa setelah tutup atas dibuang?", alias: ["5", "lima"] },
        { pertanyaan: "8. Pasangan dadu dan kardus sepatu?", alias: ["1b", "2a"] },
        { pertanyaan: "9. Dua kubus ditumpuk menjadi apa?", alias: ["balok"] },
        { pertanyaan: "10. Bagian kotak yang tidak tersentuh bola?", alias: ["pojok", "sudut", "lancip"] },
      ],
      voice: [
        [
          "Gambar Edo di kertas masih bangun datar, belum kubus yang punya isi. Stiker untuk seluruh dinding kubus ada enam lembar. Kotak rahasia Sani adalah balok. Kotak susu juga balok.",
          "Rubik dan tempat pensil sama-sama punya delapan titik sudut.",
        ],
        [
          "Kotak yang semua dindingnya sama besar disebut kubus. Kalau tutup atas balok dibuang, dinding yang tersisa lima. Dadu berpasangan huruf B, kardus sepatu berpasangan huruf A.",
          "Dua kubus yang ditumpuk menjadi balok. Bola bulat tidak menyentuh pojokan lancip di dalam kotak.",
        ],
      ],
    },
  ],
};
