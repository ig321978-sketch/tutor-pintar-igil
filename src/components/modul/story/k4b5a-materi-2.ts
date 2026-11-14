import type { AdeganStory } from "./logika-story";
import { W, bentuk, bulat, emo, garis, judul, kartu, kotak, sisiGaris, tabel, tandaSiku, teks, titikBangun } from "./k4b5a-gambar";
import { bersih, idx, k, sorotkan, tambah } from "./k4b5a-bantu";

/* ------------------------------ 5. Segi banyak beraturan dan tak beraturan (Buku Siswa hlm. 145–146) ------------------------------ */
const SUARA_B1 = "Berdasarkan besar sudut dan panjang sisinya, segi banyak dibedakan menjadi dua jenis: segi banyak beraturan dan segi banyak tak beraturan.";
const SUARA_B2 = "Segi banyak beraturan: besar sudut-sudutnya sama, panjang sisi-sisinya sama, serta simetri lipat dan simetri putarnya sama dengan jumlah sudutnya.";
const SUARA_B2B = "Contohnya segitiga, segiempat, segilima, segienam, dan segidelapan beraturan.";
const SUARA_B3 = "Segi banyak tak beraturan: besar sudutnya tidak sama, panjang sisinya tidak sama, dan simetri lipat serta simetri putarnya tidak sama dengan jumlah sudutnya. Contohnya bangun-bangun lain pada gambar buku.";

export const ADEGAN_BERATURAN: AdeganStory = {
  id: "beraturan",
  judul: "Segi banyak beraturan dan tak beraturan",
  sumber: "Buku Siswa hlm. 145–146",
  latar: "#F0FDF4",
  kutipan: [
    "A. Jenis Bangun Segi Banyak",
    "Berdasarkan besar sudut dan panjang sisinya, bangun segi banyak dibedakan",
    "menjadi dua jenis, yaitu :",
    "1) Bangun segi banyak beraturan",
    "a. Besarnya sudut-sudut dari segi banyak beraturan adalah sama",
    "b. Panjangnya sisi-sisi segi banyak beraturan adalah sama",
    "simetri lipat yang sama dengan jumlah",
    "d. Segi banyak beraturan mempunyai simetri putar yang sama dengan jumlah",
    "Segidelapan",
    "2) Bangun segi banyak tak beraturan",
    "Bangun segi banyak tak beraturan adalah bangun segi banyak yang mempunyai",
    "b. Panjangnya sisi-sisi segi banyak beraturan adalah tidak sama",
  ],
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Dua jenis segi banyak")),
      tambah("beraturan", ...kartu("ba", 10, 34, 135, 36, W.hijauMuda, ["segi banyak", "beraturan"], 9.4)),
      tambah("tak", ...kartu("bt", 155, 34, 135, 36, W.merahMuda, ["segi banyak", "tak beraturan"], 9.4)),
      tambah("beraturan", bentuk("bs1", 60, 92, "segilima", W.hijauMuda, 1.3)),
      tambah("beraturan@2", bentuk("bs2", 212, 94, "tak-beraturan", W.merahMuda, 1.3)),
      tambah("jenis:", teks("bj", 150, 190, "2 jenis", 9.4, W.coklat)),
    ),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, judul("Segi banyak beraturan")),
      tambah("sudut-sudutnya", ...kartu("c1", 10, 28, 280, 22, W.hijauMuda, ["sudut-sudutnya sama besar"], 8.6)),
      tambah("sisi-sisinya", ...kartu("c2", 10, 54, 280, 22, W.langit, ["sisi-sisinya sama panjang"], 8.6)),
      tambah("simetri", ...kartu("c3", 10, 80, 280, 22, W.krem, ["simetri sama dengan jumlah sudut"], 8.6)),
    ),
    k(
      SUARA_B2B,
      tambah(idx(SUARA_B2B, "segitiga"), bentuk("r3", 8, 112, "sama-sisi", W.hijauMuda), teks("n3", 33, 172, "segitiga", 7.4)),
      tambah(idx(SUARA_B2B, "segiempat"), bentuk("r4", 68, 114, "persegi", W.langit), teks("n4", 88, 172, "segiempat", 7.4)),
      tambah(idx(SUARA_B2B, "segilima"), bentuk("r5", 118, 108, "segilima", W.krem), teks("n5", 142, 172, "segilima", 7.4)),
      tambah(idx(SUARA_B2B, "segienam"), bentuk("r6", 176, 108, "segienam", W.pink), teks("n6", 200, 172, "segienam", 7.4)),
      tambah(idx(SUARA_B2B, "segidelapan"), bentuk("r8", 234, 108, "segidelapan", W.jingga), teks("n8", 258, 172, "segidelapan", 7.4)),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Segi banyak tak beraturan")),
      tambah("sudutnya", ...kartu("c1", 10, 28, 280, 22, W.merahMuda, ["sudut-sudutnya tidak sama besar"], 8.6)),
      tambah("sisinya", ...kartu("c2", 10, 54, 280, 22, W.langit, ["sisi-sisinya tidak sama panjang"], 8.6)),
      tambah("simetri", ...kartu("c3", 10, 80, 280, 22, W.krem, ["simetri tidak sama dengan jumlah sudut"], 8.6)),
      tambah("Contohnya", bentuk("u1", 8, 118, "siku", W.hijauMuda, 0.8)),
      tambah("bangun-bangun", bentuk("u2", 62, 122, "perpanjang", W.langit, 0.8), bentuk("u3", 114, 122, "jajar", W.pink, 0.7)),
      tambah("lain", bentuk("u4", 168, 122, "trapesium", W.krem, 0.8), bentuk("u5", 236, 116, "tak-beraturan", W.jingga)),
      tambah("buku.", teks("ub", 150, 176, "contoh di gambar buku", 8.6, W.coklat)),
    ),
  ],
};

