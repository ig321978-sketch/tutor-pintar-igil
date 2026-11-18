import type { AdeganStory } from "./logika-story";
import { E, M, W, anak, bintang, emo, judul, kartu, kotak, kotakManik, kurung, lantai, lengkung, manik, selKosong, sel, teks, tokoh } from "./k2b4B-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k2b4B-bantu";

/*
 * Video metode global Kelas 2 Bab 4 Sub-Bab B "Pita Hias Bu Mira": Pattern Strips (Pita Pola), Letter Coding (Kode Huruf), Rhythm Clap (Tepuk Irama).
 * Naskah suara dari naskah/story-naskah-k2b4b.md. Bagian ini: pembuka (pita tua di dasar kotak manik), Pita Pola dan terapannya.
 */
export const NAMA_METODE = ["Pattern Strips", "Letter Coding", "Rhythm Clap"] as const;
export const NAMA_METODE_ID = ["Pita Pola", "Kode Huruf", "Tepuk Irama"] as const;

/* ------------------------------ Pembuka: pita tua ------------------------------ */
const SUARA_O1 = "Di dasar kotak manik, Chacha menemukan tiga potongan pita tua yang bergambar.";
const SUARA_O2 = "Bu Mira tertawa. Itu cara pengrajin dulu memeriksa pola sebelum merangkai!";
const SUARA_O3 = "Tiga cara itu: Pattern Strips, Letter Coding, dan Rhythm Clap.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Pita Pola, Kode Huruf, dan Tepuk Irama.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Pita tua di dasar kotak manik",
  sumber: "Metode global: tiga cara memeriksa pola",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Pita Tua"), lantai("lt", 150)),
      tambah(idx(SUARA_O1, "kotak"), ...kotakManik("km", 22, 100, 70, 44)),
      tambah(idx(SUARA_O1, "manik,"), manik("mi0", 40, 110, 5, M.merah), manik("mi1", 56, 112, 5, M.biru), manik("mi2", 72, 110, 5, M.kuning)),
      tambah(idx(SUARA_O1, "Chacha"), ...tokoh("ch", 262, 164, "Chacha")),
      tambah(idx(SUARA_O1, "tiga"), teks("t3", 172, 42, "3 pita", 12, W.merah)),
      tambah(idx(SUARA_O1, "potongan"), kotak("ps1", 112, 54, 120, 22, "#FFF7ED", "#92400E", { rx: 3, tebal: 1.6 }), sel("q0", 130, 65, 14, M.merah, { z: 3 }), sel("q1", 150, 65, 14, M.biru, { z: 3 }), sel("q2", 170, 65, 14, M.merah, { z: 3 }), sel("q3", 190, 65, 14, M.biru, { z: 3 })),
      tambah(idx(SUARA_O1, "tua"), kotak("ps2", 112, 82, 120, 22, "#FFF7ED", "#92400E", { rx: 3, tebal: 1.6 }), teks("qa", 172, 98, "A B A B", 11, W.merah, { z: 3 })),
      tambah(idx(SUARA_O1, "bergambar."), kotak("ps3", 112, 110, 120, 22, "#FFF7ED", "#92400E", { rx: 3, tebal: 1.6 }), emo("h0", 148, 128, E.tepuk, 16, { z: 3 }), emo("h1", 196, 126, E.tepuk, 12, { z: 3 })),
    ),
    k(
      SUARA_O2,
      tambah(idx(SUARA_O2, "Bu"), ...tokoh("bm", 190, 164, "Bu Mira")),
      tambah(idx(SUARA_O2, "tertawa."), emo("tw", 216, 140, E.tertawa, 18)),
      tambah(idx(SUARA_O2, "memeriksa"), emo("kc", 246, 70, E.kaca, 22)),
      sorotkan(idx(SUARA_O2, "pola"), "ps1"),
      tambah(idx(SUARA_O2, "merangkai!"), emo("kl", 100, 76, E.kilau, 18)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(idx(SUARA_O3, "Tiga"), teks("jm", 150, 36, "3 cara", 13, W.merah)),
      tambah(idx(SUARA_O3, "Pattern"), ...kartu("m0", 14, 56, 140, 28, "#BBF7D0", ["1. Pattern Strips"], 9.6)),
      tambah(idx(SUARA_O3, "Letter"), ...kartu("m1", 14, 96, 140, 28, "#FDE68A", ["2. Letter Coding"], 9.6)),
      tambah(idx(SUARA_O3, "Rhythm"), ...kartu("m2", 14, 136, 140, 28, "#DDD6FE", ["3. Rhythm Clap"], 9.6)),
    ),
    k(
      SUARA_O4,
      tambah(idx(SUARA_O4, "Indonesia:"), teks("bi", 224, 42, "Bahasa Indonesia", 8.6, W.ungu)),
      tambah(idx(SUARA_O4, "Pita"), ...kartu("n0", 160, 56, 130, 28, "#BBF7D0", ["Pita Pola"], 9.6)),
      tambah(idx(SUARA_O4, "Kode"), ...kartu("n1", 160, 96, 130, 28, "#FDE68A", ["Kode Huruf"], 9.6)),
      tambah(idx(SUARA_O4, "Tepuk"), ...kartu("n2", 160, 136, 130, 28, "#DDD6FE", ["Tepuk Irama"], 9.6)),
    ),
  ],
};

