import type { AdeganStory } from "./logika-story";
import { E, W, WL, bulat, emo, garisAbs, judul, kotak, panji, poligon, rumput, tali, teks, tokoh } from "./k3b4C-gambar";
import { bersih, k, sorotkan, tambah } from "./k3b4C-bantu";

/*
 * Cerita orisinal IGIL "Lintasan Pak Samsul" (Kelas 3 Bab 4 Sub-Bab C), akhir cerita Festival Layang-layang Kampung.
 * Naskah suara dari naskah/story-naskah-k3b4c.md. Bagian ini: panji segitiga, papan nama persegi panjang, persegi, spanduk bundar (lingkaran), dan penutup akhir cerita bab (semua tamu berkumpul).
 */

/* ------------------------------ 7. Bangun datar ------------------------------ */
const SUARA_B1 = "Panji kecil pada tali berbentuk segitiga, yang punya tiga sisi dan tiga sudut.";
const SUARA_B2 = "Papan nama lomba berbentuk persegi panjang, yang punya empat sisi dan empat sudut siku-siku.";
const SUARA_B3 = "Kalau keempat sisinya sama panjang, namanya persegi.";

const sudutKecil = (id: string, x: number, y: number) => bulat(id, x, y, 3.4, W.merah, "#7F1D1D", { tebal: 1, z: 5 });
const sikuKotak = (id: string, x: number, y: number) => kotak(id, x, y, 9, 9, undefined, W.merah, { rx: 0, tebal: 1.6, z: 5 });

export const ADEGAN_BANGUN_DATAR: AdeganStory = {
  id: "bangun-datar",
  judul: "Panji, papan nama, dan persegi",
  sumber: "Materi: segitiga, persegi panjang, persegi",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Panji Segitiga"), ...rumput("tn", 150), ...tali("tl", 30, 36, 270, 36, W.tali1)),
      tambah("Panji", panji("pn", 130, 36, 44, 48, W.emas)),
      tambah("segitiga,", teks("nm", 152, 104, "segitiga", 12, W.merah)),
      tambah("tiga", teks("s3", 84, 62, "3 sisi", 10, W.biru)),
      sorotkan("sisi", "pn"),
      tambah("tiga@2", teks("u3", 222, 62, "3 sudut", 10, W.biru)),
      tambah("sudut.", sudutKecil("v1", 130, 36), sudutKecil("v2", 174, 36), sudutKecil("v3", 152, 84)),
    ),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, judul("Papan Nama Lomba"), ...rumput("tn", 150), kotak("pp", 75, 44, 150, 74, "#FDE68A", "#92400E", { rx: 3, tebal: 2 })),
      tambah("persegi", teks("nm", 150, 86, "persegi panjang", 12, W.merah)),
      tambah("empat", teks("s4", 150, 134, "4 sisi", 10, W.biru)),
      tambah("empat@2", teks("u4", 150, 150, "4 sudut siku-siku", 10, W.biru)),
      tambah("siku-siku.", sikuKotak("q1", 75, 44), sikuKotak("q2", 216, 44), sikuKotak("q3", 75, 109), sikuKotak("q4", 216, 109)),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Persegi"), ...rumput("tn", 150), kotak("pg", 105, 38, 90, 90, "#BBF7D0", "#166534", { rx: 2, tebal: 2 })),
      tambah("sisinya", garisAbs("t1", 150, 34, 150, 42, W.merah, 2), garisAbs("t2", 150, 124, 150, 132, W.merah, 2), garisAbs("t3", 101, 83, 109, 83, W.merah, 2), garisAbs("t4", 191, 83, 199, 83, W.merah, 2)),
      tambah("sama", teks("s4", 150, 146, "4 sisi sama panjang", 10, W.biru)),
      tambah("persegi.", teks("nm", 150, 87, "persegi", 12, W.merah), emo("ok", 250, 90, E.benar, 24)),
    ),
  ],
};

/* ------------------------------ 8. Lingkaran ------------------------------ */
const SUARA_G1 = "Spanduk bundar di tiang bendera dibatasi satu garis lengkung.";
const SUARA_G2 = "Lingkaran tidak punya sisi lurus dan tidak punya sudut.";
const SUARA_G3 = "Jadi setiap bangun punya cirinya sendiri, dan kita bisa menyebutnya dari sisi dan sudutnya.";