/* ------------------------------ 6. Ayo Berlatih segi banyak (Buku Siswa hlm. 146–147; Panduan Guru hlm. 182) ------------------------------ */
const SUARA_L1 = "Ayo Berlatih satu: pilih bangun yang bukan segi banyak. Pilihannya belah ketupat, lingkaran, segitiga, dan trapesium. Kuncinya b, lingkaran, karena tidak dibatasi ruas garis.";
const SUARA_L2 = "Nomor dua: persegi, persegi panjang, segitiga siku-siku, dan segitiga sama sisi. Yang beraturan adalah persegi dan segitiga sama sisi, nomor satu dan empat, pilihan b.";
const SUARA_L3 = "Nomor tiga: segitiga siku-siku, belah ketupat, trapesium, dan persegi. Kunci buku untuk bangun yang tak beraturan adalah a, yaitu satu dan tiga.";
const SUARA_L4 = "Catatan guru: belah ketupat sisinya sama, tetapi sudutnya tidak, jadi ia juga tak beraturan. Maka nomor dua dan tiga juga benar, sehingga pilihan c ikut benar.";
const SUARA_L5 = "Nomor empat dan lima meminta menggambar tiga segi banyak beraturan dan tiga yang tak beraturan. Kunci panduan guru mengosongkannya, jadi bebas selama ciri bangunnya benar.";

