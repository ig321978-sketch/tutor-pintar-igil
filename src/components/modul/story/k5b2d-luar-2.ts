import type { AdeganStory } from "./logika-story";
import { W, emo, judul, kartu, kotak, panah, teks } from "./k5b2d-gambar";
import { bersih, k, tambah } from "./k5b2d-bantu";

/* ------------------------------ 6. Euclid Preview: konsep ------------------------------ */
export const ADEGAN_LUAR_EUCLID: AdeganStory = {
  id: "luar-euclid",
  judul: "Euclid Preview: ganti pasangan dengan selisihnya",
  sumber: "Metode luar: Euclid Preview",
  latar: "#FEFCE8",
  ketukan: [
    k(
      "Metode ketiga, Euclid Preview, artinya pratinjau cara Euclid. Idenya, FPB dua bilangan tidak berubah bila bilangan yang lebih besar diganti dengan selisihnya terhadap bilangan yang lebih kecil.",
      tambah(0, judul("Euclid Preview")),
      tambah("Idenya,", teks("e1", 70, 86, "18 dan 12", 15, W.biru)),
      tambah("tidak", teks("e3", 150, 132, "FPB-nya tetap sama", 11, W.merah)),
      tambah("diganti", panah("ea", 118, 82, 50, 0, W.coklat, 2.4), teks("e2", 232, 86, "12 dan 6", 15, W.hijau)),
      tambah("selisihnya", teks("e4", 150, 164, "bilangan besar diganti selisih", 9.6, W.hitam)),
    ),
    k(
      "Contoh: delapan belas dan dua belas. Selisihnya enam, jadi pasangan menjadi dua belas dan enam. Selisih dua belas dan enam juga enam, jadi pasangan menjadi enam dan enam.",
      bersih(0),
      tambah(0, judul("Contoh: 18 dan 12")),
      tambah("Selisihnya", teks("s1", 150, 56, "18 − 12 = 6", 15, W.biru)),
      tambah("menjadi", teks("p1", 150, 78, "pasangan baru: 12 dan 6", 9.8, W.hijau)),
      tambah("Selisih@2", teks("s2", 150, 114, "12 − 6 = 6", 15, W.biru)),
      tambah("menjadi@2", teks("p2", 150, 136, "pasangan baru: 6 dan 6", 9.8, W.hijau)),
    ),
    k(
      "Bila kedua bilangan sudah sama, berhenti. Bilangan itu adalah FPB-nya. Jadi FPB delapan belas dan dua belas adalah enam, sama dengan hasil metode daftar.",
      bersih(0),
      tambah(0, judul("Berhenti bila sudah sama")),
      tambah("sama,", teks("b1", 150, 70, "6 dan 6", 24, W.coklat)),
      tambah("berhenti.", teks("b2", 150, 100, "berhenti", 12, W.merah)),
      tambah("Jadi", teks("b3", 150, 142, "FPB dari 18 dan 12 adalah 6", 12, W.hijau)),
      tambah("metode", teks("b4", 150, 172, "cocok dengan metode daftar", 9.8, W.biru)),
    ),
    k(
      "Mengapa benar? Setiap faktor persekutuan dua bilangan juga membagi selisih keduanya. Karena itu faktor persekutuan tidak hilang atau bertambah ketika pasangan diganti dengan selisihnya.",
      bersih(0),
      tambah(0, judul("Mengapa benar?")),
      tambah("Setiap", teks("q1", 150, 56, "18 : 6 = 3", 15, W.hitam)),
      tambah("juga", teks("q2", 150, 82, "12 : 6 = 2", 15, W.hitam)),
      tambah("keduanya.", teks("q3", 150, 108, "6 : 6 = 1", 15, W.hitam)),
      tambah("Karena", teks("q4", 150, 140, "6 membagi 18, 12, dan selisihnya 6", 9.6, W.coklat)),
      tambah("hilang", teks("q5", 150, 172, "faktor persekutuan tetap sama", 10.4, W.hijau)),
    ),
  ],
};

