import type { AdeganStory } from "./logika-story";
import { W, bersih, bulat, emo, garis, hapus, k, kisiTegak, kotak, kubusKecil, bolaKecil, kerucutKecil, lintasan, panah, rute, sorotkan, tambah, tandaO, tandaX, teks, titik, ubah, type Titik } from "./k6b3c-gambar";

/** Kartu metode: kotak dengan nama dua baris dan arti pendek. */
const kartu = (id: string, x: number, y: number, warna: string, baris: string[], arti: string) => [
  kotak(`${id}-k`, x, y, 134, 70, warna, W.biru, { rx: 10 }),
  ...baris.map((b, i) => teks(`${id}-n${i}`, x + 67, y + 20 + i * 12, b, 8.6)),
  teks(`${id}-a`, x + 67, y + 24 + baris.length * 12, arti, 7, W.ungu),
];

/* ------------------------------ LC0. Empat metode luar Sub-Bab C ------------------------------ */
export const ADEGAN_LUAR_C_PEMBUKA: AdeganStory = {
  id: "luarc-pembuka",
  judul: "Empat metode luar untuk menentukan lokasi dan jalur",
  sumber: "Metode luar: peta empat metode",
  latar: "#EAF2FF",
  ketukan: [
    k("Ada empat metode luar untuk lokasi dan jalur. Isinya membantu kita menulis lokasi, mengukur jarak, dan menghitung jalur.", tambah("metode", emo("dunia", 60, 100, "🌐", 40), teks("l1", 60, 130, "metode luar", 9, W.merah)), tambah("menulis", emo("pin", 130, 80, "📍", 26), teks("l2", 130, 104, "lokasi", 8.5)), tambah("mengukur", emo("rul", 190, 80, "📏", 26), teks("l3", 190, 104, "jarak", 8.5)), tambah("menghitung", emo("hit", 250, 80, "🔢", 26), teks("l4", 250, 104, "jalur", 8.5))),
    k("Ada empat metode luar. Pertama, Grid Reference Pair, alamat titik berupa pasangan huruf dan bilangan.", bersih(0), tambah(0, teks("jud", 150, 20, "Empat metode luar", 12, W.ungu)), tambah("Grid", kartu("m1", 10, 30, "#FDE68A", ["Grid Reference", "Pair"], "alamat titik: huruf, bilangan"))),
    k("Kedua, Manhattan Distance, jarak yang diukur dengan menyusuri jalan kotak-kotak.", tambah("Manhattan", kartu("m2", 156, 30, "#FBCFE8", ["Manhattan", "Distance"], "jarak menyusuri kotak"))),
    k("Ketiga, Monotone Lattice Path, jalur yang hanya ke kanan atau ke atas. Keempat, Pascal Counting Recurrence, cara menghitung jalur dengan penjumlahan berulang.", tambah("Monotone", kartu("m3", 10, 112, "#BBF7D0", ["Monotone", "Lattice Path"], "jalur kanan dan atas saja")), tambah("Pascal", kartu("m4", 156, 112, "#BFDBFE", ["Pascal Counting", "Recurrence"], "jumlah dua tetangga"))),
  ],
};

/* ------------------------------ LC1. Grid Reference Pair: konsep ------------------------------ */
const G = kisiTegak("a", 70, 164, 28, 6, 5, 1, 8);
const gp = G.pt;