export const ADEGAN_BERLATIH_BANYAK: AdeganStory = {
  id: "berlatih-segibanyak",
  judul: "Ayo Berlatih: segi banyak",
  sumber: "Buku Siswa hlm. 146–147; Panduan Guru hlm. 182",
  latar: "#FFF7ED",
  kutipan: [
    "Ayo Berlatih",
    "Petunjuk: Kerjakan semua soal pada buku tulis dan cermati soalnya sebelum",
    "1. Perhatikan gambar dibawah. Bangun datar yang bukan merupakan segi",
    "banyak adalah…",
    "2. Perhatikan gambar dibawah ini :",
    "Bangun segibanyak beraturan, ditunjukkan oleh nomor …",
    "a. 1 dan 3",
    "b. 1 dan 4",
    "3. Perhatikan gambar dibawah ini :",
    "Bangun segibanyak tak beraturan, ditunjukkan oleh nomor …",
    "c. 2 dan 3",
    "4. Gambarkan tiga bangun segi banyak beraturan yang berbeda pada kotak",
    "5. Gambarkan tiga bangun segi banyak tak beraturan yang berbeda pada",
    "Guru memberi kesempatan kepada peserta didik untuk mengerjakan Latihan",
    "1 di buku siswa. Adapun salah satu alternatif jawaban pada Latihan 1 adalah:",
  ],
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Ayo Berlatih 1")),
      tambah("pilih", ...kartu("q", 10, 28, 280, 26, W.krem, ["mana yang bukan segi banyak?"], 9)),
      tambah("belah", bentuk("oa", 14, 70, "belah", W.langit, 0.9), teks("la", 36, 124, "a", 11, W.biru)),
      tambah(idx(SUARA_L1, "lingkaran"), bulat("ob", 112, 90, 18, W.pink, W.biru), teks("lb", 112, 124, "b", 11, W.biru)),
      tambah(idx(SUARA_L1, "segitiga"), bentuk("oc", 166, 70, "lancip", W.hijauMuda, 0.8), teks("lc", 190, 124, "c", 11, W.biru)),
      tambah(idx(SUARA_L1, "trapesium"), bentuk("od", 236, 74, "trapesium", W.krem, 0.9), teks("ld", 260, 124, "d", 11, W.biru)),
      tambah("Kuncinya", ...kartu("kn", 40, 146, 220, 28, W.emas, ["kunci: b, lingkaran"], 9.4)),
      sorotkan(idx(SUARA_L1, "lingkaran", 2), "ob", "lb"),
    ),
    k(
      SUARA_L2,
      bersih(0),
      tambah(0, judul("Ayo Berlatih 2")),
      tambah(idx(SUARA_L2, "persegi"), bentuk("p1", 20, 48, "persegi", W.hijauMuda), teks("m1", 40, 108, "1", 11, W.biru)),
      tambah(idx(SUARA_L2, "panjang"), bentuk("p2", 82, 54, "perpanjang", W.langit, 0.9), teks("m2", 107, 108, "2", 11, W.biru)),
      tambah(idx(SUARA_L2, "siku-siku"), bentuk("p3", 156, 48, "siku", W.krem, 0.8), teks("m3", 178, 108, "3", 11, W.biru)),
      tambah(idx(SUARA_L2, "sisi"), bentuk("p4", 222, 48, "sama-sisi", W.pink, 0.9), teks("m4", 245, 108, "4", 11, W.biru)),
      sorotkan(idx(SUARA_L2, "persegi", 3), "p1@persegi"),
      sorotkan(idx(SUARA_L2, "sisi", 2), "p4@sama-sisi"),
      tambah("pilihan", ...kartu("kn", 40, 140, 220, 30, W.emas, ["kunci: b (1 dan 4)"], 9.4)),
    ),
    k(
      SUARA_L3,
      bersih(0),
      tambah(0, judul("Ayo Berlatih 3")),
      tambah("siku-siku,", bentuk("r1", 20, 48, "siku", W.hijauMuda, 0.9), teks("n1", 42, 112, "1", 11, W.biru)),
      tambah("belah", bentuk("r2", 94, 50, "belah", W.langit, 0.9), teks("n2", 116, 112, "2", 11, W.biru)),
      tambah("trapesium,", bentuk("r3", 152, 54, "trapesium", W.krem, 0.9), teks("n3", 176, 112, "3", 11, W.biru)),
      tambah("persegi.", bentuk("r4", 226, 48, "persegi", W.pink), teks("n4", 246, 112, "4", 11, W.biru)),
      tambah("Kunci", ...kartu("kn", 40, 138, 220, 30, W.emas, ["kunci buku: a (1 dan 3)"], 9.4)),
    ),
    k(
      SUARA_L4,
      bersih(0),
      tambah(0, judul("Catatan guru: nomor 3")),
      tambah(0, bentuk("bk", 30, 44, "belah", W.langit, 1.6)),
      tambah("sisinya", ...[0, 1, 2, 3].map((i) => sisiGaris(`bg${i}`, 30, 44, "belah", i, W.merah, 1.6, 3))),
      tambah("sudutnya", teks("ta", 74, 38, "tumpul", 8.4, W.biru), teks("tl", 148, 92, "lancip", 8.4, W.biru)),
      tambah("beraturan.", ...kartu("kk", 192, 52, 100, 46, W.merahMuda, ["sisi sama", "sudut tidak sama"], 8.4)),
      tambah("pilihan", ...kartu("kn", 20, 156, 260, 30, W.emas, ["pilihan a dan c sama-sama benar"], 8.6)),
    ),
    k(
      SUARA_L5,
      bersih(0),
      tambah(0, judul("Ayo Berlatih 4 dan 5")),
      tambah("beraturan", teks("g1", 150, 38, "beraturan", 9, W.hijau)),
      tambah("tiga", ...[0, 1, 2].map((i) => kotak(`bx${i}`, 10 + i * 100, 46, 88, 50, W.putih, W.biru, { rx: 4 }))),
      tambah("tak", teks("g2", 150, 114, "tak beraturan", 9, W.merah), ...[0, 1, 2].map((i) => kotak(`by${i}`, 10 + i * 100, 122, 88, 50, W.putih, W.biru, { rx: 4 }))),
      tambah("mengosongkannya,", bentuk("e1", 28, 54, "sama-sisi", W.hijauMuda, 0.8), bentuk("e2", 134, 56, "persegi", W.langit, 0.8), bentuk("e3", 228, 52, "segilima", W.krem, 0.7), bentuk("f1", 24, 130, "siku", W.hijauMuda, 0.7), bentuk("f2", 124, 134, "jajar", W.pink, 0.7), bentuk("f3", 232, 130, "tak-beraturan", W.jingga, 0.9)),
      tambah("Kunci", teks("g3", 150, 192, "kunci dikosongkan: bebas", 8.6, W.coklat)),
    ),
  ],
};

