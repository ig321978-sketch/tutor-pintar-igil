import type { AdeganStory } from "./logika-story";
import { E, W, emo, garis, judul, kartu, kotak, panah, teks, tokoh } from "./k4b1e-gambar";
import { bersih, hapus, k, sorotkan, redamkan, tambah, ubah } from "./k4b1e-bantu";

/*
 * Cerita orisinal IGIL "Meja Resepsi Bu Rina" (Kelas 4 Bab 1 Sub-Bab E), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b1e.md. Bagian ini: Place Add (Tambah Per Tempat), Round and Adjust (Genapkan Dulu), terapannya, dan ringkasan.
 */

const KUNING_KARTU = "#FEF3C7";
const KERTAS = (id = "ks") => kotak(id, 30, 30, 240, 132, W.kertas, W.coklat, { rx: 6, tebal: 1.6, z: -1 });

/* ------------------------------ Place Add: konsep ------------------------------ */
const SUARA_P1 = "Cara kedua, Place Add, atau Tambah Per Tempat.";
const SUARA_P2 = "Tiap bilangan diuraikan menjadi ratusan, puluhan, dan satuan, lalu tiap tempat dijumlahkan sendiri.";
const SUARA_P3 = "Hasil tiap tempat digabung, jadi empat ratus, lima puluh, dan dua, hasil akhirnya empat ratus lima puluh dua.";
const SUARA_P4 = "Kalau satu tempat berjumlah sepuluh atau lebih, diuraikan lagi, empat belas menjadi sepuluh dan empat.";

export const ADEGAN_LUAR_TAMBAH: AdeganStory = {
  id: "luar-tambah",
  judul: "Place Add: Tambah Per Tempat",
  sumber: "Metode global: Place Add",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Cara Kedua"), teks("nm", 150, 52, "Place Add", 17, W.ungu)),
      tambah("Tambah", teks("ni", 150, 76, "Tambah Per Tempat", 12, W.biru)),
      tambah("Tempat.", ...[0, 1, 2].map((i) => kotak(`pt${i}`, 90 + i * 40, 100, 34, 34, [W.ratusan, W.puluhan, W.satuan][i], W.biru, { rx: 6, z: 2 })), ...["R", "P", "S"].map((h, i) => teks(`ph${i}`, 107 + i * 40, 122, h, 14, W.biru, { z: 3 }))),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Uraikan Dulu"), KERTAS()),
      tambah("diuraikan", teks("u1", 150, 46, "131 = 100 + 30 + 1", 11, W.biru, { z: 4 }), teks("u2", 150, 62, "321 = 300 + 20 + 1", 11, W.biru, { z: 4 })),
      tambah("ratusan", ...kartu("r", 40, 72, 66, 42, W.ratusan, ["ratusan", "100 + 300"], 11, { z: 2 })),
      tambah("puluhan", ...kartu("p", 117, 72, 66, 42, W.puluhan, ["puluhan", "30 + 20"], 11, { z: 2 })),
      tambah("satuan", ...kartu("s", 194, 72, 66, 42, W.satuan, ["satuan", "1 + 1"], 11, { z: 2 })),
    ),
    k(
      SUARA_P3,
      tambah("jadi", teks("h1", 73, 132, "400", 14, W.biru, { z: 4 })),
      tambah("lima", teks("h2", 150, 132, "50", 14, W.biru, { z: 4 })),
      tambah("dan", teks("h3", 227, 132, "2", 14, W.biru, { z: 4 })),
      tambah("akhirnya", garis("gb", 60, 138, 180, 0, W.biru, 2, { z: 4 }), teks("ha", 150, 156, "452", 20, W.hijauTua, { z: 4 })),
    ),
    k(
      SUARA_P4,
      hapus("Kalau", "u1", "u2"),
      tambah("sepuluh", teks("c0", 150, 46, "10 atau lebih", 11, W.merah, { z: 4 })),
      tambah("diuraikan", teks("c1", 150, 62, "14 = 10 + 4", 12, W.merah, { z: 4 })),
      tambah("empat@2", emo("ok", 262, 62, E.benar, 18)),
      sorotkan("lagi", "s-k"),
    ),
  ],
};

/* ------------------------------ Place Add: terapan ------------------------------ */
const SUARA_Q1 = "Genta menjumlahkan empat ratus tujuh belas dan dua ratus enam puluh lima.";
const SUARA_Q2 = "Ratusan enam ratus, puluhan tujuh puluh, satuan dua belas, yaitu sepuluh dan dua, jadi enam ratus delapan puluh dua.";
const SUARA_Q3 = "Cocok untuk anak yang masih bingung dengan simpanan, karena tiap tempat terlihat jelas.";
const SUARA_Q4 = "Kurang cocok kalau waktunya singkat, karena langkahnya lebih panjang daripada bersusun.";

