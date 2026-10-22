import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK2_BAB6 = "Bab 6: Pengukuran";
export const JUDUL_MTK2_BAB6_LAMA = "Bab 6: Pengukuran Panjang Standar";

export const MODUL_MTK2_BAB6: ModulResmiPai = {
  id: "mtk-2-bab6",
  judul: JUDUL_MTK2_BAB6,
  pola:
    /bab\s*6[:.]\s*pengukuran(?!\s*panjang dan berat)|membandingkan berat benda|kapten igil|misi kereta kargo|kantor pos ekspedisi|pengukuran panjang standar|pita kantong permen|penggaris pintar|satuan cm dan m|mengenal satuan cm/,
  motivasi:
    "Hore! Kereta kargo Kapten IGIL berangkat tepat waktu. Benda lebih berat turun ke bawah. Benda lebih ringan naik ke atas. Kalau sejajar, keduanya sama berat. Jarum panjang di 12, lihat jarum pendek untuk pukul berapa tepat.",
  kunciJawaban: "A,C,B,B,A,B,C,A,B,A",
  sketsaKartu: [
    "Kapten IGIL, Tika, dan Dodi di Kantor Pos Ekspedisi. Kotak besi turun, bantal kapas naik. Benda lebih berat membuat nampan turun.",
    "Timbangan seimbang: 1 mobil-mobilan sama dengan 6 kelereng. Jam stasiun pukul 8 tepat. Jarum pendek menunjuk jam.",
    "Sepuluh misi kereta kargo. Muatan kiri-kanan harus seimbang dan jam keberangkatan harus tepat.",
    "Lembar juara berat dan waktu. Urutkan semangka-nanas-apel. Hitung kelereng. Baca jam tepat.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Timbangan 1: semangka turun, nanas naik. Timbangan 2: nanas turun, apel naik. Urutan dari paling berat ke paling ringan...
A) Semangka - Nanas - Apel
B) Apel - Nanas - Semangka
C) Nanas - Semangka - Apel`,
    `[Soal 2 - PG - Tipe: HOTS]
1 kotak susu = 5 kelereng. 1 roti = 2 kelereng. Keduanya ditaruh di nampan kiri. Kelereng di nampan kanan agar seimbang...
A) 3 kelereng
B) 5 kelereng
C) 7 kelereng`,
    `[Soal 3 - PG - Tipe: HOTS]
Dodi mulai belajar pukul 03.00. Ia selesai 1 jam kemudian. Jarum pendek berada di angka...
A) Angka 2
B) Angka 4
C) Angka 12`,
    `[Soal 4 - PG - Tipe: HOTS]
Balon besar naik ke atas. Batu kecil turun ke bawah. Pernyataan yang benar...
A) Balon lebih berat karena ukurannya besar
B) Batu kecil lebih berat daripada balon besar
C) Balon dan batu sama berat`,
    `[Soal 5 - PG - Tipe: MOTS]
Pasangan yang tepat...
A) Tidur malam lebih lama dari gosok gigi, pensil lebih ringan dari buku, jarum pendek di 6 dan panjang di 12 = pukul 6 tepat
B) Gosok gigi lebih lama dari tidur malam
C) Jarum pendek di 6 berarti pukul 12 tepat`,
    `[Soal 6 - PG - Tipe: HOTS]
Jam: jarum pendek di 12, jarum panjang di 6. Tika berkata, "Ini pukul 6 tepat." Benar atau salah?
A) Benar
B) Salah
C) Sama saja`,
    `[Soal 7 - PG - Tipe: HOTS]
Melon = 10 kelereng. Mangga = 4 kelereng. Selisihnya...
A) 4
B) 5
C) 6`,
    `[Soal 8 - PG - Tipe: LOTS]
Jam stasiun: jarum pendek di 2, jarum panjang di 12. Pukul...
A) 2 tepat
B) 12 tepat
C) 10 tepat`,
    `[Soal 9 - PG - Tipe: HOTS]
Robot 9 kelereng. Nampan kanan sudah 5 kelereng. Kelereng yang masih perlu ditambah...
A) 5
B) 4
C) 9`,
    `[Soal 10 - PG - Tipe: MOTS]
