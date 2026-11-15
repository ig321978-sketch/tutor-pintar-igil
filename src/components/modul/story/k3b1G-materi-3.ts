import type { AdeganStory } from "./logika-story";
import { W, emo, idTitikKolom, istilah, judul, kartu, namaIstilah, ringkasKb, teks, titik } from "./k3b1G-gambar";
import { hapus, idx, k, langkah, redamkan, sorotkan, tambah } from "./k3b1G-bantu";

/* ------------------------------ 8. Nama tiap bilangan ------------------------------ */
const IST = istilah(15, 3, 5);
const SUARA_N1 = "Mari kita kenali nama tiap bilangan dalam pembagian. Ini pembagian lima belas dibagi tiga sama dengan lima.";
const SUARA_N2 = "Lima belas adalah bilangan yang dibagi, yaitu seluruh benda yang akan dibagikan.";
const SUARA_N3 = "Tiga adalah pembagi, yaitu banyak bagian yang menerima benda itu.";
const SUARA_N4 = "Lima adalah hasil bagi, yaitu banyak benda yang diterima tiap bagian.";
const SUARA_N5 = "Ingat, hasil bagi dikali pembagi sama dengan bilangan yang dibagi. Lima kali tiga sama dengan lima belas.";
const SUARA_N6 = "Sekarang kita bisa menyebut tiap bilangan dengan nama yang tepat.";

export const ADEGAN_NAMA_BILANGAN: AdeganStory = {
  id: "nama-bilangan",
  judul: "Nama tiap bilangan dalam pembagian",
  sumber: "Materi: bilangan dalam pembagian",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Nama tiap bilangan")),
      tambah(idx(SUARA_N1, "lima", 1), IST[0]),
      tambah(idx(SUARA_N1, "dibagi"), IST[1]),
      tambah(idx(SUARA_N1, "tiga"), IST[2]),
      tambah(idx(SUARA_N1, "sama"), IST[3]),
      tambah(idx(SUARA_N1, "lima", 2), IST[4]),
    ),
    k(SUARA_N2, sorotkan(idx(SUARA_N2, "Lima"), "ist-a"), tambah(idx(SUARA_N2, "bilangan"), namaIstilah("a", "yang dibagi"))),
    k(SUARA_N3, redamkan(0, "ist-a"), sorotkan(idx(SUARA_N3, "Tiga"), "ist-b"), tambah(idx(SUARA_N3, "pembagi,"), namaIstilah("b", "pembagi"))),
    k(SUARA_N4, redamkan(0, "ist-b"), sorotkan(idx(SUARA_N4, "Lima"), "ist-c"), tambah(idx(SUARA_N4, "hasil"), namaIstilah("c", "hasil bagi"))),
    k(SUARA_N5, redamkan(0, "ist-c"), tambah(idx(SUARA_N5, "Lima", 1), teks("pr", 150, 138, "5 × 3 = 15", 13, W.ungu))),
    k(SUARA_N6, tambah(idx(SUARA_N6, "menyebut"), ...kartu("kn", 30, 158, 240, 30, W.emas, ["dibagi, pembagi, hasil bagi"], 11))),
  ],
};

/* ------------------------------ 9. Titik, kali, dan bagi ------------------------------ */
const SUARA_T1 = "Lima belas titik ini tersusun dalam tiga baris.";
const SUARA_T2 = "Setiap baris berisi lima titik, dan semuanya ada lima belas.";
const SUARA_T3 = "Titik itu kita bagi sama banyak ke tiga baris. Lima belas dibagi tiga sama dengan lima.";
const SUARA_T4 = "Sekarang hitung dengan kali. Lima kali tiga sama dengan lima belas.";
const SUARA_T5 = "Kalau titik itu dibagi ke lima kolom, tiap kolom berisi tiga titik. Lima belas dibagi lima sama dengan tiga.";
const SUARA_T6 = "Jadi perkalian dan pembagian selalu berkaitan erat.";

export const ADEGAN_TITIK_KALI_BAGI: AdeganStory = {
  id: "titik-kali-bagi",
  judul: "Titik, kali, dan bagi",
  sumber: "Materi: hubungan kali dan bagi",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_T1, tambah(0, judul("Titik tersusun rapi")), tambah(idx(SUARA_T1, "titik"), ...titik(3, 5)), tambah(idx(SUARA_T1, "baris."), teks("ar-b", 38, 78, "3 baris", 10, W.ungu))),
    k(SUARA_T2, tambah(idx(SUARA_T2, "lima", 1), teks("ar-k", 150, 126, "tiap baris 5", 10, W.ungu))),
    k(SUARA_T3, tambah(idx(SUARA_T3, "Lima", 1), teks("hb", 150, 150, "15 : 3 = 5", 12, W.merah))),
    k(SUARA_T4, tambah(idx(SUARA_T4, "Lima"), teks("pr", 150, 168, "5 × 3 = 15", 12, W.ungu))),
    k(SUARA_T5, sorotkan(idx(SUARA_T5, "kolom,"), ...idTitikKolom(3, 0)), tambah(idx(SUARA_T5, "Lima", 1), teks("hb2", 150, 186, "15 : 5 = 3", 12, W.merah))),
    k(SUARA_T6, redamkan(0, ...idTitikKolom(3, 0)), tambah(idx(SUARA_T6, "berkaitan"), emo("lk", 262, 168, "\u{1F517}", 24))),
  ],
};

