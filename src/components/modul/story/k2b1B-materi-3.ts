import type { Aksi, AdeganStory, Obj } from "./logika-story";
import { OWL, TABEL_KECIL, W, angkaP, angkaS, batangPapan, emo, kartu, kubus, kubusPapan, labelN, legenda, tabelNT, teks, titikKubusPapan, judul } from "./k2b1B-gambar";
import { bersih, hapus, idBatangRentang, idKubus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k2b1B-bantu";

const T = TABEL_KECIL;
/** Geser kubus nomor `dari` sampai `sampai` ke tempat kubus nomor (j kurang `kurang`) di kisi papan. */
const geser = (at: string | number | undefined, dari: number, sampai: number, kurang: number): Aksi => ({
  at,
  ubah: Array.from({ length: sampai - dari + 1 }, (_, q) => ({ id: `bsa${dari + q}`, x: titikKubusPapan(dari + q - kurang).x, y: titikKubusPapan(dari + q - kurang).y })),
});
/** Kubus lepas nomor `dari` sampai `sampai` yang sudah bergeser `kurang` tempat ke atas. */
const kubusGeser = (dari: number, sampai: number, kurang: number): Obj[] => Array.from({ length: sampai - dari + 1 }, (_, q) => kubus("a", dari + q, titikKubusPapan(dari + q - kurang).x, titikKubusPapan(dari + q - kurang).y));
const N = (isi: string): Obj => labelN("a", 215, 38, isi, 20);

/* ------------------------------ 8. Cara pertama: dua puluh enam satuan ------------------------------ */
const SUARA_E1 = "Malosi punya dua puluh enam kubus. Ia ingin menuliskannya dengan tiga cara.";
const SUARA_E2 = "Cara pertama, semua kubus dibiarkan lepas. Tidak ada satu pun batang.";
const SUARA_E3 = "Kolom puluhan kita isi nol. Kolom satuan kita isi dua puluh enam.";
const SUARA_E4 = "Dua puluh enam adalah nol puluhan dan dua puluh enam satuan. Cara ini benar.";
const SUARA_E5 = "Tetapi kita harus menghitung dua puluh enam kubus satu per satu. Ayo cari cara yang lebih rapi.";

export const ADEGAN_CARA_SATU: AdeganStory = {
  id: "cara-satu",
  judul: "Cara pertama: semua kubus lepas",
  sumber: "Materi: tiga cara menulis satu bilangan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_E1, tambah(0, judul("Tiga cara menulis"), ...legenda()), tambah(idx(SUARA_E1, "dua"), N("26")), tambah(idx(SUARA_E1, "kubus"), ...kubusPapan("a", 0, 25))),
    k(SUARA_E2, tambah(idx(SUARA_E2, "Cara"), ...tabelNT("a", T)), sorotkan(idx(SUARA_E2, "semua"), ...idKubus("a", 0, 25)), redamkan(idx(SUARA_E2, "Tidak"), ...idKubus("a", 0, 25))),
    k(SUARA_E3, tambah(idx(SUARA_E3, "nol."), angkaP("a", T, "0")), tambah(idx(SUARA_E3, "dua"), angkaS("a", T, "26"))),
    k(SUARA_E4, sorotkan(idx(SUARA_E4, "nol"), "ta-p"), redamkan(idx(SUARA_E4, "dan"), "ta-p"), sorotkan(idx(SUARA_E4, "dan"), "ta-s"), redamkan(idx(SUARA_E4, "Cara"), "ta-s"), tambah(idx(SUARA_E4, "benar."), emo("ok", 262, 196, "✅", 20))),
    k(SUARA_E5, hapus(0, "ok"), sorotkan(idx(SUARA_E5, "menghitung"), ...idKubus("a", 0, 25)), redamkan(idx(SUARA_E5, "Ayo"), ...idKubus("a", 0, 25)), tambah(idx(SUARA_E5, "Ayo"), emo("q", 262, 196, "\u{1F615}", 22))),
  ],
};

