import type { AdeganStory, Obj } from "./logika-story";
import { E, W, deret, deretEmo, emo, judul, kalimat, kartu, lompat, orang, pagar, teks, xPagar } from "./k1b2b-gambar";
import { bersih, k, sorotkan, tambah, ubah, urutKata } from "./k1b2b-bantu";

/* Video metode global Sub-Bab B "Panen Pertama dan Keranjang Sepuluh": pembuka dan Number Line (Garis Bilangan). */

export const NAMA_METODE = ["Number Line", "Doubles", "Make Ten"];
export const NAMA_METODE_ID = ["Garis Bilangan", "Penjumlahan Kembar", "Membuat Sepuluh"];
export const WARNA_METODE = [W.langit, W.pink, W.hijauMuda];
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka ------------------------------ */
const SUARA_O1 = "Panen sudah dikemas. Abang bercerita, anak-anak di negara lain juga punya cara cepat untuk menjumlah. Kita lihat tiga metode global.";
const SUARA_O2 = "Tiga metode itu: Number Line, Doubles, dan Make Ten.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Garis Bilangan, Penjumlahan Kembar, dan Membuat Sepuluh.";
const SUARA_O4 = "Semua metode membantu kita menjumlah tanpa menghitung satu per satu dari awal.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode global untuk cara cepat menjumlah",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode global"), emo("kj", 150, 96, E.keranjang, 40)), tambah("Abang", ...orang("ab", 40, 120, E.abang, "Abang")), tambah("negara", emo("gl", 250, 110, "\u{1F30D}", 44)), tambah("tiga", ...kartu("pk", 50, 146, 200, 32, W.emas, ["3 metode global"], 11))),
    k(SUARA_O2, bersih(0), tambah(0, judul("Tiga metode")), ...NAMA_METODE.map((m, i) => tambah(["Line,", "Doubles,", "Ten."][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11)))),
    k(SUARA_O3, bersih(0), tambah(0, judul("Nama dalam bahasa Indonesia")), ...NAMA_METODE_ID.map((m, i) => tambah(["Garis", "Kembar,", "Membuat"][i], ...kartu(`n${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11)))),
    k(SUARA_O4, bersih(0), tambah(0, judul("Cara cepat")), tambah("menjumlah", emo("jm", 150, 100, E.jam, 40)), tambah("satu", teks("bk", 150, 150, "tidak perlu dari 1", 12, W.merah))),
  ],
};

/* ------------------------------ 2. Number Line: konsep ------------------------------ */
const SUARA_N1 = "Metode pertama, Number Line, atau Garis Bilangan. Angka berjajar urut dari nol sampai sepuluh.";
const SUARA_N2 = "Taruh jari di bilangan pertama. Lalu melompat ke kanan sebanyak bilangan kedua.";
const SUARA_N3 = "Tiap lompatan maju satu. Angka tempat kita mendarat adalah hasilnya.";
const SUARA_N4 = "Garis bilangan mirip pagar bernomor di kebun Mamah.";
const G = { x0: 20, y: 110, s: 26 };

export const ADEGAN_LUAR_GARIS: AdeganStory = {
  id: "luar-garis",
  judul: "Number Line: garis bilangan",
  sumber: "Metode global: Number Line",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_N1, tambah("pertama,", ...kepala(0)), tambah("Angka", ...pagar("gb", G.x0, G.y, G.s, W.biru)), sorotkan("nol", "gba0"), sorotkan("sepuluh.", "gba10")),
    k(SUARA_N2, tambah("jari", emo("jr", xPagar(G.x0, 2, G.s), G.y - 26, "\u{1F446}", 20)), tambah("melompat", lompat("l0", G.x0, G.y, 2, G.s)), tambah("kedua.", ...kartu("cth", 100, 56, 100, 22, W.emas, ["2 + 1"], 11))),
    k(SUARA_N3, ubah("maju", { id: "jr", x: xPagar(G.x0, 3, G.s) }), sorotkan("mendarat", "gba3"), ubah("hasilnya.", { id: "cth-t0", isi: "2 + 1 = 3" })),
    k(SUARA_N4, tambah("pagar", emo("pg", 262, 172, "\u{1F33F}", 20)), tambah("Mamah.", teks("pm", 150, 172, "seperti pagar kebun", 10, W.hijau))),
  ],
};

/* ------------------------------ 3. Number Line: terapan ------------------------------ */
const SUARA_T1 = "Kaka memetik lima terong, lalu empat terong lagi.";
const SUARA_T2 = "Mulai dari lima di garis bilangan. Lompat empat kali: enam, tujuh, delapan, sembilan.";
const SUARA_T3 = "Kita mendarat di sembilan. Jadi ada sembilan terong.";
const SUARA_T4 = "Kalimatnya, lima ditambah empat sama dengan sembilan.";
const posT2 = urutKata(SUARA_T2, ["enam,", "tujuh,", "delapan,", "sembilan."], "kali:");

export const ADEGAN_LUAR_GARIS_TERAPAN: AdeganStory = {
  id: "luar-garis-terapan",
  judul: "Number Line: lima terong dan empat lagi",
  sumber: "Metode global: Number Line, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_T1, tambah(0, ...kepala(0)), tambah("lima", ...deretEmo(E.terong, "tr", deret(5, 30, 26, 70), 20)), tambah("empat", ...deretEmo(E.terong, "ts", deret(4, 180, 26, 70), 20))),
    k(
      SUARA_T2,
      tambah("Mulai", ...pagar("gb", G.x0, 128, G.s, W.biru), emo("jr", xPagar(G.x0, 5, G.s), 102, "\u{1F446}", 18)),
      ...posT2.map((p, i) => tambah(p, lompat(`l${i}`, G.x0, 128, 5 + i, G.s))),
      ...posT2.map((p, i) => ubah(p, { id: "jr", x: xPagar(G.x0, 6 + i, G.s) })),
    ),
    k(SUARA_T3, sorotkan("sembilan.", "gba9"), tambah("Jadi", ...kartu("sm", 14, 84, 90, 22, W.emas, ["9 terong"], 10))),
    k(SUARA_T4, tambah("lima", ...kalimat("kl", 150, 186, ["5", "+", "4", "=", "9"], 16, 24))),
  ],
};
