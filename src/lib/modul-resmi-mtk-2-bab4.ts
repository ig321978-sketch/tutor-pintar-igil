import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK2_BAB4 = "Bab 4: Posisi Benda dan Pola di Sekitar Kita";
export const JUDUL_MTK2_BAB4_LAMA = "Bab 4: Geometri Bangun Datar";

export const MODUL_MTK2_BAB4: ModulResmiPai = {
  id: "mtk-2-bab4",
  judul: JUDUL_MTK2_BAB4,
  pola:
    /bab\s*4[:.]\s*posisi benda|posisi benda dan pola|waktu panen padi|geometri bangun datar|bungkus permen unik/,
  motivasi:
    "Hore! Kamu sudah bantu Kira di sawah. Atas-bawah, depan-belakang, kiri-kanan. Pola bentuk, warna, gerakan, dan suara bisa dilanjutkan.",
  kunciJawaban: "B,A,B,B,B,B,C,A,B,B",
  sketsaKartu: [
    "Kira dan teman-teman membantu Paman memanen padi. Igil mengamati posisi kupu-kupu, burung, dan ayam.",
    "Enam sekawan berbaris. Pola bentuk, warna, gerakan, dan suara di sawah.",
    "Sepuluh ikat padi: posisi, pasangan, dan lanjutkan pola.",
    "Lembar kerja tantangan juara posisi dan pola.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: LOTS]
Kupu-kupu hinggap di atas bunga. Bunga ada di...
A) atas kupu-kupu
B) bawah kupu-kupu
C) depan kupu-kupu`,
    `[Soal 2 - PG - Tipe: LOTS]
Burung berjalan di depan ulat. Ulat ada di...
A) belakang burung
B) atas burung
C) kiri burung`,
    `[Soal 3 - PG - Tipe: MOTS]
Barisan panen: Upe, Lili, Halim, Kira, Malosi, Tika. Siapa di sebelah kanan Lili?
A) Upe
B) Halim
C) Kira`,
    `[Soal 4 - PG - Tipe: MOTS]
Rumput ada di sebelah kanan burung. Burung ada di sebelah...
A) kanan rumput
B) kiri rumput
C) atas rumput`,
    `[Soal 5 - PG - Tipe: MOTS]
Pola barisan: laki-laki, perempuan, laki-laki, perempuan. Setelah Tika (perempuan), berikutnya...
A) perempuan
B) laki-laki
C) kupu-kupu`,
    `[Soal 6 - PG - Tipe: MOTS]
Pola taplak: bunga, segi empat, bunga, segi empat. Berikutnya...
A) segi empat
B) bunga
C) hati`,
    `[Soal 7 - PG - Tipe: LOTS]
Pola kaus: merah, biru, merah, biru. Berikutnya...
A) kuning
B) biru
C) merah`,
    `[Soal 8 - PG - Tipe: MOTS]
Pola gerakan: membungkuk, berdiri, membungkuk, berdiri. Berikutnya...
A) membungkuk
B) jongkok
C) lari`,
    `[Soal 9 - PG - Tipe: HOTS]
Ani menyembunyikan kunci di bawah pot paling kanan. Posisi kuncinya...
A) atas pot kiri
B) bawah pot kanan
C) depan pintu`,
    `[Soal 10 - PG - Tipe: HOTS]
