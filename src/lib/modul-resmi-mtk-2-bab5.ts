import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK2_BAB5 = "Bab 5: Fondasi Pembagian Dasar";

export const MODUL_MTK2_BAB5: ModulResmiPai = {
  id: "mtk-2-bab5",
  judul: JUDUL_MTK2_BAB5,
  pola:
    /fondasi pembagian|bagi adil|pengurangan berulang sampai habis|pengurangan bersusun|data sederhana/,
  motivasi:
    "Pembagian = berbagi adil = pengurangan berulang sampai 0. 6 : 3 = 2 karena 6-3-3=0. Bagi 1 hasilnya bilangan itu sendiri.",
  kunciJawaban: "B,B,S,B,B,A,C,B,A,B",
  sketsaKartu: [
    "Anak membagi 6 cokelat kepada 3 teman sampai habis.",
    "Anak menuliskan 10 : 2 sebagai pengurangan 2 sebanyak 5 kali.",
    "Anak mengerjakan evaluasi bagi adil dan pengurangan berulang.",
    "Anak menarik garis 8:4, menggeser hasil 3 atau 4, mengurutkan cerita kelereng, dan menulis 10.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
12 - 4 - 4 - 4 = 0 ditulis pembagian...
A) 4 : 12
B) 12 : 4
C) 12 : 3 wajib saja
D) 4 : 4`,
    `[Soal 2 - PG - Tipe: HOTS]
10 : 2 = 5 dalam pengurangan berulang adalah...
A) 10 - 5 - 5 = 0
B) 10 - 2 - 2 - 2 - 2 - 2 = 0
C) 2 - 2 - 2 = 0
D) 10 - 10 = 0`,
    `[Soal 3 - PG - Tipe: HOTS]
15 : 5 = 3 artinya 15 dikurangi 3 sebanyak 5 kali. Pernyataan ini...
A) Benar.
B) Salah; 15 dikurangi 5 sebanyak 3 kali.
C) Benar karena hasilnya 3.
D) Pembagian tidak punya arti.`,
    `[Soal 4 - PG - Tipe: HOTS]
Bilangan cacah (kecuali 0) dibagi 1 hasilnya bilangan itu sendiri. Pernyataan ini...
A) Salah.
B) Benar; seluruh benda masuk satu wadah.
C) Benar hanya 1 : 1.
D) Hasilnya selalu 0.`,
    `[Soal 5 - PG - Tipe: Reguler]
6 permen untuk 3 anak secara adil. Pembagiannya...
A) 3 : 6
B) 6 : 3 = 2
C) 6 - 6 = 0
D) 9 : 3`,
    `[Soal 6 - PG - Tipe: Reguler]
8 : 4 sama dengan...
A) 8 - 4 - 4 = 0
B) 4 - 4 = 0 wajib saja
C) 8 - 8 - 8
D) 8 + 4`,
    `[Soal 7 - PG - Tipe: Reguler]
20 buku disusun ke 2 rak sama banyak. Tiap rak...
A) 8
B) 5
C) 10
D) 22`,
    `[Soal 8 - PG - Tipe: Reguler]
6 : 2 dan 12 : 4 hasilnya...
A) 2 dan 2
B) 3 dan 3
C) 4 dan 4
D) 6 dan 4`,
    `[Soal 9 - PG - Tipe: HOTS]
Mengapa hasil pembagian menunjukkan berapa kali pengurangan terjadi?
A) Karena kita mengulang mengurangi pembagi sampai sisa 0.
B) Supaya sama dengan perkalian wajib.
C) Karena nol dibagi tiga.
D) Karena penggaris mulai dari 1.`,
    `[Soal 10 - PG - Tipe: Reguler]
