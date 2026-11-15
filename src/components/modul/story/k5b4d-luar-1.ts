import type { AdeganStory, Obj } from "./logika-story";
import { W, baris, batang, bentukBebas, emo, garis, kartu, kartuMetode, kotak, labelSisi, panah, segiBeraturan, tanda, tandaSisi, teks } from "./k5b4d-gambar";
import { bersih, k, tambah } from "./k5b4d-bantu";

const jud = (isi: string, y = 20, u = 12): Obj => teks("jud", 150, y, isi, u, W.ungu);

/** Pentagon tidak beraturan untuk metode jumlah sisi: lima titik relatif terhadap pusat. */
export const TITIK_LIMA: [number, number][] = [[-30, -34], [26, -38], [48, 6], [6, 40], [-44, 14]];
/** Segi enam tidak beraturan: empat sisi diberi label 3 dan dua sisi diberi label 5. */
export const TITIK_ENAM: [number, number][] = [[-36, -20], [-8, -34], [30, -26], [40, 10], [4, 34], [-32, 22]];

/** Titik tengah sisi bentuk bebas, digeser menuju (faktor < 1) atau menjauhi (faktor > 1) pusat. */
const tengah = (titik: [number, number][], cx: number, cy: number, faktor: number): [number, number][] =>
  titik.map(([x1, y1], i) => {
    const [x2, y2] = titik[(i + 1) % titik.length];
    return [Math.round((cx + ((x1 + x2) / 2) * faktor) * 10) / 10, Math.round((cy + ((y1 + y2) / 2) * faktor) * 10) / 10];
  });

