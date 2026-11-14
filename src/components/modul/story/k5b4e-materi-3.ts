import type { AdeganStory, Obj } from "./logika-story";
import { MISKON1, MISKON2, PENGAYAAN, PENGAYAAN_HURUF, UK1, UK3, UK4, UK4_DALAM, UK5, W, denahRuang, denahTepi, emo, jalur, judul, kartu, kotak, poligon, skala, tabel, teks, garis } from "./k5b4e-gambar";
import type { Titik } from "./k5b4e-gambar";
import { bersih, hapus, k, tambah } from "./k5b4e-bantu";

/* ------------------------------ Penyingkat gambar ------------------------------ */
const px = (ox: number, oy: number, s: number, p: Titik): Titik => [ox + p[0] * s, oy + p[1] * s];
/** Bentuk dari titik cm atau meter, pojok asal (ox, oy), s piksel per satuan. */
const bentuk = (id: string, ox: number, oy: number, s: number, p: Titik[], warna: string, o: Partial<Obj> = {}): Obj => poligon(id, ox, oy, skala(p, s), warna, W.biru, { tebal: 2, ...o });
/** Bingkai putus-putus persegi panjang w kali h satuan dari (x1, y1) dalam satuan. */
const bingkai = (id: string, ox: number, oy: number, s: number, x1: number, y1: number, w: number, h: number, o: Partial<Obj> = {}): Obj => kotak(id, ox + x1 * s, oy + y1 * s, w * s, h * s, "none", W.hijau, { rx: 0, tebal: 1.5, putus: true, ...o });
/** Teks panjang sisi di dekat titik tengah dua titik, digeser (dx, dy) piksel. */
const lbl = (id: string, ox: number, oy: number, s: number, a: Titik, b: Titik, isi: string, dx: number, dy: number, u = 7.6, warna: string = W.biru): Obj => teks(id, ox + ((a[0] + b[0]) / 2) * s + dx, oy + ((a[1] + b[1]) / 2) * s + dy + 2, isi, u, warna);
/** Garis tebal dari titik ke titik (satuan). */
const gs = (id: string, ox: number, oy: number, s: number, a: Titik, b: Titik, warna: string = W.merah, tebal = 3.6, o: Partial<Obj> = {}): Obj => {
  const [x1, y1] = px(ox, oy, s, a);
  const [x2, y2] = px(ox, oy, s, b);
  return garis(id, x1, y1, x2 - x1, y2 - y1, warna, tebal, { z: 6, ...o });
};
/** Satu baris teks panel kanan, pusat x = 234. */
const PX = 234;
const baris = (id: string, y: number, isi: string, u = 9.6, warna: string = W.biru): Obj => teks(id, PX, y, isi, u, warna);

/* ------------------------------ 8. Miskonsepsi pertama (Panduan Guru hlm. 165 sampai 166) ------------------------------ */
const LX = 22;
const LY = 36;
const LS = 11;

export const ADEGAN_MISKON_1: AdeganStory = {
  id: "miskonsepsi-1",
  judul: "Miskonsepsi 1: menjumlahkan keliling bangun penyusun",
  sumber: "Panduan Guru hlm. 165–166",
  latar: "#FEF2F2",
  kutipan: [
    "Peserta didik keliru memahami bahwa keliling bangun gabungan adalah",
    "jumlahan keliling bangun-bangun datar penyusunnya.",
    "bahwa keliling sejatinya hanya menghitung panjang tepiannya saja.",
    "luas daerah bangun gabungan diperoleh dengan lebih mudah,",
    "yaitu menjumlahkan luas bangun-bangun datar penyusunnya.",
    "yaitu hanya menghitung jumlahan",
    "panjang sisi-sisi terluar (tepiannya) saja.",
  ],
  ketukan: [
    k(
      "Miskonsepsi pertama: peserta didik mengira keliling bangun gabungan adalah jumlah keliling bangun-bangun penyusunnya. Itu keliru, sebab keliling hanya menghitung panjang tepiannya saja.",
      tambah(0, judul("Miskonsepsi 1")),
      tambah(0, ...denahRuang("mk", LX, LY, LS)),
      tambah("jumlah", ...kartu("m1", 170, 44, 124, 54, W.merahMuda, ["jumlah keliling", "tiap bagian"], 9), emo("m1e", 232, 120, "❌", 26)),
      tambah("tepiannya", denahTepi("mkt", LX, LY, LS, W.merah, 2.4, { z: 5 })),
    ),
    k(
      "Coba hitung dari denah. Dapur enam belas, kamar mandi dua belas, ruang keluarga dua puluh empat, ruang tamu dua puluh, tiap kamar enam belas. Jumlahnya seratus empat, jauh dari empat puluh delapan.",
      hapus(0, "m1-k", "m1-t0", "m1-t1", "m1e"),
      tambah("dapur", teks("c1", PX, 52, "dapur 16", 8.4)),
      tambah("mandi", teks("c2", PX, 66, "kamar mandi 12", 8.4)),
      tambah("keluarga", teks("c3", PX, 80, "ruang keluarga 24", 8.4)),
      tambah("tamu", teks("c4", PX, 94, "ruang tamu 20", 8.4)),
      tambah("tiap", teks("c5", PX, 108, "dua kamar 16 + 16", 8.4)),
      tambah("Jumlahnya", teks("c6", PX, 128, "jumlah: 104", 11, W.merah), teks("c7", PX, 144, "keliling denah: 48", 9, W.hijau)),
      tambah("seratus", teks("c8", 150, 192, "16 + 12 + 24 + 20 + 16 + 16 = 104", 8.4, W.merah)),
    ),
    k(
      "Penyebabnya, peserta didik belajar luas bangun gabungan lebih dulu, yang diperoleh dengan menjumlahkan luas penyusunnya. Keliling tidak begitu.",
      hapus(0, "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8"),
      tambah("luas", ...kartu("p1", 170, 44, 124, 50, W.hijauMuda, ["luas: jumlahkan", "luas bagian"], 9), emo("p1e", 150, 70, "✅", 18)),
      tambah("keliling", ...kartu("p2", 170, 104, 124, 50, W.merahMuda, ["keliling: bukan", "jumlah bagian"], 9), emo("p2e", 150, 130, "❌", 18)),
    ),
    k(
      "Untuk mengantisipasi, guru mengingatkan konsep dasar keliling: hanya menghitung jumlah panjang sisi-sisi terluar, tepiannya saja.",
      hapus(0, "p1-k", "p1-t0", "p1-t1", "p2-k", "p2-t0", "p2-t1", "p1e", "p2e"),
      tambah("konsep", ...kartu("q1", 168, 56, 128, 70, W.krem, ["keliling =", "jumlah panjang", "sisi terluar"], 9.2)),
      tambah("tepiannya", emo("q1e", 232, 154, "✅", 28)),
    ),
  ],
};

