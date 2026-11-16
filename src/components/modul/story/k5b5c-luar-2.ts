import type { AdeganStory } from "./logika-story";
import { EKS_BUANG, EKS_LUAR, UJI1, UJI1_LUAR, UJI4, UJI4_LUAR, UJI4_RELUNG, UJI4_SUDUT, W, dasarEks, deret, idDeret, idKartu, judul, kartu, lukis, petak, tabel, teks } from "./k5b5c-gambar";
import { bersih, hapus, k, redamkan, tambah } from "./k5b5c-bantu";
import { OX, OY, S } from "./k5b5c-materi-1";
import { LETAK_UJI } from "./k5b5c-materi-3";

const L1 = LETAK_UJI.u1;
const L4 = LETAK_UJI.u4;
const PANEL_X = 222;

/* ------------------------------ 6. Subtractive Decomposition: konsep pada bangun ABCDE ------------------------------ */
export const ADEGAN_LUAR_KURANG: AdeganStory = {
  id: "luar-kurang",
  judul: "Subtractive Decomposition: kotak luar dikurangi potongan",
  sumber: "Metode luar: Subtractive Decomposition",
  latar: "#FEFCE8",
  ketukan: [
    k(
      "Metode ketiga, Subtractive Decomposition, atau Outer Rectangle Minus Cutout. Di sini kita tidak menjumlahkan, tetapi mengurangi.",
      tambah(0, judul("Subtractive Decomposition", W.coklat)),
      tambah("Outer", ...kartu("kk", 30, 50, 240, 40, W.krem, ["luas = persegi panjang luar", "dikurangi bagian yang kosong"], 9.2)),
      tambah("mengurangi.", teks("mn", 150, 140, "−", 40, W.merah)),
    ),
    k(
      "Bungkus bangun dengan persegi panjang terkecil. Untuk bangun ABCDE, persegi panjang pembungkusnya enam kali empat, luasnya dua puluh empat.",
      bersih(0),
      tambah(0, judul("bungkus dengan persegi panjang")),
      tambah("bangun", ...dasarEks("e", OX, OY, S)),
      tambah("persegi", lukis("lu", OX, OY, S, EKS_LUAR, "none", W.merah, { putus: true, tebal: 2 })),
      tambah("puluh", ...kartu("l24", 166, 56, 120, 40, W.emas, ["6 × 4 = 24"], 11)),
    ),
    k(
      "Lalu buang tiga daerah kosong di luar bangun. Luasnya satu, satu, dan tujuh.",
      tambah("tiga", lukis("b1", OX, OY, S, EKS_BUANG[0], W.merahMuda, W.merah)),
      tambah("satu,", lukis("b2", OX, OY, S, EKS_BUANG[1], W.merahMuda, W.merah), teks("v1", OX + 7, OY + 15, "1", 9, W.merah), teks("v2", OX + 7, OY + 70, "1", 9, W.merah)),
      tambah("tujuh.", lukis("b3", OX, OY, S, EKS_BUANG[2], W.merahMuda, W.merah), teks("v3", OX + 90, OY + 54, "7", 11, W.merah)),
      tambah("daerah", ...kartu("kb", 166, 104, 120, 30, W.krem, ["bagian kosong: 1, 1, 7"], 8.8)),
    ),
    k(
      "Luas bangun adalah dua puluh empat dikurangi satu, dikurangi satu, dikurangi tujuh, hasilnya lima belas. Sama dengan hasil cara Yohana dan cara Komang.",
      hapus(0, ...idKartu("l24", 1), ...idKartu("kb", 1)),
      tambah("Luas", teks("sr1", 150, 160, "24 − 1 − 1 − 7", 11, W.biru)),
      tambah("hasilnya", teks("sr2", 150, 180, "= 15 satuan luas", 11, W.hijau)),
    ),
  ],
};

