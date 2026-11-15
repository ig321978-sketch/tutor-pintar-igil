import type { AdeganStory, Obj } from "./logika-story";
import { W, barisTabel, baris, batang, emo, kartu, labelSisi, panah, segiBeraturan, tanda, tandaSisi, teks } from "./k5b4d-gambar";
import { bersih, hapus, k, tambah } from "./k5b4d-bantu";

const jud = (isi: string, y = 20, u = 12): Obj => teks("jud", 150, y, isi, u, W.ungu);

/** Baris tabel banyak sisi dan keliling pada x = 14, lebar kolom 70 dan 70, tinggi 24. */
const barisSisi = (id: string, y: number, n: string, kel: string, warna: string = W.krem): Obj[] => barisTabel(id, 14, y, [70, 70], [n, kel], warna, 9.4, 24);

/* ------------------------------ LB3. Table Pattern: konsep ------------------------------ */
export const ADEGAN_LUAR_TABEL: AdeganStory = {
  id: "luar4d-tabel",
  judul: "Table Pattern: pola tabel banyak sisi dan keliling",
  sumber: "Metode luar: Table Pattern",
  latar: "#ECFDF5",
  ketukan: [
    k(
      "Table Pattern menyusun tabel banyak sisi dan keliling untuk panjang sisi yang tetap, lalu mencari polanya. Mirip tabel rangkuman tadi, tetapi sisinya tiga sentimeter.",
      tambah(0, jud("Table Pattern", 22)),
      tambah("tabel", barisTabel("th", 14, 34, [70, 70], ["Banyak sisi", "Keliling (cm)"], W.biru, 8, 22, W.putih)),
      tambah("tetap,", kartu("tn", 166, 44, 120, 56, W.krem, ["panjang sisi", "tetap 3 cm"], 9.6)),
      tambah("pola", teks("tp", 226, 130, "cari polanya", 10, W.ungu)),
    ),
    k(
      "Isi tabelnya: empat sisi kelilingnya dua belas, lima sisi lima belas, enam sisi delapan belas, dan delapan sisi dua puluh empat.",
      tambah("empat", barisSisi("t1", 56, "4", "12")),
      tambah("lima", barisSisi("t2", 80, "5", "15", W.putih)),
      tambah("enam", barisSisi("t3", 104, "6", "18")),
      tambah("delapan@2", barisSisi("t4", 128, "8", "24", W.putih)),
    ),
    k(
      "Lihat pola kolom keliling: dari empat ke lima sisi naik tiga, dari lima ke enam naik tiga. Dari enam ke delapan ada dua sisi lagi, jadi naik enam.",
      hapus(0, "tn-k", "tn-t0", "tn-t1", "tp"),
      tambah("tiga,", teks("d1", 226, 74, "15 - 12 = 3", 10.4, W.merah)),
      tambah("tiga@2", teks("d2", 226, 98, "18 - 15 = 3", 10.4, W.merah)),
      tambah("enam@3", teks("d3", 226, 122, "24 - 18 = 6", 10.4, W.merah)),
    ),
    k(
      "Naiknya selalu sama dengan panjang sisi dikali tambahan banyak sisi. Tambah satu sisi naik tiga, tambah dua sisi naik enam. Itu sebabnya rumusnya n kali sisi.",
      bersih(0),
      tambah(0, jud("Mengapa polanya begitu", 22)),
      tambah("Tambah", kartu("w1", 20, 44, 260, 40, W.krem, ["tambah 1 sisi: keliling naik 3"], 9.6)),
      tambah("dua", kartu("w2", 20, 94, 260, 40, W.muda, ["tambah 2 sisi: keliling naik 6"], 9.6)),
      tambah("rumusnya", kartu("w3", 60, 144, 180, 40, W.hijauMuda, ["keliling = n x sisi"], 11)),
    ),
  ],
};

