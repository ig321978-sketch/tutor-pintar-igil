import type { AdeganStory } from "./logika-story";
import { CONTOH, W, angkaSel, bil, bulat, emo, judul, kartu, ln, panah, simpanSel, susunAwal, susunLangkah, tabelSusun, teks } from "./k4b1e-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah } from "./k4b1e-bantu";

/* ------------------------------ 1. Panduan Guru awal sub-bab E (Panduan Guru hlm. 49; Buku Siswa hlm. 28) ------------------------------ */
const SUARA_A1 = "Sub-bab E: Penjumlahan Bilangan Cacah sampai seribu. Panduan guru menuliskan pengalaman belajarnya: peserta didik mampu menjumlahkan bilangan sampai seribu dengan baik dan benar.";
const SUARA_A2 = "Sarana yang dibutuhkan: manik-manik, kelereng, dan kerikil. Buku hanya menyebut daftarnya. Sebagai contoh video, sepuluh manik dapat dikelompokkan menjadi satu puluhan.";
const SUARA_A3 = "Apersepsi: guru merancang cerita kontekstual yang dihubungkan dengan cerita di buku. Penguasaan nilai tempat tetap penting, jadi guru perlu sedikit mengingatkannya. Contoh video: seratus tiga puluh satu terdiri atas satu ratusan, tiga puluhan, dan satu satuan.";
const SUARA_A4 = "Pertanyaan pemantik ada dua. Pertama, bagaimana operasi penjumlahan tanpa menyimpan? Kedua, bagaimana operasi penjumlahan dengan menyimpan? Guru dapat memberikan masalah yang berkaitan dengan penjumlahan.";

export const ADEGAN_PANDUAN_AWAL: AdeganStory = {
  id: "panduan-awal",
  judul: "Awal sub-bab E: pengalaman belajar dan pemantik",
  sumber: "Panduan Guru hlm. 49; Buku Siswa hlm. 28",
  latar: "#F0FDF4",
  kutipan: [
    "E. Penjumlahan Bilangan Cacah sampai 1.000",
    "Pengalaman Belajar",
    "menjumlahkan bilangan sampai 1.000 dengan baik dan benar.",
    "Kebutuhan Sarana Prasarana dan Media",
    "Manik-manik, kelereng, kerikil.",
    "Guru merancang cerita kontekstual untuk kemudian dihubungkan dengan",
    "Penguasaan nilai tempat bilangan tetap memegang peranan penting pada",
    "Pertanyaan Esensi/Pemantik",
    "1. Bagaimana operasi penjumlahan dengan tanpa menyimpan?",
    "2. Bagaimana operasi penjumlahan dengan menyimpan?",
  ],
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Sub-bab E: Penjumlahan")),
      tambah("Penjumlahan", ...kartu("e1", 14, 34, 272, 44, W.hijauMuda, ["E. Penjumlahan Bilangan Cacah", "sampai 1.000"], 9.4)),
      tambah("Panduan", ...kartu("e2", 14, 92, 272, 62, W.langit, ["Pengalaman belajar:", "mampu menjumlahkan sampai 1.000", "dengan baik dan benar"], 9.2)),
      tambah("seribu@2", emo("e3", 150, 186, "🧮", 22)),
    ),
    k(
      SUARA_A2,
      bersih(0),
      tambah(0, judul("Sarana dan media")),
      tambah(idx(SUARA_A2, "manikmanik"), bulat("sm", 60, 62, 14, W.biruMuda), teks("sm1", 60, 92, "manik-manik", 8, W.biru)),
      tambah("kelereng,", bulat("sk", 150, 62, 14, W.merah), teks("sk1", 150, 92, "kelereng", 8, W.biru)),
      tambah("kerikil.", bulat("sr", 240, 62, 14, W.abu), teks("sr1", 240, 92, "kerikil", 8, W.biru)),
      tambah("Sebagai", ...Array.from({ length: 10 }, (_, i) => bulat(`mb${i}`, 66 + i * 17, 148, 6, W.biruMuda)), teks("mbt", 150, 128, "contoh video: 10 manik", 8.6, W.hitam)),
      tambah("puluhan.", { id: "mbk", t: "kotak" as const, x: 55, y: 136, w: 190, h: 24, garis: W.hijau, tebal: 2, rx: 6, warna: "none" }, teks("mbu", 150, 182, "1 puluhan", 9, W.hijau)),
    ),
    k(
      SUARA_A3,
      bersih(0),
      tambah(0, judul("Apersepsi: cerita dan nilai tempat")),
      tambah("Apersepsi:", ...kartu("ap1", 14, 30, 130, 36, W.krem, ["cerita kontekstual", "dihubungkan dengan buku"], 8.4)),
      tambah("Penguasaan", ...kartu("ap2", 156, 30, 130, 36, W.hijauMuda, ["nilai tempat", "diingatkan kembali"], 8.4)),
      tambah("Contoh", teks("ap3", 150, 92, "contoh video: 131", 9.6, W.hitam)),
      tambah(idx(SUARA_A3, "satu", 2), ...susunNilai()),
    ),
    k(
      SUARA_A4,
      bersih(0),
      tambah(0, judul("Pertanyaan pemantik")),
      tambah("Pertama,", ...kartu("pm1", 14, 38, 272, 44, W.hijauMuda, ["1. penjumlahan tanpa menyimpan?"], 9.6)),
      tambah("Kedua,", ...kartu("pm2", 14, 96, 272, 44, W.langit, ["2. penjumlahan dengan menyimpan?"], 9.6)),
      tambah("Guru", ...kartu("pm3", 14, 154, 272, 34, W.emas, ["guru memberi masalah penjumlahan"], 9.2)),
    ),
  ],
};

