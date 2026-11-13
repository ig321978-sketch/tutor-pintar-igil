import type { AdeganStory } from "./logika-story";
import { W, bersih, bolaKecil, bulat, emo, hapus, k, kerucutKecil, kisi, kisiTegak, kotak, kubusKecil, lintasan, panah, rute, tambah, teks, titik, ubah, type Kisi, type Titik } from "./k6b3c-gambar";

const dot = (id: string, p: Titik, warna: string = W.merah, r = 3.4) => titik(id, p, warna, r);
const hitung = (id: string, p: Titik, n: number, warna: string = W.putih) => [bulat(`${id}-b`, p[0], p[1], 7.5, warna, W.biru, { tebal: 1.1, z: 2 }), teks(`${id}-n`, p[0], p[1] + 3, String(n), 8.4, W.biru, { z: 3 })];

/* ------------------------------ 4. Latihan 3.3 (hlm. 92-93 dan BG hlm. 102) ------------------------------ */
const D = kisiTegak("d", 96, 158, 26, 6, 5, 1, 7);
const IS = kisi("i", 86, 112, 12, 6.5, 12, -6.5, 8, 8, 0, 6.6);

export const ADEGAN_LATIHAN33: AdeganStory = {
  id: "latihan-33",
  judul: "Latihan 3.3: denah kelas dan bangun ruang pada kertas berpetak",
  sumber: "Buku Siswa hlm. 92–93 dan Buku Panduan Guru hlm. 102",
  latar: "#F4F0FF",
  kutipan: ["Buatlah denah kelas kalian dalam sistem berpetak", "Tuliskan lokasi tiga orang teman kalian", "Bangun-bangun ruang berikut diletakkan pada kertas berpetak"],
  ketukan: [
    k("Latihan 3.3 nomor 1 dan 2: buatlah denah kelasmu dalam sistem berpetak, lalu tuliskan lokasi tiga orang temanmu.", tambah(0, teks("jud", 150, 20, "Latihan 3.3  nomor 1 dan 2", 11, W.ungu)), tambah("denah", D.garisV, D.garisH, D.labH, D.labN), tambah("kelasmu", kotak("papan", 96, 28, 130, 12, "#166534", W.biru, { rx: 2 }), teks("pt", 161, 37, "papan tulis", 7, W.putih)), tambah("temanmu.", emo("sis", 40, 100, "🧒", 22))),
    k("Garis bilangan dapat berarti baris ke berapa dari depan kelas, dan garis huruf dapat berarti kolom ke berapa dari dinding.", ubah("bilangan", ...D.garisH.map((g) => ({ id: g.id, warna: W.merah, tebal: 1.8 }))), tambah("depan", panah("pd", 62, 150, 0, -88, W.merah, 2, { gambar: true }), teks("pdt", 36, 128, "baris dari", 7), teks("pdt2", 36, 138, "depan kelas", 7)), ubah("huruf", ...D.garisV.map((g) => ({ id: g.id, warna: W.biruMuda, tebal: 1.8 }))), tambah("dinding.", panah("pk", 96, 190, 130, 0, W.biruMuda, 2, { gambar: true }), teks("pkt", 161, 199, "kolom dari dinding", 7.5, W.biruMuda))),
    k("Contoh: tiga temanmu duduk di B 2, D 4, dan F 1. Tiap teman ditulis sebagai pasangan huruf dan bilangan.", hapus(0, "sis", "pd", "pdt", "pdt2", "pk", "pkt"), ubah(0, ...[...D.garisV, ...D.garisH].map((g) => ({ id: g.id, warna: W.abu, tebal: 1 }))), tambah(5, dot("t1", D.pt("B", 2)), teks("t1t", D.pt("B", 2)[0] + 5, D.pt("B", 2)[1] - 6, "(B,2)", 7.4, W.merah, { anchor: "start" })), tambah(7, dot("t2", D.pt("D", 4)), teks("t2t", D.pt("D", 4)[0] + 5, D.pt("D", 4)[1] - 6, "(D,4)", 7.4, W.merah, { anchor: "start" })), tambah(10, dot("t3", D.pt("F", 1)), teks("t3t", D.pt("F", 1)[0] - 5, D.pt("F", 1)[1] - 6, "(F,1)", 7.4, W.merah, { anchor: "end" }))),
    k("Nomor 3: bangun ruang diletakkan pada kertas berpetak yang miring. Hurufnya A sampai H, bilangannya 0 sampai 7. Tuliskan letak masing-masing bangun.", bersih(0), tambah("Nomor", teks("jud", 150, 20, "Latihan 3.3  nomor 3", 11, W.ungu)), tambah("miring.", IS.garisV, IS.garisH), tambah("Hurufnya", IS.labH), tambah("bilangannya", IS.labN)),
    k("Kubus ada di C 0, bola di E 1, dan kerucut di D 2.", tambah("Kubus", kubusKecil("kb", ...IS.pt("C", 0)), teks("kbt", IS.pt("C", 0)[0] - 2, IS.pt("C", 0)[1] + 20, "(C,0)", 7.4, W.merah)), tambah("bola", bolaKecil("bl", ...IS.pt("E", 1)), teks("blt", IS.pt("E", 1)[0] + 2, IS.pt("E", 1)[1] + 20, "(E,1)", 7.4, W.merah)), tambah("kerucut", kerucutKecil("kr", ...IS.pt("D", 2)), teks("krt", IS.pt("D", 2)[0] + 14, IS.pt("D", 2)[1] - 6, "(D,2)", 7.4, W.merah, { anchor: "start" }))),
    k("Perhatikan, bilangan pada gambar ini dimulai dari 0. Jadi garis 0 juga boleh dipakai untuk menyebut lokasi, seperti kubus di C 0.", ubah("bilangan", { id: IS.idH(0), warna: W.merah, tebal: 2.8 }), ubah("garis", { id: IS.idLN(0), warna: W.merah, u: 9 }), tambah("kubus", bulat("sk", ...IS.pt("C", 0), 11, "none", W.hijau, { tebal: 2.2, z: 3 })), tambah("0", teks("nol", 238, 60, "garis 0 ikut dipakai", 8, W.merah))),
  ],
};

