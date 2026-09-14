import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK1_BAB10 = "Bab 10: Pola Gambar dan Diagram";
export const JUDUL_MTK1_BAB10_LAMA = "Bab 8: Mengenal Diagram";

export const MODUL_MTK1_BAB10: ModulResmiPai = {
  id: "mtk-1-bab10",
  judul: JUDUL_MTK1_BAB10,
  pola: /pola\s+gambar|mengenal\s+diagram/,
  motivasi:
    "Pola berulang seperti tebak-tebakan. Diagram gambar memberitahu mana yang paling banyak dan paling sedikit.",
  kunciJawaban: "B,A,A,B,C,A,B,C,A,B",
  sketsaKartu: [
    "Ali dan Nia melihat bendera hiasan merah-kuning yang berulang di kelas.",
    "Infografis pola apel-pisang dan diagram 4 apel versus 2 pisang.",
    "Siswa mengikuti pola tepukan, anak menyusun sendok-garpu berulang.",
    "Anak membaca diagram mainan: 5 mobil, 3 boneka, 2 yoyo.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: Reguler]
Pola 🔴 🔵 🔴 🔵 🔴 ... gambar selanjutnya adalah...
A) 🔴
B) 🔵
C) 🔺
D) 🟦`,
    `[Soal 2 - PG - Tipe: Reguler]
Pola 🔺 🟦 🔺 🟦 🔺 ... gambar selanjutnya adalah...
A) 🟦
B) 🔺
C) 🔴
D) 🍌`,
    `[Soal 3 - PG - Tipe: Reguler]
Pola 🟢 🟡 🟢 🟡 🟢 🟡 ... warna selanjutnya adalah...
A) Hijau
B) Kuning
C) Merah
D) Biru`,
    `[Soal 4 - PG - Tipe: Reguler]
Pola 🔺 🟦 🟦 🔺 🟦 🟦 🔺 ... selanjutnya adalah...
A) Segitiga
B) Segiempat
C) Lingkaran
D) Pisang`,
    `[Soal 5 - PG - Tipe: Reguler]
Pada diagram, mobil-mobilan ada 5 gambar. Jumlah anak yang suka mobil adalah...
A) 2
B) 3
C) 5
D) 10`,
    `[Soal 6 - PG - Tipe: Reguler]
Mainan yang paling sedikit disukai pada diagram adalah...
A) Yoyo
B) Boneka
C) Mobil-mobilan
D) Apel`,
    `[Soal 7 - PG - Tipe: Reguler]
Boneka 3, yoyo 2. Selisihnya...
A) 5
B) 1
C) 2
D) 3`,
    `[Soal 8 - PG - Tipe: Reguler]
Pola meriah merah, kuning, merah, kuning. Setelah kuning, warnanya...
A) Kuning
B) Biru
C) Merah
D) Hijau`,
    `[Soal 9 - PG - Tipe: HOTS]
Pada diagram mini, apel 4 dan pisang 2. Yang paling banyak adalah...
A) Apel
B) Pisang
C) Sama banyak
D) Yoyo`,
    `[Soal 10 - PG - Tipe: HOTS]
