import type { AdeganStory, Obj } from "./logika-story";
import { PETAK_TAMU, W, emo, judul, kartu, kisi, kotak, petakPenuh, poligon, sel, teks } from "./k5b5a-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k5b5a-bantu";

/* ------------------------------ 5. Benar atau salah dan pengertian luas (hlm. 136 dan 137; Panduan Guru hlm. 186 sampai 188) ------------------------------ */
const pernyataan = (id: string, y: number, warna: string, a: string, b: string): Obj[] => kartu(id, 12, y, 232, 34, warna, [a, b], 8.4);
const lencana = (id: string, y: number, benar: boolean): Obj[] => [
  teks(id, 274, y, benar ? "Benar" : "Salah", 9.4, benar ? W.hijau : W.merah),
  emo(`${id}-e`, 274, y + 18, benar ? "✅" : "❌", 14),
];

export const ADEGAN_BENAR_SALAH: AdeganStory = {
  id: "benar-salah",
  judul: "Benar atau salah, lalu pengertian luas",
  sumber: "Buku Siswa hlm. 136–137; Panduan Guru hlm. 186–188",
  latar: "#F0FDF4",
  kutipan: [
    "Selanjutnya, tentukan benar atau salah terhadap pernyataan",
    "Makin besar ruangan, makin luas lantainya.",
    "Makin luas lantainya, makin banyak ubin yang",
    "Jika lantai di dua ruangan sama luasnya,",
    "Luas daerah bangun datar adalah ukuran yang",
    "menunjukkan besar kecilnya daerah yang dibatasi",
    "satuan luas.",
    "Untuk membandingkan luas daerah satu",
    "menggunakan kertas origami yang berukuran",
  ],
  ketukan: [
    k(
      "Sekarang tentukan benar atau salah. Pernyataan pertama: makin besar ruangan, makin luas lantainya. Kuncinya benar. Pernyataan kedua: makin luas lantai, makin banyak ubin. Kuncinya juga benar.",
      tambah(0, judul("Benar atau salah?")),
      tambah("pertama:", pernyataan("c1", 36, W.langit, "Makin besar ruangan,", "makin luas lantainya.")),
      tambah("Kuncinya", lencana("b1", 50, true)),
      tambah("kedua:", pernyataan("c2", 80, W.hijauMuda, "Makin luas lantai, makin banyak", "ubin yang dibutuhkan.")),
      tambah("Kuncinya@2", lencana("b2", 94, true)),
    ),
    k(
      "Pernyataan ketiga: jika dua lantai sama luasnya, banyak ubinnya tidak sama. Ini salah. Lantai yang sama luas membutuhkan ubin yang sama banyak.",
      tambah("ketiga:", pernyataan("c3", 124, W.krem, "Dua lantai sama luas, ubinnya", "tidak sama banyak.")),
      tambah("salah.", lencana("b3", 138, false)),
      tambah("Lantai", teks("cat", 150, 186, "sama luas → ubin sama banyak", 9.4, W.biru)),
    ),
    k(
      "Dari semua itu, luas daerah bangun datar adalah ukuran yang menunjukkan besar kecilnya daerah yang dibatasi oleh bangun datar. Satuan yang digunakan adalah satuan luas.",
      bersih(0),
      tambah(0, judul("Pengertian luas daerah")),
      tambah("daerah@1", poligon("bd", 20, 44, [[0, 0], [70, 0], [70, 56], [0, 56]], W.emas)),
      tambah("batas", teks("bt", 55, 116, "batas bangun", 8.6, W.merah)),
      tambah("dibatasi", teks("dr", 55, 78, "daerah", 10, W.biru)),
      tambah("ukuran", ...kartu("df", 120, 46, 168, 62, W.langit, ["luas daerah =", "ukuran besar kecilnya", "daerah yang dibatasi"], 8.6)),
      tambah("Satuan", ...kartu("st", 120, 124, 168, 30, W.hijauMuda, ["satuannya: satuan luas"], 9)),
    ),
    k(
      "Panduan guru memberi petunjuk. Jawaban kalian boleh memakai kata sendiri, asalkan mendekati kata kunci: ukuran, besar kecil, area, dan daerah bangun datar.",
      bersih(0),
      tambah(0, judul("Kata kunci jawaban")),
      tambah("ukuran,", ...kartu("w1", 14, 40, 128, 30, W.krem, ["ukuran"], 9.4)),
      tambah("kecil,", ...kartu("w2", 158, 40, 128, 30, W.langit, ["besar kecil"], 9.4)),
      tambah("area,", ...kartu("w3", 14, 84, 128, 30, W.hijauMuda, ["area"], 9.4)),
      tambah("daerah", ...kartu("w4", 158, 84, 128, 30, W.pink, ["daerah bangun datar"], 9)),
      tambah("sendiri,", emo("ml", 150, 150, "💬", 30)),
    ),
    k(
      "Untuk membandingkan luas, guru boleh memakai kertas origami seukuran ruangan pada denah. Lalu muncul pertanyaan besar: bagaimana cara menghitung luas daerah itu?",
      bersih(0),
      tambah(0, judul("Bagaimana cara menghitungnya?")),
      tambah("origami", kotak("o1", 40, 50, 60, 60, W.merahMuda, W.biru, { rx: 0 }), kotak("o2", 112, 50, 40, 40, W.langit, W.biru, { rx: 0 }), kotak("o3", 164, 50, 60, 40, W.hijauMuda, W.biru, { rx: 0 })),
      tambah("denah.", teks("od", 150, 130, "kertas seukuran ruangan", 9, W.coklat)),
      tambah("pertanyaan", teks("qq", 150, 176, "?", 40, W.merah)),
    ),
  ],
};