export const ADEGAN_LUAR_TAMBAH_TERAPAN: AdeganStory = {
  id: "luar-tambah-terapan",
  judul: "Place Add: Genta menjumlahkan",
  sumber: "Metode global: Place Add terapan",
  latar: "#F0FDFA",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Genta Menjumlahkan"), KERTAS(), ...tokoh("gn", 36, 184, "Genta")),
      tambah("empat", teks("b1", 150, 76, "417", 26, W.biru, { z: 4 })),
      tambah("lima.", teks("pq", 150, 100, "+", 16, W.biru, { z: 4 }), teks("b2", 150, 130, "265", 26, W.biru, { z: 4 })),
    ),
    k(
      SUARA_Q2,
      bersih(0),
      tambah(0, judul("Per Tempat"), KERTAS()),
      tambah("Ratusan", ...kartu("r", 40, 44, 66, 54, W.ratusan, ["ratusan", "600"], 11, { z: 2 })),
      tambah("puluhan", ...kartu("p", 117, 44, 66, 54, W.puluhan, ["puluhan", "70"], 11, { z: 2 })),
      tambah("satuan", ...kartu("s", 194, 44, 66, 54, W.satuan, ["satuan", "12", "= 10 + 2"], 11, { z: 2 })),
      tambah("jadi", teks("hs", 150, 146, "682", 24, W.hijauTua, { z: 4 }), garis("gb", 60, 116, 180, 0, W.biru, 2, { z: 4 })),
    ),
    k(
      SUARA_Q3,
      tambah("Cocok", emo("ok", 262, 142, E.benar, 20)),
      tambah("anak", ...tokoh("gn", 36, 184, "Genta")),
      tambah("bingung", emo("bg", 62, 146, E.pikir, 16)),
      tambah("jelas.", teks("ts", 150, 170, "tiap tempat jelas", 10, W.hijauTua, { z: 4 })),
    ),
    k(
      SUARA_Q4,
      hapus("Kurang", "ok", "ts", "bg"),
      tambah("kurang", emo("xs", 262, 142, E.salah, 20)),
      tambah("singkat,", emo("jm", 262, 176, "\u{23F0}", 18)),
      tambah("panjang", kotak("bp", 60, 160, 140, 8, W.ratusan, W.biru, { rx: 2, z: 3 }), teks("tp", 130, 176, "per tempat: panjang", 8, W.biru, { z: 4 })),
      tambah("bersusun.", kotak("bs", 60, 150, 80, 8, W.satuan, W.biru, { rx: 2, z: 3 }), teks("tb", 100, 148, "bersusun", 8, W.biru, { z: 4 })),
    ),
  ],
};

/* ------------------------------ Round and Adjust: konsep ------------------------------ */
const SUARA_G1 = "Cara ketiga, Round and Adjust, atau Genapkan Dulu.";
const SUARA_G2 = "Salah satu bilangan dibulatkan ke puluhan atau ratusan yang mudah, lalu dijumlahkan.";
const SUARA_G3 = "Setelah itu hasilnya disesuaikan dengan mengurangi kelebihan yang tadi ditambahkan.";
const SUARA_G4 = "Cara ini cepat untuk bilangan yang hampir bulat.";

export const ADEGAN_LUAR_GENAP: AdeganStory = {
  id: "luar-genap",
  judul: "Round and Adjust: Genapkan Dulu",
  sumber: "Metode global: Round and Adjust",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Cara Ketiga"), teks("nm", 150, 52, "Round and Adjust", 17, W.ungu)),
      tambah("Genapkan", teks("ni", 150, 76, "Genapkan Dulu", 12, W.biru)),
      tambah("Dulu.", ...kartu("cn", 104, 98, 92, 40, KUNING_KARTU, ["198 jadi 200"], 12), emo("ul", 150, 168, E.ulang, 20)),
    ),
    k(
      SUARA_G2,
      bersih(0),
      tambah(0, judul("Dibulatkan Dulu"), KERTAS()),
      tambah("satu", teks("n1", 80, 54, "1 bilangan", 10, W.merah, { z: 4 })),
      tambah("dibulatkan", teks("b1", 80, 90, "198", 26, W.biru, { z: 4 }), panah("pb", 112, 84, 46, 0, W.merah, 2, { z: 4 })),
      tambah("puluhan", teks("b2", 190, 90, "200", 26, W.hijauTua, { z: 4 })),
      tambah("mudah,", emo("ok", 262, 84, E.benar, 18)),
      tambah("dijumlahkan.", teks("pj", 150, 132, "+ bilangan lain", 11, W.biru, { z: 4 })),
    ),
    k(
      SUARA_G3,
      tambah("disesuaikan", teks("ds", 165, 126, "hasil disesuaikan", 11, W.biru, { z: 4 })),
      hapus("disesuaikan", "pj"),
      tambah("mengurangi", teks("kr", 80, 126, "− 2", 22, W.merah, { z: 4 })),
      tambah("kelebihan", teks("kl", 80, 148, "kelebihan", 9, W.merah, { z: 4 })),
      tambah("ditambahkan.", emo("pl", 262, 126, E.ulang, 18)),
    ),
    k(
      SUARA_G4,
      hapus("Cara", "ds", "pl"),
      tambah("cepat", emo("kc", 150, 126, "\u{26A1}", 26), teks("cp", 150, 150, "cepat", 11, W.hijauTua, { z: 4 })),
      tambah("hampir", teks("hb", 150, 172, "hampir bulat", 11, W.biru, { z: 4 })),
      sorotkan("bulat.", "b1", "b2"),
    ),
  ],
};