Tono punya 15 kelereng dibagi 5 teman. Tiap teman...
A) 5
B) 3
C) 10
D) 15`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Arti Simbol Pembagian",
      pengantar:
        "Infografis logika bagi adil: pembagian adalah pengurangan berulang sampai habis. 6 cokelat untuk 3 teman: 6-3-3=0, jadi 6 : 3 = 2.",
      labelDaftar: "Bagi adil, pengurangan berulang, hasil",
      kolom: 1,
      item: [
        {
          nama: "Berbagi adil",
          singkat: "Sampai habis menjadi 0",
          uraian:
            "Pembagian adalah kebalikan perkalian. Kita berbagi sama banyak. 6 cokelat, 3 teman: bagikan satu-satu. 6-3 sisa 3, 3-3 sisa 0.",
          contoh: "6 : 3 = 2 cokelat tiap teman.",
        },
        {
          nama: "Pengurangan berulang",
          singkat: "Kurangi pembagi sampai 0",
          uraian:
            "6 dikurangi 3 sebanyak 2 kali. Hasil 2 artinya pengurangan terjadi 2 kali. 12-4-4-4=0 ditulis 12 : 4.",
          contoh: "12 : 4 = 3.",
        },
        {
          nama: "Tulis kalimat matematika",
          singkat: "Yang dibagi : pembagi = hasil",
          uraian:
            "Angka depan adalah seluruh benda. Angka belakang adalah banyak teman atau wadah. Hasilnya bagian tiap orang. 10 : 2 = 10-2-2-2-2-2=0.",
          contoh: "10 : 2 = 5.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Jika ada pengurangan berulang 12 - 4 - 4 - 4 = 0, bagaimana menulisnya dalam operasi pembagian yang tepat?",
          alias: ["12 : 4", "12 dibagi 4", "dua belas dibagi empat"],
        },
      ],
      kuisTulis: {
        pertanyaan:
          "Ubah 10 : 2 = 5 menjadi pengurangan berulang sampai habis.",
        alias: ["10 - 2 - 2 - 2 - 2 - 2", "10-2-2-2-2-2"],
      },
      voice: [
        [
          "Halo anak-anak hebat kelas 2! Perkalian adalah penjumlahan berulang. Pembagian adalah kebalikannya: berbagi adil atau pengurangan berulang sampai habis.",
          "Kamu punya 6 cokelat, dibagi adil ke 3 teman. 6 dikurangi 3 sisa 3. 3 dikurangi 3 sisa 0. Pengurangan angka 3 terjadi 2 kali.",
          "Kita tulis 6 dibagi 3 hasilnya 2. Setiap teman mendapat 2 cokelat secara adil!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Hasil 3, Hasil 4, dan Bagi Satu",
      pengantar:
        "Infografis hasil sama: 6:2 dan 12:4 = 3. 8:2 dan 16:4 = 4. Bagi 1 artinya semua benda masuk satu wadah.",
      labelDaftar: "Hasil 3, hasil 4, bagi 1, soal cerita",
      kolom: 1,
      item: [
        {
          nama: "Keluarga 3 dan 4",
          singkat: "Pasangan hasil sama",
          uraian:
            "6 : 2 = 3. 12 : 4 = 3. 8 : 2 = 4. 16 : 4 = 4. 8 : 4 = 8-4-4=0. 9 : 3 = 9-3-3-3=0. 4 : 4 = 4-4=0.",
          contoh: "6 : 2 = 3. 8 : 2 = 4.",
        },
        {
          nama: "Dibagi satu",
          singkat: "Isinya tidak berubah",
          uraian:
            "Membagi dengan 1 artinya seluruh benda masuk satu wadah. 15 : 1 = 15. 7 : 1 = 7. Bukan 15 dikurangi 3 lima kali.",
          contoh: "15 : 1 = 15.",
        },
        {
          nama: "Soal cerita kelereng",
          singkat: "Punya, bagi, tanya",
          uraian:
            "Tono punya 15 kelereng. Ia bagi adil ke 5 teman. Tiap teman 3. Nia punya 20 buku, 2 rak sama banyak: tiap rak 10.",
          contoh: "15 : 5 = 3. 20 : 2 = 10.",
        },
      ],
      kuis: [
        {
          pertanyaan: "15 : 5 artinya dikurangi angka berapa, berapa kali?",
          alias: ["5", "tiga", "3 kali"],
        },
      ],
      kuisTulis: {
        pertanyaan: "20 buku ke 2 rak sama banyak. Jumlah buku tiap rak adalah...",
        alias: ["10"],
      },
      voice: [
        [
          "Beberapa pembagian punya hasil sama. Enam dibagi dua dan dua belas dibagi empat sama-sama tiga.",
          "Lima belas dibagi lima artinya dikurangi lima sebanyak tiga kali, bukan dikurangi tiga sebanyak lima kali.",
          "Dibagi satu, isinya tetap. Dua puluh buku, dua rak: sepuluh di tiap rak.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih 12:4 dan 10-2-2-2-2-2, tentukan benar-salah 15:5 serta bagi 1, jodohkan 8:4 4:4 9:3, lalu jelaskan arti hasil pembagian.",
      labelDaftar: "Pilihan, benar-salah, mencocokkan, dan esai",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A dan B",
          singkat: "Ubah bentuk",
          uraian:
            "12-4-4-4=0 adalah 12:4. 10:2 = 10-2 lima kali. 15:5 dikurangi 5 sebanyak 3 kali. Bagi 1 hasilnya tetap.",
          contoh: "12:4. 10-2-2-2-2-2. 15.",
        },
        {
          nama: "Kelompok C dan D",
          singkat: "Pasangan dan cerita",
          uraian:
            "8:4 = 8-4-4. 4:4 = 4-4. 9:3 = 9-3-3-3. 20:2=10. 15:5=3.",
          contoh: "2 kali. 3 kelereng. 10 buku.",
        },
      ],
      kuis: [
        { pertanyaan: "12-4-4-4 pembagian?", alias: ["12 : 4"] },
        { pertanyaan: "10:2 pengurangan?", alias: ["2", "lima"] },
        { pertanyaan: "15:5 dikurangi 3 lima kali?", alias: ["salah"] },
        { pertanyaan: "Bagi 1 hasil tetap?", alias: ["benar"] },
        { pertanyaan: "6:3?", alias: ["2"] },
        { pertanyaan: "Mengapa hasil = berapa kali?", alias: ["kurang", "habis", "nol"] },
      ],
      voice: [
        ["Dua belas dibagi empat karena empat dikurangi tiga kali sampai nol."],
        ["Bagi satu, bendanya tetap di satu wadah."],
      ],
    },
    {
      kode: "D",
      judul: "D. Kartu Evaluasi Ekstra",
      pengantar:
        "Tanpa keyboard. Tarik garis 8:4, 4:4, 9:3, geser ke keranjang 3 atau 4, urutkan cerita kelereng Tono, coretkan 1 pada 10, lalu tekan BENAR atau SALAH.",
      labelDaftar: "Tarik garis, keranjang, urutan, kanvas, detektif",
      kolom: 1,
      item: [
        {
          nama: "Permainan A sampai C",
          singkat: "Garis, keranjang, urutan",
          uraian:
            "8:4 = 8-4-4. 4:4 = 4-4. 9:3 = 9-3-3-3. Hasil 3: 6:2, 12:4. Hasil 4: 8:2, 16:4. Cerita: 15 kelereng, bagi 5 teman, berapa tiap orang?",
          contoh: "8-4-4. 3. 15 dulu.",
        },
        {
          nama: "Permainan D dan E",
          singkat: "Kanvas dan detektif",
          uraian:
            "20:2=10, coretkan 1. 15:5 bukan dikurangi 3 lima kali. Bagi 1 hasilnya bilangan itu sendiri.",
          contoh: "Coretkan 1. SALAH lalu BENAR.",
        },
      ],
      kuis: [
        { pertanyaan: "Tarik garis pembagian?", alias: ["8 : 4", "9 : 3"] },
        { pertanyaan: "Keranjang 3 atau 4?", alias: ["6 : 2", "8 : 2"] },
        { pertanyaan: "Urutan cerita kelereng?", alias: ["15", "5", "berapa"] },
        { pertanyaan: "15:5 dikurangi 3?", alias: ["salah"] },
        { pertanyaan: "Bagi 1 tetap?", alias: ["benar"] },
      ],
      kuisTulis: {
        pertanyaan: "Coretkan angka depan __ - 0 dari 20 : 2.",
        alias: ["10", "1"],
      },
      voice: [
        [
          "Tanpa keyboard. Tarik garis 8:4 ke 8-4-4, 4:4 ke 4-4, 9:3 ke 9-3-3-3. Geser 6:2 ke hasil 3, 8:2 ke hasil 4.",
          "Urutkan: Tono punya 15 kelereng, bagi 5 teman, lalu ditanya tiap orang. Coretkan 1 untuk sepuluh buku.",
          "Detektif: 15:5 dikurangi 5 tiga kali. Bagi satu, hasilnya bilangan itu sendiri.",
        ],
      ],
    },
  ],
};
