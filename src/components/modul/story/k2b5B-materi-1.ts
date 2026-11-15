import type { AdeganStory } from "./logika-story";
import { hasil, judul, meja, pita, tanda } from "./k2b5B-gambar";
import { bersihMeja, duaTempat, hapus, idx, k, mejaSekaligus, munculMeja, pindah, redamBenda, sorotkan, tambah } from "./k2b5B-bantu";

/* ------------------------------ 2. Kumpulan benda ------------------------------ */
const SUARA_A1 = "Lihat meja ini. Di atas meja ada kumpulan benda.";
const SUARA_A2 = "Malosi punya kelereng. Kita hitung kelerengnya: satu, dua, tiga, empat.";
const SUARA_A3 = "Jadi ada empat kelereng. Sekumpulan kelereng ini kita sebut kumpulan benda.";
const SUARA_A4 = "Kumpulan benda bisa kita bagi menjadi dua bagian, yaitu bagian Upe dan bagian Malosi.";
const SUARA_A5 = "Bagian yang sama banyak disebut setengah. Kita akan mencari setengah dari kumpulan benda.";

export const ADEGAN_KUMPULAN: AdeganStory = {
  id: "kumpulan",
  judul: "Kumpulan benda di atas meja",
  sumber: "Materi: kumpulan benda",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_A1, tambah(0, judul("Kelereng Malosi")), tambah(idx(SUARA_A1, "meja", 1), meja())),
    k(SUARA_A2, ...munculMeja(SUARA_A2, 4, "kelereng", "kelerengnya:")),
    k(SUARA_A3, tambah(idx(SUARA_A3, "kumpulan"), ...pita("zz", "kumpulan benda"))),
    k(SUARA_A4, duaTempat(idx(SUARA_A4, "dua"), "Upe", "Malosi")),
    k(SUARA_A5, hapus(0, "zz-k", "zz-t0"), tambah(idx(SUARA_A5, "setengah"), ...pita("zz", "bagian sama banyak = setengah", "#FEF08A"))),
  ],
};

/* ------------------------------ 3. Bagi bergantian: empat kelereng ------------------------------ */
const SUARA_B1 = "Malosi ingin memberi setengah kelerengnya kepada Upe. Di meja ada empat kelereng.";
const SUARA_B2 = "Kita bagi bergantian. Satu kelereng untuk Upe, satu kelereng untuk Malosi.";
const SUARA_B3 = "Tersisa dua kelereng di meja. Satu lagi untuk Upe dan satu lagi untuk Malosi.";
const SUARA_B4 = "Meja sudah kosong. Upe mendapat dua kelereng, Malosi juga mendapat dua kelereng.";
const SUARA_B5 = "Kedua bagian sama banyak. Jadi setengah dari empat kelereng adalah dua kelereng.";

export const ADEGAN_BAGI_EMPAT: AdeganStory = {
  id: "bagi-empat",
  judul: "Membagi empat kelereng",
  sumber: "Materi: setengah dari empat kelereng",
  latar: "#F5F3FF",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Bagi empat kelereng")), tambah(idx(SUARA_B1, "meja", 1), meja()), mejaSekaligus(idx(SUARA_B1, "empat"), 4, "kelereng")),
    k(
      SUARA_B2,
      duaTempat(idx(SUARA_B2, "bergantian"), "Upe", "Malosi"),
      ...pindah("kelereng", 4, [
        { at: idx(SUARA_B2, "Upe"), n: 0, ke: "pa" },
        { at: idx(SUARA_B2, "Malosi"), n: 1, ke: "pb" },
      ]),
    ),
    k(
      SUARA_B3,
      sorotkan(idx(SUARA_B3, "Tersisa"), "mj_2_kelereng", "mj_3_kelereng"),
      ...pindah(
        "kelereng",
        4,
        [
          { at: idx(SUARA_B3, "Upe"), n: 2, ke: "pa" },
          { at: idx(SUARA_B3, "Malosi"), n: 3, ke: "pb" },
        ],
        { mj: 2, pa: 1, pb: 1 },
      ),
    ),
    k(SUARA_B4, bersihMeja(idx(SUARA_B4, "kosong")), redamBenda(idx(SUARA_B4, "mendapat", 1), "pa", 2, "kelereng"), redamBenda(idx(SUARA_B4, "Malosi"), "pb", 2, "kelereng")),
    k(SUARA_B5, tambah(idx(SUARA_B5, "Kedua"), tanda(true)), tambah(idx(SUARA_B5, "setengah"), ...hasil("hs", "setengah dari 4 = 2"))),
  ],
};
