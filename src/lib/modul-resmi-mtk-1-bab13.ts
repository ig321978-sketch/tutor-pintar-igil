import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { MISI_MTK1_BAB13, kuisDariMisi } from "@/lib/misi-kebun-mtk-1";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK1_BAB13 = "Bab 13: Waktu dan Durasi";

export const MODUL_MTK1_BAB13: ModulResmiPai = {
  id: "mtk-1-bab13",
  judul: JUDUL_MTK1_BAB13,
  pola: /waktu\s+dan\s+durasi\b|stasiun jam jago|burung hantu Igil/,
  motivasi:
    "Rara, Bimo, dan Rara belajar membaca jam bulat, menyusun jadwal, dan membedakan pagi, siang, sore, serta malam bersama burung hantu Igil.",
  kunciJawaban: "B,B,B,C,B,C,A,B,D,C",
  sketsaKartu: [
    "Rara, Bimo, dan Rara membaca jam dinding bersama burung hantu Igil.",
    "Papan jam bulat, urutan kegiatan, dan durasi.",
    "Igil menjaga menara jam di stasiun waktu.",
    "Poin penting dan lembar evaluasi waktu.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: LOTS]
Jarum pendek di angka 4, jarum panjang di angka 12. Jam berapa?
A) Jam 12 tepat
B) Jam 4 tepat
C) Jam 4 lewat 12
D) Jam 12 lewat 4`,
    `[Soal 2 - PG - Tipe: LOTS]
Rara berangkat sekolah pada pagi hari. Jam yang paling cocok...
A) Jam 12 tepat
B) Jam 7 tepat
C) Jam 3 tepat
D) Jam 9 malam`,
    `[Soal 3 - PG - Tipe: LOTS]
Setelah bangun tidur, kegiatan yang lebih dulu dilakukan adalah...
A) Tidur malam
B) Mandi
C) Sekolah
D) Makan malam`,
    `[Soal 4 - PG - Tipe: LOTS]
Langit jingga dan matahari mulai turun. Waktunya...
A) Pagi
B) Siang
C) Sore
D) Malam`,
    `[Soal 5 - PG - Tipe: LOTS]
Jarum pendek di angka 9, jarum panjang di angka 12. Jam berapa?
A) Jam 12 tepat
B) Jam 9 tepat
C) Jam 9 lewat 12
D) Jam 12 lewat 9`,
    `[Soal 6 - PG - Tipe: HOTS]
Mana yang lebih lama?
A) Berkedip
B) Minum air
C) Tidur malam
D) Memakai sepatu`,
    `[Soal 7 - PG - Tipe: LOTS]
Kegiatan paling awal pada pagi hari adalah...
A) Bangun tidur
B) Tidur malam
C) Bermain sore
D) Makan siang`,
    `[Soal 8 - PG - Tipe: HOTS]
Jam bangun naik 2 setiap hari: jam 4, jam 6, jam 8, berikutnya...
A) Jam 9
B) Jam 10
C) Jam 11
D) Jam 12`,
    `[Soal 9 - PG - Tipe: LOTS]
Langit gelap, ada bulan dan bintang. Waktunya...
A) Pagi
B) Siang
C) Sore
D) Malam`,
    `[Soal 10 - PG - Tipe: HOTS]