/* ------------------------------ LB3t. Table Pattern: penerapan ------------------------------ */
export const ADEGAN_LUAR_TABEL_TERAPAN: AdeganStory = {
  id: "luar4d-tabel-terapan",
  judul: "Table Pattern: meramal segi tujuh dan segi sepuluh",
  sumber: "Metode luar: Table Pattern, contoh",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Prediksi segi tujuh beraturan bersisi tiga sentimeter. Dari segi enam yang kelilingnya delapan belas, tambah satu sisi, jadi delapan belas ditambah tiga sama dengan dua puluh satu.",
      tambah(0, jud("Meramal segi tujuh", 22)),
      tambah("segi", ...barisSisi("t3", 60, "6", "18")),
      tambah("tambah", ...barisSisi("t5", 90, "7", "?", W.hijauMuda)),
      tambah("jadi", teks("p1", 226, 80, "18 + 3 = 21", 12, W.merah)),
    ),
    k(
      "Periksa dengan rumus: tujuh kali tiga sama dengan dua puluh satu. Prediksi dari tabel dan hasil rumus sama, jadi polanya benar.",
      bersih(0),
      tambah(0, jud("Periksa dengan rumus", 22)),
      tambah(0, ...barisSisi("t3", 60, "6", "18"), ...barisSisi("t5", 90, "7", "21", W.hijauMuda)),
      tambah("Periksa", teks("p2", 226, 104, "7 x 3 = 21", 12, W.merah)),
      tambah("sama,", tanda("p3", 270, 104, true, 16)),
    ),
    k(
      "Segi sepuluh: dari segi delapan yang kelilingnya dua puluh empat, tambah dua sisi, jadi dua puluh empat ditambah enam sama dengan tiga puluh. Periksa: sepuluh kali tiga sama dengan tiga puluh.",
      bersih(0),
      tambah(0, jud("Meramal segi sepuluh", 22)),
      tambah(0, ...barisSisi("t4", 60, "8", "24"), ...barisSisi("t6", 90, "10", "30", W.hijauMuda)),
      tambah("jadi", teks("p4", 226, 80, "24 + 6 = 30", 12, W.merah)),
      tambah("Periksa:", teks("p5", 226, 108, "10 x 3 = 30", 12, W.hijau), tanda("p6", 272, 108, true, 16)),
    ),
    k(
      "Diagram batang untuk empat, lima, enam, delapan, dan sepuluh sisi: kelilingnya dua belas, lima belas, delapan belas, dua puluh empat, dan tiga puluh. Batangnya naik teratur mengikuti banyak sisi.",
      bersih(0),
      tambah(0, jud("Keliling, sisi 3 cm", 20)),
      tambah("empat,", batang("g4", 18, 170, 36, 40, W.krem, "12"), teks("g4t", 36, 184, "4 sisi", 7.6)),
      tambah("lima,", batang("g5", 72, 170, 36, 50, W.muda, "15"), teks("g5t", 90, 184, "5 sisi", 7.6)),
      tambah("enam,", batang("g6", 126, 170, 36, 60, W.hijauMuda, "18"), teks("g6t", 144, 184, "6 sisi", 7.6)),
      tambah("delapan,", batang("g8", 180, 170, 36, 80, W.ungMuda, "24"), teks("g8t", 198, 184, "8 sisi", 7.6)),
      tambah("sepuluh", batang("g10", 234, 170, 36, 100, W.merahMuda, "30"), teks("g10t", 252, 184, "10 sisi", 7.6)),
    ),
  ],
};