export const ADEGAN_LUAR_C_GRID: AdeganStory = {
  id: "luarc-grid",
  judul: "Grid Reference Pair: alamat sebagai pasangan berurutan",
  sumber: "Metode luar: Grid Reference Pair",
  latar: "#FFF6DC",
  ketukan: [
    k("Metode pertama: Grid Reference Pair. Alamat sebuah titik ditulis sebagai pasangan berurutan, huruf lebih dahulu, lalu bilangan.", tambah(0, teks("jud", 150, 20, "Grid Reference Pair", 12, W.ungu), G.garisV, G.garisH), tambah("huruf", G.labH), tambah("bilangan.", G.labN), tambah("pasangan", kotak("pa", 226, 60, 68, 40, W.putih, W.biru, { rx: 6 }), teks("pt1", 260, 78, "( huruf ,", 8), teks("pt2", 260, 92, "bilangan )", 8))),
    k("Cara membacanya ada dua langkah. Telusuri garis huruf ke atas, telusuri garis bilangan ke samping, dan titik temu keduanya adalah alamat.", hapus(0, "pa", "pt1", "pt2"), ubah("huruf", { id: G.idV("D"), warna: W.biruMuda, tebal: 3 }), ubah("bilangan", { id: G.idH(3), warna: W.merah, tebal: 3 }), tambah("temu", titik("d3", gp("D", 3), W.hijau, 4.6)), tambah("alamat.", teks("d3t", gp("D", 3)[0] + 6, gp("D", 3)[1] - 7, "alamat D 3", 8.4, W.hijau, { anchor: "start" }))),
    k("Alamat juga bisa dibaca sebagai gerak dari titik asal A satu. Alamat D empat berarti tiga langkah ke kanan dan tiga langkah ke atas.", hapus(0, "d3", "d3t"), ubah(0, { id: G.idV("D"), warna: W.abu, tebal: 1 }, { id: G.idH(3), warna: W.abu, tebal: 1 }), tambah("asal", titik("asal", gp("A", 1), W.hijau, 4.6), teks("asalt", gp("A", 1)[0] + 5, gp("A", 1)[1] - 7, "asal A 1", 7.6, W.hijau, { anchor: "start" })), tambah("kanan", rute("k1", lintasan(G, ["A", 1], "KKK"), W.biruMuda, 3), teks("c3", 250, 150, "3 ke kanan", 8.4, W.biruMuda)), tambah("atas.", rute("k2", lintasan(G, ["D", 1], "AAA"), W.merah, 3), teks("c3b", 250, 162, "3 ke atas", 8.4, W.merah)), tambah("berarti", titik("d4", gp("D", 4), W.merah, 4.6), teks("d4t", gp("D", 4)[0] + 6, gp("D", 4)[1] - 7, "D 4", 8.4, W.merah, { anchor: "start" }))),
    k("Kebalikannya, dari gerak ke alamat. Mulai di B tiga, geser dua ke kanan dan satu ke atas, maka sampai di D empat.", hapus(0, "k1", "k2", "c3", "c3b", "asal", "asalt"), ubah(0, { id: "d4t", op: 0.5 }), tambah("Mulai", titik("b3", gp("B", 3), W.hijau, 4.6), teks("b3t", gp("B", 3)[0] - 6, gp("B", 3)[1] - 7, "B 3", 8.4, W.hijau, { anchor: "end" })), tambah("kanan", rute("m1", lintasan(G, ["B", 3], "KK"), W.biruMuda, 3), teks("g2", 250, 150, "2 ke kanan", 8.4, W.biruMuda)), tambah("atas,", rute("m2", lintasan(G, ["D", 3], "A"), W.merah, 3), teks("g1", 250, 162, "1 ke atas", 8.4, W.merah)), sorotkan("sampai", "d4")),
    k("Satu pasangan hanya menunjuk satu titik, dan satu titik hanya mempunyai satu alamat. Karena itu alamat bisa dipakai tanpa gambar.", bersih(0), tambah(0, kotak("ba", 40, 50, 100, 70, W.putih, W.biruMuda, { rx: 10 }), titik("bp", [90, 78], W.merah, 6), teks("bpt", 90, 104, "satu titik", 9), kotak("bb", 160, 50, 100, 70, W.putih, W.ungu, { rx: 10 }), teks("bq", 210, 82, "(D,4)", 15, W.ungu), teks("bqt", 210, 104, "satu alamat", 9)), tambah("menunjuk", panah("ar", 140, 85, 20, 0, W.hijau, 3, { gambar: true })), tambah("gambar.", emo("tg", 150, 170, "🚫", 24), teks("tgt", 150, 196, "tanpa gambar pun jelas", 8.6, W.merah))),
  ],
};

