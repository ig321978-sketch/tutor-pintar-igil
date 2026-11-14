import type { AdeganStory } from "./logika-story";
import { W, emo, judul, kartu, pangkat, pohon, simpul, tangga, teks, type Pohon } from "./k5b2e-gambar";
import { bersih, k, tambah } from "./k5b2e-bantu";
import { POHON_196, POHON_270_A, POHON_270_B } from "./k5b2e-materi-2";

/** Pohon 60 dua bentuk (contoh konsep Factor Tree): enam kali sepuluh, dan bentuk tangga. Ujung primanya sama: 2, 2, 3, 5. */
export const POHON_60_A: Pohon = { n: 60, a: { n: 6, a: { n: 2 }, b: { n: 3 } }, b: { n: 10, a: { n: 2 }, b: { n: 5 } } };
export const POHON_60_B: Pohon = tangga(60, [2, 2, 3, 5]);
/** Pohon 300 bentuk lain (tiga puluh kali sepuluh): ujung primanya sama dengan pohon buku. */
export const POHON_300_B: Pohon = { n: 300, a: { n: 30, a: { n: 5 }, b: { n: 6, a: { n: 2 }, b: { n: 3 } } }, b: { n: 10, a: { n: 2 }, b: { n: 5 } } };
export const POHON_72 = tangga(72, [2, 2, 2, 3, 3]);
export const POHON_150 = tangga(150, [2, 3, 5, 5]);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk KPK dan FPB dengan faktor prima",
  sumber: "Metode luar: pembuka; contoh Buku Siswa hlm. 53–62",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Bagaimana menentukan KPK dan FPB dengan faktor prima? Guru di berbagai negara punya cara berbeda. Dalam video ini kita lihat empat metode dari luar.",
      tambah(0, judul("Empat metode dari luar")),
      tambah("menentukan", ...kartu("pq", 20, 40, 260, 36, W.krem, ["KPK dan FPB dengan faktor prima"], 10)),
      tambah("Guru", emo("pg", 150, 128, "🌍", 44)),
      tambah("empat", teks("pe", 150, 170, "4 metode", 14, W.biru)),
    ),
    k(
      "Empat metode itu: Factor Tree, Prime Exponent Rules, LCM-GCF Bridge, dan Prime Venn Diagram.",
      bersih(0),
      tambah(0, judul("Empat metode")),
      tambah("Factor", ...kartu("m1", 20, 32, 260, 30, W.hijauMuda, ["1. Factor Tree"], 9.6)),
      tambah("Prime@1", ...kartu("m2", 20, 72, 260, 30, W.langit, ["2. Prime Exponent Rules"], 9.6)),
      tambah("LCM-GCF", ...kartu("m3", 20, 112, 260, 30, W.krem, ["3. LCM-GCF Bridge"], 9.6)),
      tambah("Prime@2", ...kartu("m4", 20, 152, 260, 30, W.pink, ["4. Prime Venn Diagram"], 9.6)),
    ),
    k(
      "Keempatnya bertumpu pada satu gagasan: setiap bilangan punya susunan bilangan prima yang unik, seperti sidik jari.",
      bersih(0),
      tambah(0, judul("Satu gagasan yang sama")),
      tambah("setiap", teks("g1", 150, 66, "72 = 2 × 2 × 2 × 3 × 3", 17, W.biru)),
      tambah("unik,", teks("g2", 150, 108, "150 = 2 × 3 × 5 × 5", 17, W.hijau)),
      tambah("sidik", emo("g3", 150, 160, "🔍", 36)),
    ),
    k(
      "Angkanya dari buku: tujuh puluh dua dan seratus lima puluh, seratus sembilan puluh enam, tiga ratus, dua ratus tujuh puluh, serta soal Uji Kompetensi dan soal tambahan.",
      bersih(0),
      tambah(0, judul("Angka dari buku")),
      tambah("tujuh", ...kartu("a1", 20, 32, 260, 30, W.langit, ["72 dan 150"], 9.6)),
      tambah("seratus@2", ...kartu("a2", 20, 72, 260, 30, W.hijauMuda, ["196, 300, dan 270"], 9.6)),
      tambah("Uji", ...kartu("a3", 20, 112, 260, 30, W.krem, ["Uji Kompetensi: 45 dan 135, 96 dan 120"], 9.6)),
      tambah("tambahan.", ...kartu("a4", 20, 152, 260, 30, W.pink, ["soal tambahan: 36 dan 108"], 9.6)),
    ),
  ],
};