/* ------------------------------ 9. Cara kedua: satu puluhan enam belas satuan ------------------------------ */
const SUARA_F1 = "Mari kita lihat lagi dua puluh enam kubus Malosi.";
const SUARA_F2 = "Cara kedua. Malosi menyatukan sepuluh kubus menjadi satu batang.";
const SUARA_F3 = "Sisanya masih lepas. Ada enam belas kubus lepas.";
const SUARA_F4 = "Kolom puluhan kita isi satu. Kolom satuan kita isi enam belas.";
const SUARA_F5 = "Dua puluh enam adalah satu puluhan dan enam belas satuan. Cara ini juga benar.";
const SUARA_F6 = "Tetapi sepuluh kubus lepas masih bisa disusun lagi.";

export const ADEGAN_CARA_DUA: AdeganStory = {
  id: "cara-dua",
  judul: "Cara kedua: satu puluhan dan enam belas satuan",
  sumber: "Materi: tiga cara menulis satu bilangan",
  latar: "#FFF1F2",
  ketukan: [
    k(SUARA_F1, tambah(0, judul("Cara kedua"), ...legenda()), tambah(idx(SUARA_F1, "dua"), N("26")), tambah(idx(SUARA_F1, "kubus"), ...kubusPapan("a", 0, 25))),
    k(SUARA_F2, hapus(idx(SUARA_F2, "menyatukan"), ...idKubus("a", 0, 9)), tambah(idx(SUARA_F2, "menyatukan"), ...batangPapan("a", 0)), geser(idx(SUARA_F2, "menyatukan"), 10, 25, 10)),
    k(SUARA_F3, tambah(idx(SUARA_F3, "Sisanya"), ...tabelNT("a", T)), sorotkan(idx(SUARA_F3, "Ada"), ...idKubus("a", 10, 25)), tambah(idx(SUARA_F3, "enam"), teks("lb16", 215, 84, "16", 14, W.merah))),
    k(SUARA_F4, redamkan(0, ...idKubus("a", 10, 25)), tambah(idx(SUARA_F4, "satu."), angkaP("a", T, "1")), tambah(idx(SUARA_F4, "enam"), angkaS("a", T, "16"))),
    k(SUARA_F5, sorotkan(idx(SUARA_F5, "satu"), "ta-p"), redamkan(idx(SUARA_F5, "dan"), "ta-p"), sorotkan(idx(SUARA_F5, "dan"), "ta-s"), redamkan(idx(SUARA_F5, "Cara"), "ta-s"), tambah(idx(SUARA_F5, "benar."), emo("ok", 262, 196, "✅", 20))),
    k(SUARA_F6, hapus(0, "ok"), sorotkan(idx(SUARA_F6, "sepuluh"), ...idKubus("a", 10, 19)), tambah(idx(SUARA_F6, "disusun"), emo("q", 262, 196, "\u{1F914}", 22))),
  ],
};

/* ------------------------------ 10. Cara ketiga: dua puluhan enam satuan ------------------------------ */
const SUARA_G1 = "Cara ketiga. Malosi menyusun semua sepuluh kubus yang bisa disusun.";
const SUARA_G2 = "Sekarang ada dua batang dan enam kubus lepas.";
const SUARA_G3 = "Kolom puluhan kita isi dua. Kolom satuan kita isi enam.";
const SUARA_G4 = "Dua puluh enam adalah dua puluhan dan enam satuan. Ini cara yang paling ringkas.";
const SUARA_G5 = "Cara ini paling ringkas karena satuannya kurang dari sepuluh. Tidak ada lagi sepuluh kubus yang bisa disusun.";
const SUARA_G6 = "Jadi, dua puluh enam bisa ditulis dengan tiga cara. Nilainya sama, tetapi cara ketiga paling ringkas.";

