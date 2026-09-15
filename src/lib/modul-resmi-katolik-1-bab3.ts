import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_KATOLIK1_BAB3 = "Bab 3: Menjaga Taman Firdaus Kita";

export const MODUL_KATOLIK1_BAB3: ModulResmiPai = {
  id: "katolik-1-bab3",
  judul: JUDUL_KATOLIK1_BAB3,
  pola: /taman firdaus|tanggung jawab ekologis|yesus sahabatku|laudato/,
  motivasi:
    "Santo Fransiskus menyebut matahari saudara dan bulan saudari. Kita penjaga Rumah Kita Bersama: siram tanaman, pilah sampah, hemat air.",
  kunciJawaban: "B,A,C,B,A,B,C,A,B,A",
  sketsaKartu: [
    "Nia dan Ali di kebun sekolah, matahari dan bulan sebagai saudara.",
    "Anak mengangkat botol plastik dari selokan tersumbat.",
    "Anak menyiram tanaman kelas dan membuang sampah ke bak daur ulang.",
    "Anak mematikan keran toilet yang mengalir deras.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Tuhan menciptakan bumi dan isinya yang sangat baik (Bdk. Kejadian 1). Tindakan yang mencerminkan anak Katolik yang bertanggung jawab merawat bumi di sekolah adalah...
A) Membiarkan air keran toilet tetap mengalir deras walau sudah tidak digunakan lagi.
B) Merawat tanaman kelas dengan menyiramnya secara teratur dan membuang sampah pada tempatnya agar lingkungan tetap asri.
C) Menginjak-injak tanaman bunga yang baru ditanam oleh bapak tukang kebun.
D) Membuang botol ke selokan supaya cepat hilang.`,
    `[Soal 2 - PG - Tipe: HOTS]
Santo Fransiskus Asisi memanggil matahari saudara dan bulan saudari karena...
A) Seluruh alam, hewan, dan tumbuhan adalah ciptaan Allah yang satu, jadi mereka saudara yang dilindungi.
B) Matahari bisa berbicara bahasa manusia.
C) Bulan adalah adik kandungnya.
D) Ia tidak suka manusia.`,
    `[Soal 3 - PG - Tipe: Reguler]
Laudato Si' mengajarkan manusia adalah...
A) Pemilik alam yang boleh serakah.
B) Penonton yang tidak peduli.
C) Penjaga yang bertanggung jawab atas Rumah Kita Bersama.
D) Penguasa yang merusak hutan.`,
    `[Soal 4 - PG - Tipe: Reguler]
Selokan tersumbat botol plastik menandakan...
A) Bumi sedang dirawat dengan baik.
B) Bumi sedang sakit karena sampah yang salah tempat.
C) Botol lebih bahagia di air.
D) Tuhan menyukai sampah.`,
    `[Soal 5 - PG - Tipe: Reguler]
Pola hidup ramah lingkungan usia dini meliputi...
A) Menghemat air, memilah sampah, menanam, dan merawat hewan dengan kasih.
B) Membiarkan keran terbuka.
C) Menginjak bunga baru.
D) Membuang sampah ke sungai.`,
    `[Soal 6 - PG - Tipe: HOTS]
Jika kita hanya kagum pada cerita Fransiskus tetapi membiarkan selokan tersumbat, yang kurang adalah...
A) Aksi nyata sebagai penjaga ciptaan.
B) Patung yang lebih besar.
C) Lagu yang lebih keras.
D) Liburan ke hutan.`,
    `[Soal 7 - PG - Tipe: Reguler]
Kejadian 1 menyatakan ciptaan Allah...
A) Jelek dan boleh dirusak.
B) Hanya untuk orang kaya.
C) Sangat baik, maka kita merawatnya.
D) Tidak perlu air.`,
    `[Soal 8 - PG - Tipe: Reguler]
Tempat yang tepat untuk botol plastik bekas adalah...
A) Tempat sampah daur ulang.
B) Selokan kantin.
C) Pot bunga hidup.
D) Saku tanpa dicuci selamanya.`,
    `[Soal 9 - PG - Tipe: HOTS]
