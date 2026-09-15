import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_KRISTEN1_BAB4 = "Bab 4: Aku Mau Berbagi";

export const MODUL_KRISTEN1_BAB4: ModulResmiPai = {
  id: "kristen-1-bab4",
  judul: JUDUL_KRISTEN1_BAB4,
  pola:
    /aku mau berbagi|mengasihi sesama|tindakan nyata|kasih kristus|hidup bersyukur/,
  motivasi:
    "Kasih tidak hanya di bibir. Berbagi bekal, payung, dan mainan memancarkan kasih Tuhan. Kita mengasihi karena Allah lebih dahulu mengasihi kita.",
  kunciJawaban: "B,A,C,B,A,B,C,A,B,B",
  sketsaKartu: [
    "Made dan Nia di kantin membagi donat kepada Tono yang bekalnya tertinggal.",
    "Lima roti dan dua ikan sederhana, anak-anak berbagi bekal.",
    "Dua anak berlindung bersama di bawah satu payung lebar saat hujan.",
    "Anak memberikan mainan atau makanan kepada teman yang membutuhkan.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Saat jam pulang sekolah hujan turun sangat deras. Kamu membawa payung yang lebar. Kamu melihat teman sekelasmu berdiri kebingungan di depan kelas karena tidak membawa payung dan tidak ada yang menjemput. Tindakan yang mencerminkan Hukum Kasih Allah adalah...
A) Berlari pulang dengan cepat agar tidak kehujanan sendirian.
B) Mengajak teman tersebut untuk bernaung di bawah payungmu bersama-sama sambil berjalan pulang dengan aman.
C) Mengejeknya karena dia lupa membawa payung dari rumah.
D) Menyembunyikan payung supaya tidak diminta.`,
    `[Soal 2 - PG - Tipe: HOTS]
Tono bekalnya tertinggal dan tampak lapar. Nia hanya punya dua donat. Sikap yang meneladan Tuhan Yesus memberi makan lima ribu orang adalah...
A) Membagi apa yang ada, meski tinggal sedikit, supaya Tono juga makan.
B) Menyembunyikan donat dan pura-pura tidak melihat Tono.
C) Menyuruh Tono pulang lapar.
D) Menertawakan Tono karena lupa bekal.`,
    `[Soal 3 - PG - Tipe: Reguler]
Hukum Kasih dalam Matius 22:39 mengajarkan...
A) Mengasihi hanya orang yang memberi kita hadiah.
B) Mengasihi hanya keluarga sendiri.
C) Mengasihi sesama manusia seperti diri sendiri.
D) Mengasihi hanya saat kita kenyang.`,
    `[Soal 4 - PG - Tipe: Reguler]
1 Yohanes 3:18 mengingatkan kasih jangan hanya...
A) Diucapkan di bibir, melainkan dibuktikan dengan tindakan nyata.
B) Diberikan kepada yang lapar.
C) Dilakukan saat hujan.
D) Diajarkan di gereja.`,
    `[Soal 5 - PG - Tipe: Reguler]
Ketika kita rela berbagi mainan atau makanan, kita memancarkan sinar kasih...
A) Tuhan / Yesus di dalam dunia ini.
B) Mainan di toko.
C) Televisi di rumah.
D) Uang jajan saja.`,
    `[Soal 6 - PG - Tipe: HOTS]
Alasan utama kita harus mengasihi semua orang, bahkan yang menjengkelkan, adalah karena...
A) Mereka lebih kaya.
B) Allah telah lebih dahulu mengasihi kita.
C) Guru memberi nilai tambahan.
D) Kita takut dihukum teman.`,
    `[Soal 7 - PG - Tipe: Reguler]
Berbagi tidak membuat kita kekurangan, melainkan...
A) Membuat kita lapar selamanya.
B) Membuat kita kehilangan semua mainan.
C) Membuat hati orang lain bersukacita.
D) Membuat kita dimarahi tanpa alasan.`,
    `[Soal 8 - PG - Tipe: Reguler]
Karakter rela berbagi sejak kecil membantu memotong...
A) Akar sifat egois.
B) Akar pohon di kebun.
C) Antrian kantin.
D) Kabel lampu kelas.`,
    `[Soal 9 - PG - Tipe: HOTS]
