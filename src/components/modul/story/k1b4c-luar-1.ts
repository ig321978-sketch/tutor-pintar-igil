import type { AdeganStory, Obj } from "./logika-story";
import { W, emo, judul, kartu, kotak, lengkung, mobil, segiEmpat, segitigaSama, teks } from "./k1b4c-gambar";
import { bersih, hapus, hitungBagian, idx, k, rangkai, redamkan, sorotkan, tambah, ubah } from "./k1b4c-bantu";

export const NAMA_METODE = ["Kenali Bentuk", "Pilah Ciri", "Bentuk di Sekitar"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [NAMA_METODE[i]], 9.6);

const ANAK = "\u{1F9D2}";

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara punya cara lain untuk mengajarkan bentuk bangun. Di video ini kita lihat tiga cara itu.";
const SUARA_O2 = "Cara pertama bernama Kenali Bentuk. Cara kedua bernama Pilah Ciri. Cara ketiga bernama Bentuk di Sekitar.";
const SUARA_O3 = "Kenali Bentuk membuat kita melihat wujud bentuk. Pilah Ciri membuat kita memilah bentuk. Bentuk di Sekitar membuat kita mencari bentuk pada benda sehari-hari.";
const SUARA_O4 = "Ketiganya membantu kita melihat bahwa bangun disusun dari bentuk yang bisa dikenali. Semuanya kita lakukan dengan mengetuk di layar.";
const SUARA_O5 = "Kita akan mencoba tiap cara bersama Upe, Kira, Malosi, dan Wei, seperti kamu mencobanya di layar.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk menyusun dan mengurai bentuk",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)), tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      ...NAMA_METODE.map((m, i) => tambah(["Bentuk.", "Ciri.", "Sekitar."][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Apa yang kita lakukan?")),
      tambah("wujud", ...kartu("n0", 20, 40, 260, 38, W.hijauMuda, ["melihat wujud bentuk"], 11), emo("e0", 40, 66, "\u{1F440}", 20)),
      tambah("memilah", ...kartu("n1", 20, 88, 260, 38, W.langit, ["memilah bentuk"], 11), emo("e1", 40, 114, "\u{1F9FA}", 20)),
      tambah("mencari", ...kartu("n2", 20, 136, 260, 38, W.pink, ["mencari bentuk di benda"], 11), emo("e2", 40, 162, "\u{1F3E0}", 20)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Bentuk pembentuk bangun")),
      tambah("bangun", emo("i1", 60, 90, "\u{1F53A}", 40)),
      tambah("bentuk", emo("i2", 150, 90, "\u{2B1C}", 40)),
      tambah("dikenali.", emo("i3", 240, 90, "\u{1F7E1}", 40)),
      tambah("mengetuk", ...kartu("iq", 40, 124, 220, 36, W.emas, ["ketuk di layar"], 11)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Dicoba di layar")),
      ...[["Upe", 45], ["Kira", 115], ["Malosi", 185], ["Wei", 255]].map(([nama, px]) => tambah(nama as string, emo(`o-${nama}`, px as number, 110, ANAK, 34), teks(`on-${nama}`, px as number, 130, nama as string, 8.6))),
      tambah("layar.", ...kartu("ot", 40, 150, 220, 30, W.krem, ["ketuk, seret, dan pilih"], 10)),
    ),
  ],
};

/* ------------------------------ 2. Kenali Bentuk: konsep ------------------------------ */
const SUARA_K1 = "Cara pertama, Kenali Bentuk. Kita lihat wujudnya dulu, lalu kita sebut namanya.";
const SUARA_K2 = "Ini bentuk lengkung. Wujudnya bulat, dan tidak punya sudut.";
const SUARA_K3 = "Ini segitiga. Wujudnya punya tiga sisi lurus dan tiga sudut.";
const SUARA_K4 = "Ini segi empat. Wujudnya punya empat sisi lurus dan empat sudut.";
const SUARA_K5 = "Sekarang coba sebut: lengkung, segitiga, segi empat. Ucapkan lagi mengikuti suara guru.";

export const ADEGAN_LUAR_KENALI: AdeganStory = {
  id: "luar-kenali",
  judul: "Kenali Bentuk: lihat wujudnya",
  sumber: "Metode luar: Kenali Bentuk",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_K1, tambah(0, ...kepala(0)), tambah("wujudnya", emo("mt", 150, 110, "\u{1F440}", 50)), tambah("namanya.", ...kartu("kk", 50, 140, 200, 32, W.emas, ["lihat wujud, sebut nama"], 11))),
    k(
      SUARA_K2,
      hapus(0, "mt", "kk-k", "kk-t0"),
      tambah("lengkung.", lengkung("ow", 55, 100, 24), teks("nw", 55, 150, "lengkung", 9.4)),
      tambah("tidak", teks("sw", 55, 164, "tanpa sudut", 8.4, W.merah)),
    ),
    k(SUARA_K3, tambah("segitiga.", segitigaSama("os", 110, 72, 70, 56, W.segitiga), teks("ns", 145, 150, "segitiga", 9.4)), tambah("sudut.", teks("ss", 145, 164, "3 sisi, 3 sudut", 8.4, W.merah))),
    k(SUARA_K4, tambah("empat.", segiEmpat("oe", 205, 72, 66, 56, W.segiEmpat), teks("ne", 238, 150, "segi empat", 9.4)), tambah("sudut.", teks("se", 238, 164, "4 sisi, 4 sudut", 8.4, W.merah))),
    k(
      SUARA_K5,
      sorotkan("lengkung,", "ow"),
      redamkan("segitiga,", "ow"),
      sorotkan("segitiga,", "os"),
      redamkan("segi@2", "os"),
      sorotkan("segi@2", "oe"),
      redamkan("Ucapkan", "oe"),
      tambah("Ucapkan", emo("sg", 150, 190, "\u{1F50A}", 22)),
    ),
  ],
};

