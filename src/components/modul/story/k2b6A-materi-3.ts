import type { AdeganStory } from "./logika-story";
import { W, deret, emo, idBenda, idPenunjuk, isiSisi, judul, kartu, kerangka, labelSisi, penunjuk, spek, teks, ubahTimbang } from "./k2b6A-gambar";
import { bersih, hapus, idKartu, idPilihan, idx, k, pilihKata, redamkan, sorotkan, tambah, ubah } from "./k2b6A-bantu";

/** Benda ke-`j` di piringan `sisi` pada keadaan `sp` saja (benda lain tidak ikut ditambahkan). */
const hanya = (sp: Parameters<typeof isiSisi>[0], sisi: "L" | "R", j: number) => isiSisi(sp, sisi).filter((o) => o.id.endsWith(`-${j}`));
const tenis = (n: number) => spek(1, "timbangan", ["boneka"], n ? [["bola_tenis", n]] : []);
const kelereng = (n: number) => spek(1, "timbangan", ["boneka"], n ? [["kelereng", n]] : []);
const BONEKA = idBenda(1, "L", "boneka", 1);
const ID_TENIS = (j: number) => idBenda(1, "R", "bola_tenis", j);

/* ------------------------------ 11. Boneka dan bola tenis ------------------------------ */
const SUARA_N1 = "Boneka ditaruh di piringan kiri. Ujung kiri turun, karena piringan kanan masih kosong.";
const SUARA_N2 = "Kita taruh satu bola tenis di piringan kanan. Boneka masih lebih berat dari satu bola tenis.";
const SUARA_N3 = "Kita taruh satu lagi. Sekarang ada dua bola tenis. Boneka masih lebih berat dari dua bola tenis.";
const SUARA_N4 = "Kita tambah satu lagi, jadi tiga bola tenis. Boneka masih lebih berat dari tiga bola tenis.";
const SUARA_N5 = "Kita tambah satu lagi, jadi empat bola tenis. Sekarang kedua ujung sejajar.";
const SUARA_N6 = "Boneka sama berat dengan empat bola tenis. Jadi berat boneka adalah empat bola tenis.";
const SUARA_N7 = "Coba tambah satu lagi. Sekarang ada lima bola tenis. Lima bola tenis lebih berat dari boneka, jadi ujung kanan turun.";
const SUARA_N8 = "Jadi boneka lebih berat dari tiga bola tenis, dan sama berat dengan empat bola tenis.";

export const ADEGAN_BONEKA_TENIS: AdeganStory = {
  id: "boneka-tenis",
  judul: "Boneka dan bola tenis",
  sumber: "Materi: boneka dan bola tenis",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Mengukur boneka"), kerangka(tenis(0))),
      tambah(idx(SUARA_N1, "Boneka"), ...isiSisi(tenis(0), "L"), labelSisi(tenis(0), "L")),
      ubah(idx(SUARA_N1, "Boneka"), ...ubahTimbang(tenis(0), { L: true })),
      tambah(idx(SUARA_N1, "turun,"), ...penunjuk(tenis(0))),
    ),
    k(SUARA_N2, tambah(idx(SUARA_N2, "bola"), ...isiSisi(tenis(1), "R"), labelSisi(tenis(1), "R")), ubah(idx(SUARA_N2, "bola"), ...ubahTimbang(tenis(1), { L: true, R: true }))),
    k(SUARA_N3, tambah(idx(SUARA_N3, "lagi."), ...hanya(tenis(2), "R", 2)), ubah(idx(SUARA_N3, "lagi."), ...ubahTimbang(tenis(2), { L: true, R: true }))),
    k(SUARA_N4, tambah(idx(SUARA_N4, "lagi,"), ...hanya(tenis(3), "R", 3)), ubah(idx(SUARA_N4, "lagi,"), ...ubahTimbang(tenis(3), { L: true, R: true }))),
    k(
      SUARA_N5,
      tambah(idx(SUARA_N5, "lagi,"), ...hanya(tenis(4), "R", 4)),
      ubah(idx(SUARA_N5, "lagi,"), ...ubahTimbang(tenis(4), { L: true, R: true })),
      hapus(idx(SUARA_N5, "sejajar."), ...idPenunjuk(tenis(0))),
    ),
    k(
      SUARA_N6,
      sorotkan(idx(SUARA_N6, "Boneka"), BONEKA),
      sorotkan(idx(SUARA_N6, "empat"), ID_TENIS(1), ID_TENIS(2), ID_TENIS(3), ID_TENIS(4)),
      tambah(idx(SUARA_N6, "Jadi"), ...kartu("bs", 30, 164, 240, 26, W.emas, ["boneka = 4 bola tenis"], 11)),
    ),
    k(
      SUARA_N7,
      redamkan(0, BONEKA, ID_TENIS(1), ID_TENIS(2), ID_TENIS(3), ID_TENIS(4)),
      hapus(0, ...idKartu("bs")),
      tambah(idx(SUARA_N7, "satu"), ...hanya(tenis(5), "R", 5)),
      ubah(idx(SUARA_N7, "satu"), ...ubahTimbang(tenis(5), { L: true, R: true })),
      tambah(idx(SUARA_N7, "turun."), ...penunjuk(tenis(5))),
    ),
    k(
      SUARA_N8,
      hapus(0, ID_TENIS(5), ...idPenunjuk(tenis(5))),
      ubah(0, ...ubahTimbang(tenis(4), { L: true, R: true })),
      tambah(idx(SUARA_N8, "sama"), ...kartu("bs", 30, 164, 240, 26, W.emas, ["boneka = 4 bola tenis"], 11)),
    ),
  ],
};

