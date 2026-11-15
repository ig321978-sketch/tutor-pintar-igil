import type { AdeganStory } from "./logika-story";
import { W, emo, garis, kotak, panah, teks } from "./k6b4a-gambar"
import { bersih, k, sorotkan, tambah, ubah } from "./k6b4a-bantu"
import { daduTitik, koin } from "./k6b4b-gambar";

/* ------------------------------ LB0. Empat metode luar Sub-Bab B ------------------------------ */
const kartu = (id: string, x: number, y: number, warna: string, baris: string[], arti: string) => [kotak(`${id}-k`, x, y, 134, 70, warna, W.biru, { rx: 10 }), ...baris.map((b, i) => teks(`${id}-n${i}`, x + 67, y + 20 + i * 12, b, 8.6)), teks(`${id}-a`, x + 67, y + 24 + baris.length * 12, arti, 7, W.ungu)];

export const ADEGAN_LUAR_B_PEMBUKA: AdeganStory = {
  id: "luarb-pembuka",
  judul: "Empat metode luar untuk membandingkan peluang",
  sumber: "Metode luar: empat cara membandingkan",
  latar: "#EAF2FF",
  ketukan: [
    k("Sekarang kita lihat metode dari luar materi kurikulum. Isinya membantu kita membandingkan peluang dengan lebih rapi.", tambah("metode", emo("dunia", 80, 100, "🌐", 44), teks("l1", 80, 132, "metode luar", 9, W.merah)), tambah("membandingkan", emo("buku", 220, 100, "📘", 44), teks("l2", 220, 132, "peluang kejadian", 9)), tambah("rapi.", panah("pa", 112, 100, 74, 0, W.hijau, 4, { gambar: true }))),
    k("Ada empat metode luar. Pertama, Favorable-to-Total Ratio, rasio hasil menguntungkan terhadap semua hasil.", bersih(0), tambah(0, teks("jud", 150, 20, "Empat metode luar", 12, W.ungu)), tambah("Favorable-to-Total", kartu("m1", 10, 30, "#FDE68A", ["Favorable-to-", "Total Ratio"], "hasil untung per semua hasil"))),
    k("Kedua, Comparative Probability Ratio, cara membandingkan dua peluang dengan menyamakan total.", tambah("Comparative", kartu("m2", 156, 30, "#FBCFE8", ["Comparative", "Probability Ratio"], "samakan total dulu"))),
    k("Ketiga, Fair Game Equal Chance Principle, prinsip permainan adil. Keempat, Relative Likelihood Decision, keputusan dari kemungkinan relatif.", tambah("Fair", kartu("m3", 10, 112, "#BBF7D0", ["Fair Game Equal", "Chance Principle"], "peluang tiap pemain sama")), tambah("Relative", kartu("m4", 156, 112, "#BFDBFE", ["Relative Likelihood", "Decision"], "pilih yang lebih besar"))),
  ],
};