/** Tabel nilai tempat contoh 131 (hanya hiasan penjelas; bukan tabel susun). */
function susunNilai() {
  return [...tabelSusun("nt", 102, 112, 1), ...[...String(CONTOH.toni[0])].map((d, c) => angkaSel("nt", 102, 112, 0, c, d))];
}

/* ------------------------------ 2. Pak Toni: cara susun panjang (Buku Siswa hlm. 28–29; Panduan Guru hlm. 50) ------------------------------ */
const SUARA_B1 = "Pak Toni mempunyai seratus tiga puluh satu pohon jeruk di Kota Jember dan tiga ratus dua puluh satu pohon di Kota Banyuwangi. Berapa pohon jeruk Pak Toni seluruhnya?";
const SUARA_B2 = "Ada dua cara: susun panjang dan susun pendek. Perhatikan dulu cara susun panjang: tulis bilangan bersusun menurut nilai tempat, lalu uraikan menjadi ratusan, puluhan, dan satuan.";
const SUARA_B3 = "Uraikan seratus tiga puluh satu menjadi seratus ditambah tiga puluh ditambah satu. Tiga ratus dua puluh satu menjadi tiga ratus ditambah dua puluh ditambah satu.";
const SUARA_B4 = "Langkah ketiga: kelompokkan bilangan dengan nilai tempat yang sama. Seratus ditambah tiga ratus, tiga puluh ditambah dua puluh, dan satu ditambah satu.";
const SUARA_B5 = "Hasilnya empat ratus ditambah lima puluh ditambah dua, yaitu empat ratus lima puluh dua pohon jeruk.";

