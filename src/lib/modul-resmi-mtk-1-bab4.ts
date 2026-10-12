import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK1_BAB4 = "Bab 4: Mengenal Bentuk";

export const MODUL_MTK1_BAB4: ModulResmiPai = {
  id: "mtk-1-bab4",
  judul: JUDUL_MTK1_BAB4,
  pola: /mengenal\s+bentuk\b|petualangan bentuk di rumah nenek|kota bentuk/,
  motivasi:
    "Sasa dan Bimo menjadi detektif bentuk di rumah Nenek Ani. Mereka menamai segitiga, segi empat, lingkaran, kubus, dan balok.",
  kunciJawaban: "A,B,C,C,B,B,C,C,C,C",
  sketsaKartu: [
    "Sasa, Bimo, dan Nenek Ani mengamati atap segitiga, jam lingkaran, pintu segi empat, dadu kubus, dan kotak susu balok.",
    "Keluarga bentuk datar dan bangun ruang, plus cara menghitung sisi dan sudut.",
    "Kota bentuk: membangun rumah dan mobil dengan koin bintang.",
    "Poin penting dan lembar evaluasi mengenal bentuk.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: LOTS]
Atap rumah Nenek Ani berbentuk...
A) Segitiga
B) Lingkaran
C) Kubus
D) Balok`,
    `[Soal 2 - PG - Tipe: LOTS]
Jam dinding di rumah Nenek berbentuk...
A) Persegi
B) Lingkaran
C) Balok
D) Segitiga`,
    `[Soal 3 - PG - Tipe: LOTS]
Bentuk yang tidak punya sudut adalah...
A) Segitiga
B) Persegi
C) Lingkaran
D) Kubus`,
    `[Soal 4 - PG - Tipe: LOTS]
Dadu berbentuk...
A) Persegi
B) Lingkaran
C) Kubus
D) Segitiga`,
    `[Soal 5 - PG - Tipe: LOTS]
Kotak susu berbentuk...
A) Kubus
B) Balok
C) Lingkaran
D) Segitiga`,
    `[Soal 6 - PG - Tipe: HOTS]
Segitiga mempunyai sisi sebanyak...
A) 2
B) 3
C) 4
D) 6`,
    `[Soal 7 - PG - Tipe: HOTS]
1 segitiga dan 1 persegi. Jumlah semua sisinya adalah...
A) 5
B) 6
C) 7
D) 8`,
    `[Soal 8 - PG - Tipe: HOTS]
Yang bukan bangun ruang adalah...
A) Dadu
B) Kardus
C) Bingkai foto
D) Es batu kotak`,
    `[Soal 9 - PG - Tipe: HOTS]
2 persegi. Jumlah semua sudutnya adalah...
A) 4
B) 6
C) 8
D) 10`,
    `[Soal 10 - PG - Tipe: HOTS]
