import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, emo, garis, jambuBaris, judul, kartu, rumus, teks, xJ } from "./k2b2B-gambar";
import { bersih, hapus, ids, idx, k, redamkan, sorotkan, tambah, urutBilangan } from "./k2b2B-bantu";

/* ------------------------------ 1. Jambu Malosi dan Kira ------------------------------ */
const labelM = (): Obj => teks("lm", 192, 78, "Malosi: 12", 9, W.biru, { anchor: "start" });
const labelK = (): Obj => teks("lk", 22, 136, "Kira: 18", 9, W.biru, { anchor: "start" });
const barisM = (): Obj[] => jambuBaris("m", 0, 11, 74, W.jambuM);
const barisK = (): Obj[] => jambuBaris("k", 0, 17, 114, W.jambuK);

const SUARA_A1 = "Hari ini Malosi dan Kira memetik jambu air. Malosi mendapat dua belas jambu.";
const SUARA_A2 = "Kira juga memetik jambu air. Kira mendapat delapan belas jambu.";
const SUARA_A3 = "Jambu Kira lebih banyak. Tetapi berapa selisihnya?";
const SUARA_A4 = "Selisih adalah beda banyaknya dua baris jambu. Kita cari dengan memasangkan jambu satu-satu.";

export const ADEGAN_SELISIH: AdeganStory = {
  id: "selisih-jambu",
  judul: "Selisih jambu air Malosi dan Kira",
  sumber: "Materi: selisih dua baris jambu",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_A1, tambah(0, judul("Selisih jambu air")), tambah(idx(SUARA_A1, "mendapat"), ...barisM(), labelM())),
    k(SUARA_A2, tambah(idx(SUARA_A2, "mendapat"), ...barisK(), labelK())),
    k(SUARA_A3, sorotkan(idx(SUARA_A3, "lebih"), ...ids("jk", 0, 17)), redamkan(idx(SUARA_A3, "Tetapi"), ...ids("jk", 0, 17)), tambah(idx(SUARA_A3, "selisihnya?"), emo("q", 244, 140, "❓", 22))),
    k(SUARA_A4, tambah(idx(SUARA_A4, "Selisih"), ...kartu("ks", 40, 152, 220, 24, W.emas, ["selisih: beda banyaknya"], 10)), tambah(idx(SUARA_A4, "memasangkan"), ...kartu("kp", 40, 180, 220, 20, W.hijauMuda, ["pasangkan satu-satu"], 9.6))),
  ],
};

/* ------------------------------ 2. Memasangkan jambu satu-satu ------------------------------ */
const SUARA_B1 = "Sekarang kita pasangkan jambunya. Malosi punya dua belas, Kira punya delapan belas.";
const SUARA_B2 = "Kita pasangkan satu-satu: satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh, sebelas, dua belas.";
const SUARA_B3 = "Semua jambu Malosi sudah punya pasangan. Jambu Kira yang tersisa menyala.";
const SUARA_B4 = "Ada enam jambu yang tidak punya pasangan. Jadi selisihnya adalah enam.";
const SUARA_B5 = "Selisih dicari dengan pengurangan. Delapan belas dikurangi dua belas sama dengan enam.";
const POS_B2 = urutBilangan(SUARA_B2, 1, 12, "satu-satu:");

