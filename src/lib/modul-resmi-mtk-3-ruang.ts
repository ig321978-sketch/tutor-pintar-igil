import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK3_RUANG } from "@/lib/misi-mtk-3-ruang";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK3_RUANG = "Bab 13: Bangun Ruang";

export const MODUL_MTK3_RUANG: ModulResmiPai = {
  id: "mtk-3-ruang",
  judul: JUDUL_MTK3_RUANG,
  pola: /^bab 13: bangun ruang$/,
  motivasi:
    "Nisa, Farhan, dan Cinta menata paket di gudang bersama burung hantu Igil.",
  kunciJawaban: "C,D,A,B,C,B,C,C,B,C",
  sketsaKartu: [
    "Nisa, Farhan, dan Cinta menata paket bersama burung hantu Igil.",
    "Kubus, balok, tabung, kerucut, bola, limas, dan prisma.",
    "Sepuluh pos paket.",
    "Poin penting dan lembar evaluasi bangun ruang.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
Kubus punya sisi...
A) 4
B) 8
C) 6
D) 12`,
    `[Soal 2 - PG - Tipe: MOTS]
Balok punya rusuk...
A) 6
B) 8
C) 10
D) 12`,
    `[Soal 3 - PG - Tipe: MOTS]
Bola punya titik sudut...
A) 0
B) 1
C) 2
D) 8`,
    `[Soal 4 - PG - Tipe: MOTS]
Kerucut punya titik sudut...
A) 0
B) 1
C) 2
D) 4`,
    `[Soal 5 - PG - Tipe: MOTS]
Tabung punya rusuk...
A) 0
B) 1
C) 2
D) 3`,
    `[Soal 6 - PG - Tipe: HOTS]
Limas segiempat punya sisi...
A) 4
B) 5
C) 6
D) 8`,
    `[Soal 7 - PG - Tipe: HOTS]
Prisma segitiga punya rusuk...
A) 6
B) 8
C) 9
D) 12`,
    `[Soal 8 - PG - Tipe: HOTS]
Bangun yang tidak punya rusuk...
A) Tabung
B) Kerucut
C) Bola
D) Balok`,
    `[Soal 9 - PG - Tipe: HOTS]
Dadu adalah bangun...
A) Balok
B) Kubus
C) Tabung
D) Limas`,
    `[Soal 10 - PG - Tipe: HOTS]