/* ------------------------------ LC2. Grid Reference Pair diterapkan ------------------------------ */
const R = kisiTegak("r", 78, 172, 26, 6, 6, 0, 7);
const rp = R.pt;
const baris = (id: string, i: number, isi: string, warna: string = W.biru) => teks(id, 262, 52 + i * 14, isi, 7.6, warna);
const labelDi = (id: string, p: Titik, isi: string, warna: string, kiri = false) => teks(id, p[0] + (kiri ? -7 : 7), p[1] - 6, isi, 6.8, warna, { anchor: kiri ? "end" : "start" });

export const ADEGAN_LUAR_C_GRID_TERAPAN: AdeganStory = {
  id: "luarc-grid-terapan",
  judul: "Grid Reference Pair diterapkan pada contoh",
  sumber: "Metode luar: Grid Reference Pair diterapkan",
  latar: "#FFF1F2",
  ketukan: [
    k("Kita terapkan metode pertama pada contoh tadi. Semua lokasi dari permainan, bangun ruang, dan kursi kelas dapat digambar pada satu bidang berpetak.", tambah(0, teks("jud", 150, 20, "Alamat dari contoh yang tadi", 8.8, W.ungu), R.garisV, R.garisH, R.labH, R.labN), tambah("Semua", teks("tab", 262, 40, "alamat:", 8, W.ungu))),
    k("Dari permainan tadi, tanda X ada di B empat dan tanda O ada di D satu. Alamatnya cukup ditulis B empat dan D satu.", tambah("tanda", tandaX("x", rp("B", 4)), labelDi("xl", rp("B", 4), "B 4", W.merah), baris("lb1", 0, "X: B 4", W.merah)), tambah(11, tandaO("o", rp("D", 1)), labelDi("ol", rp("D", 1), "D 1", W.biruMuda), baris("lb2", 1, "O: D 1", W.biruMuda))),
    k("Dari bangun ruang tadi, kubus ada di C nol, bola di E satu, dan kerucut di D dua. Ada bilangan nol juga, karena garis nol ikut dipakai.", tambah("kubus", ...kubusKecil("kb", rp("C", 0)[0], rp("C", 0)[1] - 3, 6), baris("lb3", 2, "kubus: C 0", W.coklat)), tambah("bola", bolaKecil("bl", ...rp("E", 1), 4.6), baris("lb4", 3, "bola: E 1", W.coklat)), tambah("kerucut", kerucutKecil("kr", rp("D", 2)[0], rp("D", 2)[1] + 4, 5), baris("lb5", 4, "kerucut: D 2", W.ungu))),
    k("Dari kursi kelas, Kinan duduk di B tiga dan Angga duduk di D empat. Dua orang itu punya alamat yang berbeda.", tambah("Kinan", bulat("kn", rp("B", 3)[0], rp("B", 3)[1], 4, W.hijau, W.biru), labelDi("knl", rp("B", 3), "Kinan B 3", W.hijau, true), baris("lb6", 5, "Kinan: B 3", W.hijau)), tambah("Angga", bulat("ag", rp("D", 4)[0], rp("D", 4)[1], 4, W.salem, W.biru), labelDi("agl", rp("D", 4), "Angga D 4", W.salem), baris("lb7", 6, "Angga: D 4", W.salem))),
    k("Tujuh benda dan orang kini tertulis dengan alamatnya. Siapa pun yang membaca daftar ini dapat menempatkan semuanya di titik yang benar.", ubah(0, { id: "tab", op: 0 }), sorotkan("Tujuh", "xa", "xb", "o", "kb-a", "kb-b", "kb-c", "bl", "kr", "kn", "ag"), tambah("daftar", kotak("fr", 254, 36, 44, 106, "none", W.hijau, { rx: 6, tebal: 2 })), tambah("titik", teks("ok", 262, 164, "satu alamat:", 7.4, W.hijau), teks("ok2", 262, 175, "satu titik", 7.4, W.hijau))),
  ],
};

