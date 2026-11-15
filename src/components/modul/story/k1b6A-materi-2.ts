import type { AdeganStory } from "./logika-story";
import { OWL, W, baris, batang, deret, emo, garis, garisBilangan, judul, kartu, kartuAngka, kotak, lompat, pasangGaris, teks, xBil, type Titik } from "./k1b6A-gambar";
import { hapus, k, redamkan, sorotkan, tambah, ubah } from "./k1b6A-bantu";
import { BARIS_ATAS, BARIS_BAWAH, nama } from "./k1b6A-materi-1";

/* ------------------------------ 4. Bunga dan kupu-kupu ------------------------------ */
const SUARA_B1 = "Di taman ada lima bunga yang sedang mekar. Ada juga tujuh kupu-kupu yang terbang di atas bunga.";
const SUARA_B2 = "Kita pasangkan bunga dengan kupu-kupu, satu per satu. Setiap bunga mendapat satu kupu-kupu.";
const SUARA_B3 = "Ada dua kupu-kupu yang tidak punya pasangan. Jadi kupu-kupu lebih banyak dari bunga.";
const SUARA_B4 = "Berapa lebihnya kupu-kupu dari bunga? Lebihnya dua. Tujuh lebih dari lima, lebihnya dua.";
const SUARA_B5 = "Kita bisa mencarinya dengan mengurangi. Tujuh dikurangi lima sama dengan dua.";
const SUARA_B6 = "Banyak kupu-kupu dua lebihnya dari banyak bunga. Banyak bunga dua kurangnya dari kupu-kupu. Beda keduanya adalah dua.";
export const PBG: Titik[] = baris(5, BARIS_ATAS);
export const PKP: Titik[] = baris(7, BARIS_BAWAH);
export const GARIS_BG = pasangGaris("pq", PBG.map((p) => p.x), BARIS_ATAS, BARIS_BAWAH, 8);

export const ADEGAN_BUNGA: AdeganStory = {
  id: "bunga-kupu",
  judul: "Bunga dan kupu-kupu",
  sumber: "Materi: bunga dan kupu-kupu",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Bunga dan kupu-kupu")),
      tambah("lima", nama("rn-a", BARIS_ATAS, "bunga"), ...deret("bunga", "bg", PBG, 9)),
      tambah("tujuh", nama("rn-b", BARIS_BAWAH, "kupu"), ...deret("kupu", "kp", PKP, 9)),
    ),
    k(SUARA_B2, tambah("Setiap", ...GARIS_BG)),
    k(SUARA_B3, sorotkan("tidak", "kp5", "kp6"), tambah("Jadi", teks("tj", 262, 98, "sisa 2", 9.2, W.merah))),
    k(SUARA_B4, hapus(0, "tj"), tambah("Lebihnya", ...kartu("lb", 14, 158, 132, 28, W.hijauMuda, ["7 lebih dari 5"], 9.6)), tambah("dua.", ...kartu("lj", 154, 158, 132, 28, W.emas, ["lebihnya: 2"], 9.6))),
    k(SUARA_B5, hapus(0, "lb-k", "lb-t0", "lj-k", "lj-t0"), tambah("Tujuh", ...kartu("ps", 70, 156, 160, 32, W.krem, ["7 - 5 = 2"], 13))),
    k(
      SUARA_B6,
      hapus(0, "ps-k", "ps-t0"),
      redamkan(0, "kp5", "kp6"),
      tambah("kupu-kupu", ...kartu("q1", 6, 158, 92, 28, W.hijauMuda, ["lebihnya: 2"], 9)),
      tambah("kurangnya", ...kartu("q2", 104, 158, 92, 28, W.merahMuda, ["kurangnya: 2"], 9)),
      tambah("Beda", ...kartu("q3", 202, 158, 92, 28, W.emas, ["beda: 2"], 9)),
    ),
  ],
};

/* ------------------------------ 5. Beda atau selisih ------------------------------ */
const SUARA_S1 = "Selain lebihnya dan kurangnya, ada dua kata lagi. Kata beda dan kata selisih. Artinya sama, yaitu seberapa jauh dua bilangan berbeda.";
const SUARA_S2 = "Banyak donat Halim ada tujuh. Banyak donat Kira ada enam. Dua bilangan itu tidak sama.";
const SUARA_S3 = "Beda banyak donat Halim dan Kira adalah satu. Selisihnya juga satu.";
const SUARA_S4 = "Bagaimana mencari selisih? Kurangkan bilangan yang besar dengan bilangan yang kecil.";
const SUARA_S5 = "Tujuh dikurangi enam sama dengan satu. Jadi selisih tujuh dan enam adalah satu.";
const SUARA_S6 = "Ingat, kita mengurangi dari bilangan yang lebih besar. Hasilnya selalu selisih kedua bilangan itu.";