/* ------------------------------ 7. Segitiga: sisi, sudut, titik sudut (Buku Siswa hlm. 147–148; Panduan Guru hlm. 182–183) ------------------------------ */
const SUARA_T1 = "Banyak benda di sekitar kita berbentuk segitiga, seperti penggaris segitiga dan rambu lalu lintas. Buku memisalkan satu segitiga bernama segitiga ABC.";
const SUARA_T2 = "Dalam segitiga ABC terdapat tiga ruas garis, yaitu AB, BC, dan AC. Ketiga ruas garis itu dinamakan sisi, sehingga segitiga memiliki tiga sisi: sisi AB, sisi BC, dan sisi AC.";
const SUARA_T3 = "Segitiga juga memiliki tiga sudut, yaitu sudut A, sudut B, dan sudut C. Titik pertemuan sisinya disebut titik sudut, jadi ada tiga titik sudut: titik A, titik B, dan titik C.";
const SUARA_T4 = "Ciri-cirinya: tiga sisi, tiga sudut, dan tiga titik sudut. Segitiga adalah bangun datar yang memiliki tiga sudut, dan segitiga adalah segi banyak yang memiliki tiga sisi.";
/** Segitiga ABC pada Buku Siswa hlm. 147, digambar dengan bangun `sembarang`: B di puncak, C di kanan-bawah, A di kiri-bawah. */
const abc = (id: string, x: number, y: number, s: number) => [
  bentuk(id, x, y, "sembarang", W.langit, s),
  teks(`${id}-A`, x - 9, y + 46 * s + 8, "A", 10, W.merah),
  teks(`${id}-B`, x + 12 * s, y - 5, "B", 10, W.merah),
  teks(`${id}-C`, x + 56 * s + 9, y + 40 * s + 8, "C", 10, W.merah),
];

export const ADEGAN_SEGITIGA: AdeganStory = {
  id: "segitiga",
  judul: "Segitiga: tiga sisi, tiga sudut, tiga titik sudut",
  sumber: "Buku Siswa hlm. 147–148; Panduan Guru hlm. 182–183",
  latar: "#EFF6FF",
  kutipan: [
    "2. Segitiga",
    "Banyak benda di sekitar kita yang berbentuk segitiga seperti penggaris",
    "segitiga, rambu lalu lintas dan lain-lain.",
    "Misalkan nama segitiga tersebut adalah",
    "dalam segitiga terdapat 3 ruas garis yaitu ruas garis AB, BC, dan AC.",
    "masing-masing dinamakan dengan sisi;",
    "sehingga segitiga memiliki 3 sisi, yakni sisi AB, sisi BC, dan sisi AC.",
    "Dalam segitiga itu juga terdapat 3 sudut, yakni sudut A, sudut B, dan sudut C.",
    "Terdapat juga 3 titik sudut, yakni titik A, titik B, dan titik C.",
    "memiliki 3 sisi, memiliki 3 sudut, dan memiliki 3 titik sudut.",
    "1. Segitiga adalah bangun datar yang memiliki 3 sudut.",
    "2. Segitiga adalah segi banyak yang memiliki 3 sisi.",
  ],
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Segitiga di sekitar kita")),
      tambah("penggaris", emo("e1", 70, 76, "📐", 38), teks("e1t", 70, 98, "penggaris segitiga", 8, W.biru)),
      tambah("rambu", emo("e2", 232, 76, "⚠", 38), teks("e2t", 232, 98, "rambu lalu lintas", 8, W.biru)),
      tambah("ABC.", ...abc("ta", 112, 124, 1.1)),
    ),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Sisi segitiga"), ...abc("tb", 94, 40, 1.8)),
      tambah(idx(SUARA_T2, "AB"), sisiGaris("sab", 94, 40, "sembarang", 2, W.merah, 1.8), teks("lab", 92, 82, "AB", 9.4, W.merah, { anchor: "end" })),
      tambah(idx(SUARA_T2, "BC"), sisiGaris("sbc", 94, 40, "sembarang", 0, W.hijau, 1.8), teks("lbc", 166, 66, "BC", 9.4, W.hijau, { anchor: "start" })),
      tambah(idx(SUARA_T2, "AC"), sisiGaris("sca", 94, 40, "sembarang", 1, W.ungu, 1.8), teks("lca", 148, 138, "AC", 9.4, W.ungu)),
      tambah(idx(SUARA_T2, "sisi", 2), ...kartu("t3s", 206, 150, 88, 28, W.emas, ["3 sisi"], 10)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Sudut dan titik sudut"), ...abc("tc", 94, 40, 1.8)),
      tambah("sudut", ...kartu("u3", 202, 50, 90, 26, W.hijauMuda, ["3 sudut"], 9.4)),
      tambah("titik", ...[0, 1, 2].map((i) => bulat(`tt${i}`, titikBangun(94, 40, "sembarang", i, 1.8)[0], titikBangun(94, 40, "sembarang", i, 1.8)[1], 3.6, W.merah, W.putih, { tebal: 1 }))),
      tambah(idx(SUARA_T3, "titik", 3), ...kartu("t3t", 202, 86, 90, 26, W.krem, ["3 titik sudut"], 9.4)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Ciri segitiga")),
      tambah("sisi,", ...kartu("c1", 30, 32, 240, 26, W.hijauMuda, ["memiliki 3 sisi"], 9.4)),
      tambah("sudut,", ...kartu("c2", 30, 64, 240, 26, W.langit, ["memiliki 3 sudut"], 9.4)),
      tambah("titik", ...kartu("c3", 30, 96, 240, 26, W.krem, ["memiliki 3 titik sudut"], 9.4)),
      tambah(idx(SUARA_T4, "segi"), ...kartu("c4", 30, 134, 240, 44, W.emas, ["segitiga adalah segi banyak", "dengan 3 sisi"], 9)),
    ),
  ],
};

