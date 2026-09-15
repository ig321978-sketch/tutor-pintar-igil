import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_PJOK1_BAB2 = "Bab 2: Menjaga Keseimbangan";

export const MODUL_PJOK1_BAB2: ModulResmiPai = {
  id: "pjok-1-bab2",
  judul: JUDUL_PJOK1_BAB2,
  pola: /menjaga keseimbangan|nonlokomotor|non-lokomotor|non lokomotor|gerak dasar nonlokomotor/,
  motivasi:
    "Bergerak tidak selalu pindah tempat. Menekuk, memutar, dan berdiri satu kaki melatih otot, kelenturan, dan keseimbangan.",
  kunciJawaban: "B,B,A,C,B,A,B,C,A,B",
  sketsaKartu: [
    "Nia berdiri satu kaki seperti burung bangau di gedung olahraga, Ali heran karena Nia tidak pindah tempat.",
    "Gerak non-lokomotor: menekuk, memutar, keseimbangan statis pesawat terbang.",
    "Anak menahan pose bangau dan merentangkan tangan di sekolah serta di rumah.",
    "Siswa membedakan gerak di tempat dengan lari atau lompat.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Manakah di antara aktivitas berikut yang sepenuhnya menggunakan variasi gerak non-lokomotor?
A) Berlari mengejar bola di lapangan.
B) Berdiri tegak sambil memutar lengan ke depan untuk melakukan pemanasan sebelum berenang.
C) Melompat melewati rintangan kardus.
D) Berjalan cepat menuju garis start.`,
    `[Soal 2 - PG - Tipe: HOTS]
Saat menirukan posisi pesawat terbang, Ali merentangkan kedua tangannya ke samping kiri dan kanan. Fungsi utama merentangkan tangan tersebut adalah...
A) Agar terlihat keren seperti pesawat sungguhan.
B) Membantu menjaga keseimbangan tubuh agar tidak mudah oleng dan jatuh.
C) Mengurangi rasa lelah pada kaki yang bertumpu.
D) Membuat badan pindah ke ujung lapangan.`,
    `[Soal 3 - PG - Tipe: Reguler]
Gerak non-lokomotor adalah gerakan...
A) Di tempat, tanpa perpindahan posisi tubuh secara keseluruhan.
B) Berpindah dari gerbang ke kelas.
C) Hanya berlari.
D) Hanya menendang bola.`,
    `[Soal 4 - PG - Tipe: Reguler]
Posisi burung bangau dilatih dengan cara...
A) Berlari mengelilingi lapangan.
B) Melompat rintangan.
C) Berdiri dengan satu kaki beberapa detik.
D) Melempar bola ke keranjang.`,
    `[Soal 5 - PG - Tipe: Reguler]
Menekuk lutut dan membungkuk menyentuh ujung kaki terutama melatih...
A) Kecepatan lari.
B) Kelenturan otot.
C) Melempar jauh.
D) Menendang gawang.`,
    `[Soal 6 - PG - Tipe: Reguler]
Memutar lengan, pinggang, atau kepala secara perlahan biasanya untuk...
A) Pemanasan sendi.
B) Mengganti baju keringat.
C) Minum es sirup.
D) Tidur di lapangan.`,
    `[Soal 7 - PG - Tipe: HOTS]
Nia diam seperti patung, tetapi otot kaki dan perutnya bekerja. Ini menunjukkan bahwa...
A) Diam berarti malas.
B) Gerak di tempat tetap melatih kekuatan dan keseimbangan.
C) Otot hanya bekerja saat berlari.
D) Keseimbangan tidak perlu dilatih.`,
    `[Soal 8 - PG - Tipe: Reguler]
Dalam posisi pesawat terbang, satu kaki...
A) Berlari.
B) Menendang bola.
C) Bertumpu, kaki lain dan tangan merentang.
D) Duduk di lantai.`,
    `[Soal 9 - PG - Tipe: Reguler]
Contoh menekuk bagian tubuh adalah...
A) Membungkuk menyentuh ujung kaki.
B) Berlari ke garis finish.
C) Melompat rintangan.
D) Menendang bola.`,
    `[Soal 10 - PG - Tipe: Reguler]