/* ------------------------------ 3. Kenali Bentuk: terapan pada mobil ------------------------------ */
const SUARA_L1 = "Sekarang kita pakai Kenali Bentuk pada mobil mainan Kira. Lihat wujud tiap bagian mobil itu.";
const SUARA_L2 = "Badan mobil wujudnya segi empat. Kabinnya juga segi empat. Kita hitung: satu, dua.";
const SUARA_L3 = "Roda mobil wujudnya lengkung. Kita hitung rodanya: satu, dua.";
const SUARA_L4 = "Jadi mobil ini tersusun dari dua segi empat dan dua bentuk lengkung. Dua ditambah dua sama dengan empat bagian.";

export const ADEGAN_LUAR_KENALI_TERAPAN: AdeganStory = {
  id: "luar-kenali-terapan",
  judul: "Kenali Bentuk: mobil Kira",
  sumber: "Metode luar: Kenali Bentuk, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_L1, tambah(0, ...kepala(0)), tambah("Kira", emo("a-Kira", 276, 70, ANAK, 26), teks("n-Kira", 276, 84, "Kira", 8.4)), tambah("mobil", ...mobil(100, 76))),
    k(SUARA_L2, ...hitungBagian(SUARA_L2, ["mb0", "mb1"], "segi empat", "mc", 44, 96, "hitung:")),
    k(SUARA_L3, redamkan(0, "mb1"), ...hitungBagian(SUARA_L3, ["mb2", "mb3"], "lengkung", "md", 44, 112, "rodanya:")),
    k(SUARA_L4, redamkan(0, "mb3"), ...rangkai(SUARA_L4, "me", 184, ["2", "+", "2", "=", "4"], ["Dua", "ditambah", "dua", "sama", "empat"], "lengkung.", 20)),
  ],
};

/* ------------------------------ 4. Pilah Ciri: konsep ------------------------------ */
const SUARA_P1 = "Cara kedua, Pilah Ciri. Kita pilah bentuk menurut cirinya: bentuk yang punya sisi lengkung, dan bentuk yang semua sisinya lurus.";
const SUARA_P2 = "Ada lima keping di layar. Ketuk lalu seret tiap keping ke kotak yang cocok.";
const SUARA_P3 = "Dua bentuk lengkung masuk ke kotak sisi lengkung. Lihat, keduanya pindah ke kotak itu.";
const SUARA_P4 = "Segitiga, segi empat, dan persegi panjang semua sisinya lurus. Ketiganya masuk ke kotak sisi lurus.";
const SUARA_P5 = "Sekarang kita hitung. Ada dua keping lengkung dan tiga keping lurus. Dua ditambah tiga sama dengan lima keping.";
const KIRI = { x: 10, y: 56, w: 135, h: 100 };
const KANAN = { x: 155, y: 56, w: 135, h: 100 };

export const ADEGAN_LUAR_PILAH: AdeganStory = {
  id: "luar-pilah",
  judul: "Pilah Ciri: sisi lengkung atau lurus",
  sumber: "Metode luar: Pilah Ciri",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, ...kepala(1)),
      tambah("lengkung,", kotak("bk", KIRI.x, KIRI.y, KIRI.w, KIRI.h, W.lengkung + "55", W.biru, { rx: 8 }), teks("tk", 77, 72, "ada sisi lengkung", 9, W.merah)),
      tambah("lurus.", kotak("bl", KANAN.x, KANAN.y, KANAN.w, KANAN.h, "#BFDBFE88", W.biru, { rx: 8 }), teks("tl", 222, 72, "semua sisi lurus", 9, W.merah)),
    ),
    k(
      SUARA_P2,
      tambah("lima", lengkung("pa", 40, 182, 10), segitigaSama("pb", 70, 172, 28, 20, W.segitiga), segiEmpat("pc", 118, 172, 22, 20, W.segiEmpat), lengkung("pd", 180, 182, 10), segiEmpat("pe", 214, 174, 34, 16, W.segiEmpat)),
      sorotkan("Ketuk", "pa", "pb", "pc", "pd", "pe"),
      redamkan("kotak", "pa", "pb", "pc", "pd", "pe"),
    ),
    k(SUARA_P3, ubah("Lihat,", { id: "pa", x: 45, y: 112 }), ubah("keduanya", { id: "pd", x: 100, y: 112 })),
    k(
      SUARA_P4,
      ubah(0, { id: "pb", x: 165, y: 100 }),
      ubah(idx(SUARA_P4, "segi"), { id: "pc", x: 205, y: 98 }),
      ubah(idx(SUARA_P4, "persegi"), { id: "pe", x: 240, y: 102 }),
    ),
    k(SUARA_P5, ...rangkai(SUARA_P5, "pr", 188, ["2", "+", "3", "=", "5"], ["Dua", "ditambah", "tiga", "sama", "lima"], "lurus.", 18)),
  ],
};
