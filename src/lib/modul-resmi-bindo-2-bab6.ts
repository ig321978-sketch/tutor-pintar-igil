import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_BINDO2_BAB6 = "Bab 6: Bijak Lingkungan";

export const MODUL_BINDO2_BAB6: ModulResmiPai = {
  id: "bindo-2-bab6",
  judul: JUDUL_BINDO2_BAB6,
  pola: /bijak (lingkungan|memakai uang)|puisi alam|bait dan baris|deklamasi/,
  motivasi:
    "Puisi ditulis berbaris dalam bait. Deklamasi memakai intonasi dan ekspresi. Lestari artinya terjaga, gersang artinya kering. Kata ganti menggantikan nama.",
  kunciJawaban: "B,A,S,B,B,A,C,B,A,B",
  sketsaKartu: [
    "Anak mendeklamasikan puisi alam dengan wajah prihatin.",
    "Anak mengganti nama Nia menjadi ia pada bait puisi.",
    "Anak mengerjakan evaluasi bait, lestari, dan deklamasi.",
    "Anak menarik garis gersang-lestari, menggeser asri-gundul, mengurutkan bait pohon, dan menulis bait di kanvas.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Kosakata yang artinya tetap terjaga dan tidak rusak adalah...
A) Gersang
B) Lestari
C) Gundul
D) Tercemar`,
    `[Soal 2 - PG - Tipe: HOTS]
Membaca puisi wajib cepat dan datar seperti daftar belanja. Pernyataan ini...
A) Salah; puisi butuh jeda, intonasi, dan penjiwaan.
B) Benar.
C) Benar hanya di kelas.
D) Puisi tidak boleh diekspresikan.`,
    `[Soal 3 - PG - Tipe: HOTS]
Puisi hutan gundul biasanya mengajak berhenti menebang sembarangan. Pernyataan ini...
A) Salah.
B) Benar; amanatnya pelestarian lingkungan.
C) Benar hanya jika lucu.
D) Puisi tidak punya amanat.`,
    `[Soal 4 - PG - Tipe: HOTS]
Kumpulan beberapa baris pendek dalam puisi disebut...
A) Fakta
B) Bait
C) Subjek
D) Hoaks`,
    `[Soal 5 - PG - Tipe: Reguler]
Gersang artinya...
A) Tanah kering, gundul, tidak subur.
B) Tetap terjaga.
C) Membaca dengan ekspresi.
D) Nama orang.`,
    `[Soal 6 - PG - Tipe: Reguler]
Deklamasi artinya...
A) Cara membaca puisi dengan gerak dan ekspresi.
B) Tanah kering.
C) Tanda titik.
D) Kalimat opini.`,
    `[Soal 7 - PG - Tipe: Reguler]
Kata ganti untuk Nia adalah...
A) Kamu wajib
B) Kami saja
C) Ia atau dia
D) Titik`,
    `[Soal 8 - PG - Tipe: Reguler]
Saat membaca bait bumi menangis karena sampah, ekspresi yang tepat...
A) Tertawa nyaring.
B) Wajah prihatin, nada sedih.
C) Berteriak marah memukul.
D) Membaca sangat cepat datar.`,
    `[Soal 9 - PG - Tipe: HOTS]
Mengapa deklamasi penting saat membaca puisi alam?
A) Supaya perasaan dan amanat penyair sampai ke pendengar.
B) Supaya kita menang lomba saja.
C) Supaya bait hilang.
D) Supaya tidak perlu pohon.`,
    `[Soal 10 - PG - Tipe: Reguler]
