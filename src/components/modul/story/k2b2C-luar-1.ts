import type { AdeganStory, Obj } from "./logika-story";
import { E, W, bulatUtuh, emo, judul, kalimat, kartu, kotak, lantai, panah, teks, tokoh } from "./k2b2C-gambar";
import { bersih, hapus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k2b2C-bantu";

/* Video metode global Sub-Bab C "Pesanan Besar Pak Budi": pembuka dan Part-Part-Whole (Bagian dan Utuh) beserta terapannya. */

export const NAMA_METODE = ["Part-Part-Whole", "Act It Out", "Work Backwards"];
export const NAMA_METODE_ID = ["Bagian dan Utuh", "Peragakan Cerita", "Berpikir Mundur"];
export const WARNA_METODE = [W.hijauMuda, W.krem, W.pink];
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

const MINUS = "−";
const pilih = (semua: Obj[], ...akhiran: string[]): Obj[] => semua.filter((o) => akhiran.some((a) => o.id.endsWith(a)));

/* ------------------------------ 1. Pembuka ------------------------------ */
const SUARA_O1 = "Pak Budi datang membawa kotak kecil berisi tiga kartu bergambar dari koperasi sekolah tetangga.";
const SUARA_O2 = "Katanya, kartu itu dipakai para penjaga koperasi untuk memecahkan cerita hitungan yang membingungkan.";
const SUARA_O3 = "Tiga cara itu: Part-Part-Whole, Act It Out, dan Work Backwards.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Bagian dan Utuh, Peragakan Cerita, dan Berpikir Mundur.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga kartu dari koperasi tetangga",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("3 kartu bergambar"), lantai("lt", 150)),
      tambah(idx(SUARA_O1, "Pak"), ...tokoh("bd", 262, 172, "budi")),
      tambah(idx(SUARA_O1, "kotak"), kotak("kk", 100, 100, 100, 44, "#FDE68A", W.coklat, { rx: 4, tebal: 2.4 })),
      tambah(idx(SUARA_O1, "tiga"), ...[0, 1, 2].map((i) => kotak(`kr${i}`, 112 + 30 * i, 76, 26, 34, [W.hijauMuda, W.krem, W.pink][i], W.biru, { rx: 3, tebal: 1.6, z: -1 })), teks("n3", 150, 160, "3 kartu", 11, W.ungu)),
      tambah(idx(SUARA_O1, "tetangga"), emo("tk", 44, 112, E.toko, 40)),
    ),
    k(
      SUARA_O2,
      tambah(idx(SUARA_O2, "kartu"), emo("pk", 150, 66, E.kotakKartu, 22)),
      tambah(idx(SUARA_O2, "penjaga"), ...tokoh("sr", 44, 176, "sari")),
      tambah(idx(SUARA_O2, "cerita"), ...kartu("ct", 20, 30, 120, 20, W.krem, ["cerita hitungan"], 8.6)),
      tambah(idx(SUARA_O2, "membingungkan"), emo("bg", 44, 146, E.mikir, 22)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("3 metode global")),
      tambah(idx(SUARA_O3, "Tiga"), ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], ["1. Part-Part-Whole"], 11)),
      tambah(idx(SUARA_O3, "Act"), ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], ["2. Act It Out"], 11)),
      tambah(idx(SUARA_O3, "Work"), ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], ["3. Work Backwards"], 11)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      tambah(idx(SUARA_O4, "Bagian"), ...kartu("n0", 20, 40, 260, 38, WARNA_METODE[0], ["1. Bagian dan Utuh"], 11)),
      tambah(idx(SUARA_O4, "Peragakan"), ...kartu("n1", 20, 88, 260, 38, WARNA_METODE[1], ["2. Peragakan Cerita"], 11)),
      tambah(idx(SUARA_O4, "Berpikir"), ...kartu("n2", 20, 136, 260, 38, WARNA_METODE[2], ["3. Berpikir Mundur"], 11)),
    ),
  ],
};