/* ------------------------------ 8. Aktivitas 2: segitiga menurut sisinya (Buku Siswa hlm. 149–153; Panduan Guru hlm. 183–185) ------------------------------ */
const SUARA_G1 = "Aktivitas dua, segitiga menurut sisinya. Potong sedotan jadi tiga bagian sama panjang, lalu tiga bagian dengan dua yang sama, lalu tiga bagian yang semuanya berbeda, dan sambung dengan benang.";
const SUARA_G2 = "Hasilnya segitiga sama kaki dan segitiga sama sisi. Segitiga sama kaki punya dua sisi sama panjang, AC sama dengan BC. Segitiga sama sisi punya tiga sisi sama panjang, PQ, QR, dan PR.";
const SUARA_G3 = "Hasil ketiga: segitiga sembarang, yang sisi-sisinya tidak ada yang sama panjang, yaitu DE, EF, dan DF berbeda.";
const SUARA_G4 = "Dalam tabel buku, semua segitiga memiliki tiga sisi. Dua sisi sama panjang dimiliki sama kaki dan sama sisi, bukan sembarang. Tiga sisi sama panjang hanya dimiliki sama sisi.";
const SUARA_G5 = "Panduan guru bertanya: adakah ciri segitiga sama kaki yang tidak dimiliki sama sisi? Tidak ada. Sebaliknya, tiga sisi sama panjang hanya dimiliki sama sisi. Jadi segitiga sama sisi juga dapat dinamakan segitiga sama kaki.";
const batang = (id: string, x: number, y: number, p: number, warna: string) => garis(id, x, y, p, 0, warna, 5);

