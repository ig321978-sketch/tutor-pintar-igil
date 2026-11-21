import type { AdeganStory } from "./logika-story";
import { E, W, emo, garis, judul, halaman, kisi, kotak, lampion, panah, papanPameran, teks, tokoh, warnai } from "./k4b2e-gambar";
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

/* ------------------------------ 6. Lampion: dua puluh dari lima puluh menjadi persen ------------------------------ */
const SUARA_L1 = "Satria menepati taruhannya, dan dari lima puluh lampion, dua puluh sudah menyala di tangga.";
const SUARA_L2 = "Satria menyebutnya dua puluh persen, tetapi Genta mengalikan pembilang dan penyebut dengan dua.";
const SUARA_L3 = "Dua puluh per lima puluh sama dengan empat puluh per seratus, jadi empat puluh persen.";

/** Dua batang sama panjang (200 satuan): batang atas 50 bagian dengan 20 terisi, batang bawah 100 bagian dengan 40 terisi; keduanya terisi 80 dari 200 (empat per sepuluh). */
export const ADEGAN_LAMPION: AdeganStory = {
  id: "lampion",
  judul: "Dua puluh dari lima puluh lampion",
  sumber: "Materi: pecahan berpenyebut lain",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Lampion di Tangga"), ...halaman("hl", 150), ...tokoh("sa", 36, 184, "Satria")),
      tambah("lampion", kotak("b1", 70, 56, 200, 20, W.putih, W.biru, { rx: 3, tebal: 1.6 }), emo("lp", 52, 70, E.lampion, 16)),
      tambah("menyala", kotak("b1f", 70, 56, 80, 20, "#FDE047", W.coklat, { rx: 3, tebal: 1.6, z: 1 }), teks("t1", 210, 70, "20 dari 50", 12, W.merah, { z: 2 })),
    ),
    k(
      SUARA_L2,
      tambah("menyebutnya", teks("s20", 215, 96, "20%", 14, W.merah), emo("xs", 250, 96, E.salah, 14)),
      tambah("Genta", ...tokoh("ge", 262, 184, "Genta")),
      tambah("mengalikan", panah("ar", 48, 80, 0, 22, W.hijauTua, 2.4, { z: 4 }), teks("kx", 28, 96, "× 2", 14, W.hijauTua)),
      tambah("dua@2", kotak("b2", 70, 104, 200, 20, W.putih, W.biru, { rx: 3, tebal: 1.6 }), kotak("b2f", 70, 104, 80, 20, "#FDE047", W.coklat, { rx: 3, tebal: 1.6, z: 1 }), teks("t2", 210, 118, "40 dari 100", 12, W.merah, { z: 2 })),
    ),
    k(
      SUARA_L3,
      hapus(0, "s20", "xs"),
      tambah("Dua", teks("fr", 150, 146, "20/50 = 40/100", 12, W.biru)),
      sorotkan("empat", "t2"),
      tambah("persen", teks("r40", 232, 96, "40%", 16, W.hijauTua), emo("ok", 262, 100, E.benar, 16)),
    ),
  ],
};