/* ------------------------------ 2. Factor Tree: konsep ------------------------------ */
const f60a = pohon("f60a", POHON_60_A, 150, 44, 56, 34, 9, 9, 0.5);
const f60b = pohon("f60b", POHON_60_A, 75, 48, 28, 30, 8, 8.4, 0.5);
const f60c = pohon("f60c", POHON_60_B, 225, 48, 26, 30, 8, 8.4, 0.7);

export const ADEGAN_LUAR_FT: AdeganStory = {
  id: "luar-ft",
  judul: "Factor Tree: pohon faktor",
  sumber: "Metode luar: Factor Tree",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Metode pertama, Factor Tree atau pohon faktor, memecah bilangan menjadi dua faktor, lalu memecah faktor yang belum prima, sampai semua ujungnya prima.",
      tambah(0, judul("Factor Tree"), ...f60a.tingkat[0]),
      tambah(7, ...f60a.tingkat[1]),
      tambah(12, ...f60a.tingkat[2]),
      tambah("ujungnya", teks("f60e", 150, 166, "60 = 2 × 3 × 2 × 5", 12, W.hijau)),
    ),
    k(
      "Aturannya: boleh mulai dari pasangan faktor mana saja, asalkan terus dipecah sampai prima. Bentuk pohon boleh berbeda, tetapi ujung primanya selalu sama.",
      bersih(0),
      tambah(0, judul("Bentuk berbeda, ujung sama"), teks("fa", 75, 32, "bentuk A", 8.6, W.biru), teks("fb", 225, 32, "bentuk B", 8.6, W.biru)),
      tambah("Aturannya", ...f60b.semua),
      tambah("Bentuk", ...f60c.semua),
      tambah("selalu", teks("f60f", 150, 176, "ujung prima sama: 2, 2, 3, 5", 11, W.hijau)),
    ),
    k(
      "Kelebihannya: bergambar, mudah diperiksa, dan hasilnya unik, hanya ada satu susunan prima untuk tiap bilangan. Kekurangannya: kurang praktis untuk bilangan yang sangat besar.",
      bersih(0),
      tambah(0, judul("Kelebihan dan kekurangan")),
      tambah("Kelebihannya:", ...kartu("kl", 14, 40, 130, 60, W.hijauMuda, ["bergambar,", "mudah diperiksa,", "hasilnya unik"], 9), emo("kle", 79, 126, "👍", 26)),
      tambah("Kekurangannya:", ...kartu("kk", 156, 40, 130, 60, W.merahMuda, ["kurang praktis", "untuk bilangan", "sangat besar"], 9), emo("kke", 221, 126, "🤔", 26)),
    ),
    k(
      "Cara mengecek: kalikan semua ujung prima, hasilnya harus kembali ke bilangan semula, yaitu enam puluh.",
      bersih(0),
      tambah(0, judul("Cek hasil")),
      tambah("kalikan", teks("c1", 150, 70, "2 × 2 × 3 × 5 = 60", 20, W.hijau)),
      tambah("kembali", ...kartu("c2", 60, 100, 180, 36, W.krem, ["kembali ke 60"], 11)),
      tambah("enam", emo("c3", 150, 170, "✅", 30)),
    ),
  ],
};

/* ------------------------------ 3. Factor Tree: penerapan ------------------------------ */
const g196 = pohon("g196", POHON_196, 150, 44, 30, 30, 8.5, 8.4, 0.7);
const g300 = pohon("g300", POHON_300_B, 150, 44, 62, 34, 8.5, 8.4, 0.55);
const g270a = pohon("g270a", POHON_270_A, 75, 44, 24, 26, 7.5, 7.6, 0.7);
const g270b = pohon("g270b", POHON_270_B, 225, 44, 36, 26, 7.5, 7.6, 0.62);
const g72 = pohon("g72", POHON_72, 75, 44, 22, 26, 7.5, 7.6, 0.75);
const g150 = pohon("g150", POHON_150, 225, 44, 22, 26, 7.5, 7.6, 0.75);