/* ------------------------------ 7. Subtractive Decomposition: penerapan pada soal nomor 4 dan 1 ------------------------------ */
export const ADEGAN_LUAR_KURANG_TERAPAN: AdeganStory = {
  id: "luar-kurang-terapan",
  judul: "Subtractive Decomposition pada Uji 4 dan Uji 1",
  sumber: "Metode luar: penerapan pada Uji 4 dan 1",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Terapkan pada bangun B di Uji empat. Persegi panjang pembungkusnya selebar tujuh petak dan setinggi empat petak, jadi luasnya dua puluh delapan.",
      tambah(0, judul("terapan: bangun B, Uji 4", W.coklat)),
      tambah("bangun", petak("u4-g", L4.ox, L4.oy, 9, 6, L4.s), lukis("u4-b", L4.ox, L4.oy, L4.s, UJI4, W.putih, W.oranye, { tebal: 2.2 })),
      tambah("pembungkusnya", lukis("u4-lu", L4.ox, L4.oy, L4.s, UJI4_LUAR, "none", W.merah, { putus: true, tebal: 2 })),
      tambah("puluh", ...deret("u4-a", PANEL_X, 70, ["pembungkus:", "7 × 4 = 28"], 9.6, W.biru, 14)),
    ),
    k(
      "Buang dua daerah kosong. Lekukan di atas berukuran tiga kali dua, luasnya enam. Segitiga di pojok kanan atas beralas satu dan tinggi empat, luasnya dua.",
      tambah("Lekukan", lukis("u4-r1", L4.ox, L4.oy, L4.s, UJI4_RELUNG, W.merahMuda, W.merah)),
      tambah("Segitiga", lukis("u4-r2", L4.ox, L4.oy, L4.s, UJI4_SUDUT, W.merahMuda, W.merah)),
      tambah("tiga", ...deret("u4-c", PANEL_X, 108, ["lekukan: 3 × 2 = 6"], 9, W.merah, 14)),
      tambah("beralas", ...deret("u4-d", PANEL_X, 124, ["sudut: ½ × 1 × 4 = 2"], 9, W.merah, 14)),
    ),
    k(
      "Luasnya dua puluh delapan dikurangi enam dikurangi dua, sama dengan dua puluh. Hasil ini cocok dengan cara menjumlahkan tiga bagian.",
      hapus(0, ...idDeret("u4-a", 2), ...idDeret("u4-c", 1), ...idDeret("u4-d", 1)),
      redamkan(0, "u4-r1"),
      tambah("Luasnya", ...kartu("u4-h", 150, 70, 140, 36, W.emas, ["28 − 6 − 2 = 20"], 11)),
      tambah("cocok", teks("u4-v", PANEL_X, 130, "cocok: 20 satuan luas", 9.6, W.hijau)),
    ),
    k(
      "Metode ini juga mudah untuk layang-layang pada Uji satu. Persegi panjang pembungkusnya dua puluh empat kali delapan belas, yaitu empat ratus tiga puluh dua, dan layang-layang tepat separuhnya, yaitu dua ratus enam belas.",
      bersih(0),
      tambah(0, judul("layang-layang = separuh pembungkusnya")),
      tambah("layang-layang", lukis("u1-lu", L1.ox, L1.oy, L1.s, UJI1_LUAR, W.merahMuda, W.merah, { putus: true })),
      tambah("layang-layang@2", lukis("u1-b", L1.ox, L1.oy, L1.s, UJI1, W.langit, W.oranye)),
      tambah("ratus", ...deret("u1-a", 236, 70, ["24 × 18 = 432"], 9.6, W.biru, 14)),
      tambah("enam", ...deret("u1-c", 236, 96, ["432 ÷ 2 = 216"], 9.6, W.hijau, 14)),
    ),
  ],
};

