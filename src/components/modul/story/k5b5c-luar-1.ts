import type { AdeganStory, Obj } from "./logika-story";
import { UJI2, UJI2_JAJAR, UJI2_SEGITIGA, UJI3, UJI3_LAYANG, UJI3_TRAP_1, W, dasarEks, deret, emo, hurufEks, idDeret, idKartu, judul, kartu, lukis, petak, potong, teks } from "./k5b5c-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah } from "./k5b5c-bantu";
import { OX, OY, S } from "./k5b5c-materi-1";
import { LETAK_UJI } from "./k5b5c-materi-3";

/** Empat nama metode luar Sub-Bab C. */
export const NAMA_METODE_C = ["Additive Decomposition", "Composite Area Strategy", "Subtractive Decomposition", "Rearrangement Invariance Check"];
const L2 = LETAK_UJI.u2;
const L3 = LETAK_UJI.u3;
const PANEL_X = 222;

/** Rumah sederhana (segitiga atap di atas persegi panjang) berukuran 6 x 2,6 satuan, titik kiri-atas badan di (ox, oy). Id `${id}-a` dan `${id}-b`. */
const rumah = (id: string, ox: number, oy: number, s: number, wa: string, wb: string): Obj[] => [
  lukis(`${id}-a`, ox, oy, s, [[0, 0], [3, -1.4], [6, 0]], wa, W.oranye),
  lukis(`${id}-b`, ox, oy, s, [[0, 0], [6, 0], [6, 2.6], [0, 2.6]], wb, W.oranye),
];

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Metode luar Subbab C: empat cara dan contoh bersama",
  sumber: "Metode luar · pembuka dan contoh bersama dari Buku Siswa hlm. 158",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Selamat datang di video metode dari luar untuk Subbab C. Ada empat metode untuk menghitung luas daerah bangun gabungan.",
      tambah(0, judul("metode luar: bangun gabungan")),
      tambah("empat", emo("ik", 150, 100, "🧩", 52)),
    ),
    k(
      "Dua metode pertama adalah Additive Decomposition dan Composite Area Strategy. Satu menjumlahkan bagian, satu lagi berupa langkah kerja yang rapi.",
      hapus(0, "ik"),
      tambah("Additive", ...kartu("m1", 14, 36, 134, 52, W.hijauMuda, ["Additive", "Decomposition", "pecah, lalu jumlahkan"], 8.4)),
      tambah("Composite", ...kartu("m2", 152, 36, 134, 52, W.langit, ["Composite", "Area Strategy", "empat langkah kerja"], 8.4)),
    ),
    k(
      "Dua metode lainnya adalah Subtractive Decomposition, atau Outer Rectangle Minus Cutout, dan Rearrangement Invariance Check, uji kekekalan luas.",
      tambah("Subtractive", ...kartu("m3", 14, 100, 134, 52, W.krem, ["Subtractive", "Decomposition", "kotak luar dikurangi"], 8.4)),
      tambah("Rearrangement", ...kartu("m4", 152, 100, 134, 52, W.pink, ["Rearrangement", "Invariance Check", "bandingkan dua cara"], 8.4)),
    ),
    k(
      "Contoh bersama kita adalah bangun ABCDE dari Eksplorasi 5.3. Menurut buku, luasnya 15 satuan luas.",
      bersih(0),
      tambah(0, judul("contoh bersama: Eksplorasi 5.3")),
      tambah("bangun", ...dasarEks("e", OX, OY, S)),
      tambah("ABCDE", ...hurufEks("h", OX, OY, S)),
      tambah("15", ...kartu("cb", 166, 56, 120, 40, W.emas, ["luas = 15", "satuan luas"], 10)),
    ),
  ],
};