export const ADEGAN_TONI_PANJANG: AdeganStory = {
  id: "toni-panjang",
  judul: "Pohon jeruk Pak Toni: susun panjang",
  sumber: "Materi: susun panjang",
  latar: "#FFF7ED",
  kutipan: [
    "Ayo Mengamati",
    "Pak Toni mempunyai pohon jeruk sebanyak 131 pohon di Kota Jember dan",
    "321 pohon di Kota Banyuwangi. Berapakah banyak pohon jeruk Pak Toni",
    "Cara Susun Panjang",
    "1. Tulis bilangan secara bersusun sesuai nilai",
    "2. Uraikan (dalam bentuk ratusan, puluhan",
    "dan satuan) masing-masing bilangan yang",
    "3. Mengelompokkan masing-masing bilangan",
    "131 = 100 + 30 + 1",
    "321 = 300 + 20 + 1 +",
    "= (100 + 300) + (30 + 20) + (1 + 1)",
    "= 400 + 50 + 2",
    "= 452",
  ],
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Pohon jeruk Pak Toni")),
      tambah("seratus", ...kartu("tj", 14, 34, 128, 54, W.hijauMuda, ["Kota Jember", "131 pohon"], 10)),
      tambah(idx(SUARA_B1, "ratus") - 1, ...kartu("tb", 158, 34, 128, 54, W.langit, ["Kota Banyuwangi", "321 pohon"], 10)),
      tambah("Berapa", emo("tq1", 76, 128, "🍊", 26), emo("tq2", 150, 128, "🍊", 26), emo("tq3", 224, 128, "🍊", 26), ...kartu("tq", 40, 148, 220, 34, W.emas, ["berapa pohon seluruhnya?"], 10)),
    ),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, judul("Cara susun panjang")),
      tambah("susun", ...kartu("pc1", 14, 28, 130, 22, W.hijauMuda, ["susun panjang"], 9.4)),
      tambah(idx(SUARA_B2, "pendek"), ...kartu("pc2", 156, 28, 130, 22, W.krem, ["susun pendek"], 9.4, { op: 0.5 })),
      tambah("tulis", bil("b1", 70, "131"), bil("b2", 84, "321 +")),
      tambah("uraikan", ...kartu("s1", 14, 138, 272, 24, W.langit, ["1. tulis bersusun sesuai nilai tempat"], 8.8), ...kartu("s2", 14, 168, 272, 24, W.hijauMuda, ["2. uraikan: ratusan, puluhan, satuan"], 8.8)),
      sorotkan("tulis", "pc1-k"),
    ),
    k(
      SUARA_B3,
      tambah(idx(SUARA_B3, "seratus", 2), ln("u1", 70, "= 100 + 30 + 1")),
      tambah(idx(SUARA_B3, "ratus", 2) - 1, ln("u2", 84, "= 300 + 20 + 1 +")),
      sorotkan(idx(SUARA_B3, "ratus", 2) - 1, "s2-k"),
    ),
    k(
      SUARA_B4,
      hapus(0, "s1-k", "s1-t0", "s2-k", "s2-t0"),
      tambah(0, ...kartu("s3", 14, 150, 272, 30, W.emas, ["3. kelompokkan nilai tempat yang sama"], 8.8)),
      tambah("Seratus", ln("u3", 100, "= (100 + 300) + (30 + 20) + (1 + 1)")),
      sorotkan("Seratus", "u1", "u2"),
    ),
    k(
      SUARA_B5,
      hapus(0, "s3-k", "s3-t0"),
      tambah(0, ...kartu("hs", 14, 156, 272, 30, W.hijauMuda, ["452 pohon jeruk"], 10)),
      tambah("Hasilnya", ln("u4", 114, "= 400 + 50 + 2")),
      tambah(idx(SUARA_B5, "yaitu"), ln("u5", 128, "= 452", 70, 9.6, { warna: W.merah })),
    ),
  ],
};

