import type { AdeganStory } from "./logika-story";
import { E, W, bulat, emo, judul, kardus, kartu, kotak, panahObj, teks, tongkat, xTongkat } from "./k1b1c-materi-gambar";
import { bersih, k, sorotkan, tambah, urutKata } from "./k1b1c-bantu";
import { WARNA_METODE, kepala } from "./k1b1c-luar-1";

/* Video metode global Sub-Bab C: Counting On (Hitung Lanjut), Counting Stick (Tongkat Hitung), dan ringkasan. */

/* ------------------------------ 4. Counting On: konsep ------------------------------ */
const SUARA_H1 = "Metode kedua, Counting On, atau Hitung Lanjut. Kita mulai dari angka yang sudah diketahui, tidak dari satu.";
const SUARA_H2 = "Kalau sudah tahu ada lima, lanjutkan saja: enam, tujuh, delapan.";
const SUARA_H3 = "Hitung lanjut juga bisa mundur. Dari delapan, mundur: tujuh, enam.";
const SUARA_H4 = "Cara ini lebih cepat daripada menghitung lagi dari awal.";
const titik = (i: number) => ({ x: 34 + i * 30, y: 100 });
const posLanjut = urutKata(SUARA_H2, ["enam,", "tujuh,", "delapan."]);

export const ADEGAN_LUAR_LANJUT: AdeganStory = {
  id: "luar-lanjut",
  judul: "Counting On: hitung lanjut",
  sumber: "Metode global: Counting On",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_H1, tambah("kedua,", ...kepala(1)), tambah("diketahui,", ...[0, 1, 2, 3, 4].map((i) => bulat(`hd${i}`, titik(i).x, titik(i).y, 10, "#60A5FA", W.biru))), tambah("diketahui,", kotak("hk", 18, 84, 148, 32, "#FFFFFF00", W.biru, { rx: 8, tebal: 2 }))),
    k(SUARA_H2, tambah("lima,", teks("h5", 92, 136, "5", 16, W.merah)), ...posLanjut.flatMap((p, i) => [tambah(p, bulat(`hd${5 + i}`, titik(5 + i).x, titik(5 + i).y, 10, "#F97316", W.biru), teks(`hn${i}`, titik(5 + i).x, 80, String(6 + i), 12, W.merah))])),
    k(SUARA_H3, tambah("mundur:", panahObj("pm", 244, 150, -60, 0, W.merah)), sorotkan("tujuh,", "hd6"), sorotkan("enam.", "hd5"), tambah("enam.", teks("hm", 214, 170, "8, 7, 6", 10, W.merah))),
    k(SUARA_H4, tambah("cepat", emo("ce", 150, 190, "\u{26A1}", 22))),
  ],
};

/* ------------------------------ 5. Counting On: terapan ------------------------------ */
const SUARA_T1 = "Di rak loteng sudah ada enam kardus. Abang membawa tiga kardus lagi.";
const SUARA_T2 = "Abang tidak menghitung dari satu. Ia mulai dari enam, lalu tujuh, delapan, sembilan.";
const SUARA_T3 = "Jadi sekarang ada sembilan kardus di rak loteng.";
const SUARA_T4 = "Mulai dari angka yang diketahui, lalu hitung lanjut. Mudah dan cepat.";
const xk = (i: number) => 26 + i * 28;
const posT = urutKata(SUARA_T2, ["tujuh,", "delapan,", "sembilan."]);

export const ADEGAN_LUAR_LANJUT_TERAPAN: AdeganStory = {
  id: "luar-lanjut-terapan",
  judul: "Counting On: kardus Abang",
  sumber: "Metode global: Counting On, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, ...kepala(1), kotak("rk", 8, 118, 284, 8, "#B45309", W.coklat, { rx: 2 })),
      tambah("enam", ...[0, 1, 2, 3, 4, 5].map((i) => emo(`kr${i}`, xk(i), 112, E.kardus, 22))),
      tambah("tiga", ...[0, 1, 2].map((i) => emo(`kb${i}`, 200 + i * 28, 176, E.kardus, 22)), emo("ab", 286, 176, E.abang, 20)),
    ),
    k(SUARA_T2, tambah("enam,", teks("t6", xk(5), 80, "6", 13, W.merah)), ...posT.map((p, i) => tambah(p, emo(`kr${6 + i}`, xk(6 + i), 112, E.kardus, 22), teks(`t${7 + i}`, xk(6 + i), 80, String(7 + i), 13, W.merah)))),
    k(SUARA_T3, tambah("sembilan", ...kartu("j9", 80, 136, 140, 24, W.emas, ["9 kardus"], 10))),
    k(SUARA_T4, tambah("hitung", ...kartu("jl", 50, 168, 200, 24, W.hijauMuda, ["mulai dari 6, bukan dari 1"], 9))),
  ],
};

/* ------------------------------ 6. Counting Stick: konsep ------------------------------ */
const SUARA_K1 = "Metode ketiga, Counting Stick, atau Tongkat Hitung. Tongkat ini punya sepuluh ruas berwarna.";
const SUARA_K2 = "Hanya nol, lima, dan sepuluh yang diberi angka. Angka lain kita hitung dari sana.";
const SUARA_K3 = "Kita boleh maju ke kanan, atau mundur ke kiri, sepanjang tongkat.";
const SUARA_K4 = "Tongkat hitung melatih menghitung maju dan mundur dari angka mana saja.";
const TX = 20;
const TY = 96;