Jadwal mana yang tidak mungkin?
A) Bangun jam 6, lalu mandi, lalu sarapan jam 7
B) Sekolah jam 8, pulang jam 11, makan siang jam 12
C) Tidur jam 9 pagi, lalu sekolah jam 7 malam
D) Makan siang jam 12, bermain, tidur jam 8`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Rumah Jam Rara",
      pengantar: "Rara, Bimo, dan Rara membaca jam bulat, menyusun jadwal, dan membedakan waktu bersama Igil.",
      labelDaftar: "Lima adegan waktu",
      kolom: 1,
      item: [
        {
          nama: "Mengenal jam",
          singkat: "Pendek untuk jam",
          uraian: "Jarum pendek di angka 7 dan jarum panjang di angka 12 dibaca jam tujuh tepat.",
          contoh: "Jarum pendek menunjukkan jam. Jarum panjang di angka 12 artinya tepat.",
        },
        {
          nama: "Jam bulat",
          singkat: "Panjang selalu di 12",
          uraian: "Jam 6, jam 7, dan jam 12 tepat dibaca dari jarum pendek.",
          contoh: "Kedua jarum di angka 12 artinya jam dua belas tepat.",
        },
        {
          nama: "Urutan harian",
          singkat: "Dari bangun sampai tidur",
          uraian: "Bangun, mandi, sarapan, sekolah, lalu tidur.",
          contoh: "Bangun jam 6, sekolah jam 7.",
        },
        {
          nama: "Empat waktu",
          singkat: "Lihat langit",
          uraian: "Pagi, siang, sore, dan malam dibedakan dari matahari dan kegiatannya.",
          contoh: "Langit jingga berarti sore.",
        },
        {
          nama: "Durasi",
          singkat: "Sebentar atau lama",
          uraian: "Berkedip sebentar. Mandi sedang. Tidur malam lama.",
          contoh: "Tidur malam lebih lama daripada menggosok gigi.",
        },
      ],
      kuis: [
        { pertanyaan: "Jam berapa jika jarum pendek di 3 dan jarum panjang di 12?", alias: ["jam tiga tepat"] },
        { pertanyaan: "Gambar jarum jam 8 tepat.", alias: ["jam delapan tepat"] },
        { pertanyaan: "Jam berapa jika jarum pendek di 10 dan jarum panjang di 12?", alias: ["jam sepuluh tepat"] },
        { pertanyaan: "Gambar jarum jam 2, 5, 9, dan 11 tepat.", alias: ["2", "5", "9", "11"] },
        { pertanyaan: "Setelah bangun, mandi atau sarapan yang lebih dulu?", alias: ["mandi"] },
        { pertanyaan: "Urutkan bangun, sarapan, sekolah, dan tidur.", alias: ["bangun", "sarapan", "sekolah", "tidur"] },
        { pertanyaan: "Langit gelap dengan bulan dan bintang. Waktu apa?", alias: ["malam"] },
        { pertanyaan: "Pasangkan sekolah, makan siang, bermain, dan tidur dengan waktunya.", alias: ["sekolah", "makan", "bermain", "tidur"] },
        { pertanyaan: "Mana yang lebih lama, menggosok gigi atau tidur malam?", alias: ["tidur"] },
        { pertanyaan: "Masukkan minum, mandi, dan tidur ke kotak durasinya.", alias: ["minum", "mandi", "tidur"] },
        { pertanyaan: "Jarum pendek di 4 dan jarum panjang di 12. Jam berapa?", alias: ["jam 4 tepat"] },
        { pertanyaan: "Pasangkan pagi, siang, dan malam dengan kegiatannya.", alias: ["sekolah", "makan", "tidur"] },
        { pertanyaan: "Susun bangun, mandi, sarapan, sekolah, dan tidur.", alias: ["bangun", "mandi", "sarapan", "sekolah", "tidur"] },
        { pertanyaan: "Periksa tiga pernyataan tentang jam dan matahari.", alias: ["benar", "salah"] },
        { pertanyaan: "Jadwal mana yang urutannya terbalik?", alias: ["sekolah", "tidur", "bangun"] },
      ],
      voice: [
        [
          "Jam punya jarum pendek untuk jam dan jarum panjang untuk menit.",
          "Jarum panjang di angka 12 berarti jam tepat.",
          "Kegiatan harian punya urutan, dari pagi sampai malam.",
          "Pagi, siang, sore, dan malam dilihat dari matahari. Durasi adalah lama kegiatan.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Papan Jam",
      pengantar: "Membaca jam bulat, menyusun urutan, dan membandingkan durasi.",
      labelDaftar: "Lima papan waktu",
      kolom: 1,
      item: [
        {
          nama: "Bagian jam",
          singkat: "Pendek dan panjang",
          uraian: "Jarum pendek biru menunjukkan jam. Jarum panjang kuning menunjukkan menit. Angka 12 adalah tanda jam tepat.",
          contoh: "Jarum pendek di 9 dan jarum panjang di 12 dibaca jam sembilan tepat.",
        },
        {
          nama: "Jam 1 sampai 12",
          singkat: "Baca yang pendek",
          uraian: "Jarum panjang tetap di 12. Jarum pendek di 1 dibaca jam satu tepat, di 11 dibaca jam sebelas tepat.",
          contoh: "Jarum pendek di angka berapa, itulah jamnya.",
        },
        {
          nama: "Jadwal pagi",
          singkat: "Urutan dan jam",
          uraian: "Bangun jam 6, mandi, sarapan jam 7, sekolah jam 7, belajar jam 8.",
          contoh: "Sarapan tidak mungkin sebelum bangun.",
        },
        {
          nama: "Ciri waktu",
          singkat: "Matahari dan langit",
          uraian: "Pagi sejuk, siang panas, sore jingga, malam gelap.",
          contoh: "Langit jingga dan matahari turun berarti sore.",
        },
        {
          nama: "Sebentar sedang lama",
          singkat: "Bandingkan durasi",
          uraian: "Berkedip sebentar. Mandi sedang. Sekolah dan tidur malam lama.",
          contoh: "Mandi lebih lama daripada menggosok gigi.",
        },
      ],
      kuis: [
        { pertanyaan: "Jam berapa jika jarum pendek di 2 dan jarum panjang di 12?", alias: ["jam dua tepat"] },
        { pertanyaan: "Gambar jarum jam 5 tepat.", alias: ["jam lima tepat"] },
        { pertanyaan: "Jam berapa jika jarum pendek di 1 dan jarum panjang di 12?", alias: ["jam satu tepat"] },
        { pertanyaan: "Gambar jarum jam 3, 7, dan 10 tepat.", alias: ["3", "7", "10"] },
        { pertanyaan: "Mana yang lebih dulu, sekolah atau mandi?", alias: ["mandi"] },
        { pertanyaan: "Urutkan sarapan, sekolah, dan tidur.", alias: ["sarapan", "sekolah", "tidur"] },
        { pertanyaan: "Matahari tinggi di langit terang. Waktu apa?", alias: ["siang"] },
        { pertanyaan: "Pasangkan matahari terbit dan bulan.", alias: ["pagi", "malam"] },
        { pertanyaan: "Mana yang lebih lama, mandi atau menggosok gigi?", alias: ["mandi"] },
        { pertanyaan: "Masukkan berkedip dan tidur malam ke kotak durasinya.", alias: ["berkedip", "tidur"] },
        { pertanyaan: "Jarum pendek di 6 dan jarum panjang di 12. Bacaan yang benar?", alias: ["jam enam tepat"] },
        { pertanyaan: "Pasangkan ciri langit dengan waktunya.", alias: ["siang", "malam", "sore"] },
        { pertanyaan: "Susun berkedip, gosok gigi, dan tidur malam.", alias: ["berkedip", "gigi", "tidur"] },
        { pertanyaan: "Periksa tiga pernyataan jadwal.", alias: ["benar", "salah"] },
        { pertanyaan: "Jadwal mana yang tidak mungkin?", alias: ["sekolah", "setelah", "tidur"] },
      ],
      voice: [
        [
          "Jarum pendek lebih lambat dan menunjukkan jam. Jarum panjang di angka 12 berarti tepat.",
          "Kegiatan harian diikuti dari bangun sampai tidur.",
          "Pagi, siang, sore, dan malam punya ciri langit masing-masing.",
          "Durasi adalah berapa lama sebuah kegiatan.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Stasiun Jam Igil",
      pengantar: "Siswa menjadi penjaga stasiun waktu. Setiap pos memasang jam atau menyusun jadwal.",
      labelDaftar: "Sepuluh pos stasiun",
      kolom: 1,
      item: [
        {
          nama: "Menara jam",
          singkat: "Pasang lalu susun",
          uraian: "Warga berangkat sekolah jam 7 tepat. Jadwal yang terbalik harus diperbaiki. Langit jingga berarti sore.",
          contoh: "Sepuluh pos selesai, sepuluh lonceng terkumpul.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK1_BAB13),
      voice: [
        [
          "Kalian menjadi penjaga stasiun waktu. Pasang jam yang tepat pada setiap kegiatan.",
          "Kalau jadwalnya benar, lonceng stasiun berbunyi.",
          "Sepuluh pos selesai, sepuluh lonceng terkumpul, menara jam besar terbuka.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal membaca jam, menyusun jadwal, dan membedakan waktu.",
      labelDaftar: "Lembar evaluasi waktu",
      kolom: 1,
      item: [
        {
          nama: "Membaca jam",
          singkat: "Pendek dulu",
          uraian: "Jam 10 tepat, jam 8 tepat, dan jam 2 tepat dibaca dari jarum pendek. Jarum panjang di angka 12 berarti tepat.",
          contoh: "Tidur malam tidak dilakukan pada pagi hari.",
        },
        {
          nama: "Jadwal Rara",
          singkat: "Urutan dan jam",
          uraian: "Bangun harus paling awal. Sarapan dilakukan sebelum sekolah. Sarapan jam 8 tidak masuk akal jika sekolah jam 7.",
          contoh: "Langit jingga dan matahari turun berarti sore.",
        },
      ],
      kuis: [
        { pertanyaan: "Gambar jarum jam 10 tepat dan tulis bacaannya.", alias: ["jam sepuluh tepat"] },
        { pertanyaan: "Jarum pendek di 8 dan jarum panjang di 12. Jam berapa?", alias: ["jam 8 tepat"] },
        { pertanyaan: "Jarum pendek di 2 dan jarum panjang di 12. Ucapkan jamnya.", alias: ["jam dua tepat"] },
        { pertanyaan: "Apakah tidur malam jam 9 pagi masuk akal?", alias: ["salah", "malam"] },
        { pertanyaan: "Pasangkan pagi, siang, dan malam dengan cirinya.", alias: ["terbit", "tinggi", "bintang"] },
        { pertanyaan: "Urutkan bangun, mandi, sarapan, dan tidur.", alias: ["bangun", "mandi", "sarapan", "tidur"] },
        { pertanyaan: "Jam tujuh tepat. Jarum pendek ada di angka berapa?", alias: ["7"] },
        { pertanyaan: "Susun berkedip, mandi, dan tidur malam.", alias: ["berkedip", "mandi", "tidur"] },
        { pertanyaan: "Langit jingga dan matahari rendah. Sebutkan waktunya dan alasannya.", alias: ["sore"] },
        { pertanyaan: "Mandi jam 6, bangun jam 6, sekolah jam 7, sarapan jam 8. Apa yang salah?", alias: ["bangun", "sarapan"] },
      ],
      voice: [
        [
          "Ada sepuluh soal. Baca jamnya, susun jadwalnya, atau tebak waktu dari langit.",
          "Lihat jarum pendek dulu. Periksa apakah urutannya masuk akal.",
          "Jangan terburu-buru, lalu periksa lagi jawabanmu.",
        ],
      ],
    },
  ],
};
