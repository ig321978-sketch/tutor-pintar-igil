import type { AdeganStory } from "./logika-story";
import { W, emo, garis, judul, kartu, kelinci, kotak, segitiga, teks } from "./k1b3c-gambar";
import { bersih, hapus, hitungMuncul, k, rangkai, redamkan, sorotkan, tambah, ubah } from "./k1b3c-bantu";

const ANAK = "\u{1F9D2}";
const IGIL = "\u{1F989}";
const TANAH = () => garis("tanah", 14, 152, 272, 0, W.hijau, 3);
const TEMAN: [string, number, string][] = [["Malosi", 28, "Malosi,"], ["Kira", 74, "Kira,"], ["Upe", 120, "Upe,"], ["Wei", 166, "Wei,"], ["Halim", 212, "Halim"]];

/* ------------------------------ 1. Cerita kelinci di kandang ------------------------------ */
const SUARA_C1 = "Pagi ini Malosi, Kira, Upe, Wei, dan Halim bermain di taman bersama Igil, si burung hantu. Di dekat mereka ada kandang kelinci.";
const SUARA_C2 = "Di dalam kandang ada kelinci cokelat. Ayo kita hitung kelinci cokelatnya: satu, dua, tiga, empat.";
const SUARA_C3 = "Di dalam kandang juga ada kelinci hitam. Ayo kita hitung kelinci hitamnya: satu, dua, tiga.";
const SUARA_C4 = "Igil bertanya, berapa jumlah semua kelinci? Kita jawab dengan menggabungkan kelinci cokelat dan kelinci hitam.";
const SUARA_C5 = "Hari ini kita belajar hal yang menarik. Penjumlahan dan pengurangan itu berhubungan, karena keduanya saling berkebalikan.";

export const ADEGAN_CERITA: AdeganStory = {
  id: "cerita-kelinci",
  judul: "Kelinci di kandang",
  sumber: "Materi: cerita kelinci di kandang",
  latar: "#ECFCCB",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Di taman"), TANAH()),
      ...TEMAN.map(([nama, x, pemicu]) => tambah(pemicu, emo(`a-${nama}`, x, 184, ANAK, 26), teks(`n-${nama}`, x, 197, nama, 8.4))),
      tambah("Igil,", emo("a-Igil", 266, 184, IGIL, 26), teks("n-Igil", 266, 197, "Igil", 8.4, W.ungu)),
      tambah("kandang", emo("rumah", 150, 126, "\u{1F3E0}", 60)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Kandang kelinci"), kotak("kd", 40, 64, 220, 104, "#FEF3C7", W.coklat, { rx: 8 })),
      ...hitungMuncul(SUARA_C2, "kb", [0, 1, 2, 3].map((i) => ({ x: 70 + 36 * i, y: 104 })), (i, p) => kelinci(`kc${i}`, p.x, p.y, false), "cokelatnya:"),
    ),
    k(SUARA_C3, ...hitungMuncul(SUARA_C3, "kh", [0, 1, 2].map((i) => ({ x: 70 + 36 * i, y: 150 })), (i, p) => kelinci(`kh${i}`, p.x, p.y, true), "hitamnya:")),
    k(
      SUARA_C4,
      tambah("bertanya,", ...kartu("ig", 14, 174, 220, 24, W.krem, ["Igil: Semua ada berapa kelinci?"], 9)),
      tambah("menggabungkan", emo("tanya", 270, 190, "\u{2753}", 24)),
    ),
    k(
      SUARA_C5,
      bersih(0),
      tambah(0, judul("Tambah dan kurang")),
      tambah("penjumlahan", ...kartu("hb1", 20, 40, 100, 44, W.hijauMuda, ["tambah"], 12)),
      tambah("pengurangan", ...kartu("hb2", 180, 40, 100, 44, W.pink, ["kurang"], 12)),
      tambah("berkebalikan.", emo("kb", 150, 70, "\u{2194}\u{FE0F}", 30), emo("hb3", 150, 140, IGIL, 44)),
    ),
  ],
};