/* ------------------------------ 10. Kali dan bagi berpasangan ------------------------------ */
const SUARA_F1 = "Tiga bilangan itu, yaitu tiga, lima, dan lima belas, saling berkaitan.";
const SUARA_F2 = "Pertama, tiga kali lima sama dengan lima belas.";
const SUARA_F3 = "Kedua, lima kali tiga sama dengan lima belas.";
const SUARA_F4 = "Ketiga, lima belas dibagi tiga sama dengan lima.";
const SUARA_F5 = "Keempat, lima belas dibagi lima sama dengan tiga.";
const SUARA_F6 = "Empat kalimat itu memakai tiga bilangan yang sama. Kali dan bagi berpasangan.";

const kalimat = (i: number, isi: string, warna: string) => kartu(`kf${i}`, 40, 66 + (i - 1) * 32, 220, 28, warna, [isi], 14);

export const ADEGAN_KALI_DAN_BAGI: AdeganStory = {
  id: "kali-dan-bagi",
  judul: "Kali dan bagi berpasangan",
  sumber: "Materi: kali dan bagi berpasangan",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, judul("Kali dan bagi berpasangan")),
      tambah(idx(SUARA_F1, "tiga", 2), teks("kfn-1", 80, 50, "3", 20, W.biru)),
      tambah(idx(SUARA_F1, "lima,"), teks("kfn-2", 150, 50, "5", 20, W.biru)),
      tambah(idx(SUARA_F1, "lima", 2), teks("kfn-3", 220, 50, "15", 20, W.biru)),
    ),
    k(SUARA_F2, tambah(idx(SUARA_F2, "tiga"), ...kalimat(1, "3 × 5 = 15", W.hijauMuda))),
    k(SUARA_F3, tambah(idx(SUARA_F3, "lima"), ...kalimat(2, "5 × 3 = 15", W.hijauMuda))),
    k(SUARA_F4, tambah(idx(SUARA_F4, "lima"), ...kalimat(3, "15 : 3 = 5", W.pink))),
    k(SUARA_F5, tambah(idx(SUARA_F5, "lima", 2), ...kalimat(4, "15 : 5 = 3", W.pink))),
    k(SUARA_F6, sorotkan(idx(SUARA_F6, "Empat"), "kf1-k", "kf2-k", "kf3-k", "kf4-k")),
  ],
};

/* ------------------------------ 11. Contoh bilangan lebih besar ------------------------------ */
const KB = { y0: 80, dy: 14 };
const SUARA_D1 = "Sekarang kita coba bilangan yang lebih besar. Berapa dua puluh delapan dibagi tujuh?";
const SUARA_D2 = "Kita kurangi tujuh berulang kali. Dua puluh delapan dikurangi tujuh sama dengan dua puluh satu.";
const SUARA_D3 = "Dua puluh satu dikurangi tujuh sama dengan empat belas. Empat belas dikurangi tujuh sama dengan tujuh.";
const SUARA_D4 = "Tujuh dikurangi tujuh sama dengan nol. Kita mengurangi tujuh sebanyak empat kali.";
const SUARA_D5 = "Jadi dua puluh delapan dibagi tujuh sama dengan empat.";
const SUARA_D6 = "Periksa dengan kali. Empat kali tujuh sama dengan dua puluh delapan.";

export const ADEGAN_CONTOH_DUA_DELAPAN: AdeganStory = {
  id: "contoh-dua-delapan",
  judul: "Contoh bilangan yang lebih besar",
  sumber: "Materi: pembagian bilangan besar",
  latar: "#ECFDF5",
  ketukan: [
    k(SUARA_D1, tambah(0, judul("Bilangan lebih besar")), tambah(idx(SUARA_D1, "Berapa"), teks("tq", 150, 54, "28 : 7 = ?", 20, W.ungu))),
    k(SUARA_D2, ...langkah(idx(SUARA_D2, "Dua", 1), 1, 28, 7, undefined, KB)),
    k(SUARA_D3, ...langkah(idx(SUARA_D3, "empat"), 2, 28, 7, undefined, KB), ...langkah(idx(SUARA_D3, "tujuh.", 3), 3, 28, 7, undefined, KB)),
    k(SUARA_D4, ...langkah(idx(SUARA_D4, "nol."), 4, 28, 7, undefined, KB), tambah(idx(SUARA_D4, "empat"), ringkasKb(7, 4, 140))),
    k(SUARA_D5, hapus(0, "tq"), tambah(0, teks("hb", 150, 160, "28 : 7 = 4", 12, W.merah))),
    k(SUARA_D6, tambah(idx(SUARA_D6, "Empat"), teks("pr", 150, 180, "4 × 7 = 28", 12, W.ungu))),
  ],
};
