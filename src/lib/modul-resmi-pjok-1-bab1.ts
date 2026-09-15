import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_PJOK1_BAB1 = "Bab 1: Bergerak Itu Sehat!";

export const MODUL_PJOK1_BAB1: ModulResmiPai = {
  id: "pjok-1-bab1",
  judul: JUDUL_PJOK1_BAB1,
  pola: /bergerak itu sehat|gerak dasar lokomotor|pola gerak dasar lokomotor/,
  motivasi:
    "Berjalan, berlari, melompat, dan meloncat membuat tubuh pindah tempat. Angkat kaki, pandang ke depan, mendarat dengan lutut mengeper.",
  kunciJawaban: "A,B,B,A,C,B,A,B,C,A",
  sketsaKartu: [
    "Ali dan Nia pemanasan di lapangan sekolah, membicarakan kanguru dan kelinci yang melompat.",
    "Empat gerak lokomotor: berjalan, berlari, melompat, meloncat.",
    "Anak berlatih angkat kaki dan pandangan lurus di sekolah serta di rumah.",
    "Siswa menilai posisi lari dan lutut mengeper saat mendarat.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Ketika Ali sedang mengikuti lomba lari di sekolah, posisi tubuh yang paling tepat agar Ali dapat berlari dengan cepat dan tidak mudah terjatuh adalah...
A) Badan condong ke depan, pandangan mata fokus melihat ke arah garis akhir (finish), dan lengan diayunkan.
B) Badan membungkuk ke belakang sambil melihat ke arah langit.
C) Berlari sambil menengok ke kanan dan ke kiri untuk melihat penonton.
D) Berlari dengan kepala menunduk melihat sepatu terus-menerus.`,
    `[Soal 2 - PG - Tipe: HOTS]
Mengapa saat kita mendarat setelah melompat, posisi kedua lutut kita harus sedikit ditekuk atau mengeper seperti pegas?
A) Agar lompatan kita bisa langsung diulang dengan cepat.
B) Untuk meredam benturan tubuh dengan tanah sehingga kaki kita aman dan terhindar dari cedera.
C) Supaya sepatu kita tidak cepat kotor atau rusak.
D) Supaya wasit memberi nilai tambahan.`,
    `[Soal 3 - PG - Tipe: HOTS]
Gerakan berguling di tempat atau menolehkan kepala ke kanan termasuk gerak lokomotor. Pernyataan ini...
A) Benar, karena kepala bergerak.
B) Salah, karena tubuh tidak berpindah tempat.
C) Benar jika dilakukan di lapangan.
D) Benar hanya saat pemanasan.`,
    `[Soal 4 - PG - Tipe: Reguler]
Gerak lokomotor adalah gerakan...
A) Berpindah tempat dari satu titik ke titik lain.
B) Diam seperti patung tanpa otot bekerja.
C) Hanya memutar kepala di tempat.
D) Hanya duduk di bangku.`,
    `[Soal 5 - PG - Tipe: Reguler]
Saat berjalan, salah satu kaki...
A) Keduanya selalu di udara.
B) Keduanya selalu kaku lurus.
C) Tetap ada yang menyentuh tanah secara bergantian.
D) Tidak boleh diangkat sama sekali.`,
    `[Soal 6 - PG - Tipe: Reguler]
Ciri berlari yang membedakannya dari berjalan adalah...
A) Badan selalu mundur.
B) Ada fase kedua kaki melayang di udara.
C) Pandangan selalu ke langit.
D) Kaki tidak boleh diangkat.`,
    `[Soal 7 - PG - Tipe: Reguler]
Melompat dilakukan dengan tumpuan...
A) Satu kaki, lalu mendarat dua kaki.
B) Duduk di rumput.
C) Hanya tangan.
D) Kepala menunduk.`,
    `[Soal 8 - PG - Tipe: Reguler]
Meloncat mendorong tubuh ke atas dengan tumpuan...
A) Satu jari.
B) Dua kaki sekaligus.
C) Punggung saja.
D) Satu siku.`,
    `[Soal 9 - PG - Tipe: HOTS]
Jika kita berjalan tanpa mengangkat kaki cukup tinggi, risiko yang paling mungkin adalah...
A) Berlari lebih cepat.
B) Melayang seperti kanguru.
C) Mudah tersandung batu dan terjatuh.
D) Lutut otomatis mengeper.`,
    `[Soal 10 - PG - Tipe: Reguler]
