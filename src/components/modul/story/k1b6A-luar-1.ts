import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, bulat, emo, garisBilangan, judul, kartu, kartuAngka, lompat, lompatMundur, teks, xBil } from "./k1b6A-gambar";
import { bersih, hapus, idx, k, redamkan, sorotkan, tambah } from "./k1b6A-bantu";
import { pilihanBil } from "./k1b6A-materi-4";

export const NAMA_METODE_ID = ["Maju dan Mundur", "Pasangan sampai 20", "Menjadikan Sepuluh"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara mengajarkan cara mencari selisih yang berbeda-beda. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Maju dan Mundur, Pasangan sampai dua puluh, dan Menjadikan Sepuluh.";
const SUARA_O3 = "Semua metode ini menjawab satu pertanyaan. Bagaimana mencari selisih dua bilangan dengan cepat dan benar?";
const SUARA_O4 = "Kita akan melihat tiap metode dengan garis bilangan dan kotak titik. Kamu cukup mengetuk dan melihat layar dengan teliti.";
const SUARA_O5 = "Semua contoh memakai bilangan sampai dua puluh. Siap? Ayo kita mulai dengan metode pertama.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk mencari selisih",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)), tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      ...NAMA_METODE_ID.map((m, i) => tambah(["Maju", "Pasangan", "Menjadikan"][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah("satu", emo("i1", 60, 84, "⚖️", 34), emo("i2", 150, 84, "❓", 34), emo("i3", 240, 84, "\u{1F440}", 34)),
      tambah("Bagaimana", ...kartu("iq", 20, 112, 260, 52, W.emas, ["bagaimana mencari selisih", "dua bilangan", "dengan cepat dan benar?"], 10)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Alat bantu hari ini")),
      tambah("garis", ...garisBilangan(100)),
      tambah("titik.", bulat("ot0", 120, 150, 9, W.merah, W.merah), bulat("ot1", 150, 150, 9, W.merah, W.merah), bulat("ot2", 180, 150, 9, W.biru, W.biru)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Bilangan sampai dua puluh")),
      ...[7, 9, 12, 15].map((n, i) => tambah(0, ...kartuAngka(`ob${i}`, 20 + i * 66, 50, String(n), [W.krem, W.langit, W.hijauMuda, W.pink][i], 54, 36, 18))),
      tambah("dua", ...kartuAngka("ob4", 124, 100, "20", W.emas, 52, 36, 20)),
      tambah("pertama.", emo("ow", 150, 168, OWL, 30)),
    ),
  ],
};

/* ------------------------------ 2. Maju dan Mundur: konsep ------------------------------ */
const SUARA_A1 = "Metode pertama bernama Maju dan Mundur. Kita mencari selisih dengan melangkah di garis bilangan.";
const SUARA_A2 = "Mulai dari bilangan yang kecil, yaitu enam. Lalu melangkah maju ke kanan sampai bilangan yang besar, yaitu sembilan.";
const SUARA_A3 = "Satu, dua, tiga. Tiga langkah maju. Jadi selisih enam dan sembilan adalah tiga.";
const SUARA_A4 = "Kita juga bisa mundur. Mulai dari sembilan, lalu melangkah mundur ke kiri sampai enam. Tiga langkah mundur, selisihnya tetap tiga.";
const SUARA_A5 = "Maju untuk menambah, mundur untuk mengurangi. Enam ditambah tiga sama dengan sembilan. Sembilan dikurangi tiga sama dengan enam.";
const SUARA_A6 = "Ucapkan lagi mengikuti suara guru. Maju atau mundur, selisihnya tetap tiga.";
export const GY = 90;

export const ADEGAN_LUAR_MAJU: AdeganStory = {
  id: "luar-maju",
  judul: "Maju dan Mundur: melangkah di garis bilangan",
  sumber: "Metode luar: Maju dan Mundur",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_A1, tambah("pertama", ...kepala(0)), tambah("garis", ...garisBilangan(GY))),
    k(
      SUARA_A2,
      sorotkan("enam,", "gb-n6"),
      tambah("kecil,", teks("kc", xBil(6), 62, "kecil", 9.2, W.ungu)),
      sorotkan("sembilan.", "gb-n9"),
      tambah("besar,", teks("bs", xBil(9), 62, "besar", 9.2, W.ungu)),
    ),
    k(
      SUARA_A3,
      tambah(0, lompat("mj1", 6, 7, GY)),
      tambah(1, lompat("mj2", 7, 8, GY)),
      tambah(2, lompat("mj3", 8, 9, GY)),
      tambah("Jadi", ...kartu("sd", 100, 150, 100, 26, W.emas, ["selisih: 3"], 10)),
    ),
    k(SUARA_A4, tambah(11, lompatMundur("mn1", 9, 8, GY)), tambah(12, lompatMundur("mn2", 8, 7, GY)), tambah(13, lompatMundur("mn3", 7, 6, GY))),
    k(SUARA_A5, hapus(0, "sd-k", "sd-t0"), tambah(idx(SUARA_A5, "Enam"), ...kartu("ma", 14, 150, 132, 28, W.hijauMuda, ["6 + 3 = 9"], 10)), tambah("dikurangi", ...kartu("mb", 154, 150, 132, 28, W.merahMuda, ["9 - 3 = 6"], 10))),
    k(SUARA_A6, redamkan(0, "gb-n6", "gb-n9"), tambah("Ucapkan", emo("ucap", 150, 192, "\u{1F5E3}", 24))),
  ],
};

/* ------------------------------ 3. Maju dan Mundur: terapan ------------------------------ */
const SUARA_B1 = "Terapkan pada delapan dan dua belas. Berapa selisihnya? Kita maju dari delapan.";
const SUARA_B2 = "Satu, dua, tiga, empat. Kita melangkah maju empat kali, dari delapan sampai dua belas.";
const SUARA_B3 = "Empat langkah, jadi selisih delapan dan dua belas adalah empat. Dua belas dikurangi delapan sama dengan empat.";
const SUARA_B4 = "Coba pilih jawabannya. Tiga, empat, atau lima? Ketuk bilangan yang tepat.";

export const ADEGAN_LUAR_MAJU_TERAPAN: AdeganStory = {
  id: "luar-maju-terapan",
  judul: "Maju dan Mundur: delapan dan dua belas",
  sumber: "Metode luar: Maju dan Mundur, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_B1, tambah("Terapkan", ...kepala(0), ...garisBilangan(GY)), sorotkan("delapan", "gb-n8"), sorotkan("belas", "gb-n12")),
    k(SUARA_B2, tambah(0, lompat("mt1", 8, 9, GY)), tambah(1, lompat("mt2", 9, 10, GY)), tambah(2, lompat("mt3", 10, 11, GY)), tambah(3, lompat("mt4", 11, 12, GY))),
    k(SUARA_B3, tambah("Dua@2", ...kartu("mc", 70, 150, 160, 30, W.krem, ["12 - 8 = 4"], 13))),
    k(SUARA_B4, hapus(0, "mc-k", "mc-t0"), tambah("pilih", ...pilihanBil(146, ["3", "4", "5"])), sorotkan("empat,", "c2-k")),
  ],
};
