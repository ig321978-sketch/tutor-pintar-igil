import type { AdeganStory } from "./logika-story";
import { E, W, busurDerajat, ember, emo, garis, judul, juring, kaki, kotak, teks, tokoh } from "./k3b4B-gambar";
import { hapus, k, sorotkan, tambah } from "./k3b4B-bantu";

/*
 * Cerita orisinal IGIL "Sudut Kak Anton" (Kelas 3 Bab 4 Sub-Bab B), tengah cerita Festival Layang-layang Kampung.
 * Naskah suara dari naskah/story-naskah-k3b4b.md. Bagian ini: sudut lancip, tumpul, dan lurus, satuan tidak baku (irisan), dan Raka salah membaca skala busur.
 */
const ABU = "#64748B";

/* ------------------------------ 4. Lancip, tumpul, lurus ------------------------------ */
const SUARA_J1 = "Sudut yang lebih kecil daripada pojok kertas disebut sudut lancip.";
const SUARA_J2 = "Sudut yang lebih besar daripada pojok kertas tetapi belum lurus disebut sudut tumpul.";
const SUARA_J3 = "Sudut lurus besarnya seratus delapan puluh derajat, sama dengan dua sudut siku-siku.";

export const ADEGAN_LANCIP_TUMPUL: AdeganStory = {
  id: "lancip-tumpul",
  judul: "Sudut lancip, tumpul, dan lurus",
  sumber: "Materi: sudut lancip, tumpul, dan lurus",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, judul("Jenis Sudut")),
      tambah("kecil", kaki("a1", 22, 130, 44, 0, W.merah, 4), kaki("a2", 22, 130, 44, 40, W.merah, 4), juring("j1", 22, 130, 22, 0, 40)),
      tambah("pojok", kotak("p1", 22, 104, 26, 26, undefined, ABU, { putus: true, rx: 0, tebal: 1.2 })),
      tambah("lancip.", teks("l1", 44, 152, "lancip", 10, W.merah)),
    ),
    k(
      SUARA_J2,
      tambah("besar", kaki("c1", 118, 130, 44, 0, W.biru, 4), kaki("c2", 118, 130, 44, 120, W.biru, 4), juring("j2", 118, 130, 22, 0, 120, "#BFDBFE", W.biru)),
      tambah("pojok", kotak("p2", 118, 104, 26, 26, undefined, ABU, { putus: true, rx: 0, tebal: 1.2 })),
      tambah("tumpul.", teks("l2", 134, 152, "tumpul", 10, W.biru), teks("d2", 172, 104, "120°", 9, W.biru)),
    ),
    k(
      SUARA_J3,
      tambah("lurus", kaki("e1", 250, 130, 44, 0, W.hijau, 4), kaki("e2", 250, 130, 44, 180, W.hijau, 4)),
      tambah("seratus", teks("d3", 250, 112, "180°", 12, W.hijauTua)),
      tambah("derajat,", teks("l3", 250, 152, "lurus", 10, W.hijauTua)),
      tambah("dua", kotak("p3a", 250, 104, 26, 26, undefined, ABU, { putus: true, rx: 0, tebal: 1.2 }), kotak("p3b", 224, 104, 26, 26, undefined, ABU, { putus: true, rx: 0, tebal: 1.2 }), teks("n2", 250, 178, "2 siku-siku", 9, W.merah)),
    ),
  ],
};

/* ------------------------------ 5. Irisan besar dan kecil ------------------------------ */
const SUARA_I1 = "Bima menutup sebuah sudut dengan irisan kertas, dan butuh tiga irisan besar.";
const SUARA_I2 = "Ketika memakai irisan kecil, ia butuh enam irisan.";
const SUARA_I3 = "Hasilnya berbeda, jadi kita perlu satuan baku, yaitu derajat.";
const WARNA_IRIS = ["#FDE68A", "#FCA5A5", "#BFDBFE", "#BBF7D0", "#FBCFE8", "#DDD6FE"];

