import type { AdeganStory } from "./logika-story";
import { E, W, busur, emo, garis, garisBilangan, judul, kartu, kotak, rumput, teks, timbangan, tokoh, tumpukKayu } from "./k3b2A-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k3b2A-bantu";

/*
 * Cerita orisinal IGIL "Kayu untuk Api Unggun" (Kelas 3 Bab 2 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b2a.md. Bagian ini: Counting On (Menghitung Maju), Balance Scale (Timbangan Seimbang), terapan keduanya, dan ringkasan.
 */

/* ------------------------------ Counting On: konsep ------------------------------ */
const SUARA_C1 = "Cara kedua, Counting On, atau Menghitung Maju.";
const SUARA_C2 = "Mulai dari bilangan yang diketahui, lalu melompat maju sampai ke jumlah semuanya.";
const SUARA_C3 = "Banyaknya lompatan itulah bilangan yang belum diketahui.";
const SUARA_C4 = "Lompat ke puluhan terdekat dulu, baru lompat sisanya.";

export const ADEGAN_LUAR_MAJU: AdeganStory = {
  id: "luar-maju",
  judul: "Counting On: Menghitung Maju",
  sumber: "Metode global: Counting On (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 2: Counting On")),
      tambah("Counting", ...garisBilangan("gb", 30, 270, 110, 9)),
      tambah("atau", emo("rs", 30, 98, E.ransel, 16)),
      tambah("Maju.", teks("nm", 150, 160, "Menghitung Maju", 13, W.ungu), busur("h1", 30, 150, 110, 26)),
    ),
    k(
      SUARA_C2,
      tambah("Mulai", teks("s0", 30, 134, "mulai", 9, W.hijauTua)),
      tambah("melompat", busur("h2", 150, 270, 110, 26)),
      tambah("jumlah", teks("s1", 270, 134, "jumlah", 9, W.jumlah), emo("tn", 270, 98, E.tenda, 16)),
    ),
    k(
      SUARA_C3,
      sorotkan("lompatan", "h1", "h2"),
      tambah("bilangan", teks("tq", 150, 72, "?", 26, W.merah)),
    ),
    k(
      SUARA_C4,
      hapus(0, "tq"),
      tambah("puluhan", kotak("pd", 123, 100, 54, 8, "#FDE68A", W.coklat, { rx: 2, z: 0, op: 0.6 })),
      sorotkan("terdekat", "h1"),
      tambah("sisanya.", teks("ss", 210, 86, "sisanya", 9, W.merah)),
    ),
  ],
};

/* ------------------------------ Counting On: terapan ------------------------------ */
const SUARA_M1 = "Bima ingin tahu delapan belas tambah titik-titik sama dengan tiga puluh.";
const SUARA_M2 = "Dari delapan belas, ia melompat dua ke dua puluh, lalu sepuluh ke tiga puluh. Jadi titik-titik itu dua belas.";
const SUARA_M3 = "Cocok kalau dua bilangan berdekatan, karena lompatannya sedikit.";
const SUARA_M4 = "Kurang cocok kalau jaraknya jauh, karena lompatannya banyak dan mudah salah hitung.";

