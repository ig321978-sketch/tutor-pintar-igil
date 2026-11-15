import type { AdeganStory } from "./logika-story";
import { OWL, W, baris, benda, deret, emo, judul, kartu, kartuAngka, kotak, pasangGaris, teks, type Titik } from "./k1b6A-gambar";
import { hapus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k1b6A-bantu";
import { BARIS_ATAS, BARIS_BAWAH, nama } from "./k1b6A-materi-1";

/* ------------------------------ 8. Cerita lebihnya: mencari yang belum diketahui ------------------------------ */
const SUARA_L1 = "Kira punya lima kelereng. Halim punya dua kelereng lebihnya dari Kira. Berapa kelereng Halim?";
const SUARA_L2 = "Kita pasangkan dulu. Halim punya lima kelereng yang berpasangan dengan kelereng Kira.";
const SUARA_L3 = "Lalu tambahkan dua kelereng lebihnya. Kelereng Halim bertambah dua, jadi lebih banyak dari kelereng Kira.";
const SUARA_L4 = "Kalau diketahui lebihnya, kita menambah. Lima ditambah dua sama dengan tujuh.";
const SUARA_L5 = "Jadi kelereng Halim ada tujuh. Tujuh lebih dari lima, lebihnya dua. Cocok dengan ceritanya!";
export const PKR: Titik[] = baris(5, BARIS_ATAS);
export const PHA: Titik[] = baris(7, BARIS_BAWAH);
export const GARIS_KH = pasangGaris("lq", PKR.map((p) => p.x), BARIS_ATAS, BARIS_BAWAH, 8);

export const ADEGAN_LEBIHNYA: AdeganStory = {
  id: "cerita-lebihnya",
  judul: "Cerita lebihnya: mencari bilangan",
  sumber: "Materi: cerita lebihnya",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Cerita lebihnya")),
      tambah("Kira", nama("rn-a", BARIS_ATAS, "Kira")),
      tambah("lima", ...deret("kelereng", "kr", PKR, 8)),
      tambah("Halim", nama("rn-b", BARIS_BAWAH, "Halim")),
      tambah("Berapa", emo("tn", 150, 134, "❓", 30)),
    ),
    k(SUARA_L2, hapus(0, "tn"), tambah("Halim", ...deret("kelereng", "ha", PHA.slice(0, 5), 8)), tambah("berpasangan", ...GARIS_KH)),
    k(SUARA_L3, tambah("tambahkan", ...PHA.slice(5).flatMap((p, i) => benda("kelereng", `ha${5 + i}`, p.x, p.y, 8, 5 + i, { garis: W.emas, tebal: 3 }))), tambah("lebihnya.", teks("lm", 262, 98, "lebihnya 2", 9, W.coklat))),
    k(SUARA_L4, hapus(0, "lm"), tambah("Lima", ...kartu("pj", 70, 156, 160, 32, W.krem, ["5 + 2 = 7"], 13))),
    k(SUARA_L5, hapus(0, "pj-k", "pj-t0"), tambah("tujuh.", ...kartu("hj", 14, 158, 132, 28, W.hijauMuda, ["7 lebih dari 5"], 9.6)), tambah("Cocok", emo("ok", 230, 178, "✅", 26))),
  ],
};

/* ------------------------------ 9. Cerita kurangnya ------------------------------ */
const SUARA_N1 = "Wei punya sebelas balon. Upe punya tiga balon kurangnya dari Wei. Berapa balon Upe?";
const SUARA_N2 = "Kita siapkan tempat di bawah, sebanyak balon Wei. Lalu kita lihat tempat yang kosong.";
const SUARA_N3 = "Upe kurang tiga balon dari Wei. Jadi tiga tempat terakhir dibiarkan kosong.";
const SUARA_N4 = "Kalau diketahui kurangnya, kita mengurangi. Sebelas dikurangi tiga sama dengan delapan.";
const SUARA_N5 = "Jadi balon Upe ada delapan. Delapan kurang dari sebelas, kurangnya tiga. Cocok dengan ceritanya!";
const WEI_Y = 70;
const UPE_Y = 130;
const WX = (i: number): number => 30 + i * 24;
export const PWEI: Titik[] = Array.from({ length: 11 }, (_, i) => ({ x: WX(i), y: WEI_Y }));
export const PUPE: Titik[] = Array.from({ length: 11 }, (_, i) => ({ x: WX(i), y: UPE_Y - 2 }));
const SLOT = Array.from({ length: 11 }, (_, i) => `sl${i}`);

export const ADEGAN_KURANGNYA: AdeganStory = {
  id: "cerita-kurangnya",
  judul: "Cerita kurangnya: mencari bilangan",
  sumber: "Materi: cerita kurangnya",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Cerita kurangnya")),
      tambah("Wei", teks("nw", 4, 44, "Wei: 11", 8.6, W.biru, { anchor: "start" })),
      tambah("sebelas", ...deret("balon", "wb", PWEI, 8)),
      tambah("Upe", teks("nu", 4, 104, "Upe", 8.6, W.biru, { anchor: "start" })),
      tambah("Berapa", emo("tn", 150, 138, "❓", 30)),
    ),
    k(SUARA_N2, hapus(0, "tn"), tambah("tempat", ...SLOT.map((id, i) => kotak(id, WX(i) - 10, UPE_Y - 14, 20, 28, W.putih, W.biru, { rx: 3, tebal: 1.2, putus: true })))),
    k(SUARA_N3, ubah("tiga", ...[8, 9, 10].map((i) => ({ id: `sl${i}`, warna: W.merahMuda, garis: W.merah }))), tambah("kosong.", teks("kk", 200, 104, "kurangnya: 3", 9, W.merah))),
    k(SUARA_N4, tambah("Sebelas", ...kartu("pk", 70, 158, 160, 30, W.krem, ["11 - 3 = 8"], 13))),
    k(SUARA_N5, tambah("Upe", ...deret("balon", "up", PUPE.slice(0, 8), 8)), tambah("Cocok", emo("ok", 262, 178, "✅", 22))),
  ],
};

