import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_KHONGHUCU1_BAB3 = "Bab 3: Belajar Meneladani Nabi Kongzi";

export const MODUL_KHONGHUCU1_BAB3: ModulResmiPai = {
  id: "khonghucu-1-bab3",
  judul: JUDUL_KHONGHUCU1_BAB3,
  pola: /nabi kongzi|kongzi|xiao dan ren/,
  motivasi:
    "Nabi Kongzi utusan Tian, guru agung. Sejak kecil suka belajar, rendah hati, adil, dan sopan. Jangan malas bertanya. Xiu Shen: perbaiki diri setiap hari.",
  kunciJawaban: "B,A,C,B,A,B,C,A,B,A",
  sketsaKartu: [
    "Made dan Nia memandang lukisan guru agung berjubah di depan altar Litang.",
    "Nabi Kongzi kecil belajar tekun bersama ibunya di negeri Lu.",
    "Anak bermain adil, mengalah, dan menyapa teman dengan hormat.",
    "Anak berani bertanya kepada guru saat pelajaran belum dipahami.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Ketika Nabi Kongzi kecil bermain bersama teman-temannya di halaman, beliau tidak pernah berebut mainan dan selalu menyapa temannya dengan hormat. Sikap Nabi Kongzi kecil ini mengajarkan kita untuk...
A) Menjadi anak yang manja dan selalu ingin menang sendiri.
B) Menghargai teman bermain, mengutamakan kedamaian, dan menjauhi sifat egois.
C) Tidak usah bermain dengan teman lain.
D) Diam saja di rumah.`,
    `[Soal 2 - PG - Tipe: Reguler]
Nabi Agung utusan Tian dalam agama Khonghucu bernama...
A) Nabi Kongzi atau Konfusius.
B) Raja tanpa nama.
C) Hanya pelukis jubah.
D) Teman Made saja.`,
    `[Soal 3 - PG - Tipe: Reguler]
Sifat Nabi Kongzi yang paling menonjol sejak kecil dan patut ditiru di sekolah adalah sangat suka...
A) Tidur siang.
B) Berebut mainan.
C) Belajar atau membaca.
D) Marah-marah.`,
    `[Soal 4 - PG - Tipe: HOTS]
Mengapa kita tidak boleh malas bertanya kepada guru atau orang tua jika pelajaran belum dipahami?
A) Agar cepat pulang saja.
B) Karena Nabi Kongzi sejak kecil tidak malas bertanya tentang hal baik; bertanya adalah cara memperbaiki diri.
C) Agar tidak perlu belajar.
D) Karena pertanyaan membuat kita manja.`,
    `[Soal 5 - PG - Tipe: Reguler]
Nabi Kongzi lahir di...
A) Negeri Lu, Tiongkok kuno.
B) Litang modern saja.
C) Halaman sekolah Made.
D) Toko jubah.`,
    `[Soal 6 - PG - Tipe: Reguler]
Ibu Nabi Kongzi bernama...
A) Nia.
B) Yan Zhengzai.
C) Ibu Guru kelas.
D) Ratu tanpa nama.`,
    `[Soal 7 - PG - Tipe: Reguler]
Hao Xue berarti...
A) Malas bertanya.
B) Berebut mainan.
C) Semangat belajar yang luar biasa tinggi.
D) Ingin menang sendiri.`,
    `[Soal 8 - PG - Tipe: Reguler]
Xiu Shen berarti...
A) Memperbaiki diri dengan menuntut ilmu.
B) Mengejek teman.
C) Tidur larut.
D) Tidak usah bermain.`,
    `[Soal 9 - PG - Tipe: Reguler]
Saat bermain, Nabi Kongzi kecil...
A) Selalu ingin menang sendiri.
B) Suka mengalah, adil, dan memimpin permainan dengan sopan.
C) Tidak pernah menyapa.
D) Malas keluar rumah.`,
    `[Soal 10 - PG - Tipe: Reguler]
