import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK3_UKUR } from "@/lib/misi-mtk-3-ukur";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK3_UKUR = "Bab 6: Pengukuran Panjang dan Berat";

export const MODUL_MTK3_UKUR: ModulResmiPai = {
  id: "mtk-3-ukur",
  judul: JUDUL_MTK3_UKUR,
  pola: /^bab 6: pengukuran panjang dan berat$/,
  motivasi:
    "Dimas, Salsa, dan Bimo belajar satuan panjang dan berat bersama tupai Kiki di bengkel kayu.",
  kunciJawaban: "A,B,B,B,A,C,A,B,B,C",
  sketsaKartu: [
    "Dimas, Salsa, dan Bimo mengukur kayu bersama tupai Kiki.",
    "Satuan panjang, berat, alat ukur, dan konversi.",
    "Kiki menjadi tukang kayu di bengkel.",
    "Poin penting dan lembar evaluasi pengukuran.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
Satuan yang paling tepat untuk tebal koin...
A) mm
B) cm
C) m
D) km`,
    `[Soal 2 - PG - Tipe: MOTS]
4 m sama dengan...
A) 40 cm
B) 400 cm
C) 4.000 cm
D) 4 cm`,
    `[Soal 3 - PG - Tipe: HOTS]
Salsa menulis: panjang lapangan lebih tepat diukur dengan penggaris karena mudah dibawa. Pernyataannya...
A) Benar
B) Salah, lapangan panjang jadi lebih tepat pakai meteran roda
C) Salah, lapangan diukur dengan timbangan
D) Tidak bisa ditentukan`,
    `[Soal 4 - PG - Tipe: MOTS]
4.000 gram sama dengan...
A) 2 kg
B) 4 kg
C) 40 kg
D) 400 kg`,
    `[Soal 5 - PG - Tipe: HOTS]
Nilai yang paling besar...
A) 3 m
B) 250 cm
C) 2.000 mm
D) 1 m 50 cm`,
    `[Soal 6 - PG - Tipe: MOTS]
Satuan yang paling tepat untuk tinggi pintu...
A) mm
B) cm
C) m
D) km`,
    `[Soal 7 - PG - Tipe: HOTS]
Nilai yang paling besar...
A) 2 m
B) 180 cm
C) 1.500 mm
D) 1 m 20 cm`,
    `[Soal 8 - PG - Tipe: MOTS]
Panjang papan naik 50 cm: 50 – 100 – 150 – berikutnya...
A) 175 cm
B) 200 cm
C) 225 cm
D) 250 cm`,
    `[Soal 9 - PG - Tipe: MOTS]
2 m sama dengan...
A) 20 cm
B) 200 cm
C) 2.000 cm
D) 2 cm`,
    `[Soal 10 - PG - Tipe: HOTS]
