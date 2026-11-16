import type { AdeganStory } from "./logika-story";
import { W, bagan, bulat, emo, garis, judul, kartu, kalimat, kotak, panah, tabel, teks } from "./k3b2B-gambar";
import { hapus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k3b2B-bantu";

/* ------------------------------ 10. Cerita ayam mula-mula ------------------------------ */
const SUARA_A1 = "Hari ini Halim menjual empat puluh lima ekor ayam di pasar.";
const SUARA_A2 = "Ayam yang tersisa di kandang ada dua puluh tujuh ekor.";
const SUARA_A3 = "Banyak ayam mula-mula itu belum kita ketahui.";
const SUARA_A4 = "Dapatkah kita menentukan banyak ayam mula-mula itu?";

export const ADEGAN_AYAM_AWAL: AdeganStory = {
  id: "ayam-awal",
  judul: "Ayam mula-mula",
  sumber: "Materi: ayam mula-mula",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Hari ini"), emo("eh", 40, 56, "\u{1F466}", 28), teks("nh", 40, 70, "Halim", 9.6), kotak("kd", 86, 34, 108, 74, W.krem, W.coklat, { rx: 8, tebal: 2 }), emo("a1", 112, 66, "\u{1F414}", 24), emo("a2", 168, 66, "\u{1F414}", 24)),
      tambah("menjual", panah("pj", 200, 70, 36, 0, W.biru, 2.5), emo("ps", 262, 80, "\u{1F6D2}", 34)),
      tambah(idx(SUARA_A1, "empat"), teks("tj", 217, 62, "45", 16, W.merah)),
    ),
    k(SUARA_A2, tambah("tersisa", ...kartu("sr", 80, 148, 120, 28, W.hijauMuda, ["sisa: 27 ekor"], 11)), sorotkan("dua", "sr-k")),
    k(SUARA_A3, redamkan(0, "sr-k"), tambah("mula-mula", teks("jm", 140, 126, "? ekor", 14, W.merah)), sorotkan("belum", "kd")),
    k(SUARA_A4, redamkan(0, "kd"), tambah("Dapatkah", emo("tn", 150, 198, "❓", 24))),
  ],
};

/* ------------------------------ 11. Kalimat untuk ayam mula-mula ------------------------------ */
const TW = tabel("tw", ["Mula-mula", "Dijual", "Sisa"], [["?", "45", "27"]], { y: 32 });
const SUARA_B1 = "Kita buat tabel. Ayam mula-mula belum diketahui, yang dijual empat puluh lima ekor, dan sisanya dua puluh tujuh ekor.";
const SUARA_B2 = "Kalimat Matematikanya adalah titik-titik kurang empat puluh lima sama dengan dua puluh tujuh.";
const SUARA_B3 = "Kita ingat bahwa tujuh puluh dua kurang empat puluh lima sama dengan dua puluh tujuh.";
const SUARA_B4 = "Bagaimana cara mendapatkan bilangan tujuh puluh dua itu?";

export const ADEGAN_KALIMAT_AWAL: AdeganStory = {
  id: "kalimat-awal",
  judul: "Kalimat untuk ayam mula-mula",
  sumber: "Materi: kalimat ayam mula-mula",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Tabel ayam")),
      tambah("Ayam", ...TW.kepala.slice(0, 2), ...TW.sel(0, 0)),
      tambah("dijual", ...TW.kepala.slice(2, 4), ...TW.sel(0, 1)),
      tambah("sisanya", ...TW.kepala.slice(4, 6), ...TW.sel(0, 2)),
    ),
    k(SUARA_B2, tambah("titik-titik", kalimat("k1", 116, "… − 45 = 27", 30))),
    k(SUARA_B3, tambah("ingat", kalimat("k2", 158, "72 − 45 = 27", 24, W.hijau)), sorotkan("tujuh", "k2")),
    k(SUARA_B4, redamkan(0, "k2"), tambah("Bagaimana", emo("tn", 150, 196, "❓", 26))),
  ],
};

