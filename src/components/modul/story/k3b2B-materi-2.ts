import type { AdeganStory } from "./logika-story";
import { W, bagan, emo, judul, kartu, kalimat, kotak, panah, teks } from "./k3b2B-gambar";
import { idx, k, redamkan, sorotkan, tambah, ubah } from "./k3b2B-bantu";

/* ------------------------------ 4. Mencari titik-titik di tengah: tiga kurang titik-titik sama dengan satu ------------------------------ */
const BA = bagan("ba", { y: 64, atas: "3", a: "?", b: "1", fa: 2 / 3 });
const SUARA_A1 = "Mari kita cari titik-titik pada tiga kurang titik-titik sama dengan satu.";
const SUARA_A2 = "Bilangan awalnya tiga. Bagian yang tersisa adalah satu.";
const SUARA_A3 = "Bagian yang belum diketahui kita cari dengan cara mengurangkan.";
const SUARA_A4 = "Tiga dikurangi satu sama dengan dua.";
const SUARA_A5 = "Jadi titik-titik itu diisi dua. Tiga kurang dua sama dengan satu, jadi jawabannya benar.";

export const ADEGAN_TENGAH_KECIL: AdeganStory = {
  id: "tengah-kecil",
  judul: "Mencari titik-titik di tengah",
  sumber: "Materi: titik-titik di tengah",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_A1, tambah(0, judul("Titik-titik di tengah")), tambah("tiga", kalimat("ks", 50, "3 − … = 1", 20))),
    k(SUARA_A2, tambah(idx(SUARA_A2, "tiga."), ...BA.atas), tambah(idx(SUARA_A2, "satu."), ...BA.b)),
    k(SUARA_A3, tambah("belum", ...BA.a), sorotkan("mengurangkan.", "ba_A")),
    k(SUARA_A4, redamkan(0, "ba_A"), tambah(0, kalimat("hit", 164, "3 − 1 = 2", 24, W.merah)), ubah("dua.", { id: "ba_An", isi: "2", warna: W.biru })),
    k(SUARA_A5, tambah("Tiga", kalimat("per", 192, "3 − 2 = 1", 16)), tambah("benar.", emo("ok", 262, 192, "✅", 22))),
  ],
};

/* ------------------------------ 5. Mencari titik-titik di depan: titik-titik kurang enam sama dengan tiga ------------------------------ */
const BD = bagan("bd", { y: 64, atas: "?", a: "6", b: "3", fa: 2 / 3 });
const SUARA_B1 = "Sekarang kita cari titik-titik pada titik-titik kurang enam sama dengan tiga.";
const SUARA_B2 = "Bilangan awalnya belum diketahui. Dua bagiannya adalah enam dan tiga.";
const SUARA_B3 = "Bilangan awal didapat dengan menambahkan kedua bagiannya.";
const SUARA_B4 = "Tiga ditambah enam sama dengan sembilan.";
const SUARA_B5 = "Jadi titik-titik itu diisi sembilan. Sembilan kurang enam sama dengan tiga, jadi jawabannya benar.";

export const ADEGAN_DEPAN_KECIL: AdeganStory = {
  id: "depan-kecil",
  judul: "Mencari titik-titik di depan",
  sumber: "Materi: titik-titik di depan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Titik-titik di depan")), tambah("kurang", kalimat("ks", 50, "… − 6 = 3", 20))),
    k(SUARA_B2, tambah("belum", ...BD.atas), tambah("enam", ...BD.a), tambah(idx(SUARA_B2, "tiga."), ...BD.b)),
    k(SUARA_B3, sorotkan("menambahkan", "bd_T"), tambah("kedua", ...kartu("rm", 50, 134, 200, 22, W.emas, ["awal = bagian + bagian"], 10))),
    k(SUARA_B4, redamkan(0, "bd_T"), tambah(0, kalimat("hit", 180, "3 + 6 = 9", 24, W.merah)), ubah("sembilan.", { id: "bd_Tn", isi: "9", warna: W.biru })),
    k(SUARA_B5, tambah("Sembilan", kalimat("per", 198, "9 − 6 = 3", 14)), tambah("benar.", emo("ok", 262, 198, "✅", 20))),
  ],
};

/* ------------------------------ 6. Cerita ayam dijual ------------------------------ */
const SUARA_C1 = "Halim seorang peternak ayam. Ia punya delapan puluh ekor ayam potong di kandang.";
const SUARA_C2 = "Sebagian ayam itu dijual ke pasar oleh Halim.";
const SUARA_C3 = "Ayam yang tersisa di kandang ada empat puluh lima ekor.";
const SUARA_C4 = "Dapatkah kita menentukan banyak ayam yang dijual?";

export const ADEGAN_AYAM_DIJUAL: AdeganStory = {
  id: "ayam-dijual",
  judul: "Ayam yang dijual",
  sumber: "Materi: ayam yang dijual",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Ayam Halim"), emo("eh", 40, 56, "\u{1F466}", 28), teks("nh", 40, 70, "Halim", 9.6)),
      tambah("kandang.", kotak("kd", 86, 34, 108, 74, W.krem, W.coklat, { rx: 8, tebal: 2 }), emo("a1", 112, 66, "\u{1F414}", 24), emo("a2", 168, 66, "\u{1F414}", 24), emo("a3", 112, 98, "\u{1F414}", 24), emo("a4", 168, 98, "\u{1F414}", 24)),
      tambah(idx(SUARA_C1, "delapan"), teks("jm", 140, 126, "80 ekor", 14, W.merah)),
    ),
    k(SUARA_C2, tambah("dijual", panah("pj", 200, 70, 36, 0, W.biru, 2.5), teks("tj", 217, 62, "?", 18, W.merah)), tambah("pasar.", emo("ps", 262, 80, "\u{1F6D2}", 34))),
    k(SUARA_C3, tambah("tersisa", ...kartu("sr", 80, 148, 120, 28, W.hijauMuda, ["sisa: 45 ekor"], 11)), sorotkan("empat", "sr-k")),
    k(SUARA_C4, redamkan(0, "sr-k"), sorotkan("dijual?", "tj"), tambah("Dapatkah", emo("tn", 150, 198, "❓", 24))),
  ],
};