/* ------------------------------ Pita Pola: konsep ------------------------------ */
const SUARA_P1 = "Cara pertama, Pattern Strips, atau Pita Pola.";
const SUARA_P2 = "Potong pita menjadi kotak-kotak, lalu isi tiap kotak dengan warna atau bentuk.";
const SUARA_P3 = "Satuan pola diisi lebih dulu, lalu diulang kotak demi kotak sampai ujung pita.";
const SUARA_P4 = "Kalau ada kotak yang tidak cocok, kita langsung melihatnya karena pita jadi tidak teratur.";
const PX = (i: number) => 40 + 32 * i;
const barPita = () => kotak("bar", 22, 100, 260, 36, "#FFFFFF", "#7C3AED", { rx: 6, tebal: 2, z: 0 });
const kosong8 = () => Array.from({ length: 8 }, (_, i) => selKosong(`s${i}`, PX(i), 118, 28));
const WARNA_P = [M.merah, M.biru, M.merah, M.biru, M.merah, M.biru, M.merah, M.biru];

export const ADEGAN_LUAR_PITA: AdeganStory = {
  id: "luar-pita",
  judul: "Pattern Strips: Pita Pola",
  sumber: "Metode global: Pita Pola",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_P1,
      bersih(0),
      tambah(0, judul("Pita Pola"), teks("no", 150, 64, "1", 26, W.merah)),
      tambah(idx(SUARA_P1, "Strips,"), teks("pn", 150, 90, "Pattern Strips", 11, W.biru)),
      tambah(idx(SUARA_P1, "Pita"), barPita()),
      sorotkan(idx(SUARA_P1, "Pola."), "bar"),
    ),
    k(
      SUARA_P2,
      tambah(idx(SUARA_P2, "Potong"), emo("gt", 30, 94, E.gunting, 18)),
      tambah(idx(SUARA_P2, "kotak-kotak,"), ...kosong8()),
      ubah(idx(SUARA_P2, "warna"), { id: "s0", warna: M.merah, garis: W.biru, putus: false }, { id: "s1", warna: M.biru, garis: W.biru, putus: false }),
      tambah(idx(SUARA_P2, "bentuk."), bintang("bt", PX(2), 118, 10, M.kuning, { z: 4 }), manik("bl", PX(3), 118, 8, M.hijau, { z: 4 })),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Isi Satuan Dulu"), barPita(), ...Array.from({ length: 8 }, (_, i) => (i < 2 ? sel(`s${i}`, PX(i), 118, 28, WARNA_P[i]) : selKosong(`s${i}`, PX(i), 118, 28)))),
      tambah(idx(SUARA_P3, "Satuan"), kurung("kr", PX(0) - 14, 138, PX(1) - PX(0) + 28)),
      ubah(idx(SUARA_P3, "diulang"), { id: "s2", warna: M.merah, garis: W.biru, putus: false }, { id: "s3", warna: M.biru, garis: W.biru, putus: false }),
      tambah(idx(SUARA_P3, "diulang"), lengkung("lg", PX(0) - 14, 94, PX(2) - PX(0))),
      ubah(idx(SUARA_P3, "demi"), { id: "s4", warna: M.merah, garis: W.biru, putus: false }, { id: "s5", warna: M.biru, garis: W.biru, putus: false }),
      ubah(idx(SUARA_P3, "ujung"), { id: "s6", warna: M.merah, garis: W.biru, putus: false }, { id: "s7", warna: M.biru, garis: W.biru, putus: false }),
    ),
    k(
      SUARA_P4,
      sorotkan(idx(SUARA_P4, "kotak"), "s5"),
      ubah(idx(SUARA_P4, "cocok,"), { id: "s5", warna: M.hijau, sorot: false }),
      tambah(idx(SUARA_P4, "cocok,"), emo("no", PX(5), 96, E.salah, 18)),
      tambah(idx(SUARA_P4, "langsung"), emo("kc", PX(6) + 16, 90, E.kaca, 20)),
      tambah(idx(SUARA_P4, "teratur."), ...kartu("tt", 80, 152, 140, 24, W.merahMuda, ["pita tidak teratur"], 9.6)),
    ),
  ],
};

