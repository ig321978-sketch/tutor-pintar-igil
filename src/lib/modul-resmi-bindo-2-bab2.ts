import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_BINDO2_BAB2 = "Bab 2: Menjaga Kesehatan";

export const MODUL_BINDO2_BAB2: ModulResmiPai = {
  id: "bindo-2-bab2",
  judul: JUDUL_BINDO2_BAB2,
  pola: /menjaga kesehatan|kalimat perintah|kalimat ajakan|tanda tanya dan seru/,
  motivasi:
    "Tanda tanya untuk mencari informasi, tanda seru untuk perintah tegas. Kalimat ajakan memakai Ayo atau Mari dan diakhiri tanda seru, tanpa paksaan.",
  kunciJawaban: "B,B,S,S,B,A,C,B,A,B",
  sketsaKartu: [
    "Anak membedakan kalimat tanya dan perintah saat cuci tangan.",
    "Anak mengajak teman: Ayo, kita bersihkan saluran air!",
    "Anak mengerjakan evaluasi tanda baca, ajakan, dan prosedur cuci tangan.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Ibu melihat genangan air di halaman yang bisa menjadi sarang nyamuk demam berdarah. Ibu ingin memerintahkan Ali mengurasnya. Kalimat perintah Ibu yang paling tepat adalah...
A) Mengapa Ali tidak menguras genangan air itu?
B) Ali, tolong kuras genangan air di halaman itu sekarang!
C) Mari kita lihat genangan air di halaman, Ali.
D) Apakah ada genangan air, Ali?`,
    `[Soal 2 - PG - Tipe: HOTS]
Kalimat di bawah ini yang dikategorikan sebagai kalimat ajakan untuk hidup sehat adalah...
A) Bersihkan kamarmu!
B) Ayo, kita cuci tangan menggunakan sabun sebelum makan!
C) Siapa yang belum mandi pagi ini?
D) Di mana sabun cuci tangan?`,
    `[Soal 3 - PG - Tipe: HOTS]
Kalimat "Tutup keran air itu setelah bak mandi penuh!" adalah kalimat tanya karena membutuhkan jawaban. Pernyataan ini...
A) Benar.
B) Salah; itu kalimat perintah, diakhiri tanda seru, menyuruh melakukan sesuatu.
C) Benar karena ada kata setelah.
D) Itu kalimat ajakan.`,
    `[Soal 4 - PG - Tipe: HOTS]
Kata tanya "Mengapa" berfungsi menanyakan lokasi atau tempat. Pernyataan ini...
A) Benar.
B) Salah; mengapa menanyakan alasan, di mana menanyakan tempat.
C) Benar hanya di rumah sakit.
D) Mengapa sama dengan kapan.`,
    `[Soal 5 - PG - Tipe: Reguler]
"Kapan kita harus memotong kuku" diakhiri dengan...
A) Tanda seru perintah.
B) Tanda tanya.
C) Titik biasa saja, tanpa tanda.
D) Koma.`,
    `[Soal 6 - PG - Tipe: Reguler]
"Mari kita berolahraga teratur" adalah...
A) Kalimat ajakan, tanda seru.
B) Kalimat tanya.
C) Kalimat berita tanpa semangat.
D) Kalimat larangan.`,
    `[Soal 7 - PG - Tipe: Reguler]
"Buang sampah itu pada tempatnya" adalah...
A) Kalimat tanya.
B) Kalimat ajakan karena ada Mari.
C) Kalimat perintah, tanda seru.
D) Kalimat pujian.`,
    `[Soal 8 - PG - Tipe: Reguler]
ADIKSIMBA adalah...
A) Nama vitamin.
B) Kumpulan kata tanya: apa, di mana, kapan, siapa, mengapa, bagaimana.
C) Nama rambu merah.
D) Jenis fabel.`,
    `[Soal 9 - PG - Tipe: HOTS]
