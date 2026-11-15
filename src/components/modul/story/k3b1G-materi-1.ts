import type { AdeganStory } from "./logika-story";
import { W, bagian, bagikan, emo, hbAtas, jumlahBagian, judul, taruh, teks, tumpukan } from "./k3b1G-gambar";
import { hapus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k3b1G-bantu";

/* ------------------------------ 2. Igil membagi biskuit ------------------------------ */
const SUARA_C1 = "Hari ini Igil punya dua belas biskuit. Biskuit itu tersusun rapi di layar.";
const SUARA_C2 = "Igil ingin membagi biskuit itu sama banyak untuk Malosi dan Kira.";
const SUARA_C3 = "Membagi sama banyak berarti setiap bagian mendapat jumlah yang sama.";
const SUARA_C4 = "Satu biskuit untuk Malosi, satu biskuit untuk Kira. Begitu terus, bergiliran.";
const SUARA_C5 = "Biskuit sudah habis dibagikan. Malosi dapat enam biskuit, dan Kira juga dapat enam biskuit.";
const SUARA_C6 = "Dua belas dibagi dua sama dengan enam. Setiap anak mendapat enam biskuit.";

export const ADEGAN_CERITA_BISKUIT: AdeganStory = {
  id: "cerita-biskuit",
  judul: "Igil membagi biskuit",
  sumber: "Materi: membagi sama banyak",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_C1, tambah(0, judul("Igil membagi biskuit")), tambah(idx(SUARA_C1, "dua"), ...tumpukan("biskuit", 12))),
    k(SUARA_C2, tambah(idx(SUARA_C2, "Malosi"), ...bagian(["Malosi", "Kira"]))),
    k(SUARA_C3, tambah(idx(SUARA_C3, "sama"), teks("kd", 150, 92, "bagian sama banyak", 10, W.ungu))),
    k(SUARA_C4, hapus(0, "kd"), ubah(idx(SUARA_C4, "Malosi,"), bagikan("biskuit", 2, 1, 1)), ubah(idx(SUARA_C4, "Kira."), bagikan("biskuit", 2, 2, 2)), ubah(idx(SUARA_C4, "bergiliran."), bagikan("biskuit", 2, 3, 8))),
    k(
      SUARA_C5,
      ubah(idx(SUARA_C5, "habis"), bagikan("biskuit", 2, 9, 12)),
      tambah(idx(SUARA_C5, "enam", 1), jumlahBagian(0, 2, 6)),
      tambah(idx(SUARA_C5, "enam", 2), jumlahBagian(1, 2, 6)),
    ),
    k(SUARA_C6, tambah(0, hbAtas("12 : 2 = 6"))),
  ],
};

/* ------------------------------ 3. Kira membagi jeruk ------------------------------ */
const SUARA_J1 = "Sekarang Kira punya lima belas jeruk. Jeruk itu mau dibagi sama banyak untuk Upe, Halim, dan Wei.";
const SUARA_J2 = "Kita bagikan satu per satu. Upe dapat satu, Halim dapat satu, dan Wei dapat satu.";
const SUARA_J3 = "Putaran berikutnya sama saja. Jeruk dibagikan bergiliran sampai habis.";
const SUARA_J4 = "Jeruk sudah habis. Upe dapat lima, Halim dapat lima, dan Wei dapat lima.";
const SUARA_J5 = "Lima belas dibagi tiga sama dengan lima. Tiap anak mendapat lima jeruk, dan tidak ada yang tersisa.";

export const ADEGAN_BAGI_JERUK: AdeganStory = {
  id: "bagi-rata-jeruk",
  judul: "Kira membagi jeruk",
  sumber: "Materi: membagi sama banyak",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_J1, tambah(0, judul("Kira membagi jeruk")), tambah(idx(SUARA_J1, "lima"), ...tumpukan("jeruk", 15)), tambah(idx(SUARA_J1, "Upe,"), ...bagian(["Upe", "Halim", "Wei"]))),
    k(SUARA_J2, ubah(idx(SUARA_J2, "Upe"), bagikan("jeruk", 3, 1, 1)), ubah(idx(SUARA_J2, "Halim"), bagikan("jeruk", 3, 2, 2)), ubah(idx(SUARA_J2, "Wei"), bagikan("jeruk", 3, 3, 3))),
    k(SUARA_J3, ubah(idx(SUARA_J3, "Putaran"), bagikan("jeruk", 3, 4, 6)), ubah(idx(SUARA_J3, "habis."), bagikan("jeruk", 3, 7, 15))),
    k(
      SUARA_J4,
      tambah(idx(SUARA_J4, "lima", 1), jumlahBagian(0, 3, 5)),
      tambah(idx(SUARA_J4, "lima", 2), jumlahBagian(1, 3, 5)),
      tambah(idx(SUARA_J4, "lima", 3), jumlahBagian(2, 3, 5)),
    ),
    k(SUARA_J5, tambah(0, hbAtas("15 : 3 = 5"))),
  ],
};

/* ------------------------------ 4. Bagian harus sama banyak ------------------------------ */
const SUARA_S1 = "Halim punya sepuluh kelereng untuk Kira dan Wei. Kita lihat dua cara membaginya.";
const SUARA_S2 = "Cara pertama, Kira dapat tujuh kelereng dan Wei dapat tiga kelereng.";
const SUARA_S3 = "Itu bukan pembagian sama banyak, sebab bagian Kira lebih banyak dari bagian Wei.";
const SUARA_S4 = "Cara kedua, kita pindahkan kelereng dari bagian Kira ke bagian Wei sampai sama.";
const SUARA_S5 = "Sekarang Kira dapat lima kelereng dan Wei dapat lima kelereng. Kedua bagian sama banyak.";
const SUARA_S6 = "Sepuluh dibagi dua sama dengan lima. Pembagian membuat semua bagian sama banyak.";

export const ADEGAN_SAMA_BANYAK: AdeganStory = {
  id: "sama-banyak",
  judul: "Bagian harus sama banyak",
  sumber: "Materi: membagi sama banyak",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_S1, tambah(0, judul("Dua cara membagi")), tambah(idx(SUARA_S1, "sepuluh"), ...tumpukan("kelereng", 10)), tambah(idx(SUARA_S1, "Kira"), ...bagian(["Kira", "Wei"]))),
    k(
      SUARA_S2,
      ubah(idx(SUARA_S2, "tujuh"), ...[1, 2, 3, 4, 5, 6, 7].map((i) => taruh("kelereng", i, 2, 0, i - 1))),
      tambah(idx(SUARA_S2, "tujuh"), jumlahBagian(0, 2, 7)),
      ubah(idx(SUARA_S2, "tiga"), ...[8, 9, 10].map((i) => taruh("kelereng", i, 2, 1, i - 8))),
      tambah(idx(SUARA_S2, "tiga"), jumlahBagian(1, 2, 3)),
    ),
    k(SUARA_S3, tambah(idx(SUARA_S3, "bukan"), emo("tk", 150, 92, "❌", 16))),
    k(SUARA_S4, hapus(0, "tk"), ubah(idx(SUARA_S4, "pindahkan"), taruh("kelereng", 6, 2, 1, 3), taruh("kelereng", 7, 2, 1, 4)), ubah(idx(SUARA_S4, "sama."), { id: "bj-0", isi: "5" }, { id: "bj-1", isi: "5" })),
    k(SUARA_S5, sorotkan(idx(SUARA_S5, "Kedua"), "gr-0", "gr-1")),
    k(SUARA_S6, redamkan(0, "gr-0", "gr-1"), tambah(0, hbAtas("10 : 2 = 5"))),
  ],
};
