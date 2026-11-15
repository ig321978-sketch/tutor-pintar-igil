import type { AdeganStory } from "./logika-story";
import { BUAH, W, anak, barisBenda, banyakBenda, buatDt, emo, idAnak, idBenda, judul, kartu, namaBenda, sebar } from "./k2b8A-gambar";
import { hapus, idKartu, idx, k, redamkan, sorotkan, tambah } from "./k2b8A-bantu";

const ID_BUAH = (nama: string) => idBenda(BUAH.filter((b) => b.nama === nama));

/* ------------------------------ 2. Hari buah Upe ------------------------------ */
const SUARA_C1 = "Hari ini Upe mengadakan hari buah. Upe menata banyak buah di layar, ada yang ungu, jingga, merah, dan kuning.";
const SUARA_C2 = "Buah apa yang paling banyak? Sulit dijawab, sebab buahnya bercampur dan tidak teratur.";
const SUARA_C3 = "Keterangan tentang banyak benda disebut data. Banyak buah di layar ini adalah data.";
const SUARA_C4 = "Ada empat jenis buah, yaitu anggur, jeruk, apel, dan pisang. Mari kita kelompokkan menurut jenisnya.";

export const ADEGAN_CERITA_BUAH: AdeganStory = {
  id: "cerita-buah",
  judul: "Hari buah Upe",
  sumber: "Materi: hari buah Upe",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_C1, tambah(0, judul("Hari buah Upe")), tambah(idx(SUARA_C1, "Upe"), ...anak("upe", 30, 70)), tambah(idx(SUARA_C1, "menata"), ...sebar(BUAH))),
    k(SUARA_C2, tambah(idx(SUARA_C2, "Sulit"), emo("tn", 276, 44, "❓", 28))),
    k(SUARA_C3, hapus(0, "tn"), tambah(idx(SUARA_C3, "data.", 2), ...kartu("kd", 40, 150, 220, 32, W.emas, ["data: keterangan banyak benda"], 11))),
    k(
      SUARA_C4,
      hapus(0, ...idKartu("kd"), ...idAnak("upe")),
      sorotkan(idx(SUARA_C4, "anggur"), ...ID_BUAH("anggur")),
      redamkan(idx(SUARA_C4, "jeruk"), ...ID_BUAH("anggur")),
      sorotkan(idx(SUARA_C4, "jeruk"), ...ID_BUAH("jeruk")),
      redamkan(idx(SUARA_C4, "apel"), ...ID_BUAH("jeruk")),
      sorotkan(idx(SUARA_C4, "apel"), ...ID_BUAH("apel")),
      redamkan(idx(SUARA_C4, "pisang"), ...ID_BUAH("apel")),
      sorotkan(idx(SUARA_C4, "pisang"), ...ID_BUAH("pisang")),
      redamkan(idx(SUARA_C4, "Mari"), ...ID_BUAH("pisang")),
    ),
  ],
};

/* ------------------------------ 3. Buah dikelompokkan menurut jenis ------------------------------ */
const SUARA_P1 = "Mari kita pindahkan buah menurut jenisnya. Anggur bersama anggur, jeruk bersama jeruk.";
const SUARA_P2 = "Apel bersama apel, pisang bersama pisang. Sekarang buahnya sudah rapi.";
const SUARA_P3 = "Sekarang buah mudah dihitung. Hitung satu per satu supaya tidak ada yang terlewat.";
const SUARA_P4 = "Anggur ada dua. Jeruk ada enam. Apel ada empat. Pisang ada tiga.";
const SUARA_P5 = "Buah yang paling banyak adalah jeruk, dan buah yang paling sedikit adalah anggur.";

