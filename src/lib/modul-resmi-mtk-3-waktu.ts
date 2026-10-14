import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK3_WAKTU } from "@/lib/misi-mtk-3-waktu";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK3_WAKTU = "Bab 7: Waktu dan Durasi";

export const MODUL_MTK3_WAKTU: ModulResmiPai = {
  id: "mtk-3-waktu",
  judul: JUDUL_MTK3_WAKTU,
  pola: /^bab 7: waktu dan durasi$/,
  motivasi:
    "Nisa, Farhan, dan Cinta membaca jam, menghitung lama latihan, dan menandai tanggal pentas bersama burung hantu Igil di aula.",
  kunciJawaban: "B,C,B,B,B,C,B,C,B,B",
  sketsaKartu: [
    "Nisa, Farhan, dan Cinta latihan pentas di aula bersama burung hantu Igil.",
    "Membaca jam, menit dan detik, lama kegiatan, dan kalender.",
    "Sepuluh pos pola di panggung.",
    "Poin penting dan lembar evaluasi waktu.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
Jarum panjang di angka 1. Itu sama dengan...
A) 1 menit
B) 5 menit
C) 10 menit
D) 60 menit`,
    `[Soal 2 - PG - Tipe: MOTS]
3 jam sama dengan...
A) 30 menit
B) 300 menit
C) 180 menit
D) 36 menit`,
    `[Soal 3 - PG - Tipe: HOTS]
Cinta berkata 1 menit = 100 detik. Pernyataannya...
A) Benar
B) Salah, karena 1 menit = 60 detik
C) Tidak bisa dibandingkan
D) 1 menit = 10 detik`,
    `[Soal 4 - PG - Tipe: MOTS]
Latihan mulai 08.15 dan selesai 08.40. Lamanya...
A) 15 menit
B) 25 menit
C) 40 menit
D) 55 menit`,
    `[Soal 5 - PG - Tipe: HOTS]
⬜ menit = 300 detik. Angka yang hilang...
A) 30
B) 5
C) 3
D) 300`,
    `[Soal 6 - PG - Tipe: MOTS]
Mana yang nama hari?
A) meter
B) gram
C) Senin
D) cm`,
    `[Soal 7 - PG - Tipe: MOTS]
4 menit sama dengan...
A) 40 detik
B) 240 detik
C) 400 detik
D) 24 detik`,
    `[Soal 8 - PG - Tipe: MOTS]
Deret naik 10: 10 – 20 – 30 – ⬜. Berikutnya...
A) 31
B) 35
C) 40
D) 50`,
    `[Soal 9 - PG - Tipe: HOTS]
2 jam dan 100 menit. Yang lebih lama...
A) 100 menit
B) 2 jam
C) Sama lama
D) 20 menit`,
    `[Soal 10 - PG - Tipe: HOTS]