/* ------------------------------ 9. Miskonsepsi kedua dan diferensiasi (Panduan Guru hlm. 166 sampai 167) ------------------------------ */
const MS = 6.5;
const M1X = 34;
const M1Y = 60;
const M2X = 36;
const M2Y = 40;
const M2H: Record<string, Titik> = { A: [0, 5], B: [12, 5], C: [9, 20], D: [12, 20], E: [18, 20], F: [9, 17], G: [12, 17] };
const hurufM2 = (id: string, h: string, dx: number, dy: number, warna: string = W.merah): Obj => {
  const [x, y] = px(M2X, M2Y, MS, M2H[h]);
  return teks(id, x + dx, y + dy + 2, h, 7, warna);
};

export const ADEGAN_MISKON_2: AdeganStory = {
  id: "miskonsepsi-2",
  judul: "Miskonsepsi 2: semua bangun dibungkus persegi besar",
  sumber: "Panduan Guru hlm. 166–167",
  latar: "#FFF7ED",
  kutipan: [
    "Karena sebagian peserta didik mungkin menyadari bahwa cara Komang",
    "peserta didik dimungkinkan menggeneralisasi bahwa semua bangun gabungan",
    "dapat dibuat persegi/persegi panjang besar yang melingkupi semua",
    "Keliling = 2 x (12 + 20) = 64.",
    "Jadi, kelilingnya 64 cm.",
    "Namun, sisi-sisi mendatar bangun",
    "gabungan tidak dapat disamakan",
    "dengan sisi bawah persegi panjang",
    "terluar karena ada bagian yang",
    "tumpang tindih ketika dijumlahkan,",
    "sehingga harus dicari satu per satu,",
    "AB = 18 – DE = 18 – (CE – CD)",
    "= 18 – 6 = 12 cm.",
    "FG = 3 cm.",
    "= 20 + 18 + 20 + (12 + 3 + 9)",
    "= 82.",
    "Keliling bangun gabungan di atas",
    "adalah 82 cm.",
    "menguraikan",
    "komponen-komponen bangun gabungan",
    "guru dapat memulainya dengan bangun gabungan sederhana, misalnya gabungan",
  ],
  ketukan: [
    k(
      "Miskonsepsi kedua: karena cara Komang lebih mudah, peserta didik mengira semua bangun gabungan bisa dibungkus persegi besar.",
      tambah(0, judul("Miskonsepsi 2")),
      tambah(0, bentuk("s1", M1X, M1Y, 7, MISKON1, W.jingga)),
      tambah("dibungkus", bingkai("b1", M1X, M1Y, 7, 0, 0, 20, 12)),
      tambah("Komang", teks("q", 232, 100, "semua", 12, W.merah), teks("q2", 232, 116, "bangun?", 12, W.merah)),
    ),
    k(
      "Pada bangun tangga ini cara Komang berhasil. Bingkainya dua puluh kali dua belas, jadi kelilingnya enam puluh empat sentimeter.",
      hapus(0, "q", "q2"),
      tambah("tangga", lbl("l20", M1X, M1Y, 7, [0, 0], [20, 0], "20 cm", 0, -8, 8.4, W.hijau), lbl("l12", M1X, M1Y, 7, [0, 0], [0, 12], "12 cm", -16, 0, 8.4, W.hijau)),
      tambah("kelilingnya", teks("e1", 150, 168, "2 × (12 + 20) = 64 cm", 12, W.hijau)),
    ),
    k(
      "Bangun kedua: sisi kiri aman disamakan dengan sisi kiri bingkai, yaitu dua puluh, karena jumlah sisi-sisi kirinya sama.",
      bersih(0),
      tambah(0, judul("Bangun kedua")),
      tambah(0, bentuk("s2", M2X, M2Y, MS, MISKON2, W.jingga)),
      tambah("bangun", bingkai("b2", M2X, M2Y, MS, 0, 0, 18, 20)),
      tambah("kiri", gs("kiri1", M2X, M2Y, MS, [0, 0], [0, 5], W.biru), gs("kiri2", M2X, M2Y, MS, [12, 5], [12, 17], W.biru), gs("kiri3", M2X, M2Y, MS, [9, 17], [9, 20], W.biru)),
      tambah("sama", lbl("a20", M2X, M2Y, MS, [0, 0], [0, 20], "20 cm", -17, 0, 8.4, W.biru), baris("r1", 60, "kiri: 20 cm", 10, W.biru)),
    ),
    k(
      "Namun sisi mendatar tidak bisa disamakan dengan sisi bawah bingkai, karena ada bagian yang tumpang tindih. Sisi mendatarnya dicari satu per satu: A B, F G, dan C E.",
      tambah("Namun", ...["A", "B", "C", "D", "E", "F", "G"].map((h) => hurufM2(`h${h}`, h, h === "A" ? -6 : h === "B" ? 6 : h === "C" || h === "F" ? -6 : h === "E" ? 6 : 0, h === "A" || h === "B" ? -3 : h === "C" || h === "D" || h === "E" ? 7 : 0))),
      tambah("tumpang", baris("r2", 78, "mendatar:", 9.6, W.merah)),
      tambah("satu", gs("hAB", M2X, M2Y, MS, [0, 5], [12, 5], W.merah), baris("r3", 94, "AB, FG, CE", 11, W.merah)),
    ),
    k(
      "A B sama dengan delapan belas dikurangi D E, yaitu delapan belas dikurangi enam, jadi dua belas. F G tiga sentimeter dan C E sembilan sentimeter.",
      hapus(0, "r1", "r2", "r3", "kiri1", "kiri2", "kiri3", "a20"),
      tambah("sama", lbl("lAB", M2X, M2Y, MS, [0, 5], [12, 5], "12 cm", 0, 10, 8, W.merah), baris("r4", 66, "AB = 18 − DE", 9.6)),
      tambah("yaitu", baris("r5", 82, "AB = 18 − 6 = 12 cm", 9.6)),
      tambah("tiga", gs("hFG", M2X, M2Y, MS, [9, 17], [12, 17], W.merah), lbl("lFG", M2X, M2Y, MS, [9, 17], [12, 17], "3", 0, -6, 8, W.merah), baris("r6", 100, "FG = 3 cm", 9.6)),
      tambah("sembilan", gs("hCE", M2X, M2Y, MS, [9, 20], [18, 20], W.merah), lbl("lCE", M2X, M2Y, MS, [9, 20], [18, 20], "9", 0, 11, 8, W.merah), baris("r7", 118, "CE = 9 cm", 9.6)),
    ),
    k(
      "Keliling sama dengan sisi kiri, atas, kanan, dan bawah: dua puluh, delapan belas, dua puluh, dan dua belas, tiga, sembilan. Hasilnya delapan puluh dua sentimeter.",
      hapus(0, "r4", "r5", "r6", "r7"),
      tambah("Keliling", baris("r8", 62, "kiri + atas + kanan + bawah", 8, W.coklat)),
      tambah("dua@2", teks("r9", 226, 80, "20 + 18 + 20 + (12 + 3 + 9) = 82", 7.6, W.biru)),
      tambah("Hasilnya", baris("r10", 104, "82 cm", 16, W.hijau)),
    ),
    k(
      "Catatan guru: gambar buku menulis dua puluh di sisi atas, dan teks menulis C E sepuluh, padahal hitungan memakai delapan belas dan sembilan. Hasil delapan puluh dua cocok dengan hitungan itu.",
      hapus(0, "r8", "r9", "r10", "hAB", "hFG", "hCE", "lAB", "lFG", "lCE"),
      tambah("Catatan", emo("w", PX, 46, "⚠", 20), baris("w1", 70, "gambar buku: atas 20", 8.6, W.coklat)),
      tambah("hitungan", baris("w2", 84, "hitungan buku: atas 18", 8.6, W.hijau)),
      tambah("teks", baris("w3", 108, "teks buku: CE = 10", 8.6, W.coklat), baris("w4", 122, "hitungan buku: CE = 9", 8.6, W.hijau)),
    ),
    k(
      "Pelajarannya, cara bingkai aman bila sisi yang disamakan tidak tumpang tindih. Bingkai saja memberi tujuh puluh enam, kurang dari delapan puluh dua.",
      hapus(0, "w", "w1", "w2", "w3", "w4"),
      tambah("Bingkai", baris("x1", 62, "bingkai saja:", 9, W.merah), baris("x2", 78, "2 × (18 + 20) = 76", 10, W.merah)),
      tambah("kurang", baris("x3", 100, "keliling sebenarnya: 82", 9, W.hijau)),
    ),
    k(
      "Diferensiasi: Sub-Bab E melatih berpikir tingkat tinggi, yaitu menguraikan bangun gabungan, C empat, dan menciptakan bangun baru, C enam. Bila belum siap, mulai dari persegi panjang dan persegi.",
      bersih(0),
      tambah(0, judul("Diferensiasi")),
      tambah("menguraikan", ...kartu("y1", 20, 40, 260, 38, W.langit, ["menguraikan bangun gabungan (C4)"], 9.4)),
      tambah("menciptakan", ...kartu("y2", 20, 88, 260, 38, W.hijauMuda, ["menciptakan bangun baru (C6)"], 9.4)),
      tambah("mulai", ...kartu("y3", 20, 136, 260, 40, W.krem, ["belum siap: mulai dari", "persegi panjang dan persegi"], 9)),
    ),
  ],
};