/* ------------------------------ LB1. Favorable-to-Total Ratio: konsep ------------------------------ */
export const ADEGAN_LUAR_B_FTR: AdeganStory = {
  id: "luarb-ftr",
  judul: "Favorable-to-Total Ratio: k dari n",
  sumber: "Metode luar: Favorable-to-Total Ratio",
  latar: "#FFF1D6",
  ketukan: [
    k("Metode pertama: Favorable-to-Total Ratio, rasio hasil menguntungkan terhadap semua hasil. Hasil menguntungkan adalah hasil yang kita harapkan terjadi.", tambah(0, teks("jud", 150, 28, "Favorable-to-Total Ratio", 12, W.ungu)), tambah("menguntungkan", kotak("f", 20, 56, 120, 60, "#BBF7D0", W.hijau, { rx: 10 }), teks("ft", 80, 82, "hasil", 10), teks("fu", 80, 98, "menguntungkan", 10, W.hijau)), tambah("semua", kotak("t", 160, 56, 120, 60, "#BFDBFE", W.biruMuda, { rx: 10 }), teks("tt", 220, 82, "semua hasil", 10), teks("tu", 220, 98, "yang mungkin", 10, W.biruMuda)), tambah("rasio", teks("rs", 150, 150, "rasio  =  menguntungkan : semua", 11, W.merah))),
    k("Contoh koin: yang kita harapkan sisi gambar, ada satu. Semua hasil yang mungkin ada dua. Jadi rasionya satu dari dua.", bersih(0), tambah("koin:", ...koin("g", 100, 70, "G", 26), ...koin("a", 200, 70, "A", 26)), sorotkan("gambar,", "g-k"), tambah("satu.", teks("k1", 100, 128, "1 menguntungkan", 9, W.hijau)), tambah("dua.", teks("k2", 150, 146, "2 hasil semuanya", 9, W.biruMuda)), tambah("rasionya", teks("k3", 150, 184, "1 dari 2", 20, W.merah, { garis: W.emas }))),
    k("Contoh dadu: yang kita harapkan angka enam, ada satu. Semua hasil ada enam. Rasionya satu dari enam.", bersih(0), ...[1, 2, 3, 4, 5, 6].map((n, i) => tambah(0, ...daduTitik(`d${n}`, 30 + i * 48, 70, n, 36, n === 6 ? "#BBF7D0" : W.putih))), sorotkan("angka", "d6-k"), tambah("satu.", teks("k1", 150, 120, "1 menguntungkan", 10, W.hijau)), tambah("enam@2", teks("k2", 150, 138, "6 hasil semuanya", 10, W.biruMuda)), tambah("Rasionya", teks("k3", 150, 180, "1 dari 6", 20, W.merah, { garis: W.emas }))),
    k("Hasil yang tidak menguntungkan juga penting. Banyaknya sama dengan semua hasil dikurangi hasil menguntungkan. Pada dadu, enam dikurangi satu sama dengan lima.", bersih(0), ...[1, 2, 3, 4, 5, 6].map((n, i) => tambah(0, ...daduTitik(`d${n}`, 30 + i * 48, 70, n, 36, n === 6 ? "#BBF7D0" : "#FECACA"))), tambah("tidak", teks("a", 150, 124, "tidak menguntungkan = semua − menguntungkan", 9, W.merah)), tambah("dadu,", teks("b", 150, 150, "6 − 1 = 5", 20, W.merah)), tambah("lima.", teks("c", 150, 176, "5 hasil lain masih bisa muncul", 9.5, W.ungu))),
    k("Hasil menguntungkan selalu bagian dari semua hasil, jadi k tidak pernah lebih besar dari n. Kalau k sama dengan n, kejadiannya pasti.", bersih(0), tambah("bagian", kotak("n", 30, 36, 240, 36, "#BFDBFE", W.biru, { rx: 10 }), teks("nt", 150, 59, "n  =  semua hasil", 12), kotak("kk", 30, 80, 130, 36, "#BBF7D0", W.hijau, { rx: 10 }), teks("kt", 95, 103, "k  =  menguntungkan", 10, W.hijau)), tambah("lebih", teks("lb", 150, 124, "k ≤ n", 22, W.merah)), tambah("pasti.", teks("ps", 150, 164, "k = n  →  pasti", 14, W.biru))),
    k("Menulis rasio: k dari n, atau k per n. Contoh permen Dhien: tiga merah dari enam permen, dibaca tiga per enam.", bersih(0), tambah("k", teks("w1", 150, 40, "k dari n", 18, W.ungu), teks("w2", 150, 66, "k per n", 14, W.ungu)), tambah("tiga", teks("w3", 80, 120, "3 merah", 14, W.merah)), tambah("enam", teks("w4", 220, 120, "6 permen", 14, W.biruMuda)), tambah("tiga@2", teks("w5", 150, 170, "3 per 6", 22, W.merah, { garis: W.emas }))),
  ],
};

