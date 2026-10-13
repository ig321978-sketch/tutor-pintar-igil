import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK3_BAB2 } from "@/lib/misi-mtk-3-bab2";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK3_BAB2 = "Bab 2: Penjumlahan dan Pengurangan sampai 10.000";

export const MODUL_MTK3_BAB2: ModulResmiPai = {
  id: "mtk-3-bab2",
  judul: JUDUL_MTK3_BAB2,
  pola: /penjumlahan dan pengurangan sampai 10\.?000/,
  motivasi:
    "Rio, Sinta, dan Adit belajar menjumlahkan dan mengurangkan bilangan sampai 10.000 bersama Bunda Kiki di gudang beras.",
  kunciJawaban: "A,B,A,A,B,C,B,B,A,A",
  sketsaKartu: [
    "Rio, Sinta, dan Adit menghitung karung beras bersama koala Bunda Kiki.",
    "Penjumlahan dan pengurangan bersusun, dengan simpanan dan pinjaman.",
    "Bunda Kiki melepas truk ekspedisi dari gudang.",
    "Poin penting dan lembar evaluasi penjumlahan dan pengurangan.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
6.786 + 2.458 sama dengan...
A) 9.244
B) 8.244
C) 9.144
D) 9.234`,
    `[Soal 2 - PG - Tipe: MOTS]
Pada 5.847 + 2.396, satuannya 7 + 6 = 13. Yang harus dilakukan...
A) Buang angka 1
B) Tulis 3, simpan 1 ke puluhan
C) Tulis 13 langsung
D) Balik posisi kedua bilangan`,
    `[Soal 3 - PG - Tipe: HOTS]
9.005 − 4.376 sama dengan...
A) 4.629
B) 4.639
C) 4.729
D) 5.629`,
    `[Soal 4 - PG - Tipe: HOTS]
Sinta menulis 8.243 − 3.876 = 4.367. Pernyataannya...
A) Benar
B) Salah, seharusnya 4.477
C) Salah, seharusnya 4.357
D) Salah, seharusnya 5.367`,
    `[Soal 5 - PG - Tipe: HOTS]
⬜.250 + 3.480 = 9.730. Angka yang hilang...
A) 5
B) 6
C) 7
D) 8`,
    `[Soal 6 - PG - Tipe: HOTS]
2.⬜00 + 3.400 = 6.100. Angka yang hilang...
A) 5
B) 6
C) 7
D) 8`,
    `[Soal 7 - PG - Tipe: MOTS]
Soal mana yang tidak perlu menyimpan?
A) 4.768 + 3.575
B) 2.431 + 3.124
C) 5.847 + 2.396
D) 6.758 + 2.486`,
    `[Soal 8 - PG - Tipe: MOTS]
Muatan naik 400: 2.100 – 2.500 – 2.900 – ⬜. Berikutnya...
A) 3.200
B) 3.300
C) 3.400
D) 3.500`,
    `[Soal 9 - PG - Tipe: MOTS]
4.216 + 3.472 sama dengan...
A) 7.688
B) 7.588
C) 7.678
D) 8.688`,
    `[Soal 10 - PG - Tipe: HOTS]