export const ADEGAN_SELISIH: AdeganStory = {
  id: "beda-selisih",
  judul: "Beda atau selisih",
  sumber: "Materi: beda atau selisih",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Beda atau selisih")),
      tambah("beda", ...kartu("kb", 26, 70, 100, 44, W.langit, ["beda"], 14)),
      tambah("selisih.", ...kartu("ks", 174, 70, 100, 44, W.pink, ["selisih"], 14)),
      tambah("sama,", teks("sm", 150, 98, "=", 22, W.merah)),
    ),
    k(
      SUARA_S2,
      hapus(0, "kb-k", "kb-t0", "ks-k", "ks-t0", "sm"),
      tambah("Halim", ...kartuAngka("na", 50, 44, "7", W.pink, 70, 56, 32), teks("la", 85, 118, "donat Halim", 9, W.biru)),
      tambah("Kira", ...kartuAngka("nb", 180, 44, "6", W.langit, 70, 56, 32), teks("lc", 215, 118, "donat Kira", 9, W.biru)),
    ),
    k(SUARA_S3, tambah("Beda", ...kartu("bd", 14, 144, 132, 28, W.langit, ["beda: 1"], 11)), tambah("Selisihnya", ...kartu("sl", 154, 144, 132, 28, W.pink, ["selisih: 1"], 11))),
    k(SUARA_S4, hapus(0, "bd-k", "bd-t0", "sl-k", "sl-t0"), sorotkan("besar", "na-k"), tambah("Kurangkan", ...kartu("bk", 50, 144, 200, 30, W.krem, ["besar - kecil"], 12))),
    k(SUARA_S5, hapus(0, "bk-k", "bk-t0"), redamkan(0, "na-k"), tambah("Tujuh", ...kartu("hs", 70, 144, 160, 34, W.emas, ["7 - 6 = 1"], 15))),
    k(SUARA_S6, hapus(0, "hs-k", "hs-t0"), tambah("Ingat,", ...kartu("ig", 20, 140, 260, 28, W.hijauMuda, ["besar dikurangi kecil = selisih"], 9.6)), tambah("Hasilnya", emo("ow", 150, 184, OWL, 20))),
  ],
};

/* ------------------------------ 6. Model batang ------------------------------ */
const SUARA_M1 = "Kita juga bisa membandingkan dengan batang kotak. Batang pertama ada tujuh kotak. Batang kedua ada lima kotak.";
const SUARA_M2 = "Panjang kedua batang tidak sama. Batang pertama lebih panjang dari batang kedua.";
const SUARA_M3 = "Lihat kotak emas yang melebihi batang kedua. Ada dua kotak emas. Itulah selisihnya.";
const SUARA_M4 = "Batang kedua masih butuh dua kotak lagi supaya sama panjang. Dua kotak itulah kurangnya.";
const SUARA_M5 = "Kita bisa menuliskannya sebagai pengurangan. Tujuh dikurangi lima sama dengan dua.";
const SUARA_M6 = "Jadi pasangan, batang, dan kalimat pengurangan memberi hasil yang sama. Selisihnya dua.";
export const BX = 60;
export const BY_A = 50;
export const BY_B = 88;

