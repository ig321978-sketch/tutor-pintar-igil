import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_PAI2_BAB5 = "Bab 5: Asyiknya Belajar Kisah Nabi Nuh a.s.";

export const MODUL_PAI2_BAB5: ModulResmiPai = {
  id: "pai-2-bab5",
  judul: JUDUL_PAI2_BAB5,
  pola: /nabi nuh|kisah nabi nuh|asyiknya belajar kisah nabi nuh/,
  motivasi:
    "Nabi Nuh Ulul Azmi, dakwah 950 tahun, sabar meski diejek. Kan'an durhaka dan tenggelam. Bahtera di atas bukit: doa plus kerja keras. Yang beriman dan sepasang hewan selamat.",
  kunciJawaban: "C,B,B,S,A,B,C,A,B,B",
  sketsaKartu: [
    "Nabi Nuh berdakwah sabar meski kaum dan Kan'an membangkang.",
    "Bahtera dibangun di atas bukit, banjir datang, orang beriman selamat.",
    "Anak meneladani sabar dan kerja keras saat soal sulit.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Ketika diperintahkan membuat bahtera di atas bukit, kaum yang ingkar menertawakan Nabi Nuh. Sikap beliau adalah...
A) Membalas mengejek dan melempar batu kepada mereka.
B) Berhenti membuat kapal karena malu diejek orang banyak.
C) Tetap sabar, tabah, dan terus bekerja keras menuntaskan perintah Allah.
D) Turun gunung dan ikut menyembah berhala.`,
    `[Soal 2 - PG - Tipe: HOTS]