export const ADEGAN_SEGITIGA_SISI: AdeganStory = {
  id: "segitiga-sisi",
  judul: "Aktivitas 2: segitiga menurut sisinya",
  sumber: "Buku Siswa hlm. 149–153; Panduan Guru hlm. 183–185",
  latar: "#F0FDF4",
  kutipan: [
    "Aktivitas 2. Pengelompokan segitiga berdasarkan sisinya",
    "- Sedotan/lidi",
    "- Benang/tali",
    "1. Potong sedotan/lidi menjadi 3 bagian sama panjang",
    "5. Potong sedotan dengan menjadi 3 bagian dengan 2 bagian yang sama",
    "Memiliki 3 sisi",
    "Memiliki 2 sisi sama",
    "Memiliki 3 sisi",
    "sama panjang",
    "Segitiga sama kaki memiliki 2 sisi yang",
    "ditulis AC = BC.",
    "Segitiga sama sisi adalah segitiga yang semua sisinya sama panjang",
    "Segitiga sembarang adalah segitiga yang sisi-sisinya tidak ada yang sama",
    "ditulis DE ≠ EF ≠ DF.",
    "Setelah mempelajari sifat-sifat segitiga berdasarakan sisinya tersebut, dapat",
    "c. Apakah ada ciri segitiga sama kaki yang tidak dimiliki segitiga sama sisi?",
    "Jawab : Tidak ada",
    "Segitiga sama sisi dapat disebut juga sebagai segitiga sama kaki",
  ],
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Aktivitas 2: tiga potong sedotan")),
      tambah("panjang", batang("a1", 14, 50, 44, W.merah), batang("a2", 66, 50, 44, W.hijau), batang("a3", 118, 50, 44, W.biru), ...kartu("k1", 192, 38, 98, 26, W.hijauMuda, ["ketiganya sama"], 8.2)),
      tambah(idx(SUARA_G1, "dua", 2), batang("b1", 14, 100, 44, W.merah), batang("b2", 66, 100, 44, W.hijau), batang("b3", 118, 100, 66, W.biru), ...kartu("k2", 192, 88, 98, 26, W.krem, ["dua sama"], 8.2)),
      tambah("berbeda.", batang("c1", 14, 150, 30, W.merah), batang("c2", 52, 150, 48, W.hijau), batang("c3", 108, 150, 66, W.biru), ...kartu("k3", 192, 138, 98, 26, W.pink, ["semua berbeda"], 8.2)),
    ),
    k(
      SUARA_G2,
      bersih(0),
      tambah(0, judul("Sama kaki dan sama sisi")),
      tambah("Hasilnya", bentuk("kk", 34, 44, "sama-kaki", W.hijauMuda, 1.5), teks("kc", 71, 40, "C", 9.4, W.biru), teks("ka", 24, 124, "A", 9.4, W.biru), teks("kb", 119, 124, "B", 9.4, W.biru)),
      tambah(idx(SUARA_G2, "AC"), sisiGaris("kk0", 34, 44, "sama-kaki", 0, W.merah, 1.5), sisiGaris("kk2", 34, 44, "sama-kaki", 2, W.merah, 1.5), teks("kt", 77, 148, "AC = BC", 9.4, W.merah)),
      tambah("sisi", bentuk("ss", 178, 44, "sama-sisi", W.langit, 1.5), teks("sr", 215, 40, "R", 9.4, W.biru), teks("sp", 168, 118, "P", 9.4, W.biru), teks("sq", 262, 118, "Q", 9.4, W.biru)),
      tambah(idx(SUARA_G2, "PQ"), ...[0, 1, 2].map((i) => sisiGaris(`ss${i}`, 178, 44, "sama-sisi", i, W.merah, 1.5)), teks("st", 220, 148, "PQ = QR = PR", 9.4, W.merah)),
    ),
    k(
      SUARA_G3,
      bersih(0),
      tambah(0, judul("Segitiga sembarang")),
      tambah("ketiga", bentuk("sm", 86, 36, "sembarang", W.pink, 2)),
      tambah("sembarang,", teks("sf", 110, 32, "F", 9.4, W.biru), teks("sd", 76, 140, "D", 9.4, W.biru), teks("se", 206, 130, "E", 9.4, W.biru)),
      tambah(idx(SUARA_G3, "DE"), sisiGaris("m1", 86, 36, "sembarang", 2, W.merah, 2), sisiGaris("m2", 86, 36, "sembarang", 0, W.hijau, 2), sisiGaris("m3", 86, 36, "sembarang", 1, W.ungu, 2)),
      tambah("berbeda.", ...kartu("mk", 40, 158, 220, 28, W.emas, ["DE ≠ EF ≠ DF"], 10)),
    ),
    k(
      SUARA_G4,
      bersih(0),
      tambah(0, judul("Tabel ciri segitiga")),
      tambah("tabel", ...tabel("gt", 8, 34, [92, 64, 64, 64], [["Ciri", "sama kaki", "sama sisi", "sembarang"]], 22, 7.6)),
      tambah(idx(SUARA_G4, "tiga"), ...tabel("g1", 8, 56, [92, 64, 64, 64], [["3 sisi", "✓", "✓", "✓"]], 22, 9)),
      tambah(idx(SUARA_G4, "Dua"), ...tabel("g2", 8, 78, [92, 64, 64, 64], [["2 sisi sama", "✓", "✓", "–"]], 22, 9)),
      tambah(idx(SUARA_G4, "tiga", 2), ...tabel("g3", 8, 100, [92, 64, 64, 64], [["3 sisi sama", "–", "✓", "–"]], 22, 9)),
      tambah("hanya", ...kartu("gk", 40, 140, 220, 30, W.emas, ["3 sisi sama: hanya sama sisi"], 9)),
    ),
    k(
      SUARA_G5,
      bersih(0),
      tambah(0, judul("Sama sisi juga sama kaki")),
      tambah("bertanya:", kotak("v1", 20, 32, 260, 118, W.langit, W.biru, { rx: 10 }), teks("v1t", 150, 50, "segitiga sama kaki", 9.4, W.biru)),
      tambah(idx(SUARA_G5, "Tidak", 2), teks("v0", 150, 66, "semua cirinya ada di sama sisi", 8.2, W.hijau)),
      tambah("Sebaliknya,", kotak("v2", 70, 76, 160, 62, W.hijauMuda, W.hijau, { rx: 8 }), teks("v2t", 150, 98, "segitiga sama sisi", 9.4, W.biru), teks("v2u", 150, 120, "3 sisi sama panjang", 8.2, W.merah)),
      tambah("Jadi", ...kartu("vk", 20, 158, 260, 30, W.emas, ["sama sisi juga dinamakan sama kaki"], 8.6)),
    ),
  ],
};