export const ADEGAN_LUAR_TONGKAT: AdeganStory = {
  id: "luar-tongkat",
  judul: "Counting Stick: tongkat hitung",
  sumber: "Metode global: Counting Stick",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_K1, tambah("ketiga,", ...kepala(2)), tambah("Tongkat@2", ...tongkat("tk", TX, TY, [])), tambah("sepuluh", ...kartu("t10", 100, 150, 100, 22, W.emas, ["10 ruas"], 10))),
    k(SUARA_K2, tambah("nol,", teks("tkl0", xTongkat(TX, 0), TY + 34, "0", 10, W.biru)), tambah("lima,", teks("tkl5", xTongkat(TX, 5), TY + 34, "5", 10, W.biru)), tambah("sepuluh", teks("tkl10", xTongkat(TX, 10), TY + 34, "10", 10, W.biru))),
    k(SUARA_K3, tambah("kanan,", panahObj("pk", 160, 80, 90, 0, W.hijau)), tambah("kiri,", panahObj("pr", 140, 80, -90, 0, W.merah))),
    k(SUARA_K4, sorotkan("maju", "tk5", "tk6"), sorotkan("mundur", "tk4", "tk3"), tambah("mana", emo("ok", 150, 186, "\u{2705}", 22))),
  ],
};

/* ------------------------------ 7. Counting Stick: terapan ------------------------------ */
const SUARA_Q1 = "Kaka menempel tanda tanya pada dua tempat di tongkat.";
const SUARA_Q2 = "Tanda pertama ada di kanan lima. Hitung maju dari lima: enam, tujuh. Angkanya tujuh.";
const SUARA_Q3 = "Tanda kedua ada di kiri lima. Hitung mundur dari lima: empat, tiga. Angkanya tiga.";
const SUARA_Q4 = "Mulai dari angka yang terlihat, lalu hitung maju atau mundur.";
const lbl = (id: string, n: number, isi: string, warna: string = W.biru) => teks(id, xTongkat(TX, n), TY + 34, isi, 10, warna);
const posQ2 = urutKata(SUARA_Q2, ["enam,", "tujuh."]);
const posQ3 = urutKata(SUARA_Q3, ["empat,", "tiga."]);

export const ADEGAN_LUAR_TONGKAT_TERAPAN: AdeganStory = {
  id: "luar-tongkat-terapan",
  judul: "Counting Stick: tanda tanya Kaka",
  sumber: "Metode global: Counting Stick, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_Q1, tambah(0, ...kepala(2), ...tongkat("tk", TX, TY, [0, 5, 10])), tambah("tanda", lbl("q7", 7, "?", W.merah), lbl("q3", 3, "?", W.merah))),
    k(SUARA_Q2, ...posQ2.map((p, i) => tambah(p, teks(`m${i}`, xTongkat(TX, 6 + i), TY - 8, String(6 + i), 10, W.hijau))), tambah("Angkanya", lbl("q7", 7, "7", W.hijau))),
    k(SUARA_Q3, ...posQ3.map((p, i) => tambah(p, teks(`d${i}`, xTongkat(TX, 4 - i), TY - 8, String(4 - i), 10, W.merah))), tambah("Angkanya", lbl("q3", 3, "3", W.merah))),
    k(SUARA_Q4, tambah("terlihat,", ...kartu("qt", 40, 160, 220, 24, W.emas, ["mulai dari 0, 5, atau 10"], 9.4))),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_R1 = "Kita sudah melihat tiga metode global untuk menghitung maju dan mundur.";
const SUARA_R2 = "Number Track: petak sesudahnya maju, petak sebelumnya mundur.";
const SUARA_R3 = "Counting On: mulai dari angka yang diketahui, lalu hitung lanjut.";
const SUARA_R4 = "Counting Stick: hitung maju atau mundur dari nol, lima, atau sepuluh.";
const RINGKAS = ["sesudah maju, sebelum mundur", "mulai dari angka yang diketahui", "hitung dari 0, 5, atau 10"];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode global",
  sumber: "Ringkasan metode global",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Ringkasan")), tambah("tiga", emo("rk", 150, 96, E.bintang, 44)), tambah("maju", ...kartu("rt", 60, 124, 180, 26, W.emas, ["3 metode global"], 10))),
    k(SUARA_R2, bersih(0), tambah(0, judul("Ringkasan")), tambah("Number", ...kartu("r0", 14, 34, 272, 44, WARNA_METODE[0], ["Number Track", RINGKAS[0]], 9.4))),
    k(SUARA_R3, tambah("Counting", ...kartu("r1", 14, 86, 272, 44, WARNA_METODE[1], ["Counting On", RINGKAS[1]], 9.4))),
    k(SUARA_R4, tambah("Stick:", ...kartu("r2", 14, 138, 272, 44, WARNA_METODE[2], ["Counting Stick", RINGKAS[2]], 9.4))),
  ],
};

/** Kardus bernomor dipakai uji. */
export const KARDUS = kardus;
