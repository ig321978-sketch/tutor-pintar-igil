import type { AdeganStory } from "./logika-story";
import {
  LEBAH,
  OWL,
  W,
  alasanSaja,
  bayangan,
  emo,
  gx,
  idPilihan,
  hasilBanding,
  hasilLompat,
  judul,
  kartu,
  kartuBanding,
  kartuUrut,
  lompatan,
  ordinalUrut,
  penanda,
  penandaUrut,
  pilih,
  soalLompat,
  sumbu,
  sumbuSatuan,
  tandaSaja,
  tempat,
} from "./k2b7B-gambar";
import { hapus, idx, k, sorotkan, tambah, ubah } from "./k2b7B-bantu";


/** Kata pilihan untuk latihan membandingkan. */
export const KATA_PILIHAN = ["lebih besar dari", "lebih kecil dari", "sama dengan"];

/* ------------------------------ 16. Latihan satu: pilih kata perbandingan ------------------------------ */
const SUARA_N1 = "Latihan satu. Lihat dua bilangan di layar.";
const SUARA_N2 = "Empat puluh tujuh dan tujuh puluh empat. Pilih kata yang tepat, lalu ketuk jawabanmu.";
const SUARA_N3 = "Betul! Empat puluhan lebih kecil dari tujuh puluhan, jadi empat puluh tujuh lebih kecil dari tujuh puluh empat.";
const SUARA_N4 = "Ingat, lihat puluhannya dulu, baru satuannya.";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan: pilih kata yang tepat",
  sumber: "Materi: Latihan membandingkan",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_N1, tambah(0, judul("Latihan satu")), tambah(idx(SUARA_N1, "bilangan"), kartuBanding(47, 74, 40))),
    k(SUARA_N2, tambah(idx(SUARA_N2, "Pilih"), pilih(112, KATA_PILIHAN, 8.4))),
    k(SUARA_N3, sorotkan(idx(SUARA_N3, "Betul"), "c2-k"), tambah(idx(SUARA_N3, "jadi"), tandaSaja(47, 74, 78))),
    k(SUARA_N4, hapus(0, ...idPilihan(3)), tambah(idx(SUARA_N4, "lihat"), alasanSaja(47, 74, 124))),
  ],
};

/* ------------------------------ 17. Latihan dua: puluhan sama, mana yang lebih besar ------------------------------ */
const SUARA_O1 = "Latihan dua. Lihat dua bilangan: tiga puluh tujuh dan tiga puluh satu.";
const SUARA_O2 = "Puluhannya sama. Mana yang lebih besar? Ketuk jawabanmu.";
const SUARA_O3 = "Betul, tiga puluh tujuh! Satuan tujuh lebih banyak dari satuan satu.";
const SUARA_O4 = "Jadi tiga puluh tujuh lebih besar dari tiga puluh satu.";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan: mana yang lebih besar",
  sumber: "Materi: Latihan puluhan sama",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Latihan dua")), tambah(idx(SUARA_O1, "tujuh"), kartuBanding(37, 31, 40))),
    k(SUARA_O2, tambah(idx(SUARA_O2, "Ketuk"), pilih(112, ["37", "31"], 20, 36))),
    k(SUARA_O3, sorotkan(idx(SUARA_O3, "Betul"), "c1-k")),
    k(SUARA_O4, hapus(0, ...idPilihan(2)), tambah(idx(SUARA_O4, "Jadi"), hasilBanding(37, 31, 78, 124))),
  ],
};

/* ------------------------------ 18. Latihan tiga: lebihnya pada garis bilangan ------------------------------ */
const S_L3 = sumbuSatuan(64, 9, 96);
const SUARA_P1 = "Latihan tiga. Lebah ada di bilangan enam puluh enam.";
const SUARA_P2 = "Lebah akan maju tiga langkah ke kanan. Di bilangan berapa lebah sekarang? Ketuk jawabanmu.";
const SUARA_P3 = "Betul, enam puluh sembilan! Enam puluh enam maju tiga langkah sampai di enam puluh sembilan.";
const SUARA_P4 = "Jadi tiga lebihnya dari enam puluh enam adalah enam puluh sembilan.";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan: maju pada garis bilangan",
  sumber: "Materi: Latihan lebihnya",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_P1, tambah(0, judul("Latihan tiga")), tambah(0, sumbu(S_L3)), tambah(idx(SUARA_P1, "Lebah"), penanda(S_L3, 66, LEBAH))),
    k(SUARA_P2, tambah(idx(SUARA_P2, "maju"), soalLompat("maju 3", 44)), tambah(idx(SUARA_P2, "Ketuk"), pilih(140, ["68", "69", "70"], 20, 34))),
    k(
      SUARA_P3,
      hapus(0, "gb-soal"),
      sorotkan(idx(SUARA_P3, "Betul"), "c2-k"),
      tambah(idx(SUARA_P3, "maju"), bayangan(S_L3, 66, LEBAH)),
      ubah(idx(SUARA_P3, "sampai"), { id: "gb-m", x: gx(S_L3, 69) }),
      tambah(idx(SUARA_P3, "sampai"), lompatan(S_L3, 66, 69)),
    ),
    k(SUARA_P4, hapus(0, ...idPilihan(3)), tambah(idx(SUARA_P4, "adalah"), hasilLompat(66, 69, 150))),
  ],
};