/* ------------------------------ 2. Keluarga bilangan ------------------------------ */
const SUARA_K1 = "Kelinci cokelat ada empat. Kelinci hitam ada tiga. Kalau digabung, semuanya ada tujuh.";
const SUARA_K2 = "Empat, tiga, dan tujuh adalah satu keluarga bilangan. Ketiga bilangan ini saling berhubungan.";
const SUARA_K3 = "Bilangan yang paling besar ada di puncak. Itu adalah jumlah semuanya, yaitu tujuh. Dua bilangan lain ada di kaki segitiga.";
const SUARA_K4 = "Dari satu keluarga ini, kita bisa membuat empat kalimat. Ada dua kalimat penjumlahan, dan dua kalimat pengurangan.";
const SUARA_K5 = "Keluarga bilangan yang lain juga begitu. Misalnya tiga, dua, dan lima. Dari tiga bilangan ini lahir empat kalimat juga.";

export const ADEGAN_KELUARGA: AdeganStory = {
  id: "keluarga-bilangan",
  judul: "Keluarga bilangan",
  sumber: "Materi: keluarga bilangan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_K1,
      bersih(0),
      tambah(0, judul("Keluarga bilangan"), ...segitiga.garis()),
      tambah("empat.", ...segitiga.kiri("4")),
      tambah("tiga.", ...segitiga.kanan("3")),
      tambah("tujuh.", ...segitiga.puncak("7")),
    ),
    k(
      SUARA_K2,
      sorotkan("Empat,", "p1-k"),
      sorotkan("tiga,", "p2-k"),
      sorotkan("tujuh", "wh-k"),
      tambah("keluarga", ...kartu("kl", 50, 168, 200, 28, W.krem, ["keluarga bilangan"], 11)),
    ),
    k(SUARA_K3, redamkan(0, "p1-k", "p2-k"), sorotkan("puncak.", "wh-k"), redamkan("kaki", "wh-k"), sorotkan("kaki", "p1-k", "p2-k")),
    k(
      SUARA_K4,
      redamkan(0, "p1-k", "p2-k"),
      hapus(0, "kl-k", "kl-t0"),
      tambah("penjumlahan,", ...kartu("kt", 14, 168, 132, 28, W.hijauMuda, ["2 kalimat tambah"], 10)),
      tambah("pengurangan.", ...kartu("kr", 154, 168, 132, 28, W.pink, ["2 kalimat kurang"], 10)),
    ),
    k(
      SUARA_K5,
      hapus(0, "kt-k", "kt-t0", "kr-k", "kr-t0"),
      ubah("tiga,", { id: "p1-t0", isi: "3" }),
      ubah("dua,", { id: "p2-t0", isi: "2" }),
      ubah("lima.", { id: "wh-t0", isi: "5" }),
      tambah("lahir", emo("fm", 262, 184, "\u{1F46A}", 28)),
    ),
  ],
};

/* ------------------------------ 3. Dua kalimat penjumlahan ------------------------------ */
const SUARA_T1 = "Kita mulai dari kalimat penjumlahan. Empat kelinci cokelat ditambah tiga kelinci hitam sama dengan tujuh kelinci.";
const SUARA_T2 = "Sekarang bertukar tempat. Tiga kelinci hitam ditambah empat kelinci cokelat. Hasilnya tetap sama, yaitu tujuh.";
const SUARA_T3 = "Dua kalimat ini hasilnya sama. Jadi penjumlahan boleh bertukar tempat.";
const SUARA_T4 = "Dua kalimat penjumlahan ini sekeluarga, yaitu keluarga empat, tiga, dan tujuh.";

