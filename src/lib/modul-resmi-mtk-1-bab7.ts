import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { MISI_MTK1_BAB7, kuisDariMisi } from "@/lib/misi-kebun-mtk-1";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK1_BAB7 = "Bab 7: Mengukur Panjang Benda";

export const MODUL_MTK1_BAB7: ModulResmiPai = {
  id: "mtk-1-bab7",
  judul: JUDUL_MTK1_BAB7,
  pola: /mengukur\s+panjang\s+benda|pesta layang-layang|bengkel ukur kodok|misi pesta layang/,
  motivasi:
    "Ari, Mila, dan Bima mengukur layang-layang bersama Kodok. Mereka memakai jengkal, langkah, dan depa, lalu membandingkan panjangnya.",
  kunciJawaban: "A,A,B,A,C,B,C,C,B,B",
  sketsaKartu: [
    "Ari, Mila, dan Bima mengukur benang layang-layang dengan jengkal Kodok di bukit.",
    "Satuan tidak baku, aturan mengukur, membandingkan, dan mengurutkan panjang.",
    "Kodok mengukur sepuluh tali layang-layang: alat yang pas, selisih panjang, dan urutan benda.",
    "Poin penting dan lembar evaluasi mengukur panjang benda.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: LOTS]
Dua garis kelihatannya beda karena ujung panah. Sebenarnya keduanya...
A) Sama panjang
B) Garis berpanah lebih panjang
C) Garis biasa lebih panjang
D) Tidak bisa diukur`,
    `[Soal 2 - PG - Tipe: LOTS]
Dari ujung jempol ke ujung kelingking disebut...
A) Jengkal
B) Depa
C) Meter
D) Langkah`,
    `[Soal 3 - PG - Tipe: LOTS]
Benang yang sama diukur Ari 4 jengkal dan Mila 5 jengkal. Hasilnya beda karena...
A) Benangnya berubah
B) Panjang tangannya berbeda
C) Layang-layangnya beda warna
D) Kodok lupa menghitung`,
    `[Soal 4 - PG - Tipe: LOTS]
Panjang layang-layang 3, 5, dan 8 jengkal. Urutan dari yang paling pendek adalah...
A) 3, 5, 8
B) 8, 5, 3
C) 5, 3, 8
D) 8, 3, 5`,
    `[Soal 5 - PG - Tipe: HOTS]
Pensil A 4 klip kertas. Pensil B 7 klip kertas. Yang lebih panjang adalah...
A) Pensil A
B) Sama panjang
C) Pensil B
D) Tidak bisa dibanding`,
    `[Soal 6 - PG - Tipe: HOTS]
Alat tidak baku yang paling pas untuk lorong sekolah adalah...
A) Klip kertas
B) Langkah kaki
C) Krayon
D) Penghapus`,
    `[Soal 7 - PG - Tipe: HOTS]
Aturan mengukur yang benar adalah...
A) Mulai dari tengah benda
B) Boleh ada celah di antara alat
C) Rapat, lurus, dari ujung
D) Ganti tangan setiap kali ukur`,
    `[Soal 8 - PG - Tipe: HOTS]
Pita merah 8 klip. Pita biru 5 klip. Kalimat yang benar adalah...
A) 8 < 5
B) 8 = 5
C) 8 > 5
D) 5 > 8`,
    `[Soal 9 - PG - Tipe: HOTS]
Pintu 5 jengkal. Rak 3 jengkal lebih panjang dari pintu. Panjang rak adalah...
A) 2 jengkal
B) 8 jengkal
C) 15 jengkal
D) 3 jengkal`,
    `[Soal 10 - PG - Tipe: HOTS]
