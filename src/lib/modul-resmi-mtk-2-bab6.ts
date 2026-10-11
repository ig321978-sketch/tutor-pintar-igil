import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK2_BAB6 = "Bab 6: Pengukuran Panjang Standar";

export const MODUL_MTK2_BAB6: ModulResmiPai = {
  id: "mtk-2-bab6",
  judul: JUDUL_MTK2_BAB6,
  pola:
    /pengukuran panjang standar|pita kantong permen|penggaris pintar|satuan cm dan m|bab 6: panjang|mengenal satuan cm/,
  motivasi:
    "Hore! Kamu sudah membantu Sani mengukur pita. Mulai dari angka 0, bukan ujung plastik. cm untuk benda pendek, m untuk benda panjang. 1 m = 100 cm.",
  kunciJawaban: "B,A,B,B,C,A,A,A,A,A",
  sketsaKartu: [
    "Sani ingin memotong pita merah dengan penggaris agar kantong permen cantik.",
    "Ukur dari angka 0. Pita 0 sampai 5 berarti 5 cm. 1 m = 100 cm.",
    "Anak menjadi detektif: Stik A dari 0, Stik B tidak dari 0 jadi dihitung selisih.",
    "Anak mengisi lembar evaluasi tantangan para juara tentang pengukuran panjang.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Edo mengukur pensil dari angka 3 sampai 10, lalu bilang 10 cm. Pendapat yang tepat...
A) Benar, karena ujung akhir di angka 10
B) Salah, panjangnya 7 cm karena 10 dikurangi 3
C) Salah, seharusnya 13 cm
D) Benar jika penggaris rusak`,
    `[Soal 2 - PG - Tipe: HOTS]
Pita 1 meter dipotong sama rata untuk 2 kotak kado, habis tanpa sisa. Tiap kotak mendapat...
A) 50 cm
B) 5 cm
C) 200 cm
D) 100 cm`,
    `[Soal 3 - PG - Tipe: HOTS]
(1) Permen karet 2 cm. (2) Lemari 2 m. (3) Penggaris guru 1 cm. Mana yang tidak masuk akal?
A) Nomor (1) saja
B) Nomor (3) saja
C) Nomor (2) dan (3)
D) Semuanya salah`,
    `[Soal 4 - PG - Tipe: MOTS]
Pita 45 cm digabung pita 30 cm. Totalnya...
A) 15 cm
B) 75 cm
C) 70 cm
D) 85 cm`,
    `[Soal 5 - PG - Tipe: HOTS]
Siti 120 cm, Dayu 1 m lebih 15 cm, Beni 118 cm. Urutan dari yang paling tinggi...
A) Siti, Dayu, Beni
B) Dayu, Siti, Beni
C) Siti, Beni, Dayu
D) Beni, Siti, Dayu`,
    `[Soal 6 - PG - Tipe: LOTS]
3 meter diubah ke sentimeter...
A) 300
B) 30
C) 103
D) 3`,
    `[Soal 7 - PG - Tipe: HOTS]
Pita 90 cm, potong 25 cm lalu 35 cm. Sisanya...
A) 30
B) 50
C) 60
D) 10`,
    `[Soal 8 - PG - Tipe: HOTS]
Permen koin diukur penggaris kecil, lingkar perut diukur meteran rol. Pasangan yang tepat...
A) 1B 2A
B) 1A 2B
C) Keduanya A
D) Keduanya B`,
    `[Soal 9 - PG - Tipe: HOTS]
Penggaris 30 cm ditempel 3 kali penuh sepanjang meja. Panjang meja...
A) 90
B) 30
C) 33
D) 60`,
    `[Soal 10 - PG - Tipe: HOTS]
