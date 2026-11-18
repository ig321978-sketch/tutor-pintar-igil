import type { AdeganStory } from "./logika-story";
import { E, W, WK, WR, bulat, emo, garis, irisan, judul, kartu, kotak, papanCatat, petak, regu, rumput, spanduk, teks, tokoh, irisLabu, labu } from "./k2b5C-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k2b5C-bantu";

/*
 * Cerita orisinal IGIL "Panen Raya Pak Joko" (Kelas 2 Bab 5 Sub-Bab C), naskah suara dari naskah/story-naskah-k2b5c.md.
 * Bagian ini: lingkaran dengan dua garis, kupu-kupu dari potongan lingkaran, penutup (akhir cerita bab).
 */

/* ------------------------------ 7. Lingkaran ------------------------------ */
const SUARA_G1 = "Bu Sari menggambar lingkaran di tanah dan menarik dua garis lewat titik tengah.";
const SUARA_G2 = "Kalau kedua garis saling tegak lurus, keempat bagian sama besar. Kalau miring, tidak sama besar.";
const SUARA_G3 = "Dika memeriksa dengan menumpuk bagian-bagian itu. Hanya yang tegak lurus yang pas.";

export const ADEGAN_LINGKARAN: AdeganStory = {
  id: "lingkaran",
  judul: "Dua garis pada lingkaran",
  sumber: "Materi: lingkaran dan dua garis",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_G1,
      bersih(0),
      tambah(0, judul("Lingkaran di Tanah"), rumput("rm"), kotak("tn", 10, 30, 280, 136, WK.tanah, WK.tanahGaris, { rx: 6, tebal: 2, z: -2 })),
      tambah("Sari", ...tokoh("bs", 262, 178, "Bu Sari")),
      tambah("lingkaran", bulat("lk", 150, 98, 52, W.krem, W.coklat, { tebal: 2.4, z: 0 })),
      tambah("dua", teks("n2", 240, 56, "2 garis", 10, W.biru)),
      tambah("garis", garis("g1", 150, 46, 0, 104, W.biru, 2.4, { z: 2 }), garis("g2", 98, 98, 104, 0, W.biru, 2.4, { z: 2 })),
      tambah("tengah.", bulat("tt", 150, 98, 3.5, W.merah, W.merah, { z: 3 })),
    ),
    k(
      SUARA_G2,
      tambah("tegak", kotak("ss", 150, 98, 10, 10, "#FDE68A", W.merah, { rx: 0, tebal: 1.6, z: 3 })),
      tambah("sama", emo("ok", 250, 120, E.benar, 24)),
      sorotkan("besar.", "lk"),
      redamkan("miring,", "lk"),
      hapus("miring,", "ss", "ok"),
      ubah("miring,", { id: "g2", x: 105, y: 70, x2: 90, y2: 56 }),
      tambah("tidak", emo("xx", 250, 120, E.salah, 24)),
    ),
    k(
      SUARA_G3,
      bersih(0),
      tambah(0, judul("Menumpuk Bagian-Bagian"), rumput("rm")),
      tambah("Dika", ...tokoh("dk", 150, 180, "Dika")),
      tambah("memeriksa", emo("kc", 150, 64, E.kaca, 22)),
      tambah("menumpuk", bulat("la", 70, 70, 30, W.krem, W.coklat, { tebal: 2 }), garis("a1", 70, 40, 0, 60, W.biru, 2), garis("a2", 40, 70, 60, 0, W.biru, 2), bulat("lb", 230, 70, 30, W.krem, W.coklat, { tebal: 2 }), garis("b1", 230, 40, 0, 60, W.biru, 2), garis("b2", 205, 45, 50, 50, W.biru, 2)),
      tambah("itu.", irisan("pa1", 50, 152, 30, 270, 360, W.hijauMuda, W.hijau), irisan("pa2", 54, 156, 30, 270, 360, W.hijauMuda, W.hijau), irisan("pb1", 190, 152, 30, 270, 315, W.merahMuda, W.merah), irisan("pb2", 230, 152, 30, 315, 450, W.merahMuda, W.merah)),
      tambah("tegak", teks("tl", 70, 112, "tegak lurus", 8, W.hijau), teks("tm", 230, 112, "miring", 8, W.merah)),
      tambah("pas.", emo("ya", 100, 148, E.benar, 22), emo("ti", 270, 148, E.salah, 22)),
    ),
  ],
};

/* ------------------------------ 8. Kupu-kupu ------------------------------ */
const SUARA_K1 = "Untuk pesta, Nia menggunting satu setengah lingkaran dan tiga seperempat lingkaran.";
const SUARA_K2 = "Ia menyusun potongan itu menjadi kupu-kupu, lalu mewarnainya.";
const SUARA_K3 = "Pecahan ternyata bisa menjadi hiasan yang cantik!";