Kereta berangkat pukul 10 tepat. Jarum pendek menunjuk angka...
A) 10
B) 12
C) 2`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar Kantor Pos Kapten IGIL",
      pengantar:
        "🗺️ Halo petugas cilik! Bersama Kapten IGIL kita bandingkan berat benda dan baca jam stasiun.",
      labelDaftar: "Tiga sub-bab stasiun",
      kolom: 1,
      item: [
        {
          nama: "⚖️ 6.1 Membandingkan berat",
          singkat: "Turun = lebih berat",
          uraian:
            "Benda yang lebih berat membuat nampan turun ke bawah. Benda yang lebih ringan naik ke atas. Kalau sama berat, lengan timbangan sejajar lurus.",
          contoh: "Kotak besi turun. Bantal kapas naik.",
        },
        {
          nama: "🔵 6.2 Satuan tak baku",
          singkat: "Hitung kelereng",
          uraian:
            "Masukkan kelereng satu per satu sampai timbangan lurus. Jumlah kelereng itu berat benda.",
          contoh: "1 mobil-mobilan = 6 kelereng.",
        },
        {
          nama: "🕒 6.3 Jam dan durasi",
          singkat: "Jarum pendek = jam",
          uraian:
            "Jarum panjang di 12, jarum pendek menunjuk pukul berapa tepat. Cuci tangan sebentar. Perjalanan kereta lama.",
          contoh: "Jarum pendek di 8 = pukul 8 tepat.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Benda lebih berat di timbangan bergerak ke mana?",
          alias: ["turun", "bawah"],
        },
        {
          pertanyaan: "2. Kotak pensil seimbang dengan 4 kelereng. Beratnya berapa kelereng?",
          alias: ["4", "empat"],
        },
        {
          pertanyaan: "3. Jarum yang menunjuk angka jam disebut jarum apa?",
          alias: ["pendek", "jarum pendek"],
        },
      ],
      voice: [
        [
          "Halo petugas cilik! Bersama Kapten IGIL, kita akan belajar membandingkan berat benda menggunakan jungkat-jungkit dan timbangan dua lengan.",
          "Ingat ya: benda yang lebih berat akan membuat lengan timbangan turun ke bawah, sedangkan benda yang lebih ringan akan naik ke atas!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis Timbangan dan Jam",
      pengantar:
        "📊 Tiga posisi timbangan, rumus kelereng, dan rumus jam tepat.",
      labelDaftar: "Tiga infografis",
      kolom: 1,
      item: [
        {
          nama: "⬇️ Aturan timbangan",
          singkat: "Turun, naik, lurus",
          uraian:
            "Turun ke bawah = lebih berat. Naik ke atas = lebih ringan. Lurus sejajar = sama berat.",
          contoh: "Semangka lebih berat dari stroberi.",
        },
        {
          nama: "🔵 Kelereng dan balok",
          singkat: "Jumlah = berat",
          uraian:
            "Berat 1 benda sama dengan jumlah kelereng saat timbangan lurus. Semakin banyak kelereng, semakin berat.",
          contoh: "Mangga 5, pisang 3. Mangga lebih berat. Selisih 2.",
        },
        {
          nama: "🕒 Jam tepat",
          singkat: "Panjang di 12",
          uraian:
            "Jarum panjang di 12, jarum pendek di X, dibaca pukul X tepat. Cuci tangan sebentar. Tidur malam lama.",
          contoh: "Jarum pendek di 9 = pukul 9 tepat.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Timbangan lurus sejajar artinya berat kedua benda bagaimana?",
          alias: ["sama", "sama berat"],
        },
        {
          pertanyaan: "2. Pisang 3 kelereng, mangga 5 kelereng. Buah mana yang lebih berat?",
          alias: ["mangga"],
        },
        {
          pertanyaan: "3. Mencuci tangan atau belajar di sekolah, mana yang lebih sebentar?",
          alias: ["cuci", "mencuci", "tangan"],
        },
      ],
      voice: [
        [
          "Lihat tiga posisi timbangan ini! Kalau miring ke bawah artinya lebih berat, kalau naik ke atas artinya lebih ringan, dan kalau mendatar lurus artinya kedua benda sama berat!",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Misi Kereta Kargo Tepat Waktu",
      pengantar:
        "🚂 Kereta hanya berangkat jika muatan seimbang dan jam keberangkatan tepat.",
      labelDaftar: "Sepuluh misi stasiun",
      kolom: 1,
      item: [
        {
          nama: "⚖️ Keseimbangan kargo",
          singkat: "Kiri sama kanan",
          uraian:
            "Karung beras 8 balok butuh paket 8 balok. Kotak yang naik lebih ringan. Dua apel 2 kelereng butuh 4 kelereng.",
          contoh: "Paket B: 8 balok.",
        },
        {
          nama: "🕒 Jadwal stasiun",
          singkat: "Jam tepat",
          uraian:
            "Pukul 5: jarum pendek di 5, jarum panjang di 12. Perjalanan 7 sampai 9 sama dengan 2 jam.",
          contoh: "Mengemudikan kereta lebih lama daripada meniup peluit.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Karung 8 balok seimbang dengan paket berapa balok?",
          alias: ["8", "delapan"],
        },
        {
          pertanyaan: "2. Jam: pendek di 11, panjang di 12. Pukul berapa?",
          alias: ["11", "sebelas"],
        },
        {
          pertanyaan: "3. Labu seimbang dengan 7 balok. Berat labu?",
          alias: ["7", "tujuh"],
        },
      ],
      voice: [
        [
          "Selamat datang di permainan Misi Kereta Kargo Tepat Waktu Kapten IGIL! Kereta kargo kita hanya bisa berangkat jika muatan gerbong kiri dan kanan seimbang, dan jadwal jam keberangkatannya tepat.",
          "Ayo selesaikan 10 misi stasiun agar kereta berangkat tepat waktu!",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "📝 Sepuluh soal ketelitian. Amati posisi timbangan dan jarum jamnya.",
      labelDaftar: "Evaluasi HOTS berat dan waktu",
      kolom: 1,
      item: [
        {
          nama: "🧠 Penalaran 2 timbangan",
          singkat: "Semangka > nanas > apel",
          uraian:
            "Semangka turun lawan nanas. Nanas turun lawan apel. Paling berat semangka. Paling ringan apel.",
          contoh: "Semangka - Nanas - Apel.",
        },
        {
          nama: "🕒 Jam dan kelereng",
          singkat: "Hitung lalu baca jam",
          uraian:
            "Susu 5 tambah roti 2 sama dengan 7. Belajar dari 3 plus 1 jam = jarum pendek di 4. Melon 10 kurang mangga 4 sama dengan 6.",
          contoh: "Batu kecil lebih berat daripada balon besar.",
        },
      ],
      kuis: [
        { pertanyaan: "1. Urutan paling berat ke ringan?", alias: ["semangka", "nanas", "apel"] },
        { pertanyaan: "2. Susu 5 dan roti 2 butuh berapa kelereng?", alias: ["7", "tujuh"] },
        { pertanyaan: "3. Selesai 1 jam setelah pukul 3, jarum pendek di?", alias: ["4", "empat"] },
        { pertanyaan: "4. Balon naik, batu turun. Mana yang lebih berat?", alias: ["batu"] },
        { pertanyaan: "5. Tika bilang jam 12 lewat 30 adalah pukul 6 tepat?", alias: ["salah"] },
        { pertanyaan: "6. Selisih melon 10 dan mangga 4?", alias: ["6", "enam"] },
        { pertanyaan: "7. Pendek di 2, panjang di 12. Pukul?", alias: ["2", "dua"] },
        { pertanyaan: "8. Robot 9, sudah 5, tambah berapa?", alias: ["4", "empat"] },
        { pertanyaan: "9. Kereta pukul 10, jarum pendek ke angka?", alias: ["10", "sepuluh"] },
        { pertanyaan: "10. Kalimat kunci turun ke bawah artinya?", alias: ["berat", "lebih berat"] },
      ],
      voice: [
        [
          "Luar biasa! Sebelum kita masuk ke Lembar Evaluasi Siswa, mari kita ingat kembali 3 kunci utama tentang berat benda dan waktu bersama Kapten IGIL!",
        ],
        [
          "Sekarang saatnya menguji ketelitianmu di Lembar Evaluasi Siswa Bab 6! Ada 10 soal tentang pengukuran berat benda dan waktu. Amati posisi timbangan dan jarum jamnya dengan saksama ya!",
        ],
      ],
    },
  ],
};
