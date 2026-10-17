import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK6_BAB2 = "Bab 2: Rasio";

export const MODUL_MTK6_BAB2: ModulResmiPai = {
  id: "mtk-6-bab2",
  judul: JUDUL_MTK6_BAB2,
  pola: /^bab 2: rasio$/,
  motivasi: "Bab ini mengikuti urutan buku siswa: rasio, kesamaan rasio, rasio satuan, lalu penerapan pada bagian dan waktu.",
  kunciJawaban: "B,C,A,B,C",
  sketsaKartu: [
    "Membandingkan banyak benda, lalu menulis rasio dan menyederhanakannya.",
    "Kesamaan rasio lewat tabel, lalu harga satuan dan rasio per jam.",
    "Rasio bagian terhadap keseluruhan, dan rasio pada satuan waktu.",
    "Uji kompetensi bab. Pengayaan kesamaan rasio dan durasi terpisah.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
Anggota klub sains 16 dan seni 24. Perbandingan paling sederhana...
A) 4 : 3
B) 2 : 3
C) 3 : 2
D) 8 : 6`,
    `[Soal 2 - PG - Tipe: MOTS]
Seni 24 anggota. Olahraga dibanding seni adalah 3 : 2. Anggota olahraga...
A) 16 orang
B) 24 orang
C) 36 orang
D) 48 orang`,
    `[Soal 3 - PG - Tipe: MOTS]
Dony memakai 30 ml sirup untuk 2 sendok susu. Hana memakai 65 ml untuk 5 sendok. Yang lebih terasa cokelat...
A) Susu Dony
B) Susu Hana
C) Keduanya sama
D) Tidak bisa dibanding`,
    `[Soal 4 - PG - Tipe: MOTS]
Novel dibanding komik adalah 11 : 4. Seluruh buku 120. Banyak novel...
A) 32 buku
B) 88 buku
C) 44 buku
D) 110 buku`,
    `[Soal 5 - PG - Tipe: MOTS]
