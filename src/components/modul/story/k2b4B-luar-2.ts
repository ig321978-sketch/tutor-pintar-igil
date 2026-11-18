import type { AdeganStory } from "./logika-story";
import { E, M, W, anak, emo, gelombang, judul, kartu, kartuAngka, kotak, kurung, lengkung, manik, panah, sel, selKosong, teks, tokoh } from "./k2b4B-gambar";
import { NAMA_METODE_ID } from "./k2b4B-luar-1";
import { bersih, hapus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k2b4B-bantu";

/*
 * Video metode global Kelas 2 Bab 4 Sub-Bab B "Pita Hias Bu Mira".
 * Naskah suara dari naskah/story-naskah-k2b4b.md. Bagian ini: Kode Huruf, Tepuk Irama dengan terapannya, dan ringkasan.
 */

/* ------------------------------ Kode Huruf: konsep ------------------------------ */
const SUARA_K1 = "Cara kedua, Letter Coding, atau Kode Huruf.";
const SUARA_K2 = "Beri satu huruf untuk satu jenis unsur. Merah ditulis A, dan biru ditulis B.";
const SUARA_K3 = "Merah, biru, merah, biru pun ditulis A, B, A, B.";
const SUARA_K4 = "Dengan huruf, kita melihat susunan polanya saja, dan bisa membandingkan dua pola yang isinya berbeda.";

export const ADEGAN_LUAR_KODE: AdeganStory = {
  id: "luar-kode",
  judul: "Letter Coding: Kode Huruf",
  sumber: "Metode global: Kode Huruf",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_K1,
      bersih(0),
      tambah(0, judul("Kode Huruf")),
      tambah(idx(SUARA_K1, "Letter"), ...kartuAngka("ka", 90, 56, "A", W.krem, 50, 46, 28)),
      tambah(idx(SUARA_K1, "Coding,"), ...kartuAngka("kb", 160, 56, "B", W.langit, 50, 46, 28)),
      tambah(idx(SUARA_K1, "Kode"), ...kartu("kl", 50, 130, 200, 28, W.krem, ["2. Letter Coding"], 10)),
    ),
    k(
      SUARA_K2,
      bersih(0),
      tambah(idx(SUARA_K2, "satu"), teks("h1", 90, 50, "1 huruf", 11, W.merah)),
      tambah(idx(SUARA_K2, "satu", 2), teks("h2", 212, 50, "1 jenis unsur", 11, W.merah)),
      tambah(idx(SUARA_K2, "Merah"), sel("m0", 90, 100, 34, M.merah)),
      tambah(idx(SUARA_K2, "A"), ...kartuAngka("ka", 73, 124, "A", W.krem, 34, 34, 20)),
      tambah(idx(SUARA_K2, "biru"), sel("m1", 210, 100, 34, M.biru)),
      tambah(idx(SUARA_K2, "B"), ...kartuAngka("kb", 193, 124, "B", W.langit, 34, 34, 20)),
    ),
    k(
      SUARA_K3,
      bersih(0),
      tambah(0, judul("A B A B")),
      ...[M.merah, M.biru, M.merah, M.biru].map((c, i) => tambah(i, sel(`p${i}`, 70 + 52 * i, 74, 36, c))),
      ...["A", "B", "A", "B"].map((h, i) => tambah(6 + i, teks(`l${i}`, 70 + 52 * i, 130, h, 24, W.merah))),
    ),
    k(
      SUARA_K4,
      bersih(0),
      tambah(idx(SUARA_K4, "melihat"), ...[M.merah, M.biru, M.merah, M.biru].map((c, i) => sel(`a${i}`, 50 + 40 * i, 52, 28, c))),
      tambah(idx(SUARA_K4, "susunan"), ...["A", "B", "A", "B"].map((h, i) => teks(`u${i}`, 50 + 40 * i, 94, h, 16, W.merah))),
      tambah(idx(SUARA_K4, "membandingkan"), ...[M.hijau, M.kuning, M.hijau, M.kuning].map((c, i) => sel(`b${i}`, 50 + 40 * i, 128, 28, c))),
      tambah(idx(SUARA_K4, "dua"), teks("d2", 250, 90, "2 pola", 11, W.ungu)),
      tambah(idx(SUARA_K4, "berbeda."), ...["A", "B", "A", "B"].map((h, i) => teks(`v${i}`, 50 + 40 * i, 170, h, 16, W.merah))),
    ),
  ],
};

