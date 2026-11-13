import type { AdeganStory } from "./logika-story";
import { W, bersih, bulat, emo, garis, hapus, k, kisiTegak, kotak, petaIndonesia, tambah, tandaO, tandaX, teks, titik, ubah } from "./k6b3c-gambar";

/* ------------------------------ 1. Peta Makassar dan petak C2 (hlm. 91) ------------------------------ */
const PX = 42;
const PY = 34;
const PS = 44;
const petakPeta = [0, 1, 2, 3, 4, 5].map((i) => garis(`pv${i}`, PX + i * PS, PY, 0, 3 * PS, W.abuTua, 0.9)).concat([0, 1, 2, 3].map((j) => garis(`ph${j}`, PX, PY + j * PS, 5 * PS, 0, W.abuTua, 0.9)));
const labelPeta = [
  ...["A", "B", "C", "D", "E"].map((h, i) => teks(`pl${h}`, PX + PS * (i + 0.5), PY + 3 * PS + 11, h, 8, W.biruMuda)),
  ...[3, 2, 1].map((n, j) => teks(`pn${n}`, PX - 8, PY + PS * (j + 0.5) + 3, String(n), 8, W.merah)),
];

export const ADEGAN_PETA: AdeganStory = {
  id: "peta-makassar",
  judul: "Tigor, Tenri, dan petak C2 di peta",
  sumber: "Buku Siswa hlm. 91",
  latar: "#EAF6FF",
  kutipan: ["Tigor dan Tenri menceritakan perjalanan mereka ke Fort Rotterdam di depan", "Kota Makassar terletak", "pada petak C2"],
  ketukan: [
    k("Sub-Bab C membahas lokasi. Tigor dan Tenri menceritakan perjalanan mereka ke Fort Rotterdam di depan kelas.", tambah(0, teks("jud", 150, 30, "C. Lokasi", 15, W.ungu)), tambah("Tigor", emo("tigor", 80, 100, "👦", 40)), tambah("Tenri", emo("tenri", 130, 100, "👧", 40)), tambah("Fort", emo("fort", 220, 100, "🏰", 46), teks("ft", 220, 130, "Fort Rotterdam", 8.5)), tambah("kelas.", teks("kl", 150, 170, "bercerita di depan kelas", 10, W.merah))),
    k("Fort Rotterdam terletak di Kota Makassar. Tigor menunjukkan letak Makassar pada peta Indonesia yang ada di kelas.", bersih(0), tambah("Makassar.", teks("jp", 150, 22, "Peta Indonesia", 11, W.ungu), kotak("lt", PX, PY, 5 * PS, 3 * PS, W.langit, undefined, { rx: 0 }), petaIndonesia("pl", PX, PY, PS)), tambah("peta", teks("pk", 150, 192, "Kota Makassar di peta kelas", 9.5, W.merah))),
    k("Peta itu dibagi menjadi petak. Huruf A sampai E ada di bawah peta, dan bilangan 1 sampai 3 ada di sisi kiri.", tambah("petak.", petakPeta), tambah("Huruf", labelPeta.slice(0, 5)), tambah("bilangan", labelPeta.slice(5)), hapus("petak.", "pk")),
    k("Kota Makassar terletak pada petak C 2. Cari kolom C, lalu baris 2, dan kotanya ada di petak tempat keduanya bertemu.", tambah("Kota", kotak("kolC", PX + 2 * PS, PY, PS, 3 * PS, "#FDE68A", undefined, { op: 0.55, rx: 0, z: 1 })), tambah("baris", kotak("barisD", PX, PY + PS, 5 * PS, PS, "#BBF7D0", undefined, { op: 0.5, rx: 0, z: 1 })), tambah("bertemu.", bulat("mks", PX + 2.5 * PS, PY + 1.5 * PS, 4.5, W.merah, W.biru, { z: 3 }), teks("mkt", PX + 2.5 * PS, PY + 1.5 * PS + 17, "Makassar: petak C2", 7.6, W.merah, { z: 3, garis: W.putih }))),
    k("Kota tempat kamu tinggal ada di petak mana? Coba cari di peta kelasmu, lalu bandingkan dengan jawaban temanmu.", bersih(0), tambah("tinggal", emo("rumah", 80, 90, "🏠", 40), teks("rt", 80, 114, "kotamu?", 10, W.merah)), tambah("petak", kotak("ptk", 130, 60, 60, 44, W.putih, W.biruMuda, { rx: 2, putus: true }), teks("ptq", 160, 88, "petak ?", 13, W.biruMuda)), tambah("Coba", emo("cari", 240, 90, "🔍", 36)), tambah("bandingkan", emo("tmn", 150, 170, "👥", 30))),
  ],
};

/* ------------------------------ 2. Eksplorasi 3.3: lokasi pada kertas berpetak (hlm. 91-92 dan BG) ------------------------------ */
const S = 28;
const G = kisiTegak("g", 80, 166, S, 6, 5, 1, 8);
const gpt = G.pt;
const redam = [...G.garisV, ...G.garisH].map((g) => ({ id: g.id, warna: W.abu, tebal: 1 }));

