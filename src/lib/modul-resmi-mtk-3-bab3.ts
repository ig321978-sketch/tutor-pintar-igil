import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK3_BAB3 = "Bab 3: Pengukuran Panjang dan Berat";

export const MODUL_MTK3_BAB3: ModulResmiPai = {
  id: "mtk-3-bab3",
  judul: JUDUL_MTK3_BAB3,
  pola: /^bab 3: pengukuran panjang dan berat$/,
  motivasi:
    "Hore! Kamu sudah mengukur panjang dari angka 0 dan membaca timbangan. 1 m = 100 cm. 1 kg = 1.000 g.",
  kunciJawaban: "C,B,A,C,A",
  sketsaKartu: [
    "Empat alat ukur panjang: penggaris, meteran pita, meteran saku, dan meteran rol.",
    "Pensil diukur dari angka 0 sampai 10 cm di atas penggaris.",
    "Jarum timbangan analog berhenti di angka kilogram.",
    "Anak mengisi lembar kerja panjang dan berat.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
Edo mengukur krayon. Pangkal di angka 0, ujung di angka 8 cm. Panjang krayon...
A) 6 cm
B) 7 cm
C) 8 cm
D) 10 cm`,
    `[Soal 2 - PG - Tipe: HOTS]
Pita Siti sepanjang 3 meter. Dalam sentimeter, panjangnya...
A) 30 cm
B) 300 cm
C) 3.000 cm
D) 3 cm`,
    `[Soal 3 - PG - Tipe: HOTS]
Tali jemuran 2 m 45 cm. Panjang total dalam sentimeter...
A) 245 cm
B) 200 cm
C) 45 cm
D) 2.045 cm`,
    `[Soal 4 - PG - Tipe: HOTS]
Jarum timbangan berhenti di angka 4 kg. Berat beras dalam gram...
A) 40 gram
B) 400 gram
C) 4.000 gram
D) 40.000 gram`,
    `[Soal 5 - PG - Tipe: HOTS]
