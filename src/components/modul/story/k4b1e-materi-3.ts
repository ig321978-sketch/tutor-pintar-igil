import type { AdeganStory } from "./logika-story";
import { E, W, XK, angka, dermaga, emo, garis, garisTambah, judul, kertas, lantai, panah, sorotKolom, teks, tokoh, tumpukKoper } from "./k4b1e-gambar";
import { k, sorotkan, tambah, ubah } from "./k4b1e-bantu";

/*
 * Cerita orisinal IGIL "Meja Resepsi Bu Rina" (Kelas 4 Bab 1 Sub-Bab E), video materi.
 * Naskah suara dari naskah/story-naskah-k4b1e.md. Bagian ini: memeriksa dengan pembulatan, tiga bilangan, dan penutup (jembatan ke Sub-Bab F).
 */

/* ------------------------------ 7. Memeriksa hasil ------------------------------ */
const SUARA_C1 = "Laras mengajak memeriksa hasil dengan pembulatan, tiga ratus tujuh puluh delapan hampir empat ratus.";
const SUARA_C2 = "Dua ratus empat puluh lima ditambah empat ratus sama dengan enam ratus empat puluh lima.";
const SUARA_C3 = "Dikurangi dua puluh dua yang tadi ditambahkan, hasilnya tetap enam ratus dua puluh tiga.";

export const ADEGAN_PERIKSA: AdeganStory = {
  id: "periksa",
  judul: "Memeriksa dengan pembulatan",
  sumber: "Materi: memeriksa hasil",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Periksa dengan Pembulatan"), kertas(), ...tokoh("lr", 36, 184, "Laras")),
      tambah("memeriksa", emo("ps", 76, 150, E.pensil, 16)),
      tambah("delapan", teks("n378", 80, 84, "378", 26, W.biru, { z: 4 })),
      tambah("hampir", panah("ap", 112, 78, 70, 0, W.merah, 2, { z: 4 })),
      tambah("empat", teks("n400", 220, 84, "400", 26, W.hijauTua, { z: 4 }), teks("pl22", 150, 66, "+22", 11, W.merah, { z: 4 })),
    ),
    k(
      SUARA_C2,
      tambah(0, teks("sm", 150, 128, "245", 14, W.biru, { z: 4 })),
      tambah("empat@2", teks("sm", 150, 128, "245 + 400", 14, W.biru, { z: 4 })),
      tambah("enam", teks("sm", 150, 128, "245 + 400 = 645", 14, W.biru, { z: 4 })),
      sorotkan("ratus", "n400"),
    ),
    k(
      SUARA_C3,
      tambah("Dikurangi", teks("sk", 150, 152, "645 − 22", 14, W.merah, { z: 4 })),
      ubah("hasilnya", { id: "sk", isi: "645 − 22 = 623", warna: W.hijauTua }),
      tambah("tetap", emo("ok", 252, 150, E.benar, 18)),
    ),
  ],
};

/* ------------------------------ 8. Tiga bilangan ------------------------------ */
const A3 = 78;
const B3 = 102;
const C3 = 126;
const SUARA_T1 = "Bu Rina menambahkan tamu sore, yaitu seratus tiga belas orang.";
const SUARA_T2 = "Genta menjumlahkan tiga bilangan sekaligus, satuan dulu, lalu puluhan, lalu ratusan.";
const SUARA_T3 = "Jumlah seluruh tamu hari ini adalah tujuh ratus tiga puluh enam.";

export const ADEGAN_TIGA: AdeganStory = {
  id: "tiga",
  judul: "Tiga bilangan sekaligus",
  sumber: "Materi: tiga bilangan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Tamu Sore"), kertas(136), angka("a1", XK, A3, 245), angka("a2", XK, B3, 378), ...tokoh("br", 36, 184, "Bu Rina")),
      tambah("sore,", teks("ls", 58, C3, "sore", 10, W.biru, { z: 4 }), teks("pl", XK - 66, C3, "+", 16, W.biru, { z: 4 })),
      tambah("belas", angka("a3", XK, C3, 113, 22, W.ungu)),
    ),
    k(
      SUARA_T2,
      tambah("tiga", teks("n3", 240, 96, "3 bilangan", 10, W.biru, { z: 4 }), garisTambah("gt", XK - 64, XK + 4, C3 + 8)),
      tambah("satuan", ...tokoh("gn", 76, 184, "Genta"), sorotKolom("s0", XK, 0, 54, 104, W.satuan)),
      tambah("puluhan,", sorotKolom("s1", XK, 1, 54, 104, W.puluhan)),
      tambah("ratusan.", sorotKolom("s2", XK, 2, 54, 104, W.ratusan)),
    ),
    k(
      SUARA_T3,
      tambah("seluruh", teks("jl", 240, 130, "jumlah", 10, W.biru, { z: 4 })),
      tambah("tujuh", angka("h", XK, 154, 736, 22, W.hijauTua)),
      tambah("enam.", emo("ct", 104, 152, E.catat, 16), emo("ok", 252, 152, E.benar, 18)),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_N1 = "Satria meletakkan koper terakhir dengan lega, dan semua orang tertawa.";
const SUARA_N2 = "Sore itu sebagian tamu mulai pulang, dan Pak Usman di dermaga menunggu laporan sisa tamu.";
const SUARA_N3 = "Menurutmu, bagaimana cara menghitung tamu yang masih tinggal? Terima kasih, Satria, Laras, Genta, Pak Hendro, dan Bu Rina!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Koper rapi dan tamu pulang",
  sumber: "Materi: penutup",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Koper Rapi"), ...lantai("lt", 150), ...tokoh("sa", 24, 184, "Satria")),
      tambah("koper", ...tumpukKoper("kt", 226, 176, 9)),
      tambah("lega,", emo("lg", 24, 138, E.lega, 16)),
      tambah("semua", ...tokoh("lr", 58, 184, "Laras"), ...tokoh("gn", 92, 184, "Genta"), ...tokoh("ph", 134, 184, "Pak Hendro"), ...tokoh("br", 188, 184, "Bu Rina")),
      tambah("tertawa.", emo("tw1", 58, 138, E.tawa, 16), emo("tw2", 134, 138, E.tawa, 16)),
    ),
    k(
      SUARA_N2,
      tambah("Sore", garis("hr", 10, 100, 280, 0, "#FDBA74", 14, { z: -2, op: 0.5 })),
      tambah("sebagian", emo("ko", 200, 120, E.koper, 14)),
      tambah("Usman", ...dermaga("dm", 214, 96), ...tokoh("pu", 232, 90, "Pak Usman", 26)),
      tambah("laporan", teks("mn", 120, 90, "−", 34, W.merah, { z: 4 }), teks("tq", 160, 92, "?", 34, W.tanya, { z: 4 })),
    ),
    k(
      SUARA_N3,
      tambah("Menurutmu,", teks("tj", 140, 56, "berapa yang tinggal?", 11, W.biru, { z: 4 })),
      tambah("Satria,", emo("w1", 24, 140, E.lambai, 16)),
      tambah("Laras,", emo("w2", 58, 140, E.lambai, 16)),
      tambah("Genta,", emo("w3", 92, 140, E.lambai, 16)),
      tambah("Hendro,", emo("w4", 134, 140, E.lambai, 16)),
      tambah("Rina!", emo("w5", 188, 140, E.lambai, 16)),
    ),
  ],
};