/* ------------------------------ 2. Additive Decomposition: konsep ------------------------------ */
export const ADEGAN_LUAR_ADITIF: AdeganStory = {
  id: "luar-additif",
  judul: "Additive Decomposition: pecah lalu jumlahkan",
  sumber: "Metode luar · Additive Decomposition",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Metode pertama, Additive Decomposition, artinya pecah lalu jumlahkan. Bangun gabungan dibagi menjadi bagian yang rumus luasnya sudah kita kenal.",
      tambah(0, judul("Additive Decomposition", W.hijau)),
      tambah("bangun", ...rumah("rm", 24, 90, 18, W.putih, W.putih)),
      tambah("dibagi", potong("rm-g", 24, 90, 18, [0, 0], [6, 0], W.merah)),
      tambah("bagian", ...kartu("ab1", 166, 46, 120, 32, W.krem, ["bagian 1: segitiga"], 8.8)),
      tambah("rumus", ...kartu("ab2", 166, 86, 120, 32, W.langit, ["bagian 2: persegi panjang"], 8.4)),
    ),
    k(
      "Syaratnya ada dua. Bagian-bagiannya tidak boleh saling bertumpuk, dan seluruh bagian harus menutup bangun tanpa celah.",
      hapus(0, ...idKartu("ab1", 1), ...idKartu("ab2", 1)),
      sorotkan(0, "rm-a", "rm-b"),
      tambah("bertumpuk,", ...kartu("sy1", 150, 50, 136, 34, W.hijauMuda, ["tidak bertumpuk ✓"], 9.6)),
      tambah("celah.", ...kartu("sy2", 150, 94, 136, 34, W.hijauMuda, ["tanpa celah ✓"], 9.6)),
    ),
    k(
      "Luas seluruhnya adalah jumlah luas semua bagian. Kalau ada tiga bagian, ketiganya dijumlahkan.",
      redamkan(0, "rm-a", "rm-b"),
      hapus(0, ...idKartu("sy1", 1), ...idKartu("sy2", 1)),
      tambah("jumlah", ...kartu("lt", 150, 56, 136, 34, W.emas, ["L total = L1 + L2"], 9.6)),
      tambah("tiga", teks("lt3", 218, 118, "atau L1 + L2 + L3", 9, W.biru)),
    ),
    k(
      "Metode ini paling cocok untuk bangun yang mudah dipecah oleh garis lurus menjadi persegi panjang, segitiga, atau jajargenjang.",
      hapus(0, ...idKartu("lt", 1), "lt3"),
      tambah("paling", ...kartu("cc", 150, 56, 136, 50, W.hijauMuda, ["cocok untuk bangun", "yang mudah dipecah", "garis lurus"], 8.8)),
      tambah("persegi", teks("cc-e", 218, 128, "✓", 24, W.hijau)),
    ),
  ],
};