/* ------------------------------ LB2. Favorable-to-Total Ratio diterapkan ------------------------------ */
const TABEL_F = [
  ["koin: sisi gambar", "1 dari 2", "1"],
  ["dadu: angka 6", "1 dari 6", "5"],
  ["permen: merah", "3 dari 6", "3"],
  ["Mantap: bola biru", "4 dari 7", "3"],
  ["Spektakuler: biru", "3 dari 7", "4"],
  ["kotak 1: set pensil", "2 dari 10", "8"],
  ["kotak 2: set pensil", "4 dari 11", "7"],
  ["lomba: kategori SD", "1 dari 12", "11"],
];
const barisF = (i: number) => {
  const y = 40 + i * 20;
  const [a, b, c] = TABEL_F[i];
  return [kotak(`rf${i}`, 8, y, 284, 18, W.putih, W.abu, { rx: 4, tebal: 1 }), teks(`rf${i}a`, 14, y + 12.5, a, 7.6, W.biru, { anchor: "start" }), teks(`rf${i}b`, 150, y + 12.5, b, 9, W.merah, { anchor: "start" }), teks(`rf${i}c`, 262, y + 12.5, c, 9, W.hijau)];
};
export const ADEGAN_LUAR_B_FTR_TERAPAN: AdeganStory = {
  id: "luarb-ftr-terapan",
  judul: "Rasio menguntungkan terhadap semua hasil pada contoh",
  sumber: "Metode luar: penerapan pada contoh",
  latar: "#F0FDF4",
  ketukan: [
    k("Terapkan pada contoh-contoh tadi. Kolom pertama benda, kolom kedua k dari n, kolom ketiga hasil yang tidak menguntungkan.", tambah(0, teks("jud", 150, 20, "Rasio pada contoh tadi", 11, W.ungu), teks("h1", 14, 34, "benda", 7, W.ungu, { anchor: "start" }), teks("h2", 150, 34, "k dari n", 7, W.ungu, { anchor: "start" }), teks("h3", 262, 34, "tidak untung", 6.5, W.ungu))),
    k("Koin: satu dari dua, tidak menguntungkan satu. Dadu angka enam: satu dari enam, tidak menguntungkan lima.", tambah("Koin:", barisF(0)), tambah("Dadu", barisF(1))),
    k("Permen kelompok Dhien: merah tiga dari enam, tidak menguntungkan tiga. Kotak Mantap: bola biru empat dari tujuh, tidak menguntungkan tiga.", tambah("Permen", barisF(2)), tambah("Mantap:", barisF(3))),
    k("Kotak Spektakuler: bola biru tiga dari tujuh, tidak menguntungkan empat. Perhatikan total keduanya sama, yaitu tujuh.", tambah("Spektakuler:", barisF(4)), sorotkan("sama,", "rf3", "rf4")),
    k("Contoh bingkisan: set pensil di kotak satu ada dua dari sepuluh barang, tidak menguntungkan delapan. Di kotak dua ada empat dari sebelas barang, tidak menguntungkan tujuh.", ubah("Contoh", { id: "jud", isi: "Rasio pada contoh: bingkisan" }), tambah("kotak", barisF(5)), tambah("kotak@2", barisF(6))),
    k("Lomba Dhien: kategori SD ada satu dari dua belas peserta, tidak menguntungkan sebelas. Kategori lain punya total berbeda, jadi perlu cara membandingkan.", tambah("SD", barisF(7)), tambah("berbeda,", teks("bb", 150, 204, "total berbeda → samakan total dulu", 8, W.merah))),
  ],
};

/* ------------------------------ LB3. Comparative Probability Ratio: konsep ------------------------------ */
const SEG = (id: string, x: number, y: number, n: number, isi: number, lebar: number, warna: string) =>
  Array.from({ length: n }, (_, i) => kotak(`${id}${i}`, x + (lebar / n) * i, y, lebar / n - 1.5, 22, i < isi ? warna : W.putih, W.biru, { rx: 2, tebal: 1.4 }));