export const ADEGAN_KUPU: AdeganStory = {
  id: "kupu",
  judul: "Kupu-kupu dari potongan lingkaran",
  sumber: "Materi: kerajinan potongan lingkaran",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_K1,
      bersih(0),
      tambah(0, judul("Hiasan untuk Pesta"), kotak("mj", 20, 132, 260, 8, "#D6A15E", W.coklat, { rx: 2, tebal: 1.6, z: -1 })),
      tambah("Nia", ...tokoh("ni", 40, 178, "Nia")),
      tambah("menggunting", emo("gt", 150, 160, E.gunting, 22)),
      tambah("satu", teks("n1", 70, 52, "1 setengah", 10, W.merah)),
      tambah("setengah", irisan("s1", 70, 104, 26, 90, 270, W.pink, W.ungu, { z: 1 })),
      tambah("tiga", teks("n3", 205, 52, "3 seperempat", 10, W.merah)),
      tambah("seperempat", irisan("s2", 150, 104, 26, 270, 360, W.langit, W.ungu, { z: 1 }), irisan("s3", 195, 104, 26, 270, 360, W.hijauMuda, W.ungu, { z: 1 }), irisan("s4", 240, 104, 26, 270, 360, W.krem, W.ungu, { z: 1 })),
    ),
    k(
      SUARA_K2,
      hapus(0, "gt", "n1", "n3"),
      hapus("menjadi", "s1", "s2", "s3", "s4"),
      tambah("menjadi", irisan("w1", 150, 100, 34, 90, 270, "#E5E7EB", W.ungu, { z: 1 }), irisan("w2", 150, 100, 34, 270, 360, "#E5E7EB", W.ungu, { z: 1 }), irisan("w3", 150, 100, 24, 0, 90, "#E5E7EB", W.ungu, { z: 1 }), irisan("w4", 150, 72, 14, 225, 315, "#E5E7EB", W.ungu, { z: 1 }), kotak("bd", 148, 86, 4, 40, "#4C1D95", "#4C1D95", { rx: 2, tebal: 0.6, z: 2 })),
      ubah("mewarnainya.", { id: "w1", warna: W.pink }, { id: "w2", warna: W.langit }, { id: "w3", warna: "#FDE68A" }, { id: "w4", warna: W.hijauMuda }),
      tambah("lalu", emo("ks", 220, 64, E.kuas, 22)),
    ),
    k(
      SUARA_K3,
      hapus(0, "ks"),
      tambah("Pecahan", ...kartu("hc", 80, 30, 140, 18, W.krem, ["hiasan pesta yang cantik"], 8.6)),
      tambah("bisa", emo("b1", 60, 70, E.bintang, 20), emo("b2", 245, 80, E.bintang, 16)),
      tambah("hiasan", emo("b3", 90, 130, E.bintang, 14), emo("b4", 215, 118, E.bintang, 20)),
      ubah("cantik!", { id: "ni", isi: E.senyum }),
    ),
  ],
};

/* ------------------------------ 9. Penutup (akhir cerita bab) ------------------------------ */
const SUARA_P1 = "Petak tanah dan labu sudah terbagi pas, dan empat regu bersorak.";
const SUARA_P2 = "Dika merangkum. Seperempat adalah satu dari empat bagian yang sama besar.";
const SUARA_P3 = "Panen raya pun dimulai! Menurutmu, bagian mana yang paling seru dibagi seperempat, labu, petak tanah, atau kertas? Terima kasih, Chacha, Dika, Nia, Bu Sari, dan Pak Joko!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Pesta panen raya dimulai",
  sumber: "Materi: penutup dan pertanyaan akhir",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_P1,
      bersih(0),
      tambah(0, judul("Panen Raya Dimulai"), rumput("rm"), ...petak("pt", 20, 36, 80)),
      tambah("Petak", garis("l1", 60, 36, 0, 80, WK.tali, 2.6, { z: 2 }), garis("l2", 20, 76, 80, 0, WK.tali, 2.6, { z: 2 })),
      tambah("labu", irisLabu("q1", 167, 76, 30, 270, 360), irisLabu("q2", 167, 80, 30, 0, 90), irisLabu("q3", 163, 80, 30, 90, 180), irisLabu("q4", 163, 76, 30, 180, 270)),
      tambah("empat", teks("n4", 235, 56, "4 regu", 10, W.merah)),
      tambah("regu", ...regu("r1", 130, 176, WR[0]), ...regu("r2", 170, 176, WR[1]), ...regu("r3", 210, 176, WR[2]), ...regu("r4", 250, 176, WR[3])),
      tambah("bersorak.", emo("sr1", 130, 150, E.sorak, 20), emo("sr2", 250, 150, E.sorak, 20)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Catatan Dika"), ...papanCatat("pc", 40, 30, 220, 112), ...tokoh("dk", 40, 178, "Dika")),
      tambah("Seperempat", teks("c1", 150, 62, "Seperempat", 12, W.merah)),
      tambah("satu", teks("c2", 150, 86, "1 dari", 11)),
      tambah("empat", teks("c3", 150, 108, "4 bagian", 11)),
      tambah("sama", teks("c4", 150, 130, "yang sama besar", 11, W.hijau)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, rumput("rm"), kotak("tl", 40, 30, 6, 70, WK.bambu, WK.bambuGaris, { rx: 2, tebal: 1.2, z: 0 }), kotak("tr", 254, 30, 6, 70, WK.bambu, WK.bambuGaris, { rx: 2, tebal: 1.2, z: 0 })),
      tambah("Panen", ...spanduk("sp", 46, 36, 208, "PANEN RAYA", 12)),
      tambah("dimulai!", emo("sk1", 40, 22, E.sorak, 20), emo("sk2", 260, 22, E.sorak, 20)),
      tambah("seperempat,", ...labu("lb", 68, 120, 16)),
      tambah("petak", ...petak("pt", 134, 108, 28)),
      tambah("kertas?", kotak("kr", 212, 108, 28, 28, W.putih, W.biru, { rx: 1, tebal: 1.6, z: 0 }), emo("tq", 150, 84, E.tanya, 22)),
      tambah("Chacha,", ...tokoh("ch", 30, 178, "Chacha")),
      tambah("Dika,", ...tokoh("dk", 90, 178, "Dika")),
      tambah("Nia,", ...tokoh("ni", 150, 178, "Nia")),
      tambah("Sari,", ...tokoh("bs", 210, 178, "Bu Sari")),
      tambah("Joko!", ...tokoh("pj", 268, 178, "Pak Joko")),
    ),
  ],
};
