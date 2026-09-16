import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_PAI2_BAB9 = "Bab 9: Ayo Zikir dan Doa Setelah Salat";

export const MODUL_PAI2_BAB9: ModulResmiPai = {
  id: "pai-2-bab9",
  judul: JUDUL_PAI2_BAB9,
  pola: /zikir dan doa|dzikir dan doa|doa setelah salat|ayo zikir|tangga bacaan dzikir/,
  motivasi:
    "Setelah salam, duduk tenang berzikir: istighfar, tasbih, tahmid, takbir. Lalu berdoa dengan adab: kiblat, tangan di dada, khusyuk, doa sapujagat dan doa orang tua.",
  kunciJawaban: "A,B,B,S,B,A,C,B,A,B",
  sketsaKartu: [
    "Anak duduk setelah salat menghitung tasbih, tahmid, dan takbir.",
    "Anak menadahkan tangan menghadap kiblat, mendoakan orang tua.",
    "Anak mengerjakan evaluasi arti dzikir dan potongan doa orang tua.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Arti dari bacaan dzikir kalimat tayyibah Istighfar (Astaghfirullahal Adzim) yang kita lafalkan setelah selesai salat fardhu adalah...
A) Aku memohon ampun kepada Allah Yang Maha Agung.
B) Segala puji bagi Allah Tuhan semesta alam.
C) Allah Maha Besar atas segala sesuatu.
D) Maha Suci Allah.`,
    `[Soal 2 - PG - Tipe: HOTS]
Perhatikan sikap berikut: (1) Menadahkan tangan di depan dada, (2) Berteriak sekencang mungkin, (3) Menghadap kiblat dengan tenang. Di antara sikap tersebut yang termasuk adab berdoa yang santun adalah nomor...
A) (1) dan (2)
B) (1) dan (3)
C) (2) dan (3)
D) Hanya (2)`,
    `[Soal 3 - PG - Tipe: HOTS]
Membaca doa kesembuhan dan keselamatan untuk orang tua merupakan wujud nyata laku anak yang berbakti (Birrul Walidain). Pernyataan ini...
A) Salah.
B) Benar; mendoakan orang tua adalah bakti yang menembus langit.
C) Benar hanya di Hari Ibu.
D) Doa orang tua tidak perlu.`,
    `[Soal 4 - PG - Tipe: HOTS]
Dzikir setelah salat fardhu hukumnya wajib, sehingga jika ditinggalkan salatnya tidak sah. Pernyataan ini...
A) Benar.
B) Salah; dzikir sangat dianjurkan, tetapi salat tetap sah jika rukunnya lengkap.
C) Benar hanya untuk salat Magrib.
D) Dzikir menggantikan salat.`,
    `[Soal 5 - PG - Tipe: Reguler]
Potongan doa orang tua dilengkapi dengan kata...
A) Rabbayani.
B) Subhanallah.
C) Sangkakala.
D) Malikinnas.`,
    `[Soal 6 - PG - Tipe: Reguler]
Subhanallah artinya...
A) Maha Suci Allah.
B) Segala puji bagi Allah.
C) Allah Maha Besar.
D) Aku mohon ampun.`,
    `[Soal 7 - PG - Tipe: Reguler]
Alhamdulillah disebut bacaan...
A) Tasbih.
B) Takbir.
C) Tahmid.
D) Istighfar.`,
    `[Soal 8 - PG - Tipe: Reguler]
Waramhamhuma kama rabbayani artinya sayangilah mereka sebagaimana mereka menyayangiku sejak...
A) Besar.
B) Kecil.
C) Sekolah.
D) Kiamat.`,
    `[Soal 9 - PG - Tipe: HOTS]
Kita tidak boleh berdoa sambil bermain, tertawa, atau menengok kanan-kiri karena...
A) Doa butuh khusyuk; Allah senang hamba yang tulus dan fokus.
B) Tangan harus di saku.
C) Kiblat boleh diabaikan.
D) Doa hanya untuk orang dewasa.`,
    `[Soal 10 - PG - Tipe: Reguler]
