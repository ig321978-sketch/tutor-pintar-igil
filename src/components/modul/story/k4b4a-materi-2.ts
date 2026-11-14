import type { AdeganStory } from "./logika-story";
import { W, emo, judul, kartu, kotak, penuh, sel, tabel, teks } from "./k4b4a-gambar";
import { bersih, k, sorotkan, tambah } from "./k4b4a-bantu";

/** Dimensi tutup meja menurut gambar Buku Siswa hlm. 108 dan 109: kolom kali baris satuan. */
export const MEJA = {
  uang: { kecil: [2, 4], guru: [3, 7] },
  origami: { kecil: [2, 2], guru: [3, 4] },
} as const;

/* ------------------------------ 5. Ayo Mengamati: ukuran meja dan satuan tidak baku (Buku Siswa hlm. 107; Panduan Guru hlm. 150) ------------------------------ */
const SUARA_M1 = "Ayo Mengamati. Ukuran permukaan meja lipat kecil dan meja guru berbeda. Helen mengukur luas permukaan keduanya dengan satuan tidak baku, memakai benda yang ukurannya sama.";
const SUARA_M2 = "Bendanya boleh uang kertas, kertas origami, atau kartu bergambar hewan. Yang penting, semua benda yang dipakai untuk mengukur berukuran sama.";
const SUARA_M3 = "Dalam percakapan, Bapak guru bertanya: dapatkah Helen menentukan luas permukaan meja siswa dan meja guru? Helen menjawab: bisa, dengan uang kertas.";
const SUARA_M4 = "Panduan guru menekankan bahwa satuan tidak baku itu banyak, tidak tunggal. Guru boleh meminta murid menyebut benda lain, misalnya sampul CD.";

export const ADEGAN_AMATI_SATUAN: AdeganStory = {
  id: "amati-satuan",
  judul: "Ayo Mengamati: mengukur meja dengan satuan tidak baku",
  sumber: "Buku Siswa hlm. 107; Panduan Guru hlm. 150",
  latar: "#F0F9FF",
  kutipan: [
    "Ayo Mengamati",
    "Perhatikan gambar dan bacaan berikut dengan cermat!",
    "ukuran permukaan meja lipat kecil dan",
    "meja guru berbeda.",
    "Helen mengukur luas permukaan",
    "menggunakan satuan tidak baku.",
    "memiliki ukuran yang sama sebagai",
    "Gambar A.1 (a) uang kertas, (b) kertas origami dan (c) kartu dengan tema",
    "Apakah Helen dapat menentukan",
    "luas permukaan meja siswa dan meja guru?",
    "meja dapat menggunakan uang kertas.",
    "Guru harus menekankan bahwa satuan tidak baku itu banyak (tidak",
    "Pada bagian ini Guru perlu mengarahkan peserta didik terkait satuan",
  ],
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Ayo Mengamati")),
      tambah("kecil", kotak("mj1", 30, 70, 70, 42, W.krem, W.coklat), teks("mj1t", 65, 128, "meja lipat kecil", 8.4, W.biru)),
      tambah("guru", kotak("mj2", 150, 50, 130, 74, W.hijauMuda, W.coklat), teks("mj2t", 215, 140, "meja guru", 8.4, W.biru)),
      tambah("Helen", emo("hl", 150, 184, "👧", 26)),
      tambah("tidak", teks("tb", 150, 36, "diukur dengan satuan tidak baku", 8.6, W.merah)),
    ),
    k(
      SUARA_M2,
      bersih(0),
      tambah(0, judul("Benda pengukur")),
      tambah("uang", emo("e1", 50, 78, "💵", 34), teks("e1t", 50, 98, "uang kertas", 8.4, W.biru)),
      tambah("origami,", emo("e2", 150, 78, "📄", 34), teks("e2t", 150, 98, "kertas origami", 8.4, W.biru)),
      tambah("kartu", emo("e3", 250, 78, "🃏", 34), teks("e3t", 250, 98, "kartu hewan", 8.4, W.biru)),
      tambah("sama.", ...kartu("e4", 40, 120, 220, 34, W.emas, ["ukurannya harus sama"], 9.4)),
    ),
    k(
      SUARA_M3,
      bersih(0),
      tambah(0, judul("Percakapan di kelas")),
      tambah("Bapak", emo("o1", 30, 70, "👨", 26), ...kartu("b1", 56, 34, 232, 56, W.langit, ["dapatkah Helen menentukan luas", "permukaan meja siswa dan meja guru?"], 8.2)),
      tambah("Helen@2", emo("o2", 270, 148, "👧", 26), ...kartu("b2", 20, 108, 232, 48, W.krem, ["bisa, Pak. Untuk mengukur luas", "permukaan meja pakai uang kertas."], 8.2)),
    ),
    k(
      SUARA_M4,
      bersih(0),
      tambah(0, judul("Catatan untuk guru")),
      tambah("banyak,", ...kartu("c1", 20, 34, 260, 40, W.hijauMuda, ["satuan tidak baku itu banyak,", "tidak tunggal"], 9)),
      tambah("benda", ...kartu("c2", 20, 88, 260, 34, W.krem, ["minta murid menyebut benda lain"], 9)),
      tambah("CD.", emo("c3", 150, 168, "💿", 30)),
    ),
  ],
};

