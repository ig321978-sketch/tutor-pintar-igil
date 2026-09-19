import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK2_BAB7 = "Bab 7: Pengukuran Berat Standar";

export const MODUL_MTK2_BAB7: ModulResmiPai = {
  id: "mtk-2-bab7",
  judul: JUDUL_MTK2_BAB7,
  pola:
    /pengukuran berat standar|dunia timbangan|satuan g dan kg|tabel dan grafik|mengenal satuan g/,
  motivasi:
    "Gram untuk benda ringan, kilogram untuk benda berat. 1 kg = 1.000 g. Jarum timbangan menunjuk angka. Besar belum tentu berat.",
  kunciJawaban: "B,B,S,B,B,A,C,B,A,B",
  sketsaKartu: [
    "Anak melihat jarum timbangan menunjuk 3 kg.",
    "Anak menimbang garam dalam gram dan beras dalam kilogram.",
    "Anak mengerjakan evaluasi satuan berat.",
    "Anak menarik garis biskuit-badan-pupuk, menggeser semangka atau permen, mengurutkan 5 g-200 g-2 kg, dan menulis 5.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Yang lebih butuh satuan kilogram saat ditimbang adalah...
A) Sebutir telur ayam
B) Sekarung beras yang besar
C) Sebutir permen
D) Selembar roti`,
    `[Soal 2 - PG - Tipe: HOTS]
2 kilogram sama dengan ... gram.
A) 2
B) 2.000
C) 200
D) 20`,
    `[Soal 3 - PG - Tipe: HOTS]
Benda yang ukurannya besar sudah pasti lebih berat daripada benda kecil. Pernyataan ini...
A) Benar.
B) Salah; balon besar bisa lebih ringan daripada batu kecil.
C) Benar jika keduanya buah.
D) Harus memakai cm.`,
    `[Soal 4 - PG - Tipe: HOTS]
Timbangan digital menampilkan angka berat di layar secara otomatis. Pernyataan ini...
A) Salah.
B) Benar; sensor elektronik memunculkan angka akurat.
C) Benar hanya jarum.
D) Hasilnya selalu 0.`,
    `[Soal 5 - PG - Tipe: Reguler]
Sebungkus biskuit kecil paling cocok dengan satuan...
A) Kilogram
B) Gram
C) Meter
D) Sentimeter`,
    `[Soal 6 - PG - Tipe: Reguler]
Berat badan anak kelas 2 dan sekantung pupuk paling cocok dengan...
A) Kilogram
B) Gram saja
C) cm
D) Piktogram`,
    `[Soal 7 - PG - Tipe: Reguler]
3 kg tepung + 2 kg gula = ... kg.
A) 1
B) 6
C) 5
D) 32`,
    `[Soal 8 - PG - Tipe: Reguler]
Urutan dari ringan: kapas 5 g, pisang 200 g, pepaya 2 kg adalah...
A) 2 kg, 200 g, 5 g
B) 5 g, 200 g, 2 kg
C) 200 g, 5 g, 2 kg
D) 5 g, 2 kg, 200 g`,
    `[Soal 9 - PG - Tipe: HOTS]
Mengapa 1 kilogram sama dengan 1.000 gram?
A) Karena kilogram adalah satuan berat yang lebih besar, isinya seribu gram.
B) Supaya sama dengan 100 cm.
C) Karena jarum selalu 3.
D) Karena telur lebih berat dari beras.`,
    `[Soal 10 - PG - Tipe: Reguler]
