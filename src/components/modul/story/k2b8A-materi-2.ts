import type { AdeganStory } from "./logika-story";
import { BUAH, W, anak, banyakBenda, barisBenda, buatDt, emo, EMO, idAnak, judul, kartu, namaBenda } from "./k2b8A-gambar";
import { hapus, idx, k, redamkan, sorotkan, tambah } from "./k2b8A-bantu";

/* ------------------------------ 5. Satu ikat lima ------------------------------ */
const DI = buatDt(
  [
    { nama: "5", n: 5 },
    { nama: "6", n: 6 },
    { nama: "10", n: 10 },
  ],
  { sh: 16, kepala: ["bilangan", "turus", ""] },
);
const SUARA_I1 = "Kita lihat lagi turus bilangan lima. Empat garis tegak, lalu satu coretan miring, itu satu ikat lima.";
const SUARA_I2 = "Bilangan enam, yaitu satu ikat lima dan satu garis di sebelahnya.";
const SUARA_I3 = "Bilangan sepuluh, yaitu dua ikat lima, tanpa garis sisa.";
const SUARA_I4 = "Menghitung ikat lima itu cepat. Satu ikat lima, dua ikat lima, lalu sepuluh.";
const SUARA_I5 = "Ingat, empat garis tegak dan satu coretan miring menjadi satu ikat lima. Dengan ikat lima, turus mudah dihitung.";

export const ADEGAN_IKAT_LIMA: AdeganStory = {
  id: "ikat-lima",
  judul: "Satu ikat lima",
  sumber: "Materi: turus dan ikat lima",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_I1,
      tambah(0, judul("Satu ikat lima"), ...DI.kepala(), ...DI.kerangkaBaris(0)),
      tambah(idx(SUARA_I1, "Empat"), ...DI.turus(0, 0, 4)),
      tambah(idx(SUARA_I1, "coretan"), DI.garisKe(0, 4)),
      sorotkan(idx(SUARA_I1, "ikat"), "dt-b0"),
    ),
    k(
      SUARA_I2,
      redamkan(0, "dt-b0"),
      tambah(idx(SUARA_I2, "enam,"), ...DI.kerangkaBaris(1)),
      tambah(idx(SUARA_I2, "satu"), ...DI.ikat(1, 0)),
      tambah(idx(SUARA_I2, "garis"), DI.garisKe(1, 5)),
      sorotkan(idx(SUARA_I2, "garis"), "dt-b1"),
    ),
    k(
      SUARA_I3,
      redamkan(0, "dt-b1"),
      tambah(idx(SUARA_I3, "sepuluh,"), ...DI.kerangkaBaris(2)),
      tambah(idx(SUARA_I3, "dua"), ...DI.ikat(2, 0)),
      tambah(idx(SUARA_I3, "lima,"), ...DI.ikat(2, 1)),
      sorotkan(idx(SUARA_I3, "lima,"), "dt-b2"),
    ),
    k(SUARA_I4, redamkan(0, "dt-b2"), tambah(idx(SUARA_I4, "Satu"), DI.labelIkat(2, 0)), tambah(idx(SUARA_I4, "dua"), DI.labelIkat(2, 1))),
    k(SUARA_I5, tambah(idx(SUARA_I5, "Ingat,"), ...kartu("ik", 40, 172, 220, 26, W.emas, ["1 ikat lima: 5 garis"], 10)), tambah(idx(SUARA_I5, "mudah"), emo("ok", 270, 190, "✅", 20))),
  ],
};

/* ------------------------------ 6. Diagram turus buah ------------------------------ */
const DB = buatDt(BUAH);
const SUARA_T1 = "Sekarang Upe membuat diagram turus untuk data buahnya. Setiap jenis buah mendapat satu baris.";
const SUARA_T2 = "Anggur ada dua, jadi turusnya dua garis tegak. Tidak ada ikat lima.";
const SUARA_T3 = "Jeruk ada enam, yaitu satu ikat lima dan satu garis.";
const SUARA_T4 = "Apel ada empat, jadi empat garis tegak. Pisang ada tiga, jadi tiga garis tegak.";
const SUARA_T5 = "Angka banyaknya ditaruh di kolom paling kanan. Dua, enam, empat, dan tiga.";
const SUARA_T6 = "Turus jeruk paling panjang, jadi jeruk paling banyak. Turus anggur paling pendek, jadi anggur paling sedikit.";