/* ------------------------------ 7. Euclid Preview: penerapan ------------------------------ */
export const ADEGAN_LUAR_EUCLID_TERAPAN: AdeganStory = {
  id: "luar-euclid-terapan",
  judul: "Euclid Preview pada mawar Nisa dan Ayo Berlatih 1b",
  sumber: "Metode luar: Euclid Preview; Buku Siswa hlm. 51–52",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Terapkan pada mawar Nisa, dua puluh empat dan delapan belas. Selisihnya enam, jadi pasangan menjadi delapan belas dan enam.",
      tambah(0, judul("Mawar Nisa: 24 dan 18")),
      tambah("Selisihnya", teks("t1", 150, 54, "24 − 18 = 6", 14, W.biru)),
      tambah("menjadi", teks("t2", 150, 72, "pasangan baru: 18 dan 6", 9.4, W.hijau)),
    ),
    k(
      "Selisih delapan belas dan enam adalah dua belas, jadi pasangan menjadi dua belas dan enam. Selisih dua belas dan enam adalah enam, jadi pasangan menjadi enam dan enam.",
      tambah("Selisih", teks("t3", 150, 96, "18 − 6 = 12", 14, W.biru)),
      tambah("menjadi", teks("t4", 150, 114, "pasangan baru: 12 dan 6", 9.4, W.hijau)),
      tambah("Selisih@2", teks("t5", 150, 138, "12 − 6 = 6", 14, W.biru)),
      tambah("menjadi@2", teks("t6", 150, 156, "pasangan baru: 6 dan 6", 9.4, W.hijau)),
    ),
    k(
      "Pasangan sudah sama pada enam. Jadi FPB dua puluh empat dan delapan belas adalah enam, sama dengan banyak vas yang Nisa butuhkan.",
      bersih(0),
      tambah(0, judul("Hasil: FPB 24 dan 18")),
      tambah("Pasangan", teks("h1", 150, 74, "6 dan 6", 24, W.coklat)),
      tambah("Jadi", teks("h2", 150, 112, "FPB dari 24 dan 18 adalah 6", 12, W.hijau)),
      tambah("vas", emo("h3", 150, 156, "🏺", 30), teks("h4", 150, 190, "6 vas untuk Nisa", 9.6, W.coklat)),
    ),
    k(
      "Contoh kedua, Ayo Berlatih satu b: empat puluh dua dan dua belas. Cara cepat memakai sisa pembagian: empat puluh dua dibagi dua belas sama dengan tiga sisa enam.",
      bersih(0),
      tambah(0, judul("Berlatih 1b: 42 dan 12")),
      tambah("Cara", teks("u1", 150, 52, "pakai sisa pembagian", 10.4, W.coklat)),
      tambah("dibagi", teks("u2", 150, 88, "42 : 12 = 3 sisa 6", 15, W.hitam)),
      tambah("tiga", teks("u3", 150, 122, "42 = 3 × 12 + 6", 13, W.hijau)),
    ),
    k(
      "Lalu dua belas dibagi enam sama dengan dua sisa nol, jadi pembagi terakhir, enam, adalah FPB-nya. Cocok dengan kunci buku.",
      tambah("dua@2", teks("u4", 150, 152, "12 = 2 × 6 + 0", 13, W.hijau)),
      tambah("nol,", teks("u5", 150, 172, "sisa 0: berhenti", 10.4, W.merah)),
      tambah("Cocok", teks("u6", 150, 192, "FPB dari 42 dan 12 adalah 6", 11, W.coklat)),
    ),
  ],
};

/** Deret kotak vas atau paket: n kotak sebaris mulai y, lebar 42, jarak 46 (mulai x = 14). Id `${id}${i}`. */
const kotakDeret = (id: string, n: number, y: number, h: number, warna: string) => Array.from({ length: n }, (_, i) => kotak(`${id}${i}`, 14 + i * 46, y, 42, h, warna, W.coklat, { rx: 8 }));
const isiDeret = (id: string, n: number, y: number, isi: string, warna: string) => Array.from({ length: n }, (_, i) => teks(`${id}${i}`, 35 + i * 46, y, isi, 7.4, warna));