Tasbih, tahmid, dan takbir setelah salat masing-masing dibaca...
A) 3 kali.
B) 33 kali.
C) 1000 kali.
D) 1 kali.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Mengagungkan Allah melalui Bacaan Dzikir",
      pengantar:
        "Infografis tangga bacaan: istighfar, tasbih 33, tahmid 33, takbir 33. Dzikir artinya mengingat Allah. Setelah salat fardhu, hati menjadi tenang dan dijaga malaikat.",
      labelDaftar: "Istighfar, tasbih, tahmid, takbir",
      kolom: 1,
      item: [
        {
          nama: "Istighfar",
          singkat: "Mohon ampun",
          arab: "أَسْتَغْفِرُ اللّٰهَ الْعَظِيمَ",
          uraian:
            "Setelah imam salam, jangan langsung lari. Duduk tenang, baca istighfar: Astaghfirullahal Adzim, aku memohon ampun kepada Allah Yang Maha Agung.",
          contoh: "Istighfar = mohon ampun.",
        },
        {
          nama: "Tasbih dan tahmid",
          singkat: "33 kali masing-masing",
          arab: "سُبْحَانَ اللّٰهِ  ·  اَلْحَمْدُ لِلّٰهِ",
          uraian:
            "Tasbih: Subhanallah, Maha Suci Allah. Tahmid: Alhamdulillah, segala puji bagi Allah. Ucapkan masing-masing 33 kali dengan lembut dan penuh penghayatan.",
          contoh: "Subhanallah suci. Alhamdulillah syukur.",
        },
        {
          nama: "Takbir dan makna",
          singkat: "Allahu Akbar 33 kali",
          arab: "اَللّٰهُ أَكْبَرُ",
          uraian:
            "Takbir: Allahu Akbar, Allah Maha Besar. Dzikir artinya mengingat Allah dengan lisan dan hati. Hati menjadi damai dan dijaga malaikat.",
          contoh: "Dzikir = mengingat Allah.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Apa arti dari kalimat tayyibah Subhanallah yang kita ucapkan saat berdzikir setelah salat?",
          alias: ["suci", "maha suci", "subhanallah", "suci allah"],
        },
      ],
      kuisTulis: {
        pertanyaan: "Kalimat Alhamdulillah disebut juga sebagai bacaan kalimat ........................ (Tasbih / Tahmid).",
        alias: ["tahmid", "tahmid", "kalimat tahmid"],
      },
      voice: [
        [
          "Anak-anak soleh, apa yang biasanya kalian lakukan segera setelah imam mengucapkan salam dalam salat berjamaah? Apakah langsung berdiri dan berlari keluar masjid? Oh, jangan ya. Rasulullah mengajarkan kita untuk duduk tenang sejenak untuk berdzikir.",
          "Dzikir artinya mengingat Allah SWT dengan lisan dan hati kita. Kita mulai dengan membaca Istighfar untuk memohon ampun atas kesalahan kita.",
          "Kemudian kita ucapkan Kalimat Tayyibah: Tasbih Subhanallah untuk memuji kesucian Allah, Tahmid Alhamdulillah sebagai rasa syukur, dan Takbir Allahu Akbar untuk mengagungkan kebesaran Allah. Ucapkanlah masing-masing sebanyak 33 kali dengan suara yang lembut dan penuh penghayatan.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Tata Krama Doa Keselamatan dan Orang Tua",
      pengantar:
        "Infografis adab berdoa: kiblat, tangan di dada, khusyuk. Doa sapujagat untuk dunia-akhirat, plus doa orang tua Rabbighfirli. Allah berjanji: berdoalah, Aku kabulkan.",
      labelDaftar: "Adab, doa sapujagat, doa orang tua",
      kolom: 1,
      item: [
        {
          nama: "Adab utama",
          singkat: "Kiblat, tangan, khusyuk",
          uraian:
            "Hadapkan tubuh ke kiblat, tadahkan kedua telapak tangan di depan dada, rendahkan suara, fokus hanya kepada Allah. Jangan bermain, tertawa, atau menengok kanan-kiri.",
          contoh: "Kiblat. Tangan. Khusyuk.",
        },
        {
          nama: "Doa inti",
          singkat: "Sapujagat dan orang tua",
          arab: "رَبِّ اغْفِرْ لِيْ وَلِوَالِدَيَّ",
          uraian:
            "Minta keselamatan dunia dan akhirat. Jangan lupa doa orang tua: Ya Allah, ampunilah dosaku dan dosa kedua orang tuaku, sayangilah mereka sebagaimana mereka menyayangiku sejak kecil.",
          contoh: "Dunia-akhirat. Doa ayah-ibu.",
        },
        {
          nama: "Cakrawala ilmu",
          singkat: "Doa senjata umat",
          uraian:
            "Allah berjanji: Berdoalah kepada-Ku, niscaya akan Aku kabulkan. Jangan malas berdoa. Doa anak yang salih menembus langit.",
          contoh: "Berdoa, Allah kabulkan.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Mengapa kita tidak diperbolehkan berdoa sambil bermain-main, tertawa, atau menengok ke kanan dan kiri?",
          alias: ["khusyuk", "fokus", "sopan", "adab", "tulus", "hormat", "allah"],
        },
      ],
      kuisTulis: {
        pertanyaan:
          "Arti potongan doa orang tua Waramhamhuma kama rabbayani adalah sayangilah mereka sebagaimana mereka menyayangiku sejak ........................",
        alias: ["kecil", "kecil-kecil", "aku kecil", "shaghiran", "shaghiiraa"],
      },
      voice: [
        [
          "Anak-anak yang berbakti, setelah selesai berdzikir, tibalah waktunya kita memohon dan meminta kepada Allah melalui doa. Allah sangat senang mendengarkan suara hamba-Nya yang berdoa dengan penuh ketulusan.",
          "Ingat adab berdoa yang baik ya: hadapkan tubuhmu ke arah kiblat, tadahkan kedua telapak tanganmu di depan dada dengan sopan, rendahkan suaramu, dan fokuskan pikiranmu hanya kepada Allah.",
          "Mintalah keselamatan di dunia dan akhirat melalui doa sapujagat. Dan yang paling penting, jangan pernah lupa mendoakan kedua orang tuamu: Ya Allah, ampunilah dosaku dan dosa kedua orang tuaku, sayangilah mereka sebagaimana mereka menyayangiku sejak kecil. Doa anak yang salih akan langsung menembus langit!",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih arti istighfar dan adab doa, tentukan benar-salah bakti serta hukum dzikir, lalu lengkapi potongan doa orang tua dengan kata Rabbayani.",
      labelDaftar: "Pilihan, benar-salah, dan isian doa",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A dan B",
          singkat: "Arti dan adab",
          uraian:
            "Istighfar: aku memohon ampun kepada Allah Yang Maha Agung. Adab doa: menadah tangan dan menghadap kiblat, bukan berteriak. Mendoakan orang tua adalah birrul walidain, benar. Dzikir dianjurkan, bukan syarat sah salat.",
          contoh: "Mohon ampun. (1) dan (3). Bakti. Sunah.",
        },
        {
          nama: "Kelompok C",
          singkat: "Lengkapi doa",
          uraian:
            "Rabbighfir lii wa liwaalidayya warhamhumaa kamaa Rabbayani shaghiiraa. Kunci: Rabbayani, sebagaimana mereka merawatku sejak kecil.",
          contoh: "Rabbayani.",
        },
      ],
      kuis: [
        { pertanyaan: "Arti istighfar?", alias: ["ampun", "mohon"] },
        { pertanyaan: "Adab doa nomor?", alias: ["1", "3", "kiblat", "tangan"] },
        { pertanyaan: "Doa orang tua termasuk bakti?", alias: ["benar"] },
        { pertanyaan: "Dzikir wajib agar salat sah?", alias: ["salah", "tidak"] },
        { pertanyaan: "Kata pelengkap doa?", alias: ["rabbayani"] },
        { pertanyaan: "Alhamdulillah termasuk?", alias: ["tahmid"] },
      ],
      voice: [
        [
          "Istighfar artinya mohon ampun. Adab doa: tangan di dada dan menghadap kiblat, bukan berteriak.",
        ],
        [
          "Mendoakan orang tua adalah bakti. Dzikir sangat dianjurkan, tetapi salat tetap sah jika rukunnya lengkap. Lengkapi doa dengan Rabbayani.",
        ],
      ],
    },
  ],
};
