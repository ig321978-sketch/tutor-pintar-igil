import type { AdeganStory } from "./logika-story";
import { E, JALUR, W, cincin, deret, emo, idKartu, judul, kartu, labelDeret, lantai, loncengJalur, panah, papan, penanda, sumbu, teks, tokoh } from "./k5b2b-gambar";
import { DERET_RAPAT, X_DERET, Y_A, Y_B } from "./k5b2b-materi-1";
import { bersih, hapus, k, sorotkan, tambah } from "./k5b2b-bantu";

/*
 * Cerita orisinal IGIL "Dua Lonceng Pak Tarno" (Kelas 5 Bab 2 Sub-Bab B), Pasar Kuliner Malam.
 * Naskah suara dari naskah/story-naskah-k5b2b.md. Bagian ini: salah langkah Fajar (empat kali enam), memeriksa daftar, dan KPK.
 */

/* ------------------------------ 4. Salah langkah Fajar ------------------------------ */
const SUARA_S1 = "Gampang, kata Fajar, empat kali enam sama dengan dua puluh empat, jadi dua puluh empat menitnya.";
const SUARA_S2 = "Kalau aku salah, aku makan bakso dengan sambal satu sendok penuh, katanya sambil tersenyum lebar.";
const SUARA_S3 = "Pak Tarno langsung mengambil sendok besar dari gerobaknya, dan semua orang menahan tawa.";

export const ADEGAN_SALAH_KALI: AdeganStory = {
  id: "salah-kali",
  judul: "Fajar menjawab dengan yakin",
  sumber: "Materi: salah langkah hasil kali bukan KPK",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Fajar Salah Menghitung"), ...lantai("lt", 150)),
      tambah("Fajar", ...tokoh("fa", 60, 184, "Fajar")),
      tambah("empat", teks("kl", 150, 66, "4 x 6", 18, W.biru, { z: 3 })),
      tambah("sama", teks("hs", 150, 92, "= 24", 18, W.merah, { z: 3 })),
      tambah("menitnya", ...kartu("mt", 100, 106, 100, 26, W.merahMuda, ["24 menit"], 12)),
    ),
    k(
      SUARA_S2,
      hapus(0, "kl", "hs", ...idKartu("mt", 1)),
      tambah("bakso", emo("bk", 118, 70, E.bakso, 30)),
      tambah("sambal", emo("sm", 160, 70, E.sambal, 30), teks("smt", 160, 98, "sambal", 9, W.merah, { z: 3 })),
      tambah("satu", emo("sd", 202, 70, E.sendok, 30), teks("sdt", 202, 98, "1 sendok", 9, W.biru, { z: 3 })),
      tambah("tersenyum", emo("sy", 96, 166, E.senyum, 20)),
    ),
    k(
      SUARA_S3,
      hapus(0, "bk", "sm", "smt", "sd", "sdt"),
      tambah("Tarno", ...tokoh("pt", 262, 184, "Pak Tarno")),
      tambah("sendok", emo("sb", 214, 118, E.sendok, 44)),
      tambah("menahan", ...tokoh("bi", 118, 184, "Bima"), ...tokoh("ci", 176, 184, "Citra")),
      tambah("tawa", emo("tw1", 118, 140, E.tertawa, 18), emo("tw2", 176, 140, E.tertawa, 18)),
    ),
  ],
};

/* ------------------------------ 5. Memeriksa daftar ------------------------------ */
const SUARA_C1 = "Bima menunjuk dua belas: bilangan itu muncul di kedua daftar dan lebih kecil dari dua puluh empat.";
const SUARA_C2 = "Dua puluh empat memang kelipatan persekutuan, tetapi bukan yang terkecil.";
const SUARA_C3 = "Fajar menelan sambalnya dengan wajah merah, lalu minum es teh tiga gelas.";

const CA = deret("ca", X_DERET, Y_A, [4, 8, 12, 16, 20, 24], W.jingga, DERET_RAPAT);
const CB = deret("cb", X_DERET, Y_B, [6, 12, 18, 24, 30], W.tosca, DERET_RAPAT);
const ring = (id: string, y: number, i: number) => cincin(id, X_DERET, y, i, DERET_RAPAT);