export const ADEGAN_LUAR_B_CPR: AdeganStory = {
  id: "luarb-cpr",
  judul: "Comparative Probability Ratio: samakan total dulu",
  sumber: "Metode luar: Comparative Probability Ratio",
  latar: "#FDF2F8",
  ketukan: [
    k("Metode kedua: Comparative Probability Ratio, membandingkan dua rasio peluang. Masalahnya, satu dari dua dan satu dari enam punya total berbeda, jadi tidak bisa langsung dibandingkan.", tambah(0, teks("jud", 150, 24, "Comparative Probability Ratio", 11, W.ungu)), tambah("dua@3", teks("a", 80, 80, "1 dari 2", 18, W.merah), ...SEG("sa", 40, 94, 2, 1, 80, "#FDE68A")), tambah("enam", teks("b", 220, 80, "1 dari 6", 18, W.merah), ...SEG("sb", 180, 94, 6, 1, 80, "#FDE68A")), tambah("berbeda,", teks("q", 150, 160, "total berbeda: 2 dan 6", 10, W.ungu), emo("tanya", 150, 190, "❓", 18))),
    k("Solusinya: samakan total dulu. Cari total bersama paling kecil, yaitu bilangan terkecil yang habis dibagi kedua total.", bersih(0), tambah("samakan", teks("jud", 150, 34, "samakan total dulu", 14, W.hijau)), tambah("total", kotak("tb", 50, 60, 200, 50, W.putih, W.hijau, { rx: 12, tebal: 2.5 }), teks("tb1", 150, 82, "total bersama", 11), teks("tb2", 150, 100, "paling kecil", 11, W.merah)), tambah("habis", teks("hb", 150, 150, "habis dibagi kedua total", 10, W.ungu))),
    k("Untuk dua dan enam, daftar kelipatan dua adalah dua, empat, enam. Daftar kelipatan enam adalah enam. Yang pertama sama adalah enam, jadi total bersama paling kecil adalah enam.", bersih(0), tambah("kelipatan", teks("k2", 40, 60, "kelipatan 2:", 9, W.ungu, { anchor: "start" })), tambah("empat,", teks("k2a", 120, 60, "2", 14), teks("k2b", 150, 60, "4", 14)), tambah("enam@2", teks("k2c", 180, 60, "6", 14, W.merah)), tambah("kelipatan@2", teks("k6", 40, 100, "kelipatan 6:", 9, W.ungu, { anchor: "start" })), tambah("enam@4", teks("k6a", 120, 100, "6", 14, W.merah)), sorotkan("sama", "k2c", "k6a"), tambah("kecil", teks("tt", 150, 160, "total bersama = 6", 18, W.merah, { garis: W.emas }))),
    k("Ubah satu dari dua menjadi tiga dari enam, karena satu dikali tiga sama dengan tiga, dan dua dikali tiga sama dengan enam.", bersih(0), tambah(0, teks("a", 80, 40, "1 dari 2", 16, W.merah), ...SEG("sa", 40, 52, 2, 1, 80, "#FDE68A")), tambah("menjadi", panah("pa", 150, 64, 40, 0, W.hijau, 3, { gambar: true }), teks("x3", 150, 56, "× 3", 12, W.hijau)), tambah("tiga", teks("b", 230, 40, "3 dari 6", 16, W.merah), ...SEG("sb", 190, 52, 6, 3, 80, "#FDE68A")), tambah("dikali", teks("e1", 150, 130, "1 × 3 = 3", 14, W.ungu)), tambah("dikali@2", teks("e2", 150, 152, "2 × 3 = 6", 14, W.ungu))),
    k("Sekarang totalnya sama: koin tiga dari enam, dadu satu dari enam. Karena tiga lebih banyak dari satu, koin lebih mungkin.", bersih(0), tambah("koin", teks("a", 80, 36, "koin: 3 dari 6", 13, W.merah), ...SEG("sa", 40, 50, 6, 3, 80, "#FDE68A")), tambah("dadu", teks("b", 220, 36, "dadu: 1 dari 6", 13, W.merah), ...SEG("sb", 180, 50, 6, 1, 80, "#FDE68A")), tambah("tiga@2", teks("bd", 150, 130, "3  >  1", 28, W.hijau)), tambah("lebih@2", teks("hs", 150, 170, "koin lebih mungkin", 14, W.hijau))),
    k("Cara memeriksa: silang kali. Satu kali enam sama dengan enam, dan satu kali dua sama dengan dua. Karena enam lebih besar dari dua, hasilnya sama: koin lebih mungkin.", bersih(0), tambah(0, teks("p", 150, 34, "1 dari 2   lawan   1 dari 6", 12, W.ungu)), tambah("silang", garis("x1", 100, 60, 100, 50, W.merah, 2.5, { gambar: true }), garis("x2", 200, 60, -100, 50, W.merah, 2.5, { gambar: true })), tambah("enam", teks("h1", 150, 134, "1 × 6 = 6", 16, W.merah)), tambah("dua", teks("h2", 150, 156, "1 × 2 = 2", 16, W.biruMuda)), tambah("hasilnya", teks("h3", 150, 190, "6 > 2: koin lebih mungkin", 11, W.hijau))),
    k("Kalau hasil silang kali sama, kedua peluang sama besar. Contohnya tiga dari enam dan satu dari dua: tiga kali dua sama dengan enam, dan satu kali enam sama dengan enam.", bersih(0), tambah(0, teks("p", 150, 34, "3 dari 6   lawan   1 dari 2", 12, W.ungu)), tambah("tiga@2", teks("h1", 150, 90, "3 × 2 = 6", 16, W.merah)), tambah("satu@2", teks("h2", 150, 116, "1 × 6 = 6", 16, W.merah)), tambah("sama@4", teks("h3", 150, 160, "6 = 6: peluang sama besar", 12, W.hijau)), tambah("enam@4", emo("seimbang", 150, 192, "⚖️", 20))),
  ],
};