/* ------------------------------ 8. Rearrangement Invariance Check: konsep ------------------------------ */
export const ADEGAN_LUAR_KEKAL: AdeganStory = {
  id: "luar-kekal",
  judul: "Rearrangement Invariance Check: luas tidak bergantung pada cara memecah",
  sumber: "Metode luar: Rearrangement Invariance Check",
  latar: "#FDF4FF",
  ketukan: [
    k(
      "Metode keempat, Rearrangement Invariance Check, atau uji kekekalan luas. Luas bangun tidak berubah walau cara memecah atau menatanya berbeda.",
      tambah(0, judul("Rearrangement Invariance Check", W.ungu)),
      tambah("luas", ...kartu("kl", 40, 56, 220, 44, W.pink, ["luas bangun tidak berubah", "walau cara memecahnya berbeda"], 9.2)),
      tambah("menatanya", teks("kk2", 150, 150, "🔁", 36, W.biru)),
    ),
    k(
      "Caranya, hitung luas bangun dengan dua cara pecah yang berbeda. Kalau hasilnya sama, kita yakin. Kalau berbeda, ada yang keliru.",
      hapus(0, "kk2"),
      tambah("pecah", ...kartu("w1", 20, 118, 118, 34, W.hijauMuda, ["cara pertama → ?"], 9.2)),
      tambah("berbeda", ...kartu("w2", 162, 118, 118, 34, W.langit, ["cara kedua → ?"], 9.2)),
      tambah("keliru.", ...kartu("kr", 60, 164, 180, 28, W.merahMuda, ["beda → periksa lagi"], 9.2)),
    ),
    k(
      "Contohnya bangun ABCDE. Cara Yohana menghasilkan sepuluh ditambah lima, yaitu lima belas. Cara Komang juga sepuluh ditambah lima, yaitu lima belas. Hasilnya sama.",
      bersih(0),
      tambah(0, judul("contoh: bangun ABCDE", W.ungu)),
      tambah("Yohana", ...kartu("y", 14, 50, 134, 40, W.hijauMuda, ["Yohana", "10 + 5 = 15"], 9.6)),
      tambah("Komang", ...kartu("kg", 152, 50, 134, 40, W.pink, ["Komang", "10 + 5 = 15"], 9.6)),
      tambah("sama.", teks("cek", 150, 128, "✓", 40, W.hijau), ...kartu("sy", 60, 150, 180, 30, W.emas, ["15 = 15, kita yakin"], 10)),
    ),
    k(
      "Yang sama hanya jumlah akhirnya. Bagian-bagiannya boleh berbeda bentuk, seperti layang-layang dan jajargenjang yang sama-sama sepuluh.",
      bersih(0),
      tambah(0, judul("bagian boleh berbeda bentuk", W.ungu)),
      tambah("layang-layang", lukis("kl1", 30, 50, 12, [[0, 2], [1, 0], [5, 2], [1, 4]], W.langit, W.oranye), ...kartu("kl1-c", 20, 112, 130, 28, W.langit, ["layang-layang: 10"], 9)),
      tambah("jajargenjang", lukis("kl2", 170, 50, 12, [[0, 2], [1, 0], [6, 0], [5, 2]], W.pink, W.oranye), ...kartu("kl2-c", 162, 112, 130, 28, W.pink, ["jajargenjang: 10"], 9)),
      tambah("sama-sama", ...kartu("kl3", 70, 156, 160, 30, W.emas, ["bentuk beda, luas sama"], 9.6)),
    ),
  ],
};