/* ------------------------------ LC3. Manhattan Distance: konsep ------------------------------ */
const M = kisiTegak("m", 70, 164, 28, 6, 5, 1, 8);
const mp = M.pt;
const tebalJalan = [...M.garisV, ...M.garisH].map((g) => ({ id: g.id, warna: W.abuTua, tebal: 1.8 }));

export const ADEGAN_LUAR_C_MANHATTAN: AdeganStory = {
  id: "luarc-manhattan",
  judul: "Manhattan Distance: jarak menyusuri kotak",
  sumber: "Metode luar: Manhattan Distance",
  latar: "#F1FFF4",
  ketukan: [
    k("Metode kedua: Manhattan Distance. Jarak diukur dengan menyusuri jalan berbentuk kotak, jadi hanya boleh bergerak mendatar atau menurun.", tambah(0, teks("jud", 150, 20, "Manhattan Distance", 12, W.ungu), M.garisV, M.garisH, M.labH, M.labN), ubah("jalan", ...tebalJalan), tambah("mendatar", panah("a1", 226, 90, 44, 0, W.biruMuda, 3, { gambar: true }), teks("a1t", 248, 82, "mendatar", 7.6, W.biruMuda)), tambah("menurun.", panah("a2", 248, 100, 0, 44, W.merah, 3, { gambar: true }), teks("a2t", 248, 156, "menurun", 7.6, W.merah))),
    k("Di kota yang jalannya berbentuk kotak, mobil tidak bisa memotong blok secara miring. Garis lurus diagonal tidak dipakai untuk jarak ini.", hapus(0, "a1", "a1t", "a2", "a2t"), tambah("mobil", emo("mbl", mp("B", 5)[0], mp("B", 5)[1] + 6, "🚗", 16)), tambah("memotong", garis("dg", mp("B", 5)[0], mp("B", 5)[1], 3 * 28, 4 * 28, W.salem, 2.4, { putus: true })), tambah("diagonal", teks("dgt", 232, 120, "garis lurus miring", 7.6, W.salem), teks("dgt2", 232, 131, "tidak dipakai", 7.6, W.merah), emo("sil", 232, 100, "❌", 16))),
    k("Dari B lima ke E satu: selisih huruf tiga dan selisih bilangan empat, sehingga jaraknya tiga ditambah empat, yaitu tujuh.", hapus(0, "mbl", "dg", "dgt", "dgt2", "sil"), ubah(0, ...[...M.garisV, ...M.garisH].map((g) => ({ id: g.id, warna: W.abu, tebal: 1 }))), tambah(1, titik("p", mp("B", 5), W.hijau, 4.6)), tambah(4, titik("q", mp("E", 1), W.merah, 4.6)), tambah("huruf", rute("h", lintasan(M, ["B", 5], "KKK"), W.biruMuda, 3), teks("h3", 154, 44, "3", 9, W.biruMuda)), tambah("bilangan", rute("v", lintasan(M, ["E", 5], "BBBB"), W.merah, 3), teks("v4", 258, 110, "4", 9, W.merah)), tambah("yaitu", teks("tt", 252, 160, "3 + 4 = 7", 11, W.biru, { garis: W.emas }))),
    k("Selisih selalu dihitung sebagai bilangan positif. Dari E satu kembali ke B lima juga berjarak tujuh, karena arah kebalikan tetap menghitung tujuh langkah.", ubah(0, { id: "p", warna: W.merah }, { id: "q", warna: W.hijau }), ubah("kembali", { id: "h", warna: W.salem }, { id: "v", warna: W.salem }), tambah("positif.", teks("abs", 252, 178, "|3| + |4| = 7", 9, W.ungu)), tambah("tujuh@2", emo("bk", 258, 144, "↩️", 14))),
    k("Boleh memilih jalur yang berbeda, asalkan tidak ada langkah yang mundur. Semua jalur terpendek tetap berjarak tujuh.", hapus(0, "abs", "bk"), ubah(0, { id: "p", warna: W.hijau }, { id: "q", warna: W.merah }, { id: "h", warna: W.abuTua, tebal: 1.6, op: 0.7 }, { id: "v", warna: W.abuTua, tebal: 1.6, op: 0.7 }), tambah("berbeda,", rute("j2", lintasan(M, ["B", 5], "BBBBKKK"), W.merah, 2.6), rute("j3", lintasan(M, ["B", 5], "KBKBKBB"), W.ungu, 2.6)), tambah("tetap", teks("s7", 252, 176, "semua jalur: 7", 8.6, W.biru))),
  ],
};