/* ------------------------------ 6. Eksplorasi 5.1C: satuan luas (hlm. 137 dan 138; Panduan Guru hlm. 188 sampai 190) ------------------------------ */
export const ADEGAN_SATUAN: AdeganStory = {
  id: "satuan-luas",
  judul: "Eksplorasi 5.1C: mengenal satuan luas",
  sumber: "Buku Siswa hlm. 137–138; Panduan Guru hlm. 188–190",
  latar: "#FFFBEB",
  kutipan: [
    "Eksplorasi 5.1C",
    "Sediakan kertas berpetak besar",
    "Guntinglah sebanyak mungkin",
    "Satu kotak satuan tersebut kita",
    "namakan dengan 1 satuan luas.",
    "1 persegi satuan mewakili 1 cm2,",
    "1 persegi satuan mewakili 1 m2,",
    "dibaca satu sentimeter persegi.",
    "dibaca satu meter persegi.",
  ],
  ketukan: [
    k(
      "Eksplorasi lima titik satu C, Ayo Mengenal Satuan Luas. Siapkan kertas berpetak. Tiap kotaknya berukuran panjang satu sentimeter dan lebar satu sentimeter. Kalau tidak ada, gambar sendiri di kertas kosong.",
      tambah(0, judul("Eksplorasi 5.1C")),
      tambah("kertas", ...petakPenuh("kp", 60, 40, 6, 5, 18, W.putih), kisi("kk", 60, 40, 6, 5, 18, W.biru)),
      tambah("panjang", teks("pj", 114, 150, "panjang 1 cm", 8.8, W.merah)),
      tambah("lebar", teks("lb", 114, 164, "lebar 1 cm", 8.8, W.hijau)),
      tambah("gambar", teks("gs", 150, 188, "atau gambar sendiri di kertas kosong", 8.6, W.coklat)),
    ),
    k(
      "Guntinglah sebanyak mungkin kotak satuan dari kertas itu. Pastikan semua persegi sama besar, supaya hitungan nanti adil.",
      ubah("Guntinglah", ...Array.from({ length: 6 }, (_, c) => ({ id: `kp-0-${c}`, warna: W.emas }))),
      tambah("Guntinglah", emo("gt", 40, 86, "✂", 22)),
      ubah("sebanyak", ...Array.from({ length: 6 }, (_, c) => ({ id: `kp-1-${c}`, warna: W.emas }))),
      ubah("persegi", ...Array.from({ length: 6 }, (_, c) => ({ id: `kp-2-${c}`, warna: W.emas }))),
      tambah("adil.", teks("sm", 232, 100, "semua sama besar", 8.8, W.hijau)),
    ),
    k(
      "Setiap kotak satuan berbentuk persegi. Panjang dan lebarnya sama, yaitu satu satuan. Satu kotak satuan itu kita namakan satu satuan luas. Daerah di dalamnya yang diwarnai, bukan tepinya.",
      bersih(0),
      tambah(0, judul("Satu satuan luas")),
      tambah("persegi.", sel("sq", 100, 60, 80, W.emas, { tebal: 2 })),
      tambah("Panjang", teks("l1", 140, 52, "1 satuan", 9, W.merah)),
      tambah("lebarnya", teks("l2", 240, 106, "1 satuan", 9, W.hijau)),
      tambah("namakan", ...kartu("ns", 60, 156, 180, 30, W.krem, ["1 kotak satuan = 1 satuan luas"], 8.6)),
      tambah("diwarnai,", teks("wr", 140, 112, "isi berwarna", 8.6, W.biru)),
    ),
    k(
      "Jika memakai satuan baku, dengan panjang dan lebar persegi satuan masing-masing satu sentimeter, maka satu persegi satuan mewakili satu sentimeter persegi.",
      bersih(0),
      tambah(0, judul("Satuan baku: sentimeter persegi")),
      tambah("sentimeter", sel("s1", 110, 56, 44, W.emas, { tebal: 2 }), teks("c1", 132, 118, "1 cm", 9.4, W.merah), teks("c2", 174, 82, "1 cm", 9.4, W.hijau)),
      tambah("mewakili", ...kartu("sa", 60, 136, 180, 28, W.hijauMuda, ["1 persegi satuan = 1 cm²"], 9)),
      tambah("persegi@3", teks("bc", 150, 184, "dibaca satu sentimeter persegi", 9, W.ungu)),
    ),
    k(
      "Jika panjang dan lebarnya masing-masing satu meter, maka satu persegi satuan mewakili satu meter persegi. Itulah ukuran satu ubin pada denah rumah tadi.",
      bersih(0),
      tambah(0, judul("Satuan baku: meter persegi")),
      tambah("meter", sel("s2", 100, 46, 74, W.emas, { tebal: 2 }), teks("m1", 137, 130, "1 m", 9.4, W.merah), teks("m2", 196, 88, "1 m", 9.4, W.hijau)),
      tambah("mewakili", ...kartu("sb", 50, 142, 200, 28, W.hijauMuda, ["1 persegi satuan = 1 m²"], 9)),
      tambah("ubin", emo("ub", 252, 60, "🧱", 26)),
      tambah("rumah", teks("bm", 150, 188, "dibaca satu meter persegi", 9, W.ungu)),
    ),
  ],
};