/* ------------------------------ 3. Pak Toni: cara susun pendek tanpa menyimpan (Buku Siswa hlm. 29; Panduan Guru hlm. 50) ------------------------------ */
const SUARA_C1 = "Bagaimana kalau memakai cara susun pendek? Tanpa menyimpan, tulis bilangan bersusun: satuan dengan satuan, puluhan dengan puluhan, ratusan dengan ratusan.";
const SUARA_C2 = "Operasi dilakukan dari nilai tempat terkecil ke terbesar, yaitu dari kanan ke kiri. Mulai dari satuan: satu ditambah satu sama dengan dua.";
const SUARA_C3 = "Lanjut ke puluhan: tiga ditambah dua sama dengan lima. Tanpa menyimpan, jadi tidak ada angka yang dipindahkan ke kolom sebelahnya.";
const SUARA_C4 = "Terakhir ratusan: satu ditambah tiga sama dengan empat. Hasilnya empat ratus lima puluh dua, sama dengan hasil cara susun panjang.";

const langkah = (id: string, x: number, y: number, bilangan: readonly number[], c: number) => susunLangkah(id, x, y, bilangan, c);

export const ADEGAN_TONI_PENDEK: AdeganStory = {
  id: "toni-pendek",
  judul: "Pohon jeruk Pak Toni: susun pendek",
  sumber: "Materi: susun pendek tanpa menyimpan",
  latar: "#F0F9FF",
  kutipan: [
    "Bagaimana kalau menggunakan cara",
    "susun pendek?",
    "Cara Susun Pendek (tanpa menyimpan)",
    "Tulis bilangan secara bersusun sesuai nilai tempatnya. (satuan",
    "disusun dengan satuan, puluhan disusun dengan puluhan, dan",
    "Operasi penjumlahan dilakukan dari nilai tempat yang terkecil ke",
    "nilai tempat yang besar (dari kanan ke kiri)",
    "Jumlahkan masing-masing bilangan sesuai dengan nilai",
    "1 + 3 = 4",
    "3 + 2 = 5",
    "1 + 1 = 2",
  ],
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Susun pendek tanpa menyimpan")),
      tambah("Tanpa", ...susunAwal("tp", 14, 40, CONTOH.toni)),
      tambah("satuan", ...kartu("tr", 14, 140, 272, 40, W.krem, ["satuan dengan satuan, puluhan dengan puluhan,", "ratusan dengan ratusan"], 8.8)),
    ),
    k(
      SUARA_C2,
      hapus(0, "tr-k", "tr-t0", "tr-t1"),
      tambah("kanan", panah("ta", 108, 126, -92, 0, W.hijau, 2), teks("tat", 62, 140, "kanan ke kiri", 8.6, W.hijau)),
      tambah(idx(SUARA_C2, "satu"), langkah("tp", 14, 40, CONTOH.toni, 2).label, langkah("tp", 14, 40, CONTOH.toni, 2).eq),
      tambah(idx(SUARA_C2, "dua"), langkah("tp", 14, 40, CONTOH.toni, 2).hasil),
    ),
    k(
      SUARA_C3,
      tambah("puluhan:", langkah("tp", 14, 40, CONTOH.toni, 1).label, langkah("tp", 14, 40, CONTOH.toni, 1).eq),
      tambah("lima.", langkah("tp", 14, 40, CONTOH.toni, 1).hasil),
      tambah("Tanpa", ...kartu("tn", 14, 156, 272, 28, W.hijauMuda, ["tanpa menyimpan: tidak ada angka dipindah"], 8.8)),
    ),
    k(
      SUARA_C4,
      hapus(0, "tn-k", "tn-t0"),
      tambah("ratusan:", langkah("tp", 14, 40, CONTOH.toni, 0).label, langkah("tp", 14, 40, CONTOH.toni, 0).eq),
      tambah(idx(SUARA_C4, "empat"), langkah("tp", 14, 40, CONTOH.toni, 0).hasil),
      tambah("Hasilnya", ...kartu("tj", 150, 140, 136, 40, W.emas, ["hasil 452", "sama dengan cara panjang"], 8.4)),
    ),
  ],
};

