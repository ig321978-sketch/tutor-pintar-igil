import type { AdeganStory, Obj } from "./logika-story";
import { W, anak, angkaNT, bagan, emo, idLepas, idWadah, judul, kartu, lepasKe, lepasSemua, papanNT, teks, wadahKe, type Kel } from "./k2b7A-gambar";
import { bersih, hapus, idKartu, idx, k, redamkan, sorotkan, tambah } from "./k2b7A-bantu";

/* ------------------------------ 5. Rambutan Halim ------------------------------ */
const RB: Kel = { id: "rb", w: 5, s: 3, x: 68, y: 76, warna: "#FECACA", warnaS: "#EF4444" };
const SUARA_R1 = "Sekarang Halim memanen rambutan dari pohonnya. Buah rambutan itu merah dan berbulu halus.";
const SUARA_R2 = "Halim memasukkan rambutan ke dalam keranjang. Satu keranjang berisi sepuluh rambutan, jadi satu keranjang adalah satu puluhan.";
const SUARA_R3 = "Halim punya lima keranjang penuh. Setiap keranjang berisi sepuluh rambutan, tidak kurang dan tidak lebih.";
const SUARA_R4 = "Di dekat keranjang masih ada tiga rambutan lepas. Rambutan lepas itu belum cukup untuk memenuhi satu keranjang lagi.";
const SUARA_R5 = "Jadi Halim punya lima puluhan dan tiga satuan. Lima puluhan dan tiga satuan itu sama dengan lima puluh tiga.";

export const ADEGAN_RAMBUTAN: AdeganStory = {
  id: "rambutan",
  judul: "Halim memanen rambutan",
  sumber: "Materi: Halim memanen rambutan",
  latar: "#FEF2F2",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Halim memanen rambutan")), tambah(idx(SUARA_R1, "Halim"), ...anak("halim", 70, 70)), tambah(idx(SUARA_R1, "pohonnya."), emo("pn", 220, 90, "\u{1F333}", 54))),
    k(
      SUARA_R2,
      hapus(idx(SUARA_R2, "Halim"), "pn"),
      tambah(idx(SUARA_R2, "keranjang."), ...wadahKe(RB, 1)),
      tambah(idx(SUARA_R2, "puluhan."), ...kartu("rk1", 30, 150, 240, 28, W.emas, ["1 keranjang = 10 buah"], 11)),
    ),
    k(
      SUARA_R3,
      hapus(0, ...idKartu("rk1")),
      tambah(idx(SUARA_R3, "lima"), ...wadahKe(RB, 2), ...wadahKe(RB, 3)),
      tambah(idx(SUARA_R3, "keranjang"), ...wadahKe(RB, 4), ...wadahKe(RB, 5)),
      sorotkan(idx(SUARA_R3, "penuh."), ...idWadah(RB)),
    ),
    k(
      SUARA_R4,
      redamkan(0, ...idWadah(RB)),
      tambah(idx(SUARA_R4, "tiga"), ...lepasKe(RB, 1)),
      tambah(idx(SUARA_R4, "rambutan"), ...lepasKe(RB, 2)),
      tambah(idx(SUARA_R4, "lepas."), ...lepasKe(RB, 3)),
    ),
    k(
      SUARA_R5,
      sorotkan(idx(SUARA_R5, "lima"), ...idWadah(RB)),
      sorotkan(idx(SUARA_R5, "tiga"), ...idLepas(RB)),
      tambah(idx(SUARA_R5, "puluhan"), ...kartu("rk2", 20, 146, 170, 30, W.emas, ["5 puluhan 3 satuan"], 11)),
      tambah(idx(SUARA_R5, "tiga", 3), teks("rk3", 240, 172, "53", 30, W.merah)),
    ),
  ],
};

