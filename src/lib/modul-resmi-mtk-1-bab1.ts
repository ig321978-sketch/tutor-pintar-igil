import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK1_BAB1 = "Bab 1: Ayo Berhitung!";
export const JUDUL_MTK1_BAB1_LAMA = "Bab 1: Ayo Membilang sampai dengan 10";

export const MODUL_MTK1_BAB1: ModulResmiPai = {
  id: "mtk-1-bab1",
  judul: JUDUL_MTK1_BAB1,
  pola: /ayo\s+berhitung|ayo\s+membilang\s+sampai(\s+dengan)?\s+10|dunia\s+angka|bekal ali|apel dan donat/,
  motivasi:
    "Hore! Kamu sudah membantu Ali dan Nia menghitung bekal. Apel Ali ada 4. Donat Nia ada 3. Piring kosong artinya nol.",
  kunciJawaban: "B,A,D,B,A,C,B,D,A,C",
  sketsaKartu: [
    "Ali dan Nia membuka bekal apel dan donat di taman sekolah.",
    "Ali memisahkan tumpukan apel dari satu sampai lima, piring kosong artinya nol.",
    "Anak menghitung 4 apel Ali dan 3 donat Nia, lalu menulis angkanya.",
    "Anak mengisi lembar kerja tantangan para juara tentang berhitung sampai 10.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Ali punya 4 apel. Nia punya 3 donat. Siapa yang bekalnya lebih banyak?
A) Nia
B) Ali
C) Bekal mereka sama banyak
D) Tidak bisa dihitung`,
    `[Soal 2 - PG - Tipe: LOTS]
Kotak pensil Nia kosong. Tidak ada pensil sama sekali. Lambang bilangannya...
A) 0
B) 1
C) 2
D) 5`,
    `[Soal 3 - PG - Tipe: MOTS]
Ali mengeluarkan empat apel dari kotak bekal. Lambang bilangannya...
A) 2
B) 3
C) 5
D) 4`,
    `[Soal 4 - PG - Tipe: LOTS]
Nia menghitung donat: satu, dua, tiga. Jumlah donat Nia...
A) 2
B) 3
C) 4
D) 1`,
    `[Soal 5 - PG - Tipe: LOTS]
Gambar 🍎🍎 artinya bilangan...
A) 2
B) 3
C) 4
D) 5`,
    `[Soal 6 - PG - Tipe: LOTS]
Cara membaca angka 5 adalah...
A) Empat
B) Tiga
C) Lima
D) Satu`,
    `[Soal 7 - PG - Tipe: MOTS]
Jika piringmu kosong, tidak ada buah sama sekali, itu artinya...
A) Satu
B) Nol
C) Dua
D) Lima`,
    `[Soal 8 - PG - Tipe: LOTS]
Tiga balon cocok dengan angka...
A) 2
B) 4
C) 5
D) 3`,
    `[Soal 9 - PG - Tipe: HOTS]
Ada 2 mobil, lalu datang 2 mobil lagi. Jumlah mobil sekarang...
A) 4
B) 2
C) 3
D) 5`,
    `[Soal 10 - PG - Tipe: HOTS]
