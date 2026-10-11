import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK2_BAB13 = "Bab 13: Pecahan";

export const MODUL_MTK2_BAB13: ModulResmiPai = {
  id: "mtk-2-bab13",
  judul: JUDUL_MTK2_BAB13,
  pola:
    /kue ulang tahun sani|bab 13: pecahan|fondasi pecahan|pecahan setengah|seperempat/,
  motivasi:
    "Hore! Kamu sudah membantu Sani memotong kue secara adil. Pecahan baru sah kalau potongannya sama besar. Satu dari dua bagian sama besar adalah 1/2. Satu dari empat bagian sama besar adalah 1/4.",
  kunciJawaban: "B,B,B,A,A,A,A,A,A,A",
  sketsaKartu: [
    "Sani memegang pisau di depan kue bolu cokelat utuh saat ulang tahun toko.",
    "Kue dibagi dua sama besar (1/2) lalu empat sama besar (1/4).",
    "Anak membandingkan cokelat yang dipotong di tengah dan cokelat yang dipotong di pinggir.",
    "Anak mengisi lembar evaluasi tantangan para juara tentang pecahan dasar.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Edo membelah roti melon jadi dua, potongan besar untuk adik dan potongan kecil untuk dirinya, lalu berkata masing-masing mendapat 1/2. Ucapan Edo...
A) Benar, karena roti sudah terbelah menjadi 2 bagian
B) Salah, karena 1/2 harus dua bagian yang sama besar
C) Benar, karena adik mendapat bagian lebih banyak
D) Benar, karena roti melon bentuknya bulat`,
    `[Soal 2 - PG - Tipe: HOTS]
Siti melipat kertas segi empat menjadi 4 bagian sama besar, mengguntingnya, lalu memberi 1 potongan kepada Lani. Nilai pecahan kertas Lani...
A) 1/2
B) 1/4
C) 4/1
D) 2/4`,
    `[Soal 3 - PG - Tipe: HOTS]
Dua potongan martabak sama besar di piring Dodi jika digabung kembali membentuk 1 martabak utuh. Setiap potongan bernilai...
A) 1/4
B) 1/2
C) 2/1
D) 4/4`,
    `[Soal 4 - PG - Tipe: MOTS]
Puding segi empat dibagi dua sama besar. Bagian gelap adalah...
A) 1/2
B) 1/4
C) 2/2
D) 1/1`,
    `[Soal 5 - PG - Tipe: HOTS]
Kue Manggis dipotong 2 sama besar, Sani ambil 1. Kue Durian dipotong 4 sama besar, Sani ambil 1. Pernyataan yang tepat...
A) Potongan Manggis 1/2 lebih besar daripada potongan Durian 1/4
B) Potongan Durian lebih besar karena angka 4 lebih besar dari 2
C) Kedua potongan sama besar karena sama-sama 1 potong
D) Potongan Durian lebih besar karena lebih banyak garis potong`,
    `[Soal 6 - PG - Tipe: LOTS]
Kertas lingkaran utuh dipotong merata menjadi empat bagian sama besar. Lambang seperempat...
A) 1/4
B) 1/2
C) 4/1
D) 2/4`,
    `[Soal 7 - PG - Tipe: HOTS]
Pizza dipotong 4 sama besar. Kakak ambil 1, adik ambil 1. Yang tersisa...
A) 2 bagian dari 4
B) 1 bagian dari 4
C) 3 bagian dari 4
D) 4 bagian dari 4`,
    `[Soal 8 - PG - Tipe: HOTS]
(1) Riko membelah cokelat menjadi dua bagian sama panjang. (2) Lani memotong kertas menjadi empat bagian sama besar. Pasangan...
A) 1B 2A
B) 1A 2B
C) Keduanya A
D) Keduanya B`,
    `[Soal 9 - PG - Tipe: HOTS]
Riko melipat kertas tepat di tengah, lalu melipat sekali lagi dengan arah yang sama tanpa membuka lipatan. Kertas terbuka menjadi...
A) 4 bagian sama besar, masing-masing 1/4
B) 2 bagian sama besar, masing-masing 1/2
C) 3 bagian sama besar, masing-masing 1/3
D) 8 bagian sama besar, masing-masing 1/8`,
    `[Soal 10 - PG - Tipe: HOTS]
