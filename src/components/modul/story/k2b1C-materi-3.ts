import type { AdeganStory } from "./logika-story";
import { E, W, WK, angkaNampan, emo, geserNampan, gs, idMejaPesta, idUmbul, judul, kartu, kotak, lantai, mejaPesta, nampan, teks, tokoh, umbul } from "./k2b1C-gambar";
import { hapus, k, sorotkan, tambah, ubah } from "./k2b1C-bantu";

/*
 * Cerita orisinal IGIL "Dua Nampan untuk Pesta Kue" (Kelas 2 Bab 1 Sub-Bab C), akhir cerita bab.
 * Naskah suara dari naskah/story-naskah-k2b1c.md. Bagian ini: mengurutkan tiga bilangan, nampan donat ke meja Pesta Kue, dan penutup.
 */

/* ------------------------------ 7. Mengurutkan tiga bilangan ------------------------------ */
const SUARA_U1 = "Tiga nampan lagi datang, berisi tiga puluh tiga, dua puluh empat, dan dua puluh sembilan kue.";
const SUARA_U2 = "Nia mengurutkan dari yang paling sedikit: dua puluh empat, dua puluh sembilan, tiga puluh tiga.";
const SUARA_U3 = "Chacha memasang tanda di antara ketiganya, dan Dika bertepuk tangan.";

const SLOT = [12, 108, 204];
const LEBAR = 84;
const TY = 66;

export const ADEGAN_URUTAN: AdeganStory = {
  id: "urutan",
  judul: "Mengurutkan tiga bilangan",
  sumber: "Materi: mengurutkan tiga bilangan",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("3 nampan lagi datang"), lantai("lt", 150)),
      tambah("nampan", ...nampan("t33", SLOT[0], TY, LEBAR, E.lapis)),
      tambah("lagi", ...nampan("t24", SLOT[1], TY, LEBAR, E.donat)),
      tambah("datang,", ...nampan("t29", SLOT[2], TY, LEBAR, E.pastel)),
      tambah("tiga@3", angkaNampan("t33", SLOT[0], TY, LEBAR, 33)),
      tambah("empat", angkaNampan("t24", SLOT[1], TY, LEBAR, 24)),
      tambah("sembilan", angkaNampan("t29", SLOT[2], TY, LEBAR, 29)),
    ),
    k(
      SUARA_U2,
      tambah("Nia", ...tokoh("ni", 28, 172, "nia")),
      tambah("paling", ...kartu("ur", 40, 118, 220, 20, W.krem, ["dari paling sedikit ke paling banyak"], 8.4)),
      ubah("empat", ...geserNampan("t24", SLOT[0], TY, LEBAR), ...geserNampan("t33", SLOT[1], TY, LEBAR)),
      ubah("sembilan,", ...geserNampan("t29", SLOT[1], TY, LEBAR), ...geserNampan("t33", SLOT[2], TY, LEBAR)),
      sorotkan("tiga", "t33"),
    ),
    k(
      SUARA_U3,
      hapus("Chacha", "ur-k", "ur-t0"),
      tambah("Chacha", ...tokoh("ch", 272, 172, "chacha")),
      tambah("memasang", teks("o24", 84, 134, "24", 22, W.biru), teks("s1", 117, 134, "<", 26, W.merah), teks("o29", 150, 134, "29", 22, W.biru)),
      tambah("ketiganya,", teks("s2", 183, 134, "<", 26, W.merah), teks("o33", 216, 134, "33", 22, W.biru)),
      tambah("Dika", ...tokoh("dk", 150, 172, "dika")),
      tambah("bertepuk", emo("tp", 182, 156, E.tepuk, 22)),
    ),
  ],
};

/* ------------------------------ 8. Nampan donat ke meja Pesta Kue ------------------------------ */
const SUARA_M1 = "Nampan donat yang empat puluh satu dibawa ke meja Pesta Kue.";
const SUARA_M2 = "Anak-anak berbaris rapi, dan semuanya kebagian kue.";
const SUARA_M3 = "Chacha memotong pita pembuka pesta, tetapi pitanya malah tersangkut di topi Nia!";

const KID = Array.from({ length: 9 }, (_, i) => 30 + 30 * i);
const idKid = KID.map((_, i) => `kd${i}`);
const idDonat = KID.map((_, i) => `dn${i}`);