/* ------------------------------ 4. Tiga perpustakaan (Buku Siswa hlm. 30; Panduan Guru hlm. 50) ------------------------------ */
const SUARA_D1 = "Perpustakaan SD Gebang satu memiliki seratus dua puluh empat bacaan, Gebang dua memiliki empat ratus sebelas bacaan, dan Gebang lima memiliki tiga ratus enam puluh tiga bacaan. Berapa bacaan seluruhnya?";
const SUARA_D2 = "Mungkin ada yang bertanya: bolehkah cara susun panjang dipakai untuk tiga bilangan? Boleh. Uraikan seratus dua puluh empat menjadi seratus ditambah dua puluh ditambah empat.";
const SUARA_D3 = "Uraikan empat ratus sebelas menjadi empat ratus ditambah sepuluh ditambah satu, dan tiga ratus enam puluh tiga menjadi tiga ratus ditambah enam puluh ditambah tiga.";
const SUARA_D4 = "Kelompokkan ratusan: seratus, empat ratus, dan tiga ratus. Puluhan: dua puluh, sepuluh, dan enam puluh. Satuan: empat, satu, dan tiga.";
const SUARA_D5 = "Jumlahnya delapan ratus ditambah sembilan puluh ditambah delapan, yaitu delapan ratus sembilan puluh delapan. Jadi ada delapan ratus sembilan puluh delapan bacaan.";
const SUARA_D6 = "Cara susun pendek: satuan, empat ditambah satu ditambah tiga sama dengan delapan. Puluhan, dua ditambah satu ditambah enam sama dengan sembilan. Ratusan, satu ditambah empat ditambah tiga sama dengan delapan.";

export const ADEGAN_BUKU_TIGA: AdeganStory = {
  id: "buku-tiga",
  judul: "Tiga perpustakaan: tiga bilangan dijumlahkan",
  sumber: "Materi: tiga bilangan",
  latar: "#FEFCE8",
  kutipan: [
    "Perpustakaan SD Gebang 1 memiliki 124 buku, Perpustakaan SD",
    "Gebang 2 memiliki 411 buku, dan Perpustakaan SD Gebang 5",
    "memiliki 363 buku. Hitunglah berapa banyak buku seluruhnya dari",
    "Apakah boleh melakukan penjumlahan",
    "cara susun panjang.",
    "124 = 100 + 20 + 4",
    "411 = 400 + 10 + 1",
    "363 = 300 + 60 + 3 +",
    "= (100 + 400 + 300) + (20 + 10 + 60) + (4 + 1 + 3)",
    "= 800 + 90 + 8",
    "= 898",
    "Jadi, banyak buku-buku tersebut adalah 898 buku",
    "Bagus. Sekarang kalian lakukan penjumlahan",
    "cara susun pendek.",
  ],
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Tiga perpustakaan SD Gebang")),
      tambah("satu", ...kartu("g1", 8, 34, 88, 50, W.hijauMuda, ["SD Gebang 1", "124 bacaan"], 9)),
      tambah("dua", ...kartu("g2", 106, 34, 88, 50, W.langit, ["SD Gebang 2", "411 bacaan"], 9)),
      tambah("lima", ...kartu("g5", 204, 34, 88, 50, W.pink, ["SD Gebang 5", "363 bacaan"], 9)),
      tambah("Berapa", emo("gb", 150, 126, "📚", 28), ...kartu("gq", 50, 148, 200, 34, W.emas, ["berapa bacaan seluruhnya?"], 10)),
    ),
    k(
      SUARA_D2,
      bersih(0),
      tambah(0, judul("Susun panjang: tiga bilangan")),
      tambah("Mungkin", ...kartu("gt", 14, 28, 272, 24, W.krem, ["boleh susun panjang untuk tiga bilangan?"], 8.4)),
      tambah("Uraikan", bil("v1", 76, "124"), bil("v2", 90, "411"), bil("v3", 104, "363 +")),
      tambah(idx(SUARA_D2, "seratus", 2), ln("w1", 76, "= 100 + 20 + 4")),
      sorotkan("Boleh.", "gt-k"),
    ),
    k(
      SUARA_D3,
      tambah(idx(SUARA_D3, "ratus", 2) - 1, ln("w2", 90, "= 400 + 10 + 1")),
      tambah(idx(SUARA_D3, "ratus", 4) - 1, ln("w3", 104, "= 300 + 60 + 3 +")),
    ),
    k(
      SUARA_D4,
      tambah(0, ln("w4", 122, "= (100 + 400 + 300) + (20 + 10 + 60) + (4 + 1 + 3)", 14, 8)),
      sorotkan("Puluhan:", "w2", "w3"),
    ),
    k(
      SUARA_D5,
      tambah(0, ln("w5", 138, "= 800 + 90 + 8", 14)),
      tambah(idx(SUARA_D5, "yaitu"), ln("w6", 152, "= 898", 14, 9.6, { warna: W.merah })),
      tambah("Jadi", ...kartu("w7", 150, 160, 136, 30, W.emas, ["898 bacaan"], 10)),
    ),
    k(
      SUARA_D6,
      bersih(0),
      tambah(0, judul("Susun pendek: tiga bilangan")),
      tambah(0, ...susunAwal("t3", 14, 44, CONTOH.buku)),
      tambah("satuan,", susunLangkah("t3", 14, 44, CONTOH.buku, 2).label, susunLangkah("t3", 14, 44, CONTOH.buku, 2).eq),
      tambah(idx(SUARA_D6, "delapan"), susunLangkah("t3", 14, 44, CONTOH.buku, 2).hasil),
      tambah("Puluhan,", susunLangkah("t3", 14, 44, CONTOH.buku, 1).label, susunLangkah("t3", 14, 44, CONTOH.buku, 1).eq),
      tambah(idx(SUARA_D6, "sembilan"), susunLangkah("t3", 14, 44, CONTOH.buku, 1).hasil),
      tambah("Ratusan,", susunLangkah("t3", 14, 44, CONTOH.buku, 0).label, susunLangkah("t3", 14, 44, CONTOH.buku, 0).eq),
      tambah(idx(SUARA_D6, "delapan", 2), susunLangkah("t3", 14, 44, CONTOH.buku, 0).hasil),
    ),
  ],
};