export const ADEGAN_LUAR_FT_TERAPAN: AdeganStory = {
  id: "luar-ft-terapan",
  judul: "Factor Tree pada angka buku: 196, 300, 270, 72, dan 150",
  sumber: "Metode luar: Factor Tree; Buku Siswa hlm. 56–57",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Contoh buku: seratus sembilan puluh enam menjadi dua kali sembilan puluh delapan, lalu dua kali empat puluh sembilan, lalu tujuh kali tujuh. Ujungnya dua, dua, tujuh, tujuh.",
      tambah(0, judul("Factor Tree: 196"), ...g196.tingkat[0]),
      tambah(6, ...g196.tingkat[1]),
      tambah(12, ...g196.tingkat[2]),
      tambah(18, ...g196.tingkat[3]),
      tambah("Ujungnya", teks("t196", 150, 180, "196 = 2 × 2 × 7 × 7", 11, W.hijau)),
    ),
    k(
      "Tiga ratus bisa dipecah menjadi tiga puluh kali sepuluh. Tiga puluh menjadi lima kali enam, enam menjadi dua kali tiga, sepuluh menjadi dua kali lima. Ujungnya tetap dua, dua, tiga, lima, lima.",
      bersih(0),
      tambah(0, judul("Factor Tree: 300 bentuk lain"), ...simpul(g300.semua, "g300", "")),
      tambah(4, ...simpul(g300.semua, "g300", "a", "b")),
      tambah(11, ...simpul(g300.semua, "g300", "aa", "ab")),
      tambah(16, ...simpul(g300.semua, "g300", "aba", "abb")),
      tambah(21, ...simpul(g300.semua, "g300", "ba", "bb")),
      tambah("Ujungnya", teks("t300", 150, 190, "300 = 2 × 2 × 3 × 5 × 5", 11, W.hijau)),
    ),
    k(
      "Dua ratus tujuh puluh bisa dua kali seratus tiga puluh lima, atau dua puluh tujuh kali sepuluh. Bentuk pohonnya berbeda, ujungnya sama: dua, tiga, tiga, tiga, lima.",
      bersih(0),
      tambah(0, judul("Factor Tree: 270"), teks("la", 75, 32, "dua kali 135", 8.6, W.biru), teks("lb", 225, 32, "27 kali 10", 8.6, W.biru)),
      tambah("Dua", ...g270a.semua),
      tambah("atau", ...g270b.semua),
      tambah("ujungnya", teks("t270", 150, 188, "270 = 2 × 3 × 3 × 3 × 5", 10, W.hijau)),
    ),
    k(
      "Pohon tujuh puluh dua berujung dua, dua, dua, tiga, tiga. Pohon seratus lima puluh berujung dua, tiga, lima, lima. Kedua pohon ini siap dipakai untuk KPK dan FPB.",
      bersih(0),
      tambah(0, judul("Siap untuk KPK dan FPB")),
      tambah("tujuh", ...g72.semua, teks("t72", 75, 176, "72 = 2 × 2 × 2 × 3 × 3", 8.6, W.biru)),
      tambah("seratus", ...g150.semua, teks("t150", 225, 176, "150 = 2 × 3 × 5 × 5", 8.6, W.hijau)),
    ),
  ],
};

/* ------------------------------ 4. Prime Exponent Rules: konsep ------------------------------ */
export const ADEGAN_LUAR_PER: AdeganStory = {
  id: "luar-per",
  judul: "Prime Exponent Rules: pangkat prima",
  sumber: "Metode luar: Prime Exponent Rules",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Metode kedua, Prime Exponent Rules, menulis faktorisasi prima dengan pangkat. Dua kali dua kali dua ditulis dua pangkat tiga, dan tiga kali tiga ditulis tiga pangkat dua.",
      tambah(0, judul("Prime Exponent Rules")),
      tambah("Dua@2", teks("p1", 110, 74, "2 × 2 × 2 =", 15, W.biru), ...pangkat("pa", 200, 74, [[2, 3]], 15, W.merah)),
      tambah("tiga@2", teks("p2", 110, 124, "3 × 3 =", 15, W.biru), ...pangkat("pb", 190, 124, [[3, 2]], 15, W.merah)),
    ),
    k(
      "Setelah ditulis dengan pangkat, KPK mengambil pangkat terbesar tiap bilangan prima dari kedua bilangan, dan prima yang hanya muncul sekali tetap diambil.",
      bersih(0),
      tambah(0, judul("Aturan KPK")),
      tambah("KPK", ...kartu("ka", 20, 40, 260, 40, W.hijauMuda, ["KPK: ambil pangkat TERBESAR", "tiap bilangan prima"], 10)),
      tambah("prima@2", ...kartu("kb", 20, 96, 260, 40, W.krem, ["prima yang hanya muncul", "sekali tetap diambil"], 10)),
    ),
    k(
      "FPB mengambil pangkat terkecil, tetapi hanya untuk prima yang ada di kedua bilangan. Prima yang tidak muncul di salah satu bilangan dianggap berpangkat nol, jadi tidak ikut.",
      bersih(0),
      tambah(0, judul("Aturan FPB")),
      tambah("FPB", ...kartu("fa", 20, 40, 260, 40, W.merahMuda, ["FPB: ambil pangkat TERKECIL", "hanya prima di kedua bilangan"], 10)),
      tambah("nol,", ...kartu("fb", 20, 96, 260, 40, W.krem, ["prima yang tidak ada", "dianggap berpangkat 0"], 10)),
    ),
    k(
      "Kelebihannya: aturannya jelas dan cepat untuk bilangan besar. Kekurangannya: harus paham pangkat dan teliti membandingkan pangkat.",
      bersih(0),
      tambah(0, judul("Kelebihan dan kekurangan")),
      tambah("Kelebihannya:", ...kartu("kl", 14, 40, 130, 54, W.hijauMuda, ["jelas dan cepat", "untuk bilangan besar"], 9), emo("kle", 79, 124, "👍", 26)),
      tambah("Kekurangannya:", ...kartu("kk", 156, 40, 130, 54, W.merahMuda, ["harus paham pangkat", "dan teliti"], 9), emo("kke", 221, 124, "🤔", 26)),
    ),
  ],
};

