import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK2_BAB1 = "Bab 1: Bilangan Cacah sampai 100";

export const MODUL_MTK2_BAB1: ModulResmiPai = {
  id: "mtk-2-bab1",
  judul: JUDUL_MTK2_BAB1,
  pola:
    /bilangan cacah sampai 100|rumah tinggal angka|nilai tempat ratusan|bilangan 1 sampai( dengan)? 1.?000|bilangan 1 sampai 100/,
  motivasi:
    "Angka punya tiga kamar: satuan kanan, puluhan tengah, ratusan kiri. 147 = 100 + 40 + 7. Bandingkan dari kiri dulu.",
  kunciJawaban: "B,B,S,B,B,A,C,B,A,B",
  sketsaKartu: [
    "Anak memasukkan kelereng ke kamar satuan, puluhan, dan ratusan.",
    "Anak membandingkan 168 dan 162 dari ratusan ke satuan.",
    "Anak mengerjakan evaluasi nilai tempat dan urutan bilangan.",
    "Anak menarik garis 152, menggeser >50, mengurutkan 112-128-145, dan menulis 124.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Pada angka 85, angka yang menempati kamar satuan paling kanan adalah...
A) 8
B) 5
C) 80
D) 85`,
    `[Soal 2 - PG - Tipe: HOTS]
Bentuk panjang 139 adalah...
A) 1 + 3 + 9
B) 100 + 30 + 9
C) 10 + 39
D) 139 + 0`,
    `[Soal 3 - PG - Tipe: HOTS]
168 lebih kecil dari 162 karena 8 lebih besar dari 2. Pernyataan ini...
A) Benar.
B) Salah; bandingkan ratusan, puluhan, lalu satuan. 168 > 162.
C) Benar hanya di satuan.
D) Kedua bilangan sama.`,
    `[Soal 4 - PG - Tipe: HOTS]
190 = 100 + 90 + 0. Pernyataan ini...
A) Salah.
B) Benar; ratusan 100, puluhan 90, satuan 0.
C) Benar hanya 100 + 90.
D) Satuan wajib 9.`,
    `[Soal 5 - PG - Tipe: Reguler]
Angka 1 pada 152 menempati kamar...
A) Satuan
B) Ratusan
C) Puluhan
D) Ribuan`,
    `[Soal 6 - PG - Tipe: Reguler]
Lambang seratus dua puluh empat adalah...
A) 124
B) 142
C) 214
D) 421`,
    `[Soal 7 - PG - Tipe: Reguler]
Urutan dari kecil ke besar: 145, 112, 128 adalah...
A) 145, 128, 112
B) 128, 112, 145
C) 112, 128, 145
D) 145, 112, 128`,
    `[Soal 8 - PG - Tipe: Reguler]
72 dibanding 50 adalah...
A) Lebih kecil
B) Lebih besar
C) Sama
D) Bukan bilangan`,
    `[Soal 9 - PG - Tipe: HOTS]
Mengapa kita membandingkan dari kamar ratusan dulu?
A) Karena nilai ratusan paling besar, baru puluhan, baru satuan.
B) Supaya cepat tebak.
C) Karena satuan selalu menang.
D) Karena nol tidak dihitung.`,
    `[Soal 10 - PG - Tipe: Reguler]