Pasangan yang tidak cocok...
A) Pensil dengan penggaris
B) Kain panjang dengan meteran pita
C) Karung beras dengan penggaris
D) Panjang jalan dengan meteran roda`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar: "Dimas, Salsa, Bimo, dan Kiki mengenal satuan baku panjang dan berat.",
      labelDaftar: "Lima adegan bengkel kayu",
      kolom: 1,
      item: [
        { nama: "Satuan panjang", singkat: "mm, cm, m, km", uraian: "Benda tipis pakai mm, benda kecil pakai cm, benda sedang pakai m, jarak jauh pakai km.", contoh: "Satuan baku sama untuk semua orang." },
        { nama: "Satuan berat", singkat: "g dan kg", uraian: "Benda ringan pakai gram. Benda berat pakai kilogram. 1 kg = 1.000 g.", contoh: "Koin pakai gram. Beras pakai kilogram." },
        { nama: "Alat ukur", singkat: "Sesuai bendanya", uraian: "Penggaris, meteran pita, meteran roda, dan timbangan punya kegunaan berbeda.", contoh: "Kain lentur pakai meteran pita." },
        { nama: "Konversi panjang", singkat: "Turun kali, naik bagi", uraian: "Dari mm sampai m, satu tingkat dikali atau dibagi 10. 1 km = 1.000 m.", contoh: "2 m = 200 cm. 2 km = 2.000 m." },
        { nama: "Konversi berat", singkat: "Kali atau bagi 1.000", uraian: "kg ke g dikali 1.000. g ke kg dibagi 1.000.", contoh: "3 kg = 3.000 g. Setengah kilo = 500 g." },
      ],
      kuis: [
        { pertanyaan: "Benda mana yang diukur dengan sentimeter?", alias: ["pensil"] },
        { pertanyaan: "Pasangkan koin, pensil, pintu, dan kota dengan satuannya.", alias: ["koin", "pensil", "pintu", "kota"] },
        { pertanyaan: "Benda mana yang diukur dengan kilogram?", alias: ["gula"] },
        { pertanyaan: "Perkirakan berat koin dan karung beras.", alias: ["koin", "beras"] },
        { pertanyaan: "Alat ukur yang tepat untuk kain panjang?", alias: ["meteran pita"] },
        { pertanyaan: "Hubungkan pensil, lapangan, dan karung beras dengan alatnya.", alias: ["pensil", "lapangan", "beras"] },
        { pertanyaan: "3 meter sama dengan berapa sentimeter?", alias: ["tiga ratus", "300"] },
        { pertanyaan: "Hitung 5 m, 400 cm, dan 2 km.", alias: ["500", "4", "2000"] },
        { pertanyaan: "4 kilogram sama dengan berapa gram?", alias: ["empat ribu", "4000"] },
        { pertanyaan: "Hitung 6 kg, 9.000 g, dan 2 kg 500 g.", alias: ["6000", "9", "2500"] },
        { pertanyaan: "Satuan untuk tebal koin?", alias: ["mm"] },
        { pertanyaan: "Pasangkan koin, beras, dan kartu dengan satuannya.", alias: ["g", "kg"] },
        { pertanyaan: "Susun mm, cm, m, dan km.", alias: ["mm", "cm", "m", "km"] },
        { pertanyaan: "Periksa tiga pernyataan ukuran.", alias: ["benar", "salah"] },
        { pertanyaan: "Mana pasangan alat yang tidak cocok?", alias: ["timbangan"] },
      ],
      voice: [[
        "Satuan baku ukurannya sama untuk semua orang.",
        "Panjang memakai milimeter, sentimeter, meter, dan kilometer. Berat memakai gram dan kilogram.",
        "Pilih alat sesuai benda. Satu kilogram sama dengan seribu gram.",
      ]],
    },
    {
      kode: "B",
      judul: "B. Infografis",
      pengantar: "Pilih satuan, pilih alat, lalu ubah satuannya.",
      labelDaftar: "Lima papan pengukuran",
      kolom: 1,
      item: [
        { nama: "Panjang", singkat: "Empat satuan", uraian: "mm untuk koin, cm untuk pensil, m untuk tinggi badan, km untuk jarak kota.", contoh: "Tinggi pintu memakai meter." },
        { nama: "Berat", singkat: "Gram dan kilogram", uraian: "Buku sekitar 500 gram. Berat badan memakai kilogram.", contoh: "1 kg = 1.000 g." },
        { nama: "Alat", singkat: "Lima alat", uraian: "Penggaris, meteran pita, meteran roda, timbangan dapur, dan timbangan besar.", contoh: "Tali melengkung memakai meteran pita." },
        { nama: "Tangga panjang", singkat: "×10 dan ÷10", uraian: "Dari mm ke m, turun dikali 10 dan naik dibagi 10. 1 km = 1.000 m.", contoh: "3 m = 300 cm. 700 cm = 7 m." },
        { nama: "Tangga berat", singkat: "×1.000 dan ÷1.000", uraian: "5 kg = 5.000 g. 8.000 g = 8 kg. 3 kg 200 g = 3.200 g.", contoh: "Kilo ke gram, tambah tiga nol." },
      ],
      kuis: [
        { pertanyaan: "Satuan untuk panjang meja?", alias: ["meter", "m"] },
        { pertanyaan: "Pasangkan koin, pensil, tinggi badan, dan jarak kota.", alias: ["koin", "pensil", "badan", "kota"] },
        { pertanyaan: "Buku sekitar 500. Gram atau kilogram?", alias: ["gram"] },
        { pertanyaan: "Pasangkan koin dan karung beras.", alias: ["koin", "beras"] },
        { pertanyaan: "Alat untuk panjang lapangan?", alias: ["meteran roda"] },
        { pertanyaan: "Pasangkan tepung, kain, dan pensil.", alias: ["tepung", "kain", "pensil"] },
        { pertanyaan: "4 m sama dengan berapa sentimeter?", alias: ["empat ratus", "400"] },
        { pertanyaan: "Hitung 2 m, 900 cm, dan 3 km.", alias: ["200", "9", "3000"] },
        { pertanyaan: "7 kg sama dengan berapa gram?", alias: ["tujuh ribu", "7000"] },
        { pertanyaan: "Hitung 4 kg, 6.000 g, dan 1 kg 400 g.", alias: ["4000", "6", "1400"] },
        { pertanyaan: "2 m sama dengan berapa cm?", alias: ["200"] },
        { pertanyaan: "Pasangkan 3 kg, 2 kg, dan 5.000 g.", alias: ["3000", "2000", "5"] },
        { pertanyaan: "Urutkan 1 m, 250 cm, 3.000 mm, dan 2 km.", alias: ["1 m", "250 cm", "3000 mm", "2 km"] },
        { pertanyaan: "Periksa tiga konversi.", alias: ["benar", "salah"] },
        { pertanyaan: "4.000 gram sama dengan berapa kilogram?", alias: ["4"] },
      ],
      voice: [[
        "Pilih satuan sesuai ukuran benda. Kecil pakai kecil, besar pakai besar.",
        "Ringan pakai gram, berat pakai kilogram. Lentur pakai meteran pita.",
        "Turun tangga dikali sepuluh, naik tangga dibagi sepuluh. Satu kilometer sama dengan seribu meter.",
      ]],
    },
    {
      kode: "C",
      judul: "C. Bengkel Kayu Tupai Kiki",
      pengantar: "Siswa menjadi tukang kayu. Sepuluh pos selesai, sepuluh koin terkumpul.",
      labelDaftar: "Sepuluh pos bengkel",
      kolom: 1,
      item: [
        {
          nama: "Meja kerja",
          singkat: "Ukur, ubah, timbang",
          uraian: "Level 1: penggaris untuk papan 80 cm. Level 3: 3 m = 300 cm. Level 5: 2 × 150 cm = 300 cm = 3 m, dan 1 kg = 1.000 g.",
          contoh: "Salah ukur tidak mengurangi koin. Coba lagi.",
        },
      ],
      kuis: [
        ...kuisDariMisi(MISI_MTK3_UKUR),
        { pertanyaan: "Alat untuk papan 75 cm?", alias: ["penggaris"] },
        { pertanyaan: "4 m sama dengan berapa cm?", alias: ["400"] },
        { pertanyaan: "Pasangkan lapangan, pensil, dan karung beras.", alias: ["roda", "penggaris", "timbangan"] },
        { pertanyaan: "Urutkan 500 g, 1 kg 200 g, 2 kg, dan 3.000 g.", alias: ["500 g", "1200", "2000", "3000"] },
        { pertanyaan: "Periksa tiga pernyataan bengkel.", alias: ["benar", "salah"] },
        { pertanyaan: "Mana pasangan yang tidak cocok?", alias: ["jalan"] },
        { pertanyaan: "Mana nilai yang paling besar?", alias: ["3 m"] },
        { pertanyaan: "Deret 50, 100, 150, berikutnya?", alias: ["200"] },
        { pertanyaan: "Tiga ratus sentimeter sama dengan berapa meter?", alias: ["tiga meter"] },
        { pertanyaan: "Hitung 2 papan kali 150 cm, lalu ubah ke meter.", alias: ["300", "3"] },
      ],
      voice: [[
        "Kalian menjadi tukang kayu di bengkel. Pelanggan memesan kayu dengan ukuran tertentu.",
        "Pilih alat ukur yang tepat, ukur dengan benar, dan ubah satuan kalau pesanannya berbeda.",
        "Sepuluh pos selesai, sepuluh koin terkumpul, bengkel besar terbuka.",
      ]],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal satuan, alat ukur, dan konversi panjang serta berat.",
      labelDaftar: "Lembar evaluasi pengukuran",
      kolom: 1,
      item: [
        { nama: "Tangga satuan", singkat: "Kali dan bagi", uraian: "6 m = 600 cm. 7 kg = 7.000 g. 2 kg 300 g = 2.300 g.", contoh: "Samakan satuan sebelum membandingkan." },
        { nama: "Tiga pesanan", singkat: "Panjang dan berat", uraian: "2 m = 200 cm. Tali 250 cm lebih panjang. 3 kg = 3.000 g.", contoh: "Baca lagi bagian yang belum dijawab." },
      ],
      kuis: [
        { pertanyaan: "Hitung 6 m, 800 cm, dan 4 km.", alias: ["600", "8", "4000"] },
        { pertanyaan: "Satuan untuk tinggi pintu?", alias: ["m"] },
        { pertanyaan: "5.000 gram sama dengan berapa kilogram?", alias: ["lima kilogram"] },
        { pertanyaan: "Apakah lapangan diukur dengan penggaris?", alias: ["salah"] },
        { pertanyaan: "Pasangkan kain, pensil, dan lapangan.", alias: ["pita", "penggaris", "roda"] },
        { pertanyaan: "Hitung 7 kg, 9.000 g, dan 2 kg 300 g.", alias: ["7000", "9", "2300"] },
        { pertanyaan: "Mana nilai yang paling besar?", alias: ["2 m"] },
        { pertanyaan: "Urutkan 1 m, 250 cm, 3.000 mm, dan 2 km.", alias: ["1 m", "250 cm", "3000 mm", "2 km"] },
        { pertanyaan: "Alat ukur untuk karung beras, dan mengapa?", alias: ["timbangan besar", "berat"] },
        { pertanyaan: "Tiga pesanan: 2 m, 250 cm, dan 3 kg. Tulis panjang A dalam cm, pesanan yang lebih panjang, dan berat C dalam gram.", alias: ["200", "b", "3000"] },
      ],
      voice: [[
        "Saatnya kalian mengerjakan sendiri. Ada sepuluh soal pengukuran panjang dan berat.",
        "Turun tangga dikali sepuluh, naik tangga dibagi sepuluh, dan satu kilogram sama dengan seribu gram.",
        "Jangan terburu-buru, dan periksa lagi jawabanmu.",
      ]],
    },
  ],
};