/* ------------------------------ LB0. Empat metode luar Sub-Bab D ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar4d-pembuka",
  judul: "Empat metode luar untuk keliling segi banyak",
  sumber: "Metode luar: empat cara",
  latar: "#EEF2FF",
  ketukan: [
    k(
      "Video ini membahas metode luar untuk keliling segi banyak. Semua metode memakai segi lima, segi enam, dan segi delapan beraturan yang bersisi tiga sentimeter sebagai contoh.",
      tambah(0, jud("Keliling segi banyak: metode luar", 22, 11)),
      tambah("lima,", segiBeraturan("p5", 55, 100, 5, 30), teks("l5", 55, 148, "segi lima", 8.4)),
      tambah("enam,", segiBeraturan("p6", 150, 100, 6, 30, W.krem), teks("l6", 150, 148, "segi enam", 8.4)),
      tambah("delapan", segiBeraturan("p8", 245, 100, 8, 30, W.hijauMuda), teks("l8", 245, 148, "segi delapan", 8.4)),
      tambah("bersisi", teks("sk", 150, 180, "tiap sisi 3 cm", 10, W.merah)),
    ),
    k(
      "Ada empat metode luar. Pertama, Regular n-gon, yaitu segi n beraturan dengan rumus n kali sisi. Kedua, Irregular Side Sum, yaitu menjumlahkan sisi yang berbeda satu per satu.",
      bersih(0),
      tambah(0, jud("Empat metode luar", 20)),
      tambah("Pertama,", kartuMetode("m1", 10, 34, "#FDE68A", ["Regular", "n-gon"], "n kali sisi")),
      tambah("Kedua,", kartuMetode("m2", 156, 34, "#FBCFE8", ["Irregular", "Side Sum"], "jumlah satu-satu")),
    ),
    k(
      "Ketiga, Table Pattern, yaitu membaca pola dari tabel banyak sisi dan keliling. Keempat, Inverse Perimeter Division, yaitu mencari panjang sisi dari keliling dengan pembagian.",
      tambah("Ketiga,", kartuMetode("m3", 10, 116, "#BBF7D0", ["Table", "Pattern"], "pola tabel")),
      tambah("Keempat,", kartuMetode("m4", 156, 116, "#BFDBFE", ["Inverse Perimeter", "Division"], "cari panjang sisi")),
    ),
  ],
};

/* ------------------------------ LB1. Regular n-gon: konsep ------------------------------ */
export const ADEGAN_LUAR_NGON: AdeganStory = {
  id: "luar4d-ngon",
  judul: "Regular n-gon: segi n beraturan",
  sumber: "Metode luar: Regular n-gon",
  latar: "#FFF4DD",
  ketukan: [
    k(
      "Regular n-gon berarti segi n beraturan. Huruf n adalah banyak sisinya, dan semua sisinya sama panjang. Contohnya n sama dengan lima untuk segi lima.",
      tambah(0, jud("Regular n-gon", 22)),
      tambah("segi", segiBeraturan("pk", 80, 116, 5, 44), tandaSisi("tt", 80, 116, 5, 44)),
      tambah("banyak", teks("t1", 218, 84, "n = banyak sisi", 10, W.biru)),
      tambah("sama", teks("t2", 218, 106, "semua sisi sama", 9.6, W.merah)),
      tambah("Contohnya", teks("t3", 218, 138, "contoh: n = 5", 10, W.hijau)),
    ),
    k(
      "Misalkan panjang tiap sisi adalah s. Karena ada n sisi yang sama panjang, penjumlahan s sebanyak n kali menjadi n kali s.",
      bersih(0),
      tambah(0, jud("Dari jumlah ke perkalian", 22)),
      tambah("Misalkan", baris("a1", 30, 40, 240, "tiap sisi: panjang s", W.krem, 10, 28)),
      tambah("penjumlahan", baris("a2", 30, 76, 240, "s + s + s + ... + s  (n kali)", W.muda, 10, 28)),
      tambah("menjadi", panah("a3", 150, 108, 0, 14, W.ungu, 2.4), baris("a4", 30, 126, 240, "keliling = n x s", W.hijauMuda, 11, 28)),
    ),
    k(
      "Ini sama dengan persegi: n sama dengan empat, jadi kelilingnya empat kali s. Rumus segi n beraturan memperluas pola itu ke segi lima, segi enam, dan seterusnya.",
      bersih(0),
      tambah(0, jud("Dari persegi ke segi banyak", 20)),
      tambah("persegi:", kotak("q1", 30, 54, 50, 50, W.hijauMuda, W.biru, { rx: 1, tebal: 2.2 }), teks("q1t", 55, 124, "n = 4: 4 x s", 9, W.merah)),
      tambah("memperluas", panah("q2", 92, 80, 28, 0, W.ungu, 2.4)),
      tambah("lima,", segiBeraturan("q3", 160, 80, 5, 28, W.krem), teks("q3t", 160, 124, "n = 5: 5 x s", 9, W.merah)),
      tambah("enam,", segiBeraturan("q4", 245, 80, 6, 28, W.muda), teks("q4t", 245, 124, "n = 6: 6 x s", 9, W.merah)),
    ),
    k(
      "Langkah memakai metode ini ada tiga: hitung banyak sisi n, ukur satu sisi s, lalu kalikan n dengan s.",
      bersih(0),
      tambah(0, jud("Tiga langkah", 22)),
      tambah("hitung", baris("l1", 30, 40, 240, "1. hitung banyak sisi n", W.krem, 9.6, 28)),
      tambah("ukur", baris("l2", 30, 80, 240, "2. ukur satu sisi s", W.muda, 9.6, 28)),
      tambah("kalikan", baris("l3", 30, 120, 240, "3. kalikan n dengan s", W.hijauMuda, 9.6, 28)),
    ),
    k(
      "Syarat penting: semua sisinya harus sama panjang. Jika sisinya berbeda, rumus n kali s tidak boleh dipakai.",
      bersih(0),
      tambah(0, jud("Syarat rumus n kali s", 22)),
      tambah("Syarat", segiBeraturan("s1", 80, 100, 5, 36, W.hijauMuda), tandaSisi("s1t", 80, 100, 5, 36), tanda("s1c", 80, 156, true, 16), teks("s1x", 80, 176, "semua sisi sama", 8.6)),
      tambah("berbeda,", bentukBebas("s2", 218, 100, TITIK_LIMA.map(([x, y]) => [x * 0.8, y * 0.8] as [number, number]), W.merahMuda), tanda("s2c", 218, 156, false, 16), teks("s2x", 218, 176, "sisi berbeda", 8.6)),
    ),
  ],
};