147 dibaca...
A) Seratus empat puluh tujuh
B) Empat belas tujuh
C) Seribu empat puluh tujuh
D) Empat puluh tujuh`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Rumah Ratusan, Puluhan, dan Satuan",
      pengantar:
        "Infografis rumah tinggal angka: satuan paling kanan, puluhan di tengah, ratusan paling kiri. 147 = 100 + 40 + 7, dibaca seratus empat puluh tujuh.",
      labelDaftar: "Satuan, puluhan, ratusan, bentuk panjang",
      kolom: 1,
      item: [
        {
          nama: "Kamar satuan",
          singkat: "Paling kanan, nilainya tetap",
          uraian:
            "Angka paling kanan menempati kamar satuan. Nilainya tetap. Pada 147, angka 7 nilainya 7. Pada 85, satuan adalah 5.",
          contoh: "85: satuan = 5.",
        },
        {
          nama: "Kamar puluhan dan ratusan",
          singkat: "Tengah dan kiri",
          uraian:
            "Puluhan di tengah: angka 4 pada 147 nilainya 40. Ratusan paling kiri: angka 1 nilainya 100. Setiap 10 satuan jadi 1 puluhan, setiap 10 puluhan jadi 1 ratusan.",
          contoh: "147 = 1 ratusan, 4 puluhan, 7 satuan.",
        },
        {
          nama: "Bentuk panjang",
          singkat: "Jumlahkan nilai kamar",
          uraian:
            "Tuliskan nilai tiap kamar lalu jumlahkan. 147 = 100 + 40 + 7. 139 = 100 + 30 + 9. 190 = 100 + 90 + 0.",
          contoh: "139 = 100 + 30 + 9.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Jika ada angka 85, angka manakah yang bertindak sebagai satuan dan menempati kamar paling kanan?",
          alias: ["5", "lima"],
        },
      ],
      kuisTulis: {
        pertanyaan: "Tuliskan bentuk panjang dari bilangan 139. 139 = ... + ... + ...",
        alias: ["100 + 30 + 9", "100+30+9", "100 +30 +9"],
      },
      voice: [
        [
          "Halo anak-anak hebat kelas 2 yang cerdas! Bayangkan 147 kelereng berserakan. Agar rapi, kita buatkan rumah dengan tiga kamar.",
          "Setiap 10 kelereng masuk kantong kecil, itu puluhan. Setiap 10 kantong jadi kotak besar, itu ratusan. Angka kanan: satuan, nilainya tetap. Angka tengah: puluhan, diberi satu nol. Angka kiri: ratusan, diberi dua nol.",
          "Jadi 147 artinya 1 ratusan, 4 puluhan, dan 7 satuan. Dibaca seratus empat puluh tujuh!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Membandingkan dan Mengurutkan",
      pengantar:
        "Infografis perbandingan: lihat ratusan dulu, lalu puluhan, lalu satuan. Tanda lebih besar, lebih kecil, dan sama dengan. Urutkan dari kecil ke besar.",
      labelDaftar: "Lebih besar, lebih kecil, urutan",
      kolom: 1,
      item: [
        {
          nama: "Dari kiri dulu",
          singkat: "Ratusan, puluhan, satuan",
          uraian:
            "Jangan hanya melihat satuan. 168 dan 162 sama ratusannya. Puluhannya sama 6. Satuan 8 lebih besar dari 2, jadi 168 > 162.",
          contoh: "168 > 162.",
        },
        {
          nama: "Lebih dari 50",
          singkat: "Bandingkan dengan 50",
          uraian:
            "72, 89, dan 60 lebih besar dari 50. 14 dan 35 lebih kecil dari 50. Lihat puluhan: 7 puluhan lebih dari 5 puluhan.",
          contoh: "72 > 50. 14 < 50.",
        },
        {
          nama: "Urutan naik",
          singkat: "Kecil ke besar",
          uraian:
            "Susun dari yang paling kecil. 112, lalu 128, lalu 145. Semua ratusannya 1, jadi lihat puluhan: 1, 2, lalu 4.",
          contoh: "112, 128, 145.",
        },
      ],
      kuis: [
        {
          pertanyaan: "Manakah yang lebih besar, 168 atau 162? Mengapa?",
          alias: ["168", "delapan", "satuan"],
        },
      ],
      kuisTulis: {
        pertanyaan: "Lambang bilangan dari seratus dua puluh empat adalah...",
        alias: ["124"],
      },
      voice: [
        [
          "Saat membandingkan, jangan tertipu satuan yang kelihatan besar. Mulai dari kamar kiri.",
          "168 lebih besar dari 162 karena satuannya 8, padahal ratusan dan puluhannya sama.",
          "Mengurutkan sama caranya: kecil di depan, besar di belakang. 112, 128, 145.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih satuan 85 dan bentuk panjang 139, tentukan benar-salah 168 lawan 162 serta 190, jodohkan nilai tempat 152, lalu jelaskan mengapa membandingkan dari ratusan.",
      labelDaftar: "Pilihan, benar-salah, mencocokkan, dan esai",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A dan B",
          singkat: "Kamar dan bentuk panjang",
          uraian:
            "Satuan 85 = 5. 139 = 100 + 30 + 9. 168 lebih besar dari 162. 190 = 100 + 90 + 0.",
          contoh: "5. 100+30+9. 168 > 162.",
        },
        {
          nama: "Kelompok C dan D",
          singkat: "152 dan urutan",
          uraian:
            "Pada 152: 1 ratusan, 5 puluhan, 2 satuan. 124 = seratus dua puluh empat. Bandingkan dari kiri karena nilainya paling besar.",
          contoh: "Ratusan 1. Urutan 112-128-145.",
        },
      ],
      kuis: [
        { pertanyaan: "Satuan 85?", alias: ["5"] },
        { pertanyaan: "Bentuk panjang 139?", alias: ["100", "30", "9"] },
        { pertanyaan: "168 lebih kecil dari 162?", alias: ["salah"] },
        { pertanyaan: "190 = 100+90+0?", alias: ["benar"] },
        { pertanyaan: "1 pada 152?", alias: ["ratusan"] },
        { pertanyaan: "Mengapa dari ratusan?", alias: ["besar", "kiri", "nilai"] },
      ],
      voice: [
        ["Satuan 85 adalah 5. 139 = 100 + 30 + 9."],
        ["Bandingkan dari ratusan. 168 lebih besar dari 162."],
      ],
    },
    {
      kode: "D",
      judul: "D. Kartu Evaluasi Ekstra",
      pengantar:
        "Tanpa keyboard. Tarik garis nilai tempat 152, geser bilangan ke keranjang >50 atau <50, urutkan 112-128-145, coretkan angka 4 pada 124, lalu tekan BENAR atau SALAH.",
      labelDaftar: "Tarik garis, keranjang, urutan, kanvas, detektif",
      kolom: 1,
      item: [
        {
          nama: "Permainan A sampai C",
          singkat: "Garis, keranjang, urutan",
          uraian:
            "152: 5 puluhan, 2 satuan, 1 ratusan. Lebih dari 50: 72, 89, 60. Kurang dari 50: 14, 35. Urutan: 112, 128, 145.",
          contoh: "1 ratusan. 72 > 50. 112 dulu.",
        },
        {
          nama: "Permainan D dan E",
          singkat: "Kanvas dan detektif",
          uraian:
            "124: coretkan 4. 168 tidak lebih kecil dari 162. 190 = 100 + 90 + 0.",
          contoh: "Coretkan 4. SALAH lalu BENAR.",
        },
      ],
      kuis: [
        { pertanyaan: "Tarik garis 152?", alias: ["ratusan", "puluhan", "satuan"] },
        { pertanyaan: "Keranjang 50?", alias: ["72", "14"] },
        { pertanyaan: "Urutan 112 128 145?", alias: ["112", "128", "145"] },
        { pertanyaan: "168 lebih kecil 162?", alias: ["salah"] },
        { pertanyaan: "190 bentuk panjang?", alias: ["benar"] },
      ],
      kuisTulis: {
        pertanyaan: "Coretkan angka terakhir 1 - 2 - __.",
        alias: ["124", "4"],
      },
      voice: [
        [
          "Tanpa keyboard. Tarik garis angka 5, 2, dan 1 pada 152 ke kamarnya. Geser 72 ke lebih besar dari 50, 14 ke lebih kecil.",
          "Urutkan 112, 128, lalu 145. Coretkan 4 untuk seratus dua puluh empat.",
          "Detektif: 168 lebih besar dari 162. 190 = 100 + 90 + 0.",
        ],
      ],
    },
  ],
};
