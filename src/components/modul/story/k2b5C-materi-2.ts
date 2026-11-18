import type { AdeganStory } from "./logika-story";
import { E, W, WR, WK, emo, garis, idLabu, irisLabu, judul, kartu, kertas, labu, label, papanCatat, poligon, regu, rumput, teks, tokoh } from "./k2b5C-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k2b5C-bantu";

/*
 * Cerita orisinal IGIL "Panen Raya Pak Joko" (Kelas 2 Bab 5 Sub-Bab C), naskah suara dari naskah/story-naskah-k2b5c.md.
 * Bagian ini: dua kali memotong, hubungan utuh setengah seperempat, melipat kertas.
 */

/* ------------------------------ 4. Dua kali ------------------------------ */
const SUARA_D1 = "Seperempat adalah setengah dari setengah, jadi kita memotong dua kali.";
const SUARA_D2 = "Pak Joko membelah labu tepat di tengah, lalu membelah setiap belahan di tengah lagi.";
const SUARA_D3 = "Empat regu mendapat satu potong labu yang sama besar.";

export const ADEGAN_DUA_KALI: AdeganStory = {
  id: "dua-kali",
  judul: "Belah dua kali",
  sumber: "Materi: seperempat, dua kali memotong",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_D1,
      bersih(0),
      tambah(0, judul("Dua Kali Memotong"), rumput("rm")),
      tambah("Seperempat", ...kartu("ks", 14, 28, 84, 18, W.hijauMuda, ["seperempat"], 8.4)),
      tambah("adalah", teks("sm", 106, 41, "=", 12, W.ungu)),
      tambah("setengah", ...kartu("kt", 114, 28, 62, 18, W.krem, ["setengah"], 8.4)),
      tambah("dari", teks("dr", 190, 41, "dari", 8, W.ungu)),
      tambah("setengah@2", ...kartu("ku", 204, 28, 62, 18, W.krem, ["setengah"], 8.4)),
      tambah("memotong", ...tokoh("pj", 40, 178, "Pak Joko"), ...labu("lb", 150, 110, 36)),
      tambah("dua", teks("n2", 250, 120, "2 kali", 10, W.merah)),
    ),
    k(
      SUARA_D2,
      hapus("membelah", ...idLabu("lb")),
      tambah("membelah", irisLabu("lh1", 144, 110, 36, 90, 270), irisLabu("lh2", 156, 110, 36, -90, 90)),
      sorotkan("tengah,", "lh1", "lh2"),
      tambah("setiap", garis("c2", 104, 110, 92, 0, W.biru, 2.2, { putus: true, z: 3 })),
      redamkan("lagi.", "lh1", "lh2"),
    ),
    k(
      SUARA_D3,
      hapus(0, "lh1", "lh2", "c2", "n2"),
      tambah("Empat", teks("n4", 150, 60, "4 regu", 10, W.merah)),
      tambah("regu", ...regu("r1", 115, 176, WR[0]), ...regu("r2", 167, 176, WR[1]), ...regu("r3", 219, 176, WR[2]), ...regu("r4", 271, 176, WR[3])),
      tambah("satu", teks("n1", 150, 78, "1 potong", 10, W.merah)),
      tambah("potong", irisLabu("p1", 100, 125, 30, 270, 360), irisLabu("p2", 152, 125, 30, 270, 360), irisLabu("p3", 204, 125, 30, 270, 360), irisLabu("p4", 256, 125, 30, 270, 360)),
      tambah("labu", ...label("e1", 115, 142, "seperempat", 7), ...label("e2", 167, 142, "seperempat", 7), ...label("e3", 219, 142, "seperempat", 7), ...label("e4", 271, 142, "seperempat", 7)),
    ),
  ],
};

/* ------------------------------ 5. Hubungan ------------------------------ */
const SUARA_H1 = "Dika menyusun potongan labu kembali. Dua seperempat disatukan menjadi satu setengah.";
const SUARA_H2 = "Empat seperempat disatukan menjadi satu labu utuh.";
const SUARA_H3 = "Jadi satu utuh sama dengan dua setengah dan juga empat seperempat.";

