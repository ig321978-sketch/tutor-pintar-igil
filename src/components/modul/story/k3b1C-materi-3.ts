import type { AdeganStory } from "./logika-story";
import { W, anak, arah, emo, judul, kartu, kartuBil, nb, papan, pd, tanda, tempatDua, teks } from "./k3b1C-gambar";
import { hapus, idx, k, redamkan, slotX, sorotkan, tambah } from "./k3b1C-bantu";

const cp = (id: string, y: number, isi: string) => teks(id, 150, y, isi, 13, W.merah);

/* ------------------------------ 9. Tiga langkah membandingkan ------------------------------ */
const SUARA_L1 = "Ada tiga langkah untuk membandingkan dua bilangan tiga angka. Kita akan mengingatnya satu per satu.";
const SUARA_L2 = "Langkah pertama, bandingkan ratusannya. Bila ratusannya berbeda, kita sudah selesai.";
const SUARA_L3 = "Langkah kedua, bila ratusannya sama, bandingkan puluhannya.";
const SUARA_L4 = "Langkah ketiga, bila puluhannya juga sama, bandingkan satuannya.";
const SUARA_L5 = "Dengan tiga langkah ini, dua bilangan tiga angka apa pun pasti bisa dibandingkan.";

export const ADEGAN_TIGA_LANGKAH: AdeganStory = {
  id: "tiga-langkah",
  judul: "Tiga langkah membandingkan",
  sumber: "Materi: tiga langkah membandingkan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_L1, tambah(0, judul("Tiga langkah")), tambah(idx(SUARA_L1, "tiga"), emo("bj", 150, 110, "\u{1F40A}", 60))),
    k(SUARA_L2, hapus(0, "bj"), tambah(idx(SUARA_L2, "Langkah"), ...kartu("lg0", 14, 36, 272, 40, W.hijauMuda, ["1. bandingkan ratusan", "bila berbeda, selesai"], 10.5))),
    k(SUARA_L3, tambah(idx(SUARA_L3, "Langkah"), ...kartu("lg1", 14, 84, 272, 40, W.langit, ["2. bila ratusan sama,", "bandingkan puluhan"], 10.5))),
    k(SUARA_L4, tambah(idx(SUARA_L4, "Langkah"), ...kartu("lg2", 14, 132, 272, 40, W.merahMuda, ["3. bila puluhan sama,", "bandingkan satuan"], 10.5))),
    k(SUARA_L5, tambah(idx(SUARA_L5, "pasti"), emo("ok", 150, 196, "✅", 22))),
  ],
};

/* ------------------------------ 10. Hati-hati dengan nol ------------------------------ */
const SUARA_N1 = "Hati-hati dengan angka nol. Papan kiri berisi empat ratus tujuh, papan kanan berisi empat ratus tujuh puluh.";
const SUARA_N2 = "Ratusannya sama, yaitu empat. Sekarang kita lihat puluhannya.";
const SUARA_N3 = "Puluhan kiri adalah nol, puluhan kanan adalah tujuh. Nol kurang dari tujuh.";
const SUARA_N4 = "Jadi empat ratus tujuh kurang dari empat ratus tujuh puluh. Angka nol menjaga tempat puluhan, dan nilainya paling kecil.";

export const ADEGAN_BANDING_NOL: AdeganStory = {
  id: "banding-nol",
  judul: "Hati-hati dengan angka nol",
  sumber: "Materi: bilangan dengan nol",
  latar: "#FEF2F2",
  ketukan: [
    k(SUARA_N1, tambah(0, judul("Hati-hati dengan nol")), tambah(idx(SUARA_N1, "kiri"), ...papan("a", 407)), tambah(idx(SUARA_N1, "kanan"), ...papan("b", 470))),
    k(SUARA_N2, sorotkan(idx(SUARA_N2, "Ratusannya"), ...tempatDua(0)), redamkan(idx(SUARA_N2, "puluhannya."), ...tempatDua(0)), sorotkan(idx(SUARA_N2, "puluhannya."), ...tempatDua(1))),
    k(SUARA_N3, tambah(idx(SUARA_N3, "Nol", 2), cp("cp1", 146, "0 < 7"))),
    k(SUARA_N4, tambah(idx(SUARA_N4, "Jadi"), tanda("<")), tambah(idx(SUARA_N4, "empat"), cp("cp2", 172, "407 < 470"))),
  ],
};

/* ------------------------------ 11. Tiga bilangan: kelereng ------------------------------ */
const SUARA_B1 = "Wei punya seratus tiga puluh delapan kelereng. Halim punya seratus tiga kelereng. Igil punya seratus delapan puluh tiga kelereng.";
const SUARA_B2 = "Ketiganya punya satu ratusan, jadi kita lihat puluhannya. Puluhannya tiga, nol, dan delapan.";
const SUARA_B3 = "Nol paling kecil, lalu tiga, lalu delapan. Jadi Halim paling sedikit, lalu Wei, lalu Igil.";
const SUARA_B4 = "Kita susun dari yang terkecil, yaitu seratus tiga, seratus tiga puluh delapan, dan seratus delapan puluh tiga.";
const SUARA_B5 = "Urutan dari yang terkecil ke yang terbesar disebut urutan naik.";

export const ADEGAN_TIGA_BILANGAN: AdeganStory = {
  id: "tiga-bilangan",
  judul: "Kelereng Wei, Halim, dan Igil",
  sumber: "Materi: tiga bilangan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Kelereng tiga anak")),
      tambah(idx(SUARA_B1, "Wei"), ...anak("wei", 50, 82)),
      tambah(idx(SUARA_B1, "seratus"), nb("wei", 50, 62, "138")),
      tambah(idx(SUARA_B1, "Halim"), ...anak("halim", 150, 82)),
      tambah(idx(SUARA_B1, "seratus", 2), nb("halim", 150, 62, "103")),
      tambah(idx(SUARA_B1, "Igil"), ...anak("igil", 250, 82)),
      tambah(idx(SUARA_B1, "seratus", 3), nb("igil", 250, 62, "183")),
    ),
    k(
      SUARA_B2,
      tambah(idx(SUARA_B2, "ratusan,"), emo("bt", 150, 150, "\u{1F4AF}", 22)),
      tambah(idx(SUARA_B2, "tiga,"), pd("wei", 50, 138, "3 puluhan")),
      tambah(idx(SUARA_B2, "nol,"), pd("halim", 150, 138, "0 puluhan")),
      tambah(idx(SUARA_B2, "delapan."), pd("igil", 250, 138, "8 puluhan")),
    ),
    k(
      SUARA_B3,
      hapus(0, "bt"),
      sorotkan(idx(SUARA_B3, "Halim"), "nb-halim"),
      redamkan(idx(SUARA_B3, "Wei,"), "nb-halim"),
      sorotkan(idx(SUARA_B3, "Wei,"), "nb-wei"),
      redamkan(idx(SUARA_B3, "Igil."), "nb-wei"),
      sorotkan(idx(SUARA_B3, "Igil."), "nb-igil"),
    ),
    k(
      SUARA_B4,
      redamkan(0, "nb-igil"),
      tambah(idx(SUARA_B4, "seratus"), ...kartuBil(0, slotX(0), 150, 103)),
      tambah(idx(SUARA_B4, "seratus", 2), ...kartuBil(1, slotX(1), 150, 138)),
      tambah(idx(SUARA_B4, "seratus", 3), ...kartuBil(2, slotX(2), 150, 183)),
    ),
    k(SUARA_B5, tambah(idx(SUARA_B5, "naik."), arah("urutan naik"))),
  ],
};