Saat berjalan atau berlari, pandangan mata sebaiknya...
A) Fokus ke arah depan.
B) Selalu ke arah langit.
C) Tertutup rapat.
D) Bolak-balik ke penonton.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog di Lapangan Sekolah",
      pengantar:
        "Di lapangan sekolah yang luas sebelum pelajaran PJOK dimulai. Ali dan Nia sedang melakukan pemanasan ringan.",
      labelDaftar: "Percakapan Ali dan Nia tentang berpindah tempat",
      kolom: 1,
      item: [
        {
          nama: "Kanguru dan kelinci",
          singkat: "Melompat pindah tempat",
          uraian:
            "Ali teringat kanguru dan kelinci di televisi. Mereka berpindah tempat dengan melompat tinggi.",
          contoh: "Hewan pun berpindah tempat dengan cara tertentu.",
        },
        {
          nama: "Manusia juga hebat",
          singkat: "Jalan, lari, lompat",
          uraian:
            "Nia mengingatkan: manusia bisa berpindah dengan banyak cara, seperti berjalan, berlari, dan melompat.",
          contoh: "Satu tubuh, banyak cara pindah tempat.",
        },
        {
          nama: "Angkat kaki, pandang depan",
          singkat: "Agar tidak tersandung",
          uraian:
            "Jika kaki tidak diangkat tinggi, kita mudah tersandung batu. Saat berjalan atau berlari, tubuh dan pandangan harus fokus ke depan.",
          contoh: "Angkat kaki. Lihat ke depan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Kanguru dan kelinci berpindah tempat dengan cara apa?",
          alias: ["lompat", "melompat", "loncat"],
        },
        {
          pertanyaan: "2. Sebut satu cara manusia berpindah tempat.",
          alias: ["jalan", "berjalan", "lari", "berlari", "lompat", "melompat"],
        },
        {
          pertanyaan: "3. Jika kaki tidak diangkat tinggi saat berjalan, kita mudah apa?",
          alias: ["tersandung", "jatuh", "terjatuh", "batu"],
        },
      ],
      voice: [
        [
          "Di lapangan sekolah, Ali dan Nia pemanasan. Ali berkata, Nia, lihat kanguru dan kelinci di TV kemarin! Mereka berpindah tempat dengan cara melompat tinggi sekali.",
          "Nia menjawab, Iya, Ali! Kita sebagai manusia juga hebat. Kita bisa berpindah tempat dengan banyak cara, seperti berjalan, berlari, dan melompat.",
        ],
        [
          "Ali bertanya, Coba bayangkan jika kita berjalan tetapi kaki kita tidak diangkat tinggi, apa yang akan terjadi?",
          "Nia menjawab, Wah, kita pasti mudah tersandung batu dan terjatuh, Ali! Makanya, saat berjalan atau berlari, tubuh dan pandangan mata kita harus selalu fokus melihat ke arah depan.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Gerak Lokomotor Dasar",
      pengantar:
        "Gerak lokomotor adalah gerakan berpindah tempat. Bagian tubuh bergerak dari satu titik ke titik lain. Empat gerak dasar: berjalan, berlari, melompat, dan meloncat.",
      labelDaftar: "Berjalan, berlari, melompat, meloncat",
      kolom: 1,
      item: [
        {
          nama: "Berjalan",
          singkat: "Satu kaki tetap di tanah",
          uraian:
            "Langkah kiri dan kanan bergantian. Salah satu kaki tetap menyentuh tanah. Badan tegak, pandangan lurus ke depan.",
          contoh: "Badan tegak, pandang depan.",
        },
        {
          nama: "Berlari",
          singkat: "Kedua kaki sempat melayang",
          uraian:
            "Langkah dipercepat. Pada saat tertentu kedua kaki melayang di udara. Badan condong ke depan, lengan diayunkan, mata ke garis akhir.",
          contoh: "Ada fase kedua kaki di udara.",
        },
        {
          nama: "Melompat dan meloncat",
          singkat: "Tumpuan beda",
          uraian:
            "Melompat: tumpuan satu kaki, mendarat dua kaki, lutut mengeper. Meloncat: tumpuan dua kaki sekaligus. Lutut ditekuk saat mendarat agar tidak cedera.",
          contoh: "Mendarat, lutut mengeper seperti pegas.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Gerak lokomotor artinya gerak apa?",
          alias: ["pindah", "berpindah", "pindah tempat"],
        },
        {
          pertanyaan: "2. Saat berlari, kedua kaki sempat apa di udara?",
          alias: ["melayang", "tidak menyentuh", "terangkat"],
        },
        {
          pertanyaan: "3. Saat mendarat, lutut dibuat bagaimana?",
          alias: ["tekuk", "ditekuk", "mengeper", "pegas"],
        },
      ],
      voice: [
        [
          "Gerak lokomotor adalah gerakan berpindah tempat. Berjalan: langkah kiri kanan bergantian, satu kaki tetap di tanah, badan tegak, pandang depan.",
        ],
        [
          "Berlari lebih cepat. Ada saat kedua kaki melayang. Melompat tumpuan satu kaki, mendarat dua kaki. Meloncat tumpuan dua kaki. Mendarat, lutut mengeper supaya tidak cedera.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Latihan Pindah Tempat di Sekolah dan di Rumah",
      pengantar:
        "Keterampilan lokomotor dilatih dengan permainan. Guru memberi aba-aba. Orang tua menemani di halaman yang aman.",
      labelDaftar: "Dua tempat berlatih",
      kolom: 2,
      item: [
        {
          nama: "Lintasan aba-aba",
          singkat: "Untuk guru",
          uraian:
            "Buat lintasan pendek. Aba-aba: jalan, lari, lompat, loncat. Ingatkan pandangan ke depan dan lutut mengeper saat mendarat. Diskusikan: mana yang kedua kakinya sempat melayang?",
          contoh: "Jalan. Lari. Lompat. Loncat.",
        },
        {
          nama: "Halaman aman",
          singkat: "Untuk orang tua",
          uraian:
            "Ajak anak berjalan dan melompat di halaman rata, jauh dari batu tajam. Tanyakan: mengapa kita mengangkat kaki dan melihat ke depan?",
          contoh: "Angkat kaki, lihat depan, mendarat pelan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Aba-aba lintasan bisa berupa jalan, lari, lompat, dan apa?",
          alias: ["loncat", "meloncat"],
        },
        {
          pertanyaan: "2. Saat mendarat, lutut dibuat seperti apa?",
          alias: ["mengeper", "tekuk", "pegas"],
        },
        {
          pertanyaan: "3. Halaman latihan sebaiknya jauh dari apa?",
          alias: ["batu", "tajam", "bahaya"],
        },
      ],
      voice: [
        [
          "Di sekolah, lintasan pendek. Aba-aba: jalan, lari, lompat, loncat. Pandang ke depan. Mendarat, lutut mengeper.",
        ],
        [
          "Di rumah, pilih halaman rata yang aman. Berjalan dan melompat. Angkat kaki, lihat depan, mendarat pelan.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Saatnya menganalisis posisi lari dan cara mendarat yang aman, lalu menentukan benar atau salah tentang gerak lokomotor.",
      labelDaftar: "Analisis gerak dan benar-salah",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Pilihan ganda HOTS",
          uraian:
            "Lari cepat: badan condong depan, pandangan ke finish, lengan diayun. Mendarat: lutut mengeper untuk meredam benturan.",
          contoh: "Pandang finish. Lutut seperti pegas.",
        },
        {
          nama: "Kelompok B",
          singkat: "Benar atau salah",
          uraian:
            "Berguling di tempat atau menoleh kepala bukan lokomotor, karena tubuh tidak berpindah tempat.",
          contoh: "Lokomotor = pindah tempat.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Posisi lari yang aman dan cepat, pandangan ke mana?",
          alias: ["depan", "finish", "garis akhir", "lurus"],
        },
        {
          pertanyaan: "2. Lutut mengeper saat mendarat supaya apa?",
          alias: ["cedera", "aman", "redam", "benturan", "pegas"],
        },
        {
          pertanyaan: "3. Menoleh kepala di tempat. Apakah lokomotor?",
          alias: ["tidak", "bukan", "salah"],
        },
      ],
      voice: [
        [
          "Kelompok A: lari cepat, badan condong depan, mata ke garis akhir, lengan diayun. Mendarat, lutut mengeper agar kaki aman.",
        ],
        [
          "Kelompok B: berguling di tempat atau menoleh kepala bukan gerak lokomotor. Lokomotor itu berpindah tempat.",
        ],
      ],
    },
  ],
};