/* ------------------------------ 2. Part-Part-Whole: konsep ------------------------------ */
const SUARA_B1 = "Cara pertama, Part-Part-Whole, atau Bagian dan Utuh.";
const SUARA_B2 = "Dua bagian digabung membentuk satu utuh.";
const SUARA_B3 = "Kalau yang dicari utuhnya, kita menjumlahkan. Kalau yang dicari salah satu bagian, kita mengurangi.";
const SUARA_B4 = "Tiga lingkaran membantu kita melihat mana bagian dan mana utuh.";

const BU = bulatUtuh("bu", 150, 76, "utuh", "bagian", "bagian", 54, 20, 52, 9);

export const ADEGAN_LUAR_BAGIAN: AdeganStory = {
  id: "luar-bagian",
  judul: "Part-Part-Whole: bagian dan utuh",
  sumber: "Metode global: Part-Part-Whole",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, ...kepala(0), lantai("lt", 176)),
      tambah(idx(SUARA_B1, "Part-Part-Whole"), ...pilih(BU, "-ga", "-gb")),
      tambah(idx(SUARA_B1, "Bagian"), ...pilih(BU, "-a", "-b", "-ta", "-tb").filter((o) => !o.id.endsWith("-ga") && !o.id.endsWith("-gb"))),
      tambah(idx(SUARA_B1, "Utuh"), ...pilih(BU, "-u", "-tu")),
    ),
    k(
      SUARA_B2,
      tambah(idx(SUARA_B2, "Dua"), teks("d2", 96, 170, "2 bagian", 10, W.ungu)),
      tambah(idx(SUARA_B2, "digabung"), panah("pa", 96, 112, 130, 96), panah("pb", 204, 112, 170, 96)),
      tambah(idx(SUARA_B2, "satu"), teks("d1", 204, 170, "1 utuh", 10, W.ungu)),
      sorotkan(idx(SUARA_B2, "utuh"), "bu-u"),
    ),
    k(
      SUARA_B3,
      hapus(0, "d2", "d1", "pa", "pb"),
      redamkan(0, "bu-u"),
      ubah(idx(SUARA_B3, "utuhnya"), { id: "bu-tu", isi: "?", warna: W.merah, u: 14 }),
      tambah(idx(SUARA_B3, "menjumlahkan"), ...kartu("kp", 12, 172, 134, 20, W.hijauMuda, ["cari utuh: tambah"], 8.6)),
      ubah(idx(SUARA_B3, "satu"), { id: "bu-tu", isi: "utuh", warna: W.biru, u: 9 }, { id: "bu-ta", isi: "?", warna: W.merah, u: 14 }),
      tambah(idx(SUARA_B3, "satu"), teks("s1", 150, 160, "1 bagian dicari", 10, W.ungu)),
      tambah(idx(SUARA_B3, "mengurangi"), ...kartu("kq", 154, 172, 134, 20, W.pink, ["cari bagian: kurang"], 8.6)),
    ),
    k(
      SUARA_B4,
      hapus(0, "kp-k", "kp-t0", "kq-k", "kq-t0", "s1"),
      ubah(0, { id: "bu-ta", isi: "bagian", warna: W.biru, u: 9 }),
      tambah(idx(SUARA_B4, "Tiga"), teks("t3", 150, 62, "3 lingkaran", 11, W.ungu)),
      sorotkan(idx(SUARA_B4, "bagian"), "bu-a", "bu-b"),
      redamkan(idx(SUARA_B4, "utuh"), "bu-a", "bu-b"),
      sorotkan(idx(SUARA_B4, "utuh"), "bu-u"),
    ),
  ],
};