/* ------------------------------ 10. Uji Kompetensi nomor 1 sampai 3 (Buku Siswa hlm. 130; Panduan Guru hlm. 168) ------------------------------ */
export const ADEGAN_UK_1: AdeganStory = {
  id: "uji-kompetensi-1",
  judul: "Uji Kompetensi nomor 1 sampai 3",
  sumber: "Buku Siswa hlm. 130; Panduan Guru hlm. 168",
  latar: "#F5F3FF",
  kutipan: [
    "Uji Kompetensi",
    "Setelah mempelajari cara menentukan keliling berbagai bentuk",
    "bangun datar, coba tentukan keliling bangun berikut.",
    "Keliling segitiga sama sisi = 3 x panjang sisi.",
    "Keliling = 3 x 8 = 24.",
    "Jadi, kelilingnya 24 cm.",
    "Keliling = (2 x 4) + (2 x 6)",
    "= 8 + 12",
    "= 20",
    "sehingga diperoleh kelilingnya 20 cm.",
    "Keliling segi delapan beraturan = 8 x",
    "panjang sisi.",
    "Keliling = 8 x 10 = 80.",
    "Jadi, kelilingnya 80 cm.",
  ],
  ketukan: [
    k(
      "Uji Kompetensi. Tentukan keliling bangun berikut. Nomor satu: segitiga sama sisi, sisi delapan sentimeter. Keliling sama dengan tiga kali sisi, jadi tiga kali delapan, dua puluh empat sentimeter.",
      tambah(0, judul("Uji Kompetensi 1")),
      tambah("segitiga", bentuk("u1", 36, 66, 14, UK1, W.langit), lbl("u1l", 36, 66, 14, UK1[0], UK1[2], "8 cm", -18, 0, 9.6, W.biru)),
      tambah("Keliling", baris("t1", 90, "keliling = 3 × sisi", 9.6)),
      tambah("jadi", baris("t2", 110, "3 × 8 = 24 cm", 13, W.hijau)),
    ),
    k(
      "Nomor dua: layang-layang A B C D. Sisi A B dan A D enam sentimeter, sisi C B dan C D empat. Keliling dua kali empat ditambah dua kali enam, delapan ditambah dua belas, dua puluh sentimeter.",
      bersih(0),
      tambah(0, judul("Uji Kompetensi 2")),
      tambah("layang-layang", jalur("u2", 28, 108, `M0 0 L${(2 * 18).toFixed(1)} ${(-3.464 * 18).toFixed(1)} L${(6.899 * 18).toFixed(1)} 0 L${(2 * 18).toFixed(1)} ${(3.464 * 18).toFixed(1)} Z`, W.krem, W.biru, { tebal: 2 }), teks("u2C", 20, 110, "C", 8, W.merah), teks("u2B", 66, 50, "B", 8, W.merah), teks("u2A", 160, 110, "A", 8, W.merah), teks("u2D", 66, 176, "D", 8, W.merah)),
      tambah("Sisi", teks("u2a", 120, 74, "6 cm", 9, W.biru), teks("u2c", 36, 148, "4 cm", 9, W.biru)),
      tambah("Keliling", baris("t3", 90, "(2 × 4) + (2 × 6) = 20", 9.4)),
      tambah("delapan", baris("t4", 110, "8 + 12 = 20 cm", 13, W.hijau)),
    ),
    k(
      "Nomor tiga: segi delapan beraturan, sisi sepuluh sentimeter. Keliling sama dengan delapan kali sisi, yaitu delapan kali sepuluh, delapan puluh sentimeter.",
      bersih(0),
      tambah(0, judul("Uji Kompetensi 3")),
      tambah("segi", bentuk("u3", 92, 106, 4.2, UK3, W.hijauMuda), teks("u3l", 160, 108, "10 cm", 9.6, W.biru)),
      tambah("Keliling", baris("t5", 70, "keliling = 8 × sisi", 9.6)),
      tambah("yaitu", baris("t6", 130, "8 × 10 = 80 cm", 13, W.hijau)),
    ),
    k(
      "Ketiganya cukup memakai rumus sub-bab sebelumnya. Hasilnya dua puluh empat, dua puluh, dan delapan puluh sentimeter.",
      bersih(0),
      tambah(0, judul("Hasil nomor 1 sampai 3")),
      tambah("Ketiganya", ...tabel("tb", 60, 44, [50, 130], [["No.", "Keliling"], ["1", ""], ["2", ""], ["3", ""]], 22, 10)),
      tambah("Hasilnya", teks("tb1", 175, 104, "24 cm", 11, W.hijau)),
      tambah("dua@2", teks("tb2", 175, 126, "20 cm", 11, W.hijau)),
      tambah("delapan", teks("tb3", 175, 148, "80 cm", 11, W.hijau)),
    ),
  ],
};