/* ------------------------------ Kode Huruf: terapan ------------------------------ */
const SUARA_Q1 = "Dika menulis pola hati, hati, segitiga sebagai A, A, B. Pola ungu, ungu, putih juga A, A, B.";
const SUARA_Q2 = "Ternyata dua pola yang isinya berbeda punya kode yang sama!";
const SUARA_Q3 = "Cocok kalau kita ingin membandingkan susunan dua pola.";
const SUARA_Q4 = "Kurang cocok kalau kita lupa huruf mana untuk unsur yang mana, jadi catat dulu artinya.";
const QX = (i: number) => 60 + 40 * i;

export const ADEGAN_LUAR_KODE_TERAPAN: AdeganStory = {
  id: "luar-kode-terapan",
  judul: "Kode Huruf dipakai Dika",
  sumber: "Metode global: Kode Huruf dalam cerita",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_Q1,
      bersih(0),
      tambah(idx(SUARA_Q1, "Dika"), ...tokoh("dk", 252, 164, "Dika")),
      tambah(idx(SUARA_Q1, "hati,"), emo("r0", QX(0), 58, E.hati, 22)),
      tambah(idx(SUARA_Q1, "hati,", 2), emo("r1", QX(1), 58, E.hati, 22)),
      tambah(idx(SUARA_Q1, "segitiga"), { id: "r2", t: "jalur", x: 0, y: 0, d: `M${QX(2)}.0 42.0 L${QX(2) + 11}.0 62.0 L${QX(2) - 11}.0 62.0 Z`, warna: M.hijau, garis: W.biru, tebal: 1.4 }),
      tambah(idx(SUARA_Q1, "A", 1), teks("f0", QX(0), 90, "A", 18, W.merah)),
      tambah(idx(SUARA_Q1, "A", 2), teks("f1", QX(1), 90, "A", 18, W.merah)),
      tambah(idx(SUARA_Q1, "B", 1), teks("f2", QX(2), 90, "B", 18, W.merah)),
      tambah(idx(SUARA_Q1, "ungu,"), sel("u0", QX(0), 120, 26, "#A855F7")),
      tambah(idx(SUARA_Q1, "ungu,", 2), sel("u1", QX(1), 120, 26, "#A855F7")),
      tambah(idx(SUARA_Q1, "putih"), sel("u2", QX(2), 120, 26, M.putih)),
      tambah(idx(SUARA_Q1, "A", 3), teks("g0", QX(0), 158, "A", 18, W.merah)),
      tambah(idx(SUARA_Q1, "A", 4), teks("g1", QX(1), 158, "A", 18, W.merah)),
      tambah(idx(SUARA_Q1, "B", 2), teks("g2", QX(2), 158, "B", 18, W.merah)),
    ),
    k(
      SUARA_Q2,
      tambah(idx(SUARA_Q2, "dua"), teks("d2", 256, 60, "2 pola", 11, W.ungu)),
      sorotkan(idx(SUARA_Q2, "kode"), "f0", "f1", "f2", "g0", "g1", "g2"),
      tambah(idx(SUARA_Q2, "sama!"), ...kartu("ks", 196, 84, 90, 22, W.hijauMuda, ["kode sama"], 9.6), emo("kg", 262, 124, E.kaget, 18)),
    ),
    k(
      SUARA_Q3,
      bersih(0),
      tambah(0, ...kartu("cc", 50, 34, 200, 28, W.hijauMuda, ["Cocok"], 12), emo("ok", 226, 54, E.benar, 18)),
      tambah(idx(SUARA_Q3, "membandingkan"), ...kartuAngka("p0", 60, 90, "A A B", W.krem, 70, 34, 14), ...kartuAngka("p1", 170, 90, "A A B", W.langit, 70, 34, 14)),
      tambah(idx(SUARA_Q3, "susunan"), teks("sm", 150, 112, "=", 22, W.merah)),
      tambah(idx(SUARA_Q3, "dua"), teks("d2", 150, 154, "2 pola", 12, W.ungu)),
    ),
    k(
      SUARA_Q4,
      bersih(0),
      tambah(0, ...kartu("kc", 50, 34, 200, 28, W.merahMuda, ["Kurang cocok"], 12), emo("no", 226, 54, E.salah, 18)),
      tambah(idx(SUARA_Q4, "lupa"), emo("cm", 56, 112, E.cemas, 24), teks("qa", 130, 104, "A = ?", 14, W.merah), teks("qb", 130, 128, "B = ?", 14, W.merah)),
      tambah(idx(SUARA_Q4, "catat"), kotak("ct", 170, 88, 112, 56, "#FFFFFF", "#7C3AED", { rx: 6, tebal: 2, z: 0 }), teks("c1", 226, 112, "A = merah", 10, W.biru, { z: 2 }), teks("c2", 226, 132, "B = biru", 10, W.biru, { z: 2 })),
      tambah(idx(SUARA_Q4, "artinya."), emo("ok", 262, 84, E.benar, 18)),
    ),
  ],
};