/* ------------------------------ 5. Eksplorasi 3.4: pesan berantai (hlm. 93-94 dan BG hlm. 102) ------------------------------ */
const S = kisiTegak("s", 82, 150, 32, 5, 4, 1, 8);
const sp = S.pt;
const semuaAnak = (a: string[], b: number[]) => a.flatMap((h) => b.map((n) => bulat(`an-${h}${n}`, sp(h, n)[0], sp(h, n)[1], 3, "#FDE68A", W.biru, { tebal: 0.8, z: 1 })));

export const ADEGAN_EKSPLORASI34: AdeganStory = {
  id: "eksplorasi-34",
  judul: "Eksplorasi 3.4: pesan berantai dan jarak",
  sumber: "Buku Siswa hlm. 93–94 dan Buku Panduan Guru hlm. 102",
  latar: "#FFF1F2",
  kutipan: ["Menentukan Jalur dan Jarak antara Dua Titik", "Hindari menyampaikan pesan secara diagonal", "menyampaikan pesan kepada (A,3), (C,3), (B,2), atau (B,4)", "banyaknya turus"],
  ketukan: [
    k("Eksplorasi 3.4: menentukan jalur dan jarak antara dua titik. Kalian mengirim pesan berantai kepada temanmu, lalu menghitung jarak yang ditempuh.", tambah(0, teks("jud", 150, 26, "Eksplorasi 3.4", 13, W.ungu)), tambah("pesan", emo("amplop", 70, 110, "✉️", 40)), tambah("berantai", emo("a1", 130, 110, "🧒", 28), emo("a2", 160, 110, "🧒", 28), emo("a3", 190, 110, "🧒", 28)), tambah("ditempuh.", teks("jr", 150, 170, "hitung jarak yang ditempuh", 10, W.merah))),
    k("Tuliskan pesan, letakmu, dan letak temanmu yang dituju. Pesan dioper dari satu anak ke anak di sebelahnya, kiri, kanan, depan, atau belakang.", bersih(0), tambah("Tuliskan", teks("jud", 150, 24, "Kelas sebagai kertas berpetak", 10, W.ungu), S.garisV, S.garisH), tambah("letak", S.labH, S.labN), tambah("dioper", semuaAnak(["A", "B", "C", "D", "E"], [1, 2, 3, 4])), tambah("kiri,", teks("klr", 150, 196, "kiri, kanan, depan, belakang", 8.4, W.hijau))),
    k("Contoh dari buku: anak di B 3 dapat mengoper pesan ke A 3, C 3, B 2, atau B 4.", hapus(0, "klr"), ubah(5, { id: "an-B3", warna: W.merah, r: 5, z: 3 }), tambah(11, panah("p1", sp("B", 3)[0], sp("B", 3)[1], -28, 0, W.hijau, 2.4, { gambar: true })), tambah(13, panah("p2", sp("B", 3)[0], sp("B", 3)[1], 28, 0, W.hijau, 2.4, { gambar: true })), tambah(15, panah("p3", sp("B", 3)[0], sp("B", 3)[1], 0, 28, W.hijau, 2.4, { gambar: true })), tambah(18, panah("p4", sp("B", 3)[0], sp("B", 3)[1], 0, -28, W.hijau, 2.4, { gambar: true }))),
    k("Tetapi anak di B 3 tidak boleh langsung mengoper ke C 2, karena itu arah diagonal.", tambah("langsung", panah("pd", sp("B", 3)[0], sp("B", 3)[1], 29, 29, W.merah, 2.4, { putus: true })), tambah("diagonal.", teks("tdk", sp("C", 2)[0] + 8, sp("C", 2)[1] + 4, "dilarang", 7.6, W.merah, { anchor: "start" }), emo("silang", sp("C", 2)[0] + 14, sp("C", 2)[1] - 8, "❌", 12))),
    k("Tiap anak yang dilalui memberi satu turus. Pesan dari A 1 ke C 2 melewati tiga langkah, jadi jaraknya tiga turus.", hapus(0, "p1", "p2", "p3", "p4", "pd", "tdk", "silang"), ubah(0, { id: "an-B3", warna: "#FDE68A", r: 3, z: 1 }), tambah("Pesan", rute("r1", [sp("A", 1), sp("B", 1), sp("C", 1), sp("C", 2)], W.biruMuda, 2.8)), tambah("tiga", teks("tr", 252, 90, "||| = 3 turus", 8.6, W.merah)), tambah("jaraknya", teks("jj", 252, 108, "jarak = 3", 9, W.merah))),
    k("Diskusikan: adakah jalur yang lebih pendek? Adakah jalur berbeda yang sama panjang? Dan bagaimana menentukan jarak minimalnya?", hapus(0, "tr", "jj"), tambah("pendek?", emo("t1", 252, 70, "❓", 22)), tambah("panjang?", emo("t2", 252, 104, "❓", 22)), tambah("minimalnya?", emo("t3", 252, 138, "❓", 22))),
    k("Dari A 1 ke C 2 ada tiga jalur terpendek yang berbeda, semuanya tiga langkah. Jalur yang memutar jauh bisa mencapai lima langkah.", hapus(0, "t1", "t2", "t3"), ubah("jalur", { id: "r1", warna: W.hijau }), tambah("berbeda,", rute("r2", lintasan(S, ["A", 1], "KAK"), W.merah, 2.4, { op: 0.9 }), rute("r3", lintasan(S, ["A", 1], "AKK"), W.ungu, 2.4, { op: 0.9 })), tambah("semuanya", teks("l3", 252, 90, "tiga jalur", 8.4, W.biru), teks("l3b", 252, 102, "sama-sama 3", 8.4, W.biru)), tambah("memutar", rute("r4", lintasan(S, ["A", 1], "AAKKB"), W.abuTua, 2.2, { putus: true })), tambah("lima", teks("l5", 252, 128, "memutar: 5", 8.4, W.abuTua))),
  ],
};