/* ------------------------------ LB1t. Regular n-gon: penerapan ------------------------------ */
export const ADEGAN_LUAR_NGON_TERAPAN: AdeganStory = {
  id: "luar4d-ngon-terapan",
  judul: "Regular n-gon: segi lima, enam, delapan, dan sepuluh",
  sumber: "Metode luar: Regular n-gon, contoh",
  latar: "#FDF2F8",
  ketukan: [
    k(
      "Segi lima dulu: n sama dengan lima dan s sama dengan tiga sentimeter. Kelilingnya lima kali tiga sama dengan lima belas sentimeter.",
      tambah(0, jud("Segi lima: n = 5", 22)),
      tambah("Segi", segiBeraturan("pk", 80, 116, 5, 44), tandaSisi("tt", 80, 116, 5, 44), ...labelSisi("ls", 80, 116, 5, 44, "3", 12, 8.4)),
      tambah("Kelilingnya", teks("h1", 220, 96, "5 x 3 = 15", 13, W.merah), teks("h2", 220, 118, "keliling 15 cm", 9.6, W.hijau)),
    ),
    k(
      "Berikutnya segi enam: n sama dengan enam dan s sama dengan tiga sentimeter. Kelilingnya enam kali tiga sama dengan delapan belas sentimeter.",
      bersih(0),
      tambah(0, jud("Segi enam: n = 6", 22)),
      tambah("Segi", segiBeraturan("pk", 80, 116, 6, 44, W.krem), tandaSisi("tt", 80, 116, 6, 44), ...labelSisi("ls", 80, 116, 6, 44, "3", 12, 8.4)),
      tambah("Kelilingnya", teks("h1", 220, 96, "6 x 3 = 18", 13, W.merah), teks("h2", 220, 118, "keliling 18 cm", 9.6, W.hijau)),
    ),
    k(
      "Lalu segi delapan dengan s sama dengan tiga sentimeter, ukuran yang kita pilih sendiri: n sama dengan delapan, jadi kelilingnya delapan kali tiga sama dengan dua puluh empat sentimeter.",
      bersih(0),
      tambah(0, jud("Segi delapan: n = 8", 22)),
      tambah("Segi", segiBeraturan("pk", 80, 116, 8, 44, W.hijauMuda), tandaSisi("tt", 80, 116, 8, 44), ...labelSisi("ls", 80, 116, 8, 44, "3", 11, 8.4)),
      tambah("kelilingnya", teks("h1", 220, 96, "8 x 3 = 24", 13, W.merah), teks("h2", 220, 118, "keliling 24 cm", 9.6, W.hijau)),
    ),
    k(
      "Bandingkan ketiganya dalam diagram batang: lima belas, delapan belas, dan dua puluh empat sentimeter. Semakin banyak sisi yang sama panjang, semakin panjang kelilingnya.",
      bersih(0),
      tambah(0, jud("Keliling, sisi 3 cm", 20)),
      tambah("lima", batang("g5", 40, 170, 50, 63, W.krem, "15"), teks("g5t", 65, 184, "segi lima", 8.2)),
      tambah("belas@2", batang("g6", 125, 170, 50, 75, W.muda, "18"), teks("g6t", 150, 184, "segi enam", 8.2)),
      tambah("dua", batang("g8", 210, 170, 50, 100, W.hijauMuda, "24"), teks("g8t", 235, 184, "segi delapan", 8.2)),
    ),
    k(
      "Metode ini berlaku untuk n berapa pun. Misalnya n sama dengan sepuluh dengan sisi tiga sentimeter: sepuluh kali tiga sama dengan tiga puluh sentimeter.",
      bersih(0),
      tambah(0, jud("Untuk n berapa pun", 22)),
      tambah("Misalnya", segiBeraturan("pk", 80, 116, 10, 44, W.ungMuda), tandaSisi("tt", 80, 116, 10, 44)),
      tambah("sepuluh", teks("h0", 220, 84, "n = 10, s = 3", 10, W.biru), teks("h1", 220, 108, "10 x 3 = 30", 13, W.merah), teks("h2", 220, 130, "keliling 30 cm", 9.6, W.hijau)),
    ),
  ],
};

