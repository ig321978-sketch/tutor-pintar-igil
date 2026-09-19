import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK2_BAB6 = "Bab 6: Pengukuran Panjang Standar";

export const MODUL_MTK2_BAB6: ModulResmiPai = {
  id: "mtk-2-bab6",
  judul: JUDUL_MTK2_BAB6,
  pola:
    /pengukuran panjang standar|penggaris pintar|satuan cm dan m|bab 6: panjang|mengenal satuan cm/,
  motivasi:
    "cm untuk benda pendek, m untuk benda panjang. Ukur dari angka 0, bukan ujung penggaris. 1 m = 100 cm. Penggaris adalah alat baku.",
  kunciJawaban: "B,B,S,B,B,A,C,B,A,B",
  sketsaKartu: [
    "Anak menyejajarkan pensil pada angka 0 penggaris.",
    "Anak memilih cm untuk pensil dan m untuk papan tulis.",
    "Anak mengerjakan evaluasi satuan dan cara ukur.",
    "Anak menarik garis pensil-halaman, menggeser penggaris atau jengkal, mengurutkan 3-8-15 cm, dan menulis 100.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Penghapus diukur dari 0, ujung kanan di angka 4. Panjangnya...
A) 0 cm
B) 4 cm
C) 5 cm
D) 14 cm`,
    `[Soal 2 - PG - Tipe: HOTS]
Singkatan sentimeter adalah...
A) m
B) cm
C) kg
D) g`,
    `[Soal 3 - PG - Tipe: HOTS]
Buku diukur dari angka 1 sampai 6, panjangnya 6 cm. Pernyataan ini...
A) Benar.
B) Salah; 6 - 1 = 5 cm.
C) Benar jika penggaris rusak.
D) Harus memakai meter.`,
    `[Soal 4 - PG - Tipe: HOTS]
Meteran kain menghasilkan angka sama meski diukur orang berbeda. Pernyataan ini...
A) Salah.
B) Benar; meteran adalah alat ukur baku.
C) Benar hanya jengkal.
D) Hasilnya selalu beda.`,
    `[Soal 5 - PG - Tipe: Reguler]
Pensil tulis baru paling cocok diukur dengan...
A) Meter
B) Sentimeter
C) Kilogram
D) Jengkal wajib`,
    `[Soal 6 - PG - Tipe: Reguler]
Halaman sekolah dan tinggi lemari paling cocok dengan...
A) Meter
B) Gram
C) cm saja
D) Langkah kaki wajib`,
    `[Soal 7 - PG - Tipe: Reguler]
1 meter sama dengan...
A) 10 cm
B) 12 cm
C) 100 cm
D) 1.000 cm`,
    `[Soal 8 - PG - Tipe: Reguler]
Urutan dari pendek: klip 3 cm, krayon 8 cm, penghapus papan 15 cm adalah...
A) 15, 8, 3
B) 3, 8, 15
C) 8, 3, 15
D) 3, 15, 8`,
    `[Soal 9 - PG - Tipe: HOTS]
Mengapa kita mulai dari angka 0, bukan ujung plastik penggaris?
A) Supaya angka di ujung kanan benda adalah panjang yang benar.
B) Supaya penggaris tidak patah.
C) Karena 1 selalu awal.
D) Karena meter lebih pendek.`,
    `[Soal 10 - PG - Tipe: Reguler]