/* ------------------------------ 5. Prime Exponent Rules: penerapan ------------------------------ */
export const ADEGAN_LUAR_PER_TERAPAN: AdeganStory = {
  id: "luar-per-terapan",
  judul: "Prime Exponent Rules pada 72 dan 150, 45 dan 135",
  sumber: "Metode luar: Prime Exponent Rules; Buku Siswa hlm. 56–57, 61",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Tujuh puluh dua sama dengan dua pangkat tiga kali tiga pangkat dua. Seratus lima puluh sama dengan dua kali tiga kali lima pangkat dua.",
      tambah(0, judul("72 dan 150 dengan pangkat")),
      tambah("Tujuh", teks("l1", 138, 66, "72 =", 14, W.biru), ...pangkat("x1", 192, 66, [[2, 3], [3, 2]], 14, W.biru)),
      tambah("Seratus", teks("l2", 138, 116, "150 =", 14, W.hijau), ...pangkat("x2", 195, 116, [[2, 1], [3, 1], [5, 2]], 14, W.hijau)),
    ),
    k(
      "KPK: dua pangkat tiga, tiga pangkat dua, lima pangkat dua, yaitu delapan kali sembilan kali dua puluh lima, sama dengan seribu delapan ratus.",
      bersih(0),
      tambah(0, judul("KPK: pangkat terbesar")),
      tambah("KPK", teks("k0", 50, 66, "KPK =", 13, W.biru), ...pangkat("k1", 160, 66, [[2, 3], [3, 2], [5, 2]], 13, W.hijau)),
      tambah("delapan", teks("k2", 150, 118, "= 8 × 9 × 25 = 1.800", 15, W.hijau)),
    ),
    k(
      "FPB: dua pangkat satu dan tiga pangkat satu, dua kali tiga sama dengan enam. Lima tidak ikut, karena tidak ada di tujuh puluh dua.",
      bersih(0),
      tambah(0, judul("FPB: pangkat terkecil")),
      tambah("FPB", teks("f0", 50, 66, "FPB =", 13, W.biru), ...pangkat("f1", 130, 66, [[2, 1], [3, 1]], 13, W.merah)),
      tambah("tiga@2", teks("f2", 150, 106, "= 2 × 3 = 6", 15, W.merah)),
      tambah("Lima", ...kartu("f3", 40, 128, 220, 36, W.krem, ["5 tidak ikut: tidak ada di 72"], 10)),
    ),
    k(
      "Cara sama untuk empat puluh lima dan seratus tiga puluh lima: tiga pangkat dua kali lima, dan tiga pangkat tiga kali lima. FPB-nya empat puluh lima, KPK-nya seratus tiga puluh lima.",
      bersih(0),
      tambah(0, judul("Uji Kompetensi 1a")),
      tambah("Empat", teks("u1", 90, 56, "45 =", 13, W.biru), ...pangkat("u2", 160, 56, [[3, 2], [5, 1]], 13, W.biru)),
      tambah("seratus", teks("u3", 90, 90, "135 =", 13, W.biru), ...pangkat("u4", 160, 90, [[3, 3], [5, 1]], 13, W.biru)),
      tambah("FPB-nya", teks("u5", 150, 130, "FPB = 3² × 5 = 9 × 5 = 45", 13, W.merah)),
      tambah("KPK-nya", teks("u6", 150, 164, "KPK = 3³ × 5 = 27 × 5 = 135", 13, W.hijau)),
    ),
  ],
};

