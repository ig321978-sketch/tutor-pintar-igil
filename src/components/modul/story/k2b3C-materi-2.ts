import type { AdeganStory } from "./logika-story";
import { LERENG, W, bolaGelinding, cocok, diLereng, emo, gambarLereng, judul, kartu, kotak, putaranGelinding, ruang, sudutLereng, tabungBerbaring, teks, chipPermukaan } from "./k2b3C-gambar";
import { bersih, hapus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k2b3C-bantu";

const TANGAN = "\u{1F446}";
const yLereng = (x: number): number => LERENG.y0 + ((x - LERENG.x0) * (LERENG.y1 - LERENG.y0)) / (LERENG.x1 - LERENG.x0);

/* ------------------------------ 1. Menggelindingkan benda ------------------------------ */
export const R_BOLA = 11;
export const X_BOLA_AWAL = 40;
export const X_BOLA_AKHIR = 180;
export const X_TABUNG_AWAL = 95;
export const X_TABUNG_AKHIR = 135;
const XK = 235;
const ptBolaAwal = diLereng(X_BOLA_AWAL, R_BOLA);
const ptBolaAkhir = diLereng(X_BOLA_AKHIR, R_BOLA);
export const PUTAR_BOLA = putaranGelinding((X_BOLA_AKHIR - X_BOLA_AWAL) / Math.cos(sudutLereng), R_BOLA);
const ptTabungAwal = diLereng(X_TABUNG_AWAL, 9);
const ptTabungAkhir = diLereng(X_TABUNG_AKHIR, 9);

const SUARA_G1 = "Kira ingin menggelindingkan benda di layar. Ada bola, kaleng, dan dadu di atas lereng.";
const SUARA_G2 = "Ketuk bola. Bola meluncur dan berputar. Bola menggelinding dengan mudah.";
const SUARA_G3 = "Sekarang ketuk dadu. Dadu tetap diam di tempatnya. Dadu tidak mau menggelinding.";
const SUARA_G4 = "Ketuk kaleng. Kaleng berbaring dan ikut menggelinding. Kaleng juga mudah menggelinding.";
const SUARA_G5 = "Jadi bola dan kaleng menggelinding, sedangkan dadu diam. Mengapa begitu? Kita lihat sebentar lagi.";

export const ADEGAN_GELINDING: AdeganStory = {
  id: "gelinding",
  judul: "Menggelindingkan benda di layar",
  sumber: "Materi: benda yang menggelinding",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Menggelinding atau diam?"), ...gambarLereng()),
      tambah(idx(SUARA_G1, "bola"), bolaGelinding("a", ptBolaAwal.x, ptBolaAwal.y, R_BOLA)),
      tambah(idx(SUARA_G1, "kaleng"), tabungBerbaring("a", ptTabungAwal.x, ptTabungAwal.y, 30, 18)),
      tambah(idx(SUARA_G1, "dadu"), ...ruang("kubus", "kba", XK, yLereng(XK) - 14, 20)),
    ),
    k(
      SUARA_G2,
      tambah(idx(SUARA_G2, "Ketuk"), emo("tp", ptBolaAwal.x, ptBolaAwal.y - 22, TANGAN, 18)),
      ubah(idx(SUARA_G2, "meluncur"), { id: "rla", x: ptBolaAkhir.x, y: ptBolaAkhir.y, rot: PUTAR_BOLA }),
      hapus(idx(SUARA_G2, "menggelinding"), "tp"),
    ),
    k(SUARA_G3, tambah(idx(SUARA_G3, "ketuk"), emo("tp", XK, yLereng(XK) - 44, TANGAN, 18)), tambah(idx(SUARA_G3, "diam"), teks("dm", XK, yLereng(XK) + 30, "diam", 10, W.merah)), hapus(idx(SUARA_G3, "tidak"), "tp")),
    k(
      SUARA_G4,
      tambah(idx(SUARA_G4, "Ketuk"), emo("tp", ptTabungAwal.x, ptTabungAwal.y - 22, TANGAN, 18)),
      ubah(idx(SUARA_G4, "berbaring"), { id: "tga", x: ptTabungAkhir.x, y: ptTabungAkhir.y }),
      hapus(idx(SUARA_G4, "ikut"), "tp"),
    ),
    k(
      SUARA_G5,
      tambah(idx(SUARA_G5, "bola"), ...kartu("gl", 8, 164, 140, 30, W.hijauMuda, ["menggelinding: bola, kaleng"], 8.4)),
      tambah(idx(SUARA_G5, "dadu"), ...kartu("gd", 156, 164, 136, 30, W.pink, ["diam: dadu"], 9.4)),
    ),
  ],
};