/* ------------------------------ 9. Aktivitas 3: segitiga menurut sudutnya (Buku Siswa hlm. 153–157; Panduan Guru hlm. 185–186) ------------------------------ */
const SUARA_H1 = "Aktivitas tiga, segitiga menurut sudutnya. Guru membagikan segitiga kertas lipat. Kelompok memberi nama titik sudut, mengukur sudut dengan busur derajat, lalu menentukan jenis sudutnya.";
const SUARA_H2 = "Tabel di panduan guru: segitiga l satu, ABC, punya tiga sudut lancip, nol siku-siku, nol tumpul. Segitiga l dua, DEF, dua lancip dan satu siku-siku. Segitiga l tiga, GHI, dua lancip dan satu tumpul.";
const SUARA_H3 = "Segitiga lancip, misalnya KLM, ketiga sudutnya lancip. Segitiga siku-siku punya satu sudut siku-siku, yaitu sudut K. Segitiga tumpul, misalnya PQR, punya satu sudut tumpul, yaitu sudut P.";
const SUARA_H4 = "Kesimpulan panduan guru: segitiga lancip tidak dapat disebut tumpul atau siku-siku, begitu pula sebaliknya. Tiap jenis punya satu ciri yang tidak dimiliki dua lainnya: tiga sudut lancip, satu sudut siku-siku, atau satu sudut tumpul.";
/** Hasil pengukuran Aktivitas 3 menurut Panduan Guru hlm. 185: banyak sudut lancip, siku-siku, dan tumpul pada l_1, l_2, l_3. */
export const SUDUT_SEGITIGA = [
  { kode: "l_1", nama: "ABC", lancip: 3, siku: 0, tumpul: 0 },
  { kode: "l_2", nama: "DEF", lancip: 2, siku: 1, tumpul: 0 },
  { kode: "l_3", nama: "GHI", lancip: 2, siku: 0, tumpul: 1 },
];