/* ------------------------------ 3. Additive Decomposition: penerapan pada soal nomor 2 ------------------------------ */
export const ADEGAN_LUAR_ADITIF_TERAPAN: AdeganStory = {
  id: "luar-additif-terapan",
  judul: "Additive Decomposition pada Uji Kompetensi nomor 2",
  sumber: "Metode luar · penerapan pada angka Buku Siswa hlm. 162",
  latar: "#ECFDF5",
  ketukan: [
    k(
      "Terapkan pada soal nomor 2. Garis mendatar sepanjang 16 memecah bangun menjadi dua bagian.",
      tambah(0, judul("terapan: soal nomor 2", W.hijau)),
      tambah("nomor", lukis("u2-b", L2.ox, L2.oy, L2.s, UJI2, W.putih, W.oranye)),
      tambah("sepanjang", potong("u2-d1", L2.ox, L2.oy, L2.s, [0, 8], [16, 8], W.merah, { z: 5 }), teks("u2-n1", 70, 74, "16 cm", 8.6, W.merah, { z: 5 })),
    ),
    k(
      "Bagian pertama jajargenjang beralas 16 dan tinggi 8. Luasnya 16 kali 8, yaitu 128.",
      tambah("jajargenjang", lukis("u2-p1", L2.ox, L2.oy, L2.s, UJI2_JAJAR, W.langit, W.oranye)),
      tambah("tinggi", teks("u2-n2", 96, 62, "8 cm", 8.6, W.hijau, { z: 5 })),
      tambah("Luasnya", ...deret("u2-a", PANEL_X, 90, ["bagian 1:", "16 × 8 = 128"], 9.6, W.biru, 14)),
    ),
    k(
      "Bagian kedua segitiga beralas 16 dan tinggi 12. Luasnya setengah kali 16 kali 12, yaitu 96.",
      redamkan(0, "u2-p1"),
      tambah("segitiga", lukis("u2-p2", L2.ox, L2.oy, L2.s, UJI2_SEGITIGA, W.krem, W.oranye), teks("u2-n3", 132, 112, "12 cm", 8.6, W.hijau, { z: 5 })),
      tambah("Luasnya", ...deret("u2-c", PANEL_X, 126, ["bagian 2:", "½ × 16 × 12 = 96"], 9.6, W.biru, 14)),
    ),
    k(
      "Periksa dulu: kedua bagian berbagi sisi 16 dan tidak bertumpuk, jadi boleh dijumlahkan. 128 ditambah 96 sama dengan 224.",
      tambah("Periksa", ...kartu("pr", 152, 46, 136, 30, W.hijauMuda, ["tidak bertumpuk ✓"], 9.6)),
      tambah("128", ...kartu("hs", 40, 160, 220, 30, W.emas, ["128 + 96 = 224 satuan luas"], 11)),
    ),
  ],
};

/* ------------------------------ 4. Composite Area Strategy: konsep ------------------------------ */
export const ADEGAN_LUAR_KOMPOSIT: AdeganStory = {
  id: "luar-komposit",
  judul: "Composite Area Strategy: empat langkah kerja",
  sumber: "Metode luar · Composite Area Strategy",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Metode kedua, Composite Area Strategy, atau strategi luas gabungan. Ini daftar langkah yang bisa dipakai untuk bangun gabungan apa pun.",
      tambah(0, judul("Composite Area Strategy", W.biru)),
      tambah("daftar", emo("ij", 150, 96, "🗺", 50)),
      tambah("bangun", ...kartu("cs0", 60, 130, 180, 34, W.krem, ["bangun gabungan apa pun"], 9.6)),
    ),
    k(
      "Langkah pertama, amati bangun dan cari bagian yang rumus luasnya kita kenal. Langkah kedua, lengkapi ukuran yang tidak tertulis, misalnya dengan menghitung petak.",
      bersih(0),
      tambah(0, judul("Composite Area Strategy", W.biru)),
      tambah("pertama,", ...kartu("c1", 20, 38, 260, 34, W.hijauMuda, ["1. amati, cari bagian yang rumusnya dikenal"], 8.4)),
      tambah("kedua,", ...kartu("c2", 20, 82, 260, 34, W.langit, ["2. lengkapi ukuran yang tidak tertulis"], 8.4)),
    ),
    k(
      "Langkah ketiga, hitung luas tiap bagian. Langkah keempat, jumlahkan atau kurangkan, lalu tulis satuan luasnya.",
      tambah("ketiga,", ...kartu("c3", 20, 126, 260, 30, W.krem, ["3. hitung luas tiap bagian"], 8.8)),
      tambah("keempat,", ...kartu("c4", 20, 164, 260, 30, W.pink, ["4. jumlahkan atau kurangkan, tulis satuan"], 8.4)),
    ),
    k(
      "Dengan daftar langkah ini kita tidak mudah lupa. Kalau hasilnya aneh, kita bisa menelusuri langkah mana yang keliru.",
      bersih(0),
      tambah(0, judul("manfaat langkah kerja", W.biru)),
      tambah("tidak", ...kartu("mf1", 40, 50, 220, 36, W.hijauMuda, ["urut, jadi tidak mudah lupa"], 9.6)),
      tambah("menelusuri", ...kartu("mf2", 40, 100, 220, 36, W.krem, ["hasil aneh? telusuri langkahnya"], 9.6)),
    ),
  ],
};

