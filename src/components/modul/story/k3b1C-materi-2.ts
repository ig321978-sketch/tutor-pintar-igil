import type { AdeganStory, Obj } from "./logika-story";
import { W, anak, emo, judul, kartu, kotak, nb, papan, tanda, tempatDua, teks } from "./k3b1C-gambar";
import { hapus, idx, k, redamkan, sorotkan, tambah } from "./k3b1C-bantu";

const cp = (id: string, y: number, isi: string) => teks(id, 150, y, isi, 13, W.merah);

/* ------------------------------ 5. Tiga tanda perbandingan ------------------------------ */
const TS: [string, string, string, string][] = [
  ["<", "kurang dari", W.hijauMuda, "339 < 421"],
  [">", "lebih dari", W.langit, "583 > 529"],
  ["=", "sama dengan", W.pink, "804 = 804"],
];
const kartuTanda = (i: number): Obj[] => {
  const x = 8 + i * 98;
  return [kotak(`ts${i}-k`, x, 36, 88, 52, TS[i][2], W.biru, { rx: 8 }), teks(`ts${i}-s`, x + 44, 64, TS[i][0], 26, W.merah), teks(`ts${i}-w`, x + 44, 81, TS[i][1], 9.5, W.biru)];
};
const contoh = (i: number): Obj => teks(`ex${i}`, 8 + i * 98 + 44, 108, TS[i][3], 11, W.merah);
const SUARA_T1 = "Hasil membandingkan dicatat dengan tanda. Ada tiga tanda, dan Igil akan memperkenalkannya satu per satu.";
const SUARA_T2 = "Tanda kurang dari dipakai bila bilangan pertama lebih kecil. Contohnya tiga ratus tiga puluh sembilan kurang dari empat ratus dua puluh satu.";
const SUARA_T3 = "Tanda lebih dari dipakai bila bilangan pertama lebih besar. Contohnya lima ratus delapan puluh tiga lebih dari lima ratus dua puluh sembilan.";
const SUARA_T4 = "Tanda sama dengan dipakai bila kedua bilangan sama besar. Contohnya delapan ratus empat sama dengan delapan ratus empat.";
const SUARA_T5 = "Ingat, mulut tanda selalu terbuka ke bilangan yang lebih besar, seperti mulut buaya yang lapar.";

export const ADEGAN_TIGA_TANDA: AdeganStory = {
  id: "tiga-tanda",
  judul: "Tiga tanda perbandingan",
  sumber: "Materi: tanda perbandingan",
  latar: "#F5F3FF",
  ketukan: [
    k(SUARA_T1, tambah(0, judul("Tiga tanda")), tambah(idx(SUARA_T1, "Ada"), emo("bj", 150, 100, "\u{1F40A}", 56))),
    k(SUARA_T2, hapus(0, "bj"), tambah(idx(SUARA_T2, "Tanda"), ...kartuTanda(0)), tambah(idx(SUARA_T2, "Contohnya"), contoh(0))),
    k(SUARA_T3, tambah(idx(SUARA_T3, "Tanda"), ...kartuTanda(1)), tambah(idx(SUARA_T3, "Contohnya"), contoh(1))),
    k(SUARA_T4, tambah(idx(SUARA_T4, "Tanda"), ...kartuTanda(2)), tambah(idx(SUARA_T4, "Contohnya"), contoh(2))),
    k(SUARA_T5, sorotkan(idx(SUARA_T5, "mulut"), "ts0-s", "ts1-s"), tambah(idx(SUARA_T5, "buaya"), emo("bj", 150, 168, "\u{1F40A}", 46))),
  ],
};

/* ------------------------------ 6. Membandingkan puluhan ------------------------------ */
const SUARA_U1 = "Malosi mengumpulkan lima ratus delapan puluh tiga bintang. Wei mengumpulkan lima ratus dua puluh sembilan bintang.";
const SUARA_U2 = "Ratusannya sama, yaitu lima. Karena sama, kita lihat puluhannya.";
const SUARA_U3 = "Puluhannya delapan dan dua. Delapan lebih dari dua.";
const SUARA_U4 = "Jadi lima ratus delapan puluh tiga lebih dari lima ratus dua puluh sembilan. Malosi punya bintang lebih banyak.";

export const ADEGAN_BANDING_PULUHAN: AdeganStory = {
  id: "banding-puluhan",
  judul: "Membandingkan puluhan",
  sumber: "Materi: membandingkan puluhan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Bintang Malosi dan Wei"), ...papan("a", 583), ...papan("b", 529)),
      tambah(idx(SUARA_U1, "Malosi"), ...anak("malosi", 40, 150)),
      tambah(idx(SUARA_U1, "lima"), nb("malosi", 40, 126, "583 bintang", 11)),
      tambah(idx(SUARA_U1, "Wei"), ...anak("wei", 260, 150)),
      tambah(idx(SUARA_U1, "lima", 2), nb("wei", 260, 126, "529 bintang", 11)),
    ),
    k(SUARA_U2, sorotkan(idx(SUARA_U2, "Ratusannya"), ...tempatDua(0)), redamkan(idx(SUARA_U2, "puluhannya."), ...tempatDua(0)), sorotkan(idx(SUARA_U2, "puluhannya."), ...tempatDua(1))),
    k(SUARA_U3, tambah(idx(SUARA_U3, "lebih"), cp("cp1", 150, "8 > 2"))),
    k(SUARA_U4, tambah(idx(SUARA_U4, "lebih"), tanda(">")), tambah(idx(SUARA_U4, "Malosi"), cp("cp2", 176, "583 > 529"))),
  ],
};

