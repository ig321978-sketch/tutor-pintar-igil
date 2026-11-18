import type { AdeganStory } from "./logika-story";
import { E, W, WK, biji, emo, garis, judul, kotak, papanNama, poligon, potongBulat, rumput, teks, tokoh, wadah } from "./k2b5A-gambar";
import { hapus, k, sorotkan, tambah } from "./k2b5A-bantu";

/*
 * Cerita orisinal IGIL "Semangka Raksasa Pak Danu" (Kelas 2 Bab 5 Sub-Bab A, setengah dari benda utuh), awal cerita Kebun Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b5a.md. Bagian ini: bagi dua regu, setengah di sekitar kita, melipat kertas.
 */

/* ------------------------------ 4. Bagi dua regu ------------------------------ */
const SUARA_B1 = "Setengah untuk regu Merah, setengah untuk regu Hijau. Kedua regu bersorak.";
const SUARA_B2 = "Dika menumpuk dua belahan itu, dan keduanya pas. Itu tanda sama besar.";
const SUARA_B3 = "Kalau tidak pas, berarti bukan setengah.";

export const ADEGAN_BAGI_REGU: AdeganStory = {
  id: "bagi-regu",
  judul: "Bagi dua regu",
  sumber: "Materi: bagi dua regu",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Dibagi Dua Regu"), rumput("rm", 134)),
      tambah("Setengah", potongBulat("h1", 118, 126, 20, 90, 270, WK.daging, WK.kulit), ...biji("sa", 110, 126)),
      tambah("Merah,", emo("rk1", 44, 178, E.anak, 24), ...wadah("em", 58, 164, 24, 18, 0, "#60A5FA", "#DC2626"), teks("lm", 70, 192, "Merah", 8, W.merah)),
      tambah("setengah@2", potongBulat("h2", 154, 126, 20, -90, 90, WK.daging, WK.kulit), ...biji("sb", 162, 126)),
      tambah("Hijau.", emo("rk2", 256, 178, E.anak, 24), ...wadah("eh", 220, 164, 24, 18, 0, "#60A5FA", "#16A34A"), teks("lh", 232, 192, "Hijau", 8, W.hijau)),
      tambah("bersorak.", emo("sr1", 44, 150, E.sorak, 18), emo("sr2", 256, 150, E.sorak, 18)),
    ),
    k(
      SUARA_B2,
      tambah("Dika", ...tokoh("dk", 150, 184, "Dika")),
      hapus("menumpuk", "h1", "sa-b0", "sa-b1", "sa-b2"),
      tambah("dua", teks("n2", 150, 90, "2 belahan", 9, W.ungu)),
      tambah("belahan", potongBulat("h3", 157, 129, 20, -90, 90, "#FCA5A5", WK.kulit, { z: -1 })),
      tambah("pas.", emo("ok", 204, 106, E.benar, 20)),
      tambah("sama", teks("t1", 150, 72, "sama besar", 11, W.hijau)),
    ),
    k(
      SUARA_B3,
      hapus(0, "h2", "h3", "sb-b0", "sb-b1", "sb-b2", "n2", "ok", "t1"),
      tambah("Kalau", potongBulat("ub", 150, 130, 22, 80, 380, WK.daging, WK.kulit), potongBulat("uk", 160, 136, 22, 20, 80, "#FCA5A5", WK.kulit, { z: 2 })),
      tambah("pas,", emo("x3", 150, 100, E.salah, 22)),
      tambah("bukan", teks("bk", 150, 72, "bukan setengah", 11, W.merah)),
      sorotkan("setengah.", "ub"),
    ),
  ],
};

/* ------------------------------ 5. Setengah di sekitar kita ------------------------------ */
const SUARA_C1 = "Setengah ada di mana-mana! Ada setengah ember air untuk menyiram dan setengah gelas jus.";
const SUARA_C2 = "Bu Sari menunjukkan setengah labu kecil dan setengah karung bibit.";
const SUARA_C3 = "Coba amati sekitarmu. Setengah apa lagi yang kamu temukan?";