export const ADEGAN_PILAH_BUAH: AdeganStory = {
  id: "pilah-buah",
  judul: "Buah dikelompokkan menurut jenis",
  sumber: "Materi: mengelompokkan data",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Kelompokkan menurut jenis")),
      tambah(idx(SUARA_P1, "Anggur"), namaBenda("anggur", 0), ...barisBenda("anggur", 0, 1, 2)),
      tambah(idx(SUARA_P1, "jeruk"), namaBenda("jeruk", 1), ...barisBenda("jeruk", 1, 1, 6)),
    ),
    k(SUARA_P2, tambah(idx(SUARA_P2, "Apel"), namaBenda("apel", 2), ...barisBenda("apel", 2, 1, 4)), tambah(idx(SUARA_P2, "pisang"), namaBenda("pisang", 3), ...barisBenda("pisang", 3, 1, 3))),
    k(SUARA_P3, tambah(idx(SUARA_P3, "Hitung"), ...kartu("hs", 60, 176, 180, 22, W.emas, ["hitung satu per satu"], 10))),
    k(
      SUARA_P4,
      hapus(0, ...idKartu("hs")),
      tambah(idx(SUARA_P4, "dua."), banyakBenda("anggur", 0, 2)),
      tambah(idx(SUARA_P4, "enam."), banyakBenda("jeruk", 1, 6)),
      tambah(idx(SUARA_P4, "empat."), banyakBenda("apel", 2, 4)),
      tambah(idx(SUARA_P4, "tiga."), banyakBenda("pisang", 3, 3)),
    ),
    k(SUARA_P5, sorotkan(idx(SUARA_P5, "jeruk,"), ...ID_BUAH("jeruk")), redamkan(idx(SUARA_P5, "anggur."), ...ID_BUAH("jeruk")), sorotkan(idx(SUARA_P5, "anggur."), ...ID_BUAH("anggur"))),
  ],
};

/* ------------------------------ 4. Mengenal turus ------------------------------ */
const DK = buatDt([{ nama: "jeruk", n: 6 }], { y0: 96, rh: 56, sh: 28 });
const SUARA_K1 = "Untuk menghitung banyak benda, kita bisa memakai turus. Turus adalah garis tegak yang mewakili benda.";
const SUARA_K2 = "Jeruk pertama ditandai satu garis. Jeruk kedua ditandai satu garis lagi. Jeruk ketiga juga satu garis.";
const SUARA_K3 = "Jeruk keempat ditandai garis keempat. Sekarang ada empat garis tegak yang berdiri berdampingan.";
const SUARA_K4 = "Garis kelima mencoret miring dan memotong empat garis tegak. Lima garis itu menjadi satu ikat lima.";
const SUARA_K5 = "Jeruk keenam ditandai satu garis baru di samping ikat lima. Jadi ada satu ikat lima dan satu garis, yaitu enam.";
const jr = (i: number) => `b-jeruk-${i}`;

export const ADEGAN_KENAL_TURUS: AdeganStory = {
  id: "kenal-turus",
  judul: "Mengenal turus",
  sumber: "Materi: mengenal turus",
  latar: "#ECFEFF",
  ketukan: [
    k(SUARA_K1, tambah(0, judul("Mengenal turus")), tambah(idx(SUARA_K1, "menghitung"), namaBenda("jeruk", 0), ...barisBenda("jeruk", 0, 1, 6)), tambah(idx(SUARA_K1, "Turus"), ...DK.kepala(), ...DK.kerangkaBaris(0))),
    k(
      SUARA_K2,
      sorotkan(idx(SUARA_K2, "pertama"), jr(1)),
      tambah(idx(SUARA_K2, "pertama"), DK.garisKe(0, 0)),
      redamkan(idx(SUARA_K2, "kedua"), jr(1)),
      sorotkan(idx(SUARA_K2, "kedua"), jr(2)),
      tambah(idx(SUARA_K2, "kedua"), DK.garisKe(0, 1)),
      redamkan(idx(SUARA_K2, "ketiga"), jr(2)),
      sorotkan(idx(SUARA_K2, "ketiga"), jr(3)),
      tambah(idx(SUARA_K2, "ketiga"), DK.garisKe(0, 2)),
    ),
    k(SUARA_K3, redamkan(0, jr(3)), sorotkan(idx(SUARA_K3, "keempat"), jr(4)), tambah(idx(SUARA_K3, "keempat"), DK.garisKe(0, 3))),
    k(SUARA_K4, redamkan(0, jr(4)), sorotkan(idx(SUARA_K4, "kelima"), jr(5)), tambah(idx(SUARA_K4, "kelima"), DK.garisKe(0, 4)), tambah(idx(SUARA_K4, "ikat"), DK.labelIkat(0, 0))),
    k(SUARA_K5, redamkan(0, jr(5)), sorotkan(idx(SUARA_K5, "keenam"), jr(6)), tambah(idx(SUARA_K5, "keenam"), DK.garisKe(0, 5)), tambah(idx(SUARA_K5, "enam"), DK.banyak(0))),
  ],
};