export const ADEGAN_PASANGKAN: AdeganStory = {
  id: "pasangkan-jambu",
  judul: "Memasangkan jambu satu-satu",
  sumber: "Materi: memasangkan untuk mencari selisih",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Pasangkan satu-satu")), tambah(idx(SUARA_B1, "Malosi"), ...barisM(), labelM()), tambah(idx(SUARA_B1, "Kira"), ...barisK(), labelK())),
    k(
      SUARA_B2,
      ...Array.from({ length: 12 }, (_, q) => tambah(POS_B2[q], garis(`ps${q}`, xJ(q), 79, 0, 30, W.biru, 1.2), teks(`jn${q}`, xJ(q), 62, String(q + 1), 7.6, W.merah))),
    ),
    k(SUARA_B3, sorotkan(idx(SUARA_B3, "Semua"), ...ids("jm", 0, 11)), redamkan(idx(SUARA_B3, "Jambu", 2), ...ids("jm", 0, 11)), sorotkan(idx(SUARA_B3, "tersisa"), ...ids("jk", 12, 17))),
    k(SUARA_B4, tambah(idx(SUARA_B4, "Jadi"), teks("sel", 192, 138, "selisih: 6", 11, W.merah, { anchor: "start" }))),
    k(SUARA_B5, tambah(idx(SUARA_B5, "Delapan"), rumus("18 − 12 = 6", 182, 18))),
  ],
};

/* ------------------------------ 3. Arti tanda kurang dan tiga cara ------------------------------ */
const SUARA_C1 = "Tadi kita menemukan delapan belas dikurangi dua belas sama dengan enam. Tanda kurang artinya mengurangi.";
const SUARA_C2 = "Bilangan yang besar dikurangi bilangan yang kecil. Hasilnya lebih kecil dari bilangan besar.";
const SUARA_C3 = "Pengurangan bisa dilakukan dengan banyak cara. Hari ini kita belajar tiga cara.";
const SUARA_C4 = "Cara pertama memakai jalur bilangan. Cara kedua memakai tabel nilai tempat. Cara ketiga memakai pasangan bilangan.";
const SUARA_C5 = "Setelah itu, kita memeriksa hasilnya dengan penjumlahan. Ayo kita mulai!";

export const ADEGAN_ARTI_KURANG: AdeganStory = {
  id: "arti-kurang",
  judul: "Tanda kurang dan tiga cara mengurangi",
  sumber: "Materi: arti pengurangan",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_C1, tambah(0, judul("Tanda kurang")), tambah(idx(SUARA_C1, "delapan"), rumus("18 − 12 = 6", 74, 26)), tambah(idx(SUARA_C1, "Tanda"), emo("tk", 150, 130, "➖", 26))),
    k(
      SUARA_C2,
      tambah(idx(SUARA_C2, "besar"), ...kartu("ab", 20, 100, 125, 26, W.langit, ["18: bilangan besar"], 9.4)),
      tambah(idx(SUARA_C2, "kecil"), ...kartu("ac", 155, 100, 125, 26, W.pink, ["12: bilangan kecil"], 9.4)),
      tambah(idx(SUARA_C2, "Hasilnya"), ...kartu("ah", 20, 134, 260, 26, W.hijauMuda, ["6: hasilnya lebih kecil"], 9.6)),
    ),
    k(SUARA_C3, bersih(0), tambah(0, judul("Banyak cara")), tambah(idx(SUARA_C3, "banyak"), ...kartu("tc", 50, 50, 200, 44, W.emas, ["3 cara mengurangi"], 14)), tambah(idx(SUARA_C3, "tiga"), emo("pk", 150, 140, "\u{1F914}", 34))),
    k(
      SUARA_C4,
      hapus(0, "pk"),
      tambah(idx(SUARA_C4, "pertama"), ...kartu("c1", 20, 106, 260, 26, W.hijauMuda, ["1. jalur bilangan"], 10.4)),
      tambah(idx(SUARA_C4, "kedua"), ...kartu("c2", 20, 138, 260, 26, W.langit, ["2. tabel nilai tempat"], 10.4)),
      tambah(idx(SUARA_C4, "ketiga"), ...kartu("c3", 20, 170, 260, 26, W.pink, ["3. pasangan bilangan"], 10.4)),
    ),
    k(SUARA_C5, tambah(idx(SUARA_C5, "memeriksa"), emo("ck", 262, 76, "✅", 24)), tambah(idx(SUARA_C5, "Ayo"), emo("ow", 38, 76, OWL, 30))),
  ],
};