/* ------------------------------ 6. Kelereng Malosi ------------------------------ */
const KL: Kel = { id: "kl", w: 6, s: 7, x: 73, y: 76, warna: "#DBEAFE", warnaS: "#3B82F6" };
const KX: Kel = { id: "kx", w: 0, s: 9, x: 96, y: 124, warna: "#DBEAFE", warnaS: "#3B82F6" };
const SUARA_M1 = "Sekarang giliran Malosi. Malosi punya banyak kelereng biru yang berkilau.";
const SUARA_M2 = "Malosi memasukkan kelereng ke dalam kantong. Satu kantong berisi sepuluh kelereng, jadi satu kantong adalah satu puluhan.";
const SUARA_M3 = "Malosi mempunyai enam kantong penuh. Setiap kantong berisi sepuluh kelereng.";
const SUARA_M4 = "Ada juga tujuh kelereng lepas di dekatnya. Kelereng lepas itu belum cukup untuk satu kantong.";
const SUARA_M5 = "Itu enam puluhan dan tujuh satuan. Jadi banyak kelereng Malosi adalah enam puluh tujuh.";

export const ADEGAN_KELERENG: AdeganStory = {
  id: "kelereng",
  judul: "Kelereng Malosi",
  sumber: "Materi: kelereng Malosi",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_M1, tambah(0, judul("Kelereng Malosi")), tambah(idx(SUARA_M1, "Malosi."), ...anak("malosi", 70, 60)), tambah(idx(SUARA_M1, "kelereng"), ...lepasSemua(KX))),
    k(
      SUARA_M2,
      hapus(idx(SUARA_M2, "Malosi"), "an-malosi", "an-malosi-bd", "an-malosi-lb", ...idLepas(KX)),
      tambah(idx(SUARA_M2, "kantong."), ...wadahKe(KL, 1)),
      tambah(idx(SUARA_M2, "puluhan."), ...kartu("kk1", 30, 150, 240, 28, W.emas, ["1 kantong = 10 kelereng"], 11)),
    ),
    k(
      SUARA_M3,
      hapus(0, ...idKartu("kk1")),
      tambah(idx(SUARA_M3, "enam"), ...wadahKe(KL, 2), ...wadahKe(KL, 3)),
      tambah(idx(SUARA_M3, "kantong"), ...wadahKe(KL, 4), ...wadahKe(KL, 5)),
      tambah(idx(SUARA_M3, "penuh."), ...wadahKe(KL, 6)),
    ),
    k(
      SUARA_M4,
      tambah(idx(SUARA_M4, "tujuh"), ...lepasKe(KL, 1), ...lepasKe(KL, 2), ...lepasKe(KL, 3)),
      tambah(idx(SUARA_M4, "kelereng"), ...lepasKe(KL, 4), ...lepasKe(KL, 5)),
      tambah(idx(SUARA_M4, "lepas"), ...lepasKe(KL, 6), ...lepasKe(KL, 7)),
    ),
    k(
      SUARA_M5,
      sorotkan(idx(SUARA_M5, "enam"), ...idWadah(KL)),
      sorotkan(idx(SUARA_M5, "tujuh"), ...idLepas(KL)),
      tambah(idx(SUARA_M5, "puluhan"), ...kartu("kk2", 20, 150, 170, 30, W.emas, ["6 puluhan 7 satuan"], 11)),
      tambah(idx(SUARA_M5, "tujuh", 2), teks("kk3", 240, 176, "67", 30, W.merah)),
    ),
  ],
};

/* ------------------------------ 7. Nilai tempat ------------------------------ */
const NV: Kel = { id: "nv", w: 5, s: 3, x: 70, y: 122, warna: "#FECACA", warnaS: "#EF4444" };
const SUARA_N1 = "Sekarang kita belajar nilai tempat. Ada dua tempat untuk menaruh angka.";
const SUARA_N2 = "Puluhan ada di sebelah kiri. Satuan ada di sebelah kanan.";
const SUARA_N3 = "Ini ada lima bungkus dan tiga rambutan lepas. Itu lima puluhan dan tiga satuan.";
const SUARA_N4 = "Angka lima kita taruh di tempat puluhan, sebab ada lima puluhan.";
const SUARA_N5 = "Angka tiga kita taruh di tempat satuan, sebab ada tiga satuan. Jadi bilangannya lima puluh tiga.";

