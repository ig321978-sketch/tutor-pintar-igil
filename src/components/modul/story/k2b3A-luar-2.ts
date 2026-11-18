import type { AdeganStory } from "./logika-story";
import { E, W, WARNA_BENTUK, WT, angkaSisi, bangun, emo, garisSisi, jamDinding, judul, kapur, kartu, keranjang, lensaVenn, papanCatat, perosotan, pohon, pos, relBeraturan, relSegitiga, relSegiempat, rumahBurung, rumput, sudutBangun, teks, tokoh, venn } from "./k2b3A-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k2b3A-bantu";

/*
 * Cerita orisinal IGIL "Ubin untuk Taman Bermain" (Kelas 2 Bab 3 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k2b3a.md. Bagian ini: Venn Diagram (Diagram Venn), Shape Hunt (Berburu Bentuk), dan ringkasan.
 */

const MERAH_UBIN = "#FCA5A5";

/* ------------------------------ Venn Diagram: konsep ------------------------------ */
const SUARA_V1 = "Cara kedua, Venn Diagram, atau Diagram Venn.";
const SUARA_V2 = "Gambar dua lingkaran besar yang saling bertumpuk di bagian tengahnya.";
const SUARA_V3 = "Satu lingkaran untuk satu ciri, misalnya segi banyak, dan lingkaran lain untuk ciri lain, misalnya warna merah.";
const SUARA_V4 = "Benda yang punya dua ciri sekaligus ditaruh di bagian tengah yang bertumpuk.";