/* ------------------------------ 6. Pembahasan: dari P(B,5) ke Q(E,1) (hlm. 94-95 dan BG hlm. 103) ------------------------------ */
const Q = kisiTegak("q", 70, 160, 30, 6, 5, 1, 8);
const qp = Q.pt;
const nyatakan = (ki: Kisi, ids: [string, number, string, number]) => [titik("ta", ki.pt(ids[0], ids[1]), W.hijau, 4), titik("tb", ki.pt(ids[2], ids[3]), W.merah, 4)];

export const ADEGAN_PEMBAHASAN_PQ: AdeganStory = {
  id: "pembahasan-pq",
  judul: "Pembahasan: jarak horizontal dan vertikal dari P ke Q",
  sumber: "Buku Siswa hlm. 94–95 dan Buku Panduan Guru hlm. 103",
  latar: "#EEFBF1",
  kutipan: ["Dari P(B,5) ke Q(E,1) sedikitnya diperlukan tiga", "langkah ke kanan dan empat langkah ke bawah", "Jalur yang dapat ditempuh dari P ke Q ada lebih"],
  ketukan: [
    k("Pembahasan: kalau titik awal dan titik akhir diketahui, kita dapat menentukan jalurnya. Titik awal P ada di B 5, titik akhir Q ada di E 1.", tambah(0, teks("jud", 150, 22, "Dari titik P ke titik Q", 11, W.ungu)), tambah("awal", Q.garisV, Q.garisH, Q.labH, Q.labN), tambah(14, titik("P", qp("B", 5), W.hijau, 4.5), teks("Pt", qp("B", 5)[0] - 4, qp("B", 5)[1] - 7, "P", 9, W.hijau)), tambah(21, titik("Q", qp("E", 1), W.merah, 4.5), teks("Qt", qp("E", 1)[0] + 6, qp("E", 1)[1] - 6, "Q", 9, W.merah))),
    k("Dari P ke Q sedikitnya diperlukan 3 langkah ke kanan dan 4 langkah ke bawah.", tambah("kanan", rute("j1", lintasan(Q, ["B", 5], "KKK"), W.biruMuda, 3), teks("n3", 160, 36, "3 langkah ke kanan", 8.4, W.biruMuda)), tambah("bawah.", rute("j1b", lintasan(Q, ["E", 5], "BBBB"), W.biruMuda, 3), teks("n4", 252, 100, "4 langkah", 8.4, W.biruMuda), teks("n4b", 252, 111, "ke bawah", 8.4, W.biruMuda))),
    k("Jalur dari P ke Q lebih dari satu. Bisa turun dulu, atau berbelok bertahap seperti tangga, tetapi semuanya tetap tujuh langkah.", hapus(0, "n3", "n4", "n4b"), ubah(0, { id: "j1", warna: W.abuTua, tebal: 1.6, op: 0.7 }, { id: "j1b", warna: W.abuTua, tebal: 1.6, op: 0.7 }), tambah("turun", rute("j2", lintasan(Q, ["B", 5], "BBBBKKK"), W.merah, 2.6)), tambah("berbelok", rute("j3", lintasan(Q, ["B", 5], "KBKBKBB"), W.ungu, 2.6)), tambah("tujuh", teks("s7", 252, 100, "semua 7 langkah", 8.4, W.biru))),
    k("Cara cepat menghitung jarak minimal: selisih huruf ditambah selisih bilangan. Contoh dari D 5 ke F 1.", hapus(0, "j1", "j1b", "j2", "j3", "s7", "P", "Pt", "Q", "Qt"), ubah("Cara", { id: "jud", isi: "jarak = selisih huruf + selisih bilangan", u: 8.8 }), tambah("Contoh", ...nyatakan(Q, ["D", 5, "F", 1])), tambah("dari", teks("td", qp("D", 5)[0], qp("D", 5)[1] - 7, "D 5", 7.6, W.hijau), teks("tf", qp("F", 1)[0] + 6, qp("F", 1)[1] - 6, "F 1", 7.6, W.merah, { anchor: "start" }))),
    k("Huruf D ke F selisihnya 2, bilangan 5 ke 1 selisihnya 4, jadi jaraknya 6.", tambah("selisihnya", rute("jh", lintasan(Q, ["D", 5], "KK"), W.biruMuda, 3), teks("h2", qp("E", 5)[0], qp("E", 5)[1] - 7, "2", 9, W.biruMuda)), tambah("bilangan", rute("jv", lintasan(Q, ["F", 5], "BBBB"), W.merah, 3), teks("v4", qp("F", 3)[0] + 8, qp("F", 3)[1] + 3, "4", 9, W.merah)), tambah("jaraknya", teks("tot", 258, 184, "2 + 4 = 6", 11, W.biru, { garis: W.emas }))),
    k("Untuk P dan Q: huruf B ke E selisihnya 3, bilangan 5 ke 1 selisihnya 4, jadi jarak minimalnya 7.", hapus(0, "jh", "h2", "jv", "v4", "tot", "ta", "tb", "td", "tf"), ubah(0, { id: "jud", isi: "jarak minimal P ke Q", u: 11 }), tambah(1, titik("P", qp("B", 5), W.hijau, 4.5), titik("Q", qp("E", 1), W.merah, 4.5)), tambah("huruf", teks("sh", 160, 52, "3", 9, W.biruMuda)), tambah("bilangan", teks("sv", 252, 100, "4", 9, W.merah)), tambah("jarak", teks("tot2", 252, 160, "3 + 4 = 7", 11, W.biru, { garis: W.emas }))),
    k("Jalur yang memutar tetap mungkin, misalnya mundur dulu ke A 5, tetapi panjangnya 9 langkah sehingga bukan jarak minimal.", ubah(0, { id: "sh", op: 0 }, { id: "sv", op: 0 }), tambah("mundur", rute("jm", lintasan(Q, ["B", 5], "LBBBBKKKK"), W.salem, 2.8)), tambah("9", teks("l9", 252, 130, "memutar: 9 langkah", 8.4, W.salem))),
  ],
};