Gudang pagi 5.400 karung. Siang datang 2.750. Sore dikirim 4.150. Isi akhir dibanding pagi...
A) Lebih sedikit
B) Lebih banyak
C) Sama
D) Tidak bisa dihitung`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar:
        "Rio, Sinta, Adit, dan Bunda Kiki menjumlahkan, mengurangi, lalu menyelesaikan catatan gudang.",
      labelDaftar: "Lima adegan hitung karung",
      kolom: 1,
      item: [
        {
          nama: "Tanpa menyimpan",
          singkat: "Semua muat",
          uraian: "2.435 + 3.142 = 5.577. Jumlah tiap rumah 9 atau kurang, jadi tidak ada simpanan.",
          contoh: "Mulai dari satuan.",
        },
        {
          nama: "Dengan menyimpan",
          singkat: "Lebih dari sembilan",
          uraian: "4.768 + 3.575 = 8.343. Simpanan 1 muncul tiga kali dan wajib dihitung.",
          contoh: "Tulis satuan, simpan satu ke kiri.",
        },
        {
          nama: "Tanpa meminjam",
          singkat: "Atas lebih besar",
          uraian: "8.745 − 3.521 = 5.224. Semua angka atas lebih besar, jadi langsung dikurangi.",
          contoh: "Tidak perlu meminjam.",
        },
        {
          nama: "Dengan meminjam",
          singkat: "Coret, kurang satu",
          uraian: "5.342 − 1.876 = 3.466. Meminjam tiga kali. Rumah yang dipinjam berkurang satu.",
          contoh: "Satu di kiri bernilai sepuluh di kanan.",
        },
        {
          nama: "Soal cerita",
          singkat: "Empat langkah",
          uraian:
            "4.250 + 2.180 = 6.430, lalu 6.430 − 3.500 = 2.930. Datang artinya tambah. Dikirim, terjual, dan sisa artinya kurang.",
          contoh: "Kerjakan berurutan.",
        },
      ],
      kuis: [
        { pertanyaan: "Pada 4.213 + 1.574, berapa 3 + 4?", alias: ["tujuh", "7"] },
        { pertanyaan: "Berapa 5.124 + 3.451?", alias: ["8575"] },
        { pertanyaan: "Pada 5.847 + 2.396, 7 + 6 = 13. Simpan berapa?", alias: ["satu", "1"] },
        { pertanyaan: "Berapa 6.758 + 2.486?", alias: ["9244"] },
        { pertanyaan: "Pada 9.876 − 4.253, berapa 6 − 3?", alias: ["tiga", "3"] },
        { pertanyaan: "Berapa 7.948 − 3.617?", alias: ["4331"] },
        { pertanyaan: "Pada 6.431 − 2.758, setelah meminjam angka ribuan jadi berapa?", alias: ["lima", "5"] },
        { pertanyaan: "Berapa 7.203 − 3.468?", alias: ["3735"] },
        { pertanyaan: "Kata dikirim artinya apa?", alias: ["dikurangi", "kurang"] },
        { pertanyaan: "Gudang 6.800, terjual 2.450. Tulis kalimatnya.", alias: ["6800 - 2450 = 4350"] },
        { pertanyaan: "Berapa 3.847 + 2.576?", alias: ["6423"] },
        { pertanyaan: "Pasangkan 4.500 + 2.300, 7.200 − 2.400, dan 2.900 + 2.100.", alias: ["6800", "4800", "5000"] },
        { pertanyaan: "Susun 3.400 + 2.200 = 5.600.", alias: ["3400", "2200", "5600"] },
        { pertanyaan: "Periksa tiga pernyataan simpanan dan pinjaman.", alias: ["benar", "salah"] },
        { pertanyaan: "⬜.500 + 2.300 = 7.800. Angka ribuan yang hilang?", alias: ["5"] },
      ],
      voice: [
        [
          "Untuk menjumlahkan bilangan ribuan, kita mulai dari satuan, lalu puluhan, ratusan, dan terakhir ribuan.",
          "Kalau lebih dari sembilan, simpan satu ke kiri. Kalau angka bawah lebih besar, pinjam dari kiri.",
          "Soal cerita diterjemahkan dulu: datang artinya tambah, dikirim artinya kurang.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis",
      pengantar: "Cara menjumlah, mengurangi, menyimpan, meminjam, dan menerjemahkan soal cerita.",
      labelDaftar: "Lima papan hitung",
      kolom: 1,
      item: [
        {
          nama: "Tanpa menyimpan",
          singkat: "Langsung tulis",
          uraian: "3.241 + 4.536 = 7.777. Setiap rumah hasilnya 7.",
          contoh: "Semua muat? Tidak usah simpan.",
        },
        {
          nama: "Menyimpan",
          singkat: "Simpanan dihitung",
          uraian: "4.876 + 2.358 = 7.234. Simpanan 1 tiga kali.",
          contoh: "Lebih dari sembilan? Simpan satu ke kiri.",
        },
        {
          nama: "Tanpa meminjam",
          singkat: "Atas cukup",
          uraian: "9.865 − 4.321 = 5.544.",
          contoh: "Atas lebih besar? Boleh langsung kurang.",
        },
        {
          nama: "Meminjam",
          singkat: "Coret",
          uraian: "6.253 − 2.487 = 3.766. Setelah meminjam, rumah kiri berkurang satu.",
          contoh: "Bawah lebih besar? Pinjam.",
        },
        {
          nama: "Kata kunci",
          singkat: "Baca dulu",
          uraian: "3.450 − 1.280 = 2.170 karena kata dikirim. 5.600 + 2.150 = 7.750 karena kata datang.",
          contoh: "Baca dulu, jangan langsung hitung.",
        },
      ],
      kuis: [
        { pertanyaan: "Berapa 5.123 + 2.415?", alias: ["7538", "tujuh ribu lima ratus tiga puluh delapan"] },
        { pertanyaan: "Berapa 6.214 + 2.173?", alias: ["8387"] },
        { pertanyaan: "Pada 6.437 + 2.285, 7 + 5 = 12. Berapa yang disimpan?", alias: ["satu", "1"] },
        { pertanyaan: "Berapa 5.869 + 3.274?", alias: ["9143"] },
        { pertanyaan: "Berapa 8.974 − 3.652?", alias: ["5322", "lima ribu tiga ratus dua puluh dua"] },
        { pertanyaan: "Berapa 9.785 − 4.263?", alias: ["5522"] },
        { pertanyaan: "Pada 7.412 − 3.859, setelah meminjam angka ribuan jadi berapa?", alias: ["enam", "6"] },
        { pertanyaan: "Berapa 8.304 − 4.676?", alias: ["3628"] },
        { pertanyaan: "Kata terjual artinya tambah atau kurang?", alias: ["kurang"] },
        { pertanyaan: "Ada 5.600 karung, datang 2.150. Tulis kalimatnya.", alias: ["5600 + 2150 = 7750"] },
        { pertanyaan: "Soal mana yang tidak perlu menyimpan?", alias: ["2431"] },
        { pertanyaan: "Pasangkan soal dengan tekniknya.", alias: ["tanpa menyimpan", "tanpa meminjam", "dengan meminjam"] },
        { pertanyaan: "Urutkan hasil 1.500, 5.500, 6.200, dan 8.500.", alias: ["1500", "5500", "6200", "8500"] },
        { pertanyaan: "Periksa tiga pernyataan hitungan.", alias: ["benar", "salah"] },
        { pertanyaan: "2.⬜00 + 3.400 = 6.100. Angka yang hilang?", alias: ["7"] },
      ],
      voice: [
        [
          "Jumlahkan dari satuan. Kalau setiap rumah hasilnya sembilan atau kurang, langsung tulis.",
          "Kalau lebih dari sembilan, simpan satu ke kiri. Kalau bawah lebih besar, pinjam dan coret rumah kirinya.",
          "Soal cerita: cari angka, cari kata kunci, tulis kalimat, lalu hitung.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Ekspedisi Truk Gudang",
      pengantar:
        "Siswa menjadi kepala ekspedisi. Muatan bertambah dijumlahkan, muatan berkurang dikurangi. Sepuluh pos selesai, sepuluh truk terkumpul.",
      labelDaftar: "Sepuluh pos ekspedisi",
      kolom: 1,
      item: [
        {
          nama: "Transaksi muatan",
          singkat: "Tambah atau kurang",
          uraian:
            "Level 1 menjumlah 3.215 + 2.174 = 5.389. Level 2 menyimpan pada 4.867 + 3.459. Level 3 sisa 5.326. Level 4 sisa 2.756. Level 5: 3.500 + 2.750 = 6.250, lalu 6.250 − 4.200 = 2.050.",
          contoh: "Salah hitung tidak mengurangi truk. Coba lagi.",
        },
      ],
      kuis: [
        ...kuisDariMisi(MISI_MTK3_BAB2),
        { pertanyaan: "Berapa 4.216 + 3.472?", alias: ["7688"] },
        { pertanyaan: "Pada 5.847 + 2.396, apa yang dilakukan dengan 13?", alias: ["simpan 1"] },
        { pertanyaan: "Pasangkan 6.400 + 2.500, 8.700 − 3.100, dan 5.600 − 1.400.", alias: ["8900", "5600", "4200"] },
        { pertanyaan: "Urutkan 9.200, 4.750, 6.800, 2.510, 8.140.", alias: ["2510", "4750", "6800", "8140", "9200"] },
        { pertanyaan: "Periksa tiga pernyataan truk.", alias: ["benar", "salah"] },
        { pertanyaan: "3.⬜00 + 4.200 = 7.500. Angka yang hilang?", alias: ["3"] },
        { pertanyaan: "Berapa 9.005 − 4.376?", alias: ["4629"] },
        { pertanyaan: "Deret naik 400: 2.100, 2.500, 2.900, berikutnya?", alias: ["3300"] },
        { pertanyaan: "Berapa 5.200 + 3.100?", alias: ["8300", "delapan ribu tiga ratus"] },
        { pertanyaan: "6.400 + 2.350, lalu dikirim 4.500. Tulis dua langkah.", alias: ["8750", "4250"] },
      ],
      voice: [
        [
          "Kalian menjadi kepala ekspedisi. Truk datang membawa muatan, truk pergi mengirim muatan.",
          "Kalau muatan bertambah, jumlahkan. Kalau berkurang, kurangi. Lebih dari sembilan, pindahkan ke bak sebelah. Kalau kurang, pinjam dari bak depan.",
          "Sepuluh pos selesai, sepuluh truk terkumpul, rute ekspres terbuka.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal penjumlahan, pengurangan, dan soal cerita sampai 10.000.",
      labelDaftar: "Lembar evaluasi hitung",
      kolom: 1,
      item: [
        {
          nama: "Simpanan dan pinjaman",
          singkat: "Jejak hitung",
          uraian:
            "5.748 + 3.276 = 9.024 dengan simpanan tiga kali. 6.786 + 2.458 = 9.244. 9.002 − 4.537 = 4.465. 8.243 − 3.876 = 4.367.",
          contoh: "Simpanan dihitung. Rumah yang dipinjam dikurangi satu.",
        },
        {
          nama: "Gudang Bunda Kiki",
          singkat: "Dua langkah",
          uraian: "5.400 + 2.750 = 8.150. Lalu 8.150 − 4.150 = 4.000. Akhir hari lebih sedikit dari pagi.",
          contoh: "Kerjakan siang dulu, baru sore.",
        },
      ],
      kuis: [
        { pertanyaan: "Berapa 5.748 + 3.276?", alias: ["9024"] },
        { pertanyaan: "Berapa 6.786 + 2.458?", alias: ["9244"] },
        { pertanyaan: "Bacalah 7.483.", alias: ["7483", "tujuh ribu empat ratus delapan puluh tiga"] },
        { pertanyaan: "Apakah 8.243 − 3.876 = 4.367 benar?", alias: ["benar"] },
        { pertanyaan: "Pasangkan teknik 4.216 + 3.472, 5.264 − 3.142, dan 7.324 − 4.568.", alias: ["tanpa menyimpan", "tanpa meminjam", "dengan meminjam"] },
        { pertanyaan: "Berapa 9.002 − 4.537?", alias: ["4465"] },
        { pertanyaan: "⬜.250 + 3.480 = 9.730. Angka yang hilang?", alias: ["6"] },
        { pertanyaan: "Urutkan hasil 1.300, 5.700, 6.800, dan 8.200.", alias: ["1300", "5700", "6800", "8200"] },
        { pertanyaan: "Kata dikirim artinya operasi apa?", alias: ["kurang", "dikurangi"] },
        { pertanyaan: "Gudang 5.400, datang 2.750, dikirim 4.150. Tulis siang, akhir, dan bandingannya.", alias: ["8150", "4000", "sedikit"] },
      ],
      voice: [
        [
          "Saatnya kalian mengerjakan sendiri. Ada sepuluh soal penjumlahan dan pengurangan sampai 10.000.",
          "Simpanan harus dihitung, dan setelah meminjam rumahnya harus dikurangi satu.",
          "Jangan terburu-buru, dan periksa lagi jawabanmu.",
        ],
      ],
    },
  ],
};
