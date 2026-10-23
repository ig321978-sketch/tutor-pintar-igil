import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK3_KALIMAT } from "@/lib/misi-mtk-3-kalimat";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK3_KALIMAT = "Bab 2: Kalimat Matematika";

export const MODUL_MTK3_KALIMAT: ModulResmiPai = {
  id: "mtk-3-kalimat",
  judul: JUDUL_MTK3_KALIMAT,
  pola: /^bab 2: kalimat matematika$/,
  motivasi:
    "Nisa, Farhan, dan Cinta mengisi kotak lampion bersama burung hantu Igil di pos lampion.",
  kunciJawaban: "A,B,C,B,C,A,D,B,C,A",
  sketsaKartu: [
    "Nisa, Farhan, dan Cinta mengisi kotak bersama burung hantu Igil.",
    "Kotak pada tambah, kurang, di depan, cek kalimat, dan soal cerita.",
    "Sepuluh pos lampion.",
    "Poin penting dan lembar evaluasi kalimat.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
45 + kotak = 72. Isi kotak...
A) 27
B) 37
C) 117
D) 17`,
    `[Soal 2 - PG - Tipe: MOTS]
80 − kotak = 35. Isi kotak...
A) 55
B) 45
C) 115
D) 35`,
    `[Soal 3 - PG - Tipe: MOTS]
Kotak + 18 = 50. Isi kotak...
A) 68
B) 42
C) 32
D) 22`,
    `[Soal 4 - PG - Tipe: MOTS]
24 + 16 = 40. Kalimat ini...
A) Salah
B) Benar
C) Belum bisa dihitung
D) Kotaknya 8`,
    `[Soal 5 - PG - Tipe: HOTS]
Nisa punya 36 lampion. Ia ingin 51. Kalimat yang tepat...
A) 51 + kotak = 36
B) 36 − kotak = 51
C) 36 + kotak = 51
D) Kotak − 36 = 51`,
    `[Soal 6 - PG - Tipe: HOTS]
100 − kotak = 64. Isi kotak...
A) 36
B) 46
C) 164
D) 26`,
    `[Soal 7 - PG - Tipe: HOTS]
Mana kalimat yang hasilnya tidak cocok?
A) 12 + 8 = 20
B) 30 − 10 = 20
C) 15 + 6 = 21
D) 25 + 5 = 35`,
    `[Soal 8 - PG - Tipe: HOTS]
Kotak − 14 = 26. Isi kotak...
A) 12
B) 40
C) 30
D) 14`,
    `[Soal 9 - PG - Tipe: MOTS]
Ada 53 pita. Terpakai 28. Sisanya...
A) 35
B) 15
C) 25
D) 81`,
    `[Soal 10 - PG - Tipe: HOTS]