/* ------------------------------ 7. Latihan 3.4 (hlm. 95-96 dan BG hlm. 103-104) ------------------------------ */
const T = kisiTegak("t", 66, 170, 24, 6, 6, 1, 7);
const tp = T.pt;

export const ADEGAN_LATIHAN34: AdeganStory = {
  id: "latihan-34",
  judul: "Latihan 3.4: jalur, jarak, dan kubus yang direbahkan",
  sumber: "Buku Siswa hlm. 95–96 dan Buku Panduan Guru hlm. 103–104",
  latar: "#FFF8E6",
  kutipan: ["Tuliskan masing-masing dua jalur yang dapat dilalui", "Tentukan jarak antara titik-titik berikut", "tidak boleh diangkat, tetapi direbahkan ke salah satu sisi tegaknya"],
  ketukan: [
    k("Latihan 3.4 nomor 1 dan 2: dari A 3 ke E 5. Jaraknya 4 petak ke kanan dan 2 petak ke atas, jadi 6.", tambah(0, teks("jud", 150, 20, "Latihan 3.4  nomor 1 dan 2", 11, W.ungu), T.garisV, T.garisH, T.labH, T.labN), tambah("dari", titik("a", tp("A", 3), W.hijau, 4), titik("e", tp("E", 5), W.merah, 4)), tambah("kanan", rute("r1", lintasan(T, ["A", 3], "KKKK"), W.biruMuda, 3), teks("c4", 250, 70, "4 ke kanan", 8.4, W.biruMuda)), tambah("atas", rute("r1b", lintasan(T, ["E", 3], "AA"), W.biruMuda, 3), teks("c2", 250, 82, "2 ke atas", 8.4, W.biruMuda)), tambah("jadi", teks("c6", 250, 100, "jarak 6", 10, W.merah, { garis: W.emas }))),
    k("Nomor 1 meminta dua jalur. Jalur kedua boleh berbelok-belok, misalnya naik dulu, lalu ke kanan, tetap 6 langkah.", ubah(0, { id: "r1", warna: W.abuTua, tebal: 1.6, op: 0.7 }, { id: "r1b", warna: W.abuTua, tebal: 1.6, op: 0.7 }), tambah("kedua", rute("r2", lintasan(T, ["A", 3], "AAKKKK"), W.merah, 2.8)), tambah("tetap", teks("c6b", 250, 118, "tetap 6 langkah", 8.4, W.merah))),
    k("Selanjutnya dari B 6 ke D 3, dibutuhkan 2 langkah ke kanan dan 3 langkah ke bawah, jadi jaraknya 5.", hapus(0, "a", "e", "r1", "r1b", "r2", "c4", "c2", "c6", "c6b"), tambah("dari", titik("b", tp("B", 6), W.hijau, 4), titik("d", tp("D", 3), W.merah, 4)), tambah("kanan", rute("q1", lintasan(T, ["B", 6], "KK"), W.biruMuda, 3), teks("e2", 250, 70, "2 ke kanan", 8.4, W.biruMuda)), tambah("bawah,", rute("q1b", lintasan(T, ["D", 6], "BBB"), W.biruMuda, 3), teks("e3", 250, 82, "3 ke bawah", 8.4, W.biruMuda)), tambah("jaraknya", teks("e5", 250, 100, "jarak 5", 10, W.merah, { garis: W.emas }))),
    k("Nomor 3: kubus di F 1 akan dipindahkan ke D 2. Kubus tidak boleh diangkat, hanya direbahkan ke salah satu sisi tegaknya.", hapus(0, "b", "d", "q1", "q1b", "e2", "e3", "e5"), ubah("Nomor", { id: "jud", isi: "Latihan 3.4  nomor 3" }), tambah("kubus", ...kubusKecil("kb", tp("F", 1)[0], tp("F", 1)[1] - 2, 7)), tambah(9, bulat("tj", tp("D", 2)[0], tp("D", 2)[1], 7, "none", W.merah, { putus: true, tebal: 1.8 })), tambah("direbahkan", teks("tg", 250, 90, "direbahkan,", 8, W.salem), teks("tg2", 250, 101, "tidak diangkat", 8, W.salem))),
    k("Tiap kali direbahkan, kubus berpindah satu petak. Dari F ke D dua kali ke kiri, dari 1 ke 2 satu kali ke atas.", ubah(0, { id: "tg", op: 0 }, { id: "tg2", op: 0 }), tambah("kiri,", rute("g1", lintasan(T, ["F", 1], "LL"), W.biruMuda, 3), teks("s1", tp("E", 1)[0], tp("E", 1)[1] + 13, "1", 8.4, W.biruMuda), teks("s2", tp("D", 1)[0], tp("D", 1)[1] + 13, "2", 8.4, W.biruMuda)), tambah("atas.", rute("g2", lintasan(T, ["D", 1], "A"), W.biruMuda, 3), teks("s3", tp("D", 2)[0] - 9, tp("D", 2)[1] + 11, "3", 8.4, W.biruMuda))),
    k("Jadi kubus direbahkan 3 kali. Urutannya boleh berbeda, misalnya kiri dua kali lalu naik, atau naik dulu. Tetap 3 kali.", hapus(0, "s1", "s2", "s3"), ubah(0, { id: "g1", warna: W.biruMuda, tebal: 3 }), tambah("misalnya", rute("g3", lintasan(T, ["F", 1], "LAL"), W.merah, 2.4), teks("w1", 250, 80, "biru: kiri, kiri, atas", 7.2, W.biruMuda, { anchor: "middle" })), tambah("naik", rute("g4", lintasan(T, ["F", 1], "ALL"), W.hijau, 2.4), teks("w2", 250, 92, "merah: kiri, atas, kiri", 7.2, W.merah), teks("w3", 250, 104, "hijau: atas, kiri, kiri", 7.2, W.hijau)), tambah("Tetap", teks("w4", 250, 124, "semuanya 3 kali", 8.6, W.biru))),
    k("Pada titik tujuan, letak titik P di kubus bergantung pada jalur yang kamu pilih, sehingga jawabannya bisa berbeda.", hapus(0, "w1", "w2", "w3", "w4"), tambah("titik", kotak("bp", 196, 60, 98, 60, W.putih, W.biru, { rx: 8 }), teks("bpa", 245, 80, "titik P di kubus", 8, W.ungu), teks("bpb", 245, 94, "ikut berpindah", 8, W.ungu)), tambah("jawabannya", teks("bpc", 245, 111, "jawaban bisa berbeda", 8, W.merah))),
  ],
};