/* ------------------------------ Round and Adjust: terapan ------------------------------ */
const SUARA_H1 = "Satria menjumlahkan seratus dua puluh tiga dan sembilan puluh sembilan.";
const SUARA_H2 = "Ia memakai seratus dulu, hasilnya dua ratus dua puluh tiga, lalu dikurangi satu menjadi dua ratus dua puluh dua.";
const SUARA_H3 = "Cocok untuk bilangan yang hampir bulat, seperti sembilan puluh sembilan.";
const SUARA_H4 = "Kurang cocok untuk bilangan yang jauh dari bulat, karena penyesuaiannya jadi rumit.";

export const ADEGAN_LUAR_GENAP_TERAPAN: AdeganStory = {
  id: "luar-genap-terapan",
  judul: "Round and Adjust: Satria menjumlahkan",
  sumber: "Metode global: Round and Adjust terapan",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Satria Menjumlahkan"), KERTAS(), ...tokoh("sa", 36, 184, "Satria")),
      tambah("tiga", teks("b1", 150, 76, "123", 26, W.biru, { z: 4 })),
      tambah("sembilan@2", teks("pq", 150, 100, "+", 16, W.biru, { z: 4 }), teks("b2", 150, 130, "99", 26, W.biru, { z: 4 })),
    ),
    k(
      SUARA_H2,
      tambah("seratus", teks("b3", 232, 130, "100", 18, W.hijauTua, { z: 4 })),
      tambah("dulu,", teks("e1", 232, 76, "123 + 100", 11, W.biru, { z: 4 })),
      tambah("tiga,", teks("e2", 232, 92, "= 223", 11, W.hijauTua, { z: 4 })),
      tambah("satu", teks("e3", 232, 112, "− 1", 14, W.merah, { z: 4 })),
      tambah("dua@3", teks("e4", 150, 156, "222", 20, W.hijauTua, { z: 4 })),
    ),
    k(
      SUARA_H3,
      hapus("Cocok", "b3", "e1", "e2", "e3"),
      tambah("Cocok", emo("ok", 262, 84, E.benar, 20)),
      tambah("hampir", teks("hb", 262, 110, "hampir bulat", 8, W.hijauTua, { z: 4 })),
      sorotkan("sembilan", "b2"),
    ),
    k(
      SUARA_H4,
      hapus("Kurang", "ok", "hb"),
      tambah("Kurang", emo("xs", 262, 84, E.salah, 20)),
      tambah("jauh", teks("jb", 262, 110, "137: jauh", 8, W.merah, { z: 4 })),
      tambah("rumit.", teks("rm", 262, 136, "rumit", 10, W.merah, { z: 4 })),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita lihat bersama Bu Rina. Mana yang pas tergantung keadaan.";
const SUARA_R2 = "Ingin cara yang rapi, pakai Susun ke Bawah. Ingin paham isi tiap tempat, pakai Tambah Per Tempat.";
const SUARA_R3 = "Ingin menghitung cepat dalam kepala, pakai Genapkan Dulu. Apa pun caranya, periksa hasilnya.";
const SUARA_R4 = "Menurutmu, untuk menjumlahkan dua ratus tiga puluh dan sembilan puluh sembilan, cara mana yang paling pas?";
const CARA = ["Susun ke Bawah", "Tambah Per Tempat", "Genapkan Dulu"];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Ringkasan metode global",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tiga Cara"), teks("n3", 260, 40, "3 cara", 10, W.ungu), ...CARA.flatMap((c, i) => kartu(`r${i}`, 30, 50 + i * 40, 150, 32, KUNING_KARTU, [c], 11, { z: 2 }))),
      tambah("Rina.", ...tokoh("br", 236, 120, "Bu Rina")),
      tambah("pas", emo("tq", 200, 80, E.tanya, 18)),
    ),
    k(
      SUARA_R2,
      sorotkan("Susun", "r0-k"),
      hapus("tiap", "tq"),
      sorotkan("Tambah", "r1-k"),
      ubah("Tambah", { id: "r0-k", sorot: false }),
      tambah("Ingin@2", emo("ok1", 200, 80, E.benar, 18)),
    ),
    k(
      SUARA_R3,
      redamkan("cepat", "r1-k"),
      sorotkan("Genapkan", "r2-k"),
      hapus("Apa", "ok1"),
      tambah("periksa", emo("ok2", 200, 110, E.mata, 18), emo("ok3", 200, 140, E.benar, 18)),
    ),
    k(
      SUARA_R4,
      redamkan("Menurutmu,", "r2-k"),
      hapus("Menurutmu,", "n3", "ok2", "ok3"),
      tambah("dua", teks("qs", 100, 182, "230 + 99 = ?", 16, W.biru, { z: 4 })),
      tambah("sembilan", emo("tq2", 200, 80, E.tanya, 22)),
      tambah("pas?", emo("pk", 200, 104, E.pikir, 18)),
    ),
  ],
};