export const ADEGAN_EKSPLORASI33: AdeganStory = {
  id: "eksplorasi-33",
  judul: "Eksplorasi 3.3: garis bernama huruf dan bilangan",
  sumber: "Buku Siswa hlm. 91–92 dan Buku Panduan Guru hlm. 101",
  latar: "#F2F7FF",
  kutipan: ["Setiap garis pada bidang berpetak diberi nama", "Garis vertikal dinamai dengan huruf", "garis horizontal dinamai", "dengan bilangan", "terletak pada (B,4)", "yang merupakan perpotongan garis B", "dengan garis 4"],
  ketukan: [
    k("Eksplorasi 3.3: menentukan lokasi pada kertas berpetak. Setiap garis pada bidang berpetak diberi nama.", tambah(0, teks("jud", 150, 22, "Eksplorasi 3.3", 13, W.ungu)), tambah("kertas", G.garisV, G.garisH), tambah("diberi", teks("ket", 150, 40, "setiap garis diberi nama", 9, W.merah))),
    k("Garis vertikal dinamai dengan huruf, A sampai F. Garis horizontal dinamai dengan bilangan, 1 sampai 5.", tambah("huruf,", G.labH), ubah("huruf,", ...G.garisV.map((g) => ({ id: g.id, warna: W.biruMuda, tebal: 1.8 }))), tambah("bilangan,", G.labN), ubah("bilangan,", ...G.garisH.map((g) => ({ id: g.id, warna: W.merah, tebal: 1.8 }))), hapus("Garis", "ket")),
    k("Setiap perpotongan garis vertikal dan horizontal dapat disebut dengan pasangan garis yang berpotongan. Tanda X terletak pada garis B dan garis 4.", ubah(0, ...redam), ubah("garis@3", { id: G.idV("B"), warna: W.biruMuda, tebal: 3 }), ubah("garis@4", { id: G.idH(4), warna: W.merah, tebal: 3 }), tambah("Tanda", tandaX("x1", gpt("B", 4)))),
    k("Jadi tanda X terletak pada B 4. Tanda O terletak pada D 1, perpotongan garis D dengan garis 1.", ubah(0, { id: G.idV("B"), warna: W.abu, tebal: 1 }, { id: G.idH(4), warna: W.abu, tebal: 1 }), tambah("B", teks("lx", gpt("B", 4)[0] + 6, gpt("B", 4)[1] - 7, "(B,4)", 8, W.merah, { anchor: "start" })), tambah("Tanda@2", tandaO("o1", gpt("D", 1))), ubah("perpotongan", { id: G.idV("D"), warna: W.biruMuda, tebal: 3 }), ubah("dengan", { id: G.idH(1), warna: W.merah, tebal: 3 }), tambah("1.", teks("lo", gpt("D", 1)[0] + 6, gpt("D", 1)[1] - 7, "(D,1)", 8, W.biruMuda, { anchor: "start" }))),
    k("Urutannya selalu huruf lebih dahulu, lalu bilangan, seperti B 4 dan D 1. Jadi alamat sebuah titik ditulis sebagai pasangan.", ubah(0, { id: G.idV("D"), warna: W.abu, tebal: 1 }, { id: G.idH(1), warna: W.abu, tebal: 1 }), tambah("Urutannya", kotak("pa", 232, 60, 64, 36, W.putih, W.biru, { rx: 6 }), teks("pt1", 264, 76, "( huruf ,", 7.4), teks("pt2", 264, 89, "bilangan )", 7.4)), tambah("seperti", teks("pc1", 264, 116, "(B,4)", 9, W.merah), teks("pc2", 264, 130, "(D,1)", 9, W.biruMuda))),
    k("Hati-hati, yang diberi nama adalah garisnya, bukan kotak petaknya. Lokasi adalah titik perpotongan garis, seperti tempat tanda X berada.", hapus(0, "pa", "pt1", "pt2", "pc1", "pc2"), tambah("kotak", kotak("pet", gpt("C", 3)[0], gpt("C", 3)[1] - S, S, S, "#FECACA", W.merah, { rx: 0, op: 0.85, z: 1 }), teks("pst", gpt("C", 3)[0] + S / 2, gpt("C", 3)[1] - S / 2 + 3, "bukan", 7, W.merah, { z: 2 })), tambah("perpotongan", bulat("tt", gpt("B", 4)[0], gpt("B", 4)[1], 8, "none", W.hijau, { tebal: 2.6, z: 2 })), tambah("tempat", teks("ok", 262, 80, "titik temu", 8, W.hijau), teks("ok2", 262, 91, "dua garis", 8, W.hijau))),
    k("Kalau bingung, pakai dua lidi. Letakkan satu lidi pada garis C dan satu lidi lain pada garis 5. Titik pertemuannya adalah C 5.", hapus(0, "pet", "pst", "tt", "ok", "ok2"), tambah("lidi", garis("lidi1", gpt("C", 1)[0], gpt("C", 1)[1] + 8, 0, -(4 * S + 16), W.coklat, 4, { gambar: true })), tambah("satu@2", garis("lidi2", gpt("A", 5)[0] - 10, gpt("A", 5)[1], 5 * S + 20, 0, W.salem, 4, { gambar: true })), tambah("Titik", titik("c5", gpt("C", 5), W.merah, 4.4), teks("c5t", gpt("C", 5)[0] + 6, gpt("C", 5)[1] - 7, "(C,5)", 8, W.merah, { anchor: "start" }))),
  ],
};

