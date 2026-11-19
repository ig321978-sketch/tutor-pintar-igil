import type { AdeganStory } from "./logika-story";
import { E, W, bulat, emo, ember, garis, isiSel, judul, kartu, laut, panah, papanSusun, pasir, teks, tokoh } from "./k4b1f-gambar";
import { hapus, k, sorotkan, tambah, ubah } from "./k4b1f-bantu";

/*
 * Cerita orisinal IGIL "Papan Sisa Pak Usman" (Kelas 4 Bab 1 Sub-Bab F), cerita Penginapan Pulau Karang Indah.
 * Naskah suara dari naskah/story-naskah-k4b1f.md. Bagian ini: periksa dengan penjumlahan, mencuci sandal, penutup (jembatan ke Sub-Bab G).
 */
const PX = 76;
const PY = 44;

/* ------------------------------ 7. Periksa dengan penjumlahan ------------------------------ */
const SUARA_P1 = "Laras mengajak memeriksa hasil dengan penjumlahan.";
const SUARA_P2 = "Tiga ratus tiga puluh tujuh ditambah dua ratus tujuh puluh lima sama dengan enam ratus dua belas.";
const SUARA_P3 = "Hasilnya sama dengan jumlah awal, jadi pengurangannya benar.";

export const ADEGAN_PERIKSA: AdeganStory = {
  id: "periksa",
  judul: "Periksa dengan penjumlahan",
  sumber: "Materi: periksa dengan tambah",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Periksa Hasil"), ...tokoh("la", 40, 184, "Laras"), ...kartu("kh", 70, 50, 70, 30, "#DCFCE7", ["hasil kurang"], 8.4)),
      tambah("memeriksa", emo("ma", 72, 166, E.mata, 16)),
      tambah("dengan", teks("pl", 160, 72, "+", 30, W.merah)),
      tambah("penjumlahan.", ...kartu("kp", 176, 50, 70, 30, "#FECACA", ["pengurang"], 8.4)),
    ),
    k(
      SUARA_P2,
      hapus(0, "kh-k", "kh-t0", "kp-k", "kp-t0", "pl"),
      tambah(0, ...papanSusun("ps", PX, PY, ["", "", ""], ["", "", ""])),
      ubah("ditambah", { id: "ps-mn", isi: "+", warna: W.merah }),
      tambah("Tiga", isiSel("ps", PX, PY, 0, 0, "3"), isiSel("ps", PX, PY, 0, 1, "3"), isiSel("ps", PX, PY, 0, 2, "7"), teks("n1", 254, 66, "337", 16, W.biru)),
      tambah("dua", isiSel("ps", PX, PY, 1, 0, "2"), isiSel("ps", PX, PY, 1, 1, "7"), isiSel("ps", PX, PY, 1, 2, "5"), teks("n2", 254, 94, "275", 16, W.biru)),
      tambah("sama", teks("s1", 142, 40, "1", 9, W.merah), teks("s2", 98, 40, "1", 9, W.merah)),
      tambah("enam", isiSel("ps", PX, PY, 2, 0, "6", 13, W.hijau), isiSel("ps", PX, PY, 2, 1, "1", 13, W.hijau), isiSel("ps", PX, PY, 2, 2, "2", 13, W.hijau)),
      tambah("belas.", teks("n3", 254, 124, "612", 16, W.hijau)),
    ),
    k(
      SUARA_P3,
      sorotkan("Hasilnya", "ps-kh0", "ps-kh1", "ps-kh2"),
      tambah("sama", emo("ok", 258, 146, E.benar, 20)),
      tambah("awal,", teks("aw", 254, 170, "awal: 612", 9, W.ungu)),
      tambah("benar.", emo("jp", 74, 150, E.jempol, 18)),
    ),
  ],
};

/* ------------------------------ 8. Mencuci sandal ------------------------------ */
const SUARA_M1 = "Satria mencuci sandal-sandal itu sambil bersenandung kecil.";
const SUARA_M2 = "Genta membantu menjemurnya di tali dekat dermaga.";
const SUARA_M3 = "Pak Usman meniup peluit tanda pekerjaan selesai.";
const BUSA = [
  bulat("bs1", 90, 120, 4, "#FFFFFF", "#93C5FD", { tebal: 1, z: 4 }),
  bulat("bs2", 112, 108, 5, "#FFFFFF", "#93C5FD", { tebal: 1, z: 4 }),
  bulat("bs3", 150, 118, 4, "#FFFFFF", "#93C5FD", { tebal: 1, z: 4 }),
  bulat("bs4", 176, 104, 5, "#FFFFFF", "#93C5FD", { tebal: 1, z: 4 }),
];
const JEMUR = Array.from({ length: 6 }, (_, i) => emo(`jm${i}`, 170 + i * 20, 62, E.sandal, 14));