Kotak sepatu punya titik sudut...
A) 4
B) 6
C) 8
D) 12`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar: "Nisa, Farhan, Cinta, dan Igil menata paket di gudang.",
      labelDaftar: "Lima adegan gudang",
      kolom: 1,
      item: [
        { nama: "Sisi dan rusuk", singkat: "Bagian bangun", uraian: "Sisi adalah bidang. Rusuk adalah garis. Titik sudut adalah pertemuan.", contoh: "Dadu kubus punya 12 rusuk." },
        { nama: "Kubus dan balok", singkat: "Kotak", uraian: "Kubus rusuknya sama. Balok rusuknya ada yang panjang.", contoh: "Keduanya punya 6 sisi dan 8 titik sudut." },
        { nama: "Lengkung", singkat: "Tabung kerucut bola", uraian: "Tabung 2 rusuk. Kerucut 1 puncak. Bola mulus.", contoh: "Bola menggelinding." },
        { nama: "Limas dan prisma", singkat: "Tenda dan kotak", uraian: "Limas segiempat punya puncak. Prisma segitiga punya dua tutup segitiga.", contoh: "Limas 5 sisi. Prisma 9 rusuk." },
        { nama: "Membandingkan", singkat: "Gelinding", uraian: "Bola, tabung, dan kerucut bisa menggelinding.", contoh: "Kubus dan balok diam di tempat." },
      ],
      kuis: [
        { pertanyaan: "Balok punya sisi berapa?", alias: ["6"] },
        { pertanyaan: "Kubus punya titik sudut berapa?", alias: ["8"] },
        { pertanyaan: "Kubus punya rusuk berapa?", alias: ["12"] },
        { pertanyaan: "Balok punya titik sudut berapa?", alias: ["8"] },
        { pertanyaan: "Kerucut punya titik sudut berapa?", alias: ["1"] },
        { pertanyaan: "Bola punya rusuk berapa?", alias: ["0"] },
        { pertanyaan: "Prisma segitiga punya rusuk berapa?", alias: ["9"] },
        { pertanyaan: "Limas segiempat punya titik sudut berapa?", alias: ["5"] },
        { pertanyaan: "Yang tidak punya titik sudut?", alias: ["bola"] },
        { pertanyaan: "Bangun dengan satu puncak?", alias: ["kerucut"] },
        { pertanyaan: "Kubus punya rusuk berapa?", alias: ["12"] },
        { pertanyaan: "Pasangkan ciri dan bangunnya.", alias: ["bola", "kerucut", "tabung"] },
        { pertanyaan: "Susun dari titik sudut paling sedikit.", alias: ["bola", "kerucut", "limas", "kubus"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "Yang menggelinding tanpa rusuk?", alias: ["bola"] },
      ],
      voice: [["Di gudang paket, kita melihat sisi, rusuk, dan titik sudut."]],
    },
    {
      kode: "B",
      judul: "B. Infografis",
      pengantar: "Papan kubus, balok, tabung, kerucut, bola, limas, dan prisma.",
      labelDaftar: "Lima papan paket",
      kolom: 1,
      item: [
        { nama: "Kubus", singkat: "6, 12, 8", uraian: "6 sisi, 12 rusuk, 8 titik sudut.", contoh: "Semua rusuknya sama panjang." },
        { nama: "Balok", singkat: "Rusuk beda", uraian: "6 sisi, 12 rusuk, 8 titik sudut.", contoh: "Rusuknya ada yang panjang." },
        { nama: "Lengkung", singkat: "Tiga bangun", uraian: "Tabung, kerucut, dan bola.", contoh: "Bola tidak punya rusuk." },
        { nama: "Lancip", singkat: "Limas prisma", uraian: "Limas punya puncak. Prisma punya tutup yang sama.", contoh: "Prisma segitiga punya 9 rusuk." },
        { nama: "Gelinding", singkat: "Sisi lengkung", uraian: "Yang bersisi lengkung bisa menggelinding.", contoh: "Kubus tidak menggelinding." },
      ],
      kuis: [
        { pertanyaan: "Bola punya sisi berapa?", alias: ["1"] },
        { pertanyaan: "Tabung punya rusuk berapa?", alias: ["2"] },
        { pertanyaan: "Dadu namanya?", alias: ["kubus"] },
        { pertanyaan: "Kotak sepatu namanya?", alias: ["balok"] },
        { pertanyaan: "Kaleng namanya?", alias: ["tabung"] },
        { pertanyaan: "Bola sepak namanya?", alias: ["bola"] },
        { pertanyaan: "Tenda alas persegi namanya?", alias: ["limas"] },
        { pertanyaan: "Kotak dua tutup segitiga namanya?", alias: ["prisma"] },
        { pertanyaan: "Yang tidak punya rusuk?", alias: ["bola"] },
        { pertanyaan: "Bangun dengan satu puncak?", alias: ["kerucut"] },
        { pertanyaan: "Limas segiempat punya titik sudut berapa?", alias: ["5"] },
        { pertanyaan: "Pasangkan ciri dan jumlahnya.", alias: ["6", "9", "0"] },
        { pertanyaan: "Susun dari rusuk paling sedikit.", alias: ["bola", "kerucut", "tabung", "kubus"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "Kotak pensil panjang namanya?", alias: ["balok"] },
      ],
      voice: [["Papan ini menunjukkan sisi, rusuk, dan titik sudut tiap bangun."]],
    },
    {
      kode: "C",
      judul: "C. Pos Paket Igil",
      pengantar: "Sepuluh soal bangun ruang.",
      labelDaftar: "Sepuluh soal paket",
      kolom: 1,
      item: [
        {
          nama: "Soal paket",
          singkat: "Bangun ruang",
          uraian: "Sebutkan nama bangun, atau hitung sisi, rusuk, dan titik sudut.",
          contoh: "Salah boleh diulang. Paket tidak berkurang.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK3_RUANG),
      voice: [["Sepuluh pos paket. Pilih satu, lalu jawab."]],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal bangun ruang.",
      labelDaftar: "Lembar evaluasi bangun ruang",
      kolom: 1,
      item: [
        {
          nama: "Evaluasi",
          singkat: "Sepuluh soal",
          uraian: "Mengenali kubus, balok, tabung, kerucut, bola, limas, dan prisma.",
          contoh: "Hitung sisi, rusuk, dan titik sudut.",
        },
      ],
      kuis: [
        { pertanyaan: "Balok punya sisi berapa?", alias: ["6"] },
        { pertanyaan: "Bola punya rusuk berapa?", alias: ["0"] },
        { pertanyaan: "Topi ulang tahun namanya?", alias: ["kerucut"] },
        { pertanyaan: "Limas segiempat punya rusuk berapa?", alias: ["8"] },
        { pertanyaan: "Pasangkan benda dan bangunnya.", alias: ["tabung", "prisma", "bola"] },
        { pertanyaan: "Prisma segitiga punya titik sudut berapa?", alias: ["6"] },
        { pertanyaan: "Susun dari sisi paling sedikit.", alias: ["bola", "kerucut", "tabung", "kubus"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "Kubus punya rusuk berapa?", alias: ["12"] },
        { pertanyaan: "Yang punya 2 rusuk?", alias: ["B"] },
      ],
      voice: [["Sepuluh soal. Lihat bendanya, lalu hitung sisi, rusuk, atau titik sudut."]],
    },
  ],
};