/* ------------------------------ 8. Equal Packing: konsep ------------------------------ */
export const ADEGAN_LUAR_PAKET: AdeganStory = {
  id: "luar-paket",
  judul: "Equal Packing: mengemas sama rata",
  sumber: "Metode luar: Equal Packing",
  latar: "#FDF2F8",
  ketukan: [
    k(
      "Metode keempat, Equal Packing, artinya mengemas sama rata. Bayangkan membagi dua jenis barang ke paket yang isinya sama persis. Banyak paket paling banyak adalah FPB kedua jumlah barang.",
      tambah(0, judul("Equal Packing")),
      tambah("mengemas", ...kartu("c1", 30, 36, 240, 34, W.krem, ["mengemas sama rata"], 10)),
      tambah("Bayangkan", emo("c2", 150, 106, "🎁", 34)),
      tambah("FPB", ...kartu("c3", 30, 130, 240, 40, W.hijauMuda, ["paket terbanyak sama dengan", "FPB jumlah barang"], 9.4)),
    ),
    k(
      "Contoh: dua belas kue dan delapan belas permen. Kita coba dua paket, tiga paket, atau enam paket. Semuanya bisa, karena dua, tiga, dan enam membagi habis dua belas dan delapan belas.",
      bersih(0),
      tambah(0, judul("12 kue dan 18 permen")),
      tambah("kue", emo("k1", 70, 62, "🍰", 28), teks("k1t", 70, 86, "12 kue", 10, W.hitam)),
      tambah("permen.", emo("k2", 230, 62, "🍬", 28), teks("k2t", 230, 86, "18 permen", 10, W.hitam)),
      tambah("dua@2", ...kartu("o1", 14, 108, 84, 32, W.langit, ["2 paket"], 10)),
      tambah("tiga", ...kartu("o2", 108, 108, 84, 32, W.krem, ["3 paket"], 10)),
      tambah("enam", ...kartu("o3", 202, 108, 84, 32, W.hijauMuda, ["6 paket"], 10)),
      tambah("Semuanya", teks("o4", 150, 170, "ketiganya bisa", 11, W.hijau)),
    ),
    k(
      "Dengan enam paket, tiap paket berisi dua kue dan tiga permen. Tujuh paket tidak bisa, sebab tujuh tidak membagi habis dua belas.",
      bersih(0),
      tambah(0, judul("Enam paket sama isi")),
      tambah("enam", ...kotakDeret("pk", 6, 40, 56, W.krem)),
      tambah("dua", ...isiDeret("pa", 6, 64, "2 kue", W.merah)),
      tambah("tiga", ...isiDeret("pb", 6, 84, "3 permen", W.hitam)),
      tambah("Tujuh", teks("pt", 150, 146, "7 paket: tidak bisa", 12, W.merah), teks("pu", 150, 168, "7 tidak membagi habis 12", 9.6, W.coklat)),
    ),
    k(
      "Jadi banyak paket terbanyak adalah faktor persekutuan terbesar, yaitu enam. Isi tiap paket adalah bilangan awal dibagi FPB: dua belas dibagi enam sama dengan dua, delapan belas dibagi enam sama dengan tiga.",
      bersih(0),
      tambah(0, judul("Isi tiap paket")),
      tambah("Jadi", teks("w0", 150, 48, "paket terbanyak adalah FPB, yaitu 6", 10.4, W.coklat)),
      tambah("dua", teks("w1", 150, 92, "12 : 6 = 2", 17, W.merah)),
      tambah("tiga", teks("w2", 150, 126, "18 : 6 = 3", 17, W.hitam)),
      tambah("FPB:", teks("w3", 150, 166, "isi paket = bilangan awal : FPB", 10, W.hijau)),
    ),
  ],
};