Makhluk apa saja yang diperintahkan masuk ke bahtera agar selamat dari banjir besar?
A) Hanya manusia yang kaya dan memiliki rumah mewah.
B) Orang-orang yang beriman kepada Allah serta berpasang-pasangan hewan jantan dan betina.
C) Semua patung berhala milik kaum kafir.
D) Hanya Kan'an di puncak gunung.`,
    `[Soal 3 - PG - Tipe: HOTS]
Kesuksesan dan keselamatan hanya dicapai melalui doa dan kerja keras nyata. Pernyataan ini...
A) Salah.
B) Benar; Nabi Nuh berdoa dan tetap merakit kapal siang malam.
C) Benar hanya doa tanpa usaha.
D) Benar hanya usaha tanpa doa.`,
    `[Soal 4 - PG - Tipe: HOTS]
Kan'an selamat karena memanjat gunung yang tinggi. Pernyataan ini...
    A) Benar.
B) Salah; ia durhaka dan tenggelam, gunung tidak menyelamatkannya.
C) Benar karena ia anak nabi.
D) Tidak ada banjirnya.`,
    `[Soal 5 - PG - Tipe: Reguler]
Gelar Nabi Nuh sebagai nabi yang sangat sabar adalah...
A) Ulul Azmi.
B) Kan'an.
C) Bahtera.
D) Taufan.`,
    `[Soal 6 - PG - Tipe: Reguler]
Nama anak Nabi Nuh yang durhaka dan tenggelam adalah...
A) Ulul Azmi.
B) Kan'an.
C) Malik.
D) Khannas.`,
    `[Soal 7 - PG - Tipe: Reguler]
Kapal raksasa Nabi Nuh disebut...
A) Taufan.
B) Kiblat.
C) Bahtera.
D) Siku.`,
    `[Soal 8 - PG - Tipe: Reguler]
Kaum kafir dalam kisah ini bersifat...
A) Membangkang, mengejek, dan menolak iman.
B) Sabar dan taat.
C) Rajin merakit kapal.
D) Selamat di bahtera.`,
    `[Soal 9 - PG - Tipe: HOTS]
Malas dan mudah menyerah saat belajar bertentangan dengan Nabi Nuh karena...
A) Beliau juga malas di bukit.
B) Beliau kerja keras merakit bahtera meski diejek, tidak menyerah.
C) Beliau berhenti setelah sehari.
D) Beliau membalas dengan marah.`,
    `[Soal 10 - PG - Tipe: HOTS]
Saat soal matematika sulit, meneladani Nabi Nuh berarti...
A) Menyerah dan menangis saja.
B) Tetap berusaha, berdoa, dan tidak malu bertanya, seperti beliau tetap merakit kapal.
C) Mengejek teman yang bisa.
D) Membuang buku.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Ketabahan Nabi Nuh As. dalam Berdakwah",
      pengantar:
        "Infografis: Ulul Azmi, dakwah 950 tahun, diejek, bahkan Kan'an dan istri membangkang. Hikmah: jangan membalas amarah, doakan yang menjahili.",
      labelDaftar: "Gelar, masa dakwah, dan tantangan",
      kolom: 1,
      item: [
        {
          nama: "Ulul Azmi",
          singkat: "Sabar luar biasa",
          uraian:
            "Nabi Nuh digelari Ulul Azmi karena kesabaran dan keteguhannya. Beliau utusan Allah yang mengajak umat menyembah Allah.",
          contoh: "Ulul Azmi = sangat sabar.",
        },
        {
          nama: "Hampir seribu tahun",
          singkat: "950 tahun",
          uraian:
            "Beliau berdakwah sangat lama. Kaum menutup telinga, mengejek beliau gila. Istri dan anak Kan'an ikut membangkang.",
          contoh: "Lama. Diejek. Tetap sabar.",
        },
        {
          nama: "Hikmah untuk kita",
          singkat: "Jangan balas marah",
          uraian:
            "Jika diejek mainan, jangan membalas makian. Sabar seperti Nabi Nuh, lalu doakan teman agar menjadi baik.",
          contoh: "Diejek? Sabar. Doakan.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Mengapa Nabi Nuh As. digelari salah satu Nabi Ulul Azmi oleh Allah SWT? Sifat apa yang menonjol dari beliau?",
          alias: ["sabar", "tabah", "ulul", "azmi", "ketabahan"],
        },
      ],
      kuisTulis: {
        pertanyaan:
          "Nama anak Nabi Nuh As. yang durhaka dan tenggelam oleh banjir besar adalah ........................",
        alias: ["kan'an", "kanan", "kaan", "kanaan", "kan an"],
      },
      voice: [
        [
          "Anak-anak kelas 2 yang salih, pernahkah kalian merasa sedih atau ingin marah ketika ada teman yang mengejek mainanmu? Mari kita belajar dari seorang manusia yang sangat hebat kesabarannya, yaitu Nabi Nuh As.",
          "Beliau adalah utusan Allah yang berdakwah mengajak umatnya menyembah Allah dalam waktu yang sangat lama, hampir seribu tahun! Bayangkan anak-anak, setiap kali Nabi Nuh berbicara tentang kebaikan, kaumnya justru menutup telinga mereka dengan jari dan mengejek beliau sebagai orang gila.",
          "Bahkan istri dan anak kandung beliau yang bernama Kan'an ikut membangkang. Namun, Nabi Nuh tidak pernah membalas dengan kemarahan atau makian. Beliau tetap sabar dan terus berdoa memohon petunjuk. Sungguh teladan kesabaran yang luar biasa!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Kerja Keras Membuat Bahtera di atas Bukit",
      pengantar:
        "Infografis: perintah membuat kapal raksasa di atas bukit batu. Kerja keras, teliti, patuh. Taufan datang; orang beriman dan sepasang hewan selamat. Doa harus dibarengi usaha.",
      labelDaftar: "Perintah, sifat mulia, dan akhir kisah",
      kolom: 1,
      item: [
        {
          nama: "Perintah aneh di mata kaum",
          singkat: "Kapal di bukit",
          uraian:
            "Allah memerintahkan membuat bahtera di atas bukit gersang. Kaum tertawa: mana ada air di sini? Nabi Nuh tetap taat.",
          contoh: "Kapal di bukit. Tetap taat.",
        },
        {
          nama: "Kerja keras",
          singkat: "Siang malam",
          uraian:
            "Beliau menebang pohon, menggergaji, menyusun papan. Doa saja tidak cukup; usaha nyata menyelesaikan kapal.",
          contoh: "Doa plus kerja keras.",
        },
        {
          nama: "Taufan dan keselamatan",
          singkat: "Iman yang selamat",
          uraian:
            "Hujan badai menenggelamkan bumi. Yang selamat: orang beriman dan sepasang hewan di bahtera. Kan'an yang memanjat gunung tetap tenggelam karena durhaka.",
          contoh: "Iman selamat. Durhaka tenggelam.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Bagaimana siswa kelas 2 meneladani kerja keras Nabi Nuh ketika menghadapi soal matematika yang sulit?",
          alias: ["usaha", "coba", "berdoa", "tidak menyerah", "belajar", "tanya"],
        },
      ],
      kuisTulis: {
        pertanyaan:
          "Kapal raksasa yang dibuat oleh Nabi Nuh As. bersama para pengikutnya disebut ........................",
        alias: ["bahtera", "kapal"],
      },
      voice: [
        [
          "Anak-anak yang kreatif, coba bayangkan membuat kapal laut raksasa tetapi tidak di tepi pantai, melainkan di atas bukit batu yang gersang dan tinggi! Itulah perintah Allah kepada Nabi Nuh As.",
          "Kaum yang kafir semakin menertawakan beliau: Hei Nuh, buat apa membuat kapal di atas bukit? Mana ada air di sini! Tetapi Nabi Nuh tidak malas. Beliau mencontohkan sifat kerja keras yang luar biasa. Beliau menebang pohon, menggergaji kayu, dan menyusun papan kapal siang malam.",
          "Ketika kapal selesai, Allah menurunkan hujan badai yang sangat dahsyat hingga bumi tenggelam. Hanya kapal Nabi Nuh dan orang-orang yang beriman serta hewan-hewan yang selamat. Kerja keras dan ketaatan terbukti menyelamatkan mereka!",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih sikap saat diejek dan siapa yang masuk bahtera, tentukan benar-salah doa-usaha dan Kan'an, jodohkan tokoh, lalu jelaskan mengapa malas bertentangan dengan merakit bahtera.",
      labelDaftar: "Pilihan, benar-salah, mencocokkan, dan esai",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A dan B",
          singkat: "Sabar dan bahtera",
          uraian:
            "Diejek: tetap sabar dan kerja keras. Yang masuk kapal: orang beriman dan sepasang hewan. Doa plus usaha: benar. Kan'an selamat di gunung: salah.",
          contoh: "Sabar. Iman dan hewan. Kan'an tenggelam.",
        },
        {
          nama: "Kelompok C dan D",
          singkat: "Tokoh dan antimalas",
          uraian:
            "Nabi Nuh: sabar, taat, pekerja keras. Kan'an: membangkang dan tenggelam. Kaum kafir: durhaka dan sombong. Malas menyerah bertentangan dengan merakit bahtera siang malam.",
          contoh: "Nuh sabar. Kan'an durhaka. Jangan malas.",
        },
      ],
      kuis: [
        { pertanyaan: "Sikap Nabi Nuh saat diejek?", alias: ["sabar", "kerja"] },
        { pertanyaan: "Siapa masuk bahtera?", alias: ["iman", "hewan"] },
        { pertanyaan: "Doa plus kerja keras?", alias: ["benar"] },
        { pertanyaan: "Kan'an selamat di gunung?", alias: ["salah", "tidak"] },
        { pertanyaan: "Nabi Nuh bersifat?", alias: ["sabar", "keras"] },
        { pertanyaan: "Malas bertentangan karena?", alias: ["kerja", "bahtera", "menyerah"] },
      ],
      voice: [
        [
          "Nabi Nuh tetap sabar dan kerja keras. Yang selamat: orang beriman dan sepasang hewan. Kan'an tenggelam.",
        ],
        [
          "Nuh sabar dan taat. Kan'an durhaka. Kaum kafir sombong. Jangan malas saat belajar, meneladani bahtera di bukit.",
        ],
      ],
    },
  ],
};