/* ------------------------------ 5. Dua keranjang jeruk: susun panjang dengan menyimpan (Buku Siswa hlm. 31) ------------------------------ */
const SUARA_E1 = "Seorang pedagang buah memikul dua keranjang jeruk. Satu keranjang berisi seratus delapan puluh sembilan jeruk, keranjang yang lain dua ratus empat puluh lima. Berapa jeruk seluruhnya?";
const SUARA_E2 = "Cara susun panjang dengan menyimpan. Uraikan seratus delapan puluh sembilan menjadi seratus ditambah delapan puluh ditambah sembilan, dan dua ratus empat puluh lima menjadi dua ratus ditambah empat puluh ditambah lima.";
const SUARA_E3 = "Kelompokkan: dua ratus ditambah seratus, delapan puluh ditambah empat puluh, sembilan ditambah lima. Hasilnya tiga ratus ditambah seratus dua puluh ditambah empat belas.";
const SUARA_E4 = "Sembilan ditambah lima sama dengan empat belas, uraikan menjadi sepuluh ditambah empat. Delapan puluh ditambah empat puluh sama dengan seratus dua puluh, uraikan menjadi seratus ditambah dua puluh.";
const SUARA_E5 = "Sekarang tiga ratus ditambah seratus ditambah dua puluh ditambah sepuluh ditambah empat, lalu dikelompokkan menurut nilai tempat.";
const SUARA_E6 = "Hasilnya empat ratus ditambah tiga puluh ditambah empat, yaitu empat ratus tiga puluh empat. Jadi jeruk yang dipikul pedagang ada empat ratus tiga puluh empat.";