Teks prosedur cuci tangan memakai kalimat perintah berurutan karena...
A) Urutan langkah membuat tangan benar-benar bersih; jika diacak, kuman bisa tertinggal.
B) Supaya lebih panjang.
C) Supaya tanda tanya banyak.
D) Supaya tidak perlu sabun.`,
    `[Soal 10 - PG - Tipe: Reguler]
Ciri kalimat ajakan adalah...
A) Hanya tanda tanya.
B) Memakai Ayo atau Mari dan biasanya tanda seru.
C) Memaksa dengan ancaman.
D) Tanpa kata kunci.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Rambu Tanda Baca, Tanya dan Perintah",
      pengantar:
        "Infografis jalur tanda baca: tanda tanya di akhir kalimat tanya, tanda seru di akhir kalimat perintah. Kata tanya ADIKSIMBA: apa, di mana, kapan, siapa, mengapa, bagaimana.",
      labelDaftar: "Tanda tanya dan tanda seru",
      kolom: 1,
      item: [
        {
          nama: "Tanda tanya",
          singkat: "Mencari informasi",
          uraian:
            "Kalimat tanya diakhiri tanda tanya. Contoh: Apakah kamu sudah mencuci tangan? Di mana kamu membeli sabun ini? Intonasi naik di akhir.",
          contoh: "Apakah... ? Di mana... ?",
        },
        {
          nama: "Tanda seru perintah",
          singkat: "Menyuruh dengan tegas",
          uraian:
            "Kalimat perintah diakhiri tanda seru. Contoh: Bersihkan bak mandi itu sekarang! Ali, cepat sikat gigimu! Tetap ucapkan dengan suara sopan.",
          contoh: "Kuras genangan itu sekarang!",
        },
        {
          nama: "Cakrawala bahasa",
          singkat: "ADIKSIMBA",
          uraian:
            "Apa, Di mana, Kapan, Siapa, Mengapa, Bagaimana. Mengapa menanyakan alasan, bukan tempat. Tempat memakai di mana.",
          contoh: "Mengapa = alasan. Di mana = tempat.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Bagaimana perbedaan intonasi suaramu ketika mengucapkan 'Ali sudah sikat gigi?' dengan 'Ali, cepat sikat gigimu!'? Coba peragakan!",
          alias: ["tanya", "naik", "perintah", "tegas", "seru", "sopan", "gigi"],
        },
      ],
      kuisTulis: {
        pertanyaan:
          "Lengkapilah kalimat berikut dengan tanda baca yang tepat: Di mana kamu membeli sabun cuci tangan ini [ .... ]",
        alias: ["?", "tanda tanya", "?"],
      },
      voice: [
        [
          "Sahabat kecil kelas 2, saat kita berbicara, intonasi suara kita bisa naik atau turun tergantung tujuan kita. Di dalam dunia tulis-menulis, intonasi itu diwakili oleh tanda baca.",
          "Jika kalian ingin bertanya karena penasaran dan mencari informasi, pasanglah tanda tanya di akhir kalimat. Gunakan kata tanya seperti mengapa atau bagaimana.",
          "Tetapi jika kalian ingin memberikan instruksi yang tegas—seperti meminta adik membuang sampah—gunakan kalimat perintah yang diakhiri tanda seru. Ingat, saat mengucapkan perintah, tetap gunakan suara yang sopan ya!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Kalimat Ajakan yang Santun",
      pengantar:
        "Infografis formula ajakan: kata Ayo atau Mari, diakhiri tanda seru. Contoh sehat: Ayo, kita bersihkan saluran air! Mari, kita makan buah dan sayur setiap hari!",
      labelDaftar: "Ayo, Mari, dan etika ajakan",
      kolom: 1,
      item: [
        {
          nama: "Kata kunci",
          singkat: "Ayo atau Mari",
          uraian:
            "Kalimat ajakan harus mengandung Ayo atau Mari. Tujuannya mengajak orang lain berbuat baik secara sukarela, bukan memaksa atau mengancam.",
          contoh: "Ayo, kita berolahraga pagi!",
        },
        {
          nama: "Tanda akhir",
          singkat: "Tanda seru",
          uraian:
            "Ajakan diakhiri tanda seru karena mendorong semangat. Beda dengan perintah: perintah menyuruh satu orang, ajakan mengajak bersama-sama.",
          contoh: "Mari kita cuci tangan!",
        },
        {
          nama: "Etika komunikasi",
          singkat: "Sukarela, tanpa ancaman",
          uraian:
            "Ajakan santun membuat teman senang ikut. Contoh: Ayo, kita jaga kebersihan laci meja dari sarang nyamuk!",
          contoh: "Ajakan = bersama, sukarela.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Jika kamu ingin mengajak seluruh teman sekelas menjaga kebersihan laci meja dari sarang nyamuk, kalimat ajakan seperti apa yang akan kamu ucapkan?",
          alias: ["ayo", "mari", "bersih", "laci", "nyamuk", "bersama", "kita"],
        },
      ],
      kuisTulis: {
        pertanyaan: "Buatlah satu kalimat ajakan menggunakan kata Mari!",
        alias: ["mari", "ayo"],
      },
      voice: [
        [
          "Anak-anak hebat, menjaga kesehatan lingkungan dan tubuh itu tidak bisa dilakukan sendirian. Kita membutuhkan bantuan teman-teman.",
          "Bagaimana cara mengajak mereka? Kita gunakan kalimat ajakan. Ciri khasnya ada kata ajaib di depan: Ayo atau Mari. Contohnya: Ayo, kita berolahraga pagi!",
          "Kalimat ini diakhiri tanda seru karena mendorong semangat. Kalimat ajakan yang santun membuat teman-teman senang dan bersemangat ikut serta melakukan perbuatan sehat bersama kalian.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih perintah Ibu dan ajakan hidup sehat, tentukan benar-salah jenis kalimat serta fungsi mengapa, jodohkan tanda baca, lalu jelaskan mengapa prosedur cuci tangan harus tertib.",
      labelDaftar: "Pilihan, benar-salah, mencocokkan, dan esai",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A dan B",
          singkat: "Perintah dan ajakan",
          uraian:
            "Perintah Ibu: Ali, tolong kuras genangan itu sekarang! Ajakan sehat: Ayo, kita cuci tangan memakai sabun sebelum makan! Tutup keran! itu perintah, bukan tanya. Mengapa = alasan, bukan tempat.",
          contoh: "Kuras sekarang! Ayo cuci tangan. Mengapa ≠ di mana.",
        },
        {
          nama: "Kelompok C dan D",
          singkat: "Tanda dan prosedur",
          uraian:
            "Kapan memotong kuku: tanya (?). Mari berolahraga: ajakan (!). Buang sampah: perintah (!). Prosedur cuci tangan harus berurutan supaya kuman hilang.",
          contoh: "? ajakan ! perintah ! Urutan penting.",
        },
      ],
      kuis: [
        { pertanyaan: "Perintah Ibu pada Ali?", alias: ["kuras", "sekarang"] },
        { pertanyaan: "Ajakan hidup sehat?", alias: ["ayo", "cuci"] },
        { pertanyaan: "Tutup keran itu tanya?", alias: ["salah", "perintah"] },
        { pertanyaan: "Mengapa menanya tempat?", alias: ["salah", "alasan"] },
        { pertanyaan: "Mari olahraga jenisnya?", alias: ["ajak"] },
        { pertanyaan: "Mengapa prosedur tertib?", alias: ["urut", "kuman", "bersih"] },
      ],
      voice: [
        [
          "Perintah memakai tanda seru. Ajakan memakai Ayo atau Mari. Tutup keran itu perintah, bukan tanya.",
        ],
        [
          "Mengapa menanyakan alasan. Prosedur cuci tangan harus berurutan agar tangan benar-benar bersih.",
        ],
      ],
    },
  ],
};