export const ADEGAN_CUCI: AdeganStory = {
  id: "cuci",
  judul: "Mencuci dan menjemur sandal",
  sumber: "Materi: mencuci sandal",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Mencuci Sandal"), pasir("ps", 96), ...tokoh("sa", 40, 184, "Satria")),
      tambah("mencuci", ...ember("eb", 120, 140)),
      tambah("sandal-sandal", emo("s1", 124, 130, E.sandal, 12), emo("s2", 138, 128, E.sandal, 12), emo("s3", 152, 130, E.sandal, 12)),
      tambah("bersenandung", ...BUSA, emo("nt", 74, 160, "\u{1F3B5}", 16)),
    ),
    k(
      SUARA_M2,
      tambah("Genta", ...tokoh("ge", 224, 184, "Genta")),
      tambah("tali", garis("tl", 160, 44, 134, 0, W.coklat, 1.6, { z: 1 }), garis("t1", 160, 44, 0, 100, W.kayuTua, 3, { z: 0 }), garis("t2", 294, 44, 0, 100, W.kayuTua, 3, { z: 0 })),
      tambah("dermaga.", ...JEMUR),
    ),
    k(
      SUARA_M3,
      tambah("Pak", ...tokoh("pu", 270, 184, "Pak Usman")),
      tambah("peluit", teks("pl", 252, 122, "priiit!", 11, W.merah)),
      tambah("tanda", bulat("bs5", 200, 120, 4, "#FFFFFF", "#93C5FD", { tebal: 1, z: 4 }), bulat("bs6", 70, 132, 5, "#FFFFFF", "#93C5FD", { tebal: 1, z: 4 })),
      tambah("selesai.", emo("ok", 262, 96, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_N1 = "Malam sudah dekat, dan Bu Marni, pemilik perahu wisata, datang menyiapkan perahunya.";
const SUARA_N2 = "Besok banyak tamu akan berkeliling pulau naik perahu, dan penumpangnya harus dihitung.";
const SUARA_N3 = "Menurutmu, bagaimana cara menghitung penumpang beberapa perahu sekaligus? Terima kasih, Satria, Laras, Genta, Pak Hendro, dan Pak Usman!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Besok, perahu Bu Marni",
  sumber: "Materi: penutup dan jembatan",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Menjelang Malam"), ...laut("lt", 96, 70), pasir("ps", 150)),
      tambah("Marni,", ...tokoh("bm", 266, 184, "Bu Marni")),
      tambah("perahu", emo("p1", 40, 142, E.perahuKecil, 26), emo("p2", 80, 142, E.perahuKecil, 26)),
      tambah("perahunya.", emo("p3", 120, 142, E.perahuKecil, 26), emo("p4", 160, 142, E.perahuKecil, 26), emo("p5", 200, 142, E.perahuKecil, 26)),
    ),
    k(
      SUARA_N2,
      tambah("tamu", emo("kp", 60, 78, E.koper, 20)),
      tambah("pulau", emo("pl", 230, 78, "\u{1F3DD}", 26), emo("pk", 262, 78, E.pohon, 22)),
      tambah("naik", panah("ar", 84, 84, 120, 0, W.merah, 2.4)),
      tambah("dihitung.", teks("hg", 150, 50, "dihitung?", 12, W.merah)),
    ),
    k(
      SUARA_N3,
      hapus(0, "hg"),
      tambah("Menurutmu,", teks("tq", 150, 66, "?", 36, W.merah)),
      tambah("menghitung", teks("kl", 100, 76, "×", 28, W.ungu)),
      tambah("Satria,", ...tokoh("sa", 28, 184, "Satria"), ...tokoh("la", 66, 184, "Laras")),
      tambah("Genta,", ...tokoh("ge", 104, 184, "Genta")),
      tambah("Hendro,", ...tokoh("ph", 150, 184, "Pak Hendro")),
      tambah("Usman!", ...tokoh("pu", 200, 184, "Pak Usman"), emo("lb", 226, 150, E.lambai, 18)),
    ),
  ],
};