Jika jarum timbangan menunjuk 3 saat semangka ditaruh, beratnya...
A) 3 gram
B) 3 kilogram
C) 3 cm
D) 300`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Membaca Timbangan",
      pengantar:
        "Infografis dunia timbangan: gram untuk benda ringan, kilogram untuk benda berat. 1 kg = 1.000 g. Jarum menunjuk angka berat.",
      labelDaftar: "Gram, kilogram, jarum timbangan",
      kolom: 1,
      item: [
        {
          nama: "Satuan gram",
          singkat: "Untuk benda ringan",
          uraian:
            "Gram ditulis g. Cocok untuk garam, permen, selembar roti, telur, biskuit kecil, penghapus.",
          contoh: "Permen diukur dengan g.",
        },
        {
          nama: "Satuan kilogram",
          singkat: "Untuk benda berat",
          uraian:
            "Kilogram ditulis kg. Cocok untuk karung beras, semangka, berat badan, pupuk, sepeda. Sekarung beras butuh kg, telur cukup g.",
          contoh: "Beras dan semangka: kg.",
        },
        {
          nama: "Hubungan 1.000",
          singkat: "1 kg = 1.000 g",
          uraian:
            "2 kg = 2.000 g. Jarum timbangan berputar menunjuk angka. Semangka di angka 3 berarti 3 kilogram.",
          contoh: "2 kg = 2.000 g.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Benda mana yang lebih membutuhkan satuan kilogram saat ditimbang, sebutir telur ayam atau sekarung beras yang besar?",
          alias: ["beras", "karung", "kilogram"],
        },
      ],
      kuisTulis: {
        pertanyaan: "2 kilogram jika diubah ke gram sama dengan ... gram.",
        alias: ["2000", "2.000", "2 000"],
      },
      voice: [
        [
          "Sahabat kecil kelas 2, di pasar jeruk ditumpuk di wadah besi lalu jarum berputar menunjuk angka. Itu namanya timbangan.",
          "Benda ringan diukur dengan gram, ditulis g. Benda berat diukur dengan kilogram, ditulis kg.",
          "Satu kilogram sama dengan seribu gram. Jika jarum menunjuk 3, semangka itu 3 kilogram.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Ringan, Berat, dan Timbangan Digital",
      pengantar:
        "Infografis keranjang gram vs kilogram. Besar belum tentu berat. Timbangan digital menampilkan angka di layar.",
      labelDaftar: "Ringan, berat, digital, jumlah belanja",
      kolom: 1,
      item: [
        {
          nama: "Lebih cocok gram",
          singkat: "Penghapus dan permen",
          uraian:
            "Penghapus dan sebutir permen ringan. Semangka dan sepeda berat, lebih cocok kilogram.",
          contoh: "Permen: g. Sepeda: kg.",
        },
        {
          nama: "Besar belum berat",
          singkat: "Balon vs batu",
          uraian:
            "Balon gas besar bisa lebih ringan daripada batu kerikil kecil yang padat. Jangan tebak dari ukuran saja.",
          contoh: "Besar ≠ berat.",
        },
        {
          nama: "Digital dan jumlah",
          singkat: "Layar angka, 3+2=5",
          uraian:
            "Timbangan digital memakai sensor elektronik. Ibu beli 3 kg tepung dan 2 kg gula: total 5 kg. Urutan ringan: kapas 5 g, pisang 200 g, pepaya 2 kg.",
          contoh: "3 + 2 = 5 kg.",
        },
      ],
      kuis: [
        {
          pertanyaan: "Mengapa balon besar bisa lebih ringan daripada batu kecil?",
          alias: ["padat", "gas", "ringan", "berat"],
        },
      ],
      kuisTulis: {
        pertanyaan: "3 kg tepung + 2 kg gula = ... kg.",
        alias: ["5"],
      },
      voice: [
        [
          "Penghapus dan permen ke keranjang gram. Semangka dan sepeda ke kilogram.",
          "Balon besar bisa lebih ringan daripada batu kecil. Jangan tebak dari ukuran saja.",
          "Timbangan digital menampilkan angka di layar. Tiga ditambah dua sama dengan lima kilogram.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih karung beras dan 2.000 g, tentukan benar-salah ukuran vs berat serta timbangan digital, jodohkan biskuit-badan-pupuk, lalu jelaskan 1 kg = 1.000 g.",
      labelDaftar: "Pilihan, benar-salah, mencocokkan, dan esai",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A dan B",
          singkat: "Satuan dan konversi",
          uraian:
            "Beras butuh kg. 2 kg = 2.000 g. Besar belum tentu berat. Timbangan digital menampilkan angka.",
          contoh: "Beras. 2.000. Digital.",
        },
        {
          nama: "Kelompok C dan D",
          singkat: "Pasangan dan jumlah",
          uraian:
            "Biskuit: g. Badan dan pupuk: kg. 3+2=5 kg. Urutan 5 g, 200 g, 2 kg.",
          contoh: "g. kg. 5.",
        },
      ],
      kuis: [
        { pertanyaan: "Telur atau beras untuk kg?", alias: ["beras"] },
        { pertanyaan: "2 kg = ... g?", alias: ["2000", "2.000"] },
        { pertanyaan: "Besar selalu lebih berat?", alias: ["salah"] },
        { pertanyaan: "Timbangan digital otomatis?", alias: ["benar"] },
        { pertanyaan: "Biskuit satuan?", alias: ["gram", "g"] },
        { pertanyaan: "Mengapa 1 kg = 1.000 g?", alias: ["seribu", "lebih besar"] },
      ],
      voice: [
        ["Karung beras butuh kilogram. Dua kilogram sama dengan dua ribu gram."],
        ["Besar belum tentu berat. Timbangan digital menampilkan angka."],
      ],
    },
    {
      kode: "D",
      judul: "D. Kartu Evaluasi Ekstra",
      pengantar:
        "Tanpa keyboard. Tarik garis biskuit-badan-pupuk, geser semangka atau permen, urutkan 5 g-200 g-2 kg, coretkan 5, lalu tekan BENAR atau SALAH.",
      labelDaftar: "Tarik garis, keranjang, urutan, kanvas, detektif",
      kolom: 1,
      item: [
        {
          nama: "Permainan A sampai C",
          singkat: "Garis, keranjang, urutan",
          uraian:
            "Biskuit: g. Badan: kg. Pupuk: kg. Gram: penghapus, permen. Kilogram: semangka, sepeda. Urutan: kapas 5 g, pisang 200 g, pepaya 2 kg.",
          contoh: "g. Permen. 5 g dulu.",
        },
        {
          nama: "Permainan D dan E",
          singkat: "Kanvas dan detektif",
          uraian:
            "3+2=5 kg, coretkan 5. Besar belum tentu berat. Timbangan digital menampilkan angka di layar.",
          contoh: "Coretkan 5. SALAH lalu BENAR.",
        },
      ],
      kuis: [
        { pertanyaan: "Tarik garis satuan berat?", alias: ["gram", "kilogram"] },
        { pertanyaan: "Keranjang ringan atau berat?", alias: ["permen", "semangka"] },
        { pertanyaan: "Urutan 5 g 200 g 2 kg?", alias: ["5", "200", "2"] },
        { pertanyaan: "Besar selalu lebih berat?", alias: ["salah"] },
        { pertanyaan: "Timbangan digital otomatis?", alias: ["benar"] },
      ],
      kuisTulis: {
        pertanyaan: "Coretkan total __ kilogram belanja Ibu.",
        alias: ["5"],
      },
      voice: [
        [
          "Tanpa keyboard. Tarik garis biskuit ke gram, badan dan pupuk ke kilogram. Geser penghapus ke gram, semangka ke kilogram.",
          "Urutkan kapas 5 gram, pisang 200 gram, pepaya 2 kilogram. Coretkan 5 untuk total belanja.",
          "Detektif: besar belum tentu berat. Timbangan digital menampilkan angka di layar.",
        ],
      ],
    },
  ],
};