/* ------------------------------ 9. Rearrangement Invariance Check: penerapan pada soal nomor 3 dan 4 ------------------------------ */
export const ADEGAN_LUAR_KEKAL_TERAPAN: AdeganStory = {
  id: "luar-kekal-terapan",
  judul: "Uji kekekalan luas pada Uji 3 dan Uji 4",
  sumber: "Metode luar: uji kekekalan pada Uji 3 dan 4",
  latar: "#FAF5FF",
  ketukan: [
    k(
      "Kita periksa Uji tiga. Cara satu menghasilkan sepuluh ditambah dua belas, yaitu dua puluh dua. Cara dua menghasilkan dua ditambah dua puluh, yaitu dua puluh dua. Sama, jadi dua puluh dua dapat dipercaya.",
      tambah(0, judul("uji pada Uji 3", W.ungu)),
      tambah("Cara", ...kartu("a1", 14, 40, 134, 40, W.hijauMuda, ["Cara 1", "10 + 12 = 22"], 9.6)),
      tambah("Cara@2", ...kartu("a2", 152, 40, 134, 40, W.langit, ["Cara 2", "2 + 20 = 22"], 9.6)),
      tambah("Sama,", teks("ok3", 150, 118, "22 = 22 ✓", 14, W.hijau)),
    ),
    k(
      "Sekarang Uji empat. Metode jumlah memberi delapan ditambah enam ditambah enam, yaitu dua puluh. Metode kurang memberi dua puluh delapan kurang enam kurang dua, yaitu dua puluh juga.",
      bersih(0),
      tambah(0, judul("uji pada Uji 4", W.ungu)),
      tambah("jumlah", ...kartu("r1", 14, 40, 134, 40, W.hijauMuda, ["metode jumlah", "8 + 6 + 6 = 20"], 9.6)),
      tambah("kurang", ...kartu("r2", 152, 40, 134, 40, W.langit, ["metode kurang", "28 − 6 − 2 = 20"], 9.6)),
      tambah("juga.", teks("ne", 150, 118, "20 = 20 ✓", 16, W.hijau)),
    ),
    k(
      "Kedua metode sepakat, jadi hasilnya dapat dipercaya. Perhatikan trapesium di kanan: sisi sejajarnya satu dan dua, tingginya empat, sehingga luasnya enam.",
      tambah("trapesium", lukis("tp", 40, 148, 10, [[0, 0], [1, 0], [2, 4], [0, 4]], W.krem, W.oranye)),
      tambah("sisi", teks("tp1", 45, 144, "1", 9, W.merah), teks("tp2", 50, 197, "2", 9, W.merah)),
      tambah("luasnya", ...deret("tp-r", 190, 164, ["½ × (1 + 2) × 4 = 6"], 8.8, W.biru, 14)),
    ),
    k(
      "Dengan begitu hasil yang benar adalah dua puluh. Uji kekekalan luas membantu kita menemukan kekeliruan, tidak hanya memeriksa hasil.",
      hapus(0, "ne"),
      redamkan("benar", "tp"),
      tambah("puluh.", ...kartu("bn", 90, 108, 120, 28, W.emas, ["luas bangun B = 20"], 10)),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan empat metode ------------------------------ */
const RINGKAS = [
  ["Metode", "Ide", "Contoh angka"],
  ["Additive", "pecah, jumlahkan", "128 + 96 = 224"],
  ["Composite", "empat langkah kerja", "10 + 12 = 22"],
  ["Subtractive", "kotak luar dikurangi", "28 − 6 − 2 = 20"],
  ["Invariance", "bandingkan dua cara", "15 = 15"],
];
const TABEL_RINGKAS = tabel("kn", 10, 40, [70, 106, 104], RINGKAS, 20, 8.4);
const barisRingkas = (a: number, b: number) =>
  TABEL_RINGKAS.filter((o) => {
    const r = Number(/^kn-[st](\d)/.exec(o.id)?.[1]);
    return r >= a && r < b;
  });

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode luar Subbab C",
  sumber: "Ringkasan metode luar",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Ringkasannya, ada empat metode untuk menghitung luas bangun gabungan. Mari kita lihat idenya satu per satu.",
      tambah(0, judul("ringkasan empat metode", W.ungu)),
      tambah("empat", ...barisRingkas(0, 1)),
    ),
    k(
      "Additive Decomposition memecah lalu menjumlahkan, contohnya seratus dua puluh delapan ditambah sembilan puluh enam sama dengan dua ratus dua puluh empat. Composite Area Strategy memakai empat langkah kerja, contohnya sepuluh ditambah dua belas sama dengan dua puluh dua.",
      tambah("Additive", ...barisRingkas(1, 2)),
      tambah("Composite", ...barisRingkas(2, 3)),
    ),
    k(
      "Subtractive Decomposition mengurangi kotak luar dengan bagian kosong, contohnya dua puluh delapan kurang enam kurang dua sama dengan dua puluh. Rearrangement Invariance Check membandingkan dua cara, contohnya lima belas sama dengan lima belas.",
      tambah("Subtractive", ...barisRingkas(3, 4)),
      tambah("Rearrangement", ...barisRingkas(4, 5)),
    ),
    k(
      "Kebiasaan yang baik: hitung dengan satu cara, lalu periksa dengan cara lain. Dengan begitu, luas bangun gabungan jadi lebih pasti.",
      tambah("hitung", ...kartu("ak", 30, 150, 240, 34, W.emas, ["hitung satu cara, periksa cara lain"], 9.6)),
    ),
  ],
};
