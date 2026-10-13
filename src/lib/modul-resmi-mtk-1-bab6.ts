import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { MISI_MTK1_BAB6, kuisDariMisi } from "@/lib/misi-kebun-mtk-1";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK1_BAB6 = "Bab 6: Penjumlahan dan Pengurangan sampai dengan 20";

export const MODUL_MTK1_BAB6: ModulResmiPai = {
  id: "mtk-1-bab6",
  judul: JUDUL_MTK1_BAB6,
  pola: /penjumlahan\s+dan\s+pengurangan\s+sampai(\s+dengan)?\s+20\b|misi penyelamatan anak kucing|menara penyelamat toki|selamatkan anak kucing/,
  motivasi:
    "Kiki, Bayu, dan Naya menyelamatkan anak kucing bersama Toki. Mereka menghitung maju, menghitung mundur, dan memecah angka belasan.",
  kunciJawaban: "A,A,B,A,B,C,A,B,C,B",
  sketsaKartu: [
    "Kiki, Bayu, dan Naya menyusun kursi untuk mencapai anak kucing di dahan, bersama Toki si penjaga jam.",
    "Hitung maju, hitung mundur, dekomposisi, dan keluarga angka sampai 20.",
    "Toki menyusun sepuluh kursi penyelamatan: hitung maju, hitung mundur, dan keluarga angka sampai 20.",
    "Poin penting dan lembar evaluasi penjumlahan serta pengurangan sampai 20.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: LOTS]
Anak kucing di angka 18. Anak-anak baru sampai angka 12. Langkah yang masih kurang adalah...
A) 6
B) 18
C) 30
D) 12`,
    `[Soal 2 - PG - Tipe: LOTS]
8 + 7 = ...
A) 15
B) 17
C) 14
D) 87`,
    `[Soal 3 - PG - Tipe: LOTS]
15 – 4 = ...
A) 19
B) 11
C) 14
D) 4`,
    `[Soal 4 - PG - Tipe: LOTS]
14 = 10 + ...
A) 4
B) 14
C) 10
D) 24`,
    `[Soal 5 - PG - Tipe: HOTS]
9 + 6 = ...
A) 14
B) 15
C) 16
D) 96`,
    `[Soal 6 - PG - Tipe: HOTS]
14 – 6 = ...
A) 20
B) 9
C) 8
D) 6`,
    `[Soal 7 - PG - Tipe: HOTS]
Kalau 8 + 7 = 15, maka 15 – 7 = ...
A) 8
B) 7
C) 15
D) 22`,
    `[Soal 8 - PG - Tipe: HOTS]
13 + 5 = ...
A) 17
B) 18
C) 8
D) 135`,
    `[Soal 9 - PG - Tipe: HOTS]
10 + 3 dan 16 – 3 hasilnya...
A) 10 + 3 lebih besar
B) 16 – 3 lebih besar
C) Sama besar
D) Tidak bisa dibandingkan`,
    `[Soal 10 - PG - Tipe: HOTS]
