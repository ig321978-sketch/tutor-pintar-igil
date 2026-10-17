import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK6_BAB3 = "Bab 3: Kubus dan Balok";

export const MODUL_MTK6_BAB3: ModulResmiPai = {
  id: "mtk-6-bab3",
  judul: JUDUL_MTK6_BAB3,
  pola: /^bab 3: kubus dan balok$/,
  motivasi: "Bab ini mengikuti urutan buku: menyusun dan mengurai kubus serta balok, melihat dari beberapa arah, lalu lokasi dan jarak pada sistem berpetak.",
  kunciJawaban: "C,B,A,C,B",
  sketsaKartu: [
    "Menyusun dan mengurai kubus serta balok.",
    "Tampak depan, samping, dan atas, termasuk mata dadu yang berlawanan.",
    "Lokasi pada petak, jalur, dan jarak mendatar serta tegak.",
    "Uji kompetensi bab dan pengayaan banyak cara terpendek.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
Bangun pada uji tersusun dari kubus satuan. Banyak kubusnya...
A) 5
B) 6
C) 7
D) 8`,
    `[Soal 2 - PG - Tipe: MOTS]
Dadu terlihat atas 6 dan depan 2. Sisi kanan kosong. Dua sisi berlawanan berjumlah 7. Mata pada sisi kosong...
A) 2
B) 4
C) 5
D) 6`,
    `[Soal 3 - PG - Tipe: MOTS]
Kinan di (B,3). Angga dua deret di kanan dan satu baris di belakang. Posisi Angga...
A) (D,4)
B) (D,2)
C) (C,4)
D) (E,3)`,
    `[Soal 4 - PG - Tipe: MOTS]
Jarak langkah terpendek dari (A,3) ke (E,5)...
A) 4
B) 5
C) 6
D) 8`,
    `[Soal 5 - PG - Tipe: HOTS]
