import type { AdeganStory } from "./logika-story";
import { ANAK_EMO, W, bagan, benda, bingkai, bulat, emo, garisBilangan, idBingkai, idKartu, judul, kartu, kotak, lompat, pusatSel, teks, xBil } from "./k1b6C-gambar";
import { bersih, hapus, idx, k, redamkan, sorotkan, tambah, ubah, urutMundur } from "./k1b6C-bantu";

/* ------------------------------ 1. Garis bilangan: mundur ke kiri ------------------------------ */
const SUARA_G1 = "Sekarang kita lihat di garis bilangan. Garis bilangan menunjukkan bilangan dari sepuluh sampai dua puluh.";
const SUARA_G2 = "Katak mulai dari lima belas. Dia akan melompat mundur ke kiri, tiga kali.";
const SUARA_G3 = "Lompat pertama, ke empat belas. Lompat kedua, ke tiga belas. Lompat ketiga, ke dua belas.";
const SUARA_G4 = "Katak mendarat di dua belas. Jadi lima belas dikurangi tiga sama dengan dua belas.";
const SUARA_G5 = "Sekarang mulai dari sembilan belas, dan mundur lima kali. Katak siap melompat lagi.";
const SUARA_G6 = "Delapan belas, tujuh belas, enam belas, lima belas, empat belas. Lima lompatan ke kiri.";
const SUARA_G7 = "Katak mendarat di empat belas. Jadi sembilan belas dikurangi lima sama dengan empat belas.";
const YG = 112;
const hop = (suara: string, dari: number, sampai: number) => {
  const pos = urutMundur(suara, dari, sampai);
  return pos.flatMap((p, q) => [tambah(p, lompat(`lp${dari - q}`, dari - q + 1, dari - q, YG)), ubah(p, { id: "kt", x: xBil(dari - q) })]);
};

export const ADEGAN_GARIS: AdeganStory = {
  id: "garis-mundur",
  judul: "Mundur di garis bilangan",
  sumber: "Materi: mundur di garis bilangan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Garis bilangan")), tambah("menunjukkan", ...garisBilangan(YG))),
    k(
      SUARA_G2,
      tambah("Katak", emo("kt", xBil(15), 88, "\u{1F438}", 26)),
      tambah("lima", ...kartu("gk", 90, 34, 120, 22, W.emas, ["15 - 3 = ?"], 11)),
      sorotkan("lima", "gb-n15"),
    ),
    k(SUARA_G3, redamkan(0, "gb-n15"), ...hop(SUARA_G3, 14, 12)),
    k(
      SUARA_G4,
      hapus(0, ...idKartu("gk")),
      tambah("Jadi", ...kartu("gh", 90, 34, 120, 22, W.hijauMuda, ["15 - 3 = 12"], 11)),
      sorotkan("mendarat", "gb-n12"),
    ),
    k(
      SUARA_G5,
      hapus(0, "lp14", "lp13", "lp12", ...idKartu("gh")),
      redamkan(0, "gb-n12"),
      ubah("mundur", { id: "kt", x: xBil(19) }),
      tambah("sembilan", ...kartu("gm", 90, 34, 120, 22, W.emas, ["19 - 5 = ?"], 11)),
      sorotkan("sembilan", "gb-n19"),
    ),
    k(SUARA_G6, redamkan(0, "gb-n19"), ...hop(SUARA_G6, 18, 14)),
    k(
      SUARA_G7,
      hapus(0, ...idKartu("gm")),
      tambah("Jadi", ...kartu("gn", 90, 34, 120, 22, W.hijauMuda, ["19 - 5 = 14"], 11)),
      sorotkan("mendarat", "gb-n14"),
    ),
  ],
};

/* ------------------------------ 2. Bolu kukus: kotak sepuluh tidak disentuh ------------------------------ */
const SUARA_B1 = "Ibu membeli tiga belas bolu kukus. Sepuluh bolu rapi di dalam kotak, dan tiga bolu lepas di luar.";
const SUARA_B2 = "Malosi lapar. Dia memakan dua bolu. Seret dua bolu lepas ke perut Malosi.";
const SUARA_B3 = "Kotak sepuluh tidak disentuh. Hanya bolu lepas yang berkurang. Tiga dikurangi dua sama dengan satu.";
const SUARA_B4 = "Tinggal satu bolu lepas. Kotak sepuluh digabung dengan satu bolu itu. Sepuluh ditambah satu sama dengan sebelas.";
const SUARA_B5 = "Jadi tiga belas dikurangi dua sama dengan sebelas. Sisa bolu kukus Ibu ada sebelas.";
const SUARA_B6 = "Ayo hitung untuk memastikan. Kotak sudah sepuluh. Ketuk bolu lepas yang tinggal, sebelas.";
const SUARA_B7 = "Ucapkan lagi mengikuti suara guru. Tiga belas dikurangi dua sama dengan sebelas.";
export const BKX = 85;
export const BKY = 50;
const LEPAS = [100, 150, 200].map((x) => ({ x, y: 128 }));