/* ------------------------------ 12. Boneka dan kelereng ------------------------------ */
const SUARA_E1 = "Sekarang kita ukur boneka itu lagi, tetapi memakai kelereng. Boneka ada di piringan kiri.";
const SUARA_E2 = "Kita taruh kelereng satu per satu di piringan kanan. Karena kelereng ringan, boneka masih lebih berat dari lima kelereng.";
const SUARA_E3 = "Kita tambah lagi sampai ada sepuluh kelereng. Sekarang kedua ujung sejajar.";
const SUARA_E4 = "Boneka sama berat dengan sepuluh kelereng. Boneka juga sama berat dengan empat bola tenis.";
const SUARA_E5 = "Hasil ukur boneka ada dua. Empat bola tenis, atau sepuluh kelereng. Satuannya berbeda, jadi hasilnya berbeda.";
const SUARA_E6 = "Berat boneka tidak berubah. Yang berubah hanya alat ukurnya. Satuan yang lebih ringan memerlukan hitungan yang lebih banyak.";

export const ADEGAN_BONEKA_KELERENG: AdeganStory = {
  id: "boneka-kelereng",
  judul: "Boneka dan kelereng",
  sumber: "Materi: boneka dan kelereng",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Boneka dan kelereng"), kerangka(kelereng(0))),
      tambah(idx(SUARA_E1, "kelereng."), ...kartu("ki", 60, 36, 180, 24, W.langit, ["satuan: kelereng"], 10)),
      tambah(idx(SUARA_E1, "Boneka", 2), ...isiSisi(kelereng(0), "L"), labelSisi(kelereng(0), "L")),
      ubah(idx(SUARA_E1, "Boneka", 2), ...ubahTimbang(kelereng(0), { L: true })),
      tambah(idx(SUARA_E1, "kiri."), ...penunjuk(kelereng(0))),
    ),
    k(
      SUARA_E2,
      hapus(0, ...idKartu("ki")),
      ...[1, 2, 3, 4, 5].map((j) => tambah(2 + j - 1, ...hanya(kelereng(5), "R", j))),
      tambah(idx(SUARA_E2, "lima"), labelSisi(kelereng(5), "R")),
      ubah(idx(SUARA_E2, "lima"), ...ubahTimbang(kelereng(5), { L: true, R: true })),
    ),
    k(
      SUARA_E3,
      ...[6, 7, 8, 9, 10].map((j) => tambah(3 + j - 6, ...hanya(kelereng(10), "R", j))),
      ubah(idx(SUARA_E3, "sejajar."), ...ubahTimbang(kelereng(10), { L: true, R: true })),
      hapus(idx(SUARA_E3, "sejajar."), ...idPenunjuk(kelereng(0))),
    ),
    k(SUARA_E4, sorotkan(idx(SUARA_E4, "Boneka"), BONEKA), tambah(idx(SUARA_E4, "sepuluh"), ...kartu("bs", 30, 164, 240, 26, W.emas, ["boneka = 10 kelereng"], 11)), tambah(idx(SUARA_E4, "empat"), ...kartu("bu", 30, 40, 240, 26, W.langit, ["boneka = 4 bola tenis"], 11))),
    k(
      SUARA_E5,
      bersih(0),
      tambah(0, judul("Dua hasil ukur")),
      tambah(idx(SUARA_E5, "Empat"), ...kartu("h1", 20, 34, 260, 36, W.hijauMuda, ["boneka: 4 bola tenis"], 14)),
      tambah(idx(SUARA_E5, "sepuluh"), ...kartu("h2", 20, 76, 260, 36, W.pink, ["boneka: 10 kelereng"], 14)),
      tambah(idx(SUARA_E5, "berbeda,"), emo("bn", 150, 146, "\u{1F9F8}", 30)),
    ),
    k(SUARA_E6, sorotkan(idx(SUARA_E6, "alat"), "h1-k", "h2-k"), tambah(idx(SUARA_E6, "Satuan"), ...kartu("h3", 20, 156, 260, 32, W.emas, ["alat ukur beda, hasil beda"], 11))),
  ],
};

