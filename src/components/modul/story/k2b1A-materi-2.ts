import type { AdeganStory, Obj } from "./logika-story";
import { W, barisDaftar, batangP, emo, judul, kartu, kotak, kubusS, nilaiV, teks } from "./k2b1A-gambar";
import { bersih, hapus, idx, k, NAMA_BILANGAN, redamkan, sorotkan, tambah, ubah, urutBilangan } from "./k2b1A-bantu";

const batang = (n: number): Obj[] => Array.from({ length: n }, (_, i) => batangP("a", i)).flat();
const kubus = (n: number): Obj[] => Array.from({ length: n }, (_, i) => kubusS("a", i));
const batangIds = (n: number): string[] => Array.from({ length: n }, (_, i) => `pa${i}-k`);
const kubusIds = (n: number): string[] => Array.from({ length: n }, (_, i) => `sa${i}`);

/* ------------------------------ 6. Membaca bilangan ------------------------------ */
const SUARA_B1 = "Sekarang kita baca bilangan lain. Ini bilangan tiga puluh satu. Ada tiga batang puluhan dan satu kubus satuan.";
const SUARA_B2 = "Cara membacanya mudah. Sebut nama puluhannya dulu, yaitu tiga puluh. Lalu sebut satuannya, yaitu satu.";
const SUARA_B3 = "Jadi tiga puluh dan satu dibaca tiga puluh satu.";
const SUARA_B4 = "Sekarang empat puluh tujuh. Ada empat batang puluhan dan tujuh kubus satuan.";
const SUARA_B5 = "Empat puluh dan tujuh dibaca empat puluh tujuh. Mudah, bukan?";
const SUARA_B6 = "Bilangan yang satuannya nol dibaca nama puluhannya saja. Tiga batang puluhan tanpa kubus satuan dibaca tiga puluh.";

export const ADEGAN_BACA: AdeganStory = {
  id: "baca-bilangan",
  judul: "Membaca bilangan",
  sumber: "Materi: membaca bilangan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Membaca bilangan")), tambah(idx(SUARA_B1, "satu", 1), nilaiV("a", "31", 150, 124)), tambah(idx(SUARA_B1, "batang"), ...batang(3)), tambah(idx(SUARA_B1, "kubus"), ...kubus(1))),
    k(SUARA_B2, sorotkan(idx(SUARA_B2, "puluhannya"), ...batangIds(3)), tambah(idx(SUARA_B2, "yaitu", 1), teks("p30", 60, 108, "30", 14, W.merah)), redamkan(idx(SUARA_B2, "Lalu"), ...batangIds(3)), sorotkan(idx(SUARA_B2, "satuannya,"), ...kubusIds(1))),
    k(SUARA_B3, redamkan(0, ...kubusIds(1)), tambah("Jadi", ...kartu("bc", 40, 146, 220, 36, W.krem, ["30 dan 1", "dibaca tiga puluh satu"], 10.4))),
    k(SUARA_B4, bersih(0), tambah(0, judul("Empat puluh tujuh")), tambah(idx(SUARA_B4, "tujuh.", 1), nilaiV("a", "47", 150, 124)), tambah(idx(SUARA_B4, "batang"), ...batang(4)), tambah(idx(SUARA_B4, "kubus"), ...kubus(7))),
    k(SUARA_B5, tambah(idx(SUARA_B5, "dan"), ...kartu("bd", 40, 146, 220, 36, W.krem, ["40 dan 7", "dibaca empat puluh tujuh"], 10.4)), sorotkan(idx(SUARA_B5, "Mudah,"), "va")),
    k(SUARA_B6, bersih(0), tambah(0, judul("Satuannya nol")), tambah(idx(SUARA_B6, "nol"), ...kartu("nz", 190, 56, 90, 28, W.krem, ["satuan: 0"], 10)), tambah(idx(SUARA_B6, "batang"), ...batang(3)), tambah(idx(SUARA_B6, "dibaca", 2), nilaiV("a", "30", 150, 124))),
  ],
};

/* ------------------------------ 7. Menulis bilangan ------------------------------ */
const SUARA_W1 = "Sekarang kita menulis bilangan. Bilangan dua puluh sampai lima puluh ditulis dengan dua angka.";
const SUARA_W2 = "Angka di kiri menunjukkan banyak puluhan. Angka di kanan menunjukkan banyak satuan.";
const SUARA_W3 = "Contohnya empat puluh tujuh. Empat puluh tujuh ditulis angka empat lalu angka tujuh.";
const SUARA_W4 = "Sekarang dua puluh delapan. Dua puluh delapan ditulis angka dua lalu angka delapan.";
const SUARA_W5 = "Satuannya bisa nol. Tiga puluh ditulis angka tiga lalu angka nol.";
const kotakTulis = (): Obj[] => [
  kotak("wr-pk", 70, 52, 62, 58, W.hijauMuda, W.biru, { rx: 8, tebal: 2 }),
  kotak("wr-sk", 168, 52, 62, 58, W.pink, W.biru, { rx: 8, tebal: 2 }),
];

