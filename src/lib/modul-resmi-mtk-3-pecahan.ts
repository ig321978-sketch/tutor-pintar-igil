import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK3_PECAHAN } from "@/lib/misi-mtk-3-pecahan";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK3_PECAHAN = "Bab 5: Pecahan Sederhana";

export const MODUL_MTK3_PECAHAN: ModulResmiPai = {
  id: "mtk-3-pecahan",
  judul: JUDUL_MTK3_PECAHAN,
  pola: /^bab 5: pecahan sederhana$/,
  motivasi:
    "Nisa, Farhan, dan Cinta belajar pecahan setengah, sepertiga, dan seperempat bersama burung hantu Igil di studio kertas lipat.",
  kunciJawaban: "A,C,B,B,B,C,B,A,B,B",
  sketsaKartu: [
    "Nisa, Farhan, dan Cinta melipat kertas hiasan bersama burung hantu Igil.",
    "Setengah, sepertiga, seperempat, pembilang, penyebut, dan perbandingan.",
    "Sepuluh pos pola di studio kertas lipat.",
    "Poin penting dan lembar evaluasi pecahan.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
Satu bagian dari dua bagian sama besar. Lambangnya...
A) 1/2
B) 1/3
C) 1/4
D) 2`,
    `[Soal 2 - PG - Tipe: MOTS]
Satu bagian dari tiga bagian sama besar. Lambangnya...
A) 1/2
B) 1/4
C) 1/3
D) 3`,
    `[Soal 3 - PG - Tipe: MOTS]
Pada pecahan 1/4, penyebutnya...
A) 1
B) 4
C) 2
D) 3`,
    `[Soal 4 - PG - Tipe: HOTS]
Farhan berkata 1/4 lebih besar dari 1/2 karena 4 lebih besar dari 2. Pernyataannya...
A) Benar
B) Salah, karena bagian 1/4 lebih kecil
C) Tidak bisa dibandingkan
D) 1/4 sama dengan 1/2`,
    `[Soal 5 - PG - Tipe: HOTS]
Kertas dibagi 4 sama besar. Dua bagian diwarnai. Pecahannya...
A) 1/4
B) 2/4
C) 4/2
D) 2/2`,
    `[Soal 6 - PG - Tipe: HOTS]
Dari kertas yang sama, bagian paling kecil adalah...
A) 1/2
B) 1/3
C) 1/4
D) 2/2`,
    `[Soal 7 - PG - Tipe: MOTS]
Pembilang pecahan 1/3 adalah...
A) 3
B) 1
C) 2
D) 4`,
    `[Soal 8 - PG - Tipe: MOTS]
Deret bagian: 2 – 3 – 4 – ⬜. Berikutnya...
A) 5
B) 6
C) 8
D) 1`,
    `[Soal 9 - PG - Tipe: MOTS]
1/2 dan 1/3 dari kertas yang sama. Yang lebih besar...
A) 1/3
B) 1/2
C) Sama besar
D) 1/4`,
    `[Soal 10 - PG - Tipe: HOTS]