/* ------------------------------ 13. Latihan 1: ujung mana yang turun ------------------------------ */
const L1a = spek(1, "timbangan", ["pisang"], []);
const L1 = spek(1, "timbangan", ["pisang"], ["mangga"]);
const SUARA_Q1 = "Latihan satu. Halim menaruh pisang di piringan kiri dan mangga di piringan kanan.";
const SUARA_Q2 = "Perhatikan ujung timbangan dengan teliti. Ujung mana yang turun? Ketuk jawaban yang tepat.";
const SUARA_Q3 = "Betul! Ujung kanan turun, karena mangga lebih berat dari pisang. Hebat!";
const SUARA_Q4 = "Jadi pisang lebih ringan dari mangga. Benda yang lebih berat membuat ujungnya turun.";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: ujung mana yang turun",
  sumber: "Materi: latihan menimbang",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Latihan 1"), kerangka(spek(1, "timbangan", [], []))),
      tambah(idx(SUARA_Q1, "pisang"), ...isiSisi(L1a, "L")),
      ubah(idx(SUARA_Q1, "pisang"), ...ubahTimbang(L1a)),
      tambah(idx(SUARA_Q1, "mangga"), ...isiSisi(L1, "R")),
      ubah(idx(SUARA_Q1, "mangga"), ...ubahTimbang(L1)),
    ),
    k(SUARA_Q2, tambah(idx(SUARA_Q2, "Perhatikan"), teks("tanya", 150, 152, "ujung mana yang turun?", 11, W.ungu)), tambah(idx(SUARA_Q2, "jawaban"), ...pilihKata(160, ["kiri", "kanan", "sejajar"], 12))),
    k(SUARA_Q3, sorotkan(idx(SUARA_Q3, "Betul!"), "c2-k")),
    k(SUARA_Q4, redamkan(0, "c2-k"), hapus(idx(SUARA_Q4, "Jadi"), "tanya", ...idPilihan(3)), tambah(idx(SUARA_Q4, "ujungnya"), ...penunjuk(L1), ...kartu("la", 30, 164, 240, 26, W.emas, ["pisang lebih ringan dari mangga"], 10))),
  ],
};