/* ------------------------------ Tepuk Irama: konsep ------------------------------ */
const SUARA_R1 = "Cara ketiga, Rhythm Clap, atau Tepuk Irama.";
const SUARA_R2 = "Kita bertepuk tangan keras dan pelan secara berulang, lalu mengenali satuannya dari bunyi.";
const SUARA_R3 = "Tepuk keras, pelan, pelan, lalu keras, pelan, pelan. Telinga kita mendengar satuan yang berulang.";
const SUARA_R4 = "Diam sejenak juga boleh menjadi satu unsur pola.";
const BX = (i: number) => 30 + 44 * i;
const batang = (id: string, i: number, tinggi: number, warna: string, base = 130) => kotak(id, BX(i) - 9, base - tinggi, 18, tinggi, warna, W.biru, { rx: 2, tebal: 1.4, z: 2 });

export const ADEGAN_LUAR_TEPUK: AdeganStory = {
  id: "luar-tepuk",
  judul: "Rhythm Clap: Tepuk Irama",
  sumber: "Metode global: Tepuk Irama",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_R1,
      bersih(0),
      tambah(0, judul("Tepuk Irama")),
      tambah(idx(SUARA_R1, "Rhythm"), emo("hn", 100, 108, E.tepuk, 44)),
      tambah(idx(SUARA_R1, "Clap,"), ...gelombang("gw", 128, 94, 3, 8)),
      tambah(idx(SUARA_R1, "Tepuk"), ...kartu("kl", 50, 136, 200, 28, W.krem, ["3. Rhythm Clap"], 10)),
      tambah(idx(SUARA_R1, "Irama."), emo("ln", 220, 96, E.lagu, 26)),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(idx(SUARA_R2, "keras"), emo("h0", 60, 100, E.tepuk, 36), ...gelombang("g0", 80, 92, 3, 6), teks("t0", 60, 134, "keras", 9, W.merah)),
      tambah(idx(SUARA_R2, "pelan"), emo("h1", 160, 100, E.tepuk, 20), ...gelombang("g1", 172, 92, 1, 5), teks("t1", 160, 134, "pelan", 9, W.ungu)),
      tambah(idx(SUARA_R2, "berulang,"), lengkung("lg", 50, 66, 120), emo("ul", 250, 60, E.ulang, 16)),
      tambah(idx(SUARA_R2, "bunyi."), emo("te", 250, 112, E.telinga, 28)),
    ),
    k(
      SUARA_R3,
      bersih(0),
      tambah(idx(SUARA_R3, "keras", 1), batang("b0", 0, 50, M.merah)),
      tambah(idx(SUARA_R3, "pelan", 1), batang("b1", 1, 22, M.biru)),
      tambah(idx(SUARA_R3, "pelan", 2), batang("b2", 2, 22, M.biru)),
      tambah(idx(SUARA_R3, "keras", 2), batang("b3", 3, 50, M.merah)),
      tambah(idx(SUARA_R3, "pelan", 3), batang("b4", 4, 22, M.biru)),
      tambah(idx(SUARA_R3, "pelan", 4), batang("b5", 5, 22, M.biru)),
      tambah(idx(SUARA_R3, "Telinga"), emo("te", 276, 70, E.telinga, 24)),
      tambah(idx(SUARA_R3, "satuan"), kurung("kr", BX(0) - 12, 136, BX(2) - BX(0) + 24)),
      tambah(idx(SUARA_R3, "berulang."), lengkung("lg0", BX(0) - 12, 70, BX(2) - BX(0) + 24), lengkung("lg1", BX(3) - 12, 70, BX(5) - BX(3) + 24)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(idx(SUARA_R4, "Diam"), batang("b0", 0, 50, M.merah), batang("b1", 1, 22, M.biru)),
      tambah(idx(SUARA_R4, "sejenak"), kotak("b2", BX(2) - 9, 124, 18, 6, "#F1F5F9", "#64748B", { rx: 2, tebal: 1.4, putus: true, z: 2 }), teks("dm", BX(2), 148, "diam", 9, W.ungu)),
      tambah(idx(SUARA_R4, "satu"), teks("u1", BX(2), 104, "1 unsur", 10, W.merah)),
      tambah(idx(SUARA_R4, "pola."), batang("b3", 3, 50, M.merah), batang("b4", 4, 22, M.biru), kotak("b5", BX(5) - 9, 124, 18, 6, "#F1F5F9", "#64748B", { rx: 2, tebal: 1.4, putus: true, z: 2 })),
    ),
  ],
};