/* ------------------------------ LB4. Inverse Perimeter Division: konsep ------------------------------ */
export const ADEGAN_LUAR_BALIK: AdeganStory = {
  id: "luar4d-balik",
  judul: "Inverse Perimeter Division: dari keliling ke panjang sisi",
  sumber: "Metode luar: Inverse Perimeter Division",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Inverse Perimeter Division membalik prosesnya: keliling dan banyak sisi sudah diketahui, yang dicari panjang sisi. Karena keliling sama dengan n kali s, maka s sama dengan keliling dibagi n.",
      tambah(0, jud("Inverse Perimeter Division", 22, 11)),
      tambah("Karena", kartu("b1", 40, 44, 220, 40, W.krem, ["keliling = n x s"], 12)),
      tambah("kali", panah("b2", 150, 88, 0, 18, W.ungu, 2.4)),
      tambah("maka", kartu("b3", 40, 110, 220, 40, W.hijauMuda, ["s = keliling : n"], 12)),
    ),
    k(
      "Langkahnya: pastikan bangunnya beraturan, hitung banyak sisinya, lalu bagi keliling dengan banyak sisi.",
      bersih(0),
      tambah(0, jud("Tiga langkah", 22)),
      tambah("pastikan", baris("l1", 30, 40, 240, "1. pastikan bangun beraturan", W.krem, 9.6, 28)),
      tambah("hitung", baris("l2", 30, 80, 240, "2. hitung banyak sisi n", W.muda, 9.6, 28)),
      tambah("bagi", baris("l3", 30, 120, 240, "3. bagi keliling dengan n", W.hijauMuda, 9.6, 28)),
    ),
    k(
      "Selalu lakukan cek balik: kalikan hasilnya dengan banyak sisi, dan hasilnya harus sama dengan keliling semula.",
      bersih(0),
      tambah(0, jud("Cek balik", 22)),
      tambah("kalikan", kartu("c1", 40, 50, 220, 40, W.hijauMuda, ["s x n = keliling semula"], 11)),
      tambah("harus", tanda("c2", 150, 134, true, 30)),
      tambah("semula.", teks("c3", 150, 160, "cocok berarti benar", 10, W.hijau)),
    ),
    k(
      "Metode ini berguna misalnya ketika kawat sepanjang tertentu dibentuk menjadi segi banyak beraturan, dan kita ingin tahu panjang tiap sisinya.",
      bersih(0),
      tambah(0, jud("Dari kawat ke segi banyak", 22)),
      tambah("kawat", emo("k1", 52, 100, "🧵", 36), teks("k1t", 52, 126, "kawat", 8.6)),
      tambah("dibentuk", panah("k2", 84, 98, 40, 0, W.ungu, 2.4)),
      tambah("segi", segiBeraturan("k3", 190, 100, 6, 36, W.muda), ...labelSisi("kl", 190, 100, 6, 36, "?", 10, 9, W.merah)),
    ),
  ],
};

/* ------------------------------ LB4t. Inverse Perimeter Division: penerapan ------------------------------ */
export const ADEGAN_LUAR_BALIK_TERAPAN: AdeganStory = {
  id: "luar4d-balik-terapan",
  judul: "Inverse Perimeter Division: segi lima, enam, dan delapan",
  sumber: "Metode luar: Inverse Perimeter, contoh",
  latar: "#EEF2FF",
  ketukan: [
    k(
      "Segi lima beraturan berkeliling lima belas sentimeter. Panjang sisinya lima belas dibagi lima sama dengan tiga sentimeter. Cek balik: lima kali tiga sama dengan lima belas.",
      tambah(0, jud("Segi lima, keliling 15 cm", 22)),
      tambah("Segi", segiBeraturan("pk", 80, 116, 5, 44), tandaSisi("tt", 80, 116, 5, 44)),
      tambah("dibagi", teks("h1", 220, 90, "15 : 5 = 3", 13, W.merah), teks("h2", 220, 110, "sisi 3 cm", 9.6, W.hijau)),
      tambah("Cek", teks("h3", 220, 136, "5 x 3 = 15", 12, W.biru), tanda("h4", 270, 136, true, 14)),
    ),
    k(
      "Segi enam beraturan berkeliling delapan belas sentimeter. Panjang sisinya delapan belas dibagi enam sama dengan tiga sentimeter. Cek balik: enam kali tiga sama dengan delapan belas.",
      bersih(0),
      tambah(0, jud("Segi enam, keliling 18 cm", 22)),
      tambah("Segi", segiBeraturan("pk", 80, 116, 6, 44, W.krem), tandaSisi("tt", 80, 116, 6, 44)),
      tambah("dibagi", teks("h1", 220, 90, "18 : 6 = 3", 13, W.merah), teks("h2", 220, 110, "sisi 3 cm", 9.6, W.hijau)),
      tambah("Cek", teks("h3", 220, 136, "6 x 3 = 18", 12, W.biru), tanda("h4", 270, 136, true, 14)),
    ),
    k(
      "Segi delapan beraturan berkeliling dua puluh empat sentimeter. Panjang sisinya dua puluh empat dibagi delapan sama dengan tiga sentimeter. Cek balik: delapan kali tiga sama dengan dua puluh empat.",
      bersih(0),
      tambah(0, jud("Segi delapan, keliling 24 cm", 22)),
      tambah("Segi", segiBeraturan("pk", 80, 116, 8, 44, W.hijauMuda), tandaSisi("tt", 80, 116, 8, 44)),
      tambah("dibagi", teks("h1", 220, 90, "24 : 8 = 3", 13, W.merah), teks("h2", 220, 110, "sisi 3 cm", 9.6, W.hijau)),
      tambah("Cek", teks("h3", 220, 136, "8 x 3 = 24", 12, W.biru), tanda("h4", 270, 136, true, 14)),
    ),
    k(
      "Ketiganya memberi sisi tiga sentimeter. Sekarang jika segi enam berkeliling tiga puluh, sisinya tiga puluh dibagi enam sama dengan lima sentimeter.",
      bersih(0),
      tambah(0, jud("Ukuran lain", 22)),
      tambah("Ketiganya", baris("z1", 30, 40, 240, "keliling 15, 18, 24: sisi 3 cm", W.krem, 9.6, 28)),
      tambah("puluh", baris("z2", 30, 84, 240, "30 : 6 = 5", W.hijauMuda, 12, 28)),
      tambah("sisinya", teks("z3", 150, 140, "cek: 6 x 5 = 30", 11, W.biru), tanda("z4", 232, 140, true, 14)),
    ),
  ],
};