export const ADEGAN_CARA_RINGKAS: AdeganStory = {
  id: "cara-ringkas",
  judul: "Cara ketiga: dua puluhan dan enam satuan",
  sumber: "Materi: tiga cara menulis satu bilangan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Cara ketiga"), N("26"), ...legenda(), ...batangPapan("a", 0), ...kubusGeser(10, 25, 10)),
      hapus(idx(SUARA_G1, "menyusun"), ...idKubus("a", 10, 19)),
      tambah(idx(SUARA_G1, "menyusun"), ...batangPapan("a", 1)),
      geser(idx(SUARA_G1, "menyusun"), 20, 25, 20),
    ),
    k(SUARA_G2, tambah(idx(SUARA_G2, "Sekarang"), ...tabelNT("a", T)), sorotkan(idx(SUARA_G2, "dua"), ...idBatangRentang("a", 0, 1)), redamkan(idx(SUARA_G2, "dan"), ...idBatangRentang("a", 0, 1)), sorotkan(idx(SUARA_G2, "enam"), ...idKubus("a", 20, 25))),
    k(SUARA_G3, redamkan(0, ...idKubus("a", 20, 25)), tambah(idx(SUARA_G3, "dua."), angkaP("a", T, "2")), tambah(idx(SUARA_G3, "enam."), angkaS("a", T, "6"))),
    k(SUARA_G4, sorotkan(idx(SUARA_G4, "dua", 2), "ta-p"), redamkan(idx(SUARA_G4, "dan"), "ta-p"), sorotkan(idx(SUARA_G4, "dan"), "ta-s"), redamkan(idx(SUARA_G4, "Ini"), "ta-s"), tambah(idx(SUARA_G4, "ringkas."), emo("ok", 262, 196, "✅", 20))),
    k(SUARA_G5, hapus(0, "ok"), sorotkan(idx(SUARA_G5, "kurang"), ...idKubus("a", 20, 25)), tambah(idx(SUARA_G5, "Tidak"), emo("bt", 262, 196, "\u{1F44D}", 22))),
    k(
      SUARA_G6,
      bersih(0),
      tambah(0, judul("Tiga cara, satu nilai")),
      tambah(idx(SUARA_G6, "tiga"), ...kartu("w1", 30, 40, 240, 30, W.krem, ["0 puluhan dan 26 satuan"], 11)),
      tambah(idx(SUARA_G6, "cara."), ...kartu("w2", 30, 80, 240, 30, W.pink, ["1 puluhan dan 16 satuan"], 11)),
      tambah(idx(SUARA_G6, "Nilainya"), ...kartu("w3", 30, 120, 240, 30, W.hijauMuda, ["2 puluhan dan 6 satuan"], 11)),
      sorotkan(idx(SUARA_G6, "ketiga"), "w3-k", "w3-t0"),
      tambah(idx(SUARA_G6, "paling"), emo("ow", 150, 190, OWL, 26)),
    ),
  ],
};

/* ------------------------------ 11. Menukar sepuluh satuan ------------------------------ */
/** Letak sepuluh kubus baru ketika satu batang dibuka: enam kubus di baris atas sisa tempat, empat di baris kedua. */
const BUKA = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const SUARA_H1 = "Kira punya satu batang dan empat belas kubus lepas. Nilainya dua puluh empat.";
const SUARA_H2 = "Lihat, sepuluh kubus lepas bisa kita susun. Kita tukar sepuluh kubus satuan dengan satu batang puluhan.";
const SUARA_H3 = "Sekarang ada dua batang dan empat kubus lepas. Nilainya masih dua puluh empat.";
const SUARA_H4 = "Nilainya tidak berubah. Hanya bentuknya yang berubah.";
const SUARA_H5 = "Kita juga bisa membukanya lagi. Satu batang dibuka menjadi sepuluh kubus.";
const SUARA_H6 = "Ditukar atau dibuka, nilainya tetap dua puluh empat.";