/* ------------------------------ LB4. Comparative Probability Ratio diterapkan ------------------------------ */
const hasilCPR = (i: number, y: number, a: string, b: string, kata: string) => [kotak(`h${i}`, 10, y, 280, 40, W.putih, W.hijau, { rx: 8 }), teks(`h${i}a`, 20, y + 16, a, 8.6, W.biru, { anchor: "start" }), teks(`h${i}b`, 20, y + 31, b, 8.6, W.biru, { anchor: "start" }), teks(`h${i}c`, 268, y + 24, kata, 9, W.hijau, { anchor: "end" })];
export const ADEGAN_LUAR_B_CPR_TERAPAN: AdeganStory = {
  id: "luarb-cpr-terapan",
  judul: "Membandingkan dua peluang pada contoh",
  sumber: "Metode luar: membandingkan dua peluang",
  latar: "#FFF7ED",
  ketukan: [
    k("Lomba Dhien: kategori SD satu dari dua belas peserta, kategori SMP satu dari tiga puluh lima peserta. Total bersama paling kecil dari dua belas dan tiga puluh lima adalah empat ratus dua puluh.", tambah(0, teks("jud", 150, 24, "Lomba Dhien", 12, W.ungu)), tambah("SD", teks("a", 80, 70, "SD: 1 dari 12", 13, W.merah)), tambah("SMP", teks("b", 220, 70, "SMP: 1 dari 35", 13, W.merah)), tambah("ratus", teks("t", 150, 130, "total bersama: 420", 18, W.merah, { garis: W.emas }), emo("t2", 150, 164, "🔢", 24))),
    k("Untuk SD, satu dari dua belas dikali tiga puluh lima menjadi tiga puluh lima dari empat ratus dua puluh, karena dua belas dikali tiga puluh lima sama dengan empat ratus dua puluh.", bersih(0), tambah("SD", teks("a", 80, 50, "SD", 12, W.ungu), teks("a2", 80, 80, "1 dari 12", 13), teks("a3", 80, 106, "× 35", 12, W.hijau), teks("a4", 80, 134, "35 dari 420", 15, W.merah)), tambah("sama", teks("c", 150, 180, "12 × 35 = 420", 11, W.ungu))),
    k("Untuk SMP, satu dari tiga puluh lima dikali dua belas menjadi dua belas dari empat ratus dua puluh.", tambah("SMP", teks("b", 220, 50, "SMP", 12, W.ungu), teks("b2", 220, 80, "1 dari 35", 13), teks("b3", 220, 106, "× 12", 12, W.hijau), teks("b4", 220, 134, "12 dari 420", 15, W.merah))),
    k("Karena tiga puluh lima lebih besar dari dua belas, peluang menang di kategori SD lebih besar. Cocok, kan, dengan kata keluarga Dhien tadi?", sorotkan("lima", "a4"), tambah("lebih", teks("bd", 150, 92, "35 > 12", 22, W.hijau)), tambah("SD", emo("ok", 80, 168, "✅", 24), teks("sd", 80, 194, "SD lebih mungkin", 9, W.hijau))),
    k("Contoh bingkisan, set pensil: kotak satu punya dua dari sepuluh, kotak dua punya empat dari sebelas. Total bersama seratus sepuluh, jadi dua puluh dua dari seratus sepuluh dan empat puluh dari seratus sepuluh.", bersih(0), tambah(0, teks("jud", 150, 22, "Contoh bingkisan: set pensil", 10, W.ungu)), tambah("kotak", teks("a", 80, 60, "kotak 1: 2 dari 10", 10), teks("a2", 80, 82, "× 11", 11, W.hijau), teks("a3", 80, 108, "22 dari 110", 14, W.merah)), tambah("kotak@2", teks("b", 220, 60, "kotak 2: 4 dari 11", 10), teks("b2", 220, 82, "× 10", 11, W.hijau), teks("b3", 220, 108, "40 dari 110", 14, W.merah)), tambah("seratus", teks("c", 150, 150, "total bersama: 110", 12, W.ungu))),
    k("Karena empat puluh lebih besar dari dua puluh dua, pilih kotak dua. Untuk majalah: lima dari sepuluh menjadi lima puluh lima dari seratus sepuluh, dan tiga dari sebelas menjadi tiga puluh dari seratus sepuluh. Pilih kotak satu.", bersih(0), tambah("empat", hasilCPR(0, 30, "set pensil: 40 > 22", "kotak 2: 4 dari 11 lawan kotak 1: 2 dari 10", "pilih kotak 2")), tambah("majalah", hasilCPR(1, 80, "majalah: 55 > 30", "kotak 1: 5 dari 10 lawan kotak 2: 3 dari 11", "pilih kotak 1"))),
    k("Pensil dan penghapus: kotak satu punya tiga dari sepuluh, yaitu tiga puluh tiga dari seratus sepuluh. Kotak dua punya empat dari sebelas, yaitu empat puluh dari seratus sepuluh. Pilih kotak dua.", bersih(0), tambah(0, hasilCPR(2, 30, "pensil dan penghapus: 40 > 33", "kotak 2: 4 dari 11 lawan kotak 1: 3 dari 10", "pilih kotak 2")), tambah("tiga", teks("a", 80, 110, "3 × 11 = 33", 13, W.merah)), tambah("empat", teks("b", 220, 110, "4 × 10 = 40", 13, W.merah)), tambah("Pilih", emo("ok", 150, 160, "✅", 28))),
    k("Total yang sama membuat perbandingan adil, karena kita tinggal membandingkan hasil menguntungkannya. Jadi, hasil perbandingannya dapat dipercaya.", bersih(0), tambah("sama", kotak("c", 24, 50, 252, 60, W.putih, W.emas, { rx: 14, tebal: 3 }), teks("c1", 150, 76, "total sama  →  bandingkan", 12, W.ungu), teks("c2", 150, 96, "hasil menguntungkannya saja", 12, W.merah)), tambah("Jadi,", emo("ok", 150, 150, "✅", 30))),
  ],
};