Tiga kertas sama besar. Kertas A diwarnai 1/4, kertas B 1/2, kertas C 1/3. Bagian berwarna paling besar ada di...
A) Kertas A
B) Kertas B
C) Kertas C
D) Ketiganya sama`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar: "Nisa, Farhan, Cinta, dan Igil melipat kertas hiasan pentas.",
      labelDaftar: "Lima adegan kertas lipat",
      kolom: 1,
      item: [
        {
          nama: "Pecahan setengah",
          singkat: "Satu dari dua",
          uraian: "Kertas dilipat dua sama besar. Satu bagian diwarnai: 1/2.",
          contoh: "Dua bagian sama, ambil satu.",
        },
        {
          nama: "Pecahan sepertiga",
          singkat: "Satu dari tiga",
          uraian: "Kertas dibagi tiga sama besar. Satu bagian diwarnai: 1/3.",
          contoh: "Tiga bagian sama, ambil satu.",
        },
        {
          nama: "Pecahan seperempat",
          singkat: "Satu dari empat",
          uraian: "Kertas dibagi empat sama besar. Satu bagian diwarnai: 1/4.",
          contoh: "Empat bagian sama, ambil satu.",
        },
        {
          nama: "Pembilang dan penyebut",
          singkat: "Atas dan bawah",
          uraian: "Pada 1/3, pembilang 1 dan penyebut 3.",
          contoh: "Pembilang di atas. Penyebut di bawah.",
        },
        {
          nama: "Membandingkan pecahan",
          singkat: "Bagian mana lebih besar",
          uraian: "Kertas yang sama: 1/2 > 1/3 > 1/4.",
          contoh: "Penyebut makin besar, bagiannya makin kecil.",
        },
      ],
      kuis: [
        { pertanyaan: "Kertas dilipat dua. Satu bagian diwarnai. Ucapkan pecahannya.", alias: ["1/2"] },
        { pertanyaan: "Tulis pecahan dua bagian, satu berwarna.", alias: ["1/2"] },
        { pertanyaan: "Kertas dibagi tiga. Satu bagian diwarnai. Ucapkan pecahannya.", alias: ["1/3"] },
        { pertanyaan: "Tulis pecahan tiga bagian, satu berwarna.", alias: ["1/3"] },
        { pertanyaan: "Kertas dibagi empat. Satu bagian diwarnai. Ucapkan pecahannya.", alias: ["1/4"] },
        { pertanyaan: "Tulis pecahan empat bagian, satu berwarna.", alias: ["1/4"] },
        { pertanyaan: "Pada 1/4, ucapkan pembilang dan penyebut.", alias: ["1", "4"] },
        { pertanyaan: "Tulis pecahan dua bagian beserta pembilang dan penyebut.", alias: ["1/2", "1", "2"] },
        { pertanyaan: "1/2 dan 1/3. Ucapkan yang lebih besar.", alias: ["1/2"] },
        { pertanyaan: "Tulis pecahan yang lebih besar dari dua kertas.", alias: ["1/3"] },
        { pertanyaan: "Kertas dibagi 2, satu diwarnai.", alias: ["1/2"] },
        { pertanyaan: "Pasangkan 1 dari 2, 1 dari 3, 1 dari 4, dan 2 dari 4.", alias: ["1/2", "1/3", "1/4", "2/4"] },
        { pertanyaan: "Susun 1/4, 1/3, dan 1/2.", alias: ["1/4", "1/3", "1/2"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "Mana yang bukan 1/2?", alias: ["1/3"] },
      ],
      voice: [
        [
          "Hari Jumat di studio kertas lipat. Hiasan pentas dibagi sama besar.",
          "Setengah, sepertiga, dan seperempat adalah satu bagian dari keseluruhan.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis",
      pengantar: "Papan studio: contoh, cara, dan perbandingan pecahan.",
      labelDaftar: "Lima papan pecahan",
      kolom: 1,
      item: [
        {
          nama: "Setengah",
          singkat: "Satu dari dua",
          uraian: "2 bagian sama, 1 diwarnai. Pecahannya 1/2.",
          contoh: "Bagi dua, ambil satu.",
        },
        {
          nama: "Sepertiga",
          singkat: "Satu dari tiga",
          uraian: "3 bagian sama, 1 diwarnai. Pecahannya 1/3.",
          contoh: "Bagi tiga, ambil satu.",
        },
        {
          nama: "Seperempat",
          singkat: "Satu dari empat",
          uraian: "4 bagian sama, 1 diwarnai. Pecahannya 1/4.",
          contoh: "Bagi empat, ambil satu.",
        },
        {
          nama: "Nama kedua angka",
          singkat: "Pembilang dan penyebut",
          uraian: "Pada 1/2, pembilang 1 dan penyebut 2.",
          contoh: "Atas diambil. Bawah seluruhnya.",
        },
        {
          nama: "Urutan besar",
          singkat: "Kertas yang sama",
          uraian: "1/2 lebih besar dari 1/3. 1/3 lebih besar dari 1/4.",
          contoh: "Bandingkan hanya jika keseluruhannya sama.",
        },
      ],
      kuis: [
        { pertanyaan: "Pita dibagi dua. Satu bagian diambil. Ucapkan pecahannya.", alias: ["1/2"] },
        { pertanyaan: "Tulis pecahan dua bagian, satu berwarna.", alias: ["1/2"] },
        { pertanyaan: "Pita dibagi tiga. Satu bagian diambil. Ucapkan pecahannya.", alias: ["1/3"] },
        { pertanyaan: "Tulis pecahan tiga bagian, satu berwarna.", alias: ["1/3"] },
        { pertanyaan: "Pita dibagi empat. Satu bagian diambil. Ucapkan pecahannya.", alias: ["1/4"] },
        { pertanyaan: "Tulis pecahan empat bagian, satu berwarna.", alias: ["1/4"] },
        { pertanyaan: "Pada 1/2, ucapkan pembilang dan penyebut.", alias: ["1", "2"] },
        { pertanyaan: "Tulis pecahan empat bagian beserta pembilang dan penyebut.", alias: ["1/4", "1", "4"] },
        { pertanyaan: "1/3 dan 1/4. Ucapkan yang lebih besar.", alias: ["1/3"] },
        { pertanyaan: "Tulis pecahan yang lebih kecil dari dua kertas.", alias: ["1/4"] },
        { pertanyaan: "Bagian paling besar dari kertas yang sama?", alias: ["1/2"] },
        { pertanyaan: "Pasangkan 1/2, 1/3, 1/4, dan 2/4.", alias: ["setengah", "sepertiga", "seperempat"] },
        { pertanyaan: "Susun dari yang paling besar.", alias: ["1/2", "1/3", "1/4"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "Empat bagian, ambil satu. Ditulis apa?", alias: ["1/4"] },
      ],
      voice: [
        [
          "Papan ini merangkum cara membaca pecahan. Bagian yang diambil di atas, semua bagian di bawah.",
          "Kalau kertasnya sama, penyebut yang lebih besar membuat potongan yang lebih kecil.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Pos Kertas Lipat Igil",
      pengantar: "Sepuluh soal pola: deret, angka hilang, analogi, dan mana yang beda.",
      labelDaftar: "Sepuluh soal pola",
      kolom: 1,
      item: [
        {
          nama: "Soal pola",
          singkat: "Deret dan yang beda",
          uraian: "Cari angka berikutnya, angka yang hilang, atau pecahan yang tidak cocok. Sepuluh pos, sepuluh stempel.",
          contoh: "Salah boleh diulang. Stempel tidak berkurang.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK3_PECAHAN),
      voice: [
        [
          "Sepuluh soal pola. Cari angka berikutnya, angka yang hilang, atau yang beda.",
          "Pilih satu pos, lalu jawab. Sepuluh stempel membuka hiasan pentas.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal pecahan sederhana dan perbandingan.",
      labelDaftar: "Lembar evaluasi pecahan",
      kolom: 1,
      item: [
        {
          nama: "Membaca dan membandingkan",
          singkat: "Satu bagian",
          uraian: "1/2, 1/3, dan 1/4. Pembilang di atas. 1/2 paling besar jika kertasnya sama.",
          contoh: "Hitung bagiannya dulu, baru bandingkan.",
        },
        {
          nama: "Tiga pita",
          singkat: "Paling besar",
          uraian: "Pita A 1/2, pita B 1/4, pita C 1/3. Pita A paling besar.",
          contoh: "Bandingkan ketiga pecahan pada pita yang sama panjang.",
        },
      ],
      kuis: [
        { pertanyaan: "Tulis pecahan dua bagian, satu berwarna.", alias: ["1/2"] },
        { pertanyaan: "Kertas dibagi 3, satu diwarnai.", alias: ["1/3"] },
        { pertanyaan: "Pada 1/3, ucapkan pembilang dan penyebut.", alias: ["1", "3"] },
        { pertanyaan: "Bagian paling kecil dari kertas yang sama?", alias: ["1/4"] },
        { pertanyaan: "Pasangkan 1 dari 2, 1 dari 3, 1 dari 4, dan 2 dari 3.", alias: ["1/2", "1/3", "1/4", "2/3"] },
        { pertanyaan: "Tulis pecahan yang lebih besar dari 1/2 dan 1/3.", alias: ["1/2"] },
        { pertanyaan: "Susun dari yang paling kecil.", alias: ["1/4", "1/3", "1/2"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "1/2 dan 1/4. Ucapkan yang lebih besar.", alias: ["1/2"] },
        { pertanyaan: "Pita mana yang paling besar?", alias: ["pita a", "1/2"] },
      ],
      voice: [
        [
          "Saatnya kalian mengerjakan sendiri. Ada sepuluh soal pecahan.",
          "Ada setengah, sepertiga, seperempat, dan perbandingan bagian.",
          "Kalau ragu, hitung semua bagian dulu. Periksa lagi jawabanmu.",
        ],
      ],
    },
  ],
};