/* ------------------------------ 6. Kegiatan A.1: uang kertas sebagai satuan (Buku Siswa hlm. 108) ------------------------------ */
const SUARA_A1 = "Kegiatan A satu. Satu lembar uang kertas dipakai sebagai satuan. Permukaan meja lipat kecil ditutupi uang kertas tanpa celah.";
const SUARA_A2 = "Berapa uang kertas yang menutupi meja lipat kecil? Ada dua kolom dan empat baris, jadi jumlahnya delapan uang kertas.";
const SUARA_A3 = "Permukaan meja guru juga ditutupi uang kertas tanpa celah. Ada tiga kolom dan tujuh baris, jadi jumlahnya dua puluh satu uang kertas.";
const SUARA_A4 = "Jadi satu uang kertas dapat juga disebut satu satuan luas. Luas meja lipat kecil delapan satuan luas, dan luas meja guru dua puluh satu satuan luas.";

export const ADEGAN_KEGIATAN_A1: AdeganStory = {
  id: "kegiatan-a1",
  judul: "Kegiatan A.1: uang kertas sebagai satuan luas",
  sumber: "Buku Siswa hlm. 108",
  latar: "#F0FDF4",
  kutipan: [
    "Perhatikan Kegiatan A.1 berikut dengan cermat.",
    "Kegiatan A.1.",
    "1 uang kertas",
    "Permukaan meja lipat",
    "kecil ditutupi uang",
    "kertas tanpa celah.",
    "Permukaan meja guru",
    "ditutupi uang kertas",
    "Berapa jumlah uang",
    "terdapat 8 uang kertas.",
    "terdapat 21 uang kertas.",
    "Jadi, satu uang kertas dapat juga disebut satu satuan luas.",
  ],
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Kegiatan A.1: uang kertas")),
      tambah("Satu", ...sel("u1", 24, 52, penuh(1, 1), 24, "#86EFAC"), teks("u1t", 36, 90, "1 uang kertas", 8, W.biru)),
      tambah("meja", ...sel("mk", 108, 44, penuh(2, 4), 20, "#86EFAC"), teks("mkt", 128, 138, "meja lipat kecil", 8.2, W.biru)),
    ),
    k(
      SUARA_A2,
      sorotkan("kolom", ...Array.from({ length: 4 }, (_, r) => `mk-c${r}-0`)),
      tambah("empat", teks("h1", 250, 80, "2 × 4 = 8", 11, W.hijau)),
      tambah("delapan", teks("h1b", 250, 98, "8 uang kertas", 8.6, W.hijau)),
    ),
    k(
      SUARA_A3,
      bersih(0),
      tambah(0, judul("Kegiatan A.1: meja guru")),
      tambah("meja", ...sel("mk", 24, 56, penuh(2, 4), 14, "#86EFAC"), teks("mkt", 38, 126, "meja kecil: 8", 8.2, W.biru)),
      tambah("guru", ...sel("mg", 100, 36, penuh(3, 7), 18, "#86EFAC"), teks("mgt", 127, 176, "meja guru", 8.2, W.biru)),
      tambah("tujuh", teks("h2", 242, 80, "3 × 7 = 21", 11, W.hijau)),
      tambah("uang@2", teks("h2b", 242, 98, "21 uang kertas", 8.6, W.hijau)),
    ),
    k(
      SUARA_A4,
      bersih(0),
      tambah(0, judul("Satu uang kertas = satu satuan luas")),
      tambah("satu", ...sel("mk", 40, 44, penuh(2, 4), 18, "#86EFAC"), ...sel("mg", 150, 36, penuh(3, 7), 14, "#86EFAC")),
      tambah("delapan", teks("l1", 58, 130, "8 satuan luas", 8.6, W.hijau)),
      tambah("dua", teks("l2", 172, 144, "21 satuan luas", 8.6, W.hijau)),
      tambah("Jadi", ...kartu("ln", 30, 160, 240, 28, W.emas, ["1 uang kertas = 1 satuan luas"], 9)),
    ),
  ],
};