/* ------------------------------ 2. Permukaan datar dan lengkung ------------------------------ */
const SUARA_P1 = "Bangun ruang dibedakan menurut permukaannya. Ada permukaan datar, dan ada permukaan lengkung.";
const SUARA_P2 = "Kubus dan balok punya permukaan datar. Permukaan datar itu rata.";
const SUARA_P3 = "Tabung, kerucut, dan bola punya permukaan lengkung. Permukaan lengkung itu melengkung.";
const SUARA_P4 = "Tabung dan kerucut juga punya alas yang datar. Tetapi ada permukaan lengkung, jadi masuk kelompok lengkung.";
const SUARA_P5 = "Bola paling lengkung. Seluruh permukaan bola melengkung, tidak ada bagian yang datar.";

export const ADEGAN_PERMUKAAN: AdeganStory = {
  id: "permukaan",
  judul: "Permukaan datar dan permukaan lengkung",
  sumber: "Materi: permukaan datar dan lengkung",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_P1,
      tambah(idx(SUARA_P1, "datar"), kotak("rgd-k", 8, 32, 138, 134, W.hijauMuda + "88", W.hijau, { rx: 8, putus: true }), teks("rgd-t", 77, 48, "permukaan datar", 10, W.hijau)),
      tambah(idx(SUARA_P1, "lengkung"), kotak("rgl-k", 154, 32, 138, 134, W.pink + "88", W.merah, { rx: 8, putus: true }), teks("rgl-t", 223, 48, "permukaan lengkung", 10, W.merah)),
    ),
    k(SUARA_P2, tambah(idx(SUARA_P2, "Kubus"), ...ruang("kubus", "kba", 40, 100, 22), teks("nm-kb", 40, 138, "kubus", 9)), tambah(idx(SUARA_P2, "balok"), ...ruang("balok", "bla", 100, 100, 18), teks("nm-bl", 100, 138, "balok", 9))),
    k(
      SUARA_P3,
      tambah(idx(SUARA_P3, "Tabung"), ...ruang("tabung", "tba", 182, 100, 22), teks("nm-tb", 182, 138, "tabung", 8.6)),
      tambah(idx(SUARA_P3, "kerucut"), ...ruang("kerucut", "kra", 226, 100, 22), teks("nm-kr", 226, 138, "kerucut", 8.6)),
      tambah(idx(SUARA_P3, "bola"), ...ruang("bola", "boa", 268, 100, 22), teks("nm-bo", 268, 138, "bola", 8.6)),
    ),
    k(SUARA_P4, sorotkan(idx(SUARA_P4, "Tabung"), "tba-bd", "tba-ta"), sorotkan(idx(SUARA_P4, "kerucut"), "kra-bd"), tambah(idx(SUARA_P4, "alas"), ...kartu("al", 158, 172, 134, 26, W.krem, ["alas datar, tetap lengkung"], 8.2))),
    k(SUARA_P5, redamkan(0, "tba-bd", "tba-ta", "kra-bd"), sorotkan(idx(SUARA_P5, "Bola"), "boa-bd"), tambah(idx(SUARA_P5, "Seluruh"), ...chipPermukaan("boa", 0, 242, 150, "lengkung", 48, 20))),
  ],
};

/* ------------------------------ 3. Mengapa? ------------------------------ */
const SUARA_M1 = "Mengapa ada benda yang menggelinding dan ada yang diam? Karena permukaannya berbeda.";
const SUARA_M2 = "Permukaan lengkung bisa berguling terus. Lihat, bola menggelinding jauh.";
const SUARA_M3 = "Permukaan datar menahan benda supaya diam. Karena itu kita bisa menumpuk dadu.";
const SUARA_M4 = "Bola cocok untuk digelindingkan. Dadu cocok untuk ditumpuk. Setiap permukaan punya kegunaan sendiri.";

export const ADEGAN_MENGAPA: AdeganStory = {
  id: "mengapa",
  judul: "Mengapa menggelinding dan mengapa diam?",
  sumber: "Materi: lengkung berguling, datar menahan",
  latar: "#F5F3FF",
  ketukan: [
    k(SUARA_M1, tambah(0, judul("Mengapa?")), tambah(idx(SUARA_M1, "menggelinding"), ...kartu("m1", 20, 50, 125, 40, W.pink, ["menggelinding"], 11)), tambah(idx(SUARA_M1, "diam"), ...kartu("m2", 155, 50, 125, 40, W.hijauMuda, ["diam"], 11)), tambah(idx(SUARA_M1, "berbeda"), emo("qq", 150, 140, "❓", 44))),
    k(
      SUARA_M2,
      bersih(0),
      tambah(0, judul("Lengkung berguling"), ...gambarLereng()),
      tambah(idx(SUARA_M2, "lengkung"), bolaGelinding("a", ptBolaAwal.x, ptBolaAwal.y, R_BOLA)),
      ubah(idx(SUARA_M2, "menggelinding"), { id: "rla", x: ptBolaAkhir.x, y: ptBolaAkhir.y, rot: PUTAR_BOLA }),
      tambah(idx(SUARA_M2, "jauh"), ...kartu("jl", 70, 164, 160, 26, W.pink, ["lengkung: berguling"], 10)),
    ),
    k(
      SUARA_M3,
      bersih(0),
      tambah(0, judul("Datar menahan")),
      tambah(idx(SUARA_M3, "datar"), ...ruang("kubus", "kba", 150, 138, 30)),
      tambah(idx(SUARA_M3, "diam"), ...ruang("kubus", "kbb", 150, 108, 30, { z: 1 })),
      tambah(idx(SUARA_M3, "menumpuk"), ...ruang("kubus", "kbc", 150, 78, 30, { z: 2 })),
      tambah(idx(SUARA_M3, "dadu"), ...kartu("jd", 190, 70, 100, 40, W.hijauMuda, ["datar: menahan"], 9.4)),
    ),
    k(
      SUARA_M4,
      tambah(idx(SUARA_M4, "Bola"), ...ruang("bola", "boa", 50, 120, 22), teks("gu-a", 50, 156, "digelindingkan", 8.4)),
      tambah(idx(SUARA_M4, "Dadu"), ...ruang("kubus", "kbd", 236, 120, 22), teks("gu-b", 236, 158, "ditumpuk", 8.4)),
      tambah(idx(SUARA_M4, "kegunaan"), cocok("ok", 150, 196, 14)),
    ),
  ],
};