Jeruk utuh dipotong lurus membelah sampai tiap potongan bernilai 1/4. Jumlah sayatan...
A) 2 kali
B) 1 kali
C) 4 kali
D) 3 kali`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog Memotong Kue Secara Adil",
      pengantar:
        "🗺️ Toko Permen Sani berulang tahun. Ada 1 kue bolu cokelat utuh. Sani ingin membaginya kepada Lani, tetapi potongan harus sama besar supaya adil.",
      labelDaftar: "Target dan cerita apersepsi",
      kolom: 1,
      item: [
        {
          nama: "🌟 Target belajarku hari ini",
          singkat: "Pecahan 1/2 dan 1/4",
          uraian:
            "🎯 Aku bisa memahami pecahan dasar lewat benda yang dibagi adil sama besar. 🎯 Aku bisa mengenal pecahan setengah (1/2) dan seperempat (1/4) dengan tepat.",
          contoh: "Sama besar baru disebut pecahan.",
        },
        {
          nama: "🗺️ Memotong kue secara adil",
          singkat: "Ulang tahun toko Sani",
          uraian:
            "Sani menyiapkan 1 kue bolu cokelat utuh. Lani mengingatkan: potongan asal-asalan ada yang besar dan ada yang kecil, itu tidak adil. Mereka memotong tepat di tengah.",
          contoh: "Yuk bantu Sani memotong kue!",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Pecahan yang sah potongannya harus bagaimana?",
          alias: ["sama besar", "adil", "sama"],
        },
        {
          pertanyaan: "2. Kue dipotong dua sama besar. Satu bagian disebut apa?",
          alias: ["setengah", "seperdua", "1/2"],
        },
        {
          pertanyaan: "3. Kalau ada potongan besar dan kecil, apakah itu pecahan?",
          alias: ["bukan", "tidak"],
        },
      ],
      voice: [
        [
          "Hari ini Toko Permen Sani merayakan ulang tahun yang kedua. Sani menyiapkan satu kue bolu cokelat yang besar dan utuh.",
          "Lani berkata, kalau memotongnya asal-asalan, ada potongan besar dan ada yang kecil. Itu tidak adil. Mereka harus memotong tepat di tengah.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis Setengah dan Seperempat",
      pengantar:
        "🍰 Pecahan adalah satu bagian dari benda utuh yang dipotong menjadi beberapa bagian yang sama besar. Angka atas adalah bagian yang diambil. Angka bawah adalah seluruh potongan.",
      labelDaftar: "Setengah dan seperempat",
      kolom: 1,
      item: [
        {
          nama: "🍕 Setengah, 1/2",
          singkat: "Dua bagian sama besar",
          uraian:
            "Satu kue utuh dipotong menjadi 2 bagian sama besar. Setiap 1 bagian disebut setengah atau seperdua. Ditulis 1 di atas dan 2 di bawah.",
          contoh: "1 bagian dari 2 potongan.",
        },
        {
          nama: "🍕 Seperempat, 1/4",
          singkat: "Empat bagian sama besar",
          uraian:
            "Riko dan Dodi ikut datang, jadi ada 4 orang. Kue dipotong menjadi 4 bagian sama besar. Setiap orang mendapat seperempat. Ditulis 1 di atas dan 4 di bawah.",
          contoh: "1 bagian dari 4 potongan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Satu bagian dari dua potongan sama besar ditulis apa?",
          alias: ["1/2", "setengah", "seperdua"],
        },
        {
          pertanyaan: "2. Angka 4 di bawah pada 1/4 artinya apa?",
          alias: ["empat", "4", "seluruh"],
        },
        {
          pertanyaan: "3. Satu potong dari empat bagian sama besar disebut apa?",
          alias: ["seperempat", "1/4"],
        },
      ],
      voice: [
        [
          "Pecahan adalah satu bagian dari benda utuh yang dipotong sama besar. Kalau potongannya tidak sama besar, itu bukan pecahan.",
          "Satu kue dibagi dua sama besar, tiap bagian adalah satu per dua. Satu kue dibagi empat sama besar, tiap bagian adalah satu per empat.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Detektif Pemotong Cokelat",
      pengantar:
        "🕵️‍♂️ Periksa cokelat panjang. Cokelat A dipotong di tengah. Cokelat B dipotong di pinggir. Hanya potongan yang sama besar yang boleh disebut pecahan.",
      labelDaftar: "Aktivitas terbimbing dan jurnal",
      kolom: 1,
      item: [
        {
          nama: "🕵️‍♂️ Aktivitas 1",
          singkat: "Cokelat A dan B",
          uraian:
            "Cokelat A kedua potongannya sama besar, jadi boleh disebut 1/2. Cokelat B potongannya tidak sama besar, jadi bukan pecahan setengah.",
          contoh: "Sama besar atau tidak.",
        },
        {
          nama: "🎭 Jurnal perasaanku",
          singkat: "Pilih wajah",
          uraian:
            "😀 Sangat seru, sekarang aku bisa menghitung pecahan saat memotong pizza. 😐 Aku harus hati-hati melihat apakah potongannya sama besar. 😢 Aku masih bingung menulis angka atas dan bawah.",
          contoh: "Pilih satu wajah.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Apakah potongan Cokelat A sama besar?",
          alias: ["ya", "iya", "sama"],
        },
        {
          pertanyaan: "2. Apakah Cokelat A boleh disebut pecahan setengah?",
          alias: ["ya", "iya", "boleh", "1/2"],
        },
        {
          pertanyaan: "3. Mengapa Cokelat B bukan pecahan setengah?",
          alias: ["tidak sama", "sama besar", "tidak adil"],
        },
      ],
      voice: [
        [
          "Cokelat A dipotong di tengah. Dua potongannya sama besar, jadi itu pecahan satu per dua.",
          "Cokelat B dipotong di pinggir. Ada potongan kecil dan potongan besar, jadi bukan pecahan setengah.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "📝 Tantangan para juara! Pecahan hanya sah jika potongannya sama besar. 1/2 lebih besar daripada 1/4 pada benda yang ukurannya sama.",
      labelDaftar: "Evaluasi pilihan ganda dan isian",
      kolom: 1,
      item: [
        {
          nama: "🍓 Bagian A",
          singkat: "Pilihan ganda",
          uraian:
            "Ucapan Edo salah. Kertas Lani bernilai 1/4. Martabak Dodi bernilai 1/2. Puding gelap bernilai 1/2. Potongan kue manggis lebih besar daripada potongan kue durian.",
          contoh: "Cek apakah potongannya sama besar.",
        },
        {
          nama: "✏️ Bagian B",
          singkat: "Isian singkat",
          uraian:
            "Seperempat ditulis 1/4. Pizza tersisa 2 bagian dari 4. Nomor 1 berpasangan B, nomor 2 berpasangan A. Lipatan dua kali menjadi 4 bagian, tiap bagian 1/4. Jeruk 1/4 perlu 2 sayatan lurus.",
          contoh: "1/4. 2. 1B 2A. 4 dan 1/4. 2.",
        },
      ],
      kuis: [
        { pertanyaan: "1. Apakah ucapan Edo benar?", alias: ["salah", "sama besar"] },
        { pertanyaan: "2. Pecahan kertas yang dipegang Lani?", alias: ["1/4", "seperempat"] },
        { pertanyaan: "3. Pecahan satu potongan martabak Dodi?", alias: ["1/2", "setengah"] },
        { pertanyaan: "4. Pecahan bagian puding yang gelap?", alias: ["1/2", "setengah"] },
        { pertanyaan: "5. Potongan mana yang lebih besar?", alias: ["manggis", "setengah"] },
        { pertanyaan: "6. Lambang seperempat?", alias: ["1/4", "seperempat"] },
        { pertanyaan: "7. Pizza yang masih tersisa?", alias: ["2", "dua"] },
        { pertanyaan: "8. Pasangan cerita dan lambang?", alias: ["1b", "2a"] },
        { pertanyaan: "9. Kertas terbuka menjadi berapa bagian?", alias: ["4", "empat", "seperempat"] },
        { pertanyaan: "10. Berapa kali sayatan untuk mendapat 1/4?", alias: ["2", "dua"] },
      ],
      voice: [
        [
          "Edo salah karena pecahan satu per dua harus sama besar. Kertas Lani bernilai satu per empat. Satu potongan martabak Dodi bernilai satu per dua. Bagian puding yang gelap adalah satu per dua.",
          "Potongan kue manggis satu per dua lebih besar daripada potongan kue durian satu per empat.",
        ],
        [
          "Lambang seperempat adalah satu per empat. Pizza yang tersisa dua bagian dari empat. Cerita satu berpasangan huruf B, cerita dua berpasangan huruf A.",
          "Kertas yang dilipat dua kali terbuka menjadi empat bagian, tiap bagian satu per empat. Jeruk dipotong lurus dua kali agar tiap potongan bernilai satu per empat.",
        ],
      ],
    },
  ],
};