Roda mobil sebaiknya berbentuk...
A) Segitiga
B) Persegi
C) Lingkaran
D) Balok`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Petualangan Bentuk di Rumah Nenek",
      pengantar:
        "Sasa dan Bimo mengamati rumah Nenek Ani. Atapnya segitiga, jamnya lingkaran, pintunya segi empat, dadunya kubus, dan kotak susunya balok.",
      labelDaftar: "Detektif bentuk di rumah Nenek",
      kolom: 1,
      item: [
        {
          nama: "Bentuk datar",
          singkat: "Segitiga, segi empat, dan lingkaran",
          uraian:
            "Atap punya 3 sisi dan 3 sudut, namanya segitiga. Jam dinding bulat tanpa sudut, namanya lingkaran. Bingkai foto yang keempat sisinya sama adalah persegi. Pintu yang ada sisi panjang dan pendek adalah persegi panjang. Persegi dan persegi panjang sama-sama segi empat.",
          contoh: "Segitiga punya 3 sisi.",
        },
        {
          nama: "Bangun ruang",
          singkat: "Kubus dan balok",
          uraian:
            "Dadu bisa dipegang dan semua sisinya persegi yang sama besar. Namanya kubus. Kotak susu lebih panjang dan ada sisi persegi panjang. Namanya balok.",
          contoh: "Dadu adalah kubus.",
        },
      ],
      kuis: [
        {
          pertanyaan: "Jam dinding di rumah Nenek bentuknya apa?",
          alias: ["lingkaran", "bulat"],
        },
      ],
      voice: [
        [
          "Halo Sasa. Halo Bimo. Hari ini kita main detektif bentuk.",
          "Atap rumah Nenek lancip. Sisinya ada tiga. Namanya segitiga.",
          "Jam dinding bulat dan tidak punya sudut. Namanya lingkaran.",
          "Bingkai foto adalah persegi. Pintu adalah persegi panjang. Keduanya segi empat.",
          "Dadu yang tebal dan semua sisinya sama adalah kubus. Kotak susu yang lebih panjang adalah balok.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Kenalan dengan Keluarga Bentuk",
      pengantar:
        "Bentuk datar pipih seperti kertas. Bangun ruang tebal dan bisa dipegang. Hitung sisinya satu per satu.",
      labelDaftar: "Sisi, sudut, dan contoh benda",
      kolom: 1,
      item: [
        {
          nama: "Rumus cepat",
          singkat: "3, 4, 0, dan 6",
          uraian:
            "Segitiga punya 3 sisi. Segi empat punya 4 sisi. Lingkaran punya 0 sudut. Kubus dan balok punya 6 sisi.",
          contoh: "3 + 4 = 7",
        },
        {
          nama: "Contoh menghitung",
          singkat: "Sisi, sudut, dan benda",
          uraian:
            "Satu segitiga dan satu persegi jumlah sisinya 7. Dua dadu berarti 2 kubus. Dua persegi jumlah sudutnya 8.",
          contoh: "4 + 4 = 8",
        },
      ],
      kuis: [
        {
          pertanyaan: "Cocokkan pizza, koin, dadu, dan kotak susu dengan bentuknya.",
          alias: ["segitiga", "lingkaran", "kubus", "balok"],
        },
        {
          pertanyaan: "Pola segitiga, lingkaran, persegi. Bentuk berikutnya adalah persegi.",
          alias: ["persegi", "segi empat"],
        },
        {
          pertanyaan: "Yang bukan bangun ruang adalah bingkai foto.",
          alias: ["bingkai foto", "bingkai", "persegi"],
        },
        {
          pertanyaan: "Dua segitiga. Berapa jumlah semua sisinya?",
          alias: ["6", "enam"],
        },
      ],
      voice: [
        [
          "Segitiga punya tiga sisi dan tiga sudut. Contohnya atap dan potongan semangka.",
          "Segi empat punya empat sisi dan empat sudut. Contohnya buku dan pintu.",
          "Lingkaran bulat, tidak punya sudut, dan bisa menggelinding. Contohnya koin dan roda.",
          "Kubus seperti dadu, enam sisi persegi yang sama. Balok seperti kotak susu, ada sisi yang lebih panjang.",
          "Tiga segitiga, empat segi empat. Bulat lingkaran, menggelinding cepat. Dadu itu kubus, kotak susu balok.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Kota Bentuk",
      pengantar:
        "Bantu Wali Kota Kelinci membangun rumah dan mobil. Pilih bentuk yang tepat sebelum koin bintang terpakai.",
      labelDaftar: "Membangun rumah dan mobil",
      kolom: 1,
      item: [
        {
          nama: "Harga bentuk",
          singkat: "Segitiga 1, persegi 2, lingkaran 1, balok 3",
          uraian:
            "Kamu mulai dengan 10 koin bintang. Rumah yang benar memakai persegi, segitiga, dan lingkaran, harganya 4. Mobil yang benar memakai balok dan dua lingkaran, harganya 5. Bangunan yang benar mendapat bonus 2 koin.",
          contoh: "10 - 4 = 6, lalu tambah 2 menjadi 8.",
        },
        {
          nama: "Keputusan",
          singkat: "Pikir dulu sebelum memilih",
          uraian:
            "Kalau atap dipilih lingkaran, rumah roboh dan satu koin hilang. Koin sengaja ditahan supaya misi masih bisa dicoba lagi. Dalam mode bersama, dua pemain berbagi koin dan memilih bentuk yang hemat.",
          contoh: "Roda mobil adalah lingkaran.",
        },
      ],
      kuis: [
        {
          pertanyaan: "Rumah butuh persegi, segitiga, dan lingkaran.",
          alias: ["persegi", "segitiga", "lingkaran"],
        },
        {
          pertanyaan: "Mobil butuh balok dan dua lingkaran.",
          alias: ["balok", "lingkaran"],
        },
        {
          pertanyaan: "Roda mobil bentuknya apa?",
          alias: ["lingkaran"],
        },
      ],
      voice: [
        [
          "Wali Kota Kelinci meminta bantuan membangun kota.",
          "Rumah butuh badan persegi, atap segitiga, dan jendela lingkaran.",
          "Mobil butuh badan balok dan dua roda lingkaran.",
          "Kalau bentuknya salah, bangunan roboh. Pikirkan dulu, karena koin terbatas.",
          "Roda mobil harus lingkaran supaya bisa menggelinding.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Poin Penting dan Lembar Evaluasi",
      pengantar:
        "Segitiga tiga sisi. Segi empat empat sisi. Lingkaran tanpa sudut. Kubus seperti dadu. Balok seperti kotak susu.",
      labelDaftar: "Evaluasi mengenal bentuk",
      kolom: 1,
      item: [
        {
          nama: "Trik mengingat",
          singkat: "Sentuh-hitung dan pipih-tebal",
          uraian:
            "Sentuh setiap sisi sambil berhitung. Pipih seperti kertas berarti bentuk datar. Tebal dan bisa dipegang berarti bangun ruang.",
          contoh: "Segitiga, tiga sisi, tiga sudut.",
        },
      ],
      kuis: [
        { pertanyaan: "Benda mana yang tidak punya sudut: pizza, koin, atau pintu?", alias: ["koin", "lingkaran"] },
        { pertanyaan: "Dua segitiga dan satu persegi. Berapa jumlah semua sisinya?", alias: ["10", "sepuluh"] },
        { pertanyaan: "Bimo berkata dadu itu persegi. Apakah Bimo benar?", alias: ["salah", "kubus"] },
        { pertanyaan: "Pola dua segitiga lalu lingkaran. Dua kotak terakhir diisi apa?", alias: ["segitiga", "lingkaran"] },
        { pertanyaan: "Sebutkan benda di kelas yang berbentuk segi empat.", alias: ["buku", "jendela", "pintu", "papan"] },
        { pertanyaan: "Ada berapa segi empat pada robot?", alias: ["4", "empat"] },
        { pertanyaan: "Benda yang tidak menggelinding di lantai miring adalah kardus.", alias: ["kardus", "balok"] },
        { pertanyaan: "Apa yang sama dan beda dari dadu dan kotak susu?", alias: ["kubus", "balok"] },
        { pertanyaan: "Dua segitiga digabung bisa menjadi segi empat.", alias: ["segi empat", "persegi", "jajar genjang"] },
        { pertanyaan: "Gambar mainan dari tiga keluarga bentuk, lalu sebutkan jumlahnya.", alias: ["tiga", "3"] },
      ],
      voice: [
        [
          "Segitiga, tiga sisi, tiga sudut.",
          "Segi empat, empat sisi, empat sudut.",
          "Lingkaran bulat, tanpa sudut, bisa menggelinding.",
          "Kubus seperti dadu, semua sisinya sama. Balok seperti kotak susu, lebih panjang.",
          "Tiga segitiga, empat segi empat. Bulat lingkaran, menggelinding cepat. Dadu itu kubus, kotak susu balok. Ayo cari bentuk di sekitar pojok.",
          "Hore. Kamu sudah jadi detektif bentuk. Coba cari bentuk lain di rumahmu.",
        ],
      ],
    },
  ],
};
