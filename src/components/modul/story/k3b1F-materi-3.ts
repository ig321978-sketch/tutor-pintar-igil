import type { AdeganStory } from "./logika-story";
import { OWL, W, anak, emo, judul, kartu, kelompokSemua, rumus, teks } from "./k3b1F-gambar";
import { hapus, idKartu, idx, k, tambah } from "./k3b1F-bantu";

/* ------------------------------ 9. Empat langkah mengalikan ------------------------------ */
const SUARA_L1 = "Ada empat langkah untuk menyelesaikan soal perkalian. Mari kita ingat satu per satu.";
const SUARA_L2 = "Langkah pertama, cari tahu ada berapa banyak kelompok. Hitung piring, kotak, atau vasnya.";
const SUARA_L3 = "Langkah kedua, cari tahu berapa isi tiap kelompok. Hitung benda di dalam satu kelompok saja.";
const SUARA_L4 = "Langkah ketiga, tulis perkaliannya atau jumlah berulangnya. Pilih yang paling mudah bagimu.";
const SUARA_L5 = "Langkah keempat, hitung hasilnya, lalu sebutkan jawabannya dengan satuan.";
const LANGKAH = ["1. cari banyak kelompok", "2. cari isi tiap kelompok", "3. tulis perkalian atau jumlah berulang", "4. hitung hasil dan beri satuan"];
const WARNA_L = [W.hijauMuda, W.langit, W.pink, W.krem];
const KARTU_L = (i: number) => kartu(`ln${i}`, 14, 34 + i * 40, 272, 32, WARNA_L[i], [LANGKAH[i]], 10);

export const ADEGAN_EMPAT_LANGKAH: AdeganStory = {
  id: "empat-langkah",
  judul: "Empat langkah mengalikan",
  sumber: "Materi: cara mengalikan",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_L1, tambah(0, judul("Empat langkah mengalikan")), tambah(idx(SUARA_L1, "empat"), emo("lm", 150, 110, "\u{1F9E9}", 48))),
    k(SUARA_L2, hapus(0, "lm"), tambah(idx(SUARA_L2, "pertama,"), ...KARTU_L(0))),
    k(SUARA_L3, tambah(idx(SUARA_L3, "kedua,"), ...KARTU_L(1))),
    k(SUARA_L4, tambah(idx(SUARA_L4, "ketiga,"), ...KARTU_L(2))),
    k(SUARA_L5, tambah(idx(SUARA_L5, "keempat,"), ...KARTU_L(3))),
  ],
};

/* ------------------------------ 10. Apel Halim: empat kali tujuh ------------------------------ */
const SUARA_A1 = "Halim menata apel di atas piring. Ada empat piring, dan tiap piring berisi tujuh apel.";
const SUARA_A2 = "Jumlahkan apelnya. Tujuh tambah tujuh sama dengan empat belas.";
const SUARA_A3 = "Tambah piring ketiga. Tujuh tambah tujuh tambah tujuh sama dengan dua puluh satu.";
const SUARA_A4 = "Tambah piring keempat. Tujuh tambah tujuh tambah tujuh tambah tujuh sama dengan dua puluh delapan.";
const SUARA_A5 = "Dengan perkalian, empat kali tujuh sama dengan dua puluh delapan. Jadi apel Halim ada dua puluh delapan. Perkalian membuat hitungan jadi lebih singkat.";
const PS7 = (n: number) => rumus("ps", 150, `${Array.from({ length: n }, () => "7").join(" + ")} = ${7 * n}`, 11, W.ungu);

export const ADEGAN_APEL_HALIM: AdeganStory = {
  id: "apel-halim",
  judul: "Apel Halim: empat kali tujuh",
  sumber: "Materi: empat kali tujuh",
  latar: "#FEF2F2",
  ketukan: [
    k(SUARA_A1, tambah(0, judul("Apel Halim")), tambah(idx(SUARA_A1, "Halim"), ...anak("halim", 30, 150)), tambah(idx(SUARA_A1, "empat"), ...kelompokSemua(4, 7, "apel"))),
    k(SUARA_A2, tambah(idx(SUARA_A2, "sama"), PS7(2))),
    k(SUARA_A3, tambah(idx(SUARA_A3, "sama"), PS7(3))),
    k(SUARA_A4, tambah(idx(SUARA_A4, "sama"), PS7(4))),
    k(SUARA_A5, tambah(idx(SUARA_A5, "Dengan"), rumus("eq", 178, "4 × 7 = 28")), tambah(idx(SUARA_A5, "Jadi"), emo("ok", 250, 178, "✅", 24))),
  ],
};