Fokus gerak non-lokomotor adalah...
A) Pindah tempat sejauh mungkin.
B) Stabilitas, kelenturan, dan kekuatan otot di tempat.
C) Mengejar bola secepat mungkin.
D) Melompat melewati kardus.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog Pose Burung Bangau",
      pengantar:
        "Di dalam gedung olahraga sekolah. Nia sedang mencoba berdiri dengan satu kaki seperti burung bangau.",
      labelDaftar: "Percakapan Ali dan Nia tentang gerak di tempat",
      kolom: 1,
      item: [
        {
          nama: "Diam seperti patung",
          singkat: "Tidak pindah tempat",
          uraian:
            "Ali heran Nia diam dan tidak berpindah. Nia sedang melatih gerak non-lokomotor: keseimbangan bangau.",
          contoh: "Tubuh diam, otot tetap bekerja.",
        },
        {
          nama: "Otot menahan tubuh",
          singkat: "Kaki dan perut",
          uraian:
            "Otot kaki dan perut bekerja keras agar tubuh tidak roboh. Bergerak tidak harus selalu pindah tempat.",
          contoh: "Seimbang, jangan roboh.",
        },
        {
          nama: "Lentur di tempat",
          singkat: "Tekuk, putar, ulur",
          uraian:
            "Menekuk lutut, memutar lengan, dan mengulurkan badan adalah gerakan di tempat yang membuat otot lentur.",
          contoh: "Tekuk, putar, ulur.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Nia menirukan hewan apa saat berdiri satu kaki?",
          alias: ["bangau", "burung bangau"],
        },
        {
          pertanyaan: "2. Gerak non-lokomotor apakah berpindah tempat?",
          alias: ["tidak", "tidak pindah", "di tempat"],
        },
        {
          pertanyaan: "3. Sebut satu gerak di tempat selain berdiri satu kaki.",
          alias: ["tekuk", "menekuk", "putar", "memutar", "ulur"],
        },
      ],
      voice: [
        [
          "Di gedung olahraga, Nia berdiri satu kaki. Ali bertanya, Nia, kamu sedang apa? Kok diam seperti patung dan tidak berpindah tempat sama sekali?",
          "Nia menjawab, Aku sedang melatih gerak non-lokomotor, Ali. Ini namanya gerakan keseimbangan bangau. Tubuhku diam di tempat, tapi otot kaki dan perutku bekerja keras menahan tubuh agar tidak roboh.",
        ],
        [
          "Ali kagum. Wah, hebat! Berarti bergerak itu tidak harus selalu berpindah tempat ya, Nia?",
          "Nia mengangguk. Betul, Ali! Menekuk lutut, memutar lengan, dan mengulurkan badan juga termasuk gerakan di tempat yang membuat otot kita lentur!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Gerak Non-Lokomotor Fase A",
      pengantar:
        "Gerak non-lokomotor dilakukan di tempat tanpa perpindahan posisi tubuh secara keseluruhan. Fokusnya stabilitas, kelenturan, dan kekuatan otot lokal.",
      labelDaftar: "Menekuk, memutar, keseimbangan statis",
      kolom: 1,
      item: [
        {
          nama: "Menekuk bagian tubuh",
          singkat: "Lutut dan pinggang",
          uraian:
            "Tekuk lutut ke depan atau belakang. Bungkuk menyentuh ujung kaki untuk melatih kelenturan otot pinggang. Lakukan pelan, jangan disentak.",
          contoh: "Bungkuk pelan, sentuh ujung kaki.",
        },
        {
          nama: "Memutar",
          singkat: "Pemanasan sendi",
          uraian:
            "Putar persendian lengan, pinggang, atau kepala secara perlahan. Ini pemanasan agar sendi siap bergerak.",
          contoh: "Putar lengan ke depan, pelan-pelan.",
        },
        {
          nama: "Keseimbangan statis",
          singkat: "Bangau dan pesawat",
          uraian:
            "Berdiri satu kaki beberapa detik. Atau posisi pesawat terbang: satu kaki bertumpu, tangan direntangkan ke samping agar tubuh tidak oleng.",
          contoh: "Tangan merentang menjaga seimbang.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Gerak non-lokomotor dilakukan di mana?",
          alias: ["tempat", "di tempat", "tidak pindah"],
        },
        {
          pertanyaan: "2. Merentangkan tangan pada pose pesawat berfungsi untuk apa?",
          alias: ["seimbang", "keseimbangan", "oleng", "jatuh"],
        },
        {
          pertanyaan: "3. Memutar lengan termasuk pemanasan apa?",
          alias: ["sendi", "pemanasan", "lengan"],
        },
      ],
      voice: [
        [
          "Gerak non-lokomotor: di tempat, tidak pindah. Menekuk lutut, bungkuk sentuh ujung kaki. Memutar lengan, pinggang, kepala, pelan-pelan.",
        ],
        [
          "Keseimbangan bangau: berdiri satu kaki. Pesawat terbang: satu kaki tumpu, tangan merentang kiri kanan supaya tidak oleng.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Latihan Seimbang di Sekolah dan di Rumah",
      pengantar:
        "Keseimbangan dilatih dengan hitungan. Guru mengawasi posture. Orang tua menemani di lantai yang tidak licin.",
      labelDaftar: "Dua tempat berlatih",
      kolom: 2,
      item: [
        {
          nama: "Hitung bangau",
          singkat: "Untuk guru",
          uraian:
            "Siswa berdiri satu kaki sambil dihitung 1 sampai 5, lalu ganti kaki. Lanjut pose pesawat. Ingatkan: tangan merentang, pandangan satu titik di depan.",
          contoh: "Hitung 1-5. Ganti kaki. Rentangkan tangan.",
        },
        {
          nama: "Lantai tidak licin",
          singkat: "Untuk orang tua",
          uraian:
            "Latih menekuk, memutar lengan, dan berdiri satu kaki di rumah. Tanyakan: otot mana yang terasa bekerja saat menahan tubuh?",
          contoh: "Otot kaki dan perut menahan tubuh.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Pose bangau memakai berapa kaki yang menumpu?",
          alias: ["satu", "satu kaki", "1"],
        },
        {
          pertanyaan: "2. Pandangan saat seimbang diarahkan ke mana?",
          alias: ["depan", "satu titik", "fokus"],
        },
        {
          pertanyaan: "3. Latihan seimbang di rumah jangan di lantai yang apa?",
          alias: ["licin", "basah", "bahaya"],
        },
      ],
      voice: [
        [
          "Di sekolah, hitung bangau satu sampai lima, ganti kaki. Lalu pose pesawat. Tangan merentang. Pandang satu titik di depan.",
        ],
        [
          "Di rumah, lantai jangan licin. Tekuk, putar lengan, berdiri satu kaki. Rasakan otot kaki dan perut menahan tubuh.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Saatnya membedakan gerak di tempat dengan gerak pindah tempat, dan menjelaskan fungsi tangan merentang.",
      labelDaftar: "Mengurai konsep gerakan",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Mengurai konsep",
          uraian:
            "Memutar lengan sambil berdiri adalah non-lokomotor. Berlari atau melompat rintangan adalah lokomotor. Tangan merentang pada pose pesawat untuk menjaga keseimbangan.",
          contoh: "Di tempat = non-lokomotor. Tangan merentang = seimbang.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Berdiri sambil memutar lengan termasuk gerak apa?",
          alias: ["non-lokomotor", "nonlokomotor", "di tempat"],
        },
        {
          pertanyaan: "2. Tangan merentang pada pose pesawat supaya tubuh tidak apa?",
          alias: ["oleng", "jatuh", "seimbang", "roboh"],
        },
      ],
      voice: [
        [
          "Pemanasan memutar lengan sambil berdiri adalah gerak non-lokomotor. Berlari atau melompat rintangan bukan. Tangan merentang pada pose pesawat supaya tubuh tidak oleng.",
        ],
      ],
    },
  ],
};
