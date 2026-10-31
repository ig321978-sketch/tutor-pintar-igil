import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK5_BAB1 } from "@/lib/misi-mtk-5-bab1";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK5_BAB1 = "Bab 1: Bilangan Cacah Sampai 100.000";

export const MODUL_MTK5_BAB1: ModulResmiPai = {
  id: "mtk-5-bab1",
  judul: JUDUL_MTK5_BAB1,
  pola: /^bab 1: bilangan cacah sampai 100\.?000$/,
  motivasi:
    "Lila, Rafi, dan Igil membaca harga di Pasar Numerika sampai 100.000. Mereka menyusun rak, membandingkan, dan menghitung.",
  kunciJawaban: "B,A,C,B,A,B,C,A,B,C",
  sketsaKartu: [
    "Lila dan Rafi membaca harga di pasar bersama Igil.",
    "Rak puluh ribuan sampai satuan, banding, susun, dan operasi.",
    "Sepuluh pos di pasar angka.",
    "Poin penting dan lembar evaluasi sampai 100.000.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
Bagaimana membaca 26.932?
A) Dua puluh enam ratus sembilan ratus tiga puluh dua
B) Dua puluh enam ribu sembilan ratus tiga puluh dua
C) Dua enam sembilan tiga dua
D) Dua puluh enam ribu tiga puluh dua`,
    `[Soal 2 - PG - Tipe: MOTS]
Pada 87.986, angka 7 bernilai...
A) 7.000
B) 70
C) 700
D) 70.000`,
    `[Soal 3 - PG - Tipe: MOTS]
Mana yang lebih besar?
A) 40.350
B) 25.786
C) 54.675
D) 13.456`,
    `[Soal 4 - PG - Tipe: HOTS]
Urutan dari kecil ke besar: 40.350, 13.456, 88.976, 25.786
A) 40.350, 13.456, 25.786, 88.976
B) 13.456, 25.786, 40.350, 88.976
C) 88.976, 40.350, 25.786, 13.456
D) 13.456, 40.350, 25.786, 88.976`,
    `[Soal 5 - PG - Tipe: MOTS]
3 puluh ribuan, 5 ribuan, 2 ratusan, 4 puluhan, 7 satuan ditulis...
A) 35.247
B) 3.5247
C) 352.47
D) 53.247`,
    `[Soal 6 - PG - Tipe: HOTS]
12.450 + 8.375 = ...
A) 20.725
B) 20.825
C) 21.825
D) 19.825`,
    `[Soal 7 - PG - Tipe: HOTS]
45.000 − 17.250 = ...
A) 28.750
B) 27.850
C) 27.750
D) 62.250`,
    `[Soal 8 - PG - Tipe: MOTS]
125 × 4 = ...
A) 500
B) 450
C) 525
D) 400`,
    `[Soal 9 - PG - Tipe: MOTS]
840 ÷ 6 = ...
A) 120
B) 140
C) 160
D) 130`,
    `[Soal 10 - PG - Tipe: HOTS]
