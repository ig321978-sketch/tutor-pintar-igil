import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { MISI_MTK1_BAB12, kuisDariMisi } from "@/lib/misi-kebun-mtk-1";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK1_BAB12 = "Bab 12: Pengukuran Berat";

export const MODUL_MTK1_BAB12: ModulResmiPai = {
  id: "mtk-1-bab12",
  judul: JUDUL_MTK1_BAB12,
  pola: /pengukuran\s+berat\b|pasar timbang momo|gajah kecil momo/,
  motivasi:
    "Sasa, Dito, dan Beben belajar membandingkan berat bersama gajah kecil Momo, lalu mengukur dengan kelereng dan genggaman.",
  kunciJawaban: "B,B,C,B,B,C,C,B,C,C",
  sketsaKartu: [
    "Sasa, Dito, dan Beben mengangkat beras dan kapas bersama gajah kecil Momo.",
    "Timbangan kelereng dan genggaman tangan untuk mengukur berat.",
    "Momo menjadi penjaga timbangan di pasar.",
    "Poin penting dan lembar evaluasi pengukuran berat.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: LOTS]
Mana yang paling berat?
A) Bulu
B) Batu
C) Balon
D) Daun`,
    `[Soal 2 - PG - Tipe: HOTS]
Lima balon dibandingkan dengan satu batu. Yang lebih berat...
A) Lima balon
B) Satu batu
C) Sama berat
D) Tidak bisa ditentukan`,
    `[Soal 3 - PG - Tipe: LOTS]
Penghapus seimbang dengan 5 kelereng. Beratnya...
A) 3 kelereng
B) 4 kelereng
C) 5 kelereng
D) 6 kelereng`,
    `[Soal 4 - PG - Tipe: LOTS]
Penggaris seimbang dengan 3 kelereng. Beratnya...
A) 2 kelereng
B) 3 kelereng
C) 4 kelereng
D) 5 kelereng`,
    `[Soal 5 - PG - Tipe: HOTS]
Dua anak mengukur benda yang sama dengan tangan masing-masing. Hasil genggamannya...
A) Pasti sama
B) Bisa beda
C) Pasti 5
D) Tidak bisa diukur`,
    `[Soal 6 - PG - Tipe: HOTS]
Botol 3 kelereng, penggaris 5 kelereng, buku 7 kelereng. Yang paling ringan...
A) Buku
B) Penggaris
C) Botol
D) Sama berat`,
    `[Soal 7 - PG - Tipe: LOTS]
Spons seimbang dengan 4 kelereng. Beratnya...
A) 3 kelereng
B) 5 kelereng
C) 4 kelereng
D) 6 kelereng`,
    `[Soal 8 - PG - Tipe: LOTS]
Batu dibandingkan dengan daun. Pernyataan yang benar...
A) Daun lebih berat
B) Batu lebih berat
C) Sama berat
D) Tidak bisa dibandingkan`,
    `[Soal 9 - PG - Tipe: HOTS]
Boneka seimbang dengan 7 kelereng. Berat boneka...
A) 5 kelereng
B) 6 kelereng
C) 7 kelereng
D) 8 kelereng`,
    `[Soal 10 - PG - Tipe: HOTS]
