import type { AdeganStory, Obj } from "./logika-story";
import { BUNGA, MAINAN, SAYUR, W, benda, buatDt, emo, judul, teks } from "./k2b8A-gambar";
import { idx, k, redamkan, sorotkan, tambah, ubah } from "./k2b8A-bantu";

const cap = (isi: string) => teks("cp", 150, 198, isi, 10.5, W.merah);

/* ------------------------------ 11. Bunga Wei: sama banyak ------------------------------ */
const DU = buatDt(BUNGA);
const SUARA_S1 = "Wei merangkai bunga dan mencatat jenisnya. Mawar ada tujuh, lili ada empat, tulip ada lima, dan aster ada empat.";
const SUARA_S2 = "Lihat turus lili dan aster. Panjangnya sama, jadi lili dan aster sama banyak.";
const SUARA_S3 = "Turus mawar paling panjang, jadi mawar paling banyak. Mawar ada tujuh.";
const SUARA_S4 = "Mawar tiga lebihnya dari aster. Tulip satu lebihnya dari lili.";
const SUARA_S5 = "Dengan turus, kita mudah melihat yang sama banyak, yang lebih, dan yang kurang.";

export const ADEGAN_SAMA_BANYAK: AdeganStory = {
  id: "sama-banyak",
  judul: "Bunga Wei: sama banyak",
  sumber: "Materi: sama banyak dan lebihnya",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Bunga Wei"), ...DU.kepala()),
      tambah(idx(SUARA_S1, "Mawar"), ...DU.kerangkaBaris(0)),
      tambah(idx(SUARA_S1, "tujuh,"), ...DU.semua(0)),
      tambah(idx(SUARA_S1, "lili"), ...DU.kerangkaBaris(1)),
      tambah(idx(SUARA_S1, "empat", 1), ...DU.semua(1)),
      tambah(idx(SUARA_S1, "tulip"), ...DU.kerangkaBaris(2)),
      tambah(idx(SUARA_S1, "lima,"), ...DU.semua(2)),
      tambah(idx(SUARA_S1, "aster"), ...DU.kerangkaBaris(3)),
      tambah(idx(SUARA_S1, "empat", 2), ...DU.semua(3)),
    ),
    k(SUARA_S2, sorotkan(idx(SUARA_S2, "lili"), ...DU.sorot(1)), sorotkan(idx(SUARA_S2, "aster."), ...DU.sorot(3))),
    k(SUARA_S3, redamkan(0, ...DU.sorot(1), ...DU.sorot(3)), sorotkan(idx(SUARA_S3, "mawar"), ...DU.sorot(0)), tambah(idx(SUARA_S3, "tujuh."), ...BUNGA.map((_, r) => DU.banyak(r)))),
    k(
      SUARA_S4,
      redamkan(0, ...DU.sorot(0)),
      sorotkan(idx(SUARA_S4, "Mawar"), ...DU.sorot(0), ...DU.sorot(3)),
      redamkan(idx(SUARA_S4, "Tulip"), ...DU.sorot(0), ...DU.sorot(3)),
      sorotkan(idx(SUARA_S4, "Tulip"), ...DU.sorot(2), ...DU.sorot(1)),
    ),
    k(SUARA_S5, redamkan(0, ...DU.sorot(2), ...DU.sorot(1)), tambah(idx(SUARA_S5, "mudah"), emo("lk", 30, 30, "\u{1F440}", 18)), tambah(idx(SUARA_S5, "kurang."), cap("sama banyak, lebih, kurang"))),
  ],
};

/* ------------------------------ 12. Mainan Kira: jumlah ------------------------------ */
const DM = buatDt(MAINAN);
const SUARA_M1 = "Kira menata mainannya, lalu mencatatnya dengan turus. Mobil-mobilan ada dua, boneka ada empat, kelereng ada enam, dan balok ada tujuh.";
const SUARA_M2 = "Kira ingin tahu jumlah boneka dan kelereng. Boneka ada empat dan kelereng ada enam.";
const SUARA_M3 = "Jumlah boneka dan kelereng adalah sepuluh, sebab empat ditambah enam sama dengan sepuluh.";
const SUARA_M4 = "Sekarang kita jumlahkan semua mainan. Dua, empat, enam, dan tujuh dijumlahkan satu per satu.";
const SUARA_M5 = "Jumlah semua mainan Kira ada sembilan belas. Kira senang sekali.";

