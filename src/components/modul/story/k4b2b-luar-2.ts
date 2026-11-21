import type { AdeganStory, Obj } from "./logika-story";
import { D, E, W, bak, bulat, emo, garis, garisPec, isiPetak, judul, kartu, kotak, panah, papan, pecahan, teks, tokoh, xTandaPec } from "./k4b2b-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah } from "./k4b2b-bantu";

/*
 * Cerita orisinal IGIL "Bak Warna Pak Joyo" (K4 Bab 2 Sub-Bab B), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b2b.md. Bagian ini: Fraction Bars (Batang Pecahan), Order on Line (Urut di Garis), terapannya, dan ringkasan.
 */

/** Papan besar sebagai latar tulisan: pojok kiri-atas (8, 28), lebar 284, tinggi 112. */
const papanBesar = (): Obj[] => papan("pd", 8, 28, 284, 112);
/** Titik pada garis pecahan `x0` selebar 240 dengan 8 bagian, di tanda ke-`i`, pada tinggi `y`. */
const titik = (id: string, i: number, y: number, x0 = 30, warna = "#FACC15"): Obj => bulat(id, xTandaPec(x0, 240, 8, i), y, 6, warna, W.tinta, { tebal: 1.4, z: 4 });

/* ------------------------------ Fraction Bars: konsep ------------------------------ */
const SUARA_B1 = "Cara kedua, Fraction Bars, atau Batang Pecahan.";
const SUARA_B2 = "Kita menggambar batang-batang sama panjang, lalu mewarnai sebanyak pembilangnya.";
const SUARA_B3 = "Batang yang warnanya lebih panjang menunjukkan pecahan yang lebih besar.";
const SUARA_B4 = "Gambar membuat perbandingan tampak jelas, bahkan tanpa menghitung, asalkan setiap batang sama panjang dan dibagi sama besar.";

export const ADEGAN_LUAR_BATANG: AdeganStory = {
  id: "luar-batang",
  judul: "Fraction Bars: Batang Pecahan",
  sumber: "Metode global: Fraction Bars (konsep)",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Cara 2: Fraction Bars"), ...papanBesar()),
      tambah("Fraction", teks("nm", 150, 64, "Fraction Bars", 15, W.tinta)),
      tambah("Batang", teks("ni", 150, 88, "Batang Pecahan", 12, W.merah)),
      tambah("Pecahan.", ...bak("kb", 100, 104, 100, 14, 4, 2, D.biru)),
    ),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, judul("Menggambar Batang"), ...papanBesar()),
      tambah("batang-batang", ...bak("k1", 40, 54, 220, 22, 6, 0, D.biru), ...bak("k2", 40, 90, 220, 22, 6, 0, D.merah)),
      tambah("sama", teks("sp", 80, 132, "sama panjang", 9, W.hijau)),
      { at: "mewarnai", ubah: isiPetak("k1", 0, 1, D.biru) },
      { at: "sebanyak", ubah: isiPetak("k2", 0, 4, D.merah) },
      tambah("pembilangnya.", teks("pb", 215, 132, "banyak = pembilang", 9, W.merah)),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Lebih Panjang"), ...papanBesar(), ...bak("k1", 40, 54, 220, 22, 6, 2, D.biru), ...bak("k2", 40, 90, 220, 22, 6, 5, D.merah)),
      tambah("warnanya", garis("w1", 40, 82, 73.3, 0, W.biru, 3, { z: 4 }), garis("w2", 40, 118, 183.3, 0, W.merah, 3, { z: 4 })),
      tambah("pecahan", emo("mk", 262, 104, E.mahkota, 22)),
      tambah("besar.", teks("lb", 150, 134, "lebih panjang = lebih besar", 9, W.merah)),
    ),
    k(
      SUARA_B4,
      bersih(0),
      tambah(0, judul("Syaratnya"), ...papanBesar(), ...bak("k1", 40, 56, 220, 22, 6, 2, D.biru), ...bak("k2", 40, 92, 220, 22, 6, 5, D.merah)),
      tambah("jelas,", emo("mt", 150, 134, E.mata, 20)),
      tambah("sama", teks("sy1", 80, 44, "sama panjang", 9, W.hijau)),
      tambah("dibagi", teks("sy2", 215, 44, "bagian sama besar", 9, W.hijau)),
    ),
  ],
};