/* ------------------------------ 7. Kegiatan A.2: kertas origami, kesimpulan, dan satuan luas (Buku Siswa hlm. 109–111) ------------------------------ */
const SUARA_B1 = "Kegiatan A dua memakai kertas origami sebagai satuan luas. Meja lipat kecil ditutupi dua kolom dan dua baris origami, jadi ada empat kertas origami.";
const SUARA_B2 = "Meja guru ditutupi tiga kolom dan empat baris origami, jadi ada dua belas kertas origami. Satu kertas origami juga disebut satu satuan luas.";
const SUARA_B3 = "Kesimpulan buku: mejanya sama, jadi luasnya sama. Kegiatan A satu: delapan dan dua puluh satu satuan luas. Kegiatan A dua: empat dan dua belas.";
const SUARA_B4 = "Helen dan Slamet menjelaskan: bilangannya berbeda karena satuan luasnya berbeda, uang kertas dan kertas origami. Daerah yang sama dapat punya luas berbeda bila satuannya berbeda.";
const SUARA_B5 = "Luas suatu permukaan dinyatakan dengan banyaknya satu satuan luas yang menutupinya tanpa celah. Satu uang kertas dan satu kertas origami masing-masing satu satuan luas.";
const SUARA_B6 = "Catatan hitungan mandiri: pada meja kecil satu origami sama dengan dua uang kertas. Maka meja guru semestinya dua puluh empat uang kertas, bukan dua puluh satu. Gambar buku tidak seukuran.";