export const ADEGAN_TURUS_BUAH: AdeganStory = {
  id: "turus-buah",
  judul: "Diagram turus buah",
  sumber: "Materi: membuat diagram turus",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_T1, tambah(0, judul("Diagram turus buah"), ...DB.kepala()), tambah(idx(SUARA_T1, "jenis"), ...BUAH.flatMap((_, r) => DB.kerangkaBaris(r)))),
    k(SUARA_T2, tambah(idx(SUARA_T2, "jadi"), ...DB.semua(0))),
    k(SUARA_T3, tambah(idx(SUARA_T3, "satu"), ...DB.ikat(1, 0)), tambah(idx(SUARA_T3, "garis."), DB.garisKe(1, 5))),
    k(SUARA_T4, tambah(idx(SUARA_T4, "jadi", 1), ...DB.semua(2)), tambah(idx(SUARA_T4, "jadi", 2), ...DB.semua(3))),
    k(
      SUARA_T5,
      tambah(idx(SUARA_T5, "Dua,"), DB.banyak(0)),
      tambah(idx(SUARA_T5, "enam,"), DB.banyak(1)),
      tambah(idx(SUARA_T5, "empat,"), DB.banyak(2)),
      tambah(idx(SUARA_T5, "tiga."), DB.banyak(3)),
    ),
    k(SUARA_T6, sorotkan(idx(SUARA_T6, "jeruk"), ...DB.sorot(1)), redamkan(idx(SUARA_T6, "anggur"), ...DB.sorot(1)), sorotkan(idx(SUARA_T6, "anggur"), ...DB.sorot(0))),
  ],
};

/* ------------------------------ 7. Halim dan hewan ternak ------------------------------ */
const SUARA_H1 = "Halim memelihara hewan ternak. Ada ayam, kambing, sapi, dan bebek.";
const SUARA_H2 = "Halim menata hewannya menurut jenis. Ayam ada sepuluh, dan kambing ada delapan.";
const SUARA_H3 = "Sapi ada enam, dan bebek ada sebelas. Semua hewan sudah dikelompokkan menurut jenisnya.";
const SUARA_H4 = "Hewan sebanyak ini sulit dibandingkan kalau hanya dilihat. Halim ingin membuat diagram turus.";
const ICON = ["ayam", "kambing", "sapi", "bebek"];

export const ADEGAN_PETERNAK: AdeganStory = {
  id: "peternak",
  judul: "Halim dan hewan ternak",
  sumber: "Materi: data hewan ternak",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Hewan ternak Halim")),
      tambah(idx(SUARA_H1, "Halim"), ...anak("halim", 36, 70)),
      ...ICON.map((nm, i) => tambah(idx(SUARA_H1, i === 3 ? "bebek" : nm), emo(`ic${i + 1}`, 110 + i * 46, 96, EMO[nm], 30))),
    ),
    k(
      SUARA_H2,
      hapus(0, ...idAnak("halim"), "ic1", "ic2", "ic3", "ic4"),
      tambah(idx(SUARA_H2, "Ayam"), namaBenda("ayam", 0), ...barisBenda("ayam", 0, 1, 10)),
      tambah(idx(SUARA_H2, "sepuluh,"), banyakBenda("ayam", 0, 10)),
      tambah(idx(SUARA_H2, "kambing"), namaBenda("kambing", 1), ...barisBenda("kambing", 1, 1, 8)),
      tambah(idx(SUARA_H2, "delapan."), banyakBenda("kambing", 1, 8)),
    ),
    k(
      SUARA_H3,
      tambah(idx(SUARA_H3, "Sapi"), namaBenda("sapi", 2), ...barisBenda("sapi", 2, 1, 6)),
      tambah(idx(SUARA_H3, "enam,"), banyakBenda("sapi", 2, 6)),
      tambah(idx(SUARA_H3, "bebek"), namaBenda("bebek", 3), ...barisBenda("bebek", 3, 1, 11)),
      tambah(idx(SUARA_H3, "sebelas."), banyakBenda("bebek", 3, 11)),
    ),
    k(SUARA_H4, tambah(idx(SUARA_H4, "membuat"), ...kartu("hd", 50, 172, 200, 26, W.emas, ["buat diagram turus"], 11))),
  ],
};