export const ADEGAN_JUMLAH: AdeganStory = {
  id: "jumlah",
  judul: "Mainan Kira: jumlah",
  sumber: "Materi: jumlah dari diagram turus",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Mainan Kira"), ...DM.kepala()),
      tambah(idx(SUARA_M1, "Mobil-mobilan"), ...DM.kerangkaBaris(0)),
      tambah(idx(SUARA_M1, "dua,"), ...DM.semua(0)),
      tambah(idx(SUARA_M1, "boneka"), ...DM.kerangkaBaris(1)),
      tambah(idx(SUARA_M1, "empat,"), ...DM.semua(1)),
      tambah(idx(SUARA_M1, "kelereng"), ...DM.kerangkaBaris(2)),
      tambah(idx(SUARA_M1, "enam,"), ...DM.semua(2)),
      tambah(idx(SUARA_M1, "balok"), ...DM.kerangkaBaris(3)),
      tambah(idx(SUARA_M1, "tujuh."), ...DM.semua(3)),
    ),
    k(
      SUARA_M2,
      sorotkan(idx(SUARA_M2, "boneka"), ...DM.sorot(1)),
      sorotkan(idx(SUARA_M2, "kelereng."), ...DM.sorot(2)),
      tambah(idx(SUARA_M2, "empat."), DM.banyak(1)),
      tambah(idx(SUARA_M2, "enam."), DM.banyak(2)),
    ),
    k(SUARA_M3, tambah(idx(SUARA_M3, "adalah"), cap("4 + 6 = 10"))),
    k(
      SUARA_M4,
      redamkan(0, ...DM.sorot(1), ...DM.sorot(2)),
      tambah(idx(SUARA_M4, "Dua,"), DM.banyak(0)),
      tambah(idx(SUARA_M4, "tujuh"), DM.banyak(3)),
      ubah(idx(SUARA_M4, "dijumlahkan"), { id: "cp", isi: "2 + 4 + 6 + 7" }),
    ),
    k(SUARA_M5, ubah(idx(SUARA_M5, "sembilan"), { id: "cp", isi: "2 + 4 + 6 + 7 = 19" }), tambah(idx(SUARA_M5, "senang"), emo("pt", 270, 30, "\u{1F389}", 22))),
  ],
};

/* ------------------------------ 13. Sayur Malosi: turus menjadi bilangan ------------------------------ */
const DS = buatDt(SAYUR);
const SUARA_U1 = "Malosi menata sayur dan mencatat turusnya. Turus brokoli, bayam, wortel, dan jagung sudah jadi.";
const SUARA_U2 = "Sekarang ubah turus menjadi bilangan. Hitung ikat lima dahulu, lalu tambahkan garis yang tersisa.";
const SUARA_U3 = "Turus brokoli, yaitu satu ikat lima dan dua garis. Lima ditambah dua sama dengan tujuh.";
const SUARA_U4 = "Turus wortel, yaitu satu ikat lima dan satu garis, jadi enam. Turus bayam tidak punya ikat lima, jadi hanya empat garis.";
const SUARA_U5 = "Turus jagung hanya tiga garis, jadi tiga. Sekarang semua turus sudah menjadi bilangan.";

export const ADEGAN_UBAH_BANYAK: AdeganStory = {
  id: "ubah-banyak",
  judul: "Sayur Malosi: turus menjadi bilangan",
  sumber: "Materi: mengubah turus jadi bilangan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Sayur Malosi"), ...DS.kepala()),
      tambah(idx(SUARA_U1, "brokoli,"), ...DS.kerangkaBaris(0), ...DS.semua(0)),
      tambah(idx(SUARA_U1, "bayam,"), ...DS.kerangkaBaris(1), ...DS.semua(1)),
      tambah(idx(SUARA_U1, "wortel,"), ...DS.kerangkaBaris(2), ...DS.semua(2)),
      tambah(idx(SUARA_U1, "jagung"), ...DS.kerangkaBaris(3), ...DS.semua(3)),
    ),
    k(SUARA_U2, tambah(idx(SUARA_U2, "ubah"), emo("nm", 30, 30, "\u{1F522}", 18)), sorotkan(idx(SUARA_U2, "Hitung"), ...DS.sorot(0))),
    k(SUARA_U3, tambah(idx(SUARA_U3, "Lima"), cap("5 + 2 = 7")), tambah(idx(SUARA_U3, "tujuh."), DS.banyak(0))),
    k(
      SUARA_U4,
      redamkan(0, ...DS.sorot(0)),
      sorotkan(idx(SUARA_U4, "wortel,"), ...DS.sorot(2)),
      ubah(idx(SUARA_U4, "satu"), { id: "cp", isi: "5 + 1 = 6" }),
      tambah(idx(SUARA_U4, "enam."), DS.banyak(2)),
      redamkan(idx(SUARA_U4, "bayam"), ...DS.sorot(2)),
      sorotkan(idx(SUARA_U4, "bayam"), ...DS.sorot(1)),
      tambah(idx(SUARA_U4, "empat"), DS.banyak(1)),
    ),
    k(SUARA_U5, redamkan(0, ...DS.sorot(1)), tambah(idx(SUARA_U5, "tiga", 2), DS.banyak(3)), ubah(idx(SUARA_U5, "Sekarang"), { id: "cp", isi: "7, 4, 6, 3" })),
  ],
};