/* ------------------------------ 5. Composite Area Strategy: penerapan pada soal nomor 3 ------------------------------ */
export const ADEGAN_LUAR_KOMPOSIT_TERAPAN: AdeganStory = {
  id: "luar-komposit-terapan",
  judul: "Composite Area Strategy pada Uji Kompetensi nomor 3",
  sumber: "Metode luar · penerapan pada angka Buku Siswa hlm. 162",
  latar: "#F0FDFA",
  ketukan: [
    k(
      "Terapkan pada bangun A soal nomor 3. Langkah pertama, kita temukan layang-layang di atas dan trapesium di bawahnya.",
      tambah(0, judul("terapan: bangun A, nomor 3", W.biru)),
      tambah("bangun", petak("u3-g", L3.ox, L3.oy, 7, 6, L3.s), lukis("u3-b", L3.ox, L3.oy, L3.s, UJI3, W.putih, W.oranye, { tebal: 2.2 })),
      tambah("layang-layang", lukis("u3-p1", L3.ox, L3.oy, L3.s, UJI3_LAYANG, W.langit, W.oranye)),
      tambah("trapesium", lukis("u3-p2", L3.ox, L3.oy, L3.s, UJI3_TRAP_1, W.krem, W.oranye)),
    ),
    k(
      "Langkah kedua, lengkapi ukuran dengan menghitung petak. Diagonal layang-layang 5 dan 4, sisi sejajar trapesium 2 dan 4, tingginya 4.",
      tambah("5", potong("u3-d1", L3.ox, L3.oy, L3.s, [1, 2], [6, 2], W.merah)),
      tambah("4,", potong("u3-d2", L3.ox, L3.oy, L3.s, [2, 0], [2, 4], W.hijau), ...deret("u3-n", PANEL_X, 74, ["layang-layang:", "diagonal 5 dan 4"], 9, W.biru, 14)),
      tambah("sejajar", teks("u3-s1", L3.ox + 1.2 * L3.s, L3.oy + 5.2 * L3.s, "2", 9, W.merah), teks("u3-s2", L3.ox + 6.6 * L3.s, L3.oy + 4.2 * L3.s, "4", 9, W.merah)),
      tambah("tingginya", ...deret("u3-m", PANEL_X, 112, ["trapesium:", "sisi 2 dan 4", "tinggi 4"], 9, W.biru, 14)),
    ),
    k(
      "Langkah ketiga, hitung luas. Layang-layang setengah kali 5 kali 4, yaitu 10. Trapesium setengah kali 6 kali 4, yaitu 12.",
      hapus(0, ...idDeret("u3-n", 2), ...idDeret("u3-m", 3)),
      tambah("Layang-layang", ...deret("u3-f", PANEL_X, 74, ["layang-layang:", "½ × 5 × 4 = 10"], 9, W.hijau, 14)),
      tambah("Trapesium", ...deret("u3-g", PANEL_X, 112, ["trapesium:", "½ × 6 × 4 = 12"], 9, W.hijau, 14)),
    ),
    k(
      "Langkah keempat, jumlahkan. 10 ditambah 12 sama dengan 22 satuan luas.",
      hapus(0, ...idDeret("u3-f", 2), ...idDeret("u3-g", 2), "u3-d1", "u3-d2"),
      tambah("jumlahkan.", ...kartu("u3-h", 150, 70, 140, 36, W.emas, ["10 + 12 = 22"], 11)),
      tambah("22", teks("u3-r", PANEL_X, 130, "22 satuan luas", 10, W.hijau)),
    ),
  ],
};