/* ------------------------------ LB2. Irregular Side Sum: konsep ------------------------------ */
export const ADEGAN_LUAR_JUMLAH: AdeganStory = {
  id: "luar4d-jumlah",
  judul: "Irregular Side Sum: sisi berbeda dijumlahkan",
  sumber: "Metode luar: Irregular Side Sum",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Irregular Side Sum dipakai ketika sisi-sisinya tidak sama panjang. Keliling tetap jumlah semua panjang sisi, dijumlahkan satu per satu.",
      tambah(0, jud("Irregular Side Sum", 22)),
      tambah("sisi-sisinya", bentukBebas("pk", 90, 116, TITIK_LIMA, W.krem)),
      tambah("tidak", teks("a", 88, 70, "a", 9, W.merah), teks("b", 138, 94, "b", 9, W.merah), teks("c", 126, 150, "c", 9, W.merah), teks("d", 68, 154, "d", 9, W.merah), teks("e", 40, 116, "e", 9, W.merah)),
      tambah("Keliling", teks("t1", 232, 100, "Keliling =", 10, W.ungu), teks("t2", 232, 120, "a+b+c+d+e", 10, W.biru)),
    ),
    k(
      "Caranya: beri tanda awal, berjalan mengelilingi bangun, dan catat tiap sisi. Berhenti ketika kembali ke tanda awal.",
      bersih(0),
      tambah(0, jud("Mengelilingi bangun", 22)),
      tambah(0, bentukBebas("pk", 90, 116, TITIK_LIMA, W.krem)),
      tambah("tanda", { id: "mulai", t: "bulat", x: 60, y: 82, r: 5, warna: W.merah, garis: W.biru, tebal: 1.5 }, teks("mt", 60, 66, "mulai", 8.6, W.merah)),
      tambah("berjalan", garis("e1", 60, 82, 56, -4, W.hijau, 3), garis("e2", 116, 78, 22, 44, W.hijau, 3), garis("e3", 138, 122, -42, 34, W.hijau, 3), garis("e4", 96, 156, -50, -26, W.hijau, 3), garis("e5", 46, 130, 14, -48, W.hijau, 3)),
      tambah("kembali", teks("mt2", 232, 116, "kembali ke awal", 9.6, W.ungu)),
    ),
    k(
      "Supaya tidak ada sisi yang terlewat atau terhitung dua kali, beri nomor satu sampai lima pada sisi-sisinya.",
      bersih(0),
      tambah(0, jud("Beri nomor tiap sisi", 22)),
      tambah(0, bentukBebas("pk", 90, 116, TITIK_LIMA, W.krem)),
      tambah("terlewat", ...tengah(TITIK_LIMA, 90, 116, 0.62).map(([x, y], i) => teks(`nm${i}`, x, y + 3, `${i + 1}`, 10, W.merah))),
      tambah("dua", teks("nt", 232, 100, "tiap sisi", 9.6, W.biru), teks("nt2", 232, 116, "dihitung sekali", 9.6, W.biru)),
    ),
    k(
      "Sisi yang sama panjang boleh dikelompokkan. Misalnya tiga sisi tiga sentimeter menjadi tiga kali tiga sama dengan sembilan. Itu jembatan ke rumus kali, tetapi hanya untuk kelompok yang sama.",
      bersih(0),
      tambah(0, jud("Kelompokkan sisi yang sama", 20)),
      tambah("tiga", baris("kg1", 30, 44, 240, "3 + 3 + 3 = 9", W.krem, 11, 28)),
      tambah("kali", panah("kg2", 150, 76, 0, 14, W.ungu, 2.4)),
      tambah("sama@2", baris("kg3", 30, 94, 240, "3 x 3 = 9", W.hijauMuda, 11, 28)),
      tambah("hanya", teks("kg4", 150, 150, "hanya untuk sisi yang sama", 9.6, W.merah)),
    ),
  ],
};