/* ------------------------------ Tepuk Irama: terapan ------------------------------ */
const SUARA_W1 = "Chacha bertepuk keras, pelan, pelan, keras, pelan, pelan. Nia menirukan dan melanjutkan dengan keras.";
const SUARA_W2 = "Polanya terdengar enak, seperti irama lagu.";
const SUARA_W3 = "Cocok kalau kita ingin merasakan pola dengan tubuh dan telinga.";
const SUARA_W4 = "Kurang cocok kalau tempatnya sangat ramai, karena bunyi tepuk tidak terdengar jelas.";
const WX = (i: number) => 80 + 30 * i;
const batang2 = (id: string, i: number, tinggi: number, warna: string, o: Partial<ReturnType<typeof kotak>> = {}) => kotak(id, WX(i) - 7, 120 - tinggi, 14, tinggi, warna, W.biru, { rx: 2, tebal: 1.4, z: 2, ...o });

export const ADEGAN_LUAR_TEPUK_TERAPAN: AdeganStory = {
  id: "luar-tepuk-terapan",
  judul: "Tepuk Irama dipakai Chacha dan Nia",
  sumber: "Metode global: Tepuk Irama dalam cerita",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_W1,
      bersih(0),
      tambah(0, judul("Tepuk Bersahutan")),
      tambah(idx(SUARA_W1, "Chacha"), ...tokoh("ch", 36, 164, "Chacha")),
      tambah(idx(SUARA_W1, "keras", 1), batang2("b0", 0, 44, M.merah)),
      tambah(idx(SUARA_W1, "pelan", 1), batang2("b1", 1, 20, M.biru)),
      tambah(idx(SUARA_W1, "pelan", 2), batang2("b2", 2, 20, M.biru)),
      tambah(idx(SUARA_W1, "keras", 2), batang2("b3", 3, 44, M.merah)),
      tambah(idx(SUARA_W1, "pelan", 3), batang2("b4", 4, 20, M.biru)),
      tambah(idx(SUARA_W1, "pelan", 4), batang2("b5", 5, 20, M.biru)),
      tambah(idx(SUARA_W1, "Nia"), ...tokoh("ni", 262, 164, "Nia")),
      tambah(idx(SUARA_W1, "melanjutkan"), batang2("b6", 6, 44, "#F1F5F9", { garis: "#64748B", putus: true })),
      ubah(idx(SUARA_W1, "keras", 3), { id: "b6", warna: M.merah, garis: W.biru, putus: false }),
    ),
    k(
      SUARA_W2,
      bersih(0),
      tambah(0, judul("Irama Lagu"), emo("hn", 150, 128, E.tepuk, 30)),
      tambah(idx(SUARA_W2, "terdengar"), emo("n1", 70, 80, E.nada, 24)),
      tambah(idx(SUARA_W2, "irama"), emo("n2", 150, 62, E.lagu, 30)),
      tambah(idx(SUARA_W2, "lagu."), emo("n3", 232, 80, E.nada, 24)),
    ),
    k(
      SUARA_W3,
      bersih(0),
      tambah(0, ...kartu("cc", 50, 34, 200, 28, W.hijauMuda, ["Cocok"], 12), emo("ok", 226, 54, E.benar, 18)),
      tambah(idx(SUARA_W3, "merasakan"), emo("tp", 150, 112, E.tepuk, 28)),
      tambah(idx(SUARA_W3, "tubuh"), ...anak("an", 70, 128, "#F472B6", true)),
      tambah(idx(SUARA_W3, "telinga."), emo("te", 232, 116, E.telinga, 30)),
    ),
    k(
      SUARA_W4,
      bersih(0),
      tambah(0, ...kartu("kc", 50, 34, 200, 28, W.merahMuda, ["Kurang cocok"], 12), emo("no", 226, 54, E.salah, 18)),
      tambah(idx(SUARA_W4, "ramai,"), emo("o0", 50, 120, E.orang, 28), emo("o1", 100, 90, E.orang, 28), emo("o2", 250, 120, E.orang, 28), emo("o3", 200, 90, E.orang, 28)),
      tambah(idx(SUARA_W4, "tepuk"), emo("tp", 150, 124, E.tepuk, 22), ...gelombang("gw", 164, 116, 1, 5)),
      tambah(idx(SUARA_W4, "tidak"), emo("x2", 150, 150, E.salah, 22)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_G1 = "Kita sudah melihat tiga cara. Mana yang pas? Itu tergantung polanya.";
const SUARA_G2 = "Ingin melihat dan melanjutkan pola warna, pakai Pita Pola. Ingin membandingkan susunan dua pola, pakai Kode Huruf.";
const SUARA_G3 = "Ingin merasakan pola suara, pakai Tepuk Irama. Apa pun caranya, cari dulu satuan polanya.";
const SUARA_G4 = "Menurutmu, untuk menyalin pola manik merah, biru, merah, biru ke pita lain, kamu pilih cara yang mana?";
const WARNA_R = ["#BBF7D0", "#FDE68A", "#DDD6FE"];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara memeriksa pola",
  sumber: "Ringkasan metode global",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_G1,
      bersih(0),
      tambah(idx(SUARA_G1, "tiga"), teks("t3", 150, 36, "3 cara", 13, W.merah), ...kartu("r0", 14, 56, 200, 28, WARNA_R[0], [`1. ${NAMA_METODE_ID[0]}`], 10)),
      tambah(idx(SUARA_G1, "cara."), ...kartu("r1", 14, 96, 200, 28, WARNA_R[1], [`2. ${NAMA_METODE_ID[1]}`], 10)),
      tambah(idx(SUARA_G1, "Mana"), ...kartu("r2", 14, 136, 200, 28, WARNA_R[2], [`3. ${NAMA_METODE_ID[2]}`], 10)),
      tambah(idx(SUARA_G1, "pas?"), emo("qm", 254, 108, E.tanya, 40)),
    ),
    k(
      SUARA_G2,
      hapus(0, "qm"),
      tambah(idx(SUARA_G2, "warna,"), sel("sc0", 236, 70, 18, M.merah), sel("sc1", 258, 70, 18, M.biru)),
      sorotkan(idx(SUARA_G2, "Pita"), "r0-k"),
      tambah(idx(SUARA_G2, "dua"), teks("d2", 250, 112, "2 pola", 9, W.ungu)),
      redamkan(idx(SUARA_G2, "Kode"), "r0-k"),
      sorotkan(idx(SUARA_G2, "Kode"), "r1-k"),
    ),
    k(
      SUARA_G3,
      hapus(0, "sc0", "sc1", "d2"),
      redamkan(0, "r1-k"),
      tambah(idx(SUARA_G3, "suara,"), emo("tp", 250, 150, E.tepuk, 24)),
      sorotkan(idx(SUARA_G3, "Tepuk"), "r2-k"),
      tambah(idx(SUARA_G3, "satuan"), ...kartu("cs", 14, 168, 200, 24, W.krem, ["cari dulu satuan pola"], 9.6)),
    ),
    k(
      SUARA_G4,
      bersih(0),
      tambah(0, judul("Pilih Cara")),
      ...[M.merah, M.biru, M.merah, M.biru].map((c, i) => tambah(5 + i, manik(`ms${i}`, 40 + 40 * i, 60, 12, c))),
      tambah(idx(SUARA_G4, "ke"), panah("pn", 206, 60, 40, 0, W.hijau, 3)),
      tambah(idx(SUARA_G4, "lain,"), ...[0, 1, 2, 3].map((i) => selKosong(`pk${i}`, 40 + 40 * i, 106, 28))),
      tambah(idx(SUARA_G4, "kamu"), ...NAMA_METODE_ID.flatMap((n, i) => kartu(`c${i}`, 8 + i * 98, 138, 92, 26, WARNA_R[i], [n], 8.6))),
      tambah(idx(SUARA_G4, "mana?"), emo("qm", 262, 100, E.tanya, 32)),
    ),
  ],
};