export const ADEGAN_IRISAN: AdeganStory = {
  id: "irisan",
  judul: "Mengukur sudut dengan irisan",
  sumber: "Materi: satuan tidak baku dan derajat",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_I1,
      tambah(0, judul("Irisan Kertas")),
      tambah("Bima", ...tokoh("bm", 40, 184, "Bima")),
      tambah("sudut", kaki("b1", 100, 140, 90, 0, W.bambu, 3), kaki("b2", 100, 140, 90, 90, W.bambu, 3)),
      tambah("irisan", juring("w1", 100, 140, 80, 0, 30, WARNA_IRIS[0], W.biru), juring("w2", 100, 140, 80, 30, 60, WARNA_IRIS[1], W.biru), juring("w3", 100, 140, 80, 60, 90, WARNA_IRIS[2], W.biru)),
      tambah("tiga", teks("n3", 236, 90, "3 irisan besar", 9, W.merah)),
    ),
    k(
      SUARA_I2,
      hapus("Ketika", "w1", "w2", "w3", "n3"),
      tambah("kecil,", ...[0, 1, 2, 3, 4, 5].map((i) => juring(`v${i}`, 100, 140, 80, i * 15, i * 15 + 15, WARNA_IRIS[i], W.biru))),
      tambah("enam", teks("n6", 236, 120, "6 irisan kecil", 9, W.merah)),
    ),
    k(
      SUARA_I3,
      tambah("berbeda,", teks("a3", 124, 44, "3", 22, W.merah), teks("ne", 150, 44, "≠", 22, W.biru), teks("a6", 176, 44, "6", 22, W.hijau)),
      tambah("satuan", teks("sb", 236, 160, "satuan baku", 11, W.ungu)),
      tambah("derajat.", teks("dr", 236, 182, "derajat", 15, W.merah), emo("ok", 280, 150, E.benar, 18)),
    ),
  ],
};

/* ------------------------------ 6. Salah membaca skala ------------------------------ */
const SUARA_K1 = "Kak Anton menaruh titik tengah busur di titik sudut, dan kaki pertama tepat di garis nol.";
const SUARA_K2 = "Raka membaca sudut tali sebesar seratus tiga puluh derajat dan berseru, kalau salah aku mencuci semua tali layang-layang!";
const SUARA_K3 = "Salsa menggeleng, sudut itu lancip, jadi pasti kurang dari sembilan puluh derajat.";

export const ADEGAN_SALAH_SKALA: AdeganStory = {
  id: "salah-skala",
  judul: "Raka salah membaca skala busur",
  sumber: "Materi: Raka salah membaca skala busur",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Busur Derajat Kak Anton")),
      tambah("Kak", ...tokoh("ka", 270, 184, "Kak Anton")),
      tambah("busur", ...busurDerajat("bs", 150, 165, 96)),
      sorotkan("sudut,", "bs-c"),
      tambah("kaki", kaki("b1", 150, 165, 100, 0, W.bambu, 3)),
      sorotkan("garis", "bs-a0"),
    ),
    k(
      SUARA_K2,
      tambah("Raka", ...tokoh("rk", 30, 184, "Raka")),
      tambah("sudut", kaki("b2", 150, 165, 100, 50, W.merah, 3)),
      tambah("seratus", teks("s130", 222, 76, "130°", 12, W.merah)),
      tambah("berseru,", emo("ser", 250, 62, E.tanya, 16)),
      tambah("mencuci", ...ember("em", 12, 118)),
    ),
    k(
      SUARA_K3,
      hapus("Salsa", "ka", "ka-n", "ka-bj", "ka-tp", "ka-bs"),
      tambah("Salsa", ...tokoh("sl", 270, 184, "Salsa")),
      tambah("menggeleng,", emo("gl", 244, 150, "\u{1F645}", 20)),
      tambah("lancip,", teks("lc", 244, 112, "lancip", 10, W.hijauTua), emo("x1", 262, 76, E.salah, 18)),
      tambah("sembilan", garis("v90", 150, 165, 0, -100, ABU, 1.4, { putus: true, z: 5 }), teks("n90", 150, 60, "90°", 11, W.hijauTua)),
    ),
  ],
};