/* ------------------------------ LC4. Manhattan Distance diterapkan ------------------------------ */
const SOAL: { label: string; selisih: [number, number]; ket: string }[] = [
  { label: "A 3 ke E 5", selisih: [4, 2], ket: "" },
  { label: "B 6 ke D 3", selisih: [2, 3], ket: "" },
  { label: "D 5 ke F 1", selisih: [2, 4], ket: "" },
  { label: "P ke Q", selisih: [3, 4], ket: "" },
  { label: "F 1 ke D 2", selisih: [2, 1], ket: "" },
];
const barisSoal = (i: number) => {
  const [a, b] = SOAL[i].selisih;
  const y = 44 + i * 26;
  const total = a + b;
  return [teks(`s${i}-l`, 14, y + 4, SOAL[i].label, 8.6, W.biru, { anchor: "start" }), teks(`s${i}-h`, 92, y + 4, `${a} + ${b}`, 8.6, W.merah, { anchor: "start" }), kotak(`s${i}-b`, 130, y - 6, total * 18, 14, i === 4 ? W.salem : W.biruMuda, W.biru, { rx: 3 }), teks(`s${i}-t`, 130 + total * 18 + 8, y + 4, String(total), 10, W.biru, { anchor: "start" })];
};

export const ADEGAN_LUAR_C_MANHATTAN_TERAPAN: AdeganStory = {
  id: "luarc-manhattan-terapan",
  judul: "Manhattan Distance diterapkan pada contoh",
  sumber: "Metode luar: Manhattan diterapkan",
  latar: "#FFFBEA",
  ketukan: [
    k("Kita hitung jarak beberapa soal dengan metode kedua. Tiap baris menulis selisih huruf, selisih bilangan, lalu jumlahnya sebagai batang.", tambah(0, teks("jud", 150, 22, "Jarak = selisih huruf + selisih bilangan", 9.6, W.ungu)), tambah("huruf,", teks("hh", 92, 36, "selisih", 6.6, W.merah, { anchor: "start" }), teks("hb", 130, 36, "jarak (batang)", 6.6, W.biru, { anchor: "start" }))),
    k("Soal pertama: dari A tiga ke E lima. Selisih huruf empat, selisih bilangan dua, jaraknya enam.", tambah("Soal", barisSoal(0))),
    k("Soal berikutnya, dari B enam ke D tiga. Selisih huruf dua, selisih bilangan tiga, jaraknya lima.", tambah("dari", barisSoal(1))),
    k("Soal ketiga, dari D lima ke F satu. Selisih huruf dua, selisih bilangan empat, jaraknya enam.", tambah("ketiga,", barisSoal(2))),
    k("Titik P ke titik Q pada pembahasan. Selisih huruf tiga, selisih bilangan empat, jaraknya tujuh.", tambah("Titik", barisSoal(3))),
    k("Terakhir kubus dari F satu ke D dua selisih huruf dua, selisih bilangan satu, jaraknya tiga. Jadi kubus direbahkan tiga kali, sama dengan jaraknya.", tambah("Terakhir", barisSoal(4)), tambah("direbahkan", teks("kub", 150, 190, "kubus direbahkan 3 kali = jarak 3", 8.6, W.salem)), sorotkan("jaraknya.", "s4-b")),
  ],
};
