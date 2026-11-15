import type { AdeganStory, Obj } from "./logika-story";
import { EMO, W, bendaDi, emo, garisBil, jumlahG, judul, kartu, namaG, penanda, petakKosong, pusatBenda, teks, titikBaris, titikPetak, type GeoG } from "./k2b2C-gambar";
import { bersih, hapus, hitungAksi, idx, ids, k, loncatAksi, redamkan, sorotkan, tambah, ubah } from "./k2b2C-bantu";

const ex = (isi: string, id = "ex", x = 150, y = 168, u = 16): Obj => teks(id, x, y, isi, u, W.merah);

/* ------------------------------ 1. Solusi donat: dua belas dikurangi lima ------------------------------ */
const xDonat = (i: number): number => 26 + 22 * i;
export const Y_KIRA = 70;
export const Y_MALOSI = 130;
const ptsKiraRow = titikBaris(12, 26, Y_KIRA, 22);
const ptsMalosiRow = titikBaris(7, 26, Y_MALOSI, 22);
const petak = (i: number): Obj => petakKosong(`pk${i}`, xDonat(i), Y_MALOSI);
const SUARA_S1 = "Sekarang langkah ketiga, solusi. Kira punya dua belas donat di barisnya.";
const SUARA_S2 = "Malosi punya lima kurangnya. Jadi di baris Malosi ada lima petak yang kosong.";
const SUARA_S3 = "Donat Malosi kita cari dengan mengurangi. Dua belas dikurangi lima sama dengan tujuh.";
const SUARA_S4 = "Kita periksa dengan operasi lawan. Tujuh ditambah lima sama dengan dua belas. Hasilnya cocok.";

export const ADEGAN_DONAT_SOLUSI: AdeganStory = {
  id: "donat-solusi",
  judul: "Solusi: donat Malosi",
  sumber: "Materi: langkah solusi dengan mengurangi",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Langkah 3: solusi")),
      tambah(idx(SUARA_S1, "Kira"), namaG("a", 10, 46, "Kira")),
      tambah(idx(SUARA_S1, "dua"), ...bendaDi("a", EMO.donat, ptsKiraRow, 17), jumlahG("a", 62, 48, "12")),
    ),
    k(
      SUARA_S2,
      tambah(idx(SUARA_S2, "Malosi"), namaG("b", 10, 106, "Malosi"), jumlahG("b", 76, 108, "?")),
      tambah(idx(SUARA_S2, "lima"), ...Array.from({ length: 12 }, (_, i) => petak(i))),
      sorotkan(idx(SUARA_S2, "kosong"), ...ids("pk", 7, 11)),
    ),
    k(
      SUARA_S3,
      hapus(idx(SUARA_S3, "mengurangi"), ...ids("pk", 0, 6)),
      tambah(idx(SUARA_S3, "mengurangi"), ...bendaDi("b", EMO.donat, ptsMalosiRow, 17)),
      tambah(idx(SUARA_S3, "Dua"), ex("12 − 5 = 7")),
      ubah(idx(SUARA_S3, "tujuh"), { id: "eb-ln", isi: "7" }),
    ),
    k(SUARA_S4, redamkan(0, ...ids("pk", 7, 11)), tambah(idx(SUARA_S4, "Tujuh"), ex("7 + 5 = 12", "xk", 130, 192, 14)), tambah(idx(SUARA_S4, "cocok"), emo("ok", 218, 192, "✅", 16))),
  ],
};

/* ------------------------------ 2. Jumlah donat: tujuh ditambah dua belas ------------------------------ */
export const ptsKiraJumlah = titikPetak(12, 4, 24, 116, 24, 28);
export const ptsMalosiJumlah = titikPetak(7, 4, 190, 116, 24, 28);
const SUARA_J1 = "Langkah keempat, kesimpulan. Kesimpulan ditulis dengan kalimat jawaban yang diawali kata jadi. Jadi, donat Malosi ada tujuh buah.";
const SUARA_J2 = "Sekarang pertanyaan kedua. Berapa jumlah donat Kira dan Malosi?";
const SUARA_J3 = "Jumlah berarti digabung, jadi kita tambah. Kita mulai dari dua belas, lalu hitung maju: tiga belas, empat belas, lima belas, enam belas, tujuh belas, delapan belas, sembilan belas.";
const SUARA_J4 = "Tujuh ditambah dua belas sama dengan sembilan belas.";
const SUARA_J5 = "Jadi jumlah donat Kira dan Malosi adalah sembilan belas buah.";