500 gram gula ditambah 500 gram tepung. Total belanjaan Dayu...
A) 1 kg
B) 2 kg
C) 10 kg
D) 100 kg`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Alat Ukur Panjang",
      pengantar:
        "📏 Benda kecil diukur dengan penggaris. Benda panjang dan lentur butuh meteran pita, meteran saku, atau meteran rol.",
      labelDaftar: "Empat alat ukur panjang",
      kolom: 1,
      item: [
        {
          nama: "📏 Penggaris",
          singkat: "cm dan mm",
          uraian: "Mengukur benda kecil seperti pensil, penghapus, dan buku tulis. Satuan umumnya sentimeter dan milimeter.",
          contoh: "Pensil diukur dengan penggaris.",
        },
        {
          nama: "📐 Meteran pita",
          singkat: "cm",
          uraian: "Meteran jahit mengukur lingkar badan atau kain yang lentur. Satuannya sentimeter.",
          contoh: "Lingkar badan diukur dengan pita.",
        },
        {
          nama: "🛠️ Meteran saku",
          singkat: "m dan cm",
          uraian: "Meteran rol kecil mengukur meja, pintu, dan jendela. Satuannya meter dan sentimeter.",
          contoh: "Lebar pintu diukur dengan meteran saku.",
        },
        {
          nama: "🏗️ Meteran rol panjang",
          singkat: "m",
          uraian: "Mengukur lapangan, ruang kelas, atau jalan. Satuannya meter.",
          contoh: "Panjang lapangan diukur dengan meteran rol.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Pensil dan penghapus diukur dengan alat apa?",
          alias: ["penggaris", "mistar"],
        },
        {
          pertanyaan: "2. Panjang lapangan diukur dengan alat apa?",
          alias: ["meteran rol", "meteran panjang", "rol"],
        },
        {
          pertanyaan: "3. Pengukuran dengan penggaris dimulai dari angka berapa?",
          alias: ["0", "nol", "angka 0"],
        },
      ],
      voice: [
        [
          "Ada empat alat ukur panjang. Penggaris untuk benda kecil, satuannya sentimeter dan milimeter.",
          "Meteran pita untuk lingkar badan atau kain. Meteran saku untuk meja, pintu, dan jendela. Meteran rol panjang untuk lapangan, kelas, atau jalan.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Mengukur dan Tangga Panjang",
      pengantar:
        "Aturan emas: mulai dari angka 0, bukan dari tepi penggaris. Turun satu tangga kali 10. Naik satu tangga bagi 10.",
      labelDaftar: "Penggaris dan tangga km sampai mm",
      kolom: 1,
      item: [
        {
          nama: "Penggaris pensil",
          singkat: "0 sampai 10 cm",
          uraian:
            "Ujung kiri pensil di angka 0. Ujung rautan di angka 10. Panjang pensil 10 cm. Baca tegak lurus dari atas.",
          contoh: "10 cm dikurangi 0 cm sama dengan 10 cm.",
        },
        {
          nama: "Tangga panjang",
          singkat: "km hm dam m dm cm mm",
          uraian:
            "Turun satu langkah kali 10. Naik satu langkah bagi 10. 1 meter turun dua langkah menjadi 100 sentimeter. 2 kilometer turun tiga langkah menjadi 2.000 meter.",
          contoh: "1 m = 100 cm. 2 km = 2.000 m.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Pensil dari angka 0 sampai angka 10 panjangnya berapa cm?",
          alias: ["10", "sepuluh"],
        },
        {
          pertanyaan: "2. 1 meter sama dengan berapa sentimeter?",
          alias: ["100", "seratus"],
        },
        {
          pertanyaan: "3. 2 kilometer sama dengan berapa meter?",
          alias: ["2000", "2.000", "dua ribu"],
        },
      ],
      voice: [
        [
          "Selalu tempelkan ujung kiri benda di angka nol. Lihat ujung kanan benda, lalu baca tegak lurus dari atas. Pensil yang ujungnya di angka 10 panjangnya 10 sentimeter.",
          "Tangga panjang dari kilometer sampai milimeter. Turun satu langkah kali 10. Naik satu langkah bagi 10. Satu meter sama dengan 100 sentimeter. Dua kilometer sama dengan 2.000 meter.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Mengukur Berat",
      pengantar:
        "⚖️ Timbangan pasar, timbangan duduk, timbangan digital, dan timbangan badan. Jarum harus di angka 0 saat wadah kosong.",
      labelDaftar: "Alat timbang dan tangga kg sampai g",
      kolom: 1,
      item: [
        {
          nama: "Empat timbangan",
          singkat: "Pasar, duduk, digital, badan",
          uraian:
            "Timbangan bebek memakai anak timbangan. Timbangan duduk untuk sayur dan buah. Timbangan digital untuk bahan kue. Timbangan badan untuk berat tubuh di UKS.",
          contoh: "Bahan kue ditimbang dengan timbangan digital.",
        },
        {
          nama: "Membaca jarum",
          singkat: "Berhenti di 2 berarti 2 kg",
          uraian:
            "Pastikan jarum di angka 0 saat kosong. Letakkan benda, jarum berputar searah jarum jam. Jika berhenti di angka 2, beratnya 2 kg.",
          contoh: "1 kg = 1.000 g. 1 kg = 10 ons. 1 ons = 100 g.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Jarum berhenti di angka 2. Beratnya berapa kg?",
          alias: ["2", "dua"],
        },
        {
          pertanyaan: "2. 1 kilogram sama dengan berapa gram?",
          alias: ["1000", "1.000", "seribu"],
        },
        {
          pertanyaan: "3. 1 ons sama dengan berapa gram?",
          alias: ["100", "seratus"],
        },
      ],
      voice: [
        [
          "Timbangan pasar memakai anak timbangan. Timbangan duduk untuk sayur dan daging. Timbangan digital untuk tepung dan gula. Timbangan badan mengukur berat tubuh.",
          "Saat wadah kosong, jarum harus di angka nol. Setelah benda diletakkan, jarum berputar searah jarum jam. Jika berhenti di angka 2, beratnya 2 kilogram.",
          "Satu kilogram sama dengan 1.000 gram, atau 10 ons. Satu ons sama dengan 100 gram.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Kerja Siswa",
      pengantar:
        "📝 Lima soal panjang dan berat. Hitung dari titik 0, lalu ubah satuannya dengan teliti.",
      labelDaftar: "Latihan membaca alat ukur dan konversi",
      kolom: 1,
      item: [
        {
          nama: "Panjang",
          singkat: "8 cm, 300 cm, 245 cm",
          uraian:
            "Krayon dari 0 ke 8 panjangnya 8 cm. 3 meter sama dengan 300 cm. 2 meter 45 sentimeter sama dengan 245 cm.",
          contoh: "8, 300, dan 245.",
        },
        {
          nama: "Berat",
          singkat: "4.000 g dan 1 kg",
          uraian:
            "4 kilogram sama dengan 4.000 gram. 500 gram ditambah 500 gram sama dengan 1.000 gram, yaitu 1 kilogram.",
          contoh: "4.000 gram dan 1 kg.",
        },
      ],
      kuis: [
        { pertanyaan: "1. Panjang krayon dari 0 sampai 8 cm?", alias: ["8", "delapan", "c"] },
        { pertanyaan: "2. 3 meter sama dengan berapa sentimeter?", alias: ["300"] },
        { pertanyaan: "3. 2 meter 45 sentimeter sama dengan berapa sentimeter?", alias: ["245"] },
        { pertanyaan: "4. 4 kilogram sama dengan berapa gram?", alias: ["4000", "4.000", "c"] },
        { pertanyaan: "5. 500 gram ditambah 500 gram sama dengan berapa kilogram?", alias: ["1", "satu"] },
      ],
      voice: [
        [
          "Krayon Edo dari angka nol sampai angka 8 panjangnya 8 sentimeter. Pita 3 meter sama dengan 300 sentimeter.",
          "Tali 2 meter 45 sentimeter sama dengan 245 sentimeter. Beras 4 kilogram sama dengan 4.000 gram. Gula dan tepung 500 gram ditambah 500 gram menjadi 1 kilogram.",
        ],
      ],
    },
  ],
};