47 + kotak = 70 ditulis 33. Isi kotak yang benar...
A) 23
B) 33
C) 17
D) 117`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar: "Nisa, Farhan, Cinta, dan Igil mengisi kotak di pos lampion.",
      labelDaftar: "Lima adegan lampion",
      kolom: 1,
      item: [
        { nama: "Kotak tambah", singkat: "Jumlah dikurangi", uraian: "20 + kotak = 35. Kotaknya 15.", contoh: "Kurangkan jumlah dengan yang sudah ada." },
        { nama: "Kotak kurang", singkat: "Depan dikurangi sisa", uraian: "40 − kotak = 25. Kotaknya 15.", contoh: "Kurangkan bilangan depan dengan sisanya." },
        { nama: "Kotak di depan", singkat: "Cari yang belum ada", uraian: "Kotak − 8 = 14. Kotaknya 22.", contoh: "Jumlahkan sisa dengan yang dikurangkan." },
        { nama: "Cek kalimat", singkat: "Hitung lalu bandingkan", uraian: "18 + 7 = 25 benar. 20 + 9 = 30 salah.", contoh: "Hasil hitung harus sama dengan yang tertulis." },
        { nama: "Soal cerita", singkat: "Ubah jadi kalimat", uraian: "Punya 10, jadi 16. Kalimatnya 10 + kotak = 16.", contoh: "Tulis kalimatnya, baru cari kotak." },
      ],
      kuis: [
        { pertanyaan: "30 + kotak = 46. Isi kotak?", alias: ["16"] },
        { pertanyaan: "45 + kotak = 72. Isi kotak?", alias: ["27"] },
        { pertanyaan: "80 − kotak = 55. Isi kotak?", alias: ["25"] },
        { pertanyaan: "90 − kotak = 36. Isi kotak?", alias: ["54"] },
        { pertanyaan: "Kotak + 14 = 40. Isi kotak?", alias: ["26"] },
        { pertanyaan: "Kotak − 17 = 20. Isi kotak?", alias: ["37"] },
        { pertanyaan: "24 + 6 = 30. Benar atau salah?", alias: ["benar"] },
        { pertanyaan: "15 + 8 = 24. Benar atau salah?", alias: ["salah"] },
        { pertanyaan: "28 − kotak = 19. Isi kotak?", alias: ["9"] },
        { pertanyaan: "33 + kotak = 50. Isi kotak?", alias: ["17"] },
        { pertanyaan: "52 + kotak = 70. Isi kotak?", alias: ["18"] },
        { pertanyaan: "Pasangkan kalimat dan isi kotaknya.", alias: ["9", "15", "12"] },
        { pertanyaan: "Susun langkah 36 + kotak = 50.", alias: ["36 + kotak = 50", "50 − 36", "kotak = 14"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "16 lampion ditambah sampai 29. Kalimatnya?", alias: ["16 + kotak = 29"] },
      ],
      voice: [["Di pos lampion, kotak kosong diisi dengan hitungan. Tambah, kurang, atau cek dulu kalimatnya."]],
    },
    {
      kode: "B",
      judul: "B. Infografis",
      pengantar: "Papan kotak: tambah, kurang, di depan, cek, dan cerita.",
      labelDaftar: "Lima papan kotak",
      kolom: 1,
      item: [
        { nama: "Tambah", singkat: "28 + kotak = 45", uraian: "45 − 28 = 17.", contoh: "Kurangkan jumlah dengan yang sudah ada." },
        { nama: "Kurang", singkat: "75 − kotak = 40", uraian: "75 − 40 = 35.", contoh: "Kurangkan bilangan depan dengan sisanya." },
        { nama: "Di depan", singkat: "Kotak − 9 = 21", uraian: "21 + 9 = 30.", contoh: "Jumlahkan sisa dengan yang dikurangkan." },
        { nama: "Cek", singkat: "Bandingkan hasil", uraian: "22 + 18 = 40 benar. 30 + 9 = 40 salah.", contoh: "Hitung, lalu bandingkan." },
        { nama: "Cerita", singkat: "19 jadi 32", uraian: "19 + kotak = 32. Kotaknya 13.", contoh: "Ubah cerita menjadi kalimat." },
      ],
      kuis: [
        { pertanyaan: "34 + kotak = 50. Isi kotak?", alias: ["16"] },
        { pertanyaan: "56 + kotak = 80. Isi kotak?", alias: ["24"] },
        { pertanyaan: "90 − kotak = 62. Isi kotak?", alias: ["28"] },
        { pertanyaan: "83 − kotak = 47. Isi kotak?", alias: ["36"] },
        { pertanyaan: "Kotak + 13 = 40. Isi kotak?", alias: ["27"] },
        { pertanyaan: "Kotak − 12 = 25. Isi kotak?", alias: ["37"] },
        { pertanyaan: "35 + 15 = 50. Benar atau salah?", alias: ["benar"] },
        { pertanyaan: "46 − 8 = 36. Benar atau salah?", alias: ["salah"] },
        { pertanyaan: "44 − kotak = 29. Isi kotak?", alias: ["15"] },
        { pertanyaan: "Kotak + 21 = 60. Isi kotak?", alias: ["39"] },
        { pertanyaan: "67 + kotak = 90. Isi kotak?", alias: ["23"] },
        { pertanyaan: "Pasangkan kalimat dan isi kotaknya.", alias: ["12", "15", "21"] },
        { pertanyaan: "Susun langkah 80 − kotak = 53.", alias: ["80 − kotak = 53", "80 − 53", "kotak = 27"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "Sudah 31, butuh 58. Kalimatnya?", alias: ["31 + kotak = 58"] },
      ],
      voice: [["Papan ini menunjukkan cara mengisi kotak. Kurangkan atau jumlahkan sesuai tempat kotaknya."]],
    },
    {
      kode: "C",
      judul: "C. Pos Lampion Igil",
      pengantar: "Sepuluh soal kotak: tambah, kurang, analogi, dan kalimat yang beda.",
      labelDaftar: "Sepuluh soal lampion",
      kolom: 1,
      item: [
        {
          nama: "Soal kotak",
          singkat: "Isi dan yang beda",
          uraian: "Cari isi kotak, kalimat yang tidak cocok, atau hasil yang keliru.",
          contoh: "Salah boleh diulang. Lampion tidak berkurang.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK3_KALIMAT),
      voice: [["Sepuluh pos lampion. Pilih satu, lalu isi kotaknya."]],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal kalimat matematika dan persamaan.",
      labelDaftar: "Lembar evaluasi kalimat",
      kolom: 1,
      item: [
        {
          nama: "Evaluasi",
          singkat: "Sepuluh soal",
          uraian: "Mengisi kotak, memeriksa kalimat, dan mengubah cerita.",
          contoh: "Tulis kalimatnya dulu.",
        },
      ],
      kuis: [
        { pertanyaan: "38 + kotak = 55. Isi kotak?", alias: ["17"] },
        { pertanyaan: "86 − kotak = 51. Isi kotak?", alias: ["35"] },
        { pertanyaan: "19 + 21 = 40. Benar atau salah?", alias: ["benar"] },
        { pertanyaan: "Kotak + 24 = 61. Isi kotak?", alias: ["37"] },
        { pertanyaan: "Pasangkan kalimat dan isi kotaknya.", alias: ["13", "26", "35"] },
        { pertanyaan: "48 − kotak = 29. Isi kotak?", alias: ["19"] },
        { pertanyaan: "Susun langkah 42 + kotak = 70.", alias: ["42 + kotak = 70", "70 − 42", "kotak = 28"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "62 − kotak = 47. Isi kotak?", alias: ["15"] },
        { pertanyaan: "Sudah 46, butuh 75. Berapa yang dibuat?", alias: ["29"] },
      ],
      voice: [["Sepuluh soal. Lihat tempat kotaknya, lalu hitung."]],
    },
  ],
};