/* ------------------------------ 7. Membandingkan satuan ------------------------------ */
const SUARA_S1 = "Halim mengumpulkan tujuh ratus enam puluh sembilan bintang. Igil mengumpulkan tujuh ratus enam puluh satu bintang.";
const SUARA_S2 = "Ratusannya sama, yaitu tujuh. Puluhannya juga sama, yaitu enam.";
const SUARA_S3 = "Jadi kita lihat satuannya. Sembilan lebih dari satu.";
const SUARA_S4 = "Maka tujuh ratus enam puluh sembilan lebih dari tujuh ratus enam puluh satu. Halim punya bintang lebih banyak.";

export const ADEGAN_BANDING_SATUAN: AdeganStory = {
  id: "banding-satuan",
  judul: "Membandingkan satuan",
  sumber: "Materi: membandingkan satuan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Bintang Halim dan Igil"), ...papan("a", 769), ...papan("b", 761)),
      tambah(idx(SUARA_S1, "Halim"), ...anak("halim", 40, 150)),
      tambah(idx(SUARA_S1, "tujuh"), nb("halim", 40, 126, "769 bintang", 11)),
      tambah(idx(SUARA_S1, "Igil"), ...anak("igil", 260, 150)),
      tambah(idx(SUARA_S1, "tujuh", 2), nb("igil", 260, 126, "761 bintang", 11)),
    ),
    k(SUARA_S2, sorotkan(idx(SUARA_S2, "Ratusannya"), ...tempatDua(0)), redamkan(idx(SUARA_S2, "Puluhannya"), ...tempatDua(0)), sorotkan(idx(SUARA_S2, "Puluhannya"), ...tempatDua(1))),
    k(SUARA_S3, redamkan(0, ...tempatDua(1)), sorotkan(idx(SUARA_S3, "satuannya."), ...tempatDua(2)), tambah(idx(SUARA_S3, "Sembilan"), cp("cp1", 150, "9 > 1"))),
    k(SUARA_S4, tambah(idx(SUARA_S4, "lebih"), tanda(">")), tambah(idx(SUARA_S4, "Halim"), cp("cp2", 176, "769 > 761"))),
  ],
};

/* ------------------------------ 8. Bilangan yang sama ------------------------------ */
const SUARA_M1 = "Wei dan Malosi sama-sama mengumpulkan delapan ratus empat bintang. Apakah banyaknya sama?";
const SUARA_M2 = "Ratusannya sama, yaitu delapan. Puluhannya juga sama, yaitu nol.";
const SUARA_M3 = "Satuannya juga sama, yaitu empat. Semua tempat sama.";
const SUARA_M4 = "Karena semua tempat sama, delapan ratus empat sama dengan delapan ratus empat.";
const SUARA_M5 = "Wei dan Malosi punya bintang sama banyak. Untuk dua bilangan yang sama, kita pakai tanda sama dengan.";

export const ADEGAN_SAMA_DENGAN: AdeganStory = {
  id: "sama-dengan",
  judul: "Bilangan yang sama besar",
  sumber: "Materi: bilangan yang sama",
  latar: "#F0FDFA",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Bintang Wei dan Malosi"), ...papan("a", 804), ...papan("b", 804)),
      tambah(idx(SUARA_M1, "Wei"), ...anak("wei", 40, 150), nb("wei", 40, 126, "804 bintang", 11)),
      tambah(idx(SUARA_M1, "Malosi"), ...anak("malosi", 260, 150), nb("malosi", 260, 126, "804 bintang", 11)),
    ),
    k(SUARA_M2, sorotkan(idx(SUARA_M2, "Ratusannya"), ...tempatDua(0)), redamkan(idx(SUARA_M2, "Puluhannya"), ...tempatDua(0)), sorotkan(idx(SUARA_M2, "Puluhannya"), ...tempatDua(1))),
    k(SUARA_M3, redamkan(0, ...tempatDua(1)), sorotkan(idx(SUARA_M3, "Satuannya"), ...tempatDua(2))),
    k(SUARA_M4, redamkan(0, ...tempatDua(2)), tambah(idx(SUARA_M4, "sama", 2), tanda("=")), tambah(idx(SUARA_M4, "delapan"), cp("cp1", 150, "804 = 804"))),
    k(SUARA_M5, hapus(0, "cp1"), tambah(idx(SUARA_M5, "Malosi"), emo("ak", 150, 186, "\u{1F91D}", 36)), tambah(idx(SUARA_M5, "tanda"), ...kartu("st", 75, 130, 150, 22, W.emas, ["tanda sama dengan"], 10.5))),
  ],
};