/* ------------------------------ 7. Eksplorasi 5.1D (1): luas ruang tamu (hlm. 139 dan 140; Panduan Guru hlm. 190 sampai 193) ------------------------------ */
const SU = 18;
const TX = 60;
const TY = 44;
const barisTamu = (r: number, warna: string): Obj[] => PETAK_TAMU.filter(([, rr]) => rr === r).map(([c]) => sel(`tm-${r}-${c}`, TX + c * SU, TY + r * SU, SU, warna));
const kerangkaTamu = (): Obj[] => [
  poligon("tmo", TX, TY, [[0, 0], [SU, 0], [SU, SU], [3 * SU, SU], [3 * SU, 5 * SU], [0, 5 * SU]], "none", W.biru, { tebal: 2.2 }),
  kotak("km", TX + SU, TY, 2 * SU, SU, W.pink, W.biru, { rx: 0, tebal: 1.4 }),
];
const ukuranTamu = (): Obj[] => [
  teks("d3", TX + 1.5 * SU, TY + 5 * SU + 12, "3 m", 8.6, W.merah),
  teks("d4", TX - 12, TY + 3 * SU, "4 m", 8.6, W.hijau),
  teks("d2", TX + 2 * SU, TY - 5, "2 m", 8.6, W.ungu),
  teks("d1", TX + 3 * SU + 12, TY + 10, "1 m", 8.6, W.ungu),
];