/* ------------------------------ Fraction Bars: terapan ------------------------------ */
const SUARA_C1 = "Genta menggambar dua batang dibagi delapan, satu diwarnai tiga bagian dan satu diwarnai enam bagian.";
const SUARA_C2 = "Batang kedua jelas lebih panjang warnanya, jadi enam per delapan lebih besar.";
const SUARA_C3 = "Cocok untuk menjelaskan perbandingan kepada orang lain, karena semua orang, termasuk adik kecil, bisa melihatnya sendiri.";
const SUARA_C4 = "Kurang cocok kalau bagian digambar tidak sama besar, karena hasilnya bisa menyesatkan.";

export const ADEGAN_LUAR_BATANG_TERAPAN: AdeganStory = {
  id: "luar-batang-terapan",
  judul: "Batang Pecahan: kapan cocok",
  sumber: "Metode global: Fraction Bars (terapan)",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Batang Genta"), ...papanBesar(), ...tokoh("gt", 40, 184, "Genta")),
      tambah("dua", teks("n2", 150, 44, "2 batang", 10, W.tinta)),
      tambah("dibagi", ...bak("e1", 60, 56, 180, 20, 8, 0, D.biru), ...bak("e2", 60, 92, 180, 20, 8, 0, D.merah), teks("l1", 36, 70, "1", 12, W.tinta), teks("l2", 36, 106, "2", 12, W.tinta)),
      tambah("delapan,", teks("n8", 150, 128, "dibagi 8", 10, W.tinta)),
      { at: "tiga", ubah: isiPetak("e1", 0, 2, D.biru) },
      { at: "enam", ubah: isiPetak("e2", 0, 5, D.merah) },
      tambah("bagian@2", teks("t3", 262, 70, "3", 12, W.biru), teks("t6", 262, 106, "6", 12, W.merah)),
    ),
    k(
      SUARA_C2,
      hapus(0, "t3", "t6"),
      sorotkan("kedua", "e2"),
      tambah("jelas,", emo("mt", 215, 140, E.mata, 20)),
      tambah("enam", ...pecahan("fe", 262, 100, 6, 8, 14, W.merah).slice(0, 2)),
      tambah("delapan", ...pecahan("fe", 262, 100, 6, 8, 14, W.merah).slice(2)),
      tambah("besar.", emo("mk", 262, 66, E.mahkota, 20)),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Mudah Dijelaskan"), ...papanBesar(), ...tokoh("gt", 40, 184, "Genta")),
      tambah("Cocok", emo("ok", 262, 52, E.benar, 22)),
      tambah("menjelaskan", ...bak("h1", 100, 54, 100, 16, 8, 3, D.biru), ...bak("h2", 100, 80, 100, 16, 8, 6, D.merah)),
      tambah("orang,", emo("o1", 90, 126, E.satria, 20), emo("o2", 120, 126, E.laras, 20)),
      tambah("adik", emo("o3", 170, 126, E.satria, 14)),
      tambah("melihatnya", emo("mt", 230, 100, E.mata, 22)),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, judul("Bagian Tidak Sama"), ...papanBesar(), ...tokoh("gt", 40, 184, "Genta")),
      tambah("Kurang", emo("xs", 262, 52, E.salah, 22)),
      tambah("digambar", kotak("u1", 60, 70, 30, 22, "#BFDBFE", W.biru, { rx: 0, z: 2 }), kotak("u2", 90, 70, 70, 22, "#BFDBFE", W.biru, { rx: 0, z: 2 }), kotak("u3", 160, 70, 20, 22, "#BFDBFE", W.biru, { rx: 0, z: 2 }), kotak("u4", 180, 70, 60, 22, "#BFDBFE", W.biru, { rx: 0, z: 2 })),
      tambah("sama", teks("ts", 150, 112, "bagian tidak sama besar", 9, W.merah)),
      tambah("hasilnya", emo("kz", 150, 134, E.pikir, 20)),
      tambah("menyesatkan.", emo("pk", 262, 100, E.kaget, 22)),
    ),
  ],
};

/* ------------------------------ Order on Line: konsep ------------------------------ */
const SUARA_G1 = "Cara ketiga, Order on Line, atau Urut di Garis.";
const SUARA_G2 = "Kita membagi garis dari nol sampai satu sesuai penyebut, lalu menaruh tiap pecahan tepat pada tandanya masing-masing.";
const SUARA_G3 = "Pecahan yang lebih besar berada lebih ke kanan.";
const SUARA_G4 = "Membaca urutan dari kiri ke kanan memberi urutan dari terkecil sampai terbesar.";