export const ADEGAN_DONAT_JUMLAH: AdeganStory = {
  id: "donat-jumlah",
  judul: "Kesimpulan dan jumlah donat",
  sumber: "Materi: kesimpulan dan jumlah",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, judul("Langkah 4: kesimpulan")),
      tambah(idx(SUARA_J1, "Kesimpulan", 2), ...kartu("ks", 20, 44, 260, 36, W.hijauMuda, ["Jadi, donat Malosi ada 7 buah."], 11)),
      tambah(idx(SUARA_J1, "tujuh"), emo("ok", 150, 132, "✅", 40)),
    ),
    k(
      SUARA_J2,
      hapus(0, "ks-k", "ks-t0", "ok"),
      tambah(idx(SUARA_J2, "Kira"), namaG("a", 24, 84, "Kira"), ...bendaDi("a", EMO.donat, ptsKiraJumlah, 17), jumlahG("a", 96, 86, "12")),
      tambah(idx(SUARA_J2, "Malosi"), namaG("b", 190, 84, "Malosi"), ...bendaDi("b", EMO.donat, ptsMalosiJumlah, 17), jumlahG("b", 258, 82, "7")),
    ),
    k(SUARA_J3, ...hitungAksi(SUARA_J3, "eb", pusatBenda(ptsMalosiJumlah), { dari: 13, setelah: "maju" })),
    k(SUARA_J4, tambah(idx(SUARA_J4, "Tujuh"), ex("7 + 12 = 19", "ex", 150, 52))),
    k(SUARA_J5, hapus(0, "ex"), tambah(idx(SUARA_J5, "jumlah"), ...kartu("kj", 30, 28, 240, 36, W.krem, ["Jadi, jumlah donat 19 buah."], 11))),
  ],
};

/* ------------------------------ 3. Dapat lagi: tambah ------------------------------ */
export const G_TAMBAH: GeoG = { x0: 18, y: 176, dx: 26, dari: 6, sampai: 16 };
const ptsApelA = titikBaris(8, 26, 62, 26);
const ptsApelB = titikBaris(6, 26, 90, 26);
const SUARA_T1 = "Sekarang kita pakai kata kunci lain. Upe punya delapan apel. Upe dapat enam apel lagi.";
const SUARA_T2 = "Dapat lagi artinya ada yang bertambah. Jadi kita pilih tambah.";
const SUARA_T3 = "Di jalur bilangan, kita loncat maju dari delapan: satu, dua, tiga, empat, lima, enam.";
const SUARA_T4 = "Delapan ditambah enam sama dengan empat belas. Apel Upe sekarang ada empat belas.";

export const ADEGAN_TAMBAH_APEL: AdeganStory = {
  id: "tambah-apel",
  judul: "Dapat lagi: kita tambah",
  sumber: "Materi: kata kunci dapat lagi",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Apel Upe")),
      tambah(idx(SUARA_T1, "Upe"), namaG("a", 8, 40, "Upe punya 8 apel")),
      tambah(idx(SUARA_T1, "delapan"), ...bendaDi("a", EMO.apel, ptsApelA)),
      tambah(idx(SUARA_T1, "dapat"), teks("cp", 290, 94, "dapat lagi: 6", 9.4, W.merah, { anchor: "end" })),
      tambah(idx(SUARA_T1, "enam"), ...bendaDi("b", EMO.apel, ptsApelB)),
    ),
    k(SUARA_T2, tambah(idx(SUARA_T2, "tambah"), ...kartu("tb", 90, 106, 120, 24, W.hijauMuda, ["tambah (+)"], 11))),
    k(
      SUARA_T3,
      tambah(0, ...garisBil("j", G_TAMBAH)),
      tambah(idx(SUARA_T3, "dari"), penanda("j", G_TAMBAH, 8, W.merah)),
      ...loncatAksi(SUARA_T3, "j", G_TAMBAH, 8, 1, 6, "delapan"),
    ),
    k(SUARA_T4, tambah(idx(SUARA_T4, "Delapan"), ex("8 + 6 = 14", "ex", 150, 146, 15)), tambah(idx(SUARA_T4, "empat", 1), penanda("j", G_TAMBAH, 14, W.ungu))),
  ],
};