Harga Rp15.590,00 dibaca...
A) Lima ribu lima ratus sembilan puluh
B) Lima belas ribu sembilan puluh
C) Lima belas ribu lima ratus sembilan puluh
D) Lima puluh satu ribu lima ratus sembilan puluh`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar Pasar Numerika",
      pengantar: "Lila, Rafi, dan Igil membaca harga sampai 100.000 di pasar.",
      labelDaftar: "Empat sub-bab bilangan cacah",
      kolom: 1,
      item: [
        {
          nama: "Membaca dan nilai tempat",
          singkat: "Lima rak",
          uraian:
            "26.932 dibaca dua puluh enam ribu sembilan ratus tiga puluh dua. Pada 87.986 angka 7 bernilai 7.000. 15.590 dibaca lima belas ribu lima ratus sembilan puluh.",
          contoh: "Baca dari kiri. Titik hanya pemisah ribuan.",
        },
        {
          nama: "Membandingkan dan mengurutkan",
          singkat: "Dari kiri",
          uraian: "54.675 > 40.350. Urutan 13.456, 25.786, 40.350, 54.675, 88.976.",
          contoh: "Bandingkan rak kiri dulu.",
        },
        {
          nama: "Komposisi dan dekomposisi",
          singkat: "Susun dan urai",
          uraian: "35.247 = 30.000 + 5.000 + 200 + 40 + 7. Rak kosong tetap ditulis nol.",
          contoh: "Susun dari rak. Urai ke rak.",
        },
        {
          nama: "Operasi hitung",
          singkat: "Tambah kurang kali bagi",
          uraian: "12.450 + 8.375 = 20.825. 45.000 − 17.250 = 27.750. 125 × 4 = 500. 840 ÷ 6 = 140.",
          contoh: "Mulai dari satuan saat menambah atau mengurangi.",
        },
      ],
      kuis: [
        { pertanyaan: "Baca 26.932.", alias: ["26932", "dua puluh enam ribu sembilan ratus tiga puluh dua"] },
        { pertanyaan: "Tulis 26.932 dari bacaan.", alias: ["26932", "26.932"] },
        { pertanyaan: "Nilai angka 7 pada 87.986.", alias: ["7000", "7.000", "tujuh ribu"] },
        { pertanyaan: "Tulis 87.986.", alias: ["87986", "87.986"] },
        { pertanyaan: "Mana lebih besar, 40.350 atau 54.675?", alias: ["54675", "54.675"] },
        { pertanyaan: "Urutkan 13.456, 40.350, 25.786.", alias: ["13456", "25786", "40350"] },
        { pertanyaan: "Susun 35.247 dari rak.", alias: ["35247", "35.247"] },
        { pertanyaan: "Urai 35.247.", alias: ["30000", "5000", "200", "40", "7"] },
        { pertanyaan: "12.450 + 8.375 = ...", alias: ["20825", "20.825"] },
        { pertanyaan: "45.000 − 17.250 = ...", alias: ["27750", "27.750"] },
        { pertanyaan: "Pilih bacaan 15.590.", alias: ["lima belas ribu lima ratus sembilan puluh"] },
        { pertanyaan: "Pasangkan bilangan dengan bacaan.", alias: ["26932", "15590", "87986"] },
        { pertanyaan: "Susun dari kecil ke besar.", alias: ["13456", "25786", "40350", "54675"] },
        { pertanyaan: "Benar atau salah tentang rak.", alias: ["benar", "salah"] },
        { pertanyaan: "125 × 4 = ...", alias: ["500"] },
      ],
      voice: [
        [
          "Hari ini kita ke Pasar Numerika bersama Lila, Rafi, dan Igil.",
          "Lima rak: puluh ribuan, ribuan, ratusan, puluhan, satuan.",
          "Kita bandingkan dari kiri, susun, urai, lalu hitung sampai seratus ribu.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Latihan di dalam sub-bab",
      pengantar: "Latihan membaca, rak, banding, dan operasi ada di dalam materi pasar.",
      labelDaftar: "Latihan empat sub-bab",
      kolom: 1,
      item: [
        {
          nama: "Baca harga",
          singkat: "Nol diam",
          uraian: "15.590 dibaca lima belas ribu lima ratus sembilan puluh. Nol di tengah tetap ditulis.",
          contoh: "Kosong, tulis nol.",
        },
        {
          nama: "Urut pasar",
          singkat: "Dari kecil",
          uraian: "13.456 paling kecil. 88.976 paling besar.",
          contoh: "Kelompokkan puluh ribuan.",
        },
      ],
      kuis: [
        { pertanyaan: "Baca 15.590.", alias: ["15590", "lima belas ribu lima ratus sembilan puluh"] },
        { pertanyaan: "840 ÷ 6 = ...", alias: ["140"] },
        { pertanyaan: "Pasangkan operasi dengan hasil.", alias: ["500", "140", "20825"] },
        { pertanyaan: "Susun hasil dari kecil.", alias: ["140", "500", "20825"] },
        { pertanyaan: "Benar atau salah operasi.", alias: ["benar", "salah"] },
      ],
      voice: [
        [
          "Latihan di pasar. Baca pelan, lalu bandingkan dari kiri.",
          "Jumlahkan dari kanan. Periksa hasilnya dua kali.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Pos Pasar Numerika",
      pengantar: "Sepuluh soal pola di pasar. Selesai sepuluh pos, stempel Igil lengkap.",
      labelDaftar: "Sepuluh pos pasar",
      kolom: 1,
      item: [
        {
          nama: "Pos pola",
          singkat: "Deret, hilang, analogi, beda",
          uraian:
            "Deret naik 1.000. Angka hilang. Analogi nilai tempat. Yang beda. Baca, kurang, paling besar, jumlah, kali, dan bagi.",
          contoh: "Dua soal suara dan dua soal tulis.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK5_BAB1),
      voice: [
        [
          "Igil menjaga sepuluh pos di pasar.",
          "Ada deret, angka hilang, analogi, dan yang beda. Dua pos dijawab dengan suara, dua pos ditulis.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal membaca, rak, hitung, dan urut sampai 100.000.",
      labelDaftar: "Lembar evaluasi pasar",
      kolom: 1,
      item: [
        {
          nama: "Evaluasi bab",
          singkat: "Sepuluh soal",
          uraian:
            "26.932 dibaca dua puluh enam ribu sembilan ratus tiga puluh dua. 12.450 + 8.375 = 20.825. 45.000 − 17.250 = 27.750.",
          contoh: "Periksa dari kiri saat membandingkan.",
        },
      ],
      kuis: [
        { pertanyaan: "Baca 26.932.", alias: ["dua puluh enam ribu sembilan ratus tiga puluh dua", "26932"] },
        { pertanyaan: "12.450 + 8.375 = ...", alias: ["20825", "20.825"] },
        { pertanyaan: "Nilai 7 pada 87.986.", alias: ["7000", "7.000"] },
        { pertanyaan: "45.000 − 17.250 = ...", alias: ["27750", "27.750"] },
        { pertanyaan: "Pasangkan harga dengan bacaan.", alias: ["15590", "26932", "87986"] },
        { pertanyaan: "Urutkan 13.456, 40.350, 25.786.", alias: ["13456", "25786", "40350"] },
        { pertanyaan: "125 × 4 = ...", alias: ["500"] },
        { pertanyaan: "Mana lebih besar 54.675 atau 40.350?", alias: ["54675"] },
        { pertanyaan: "Baca 15.590.", alias: ["lima belas ribu lima ratus sembilan puluh"] },
        { pertanyaan: "840 ÷ 6 = ...", alias: ["140"] },
      ],
      voice: [
        [
          "Sepuluh soal pasar. Baca pelan, lalu hitung.",
          "Bandingkan dari kiri. Jumlahkan dari satuan.",
        ],
      ],
    },
  ],
};