/* ------------------------------ 11. Uji Kompetensi nomor 4 dan 5 serta rubrik (Buku Siswa hlm. 130; Panduan Guru hlm. 168 sampai 171) ------------------------------ */
const U4X = 20;
const U4Y = 96;
const U4S = 5.2;
const U5X = 24;
const U5Y = 40;
const U5S = 11;

export const ADEGAN_UK_2: AdeganStory = {
  id: "uji-kompetensi-2",
  judul: "Uji Kompetensi nomor 4 dan 5, dan rubrik penilaian",
  sumber: "Buku Siswa hlm. 130; Panduan Guru hlm. 168–171",
  latar: "#F5F3FF",
  kutipan: [
    "Keliling = 12 + 16 + 12 + 12 + 20",
    "= 72.",
    "Jadi, kelilingnya 72 cm.",
    "Sisi kiri = 12 cm.",
    "Sisi kanan = sisi kiri = 12 cm.",
    "Sisi atas = 8 + 3 = 11 cm.",
    "Sisi bawah = sisi atas = 11 cm.",
    "= (2 x 12) + (2 x 11)",
    "= 24 + 22",
    "= 46.",
    "Jadi, kelilingnya 46 cm.",
    "Rubrik Penilaian",
    "Peserta didik tidak menjawab",
    "sama sekali.",
    "Peserta didik hanya",
    "memberikan hasil akhir dan",
    "masih kurang tepat.",
    "akhir dengan benar, dilengkapi",
    "satuan, tetapi tidak dilengkapi",
    "dengan cara memperolehnya.",
    "tetapi cara pengerjaan/",
    "penghitungan kurang tepat.",
    "memberikan hasil akhir dengan",
    "tepat, dilengkapi satuan dan",
    "cara mengerjakan yang runtut.",
  ],
  ketukan: [
    k(
      "Nomor empat: jajargenjang digabung segitiga siku-siku. Garis putus-putus enam belas sentimeter di dalam bangun, bukan sisi terluar, tetapi sama panjang dengan sisi atas jajargenjang.",
      tambah(0, judul("Uji Kompetensi 4")),
      tambah("digabung", bentuk("v1", U4X, U4Y, U4S, UK4, W.krem, { z: 1 })),
      tambah("putus-putus", gs("v1d", U4X, U4Y, U4S, UK4_DALAM[0], UK4_DALAM[1], W.merah, 1.6, { putus: true }), lbl("v1dl", U4X, U4Y, U4S, UK4_DALAM[0], UK4_DALAM[1], "16 cm", -4, 11, 8, W.merah)),
      tambah("atas", lbl("v1a", U4X, U4Y, U4S, UK4[0], UK4[1], "16 cm", 0, -8, 8, W.hijau)),
      tambah("tetapi", baris("v1t", 70, "garis putus-putus", 9, W.merah), baris("v1u", 84, "di dalam: bukan sisi", 9, W.merah)),
    ),
    k(
      "Kunci buku: keliling sama dengan dua belas ditambah enam belas ditambah dua belas ditambah dua belas ditambah dua puluh, yaitu tujuh puluh dua sentimeter.",
      tambah("Kunci", lbl("v2a", U4X, U4Y, U4S, UK4[0], UK4[4], "12", -9, 0, 8, W.biru), lbl("v2b", U4X, U4Y, U4S, UK4[1], UK4[2], "12", 9, 0, 8, W.biru), lbl("v2c", U4X, U4Y, U4S, UK4[2], UK4[3], "12", 9, 0, 8, W.biru), lbl("v2d", U4X, U4Y, U4S, UK4[3], UK4[4], "20", -8, 6, 8, W.biru)),
      tambah("yaitu", baris("v2e", 118, "12 + 16 + 12 + 12 + 20 = 72", 9), baris("v2f", 140, "72 cm", 16, W.hijau)),
    ),
    k(
      "Nomor lima: bangun berlekuk yang dibingkai garis putus-putus. Sisi kiri dua belas, sisi kanan sama, sisi atas delapan ditambah tiga, yaitu sebelas, dan sisi bawah sama dengan sisi atas.",
      bersih(0),
      tambah(0, judul("Uji Kompetensi 5")),
      tambah("bangun", bentuk("w1", U5X, U5Y, U5S, UK5, W.hijauMuda)),
      tambah("dibingkai", bingkai("w1b", U5X, U5Y, U5S, 0, 0, 11, 12)),
      tambah("Sisi", teks("w1l", U5X - 12, U5Y + 72, "12", 9, W.biru), teks("w1t", U5X + 44, U5Y - 4, "8", 8.6, W.biru), teks("w1t2", U5X + 110, U5Y - 4, "3", 8.6, W.biru), teks("w1v", U5X + 100, U5Y + 16, "3", 8.6, W.biru), teks("w1h", U5X + 80, U5Y + 76, "7", 8.6, W.biru)),
      tambah("atas", baris("w1p", 90, "atas: 8 + 3 = 11", 9.6)),
    ),
    k(
      "Keliling dua kali dua belas ditambah dua kali sebelas, yaitu dua puluh empat ditambah dua puluh dua, empat puluh enam sentimeter.",
      tambah("Keliling", baris("w2a", 108, "(2 × 12) + (2 × 11) = 46", 9)),
      tambah("yaitu", baris("w2b", 126, "24 + 22 = 46", 11)),
      tambah("empat@2", baris("w2c", 150, "46 cm", 16, W.hijau)),
    ),
    k(
      "Rubrik: skor nol sampai empat tiap butir. Nol tidak menjawab; satu hasil kurang tepat; dua hasil benar bersatuan tanpa cara; tiga ada cara tetapi kurang tepat; empat hasil, satuan, dan cara runtut.",
      bersih(0),
      tambah(0, judul("Rubrik penilaian")),
      tambah("Nol", ...tabel("rb", 16, 34, [36, 232], [["Skor", "Pedoman"], ["0", "tidak menjawab sama sekali"], ["1", "hanya hasil akhir, kurang tepat"], ["2", "hasil benar + satuan, tanpa cara"], ["3", "ada cara, tetapi kurang tepat"], ["4", "hasil, satuan, dan cara runtut"]], 22, 8.4)),
      tambah("tiap", teks("rb2", 150, 188, "5 butir, tiap butir skor 0 sampai 4", 9, W.coklat)),
    ),
    k(
      "Skor maksimum tiap butir empat, jadi lima butir berjumlah dua puluh. Kelima kunci Uji Kompetensi kami hitung ulang, dan semuanya cocok.",
      bersih(0),
      tambah(0, judul("Skor dan pemeriksaan kunci")),
      tambah("maksimum", ...kartu("z1", 40, 44, 220, 40, W.langit, ["5 × 4 = 20", "skor maksimum"], 10)),
      tambah("Kelima", ...kartu("z2", 40, 96, 220, 60, W.hijauMuda, ["kunci nomor 1 sampai 5:", "24, 20, 80, 72, 46 cm", "dihitung ulang: cocok"], 9)),
      tambah("cocok", emo("z3", 150, 184, "✅", 22)),
    ),
  ],
};