/* ------------------------------ 11. Soal cerita: kelereng Igil ------------------------------ */
const SUARA_S1 = "Sekarang soal cerita. Igil memasukkan empat kelereng ke setiap kotak. Ada lima kotak. Kita pakai empat langkah tadi.";
const SUARA_S2 = "Langkah pertama, banyak kelompoknya lima. Langkah kedua, isi tiap kelompoknya empat.";
const SUARA_S3 = "Langkah ketiga, tulis perkaliannya. Lima kali empat sama dengan dua puluh.";
const SUARA_S4 = "Langkah keempat, jawabannya dengan satuan. Semuanya ada dua puluh kelereng.";
const SUARA_S5 = "Jadi, Igil punya dua puluh kelereng di dalam lima kotak itu.";

export const ADEGAN_SOAL_IGIL: AdeganStory = {
  id: "soal-igil",
  judul: "Soal cerita: kelereng Igil",
  sumber: "Materi: soal cerita",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_S1, tambah(0, judul("Soal cerita")), tambah(idx(SUARA_S1, "Igil"), ...anak("igil", 30, 150)), tambah(idx(SUARA_S1, "Ada"), ...kelompokSemua(5, 4, "kelereng"))),
    k(
      SUARA_S2,
      tambah(idx(SUARA_S2, "pertama,"), ...kartu("sk", 14, 114, 136, 24, W.langit, ["banyak kelompok: 5"], 9)),
      tambah(idx(SUARA_S2, "kedua,"), ...kartu("si", 154, 114, 136, 24, W.pink, ["isi tiap kelompok: 4"], 9)),
    ),
    k(SUARA_S3, tambah(idx(SUARA_S3, "Lima"), rumus("eq", 160, "5 × 4 = 20"))),
    k(SUARA_S4, tambah(idx(SUARA_S4, "Semuanya"), teks("jw", 190, 186, "Jawab: 20 kelereng", 12, W.hijau))),
    k(SUARA_S5, hapus(0, ...idKartu("sk"), ...idKartu("si")), tambah(idx(SUARA_S5, "Jadi,"), emo("ok", 150, 126, "✅", 26))),
  ],
};

/* ------------------------------ 12. Soal cerita: bintang Malosi ------------------------------ */
const SUARA_Q1 = "Malosi menata bintang pada tiga kotak. Tiap kotak berisi enam bintang. Berapa bintang semuanya?";
const SUARA_Q2 = "Banyak kelompoknya tiga, isi tiap kelompoknya enam. Kalimat perkaliannya tiga kali enam.";
const SUARA_Q3 = "Enam tambah enam tambah enam sama dengan delapan belas. Jadi tiga kali enam sama dengan delapan belas.";
const SUARA_Q4 = "Jadi, bintang Malosi semuanya ada delapan belas. Jangan lupa menyebut satuannya, yaitu bintang.";

export const ADEGAN_SOAL_MALOSI: AdeganStory = {
  id: "soal-malosi",
  judul: "Soal cerita: bintang Malosi",
  sumber: "Materi: soal cerita",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_Q1, tambah(0, judul("Soal cerita lagi")), tambah(idx(SUARA_Q1, "Malosi"), ...anak("malosi", 30, 134)), tambah(idx(SUARA_Q1, "tiga"), ...kelompokSemua(3, 6, "bintang"))),
    k(SUARA_Q2, tambah(idx(SUARA_Q2, "perkaliannya"), rumus("eq", 120, "3 × 6"))),
    k(SUARA_Q3, tambah(idx(SUARA_Q3, "sama"), rumus("ps", 100, "6 + 6 + 6 = 18", 12, W.ungu)), tambah(idx(SUARA_Q3, "tiga"), rumus("eq", 120, "3 × 6 = 18"))),
    k(SUARA_Q4, tambah(idx(SUARA_Q4, "Jadi,"), ...kartu("jb", 70, 142, 200, 26, W.emas, ["Jawab: 18 bintang"], 11)), tambah(idx(SUARA_Q4, "semuanya"), emo("ow", 262, 100, OWL, 26))),
  ],
};