Nia khawatir kurang kenyang jika memberi satu donat. Made mengingat lima roti dan dua ikan. Pelajaran utamanya adalah...
A) Kita harus membawa banyak roti setiap hari.
B) Tuhan mengajar kita rela berbagi dengan apa yang ada pada kita.
C) Hanya mukjizat besar yang boleh dibagi.
D) Donat tidak boleh dibagi dua.`,
    `[Soal 10 - PG - Tipe: Reguler]
Faith in action artinya...
A) Iman hanya diucapkan saat berdoa.
B) Iman dibuktikan lewat tindakan kasih yang kelihatan.
C) Iman tidak perlu berbagi.
D) Iman hanya untuk orang dewasa.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Bekal yang Terbagi di Kantin",
      pengantar:
        "Di area kantin sekolah saat jam istirahat. Made melihat teman yang bekalnya tertinggal dan tampak lapar.",
      labelDaftar: "Percakapan Made dan Nia tentang berbagi donat",
      kolom: 1,
      item: [
        {
          nama: "Tono duduk sendiri",
          singkat: "Bekal tertinggal",
          uraian:
            "Made melihat Tono memandangi teman-teman makan. Bekalnya tertinggal. Kepekaan dimulai dari mata yang melihat kekurangan orang lain.",
          contoh: "Lihat dulu. Jangan pura-pura tidak tahu.",
        },
        {
          nama: "Dua donat",
          singkat: "Takut kurang kenyang",
          uraian:
            "Nia kasihan, tetapi donatnya hanya dua. Ia takut kurang kenyang jika memberi satu. Egois sering menyamar sebagai khawatir pada diri sendiri.",
          contoh: "Kasihan saja belum cukup.",
        },
        {
          nama: "Lima roti dua ikan",
          singkat: "Berbagi apa yang ada",
          uraian:
            "Made mengingat Tuhan Yesus memberi makan lima ribu orang dengan lima roti dan dua ikan. Mereka membagi setengah milik Made dan setengah milik Nia untuk Tono. Berbagi tidak membuat kekurangan, melainkan sukacita.",
          contoh: "Bagi apa yang ada. Hati jadi senang.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Bekal Tono tertinggal. Ia tampak...?",
          alias: ["lapar", "kelaparan"],
        },
        {
          pertanyaan: "2. Tuhan Yesus memberi makan banyak orang dengan lima roti dan...?",
          alias: ["dua ikan", "ikan"],
        },
        {
          pertanyaan: "3. Berbagi membuat hati orang lain...?",
          alias: ["sukacita", "senang", "bahagia"],
        },
      ],
      voice: [
        [
          "Tono duduk sendiri. Bekalnya tertinggal. Nia hanya punya dua donat dan takut kurang kenyang.",
        ],
        [
          "Made ingat lima roti dan dua ikan. Mereka berbagi. Berbagi tidak membuat kekurangan, melainkan sukacita.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Hukum Kasih yang Berbuat",
      pengantar:
        "Mengasihi sesama seperti diri sendiri. Kasih dibuktikan, bukan hanya diucapkan. Berbagi memotong akar egois sejak dini.",
      labelDaftar: "Matius 22:39; 1 Yohanes 3:18",
      kolom: 1,
      item: [
        {
          nama: "Seperti diri sendiri",
          singkat: "Matius 22:39",
          uraian:
            "Hukum Kasih: kasihilah sesamamu manusia seperti dirimu sendiri. Jika kita tidak mau kehujanan sendirian, kita tidak membiarkan teman kehujanan di depan kelas.",
          contoh: "Apa yang kita mau, itu yang kita berikan.",
        },
        {
          nama: "Bukan hanya bibir",
          singkat: "1 Yohanes 3:18",
          uraian:
            "Kasih jangan hanya kata-kata. Harus tindakan nyata dan kebenaran, faith in action. Membagi bekal, menolong di bawah payung, memberi mainan: itulah kasih yang kelihatan.",
          contoh: "Ucap lalu berbuat.",
        },
        {
          nama: "Allah lebih dahulu",
          singkat: "Akar kasih",
          uraian:
            "Alasan utama mengasihi semua orang, bahkan yang menjengkelkan, adalah karena Allah telah lebih dahulu mengasihi kita. Berbagi memancarkan sinar kasih Tuhan di dunia.",
          contoh: "Kita mengasihi karena sudah dikasihi.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Kasihilah sesama seperti...?",
          alias: ["diri sendiri", "dirimu"],
        },
        {
          pertanyaan: "2. Kasih harus dibuktikan dengan...?",
          alias: ["tindakan", "perbuatan", "nyata"],
        },
        {
          pertanyaan: "3. Allah telah lebih dahulu... kita?",
          alias: ["mengasihi", "kasih", "mengasihi"],
        },
      ],
      voice: [
        [
          "Matius dua puluh dua: kasihilah sesamamu seperti dirimu sendiri. Satu Yohanes: kasih jangan hanya di bibir.",
        ],
        [
          "Kita mengasihi karena Allah lebih dahulu mengasihi kita. Berbagi bekal dan payung memancarkan kasih Tuhan.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Mata yang Peka di Sekolah dan di Rumah",
      pengantar:
        "Kecerdasan interpersonal dilatih: siapa yang ketinggalan bekal, siapa yang kehujanan, siapa yang belum punya giliran mainan. Guru dan orang tua menuntun tangan yang rela.",
      labelDaftar: "Latihan berbagi yang sukacita",
      kolom: 2,
      item: [
        {
          nama: "Satu payung dua sahabat",
          singkat: "Untuk guru",
          uraian:
            "Ceritakan hujan deras dan payung lebar. Perankan tiga sikap: lari sendiri, ejek, atau ajak bernaung bersama. Mana yang memancarkan Hukum Kasih? Latihan membagi bekal di kelas dengan izin orang tua.",
          contoh: "Lihat teman. Ajak bersama. Jangan lari sendiri.",
        },
        {
          nama: "Giliran mainan",
          singkat: "Untuk orang tua",
          uraian:
            "Latih anak membagi camilan atau giliran mainan kepada saudara atau teman. Ucapkan: kita berbagi karena Tuhan sudah mengasihi kita. Jangan memaksa berbagi barang yang tidak aman.",
          contoh: "Bagi camilan. Giliran main. Ucap kasih Tuhan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Hujan deras, kita punya payung lebar: ajak teman atau lari sendiri?",
          alias: ["ajak", "bersama", "payung"],
        },
        {
          pertanyaan: "2. Berbagi memancarkan kasih...?",
          alias: ["tuhan", "yesus", "allah"],
        },
        {
          pertanyaan: "3. Allah lebih dahulu... kita?",
          alias: ["mengasihi", "kasih"],
        },
      ],
      voice: [
        [
          "Hujan deras. Ada payung lebar. Ajak teman bernaung bersama. Jangan lari sendiri, jangan ejek.",
        ],
        [
          "Di rumah, bagi camilan atau giliran mainan. Kita mengasihi karena Allah lebih dahulu mengasihi kita.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih sikap payung saat hujan, lalu lengkapi: kasih siapa yang dipancarkan, dan Allah telah lebih dahulu melakukan apa.",
      labelDaftar: "Studi kasus dan isian kausalitas iman",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Payung lebar",
          uraian:
            "Hukum Kasih: ajak teman bernaung di bawah payung bersama lalu pulang aman. Bukan lari sendiri, bukan mengejek karena lupa payung.",
          contoh: "Ajak bersama. Jangan ejek.",
        },
        {
          nama: "Kelompok B",
          singkat: "Sinar kasih dan alasan",
          uraian:
            "Berbagi mainan atau makanan memancarkan sinar kasih Tuhan/Yesus. Alasan mengasihi semua orang, bahkan yang menjengkelkan: Allah telah lebih dahulu mengasihi kita.",
          contoh: "Kasih Tuhan. Allah mengasihi lebih dulu.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Hujan deras, teman tanpa payung: kita ajak atau lari sendiri?",
          alias: ["ajak", "bersama", "payung", "bernaung"],
        },
        {
          pertanyaan: "2. Berbagi memancarkan sinar kasih...?",
          alias: ["tuhan", "yesus", "allah"],
        },
        {
          pertanyaan: "3. Allah telah lebih dahulu... kita?",
          alias: ["mengasihi", "kasih", "mengasihi kita"],
        },
      ],
      voice: [
        [
          "Hujan deras. Teman tidak punya payung. Ajak ia bernaung di payungmu. Jangan lari sendiri, jangan ejek.",
        ],
        [
          "Berbagi memancarkan kasih Tuhan. Kita mengasihi semua orang karena Allah lebih dahulu mengasihi kita.",
        ],
      ],
    },
  ],
};