Papan A 7 jengkal. Papan B 4 jengkal. Papan A lebih panjang sebanyak...
A) 11 jengkal
B) 3 jengkal
C) 7 jengkal
D) 4 jengkal`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Pesta Layang-Layang di Bukit",
      pengantar:
        "Di festival layang-layang, mata bisa tertipu. Kodok mengajak mengukur dengan jengkal, langkah, dan aturan satu alat.",
      labelDaftar: "Jengkal, langkah, dan urutan panjang",
      kolom: 1,
      item: [
        {
          nama: "Jengkal",
          singkat: "Jempol sampai kelingking",
          uraian:
            "Satu jengkal adalah jarak ujung jempol ke ujung kelingking. Benang yang sama bisa menghasilkan angka berbeda jika tangannya berbeda. Ukur dengan tangan yang sama dari awal sampai akhir.",
          contoh: "Benang Ari 7 jengkal Kodok, 4 jengkal Ari, dan 5 jengkal Mila.",
        },
        {
          nama: "Urutan dan langkah",
          singkat: "Pendek ke panjang",
          uraian:
            "Layang-layang 3, 5, dan 8 jengkal diurutkan dari yang paling pendek. Jalan ke panggung diukur 10 langkah Kodok. Pemenangnya layang-layang terpanjang.",
          contoh: "3 jengkal lebih pendek dari 5 jengkal, dan 5 lebih pendek dari 8.",
        },
      ],
      kuis: [
        {
          pertanyaan: "Tali ini panjangnya berapa langkah?",
          alias: ["tujuh langkah", "7"],
        },
      ],
      voice: [
        [
          "Mata bisa tertipu. Yang kelihatan kecil belum tentu lebih pendek.",
          "Satu jengkal diukur dari ujung jempol ke ujung kelingking.",
          "Benang yang sama bisa beda angka kalau tangannya beda panjang.",
          "Pakai satu orang dan satu alat dari awal sampai akhir.",
          "Urutkan dari yang paling pendek. Tiga jengkal, lima jengkal, delapan jengkal.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Ayo Mengukur Tanpa Penggaris!",
      pengantar:
        "Jengkal, depa, langkah, hasta, lidi, dan klip kertas adalah satuan tidak baku. Ratakan ujungnya dulu, baru bandingkan.",
      labelDaftar: "Aturan emas, banding, urut, dan estimasi",
      kolom: 1,
      item: [
        {
          nama: "Aturan emas",
          singkat: "Rapat, lurus, dari ujung",
          uraian:
            "Mulai dari ujung benda, jangan dari tengah. Alat ukur harus bersambung rapat. Satu orang memakai satu alat. Kalau berganti tangan, hasilnya berubah.",
          contoh: "7 klip lebih panjang dari 4 klip.",
        },
        {
          nama: "Banding dan urut",
          singkat: "Kecil ke besar",
          uraian:
            "Tanda lebih panjang, lebih pendek, dan sama panjang dipakai setelah ujung kiri diratakan. Urutkan angka dari yang kecil. Tebak dulu, lalu ukur. Satuan tidak baku untuk membandingkan. Sentimeter dan meter adalah satuan baku.",
          contoh: "Klip 2, pensil 4, penggaris 7, sapu 9.",
        },
      ],
      kuis: [
        {
          pertanyaan: "Pasangkan krayon, tempat tidur, dan meja dengan panjangnya.",
          alias: ["2", "9", "5"],
        },
        {
          pertanyaan: "Urutkan klip, pensil, penggaris, dan benang dari yang paling pendek.",
          alias: ["klip", "pensil", "penggaris", "benang"],
        },
        {
          pertanyaan: "Benda mana yang paling tepat diukur dengan langkah kaki?",
          alias: ["lorong"],
        },
        {
          pertanyaan: "Meja guru lebih pas diukur dengan klip kertas atau depa?",
          alias: ["depa"],
        },
      ],
      voice: [
        [
          "Jangan percaya mata saja. Ukur dengan alat yang sama.",
          "Jengkal, depa, langkah, hasta, lidi, dan klip kertas adalah satuan tidak baku.",
          "Mulai dari ujung. Rapatkan alatnya. Pakai tangan yang sama.",
          "Ratakan ujung kiri, lalu lihat ujung kanan. Tujuh lebih panjang dari empat.",
          "Tebak dulu, ukur kemudian. Satuan baku membuat ukuran sama untuk semua orang.",
        ],
      ],
    },
        {
      kode: "C",
      judul: "C. Misi Pesta Layang-Layang",
      pengantar:
        "Bantu Kodok mengukur 10 tali di pesta layang-layang. Hijau untuk menghitung, biru untuk membaca, kuning untuk menulis, dan ungu untuk membandingkan.",
      labelDaftar: "Sepuluh tali ukur di bukit",
      kolom: 1,
      item: [
        {
          nama: "Alur permainan",
          singkat: "Pilih tali, jawab, dapat bintang",
          uraian:
            "Siswa memilih satu tali layang. Kodok menanyakan alat, selisih panjang, atau urutan benda. Jawaban benar mendapat 1 bintang layang. Jawaban yang belum tepat mendapat petunjuk, tanpa kehilangan jengkal.",
          contoh: "Pensil 7 klip lebih panjang daripada pensil 4 klip. Lorong diukur dengan langkah. Selisih 7 dan 4 adalah 3.",
        },
        {
          nama: "Jengkal ajaib",
          singkat: "3, 2, atau 1 jengkal",
          uraian:
            "Jawaban pertama benar mendapat 3 jengkal ajaib. Benar setelah satu petunjuk mendapat 2 jengkal. Benar setelah dua petunjuk mendapat 1 jengkal. Belum tepat tidak mengurangi jengkal. Siswa boleh mencoba lagi.",
          contoh: "Rapat, lurus, dari ujung. Satu orang, satu alat.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK1_BAB7),
      voice: [
        [
          "Kodok mengukur tali di pesta layang-layang. Ada sepuluh tali dari bukit sampai langit.",
          "Pensil tujuh klip lebih panjang daripada pensil empat klip.",
          "Lorong panjang diukur dengan langkah kaki, bukan klip.",
          "Lima jengkal ditambah tiga jengkal sama dengan delapan. Tujuh kurang empat sama dengan tiga.",
          "Jawaban benar mendapat satu bintang layang. Jika belum tepat, Kodok memberi petunjuk. Jengkal tidak berkurang.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Poin Penting dan Lembar Evaluasi",
      pengantar:
        "Mata boleh ragu, ukuran tidak. Rapat, lurus, dari ujung. Satu orang, satu alat.",
      labelDaftar: "Evaluasi mengukur panjang benda",
      kolom: 1,
      item: [
        {
          nama: "Yang perlu diingat",
          singkat: "Bandingkan dengan alat yang sama",
          uraian:
            "Jengkal, langkah, dan depa bisa jadi penggaris. Ratakan ujungnya dulu. Tebak dulu, ukur kemudian. Satuan tidak baku untuk membandingkan. Satuan baku untuk ukuran yang sama bagi semua orang.",
          contoh: "Rapat, lurus, dari ujung.",
        },
      ],
      kuis: [
        { pertanyaan: "Berapa langkah dari pintu ke papan tulis?", alias: ["8", "delapan"] },
        { pertanyaan: "Krayon 3 klip atau klip besar 5 klip, mana lebih panjang?", alias: ["klip besar"] },
        { pertanyaan: "Meja diukur dua tangan dan hasilnya beda. Apakah meja berubah?", alias: ["salah", "tangan"] },
        { pertanyaan: "Urutkan lidi, krayon, penggaris, dan sapu dari yang paling pendek.", alias: ["lidi", "krayon", "penggaris", "sapu"] },
        { pertanyaan: "Alat tidak baku apa yang pas untuk lapangan bola?", alias: ["langkah", "depa"] },
        { pertanyaan: "Pita A 9 jengkal lebih panjang berapa dari pita B 6 jengkal?", alias: ["3", "tiga"] },
        { pertanyaan: "Kira-kira berapa jengkal lebar pintu kelas?", alias: ["4", "5", "6", "7", "8"] },
        { pertanyaan: "Pasangkan buku, lorong, dan meja dengan alat ukurnya.", alias: ["klip", "langkah", "jengkal"] },
        { pertanyaan: "Papan 4 jengkal disambung 3 jengkal. Panjang semuanya?", alias: ["7", "tujuh"] },
        { pertanyaan: "Layang A 6, B 9, C 4. Siapa terpanjang dan berapa bedanya dengan yang terpendek?", alias: ["9", "5"] },
      ],
      voice: [
        [
          "Mata boleh ragu, ukuran tidak.",
          "Rapat, lurus, dari ujung.",
          "Satu orang, satu alat. Kalau berganti tangan, hasilnya berubah.",
          "Jengkal, langkah, dan depa bisa jadi penggaris.",
          "Ratakan ujungnya dulu, baru bandingkan.",
          "Tebak dulu, ukur kemudian.",
          "Satuan tidak baku untuk membandingkan. Satuan baku untuk ukuran yang sama bagi semua orang.",
        ],
      ],
    },
  ],
};