/* ------------------------------ 12. Remedial, pengayaan, dan soal mengecat dinding (Panduan Guru hlm. 172 sampai 174) ------------------------------ */
const GX = 14;
const GY = 42;
const GS = 6;
const hurufG = (id: string, h: string, dx: number, dy: number): Obj => {
  const [x, y] = px(GX, GY, GS, PENGAYAAN_HURUF[h]);
  return teks(id, x + dx, y + dy + 2, h, 7, W.merah);
};

export const ADEGAN_PENGAYAAN: AdeganStory = {
  id: "pengayaan-cat",
  judul: "Remedial, pengayaan, dan soal mengecat dinding gedung",
  sumber: "Panduan Guru hlm. 172–174",
  latar: "#ECFEFF",
  kutipan: [
    "Remedial diberikan jika peserta didik belum mencapai kriteria minimum",
    "Bimbingan individu",
    "Bimbingan kelompok",
    "Pembelajaran ulang dengan menggunakan metode dan media",
    "Pengayaan dapat diberikan kepada peserta didik yang sudah mendapatkan",
    "soal-soal AKM (Asesmen Kompetensi Minimum) terkait",
    "dengan keliling bangun datar.",
    "Mengecat dinding luar gedung sekolah",
    "Jika 1 galon cat",
    "cukup untuk mengecat dinding sekolah",
    "sepanjang 5 m, cukupkah jika sekolah",
    "membeli cat sebanyak 18 galon untuk",
    "mengecat seluruh dinding terluarnya?",
    "perlu dihitung kelilingnya.",
    "Sisi kiri = IA + BC + DE = HG = 20 m.",
    "Sisi atas = 24 m.",
    "Sisi kanan = 20 m.",
    "EF + FG = EG.",
    "3 + FG = 12.",
    "FG = 12 – 3 = 9.",
    "AB + FG = IH = 24.",
    "AB = 24 – 9 = 15.",
    "Sisi bawah = AB + 15 = 15 + 15 = 30.",
    "Maka, keliling = 20 + 24 + 20 + 30 = 94.",
    "Jadi, kelilingnya 94 m.",
    "Sebanyak 20 galon cat mampu mengecat dinding sepanjang 20 x 5 = 100 m.",
    "Maka, persediaan tersebut lebih dari cukup untuk mengecat seluruh",
  ],
  ketukan: [
    k(
      "Remedial lewat bimbingan individu, kelompok, atau pembelajaran ulang dengan metode dan media berbeda. Pengayaan memakai soal AKM tentang keliling bangun datar.",
      tambah(0, judul("Remedial dan pengayaan")),
      tambah("Remedial", ...kartu("r1", 14, 36, 128, 74, W.krem, ["remedial:", "bimbingan individu,", "kelompok, atau ulang", "dengan metode lain"], 8.4)),
      tambah("Pengayaan", ...kartu("r2", 158, 36, 128, 74, W.hijauMuda, ["pengayaan:", "soal AKM tentang", "keliling bangun datar"], 8.4)),
      tambah("keliling", emo("r3", 150, 150, "🎓", 30)),
    ),
    k(
      "Soal pengayaan: mengecat dinding luar gedung sekolah. Denah gedung dua puluh empat kali dua puluh meter, dengan sisi tiga dan dua belas meter. Satu galon cat cukup untuk lima meter. Cukupkah delapan belas galon?",
      bersih(0),
      tambah(0, judul("Pengayaan: mengecat dinding")),
      tambah("Denah", bentuk("g", GX, GY, GS, PENGAYAAN, W.langit)),
      tambah("dua@2", teks("g24", GX + 72, GY - 4, "24 m", 8.4, W.biru), teks("g20", GX + 24 * GS + 14, GY + 60, "20 m", 8.4, W.biru)),
      tambah("tiga", teks("g3", GX + 13.5 * GS, GY + 17 * GS - 5, "3 m", 7.6, W.biru), teks("g12", GX + 18 * GS, GY + 20 * GS + 10, "12 m", 7.6, W.biru)),
      tambah("Satu", baris("g5", 66, "1 galon: 5 m dinding", 9)),
      tambah("Cukupkah", baris("g18", 90, "18 galon cukup?", 12, W.merah)),
    ),
    k(
      "Hitung dulu kelilingnya. Sisi kiri sama dengan sisi kanan, dua puluh meter, dan sisi atas dua puluh empat meter.",
      hapus(0, "g5", "g18"),
      tambah("Hitung", ...Object.keys(PENGAYAAN_HURUF).map((h) => hurufG(`gh${h}`, h, h === "I" || h === "A" ? -6 : h === "H" || h === "G" ? 7 : h === "F" ? 0 : h === "E" ? -2 : h === "D" || h === "C" ? 0 : 6, h === "I" || h === "H" ? -3 : h === "G" || h === "F" || h === "E" ? 9 : h === "A" ? 0 : h === "B" ? -4 : h === "C" ? -4 : -4))),
      tambah("Sisi", baris("k1", 66, "kiri = 20 m", 10)),
      tambah("kanan,", baris("k2", 84, "kanan = 20 m", 10)),
      tambah("atas", baris("k3", 102, "atas = 24 m", 10)),
    ),
    k(
      "Sisi bawah terdiri atas A B, D C, dan E G. E F ditambah F G sama dengan E G, jadi tiga ditambah F G sama dengan dua belas, dan F G sembilan.",
      hapus(0, "k1", "k2", "k3"),
      tambah("Sisi", baris("m1", 62, "bawah = AB + DC + EG", 8.4)),
      tambah("ditambah", baris("m2", 80, "3 + FG = 12", 10)),
      tambah("sembilan.", baris("m3", 96, "FG = 12 − 3 = 9", 10)),
    ),
    k(
      "Lalu A B ditambah F G sama dengan I H, yaitu dua puluh empat. Jadi A B sama dengan dua puluh empat dikurangi sembilan, lima belas meter.",
      tambah("Lalu", baris("m4", 114, "AB + 9 = 24", 10)),
      tambah("Jadi", baris("m5", 130, "AB = 24 − 9 = 15", 10, W.hijau)),
    ),
    k(
      "Sisi bawah lima belas ditambah tiga ditambah dua belas, jadi tiga puluh meter. Keliling dua puluh ditambah dua puluh empat ditambah dua puluh ditambah tiga puluh, yaitu sembilan puluh empat meter.",
      hapus(0, "m1", "m2", "m3", "m4", "m5"),
      tambah("Sisi", baris("n1", 62, "bawah: 15 + 3 + 12 = 30", 9)),
      tambah("Keliling", baris("n2", 84, "20 + 24 + 20 + 30 = 94", 10)),
      tambah("yaitu", baris("n3", 108, "94 m", 18, W.hijau)),
    ),
    k(
      "Kunci buku lalu memakai dua puluh galon: dua puluh kali lima sama dengan seratus meter, jadi persediaan lebih dari cukup.",
      hapus(0, "n1", "n2"),
      tambah("Kunci", baris("o1", 70, "kunci buku: 20 galon", 9)),
      tambah("dua@2", baris("o2", 88, "20 × 5 = 100 m", 11)),
      tambah("lebih", baris("o3", 130, "100 m > 94 m: cukup", 9.4, W.hijau)),
    ),
    k(
      "Catatan guru: soal bertanya delapan belas galon, bukan dua puluh. Delapan belas kali lima hanya sembilan puluh meter, kurang dari sembilan puluh empat. Jadi perlu minimal sembilan belas galon.",
      hapus(0, "o1", "o2", "o3", "n3"),
      tambah("Catatan", emo("p0", PX, 56, "⚠", 20)),
      tambah("Delapan", baris("p1", 80, "18 × 5 = 90 m", 11, W.merah)),
      tambah("kurang", baris("p2", 98, "kurang dari 94 m", 9.4, W.merah)),
      tambah("minimal", baris("p3", 122, "19 galon: 19 × 5 = 95 m", 9.4, W.hijau)),
    ),
  ],
};