Asri, jernih, dan rindang termasuk suasana alam...
A) Rusak
B) Indah
C) Gersang
D) Hoaks`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Merasakan Keindahan Puisi Alam",
      pengantar:
        "Infografis anatomi puisi: bait dan baris, deklamasi, amanat cinta lingkungan. Lestari = terjaga. Gersang = kering tidak subur.",
      labelDaftar: "Bait, deklamasi, amanat, kamus indah",
      kolom: 1,
      item: [
        {
          nama: "Bait dan baris",
          singkat: "Kalimat pendek berbaris",
          uraian:
            "Puisi berbeda dari cerita biasa. Ditulis baris-baris pendek, lalu dikumpulkan menjadi bait. Satu bait biasanya 2 sampai 4 baris.",
          contoh: "Ku tanam bibit pohon ini...",
        },
        {
          nama: "Deklamasi",
          singkat: "Intonasi, jeda, ekspresi",
          uraian:
            "Membaca puisi seperti bernyanyi tanpa musik: nada naik-turun, ada jeda, wajah ikut merasakan. Alam rusak: wajah prihatin. Alam lestari: wajah senang.",
          contoh: "Bumi menangis: nada sedih.",
        },
        {
          nama: "Amanat dan kamus",
          singkat: "Lestari lawan gersang",
          uraian:
            "Amanat puisi alam: cintai bumi. Lestari = tetap seperti semula, tidak rusak. Gersang = kering, gundul, tidak subur.",
          contoh: "Hutan lestari, bukan gersang.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Jika kamu membaca bait Bumi yang menangis karena tumpukan sampah, bagaimana ekspresi wajah dan nada suaramu saat berdeklamasi?",
          alias: ["sedih", "prihatin", "pelan", "jeda", "tidak tertawa"],
        },
      ],
      kuisTulis: {
        pertanyaan:
          "Kosakata yang artinya tetap terjaga dan tidak rusak atau punah adalah... (Lestari / Gersang)",
        alias: ["lestari"],
      },
      voice: [
        [
          "Sahabat literasi yang mencintai bumi, pernahkah kalian mendengar seseorang membaca dengan nada bergelombang penuh perasaan, seperti bernyanyi tanpa musik? Itu membaca puisi.",
          "Puisi ditulis baris-baris pendek dalam bait. Saat membaca puisi tentang lebah atau sungai jernih, pakai ekspresi dan intonasi yang pas. Jika alam rusak, wajah kita ikut prihatin.",
          "Membaca puisi melatih kita merasakan keindahan bahasa Indonesia sekaligus mencintai lingkungan!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Kata Ganti di Baris Puisi",
      pengantar:
        "Infografis kata ganti: aku, kamu, ia, kami, kita menggantikan nama agar bait tidak mengulang-ulang. Pakai huruf kecil kecuali awal baris.",
      labelDaftar: "Aku, kamu, ia, kami, kita",
      kolom: 1,
      item: [
        {
          nama: "Mengganti nama",
          singkat: "Supaya tidak mengulang",
          uraian:
            "Jika Nia sudah disebut, baris berikutnya boleh memakai ia. Jika kita berbicara tentang diri sendiri: aku. Jika mengajak teman: kita.",
          contoh: "Nia menanam. Ia menyiram.",
        },
        {
          nama: "Kami dan kita",
          singkat: "Beda sedikit",
          uraian:
            "Kami = pembicara dan temannya, pendengar tidak ikut. Kita = pembicara, teman, dan pendengar ikut bersama. Puisi lingkungan sering memakai kita agar semua menjaga bumi.",
          contoh: "Kita jaga hutan lestari.",
        },
        {
          nama: "Awal baris",
          singkat: "Huruf kapital",
          uraian:
            "Awal baris puisi memakai huruf kapital, meskipun kata ganti. Contoh: Aku tanam bibit. Ia tumbuh hijau.",
          contoh: "Aku. Ia. Kita.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Nia sudah disebut di baris pertama. Kata ganti apa yang tepat di baris kedua untuk Nia?",
          alias: ["ia", "dia"],
        },
      ],
      kuisTulis: {
        pertanyaan: "Kata ganti yang mengajak semua orang termasuk pendengar adalah...",
        alias: ["kita"],
      },
      voice: [
        [
          "Di puisi, kita tidak perlu mengulang nama terus-menerus. Pakai kata ganti. Nia menjadi ia. Diri sendiri menjadi aku.",
          "Kami dan kita berbeda. Kita mengajak semua, termasuk yang mendengar, menjaga bumi bersama.",
          "Awal baris tetap huruf kapital: Aku tanam. Ia tumbuh. Kita jaga hutan.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih arti lestari dan cara deklamasi, tentukan benar-salah suara datar serta amanat hutan gundul, jodohkan gersang-lestari-deklamasi, lalu jelaskan mengapa deklamasi menyampaikan amanat.",
      labelDaftar: "Pilihan, benar-salah, mencocokkan, dan esai",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A dan B",
          singkat: "Lestari dan deklamasi",
          uraian:
            "Lestari = terjaga. Membaca puisi tidak boleh datar seperti daftar belanja. Hutan gundul mengajak berhenti menebang sembarangan.",
          contoh: "Lestari. Jeda. Jaga pohon.",
        },
        {
          nama: "Kelompok C dan D",
          singkat: "Bait dan kata ganti",
          uraian:
            "Gersang = kering. Deklamasi = ekspresi. Bait = kumpulan baris. Nia = ia. Kita = semua ikut menjaga.",
          contoh: "Bait. Ia. Kita.",
        },
      ],
      kuis: [
        { pertanyaan: "Lestari artinya?", alias: ["jaga", "tidak rusak"] },
        { pertanyaan: "Puisi dibaca datar?", alias: ["salah"] },
        { pertanyaan: "Amanat hutan gundul?", alias: ["benar", "tebang"] },
        { pertanyaan: "Kumpulan baris?", alias: ["bait"] },
        { pertanyaan: "Gersang artinya?", alias: ["kering"] },
        { pertanyaan: "Mengapa deklamasi?", alias: ["amanat", "perasaan", "jeda"] },
      ],
      voice: [
        ["Lestari artinya terjaga. Puisi tidak dibaca datar."],
        ["Bait kumpulan baris. Kita menjaga bumi bersama."],
      ],
    },
    {
      kode: "D",
      judul: "D. Kartu Evaluasi Ekstra",
      pengantar:
        "Tanpa keyboard. Tarik garis gersang-lestari-deklamasi, geser asri atau gundul, urutkan bait menanam, coretkan huruf bait, lalu tekan BENAR atau SALAH.",
      labelDaftar: "Tarik garis, keranjang, urutan, kanvas, detektif",
      kolom: 1,
      item: [
        {
          nama: "Permainan A sampai C",
          singkat: "Garis, keranjang, urutan",
          uraian:
            "Gersang: kering. Lestari: terjaga. Deklamasi: ekspresi. Indah: asri, jernih, rindang. Rusak: gundul, tercemar. Urutan: tanam, siram, teduh.",
          contoh: "Lestari. Asri. Tanam dulu.",
        },
        {
          nama: "Permainan D dan E",
          singkat: "Kanvas dan detektif",
          uraian:
            "B-A-I-T. Puisi tidak dibaca cepat datar. Puisi hutan gundul mengajak jaga lingkungan.",
          contoh: "Coretkan T. SALAH lalu BENAR.",
        },
      ],
      kuis: [
        { pertanyaan: "Tarik garis kamus puisi?", alias: ["gersang", "lestari", "deklamasi"] },
        { pertanyaan: "Keranjang suasana alam?", alias: ["asri", "gundul"] },
        { pertanyaan: "Urutan bait pohon?", alias: ["tanam", "siram", "hijau"] },
        { pertanyaan: "Puisi dibaca datar?", alias: ["salah"] },
        { pertanyaan: "Amanat hutan gundul jaga pohon?", alias: ["benar"] },
      ],
      kuisTulis: {
        pertanyaan: "Coretkan huruf terakhir B-A-I-__.",
        alias: ["bait", "t"],
      },
      voice: [
        [
          "Tanpa keyboard. Tarik garis gersang, lestari, dan deklamasi. Geser asri ke alam indah, gundul ke alam rusak.",
          "Urutkan: tanam bibit, siram pagi, lalu daun meneduhkan bumi. Coretkan T untuk kata bait.",
          "Detektif: puisi tidak dibaca seperti daftar belanja. Puisi hutan gundul mengajak kita menjaga pohon.",
        ],
      ],
    },
  ],
};