export const ADEGAN_SETENGAH_SEKITAR: AdeganStory = {
  id: "setengah-sekitar",
  judul: "Setengah di sekitar kita",
  sumber: "Materi: setengah di sekitar kita",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Setengah di Sekitar"), rumput("rm", 140)),
      tambah("mana-mana!", emo("e1", 24, 56, E.bintang, 16), emo("e2", 282, 40, E.bintang, 16)),
      tambah("ember", ...wadah("eb", 62, 112, 52, 46, 0.5, "#60A5FA", "#475569", true), teks("le", 88, 174, "setengah ember", 8.6, W.hijau)),
      tambah("gelas", ...wadah("gl", 196, 112, 32, 46, 0.5, "#FB923C", "#475569", true), teks("lg", 212, 174, "setengah gelas", 8.6, W.hijau)),
    ),
    k(
      SUARA_C2,
      tambah("Sari", ...tokoh("bs", 150, 182, "Bu Sari")),
      tambah("labu", potongBulat("lb", 50, 78, 18, 180, 360, "#FB923C", "#9A3412"), teks("ll", 50, 96, "setengah labu", 8, W.hijau)),
      tambah("karung", kotak("kg", 228, 52, 34, 40, "#E7D3A8", W.coklat, { rx: 4, tebal: 2 }), kotak("kgi", 230, 72, 30, 18, "#C9A66B", undefined, { rx: 2, tebal: 0, z: 1 }), emo("kt", 245, 84, E.tunas, 12, { z: 2 }), teks("lk", 245, 106, "setengah karung", 8, W.hijau)),
    ),
    k(
      SUARA_C3,
      tambah("amati", emo("kc", 112, 100, E.kaca, 30)),
      tambah("Setengah", emo("t1", 190, 98, E.tanya, 26)),
      tambah("temukan?", emo("t2", 150, 126, E.mata, 22)),
    ),
  ],
};

/* ------------------------------ 6. Melipat kertas ------------------------------ */
const SUARA_L1 = "Nia punya kertas persegi untuk papan nama tanaman. Ia melipatnya menjadi dua bagian sama besar.";
const SUARA_L2 = "Bisa dilipat tegak, mendatar, atau miring dari pojok ke pojok.";
const SUARA_L3 = "Setiap lipatan menghasilkan setengah, hanya bentuknya yang berbeda: persegi panjang atau segitiga.";

export const ADEGAN_LIPAT_KERTAS: AdeganStory = {
  id: "lipat-kertas",
  judul: "Melipat kertas",
  sumber: "Materi: melipat kertas",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Melipat Kertas"), rumput("rm", 150)),
      tambah("Nia", ...tokoh("ni", 40, 182, "Nia")),
      tambah("kertas", kotak("kt", 100, 60, 70, 70, W.putih, W.biru, { rx: 2, tebal: 2 })),
      tambah("papan", ...papanNama("pn", 214, 66, 34, 18)),
      tambah("tanaman.", emo("tn", 231, 112, E.tunas, 20)),
      tambah("melipatnya", garis("lp", 135, 56, 0, 78, W.merah, 2, { putus: true, z: 2 })),
      tambah("dua", teks("n2", 135, 146, "2 bagian sama", 9, W.ungu)),
    ),
    k(
      SUARA_L2,
      hapus(0, "kt", "lp", "n2", ...["pn", "pn-g", "tn"]),
      tambah("tegak,", kotak("k1", 40, 64, 50, 50, W.putih, W.biru, { rx: 2, tebal: 2 }), garis("f1", 65, 60, 0, 58, W.merah, 2, { putus: true, z: 2 }), teks("l1", 65, 132, "tegak", 9, W.ungu)),
      tambah("mendatar,", kotak("k2", 125, 64, 50, 50, W.putih, W.biru, { rx: 2, tebal: 2 }), garis("f2", 121, 89, 58, 0, W.hijau, 2, { putus: true, z: 2 }), teks("l2", 150, 132, "mendatar", 9, W.ungu)),
      tambah("miring", kotak("k3", 210, 64, 50, 50, W.putih, W.biru, { rx: 2, tebal: 2 }), garis("f3", 210, 64, 50, 50, W.ungu, 2, { putus: true, z: 2 }), teks("l3", 235, 132, "miring", 9, W.ungu)),
      sorotkan("pojok.", "k3"),
    ),
    k(
      SUARA_L3,
      hapus(0, "k1", "f1", "l1", "k2", "f2", "l2", "k3", "f3", "l3"),
      tambah("menghasilkan", emo("ok", 150, 100, E.benar, 24)),
      tambah("persegi", kotak("hp", 40, 70, 80, 40, "#BFDBFE", W.biru, { rx: 2, tebal: 2 }), teks("sh1", 80, 94, "setengah", 10, W.hijau), teks("ph1", 80, 126, "persegi panjang", 9, W.ungu)),
      tambah("segitiga.", poligon("hs", [[190, 112], [260, 112], [190, 62]], "#BBF7D0", W.biru, { tebal: 2 }), teks("sh2", 220, 106, "setengah", 9, W.hijau), teks("ph2", 225, 126, "segitiga", 9, W.ungu)),
    ),
  ],
};