Tiga lagu. Lagu A 90 menit, lagu B 1 jam, lagu C 2 jam. Paling singkat...
A) Lagu A
B) Lagu B
C) Lagu C
D) Ketiganya sama`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar: "Nisa, Farhan, Cinta, dan Igil latihan pentas di aula.",
      labelDaftar: "Lima adegan pentas",
      kolom: 1,
      item: [
        {
          nama: "Membaca jam",
          singkat: "Pendek dan panjang",
          uraian: "Jarum pendek menunjukkan jam. Jarum panjang di angka 6 berarti 30 menit.",
          contoh: "Angka pada jam dikali 5 menjadi menit.",
        },
        {
          nama: "Menit dan detik",
          singkat: "60",
          uraian: "1 menit = 60 detik. 3 menit = 180 detik. 2 jam = 120 menit.",
          contoh: "Kali 60.",
        },
        {
          nama: "Lama kegiatan",
          singkat: "Kurangi menit",
          uraian: "08.10 sampai 08.25 berlangsung 15 menit.",
          contoh: "Jika jamnya sama, kurangi menitnya.",
        },
        {
          nama: "Lewati jam",
          singkat: "Dua bagian",
          uraian: "07.45 sampai 08.00 berlangsung 15 menit.",
          contoh: "Hitung sampai jam bulat, lalu tambahkan.",
        },
        {
          nama: "Kalender",
          singkat: "7 hari",
          uraian: "Sabtu tanggal 17, lima hari setelah Senin tanggal 12. 1 minggu = 7 hari.",
          contoh: "Tanggal seminggu lagi ditambah 7.",
        },
      ],
      kuis: [
        { pertanyaan: "Jarum panjang di angka 6. Berapa menit?", alias: ["30"] },
        { pertanyaan: "Jarum pendek di 2, panjang di 12. Jam berapa?", alias: ["2"] },
        { pertanyaan: "3 menit sama dengan berapa detik?", alias: ["180"] },
        { pertanyaan: "2 jam dalam menit.", alias: ["120"] },
        { pertanyaan: "08.10 sampai 08.25. Berapa menit?", alias: ["15"] },
        { pertanyaan: "10.05 sampai 10.40. Berapa menit?", alias: ["35"] },
        { pertanyaan: "07.45 sampai 08.00. Berapa menit?", alias: ["15"] },
        { pertanyaan: "09.40 sampai 10.00. Berapa menit?", alias: ["20"] },
        { pertanyaan: "Tanggal 20 sampai 24. Berapa hari kemudian?", alias: ["4"] },
        { pertanyaan: "Tanggal 11 ditambah 7.", alias: ["18"] },
        { pertanyaan: "Jarum panjang di angka 3. Berapa menit?", alias: ["15"] },
        { pertanyaan: "Pasangkan 1 jam, 2 menit, 1 minggu, dan 3 jam.", alias: ["60", "120", "7", "180"] },
        { pertanyaan: "Susun detik, menit, dan jam.", alias: ["detik", "menit", "jam"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "Mana yang bukan satuan waktu?", alias: ["kg"] },
      ],
      voice: [
        [
          "Siang ini aula sekolah ramai. Pos panggung Igil menyiapkan pentas.",
          "Kita membaca jam, menghitung lama latihan, lalu menandai tanggalnya.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis",
      pengantar: "Papan pentas: contoh jam, lama kegiatan, dan kalender.",
      labelDaftar: "Lima papan waktu",
      kolom: 1,
      item: [
        {
          nama: "Jam",
          singkat: "Kali 5",
          uraian: "Panjang di 12 berarti tepat. Panjang di 6 berarti 30 menit.",
          contoh: "6 × 5 = 30.",
        },
        {
          nama: "60",
          singkat: "Menit dan detik",
          uraian: "4 menit = 240 detik. 2 jam = 120 menit.",
          contoh: "Kali 60.",
        },
        {
          nama: "Jam sama",
          singkat: "Kurangi",
          uraian: "13.10 sampai 13.45 berlangsung 35 menit.",
          contoh: "45 − 10 = 35.",
        },
        {
          nama: "Lewati jam",
          singkat: "Dua bagian",
          uraian: "04.55 sampai 05.20 berlangsung 25 menit.",
          contoh: "10 menit ke jam bulat, tambah 10 menit.",
        },
        {
          nama: "Minggu",
          singkat: "Tambah 7",
          uraian: "2 minggu = 14 hari. Tanggal 8 ditambah 7 menjadi 15.",
          contoh: "Seminggu lagi, tambah 7.",
        },
      ],
      kuis: [
        { pertanyaan: "Jarum panjang di angka 9. Berapa menit?", alias: ["45"] },
        { pertanyaan: "Jarum pendek di 7, panjang di 12. Jam berapa?", alias: ["7"] },
        { pertanyaan: "5 menit sama dengan berapa detik?", alias: ["300"] },
        { pertanyaan: "3 jam dalam menit.", alias: ["180"] },
        { pertanyaan: "11.20 sampai 11.50. Berapa menit?", alias: ["30"] },
        { pertanyaan: "14.15 sampai 14.40. Berapa menit?", alias: ["25"] },
        { pertanyaan: "06.40 sampai 07.00. Berapa menit?", alias: ["20"] },
        { pertanyaan: "15.45 sampai 16.00. Berapa menit?", alias: ["15"] },
        { pertanyaan: "3 minggu ada berapa hari?", alias: ["21"] },
        { pertanyaan: "Tanggal 9 ditambah 7.", alias: ["16"] },
        { pertanyaan: "4 menit sama dengan berapa detik?", alias: ["240"] },
        { pertanyaan: "Pasangkan 2 jam, 3 menit, 2 minggu, dan 1 jam.", alias: ["120", "180", "14", "60"] },
        { pertanyaan: "Susun dari yang paling singkat.", alias: ["15 menit", "1 jam", "90 menit", "2 jam"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "4 jam sama dengan berapa menit?", alias: ["240"] },
      ],
      voice: [
        [
          "Papan ini merangkum cara membaca waktu. Lihat jarumnya, lalu hitung lamanya.",
          "Satu jam ada 60 menit. Satu menit ada 60 detik. Satu minggu ada 7 hari.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Pos Panggung Igil",
      pengantar: "Sepuluh soal pola: deret, angka hilang, analogi, dan mana yang beda.",
      labelDaftar: "Sepuluh soal pola",
      kolom: 1,
      item: [
        {
          nama: "Soal pola",
          singkat: "Deret dan yang beda",
          uraian: "Cari angka berikutnya, angka yang hilang, atau yang tidak cocok. Sepuluh pos, sepuluh stempel.",
          contoh: "Salah boleh diulang. Stempel tidak berkurang.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK3_WAKTU),
      voice: [
        [
          "Sepuluh soal pola. Cari angka berikutnya, angka yang hilang, atau yang beda.",
          "Pilih satu pos, lalu jawab. Sepuluh stempel menutup latihan pentas.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal jam, lama kegiatan, dan kalender.",
      labelDaftar: "Lembar evaluasi waktu",
      kolom: 1,
      item: [
        {
          nama: "Ubah dan hitung",
          singkat: "Kali 60",
          uraian: "6 menit = 360 detik. 2 jam = 120 menit. 16.20 sampai 16.55 berlangsung 35 menit.",
          contoh: "Samakan satuannya sebelum membandingkan.",
        },
        {
          nama: "Tiga lagu",
          singkat: "Paling lama",
          uraian: "Lagu A 2 jam, lagu B 90 menit, lagu C 1 jam. Lagu A paling lama.",
          contoh: "2 jam = 120 menit.",
        },
      ],
      kuis: [
        { pertanyaan: "6 menit dalam detik.", alias: ["360"] },
        { pertanyaan: "Jarum panjang di angka 4. Berapa menit?", alias: ["20"] },
        { pertanyaan: "2 jam sama dengan berapa menit?", alias: ["120"] },
        { pertanyaan: "Mana yang paling lama?", alias: ["1 jam"] },
        { pertanyaan: "Pasangkan 3 jam, 4 menit, 1 minggu, dan 5 jam.", alias: ["180", "240", "7", "300"] },
        { pertanyaan: "16.20 sampai 16.55. Berapa menit?", alias: ["35"] },
        { pertanyaan: "Susun dari yang paling singkat.", alias: ["10 menit", "1 jam", "70 menit", "2 jam"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "09.00 sampai 09.30. Berapa menit?", alias: ["30"] },
        { pertanyaan: "Lagu mana yang paling lama?", alias: ["lagu a", "2 jam"] },
      ],
      voice: [
        [
          "Saatnya kalian mengerjakan sendiri. Ada sepuluh soal waktu.",
          "Ada membaca jam, lama kegiatan, dan kalender.",
          "Kalau ragu, ingat 5, 60, dan 7. Periksa lagi jawabanmu.",
        ],
      ],
    },
  ],
};