/* ------------------------------ 10. Detektif bilangan ------------------------------ */
const SUARA_T1 = "Sekarang Igil menjadi detektif bilangan. Igil mencari kalimat yang benar. Ayo bantu Igil.";
const SUARA_T2 = "Petunjuk pertama. Ada dua kartu bilangan, sembilan dan enam. Mana yang lebih besar?";
const SUARA_T3 = "Sembilan lebih besar. Jadi sembilan lebih dari enam, dan enam kurang dari sembilan.";
const SUARA_T4 = "Petunjuk kedua. Mari cari selisihnya. Sembilan dikurangi enam sama dengan tiga.";
const SUARA_T5 = "Kasus selesai. Selisih sembilan dan enam adalah tiga. Terima kasih, detektif!";

export const ADEGAN_DETEKTIF: AdeganStory = {
  id: "detektif",
  judul: "Igil si detektif bilangan",
  sumber: "Materi: detektif bilangan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_T1, tambah(0, judul("Detektif bilangan"), emo("ow", 110, 100, OWL, 48), emo("lup", 190, 100, "\u{1F50D}", 44))),
    k(SUARA_T2, tambah("Petunjuk", ...kartuAngka("ta", 50, 130, "9", W.pink, 70, 56, 32)), tambah("enam,", ...kartuAngka("tb", 180, 130, "6", W.langit, 70, 56, 32))),
    k(SUARA_T3, sorotkan("Sembilan", "ta-k"), tambah("lebih@2", ...kartu("td", 14, 52, 132, 28, W.hijauMuda, ["9 lebih dari 6"], 9.6)), tambah("kurang", ...kartu("te", 154, 52, 132, 28, W.merahMuda, ["6 kurang dari 9"], 9.6))),
    k(SUARA_T4, redamkan(0, "ta-k"), tambah("Sembilan", ...kartu("tf", 70, 92, 160, 30, W.emas, ["9 - 6 = 3"], 13))),
    k(SUARA_T5, tambah("Kasus", emo("ok", 150, 196, "✅", 22)), ubah("Selisih", { id: "tf-t0", warna: W.hijau })),
  ],
};

/* ------------------------------ 10b. Pilih kalimat yang benar ------------------------------ */
const SUARA_V1 = "Sekarang kita latihan menyusun kalimat. Malosi punya delapan kelereng. Upe punya lima kelereng.";
const SUARA_V2 = "Pilih kata yang tepat untuk membandingkan keduanya. Apakah kata lebih dari, atau kata kurang dari? Pikirkan dulu.";
const SUARA_V3 = "Delapan lebih besar dari lima, jadi kita pilih kata lebih dari. Delapan lebih dari lima.";
const SUARA_V4 = "Kalimat yang lain. Lima kurang dari delapan. Untuk mencari selisihnya, delapan dikurangi lima sama dengan tiga.";
const SUARA_V5 = "Hebat! Kamu sudah pandai membuat kalimat perbandingan. Lebihnya dan kurangnya sama besar, yaitu tiga.";

export const ADEGAN_KALIMAT: AdeganStory = {
  id: "kalimat-benar",
  judul: "Memilih kalimat yang benar",
  sumber: "Materi: kalimat perbandingan",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_V1,
      tambah(0, judul("Menyusun kalimat")),
      tambah("Malosi", ...kartuAngka("va", 50, 40, "8", W.pink, 70, 56, 32), teks("vl", 85, 114, "Malosi", 9, W.biru)),
      tambah("Upe", ...kartuAngka("vb", 180, 40, "5", W.langit, 70, 56, 32), teks("vm", 215, 114, "Upe", 9, W.biru)),
    ),
    k(SUARA_V2, tambah("Pilih", ...kartu("vw", 14, 128, 132, 30, W.hijauMuda, ["lebih dari"], 11)), tambah("kurang", ...kartu("vx", 154, 128, 132, 30, W.merahMuda, ["kurang dari"], 11))),
    k(SUARA_V3, sorotkan("lebih@2", "vw-k"), tambah("Delapan@2", ...kartu("vy", 14, 168, 132, 26, W.emas, ["8 lebih dari 5"], 9.6))),
    k(
      SUARA_V4,
      hapus(0, "vw-k", "vw-t0", "vx-k", "vx-t0"),
      tambah(idx(SUARA_V4, "Lima"), ...kartu("vz", 154, 168, 132, 26, W.krem, ["5 kurang dari 8"], 9.6)),
      tambah("delapan@2", ...kartu("vs", 80, 128, 140, 30, W.langit, ["8 - 5 = 3"], 13)),
    ),
    k(SUARA_V5, hapus(0, "vs-k", "vs-t0"), tambah("Hebat!", emo("ok", 150, 150, "✅", 26)), tambah("Lebihnya", ...kartu("vt", 14, 128, 92, 26, W.hijauMuda, ["lebihnya: 3"], 9)), tambah("kurangnya@1", ...kartu("vu", 194, 128, 92, 26, W.merahMuda, ["kurangnya: 3"], 9))),
  ],
};