/* ------------------------------ 13. Refleksi 16 sampai 20 dan penutup (Buku Siswa hlm. 129; Panduan Guru hlm. 167, 174 sampai 176) ------------------------------ */
export const ADEGAN_REFLEKSI_E: AdeganStory = {
  id: "refleksi-penutup",
  judul: "Refleksi nomor 16 sampai 20 dan penutup bab",
  sumber: "Buku Siswa hlm. 129; Panduan Guru hlm. 167 dan hlm. 174–176",
  latar: "#FDF2F8",
  kutipan: [
    "Releksi",
    "Setelah mempelajari materi terkait keliling bangun datar, isilah tabel",
    "berikut sesuai dengan pemahaman kalian.",
    "16 Aku bisa menguraikan bangun gabungan menjadi bangun-",
    "bangun datar penyusunnya.",
    "17 Aku bisa mencari cara menghitung keliling bangun gabungan.",
    "18. Bangun datar apakah yang paling mudah dihitung kelilingnya? Mengapa?",
    "19. Bangun datar apakah yang paling sulit dihitung kelilingnya? Mengapa?",
    "20. Apa usaha kalian agar mampu menghitung keliling bangun datar dengan",
    "lebih baik?",
    "Keberhasilan pembelajaran tidak hanya menjadi tanggung jawab guru di",
    "dapat dilibatkan untuk memantau peserta didik mempelajari kembali materi",
    "tentang keliling bangun datar di rumah.",
  ],
  ketukan: [
    k(
      "Refleksi. Guru memfasilitasi pertanyaan refleksi nomor enam belas dan tujuh belas: beri tanda centang ya atau tidak.",
      tambah(0, judul("Refleksi nomor 16 dan 17")),
      tambah("enam", ...tabel("fr", 10, 38, [24, 190, 30, 36], [["No.", "Pernyataan", "Ya", "Tidak"], ["16", "", "", ""], ["17", "", "", ""]], 38, 8)),
      tambah("nomor", teks("fr-a1", 109, 78, "Aku bisa menguraikan bangun", 7.4, W.biru), teks("fr-a2", 109, 90, "gabungan menjadi bangun-bangun", 7.4, W.biru), teks("fr-a3", 109, 102, "penyusunnya.", 7.4, W.biru)),
      tambah("dan", teks("fr-b1", 109, 130, "Aku bisa mencari cara menghitung", 7.4, W.biru), teks("fr-b2", 109, 142, "keliling bangun gabungan.", 7.4, W.biru)),
      tambah("centang", emo("fr1", 235, 94, "✔", 14, { warna: W.hijau }), emo("fr2", 235, 136, "✔", 14, { warna: W.hijau })),
    ),
    k(
      "Tiga pertanyaan penutup bab. Nomor delapan belas: bangun datar apa yang paling mudah dihitung kelilingnya, dan mengapa? Nomor sembilan belas: yang paling sulit, dan mengapa?",
      bersih(0),
      tambah(0, judul("Refleksi nomor 18 dan 19")),
      tambah("Nomor", ...kartu("fa", 20, 40, 260, 50, W.hijauMuda, ["18. bangun datar yang paling mudah", "dihitung kelilingnya? Mengapa?"], 9)),
      tambah("sembilan", ...kartu("fb", 20, 104, 260, 50, W.merahMuda, ["19. bangun datar yang paling sulit", "dihitung kelilingnya? Mengapa?"], 9)),
    ),
    k(
      "Nomor dua puluh: apa usahamu agar mampu menghitung keliling bangun datar dengan lebih baik? Tuliskan rencanamu.",
      bersih(0),
      tambah(0, judul("Refleksi nomor 20")),
      tambah("Nomor", ...kartu("fc", 30, 44, 240, 60, W.krem, ["20. usahamu agar mampu menghitung", "keliling bangun datar", "dengan lebih baik?"], 9.4)),
      tambah("Tuliskan", emo("fd", 150, 150, "📝", 34)),
    ),
    k(
      "Interaksi dengan orang tua: orang tua dapat dilibatkan memantau peserta didik mempelajari kembali materi keliling bangun datar di rumah.",
      bersih(0),
      tambah(0, judul("Bersama orang tua")),
      tambah("orang", emo("fe1", 90, 90, "👪", 40)),
      tambah("memantau", emo("fe2", 210, 90, "📚", 40)),
      tambah("rumah.", ...kartu("fe", 40, 126, 220, 40, W.langit, ["belajar kembali keliling", "bangun datar di rumah"], 9.4)),
    ),
    k(
      "Ringkasan: keliling bangun gabungan adalah jumlah panjang sisi-sisi terluar. Cari dulu sisi yang belum diketahui, lalu jumlahkan, atau bungkus dengan persegi besar bila aman.",
      bersih(0),
      tambah(0, judul("Ringkasan Sub-Bab E")),
      tambah("Ringkasan:", ...kartu("g1", 20, 36, 260, 30, W.langit, ["hanya sisi terluar yang dijumlahkan"], 9.2)),
      tambah("Cari", ...kartu("g2", 20, 76, 260, 30, W.hijauMuda, ["cari dulu sisi yang belum diketahui"], 9.2)),
      tambah("bungkus", ...kartu("g3", 20, 116, 260, 30, W.krem, ["atau bungkus dengan persegi besar bila aman"], 9.2)),
      tambah("aman.", teks("g4", 150, 180, "denah rumah: 48 m", 13, W.hijau)),
    ),
  ],
};