/* ------------------------------ 4. Dimakan: kurang ------------------------------ */
export const G_KURANG: GeoG = { x0: 18, y: 176, dx: 26, dari: 6, sampai: 16 };
const ptsKueA = titikBaris(8, 26, 62, 26);
const ptsKueB = titikBaris(7, 26, 90, 26);
const SUARA_R1 = "Sekarang Wei punya lima belas kue. Wei makan tujuh kue.";
const SUARA_R2 = "Kue yang dimakan akan berkurang, jadi kita pilih kurang.";
const SUARA_R3 = "Kita loncat mundur dari lima belas: satu, dua, tiga, empat, lima, enam, tujuh.";
const SUARA_R4 = "Lima belas dikurangi tujuh sama dengan delapan. Sisa kue Wei ada delapan.";
const SUARA_R5 = "Kita periksa dengan operasi lawan. Delapan ditambah tujuh sama dengan lima belas.";
const SUARA_R6 = "Ingat, dapat lagi dan digabung artinya tambah. Dimakan, diberikan, dan hilang artinya kurang.";

export const ADEGAN_KURANG_KUE: AdeganStory = {
  id: "kurang-kue",
  judul: "Dimakan: kita kurangi",
  sumber: "Materi: kata kunci dimakan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Kue Wei")),
      tambah(idx(SUARA_R1, "Wei"), namaG("a", 8, 40, "Wei punya 15 kue")),
      tambah(idx(SUARA_R1, "lima"), ...bendaDi("a", EMO.kue, ptsKueA), ...bendaDi("b", EMO.kue, ptsKueB)),
      tambah(idx(SUARA_R1, "makan"), teks("cm", 290, 94, "dimakan: 7", 9.4, W.merah, { anchor: "end" })),
      sorotkan(idx(SUARA_R1, "tujuh"), ...ids("eb", 0, 6)),
    ),
    k(SUARA_R2, redamkan(0, ...ids("eb", 0, 6)), tambah(idx(SUARA_R2, "kurang"), ...kartu("kr", 90, 106, 120, 24, W.pink, ["kurang (−)"], 11))),
    k(
      SUARA_R3,
      tambah(0, ...garisBil("j", G_KURANG)),
      tambah(idx(SUARA_R3, "dari"), penanda("j", G_KURANG, 15, W.merah)),
      ...loncatAksi(SUARA_R3, "j", G_KURANG, 15, -1, 7, "belas"),
    ),
    k(SUARA_R4, hapus(idx(SUARA_R4, "Lima"), ...ids("eb", 0, 6), "cm"), tambah(idx(SUARA_R4, "Lima"), ex("15 − 7 = 8", "ex", 150, 146, 15)), tambah(idx(SUARA_R4, "Sisa"), penanda("j", G_KURANG, 8, W.ungu))),
    k(SUARA_R5, ubah(idx(SUARA_R5, "Delapan"), { id: "ex", isi: "8 + 7 = 15" }), tambah(idx(SUARA_R5, "lima"), emo("ok", 250, 148, "✅", 18))),
    k(
      SUARA_R6,
      bersih(0),
      tambah(0, judul("Pilih tambah atau kurang")),
      tambah(idx(SUARA_R6, "tambah"), ...kartu("t0", 14, 40, 130, 28, W.hijauMuda, ["tambah (+)"], 12), ...kartu("t1", 14, 76, 130, 24, W.putih, ["dapat lagi"], 10), ...kartu("t2", 14, 106, 130, 24, W.putih, ["digabung"], 10)),
      tambah(idx(SUARA_R6, "kurang"), ...kartu("u0", 156, 40, 130, 28, W.pink, ["kurang (−)"], 12), ...kartu("u1", 156, 76, 130, 24, W.putih, ["dimakan"], 10), ...kartu("u2", 156, 106, 130, 24, W.putih, ["diberikan"], 10), ...kartu("u3", 156, 136, 130, 24, W.putih, ["hilang"], 10)),
    ),
  ],
};