export const ADEGAN_LUAR_GARIS: AdeganStory = {
  id: "luar-garis",
  judul: "Order on Line: Urut di Garis",
  sumber: "Metode global: Order on Line (konsep)",
  latar: "#F0FDFA",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Cara 3: Order on Line"), ...papanBesar()),
      tambah("Order", teks("nm", 150, 64, "Order on Line", 15, W.tinta)),
      tambah("Urut", teks("ni", 150, 88, "Urut di Garis", 12, W.merah)),
      tambah("Garis.", ...garisPec("gl", 40, 116, 220, 8)),
    ),
    k(
      SUARA_G2,
      bersih(0),
      tambah(0, judul("Membagi Garis"), ...papanBesar()),
      tambah("garis", ...garisPec("gl", 30, 100, 240, 8)),
      tambah("nol", teks("z0", 30, 120, "0", 11, W.tinta)),
      tambah("satu", teks("z1", 270, 120, "1", 11, W.tinta)),
      tambah("penyebut,", teks("z8", 150, 128, "8 bagian sama besar", 9, W.tinta)),
      tambah("menaruh", titik("t1", 1, 100), titik("t2", 4, 100), titik("t3", 6, 100)),
      tambah("tandanya", teks("td", 150, 70, "tiap titik pas di tandanya", 9, W.merah)),
    ),
    k(
      SUARA_G3,
      bersih(0),
      tambah(0, judul("Lebih ke Kanan"), ...papanBesar(), ...garisPec("gl", 30, 100, 240, 8)),
      tambah("Pecahan", ...pecahan("a", 90, 70, 2, 8, 16, W.biru), titik("ta", 2, 100)),
      tambah("besar", ...pecahan("b", 210, 70, 6, 8, 16, W.merah), titik("tb", 6, 100)),
      tambah("kanan.", panah("pn", 100, 126, 100, 0, W.merah, 2.6), teks("lb", 150, 116, "lebih besar", 9, W.merah)),
    ),
    k(
      SUARA_G4,
      bersih(0),
      tambah(0, judul("Baca dari Kiri"), ...papanBesar(), ...garisPec("gl", 30, 100, 240, 8), titik("t1", 1, 100), titik("t2", 4, 100), titik("t3", 7, 100)),
      tambah("kiri", panah("rd", 40, 70, 200, 0, W.ungu, 2.6)),
      tambah("terkecil", teks("tk", 60, 126, "terkecil", 9, W.tinta)),
      tambah("terbesar.", teks("tb", 240, 126, "terbesar", 9, W.tinta)),
    ),
  ],
};

/* ------------------------------ Order on Line: terapan ------------------------------ */
const SUARA_H1 = "Satria menaruh satu per delapan, empat per delapan, dan tujuh per delapan pada garis.";
const SUARA_H2 = "Jepitan paling kiri adalah yang terkecil, dan jepitan paling kanan adalah yang terbesar.";
const SUARA_H3 = "Cocok untuk mengurutkan tiga pecahan atau lebih sekaligus dalam satu pandangan.";
const SUARA_H4 = "Kurang cocok kalau hanya membandingkan dua pecahan, karena bisa lebih cepat dengan pembilang.";
const jepit = (id: string, i: number, warna: string): Obj => kotak(id, xTandaPec(30, 240, 8, i) - 3, 104, 6, 12, warna, W.tinta, { rx: 1, tebal: 1, z: 4 });