export const ADEGAN_LUAR_MAJU_TERAPAN: AdeganStory = {
  id: "luar-maju-terapan",
  judul: "Counting On: lompatan Bima",
  sumber: "Metode global: Counting On (terapan)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Bima Menghitung Maju"), ...rumput("rt", 150), ...tokoh("bm", 40, 184, "Bima")),
      tambah("delapan", teks("a18", 92, 72, "18", 24, W.hijauTua)),
      tambah("tambah", teks("t+", 128, 70, "+", 22, W.biru)),
      tambah("titik-titik", teks("tt", 162, 72, "…", 24, W.merah)),
      tambah("sama", teks("t=", 198, 70, "=", 22, W.biru), teks("a30", 238, 72, "30", 24, W.jumlah)),
    ),
    k(
      SUARA_M2,
      bersih(0),
      tambah(0, judul("Lompat Mencari Selisih"), ...rumput("rt", 150), garis("gl", 40, 130, 220, 0, W.biru, 2, { z: 0 })),
      tambah("delapan", garis("m18", 40, 124, 0, 12, W.biru, 1.8), teks("l18", 40, 148, "18", 10, W.hijauTua)),
      tambah("melompat", busur("h1", 40, 77, 126, 16)),
      tambah("dua", teks("p2", 58, 106, "+2", 9, W.merah)),
      tambah("puluh,", garis("m20", 77, 124, 0, 12, W.biru, 1.8), teks("l20", 77, 148, "20", 10, W.hijauTua)),
      tambah("sepuluh", busur("h2", 77, 260, 126, 34), teks("p10", 168, 90, "+10", 10, W.merah)),
      tambah("tiga", garis("m30", 260, 124, 0, 12, W.biru, 1.8), teks("l30", 260, 148, "30", 10, W.hijauTua)),
      tambah("belas.", teks("n12", 150, 52, "12", 26, W.jumlah)),
    ),
    k(
      SUARA_M3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...rumput("rt", 150)),
      tambah("Cocok", emo("ok", 262, 56, E.benar, 28)),
      tambah("dua", teks("n2", 90, 90, "2 bilangan", 9, W.ungu), garis("gl", 60, 120, 160, 0, W.biru, 2), garis("a1", 80, 114, 0, 12, W.biru, 1.8), garis("a2", 120, 114, 0, 12, W.biru, 1.8)),
      tambah("sedikit.", busur("hs", 80, 120, 114, 16), teks("sk", 100, 146, "lompatan sedikit", 9, W.hijauTua)),
    ),
    k(
      SUARA_M4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?"), ...rumput("rt", 150), garis("gl", 20, 120, 260, 0, W.biru, 2)),
      tambah("Kurang", emo("xs", 262, 56, E.salah, 28)),
      tambah("jaraknya", ...Array.from({ length: 9 }, (_, i) => garis(`mk${i}`, 20 + i * 32.5, 114, 0, 12, W.biru, 1.6))),
      tambah("banyak", ...Array.from({ length: 8 }, (_, i) => busur(`hb${i}`, 22 + i * 32.5, 50 + i * 32.5, 114, 12))),
      tambah("salah", emo("pz", 150, 160, E.pusing, 24), teks("sa", 150, 190, "mudah salah hitung", 9, W.merah)),
    ),
  ],
};

/* ------------------------------ Balance Scale: konsep ------------------------------ */
const SUARA_B1 = "Cara ketiga, Balance Scale, atau Timbangan Seimbang.";
const SUARA_B2 = "Tanda sama dengan berarti kedua sisi timbangan seimbang.";
const SUARA_B3 = "Titik-titik harus diisi bilangan yang pas supaya timbangan lurus.";
const SUARA_B4 = "Dengan timbangan, arti tanda sama dengan terlihat jelas.";