export const ADEGAN_BOLU: AdeganStory = {
  id: "bolu-kukus",
  judul: "Bolu kukus Ibu dan Malosi",
  sumber: "Materi: bolu kukus Ibu",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Bolu kukus Ibu")),
      tambah("tiga", ...kartu("bt", 110, 26, 80, 18, W.krem, ["13 bolu"], 9)),
      tambah("Sepuluh", teks("c10", 150, 112, "10", 11, W.merah), ...bingkai("bk", BKX, BKY), ...Array.from({ length: 10 }, (_, i) => benda("bolu", `bo${i}`, pusatSel(i, BKX, BKY).x, pusatSel(i, BKX, BKY).y, 9)).flat()),
      tambah("tiga@2", ...LEPAS.flatMap((p, i) => benda("bolu", `bo${10 + i}`, p.x, p.y, 9))),
    ),
    k(
      SUARA_B2,
      hapus(0, ...idKartu("bt")),
      tambah("Malosi", emo("a-Malosi", 262, 64, ANAK_EMO, 30), teks("n-Malosi", 262, 84, "Malosi", 8.6), kotak("pr", 236, 96, 52, 52, W.pink, W.biru, { rx: 8 }), teks("prt", 262, 162, "perut", 8.6)),
      sorotkan("Seret", "bo10", "bo11"),
      ubah("perut", { id: "bo10", x: 250, y: 114, sorot: false }, { id: "bo11", x: 274, y: 114, sorot: false }),
    ),
    k(
      SUARA_B3,
      sorotkan("Kotak", ...idBingkai("bk")),
      tambah("Tiga", ...kartu("b3", 80, 168, 140, 24, W.krem, ["3 - 2 = 1"], 11)),
    ),
    k(
      SUARA_B4,
      redamkan(0, ...idBingkai("bk")),
      hapus(0, ...idKartu("b3")),
      sorotkan("Tinggal", "bo12"),
      tambah(idx(SUARA_B4, "Sepuluh", 2), ...kartu("b4", 80, 168, 140, 24, W.langit, ["10 + 1 = 11"], 11)),
    ),
    k(
      SUARA_B5,
      redamkan(0, "bo12"),
      hapus(0, ...idKartu("b4")),
      tambah("Jadi", ...kartu("b5", 80, 168, 140, 24, W.emas, ["13 - 2 = 11"], 12)),
    ),
    k(
      SUARA_B6,
      sorotkan("sepuluh", "c10"),
      tambah("sebelas,", teks("c11", 200, 114, "11", 12, W.merah)),
      sorotkan("sebelas,", "bo12"),
    ),
    k(
      SUARA_B7,
      redamkan(0, "bo12"),
      tambah("Ucapkan", emo("ucap", 34, 180, "\u{1F5E3}", 26)),
      sorotkan("Tiga", "b5-k"),
    ),
  ],
};

/* ------------------------------ 3. Pasangan bilangan: sepuluh dan satuan ------------------------------ */
const SUARA_P1 = "Cara kedua, pasangan bilangan. Satu bilangan besar bisa dipisah menjadi dua pasangan.";
const SUARA_P2 = "Lima belas dipisah menjadi sepuluh dan lima. Sepuluh pasangan pertama, lima pasangan kedua.";
const SUARA_P3 = "Sekarang lihat pasangan yang lima. Lima dikurangi tiga sama dengan dua. Sepuluh kita biarkan dulu.";
const SUARA_P4 = "Dua ini adalah sisa dari lima. Sekarang kita gabungkan lagi dengan sepuluh.";
const SUARA_P5 = "Sekarang jumlahkan. Sepuluh ditambah dua sama dengan dua belas.";
const SUARA_P6 = "Jadi lima belas dikurangi tiga sama dengan dua belas. Hasilnya sama dengan cara menghitung mundur.";
const SUARA_P7 = "Coba satu lagi. Delapan belas apel, empat apel pergi. Delapan belas dipisah menjadi sepuluh dan delapan.";
const SUARA_P8 = "Delapan dikurangi empat sama dengan empat. Sepuluh ditambah empat sama dengan empat belas. Jadi delapan belas dikurangi empat sama dengan empat belas.";

export const ADEGAN_PASANGAN: AdeganStory = {
  id: "pasangan-bilangan",
  judul: "Pasangan bilangan: sepuluh dan satuan",
  sumber: "Materi: pasangan bilangan",
  latar: "#F5F3FF",
  ketukan: [
    k(SUARA_P1, tambah(0, judul("Pasangan bilangan")), tambah("bilangan", ...bagan("pb", "15", "?", "?", 40))),
    k(
      SUARA_P2,
      ubah("sepuluh", { id: "pbat", isi: "10" }),
      ubah(idx(SUARA_P2, "lima", 2), { id: "pbbt", isi: "5" }),
    ),
    k(
      SUARA_P3,
      sorotkan("pasangan", "pbb"),
      tambah("Lima@2", ...kartu("pe", 14, 138, 130, 24, W.krem, ["5 - 3 = 2"], 11)),
    ),
    k(
      SUARA_P4,
      redamkan(0, "pbb"),
      tambah("Dua", teks("pna", 226, 108, "→", 14, W.ungu), bulat("pn2", 252, 102, 14, W.emas, W.biru), teks("pn2t", 252, 108, "2", 16, W.merah)),
      sorotkan("sepuluh", "pba"),
    ),
    k(
      SUARA_P5,
      redamkan(0, "pba"),
      tambah("Sepuluh", ...kartu("pj", 156, 138, 130, 24, W.langit, ["10 + 2 = 12"], 11)),
    ),
    k(SUARA_P6, tambah("Jadi", ...kartu("pk", 60, 170, 180, 24, W.emas, ["15 - 3 = 12"], 12))),
    k(
      SUARA_P7,
      bersih(0),
      tambah(0, judul("Pasangan bilangan lagi")),
      tambah("dipisah", ...bagan("qb", "18", "10", "8", 40)),
      sorotkan("dipisah", "qbu"),
    ),
    k(
      SUARA_P8,
      redamkan(0, "qbu"),
      tambah(0, ...kartu("qe", 14, 138, 130, 24, W.krem, ["8 - 4 = 4"], 11)),
      tambah("Sepuluh", ...kartu("qj", 156, 138, 130, 24, W.langit, ["10 + 4 = 14"], 11)),
      tambah("Jadi", ...kartu("qk", 60, 170, 180, 24, W.emas, ["18 - 4 = 14"], 12)),
    ),
  ],
};
