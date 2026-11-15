import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, emo, judul, kartu, papan, tanda, tempatDua, teks } from "./k3b1C-gambar";
import { bersih, hapus, idPilihan, idx, k, pilihKata, redamkan, sorotkan, tambah } from "./k3b1C-bantu";

export const NAMA_METODE_ID = ["Banding per Tempat", "Garis Bilangan Ratusan", "Mengurutkan"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);

/** Papan di adegan luar diturunkan supaya kepala metode tidak tertutup. */
export const PL = 56;
const cap = (id: string, y: number, isi: string) => teks(id, 150, y, isi, 12, W.merah);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara punya cara lain untuk belajar membandingkan dan mengurutkan bilangan. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Banding per Tempat, Garis Bilangan Ratusan, dan Mengurutkan.";
const SUARA_O3 = "Semua metode ini menjawab satu pertanyaan. Bilangan mana yang lebih besar, dan bagaimana menyusunnya dengan rapi?";
const SUARA_O4 = "Kita memakai gambar di layar. Kamu cukup mengetuk, melihat dengan teliti, dan memilih jawaban.";
const SUARA_O5 = "Ada yang membandingkan tempat demi tempat, ada yang melihat letak pada garis, dan ada yang menyusun kartu. Siap? Ayo kita mulai dengan metode pertama.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk membandingkan bilangan",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah(idx(SUARA_O1, "negara"), emo("gl", 150, 110, "\u{1F30D}", 50)), tambah(idx(SUARA_O1, "tiga"), ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      tambah(idx(SUARA_O2, "Banding"), ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah(idx(SUARA_O2, "Garis"), ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah(idx(SUARA_O2, "Mengurutkan."), ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah(idx(SUARA_O3, "satu"), emo("i1", 60, 84, "⚖️", 34), emo("i2", 150, 84, "❓", 34), emo("i3", 240, 84, "\u{1F4F6}", 34)),
      tambah(idx(SUARA_O3, "Bilangan"), ...kartu("iq", 20, 112, 260, 52, W.emas, ["bilangan mana yang lebih besar,", "dan bagaimana menyusunnya?"], 10)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Alat bantu hari ini")),
      tambah(idx(SUARA_O4, "layar."), emo("a1", 70, 100, "\u{1F5C2}️", 36), emo("a2", 150, 100, "\u{1F522}", 36), emo("a3", 230, 100, "\u{1F4CF}", 36)),
      tambah(idx(SUARA_O4, "mengetuk,"), emo("tg", 150, 150, "\u{1F446}", 24)),
      tambah(idx(SUARA_O4, "memilih"), teks("al-t", 150, 184, "ketuk, lihat, lalu pilih", 10, W.ungu)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Tempat, garis, dan kartu")),
      tambah(idx(SUARA_O5, "tempat"), teks("kt0", 150, 70, "tempat demi tempat", 14, W.ungu)),
      tambah(idx(SUARA_O5, "garis,"), teks("kt1", 150, 100, "letak pada garis", 14, W.ungu)),
      tambah(idx(SUARA_O5, "menyusun"), teks("kt2", 150, 130, "menyusun kartu", 14, W.ungu)),
      tambah(idx(SUARA_O5, "pertama."), emo("ow", 150, 182, OWL, 30)),
    ),
  ],
};

/* ------------------------------ 2. Banding per Tempat: konsep ------------------------------ */
const SUARA_B1 = "Metode pertama bernama Banding per Tempat. Kita membandingkan bilangan satu tempat demi satu tempat, dari kiri ke kanan.";
const SUARA_B2 = "Kita punya dua bilangan, yaitu empat ratus enam puluh delapan dan empat ratus tujuh puluh lima. Taruh keduanya pada papan.";
const SUARA_B3 = "Tempat ratusan dulu. Ratusannya sama, yaitu empat, jadi kita lanjut ke tempat puluhan.";
const SUARA_B4 = "Sekarang puluhan. Enam kurang dari tujuh, jadi tempat ini sudah menentukan.";
const SUARA_B5 = "Maka empat ratus enam puluh delapan kurang dari empat ratus tujuh puluh lima. Tempat satuan tidak perlu dilihat lagi.";

export const ADEGAN_LUAR_BANDING: AdeganStory = {
  id: "luar-banding",
  judul: "Banding per Tempat: tempat demi tempat",
  sumber: "Metode luar: Banding per Tempat",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_B1, tambah(0, ...kepala(0)), tambah(idx(SUARA_B1, "kiri"), emo("kk", 150, 130, "↔️", 50))),
    k(
      SUARA_B2,
      hapus(0, "kk"),
      tambah(idx(SUARA_B2, "empat"), papan("a", 468, PL).slice(0, 1)),
      tambah(idx(SUARA_B2, "empat", 2), papan("b", 475, PL).slice(0, 1)),
      tambah(idx(SUARA_B2, "Taruh"), ...papan("a", 468, PL).slice(1), ...papan("b", 475, PL).slice(1)),
    ),
    k(SUARA_B3, sorotkan(idx(SUARA_B3, "Tempat"), ...tempatDua(0)), tambah(idx(SUARA_B3, "puluhan."), cap("cp1", 146, "4 = 4"))),
    k(SUARA_B4, redamkan(0, ...tempatDua(0)), sorotkan(idx(SUARA_B4, "puluhan."), ...tempatDua(1)), tambah(idx(SUARA_B4, "Enam"), cap("cp2", 166, "6 < 7"))),
    k(SUARA_B5, redamkan(0, ...tempatDua(1)), tambah(idx(SUARA_B5, "Maka"), tanda("<", PL)), tambah(idx(SUARA_B5, "kurang"), cap("cp3", 190, "468 < 475"))),
  ],
};

/* ------------------------------ 3. Banding per Tempat: terapan ------------------------------ */
const SUARA_R1 = "Terapkan pada soal ini. Halim menaruh enam ratus empat puluh tujuh dan enam ratus empat puluh lima pada papan.";
const SUARA_R2 = "Ratusannya sama, yaitu enam. Puluhannya juga sama, yaitu empat. Jadi kita lihat satuannya.";
const SUARA_R3 = "Tanda apa yang tepat? Ketuk jawaban yang tepat.";
const SUARA_R4 = "Betul! Tujuh lebih dari lima, jadi enam ratus empat puluh tujuh lebih dari enam ratus empat puluh lima.";
const SUARA_R5 = "Dengan Banding per Tempat, Halim cukup melihat tempat pertama yang berbeda.";

export const ADEGAN_LUAR_BANDING_TERAPAN: AdeganStory = {
  id: "luar-banding-terapan",
  judul: "Banding per Tempat: papan Halim",
  sumber: "Metode luar: Banding per Tempat",
  latar: "#ECFCCB",
  ketukan: [
    k(SUARA_R1, tambah(0, ...kepala(0)), tambah(idx(SUARA_R1, "enam"), ...papan("a", 647, PL)), tambah(idx(SUARA_R1, "enam", 2), ...papan("b", 645, PL))),
    k(
      SUARA_R2,
      sorotkan(idx(SUARA_R2, "Ratusannya"), ...tempatDua(0)),
      redamkan(idx(SUARA_R2, "Puluhannya"), ...tempatDua(0)),
      sorotkan(idx(SUARA_R2, "Puluhannya"), ...tempatDua(1)),
      redamkan(idx(SUARA_R2, "satuannya."), ...tempatDua(1)),
      sorotkan(idx(SUARA_R2, "satuannya."), ...tempatDua(2)),
    ),
    k(SUARA_R3, redamkan(0, ...tempatDua(2)), tambah(idx(SUARA_R3, "Tanda"), teks("tanya", 150, 144, "tanda yang tepat?", 12, W.ungu)), tambah(idx(SUARA_R3, "jawaban"), ...pilihKata(152, ["<", ">", "="], 20))),
    k(SUARA_R4, sorotkan(idx(SUARA_R4, "Betul!"), "c2-k"), tambah(idx(SUARA_R4, "jadi"), tanda(">", PL))),
    k(SUARA_R5, redamkan(0, "c2-k"), hapus(0, "tanya", ...idPilihan(3)), tambah(idx(SUARA_R5, "Dengan"), ...kartu("tk", 30, 144, 240, 34, W.emas, ["tempat pertama yang berbeda", "menentukan hasilnya"], 10.5))),
  ],
};