export const ADEGAN_MEJA_PESTA: AdeganStory = {
  id: "meja-pesta",
  judul: "Nampan donat ke meja Pesta Kue",
  sumber: "Materi: nampan donat ke meja Pesta Kue",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Ke meja Pesta Kue"), lantai("lt", 150), mejaPesta("mj", 70, 118, 160)),
      tambah("Nampan", ...nampan("n2", 20, 50, 100, E.donat)),
      tambah("satu", angkaNampan("n2", 20, 50, 100, 41)),
      ubah("dibawa", ...geserNampan("n2", 100, 78, 100)),
      sorotkan("meja", "mj"),
      tambah("Pesta", ...kartu("bn", 90, 28, 120, 20, W.emas, ["PESTA KUE"], 10)),
    ),
    k(
      SUARA_M2,
      tambah("Anak-anak", ...KID.slice(0, 3).map((x, i) => emo(`kd${i}`, x, 192, E.anak, 18))),
      tambah("berbaris", ...KID.slice(3, 6).map((x, i) => emo(`kd${i + 3}`, x, 192, E.anak, 18))),
      tambah("rapi,", ...KID.slice(6).map((x, i) => emo(`kd${i + 6}`, x, 192, E.anak, 18))),
      tambah("kebagian", ...KID.map((x, i) => emo(`dn${i}`, x, 172, E.donat, 12))),
    ),
    k(
      SUARA_M3,
      hapus("Chacha", ...idKid, ...idDonat),
      tambah("Chacha", ...tokoh("ch", 30, 172, "chacha")),
      tambah("memotong", emo("gt", 62, 160, E.gunting, 16)),
      tambah("pita", gs("pt", 62, 146, 240, 146, WK.pita, 3, { z: 3 })),
      ubah("tersangkut", { id: "pt", x2: 208, y2: 13 }),
      tambah("topi", ...tokoh("ni", 270, 172, "nia")),
      tambah("Nia!", emo("tw", 270, 140, E.tertawa, 20)),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_Z1 = "Meja Pesta Kue penuh, dan kantin ramai oleh tawa.";
const SUARA_Z2 = "Dika merangkum. Perkirakan dulu, bandingkan puluhannya, lihat satuannya kalau puluhannya sama, lalu pasang tandanya.";
const SUARA_Z3 = "Menurutmu, kalau ada dua kotak kue, empat puluh dua dan empat puluh lima, tanda apa yang kamu pasang? Terima kasih, Chacha, Dika, Nia, Bu Sari, dan Bu Dewi!";

const KUE_MEJA = [E.lapis, E.donat, E.pastel, E.bolu, E.lapis, E.donat, E.pastel];
const idKue = KUE_MEJA.map((_, i) => `km${i}`);
const LANGKAH = ["1. Perkirakan dulu", "2. Bandingkan puluhannya", "3. Lihat satuannya kalau puluhan sama", "4. Pasang tandanya"];

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Pesta Kue dimulai",
  sumber: "Materi: penutup, akhir cerita bab",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Pesta Kue dimulai"), lantai("lt", 150)),
      tambah("Meja", ...mejaPesta("mj", 50, 116, 200)),
      tambah("penuh,", ...KUE_MEJA.map((e, i) => emo(`km${i}`, 74 + 25 * i, 112, e, 16))),
      tambah("kantin", ...umbul("um", 30, 9)),
      tambah("ramai", ...[40, 110, 190, 260].map((x, i) => emo(`rm${i}`, x, 176, E.ramai, 20))),
      tambah("tawa.", emo("tw", 150, 176, E.tertawa, 22)),
    ),
    k(
      SUARA_Z2,
      hapus("Dika", ...idMejaPesta("mj"), ...idKue, "rm0", "rm1", "rm2", "rm3", "tw"),
      tambah("Dika", ...tokoh("dk", 272, 172, "dika"), ...tokoh("ch", 30, 174, "chacha"), ...tokoh("ni", 150, 178, "nia")),
      tambah("merangkum.", emo("ct", 246, 152, E.catat, 20)),
      tambah("Perkirakan", ...kartu("l1", 40, 48, 210, 24, W.langit, [LANGKAH[0]], 9)),
      tambah("bandingkan", ...kartu("l2", 40, 76, 210, 24, W.hijauMuda, [LANGKAH[1]], 9)),
      tambah("lihat", ...kartu("l3", 40, 104, 210, 24, W.krem, [LANGKAH[2]], 9)),
      tambah("pasang", ...kartu("l4", 40, 132, 210, 24, W.pink, [LANGKAH[3]], 9)),
    ),
    k(
      SUARA_Z3,
      hapus(0, "l1-k", "l1-t0", "l2-k", "l2-t0", "l3-k", "l3-t0", "l4-k", "l4-t0", "dk", "dk-n", "ct", "ch", "ch-n", "ni", "ni-n", "ni-tp", ...idUmbul("um", 9)),
      tambah("dua", ...kartu("dk2", 100, 112, 100, 20, W.krem, ["2 kotak kue"], 8.8)),
      tambah("empat", kotak("b1", 40, 40, 90, 56, WK.kotakKue, WK.kayuTua, { rx: 6, tebal: 2 })),
      tambah("dua@2", teks("n42", 85, 76, "42", 26, W.biru)),
      tambah("empat@2", kotak("b2", 170, 40, 90, 56, WK.kotakKue, WK.kayuTua, { rx: 6, tebal: 2 })),
      tambah("lima,", teks("n45", 215, 76, "45", 26, W.biru)),
      tambah("tanda", teks("tq", 150, 76, "?", 32, W.merah)),
      tambah("Chacha", ...tokoh("ch", 30, 168, "chacha"), emo("la", 30, 138, E.lambai, 18)),
      tambah("Dika", ...tokoh("dk", 90, 168, "dika"), emo("lc", 90, 138, E.lambai, 18)),
      tambah("Nia", ...tokoh("ni", 150, 168, "nia"), emo("ld", 150, 138, E.lambai, 18)),
      tambah("Sari", ...tokoh("sr", 210, 168, "sari"), emo("le", 210, 138, E.lambai, 18)),
      tambah("Dewi", ...tokoh("dw", 270, 168, "dewi"), emo("lb", 270, 138, E.lambai, 18)),
    ),
  ],
};