export const ADEGAN_HUBUNGAN: AdeganStory = {
  id: "hubungan",
  judul: "Utuh, setengah, seperempat",
  sumber: "Materi: hubungan utuh, setengah, seperempat",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_H1,
      bersih(0),
      tambah(0, judul("Menyusun Kembali"), rumput("rm")),
      tambah("Dika", ...tokoh("dk", 40, 176, "Dika")),
      tambah("potongan", irisLabu("a1", 120, 92, 34, 270, 360), irisLabu("a2", 120, 128, 34, 0, 90)),
      tambah("Dua", teks("n2", 60, 64, "2 seperempat", 10, W.merah)),
      ubah("disatukan", { id: "a1", x: 140, y: 110 }, { id: "a2", x: 140, y: 110 }),
      tambah("menjadi", teks("sm", 150, 64, "=", 14, W.ungu)),
      tambah("satu@2", teks("n1", 240, 64, "1 setengah", 10, W.hijau)),
    ),
    k(
      SUARA_H2,
      hapus(0, "a1", "a2", "n2", "n1", "sm"),
      tambah("Empat", teks("n4", 70, 64, "4 seperempat", 10, W.merah)),
      tambah("seperempat", irisLabu("b1", 162, 98, 32, 270, 360), irisLabu("b2", 162, 122, 32, 0, 90), irisLabu("b3", 138, 122, 32, 90, 180), irisLabu("b4", 138, 98, 32, 180, 270)),
      ubah("disatukan", { id: "b1", x: 150, y: 110 }, { id: "b2", x: 150, y: 110 }, { id: "b3", x: 150, y: 110 }, { id: "b4", x: 150, y: 110 }),
      tambah("menjadi", teks("sm", 150, 64, "=", 14, W.ungu)),
      tambah("satu@2", teks("n1", 240, 64, "1 utuh", 10, W.hijau)),
      sorotkan("utuh.", "b1", "b2", "b3", "b4"),
    ),
    k(
      SUARA_H3,
      bersih(0),
      tambah(0, judul("Utuh, Setengah, Seperempat"), ...papanCatat("pc", 40, 34, 220, 112), ...tokoh("dk", 40, 178, "Dika")),
      tambah("utuh", teks("r1", 150, 68, "1 utuh", 11, W.biru)),
      tambah("dua", teks("r2", 150, 96, "= 2 setengah", 11, W.hijau)),
      tambah("empat", teks("r3", 150, 124, "= 4 seperempat", 11, W.merah)),
      tambah("seperempat.", emo("ok", 250, 176, E.benar, 22)),
    ),
  ],
};

/* ------------------------------ 6. Lipat ------------------------------ */
const SUARA_P1 = "Nia melipat kertas persegi dua kali, tegak lalu mendatar, dan terbentuk empat persegi kecil.";
const SUARA_P2 = "Ia melipat kertas yang lain dua kali dari pojok ke pojok, dan terbentuk empat segitiga.";
const SUARA_P3 = "Bentuknya berbeda, tetapi keempat bagian sama besar, jadi masing-masing seperempat.";

export const ADEGAN_LIPAT: AdeganStory = {
  id: "lipat",
  judul: "Melipat kertas dua kali",
  sumber: "Materi: melipat kertas jadi empat",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_P1,
      bersih(0),
      tambah(0, judul("Melipat Kertas")),
      tambah("Nia", ...tokoh("ni", 150, 180, "Nia")),
      tambah("kertas", kertas("kp1", 30, 50, 90)),
      tambah("dua", teks("n2", 75, 42, "2 kali", 10, W.merah)),
      tambah("tegak", garis("g1", 75, 50, 0, 90, W.biru, 2, { putus: true, z: 2 })),
      tambah("mendatar,", garis("g2", 30, 95, 90, 0, W.biru, 2, { putus: true, z: 2 })),
      tambah("empat", teks("n4", 75, 158, "4 persegi", 10, W.merah)),
    ),
    k(
      SUARA_P2,
      tambah("kertas", kertas("kp2", 180, 50, 90)),
      tambah("dua", teks("n3", 225, 42, "2 kali", 10, W.merah)),
      tambah("pojok", garis("d1", 180, 50, 90, 90, WK.tali, 2, { putus: true, z: 2 })),
      tambah("pojok@2", garis("d2", 270, 50, -90, 90, WK.tali, 2, { putus: true, z: 2 })),
      tambah("segitiga.", teks("n5", 225, 158, "4 segitiga", 10, W.merah)),
    ),
    k(
      SUARA_P3,
      hapus(0, "n4", "n5"),
      tambah("keempat", poligon("w1", [[31, 51], [74, 51], [74, 94], [31, 94]], W.emas, W.biru, { z: 1 }), poligon("w2", [[225, 95], [182, 52], [268, 52]], W.hijauMuda, W.biru, { z: 1 })),
      sorotkan("sama", "w1", "w2"),
      tambah("masing-masing", ...label("l1", 75, 158, "seperempat", 7), ...label("l2", 225, 158, "seperempat", 7)),
      redamkan("seperempat.", "w1", "w2"),
    ),
  ],
};