Banyak cara terpendek dari (A,1) ke (D,5) jika hanya boleh ke kanan atau ke atas...
A) 7
B) 35
C) 21
D) 12`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar: "Menyusun dan mengurai kubus serta balok.",
      labelDaftar: "A. Mengonstruksi dan Mengurai",
      kolom: 1,
      item: [
        { nama: "Bangun ruang", singkat: "Delapan bangun", uraian: "Tabung, kerucut, kubus, balok, prisma segitiga, bola, limas segitiga, prisma segi lima.", contoh: "Yang dapat digelindingkan: bola, tabung, dan kerucut." },
        { nama: "Sisi dan rusuk", singkat: "5, 5, dan 12", uraian: "Prisma segitiga punya 5 sisi. Limas segi empat punya 5 titik sudut. Balok punya 12 rusuk.", contoh: "Kubus adalah bangun yang semua sisinya sama." },
        { nama: "Dua kubus", singkat: "Satu bentuk", uraian: "Dua kubus yang menempel pada satu sisi hanya punya satu bentuk. Arah pandang boleh berbeda.", contoh: "Balok punya lebih dari satu cara tempel karena sisinya tidak semua sama." },
      ],
      kuis: [
        { pertanyaan: "Banyak sisi prisma segitiga.", alias: ["5"] },
        { pertanyaan: "Banyak titik sudut limas segi empat.", alias: ["5"] },
        { pertanyaan: "Banyak rusuk balok.", alias: ["12"] },
      ],
      voice: [[
        "Prisma segitiga memiliki lima sisi.",
        "Balok memiliki dua belas rusuk.",
      ]],
    },
    {
      kode: "B",
      judul: "B. Visualisasi Spasial",
      pengantar: "Bangun ruang terlihat berbeda dari arah yang berbeda.",
      labelDaftar: "B. Visualisasi Spasial",
      kolom: 1,
      item: [
        { nama: "Tiga arah", singkat: "Depan, samping, atas", uraian: "Tampak dari tiga arah membantu menyusun kembali kubus.", contoh: "Satu arah saja sering belum cukup." },
        { nama: "Dadu", singkat: "Jumlah 7", uraian: "Sisi berlawanan pada dadu ini berjumlah 7. Atas 6 berarti bawah 1. Depan 2 berarti belakang 5. Sisi kanan yang kosong adalah 4.", contoh: "6 berlawanan dengan 1, 5 berlawanan dengan 2, 3 berlawanan dengan 4." },
        { nama: "Tujuh kubus", singkat: "Dasar empat", uraian: "Dasar 2 kali 2 berisi 4 kubus. Tingkat atas berisi 3 kubus. Jumlahnya 7.", contoh: "Satu sudut atas depan-kanan kosong." },
      ],
      kuis: [
        { pertanyaan: "Mata dadu pada sisi kosong.", alias: ["4"] },
        { pertanyaan: "Banyak kubus pada bangun uji.", alias: ["7"] },
        { pertanyaan: "Bangun yang semua sisinya sama.", alias: ["kubus"] },
      ],
      voice: [[
        "Sisi dadu yang berlawanan berjumlah tujuh.",
        "Bangun pada uji memakai tujuh kubus.",
      ]],
    },
    {
      kode: "C",
      judul: "C. Lokasi",
      pengantar: "Lokasi, jalur, dan jarak pada sistem berpetak.",
      labelDaftar: "C. Lokasi",
      kolom: 1,
      item: [
        { nama: "Tanda pada petak", singkat: "(B,4) dan (D,1)", uraian: "Huruf untuk garis tegak. Bilangan untuk garis mendatar. Tanda X di (B,4). Tanda O di (D,1).", contoh: "Makassar pada peta bab ini terletak di petak C2." },
        { nama: "Jarak P ke Q", singkat: "3 dan 4", uraian: "Dari (B,5) ke (E,1) perlu 3 langkah mendatar dan 4 langkah tegak.", contoh: "Ada lebih dari satu jalur dengan panjang yang sama." },
        { nama: "Jarak latihan", singkat: "6 dan 5", uraian: "(A,3) ke (E,5) berjarak 4 mendatar dan 2 tegak, jumlah 6. (B,6) ke (D,3) berjumlah 5.", contoh: "Jarak terpendek adalah jumlah langkah mendatar dan tegak." },
      ],
      kuis: [
        { pertanyaan: "Lokasi tanda X.", alias: ["b,4", "b4", "(b,4)"] },
        { pertanyaan: "Langkah terpendek dari (A,3) ke (E,5).", alias: ["6"] },
        { pertanyaan: "Petak Makassar.", alias: ["c2", "c,2", "(c,2)"] },
      ],
      voice: [[
        "Tanda X terletak di B empat.",
        "Dari A tiga ke E lima perlu enam langkah.",
      ]],
    },
    {
      kode: "D",
      judul: "Uji Kompetensi",
      pengantar: "Uji bab dan pengayaan banyak cara.",
      labelDaftar: "Uji Kompetensi",
      kolom: 1,
      item: [
        { nama: "Kubus uji", singkat: "7", uraian: "Dasar empat kubus dan tiga kubus di atasnya.", contoh: "Satu tempat di tingkat atas kosong." },
        { nama: "Angga", singkat: "(D,4)", uraian: "Dari (B,3), dua deret ke kanan menjadi D dan satu baris ke belakang menjadi 4.", contoh: "Huruf membesar ke kanan. Bilangan membesar ke belakang." },
        { nama: "Banyak cara", singkat: "35", uraian: "Dari (A,1) ke (D,5) perlu 3 langkah kanan dan 4 langkah atas. Banyak cara terpendek 35.", contoh: "Cara ke titik dekat mengikuti pola segitiga Pascal." },
      ],
      kuis: [
        { pertanyaan: "Banyak kubus pada bangun uji.", alias: ["7"] },
        { pertanyaan: "Mata dadu pada sisi kosong.", alias: ["4"] },
        { pertanyaan: "Posisi Angga.", alias: ["d,4", "d4", "(d,4)"] },
        { pertanyaan: "Langkah dari (A,3) ke (E,5).", alias: ["6"] },
        { pertanyaan: "Banyak cara dari (A,1) ke (D,5).", alias: ["35"] },
      ],
      voice: [[
        "Angga duduk di D empat.",
        "Banyak cara terpendek dari A satu ke D lima adalah tiga puluh lima.",
      ]],
    },
  ],
};