export const ADEGAN_KEGIATAN_A2: AdeganStory = {
  id: "kegiatan-a2",
  judul: "Kegiatan A.2: kertas origami dan kesimpulan",
  sumber: "Buku Siswa hlm. 109–111",
  latar: "#FDF2F8",
  kutipan: [
    "Kegiatan A.2",
    "menggunakan kertas",
    "origami sebagai satuan luas.",
    "1 kertas origami",
    "terdapat 4",
    "terdapat 12 kertas origami.",
    "Jadi, satu kertas origami dapat juga disebut satu satuan luas",
    "Pada kegiatan A.1. : Luas permukaan meja lipat kecil adalah 8 satuan luas",
    "Luas permukaan meja guru adalah 21 satuan luas.",
    "Pada kegiatan A.2. : Luas permukaan meja lipat kecil adalah 4 satuan luas.",
    "Luas permukaan meja guru adalah 12 satuan luas.",
    "Karena satuan luas yang digunakan",
    "Jadi, daerah yang sama tetapi memiliki luas yang berbeda karena menggunakan",
    "1 uang kertas = 1 kertas origami= 1 satuan luas",
    "Luas suatu tempat atau permukaan benda dinyatakan dengan banyaknya",
    "celah.",
  ],
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Kegiatan A.2: kertas origami")),
      tambah("origami", ...sel("o1", 24, 52, penuh(1, 1), 24, W.pink), teks("o1t", 36, 90, "1 kertas origami", 8, W.biru)),
      tambah("meja", ...sel("ok", 120, 44, penuh(2, 2), 36, W.pink), teks("okt", 156, 130, "meja lipat kecil", 8.2, W.biru)),
      tambah("empat", teks("q1", 252, 80, "2 × 2 = 4", 11, W.hijau)),
    ),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, judul("Kegiatan A.2: meja guru")),
      tambah("Meja", ...sel("ok", 24, 50, penuh(2, 2), 22, W.pink), teks("okt", 46, 110, "meja kecil: 4", 8.2, W.biru)),
      tambah("tiga", ...sel("og", 120, 40, penuh(3, 4), 26, W.pink), teks("ogt", 159, 160, "meja guru", 8.2, W.biru)),
      tambah("belas", teks("q2", 250, 80, "3 × 4 = 12", 11, W.hijau)),
      tambah("Satu", teks("q2b", 250, 98, "12 origami", 8.6, W.hijau)),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Luas dua meja, dua satuan")),
      tambah("Kesimpulan", ...tabel("tb", 6, 38, [96, 96, 98], [["satuan", "meja kecil", "meja guru"], ["A.1 uang kertas", "8", "21"], ["A.2 origami", "4", "12"]], 26, 9)),
      sorotkan("delapan", "tb-t10", "tb-t11", "tb-t12"),
      sorotkan("empat", "tb-t20", "tb-t21", "tb-t22"),
      tambah("belas.", teks("tn", 150, 138, "mejanya sama, luasnya sama", 9.4, W.coklat)),
    ),
    k(
      SUARA_B4,
      bersih(0),
      tambah(0, judul("Mengapa bilangannya berbeda?")),
      tambah("Helen", ...kartu("d1", 14, 34, 272, 38, W.krem, ["satuan luas yang dipakai berbeda", "(uang kertas dan kertas origami)"], 8.4)),
      tambah("uang", emo("d2", 70, 110, "💵", 34), emo("d3", 230, 110, "📄", 34)),
      tambah("Daerah", ...kartu("d4", 20, 134, 260, 38, W.emas, ["daerah sama, luas berbeda,", "karena satuannya berbeda"], 8.8)),
    ),
    k(
      SUARA_B5,
      bersih(0),
      tambah(0, judul("Satuan luas")),
      tambah("Luas", ...kartu("e1", 14, 32, 272, 52, W.langit, ["luas = banyaknya 1 satuan luas yang", "menutupi permukaan tanpa celah"], 9)),
      tambah("uang", ...kartu("e2", 14, 104, 272, 44, W.hijauMuda, ["1 uang kertas = 1 kertas origami", "= 1 satuan luas"], 9)),
    ),
    k(
      SUARA_B6,
      bersih(0),
      tambah(0, judul("Catatan: dua meja tidak cocok")),
      tambah("meja", ...kartu("f1", 14, 34, 272, 28, W.krem, ["meja kecil: 4 origami = 8 uang kertas"], 8.8)),
      tambah("kecil", teks("f1b", 150, 80, "1 origami = 2 uang kertas", 9, W.biru)),
      tambah("guru", ...kartu("f2", 14, 94, 272, 28, W.langit, ["meja guru: 12 origami"], 8.8)),
      tambah("semestinya", teks("f3", 150, 148, "12 × 2 = 24 uang kertas", 10.4, W.hijau)),
      tambah("satu@2", teks("f4", 150, 174, "buku menulis 21, bukan 24", 9, W.merah)),
    ),
  ],
};

/* ------------------------------ 8. Persegi satuan dan Aktivitas 2 (Buku Siswa hlm. 112–114; Panduan Guru hlm. 150–151) ------------------------------ */
const SUARA_C1 = "Uang kertas dan kertas origami adalah satuan luas tidak baku. Satuan tidak baku juga dapat berupa persegi satuan, dan satuan yang dipakai harus seragam.";
const SUARA_C2 = "Aktivitas dua, Konsep Luas dengan Persegi Satuan. Kelompok menyiapkan kertas HVS, buku tulis, gunting, dan penggaris, lalu memotong kertas HVS menjadi persegi.";
const SUARA_C3 = "Pertama, lipat kertas persegi menjadi empat bagian yang sama. Kedua, lipat menjadi enam belas bagian. Lalu coba persegi satuan yang lebih kecil lagi.";
const SUARA_C4 = "Menurut buku, luas kertas pada langkah lima adalah empat persegi satuan, dan pada langkah enam enam belas persegi satuan.";
const SUARA_C5 = "Panduan guru menegaskan: kertas HVS itu luasnya berbeda menurut persegi satuannya, misalnya empat atau enam belas persegi satuan.";