/* ------------------------------ LB5. Ringkasan ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar4d-ringkas",
  judul: "Ringkasan empat metode luar keliling segi banyak",
  sumber: "Ringkasan metode luar",
  latar: "#EEF2FF",
  ketukan: [
    k(
      "Ringkasan metode luar untuk keliling segi banyak. Empat metode saling melengkapi, dan semuanya memakai segi lima, enam, dan delapan beraturan bersisi tiga sentimeter.",
      tambah(0, jud("Ringkasan empat metode", 22, 12)),
      tambah("Empat", emo("rg", 150, 100, "🧰", 44)),
      tambah("bersisi", teks("rg2", 150, 150, "sisi 3 cm", 10, W.ungu)),
    ),
    k(
      "Regular n-gon memberi rumus n kali sisi, misalnya lima kali tiga sama dengan lima belas. Irregular Side Sum menjumlahkan sisi berbeda satu per satu, misalnya tiga ditambah tiga ditambah tiga ditambah empat ditambah lima sama dengan delapan belas.",
      bersih(0),
      tambah(0, jud("Sama dan berbeda", 22, 12)),
      tambah("Regular", kartu("rk1", 15, 44, 270, 50, W.krem, ["Regular n-gon", "5 x 3 = 15"], 9.2)),
      tambah("Irregular", kartu("rk2", 15, 106, 270, 50, W.merahMuda, ["Irregular Side Sum", "3+3+3+4+5 = 18"], 9.2)),
    ),
    k(
      "Table Pattern membaca pola tabel: tiap tambah satu sisi, keliling naik tiga. Inverse Perimeter Division mencari sisi dari keliling, misalnya dua puluh empat dibagi delapan sama dengan tiga.",
      bersih(0),
      tambah(0, jud("Pola dan pembagian", 22, 12)),
      tambah("Table", kartu("rk3", 15, 44, 270, 50, W.hijauMuda, ["Table Pattern", "tambah 1 sisi: naik 3"], 9.2)),
      tambah("Inverse", kartu("rk4", 15, 106, 270, 50, W.muda, ["Inverse Perimeter Division", "24 : 8 = 3"], 9.2)),
    ),
    k(
      "Gunakan bersama: periksa dulu apakah sisinya sama, pilih rumus kali atau jumlah satu per satu, cek dengan tabel, dan cek balik dengan pembagian. Semoga membantu!",
      bersih(0),
      tambah(0, jud("Pakai bersama", 22, 12)),
      tambah("periksa", baris("pb1", 30, 38, 240, "1. periksa: sisi sama atau beda", W.putih, 9, 24)),
      tambah("pilih", baris("pb2", 30, 68, 240, "2. pilih rumus kali atau jumlah", W.putih, 9, 24)),
      tambah("cek@1", baris("pb3", 30, 98, 240, "3. cek dengan tabel", W.putih, 9, 24)),
      tambah("balik", baris("pb4", 30, 128, 240, "4. cek balik dengan pembagian", W.hijauMuda, 9, 24)),
    ),
  ],
};