Piring kosong lalu ibu meletakkan 1 apel. Sekarang jumlah apel adalah...
A) 0
B) 2
C) 1
D) 3`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog Bekal di Taman",
      pengantar: "🗺️ Ali dan Nia istirahat di taman. Mereka membuka bekal apel dan donat.",
      labelDaftar: "Target dan cerita apersepsi",
      kolom: 1,
      item: [
        {
          nama: "🌟 Target belajarku hari ini",
          singkat: "Nol sampai sepuluh",
          uraian:
            "🎯 Aku bisa menghitung banyak benda dari nol sampai sepuluh. 🎯 Aku bisa menulis lambang bilangan dan membacanya.",
          contoh: "Hitung benda, tulis angkanya, baca namanya.",
        },
        {
          nama: "🗺️ Bekal di taman sekolah",
          singkat: "Apel Ali dan donat Nia",
          uraian:
            "Ali membawa apel merah dari ibu. Nia membawa donat. Kalau dihitung satu per satu, Ali punya empat apel. Nia punya tiga donat. Yuk bantu mereka menghitung bekal!",
          contoh: "Yuk bantu Ali dan Nia menghitung bekal!",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Siapa yang punya apel merah?",
          alias: ["ali"],
        },
        {
          pertanyaan: "2. Ada berapa apel milik Ali?",
          alias: ["empat", "4", "empat apel", "ada empat"],
        },
        {
          pertanyaan: "3. Ada berapa donat milik Nia?",
          alias: ["tiga", "3", "tiga donat", "ada tiga"],
        },
      ],
      voice: [
        [
          "Hari ini kita ke taman sekolah. Ali dan Nia membuka bekal. Ali membawa apel merah. Nia membawa donat.",
          "Kalau dihitung satu per satu, Ali punya empat apel. Nia punya tiga donat. Yuk, kita bantu mereka menghitung bekal!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis Dunia Angka",
      pengantar:
        "🍎 Trik cepat Ali: hitung benda satu per satu, lalu tulis angkanya. 1 apel dibaca satu. 2 apel dibaca dua. Piring kosong disebut nol.",
      labelDaftar: "Lambang bilangan dan cara membaca",
      kolom: 1,
      item: [
        {
          nama: "🍎 Hitung dari satu sampai lima",
          singkat: "1 SATU sampai 5 LIMA",
          uraian:
            "🍎 1 apel = 1 = satu. 🍎🍎 2 apel = 2 = dua. 🍎🍎🍎 3 apel = 3 = tiga. 🍎🍎🍎🍎 4 apel = 4 = empat. 🍎🍎🍎🍎🍎 5 apel = 5 = lima.",
          contoh: "1 apel = satu.",
        },
        {
          nama: "📦 Contoh apel Ali",
          singkat: "4 = empat",
          uraian:
            "Ada 4 apel milik Ali. Ditulis 4. Dibaca empat.",
          contoh: "4 apel = empat.",
        },
        {
          nama: "💡 Tahukah kamu",
          singkat: "Piring kosong = 0",
          uraian:
            "Jika piringmu kosong, tidak ada buah sama sekali, itu artinya nol.",
          contoh: "Piring kosong = 0.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Tiga balon cocok dengan angka berapa?",
          alias: ["tiga", "3", "angka 3", "angka tiga"],
        },
        {
          pertanyaan: "2. Dua mobil cocok dengan angka berapa?",
          alias: ["dua", "2", "angka 2", "angka dua"],
        },
        {
          pertanyaan: "3. Empat bintang cocok dengan angka berapa?",
          alias: ["empat", "4", "angka 4", "angka empat"],
        },
      ],
      voice: [
        [
          "Trik cepat Ali: hitung benda satu per satu, lalu tulis angkanya. Satu apel dibaca satu. Dua apel dibaca dua. Tiga apel dibaca tiga.",
          "Empat apel dibaca empat. Lima apel dibaca lima.",
        ],
        [
          "Lihat bekal Ali. Ada 4 apel. Ditulis 4. Dibaca empat.",
          "Tahukah kamu? Kalau piringmu kosong, tidak ada buah sama sekali, itu artinya nol.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Membantu Ali Menghitung",
      pengantar:
        "🕵️‍♂️ Lihat bekal yang sudah rapi. Ada 4 apel milik Ali dan 3 donat milik Nia. Hitung bendanya, lalu tulis angkanya.",
      labelDaftar: "Aktivitas terbimbing dan jurnal",
      kolom: 1,
      item: [
        {
          nama: "🕵️‍♂️ Aktivitas 1",
          singkat: "4 apel dan 3 donat",
          uraian:
            "Ada 4 apel milik Ali. Ada 3 donat milik Nia. Lambang apel Ali 4. Dibaca empat.",
          contoh: "4 apel Ali, 3 donat Nia.",
        },
        {
          nama: "🎭 Jurnal perasaanku",
          singkat: "Pilih wajah",
          uraian:
            "😀 Seru banget, aku sudah paham! 😐 Sedikit bingung, mau latihan lagi. 😢 Susah, butuh bantuan tutor kembali.",
          contoh: "Pilih satu wajah.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Ada berapa apel milik Ali?",
          alias: ["4", "empat", "empat apel"],
        },
        {
          pertanyaan: "2. Ada berapa donat milik Nia?",
          alias: ["3", "tiga", "tiga donat"],
        },
        {
          pertanyaan: "3. Lambang bilangan empat apel Ali?",
          alias: ["4", "empat"],
        },
      ],
      voice: [
        [
          "Yuk bantu Ali dan Nia. Ada 4 apel milik Ali dan 3 donat milik Nia. Apel Ali ada 4. Donat Nia ada 3.",
          "Lambang apel Ali 4. Dibaca empat.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "📝 Tantangan para juara! Hitung apel, donat, dan benda milik Ali, Nia, Susi, Edo, dan ibu.",
      labelDaftar: "LKS pilihan ganda dan isian",
      kolom: 1,
      item: [
        {
          nama: "🍓 Bagian A",
          singkat: "Pilihan ganda",
          uraian:
            "Ali 4 apel lebih banyak dari Nia 3 donat. Nia butuh 3 donat lagi agar jadi 5. Misteri Ali 4. Kupu-kupu 6. Edo salah: piring kosong artinya 0.",
          contoh: "Ali lebih banyak. Edo salah.",
        },
        {
          nama: "✏️ Bagian B",
          singkat: "Isian singkat",
          uraian:
            "Lima = 5. Donat Nia 3. Tangga 3 dan 5. Dua apel = 2. Sisa jeruk 0.",
          contoh: "5, 3, 0.",
        },
      ],
      kuis: [
        { pertanyaan: "1. Siapa yang bekalnya lebih banyak, Ali atau Nia?", alias: ["ali"] },
        { pertanyaan: "2. Nia ingin 5 donat. Sekarang ada 2. Berapa yang masih kurang?", alias: ["3", "tiga"] },
        { pertanyaan: "3. Angka misteri Ali di antara 3 dan 5?", alias: ["4", "empat"] },
        { pertanyaan: "4. Ada berapa kupu-kupu?", alias: ["6", "enam"] },
        { pertanyaan: "5. Piring kosong artinya angka berapa?", alias: ["0", "nol"] },
        { pertanyaan: "6. Lima ditulis angka berapa?", alias: ["5"] },
        { pertanyaan: "7. Nia menghitung donat satu dua tiga. Angkanya?", alias: ["3", "tiga"] },
        { pertanyaan: "8. Kotak A pada tangga 1 2 A 4 B 6?", alias: ["3", "tiga"] },
        { pertanyaan: "9. Dua apel ditulis angka berapa?", alias: ["2", "dua"] },
        { pertanyaan: "10. Tujuh jeruk diambil semua. Sisanya?", alias: ["0", "nol"] },
      ],
      voice: [
        [
          "Ini lembar kerja tantangan para juara. Hitung apel dan donat. Ali 4 apel. Nia 3 donat. Ali lebih banyak.",
          "Nia ingin 5 donat, sekarang ada 2, jadi kurang 3. Misteri Ali 4. Kupu-kupu ada 6. Edo salah, piring kosong artinya nol.",
        ],
        [
          "Lima ditulis 5. Donat Nia 3. Tangga angka 3 dan 5. Dua apel ditulis 2. Tujuh jeruk diambil semua, sisanya nol.",
        ],
      ],
    },
  ],
};
