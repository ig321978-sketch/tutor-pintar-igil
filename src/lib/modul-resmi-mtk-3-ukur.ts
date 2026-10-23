import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK3_UKUR } from "@/lib/misi-mtk-3-ukur";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK3_UKUR = "Bab 3: Pengukuran Panjang dan Berat";

export const MODUL_MTK3_UKUR: ModulResmiPai = {
  id: "mtk-3-ukur",
  judul: JUDUL_MTK3_UKUR,
  pola: /^bab 3: pengukuran panjang dan berat$/,
  motivasi:
    "Nisa, Farhan, dan Cinta belajar mengukur panjang dan berat bersama burung hantu Igil di jalan sehat lapangan sekolah.",
  kunciJawaban: "A,C,B,B,C,D,B,C,B,B",
  sketsaKartu: [
    "Nisa, Farhan, dan Cinta mengukur jalur dan menimbang botol bersama burung hantu Igil.",
    "Satuan panjang, satuan berat, alat ukur, dan konversi.",
    "Sepuluh pos pola di jalan sehat.",
    "Poin penting dan lembar evaluasi pengukuran.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
Satuan paling pas untuk panjang penghapus...
A) cm
B) m
C) km
D) kg`,
    `[Soal 2 - PG - Tipe: MOTS]
5 m sama dengan...
A) 50 cm
B) 5.000 cm
C) 500 cm
D) 5 cm`,
    `[Soal 3 - PG - Tipe: HOTS]
Farhan berkata 1 kg = 100 g. Pernyataannya...
A) Benar
B) Salah, karena 1 kg = 1.000 g
C) Tidak bisa dibandingkan
D) 1 kg = 10 g`,
    `[Soal 4 - PG - Tipe: MOTS]
Alat untuk mengukur panjang pagar...
A) Penggaris
B) Meteran
C) Timbangan
D) Gram`,
    `[Soal 5 - PG - Tipe: HOTS]
⬜ km = 3.000 m. Angka yang hilang...
A) 30
B) 300
C) 3
D) 3.000`,
    `[Soal 6 - PG - Tipe: MOTS]
Mana yang merupakan satuan berat?
A) cm
B) m
C) km
D) g`,
    `[Soal 7 - PG - Tipe: MOTS]
6 kg sama dengan...
A) 60 g
B) 6.000 g
C) 600 g
D) 6 g`,
    `[Soal 8 - PG - Tipe: MOTS]
Deret naik 100: 100 – 200 – 300 – ⬜. Berikutnya...
A) 301
B) 350
C) 400
D) 500`,
    `[Soal 9 - PG - Tipe: HOTS]
2 km dan 900 m. Yang lebih jauh...
A) 900 m
B) 2 km
C) Sama jauh
D) 90 m`,
    `[Soal 10 - PG - Tipe: HOTS]
