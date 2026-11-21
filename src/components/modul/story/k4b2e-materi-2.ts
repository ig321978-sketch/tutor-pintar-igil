import type { AdeganStory } from "./logika-story";
import { E, W, emo, garis, judul, halaman, kisi, lampion, panah, papanPameran, teks, tokoh, warnai } from "./k4b2e-gambar";
import { hapus, k, sorotkan, tambah, ubah } from "./k4b2e-bantu";

/*
 * Cerita orisinal IGIL "Papan Pameran Bu Tuti" (Kelas 4 Bab 2 Sub-Bab E), akhir cerita Sanggar Batik Kampung Mekar.
 * Naskah suara dari naskah/story-naskah-k4b2e.md. Bagian ini: salah langkah Satria (nol koma enam ditulis enam persen), kisi seratus (nol koma enam adalah enam puluh persen), dan taruhan memasang lampion.
 */

/* ------------------------------ 4. Salah langkah: enam persen ------------------------------ */
const SUARA_S1 = "Satria menulis nol koma enam di papan, lalu berseru, ini enam persen!";
const SUARA_S2 = "Ia hanya mengambil angka enam dan menambahkan tanda persen.";
const SUARA_S3 = "Kalau aku salah, aku memasang semua lampion sendirian, katanya sambil menunjuk tali lampion.";

export const ADEGAN_SALAH_ENAM: AdeganStory = {
  id: "salah-enam",
  judul: "Satria menulis enam persen",
  sumber: "Materi: salah langkah Satria",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Tulisan Satria"), ...halaman("hl", 150), ...tokoh("sa", 36, 184, "Satria"), ...papanPameran("pp", 90, 36, 190, 96, "PAPAN PAMERAN", 150, 10)),
      tambah("nol", teks("d6", 185, 80, "0,6", 28, W.biru)),
      tambah("berseru", emo("sr", 72, 132, E.seru, 20)),
      tambah("enam@2", teks("e6", 185, 110, "6%", 28, W.merah)),
    ),
    k(
      SUARA_S2,
      tambah("hanya", teks("hy", 185, 127, "hanya angka 6", 9, W.merah)),
      sorotkan("angka", "d6"),
      tambah("mengambil", panah("pa", 150, 86, 0, 14, W.merah, 2.4, { z: 4 })),
      tambah("tanda", teks("pl", 262, 100, "+ %", 12, W.merah)),
    ),
    k(
      SUARA_S3,
      hapus(0, "hy", "pl", "pa"),
      tambah("salah", emo("xs", 232, 102, E.salah, 20)),
      tambah("memasang", emo("cp", 72, 150, E.capek, 18)),
      tambah("lampion", ...lampion("l1", 110, 148, false), ...lampion("l2", 140, 148, false), ...lampion("l3", 170, 148, false)),
      tambah("sendirian", teks("tr", 232, 144, "taruhan: lampion", 9, W.merah)),
    ),
  ],
};

/* ------------------------------ 5. Kisi seratus: geser ke enam puluh persen ------------------------------ */
const SUARA_G1 = "Genta menaruh nol koma enam pada kisi seratus, dan hasilnya enam puluh kotak berwarna.";
const SUARA_G2 = "Nol koma enam sama dengan nol koma enam nol, yaitu enam puluh per seratus.";
const SUARA_G3 = "Jadi nol koma enam adalah enam puluh persen, bukan enam persen.";

export const ADEGAN_GESER: AdeganStory = {
  id: "geser",
  judul: "Nol koma enam adalah enam puluh persen",
  sumber: "Materi: kisi seratus",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Nol Koma Enam di Kisi"), ...halaman("hl", 150), ...tokoh("ge", 262, 184, "Genta")),
      tambah("nol", teks("d6", 210, 56, "0,6", 22, W.biru)),
      tambah("kisi", ...kisi("ks", 24, 34, 0)),
      tambah("puluh", teks("n60", 210, 92, "60 kotak", 12, W.merah)),
      ubah("berwarna", ...warnai("ks", 0, 60)),
    ),
    k(
      SUARA_G2,
      hapus(0, "n60"),
      tambah("sama", teks("p1", 210, 84, "= 0,60", 20, W.merah)),
      tambah("yaitu", teks("fa", 190, 112, "60", 16, W.biru), garis("fg", 172, 118, 36, 0, W.biru, 2), teks("fb", 190, 136, "100", 16, W.biru)),
      tambah("seratus", teks("pr", 238, 126, "per seratus", 9, W.coklat)),
    ),
    k(
      SUARA_G3,
      hapus(0, "fa", "fg", "fb", "pr", "p1"),
      tambah("adalah", teks("r60", 210, 112, "60%", 24, W.hijauTua), emo("ok", 250, 112, E.benar, 18)),
      tambah("bukan", teks("r6", 210, 140, "6%", 18, W.merah), garis("cr", 192, 146, 36, -18, W.merah, 2.4, { z: 5 })),
    ),
  ],
};

/* ------------------------------ 6. Lampion: menepati taruhan ------------------------------ */
const SUARA_L1 = "Satria menepati taruhannya dan memasang lampion satu per satu.";
const SUARA_L2 = "Tangga lipatnya bergoyang, dan lampion terakhir menggantung miring di atas kepalanya.";
const SUARA_L3 = "Semua orang tertawa, dan Pak Hendro menahan tangga dengan kedua tangan.";

export const ADEGAN_LAMPION: AdeganStory = {
  id: "lampion",
  judul: "Satria memasang lampion",
  sumber: "Materi: menepati taruhan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Memasang Lampion"), ...halaman("hl", 150), ...tokoh("sa", 36, 184, "Satria")),
      tambah("memasang", garis("tl", 70, 80, 200, 0, W.coklat, 1.4, { z: 1 })),
      tambah("satu", ...lampion("m0", 90, 90, true)),
      tambah("per", ...lampion("m1", 130, 90, true)),
      tambah("satu@2", ...lampion("m2", 170, 90, true), teks("sp", 130, 118, "1 per 1", 12, W.merah)),
    ),
    k(
      SUARA_L2,
      hapus(0, ...["sa", "sa-n", "sa-bj"]),
      tambah("Tangga", garis("tg1", 206, 150, 18, -62, W.coklat, 2.6, { z: 2 }), garis("tg2", 242, 150, -18, -62, W.coklat, 2.6, { z: 2 }), garis("tr1", 211, 134, 26, 0, W.coklat, 2, { z: 2 }), garis("tr2", 216, 114, 16, 0, W.coklat, 2, { z: 2 })),
      tambah("bergoyang", teks("gy", 266, 100, "goyang", 10, W.merah)),
      tambah("miring", garis("mr", 190, 76, 30, 10, W.coklat, 1.4, { z: 1 }), ...lampion("m3", 196, 90, true)),
      tambah("kepalanya", emo("sa", 224, 112, E.satria, 24, { z: 3 })),
    ),
    k(
      SUARA_L3,
      tambah("tertawa", teks("ha", 70, 128, "ha ha ha", 12, W.merah), emo("tw", 70, 150, E.tawa, 22)),
      tambah("Hendro", ...tokoh("ph", 268, 184, "Pak Hendro")),
      tambah("menahan", panah("mh", 252, 132, -12, 10, W.hijauTua, 2.4, { z: 4 })),
      tambah("tangan", emo("tg", 252, 140, "\u{1F64C}", 16)),
    ),
  ],
};