export const ADEGAN_SATUAN_PERSEGI: AdeganStory = {
  id: "satuan-persegi",
  judul: "Persegi satuan dan Aktivitas 2",
  sumber: "Buku Siswa hlm. 112–114; Panduan Guru hlm. 150–151",
  latar: "#FFFBEB",
  kutipan: [
    "Uang kertas dan kertas origami merupakan satuan luas tidak baku.",
    "Satuan luas tidak baku dapat juga menggunakan persegi satuan.",
    "Kalian dapat menggunakan satuan luas yang seragam.",
    "Aktivitas 2 : Konsep Luas dengan Persegi Satuan",
    "Buku tulis",
    "Kertas HVS",
    "Potong kertas HVS menjadi bentuk persegi.",
    "Pertama, lipatlah kertas tersebut menjadi 4 bagian yang sama.",
    "Kedua, Lipatlah kertas tersebut menjadi 16 bagian yang sama.",
    "Tahukah kalian luas kertas di Aktivitas 2 pada nomor 5 dan 6?",
    "adalah 4 persegi satuan dan luas kertas di",
    "nomor 6 pada Aktivitas 2 adalah 16 persegi",
    "Mengarahkan peserta didik untuk melipat kertas tersebut menjadi 4 bagian,",
    "16 bagian, dan seterusnya.",
  ],
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Persegi satuan")),
      tambah("uang", emo("p1", 60, 64, "💵", 30), emo("p2", 120, 64, "📄", 30)),
      tambah("tidak", ...kartu("p3", 14, 84, 272, 28, W.langit, ["keduanya: satuan luas tidak baku"], 8.8)),
      tambah("persegi", ...sel("p4", 100, 128, penuh(1, 1), 28, W.hijauMuda), teks("p4t", 160, 146, "persegi satuan", 9, W.biru)),
      tambah("seragam.", teks("p5", 150, 186, "satuan yang dipakai harus seragam", 8.8, W.merah)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Aktivitas 2: persegi satuan")),
      tambah("HVS,", ...kartu("q1", 10, 32, 136, 26, W.krem, ["kertas HVS"], 8.4)),
      tambah("buku", ...kartu("q2", 154, 32, 136, 26, W.langit, ["buku tulis"], 8.4)),
      tambah("gunting,", ...kartu("q3", 10, 64, 136, 26, W.pink, ["gunting"], 8.4)),
      tambah("penggaris,", ...kartu("q4", 154, 64, 136, 26, W.hijauMuda, ["penggaris"], 8.4)),
      tambah("persegi.", ...sel("q5", 110, 104, penuh(1, 1), 80, W.krem), teks("q5t", 150, 150, "kertas HVS dipotong persegi", 8.4, W.biru)),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Melipat kertas persegi")),
      tambah("empat", ...sel("r1", 40, 44, penuh(2, 2), 40, W.krem), teks("r1t", 80, 142, "4 bagian", 9.4, W.biru)),
      tambah("belas", ...sel("r2", 180, 44, penuh(4, 4), 20, W.hijauMuda), teks("r2t", 220, 142, "16 bagian", 9.4, W.biru)),
      tambah("lagi.", teks("r3", 150, 176, "lipat lagi: persegi satuan makin kecil", 8.8, W.merah)),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, judul("Luas kertas lipatan")),
      tambah("langkah", ...sel("s1", 40, 40, penuh(2, 2), 30, W.krem), teks("s3", 70, 118, "langkah 5", 8.4, W.coklat)),
      tambah("empat", teks("s1t", 70, 130, "4 persegi satuan", 8.4, W.hijau)),
      tambah("langkah@2", ...sel("s2", 180, 40, penuh(4, 4), 15, W.hijauMuda), teks("s4", 210, 118, "langkah 6", 8.4, W.coklat)),
      tambah("belas", teks("s2t", 210, 130, "16 persegi satuan", 8.4, W.hijau)),
    ),
    k(
      SUARA_C5,
      bersih(0),
      tambah(0, judul("Satu kertas, dua luasan")),
      tambah("kertas", ...sel("t0", 100, 36, penuh(1, 1), 100, W.krem), teks("t0t", 150, 94, "kertas HVS", 9, W.biru)),
      tambah("empat", ...kartu("t1", 14, 150, 130, 28, W.hijauMuda, ["4 persegi satuan"], 8.8)),
      tambah("enam", ...kartu("t2", 156, 150, 130, 28, W.langit, ["16 persegi satuan"], 8.8)),
      sorotkan("belas", "t2-k"),
    ),
  ],
};