Diagram gambar memakai simbol supaya kita mudah melihat...
A) Warna bendera saja
B) Mana yang paling banyak atau paling sedikit
C) Bentuk ruang
D) Nilai tempat`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog Bendera Hiasan",
      pengantar:
        "Ali melihat bendera hiasan di kelas berurutan merah, kuning, merah, kuning. Nia menjelaskan itu pola gambar: warnanya berulang secara teratur.",
      labelDaftar: "Percakapan Ali dan Nia",
      kolom: 1,
      item: [
        {
          nama: "Pola berulang",
          singkat: "Merah-kuning",
          uraian:
            "Setelah merah, kuning, merah, kuning, warna berikutnya pasti merah lagi. Itu namanya Pola Gambar.",
          contoh: "Merah, kuning, merah, kuning, merah.",
        },
        {
          nama: "Seperti tebak-tebakan",
          singkat: "Aturan teratur",
          uraian:
            "Pola terasa seru seperti tebak-tebakan karena kita bisa menebak gambar berikutnya dari urutan sebelumnya.",
          contoh: "Lihat dua langkah sebelumnya.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Urutan merah kuning yang berulang disebut apa?",
          alias: ["pola", "pola gambar"],
        },
        {
          pertanyaan: "2. Setelah merah kuning merah kuning, warna berikutnya apa?",
          alias: ["merah"],
        },
        {
          pertanyaan: "3. Pola berulang secara apa?",
          alias: ["teratur", "berulang", "teratur berulang"],
        },
      ],
      voice: [
        [
          "Ali berkata, Nia, lihat bendera hiasan di kelas kita. Warnanya berurutan: merah, kuning, merah, kuning. Setelah itu warna apa lagi ya?",
          "Nia menjawab, pasti merah lagi, Ali! Itu namanya Pola Gambar. Warnanya berulang secara teratur.",
        ],
        ["Ali berkata, wah, seru! Seperti tebak-tebakan ya!"],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis Pola dan Diagram",
      pengantar:
        "Pola gambar berulang supaya kita bisa menebak berikutnya. Diagram gambar memakai simbol supaya jumlah mudah dibaca. Ketuk pola dan baca diagram mini.",
      labelDaftar: "Pola dan piktogram",
      kolom: 1,
      item: [
        {
          nama: "Pola gambar",
          singkat: "Tebak berikutnya",
          uraian:
            "Urutan gambar, bentuk, atau warna yang berulang secara teratur. Contoh: apel, pisang, apel, pisang, apel... berikutnya pisang.",
          contoh: "🍎 🍌 🍎 🍌 🍎 ... 🍌",
        },
        {
          nama: "Diagram gambar",
          singkat: "Piktogram",
          uraian:
            "Cara menyajikan jumlah memakai simbol gambar. Contoh: siswa suka apel 4 gambar, suka pisang 2 gambar. Mudah melihat mana yang paling banyak atau paling sedikit.",
          contoh: "Apel 4 anak. Pisang 2 anak.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Pola apel pisang apel pisang apel, berikutnya apa?",
          alias: ["pisang", "banana"],
        },
        {
          pertanyaan: "2. Pada diagram mini, siapa yang lebih banyak, apel atau pisang?",
          alias: ["apel", "suka apel"],
        },
        {
          pertanyaan: "3. Diagram yang memakai gambar disebut apa?",
          alias: ["diagram gambar", "piktogram", "diagram"],
        },
      ],
      voice: [
        [
          "Infografis bermain pola dan diagram. Pola apel, pisang, apel, pisang, apel... selanjutnya pisang.",
        ],
        [
          "Diagram gambar mini. Siswa yang suka apel ada 4. Siswa yang suka pisang ada 2. Apel paling banyak, pisang paling sedikit.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Pola Tepuk dan Sendok Garpu",
      pengantar:
        "Pola bisa didengar dan disusun. Di sekolah kita meniru pola tepukan. Di rumah kita menyusun sendok dan garpu bergantian.",
      labelDaftar: "Dua Tempat Berlatih",
      kolom: 2,
      item: [
        {
          nama: "Pola Tepukan",
          singkat: "Untuk guru",
          uraian:
            "Buat pola tepukan tangan: Tepuk, Sentuh Pundak, Tepuk, Sentuh Pundak. Minta siswa mengikuti irama polanya.",
          contoh: "Tepuk, pundak, tepuk, pundak.",
        },
        {
          nama: "Sendok dan Garpu",
          singkat: "Untuk orang tua",
          uraian:
            "Ajak anak menyusun sendok dan garpu di meja makan dengan pola berulang: sendok, garpu, sendok, garpu.",
          contoh: "Sendok, garpu, sendok, garpu.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Setelah tepuk, sentuh pundak, tepuk, berikutnya apa?",
          alias: ["sentuh pundak", "pundak", "sentuh"],
        },
        {
          pertanyaan: "2. Setelah sendok garpu sendok, berikutnya apa?",
          alias: ["garpu"],
        },
        {
          pertanyaan: "3. Sendok garpu yang berulang disebut apa?",
          alias: ["pola", "pola gambar", "pola berulang"],
        },
      ],
      voice: [
        [
          "Di sekolah, pola tepukan: tepuk, sentuh pundak, tepuk, sentuh pundak. Ikuti iramanya.",
        ],
        [
          "Di rumah, susun sendok, garpu, sendok, garpu di meja makan. Itu pola berulang.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Saatnya menebak pola dan membaca diagram. Lanjutkan urutan, sebut gambar berikutnya, lalu baca diagram mainan kesukaan.",
      labelDaftar: "Tiga Jenis Soal",
      kolom: 1,
      item: [
        {
          nama: "Lanjutkan pola",
          singkat: "Warna dan bentuk",
          uraian:
            "Merah biru berulang, berikutnya biru. Segitiga segiempat berulang, berikutnya segiempat. Hijau kuning berulang, berikutnya hijau. Pola 🔺🟦🟦 berulang, berikutnya segiempat.",
          contoh: "🟢🟡🟢🟡 ... hijau.",
        },
        {
          nama: "Diagram mainan",
          singkat: "Baca jumlah",
          uraian:
            "Mobil-mobilan 5, boneka 3, yoyo 2. Anak yang suka mobil ada 5. Paling sedikit adalah yoyo. Selisih boneka dan yoyo adalah 1.",
          contoh: "Mobil 5. Yoyo paling sedikit. Selisih 1.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Pola merah biru merah biru merah, berikutnya apa?",
          alias: ["biru", "lingkaran biru"],
        },
        {
          pertanyaan: "2. Pola segitiga segiempat segitiga segiempat segitiga, berikutnya apa?",
          alias: ["segiempat", "segi empat"],
        },
        {
          pertanyaan: "3. Pola hijau kuning yang berulang, setelah kuning berikutnya apa?",
          alias: ["hijau"],
        },
        {
          pertanyaan: "4. Pola segitiga, dua segiempat, yang berulang, berikutnya apa?",
          alias: ["segiempat", "segi empat"],
        },
        {
          pertanyaan: "5. Berapa anak yang suka mobil-mobilan?",
          alias: ["lima", "5", "lima anak"],
        },
        {
          pertanyaan: "6. Mainan apa yang paling sedikit disukai?",
          alias: ["yoyo"],
        },
        {
          pertanyaan: "7. Selisih boneka dan yoyo berapa anak?",
          alias: ["satu", "1", "satu anak"],
        },
        {
          pertanyaan: "8. Boneka pada diagram ada berapa?",
          alias: ["tiga", "3"],
        },
        {
          pertanyaan: "9. Yoyo pada diagram ada berapa?",
          alias: ["dua", "2"],
        },
        {
          pertanyaan: "10. Mainan apa yang paling banyak disukai?",
          alias: ["mobil", "mobil-mobilan", "mobil mobilan"],
        },
      ],
      voice: [
        [
          "Lembar evaluasi Bab 10. Lanjutkan pola merah biru, dan pola segitiga segiempat. Pola hijau kuning, berikutnya hijau. Pola segitiga dua segiempat, berikutnya segiempat.",
        ],
        [
          "Diagram mainan: mobil 5, boneka 3, yoyo 2. Paling banyak mobil. Paling sedikit yoyo. Selisih boneka dan yoyo adalah 1. Semangat!",
        ],
      ],
    },
  ],
};