Lilin 20 cm berkurang 3 cm tiap 10 menit. Setelah 20 menit sisanya...
A) 14
B) 17
C) 6
D) 23`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog Menghias Kantong Permen",
      pengantar:
        "🗺️ Sani ingin memotong pita merah dengan penggaris, supaya tidak kependekan atau kepanjangan.",
      labelDaftar: "Target dan cerita apersepsi",
      kolom: 1,
      item: [
        {
          nama: "🌟 Target belajarku hari ini",
          singkat: "Ukur dengan penggaris",
          uraian:
            "🎯 Aku bisa mengukur panjang benda memakai penggaris dengan cara yang benar. 🎯 Aku bisa mengenal satuan cm dan m serta hubungannya.",
          contoh: "Mulai dari angka 0.",
        },
        {
          nama: "🗺️ Menghias kantong permen",
          singkat: "Pita dan penggaris",
          uraian:
            "Sani punya gulungan pita. Kalau dipotong asal-asalan, pitanya bisa kependekan atau terbuang. Di meja ada penggaris berisi angka berurutan.",
          contoh: "Yuk bantu Sani mengukur pita dengan tepat!",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Sani ingin menghias kantong permen memakai apa?",
          alias: ["pita", "pita merah"],
        },
        {
          pertanyaan: "2. Alat ukur yang dilihat Sani di meja apa?",
          alias: ["penggaris", "penggaris panjang"],
        },
        {
          pertanyaan: "3. Satuan panjang di penggaris disebut apa?",
          alias: ["cm", "sentimeter", "senti"],
        },
      ],
      voice: [
        [
          "Toko permen Sani ramai. Sani ingin menghias kantong besar dengan pita merah. Kalau dipotong asal-asalan, pitanya bisa kependekan atau kepanjangan.",
          "Di meja ada penggaris berisi angka berurutan. Yuk, kita bantu Sani mengukur pita dengan tepat!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis Penggaris dan Meteran",
      pengantar:
        "📏 Benda pendek diukur dengan penggaris, satuannya sentimeter atau cm. Benda sangat panjang diukur dengan meteran, satuannya meter atau m. 1 m = 100 cm.",
      labelDaftar: "Cara ukur dari nol dan satuan m",
      kolom: 1,
      item: [
        {
          nama: "📏 Mengenal sentimeter",
          singkat: "Penggaris = cm",
          uraian:
            "Untuk pita, pensil, atau buku, pakai penggaris. Satuan di penggaris disebut sentimeter, ditulis cm.",
          contoh: "Pita Sani 5 cm.",
        },
        {
          nama: "🕵️‍♂️ Trik angka 0",
          singkat: "Mulai dari nol",
          uraian:
            "Ujung kiri benda pas di angka 0, bukan di ujung plastik. Tempel lurus. Angka di ujung kanan adalah panjangnya.",
          contoh: "Dari 0 sampai 5 = 5 cm.",
        },
        {
          nama: "🏃‍♂️ Mengenal meter",
          singkat: "1 m = 100 cm",
          uraian:
            "Ruangan atau pintu diukur dengan meteran. Satuannya meter, ditulis m. 1 meter sama dengan 100 sentimeter.",
          contoh: "100 penggaris 1 cm = 1 m.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Pita dari 0 sampai 5 panjangnya berapa cm?",
          alias: ["5", "lima", "5 cm"],
        },
        {
          pertanyaan: "2. 1 meter sama dengan berapa sentimeter?",
          alias: ["100", "seratus"],
        },
        {
          pertanyaan: "3. Pengukuran yang benar dimulai dari angka berapa?",
          alias: ["0", "nol"],
        },
      ],
      voice: [
        [
          "Benda pendek diukur dengan penggaris. Satuannya sentimeter, ditulis cm. Ujung kiri benda harus pas di angka nol, bukan di ujung plastik.",
          "Pita dari nol sampai lima berarti lima sentimeter. Benda sangat panjang memakai meteran. Satu meter sama dengan seratus sentimeter.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Detektif Ukuran Stik",
      pengantar:
        "🕵️‍♂️ Baca Stik A yang mulai dari 0, lalu Stik B yang ujung kirinya meleset. Panjang Stik B dihitung dari selisih angkanya.",
      labelDaftar: "Aktivitas terbimbing dan jurnal",
      kolom: 1,
      item: [
        {
          nama: "🕵️‍♂️ Aktivitas 1",
          singkat: "Stik A 12 cm, Stik B 10 cm",
          uraian:
            "Stik A: kiri 0, kanan 12, panjang 12 cm. Stik B: kiri 2, kanan 12, selisih 10 cm.",
          contoh: "Kalau tidak dari 0, kurangi ujung kanan dengan ujung kiri.",
        },
        {
          nama: "🎭 Jurnal perasaanku",
          singkat: "Pilih wajah",
          uraian:
            "😀 Sangat seru, mau mengukur barang di kamar! 😐 Sedikit bingung membedakan cm dan m. 😢 Masih sering lupa mulai dari angka 0.",
          contoh: "Pilih satu wajah.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Panjang Stik A yang mulai dari 0 berapa cm?",
          alias: ["12", "dua belas"],
        },
        {
          pertanyaan: "2. Ujung kiri Stik B berada di angka berapa?",
          alias: ["2", "dua"],
        },
        {
          pertanyaan: "3. Panjang Stik B yang dihitung selisih berapa cm?",
          alias: ["10", "sepuluh"],
        },
      ],
      voice: [
        [
          "Yuk jadi detektif ukuran. Stik A ujung kiri di nol, ujung kanan di dua belas, jadi dua belas sentimeter.",
          "Stik B ujung kiri di dua, ujung kanan di dua belas. Karena tidak mulai dari nol, panjangnya selisih: dua belas kurang dua sama dengan sepuluh sentimeter.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "📝 Tantangan para juara! Ukur pensil Edo, pita Sani, dan meja Riko. Ingat: mulai dari 0, dan 1 m = 100 cm.",
      labelDaftar: "Evaluasi pilihan ganda dan isian",
      kolom: 1,
      item: [
        {
          nama: "🍓 Bagian A",
          singkat: "Pilihan ganda",
          uraian:
            "Edo 10-3=7. Pita 1 m untuk 2 kotak = 50 cm. Penggaris guru 1 cm tidak masuk akal. 45+30=75. Siti 120, Beni 118, Dayu 115.",
          contoh: "Selisih. 1 m = 100 cm.",
        },
        {
          nama: "✏️ Bagian B",
          singkat: "Isian singkat",
          uraian:
            "3 m = 300 cm. Sisa pita Lani 30. Permen koin pakai penggaris, perut pakai meteran. Meja 90 cm. Lilin sisa 14 cm.",
          contoh: "300. 30. 90. 14.",
        },
      ],
      kuis: [
        { pertanyaan: "1. Pensil dari 3 sampai 10 panjangnya?", alias: ["7"] },
        { pertanyaan: "2. Pita 1 m dibagi 2 kotak, tiap kotak?", alias: ["50"] },
        { pertanyaan: "3. Ukuran mana yang tidak masuk akal?", alias: ["penggaris", "1 cm", "3"] },
        { pertanyaan: "4. 45 cm + 30 cm?", alias: ["75"] },
        { pertanyaan: "5. Urutan tinggi Siti, Dayu, Beni?", alias: ["siti", "beni", "dayu"] },
        { pertanyaan: "6. 3 meter sama dengan berapa cm?", alias: ["300"] },
        { pertanyaan: "7. 90 potong 25 lalu 35, sisa?", alias: ["30"] },
        { pertanyaan: "8. Permen koin dan lingkar perut, pasangannya?", alias: ["1b", "2a"] },
        { pertanyaan: "9. Penggaris 30 cm tiga kali, meja?", alias: ["90"] },
        { pertanyaan: "10. Lilin 20 cm, 20 menit, sisa?", alias: ["14"] },
      ],
      voice: [
        [
          "Ini lembar evaluasi tantangan para juara. Pensil dari tiga sampai sepuluh panjangnya tujuh. Satu meter dibagi dua kotak sama dengan lima puluh sentimeter. Penggaris guru satu sentimeter tidak masuk akal.",
          "Empat puluh lima tambah tiga puluh sama dengan tujuh puluh lima. Siti seratus dua puluh, Beni seratus delapan belas, Dayu seratus lima belas.",
        ],
        [
          "Tiga meter sama dengan tiga ratus sentimeter. Sisa pita Lani tiga puluh. Permen koin memakai penggaris, perut memakai meteran. Meja Riko sembilan puluh. Lilin sisa empat belas.",
        ],
      ],
    },
  ],
};