export const ADEGAN_TAMU: AdeganStory = {
  id: "ukur-ruang-tamu",
  judul: "Eksplorasi 5.1D: menghitung luas ruang tamu",
  sumber: "Buku Siswa hlm. 139–140; Panduan Guru hlm. 190–193",
  latar: "#FDF2F8",
  kutipan: [
    "Eksplorasi 5.1D",
    "Ubin yang akan dipasang berukuran panjang 1 m dan lebar 1 m.",
    "Satu kotak satuan dapat kita anggap mewakili 1 ubin, yaitu 1 m2.",
    "Jadi, luas lantai akan sama dengan banyaknya ubin yang",
    "Tempelkan kotak-kotak satuan",
    "Jadi, luas ruang tamu adalah",
    "Gambarlah kotak-kotak berbentuk",
  ],
  ketukan: [
    k(
      "Eksplorasi lima titik satu D. Ubin yang dipasang berukuran panjang satu meter dan lebar satu meter. Satu kotak satuan mewakili satu ubin, yaitu satu meter persegi. Jadi luas lantai sama dengan banyaknya ubin.",
      tambah(0, judul("Eksplorasi 5.1D")),
      tambah("Ubin", kotak("ub", 40, 50, 50, 50, W.kayu, W.coklat, { rx: 0, tebal: 2 }), teks("ubt", 65, 116, "1 ubin", 9, W.coklat)),
      tambah("kotak", sel("ks", 130, 50, 50, W.emas, { tebal: 2 }), teks("kst", 155, 116, "1 kotak satuan", 8.6, W.biru), teks("sm1", 110, 80, "=", 20, W.merah)),
      tambah("persegi.", teks("mm", 232, 80, "1 m²", 13, W.hijau), teks("sm2", 200, 80, "=", 20, W.merah)),
      tambah("sama", ...kartu("lt", 30, 142, 240, 34, W.krem, ["luas lantai = banyaknya ubin"], 9.4)),
    ),
    k(
      "Kita mulai dari ruang tamu. Panduan guru menegaskan, persegi panjang adalah bentuk ruang tamu bersama kamar mandi. Jadi lantai ruang tamu sendiri tidak berbentuk persegi panjang penuh.",
      bersih(0),
      tambah(0, judul("Denah ruang tamu")),
      tambah("tamu.", ...kerangkaTamu(), teks("rt", TX + 27, TY + 56, "R. Tamu", 8.4, W.biru), teks("kmt", TX + 36 + 18 - 18, TY + 12, "KM", 7.2, W.biru)),
      tambah("persegi@1", ...ukuranTamu()),
      tambah("penuh.", ...kartu("kt", 150, 60, 138, 46, W.krem, ["lantai ruang tamu", "tidak persegi panjang", "penuh"], 8.4)),
    ),
    k(
      "Tempelkan kotak satuan sampai menutup rapat seluruh denah ruang tamu. Baris pertama hanya satu kotak. Empat baris di bawahnya masing-masing tiga kotak.",
      ...[0, 1, 2, 3, 4].map((r) => tambah(["pertama", "Empat", "bawahnya", "masing-masing", "tiga"][r], barisTamu(r, [W.emas, W.hijauMuda, W.langit, W.hijauMuda, W.langit][r]))),
    ),
    k(
      "Ada berapa kotak satuan yang menutup seluruhnya? Satu kotak di baris atas ditambah dua belas kotak di bawahnya, jadi tiga belas kotak. Luas ruang tamu tiga belas meter persegi, dan ubin yang dibutuhkan tiga belas buah.",
      hapus(0, "kt-k", "kt-t0", "kt-t1", "kt-t2"),
      tambah("ditambah", ...kartu("hb", 150, 44, 138, 28, W.krem, ["1 + 12 = 13 kotak"], 9.4)),
      tambah("Luas", ...kartu("hl", 150, 82, 138, 28, W.hijauMuda, ["Luas = 13 m²"], 9.4)),
      tambah("ubin", ...kartu("hu", 150, 120, 138, 28, W.pink, ["Ubin = 13 buah"], 9.4)),
    ),
    k(
      "Cara kedua: gambar kotak satu sentimeter kali satu sentimeter langsung pada denah, lalu hitung. Hasilnya tiga belas kotak, sama dengan cara pertama.",
      ubah(0, ...PETAK_TAMU.map(([c, r]) => ({ id: `tm-${r}-${c}`, warna: W.putih }))),
      tambah("hitung.", ...PETAK_TAMU.map(([c, r], i) => teks(`nm${i}`, TX + c * SU + SU / 2, TY + r * SU + SU / 2 + 3, String(i + 1), 7.4, W.biru))),
      tambah("sama", teks("ok", 220, 168, "sama: 13 m²", 10, W.hijau)),
    ),
  ],
};