export const ADEGAN_SEGITIGA_SUDUT: AdeganStory = {
  id: "segitiga-sudut",
  judul: "Aktivitas 3: segitiga menurut sudutnya",
  sumber: "Buku Siswa hlm. 153–157; Panduan Guru hlm. 185–186",
  latar: "#FEFCE8",
  kutipan: [
    "Aktivitas 3. Pengelompokan segitiga berdasarkan sudutnya",
    "- Busur derajat",
    "1. Mintalah pada guru bentuk-bentuk segitiga yang terbuat dari kertas lipat",
    "3. Berikanlah nama titik sudut setiap segitiga",
    "4. Ukurlah masing-masing besar sudut setiap segitiga menggunakan busur",
    "derajat",
    "Adakah sudut lancip? sudut",
    "siku-siku? atau sudut tumpul?",
    "1) Segitiga Lancip",
    "Terlihat bahwa sudut K, sudut L, dan sudut M merupakan sudut lancip.",
    "Segitiga KLM memiliki 1 sudut siku-siku yaitu sudut K.",
    "Setelah diamati terlihat ada salah satu sudut yang tumpul yaitu sudut P",
    "Guru memberikan beberapa segitiga yang terbuat dari kertas lipat",
    "Jawab : Ada, ketiga sudutnya lancip",
    "Segitiga lancip tidak dapat dikatakan segitiga tumpul dan sebaliknya",
    "Segitiga tumpul tidak dapat dikatakan segitiga siku-siku dan sebaliknya",
    "“memiliki 3 sudut",
    "Segitiga lancip adalah segitiga yang 3 sudutnya merupakan sudut lancip.",
    "Segitiga tumpul adalah segitiga yang memiliki satu sudut tumpul.",
  ],
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Aktivitas 3: mengukur sudut")),
      tambah("membagikan", bentuk("hl", 14, 46, "lancip", "#93C5FD"), bentuk("hs", 112, 46, "siku", "#FCA5A5"), bentuk("ht", 206, 60, "tumpul", "#86EFAC")),
      tambah("nama", teks("n1", 42, 112, "l_1", 9.4, W.biru), teks("n2", 140, 112, "l_2", 9.4, W.biru), teks("n3", 241, 112, "l_3", 9.4, W.biru)),
      tambah("busur", ...kartu("bs", 40, 132, 220, 26, W.krem, ["busur derajat mengukur sudut"], 8.6)),
      tambah("jenis", ...kartu("js", 40, 164, 220, 26, W.hijauMuda, ["jenis sudut: lancip, siku-siku, tumpul"], 8.2)),
    ),
    k(
      SUARA_H2,
      bersih(0),
      tambah(0, judul("Tabel Panduan Guru")),
      tambah("Tabel", ...tabel("ht", 8, 34, [44, 56, 60, 60, 64], [["Kode", "Segitiga", "Lancip", "Siku", "Tumpul"]], 22, 8)),
      ...SUDUT_SEGITIGA.map((s, i) => tambah(s.nama, ...tabel(`hr${i}`, 8, 56 + i * 24, [44, 56, 60, 60, 64], [[s.kode, s.nama, String(s.lancip), String(s.siku), String(s.tumpul)]], 24, 9.4))),
      tambah(idx(SUARA_H2, "tumpul", 2), ...kartu("hk", 30, 142, 240, 28, W.emas, ["jumlah sudut tiap segitiga: 3"], 8.6)),
    ),
    k(
      SUARA_H3,
      bersih(0),
      tambah(0, judul("Lancip, siku-siku, tumpul")),
      tambah("lancip,", bentuk("la", 14, 46, "lancip", "#93C5FD"), teks("lk", 8, 100, "K", 8.6, W.merah), teks("ll", 78, 100, "L", 8.6, W.merah), teks("lm", 28, 42, "M", 8.6, W.merah), teks("lt", 42, 124, "3 sudut lancip", 8, W.biru)),
      tambah("siku-siku", bentuk("si", 112, 46, "siku", "#FCA5A5"), teks("sk", 106, 100, "K", 8.6, W.merah), teks("sl", 178, 100, "L", 8.6, W.merah), teks("sm", 112, 42, "M", 8.6, W.merah), tandaSiku("sx", 112, 90, [0, -1], [1, 0], 8, W.merah), teks("st", 140, 124, "1 sudut siku-siku", 8, W.biru)),
      tambah("tumpul,", bentuk("tu", 206, 60, "tumpul", "#86EFAC"), teks("tp", 236, 56, "P", 8.6, W.merah), teks("tq", 284, 86, "Q", 8.6, W.merah), teks("tr", 198, 90, "R", 8.6, W.merah), teks("tt", 248, 124, "1 sudut tumpul", 8, W.biru)),
    ),
    k(
      SUARA_H4,
      bersih(0),
      tambah(0, judul("Satu ciri khas tiap jenis")),
      tambah("lancip", ...kartu("w1", 14, 34, 272, 30, W.langit, ["lancip bukan tumpul, bukan siku-siku"], 8.6)),
      tambah(idx(SUARA_H4, "tiga"), ...kartu("w2", 14, 76, 272, 30, W.hijauMuda, ["lancip: 3 sudut lancip"], 9)),
      tambah(idx(SUARA_H4, "siku-siku", 2), ...kartu("w3", 14, 114, 272, 30, W.pink, ["siku-siku: 1 sudut siku-siku"], 9)),
      tambah(idx(SUARA_H4, "tumpul", 2), ...kartu("w4", 14, 152, 272, 30, W.krem, ["tumpul: 1 sudut tumpul"], 9)),
    ),
  ],
};