export const ADEGAN_BATANG: AdeganStory = {
  id: "model-batang",
  judul: "Selisih pada model batang",
  sumber: "Materi: model batang",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Model batang")),
      tambah("pertama", nama("bl-a", BY_A + 9, "pertama"), ...batang("ba", BX, BY_A, 7, W.langit)),
      tambah("kedua", nama("bl-b", BY_B + 9, "kedua"), ...batang("bb", BX, BY_B, 5, W.pink)),
    ),
    k(SUARA_M2, tambah("tidak", garis("gp", BX + 5 * 18, BY_A - 6, 0, BY_B - BY_A + 30, W.merah, 1.4, { putus: true }))),
    k(SUARA_M3, ubah("emas", { id: "ba-c5", warna: W.emas }, { id: "ba-c6", warna: W.emas }), tambah("selisihnya.", teks("sk", 150, 146, "selisih: 2 kotak", 10, W.coklat))),
    k(
      SUARA_M4,
      tambah("masih", kotak("bx0", BX + 5 * 18, BY_B, 18, 18, W.putih, W.merah, { rx: 1, tebal: 1.3, putus: true }), kotak("bx1", BX + 6 * 18, BY_B, 18, 18, W.putih, W.merah, { rx: 1, tebal: 1.3, putus: true })),
      ubah("kurangnya.", { id: "sk", isi: "kurangnya: 2 kotak" }),
    ),
    k(SUARA_M5, hapus(0, "sk"), tambah("Tujuh", ...kartu("mp", 70, 150, 160, 32, W.krem, ["7 - 5 = 2"], 13))),
    k(SUARA_M6, tambah("Jadi", emo("ow", 262, 150, OWL, 26)), tambah("Selisihnya", emo("ok", 262, 186, "✅", 18))),
  ],
};

/* ------------------------------ 7. Selisih di garis bilangan ------------------------------ */
const SUARA_G1 = "Garis bilangan juga bisa menunjukkan selisih. Wei punya tujuh boneka. Kira punya sembilan boneka.";
const SUARA_G2 = "Mulai dari tujuh. Lalu kita melompat ke kanan, satu langkah demi satu langkah, sampai bertemu sembilan.";
const SUARA_G3 = "Satu langkah ke delapan. Satu langkah lagi ke sembilan. Jadi ada dua langkah.";
const SUARA_G4 = "Dari tujuh ke sembilan, kita melompat dua langkah ke kanan. Jadi selisih boneka Wei dan Kira adalah dua.";
const SUARA_G5 = "Kita bisa menuliskannya sebagai pengurangan. Sembilan dikurangi tujuh sama dengan dua.";
const SUARA_G6 = "Sekarang Upe dan Malosi. Upe punya empat kelereng, Malosi punya delapan. Dari empat ke delapan ada empat langkah, jadi selisihnya empat.";
const GY = 120;

export const ADEGAN_GARIS: AdeganStory = {
  id: "garis-bilangan",
  judul: "Selisih di garis bilangan",
  sumber: "Materi: selisih di garis bilangan",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Garis bilangan")),
      tambah("garis", ...garisBilangan(GY)),
      tambah("Wei", teks("lw", xBil(7), 84, "Wei", 9.6, W.ungu)),
      sorotkan("tujuh", "gb-n7"),
      tambah("Kira", teks("lk", xBil(9), 84, "Kira", 9.6, W.ungu)),
      sorotkan("sembilan", "gb-n9"),
    ),
    k(SUARA_G2, tambah("Mulai", teks("mm", xBil(7), 164, "mulai", 9, W.hijau))),
    k(SUARA_G3, tambah("delapan.", lompat("l8", 7, 8, GY)), tambah("sembilan.", lompat("l9", 8, 9, GY)), tambah("dua", teks("lg", 116, 58, "2 langkah", 10, W.hijau))),
    k(SUARA_G4, hapus(0, "mm"), tambah("selisih", ...kartu("sd", 190, 30, 100, 26, W.emas, ["selisih: 2"], 10))),
    k(SUARA_G5, tambah("Sembilan", ...kartu("pg", 70, 158, 160, 30, W.krem, ["9 - 7 = 2"], 13))),
    k(
      SUARA_G6,
      hapus(0, "l8", "l9", "lg", "lw", "lk", "sd-k", "sd-t0", "pg-k", "pg-t0"),
      redamkan(0, "gb-n7", "gb-n9"),
      tambah(6, teks("lu", xBil(4), 84, "Upe", 9.6, W.ungu)),
      sorotkan(6, "gb-n4"),
      tambah(10, teks("lm", xBil(8), 84, "Malosi", 9.6, W.ungu)),
      sorotkan(10, "gb-n8"),
      tambah(13, lompat("m5", 4, 5, GY)),
      tambah(14, lompat("m6", 5, 6, GY)),
      tambah(15, lompat("m7", 6, 7, GY)),
      tambah(16, lompat("m8", 7, 8, GY)),
      tambah(20, ...kartu("se", 190, 30, 100, 26, W.emas, ["selisih: 4"], 10)),
    ),
  ],
};