/* ------------------------------ 3. Part-Part-Whole: terapan ------------------------------ */
const SUARA_T1 = "Nia menggambar tiga lingkaran. Utuhnya empat belas pensil, satu bagian lima pensil merah.";
const SUARA_T2 = "Bagian yang lain dicari dengan empat belas dikurangi lima, yaitu sembilan pensil biru.";
const SUARA_T3 = "Cocok kalau cerita membahas bagian-bagian dari satu kumpulan.";
const SUARA_T4 = "Kurang cocok kalau ceritanya membandingkan dua orang, karena tidak ada satu utuh.";

const TU = bulatUtuh("tu", 170, 72, "", "", "?", 50, 18, 50, 14);
const KT = kalimat("kt", 170, 176, ["14", MINUS, "5", "=", "9"], 16, 30);

export const ADEGAN_LUAR_BAGIAN_TERAPAN: AdeganStory = {
  id: "luar-bagian-terapan",
  judul: "Part-Part-Whole: terapan",
  sumber: "Metode global: Part-Part-Whole, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, ...kepala(0), lantai("lt", 158)),
      tambah(idx(SUARA_T1, "Nia"), ...tokoh("ni", 36, 176, "nia")),
      tambah(idx(SUARA_T1, "menggambar"), ...TU.filter((o) => !o.id.endsWith("-tu") && !o.id.endsWith("-ta") && !o.id.endsWith("-tb"))),
      tambah(idx(SUARA_T1, "tiga"), teks("t3", 66, 100, "3 lingkaran", 10, W.ungu)),
      tambah(idx(SUARA_T1, "belas"), teks("tu-tu", 170, 77, "14", 14, W.biru, { z: 1 })),
      tambah(idx(SUARA_T1, "satu"), teks("s1", 66, 120, "1 bagian", 10, W.ungu)),
      tambah(idx(SUARA_T1, "lima"), teks("tu-ta", 120, 127, "5", 14, W.biru, { z: 1 }), teks("tu-tb", 220, 127, "?", 14, W.merah, { z: 1 })),
      tambah(idx(SUARA_T1, "merah"), kotak("sm", 100, 150, 36, 8, W.merah, W.biru, { rx: 2 })),
    ),
    k(
      SUARA_T2,
      sorotkan(idx(SUARA_T2, "lain"), "tu-b"),
      tambah(idx(SUARA_T2, "belas"), KT[0]),
      tambah(idx(SUARA_T2, "dikurangi"), KT[1]),
      tambah(idx(SUARA_T2, "lima"), KT[2]),
      tambah(idx(SUARA_T2, "yaitu"), KT[3]),
      tambah(idx(SUARA_T2, "sembilan"), KT[4]),
      ubah(idx(SUARA_T2, "sembilan"), { id: "tu-tb", isi: "9", warna: W.biru }),
      tambah(idx(SUARA_T2, "biru"), kotak("sb", 204, 150, 36, 8, "#2563EB", W.biru, { rx: 2 })),
    ),
    k(
      SUARA_T3,
      hapus(0, ...KT.map((o) => o.id)),
      tambah(idx(SUARA_T3, "Cocok"), ...kartu("cc", 50, 168, 220, 22, W.hijauMuda, ["cocok: bagian dari 1 kumpulan"], 9)),
      tambah(idx(SUARA_T3, "bagian-bagian"), emo("ck", 286, 160, E.centang, 20)),
      sorotkan(idx(SUARA_T3, "kumpulan"), "tu-u"),
    ),
    k(
      SUARA_T4,
      hapus(0, "cc-k", "cc-t0", "ck"),
      tambah(idx(SUARA_T4, "Kurang"), ...kartu("kc", 50, 168, 220, 22, W.merahMuda, ["kurang cocok: 2 orang, tanpa 1 utuh"], 8.6)),
      tambah(idx(SUARA_T4, "dua"), emo("o1", 240, 130, E.anak, 24)),
      tambah(idx(SUARA_T4, "orang"), emo("o2", 272, 130, E.dika, 24)),
      tambah(idx(SUARA_T4, "tidak"), emo("sl", 252, 80, E.salah, 22)),
    ),
  ],
};