/* ------------------------------ Pita Pola: terapan ------------------------------ */
const SUARA_T1 = "Nia mengisi pita dengan merah, biru, merah, biru, dan sengaja membiarkan tiga kotak kosong.";
const SUARA_T2 = "Chacha mengisi kotak kosong dengan merah, biru, merah, dan polanya tersambung.";
const SUARA_T3 = "Cocok kalau kita ingin melihat dan melanjutkan pola warna atau bentuk.";
const SUARA_T4 = "Kurang cocok kalau polanya berupa gerakan atau suara, karena tidak bisa ditempel di pita.";
const TX = (i: number) => 40 + 36 * i;
const WARNA_T = [M.merah, M.biru, M.merah, M.biru, M.merah, M.biru, M.merah];
const isiSel = (id: string, warna: string) => ({ id, warna, garis: W.biru, putus: false });

export const ADEGAN_LUAR_PITA_TERAPAN: AdeganStory = {
  id: "luar-pita-terapan",
  judul: "Pita Pola dipakai Nia dan Chacha",
  sumber: "Metode global: Pita Pola dalam cerita",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      bersih(0),
      tambah(0, judul("Pita Nia")),
      tambah(idx(SUARA_T1, "Nia"), ...tokoh("ni", 40, 168, "Nia")),
      tambah(idx(SUARA_T1, "pita"), kotak("bar", 20, 86, 256, 40, "#FFFFFF", "#7C3AED", { rx: 6, tebal: 2, z: 0 })),
      tambah(idx(SUARA_T1, "merah,"), sel("e0", TX(0), 106, 30, WARNA_T[0])),
      tambah(idx(SUARA_T1, "biru,"), sel("e1", TX(1), 106, 30, WARNA_T[1])),
      tambah(idx(SUARA_T1, "merah,", 2), sel("e2", TX(2), 106, 30, WARNA_T[2])),
      tambah(idx(SUARA_T1, "biru,", 2), sel("e3", TX(3), 106, 30, WARNA_T[3])),
      tambah(idx(SUARA_T1, "tiga"), teks("n3", 216, 156, "3 kotak kosong", 9, W.merah)),
      tambah(idx(SUARA_T1, "kosong."), selKosong("e4", TX(4), 106, 30), selKosong("e5", TX(5), 106, 30), selKosong("e6", TX(6), 106, 30)),
    ),
    k(
      SUARA_T2,
      hapus(0, "n3"),
      tambah(idx(SUARA_T2, "Chacha"), ...tokoh("ch", 262, 168, "Chacha")),
      ubah(idx(SUARA_T2, "merah,"), isiSel("e4", WARNA_T[4])),
      ubah(idx(SUARA_T2, "biru,"), isiSel("e5", WARNA_T[5])),
      ubah(idx(SUARA_T2, "merah,", 2), isiSel("e6", WARNA_T[6])),
      tambah(idx(SUARA_T2, "tersambung."), emo("ok", 148, 76, E.benar, 20)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, ...kartu("cc", 50, 34, 200, 28, W.hijauMuda, ["Cocok"], 12), emo("ok", 226, 54, E.benar, 18)),
      tambah(idx(SUARA_T3, "melihat"), emo("ey", 64, 112, "\u{1F440}", 30)),
      tambah(idx(SUARA_T3, "warna"), sel("w0", 134, 100, 24, M.merah), sel("w1", 164, 100, 24, M.biru)),
      tambah(idx(SUARA_T3, "bentuk."), bintang("bt", 234, 100, 16, M.kuning)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, ...kartu("kc", 50, 34, 200, 28, W.merahMuda, ["Kurang cocok"], 12), emo("no", 226, 54, E.salah, 18)),
      tambah(idx(SUARA_T4, "gerakan"), ...anak("an", 70, 118, "#F472B6", true)),
      tambah(idx(SUARA_T4, "suara,"), emo("tp", 160, 114, E.tepuk, 28)),
      tambah(idx(SUARA_T4, "ditempel"), kotak("bar", 30, 146, 240, 26, "#FFFFFF", "#7C3AED", { rx: 6, tebal: 2, z: 0 })),
      tambah(idx(SUARA_T4, "pita."), emo("x2", 150, 166, E.salah, 22, { z: 4 })),
    ),
  ],
};
