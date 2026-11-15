import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, emo, garisBil, judul, kartu, panah, penanda, teks, type GeoG } from "./k2b1C-gambar";
import { bersih, hapus, idf, idx, k, pilihKata, redamkan, sorotkan, tambah, ubah } from "./k2b1C-bantu";

export const NAMA_METODE_ID = ["Garis Bilangan", "Pasangkan Balok", "Mulut Buaya"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);
const ex = (isi: string, id = "ex", x = 150, y = 186, u = 16): Obj => teks(id, x, y, isi, u, W.merah);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara memakai cara lain untuk membandingkan bilangan. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Cara pertama bernama Garis Bilangan. Cara kedua bernama Pasangkan Balok. Cara ketiga bernama Mulut Buaya.";
const SUARA_O3 = "Semua cara ini menjawab satu pertanyaan. Bilangan mana yang lebih besar, dan bilangan mana yang lebih kecil?";
const SUARA_O4 = "Kita memakai gambar di layar. Kamu cukup mengamati dengan teliti, lalu memilih jawabannya.";
const SUARA_O5 = "Semua contoh memakai bilangan sampai lima puluh. Siap? Ayo kita mulai dengan cara pertama.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk membandingkan bilangan",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)), tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["tiga cara lain"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      tambah(idx(SUARA_O2, "Garis"), ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah(idx(SUARA_O2, "Pasangkan"), ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah(idx(SUARA_O2, "Mulut"), ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah("satu", emo("i1", 60, 84, "⚖", 34), emo("i2", 150, 84, "❓", 34), emo("i3", 240, 84, "\u{1F440}", 34)),
      tambah("Bilangan", ...kartu("iq", 20, 112, 260, 52, W.emas, ["bilangan mana yang lebih besar,", "dan mana yang lebih kecil?"], 10)),
    ),
    k(SUARA_O4, bersih(0), tambah(0, judul("Lihat dan pilih")), tambah("gambar", emo("la", 150, 100, "\u{1F4F1}", 50)), tambah("memilih", ...kartu("pl", 40, 130, 220, 34, W.hijauMuda, ["amati, lalu pilih jawabannya"], 10))),
    k(SUARA_O5, bersih(0), tambah(0, judul("Ayo mulai!")), tambah("lima", ...kartu("sb", 40, 60, 220, 40, W.krem, ["bilangan sampai 50"], 12)), tambah("Siap?", emo("ow", 150, 150, OWL, 40))),
  ],
};

/* ------------------------------ 2. Garis bilangan: konsep ------------------------------ */
export const G_LUAR: GeoG = { x0: 18, y: 100, dx: 26, dari: 20, sampai: 30 };
const SUARA_L1 = "Cara pertama, Garis Bilangan. Bilangan ditaruh berurutan dari kiri ke kanan.";
const SUARA_L2 = "Makin ke kanan, bilangannya makin besar. Makin ke kiri, bilangannya makin kecil.";
const SUARA_L3 = "Kita bandingkan dua puluh tiga dan dua puluh delapan. Kita tandai keduanya di garis.";
const SUARA_L4 = "Dua puluh delapan ada di sebelah kanan dua puluh tiga.";
const SUARA_L5 = "Jadi dua puluh delapan lebih besar daripada dua puluh tiga. Dan dua puluh tiga lebih kecil daripada dua puluh delapan.";

export const ADEGAN_LUAR_GARIS: AdeganStory = {
  id: "luar-garis",
  judul: "Garis Bilangan: yang di kanan lebih besar",
  sumber: "Metode luar: Garis Bilangan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_L1, tambah(0, ...kepala(0)), tambah(idx(SUARA_L1, "ditaruh"), ...garisBil("l", G_LUAR))),
    k(
      SUARA_L2,
      tambah(idx(SUARA_L2, "kanan,"), panah("arb", 168, 140, 84, 0, W.hijau, 2.4)),
      tambah(idx(SUARA_L2, "besar"), teks("bsr", 212, 158, "makin besar", 9.4, W.hijau)),
      tambah(idx(SUARA_L2, "kiri,"), panah("ark", 132, 140, -84, 0, W.merah, 2.4)),
      tambah(idx(SUARA_L2, "kecil"), teks("kcl", 88, 158, "makin kecil", 9.4, W.merah)),
    ),
    k(SUARA_L3, tambah(idx(SUARA_L3, "tiga"), penanda("l", G_LUAR, 23, W.merah)), tambah(idx(SUARA_L3, "delapan"), penanda("l", G_LUAR, 28, W.ungu))),
    k(SUARA_L4, sorotkan(idx(SUARA_L4, "kanan"), "gbl-m28"), sorotkan(idx(SUARA_L4, "tiga"), "gbl-m23")),
    k(SUARA_L5, redamkan(0, "gbl-m28", "gbl-m23"), tambah(idx(SUARA_L5, "lebih"), ex("28 > 23")), ubah(idx(SUARA_L5, "Dan"), { id: "ex", isi: "23 < 28" })),
  ],
};

