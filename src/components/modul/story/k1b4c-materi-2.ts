import type { AdeganStory } from "./logika-story";
import { W, emo, judul, kartu, kereta, KERETA_ID, KERETA_RODA, lidi, rumah, tempatLidi, teks } from "./k1b4c-gambar";
import { bersih, hapus, hitungBagian, idx, k, rangkai, redamkan, sorotkan, tambah, tandaiSatuSatu, ubah } from "./k1b4c-bantu";

const ANAK = "\u{1F9D2}";
const IGIL = "\u{1F989}";
const PERMANEN = { putus: false, warna: W.coklat, tebal: 4.5 };

/* ------------------------------ 1. Jenis dan banyak penyusun rumah ------------------------------ */
const SUARA_H1 = "Mari kita cari tahu, rumah mainan tadi disusun dari bentuk apa saja. Kita lihat jenisnya, lalu kita hitung banyaknya.";
const SUARA_H2 = "Segitiga hanya ada di atap rumah. Kita hitung segitiganya. Segitiga ada satu.";
const SUARA_H3 = "Dinding, pintu, dan jendela berbentuk segi empat. Kita hitung: satu, dua, tiga. Segi empat ada tiga.";
const SUARA_H4 = "Tidak ada bentuk lengkung pada rumah ini. Jadi lengkung ada nol.";
const SUARA_H5 = "Satu ditambah tiga sama dengan empat. Jadi rumah mainan ini tersusun dari empat bagian.";

export const ADEGAN_JENIS: AdeganStory = {
  id: "jenis-rumah",
  judul: "Jenis dan banyak penyusun rumah",
  sumber: "Materi: jenis dan banyak penyusun",
  latar: "#F0FDFA",
  ketukan: [
    k(SUARA_H1, bersih(0), tambah(0, judul("Penyusun rumah")), tambah("rumah", ...rumah(false))),
    k(SUARA_H2, ...hitungBagian(SUARA_H2, ["rm0"], "segitiga", "hg", 44, 70, "segitiganya.")),
    k(SUARA_H3, redamkan(0, "rm0"), ...hitungBagian(SUARA_H3, ["rm1", "rm2", "rm3"], "segi empat", "hs", 44, 88, "hitung:")),
    k(SUARA_H4, redamkan(0, "rm3"), tambah("lengkung", teks("hl", 44, 106, "lengkung: 0", 10, W.merah))),
    k(SUARA_H5, ...rangkai(SUARA_H5, "ha", 184, ["1", "+", "3", "=", "4"], ["Satu", "ditambah", "tiga", "sama", "empat."], undefined, 20)),
  ],
};

/* ------------------------------ 2. Menyusun itu menambah: kereta 5 + 1 + 3 ------------------------------ */
const SUARA_I1 = "Sekarang kita lihat kereta tadi lagi. Ada lima segi empat, satu segitiga, dan tiga bentuk lengkung.";
const SUARA_I2 = "Kita tambahkan banyak tiap jenis. Lima segi empat ditambah satu segitiga sama dengan enam.";
const SUARA_I3 = "Sekarang enam ditambah tiga bentuk lengkung sama dengan sembilan.";
const SUARA_I4 = "Jadi kereta ini punya sembilan bagian. Lima ditambah satu ditambah tiga sama dengan sembilan.";
const SUARA_I5 = "Menyusun berarti menambah bagian. Makin banyak keping yang kita susun, makin banyak bagian kereta.";

export const ADEGAN_TAMBAH_BAGIAN: AdeganStory = {
  id: "tambah-bagian",
  judul: "Menyusun itu menambah",
  sumber: "Materi: menyusun itu menambah",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_I1,
      bersih(0),
      tambah(0, judul("Menyusun itu menambah")),
      tambah(0, ...kereta(40, 40)),
      sorotkan("lima", ...KERETA_ID),
      redamkan("satu,", ...KERETA_ID),
      sorotkan("satu,", "kr5"),
      redamkan("tiga", "kr5"),
      sorotkan("tiga", ...KERETA_RODA),
    ),
    k(
      SUARA_I2,
      redamkan(0, ...KERETA_RODA),
      sorotkan("Lima", ...KERETA_ID),
      redamkan("satu", ...KERETA_ID),
      sorotkan("satu", "kr5"),
      ...rangkai(SUARA_I2, "ia", 146, ["5", "+", "1", "=", "6"], ["Lima", "ditambah", "satu", "sama", "enam."], "jenis."),
    ),
    k(
      SUARA_I3,
      redamkan(0, "kr5"),
      sorotkan("tiga", ...KERETA_RODA),
      ...rangkai(SUARA_I3, "ib", 176, ["6", "+", "3", "=", "9"], ["enam", "ditambah", "tiga", "sama", "sembilan."]),
    ),
    k(
      SUARA_I4,
      redamkan(0, ...KERETA_RODA),
      hapus(0, ...["ia", "ib"].flatMap((p) => [0, 1, 2, 3, 4].map((i) => `${p}${i}`))),
      tambah("Lima", ...kartu("is", 70, 140, 160, 40, W.emas, ["5 + 1 + 3 = 9"], 18)),
      sorotkan("sembilan", "is-k"),
    ),
    k(SUARA_I5, redamkan(0, "is-k"), tambah("Menyusun", emo("pl", 262, 160, "\u{2795}", 30)), tambah("Makin", emo("ow", 38, 160, IGIL, 30))),
  ],
};