export const ADEGAN_SIMPAN_PANJANG: AdeganStory = {
  id: "simpan-panjang",
  judul: "Dua keranjang jeruk: susun panjang dengan menyimpan",
  sumber: "Materi: susun panjang dengan menyimpan",
  latar: "#FFF7ED",
  kutipan: [
    "Seorang Pedagang buah di depan sekolah memikul 2",
    "keranjang buah jeruk. 1 keranjang berisi 189 jeruk dan",
    "keranjang yang lain berisi 245 jeruk. Berapakah jumlah",
    "Penjumlahan cara susun panjang dengan menyimpan",
    "189 = 100 + 80 + 9",
    "245 = 200 + 40 + 5 +",
    "= (200 + 100) + (80 + 40) + (9 + 5)",
    "= 300 + 120 + 14",
    "= 300 + (100 + 20) + (10 + 4)",
    "= (300 + 100) + (20 + 10) + 4",
    "= 400 + 30 + 4",
    "= 434",
    "2. 9 + 5 = 14, uraikan menjadi 10 + 4",
    "3. 80 + 40 = 120, uraikan menjadi 100 + 20.",
    "Jadi, banyaknya buah yang dijual adalah 434 buah",
  ],
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Dua keranjang jeruk")),
      tambah("seratus", ...kartu("ka", 14, 34, 128, 54, W.hijauMuda, ["Keranjang 1", "189 jeruk"], 10)),
      tambah("keranjang@3", ...kartu("kb", 158, 34, 128, 54, W.langit, ["Keranjang 2", "245 jeruk"], 10)),
      tambah("Berapa", emo("kj1", 90, 126, "🍊", 26), emo("kj2", 150, 126, "🍊", 26), emo("kj3", 210, 126, "🍊", 26), ...kartu("kq", 40, 148, 220, 34, W.emas, ["berapa jeruk seluruhnya?"], 10)),
    ),
    k(
      SUARA_E2,
      bersih(0),
      tambah(0, judul("Susun panjang dengan menyimpan")),
      tambah("Uraikan", bil("a1", 52, "189"), bil("a2", 66, "245 +")),
      tambah(idx(SUARA_E2, "seratus", 2), ln("b1", 52, "= 100 + 80 + 9")),
      tambah(idx(SUARA_E2, "ratus", 2) - 1, ln("b2", 66, "= 200 + 40 + 5 +")),
    ),
    k(
      SUARA_E3,
      tambah(0, ln("b3", 82, "= (200 + 100) + (80 + 40) + (9 + 5)")),
      tambah("Hasilnya", ln("b4", 96, "= 300 + 120 + 14")),
      sorotkan("Hasilnya", "b3"),
    ),
    k(
      SUARA_E4,
      tambah(0, teks("c1", 160, 118, "9 + 5 = 14 → 10 + 4", 8.4, W.merah, { anchor: "start" })),
      tambah(idx(SUARA_E4, "puluh"), teks("c2", 160, 134, "80 + 40 = 120 → 100 + 20", 8.4, W.hijau, { anchor: "start" })),
      sorotkan("Sembilan", "b4"),
    ),
    k(
      SUARA_E5,
      tambah(0, ln("b5", 112, "= 300 + (100 + 20) + (10 + 4)", 14, 8.4)),
      tambah("dikelompokkan", ln("b6", 126, "= (300 + 100) + (20 + 10) + 4", 14, 8.4)),
      sorotkan(0, "c1", "c2"),
    ),
    k(
      SUARA_E6,
      tambah("Hasilnya", ln("b7", 142, "= 400 + 30 + 4", 14)),
      tambah(idx(SUARA_E6, "yaitu"), ln("b8", 156, "= 434", 14, 9.6, { warna: W.merah })),
      tambah("Jadi", ...kartu("kh", 150, 160, 136, 32, W.emas, ["434 jeruk"], 10)),
    ),
  ],
};