/* ------------------------------ 12. Bagan ayam mula-mula ------------------------------ */
const BW = bagan("bw", { y: 36, atas: "?", a: "45", b: "27", fa: 45 / 72 });
const SUARA_C1 = "Ini bagannya. Batang atas adalah ayam mula-mula, dan jumlahnya belum diketahui.";
const SUARA_C2 = "Batang kiri adalah ayam yang dijual, yaitu empat puluh lima.";
const SUARA_C3 = "Batang kanan adalah sisa ayam, yaitu dua puluh tujuh.";
const SUARA_C4 = "Untuk mencari ayam mula-mula, tambahkan ayam yang dijual dan sisa ayam.";
const SUARA_C5 = "Kita hitung empat puluh lima tambah dua puluh tujuh sama dengan tujuh puluh dua.";
const SUARA_C6 = "Jadi, ayam mula-mula ada tujuh puluh dua ekor. Kita periksa, tujuh puluh dua kurang empat puluh lima sama dengan dua puluh tujuh.";

export const ADEGAN_BAGAN_AWAL: AdeganStory = {
  id: "bagan-awal",
  judul: "Bagan ayam mula-mula",
  sumber: "Materi: bagan ayam mula-mula",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_C1, tambah(0, judul("Bagan ayam mula-mula")), tambah("Batang", ...BW.atas), tambah("Ini", emo("ay", 40, 152, "\u{1F414}", 30))),
    k(SUARA_C2, tambah("kiri", ...BW.a), sorotkan("dijual,", "bw_A")),
    k(SUARA_C3, redamkan(0, "bw_A"), tambah("kanan", ...BW.b), sorotkan("sisa", "bw_B")),
    k(SUARA_C4, redamkan(0, "bw_B"), sorotkan("mula-mula,", "bw_T"), tambah("tambahkan", ...kartu("rm", 80, 128, 180, 22, W.emas, ["dijual + sisa"], 11))),
    k(SUARA_C5, redamkan(0, "bw_T"), tambah("hitung", kalimat("hit", 172, "45 + 27 = 72", 22, W.merah)), ubah(idx(SUARA_C5, "tujuh", 2), { id: "bw_Tn", isi: "72", warna: W.biru })),
    k(SUARA_C6, tambah("periksa,", kalimat("per", 198, "72 − 45 = 27", 14), emo("ok", 262, 198, "✅", 20))),
  ],
};

/* ------------------------------ 13. Dua cara, dua arah ------------------------------ */
const SUARA_D1 = "Sekarang kita rangkum. Ada dua cara mencari bilangan yang belum diketahui.";
const SUARA_D2 = "Bila titik-titik berada di tengah, kurangi bilangan awal dengan sisa.";
const SUARA_D3 = "Bila titik-titik berada di depan, tambahkan bilangan yang dikurangkan dengan sisa.";
const SUARA_D4 = "Kedua cara ini saling berkebalikan. Pengurangan dan penjumlahan saling membantu.";

export const ADEGAN_DUA_ARAH: AdeganStory = {
  id: "dua-arah",
  judul: "Dua cara mencari",
  sumber: "Materi: dua cara mencari",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_D1, tambah(0, judul("Rangkuman"), emo("lp", 150, 100, "\u{1F50D}", 52))),
    k(SUARA_D2, hapus(0, "lp"), tambah("tengah,", ...kartu("c1", 14, 30, 272, 56, W.hijauMuda, ["80 − … = 45", "80 − 45 = 35"], 14))),
    k(SUARA_D3, tambah("depan,", ...kartu("c2", 14, 94, 272, 56, W.langit, ["… − 45 = 27", "45 + 27 = 72"], 14))),
    k(
      SUARA_D4,
      tambah("berkebalikan.", bulat("bm", 100, 178, 15, W.pink), teks("tm", 100, 184, "−", 18, W.merah), bulat("bp", 200, 178, 15, W.pink), teks("tp", 200, 184, "+", 18, W.merah), garis("gj", 118, 178, 64, 0, W.biru, 2.5)),
      sorotkan("saling", "bm", "bp"),
    ),
  ],
};