/* ------------------------------ 3. Mengurai itu mengurangi: kereta 9 - 3 ------------------------------ */
const SUARA_J1 = "Sekarang kita uraikan kereta. Kereta ini punya sembilan bagian. Kita lepas tiga roda kereta.";
const SUARA_J2 = "Ketuk tiga roda supaya lepas dari kereta. Satu, dua, tiga.";
const SUARA_J3 = "Tinggal enam bagian di kereta. Sembilan kurang tiga sama dengan enam.";
const SUARA_J4 = "Sekarang kita pasang lagi tiga roda itu. Enam ditambah tiga sama dengan sembilan. Pengurangan dan penjumlahan saling berkebalikan.";
const SUARA_J5 = "Jadi mengurai bisa kita hitung dengan kurang. Menyusun bisa kita hitung dengan tambah. Hebat!";

export const ADEGAN_KURANG_BAGIAN: AdeganStory = {
  id: "kurang-bagian",
  judul: "Mengurai itu mengurangi",
  sumber: "Materi: mengurai itu mengurangi",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_J1,
      bersih(0),
      tambah(0, judul("Mengurai itu mengurangi")),
      tambah(0, ...kereta(40, 34)),
      tambah("sembilan", teks("jb", 150, 152, "9 bagian", 13, W.merah)),
      sorotkan("roda", ...KERETA_RODA),
    ),
    k(SUARA_J2, redamkan(0, ...KERETA_RODA), ...tandaiSatuSatu(SUARA_J2, KERETA_RODA, { op: 0.3, y: 126 }, "kereta.")),
    k(
      SUARA_J3,
      ubah("enam", { id: "jb", isi: "6 bagian" }),
      ...rangkai(SUARA_J3, "ja", 184, ["9", "−", "3", "=", "6"], ["Sembilan", "kurang", "tiga", "sama", "enam."], "kereta.", 20),
    ),
    k(
      SUARA_J4,
      hapus(0, ...[0, 1, 2, 3, 4].map((i) => `ja${i}`)),
      ubah("pasang", ...KERETA_RODA.map((id) => ({ id, op: 1, y: 92 }))),
      ubah("sembilan.", { id: "jb", isi: "9 bagian" }),
      ...rangkai(SUARA_J4, "jc", 184, ["6", "+", "3", "=", "9"], ["Enam", "ditambah", "tiga", "sama", "sembilan."], "itu.", 20),
    ),
    k(
      SUARA_J5,
      bersih(0),
      tambah(0, judul("Kurang dan tambah")),
      tambah("mengurai", ...kartu("jk", 40, 44, 220, 40, W.pink, ["mengurai: hitung kurang"], 11)),
      tambah("Menyusun", ...kartu("jt", 40, 100, 220, 40, W.hijauMuda, ["menyusun: hitung tambah"], 11)),
      tambah("Hebat!", emo("ow", 150, 170, IGIL, 34)),
    ),
  ],
};

/* ------------------------------ 4. Segitiga dan segi empat dari lidi ------------------------------ */
const SUARA_K1 = "Ayo bermain lidi! Kira, Upe, dan Halim punya banyak lidi yang sama panjang. Kita susun lidi menjadi bentuk yang mereka suka.";
const SUARA_K2 = "Tiga lidi bisa menjadi segitiga. Ketuk garis putus-putus untuk meletakkan lidi: satu, dua, tiga.";
const SUARA_K3 = "Lalu empat lidi bisa menjadi segi empat. Ketuk lagi untuk meletakkan lidi: satu, dua, tiga, empat.";
const SUARA_K4 = "Tiga lidi untuk segitiga, empat lidi untuk segi empat. Lidinya sama panjang, tetapi banyaknya berbeda.";
const SEGITIGA = [[45, 150, 105, 150], [45, 150, 75, 98], [105, 150, 75, 98]];
const SEGI4 = [[170, 150, 230, 150], [170, 150, 170, 90], [230, 150, 230, 90], [170, 90, 230, 90]];