/* ------------------------------ 3. Garis bilangan: penerapan ------------------------------ */
export const G_TERAPAN: GeoG = { x0: 18, y: 96, dx: 26, dari: 36, sampai: 46 };
const SUARA_M1 = "Sekarang ayo coba. Bilangan mana yang lebih kecil, empat puluh satu atau tiga puluh delapan? Pilih jawabannya.";
const SUARA_M2 = "Tiga puluh delapan ada di sebelah kiri empat puluh satu.";
const SUARA_M3 = "Yang ada di kiri lebih kecil. Jadi tiga puluh delapan lebih kecil daripada empat puluh satu.";
const SUARA_M4 = "Garis bilangan juga bisa dipakai untuk mengurutkan. Tandai empat puluh empat, tiga puluh sembilan, dan empat puluh dua.";
const SUARA_M5 = "Urutan dari yang paling kecil adalah tiga puluh sembilan, empat puluh dua, lalu empat puluh empat.";

export const ADEGAN_LUAR_GARIS_TERAPAN: AdeganStory = {
  id: "luar-garis-terapan",
  judul: "Garis Bilangan: membandingkan dan mengurutkan",
  sumber: "Metode luar: Garis Bilangan, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, ...kepala(0), ...garisBil("t", G_TERAPAN)),
      tambah(idf(SUARA_M1, "empat puluh satu"), penanda("t", G_TERAPAN, 41, W.merah)),
      tambah(idf(SUARA_M1, "tiga puluh delapan"), penanda("t", G_TERAPAN, 38, W.ungu)),
      tambah("Pilih", ...pilihKata(138, ["41", "38", "Sama"], 14)),
    ),
    k(SUARA_M2, sorotkan(idx(SUARA_M2, "kiri"), "gbt-m38"), sorotkan(idx(SUARA_M2, "satu"), "gbt-m41")),
    k(SUARA_M3, redamkan(0, "gbt-m41"), sorotkan(idx(SUARA_M3, "Jadi"), "c2-k", "c2-t"), tambah(idx(SUARA_M3, "Jadi"), ex("38 < 41"))),
    k(
      SUARA_M4,
      hapus(idx(SUARA_M4, "mengurutkan"), "gbt-m41", "gbt-m38", "c1-k", "c1-t", "c2-k", "c2-t", "c3-k", "c3-t", "ex"),
      tambah(idf(SUARA_M4, "empat puluh empat"), penanda("t", G_TERAPAN, 44, W.merah)),
      tambah(idf(SUARA_M4, "tiga puluh sembilan"), penanda("t", G_TERAPAN, 39, W.ungu)),
      tambah(idf(SUARA_M4, "empat puluh dua"), penanda("t", G_TERAPAN, 42, W.hijau)),
    ),
    k(
      SUARA_M5,
      sorotkan(idf(SUARA_M5, "tiga puluh sembilan"), "gbt-m39"),
      redamkan(idf(SUARA_M5, "empat puluh dua"), "gbt-m39"),
      sorotkan(idf(SUARA_M5, "empat puluh dua"), "gbt-m42"),
      redamkan(idf(SUARA_M5, "lalu"), "gbt-m42"),
      sorotkan(idf(SUARA_M5, "lalu"), "gbt-m44"),
      tambah(idf(SUARA_M5, "lalu"), ex("39 < 42 < 44")),
    ),
  ],
};