/* ------------------------------ 6. Dua keranjang jeruk: susun pendek dengan menyimpan (Buku Siswa hlm. 31) ------------------------------ */
const SUARA_F1 = "Sekarang cara susun pendek dengan menyimpan. Tulis seratus delapan puluh sembilan dan dua ratus empat puluh lima bersusun, lalu jumlahkan sesuai nilai tempat.";
const SUARA_F2 = "Satuan: sembilan ditambah lima sama dengan empat belas. Letakkan empat pada satuan, dan satu di atas nilai tempat puluhan.";
const SUARA_F3 = "Puluhan: satu ditambah delapan ditambah empat sama dengan tiga belas. Letakkan tiga pada puluhan, dan satu di atas nilai tempat ratusan.";
const SUARA_F4 = "Ratusan: satu ditambah satu ditambah dua sama dengan empat. Letakkan empat pada ratusan. Hasilnya empat ratus tiga puluh empat, sama dengan cara susun panjang.";

export const ADEGAN_SIMPAN_PENDEK: AdeganStory = {
  id: "simpan-pendek",
  judul: "Dua keranjang jeruk: susun pendek dengan menyimpan",
  sumber: "Materi: susun pendek dengan menyimpan",
  latar: "#F0F9FF",
  kutipan: [
    "Penjumlahan cara susun pendek dengan menyimpan",
    "Cara bersusun pendek :",
    "1. Jumlahkan masing-masing bilangan sesuai nilai",
    "2. 9 + 5 = 14, letakkan 4 pada nilai tempat satuan,",
    "dan 1 diatas nilai tempat puluhan.",
    "3. 1 + 8 + 4 = 13, letakkan 3 pada puluhan dan 1",
    "diatas nilai tempat ratusan.",
    "4. 1 + 1 + 2 = 4, letakkan 4 pada ratusan",
  ],
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, judul("Susun pendek dengan menyimpan")),
      tambah("Tulis", ...susunAwal("sp", 14, 44, CONTOH.jeruk), teks("spl", 214, 56, "189 + 245", 9.6, W.hitam)),
      tambah("jumlahkan", ...kartu("sn", 14, 140, 272, 34, W.krem, ["jumlahkan sesuai nilai tempat,", "dari satuan ke kiri"], 8.8)),
    ),
    k(
      SUARA_F2,
      hapus(0, "sn-k", "sn-t0", "sn-t1"),
      tambah("Satuan:", susunLangkah("sp", 14, 44, CONTOH.jeruk, 2).label, susunLangkah("sp", 14, 44, CONTOH.jeruk, 2).eq),
      tambah(idx(SUARA_F2, "empat", 2), susunLangkah("sp", 14, 44, CONTOH.jeruk, 2).hasil),
      tambah(idx(SUARA_F2, "satu"), simpanSel("sp", 14, 44, 1, "1")),
    ),
    k(
      SUARA_F3,
      tambah("Puluhan:", susunLangkah("sp", 14, 44, CONTOH.jeruk, 1).label, susunLangkah("sp", 14, 44, CONTOH.jeruk, 1).eq),
      tambah(idx(SUARA_F3, "tiga", 2), susunLangkah("sp", 14, 44, CONTOH.jeruk, 1).hasil),
      tambah(idx(SUARA_F3, "satu", 2), simpanSel("sp", 14, 44, 0, "1")),
    ),
    k(
      SUARA_F4,
      tambah("Ratusan:", susunLangkah("sp", 14, 44, CONTOH.jeruk, 0).label, susunLangkah("sp", 14, 44, CONTOH.jeruk, 0).eq),
      tambah(idx(SUARA_F4, "empat", 2), susunLangkah("sp", 14, 44, CONTOH.jeruk, 0).hasil),
      tambah("Hasilnya", ...kartu("sh", 150, 140, 136, 40, W.emas, ["hasil 434", "sama dengan cara panjang"], 8.4)),
    ),
  ],
};