export const ADEGAN_LIDI_BENTUK: AdeganStory = {
  id: "lidi-bentuk",
  judul: "Bentuk dari lidi",
  sumber: "Materi: segitiga dan segi empat dari lidi",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_K1,
      bersih(0),
      tambah(0, judul("Bermain lidi")),
      tambah("Kira,", emo("a-Kira", 60, 60, ANAK, 26), teks("n-Kira", 60, 74, "Kira", 8.4)),
      tambah("Upe,", emo("a-Upe", 150, 60, ANAK, 26), teks("n-Upe", 150, 74, "Upe", 8.4)),
      tambah("Halim", emo("a-Halim", 240, 60, ANAK, 26), teks("n-Halim", 240, 74, "Halim", 8.4)),
      tambah("panjang.", ...[0, 1, 2, 3, 4].map((i) => lidi(`bd${i}`, 80, 110 + 12 * i, 220, 110 + 12 * i))),
    ),
    k(
      SUARA_K2,
      bersih(0),
      tambah(0, judul("Segitiga dari lidi")),
      tambah("segitiga.", ...SEGITIGA.map(([a, b, c, d], i) => tempatLidi(`kt${i}`, a, b, c, d))),
      ...tandaiSatuSatu(SUARA_K2, ["kt0", "kt1", "kt2"], PERMANEN, "meletakkan"),
      tambah(idx(SUARA_K2, "tiga", 2), teks("lk3", 75, 172, "segitiga: 3 lidi", 9, W.merah)),
    ),
    k(
      SUARA_K3,
      tambah("segi", ...SEGI4.map(([a, b, c, d], i) => tempatLidi(`ks${i}`, a, b, c, d))),
      ...tandaiSatuSatu(SUARA_K3, ["ks0", "ks1", "ks2", "ks3"], PERMANEN, "meletakkan"),
      tambah(idx(SUARA_K3, "empat", 3), teks("lk4", 200, 172, "segi empat: 4 lidi", 9, W.merah)),
    ),
    k(SUARA_K4, sorotkan("Tiga", "lk3"), redamkan("empat", "lk3"), sorotkan("empat", "lk4"), tambah("Lidinya", emo("ow", 150, 60, IGIL, 30))),
  ],
};

/* ------------------------------ 5. Rumah dari enam lidi ------------------------------ */
const SUARA_L1 = "Sekarang Halim membuat rumah dari lidi. Dindingnya segi empat, jadi dindingnya memakai empat lidi.";
const SUARA_L2 = "Ketuk empat tempat lidi untuk dindingnya. Satu, dua, tiga, empat.";
const SUARA_L3 = "Untuk atapnya, Halim memakai dua lidi lagi. Atap itu segitiga. Ketuk dua tempat lidi: satu, dua.";
const SUARA_L4 = "Sisi atas dinding juga menjadi dasar atap. Jadi dasar atap tidak perlu lidi baru.";
const SUARA_L5 = "Empat lidi ditambah dua lidi sama dengan enam lidi. Rumah dari lidi itu memakai enam lidi.";
const DINDING = [[120, 160, 180, 160], [120, 160, 120, 100], [180, 160, 180, 100], [120, 100, 180, 100]];
const ATAP = [[120, 100, 150, 48], [180, 100, 150, 48]];

export const ADEGAN_LIDI_RUMAH: AdeganStory = {
  id: "lidi-rumah",
  judul: "Rumah dari lidi",
  sumber: "Materi: rumah dari enam lidi",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_L1,
      bersih(0),
      tambah(0, judul("Rumah dari lidi")),
      tambah("Halim", emo("a-Halim", 40, 60, ANAK, 26), teks("n-Halim", 40, 74, "Halim", 8.4)),
      tambah("Dindingnya", ...DINDING.map(([a, b, c, d], i) => tempatLidi(`ld${i}`, a, b, c, d))),
    ),
    k(
      SUARA_L2,
      ...tandaiSatuSatu(SUARA_L2, ["ld0", "ld1", "ld2", "ld3"], PERMANEN, "dindingnya."),
      tambah(idx(SUARA_L2, "empat", 2), teks("lw", 60, 130, "dinding: 4 lidi", 9, W.merah)),
    ),
    k(
      SUARA_L3,
      tambah("atapnya,", ...ATAP.map(([a, b, c, d], i) => tempatLidi(`ld${i + 4}`, a, b, c, d))),
      ...tandaiSatuSatu(SUARA_L3, ["ld4", "ld5"], PERMANEN, "tempat"),
      tambah(idx(SUARA_L3, "dua", 3), teks("la", 240, 84, "atap: 2 lidi", 9, W.merah)),
    ),
    k(
      SUARA_L4,
      sorotkan("Sisi", "ld3"),
      tambah("Jadi", teks("ls", 150, 186, "dasar atap = sisi atas dinding", 9, W.merah)),
    ),
    k(
      SUARA_L5,
      redamkan(0, "ld3"),
      hapus(0, "ls"),
      ...rangkai(SUARA_L5, "lr", 188, ["4", "+", "2", "=", "6"], ["Empat", "ditambah", "dua", "sama", "enam"], undefined, 20),
      sorotkan("memakai", "ld0", "ld1", "ld2", "ld3", "ld4", "ld5"),
    ),
  ],
};