Pola tepuk: 1, 2, 3, 4, lalu ulang. Setelah 4 adalah...
A) 5
B) 1
C) 2`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "Waktu Panen Telah Tiba",
      pengantar:
        "Kira dan teman-teman membantu Paman di sawah. Igil mengamati kupu-kupu, burung, dan ayam. Kita sebut posisinya: atas, bawah, depan, belakang, kiri, kanan.",
      labelDaftar: "Cerita panen dan posisi benda",
      kolom: 1,
      item: [
        {
          nama: "Tujuan pembelajaran",
          singkat: "Posisi benda dan pola",
          uraian:
            "Siswa dapat menunjukkan posisi atas, bawah, depan, belakang, kiri, dan kanan. Siswa dapat mengidentifikasi dan melanjutkan pola bentuk, warna, gerakan, dan suara.",
          contoh: "Kupu-kupu di atas bunga. Bunga di bawah kupu-kupu.",
        },
        {
          nama: "Cerita panen padi",
          singkat: "Sawah Paman",
          uraian:
            "Waktu panen padi tiba. Kira, Lili, Tika, Malosi, Upe, dan Halim membantu Paman. Padi diolah jadi nasi. Jangan menyia-nyiakan nasi.",
          contoh: "Siapa di kanan Lili? Halim.",
        },
      ],
      kuis: [
        { pertanyaan: "Kupu-kupu di atas bunga. Bunga ada di mana?", alias: ["bawah"] },
        { pertanyaan: "Tuliskan bawah.", alias: ["bawah"] },
        { pertanyaan: "Ulat ada di belakang siapa?", alias: ["burung"] },
        { pertanyaan: "Tuliskan belakang.", alias: ["belakang"] },
        { pertanyaan: "Siapa di kanan Lili?", alias: ["halim"] },
        { pertanyaan: "Burung di kiri rumput. Rumput di mana?", alias: ["kanan"] },
      ],
      voice: [
        [
          "Waktu panen padi tiba. Kira dan teman-teman membantu Paman di sawah.",
          "Igil mengamati posisi. Atas, bawah, depan, belakang, kiri, kanan.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Pola di Sawah",
      pengantar:
        "Enam sekawan berbaris: Upe, Lili, Halim, Kira, Malosi, Tika. Yang berulang dan teratur dinamakan pola. Ada pola bentuk, warna, gerakan, dan suara.",
      labelDaftar: "Pola bentuk, warna, gerakan, suara",
      kolom: 1,
      item: [
        {
          nama: "Pola barisan",
          singkat: "Laki-laki, perempuan, berulang",
          uraian:
            "Urutan Upe, Lili, Halim, Kira, Malosi, Tika. Polanya laki-laki, perempuan, laki-laki, perempuan, laki-laki, perempuan.",
          contoh: "Setelah perempuan, berikutnya laki-laki.",
        },
        {
          nama: "Empat jenis pola",
          singkat: "Bentuk, warna, gerakan, suara",
          uraian:
            "Pola bentuk: bunga, segi empat, bunga, segi empat. Pola warna: merah, biru, merah, biru. Pola gerakan: membungkuk, berdiri, membungkuk, berdiri. Pola suara: tepuk 1, 2, 3, 4, lalu ulang.",
          contoh: "Merah, biru, merah. Berikutnya biru.",
        },
      ],
      kuis: [
        { pertanyaan: "Setelah perempuan, pola barisan berikutnya?", alias: ["laki-laki", "laki laki"] },
        { pertanyaan: "Tuliskan laki-laki.", alias: ["laki-laki", "laki laki"] },
        { pertanyaan: "Bunga, segi empat, bunga, segi empat. Berikutnya?", alias: ["bunga"] },
        { pertanyaan: "Tuliskan bunga.", alias: ["bunga"] },
        { pertanyaan: "Merah, biru, merah, biru. Berikutnya?", alias: ["merah"] },
        { pertanyaan: "Membungkuk, berdiri, membungkuk, berdiri. Berikutnya?", alias: ["membungkuk"] },
        { pertanyaan: "Tepuk 1, 2, 3, 4. Setelah 4?", alias: ["1", "satu"] },
      ],
      voice: [
        [
          "Enam sekawan berbaris. Laki-laki, perempuan, laki-laki, perempuan. Itu pola.",
          "Pola bentuk di taplak. Pola warna di kaus. Pola gerakan membungkuk dan berdiri. Pola suara tepuk satu sampai empat.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Ikat Padi Igil",
      pengantar:
        "Bantu Igil mengikat 10 ikat padi. Sebut posisi. Lanjutkan pola.",
      labelDaftar: "Sepuluh misi ikat padi",
      kolom: 1,
      item: [
        {
          nama: "Alur permainan",
          singkat: "Pilih ikat, jawab, dapat bintang",
          uraian:
            "Siswa memilih satu ikat padi. Igil membacakan misi. Jawaban benar mendapat 1 bintang padi. Jika belum tepat, Igil memberi petunjuk. Daun tidak berkurang.",
          contoh: "Bunga di bawah. Setelah 4 tepuk, ulang dari 1.",
        },
        {
          nama: "Daun rapi",
          singkat: "3, 2, atau 1 daun",
          uraian:
            "Benar di percobaan pertama mendapat 3 daun. Benar setelah satu petunjuk mendapat 2 daun. Benar setelah dua petunjuk mendapat 1 daun.",
          contoh: "Petunjuk: ikat bergoyang, lalu Igil menghitung bersama.",
        },
      ],
      kuis: [
        { pertanyaan: "Bunga ada di mana terhadap kupu-kupu?", alias: ["bawah"] },
        { pertanyaan: "Ulat ada di belakang siapa?", alias: ["burung"] },
        { pertanyaan: "Tuliskan kiri.", alias: ["kiri"] },
        { pertanyaan: "Siapa di kanan Lili?", alias: ["halim"] },
        { pertanyaan: "Setelah perempuan berikutnya?", alias: ["laki-laki", "laki laki"] },
        { pertanyaan: "Tuliskan bunga.", alias: ["bunga"] },
        { pertanyaan: "Merah biru berikutnya?", alias: ["merah"] },
        { pertanyaan: "Membungkuk atau jongkok?", alias: ["membungkuk"] },
        { pertanyaan: "Kunci Ani di mana?", alias: ["bawah"] },
        { pertanyaan: "Tuliskan 1.", alias: ["1", "satu"] },
      ],
      voice: [
        [
          "Igil menjaga ikat padi. Ada sepuluh ikat dari yang pertama sampai piala.",
          "Ikat hijau untuk posisi. Ikat biru untuk nama. Ikat kuning untuk menulis. Ikat ungu untuk memilih.",
          "Jawaban benar mendapat satu bintang padi. Jika belum tepat, Igil memberi petunjuk. Daun tidak berkurang.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar:
        "Sebut posisi. Lanjutkan pola. Ini tantangan para juara.",
      labelDaftar: "Poin penting dan evaluasi",
      kolom: 1,
      item: [
        {
          nama: "Poin penting",
          singkat: "Posisi dan pola",
          uraian:
            "Posisi: atas, bawah, depan, belakang, kiri, kanan. Kanan kiri gambar sesuai posisi pembaca. Pola adalah hal yang berulang dan teratur. Ada pola bentuk, warna, gerakan, dan suara. Pola bisa dilanjutkan.",
          contoh: "Lihat posisinya, lanjutkan polanya.",
        },
        {
          nama: "Lembar kerja",
          singkat: "Sepuluh tantangan",
          uraian:
            "Bunga di bawah. Ulat di belakang. Kanan Lili adalah Halim. Burung di kiri rumput. Setelah perempuan laki-laki. Setelah segi empat adalah bunga. Setelah biru adalah merah. Setelah berdiri adalah membungkuk. Kunci di bawah pot kanan. Setelah tepuk 4 ulang 1.",
          contoh: "Jawaban latihan: B, A, B, B, B, B, C, A, B, B.",
        },
      ],
      kuis: [
        { pertanyaan: "Bunga terhadap kupu-kupu?", alias: ["bawah", "b"] },
        { pertanyaan: "Ulat terhadap burung?", alias: ["belakang", "a"] },
        { pertanyaan: "Kanan Lili?", alias: ["halim", "b"] },
        { pertanyaan: "Burung terhadap rumput?", alias: ["kiri", "b"] },
        { pertanyaan: "Setelah perempuan?", alias: ["laki-laki", "b"] },
        { pertanyaan: "Bunga segi empat berikutnya?", alias: ["bunga", "b"] },
        { pertanyaan: "Merah biru berikutnya?", alias: ["merah", "c"] },
        { pertanyaan: "Membungkuk berdiri berikutnya?", alias: ["membungkuk", "a"] },
        { pertanyaan: "Kunci Ani?", alias: ["bawah pot kanan", "b"] },
        { pertanyaan: "Setelah tepuk 4?", alias: ["1", "satu", "b"] },
      ],
      voice: [
        [
          "Poin penting. Atas, bawah, depan, belakang, kiri, kanan. Pola berulang dan teratur.",
          "Pola bentuk, warna, gerakan, dan suara. Lanjutkan polanya.",
        ],
        [
          "Bunga di bawah. Ulat di belakang. Halim di kanan Lili. Burung di kiri rumput.",
          "Setelah perempuan laki-laki. Setelah segi empat bunga. Setelah biru merah. Setelah berdiri membungkuk. Kunci di bawah pot kanan. Setelah empat, ulang satu.",
        ],
      ],
    },
  ],
};