/* ------------------------------ LB2t. Irregular Side Sum: penerapan ------------------------------ */
export const ADEGAN_LUAR_JUMLAH_TERAPAN: AdeganStory = {
  id: "luar4d-jumlah-terapan",
  judul: "Irregular Side Sum: dua bangun bersisi berbeda",
  sumber: "Metode luar: Irregular Side Sum, contoh",
  latar: "#FEF3C7",
  ketukan: [
    k(
      "Segi lima dengan sisi tiga, tiga, tiga, empat, dan lima sentimeter. Ini ukuran kita sendiri, bukan ukuran tetap.",
      tambah(0, jud("Segi lima sisi berbeda", 22)),
      tambah("Segi", bentukBebas("pk", 90, 116, TITIK_LIMA, W.krem)),
      tambah("tiga,", ...tengah(TITIK_LIMA, 90, 116, 1.28).map(([x, y], i) => teks(`ls${i}`, x, y + 3, ["3", "3", "3", "4", "5"][i], 10, W.merah))),
      tambah("sendiri,", teks("bt", 232, 110, "ukuran kita", 9.4, W.ungu), teks("bt2", 232, 126, "sendiri", 9.4, W.ungu)),
    ),
    k(
      "Jumlahkan berurutan: tiga ditambah tiga sama dengan enam, enam ditambah tiga sama dengan sembilan, sembilan ditambah empat sama dengan tiga belas, lalu tiga belas ditambah lima sama dengan delapan belas.",
      bersih(0),
      tambah(0, jud("Jumlahkan berurutan", 22)),
      tambah("tiga", teks("j1", 150, 52, "3 + 3 = 6", 12, W.biru)),
      tambah("enam", teks("j2", 150, 80, "6 + 3 = 9", 12, W.biru)),
      tambah("sembilan", teks("j3", 150, 108, "9 + 4 = 13", 12, W.biru)),
      tambah("belas", teks("j4", 150, 136, "13 + 5 = 18", 12, W.hijau)),
    ),
    k(
      "Segi enam dengan empat sisi tiga sentimeter dan dua sisi lima sentimeter. Kelompokkan: empat kali tiga sama dengan dua belas, dua kali lima sama dengan sepuluh, lalu dua belas ditambah sepuluh sama dengan dua puluh dua.",
      bersih(0),
      tambah(0, jud("Segi enam, sisi 3 dan 5", 20)),
      tambah("Segi", bentukBebas("hk", 70, 108, TITIK_ENAM, W.muda)),
      tambah("Segi", ...tengah(TITIK_ENAM, 70, 108, 1.4).map(([x, y], i) => teks(`hl${i}`, x, y + 3, ["3", "3", "3", "3", "5", "5"][i], 9.4, W.merah))),
      tambah("empat@2", teks("k1", 214, 70, "4 x 3 = 12", 11, W.biru)),
      tambah("dua@3", teks("k2", 214, 96, "2 x 5 = 10", 11, W.biru)),
      tambah("belas@2", teks("k3", 214, 126, "12 + 10 = 22", 11, W.hijau)),
    ),
    k(
      "Hasilnya sama dengan menjumlahkan satu per satu: tiga ditambah tiga ditambah tiga ditambah tiga ditambah lima ditambah lima sama dengan dua puluh dua. Jadi kelilingnya dua puluh dua sentimeter.",
      bersih(0),
      tambah(0, jud("Cek satu per satu", 22)),
      tambah("satu", baris("c1", 20, 50, 260, "3+3+3+3+5+5 = 22", W.krem, 12, 30)),
      tambah("Jadi", kartu("c2", 70, 100, 160, 44, W.hijauMuda, ["keliling 22 cm"], 12)),
      tambah("kelilingnya", emo("c3", 150, 178, "✅", 22)),
    ),
  ],
};