Kecepatan mengetik 1.200 kata dalam 1 jam. Dalam 180 menit terbaca...
A) 1.200 kata
B) 1.800 kata
C) 3.600 kata
D) 6.000 kata`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar: "Konsep rasio, sesuai urutan buku.",
      labelDaftar: "A. Konsep Rasio",
      kolom: 1,
      item: [
        { nama: "Pohon kebun", singkat: "4 : 6", uraian: "4 pucuk merah terhadap 6 cemara. Bentuk sederhana 2 : 3.", contoh: "3 : 2 artinya terbalik." },
        { nama: "Antrean wahana", singkat: "24 dan 18", uraian: "24 lebih banyak dari 18. Rasio 24 : 18 = 4 : 3.", contoh: "Bagi kedua ruas dengan 6." },
        { nama: "Pohon bertambah", singkat: "14 pucuk", uraian: "2 : 3 = 14 : 21. Cemara yang ditanam 21.", contoh: "Kedua ruas dikali 7." },
      ],
      kuis: [
        { pertanyaan: "Bentuk sederhana antrean 24 : 18.", alias: ["4:3"] },
        { pertanyaan: "Pengunjung bianglala.", alias: ["32"] },
        { pertanyaan: "Pengunjung rumah hantu.", alias: ["6"] },
      ],
      voice: [[
        "Empat banding enam disederhanakan menjadi dua banding tiga.",
        "Antrean roller coaster lebih panjang karena dua puluh empat lebih besar dari delapan belas.",
      ]],
    },
    {
      kode: "B",
      judul: "B. Kesamaan Rasio",
      pengantar: "Kesamaan rasio dan rasio satuan.",
      labelDaftar: "B. Kesamaan Rasio",
      kolom: 1,
      item: [
        { nama: "Lahan dan bibit", singkat: "10 : 12", uraian: "10 : 12 = 5 : 6. Lahan 25 m² memuat 30 bibit. 10 : 12 senilai dengan 30 : 36.", contoh: "Bagi dengan 2, atau kali dengan bilangan yang sama." },
        { nama: "Harga bibit", singkat: "Satuan", uraian: "3 bibit Rp37.500 berarti Rp12.500 per bibit. 5 bibit Rp58.000 berarti Rp11.600 per bibit.", contoh: "Paket lima lebih murah per bibit." },
        { nama: "Kemasan per jam", singkat: "4 : 1", uraian: "6 bibit dalam 1,5 jam sama dengan 4 bibit per jam. Dalam 4 jam selesai 16 bibit.", contoh: "Satuan waktu ditulis bersama rasio." },
      ],
      kuis: [
        { pertanyaan: "Rasa kopi Dona.", alias: ["manis"] },
        { pertanyaan: "Harga 1 pena.", alias: ["2400", "2.400"] },
        { pertanyaan: "Harga 5 pena.", alias: ["12000", "12.000"] },
      ],
      voice: [[
        "Sepuluh banding dua belas sama dengan lima banding enam.",
        "Paket lima bibit lebih murah untuk setiap satu bibit.",
      ]],
    },
    {
      kode: "C",
      judul: "C. Penerapan Rasio",
      pengantar: "Bagian terhadap keseluruhan dan durasi waktu.",
      labelDaftar: "C. Penerapan Rasio",
      kolom: 1,
      item: [
        { nama: "Tanaman terjual", singkat: "4 : 5 dari 72", uraian: "Hias 32 dan obat 40. Terhadap seluruh penjualan, hias 4 : 9 dan obat 5 : 9.", contoh: "Jumlah rasio 4 + 5 = 9." },
        { nama: "Masa panen", singkat: "Satuan sama", uraian: "3 bulan sama dengan 12 minggu. Baru kemudian dibanding dengan 12 minggu.", contoh: "Satuan waktu disamakan dulu." },
        { nama: "Jalan Banyu", singkat: "1 km dalam 30 menit", uraian: "1 jam menempuh 2 km. 9 km memerlukan 4,5 jam.", contoh: "30 menit ada dua kali dalam 1 jam." },
      ],
      kuis: [
        { pertanyaan: "Anak-anak di pasar malam.", alias: ["270"] },
        { pertanyaan: "Jarak Banyu dalam 1 jam.", alias: ["2"] },
        { pertanyaan: "1,5 tahun dalam bulan.", alias: ["18"] },
      ],
      voice: [[
        "Empat tambah lima sama dengan sembilan bagian. Tanaman hias tiga puluh dua.",
        "Satu kilometer dalam tiga puluh menit berarti dua kilometer dalam satu jam.",
      ]],
    },
    {
      kode: "D",
      judul: "Uji Kompetensi",
      pengantar: "Lima soal uji di akhir bab.",
      labelDaftar: "Uji Kompetensi",
      kolom: 1,
      item: [
        { nama: "Klub sekolah", singkat: "16 dan 24", uraian: "Sains banding seni 2 : 3. Olahraga 36. Robotik 27.", contoh: "Seni 24 adalah 2 bagian, satu bagian 12." },
        { nama: "Sirup cokelat", singkat: "15 ml dan 13 ml", uraian: "Dony 15 ml per sendok. Hana 13 ml per sendok.", contoh: "Bagi sirup dengan banyak sendok." },
        { nama: "Buku dan ketikan", singkat: "88 dan 3.600", uraian: "Novel 88 dari 120 buku. 180 menit menghasilkan 3.600 kata.", contoh: "11 + 4 = 15 bagian. 180 menit sama dengan 3 jam." },
      ],
      kuis: [
        { pertanyaan: "Rasio sederhana sains dan seni.", alias: ["2:3"] },
        { pertanyaan: "Anggota olahraga.", alias: ["36"] },
        { pertanyaan: "Anggota robotik.", alias: ["27"] },
        { pertanyaan: "Susu yang lebih cokelat.", alias: ["dony"] },
        { pertanyaan: "Banyak novel.", alias: ["88"] },
        { pertanyaan: "Susu dengan harga satuan lebih murah.", alias: ["segar"] },
        { pertanyaan: "Kata dalam 180 menit.", alias: ["3600", "3.600"] },
        { pertanyaan: "Menit untuk 3.000 kata.", alias: ["150"] },
      ],
      voice: [[
        "Enam belas banding dua puluh empat sama dengan dua banding tiga.",
        "Seribu dua ratus kata tiap jam menjadi tiga ribu enam ratus kata dalam tiga jam.",
      ]],
    },
  ],
};