export const ADEGAN_LINGKARAN: AdeganStory = {
  id: "lingkaran",
  judul: "Spanduk bundar",
  sumber: "Materi: lingkaran dan ciri bangun",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Spanduk Bundar"), ...rumput("tn", 150), kotak("tg", 68, 40, 4, 110, WL.kayu, WL.kayuTua, { rx: 1, tebal: 1.2, z: 1 })),
      tambah("Spanduk", bulat("sp", 130, 88, 32, "#FDBA74", "#9A3412", { tebal: 2.4, z: 2 }), garisAbs("tk", 70, 62, 104, 76, WL.kayuTua, 1.6, { z: 1 })),
      tambah("tiang", emo("bd", 70, 36, E.bendera, 16)),
      tambah("satu", teks("sl", 232, 70, "1 garis lengkung", 10, W.merah)),
      sorotkan("lengkung.", "sp"),
    ),
    k(
      SUARA_G2,
      tambah("Lingkaran", teks("nm", 130, 92, "lingkaran", 9, W.biru)),
      tambah("sisi", teks("ss", 232, 96, "sisi lurus: 0", 9, W.biru)),
      tambah("sudut.", teks("su", 232, 112, "sudut: 0", 9, W.biru), emo("xs", 232, 134, E.salah, 22)),
    ),
    k(
      SUARA_G3,
      bersih(0),
      tambah(0, judul("Ciri Tiap Bangun"), ...rumput("tn", 150)),
      tambah("bangun", poligon("c1", [[54, 42], [30, 88], [78, 88]], W.emas, "#92400E", { tebal: 1.8 }), kotak("c2", 108, 52, 84, 36, "#FDE68A", "#92400E", { rx: 2, tebal: 1.8 }), bulat("c3", 246, 66, 24, "#FDBA74", "#9A3412", { tebal: 2 })),
      tambah("cirinya", teks("n1", 54, 110, "segitiga", 9.6, W.merah), teks("n2", 150, 110, "persegi panjang", 9.6, W.merah), teks("n3", 246, 110, "lingkaran", 9.6, W.merah)),
      tambah("sisi", teks("s1", 54, 124, "3 sisi", 9, W.biru), teks("s2", 150, 124, "4 sisi", 9, W.biru), teks("s3", 246, 124, "0 sisi lurus", 9, W.biru)),
      tambah("sudutnya.", teks("u1", 54, 138, "3 sudut", 9, W.biru), teks("u2", 150, 138, "4 sudut siku-siku", 8.4, W.biru), teks("u3", 246, 138, "0 sudut", 9, W.biru)),
    ),
  ],
};

/* ------------------------------ 9. Penutup (akhir cerita bab) ------------------------------ */
const SUARA_Z1 = "Raka membersihkan semua patok sambil bersungut-sungut, dan lintasan pun rapi.";
const SUARA_Z2 = "Pak Samsul meniup peluit, dan lomba layang-layang dimulai.";
const SUARA_Z3 = "Terima kasih, Raka, Salsa, Bima, Pak Joko, Bu Ratih, Kak Anton, dan Pak Samsul! Sampai jumpa di bab berikutnya!";

const konfeti = (id: string, x: number, y: number, warna: string) => kotak(id, x, y, 5, 8, warna, undefined, { rx: 1, tebal: 0, z: 4, rot: 20 });

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup akhir cerita bab",
  sumber: "Materi: penutup festival layang-layang",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Lintasan Rapi"), ...rumput("tn", 150), ...tokoh("rk", 60, 184, "Raka")),
      tambah("membersihkan", emo("sk", 96, 168, E.sikat, 22)),
      tambah("patok", ...tali("r1", 120, 112, 270, 112, W.tali1), ...tali("r2", 120, 136, 270, 136, W.tali2)),
      tambah("bersungut-sungut,", emo("gr", 60, 134, E.gerutu, 20)),
      tambah("rapi.", emo("ok", 195, 90, E.benar, 24), teks("rp", 195, 76, "rapi", 10, W.hijauTua)),
    ),
    k(
      SUARA_Z2,
      tambah("Samsul", ...tokoh("ps", 200, 184, "Pak Samsul")),
      tambah("peluit,", teks("pr", 226, 150, "priit!", 10, W.merah)),
      tambah("layang-layang", emo("l1", 50, 50, E.layang, 22), emo("l2", 130, 40, E.layang, 22), emo("l3", 210, 52, E.layang, 22), emo("l4", 262, 78, E.layang, 22)),
      tambah("dimulai.", emo("sr", 150, 70, E.sorak, 26)),
    ),
    k(
      SUARA_Z3,
      bersih(0),
      tambah(0, judul("Terima Kasih!"), ...rumput("tn", 150), kotak("sp", 30, 26, 240, 20, W.oranye, "#7C2D12", { rx: 3, tebal: 1.6 }), teks("spt", 150, 40, "FESTIVAL LAYANG-LAYANG MERIAH", 10, W.putih)),
      tambah("Raka,", ...tokoh("rk", 42, 184, "Raka")),
      tambah("Salsa,", ...tokoh("sl", 114, 184, "Salsa")),
      tambah("Bima,", ...tokoh("bm", 186, 184, "Bima")),
      tambah("Joko,", ...tokoh("pj", 258, 184, "Pak Joko")),
      tambah("Ratih,", ...tokoh("br", 78, 122, "Bu Ratih", 24)),
      tambah("Anton,", ...tokoh("ka", 150, 122, "Kak Anton", 24)),
      tambah("Samsul!", ...tokoh("ps", 222, 122, "Pak Samsul", 24)),
      tambah("Sampai", emo("b1", 36, 76, E.balon, 22), emo("b2", 264, 76, E.balon, 22), konfeti("kf1", 70, 60, "#EF4444"), konfeti("kf2", 110, 72, "#3B82F6"), konfeti("kf3", 190, 64, "#22C55E"), konfeti("kf4", 230, 58, "#A855F7")),
      tambah("berikutnya!", emo("w1", 74, 158, E.lambai, 18), emo("w2", 218, 158, E.lambai, 18), emo("sr", 150, 80, E.sorak, 26)),
    ),
  ],
};