export const ADEGAN_TUKAR: AdeganStory = {
  id: "tukar-sepuluh",
  judul: "Menukar sepuluh satuan dengan satu puluhan",
  sumber: "Materi: menukar sepuluh satuan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Tukar sepuluh"), ...legenda(), ...tabelNT("a", T)),
      tambah(idx(SUARA_H1, "batang"), ...batangPapan("a", 0), angkaP("a", T, "1")),
      tambah(idx(SUARA_H1, "kubus"), ...kubusPapan("a", 0, 13), angkaS("a", T, "14")),
      tambah(idx(SUARA_H1, "dua"), N("24")),
    ),
    k(
      SUARA_H2,
      sorotkan(idx(SUARA_H2, "sepuluh"), ...idKubus("a", 0, 9)),
      hapus(idx(SUARA_H2, "batang"), ...idKubus("a", 0, 9)),
      tambah(idx(SUARA_H2, "batang"), ...batangPapan("a", 1)),
      geser(idx(SUARA_H2, "batang"), 10, 13, 10),
      ubah(idx(SUARA_H2, "batang"), { id: "ta-p", isi: "2" }, { id: "ta-s", isi: "4" }),
    ),
    k(SUARA_H3, sorotkan(idx(SUARA_H3, "dua"), ...idBatangRentang("a", 0, 1)), redamkan(idx(SUARA_H3, "dan"), ...idBatangRentang("a", 0, 1)), sorotkan(idx(SUARA_H3, "empat"), ...idKubus("a", 10, 13)), redamkan(idx(SUARA_H3, "Nilainya"), ...idKubus("a", 10, 13))),
    k(SUARA_H4, sorotkan(idx(SUARA_H4, "Nilainya"), "n-a"), redamkan(idx(SUARA_H4, "Hanya"), "n-a")),
    k(
      SUARA_H5,
      redamkan(0, "n-a"),
      hapus(idx(SUARA_H5, "dibuka"), ...idBatangRentang("a", 1, 1)),
      tambah(idx(SUARA_H5, "dibuka"), ...BUKA.map((j, q) => kubus("a", 14 + q, titikKubusPapan(j).x, titikKubusPapan(j).y))),
      ubah(idx(SUARA_H5, "dibuka"), { id: "ta-p", isi: "1" }, { id: "ta-s", isi: "14" }),
    ),
    k(SUARA_H6, sorotkan(idx(SUARA_H6, "nilainya"), "n-a"), tambah(idx(SUARA_H6, "tetap"), emo("ok", 262, 196, "✅", 20))),
  ],
};

/* ------------------------------ 12. Cara yang paling ringkas ------------------------------ */
const SUARA_I1 = "Upe punya dua batang dan delapan belas kubus lepas. Satuannya masih lebih dari sepuluh.";
const SUARA_I2 = "Tukar sepuluh kubus dengan satu batang. Sekarang ada tiga batang dan delapan kubus lepas.";
const SUARA_I3 = "Satuannya tinggal delapan, kurang dari sepuluh. Tidak ada lagi sepuluh kubus yang bisa ditukar.";
const SUARA_I4 = "Tiga puluh delapan adalah tiga puluhan dan delapan satuan. Itulah cara yang paling ringkas.";
const SUARA_I5 = "Ingat, tukar semua sepuluh satuan sampai satuannya kurang dari sepuluh.";

export const ADEGAN_PALING_RINGKAS: AdeganStory = {
  id: "paling-ringkas",
  judul: "Cara menulis yang paling ringkas",
  sumber: "Materi: bentuk paling ringkas",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_I1,
      tambah(0, judul("Paling ringkas"), ...legenda(), ...tabelNT("a", T), N("38")),
      tambah(idx(SUARA_I1, "batang"), ...batangPapan("a", 0), ...batangPapan("a", 1), angkaP("a", T, "2")),
      tambah(idx(SUARA_I1, "kubus"), ...kubusPapan("a", 0, 17), angkaS("a", T, "18")),
      sorotkan(idx(SUARA_I1, "Satuannya"), "ta-s"),
    ),
    k(
      SUARA_I2,
      redamkan(0, "ta-s"),
      hapus(idx(SUARA_I2, "satu"), ...idKubus("a", 0, 9)),
      tambah(idx(SUARA_I2, "satu"), ...batangPapan("a", 2)),
      geser(idx(SUARA_I2, "satu"), 10, 17, 10),
      ubah(idx(SUARA_I2, "satu"), { id: "ta-p", isi: "3" }, { id: "ta-s", isi: "8" }),
    ),
    k(SUARA_I3, sorotkan(idx(SUARA_I3, "Satuannya"), ...idKubus("a", 10, 17)), redamkan(idx(SUARA_I3, "Tidak"), ...idKubus("a", 10, 17))),
    k(SUARA_I4, sorotkan(idx(SUARA_I4, "tiga", 2), "ta-p"), redamkan(idx(SUARA_I4, "dan"), "ta-p"), sorotkan(idx(SUARA_I4, "dan"), "ta-s"), redamkan(idx(SUARA_I4, "Itulah"), "ta-s"), tambah(idx(SUARA_I4, "ringkas."), emo("ok", 262, 196, "✅", 20))),
    k(SUARA_I5, hapus(0, "ok"), tambah(idx(SUARA_I5, "Ingat,"), ...kartu("kr", 30, 166, 240, 26, W.emas, ["tukar sampai satuan kurang dari 10"], 10))),
  ],
};