/* ------------------------------ 8. Eksplorasi 5.1D (2): kamar tidur, dapur, kamar mandi, dan total (hlm. 140 dan 141; Panduan Guru hlm. 192 sampai 194) ------------------------------ */
const ruang = (id: string, x: number, y: number, kol: number, baris: number, s: number, warna: string): Obj[] => [...petakPenuh(id, x, y, kol, baris, s, warna), kisi(`${id}-ks`, x, y, kol, baris, s, W.biru)];

export const ADEGAN_KAMAR: AdeganStory = {
  id: "ukur-kamar-dapur",
  judul: "Eksplorasi 5.1D: kamar tidur, dapur, kamar mandi, dan total luas",
  sumber: "Buku Siswa hlm. 140–141; Panduan Guru hlm. 192–194",
  latar: "#F0FDFA",
  kutipan: [
    "Ada berapa kamar tidur?",
    "Berbentuk apakah kamar tidur",
    "Apakah ukuran keduanya sama?",
    "Luas kedua kamar tidur tersebut",
    "Berapa luas dapur?",
    "Berapa luas kamar mandi?",
    "Total luas lantai rumah",
    "Berapa total luas lantai rumah",
  ],
  ketukan: [
    k(
      "Sekarang kamar tidur. Ada dua kamar tidur, berbentuk persegi, dan ukurannya sama. Tempelkan kotak satuan sampai menutup rapat satu kamar tidur.",
      tambah(0, judul("Kamar tidur")),
      tambah("kamar", kotak("kt1", 40, 50, 54, 54, W.langit, W.biru, { rx: 0 }), teks("kt1t", 67, 120, "Tidur 1", 8.4, W.biru)),
      tambah("dua", kotak("kt2", 120, 50, 54, 54, W.langit, W.biru, { rx: 0 }), teks("kt2t", 147, 120, "Tidur 2", 8.4, W.biru)),
      tambah("Tempelkan", ...ruang("kb", 200, 50, 3, 3, 18, W.emas)),
      tambah("rapat", teks("kbt", 227, 120, "3 m × 3 m", 8.4, W.merah)),
    ),
    k(
      "Satu kamar tidur membutuhkan sembilan kotak satuan. Karena ada dua kamar, luasnya dua kali sembilan, yaitu delapan belas meter persegi, atau delapan belas ubin.",
      bersih(0),
      tambah(0, judul("Dua kamar tidur")),
      tambah("sembilan", ...ruang("ka", 50, 44, 3, 3, 18, W.emas), ...ruang("kb", 190, 44, 3, 3, 18, W.emas), teks("n9", 77, 114, "9 kotak", 9.4, W.biru), teks("n9b", 217, 114, "9 kotak", 9.4, W.biru)),
      tambah("luasnya", ...kartu("lk", 40, 134, 220, 28, W.krem, ["2 × 9 = 18"], 10)),
      tambah("delapan@1", teks("m18", 110, 182, "18 m²", 11, W.hijau)),
      tambah("ubin", teks("u18", 190, 182, "18 ubin", 11, W.merah)),
    ),
    k(
      "Cara kedua: gambar kotak satuan pada denah kamar tidur dan hitung kotaknya. Tetap sembilan kotak. Hasilnya sama dengan cara pertama.",
      bersih(0),
      tambah(0, judul("Cara kedua: hitung kotak")),
      tambah("gambar", ...petakPenuh("cb", 96, 40, 3, 3, 30, W.putih), kisi("cbk", 96, 40, 3, 3, 30, W.biru)),
      tambah("hitung", ...Array.from({ length: 9 }, (_, i) => teks(`cn${i}`, 96 + (i % 3) * 30 + 15, 40 + Math.floor(i / 3) * 30 + 19, String(i + 1), 9, W.biru))),
      tambah("sembilan", teks("c9", 150, 152, "9 kotak", 12, W.hijau)),
      tambah("sama", teks("cs", 150, 180, "sama dengan cara pertama", 9.4, W.ungu)),
    ),
    k(
      "Dengan cara yang sama, dapur memiliki enam kotak, jadi luasnya enam meter persegi dan perlu enam ubin. Kamar mandi memiliki dua kotak, jadi luasnya dua meter persegi dan perlu dua ubin.",
      bersih(0),
      tambah(0, judul("Dapur dan kamar mandi")),
      tambah("dapur", ...ruang("dp", 34, 50, 3, 2, 22, W.krem), teks("dpt", 67, 124, "Dapur 3 m × 2 m", 8.4, W.biru)),
      tambah("enam", teks("dp6", 67, 146, "6 kotak = 6 m²", 9, W.hijau), teks("dpu", 67, 162, "6 ubin", 9, W.merah)),
      tambah("Kamar", ...ruang("km", 190, 50, 2, 1, 22, W.pink), teks("kmt", 212, 100, "KM 2 m × 1 m", 8.4, W.biru)),
      tambah("dua@1", teks("km2", 212, 146, "2 kotak = 2 m²", 9, W.hijau), teks("kmu", 212, 162, "2 ubin", 9, W.merah)),
    ),
    k(
      "Terakhir, total luas lantai rumah: tiga belas ditambah delapan belas ditambah enam ditambah dua. Hasilnya tiga puluh sembilan meter persegi, sehingga ubin yang diperlukan tiga puluh sembilan buah.",
      bersih(0),
      tambah(0, judul("Total luas lantai rumah")),
      ...[["tiga@1", "tm", "R. Tamu", "13", W.langit], ["delapan", "td", "2 kamar", "18", W.hijauMuda], ["enam", "tp", "Dapur", "6", W.krem], ["dua", "tk", "KM", "2", W.pink]].map(([tr, id, nm, n, w], i) => tambah(tr, ...kartu(id as string, 14 + i * 70, 40, 64, 44, w as string, [nm as string, `${n} m²`], 8.6))),
      tambah("Hasilnya", ...kartu("tt", 40, 100, 220, 30, W.emas, ["13 + 18 + 6 + 2 = 39"], 10.4)),
      tambah("ubin", teks("t39", 150, 160, "39 m² = 39 ubin", 12, W.hijau)),
    ),
    k(
      "Guru menekankan hubungan luas lantai dan ubin. Luas lantai bisa dinyatakan dengan banyaknya ubin, atau dengan satuan baku meter persegi. Keduanya menunjukkan hal yang sama.",
      bersih(0),
      tambah(0, judul("Dua cara menyatakan luas")),
      tambah("banyaknya", ...kartu("w1", 14, 44, 122, 50, W.krem, ["banyaknya ubin", "39 buah"], 9.4)),
      tambah("satuan", ...kartu("w2", 164, 44, 122, 50, W.langit, ["satuan baku", "39 m²"], 9.4)),
      tambah("Keduanya", teks("eq", 150, 74, "=", 26, W.merah), emo("ok", 150, 140, "✅", 30)),
    ),
  ],
};

