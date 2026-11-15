import type { AdeganStory } from "./logika-story";
import { W, anak, emo, idAnak, judul, kartu, kelompokSemua, idKotakKel, rumus } from "./k3b1F-gambar";
import { hapus, idKartu, idx, k, redamkan, sorotkan, tambah } from "./k3b1F-bantu";

/* ------------------------------ 2. Kue di piring Upe ------------------------------ */
const SUARA_C1 = "Hari ini Upe menyiapkan kue. Upe menata kue di atas piring, satu piring demi satu piring.";
const SUARA_C2 = "Piring pertama berisi dua kue. Piring kedua juga berisi dua kue. Piring ketiga juga berisi dua kue.";
const SUARA_C3 = "Piring keempat dan piring kelima juga berisi dua kue. Sekarang ada lima piring.";
const SUARA_C4 = "Setiap piring berisi dua kue. Semua piring punya kue yang sama banyak.";
const SUARA_C5 = "Berapa kue semuanya? Kita bisa menghitung satu per satu, tetapi ada cara yang lebih cepat. Cara itu akan kita pelajari hari ini.";
const KUE = (g: number) => kelompokSemua(5, 2, "kue", 44, g, g + 1);

export const ADEGAN_CERITA_KUE: AdeganStory = {
  id: "cerita-kue",
  judul: "Kue di piring Upe",
  sumber: "Materi: kue di piring Upe",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_C1, tambah(0, judul("Kue di piring Upe")), tambah(idx(SUARA_C1, "Upe"), ...anak("upe", 30, 134))),
    k(SUARA_C2, tambah(idx(SUARA_C2, "pertama"), ...KUE(0)), tambah(idx(SUARA_C2, "kedua"), ...KUE(1)), tambah(idx(SUARA_C2, "ketiga"), ...KUE(2))),
    k(SUARA_C3, tambah(idx(SUARA_C3, "keempat"), ...KUE(3)), tambah(idx(SUARA_C3, "kelima"), ...KUE(4))),
    k(SUARA_C4, sorotkan(idx(SUARA_C4, "Setiap"), ...idKotakKel(0, 5)), tambah(idx(SUARA_C4, "sama"), ...kartu("sb", 62, 140, 200, 26, W.emas, ["tiap piring sama banyak"], 10))),
    k(SUARA_C5, redamkan(0, ...idKotakKel(0, 5)), hapus(0, ...idKartu("sb")), tambah(idx(SUARA_C5, "semuanya?"), emo("tq", 190, 176, "❓", 26))),
  ],
};

/* ------------------------------ 3. Penjumlahan berulang ------------------------------ */
const SUARA_U1 = "Kita hitung kue di lima piring itu. Karena tiap piring sama banyak, kita bisa menjumlahkan berulang. Kita mulai dari piring yang pertama.";
const SUARA_U2 = "Piring pertama ada dua kue. Ditambah piring kedua, dua tambah dua sama dengan empat.";
const SUARA_U3 = "Tambah piring ketiga. Dua tambah dua tambah dua sama dengan enam.";
const SUARA_U4 = "Tambah piring keempat, jadi delapan. Tambah piring kelima, jadi sepuluh. Jumlahnya sepuluh kue.";
const SUARA_U5 = "Cara ini disebut penjumlahan berulang. Bilangan yang sama ditambahkan lagi dan lagi.";
const SUARA_U6 = "Penjumlahan berulang ini bisa ditulis lebih singkat. Lima kali dua sama dengan sepuluh.";
const PS = (n: number) => rumus("ps", 136, `${Array.from({ length: n }, () => "2").join(" + ")} = ${2 * n}`, 12, W.ungu);

export const ADEGAN_ULANG_KUE: AdeganStory = {
  id: "ulang-kue",
  judul: "Penjumlahan berulang",
  sumber: "Materi: penjumlahan berulang",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_U1, tambah(0, judul("Penjumlahan berulang")), tambah(idx(SUARA_U1, "lima"), ...kelompokSemua(5, 2, "kue"))),
    k(SUARA_U2, sorotkan(idx(SUARA_U2, "pertama"), "kg-b0"), sorotkan(idx(SUARA_U2, "kedua"), "kg-b1"), tambah(idx(SUARA_U2, "sama"), PS(2))),
    k(SUARA_U3, redamkan(0, "kg-b0", "kg-b1"), sorotkan(idx(SUARA_U3, "ketiga"), "kg-b2"), tambah(idx(SUARA_U3, "sama"), PS(3))),
    k(SUARA_U4, redamkan(0, "kg-b2"), sorotkan(idx(SUARA_U4, "keempat"), "kg-b3"), tambah(idx(SUARA_U4, "keempat"), PS(4)), redamkan(idx(SUARA_U4, "kelima"), "kg-b3"), sorotkan(idx(SUARA_U4, "kelima"), "kg-b4"), tambah(idx(SUARA_U4, "kelima"), PS(5))),
    k(SUARA_U5, redamkan(0, "kg-b4"), tambah(idx(SUARA_U5, "penjumlahan"), ...kartu("pb", 40, 146, 220, 26, W.emas, ["penjumlahan berulang"], 11))),
    k(SUARA_U6, tambah(idx(SUARA_U6, "Lima"), rumus("eq", 192, "5 × 2 = 10"))),
  ],
};

/* ------------------------------ 4. Bunga Kira: membaca perkalian ------------------------------ */
const SUARA_B1 = "Kira menata bunga melati di vas. Bunganya harum sekali. Ada empat vas, dan tiap vas berisi lima bunga.";
const SUARA_B2 = "Berapa bunga semuanya? Jumlahkan isi tiap vas. Lima tambah lima tambah lima tambah lima sama dengan dua puluh.";
const SUARA_B3 = "Jumlah berulang ini bisa ditulis sebagai perkalian. Empat kali lima sama dengan dua puluh. Perkalian lebih singkat daripada jumlah berulang.";
const SUARA_B4 = "Pada perkalian ini, bilangan pertama menunjukkan banyak kelompok. Bilangan kedua menunjukkan isi tiap kelompok.";
const SUARA_B5 = "Jadi empat kali lima dibaca empat kelompok, tiap kelompok lima. Jumlah semuanya dua puluh bunga.";

export const ADEGAN_BUNGA_KIRA: AdeganStory = {
  id: "bunga-kira",
  judul: "Bunga Kira: membaca perkalian",
  sumber: "Materi: membaca perkalian",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Bunga Kira")), tambah(idx(SUARA_B1, "Kira"), ...anak("kira", 30, 140)), tambah(idx(SUARA_B1, "empat"), ...kelompokSemua(4, 5, "bunga"))),
    k(SUARA_B2, tambah(idx(SUARA_B2, "sama"), rumus("ps", 126, "5 + 5 + 5 + 5 = 20", 12, W.ungu))),
    k(SUARA_B3, tambah(idx(SUARA_B3, "Empat"), rumus("eq", 152, "4 × 5 = 20"))),
    k(
      SUARA_B4,
      hapus(0, ...idAnak("kira")),
      tambah(idx(SUARA_B4, "pertama"), ...kartu("bk", 14, 164, 128, 24, W.langit, ["banyak kelompok"], 9)),
      tambah(idx(SUARA_B4, "kedua"), ...kartu("ik", 158, 164, 128, 24, W.pink, ["isi tiap kelompok"], 9)),
    ),
    k(SUARA_B5, sorotkan(idx(SUARA_B5, "empat"), ...idKotakKel(0, 4)), sorotkan(idx(SUARA_B5, "dua"), "eq")),
  ],
};
