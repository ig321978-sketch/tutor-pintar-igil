import type { AdeganStory, Obj } from "./logika-story";
import { E, W, deret, deretEmo, emo, judul, kalimat, kartu, orang, pesan, teks } from "./k1b2c-gambar";
import { bersih, hitungMainan, k, sorotkan, tambah, ubah } from "./k1b2c-bantu";

/* Video metode global Sub-Bab C "Pesanan Tetangga": pembuka dan Act It Out (Peragakan). */

export const NAMA_METODE = ["Act It Out", "Read-Draw-Write", "Bar Model"];
export const NAMA_METODE_ID = ["Peragakan", "Baca-Gambar-Tulis", "Model Batang"];
export const WARNA_METODE = [W.pink, W.hijauMuda, W.langit];
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka ------------------------------ */
const SUARA_O1 = "Semua pesanan sudah terkirim. Igil bertanya, bagaimana anak-anak di negara lain menyelesaikan soal cerita? Kita lihat tiga metode global.";
const SUARA_O2 = "Tiga metode itu: Act It Out, Read-Draw-Write, dan Bar Model.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Peragakan, Baca-Gambar-Tulis, dan Model Batang.";
const SUARA_O4 = "Semua metode membantu kita memahami cerita sebelum menghitung.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode global untuk soal cerita",
  sumber: "Metode global: pembuka",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode global"), emo("ps", 150, 96, E.ponsel, 40)), tambah("Igil", ...orang("ig", 40, 120, E.igil, "Igil")), tambah("negara", emo("gl", 250, 110, "\u{1F30D}", 44)), tambah("tiga", ...kartu("pk", 50, 146, 200, 32, W.emas, ["3 metode global"], 11))),
    k(SUARA_O2, bersih(0), tambah(0, judul("Tiga metode")), ...NAMA_METODE.map((m, i) => tambah(["Act", "Read-Draw-Write,", "Model."][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11)))),
    k(SUARA_O3, bersih(0), tambah(0, judul("Nama dalam bahasa Indonesia")), ...NAMA_METODE_ID.map((m, i) => tambah(["Peragakan,", "Baca-Gambar-Tulis,", "Batang."][i], ...kartu(`n${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11)))),
    k(SUARA_O4, bersih(0), tambah(0, judul("Pahami dulu ceritanya")), tambah("memahami", emo("kc", 150, 100, E.kaca, 40)), tambah("menghitung.", teks("hb", 150, 150, "pahami, baru hitung", 12, W.merah))),
  ],
};

/* ------------------------------ 2. Act It Out: konsep ------------------------------ */
const SUARA_A1 = "Metode pertama, Act It Out, atau Peragakan. Kita memerankan cerita dengan benda sungguhan.";
const SUARA_A2 = "Taruh benda sebanyak bilangan pertama. Lalu tambahkan benda sebanyak bilangan kedua.";
const SUARA_A3 = "Sesudah itu, hitung semua benda yang ada di meja.";
const SUARA_A4 = "Dengan memeragakan, kita melihat sendiri apa yang terjadi dalam cerita.";

export const ADEGAN_LUAR_PERAGA: AdeganStory = {
  id: "luar-peraga",
  judul: "Act It Out: peragakan",
  sumber: "Metode global: Act It Out",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_A1, tambah("pertama,", ...kepala(0)), tambah("memerankan", emo("tg", 150, 100, "\u{1F450}", 40))),
    k(SUARA_A2, tambah("pertama.", ...deretEmo(E.bawang, "ba", deret(3, 60, 26, 150), 20)), tambah("kedua.", ...deretEmo(E.bawang, "bb", deret(2, 190, 26, 150), 20))),
    k(SUARA_A3, tambah("meja.", { id: "mj", t: "kotak", x: 30, y: 160, w: 240, h: 10, warna: "#F59E0B", garis: W.coklat, rx: 3, tebal: 1.6, z: -1 }), sorotkan("semua", "ba0", "ba1", "ba2", "bb0", "bb1")),
    k(SUARA_A4, tambah("melihat", emo("mt", 262, 70, "\u{1F440}", 26))),
  ],
};

/* ------------------------------ 3. Act It Out: terapan ------------------------------ */
const ISI = "Ada tiga bawang di meja. Kaka menaruh dua bawang lagi. Berapa bawang semuanya?";
const SUARA_P1 = "Ceritanya: ada tiga bawang di meja, lalu Kaka menaruh dua bawang lagi.";
const SUARA_P2 = "Abang memeragakan dengan bawang sungguhan. Satu, dua, tiga, empat, lima.";
const SUARA_P3 = "Tiga ditambah dua sama dengan lima. Jadi, ada lima bawang.";
const SUARA_P4 = "Memeragakan membuat cerita mudah dipahami. Kita bisa memakai benda apa saja yang ada di rumah.";
const BAWANG = deret(5, 70, 40, 150);

export const ADEGAN_LUAR_PERAGA_TERAPAN: AdeganStory = {
  id: "luar-peraga-terapan",
  judul: "Act It Out: bawang di meja",
  sumber: "Metode global: Act It Out, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_P1, tambah(0, ...kepala(0)), tambah("Ceritanya:", ...pesan("ps", 20, 54, 260, ISI, 10.5)), tambah("tiga", ...deretEmo(E.bawang, "bw", BAWANG.slice(0, 3), 22)), tambah("dua", ...BAWANG.slice(3).map((p, i) => emo(`bw${3 + i}`, p.x, p.y, E.bawang, 22)))),
    k(SUARA_P2, ...hitungMainan(SUARA_P2, "bw", BAWANG, 22, "sungguhan.")),
    k(SUARA_P3, ubah(0, { id: "tg", x: 262, y: 186 }), tambah("Tiga", ...kalimat("kl", 150, 196, ["3", "+", "2", "=", "5"], 14, 22)), tambah("Jadi,", ...kartu("jw", 14, 172, 90, 22, W.hijauMuda, ["5 bawang"], 10))),
    k(SUARA_P4, tambah("mudah", emo("sn", 262, 60, E.senyum, 24)), tambah("rumah.", emo("rm", 262, 130, E.rumah, 24))),
  ],
};
