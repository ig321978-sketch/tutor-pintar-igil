import type { AdeganStory } from "./logika-story";
import { HEWAN, W, buatDt, emo, judul, teks } from "./k2b8A-gambar";
import { hapus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k2b8A-bantu";

const DH = buatDt(HEWAN);
const SEMUA_BANYAK = HEWAN.map((_, r) => DH.banyak(r));

/* ------------------------------ 8. Diagram turus hewan ternak ------------------------------ */
const SUARA_H1 = "Halim membuat turus untuk setiap hewan. Ayam ada sepuluh, yaitu dua ikat lima.";
const SUARA_H2 = "Kambing ada delapan, yaitu satu ikat lima dan tiga garis.";
const SUARA_H3 = "Sapi ada enam, yaitu satu ikat lima dan satu garis.";
const SUARA_H4 = "Bebek ada sebelas, yaitu dua ikat lima dan satu garis.";
const SUARA_H5 = "Banyaknya ditaruh di kolom banyak: sepuluh, delapan, enam, dan sebelas.";

export const ADEGAN_TURUS_HEWAN: AdeganStory = {
  id: "turus-hewan",
  judul: "Diagram turus hewan ternak",
  sumber: "Materi: diagram turus hewan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Turus hewan ternak"), ...DH.kepala()),
      tambah(idx(SUARA_H1, "setiap"), ...HEWAN.flatMap((_, r) => DH.kerangkaBaris(r))),
      tambah(idx(SUARA_H1, "dua"), ...DH.ikat(0, 0)),
      tambah(idx(SUARA_H1, "lima."), ...DH.ikat(0, 1)),
    ),
    k(SUARA_H2, tambah(idx(SUARA_H2, "satu"), ...DH.ikat(1, 0)), tambah(idx(SUARA_H2, "tiga"), ...DH.turus(1, 5, 8))),
    k(SUARA_H3, tambah(idx(SUARA_H3, "satu"), ...DH.ikat(2, 0)), tambah(idx(SUARA_H3, "garis."), DH.garisKe(2, 5))),
    k(SUARA_H4, tambah(idx(SUARA_H4, "dua"), ...DH.ikat(3, 0)), tambah(idx(SUARA_H4, "lima"), ...DH.ikat(3, 1)), tambah(idx(SUARA_H4, "garis."), DH.garisKe(3, 10))),
    k(
      SUARA_H5,
      tambah(idx(SUARA_H5, "sepuluh,"), SEMUA_BANYAK[0]),
      tambah(idx(SUARA_H5, "delapan,"), SEMUA_BANYAK[1]),
      tambah(idx(SUARA_H5, "enam,"), SEMUA_BANYAK[2]),
      tambah(idx(SUARA_H5, "sebelas."), SEMUA_BANYAK[3]),
    ),
  ],
};

/* ------------------------------ 9. Membaca: paling banyak dan paling sedikit ------------------------------ */
const SUARA_B1 = "Sekarang kita membaca diagram turus. Lihat baris yang paling panjang dan baris yang paling pendek.";
const SUARA_B2 = "Turus bebek paling panjang, jadi bebek paling banyak. Banyak bebek ada sebelas.";
const SUARA_B3 = "Sekarang baris yang paling pendek. Turus sapi paling pendek, jadi sapi paling sedikit.";
const SUARA_B4 = "Kita periksa dengan kolom banyak. Bebek sebelas paling banyak, sapi enam paling sedikit.";

export const ADEGAN_BACA_PALING: AdeganStory = {
  id: "baca-paling",
  judul: "Membaca: paling banyak dan paling sedikit",
  sumber: "Materi: membaca diagram turus",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Membaca diagram turus"), ...DH.lengkap()), sorotkan(idx(SUARA_B1, "panjang"), ...DH.sorot(3)), sorotkan(idx(SUARA_B1, "pendek."), ...DH.sorot(2))),
    k(SUARA_B2, redamkan(0, ...DH.sorot(2)), tambah(idx(SUARA_B2, "paling"), emo("mk", 266, 30, "\u{1F451}", 18))),
    k(SUARA_B3, hapus(0, "mk"), redamkan(0, ...DH.sorot(3)), sorotkan(idx(SUARA_B3, "sapi"), ...DH.sorot(2))),
    k(
      SUARA_B4,
      redamkan(0, ...DH.sorot(2)),
      tambah(idx(SUARA_B4, "kolom"), ...SEMUA_BANYAK),
      sorotkan(idx(SUARA_B4, "Bebek"), ...DH.sorot(3)),
      redamkan(idx(SUARA_B4, "sapi"), ...DH.sorot(3)),
      sorotkan(idx(SUARA_B4, "sapi"), ...DH.sorot(2)),
    ),
  ],
};

/* ------------------------------ 10. Lebihnya dan kurangnya ------------------------------ */
const SUARA_L1 = "Bebek ada sebelas dan ayam ada sepuluh. Turus bebek lebih panjang satu garis daripada turus ayam.";
const SUARA_L2 = "Jadi banyak bebek satu lebihnya dari banyak ayam.";
const SUARA_L3 = "Sebaliknya, banyak ayam satu kurangnya dari banyak bebek.";
const SUARA_L4 = "Sekarang bandingkan kambing dan sapi. Banyak kambing dua lebihnya dari banyak sapi.";
const SUARA_L5 = "Beda banyak antara dua jenis disebut selisih. Selisihnya dua, karena kambing delapan dan sapi enam.";
const cap = (isi: string) => teks("cp", 150, 198, isi, 10.5, W.merah);

export const ADEGAN_LEBIH_KURANG: AdeganStory = {
  id: "lebih-kurang",
  judul: "Lebihnya dan kurangnya",
  sumber: "Materi: lebihnya dan kurangnya",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Lebihnya dan kurangnya"), ...DH.lengkap(), ...SEMUA_BANYAK),
      sorotkan(idx(SUARA_L1, "Bebek"), ...DH.sorot(3)),
      sorotkan(idx(SUARA_L1, "ayam"), ...DH.sorot(0)),
    ),
    k(SUARA_L2, tambah(idx(SUARA_L2, "lebihnya"), cap("11 - 10 = 1"))),
    k(SUARA_L3, ubah(idx(SUARA_L3, "kurangnya"), { id: "cp", isi: "ayam kurang 1 dari bebek" })),
    k(
      SUARA_L4,
      redamkan(0, ...DH.sorot(3), ...DH.sorot(0)),
      sorotkan(idx(SUARA_L4, "kambing"), ...DH.sorot(1)),
      sorotkan(idx(SUARA_L4, "sapi."), ...DH.sorot(2)),
      ubah(idx(SUARA_L4, "lebihnya"), { id: "cp", isi: "8 - 6 = 2" }),
    ),
    k(SUARA_L5, tambah(idx(SUARA_L5, "Beda"), emo("lp", 30, 32, "\u{1F50E}", 18)), ubah(idx(SUARA_L5, "Selisihnya"), { id: "cp", isi: "selisih 2" })),
  ],
};