/* ------------------------------ 19. Latihan empat: paling kecil dan urutan ------------------------------ */
const T_L4 = [0, 1, 2].map((i) => tempat(i, 3, 40, 44));
const SUARA_Q1 = "Latihan empat. Perhatikan tiga bilangan: enam puluh dua, dua puluh sembilan, dan empat puluh satu.";
const SUARA_Q2 = "Lihat puluhannya. Bilangan mana yang paling kecil? Ketuk jawabanmu.";
const SUARA_Q3 = "Betul, dua puluh sembilan! Puluhannya paling sedikit, jadi bilangan ini paling kecil.";
const SUARA_Q4 = "Urutan dari yang paling kecil: dua puluh sembilan, empat puluh satu, enam puluh dua.";

export const ADEGAN_LATIHAN_EMPAT: AdeganStory = {
  id: "latihan-empat",
  judul: "Latihan: bilangan paling kecil",
  sumber: "Materi: Latihan mengurutkan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Latihan empat")),
      tambah(idx(SUARA_Q1, "dua"), kartuUrut(1, 62, T_L4[0])),
      tambah(idx(SUARA_Q1, "sembilan"), kartuUrut(2, 29, T_L4[1])),
      tambah(idx(SUARA_Q1, "satu"), kartuUrut(3, 41, T_L4[2])),
    ),
    k(SUARA_Q2, sorotkan(idx(SUARA_Q2, "puluhannya"), "ur1-k", "ur2-k", "ur3-k"), tambah(idx(SUARA_Q2, "Ketuk"), pilih(116, ["41", "29", "62"], 20, 34))),
    k(SUARA_Q3, ubah(0, { id: "ur1-k", sorot: false }, { id: "ur2-k", sorot: false }, { id: "ur3-k", sorot: false }), sorotkan(idx(SUARA_Q3, "Betul"), "c2-k"), tambah(idx(SUARA_Q3, "paling", 2), penandaUrut(2, T_L4[1], "paling kecil", 98, 10))),
    k(
      SUARA_Q4,
      hapus(0, ...idPilihan(3)),
      tambah(idx(SUARA_Q4, "sembilan"), ordinalUrut(2, T_L4[1], "pertama", 118)),
      tambah(idx(SUARA_Q4, "satu"), ordinalUrut(3, T_L4[2], "kedua", 118)),
      tambah(idx(SUARA_Q4, "dua", 2), ordinalUrut(1, T_L4[0], "ketiga", 118)),
    ),
  ],
};

/* ------------------------------ 20. Penutup ------------------------------ */
const SUARA_R1 = "Mari kita ingat lagi. Pada garis bilangan, bilangan di kanan lebih besar dan bilangan di kiri lebih kecil.";
const SUARA_R2 = "Untuk membandingkan dua bilangan, lihat puluhannya dulu. Kalau puluhannya sama, lihat satuannya.";
const SUARA_R3 = "Kita juga bisa mengurutkan bilangan dari yang paling kecil. Terima kasih, sampai jumpa!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Ringkasan membandingkan bilangan",
  sumber: "Materi: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Ringkasan")), tambah(idx(SUARA_R1, "kanan"), ...kartu("e1", 14, 40, 272, 36, W.hijauMuda, ["kanan lebih besar, kiri lebih kecil"], 10.4))),
    k(SUARA_R2, tambah(idx(SUARA_R2, "puluhannya"), ...kartu("e2", 14, 86, 272, 36, W.langit, ["lihat puluhan dulu, lalu satuan"], 10.4))),
    k(SUARA_R3, tambah(idx(SUARA_R3, "mengurutkan"), ...kartu("e3", 14, 132, 272, 36, W.pink, ["urutkan dari paling kecil"], 10.4)), tambah(idx(SUARA_R3, "Terima"), emo("ow", 150, 192, OWL, 24))),
  ],
};