/* ------------------------------ 4. Lima nama bangun ruang ------------------------------ */
const URUT_X = [30, 90, 150, 210, 270];
const SUARA_N1 = "Ada lima nama bangun ruang yang perlu kita kenal. Mari kita sebut satu per satu.";
const SUARA_N2 = "Kubus, balok, tabung, kerucut, dan bola.";
const SUARA_N3 = "Kubus seperti dadu. Balok seperti kardus. Keduanya punya permukaan datar.";
const SUARA_N4 = "Tabung seperti kaleng. Kerucut seperti topi ulang tahun. Keduanya punya permukaan lengkung.";
const SUARA_N5 = "Bola seperti kelereng. Seluruh permukaannya lengkung. Sekarang kita kenali ciri-ciri tiap bangun ruang.";

export const ADEGAN_LIMA_NAMA: AdeganStory = {
  id: "lima-nama",
  judul: "Lima nama bangun ruang",
  sumber: "Materi: nama bangun ruang",
  latar: "#ECFEFF",
  ketukan: [
    k(SUARA_N1, tambah(0, judul("Lima bangun ruang")), tambah(idx(SUARA_N1, "lima"), teks("n5", 150, 126, "5", 70, W.merah))),
    k(
      SUARA_N2,
      bersih(0),
      tambah(0, judul("Nama bangun ruang")),
      tambah(idx(SUARA_N2, "Kubus"), ...ruang("kubus", "kba", URUT_X[0], 80, 20), teks("nm-kb", URUT_X[0], 120, "kubus", 9)),
      tambah(idx(SUARA_N2, "balok"), ...ruang("balok", "bla", URUT_X[1], 80, 18), teks("nm-bl", URUT_X[1], 120, "balok", 9)),
      tambah(idx(SUARA_N2, "tabung"), ...ruang("tabung", "tba", URUT_X[2], 80, 22), teks("nm-tb", URUT_X[2], 120, "tabung", 9)),
      tambah(idx(SUARA_N2, "kerucut"), ...ruang("kerucut", "kra", URUT_X[3], 80, 22), teks("nm-kr", URUT_X[3], 120, "kerucut", 9)),
      tambah(idx(SUARA_N2, "bola"), ...ruang("bola", "boa", URUT_X[4], 80, 22), teks("nm-bo", URUT_X[4], 120, "bola", 9)),
    ),
    k(SUARA_N3, tambah(idx(SUARA_N3, "dadu"), teks("ct-kb", URUT_X[0], 138, "dadu", 8.6, W.merah)), tambah(idx(SUARA_N3, "kardus"), teks("ct-bl", URUT_X[1], 138, "kardus", 8.6, W.merah)), tambah(idx(SUARA_N3, "datar"), ...kartu("gd", 10, 156, 110, 26, W.hijauMuda, ["permukaan datar"], 9.4))),
    k(SUARA_N4, tambah(idx(SUARA_N4, "kaleng"), teks("ct-tb", URUT_X[2], 138, "kaleng", 8.6, W.merah)), tambah(idx(SUARA_N4, "topi"), teks("ct-kr", URUT_X[3], 138, "topi", 8.6, W.merah)), tambah(idx(SUARA_N4, "lengkung"), ...kartu("gl", 130, 156, 160, 26, W.pink, ["permukaan lengkung"], 9.4))),
    k(SUARA_N5, tambah(idx(SUARA_N5, "kelereng"), teks("ct-bo", URUT_X[4], 138, "kelereng", 8.6, W.merah)), tambah(idx(SUARA_N5, "ciri-ciri"), emo("ow", 150, 196, "\u{1F50E}", 16))),
  ],
};