export const ADEGAN_TULIS: AdeganStory = {
  id: "tulis-bilangan",
  judul: "Menulis bilangan",
  sumber: "Materi: menulis bilangan",
  latar: "#F0FDFA",
  ketukan: [
    k(SUARA_W1, tambah(0, judul("Menulis bilangan")), tambah(idx(SUARA_W1, "dua", 2), ...kartu("rg", 80, 130, 140, 28, W.krem, ["20 sampai 50"], 11)), tambah(idx(SUARA_W1, "angka."), ...kotakTulis())),
    k(SUARA_W2, tambah(idx(SUARA_W2, "kiri"), teks("wr-hp", 101, 44, "puluhan", 10, W.ungu)), sorotkan(idx(SUARA_W2, "kiri"), "wr-pk"), redamkan(idx(SUARA_W2, "Angka", 2), "wr-pk"), tambah(idx(SUARA_W2, "kanan"), teks("wr-hs", 199, 44, "satuan", 10, W.ungu)), sorotkan(idx(SUARA_W2, "kanan"), "wr-sk")),
    k(
      SUARA_W3,
      redamkan(0, "wr-sk"),
      hapus(0, "rg-k", "rg-t0"),
      tambah(idx(SUARA_W3, "empat", 3), teks("wr-p", 101, 98, "4", 38, W.merah)),
      tambah(idx(SUARA_W3, "tujuh", 3), teks("wr-s", 199, 98, "7", 38, W.merah), nilaiV("w", "47", 150, 152)),
    ),
    k(SUARA_W4, ubah(idx(SUARA_W4, "dua", 3), { id: "wr-p", isi: "2" }), ubah(idx(SUARA_W4, "delapan", 3), { id: "wr-s", isi: "8" }, { id: "vw", isi: "28" })),
    k(SUARA_W5, ubah(idx(SUARA_W5, "tiga", 2), { id: "wr-p", isi: "3" }), ubah(idx(SUARA_W5, "nol", 2), { id: "wr-s", isi: "0" }, { id: "vw", isi: "30" }), sorotkan(idx(SUARA_W5, "nol", 2), "wr-sk")),
  ],
};

/* ------------------------------ 8. Daftar bilangan 21 sampai 30 ------------------------------ */
const SUARA_D1 = "Sekarang kita baca bilangan berurutan, bersama Igil. Dua puluh satu, dua puluh dua, dua puluh tiga, dua puluh empat, dua puluh lima.";
const SUARA_D2 = "Perhatikan! Nama puluhannya sama, yaitu dua puluh. Hanya nama satuannya yang berganti.";
const SUARA_D3 = "Sekarang kita lanjutkan. Dua puluh enam, dua puluh tujuh, dua puluh delapan, dua puluh sembilan, tiga puluh.";
const SUARA_D4 = "Perhatikan! Setelah dua puluh sembilan datang tiga puluh. Tiga puluh punya satuan nol, jadi namanya hanya tiga puluh.";
const baris = (dari: number, q: number): Obj[] => barisDaftar(q, String(dari + q), NAMA_BILANGAN[dari + q]);
const idsDm = (n: number): string[] => Array.from({ length: n }, (_, q) => `dm${q}`);

export const ADEGAN_DAFTAR: AdeganStory = {
  id: "daftar-bilangan",
  judul: "Bilangan dua puluh satu sampai tiga puluh",
  sumber: "Materi: nama bilangan 21 sampai 30",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_D1, tambah(0, judul("Bilangan berurutan")), ...urutBilangan(SUARA_D1, 21, 25).map((p, q) => tambah(p, baris(21, q)))),
    k(SUARA_D2, sorotkan(idx(SUARA_D2, "puluhannya"), ...idsDm(5)), tambah(idx(SUARA_D2, "puluh"), teks("np", 26, 98, "20", 14, W.merah)), redamkan(idx(SUARA_D2, "Hanya"), ...idsDm(5))),
    k(
      SUARA_D3,
      bersih(0),
      tambah(0, judul("Lanjutkan")),
      ...urutBilangan(SUARA_D3, 26, 30).map((p, q) => tambah(p, baris(26, q))),
    ),
    k(SUARA_D4, sorotkan(idx(SUARA_D4, "tiga"), "dm4", "dl4"), tambah(idx(SUARA_D4, "nol"), emo("nn", 270, 170, "\u{1F4A1}", 24))),
  ],
};