export const ADEGAN_TAMBAH: AdeganStory = {
  id: "dua-tambah",
  judul: "Dua kalimat penjumlahan",
  sumber: "Materi: dua kalimat penjumlahan",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_T1,
      bersih(0),
      tambah(0, judul("Penjumlahan pertama")),
      tambah("cokelat", ...[0, 1, 2, 3].flatMap((i) => kelinci(`ta${i}`, 30 + 30 * i, 84, false))),
      tambah("ditambah", teks("tp", 150, 84, "+", 22, W.biru)),
      tambah("hitam", ...[0, 1, 2].flatMap((i) => kelinci(`tb${i}`, 180 + 30 * i, 84, true))),
      ...rangkai(SUARA_T1, "r1", 146, ["4", "+", "3", "=", "7"], ["Empat", "ditambah", "tiga", "sama", "tujuh"], "penjumlahan."),
    ),
    k(
      SUARA_T2,
      hapus(0, ...[0, 1, 2, 3].flatMap((i) => [`ta${i}`, `ta${i}d`]), ...[0, 1, 2].flatMap((i) => [`tb${i}`, `tb${i}d`])),
      tambah("hitam", ...[0, 1, 2].flatMap((i) => kelinci(`tb${i}`, 30 + 30 * i, 84, true))),
      ubah("ditambah", { id: "tp", x: 130 }),
      tambah("cokelat.", ...[0, 1, 2, 3].flatMap((i) => kelinci(`ta${i}`, 160 + 30 * i, 84, false))),
      ...rangkai(SUARA_T2, "r2", 184, ["3", "+", "4", "=", "7"], ["Tiga", "ditambah", "empat", "sama", "tujuh."], "tempat."),
    ),
    k(SUARA_T3, tambah("hasilnya", emo("sw", 262, 120, "\u{1F504}", 28)), tambah("boleh", ...kartu("bt", 40, 104, 160, 24, W.hijauMuda, ["boleh bertukar tempat"], 9))),
    k(SUARA_T4, tambah("sekeluarga,", ...kartu("kf", 60, 28, 180, 22, W.krem, ["keluarga 4, 3, dan 7"], 10)), sorotkan("keluarga", "r10", "r12", "r14", "r20", "r22", "r24")),
  ],
};

/* ------------------------------ 4. Dua kalimat pengurangan ------------------------------ */
const SUARA_R1 = "Sekarang kita lihat pengurangan. Di kandang ada tujuh kelinci. Empat berwarna cokelat, dan tiga berwarna hitam.";
const SUARA_R2 = "Ketuk tiga kelinci hitam supaya pergi dari kandang. Satu, dua, tiga.";
const SUARA_R3 = "Yang tersisa di kandang adalah empat kelinci cokelat. Tujuh kurang tiga sama dengan empat.";
const SUARA_R4 = "Sekarang kelinci cokelat yang pergi. Ketuk empat kelinci cokelat. Satu, dua, tiga, empat.";
const SUARA_R5 = "Yang tersisa adalah tiga kelinci hitam. Tujuh kurang empat sama dengan tiga. Itu kalimat pengurangan yang kedua.";
const GRID7 = (i: number) => ({ x: 30 + 40 * i, y: 100 });
const KEL7 = (i: number, p: { x: number; y: number }) => kelinci(`kl${i}`, p.x, p.y, i >= 4);
const pudar = (hitam: boolean, op: number) => (hitam ? [4, 5, 6] : [0, 1, 2, 3]).flatMap((i) => [{ id: `kl${i}`, op }, { id: `kl${i}d`, op }]);