export const ADEGAN_LUAR_VENN: AdeganStory = {
  id: "luar-venn",
  judul: "Venn Diagram: Diagram Venn",
  sumber: "Metode global: Venn Diagram (konsep)",
  latar: "#FAF5FF",
  ketukan: [
    k(
      SUARA_V1,
      tambah(0, judul("Cara 2: Venn Diagram")),
      tambah("kedua,", ...venn("vn", 150, 108, 44)),
      tambah("Venn", teks("vl", 150, 184, "Venn Diagram", 12, W.ungu)),
      ubah("Venn@2", { id: "vl", isi: "Diagram Venn" }),
    ),
    k(
      SUARA_V2,
      hapus(0, "vl"),
      tambah("Gambar", teks("d2", 150, 184, "2 lingkaran", 11, W.merah)),
      sorotkan("besar", "vna", "vnb"),
      tambah("bertumpuk", lensaVenn("ln", 150, 108, 44)),
      tambah("tengahnya.", teks("tg", 150, 112, "tengah", 9, W.merah, { z: 3 })),
    ),
    k(
      SUARA_V3,
      hapus(0, "d2", "tg", "ln"),
      sorotkan("lingkaran@2", "vna", "vnb"),
      tambah("Satu", teks("c1", 106, 112, "1 ciri", 10, W.biru)),
      tambah("ciri,", teks("va", 106, 126, "segi banyak", 8.4, W.biru)),
      tambah("misalnya", teks("c1b", 196, 112, "1 ciri", 10, W.merah)),
      tambah("merah.", teks("vb", 196, 126, "warna merah", 8.4, W.merah)),
    ),
    k(
      SUARA_V4,
      hapus(0, "c1", "c1b", "va", "vb"),
      tambah("Benda", lensaVenn("ln", 150, 108, 44)),
      tambah("dua", teks("c2", 150, 126, "2 ciri", 10, W.merah, { z: 3 })),
      tambah("sekaligus", bangun("hx", relBeraturan(6, 12), 150, 100, MERAH_UBIN, 0, { z: 3 })),
      tambah("bertumpuk.", emo("ok", 236, 74, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ Venn Diagram: terapan ------------------------------ */
const SUARA_W1 = "Dika menaruh ubin ke dua lingkaran, satu untuk segi banyak dan satu untuk warna merah.";
const SUARA_W2 = "Ubin merah berbentuk segi enam masuk ke bagian tengah, karena punya kedua ciri.";
const SUARA_W3 = "Cocok kalau benda punya dua ciri dan kita ingin melihatnya sekaligus.";
const SUARA_W4 = "Kurang cocok kalau hanya satu ciri yang dicari, karena dua keranjang biasa sudah cukup.";

export const ADEGAN_LUAR_VENN_TERAPAN: AdeganStory = {
  id: "luar-venn-terapan",
  judul: "Venn Diagram: ubin merah segi enam",
  sumber: "Metode global: Venn Diagram (terapan)",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_W1,
      tambah(0, judul("Ubin ke Dua Lingkaran"), rumput("rp")),
      tambah("Dika", ...tokoh("dk", 36, 178, "Dika")),
      tambah("lingkaran,", ...venn("vn", 165, 108, 44, "segi banyak", "warna merah")),
      tambah("dua", teks("d2", 165, 184, "2 lingkaran", 11, W.merah)),
      tambah("satu", teks("l1", 130, 142, "1", 14, W.biru)),
      tambah("satu@2", teks("l2", 200, 142, "1", 14, W.merah)),
    ),
    k(
      SUARA_W2,
      hapus(0, "d2", "l1", "l2"),
      tambah("Ubin", bangun("ku", relSegiempat(18, 18), 134, 100, WT.ubinKuning), bangun("tl", relBeraturan(3, 11), 202, 104, MERAH_UBIN)),
      tambah("segi", bangun("hx", relBeraturan(6, 13), 165, 40, MERAH_UBIN, 0, { z: 3 })),
      tambah("enam", teks("e6", 165, 156, "6 sisi", 10, W.merah)),
      ubah("masuk", { id: "hx", y: 100 }),
      tambah("tengah,", lensaVenn("ln", 165, 108, 44, "none", { z: 1, putus: true })),
      tambah("kedua", emo("ok", 252, 76, E.benar, 20)),
    ),
    k(
      SUARA_W3,
      hapus(0, "e6", "ku", "tl"),
      tambah("Cocok", emo("ck", 252, 76, E.benar, 24), ...kartu("cc", 85, 160, 160, 24, W.hijauMuda, ["2 ciri sekaligus"], 10)),
      ubah("sekaligus.", { id: "cc-k", sorot: true }),
    ),
    k(
      SUARA_W4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?")),
      tambah("Kurang", emo("xs", 252, 70, E.salah, 24)),
      tambah("satu", ...kartu("kc", 100, 34, 100, 22, W.krem, ["1 ciri saja"], 10)),
      tambah("dua", ...keranjang("k1", 50, 90, WT.ubinKuning, "segi banyak"), ...keranjang("k2", 180, 90, WT.ubinHijau, "lengkung")),
      tambah("cukup.", teks("kc2", 150, 184, "2 keranjang cukup", 10, W.ungu)),
    ),
  ],
};

/* ------------------------------ Shape Hunt: konsep ------------------------------ */
const SUARA_B1 = "Cara ketiga, Shape Hunt, atau Berburu Bentuk.";
const SUARA_B2 = "Kita berjalan mengelilingi taman sambil mencari benda yang berbentuk tertentu.";
const SUARA_B3 = "Pilih satu bentuk dulu, misalnya segi enam, lalu cari sebanyak mungkin bendanya.";
const SUARA_B4 = "Setiap temuan dicatat, dan sisinya dihitung lagi untuk memastikan.";

const ptsB = sudutBangun(relBeraturan(6, 30), 130, 100, 0);

export const ADEGAN_LUAR_BURU: AdeganStory = {
  id: "luar-buru",
  judul: "Shape Hunt: Berburu Bentuk",
  sumber: "Metode global: Shape Hunt (konsep)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Cara 3: Shape Hunt"), rumput("rp"), ...pohon("pn", 268, 60, 18)),
      tambah("Shape", teks("bn", 150, 150, "Shape Hunt", 12, W.ungu)),
      ubah("Berburu", { id: "bn", isi: "Berburu Bentuk" }),
      tambah("Berburu", emo("kc", 150, 120, E.kaca, 28)),
    ),
    k(
      SUARA_B2,
      hapus(0, "bn", "kc"),
      tambah("berjalan", ...tokoh("ch", 40, 178, "Chacha")),
      ubah("mengelilingi", { id: "ch", x: 120 }, { id: "ch-n", x: 120 }),
      tambah("taman", ...perosotan("ps", 30, 82)),
      tambah("sambil", ...pos("po", 118, 98, 70, 52), ...jamDinding("jm", 153, 120, 17)),
      tambah("mencari", emo("kc", 176, 154, E.kaca, 22), ...rumahBurung("rb", 226, 88, 34, 36)),
      tambah("tertentu.", emo("qm", 236, 150, E.tanya, 20)),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Pilih Satu Bentuk"), rumput("rp")),
      tambah("Pilih", ...kartu("pb", 50, 36, 200, 22, W.krem, ["1 bentuk: segi enam"], 10)),
      tambah("segi", bangun("hx", relBeraturan(6, 30), 130, 100, WT.ubinKuning)),
      tambah("enam,", teks("e6", 130, 148, "6 sisi", 11, W.merah)),
      tambah("sebanyak", emo("pn", 230, 100, E.pohon, 24), emo("qq", 262, 110, E.tanya, 18)),
      tambah("bendanya.", emo("kc", 200, 150, E.kaca, 22)),
    ),
    k(
      SUARA_B4,
      hapus(0, "pn", "qq"),
      tambah("temuan", papanCatat("pc", 196, 76, 94, 66)),
      tambah("dicatat,", kapur("pt", 243, 96, "catatan", 9), kapur("pj", 243, 116, "jam dinding", 8.4)),
      ...[0, 1, 2, 3, 4, 5].map((i) => tambah("dihitung", garisSisi("hx", ptsB, i), angkaSisi("hx", ptsB, i, 11))),
      tambah("memastikan.", emo("ok", 262, 156, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ Shape Hunt: terapan ------------------------------ */
const SUARA_R1 = "Chacha berburu segi enam, dan ia menemukan jam dinding, ubin lantai, dan sarang lebah kayu.";
const SUARA_R2 = "Ia menghitung sisi jam dinding sampai enam sebelum mencatatnya.";
const SUARA_R3 = "Cocok kalau kita ingin mengenal bentuk-bentuk di sekitar kita.";
const SUARA_R4 = "Kurang cocok kalau kita butuh jawaban cepat, tetapi tidak ada benda di dekat kita.";

const ptsR = sudutBangun(relBeraturan(6, 17), 60, 88, 0);

export const ADEGAN_LUAR_BURU_TERAPAN: AdeganStory = {
  id: "luar-buru-terapan",
  judul: "Shape Hunt: berburu segi enam",
  sumber: "Metode global: Shape Hunt (terapan)",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Berburu Segi Enam"), rumput("rp")),
      tambah("Chacha", ...tokoh("ch", 262, 178, "Chacha")),
      tambah("segi", teks("e6", 150, 160, "6 sisi", 11, W.merah)),
      tambah("jam", ...jamDinding("jm", 60, 88, 17), teks("tj", 60, 130, "jam dinding", 9, W.ungu)),
      tambah("ubin", bangun("ul", relBeraturan(6, 18), 150, 88, WT.ubinKuning), teks("tu", 150, 130, "ubin lantai", 9, W.ungu)),
      tambah("sarang", ...[[236, 80], [254, 90], [236, 100], [218, 90]].map(([x, y], i) => bangun(`sl${i}`, relBeraturan(6, 11), x, y, i === 0 ? "#FACC15" : WT.ubinKuning)), teks("ts", 236, 130, "sarang lebah", 9, W.ungu)),
    ),
    k(
      SUARA_R2,
      hapus(0, "e6"),
      sorotkan("menghitung", "jm"),
      tambah("menghitung", garisSisi("jm", ptsR, 0), angkaSisi("jm", ptsR, 0, 10), garisSisi("jm", ptsR, 1), angkaSisi("jm", ptsR, 1, 10)),
      tambah("sisi", garisSisi("jm", ptsR, 2), angkaSisi("jm", ptsR, 2, 10), garisSisi("jm", ptsR, 3), angkaSisi("jm", ptsR, 3, 10)),
      tambah("dinding", garisSisi("jm", ptsR, 4), angkaSisi("jm", ptsR, 4, 10)),
      tambah("enam", garisSisi("jm", ptsR, 5), angkaSisi("jm", ptsR, 5, 10)),
      tambah("mencatatnya.", emo("ct", 60, 172, E.catat, 20), emo("ok", 100, 60, E.benar, 18)),
    ),
    k(
      SUARA_R3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?")),
      tambah("Cocok", emo("ok", 236, 84, E.benar, 28)),
      tambah("bentuk-bentuk", bangun("m3", relSegitiga(30, 28), 90, 66, WARNA_BENTUK[3]), bangun("m4", relSegiempat(26, 26), 150, 66, WARNA_BENTUK[4]), bangun("m6", relBeraturan(6, 16), 210, 66, WARNA_BENTUK[6])),
      tambah("sekitar", ...kartu("cc", 70, 120, 160, 26, W.hijauMuda, ["kenal bentuk di sekitar"], 9.6)),
      ubah("kita.", { id: "cc-k", sorot: true }),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?")),
      tambah("Kurang", emo("xs", 236, 84, E.salah, 28)),
      tambah("butuh", ...kartu("kc", 50, 50, 200, 26, W.merahMuda, ["butuh jawaban cepat"], 9.6)),
      tambah("cepat,", emo("jam", 80, 116, E.jam, 26)),
      tambah("benda", teks("tb", 190, 124, "tidak ada benda", 10, W.merah)),
      tambah("dekat", ...[0, 1].map((i) => emo(`sp${i}`, 170 + i * 40, 152, E.tanya, 18))),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_K1 = "Kita sudah melihat tiga cara. Mana yang pas? Itu tergantung tugasnya.";
const SUARA_K2 = "Ingin membuat bentuk sambil menghitung sisi, pakai Papan Paku. Ingin melihat dua ciri sekaligus, pakai Diagram Venn.";
const SUARA_K3 = "Ingin mengenal bentuk di sekitar kita, pakai Berburu Bentuk. Apa pun caranya, amati tepinya dulu.";
const SUARA_K4 = "Menurutmu, untuk membuat segi enam dari karet gelang, kamu pilih cara yang mana?";

const baris = (id: string, y: number, kiri: string, kanan: string) => [
  ...kartu(`${id}a`, 12, y, 130, 30, W.krem, [kiri], 8.6),
  teks(`${id}p`, 150, y + 20, "\u{27A1}\u{FE0F}", 12),
  ...kartu(`${id}b`, 160, y, 128, 30, W.langit, [kanan], 9.6),
];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Metode global: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Tiga Cara Tukang Ubin")),
      tambah("tiga", ...kartu("r0", 20, 46, 260, 28, W.langit, ["1. Geoboard"], 11), ...kartu("r1", 20, 84, 260, 28, W.pink, ["2. Venn Diagram"], 11), ...kartu("r2", 20, 122, 260, 28, W.hijauMuda, ["3. Shape Hunt"], 11)),
      tambah("tiga", teks("t3", 150, 176, "3 cara", 13, W.ungu)),
      ubah("pas?", { id: "t3", warna: W.merah }),
      tambah("tugasnya.", emo("qm", 262, 176, E.tanya, 20)),
    ),
    k(
      SUARA_K2,
      bersih(0),
      tambah(0, judul("Pilih Cara yang Pas")),
      tambah("membuat", ...baris("q0", 46, "buat bentuk, hitung sisi", "Papan Paku")),
      tambah("dua", ...baris("q1", 92, "2 ciri sekaligus", "Diagram Venn")),
      sorotkan("Paku.", "q0b-k"),
      sorotkan("Venn.", "q1b-k"),
    ),
    k(
      SUARA_K3,
      tambah("mengenal", ...baris("q2", 138, "bentuk di sekitar", "Berburu Bentuk")),
      sorotkan("Berburu", "q2b-k"),
      tambah("tepinya", emo("mt", 150, 190, E.mata, 18)),
      tambah("tepinya", teks("tp", 150, 182, "amati tepinya", 9, W.merah)),
    ),
    k(
      SUARA_K4,
      bersih(0),
      tambah(0, judul("Menurutmu?")),
      tambah("segi", bangun("hx", relBeraturan(6, 30), 100, 92, WT.ubinKuning), teks("e6", 100, 140, "6 sisi", 11, W.merah)),
      sorotkan("karet", "hx"),
      tambah("karet", teks("kg", 100, 168, "karet gelang", 9, W.ungu)),
      tambah("pilih", emo("qq", 220, 84, E.tanya, 40)),
      tambah("cara", ...kartu("o0", 176, 120, 112, 20, W.langit, ["Papan Paku"], 8.6), ...kartu("o1", 176, 144, 112, 20, W.pink, ["Diagram Venn"], 8.6), ...kartu("o2", 176, 168, 112, 20, W.hijauMuda, ["Berburu Bentuk"], 8.6)),
    ),
  ],
};