export const ADEGAN_NILAI_TEMPAT: AdeganStory = {
  id: "nilai-tempat",
  judul: "Nilai tempat: kiri dan kanan",
  sumber: "Materi: nilai tempat",
  latar: "#F5F3FF",
  ketukan: [
    k(SUARA_N1, tambah(0, judul("Nilai tempat")), tambah(idx(SUARA_N1, "dua"), ...papanNT(28))),
    k(SUARA_N2, sorotkan(idx(SUARA_N2, "Puluhan"), "nt-pk", "nt-hp"), sorotkan(idx(SUARA_N2, "Satuan"), "nt-sk", "nt-hs")),
    k(
      SUARA_N3,
      redamkan(0, "nt-pk", "nt-hp", "nt-sk", "nt-hs"),
      tambah(idx(SUARA_N3, "lima"), ...wadahKe(NV, 1), ...wadahKe(NV, 2), ...wadahKe(NV, 3), ...wadahKe(NV, 4), ...wadahKe(NV, 5)),
      tambah(idx(SUARA_N3, "tiga"), ...lepasKe(NV, 1), ...lepasKe(NV, 2), ...lepasKe(NV, 3)),
      sorotkan(idx(SUARA_N3, "Itu"), ...idWadah(NV)),
    ),
    k(SUARA_N4, redamkan(0, ...idWadah(NV)), tambah(idx(SUARA_N4, "taruh"), angkaNT("p", 5, 28)), sorotkan(idx(SUARA_N4, "sebab"), "nt-pk")),
    k(SUARA_N5, redamkan(0, "nt-pk"), tambah(idx(SUARA_N5, "taruh"), angkaNT("s", 3, 28)), sorotkan(idx(SUARA_N5, "sebab"), "nt-sk"), tambah(idx(SUARA_N5, "lima"), teks("nt-n", 150, 110, "53", 20, W.merah))),
  ],
};

/* ------------------------------ 8. Pasangan bilangan ------------------------------ */
const B53 = bagan(53);
const B62 = bagan(62);
const dari = (b: Obj[], ...ids: string[]): Obj[] => b.filter((o) => ids.includes(o.id));
const SUARA_P1 = "Ada cara kedua, yaitu pasangan bilangan. Satu bilangan bisa dipecah menjadi dua bagian.";
const SUARA_P2 = "Lima puluh tiga terdiri dari lima puluh dan tiga.";
const SUARA_P3 = "Kalau digabung lagi, lima puluh ditambah tiga sama dengan lima puluh tiga.";
const SUARA_P4 = "Coba bilangan lain. Enam puluh dua terdiri dari enam puluh dan dua.";
const SUARA_P5 = "Pasangan bilangan membantu kita memeriksa. Enam puluh ditambah dua sama dengan enam puluh dua.";

export const ADEGAN_PASANGAN: AdeganStory = {
  id: "pasangan",
  judul: "Pasangan bilangan",
  sumber: "Materi: pasangan bilangan",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_P1, tambah(0, judul("Pasangan bilangan")), tambah(idx(SUARA_P1, "Satu"), ...dari(B53, "ps-ak", "ps-a")), tambah(idx(SUARA_P1, "dipecah"), ...dari(B53, "ps-g1", "ps-g2"))),
    k(SUARA_P2, tambah(idx(SUARA_P2, "lima", 2), ...dari(B53, "ps-bk", "ps-b")), tambah(idx(SUARA_P2, "tiga", 2), ...dari(B53, "ps-ck", "ps-c"))),
    k(SUARA_P3, tambah(idx(SUARA_P3, "sama"), teks("ps-e", 150, 182, "50 + 3 = 53", 16, W.merah))),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Pasangan bilangan")),
      tambah(idx(SUARA_P4, "Enam"), ...dari(B62, "ps-ak", "ps-a", "ps-g1", "ps-g2")),
      tambah(idx(SUARA_P4, "enam", 2), ...dari(B62, "ps-bk", "ps-b")),
      tambah(idx(SUARA_P4, "dua", 2), ...dari(B62, "ps-ck", "ps-c")),
    ),
    k(SUARA_P5, tambah(idx(SUARA_P5, "sama"), teks("ps-e", 150, 182, "60 + 2 = 62", 16, W.merah)), tambah(idx(SUARA_P5, "memeriksa."), emo("pe", 262, 60, "\u{1F50D}", 24))),
  ],
};