export const ADEGAN_KURANG: AdeganStory = {
  id: "dua-kurang",
  judul: "Dua kalimat pengurangan",
  sumber: "Materi: dua kalimat pengurangan",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_R1,
      bersih(0),
      tambah(0, judul("Pengurangan"), kotak("kd", 14, 62, 272, 72, "#FEF3C7", W.coklat, { rx: 8 })),
      tambah("tujuh", ...[0, 1, 2, 3, 4, 5, 6].flatMap((i) => KEL7(i, GRID7(i)))),
      tambah("hitam.", ...kartu("rk", 60, 150, 180, 24, W.krem, ["4 cokelat, 3 hitam"], 10)),
    ),
    k(SUARA_R2, hapus(0, "rk-k", "rk-t0"), ...hitungMuncul(SUARA_R2, "cr", [4, 5, 6].map(GRID7), (i, p) => emo(`xh${i}`, p.x, p.y, "\u{274C}", 24), "kandang.", false)),
    k(
      SUARA_R3,
      ubah(0, ...pudar(true, 0.3)),
      ...rangkai(SUARA_R3, "r3", 172, ["7", "−", "3", "=", "4"], ["Tujuh", "kurang", "tiga", "sama", "empat."], "cokelat."),
    ),
    k(
      SUARA_R4,
      hapus(0, "xh0", "xh1", "xh2", "r30", "r31", "r32", "r33", "r34"),
      ubah(0, ...pudar(true, 1)),
      ...hitungMuncul(SUARA_R4, "cb", [0, 1, 2, 3].map(GRID7), (i, p) => emo(`xc${i}`, p.x, p.y, "\u{274C}", 24), "cokelat.", false),
    ),
    k(
      SUARA_R5,
      ubah(0, ...pudar(false, 0.3)),
      ...rangkai(SUARA_R5, "r5", 172, ["7", "−", "4", "=", "3"], ["Tujuh", "kurang", "empat", "sama", "tiga."], "hitam."),
    ),
  ],
};

/* ------------------------------ 5. Satu keluarga, empat kalimat ------------------------------ */
const SUARA_E1 = "Satu keluarga, empat kalimat. Mari kita kumpulkan semuanya di satu tempat.";
const SUARA_E2 = "Dua kalimat penjumlahan: empat tambah tiga sama dengan tujuh, dan tiga tambah empat sama dengan tujuh.";
const SUARA_E3 = "Dua kalimat pengurangan: tujuh kurang tiga sama dengan empat, dan tujuh kurang empat sama dengan tiga.";
const SUARA_E4 = "Perhatikan! Bilangan yang dipakai selalu sama: empat, tiga, dan tujuh. Hanya urutannya yang berbeda.";
const SUARA_E5 = "Jadi, kalau kita tahu satu kalimat, kita bisa menemukan tiga kalimat yang lain. Hebat sekali!";
const POSISI_E: [number, number][] = [[14, 32], [154, 32], [14, 98], [154, 98]];
const WARNA_E = [W.hijauMuda, W.hijauMuda, W.pink, W.pink];

export const ADEGAN_EMPAT: AdeganStory = {
  id: "empat-kalimat",
  judul: "Satu keluarga, empat kalimat",
  sumber: "Materi: empat kalimat satu keluarga",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_E1, bersih(0), tambah(0, judul("Empat kalimat sekeluarga")), tambah("kumpulkan", ...POSISI_E.flatMap(([x, y], i) => kartu(`ek${i}`, x, y, 132, 56, WARNA_E[i], ["?"], 18)))),
    k(SUARA_E2, ubah("tujuh,", { id: "ek0-t0", isi: "4 + 3 = 7", u: 14 }), ubah("tujuh.", { id: "ek1-t0", isi: "3 + 4 = 7", u: 14 })),
    k(SUARA_E3, ubah("empat,", { id: "ek2-t0", isi: "7 − 3 = 4", u: 14 }), ubah("tiga.", { id: "ek3-t0", isi: "7 − 4 = 3", u: 14 })),
    k(SUARA_E4, sorotkan("Perhatikan!", "ek0-k", "ek1-k", "ek2-k", "ek3-k"), tambah("dipakai", teks("kb", 150, 178, "keluarga: 4, 3, 7", 11, W.merah))),
    k(SUARA_E5, redamkan(0, "ek0-k", "ek1-k", "ek2-k", "ek3-k"), tambah("Hebat", emo("ow", 150, 196, IGIL, 26))),
  ],
};