/* ------------------------------ 8. Refleksi, Uji Kompetensi, dan Pengayaan (hlm. 96-98 dan BG hlm. 105-107) ------------------------------ */
const U = kisiTegak("u", 70, 160, 28, 5, 5, 1, 8);
const up = U.pt;
const Wg = kisiTegak("w", 76, 164, 32, 4, 5, 1, 8);
const wp = Wg.pt;
const CARA: Record<string, number> = { A1: 1, A2: 1, B1: 1, B2: 2, A3: 1, B3: 3, C1: 1, C2: 3, C3: 6 };
const cara = (h: string, n: number, warna?: string) => hitung(`c${h}${n}`, wp(h, n), CARA[`${h}${n}`] ?? 0, warna);

export const ADEGAN_UJI_PENGAYAAN: AdeganStory = {
  id: "uji-pengayaan",
  judul: "Refleksi, Uji Kompetensi, dan Pengayaan jumlah jalur",
  sumber: "Buku Siswa hlm. 96–98 dan Buku Panduan Guru hlm. 105–107",
  latar: "#F3EEFF",
  kutipan: ["Apakah saya dapat menentukan lokasi dalam sistem", "Kinan duduk di kursi (B,3)", "Perhatikan dan tuliskan pola untuk menentukan banyaknya cara", "Tentukan banyaknya cara untuk bergerak dari (A,1) ke (D,5)"],
  ketukan: [
    k("Refleksi: apakah aku dapat menentukan lokasi dalam sistem berpetak? Apakah aku dapat menentukan jarak horizontal dan jarak vertikal antara dua titik?", tambah(0, teks("jud", 150, 26, "Refleksi Sub-Bab C", 12, W.ungu)), tambah("lokasi", kotak("rf1", 30, 50, 240, 40, W.putih, W.biruMuda, { rx: 8 }), teks("rt1", 150, 74, "menentukan lokasi pada sistem berpetak", 9)), tambah("jarak", kotak("rf2", 30, 104, 240, 40, W.putih, W.merah, { rx: 8 }), teks("rt2", 150, 128, "jarak horizontal dan jarak vertikal", 9)), tambah("vertikal", emo("c1", 252, 76, "✅", 14), emo("c2", 252, 130, "✅", 14))),
    k("Uji Kompetensi nomor 3: di peta kelas, Kinan duduk di kursi B 3. Angga duduk dua deret di kanan deretan Kinan, dan satu baris di belakang barisan Kinan.", bersih(0), tambah("Uji", teks("jud", 150, 20, "Uji Kompetensi nomor 3", 11, W.ungu), U.garisV, U.garisH, U.labH, U.labN), tambah("Kinan", emo("kn", up("B", 3)[0], up("B", 3)[1] + 5, "👧", 18), teks("knt", up("B", 3)[0] + 4, up("B", 3)[1] - 14, "Kinan (B,3)", 7.4, W.merah, { anchor: "start" })), tambah("Angga", emo("ag", 262, 100, "👦", 22), teks("agt", 262, 118, "Angga?", 9, W.biruMuda))),
    k("Dua deret ke kanan dari B menjadi D. Satu baris ke belakang dari 3 menjadi 4. Jadi Angga duduk di D 4.", tambah("Dua", rute("ra", lintasan(U, ["B", 3], "KK"), W.biruMuda, 3)), tambah("Satu", rute("rb", lintasan(U, ["D", 3], "A"), W.hijau, 3)), hapus("Jadi", "ag", "agt"), tambah("Angga", emo("ag2", up("D", 4)[0], up("D", 4)[1] + 5, "👦", 18), teks("agt2", up("D", 4)[0] + 4, up("D", 4)[1] - 14, "Angga (D,4)", 7.4, W.biruMuda, { anchor: "start" }))),
    k("Pengayaan: Tigor berangkat dari titik K di A 1 menuju titik L di D 5. Jarak terpendeknya 3 ke kanan dan 4 ke atas.", bersih(0), tambah("Pengayaan:", teks("jud", 150, 20, "Pengayaan: berapa banyak cara?", 11, W.ungu), Wg.garisV, Wg.garisH, Wg.labH, Wg.labN), tambah("titik", titik("K", wp("A", 1), W.hijau, 4.6), teks("Kt", wp("A", 1)[0] + 6, wp("A", 1)[1] + 11, "K", 9, W.hijau)), tambah("titik@2", titik("L", wp("D", 5), W.merah, 4.6), teks("Lt", wp("D", 5)[0] + 8, wp("D", 5)[1] + 3, "L", 9, W.merah)), tambah("kanan", rute("pk", lintasan(Wg, ["A", 1], "KKK"), W.biruMuda, 3), teks("p3", 230, 150, "3 ke kanan", 8.4, W.biruMuda)), tambah("atas.", rute("pa", lintasan(Wg, ["D", 1], "AAAA"), W.biruMuda, 3), teks("p4", 230, 162, "4 ke atas", 8.4, W.biruMuda))),
    k("Jika hanya boleh ke kanan atau ke atas, ke A 2 ada 1 cara, ke B 1 ada 1 cara, dan ke B 2 ada 2 cara.", hapus(0, "pk", "pa", "p3", "p4"), tambah(9, cara("A", 2)), tambah(15, cara("B", 1)), tambah(22, cara("B", 2))),
    k("Ke A 3 ada 1 cara, ke B 3 ada 3 cara, ke C 1 ada 1 cara, ke C 2 ada 3 cara, dan ke C 3 ada 6 cara.", tambah(1, cara("A", 3)), tambah(7, cara("B", 3)), tambah(13, cara("C", 1)), tambah(19, cara("C", 2)), tambah(26, cara("C", 3))),
    k("Polanya: cara ke suatu titik adalah cara dari titik di kirinya ditambah cara dari titik di bawahnya. Misalnya ke C 3, 3 ditambah 3, jadi 6.", sorotkanBulat("kirinya", "cB3-b"), sorotkanBulat("bawahnya.", "cC2-b"), sorotkanBulat("jadi", "cC3-b"), tambah("jadi", teks("pj", 236, 60, "3 + 3 = 6", 10, W.merah, { garis: W.emas }))),
    k("Dengan pola itu, cara dari A 1 ke D 5 ada 35. Pola ini mirip segitiga Pascal.", hapus(0, "pj"), tambah("pola", ...kolomLengkap()), tambah("35.", ...hitung("cD5", wp("D", 5), 35, W.emas)), tambah("Pascal.", teks("pm", 236, 60, "mirip segitiga Pascal", 7.6, W.ungu))),
  ],
};

function sorotkanBulat(at: string, id: string) {
  return { at, ubah: [{ id, sorot: true, warna: "#FDE68A" }] };
}

/** Sisa angka kisi D 5 yang belum tampak (tanpa C3 dan titik yang sudah ada). */
function kolomLengkap() {
  const sisa: [string, number, number][] = [
    ["A", 4, 1], ["A", 5, 1], ["B", 4, 4], ["B", 5, 5], ["C", 4, 10], ["C", 5, 15], ["D", 1, 1], ["D", 2, 4], ["D", 3, 10], ["D", 4, 20],
  ];
  return sisa.flatMap(([h, n, v]) => hitung(`c${h}${n}`, wp(h, n), v));
}