Karakter yang diteladani dari Nabi Kongzi adalah...
A) Rendah hati, menolong yang lemah, menghormati tata krama, dan gigih belajar.
B) Manja dan egois.
C) Malas bertanya.
D) Berebut jubah.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Lukisan Guru Agung di Litang",
      pengantar:
        "Di depan altar Vihara atau Litang. Made dan Nia memandangi lukisan seorang guru agung berbaju jubah panjang.",
      labelDaftar: "Percakapan Made dan Nia tentang Nabi Kongzi",
      kolom: 1,
      item: [
        {
          nama: "Utusan Tian",
          singkat: "Nabi Kongzi",
          uraian:
            "Beliau adalah Nabi Kongzi, Konfusius, utusan Tian yang menjadi guru agung bagi kita semua. Beliau mengajarkan hidup sopan dan penuh cinta kasih.",
          contoh: "Kongzi. Guru agung. Utusan Tian.",
        },
        {
          nama: "Suka belajar",
          singkat: "Sejak kecil",
          uraian:
            "Sejak seumur kita, Nabi Kongzi sangat suka belajar. Beliau tidak pernah malas bertanya tentang hal-hal baik.",
          contoh: "Suka belajar. Berani bertanya.",
        },
        {
          nama: "Bermain dengan sopan",
          singkat: "Adil dan mengalah",
          uraian:
            "Saat bermain, beliau suka mengalah, adil, dan memimpin permainan dengan sangat sopan. Bukan manja, bukan ingin menang sendiri.",
          contoh: "Adil. Mengalah. Sapa hormat.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Nabi Agung utusan Tian bernama Nabi...?",
          alias: ["kongzi", "konfusius"],
        },
        {
          pertanyaan: "2. Sejak kecil Nabi Kongzi sangat suka...?",
          alias: ["belajar", "bertanya"],
        },
        {
          pertanyaan: "3. Saat bermain beliau adil, sopan, dan suka...?",
          alias: ["mengalah", "adil"],
        },
      ],
      voice: [
        [
          "Made dan Nia memandang lukisan jubah di Litang. Itu Nabi Kongzi, utusan Tian, guru agung kita.",
        ],
        [
          "Sejak kecil beliau suka belajar dan berani bertanya. Saat bermain: mengalah, adil, dan sopan.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Hao Xue dan Xiu Shen",
      pengantar:
        "Nabi Kongzi lahir sederhana di negeri Lu. Semangat belajarnya tinggi. Kita meneladani rendah hati, menolong, tata krama, dan memperbaiki diri.",
      labelDaftar: "Masa kecil dan karakter teladan",
      kolom: 1,
      item: [
        {
          nama: "Negeri Lu",
          singkat: "Kesederhanaan",
          uraian:
            "Nabi Kongzi lahir di negeri Lu, Tiongkok kuno. Beliau hidup sederhana bersama ibunya, Yan Zhengzai, namun semangat belajarnya luar biasa (Hao Xue).",
          contoh: "Lu. Sederhana. Suka belajar.",
        },
        {
          nama: "Bukan egois",
          singkat: "Saat bermain",
          uraian:
            "Tidak berebut mainan, menyapa hormat: menghargai teman, mengutamakan damai, menjauhi egois. Bukan manja, bukan menolak bermain.",
          contoh: "Hargai teman. Jangan egois.",
        },
        {
          nama: "Berani bertanya",
          singkat: "Xiu Shen",
          uraian:
            "Jika pelajaran belum dipahami, jangan malas bertanya kepada guru atau orang tua. Nabi Kongzi tidak malas bertanya tentang hal baik. Itu cara memperbaiki diri.",
          contoh: "Belum paham? Tanya. Perbaiki diri.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Saat bermain, Nabi Kongzi mengajarkan kita menghargai...?",
          alias: ["teman", "damai"],
        },
        {
          pertanyaan: "2. Nabi Agung utusan Tian bernama...?",
          alias: ["kongzi", "konfusius"],
        },
        {
          pertanyaan: "3. Sifat menonjol sejak kecil: sangat suka...?",
          alias: ["belajar", "membaca", "bertanya"],
        },
      ],
      voice: [
        [
          "Nabi Kongzi lahir di negeri Lu, hidup sederhana bersama ibu Yan Zhengzai, tetapi sangat suka belajar.",
        ],
        [
          "Jangan egois saat bermain. Jika belum paham, bertanyalah. Itu keteladanan Xiu Shen.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Meneladani di Sekolah dan di Rumah",
      pengantar:
        "Keteladanan Nabi Kongzi dilatih saat bermain dan saat pelajaran sulit. Guru memandu. Orang tua menemani.",
      labelDaftar: "Latihan Hao Xue",
      kolom: 2,
      item: [
        {
          nama: "Main adil",
          singkat: "Untuk guru",
          uraian:
            "Ajak anak memimpin permainan dengan sopan. Siapa yang berebut, siapa yang mengalah? Tulis nama Nabi Kongzi. Diskusikan mengapa malas bertanya merugikan diri.",
          contoh: "Main adil. Tulis Kongzi. Berani tanya.",
        },
        {
          nama: "Tanya di rumah",
          singkat: "Untuk orang tua",
          uraian:
            "Jika PR belum dipahami, dampingi anak bertanya, jangan dimarahi. Ceritakan Nabi Kongzi kecil yang suka belajar meski hidup sederhana.",
          contoh: "Tanya. Jangan marah. Sederhana tapi tekun.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Nabi Kongzi kecil: berebut mainan atau mengalah?",
          alias: ["mengalah", "adil", "sopan"],
        },
        {
          pertanyaan: "2. Jika belum paham, kita... kepada guru?",
          alias: ["bertanya", "tanya"],
        },
        {
          pertanyaan: "3. Semangat belajar disebut Hao...?",
          alias: ["xue", "belajar"],
        },
      ],
      voice: [
        [
          "Di kelas, main adil seperti Nabi Kongzi kecil. Jangan egois. Tulis namanya: Kongzi.",
        ],
        [
          "Di rumah, jika PR sulit, bertanyalah. Nabi Kongzi sejak kecil tidak malas bertanya.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih sikap bermain yang diteladani, isi nama Nabi dan sifat sukanya, lalu jelaskan mengapa kita harus berani bertanya.",
      labelDaftar: "Pilihan, isian sejarah, dan esai penalaran",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Bermain sopan",
          uraian:
            "Keteladanan: menghargai teman, mengutamakan damai, menjauhi egois. Bukan manja ingin menang sendiri, bukan menolak bermain.",
          contoh: "Hargai. Damai. Jangan egois.",
        },
        {
          nama: "Kelompok B dan C",
          singkat: "Kongzi, belajar, tanya",
          uraian:
            "Nama: Nabi Kongzi atau Konfusius. Sifat: suka belajar atau membaca. Kita bertanya karena beliau tidak malas bertanya; itu cara memperbaiki diri.",
          contoh: "Kongzi. Suka belajar. Berani tanya.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Nabi Kongzi kecil mengajarkan kita menghargai teman dan menjauhi...?",
          alias: ["egois", "manja"],
        },
        {
          pertanyaan: "2. Nabi Agung utusan Tian bernama Nabi...?",
          alias: ["kongzi", "konfusius"],
        },
        {
          pertanyaan: "3. Sejak kecil beliau sangat suka...?",
          alias: ["belajar", "membaca"],
        },
        {
          pertanyaan: "4. Kita berani bertanya karena meneladani Nabi Kongzi yang tidak malas...?",
          alias: ["bertanya", "belajar"],
        },
      ],
      voice: [
        [
          "Saat bermain, hargai teman dan jauhi egois seperti Nabi Kongzi kecil. Bukan manja, bukan menolak bermain.",
        ],
        [
          "Nama beliau Nabi Kongzi. Suka belajar. Jika belum paham, bertanyalah kepada guru atau orang tua.",
        ],
      ],
    },
  ],
};