Kiki punya 13 stiker. Bayu memberi 5 stiker lagi. Stiker Kiki sekarang ada...
A) 8
B) 18
C) 13
D) 5`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Misi Penyelamatan Anak Kucing",
      pengantar:
        "Sore hari, anak kucing terjebak di dahan setinggi 18. Kiki, Bayu, dan Naya menyusun kursi. Toki menunjukkan jam yang membuat angka berjalan maju dan mundur.",
      labelDaftar: "Hitung maju, pecah angka, lalu hitung mundur",
      kolom: 1,
      item: [
        {
          nama: "Hitung maju",
          singkat: "Dari 12 lompat sampai 18",
          uraian:
            "Anak kucing ada di 18 dan anak-anak baru sampai 12. Hitung maju enam kali: tiga belas sampai delapan belas. Jadi 12 + 6 = 18. Delapan kursi ditambah tujuh kursi dihitung maju menjadi 15.",
          contoh: "8 + 7 = 15. Cara cepat: 8 + 2 + 5 = 10 + 5 = 15.",
        },
        {
          nama: "Hitung mundur",
          singkat: "Kursi jatuh, angka berjalan balik",
          uraian:
            "Lima belas kursi berkurang empat. Hitung mundur: empat belas, tiga belas, dua belas, sebelas. Sisa 11. Enam belas dikurangi sembilan bisa dipecah: 16 – 6 = 10, lalu 10 – 3 = 7.",
          contoh: "15 – 4 = 11. 16 – 9 = 7.",
        },
      ],
      kuis: [
        {
          pertanyaan: "Mulai dari 13, hitung maju 4 langkah. Berhenti di angka berapa?",
          alias: ["tujuh belas", "17"],
        },
        {
          pertanyaan: "Anak kucing ada di ketinggian berapa kaki?",
          alias: ["18", "delapan belas"],
        },
        {
          pertanyaan: "Tuliskan angka 18.",
          alias: ["18", "delapan belas"],
        },
        {
          pertanyaan: "Dari 12 sampai 18, ada berapa langkah?",
          alias: ["6", "enam"],
        },
        {
          pertanyaan: "Tuliskan 12 + 6 = 18.",
          alias: ["12 + 6 = 18", "12+6=18"],
        },
        {
          pertanyaan: "Empat belas sama dengan sepuluh tambah berapa?",
          alias: ["4", "empat"],
        },
        {
          pertanyaan: "Tuliskan 14 = 10 + 4.",
          alias: ["14 = 10 + 4", "14=10+4"],
        },
        {
          pertanyaan: "Delapan kursi ditambah tujuh kursi. Semuanya berapa?",
          alias: ["15", "lima belas"],
        },
        {
          pertanyaan: "Tuliskan 8 + 7 = 15.",
          alias: ["8 + 7 = 15", "8+7=15"],
        },
        {
          pertanyaan: "Setelah diisi sampai sepuluh, sisa kursi yang ditambahkan berapa?",
          alias: ["5", "lima"],
        },
        {
          pertanyaan: "Tuliskan 10 + 5 = 15.",
          alias: ["10 + 5 = 15", "10+5=15"],
        },
        {
          pertanyaan: "Ada 15 kursi. Yang jatuh 4. Sisa berapa?",
          alias: ["11", "sebelas"],
        },
        {
          pertanyaan: "Tuliskan 15 - 4 = 11.",
          alias: ["15 - 4 = 11", "15-4=11"],
        },
        {
          pertanyaan: "Enam belas dikurangi sembilan. Hasilnya berapa?",
          alias: ["7", "tujuh"],
        },
        {
          pertanyaan: "Tuliskan 16 - 9 = 7.",
          alias: ["16 - 9 = 7", "16-9=7"],
        },
        {
          pertanyaan: "Ada berapa cara yang dipakai: hitung maju, hitung mundur, dan pecah angka?",
          alias: ["3", "tiga"],
        },
        {
          pertanyaan: "Tuliskan salah satu caranya: maju.",
          alias: ["maju", "hitung maju"],
        },
      ],
      voice: [
        [
          "Anak kucing ada di dahan angka delapan belas. Kita baru sampai dua belas.",
          "Hitung maju: tiga belas, empat belas, lima belas, enam belas, tujuh belas, delapan belas. Ada enam langkah.",
          "Empat belas sama dengan sepuluh ditambah empat.",
          "Delapan ditambah tujuh sama dengan lima belas. Kejar sepuluh dulu, lalu tambah sisanya.",
          "Lima belas dikurangi empat sama dengan sebelas. Enam belas dikurangi sembilan sama dengan tujuh.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Ayo Hitung Maju dan Mundur!",
      pengantar:
        "Simpan angka di kepala, lalu lompat maju untuk menambah atau lompat mundur untuk mengurangi. Angka belasan selalu punya sepuluh di dalamnya.",
      labelDaftar: "Dekomposisi, kejar sepuluh, dan keluarga angka",
      kolom: 1,
      item: [
        {
          nama: "Kejar sepuluh",
          singkat: "Isi dulu sampai penuh",
          uraian:
            "Sembilan kurang satu supaya jadi sepuluh. Pecah enam jadi satu dan lima. Sembilan ditambah satu sama dengan sepuluh, sepuluh ditambah lima sama dengan lima belas. Empat belas dikurangi enam: habiskan empat dulu, sisa dua dikurangi dari sepuluh, hasilnya delapan.",
          contoh: "9 + 6 = 15. 14 – 6 = 8.",
        },
        {
          nama: "Keluarga angka",
          singkat: "Satu keluarga, tiga kalimat",
          uraian:
            "Kalau delapan ditambah tujuh sama dengan lima belas, maka lima belas dikurangi tujuh sama dengan delapan, dan lima belas dikurangi delapan sama dengan tujuh. Soal cerita dibaca dulu: cari angka, cari kata kunci, tulis kalimat, lalu hitung.",
          contoh: "8 + 7 = 15, 15 – 7 = 8, 15 – 8 = 7.",
        },
      ],
      kuis: [
        {
          pertanyaan: "Pasangkan 11 + 6, 19 – 7, dan 10 + 9 – 4 dengan hasilnya.",
          alias: ["17", "12", "15"],
        },
        {
          pertanyaan: "Susun balok 8, tambah, 4, sama dengan, 12.",
          alias: ["8 + 4 = 12", "4 + 8 = 12"],
        },
        {
          pertanyaan: "Kartu mana yang hasilnya bukan 13?",
          alias: ["16 - 2", "14"],
        },
        {
          pertanyaan: "Kalau 7 + 9 = 16, maka 16 – 9 berapa?",
          alias: ["tujuh", "7"],
        },
      ],
      voice: [
        [
          "Tambah berarti hitung maju. Dua belas ditambah lima berhenti di tujuh belas.",
          "Kurang berarti hitung mundur. Delapan belas dikurangi enam berhenti di dua belas.",
          "Angka belasan punya sepuluh di dalamnya. Empat belas sama dengan sepuluh ditambah empat.",
          "Kejar sepuluh dulu. Sembilan ditambah enam sama dengan sepuluh ditambah lima, hasilnya lima belas.",
          "Satu keluarga angka punya tiga kalimat. Delapan ditambah tujuh sama dengan lima belas.",
        ],
      ],
    },
        {
      kode: "C",
      judul: "C. Misi Selamatkan Anak Kucing",
      pengantar:
        "Bantu Toki menyusun 10 kursi untuk menyelamatkan anak kucing. Hijau untuk menghitung, biru untuk membaca, kuning untuk menulis, dan ungu untuk membandingkan.",
      labelDaftar: "Sepuluh kursi hitung maju dan mundur",
      kolom: 1,
      item: [
        {
          nama: "Alur permainan",
          singkat: "Pilih kursi, jawab, dapat bintang",
          uraian:
            "Siswa memilih satu kursi. Toki memberi lompatan, keluarga angka, atau kartu yang hasilnya berbeda. Jawaban benar mendapat 1 bintang penyelamat. Jawaban yang belum tepat mendapat petunjuk, tanpa kehilangan detik.",
          contoh: "12 + 5 = 17. 8 + 7 = 15 maka 15 - 7 = 8. Kartu 16 - 2 hasilnya 14, bukan 13.",
        },
        {
          nama: "Detik ajaib",
          singkat: "3, 2, atau 1 detik",
          uraian:
            "Jawaban pertama benar mendapat 3 detik ajaib. Benar setelah satu petunjuk mendapat 2 detik. Benar setelah dua petunjuk mendapat 1 detik. Belum tepat tidak mengurangi detik. Siswa boleh mencoba lagi.",
          contoh: "17 - 9 melewati sepuluh: 17 - 7 - 2 = 8.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK1_BAB6),
      voice: [
        [
          "Toki menyusun kursi untuk menyelamatkan anak kucing. Ada sepuluh kursi dari halaman sampai dahan.",
          "Dari dua belas, lompat maju lima kali dan berhenti di tujuh belas.",
          "Kalau delapan tambah tujuh sama dengan lima belas, maka lima belas kurang tujuh sama dengan delapan.",
          "Sepuluh tambah tiga dan enam belas kurang tiga sama-sama tiga belas. Kartu enam belas kurang dua hasilnya empat belas.",
          "Jawaban benar mendapat satu bintang penyelamat. Jika belum tepat, Toki memberi petunjuk. Detik tidak berkurang.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar:
        "Tambah dihitung maju. Kurang dihitung mundur. Belasan punya sepuluh di dalamnya. Kejar sepuluh dulu, lalu habiskan satuan.",
      labelDaftar: "Evaluasi hitung maju dan mundur sampai 20",
      kolom: 1,
      item: [
        {
          nama: "Yang perlu diingat",
          singkat: "Maju, mundur, dan pecah",
          uraian:
            "Kejar sepuluh dulu, sisanya gampang. Habiskan satuan dulu saat mengurangi. Satu keluarga angka punya tiga kalimat. Baca soal, cari kata kunci, lalu hitung.",
          contoh: "Kejar sepuluh dulu, sisanya gampang.",
        },
      ],
      kuis: [
        { pertanyaan: "Dari 9, enam lompatan maju. Tulis kalimatnya.", alias: ["9 + 6 = 15", "15"] },
        { pertanyaan: "Dari 17, lima lompatan mundur. Tulis kalimatnya.", alias: ["17 - 5 = 12", "12"] },
        { pertanyaan: "Pecah 18 jadi dua bagian.", alias: ["10", "8"] },
        { pertanyaan: "Bayu berkata 13 + 5 = 17. Benar atau salah?", alias: ["salah", "18"] },
        { pertanyaan: "Hitung 8 + 9 dengan kejar sepuluh.", alias: ["8 + 2 = 10", "10 + 7 = 17"] },
        { pertanyaan: "Tanda antara 9 + 7 dan 15 + 1.", alias: ["="] },
        { pertanyaan: "Naya punya 15 koin. Donat 11, kue 16. Mana yang bisa dibeli, dan kurang berapa untuk yang lain?", alias: ["donat", "1"] },
        { pertanyaan: "Tulis dua cara berbeda supaya hasilnya 14.", alias: ["14"] },
        { pertanyaan: "Bayu punya 17 kelereng, 9 jatuh. Sisanya berapa?", alias: ["17 - 9 = 8", "8"] },
        { pertanyaan: "Ada 12 balon, dibeli 5, lalu datang 8. Berapa sekarang?", alias: ["12 - 5 = 7", "7 + 8 = 15"] },
      ],
      voice: [
        [
          "Tambah? Hitung maju.",
          "Kurang? Hitung mundur.",
          "Belasan selalu punya sepuluh di dalamnya.",
          "Kejar sepuluh dulu, sisanya gampang.",
          "Habiskan satuan dulu.",
          "Satu keluarga angka, tiga kalimat.",
          "Baca soal, cari kata kunci, lalu hitung.",
        ],
      ],
    },
  ],
};