export const ADEGAN_LUAR_TIMBANG: AdeganStory = {
  id: "luar-timbang",
  judul: "Balance Scale: Timbangan Seimbang",
  sumber: "Metode global: Balance Scale (konsep)",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Cara 3: Balance Scale"), ...rumput("rt", 150)),
      tambah("Balance", ...timbangan("tb", 150, 60, 150)),
      tambah("Timbangan", teks("nm", 150, 168, "Timbangan Seimbang", 13, W.ungu)),
    ),
    k(
      SUARA_B2,
      tambah("Tanda", teks("sm", 150, 46, "=", 24, W.merah)),
      sorotkan("kedua", "tb-a", "tb-b"),
      tambah("seimbang.", emo("ok", 150, 148, E.benar, 20)),
    ),
    k(
      SUARA_B3,
      hapus(0, "ok"),
      tambah("Titik-titik", teks("tt", 94, 80, "…", 22, W.merah)),
      tambah("bilangan", teks("tp", 206, 80, "pas", 10, W.hijauTua)),
      tambah("lurus.", emo("lr", 150, 148, E.benar, 20)),
    ),
    k(
      SUARA_B4,
      sorotkan("timbangan,", "tb-p"),
      tambah("arti", emo("mt", 52, 70, E.mata, 18)),
      tambah("jelas.", teks("jl", 150, 134, "kiri = kanan", 9, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ Balance Scale: terapan ------------------------------ */
const SUARA_N1 = "Pada timbangan Raka, sisi kiri berisi dua puluh tambah titik-titik, sisi kanan berisi lima puluh.";
const SUARA_N2 = "Ia menambah beban di kiri sedikit demi sedikit sampai timbangan lurus, yaitu tiga puluh.";
const SUARA_N3 = "Cocok untuk memahami arti tanda sama dengan dan memeriksa hasil.";
const SUARA_N4 = "Kurang cocok untuk bilangan besar, karena menambah beban satu per satu memakan waktu.";

export const ADEGAN_LUAR_TIMBANG_TERAPAN: AdeganStory = {
  id: "luar-timbang-terapan",
  judul: "Balance Scale: timbangan Raka",
  sumber: "Metode global: Balance Scale (terapan)",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Timbangan Raka"), ...rumput("rt", 150), ...tokoh("rk", 36, 184, "Raka")),
      tambah("timbangan", ...timbangan("tb", 160, 50, 150)),
      tambah("dua", teks("kl", 104, 142, "20 + …", 14, W.hijauTua)),
      tambah("lima", teks("kn", 216, 142, "50", 16, W.jumlah)),
    ),
    k(
      SUARA_N2,
      tambah("menambah", kotak("w0", 90, 72, 14, 10, W.bagian, W.biru, { rx: 2, z: 2 }), teks("w0-t", 97, 80, "10", 6.4, W.putih, { z: 3 })),
      tambah("sedikit", kotak("w1", 106, 72, 14, 10, W.bagian, W.biru, { rx: 2, z: 2 }), teks("w1-t", 113, 80, "10", 6.4, W.putih, { z: 3 })),
      tambah("lurus,", kotak("w2", 122, 72, 14, 10, W.bagian, W.biru, { rx: 2, z: 2 }), teks("w2-t", 129, 80, "10", 6.4, W.putih, { z: 3 })),
      ubah("yaitu", { id: "kl", isi: "20 + 30" }),
      tambah("tiga", emo("ok", 160, 118, E.benar, 20)),
    ),
    k(
      SUARA_N3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...rumput("rt", 150)),
      tambah("Cocok", emo("ok", 262, 56, E.benar, 28)),
      tambah("memahami", ...timbangan("tb", 120, 50, 100), teks("sm", 120, 38, "=", 18, W.merah)),
      tambah("memeriksa", emo("pk", 220, 104, E.catat, 24), teks("ck", 220, 134, "periksa hasil", 9, W.hijauTua)),
    ),
    k(
      SUARA_N4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?"), ...rumput("rt", 150)),
      tambah("Kurang", emo("xs", 262, 56, E.salah, 28)),
      tambah("beban", ...Array.from({ length: 12 }, (_, i) => kotak(`bn${i}`, 30 + i * 22, 118, 18, 10, W.bagian, W.biru, { rx: 2, tebal: 1, z: 1 }))),
      tambah("satu", teks("t1", 150, 100, "+1 +1 +1 +1 +1", 12, W.merah)),
      tambah("waktu.", emo("jm", 150, 160, "\u{1F550}", 24), emo("pz", 200, 160, E.pusing, 24)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita lihat. Mana yang pas tergantung ceritanya.";
const SUARA_R2 = "Ingin melihat bagian dan jumlah, pakai Bagan Batang. Ingin melompat dari bilangan yang diketahui, pakai Menghitung Maju.";
const SUARA_R3 = "Ingin memastikan kedua sisi sama, pakai Timbangan Seimbang. Apa pun caranya, hasilnya diperiksa dengan menjumlahkan.";
const SUARA_R4 = "Menurutmu, untuk mencari kayu yang masih kurang di tumpukan, cara mana yang paling cepat?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Ringkasan metode global",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tiga Cara, Satu Hasil")),
      tambah("Tiga", teks("n3", 150, 36, "3 cara", 10, W.ungu), ...kartu("r0", 12, 46, 82, 40, "#FED7AA", ["Bagan", "Batang"], 9), ...kartu("r1", 109, 46, 82, 40, "#BFDBFE", ["Menghitung", "Maju"], 9), ...kartu("r2", 206, 46, 82, 40, "#BBF7D0", ["Timbangan", "Seimbang"], 8)),
      tambah("Mana", emo("tq", 150, 128, E.tanya, 28)),
    ),
    k(
      SUARA_R2,
      hapus(0, "tq"),
      tambah("melihat", teks("g0", 53, 104, "bagian", 9, W.ungu)),
      sorotkan("Bagan", "r0-k"),
      tambah("melompat", teks("g1", 150, 104, "lompat", 9, W.ungu)),
      redamkan("Menghitung", "r0-k"),
      sorotkan("Menghitung", "r1-k"),
    ),
    k(
      SUARA_R3,
      redamkan(0, "r1-k"),
      tambah("memastikan", teks("g2", 247, 104, "sisi sama", 9, W.ungu)),
      sorotkan("Timbangan", "r2-k"),
      tambah("menjumlahkan.", teks("pj", 150, 140, "cek: tambah", 12, W.hijauTua)),
    ),
    k(
      SUARA_R4,
      tambah("kayu", emo("rg", 40, 170, E.ranting, 18)),
      tambah("tumpukan,", ...tumpukKayu("ky", 100, 176, 12, 6, 11, 5)),
      tambah("cepat?", emo("tq", 240, 168, E.tanya, 30)),
    ),
  ],
};