/* ------------------------------ 14. Kira mencatat jawaban ------------------------------ */
const NAMA_J = ["kucing", "kelinci", "burung"];
const DJ = buatDt(
  [
    { nama: "kucing", n: 4 },
    { nama: "kelinci", n: 3 },
    { nama: "burung", n: 2 },
  ],
  { y0: 88, rh: 36 },
);
const JAWAB = ["kucing", "kelinci", "kucing", "burung", "kucing", "kelinci", "kucing", "burung", "kelinci"];
/** Jawaban ke-q (dari 0): benda muncul di baki atas dan satu garis turus ditambah pada baris jenisnya. */
const jawab = (q: number): Obj[] => {
  const nama = JAWAB[q];
  const j = JAWAB.slice(0, q + 1).filter((x) => x === nama).length;
  return [benda(nama, j, 34 + q * 24, 66, 16, "st"), DJ.garisKe(NAMA_J.indexOf(nama), j - 1)];
};
const SUARA_J1 = "Kira mencatat jawaban tentang hewan kesukaan. Jawabannya muncul satu per satu di layar.";
const SUARA_J2 = "Jawaban pertama kucing, lalu kelinci, lalu kucing lagi.";
const SUARA_J3 = "Jawaban berikutnya burung, kucing, lalu kelinci.";
const SUARA_J4 = "Terakhir kucing, burung, dan kelinci. Semua jawaban sudah dicatat.";
const SUARA_J5 = "Setiap jawaban hanya satu garis. Kucing ada empat, kelinci ada tiga, dan burung ada dua.";
const SUARA_J6 = "Hewan kesukaan yang paling banyak adalah kucing. Hewan yang paling sedikit adalah burung.";

export const ADEGAN_CATAT_JAWABAN: AdeganStory = {
  id: "catat-jawaban",
  judul: "Kira mencatat jawaban",
  sumber: "Materi: mencatat data dengan turus",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, judul("Hewan kesukaan"), ...DJ.kepala()),
      tambah(idx(SUARA_J1, "jawaban"), ...NAMA_J.flatMap((_, r) => DJ.kerangkaBaris(r))),
      tambah(idx(SUARA_J1, "muncul"), teks("tr", 22, 46, "jawaban yang muncul:", 9, W.ungu, { anchor: "start" })),
    ),
    k(SUARA_J2, tambah(idx(SUARA_J2, "kucing", 1), ...jawab(0)), tambah(idx(SUARA_J2, "kelinci,"), ...jawab(1)), tambah(idx(SUARA_J2, "kucing", 2), ...jawab(2))),
    k(SUARA_J3, tambah(idx(SUARA_J3, "burung,"), ...jawab(3)), tambah(idx(SUARA_J3, "kucing,"), ...jawab(4)), tambah(idx(SUARA_J3, "kelinci."), ...jawab(5))),
    k(SUARA_J4, tambah(idx(SUARA_J4, "kucing,"), ...jawab(6)), tambah(idx(SUARA_J4, "burung,"), ...jawab(7)), tambah(idx(SUARA_J4, "kelinci."), ...jawab(8))),
    k(SUARA_J5, tambah(idx(SUARA_J5, "empat,"), DJ.banyak(0)), tambah(idx(SUARA_J5, "tiga,"), DJ.banyak(1)), tambah(idx(SUARA_J5, "dua."), DJ.banyak(2))),
    k(SUARA_J6, sorotkan(idx(SUARA_J6, "kucing."), ...DJ.sorot(0)), sorotkan(idx(SUARA_J6, "burung."), ...DJ.sorot(2))),
  ],
};