/* ------------------------------ 3. Permainan tiga segaris (hlm. 92) ------------------------------ */
const H = kisiTegak("h", 150, 142, 26, 6, 5, 1, 7);
const hp = H.pt;
const demo = (id: string, titikTanda: [number, number][], warna: string) => titikTanda.flatMap((t, i) => tandaX(`${id}${i}`, t, warna, 5));

export const ADEGAN_PERMAINAN: AdeganStory = {
  id: "permainan-segaris",
  judul: "Permainan tiga tanda segaris",
  sumber: "Buku Siswa hlm. 92",
  latar: "#FFF6E5",
  kutipan: ["kelompok merah dan kelompok putih", "seorang juru bicara dan seorang juru tulis", "tiga tanda segaris (horizontal/vertikal/diagonal)"],
  ketukan: [
    k("Kita bermain dua kelompok. Kelompok merah memberi tanda X dan kelompok putih memberi tanda O. Yang pertama mendapat tiga tanda segaris menang.", tambah(0, teks("jud", 150, 20, "Kelompok merah lawan putih", 10.5, W.ungu)), tambah("merah", kotak("km", 8, 40, 70, 50, W.merahMuda, W.merah, { rx: 8 }), tandaX("kmx", [43, 66], W.merah, 8)), tambah("putih", kotak("kp", 8, 100, 70, 50, W.putih, W.biruMuda, { rx: 8 }), tandaO("kpo", [43, 126], W.biruMuda, 9)), tambah("tiga", H.garisV, H.garisH, H.labH, H.labN)),
    k("Tiap kelompok memilih satu juru bicara dan satu juru tulis. Juru bicara menyebut lokasi, juru tulis menggambar tandanya di papan.", tambah("bicara", emo("jb", 22, 172, "🗣️", 20), teks("jbt", 22, 192, "juru bicara", 6.4)), tambah("tulis", emo("jt", 84, 172, "✏️", 20), teks("jtt", 84, 192, "juru tulis", 6.4)), tambah("papan", teks("pp", 215, 190, "papan tulis", 8, W.abuTua))),
    k("Merah memilih C 3. Juru bicara berkata C 3, lalu juru tulis menggambar X pada perpotongan garis C dan garis 3.", hapus(0, "jb", "jbt", "jt", "jtt", "pp"), tambah("Merah", teks("urut", 43, 168, "giliran: merah", 8, W.merah)), ubah("C", { id: H.idV("C"), warna: W.biruMuda, tebal: 2.6 }), ubah("garis@2", { id: H.idH(3), warna: W.merah, tebal: 2.6 }), tambah("menggambar", tandaX("m1", hp("C", 3)))),
    k("Putih membalas dengan D 3. Merah memilih C 2, dan putih memilih D 2. Tanda-tanda mulai memenuhi dua garis.", ubah(0, { id: H.idV("C"), warna: W.abu, tebal: 1 }, { id: H.idH(3), warna: W.abu, tebal: 1 }), tambah(3, tandaO("p1", hp("D", 3))), tambah(7, tandaX("m2", hp("C", 2))), tambah(12, tandaO("p2", hp("D", 2)))),
    k("Merah memilih C 1. Sekarang ada tiga X yang segaris, yaitu C 1, C 2, dan C 3. Merah menang!", tambah("C", tandaX("m3", hp("C", 1))), tambah("segaris,", garis("menang", hp("C", 1)[0], hp("C", 1)[1] + 9, 0, -(2 * 26 + 18), W.hijau, 3.4, { gambar: true })), ubah("menang!", { id: "urut", isi: "merah menang!", warna: W.hijau }), tambah("menang!", emo("juara", 43, 192, "🏆", 18))),
    k("Tiga tanda segaris boleh mendatar, menurun, atau miring. Kali ini yang terbentuk menurun, di sepanjang garis C.", bersih(0), tambah("mendatar,", demo("e1", [[24, 96], [48, 96], [72, 96]], W.merah), teks("e1t", 48, 122, "mendatar", 8)), tambah("menurun,", demo("e2", [[150, 72], [150, 96], [150, 120]], W.hijau), teks("e2t", 150, 142, "menurun", 8)), tambah("miring.", demo("e3", [[228, 120], [252, 96], [276, 72]], W.ungu), teks("e3t", 252, 142, "miring", 8)), tambah("terbentuk", kotak("sor", 120, 56, 60, 94, "none", W.hijau, { rx: 8, tebal: 2.4 }), teks("sot", 150, 176, "kali ini: menurun", 9, W.hijau))),
  ],
};