Jengkal tangan termasuk alat ukur...
A) Baku
B) Tidak baku, berubah-ubah
C) Satuan kg
D) Piktogram`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Membaca Penggaris dengan Akurat",
      pengantar:
        "Infografis penggaris pintar: cm untuk benda pendek, m untuk benda panjang. Sejajarkan ujung kiri benda pada angka 0, bukan ujung penggaris.",
      labelDaftar: "cm, m, aturan ukur dari nol",
      kolom: 1,
      item: [
        {
          nama: "Satuan sentimeter",
          singkat: "Untuk benda pendek",
          uraian:
            "Sentimeter ditulis cm. Cocok untuk pensil, penghapus, buku. Jika penghapus dari 0 sampai 4, panjangnya 4 cm.",
          contoh: "Penghapus = 4 cm.",
        },
        {
          nama: "Satuan meter",
          singkat: "Untuk benda panjang",
          uraian:
            "Meter ditulis m. Cocok untuk papan tulis, tinggi pintu, panjang kelas, halaman sekolah, tinggi lemari.",
          contoh: "Papan tulis diukur dengan m.",
        },
        {
          nama: "Mulai dari nol",
          singkat: "Bukan ujung plastik",
          uraian:
            "Ujung kiri benda lurus dengan angka 0. Angka di ujung kanan adalah panjangnya. Jika mulai dari 1 sampai 6, panjang = 6-1 = 5 cm.",
          contoh: "Selalu dari 0.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Jika Ali mengukur penghapus dan ujung kanannya menunjuk angka 4 pada penggaris yang dimulai dari 0, berapa panjang penghapus Ali?",
          alias: ["4", "empat", "4 cm"],
        },
      ],
      kuisTulis: {
        pertanyaan: "Singkatan satuan ukuran standar sentimeter adalah...",
        alias: ["cm"],
      },
      voice: [
        [
          "Anak-anak kelas 2 yang teliti, jengkal tangan kita bisa berbeda-beda. Sekarang kita pakai alat ukur standar: penggaris dan meteran.",
          "Satuan kecil dinamakan sentimeter, ditulis cm, untuk pensil atau buku. Benda panjang seperti papan tulis memakai meter, ditulis m.",
          "Rahasianya: ujung kiri benda lurus dengan angka 0. Angka di ujung kanan itulah panjang aslinya!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Alat Baku dan 100 Sentimeter",
      pengantar:
        "Infografis alat baku vs tidak baku. Penggaris dan meteran pita pasti. Jengkal dan langkah kaki berubah-ubah. 1 m = 100 cm.",
      labelDaftar: "Baku, tidak baku, konversi, urutan",
      kolom: 1,
      item: [
        {
          nama: "Alat ukur baku",
          singkat: "Hasilnya sama",
          uraian:
            "Penggaris cm dan meteran pita hasilnya sama meskipun diukur orang berbeda. Itulah standar nasional dan internasional.",
          contoh: "Penggaris. Meteran pita.",
        },
        {
          nama: "Alat tidak baku",
          singkat: "Berubah-ubah",
          uraian:
            "Jengkal tangan dan langkah kaki beda tiap orang. Semester satu kita sudah mencobanya. Sekarang kita pilih yang baku.",
          contoh: "Jengkal. Langkah kaki.",
        },
        {
          nama: "Satu meter",
          singkat: "Sama dengan 100 cm",
          uraian:
            "1 m = 100 cm. Klip 3 cm, krayon 8 cm, penghapus papan 15 cm. Urutan pendek ke panjang: 3, 8, 15.",
          contoh: "1 m = 100 cm.",
        },
      ],
      kuis: [
        {
          pertanyaan: "Penggaris termasuk alat baku atau tidak baku? Mengapa?",
          alias: ["baku", "standar", "sama"],
        },
      ],
      kuisTulis: {
        pertanyaan: "1 meter sama dengan ... sentimeter.",
        alias: ["100"],
      },
      voice: [
        [
          "Penggaris dan meteran pita adalah alat baku. Angkanya sama di seluruh dunia.",
          "Jengkal dan langkah kaki berubah-ubah. Jangan dipakai untuk ukuran resmi.",
          "Satu meter sama dengan seratus sentimeter. Urutkan benda dari yang paling pendek.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih panjang 4 cm dan singkatan cm, tentukan benar-salah ukur dari 1 serta meteran kain, jodohkan pensil-halaman-lemari, lalu jelaskan mengapa mulai dari 0.",
      labelDaftar: "Pilihan, benar-salah, mencocokkan, dan esai",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A dan B",
          singkat: "Baca penggaris",
          uraian:
            "Dari 0 sampai 4 = 4 cm. Singkatan cm. Dari 1 sampai 6 = 5 cm. Meteran kain baku.",
          contoh: "4 cm. cm. 5 cm.",
        },
        {
          nama: "Kelompok C dan D",
          singkat: "Satuan dan urutan",
          uraian:
            "Pensil: cm. Halaman dan lemari: m. 1 m = 100 cm. Urutan 3, 8, 15 cm.",
          contoh: "cm. m. 100.",
        },
      ],
      kuis: [
        { pertanyaan: "Penghapus 0 sampai 4?", alias: ["4"] },
        { pertanyaan: "Singkatan sentimeter?", alias: ["cm"] },
        { pertanyaan: "Dari 1 sampai 6 = 6 cm?", alias: ["salah", "5"] },
        { pertanyaan: "Meteran kain baku?", alias: ["benar"] },
        { pertanyaan: "Pensil satuan?", alias: ["cm"] },
        { pertanyaan: "Mengapa dari 0?", alias: ["benar", "panjang", "nol"] },
      ],
      voice: [
        ["Mulai dari nol. Empat sentimeter. Singkatan cm."],
        ["Satu meter sama dengan seratus sentimeter."],
      ],
    },
    {
      kode: "D",
      judul: "D. Kartu Evaluasi Ekstra",
      pengantar:
        "Tanpa keyboard. Tarik garis satuan pensil-halaman-lemari, geser penggaris atau jengkal, urutkan 3-8-15 cm, coretkan 0 pada 100, lalu tekan BENAR atau SALAH.",
      labelDaftar: "Tarik garis, keranjang, urutan, kanvas, detektif",
      kolom: 1,
      item: [
        {
          nama: "Permainan A sampai C",
          singkat: "Garis, keranjang, urutan",
          uraian:
            "Pensil: cm. Halaman sekolah: m. Lemari: m. Baku: penggaris, meteran pita. Tidak baku: jengkal, langkah. Urutan: klip 3, krayon 8, penghapus 15.",
          contoh: "cm. Baku. 3 dulu.",
        },
        {
          nama: "Permainan D dan E",
          singkat: "Kanvas dan detektif",
          uraian:
            "1 m = 100 cm, coretkan 0. Ukur dari 1 sampai 6 bukan 6 cm. Meteran kain hasilnya sama.",
          contoh: "Coretkan 0. SALAH lalu BENAR.",
        },
      ],
      kuis: [
        { pertanyaan: "Tarik garis satuan?", alias: ["cm", "meter"] },
        { pertanyaan: "Keranjang baku?", alias: ["penggaris", "jengkal"] },
        { pertanyaan: "Urutan 3 8 15?", alias: ["3", "8", "15"] },
        { pertanyaan: "Dari 1 sampai 6 = 6 cm?", alias: ["salah"] },
        { pertanyaan: "Meteran kain sama?", alias: ["benar"] },
      ],
      kuisTulis: {
        pertanyaan: "Coretkan angka terakhir 1 - 0 - __ sentimeter.",
        alias: ["100", "0"],
      },
      voice: [
        [
          "Tanpa keyboard. Tarik garis pensil ke cm, halaman dan lemari ke meter. Geser penggaris ke baku, jengkal ke tidak baku.",
          "Urutkan klip 3 cm, krayon 8 cm, penghapus 15 cm. Coretkan 0 untuk seratus sentimeter.",
          "Detektif: mulai dari 1 sampai 6 berarti 5 cm. Meteran kain hasilnya sama.",
        ],
      ],
    },
  ],
};