Tiga tas. Tas A 3 kg, tas B 2.000 g, tas C 4 kg. Paling ringan...
A) Tas A
B) Tas B
C) Tas C
D) Ketiganya sama`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar: "Nisa, Farhan, Cinta, dan Igil mengukur jalur jalan sehat. Infografis tiap sub-bab ada di dalam materi.",
      labelDaftar: "Panjang, berat, alat, dan hubungan satuan",
      kolom: 1,
      item: [
        {
          nama: "Satuan panjang",
          singkat: "cm, m, km",
          uraian: "Buku tulis 30 cm. Jalur sekitar 2 m. Putaran jauh memakai km. Ujung penggaris di angka 0.",
          contoh: "Pilih satuan sesuai panjangnya.",
        },
        {
          nama: "Satuan berat",
          singkat: "g dan kg",
          uraian: "Biskuit sekitar 30 g. Tepung memakai g. Jerigen air 5 kg. Karung beras memakai kg.",
          contoh: "Ringan memakai g. Berat memakai kg.",
        },
        {
          nama: "Alat ukur",
          singkat: "Sesuai benda",
          uraian: "Penggaris untuk buku. Meteran untuk pintu dan meja. Timbangan untuk botol. Mulai dari angka 0.",
          contoh: "Alat mengikuti yang diukur.",
        },
        {
          nama: "Hubungan satuan panjang",
          singkat: "100 dan 1.000",
          uraian: "100 cm = 1 m. 5.000 cm = 50 m. 1 km = 1.000 m.",
          contoh: "Dari m ke cm, kali 100.",
        },
        {
          nama: "Hubungan satuan berat",
          singkat: "1.000 gram",
          uraian: "1 kg = 1.000 g. Satu ons ada 100 g. 5.000 g = 5 kg.",
          contoh: "Dari kg ke g, kali 1.000.",
        },
      ],
      kuis: [
        { pertanyaan: "Panjang tali sepatu 25. Ucapkan satuannya.", alias: ["cm"] },
        { pertanyaan: "Lebar pintu 1. Tulis satuannya.", alias: ["m"] },
        { pertanyaan: "Apel 150. Ucapkan satuannya.", alias: ["g"] },
        { pertanyaan: "Tas 3. Tulis satuannya.", alias: ["kg"] },
        { pertanyaan: "Mengukur lapangan. Ucapkan alatnya.", alias: ["meteran"] },
        { pertanyaan: "Menimbang tas. Tulis alatnya.", alias: ["timbangan"] },
        { pertanyaan: "3 m sama dengan berapa cm?", alias: ["300"] },
        { pertanyaan: "4 km dalam meter.", alias: ["4000"] },
        { pertanyaan: "3 kg sama dengan berapa g?", alias: ["3000"] },
        { pertanyaan: "5.000 g dalam kg.", alias: ["5"] },
        { pertanyaan: "Satu putaran lapangan memakai satuan apa?", alias: ["m"] },
        { pertanyaan: "Pasangkan 2 m, 3 kg, 1 km, dan 4 m.", alias: ["200", "3000", "1000", "400"] },
        { pertanyaan: "Susun cm, m, dan km.", alias: ["cm", "m", "km"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "Mana yang bukan satuan panjang?", alias: ["kg"] },
      ],
      voice: [
        [
          "Hari Sabtu di lapangan sekolah. Pos jalan sehat Igil ramai.",
          "Kita mengukur panjang dan berat, lalu mengubah satuannya.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Latihan di dalam sub-bab",
      pengantar: "Papan infografis sudah masuk ke tiap sub-bab materi. Latihan ini memilih satuan, alat, dan mengubah panjang serta berat.",
      labelDaftar: "Latihan mengikuti lima sub-bab",
      kolom: 1,
      item: [
        {
          nama: "Panjang",
          singkat: "Tiga satuan",
          uraian: "Penghapus memakai cm. Kelas memakai m. Dua kota memakai km.",
          contoh: "Lihat bendanya dulu.",
        },
        {
          nama: "Berat",
          singkat: "Dua satuan",
          uraian: "Kue memakai g. Ember air memakai kg.",
          contoh: "1 kg = 1.000 g.",
        },
        {
          nama: "Alat",
          singkat: "Tiga alat",
          uraian: "Penghapus memakai penggaris. Pagar memakai meteran. Tas memakai timbangan.",
          contoh: "Alat mengikuti benda.",
        },
        {
          nama: "Ubah panjang",
          singkat: "Kali 100 atau 1.000",
          uraian: "5 m = 500 cm. 2 km = 2.000 m.",
          contoh: "Meter dikali 100. Kilometer dikali 1.000.",
        },
        {
          nama: "Ubah berat",
          singkat: "Kali atau bagi 1.000",
          uraian: "4 kg = 4.000 g. 6.000 g = 6 kg.",
          contoh: "Kilogram dikali 1.000 menjadi gram.",
        },
      ],
      kuis: [
        { pertanyaan: "Panjang meja 120. Ucapkan satuannya.", alias: ["cm"] },
        { pertanyaan: "Jarak dua kota 12. Tulis satuannya.", alias: ["km"] },
        { pertanyaan: "Kue 80. Ucapkan satuannya.", alias: ["g"] },
        { pertanyaan: "Ember air 6. Tulis satuannya.", alias: ["kg"] },
        { pertanyaan: "Mengukur penghapus. Ucapkan alatnya.", alias: ["penggaris"] },
        { pertanyaan: "Mengukur pagar. Tulis alatnya.", alias: ["meteran"] },
        { pertanyaan: "6 m sama dengan berapa cm?", alias: ["600"] },
        { pertanyaan: "3 km dalam meter.", alias: ["3000"] },
        { pertanyaan: "2 kg sama dengan berapa g?", alias: ["2000"] },
        { pertanyaan: "6.000 g dalam kg.", alias: ["6"] },
        { pertanyaan: "7 m sama dengan berapa cm?", alias: ["700"] },
        { pertanyaan: "Pasangkan 5 m, 2 km, 4 kg, dan 8 m.", alias: ["500", "2000", "4000", "800"] },
        { pertanyaan: "Susun dari yang paling ringan.", alias: ["500 g", "1 kg", "2 kg", "3000 g"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "9 m sama dengan berapa cm?", alias: ["900"] },
      ],
      voice: [
        [
          "Papan ini merangkum cara mengukur. Pilih satuan, pilih alat, lalu ubah bilangannya.",
          "Satu meter ada 100 sentimeter. Satu kilometer ada 1.000 meter. Satu kilogram ada 1.000 gram.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Pos Jalan Sehat Igil",
      pengantar: "Sepuluh soal pola: deret, angka hilang, analogi, dan mana yang beda.",
      labelDaftar: "Sepuluh soal pola",
      kolom: 1,
      item: [
        {
          nama: "Soal pola",
          singkat: "Deret dan yang beda",
          uraian: "Cari angka berikutnya, angka yang hilang, atau satuan yang tidak cocok. Sepuluh pos, sepuluh stempel.",
          contoh: "Salah boleh diulang. Stempel tidak berkurang.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK3_UKUR),
      voice: [
        [
          "Sepuluh soal pola. Cari angka berikutnya, angka yang hilang, atau yang beda.",
          "Pilih satu pos, lalu jawab. Sepuluh stempel menutup jalan sehat.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal panjang, berat, alat, dan konversi.",
      labelDaftar: "Lembar evaluasi pengukuran",
      kolom: 1,
      item: [
        {
          nama: "Ubah dan bandingkan",
          singkat: "Satuan sama",
          uraian: "8 m = 800 cm. 7.000 g = 7 kg. 1 km lebih jauh dari 2 m.",
          contoh: "Ubah dulu, baru bandingkan.",
        },
        {
          nama: "Tiga botol",
          singkat: "Paling berat",
          uraian: "Botol A 2 kg, botol B 500 g, botol C 1 kg. Botol A paling berat.",
          contoh: "2 kg = 2.000 g.",
        },
      ],
      kuis: [
        { pertanyaan: "8 m dalam cm.", alias: ["800"] },
        { pertanyaan: "Alat untuk menimbang tas?", alias: ["timbangan"] },
        { pertanyaan: "4 kg sama dengan berapa g?", alias: ["4000"] },
        { pertanyaan: "Mana yang paling jauh?", alias: ["1 km"] },
        { pertanyaan: "Pasangkan 6 m, 1 km, 3 kg, dan 9 m.", alias: ["600", "1000", "3000", "900"] },
        { pertanyaan: "7.000 g dalam kg.", alias: ["7"] },
        { pertanyaan: "Susun dari yang paling ringan.", alias: ["200 g", "1 kg", "1500 g", "2 kg"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "Alat untuk mengukur lapangan?", alias: ["meteran"] },
        { pertanyaan: "Botol mana yang paling berat?", alias: ["botol a", "2 kg"] },
      ],
      voice: [
        [
          "Saatnya kalian mengerjakan sendiri. Ada sepuluh soal pengukuran.",
          "Ada satuan panjang, satuan berat, alat ukur, dan konversi.",
          "Kalau ragu, ingat 100 dan 1.000. Periksa lagi jawabanmu.",
        ],
      ],
    },
  ],
};