/* ------------------------------ 9. Equal Packing: penerapan ------------------------------ */
export const ADEGAN_LUAR_PAKET_TERAPAN: AdeganStory = {
  id: "luar-paket-terapan",
  judul: "Equal Packing pada mawar Nisa dan paket Dania",
  sumber: "Metode luar: Equal Packing; Buku Siswa hlm. 51–53; Panduan Guru hlm. 76",
  latar: "#FEF2F2",
  ketukan: [
    k(
      "Terapkan pada mawar Nisa, dua puluh empat mawar merah dan delapan belas mawar putih. Vas paling banyak sama dengan FPB keduanya, yaitu enam vas.",
      tambah(0, judul("Mawar Nisa: vas terbanyak")),
      tambah("merah", ...kartu("n1", 20, 40, 260, 34, W.merahMuda, ["24 mawar merah"], 10)),
      tambah("putih.", ...kartu("n2", 20, 84, 260, 34, W.putih, ["18 mawar putih"], 10)),
      tambah("FPB", teks("n3", 150, 148, "FPB dari 24 dan 18 adalah 6", 12, W.hijau)),
      tambah("vas@2", teks("n4", 150, 174, "paling banyak 6 vas", 10.4, W.coklat)),
    ),
    k(
      "Isi tiap vas: dua puluh empat dibagi enam sama dengan empat mawar merah, dan delapan belas dibagi enam sama dengan tiga mawar putih.",
      bersih(0),
      tambah(0, judul("Isi tiap vas")),
      tambah("Isi", ...kotakDeret("vs", 6, 36, 48, W.krem)),
      tambah("empat@2", ...isiDeret("vm", 6, 58, "4 merah", W.merah)),
      tambah("tiga", ...isiDeret("vp", 6, 74, "3 putih", W.hitam)),
      tambah("dua", teks("x1", 150, 118, "24 : 6 = 4", 14, W.merah)),
      tambah("delapan", teks("x2", 150, 142, "18 : 6 = 3", 14, W.hitam)),
    ),
    k(
      "Terapkan pada paket Dania: tiga puluh enam susu, empat puluh delapan permen, dan dua puluh empat biskuit. Paket paling banyak sama dengan FPB ketiganya, yaitu dua belas paket.",
      bersih(0),
      tambah(0, judul("Paket Dania")),
      tambah("susu,", ...kartu("y1", 14, 40, 84, 34, W.langit, ["36 susu"], 10)),
      tambah("permen,", ...kartu("y2", 108, 40, 84, 34, W.pink, ["48 permen"], 10)),
      tambah("biskuit.", ...kartu("y3", 202, 40, 84, 34, W.krem, ["24 biskuit"], 10)),
      tambah("FPB", teks("y4", 150, 120, "FPB dari 36, 48, dan 24 adalah 12", 11, W.hijau)),
      tambah("dua@2", teks("y5", 150, 152, "12 paket", 18, W.coklat)),
    ),
    k(
      "Isi tiap paket: tiga puluh enam dibagi dua belas sama dengan tiga susu, empat puluh delapan dibagi dua belas sama dengan empat permen, dan dua puluh empat dibagi dua belas sama dengan dua biskuit.",
      bersih(0),
      tambah(0, judul("Isi tiap paket Dania")),
      tambah("tiga", teks("z1", 100, 66, "36 : 12 = 3", 15, W.hitam), teks("z1t", 220, 66, "susu", 10.4, W.coklat)),
      tambah("empat", teks("z2", 100, 106, "48 : 12 = 4", 15, W.hitam), teks("z2t", 220, 106, "permen", 10.4, W.coklat)),
      tambah("biskuit.", teks("z3", 100, 146, "24 : 12 = 2", 15, W.hitam), teks("z3t", 220, 146, "biskuit", 10.4, W.coklat)),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode",
  sumber: "Ringkasan metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Ringkasannya. Common Factors List: tulis faktor tiap bilangan, tandai yang sama, ambil yang terbesar. GCF Concept: gambar faktor sebagai dua lingkaran, ambil bilangan terbesar di irisan.",
      tambah(0, judul("Ringkasan")),
      tambah("Common", ...kartu("s1", 20, 36, 260, 40, W.hijauMuda, ["Common Factors List:", "tulis, tandai yang sama, ambil terbesar"], 9)),
      tambah("GCF", ...kartu("s2", 20, 84, 260, 40, W.langit, ["GCF Concept:", "terbesar di irisan dua lingkaran"], 9)),
    ),
    k(
      "Euclid Preview: ganti pasangan dengan selisihnya sampai kedua bilangan sama. Equal Packing: bagi barang ke paket sama isi, dan paket terbanyak adalah FPB.",
      tambah("Euclid", ...kartu("s3", 20, 132, 126, 40, W.krem, ["Euclid Preview:", "ganti dengan selisih"], 9)),
      tambah("Equal", ...kartu("s4", 154, 132, 126, 40, W.pink, ["Equal Packing:", "paket sama isi"], 9)),
    ),
    k(
      "Untuk dua belas dan delapan belas, keempat metode memberi hasil yang sama, yaitu enam. Hasilnya selalu sama, hanya jalannya yang berbeda.",
      bersih(0),
      tambah(0, judul("Hasil yang sama")),
      tambah("keempat", ...kartu("t1", 20, 36, 126, 34, W.hijauMuda, ["daftar", "FPB 12 dan 18: 6"], 8.6), ...kartu("t2", 154, 36, 126, 34, W.langit, ["irisan", "FPB 12 dan 18: 6"], 8.6)),
      tambah("sama,", ...kartu("t3", 20, 80, 126, 34, W.krem, ["selisih", "FPB 12 dan 18: 6"], 8.6), ...kartu("t4", 154, 80, 126, 34, W.pink, ["paket", "FPB 12 dan 18: 6"], 8.6)),
      tambah("berbeda.", teks("t5", 150, 150, "FPB 12 dan 18 adalah 6", 16, W.hijau)),
    ),
    k(
      "Ingat, FPB mencari faktor yang sama dan terbesar, bukan kelipatan. Untuk soal cerita, kata kuncinya paling banyak. Coba semua metode, lalu pilih yang cocok.",
      bersih(0),
      tambah(0, judul("Pilih yang paling cocok")),
      tambah("FPB", ...kartu("u1", 30, 36, 240, 36, W.hijauMuda, ["FPB: faktor sama yang terbesar", "(bukan kelipatan)"], 9)),
      tambah("kuncinya", ...kartu("u2", 30, 84, 240, 30, W.emas, ["kata kunci: paling banyak"], 9.6)),
      tambah("Coba", emo("u3", 150, 152, "⭐", 36)),
    ),
  ],
};