Hasil ukur naik 4: 4, kotak, 12. Angka yang hilang...
A) 6
B) 7
C) 8
D) 10`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Halaman Rumah Sasa",
      pengantar: "Sasa, Dito, dan Beben membandingkan berat, lalu mengukur dengan kelereng dan genggaman.",
      labelDaftar: "Lima adegan menimbang",
      kolom: 1,
      item: [
        {
          nama: "Berat dan ringan",
          singkat: "Harus diangkat",
          uraian: "Beras susah diangkat, kapas gampang diangkat. Berat terasa di tangan, bukan hanya dilihat.",
          contoh: "Buku lebih berat daripada selembar kertas.",
        },
        {
          nama: "Membandingkan",
          singkat: "Tangan yang turun",
          uraian: "Tiga apel lebih ringan daripada satu semangka. Banyak belum tentu berat.",
          contoh: "Batu lebih berat daripada banyak balon.",
        },
        {
          nama: "Kelereng",
          singkat: "Tambah sampai seimbang",
          uraian: "Penghapus seimbang dengan 5 kelereng. Penggaris seimbang dengan 3 kelereng.",
          contoh: "Gunting seimbang dengan 7 kelereng.",
        },
        {
          nama: "Genggaman",
          singkat: "Jangan ganti tangan",
          uraian: "Tangan kecil Beben perlu 6 genggam. Tangan besar Dito cukup 4 genggam untuk benda yang sama.",
          contoh: "Pakai tangan orang yang sama dari awal sampai akhir.",
        },
        {
          nama: "Mengurutkan",
          singkat: "Satuan harus sama",
          uraian: "Botol 3, penggaris 5, buku 7 kelereng. Urutan ringan ke berat: botol, penggaris, buku.",
          contoh: "Angka paling besar berarti paling berat.",
        },
      ],
      kuis: [
        { pertanyaan: "Mana yang lebih berat, buku atau kertas?", alias: ["buku"] },
        { pertanyaan: "Mana yang paling ringan dan paling berat: bulu atau batu?", alias: ["bulu", "batu"] },
        { pertanyaan: "Mana yang lebih berat, balon atau batu?", alias: ["batu"] },
        { pertanyaan: "Tulis tanda antara buku dan bulu.", alias: ["buku lebih berat"] },
        { pertanyaan: "Berapa berat penggaris yang seimbang dengan 3 kelereng?", alias: ["tiga kelereng", "3"] },
        { pertanyaan: "Berapa berat gunting yang seimbang dengan 7 kelereng?", alias: ["7", "tujuh"] },
        { pertanyaan: "Kalau tangannya berbeda, hasil genggamannya sama atau beda?", alias: ["beda"] },
        { pertanyaan: "Tangan yang lebih kecil butuh genggaman lebih banyak atau lebih sedikit?", alias: ["lebih banyak"] },
        { pertanyaan: "Mana yang paling berat: boneka 4, gelas 9, atau krayon 6?", alias: ["gelas"] },
        { pertanyaan: "Urutkan sendok 1, apel 2, kaus 5, buku 8.", alias: ["sendok", "apel", "kaus", "buku"] },
        { pertanyaan: "Mana yang paling berat?", alias: ["batu"] },
        { pertanyaan: "Pasangkan pensil, spons, dan buku dengan beratnya.", alias: ["2", "6", "11"] },
        { pertanyaan: "Susun kue 3, kaus 4, buku 7, gelas 9.", alias: ["3", "4", "7", "9"] },
        { pertanyaan: "Periksa tiga pernyataan berat.", alias: ["benar", "salah"] },
        { pertanyaan: "Kotak mana yang beratnya berbeda dari 6 kelereng?", alias: ["5"] },
      ],
      voice: [
        [
          "Berat terasa saat benda diangkat. Besar belum tentu berat.",
          "Tangan yang turun memegang benda yang lebih berat.",
          "Kelereng ditambah sampai timbangan seimbang.",
          "Genggaman harus memakai tangan yang sama. Satuan yang sama baru boleh dibandingkan.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Papan Timbangan",
      pengantar: "Membandingkan, mengukur dengan kelereng dan genggaman, lalu mengurutkan.",
      labelDaftar: "Lima papan berat",
      kolom: 1,
      item: [
        {
          nama: "Berat dan ringan",
          singkat: "Bayangkan mengangkat",
          uraian: "Balon lebih ringan daripada buku. Karung beras lebih berat daripada daun.",
          contoh: "Boneka lebih ringan daripada batu.",
        },
        {
          nama: "Dua benda",
          singkat: "Lebih berat, lebih ringan, atau sama",
          uraian: "Tiga apel lebih ringan daripada satu semangka.",
          contoh: "Semangka lebih berat daripada sebutir telur.",
        },
        {
          nama: "Kelereng",
          singkat: "Hitung sampai seimbang",
          uraian: "Gunting seimbang dengan 6 kelereng. Spons seimbang dengan 4 kelereng. Sendok seimbang dengan 9 kelereng.",
          contoh: "Berapa kelerengnya, itu beratnya.",
        },
        {
          nama: "Genggaman",
          singkat: "Satu tangan",
          uraian: "Beras habis dalam 5 genggaman. Kacang habis dalam 7 genggaman. Tangan yang lebih kecil butuh lebih banyak genggaman.",
          contoh: "Jangan ganti tangan di tengah.",
        },
        {
          nama: "Mengurutkan",
          singkat: "Angka kecil paling ringan",
          uraian: "Kaus 2, kue 5, buku 9. Dari ringan ke berat: kaus, kue, buku.",
          contoh: "Gelas 4 kelereng adalah yang paling ringan di antara 6, 4, dan 10.",
        },
      ],
      kuis: [
        { pertanyaan: "Mana yang lebih ringan, boneka atau batu?", alias: ["boneka"] },
        { pertanyaan: "Karung beras atau daun, mana berat dan mana ringan?", alias: ["beras", "daun"] },
        { pertanyaan: "Mana yang lebih berat, telur atau semangka?", alias: ["semangka"] },
        { pertanyaan: "Tulis tanda antara boneka dan buku.", alias: ["boneka lebih ringan"] },
        { pertanyaan: "Berapa berat spons yang seimbang dengan 4 kelereng?", alias: ["empat kelereng", "4"] },
        { pertanyaan: "Berapa berat sendok yang seimbang dengan 9 kelereng?", alias: ["9", "sembilan"] },
        { pertanyaan: "Berapa genggaman berat kacang yang dihitung sampai 7?", alias: ["tujuh genggaman", "7"] },
        { pertanyaan: "Tangan lebih kecil, genggamannya lebih banyak atau lebih sedikit?", alias: ["lebih banyak"] },
        { pertanyaan: "Mana yang paling ringan: krayon 6, gelas 4, atau buku 10?", alias: ["gelas"] },
        { pertanyaan: "Urutkan dari paling berat: apel 7, boneka 5, sendok 2.", alias: ["apel", "boneka", "sendok"] },
        { pertanyaan: "Batu atau daun, mana yang lebih berat?", alias: ["batu"] },
        { pertanyaan: "Pasangkan benda dengan alat ukurnya.", alias: ["genggaman", "kelereng"] },
        { pertanyaan: "Susun kaus 2, kue 5, gelas 8, buku 11.", alias: ["2", "5", "8", "11"] },
        { pertanyaan: "Periksa tiga pernyataan ukuran.", alias: ["benar", "salah"] },
        { pertanyaan: "Boneka seimbang dengan 7 kelereng. Beratnya berapa?", alias: ["7"] },
      ],
      voice: [
        [
          "Berat dirasakan saat mengangkat. Besar tidak selalu berarti berat.",
          "Tangan yang turun memegang yang lebih berat.",
          "Tambah kelereng sampai seimbang. Genggaman memakai tangan yang sama.",
          "Angka kecil berarti paling ringan, asal satuannya sama.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Pasar Timbang Momo",
      pengantar: "Siswa menjadi penjaga timbangan. Setiap pesanan diukur dengan satuan yang sama.",
      labelDaftar: "Sepuluh pos pasar",
      kolom: 1,
      item: [
        {
          nama: "Timbangan pasar",
          singkat: "Ukur lalu bandingkan",
          uraian: "Semangka lebih berat daripada enam jeruk. Kelereng ditambah sampai seimbang. Beras diukur dengan genggaman.",
          contoh: "Buku yang seimbang dengan 8 kelereng beratnya 8 kelereng.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK1_BAB12),
      voice: [
        [
          "Kalian menjadi penjaga timbangan. Ukur barang dengan kelereng atau genggaman.",
          "Kalau sisi kanan masih naik, kelerengnya masih kurang.",
          "Sepuluh pos selesai, sepuluh koin terkumpul, pasar besar terbuka.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal membandingkan dan mengukur berat.",
      labelDaftar: "Lembar evaluasi berat",
      kolom: 1,
      item: [
        {
          nama: "Membaca timbangan",
          singkat: "Seimbang berarti sama",
          uraian: "Bulu lebih ringan daripada palu. Botol yang seimbang dengan 5 kelereng beratnya 5 kelereng. Penggaris yang seimbang dengan 9 kelereng beratnya 9 kelereng.",
          contoh: "Kapas yang banyak genggamnya tetap bisa lebih ringan daripada batu kecil.",
        },
        {
          nama: "Tiga barang Momo",
          singkat: "Selisih berat",
          uraian: "Botol 4, buku 9, krayon 2 kelereng. Paling berat buku. Paling ringan krayon. Selisihnya 7 kelereng.",
          contoh: "Hasil genggaman beda karena ukuran tangan beda.",
        },
      ],
      kuis: [
        { pertanyaan: "Tulis tanda antara bulu dan palu, lalu beri alasan.", alias: ["bulu lebih ringan"] },
        { pertanyaan: "Botol seimbang dengan 5 kelereng. Beratnya berapa?", alias: ["5"] },
        { pertanyaan: "Penggaris seimbang dengan 9 kelereng. Sebutkan beratnya.", alias: ["sembilan kelereng"] },
        { pertanyaan: "Apakah kapas 20 genggam pasti lebih berat daripada batu kecil?", alias: ["salah", "lebih ringan"] },
        { pertanyaan: "Pasangkan benda dengan alat ukurnya.", alias: ["kelereng", "genggaman"] },
        { pertanyaan: "Urutkan sendok 2, buku 4, apel 6, boneka 9.", alias: ["2", "4", "6", "9"] },
        { pertanyaan: "Pola naik 4: 4, kotak, 12. Angka yang hilang?", alias: ["8"] },
        { pertanyaan: "Susun gelas 9, buku 7, kue 5, kaus 3 dari berat ke ringan.", alias: ["9", "7", "5", "3"] },
        { pertanyaan: "Mengapa dua tangan memberi hasil genggaman yang berbeda?", alias: ["tangan", "beda"] },
        { pertanyaan: "Botol 4, buku 9, krayon 2. Mana paling berat, paling ringan, dan berapa selisihnya?", alias: ["buku", "krayon", "7"] },
      ],
      voice: [
        [
          "Ada sepuluh soal. Bandingkan beratnya, atau baca hasil timbangan.",
          "Satuan harus sama. Jangan ganti tangan di tengah.",
          "Periksa lagi jawabanmu.",
        ],
      ],
    },
  ],
};