export const ADEGAN_LUAR_GARIS_TERAPAN: AdeganStory = {
  id: "luar-garis-terapan",
  judul: "Urut di Garis: kapan cocok",
  sumber: "Metode global: Order on Line (terapan)",
  latar: "#F0FDFA",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Jepitan Satria"), ...papanBesar(), ...tokoh("st", 40, 184, "Satria")),
      tambah("menaruh", ...garisPec("gl", 30, 110, 240, 8)),
      tambah("satu", ...pecahan("p1", 60, 78, 1, 8, 16, W.biru), jepit("j1", 1, "#93C5FD")),
      tambah("empat", ...pecahan("p4", 150, 78, 4, 8, 16, W.merah), jepit("j4", 4, "#FCA5A5")),
      tambah("tujuh", ...pecahan("p7", 240, 78, 7, 8, 16, W.hijauTua), jepit("j7", 7, "#86EFAC")),
    ),
    k(
      SUARA_H2,
      sorotkan("kiri", "j1"),
      tambah("terkecil,", teks("tk", 60, 136, "terkecil", 9, W.merah)),
      sorotkan("kanan", "j7"),
      tambah("terbesar.", teks("tb", 240, 136, "terbesar", 9, W.hijauTua)),
    ),
    k(
      SUARA_H3,
      bersih(0),
      tambah(0, judul("Banyak Pecahan"), ...papanBesar(), ...tokoh("st", 40, 184, "Satria")),
      tambah("Cocok", emo("ok", 262, 52, E.benar, 22)),
      tambah("tiga", teks("n3", 150, 60, "3 pecahan atau lebih", 11, W.tinta)),
      tambah("sekaligus", ...garisPec("gl", 30, 104, 240, 8), ...[1, 2, 3, 4, 5, 6, 7].map((i) => titik(`d${i}`, i, 104))),
      tambah("satu", teks("n1", 150, 128, "1 pandangan", 11, W.merah)),
    ),
    k(
      SUARA_H4,
      bersih(0),
      tambah(0, judul("Hanya Dua Pecahan"), ...papanBesar(), ...tokoh("st", 40, 184, "Satria")),
      tambah("Kurang", emo("xs", 262, 52, E.salah, 22)),
      tambah("dua", teks("n2", 150, 66, "2 pecahan", 13, W.tinta)),
      tambah("cepat", teks("cp", 150, 96, "lebih cepat", 12, W.merah)),
      tambah("pembilang.", ...pecahan("a", 110, 116, 3, 8, 14, W.biru), teks("vs", 150, 124, "<", 18, W.tinta), ...pecahan("b", 190, 116, 6, 8, 14, W.merah)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita lihat bersama Pak Joyo. Mana yang pas tergantung keadaan.";
const SUARA_R2 = "Ingin cepat membandingkan dua pecahan, pakai Banding Pembilang. Ingin menjelaskan dengan gambar, pakai Batang Pecahan.";
const SUARA_R3 = "Ingin mengurutkan banyak pecahan, pakai Urut di Garis. Apa pun caranya, pastikan penyebutnya sama.";
const SUARA_R4 = "Menurutmu, untuk mengurutkan lima bak berbeda isinya, cara mana yang paling pas?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Metode global: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tiga Cara, Pilih yang Pas"), ...kartu("r0", 20, 38, 156, 30, "#BFDBFE", ["Banding Pembilang"], 11), ...kartu("r1", 20, 78, 156, 30, "#FDE68A", ["Batang Pecahan"], 11), ...kartu("r2", 20, 118, 156, 30, "#BBF7D0", ["Urut di Garis"], 11), teks("n3", 250, 90, "3 cara", 11, W.ungu)),
      tambah("Pak", ...tokoh("pj", 250, 184, "Pak Joyo")),
      tambah("pas", emo("tq", 250, 128, E.tanya, 20)),
    ),
    k(
      SUARA_R2,
      tambah("dua", teks("n2", 250, 60, "2 pecahan", 9, W.ungu)),
      sorotkan("Banding@2", "r0-k"),
      tambah("Pembilang.", emo("ok", 192, 58, E.benar, 20)),
      redamkan("menjelaskan", "r0-k"),
      sorotkan("Batang", "r1-k"),
    ),
    k(
      SUARA_R3,
      hapus(0, "n2", "tq"),
      redamkan("mengurutkan", "r1-k"),
      sorotkan("Urut@2", "r2-k"),
      tambah("Garis.", emo("ok3", 192, 138, E.benar, 20)),
      tambah("penyebutnya", teks("ps", 250, 100, "penyebut sama", 8, W.hijau)),
    ),
    k(
      SUARA_R4,
      hapus(0, "n3", "ok", "ok3", "ps"),
      redamkan(0, "r2-k"),
      tambah("lima", teks("n5", 250, 96, "5 bak", 11, W.ungu)),
      tambah("berbeda", teks("tq2", 250, 128, "?", 36, W.merah)),
      tambah("pas?", emo("pl", 284, 146, E.pikir, 22)),
    ),
  ],
};