export const ADEGAN_PERIKSA: AdeganStory = {
  id: "periksa",
  judul: "Bima memeriksa daftar",
  sumber: "Materi: yang terkecil di kedua daftar",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Bima Memeriksa Daftar"), ...lantai("lt", 150), papan("dp", 10, 28, 280, 114), ...tokoh("bi", 36, 184, "Bima")),
      tambah(0, labelDeret("la", X_DERET, Y_A, "Kelipatan 4"), labelDeret("lb", X_DERET, Y_B, "Kelipatan 6"), ...CA, ...CB),
      tambah("belas", ring("r12a", Y_A, 2), ring("r12b", Y_B, 1)),
      tambah("kecil", teks("bd", 250, 40, "12 < 24", 12, W.merah, { z: 3 })),
      tambah("puluh", ring("r24a", Y_A, 5), ring("r24b", Y_B, 3)),
    ),
    k(
      SUARA_C2,
      sorotkan("persekutuan", "r24a", "r24b"),
      tambah("bukan", emo("x24", 183, 46, E.salah, 14)),
      tambah("terkecil", teks("tk", 238, 112, "bukan yang terkecil", 9, W.merah, { z: 3 })),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Wajah Merah Fajar"), ...lantai("lt", 150), ...tokoh("fa", 60, 184, "Fajar")),
      tambah("menelan", emo("sm", 100, 70, E.sambal, 30)),
      tambah("wajah", teks("pd", 60, 128, "pedas!", 11, W.merah, { z: 3 })),
      tambah("minum", emo("g1", 150, 100, E.esteh, 26)),
      tambah("teh", emo("g2", 190, 100, E.esteh, 26)),
      tambah("tiga", emo("g3", 230, 100, E.esteh, 26), teks("g3t", 190, 70, "3 gelas", 11, W.biru, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 6. KPK ------------------------------ */
const SUARA_K1 = "Dari semua kelipatan persekutuan, yang paling kecil disebut kelipatan persekutuan terkecil, atau KPK.";
const SUARA_K2 = "KPK dari empat dan enam adalah dua belas.";
const SUARA_K3 = "Jadi kedua lonceng berbunyi bersama pada menit kedua belas, lalu dua puluh empat, lalu tiga puluh enam.";

export const ADEGAN_KPK: AdeganStory = {
  id: "kpk",
  judul: "KPK adalah yang terkecil",
  sumber: "Materi: KPK kelipatan persekutuan terkecil",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("KPK, yang Terkecil"), ...lantai("lt", 150), papan("dp", 10, 28, 280, 114)),
      tambah("persekutuan", teks("kpl", 150, 48, "kelipatan persekutuan", 10, W.hijauTua, { z: 3 }), ...kartu("c12", 40, 60, 60, 36, W.hijauMuda, ["12"], 16), ...kartu("c24", 120, 60, 60, 36, W.hijauMuda, ["24"], 16), ...kartu("c36", 200, 60, 60, 36, W.hijauMuda, ["36"], 16)),
      sorotkan("kecil", "c12-k"),
      tambah("KPK", teks("kpk", 70, 116, "KPK", 16, W.merah, { z: 3 })),
    ),
    k(
      SUARA_K2,
      bersih(0),
      tambah(0, judul("KPK Empat dan Enam"), ...lantai("lt", 150), papan("dp", 10, 28, 280, 114)),
      tambah("empat", ...kartu("k4", 50, 44, 60, 30, W.jingga, ["4"], 16)),
      tambah("enam", ...kartu("k6", 190, 44, 60, 30, W.tosca, ["6"], 16)),
      tambah("adalah", panah("a4", 80, 76, 50, 30, W.merah, 2.2, { z: 4 }), panah("a6", 220, 76, -50, 30, W.merah, 2.2, { z: 4 }), teks("kl", 50, 124, "KPK", 14, W.merah, { z: 3 })),
      tambah("belas", ...kartu("k12", 110, 108, 80, 30, W.hijauMuda, ["12"], 18)),
    ),
    k(
      SUARA_K3,
      bersih(0),
      tambah(0, judul("Bersama Tiap Dua Belas"), ...lantai("lt", 150), papan("dp", 10, 28, 280, 114), sumbu("jl", JALUR), ...penanda("t0", JALUR, 0)),
      tambah("belas", loncengJalur("b12", JALUR, 12), ...penanda("t12", JALUR, 12, W.merah)),
      tambah("empat", loncengJalur("b24", JALUR, 24), ...penanda("t24", JALUR, 24, W.merah)),
      tambah("enam", loncengJalur("b36", JALUR, 36), ...penanda("t36", JALUR, 36, W.merah)),
    ),
  ],
};