/* ------------------------------ 14. Latihan 2: paling ringan ------------------------------ */
const BUAH_L2 = ["jeruk", "mangga", "anggur"];
const BD_L2 = deret(BUAH_L2, 84, 1.2);
const SUARA_R1 = "Latihan dua. Upe melihat tiga buah di layar, yaitu jeruk, mangga, dan anggur.";
const SUARA_R2 = "Buah mana yang paling ringan? Ketuk jawaban yang tepat.";
const SUARA_R3 = "Betul! Anggur paling ringan di antara ketiganya. Hebat!";
const SUARA_R4 = "Mangga lebih berat dari jeruk, dan jeruk lebih berat dari anggur. Jadi mangga paling berat.";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: buah paling ringan",
  sumber: "Materi: latihan paling ringan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Latihan 2")),
      tambah(idx(SUARA_R1, "jeruk,"), BD_L2[0], BD_L2[1]),
      tambah(idx(SUARA_R1, "mangga,"), BD_L2[2], BD_L2[3]),
      tambah(idx(SUARA_R1, "anggur."), BD_L2[4], BD_L2[5]),
    ),
    k(SUARA_R2, tambah(idx(SUARA_R2, "Buah"), teks("tanya", 150, 136, "mana yang paling ringan?", 11, W.ungu)), tambah(idx(SUARA_R2, "jawaban"), ...pilihKata(148, BUAH_L2, 12))),
    k(SUARA_R3, sorotkan(idx(SUARA_R3, "Betul!"), "c3-k"), sorotkan(idx(SUARA_R3, "Anggur"), "bd-3-anggur")),
    k(
      SUARA_R4,
      redamkan(0, "c3-k"),
      hapus(0, "tanya", ...idPilihan(3)),
      sorotkan(idx(SUARA_R4, "Jadi"), "bd-2-mangga"),
      tambah(idx(SUARA_R4, "paling"), ...kartu("lr", 40, 140, 220, 34, W.emas, ["mangga paling berat"], 12)),
    ),
  ],
};

/* ------------------------------ 15. Latihan 3: berapa balok mainan ------------------------------ */
const L3a = spek(1, "timbangan", ["kotak"], []);
const L3 = spek(1, "timbangan", ["kotak"], [["balok_mainan", 3]]);
const SUARA_S1 = "Latihan tiga. Wei memakai balok mainan untuk mengukur sebuah kotak. Kotak ditaruh di piringan kiri.";
const SUARA_S2 = "Wei menaruh balok mainan di piringan kanan sampai kedua ujung sejajar.";
const SUARA_S3 = "Berapa balok mainan yang sama berat dengan kotak? Hitung balok mainan di piringan kanan. Ketuk jawaban yang tepat.";
const SUARA_S4 = "Betul! Ada tiga balok mainan, jadi kotak sama berat dengan tiga balok mainan. Hebat!";
const SUARA_S5 = "Kotak sama berat dengan tiga balok mainan. Hasil ukur ini memakai satuan balok mainan.";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: berapa balok mainan",
  sumber: "Materi: latihan satuan tidak baku",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Latihan 3"), kerangka(spek(1, "timbangan", [], []))),
      tambah(idx(SUARA_S1, "kotak."), ...isiSisi(L3a, "L")),
      ubah(idx(SUARA_S1, "kotak."), ...ubahTimbang(L3a)),
      tambah(idx(SUARA_S1, "piringan"), ...penunjuk(L3a)),
    ),
    k(
      SUARA_S2,
      ...[1, 2, 3].map((j) => tambah(2 + j - 1, ...hanya(L3, "R", j))),
      ubah(idx(SUARA_S2, "sejajar."), ...ubahTimbang(L3)),
      hapus(idx(SUARA_S2, "sejajar."), ...idPenunjuk(L3a)),
    ),
    k(SUARA_S3, tambah(idx(SUARA_S3, "Berapa"), teks("tanya", 150, 152, "berapa balok mainan?", 11, W.ungu)), tambah(idx(SUARA_S3, "jawaban"), ...pilihKata(160, ["dua", "tiga", "empat"], 12))),
    k(SUARA_S4, sorotkan(idx(SUARA_S4, "Betul!"), "c2-k")),
    k(SUARA_S5, redamkan(0, "c2-k"), hapus(idx(SUARA_S5, "Kotak"), "tanya", ...idPilihan(3)), tambah(idx(SUARA_S5, "Hasil"), ...kartu("lt", 30, 164, 240, 26, W.emas, ["kotak = 3 balok mainan"], 11))),
  ],
};