Menginjak tanaman baru yang ditanam tukang kebun...
A) Menunjukkan kita penjaga yang baik.
B) Merusak karya kasih dan kerja orang lain serta ciptaan Allah.
C) Membuat bunga lebih kuat.
D) Tidak ada hubungannya dengan iman.`,
    `[Soal 10 - PG - Tipe: Reguler]
Ali mengajak Nia mengambil botol di selokan. Sikap itu...
A) Menjaga titipan Tuhan, bukan merusak.
B) Membuat bumi menangis.
C) Membuang waktu saja.
D) Hanya untuk orang dewasa.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Saudara Matahari di Kebun Sekolah",
      pengantar:
        "Halaman sekolah Katolik yang hijau. Ibu Guru bercerita tentang Santo Fransiskus Asisi, pelindung lingkungan.",
      labelDaftar: "Percakapan Nia dan Ali tentang saudara ciptaan",
      kolom: 1,
      item: [
        {
          nama: "Saudara dan saudari",
          singkat: "Fransiskus Asisi",
          uraian:
            "Nia kagum: Santo Fransiskus memanggil matahari saudara dan bulan saudari. Ali menjawab: seluruh alam, hewan, dan tumbuhan adalah ciptaan Allah yang satu, jadi mereka saudara yang dilindungi.",
          contoh: "Alam = saudara. Lindungi, jangan rusak.",
        },
        {
          nama: "Selokan menangis",
          singkat: "Botol plastik",
          uraian:
            "Selokan dekat kantin tersumbat botol. Nia berkata bumi sedang menangis kesakitan. Kagum pada cerita saja tidak cukup jika sampah dibiarkan.",
          contoh: "Lihat selokan. Jangan lewat saja.",
        },
        {
          nama: "Dibuang ke daur ulang",
          singkat: "Tugas penjaga",
          uraian:
            "Tuhan mempercayakan alam untuk dijaga, bukan dirusak. Ali mengajak mengambil botol dan membuangnya ke tempat sampah daur ulang.",
          contoh: "Ambil botol. Buang ke bak daur ulang.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Santo Fransiskus memanggil matahari sebagai...?",
          alias: ["saudara"],
        },
        {
          pertanyaan: "2. Selokan tersumbat oleh...?",
          alias: ["botol", "plastik"],
        },
        {
          pertanyaan: "3. Botol dibuang ke tempat sampah...?",
          alias: ["daur ulang", "sampah"],
        },
      ],
      voice: [
        [
          "Santo Fransiskus memanggil matahari saudara dan bulan saudari. Alam, hewan, dan tumbuhan adalah saudara kita.",
        ],
        [
          "Selokan tersumbat botol. Bumi menangis. Kita ambil botolnya dan buang ke bak daur ulang. Tuhan menitipkan alam untuk dijaga.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Penjaga Rumah Kita Bersama",
      pengantar:
        "Laudato Si' mengajarkan kita bukan pemilik yang serakah, melainkan penjaga ciptaan. Anak belajar sebab-akibat lewat aksi kecil.",
      labelDaftar: "Laudato Si' dan pola hidup ramah lingkungan",
      kolom: 1,
      item: [
        {
          nama: "Bukan pemilik serakah",
          singkat: "Paus Fransiskus",
          uraian:
            "Tanggung jawab penjaga ciptaan: manusia merawat keberlanjutan ciptaan Allah. Bumi disebut Rumah Kita Bersama. Merusak rumah bersama berarti kurang mengasihi saudara.",
          contoh: "Jaga rumah bersama. Jangan serakah.",
        },
        {
          nama: "Sebab dan akibat",
          singkat: "Nalar kritis anak",
          uraian:
            "Keran yang dibiarkan mengalir memboroskan air. Sampah di selokan membuat air kotor. Tanaman yang diinjak mati. Anak melihat akibat, lalu memilih aksi yang merawat.",
          contoh: "Keran mati. Sampah ke bak. Bunga tidak diinjak.",
        },
        {
          nama: "Aksi usia dini",
          singkat: "Hemat, pilah, tanam, kasih",
          uraian:
            "Menghemat air, memilah sampah, menanam tanaman, dan merawat hewan piaraan dengan kasih. Siram tanaman kelas secara teratur agar halaman asri.",
          contoh: "Siram. Pilah. Hemat air.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Manusia adalah penjaga atau pemilik yang serakah?",
          alias: ["penjaga"],
        },
        {
          pertanyaan: "2. Keran toilet yang tidak dipakai harus...?",
          alias: ["mati", "ditutup", "dimatikan"],
        },
        {
          pertanyaan: "3. Tanaman kelas perlu... secara teratur?",
          alias: ["disiram", "siram", "dirawat"],
        },
      ],
      voice: [
        [
          "Laudato Si': bumi adalah Rumah Kita Bersama. Kita penjaga, bukan pemilik yang merusak.",
        ],
        [
          "Hemat air, pilah sampah, siram tanaman, rawat hewan. Jangan biarkan keran mengalir. Jangan injak bunga baru.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Tangan Hijau di Sekolah dan di Rumah",
      pengantar:
        "Taman Firdaus dilatih dengan mata yang melihat sampah dan tangan yang bertindak. Guru memandu piket kebun. Orang tua menuntun hemat air.",
      labelDaftar: "Latihan merawat ciptaan",
      kolom: 2,
      item: [
        {
          nama: "Piket saudara alam",
          singkat: "Untuk guru",
          uraian:
            "Ceritakan Fransiskus, lalu ajak dua anak menyiram pot dan memeriksa selokan. Diskusikan: jika semua menginjak bunga baru, apa yang terjadi minggu depan?",
          contoh: "Siram. Angkat botol. Jangan injak.",
        },
        {
          nama: "Keran dan bak di rumah",
          singkat: "Untuk orang tua",
          uraian:
            "Latih mematikan keran, memilah botol, dan merawat satu tanaman atau hewan dengan kasih. Doa singkat: Tuhan, ajar kami menjaga Rumah Kita Bersama.",
          contoh: "Keran mati. Botol dipilah. Satu doa.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Di sekolah, sampah dibuang ke...?",
          alias: ["tempat sampah", "bak", "daur ulang"],
        },
        {
          pertanyaan: "2. Tanaman kelas disiram secara...?",
          alias: ["teratur", "rutin", "setiap"],
        },
        {
          pertanyaan: "3. Bumi adalah Rumah Kita...?",
          alias: ["bersama"],
        },
      ],
      voice: [
        [
          "Di sekolah, siram tanaman kelas dan buang sampah pada tempatnya. Jangan injak bunga tukang kebun.",
        ],
        [
          "Di rumah, matikan keran, pilah botol, rawat satu tanaman. Berdoa: Tuhan, jaga kami menjadi penjaga yang baik.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih tindakan anak Katolik yang merawat bumi di sekolah.",
      labelDaftar: "Pilihan ganda etika lingkungan",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Merawat bumi di sekolah",
          uraian:
            "Tindakan tepat: menyiram tanaman kelas secara teratur dan membuang sampah pada tempatnya. Bukan membiarkan keran deras, bukan menginjak bunga baru.",
          contoh: "Siram. Sampah ke bak.",
        },
        {
          nama: "Ingat penjaga",
          singkat: "Ciptaan itu baik",
          uraian:
            "Kejadian 1: ciptaan sangat baik. Anak Katolik merawat, bukan merusak. Fransiskus mengajak kita memanggil alam sebagai saudara.",
          contoh: "Baik. Maka dirawat.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Merawat bumi di sekolah: siram tanaman dan buang...?",
          alias: ["sampah", "tempatnya"],
        },
      ],
      voice: [
        [
          "Anak Katolik merawat bumi: siram tanaman kelas dan buang sampah pada tempatnya.",
        ],
        [
          "Jangan biarkan keran mengalir. Jangan injak bunga baru. Tuhan menciptakan bumi yang sangat baik.",
        ],
      ],
    },
  ],
};
